# ADR-001 — Canonical operational writer ownership

Date: 2026-09-05
Status: ACCEPTED FOR CONTROL-PLANE / production wiring still separately gated.

## Decision

BRODETAIL operational truth is PostgreSQL behind the canonical CRM service layer.

No other runtime may independently own or mutate canonical clients, vehicles, bookings/appointments, orders, order items or finance.

This ADR does not deploy code or migrate data. It fixes the ownership boundary so future implementation cannot accidentally create a third CRM.

## Writer matrix

| Entity / fact | Canonical authority | Allowed secondary storage | Forbidden operational behavior |
|---|---|---|---|
| Client | PostgreSQL CRM | read-only projections; cache | creating/updating an independent client in D1/SQLite as a second truth |
| Vehicle | PostgreSQL CRM | read-only projection/cache | independent vehicle ownership/history outside canonical CRM |
| Lead / intake event | canonical CRM intake/service layer | durable queue/outbox with stable event IDs | second lead writer that bypasses canonical intake |
| Booking / appointment | canonical CRM service layer | UI projection; retry queue | local-only create/reschedule/cancel that can diverge from CRM |
| Order | PostgreSQL CRM | analytics projection | independent order lifecycle in D1/SQLite |
| Order item | PostgreSQL CRM | analytics projection | independent item mutation outside CRM |
| Finance / payment / refund | PostgreSQL CRM | analytics/read-only export | finance writes from website/Cabinet/TV/AI runtime |
| Conversation/channel event | channel provenance + canonical event pipeline | durable cursor/queue | treating chat store as CRM truth |
| Auth/session/OTP state | technical runtime store permitted | Node SQLite or other bounded technical store | using auth/session DB as business truth |
| Blob/photo content | private file/blob storage | filesystem/R2/object store | public static storage or ownership inferred only from path |
| Blob/photo ownership metadata | canonical service layer / PostgreSQL | read-only projection | file access based only on token/path without canonical ownership/retention policy |
| Queue/outbox delivery state | durable technical queue | SQLite/Postgres/queue service | queue row becoming the primary client/order/finance fact |
| TV / analytics / CHAT_OUTCOME | canonical read-only projection | derived analytics store | operational writes back into CRM without a separately approved command path |
| Work / Codex | source changes + receipts only | Git/GitHub artifacts | direct ownership of customer/business operational facts |
| GitHub Result Ledger | change-control authority only | issue comments/checkpoints | storing PII/raw chats or treating receipt status as CRM/business state |

## Specific consequences for current work

### #45 BroWheel + Cabinet

Node/SQLite is allowed for technical runtime state, cache, local development fixtures, queue state and session/auth state.

It is **not** allowed to become an independent production writer for clients, cars, appointments, orders or finance.

Before production release, create/reschedule/cancel and Cabinet history must resolve through the canonical CRM service layer or its read-only projection.

### #39 / #47 VK + Avito

Channel detection and intent classification may run independently.

A qualified channel event becomes a CRM fact only through the canonical intake/consumer using stable event IDs, retry, dedup and explicit production gate.

`SEND` remains a separate permission and stays OFF unless separately approved.

### #42 / #48 Glass

Glass form data must reuse canonical intake. Photos may use private blob/file storage, but ownership, purpose and retention metadata must be canonical and access-controlled.

No second glass-specific CRM writer is allowed.

### #33 TV

TV is read-only. It must consume a canonical projection with freshness/as-of metadata and must never mutate CRM/business facts.

### #35 / #46 CHAT_OUTCOME

CHAT_OUTCOME is derived analytics. It may reference canonical stable IDs and redacted projections, but it never overwrites confirmed CRM facts. Ambiguous links remain ambiguous/UNKNOWN.

## Release invariants

A release that touches operational data must prove all of the following before production approval:

1. One documented canonical writer per business entity.
2. Stable event/command ID and explicit retry semantics.
3. Duplicate/replay behavior across restart/timeout where relevant.
4. No local/D1/SQLite fallback that silently creates an independent business record.
5. Read models are rebuildable from canonical facts or explicitly marked non-authoritative.
6. Production receipt identifies scope: `local`, `staging`, `production`, plus immutable source/artifact evidence.

## Migration-source rule

Existing D1/R2/historical files remain protected migration/archive sources until reconciliation and retention are complete.

Being preserved as a source does not grant them permission to continue as production operational writers.

## Rollback

This is a documentation/control-plane decision only. Revert the commit if the architecture decision itself is superseded. No production data or runtime rollback is required for this ADR.
