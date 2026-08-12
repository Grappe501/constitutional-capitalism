# RCIP-PASS-COUNTY-NASS-FARM-STRUCTURE-1.0 — Return

**Slice ID:** `RCIP-PASS-COUNTY-NASS-FARM-STRUCTURE-1.0`  
**Status:** PASSED (partial on county sales-class; core structure complete)  
**Date:** 2026-08-12  
**Update:** `UPD-115`  
**Export:** `exp_2849252ba6094615` (1,533 warehouse observations; **189** new county inserts this seed)  
**Panel bind:** `CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1` only · **0 new panels**

## Purpose

Stop treating “rural Arkansas” as one farm economy. Show how designated research geographies differ in Census agricultural structure, reusable across family-farm, rural-capital, food-system, and LCL surfaces.

## Hard distinction (locked)

> **farm structure ≠ market power ≠ monopsony ≠ political capture**

`CC-CLAIM-003` remains **Not Enough Evidence**.

## Counties seeded

| FIPS | Geography | Research role |
|---|---|---|
| 05001 | Arkansas County | Commodity/export ag pair |
| 05141 | Van Buren County (Clinton) | Family/livestock/specialty ag pair |
| 05129 | Searcy County | Extreme rural |
| 05093 | Mississippi County | Delta ag/industry |
| 05073 | Lafayette County | Extreme rural |
| 05107 | Phillips County | West Helena / Delta distress county context |
| 05145 | White County | Rose Bud surrounding county context |

## Series attempted

Operations · acres operated · ag product sales · broiler inventory · cattle-cows inventory · 2022 sales-class LT$1k / ≥$1M.

**Sales-class at county `agg_level`:** Quick Stats **HTTP 400** for all seven counties — recorded as blocked, not invented.

## 2022 structure contrast (selected fields)

| County | Ops | Acres | Sales | Cattle cows | Broilers |
|---|---:|---:|---:|---:|---:|
| White (Rose Bud) | 1,552 | 376,803 | $236.3M | 27,060 | 4,128,849 |
| Van Buren (Clinton) | 569 | 106,364 | $15.6M | 10,221 | 212,110 |
| Searcy | 562 | 175,165 | $33.7M | 16,888 | 217 |
| Arkansas | 421 | 407,865 | $328.7M | 879 | — |
| Mississippi | 268 | 515,954 | $462.7M | 724 | — |
| Phillips (W. Helena) | 240 | 380,542 | $306.5M | 895 | — |
| Lafayette | 192 | 120,374 | $152.4M | 11,489 | 3,467,115 |

Ag-pair without archetype lock: Arkansas County has fewer farms than Van Buren (**421** vs **569**) but ~**21×** the sales ($328.7M vs $15.6M) and ~**4×** the acres — commodity/export vs smaller livestock/specialty structure under the same Census definitions.

## Livestock disclosure pattern

Broiler inventory attached for: Van Buren, Searcy, Lafayette, White.  
Not attached (suppressed / zero rows) for: Arkansas, Mississippi, Phillips — recorded as disclosure-aware structure, not narrative proof.

## Where it surfaces

Bound into **`CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1`**, already consumed by:

- Family-farm prosperity (book + board)  
- Community prosperity / resilience / local ownership pages  

No duplicated county warehouse — one RedDirt export, one panel bind, many surfaces.

## Credential note (parallel)

OpenFEC key restored in RedDirt `.env` via `legislative:configure-keys -Only OPENFEC_API_KEY`. Probe: **OpenFEC HTTP 200**. Added `npm run legislative:configure-openfec` helper. Locality probe findings remain valid; no re-run required. HYP-125 measure-lock stays light parallel.

## Explicit non-goals honored

- No new Evidence Panel  
- No statewide all-county NASS panel  
- No operator-characteristics full unlock  
- No upgrade of `CC-CLAIM-003`  
- No FRED/BEA in this slice (next structural)

## Artifacts

| Path | Role |
|---|---|
| RedDirt manifest | `data/public-statistics/manifests/cc-county-nass-farm-structure-1.0.json` |
| RedDirt seed | `npm run publicdata:county:nass` |
| Export | `exp_2849252ba6094615` |
| CC bind | `scripts/pass_county_bind_nass_farm_structure.cjs` |
| This return | Governance return |

## Suggested next slice

**`RCIP-PASS-10-FRED-BEA-MACRO-WEALTH-GAPS-1.0`** (or equivalent) — FRED/BEA for remaining macro, income, wealth, and regional-output gaps.

HYP-125 parallel: `CC-LOCAL-CAMPAIGN-FINANCE-LOCALITY-MEASURE-LOCK-1.0` (does not delay FRED/BEA).
