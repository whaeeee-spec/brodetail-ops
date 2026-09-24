# ADR-003 — Yan runtime and Chatium retirement

- Status: ACCEPTED
- Date: 2026-09-24
- Decision owner: BRODETAIL owner / canonical-state audit
- Scope: Yan runtime architecture and stale Chatium artifacts

## Context

Historical BRODETAIL states used Chatium as the primary Yan decision engine. Issue #72 still records that 2026-09-20 state and several local artifacts retain names such as `YAN_CHATIUM_*`, `chatium-shadow-gateway.js` and `switch-back-to-chatium.js`.

Newer confirmed evidence supersedes that architecture:
- #81 closed `status:done` on 2026-09-23 and deployed the website Yan widget with a dedicated Yan website service using OpenAI Responses / `gpt-5.6-sol`;
- #83 on 2026-09-24 deployed current Yan Web booking/handoff recovery and verified Yan Web health plus Avito/VK transport processes;
- current `yan-web-service/config.json` selects `openai-responses` / `gpt-5.6-sol`;
- current `autopilot/config.json` marks `chatiumBridge.mode=DISABLED`, `enabled=false`, `armed=false` and `status=REMOVED_FROM_VK_AVITO_DECISION_PATH`.

## Decision

Chatium is `LEGACY / NOT USED` for current BRODETAIL Yan runtime.

The allowed current architecture is:
- Website -> canonical Yan Web -> OpenAI Responses / `gpt-5.6-sol` -> canonical CRM tools/booking path;
- Avito/VK -> approved current transport -> canonical Yan Web/runtime policy -> canonical CRM path;
- business facts come from the canonical domain sources defined in `SOURCES_OF_TRUTH.md`;
- Work/ChatGPT execution may orchestrate those sources but must not substitute model memory for live facts.
Historical Chatium files may remain only as rollback/history evidence. They are not current instructions and must not be executed, restored or used as architecture input unless a newer explicit owner decision creates a scoped Development Job for that purpose.

## Consequences

- Issue #72 remains valid historical evidence but its Chatium-primary conclusion is `SUPERSEDED`.
- `autopilot/chatium-agent-v2/*`, old Chatium restore receipts/scripts, Chatium shadow gateway code and Chatium-named knowledge deltas are `HISTORY/LEGACY`.
- Legacy compatibility code may remain disabled until a dedicated cleanup job proves safe removal.
- No new feature may depend on Chatium merely because old files, secrets, tests or prompts still exist.
- A filename, token residue, backup, old prompt or old receipt is not evidence that Chatium is active.
- Current provider/channel facts must be verified from current runtime/config and current accepted issues/receipts.
- If current runtime evidence conflicts with this ADR, stop and create a new ADR/current-state update rather than silently reviving old architecture.

## Safety / cleanup

This ADR does not authorize deleting old projects, tokens or rollback artifacts. Secret revocation/deletion requires a separate owner-approved cleanup action. Do not read or publish secret values during state audits.

## Supersedes

- Chatium-primary architecture recorded in issue #72 and earlier Chatium production prompts.
- Any old instruction that says to restore, preserve or execute Chatium as the current Yan primary path.

## Verification references

- GitHub #81 — Yan online widget production rollout: DONE.
- GitHub #83 — Yan Avito handoff/current Yan Web recovery: PARTIAL, current runtime healthy.
- `E:\BRODETAIL\yan-web-service\config.json`.
- `E:\BRODETAIL\autopilot\config.json`.
