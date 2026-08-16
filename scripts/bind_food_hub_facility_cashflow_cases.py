#!/usr/bin/env python3
"""Food-hub and processing facility cashflow case bind (HYP-131).

Narrow question: Which Arkansas food hubs, co-ops, and cold-storage/processing
facilities can show audited (or otherwise defensible) operating economics that
reconstruct throughput → costs → operating surplus → free/distributable cash?

Hard separations (locked):
  1) Economic base / cash receipts  ≠  facility cashflow
  2) Facility profit               ≠  public revenue
  3) Ownership structure tests come AFTER defensible facility surplus

COUNTABLE remains $0 until reserved public cash is proven.
"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "imports" / "arkansas-revenue-replacement"
OUT.mkdir(parents=True, exist_ok=True)

SLICE = "CC-ARKANSAS-FOOD-HUB-AND-PROCESSING-FACILITY-CASHFLOW-CASE-BIND-1.0"
DEC, UPD = "CC-DEC-147", "UPD-160"
DEMOTED_BASE_16Y = 836_986_729
CASH_RECEIPTS_2023 = 13_100_000_000

# Required cashflow reconstruction fields (from Steve lock)
REQUIRED_LINE_ITEMS = [
    "throughput",
    "procurement_cost",
    "labor",
    "utilities",
    "transportation",
    "processing_packaging",
    "debt_service",
    "maintenance_capex",
    "administrative_expense",
    "revenue",
    "operating_margin",
    "free_distributable_cash",
]

OWNERSHIP_STRUCTURES_TO_TEST_LATER = [
    "private",
    "cooperative",
    "municipal_public_authority",
    "public_private",
    "other_mixed",
]


def cases() -> list[dict]:
    return [
        {
            "id": "FHC-001",
            "name": "Arkansas Local Food Network (ALFN)",
            "entity_type": "501c3_aggregation_market_not_processing_plant",
            "geography": "Little Rock / Pulaski County",
            "ein": "16-1760329",
            "evidence_quality": "FORM_990EZ_SECONDARY_COMPILE",
            "years": {
                "2024": {
                    "total_revenue_usd": 132_303,
                    "program_services_usd": 127_795,
                    "contributions_usd": 4_508,
                    "total_expenses_usd": 128_180,
                    "implied_surplus_usd": 4_123,
                    "total_assets_usd": 20_970,
                },
                "2023": {
                    "total_revenue_usd": 137_283,
                    "program_services_usd": 130_579,
                    "contributions_usd": 6_704,
                    "total_expenses_usd": None,
                    "note": "Expenses not fully line-itemed in secondary compile for 2023",
                },
            },
            "line_items_reconstructed": {
                "throughput": "NEE — no volume/lbs/SKU throughput published on 990-EZ",
                "procurement_cost": "NEE",
                "labor": "PARTIAL — 990 shows minimal paid staff/contractors; not a full labor cost model",
                "utilities": "NEE",
                "transportation": "NEE",
                "processing_packaging": "N/A_OR_MINIMAL — online market / farmers-market aggregation, not a processing plant",
                "debt_service": "NEE",
                "maintenance_capex": "NEE",
                "administrative_expense": "PARTIAL — rolled into total expenses",
                "revenue": "BOUND",
                "operating_margin": "THIN_ILLUSTRATIVE — ~3% of revenue in 2024 if surplus≈$4.1k on $132k",
                "free_distributable_cash": "NOT_DEMONSTRATED_AS_RESERVED_PUBLIC_CASH",
            },
            "operating_surplus_status": "NEGLIGIBLE_AND_NOT_RESERVED",
            "public_share_test": "NOT_REACHED — no material free cash to allocate across ownership structures",
            "countable_now_usd": 0,
            "action": "KEEP_AS_OPERATING_CASE_ZERO_COUNTABLE",
            "reading": (
                "Real Arkansas local-food organization with audited-adjacent IRS filings. "
                "Scale is tiny relative to $13.1B cash receipts. Thin surplus is not a "
                "Replacement Stack feeder and is not a processing-facility P&L."
            ),
            "sources": [
                "https://projects.propublica.org/nonprofits/organizations/161760329",
                "https://www.causeiq.com/organizations/arkansas-local-food-network,161760329/",
                "https://arkansaslocalfoodnetwork.org/",
            ],
        },
        {
            "id": "FHC-002",
            "name": "Arkansas Food Innovation Center at Market Center of the Ozarks (AFIC@MCO)",
            "entity_type": "shared_use_kitchen_and_contract_processing_facility",
            "geography": "Springdale / Northwest Arkansas",
            "facility_scale_note": "Reported ~45,000 sq ft food processing / shared kitchen facility",
            "evidence_quality": "FACILITY_PRESENCE_BOUND_P_AND_L_NEE",
            "line_items_reconstructed": {k: "NEE" for k in REQUIRED_LINE_ITEMS},
            "operating_surplus_status": "UNKNOWN",
            "public_share_test": "NOT_REACHED",
            "countable_now_usd": 0,
            "action": "INVENTORY_ONLY_REQUEST_FINANCIALS",
            "reading": (
                "Important Arkansas processing infrastructure exists. Without published "
                "throughput, fee schedule, O&M, debt, and net cash, it cannot enter COUNTABLE."
            ),
            "next_evidence": "UADA/AFIC operating statements, utilization rates, fee schedule, net cash after O&M/debt",
            "sources": ["https://aficmco.uada.edu/"],
        },
        {
            "id": "FHC-003",
            "name": "Cypress Cold Storage (Springdale expansion; NLR/Maumelle footprint)",
            "entity_type": "private_commercial_cold_storage",
            "geography": "Springdale; North Little Rock; Maumelle",
            "facility_scale_note": "207,285 sq ft Springdale project announced; private operator",
            "evidence_quality": "CAPACITY_ANNOUNCEMENT_ONLY_NO_PUBLIC_P_AND_L",
            "line_items_reconstructed": {k: "NEE" for k in REQUIRED_LINE_ITEMS},
            "operating_surplus_status": "PRIVATE_UNPUBLISHED",
            "public_share_test": "NOT_REACHED — private profit is not public cash",
            "countable_now_usd": 0,
            "action": "INVENTORY_ONLY_NO_RAID",
            "reading": (
                "Cold-chain capacity is real and relevant to External Income retention. "
                "Private warehouse P&L is not a Tax Retirement Fund feeder."
            ),
            "sources": [
                "https://www.arkansasedc.com/news-events/newsroom/detail/2023/04/24/cypress-cold-storage-breaks-ground-on-new-state-of-the-art-cold-storage-facility-in-springdale"
            ],
        },
        {
            "id": "FHC-004",
            "name": "Frez-N-Stor / commercial cold storage operators (NWA)",
            "entity_type": "private_commercial_cold_storage",
            "geography": "Northwest Arkansas (+ out-of-state facilities)",
            "evidence_quality": "OPERATOR_EXISTENCE_ONLY_NO_PUBLIC_P_AND_L",
            "line_items_reconstructed": {k: "NEE" for k in REQUIRED_LINE_ITEMS},
            "operating_surplus_status": "PRIVATE_UNPUBLISHED",
            "public_share_test": "NOT_REACHED",
            "countable_now_usd": 0,
            "action": "INVENTORY_ONLY",
            "sources": ["https://www.fnscold.com/about"],
        },
    ]


def national_benchmark_context() -> dict:
    return {
        "status": "DESIGN_CONTEXT_NOT_ARKANSAS_COUNTABLE",
        "rule": "National hub benchmarks inform why facility surplus is hard — they do not invent Arkansas cash",
        "findings": [
            {
                "claim": "Typical food hub near break-even; average profit about -2%; top quartile ~4%",
                "source": "Counting Values: Food Hub Financial Benchmarking Study (Farm Credit East / Wallace Center / Farm Credit Council)",
                "url": "https://nesawg.org/sites/default/files/Food%20Hub%20Benchmarking%20Study.pdf",
            },
            {
                "claim": "Typical gross margin ~14.5% of sales — thin cover for overhead/profit",
                "source": "Counting Values benchmarking study",
            },
            {
                "claim": "Nonprofit hubs often negative before grants; for-profits near ~1% in that sample",
                "source": "Counting Values benchmarking study",
            },
            {
                "claim": "USDA modeling treats ~5.5% of sales retained as operating profit as a viability benchmark — requires substantial sales scale",
                "source": "USDA RD SR77 Food Hubs Vol. 3",
                "url": "https://www.rd.usda.gov/sites/default/files/publications/SR77_FoodHubs_Vol3.pdf",
            },
        ],
        "implication_for_arkansas": (
            "Even if Arkansas builds hubs, national evidence warns of thin margins. "
            "Do not jump from facility existence or farm cash receipts to reserved public cash."
        ),
    }


def ownership_gate() -> dict:
    return {
        "rule": "Do not jump from facility profit → public revenue",
        "sequence": [
            "reconstruct_facility_cashflow",
            "confirm_free_distributable_cash_after_reinvestment_and_reserves",
            "THEN_test_ownership_structures",
            "THEN_test_what_portion_could_legally_and_sustainably_become_reserved_public_cash",
        ],
        "ownership_structures_queued": OWNERSHIP_STRUCTURES_TO_TEST_LATER,
        "status": "GATE_NOT_OPEN — no Arkansas case cleared free-distributable-cash reconstruction",
        "countable_now_usd": 0,
    }


def evidence_chain_target() -> dict:
    return {
        "current": "Arkansas production ($13.1B receipts) → illustrative retention → $0 COUNTABLE",
        "target_when_earned": (
            "Arkansas production → facility throughput → value added → operating surplus → "
            "reinvestment/reserves → ownership distribution → public share → reserved public cash"
        ),
        "this_slice_progress": "Opened facility-case hunt; reconstructed only one tiny aggregation P&L; processing plants still NEE",
    }


def resilience_ridealong() -> dict:
    return {
        "id": "RES-OBJ-FOOD-HUB-DOLLAR-PATH",
        "role": "RIDES_ALONGSIDE_FACILITY_EVIDENCE_NO_SEPARATE_BUILD",
        "states_applied_to_cases": {
            "normal": "ALFN thin surplus already near zero — little buffer",
            "volume_decline_or_recession": "National thin-margin hubs go negative faster; ALFN-scale entities have almost no shock absorber",
            "commodity_price_shock": "Procurement and sales move together — margin reconstruction required before any public-share claim",
            "input_inflation_or_transport_disruption": "Utilities/transport/labor line items NEE for AR processing plants — cannot stress what is not bound",
        },
        "countable_impact_usd": 0,
        "alters_fiscal_projections": False,
    }


def build() -> dict:
    case_list = cases()
    full_reconstructions = sum(
        1
        for c in case_list
        if all(
            c["line_items_reconstructed"].get(k) not in (None, "NEE", "N/A_OR_MINIMAL")
            for k in REQUIRED_LINE_ITEMS
        )
    )
    free_cash_ready = sum(
        1
        for c in case_list
        if c.get("operating_surplus_status")
        not in ("NEGLIGIBLE_AND_NOT_RESERVED", "UNKNOWN", "PRIVATE_UNPUBLISHED")
    )

    ledger = {
        "version": "1.0.0",
        "slice_id": SLICE,
        "generated_at": "2026-08-15",
        "decision_id": DEC,
        "update_id": UPD,
        "hypothesis_id": "CC-HYP-PROSPERITY-BASED-REVENUE-REPLACEMENT-SYSTEM",
        "incubator_alias": "HYP-131",
        "engine_id": "ENGINE-EXTERNAL-INCOME",
        "prior_slice": "CC-ARKANSAS-FOOD-HUB-OWNERSHIP-AND-PROCESSING-MARGIN-BIND-1.0",
        "status": "FACILITY_CASE_HUNT_ZERO_COUNTABLE",
        "central_question": (
            "Which Arkansas food hubs / co-ops / cold-storage / processing facilities can show "
            "audited or otherwise defensible operating cases reconstructing throughput, costs, "
            "operating margin, and free/distributable cash — without jumping from facility profit to public revenue?"
        ),
        "hard_separations": [
            "cash_receipts_ne_facility_cashflow",
            "facility_profit_ne_public_revenue",
            "ownership_tests_only_after_defensible_surplus",
        ],
        "required_line_items": REQUIRED_LINE_ITEMS,
        "cases_scored": case_list,
        "national_benchmark_context": national_benchmark_context(),
        "ownership_gate": ownership_gate(),
        "evidence_chain": evidence_chain_target(),
        "resilience_ridealong": resilience_ridealong(),
        "countable_now_usd": 0,
        "promoted_to_countable": [],
        "cases_with_bound_revenue": sum(
            1 for c in case_list if c["line_items_reconstructed"].get("revenue") == "BOUND"
        ),
        "cases_with_full_line_item_reconstruction": full_reconstructions,
        "cases_with_free_distributable_cash_for_public_share_test": free_cash_ready,
        "replacement_stack_feed": {
            "dollars_added_to_countable": 0,
            "demoted_base_16y_ceiling_unchanged_usd": DEMOTED_BASE_16Y,
            "prior_cash_receipts_context_usd": CASH_RECEIPTS_2023,
            "rule": "No jump from facility existence or thin nonprofit surplus to Replacement Stack",
        },
        "headline": {
            "reading": (
                "Facility hunt finds one small Form 990 aggregation case (~$132k revenue, thin surplus) "
                "and several real facilities without public P&Ls. National benchmarks warn food hubs are "
                "thin-margin. Ownership-structure and public-share tests remain gated. COUNTABLE $0."
            )
        },
        "build_next": [
            "Request/bind AFIC@MCO (and similar shared kitchens) operating statements + utilization + fees",
            "Expand Arkansas hub/co-op 990 and audited financial census beyond ALFN",
            "Separate lease-net cases for any publicly owned cold storage / kitchens",
            "Only after free cash exists: ownership-structure matrix → reserved public cash test",
            "Primary-bind ERS cash-receipts commodity table (carry-forward from prior slice)",
        ],
        "next_slice": "CC-ARKANSAS-FOOD-FACILITY-OPERATING-STATEMENT-AND-UTILIZATION-BIND-1.0",
        "parallel": [
            "CC-ARKANSAS-AEDC-INCENTIVE-EQUITY-CONVERSION-LEGAL-MEMO-1.0",
            "CC-PHASE-2.1-BASELINE-DEFINITION-LOCKS-AND-NEXT-LEGITIMATE-FILLS-1.0",
        ],
        "holds": [
            "overall_percent_held_at_43",
            "KEEP_AS_HYPOTHESIS",
            "no_abolish_today",
            "facility_profit_ne_public_revenue",
            "zero_counted_until_reserved_cash",
            "hyp134_quarantined_from_countable",
            "resilience_rides_along_no_separate_build",
            "fewer_new_architectures_more_evidence",
        ],
    }

    path = OUT / "food_hub_facility_cashflow_case_ledger.json"
    path.write_text(json.dumps(ledger, indent=2) + "\n", encoding="utf-8")
    return {
        "path": str(path),
        "countable_now": 0,
        "cases": len(case_list),
        "full_reconstructions": full_reconstructions,
        "free_cash_for_public_share": free_cash_ready,
    }


if __name__ == "__main__":
    print(json.dumps(build()))
