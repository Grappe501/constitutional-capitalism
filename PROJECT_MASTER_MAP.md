# Project Master Map

Last updated: 2026-08-04 (Phase 2 diagnosis foundation)

## Purpose

Map every major system in the Constitutional Capitalism repository.

## Systems

| System | Location | Role |
|---|---|---|
| Book identity | `data/project/book_identity.json` | Canonical title, definition, belief |
| Book architecture | `data/manuscript/book_structure.json` | Parts, chapters, stable IDs |
| Manuscript files | `content/manuscript/` | Chapter Markdown placeholders |
| Declaration | `content/declarations/` | Philosophical spine |
| Argument layers | `docs/writing/ARGUMENT_LAYERS_STANDARD.md` | Principles / proposals / predictions / evidence |
| Civilizational core | `docs/architecture/CIVILIZATIONAL_CORE.md` + `data/project/civilizational_core.json` | Sacred sentence, power hierarchy, pillars, subsidiarity (`CC-DEC-034`+) |
| Living website IA | `docs/architecture/LIVING_PROJECT_AND_WEBSITE.md` + `data/project/website_information_architecture.json` | Domain tree + life-path tree; book as Introduction (`CC-DEC-035`) |
| Three-book architecture | `docs/architecture/THREE_BOOK_ARCHITECTURE.md` + `data/project/three_book_architecture.json` | Public book / Evidence Companion / Implementation Manual (`CC-DEC-030`) |
| Evidence Companion | `content/evidence-companion/` | Book Two dossiers linked to claim ledger |
| Implementation Manual | `content/implementation-manual/` | Book Three practical pathways |
| National Baseline | `docs/architecture/NATIONAL_BASELINE_AND_DASHBOARD.md` + `data/project/national_baseline.json` + `data/baseline/` | Success-measure slots + sourced metrics subset (`CC-DEC-033`) |
| National Diagnosis | `content/research/national-diagnosis/` | Domain briefs (priority first-pass + foundational) |
| Developing doctrine | `data/project/developing_doctrine.json` | Post–Phase-1 concepts — not Declaration rewrite |
| Transition timeline | `data/project/transition_timeline.json` + `docs/architecture/TRANSITION_AND_IMPLEMENTATION_TIMELINE_FRAMEWORK.md` | Implementation timeline framework |
| Testing / pilots | `data/testing/` + `docs/research/TESTING_AND_PILOT_STANDARD.md` | Pilot/testing standard (no fake pilots) |
| Constitutional Capitalism Test | `docs/governance/CONSTITUTIONAL_CAPITALISM_TEST.md` + `data/project/constitutional_capitalism_test.json` | Ten-question policy screen (`CC-DEC-031`) |
| Chapter evaluation template | `docs/writing/CHAPTER_EVALUATION_TEMPLATE.md` + `data/project/chapter_evaluation_template.json` | Closing block for developed chapters (`CC-DEC-032`) |
| Transition architecture | `docs/architecture/TRANSITION_AND_TESTING_ARCHITECTURE.md` | 10–20 year testing & transformation design |
| Transition scenarios | `data/project/transition_scenarios.json` | Labeled implementation scenarios |
| Prediction ledger | `data/project/prediction_ledger.json` | Forecasts that are not yet evidence |
| National impact assessments | `data/project/national_impact_assessments.json` | Domain analysis agendas |
| Institute (proposed) | `docs/architecture/CONSTITUTIONAL_CAPITALISM_INSTITUTE.md` | Fourth component proposal (`CC-DEC-028`) |
| Research registers | `data/research/` | Sources, claims, queues |
| Research notes | `content/research/` | Domain research directories |
| Policy system | `data/project/policy_*.json` | Pillars and proposals |
| Constitutional articles | `data/project/constitutional_articles.json` | Emerging economic constitution |
| Decisions | `data/decisions/decisions.json` | Open/approved/rejected decisions |
| Risks | `data/project/risk_register.json` | Risk register |
| Progress | `data/metrics/` | Layers, snapshots, milestones |
| Build slices | `data/project/slice_queue.json` | Mission/slice queue |
| Book site | `apps/book-site` | Public website |
| Build Board | `apps/build-board` | Master dashboard |
| Governance docs | `docs/governance/` | Project rules |
| Validation | `scripts/` + `schemas/` | Machine checks |
| CI | `.github/workflows/check.yml` | PR/main validation |
| Netlify | `netlify.book.toml`, `netlify.board.toml` | Dual deploy configs |

## Authority order

1. Steve's explicit decisions
2. Canonical JSON in `data/`
3. Governance documents in `docs/`
4. Manuscript content in `content/`
5. Derived UI (sites/board/reports)

## Current phase

Phase 1 **ACCEPTED / CLOSED**. Active: `CC-PHASE-2-DIAGNOSIS-RESEARCH-FOUNDATION-1.0` (absorbs Evidence + National Baseline). Parallel: civic deliberation feedback system (queued; does not block). Phase 2 is expected partial until Phase 2.1 finishes remaining domains.
