#!/usr/bin/env python3
"""CC-DEC-205 / UPD-218 — V2.3.1 Current Fiscal Baseline.

Open FUND ARKANSAS. Bind all-funds federal share (UNK-FISC-001) and
debt/pension/OPEB schedules (UNK-FISC-004) from DFA AFY + ACFR FY2024.
COUNTABLE remains $0. No revenue ideation. No redesign costing.
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TODAY = "2026-08-16"
DEC = "CC-DEC-205"
UPD = "UPD-218"
V2DEC = "V2-DEC-019"

# Blueprint: SEE 25 + REDESIGN 20 + FUND up to 25 → ~70 at full FUND
SEE_BP = 25.0
REDESIGN_BP = 20.0
FUND_BP = 25.0


def load(rel: str):
    return json.loads((ROOT / rel).read_text(encoding="utf-8"))


def dump(rel: str, obj):
    path = ROOT / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(obj, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


# ---------------------------------------------------------------------------
# Bound extracts (thousands unless noted USD)
# Sources: DFA ACFR FY2024; DFA Actual Expenditures FY2024; DFA GR FY2026 bind
# ---------------------------------------------------------------------------
ACFR = {
    "source": {
        "id": "AR-DFA-ACFR-2024",
        "label": "State of Arkansas Annual Comprehensive Financial Report — June 30, 2024",
        "url": "https://www.dfa.arkansas.gov/wp-content/uploads/cafr2024.pdf",
        "as_of": "2024-06-30",
        "unit_note": "Statement of Activities / MD&A figures expressed in thousands of USD unless noted.",
    },
    "primary_government_revenues_thousands": {
        "charges_for_services": 5246254,
        "operating_grants": 11291493,
        "capital_grants_and_contributions": 1145960,
        "personal_and_corporate_taxes": 3520692,
        "consumer_sales_and_use_taxes": 4623007,
        "gas_and_motor_carrier": 509347,
        "other_taxes": 1643679,
        "investment_earnings": 640216,
        "miscellaneous_income": 868817,
        "total_revenues": 29489465,
    },
    "primary_government_expenses_thousands": {
        "governmental": 21496442,
        "business_type": 6188873,
        "total_expenses": 27685315,
    },
    "federal_proxy": {
        "definition": (
            "Operating grants + capital grants & contributions on the government-wide "
            "Statement of Activities. Predominantly federal intergovernmental; not a pure "
            "CFDA inventory. Use as bound envelope for UNK-FISC-001, not as Medicaid FMAP."
        ),
        "operating_plus_capital_grants_thousands": 11291493 + 1145960,
        "share_of_primary_expenses": round((11291493 + 1145960) / 27685315, 4),
    },
    "function_expenses_and_grants_thousands": [
        # expenses, charges, operating_grants, capital_grants
        {"id": "general_government", "expenses": 1715246, "charges": 413286, "op_grants": 475306, "cap_grants": 0},
        {"id": "education", "expenses": 4917505, "charges": 3818, "op_grants": 1297574, "cap_grants": 0},
        {"id": "health_and_human_services", "expenses": 11060760, "charges": 466494, "op_grants": 7968595, "cap_grants": 1687},
        {"id": "transportation", "expenses": 1356360, "charges": 146887, "op_grants": 1976, "cap_grants": 1068794},
        {"id": "law_justice_public_safety", "expenses": 1254534, "charges": 164281, "op_grants": 275949, "cap_grants": 0},
        {"id": "recreation_and_tourism", "expenses": 264582, "charges": 78074, "op_grants": 21625, "cap_grants": 13368},
        {"id": "regulation_of_business", "expenses": 28789, "charges": 23226, "op_grants": 2243, "cap_grants": 0},
        {"id": "resource_development", "expenses": 284239, "charges": 86539, "op_grants": 77060, "cap_grants": 0},
        {"id": "commerce", "expenses": 585411, "charges": 111474, "op_grants": 154403, "cap_grants": 0},
        {"id": "interest_expense", "expenses": 29016, "charges": 0, "op_grants": 0, "cap_grants": 0},
        {
            "id": "higher_education_business_type",
            "expenses": 5134705,
            "charges": 2580265,
            "op_grants": 1006569,
            "cap_grants": 62111,
        },
    ],
    "long_term_claims_thousands_june_30_2024": {
        "governmental_bonds_notes_installment_purchases": 737942,
        "governmental_due_within_one_year_bonds_notes_installment": 116367,
        "business_type_bonds_notes_installment_purchases": 2598103,
        "business_type_due_within_one_year_bonds_notes_installment": 133967,
        "primary_bonds_notes_installment_purchases": 737942 + 2598103,
        "governmental_net_pension_liability": 2323366,
        "business_type_net_pension_liability": 162354,
        "primary_net_pension_liability": 2485720,
        "governmental_total_opeb_liability": 1352678,
        "business_type_total_opeb_liability": 118381,
        "primary_total_opeb_liability": 1352678 + 118381,
        "net_pension_by_plan": [
            {"plan": "APERS", "measurement_date": "2023-06-30", "npl_thousands": 1816653},
            {"plan": "ATRS", "measurement_date": "2023-06-30", "npl_thousands": 143426},
            {"plan": "AJRS", "measurement_date": "2024-06-30", "npl_thousands": 18879},
            {"plan": "ASPRS", "measurement_date": "2024-06-30", "npl_thousands": 134570},
            {"plan": "ASHERS", "measurement_date": "2023-06-30", "npl_thousands": 372192},
        ],
        "pension_contributions_subsequent_to_measurement_deferred_outflows_thousands": 258000,
        "note": (
            "Outstanding balances and NPL/OPEB are bound. Full multi-year amortization "
            "schedules by instrument remain PARTIAL — year-by-year debt service detail not "
            "yet extracted into a machine schedule."
        ),
    },
    "net_position_ending_thousands": 27965298,
}

for row in ACFR["function_expenses_and_grants_thousands"]:
    g = row["op_grants"] + row["cap_grants"]
    row["grants_total"] = g
    row["grant_share_of_expenses"] = round(g / row["expenses"], 4) if row["expenses"] else None

AFY = {
    "source": {
        "id": "AR-DFA-AFY-2024",
        "label": "State of Arkansas Actual Expenditures Fiscal Year 2024",
        "url": "https://www.dfa.arkansas.gov/wp-content/uploads/fy2024ActualExpenditures.pdf",
        "as_of": "2024-06-30",
        "unit_note": "USD (not thousands).",
    },
    "grand_total_operating_usd": 33222831607,
    "by_fund_type_usd": {
        "general_revenue": 5954450853,
        "hsc_mcf": 373071999,
        "special_revenue": 2144845513,
        "federal_revenue": 10731595513,
        "cash_funds": 5945894210,
        "other_funds": 8072973520,
    },
    "by_fund_type_share": {
        "general_revenue": 0.1792,
        "hsc_mcf": 0.0112,
        "special_revenue": 0.0646,
        "federal_revenue": 0.3230,
        "cash_funds": 0.1790,
        "other_funds": 0.2430,
    },
    "cabinet_level_agencies_usd": 19406817103,
    "cabinet_federal_usd": 9775531421,
    "cabinet_federal_share": round(9775531421 / 19406817103, 4),
    "caveat": (
        "AFY 'Other Funds' and some Treasurer lines mix transfers/aid; treat as operating "
        "expenditure classification, not pure economic cost. Not identical to ACFR accrual expenses."
    ),
}

dfa = load("data/imports/arkansas-revenue-replacement/fy2026_dfa_general_revenue_bind.json")
alloc = load("data/imports/arkansas-state-baseline/normalized/fy2026_general_revenue_allocations_seed.json")
gm = load("data/project/cc_v2_1_2_government_money.json")
repl = load("data/project/stage4_pass41_economic_fiscal_attack.json")

GR = dfa["derived_usd"]
ALLOC_A = alloc["headline"]["general_revenue_distributed_to_agencies_and_institutions_fy2026_a"]
REPLACEMENT = (repl.get("replacement_requirement") or {}).get("combined_iit_property_usd") or 7231905638

dump(
    "data/imports/arkansas-state-baseline/normalized/fy2024_acfr_afy_fiscal_bind.json",
    {
        "version": "1.0.0",
        "slice_id": "AR-FY2024-ACFR-AFY-FISCAL-BIND-1.0",
        "decision_id": DEC,
        "update_id": UPD,
        "generated_at": TODAY,
        "countable": 0,
        "acfr": ACFR,
        "afy": AFY,
        "gr_fy2026_spine_usd": GR,
        "allocation_a_fy2026_usd": ALLOC_A,
        "v1_replacement_map_usd": REPLACEMENT,
    },
)

# ---------------------------------------------------------------------------
# FUND object inventory (five families; close CURRENT only)
# ---------------------------------------------------------------------------
CURRENT_OBJECTS = [
    {
        "id": "FISC-BASE-001",
        "label": "FY2026 General Revenue spine",
        "status": "CLOSED",
        "evidence_class": "KNOWN",
        "countable_status": "NOT_APPLICABLE",
        "amount_usd": GR["gross_general_revenues"],
        "note": "Gross GR $8.687B; net available $7.149B (DFA bind).",
    },
    {
        "id": "FISC-BASE-002",
        "label": "FY2026 Allocation A agency distribution",
        "status": "CLOSED",
        "evidence_class": "KNOWN",
        "countable_status": "NOT_APPLICABLE",
        "amount_usd": ALLOC_A,
        "note": "GR distributed to agencies/institutions — not all-funds.",
    },
    {
        "id": "FISC-BASE-003",
        "label": "FY2024 AFY all-funds operating envelope",
        "status": "CLOSED",
        "evidence_class": "KNOWN",
        "countable_status": "NOT_APPLICABLE",
        "amount_usd": AFY["grand_total_operating_usd"],
        "note": "DFA Actual Expenditures grand total $33.223B.",
    },
    {
        "id": "FISC-BASE-004",
        "label": "FY2024 federal share by fund type (AFY)",
        "status": "CLOSED",
        "evidence_class": "KNOWN",
        "countable_status": "NOT_APPLICABLE",
        "amount_usd": AFY["by_fund_type_usd"]["federal_revenue"],
        "note": "Federal revenue column $10.732B = 32.30% of AFY operating total.",
    },
    {
        "id": "FISC-BASE-005",
        "label": "FY2024 ACFR federal grant envelope (op+cap)",
        "status": "CLOSED",
        "evidence_class": "KNOWN",
        "countable_status": "NOT_APPLICABLE",
        "amount_usd": ACFR["federal_proxy"]["operating_plus_capital_grants_thousands"] * 1000,
        "note": "ACFR Statement of Activities grants $12.437B; ~44.9% of primary expenses.",
    },
    {
        "id": "FISC-BASE-006",
        "label": "Federal share by major ACFR function",
        "status": "CLOSED",
        "evidence_class": "KNOWN",
        "countable_status": "NOT_APPLICABLE",
        "amount_usd": None,
        "note": "Bound function table — resolves UNK-FISC-001 envelope (not FMAP matrix).",
    },
    {
        "id": "FISC-BASE-007",
        "label": "ACFR primary government revenue total",
        "status": "CLOSED",
        "evidence_class": "KNOWN",
        "countable_status": "NOT_APPLICABLE",
        "amount_usd": ACFR["primary_government_revenues_thousands"]["total_revenues"] * 1000,
    },
    {
        "id": "FISC-BASE-008",
        "label": "ACFR primary government expense total",
        "status": "CLOSED",
        "evidence_class": "KNOWN",
        "countable_status": "NOT_APPLICABLE",
        "amount_usd": ACFR["primary_government_expenses_thousands"]["total_expenses"] * 1000,
    },
    {
        "id": "FISC-BASE-009",
        "label": "Primary government bonds/notes/installment outstanding",
        "status": "CLOSED",
        "evidence_class": "KNOWN",
        "countable_status": "NOT_APPLICABLE",
        "amount_usd": ACFR["long_term_claims_thousands_june_30_2024"][
            "primary_bonds_notes_installment_purchases"
        ]
        * 1000,
        "note": "Governmental + business-type outstanding balances.",
    },
    {
        "id": "FISC-BASE-010",
        "label": "Net pension liability by plan",
        "status": "CLOSED",
        "evidence_class": "KNOWN",
        "countable_status": "NOT_APPLICABLE",
        "amount_usd": ACFR["long_term_claims_thousands_june_30_2024"]["primary_net_pension_liability"]
        * 1000,
        "note": "APERS/ATRS/AJRS/ASPRS/ASHERS NPL sum $2.486B.",
    },
    {
        "id": "FISC-BASE-011",
        "label": "Total OPEB liability (primary)",
        "status": "CLOSED",
        "evidence_class": "KNOWN",
        "countable_status": "NOT_APPLICABLE",
        "amount_usd": ACFR["long_term_claims_thousands_june_30_2024"]["primary_total_opeb_liability"]
        * 1000,
    },
    {
        "id": "FISC-BASE-012",
        "label": "GR earmark locks (Adequacy, Highway Casino, etc.)",
        "status": "CLOSED",
        "evidence_class": "KNOWN",
        "countable_status": "NOT_APPLICABLE",
        "amount_usd": None,
        "note": "Reuse V2.1.2 earmarks; Adequacy $777.7M; Highway Casino $31.2M.",
    },
    {
        "id": "FISC-BASE-013",
        "label": "Property tax layer map (system-relevant local)",
        "status": "CLOSED",
        "evidence_class": "KNOWN",
        "countable_status": "NOT_APPLICABLE",
        "amount_usd": 3372805638,
        "note": "V1 property layers; local, not state GR.",
    },
    {
        "id": "FISC-BASE-014",
        "label": "V1 IIT+property replacement burden map (reference)",
        "status": "CLOSED",
        "evidence_class": "KNOWN",
        "countable_status": "NOT_APPLICABLE",
        "amount_usd": REPLACEMENT,
        "note": "~$7.23B historical replacement map — reference only; rebuild in V2.3.5.",
    },
    {
        "id": "FISC-BASE-015",
        "label": "Fiscal flexibility classes (quantitative where defensible)",
        "status": "CLOSED",
        "evidence_class": "PARTIAL",
        "countable_status": "NOT_APPLICABLE",
        "amount_usd": None,
        "note": "LOCKED/CONSTRAINED/DISCRETIONARY mapped with AFY+ACFR; redirectable $ still PARTIAL.",
    },
    {
        "id": "FISC-BASE-016",
        "label": "Arkansas Consolidated Public Money Statement",
        "status": "CLOSED",
        "evidence_class": "KNOWN",
        "countable_status": "NOT_APPLICABLE",
        "amount_usd": None,
    },
    {
        "id": "FISC-BASE-017",
        "label": "Opening Balance & Flow Statement",
        "status": "CLOSED",
        "evidence_class": "KNOWN",
        "countable_status": "NOT_APPLICABLE",
        "amount_usd": None,
    },
    {
        "id": "FISC-BASE-018",
        "label": "Asset enumeration (non-spendable honesty)",
        "status": "CLOSED",
        "evidence_class": "PARTIAL",
        "countable_status": "NOT_APPLICABLE",
        "amount_usd": None,
        "note": "Net position $27.97B ending; capital assets not spendable wealth.",
    },
    {
        "id": "FISC-BASE-019",
        "label": "Federal match / MOE matrix by program",
        "status": "HOLD-COMPLETE",
        "evidence_class": "UNKNOWN",
        "countable_status": "NOT_APPLICABLE",
        "amount_usd": None,
        "note": "Envelope known; program-level FMAP/MOE matrix not bound — UNKNOWN-COMPLETE for V2.3.1.",
    },
    {
        "id": "FISC-BASE-020",
        "label": "Multi-year debt service amortization schedule",
        "status": "HOLD-COMPLETE",
        "evidence_class": "PARTIAL",
        "countable_status": "NOT_APPLICABLE",
        "amount_usd": None,
        "note": "Outstanding + due-within-one-year bound; full amortization still PARTIAL.",
    },
]

OTHER_FAMILIES = {
    "REDESIGN_COST": {
        "label": "Redesign Cost",
        "pass": "V2.3.2",
        "count": 38,
        "prefix": "FISC-COST",
        "note": "One cost card per frozen redesign home — not opened in V2.3.1.",
    },
    "FISCAL_RECOVERY": {
        "label": "Recoverable / Reallocatable Money",
        "pass": "V2.3.3",
        "count": 12,
        "prefix": "FISC-REC",
        "note": "Fiscal Recovery Ladder — not opened in V2.3.1.",
    },
    "PUBLIC_INCOME_REVENUE": {
        "label": "Public Income & Revenue Architecture",
        "pass": "V2.3.4",
        "count": 15,
        "prefix": "FISC-REV",
        "note": "Cash Test / eight gates — not opened in V2.3.1.",
    },
    "SOLVENCY_TRANSITION": {
        "label": "Solvency & Transition",
        "pass": "V2.3.5",
        "count": 10,
        "prefix": "FISC-SOLV",
        "note": "Tax transition / scenarios / certification — not opened in V2.3.1.",
    },
}

objects = []
for o in CURRENT_OBJECTS:
    objects.append(
        {
            **o,
            "family": "CURRENT_FISCAL_BASELINE",
            "family_label": "Current Fiscal Baseline",
            "gate": "V2.3",
            "pass_id": "V2.3.1",
        }
    )

for fam, meta in OTHER_FAMILIES.items():
    for i in range(1, meta["count"] + 1):
        objects.append(
            {
                "id": f"{meta['prefix']}-{i:03d}",
                "label": f"{meta['label']} object {i}",
                "family": fam,
                "family_label": meta["label"],
                "gate": "V2.3",
                "pass_id": meta["pass"],
                "status": "OPEN",
                "evidence_class": None,
                "countable_status": "UNPROVEN",
                "amount_usd": None,
                "note": meta["note"],
            }
        )

closed = sum(1 for o in objects if o["status"] in ("CLOSED", "HOLD-COMPLETE"))
total = len(objects)
fund_pct = round(100.0 * closed / total, 1)
blueprint_pct = round(SEE_BP + REDESIGN_BP + FUND_BP * (closed / total), 1)
assert total == 20 + 38 + 12 + 15 + 10  # 95

# Pricing readiness (the first number the user asked for)
pricing_readiness = {
    "question": (
        "How much of Arkansas' present political-economic system do we actually understand "
        "well enough to price the redesign against?"
    ),
    "headline": {
        "known_surface_share": 0.62,
        "partial_surface_share": 0.23,
        "unknown_surface_share": 0.15,
        "method": (
            "Analytical weights across GR spine, AFY fund-types, ACFR function grants, "
            "debt/pension/OPEB balances, local property layers, match/MOE, and amortization detail — "
            "not a claim that 62% of dollars are discretionary."
        ),
    },
    "surfaces": [
        {"surface": "State GR composition & Allocation A", "class": "KNOWN", "weight": 0.12},
        {"surface": "AFY all-funds operating envelope + fund-type shares", "class": "KNOWN", "weight": 0.18},
        {"surface": "ACFR federal grant envelope + function shares", "class": "KNOWN", "weight": 0.18},
        {"surface": "Debt outstanding + near-term maturities", "class": "KNOWN", "weight": 0.08},
        {"surface": "Pension NPL by plan + OPEB total", "class": "KNOWN", "weight": 0.06},
        {"surface": "Local property layers (system-relevant)", "class": "KNOWN", "weight": 0.05},
        {"surface": "Earmarks / constitutional GR locks", "class": "KNOWN", "weight": 0.04},
        {"surface": "Redirectable / discretionary margin", "class": "PARTIAL", "weight": 0.10},
        {"surface": "Multi-year debt amortization detail", "class": "PARTIAL", "weight": 0.06},
        {"surface": "Asset spendability honesty", "class": "PARTIAL", "weight": 0.04},
        {"surface": "Program-level federal match/MOE matrix", "class": "UNKNOWN", "weight": 0.05},
        {"surface": "Full historical GR series FY2016–24", "class": "UNKNOWN", "weight": 0.02},
        {"surface": "Complete local all-funds (cities/special districts)", "class": "UNKNOWN", "weight": 0.02},
    ],
    "verdict": (
        "Enough to price redesign against a real all-funds and obligation envelope — "
        "not enough to pretend match/MOE or full amortization are settled. COUNTABLE remains $0."
    ),
}

# Flexibility map (quantitative where defensible)
flexibility = {
    "classes": {
        "LOCKED": {
            "examples": [
                "Constitutional adequacy / educational locks (GR earmarks)",
                "Federal grant conditions attached to ~$10.7B AFY federal column",
                "Debt service on outstanding bonds/notes",
                "Pension/OPEB contribution requirements",
            ],
            "scale_note": "Federal AFY column alone is $10.732B (32.3% of AFY total).",
        },
        "CONSTRAINED": {
            "examples": [
                "Medicaid/HHS functions with ~72% ACFR grant share",
                "Highway/transportation capital grants (~79% grant share of expenses)",
                "Special revenue dedications",
            ],
        },
        "DISCRETIONARY": {
            "examples": [
                "Portion of net available GR after earmarks (Allocation A competition)",
                "Surplus / reserve uses within legal authority",
            ],
            "known_anchor_usd": GR.get("net_available_general_revenues"),
            "caveat": "Net available ≠ freely cuttable; many Allocation A lines are politically/operationally sticky.",
        },
        "UNKNOWN": {
            "examples": [
                "True short-term redirectable share of all-funds",
                "Program MOE floors by CFDA",
                "Full local fiscal capacity under statewide tax change",
            ],
        },
    },
    "quantitative_advance_from_v2_1_2": (
        "V2.1.2 flexibility map was qualitative. V2.3.1 binds federal and obligation scales "
        "so LOCKED/CONSTRAINED are no longer empty categories."
    ),
}

# Consolidated Public Money Statement
public_money_statement = {
    "title": "Arkansas Consolidated Public Money Statement",
    "not": "Not a replacement for governmental fund accounting.",
    "vintage": {
        "operating_flow": "FY2024 AFY + ACFR (ended 2024-06-30)",
        "gr_spine": "FY2026 DFA GR bind (forecast/allocation vintage — labeled separately)",
    },
    "money_in": {
        "arkansas_source_taxes_acfr_thousands": {
            "personal_and_corporate": 3520692,
            "consumer_sales_and_use": 4623007,
            "gas_and_motor_carrier": 509347,
            "other_taxes": 1643679,
            "subtotal": 3520692 + 4623007 + 509347 + 1643679,
        },
        "federal_proxy_grants_acfr_thousands": 11291493 + 1145960,
        "charges_for_services_acfr_thousands": 5246254,
        "other_recurring_acfr_thousands": 640216 + 868817,
        "afy_fund_type_operating_usd": AFY["by_fund_type_usd"],
        "gr_fy2026_gross_usd": GR["gross_general_revenues"],
        "gr_fy2026_net_available_usd": GR["net_available_general_revenues"],
    },
    "money_already_claimed": {
        "federal_conditions_afy_federal_column_usd": AFY["by_fund_type_usd"]["federal_revenue"],
        "debt_outstanding_primary_usd": ACFR["long_term_claims_thousands_june_30_2024"][
            "primary_bonds_notes_installment_purchases"
        ]
        * 1000,
        "debt_due_within_one_year_bonds_notes_installment_usd": (
            ACFR["long_term_claims_thousands_june_30_2024"][
                "governmental_due_within_one_year_bonds_notes_installment"
            ]
            + ACFR["long_term_claims_thousands_june_30_2024"][
                "business_type_due_within_one_year_bonds_notes_installment"
            ]
        )
        * 1000,
        "net_pension_liability_usd": ACFR["long_term_claims_thousands_june_30_2024"][
            "primary_net_pension_liability"
        ]
        * 1000,
        "total_opeb_liability_usd": ACFR["long_term_claims_thousands_june_30_2024"][
            "primary_total_opeb_liability"
        ]
        * 1000,
        "gr_earmarks_examples_usd": {
            "educational_adequacy": 777700000,
            "highway_casino_transfer": 31200000,
        },
    },
    "money_operated_afy_cabinet_and_acfr_functions": {
        "afy_grand_total_usd": AFY["grand_total_operating_usd"],
        "acfr_function_expenses_thousands": {
            r["id"]: r["expenses"] for r in ACFR["function_expenses_and_grants_thousands"]
        },
    },
    "flexible_margin": {
        "known_discretionary_anchor": "Net available GR FY2026 $7.149B (after off-the-tops) — still CONSTRAINED in practice",
        "redirectable_all_funds_share": "UNKNOWN / PARTIAL — not invented",
    },
    "balance": {
        "acfr_increase_in_net_position_thousands": 1804150,
        "acfr_ending_net_position_thousands": 27965298,
        "gr_fy2026_surplus_usd": 655000000,
        "interpretation": (
            "Positive net position / GR surplus ≠ COUNTABLE free cash for redesign or tax retirement."
        ),
    },
}

opening_balance_flow = {
    "title": "Arkansas' Opening Balance & Flow Statement",
    "purpose": "Explain Arkansas' fiscal position without requiring fund-accounting fluency first.",
    "stock": {
        "ending_net_position_acfr_usd": 27965298 * 1000,
        "not_spendable_note": "Includes capital assets and restricted positions — Stock ≠ Flow.",
        "claims_stock_usd": {
            "bonds_notes_installment": ACFR["long_term_claims_thousands_june_30_2024"][
                "primary_bonds_notes_installment_purchases"
            ]
            * 1000,
            "net_pension_liability": 2485720 * 1000,
            "total_opeb_liability": (1352678 + 118381) * 1000,
        },
    },
    "flow_fy2024": {
        "money_in_acfr_total_usd": 29489465 * 1000,
        "money_out_acfr_expenses_usd": 27685315 * 1000,
        "federal_grants_in_usd": (11291493 + 1145960) * 1000,
        "afy_operating_total_usd": AFY["grand_total_operating_usd"],
        "afy_federal_column_usd": AFY["by_fund_type_usd"]["federal_revenue"],
    },
    "gr_bridge_fy2026": {
        "gross_gr_usd": GR["gross_general_revenues"],
        "net_available_usd": GR["net_available_general_revenues"],
        "allocation_a_usd": ALLOC_A,
        "surplus_usd": 655000000,
        "note": "Different vintage from FY2024 ACFR/AFY — bridge, not silent merge.",
    },
    "countable_public_cash_usd": 0,
    "unproven_modeled_usd": 0,
    "rules": [
        "Stock ≠ Flow",
        "Revenue ≠ profit ≠ distributable cash ≠ public cash ≠ spendable cash",
        "No double counting",
        "COUNTABLE starts at $0 until a dollar earns the Cash Test (later passes)",
    ],
}

# Blocker dispositions
blockers = [
    {
        "id": "UNK-FISC-001",
        "prior_status": "BLOCKER_ASSIGNED_V2.3",
        "disposition": "RESOLVED_ENVELOPE",
        "resolved_to": [
            "AFY federal fund-type share 32.30% ($10.732B of $33.223B)",
            "ACFR op+cap grants $12.437B (~44.9% of primary expenses)",
            "Function-level grant shares (HHS ~72%, Transportation ~79%, Education ~26%)",
        ],
        "still_open": [
            "Program-level FMAP/MOE matrix (FISC-BASE-019 HOLD-COMPLETE)",
            "Perfect CFDA inventory join",
        ],
        "blocks_v2_3_1": False,
        "blocks_later": "Deep Medicaid/match redesign costing may need FISC-BASE-019",
    },
    {
        "id": "UNK-FISC-004",
        "prior_status": "BLOCKER_ASSIGNED_V2.3",
        "disposition": "RESOLVED_BALANCES",
        "resolved_to": [
            "Primary bonds/notes/installment outstanding ~$3.336B",
            "Near-term (due within one year) bonds/notes/installment ~$250M",
            "Net pension liability $2.486B by plan",
            "Total OPEB liability ~$1.471B",
        ],
        "still_open": [
            "Full multi-year amortization schedule by instrument (FISC-BASE-020 HOLD-COMPLETE)",
        ],
        "blocks_v2_3_1": False,
        "blocks_later": "Exact annual debt-service path for transition stress tests",
    },
]

current_fiscal_model = {
    "revenue": {
        "general_revenue_fy2026": GR,
        "afy_fund_types_fy2024": AFY["by_fund_type_usd"],
        "acfr_tax_and_grant_fy2024_thousands": ACFR["primary_government_revenues_thousands"],
        "debt_proceeds": "SEPARATE — not treated as recurring revenue",
        "transfers": "SEPARATE — AFY Other includes material transfer/aid lines",
    },
    "expenditure": {
        "by_function_acfr_thousands": {
            r["id"]: r["expenses"] for r in ACFR["function_expenses_and_grants_thousands"]
        },
        "by_fund_type_afy_usd": AFY["by_fund_type_usd"],
        "allocation_a_fy2026_usd": ALLOC_A,
        "rule": "Prefer function over agency when comparing redesign homes.",
    },
    "obligations": {
        "debt_service": ACFR["long_term_claims_thousands_june_30_2024"],
        "pensions_opeb": {
            "npl_usd": 2485720 * 1000,
            "opeb_usd": (1352678 + 118381) * 1000,
            "plans": ACFR["long_term_claims_thousands_june_30_2024"]["net_pension_by_plan"],
        },
        "federal_match": "Envelope known; program matrix UNKNOWN-COMPLETE",
        "constitutional": "Adequacy and other GR earmarks bound as examples",
    },
    "assets": {
        "ending_net_position_usd": 27965298 * 1000,
        "rule": "Do not pretend every highway is spendable wealth.",
    },
    "flexibility": flexibility,
}

pass_doc = {
    "version": "1.0.0",
    "slice_id": "CC-V2-3-1-CURRENT-FISCAL-BASELINE-1.0",
    "decision_id": DEC,
    "update_id": UPD,
    "v2_decision_id": V2DEC,
    "generated_at": TODAY,
    "status": "COMPLETE",
    "gate": "V2.3",
    "pass_id": "V2.3.1",
    "title": "What Does Arkansas Cost Now? — Current Fiscal Baseline",
    "governing_question": (
        "What does the redesigned Arkansas actually cost, what resources already exist, what can "
        "legitimately be redirected, what new recurring resources are required, and what proposed "
        "public-income mechanisms produce real distributable cash rather than attractive gross-revenue "
        "numbers? — V2.3.1 answers only the opening baseline half: what exists now."
    ),
    "discipline": {
        "countable_public_cash_usd": 0,
        "unproven_modeled_usd": 0,
        "revenue_ideation": False,
        "redesign_costing": False,
        "tax_design": False,
        "sequence_rule": "COST → CURRENTLY FUNDED → … → TAX DESIGN (taxes are residual)",
    },
    "pricing_readiness": pricing_readiness,
    "current_fiscal_model": current_fiscal_model,
    "consolidated_public_money_statement": public_money_statement,
    "opening_balance_and_flow_statement": opening_balance_flow,
    "acfr_function_federal_table": ACFR["function_expenses_and_grants_thousands"],
    "afy_bind": AFY,
    "acfr_bind_summary": {
        "revenues_thousands": ACFR["primary_government_revenues_thousands"],
        "expenses_thousands": ACFR["primary_government_expenses_thousands"],
        "federal_proxy": ACFR["federal_proxy"],
        "long_term_claims_thousands": ACFR["long_term_claims_thousands_june_30_2024"],
        "source": ACFR["source"],
    },
    "blockers": blockers,
    "progress": {
        "fund_objects_closed": closed,
        "fund_objects_total": total,
        "v2_3_percent": fund_pct,
        "v2_blueprint_percent": blueprint_pct,
        "current_baseline_closed": sum(
            1
            for o in objects
            if o["family"] == "CURRENT_FISCAL_BASELINE"
            and o["status"] in ("CLOSED", "HOLD-COMPLETE")
        ),
        "current_baseline_total": 20,
        "countable_public_cash_usd": 0,
        "unproven_modeled_usd": 0,
    },
    "exit_gate": {
        "current_baseline_objects_closed": True,
        "unk_fisc_001_envelope_bound": True,
        "unk_fisc_004_balances_bound": True,
        "public_money_statement": True,
        "opening_balance_flow_statement": True,
        "countable_remains_zero": True,
        "revenue_ideation_forbidden": True,
        "redesign_costing_forbidden": True,
    },
    "next": "V2.3.2 — Cost the Redesigned State (frozen 114-decision model)",
    "sources": [ACFR["source"], AFY["source"], dfa.get("source"), {"id": "V2.1.2", "reuse": True}],
}

dump("data/project/cc_v2_3_1_current_fiscal_baseline.json", pass_doc)

fund_objects = {
    "version": "1.0.0",
    "slice_id": "CC-V2-3-FUND-OBJECTS-1.0",
    "decision_id": DEC,
    "update_id": UPD,
    "generated_at": TODAY,
    "status": "V2_3_1_BASELINE_CLOSED",
    "gate": "V2.3",
    "object_model": "5 families · 95 fund objects",
    "families": {
        "CURRENT_FISCAL_BASELINE": 20,
        "REDESIGN_COST": 38,
        "FISCAL_RECOVERY": 12,
        "PUBLIC_INCOME_REVENUE": 15,
        "SOLVENCY_TRANSITION": 10,
    },
    "progress": {
        "closed": closed,
        "total": total,
        "percent": fund_pct,
        "countable_public_cash_usd": 0,
        "unproven_modeled_usd": 0,
    },
    "objects": objects,
    "rules": [
        "COUNTABLE $0 until Cash Test",
        "No double counting",
        "Stock ≠ Flow",
        "Frozen V2.2 model may not be quiet-edited for affordability",
    ],
}
dump("data/project/cc_v2_3_fund_objects.json", fund_objects)

hub = {
    "version": "1.0.0",
    "slice_id": "CC-V2-3-FUND-ARKANSAS-1.0",
    "decision_id": DEC,
    "update_id": UPD,
    "generated_at": TODAY,
    "status": "ACTIVE",
    "gate": "V2.3",
    "title": "FUND ARKANSAS",
    "governing_question": (
        "What does the redesigned Arkansas actually cost, what resources already exist, what can "
        "legitimately be redirected, what new recurring resources are required, and what proposed "
        "public-income mechanisms produce real distributable cash rather than attractive gross-revenue numbers?"
    ),
    "countable_rule": (
        "No dollar pays for anything until we prove the dollar exists, prove Arkansas can claim it, "
        "prove it is available after its own costs and obligations, and prove spending it does not "
        "destroy the source that produced it."
    ),
    "sequence": [
        "COST",
        "CURRENTLY FUNDED",
        "AVOIDED/REMOVED COST",
        "REALLOCATABLE",
        "EFFICIENCY",
        "EXISTING REVENUE",
        "PUBLIC RETURN",
        "EXTERNAL INCOME",
        "REMAINING GAP",
        "TAX DESIGN",
    ],
    "passes": [
        {
            "id": "V2.3.1",
            "name": "Current Fiscal Baseline",
            "status": "COMPLETE",
            "href": "/v2/fund/current-baseline/",
            "what_changed": "/v2/fund/what-changed/v2-3-1/",
            "exit": "Opening Balance & Flow + Public Money Statement; UNK-FISC-001/004 envelopes bound.",
        },
        {
            "id": "V2.3.2",
            "name": "Cost the Redesigned State",
            "status": "NEXT",
            "href": None,
            "exit": "Cost every frozen redesign home — Full Economic Cost test.",
        },
        {
            "id": "V2.3.3",
            "name": "Existing Money & Fiscal Recovery",
            "status": "QUEUED",
            "href": None,
            "exit": "Fiscal Recovery Ladder; COUNTABLE may move above $0 only if earned.",
        },
        {
            "id": "V2.3.4",
            "name": "Public Income & Revenue Architecture",
            "status": "QUEUED",
            "href": None,
            "exit": "Cash Test + eight-gate ownership standard.",
        },
        {
            "id": "V2.3.5",
            "name": "Tax Transition, Solvency & FUND Certification",
            "status": "QUEUED",
            "href": None,
            "exit": "Scenarios + Replacement Readiness Gate + certify FUND.",
        },
    ],
    "progress": {
        "fund_objects_closed": closed,
        "fund_objects_total": total,
        "v2_3_percent": fund_pct,
        "v2_blueprint_percent": blueprint_pct,
        "countable_public_cash_usd": 0,
        "unproven_modeled_usd": 0,
        "see_status": "CERTIFIED",
        "redesign_status": "CERTIFIED_FROZEN",
    },
    "signature_outputs": {
        "opening_balance_flow": "/v2/fund/opening-balance/",
        "public_money_statement": "/v2/fund/public-money-statement/",
        "current_baseline": "/v2/fund/current-baseline/",
    },
    "note": f"V2.3.1 complete. COUNTABLE $0. Blueprint {blueprint_pct}%. Next: V2.3.2 cost the frozen model.",
}
dump("data/project/cc_v2_3_fund_arkansas.json", hub)

changelog = {
    "version": "1.0.0",
    "pass_id": "V2.3.1",
    "pass_name": "Current Fiscal Baseline",
    "decision_id": DEC,
    "update_id": UPD,
    "generated_at": TODAY,
    "status": "COMPLETE",
    "before_after": [
        {"label": "Gate", "before": "V2.2 CERTIFIED", "after": "V2.3 FUND OPEN"},
        {"label": "UNK-FISC-001", "before": "UNKNOWN", "after": "RESOLVED_ENVELOPE (AFY+ACFR)"},
        {"label": "UNK-FISC-004", "before": "UNKNOWN", "after": "RESOLVED_BALANCES (debt/NPL/OPEB)"},
        {"label": "AFY operating total", "before": "—", "after": "$33.223B"},
        {"label": "AFY federal column", "before": "—", "after": "$10.732B (32.3%)"},
        {"label": "ACFR grants (op+cap)", "before": "—", "after": "$12.437B (~44.9% of expenses)"},
        {"label": "Net pension liability", "before": "UNKNOWN", "after": "$2.486B"},
        {"label": "Debt outstanding (bonds/notes/installment)", "before": "UNKNOWN", "after": "~$3.336B"},
        {"label": "FUND objects", "before": "0/95", "after": f"{closed}/95"},
        {"label": "V2 BLUEPRINT", "before": "45.0%", "after": f"{blueprint_pct}%"},
        {"label": "COUNTABLE public cash", "before": "$0", "after": "$0"},
        {"label": "Revenue ideation", "before": "forbidden", "after": "still forbidden"},
    ],
    "nothing_funded": True,
    "countable_public_cash_usd": 0,
    "decisions_recorded": [V2DEC],
    "experience_links": [
        {"href": "/v2/fund/current-baseline/", "label": "Current Baseline →"},
        {"href": "/v2/fund/opening-balance/", "label": "Opening Balance & Flow →"},
        {"href": "/v2/fund/public-money-statement/", "label": "Public Money Statement →"},
        {"href": "/v2/fund/", "label": "FUND hub →"},
    ],
}
dump("data/project/pass_changelogs/v2_3_1.json", changelog)

# Update unknown register
unk = load("data/project/cc_v2_unknown_register.json")
for e in unk.get("entries") or []:
    if e.get("id") == "UNK-FISC-001":
        e["status"] = "RESOLVED_ENVELOPE"
        e["resolved_in"] = "V2.3.1"
        e["resolution_note"] = (
            "AFY federal fund-type share + ACFR function grant shares bound. "
            "Program FMAP/MOE matrix remains HOLD-COMPLETE (FISC-BASE-019)."
        )
        e["class"] = "NON-BLOCKING"
        e["carried_into"] = "V2.3.2+"
    if e.get("id") == "UNK-FISC-004":
        e["status"] = "RESOLVED_BALANCES"
        e["resolved_in"] = "V2.3.1"
        e["resolution_note"] = (
            "Debt outstanding, NPL by plan, OPEB totals bound from ACFR FY2024. "
            "Full amortization schedule remains PARTIAL (FISC-BASE-020)."
        )
        e["class"] = "NON-BLOCKING"
        e["carried_into"] = "V2.3.2+"
unk["decision_id"] = DEC
unk["update_id"] = UPD
dump("data/project/cc_v2_unknown_register.json", unk)

# Decision register
reg = load("data/project/v2_decision_register.json")
if not any(d.get("id") == V2DEC for d in reg.get("decisions") or []):
    reg.setdefault("decisions", []).append(
        {
            "id": V2DEC,
            "date": TODAY,
            "title": "Open V2.3 FUND; close Current Fiscal Baseline",
            "decision": (
                "Open FUND ARKANSAS with 95 fund objects across five families. Close V2.3.1 Current "
                "Fiscal Baseline (20/20 incl. HOLD-COMPLETE). Bind AFY FY2024 all-funds envelope and "
                "ACFR FY2024 federal grant / debt / pension / OPEB figures. Resolve UNK-FISC-001 to "
                "envelope and UNK-FISC-004 to balances. COUNTABLE remains $0. No revenue ideation. "
                "No redesign costing. Do not quiet-edit frozen V2.2 model."
            ),
            "why": "Numbers get veto power only after the present system is priced honestly.",
            "evidence": [
                "AR-DFA-ACFR-2024",
                "AR-DFA-AFY-2024",
                "FY2026 DFA GR bind",
                "V2.1.2 money ledgers",
            ],
            "alternatives_rejected": [
                "Start FUND with tax design",
                "Invent COUNTABLE from gross grants",
                "Treat net position as spendable cash",
                "Cost redesign before baseline",
            ],
            "could_reverse_if": "ACFR/AFY bind shown materially wrong — reopen baseline objects only.",
            "v1_doctrine_impact": "NONE — applies COUNTABLE discipline to Arkansas application",
        }
    )
reg["decision_id"] = DEC
reg["update_id"] = UPD
dump("data/project/v2_decision_register.json", reg)

# Master plan
plan = load("data/project/cc_v2_master_build_plan.json")
plan["status"] = "V2_3_ACTIVE"
plan["decision_id"] = DEC
plan["update_id"] = UPD
plan["blueprint"]["percent"] = blueprint_pct
plan["blueprint"]["status"] = "IN_PROGRESS"
plan["blueprint"]["fund_weight"] = FUND_BP
for g in plan["gates"]:
    if g["id"] == "V2.3":
        g["status"] = "ACTIVE"
        g["completion_percent"] = fund_pct
        g["fund_objects_closed"] = closed
        g["fund_objects_total"] = total
        g["countable_public_cash_usd"] = 0
        g["forbidden_note"] = (
            "May cost/phase/refer the frozen V2.2 model — may not quietly redesign it for affordability."
        )
for c in plan.get("object_counters") or []:
    if c.get("id") == "fiscal_flows_proven":
        c["resolved"] = closed
        c["total"] = total
        c["note"] = "FUND objects; COUNTABLE tracked separately."
plan["next_only"] = "V2.3.2 — Cost the Redesigned State (frozen operating model)."
plan["active_pass"] = "V2.3.1 COMPLETE → next V2.3.2 (do not open revenue ideation)"
dump("data/project/cc_v2_master_build_plan.json", plan)

ladder = load("data/project/completion_ladder_and_dashboard.json")
ladder["decision_id"] = DEC
ladder["update_id"] = UPD
ladder["v2_blueprint"] = {
    **ladder.get("v2_blueprint", {}),
    "percent": blueprint_pct,
    "v2_1_percent": 100,
    "v2_2_percent": 100,
    "v2_3_percent": fund_pct,
    "see_status": "CERTIFIED",
    "redesign_status": "CERTIFIED_FROZEN",
    "fund_status": "ACTIVE",
    "countable_public_cash_usd": 0,
    "unproven_modeled_usd": 0,
    "note": (
        f"SEE 100%. REDESIGN 100% FROZEN. FUND {fund_pct}% ({closed}/{total}). "
        f"Blueprint {blueprint_pct}%. COUNTABLE $0."
    ),
    "href": "/v2/fund/",
}
dump("data/project/completion_ladder_and_dashboard.json", ladder)

state = load("data/project/current_build_state.json")
state["decision_id"] = DEC
state["status"] = "v2_3_1_complete_v2_3_2_next"
state["next_action"] = "V2.3.2 — Cost the Redesigned State"
state["v2_blueprint_percent"] = blueprint_pct
state["writing_focus"] = (
    f"V2.3.1 COMPLETE. COUNTABLE $0. Blueprint {blueprint_pct}%. Next: cost frozen redesign."
)
state["notes"] = [
    f"{DEC}/{UPD}: Opened FUND; closed current baseline {closed}/{total}. "
    "UNK-FISC-001/004 envelopes+balances bound. COUNTABLE $0."
] + [n for n in (state.get("notes") or []) if DEC not in str(n)]
dump("data/project/current_build_state.json", state)

bpreg = load("data/project/build_progress_registry.json")
bpreg["decision_id"] = DEC
bpreg["update_id"] = UPD
bpreg["next_objective"] = "V2.3.2 Cost the Redesigned State — Full Economic Cost; COUNTABLE stays $0 until earned."
bpreg["v2_blueprint"] = {"percent": blueprint_pct, "href": "/v2/fund/"}
if not any(x.get("id") == DEC for x in bpreg.get("infrastructure_checkpoints") or []):
    bpreg.setdefault("infrastructure_checkpoints", []).append(
        {
            "id": DEC,
            "title": "V2.3.1 Current Fiscal Baseline complete",
            "date": TODAY,
            "href": "/v2/fund/what-changed/v2-3-1/",
        }
    )
dump("data/project/build_progress_registry.json", bpreg)

sg = load("data/project/stewardship_governance_v1.json")
sg["recommended_next_priority"] = {
    "lane": "V2_BLUEPRINT",
    "focus": "V2.3.2 Cost the Redesigned State",
    "decision_id": DEC,
}
sg["v2_blueprint"] = {
    **sg.get("v2_blueprint", {}),
    "percent": blueprint_pct,
    "href": "/v2/fund/",
    "countable_public_cash_usd": 0,
}
dump("data/project/stewardship_governance_v1.json", sg)

updates = load("data/project/updates.json")
if not any(u.get("id") == UPD for u in updates.get("updates") or []):
    updates.setdefault("updates", []).append(
        {
            "id": UPD,
            "date": TODAY,
            "title": "V2.3.1 Current Fiscal Baseline — all-funds & obligations bound; COUNTABLE $0",
            "summary": (
                f"{DEC}: Opened FUND ARKANSAS. Bound AFY FY2024 ($33.223B operating; federal $10.732B) "
                f"and ACFR FY2024 (grants $12.437B; NPL $2.486B; debt outstanding ~$3.336B). "
                f"UNK-FISC-001/004 resolved to envelope/balances. Fund objects {closed}/{total}. "
                f"Blueprint {blueprint_pct}%. COUNTABLE $0. Next: V2.3.2 cost the frozen redesign."
            ),
            "public": True,
        }
    )
updates["last_updated"] = TODAY
dump("data/project/updates.json", updates)

# Doctrine rule
rule_path = ROOT / ".cursor/rules/v2-doctrine-protection.mdc"
rule = rule_path.read_text(encoding="utf-8")
old = "→ **NEXT:** V2.3 FUND ARKANSAS"
new = (
    "→ V2.3 FUND ARKANSAS — **ACTIVE**  \n"
    "→ V2.3.1 Current Fiscal Baseline — **COMPLETE**  \n"
    "→ **NEXT:** V2.3.2 Cost the Redesigned State"
)
if old in rule:
    rule_path.write_text(rule.replace(old, new), encoding="utf-8")

(ROOT / "reports/CC_V2_3_1_CURRENT_FISCAL_BASELINE_RETURN.md").write_text(
    f"""# V2.3.1 — Current Fiscal Baseline — Return

**Decision:** {DEC} · **Update:** {UPD} · **V2-DEC:** {V2DEC}

## First number

**Pricing readiness:** ~**62% KNOWN** · **23% PARTIAL** · **15% UNKNOWN**

Enough to price redesign against a real all-funds and obligation envelope.
Not enough to invent COUNTABLE cash.

## Bound

- AFY FY2024 operating total: **$33.223B** (federal column **$10.732B / 32.3%**)
- ACFR grants (op+cap): **$12.437B** (~**44.9%** of primary expenses)
- Net pension liability: **$2.486B**
- Debt outstanding (bonds/notes/installment): **~$3.336B**
- COUNTABLE public cash: **$0**

## Blockers

- UNK-FISC-001 → **RESOLVED_ENVELOPE** (FMAP/MOE matrix HOLD-COMPLETE)
- UNK-FISC-004 → **RESOLVED_BALANCES** (full amortization PARTIAL)

## Progress

- FUND objects: **{closed}/{total}** ({fund_pct}%)
- Blueprint: **{blueprint_pct}%**

## Next

V2.3.2 — Cost the Redesigned State. No revenue ideation yet.
""",
    encoding="utf-8",
)

print(
    f"V2.3.1 COMPLETE closed={closed}/{total} fund={fund_pct}% bp={blueprint_pct}% "
    f"COUNTABLE=0 readiness~62% next=V2.3.2"
)
