"""CC-DEC-197 / UPD-210 — V2.1.2 Government & Money (observation only)."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TODAY = "2026-08-16"
DEC = "CC-DEC-197"
UPD = "UPD-210"


def load(rel: str):
    return json.loads((ROOT / rel).read_text(encoding="utf-8"))


def dump(rel: str, obj):
    path = ROOT / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(obj, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


dfa = load("data/imports/arkansas-revenue-replacement/fy2026_dfa_general_revenue_bind.json")
seed = load("data/imports/arkansas-state-baseline/normalized/fy2026_general_revenue_allocations_seed.json")
millage = load("data/imports/arkansas-revenue-replacement/county_av_millage_levy_map.json")
inventory = load("data/project/cc_v2_geo_arkansas_75_inventory.json")
objects_doc = load("data/project/cc_v2_1_closure_objects.json")
unk = load("data/project/cc_v2_unknown_register.json")
reg = load("data/project/v2_decision_register.json")
plan = load("data/project/cc_v2_master_build_plan.json")
v21 = load("data/project/cc_v2_1_see_arkansas.json")

gr_table = dfa["fy2026_gross_general_revenue_table"]
refunds = dfa["fy2026_refunds_and_net"]
derived = dfa["derived_usd"]
headline = seed["headline"]
patterns_seed = seed["selected_patterns"]

SEE_CLASSES = [
    "Current Service",
    "Transfer",
    "Maintenance",
    "Human Capability",
    "Physical Capital",
    "Risk Protection",
    "Administration",
    "Debt/Legacy Obligation",
    "Economic Development",
    "Mixed/Unknown",
]

# --- Seven ledgers ---
revenue_ledger = {
    "id": "revenue",
    "question": "Where does public money originate?",
    "status": "PARTIAL_FACT_SPINE",
    "scope_note": "General Revenue composition FACT for FY2025–FY2026. All-funds / federal totals UNKNOWN.",
    "entries": [
        {
            "id": f"REV-{i+1:03d}",
            "label": label,
            "fy2025_actual_millions": vals["fy2025_actual"],
            "fy2026_actual_millions": vals["fy2026_actual"],
            "evidence_class": "KNOWN",
            "source_id": "AR-DFA-GR-202606",
            "stream": "general_revenue_gross",
        }
        for i, (label, vals) in enumerate(gr_table.items())
        if label != "Total Gross"
    ]
    + [
        {
            "id": "REV-TOTAL-GROSS",
            "label": "Total Gross General Revenue",
            "fy2025_actual_millions": gr_table["Total Gross"]["fy2025_actual"],
            "fy2026_actual_millions": gr_table["Total Gross"]["fy2026_actual"],
            "fy2026_usd": derived["gross_general_revenues"],
            "evidence_class": "KNOWN",
            "source_id": "AR-DFA-GR-202606",
        },
        {
            "id": "REV-NET-AVAILABLE",
            "label": "Net Available General Revenues",
            "fy2026_actual_millions": refunds["Net Available General Revenues"],
            "fy2026_usd": derived["net_available_general_revenues"],
            "evidence_class": "KNOWN",
            "source_id": "AR-DFA-GR-202606",
            "note": refunds["note"],
        },
        {
            "id": "REV-SURPLUS",
            "label": "Surplus (FY2026)",
            "fy2026_actual_millions": refunds["Surplus"],
            "evidence_class": "KNOWN",
            "source_id": "AR-DFA-GR-202606",
        },
        {
            "id": "REV-FEDERAL-ALL-FUNDS",
            "label": "Federal funds (all-funds statewide)",
            "evidence_class": "UNKNOWN",
            "note": "Not fully normalized in corpus (OV-31-01).",
        },
        {
            "id": "REV-SPECIAL-HIGHWAY-MOTOR",
            "label": "Special revenues (highway / motor fuel)",
            "evidence_class": "PROXY",
            "note": "YTD anchors exist in public_income_engine_base_anchors — not annualized as GR FACT.",
        },
    ],
}

fund_ledger = {
    "id": "fund",
    "question": "Where is money legally/accountingly held?",
    "status": "PARTIAL",
    "entries": [
        {
            "id": "FUND-GR",
            "label": "General Revenue / RSA Allocation A spine",
            "evidence_class": "KNOWN",
            "note": "Visible operating spine for state GR distributed to agencies.",
        },
        {
            "id": "FUND-ED-ADEQUACY",
            "label": "Educational Adequacy Fund",
            "fy2026_net_collections_usd": 777700000,
            "evidence_class": "KNOWN",
            "source_id": "AR-DFA-GR-202606",
            "flexibility": "LOCKED",
            "note": "Dedicated / earmarked — not unconstrained GR.",
        },
        {
            "id": "FUND-HWY-CASINO",
            "label": "Highway Casino Transfer",
            "fy2026_usd_millions": 31.2,
            "evidence_class": "KNOWN",
            "flexibility": "LOCKED",
        },
        {
            "id": "FUND-SPECIAL-OTHER",
            "label": "Other special / cash / constitutional funds",
            "evidence_class": "UNKNOWN",
            "note": "Full fund chart of accounts not ingested.",
        },
        {
            "id": "FUND-LOCAL-PROPERTY",
            "label": "Local property / school foundation layers",
            "evidence_class": "PROXY",
            "note": "URT/local foundation binds exist separately from state GR.",
        },
    ],
}

# Spending with SEE classes (descriptive only)
spending_map = [
    ("dhs_total", "Department of Human Services (total)", "Transfer", "CONSTRAINED", ["healthcare", "human_services"]),
    ("institutions_of_higher_education_total", "Institutions of Higher Education", "Human Capability", "DISCRETIONARY", ["education"]),
    ("corrections_department_total", "Department of Corrections (package)", "Risk Protection", "CONSTRAINED", ["justice"]),
    ("education_freedom_accounts", "DESE — Education Freedom Accounts", "Human Capability", "DISCRETIONARY", ["education"]),
    ("higher_education_institutions_plus_related", "Higher Education Institutions (related total)", "Human Capability", "DISCRETIONARY", ["education"]),
]

spending_entries = []
for sid, label, see_class, flex, homes in spending_map:
    row = next(p for p in patterns_seed if p["id"] == sid)
    entry = {
        "id": f"SPEND-{sid}",
        "label": label,
        "fy2026_allocation_a_usd": row["fy2026_a"],
        "share_of_gr_distributed": round(row["fy2026_a"] / headline["general_revenue_distributed_to_agencies_and_institutions_fy2026_a"], 4),
        "funding_source": "state_general_revenue_allocation_a",
        "recurring": True,
        "state_federal_local": "state",
        "operating_capital": "operating",
        "see_class": see_class,
        "flexibility": flex,
        "evidence_class": "KNOWN",
        "source_id": "AR-FISCAL-SUMMARY-2025R-FY2026",
        "home_ids": homes,
        "judgment": None,
    }
    if "fy2025" in row:
        entry["fy2025_usd"] = row["fy2025"]
        entry["dollar_change"] = row.get("dollar_change")
    if "components" in row:
        entry["components"] = row["components"]
    spending_entries.append(entry)

spending_entries.insert(
    0,
    {
        "id": "SPEND-GR-DISTRIBUTED-TOTAL",
        "label": "General Revenue distributed to agencies and institutions (Allocation A)",
        "fy2026_allocation_a_usd": headline["general_revenue_distributed_to_agencies_and_institutions_fy2026_a"],
        "fy2025_usd": headline["prior_year_fy2025"],
        "dollar_change": headline["dollar_change"],
        "percent_change": headline["percent_change"],
        "see_class": "Mixed/Unknown",
        "flexibility": "MIXED",
        "evidence_class": "KNOWN",
        "source_id": "AR-FISCAL-SUMMARY-2025R-FY2026",
    },
)

spending_ledger = {
    "id": "spending",
    "question": "What functions consume it?",
    "status": "PARTIAL_FACT_SPINE",
    "scope_note": "Selected Allocation A patterns only — not full appropriation anthropology.",
    "see_classes_used": SEE_CLASSES,
    "rule": "Descriptive classes only. No wasteful/productive/good/bad labels.",
    "entries": spending_entries,
}

obligation_ledger = {
    "id": "obligation",
    "question": "What has already claimed future money?",
    "status": "PARTIAL",
    "entries": [
        {
            "id": "OBL-EARMARK-ADEQUACY",
            "label": "Educational Adequacy dedicated collections",
            "evidence_class": "KNOWN",
            "flexibility": "LOCKED",
            "amount_fy2026_usd": 777700000,
        },
        {
            "id": "OBL-EARMARK-HWY-CASINO",
            "label": "Highway Casino Transfer",
            "evidence_class": "KNOWN",
            "flexibility": "LOCKED",
            "amount_fy2026_millions": 31.2,
        },
        {
            "id": "OBL-CORRECTIONS-MEDICAL",
            "label": "Corrections medical services contract (within package)",
            "evidence_class": "KNOWN",
            "flexibility": "CONSTRAINED",
            "amount_fy2026_usd": 139398915,
            "note": "Contractual / operational constraint inside corrections package.",
        },
        {
            "id": "OBL-DEBT",
            "label": "State debt service (all instruments)",
            "evidence_class": "UNKNOWN",
            "flexibility": "LOCKED",
            "note": "Debt obligations status OPEN in baseline corpus.",
        },
        {
            "id": "OBL-PENSIONS",
            "label": "Pension / OPEB long-term liabilities",
            "evidence_class": "UNKNOWN",
            "flexibility": "LOCKED",
            "note": "CAFR pension notes not yet bound as V2.1 panel.",
        },
        {
            "id": "OBL-FEDERAL-MATCH",
            "label": "Federal matching / maintenance-of-effort conditions",
            "evidence_class": "UNKNOWN",
            "flexibility": "CONSTRAINED",
            "note": "Function-level federal match matrix not yet normalized.",
        },
    ],
}

asset_ledger = {
    "id": "asset",
    "question": "What does Arkansas own/control?",
    "status": "ENUMERATED_UNKNOWN_SCALE",
    "entries": [
        {
            "id": "ASSET-PUBLIC-INFRA",
            "label": "Public infrastructure (roads, facilities, systems)",
            "evidence_class": "UNKNOWN",
            "note": "Ownership roster deferred; maintenance vs expansion pattern flagged as observation target.",
        },
        {
            "id": "ASSET-SCHOOL-LOCAL",
            "label": "Local school / municipal capital (via property layers)",
            "evidence_class": "PROXY",
            "note": "County AV/millage map provides local tax base proxies, not asset valuations.",
        },
        {
            "id": "ASSET-ENTERPRISE",
            "label": "Public enterprise / investment assets",
            "evidence_class": "UNKNOWN",
        },
    ],
}

transfer_ledger = {
    "id": "transfer",
    "question": "How does money move state ↔ local ↔ federal?",
    "status": "PARTIAL",
    "entries": [
        {
            "id": "XFER-GR-TO-AGENCIES",
            "label": "State GR Allocation A → agencies/institutions",
            "fy2026_usd": headline["general_revenue_distributed_to_agencies_and_institutions_fy2026_a"],
            "evidence_class": "KNOWN",
        },
        {
            "id": "XFER-COUNTY-JAIL-REIMB",
            "label": "County jail reimbursement (within corrections package)",
            "fy2026_usd": 34800000,
            "evidence_class": "KNOWN",
            "direction": "state → local",
        },
        {
            "id": "XFER-FEDERAL-TO-STATE",
            "label": "Federal → state (all major functions)",
            "evidence_class": "UNKNOWN",
        },
        {
            "id": "XFER-STATE-TO-LOCAL-ED",
            "label": "State → local education (beyond selected lines)",
            "evidence_class": "UNKNOWN",
            "note": "Foundation/adequacy mechanics exist; full county flow panel not bound.",
        },
        {
            "id": "XFER-LOCAL-PROPERTY",
            "label": "Local property collections (school/county theoretical levies)",
            "evidence_class": "PROXY",
            "source": "county_av_millage_levy_map.json",
            "aggregates": millage.get("aggregates"),
        },
    ],
}

tax_expenditure_ledger = {
    "id": "tax_expenditure",
    "question": "What revenue does Arkansas deliberately forgo?",
    "status": "OPEN",
    "entries": [
        {
            "id": "TXE-PANEL",
            "label": "Official tax-expenditure / incentive inventory",
            "evidence_class": "UNKNOWN",
            "note": "No normalized statewide tax-expenditure panel bound in V2.1 corpus yet.",
        }
    ],
}

ledgers = {
    "revenue": revenue_ledger,
    "fund": fund_ledger,
    "spending": spending_ledger,
    "obligation": obligation_ledger,
    "asset": asset_ledger,
    "transfer": transfer_ledger,
    "tax_expenditure": tax_expenditure_ledger,
}

# Central flow
money_map = {
    "title": "Arkansas Public Money System — reconciled flow (observation)",
    "flow": [
        "ARKANSAS ECONOMY / HOUSEHOLDS / FEDERAL GOVERNMENT",
        "Revenue collection",
        "Fund structure",
        "Appropriation / legal dedication",
        "Agency or local recipient",
        "Program / function",
        "Actual expenditure",
        "Household / institution / business / infrastructure",
        "Observable result where evidence exists",
    ],
    "claims_on_flexibility": [
        "Debt",
        "Pensions",
        "Contracts",
        "Maintenance",
        "Constitutional obligations",
        "Federal conditions",
    ],
    "spine_now": {
        "gross_gr_fy2026_usd": derived["gross_general_revenues"],
        "net_available_gr_fy2026_usd": derived["net_available_general_revenues"],
        "allocation_a_fy2026_usd": headline["general_revenue_distributed_to_agencies_and_institutions_fy2026_a"],
        "evidence_class": "KNOWN",
        "not_claimed": [
            "all_funds_complete",
            "federal_share_statewide",
            "actual_vs_appropriated_outturn",
            "countable_replacement_revenue",
        ],
    },
}

# Historical panel FY2016–FY2026
years = [f"FY{y}" for y in range(2016, 2027)]
historical = {
    "title": "Historical Budget Panel",
    "target_range": "FY2016–FY2026",
    "comparability_rule": "Populate only when source-comparable. Do not silently normalize discontinuities.",
    "transforms_attempted_when_data_exists": [
        "NOMINAL",
        "REAL",
        "PER_PERSON",
        "CASELOAD",
        "SERVICE",
        "FUNDING_MIX",
        "STRUCTURAL",
    ],
    "series": [
        {
            "id": "HIST-GR-GROSS",
            "label": "Gross General Revenue",
            "unit": "USD_millions",
            "source_when_known": "AR-DFA-GR-202606",
            "by_year": {
                **{y: {"value": None, "evidence_class": "UNKNOWN"} for y in years},
                "FY2025": {
                    "value": gr_table["Total Gross"]["fy2025_actual"],
                    "evidence_class": "KNOWN",
                },
                "FY2026": {
                    "value": gr_table["Total Gross"]["fy2026_actual"],
                    "evidence_class": "KNOWN",
                },
            },
            "transforms": {
                "NOMINAL": "AVAILABLE for FY2025–FY2026",
                "REAL": "UNKNOWN — CPI series not yet joined",
                "PER_PERSON": "UNKNOWN — population join not yet applied to GR panel",
                "CASELOAD": "N/A for gross GR",
                "FUNDING_MIX": "UNKNOWN — federal share absent",
                "STRUCTURAL": "PARTIAL — two-year YoY only",
            },
        },
        {
            "id": "HIST-GR-ALLOCATION-A",
            "label": "GR distributed to agencies/institutions (Allocation A)",
            "unit": "USD",
            "source_when_known": "AR-FISCAL-SUMMARY-2025R-FY2026",
            "by_year": {
                **{y: {"value": None, "evidence_class": "UNKNOWN"} for y in years},
                "FY2025": {
                    "value": headline["prior_year_fy2025"],
                    "evidence_class": "KNOWN",
                },
                "FY2026": {
                    "value": headline["general_revenue_distributed_to_agencies_and_institutions_fy2026_a"],
                    "evidence_class": "KNOWN",
                },
            },
            "transforms": {
                "NOMINAL": "AVAILABLE FY2025–FY2026 (+2.89%)",
                "REAL": "UNKNOWN",
                "PER_PERSON": "UNKNOWN",
                "CASELOAD": "UNKNOWN",
                "FUNDING_MIX": "state GR only in this series",
                "STRUCTURAL": "PARTIAL — incremental YoY growth observation only",
            },
        },
        {
            "id": "HIST-EFA",
            "label": "Education Freedom Accounts (DESE)",
            "unit": "USD",
            "by_year": {
                **{y: {"value": None, "evidence_class": "UNKNOWN"} for y in years},
                "FY2025": {"value": 97487318, "evidence_class": "KNOWN"},
                "FY2026": {"value": 187487318, "evidence_class": "KNOWN"},
            },
            "transforms": {
                "NOMINAL": "AVAILABLE (+$90M YoY)",
                "REAL": "UNKNOWN",
                "PER_PERSON": "UNKNOWN — recipient counts not bound",
                "CASELOAD": "UNKNOWN",
                "STRUCTURAL": "OBSERVATION — policy-created growth inside education appropriation",
            },
        },
    ],
    "discontinuities": [
        {
            "id": "DISC-001",
            "note": "FY2016–FY2024 GR / Allocation A not ingested — cells UNKNOWN, not silently interpolated.",
        }
    ],
}

# Fiscal flexibility map
flexibility = {
    "title": "Fiscal Flexibility Map",
    "rule": "Not every dollar legislators see is equally movable.",
    "classes": ["LOCKED", "CONSTRAINED", "DISCRETIONARY", "UNKNOWN"],
    "buckets": [
        {
            "class": "LOCKED",
            "examples": [
                "Educational Adequacy dedicated collections",
                "Highway Casino Transfer",
                "Debt service (when bound)",
                "Pension obligations (when bound)",
            ],
            "evidence_class": "PARTIAL",
        },
        {
            "class": "CONSTRAINED",
            "examples": [
                "DHS / Medicaid-related GR (federal match conditions likely — not yet quantified)",
                "Corrections medical contract",
                "Federal MOE / matching programs (UNKNOWN amounts)",
            ],
            "evidence_class": "PARTIAL",
        },
        {
            "class": "DISCRETIONARY",
            "examples": [
                "Selected education-choice appropriations within GR (short-term legislative allocation discretion — still politically/operationally sticky)",
            ],
            "evidence_class": "PARTIAL",
            "caveat": "Discretionary ≠ unimportant or easy to cut — only short-term allocation flexibility class.",
        },
        {
            "class": "UNKNOWN",
            "examples": [
                "Share of all-funds activity that is truly redirectable",
                "Full federal match matrix",
                "Complete debt/pension claim schedule",
            ],
            "evidence_class": "UNKNOWN",
        },
    ],
    "teaching_contrast": {
        "total_government_activity": "UNKNOWN at all-funds resolution",
        "amount_realistically_redirectable_short_term": "UNKNOWN — flexibility map is qualitative until all-funds bind",
        "known_gr_allocation_a_spine_usd": headline["general_revenue_distributed_to_agencies_and_institutions_fy2026_a"],
    },
}

federal_dependency = {
    "title": "Federal Dependency Lens",
    "rule": "No political judgment — construct the dependency graph for later resilience tests.",
    "questions_per_function": [
        "How much originates federally?",
        "What conditions accompany it?",
        "Does Arkansas provide matching money?",
        "What happens if federal participation changes?",
        "Does the program disappear, become a state obligation, or become legally uncertain?",
    ],
    "functions": [
        {
            "function": "Medicaid / DHS medical",
            "federal_share": "UNKNOWN",
            "match": "UNKNOWN",
            "if_federal_changes": "UNKNOWN",
            "evidence_class": "UNKNOWN",
            "note": "Largest GR Allocation A recipient is DHS — federal overlay not yet quantified.",
        },
        {
            "function": "K-12 / adequacy / foundation",
            "federal_share": "UNKNOWN",
            "evidence_class": "UNKNOWN",
            "local_overlay": "PROXY — property/URT layers exist separately",
        },
        {
            "function": "Higher education",
            "federal_share": "UNKNOWN",
            "evidence_class": "UNKNOWN",
        },
        {
            "function": "Transportation / highway",
            "federal_share": "UNKNOWN",
            "evidence_class": "UNKNOWN",
            "state_earmark_known": "Highway Casino Transfer $31.2M (state earmark, not federal)",
        },
        {
            "function": "All-funds statewide",
            "federal_share": "UNKNOWN",
            "evidence_class": "UNKNOWN",
            "open_id": "OV-31-01",
        },
    ],
}

# Observed patterns (OBSERVATION not PROBLEM)
observed_patterns = [
    {
        "id": "PAT-FISC-001",
        "observation": "Gross General Revenue rose from $8,359.7M (FY2025) to $8,686.6M (FY2026) in nominal DFA actuals.",
        "class": "OBSERVATION",
        "not": "PROBLEM / judgment about adequacy or excess",
        "evidence_class": "KNOWN",
        "sources": ["AR-DFA-GR-202606"],
    },
    {
        "id": "PAT-FISC-002",
        "observation": "GR distributed to agencies/institutions (Allocation A) rose ~2.89% YoY ($6.311B → $6.494B).",
        "class": "OBSERVATION",
        "not": "Claim that government 'grew too much' or 'not enough'",
        "evidence_class": "KNOWN",
        "sources": ["AR-FISCAL-SUMMARY-2025R-FY2026"],
    },
    {
        "id": "PAT-FISC-003",
        "observation": "Education Freedom Accounts nearly doubled in Allocation A ($97.5M → $187.5M, +$90M).",
        "class": "OBSERVATION",
        "not": "Endorsement or condemnation of the policy",
        "evidence_class": "KNOWN",
        "sources": ["AR-FISCAL-SUMMARY-2025R-FY2026"],
    },
    {
        "id": "PAT-FISC-004",
        "observation": "DHS alone accounts for ~28.6% of FY2026 GR Allocation A distributed total in the selected seed.",
        "class": "OBSERVATION",
        "not": "Diagnosis that DHS is 'too large'",
        "evidence_class": "KNOWN",
        "sources": ["AR-FISCAL-SUMMARY-2025R-FY2026"],
    },
    {
        "id": "PAT-FISC-005",
        "observation": "Individual Income + Sales & Use dominate gross GR (~$3.86B + $3.67B of $8.69B in FY2026).",
        "class": "OBSERVATION",
        "not": "Tax redesign recommendation",
        "evidence_class": "KNOWN",
        "sources": ["AR-DFA-GR-202606"],
    },
    {
        "id": "PAT-FISC-006",
        "observation": "Material dedicated streams (Educational Adequacy ~$777.7M net collections; Highway Casino Transfer $31.2M) sit outside unconstrained GR.",
        "class": "OBSERVATION",
        "not": "Recommendation to unlock earmarks",
        "evidence_class": "KNOWN",
        "sources": ["AR-DFA-GR-202606"],
    },
    {
        "id": "PAT-FISC-007",
        "observation": "FY2016–FY2024 historical GR/Allocation A cells remain UNKNOWN — two-year panel is not a decade river.",
        "class": "OBSERVATION",
        "not": "License to interpolate missing years",
        "evidence_class": "KNOWN_GAP",
    },
]

# Visuals contracts
visuals = [
    {
        "id": "VIS-100-DOLLAR",
        "title": "Arkansas' $100 Public Dollar",
        "status": "ILLUSTRATIVE_CONTRACT",
        "rule": "Only publish as ILLUSTRATION unless all-funds composition is KNOWN.",
        "defensible_now": False,
        "reason": "Federal/all-funds composition UNKNOWN — a $100 chart on GR alone would mislead if labeled as 'public resources'.",
    },
    {
        "id": "VIS-TEN-YEAR-RIVER",
        "title": "Ten-Year Money River",
        "status": "PARTIAL",
        "rule": "Show FY2025–FY2026 FACT segments; leave FY2016–FY2024 as UNKNOWN gaps — do not smooth.",
    },
    {
        "id": "VIS-FLEX-MAP",
        "title": "Fiscal Flexibility Map",
        "status": "QUALITATIVE_V1",
        "href_section": "flexibility",
    },
    {
        "id": "VIS-FED-DEP",
        "title": "Federal Dependency Map",
        "status": "SKELETON",
        "rule": "Function × federal exposure × geography — exposure mostly UNKNOWN for now.",
    },
]

# Close money-related objects
NEW_CLOSURES = {
    ("revenue", "B"): ("COMPLETE", "GR composition FY2025–FY2026 FACT spine bound."),
    ("revenue", "F"): ("COMPLETE", "Gross → refunds/earmarks → net available → Allocation A flow mapped."),
    ("revenue", "D"): ("COMPLETE", "Revenue depends on economy/households; earmarks constrain fungibility."),
    ("revenue", "E"): ("COMPLETE", "AR-DFA-GR-202606 primary."),
    ("expenditures", "B"): ("COMPLETE", "Selected Allocation A function spine bound."),
    ("expenditures", "F"): ("COMPLETE", "Agency/function consumption mapped for major GR lines."),
    ("expenditures", "D"): ("COMPLETE", "Spending constrained by earmarks, contracts, likely federal conditions."),
    ("expenditures", "E"): ("COMPLETE", "AR-FISCAL-SUMMARY-2025R-FY2026 primary."),
    ("agencies", "B"): ("COMPLETE", "Major GR recipients identified (DHS, Higher Ed, Corrections, EFA)."),
    ("agencies", "F"): ("COMPLETE", "Allocation A → agency package flows for selected entities."),
    ("agencies", "D"): ("COMPLETE", "Agency continuity depends on GR + unknown federal overlays."),
    ("agencies", "E"): ("COMPLETE", "Fiscal Summary seed."),
    ("federal_dependency", "B"): ("UNKNOWN-COMPLETE", "Statewide federal share not normalized — UNKNOWN is the result."),
    ("federal_dependency", "F"): ("UNKNOWN-COMPLETE", "Federal→state→program flow matrix not bound."),
    ("federal_dependency", "D"): ("COMPLETE", "Dependency graph questions locked per function."),
    ("federal_dependency", "E"): ("COMPLETE", "Evidence hierarchy + OV-31-01 gap recorded."),
    ("pensions", "B"): ("UNKNOWN-COMPLETE", "CAFR pension panel not bound."),
    ("pensions", "F"): ("UNKNOWN-COMPLETE", "Contribution/benefit flows not bound."),
    ("pensions", "D"): ("COMPLETE", "Pensions classed as LOCKED future claims when present."),
    ("pensions", "E"): ("COMPLETE", "Gap explicit in Obligation Ledger."),
    ("public_assets", "B"): ("UNKNOWN-COMPLETE", "Statewide public asset valuation not bound."),
    ("public_assets", "F"): ("UNKNOWN-COMPLETE", "Maintenance vs capital expansion cash flows not bound."),
    ("public_assets", "D"): ("COMPLETE", "Assets sit opposite obligations on public balance sheet conceptually."),
    ("public_assets", "E"): ("COMPLETE", "Asset Ledger opened with UNKNOWN scale."),
    ("local_government", "B"): ("COMPLETE", "Local property AV/millage proxies field-first across 75 counties."),
    ("local_government", "F"): ("PARTIAL" if False else "UNKNOWN-COMPLETE", "State→local education/jail flows partial; full P&L UNKNOWN."),
    ("local_government", "D"): ("COMPLETE", "Local capacity depends on AV, mills, state transfers, federal grants."),
    ("local_government", "E"): ("COMPLETE", "Millage map + selected state→local lines."),
    ("education", "F"): ("COMPLETE", "Higher ed + EFA GR flows bound; K-12 adequacy earmark known."),
    ("healthcare", "F"): ("COMPLETE", "DHS GR Allocation A as medical/human-services spine (federal overlay UNKNOWN)."),
    ("human_services", "F"): ("COMPLETE", "DHS package as primary GR consumer."),
    ("procurement", "B"): ("UNKNOWN-COMPLETE", "Statewide procurement spend panel not bound this pass."),
    ("procurement", "E"): ("COMPLETE", "Deferred explicitly."),
    ("economic_development", "B"): ("UNKNOWN-COMPLETE", "Incentive/tax-expenditure panel UNKNOWN."),
    ("economic_development", "E"): ("COMPLETE", "Tax-Expenditure Ledger opened as OPEN/UNKNOWN."),
}

# Fix local_government F properly
NEW_CLOSURES[("local_government", "F")] = (
    "UNKNOWN-COMPLETE",
    "Full state↔local flow panel incomplete; selected jail reimbursement + property proxies only.",
)

obj_list = objects_doc["objects"]
closed_before = sum(1 for o in obj_list if o["status"] in ("COMPLETE", "UNKNOWN-COMPLETE"))
for o in obj_list:
    key = (o["home_id"], o["type"])
    if key in NEW_CLOSURES:
        status, note = NEW_CLOSURES[key]
        # Don't downgrade COMPLETE to UNKNOWN-COMPLETE
        if o["status"] == "COMPLETE" and status == "UNKNOWN-COMPLETE":
            continue
        if o["status"] == "OPEN" or o["closed_by_pass"] in (None, "V2.1.1") and key in NEW_CLOSURES:
            # Allow upgrade from OPEN; allow refine from V2.1.1 if still OPEN
            if o["status"] == "OPEN" or (
                o["status"] in ("COMPLETE", "UNKNOWN-COMPLETE") and o.get("closed_by_pass") == "V2.1.1" and False
            ):
                pass
        if o["status"] == "OPEN":
            o["status"] = status
            o["note"] = note
            o["closed_by_pass"] = "V2.1.2"

closed_after = sum(1 for o in obj_list if o["status"] in ("COMPLETE", "UNKNOWN-COMPLETE"))
# Also close ones that were OPEN matching NEW_CLOSURES - the loop above should work
# Re-run clearer:
for o in obj_list:
    key = (o["home_id"], o["type"])
    if key in NEW_CLOSURES and o["status"] == "OPEN":
        o["status"], o["note"] = NEW_CLOSURES[key]
        o["closed_by_pass"] = "V2.1.2"

closed_after = sum(1 for o in obj_list if o["status"] in ("COMPLETE", "UNKNOWN-COMPLETE"))
v21_pct = round(100.0 * closed_after / len(obj_list), 1)
blueprint_pct = round(0.25 * v21_pct, 1)

objects_doc["closed_objects"] = closed_after
objects_doc["open_objects"] = len(obj_list) - closed_after
objects_doc["v2_1_completion_percent"] = v21_pct
objects_doc["decision_id"] = DEC
objects_doc["update_id"] = UPD
dump("data/project/cc_v2_1_closure_objects.json", objects_doc)

# GEO field-first: government_public_money across all 75
name_to_millage = {c["county"]: c for c in millage["counties"]}
geo_partial = 0
for rec in inventory["records"]:
    # Match millage county names (without "County")
    m = name_to_millage.get(rec["county"]) or name_to_millage.get(rec["county"].replace("St. ", "St. "))
    # St. Francis special
    if not m and rec["county"] == "St. Francis":
        m = name_to_millage.get("St. Francis") or name_to_millage.get("Saint Francis")
    cell = rec["dimensions"]["government_public_money"]
    if m:
        cell["status"] = "PARTIAL"
        cell["evidence_class"] = "PROXY"
        cell["metrics"] = {
            "total_assessed_value": {
                "value": m["total_assessed"],
                "unit": "USD",
                "evidence_class": "PROXY",
                "source": "county_av_millage_levy_map",
            },
            "avg_overall_mills": {
                "value": m["avg_overall_mills"],
                "evidence_class": "PROXY",
                "source": "county_av_millage_levy_map",
            },
            "school_theoretical_levy": {
                "value": m["school_theoretical_levy"],
                "unit": "USD",
                "evidence_class": "PROXY",
                "source": "county_av_millage_levy_map",
            },
            "county_theoretical_levy": {
                "value": m["county_theoretical_levy"],
                "unit": "USD",
                "evidence_class": "PROXY",
                "source": "county_av_millage_levy_map",
            },
        }
        cell["notes"] = [
            "Field-first V2.1.2 seed: local tax-base PROXY only — not a county P&L and not state GR.",
            "KNOWN/DERIVED/PROXY/UNKNOWN discipline applies.",
        ]
        cell["arkansas_now"] = (
            "Local property assessed value and theoretical levies provide a partial public-money geography proxy."
        )
        geo_partial += 1
    else:
        cell["status"] = "EMPTY"
        cell["evidence_class"] = "UNKNOWN"
        cell["notes"] = ["No millage join row matched — remains EMPTY."]

inventory["cells_partial"] = sum(
    1 for r in inventory["records"] for d in r["dimensions"].values() if d["status"] == "PARTIAL"
)
inventory["cells_empty"] = inventory["matrix_cells"] - inventory["cells_partial"]
inventory["decision_id"] = DEC
inventory["update_id"] = UPD
inventory["v2_1_2_geo_note"] = f"government_public_money PARTIAL on {geo_partial}/75 counties via AV/millage PROXY."
dump("data/project/cc_v2_geo_arkansas_75_inventory.json", inventory)

# Unknowns
new_unks = [
    {
        "id": "UNK-FISC-001",
        "question": "What is Arkansas' all-funds federal share by major function?",
        "why_unknown": "Federal funds not fully normalized (OV-31-01).",
        "evidence_that_would_resolve": "AFY/CAFR + agency federal schedules joined by function.",
        "v2_2_requires_resolution": True,
        "class": "BLOCKING",
        "home_ids": ["federal_dependency", "revenue", "expenditures"],
        "note": "Blocking for precise V2.2 fiscal redesign of federally entangled functions — not for closing V2.1.2 observation pass.",
        "blocks": "V2.2 funding redesign depth — NOT V2.1.2 closure",
    },
    {
        "id": "UNK-FISC-002",
        "question": "FY2016–FY2024 comparable GR and Allocation A series?",
        "why_unknown": "Prior-year DFA/Fiscal Summary PDFs not ingested.",
        "evidence_that_would_resolve": "Ingest queued historical DFA GR + Allocation A documents.",
        "v2_2_requires_resolution": False,
        "class": "NON-BLOCKING",
        "home_ids": ["revenue", "expenditures"],
    },
    {
        "id": "UNK-FISC-003",
        "question": "Real (inflation-adjusted) and per-capita transforms for major series?",
        "why_unknown": "CPI and population joins not yet applied to fiscal panel.",
        "evidence_that_would_resolve": "BLS CPI + Census PEP join to HIST series.",
        "v2_2_requires_resolution": False,
        "class": "NON-BLOCKING",
        "home_ids": ["expenditures"],
    },
    {
        "id": "UNK-FISC-004",
        "question": "Statewide debt service and pension/OPEB claim schedule?",
        "why_unknown": "CAFR notes not bound into Obligation Ledger amounts.",
        "evidence_that_would_resolve": "CAFR debt + pension extracts.",
        "v2_2_requires_resolution": True,
        "class": "BLOCKING",
        "blocks": "V2.2 redesign of long-term claims — NOT V2.1.2 closure",
        "home_ids": ["pensions", "intergenerational_obligations"],
    },
    {
        "id": "UNK-FISC-005",
        "question": "Official tax-expenditure / incentive inventory totaling forgone revenue?",
        "why_unknown": "No normalized panel in corpus.",
        "evidence_that_would_resolve": "DFA/BLR tax expenditure report bind.",
        "v2_2_requires_resolution": False,
        "class": "NON-BLOCKING",
        "home_ids": ["economic_development", "revenue"],
    },
    {
        "id": "UNK-FISC-006",
        "question": "Complete state→county education/health/infrastructure dollar flows for all 75?",
        "why_unknown": "Only proxies + selected lines bound.",
        "evidence_that_would_resolve": "DESE/DHS/ARDOT county distribution tables.",
        "v2_2_requires_resolution": False,
        "class": "NON-BLOCKING",
        "home_ids": ["local_government", "geographic_disparities"],
    },
]

# For V2.1.2 closure: BLOCKING unknowns block V2.2 depth, not V2.1.2 SEE close
for e in new_unks:
    if not any(x.get("id") == e["id"] for x in unk.get("entries") or []):
        unk.setdefault("entries", []).append(e)
unk["decision_id"] = DEC
unk["update_id"] = UPD
dump("data/project/cc_v2_unknown_register.json", unk)

pass_doc = {
    "version": "1.0.0",
    "slice_id": "CC-V2-1-2-GOVERNMENT-MONEY-1.0",
    "decision_id": DEC,
    "update_id": UPD,
    "generated_at": TODAY,
    "status": "COMPLETE",
    "pass_id": "V2.1.2",
    "title": "Government & Money",
    "epistemic_class": "BASELINE_OBSERVATION_NOT_REDESIGN",
    "governing_question": (
        "Where does Arkansas' public money come from, where does it go, what obligations already "
        "claim it, who controls those flows, and how has that structure changed over time?"
    ),
    "recommendations_made": 0,
    "closure_standard_answers": {
        "where_money_originates": "YES — GR composition FACT; federal/all-funds UNKNOWN",
        "through_what_funds": "PARTIAL — GR/RSA + known earmarks; full fund CoA UNKNOWN",
        "major_functions": "YES — selected Allocation A spine",
        "major_obligations": "PARTIAL — earmarks/contracts known; debt/pensions UNKNOWN amounts",
        "assets": "ENUMERATED with UNKNOWN scale",
        "fiscal_flexibility": "QUALITATIVE map YES; quantitative redirectable share UNKNOWN",
        "federal_dependency": "LENS YES; quantified shares UNKNOWN",
        "historical_change": "PARTIAL — FY2025–FY2026 only; earlier years UNKNOWN",
        "geography": "YES — field-first local AV/millage PROXY on 75 counties",
        "enough_for_v2_2_to_begin_redesign_questions": "YES — with explicit blocking unknowns for federally entangled and long-term claim redesign depth",
    },
    "ledgers": list(ledgers.keys()),
    "money_map": money_map,
    "historical_panel": historical,
    "flexibility_map": flexibility,
    "federal_dependency": federal_dependency,
    "observed_patterns": observed_patterns,
    "visuals": visuals,
    "progress": {
        "baseline_objects_closed_after": closed_after,
        "baseline_objects_total": 152,
        "v2_1_percent": v21_pct,
        "v2_blueprint_percent": blueprint_pct,
        "money_ledgers_populated": 7,
        "historical_series_reconciled": "PARTIAL (FY2025–FY2026)",
        "county_geo_government_public_money_partial": geo_partial,
        "county_geo_government_public_money_empty": 75 - geo_partial,
        "blocking_unknowns": ["UNK-FISC-001", "UNK-FISC-004"],
        "non_blocking_unknowns": ["UNK-FISC-002", "UNK-FISC-003", "UNK-FISC-005", "UNK-FISC-006"],
        "observed_patterns": len(observed_patterns),
        "recommendations_made": 0,
    },
    "surfaces": {
        "hub": "/v2/see-arkansas/",
        "pass": "/v2/see-arkansas/government-money/",
        "what_changed": "/v2/see-arkansas/what-changed/v2-1-2/",
    },
    "next": "V2.1.3 — Production, Ownership & Capital",
    "deferred": [
        "FY2016–FY2024 historical ingest",
        "All-funds federal quantification",
        "CAFR debt/pension bind",
        "Tax expenditure inventory",
        "Defensible $100 Public Dollar (all-funds)",
        "Any redesign, rates, public bank, or pilots",
    ],
}

# Persist ledgers as joined artifact
dump(
    "data/project/cc_v2_1_2_money_ledgers.json",
    {
        "version": "1.0.0",
        "decision_id": DEC,
        "update_id": UPD,
        "generated_at": TODAY,
        "ledgers": ledgers,
        "money_map": money_map,
        "historical_panel": historical,
        "flexibility_map": flexibility,
        "federal_dependency": federal_dependency,
        "observed_patterns": observed_patterns,
        "visuals": visuals,
        "see_classes": SEE_CLASSES,
    },
)
dump("data/project/cc_v2_1_2_government_money.json", pass_doc)

what = {
    "version": "1.0.0",
    "pass_id": "V2.1.2",
    "pass_name": "Government & Money",
    "decision_id": DEC,
    "update_id": UPD,
    "generated_at": TODAY,
    "status": "COMPLETE",
    "before_after": [
        {"label": "V2 BLUEPRINT", "before": "7.2%", "after": f"{blueprint_pct}%"},
        {"label": "V2.1 objects", "before": f"{closed_before}/152", "after": f"{closed_after}/152"},
        {"label": "Money ledgers", "before": "0", "after": "7 joined"},
        {"label": "Historical panel", "before": "frame only", "after": "FY2025–FY2026 FACT; FY2016–FY2024 UNKNOWN"},
        {"label": "GEO government_public_money PARTIAL", "before": "0/75", "after": f"{geo_partial}/75 PROXY"},
        {"label": "Recommendations", "before": "0", "after": "0"},
    ],
    "objects_closed": [o["id"] for o in obj_list if o.get("closed_by_pass") == "V2.1.2"],
    "new_unknowns": [e["id"] for e in new_unks],
    "patterns_observed": [p["id"] for p in observed_patterns],
    "nothing_recommended": True,
    "sources_added": [
        "AR-DFA-GR-202606 (reuse)",
        "AR-FISCAL-SUMMARY-2025R-FY2026 (reuse)",
        "county_av_millage_levy_map (GEO field-first PROXY)",
    ],
    "visuals_added": [
        "/v2/see-arkansas/government-money/",
    ],
    "decisions_recorded": ["V2-DEC-011"],
    "deferred_items": pass_doc["deferred"],
    "experience_links": [
        {"href": "/v2/see-arkansas/government-money/", "label": "Government & Money surface →"},
        {"href": "/v2/see-arkansas/", "label": "V2.1 hub →"},
        {"href": "/v2/see-arkansas/counties/", "label": "Arkansas 75 →"},
        {"href": "/v2/decisions/", "label": "Decision Register →"},
    ],
}
dump("data/project/pass_changelogs/v2_1_2.json", what)

# Decision register
entry = {
    "id": "V2-DEC-011",
    "date": TODAY,
    "title": "Close V2.1.2 Government & Money on GR spine + honest UNKNOWN panel",
    "decision": (
        "Ship seven joined money ledgers, FY2016–FY2026 historical frame with only FY2025–FY2026 populated, "
        "qualitative Fiscal Flexibility Map, Federal Dependency lens, Observed Pattern Register, and "
        "field-first GEO government_public_money PROXY across counties. Recommendations remain 0."
    ),
    "why": "Need a reconciled public-money machine for V2.2 without inventing federal/historical precision.",
    "evidence": ["AR-DFA-GR-202606", "AR-FISCAL-SUMMARY-2025R-FY2026", "V2-GEO-001"],
    "alternatives_rejected": [
        "Invent FY2016–FY2024 series",
        "Invent statewide federal share",
        "Delay V2.1.2 until perfect all-funds anthropology",
        "Moral labeling of expenditures",
    ],
    "could_reverse_if": "Primary DFA/Fiscal Summary binds shown wrong — correct FACTS and re-open affected objects.",
    "v1_doctrine_impact": "NONE",
}
reg["entries"] = [e for e in reg["entries"] if e["id"] != "V2-DEC-011"] + [entry]
reg["decision_id"] = DEC
reg["update_id"] = UPD
dump("data/project/v2_decision_register.json", reg)

# Update V2.1 hub
for p in v21["passes"]:
    if p["id"] == "V2.1.1":
        p["status"] = "COMPLETE"
    if p["id"] == "V2.1.2":
        p["status"] = "COMPLETE"
        p["href"] = "/v2/see-arkansas/government-money/"
        p["what_changed"] = "/v2/see-arkansas/what-changed/v2-1-2/"
    if p["id"] == "V2.1.3":
        p["status"] = "NEXT"
v21["decision_id"] = DEC
v21["update_id"] = UPD
v21["progress"] = {
    "closure_objects_total": 152,
    "closure_objects_closed": closed_after,
    "v2_1_completion_percent": v21_pct,
    "v2_blueprint_percent": blueprint_pct,
}
dump("data/project/cc_v2_1_see_arkansas.json", v21)

# Master plan
plan["decision_id"] = DEC
plan["update_id"] = UPD
plan["blueprint"]["percent"] = blueprint_pct
plan["blueprint"]["status"] = "IN_PROGRESS"
for g in plan["gates"]:
    if g["id"] == "V2.1":
        g["completion_percent"] = v21_pct
        g["objects_closed"] = closed_after
for c in plan["object_counters"]:
    if c["id"] == "baseline_objects_resolved":
        c["resolved"] = closed_after
        c["total"] = 152
plan["next_only"] = "V2.1.3 — Production, Ownership & Capital (describe the productive machine; no redesign)."
plan["active_pass"] = "V2.1.2 COMPLETE → next V2.1.3"
dump("data/project/cc_v2_master_build_plan.json", plan)

# Dials
ladder = load("data/project/completion_ladder_and_dashboard.json")
ladder["decision_id"] = DEC
ladder["update_id"] = UPD
ladder["v2_blueprint"] = {
    **ladder.get("v2_blueprint", {}),
    "percent": blueprint_pct,
    "status": "IN_PROGRESS",
    "note": f"V2.1.2 complete. V2.1 objects {closed_after}/152 ({v21_pct}%). Next: V2.1.3.",
    "href": "/v2/see-arkansas/",
    "v2_1_percent": v21_pct,
    "v2_1_closed": closed_after,
    "v2_1_total": 152,
}
dump("data/project/completion_ladder_and_dashboard.json", ladder)

state = load("data/project/current_build_state.json")
state["decision_id"] = DEC
state["status"] = "v2_1_2_complete_v2_1_3_next"
state["writing_focus"] = (
    f"V2.1.2 COMPLETE. Blueprint {blueprint_pct}%. Next: V2.1.3 Production, Ownership & Capital. Recommendations: 0."
)
state["next_action"] = "V2.1.3 — Production, Ownership & Capital"
state["v2_blueprint_percent"] = blueprint_pct
state["notes"] = [
    f"{DEC} / {UPD}: V2.1.2 Government & Money complete. {closed_after}/152 objects. 0 recommendations."
] + [n for n in (state.get("notes") or []) if DEC not in str(n)]
dump("data/project/current_build_state.json", state)

bpreg = load("data/project/build_progress_registry.json")
bpreg["decision_id"] = DEC
bpreg["update_id"] = UPD
bpreg["next_objective"] = "V2.1.3 Production, Ownership & Capital — describe productive machine; ownership vs location."
bpreg["v2_blueprint"] = {"percent": blueprint_pct, "status": "IN_PROGRESS", "href": "/v2/see-arkansas/"}
if not any(x.get("id") == DEC for x in bpreg.get("infrastructure_checkpoints") or []):
    bpreg.setdefault("infrastructure_checkpoints", []).append(
        {
            "id": DEC,
            "title": "V2.1.2 Government & Money complete",
            "date": TODAY,
            "href": "/v2/see-arkansas/what-changed/v2-1-2/",
        }
    )
dump("data/project/build_progress_registry.json", bpreg)

sg = load("data/project/stewardship_governance_v1.json")
sg["recommended_next_priority"] = {
    "lane": "V2_BLUEPRINT",
    "focus": "V2.1.3 Production, Ownership & Capital",
    "status": "V2_1_ACTIVE",
    "decision_id": DEC,
}
dump("data/project/stewardship_governance_v1.json", sg)

updates = load("data/project/updates.json")
if not any(u.get("id") == UPD for u in updates.get("updates") or []):
    updates["updates"].append(
        {
            "id": UPD,
            "date": TODAY,
            "title": "V2.1.2 Government & Money — public money X-ray complete",
            "summary": (
                f"{DEC}: Seven ledgers, FY2025–FY2026 FACT spine, qualitative flexibility map, "
                f"federal dependency lens, {geo_partial}/75 GEO PROXY cells. "
                f"Objects {closed_after}/152. Blueprint {blueprint_pct}%. Recommendations: 0. Next: V2.1.3."
            ),
            "public": True,
        }
    )
updates["last_updated"] = TODAY
dump("data/project/updates.json", updates)

# Cursor rule
rule_path = ROOT / ".cursor/rules/v2-doctrine-protection.mdc"
rule = rule_path.read_text(encoding="utf-8")
rule = rule.replace(
    "→ V2.1.1 People, Households & Place — **COMPLETE**  \n→ **NEXT:** V2.1.2 Government & Money",
    "→ V2.1.1 People, Households & Place — **COMPLETE**  \n"
    "→ V2.1.2 Government & Money — **COMPLETE**  \n"
    "→ **NEXT:** V2.1.3 Production, Ownership & Capital",
)
rule_path.write_text(rule, encoding="utf-8")

(ROOT / "reports/CC_V2_1_2_GOVERNMENT_MONEY_RETURN.md").write_text(
    f"""# V2.1.2 — Government & Money — Return

**Decision:** {DEC} · **Update:** {UPD} · **Date:** {TODAY}

## Verdict

Pass **COMPLETE**. Observation only. **Recommendations: 0.**

V2.1 objects: **{closed_after}/152** ({v21_pct}%)  
V2 BLUEPRINT: **{blueprint_pct}%**  
GEO government_public_money PARTIAL: **{geo_partial}/75** (PROXY)

## Delivered

- Seven joined money ledgers
- Arkansas Public Money System flow
- Historical panel frame FY2016–FY2026 (FACT only FY2025–FY2026)
- Fiscal Flexibility Map (qualitative)
- Federal Dependency lens (mostly UNKNOWN shares)
- Observed Pattern Register (OBSERVATION not PROBLEM)
- Field-first county public-money proxies

## Next

**V2.1.3 — Production, Ownership & Capital**
""",
    encoding="utf-8",
)

print(f"closed {closed_before}->{closed_after}/152 v21={v21_pct}% bp={blueprint_pct}% geo_partial={geo_partial}")
