# BRODETAIL Finalization Index

Last verified: 2026-09-24 (Europe/Moscow)

Purpose: cleanup/control-room index for old BRODETAIL chats and stale project descriptions. Old chat text, old prompts and historical issues are non-authoritative after newer verified evidence is promoted.

## Canonical rule

A chat/source is safe to retire only when:
1. current facts/decisions/results are represented by a canonical source;
2. open work is represented by a current GitHub issue / Development Job;
3. stale/conflicting history is explicitly superseded;
4. no secret, raw customer PII or raw chat is needed to reconstruct current state.

Canonical current state: PROJECT_STATE.md.
Canonical architecture decisions: ADR collection.
Canonical active work: live GitHub issues.
Canonical result history: Result Ledger issue #43.

## Verified promotions / supersessions

| Topic / historical source | State | Canonical destination | Remaining work / note |
| --- | --- | --- | --- |
| Yan Evaluator v0.1 | COMPLETED | #68 + Result Ledger #43 | Continued by #82 |
| Sales Memory v0.1 | COMPLETED | #69 + Result Ledger #43 | Continued by #82 |
| BRODETAIL Brain v0.1 | COMPLETED | #73 + PROJECT_STATE.md | Brain query layer current |
| BroWheel + Cabinet production completion | COMPLETED | #75 | No old #32/#45/#51 rebuild |
| VK internal lead notifier | COMPLETED | #78 | Current notifier result is done |
| Yan website widget | COMPLETED | #81 | Current website brain is Yan Web / OpenAI Responses |
| Chatium-primary Yan architecture | SUPERSEDED | ADR-003 + PROJECT_STATE.md | Chatium is LEGACY / NOT USED |
| Issue #72 Chatium-primary conclusion | HISTORY / SUPERSEDED | ADR-003 + #81/#83 | Do not use #72 as current architecture |
| AI Visibility baseline | COMPLETED | #65 | Intervention remains #70 |
| Brodi/Voice browser pilot | COMPLETED | #66 | Current production evolution is #74 |
## Current open work after reconciliation

- #83 — Yan Avito/VK/Website sales loop: BLOCKED on organic real-customer booking proof and trusted source attribution; deployed recovery remains in production.
- #82 — Continuous Learning Loop v0.2: IN_PROGRESS; automated read-only loop works, full VK history refresh lacks supported API credential.
- #74 — Brodi TV / Operator: REVIEW; current production image and features are live, physical owner wake/STT acceptance remains.
- #79 — Call Intelligence: IN_PROGRESS; old desktop-offline blocker is stale because the authorized desktop is online.
- #80 — trusted TEST marker propagation: BLOCKED.
- #53 — Ads rollout: BLOCKED.
- #70 — AI Visibility intervention: BLOCKED pending canonical deploy + same-40 remeasurement.
- #76 — QR flyer attribution/ROI implementation: BLOCKED.
- #77 — isolated Sales OS SaaS engineering: BLOCKED.
- #84 — future model benchmark / Detailing Sales Brain economics; do not pull ahead of current P0 work.

Result Ledger #43 remains a permanent feed, not an active task.

## Stale sources found in canonical-state audit

These sources may remain for history, but they must not be treated as CURRENT:
- docs/CHATIUM_DECOMMISSION_PLAN.md — historical August decommission plan.
- autopilot/chatium-agent-v2/* — old Chatium prompts/config/release artifacts.
- autopilot/chatium-shadow-gateway.js and Chatium restore tooling — disabled legacy compatibility/rollback artifacts.
- autopilot/README.md — contained a stale DETECTION_ONLY current-phase claim; guard added 2026-09-24.
- chatgpt-readonly/README.md — Chatium-era mirror documentation; verify separately before using as current runtime architecture.
- noncanonical site-brodetail-current documentation — history/mirror only; production source is resolved by CANONICAL_SITE_SOURCE.txt.
- issue #72 — valid historical verification, but its Chatium-primary architecture statement is superseded.

Backups containing Chatium references are HISTORY, not active prompts. Their presence is not evidence of an active component.
## Active stale-prompt guard

autopilot/AGENTS.md now explicitly forbids treating chatium-agent-v2, restore scripts or shadow gateway artifacts as current production instructions without a new owner decision + scoped Development Job.

Historical Chatium artifacts were not deleted in this audit. Deletion/revocation is a separate cleanup action because rollback evidence and secret lifecycle require explicit handling.

## Sidebar / old-chat cleanup rule

Previously finalized project chats remain safe to delete where their current facts are represented by PROJECT_STATE.md, current issues and Result Ledger #43. Mixed idea/brand/design chats are not automatically certified by this index.

BRODETAIL TV working history should remain available while #74 is still open if it contains owner-only acceptance context not yet promoted. AI Visibility working history should remain until #70 is finalized.

## New-session rule

Every new BRODETAIL Control Room session must:
1. read PROJECT_STATE.md;
2. read this FINALIZATION_INDEX.md;
3. inspect current GitHub issues / Development Jobs;
4. use Result Ledger #43 for evidence/history;
5. read relevant ADR and component AGENTS.md;
6. verify runtime/config for time-sensitive component claims;
7. treat old prompts/chats/issues as HISTORY when newer confirmed evidence conflicts;
8. never resurrect a LEGACY/REMOVED component from file presence alone.

## Audit result

- Canonical duplicate BRODETAIL_CURRENT_STATE.md: NOT CREATED.
- DECISIONS.md: NOT CREATED; architecture decision recorded as ADR-003.
- OPEN_JOBS.md: NOT CREATED; live GitHub issues remain canonical.
- Chatium: LEGACY / NOT USED.
- Current Yan: Yan Web / OpenAI Responses / gpt-5.6-sol, with current approved website and transport paths.
- Project State: reconciled through 2026-09-24 evidence.
