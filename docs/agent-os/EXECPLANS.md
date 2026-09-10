# Optional ExecPlan policy

An ExecPlan is an optional, temporary execution aid. It is not a required artifact for every Development Job and never becomes Project State, backlog, ADR or acceptance contract.

## When it helps

Use an ExecPlan when one or more applies:

- work spans multiple components or independent stages;
- rollback/order/concurrency is non-trivial;
- the job is long-running and checkpoint recovery matters;
- acceptance requires several evidence classes;
- unknowns can be resolved inside the accepted scope.

Skip it for a narrow, obvious edit where the Development Job plus checkpoint is enough.

## Minimum contents

- job ID and goal;
- ordered stages and their exit criteria;
- paths/components affected;
- gates, risks and rollback per risky stage;
- validation/evidence to collect;
- current `DONE / NEXT / BLOCKER` pointer.

## Rules

- The Development Job always wins. An ExecPlan cannot add scope, weaken gates or redefine acceptance.
- Store it in the job/checkpoint context unless a job explicitly permits a task-specific file. Do not create a global `ROADMAP.md`.
- Update it only as execution evidence changes. Durable verified outcomes go selectively to `PROJECT_STATE.md`; decisions go to ADR; tasks go to GitHub issues.
- Delete/revert a task-specific plan only when the job rollback explicitly covers it; never clean unrelated work.
