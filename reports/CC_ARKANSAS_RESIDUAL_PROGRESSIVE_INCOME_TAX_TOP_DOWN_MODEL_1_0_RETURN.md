# CC-ARKANSAS-RESIDUAL-PROGRESSIVE-INCOME-TAX-TOP-DOWN-MODEL-1.0 — Return

**Decision:** CC-DEC-132  
**Update:** UPD-145  
**Date:** 2026-08-12  
**Hypothesis:** HYP-131 · Residual shock absorber (not a prosperity engine)  
**Overall completion:** **43%** (held)  
**Prosperity-engine countable:** **$0** (unchanged)

## Verdict

A **Residual Progressive Income Tax** fits the philosophy better than a permanent broad household IIT: prosperity engines first; personal income tax last; start at the top; move down only as far as necessity requires; self-retire toward zero as other engines grow. IRS SOI TY2022 Arkansas data makes this **measurable**. Thresholds are **not locked**.

## Design locked

> Prosperity revenues first → residual gap calculated → tax begins at the highest income tier → marginal (not cliff) → lower tiers exempt → boundary moves down only if required.

**Self-retiring each year:**  
`obligations − Use/Impact/Depletion − Value Capture/Enterprise − Human-capital − External Income − Prosperity Fund distributions = Residual Revenue Requirement`

**Hard protection:** no expansion into the protected labor band without public trigger, published shortfall, and statutory or voter authorization.

## Bound base

| Item | Value |
|---|---|
| Current IIT FY2026 gross | **$3.859B** (DFA) |
| Current top rate TY2026 | **3.7%** (Act 2 / SB1) |
| IRS SOI TY2022 AR returns | **1,295,860** |
| IRS SOI TY2022 AR AGI | **~$95.8B** |
| Taxable income $1M+ | **~$12.71B** (3,520 returns) |
| Taxable income $500k+ | **~$17.40B** |
| Taxable income $200k+ | **~$29.83B** |

Finer $2M/$5M splits: **NEE** (IRS top band is $1M+). Do not lock illustrative mega-brackets yet.

### Top-band composition ($1M+) — why labor vs rent matters

| Component | Amount | Share of AGI |
|---|---:|---:|
| Salaries & wages | ~$2.42B | **~16%** |
| Net capital gain | ~$4.53B | | 
| Partnership / S-corp | ~$3.08B | |
| Cap-gain + pass-through | ~$7.60B | **~50%** |

Top residual revenue is **capital/pass-through heavy** — more cyclical than wage IIT. Labor-vs-rent differentials remain a **hypothesis** until incidence/mobility clear.

## Central answer

> If other engines produce $X, how high can the income-tax starting point rise?

Flat-rate approximation on taxable income in included top bands (≤8% preferred):

| Other engines cover | Residual gap | Starting AGI threshold | Rate needed |
|---:|---:|---:|---:|
| **~$3.61B** | $250M | **$1M+** | **~2.0%** |
| **~$3.36B** | $500M | **$1M+** | **~3.9%** |
| **~$2.86B** | $1B | **$1M+** | **~7.9%** |
| **~$1.86B** | $2B | **$200k+** | **~6.7%** |
| **~$0.86B** | $3B | **$100k+** | **~6.2%** |

Reading: ordinary labor exits the tax only if prosperity engines carry **most** of today’s ~$3.859B. A large residual forces the boundary back down the distribution.

## Illustrative schedules (not locked)

| Package | Est. revenue |
|---|---:|
| 8% on $1M+ only | **~$1.02B** |
| 8% / 6% on $1M+ and $500k–$1M | **~$1.30B** |
| 8% / 6% / 4% down through $200k–$500k | **~$1.80B** |
| 3.7% from $200k+ | **~$1.10B** |
| 3.7% from $100k+ | **~$1.79B** |

Current ~$3.859B requires either deep distributional reach at low rates (today’s model) or much larger prosperity-engine coverage plus a smaller residual.

## Stress flags

- **Migration/avoidance:** 10–25% shrink of top taxable base meaningfully cuts residual yield (illustrative — not an AR migration study).  
- **Volatility:** capital-gain drought can widen the residual exactly when other engines may also weaken → need Prosperity Fund buffer.  
- **Pass-through incidence:** large S-corp/partnership income at the top can burden employer-owners; microsim required before endorsement.  
- **Federal AGI ≠ Arkansas taxable income:** SOI is the best public bracket map; state conformity/adjustments remain a refinement.

## Buckets

### Prosperity-engine COUNTABLE NOW
**Still $0.**

### Residual shock-absorber design
**Modeled** from SOI top-down — legal/admin base exists via current IIT statute.

### Not locked
$5M/$2M thresholds; labor vs rent rate differentials.

## Implication

This turns residual IIT into a **measurable transition mechanism**: every dollar of real Use/Depletion/Value Capture/Enterprise/Human-capital/External Income/Prosperity Fund distribution **raises the starting point** and can eventually drive residual IIT to **zero**.

Prosperity-engine sequence continues:

1. **`CC-ARKANSAS-EXTERNAL-INCOME-SECTOR-CAPTURE-1.0`** (next engine pass)  
2. Integrate all 10 engines + residual IIT shock absorber  
3. Stress-test vs ~$7.23B and state achievable retirement share/timeline  

## Artifacts

- `data/imports/arkansas-revenue-replacement/residual_progressive_income_tax_top_down_ledger.json`  
- `scripts/bind_residual_progressive_income_tax_top_down.py`  
- Primary: IRS SOI Historic Table 2 TY2022 Arkansas (`22in04ar.xlsx`)
