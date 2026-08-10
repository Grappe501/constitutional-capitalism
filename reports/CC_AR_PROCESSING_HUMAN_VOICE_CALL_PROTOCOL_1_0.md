# Arkansas Processing — Human Voice Call Protocol 1.0

**Slice:** `CC-PHASE-2.1-AR-PROCESSING-VOICE-BOOKING-CONFIRMATION-AND-MARGIN-PILOT-1.0`  
**Role:** Human caller only. Cursor must **not** infer booking availability from the internet.

## Desk-pass baseline (preserve; do not “improve” by inference)

| Layer | Cattle (inspected) | Meaning |
| --- | ---: | --- |
| Accessible (desk-evidenced claims) | **~3** | Pottsville federal · JACO state · Ferguson (pathway confirm) |
| Booking-confirmed | **0** | Not yet verified by voice |
| Economically confirmed | **0** | Not yet verified |

Those zeros mean **not yet verified**, not “no capacity exists.”

## Identity script (honest; not mystery shopping)

> Hello — my name is [Name]. I’m doing research for the Constitutional Capitalism project on Arkansas family-farm livestock processing access. This is not a sales call and we’re not booking an animal today. We’re trying to understand what options independent farmers actually have. Do you have a few minutes for operational questions? You can decline any commercially sensitive item.

Offer anonymity for fee/scheduling details if requested. Record whether answers may be attributed.

## Priority call order

1. **Cypress Valley Meat Company — Pottsville** — (479) 968-6330  
2. **JACO Meats — Hope** — (870) 397-4189  
3. **Ferguson's Packing — Atkins** — (479) 641-7604  
4. **Key's Family Butcher Shop — Van Buren** — (479) 474-1645  
5. **B & R Meat Processing — Winslow** — (479) 634-2211  
6. **G.E. Hawthorn — Hot Springs** — (501) 762-2661  
7. **Natural State Processing — Clinton** — (501) 745-2367 *(poultry status only; discrete packet)*  
8. **Cypress Valley — Clinton** — (501) 745-4844 *(custom-exempt pathway documentation only)*  
9. Other ACA/state licensees only if priority set reveals geographic holes

## Per-species fields (repeat for each species they handle)

Capture exactly; use `DECLINED`, `UNKNOWN`, or `N/A` — never invent.

1. Accept independent / outside producers? (Y / N / limited — explain)  
2. Inspection pathway today (federal / state / custom-exempt / other)  
3. Earliest realistic appointment from call date  
4. Normal lead time now  
5. Seasonal peak lead time / months  
6. Minimum head / maximum head per drop  
7. Kill / slaughter charge  
8. Per-pound processing (basis: hanging / live / other)  
9. Inspection / label / packaging charges  
10. Cut/wrap and vacuum-pack options  
11. Storage charges and pickup window  
12. Resale labeling available? (Y/N/conditions)  
13. Must producer deliver live animals? Hauling offered?  
14. Serve producers statewide or mainly local region?  
15. Approximate current capacity constraints  
16. **What do *you* believe prevents you from processing more animals?**  

Question 16 is mandatory. Do **not** suggest “regulation” as the answer.

## Call outcomes to code

```text
COMPLETED
PARTIAL
REFUSED
NO_ANSWER
VOICEMAIL_ONLY
WRONG_NUMBER
CALL_BACK_SCHEDULED
```

## Evidence class distinction (mandatory in notes)

Record separately — do not collapse:

| Class | Definition | Example |
| --- | --- | --- |
| **OWN_OPERATION_FACT** | What the processor states as fact about **their own** plant | “Our next cattle appointment is October 14” |
| **INDUSTRY_BELIEF** | What they believe about Arkansas / the industry generally | “Arkansas needs twenty more small processors” |

Both are useful. Only the first is primary operational evidence. The second is expert testimony that still needs corroboration.

Tag quotes in the call record accordingly. Cursor must not promote industry beliefs into capacity facts.

## Resist false remedies

A long wait (e.g. six months) is **not** automatic proof that Arkansas should build another plant. Possible causes include physical capacity, butcher shortages, inspection staffing, seasonality, equipment, working capital, scheduling practices, or demand spikes — different causes imply different solutions.

## After calls

Enter results into:

```text
research/phase_2/ar_processing_voice_call_records.json
```

using the schema in that file.

**Unlock first controlled margin pilot** when Pottsville, JACO, and Ferguson are entered (COMPLETED or PARTIAL). Do **not** wait for a huge sample. Label sample limitations prominently in the return.

Then sequence:

```text
voice confirmation → first margin pilot → producer interviews
→ reconcile processor/farmer accounts → identify binding constraints → test interventions
```

Do not ask Cursor to fill empty booking fields or infer from the internet.
