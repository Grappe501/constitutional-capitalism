# CC-ARKANSAS-EMPIRICAL-GROUNDING-WAVE-1.0 — Return

**Slice ID:** `CC-ARKANSAS-EMPIRICAL-GROUNDING-WAVE-1.0`  
**Status:** PASSED (partial depth — evidence into NEE gaps)  
**Date:** 2026-08-12  
**Decision:** `CC-DEC-117`  
**Update:** `UPD-130`

## Method wall (held)

**correlation / pattern discovery → causal hypothesis → intervention → measurement → replication**

This wave does **not** claim that poverty, agriculture, healthcare, education, and turnout cause one another. It builds a County×Year observation layer so combinations can be described over time.

## Pass 1 — Enrollment / completer bind

- Bound fall headcount trends for **11** public 4-year and **22** public 2-year institutions (2020–2024).
- Statewide fall 2024 unduplicated headcount: **155,446** (+3.1% vs 2023; still below fall 2019 156,066).
- Statewide AY2025 credentials: **56,708** to **45,307** students.
- Still NEE: CIP-level enrollment/completers, seat capacity for keystone programs, workforce-demand ratios.

## Pass 2 — Pilot-readiness checklist

- Schema locked for 12 readiness fields (partner → expansion criteria).
- Rose Bud and Lewisville shells created as **investigative candidates — not locked**.
- Partial credit only where LEARNS memo / longitudinal baseline already exist.

## Pass 3 — County turnout + structural joins + longitudinal layer

- Turnout source inventory completed; presidential county vote totals bound for designated set (2016/2020/2024).
- ACS5 blocked by **Invalid Census API key**; interim joins via **PEP population** + **SAIPE poverty/income** + existing **NASS** farm structure.
- Longitudinal layer: **7** counties, year span 1997–2024, **448** non-null observations with provenance.

### Living-system snapshot (descriptive only)

**Rose Bud / White County (`05145`)**
- Population (2023): 78,452
- Poverty rate (2023): 15.7%
- Presidential total votes (2024): 30,837
- Farm operations (2022): 1,552

**Lewisville / Lafayette County (`05073`)**
- Population (2023): 6,095
- Poverty rate (2023): 22.8%
- Presidential total votes (2024): 2,325
- Farm operations (2022): 192

## Holds

- Overall completion dial held at **43%** — this is an honesty hold on cosmetic completion, **not** a verdict that the wave failed to advance the project
- The County×Year longitudinal observation layer is **foundational infrastructure**: it feeds HYP-128 site selection, living-community profiles, matched-comparison design, and later causal modeling — higher-order layers that the dial does not yet credit
- No pilot site lock (Rose Bud / Lewisville remain candidates)
- No causal model promotion
- Votes ≠ turnout rate until VAP/registered denominators bind

## Foundational advance (even while 43% held)

Building a provenance-bearing County×Year laboratory is real project progress. Percent-complete remains deliberately conservative until CIP capacity, turnout denominators, readiness field-work, and measured pilots earn credit under the existing dial rules.

## Next depth

1. Refresh Census API key → ACS5/VAP/CVAP county joins (preserve PEP/SAIPE provenance)
2. CIP × institution × year Fact Book parse + workforce-demand crosswalk
3. Expand County×Year beyond presidential votes (governor/congress/legislature/registered/turnout)
4. County Living Systems Explorer (internal research surface — not a public score)
5. Field-complete pilot readiness — still no political convenience lock
