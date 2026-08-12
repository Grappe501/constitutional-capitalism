# RCIP-PASS-COUNTY-NASS-FARM-STRUCTURE-DENSITY-1.0 — Return

**Slice ID:** `RCIP-PASS-COUNTY-NASS-FARM-STRUCTURE-DENSITY-1.0`  
**Parent:** `RCIP-PASS-COUNTY-NASS-FARM-STRUCTURE-1.0`  
**Status:** PASSED (partial on hill-county commodity acres / some livestock disclosure)  
**Date:** 2026-08-12  
**Update:** `UPD-118`  
**Export:** `exp_f456263593194081` (2,681 warehouse observations; **347** new density inserts)  
**Panel bind:** `CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1` · **96** county series · **0 new panels**

## Purpose

Maximize geographically specific agricultural evidence under existing rural/family-farm arguments — not merely clear the original demand IDs. Readers should be able to move from a claim into county commodity mix and livestock structure.

## Hard distinction (locked)

> **NASS can tell us what happened to agricultural structure. It cannot by itself tell us why it happened.**

`CC-CLAIM-003` remains **Not Enough Evidence**.

## Density series added (beyond core ops/acres/sales/livestock)

| Family | Series |
|---|---|
| Sales mix | Crop totals sales · Animal totals incl. products sales |
| Commodity acres | Rice · Soybeans · Cotton · Corn grain · Wheat · Hay & haylage |
| Livestock depth | Cattle incl. calves · Hogs · Layers |

All on the same seven designated counties; `domain_desc=TOTAL`; Census 1997–2022 where available.

## Structural contrast unlocked by density

- **Arkansas County (2022):** crop sales ≈ **$328.1M** vs animal-product sales ≈ **$0.6M**; rice acres ≈ **85,528** — commodity/export structure.
- **Van Buren / Searcy:** rice/soy/cotton/wheat paths often **HTTP 400** (no series / not applicable); hay + cattle/livestock inventories carry the structure — hill/livestock pattern.
- Disclosure suppressions and 400/403 cells retained as evidence of different economies, not filled inventively.

## Still blocked

- County sales-class economic facets (prior HTTP 400)
- Tenure / operator characteristic paths (density probe HTTP 400)
- Net cash farm income / government payments / asset-value short_desc paths (probe HTTP 400)

## Relationship to FRED/BEA

`RCIP-PASS-10-FRED-BEA-MACRO-WEALTH-GAPS-1.0` already **PASSED** (`exp_9e75bc70adf94e7e`). This density pass does not reopen it.

## Artifacts

| Path | Role |
|---|---|
| Manifest | RedDirt `cc-county-nass-farm-structure-density-1.0.json` |
| Seed | `npm run publicdata:county:nass:density` |
| Bind | `scripts/pass_county_bind_nass_farm_structure.cjs` (expanded METRICS) |
| Parent return | `reports/CC_RCIP_PASS_COUNTY_NASS_FARM_STRUCTURE_1_0_RETURN.md` |

## Suggested next slice

**Remaining ~22 baseline slots** — `CC-PHASE-2.1-BASELINE-DEFINITION-LOCKS-AND-NEXT-LEGITIMATE-FILLS-1.0`  
(then modeling/legal → manuscript). Parallel: HYP-125/126/127.
