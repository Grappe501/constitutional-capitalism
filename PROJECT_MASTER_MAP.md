# Project Master Map

Last updated: 2026-08-04

## Purpose

Map every major system in the Constitutional Capitalism repository.

## Systems

| System | Location | Role |
|---|---|---|
| Book identity | `data/project/book_identity.json` | Canonical title, definition, belief |
| Book architecture | `data/manuscript/book_structure.json` | Parts, chapters, stable IDs |
| Manuscript files | `content/manuscript/` | Chapter Markdown placeholders |
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

Phase 0 — Foundation and Governance

