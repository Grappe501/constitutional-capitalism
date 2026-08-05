# START HERE FOR AI

Mission context for any AI assistant working on **Constitutional Capitalism**.

## Canonical root

`H:\Constitutional-Capitalism`

Remote: https://github.com/Grappe501/constitutional-capitalism

## Read first

1. This file
2. `README.md`
3. `PROJECT_MASTER_MAP.md`
4. `CONSTITUTIONAL_CAPITALISM_MASTER_BUILD_PLAN.md`
5. `data/project/book_identity.json`
6. `data/project/current_build_state.json`
7. `data/project/latest_cursor_return.json`
8. `docs/governance/H_DRIVE_ONLY_PROTOCOL.md`
9. `docs/handoffs/CURRENT_THREAD_HANDOFF.md`

## Hard rules

- **H:-only** for all project-controlled files, caches, temps, and artifacts.
- Never invent citations, economic proof, or legal conclusions.
- Never present unfinished chapters as finished.
- Never change the canonical title or subtitle.
- Never commit secrets.
- Licensing requires Steve's explicit approval.
- Source of truth is `data/` and `content/`, not the dashboard UI.

## Environment bootstrap

```powershell
cd H:\Constitutional-Capitalism
powershell -ExecutionPolicy Bypass -File scripts\enter-cc-environment.ps1
pnpm env:verify
```

## Common commands

```powershell
pnpm content:validate
pnpm project:validate
pnpm research:validate
pnpm baseline:validate
pnpm progress:generate
pnpm book:dev
pnpm board:dev
pnpm gate
```

## Apps

| App | Path | Port | Purpose |
|---|---|---|---|
| Book site | `apps/book-site` | 4321 | Public book website |
| Build Board | `apps/build-board` | 4322 | Master project dashboard |

## Collaboration

Steve (owner) · ChatGPT (mission design / review) · Cursor (implementation)

Follow `docs/governance/AI_COLLABORATION_PROTOCOL.md` and handoff docs under `docs/handoffs/`.

## Current direction (Phase 2)

- Phase 1 **ACCEPTED / CLOSED** (build `0f24a8b`, closeout `4fbaacd`); Foundational Philosophy ~70%
- Active mission: `CC-PHASE-2-DIAGNOSIS-RESEARCH-FOUNDATION-1.0` (Evidence + Baseline absorbed as deliverables)
- Parallel (does not block): `CC-CIVIC-DELIBERATION-FEEDBACK-SYSTEM-1.0` — needs secure backend + protected admin; open `CC-DEC-011`
- Public surfaces: `/where-we-are/`, `/evidence/`, `/metrics/`
- Board surfaces: `/diagnosis/`, `/baseline/`, `/evidence/`
- Do **not** rewrite the Declaration; developing doctrine lives in `data/project/developing_doctrine.json`
- Do not invent sources or baseline values; do not inflate modeling/legal/source-verification progress
- Phase 2 expected **partial / Phase 2.1** until remaining domains are fully sourced
- **Justice, Safety, and Restoration** is principal developing doctrine (`CC-DEV-011`–`014`) and a full Phase 2 research domain — research before detailed justice policy (`CC-DEC-043`/`044`)
- **Democracy, Representation, and Distributed Government** is the second constitutional spine (`CC-DEV-015`–`019`) — research before detailed political-structure policy (`CC-DEC-045`/`046`)
- **Public Service and the 21st-Century State** / Government Capacity (`CC-DEV-020`–`028`) — defining design question beyond more/less government; iconic phrase *Government should become invisible—but never unaccountable*; research before detailed administrative policy (`CC-DEC-047`/`048`/`049`); Arkansas inventory/credential are design agendas only; do not invent 80/20 stats or board counts
