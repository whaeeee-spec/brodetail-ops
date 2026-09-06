#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';

const REPO='whaeeee-spec/brodetail-ops', LEDGER=43, DUP_LEDGER=44;
const fenceRe=/```json\s*(\{[\s\S]*?\})\s*```/g;
function sortDeep(v){ if(Array.isArray(v))return v.map(sortDeep); if(v&&typeof v==='object')return Object.fromEntries(Object.keys(v).sort().map(k=>[k,sortDeep(v[k])])); return v; }
function hash(v){return createHash('sha256').update(JSON.stringify(sortDeep(v))).digest('hex');}
function gh(args){return execFileSync('gh',args,{encoding:'utf8'});}
function comments(issue){const ep=`repos/${REPO}/issues/${issue}/comments?per_page=100`; return JSON.parse(gh(['api','--paginate','--slurp',ep])).flat();}
function extract(issue){
  const out=[];
  for(const c of comments(issue)) for(const m of (c.body||'').matchAll(fenceRe)){
    try{
      const p=JSON.parse(m[1]);
      if(p.schema==='brodetail.change-receipt/v0.1'&&p.receipt_id) out.push({id:String(p.receipt_id),payload:p,hash:hash(p)});
    }catch{}
  }
  return out;
}
function group(rows){const g=new Map(); for(const r of rows){if(!g.has(r.id))g.set(r.id,[]); g.get(r.id).push(r);} return g;}
const topicRows=[];
for(let i=32;i<=51;i++) if(i!==LEDGER&&i!==DUP_LEDGER) topicRows.push(...extract(i));
const topic=group(topicRows), ledger=group(extract(LEDGER));
for(const [id,rows] of topic){
  const variants=new Set(rows.map(r=>r.hash));
  if(variants.size>1){console.error(`CONFLICT=${id}`); process.exit(2);}
}
const missing=[...topic.keys()].filter(id=>!ledger.has(id)).sort();
const dry=process.argv.includes('--dry-run');
console.log(`MISSING_BEFORE=${missing.length}`);
if(dry){
  for(const id of missing) console.log(`WOULD_POST=${id}`);
  console.log('BACKFILL_POSTED=0');
  process.exit(0);
}
let posted=0;
for(const id of missing){
  const payload=topic.get(id)[0].payload;
  const body=`<!-- brodetail-change-receipt:${id} -->\n## Change receipt v0.1\n\n\`\`\`json\n${JSON.stringify(payload,null,2)}\n\`\`\``;
  gh(['api','-X','POST',`repos/${REPO}/issues/${LEDGER}/comments`,'-f',`body=${body}`]);
  posted++;
  console.log(`POSTED=${id}`);
}
console.log(`BACKFILL_POSTED=${posted}`);
