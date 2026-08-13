#!/usr/bin/env python3
"""Replacement Stack Feeder Binding Pass (HYP-131).

Question: Which illustrative Replacement Stack envelopes can be challenged,
demoted, or promoted by binding real feeder cash-flow candidates?

Discipline: fewer new architectures; more evidence under architectures already built.
COUNTABLE NOW stays $0 unless incremental reserved cash clears. Promote only with
evidence-backed mechanisms — never philosophical attractiveness.
"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "imports" / "arkansas-revenue-replacement"
OUT.mkdir(parents=True, exist_ok=True)

SLICE = "CC-ARKANSAS-REPLACEMENT-STACK-FEEDER-BINDING-PASS-1.0"
DEC, UPD = "CC-DEC-140", "UPD-153"
COMBINED = 7_231_905_638
IIT = 3_859_100_000
PROPERTY_SUM = 3_372_805_638

# Stack envelopes at maturity (16y) from CC-DEC-137 — pre-demotion
STACK_BASE_16Y = {
    "Use": 120_000_000,
    "Impact": 80_000_000,
    "Depletion": 100_000_000,
    "Visitor_Luxury": 100_000_000,
    "Human_capital": 200_000_000,
    "Value_Capture": 150_000_000,
    "Enterprise": 250_000_000,
    "External_Income": 400_000_000,
    "Prosperity_Fund": 250_000_000,
    "Residual_Wealth_Contribution": 276_986_729,
}
STACK_ACC_16Y = {
    "Use": 200_000_000,
    "Impact": 150_000_000,
    "Depletion": 250_000_000,
    "Visitor_Luxury": 180_000_000,
    "Human_capital": 400_000_000,
    "Value_Capture": 350_000_000,
    "Enterprise": 500_000_000,
    "External_Income": 1_000_000_000,
    "Prosperity_Fund": 1_000_000_000,
    "Residual_Wealth_Contribution": 415_480_093,
}
STACK_STRESS_16Y = {
    "Use": 40_000_000,
    "Impact": 20_000_000,
    "Depletion": 30_000_000,
    "Visitor_Luxury": 40_000_000,
    "Human_capital": 50_000_000,
    "Value_Capture": 40_000_000,
    "Enterprise": 60_000_000,
    "External_Income": 100_000_000,
    "Prosperity_Fund": 0,
    "Residual_Wealth_Contribution": 74_068_922,
}

ORDER = list(STACK_BASE_16Y.keys())


def score_engines() -> list[dict]:
    """Score each stack engine against prior bound evidence."""
    return [
        {
            "engine": "Use",
            "prior_slice": "CC-ARKANSAS-PUBLIC-INCOME-ENGINE-USE-AND-DEPLETION-CASHFLOWS-1.0",
            "bound_scale": {
                "motor_fuel_fy2026_usd": 571_758_870,
                "status": "BOUND_ALREADY_SPENT_HIGHWAYS",
            },
            "grounding": "ALREADY_SPENT_NOT_INCREMENTAL",
            "countable_now_usd": 0,
            "stack_base_16y_usd": STACK_BASE_16Y["Use"],
            "stack_acc_16y_usd": STACK_ACC_16Y["Use"],
            "action": "DEMOTE",
            "evidence_grounded_ceiling_base_16y_usd": 30_000_000,
            "evidence_grounded_ceiling_acc_16y_usd": 50_000_000,
            "rationale": "Fuel ~$572M is real and highway-earmarked. Stack Use envelopes imply incremental redesign that is still unmodeled — demote to thin research ceiling until a free incremental use stream is designed and reserved.",
            "next_evidence": "Incremental use redesign cash-flow (not highway raid)",
        },
        {
            "engine": "Impact",
            "prior_slice": "CC-ARKANSAS-PUBLIC-INCOME-ENGINE-MODEL-1.0",
            "bound_scale": None,
            "grounding": "UNMODELED_NO_CASHFLOW",
            "countable_now_usd": 0,
            "stack_base_16y_usd": STACK_BASE_16Y["Impact"],
            "stack_acc_16y_usd": STACK_ACC_16Y["Impact"],
            "action": "DEMOTE",
            "evidence_grounded_ceiling_base_16y_usd": 0,
            "evidence_grounded_ceiling_acc_16y_usd": 0,
            "rationale": "No Arkansas carbon/externality cash-flow model. Philosophical attractiveness ≠ revenue. Demote envelopes to $0 until a mechanism is cash-flowed.",
            "next_evidence": "Externality pricing addressable-base → incremental-recurring schema",
        },
        {
            "engine": "Depletion",
            "prior_slice": "CC-ARKANSAS-PUBLIC-INCOME-ENGINE-USE-AND-DEPLETION-CASHFLOWS-1.0",
            "bound_scale": {
                "natural_gas_severance_fy2026_usd": 25_615_616,
                "oil_revenue_fy2026_usd": 12_176_540,
                "status": "BOUND_MOSTLY_SPENT_OR_VOLATILE",
            },
            "grounding": "SCALE_PARTIAL_MECHANISM_FUTURE",
            "countable_now_usd": 0,
            "stack_base_16y_usd": STACK_BASE_16Y["Depletion"],
            "stack_acc_16y_usd": STACK_ACC_16Y["Depletion"],
            "action": "DEMOTE_HOLD_LITHIUM_RESEARCH",
            "evidence_grounded_ceiling_base_16y_usd": 40_000_000,
            "evidence_grounded_ceiling_acc_16y_usd": 80_000_000,
            "rationale": "Gas/oil severance real but mostly highway-dedicated / volatile. Lithium public-share remains post-2028 design — not cash. Demote Acc $250M; keep thin research ceiling for early public-share path.",
            "next_evidence": "Lithium public-share / permanent-fund design with production schedule",
        },
        {
            "engine": "Visitor_Luxury",
            "prior_slice": "CC-ARKANSAS-EXTERNAL-INCOME-SECTOR-CAPTURE-1.0",
            "bound_scale": {
                "tourism_visitor_spending_2025_usd": 10_200_000_000,
                "tourism_2pct_tax_fy2026_usd": 26_851_526,
                "status": "SPEND_BOUND_TAX_ALREADY_SPENT",
            },
            "grounding": "SCALE_BOUND_MECHANISM_SPENT_OR_UNMODELED",
            "countable_now_usd": 0,
            "stack_base_16y_usd": STACK_BASE_16Y["Visitor_Luxury"],
            "stack_acc_16y_usd": STACK_ACC_16Y["Visitor_Luxury"],
            "action": "DEMOTE",
            "evidence_grounded_ceiling_base_16y_usd": 25_000_000,
            "evidence_grounded_ceiling_acc_16y_usd": 40_000_000,
            "rationale": "Visitor spend ~$10.2B is outside-demand scale. Existing 2% tourism tax ~$26.9M is already spent on marketing. Luxury redesign unmodeled; broad sales swap is regressive risk. Demote stack envelopes.",
            "next_evidence": "Incremental visitor/luxury mechanism with reserved cash (not marketing raid)",
        },
        {
            "engine": "Human_capital",
            "prior_slice": "CC-ARKANSAS-WORKFORCE-PROSPERITY-CONTRIBUTION-INCIDENCE-1.0",
            "bound_scale": {
                "qcew_private_wages_2024_usd": 64_458_593_075,
                "cit_gross_fy2026_usd": 523_600_000,
                "status": "WAGE_SCALE_BOUND_CIT_ALREADY_SPENT",
            },
            "grounding": "SCALE_BOUND_INCIDENCE_LEGAL_OPEN",
            "countable_now_usd": 0,
            "stack_base_16y_usd": STACK_BASE_16Y["Human_capital"],
            "stack_acc_16y_usd": STACK_ACC_16Y["Human_capital"],
            "action": "HOLD_ILLUSTRATIVE_GATED",
            "evidence_grounded_ceiling_base_16y_usd": 150_000_000,
            "evidence_grounded_ceiling_acc_16y_usd": 250_000_000,
            "rationale": "Wage envelope is real; CIT ~$524M already spent. Net-new WPC after incidence/credits remains unproven. Soft-demote Acc $400M; hold Base nearer illustrative net after leakage.",
            "next_evidence": "Size-class payroll share + Arkansas incidence microsim + credit leakage",
        },
        {
            "engine": "Value_Capture",
            "prior_slice": "CC-ARKANSAS-PUBLIC-INCOME-ENGINE-VALUE-CAPTURE-AND-ENTERPRISE-1.0",
            "bound_scale": {"status": "CANDIDATES_PLEDGED_OR_UNSUITABLE"},
            "grounding": "UNMODELED_REDESIGN_REQUIRED",
            "countable_now_usd": 0,
            "stack_base_16y_usd": STACK_BASE_16Y["Value_Capture"],
            "stack_acc_16y_usd": STACK_ACC_16Y["Value_Capture"],
            "action": "DEMOTE",
            "evidence_grounded_ceiling_base_16y_usd": 40_000_000,
            "evidence_grounded_ceiling_acc_16y_usd": 75_000_000,
            "rationale": "TIF/airports/conduit pledged or unsuitable. Participation redesign unmodeled. Demote Acc $350M / Base $150M to thin research ceilings.",
            "next_evidence": "Participation / ground-lease / public-land development net cash survey",
        },
        {
            "engine": "Enterprise",
            "prior_slice": "CC-ARKANSAS-PUBLIC-INCOME-ENGINE-VALUE-CAPTURE-AND-ENTERPRISE-1.0",
            "bound_scale": {"status": "STRATEGIC_ZERO_COUNTABLE"},
            "grounding": "UNMODELED_PUBLIC_RISK_AT_RISK",
            "countable_now_usd": 0,
            "stack_base_16y_usd": STACK_BASE_16Y["Enterprise"],
            "stack_acc_16y_usd": STACK_ACC_16Y["Enterprise"],
            "action": "DEMOTE",
            "evidence_grounded_ceiling_base_16y_usd": 75_000_000,
            "evidence_grounded_ceiling_acc_16y_usd": 125_000_000,
            "rationale": "Energy/broadband/IP/participation strategically central but $0 after cash-flow + stress gates. Demote Acc $500M; keep research ceiling only.",
            "next_evidence": "Audited free-cash enterprise candidates with PUBLIC_RISK_AT_RISK",
        },
        {
            "engine": "External_Income",
            "prior_slice": "CC-ARKANSAS-EXTERNAL-INCOME-SECTOR-CAPTURE-1.0",
            "bound_scale": {
                "tourism_visitor_spending_2025_usd": 10_200_000_000,
                "manufacturing_gdp_2023_usd": 25_898_000_000,
                "ag_forestry_fishing_gdp_2023_usd": 2_855_000_000,
                "status": "OUTSIDE_DEMAND_BOUND_PUBLIC_CAPTURE_ZERO",
            },
            "grounding": "SWING_VARIABLE_HARD_WALL",
            "countable_now_usd": 0,
            "stack_base_16y_usd": STACK_BASE_16Y["External_Income"],
            "stack_acc_16y_usd": STACK_ACC_16Y["External_Income"],
            "action": "DEMOTE_HARD",
            "evidence_grounded_ceiling_base_16y_usd": 100_000_000,
            "evidence_grounded_ceiling_acc_16y_usd": 200_000_000,
            "rationale": "Swing variable: outside demand is real; public capture mechanisms are not. Acc $1B and Base $400M assume ownership/participation that does not exist. Hard demote until a sector clears the hard wall to reserved public cash. Food-processing / energy participation remain top research priorities.",
            "next_evidence": "Sector capture mechanism with royalty/lease/participation → reserved cash (food processing, energy first)",
        },
        {
            "engine": "Prosperity_Fund",
            "prior_slice": "CC-ARKANSAS-PROSPERITY-FUND-CAPITAL-PATH-1.0",
            "bound_scale": {
                "t250_corpus_at_4pct_usd": 6_250_000_000,
                "fund_exists": False,
                "feeder_status": "ILLUSTRATIVE_OR_UNMODELED",
            },
            "grounding": "PATH_MODELED_FEEDERS_NOT_BOUND",
            "countable_now_usd": 0,
            "stack_base_16y_usd": STACK_BASE_16Y["Prosperity_Fund"],
            "stack_acc_16y_usd": STACK_ACC_16Y["Prosperity_Fund"],
            "action": "DEMOTE_ACC_HOLD_BASE_CONDITIONAL",
            "evidence_grounded_ceiling_base_16y_usd": 100_000_000,
            "evidence_grounded_ceiling_acc_16y_usd": 250_000_000,
            "rationale": "Corpus math is honest; fund does not exist; feeders are illustrative. Acc $1B payout implies transformational External Income / participation feeders that failed hard-wall this pass. Soft-hold Base only as conditional research (well below T250) until feeders bind.",
            "next_evidence": "Real feeder commitments + principal-protection design; no obligation raids",
        },
        {
            "engine": "Residual_Wealth_Contribution",
            "prior_slice": "CC-ARKANSAS-RESIDUAL-WEALTH-CONTRIBUTION-NO-LOOPHOLES-BASE-AND-LEGAL-TEST-1.0",
            "bound_scale": {
                "irs_top_wealth_holders": 2374,
                "irs_top_nw_usd": 48_532_391_000,
                "base_effective_usd": 27_698_672_926,
                "status": "EFFECTIVE_BASE_ILLUSTRATIVE_LEGAL_OPEN",
            },
            "grounding": "EFFECTIVE_BASE_MODELED_NOT_ENACTED",
            "countable_now_usd": 0,
            "stack_base_16y_usd": STACK_BASE_16Y["Residual_Wealth_Contribution"],
            "stack_acc_16y_usd": STACK_ACC_16Y["Residual_Wealth_Contribution"],
            "action": "HOLD_ILLUSTRATIVE_LEGAL_GATED",
            "evidence_grounded_ceiling_base_16y_usd": 276_986_729,
            "evidence_grounded_ceiling_acc_16y_usd": 276_986_729,
            "rationale": "Effective-base haircut (~57% → ~$27.7B; 1%≈$277M) is the honest research ceiling. Acc 1.5% assumes legal/admin clearance not earned. Cap Acc at Base 1% until constitutional lane clears. Still $0 countable — not enacted.",
            "next_evidence": "Constitutional memorandum (Am. 57 / realization / amendment) + admin valuation design",
        },
    ]


def totals(d: dict[str, int]) -> dict:
    t = sum(d.values())
    return {
        "stack_total_usd": t,
        "share_of_combined": round(t / COMBINED, 4),
        "still_required_usd": COMBINED - t,
    }


def main() -> None:
    scores = score_engines()

    demoted_base = {s["engine"]: s["evidence_grounded_ceiling_base_16y_usd"] for s in scores}
    demoted_acc = {s["engine"]: s["evidence_grounded_ceiling_acc_16y_usd"] for s in scores}

    pre_base = sum(STACK_BASE_16Y.values())
    pre_acc = sum(STACK_ACC_16Y.values())
    post_base = sum(demoted_base.values())
    post_acc = sum(demoted_acc.values())

    actions = {}
    for s in scores:
        actions.setdefault(s["action"], []).append(s["engine"])

    discipline = {
        "statement": "Fewer new architectures; more evidence underneath the architectures already built.",
        "hyp133_posture": "Do not expand HYP-133 further until empirical Demand Map pass",
        "main_lane": SLICE,
        "structural_parallel": "CC-PHASE-2.1-BASELINE-DEFINITION-LOCKS-AND-NEXT-LEGITIMATE-FILLS-1.0",
        "causality_chain": {
            "HYP-130": "What does Arkansas need?",
            "HYP-133": "How do we create that human capability?",
            "HYP-129": "How do we prove the system locally?",
            "HYP-132": "How do we retain and attract the people/capital it creates?",
            "HYP-131": "How does the resulting prosperity become sustainable public income?",
        },
        "earning_chain_hyp133": "Arkansas need → educational capacity → legally viable investment compact → delivery network → implementation pathway",
    }

    ledger = {
        "version": "1.0.0",
        "slice_id": SLICE,
        "generated_at": "2026-08-12",
        "decision_id": DEC,
        "update_id": UPD,
        "hypothesis_id": "CC-HYP-PROSPERITY-BASED-REVENUE-REPLACEMENT-SYSTEM",
        "incubator_alias": "HYP-131",
        "status": "FEEDER_BINDING_ZERO_COUNTABLE_ENVELOPES_DEMOTED",
        "central_question": "Which illustrative Replacement Stack envelopes can be challenged, demoted, or promoted by binding real feeder cash-flow candidates?",
        "count_rule": "Refuse to invent countable dollars; promote only evidence-backed incremental reserved cash. COUNTABLE NOW = demonstrated incremental reserved cash only.",
        "discipline": discipline,
        "targets_usd": {
            "iit_gross_fy2026": IIT,
            "property_sum": PROPERTY_SUM,
            "combined": COMBINED,
        },
        "prior_stack_slice": "CC-ARKANSAS-PUBLIC-INCOME-REPLACEMENT-STACK-1.0",
        "prior_stack_decision": "CC-DEC-137",
        "prior_stack_headline": {
            "base_16y_usd": pre_base,
            "base_16y_share": round(pre_base / COMBINED, 4),
            "accelerated_16y_usd": pre_acc,
            "accelerated_16y_share": round(pre_acc / COMBINED, 4),
            "stress_16y_usd": sum(STACK_STRESS_16Y.values()),
        },
        "engine_feeder_scores": scores,
        "action_summary": actions,
        "countable_now_usd": 0,
        "promoted_to_countable": [],
        "evidence_grounded_illustrative_ceilings_16y": {
            "note": "Not countable. Soft ceilings after demoting envelopes that lack bound mechanisms. Still ILLUSTRATIVE_NOT_COUNTED.",
            "BASE": demoted_base,
            "ACCELERATED": demoted_acc,
            "BASE_totals": totals(demoted_base),
            "ACCELERATED_totals": totals(demoted_acc),
        },
        "vision_test_after_feeder_binding": {
            "countable_now": "NO — still $0",
            "prior_base_16y_illustrative": f"~{pre_base/1e9:.2f}B (~{100*pre_base/COMBINED:.1f}%)",
            "demoted_base_16y_ceiling": f"~{post_base/1e9:.2f}B (~{100*post_base/COMBINED:.1f}%)",
            "prior_acc_16y_illustrative": f"~{pre_acc/1e9:.2f}B (~{100*pre_acc/COMBINED:.1f}%)",
            "demoted_acc_16y_ceiling": f"~{post_acc/1e9:.2f}B (~{100*post_acc/COMBINED:.1f}%)",
            "reading": "Evidence demotion shrinks Accelerated fantasy most (External Income + Fund). Dual abolition still fails. Many small mechanisms remain the end-state architecture — but most still lack feeders.",
        },
        "hard_findings": [
            "No engine promoted to COUNTABLE NOW",
            "External Income remains the swing variable and the largest demotion (Acc $1B → $200M research ceiling)",
            "Prosperity Fund Acc $1B demoted — feeders not bound; fund does not exist",
            "Already-spent streams (fuel, tourism tax, CIT, highway severance) cannot fill Use/Visitor/Human-capital envelopes",
            "Impact demoted to $0 — unmodeled",
            "Residual wealth Acc capped at Base 1% effective (~$277M) until legal lane clears",
            "Dual abolition still fails after demotion — demoted Acc ceiling still << $7.23B",
        ],
        "build_next_evidence": [
            "External Income capture mechanism (food processing / energy participation) with reserved cash",
            "Lithium public-share design with production schedule",
            "Enterprise/Value Capture audited free-cash candidates",
            "WPC incidence microsim + credit leakage",
            "Residual wealth constitutional memorandum",
            "Prosperity Fund feeder commitments (no obligation raids)",
        ],
        "parallel": [
            "CC-PHASE-2.1-BASELINE-DEFINITION-LOCKS-AND-NEXT-LEGITIMATE-FILLS-1.0",
            "CC-ARKANSAS-KEEP-RETURN-ATTRACT-MIGRATION-COMPOSITION-BIND-1.0",
        ],
        "hyp133_note": "Do not expand HYP-133; empirical Demand Map remains queued parallel — not this lane",
        "holds": [
            "overall_percent_held_at_43",
            "KEEP_AS_HYPOTHESIS",
            "no_abolish_today",
            "zero_counted_until_cashflow_model",
            "illustrative_is_not_countable",
            "fewer_new_architectures_more_evidence",
            "no_promotion_without_incremental_reserved_cash",
            "external_income_hard_wall",
            "no_raid_existing_obligations",
            "dual_abolition_still_fails_after_demotion",
        ],
        "next_slice": "CC-ARKANSAS-EXTERNAL-INCOME-CAPTURE-MECHANISM-BIND-1.0",
    }

    path = OUT / "replacement_stack_feeder_binding_ledger.json"
    path.write_text(json.dumps(ledger, indent=2) + "\n", encoding="utf-8")
    print(
        json.dumps(
            {
                "path": str(path),
                "countable_now": 0,
                "pre_base_16y_b": round(pre_base / 1e9, 2),
                "post_base_16y_b": round(post_base / 1e9, 2),
                "pre_acc_16y_b": round(pre_acc / 1e9, 2),
                "post_acc_16y_b": round(post_acc / 1e9, 2),
                "promoted": 0,
            }
        )
    )


if __name__ == "__main__":
    main()
