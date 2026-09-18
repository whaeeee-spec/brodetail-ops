# BRODETAIL Project State / Session Handoff

`schema: brodetail.project-state/v0.1`

- Last verified: `2026-09-10` (Europe/Moscow)
- Canonical path: `E:\BRODETAIL\brodetail-ops\PROJECT_STATE.md`
- Canonical writer: Evaluator/Coordinator; scoped worker may edit only when the Development Job explicitly allows it
- Overall status: `IN_PROGRESS`

## OPERATIONAL STATUS VOCABULARY

`READY | PARTIAL | BLOCKED | DEGRADED | IN_PROGRESS | LEGACY | UNKNOWN`

- `READY` — актуальная готовность подтверждена разрешённым каноническим evidence.
- `PARTIAL` — подтверждена только часть контура или требуемых возможностей.
- `BLOCKED` — продолжение невозможно из-за одного конкретного blocker.
- `DEGRADED` — контур работает с подтверждённым ухудшением.
- `IN_PROGRESS` — есть активный Development Job, результат ещё не принят Evaluator/Coordinator.
- `LEGACY` — контур сохранён только как устаревший и не считается текущим целевым решением.
- `UNKNOWN` — актуальное состояние не проверено в разрешённой области.

Другие слова не используются как operational status. GitHub workflow labels и Development Evaluator verdicts имеют отдельные словари.

## SYSTEM STATUS

| System contour | Status | Verified evidence / limit |
| --- | --- | --- |
| Public Site | `PARTIAL` | Канонический pointer задан через `E:\BRODETAIL\CANONICAL_SITE_SOURCE.txt` и разрешается в `E:\BRODETAIL\site-production-canonical`; product build, deploy и production smoke в issue #62 не проверялись. |
| CRM Core | `UNKNOWN` | Runtime, API, schema и operational data не входят в scope issue #62 и не проверялись. |
| Yan LIVE | `UNKNOWN` | Runtime, provider, prompt, channel и raw conversations не проверялись. |
| Sales Intelligence / `CHAT_OUTCOME` | `UNKNOWN` | Pipeline, transformation artifacts и source snapshot не проверялись. |
| CRM reconciliation | `UNKNOWN` | Migration/backfill tooling, schema и records не проверялись. |
| Development Jobs / Task Router | `IN_PROGRESS` | Issue #62 / `DJ-AOS-001-R2` выполняет документационный rework принятого Agent OS contract. |
| Result Relay | `PARTIAL` | Существующий relay и единственный Result Ledger issue #43 заданы контрактом; терминальный receipt issue #62 ещё не принят. |
| BRODETAIL TV | `UNKNOWN` | Source, runtime и текущая работоспособность не проверялись. |
| Integrations / infrastructure | `UNKNOWN` | DNS, Caddy, providers, webhooks и production infrastructure не проверялись. |

## ACTIVE DEVELOPMENT JOBS

- Issue `#62`, `DJ-AOS-001-R2`: `IN_PROGRESS`; documentation-only rework после manual evaluator failure issue #61. Следующий gate: детерминированные проверки, terminal Result Relay receipt и manual coordinator evaluation.

Этот раздел — проверенный handoff, а не live-замена GitHub queue. В новой сессии активный job определяется из Task Router/GitHub issue.

## LAST VERIFIED ENGINEERING RESULT

- Issue `#61`, `DJ-AOS-001-R1`: worker создал локальный control-plane commit `95beffd93e2e44af6c7e2ea204f0e8dc76e078c2`, но manual coordinator evaluation вернул `FAIL` из-за расхождения canonical contracts и устаревшего public-site pointer.
- Это не production PASS: product build, deploy, production smoke, runtime и data не проверялись.

## CURRENT BLOCKERS

- Подтверждённых blocker для выполнения issue #62 нет.

## CURRENT RISKS

- В canonical site repository есть параллельный dirty product state, включая `/flyer`, CRM/BroWheel и CSS/assets; issue #62 не должен его менять, stage, reset или clean.
- Control-plane документы не считаются принятыми до manual Development Evaluator verdict.
- Production deploy, DNS/Caddy changes, destructive migrations, customer-data writes и outbound VK/Avito sends требуют отдельного owner approval.

## CANONICAL POINTERS

- Project State: `E:\BRODETAIL\brodetail-ops\PROJECT_STATE.md`
- Public Site pointer: `E:\BRODETAIL\CANONICAL_SITE_SOURCE.txt`
- Public Site current repository: `E:\BRODETAIL\site-production-canonical`
- System topology: `docs/architecture/SYSTEM_MAP.md`
- Writer/source ownership: `docs/architecture/SOURCES_OF_TRUTH.md` и ADR-001
- Development Job contract: `docs/agent-os/DEVELOPMENT_JOBS.md`
- Optional ExecPlan contract: `docs/agent-os/EXECPLANS.md`
- Development Evaluator: `docs/agent-os/EVALUATOR.md`
- Project State update policy: `docs/agent-os/PROJECT_STATE_POLICY.md`
- Result Ledger: GitHub issue `#43`

## RECENTLY COMPLETED

- Issue #61 materialized the initial Agent OS documentation foundation in local commit `95beffd93e2e44af6c7e2ea204f0e8dc76e078c2`; its evaluator verdict was `FAIL`, so issue #62 performs only the exact contract rework.
- Historical issue #58 attempt made no project changes and is not an active implementation source.

## NEXT BEST ACTION

Complete the issue #62 documentation-only corrections, run the declared allowlist/string/section/lifecycle checks, emit one terminal receipt, then send the result to manual coordinator evaluation. Do not deploy or modify product/runtime/data.

## NEW-SESSION BOOTSTRAP — EXACTLY 8 STEPS

1. Determine the current workspace and its control plane.
2. Read the root `E:\BRODETAIL\AGENTS.md`.
3. Read canonical `brodetail-ops/PROJECT_STATE.md` and its `Last verified` date.
4. Identify active Development Jobs and the latest Task Router/GitHub checkpoint.
5. Read relevant component `AGENTS.md` files for allowed paths.
6. Read relevant ADR and `brodetail-ops/docs/architecture/SOURCES_OF_TRUTH.md`.
7. Verify the latest Result Relay records when a state claim needs confirmation.
8. Output `CURRENT STATE / ACTIVE JOBS / BLOCKERS / LAST VERIFIED RESULT / NEXT BEST ACTION`.

Previous chat is non-authoritative. When it conflicts with canonical state, canonical state wins.

## PROJECT_STATE_CHANGE

`PROJECT_STATE_CHANGE: YES | NO` is decided only by the Development Evaluator/Coordinator. Worker evidence or assertion alone never verifies Project State.
