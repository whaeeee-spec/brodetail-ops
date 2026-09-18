# BRODETAIL Development Evaluator

`schema: brodetail.development-evaluator/v0.1`

The Development Evaluator reviews an engineering/documentation delivery against its accepted Development Job. It is distinct from the Yan Evaluator, which may assess customer conversations, prompts, sales behavior or channel responses. Development evaluation must not read raw chats or change Yan runtime.

## Inputs

- accepted Development Job and exact attempt;
- latest `DONE / NEXT / BLOCKER` checkpoint;
- scoped diff and changed-file list;
- build/test/smoke outputs and required negative scans;
- rollback evidence and the planned terminal Result Relay payload;
- canonical Project State plus relevant ADR/source ownership rules.

## Review sequence

1. Confirm evaluator identity/mode, job ID and exact attempt.
2. Verify all changed files are inside the allowlist and unrelated dirty files are untouched.
3. Check every acceptance criterion with cited, reproducible evidence.
4. Check safety gates, secret/PII exposure and production/data/schema/runtime impact claims.
5. Check declared build/tests/smoke were actually run; record manual or not-applicable checks precisely.
6. Check rollback is exact and preserves unrelated work.
7. Apply hard safety failures before scoring.
8. Return score, verdict, rework/notes, `PROJECT_STATE_CHANGE` decision and recommended Coordinator action.

## Score

Score is an integer from `0` to `100`.

- `90-100`: acceptance evidence is complete or only non-blocking notes remain.
- `70-89`: material correction is required; verdict is `FAIL`.
- `0-69`: major acceptance, evidence or safety failure; verdict is `FAIL`.

Score never overrides a hard safety failure.

## Hard safety failures

Any hard safety failure forces verdict `FAIL` regardless of score. Hard failures include:

- any changed file or action outside explicit scope/allowlist;
- secret, token, cookie, private key, `.env` value, raw chat, PII or restricted CRM/order/finance data exposure;
- unapproved production deploy, DNS/Caddy mutation, destructive migration, customer-data write or outbound send;
- destructive handling of unrelated dirty state;
- fabricated test, smoke, Result Relay or production evidence;
- creation of a second Project State, ledger, dispatcher or result bus.

## Verdict — exact vocabulary

- `PASS` — all acceptance criteria and required evidence are satisfied with no material note.
- `PASS_WITH_NOTES` — all acceptance criteria are satisfied; only explicit non-blocking notes remain.
- `FAIL` — at least one acceptance criterion, required evidence item or hard safety rule is not satisfied.

No other Development Evaluator verdict is valid.

## FAIL rework contract

On `FAIL`, output an exact rework list. Every item must identify:

1. failed acceptance criterion or hard safety rule;
2. exact file/path or evidence target;
3. exact required correction;
4. deterministic re-check proving completion.

Do not replace the exact list with a general recommendation.

## PROJECT_STATE_CHANGE

The Development Evaluator/Coordinator decides exactly one value:

- `PROJECT_STATE_CHANGE: YES` — accepted evidence requires a verified durable state update.
- `PROJECT_STATE_CHANGE: NO` — no verified durable state update is required.

Worker assertion alone never verifies state and cannot replace this decision.

## Required output

- job ID and attempt;
- score `0-100`;
- verdict `PASS | PASS_WITH_NOTES | FAIL`;
- acceptance checklist with exact evidence;
- changed files and impact: `schema`, `data`, `deploy`, `runtime`;
- build/tests/smokes and negative scans;
- rollback assessment;
- exact rework list on `FAIL`, or non-blocking notes on `PASS_WITH_NOTES`;
- `PROJECT_STATE_CHANGE: YES | NO`;
- at most one external blocker;
- recommended Coordinator/Dispatcher action.

For `DJ-AOS-001-R2`, evaluator mode is manual coordinator review. Worker self-check cannot self-accept the job or mark the issue done.
