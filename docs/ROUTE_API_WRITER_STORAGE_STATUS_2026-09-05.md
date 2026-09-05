# BRODETAIL route/API/writer/storage status matrix

Date: 2026-09-05
Scope: control-plane only. No production, DNS, runtime, CRM data, SEND or ads changes.

## Status vocabulary

- `PRODUCTION_VERIFIED` — live runtime evidence exists for the stated scope.
- `PRODUCTION_PARTIAL` — some live behavior exists, but the business path is incomplete.
- `LOCAL_TESTED` — local/offline tests passed; not proof of production.
- `HOLD` — do not release until the stated boundary is resolved.
- `MIGRATION_SOURCE` — historical/source data only; must not become an operational writer.
- `UNKNOWN` — evidence is insufficient.

## Public route → API → writer → storage → status

| Surface / route | API / backend | Intended writer / authority | Storage | Current status | Evidence / release gate |
|---|---|---|---|---|---|
| `/` | static/public frontend | none | static release | `PRODUCTION_VERIFIED` | Live 200 on 2026-09-05. |
| `/api/commerce/requests` | website commerce adapter → canonical intake | PostgreSQL CRM | PostgreSQL | `PRODUCTION_VERIFIED` for #41 scope | #41 canary: first 201, replay 200 duplicate, one inbound event. Does not prove other forms/channels. |
| `/browheel.html` | UI only | none by itself | static release | `PRODUCTION_PARTIAL` | Page 200, but dynamic booking path is not live. |
| `/browheel` | intended BroWheel UI | none by itself | static/Node candidate | `HOLD` | Live 404. #45 is local-tested only. |
| `/api/bookings` | BroWheel booking command | **PostgreSQL CRM must own operational booking** | PostgreSQL canonical; technical queue/cache allowed elsewhere | `HOLD` | Live HEAD 404. #45 SQLite create/replay test is not permission for SQLite to become operational truth. |
| `/cabinet` | Cabinet UI/BFF | no direct operational writer | Node/VPS candidate | `HOLD` | Live 404. |
| `/api/cabinet*` | Cabinet BFF / read+commands | operational commands must go to canonical CRM service layer | PostgreSQL canonical + technical session state | `HOLD` | Live probe 404. Local 401 without session is not production proof. |
| `/api/chat` | website Yan/chat | deterministic policy + approved runtime only | canonical conversation/event layer | `HOLD` | Live probe 404; human-takeover race exists in reviewed v63 code and must be fixed before release. |
| `/services/*.html` | static service pages | none | static release | `PRODUCTION_PARTIAL` | `.html` pages work; equivalent clean URLs checked in audit return 404. |
| clean service URLs | Caddy/rewrite expected | none | static release | `HOLD` | Route contract not complete. |
| `brodetail.ru/tv` | read-only TV service | **no business writes** | canonical read projection only | `HOLD` | Live HEAD 502; local runtime/tests do not prove production data source. |
| Glass restoration frontend/form | glass adapter → canonical intake | PostgreSQL CRM | PostgreSQL + private file storage | `HOLD` | #48 is PARTIAL/local readiness; no clean immutable VPS release, photo ownership and canonical lead canary not proven. |
| CRM `/api/health` | CRM service | PostgreSQL CRM | PostgreSQL | `PRODUCTION_VERIFIED` for health only | Live 200 JSON `status=ok`; health is not proof of all write paths. |
| VK inbound | watcher/adapter → future canonical intake consumer | PostgreSQL CRM | durable queue + PostgreSQL | `PRODUCTION_PARTIAL` / `DETECTED_NOT_DELIVERED` | Detection works, but production CRM writer gate is intentionally OFF; real qualified Avito/VK-style handoff gap exists. |
| Avito inbound | watcher/adapter → future canonical intake consumer | PostgreSQL CRM | durable queue + PostgreSQL | `PRODUCTION_PARTIAL` / `DETECTED_NOT_DELIVERED` | Real agreed-visit repro without CRM lead; writer gate OFF. |
| GitHub Result Ledger #43 | receipt projection | change-control only | GitHub | `PRODUCTION_PARTIAL` | Real Work #49 receipt proven. Ledger completeness/dedup across #45–#48 is not yet proven. |

## Operational rules derived from the matrix

1. A public page `200` is not a business-path PASS unless its API/write/read dependencies are also proven.
2. A local test never upgrades a component to production status by itself.
3. `SQLite/D1/R2/filesystem` may support runtime, cache, queue, auth/session or blob storage, but must not independently own canonical clients, vehicles, bookings, orders or finance.
4. Every public CTA must map to exactly one known API path. Broken or unavailable CTAs must be disabled or routed to a known working fallback until the target API is live.
5. `UNKNOWN` must stay unknown; do not convert missing evidence into PASS.
6. Production release receipts must identify immutable source/artifact evidence before a component is considered release-ready.

## Immediate release holds

- #45 BroWheel/Cabinet: hold production until canonical ownership/writer wiring is explicit and booking lifecycle is canonical.
- #48 Glass: hold production until clean VPS/Linux candidate, private-file ownership/replay, canonical lead and Metrika smoke are proven.
- #33 TV: hold until canonical read projection exists and runtime route is healthy.
- #39/#47 channel intake: SEND remains OFF; CRM writer/canary requires explicit owner approval.
