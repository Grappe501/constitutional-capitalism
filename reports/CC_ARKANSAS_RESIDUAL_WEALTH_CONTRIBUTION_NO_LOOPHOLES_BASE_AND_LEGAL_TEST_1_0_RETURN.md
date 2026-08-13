# CC-ARKANSAS-RESIDUAL-WEALTH-CONTRIBUTION-NO-LOOPHOLES-BASE-AND-LEGAL-TEST-1.0 — Return

**Decision:** CC-DEC-134  
**Update:** UPD-147  
**Date:** 2026-08-12  
**Hypothesis:** HYP-131 · Residual Wealth Contribution (base/legal harden)  
**Overall completion:** **43%** (held)  
**Prosperity-engine countable:** **$0** (unchanged)  
**Revises:** CC-DEC-133 / UPD-146 (asset-menu protections → universal floor + collection timing)

## Verdict

The residual wealth instrument must be defined by **beneficial economic ownership** and a **large universal net-worth floor**, not by a menu of asset-class exemptions that become loopholes. Illiquidity may change **when** the contribution is collected; it must not erase **whether** it is owed. A theoretical ~$48.5B Arkansas top-wealth base is **not** a usable cash-flow base until effective-base losses are modeled. Constitutional feasibility remains **open**.

## Central test

> Can Arkansas define substantial surplus wealth broadly enough that economically equivalent wealth is treated equivalently regardless of legal wrapper, while remaining administrable, constitutional, and resistant to avoidance?

## Doctrine locked (research requirements — not statute)

| Rule | Content |
|---|---|
| Taxable concept | **Beneficial economic ownership**, not title |
| No-wrapper escape | Trusts, LLCs, holding companies, private foundations, partnerships, offshore entities, family offices, and similar wrappers do not erase wealth |
| Poverty protection | **Very high universal NW floor** — not dozens of asset-specific carveouts |
| Floor form | Below $X → zero; above $X → all economically owned wealth above the floor enters the base |
| Illiquidity | Changes **collection timing**; does **not** erase liability |
| Symmetry | No privilege merely because sophisticated structuring is available |
| Last resort | Still after prosperity engines / returns / external income |

**$X is not locked** — derive empirically. IRS Personal Wealth 2019’s $11.4M state floor remains a bound observation, not Constitutional Capitalism’s chosen floor.

### What this revises from UPD-146

Asset-specific “exemptions” for primary residence / retirement / farm as automatic liability erasers are **rejected as the protection design**.

- Ordinary ~$350k home + ordinary retirement → never near the system (**floor**).  
- $25M estate → calling part of it “primary residence” must not shelter millions by label.  
- Illiquid farm/business above the floor → **secured deferral / installment / liquidity-event collection with interest**, not exemption.

## No-loopholes research catalog (required)

Trusts & pass-throughs · closely held corps/partnerships · offshore · beneficial-ownership registry · deferred compensation · private foundations/DAFs with retained benefit · loans against appreciated assets · controlled-entity transfers · private-company valuation · crypto · art/collectibles · IP · carried/partnership interests · family offices · related-party debt.

Rule for each: economically equivalent wealth → equivalent inclusion. Collection mechanics may differ; capacity should not.

## Effective base (illustrative haircut stack)

Bound theoretical AR top NW (IRS 2019, ≥$11.4M): **~$48.53B** / **2,374** holders.

| Scenario | Retention | Effective base | 1% yield |
|---|---:|---:|---:|
| Optimistic | ~75.1% | ~$36.4B | ~$364M |
| **Base** | **~57.1%** | **~$27.7B** | **~$277M** |
| Stressed | ~34.3% | ~$16.7B | ~$167M |

Haircut factors (multiplicative placeholders — not calibrated AR microsim): valuation disputes, migration, entity restructuring, federal preemption, collection lag, admin/compliance net.

**Reading:** UPD-146’s ~$485M at 1% on the theoretical base becomes ~$277M under the Base effective stack. Theoretical ≠ cash-flow.

### Gap table under Base effective base (~$27.7B)

| Residual gap | Rate needed | Within 0.25–2% grid? |
|---:|---:|---|
| $250M | ~0.9% | Yes (1%) |
| $500M | ~1.81% | Yes (2%) |
| $1B | ~3.61% | No — need stronger engines or >2% |
| $2B | ~7.22% | No |

## Legal design space (dedicated — not cleared)

| Track | Verdict |
|---|---|
| Holistic annual NW by ordinary statute | **Do not assume available** (Art. 16 §5 uniformity; Am. 47 state ad valorem limits) |
| Intangible-only under Am. 57 | **Plausible lane to stress** — more flexible; current A.C.A. § 26-3-302 exempts local ad valorem on intangibles; symmetry risk if real/tangible productive wealth escapes |
| Realization / deferral / liquidity-event excise | **Priority alternative** — fits illiquidity-as-collection rule |
| Constitutional amendment | **Likely required** if the instrument is a holistic annual surplus-wealth base |

Art. 16 §5 and Amendment 57 coexist; Art. 16 §5 expressly does not repeal Am. 57. Design must pick a lane consciously. Federal Due Process / Commerce Clause / preemption / reporting gates remain open.

## Buckets

### Prosperity-engine COUNTABLE NOW
**Still $0.**

### No-loopholes base + legal design
**Modeled** as doctrine + illustrative effective-base stress — not a cleared legal opinion and not countable replacement dollars.

## Implication

> Once somebody is genuinely inside the surplus-wealth tier, wealth should not escape through wrappers — and poverty protection should come from a high floor, not from loopholes dressed as exemptions.

Next:

1. **`CC-ARKANSAS-EXTERNAL-INCOME-SECTOR-CAPTURE-1.0`** (engine swing variable)  
2. Parallel: constitutional memorandum on the three legal tracks + beneficial-ownership administrability  
3. Integrate engines + residual wealth under **effective** (not theoretical) base vs ~$7.23B  

## Artifacts

- `data/imports/arkansas-revenue-replacement/residual_wealth_no_loopholes_base_legal_ledger.json`  
- `scripts/bind_residual_wealth_no_loopholes_base_legal.py`  
- Prior bind: `residual_wealth_contribution_ledger.json` (IRS Personal Wealth 2019 Table 6)  
- IRS hub: https://www.irs.gov/statistics/soi-tax-stats-personal-wealth-statistics  
- Am. 57 / § 26-3-302 / Art. 16 §5 anchors in ledger `legal_design_space`
