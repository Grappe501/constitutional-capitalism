# Project Validation Report

Generated: 2026-08-05T02:52:43.559Z

## Identity

- **Title:** Constitutional Capitalism
- **Subtitle:** Restoring Prosperity Through Constitutional Principles
- **Version:** 0.2.0-phase1
- **Status:** civilizational_architecture_proposed

## H:-Only Environment

Project-controlled caches and temps must resolve to `H:\Constitutional-Capitalism\.local\...`.

Run `pnpm env:verify` for the authoritative check. This report does not claim OS/editor internals never touch `C:`.

| Variable / Path | Expected |
|---|---|
| TEMP / TMP | H:\Constitutional-Capitalism\.local\tmp |
| npm cache | H:\Constitutional-Capitalism\.local\npm-cache |
| pnpm store | H:\Constitutional-Capitalism\.local\pnpm-store |
| Netlify home | H:\Constitutional-Capitalism\.local\netlify |

## Repository State

- Branch: `main`
- HEAD: `dcf1936`
- Git status:
```
M START_HERE_FOR_AI.md
 M apps/book-site/src/pages/constitutional-citizenship.astro
 M apps/build-board/src/pages/constitutional-citizenship.astro
 M data/decisions/decisions.json
 M data/generated/progress_snapshot_latest.json
 M data/metrics/progress_snapshot.json
 M data/project/civilizational_core.json
 M data/project/constitutional_citizenship_framework.json
 M data/project/developing_doctrine.json
 M data/project/latest_cursor_return.json
 M data/project/principles.json
 M data/project/updates.json
 M data/project/website_information_architecture.json
 M data/research/claim_ledger.json
 M schemas/constitutional_citizenship_framework.schema.json
```

## Schema / Data Validation

Structured records under `data/` are validated by `pnpm project:validate` and `pnpm content:validate`.

- Architectural units: **98**
- Numbered chapters: **91**
- Open decisions: **42**
- Open risks: **24**

## Application Builds

| App | Dist output |
|---|---|
| book-site | present |
| build-board | present |

## Progress

**Overall:** 36%

| Layer | Progress | % | Status |
|---|---|---|---|
| Project Governance | ██████████████████░░ | 90% | strong |
| Book Architecture | ██████████████████░░ | 90% | strong |
| Foundational Philosophy | ██████████████░░░░░░ | 70% | underway |
| Manuscript | █░░░░░░░░░░░░░░░░░░░ | 3% | early |
| Research Foundation | ████████░░░░░░░░░░░░ | 42% | underway |
| Source Verification | ████░░░░░░░░░░░░░░░░ | 20% | early |
| Policy Development | ███░░░░░░░░░░░░░░░░░ | 15% | early |
| Economic Modeling | ░░░░░░░░░░░░░░░░░░░░ | 0% | not_started |
| Constitutional Analysis | █████░░░░░░░░░░░░░░░ | 25% | early |
| Legal Review | ░░░░░░░░░░░░░░░░░░░░ | 0% | not_started |
| Editorial Review | ██░░░░░░░░░░░░░░░░░░ | 10% | early |
| Public Book Website | ██████████████░░░░░░ | 70% | underway |
| Build Board | ███████████████░░░░░ | 75% | underway |
| Accessibility | ████████░░░░░░░░░░░░ | 40% | underway |
| Publishing Formats | ██░░░░░░░░░░░░░░░░░░ | 8% | early |
| Free Distribution | ████░░░░░░░░░░░░░░░░ | 20% | early |
| Deployment Readiness | ███████████░░░░░░░░░ | 55% | underway |
| Public Launch Readiness | ████░░░░░░░░░░░░░░░░ | 20% | early |

## Deployment Readiness

### Constitutional Capitalism Book Site
- Status: `deployed`
- Base directory: `apps/book-site`
- Build: `pnpm build`
- Publish: `dist`
- Production URL: https://constitutional-capitalism.netlify.app
- Manual setup remaining: 1 items

### Constitutional Capitalism Build Board
- Status: `deployed`
- Base directory: `apps/build-board`
- Build: `pnpm build`
- Publish: `dist`
- Production URL: https://constitutional-capitalism-board.netlify.app
- Manual setup remaining: 2 items


## Current Limitations

- Manuscript chapters are concept placeholders only.
- No citations invented; source registry is empty.
- No economic modeling completed.
- No legal review completed.
- Build Board is not access-protected yet.
- Licensing decision remains open.
- Public byline remains configurable / undecided.

## Deployment Readiness Verdict

Local foundation and Netlify configuration files are prepared. Production URLs must be recorded only after confirmed Netlify Git integration deploys.

## Notes

- Source of truth: structured files in `data/`
- Dashboard and this report are derived views
