# brodetail-ops control-plane instructions

Наследует `E:\BRODETAIL\AGENTS.md`.

## Назначение

Этот репозиторий — GitHub control plane: Development Jobs, ADR, Agent OS docs, канонический `PROJECT_STATE.md` и неперсональные evidence pointers. Здесь нет production source, runtime state или operational customer data.

## Canonical writer ownership

- GitHub issue/label/status пишет dispatcher/coordinator.
- Исполнитель пишет checkpoint и terminal receipt только через Task Router/Result Relay.
- `PROJECT_STATE.md` обновляется выборочно: только проверенные факты и только когда job явно разрешает это либо evaluator/coordinator принимает изменение.
- Архитектурные решения оформляются ADR. Не создавать `DECISIONS.md`.
- Планирование ведётся issues/milestones и при необходимости ExecPlan. Не создавать `ROADMAP.md`.
- Не создавать второй `PROJECT_STATE.md` или Result Ledger; Result Ledger остаётся issue `#43`.

## Изменения и проверки

- В docs job менять только перечисленные allowlist paths; не добавлять runtime/parser/evaluator implementation.
- Не коммитить secrets, `.env`, cookies, raw chats, customer PII, CRM exports/data, database dumps или production configs/source.
- Перед коммитом: allowlist diff, stale-pointer scan, duplicate-state scan, secret/PII negative scan, `git diff --check`, status and rollback evidence.
- Один узкий documentation commit допустим, если job это предусматривает; не stage/reset/clean unrelated work и не push без прямой команды.
