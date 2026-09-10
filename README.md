# BRODETAIL OPS

Центральная очередь задач и каноническая Agent OS документация BRODETAIL между владельцем, ChatGPT, Work и Codex.

Репозиторий используется только как control plane / task queue: здесь создаются, маршрутизируются, обсуждаются и закрываются задачи. Он не содержит production-исходники, данные клиентов, CRM-экспорты, историю VK/Avito, credentials, `.env`, cookies, Chrome-профили и runtime state.

## Рабочий цикл

1. ChatGPT создаёт и маршрутизирует issue.
2. Codex или Work читает задачу и выполняет работу в разрешённой среде.
3. Исполнитель сохраняет checkpoint и один terminal receipt через существующий Task Router / Result Relay.
4. Dispatcher добавляет результат и evidence pointers в Result Ledger `#43` и issue, затем переводит задачу в `status:review`.
5. Development Evaluator проверяет поставку; coordinator переводит задачу в `status:done` или создаёт следующую задачу.

Task Router уже запускает явно назначенные Development Jobs. Прямые GitHub writes остаются ответственностью dispatcher/coordinator.

## Agent OS

- Каноническое состояние и handoff: [`PROJECT_STATE.md`](PROJECT_STATE.md)
- Карта системы: [`docs/architecture/SYSTEM_MAP.md`](docs/architecture/SYSTEM_MAP.md)
- Источники истины и writer ownership: [`docs/architecture/SOURCES_OF_TRUTH.md`](docs/architecture/SOURCES_OF_TRUTH.md)
- Development Jobs и evaluator: [`docs/agent-os/DEVELOPMENT_JOBS.md`](docs/agent-os/DEVELOPMENT_JOBS.md), [`docs/agent-os/EVALUATOR.md`](docs/agent-os/EVALUATOR.md)

Не создавать параллельные `PROJECT_STATE.md`, `DECISIONS.md`, `ROADMAP.md` или второй result ledger.

## Completion sprint checkpoint — 2026-09-04

Текущий BRODETAIL completion sprint продолжает локальную/offline-подготовку по активному backlog; production deploys, DNS/runtime/config, CRM/базы и клиентские данные остаются без изменений и за закрытыми approval gates.
