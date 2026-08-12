# CC-PHASE-2.1-ARKANSAS-PROPERTY-TAX-COLLECTIONS-INCIDENCE-AND-DEBT-SERVICE-MAP-1.0 — Return

**Decision:** CC-DEC-126  
**Update:** UPD-139  
**Date:** 2026-08-12  
**Hypothesis:** `CC-HYP-PROSPERITY-BASED-REVENUE-REPLACEMENT-SYSTEM` (HYP-131)  
**Overall completion:** **43%** (held)  
**Political conclusion:** **None** — no abolish recommendation

## Verdict

Property tax is no longer one estimated lump. School millage is split with DESE authority into **M&O vs debt service**; county dollars are AV-weighted; legal hardness and retirement sequence are class-specific. The stark arithmetic from the prior slice stands: conventional streams cannot carry full IIT + property retirement. This pass shows **why property is harder still** — roughly **nine-tenths of non-URT school mills are debt service**.

## Harder ledger — preferred dollars

| Layer | Preferred $ | Status | Legal class |
|---|---:|---|---|
| School URT (25 mills) | **$1.603B** | BOUND (BLR) | Constitutional |
| Additional school M&O above URT | **~$64M** | ESTIMATED | Statutory / local voter |
| School debt-service millage | **~$945M** | ESTIMATED | Contractual + local voter |
| County millage | **~$497M** | ESTIMATED (AV-weighted) | Statutory / local |
| Municipal millage | **~$231M** | ESTIMATED (share method) | Statutory / local |
| Special / other | **~$33M** | ESTIMATED (share) | Varies |
| **Property layers sum** | **~$3.37B** | mixed | — |

**Key DESE finding (233 LEAs):** simple-average mills ≈ **M&O total 25.90** (only **~0.90 above URT**) vs **debt service 13.30**. Share of non-URT school mills that are debt: **~93.7%**.

Cross-check (DESE simple-avg mills × statewide AV × URT collection factor): additional M&O ~$57M; debt ~$853M — same structure, slightly lower levels.

## $1 is not $1

| Class | Can replace administratively? | State law? | Constitution? | Blocked by debt covenants? |
|---|---|---|---|---|
| URT | No | Yes (path) | **Yes** | No |
| Additional school M&O | No | Likely | No | No |
| School debt service | No | Likely | No | **Yes — protect first** |
| County M&O subclasses | Partial rate changes | Likely for full retirement | No | Possible |
| Municipal general / pension / bond | Partial | Likely for full retirement | No | **Yes for bond mills** |
| Special districts | No | Entity-specific | Usually no | Varies |

**Proposed research sequence (not a political schedule):**  
Debt-service protection → vulnerable-household relief → selected local M&O replacement → additional school M&O → URT constitutional transition → final property-tax retirement.

## Incidence — what is bound vs NEE

**Bound (structural base):** 2025 taxable value **$73.937B** by category — residential ~**45.4%**, commercial+industrial ~**17.0%**, ag land+improvements ~**6.3%**, utility ~**8.7%**, business personal ~**10.7%**, vehicles ~**11.5%**.

**Still NEE:** owner incidence by income quintile; **renter economic incidence through rents** (must not be treated as zero); firm pass-through; district-AV-weighted school debt dollars; municipal AV-weighted + bond/pension split; statewide debt maturity/covenant inventory.

## Fork confirmed

Prior slice: conventional Resource/Enterprise/Consumption cannot close the IIT gap without a regressive rename.  
This slice: even the property side is mostly **constitutional URT + pledged debt**, not a pool of freely cuttable local M&O.

Therefore HYP-131’s next economic question is not “which existing tax to hike,” but:

> **What new productive revenue base must Constitutional Capitalism create?**

Queued next research track: **Prosperity Revenue Modeling** — Conventional public revenue (stability only) · Prosperity-linked revenue · Productive public wealth (**$0 replacement dollars until modeled**).

## Transition rule (locked for research)

> Never retire a tax dollar until a recurring replacement dollar has been demonstrated, stress-tested, legally available, and reserved for the same essential obligations.  
> Property retirement proceeds **millage class by millage class**.

## Artifacts

| Path | Role |
|---|---|
| `data/imports/arkansas-revenue-replacement/dese_school_millage_mo_debt_bind.json` | 233 LEA M&O / debt mills |
| `data/imports/arkansas-revenue-replacement/county_av_millage_levy_map.json` | 75-county AV × millage |
| `data/imports/arkansas-revenue-replacement/property_tax_layer_structure.json` | Layer dollars + legal matrix v2 |
| `data/imports/arkansas-revenue-replacement/property_tax_incidence_structure.json` | Category shares + NEE map |
| `data/project/prosperity_revenue_modeling_framework.json` | Three-category replacement taxonomy |
| `scripts/bind_arkansas_property_tax_collections_incidence.py` | Reproducible bind |

## Next

1. **CC-PHASE-2.1-ARKANSAS-PROSPERITY-REVENUE-MODELING-1.0** — first serious model of prosperity-linked + productive public wealth cash flows (still uncounted until demonstrated)  
2. District-AV join for true AV-weighted school debt dollars; municipal bond/general split; ACS incidence tables  
3. Structural parallel: definition-locks; empirical parallel: comparative diagnosis packets
