#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { writeFileSync } from 'node:fs';

const REPO = 'whaeeee-spec/brodetail-ops';
const LEDGER = 43;
const DUP_LEDGER = 44;
const VALID = new Set(['LOCAL_READY','OFFLINE_READY','DEPLOYED','CANARY_VERIFIED','PRODUCTION_VERIFIED','HOLD','UNKNOWN']);
const fenceRe = /```json\s*(\{[\s\S]*?\})\s*```/g;

function sortDeep(v) {
  if (Array.isArray(v)) return v.map(sortDeep);
  if (v && typeof v === 'object') return Object.fromEntries(Object.keys(v).sort().map(k => [k, sortDeep(v[k])]));
  return v;
}
function stable(v) { return JSON.stringify(sortDeep(v)); }
function sha(v) { return createHash('sha256').update(stable(v)).digest('hex'); }

function comments(issue) {
  const ep = `repos/${REPO}/issues/${issue}/comments?per_page=100`;
  const out = execFileSync('gh', ['api','--paginate','--slurp',ep], { encoding:'utf8' });
  return JSON.parse(out).flat();
}
function extract(issue, list) {
  const rows = [];
  for (const c of list) {
    const body = c.body || '';
    for (const m of body.matchAll(fenceRe)) {
      try {
        const p = JSON.parse(m[1]);
        if (p.schema !== 'brodetail.change-receipt/v0.1' || !p.receipt_id) continue;
        rows.push({
          receipt_id: String(p.receipt_id), issue,
          comment_id: c.id, url: c.html_url, payload: p,
          payload_sha256: sha(p),
        });
      } catch {}
    }
  }
  return rows;
}

function level(p) {
  if (VALID.has(p.evidence_level)) return p.evidence_level;
  const r = String(p.result || '').toUpperCase();
  if (r === 'FAIL' || r === 'BLOCKED') return 'HOLD';
  const d = String(p.deployment_changes || 'none').trim().toLowerCase();
  if (['','none','null','n/a'].includes(d)) return ((p.tests || []).length || (p.smoke_tests || []).length) ? 'OFFLINE_READY' : 'LOCAL_READY';
  return 'UNKNOWN';
}
function blockerFp(p) {
  if (p.blocker == null || p.blocker === '' || (Array.isArray(p.blocker) && !p.blocker.length)) return null;
  return sha({result:p.result, blocker:p.blocker, followups:p.followups || []});
}
function group(rows) {
  const g = new Map();
  for (const r of rows) { if (!g.has(r.receipt_id)) g.set(r.receipt_id, []); g.get(r.receipt_id).push(r); }
  return g;
}
function reconcile(scope) {
  const topicRows = [];
  for (const i of scope) if (i !== LEDGER && i !== DUP_LEDGER) topicRows.push(...extract(i, comments(i)));
  const ledgerRows = extract(LEDGER, comments(LEDGER));
  const dupLedgerRows = extract(DUP_LEDGER, comments(DUP_LEDGER));
  const topic = group(topicRows), ledger = group(ledgerRows), dupLedger = group(dupLedgerRows);
  const topicIds = new Set(topic.keys()), ledgerIds = new Set(ledger.keys());
  const duplicates = [], conflicts = [];
  for (const [location, groups] of [['topic',topic],['ledger',ledger],['duplicate_ledger_44',dupLedger]]) {
    for (const [rid, rows] of [...groups.entries()].sort()) {
      const hashes = new Set(rows.map(r => r.payload_sha256));
      if (rows.length > 1) duplicates.push({location, receipt_id:rid, occurrences:rows.length, payload_variants:hashes.size});
      if (hashes.size > 1) conflicts.push({location, receipt_id:rid, payload_variants:hashes.size});
    }
  }
  const missing = [...topicIds].filter(x => !ledgerIds.has(x)).sort();
  const ledgerOnly = [...ledgerIds].filter(x => !topicIds.has(x)).sort();
  const evidence = [...topic.entries()].sort().map(([rid,rows]) => {
    const last = rows.at(-1); return {receipt_id:rid, issue:last.issue, result:last.payload.result, level:level(last.payload)};
  });
  const blockers = [...topic.entries()].sort().flatMap(([rid,rows]) => {
    const fp = blockerFp(rows.at(-1).payload); return fp ? [{receipt_id:rid, fingerprint:fp}] : [];
  });
  return {
    schema:'brodetail.result-ledger-reconciliation/v0.1', repo:REPO, scope,
    ledger_issue:LEDGER, duplicate_ledger_issue:DUP_LEDGER,
    counts:{topic_receipt_occurrences:topicRows.length, topic_unique_receipts:topicIds.size, ledger_receipt_occurrences:ledgerRows.length, ledger_unique_receipts:ledgerIds.size, covered_topic_receipts:[...topicIds].filter(x=>ledgerIds.has(x)).length, missing_from_ledger:missing.length, ledger_only:ledgerOnly.length, duplicate_groups:duplicates.length, conflict_groups:conflicts.length},
    missing_from_ledger:missing, ledger_only:ledgerOnly, duplicates, conflicts, evidence, blockers,
    idle_policy:{ai_calls:0,codex_calls:0,dispatch_on_unchanged_fingerprint:false},
  };
}
function selfTest() {
  const base={schema:'brodetail.change-receipt/v0.1',receipt_id:'x',result:'BLOCKED',blocker:'same',followups:['a'],deployment_changes:'none',tests:[],smoke_tests:[]};
  const same={...base}, changed={...base,blocker:'changed'};
  if (blockerFp(base)!==blockerFp(same)) throw new Error('fingerprint instability');
  if (blockerFp(base)===blockerFp(changed)) throw new Error('fingerprint missed change');
  if (level(base)!=='HOLD') throw new Error('blocked level');
  if (level({...base,result:'PASS',blocker:null,tests:['unit']})!=='OFFLINE_READY') throw new Error('offline level');
  if (level({...base,result:'PASS',blocker:null,tests:['unit'],deployment_changes:'prod change'})!=='UNKNOWN') throw new Error('deployment guard');
  const g=group([{receipt_id:'d',payload_sha256:'a'},{receipt_id:'d',payload_sha256:'a'},{receipt_id:'c',payload_sha256:'a'},{receipt_id:'c',payload_sha256:'b'}]);
  if (g.get('d').length!==2 || new Set(g.get('d').map(x=>x.payload_sha256)).size!==1) throw new Error('duplicate test');
  if (new Set(g.get('c').map(x=>x.payload_sha256)).size!==2) throw new Error('conflict test');
  console.log('SELF_TEST=PASS');
}

const args=process.argv.slice(2);
if (args.includes('--self-test')) { selfTest(); process.exit(0); }
const oi=args.indexOf('--output');
const output=oi>=0 ? args[oi+1] : null;
const si=args.indexOf('--scope');
const scopeText=si>=0 ? args[si+1] : '32-51';
const [start,end]=scopeText.split('-').map(Number);
const result=reconcile(Array.from({length:end-start+1},(_,i)=>start+i));
const text=JSON.stringify(result,null,2)+'\n';
if (output) writeFileSync(output,text,{encoding:'utf8'}); else process.stdout.write(text);
