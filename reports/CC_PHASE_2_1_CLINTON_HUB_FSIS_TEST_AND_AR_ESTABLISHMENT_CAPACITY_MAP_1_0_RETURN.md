# CC-PHASE-2.1-CLINTON-HUB-FSIS-TEST-AND-AR-ESTABLISHMENT-CAPACITY-MAP-1.0 — Return

**Generated:** 2026-08-10

## 1. Executive Summary

Clinton is **not** a proven regional **USDA-inspected livestock** processing hub. FSIS active directory (2026-08-03 extract) shows **no Meat Slaughter** establishment in Van Buren County; Clinton’s Cypress Valley site is **custom-exempt**; Natural State poultry’s federal active status is **directory-conflicted**. Arkansas has inspected plants — that is not the same as practical family-farm access. CC-CLAIM-138 remains **QUALIFIED**. Baseline **2/86** unchanged. GATE-02 **not passed**.

## 2. Arkansas Establishment Inventory

- FSIS AR rows: **47** (snapshot 2026-08-03)
- Supplemental state/custom/uncertain records added separately
- Canonical: `research/phase_2/ar_livestock_processing_establishment_map.json`

## 3. Inspection Status Breakdown

| Status | Meaning |
| --- | --- |
| Federally inspected | Interstate-capable when under FSIS grant |
| State inspected | Intrastate; AR program exists; not CIS |
| Custom exempt | Owner-use pathway — not general retail |
| Unknown / verify | Directory conflicts (Natural State) |

## 4. Producer-Accessible vs Captive Facilities

Access inventory separates OPEN, LIMITED, VERTICALLY_INTEGRATED, PRIVATE_CAPTIVE, UNKNOWN. ADC Grady = captive. Large poultry brands ≠ family fee-for-service. Canonical: `ar_livestock_processing_access_inventory.json`.

## 5. Species Coverage

Federal Meat Slaughter activity: **6** establishments in extract. Poultry slaughter activity includes large integrators + a few small plants. Sheep/goat not separately coded — UNKNOWN without plant confirmation.

## 6. Capacity Evidence

Hierarchy applied; most rows **ESTABLISHMENT_CLASSIFICATION_ONLY** or **UNKNOWN**. **No** plant-count→throughput conversion. CAFF/UADA still report scarce livestock slaughter among small plants (CC-SRC-121).

## 7. Clinton Hub Test

**Verdict: CONTRADICTED** for USDA livestock hub as hypothesized.  
Poultry: **NOT ENOUGH EVIDENCE** (MPI absence vs commercial/2024 reporting).  
Custom-exempt livestock: present, insufficient for USDA-hub claim.  
Producer origin-county usage: **NOT FOUND** in public records.

## 8. Producer Travel Radius Findings

Road-distance **proxies** (not routed GPS studies) from designated geographies to nearest **open inspected** meat slaughter show Clinton-area producers typically looking to **Pope/White/Crawford** clusters; Delta/south geographies often **SEVERE** on proxy. See gap matrix travel table.

## 9. Processing Bottleneck Types

Separable bottlenecks retained: slaughter vs cut/wrap vs inspection vs labor vs cold storage vs packaging vs value-added vs scheduling vs transport vs working capital vs compliance. Clinton shows **inspection-status mismatch** (custom vs USDA) more clearly than a single “shortage” slogan.

## 10. Family-Farm Market Pathways

Mapped non-predictively: live-animal sale; direct-market via inspected slaughter→cut/wrap→cold→retail; custom-exempt owner-use. Value retention differs by who owns the animal, sets price, pays processing, and bears inventory/spoilage risk — connects later to monopsony module without proving it here.

## 11. State Inspection Adequacy

**PARTIALLY ADEQUATE** — program real; early licensees; not shown sufficient statewide; CIS absent.

## 12. CIS Findings

AR not participating. Plant cap ≤25 employees. Producer benefit **NOT ENOUGH EVIDENCE**. Do not recommend merely for interstate permission.

## 13. Processor Failure Economics

Mandatory caution: small/medium processors face high failure risk; diversification and retail/wholesale outlets matter (CC-SRC-177; national small-plant survival literature via extension). New plants are not automatic solutions.

## 14. Regional Capacity Gap Matrix

Classifications for seven geographies — mostly LIMITED or SEVERE for inspected cattle/hog retail pathway; **no SUFFICIENT** without capacity/scheduling proof. No statewide headline number.

## 15. CC-CLAIM-138 Verdict

**QUALIFIED** (supported_with_qualification). Processing-bottleneck clause strengthened; monopsony magnitudes still unmeasured; Clinton hub language must not be smuggled in.

## 16. Clinton Hypothesis Verdict

**CC-HYP-CLINTON-PROCESSING-HUB: CONTRADICTED** (as USDA livestock regional hub).

## 17. Monopsony/Processing Module Implications

Module stays OPEN. Downstream scarcity measurement advanced; upstream buyer-radius still pending. False hub narrative retired — next capacity work should follow **actual open plants** (e.g., Pottsville cluster) and Delta gaps.

## 18. Public Reasoning Records

CC-PR-034 through CC-PR-044.

## 19. Sources Added

CC-SRC-172–181. Registry total: 181.

## 20. Research Questions Added

CC-RQ-P21-067–070.

## 21. Baseline

**Unchanged: 2/86.**

## 22. GATE-02

**Not passed.**

## 23. Validators

| Command | Result |
| --- | --- |
| `npm run research:validate` | PASSED (after KG/return schema fix) |
| `npm run project:validate` | PASSED |
| `npm run phase2:validate` | PASSED (gates open 10/16; deployment commit warning) |
| `npm run baseline:validate` | PASSED (2/86) |
| `npm run corpus:validate` | PASSED |
| `npm run graph:validate` | PASSED |
| `npm run institution:validate` | PASSED |

## 24. Files Changed

- `research/phase_2/ar_livestock_processing_establishment_map.json`
- `research/phase_2/ar_livestock_processing_access_inventory.json`
- `research/phase_2/ar_processing_capacity_gap_matrix.json`
- `research/phase_2/clinton_processing_hub_test.json`
- `research/phase_2/ar_state_meat_inspection_adequacy_dossier.json`
- `research/phase_2/ar_cis_feasibility_dossier.json`
- `research/phase_2/source_snapshots/fsis_mpi_directory_arkansas_2026-08-03.csv`
- Reports under `reports/CC_ARKANSAS_*`, `CC_CLINTON_*`, return, PR 034–044
- Script: `scripts/run-phase21-clinton-hub-fsis-ar-establishment-map.mjs`

## 25. Commit Hash

Filled after commit.

## 26. Remaining Unknowns

Natural State active status; official current state licensee census; booking lead times; prices; producer origin counties; sheep/goat species confirmation; CIS plant appetite; buyer-radius monopsony metrics.

## 27. Exact Next Recommended Slice

**CC-PHASE-2.1-AR-PROCESSING-PRIMARY-RESEARCH-AND-OPEN-PLANT-BOOKING-STUDY-1.0**  
(Execute Clinton/Arkansas primary research protocol against open plants — especially Pottsville cluster + state licensees + Natural State verification — before any construction recommendation.)

Alternate if agriculture pause desired: resume journalism coverage coding or CTE follow-ons — but processing gap measurement is the natural continuation.
