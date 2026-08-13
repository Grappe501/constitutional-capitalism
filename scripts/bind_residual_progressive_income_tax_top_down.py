#!/usr/bin/env python3
"""Residual Progressive Income Tax — top-down model (HYP-131 shock absorber).

Binds IRS SOI Historic Table 2 (TY2022 Arkansas), models revenue from the highest
AGI bands downward under marginal schedules, and maps residual gaps of
$250M–$3B to how far down the distribution the tax must reach.

COUNTABLE prosperity-engine dollars remain $0. This slice designs the residual
shock absorber, not a claim that residual IIT is a prosperity engine.
"""

from __future__ import annotations

import json
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "imports" / "arkansas-revenue-replacement"
OUT.mkdir(parents=True, exist_ok=True)
LOCAL_XLSX = ROOT / ".local" / "downloads" / "revenue-replacement" / "22in04ar.xlsx"

SLICE = "CC-ARKANSAS-RESIDUAL-PROGRESSIVE-INCOME-TAX-TOP-DOWN-MODEL-1.0"
DEC, UPD = "CC-DEC-132", "UPD-145"
IIT_GROSS_FY2026 = 3_859_100_000
COMBINED_TARGET = 7_231_905_638
CURRENT_TOP_RATE = 0.037  # Act 2 / SB1 special session — TY2026

SOI_URL = "https://www.irs.gov/pub/irs-soi/22in04ar.xlsx"
SOI_TAX_YEAR = 2022

# Column indices in 22in04ar.xlsx row layout (1=All ... 11=$1M+)
BRACKETS = [
    {"id": "UNDER_1", "label": "Under $1", "lo": None, "hi": 1, "col": 2},
    {"id": "1_10K", "label": "$1 under $10,000", "lo": 1, "hi": 10_000, "col": 3},
    {"id": "10_25K", "label": "$10,000 under $25,000", "lo": 10_000, "hi": 25_000, "col": 4},
    {"id": "25_50K", "label": "$25,000 under $50,000", "lo": 25_000, "hi": 50_000, "col": 5},
    {"id": "50_75K", "label": "$50,000 under $75,000", "lo": 50_000, "hi": 75_000, "col": 6},
    {"id": "75_100K", "label": "$75,000 under $100,000", "lo": 75_000, "hi": 100_000, "col": 7},
    {"id": "100_200K", "label": "$100,000 under $200,000", "lo": 100_000, "hi": 200_000, "col": 8},
    {"id": "200_500K", "label": "$200,000 under $500,000", "lo": 200_000, "hi": 500_000, "col": 9},
    {"id": "500K_1M", "label": "$500,000 under $1,000,000", "lo": 500_000, "hi": 1_000_000, "col": 10},
    {"id": "1M_PLUS", "label": "$1,000,000 or more", "lo": 1_000_000, "hi": None, "col": 11},
]

# Top-down stacking order (highest first)
TOP_DOWN_IDS = ["1M_PLUS", "500K_1M", "200_500K", "100_200K", "75_100K", "50_75K", "25_50K"]

RESIDUAL_GAPS = [
    ("G250", 250_000_000),
    ("G500", 500_000_000),
    ("G1000", 1_000_000_000),
    ("G2000", 2_000_000_000),
    ("G3000", 3_000_000_000),
]


def _k_to_usd(thousands) -> int:
    if pd.isna(thousands):
        return 0
    return int(round(float(thousands) * 1_000))


def load_soi() -> dict:
    if not LOCAL_XLSX.exists():
        import urllib.request

        LOCAL_XLSX.parent.mkdir(parents=True, exist_ok=True)
        LOCAL_XLSX.write_bytes(urllib.request.urlopen(SOI_URL, timeout=120).read())

    df = pd.read_excel(LOCAL_XLSX, header=None)

    def row_vals(r: int):
        return [_k_to_usd(df.iloc[r, b["col"]]) if r != 8 else int(df.iloc[r, b["col"]]) for b in BRACKETS]

    # Row 8 is counts (not in thousands)
    n_returns = [int(df.iloc[8, b["col"]]) for b in BRACKETS]
    agi = row_vals(25)
    wages = row_vals(29)
    biz = row_vals(41)
    capgain = row_vals(43)
    passthrough = row_vals(54)
    taxable_income = row_vals(106)
    fed_tax_before_credits = row_vals(108)

    bands = []
    for i, b in enumerate(BRACKETS):
        ti = taxable_income[i]
        w = wages[i]
        cg = capgain[i]
        pt = passthrough[i]
        ag = agi[i]
        labor_share = (w / ag) if ag > 0 else None
        rentish = cg + max(pt, 0)
        rent_share = (rentish / ag) if ag > 0 else None
        bands.append(
            {
                "id": b["id"],
                "label": b["label"],
                "agi_lo": b["lo"],
                "agi_hi": b["hi"],
                "returns": n_returns[i],
                "agi_usd": ag,
                "taxable_income_usd": ti,
                "salaries_wages_usd": w,
                "business_net_usd": biz[i],
                "net_capital_gain_usd": cg,
                "partnership_scorp_net_usd": pt,
                "federal_income_tax_before_credits_usd": fed_tax_before_credits[i],
                "salaries_share_of_agi": round(labor_share, 4) if labor_share is not None else None,
                "capital_gain_plus_passthrough_share_of_agi": round(rent_share, 4)
                if rent_share is not None
                else None,
            }
        )

    totals = {
        "returns": int(df.iloc[8, 1]),
        "agi_usd": _k_to_usd(df.iloc[25, 1]),
        "taxable_income_usd": _k_to_usd(df.iloc[106, 1]),
        "salaries_wages_usd": _k_to_usd(df.iloc[29, 1]),
        "net_capital_gain_usd": _k_to_usd(df.iloc[43, 1]),
        "partnership_scorp_net_usd": _k_to_usd(df.iloc[54, 1]),
    }
    return {
        "source_url": SOI_URL,
        "tax_year": SOI_TAX_YEAR,
        "units_note": "SOI money amounts published in thousands; converted to USD",
        "totals": totals,
        "bands": bands,
        "finer_than_1m_split_status": "NEE — IRS Historic Table 2 top band is $1M+; $2M/$5M splits not locked",
    }


def band_map(soi: dict) -> dict[str, dict]:
    return {b["id"]: b for b in soi["bands"]}


def cumulative_from_top(bm: dict[str, dict], through_id: str) -> dict:
    ids = []
    for bid in TOP_DOWN_IDS:
        ids.append(bid)
        if bid == through_id:
            break
    returns = sum(bm[i]["returns"] for i in ids)
    ti = sum(bm[i]["taxable_income_usd"] for i in ids)
    agi = sum(bm[i]["agi_usd"] for i in ids)
    wages = sum(bm[i]["salaries_wages_usd"] for i in ids)
    cg = sum(bm[i]["net_capital_gain_usd"] for i in ids)
    pt = sum(bm[i]["partnership_scorp_net_usd"] for i in ids)
    return {
        "through_band_id": through_id,
        "threshold_agi_usd": bm[through_id]["agi_lo"],
        "bands_included": ids,
        "returns": returns,
        "share_of_all_returns": round(returns / 1_295_860, 4),
        "taxable_income_usd": ti,
        "agi_usd": agi,
        "salaries_wages_usd": wages,
        "net_capital_gain_usd": cg,
        "partnership_scorp_net_usd": pt,
        "salaries_share_of_agi": round(wages / agi, 4) if agi else None,
        "capital_gain_plus_passthrough_share_of_agi": round((cg + max(pt, 0)) / agi, 4)
        if agi
        else None,
    }


def rate_needed(taxable_income: int, gap: int) -> float | None:
    if taxable_income <= 0:
        return None
    return gap / taxable_income


def revenue_at_rate(taxable_income: int, rate: float) -> int:
    return int(round(taxable_income * rate))


def top_down_gap_solutions(bm: dict[str, dict]) -> list[dict]:
    """For each residual gap, show rate needed at each cumulative top threshold."""
    out = []
    for gid, gap in RESIDUAL_GAPS:
        layers = []
        for bid in TOP_DOWN_IDS:
            cum = cumulative_from_top(bm, bid)
            rn = rate_needed(cum["taxable_income_usd"], gap)
            layers.append(
                {
                    **cum,
                    "residual_gap_usd": gap,
                    "flat_marginal_rate_needed_on_taxable_income_above_threshold": (
                        round(rn, 4) if rn is not None else None
                    ),
                    "rate_needed_percent": round(rn * 100, 2) if rn is not None else None,
                    "feasible_vs_current_top_3_7pct": bool(rn is not None and rn <= CURRENT_TOP_RATE),
                    "feasible_vs_8pct_illustrative": bool(rn is not None and rn <= 0.08),
                    "feasible_vs_10pct_illustrative": bool(rn is not None and rn <= 0.10),
                    "revenue_at_3_7pct_usd": revenue_at_rate(cum["taxable_income_usd"], CURRENT_TOP_RATE),
                    "revenue_at_8pct_usd": revenue_at_rate(cum["taxable_income_usd"], 0.08),
                    "revenue_at_10pct_usd": revenue_at_rate(cum["taxable_income_usd"], 0.10),
                    "note": (
                        "Flat marginal rate on all taxable income in included bands — "
                        "approximates exempting returns below band floor; within-band cliffs avoided by design rule"
                    ),
                }
            )
        # Prefer shallowest reach (fewest bands) that is feasible at <=8% then <=10% then any
        pick_8 = next((L for L in layers if L["feasible_vs_8pct_illustrative"]), None)
        pick_10 = next((L for L in layers if L["feasible_vs_10pct_illustrative"]), None)
        pick_37 = next((L for L in layers if L["feasible_vs_current_top_3_7pct"]), None)
        out.append(
            {
                "gap_id": gid,
                "residual_gap_usd": gap,
                "share_of_current_iit_gross": round(gap / IIT_GROSS_FY2026, 4),
                "implied_other_engines_covering_of_iit": IIT_GROSS_FY2026 - gap,
                "preferred_at_le_3_7pct": pick_37,
                "preferred_at_le_8pct": pick_8,
                "preferred_at_le_10pct": pick_10,
                "layers": layers,
            }
        )
    return out


def schedule_package(bm: dict[str, dict]) -> list[dict]:
    """Illustrative graduated top-down packages (marginal by band, not locked)."""
    packages = [
        {
            "id": "SCHED-TOP-ONLY-8",
            "label": "8% only on $1M+ taxable income; all below exempt",
            "band_rates": {"1M_PLUS": 0.08},
        },
        {
            "id": "SCHED-TOP-TWO-6-8",
            "label": "8% on $1M+; 6% on $500k–$1M; below exempt",
            "band_rates": {"1M_PLUS": 0.08, "500K_1M": 0.06},
        },
        {
            "id": "SCHED-TOP-THREE-4-6-8",
            "label": "8% on $1M+; 6% on $500k–$1M; 4% on $200k–$500k; below exempt",
            "band_rates": {"1M_PLUS": 0.08, "500K_1M": 0.06, "200_500K": 0.04},
        },
        {
            "id": "SCHED-MIRROR-3_7-FROM-200K",
            "label": "Current top rate 3.7% from $200k+; below exempt",
            "band_rates": {
                "1M_PLUS": CURRENT_TOP_RATE,
                "500K_1M": CURRENT_TOP_RATE,
                "200_500K": CURRENT_TOP_RATE,
            },
        },
        {
            "id": "SCHED-MIRROR-3_7-FROM-100K",
            "label": "Current top rate 3.7% from $100k+; below exempt",
            "band_rates": {
                "1M_PLUS": CURRENT_TOP_RATE,
                "500K_1M": CURRENT_TOP_RATE,
                "200_500K": CURRENT_TOP_RATE,
                "100_200K": CURRENT_TOP_RATE,
            },
        },
    ]
    out = []
    for p in packages:
        rev = 0
        detail = []
        returns = 0
        for bid, rate in p["band_rates"].items():
            ti = bm[bid]["taxable_income_usd"]
            r = revenue_at_rate(ti, rate)
            rev += r
            returns += bm[bid]["returns"]
            detail.append(
                {
                    "band_id": bid,
                    "marginal_rate": rate,
                    "taxable_income_usd": ti,
                    "revenue_usd": r,
                    "returns": bm[bid]["returns"],
                }
            )
        out.append(
            {
                **p,
                "status": "ILLUSTRATIVE_NOT_LOCKED",
                "estimated_revenue_usd": rev,
                "returns_touched": returns,
                "share_of_current_iit_gross": round(rev / IIT_GROSS_FY2026, 4),
                "detail": detail,
                "gaps_fully_covered": [gid for gid, g in RESIDUAL_GAPS if rev >= g],
                "design_rule": "Marginal by band — income in lower exempt bands unpaid; no whole-return cliff by statute design",
            }
        )
    return out


def migration_stress(bm: dict[str, dict]) -> list[dict]:
    """Sensitivity: shrink top taxable bases by 10%/25% (avoidance/migration)."""
    top = cumulative_from_top(bm, "1M_PLUS")
    top2 = cumulative_from_top(bm, "500K_1M")
    rows = []
    for label, base in [("1M_PLUS", top), ("500K_PLUS", top2)]:
        for shrink in (0.0, 0.10, 0.25):
            ti = int(round(base["taxable_income_usd"] * (1 - shrink)))
            rows.append(
                {
                    "base": label,
                    "base_shrink": shrink,
                    "taxable_income_usd": ti,
                    "revenue_at_3_7pct_usd": revenue_at_rate(ti, CURRENT_TOP_RATE),
                    "revenue_at_8pct_usd": revenue_at_rate(ti, 0.08),
                    "revenue_at_10pct_usd": revenue_at_rate(ti, 0.10),
                    "note": "ILLUSTRATIVE elasticity — not an Arkansas migration study",
                }
            )
    return rows


def starting_point_table(solutions: list[dict]) -> list[dict]:
    """Answer: if other engines produce X, how high can the starting point be?"""
    rows = []
    for sol in solutions:
        gap = sol["residual_gap_usd"]
        other = IIT_GROSS_FY2026 - gap
        pref = sol["preferred_at_le_8pct"] or sol["preferred_at_le_10pct"] or sol["layers"][-1]
        rows.append(
            {
                "if_other_engines_cover_usd": other,
                "residual_gap_usd": gap,
                "illustrative_starting_agi_threshold_usd": pref["threshold_agi_usd"],
                "bands_reached": pref["bands_included"],
                "flat_rate_needed_on_included_taxable_income": pref[
                    "flat_marginal_rate_needed_on_taxable_income_above_threshold"
                ],
                "returns_affected": pref["returns"],
                "share_of_returns_affected": pref["share_of_all_returns"],
                "labor_salary_share_of_agi_in_included_bands": pref["salaries_share_of_agi"],
                "capital_passthrough_share_of_agi_in_included_bands": pref[
                    "capital_gain_plus_passthrough_share_of_agi"
                ],
                "feasible_at_le_8pct": sol["preferred_at_le_8pct"] is not None,
                "feasible_at_le_3_7pct": sol["preferred_at_le_3_7pct"] is not None,
            }
        )
    return rows


def main() -> None:
    soi = load_soi()
    bm = band_map(soi)
    solutions = top_down_gap_solutions(bm)
    schedules = schedule_package(bm)
    stress = migration_stress(bm)
    starting = starting_point_table(solutions)

    # Labor vs capital at top
    top = bm["1M_PLUS"]
    top2 = cumulative_from_top(bm, "500K_1M")

    philosophy = {
        "name": "Residual Progressive Income Tax",
        "role": "Shock absorber — last revenue source activated after other public-income engines",
        "activation_order": (
            "Prosperity revenues first → residual gap calculated → tax begins at highest income tier "
            "→ marginal rates at the top → lower-income tiers exempt → taxable boundary moves downward "
            "only if remaining gap cannot otherwise be financed"
        ),
        "core_question": "How little ordinary earned income can we tax while still balancing the system?",
        "self_retiring_formula": (
            "required obligations − Use/Impact/Depletion − Value Capture/Enterprise − Human-capital "
            "− External Income − Prosperity Fund distributions = Residual Revenue Requirement; "
            "IIT schedule calibrated only to that remainder"
        ),
        "hard_protection": (
            "No expansion into the protected labor-income band without an explicit public trigger, "
            "published revenue shortfall, and statutory or voter-approved authorization"
        ),
        "marginal_not_cliff": (
            "If threshold is T, only income above T is taxed at the residual rate — "
            "earning one more dollar must not reduce after-tax income"
        ),
        "labor_vs_rent_hierarchy_hypothesis": {
            "ordinary_labor": "strongly protected",
            "high_professional_entrepreneurial_labor": "lightly accessed only if necessary",
            "very_high_discretionary_income": "stronger residual contribution",
            "economic_rents_extraordinary_passive_gains": "potentially stronger treatment",
            "status": "HYPOTHESIS — incidence and mobility must clear before endorsement",
        },
    }

    current_system = {
        "fy2026_iit_gross_usd": IIT_GROSS_FY2026,
        "top_rate_ty2026": CURRENT_TOP_RATE,
        "legal_base": "Ark. Code § 26-51-201 as amended by 2026 special session Act 2 / SB1 (top rate 3.7%)",
        "structure_note": "Graduated; top 3.7% applies broadly above modest brackets — not a residual top-down design",
        "comparison": (
            "Current system collects ~$3.859B by taxing deep into the distribution at ~3.7%. "
            "Residual design asks how much of that can be replaced by prosperity engines so the "
            "starting point rises and ordinary labor exits the tax."
        ),
    }

    buckets = {
        "COUNTABLE_NOW_PROSPERITY_ENGINES": {
            "incremental_recurring_usd": 0,
            "verdict": "Unchanged — residual IIT is not a prosperity engine; other engines still $0 countable",
        },
        "RESIDUAL_SHOCK_ABSORBER_DESIGN": {
            "status": "MODELED_TOP_DOWN_FROM_SOI",
            "verdict": "Legal/admin base exists (current IIT); residual top-down calibration is a design hypothesis",
        },
        "NOT_LOCKED": {
            "ids": ["dollar_thresholds_5m_2m_etc", "labor_vs_rent_differential_rates"],
            "verdict": "Do not lock illustrative $5M/$2M bands or labor/rent differentials without finer data and incidence",
        },
    }

    # Headline answers
    g250 = next(s for s in solutions if s["gap_id"] == "G250")
    g1000 = next(s for s in solutions if s["gap_id"] == "G1000")
    g3000 = next(s for s in solutions if s["gap_id"] == "G3000")

    out = {
        "version": "1.0.0",
        "slice_id": SLICE,
        "generated_at": "2026-08-12",
        "decision_id": DEC,
        "update_id": UPD,
        "hypothesis_id": "CC-HYP-PROSPERITY-BASED-REVENUE-REPLACEMENT-SYSTEM",
        "incubator_alias": "HYP-131",
        "status": "RESIDUAL_IIT_TOP_DOWN_MODELED_ZERO_PROSPERITY_COUNTABLE",
        "central_question": (
            "If Constitutional Capitalism succeeds at producing $X billion from other engines, "
            "how high can we push the income-tax starting point?"
        ),
        "philosophy": philosophy,
        "current_system": current_system,
        "soi_bind": soi,
        "top_band_composition": {
            "1M_PLUS": {
                "returns": top["returns"],
                "agi_usd": top["agi_usd"],
                "taxable_income_usd": top["taxable_income_usd"],
                "salaries_wages_usd": top["salaries_wages_usd"],
                "net_capital_gain_usd": top["net_capital_gain_usd"],
                "partnership_scorp_net_usd": top["partnership_scorp_net_usd"],
                "salaries_share_of_agi": top["salaries_share_of_agi"],
                "capital_gain_plus_passthrough_share_of_agi": top[
                    "capital_gain_plus_passthrough_share_of_agi"
                ],
                "reading": (
                    "Top band is capital/pass-through heavy vs salaries — supports testing labor vs rent "
                    "distinction, but does not yet authorize different rates"
                ),
            },
            "500K_PLUS_cumulative": top2,
        },
        "residual_gap_solutions": solutions,
        "starting_point_by_other_engine_coverage": starting,
        "illustrative_schedules": schedules,
        "migration_avoidance_sensitivity": stress,
        "headline_answers": {
            "gap_250m": {
                "other_engines_need_to_cover_usd": IIT_GROSS_FY2026 - 250_000_000,
                "at_le_3_7pct": g250["preferred_at_le_3_7pct"]["threshold_agi_usd"]
                if g250["preferred_at_le_3_7pct"]
                else None,
                "at_le_8pct": g250["preferred_at_le_8pct"]["threshold_agi_usd"]
                if g250["preferred_at_le_8pct"]
                else None,
                "rate_needed_if_1m_plus_only": g250["layers"][0][
                    "flat_marginal_rate_needed_on_taxable_income_above_threshold"
                ],
            },
            "gap_1b": {
                "other_engines_need_to_cover_usd": IIT_GROSS_FY2026 - 1_000_000_000,
                "at_le_8pct": g1000["preferred_at_le_8pct"]["threshold_agi_usd"]
                if g1000["preferred_at_le_8pct"]
                else None,
                "rate_needed_if_1m_plus_only": g1000["layers"][0][
                    "flat_marginal_rate_needed_on_taxable_income_above_threshold"
                ],
                "rate_needed_if_500k_plus": g1000["layers"][1][
                    "flat_marginal_rate_needed_on_taxable_income_above_threshold"
                ],
            },
            "gap_3b": {
                "other_engines_need_to_cover_usd": IIT_GROSS_FY2026 - 3_000_000_000,
                "at_le_8pct": g3000["preferred_at_le_8pct"]["threshold_agi_usd"]
                if g3000["preferred_at_le_8pct"]
                else None,
                "at_le_10pct": g3000["preferred_at_le_10pct"]["threshold_agi_usd"]
                if g3000["preferred_at_le_10pct"]
                else None,
                "reading": (
                    "A $3B residual still requires deep reach or high rates — "
                    "prosperity engines must carry most of the $3.859B for ordinary labor to exit"
                ),
            },
        },
        "volatility_notes": [
            "Top-band AGI is capital-gain and pass-through heavy → residual top-down revenue more cyclical than broad wage IIT",
            "Recession/capital-gains drought can blow out residual requirement exactly when prosperity engines may also weaken",
            "Self-retiring design must include reserve / Prosperity Fund buffer so residual rates do not spike into protected labor in downturns",
        ],
        "pass_through_business_incidence": {
            "status": "FLAGGED",
            "note": (
                "Partnership/S-corp income is large in top bands — residual rates can hit pass-through owners "
                "who are also employers; incidence on workers/investment requires separate microsim before endorsement"
            ),
        },
        "buckets": buckets,
        "counted_toward_prosperity_replacement_usd": 0,
        "replacement_target_usd": COMBINED_TARGET,
        "next_slice": "CC-ARKANSAS-EXTERNAL-INCOME-SECTOR-CAPTURE-1.0",
        "sequence_note": (
            "Residual IIT model inserted as transition architecture alongside engine sequence; "
            "External Income remains next prosperity-engine research pass"
        ),
        "holds": [
            "overall_percent_held_at_43",
            "KEEP_AS_HYPOTHESIS",
            "no_abolish_today",
            "prosperity_engines_still_zero_countable",
            "thresholds_not_locked",
            "marginal_not_cliff",
            "protected_labor_band_requires_public_trigger",
            "soi_ty2022_is_federal_agi_not_arkansas_taxable_income",
        ],
    }

    path = OUT / "residual_progressive_income_tax_top_down_ledger.json"
    path.write_text(json.dumps(out, indent=2) + "\n", encoding="utf-8")
    print(
        json.dumps(
            {
                "path": str(path),
                "soi_returns": soi["totals"]["returns"],
                "soi_agi_b": round(soi["totals"]["agi_usd"] / 1e9, 2),
                "top_1m_ti_b": round(bm["1M_PLUS"]["taxable_income_usd"] / 1e9, 2),
                "starting_point_table": [
                    {
                        "other_b": round(r["if_other_engines_cover_usd"] / 1e9, 2),
                        "gap_b": round(r["residual_gap_usd"] / 1e9, 2),
                        "threshold": r["illustrative_starting_agi_threshold_usd"],
                        "rate": r["flat_rate_needed_on_included_taxable_income"],
                    }
                    for r in starting
                ],
                "schedules_m": {
                    s["id"]: round(s["estimated_revenue_usd"] / 1e6, 1) for s in schedules
                },
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
