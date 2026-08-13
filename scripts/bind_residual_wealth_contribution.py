#!/usr/bin/env python3
"""Residual Wealth Contribution model (HYP-131) — supersedes residual progressive IIT.

Hierarchy: prosperity engines → public returns → external income → residual wealth
contribution → never ordinary labor income.

COUNTABLE prosperity-engine dollars remain $0. Arkansas wealth base below the IRS
estate-multiplier floor ($11.4M NW) is NEE.
"""

from __future__ import annotations

import json
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "imports" / "arkansas-revenue-replacement"
OUT.mkdir(parents=True, exist_ok=True)
LOCAL = ROOT / ".local" / "downloads" / "revenue-replacement"
LOCAL.mkdir(parents=True, exist_ok=True)

SLICE = "CC-ARKANSAS-RESIDUAL-WEALTH-CONTRIBUTION-MODEL-1.0"
DEC, UPD = "CC-DEC-133", "UPD-146"
SUPERSEDED_DEC, SUPERSEDED_UPD = "CC-DEC-132", "UPD-145"
IIT_GROSS = 3_859_100_000
COMBINED = 7_231_905_638

PW6_URL = "https://www.irs.gov/pub/irs-soi/19pw06es.xlsx"
PW1_URL = "https://www.irs.gov/pub/irs-soi/19pw01es.xlsx"
PW_YEAR = 2019

THRESHOLDS = [5_000_000, 10_000_000, 25_000_000, 50_000_000, 100_000_000]
RATES = [0.0025, 0.005, 0.01, 0.015, 0.02]
GAPS = [
    ("G250", 250_000_000),
    ("G500", 500_000_000),
    ("G1000", 1_000_000_000),
    ("G2000", 2_000_000_000),
]


def _m_to_usd(millions) -> float:
    return float(millions) * 1_000_000


def load_arkansas_top_wealth() -> dict:
    path = LOCAL / "19pw06es.xlsx"
    if not path.exists():
        import urllib.request

        path.write_bytes(urllib.request.urlopen(PW6_URL, timeout=120).read())
    df = pd.read_excel(path, header=None)
    # Row 13 = Arkansas
    row = df.iloc[13]
    return {
        "source_url": PW6_URL,
        "study_year": PW_YEAR,
        "definition": "Top wealth holders with net worth of $11.4 million or more (estate-multiplier estimates)",
        "units_note": "SOI money amounts in millions of dollars; converted to USD",
        "holders": int(row[1]),
        "gross_assets_usd": int(round(_m_to_usd(row[2]))),
        "net_worth_usd": int(round(_m_to_usd(row[4]))),
        "financial_assets_usd": int(round(_m_to_usd(row[6]))),
        "all_real_estate_usd": int(round(_m_to_usd(row[8]))),
        "all_other_assets_usd": int(round(_m_to_usd(row[10]))),
        "floor_net_worth_usd": 11_400_000,
        "limitations": [
            "Does not cover Arkansas households with NW between $5M and $11.4M",
            "Estate-multiplier technique — not a current household wealth ledger",
            "Valuation/liquidity/trust structures not observed directly",
        ],
    }


def load_national_nw_bands() -> list[dict]:
    path = LOCAL / "19pw01es.xlsx"
    if not path.exists():
        import urllib.request

        path.write_bytes(urllib.request.urlopen(PW1_URL, timeout=120).read())
    df = pd.read_excel(path, header=None)
    # Rows 11-13 are NW bands at/above $11.4M
    bands = [
        {
            "id": "NW_11_4_20M",
            "label": "$11.4M under $20M",
            "lo": 11_400_000,
            "hi": 20_000_000,
            "row": 11,
        },
        {
            "id": "NW_20_50M",
            "label": "$20M under $50M",
            "lo": 20_000_000,
            "hi": 50_000_000,
            "row": 12,
        },
        {
            "id": "NW_50M_PLUS",
            "label": "$50M or more",
            "lo": 50_000_000,
            "hi": None,
            "row": 13,
        },
    ]
    out = []
    for b in bands:
        r = df.iloc[b["row"]]
        out.append(
            {
                "id": b["id"],
                "label": b["label"],
                "lo": b["lo"],
                "hi": b["hi"],
                "national_holders": int(r[5]),
                "national_net_worth_usd": int(round(_m_to_usd(r[6]))),
            }
        )
    return out


def allocate_ar_bands(ar: dict, national_bands: list[dict]) -> list[dict]:
    """Illustratively allocate AR ≥$11.4M NW using national NW-band shares."""
    nat_holders = sum(b["national_holders"] for b in national_bands)
    nat_nw = sum(b["national_net_worth_usd"] for b in national_bands)
    allocated = []
    for b in national_bands:
        share_n = b["national_holders"] / nat_holders
        share_w = b["national_net_worth_usd"] / nat_nw
        holders = int(round(ar["holders"] * share_n))
        nw = int(round(ar["net_worth_usd"] * share_w))
        avg = int(round(nw / holders)) if holders else 0
        allocated.append(
            {
                "id": b["id"],
                "label": b["label"],
                "lo": b["lo"],
                "hi": b["hi"],
                "holders_illustrative": holders,
                "net_worth_usd_illustrative": nw,
                "avg_net_worth_usd_illustrative": avg,
                "allocation_method": "Arkansas total NW/holders × national band shares among NW≥$11.4M",
                "status": "ILLUSTRATIVE_NOT_ARKANSAS_MICRODATA",
            }
        )
    # Fix rounding drift on holders/nw
    drift_n = ar["holders"] - sum(x["holders_illustrative"] for x in allocated)
    drift_w = ar["net_worth_usd"] - sum(x["net_worth_usd_illustrative"] for x in allocated)
    allocated[-1]["holders_illustrative"] += drift_n
    allocated[-1]["net_worth_usd_illustrative"] += drift_w
    if allocated[-1]["holders_illustrative"]:
        allocated[-1]["avg_net_worth_usd_illustrative"] = int(
            round(
                allocated[-1]["net_worth_usd_illustrative"]
                / allocated[-1]["holders_illustrative"]
            )
        )
    return allocated


def taxable_wealth_above_exemption(bands: list[dict], exemption: int) -> dict:
    """Approximate marginal base: max(0, avg_NW - exemption) × holders per band."""
    taxable = 0
    holders = 0
    detail = []
    for b in bands:
        if b["hi"] is not None and b["hi"] <= exemption:
            tw = 0
            h = 0
        elif b["lo"] >= exemption:
            tw = max(0, b["net_worth_usd_illustrative"] - exemption * b["holders_illustrative"])
            h = b["holders_illustrative"]
        else:
            # Band straddles exemption — use average NW approximation
            avg = b["avg_net_worth_usd_illustrative"]
            if avg <= exemption:
                tw, h = 0, 0
            else:
                tw = (avg - exemption) * b["holders_illustrative"]
                h = b["holders_illustrative"]
        taxable += tw
        holders += h
        detail.append(
            {
                "band_id": b["id"],
                "taxable_wealth_usd": int(round(tw)),
                "holders_in_tax": h,
            }
        )
    return {
        "exemption_usd": exemption,
        "taxable_wealth_usd": int(round(taxable)),
        "holders_above_exemption_approx": holders,
        "band_detail": detail,
        "status": "ILLUSTRATIVE_FROM_ALLOCATED_BANDS",
    }


def revenue_matrix(bases: dict[str, dict]) -> list[dict]:
    rows = []
    for base_id, base in bases.items():
        for rate in RATES:
            rev = int(round(base["taxable_wealth_usd"] * rate))
            rows.append(
                {
                    "base_id": base_id,
                    "exemption_or_floor_usd": base.get("exemption_usd") or base.get("floor_usd"),
                    "taxable_wealth_usd": base["taxable_wealth_usd"],
                    "rate": rate,
                    "rate_percent": rate * 100,
                    "estimated_revenue_usd": rev,
                    "covers_gaps": [gid for gid, g in GAPS if rev >= g],
                    "status": base.get("status", "MODELED"),
                }
            )
    return rows


def gap_closure_table(ar: dict, bands: list[dict]) -> list[dict]:
    """Key table: for each residual gap, highest threshold + lowest rate that closes it."""
    irs_floor = ar["floor_net_worth_usd"]
    out = []
    for gid, gap in GAPS:
        candidates = []

        # $5M / $10M floors: unbound for Arkansas (IRS estate-multiplier starts at $11.4M)
        for thr in (5_000_000, 10_000_000):
            candidates.append(
                {
                    "threshold_usd": thr,
                    "base_mode": "NEE",
                    "status": "NEE_BELOW_IRS_FLOOR",
                    "note": "Arkansas household wealth between $5M–$11.4M not bound",
                }
            )

        # IRS floor: flat rate on full bound top NW (holders ≥$11.4M)
        for rate in RATES:
            rev = int(round(ar["net_worth_usd"] * rate))
            if rev >= gap:
                candidates.append(
                    {
                        "threshold_usd": irs_floor,
                        "base_mode": "FULL_NW_OF_HOLDERS_AT_OR_ABOVE_FLOOR",
                        "rate": rate,
                        "rate_percent": rate * 100,
                        "taxable_wealth_usd": ar["net_worth_usd"],
                        "holders_approx": ar["holders"],
                        "estimated_revenue_usd": rev,
                        "surplus_over_gap_usd": rev - gap,
                        "status": "FEASIBLE_ON_BOUND_TOP_WEALTH",
                    }
                )
                break

        # Higher exemptions: tax only marginal NW above threshold (illustrative bands)
        for thr in (25_000_000, 50_000_000, 100_000_000):
            base = taxable_wealth_above_exemption(bands, thr)
            for rate in RATES:
                rev = int(round(base["taxable_wealth_usd"] * rate))
                if rev >= gap:
                    candidates.append(
                        {
                            "threshold_usd": thr,
                            "base_mode": "MARGINAL_NW_ABOVE_EXEMPTION",
                            "rate": rate,
                            "rate_percent": rate * 100,
                            "taxable_wealth_usd": base["taxable_wealth_usd"],
                            "holders_approx": base["holders_above_exemption_approx"],
                            "estimated_revenue_usd": rev,
                            "surplus_over_gap_usd": rev - gap,
                            "status": "ILLUSTRATIVE_FEASIBLE_ON_ALLOCATED_BANDS",
                        }
                    )
                    break

        feasible = [
            c
            for c in candidates
            if c.get("status")
            in ("FEASIBLE_ON_BOUND_TOP_WEALTH", "ILLUSTRATIVE_FEASIBLE_ON_ALLOCATED_BANDS")
        ]
        if feasible:
            # Prefer highest threshold (broadest household exemption), then lowest rate
            feasible.sort(key=lambda c: (-c["threshold_usd"], c["rate"]))
            preferred = feasible[0]
        else:
            full = ar["net_worth_usd"]
            needed = gap / full if full else None
            preferred = {
                "threshold_usd": irs_floor,
                "base_mode": "FULL_NW_OF_HOLDERS_AT_OR_ABOVE_FLOOR",
                "rate_needed_on_full_top_nw": round(needed, 4) if needed else None,
                "rate_needed_percent": round(needed * 100, 2) if needed else None,
                "taxable_wealth_usd": full,
                "holders_approx": ar["holders"],
                "status": (
                    "REQUIRES_RATE_ABOVE_2PCT_OR_BROADER_BASE"
                    if needed and needed > 0.02
                    else "FEASIBLE_NEAR_FLOOR_IF_RATE_RAISED"
                ),
                "note": (
                    "No tested threshold/rate pair within 0.25–2% closed this gap on the bound "
                    "≥$11.4M base (full NW) or illustrative marginal bands ≥$25M"
                ),
            }
        out.append(
            {
                "gap_id": gid,
                "residual_gap_usd": gap,
                "if_other_engines_cover_of_iit_usd": IIT_GROSS - gap,
                "preferred": preferred,
                "all_candidates": candidates,
            }
        )
    return out


def main() -> None:
    ar = load_arkansas_top_wealth()
    national_bands = load_national_nw_bands()
    ar_bands = allocate_ar_bands(ar, national_bands)

    # Wealth bases
    bases = {
        "BASE-TOTAL-NW-AT-IRS-FLOOR": {
            "name": "Total household net worth of AR top wealthholders (NW≥$11.4M)",
            "floor_usd": 11_400_000,
            "taxable_wealth_usd": ar["net_worth_usd"],
            "holders": ar["holders"],
            "status": "BOUND",
        },
        "BASE-FINANCIAL-ASSETS": {
            "name": "Financial assets only (same population)",
            "floor_usd": 11_400_000,
            "taxable_wealth_usd": ar["financial_assets_usd"],
            "holders": ar["holders"],
            "status": "BOUND",
            "note": "Liquidity-friendlier than total NW; still not cash",
        },
        "BASE-NW-EX-REAL-ESTATE": {
            "name": "Approx NW excluding all real estate assets",
            "floor_usd": 11_400_000,
            "taxable_wealth_usd": ar["gross_assets_usd"]
            - ar["all_real_estate_usd"]
            - (ar["gross_assets_usd"] - ar["net_worth_usd"]),  # rough: assets ex-RE minus debts
            "holders": ar["holders"],
            "status": "APPROXIMATE",
            "note": "Gross assets − real estate − debts; debts may secure RE — refinement NEE",
        },
    }
    # Clean NW ex-RE approx: financial + other − debts, debts = GA - NW
    debts = ar["gross_assets_usd"] - ar["net_worth_usd"]
    bases["BASE-NW-EX-REAL-ESTATE"]["taxable_wealth_usd"] = max(
        0, ar["financial_assets_usd"] + ar["all_other_assets_usd"] - debts
    )

    for thr in (25_000_000, 50_000_000, 100_000_000):
        tw = taxable_wealth_above_exemption(ar_bands, thr)
        bases[f"BASE-MARGINAL-ABOVE-{thr//1_000_000}M"] = {
            "name": f"Marginal net worth above ${thr//1_000_000}M (illustrative band allocation)",
            "exemption_usd": thr,
            "taxable_wealth_usd": tw["taxable_wealth_usd"],
            "holders": tw["holders_above_exemption_approx"],
            "status": "ILLUSTRATIVE",
            "band_detail": tw["band_detail"],
        }

    # Explicit NEE bases
    nee_bases = [
        {
            "id": "BASE-5M-FLOOR",
            "status": "NEE",
            "reason": "IRS estate-multiplier floor is $11.4M NW; $5M AR population unbound",
        },
        {
            "id": "BASE-PRIMARY-RESIDENCE-EXCLUDED-MICRO",
            "status": "PARTIAL",
            "reason": "RE total bound ($4.08B) but primary vs investment RE split NEE",
        },
        {
            "id": "BASE-RETIREMENT-EXCLUDED",
            "status": "NEE",
            "reason": "Protected retirement accounts not separately reported in AR Table 6",
        },
        {
            "id": "BASE-CLOSELY-HELD-BUSINESS",
            "status": "NEE",
            "reason": "Business equity nested in 'other assets'; farm/family-business split unbound",
        },
        {
            "id": "BASE-FARM-LAND",
            "status": "NEE",
            "reason": "Requires NASS/parcel + ownership wealth join",
        },
        {
            "id": "BASE-TRUSTS-BENEFICIAL",
            "status": "NEE",
            "reason": "Trust/beneficial ownership transparency track required",
        },
        {
            "id": "BASE-DEBT-NETTING-REFINED",
            "status": "PARTIAL",
            "reason": "Aggregate debts implied ($112M) but instrument-level netting NEE",
            "implied_debts_usd": debts,
        },
    ]

    matrix = revenue_matrix(bases)
    gaps = gap_closure_table(ar, ar_bands)

    # Simple flat-rate on full bound NW for quick reading
    flat_on_full = {
        f"{int(r*10000)/100}%": int(round(ar["net_worth_usd"] * r)) for r in RATES
    }

    philosophy = {
        "name": "Residual Wealth Contribution",
        "supersedes": {
            "decision_id": SUPERSEDED_DEC,
            "update_id": SUPERSEDED_UPD,
            "prior_name": "Residual Progressive Income Tax",
            "reason": (
                "Compulsory residual burden should not fall on wages/salaries/ordinary earned income; "
                "if a gap remains after prosperity engines, tax accumulated surplus wealth at the very top"
            ),
        },
        "hierarchy": (
            "Prosperity engines → public returns → external income → residual wealth contribution "
            "→ never ordinary labor income"
        ),
        "social_boundary": (
            "Nobody subject to this tax should be anywhere near economic precarity"
        ),
        "design_constraint": (
            "Liability begins only above a level of net wealth representing substantial surplus "
            "economic capacity, with protections against forced liquidation of ordinary homes, "
            "productive family farms, retirement security, and closely held enterprises solely to "
            "satisfy the tax"
        ),
        "self_retiring": (
            "As public-income engines and Prosperity Fund distributions rise, required wealth "
            "contribution rate falls toward zero"
        ),
        "not": "Ideological punishment of success or a broad millionaire tax on paper wealth",
    }

    protections = {
        "primary_residence_exemption": "REQUIRED_TEST",
        "protected_retirement_wealth": "REQUIRED_TEST",
        "family_farm_business_exemption_or_deferral": "REQUIRED_TEST",
        "liquidity_thresholds": "REQUIRED_TEST",
        "deferral_until_sale_transfer_for_illiquid": "REQUIRED_TEST",
        "anti_avoidance_trusts_entities": "REQUIRED_TEST",
        "debt_netting": "REQUIRED_TEST",
    }

    legal = {
        "status": "LEGAL_PENDING_MAJOR",
        "arkansas_constitution_art_16_sec_5": (
            "Real and tangible personal property subject to taxation must be valued and taxed "
            "equal and uniformly — do not assume a graduated annual net-worth tax on real/tangible "
            "property can be enacted by ordinary statute"
        ),
        "amendment_57_intangibles": (
            "Amendment 57 preserves legislative authority to classify/tax intangible personal property "
            "differently; A.C.A. § 26-3-302 currently exempts intangibles from local ad valorem levies"
        ),
        "amendment_47": "State generally prohibited from levying ad valorem taxes — classification of a state wealth levy is critical",
        "open_questions": [
            "Would an annual net-worth levy be classified as a property tax?",
            "Do uniformity requirements apply to the whole base or only real/tangible components?",
            "Are high exemptions / graduated rates permissible?",
            "Is a constitutional amendment required?",
            "Is an excise or realization-based alternative (mark-to-market lite / deferred realization) legally safer?",
            "Due Process / Commerce Clause limits on interstate trusts, entities, and nonresidents?",
        ],
        "safer_legal_tracks_to_test": [
            "Intangible-only contribution under Amendment 57 authority",
            "Realization / transfer / deferred payment for illiquid productive assets",
            "Constitutional amendment authorizing residual wealth contribution with anti-raid and exemption floors",
        ],
        "posture": "KEEP_AS_HYPOTHESIS — legal track must clear before any doctrine claim",
    }

    stress = {
        "migration_avoidance": {
            "status": "ILLUSTRATIVE",
            "scenarios": [
                {
                    "base_shrink": 0.10,
                    "revenue_at_1pct_on_full_top_nw_usd": int(round(ar["net_worth_usd"] * 0.9 * 0.01)),
                },
                {
                    "base_shrink": 0.25,
                    "revenue_at_1pct_on_full_top_nw_usd": int(round(ar["net_worth_usd"] * 0.75 * 0.01)),
                },
            ],
            "note": "Not an Arkansas migration study — top wealth is mobile",
        },
        "asset_price_volatility": (
            "Wealth bases swing with markets; residual requirement may rise in downturns when "
            "prosperity engines also weaken — needs Prosperity Fund buffer"
        ),
        "admin_valuation_cost": (
            "Annual valuation of closely held business, farm, and intangible assets is costly and contested"
        ),
        "family_farm_business_effect": (
            "Illiquid productive assets must use exemption/deferral — otherwise the design recreates dispossession"
        ),
    }

    secondary = {
        "phoenix_marketing_millionaire_households_ar": {
            "households_approx": 51532,
            "year_ref": "2019 industry ranking (secondary)",
            "definition": "Households with investable/net worth ≥ $1M — NOT the Residual Wealth Contribution floor",
            "use": "Context only — shows $1M 'millionaire' count is far broader than $11.4M+ IRS top wealthholders",
            "status": "SECONDARY_NOT_PRIMARY_BIND",
        },
        "census_sip_style_median_nw_ar": {
            "median_net_worth_usd_approx": 62500,
            "source_note": "SmartAsset/Census-derived 2023/2026 study secondary",
            "reading": "Ordinary Arkansas households are orders of magnitude below proposed floors",
            "status": "SECONDARY_CONTEXT",
        },
    }

    buckets = {
        "COUNTABLE_NOW_PROSPERITY_ENGINES": {
            "incremental_recurring_usd": 0,
            "verdict": "Unchanged — residual wealth contribution is not a prosperity engine",
        },
        "RESIDUAL_WEALTH_CONTRIBUTION_DESIGN": {
            "status": "MODELED_WITH_BOUND_TOP_WEALTH_AND_MAJOR_GAPS",
            "verdict": (
                "AR top wealth (≥$11.4M NW) bound at ~$48.5B / 2,374 holders; "
                "$250–$500M residuals may be approachable at ~0.5–1% if legal/protection gates clear; "
                "$1–$2B residuals strain or exceed 2% on the bound top base"
            ),
        },
        "SUPERSEDED": {
            "ids": ["RESIDUAL_PROGRESSIVE_INCOME_TAX"],
            "decision_id": SUPERSEDED_DEC,
            "update_id": SUPERSEDED_UPD,
            "verdict": "Income-tax residual approach superseded — do not leave both active",
        },
        "NOT_SUITABLE": {
            "ids": [
                "BROAD_MILLIONAIRE_TAX_ON_1M_NW",
                "TAXING_ORDINARY_LABOR_INCOME_AS_RESIDUAL",
                "FORCED_LIQUIDATION_OF_FAMILY_FARMS_HOMES",
            ],
            "verdict": "Violates social boundary and family-farm/homeownership philosophy",
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
        "status": "RESIDUAL_WEALTH_CONTRIBUTION_MODELED_ZERO_PROSPERITY_COUNTABLE",
        "supersedes": {
            "decision_id": SUPERSEDED_DEC,
            "update_id": SUPERSEDED_UPD,
            "slice_id": "CC-ARKANSAS-RESIDUAL-PROGRESSIVE-INCOME-TAX-TOP-DOWN-MODEL-1.0",
            "replacement": "Residual Wealth Contribution — never ordinary labor income",
        },
        "central_question": (
            "How much revenue can Arkansas raise from households with very high net worth while "
            "fully exempting ordinary homes, retirement security, working farms/small businesses "
            "below a protected threshold, and everyone dependent primarily on labor income?"
        ),
        "key_table_question": (
            "If the remaining gap is $250M / $500M / $1B / $2B, what minimum wealth threshold and "
            "rate would close it while exempting the broadest possible share of Arkansas households?"
        ),
        "philosophy": philosophy,
        "protections": protections,
        "legal_track": legal,
        "arkansas_top_wealth_bind": ar,
        "national_band_shares_used_for_allocation": national_bands,
        "arkansas_bands_illustrative": ar_bands,
        "wealth_bases_modeled": bases,
        "wealth_bases_nee": nee_bases,
        "flat_revenue_on_full_bound_top_nw": flat_on_full,
        "revenue_matrix": matrix,
        "gap_closure_table": gaps,
        "stress": stress,
        "secondary_context": secondary,
        "buckets": buckets,
        "headline_answers": {
            "bound_top_wealth_holders": ar["holders"],
            "bound_top_net_worth_usd": ar["net_worth_usd"],
            "revenue_1pct_on_full_top_nw_usd": int(round(ar["net_worth_usd"] * 0.01)),
            "revenue_0_5pct_on_full_top_nw_usd": int(round(ar["net_worth_usd"] * 0.005)),
            "reading": (
                "On the bound ≥$11.4M NW base (~$48.5B), 0.5% ≈ $243M and 1% ≈ $485M before "
                "avoidance/liquidity/legal haircuts. $2B residual is not closable within a 2% rate "
                "on this base alone. $5M/$10M floors remain unbound for Arkansas."
            ),
        },
        "counted_toward_prosperity_replacement_usd": 0,
        "replacement_target_usd": COMBINED,
        "next_slice": "CC-ARKANSAS-EXTERNAL-INCOME-SECTOR-CAPTURE-1.0",
        "holds": [
            "overall_percent_held_at_43",
            "KEEP_AS_HYPOTHESIS",
            "no_abolish_today",
            "prosperity_engines_still_zero_countable",
            "never_ordinary_labor_income",
            "residual_iit_superseded_by_residual_wealth",
            "constitutional_uniformity_gate_open",
            "illiquid_productive_asset_protections_required",
            "thresholds_not_locked",
        ],
    }

    path = OUT / "residual_wealth_contribution_ledger.json"
    path.write_text(json.dumps(out, indent=2) + "\n", encoding="utf-8")
    print(
        json.dumps(
            {
                "path": str(path),
                "ar_holders": ar["holders"],
                "ar_nw_b": round(ar["net_worth_usd"] / 1e9, 2),
                "flat": {k: round(v / 1e6, 1) for k, v in flat_on_full.items()},
                "gap_preferred": {
                    g["gap_id"]: g["preferred"] for g in gaps
                },
                "supersedes": f"{SUPERSEDED_DEC}/{SUPERSEDED_UPD}",
            },
            indent=2,
            default=str,
        )
    )


if __name__ == "__main__":
    main()
