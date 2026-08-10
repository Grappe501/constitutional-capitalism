# CC-PHASE-2.1-ARKANSAS-LOCAL-FEED-GRAIN-AND-NON-GMO-SUPPLY-CHAIN-TEST-1.0 — Return

**Generated:** 2026-08-10  
**Processing lane status:** still **BLOCKED** on human voice calls (~3 / 0 / 0). This slice does not touch booking inference.

## 1. Executive Summary

Assertion under test:

> Arkansas family farmers seeking non-GMO feed face an infrastructure disadvantage because suitable feed/grain must often be sourced or manufactured outside Arkansas.

**Verdict: QUALIFIED — absolute form contradicted; access/verification gap remains open.**

Arkansas has extensive **nominal** feed infrastructure (1,133 feed facility licenses in 2023; large integrator mills). Independent producers can buy some feeds locally (custom mills; organic mill candidate; national Non-GMO Project retail brands distributed in AR). We did **not** establish a commercial-scale chain that is simultaneously **grown + milled + distributed in Arkansas** with strong non-GMO verification for independent livestock. Analog to processing: **capacity ≠ open accessible verified supply.**

## 2. Hard test of the original claim

| Trap avoided | Result |
| --- | --- |
| Website silence ⇒ no production | Rejected (Clinton lesson) |
| Grain bushels ⇒ IP feed supply | Rejected |
| Integrator mills ⇒ farmer access | Rejected |

Absolute “must manufacture/source outside AR” fails. Soft claim “verified non-GMO local chain is thin/frictional” remains plausible.

## 3. Feed infrastructure inventory (partial)

See `ar_feed_mill_infrastructure_inventory.json`.

- **Open candidates:** LF Feeds (Bismarck) custom local-grain rations; River Valley Organics (Hartman) organic mill candidate  
- **Open retail verified:** Kalmbach Non-GMO Project / organic poultry SKUs distributed in AR (not AR local chain)  
- **Captive:** Tyson (incl. Pottsville/Fulton), Simmons (3 mills), Butterball Yellville  

## 4. Four-layer results

| Layer | Finding |
| --- | --- |
| Nominal | Extensive |
| Accessible | Partial — open custom/organic candidates + retail brands; integrators closed |
| Available (needed verification class) | Thin/uncertain for full local verified chain |
| Economically usable | **UNKNOWN** |

## 5. Verification taxonomy

Organic ≠ Non-GMO Project ≠ IP tested ≠ supplier-attested ≠ conventional. Market claim requirements may differ; economics differ.

## 6. Grain production vs accessible IP supply

Conventional corn/soy production is large (CC-SRC-199). Certified organic land ~21.6k acres / 179 operations (CC-SRC-200). **IP non-GMO bushels available to independents: UNKNOWN / likely scarce relative to commodity stream.**

## 7. Where the chain breaks (leading hypothesis)

Primary break for verified specialty feed is more likely at **segregation / IP grain / verification / specialty demand** than at “Arkansas has no mills.” Transportation not proven primary premium (framework only; Butterball case shows rail-in grain even for captive mills).

## 8. Delivered-cost framework

Built; **no filled totals**. Do not assume gas prices = freight.

## 9. Local mill feasibility

**NOT ENOUGH EVIDENCE to recommend new mills.** FSMA/AR licensing are real fixed costs; demand conditions undetermined. Loss-making mills ≠ prosperity.

## 10. Cooperative alternative

Equal standing with construction. Custom mills may enable toll/aggregated runs. **NEE.**

## 11. Vertical integration

Supported as description: large AR feed capacity serves contract poultry, not open specialty markets. Not labeled wrongdoing.

## 12. Falsification board (A–G)

| Option | Result |
| --- | --- |
| A substantially correct | PARTIAL |
| B production exists / access problem | **LEADING** |
| C demand insufficient for specialty | PLAUSIBLE_UNTESTED |
| D transport not primary | NEE (framework) |
| E regional more efficient | PLAUSIBLE_UNTESTED |
| F cooperative > new mill | NEE equal standing |
| G claim wrong | **Absolute form contradicted** |

## 13. Hypothesis verdict

`CC-HYP-AR-LOCAL-NON-GMO-FEED-INFRASTRUCTURE-GAP`: **QUALIFIED**

## 14. Public Reasoning

CC-PR-053–061.

## 15. Sources / RQs

CC-SRC-191–201 · CC-RQ-P21-074–077 · Sources total: 201

## 16. Baseline / GATE-02

Unchanged **2/86**. GATE-02 not passed.

## 17. Validators

- `pnpm research:validate` — PASSED (201 sources)
- `pnpm project:validate` — PASSED
- `pnpm phase2:validate` — PASSED (baseline still 2/86; GATE-02 open)
- `pnpm baseline:validate` — PASSED
- `pnpm graph:validate` — PASSED

## 18. Precise answer demanded by decision standard

> Where between an Arkansas grain field and an independent Arkansas livestock farmer does the non-GMO/local-feed supply chain break?

**Leading desk answer:** after commodity harvest — at **segregation / identity preservation / verification**, and at the boundary between **captive integrator milling** and **open specialty supply**, not at total absence of feed manufacturing. Economic magnitude and least-cost repair remain **UNKNOWN** pending primary price and IP-supply work.

## 19. Remaining unknowns

Primary confirmation of RVO/LF Feeds specs & prices; IP bushel census; delivered-cost decomposition; geography travel times; cooperative demand thresholds.

## 20. Exact next recommended slice (feed track)

`CC-PHASE-2.1-AR-FEED-MILL-PRIMARY-PRICE-AND-IP-GRAIN-SUPPLY-PASS-1.0`  
(Human/primary calls to LF Feeds + River Valley Organics + selected dealers; IP grain grower/elevator inquiry.)

**Parallel:** processing voice pass remains gated (~3 / 0 / 0).
