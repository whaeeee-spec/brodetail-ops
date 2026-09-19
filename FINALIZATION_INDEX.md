# BRODETAIL Finalization Index

Last verified: 2026-09-19 (Europe/Moscow)

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
| Ads Operating System / commercial rollout | FINALIZATION PASS | Issue #53 | #53 stays open. Current target 714358378; fresh Yandex/VK cabinet/auth preflight, Metrika/CRM attribution proof and 15 real VK assets remain. Activation stays fail-closed / ACTIVE=0 until accepted | YES |
| Site rollout / homepage regression / glass-era site history | FINALIZED / historical complete | Issue #55 + Result Ledger #43 + current site pointer + #52/#67 evidence | No old-thread work remains. Future site work must use `CANONICAL_SITE_SOURCE.txt -> site-production-canonical` | YES |
| Flyer / Agent OS / VK notification history | PASS | `PROJECT_STATE.md` + Result Ledger #43 + #63 + #71 | #63 is review/spec only; #71 is blocked on secure VK auth/destination; #70 remains separate | YES |
| General project-state cleanup / control-plane consolidation | PASS | `PROJECT_STATE.md` + Result Ledger #43 | Current work is represented by current issues; previous chat is non-authoritative | YES |
| BRODETAIL Voice / Brodi browser pilot | COMPLETED | Issue #66 + `PROJECT_STATE.md` | Browser voice pilot complete; PBX/customer calls remain off. Future Brain/TV expansion is a new scope | YES for the completed #66 implementation thread |

## Current open work after cleanup

- #70 — AI Visibility intervention v0.1: OPEN. Controlled Gemini + tinting + model/problem intervention and same-40 remeasurement.
- #53 — Ads: OPEN/BLOCKED on cabinet/auth/assets acceptance; old chat is no longer needed because #53 contains the promoted current state.
- #63 — QR flyer ROI: OPEN / status:review; specification is frozen for later implementation.
- #71 — Website lead notifications -> VK internal chat: OPEN / status:blocked pending secure VK community auth + destination.
- `PROJECT_STATE.md` remains the bootstrap source for any new Control Room session.

## Cleanup decision

Verified old threads listed above no longer need to be retained for operational knowledge. Their current state has been promoted.

Important limitation: ChatGPT does not have a complete sidebar-level inventory of every Project chat. Therefore this index certifies only threads for which a canonical finalization/promotion was actually found. A UI chat that never produced `FINALIZATION PASS` / a canonical receipt is not automatically certified by absence from this file.

## New-session rule

Every new Control Room session must:
1. read `PROJECT_STATE.md`;
2. read this `FINALIZATION_INDEX.md`;
3. inspect current open Development Jobs / GitHub issues;
4. use Result Ledger #43 only for evidence/history;
5. treat old chat content as history when it conflicts with canonical state.

