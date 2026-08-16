#!/usr/bin/env python3
"""Food-hub ownership and processing-margin bind (HYP-131 / EIM-005).

Question: What incremental reserved public cash can Arkansas earn from
cooperative/community food-hub ownership and in-state processing margins —
and can we trace an Arkansas dollar through the pathway under normal
conditions and a serious economic shock?

Hard wall: farm cash receipts ≠ processing margins ≠ public revenue.
Lane: evidence → retained value → reservable cash → Replacement Stack only
if audited reserved dollars exist. Resilience gets this pathway as its first
concrete test object — not a new theoretical module.
"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "imports" / "arkansas-revenue-replacement"
OUT.mkdir(parents=True, exist_ok=True)

SLICE = "CC-ARKANSAS-FOOD-HUB-OWNERSHIP-AND-PROCESSING-MARGIN-BIND-1.0"
DEC, UPD = "CC-DEC-146", "UPD-159"

# Prior-bound anchors
AG_GDP_2023 = 2_855_000_000  # AEDC GDP report — ag/forestry/fishing
DEMOTED_BASE_16Y = 836_986_729
COMBINED_TARGET = 7_231_905_638

# ERS Farm Income and Wealth Statistics — state snapshot via secondary compile
# Primary ERS table join remains NEE for commodity-line audit.
CASH_RECEIPTS_2023 = 13_100_000_000
GROSS_CASH_INCOME_2023 = 14_800_000_000
NET_FARM_INCOME_2023 = 3_300_000_000
POULTRY_RECEIPTS = 5_300_000_000
SOY_RECEIPTS = 2_200_000_000
CORN_RECEIPTS = 754_000_000
CATTLE_RECEIPTS = 753_000_000
COTTON_RECEIPTS = 696_000_000

# UA/RaFF Fall 2024 outlook — illustrative recession/commodity stress magnitude
UA_OUTLOOK_CASH_RECEIPTS_DELTA_2024 = -317_000_000  # ~-2% projected
UA_OUTLOOK_NFI_DELTA_2024 = -328_000_000  # ~-10% projected

# Illustrative EICR bands from EI-FOOD-AG-PROCESSING sector ledger (not calibrated)
EICR_RAW = 0.20
EICR_LOCAL_HUB = 0.45
EICR_BRANDED_OWNED = 0.55


def dollar_trace_unit(unit: int = 100) -> dict:
    """Trace $100 of farm-gate value under ownership regimes — illustrative only."""
    return {
        "unit_usd": unit,
        "status": "ILLUSTRATIVE_NOT_COUNTABLE",
        "rule": "Shows who captures margin — not public cash and not stack feed",
        "pathways": [
            {
                "id": "PATH-RAW-EXPORT-EXTERNAL-PACKER",
                "name": "Raw/commodity path with external packer/brand ownership",
                "steps": [
                    {"stage": "farm_gate", "arkansas_share_usd": unit, "note": "Often local farm ownership"},
                    {
                        "stage": "processing_brand_logistics",
                        "arkansas_share_usd": round(unit * EICR_RAW),
                        "leakage_usd": round(unit * (1 - EICR_RAW)),
                        "note": "High leakage — outside ownership captures processing/brand margin",
                    },
                    {
                        "stage": "public_reserved_cash",
                        "arkansas_public_usd": 0,
                        "note": "No ownership → no reserved Tax Retirement / Prosperity Fund feeder",
                    },
                ],
                "illustrative_eicr": EICR_RAW,
            },
            {
                "id": "PATH-LOCAL-FOOD-HUB-OWNERSHIP",
                "name": "In-state processing via cooperative/community food hub",
                "steps": [
                    {"stage": "farm_gate", "arkansas_share_usd": unit, "note": "Farm + hub supplier relationship"},
                    {
                        "stage": "processing_aggregation_logistics",
                        "arkansas_share_usd": round(unit * EICR_LOCAL_HUB),
                        "leakage_usd": round(unit * (1 - EICR_LOCAL_HUB)),
                        "note": "Higher local retention IF hub ownership and margin are real",
                    },
                    {
                        "stage": "public_or_community_distribution",
                        "arkansas_share_usd": "CONDITIONAL",
                        "note": "Only if audited free cash covenanted — none bound this slice",
                    },
                    {
                        "stage": "public_reserved_cash",
                        "arkansas_public_usd": 0,
                        "note": "COUNTABLE remains $0 until reserved cash proven",
                    },
                ],
                "illustrative_eicr": EICR_LOCAL_HUB,
            },
            {
                "id": "PATH-BRANDED-ARKANSAS-OWNED",
                "name": "Arkansas-owned brand + processing",
                "steps": [
                    {"stage": "farm_gate", "arkansas_share_usd": unit},
                    {
                        "stage": "brand_processing_marketing",
                        "arkansas_share_usd": round(unit * EICR_BRANDED_OWNED),
                        "leakage_usd": round(unit * (1 - EICR_BRANDED_OWNED)),
                    },
                    {
                        "stage": "public_reserved_cash",
                        "arkansas_public_usd": 0,
                        "note": "Still zero without covenanted reserved distributions",
                    },
                ],
                "illustrative_eicr": EICR_BRANDED_OWNED,
            },
        ],
    }


def resilience_first_object() -> dict:
    """First concrete resilience object: same pathway under Normal vs Shock.

    Does not alter fiscal projections or COUNTABLE. Gives the five-state
    framework something real to stress later.
    """
    return {
        "id": "RES-OBJ-FOOD-HUB-DOLLAR-PATH",
        "role": "FIRST_CONCRETE_RESILIENCE_TEST_OBJECT",
        "locked_by_master_plan": "CC-DEC-145",
        "alters_fiscal_projections": False,
        "countable_impact_usd": 0,
        "states_tested_now": ["normal", "recession_commodity_shock"],
        "states_deferred": ["technological_displacement", "severe_disruption", "abundance"],
        "normal": {
            "cash_receipts_context_usd": CASH_RECEIPTS_2023,
            "pathway_status": "ILLUSTRATIVE_RETENTION_POSSIBLE_IF_OWNERSHIP_EXISTS",
            "public_reserved_cash_usd": 0,
            "reading": "Scale is real; reserved public cash is not",
        },
        "recession_commodity_shock": {
            "anchors": {
                "ua_raff_fall_2024_cash_receipts_delta_usd": UA_OUTLOOK_CASH_RECEIPTS_DELTA_2024,
                "ua_raff_fall_2024_nfi_delta_usd": UA_OUTLOOK_NFI_DELTA_2024,
                "source": "https://eadn-wc02-7100781.nxedge.io/wp-content/uploads/2024/10/Fall_2024_Arkansas_Farm_Income.pdf",
            },
            "effect_on_pathway": [
                "Farm-gate dollars shrink → hub throughput and lease capacity weaken",
                "External packers may still capture scarce remaining margins",
                "Illustrative public reserved cash remains $0 — no stack rescue in a downturn either",
                "Resilience implication: ownership/retention design matters more when volumes fall, not less",
            ],
            "public_reserved_cash_usd": 0,
            "pass_fail_for_countable_stack": "N/A_ZERO_BOTH_STATES",
        },
        "lesson": "Resilience testing starts by stressing a real dollar path — not by inventing a resilience revenue engine",
    }


def build() -> dict:
    trace = dollar_trace_unit(100)
    resilience = resilience_first_object()

    findings = [
        {
            "id": "FH-001",
            "name": "ERS cash receipts scale bound (secondary)",
            "status": "SECONDARY_BOUND_PRIMARY_ERS_TABLE_JOIN_NEE",
            "cash_receipts_2023_usd": CASH_RECEIPTS_2023,
            "gross_cash_income_2023_usd": GROSS_CASH_INCOME_2023,
            "net_farm_income_2023_usd": NET_FARM_INCOME_2023,
            "top_commodities_usd": {
                "poultry": POULTRY_RECEIPTS,
                "soybeans": SOY_RECEIPTS,
                "corn": CORN_RECEIPTS,
                "cattle": CATTLE_RECEIPTS,
                "cotton": COTTON_RECEIPTS,
            },
            "sources": [
                "USDA ERS Farm Income and Wealth Statistics (Feb 5, 2026 release) via https://plainfarmdata.com/state/arkansas",
                "https://ers.usda.gov/data-products/farm-income-and-wealth-statistics/data-files-us-and-state-level-farm-income-and-wealth-statistics",
            ],
            "countable_now_usd": 0,
            "rule": "Cash receipts are farm-gate market activity — not processing margins and not public revenue",
        },
        {
            "id": "FH-002",
            "name": "Ag GDP vs cash receipts distinction",
            "status": "BOUND_DISTINCTION",
            "ag_forestry_fishing_gdp_2023_usd": AG_GDP_2023,
            "cash_receipts_2023_usd": CASH_RECEIPTS_2023,
            "note": "Different constructs; neither equals in-state processing margin or reserved public cash",
            "countable_now_usd": 0,
        },
        {
            "id": "FH-003",
            "name": "Processing-margin capture — unmodeled",
            "status": "UNMODELED_ZERO_NOW",
            "question": "What share of Arkansas farm-gate value is processed/branded in-state before leaving?",
            "answer": "NEE — no statewide processing-margin ledger bound this slice",
            "countable_now_usd": 0,
            "next_evidence": "NASS/ERS processing share joins; packer ownership map; cold-chain capacity inventory",
        },
        {
            "id": "FH-004",
            "name": "Cooperative / community food-hub ownership returns (EIM-005)",
            "status": "PLAUSIBLE_UNMODELED_TOP_PRIORITY",
            "legal_posture": "Can start under existing co-op / local authority with capital — still needs audited free cash",
            "reservable_for_tax_retirement": "CONDITIONAL",
            "countable_now_usd": 0,
            "pathway": "Outside food demand → Arkansas processing ownership → local margin → public/community distributions → reserved feeder",
            "audited_hub_cases_bound": 0,
            "next_evidence": "Arkansas food-hub / co-op audited financials; net distributable cash; reservation covenant draft",
        },
        {
            "id": "FH-005",
            "name": "Public/mixed facility leases (EIM-006)",
            "status": "PLAUSIBLE_UNMODELED",
            "countable_now_usd": 0,
            "next_evidence": "Facility inventory + net cash after O&M/debt for cold storage / processing sites",
        },
        {
            "id": "FH-006",
            "name": "Reject GDP/receipts-as-cash and export taxes",
            "status": "REJECT",
            "rejected": [
                "Counting $13.1B cash receipts as Replacement Stack dollars",
                "Discriminatory food-export tax",
                "Raiding existing dedicated ag/highway streams",
            ],
            "countable_now_usd": 0,
        },
    ]

    ledger = {
        "version": "1.0.0",
        "slice_id": SLICE,
        "generated_at": "2026-08-15",
        "decision_id": DEC,
        "update_id": UPD,
        "hypothesis_id": "CC-HYP-PROSPERITY-BASED-REVENUE-REPLACEMENT-SYSTEM",
        "incubator_alias": "HYP-131",
        "engine_id": "ENGINE-EXTERNAL-INCOME",
        "prior_mechanism": "EIM-005",
        "status": "FOOD_HUB_BIND_ZERO_COUNTABLE",
        "central_question": "What incremental reserved public cash can Arkansas earn from cooperative/community food-hub ownership and in-state processing margins, and can we trace an Arkansas dollar through that pathway under normal conditions and a serious economic shock?",
        "hard_wall": "Farm cash receipts ≠ processing margins ≠ public revenue.",
        "lane_discipline": {
            "main": "Food-hub evidence → retained value → reserved cash → Replacement Stack",
            "resilience": "First concrete test object for five-state framework — does not open a resilience implementation slice",
            "structural": "Definition-locks",
            "hyp134": "Quarantined from COUNTABLE",
        },
        "count_rule": "COUNTABLE NOW requires evidence-backed incremental reserved cash. Illustrative EICR and dollar traces are not countable.",
        "bound_scale": {
            "cash_receipts_2023_usd": CASH_RECEIPTS_2023,
            "gross_cash_income_2023_usd": GROSS_CASH_INCOME_2023,
            "net_farm_income_2023_usd": NET_FARM_INCOME_2023,
            "ag_forestry_fishing_gdp_2023_usd": AG_GDP_2023,
            "binding_quality": "Cash receipts SECONDARY_BOUND (ERS via compile); GDP prior-bound; processing margins NEE",
        },
        "findings": findings,
        "dollar_trace": trace,
        "resilience_first_object": resilience,
        "countable_now_usd": 0,
        "promoted_to_countable": [],
        "replacement_stack_feed": {
            "dollars_added_to_countable": 0,
            "demoted_base_16y_ceiling_unchanged_usd": DEMOTED_BASE_16Y,
            "combined_target_usd": COMBINED_TARGET,
            "rule": "Feed only defensible dollars — none this slice",
        },
        "headline": {
            "cash_receipts_bound_usd": CASH_RECEIPTS_2023,
            "countable_usd": 0,
            "audited_hub_cases": 0,
            "reading": (
                "Arkansas farm-gate scale is large (~$13.1B cash receipts). That still does not "
                "retire taxes. Processing ownership and reserved cash remain unproven. Dollar-trace "
                "shows why local hub ownership matters for retention — and why recession stress "
                "makes ownership design more, not less, important. COUNTABLE $0."
            ),
        },
        "build_next": [
            "Primary-bind ERS cash-receipts commodity table for Arkansas (replace secondary compile)",
            "Arkansas food-hub / co-op audited financial case set (net distributable cash)",
            "Cold storage / slaughter / processing facility inventory with ownership and net lease cash",
            "Packer/brand ownership map for poultry and major crops (leakage locus)",
            "Reservation covenant draft for any future public/community hub distributions",
        ],
        "next_slice": "CC-ARKANSAS-FOOD-HUB-AND-PROCESSING-FACILITY-CASHFLOW-CASE-BIND-1.0",
        "parallel": [
            "CC-ARKANSAS-AEDC-INCENTIVE-EQUITY-CONVERSION-LEGAL-MEMO-1.0",
            "CC-PHASE-2.1-BASELINE-DEFINITION-LOCKS-AND-NEXT-LEGITIMATE-FILLS-1.0",
        ],
        "holds": [
            "overall_percent_held_at_43",
            "KEEP_AS_HYPOTHESIS",
            "no_abolish_today",
            "zero_counted_until_cashflow_model",
            "cash_receipts_ne_public_cash",
            "hyp134_quarantined_from_countable",
            "resilience_object_not_implementation_slice",
            "fewer_new_architectures_more_evidence",
        ],
    }

    path = OUT / "food_hub_ownership_processing_margin_ledger.json"
    path.write_text(json.dumps(ledger, indent=2) + "\n", encoding="utf-8")
    return {
        "path": str(path),
        "countable_now": 0,
        "cash_receipts": CASH_RECEIPTS_2023,
        "resilience_object": resilience["id"],
    }


if __name__ == "__main__":
    print(json.dumps(build()))
