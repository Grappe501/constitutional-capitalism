# CC-PUBLICATION-EVIDENCE-UPGRADE-PASS-1.0 — Return

**Status:** PASSED  
**Date:** 2026-08-11  
**Mode:** Publication bind only — no new ingest harvest.  
**Standard:** CC-DEC-104 (data-dense by default; progressive disclosure; no decorative statistics).

## Executive summary

Cashed in the legislative/civic targeted ingest by binding **traceable** evidence into highest-reuse public and research surfaces. Headline political-money number uses the authentic baseline (`CC-IND-D04` = **73%** from FEC weball), not the capped OpenFEC API sample. Google Civic remains unbound (PARTIAL / IP-restricted).

| Dial | Reality |
|---|---:|
| Evidence panels created | **3** |
| Public surfaces upgraded | Book + Board `/democracy/` |
| Research/content files upgraded | **8** |
| Public Reasoning records upgraded | **2** |
| New sources registered | **CC-SRC-265–268** (total **268**) |
| Claims touched (no causal overclaim) | `CC-CLAIM-134`, `CC-CLAIM-003`, `CC-CLAIM-024` |
| Baseline scoreboard | unchanged **42/64** |

## Governing rule applied

> No decorative statistics. Every number, chart, table, or map must answer a question the reader is likely to have at that point in the text.

Also applied: disclosure ≠ capture; capped API series must not overwrite weball D04.

## Panels

| Panel ID | Reader question | Strength |
|---|---|---|
| `CC-EP-DEMOCRACY-POLITICAL-MONEY-1` | How concentrated is congressional campaign funding, and what legislative structure is observable? | Strong (observability) / NEE (capture) |
| `CC-EP-AR-COMMUNITY-CONTEXT-1` | What statewide backdrop surrounds AR LCL cases? | Partial (context only) |
| `CC-EP-COMPARISON-POLITICAL-MONEY-1` | What political-money concentration figure is measured on comparison pages? | Strong (observability) |

Canonical: `data/project/publication_evidence_panels.json`

## Surfaces upgraded

### Public sites
- `apps/book-site` — new `EvidencePanel.astro` on `/democracy/`
- `apps/build-board` — matching Evidence Panel section on `/democracy/`

### Research / content
- `content/research/national-diagnosis/22-democracy-representation-and-distributed-government.md`
- `content/research/national-diagnosis/16-political-and-economic-power.md`
- `content/public-resources/systems/plutocracy.md`
- `content/public-resources/systems/crony-capitalism.md`
- `content/research/case-studies/rose-bud/00-overview.md`
- `content/research/case-studies/lewisville/00-overview.md`

### Public Reasoning
- `reports/public_reasoning/CC-PR-007_CC-CLAIM-003.md`
- `reports/public_reasoning/CC-PR-010_CC-CLAIM-003.md`

### Ledgers
- Sources `CC-SRC-265`–`CC-SRC-268`
- Claim publication_evidence bindings for 003 / 024 / 134 (**003 support level unchanged**)

## Explicitly not done

- No Google Civic contest/election numbers published (still PARTIAL).
- No upgrade of `CC-CLAIM-003` from Not Enough Evidence.
- No wholesale rewrite of all 253 EVIDENCE_READY opportunities.
- No capped OpenFEC API concentration series on public panels.

## Success criterion

Existing democracy / political-money / comparison / LCL / Public Reasoning surfaces now show **claim-adjacent** measurable evidence with progressive disclosure — denser, honest, and tied to `CC-IND-D04` + RedDirt export provenance rather than warehouse-only research.

## Exact next slice

**`CC-PUBLICATION-EVIDENCE-UPGRADE-PASS-2.0`** — continue highest-reuse bind queue (more Public Reasoning + journalism module + sectoral dossiers), and/or re-run Google Civic from an IP-allowed machine first if contest structure is needed on community pages.
