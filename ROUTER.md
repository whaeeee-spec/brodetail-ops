# BRODETAIL Task Router

## Маршруты

| Код | Направление |
| --- | --- |
| 00 | HEADQUARTERS |
| 01 | SALES_YAN |
| 02 | CRM_FINANCE |
| 03 | ADS |
| 04 | BRODETAIL_TV |
| 05 | SYSTEM_CONTROL |

## Исполнители Codex

- `CODEX_LIVE`
- `CODEX_SALES_INTELLIGENCE`
- `CODEX_ADS`
- `CODEX_INFRA`

## Исполнители Work

- `WORK_HEADQUARTERS`
- `WORK_CRM_FINANCE`
- `WORK_TV`

## Правило маршрутизации

Каждая задача оформляется issue и получает ровно по одному label из групп `area`, `status` и `priority`. При необходимости назначается label исполнителя из группы `agent`.

Результат работы, ограничения и ссылки на безопасные артефакты публикуются в issue. Секреты, сырые данные клиентов, production-код и runtime-файлы в репозиторий не добавляются.
