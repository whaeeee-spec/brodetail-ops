# BRODETAIL Project State / Session Handoff

`schema: brodetail.project-state/v0.1`

- Last verified: `2026-09-20` (Europe/Moscow)
- Canonical path: `brodetail-ops/PROJECT_STATE.md`
- Canonical writer: Evaluator/Coordinator; scoped worker only when the Development Job explicitly allows it
- Overall status: `IN_PROGRESS`

## OPERATIONAL STATUS VOCABULARY

`READY | PARTIAL | BLOCKED | DEGRADED | IN_PROGRESS | LEGACY | UNKNOWN`

Other words are not operational statuses. GitHub workflow labels, worker result states and Development Evaluator verdicts use separate vocabularies.

## SYSTEM STATUS

| System contour | Status | Verified evidence / limit |
| --- | --- | --- |
| Public Site | `PARTIAL` | Canonical pointer is `E:\BRODETAIL\CANONICAL_SITE_SOURCE.txt -> site-production-canonical`. Result Ledger receipt `chatgpt-flyer-singleform-hotfix-20260910` proves a production `/flyer` single-step form release with public smoke on 2026-09-10. Later isolated website/flyer receipts reviewed here explicitly reported no production deploy; full current site release was not re-smoked in this finalization. |
| CRM Core | `PARTIAL` | Issue #57 is closed `status:done`; Result Ledger receipt `work-crm-readiness-post-inbound-20260916-01` verifies the intentional CRM-inbound-ON / outbound-SEND-off readiness mode and focused tests. Full current API/data health was not re-audited here. |
| Yan LIVE | `UNKNOWN` | Runtime/provider/channel behavior was not inspected in this finalization. |
| Sales Intelligence / `CHAT_OUTCOME` | `UNKNOWN` | Current pipeline/output health was not inspected in this finalization. |
| CRM reconciliation | `UNKNOWN` | Issue #56 is closed, but production reconciliation/backfill evidence was not re-audited deeply enough here to claim a current operational status. |
| Development Jobs / Task Router | `READY` | Agent OS contract rework #62 was manually evaluated PASS 100/100 and published at commit `fd1e3fe`; reliability fixes #59 and #60 are closed `status:done`. Fresh GitHub search found no `status:ready` or `status:in-progress` job. |
| Result Relay | `READY` | Canonical Result Ledger #43 remains the permanent feed. Parent #36 and real Work acceptance #49 are now closed completed after the supported Work → GitHub → ledger path was proven exactly-once. |
| BRODETAIL TV | `PARTIAL` | Canonical route `https://бродетаил.рф/tv/` is live. Latest verified image is `brodetail-tv:20260919-094849`. Brain/query and synthetic wake/no-wake tests pass, but the owner still reported that the physical studio browser did not hear the real wake phrase; #74 remains in review. |
| Integrations / infrastructure | `UNKNOWN` | No comprehensive current DNS/Caddy/provider/webhook audit was performed in this finalization. |

## ACTIVE DEVELOPMENT JOBS

- #73 — BRODETAIL Brain v0.1: `status:in-progress`. Live CRM/service/client/order/task/revenue context is deployed. Remaining scope: safe autonomous refresh of sanitized private-GitHub/Project-State context without copying GitHub credentials to the VPS.
- #74 — Brodi TV wake word: `status:review`. Production contour exists, but real owner physical-mic acceptance is still not PASS.
- #53 — Ads rollout: `status:blocked`. Package v2 is import-ready / ACTIVE=0; current gate is fresh Yandex/VK cabinet auth/preflight + current goal/budget verification + 15 real VK assets.
- #71 — Website lead notifications → VK internal chat: `status:blocked` on secure server-side VK community auth + verified destination.
- #72 — Yan website + ChatGPT read-only verification: `status:blocked`. Public site is healthy but no Yan widget is visible; backend flag/Chatium/mirror/MCP runtime needs the authorized local read path, currently unavailable.
- #70 — AI Visibility intervention: intervention commit `3583c447fbed9cac6c1cc91591a47bcf752de339` is ready with tests/build/preview PASS. Remaining: integrate into canonical site, deploy minimal release, re-run the same 40-prompt baseline. Authorized desktop is currently offline.
- #75 — BroWheel + Cabinet canonical writer production completion: successor to old #32; reuse #45/#51, do not rebuild them.
- #76 — QR flyer attribution + CRM ROI implementation: successor to completed #63 specification v1.0.
- #77 — BRODETAIL Sales OS isolated SaaS engineering bootstrap + slice 1: successor to completed #64 product-definition phase.

## LAST VERIFIED ENGINEERING RESULT

- Lifecycle cleanup on 2026-09-20 closed completed legacy issues #49, #36, #45 and #51.
- Old broad #32 was superseded by focused #75 so completed Node/VPS compatibility (#45) and routing canary (#51) are preserved and not repeated.
- #63 product/specification work is closed; implementation moved to #76 with the frozen v1.0 measurement contract.
- #64 product-definition work is closed; isolated SaaS engineering moved to #77.
- #72 public read-only inspection confirmed the main site is healthy but exposes no visible Yan/chat widget; backend/channel state remains UNKNOWN rather than guessed.
- Latest verified #74 production image remains `brodetail-tv:20260919-094849`; synthetic safety/tests pass, real physical owner wake remains unaccepted.
- `PROJECT_STATE_CHANGE: YES`.

## CURRENT BLOCKERS

- #74: physical studio wake-word acceptance still fails from the owner's perspective. Do not close until the main dashboard visibly proves mic/model/wake/last-heard and a real owner utterance succeeds.
- #73: sanitized private-GitHub/Project-State context is not autonomously refreshed; CRM facts are already live.
- #53: `CABINET_AUTH_AND_ASSETS_GATE` — fresh authenticated Yandex/VK preflight, current campaign/goal/budget verification and 15 real VK assets. Ads remain ACTIVE=0.
- #71: secure VK community credential + verified destination peer/conversation are required; no secret may be recovered from old chats/GitHub.
- #72: `AUTHORIZED_YAN_RUNTIME_READ_PATH_UNAVAILABLE` while the authorized BRODETAIL desktop is offline.
- #70: deployment/remeasurement cannot safely continue until the authorized canonical-site checkout is reachable; intervention commit is preserved and must not be rebuilt.
- #75/#76/#77: newly isolated successor scopes; do not start inside conflicting production worktrees.

## CURRENT RISKS

- Do not infer production website state from isolated visual/flyer worktrees: several later receipts explicitly remained local/not deployed.
- Before changing `/flyer`, verify the current live payload and canonical source rather than assuming the 2026-09-10 release is still the newest release.
- VK lead notification must remain downstream of successful canonical CRM persistence; VK failure must never fail or duplicate the CRM request.
- Never place private invite links, tokens, cookies, raw customer data or destination secrets in GitHub/receipts.

## CANONICAL POINTERS

- Project State: `brodetail-ops/PROJECT_STATE.md`
- Finalization / cleanup index: `brodetail-ops/FINALIZATION_INDEX.md`
- Public Site pointer: `E:\BRODETAIL\CANONICAL_SITE_SOURCE.txt`
- Public Site current repository: `E:\BRODETAIL\site-production-canonical`
- System topology: `docs/architecture/SYSTEM_MAP.md`
- Writer/source ownership: `docs/architecture/SOURCES_OF_TRUTH.md` and ADR-001
- Development Job contract: `docs/agent-os/DEVELOPMENT_JOBS.md`
- Optional ExecPlan contract: `docs/agent-os/EXECPLANS.md`
- Development Evaluator: `docs/agent-os/EVALUATOR.md`
- Project State update policy: `docs/agent-os/PROJECT_STATE_POLICY.md`
- Result Ledger: GitHub issue #43
- QR flyer ROI frozen contract: closed GitHub issue #63
- QR flyer ROI implementation: GitHub issue #76
- VK internal lead notifications: GitHub issue #71
- BRODETAIL Brain: GitHub issue #73
- Brodi TV wake-word: GitHub issue #74
- BroWheel/Cabinet canonical writer completion: GitHub issue #75
- Sales OS SaaS engineering: GitHub issue #77

## RECENTLY COMPLETED

- #49: real ChatGPT Work → canonical Result Ledger acceptance proven exactly-once and closed.
- #36: Result Relay parent closed after #49 eliminated the remaining real-Work acceptance gap.
- #45: Node/VPS compatibility integration for BroWheel/Cabinet completed locally and closed; production remainder moved to #75.
- #51: public routing recovery production canary passed and closed.
- #32: old broad Phase-2 issue closed as superseded by focused #75; completed #45/#51 evidence remains canonical.
- #63: QR flyer ROI measurement specification v1.0 frozen and closed; implementation moved to #76.
- #64: BRODETAIL Sales OS product-definition phase closed; engineering bootstrap moved to #77.
- #62: Agent OS canonical contract rework accepted PASS 100/100.
- #65: BRODETAIL AI Visibility baseline completed and closed.
- #66: BRODETAIL Voice/Brodi external PBX engine candidate adoption completed and closed.

## NEXT BEST ACTION

1. When DESKTOP-AT4EDO1 is online, resume #74 first from real main-dashboard mic diagnostics; do not repeat synthetic wake work.
2. Then finish #73 autonomous control-plane refresh using a credential-isolated path.
3. Re-enter #53 only through the fresh authenticated cabinet/assets gate; keep ACTIVE=0 until PASS.
4. Re-enter #71 only when secure VK auth + destination are available.
5. Re-enter #72 through the authorized read-only Yan/Chatium/mirror/MCP runtime path.
6. Start #76 only after a fresh non-overlap check; reuse closed #63 v1.0 contract.
7. Finish #70 from existing intervention commit `3583c447...`; deploy and re-run the same 40 prompts.
8. Start #77 only in an isolated SaaS repository/project; do not clone current BRODETAIL production.
9. #75 resumes only from canonical-writer integration; do not redo #45/#51.

## NEW-SESSION BOOTSTRAP — EXACTLY 8 STEPS

1. Determine the current workspace and its control plane.
2. Read the root `E:\BRODETAIL\AGENTS.md`.
3. Read canonical `brodetail-ops/PROJECT_STATE.md` and its `Last verified` date.
4. Read `brodetail-ops/FINALIZATION_INDEX.md`, then identify active Development Jobs and the latest Task Router/GitHub checkpoint.
5. Read relevant component `AGENTS.md` files for allowed paths.
6. Read relevant ADR and `brodetail-ops/docs/architecture/SOURCES_OF_TRUTH.md`.
7. Verify the latest Result Relay records when a state claim needs confirmation.
8. Output `CURRENT STATE / ACTIVE JOBS / BLOCKERS / LAST VERIFIED RESULT / NEXT BEST ACTION`.

Previous chat is non-authoritative. When it conflicts with canonical state, canonical state wins.

## PROJECT_STATE_CHANGE

`PROJECT_STATE_CHANGE: YES | NO` is decided only by the Development Evaluator/Coordinator. Worker evidence or assertion alone never verifies Project State.
