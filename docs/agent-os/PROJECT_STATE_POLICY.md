# Project State policy

`brodetail-ops/PROJECT_STATE.md` is the only canonical Project State and cross-session handoff. It is a selective verified snapshot, not a diary, changelog, issue mirror, roadmap or data store.

## What belongs

- current durable objective and component status;
- active/high-impact Development Jobs as a summary with issue IDs;
- verified blockers, approval gates and canonical pointers;
- next recovery actions and concise session handoff;
- last verification date and evidence/source reference without secrets or PII.

## What does not belong

- assumptions, plans presented as facts or stale chat memory;
- raw chats, customer/CRM/order/finance data, exports, secrets or `.env` values;
- exhaustive issue history, transient console output or duplicated test logs;
- architecture decisions that belong in ADR;
- backlog/roadmap content that belongs in GitHub issues/milestones;
- runtime health claims not verified within allowed scope.

## Update rule

Update only when a Development Job explicitly allows Project State or evaluator/coordinator accepts a verified durable delta. Every factual change must be supported by a canonical source or reproducible non-sensitive evidence. Preserve `UNKNOWN` when a component was not inspected; use `STALE` when old evidence may no longer hold.

The allowed component vocabulary is exactly: `VERIFIED`, `IN_PROGRESS`, `BLOCKED`, `UNKNOWN`, `STALE`. GitHub labels are not Project State statuses.

## PROJECT_STATE_CHANGE contract

Every terminal Development Job result includes one declaration:

- `PROJECT_STATE_CHANGE: NONE` — no durable state changed; state file intentionally untouched.
- `PROJECT_STATE_CHANGE: PROPOSED` — verified delta exists but this executor/job cannot edit the canonical file; provide the exact proposed delta.
- `PROJECT_STATE_CHANGE: APPLIED` — allowed verified delta was written; list changed sections and evidence.

Do not claim `APPLIED` until the file diff and validation exist. Dispatcher/evaluator reconciles the declaration during review.

## Preventing duplicates

- Canonical filename/path is exactly `brodetail-ops/PROJECT_STATE.md`.
- Component folders may link to it but cannot create another `PROJECT_STATE.md`.
- Do not create `DECISIONS.md` or `ROADMAP.md`; use ADR and GitHub issues/milestones.
- README may explain the policy but cannot carry a competing current-state table.

## Review cadence

At new-session bootstrap or after accepted material work, compare the snapshot with the active job and canonical writers. Update only proven deltas, refresh `Last verified`, keep unknowns explicit and remove no historical fact unless the replacing evidence is clear.
