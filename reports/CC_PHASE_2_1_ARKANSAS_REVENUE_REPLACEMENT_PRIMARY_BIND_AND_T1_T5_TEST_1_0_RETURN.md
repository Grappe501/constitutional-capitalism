# CC-PHASE-2.1-ARKANSAS-REVENUE-REPLACEMENT-PRIMARY-BIND-AND-T1-T5-TEST-1.0 — Return

**Decision:** CC-DEC-125  
**Update:** UPD-138  
**Date:** 2026-08-12  
**Hypothesis:** `CC-HYP-PROSPERITY-BASED-REVENUE-REPLACEMENT-SYSTEM` (HYP-131)  
**Overall completion:** **43%** (held)  
**Political conclusion:** **None** — no recommendation to abolish IIT or property tax

## Verdict

HYP-131 is no longer scaffold-only. Primary DFA FY2026 GR tables and BLR URT foundation dollars are bound; property tax is split into distinct layers; Resource / Enterprise / Consumption are scored on T1–T5. The slice ends with a **replacement-capacity gap**, not a tax-cut plan.

## How many recurring dollars must be replaced?

| Target | Bound / estimated dollars | Status |
|---|---:|---|
| **Personal income tax (gross FY2026)** | **$3.8591B** | BOUND — DFA June FY2026 GR table |
| IIT net of refunds (GR contribution) | $3.3046B | BOUND (derived) |
| **School URT (25-mill foundation local)** | **$1.6027B** | BOUND — BLR 2024–25 foundation makeup |
| Additional school millage (above URT) | ~$0.87B | ESTIMATED from millage structure |
| County millage | ~$0.27B | ESTIMATED |
| Municipal millage | ~$0.22B preferred (share method) | ESTIMATED range |
| Special / other | ~$0.03B | CONTEXT SHARE |
| School debt-service split | — | **NEE** (embedded in school totals) |

Illustrative property-layer sum (ex precise debt split): **~$2.99B**.

## Who depends on those dollars?

- **IIT / sales / corporate GR:** State appropriations; K-12 Public School Fund is heavily GR-funded (BLR: DESE PSF GR alone ~$2.44B in FY2025).
- **URT:** Traditional district foundation M&O under **Ark. Const. Art. 14, § 3** (constitutional hardness).
- **Additional school mills:** Local M&O above foundation and/or **debt service** (debt covenants matter).
- **County / city / special:** Local infrastructure, roads, pensions, libraries, hospitals, etc.

## T1–T5 — Resource · Enterprise · Consumption

| Family | Bound scale vs $3.859B IIT | Capacity verdict | Incidence flag |
|---|---|---|---|
| **Resource** (severance $10.6M) | ~0.3% | **Cannot** carry meaningful share | Mixed / commodity |
| **Enterprise** (corporate $524M + gaming $64M + franchise $8M ≈ $0.60B) | ~15% | **Partial at best** — and already funding GR (not incremental) | Mixed; gaming regressive risk |
| **Consumption** (sales/use $3.667B existing) | ~95% of IIT scale | **Only family with scale** — but existing stream; hike-as-swap is burden rename | **Regressive risk — surfaced** |

**Explicit rule hit:** A sales-tax-heavy IIT replacement without household protections shifts burden onto ordinary households through prices. That is **not** prosperity-aligned by default.

**Not counted as replacement dollars:** prosperity-fund dividends, public investment returns, unmodeled community enterprise distributions.

## Replacement-capacity gap

| Ledger | Incremental modeled replacement capacity | Gap |
|---|---|---|
| State IIT | **$0** (honest incremental accounting) | **Full $3.859B remains** |
| Community property (URT + other layers) | **$0** modeled | **Full gap remains** |

Existing corporate/gaming/severance dollars are **already spent**. Summing them does not close the gap.

## What this slice does **not** do

- Recommend abolishing IIT or property tax  
- Treat unmodeled prosperity returns as fills  
- Collapse property tax into one number  
- Claim Resource/Enterprise alone can replace IIT  

## Artifacts

| Path | Role |
|---|---|
| `data/imports/arkansas-revenue-replacement/fy2026_dfa_general_revenue_bind.json` | DFA primary bind |
| `data/imports/arkansas-revenue-replacement/blr_urt_foundation_bind.json` | URT foundation bind |
| `data/imports/arkansas-revenue-replacement/property_tax_layer_structure.json` | Layered property map |
| `data/imports/arkansas-revenue-replacement/t1_t5_resource_enterprise_consumption.json` | Five-test scores |
| `data/project/arkansas_revenue_replacement_capacity_gap.json` | Gap map |
| Updated ledger / demands / architecture | Money Flow Map v1.1 |

## Next research

1. Statewide millage×assessment×collections inventory (debt-service split; municipal AV-weighted)  
2. Incidence tables (IIT / sales / property by income & tenure)  
3. Community prosperity replacement pilots with dollars — still unmodeled  
4. Only then revisit Tax Retirement Fund thresholds with real incremental capacity
