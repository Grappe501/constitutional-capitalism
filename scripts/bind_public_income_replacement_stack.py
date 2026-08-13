#!/usr/bin/env python3
"""Arkansas Public Income Replacement Stack (HYP-131) — first full-system integration.

System question: Given everything tested so far, what combination of public-income
engines, residual wealth contribution, and Prosperity Fund growth can realistically
replace Arkansas IIT and property tax — and on what timeline?

COUNTABLE NOW remains $0 for every prosperity engine. Scenario dollars are
ILLUSTRATIVE_NOT_COUNTED — hypotheses about feeders/mechanisms that do not yet exist
as demonstrated incremental reserved cash.
"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "imports" / "arkansas-revenue-replacement"
OUT.mkdir(parents=True, exist_ok=True)

SLICE = "CC-ARKANSAS-PUBLIC-INCOME-REPLACEMENT-STACK-1.0"
DEC, UPD = "CC-DEC-137", "UPD-150"

IIT = 3_859_100_000
PROPERTY = {
    "school_urt": 1_602_678_681,
    "school_additional_mo": 63_673_549,
    "school_debt_service": 945_415_981,
    "county": 496_554_570,
    "municipal": 231_422_500,
    "special_other": 33_060_357,
}
PROPERTY_SUM = sum(PROPERTY.values())  # 3_372_805_638
COMBINED = IIT + PROPERTY_SUM  # 7_231_905_638

# Residual wealth — effective base from UPD-147 (illustrative haircut stack)
RW_BASE_EFF = 27_698_672_926
RW_STRESSED_EFF = 14_813_784_367  # approx from prior stressed scenario
RW_OPT_EFF = 36_400_000_000  # approx optimistic

STACK_ORDER = [
    "Use",
    "Impact",
    "Depletion",
    "Visitor_Luxury",
    "Human_capital",
    "Value_Capture",
    "Enterprise",
    "External_Income",
    "Prosperity_Fund",
    "Residual_Wealth_Contribution",
]

HORIZONS = [
    ("H0", "Current", 0),
    ("H4", "4 years", 4),
    ("H8", "8 years", 8),
    ("H16", "16 years", 16),
]

SCENARIOS = ["STRESS", "BASE", "ACCELERATED"]


def engine_inventory() -> list[dict]:
    """Every engine: countable now = 0; prior slice status."""
    return [
        {
            "id": "Use",
            "countable_now_usd": 0,
            "prior_status": "SUPPORT — fuel/highway ~$572–689M real but already earmarked/spent",
            "gates": ["already_spent", "earmark", "incremental_redesign_unmodeled"],
        },
        {
            "id": "Impact",
            "countable_now_usd": 0,
            "prior_status": "UNMODELED — carbon/externality pricing not cash-flowed",
            "gates": ["unmodeled", "legal_design"],
        },
        {
            "id": "Depletion",
            "countable_now_usd": 0,
            "prior_status": "SUPPORT/FUTURE — gas severance ~$26M mostly highways; lithium post-2028 design",
            "gates": ["already_spent", "volatility", "lithium_not_yet_cash"],
        },
        {
            "id": "Visitor_Luxury",
            "countable_now_usd": 0,
            "prior_status": "Visitor 2% tourism tax ~$26.9M already spent; luxury redesign unmodeled",
            "gates": ["already_spent", "regressive_swap_risk_on_broad_sales"],
        },
        {
            "id": "Human_capital",
            "countable_now_usd": 0,
            "prior_status": "Wage envelope ~$64.5B bound; incidence/credit/legal gates open; CIT already spent",
            "gates": ["incidence", "credit_leakage", "legal_pending"],
        },
        {
            "id": "Value_Capture",
            "countable_now_usd": 0,
            "prior_status": "TIF/etc pledged or unsuitable; participation redesign unmodeled",
            "gates": ["pledged", "public_risk_at_risk", "unmodeled"],
        },
        {
            "id": "Enterprise",
            "countable_now_usd": 0,
            "prior_status": "Strategic but $0 — participation/energy/broadband/IP unmodeled",
            "gates": ["unmodeled", "public_risk_at_risk"],
        },
        {
            "id": "External_Income",
            "countable_now_usd": 0,
            "prior_status": "Swing variable — tourism spend ~$10.2B bound; public capture mechanisms $0",
            "gates": ["hard_wall", "ownership_leakage", "eicr_illustrative"],
        },
        {
            "id": "Prosperity_Fund",
            "countable_now_usd": 0,
            "prior_status": "Path modeled — $250M @4% needs ~$6.25B corpus; Base ~y11 if feeders real",
            "gates": ["fund_does_not_exist", "feeders_illustrative", "no_unrealized_gain_credit"],
        },
        {
            "id": "Residual_Wealth_Contribution",
            "countable_now_usd": 0,
            "prior_status": "Effective base ~$27.7B; 1%≈$277M illustrative; legal lane not cleared",
            "gates": ["constitutional_lane_open", "admin_valuation", "not_enacted"],
            "not_a_prosperity_engine": True,
        },
    ]


def property_retirement_classes() -> dict:
    return {
        "contractual_blocker_first": {
            "layers": ["school_debt_service", "municipal_bond_portion_inside_municipal"],
            "usd_floor_school_debt": PROPERTY["school_debt_service"],
            "rule": "Cannot safely retire while covenants outstanding — replace dollar-for-dollar or wait",
        },
        "constitutional": {
            "layers": ["school_urt"],
            "usd": PROPERTY["school_urt"],
            "rule": "25-mill URT — amendment/redesign after demonstrated replacement",
        },
        "statutory_local": {
            "layers": ["school_additional_mo", "county", "municipal_general", "special_other"],
            "usd_approx": (
                PROPERTY["school_additional_mo"]
                + PROPERTY["county"]
                + PROPERTY["municipal"]
                + PROPERTY["special_other"]
            ),
            "rule": "Class-by-class after local replacement online; municipal includes bond mills mixed",
        },
    }


def illustrative_engine_path(scenario: str, years: int) -> dict[str, int]:
    """Horizon×scenario illustrative public-income dollars (NOT countable).

    Rough envelopes drawn from prior HYP-131 modeling — deliberately conservative
    about what could become reserved incremental cash if mechanisms are built.
    """
    if years == 0:
        return {k: 0 for k in STACK_ORDER}

    # Shape factors by horizon
    if years <= 4:
        t = 0.25
    elif years <= 8:
        t = 0.55
    else:
        t = 1.0

    if scenario == "STRESS":
        # Little new public capture; fund slow; wealth legal/admin haircut severe; EI weak
        base = {
            "Use": 40_000_000,
            "Impact": 20_000_000,
            "Depletion": 30_000_000,  # tiny incremental beyond spent severance
            "Visitor_Luxury": 40_000_000,
            "Human_capital": 50_000_000,  # net after incidence/credits
            "Value_Capture": 40_000_000,
            "Enterprise": 60_000_000,
            "External_Income": 100_000_000,
            "Prosperity_Fund": 0,  # Conservative path: T250 outside 16y
            "Residual_Wealth_Contribution": int(RW_STRESSED_EFF * 0.005),  # 0.5% stressed base ~$74M
        }
    elif scenario == "BASE":
        base = {
            "Use": 120_000_000,
            "Impact": 80_000_000,
            "Depletion": 100_000_000,  # includes early lithium public-share design path
            "Visitor_Luxury": 100_000_000,
            "Human_capital": 200_000_000,
            "Value_Capture": 150_000_000,
            "Enterprise": 250_000_000,
            "External_Income": 400_000_000,
            "Prosperity_Fund": 0,  # Base path: T250 ~y11 — set below by horizon
            "Residual_Wealth_Contribution": int(RW_BASE_EFF * 0.01),  # 1% on base effective ~$277M
        }
        if years >= 16:
            base["Prosperity_Fund"] = 250_000_000
        elif years >= 12:
            base["Prosperity_Fund"] = 250_000_000
        # years <= 8: still $0 on Base fund path
    else:  # ACCELERATED
        base = {
            "Use": 200_000_000,
            "Impact": 150_000_000,
            "Depletion": 250_000_000,
            "Visitor_Luxury": 180_000_000,
            "Human_capital": 400_000_000,
            "Value_Capture": 350_000_000,
            "Enterprise": 500_000_000,
            "External_Income": 1_000_000_000,
            "Prosperity_Fund": 0,
            "Residual_Wealth_Contribution": int(RW_BASE_EFF * 0.015),  # 1.5% ~$415M
        }
        # Accelerated fund: T250 ~y5, T500 ~y8–10 band, T1000 ~y14 (prior path math)
        if years >= 16:
            base["Prosperity_Fund"] = 1_000_000_000
        elif years >= 8:
            base["Prosperity_Fund"] = 500_000_000
        elif years >= 4:
            base["Prosperity_Fund"] = 250_000_000

    # Scale non-fund engines by horizon factor; fund already horizon-gated
    out = {}
    for k, v in base.items():
        if k == "Prosperity_Fund":
            out[k] = int(v)
        else:
            out[k] = int(round(v * t))
    return out


def allocate_to_gaps(stack_usd: dict[str, int]) -> dict:
    """Apply stack in order; retire IIT first (state), then property classes with blockers."""
    total = sum(stack_usd.values())
    remaining_iit = IIT
    # Property: debt first cannot be retired from "surplus" framing — must be replaced
    debt = PROPERTY["school_debt_service"]
    urt = PROPERTY["school_urt"]
    other_prop = PROPERTY_SUM - debt - urt

    remaining_debt = debt
    remaining_urt = urt
    remaining_other_prop = other_prop

    # Apply total available dollars in priority:
    # 1) Protect/replace debt service (cannot "safely retire" without replacement)
    # 2) IIT (state GR)
    # 3) Other statutory property
    # 4) URT (constitutional — last among property)
    available = total

    to_debt = min(available, remaining_debt)
    remaining_debt -= to_debt
    available -= to_debt

    to_iit = min(available, remaining_iit)
    remaining_iit -= to_iit
    available -= to_iit

    to_other = min(available, remaining_other_prop)
    remaining_other_prop -= to_other
    available -= to_other

    to_urt = min(available, remaining_urt)
    remaining_urt -= to_urt
    available -= to_urt

    iit_retired = IIT - remaining_iit
    prop_retired = PROPERTY_SUM - (remaining_debt + remaining_urt + remaining_other_prop)
    combined_retired = iit_retired + prop_retired

    return {
        "stack_total_usd": total,
        "allocation": {
            "to_debt_service_replacement_usd": to_debt,
            "to_iit_usd": to_iit,
            "to_other_property_usd": to_other,
            "to_urt_usd": to_urt,
            "unallocated_surplus_usd": available,
        },
        "remaining_iit_gap_usd": remaining_iit,
        "remaining_property_gap_usd": remaining_debt + remaining_urt + remaining_other_prop,
        "remaining_property_detail": {
            "debt_service_usd": remaining_debt,
            "urt_usd": remaining_urt,
            "other_statutory_local_usd": remaining_other_prop,
        },
        "taxes_safely_retired_usd": {
            "iit": iit_retired,
            "property": prop_retired,
            "combined": combined_retired,
            "note": (
                "Debt-service dollars are 'replaced' not freely retired; URT only after "
                "constitutional path; all scenario dollars ILLUSTRATIVE_NOT_COUNTED"
            ),
        },
        "taxes_still_required_usd": {
            "iit": remaining_iit,
            "property": remaining_debt + remaining_urt + remaining_other_prop,
            "combined": remaining_iit + remaining_debt + remaining_urt + remaining_other_prop,
        },
        "share_of_combined_retired": round(combined_retired / COMBINED, 4),
        "share_of_iit_retired": round(iit_retired / IIT, 4),
        "share_of_property_retired": round(prop_retired / PROPERTY_SUM, 4),
    }


def hyp132_sensitivity(base_result: dict, scenario: str, years: int) -> dict:
    """Upside multiplier track — do NOT count hypothetical migration as revenue."""
    if years == 0:
        return {
            "status": "NOT_APPLIED_AT_CURRENT",
            "rule": "Do not count hypothetical migration as revenue",
            "uplift_on_stack_total_usd": 0,
        }
    # Illustrative uplift on External Income + Human-capital + Enterprise only
    uplift_rate = {"STRESS": 0.05, "BASE": 0.12, "ACCELERATED": 0.25}[scenario]
    # Apply only to engines most sensitive to population/capital attraction
    sensitive = base_result.get("_sensitive_base", 0)
    uplift = int(round(sensitive * uplift_rate * (years / 16)))
    return {
        "status": "SENSITIVITY_ONLY_NOT_COUNTED",
        "rule": "If Arkansas attracts more working-age families, entrepreneurs, high-income households, businesses and external capital, how does that expand the base?",
        "illustrative_uplift_rate_on_sensitive_engines": uplift_rate,
        "sensitive_engines": ["External_Income", "Human_capital", "Enterprise"],
        "illustrative_uplift_usd": uplift,
        "note": "Not added to countable or to primary scenario totals — scenario analysis only until measured population-attraction model exists (HYP-132)",
    }


def build_matrix() -> list[dict]:
    rows = []
    for hid, label, years in HORIZONS:
        for scenario in SCENARIOS:
            stack = illustrative_engine_path(scenario, years)
            # Cumulative application in declared order (for transparency)
            running = []
            cum = 0
            for name in STACK_ORDER:
                cum += stack[name]
                running.append({"engine": name, "usd": stack[name], "cumulative_usd": cum})
            result = allocate_to_gaps(stack)
            sensitive = stack["External_Income"] + stack["Human_capital"] + stack["Enterprise"]
            sens = hyp132_sensitivity({"_sensitive_base": sensitive}, scenario, years)
            rows.append(
                {
                    "horizon_id": hid,
                    "horizon_label": label,
                    "years": years,
                    "scenario": scenario,
                    "status": "ILLUSTRATIVE_NOT_COUNTED" if years > 0 or cum > 0 else "COUNTABLE_ZERO",
                    "engine_stack_usd": stack,
                    "stack_order_cumulative": running,
                    "integration": result,
                    "hyp132_sensitivity": sens,
                    "reading": _cell_reading(scenario, years, result),
                }
            )
    return rows


def _cell_reading(scenario: str, years: int, result: dict) -> str:
    retired = result["share_of_combined_retired"]
    still = result["taxes_still_required_usd"]["combined"]
    if years == 0:
        return "Current countable capacity $0 — full IIT + property gaps remain; no abolish."
    if retired < 0.15:
        return (
            f"{scenario} @{years}y: illustrative stack covers <15% of ~$7.23B "
            f"(~${result['stack_total_usd']/1e9:.2f}B). Full dual abolition does not appear."
        )
    if retired < 0.40:
        return (
            f"{scenario} @{years}y: partial illustrative coverage (~{retired*100:.0f}%); "
            f"~${still/1e9:.2f}B still required. Debt/URT remain hard. Many small mechanisms — not one swap."
        )
    if retired < 0.70:
        return (
            f"{scenario} @{years}y: material illustrative coverage (~{retired*100:.0f}%) only if "
            f"External Income + Fund + wealth legal/admin all clear — still not full dual abolition."
        )
    return (
        f"{scenario} @{years}y: high illustrative coverage (~{retired*100:.0f}%) — still "
        f"ILLUSTRATIVE_NOT_COUNTED; legal/admin/feeder gates remain."
    )


def main() -> None:
    inventory = engine_inventory()
    assert sum(e["countable_now_usd"] for e in inventory) == 0

    matrix = build_matrix()

    # Key cells for headline
    def cell(h, s):
        return next(r for r in matrix if r["horizon_id"] == h and r["scenario"] == s)

    base16 = cell("H16", "BASE")
    acc16 = cell("H16", "ACCELERATED")
    stress16 = cell("H16", "STRESS")
    acc8 = cell("H8", "ACCELERATED")
    base8 = cell("H8", "BASE")

    end_state = {
        "finding": (
            "The proper end state is unlikely to be one mechanism replacing property tax or IIT. "
            "More resilient: 10–15 smaller public-income mechanisms + productive public wealth + "
            "a narrow residual wealth contribution collectively make ordinary labor and ordinary "
            "homeownership unnecessary tax bases."
        ),
        "not": "Replace one giant tax with another giant tax",
        "implication": (
            "Integration favors diversified FEE/RENT/ROYALTY/RETURN engines and a last-resort "
            "wealth contribution — not a single silver-bullet tax swap"
        ),
    }

    vision_test = {
        "question": "Does the no-income-tax / no-property-tax vision survive full-system integration?",
        "countable_now_answer": "NO — COUNTABLE capacity is $0; full gaps remain; no abolish-today",
        "illustrative_16y_base_answer": (
            f"NO as full dual abolition — Base@16y illustrative stack "
            f"~${base16['integration']['stack_total_usd']/1e9:.2f}B "
            f"(~{base16['integration']['share_of_combined_retired']*100:.0f}% of ~$7.23B); "
            f"~${base16['integration']['taxes_still_required_usd']['combined']/1e9:.2f}B still required"
        ),
        "illustrative_16y_accelerated_answer": (
            f"STILL STRAINED — Accelerated@16y illustrative "
            f"~${acc16['integration']['stack_total_usd']/1e9:.2f}B "
            f"(~{acc16['integration']['share_of_combined_retired']*100:.0f}%); "
            f"requires transformational External Income, Fund payouts, wealth legal clearance, "
            f"and still leaves material gaps especially on property/URT/debt"
        ),
        "what_may_survive": (
            "Partial retirement of ordinary-labor IIT reach and some statutory local property layers "
            "over 8–16 years IF feeders become real cash — debt service and URT remain the hard core"
        ),
    }

    out = {
        "version": "1.0.0",
        "slice_id": SLICE,
        "generated_at": "2026-08-12",
        "decision_id": DEC,
        "update_id": UPD,
        "hypothesis_id": "CC-HYP-PROSPERITY-BASED-REVENUE-REPLACEMENT-SYSTEM",
        "incubator_alias": "HYP-131",
        "status": "REPLACEMENT_STACK_INTEGRATED_ZERO_COUNTABLE",
        "central_question": (
            "Given everything tested so far, what combination of public-income engines, residual "
            "wealth contribution, and long-term prosperity-fund growth can realistically replace "
            "Arkansas personal income tax and property tax — and on what timeline?"
        ),
        "count_rule": (
            "No engine is counted merely because it is philosophically attractive or economically "
            "plausible. COUNTABLE NOW = demonstrated incremental reserved cash only."
        ),
        "stack_order": STACK_ORDER,
        "horizons": [{"id": h, "label": lab, "years": y} for h, lab, y in HORIZONS],
        "scenarios": SCENARIOS,
        "targets_usd": {
            "iit_gross_fy2026": IIT,
            "property_layers": PROPERTY,
            "property_sum": PROPERTY_SUM,
            "combined": COMBINED,
        },
        "property_retirement_classes": property_retirement_classes(),
        "engine_inventory": inventory,
        "countable_now_usd": 0,
        "matrix": matrix,
        "headline_cells": {
            "current_all_scenarios_countable_usd": 0,
            "base_8y": {
                "stack_total_usd": base8["integration"]["stack_total_usd"],
                "share_combined_retired": base8["integration"]["share_of_combined_retired"],
                "still_required_usd": base8["integration"]["taxes_still_required_usd"]["combined"],
            },
            "accelerated_8y": {
                "stack_total_usd": acc8["integration"]["stack_total_usd"],
                "share_combined_retired": acc8["integration"]["share_of_combined_retired"],
                "still_required_usd": acc8["integration"]["taxes_still_required_usd"]["combined"],
            },
            "stress_16y": {
                "stack_total_usd": stress16["integration"]["stack_total_usd"],
                "share_combined_retired": stress16["integration"]["share_of_combined_retired"],
                "still_required_usd": stress16["integration"]["taxes_still_required_usd"]["combined"],
            },
            "base_16y": {
                "stack_total_usd": base16["integration"]["stack_total_usd"],
                "share_combined_retired": base16["integration"]["share_of_combined_retired"],
                "still_required_usd": base16["integration"]["taxes_still_required_usd"]["combined"],
                "remaining_iit_usd": base16["integration"]["remaining_iit_gap_usd"],
                "remaining_property_usd": base16["integration"]["remaining_property_gap_usd"],
            },
            "accelerated_16y": {
                "stack_total_usd": acc16["integration"]["stack_total_usd"],
                "share_combined_retired": acc16["integration"]["share_of_combined_retired"],
                "still_required_usd": acc16["integration"]["taxes_still_required_usd"]["combined"],
                "remaining_iit_usd": acc16["integration"]["remaining_iit_gap_usd"],
                "remaining_property_usd": acc16["integration"]["remaining_property_gap_usd"],
            },
        },
        "hyp132_role": {
            "status": "UPSIDE_MULTIPLIER_SENSITIVITY_ONLY",
            "rule": "Do not count hypothetical migration as revenue",
            "linked_hypothesis": "HYP-132",
            "use": "Scenario analysis until measured Keep/Return/Attract model exists",
        },
        "end_state_architecture": end_state,
        "vision_test": vision_test,
        "political_conclusion": "NONE — no recommendation to abolish IIT or property tax",
        "build_first": [
            "External Income public-capture mechanisms (ownership/participation) — swing variable",
            "Prosperity Fund with real feeders + principal protection",
            "Human-capital design that clears incidence/credit gates",
            "Enterprise/Value Capture participation redesign",
            "Residual wealth legal lane (Am. 57 / realization / amendment)",
            "Property class-by-class: debt covenants first; URT last among property",
            "HYP-132 attraction infrastructure in parallel — not as counted revenue",
        ],
        "next_slice": "CC-ARKANSAS-REPLACEMENT-STACK-FEEDER-BINDING-PASS-1.0",
        "parallel": [
            "CC-ARKANSAS-KEEP-RETURN-ATTRACT-MIGRATION-COMPOSITION-BIND-1.0",
            "CC-PHASE-2.1-BASELINE-DEFINITION-LOCKS-AND-NEXT-LEGITIMATE-FILLS-1.0",
        ],
        "holds": [
            "overall_percent_held_at_43",
            "KEEP_AS_HYPOTHESIS",
            "no_abolish_today",
            "zero_counted_until_cashflow_model",
            "illustrative_is_not_countable",
            "hyp132_sensitivity_not_revenue",
            "debt_service_protected_first",
            "urt_constitutional_hard",
            "many_small_mechanisms_not_one_swap",
            "full_dual_abolition_does_not_survive_base_16y_illustrative",
        ],
    }

    path = OUT / "public_income_replacement_stack_ledger.json"
    path.write_text(json.dumps(out, indent=2) + "\n", encoding="utf-8")
    print(
        json.dumps(
            {
                "path": str(path),
                "countable_now": 0,
                "base_8y_b": round(base8["integration"]["stack_total_usd"] / 1e9, 2),
                "base_16y_b": round(base16["integration"]["stack_total_usd"] / 1e9, 2),
                "base_16y_pct": base16["integration"]["share_of_combined_retired"],
                "acc_16y_b": round(acc16["integration"]["stack_total_usd"] / 1e9, 2),
                "acc_16y_pct": acc16["integration"]["share_of_combined_retired"],
                "stress_16y_b": round(stress16["integration"]["stack_total_usd"] / 1e9, 2),
                "vision": "full_dual_abolition_does_not_survive_base_16y",
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
