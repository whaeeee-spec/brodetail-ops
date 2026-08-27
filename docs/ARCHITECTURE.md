# Architecture

`whaeeee-spec/brodetail-ops` — приватный control plane, а не production-репозиторий.

```text
ChatGPT -> creates/routes GitHub issue
                  |
                  v
          Codex or Work executor
                  |
                  v
       result and status:review in issue
                  |
                  v
       ChatGPT evaluates -> done / next task
```

## Security boundary

Запрещено коммитить: customer data, CRM exports, историю VK/Avito, `.env`, API keys, credentials, cookies, Chrome profiles, watcher runtime state, `processed-actions`, Native Host secrets и любые production secrets или source.

Никакие автоматические исполнители, webhooks или доступ к production-системам не настраиваются на первом этапе.
