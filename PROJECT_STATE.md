# BRODETAIL Project State / Session Handoff

`schema: brodetail.project-state/v0.1`

- Last verified: `2026-09-24` (Europe/Moscow)
- Canonical path: `brodetail-ops/PROJECT_STATE.md`
- Canonical writer: Evaluator/Coordinator; scoped worker only when the Development Job explicitly allows it
- Overall status: `IN_PROGRESS`

## OPERATIONAL STATUS VOCABULARY

`READY | PARTIAL | BLOCKED | DEGRADED | IN_PROGRESS | LEGACY | UNKNOWN`

This is a selective verified snapshot. GitHub issues remain the live backlog/job source; Result Ledger #43 remains delivery evidence.

## SYSTEM STATUS

| System contour | Status | Verified evidence / limit |
| --- | --- | --- |
| Public Site | `READY` | Canonical pointer remains `E:\BRODETAIL\CANONICAL_SITE_SOURCE.txt -> site-production-canonical`. #81 closed `status:done`: Yan widget and production `/api/chat` are live; canonical build/test 140/140 PASS and browser/public smoke passed. |
| CRM Core | `PARTIAL` | Canonical CRM/PostgreSQL remains the operational writer. #75 production BroWheel/Cabinet writer integration is done. #80 still tracks trusted TEST marker propagation; #83 also found Avito/VK source attribution defaulting to WEBSITE. |
| Yan LIVE | `PARTIAL` | Current runtime is Yan Web / OpenAI Responses with `gpt-5.6-sol`; #81 production website path is done and #83 confirms Yan Web health plus running Avito/VK transports. Real customer booking E2E and correct source attribution are not yet verified. |
| Chatium | `LEGACY` | NOT USED as the current Yan decision path. Current configs mark `chatiumBridge` DISABLED / REMOVED_FROM_VK_AVITO_DECISION_PATH. #72 Chatium-primary architecture is SUPERSEDED by #81/#83 and current runtime evidence. |
| BRODETAIL Brain | `READY` | #73 closed `status:done`; owner-facing Brain v0.1 reads canonical/live sources with provenance. Brain query layer remains read-only. |
| Sales Intelligence / CHAT_OUTCOME | `PARTIAL` | #68/#69 done. #82 continuous learning loop runs every 15 minutes and latest reanalysis covers 2,900 dialogs / 28,598 messages; full historical VK refresh remains blocked by missing supported API credential. |
| Development Jobs / Task Router | `READY` | Agent OS and Result Relay contracts are active; GitHub issues are the live work queue. |
| Result Relay | `READY` | Existing Result Ledger #43 remains the single canonical result feed. || BRODETAIL TV / Brodi Operator | `PARTIAL` | #74 is `status:review`. Production image `brodetail-tv:20260924-201902` includes Brain voice, Yandex STT/TTS, operator actions, music bridge and new-order announcements; current local tests 24/24 PASS. Final physical owner wake/STT acceptance remains. |
| Ads | `BLOCKED` | #53 remains blocked; do not infer launch readiness from older audit reports. |
| AI Visibility | `BLOCKED` | Baseline #65 is complete. Intervention #70 remains open pending canonical deploy and same-40 remeasurement; the old desktop-offline blocker is no longer current because the authorized desktop is online. |
| Integrations / infrastructure | `PARTIAL` | #78 VK internal notifier and #75 BroWheel/Cabinet are done; #83 Yan Web + Avito/VK transport health passed. Call Intelligence #79, TEST marker #80 and channel attribution remain open. |

## ACTIVE DEVELOPMENT JOBS

- #83 — `status:blocked`, latest worker result `PARTIAL`: phone-to-scheduling recovery, false handoff-loop suppression and dedup are deployed; blocker is real organic customer-to-CRM booking verification plus trusted Avito/VK source attribution.
- #82 — `status:in-progress`: continuous Evaluator + Sales Memory loop is operational; full VK historical refresh remains unavailable without a supported API credential.
- #74 — `status:review`: Brodi TV/operator is production-live; physical owner wake/STT acceptance remains.
- #79 — `status:in-progress`: Call Intelligence. Historical “desktop offline” blocker is STALE; resume from fresh live Stage-1 verification.
- #80 — `status:blocked`: preserve server-trusted TEST marker into canonical CRM lead materialization.
- #53 — `status:blocked`: advertising rollout/acceptance.
- #70 — `status:blocked`: AI Visibility intervention deploy + same-40 measurement.
- #76 — `status:blocked`: QR flyer attribution/CRM ROI implementation.
- #77 — `status:blocked`: isolated Sales OS SaaS engineering bootstrap.
- #84 — future P2 benchmark: model quality/cost/latency/outcome economics after current Yan/Evaluator dependencies are stable.

## LAST VERIFIED ENGINEERING RESULT

- #83 receipt `issue-83-yan-sales-loop-20260924` is the latest formal Yan delivery reviewed here: `PARTIAL`; Yan Web systemd/TLS health PASS, 12 scheduling/handoff regression scenarios PASS, Avito/VK transport processes running, no synthetic customer send or production appointment created.
- #82 has a PASS operationalization receipt plus a later PARTIAL full-history reanalysis on 2026-09-24; scheduled task is enabled and last result was 0.
- #74 latest production checkpoint on 2026-09-24 reports image `brodetail-tv:20260924-201902`, 24/24 local tests PASS and live music-bridge/new-order queue acceptance.
- #81/#78/#75/#73 are closed `status:done` production/control-plane milestones from 2026-09-23.
- `PROJECT_STATE_CHANGE: YES`.

## CURRENT BLOCKERS

- #83: next organic Avito/VK continuation is required to prove real customer booking E2E; CRM source channel currently defaults to WEBSITE for Avito/VK.
- #82: full historical VK refresh lacks a supported API credential; current incremental/live loop remains operational.
- #74: final physical owner speech/wake acceptance is not yet closed.
- #80: trusted TEST marker does not yet reliably persist into `leads.is_test`.
- #53/#70/#76/#77 retain their own explicit acceptance/entry gates; do not convert them to READY from old chat claims.## CURRENT RISKS

- Legacy Chatium artifacts remain on disk, including `autopilot/chatium-agent-v2/*`, `chatium-shadow-gateway.js`, historical restore scripts and old docs. They are HISTORY/LEGACY, not an allowed current execution path.
- `autopilot/README.md` was stale before this audit and described DETECTION_ONLY while live config is OPENAI_LIVE; component docs must not override runtime/config.
- `site-production-canonical` currently contains parallel dirty work. Never reset/clean or publish unrelated changes during another job.
- `sales-intelligence` is a live local analytics workspace with substantial uncommitted artifacts; receipts/current reports, not Git history alone, are required to establish its latest state.
- Old #72 and old Chatium prompts can resurrect a dead architecture if read without freshness checks.
- #83 source-attribution defect can label Avito/VK-originated CRM records as WEBSITE until fixed.

## CANONICAL POINTERS

- Project State: `brodetail-ops/PROJECT_STATE.md`
- Finalization / cleanup index: `brodetail-ops/FINALIZATION_INDEX.md`
- Public Site pointer: `E:\BRODETAIL\CANONICAL_SITE_SOURCE.txt`
- Public Site current repository: `E:\BRODETAIL\site-production-canonical`
- System topology: `docs/architecture/SYSTEM_MAP.md`
- Writer/source ownership: `docs/architecture/SOURCES_OF_TRUTH.md` and ADR-001
- Chatium retirement / Yan runtime decision: `docs/architecture/ADR-003-YAN-RUNTIME-CHATIUM-RETIREMENT.md`
- Development Job contract: `docs/agent-os/DEVELOPMENT_JOBS.md`
- Development Evaluator: `docs/agent-os/EVALUATOR.md`
- Project State update policy: `docs/agent-os/PROJECT_STATE_POLICY.md`
- Result Ledger: GitHub issue #43
- Yan current runtime: `E:\BRODETAIL\yan-web-service` plus current transport/runtime config under `E:\BRODETAIL\autopilot`
- Yan Continuous Learning: GitHub issue #82 / `E:\BRODETAIL\sales-intelligence`
- Brodi TV: GitHub issue #74 / current production TV runtime

## RECENTLY COMPLETED

- #81: Yan online widget production rollout; OpenAI Responses / `gpt-5.6-sol` website brain.
- #78: VK internal lead notifier canonical CRM integration and safe canary.
- #75: BroWheel + Cabinet canonical CRM writer production completion.
- #73: BRODETAIL Brain v0.1.
- #68/#69: Yan Evaluator v0.1 and Sales Memory v0.1.
- #72: historical Yan/read-only finalization is complete, but its Chatium-primary architecture conclusion is now SUPERSEDED.

## NEXT BEST ACTION

1. Finish #83 first: preserve the deployed fix, observe the next organic Avito/VK turn, verify CRM/calendar outcome and correct trusted source attribution without synthetic customer sends.
2. Keep #82 learning loop running; solve the VK historical credential gap without weakening privacy/safety.
3. Close #74 with physical owner wake/STT acceptance rather than repeating synthetic tuning.
4. Fix #80 before relying on TEST-vs-real analytics.
5. Resume #53/#70 only from fresh current production evidence; do not reuse obsolete blockers or Chatium-era architecture.

## NEW-SESSION BOOTSTRAP — EXACTLY 8 STEPS

1. Determine the current workspace and its control plane.
2. Read root `E:\BRODETAIL\AGENTS.md`.
3. Read canonical `brodetail-ops/PROJECT_STATE.md` and its `Last verified` date.
4. Read `brodetail-ops/FINALIZATION_INDEX.md`, then inspect current GitHub Development Jobs and latest Task Router/GitHub checkpoint.
5. Read relevant component `AGENTS.md` files.
6. Read relevant ADR plus `brodetail-ops/docs/architecture/SOURCES_OF_TRUTH.md`.
7. Verify latest Result Relay/runtime evidence when a current-state claim depends on it.
8. Output `CURRENT STATE / ACTIVE JOBS / BLOCKERS / LAST VERIFIED RESULT / NEXT BEST ACTION`.

Previous chat, old prompt and old report are non-authoritative. Newer confirmed runtime/canonical evidence wins.

## PROJECT_STATE_CHANGE

`PROJECT_STATE_CHANGE: YES`
