# Project Validation Report

Generated: 2026-08-04T18:57:15.396Z

## Identity

- **Title:** Constitutional Capitalism
- **Subtitle:** Restoring Prosperity Through Constitutional Principles
- **Version:** 0.1.0-phase0
- **Status:** foundation

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
- HEAD: `(unavailable: Command failed: git rev-parse --short HEAD)`
- Git status:
```
(clean)
```

## Schema / Data Validation

Structured records under `data/` are validated by `pnpm project:validate` and `pnpm content:validate`.

- Architectural units: **98**
- Numbered chapters: **91**
- Open decisions: **13**
- Open risks: **19**

## Application Builds

| App | Dist output |
|---|---|
| book-site | present |
| build-board | present |

## Progress

**Overall:** 24%

| Layer | Progress | % | Status |
|---|---|---|---|
| Project Governance | █████████████████░░░ | 85% | strong |
| Book Architecture | ██████████████████░░ | 90% | strong |
| Foundational Philosophy | █████░░░░░░░░░░░░░░░ | 25% | early |
| Manuscript | █░░░░░░░░░░░░░░░░░░░ | 3% | early |
| Research Foundation | ████░░░░░░░░░░░░░░░░ | 20% | early |
| Source Verification | ░░░░░░░░░░░░░░░░░░░░ | 0% | not_started |
| Policy Development | ██░░░░░░░░░░░░░░░░░░ | 10% | early |
| Economic Modeling | ░░░░░░░░░░░░░░░░░░░░ | 0% | not_started |
| Constitutional Analysis | █░░░░░░░░░░░░░░░░░░░ | 5% | early |
| Legal Review | ░░░░░░░░░░░░░░░░░░░░ | 0% | not_started |
| Editorial Review | ░░░░░░░░░░░░░░░░░░░░ | 0% | not_started |
| Public Book Website | ████████░░░░░░░░░░░░ | 40% | underway |
| Build Board | █████████░░░░░░░░░░░ | 45% | underway |
| Accessibility | ███████░░░░░░░░░░░░░ | 35% | underway |
| Publishing Formats | █░░░░░░░░░░░░░░░░░░░ | 5% | early |
| Free Distribution | ███░░░░░░░░░░░░░░░░░ | 15% | early |
| Deployment Readiness | ██████████░░░░░░░░░░ | 50% | underway |
| Public Launch Readiness | █░░░░░░░░░░░░░░░░░░░ | 5% | early |

## Deployment Readiness

### Constitutional Capitalism Book Site
- Status: `not_deployed`
- Base directory: `apps/book-site`
- Build: `pnpm build`
- Publish: `dist`
- Production URL: _not yet configured_
- Manual setup remaining: 6 items

### Constitutional Capitalism Build Board
- Status: `not_deployed`
- Base directory: `apps/build-board`
- Build: `pnpm build`
- Publish: `dist`
- Production URL: _not yet configured_
- Manual setup remaining: 7 items


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
