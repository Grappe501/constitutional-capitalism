# RCIP-PASS-10-FRED-BEA-MACRO-WEALTH-GAPS-1.0 — Return

**Slice ID:** `RCIP-PASS-10-FRED-BEA-MACRO-WEALTH-GAPS-1.0`  
**Status:** PASSED  
**Date:** 2026-08-12  
**Update:** `UPD-117`  
**Export:** `exp_9e75bc70adf94e7e` (2,334 warehouse observations; **801** new FRED inserts this seed)  
**Panel bind:** `CC-EP-OWNERSHIP-RETIREMENT-SYSTEM-1`, `CC-EP-WEALTH-BASELINE-1`, `CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1` · **0 new panels**

## Purpose

Attach reusable longitudinal wealth-structure and BEA macro series (via FRED) so ownership, rural, and publication surfaces share one warehouse — not one-off page facts.

## Hard distinction (locked)

> **FRED/BEA establish macro and wealth-structure histories. They do not by themselves establish market power or political capture.**

`CC-CLAIM-003` remains **Not Enough Evidence**.

## Series seeded (9)

| Consumer metric | FRED ID | Producer | Coverage |
|---|---|---|---|
| Top 1% net-worth share | `WFRBST01134` | Fed DFA | 1989-Q3 → 2026-Q1 |
| 90–99th net-worth share | `WFRBSN09161` | Fed DFA | 1989-Q3 → 2026-Q1 |
| 50–90th net-worth share | `WFRBSN40188` | Fed DFA | 1989-Q3 → 2026-Q1 |
| Bottom 50% net-worth share | `WFRBSB50215` | Fed DFA | 1989-Q3 → 2026-Q1 |
| Personal saving rate | `A072RC1A156NBEA` | BEA | 1980 → 2025 |
| US per capita personal income | `A792RC0A052NBEA` | BEA | 1980 → 2025 |
| AR per capita personal income | `ARPCPI` | BEA | 1980 → 2025 |
| AR GDP (all industry) | `ARNGSP` | BEA | 1997 → 2025 |
| US GDP | `GDP` | BEA | 1980 → 2025 |

Direct BEA API deferred — FRED is the distribution channel this pass.

## Latest readings (bound)

| Dial | Value | Period |
|---|---:|---|
| Top 1% **net worth** share | **31.6%** | 2026-Q1 |
| Bottom 50% **net worth** share | **2.5%** | 2026-Q1 |
| AR PCPI | **$61,752** | 2025 |
| US PCPI | **$76,328** | 2025 |
| Personal saving rate | **4.6%** | 2025 |

### Product caveat (required)

Baseline W02 point dials (top 1% ≈ **28.8%** / bottom 50% ≈ **5.3%**) match **Share of Total Assets** in the same FRED DFA release tables. Pass 10 binds **Share of Total Net Worth**. Both are official; they are not interchangeable. Panels retain asset-share baseline dials as complementary rows.

## Where it surfaces

Bound into existing panels already consumed by civic-wealth, prosperous-aging, local-ownership, where-we-are, community-prosperity, and related book/board pages. One RedDirt export → three panel binds → many surfaces.

## Still blocked (explicit)

- Full SCF triennial micro tables (`PASS5-DEM-SCF-HISTORY`)
- CBO budget/tax history adapter (`PASS5-DEM-CBO`)
- Markup series (definition-locked)
- Direct BEA API (not required for these series)

## Explicit non-goals honored

- No new Evidence Panel  
- No automatic baseline scoreboard bump (still **42/64**)  
- No upgrade of `CC-CLAIM-003`  
- No causal story from FRED/BEA alone  

## Artifacts

| Path | Role |
|---|---|
| RedDirt connector | `src/lib/civic-intelligence/connectors/fred/index.ts` |
| RedDirt manifest | `data/public-statistics/manifests/cc-pass10-fred-bea-1.0.json` |
| RedDirt seed | `npm run publicdata:pass10:fred` |
| Credential helper | `npm run publicdata:configure-fred-key` |
| Export | `exp_9e75bc70adf94e7e` |
| CC bind | `scripts/pass10_bind_fred_bea.cjs` |
| This return | Governance return |

## Suggested next slice

**Remaining 22 baseline slots** — definition-lock then legitimate fills (`CC-PHASE-2.1-BASELINE-DEFINITION-LOCKS-AND-NEXT-LEGITIMATE-FILLS-1.0` or successor), then modeling/legal → manuscript.

Parallel tracks unchanged: HYP-125 measure-lock, HYP-126 scholarship map, HYP-127 MD election-record inventory.
