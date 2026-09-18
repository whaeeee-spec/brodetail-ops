# BRODETAIL Development Jobs v0.1

Canonical schema identifier: `brodetail.development-job/v0.1`.

A Development Job is the executable contract between Coordinator, Task Router, Worker and Development Evaluator. Every field constrains decisions and evidence; chat history cannot widen the accepted scope.

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

Router metadata also provides executor, area, size/mode/attempt and an explicit path allowlist. If a missing field would materially change execution, Worker reports one blocker instead of guessing.

## Accepted lifecycle

`AGENTS/Job -> optional ExecPlan -> Worker -> Build/Tests/Smoke -> Development Evaluator -> commit/PR/Result Relay -> verified PROJECT_STATE / durable learning`

1. Coordinator accepts the job; Router supplies its exact scope, attempt and checkpoint.
2. Optional ExecPlan decomposes complex work but cannot redefine the job.
3. Worker audits only allowed canonical inputs, preserves unrelated dirty state and persists `DONE / NEXT / BLOCKER` after meaningful stages.
4. Worker implements the smallest compliant change and runs the declared build/tests/smoke checks.
5. Development Evaluator scores and returns its verdict against the accepted contract.
6. Allowed commit/PR and exactly one terminal Result Relay receipt carry the evaluated evidence; Dispatcher/Coordinator owns GitHub mutation.
7. Evaluator/Coordinator decides whether verified Project State or durable learning changes.

## Worker result status

Worker/result status describes execution, not acceptance:

- `PASS` — Worker completed the scoped implementation and declared checks.
- `PARTIAL` — useful in-scope result exists but at least one requested item remains incomplete.
- `BLOCKED` — no safe compliant continuation exists because of one concrete blocker.

Recommended workflow status is separate: normally `status:review` after complete delivery, or `blocked` when new authority/input is required. Worker recommends; Dispatcher/Coordinator writes.

## Development Evaluator verdict

Evaluator verdict is a separate vocabulary and never substitutes for worker/result status:

- `PASS`
- `PASS_WITH_NOTES`
- `FAIL`

The evaluator also provides score `0-100`; hard safety failures override score. On `FAIL`, it must return an exact rework list.

## PROJECT_STATE_CHANGE decision

`PROJECT_STATE_CHANGE` is an Evaluator/Coordinator decision with exactly one value: `YES` or `NO`. It is not a worker result and not a workflow status. A worker may submit evidence or a recommendation, but worker assertion alone never verifies Project State.

## Evidence levels

- `SUMMARY`: concise result and checks, sufficient for low-risk trivial work.
- `REPRODUCIBLE`: exact changed files, commands/checks, relevant outputs and rollback.
- `OFFLINE_READY`: reproducible evidence plus allowlist/negative scans, artifact integrity and enough handoff context for evaluation without production access.

## Scope changes

Do not silently broaden a job. Pause at a checkpoint and request a follow-up job or amended contract when a needed path/action is outside scope, destructive, production-facing or data-sensitive.
