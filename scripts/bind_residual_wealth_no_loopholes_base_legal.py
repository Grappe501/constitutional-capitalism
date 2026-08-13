#!/usr/bin/env python3
"""Residual Wealth Contribution — no-loopholes base + legal test (HYP-131).

Central test: Can Arkansas define substantial surplus wealth broadly enough that
economically equivalent wealth is treated equivalently regardless of legal wrapper,
while remaining administrable, constitutional, and resistant to avoidance?

Doctrine revision vs UPD-146 asset-menu protections:
  - Poverty protection = very high universal net-worth floor (empirically derived; not locked)
  - Illiquidity changes WHEN contribution is collected, not WHETHER it is owed
  - Taxable concept = beneficial economic ownership, not title
"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "imports" / "arkansas-revenue-replacement"
OUT.mkdir(parents=True, exist_ok=True)

PRIOR = OUT / "residual_wealth_contribution_ledger.json"

SLICE = "CC-ARKANSAS-RESIDUAL-WEALTH-CONTRIBUTION-NO-LOOPHOLES-BASE-AND-LEGAL-TEST-1.0"
DEC, UPD = "CC-DEC-134", "UPD-147"
PRIOR_DEC, PRIOR_UPD = "CC-DEC-133", "UPD-146"
IIT_GROSS = 3_859_100_000
COMBINED = 7_231_905_638
RATES = [0.0025, 0.005, 0.01, 0.015, 0.02]
GAPS = [
    ("G250", 250_000_000),
    ("G500", 500_000_000),
    ("G1000", 1_000_000_000),
    ("G2000", 2_000_000_000),
]
FLOORS_TESTED = [5_000_000, 10_000_000, 11_400_000, 25_000_000, 50_000_000, 100_000_000]


def load_prior_bind() -> dict:
    prior = json.loads(PRIOR.read_text(encoding="utf-8"))
    ar = prior["arkansas_top_wealth_bind"]
    return {
        "prior_slice_id": prior["slice_id"],
        "prior_decision_id": prior["decision_id"],
        "prior_update_id": prior["update_id"],
        "holders": ar["holders"],
        "net_worth_usd": ar["net_worth_usd"],
        "financial_assets_usd": ar["financial_assets_usd"],
        "all_real_estate_usd": ar["all_real_estate_usd"],
        "all_other_assets_usd": ar["all_other_assets_usd"],
        "gross_assets_usd": ar["gross_assets_usd"],
        "floor_net_worth_usd": ar["floor_net_worth_usd"],
        "source_url": ar["source_url"],
        "study_year": ar["study_year"],
        "irs_personal_wealth_hub": "https://www.irs.gov/statistics/soi-tax-stats-personal-wealth-statistics",
    }


def doctrine() -> dict:
    return {
        "name": "Residual Wealth Contribution — No-Loopholes Beneficial Ownership Base",
        "revises": {
            "decision_id": PRIOR_DEC,
            "update_id": PRIOR_UPD,
            "what_changes": (
                "Replace asset-class exemption menu (primary residence / retirement / farm as "
                "automatic shelters) with a large universal net-worth floor; treat illiquidity as "
                "a collection-timing issue, not a liability eraser"
            ),
        },
        "hierarchy": (
            "Prosperity engines → public returns → external income → residual wealth contribution "
            "→ never ordinary labor income"
        ),
        "taxable_concept": "beneficial_economic_ownership",
        "taxable_concept_rule": (
            "Wealth cannot disappear for tax purposes merely because it was moved into a trust, "
            "LLC, holding company, private foundation, partnership, offshore entity, family office, "
            "or another ownership wrapper"
        ),
        "poverty_protection": (
            "Very high universal net-worth floor — not a long menu of asset-specific loopholes"
        ),
        "floor_rule": (
            "Net worth below $X: zero liability. Net worth above $X: all economically owned wealth "
            "above the protected floor enters the base, regardless of legal wrapper. $X is derived "
            "empirically and not locked in this slice."
        ),
        "illiquidity_rule": (
            "Illiquidity can change when the contribution is collected; it should not erase the "
            "contribution"
        ),
        "symmetry_rule": (
            "No asset-class privilege for wealth merely because wealthy owners have access to "
            "sophisticated legal structuring. Collection mechanics may differ; underlying economic "
            "capacity should not."
        ),
        "social_expectation_inside_tier": (
            "You have benefited from and possess enough of society's accumulated prosperity that "
            "you can help finance the institutions that make prosperity possible"
        ),
        "last_resort": "Consistent with HYP-131 — residual after Arkansas first tries to earn public income through prosperity itself",
        "not": [
            "Broad millionaire tax on ordinary paper wealth near ordinary homes/retirement",
            "Forced fire-sale liquidation of productive farms/businesses as the default collection method",
            "Asset-label sheltering that lets a $25M estate hide surplus behind 'primary residence'",
        ],
    }


def beneficial_ownership_catalog() -> list[dict]:
    """Avoidance / structuring vectors that must be research-designed, not waved away."""
    items = [
        ("trusts_and_pass_throughs", "Trusts and pass-through entities", "Look-through / attribution of beneficial interests"),
        ("closely_held_corps_partnerships", "Closely held corporations and partnerships", "Look-through equity + control attribution"),
        ("offshore_holdings", "Offshore holdings", "Controlled foreign entity attribution + information reporting"),
        ("beneficial_ownership_registry", "Beneficial ownership transparency", "Ultimate natural-person owner mapping"),
        ("deferred_compensation", "Deferred compensation", "Include vested/economic rights in NW base"),
        ("private_foundations_dafs", "Private foundations and donor-advised structures with retained personal benefit", "Include where personal beneficial interest remains"),
        ("loans_against_appreciated_assets", "Loans against appreciated assets", "Gross-up / anti-monetization without realization"),
        ("transfers_among_controlled_entities", "Transfers among controlled entities", "Disregard circular / related-party reshuffles"),
        ("private_company_valuation", "Valuation of private companies", "Mandatory methods + audit; disputes ≠ disappearance"),
        ("crypto_digital_assets", "Crypto / digital assets", "Reportable beneficial holdings at fair value"),
        ("art_collectibles", "Art and collectibles", "Include above de minimis; appraisal protocols"),
        ("intellectual_property", "Intellectual property", "Include capitalized / transferable IP interests"),
        ("carried_partnership_interests", "Carried interests and partnership interests", "Include economic interest, not just currently taxable income"),
        ("family_offices", "Family offices", "Attribute controlled office/entity wealth to principals"),
        ("related_party_debt", "Related-party debt", "Substance-over-form netting; ignore circular debt"),
    ]
    out = []
    for vid, name, design in items:
        out.append(
            {
                "id": vid,
                "name": name,
                "design_requirement": design,
                "status": "RESEARCH_REQUIRED",
                "rule": "Economically equivalent wealth → equivalent inclusion in base",
            }
        )
    return out


def collection_vs_liability() -> dict:
    return {
        "distinction": {
            "anti_avoidance": "Prevents wealth from exiting the base via wrappers, labels, or paper transfers",
            "forced_liquidation": "NOT the design goal — economically destructive fire sales are rejected as default collection",
        },
        "illiquidity_rule": "Illiquidity changes WHEN collected, not WHETHER owed",
        "allowed_collection_mechanics": [
            {
                "id": "secured_deferral",
                "name": "Secured deferral with interest",
                "use": "Illiquid productive business/farm equity above floor",
            },
            {
                "id": "installment_obligation",
                "name": "Installment obligation with interest",
                "use": "Spread cash requirement without fire sale",
            },
            {
                "id": "liquidity_event_collection",
                "name": "Collection on liquidity events (sale/transfer/IPO/refi monetization)",
                "use": "Catch-up with accrued interest when cash appears",
            },
            {
                "id": "partial_cash_plus_lien",
                "name": "Partial cash from liquid sleeve + lien on illiquid sleeve",
                "use": "Mixed portfolios inside surplus tier",
            },
        ],
        "rejected_as_default": [
            "Exemption solely because asset is illiquid",
            "Exemption solely because asset is labeled primary residence inside a surplus-wealth estate",
            "Exemption solely because wealth sits in a trust/LLC/foundation wrapper",
        ],
        "ordinary_household_result": (
            "A household with a ~$350k home and ordinary retirement savings is nowhere near the "
            "system — protected by the universal floor, not by asset-class carveouts"
        ),
    }


def floor_design(ar: dict) -> dict:
    return {
        "rule": "Large universal net-worth floor; no dozens of asset-specific loopholes",
        "floors_tested_usd": FLOORS_TESTED,
        "locked": False,
        "derivation_status": "EMPIRICAL_PENDING",
        "bound_observation_floor_usd": ar["floor_net_worth_usd"],
        "bound_observation_note": (
            "IRS Personal Wealth 2019 state table starts at $11.4M NW — useful empirical starting "
            "point, not a locked Constitutional Capitalism floor"
        ),
        "below_irs_floor_status": "NEE — Arkansas households between $5M and $11.4M unbound",
        "primary_residence_reading": (
            "Inside surplus tier, calling part of a $25M estate a 'primary residence' must not "
            "automatically shelter millions solely because of the asset label; ordinary homes of "
            "non-surplus households never enter because of the floor"
        ),
        "retirement_reading": (
            "Ordinary retirement security is protected by the floor for non-surplus households; "
            "surplus-tier retirement/financial accounts are economically owned wealth above the floor"
        ),
        "farm_business_reading": (
            "Productive farm/business equity above the floor remains in the base; collection may "
            "defer — liability does not erase"
        ),
    }


def legal_design_space() -> dict:
    return {
        "status": "LEGAL_PENDING_DEDICATED — do not assume ordinary statute suffices",
        "central_question": (
            "Can Arkansas define substantial surplus wealth broadly enough that economically "
            "equivalent wealth is treated equivalently regardless of legal wrapper, while remaining "
            "administrable, constitutional, and resistant to avoidance?"
        ),
        "anchors": {
            "art_16_sec_5": {
                "rule": (
                    "All real and tangible personal property subject to taxation shall be taxed "
                    "according to its value, equal and uniform throughout the State; no species "
                    "taxed higher than another of equal value (exceptions limited)"
                ),
                "source": "https://codes.findlaw.com/ar/arkansas-constitution-of-1874/ar-const-art-16-sect-5/",
                "implication": (
                    "Do not assume a graduated annual net-worth tax that differentially burdens "
                    "real/tangible components can be enacted by ordinary statute"
                ),
            },
            "amendment_57": {
                "rule": (
                    "General Assembly may classify intangible personal property for lower assessment "
                    "percentages, exempt classes, or tax intangibles on a basis other than ad valorem"
                ),
                "sources": [
                    "https://law.justia.com/constitution/arkansas/amendments/amendment-57/",
                    "https://law.justia.com/codes/arkansas/title-26/subtitle-1/chapter-3/subchapter-3/section-26-3-302/",
                ],
                "current_statute": (
                    "A.C.A. § 26-3-302 currently exempts all intangible personal property from "
                    "county/city/school ad valorem levies (since 1976)"
                ),
                "implication": (
                    "Intangibles are a more flexible design lane than real/tangible property — "
                    "but current exemption is statutory, and a state residual wealth contribution "
                    "is not automatically authorized or classified"
                ),
            },
            "amendment_47": {
                "rule": "State generally prohibited from levying ad valorem taxes",
                "implication": "Classification of any state wealth levy (property vs excise vs other) is critical",
            },
            "art_16_sec_5_saves_am57": {
                "rule": "Art. 16 §5 expressly does not affect/repeal Amendment 57 as to intangibles",
                "implication": "Uniformity regime and intangibles regime coexist — design must pick a lane consciously",
            },
        },
        "tracks": [
            {
                "id": "TRACK-INTANGIBLE-ONLY",
                "name": "Intangible-only residual contribution under Amendment 57 authority",
                "covers_rough_share_of_bound_ar_top_assets": "financial + much of 'other' — real estate harder",
                "constitutional_posture": "MORE_FLEXIBLE_BUT_UNTESTED_FOR_THIS_INSTRUMENT",
                "avoidance_risk": "HIGH if real/tangible productive wealth escapes while financial wealth is hit — conflicts with symmetry rule unless real/tangible handled elsewhere",
                "administrability": "MEDIUM — valuation still hard for private equity/IP/crypto",
                "verdict": "PLAUSIBLE_LANE_TO_STRESS — not proven constitutional for annual beneficial-ownership wealth contribution",
            },
            {
                "id": "TRACK-HOLISTIC-NW-ORDINARY-STATUTE",
                "name": "Holistic annual net-worth levy by ordinary statute",
                "constitutional_posture": "HIGH_RISK under Art. 16 §5 if classified as property tax on real/tangible components; Amendment 47 state ad valorem limits",
                "avoidance_risk": "LOWER if beneficial-ownership base holds",
                "administrability": "HARD",
                "verdict": "DO_NOT_ASSUME_AVAILABLE",
            },
            {
                "id": "TRACK-REALIZATION-DEFERRAL",
                "name": "Realization / deferred collection / liquidity-event excise alternative",
                "constitutional_posture": "POTENTIALLY_SAFER if framed as excise on transfers/realization rather than annual ad valorem on real/tangible property",
                "avoidance_risk": "MEDIUM — needs anti-monetization (loans against assets) and constructive realization rules",
                "administrability": "MEDIUM",
                "fits_illiquidity_rule": True,
                "verdict": "PRIORITY_LEGAL_ALTERNATIVE_TO_TEST",
            },
            {
                "id": "TRACK-CONSTITUTIONAL-AMENDMENT",
                "name": "Constitutional amendment authorizing residual wealth contribution",
                "constitutional_posture": "CLEAREST_IF_HOLISTIC_BASE_REQUIRED",
                "avoidance_risk": "Designable — can embed beneficial-ownership and anti-wrapper rules",
                "administrability": "HARD but politically/legally explicit",
                "verdict": "REQUIRED_IF_HOLISTIC_ANNUAL_BASE_IS_THE_INSTRUMENT",
            },
        ],
        "federal_gates": [
            "Due Process / Commerce Clause limits on nonresidents, interstate trusts, and out-of-state entities",
            "Federal preemption / supremacy issues for certain retirement, ERISA, and banking structures (research required)",
            "Information reporting dependence on federal beneficial-ownership / CTA-like data (policy volatility)",
        ],
        "open_questions": [
            "Would an annual net-worth levy be classified as a property tax?",
            "Can beneficial-ownership look-through survive state constitutional and federal constraints?",
            "Does Amendment 57 authorize a state-level intangible wealth contribution distinct from local ad valorem?",
            "Is a constitutional amendment required for a holistic surplus-wealth base?",
            "Can realization/deferral alternatives satisfy the illiquidity rule without creating new loopholes?",
        ],
        "posture": "KEEP_AS_HYPOTHESIS — dedicated legal analysis opened; no doctrine claim",
    }


def haircut_scenarios(theoretical_base: int) -> list[dict]:
    """Effective-base scenarios. Theoretical $48.5B ≠ usable cash-flow base."""
    specs = [
        {
            "id": "OPTIMISTIC",
            "label": "Optimistic compliance / low avoidance",
            "factors": {
                "valuation_dispute_retention": 0.92,
                "migration_retention": 0.95,
                "entity_restructuring_retention": 0.93,
                "federal_preemption_retention": 0.98,
                "collection_lag_annualization": 0.96,
                "net_after_admin_compliance_cost": 0.98,
            },
        },
        {
            "id": "BASE",
            "label": "Base case — serious but workable enforcement",
            "factors": {
                "valuation_dispute_retention": 0.85,
                "migration_retention": 0.90,
                "entity_restructuring_retention": 0.88,
                "federal_preemption_retention": 0.95,
                "collection_lag_annualization": 0.92,
                "net_after_admin_compliance_cost": 0.97,
            },
        },
        {
            "id": "STRESSED",
            "label": "Stressed — aggressive avoidance + disputes + lag",
            "factors": {
                "valuation_dispute_retention": 0.70,
                "migration_retention": 0.80,
                "entity_restructuring_retention": 0.75,
                "federal_preemption_retention": 0.90,
                "collection_lag_annualization": 0.85,
                "net_after_admin_compliance_cost": 0.95,
            },
        },
    ]
    out = []
    for s in specs:
        eff = 1.0
        for v in s["factors"].values():
            eff *= v
        effective_base = int(round(theoretical_base * eff))
        revenues = {
            f"{int(r * 10000) / 100}%": int(round(effective_base * r)) for r in RATES
        }
        out.append(
            {
                **s,
                "effective_base_percentage": round(eff, 4),
                "theoretical_base_usd": theoretical_base,
                "effective_base_usd": effective_base,
                "base_loss_usd": theoretical_base - effective_base,
                "illustrative_revenue_at_rates_usd": revenues,
                "status": "ILLUSTRATIVE_HAIRCUT_STACK_NOT_ARKANSAS_MICROSIM",
                "note": (
                    "Multiplicative retention factors are research placeholders to force the "
                    "effective-base question — not calibrated Arkansas estimates"
                ),
            }
        )
    return out


def gap_under_effective(scenarios: list[dict]) -> list[dict]:
    out = []
    for gid, gap in GAPS:
        row = {
            "gap_id": gid,
            "residual_gap_usd": gap,
            "if_other_engines_cover_of_iit_usd": IIT_GROSS - gap,
            "by_scenario": [],
        }
        for s in scenarios:
            base = s["effective_base_usd"]
            needed = gap / base if base else None
            feasible_rate = None
            for r in RATES:
                if int(round(base * r)) >= gap:
                    feasible_rate = r
                    break
            row["by_scenario"].append(
                {
                    "scenario_id": s["id"],
                    "effective_base_usd": base,
                    "effective_base_percentage": s["effective_base_percentage"],
                    "rate_needed": round(needed, 4) if needed else None,
                    "rate_needed_percent": round(needed * 100, 2) if needed else None,
                    "lowest_tested_rate_that_closes": feasible_rate,
                    "lowest_tested_rate_percent": feasible_rate * 100 if feasible_rate else None,
                    "status": (
                        "FEASIBLE_WITHIN_2PCT_TEST_GRID"
                        if feasible_rate is not None
                        else "REQUIRES_RATE_ABOVE_2PCT_OR_STRONGER_ENGINES"
                    ),
                }
            )
        out.append(row)
    return out


def administrability() -> dict:
    return {
        "hard_problems": [
            "Annual valuation of private companies, farms, IP, art, crypto",
            "Beneficial-ownership discovery across trusts/entities/family offices",
            "Interstate and offshore information gaps",
            "Related-party debt and circular ownership graphs",
            "Distinguishing true third-party debt from avoidance debt",
        ],
        "minimum_admin_stack": [
            "Statewide beneficial-ownership reporting for surplus-tier filers",
            "Entity look-through schedules",
            "Appraisal / formula valuation protocols with audit",
            "Secured deferral and lien registry for illiquid sleeves",
            "Anti-monetization rules for loans against appreciated assets",
            "Information-sharing with federal estate/gift/income systems where lawful",
        ],
        "cost_posture": "Admin and compliance costs are a first-class haircut on effective base — not an afterthought",
    }


def main() -> None:
    ar = load_prior_bind()
    theoretical = ar["net_worth_usd"]
    scenarios = haircut_scenarios(theoretical)
    gaps = gap_under_effective(scenarios)
    base_case = next(s for s in scenarios if s["id"] == "BASE")

    # Compare theoretical vs base-effective flat revenues
    theoretical_flat = {f"{int(r * 10000) / 100}%": int(round(theoretical * r)) for r in RATES}

    out = {
        "version": "1.0.0",
        "slice_id": SLICE,
        "generated_at": "2026-08-12",
        "decision_id": DEC,
        "update_id": UPD,
        "hypothesis_id": "CC-HYP-PROSPERITY-BASED-REVENUE-REPLACEMENT-SYSTEM",
        "incubator_alias": "HYP-131",
        "status": "NO_LOOPHOLES_BASE_AND_LEGAL_TEST_MODELED_ZERO_PROSPERITY_COUNTABLE",
        "revises": {
            "decision_id": PRIOR_DEC,
            "update_id": PRIOR_UPD,
            "slice_id": "CC-ARKANSAS-RESIDUAL-WEALTH-CONTRIBUTION-MODEL-1.0",
            "revision": (
                "Universal NW floor + beneficial ownership + illiquidity-as-collection; "
                "asset-class exemption menu no longer the protection design"
            ),
        },
        "central_question": (
            "Can Arkansas define substantial surplus wealth broadly enough that economically "
            "equivalent wealth is treated equivalently regardless of legal wrapper, while remaining "
            "administrable, constitutional, and resistant to avoidance?"
        ),
        "doctrine": doctrine(),
        "floor_design": floor_design(ar),
        "beneficial_ownership_catalog": beneficial_ownership_catalog(),
        "collection_vs_liability": collection_vs_liability(),
        "legal_design_space": legal_design_space(),
        "administrability": administrability(),
        "arkansas_top_wealth_bind": ar,
        "theoretical_base_usd": theoretical,
        "theoretical_flat_revenue_usd": theoretical_flat,
        "effective_base_scenarios": scenarios,
        "gap_closure_under_effective_base": gaps,
        "headline_answers": {
            "theoretical_top_nw_usd": theoretical,
            "base_effective_base_percentage": base_case["effective_base_percentage"],
            "base_effective_base_usd": base_case["effective_base_usd"],
            "base_1pct_theoretical_usd": theoretical_flat["1.0%"],
            "base_1pct_effective_usd": base_case["illustrative_revenue_at_rates_usd"]["1.0%"],
            "reading": (
                f"Theoretical AR top NW ~${theoretical/1e9:.1f}B is not a usable cash-flow base. "
                f"Under the illustrative BASE haircut stack (~{base_case['effective_base_percentage']*100:.1f}% "
                f"retention → ~${base_case['effective_base_usd']/1e9:.1f}B), 1% yields "
                f"~${base_case['illustrative_revenue_at_rates_usd']['1.0%']/1e6:.0f}M — not "
                f"~${theoretical_flat['1.0%']/1e6:.0f}M. Floors remain unlocked; legal track remains open; "
                "COUNTABLE prosperity-engine dollars remain $0."
            ),
        },
        "buckets": {
            "COUNTABLE_NOW_PROSPERITY_ENGINES": {
                "incremental_recurring_usd": 0,
                "verdict": "Unchanged — this slice designs the residual base/legal test, not engine cash",
            },
            "RESIDUAL_WEALTH_NO_LOOPHOLES_DESIGN": {
                "status": "MODELED_DOCTRINE_PLUS_ILLUSTRATIVE_EFFECTIVE_BASE",
                "verdict": (
                    "Beneficial-ownership + universal floor + collection-timing doctrine locked as "
                    "research requirements; effective-base haircuts show large gap vs theoretical yield; "
                    "constitutional lane not cleared"
                ),
            },
            "REVISED_FROM_UPD_146": {
                "ids": [
                    "PRIMARY_RESIDENCE_AS_AUTOMATIC_EXEMPTION",
                    "RETIREMENT_AS_AUTOMATIC_EXEMPTION",
                    "FARM_BUSINESS_AS_LIABILITY_EXEMPTION",
                ],
                "verdict": (
                    "Replaced by universal floor + secured deferral/installment/liquidity-event "
                    "collection — illiquidity does not erase contribution"
                ),
            },
        },
        "counted_toward_prosperity_replacement_usd": 0,
        "replacement_target_usd": COMBINED,
        "next_slice": "CC-ARKANSAS-EXTERNAL-INCOME-SECTOR-CAPTURE-1.0",
        "parallel_wealth_legal_next": [
            "Constitutional memorandum comparing TRACK-INTANGIBLE-ONLY vs TRACK-REALIZATION-DEFERRAL vs TRACK-CONSTITUTIONAL-AMENDMENT",
            "Arkansas-specific beneficial-ownership / entity look-through administrability memo",
            "Calibrate haircut factors with comparative wealth-tax experience (not doctrine)",
        ],
        "holds": [
            "overall_percent_held_at_43",
            "KEEP_AS_HYPOTHESIS",
            "no_abolish_today",
            "prosperity_engines_still_zero_countable",
            "never_ordinary_labor_income",
            "beneficial_economic_ownership",
            "universal_floor_not_asset_menu",
            "illiquidity_is_collection_timing_not_exemption",
            "symmetry_no_structuring_privilege",
            "theoretical_base_is_not_effective_base",
            "constitutional_lane_not_cleared",
            "floors_not_locked",
        ],
    }

    path = OUT / "residual_wealth_no_loopholes_base_legal_ledger.json"
    path.write_text(json.dumps(out, indent=2) + "\n", encoding="utf-8")
    print(
        json.dumps(
            {
                "path": str(path),
                "theoretical_b": round(theoretical / 1e9, 2),
                "base_eff_pct": base_case["effective_base_percentage"],
                "base_eff_b": round(base_case["effective_base_usd"] / 1e9, 2),
                "rev_1pct_theoretical_m": round(theoretical_flat["1.0%"] / 1e6, 1),
                "rev_1pct_base_eff_m": round(
                    base_case["illustrative_revenue_at_rates_usd"]["1.0%"] / 1e6, 1
                ),
                "gap_base": {
                    g["gap_id"]: g["by_scenario"][1]  # BASE scenario
                    for g in gaps
                },
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
