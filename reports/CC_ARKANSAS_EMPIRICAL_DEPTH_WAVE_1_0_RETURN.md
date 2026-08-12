# CC-ARKANSAS-EMPIRICAL-DEPTH-WAVE-1.0 — Return

**Slice ID:** `CC-ARKANSAS-EMPIRICAL-DEPTH-WAVE-1.0`  
**Status:** PASSED (partial depth)  
**Date:** 2026-08-12  
**Decision:** `CC-DEC-118`  
**Update:** `UPD-131`

## Clarification carried from UPD-130

Holding overall completion at **43%** is an honesty hold against cosmetic inflation — **not** evidence that empirical grounding failed. The County×Year layer is foundational infrastructure for HYP-128, living-system profiles, and later modeling.

## Method wall

**Observation first → interpretation second → causation only after modeling.**

## Pass 1 — Census repair (FTP)

- `api.census.gov` key still invalid; bound ACS5 (B01003/B19013/B17001/B23025) for 2022–2023 and CVAP 2019–2023 via www2 FTP.
- PEP/SAIPE series **preserved** with original provenance; ACS metrics added in parallel (`acs5_*`).

## Pass 2 — Education → workforce bridge

- IPEDS completions 2021–2023 for Arkansas institutions; **5826** CIP×institution×award rows matched (top 2500 retained).
- Explicit distinction: **educational capacity ≠ employment demand** (demand still NEE).
- ADHE Fact Book 2025 is institutional finance — no CIP enrollment tables; IPEDS used for CIP×year.

## Pass 3 — County×Year expansion

- Non-null observations: **654** (+206 this wave).
- Added gubernatorial / US House / state House / state Senate vote totals (OpenElections 2018/2020/2022 where present).
- Added CVAP + derived presidential turnout-of-CVAP (with vintage mismatch limitations).
- Still NEE: registered voters, county HPSA, county banking, wages, 2022 Phillips OE file.

## Pass 4 — Living Systems Explorer

- Internal board surface `/county-living-systems/` — **not a public score**.
- Select county timelines; compare two counties; counterexamples privileged.

### Snapshot (descriptive)

- White 2023 ACS poverty rate: 16.4 (SAIPE preserved: 15.7)
- Lafayette 2023 ACS poverty rate: 27.2 (SAIPE preserved: 22.8)
- White 2024 presidential turnout-of-CVAP: 52.9%
- Lafayette 2024 presidential turnout-of-CVAP: 46.0%

## Holds

- Overall dial **43%** (honesty hold)
- Rose Bud / Lewisville **not locked**
- No causal claims

## Next

1. SOS/EAVS registered-voter series
2. ADWS workforce demand join to CIP capacity
3. County HPSA + FDIC
4. Field readiness — still no convenience lock
