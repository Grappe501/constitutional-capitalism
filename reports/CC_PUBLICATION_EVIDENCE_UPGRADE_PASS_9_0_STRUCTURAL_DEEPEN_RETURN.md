# CC-PUBLICATION-EVIDENCE-UPGRADE-PASS-9.0 — Structural Deepen Return

**Slice ID:** `CC-PUBLICATION-EVIDENCE-UPGRADE-PASS-9.0-STRUCTURAL-DEEPEN`  
**Status:** PASSED (structural deepen under existing panels)  
**Date:** 2026-08-12  
**Decision:** CC-DEC-124  
**Update:** UPD-137  
**Note:** Companion to the earlier Pass 9 NASS return (`CC_PUBLICATION_EVIDENCE_UPGRADE_PASS_9_0_RETURN.md`). This return completes the original Pass 9 structural-deepen acceptance tests (QBP / HPSA / energy / campaign-finance registration).

## Governing rule

> Deepen the structural layers that still prevent readers from understanding how ownership, access, reliability, and political finance change over time.

**Not more pages — denser empirics under pages already written.** Panel count remains **18**. Baseline **42/64**. Overall completion **43%** held.

## Acceptance test

| Criterion | Result |
|---|---|
| Community-bank time depth | **Pass** — QBP multi-year loan & asset share paths bound; labeled deposit-share section absent in Q1 2026 workbook (documented; snapshots retained) |
| HPSA history | **Pass (fail-closed)** — historical population-share layer explicitly missing after hunt |
| Energy reliability/ownership | **Pass** — SAIDI (EPA 11.4) + EIA-861 ownership customer shares bound; generation remains separate MER layer |
| Campaign finance | **Pass** — HYP-125 + demands already registered; confirmed; no doctrine |
| Holds | **Pass** — 003 NEE; Civic deferred; baseline 42/64; panels 18 |
| Panel count | **18** (0 added) |

## What bound

### 1. Rural / local capital — QBP

Panel: `CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1`

| Series | Coverage | Latest |
|---|---|---|
| Community-bank share of industry loans & leases (QBP) | 1984Q1 → 2026Q1 | **14.1%** (2026Q1); year-end 1984Q4 **38.0%** → 2025Q4 **14.4%** |
| Community-bank share of industry assets (QBP) | 1984Q1 → 2026Q1 | **10.6%** (2026Q1) |

Source: FDIC QBP Time Series Spreadsheet Q1 2026, sheet `Ratios by CB vs. NCB`.  
Definition break preserved: **QBP ≠ BankFind CB:1 ≠ CB_SI:CB**.

Deposit-share labeled section not present in that sheet → registry 13.1% 2024Q4 cell + BankFind AR/US CB:1 snapshot retained with explicit notes.

### 2. Primary-care HPSA — history hunt

Panel: `CC-EP-PRIMARY-CARE-ACCESS-1`

- Hunt closed **fail-closed**: no defensible official multi-year HPSA population-share series.
- Current Pass 8 GIS snapshot retained.
- Overlapping pop sums **not** converted to fake shares.
- Artifact: `data/imports/hrsa-hpsa/historical_hunt.json`

### 3. Energy — reliability + ownership (separated from generation)

Panel: `CC-EP-ENERGY-STRUCTURAL-ENDPOINTS-1`

| Layer | Object | Result |
|---|---|---|
| Generation/production | EIA MER (prior Pass 7) | Retained — not treated as reliability/ownership |
| Reliability | EPA Table 11.4 SAIDI | AR vs US 2014→2024 bound (AR 527.8 vs US 662.6 minutes in 2024) |
| Ownership | EIA-861 Sales_Ult_Cust Bundled | AR customer shares 2018→2024 (2024: IOU 54.4% · Coop 31.9% · Muni 12.0% · Other 1.7%) |

Prosperity-fund / public-return outcomes remain unattached.

### 4. Campaign finance research

`CC-HYP-LOCAL-DEMOCRATIC-CAMPAIGN-FINANCE-SYSTEM` / `HYP-125` registration confirmed complete (demands + dossier + incubator). No doctrine. No new panel. OpenFEC locality probe remains instrumentation-only.

## Artifacts

| Path | Role |
|---|---|
| `data/imports/fdic-qbp/community_bank_industry_shares_q1_2026.json` | QBP extract |
| `data/imports/eia-861/ownership_reliability_bind.json` | Ownership + SAIDI bind |
| `data/imports/hrsa-hpsa/historical_hunt.json` | HPSA fail-closed hunt |
| `scripts/pass9_bind_structural_deepen.cjs` | Panel binder |
| `data/project/publication_evidence_panels.json` | Panels updated (still 18) |

## Holds preserved

- `CC-CLAIM-003` remains NEE (disclosure ≠ capture)
- Google Civic deferred
- Energy baseline does not move from EIA strength alone
- No manufactured HPSA/QBP/reliability series where official path missing
- No new Evidence Panel unless unavoidable (**0 added**)

## Next

USDA/NASS/FRED theme expansion remains deferred relative to this structural deepen (NASS/FRED already advanced on other Pass 9/10 tracks). Optional: reconcile registry QBP deposit cell if FDIC later publishes a labeled deposit-share time series in the same workbook family.
