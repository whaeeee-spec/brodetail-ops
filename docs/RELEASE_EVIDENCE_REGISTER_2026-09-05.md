# BRODETAIL release evidence register

Date: 2026-09-05
Last update: 2026-09-06
Purpose: separate `local`, `tested`, `deployed`, `canary`, `production` and `unknown` so PASS cannot leak across levels.

## Evidence levels

- `LOCAL_READY` — code/artifacts/tests exist locally.
- `OFFLINE_READY` — deterministic/synthetic acceptance passed without production access.
- `DEPLOYED` — artifact/runtime is installed in production.
- `CANARY_VERIFIED` — a narrowly scoped production canary proved the stated business effect.
- `PRODUCTION_VERIFIED` — live route/service evidence exists for the stated scope.
- `HOLD` — do not release/enable until the blocker is removed.
- `UNKNOWN` — current evidence is insufficient.

## Register

| Component | Code/artifact | Tests | Deployment | Canary / live business proof | Current decision |
|---|---|---|---|---|---|
| Public apex `/` | known static mirror/release | route probe | deployed | live 200 | `PRODUCTION_VERIFIED` for static shell |
| CRM health | running CRM service | health probe | deployed | `/api/health` 200 JSON | `PRODUCTION_VERIFIED` for health only |
| Website commerce intake #41 | canonical adapter exists | tested + replay | deployed | 201 first, 200 replay, one inbound event | `CANARY_VERIFIED` for #41 scope only |
| BroWheel/Cabinet #45 | Node/VPS candidate + Docker/Caddy artifacts | local build/start; runtime tests; synthetic booking replay | not deployed | none | `LOCAL_READY / HOLD` pending canonical writer/lifecycle wiring and production release evidence |
| Public routing #51 | immutable static release `issue51-a4b67cfa`; route manifest SHA-256 `a4b67cfaf24bf7ee5cdf35733cf15f7498a7982b5063746f53929f6cc785c374`; Caddyfile SHA-256 `a4c1812fffe4c9db3212b2621286eac54e4c615bebd104f5bc63386e6866f1d8` | target-image `caddy validate` PASS; 48-entry manifest smoke PASS | production Caddy volume + validated restart | clean routes incl. `/browheel`, `/cabinet`, service URLs = 200; legacy `.html` = 308; held APIs = 503; #41 non-write regression GET/HEAD 405 + OPTIONS 204 unchanged; CRM health 200; external client probes 200 | `CANARY_VERIFIED` for routing/fail-closed boundary; dynamic chat/booking/cabinet/BRODESIGN writers remain `HOLD` |
| Website Yan `/api/chat` | historical/local code exists | not accepted for production | not proven | live probe 404 | `HOLD` |
| VK/Avito → CRM #39/#47 | adapters/canary/preflight package | offline canary PASS; eligibility/wiring tests PASS | CRM writer intentionally OFF | real agreed-visit repro exists without CRM lead; no approved live canary | `OFFLINE_READY / HOLD`; SEND OFF, writer requires explicit approval |
| D1 → PostgreSQL reconciliation | redacted mapping/contract/runbook | typed mapping/tests; apply refusal works | no apply | no fresh target reconciliation | `OFFLINE_READY / HOLD`; D1 is migration source only |
| CHAT_OUTCOME #35/#46 | 2,755 outcome + evaluator materialization + importer/contracts | deterministic tests and repeat materialization PASS | analytics only/local | scoring eligible 0; commercial metrics UNKNOWN/null | `OFFLINE_READY`; blocked only on fresh validated redacted CRM export |
| BRO DETAIL TV #33 | standalone read-only runtime exists | local tests reported PASS | not proven | live `brodetail.ru/tv` check 502 | `LOCAL_READY / HOLD` until canonical read projection + healthy route |
| Glass #42/#48 | trusted test flag, canary script, Timeweb/Caddy package | glass tests PASS; standard build/CI incomplete | not deployed | production page/CRM/photo/Metrika not run | `PARTIAL / HOLD`; clean Linux CI then separately approved staging/canary |
| Result Relay #36/#49/#43/#50 | supported Work/GitHub route + deterministic reconciler/backfill | real Work #49 acceptance PASS; #50 self-test + idempotency PASS | control-plane active | scoped #32..#51 reconciliation: 35/35 topic receipts covered, 0 missing, 20 duplicate groups with one payload variant each, 0 conflicts | `PRODUCTION_PARTIAL`; scoped completeness/dedup verified, future receipts must pass deterministic reconciliation |
| Backup/recovery | backup container/savepoints described | no independent restore drill evidence in current control plane | production backup mechanism exists/partially known | independent restore/RPO/RTO UNKNOWN | `HOLD` before risky migration/release |

## Open evidence blockers, normalized

1. **Route/runtime identity:** exact deployed source SHA/image digest/config hash is missing for several components; #51 now has immutable release, manifest and Caddy hashes recorded.
2. **Canonical writer boundary:** #45 must not create independent operational clients/cars/bookings/orders/finance in Node SQLite.
3. **Channel delivery:** #47 is offline-ready; writer remains deliberately disabled until a controlled production task is approved.
4. **Fresh CRM projection:** #46 commercial metrics and full reconciliation remain blocked by one fresh validated redacted CRM export/snapshot.
5. **Glass build:** #48 requires clean Linux CI before staging/canary; production remains separately gated.
6. **Recovery:** independent restore drill and agreed RPO/RTO are not yet proven.
7. **Ledger completeness:** scoped #32..#51 is reconciled with 0 missing and 0 conflicts; future receipts must pass the deterministic #50 reconciliation before #43 is treated as complete.

## Dispatch policy

ChatGPT/Work should do deterministic evidence collection, status reconciliation, schema/contract review, route matrices and acceptance first.

Codex is only dispatched when the blocker actually requires code/runtime work: complex routing/runtime changes, durable consumer, auth/security concurrency, lifecycle command wiring, CI/storage fixes or production-grade integration.

If a blocker fingerprint is unchanged and no new evidence arrived, do not spend another Codex run.
