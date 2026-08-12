# CC-PUBLICATION-EVIDENCE-UPGRADE-PASS-9.0 — Return

**Slice ID:** `RCIP-PASS-9-USDA-NASS-FARM-STRUCTURE-ADAPTER-AND-PUBLICATION-BINDING-1.0`  
**Status:** PASSED (NASS farm-structure adapter + bind-only)  
**Date:** 2026-08-11  
**Mode:** Credentials follow publication demand → adapter → bind existing panels.  
**Standard:** CC-DEC-104. No new panels. No baseline ontology promotion.

## Governing rules

> Credentials follow publication demand; publication demand does not follow credentials.

> Production concentration ≠ market power ≠ monopsony ≠ political capture.

NASS can establish agricultural structure. It cannot by itself establish the stronger causal claims.

## Credential pass (short)

| Key / family | Result |
|---|---|
| `NASS_API_KEY` | Configured + live OK (Quick Stats `get_counts`) |
| `CONGRESS_GOV_API_KEY` | Health OK (HTTP 200) |
| `OPENFEC_API_KEY` | Health OK (HTTP 200) |
| `OPENSTATES_API_KEY` | Health OK (HTTP 200) |
| `API_DOT_GOV_KEY` | NREL probe failed (nonblocking; not a Quick Stats substitute) |
| FRED / BEA | Deferred — follow NASS farm-structure demand, do not warehouse-expand |

## Executive summary

Landed a **USDA NASS Quick Stats** connector in RedDirt, seeded Census farm-structure series for Arkansas and the U.S., exported **`exp_a700221b6d2e4b3a`** (1344 observations), and bound arrays into existing panel **`CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1`**. Family-farm pages now surface that panel alongside processing access. **0 new panels.** Baseline unchanged **42/64**. `CC-CLAIM-003` remains NEE.

| Dial | Reality |
|---|---:|
| Panels total | **18** (0 added) |
| Export ID | `exp_a700221b6d2e4b3a` |
| Observations | **1344** |
| Baseline | **42/64 unchanged** |
| NASS | **working** (Census AR/US structure histories) |
| FRED/BEA | **deferred** |

## Acceptance test

| Criterion | Result |
|---|---|
| Credentials follow publication demand (`RCIP-DEM-0005`) | **Pass** |
| No new panel unless unavoidable | **Pass** — 0 |
| Historical AR/US farm-structure series | **Pass** — operations, acres, sales, livestock, sales-class bookends |
| Structure ≠ capture distinction preserved | **Pass** |
| Holds preserved | **Pass** |

## Series bound (NASS Census)

| Metric | AR 2022 | US 2022 | History |
|---|---:|---:|---|
| Farm operations | **37,756** | **1,900,487** | 1987→2022 (6 census points) |
| Acres operated | attached | attached | 1987→2022 |
| Ag product sales ($) | attached | attached | 1987→2022 |
| Broiler inventory | attached | attached | 1997→2022 |
| Cattle cows inventory | attached | attached | 1997→2022 |
| Sales class `< $1k` / `≥ $1M` | 2022 bookends | 2022 bookends | snapshot only |

Point of the bind: show readers **how Arkansas agriculture has actually changed**, where production and ownership are concentrated in structural terms, and what that means for hypotheses under test — **not** “small farms good, large farms bad.”

## Claim posture

- **`CC-CLAIM-124` / family-farm structure context:** NASS **supports** operation/acres/sales structure histories and AR/US contrasts. It does **not** graduate the family-farm prosperity engine hypothesis, and it does **not** replace ERS family-farm production-value shares (`FARM-BASE-01`).
- **Market power / monopsony / political capture:** remain **out of scope** for NASS. Still blocked as stronger claims.
- **`CC-CLAIM-003`:** remains **Not Enough Evidence**.

## Explicit non-goals honored

- No warehouse expansion for unused APIs  
- No new Evidence Panel  
- No FRED/BEA seeding in this pass  
- No county full panel (disclosure risk)  
- No operator-characteristic definition inflation  

## RedDirt artifacts

- Connector: `src/lib/civic-intelligence/connectors/nass/index.ts`
- Manifest: `data/public-statistics/manifests/cc-pass9-nass-1.0.json`
- Scripts: `publicdata:pass9:nass`, `publicdata:configure-nass-key`, `publicdata:probe-nass-key`
- Attribution notice: product uses the NASS API but is not endorsed or certified by NASS

## Next slice options

1. **FRED/BEA** — wealth, income, regional-output, fiscal layers still missing  
2. **County NASS** — only where definitions align and disclosure cells are safe  
3. **`RCIP-PASS-LOCAL-CAMPAIGN-FINANCE-OPENFEC-LOCALITY-PROBE-1.0`** — Congress/OpenFEC credentials are healthy
