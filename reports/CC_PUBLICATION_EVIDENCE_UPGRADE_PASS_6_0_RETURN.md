# CC-PUBLICATION-EVIDENCE-UPGRADE-PASS-6.0 — Return

**Status:** PASSED (partial retrieval — adapters still block several domains)  
**Date:** 2026-08-11  
**Mode:** Retrieval-and-binding (not a writing pass).  
**Standard:** CC-DEC-104. No new panels. No baseline ontology promotion. Google Civic deferred. `CC-CLAIM-003` remains NEE.

## Governing rule

> No new panel unless a genuinely new evidence question requires one. Prefer richer time series, geographic comparisons, and distribution layers inside the 18 existing panels.

Chain required per demand: **RCIP demand → source endpoint → normalized series → export → CC import → existing evidence-system ID → rendered points → provenance.**

## Executive summary

Extended the RedDirt RCIP spine to keep multi-year BLS/Census points, ran `publicdata:pass6:series`, exported credential-free pack **`exp_226e711e08704b06`** (284 observations), imported into CC, and bound arrays into **three** existing evidence systems. **RCIP-DEM-0418–0425 (energy) were attempted and blocked** — no EIA connector/key path yet. SCF/DFA, CBO, FDIC, and HRSA likewise remain adapter-blocked.

| Dial | Reality |
|---|---:|
| Panels total | **18** (0 added) |
| Systems with attached arrays | **3** (wages, market-dynamics, rural) |
| Export ID | `exp_226e711e08704b06` |
| Observations in export | **284** |
| Baseline impact | **none** (42/64 unchanged) |
| Energy RCIP 0418–0425 | **blocked** (no EIA adapter) |

## Demands attempted vs retrieved

| Priority / demand cluster | Attempted | Retrieved | Notes |
|---|---|---|---|
| Wages/productivity (PASS5-DEM-L01/L02/L04 / RCIP-DEM-0006) | Yes | **Partial** | CES/CPI Dec paths → 16 derived real AHE OTY points; JOLTS 24 Dec points; PRS85006092 **55 Q4 points** with explicit definition break vs L02 |
| AR vs US unemployment | Yes | **Yes** | 18 Dec points each (2007–2025) |
| Wealth SCF/DFA (RCIP-DEM-0001) | Yes (declared) | **No** | No Fed/FRED adapter |
| Fiscal CBO (RCIP-DEM-0007) | Yes (declared) | **No** | No CBO adapter |
| Rural/local capital FDIC (RCIP-DEM-0414) | Yes (declared) | **No** | No FDIC adapter |
| Rural/market BDS history (PASS5-DEM-BDS-HISTORY / AR) | Yes | **Yes** | US+AR entry/exit (+ US entrants) 2000–2023 (24 pts each) |
| Healthcare HPSA (RCIP-DEM-0412) | Yes (declared) | **No** | No HRSA adapter |
| Market CR/markups | Yes (declared) | **No** | No CR packer |
| Energy RCIP-DEM-0418–0425 | Yes (declared) | **No** | No EIA connector / `EIA_API_KEY` path |

## Series point counts and coverage

| Series | Geo | Points | Coverage |
|---|---|---:|---|
| CES0500000003 (AHE level, Dec) | US | 18 | 2007-M12 → 2025-M12 |
| CUUR0000SA0 (CPI-U, Dec) | US | 18 | 2007-M12 → 2025-M12 |
| Derived real AHE OTY (CES/CPI) | US | **16** | adjacent Dec pairs only (no interpolation) |
| PRS85006092 (productivity % chg, Q4) | US | **55** | 1970-Q04 → 2024-Q04 |
| JTS000000000000000QUR (quits, Dec) | US | 24 | 2001-M12 → 2024-M12 |
| LNS14000000 / LASST05… (unemp Dec) | US / AR | 18 / 18 | 2007-M12 → 2025-M12 |
| ESTABS_ENTRY_RATE / EXIT_RATE / ENTRY | US | 24 / 24 / 24 | 2000 → 2023 |
| ESTABS_ENTRY_RATE / EXIT_RATE | AR | 24 / 24 | 2000 → 2023 |

## Arkansas / U.S. pairs attached

- Unemployment Dec path (AR vs US) on wages system  
- BDS entry rate and exit rate (AR vs US) on rural system  

## Panels deepened (arrays rendered)

1. `CC-EP-WAGES-PRODUCTIVITY-1`  
2. `CC-EP-MARKET-DYNAMICS-SYSTEM-1`  
3. `CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1`  

Energy structural panel updated only to record EIA-array blocker status (no new panel).

## Definition breaks found

1. **PRS85006092 Q4 ≠ CC-IND-L02 annual dial** — quarterly % change at annual rate; labeled and not collapsed into L02.  
2. **JOLTS annual M13 absent** — December points used and labeled (not interpolated).  
3. **Derived CES/CPI real AHE OTY ≠ official L01 Real Earnings cell** — supporting history only.  
4. **Census rural 20% vs ERS nonmetro 13.6%** — still kept separate (from Pass 5).

## Missing series (still)

Energy MER/electricity/crude/trade/prices/reliability/ownership/AR; SCF triennial; DFA quarterly path; CBO budget/tax composition history; FDIC QBP path; HPSA history/AR; CR/markup tables.

## Baseline impact

**None.** Import validation: baseline still **42/64**. Pass 6 explicitly did not promote endpoints into baseline completion.

## Sources / export

- RedDirt worktree: `H:\SOSWebsite\RedDirt-rcip-public-statistics`  
- Run: `run_c1ab7d1c883345cc` (+ productivity re-pull)  
- Export: **`exp_226e711e08704b06`**  
- CC import: `data/imports/reddirt-public-statistics/` (+ `series-arrays.json`)  
- No new `CC-SRC-*` registrations required for these BLS/Census API series already on the bridge spine.

## Interpretation changes

- Wages and market-dynamics key findings rewritten so readers see **movement**, not only current dials.  
- Definition breaks called out in-panel (no Public Reasoning packet required — no claim-support-level change; complications are measurement/labeling, not contrary causal findings).  
- Energy prosperity-fund / public-return claims remain unmodeled.

## Exact next slice

**`CC-PUBLICATION-EVIDENCE-UPGRADE-PASS-7.0`** or adapter mission: EIA (+ optional FRED/CBO/FDIC/HRSA) connectors in RedDirt RCIP → retrieve DEM-0418–0425 and remaining Pass 5 backlog → bind into the same 18 panels.
