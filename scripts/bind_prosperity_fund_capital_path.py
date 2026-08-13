#!/usr/bin/env python3
"""Prosperity Fund capital-path model for HYP-131 (fail-closed counting).

Reverse-engineers corpus from payout targets, simulates Conservative/Base/Accelerated
paths year-by-year, and reports time-to-threshold. COUNTABLE NOW stays $0 — the fund
does not exist; feeder inflows are illustrative hypotheses, not bound cash.
"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "imports" / "arkansas-revenue-replacement"
OUT.mkdir(parents=True, exist_ok=True)

SLICE = "CC-ARKANSAS-PROSPERITY-FUND-CAPITAL-PATH-1.0"
DEC, UPD = "CC-DEC-131", "UPD-144"
COMBINED_TARGET = 7_231_905_638
IIT_GROSS = 3_859_100_000
HORIZON_YEARS = 16
EXTENDED_YEARS = 40

PAYOUT_TARGETS = [
    ("T250", 250_000_000),
    ("T500", 500_000_000),
    ("T1000", 1_000_000_000),
    ("T2000", 2_000_000_000),
]


def corpus_for(payout: int, dist_rate: float) -> int:
    return int(round(payout / dist_rate))


def scale_markers(dist_rate: float = 0.04) -> dict:
    return {
        "distribution_rate": dist_rate,
        "note": "Illustrative scale markers — not recommendations",
        "targets": [
            {
                "id": tid,
                "sustainable_annual_distribution_usd": payout,
                "implied_corpus_usd": corpus_for(payout, dist_rate),
                "share_of_iit_gross": round(payout / IIT_GROSS, 4),
                "share_of_combined_7_23b": round(payout / COMBINED_TARGET, 4),
            }
            for tid, payout in PAYOUT_TARGETS
        ],
    }


def simulate_path(
    *,
    path_id: str,
    label: str,
    description: str,
    seed_usd: int,
    year1_contribution_usd: int,
    contribution_growth: float,
    nominal_return: float,
    inflation: float,
    distribution_rate: float,
    recession_years: dict[int, float],
    feeder_mix: dict,
    years: int = EXTENDED_YEARS,
) -> dict:
    """Accumulate then optionally distribute once corpus clears each threshold.

    Year flow:
      opening → +contributions → +investment return → inflation reserve (restriction)
      → allowable distribution → closing

    During buildup, distributions stay $0 until corpus reaches the $250M-threshold
    corpus at this path's distribution rate. After that, allowable distribution is
    min(highest cleared target, distribution_rate * trailing_3yr_avg), never invading
    inflation-adjusted contributed capital (principal floor).
    """
    rows = []
    opening = float(seed_usd)
    contrib_schedule = []
    principal_history = [opening]  # for trailing avg; seed counts as year-0 close

    # Inflation-adjusted contributed capital floor (seed + cumulative contributions)
    contributed_nominal = float(seed_usd)
    real_contributed_floor = float(seed_usd)

    first_hit = {tid: None for tid, _ in PAYOUT_TARGETS}
    thresholds = {tid: corpus_for(payout, distribution_rate) for tid, payout in PAYOUT_TARGETS}

    cumulative_distributed = 0.0

    for year in range(1, years + 1):
        if year == 1:
            contrib = float(year1_contribution_usd)
        else:
            contrib = float(year1_contribution_usd) * ((1 + contribution_growth) ** (year - 1))

        contrib_schedule.append(int(round(contrib)))
        mid = opening + contrib
        r = recession_years.get(year, nominal_return)
        investment_return = mid * r
        pre_dist = mid + investment_return

        # Inflation reserve: amount that must stay in corpus to protect real contributed capital
        inflation_reserve = opening * inflation
        real_contributed_floor = (real_contributed_floor + contrib) * (1 + inflation)
        contributed_nominal += contrib

        # Trailing 3-year average of prior closing principals (plus current pre-dist for year 1 edge)
        hist = principal_history[-3:] if principal_history else [opening]
        trailing_avg = sum(hist) / len(hist)

        # Highest target whose corpus threshold is already met by opening (start-of-year)
        cleared_payout = 0
        for tid, payout in PAYOUT_TARGETS:
            if opening >= thresholds[tid]:
                cleared_payout = payout

        pomv_cap = trailing_avg * distribution_rate
        # Distributable cannot invade inflation-adjusted contributed capital
        max_without_invading = max(0.0, pre_dist - real_contributed_floor)
        # Also cannot exceed return net of inflation reserve in spirit of "no unrealized-gain credit"
        # — only sustainable rule-based cash, not marking up paper gains beyond POMV
        sustainable_cap = min(pomv_cap, max_without_invading)

        if cleared_payout <= 0:
            allowable = 0.0
        else:
            allowable = min(float(cleared_payout), sustainable_cap)
            # Hard stop: do not distribute if it would drop below real contributed floor
            if pre_dist - allowable < real_contributed_floor:
                allowable = max(0.0, pre_dist - real_contributed_floor)

        closing = pre_dist - allowable
        cumulative_distributed += allowable

        for tid, payout in PAYOUT_TARGETS:
            if first_hit[tid] is None and closing >= thresholds[tid]:
                first_hit[tid] = year

        row = {
            "year": year,
            "opening_principal_usd": int(round(opening)),
            "contributions_usd": int(round(contrib)),
            "nominal_return_rate_applied": round(r, 4),
            "investment_return_usd": int(round(investment_return)),
            "inflation_reserve_usd": int(round(inflation_reserve)),
            "real_contributed_floor_usd": int(round(real_contributed_floor)),
            "trailing_3yr_avg_principal_usd": int(round(trailing_avg)),
            "pomv_cap_usd": int(round(pomv_cap)),
            "cleared_payout_target_usd": cleared_payout,
            "allowable_distribution_usd": int(round(allowable)),
            "closing_principal_usd": int(round(closing)),
            "note": "recession_stress" if year in recession_years else None,
        }
        rows.append(row)
        principal_history.append(closing)
        opening = closing

    horizon = [r for r in rows if r["year"] <= HORIZON_YEARS]
    y16 = rows[HORIZON_YEARS - 1]
    y40 = rows[-1]

    return {
        "id": path_id,
        "label": label,
        "description": description,
        "assumptions": {
            "seed_usd": seed_usd,
            "year1_contribution_usd": year1_contribution_usd,
            "contribution_growth_rate": contribution_growth,
            "nominal_return_rate": nominal_return,
            "inflation_rate": inflation,
            "approx_real_return_rate": round((1 + nominal_return) / (1 + inflation) - 1, 4),
            "distribution_rate_pomv": distribution_rate,
            "recession_years": {str(k): v for k, v in recession_years.items()},
            "status": "ILLUSTRATIVE_HYPOTHESIS — not Arkansas budget commitments",
        },
        "feeder_mix": feeder_mix,
        "corpus_thresholds_at_path_distribution_rate": {
            tid: thresholds[tid] for tid, _ in PAYOUT_TARGETS
        },
        "time_to_threshold_years": {
            tid: first_hit[tid] for tid, _ in PAYOUT_TARGETS
        },
        "within_8_16_year_window": {
            tid: {
                "hit_year": first_hit[tid],
                "within_8": first_hit[tid] is not None and first_hit[tid] <= 8,
                "within_16": first_hit[tid] is not None and first_hit[tid] <= 16,
            }
            for tid, _ in PAYOUT_TARGETS
        },
        "year_16_snapshot": {
            "closing_principal_usd": y16["closing_principal_usd"],
            "allowable_distribution_usd": y16["allowable_distribution_usd"],
            "cumulative_distributed_through_y16_usd": int(
                round(sum(r["allowable_distribution_usd"] for r in horizon))
            ),
            "cumulative_contributions_through_y16_usd": int(
                round(seed_usd + sum(r["contributions_usd"] for r in horizon))
            ),
        },
        "year_40_snapshot": {
            "closing_principal_usd": y40["closing_principal_usd"],
            "allowable_distribution_usd": y40["allowable_distribution_usd"],
            "cumulative_distributed_through_y40_usd": int(round(cumulative_distributed)),
        },
        "years_1_to_16": horizon,
        "safeguard_checks": {
            "no_unrealized_gain_tax_retirement_credit": True,
            "distributions_only_via_pomv_and_cleared_threshold": True,
            "principal_floor_inflation_adjusted_contributions": True,
            "countable_toward_replacement_usd": 0,
        },
    }


def main() -> None:
    markers_3 = scale_markers(0.03)
    markers_4 = scale_markers(0.04)
    markers_5 = scale_markers(0.05)

    # Shared recession stress: years 3 and 10
    recessions = {3: -0.15, 10: -0.12}

    conservative = simulate_path(
        path_id="PATH-CONSERVATIVE",
        label="Conservative",
        description="Low annual contributions + conservative real return; slow compounding",
        seed_usd=100_000_000,
        year1_contribution_usd=150_000_000,
        contribution_growth=0.02,
        nominal_return=0.055,
        inflation=0.025,
        distribution_rate=0.03,
        recession_years=recessions,
        feeder_mix={
            "status": "ILLUSTRATIVE",
            "annual_composition_note": "Modest settlement/windfall scraps + thin resource share; little External Income",
            "buckets": {
                "lithium_resource_participation": "small/late",
                "one_time_windfalls": "seed-like only",
                "public_asset_returns": "minimal",
                "value_capture_proceeds": "minimal",
                "enterprise_distributions": "minimal",
                "external_income_surpluses": "near zero",
                "settlement_proceeds": "occasional",
                "wpc_surplus_if_justified": "none assumed",
            },
            "raid_existing_obligations": False,
        },
    )

    base = simulate_path(
        path_id="PATH-BASE",
        label="Base",
        description="Moderate contributions + diversified long-run return",
        seed_usd=250_000_000,
        year1_contribution_usd=400_000_000,
        contribution_growth=0.03,
        nominal_return=0.07,
        inflation=0.025,
        distribution_rate=0.04,
        recession_years=recessions,
        feeder_mix={
            "status": "ILLUSTRATIVE",
            "annual_composition_note": "Lithium public share ramp + some value-capture/enterprise + limited External Income surplus dedication",
            "buckets": {
                "lithium_resource_participation": "material after production",
                "one_time_windfalls": "seed + infrequent",
                "public_asset_returns": "growing slowly",
                "value_capture_proceeds": "deal-lumpy",
                "enterprise_distributions": "partial",
                "external_income_surpluses": "partial — determines whether Base holds",
                "settlement_proceeds": "occasional",
                "wpc_surplus_if_justified": "small dedicated share only if incidence clears",
            },
            "raid_existing_obligations": False,
        },
    )

    accelerated = simulate_path(
        path_id="PATH-ACCELERATED",
        label="Accelerated",
        description="Major new external/resource income + higher annual contributions",
        seed_usd=500_000_000,
        year1_contribution_usd=1_000_000_000,
        contribution_growth=0.05,
        nominal_return=0.075,
        inflation=0.025,
        distribution_rate=0.04,
        recession_years=recessions,
        feeder_mix={
            "status": "ILLUSTRATIVE",
            "annual_composition_note": "Transformational External Income + lithium/permanent resource stack + enterprise/value-capture surpluses",
            "buckets": {
                "lithium_resource_participation": "large permanent share",
                "one_time_windfalls": "seed + major settlements",
                "public_asset_returns": "material",
                "value_capture_proceeds": "material",
                "enterprise_distributions": "material",
                "external_income_surpluses": "dominant feeder — External Income pass decides realism",
                "settlement_proceeds": "large early",
                "wpc_surplus_if_justified": "dedicated share if legally/incidence-cleared",
            },
            "raid_existing_obligations": False,
            "warning": "Requires External Income and resource participation that do not yet exist as countable cash",
        },
    )

    paths = [conservative, base, accelerated]

    # Sensitivity: same Base contributions at alt distribution rates (corpus thresholds only)
    sensitivity = {
        "note": "Corpus required for each payout at alternate sustainable distribution rates",
        "by_distribution_rate": {
            "3_percent": markers_3,
            "4_percent": markers_4,
            "5_percent": markers_5,
        },
    }

    verdict = {
        "fund_exists_today": False,
        "countable_toward_replacement_usd": 0,
        "central_answer": {
            "question": (
                "How much permanently invested public capital would Arkansas need to generate "
                "sustainable annual distributions of $250M, $500M, $1B, and $2B without consuming "
                "principal or destabilizing the fund?"
            ),
            "at_4_percent_pomv": {
                "T250": 6_250_000_000,
                "T500": 12_500_000_000,
                "T1000": 25_000_000_000,
                "T2000": 50_000_000_000,
            },
            "time_to_threshold_summary": {
                p["id"]: p["time_to_threshold_years"] for p in paths
            },
            "window_8_16_reading": (
                "Even under Accelerated illustrative feeders, $1B–$2B sustainable payouts are "
                "unlikely inside 8 years and strained inside 16 without transformational External "
                "Income / resource participation. $250M may be reachable on Base/Accelerated paths "
                "inside or near the window if feeders materialize — still $0 countable until real."
            ),
        },
        "vs_7_23b": {
            "note": "Prosperity Fund alone cannot cover ~$7.23B even at $2B/year payout",
            "t2000_share_of_combined": round(2_000_000_000 / COMBINED_TARGET, 4),
            "implication": "Fund is a compounding engine + Tax Retirement feeder, not a solo replacement system",
        },
    }

    # Hard read on each path within 16 years
    path_reads = []
    for p in paths:
        w = p["within_8_16_year_window"]
        path_reads.append(
            {
                "id": p["id"],
                "y16_principal_usd": p["year_16_snapshot"]["closing_principal_usd"],
                "y16_allowable_distribution_usd": p["year_16_snapshot"][
                    "allowable_distribution_usd"
                ],
                "T250_year": p["time_to_threshold_years"]["T250"],
                "T500_year": p["time_to_threshold_years"]["T500"],
                "T1000_year": p["time_to_threshold_years"]["T1000"],
                "T2000_year": p["time_to_threshold_years"]["T2000"],
                "T250_within_16": w["T250"]["within_16"],
                "T500_within_16": w["T500"]["within_16"],
                "T1000_within_16": w["T1000"]["within_16"],
                "T2000_within_16": w["T2000"]["within_16"],
            }
        )

    feeders = [
        {
            "id": "FEED-LITHIUM",
            "name": "Future lithium / resource participation",
            "status": "PLAUSIBLE_UNMODELED",
            "raid_existing": False,
            "notes": "Post-production permanent share — prior Depletion pass; not countable yet",
        },
        {
            "id": "FEED-WINDFALL",
            "name": "One-time windfalls / settlement proceeds",
            "status": "EPISODIC",
            "raid_existing": False,
            "notes": "Seed-capable; not a stable annual engine",
        },
        {
            "id": "FEED-PUBLIC-ASSET",
            "name": "Public asset returns",
            "status": "UNMODELED_ZERO_NOW",
            "raid_existing": False,
            "notes": "Enterprise pass found pledged/unsurveyed nets",
        },
        {
            "id": "FEED-VALUE-CAPTURE",
            "name": "Value-capture proceeds",
            "status": "UNMODELED_ZERO_NOW",
            "raid_existing": False,
            "notes": "Requires participation redesign",
        },
        {
            "id": "FEED-ENTERPRISE",
            "name": "Enterprise distributions",
            "status": "UNMODELED_ZERO_NOW",
            "raid_existing": False,
            "notes": "Only free cash after debt/O&M — mostly unavailable today",
        },
        {
            "id": "FEED-EXTERNAL",
            "name": "External-income surpluses",
            "status": "QUEUED_NEXT_PASS",
            "raid_existing": False,
            "notes": "Likely determines whether Base vs Accelerated is realistic",
        },
        {
            "id": "FEED-WPC",
            "name": "Workforce Prosperity Contribution surplus share",
            "status": "INCIDENCE_PENDING",
            "raid_existing": False,
            "notes": "Only if legal/incidence clears; earmark tension with education spend",
        },
        {
            "id": "FEED-RAID-EXISTING",
            "name": "Raid existing committed revenues (fuel, URT, CIT, etc.)",
            "status": "REJECTED",
            "raid_existing": True,
            "notes": "Makes the fund look viable on paper while breaking current obligations — forbidden",
        },
    ]

    buckets = {
        "COUNTABLE_NOW": {
            "ids": [],
            "incremental_recurring_usd": 0,
            "verdict": "EMPTY — fund does not exist; no sustainable distributable cash",
        },
        "PLAUSIBLE_BUT_FEEDER_AND_LEGAL_PENDING": {
            "ids": [p["id"] for p in paths] + [f["id"] for f in feeders if f["status"] != "REJECTED"],
            "verdict": "Capital-path math is real; feeders and constitutional principal protection are not yet built",
        },
        "NOT_MATERIAL_OR_NOT_SUITABLE": {
            "ids": ["FEED-RAID-EXISTING", "COUNT_UNREALIZED_MARKET_GAINS"],
            "verdict": "Raiding existing obligations or counting paper gains as tax-retirement dollars is unsuitable",
        },
    }

    out = {
        "version": "1.0.0",
        "slice_id": SLICE,
        "generated_at": "2026-08-12",
        "decision_id": DEC,
        "update_id": UPD,
        "hypothesis_id": "CC-HYP-PROSPERITY-BASED-REVENUE-REPLACEMENT-SYSTEM",
        "incubator_alias": "HYP-131",
        "engine_id": "ENGINE-PROSPERITY-FUND",
        "status": "CAPITAL_PATH_MODELED_ZERO_COUNTABLE",
        "central_question": verdict["central_answer"]["question"],
        "count_rule": (
            "COUNTABLE NOW stays $0 until a real fund exists with sustainable distributable cash "
            "under POMV + principal-floor rules. Unrealized market gains are not tax-retirement credit. "
            "Illustrative feeder schedules are hypotheses, not bound Arkansas revenues."
        ),
        "hard_safeguards": {
            "no_tax_retirement_credit_for_unrealized_market_gains": (
                "Only sustainable distributable cash under the payout rule counts — never mark-to-market paper gains"
            ),
            "no_political_raiding_of_principal": (
                "If this becomes doctrine, principal protection and withdrawal rules should be constitutional-level"
            ),
            "no_raiding_existing_obligations_to_seed": (
                "Existing committed revenues (fuel/highway, URT, CIT GR, etc.) must not be diverted merely to inflate the fund"
            ),
        },
        "replacement_target_usd": COMBINED_TARGET,
        "iit_gross_fy2026_usd": IIT_GROSS,
        "counted_toward_replacement_usd": 0,
        "scale_markers": sensitivity,
        "primary_4pct_markers": markers_4,
        "feeder_buckets": feeders,
        "paths": paths,
        "path_reads_compact": path_reads,
        "verdict": verdict,
        "buckets": buckets,
        "horizon_years_primary": HORIZON_YEARS,
        "horizon_years_extended": EXTENDED_YEARS,
        "next_slice": "CC-ARKANSAS-EXTERNAL-INCOME-SECTOR-CAPTURE-1.0",
        "sequence_lock": [
            "CC-ARKANSAS-PROSPERITY-FUND-CAPITAL-PATH-1.0",
            "CC-ARKANSAS-EXTERNAL-INCOME-SECTOR-CAPTURE-1.0",
            "CC-ARKANSAS-PUBLIC-INCOME-ENGINES-INTEGRATED-STRESS-TEST-1.0",
        ],
        "holds": [
            "overall_percent_held_at_43",
            "KEEP_AS_HYPOTHESIS",
            "no_abolish_today",
            "zero_counted_until_cashflow_model",
            "unrealized_gains_not_tax_retirement",
            "no_principal_raid",
            "no_raid_existing_obligations",
            "illustrative_feeders_not_bound_cash",
        ],
    }

    path = OUT / "prosperity_fund_capital_path_ledger.json"
    path.write_text(json.dumps(out, indent=2) + "\n", encoding="utf-8")
    print(
        json.dumps(
            {
                "path": str(path),
                "countable_usd": 0,
                "markers_4pct": {
                    t["id"]: t["implied_corpus_usd"] for t in markers_4["targets"]
                },
                "time_to_threshold": {
                    p["id"]: p["time_to_threshold_years"] for p in paths
                },
                "y16_principal": {
                    p["id"]: p["year_16_snapshot"]["closing_principal_usd"] for p in paths
                },
                "next": out["next_slice"],
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
