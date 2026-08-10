# RCIP-BASELINE-ALIGNED-SERIES-EXPANSION-1.0 — Return

**Status:** PASSED  
**Date:** 2026-08-10  
**Export:** `exp_79f42d2fe71f4b69`

## Executive summary

The ingestion plan is now ontology-driven. RedDirt ingested four baseline-aligned Census series with pre-declared DIRECT MATCH targets, exported cleanly, and CC mapped them without redefining metrics after the fact.

**Baseline: 38/64 → 42/64**

## Hard lesson confirmed

> A functioning pipeline is not enough. The ingestion plan must be driven by the research ontology.

The prior 12-observation ACS/BLS seed produced **0** DIRECT MATCHES. This aligned seed produced **4**.

## Empty-slot audit

| Class | Count | Seeded? |
|---|---|---|
| SOURCE_IDENTIFIED_DATA_PENDING | 4 (B01, B02, C02, HC07) | Yes |
| SOURCE_UNKNOWN / definition unlocked | 22 | **No** — out of scope until definition lock |

There were not 8–12 additional empty slots with defensible DIRECT MATCH plans. Expanding those would have been agency-driven curiosity ingest.

## DIRECT-MATCH precheck (priority seed)

| Series | Baseline | Fits | Status | Value | Path |
|---|---|---|---|---|---|
| ESTABS_ENTRY_RATE | B01 | def/geo/time pass | DIRECT MATCH | 10.608 (2023) | Census BDS API |
| ESTABS_EXIT_RATE | B02 | def locked to exit rate | DIRECT MATCH | 9.396 (2023) | Census BDS API |
| ESTABS_ENTRY | C02 | def locked to births count | DIRECT MATCH | 790295 (2023) | Census BDS API |
| vote01 18–24 citizen voted % | HC07 | def/geo/time pass | DIRECT MATCH | 47.7 (2024) | Official P20-587 workbook |

Canonical precheck: `data/project/rcip_baseline_aligned_series_precheck.json`

## API vs file determination

| Product | API exposed? | Path used |
|---|---|---|
| Census BDS | **Yes** — `/data/timeseries/bds` | API |
| CPS Voting age tables | **No** (workbook product) | Official `vote01_2024.xlsx` |

Hierarchy preserved: API → official file → workbook → manual primary. No secondary substitution.

## Definition locks applied

- **B01:** BDS `ESTABS_ENTRY_RATE` (already locked; now filled)
- **B02:** BDS `ESTABS_EXIT_RATE` (survival-family official complement)
- **C02:** BDS `ESTABS_ENTRY` (establishment births / new entrants count)
- **HC07:** CPS citizens 18–24 reported voting rate (2024)

## Public-surface mapping (not charts yet)

Each series recorded reusable surfaces: baseline dashboard, theory pages, book chapters, Public Reasoning, later community comparisons (`publication_use` in aligned manifest + precheck).

## RedDirt changes

- Census connector supports BDS timeseries
- Aligned manifest `cc-baseline-aligned-indicators-1.0.json`
- Commands: `publicdata:aligned:bds`, `publicdata:aligned:cps-voting`, `publicdata:aligned:all`
- CPS file extract via official workbook + Python cell extract

## CC changes

- Import `exp_79f42d2fe71f4b69`
- Sources CC-SRC-261–264
- Baseline promotions B01/B02/C02/HC07
- Mapping artifact `baseline-aligned-observation-mapping.json`

## Baseline delta

```text
Baseline before: 38/64
Baseline after:  42/64
Direct MATCH promotions: 4
Potential matches seeded: 0
Supporting-only: 0
No-slot curiosity ingest: 0
```

## Validators

| Command | Result |
|---|---|
| `pnpm baseline:validate` | PASSED — 42/64 |
| `pnpm research:validate` | PASSED — 264 sources |
| `pnpm imports:validate` | PASSED (warn: missing reddirt_commit) |

## Exact next recommended slice

**`CC-EVIDENCE-PANEL-AND-PUBLIC-SURFACE-BINDING-1.0`**

Bind the new DIRECT MATCH series (and existing baseline) into the data-dense Evidence Panel on one public theory/proof surface — progressive disclosure, not a chart dump.
