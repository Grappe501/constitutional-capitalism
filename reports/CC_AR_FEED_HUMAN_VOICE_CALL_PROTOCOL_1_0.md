# Arkansas Feed / Non-GMO — Human Voice Call Protocol 1.0

**Slice:** `CC-PHASE-2.1-AR-NON-GMO-FEED-PRIMARY-PRICE-IP-GRAIN-AND-TOLL-MILLING-STUDY-1.0`  
**Role:** Human caller only. Cursor must **not** invent mill prices, toll willingness, grain origin, or segregation capability.

## Processing lane (frozen)

Preserve processing baseline **~3 / 0 / 0**. Do not invent booking lead times there.

## Identity script

> Hello — my name is [Name]. I’m doing research for the Constitutional Capitalism project on Arkansas family-farm feed access, especially verified non-GMO and organic options. This is not a sales call and we’re not placing an order today. We’re trying to understand what independent farmers can actually buy or have milled. Do you have a few minutes? You can decline any commercially sensitive item.

Offer anonymity for prices if requested. Record attribution permission.

## Priority call order

1. **LF Feeds LLC — Bismarck** — (501) 304-4323  
2. **JA Farms Feed — Bismarck** — (501) 865-1929 / (501) 626-1160  
3. **River Valley Organics — Hartman** — (479) 497-1616 *(ask for Leon Hostetler if useful)*  
4. **Powell Feed & Milling — Green Forest** — (870) 438-5184  
5. **Taggart & Taggart Seed — Augusta** — (870) 347-6301 *(IP grain channel; not a feed mill)*  

Optional later: Kalmbach AR dealers (retail shelf price), Delta Soy (food-channel offtake only).

## Required fields (mills)

Capture exactly; use `DECLINED`, `UNKNOWN`, or `N/A` — never invent.

1. Sell to independent / outside livestock producers?  
2. Products by species (cattle / hog / sheep-goat / poultry / other)  
3. Verification class available today (organic / Non-GMO Project / IP tested / supplier-attested / conventional / none)  
4. Current prices (per 50 lb / ton / other) and **minimum order**  
5. Pickup vs delivery; delivery radius / freight terms  
6. Grain origin (Arkansas / regional / Midwest / unknown)  
7. Segregation / testing / certification mechanism  
8. **Custom blend** from mill ingredients? (Y/N/conditions)  
9. **Toll mill farmer/co-op grain?** (Y/N/conditions)  
10. If toll: can identity be preserved (cleanout, dedicated run, testing)? Fees? Min run size?  
11. Would you work with a producer cooperative on scheduled specialty runs?  
12. **What do *you* believe is the main bottleneck** for verified non-GMO/organic feed for independent farmers?

Question 12 is mandatory. Do **not** suggest “we need a new mill” as the answer.

## Required fields (Taggart / IP grain)

1. Sell non-GMO or organic soy/corn to livestock feed mills or producers?  
2. Minimum lots / contracts  
3. Testing standard  
4. Any existing livestock-feed offtake in Arkansas?  
5. Willingness to contract with a co-op supplying an open mill?

## Evidence class

| Class | Definition |
| --- | --- |
| **OWN_OPERATION_FACT** | About their mill/elevator |
| **INDUSTRY_BELIEF** | About Arkansas generally |

Do not collapse these.

## After calls

Enter into `research/phase_2/ar_feed_voice_call_records.json`.

**Unlock first bottleneck upgrade** after LF Feeds + JA Farms + River Valley Organics entered.  
**Do not recommend new mills** until toll/IP questions are answered for those three (and preferably Powell).
