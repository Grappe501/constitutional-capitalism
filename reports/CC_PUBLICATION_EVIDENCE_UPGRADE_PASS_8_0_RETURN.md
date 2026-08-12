# CC-PUBLICATION-EVIDENCE-UPGRADE-PASS-8.0 — Return

**Slice ID:** `RCIP-PASS-8-FRED-FDIC-HRSA-ADAPTERS-AND-BINDING-1.0`  
**Status:** PASSED (FDIC + HRSA end-to-end; FRED reserved / not seeded)  
**Date:** 2026-08-11  
**Mode:** Adapter expansion → bind-only.  
**Standard:** CC-DEC-104. No new panels. No baseline ontology promotion.

## Governing rule

> More real observations under existing arguments, not more headline statistics.

Priority executed: **FDIC → HRSA → FRED (only if awkward)**.

## Executive summary

Landed credential-free **FDIC BankFind** and **HRSA GIS HPSA** adapters in RedDirt, exported **`exp_022146cbbc26489d`** (1280 observations), and bound arrays into existing panels **`CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1`** and **`CC-EP-PRIMARY-CARE-ACCESS-1`**. **0 new panels.** Baseline unchanged **42/64**. Energy baseline not moved. `CC-CLAIM-003` remains NEE. Google Civic deferred. Energy reliability/ownership remain missing. **FRED not seeded** — no demanded local-capital/healthcare series required FRED as a distribution channel.

| Dial | Reality |
|---|---:|
| Panels total | **18** (0 added) |
| Systems with arrays (cumulative) | **6** |
| Export ID | `exp_022146cbbc26489d` |
| Observations | **1280** |
| Baseline | **42/64 unchanged** |
| FDIC | **working** (summary histories + CB:1 snapshot) |
| HRSA | **working** (current HPSA area/FTE/pop-sum) |
| FRED | **reserved / not seeded** |

## Acceptance test

| Criterion | Result |
|---|---|
| More observations under existing arguments | **Pass** |
| No new panel unless unavoidable | **Pass** — 0 |
| FDIC local-capital deepen | **Pass** — AR/US banks/branches/deposits 1980–2025 |
| HRSA healthcare deepen | **Pass** — AR/US current HPSA contrasts |
| FRED only when awkward | **Pass** — not used generically |
| Holds preserved | **Pass** |

## Retrieved vs still blocked

| Demand | Retrieved | Notes |
|---|---|---|
| PASS5-DEM-FDIC-PATH / RCIP-DEM-0414 | **Partial** | Commercial-bank summary histories + current CB:1 deposit-share snapshot. QBP multi-year share path still blocked. |
| PASS5-DEM-HPSA-AR / RCIP-0412 | **Partial** | Current AR vs US HPSA area counts, FTE sums, designation-pop sums. |
| PASS5-DEM-HPSA-HISTORY | **No** | No official multi-year HPSA API |
| FRED awkward series | **N/A this ship** | Reserved with original-agency provenance rule |

## Key figures bound

**Local capital (FDIC)**  
- Commercial banks 1980–2025: AR vs US histories  
- Branches + deposits histories (deposits shown as $ billions after ÷1,000,000 from FDIC $ thousands)  
- Current community-bank (CB:1) deposit share snapshot: **AR ~31.0% vs US ~11.2%** — explicitly not the registry QBP 13.1% cell

**Healthcare (HRSA)**  
- Designated primary-care HPSA areas: **AR 70 vs US 2840** (current)  
- FTE sums: **AR ~170.8 vs US ~10,326.5**  
- Designation population sums attached with **overlap warning** — not converted to population share; E05 ~22% registry dial retained

## Definition breaks surfaced

- `CB_SI:CB` commercial-bank summary ≠ FDIC community-bank `CB:1` ≠ QBP community-bank share  
- HRSA designation population sums may overlap — not a share  
- HPSA current snapshot ≠ multi-year path  
- Energy reliability/ownership still missing (unchanged)

## Artifacts

| Artifact | Path / ID |
|---|---|
| FDIC connector | `src/lib/civic-intelligence/connectors/fdic/index.ts` |
| HRSA connector | `src/lib/civic-intelligence/connectors/hrsa/index.ts` |
| Manifest | `data/public-statistics/manifests/cc-pass8-fdic-hrsa-1.0.json` |
| CLI | `pnpm publicdata:pass8:fdic-hrsa` |
| Export | `exp_022146cbbc26489d` |
| Bind script | `scripts/pass8_bind_fdic_hrsa.cjs` |
| Bound panels | `CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1`, `CC-EP-PRIMARY-CARE-ACCESS-1` |

## Next

Optional: QBP community-bank share packer; HPSA historical snapshots if a defensible archive path appears; FRED only for awkward demanded series (e.g. DFA) with original producer labeled; CBO fiscal path.
