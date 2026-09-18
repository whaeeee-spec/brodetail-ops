# Project State policy

`brodetail-ops/PROJECT_STATE.md` is the only canonical Project State and cross-session handoff. It is a selective verified snapshot, not a diary, changelog, issue mirror, roadmap or data store.

## Required sections

The canonical file contains these sections:

1. `SYSTEM STATUS`
2. `ACTIVE DEVELOPMENT JOBS`
3. `LAST VERIFIED ENGINEERING RESULT`
4. `CURRENT BLOCKERS`
5. `CURRENT RISKS`
6. `CANONICAL POINTERS`
7. `RECENTLY COMPLETED`
8. `NEXT BEST ACTION`

`SYSTEM STATUS` covers at least Public Site, CRM Core, Yan LIVE, Sales Intelligence/`CHAT_OUTCOME`, CRM reconciliation, Development Jobs/Task Router, Result Relay, BRODETAIL TV and integrations/infrastructure.

## Operational status vocabulary — exact

`READY | PARTIAL | BLOCKED | DEGRADED | IN_PROGRESS | LEGACY | UNKNOWN`

- Use `UNKNOWN` when the contour was not recently verified inside allowed scope.
- Use a lower status when evidence proves only part of the contour.
- Never infer or invent production `READY` from documentation, a worker claim or a local-only check.
- GitHub labels, worker result status and Development Evaluator verdicts are separate vocabularies.

## What belongs

- durable component state supported by current canonical evidence;
- active/high-impact Development Jobs summarized with issue IDs;
- last accepted engineering result and relevant evidence pointer;
- verified blockers, risks, approval gates and canonical pointers;
- recently completed durable work and one next best recovery action;
- last verification date without secrets or PII.

## What does not belong

- assumptions, plans presented as facts or stale chat memory;
- raw chats, customer/CRM/order/finance data, exports, secrets or `.env` values;
- exhaustive issue history, transient console output or duplicated test logs;
- architecture decisions that belong in ADR;
- backlog/roadmap content that belongs in GitHub issues/milestones;
- runtime health claims not verified within allowed scope.

## PROJECT_STATE_CHANGE contract — exact

`PROJECT_STATE_CHANGE` is decided by Evaluator/Coordinator with exactly one value:

- `PROJECT_STATE_CHANGE: YES` — accepted evidence requires a verified durable change to canonical Project State.
- `PROJECT_STATE_CHANGE: NO` — accepted evidence requires no durable Project State change.

Worker assertion, receipt text or file edit alone never verifies state. Worker may provide evidence and a recommendation; Evaluator/Coordinator makes the decision.

## Update rule

Update only when a Development Job explicitly allows the file and Evaluator/Coordinator accepts the durable delta. Every factual change requires a canonical source or reproducible non-sensitive evidence. Preserve `UNKNOWN` for uninspected contours. Refresh `Last verified` only for the evidence actually reviewed.

## Preventing duplicates

- Canonical filename/path is exactly `brodetail-ops/PROJECT_STATE.md`.
- Component folders may link to it but cannot create another `PROJECT_STATE.md`.
- Do not create `DECISIONS.md` or `ROADMAP.md`; use ADR and GitHub issues/milestones.
- README may explain the policy but cannot carry a competing current-state table.

## New-session authority

Previous chat is non-authoritative. The exact eight-step bootstrap in root `AGENTS.md` and `PROJECT_STATE.md` resolves conflicts in favor of canonical state and ends with `CURRENT STATE / ACTIVE JOBS / BLOCKERS / LAST VERIFIED RESULT / NEXT BEST ACTION`.
