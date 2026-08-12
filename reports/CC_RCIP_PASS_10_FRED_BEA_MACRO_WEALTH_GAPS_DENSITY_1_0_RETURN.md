# RCIP-PASS-10-FRED-BEA-MACRO-WEALTH-GAPS-DENSITY-1.0 — Return

**Slice:** `RCIP-PASS-10-FRED-BEA-MACRO-WEALTH-GAPS-DENSITY-1.0`  
**Date:** 2026-08-12  
**Prior thin pass:** `RCIP-PASS-10-FRED-BEA-MACRO-WEALTH-GAPS-1.0`  
**Export:** `exp_e18ea124fac04bf8` (8,540 observations accepted in warehouse seed)

## Demand-first discipline (executed)

1. **BEA first** for authoritative national/state accounts: real GDP (US + AR), personal income / DPI / compensation / proprietors’ income, farm proprietors’ income (US + AR), transfers, corporate profits, personal saving rate (already thin-bound).
2. **FRED second** as retrieval channel for Fed DFA asset shares, Treasury fiscal ratios (% GDP), and selected BLS productivity/compensation indexes — **original producing agency preserved** in provenance (`BEA`, `Federal Reserve Board`, `U.S. Treasury`, `BLS`).
3. Prefer **long historical arrays** over headline singles where definitions remain comparable.
4. Bind into the existing **18** evidence systems; **0 new panels**.
5. Look beyond thin Pass 10 demand IDs when a stable official series illuminates an already-written argument (farm income paths, fiscal %GDP, real GDP, compensation/productivity).
6. **No proxy abuse:** macro GDP/income/wealth-structure series are not treated as ownership, local prosperity, resilience, market power, or causation.

## What was densified

| Cluster | Series (FRED IDs) | Agency | Bound panels |
|---|---|---|---|
| Wealth structure (assets) | `WFRBST01134`, `WFRBST01122` (Top 1% / Bottom 50% **asset** shares) | Fed DFA via FRED | `CC-EP-WEALTH-BASELINE-1` |
| Ownership / income composition | `A576RC1`, `A041RC1`, `A577RC1`, `A067RC1` (comp, proprietors, transfers, DPI) | BEA via FRED | `CC-EP-OWNERSHIP-RETIREMENT-SYSTEM-1` |
| Rural / AR–US accounts | `ARRGSP`, `GDPC1`, `AROTOT`, `A010RC1Q027SBEA` (AR/US real GDP; AR/US farm income) | BEA via FRED | `CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1` |
| Fiscal capacity | `FYFRGDA188S`, `FYONGDA188S`, `GFDEGDQ188S` (receipts/outlays/debt % GDP) | Treasury / BEA via FRED | `CC-EP-FISCAL-REVENUE-SYSTEM-1` |
| Wages–productivity | `COMPRNFB`, `OPHNFB` | BLS via FRED | `CC-EP-WAGES-PRODUCTIVITY-1` |

Thin Pass 10 net-worth DFA path and PCPI/saving-rate binds remain complementary; densify adds **asset-share** history and the BEA/Treasury/BLS arrays above.

## Signature readings (warehouse latest at bind time)

| Signal | Latest | Note |
|---|---|---|
| Top 1% asset share | 28.8% (2026-Q1) | Complements thin net-worth path (~31.6%) |
| Bottom 50% asset share | 5.3% (2026-Q1) | Complements thin net-worth bottom (~2.5%) |
| Federal receipts % GDP | 17.0% (2025) | Capacity, not incidence |
| Federal outlays % GDP | 22.8% (2025) | Capacity, not program incidence |
| Federal debt % GDP | 98.7% (2026-Q1) | Stock ratio only |
| AR farm proprietors’ income | $2,409M (2026-Q1) | State aggregate — not county structure |
| AR real GDP | $150.6B (2025) | State aggregate — not local prosperity |

## Epistemic wall (unchanged)

FRED/BEA establish **macro and wealth-structure histories**. They do **not** by themselves establish market power, monopsony, political capture, local ownership, or causal claims about Arkansas County vs Van Buren farm structure. County NASS remains the structure evidence; BEA farm income is a different object (state/national accounts).

## Seed / bind summary

- RedDirt seed: `npm run publicdata:pass10:fred:density` → status `succeeded`, +5,859 inserts, 8,540 accepted obs, 0 errors.
- CC import: `exp_e18ea124fac04bf8`.
- Bind script: `scripts/pass10_bind_fred_bea_density.cjs` → **0 new panels**; 5 existing systems touched.
- Companion gap map: `reports/CC_REMAINING_DATA_GAP_MAP_AFTER_FRED_BEA_1_0.md`.

## Closure

Routine gates: validate → commit → push → deploy (this densify return + gap map + dial updates).
