# RCIP-LEGISLATIVE-CIVIC-PUBLICATION-DEMAND-MANIFEST-1.0 — Return

**Status:** PASSED  
**Date:** 2026-08-10  
**Mode:** Demand-driven evidence map only — no wholesale ingest, no new CC-side clients.

## Executive summary

Scanned the existing CC corpus against live legislative/civic connectors and produced a **publication-demand manifest** that tells RedDirt exactly which API objects to ingest next — ranked by reuse potential and historical-depth preference.

| Dial | Reality |
|---|---:|
| Files scanned | **157** |
| Demand opportunities (passage/claim units) | **289** |
| Unique ingest demands (exact API objects) | **11** |
| HIGH priority opportunities | **175** |
| api.data.gov | **Excluded** (DEFERRED_NONBLOCKING) |

## Governing rules applied

1. Demand-driven, not source-driven.  
2. **API availability is not evidence relevance.**  
3. No wholesale Congress / FEC / Open States harvest.  
4. Prefer defensible **time series** over single snapshots.  
5. One observation → many surfaces (REUSE POTENTIAL).

## Source families in the ingest queue

| Family | Unique demands | Status |
|---|---:|---|
| OpenFEC | 1 | LIVE_USABLE |
| Open States | 3 | LIVE_USABLE |
| Google Civic | 3 | Eligible |
| Congress.gov | 2 | LIVE_USABLE |
| Census/BLS spine | 2 | Separate spine |

## Next targeted ingest queue (RedDirt)

In priority order:

1. **OPENFEC** — candidate receipts / cycle totals (CC-IND-D04 refresh + political-money claims)  
2. **Open States** — Arkansas bills (actions/sponsors/votes; multi-session)  
3. **Google Civic** — voterInfo contests for controlled AR reference places (privacy-safe)  
4. **Congress.gov** — bill actions/sponsors/committees for CC-topic bills  
5. **Census CPS voting** — turnout/registration series around D03/HC07  
6. **Google Civic** — elections list snapshots  
7. **Open States** — Arkansas legislators  
8. **ACS demographics** — political-geography context for LCL  
9. **Congress.gov** — committee structure  
10. **Open States** — Arkansas votes  
11. **Google Civic** — divisions / OCD join keys  

## Relationship unit (every opportunity)

> content location → empirical proposition → evidence question → source family → exact API object → fields → geography → historical range → expected fit → contrary-evidence need → historical-depth preference → visualization → reusable surfaces → **reuse potential**

## Deliverables

| Artifact | Path |
|---|---|
| Demand manifest | `data/project/RCIP_LEGISLATIVE_CIVIC_PUBLICATION_DEMAND_MANIFEST.json` |
| Source-to-content map | `data/project/legislative_civic_source_to_content_map.json` |
| Top 25 + ingest queue | `data/project/legislative_civic_demand_top25.json` |
| Regenerator | `scripts/run-rcip-legislative-civic-publication-demand-manifest.mjs` |

## Exact next slice

**`RCIP-LEGISLATIVE-CIVIC-TARGETED-INGEST-1.0`**

Execute the highest-value manifest items in RedDirt (starting with OpenFEC receipts series + Open States AR bills + privacy-safe Google Civic voterInfo snapshots), export credential-free packages, then map into CC evidence surfaces — including contrary-evidence labels.
