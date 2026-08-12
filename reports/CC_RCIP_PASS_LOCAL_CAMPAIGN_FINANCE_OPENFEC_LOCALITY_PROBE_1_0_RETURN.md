# RCIP-PASS-LOCAL-CAMPAIGN-FINANCE-OPENFEC-LOCALITY-PROBE-1.0 — Return

**Slice ID:** `RCIP-PASS-LOCAL-CAMPAIGN-FINANCE-OPENFEC-LOCALITY-PROBE-1.0`  
**Status:** PASSED (feasibility probe — not publication bind)  
**Date:** 2026-08-11  
**Hypothesis:** `CC-HYP-LOCAL-DEMOCRATIC-CAMPAIGN-FINANCE-SYSTEM` (`HYP-125`)  
**Decision hold:** `CC-DEC-105` KEEP_AS_HYPOTHESIS  
**Update:** `UPD-112`

## Probe question

> Can OpenFEC data reliably measure where candidate money comes from, at what geographic resolution, across multiple election cycles, without confusing disclosed contributor geography with the ultimate source of political influence?

## Verdict

**Partially.** For a deliberately small Arkansas **federal** sample (AR-SEN / AR-02 / AR-04 × 2018–2024), OpenFEC reproducibly supports:

- itemized **contributor-state** AR vs out-of-state shares  
- **size-bucket** small/large structure (`$200 and under` lock)  
- candidate/committee **receipts & disbursements**  
- **spender-layer** independent expenditures  

It does **not** deliver beneficial-source transparency, and it cannot instrument Arkansas statewide, legislative, county, municipal, or school-board elections at all.

Federal races are the **instrumentation pilot**. HYP-125’s destination universe is local elections.

## Four probe answers

| # | Question | Answer |
|---|---|---|
| 1 | Is contributor geography reproducibly measurable? | **Yes, with limitations** — `schedule_a/by_state` yields itemized contributor-state AR vs non-AR shares for principal campaign committees across the completed sample. |
| 2 | Can locality be compared across cycles/candidates? | **Yes, for federal principal committees** under a locked geography rule (state for Senate; House district vs state rule still needs freeze). Multi-cycle comparison demonstrated 2018–2024. |
| 3 | Which of `CC-DEM-LCF-001–011` can OpenFEC answer? | **1** DIRECTLY MEASURABLE · **6** DERIVABLE WITH LIMITATIONS · **4** REQUIRES ADDITIONAL SOURCE (see matrix). |
| 4 | Where does the money trail become opaque? | **After the disclosed contributor (Schedule A) or spending committee (Schedule E).** Intermediary layers and significant original funders are often NOT OBSERVABLE. |

## Outside-money taxonomy (not interchangeable)

These are distinct phenomena. Collapsing them into a single “outside money” claim is a research error.

| ID | Phenomenon | OpenFEC observability |
|---|---|---|
| `LDF-OUT-01` | Individual receipts outside constituency | DERIVABLE WITH LIMITATIONS |
| `LDF-OUT-02` | PAC / committee money | DIRECTLY MEASURABLE |
| `LDF-OUT-03` | Party money | DERIVABLE (field exists; not stored in probe v1) |
| `LDF-OUT-04` | Independent expenditures | DERIVABLE WITH LIMITATIONS (spender layer) |
| `LDF-OUT-05` | Organizational / intermediary funding | PARTIAL BREAKS |
| `LDF-OUT-06` | Untraceable beneficial-source funding | NOT OBSERVABLE |

Per-candidate decomposition for the sample is in `openfec_locality_probe_1_0.json` → `outside_money_decomposition`.

## Local Democratic Finance Evidence System (draft)

Draft measure registry (not a publication panel): `data/project/local_democratic_finance_evidence_system.json`.

Proposed measures include local-dollar share, in-state/out-of-state share, small-dollar participation, donor concentration, PAC/committee share, party share, independent-spending ratio, and beneficial-source observability. Impossibility of full beneficial-source observability under current disclosure is itself a finding.

Governing question for later scale comparison (federal → statewide → legislative → county → municipal → school board): whether **the people governed by an election retain meaningful influence over that election’s political economy** — not whether every dollar must originate inside a district.

## Hard distinctions (preserved)

| Distinction | Status |
|---|---|
| Contributor address ≠ beneficial source | Locked |
| Out-of-state money ≠ illegitimate money | Locked |
| Large contribution ≠ corruption | Locked |
| Independent expenditure ≠ coordination | Locked |
| Donor concentration ≠ political capture | Locked (`CC-CLAIM-003` remains NEE) |

## Sample executed

| Race | Cycles with candidates probed |
|---|---|
| AR-SEN | 2020, 2022 (2018/2024 off-cycle → empty or no positive-receipt principals in probe filter) |
| AR-02 | 2018, 2020, 2022, 2024 |
| AR-04 | 2018, 2020, 2022, 2024 |

Top **2** principal candidates by receipts per race-cycle. Errors after 429-backoff fix: **0**.

## Illustrative disclosure geography (not claims)

Among probed candidates with measurable itemized geo totals (**18** rows):

| Metric | Range / average |
|---|---|
| Arkansas share of itemized contributor-state $ | **18.1% – 87.9%** (avg **~57.8%**) |
| Out-of-state share | avg **~42.2%** |
| Small-dollar (`size=200`) share of by_size $ | avg **~7.0%** |

Interpretation guard: these are **disclosure geography / size-bucket** facts. They do not establish illegitimacy, corruption, coordination, or capture.

## Beneficial-source chain break (recorded, not papered over)

Target chain: advertisement → spender → intermediary → funding org → significant original sources.

| Layer | OpenFEC visibility in this probe |
|---|---|
| Spender (candidate committee / IE committee) | Usually visible |
| Intermediary | Often opaque |
| Funding organization behind spender | Partial / breaks |
| Significant original funding sources | **NOT OBSERVABLE** from OpenFEC alone |

Example break: individual/corporation → nonprofit → PAC → super PAC → expenditure — Schedule E typically stops at the spending committee.

## Locality Measurement Feasibility Matrix (`CC-DEM-LCF-001…011`)

Artifact: `data/project/campaign_finance_probes/locality_measurement_feasibility_matrix_1_0.json`

| Demand | Classification |
|---|---|
| LCF-001 local vs out-of-state donor share | **DERIVABLE WITH LIMITATIONS** |
| LCF-002 small-dollar share | **DERIVABLE WITH LIMITATIONS** |
| LCF-003 donor concentration | **DERIVABLE WITH LIMITATIONS** |
| LCF-004 IE share | **DERIVABLE WITH LIMITATIONS** |
| LCF-005 outside-spending concentration | **DERIVABLE WITH LIMITATIONS** (spender layer); ultimate funding orgs **NOT OBSERVABLE** |
| LCF-006 candidate spending levels | **DIRECTLY MEASURABLE** |
| LCF-007 contested vs uncontested | **REQUIRES ADDITIONAL SOURCE** |
| LCF-008 incumbent/challenger gaps | **DERIVABLE WITH LIMITATIONS** |
| LCF-009 AR state-race analogues | **REQUIRES ADDITIONAL SOURCE** |
| LCF-010 Congress.gov reform objects | **REQUIRES ADDITIONAL SOURCE** |
| LCF-011 journalism covariates | **REQUIRES ADDITIONAL SOURCE** |

Counts: DIRECTLY MEASURABLE **1** · DERIVABLE WITH LIMITATIONS **6** · REQUIRES ADDITIONAL SOURCE **4** · NOT OBSERVABLE (ultimate beneficial-source concentration) flagged inside LCF-005.

## What this determines for next research design

Progression lock (unchanged):

1. OpenFEC feasibility ← **this slice**  
2. Define defensible locality measures (contributor-state + size buckets with limitation labels)  
3. **Arkansas/state/local source inventory** (destination universe for HYP-125)  
4. Historical measurement  
5. Compare election types  
6. Test reform mechanisms  
7. Legal analysis  
8. Only then policy design  

## Explicit non-goals honored

- No doctrine / principle promotion  
- No new publication Evidence Panel  
- No movement of `CC-CLAIM-003`  
- No pretence of beneficial-source transparency  
- No restriction of HYP-125 to federal elections just because OpenFEC is easiest  

## Artifacts

| Path | Role |
|---|---|
| `scripts/run-rcip-pass-local-campaign-finance-openfec-locality-probe.mjs` | Probe runner |
| `scripts/enrich-openfec-locality-outside-money-taxonomy.mjs` | Outside-money enrich (no new API) |
| `data/project/campaign_finance_probes/openfec_locality_probe_1_0.json` | Full probe + decomposition |
| `data/project/campaign_finance_probes/locality_measurement_feasibility_matrix_1_0.json` | Matrix + four answers + taxonomy |
| `data/project/local_democratic_finance_evidence_system.json` | Draft LDFES measure registry |
| This return | Governance return |

## Sequence lock

**Structural (user-affirmed):** OpenFEC locality probe → **county-level NASS** → FRED/BEA.

| Role | Slice |
|---|---|
| Completed | `RCIP-PASS-LOCAL-CAMPAIGN-FINANCE-OPENFEC-LOCALITY-PROBE-1.0` |
| Next structural | `RCIP-PASS-COUNTY-NASS-FARM-STRUCTURE-1.0` (Arkansas County, Van Buren/Clinton, Searcy, Mississippi, Lafayette, and other designated research geographies) |
| Then | FRED/BEA macro/wealth gaps |
| HYP-125 parallel (light) | `CC-LOCAL-CAMPAIGN-FINANCE-LOCALITY-MEASURE-LOCK-1.0` — freeze measure definitions; then AR state/local source inventory |

No broad Arkansas campaign-finance ingest yet. No new publication panel from this probe.
