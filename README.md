# Constitutional Capitalism

**Restoring Prosperity Through Constitutional Principles**

This repository is the canonical operating system for developing, researching, writing, publishing, and tracking the Constitutional Capitalism project.

## Canonical definition

> Constitutional Capitalism is an economic philosophy in which free markets, private property, entrepreneurship, and innovation are protected by constitutional principles that ensure economic power remains accountable to the people. It recognizes that wealth is most effectively created through free enterprise, but that lasting prosperity depends upon broad opportunity, meaningful competition, responsible ownership, and institutions that prevent the excessive concentration of economic or political power.

## Central belief

> The purpose of an economy is not merely to create wealth, but to create a prosperous, free, and self-governing people.

## Repository layout

- `apps/book-site` — public book website (Astro)
- `apps/build-board` — master Build Board (Astro)
- `content/` — manuscript, research notes, declarations, glossary
- `data/` — canonical structured project records (source of truth)
- `docs/` — governance, writing, research, publishing, operations
- `scripts/` — H:-only env, validation, progress, reports
- `schemas/` — JSON Schema validators
- `reports/` — generated validation and return reports

## H:-only protocol

Local development must keep project-controlled caches and temps on `H:`.

```powershell
cd H:\Constitutional-Capitalism
powershell -ExecutionPolicy Bypass -File scripts\enter-cc-environment.ps1
pnpm env:verify
pnpm install
```

Honest scope: Windows, Cursor, and Git may still touch `C:` for system internals. The enforceable rule is that project-controlled outputs and caches are redirected to `H:`.

## Scripts

| Command | Purpose |
|---|---|
| `pnpm env:verify` | Verify H:-only paths |
| `pnpm book:dev` / `pnpm board:dev` | Local app servers |
| `pnpm content:validate` | Manuscript/content checks |
| `pnpm project:validate` | Schema validation |
| `pnpm progress:generate` | Derive progress snapshot from data |
| `pnpm gate` | Full validation + builds + reports |

## Deployment

Two Netlify sites from one GitHub repo:

1. Book site — see `netlify.book.toml` and `docs/deployment/`
2. Build Board — see `netlify.board.toml` (enable access protection before sensitive content)

## Status

Phase 0 complete · Phase 1 **LOCKED / CLOSED** · Phase 2 **PARTIAL** (diagnosis / proof foundation).  
Overall progress is regenerated from canonical data (`pnpm progress:generate`) — currently mid-40s%; do not treat as Phase 2 completion. Manuscript chapters remain architectural placeholders. Modeling and legal review remain 0%. Licensing decision open.

Latest forensic audit: `reports/CC_FORENSIC_AUDIT_STATUS_AND_FORWARD_PLAN_2026-08-07.md`  
AI operators: begin at `START_HERE_FOR_AI.md`.

