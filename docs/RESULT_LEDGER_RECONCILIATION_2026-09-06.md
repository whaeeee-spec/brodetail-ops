# BRODETAIL RESULT LEDGER reconciliation — 2026-09-06

Scope: issues `#32..#51`, excluding canonical ledger `#43` and historical duplicate ledger `#44` as topic sources.
Canonical ledger: `#43`.
Method: deterministic GitHub comment parsing by `schema=brodetail.change-receipt/v0.1` and `receipt_id`; no AI/Codex calls.

## Result

Initial reconciliation found:
- topic receipt occurrences: `54`;
- unique topic receipts: `34`;
- canonical ledger unique receipts before backfill: `6`;
- topic receipts covered by #43 before backfill: `0/34`;
- missing from #43: `34`;
- topic duplicate groups: `20`;
- conflicting payload groups: `0`.

Because all duplicate groups had exactly one payload variant, deterministic backfill to #43 was safe after the report was materialized. The backfill posted each missing `receipt_id` once.

Final reconciliation:
- canonical ledger occurrences: `40`;
- canonical ledger unique receipts: `40`;
- topic coverage: `34/34`;
- missing from #43: `0`;
- ledger-only receipts: `6`;
- conflicting payload groups: `0`.

## Duplicate and conflict interpretation

The 20 duplicate groups are historical duplicate publications in topic issues. Every duplicate group has `payload_variants=1`, so they are byte-semantically equivalent after canonical JSON normalization. They are not conflicting terminal outcomes.

No historical comments were deleted or edited. Issue `#44` remains preserved as historical evidence of the old duplicate-ledger race; `#43` remains canonical.

## Evidence-level guard

The reconciler never promotes a receipt to production evidence merely because `result=PASS`.

Conservative rules:
- `FAIL` / `BLOCKED` -> `HOLD`;
- no deployment + deterministic tests/smoke -> `OFFLINE_READY`;
- no deployment + no test evidence -> `LOCAL_READY`;
- any deployment claim without an explicit supported evidence level -> `UNKNOWN`;
- explicit valid levels may be `LOCAL_READY`, `OFFLINE_READY`, `DEPLOYED`, `CANARY_VERIFIED`, `PRODUCTION_VERIFIED`, `HOLD`, `UNKNOWN`.

Current topic classification: `HOLD=10`, `LOCAL_READY=10`, `OFFLINE_READY=10`, `UNKNOWN=4`.

Incomplete/unknown evidence receipts:
- `8e0d2af5-35b3-4f0f-8a24-953dda4c675c`;
- `brodetail-50-public-routing-20260905`;
- `codex-issue-45-node-vps-compat`;
- `issue-48-codex-glass-readiness-20260905`.

The `UNKNOWN` level means only that the receipt itself is insufficient to prove a deployment tier. It does not override newer independent evidence. For example, public routing #51 is separately recorded in the release evidence register as `CANARY_VERIFIED` after the controlled canary.

Ledger-only receipts are valid control-plane receipts that do not have a matching topic receipt inside the selected #32..#51 topic scan:
- `chatgpt-20260905-route-writer-matrix`;
- `chatgpt-issue51-public-routing-canary-20260906`;
- `work-issue-49-completion-checkpoint-20260904`;
- `work-smoke-20260904-crm-finance`;
- `work-smoke-20260904-headquarters`;
- `work-smoke-20260904-ledger-reuse`.

## Blocker fingerprint / idle policy

Fingerprint input is deterministic canonical JSON over `result`, `blocker`, and `followups`, hashed with SHA-256.

Behavior:
- unchanged blocker material -> identical fingerprint -> no redispatch;
- changed blocker/followup material -> changed fingerprint -> eligible for a new deterministic decision;
- empty idle does not call an AI model or Codex.

The reconciler and backfill utilities contain no AI/Codex invocation path. `idle_policy.ai_calls=0` and `idle_policy.codex_calls=0` are explicit output invariants.

## Tests

- `node tools/reconcile-result-ledger.mjs --self-test` -> `SELF_TEST=PASS`;
- first backfill dry-run -> `MISSING_BEFORE=34`, `BACKFILL_POSTED=0`;
- controlled canonical backfill -> `BACKFILL_POSTED=34`;
- post-backfill reconciliation -> `34/34` topic coverage, `0` missing, `0` conflicts;
- second backfill dry-run -> `MISSING_BEFORE=0`, `BACKFILL_POSTED=0` (idempotency PASS).

No production, CRM data/schema, runtime, DNS, SEND, ads, secrets, PII or raw chats were touched.
