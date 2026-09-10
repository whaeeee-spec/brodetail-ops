# BRODETAIL Sources of Truth

`schema: brodetail.sources-of-truth/v0.1`

ADR-001 establishes canonical writer ownership: each domain has one authoritative writer and read source. A cache, checkout, report, checkpoint or chat summary is not promoted by convenience.

| Domain | Canonical writer | Canonical read source | Derived / mirror only | Reconciliation rule |
| --- | --- | --- | --- | --- |
| Project State and session handoff | Coordinator/evaluator; scoped executor only when job explicitly allows | `brodetail-ops/PROJECT_STATE.md` | Chat summaries, checkpoints, README status prose | Update only verified durable deltas under `PROJECT_STATE_POLICY.md` |
| Active work and acceptance | Dispatcher/coordinator | GitHub `brodetail-ops` issues, labels and issue contract | `PROJECT_STATE.md` active-job summary, local router payload | Reconcile Project State summary against the live job before changing it |
| Job progress | Assigned executor via checkpoint writer | Latest Task Router checkpoint for that job/attempt | Commentary, terminal summary | Checkpoint contains only `DONE / NEXT / BLOCKER`; terminal receipt supersedes progress |
| Delivery result evidence | Assigned executor via existing Result Relay; dispatcher reconciles GitHub | Result Ledger GitHub issue `#43` plus linked job evidence | Console output, local receipt file, issue paraphrase | Exactly one terminal receipt; no second ledger/result bus |
| GitHub labels/comments/status | Dispatcher/coordinator | GitHub issue state | Executor recommendation | Executor never runs direct GitHub mutation for routed jobs |
| Architecture decisions | Coordinator/approved repository change | ADR collection, including ADR-001 | README explanation, chat decisions | Amend/add ADR; never create `DECISIONS.md` |
| Planning/backlog | Owner/coordinator | GitHub issues and milestones | Optional job-scoped ExecPlan | Never create `ROADMAP.md`; ExecPlan cannot redefine accepted scope |
| Public website production source | Owner-approved canonical-site pointer | `E:\BRODETAIL\CANONICAL_SITE_SOURCE.txt` and root `AGENTS.md`; currently `E:\BRODETAIL\.worktrees\issue-42-glass-restoration-v2` until reconciliation | Folder names, dirty main checkout, materialized static output | Verify pointer before release; deploy only with owner approval |
| Yan/autopilot runtime | Explicitly approved runtime/config owner | Approved runtime/config/provider/channel system | Agent OS docs, Development Evaluator | Never infer runtime state from project docs or raw chats |
| CRM customer/order/finance records | Approved operational CRM | Operational CRM under authorized access | Exports, migration workspaces, Sales Intelligence | Derived copies do not write back without data job and owner approval |
| Sales Intelligence | Approved analytics job/pipeline | Versioned transformation/report artifacts and their declared source snapshot | Ad hoc spreadsheets/chat summaries | Mark as derived and timestamp/source it; never replace CRM truth |

## Conflict resolution

1. Stop writes to the disputed domain.
2. Identify the row above and its canonical writer/read source.
3. Compare only non-sensitive evidence allowed by the job.
4. Let the canonical writer reconcile; record a new job/ADR when the ownership rule itself must change.
5. Update `PROJECT_STATE.md` only after the result is verified.

## Forbidden duplicates

There is exactly one canonical `PROJECT_STATE.md`: repository root `brodetail-ops/PROJECT_STATE.md`. Do not add `DECISIONS.md`, `ROADMAP.md`, a second `PROJECT_STATE.md`, ledger, dispatcher or result bus.
