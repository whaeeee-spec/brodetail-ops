# BRODETAIL Project State / Session Handoff

`schema: brodetail.project-state/v0.1`

- Last verified: `2026-09-10` (Europe/Moscow)
- Canonical path: `E:\BRODETAIL\brodetail-ops\PROJECT_STATE.md`
- Canonical writer: coordinator/evaluator; executor may update only when the Development Job explicitly allows it
- Overall status: `IN_PROGRESS`

## Status vocabulary

- `VERIFIED` — подтверждено текущим каноническим источником или воспроизводимым evidence.
- `IN_PROGRESS` — есть активный принятый Development Job; результат ещё не принят evaluator.
- `BLOCKED` — продолжение невозможно из-за одного конкретного внешнего blocker.
- `UNKNOWN` — состояние не проверялось в разрешённой области; это не ошибка и не предположение.
- `STALE` — ранее подтверждённый факт мог измениться и требует повторной проверки.

Только эти слова описывают фактическое состояние компонентов. GitHub workflow labels (`status:review`, `status:done` и другие) остаются отдельным словарём очереди задач.

## Current objective

Собрать Agent OS documentation foundation, чтобы новая сессия восстанавливала scope, канонические источники, активную работу и evidence без истории чата.

## Verified current state

| Area | Status | Verified fact |
| --- | --- | --- |
| Control plane | `VERIFIED` | Local checkout `E:\BRODETAIL\brodetail-ops` is the working copy of `whaeeee-spec/brodetail-ops`; GitHub issues are the task queue. |
| Task Router / Result Relay | `VERIFIED` | Issue #61 was launched by the existing router and checkpoint writer is reachable. Result Ledger remains issue `#43`. |
| Agent OS documentation | `IN_PROGRESS` | DJ-AOS-001-R1 / issue #61 materializes the accepted documentation-only foundation and awaits evaluator review. |
| Public website source pointer | `VERIFIED` | Root instructions point production source to `E:\BRODETAIL\.worktrees\issue-42-glass-restoration-v2` until explicit reconciliation. No deploy is part of issue #61. |
| Yan / autopilot runtime | `UNKNOWN` | Runtime, provider, prompt, channel and customer conversations were intentionally not inspected by issue #61. |
| Sales Intelligence runtime/data | `UNKNOWN` | Runtime and operational datasets were intentionally not inspected by issue #61. |
| CRM gap migration runtime/data | `UNKNOWN` | Schema, records and migrations were intentionally not inspected by issue #61. |

## Active Development Jobs

- Issue `#61`, `DJ-AOS-001-R1`: `IN_PROGRESS`; documentation-only continuation of accepted issue #58 outcome. Next gate: manual Development Evaluator review, then dispatcher-owned status transition.
- Issue `#58`, `DJ-AOS-001`: `BLOCKED` historical attempt; made zero project changes because inferred scope/local checkout were unavailable. Issue #61 is its repaired continuation.

Do not treat this list as the live issue queue. At bootstrap, reconcile it against the router-provided active job/GitHub issues, then update only verified deltas.

## Blockers

- No current blocker is verified for issue #61.

## Approval gates and risks

- Owner approval is required for production deploys, DNS/Caddy changes, destructive migrations, customer-data writes and outbound VK/Avito sends.
- Issue #61 production risk: `NONE`; data risk: `NONE`.
- Dirty files outside the job allowlist are concurrent work: do not stage, reset, clean or modify them.

## Canonical pointers

- System topology: `docs/architecture/SYSTEM_MAP.md`
- Writer/source ownership: `docs/architecture/SOURCES_OF_TRUTH.md` and ADR-001
- Development Job contract: `docs/agent-os/DEVELOPMENT_JOBS.md`
- Optional execution plans: `docs/agent-os/EXECPLANS.md`
- Engineering delivery evaluation: `docs/agent-os/EVALUATOR.md`
- State update rules: `docs/agent-os/PROJECT_STATE_POLICY.md`
- Result Ledger: GitHub issue `#43`

## Next actions

1. Finish deterministic issue #61 documentation checks without product build or production smoke.
2. Create one dedicated `brodetail-ops` documentation commit if the allowlist diff remains clean.
3. Emit one terminal receipt; dispatcher/coordinator performs GitHub reconciliation and evaluator review.

## Session handoff

Issue #61 began from clean `brodetail-ops` HEAD `9d1473b3b3b1297e8156e6a5d4019c05f169ad84`. Product/runtime/data/deploy paths are out of scope. A separate site checkout contains concurrent dirty product work; only its new component `AGENTS.md` belongs to this job. The executor must end with exact changed files, control-plane commit SHA, checks, rollback, `PROJECT_STATE_CHANGE`, blocker and recommended `status:review`.

## New-session bootstrap — 8 steps

1. Read `E:\BRODETAIL\AGENTS.md`.
2. Read this `PROJECT_STATE.md` and note `Last verified`.
3. Load the active Development Job and latest Task Router checkpoint.
4. Read the nearest component `AGENTS.md` for every allowed target.
5. Read `SYSTEM_MAP.md` and `SOURCES_OF_TRUTH.md`.
6. Read only job-relevant ADR/contracts/README files allowed by scope.
7. Verify scoped Git status, source pointers and approval gates; preserve unrelated dirty work.
8. Continue from checkpoint and finish with tests, `PROJECT_STATE_CHANGE` and exactly one terminal Result Relay receipt.

## PROJECT_STATE_CHANGE handoff

Every terminal job result declares exactly one of: `PROJECT_STATE_CHANGE: NONE`, `PROPOSED` or `APPLIED`, with a one-line reason and evidence pointer. Never rewrite this file from assumptions, raw chat history or derived analytics.
