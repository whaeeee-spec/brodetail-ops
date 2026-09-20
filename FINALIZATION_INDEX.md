# BRODETAIL Finalization Index

Last verified: 2026-09-20 (Europe/Moscow)

Purpose: one cleanup/control-room index for old BRODETAIL chats. Old chat text is non-authoritative after its verified knowledge has been promoted into canonical sources.

## Canonical rule

A chat is safe to delete only when:
1. its current facts/decisions/results have been promoted to a canonical source;
2. open work is represented by a current GitHub issue / Development Job / PROJECT_STATE entry;
3. stale/conflicting history is explicitly superseded;
4. no secret, raw customer PII or raw chat log is required to reconstruct current state.

Canonical current state: `PROJECT_STATE.md`.
Canonical result history: Result Ledger issue #43.
Topic-specific open work lives in its current GitHub issue.

## Verified finalizations / promotions

| Topic / old thread | Finalization state | Canonical destination | Remaining work | Safe to delete old chat |
| --- | --- | --- | --- | --- |
| Sales Intelligence / Yan Evaluator / Sales Memory | PASS | `PROJECT_STATE.md` + Result Ledger #43; #68/#69 receipts promoted | Wait for CRM-verified outcomes; Sales Memory needs sufficient outcome-supported examples before promotion | YES |
| Ads Operating System / commercial rollout | FINALIZATION PASS | Issue #53 | #53 stays open. Current target 714358378 is PAUSED at 4,900 RUB/week with clean service-goal binding. Remaining launch gates: public-domain/Caddy correctness, safe form→Metrika→CRM E2E proof, and authenticated/correct VK Ads account + conversion path. | YES |
| Site rollout / homepage regression / glass-era site history | FINALIZED / historical complete | Issue #55 + Result Ledger #43 + current site pointer + #52/#67 evidence | No old-thread work remains. Future site work must use `CANONICAL_SITE_SOURCE.txt -> site-production-canonical` | YES |
| Flyer / Agent OS / VK notification history | PASS | `PROJECT_STATE.md` + Result Ledger #43 + closed #63 + #71 + #76 | #63 spec is complete/closed; implementation is #76; #71 remains blocked on secure VK auth/destination; #70 remains separate | YES |
| General project-state cleanup / control-plane consolidation | PASS | `PROJECT_STATE.md` + Result Ledger #43 | Current work is represented by current issues; previous chat is non-authoritative | YES |
| BRODETAIL Voice / Brodi browser pilot | COMPLETED | Issue #66 + `PROJECT_STATE.md` | Browser voice pilot complete; PBX/customer calls remain off. Brain v0.1 #73 is now completed; remaining TV voice acceptance is #74 only. | YES for the completed #66 implementation thread |

## Sidebar cleanup — currently certifiable

These are the visible old Project chats that can be mapped to a verified promoted topic.

| Chat title | Decision | Why |
| --- | --- | --- |
| `03. РЕКЛАМА` | DELETE | Ads branch has FINALIZATION PASS and current/open work is canonical in #53 |
| `01. ПРОДАЖИ И ЯН` | DELETE | Sales Intelligence / Yan Evaluator / Sales Memory knowledge is promoted to canonical state + #68/#69/Result Ledger |
| `Закрытие Glass rollout` | DELETE | Current glass/site state and remaining commercial rollout work are represented in #42/#52/#53/#55 and canonical site pointer |
| completed `BRODETAIL Voice / Brodi` implementation thread | DELETE | #66 completed; future scope is separately tracked by #73/#74 |

Do **not** delete yet unless that exact chat itself has an explicit FINALIZATION PASS / SAFE TO DELETE YES or is mapped here by a later coordinator promotion:

- `AI Visibility Release` — #70 remains open; current state is canonical, but this sidebar title has not yet been individually certified here.
- `Codex Git Recovery` — old thread had a blocked recovery state and is not individually certified yet.
- `Брендовая мифология BRODETAIL` — useful brand/creative knowledge has not yet been promoted into a canonical brand source.
- `AI-польза для Никиты` — much of the technical roadmap is promoted, but the whole mixed idea thread is not individually certified.
- `Статус бэкапа Sites D1` — not individually certified.
- BRODETAIL TV working chat / `New chat` — KEEP while #74 physical wake-word acceptance remains open; #73 Brain is completed.
- `Проверка почты для предложения` — not part of canonical project-state finalization; retain until the needed business-contact fact is canonically stored or confirmed disposable.
- `Чат с каруселями` / flyer/creative production chats — retain until the actual final design/assets and reusable brand rules are stored canonically.

## Current open work after cleanup

- #53 — Ads: BLOCKED on public-domain/Caddy correctness, safe form→Metrika→CRM E2E proof, and authenticated/correct VK Ads account + conversion path; Yandex goal binding itself is now clean.
- #70 — AI Visibility intervention: existing commit `3583c447...` ready; canonical deploy + same-40 remeasurement remain.
- #71 — VK internal lead notifications: BLOCKED on secure community auth + destination; CRM-first ordering already exists, but deployed notifier is still Telegram rather than VK.
- #72 — Yan runtime/read-only finalization completed and closed: website Yan OFF; VK/Avito mirror LIVE with fresh data; MCP health ONLINE but authenticated external invocation evidence remains UNKNOWN.
- #74 — Brodi TV wake word: REVIEW; main-dashboard diagnostics deployed, real physical owner wake not yet accepted.
- #75 — BroWheel/Cabinet canonical writer production completion; successor to closed #32/#45/#51 history.
- #76 — QR flyer attribution + CRM ROI implementation; successor to closed specification #63.
- #77 — Sales OS isolated SaaS engineering bootstrap; successor to closed product-definition #64.
- Result Ledger #43 remains a permanent feed, not an active task.
- `PROJECT_STATE.md` remains the bootstrap source for any new Control Room session.

## Cleanup decision

Verified old threads listed above no longer need to be retained for operational knowledge. Their current state has been promoted.

Important limitation: ChatGPT does not have a complete sidebar-level inventory of every Project chat. Therefore this index certifies only threads for which a canonical finalization/promotion was actually found or explicitly reconciled by the coordinator. A UI chat that never produced `FINALIZATION PASS` / a canonical promotion is not automatically certified by absence from this file.

## New-session rule

Every new Control Room session must:
1. read `PROJECT_STATE.md`;
2. read this `FINALIZATION_INDEX.md`;
3. inspect current open Development Jobs / GitHub issues;
4. use Result Ledger #43 only for evidence/history;
5. treat old chat content as history when it conflicts with canonical state.
