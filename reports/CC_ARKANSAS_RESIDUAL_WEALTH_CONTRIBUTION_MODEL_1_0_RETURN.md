# CC-ARKANSAS-RESIDUAL-WEALTH-CONTRIBUTION-MODEL-1.0 — Return

**Decision:** CC-DEC-133  
**Update:** UPD-146  
**Date:** 2026-08-12  
**Hypothesis:** HYP-131 · Residual Wealth Contribution (not a prosperity engine)  
**Overall completion:** **43%** (held)  
**Prosperity-engine countable:** **$0** (unchanged)  
**Supersedes:** CC-DEC-132 / UPD-145 (Residual Progressive Income Tax)

## Verdict

UPD-145’s residual **income-tax** approach is **superseded**. The residual compulsory instrument is a **Residual Wealth Contribution**: prosperity engines first; if a gap remains, tax accumulated surplus wealth at the very top — **never wages, salaries, or ordinary earned income**. Liability begins only above substantial surplus net worth, with protections against forced liquidation of ordinary homes, productive family farms, retirement security, and closely held enterprises.

## Design locked

> Prosperity engines → public returns → external income → residual wealth contribution → never ordinary labor income

**Self-retiring each year:**  
`obligations − Use/Impact/Depletion − Value Capture/Enterprise − Human-capital − External Income − Prosperity Fund distributions = Residual Wealth Contribution Requirement`

**Social boundary:** nobody subject to this tax should be near economic precarity. Thresholds are defined by **net wealth**, not income.

**Protections required from the start:** primary residence; protected retirement; family-farm/business exemption or deferral; liquidity thresholds; deferral until sale/transfer for illiquid assets; anti-avoidance for trusts/entities; debt netting.

## Bound Arkansas top-wealth base (IRS Personal Wealth 2019)

| Item | Value |
|---|---|
| Definition | Top wealthholders with NW ≥ **$11.4M** (estate-multiplier) |
| Arkansas holders | **2,374** |
| Net worth | **~$48.53B** |
| Financial assets | **~$23.02B** |
| All real estate | **~$4.08B** |
| All other assets | **~$21.54B** |

Primary: IRS SOI Personal Wealth 2019 Table 6 (`19pw06es.xlsx`).  
$5M / $10M floors: **NEE** (below IRS floor). Band splits above $11.4M: **illustrative** via national Table 1 shares — not Arkansas microdata.

## Flat rates on full bound top NW (before haircuts)

| Rate | Est. revenue |
|---|---:|
| 0.25% | **~$121M** |
| 0.5% | **~$243M** |
| 1.0% | **~$485M** |
| 1.5% | **~$728M** |
| 2.0% | **~$971M** |

Avoidance, liquidity, valuation, and legal constraints are not subtracted here.

## Central answer (key table)

> If the remaining gap is $250M / $500M / $1B / $2B, what minimum wealth threshold and rate would close it while exempting the broadest possible share of Arkansas households?

| Residual gap | Preferred threshold (tested) | Rate | Base mode | Status |
|---:|---:|---:|---|---|
| **$250M** | **$11.4M+** (~2,374 holders) | **1.0%** | Full NW of holders ≥ floor | Feasible on bound top wealth |
| **$500M** | **$11.4M+** | **1.5%** | Full NW | Feasible on bound top wealth |
| **$1B** | **$11.4M+** | **~2.06% needed** | Full NW | Above 2% test grid / need broader base |
| **$2B** | **$11.4M+** | **~4.12% needed** | Full NW | Not closable within 2% on this base alone |

Higher exemptions ($25M / $50M / $100M) with marginal NW-above-exemption do **not** close $250M–$2B within 0.25–2% on the illustrative band allocation. Broadest honest exemption on bound data is the IRS top-wealth floor itself (~2.4k households), not a $25M+ only tax at modest rates.

Financial-only base (~$23B) roughly halves yield vs total NW at the same rate — liquidity-friendlier, but smaller.

## Legal track (major open gate)

Do **not** assume the General Assembly can enact a graduated annual net-worth tax on real/tangible property by ordinary statute.

- **Art. 16 §5:** equal and uniform taxation of real and tangible personal property that is taxed  
- **Amendment 57:** intangibles may be classified differently; A.C.A. § 26-3-302 currently exempts intangibles from local ad valorem  
- **Amendment 47:** state ad valorem levy limits — classification of any state wealth levy is critical  

Safer tracks to test: intangible-only contribution; realization/deferral for illiquid productive assets; constitutional amendment authorizing residual wealth contribution with exemption floors and anti-raid rules. Interstate trusts/entities raise Due Process / Commerce Clause issues. **KEEP_AS_HYPOTHESIS.**

## Stress flags

- **Migration/avoidance:** 10–25% shrink of top NW at 1% cuts yield to ~$437M / ~$364M (illustrative).  
- **Asset-price volatility:** wealth bases swing with markets; residual may rise in downturns → Prosperity Fund buffer.  
- **Admin/valuation:** closely held business, farm, and intangible valuation is costly and contested.  
- **Family farm / illiquid productive assets:** exemption or deferral is design-critical — otherwise the system recreates dispossession.

## Buckets

### Prosperity-engine COUNTABLE NOW
**Still $0.** Residual wealth contribution is not a prosperity engine.

### Residual Wealth Contribution design
**Modeled** from IRS top-wealth bind + illustrative bands — major NEE below $11.4M and for composition/trust/liquidity microdata.

### Superseded
**Residual Progressive Income Tax (CC-DEC-132 / UPD-145)** — do not leave both active as the residual instrument.

## Implication

Philosophical boundary is now clear:

> We do not tax labor. If compulsory taxation remains necessary after every other prosperity revenue engine has been exhausted, we tax only substantial accumulated surplus wealth — and the rate self-retires toward zero as engines and the Prosperity Fund grow.

Next research:

1. **`CC-ARKANSAS-EXTERNAL-INCOME-SECTOR-CAPTURE-1.0`**  
2. Integrate all 10 engines + residual wealth absorber vs ~$7.23B  
3. Legal track on wealth-base classification / amendment necessity  

## Artifacts

- `data/imports/arkansas-revenue-replacement/residual_wealth_contribution_ledger.json`  
- `scripts/bind_residual_wealth_contribution.py`  
- Primary: IRS SOI Personal Wealth 2019 Tables 6 & 1 (`19pw06es.xlsx`, `19pw01es.xlsx`)  
- Superseded ledger retained for history: `residual_progressive_income_tax_top_down_ledger.json`
