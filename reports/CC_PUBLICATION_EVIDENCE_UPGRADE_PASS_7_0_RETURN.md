# CC-PUBLICATION-EVIDENCE-UPGRADE-PASS-7.0 — Return

**Slice ID:** `RCIP-PASS-7-AGENCY-ADAPTER-EXPANSION-AND-EVIDENCE-SYSTEM-BINDING-1.0`  
**Status:** PASSED (EIA end-to-end; remaining adapters deferred)  
**Date:** 2026-08-11  
**Mode:** Adapter expansion in RedDirt → bind-only in CC.  
**Standard:** CC-DEC-104. No new panels. No baseline ontology promotion. Google Civic deferred. `CC-CLAIM-003` remains NEE.

## Governing rule

> Existing publication demand → exact source object → normalized series → credential-free export → bind into an existing evidence system.

> Energy data can describe the system; it does not prove the prosperity-fund model.

## Executive summary

Landed the first new official agency adapter (**EIA Open Data v2**) in the RedDirt RCIP public-statistics spine, retrieved demanded MER + electricity retail-sales annual arrays, exported credential-free pack **`exp_51310e4926bb45e9`** (988 observations), imported into CC, and bound point arrays into the existing energy evidence system **`CC-EP-ENERGY-STRUCTURAL-ENDPOINTS-1`**. **0 new panels.** Baseline unchanged **42/64**. Reliability and ownership remain visibly blocked. FRED / FDIC / HRSA / CBO / SCF deferred to the next adapter slice.

| Dial | Reality |
|---|---:|
| Panels total | **18** (0 added) |
| Systems with attached arrays | **4** (wages, market-dynamics, rural, **energy**) |
| Export ID | `exp_51310e4926bb45e9` |
| Observations in export | **988** (284 Pass 6 + 704 EIA) |
| Baseline impact | **none** (42/64 unchanged) |
| EIA adapter | **working end-to-end** |
| RCIP-DEM-0423 / 0424 | **still blocked** (reliability / ownership) |

## Acceptance test

| Criterion | Result |
|---|---|
| ≥1 new official adapter working end-to-end | **Pass** — EIA |
| Point arrays on existing evidence systems | **Pass** — energy system |
| No new panel unless unavoidable | **Pass** — 0 new |
| Provenance complete | **Pass** — export + source queries + panel `source` lines |
| Definition breaks surfaced | **Pass** — NGMPPUS marketed ≠ dry; TENIBUS negative = net exports; fund outcomes not claimed |
| Baseline moved only if slot qualifies | **Pass** — unchanged |
| Blocked sources remain visibly blocked | **Pass** — reliability, ownership, FRED/FDIC/HRSA/CBO/SCF |

## Demands attempted vs retrieved

| Priority / demand cluster | Attempted | Retrieved | Notes |
|---|---|---|---|
| Energy MER / production / consumption / trade (RCIP-DEM-0418, 0420, 0421) | Yes | **Yes** | TEPRBUS, TETCBUS, TEEXBUS, TEIMBUS, TENIBUS, PAPRPUS, NGMPPUS (1949–2024) |
| Electricity generation / sales (RCIP-DEM-0419) | Yes | **Yes** | ELETPUS; US/AR all-sector sales |
| Electricity prices AR/US (RCIP-DEM-0422, 0425) | Yes | **Yes** | Residential ¢/kWh 2001–2024 |
| Reliability (RCIP-DEM-0423) | Declared | **No** | No defensible SAIDI/SAIFI object wired |
| Ownership IOU/muni/coop (RCIP-DEM-0424) | Declared | **No** | No stable EIA object mapped |
| FRED / FDIC / HRSA / CBO / SCF / CR | Not in this ship | **No** | Deferred; remain blocked |

## Series point counts and coverage

| Series | Geo | Points | Coverage |
|---|---|---:|---|
| TEPRBUS production (quads) | US | 76 | 1949 → 2024 |
| TETCBUS consumption (quads) | US | 76 | 1949 → 2024 |
| TENIBUS net imports (quads) | US | 76 | 1949 → 2024 |
| ELETPUS electricity generation | US | 76 | 1949 → 2024 |
| PAPRPUS crude production | US | 76 | 1949 → 2024 |
| NGMPPUS NG marketed production | US | 76 | 1949 → 2024 |
| Residential electricity price | US / AR | 24 / 24 | 2001 → 2024 |
| Electricity sales (all sectors) | US / AR | 24 / 24 | 2001 → 2024 |

**Definition break:** Manifest originally asked for `NGMPBUS` (colloquial “dry”); that MSN returned zero rows on `total-energy`. Bound **`NGMPPUS` marketed production** instead, labeled explicitly.

## What did not change

- No new evidence panel
- No prosperity-fund / public-return outcome claim from energy facts
- No baseline scoreboard promotion
- `CC-CLAIM-003` remains Not Enough Evidence
- Google Civic remains deferred
- Structural registry endpoints CC-SRC-056–061 retained alongside arrays

## Artifacts

| Artifact | Path / ID |
|---|---|
| RedDirt EIA connector | `src/lib/civic-intelligence/connectors/eia/index.ts` |
| Pass 7 manifest | `data/public-statistics/manifests/cc-pass7-eia-series-1.0.json` |
| CLI | `pnpm publicdata:pass7:eia` |
| Export | `exp_51310e4926bb45e9` |
| CC import | `data/imports/reddirt-public-statistics/` |
| Bind script | `scripts/pass7_bind_eia_series.cjs` |
| Bound panel | `CC-EP-ENERGY-STRUCTURAL-ENDPOINTS-1` |

## Next

**`RCIP-PASS-8` / adapter continuation:** FRED → FDIC → HRSA → CBO (then SCF/DFA / CR only with stable paths). Prefer deepen local-capital and healthcare systems already on the page — fewer headlines, more real histories.
