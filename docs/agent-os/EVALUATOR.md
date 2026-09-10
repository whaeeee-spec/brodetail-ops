# BRODETAIL Development Evaluator

`schema: brodetail.development-evaluator/v0.1`

The Development Evaluator reviews an engineering/documentation delivery against its Development Job. It is distinct from any Yan evaluator that scores customer conversations, prompts, sales behavior or channel responses. Development evaluation must not read raw chats or change Yan runtime.

## Inputs

- accepted Development Job and latest checkpoint;
- scoped diff and changed-file list;
- test/smoke outputs and negative scans required by the job;
- rollback evidence and terminal receipt/reconciliation pointer;
- canonical Project State and relevant ADR/source ownership rules.

## Review sequence

1. Confirm evaluator identity/mode and exact job attempt.
2. Verify changed files are inside the allowlist and unrelated dirty files are untouched.
3. Check every acceptance criterion with cited local evidence.
4. Check safety gates, secret/PII exposure and production/data/runtime impact claims.
5. Check tests were actually run and failures/manual gaps are stated.
6. Check rollback is exact and preserves unrelated work.
7. Check `PROJECT_STATE_CHANGE` follows policy and avoids unverified claims.
8. Return verdict and recommended coordinator action; do not mutate GitHub status as executor.

## Verdict

- `PASS`: all acceptance criteria and required evidence are satisfied.
- `PARTIAL`: useful work exists but one or more criteria/evidence items remain incomplete; name the primary gap.
- `BLOCKED`: evaluation cannot safely complete because one concrete external dependency/authority is missing.

## Required output

- job ID/attempt and verdict;
- acceptance checklist with evidence;
- changed files and impact (`schema`, `data`, `deploy`, `runtime`);
- tests/smokes and negative scans;
- rollback assessment;
- `PROJECT_STATE_CHANGE` assessment;
- at most one blocker;
- recommended `review`, `blocked`, `done` or follow-up job action for coordinator/dispatcher.

For DJ-AOS-001-R1 the evaluator mode is manual coordinator review. The executor may self-check, but cannot self-accept the job or mark the issue done.
