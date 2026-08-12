#!/usr/bin/env python3
"""Bind DESE M&O/debt mills + ACD county AV×millage for HYP-131 property-tax map."""

from __future__ import annotations

import json
import re
import statistics
from pathlib import Path

import pdfplumber

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "imports" / "arkansas-revenue-replacement"
DL = ROOT / ".local" / "downloads" / "revenue-replacement"
OUT.mkdir(parents=True, exist_ok=True)

SLICE = "CC-PHASE-2.1-ARKANSAS-PROPERTY-TAX-COLLECTIONS-INCIDENCE-AND-DEBT-SERVICE-MAP-1.0"
DEC, UPD = "CC-DEC-126", "UPD-139"


def parse_dese_districts(path: Path) -> list[dict]:
    districts: list[dict] = []
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""
            for raw in text.splitlines():
                line = raw.strip()
                m = re.match(
                    r"^(\d{7})\s+(\S+)\s+(.+?)\s+(-?\d+\.\d{2})\s+(-?\d+\.\d{2})\s+(-?\d+\.\d{2})\s+(-?\d+\.\d{2})\s*$",
                    line,
                )
                if not m:
                    continue
                lea, county, name, mo, dmo, debt, voted = m.groups()
                mo_f, dmo_f, debt_f, voted_f = map(float, (mo, dmo, debt, voted))
                districts.append(
                    {
                        "lea": lea,
                        "county": county.strip(),
                        "district": name.strip(),
                        "mo_mills": mo_f,
                        "dmo_mills": dmo_f,
                        "debt_service_mills": debt_f,
                        "voted_mills": voted_f,
                        "mo_total_mills": round(mo_f + dmo_f, 2),
                        "mo_above_urt_mills": round(max(0.0, mo_f + dmo_f - 25.0), 2),
                        "sum_check_fail": abs((mo_f + dmo_f + debt_f) - voted_f) > 0.06,
                    }
                )
    return districts


def parse_county_av(path: Path) -> list[dict]:
    with pdfplumber.open(path) as pdf:
        full = "\n".join((p.extract_text() or "") for p in pdf.pages)
    county_av: list[dict] = []
    for line in full.splitlines():
        line = line.strip()
        if "County" not in line or not re.search(r"\d", line):
            continue
        m = re.match(r"^(.+? County)\s+(.+)$", line)
        if not m:
            continue
        name, rest = m.group(1), m.group(2)
        if name.startswith("State "):
            continue
        # Repair OCR/spacing inside a single number: "4 5,849,830" -> "45,849,830"
        # Do NOT collapse spaces between complete comma-formatted numbers.
        rest2 = re.sub(r"(?<![,\d])(\d) (\d{1,3}(?:,\d{3})+)", r"\1\2", rest)
        rest2 = re.sub(r",\s+", ",", rest2)
        tokens = rest2.split()
        nums: list[int | None] = []
        for tok in tokens:
            if tok in ("-", "—"):
                nums.append(0)
                continue
            if re.fullmatch(r"\d{1,3}(?:,\d{3})+|\d+", tok):
                nums.append(int(tok.replace(",", "")))
        if len(nums) < 4:
            continue
        real, mineral, personal, utility = nums[:4]
        assert real is not None and mineral is not None and personal is not None and utility is not None
        county_av.append(
            {
                "county": name.replace(" County", "").strip(),
                "real_estate": real,
                "mineral": mineral,
                "personal": personal,
                "utility": utility,
                "total_assessed": real + mineral + personal + utility,
            }
        )
    return county_av


def parse_county_mills(path: Path) -> dict[str, dict]:
    county_mills: dict[str, dict] = {}
    with pdfplumber.open(path) as pdf:
        text = "\n".join((pdf.pages[i].extract_text() or "") for i in range(2, 4))
    for line in text.splitlines():
        m = re.match(
            r"^([A-Za-z .]+?)\s+(\d+\.\d+)\s+(\d+\.\d+)\s+(\d+\.\d+)\s+(\d+\.\d+)\s*$",
            line.strip(),
        )
        if not m:
            continue
        name, sch, city, cty, overall = m.groups()
        name = name.strip()
        if name in ("County", "Average", "School") or name.startswith("Average"):
            continue
        row = {
            "school": float(sch),
            "city": float(city),
            "county": float(cty),
            "overall": float(overall),
        }
        if name == "State Averages":
            county_mills["__STATE__"] = row
        else:
            county_mills[name] = row
    return county_mills


def find_mill_row(county_mills: dict, key: str) -> dict | None:
    if key in county_mills:
        return county_mills[key]
    for k, v in county_mills.items():
        if k.replace(".", "").lower() == key.replace(".", "").lower():
            return v
    return None


def main() -> None:
    dese_path = DL / "dese_millage_report_2025_for_2026_collections.pdf"
    districts = parse_dese_districts(dese_path)
    if len(districts) < 200:
        raise SystemExit(f"DESE parse too small: {len(districts)}")

    mo = [d["mo_total_mills"] for d in districts]
    debt = [d["debt_service_mills"] for d in districts]
    voted = [d["voted_mills"] for d in districts]
    mo_above = [d["mo_above_urt_mills"] for d in districts]
    non_urt = sum(mo_above) + sum(debt)
    dese_summary = {
        "source": {
            "label": "DESE Millage Report 2024 (Voted) — final for collection in 2026",
            "url": "https://dese-admin.ade.arkansas.gov/Files/Millage_Report_2024_Includes_Rollback_FAS.pdf",
            "note": "Rates adjusted for rollback. Columns: M&O, Dedicated M&O, Debt Service, Voted total.",
        },
        "district_count": len(districts),
        "sum_check_failures": sum(1 for d in districts if d["sum_check_fail"]),
        "simple_averages": {
            "mo_total_mills": round(statistics.mean(mo), 4),
            "mo_above_urt_mills": round(statistics.mean(mo_above), 4),
            "debt_service_mills": round(statistics.mean(debt), 4),
            "voted_mills": round(statistics.mean(voted), 4),
        },
        "medians": {
            "mo_total_mills": round(statistics.median(mo), 4),
            "mo_above_urt_mills": round(statistics.median(mo_above), 4),
            "debt_service_mills": round(statistics.median(debt), 4),
            "voted_mills": round(statistics.median(voted), 4),
        },
        "share_of_non_urt_mills_that_are_debt": round(sum(debt) / non_urt, 4) if non_urt else None,
        "share_of_non_urt_mills_that_are_additional_mo": round(sum(mo_above) / non_urt, 4)
        if non_urt
        else None,
        "districts_with_debt_service_gt_0": sum(1 for d in debt if d > 0),
        "districts_with_mo_above_urt_gt_0": sum(1 for d in mo_above if d > 0),
    }

    county_av = parse_county_av(DL / "acd_assessed_values_2024.pdf")
    county_mills = parse_county_mills(DL / "2025-millage-2026-collections.pdf")
    joined = []
    missing = []
    for c in county_av:
        mrow = find_mill_row(county_mills, c["county"])
        if not mrow:
            missing.append(c["county"])
            continue
        av = c["total_assessed"]
        joined.append(
            {
                **c,
                "avg_school_mills": mrow["school"],
                "avg_city_mills": mrow["city"],
                "avg_county_mills": mrow["county"],
                "avg_overall_mills": mrow["overall"],
                "school_theoretical_levy": av * mrow["school"] / 1000.0,
                "county_theoretical_levy": av * mrow["county"] / 1000.0,
            }
        )

    school_levy = sum(j["school_theoretical_levy"] for j in joined)
    county_levy = sum(j["county_theoretical_levy"] for j in joined)
    statewide_taxable_2025 = 73_937_121_379
    urt_bound = 1_602_678_681
    urt_theoretical_25 = statewide_taxable_2025 * 25 / 1000.0
    collection_factor = urt_bound / urt_theoretical_25
    av2024_sum = sum(c["total_assessed"] for c in county_av)
    scale_to_2025 = statewide_taxable_2025 / av2024_sum if av2024_sum else 1.0
    school_levy_2025eq = school_levy * scale_to_2025
    county_levy_2025eq = county_levy * scale_to_2025
    school_collections_est = school_levy_2025eq * collection_factor
    county_collections_est = county_levy_2025eq * collection_factor

    avg_mo_above = dese_summary["simple_averages"]["mo_above_urt_mills"]
    avg_debt = dese_summary["simple_averages"]["debt_service_mills"]
    debt_share = dese_summary["share_of_non_urt_mills_that_are_debt"] or 0.0
    mo_share = dese_summary["share_of_non_urt_mills_that_are_additional_mo"] or 0.0
    additional_school_collections = max(0.0, school_collections_est - urt_bound)
    # Preferred: split county-AV-weighted school collections above URT by DESE mill shares
    debt_collections_est = additional_school_collections * debt_share
    addl_mo_collections_est = additional_school_collections * mo_share
    # Cross-check: simple-average DESE mills × statewide taxable × collection factor
    debt_mill_method = statewide_taxable_2025 * avg_debt / 1000.0 * collection_factor
    addl_mo_mill_method = statewide_taxable_2025 * avg_mo_above / 1000.0 * collection_factor

    # Category dollars from AACD 2026 Annual Report (2025 taxable) — cited in prior bind
    categories_2025 = {
        "agricultural_land": 2_012_690_609,
        "agricultural_improvements": 2_623_586_468,
        "residential_incl_manufactured": 33_555_278_677,
        "minerals": 304_565_952,
        "business_personal": 7_935_130_795,
        "vehicles": 8_531_320_595,
        "industrial": 834_210_485,
        "utility": 6_426_099_061,
        "commercial": 11_714_238_737,
    }
    cat_sum = sum(categories_2025.values())
    cat_shares = {k: round(v / statewide_taxable_2025, 4) for k, v in categories_2025.items()}

    total_property_from_school_share = school_collections_est / 0.79
    muni_share_est = total_property_from_school_share * 0.07
    special_share_est = total_property_from_school_share * 0.01

    preferred = {
        "school_urt_bound_usd": urt_bound,
        "school_additional_mo_preferred_usd": round(addl_mo_collections_est),
        "school_debt_service_preferred_usd": round(debt_collections_est),
        "school_total_collections_est_county_av_weighted_usd": round(school_collections_est),
        "county_collections_est_av_weighted_usd": round(county_collections_est),
        "municipal_share_method_usd": round(muni_share_est),
        "special_share_method_usd": round(special_share_est),
        "crosscheck_dese_simple_avg_mill_method_usd": {
            "school_additional_mo": round(addl_mo_mill_method),
            "school_debt_service": round(debt_mill_method),
        },
        "methods": {
            "school_total": "Sum(county_avg_school_mills × county_2024_AV) × scale_to_2025_taxable × URT_collection_factor",
            "debt_and_addl_mo_preferred": "Allocate (school_total_est − URT_bound) by DESE unweighted mill shares of Debt vs M&O-above-URT across 233 LEAs",
            "debt_and_addl_mo_crosscheck": "DESE simple-average mills × 2025 statewide taxable × URT_collection_factor",
            "municipal_special": "AAC contextual share on school-implied property total — not official DFA dollar table",
        },
        "key_finding": "DESE mill structure: ~94% of non-URT school mills are debt service; additional M&O above URT is small on average (~0.9 mills).",
    }

    legal = [
        {
            "layer_id": "LAYER-SCHOOL-URT-25",
            "name": "School Uniform Rate of Tax (25 mills)",
            "legal_class": "CONSTITUTIONAL",
            "authority": "Ark. Const. Art. 14, § 3",
            "admin_replaceable": False,
            "requires_state_statute": True,
            "requires_constitutional_change": True,
            "debt_covenant_blocker": False,
            "retirement_gate": "Demonstrated recurring replacement + constitutional redesign/amendment path",
            "sequence_position": "LATE — after local M&O pilots and additional school millage path",
        },
        {
            "layer_id": "LAYER-SCHOOL-ADDITIONAL-MO",
            "name": "Additional school M&O above URT",
            "legal_class": "STATUTORY_LOCAL_VOTER",
            "authority": "Local school elections / school millage statutes; rollback rules (e.g. A.C.A. § 6-14-115)",
            "admin_replaceable": False,
            "requires_state_statute": True,
            "requires_constitutional_change": False,
            "debt_covenant_blocker": False,
            "retirement_gate": "District-by-district when replacement dollars reserved for same M&O obligations",
            "sequence_position": "MID — after debt protection and vulnerable-household relief",
        },
        {
            "layer_id": "LAYER-SCHOOL-DEBT-SERVICE",
            "name": "School debt-service millage",
            "legal_class": "CONTRACTUAL_PLUS_LOCAL_VOTER",
            "authority": "Voter-approved bonds; pledged debt-service mills; DESE bonded debt assistance context (A.C.A. § 6-20-2503)",
            "admin_replaceable": False,
            "requires_state_statute": True,
            "requires_constitutional_change": False,
            "debt_covenant_blocker": True,
            "retirement_gate": "Cannot retire while pledged mills required for outstanding obligations; refinance/defease or wait maturity",
            "sequence_position": "FIRST PROTECTED — do not cut pledged debt mills",
        },
        {
            "layer_id": "LAYER-COUNTY",
            "name": "County millage",
            "legal_class": "STATUTORY_LOCAL",
            "authority": "Quorum court levies within constitutional/statutory caps",
            "admin_replaceable": "PARTIAL",
            "requires_state_statute": "LIKELY_FOR_FULL_RETIREMENT",
            "requires_constitutional_change": False,
            "debt_covenant_blocker": "POSSIBLE",
            "retirement_gate": "County-class by class; preserve pledged debt mills",
            "sequence_position": "EARLY/MID local M&O replacement candidates",
        },
        {
            "layer_id": "LAYER-MUNICIPAL",
            "name": "Municipal millage",
            "legal_class": "STATUTORY_LOCAL",
            "authority": "City levies; some voter-approved; pension/bond dedications",
            "admin_replaceable": "PARTIAL",
            "requires_state_statute": "LIKELY_FOR_FULL_RETIREMENT",
            "requires_constitutional_change": False,
            "debt_covenant_blocker": "YES for city bond mills",
            "retirement_gate": "Separate general vs pension vs bond; bond mills protected",
            "sequence_position": "EARLY/MID with bond protection",
        },
        {
            "layer_id": "LAYER-SPECIAL-DISTRICTS",
            "name": "Special districts / other",
            "legal_class": "VARIES_BY_AUTHORIZING_LAW",
            "authority": "District-specific statutes",
            "admin_replaceable": False,
            "requires_state_statute": True,
            "requires_constitutional_change": False,
            "debt_covenant_blocker": "VARIES",
            "retirement_gate": "Entity-by-entity legal read",
            "sequence_position": "CASE-BY-CASE",
        },
    ]

    dese_out = {
        "version": "1.0.0",
        "slice_id": SLICE,
        "generated_at": "2026-08-12",
        "decision_id": DEC,
        "update_id": UPD,
        "summary": dese_summary,
        "districts": districts,
    }
    (OUT / "dese_school_millage_mo_debt_bind.json").write_text(
        json.dumps(dese_out, indent=2) + "\n", encoding="utf-8"
    )

    county_out = {
        "version": "1.0.0",
        "slice_id": SLICE,
        "generated_at": "2026-08-12",
        "decision_id": DEC,
        "update_id": UPD,
        "sources": {
            "assessed_values_2024": {
                "label": "AACD 2024 Assessed Values (Taxes Payable 2025)",
                "url": "https://www.dfa.arkansas.gov/wp-content/uploads/AssessedValuesReported_2024.pdf",
                "statewide_sum_parsed": av2024_sum,
                "county_count": len(county_av),
            },
            "millage_averages_2025": {
                "label": "AACD 2025 Millage Report (2026 Collections) — county averages",
                "url": "https://www.dfa.arkansas.gov/wp-content/uploads/2025-millage-2026-collections.pdf",
                "state_averages": county_mills.get("__STATE__"),
            },
            "taxable_2025_statewide": {
                "label": "AACD 2026 Annual Report — 2025 taxable value",
                "statewide_taxable_value_2025": statewide_taxable_2025,
            },
            "urt_collection_factor": {
                "urt_bound_usd": urt_bound,
                "urt_25_theoretical_levy_usd": urt_theoretical_25,
                "factor": collection_factor,
            },
            "scale_2024_av_to_2025_taxable": scale_to_2025,
        },
        "counties": joined,
        "aggregates": {
            "school_theoretical_levy_2024av_usd": round(school_levy),
            "school_theoretical_levy_2025eq_usd": round(school_levy_2025eq),
            "school_collections_est_usd": round(school_collections_est),
            "county_theoretical_levy_2024av_usd": round(county_levy),
            "county_theoretical_levy_2025eq_usd": round(county_levy_2025eq),
            "county_collections_est_usd": round(county_collections_est),
            "missing_county_millage_join": missing,
        },
        "municipal_warning": "City average millages must NOT be multiplied by full county AV.",
    }
    (OUT / "county_av_millage_levy_map.json").write_text(
        json.dumps(county_out, indent=2) + "\n", encoding="utf-8"
    )

    layers = {
        "version": "2.0.0",
        "slice_id": SLICE,
        "generated_at": "2026-08-12",
        "decision_id": DEC,
        "update_id": UPD,
        "supersedes_note": "Replaces v1 estimated mixed school-additional layer with DESE M&O vs debt split",
        "rule": "$1 of school URT ≠ $1 of city millage ≠ $1 of bonded debt-service millage. Replace millage-class by millage-class.",
        "preferred_dollars": preferred,
        "layers": [
            {
                "id": "LAYER-SCHOOL-URT-25",
                "status": "BOUND",
                "current_dollars": urt_bound,
                "mills": 25,
                "recipient": "Traditional public school foundation M&O",
                "legal_dependency": "CONSTITUTIONAL",
                "transition_hardness": "CONSTITUTIONAL",
            },
            {
                "id": "LAYER-SCHOOL-ADDITIONAL-MO",
                "status": "ESTIMATED_SCHOOL_TOTAL_MINUS_URT_X_DESE_SHARE",
                "average_mills_above_urt": avg_mo_above,
                "estimated_collections_usd": round(addl_mo_collections_est),
                "crosscheck_simple_avg_mill_method_usd": round(addl_mo_mill_method),
                "recipient": "School district M&O above foundation",
                "legal_dependency": "STATUTORY_LOCAL_VOTER",
                "transition_hardness": "STATUTORY_LOCAL",
                "debt_covenant_blocker": False,
            },
            {
                "id": "LAYER-SCHOOL-DEBT-SERVICE",
                "status": "ESTIMATED_SCHOOL_TOTAL_MINUS_URT_X_DESE_SHARE",
                "average_debt_service_mills": avg_debt,
                "estimated_collections_usd": round(debt_collections_est),
                "crosscheck_simple_avg_mill_method_usd": round(debt_mill_method),
                "dese_share_of_non_urt_mills": debt_share,
                "recipient": "School bonded debt service",
                "legal_dependency": "CONTRACTUAL_PLUS_LOCAL_VOTER",
                "transition_hardness": "CONTRACTUAL_PLUS_LOCAL",
                "debt_covenant_blocker": True,
                "note": "Protected first in any retirement sequence. District-AV-weighted collections still NEE.",
            },
            {
                "id": "LAYER-COUNTY",
                "status": "ESTIMATED_COUNTY_AV_WEIGHTED",
                "estimated_collections_usd": round(county_collections_est),
                "recipient": "County general/road/library/hospital/college/other",
                "legal_dependency": "STATUTORY_LOCAL",
                "transition_hardness": "STATUTORY_LOCAL",
            },
            {
                "id": "LAYER-MUNICIPAL",
                "status": "ESTIMATED_SHARE_METHOD",
                "estimated_collections_usd": round(muni_share_est),
                "recipient": "City general/pension/library/bond/park/other",
                "legal_dependency": "STATUTORY_LOCAL",
                "transition_hardness": "STATUTORY_LOCAL",
                "note": "Bond/pension subclasses not yet dollar-split statewide.",
            },
            {
                "id": "LAYER-SPECIAL-DISTRICTS",
                "status": "ESTIMATED_SHARE_METHOD",
                "estimated_collections_usd": round(special_share_est),
                "recipient": "Special districts / other",
                "legal_dependency": "VARIES",
                "transition_hardness": "VARIES",
            },
        ],
        "replacement_burden_summary_usd": {
            "school_urt_bound": urt_bound,
            "school_additional_mo_estimated": round(addl_mo_collections_est),
            "school_debt_service_estimated": round(debt_collections_est),
            "county_estimated": round(county_collections_est),
            "municipal_estimated": round(muni_share_est),
            "special_estimated": round(special_share_est),
            "property_layers_sum": round(
                urt_bound
                + addl_mo_collections_est
                + debt_collections_est
                + county_collections_est
                + muni_share_est
                + special_share_est
            ),
        },
        "legal_dependency_matrix": legal,
        "category_taxable_value_2025": {
            "source": "AACD 2026 Annual Report statewide taxable value by category (2025)",
            "dollars": categories_2025,
            "shares_of_statewide_taxable": cat_shares,
            "sum_categories": cat_sum,
            "statewide_total": statewide_taxable_2025,
            "category_sum_vs_statewide_diff": statewide_taxable_2025 - cat_sum,
        },
        "proposed_retirement_sequence": [
            "Protect debt-service obligations first",
            "Vulnerable-household relief (not abolition)",
            "Selected local county/municipal M&O replacement where incremental capacity exists",
            "Additional school M&O replacement district-by-district",
            "URT constitutional transition only after demonstrated carry capacity",
            "Final property-tax retirement",
        ],
    }
    (OUT / "property_tax_layer_structure.json").write_text(
        json.dumps(layers, indent=2) + "\n", encoding="utf-8"
    )

    incidence = {
        "version": "1.0.0",
        "slice_id": SLICE,
        "generated_at": "2026-08-12",
        "decision_id": DEC,
        "update_id": UPD,
        "status": "STRUCTURAL_CATEGORY_BIND_HOUSEHOLD_TABLES_NEE",
        "rule": "Surface who bears property tax before designing replacement. Renter burden through rents is economic incidence, not just statutory liability.",
        "bound_structural_base": {
            "statewide_taxable_2025": statewide_taxable_2025,
            "category_shares": cat_shares,
            "interpretation": {
                "residential_share": cat_shares["residential_incl_manufactured"],
                "commercial_plus_industrial_share": round(
                    cat_shares["commercial"] + cat_shares["industrial"], 4
                ),
                "agricultural_land_plus_improvements_share": round(
                    cat_shares["agricultural_land"] + cat_shares["agricultural_improvements"], 4
                ),
                "utility_share": cat_shares["utility"],
                "business_personal_share": cat_shares["business_personal"],
                "vehicles_share": cat_shares["vehicles"],
            },
        },
        "household_incidence": {
            "owner_occupier_statutory": "NEE — need parcel/ACS join by income quintile and county",
            "renter_economic_through_rents": "NEE — must not treat renters as zero-incidence",
            "commercial_industrial": "PARTIAL — category AV shares bound; firm-level pass-through NEE",
            "agricultural_land_treatment": "PARTIAL — ag land + improvements AV bound; preferential assessment legal map incomplete",
        },
        "geographic_variation": {
            "status": "PARTIAL_COUNTY_AV_AND_MILLAGE",
            "artifact": "data/imports/arkansas-revenue-replacement/county_av_millage_levy_map.json",
        },
        "still_nee": [
            "ACS/income-quintile property-tax burden tables for Arkansas",
            "Renter incidence / rent pass-through estimates",
            "District-level assessed value for true AV-weighted school debt vs M&O dollars",
            "Municipal AV-weighted collections and city bond vs general split",
            "Special-district parcel inventory",
            "Debt covenant inventory / maturity schedule statewide",
        ],
    }
    (OUT / "property_tax_incidence_structure.json").write_text(
        json.dumps(incidence, indent=2) + "\n", encoding="utf-8"
    )

    print(
        json.dumps(
            {
                "dese_districts": len(districts),
                "counties_joined": len(joined),
                "missing": missing,
                "dese_avg": dese_summary["simple_averages"],
                "debt_share_non_urt": dese_summary["share_of_non_urt_mills_that_are_debt"],
                "preferred": preferred,
                "property_layers_sum": layers["replacement_burden_summary_usd"]["property_layers_sum"],
                "category_diff": statewide_taxable_2025 - cat_sum,
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
