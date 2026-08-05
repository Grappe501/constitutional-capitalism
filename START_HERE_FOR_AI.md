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

## Current direction (post–Phase 1)

- Phase 1 declaration complete; next slice: `CC-PHASE-2-EVIDENCE-AND-NATIONAL-BASELINE-1.0`
- **Organizing frame:** where power should reside in a constitutional republic (economics is the first arena)
- Proposed sacred sentence / first principle / subsidiarity / Stewardship pillar: see `docs/architecture/CIVILIZATIONAL_CORE.md` (`CC-DEC-034`–`042`)
- Living website is the intended primary medium; book is the Introduction (`CC-DEC-035`)
- Three parallel books remain content streams (`CC-DEC-030`)
- Phase 2 builds **evidence + National Baseline**, not research notes alone
- Canonical definition/title/subtitle unchanged unless Steve explicitly amends
- Do not invent sources or baseline values; do not lock tax/ownership redesign as finished policy; do not inflate modeling/legal/source-verification progress

