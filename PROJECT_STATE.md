# BRODETAIL Project State / Session Handoff

`schema: brodetail.project-state/v0.1`

- Last verified: `2026-09-19` (Europe/Moscow)
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
| Result Relay | `PARTIAL` | Canonical Result Ledger issue #43 is active and received recent receipts through 2026-09-19; #59/#60 fixed Windows state-write and terminal-result semantics. Parent issue #36 remains in review, so do not overstate the whole relay program as complete. |
| BRODETAIL TV | `READY` | Canonical route `https://бродетаил.рф/tv/` is live. Production image `brodetail-tv:20260919-091214` includes BRODETAIL Brain queries plus self-hosted local Vosk RU wake/STT. Synthetic browser wake/no-wake and reload smokes PASS; physical owner wake on the actual studio TV microphone remains review evidence, not yet witnessed. |
| Integrations / infrastructure | `UNKNOWN` | No comprehensive current DNS/Caddy/provider/webhook audit was performed in this finalization. |

## ACTIVE DEVELOPMENT JOBS

- #73 — BRODETAIL Brain v0.1: `status:in-progress`. Live canonical CRM context is deployed; private GitHub/Project State context currently uses a sanitized derived cache and still needs autonomous safe refresh without moving GitHub credentials to the VPS.
- #74 — Brodi TV wake word: `status:review`. Production wake/STT/Brain/TTS contour is deployed and automated tests pass; one physical studio-TV owner wake utterance remains for acceptance.

Other open planning/review issues remain governed by their own GitHub status.

## LAST VERIFIED ENGINEERING RESULT

- #74 Brodi TV wake-word checkpoint: worker result `PARTIAL`, production image `brodetail-tv:20260919-091214`.
- Evidence: `npm test` 11/11 PASS; synthetic Chrome wake E2E PASS; no-wake privacy control PASS (`wakeCount=0`, Brain requests=0); browser reload recovery PASS; production rollback-deploy and Brain smoke PASS.
- Ambient audio stays in the browser before wake; Vosk RU is self-hosted; only locally transcribed question text is sent to `/api/brodi/query`.
- CRM writes=0, customer calls=0, outbound SEND=0, audio persistence=0.
- Receipt: `work-brodi-tv-wake-20260919-01`.
- `PROJECT_STATE_CHANGE: YES`.

## CURRENT BLOCKERS

- Issue #71, website lead notifications to internal VK chat: blocked on secure server-side VK community authorization plus verified destination peer/conversation configuration. Private invite/auth material must not be stored in GitHub.
- No verified blocker for the Agent OS/control-plane foundation.
- Issue #63 QR flyer ROI specification is now in `status:review`; implementation still requires a fresh scope check and a separate implementation/release job.
- #73 Brain blocker: Control Room/GitHub project context is a sanitized derived cache, not yet autonomously refreshed from the private GitHub control plane. Live CRM facts are already queried at request time.
- #74 acceptance blocker: actual studio TV browser has not yet been witnessed hearing Nikita say `Броди`; the physical profile may require one-time microphone permission. Synthetic browser-media and prior physical microphone availability evidence pass.

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
- QR flyer ROI contract: GitHub issue #63
- VK internal lead notifications: GitHub issue #71
- BRODETAIL Brain: GitHub issue #73
- Brodi TV wake-word: GitHub issue #74

## RECENTLY COMPLETED

- #62: Agent OS canonical contract rework accepted `PASS 100/100`, commit `fd1e3fe` published.
- #59 + #60: Task Router/Result Relay Windows write reliability and terminal BLOCKED/duplicate semantics repaired and closed.
- Result Ledger receipt `chatgpt-flyer-singleform-hotfix-20260910`: production `/flyer` changed to one visible form; secondary confirmation form removed.
- #65: BRODETAIL AI Visibility baseline completed and closed.
- #66: BRODETAIL Voice/Brodi external PBX engine candidate adoption completed and closed.

## NEXT BEST ACTION

1. On the physical studio TV, grant Chrome microphone permission once if requested and say `Броди, сколько сегодня задач вообще?`; if the real-owner wake passes, evaluate #74 for `status:done`.
2. Continue #73 by adding a safe autonomous refresh path for the sanitized private-GitHub/Project-State control cache without copying GitHub credentials to the VPS.
3. Continue #70/#53/#63/#71 only through their existing isolated gates.

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
