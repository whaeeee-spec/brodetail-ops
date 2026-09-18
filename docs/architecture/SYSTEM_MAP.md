# BRODETAIL System Map

`schema: brodetail.system-map/v0.1`

## Accepted engineering lifecycle

```text
AGENTS / accepted Development Job
                |
                v
       optional ExecPlan
                |
                v
             Worker
                |
                v
       Build / Tests / Smoke
                |
                v
     Development Evaluator
                |
                v
   commit / PR / Result Relay
                |
                v
verified PROJECT_STATE / durable learning
```

The exact order is: `AGENTS/Job -> optional ExecPlan -> Worker -> Build/Tests/Smoke -> Development Evaluator -> commit/PR/Result Relay -> verified PROJECT_STATE / durable learning`.

Result Relay remains the single existing relay. Result Ledger remains GitHub issue `#43`; do not create another ledger, dispatcher or result bus. Dispatcher/Coordinator owns GitHub mutations and final status. A worker may prepare a commit/PR only when the job permits it; production deploy remains a separate approval-gated action.

## Components and ownership

| Component | Responsibility | Reads from | Writes to | Must not own |
| --- | --- | --- | --- | --- |
| `brodetail-ops` | Control plane, Development Jobs, ADR, Project State and Agent OS docs | Verified evaluator/dispatcher evidence | Reviewed control-plane docs and GitHub-owned records through coordinator paths | Production source, secrets, customer data, runtime state |
| Task Router | Launches explicit job contracts and persists checkpoints | GitHub-dispatched job and local worker output | Checkpoint store and existing Result Relay | Product decisions, second ledger, direct worker-owned GitHub state |
| Codex / Work worker | Executes only allowed scope and produces evidence | Job, Project State, component instructions, canonical sources | Scoped files, checkpoints and one terminal receipt | Evaluator verdict, GitHub status, unapproved production/data changes |
| Development Evaluator | Reviews engineering delivery against acceptance and evidence | Job contract, scoped diff, tests/smokes and receipt evidence | Score, verdict, exact rework list on failure and `PROJECT_STATE_CHANGE` decision | Yan conversation quality/runtime behavior |
| Public Site | Customer-facing BRODETAIL site | `CANONICAL_SITE_SOURCE.txt` resolving to `site-production-canonical` | Canonical repository only when the job permits | Control-plane state, CRM records |
| Yan LIVE | AI-manager runtime and channel integrations | Approved prompt/config/provider and business knowledge | Runtime/config only under explicit job | Development evaluation, raw-chat documentation |
| Sales Intelligence / `CHAT_OUTCOME` | Derived operational analytics | Approved source-system extracts/contracts | Derived reports/models | Canonical CRM/customer/order/finance records |
| CRM reconciliation | Reconciliation/backfill tooling under gates | Approved CRM/schema/data sources | Dry-run evidence or approved migration changes | Local canonical CRM copy |
| BRODETAIL TV | Media/display contour | Its approved source and runtime contract | Only job-scoped artifacts/runtime | Public Site or CRM truth |
| Integrations / infrastructure | DNS, Caddy, providers, webhooks and platform services | Approved infrastructure sources | Only approval-gated job scope | Product or customer-data truth |

## Evidence and decision boundaries

1. The accepted Development Job defines scope, gates and acceptance; previous chat cannot widen it.
2. Worker checkpoints persist only `DONE / NEXT / BLOCKER` and preserve unrelated dirty state.
3. Build/tests/smoke produce non-sensitive evidence; an explicitly documentation-only job may declare product build/smoke not applicable.
4. Development Evaluator returns only `PASS | PASS_WITH_NOTES | FAIL`, with score `0-100`; hard safety failures override score.
5. On `FAIL`, the evaluator returns an exact rework list.
6. Evaluator/Coordinator decides `PROJECT_STATE_CHANGE: YES | NO`; worker assertion alone never verifies state.
7. One terminal receipt enters the existing Result Relay and is reconciled by Dispatcher/Coordinator to the existing Result Ledger.

## Safety boundaries

- Control plane: no production source, `.env`, credentials, cookies, raw chats, CRM exports, customer/order/finance data or database dumps.
- Approval: production deploy, DNS/Caddy, destructive migration, customer-data write and outbound VK/Avito send require explicit owner approval.
- Writer: one canonical writer per domain as defined in `SOURCES_OF_TRUTH.md`; mirrors and derived views never silently become canonical.
- Concurrency: scoped workers do not stage, reset, clean or overwrite unrelated dirty work.

## Session recovery

A fresh session follows the exact eight-step bootstrap in root `AGENTS.md` and `PROJECT_STATE.md`, ending with `CURRENT STATE / ACTIVE JOBS / BLOCKERS / LAST VERIFIED RESULT / NEXT BEST ACTION` before execution continues.
