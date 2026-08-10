# `CC-PHASE-2.1-AR-PROCESSING-PRIMARY-RESEARCH-AND-OPEN-PLANT-BOOKING-STUDY-1.0`

## Cursor execution script

**Status:** Ready for execution  
**Prior slice:** `CC-PHASE-2.1-CLINTON-HUB-FSIS-TEST-AND-AR-ESTABLISHMENT-CAPACITY-MAP-1.0` (`3e6e9ee`)  
**Public lesson from prior slice (preserve verbatim in return):**

> We believed Clinton might already function as a regional USDA livestock-processing hub. The establishment data did not support that belief. We changed our understanding accordingly.

Do **not** soften, reverse, or redefine that result.

---

## Mission

Move from **facility presence → usable capacity**.

Central question:

> **For an Arkansas family farmer with livestock ready for market today, where can that farmer legally obtain inspected slaughter and processing, how long does it take, what does it cost, and what prevents access when it fails?**

This is a **primary operational evidence** slice. Desk research alone cannot finish it. Fabricating interviews, wait times, prices, or booking calendars is forbidden.

---

## 1. Capacity taxonomy (mandatory)

Every plant and geography finding must be coded against **four distinct layers**. Do not collapse them.

| Layer | Definition | Example false equivalence |
| --- | --- | --- |
| **Nominal capacity** | A plant / establishment exists | FSIS row or state license exists |
| **Accessible capacity** | It accepts independent / outside producers for the relevant species | “Open to custom kill” confirmed by operator |
| **Available capacity** | It actually has booking space in a stated time window | Next cattle date is X weeks out |
| **Economically usable capacity** | Processing cost + transport + scheduling + storage + expected market value still leave a viable producer margin | Farmer can book and still clear a workable return |

**Constitutional Capitalism cares ultimately about economically usable capacity.**  
The earlier layers are necessary evidence steps — not substitutes.

Record explicitly when a plant is:

```text
NOMINAL_ONLY
ACCESSIBLE_BUT_UNAVAILABLE
AVAILABLE_BUT_NOT_ECONOMICALLY_USABLE
ECONOMICALLY_USABLE (evidence required)
UNKNOWN_AT_LAYER
```

---

## 2. Hard boundaries

Do not:

```text
Invent interviews, quotes, wait times, prices, or throughput
Treat operator marketing copy as booking confirmation
Treat FSIS presence as accessible or available capacity
Rehabilitate the Clinton USDA livestock hub claim without new primary evidence
Recommend plant construction
Recommend CIS / grants / cooperatives as solutions in this slice
Turn this into an LCL implementation
Change baseline or GATE-02 unless acceptance criteria are independently met
Promote hypotheses to doctrine
Collapse custom-exempt into inspected retail pathways
Let Natural State status ambiguity contaminate cattle/hog findings
```

Allowed:

```text
Phone / email inquiry logs with date, contact method, questions asked, answers received
Refusal / no-response coding
Public rate sheets if voluntarily provided or published
“Would not disclose” as a valid finding
NOT ENOUGH EVIDENCE as a verdict
```

---

## 3. Preserve prior map; do not rebuild from scratch

Start from:

```text
research/phase_2/ar_livestock_processing_establishment_map.json
research/phase_2/ar_livestock_processing_access_inventory.json
research/phase_2/ar_processing_capacity_gap_matrix.json
research/phase_2/clinton_processing_hub_test.json
reports/CC_CLINTON_PROCESSING_PRIMARY_RESEARCH_PROTOCOL_1_0.md
```

Update access classes with primary evidence.  
Do not delete nominal inventory rows because booking failed — that is itself evidence.

---

## 4. Discrete task A — Natural State Processing verification

Treat as a **standalone verification packet**, not mixed into cattle conclusions.

Question:

> What is the current inspection and operating status of Natural State Processing (historical M51255+P51255) at 245 Quality Drive, Clinton, AR?

Resolve to one of:

```text
ACTIVE_FSIS_GRANT
INACTIVE_OR_WITHDRAWN
OPERATING_UNDER_DIFFERENT_ESTABLISHMENT_IDENTITY
CUSTOM_OR_OTHER_NON_FSIS_STATUS
COMMERCIAL_INFORMATION_STALE
UNRESOLVED_AFTER_REASONABLE_INQUIRY
```

Evidence paths (in order):

1. Re-pull current FSIS MPI Directory / Establishment Demographic Data
2. Arkansas Department of Agriculture confirmation if applicable
3. Direct plant inquiry (status only; do not force pricing if refused)
4. Note Global Refrigerated Services (V46922) same-address relationship without assuming identity

Output:

```text
research/phase_2/natural_state_processing_status_verification.json
reports/CC_NATURAL_STATE_PROCESSING_STATUS_VERIFICATION_1_0.md
```

Do not let unresolved poultry status change cattle/hog accessibility verdicts.

---

## 5. Discrete task B — Open-plant booking study (priority plants)

### 5.1 Priority contact set

Contact **candidate accessible** plants first (not large integrated poultry brands unless needed as negative controls).

Minimum priority set:

```text
Cypress Valley Meat Company — Pottsville (USDA livestock node)
5R Custom Meats — Mt. Vernon (FSIS vs custom-exempt conflict — resolve)
Key's Family Butcher Shop — Van Buren / Crawford County
B & R Meat Processing — Winslow
G.E. Hawthorn Meat Company — Hot Springs
Ferguson's Packing Company — Atkins (state)
JACO Meats — Hope (state)
ASU Meat Market — Jonesboro (state; access model may be limited)
Williams Baptist University — Walnut Ridge (state; access model may be limited)
Cypress Valley Meat Company — Clinton (custom-exempt; pathway documentation only)
```

Add others only if priority set reveals geographic holes requiring a nearer alternative.

### 5.2 Standard inquiry script (plant operators)

Identify as Constitutional Capitalism / Arkansas processing-access research.  
Offer anonymity for commercially sensitive numbers.

Ask, in this order:

1. Do you accept livestock from independent / outside producers? (Y/N/limited)
2. Species accepted for slaughter? cattle / hogs / sheep / goats / poultry / other
3. Inspection status today? federal / state / custom-exempt / other
4. Earliest available booking date for (a) one steer/heifer (b) one hog (c) small ruminant if offered — as of inquiry date
5. Typical lead time now vs peak season
6. Services: slaughter only / cut-wrap / grind / sausage / smoking / vacuum pack / labeling for retail
7. Cold storage: days included; extra fees if stated
8. Deposit / cancellation rules if stated
9. Published or quoted fee ranges if they will share (record “declined” if not)
10. Approximate share of business that is fee-for-service vs captive/contract (estimate OK if labeled estimate)
11. Origin area of typical producers (counties / regions) if they will share
12. Top constraints: labor, inspection days, cooler space, wastewater, demand variability, other
13. Expansion interest: none / interested / actively planning (no solicitation)

### 5.3 Producer / extension cross-check (smaller set)

Where possible, dual-source plant claims with:

```text
UADA extension livestock / local foods personnel
Farmers-market meat vendors
Livestock auction contacts
Producers in: Van Buren, Searcy, Faulkner/Cleburne, Pope, Arkansas County, Lafayette, Phillips, Mississippi
```

Producer questions center on:

```text
Where did you last book inspected processing?
How far did you haul?
How long did you wait?
What did you pay (if willing)?
Did the final packaged meat pathway work economically?
What failed when it failed?
```

Do not invent respondents. If contacts cannot be completed in-slice, code `ATTEMPTED_NO_RESPONSE` / `NOT_YET_CONTACTED` and keep the study honest.

---

## 6. Inquiry log standard

Create a machine-readable log. One row per contact attempt.

```text
research/phase_2/ar_processing_plant_inquiry_log.json
```

Minimum fields:

```text
inquiry_id
establishment_id
establishment_name
contact_date
contact_method          # phone | email | webform | in_person | other
respondent_role         # owner | manager | scheduler | declined_identify | n/a
outcome                 # completed | partial | no_answer | refused | wrong_number | voicemail_only
nominal_confirmed
accessible_confirmed    # yes | no | limited | unknown
available_lead_time_cattle_days   # number or null
available_lead_time_hog_days
available_lead_time_notes
species_accepted[]
inspection_status_stated
services[]
fee_disclosure          # quoted | range | declined | not_asked | public_sheet
fee_notes               # no invented precision
economic_usability_signals
constraints[]
producer_geography_notes
quote_or_paraphrase_allowed # boolean
notes
source_confidence       # primary_operator | dual_sourced | secondary_only
```

Never convert empty cells into averages.

---

## 7. Booking & economics matrices

### 7.1 Booking matrix

```text
research/phase_2/ar_open_plant_booking_matrix.json
```

For each priority plant × species:

```text
accessible?
next_available_window
lead_time_band          # e.g. 0-14d | 15-45d | 46-90d | 90d+ | unknown | not_accepted
seasonality_flag
services_available
inspection_path         # federal | state | custom | unknown
evidence_quality
```

### 7.2 Economic usability worksheet (non-predictive)

```text
research/phase_2/ar_processing_economic_usability_worksheet.json
```

For each viable accessible+available path, record known components only:

```text
processing_fee_components
transport_distance_proxy_or_stated
storage_constraints
expected_market_channel   # household custom | retail | restaurant | unknown
margin_verdict            # viable | marginal | not_viable | unknown
basis                     # what evidence supports the verdict
```

**Do not** invent a statewide “average processing cost.”  
**Do not** claim monopsony magnitudes from booking friction alone.

---

## 8. Bottleneck reclassification with primary evidence

Update bottleneck types only where inquiries support it:

```text
SLAUGHTER_CAPACITY
CUT_WRAP_CAPACITY
INSPECTION_CAPACITY_OR_DAYS
LABOR_SKILLED_BUTCHERS
COLD_STORAGE
PACKAGING_LABELING
SCHEDULING_LEAD_TIME
TRANSPORTATION_DISTANCE
WORKING_CAPITAL_DEPOSITS
REGULATORY_COMPLIANCE_BURDEN
INFORMATION_FRICTION      # cannot find who accepts outside producers
ECONOMIC_MARGIN_FAILURE   # can book but cannot clear viable return
```

A region may fail at different layers for different species.

---

## 9. Geography overlay

Reuse designated geographies where methodologically useful:

```text
Clinton / Van Buren County
Rose Bud
Searcy County
Arkansas County
Lafayette County
West Helena / Phillips County
Mississippi County
```

For each, answer if evidence allows:

```text
Nearest economically usable inspected path (species-specific)
Nearest accessible but unavailable path
Custom-exempt fallback only?
Still unknown?
```

Do not add new sample geographies merely to inflate coverage.

---

## 10. Pathway legality reminder

Keep pathways separate in all outputs:

```text
LIVE ANIMAL SALE → auction / buyer / packer

DIRECT MARKET → inspected slaughter → cut/wrap → cold → retail/restaurant/institution

CUSTOM EXEMPT → owner-use pathway
```

Custom-exempt findings may document local service — they do **not** count as inspected retail capacity.

---

## 11. Claim / hypothesis governance

Reassess after evidence:

```text
CC-HYP-CLINTON-PROCESSING-HUB
CC-CLAIM-138
CC-HYP-AR-LIVESTOCK-COMPOUNDED-ACCESS
CC-MOD-AR-LIVESTOCK-MONOPSONY-AND-PROCESSING-ACCESS
```

Allowed verdicts:

```text
SUPPORTED
QUALIFIED
CONTRADICTED
NOT ENOUGH EVIDENCE
```

Clinton hub stays **CONTRADICTED** unless primary evidence newly supports USDA livestock hub usage at scale.  
Do not “rehabilitate” it with poultry or custom-exempt findings.

ChatGPT adjudicates routine wording repairs under CC-DEC-103.  
No doctrine expansion.

---

## 12. Public Reasoning (citizen-facing)

Create or update records answering at least:

> We thought Clinton was already a USDA livestock hub — what happened?

> If a plant is on the USDA list, why might a farmer still be unable to use it?

> What is the difference between a plant existing and a booking existing?

> Why might processing be available but still not make economic sense?

> Why are you calling plants instead of just using government databases?

> Why won't you recommend building new plants yet?

> What did Natural State Processing status turn out to be?

> Does a long wait time prove monopsony?

Preserve humility: long waits are access evidence; they are not automatic proof of buyer market power.

---

## 13. Required artifacts

Create/update:

```text
research/phase_2/natural_state_processing_status_verification.json
research/phase_2/ar_processing_plant_inquiry_log.json
research/phase_2/ar_open_plant_booking_matrix.json
research/phase_2/ar_processing_economic_usability_worksheet.json
research/phase_2/ar_livestock_processing_access_inventory.json   # update
research/phase_2/ar_processing_capacity_gap_matrix.json         # update layers
```

Reports:

```text
reports/CC_NATURAL_STATE_PROCESSING_STATUS_VERIFICATION_1_0.md
reports/CC_ARKANSAS_OPEN_PLANT_BOOKING_STUDY_1_0.md
reports/CC_ARKANSAS_PROCESSING_ECONOMIC_USABILITY_1_0.md
reports/CC_ARKANSAS_FAMILY_FARM_USABLE_CAPACITY_WHAT_WE_LEARNED_1_0.md
reports/CC_PHASE_2_1_AR_PROCESSING_PRIMARY_RESEARCH_AND_OPEN_PLANT_BOOKING_STUDY_1_0_RETURN.md
```

Expand protocol if needed:

```text
reports/CC_CLINTON_PROCESSING_PRIMARY_RESEARCH_PROTOCOL_1_0.md
→ or CC_AR_PROCESSING_PRIMARY_RESEARCH_PROTOCOL_1_1.md
```

---

## 14. Source / evidence standard

Priority:

```text
Direct operator statements (logged)
Producer statements (logged)
UADA / Arkansas Department of Agriculture confirmations
Current FSIS directory pulls
Published rate sheets
Prior registered sources (CC-SRC-120–130, 172–181) as context only
```

Commercial websites may seed contact info — not booking truth.

---

## 15. Knowledge graph

Connect carefully:

```text
Establishment → access layer → availability layer → economic usability → geography → RQ/claim
```

No causal monopsony edges from wait times alone.

---

## 16. Baseline / GATE-02

Do not automatically move:

```text
Baseline: 2/86
GATE-02: remains open / PARTIAL
```

Only update if canonical criteria are actually met.

---

## 17. Validators

Run existing suites only:

```text
npm run research:validate
npm run project:validate
npm run phase2:validate
npm run baseline:validate
npm run corpus:validate
npm run graph:validate
npm run institution:validate
```

No invented commands.

---

## 18. Completion return — required sections

```text
reports/CC_PHASE_2_1_AR_PROCESSING_PRIMARY_RESEARCH_AND_OPEN_PLANT_BOOKING_STUDY_1_0_RETURN.md
```

1. Executive Summary  
2. Prior Clinton Finding Preserved  
3. Capacity Taxonomy Applied  
4. Natural State Verification Result  
5. Inquiry Coverage (attempted / completed / refused / no response)  
6. Accessible Capacity Findings  
7. Available Capacity / Booking Lead Times  
8. Cost Disclosure Findings (and refusals)  
9. Economically Usable Capacity Findings  
10. Species-Specific Results  
11. Geography Overlay  
12. Bottleneck Reclassification  
13. Pathway Legality Notes  
14. Strongest Supporting Evidence  
15. Strongest Contrary Evidence / Failed Assumptions  
16. Claim & Hypothesis Verdicts  
17. Public Reasoning Records  
18. Sources / Inquiry Evidence Added  
19. Research Questions Added / Closed  
20. Baseline  
21. GATE-02  
22. Validators  
23. Files Changed  
24. Commit Hash  
25. Remaining Unknowns  
26. Exact Next Recommended Slice  

---

## 19. Decision rule / success standard

This slice succeeds if we can answer, with evidence or honest unknowns:

> Which Arkansas plants are not merely listed, but actually bookable by an independent family producer — and whether that booking is economically usable.

It also succeeds if the answer is mostly **NOT ENOUGH EVIDENCE** because plants refused disclosure or contacts failed — provided the attempt log is complete and no numbers were invented.

**Failure mode to avoid:**

> “We called around and processing seems tight, so Arkansas should build plants.”

That skips economically usable capacity and failure economics.

---

## 20. Exact next slice after this one (do not execute now)

Only after booking/usability evidence exists, choose among evidence-driven forks:

```text
CC-PHASE-2.1-AR-PROCESSING-INFRASTRUCTURE-GAP-AND-INTERVENTION-OPTIONS-1.0
```

Candidate intervention classes to compare later (not recommend now):

```text
expand existing open plants
workforce / butcher training
inspection staffing / state program growth
cooperative ownership
shared cold storage
mobile slaughter where lawful
CIS participation
targeted new capacity
information brokerage (who accepts outside producers)
```

Or return to buyer-radius / monopsony measurement if usable capacity is adequate but live-sale terms remain adverse.

---

## Research trajectory reminder

```text
packer concentration
→ inspected-facility map          ✅ done
→ producer accessibility          ← this slice (primary)
→ actual booking capacity         ← this slice
→ farmer economics                ← this slice (partial, non-invented)
→ infrastructure gap
→ only then policy alternatives
```

No construction recommendation before that evidence.
