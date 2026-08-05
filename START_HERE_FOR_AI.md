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

## Official active state (CC-DEC-064)

```text
Phase 1: ACCEPTED / CLOSED
Current mission: CC-PHASE-2-DIAGNOSIS-RESEARCH-FOUNDATION-1.0
Evidence/Baseline slice: ABSORBED ALIAS
Civic deliberation: APPROVED PARALLEL / NOT ACTIVE IN THIS MISSION
Current HEAD: read from git (authorization-era note 7184b70 is historical)
Overall baseline: read from progress snapshot (honest mid-30s%; do not hardcode)
Primary question: What can we prove?
Phase 2 status: PARTIAL
Next slice if incomplete: CC-PHASE-2.1-DIAGNOSIS-RESEARCH-CONTINUATION-1.0
```

Lock file: `data/project/phase2_mission_lock.json` · Burt handoff: `docs/handoffs/BURT_PHASE_2_MISSION_LOCK.md`

## Current direction (Phase 2)

- **Phase 1 = belief; Phase 2 = proof.** Scaffolding is not completion.
- Active mission: `CC-PHASE-2-DIAGNOSIS-RESEARCH-FOUNDATION-1.0` (Evidence + Baseline absorbed as deliverables, not competing slices)
- **Three-layer rule (mandatory):** every diagnosis brief must distinguish (1) what the data directly establishes, (2) what may reasonably be inferred, (3) what Constitutional Capitalism normatively concludes — see `content/research/national-diagnosis/DIAGNOSIS_BRIEF_STANDARD.md`
- Acceptance criteria live in the mission lock; if unmet, return `Phase 2 status: PARTIAL` / next slice `CC-PHASE-2.1-DIAGNOSIS-RESEARCH-CONTINUATION-1.0`
- Parallel (not active in this mission): `CC-CIVIC-DELIBERATION-FEEDBACK-SYSTEM-1.0` — no public feedback backend on the unprotected Build Board; open `CC-DEC-011`
- Public surfaces: `/where-we-are/`, `/evidence/`, `/metrics/`
- Board surfaces: `/diagnosis/`, `/baseline/`, `/evidence/`
- Do **not** rewrite the Declaration; developing doctrine + capture clusters live in `data/project/developing_doctrine.json`
- Cross-domain map: `data/research/system_interdependencies.json` (documented / plausible / disputed / untested)
- Do not invent sources or baseline values; do not inflate modeling/legal/source-verification progress — modeling and legal stay **0%**
- Phase 2 remains **PARTIAL** until acceptance criteria are met; remaining domains may honestly roll into Phase 2.1
- **Community Safety, Justice, and Restoration** is principal developing doctrine (`CC-DEV-011`–`014`, `CC-DEV-046`–`052`) and a full Phase 2 research domain — complete Community Safety and Restoration System plus Permanent Public Safety System (humane permanent incapacitation with continuing review; never “unworthy of reentry”; Secure Public Safety Campuses design agenda) (`CC-DEC-043`/`044`/`058`/`059`); do not invent crime/recidivism stats; private-prison federal timeline is 2016 Yates / 2017 Sessions rescission (not 2023); aging misconduct/rearrest → DOJ OIG 15-05, aging health costs → GAO-17-379
- **Democracy, Representation, and Distributed Government** is the second constitutional spine (`CC-DEV-015`–`019`) — research before detailed political-structure policy (`CC-DEC-045`/`046`)
- **Public Service and the 21st-Century State** / Government Capacity (`CC-DEV-020`–`028`) — defining design question beyond more/less government; iconic phrase *Government should become invisible—but never unaccountable*; research before detailed administrative policy (`CC-DEC-047`/`048`/`049`); Arkansas inventory/credential are design agendas only; do not invent 80/20 stats or board counts
- **Constitutional Transparency and the People's Ledger** (`CC-DEV-029`–`032`) — fourth institutional spine; information held in trust; presumed open with justified exceptions; People's Ledger is a design agenda (`CC-DEC-050`/`051`); do not invent FOIA/portal statistics
- **Essential Systems** (`CC-DEV-033`–`037`) — banking/insurance/healthcare/pharma via system design and incentives, not inherent-corruption conclusions; Community Health Index design agenda (`CC-DEC-052`/`053`); do not invent sector stats or unsupported systemic-intent claims
- **Human Capital Doctrine** (`CC-DEV-038`–`041`) — human capital infrastructure; equal-dignity pathways; regional academies as pilot design agenda, not locked statewide design (`CC-DEC-054`/`055`); do not invent academy outcomes; ASMSA is institutional reference only until sourced
- **Build Your Community / Community OS** (`CC-DEV-042`–`045`) — playbooks as signature; seven-layer architecture; Implementation Completeness Rule; Community OS is design agenda not operating product (`CC-DEC-056`/`057`); do not invent town growth outcomes; AI organizes best practices only
- **Resource Sovereignty and Community Stewardship** (`CC-DEV-053`–`057`) — central doctrine: resources belong first to the place that bears the burden; Community Resource Compacts, progressive pricing, local dividends/equity, sector rules for mining/data centers/warehouses, Resource and Pollution Ledger, Local Carbon Restoration Exchange, community-owned energy, household energy floor (`CC-DEC-060`/`061`); Compacts/Ledger/Exchange are design agendas; illustrative dividend % require modeling; GHGRP is politically changeable; do not invent water/power/carbon stats
- **Community Food Security System** (`CC-DEV-058`–`061`) — food as critical infrastructure; meaningful local essential-food capacity plus broader markets; reject “mass production food becomes export only”; Regional Food Network / State Food Exchange / Dashboard are design agendas (`CC-DEC-062`/`063`); do not invent local-sourcing or food-waste statistics
