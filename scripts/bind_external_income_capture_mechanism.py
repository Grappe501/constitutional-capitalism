#!/usr/bin/env python3
"""External Income Capture Mechanism Bind (HYP-131).

Question: Which External Income sectors can clear the hard wall with
royalty / lease / participation / enterprise mechanisms that produce
*incremental reserved* public cash?

Hard wall (unchanged): outside demand ≠ public revenue.
Lane discipline: prove capture → identify legally reservable cash → feed only
defensible dollars into the Replacement Stack. HYP-134 must not rescue today's math.
"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "imports" / "arkansas-revenue-replacement"
OUT.mkdir(parents=True, exist_ok=True)

SLICE = "CC-ARKANSAS-EXTERNAL-INCOME-CAPTURE-MECHANISM-BIND-1.0"
DEC, UPD = "CC-DEC-143", "UPD-156"
COMBINED = 7_231_905_638

# Bound anchors from prior HYP-131 slices
GAS_SEV_FY2026 = 25_615_616
DFA_GR_SEV_FY2026 = 10_600_000
TOURISM_2PCT_FY2026 = 26_851_526
TOURISM_SPEND_2025 = 10_200_000_000
AG_GDP_2023 = 2_855_000_000
MFG_GDP_2023 = 25_898_000_000


def mechanisms() -> list[dict]:
    return [
        {
            "id": "EIM-001",
            "sector": "EI-ENERGY",
            "name": "Natural-gas severance (existing)",
            "mechanism_type": "royalty_severance",
            "legal_status": "EXISTS_STATUTE",
            "cash_status": "BOUND_ALREADY_SPENT_OR_DEDICATED",
            "bound_scale_usd": GAS_SEV_FY2026,
            "dfa_gr_portion_usd": DFA_GR_SEV_FY2026,
            "reservable_for_tax_retirement": False,
            "reservable_reason": "Mostly highway/special dedication; GR slice already in current spend — raiding breaks existing obligations",
            "countable_now_usd": 0,
            "action": "REJECT_AS_REPLACEMENT_FEEDER",
            "pathway": "None without new incremental yield above current dedications",
            "next_evidence": "None for countable replacement — do not double-count",
            "sources": ["DFA/BLR severance binds prior Use-Depletion slice"],
        },
        {
            "id": "EIM-002",
            "sector": "EI-ENERGY",
            "name": "Lithium/brine severance (Act 1012 / SB568 framework)",
            "mechanism_type": "royalty_severance",
            "legal_status": "EXISTS_STATUTE_2025",
            "cash_status": "FRAMEWORK_EXISTS_PRODUCTION_SCALE_NEE",
            "bound_scale_usd": None,
            "rate_note": "Salt-water severance rate amended (e.g. $2.45 / 1,000 barrels for brine used as lithium/bromine source raw material) — collections distribution heavily earmarked (County Aid / GR mix); not a free Tax Retirement Fund stream as written",
            "reservable_for_tax_retirement": False,
            "reservable_reason": "Statutory distribution earmarks + production not demonstrated as incremental reserved replacement cash; temporary exemptions / incentives may suppress near-term yield",
            "countable_now_usd": 0,
            "action": "HOLD_FUTURE_DESIGN_NOT_COUNTABLE",
            "pathway": "Requires (a) demonstrated production cash-flow, (b) redesign toward permanent public share / Prosperity Fund feeder without raiding county road dedications, (c) principal-protection if Fund-bound",
            "next_evidence": "AOGC/DFA production + collections series after lithium units operate; public-share redesign memo",
            "sources": [
                "https://arkleg.state.ar.us/Home/FTPDocument?path=%2FACTS%2F2025R%2FPublic%2FACT1012.pdf",
                "https://www.arkleg.state.ar.us/Home/FTPDocument?path=%2FAssembly%2F2025%2F2025R%2FFiscal+Impacts%2FSB568-DFA2.pdf",
            ],
        },
        {
            "id": "EIM-003",
            "sector": "EI-ENERGY",
            "name": "Public equity / generation-storage participation",
            "mechanism_type": "enterprise_participation",
            "legal_status": "REQUIRES_DEAL_AND_LIKELY_STATUTE_OR_AUTHORITY_ACTION",
            "cash_status": "UNMODELED_ZERO_NOW",
            "bound_scale_usd": None,
            "reservable_for_tax_retirement": "CONDITIONAL",
            "reservable_reason": "Only free cash after debt/O&M/reserves with PUBLIC_RISK_AT_RISK — none demonstrated",
            "countable_now_usd": 0,
            "action": "PLAUSIBLE_UNMODELED_PRIORITY",
            "pathway": "Public or cooperative equity stake → audited distributable cash → reserved Tax Retirement / Prosperity Fund feeder",
            "next_evidence": "Candidate project list with ownership %, cash-flow model, legal authority",
            "sources": ["Prior Value Capture/Enterprise ledger — $0 cleared"],
        },
        {
            "id": "EIM-004",
            "sector": "EI-ENERGY",
            "name": "Discriminatory energy export tax / interstate surcharge",
            "mechanism_type": "tax_rejected",
            "legal_status": "CONSTITUTIONALLY_DISFAVORED",
            "cash_status": "REJECTED",
            "bound_scale_usd": None,
            "reservable_for_tax_retirement": False,
            "reservable_reason": "Commerce Clause / Import-Export Clause risk",
            "countable_now_usd": 0,
            "action": "REJECT",
            "pathway": "None — redirect to in-state value-chain / ownership capture",
            "next_evidence": "None",
            "sources": ["CC-DEC-127 constitutional guardrails"],
        },
        {
            "id": "EIM-005",
            "sector": "EI-FOOD-AG-PROCESSING",
            "name": "Cooperative / community food-hub ownership returns",
            "mechanism_type": "enterprise_cooperative_return",
            "legal_status": "CAN_START_NOW_UNDER_EXISTING_COOP_AND_LOCAL_AUTHORITY_WITH_CAPITAL",
            "cash_status": "UNMODELED_ZERO_NOW",
            "bound_scale_usd": None,
            "scale_envelope_not_cash_usd": AG_GDP_2023,
            "scale_envelope_note": "Ag/forestry/fishing GDP ~$2.86B is scale context — not processing margins or public cash",
            "reservable_for_tax_retirement": "CONDITIONAL",
            "reservable_reason": "Only if public/community capital produces audited free cash reserved by covenant — none bound",
            "countable_now_usd": 0,
            "action": "PLAUSIBLE_UNMODELED_TOP_PRIORITY",
            "pathway": "Outside food demand → Arkansas processing ownership → local margin → public/community distributions → reserved feeder",
            "next_evidence": "NASS cash receipts vs in-state processing margins; hub ownership case studies; AEDC participation redesign pilots",
            "sources": ["AEDC 2023 GDP report; External Income sector ledger EI-FOOD-AG-PROCESSING"],
        },
        {
            "id": "EIM-006",
            "sector": "EI-FOOD-AG-PROCESSING",
            "name": "Public/mixed facility leases for processing hubs",
            "mechanism_type": "lease",
            "legal_status": "REQUIRES_LOCAL_OR_STATE_FACILITY_AUTHORITY",
            "cash_status": "UNMODELED_ZERO_NOW",
            "bound_scale_usd": None,
            "reservable_for_tax_retirement": "CONDITIONAL",
            "reservable_reason": "Lease net after O&M/debt only; no facility survey bound",
            "countable_now_usd": 0,
            "action": "PLAUSIBLE_UNMODELED",
            "pathway": "Build/lease food-hub capacity → net lease cash → reserved fund",
            "next_evidence": "Facility inventory + net cash survey for cold storage / processing sites",
            "sources": ["Prior Enterprise ledger — airports/water pledged patterns warn against raid"],
        },
        {
            "id": "EIM-007",
            "sector": "EI-FOOD-AG-PROCESSING",
            "name": "Discriminatory food-export tax",
            "mechanism_type": "tax_rejected",
            "legal_status": "CONSTITUTIONALLY_DISFAVORED",
            "cash_status": "REJECTED",
            "bound_scale_usd": None,
            "reservable_for_tax_retirement": False,
            "reservable_reason": "Export-tax design rejected",
            "countable_now_usd": 0,
            "action": "REJECT",
            "pathway": "None — raise EICR via processing/brand ownership before goods leave",
            "next_evidence": "None",
            "sources": ["CC-DEC-127 / CC-DEC-135 rejects"],
        },
        {
            "id": "EIM-008",
            "sector": "EI-TOURISM",
            "name": "Existing 2% tourism tax",
            "mechanism_type": "dedicated_tax",
            "legal_status": "EXISTS",
            "cash_status": "BOUND_ALREADY_SPENT",
            "bound_scale_usd": TOURISM_2PCT_FY2026,
            "outside_demand_bound_usd": TOURISM_SPEND_2025,
            "reservable_for_tax_retirement": False,
            "reservable_reason": "Already spent on tourism marketing — cannot double-count",
            "countable_now_usd": 0,
            "action": "REJECT_AS_REPLACEMENT_FEEDER",
            "pathway": "Only incremental new visitor/luxury mechanisms with reserved covenants",
            "next_evidence": "Incremental visitor mechanism design (not marketing raid)",
            "sources": ["Arkansas Tourism 2025–FY2026 Economic Impact Report"],
        },
        {
            "id": "EIM-009",
            "sector": "EI-TOURISM",
            "name": "Incremental visitor/luxury reserved surcharge (redesign)",
            "mechanism_type": "fee_or_tax_redesign",
            "legal_status": "REQUIRES_LEGISLATION",
            "cash_status": "UNMODELED_ZERO_NOW",
            "bound_scale_usd": None,
            "reservable_for_tax_retirement": "CONDITIONAL",
            "reservable_reason": "Could be reserved if newly enacted and covenanted — regressivity and tourism competitiveness gates open",
            "countable_now_usd": 0,
            "action": "PLAUSIBLE_UNMODELED_GATED",
            "pathway": "New incremental stream → Tax Retirement Fund covenant (not existing 2%)",
            "next_evidence": "Incidence + competitiveness model; statutory draft with reservation clause",
            "sources": ["Feeder Binding demoted Visitor/Luxury ceilings"],
        },
        {
            "id": "EIM-010",
            "sector": "EI-SPECIALTY-AG-BRAND",
            "name": "Arkansas-owned brand / IP licensing returns",
            "mechanism_type": "enterprise_ip_return",
            "legal_status": "PRIVATE_FIRST_PUBLIC_PARTICIPATION_OPTIONAL",
            "cash_status": "UNMODELED_ZERO_NOW",
            "bound_scale_usd": None,
            "reservable_for_tax_retirement": "CONDITIONAL",
            "reservable_reason": "Only if public capital/IP stake exists with royalty path",
            "countable_now_usd": 0,
            "action": "PLAUSIBLE_UNMODELED",
            "pathway": "Brand/IP ownership → royalties → university / Prosperity Fund path (links HYP-133 research IP)",
            "next_evidence": "Tech-transfer / specialty brand royalty census",
            "sources": ["External Income specialty-ag sector"],
        },
        {
            "id": "EIM-011",
            "sector": "EI-ADVANCED-MFG",
            "name": "Manufacturing GDP as public cash",
            "mechanism_type": "none_scale_only",
            "legal_status": "N_A",
            "cash_status": "SCALE_NOT_MECHANISM",
            "bound_scale_usd": MFG_GDP_2023,
            "reservable_for_tax_retirement": False,
            "reservable_reason": "GDP ≠ Arkansas-owned surplus ≠ reserved public cash",
            "countable_now_usd": 0,
            "action": "REJECT_SCALE_AS_REVENUE",
            "pathway": "Supplier/ownership redesign first — then enterprise returns",
            "next_evidence": "Arkansas-owned manufacturing margin survey",
            "sources": ["AEDC 2023 GDP report"],
        },
        {
            "id": "EIM-012",
            "sector": "CROSS_CUTTING",
            "name": "AEDC incentive conversion to equity / return participation",
            "mechanism_type": "participation_redesign",
            "legal_status": "REQUIRES_STATUTE_OR_PROGRAM_REDESIGN",
            "cash_status": "UNMODELED_ZERO_NOW",
            "bound_scale_usd": None,
            "reservable_for_tax_retirement": "CONDITIONAL",
            "reservable_reason": "Only if converted deals produce audited returns reserved for Tax Retirement / Prosperity Fund",
            "countable_now_usd": 0,
            "action": "PLAUSIBLE_UNMODELED_PRIORITY",
            "pathway": "Incentive → equity/return right → reserved public cash",
            "next_evidence": "Inventory of AEDC deals with conversion potential; legal authority memo",
            "sources": ["Prior Value Capture/Enterprise redesign notes"],
        },
    ]


def main() -> None:
    mechs = mechanisms()
    countable = sum(m["countable_now_usd"] for m in mechs)
    by_action: dict[str, list[str]] = {}
    for m in mechs:
        by_action.setdefault(m["action"], []).append(m["id"])

    reservable_candidates = [
        m
        for m in mechs
        if m["reservable_for_tax_retirement"] in (True, "CONDITIONAL")
        and m["action"]
        not in ("REJECT", "REJECT_AS_REPLACEMENT_FEEDER", "REJECT_SCALE_AS_REVENUE")
    ]

    ledger = {
        "version": "1.0.0",
        "slice_id": SLICE,
        "generated_at": "2026-08-12",
        "decision_id": DEC,
        "update_id": UPD,
        "hypothesis_id": "CC-HYP-PROSPERITY-BASED-REVENUE-REPLACEMENT-SYSTEM",
        "incubator_alias": "HYP-131",
        "engine_id": "ENGINE-EXTERNAL-INCOME",
        "status": "MECHANISM_BIND_ZERO_COUNTABLE",
        "central_question": "Which External Income sectors can clear the hard wall with royalty/lease/participation/enterprise mechanisms that produce incremental reserved public cash?",
        "hard_wall": "External income is not automatically public revenue.",
        "lane_discipline": {
            "main": "External Income evidence → reserved cash → Replacement Stack",
            "structural": "Definition locks → stronger measurement",
            "hyp134": "AI abundance → evidence first, modeling later — cannot rescue today’s stack by assumption",
            "anti_rescue": "HYP-134 cannot become the convenient answer whenever current revenue math fails",
        },
        "count_rule": "COUNTABLE NOW requires evidence-backed incremental reserved cash. Already-spent dedications and GDP/spend scale are not countable.",
        "priority_sectors": ["EI-FOOD-AG-PROCESSING", "EI-ENERGY"],
        "prior_sector_capture_slice": "CC-ARKANSAS-EXTERNAL-INCOME-SECTOR-CAPTURE-1.0",
        "prior_feeder_binding_slice": "CC-ARKANSAS-REPLACEMENT-STACK-FEEDER-BINDING-PASS-1.0",
        "mechanisms": mechs,
        "action_summary": by_action,
        "countable_now_usd": countable,
        "promoted_to_countable": [],
        "reservable_candidates_conditional": [
            {
                "id": m["id"],
                "name": m["name"],
                "action": m["action"],
                "next_evidence": m["next_evidence"],
            }
            for m in reservable_candidates
        ],
        "headline": {
            "mechanisms_scored": len(mechs),
            "countable_usd": countable,
            "rejected_or_already_spent": len(
                [
                    m
                    for m in mechs
                    if m["action"]
                    in (
                        "REJECT",
                        "REJECT_AS_REPLACEMENT_FEEDER",
                        "REJECT_SCALE_AS_REVENUE",
                    )
                ]
            ),
            "plausible_unmodeled_priority": [
                "EIM-005 cooperative food-hub ownership",
                "EIM-003 energy public equity participation",
                "EIM-012 AEDC incentive→equity conversion",
                "EIM-002 lithium public-share redesign (future)",
            ],
            "reading": "Hard wall holds. Existing public slices (gas severance, tourism 2%) are real and already spent/dedicated. Lithium statute exists but is not countable replacement cash. Food-hub ownership and energy participation remain the top build paths — still $0 until audited reserved cash appears.",
        },
        "build_next": [
            "NASS cash receipts vs in-state processing margins + food-hub ownership case bind",
            "AEDC deal inventory for equity/return conversion legal authority",
            "Energy/generation-storage participation candidate list with cash-flow + PUBLIC_RISK_AT_RISK",
            "Lithium production/collections series + permanent public-share redesign memo (do not raid county road dedications)",
            "Incremental visitor mechanism only if new reserved stream — never existing 2%",
        ],
        "replacement_stack_feed": {
            "dollars_added_to_countable": 0,
            "rule": "Feed only defensible dollars — none this slice",
            "demoted_base_16y_ceiling_unchanged_usd": 836_986_729,
        },
        "hyp134_boundary": {
            "rule": "AI abundance may change long-run economics but does not rescue today’s Replacement Stack by assumption",
            "status": "NOT_APPLIED",
        },
        "next_slice": "CC-ARKANSAS-FOOD-HUB-OWNERSHIP-AND-PROCESSING-MARGIN-BIND-1.0",
        "parallel": [
            "CC-PHASE-2.1-BASELINE-DEFINITION-LOCKS-AND-NEXT-LEGITIMATE-FILLS-1.0",
            "CC-ARKANSAS-AEDC-INCENTIVE-EQUITY-CONVERSION-LEGAL-MEMO-1.0",
        ],
        "holds": [
            "overall_percent_held_at_43",
            "KEEP_AS_HYPOTHESIS",
            "no_abolish_today",
            "zero_counted_until_cashflow_model",
            "external_income_hard_wall",
            "no_raid_existing_obligations",
            "gdp_and_visitor_spend_ne_public_cash",
            "hyp134_cannot_rescue_todays_stack",
            "fewer_new_architectures_more_evidence",
        ],
    }

    path = OUT / "external_income_capture_mechanism_ledger.json"
    path.write_text(json.dumps(ledger, indent=2) + "\n", encoding="utf-8")
    print(
        json.dumps(
            {
                "path": str(path),
                "countable_now": countable,
                "mechanisms": len(mechs),
                "conditional_reservable": len(reservable_candidates),
                "promoted": 0,
            }
        )
    )


if __name__ == "__main__":
    main()
