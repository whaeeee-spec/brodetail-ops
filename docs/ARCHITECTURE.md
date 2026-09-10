# Architecture

`whaeeee-spec/brodetail-ops` — приватный control plane, а не production-репозиторий.

Полная карта компонентов и потоков: [`architecture/SYSTEM_MAP.md`](architecture/SYSTEM_MAP.md). Канонические writers/read sources: [`architecture/SOURCES_OF_TRUTH.md`](architecture/SOURCES_OF_TRUTH.md).

```text
owner/coordinator -> GitHub Development Job -> Task Router -> Codex/Work executor
                         ^                         |                 |
                         |                         v                 v
                  evaluator review <- Result Ledger #43 <- checkpoint + terminal receipt
```

Executor не пишет GitHub labels/comments/status напрямую. Dispatcher reconciles relay evidence и переводит issue в `status:review`; coordinator закрывает задачу только после Development Evaluator review.

## Security boundary

Запрещено коммитить: customer data, CRM exports, историю VK/Avito, `.env`, API keys, credentials, cookies, Chrome profiles, watcher runtime state, `processed-actions`, Native Host secrets и любые production secrets или source.

Task Router может запускать только явно назначенные job contracts. Это не даёт executor доступ к production: deploy, DNS, destructive migration, customer-data write и outbound send остаются за явными approval gates.
