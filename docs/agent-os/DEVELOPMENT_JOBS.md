# BRODETAIL Development Jobs v0.1

Canonical schema identifier: `brodetail.development-job/v0.1`.

A Development Job is the executable contract between coordinator, router, executor and evaluator. It is semantic: every field constrains decisions and evidence, not just issue formatting. Chat history cannot widen it.

## Required fields

| Field | Meaning |
| --- | --- |
| `JOB_ID` | Stable unique identifier used in checkpoints, receipts and evaluation. |
| `TITLE` | Short outcome name. |
| `GOAL` | Verifiable end state, not an activity list. |
| `WHY` | Business/operational reason and urgency. |
| `SCOPE` | Exact permitted outcomes and paths/components. |
| `OUT_OF_SCOPE` | Explicit non-goals and prohibited adjacent work. |
| `AFFECTED_COMPONENTS` | Components whose docs/code/state may change. |
| `CANONICAL_SOURCES` | Authoritative inputs; derived sources must be labeled. |
| `ACCEPTANCE_CRITERIA` | Binary or inspectable conditions for evaluator verdict. |
| `TEST_PLAN` | Deterministic checks and required evidence; prohibited tests also belong here. |
| `PRODUCTION_RISK` | `NONE`, `LOW`, `MEDIUM`, `HIGH` with stated gates. |
| `DATA_RISK` | `NONE`, `LOW`, `MEDIUM`, `HIGH` with stated gates. |
| `ROLLBACK` | Exact recovery method preserving unrelated work/data. |
| `EXPECTED_RESULT` | Deliverable usable by the next actor. |
| `RESULT_RELAY_REQUIRED` | `YES` or `NO`; `YES` normally applies to meaningful work. |
| `EVALUATOR_REQUIRED` | `YES`, `NO`, or named/manual evaluator mode. |
| `EXPECTED_EVIDENCE_LEVEL` | `SUMMARY`, `REPRODUCIBLE`, or `OFFLINE_READY`. |
| `SAFETY / CONCURRENCY` | Approval gates, sensitive-data rules and concurrent dirty-work constraints. |

Router metadata must also provide executor, area, size/mode/attempt and an explicit path allowlist. If a required semantic field is missing and materially changes execution, report one blocker instead of guessing.

## Execution lifecycle

1. Coordinator accepts and routes the job.
2. Router supplies exact scope, attempt and latest checkpoint.
3. Executor audits only canonical/allowed inputs and preserves dirty state.
4. After each meaningful stage, executor persists `DONE / NEXT / BLOCKER`.
5. Executor implements the smallest compliant change and runs the declared tests.
6. Executor declares `PROJECT_STATE_CHANGE: NONE|PROPOSED|APPLIED`.
7. Executor emits exactly one terminal receipt when required.
8. Dispatcher reconciles GitHub evidence; Development Evaluator recommends `PASS`, `PARTIAL` or `BLOCKED`; coordinator owns status.

## Result semantics

- `PASS`: all acceptance criteria satisfied; any manual checks are explicitly listed and non-blocking.
- `PARTIAL`: useful in-scope result exists, but at least one acceptance criterion is not satisfied; state the single primary gap.
- `BLOCKED`: no safe compliant continuation exists; state at most one real blocker and evidence.

Recommended workflow status is separate from result: normally `status:review` after a complete delivery, or `blocked` when continuation requires new authority/input. Executor recommends; dispatcher/coordinator writes.

## Evidence levels

- `SUMMARY`: concise result and checks, sufficient for low-risk trivial work.
- `REPRODUCIBLE`: exact changed files, commands/checks, relevant outputs and rollback.
- `OFFLINE_READY`: reproducible evidence plus allowlist/negative scans, artifact integrity and enough handoff context for evaluation without production access.

## Scope changes

Do not silently broaden a job. Pause at a checkpoint and request a follow-up job or amended contract when a needed path/action is outside scope, destructive, production-facing or data-sensitive.
