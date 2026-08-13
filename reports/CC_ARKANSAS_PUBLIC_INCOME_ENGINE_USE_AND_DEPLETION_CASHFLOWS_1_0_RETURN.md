# CC-ARKANSAS-PUBLIC-INCOME-ENGINE-USE-AND-DEPLETION-CASHFLOWS-1.0 — Return

**Decision:** CC-DEC-128  
**Update:** UPD-141  
**Date:** 2026-08-12  
**Hypothesis:** HYP-131  
**Overall completion:** **43%** (held)  
**Counted toward ~$7.23B:** **$0**

## Verdict

Use and Depletion are **support engines**, not the main replacement engines. This pass bound real cash-flow scales, applied the already-spent rule, and cleared **zero** incremental dollars as COUNTABLE NOW. That is a successful fail-closed result.

## Questions answered

1. **Use without recreating a household tax?** Road-use charges can be proportional (fuel/heavy vehicles), but the large base is **already dedicated to highways** and must stay there. Household water/waste hikes fail the design test.  
2. **Depletion capture before value leaves?** Full natural-gas severance is ~**$25.6M** FY2026 (not the $10.6M GR line alone) — mostly highway-earmarked and **highly volatile**. Lithium is the serious future depletion option, but **not producing at scale** and current 2.5% royalties go mainly to **private brine owners**, not the state.

## Bound scales that matter

| Stream | Bound $ | Already spent? |
|---|---:|---|
| Motor fuel FY2026 (ex pet. env. fee) | **~$572M** | YES — highways |
| Natural gas severance FY2026 (full) | **~$25.6M** | YES — ~95% highways / ~5% GR |
| Natural gas severance FY2023 (stress) | **~$76.9M** | Shows volatility |
| Oil revenues FY2026 | **~$12.2M** | YES — statutory distribution |
| DFA GR “Severance” line FY2026 | **$10.6M** | Subset only — do not confuse with full gas |
| State 2% tourism tax FY2026 | **~$26.9M** | YES — tourism marketing |
| Lithium commercial public income | **$0** | Not yet |

## Three buckets

### COUNTABLE NOW
**Empty — $0.** No evidence-backed, incremental, legally free, reserved cash flow cleared.

### PLAUSIBLE BUT UNMODELED / LEGAL-PENDING
- Heavy-vehicle ESAL / weight-distance fees (Commerce Clause–safe design)  
- Airport/port participation (mostly enterprise/federal-constrained)  
- **Lithium/brine permanent-fund + community + public-royalty stack** (post-2028 production)  
- Other minerals, timber tonnage series, public-land leases, industrial water rents  

### NOT MATERIAL / NOT SUITABLE (as replacement engines)
- Motor fuel (~$572M) — real Use base, **already spent on roads**  
- Gas/oil severance — too small/volatile/dedicated  
- EV registration (~$4M YTD) — aligned but tiny  
- Household water/waste — would recreate broad household burden  
- Tourism 2% — visitor-aligned, marketing-earmarked, small  

## Implication for HYP-131

Use/Depletion can improve fairness (use≠existence; depletion→permanence) but **cannot carry ~$7.23B**. Larger replacement capacity must be modeled next in:

**Human-capital · Value Capture · Enterprise · Prosperity Fund · External Income**

## Artifacts

- `data/imports/arkansas-revenue-replacement/use_depletion_cashflow_ledger.json`  
- `scripts/bind_use_depletion_cashflows.py`  
- Primary binds: DFA NG/oil monthly gross; MCF by period; motor fuel FY totals  

## Next

`CC-ARKANSAS-PUBLIC-INCOME-ENGINE-VALUE-CAPTURE-AND-ENTERPRISE-1.0` (or Workforce Prosperity Contribution incidence) — where larger capacity is more likely to appear.
