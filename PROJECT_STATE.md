# BRODETAIL Project State / Session Handoff

`schema: brodetail.project-state/v0.1`

- Last verified: `2026-09-19` (Europe/Moscow)
- Canonical path: `E:\\BRODETAIL\\brodetail-ops\\PROJECT_STATE.md`
- Canonical writer: Evaluator/Coordinator
- Overall status: `IN_PROGRESS`

## OPERATIONAL STATUS VOCABULARY

`READY | PARTIAL | BLOCKED | DEGRADED | IN_PROGRESS | LEGACY | UNKNOWN`

## SYSTEM STATUS

| System contour | Status | Verified evidence / limit |
| --- | --- | --- |
| Public Site | `READY` | Issue #52 is closed `status:done`; production website/service rollout was revalidated 2026-09-19. Historical Safari/zstd compatibility hotfix is already part of production history. |
| CRM Core | `READY` | Issue #56 production backfill/cutover completed: PostgreSQL is canonical operational target, relation integrity PASS, idempotency reruns planned zero new inserts, legacy D1 retained only as frozen historical backup/read source. |
| Canonical inbound Website/VK/Avito | `READY` | Issue #57 closed `status:done`; Website/VK/Avito canonical PostgreSQL intake revalidated after #56, source attribution/idempotency PASS. Outbound SEND remains OFF. |
| Yan LIVE | `PARTIAL` | Deterministic CRM intake does not depend on Yan/OpenAI. AI worker and customer SEND remain OFF in the latest verified CRM runtime evidence. |
| Sales Intelligence / CHAT_OUTCOME | `READY` | Issue #46 closed `status:done`; fresh redacted CRM export/preflight/materialization PASS, 2,755 conversation outputs deterministic. Historical archive cannot truthfully receive commercial outcomes from currently available identifiers; zero-linkage outcomes remain null/INSUFFICIENT_LINKAGE. Issue #68 Yan Evaluator and #69 Sales Memory are also closed `status:done`: all 2,755 rows are deterministically evaluated/registered, but CRM-verified outcome-learning support remains 0 and production activation remains 0. |
| CRM reconciliation | `READY` | Issue #56 completed production backfill/cutover; #47 offline readiness is closed and consumed by #56/#57. |
| Development Jobs / Task Router | `READY` | Issue #59 Windows state-write/Result Relay repair remains healthy; issue #62 Agent OS contract rework is closed `status:done`. |
| Result Relay | `PARTIAL` | Single canonical Result Ledger remains issue #43; completeness/guard work #50 and Windows relay repair #59 are done. Post-2026-09-16 ledger completeness has not been independently revalidated in this promotion pass, so do not infer every newer topic receipt is mirrored without checking #43. |
| BRO DETAIL TV | `READY` | Issue #33 closed `status:done`; terminal production receipt `issue33-tv-production-20260919`: canonical /tv route PASS, healthy container, canonical PostgreSQL read-only data path, restart/outage smoke PASS, no Cloudflare/D1 runtime dependency, CRM writes=0. |
| Brodi Voice browser pilot | `READY` | Issue #66 closed `status:done`; Yandex STT -> YandexGPT -> TTS browser pilot 12/12 PASS with physical Chrome microphone. CRM context read-only, raw audio persistence off. Production PBX/customer calling remains intentionally OFF. |
| Integrations / infrastructure | `PARTIAL` | Website/VK/Avito inbound and TV production paths are verified. Outbound VK/Avito SEND and PBX calling remain OFF by design. |

## ACTIVE / OPEN DEVELOPMENT JOBS

- Issue #45 — BroWheel + Cabinet Node/VPS compatibility integration: open, `status:review`; last GitHub update 2026-09-04. Revalidate before any deployment or closure because its issue state is old relative to current platform work.
- Issue #63 — QR flyer attribution + CRM ROI measurement: open, `status:blocked`; planning contract frozen at v1.0 and implementation remains gated until overlapping /flyer/CRM scopes are clear and current canonical intake shape is re-audited.
- Issue #64 — BRODETAIL Sales OS: open, `status:review`; product/architecture specification is advanced, but isolated SaaS engineering must remain separate from BRODETAIL production and requires explicit repository/bootstrap gate before coding.

## LAST VERIFIED ENGINEERING RESULTS

- #33 BRO DETAIL TV: `TV_PRODUCTION_PASS`.
- #46 CHAT_OUTCOME: fresh redacted CRM contract/materialization PASS; 2,755 outputs deterministic.
- #47 CRM/VK/Avito readiness: closed; downstream production work completed by #56/#57.
- #48 Glass rollout readiness: closed `status:done`; clean non-production acceptance PASS. Do not reinterpret readiness receipts as authorization for a new production rollout.
- #52 Public site + CRM catalog rollout: closed `status:done`; production outcome revalidated.
- #56 CRM production backfill/cutover: closed `status:done`; PostgreSQL canonicalization completed.
- #57 canonical inbound activation: closed `status:done`; Website/VK/Avito intake PASS, SEND OFF.
- #59 Task Router state-write repair: closed `status:done`; revalidation PASS.
- #66 Brodi Voice: closed `status:done`; browser voice pilot PASS, PBX/customer calls OFF.
- #68 Yan Evaluator v0.1: closed `status:done`; 2,755/2,755 classified, deterministic/byte-identical rerun PASS, historical CRM outcome-learning eligible rows = 0, no production/runtime changes.
- #69 Sales Memory v0.1: closed `status:done`; 10/10 behavioral candidate signals registered, all remain `OBSERVED_BEHAVIOR_ONLY`, promotion-ready/approved/production-active = 0, no CRM/Yan runtime/SEND changes.

## CURRENT BLOCKERS

- #45 needs current revalidation because its open/review state predates the completed September platform changes.
- #63 implementation is intentionally blocked by concurrency/current-shape gates; no second CRM writer/store may be introduced.
- #64 engineering/bootstrap is not implicitly authorized by product-spec maturity; it must start in an isolated SaaS repository/project after explicit gate approval.

## CURRENT RISKS

- Old chat summaries and historical issue comments may describe blockers that are now resolved. Prefer newer terminal receipts and current issue state.
- D1/Chatium/Sites operational-writer designs are historical/legacy where they conflict with the canonical PostgreSQL writer boundary.
- Do not turn readiness/canary packages into production writes without the approval/gates stated by the current issue.
- Outbound VK/Avito SEND and PBX customer calling remain OFF unless separately approved and verified.
- Historical Sales Intelligence associations are behavioral evidence only. Until sufficient CRM-verified EXACT outcomes exist, they must not be promoted as causal winning/losing rules or activated in Yan production.

## CANONICAL POINTERS

- Project State: `E:\\BRODETAIL\\brodetail-ops\\PROJECT_STATE.md`
- Public Site pointer: `E:\\BRODETAIL\\CANONICAL_SITE_SOURCE.txt`
- Public Site repository: `E:\\BRODETAIL\\site-production-canonical`
- System topology: `docs/architecture/SYSTEM_MAP.md`
- Writer/source ownership: `docs/architecture/SOURCES_OF_TRUTH.md` and ADR-001
- Development Jobs: `docs/agent-os/DEVELOPMENT_JOBS.md`
- Development Evaluator: `docs/agent-os/EVALUATOR.md`
- Project State policy: `docs/agent-os/PROJECT_STATE_POLICY.md`
- Result Ledger: GitHub issue #43

## RECENTLY COMPLETED / SUPERSEDED HISTORY

- The old TV blocker “canonical CRM read projection/SSH unavailable” is STALE: #33 now has production PASS and is closed.
- The old CHAT_OUTCOME blocker “fresh redacted CRM export missing” is STALE: #46 revalidation on 2026-09-19 removed it. Historical commercial linkage remains unavailable because deterministic identifiers do not overlap.
- The old CRM canonicalization/open-conflict narrative is STALE: #56 production backfill/cutover is complete; explicit historical exclusions were handled without fabrication.
- The old Website/VK/Avito “offline readiness only” state is STALE: #57 production canonical intake is active and revalidated, while SEND remains OFF.
- The old Agent OS/Task Router in-progress state in this file is STALE: #59 and #62 are closed done.
- Voice/Brodi was previously deferred from TV; #66 is now closed with browser-pilot PASS. PBX/customer calling remains a separate disabled capability.
- The older plan to promote HIGH-confidence historical chat patterns directly into production Yan is superseded by #68/#69 evidence gating: current historical signals remain non-promotable until CRM-verified outcome support reaches the defined review gate.

## NEXT BEST ACTION

1. Revalidate open #45 against current canonical site/CRM/runtime; either close it with terminal evidence or define the smallest remaining deploy/smoke.
2. Keep #63 blocked until its v1.0 handoff gates are actually clear; then implement only on the canonical intake/finance relations with deterministic attribution/idempotency tests.
3. Treat #64 as a separate SaaS product: open isolated repository/bootstrap only after explicit approval and without copying BRODETAIL production data/secrets/raw chats.
4. For Sales Intelligence, accumulate new CRM-verified EXACT outcomes through the canonical VK/Avito identity path; keep Sales Memory production activation OFF until evidence reaches the review gate and explicit owner/coordinator approval is recorded.
5. Before reporting a new Work/Codex result, verify topic receipt plus canonical Result Ledger #43; do not revive stale blockers from old chats.

## NEW-SESSION BOOTSTRAP — EXACTLY 8 STEPS

1. Determine the current workspace and its control plane.
2. Read the root `E:\\BRODETAIL\\AGENTS.md`.
3. Read canonical `brodetail-ops/PROJECT_STATE.md` and its `Last verified` date.
4. Identify active Development Jobs and the latest Task Router/GitHub checkpoint.
5. Read relevant component `AGENTS.md` files for allowed paths.
6. Read relevant ADR and `brodetail-ops/docs/architecture/SOURCES_OF_TRUTH.md`.
7. Verify the latest Result Relay records when a state claim needs confirmation.
8. Output `CURRENT STATE / ACTIVE JOBS / BLOCKERS / LAST VERIFIED RESULT / NEXT BEST ACTION`.

Previous chat is non-authoritative. When it conflicts with canonical state, canonical state wins.

## PROJECT_STATE_CHANGE

`PROJECT_STATE_CHANGE: YES` — 2026-09-19 knowledge-promotion pass replaced stale 2026-09-10 state with newer verified issue/terminal evidence. No production/runtime/data changes were made by this documentation update.
