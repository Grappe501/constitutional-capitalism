# CC-PHASE-2.1-AR-PROCESSING-PRIMARY-RESEARCH-AND-OPEN-PLANT-BOOKING-STUDY-1.0 — Return

**Generated:** 2026-08-10

## 1. Executive Summary

Moved from facility map toward usable capacity. **Desk primary** evidence shows a **small set of claimed accessible inspected paths** (notably Cypress Valley Pottsville federal; JACO Hope state with published fees; Ferguson Atkins with published fees but pathway ambiguity). **Available booking lead times:** not obtained — voice PSTN outreach not completable in-agent; coded `UNKNOWN / PRIMARY VERIFICATION REQUIRED`. **Economically usable paths confirmed: 0.** Natural State poultry status remains **unresolved** (operator fees vs FSIS absence). Clinton USDA livestock hub finding **preserved as CONTRADICTED**.

## 2. Prior Clinton Finding Preserved

> We believed Clinton might already function as a regional USDA livestock-processing hub. The establishment data did not support that belief. We changed our understanding accordingly.

## 3. Capacity Taxonomy Applied

| Layer | Result this slice |
| --- | --- |
| Nominal | Prior FSIS/state map retained |
| Accessible | Partially documented from operator primary materials |
| Available | **UNKNOWN** pending voice |
| Economically usable | **UNKNOWN** (fee components only for some paths) |

## 4. Natural State Verification Result

`UNRESOLVED_AFTER_REASONABLE_DESK_INQUIRY` — see discrete packet. Cattle/hog findings not contaminated.

## 5. Inquiry Coverage

| Channel | Count / status |
| --- | --- |
| Establishment website / FAQ primary | Completed for Cypress, JACO, Ferguson, Natural State |
| Partner channel primary | B&R poultry via Across the Creek |
| FSIS directory re-check | Completed |
| Association directory secondary | ACA processing directory |
| PSTN voice | **Not completed** (agent limitation) — phones logged for human follow-up |

## 6. Accessible Capacity Findings

**Cattle (inspected, claimed accessible):** 3 desk paths — Pottsville (federal), JACO (state), Ferguson (confirm state vs custom).  
**Hogs:** same 3.  
**Sheep/goats:** 1 claimed (Pottsville).  
**Poultry:** 1 limited commercial (B&R/ATC min 50) + 1 unresolved (Natural State).  
Custom-exempt Clinton Cypress: accessible for owner-use only — **excluded** from inspected retail totals.

## 7. Available Capacity / Booking Lead Times

**All unknown** for current dates. Historical 2020 survey context only (CC-SRC-190).

## 8. Cost Disclosure Findings

| Plant | Provenance | Fees |
| --- | --- | --- |
| JACO | establishment_operator_primary | Beef/hog kill+inspection+$/lb published |
| Ferguson | establishment_operator_primary | Beef/hog kill+$/lb published; pathway confirm needed |
| Natural State | establishment_operator_primary | Poultry schedule published |
| B&R poultry | partner_operator_primary | Lot-based whole bird + cut-up |
| Pottsville / Keys / Hawthorn | — | Not published / unavailable this pass |

## 9. Economically Usable Capacity Findings

**Confirmed economically usable inspected paths: 0.**  
Illustrative JACO beef processing cost ~$480 at 400 lb hanging — **not a margin**.

## 10. Species-Specific Results

See `ar_processing_economic_usability_worksheet.json` counts. No species has a booking-confirmed + margin-confirmed path.

## 11. Geography Overlay

Travel proxies from prior slice still apply to **nominal/accessible candidates**. Without availability confirmation, no geography can be rated SUFFICIENT on usable capacity.

## 12. Bottleneck Reclassification

Observed/desk-supported:

- INFORMATION_FRICTION (Keys website; unpublished Pottsville fees)
- PATHWAY_AMBIGUITY (Ferguson custom vs state)
- DIRECTORY_CONFLICT (Natural State; 5R; Hawthorn)
- SCHEDULING — **unknown** (not measured)
- INSPECTION_DAYS / LABOR / COLD_STORAGE — **unknown** pending operator interviews
- Do not equate unknown scheduling with proven slaughter scarcity

## 13. Pathway Legality Notes

State paths = intrastate without CIS. Custom-exempt ≠ retail. Federal Pottsville claim includes resale labeling (Arkansas Grown listing).

## 14. Strongest Supporting Evidence

- JACO FAQ: outside animals + itemized fees (establishment primary)
- Cypress/Arkansas Grown: independent producers + multi-species federal resale claim
- Ferguson published fee table (establishment primary)
- B&R poultry limited commercial channel with fees (partner primary)

## 15. Strongest Contrary Evidence / Failed Assumptions

- Cannot confirm any next-available booking date from desk work
- Natural State still unresolved
- Keys website failure blocks producer information
- 2020 wait-time averages must not be pasted as 2026 facts

## 16. Claim & Hypothesis Verdicts

| ID | Verdict |
| --- | --- |
| CC-HYP-CLINTON-PROCESSING-HUB | **CONTRADICTED** (preserved) |
| CC-CLAIM-138 | **QUALIFIED** |
| CC-HYP-AR-LIVESTOCK-COMPOUNDED-ACCESS | **QUALIFIED** |

## 17. Public Reasoning Records

CC-PR-045–052.

## 18. Sources / Inquiry Evidence Added

CC-SRC-182–190. Inquiry log: `ar_processing_plant_inquiry_log.json`. Registry total: 190.

## 19. Research Questions Added / Closed

CC-RQ-P21-071–073 OPEN. CC-RQ-P21-067 → OPEN_PARTIAL.

## 20. Baseline

**Unchanged: 2/86.**

## 21. GATE-02

**Not passed.**

## 22. Validators

| Command | Result |
| --- | --- |
| `npm run research:validate` | PASSED |
| `npm run project:validate` | PASSED |
| `npm run phase2:validate` | PASSED |
| `npm run baseline:validate` | PASSED (2/86) |

## 23. Files Changed

Canonical JSON under `research/phase_2/` (inquiry log, booking matrix, economic usability, Natural State verification); reports; PR 045–052; sources 182–190; script + cursor script/protocol; registries/updates.

## 24. Commit Hash

Filled after commit.

## 25. Remaining Unknowns

Current lead times; Pottsville fees; Ferguson pathway; Keys/Hawthorn/5R live status; Natural State grant; producer margins; Delta travel+booking joint friction.

## 26. Exact Next Recommended Slice

**CC-PHASE-2.1-AR-PROCESSING-VOICE-BOOKING-CONFIRMATION-AND-MARGIN-PILOT-1.0**

Human PSTN campaign against the phone list in the inquiry log, then first margin worksheets for JACO + Pottsville paths — still **no construction recommendation**.
