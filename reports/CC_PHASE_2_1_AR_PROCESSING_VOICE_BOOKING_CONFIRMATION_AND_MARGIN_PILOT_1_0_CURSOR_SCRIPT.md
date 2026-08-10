# `CC-PHASE-2.1-AR-PROCESSING-VOICE-BOOKING-CONFIRMATION-AND-MARGIN-PILOT-1.0`

## Cursor execution script — **gated**

### Split responsibility (mandatory)

| Who | Does | Does not |
| --- | --- | --- |
| **Human callers** | PSTN interviews with processors (+ later producers) using the human protocols | Invent answers |
| **Cursor** | After call records are entered: update matrices, run margin pilot, write return | Infer booking availability from the internet |

**Hard rule:** If `research/phase_2/ar_processing_voice_call_records.json` still has `status: AWAITING_HUMAN_CALLS` and empty `completed_calls`, Cursor must **stop** and report blocked — not scrape websites for lead times.

---

## Desk-pass baseline to preserve in every output

```text
~3 desk-evidenced accessible inspected cattle pathways
0 booking-confirmed
0 economically confirmed
```

Zeros = **not yet verified**, not “no capacity exists.”

Public Clinton lesson remains frozen:

> We believed Clinton might already function as a regional USDA livestock-processing hub. The establishment data did not support that belief. We changed our understanding accordingly.

---

## Phase A — Human (outside Cursor)

1. Execute `reports/CC_AR_PROCESSING_HUMAN_VOICE_CALL_PROTOCOL_1_0.md`  
2. Enter completed calls into `research/phase_2/ar_processing_voice_call_records.json`  
3. Optionally begin producer interviews per `reports/CC_AR_PROCESSING_PRODUCER_INTERVIEW_PROTOCOL_1_0.md`  
4. Hand completed JSON to Cursor

Minimum gate to unlock Cursor economics:

```text
At least VOICE-001 (Pottsville), VOICE-002 (JACO), VOICE-003 (Ferguson)
with outcome COMPLETED or PARTIAL and non-null species_rows for cattle and/or hogs
```

Natural State (VOICE-007) remains a discrete verification packet.

---

## Phase B — Cursor (only after gate)

### B1. Ingest call records

- Update `ar_livestock_processing_access_inventory.json`  
- Update `ar_open_plant_booking_matrix.json` with **voice-confirmed** lead times only  
- Update Natural State verification if VOICE-007 completed  
- Recompute path counts:

```text
accessible_confirmed_voice
available_booking_confirmed
economically_usable_confirmed
```

Still no internet inference for missing plants.

### B2. Margin pilot — full pathway

Build producer pathway worksheets:

```text
farm
→ live transportation
→ inspected slaughter
→ processing / cut-wrap
→ packaging
→ cold storage
→ transportation to market
→ sale
```

Run **at least three marketing scenarios** where evidence permits:

1. **Live-animal / commodity sale** (comparison case)  
2. **Direct-to-consumer inspected meat**  
3. **Wholesale / local institutional sale**

Keep **two separate questions** on every worksheet:

> **Can the farmer make more gross value from the animal?**

> **Can the farmer make more profit after assuming the additional labor, processing, transportation, inventory, marketing, spoilage and working-capital risks?**

Allowed cell values when evidence missing: `UNKNOWN` — never invent farm-gate prices, wages, spoilage rates, or retail prices.

### B3. Bottleneck synthesis (processor-stated + evidence)

Tabulate `processor_stated_bottleneck` answers.  
Do **not** assume regulation is the bottleneck.  
Compare to producer interview themes if available.

### B4. Emerging research question (do not answer prematurely)

> Where exactly does the family-farm livestock value chain cease to be economically viable—and is that failure caused primarily by buyer concentration, processing capacity, distance, labor, regulation, capital, market access, scale, or some interaction among them?

Output a **factor interaction matrix** with evidence grades — not a single-cause slogan.

### B5. Intervention posture

Still **no construction recommendation** unless economically usable + booking evidence supports a specific gap class.  
Candidate intervention classes remain comparative only:

```text
expand existing open plants
workforce / butcher training
inspection staffing / state program growth
cooperative ownership
shared cold storage
mobile slaughter where lawful
CIS participation
targeted new capacity
information brokerage
buyer-competition remedies
```

---

## Required artifacts (Phase B)

```text
research/phase_2/ar_processing_voice_call_records.json          # human-filled
research/phase_2/ar_processing_producer_interview_records.json # if any
research/phase_2/ar_open_plant_booking_matrix.json             # update
research/phase_2/ar_processing_margin_pilot_worksheets.json
research/phase_2/ar_livestock_value_chain_failure_locus_matrix.json
```

Reports:

```text
reports/CC_ARKANSAS_VOICE_BOOKING_CONFIRMATION_1_0.md
reports/CC_ARKANSAS_PROCESSING_MARGIN_PILOT_1_0.md
reports/CC_ARKANSAS_VALUE_CHAIN_FAILURE_LOCUS_1_0.md
reports/CC_PHASE_2_1_AR_PROCESSING_VOICE_BOOKING_CONFIRMATION_AND_MARGIN_PILOT_1_0_RETURN.md
```

---

## Claim / hypothesis governance

Reassess only after voice (+ producer if available):

```text
CC-HYP-CLINTON-PROCESSING-HUB     # stays CONTRADICTED unless new USDA livestock hub evidence
CC-CLAIM-138
CC-HYP-AR-LIVESTOCK-COMPOUNDED-ACCESS
```

Baseline 2/86 and GATE-02: do not auto-advance.

---

## Success standard

Success is an honest update of the three headline counts from voice evidence, plus the first gross-vs-profit pathway comparison that refuses false precision.

**Failure mode to avoid:**

> “Processors said they’re busy, so Arkansas should build plants.”

That skips economically usable capacity and the failure-locus question.
