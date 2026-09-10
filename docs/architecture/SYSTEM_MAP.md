# BRODETAIL System Map

`schema: brodetail.system-map/v0.1`

## End-to-end control flow

```text
Owner / Coordinator
        |
        | creates and prioritizes Development Job
        v
GitHub brodetail-ops issues --------------------+
        |                                       |
        | explicit scope, gates, acceptance     | dispatcher-owned comments,
        v                                       | labels and status
Task Router                                     |
        |                                       |
        +--> job checkpoint (DONE/NEXT/BLOCKER) |
        |                                       |
        v                                       |
Codex or Work executor                          |
        |                                       |
        | scoped change + offline evidence      |
        v                                       |
Component repository / documentation            |
        |                                       |
        +--> terminal Result Relay receipt -----+
                         |
                         v
              Result Ledger issue #43
                         |
                         v
              Development Evaluator
                         |
                         v
           Coordinator: done / next job
```

## Components and ownership

| Component | Responsibility | Reads from | Writes to | Must not own |
| --- | --- | --- | --- | --- |
| `brodetail-ops` | Control plane, Development Jobs, ADR, Project State, Agent OS docs | Verified executor/dispatcher evidence | GitHub issues and reviewed docs | Production source, secrets, customer data, runtime state |
| Task Router | Launches explicit job contracts; persists checkpoint and relays terminal result | GitHub-dispatched job and local executor output | Checkpoint store and existing Result Relay | Product decisions, a second ledger, direct executor-owned GitHub state |
| Codex / Work | Executes only allowed scope and produces evidence | Job, Project State, component instructions, canonical sources | Scoped files, checkpoint, one terminal receipt | Issue status, unapproved production/data changes |
| Development Evaluator | Reviews engineering result against acceptance and evidence | Job contract, diff, tests, receipt | Review verdict/recommendation via coordinator path | Yan conversation quality/runtime behavior |
| Public website | Customer-facing BRODETAIL site | Current canonical-site pointer and approved content/contracts | Canonical site source when job permits | Control-plane state, CRM records |
| Yan / autopilot | AI-manager runtime and channel integrations | Approved prompt/config/provider and business knowledge | Runtime/config only under explicit job | Development evaluation, raw-chat documentation |
| Sales Intelligence | Derived operational analytics | Approved source-system extracts/contracts | Derived reports/models | Canonical CRM/customer/order/finance records |
| CRM data-gap migration | Reconciliation/backfill tooling under gates | Approved CRM/schema/data sources | Dry-run evidence or approved migration changes | A local canonical CRM copy |

## State and evidence flow

1. GitHub issue defines work; `PROJECT_STATE.md` summarizes only durable, verified cross-session state.
2. Task Router narrows the job to explicit paths and safety gates.
3. Executor preserves unrelated dirty state and writes stage checkpoints.
4. Tests produce non-sensitive evidence; no raw datasets/chats are copied into the control plane.
5. Exactly one terminal receipt enters the existing relay.
6. Dispatcher reconciles it to Result Ledger `#43` and the job issue.
7. Development Evaluator gives a delivery verdict; coordinator owns the final status transition.

## Safety boundaries

- Control plane boundary: no production source, `.env`, credentials, cookies, raw chats, CRM exports, customer/order/finance data or database dumps.
- Approval boundary: production deploy, DNS/Caddy, destructive migration, customer-data write and outbound VK/Avito send require explicit owner approval.
- Writer boundary: one canonical writer per domain as defined in `SOURCES_OF_TRUTH.md`; mirrors and derived views never silently become canonical.
- Concurrency boundary: scoped executors do not stage, reset, clean or overwrite unrelated dirty work.

## Recovery path

A fresh session follows the eight-step bootstrap in the root `AGENTS.md` and canonical `PROJECT_STATE.md`: instructions -> state -> active job/checkpoint -> component instructions -> system map/sources -> relevant ADR/contracts -> scoped verification -> receipt/evaluation handoff.
