# Project Validation Report

Generated: 2026-08-04T19:30:20.088Z

## Identity

- **Title:** Constitutional Capitalism
- **Subtitle:** Restoring Prosperity Through Constitutional Principles
- **Version:** 0.2.0-phase1
- **Status:** foundational_declaration

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
- HEAD: `71cce43`
- Git status:
```
M apps/book-site/src/env.d.ts
 M apps/book-site/src/layouts/BaseLayout.astro
 M apps/book-site/src/lib/data.ts
 M apps/book-site/src/pages/definition.astro
 M apps/book-site/src/pages/index.astro
 M apps/book-site/src/pages/principles.astro
 M apps/book-site/src/pages/sitemap.xml.ts
 M apps/book-site/src/pages/status.astro
 M apps/build-board/src/lib/data.ts
 M apps/build-board/src/pages/constitution.astro
 M apps/build-board/src/pages/index.astro
 M apps/build-board/src/pages/policy.astro
 M apps/build-board/src/pages/research.astro
 M content/manuscript/closing/01-the-declaration-of-constitutional-capitalism.md
 M content/manuscript/front-matter/05-the-definition-of-constitutional-capitalism.md
 M content/manuscript/front-matter/06-the-central-proposition.md
 M content/manuscript/part-02/01-the-purpose-of-an-economy.md
 M content/manuscript/part-02/02-the-dignity-of-work.md
 M content/manuscript/part-02/04-the-responsibilities-of-ownership.md
 M content/manuscript/part-02/05-competition-protects-liberty.md
 M content/manuscript/part-02/08-power-naturally-concentrates.md
 M content/manuscript/part-02/09-government-must-be-limited-and-capable.md
 M content/manuscript/part-02/11-ownership-is-the-foundation-of-economic-freedom.md
 M content/manuscript/part-03/10-article-ix-the-proper-role-of-government.md
 M content/manuscript/part-06/01-reform-without-revolution.md
 M content/manuscript/part-06/08-international-adoption-and-national-adaptation.md
 M data/decisions/decisions.json
 M data/generated/progress_snapshot_latest.json
 M data/manuscript/book_structure.json
 M data/manuscript/chapters_index.json
 M data/metrics/build_history.json
 M data/metrics/progress_layers.json
 M data/metrics/progress_snapshot.json
 M data/metrics/project_milestones.json
 M data/project/book_identity.json
 M data/project/current_build_state.json
 M data/project/latest_cursor_return.json
 M data/project/objections.json
 M data/project/open_questions.json
 M data/project/phases.json
 M data/project/principles.json
 M data/project/risk_register.json
 M data/project/slice_queue.json
 M data/project/terms_to_define.json
 M data/project/updates.json
 M data/research/claim_ledger.json
 M data/research/research_questions.json
 M docs/handoffs/CURRENT_THREAD_HANDOFF.md
 M reports/CURRENT_THREAD_HANDOFF.md
 M reports/PROJECT_VALIDATION_REPORT.md
 M scripts/generate-progress-snapshot.mjs
 M scripts/validate-content.mjs
 M scripts/validate-progress-snapshot.mjs
 M scripts/validate-project-data.mjs
```

## Schema / Data Validation

Structured records under `data/` are validated by `pnpm project:validate` and `pnpm content:validate`.

- Architectural units: **98**
- Numbered chapters: **91**
- Open decisions: **25**
- Open risks: **24**

## Application Builds

| App | Dist output |
|---|---|
| book-site | present |
| build-board | present |

## Progress

**Overall:** 34%

| Layer | Progress | % | Status |
|---|---|---|---|
| Project Governance | ██████████████████░░ | 90% | strong |
| Book Architecture | ██████████████████░░ | 90% | strong |
| Foundational Philosophy | ██████████████░░░░░░ | 70% | underway |
| Manuscript | █░░░░░░░░░░░░░░░░░░░ | 3% | early |
| Research Foundation | █████░░░░░░░░░░░░░░░ | 27% | early |
| Source Verification | ░░░░░░░░░░░░░░░░░░░░ | 2% | early |
| Policy Development | ███░░░░░░░░░░░░░░░░░ | 15% | early |
| Economic Modeling | ░░░░░░░░░░░░░░░░░░░░ | 0% | not_started |
| Constitutional Analysis | █████░░░░░░░░░░░░░░░ | 25% | early |
| Legal Review | ░░░░░░░░░░░░░░░░░░░░ | 0% | not_started |
| Editorial Review | ██░░░░░░░░░░░░░░░░░░ | 10% | early |
| Public Book Website | █████████████░░░░░░░ | 65% | underway |
| Build Board | ██████████████░░░░░░ | 70% | underway |
| Accessibility | ████████░░░░░░░░░░░░ | 40% | underway |
| Publishing Formats | ██░░░░░░░░░░░░░░░░░░ | 8% | early |
| Free Distribution | ████░░░░░░░░░░░░░░░░ | 20% | early |
| Deployment Readiness | ███████████░░░░░░░░░ | 55% | underway |
| Public Launch Readiness | ████░░░░░░░░░░░░░░░░ | 18% | early |

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
