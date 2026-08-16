"""CC-DEC-198 / UPD-211 — V2.1.3 Production, Ownership & Capital (observation only)."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TODAY = "2026-08-16"
DEC = "CC-DEC-198"
UPD = "UPD-211"


def load(rel: str):
    return json.loads((ROOT / rel).read_text(encoding="utf-8"))


def dump(rel: str, obj):
    path = ROOT / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(obj, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


objects_doc = load("data/project/cc_v2_1_closure_objects.json")
inventory = load("data/project/cc_v2_geo_arkansas_75_inventory.json")
unk = load("data/project/cc_v2_unknown_register.json")
reg = load("data/project/v2_decision_register.json")
plan = load("data/project/cc_v2_master_build_plan.json")
v21 = load("data/project/cc_v2_1_see_arkansas.json")
ls = load("data/project/arkansas_county_living_systems_explorer.json")
eia = None
try:
    eia = load("data/imports/eia-861/ownership_reliability_bind.json")
except Exception:
    eia = {}

# --- Living systems designated extracts ---
def latest_metric(county_obj, key, prefer_years=None):
    for t in reversed(county_obj.get("timeline") or []):
        m = (t.get("metrics") or {}).get(key)
        if m and m.get("value") is not None:
            if prefer_years and t["year"] not in prefer_years:
                continue
            return t["year"], m
    # fallback any year
    for t in reversed(county_obj.get("timeline") or []):
        m = (t.get("metrics") or {}).get(key)
        if m and m.get("value") is not None:
            return t["year"], m
    return None, None


designated = {}
for c in ls["counties"]:
    fips = c["fips"]
    row = {"county": c["county"], "fips": fips, "role": c.get("role")}
    y, m = latest_metric(c, "farm_operations")
    if m:
        row["farm_operations"] = {"year": y, "value": m["value"], "source": m.get("source_id")}
    y, m = latest_metric(c, "ag_product_sales_usd")
    if m:
        row["ag_product_sales_usd"] = {"year": y, "value": m["value"], "source": m.get("source_id")}
    y, m = latest_metric(c, "acs5_civilian_labor_force")
    if m:
        row["acs5_civilian_labor_force"] = {"year": y, "value": m["value"], "source": m.get("source_id")}
    y, m = latest_metric(c, "acs5_unemployment_rate")
    if m:
        row["acs5_unemployment_rate"] = {"year": y, "value": m["value"], "source": m.get("source_id")}
    y, m = latest_metric(c, "fdic_branch_count")
    if m:
        row["fdic_branch_count"] = {"year": y, "value": m["value"], "source": m.get("source_id")}
    y, m = latest_metric(c, "fdic_deposits_usd")
    if m:
        row["fdic_deposits_usd"] = {"year": y, "value": m["value"], "source": m.get("source_id")}
    designated[fips] = row

# Energy ownership shares if present
energy_own = None
if isinstance(eia, dict):
    # try common shapes
    for k in ("ownership_shares", "by_ownership", "retail_ownership", "summary"):
        if k in eia:
            energy_own = eia[k]
            break
    if energy_own is None and "arkansas" in eia:
        energy_own = eia["arkansas"]

# Hardcoded FACTS from Pass 3.6 evidence_bound (verified in file read)
FACTS = {
    "gdp_2024_usd": 188339600000,
    "mfg_gdp_2023_usd": 25900000000,
    "ag_gdp_2023_usd": 2855000000,
    "qcew_private_wages_2024_usd": 64458593075,
    "qcew_private_employment_2024": 1097701,
    "tourism_spend_2025_usd": 10200000000,
    "taxable_av_2025_usd": 73937121379,
    "food_public_free_cash_usd": 0,
    "farm_operations_2022": 37756,
    "fdic_banks_note": "FDIC active AR banks / deposits bound in Pass 3.4 — deposits ≠ beneficial ownership",
    "energy_retail_2024": {
        "iou_percent": 54.39,
        "coop_percent": 31.91,
        "muni_percent": 12.0,
        "other_percent": 1.71,
        "source": "EIA-861 ownership_reliability_bind",
        "note": "Retail customers — not plant ownership",
    },
    "owner_occupancy_acs": {"value_percent": 66.2, "period": "ACS5 ~2022", "note": "Housing tenure — not firm ownership"},
}

SECTORS = [
    ("agriculture_food", "Agriculture & food", "EXTERNAL-INCOME + LOCAL-SERVING", "ag_gdp + farm sales; processing ownership UNKNOWN"),
    ("forestry_timber", "Forestry & timber", "EXTERNAL-INCOME", "Activity known conceptually; statewide GDP share not separately bound"),
    ("manufacturing", "Manufacturing", "EXTERNAL-INCOME", "Mfg GDP ~$25.9B (2023)"),
    ("steel_metals", "Steel / metals", "EXTERNAL-INCOME", "Nested under manufacturing — plant ownership UNKNOWN"),
    ("logistics_distribution", "Logistics & distribution", "EXTERNAL-INCOME + LOCAL-SERVING", "Corridor activity UNKNOWN at county QCEW"),
    ("energy_utilities", "Energy & utilities", "MIXED", "Retail ownership shares FACT; generation mix UNKNOWN"),
    ("healthcare", "Healthcare", "LOCAL-SERVING + EXTERNAL (regional hubs)", "Employment/wages not sector-split in this spine"),
    ("construction_housing", "Construction & housing", "LOCAL-SERVING", "Taxable AV proxy; stock inventory UNKNOWN"),
    ("retail", "Retail", "LOCAL-SERVING", "Statewide QCEW not sector-split here"),
    ("tourism_hospitality", "Tourism & hospitality", "EXTERNAL-INCOME", "Visitor spend $10.2B (2025) — not COUNTABLE public income"),
    ("finance", "Finance", "MIXED", "FDIC bank access FACT; beneficial ownership UNKNOWN"),
    ("technology_information", "Technology & information", "MIXED", "Scale UNKNOWN at bound resolution"),
    ("defense_aerospace", "Defense & aerospace", "EXTERNAL-INCOME", "Scale UNKNOWN in this corpus spine"),
    ("education_research", "Education & research", "LOCAL-SERVING + EXTERNAL", "Join from public money Higher Ed Allocation A"),
    ("professional_services", "Professional services", "MIXED", "UNKNOWN sector split"),
    ("care", "Care economy", "LOCAL-SERVING", "Capacity UNKNOWN statewide"),
]

production_ledger = {
    "id": "production",
    "question": "What does Arkansas actually produce?",
    "discipline": "Production occurring in Arkansas ≠ productive capital owned by Arkansans ≠ wealth retained by Arkansas households.",
    "statewide_anchors": [
        {"label": "Arkansas GDP (ARNGSP)", "value_usd": FACTS["gdp_2024_usd"], "period": "2024", "evidence_class": "KNOWN", "source": "FRED ARNGSP / Pass 3.6"},
        {"label": "Manufacturing GDP", "value_usd": FACTS["mfg_gdp_2023_usd"], "period": "2023", "evidence_class": "KNOWN"},
        {"label": "Ag/forestry/fishing GDP", "value_usd": FACTS["ag_gdp_2023_usd"], "period": "2023", "evidence_class": "KNOWN"},
        {"label": "QCEW private employment", "value": FACTS["qcew_private_employment_2024"], "period": "2024", "evidence_class": "KNOWN", "source": "BLS QCEW"},
        {"label": "QCEW private wages", "value_usd": FACTS["qcew_private_wages_2024_usd"], "period": "2024", "evidence_class": "KNOWN"},
        {"label": "Tourism visitor spend", "value_usd": FACTS["tourism_spend_2025_usd"], "period": "2025", "evidence_class": "KNOWN", "note": "Scale only — not COUNTABLE public income"},
        {"label": "Farm operations (Census of Ag)", "value": FACTS["farm_operations_2022"], "period": "2022", "evidence_class": "KNOWN"},
        {"label": "Food-hub / processing public free cash", "value_usd": 0, "evidence_class": "KNOWN", "note": "CLOSED — do not reopen facility cashflow"},
    ],
    "sectors": [
        {
            "id": sid,
            "label": label,
            "economy_classes": classes,
            "output_activity": note,
            "employment": "UNKNOWN at sector resolution in this spine (statewide QCEW total known)",
            "wages": "UNKNOWN at sector resolution",
            "establishments": "UNKNOWN at sector resolution",
            "geographic_concentration": "PARTIAL — designated-county ag scaffold only",
            "major_inputs": "UNKNOWN",
            "major_outputs": "PARTIAL where GDP/sales bound",
            "external_markets": "PARTIAL for tourism/mfg/ag export orientation",
            "known_dependencies": "See Dependency Ledger",
            "ownership_evidence": "UNKNOWN for most sectors; energy retail shares FACT; housing tenure proxy",
            "capital_evidence": "UNKNOWN for plant/IP financing; banking access PARTIAL",
            "evidence_class": "MIXED",
        }
        for sid, label, classes, note in SECTORS
    ],
}

three_economies = {
    "rule": "A business can participate in more than one. Do not force clean classifications.",
    "local_serving": {
        "label": "LOCAL-SERVING ECONOMY",
        "definition": "Money largely circulates because Arkansans need something.",
        "examples": ["restaurants", "many personal services", "much local construction", "local retail", "local healthcare delivery"],
    },
    "external_income": {
        "label": "EXTERNAL-INCOME ECONOMY",
        "definition": "Brings purchasing power into Arkansas.",
        "examples": ["exports", "tourism", "some logistics", "federal activity", "externally sold professional services"],
        "bound_scale_examples": [
            {"label": "Tourism visitor spend", "value_usd": FACTS["tourism_spend_2025_usd"], "period": "2025"},
            {"label": "Manufacturing GDP", "value_usd": FACTS["mfg_gdp_2023_usd"], "period": "2023"},
        ],
    },
    "asset_ownership": {
        "label": "ASSET/OWNERSHIP ECONOMY",
        "definition": "Income generated because someone owns capital.",
        "examples": ["businesses", "land", "IP", "securities", "productive facilities", "natural-resource rights"],
        "bound_proxies": [
            {"label": "Taxable assessed valuation", "value_usd": FACTS["taxable_av_2025_usd"], "period": "2025", "note": "Land/housing wealth proxy — not productive plant inventory"},
            {"label": "Owner-occupancy", "value_percent": 66.2, "note": "Housing tenure ≠ firm ownership"},
        ],
        "productive_ownership_shares_by_sector": "UNKNOWN",
    },
}

ownership_ledger = {
    "id": "ownership",
    "question": "Who owns the productive capacity (to the extent evidence permits)?",
    "rule": "Located here ≠ owned here.",
    "classes": [
        "locally_owned",
        "arkansas_owned_elsewhere_in_state",
        "employee_cooperative",
        "public_nonprofit",
        "externally_privately_owned",
        "publicly_traded",
        "private_equity_institutional",
        "UNKNOWN",
    ],
    "bound": [
        {
            "domain": "Electric retail customers (2024)",
            "evidence_class": "KNOWN",
            "shares": FACTS["energy_retail_2024"],
            "not": "Generation plant ownership",
        },
        {
            "domain": "Owner-occupied housing",
            "evidence_class": "KNOWN",
            "value_percent": 66.2,
            "not": "Firm or farmland beneficial ownership",
        },
        {
            "domain": "Farm operations structure",
            "evidence_class": "KNOWN",
            "farm_operations_2022": 37756,
            "not": "Processing / brand / packer ownership",
        },
        {
            "domain": "Banking access (FDIC)",
            "evidence_class": "KNOWN",
            "note": FACTS["fdic_banks_note"],
            "not": "Beneficial bank ownership geography",
        },
    ],
    "unknown_complete": [
        "Manufacturing plant / HQ / IP ownership shares",
        "Food processing ownership / margins (COUNTABLE public cash $0 — closed)",
        "Logistics firm ownership",
        "Tourism surplus ownership destination",
        "ESOP / cooperative stocks in Arkansas",
        "Private equity footprint by county",
    ],
}

capital_formation_ledger = {
    "id": "capital_formation",
    "question": "How is productive capital currently formed?",
    "ladder": [
        {"rung": "household_savings", "status": "CONCEPTUAL"},
        {"rung": "banks_credit_unions", "status": "PARTIAL", "evidence": "FDIC deposit stock / branch access"},
        {"rung": "commercial_lending", "status": "UNKNOWN"},
        {"rung": "retained_earnings", "status": "UNKNOWN"},
        {"rung": "outside_equity", "status": "UNKNOWN"},
        {"rung": "venture_private_equity", "status": "UNKNOWN"},
        {"rung": "bonds", "status": "UNKNOWN"},
        {"rung": "public_incentives", "status": "UNKNOWN", "note": "Tax-expenditure panel still OPEN from V2.1.2"},
        {"rung": "federal_capital", "status": "UNKNOWN"},
        {"rung": "institutional_investment", "status": "UNKNOWN"},
    ],
    "access_questions": [
        {"amount_usd": 10000, "where_today": "UNKNOWN / consumer-small business credit — not mapped"},
        {"amount_usd": 100000, "where_today": "UNKNOWN"},
        {"amount_usd": 1000000, "where_today": "UNKNOWN"},
        {"amount_usd": 10000000, "where_today": "UNKNOWN"},
        {"amount_usd": 100000000, "where_today": "UNKNOWN"},
    ],
    "rule": "Map the existing ladder. Do not solve it. No public bank / state fund design.",
}

productive_assets = {
    "id": "productive_assets",
    "question": "What strategically material productive asset classes exist?",
    "rule": "Classes and material assets — not every factory.",
    "classes": [
        {"id": "farmland", "where": "Statewide / Delta concentration PARTIAL", "ownership": "UNKNOWN beneficial", "capacity": "PARTIAL via Census of Ag", "replacement_difficulty": "HIGH", "network_role": "production base"},
        {"id": "timberland", "where": "UNKNOWN precise", "ownership": "UNKNOWN", "capacity": "UNKNOWN", "network_role": "natural capital"},
        {"id": "processing_facilities", "where": "UNKNOWN inventory", "ownership": "UNKNOWN", "capacity": "UNKNOWN", "note": "Food processing public free cash $0 — closed"},
        {"id": "manufacturing_plants", "where": "Statewide activity via mfg GDP", "ownership": "UNKNOWN", "capacity": "UNKNOWN plant list"},
        {"id": "energy_generation", "where": "UNKNOWN mix", "ownership": "UNKNOWN plants; retail IOU/coop/muni FACT", "capacity": "UNKNOWN"},
        {"id": "transmission", "where": "UNKNOWN", "ownership": "UNKNOWN", "network_role": "energy dependency"},
        {"id": "water_infrastructure", "where": "UNKNOWN", "ownership": "mostly public/local UNKNOWN map", "network_role": "essential"},
        {"id": "rail", "where": "UNKNOWN inventory", "network_role": "logistics"},
        {"id": "river_ports", "where": "UNKNOWN inventory", "network_role": "logistics"},
        {"id": "highways", "where": "Statewide", "ownership": "public", "network_role": "logistics"},
        {"id": "airports", "where": "UNKNOWN capacity map", "network_role": "logistics"},
        {"id": "warehouses", "where": "UNKNOWN", "network_role": "logistics"},
        {"id": "health_systems", "where": "PARTIAL HPSA designated set", "ownership": "UNKNOWN", "network_role": "essential / hub"},
        {"id": "universities_research", "where": "PARTIAL via Higher Ed GR", "ownership": "public/nonprofit PARTIAL", "network_role": "capability"},
        {"id": "digital_infrastructure", "where": "UNKNOWN address fabric", "network_role": "capability"},
        {"id": "commercial_real_estate", "where": "UNKNOWN", "ownership": "UNKNOWN"},
        {"id": "natural_resources", "where": "PARTIAL", "ownership": "UNKNOWN", "network_role": "resource base"},
    ],
}

external_income_map = {
    "id": "external_income",
    "rule": "Distinguish selling outside Arkansas from capturing the return. No single statewide leakage number.",
    "channels": [
        {
            "sector": "tourism",
            "external_market": True,
            "gross_activity_known": True,
            "gross_usd": FACTS["tourism_spend_2025_usd"],
            "ownership_known": False,
            "wage_transmission_known": False,
            "supplier_transmission_known": False,
            "profit_destination_known": False,
        },
        {
            "sector": "manufacturing",
            "external_market": True,
            "gross_activity_known": True,
            "gross_note": "Mfg GDP ~$25.9B — not export share",
            "ownership_known": False,
            "wage_transmission_known": False,
            "profit_destination_known": False,
        },
        {
            "sector": "agriculture_food",
            "external_market": True,
            "gross_activity_known": True,
            "gross_note": "Ag GDP + farm sales; processing margin ≠ farm-gate",
            "ownership_known": False,
            "profit_destination_known": False,
            "public_free_cash_usd": 0,
        },
        {
            "sector": "federal_activity",
            "external_market": True,
            "gross_activity_known": False,
            "note": "Federal share UNKNOWN (V2.1.2)",
        },
    ],
}

dependency_ledger = {
    "id": "dependency",
    "question": "What must continue functioning for Arkansas activity to continue?",
    "rule": "Dependence is not inherently bad. Resilience judgment later.",
    "by_sector_common": [
        {"dependency": "energy", "evidence_class": "KNOWN_AS_CATEGORY", "note": "Retail structure FACT; generation mix UNKNOWN"},
        {"dependency": "water", "evidence_class": "KNOWN_AS_CATEGORY"},
        {"dependency": "workers", "evidence_class": "KNOWN", "note": "QCEW employment scale"},
        {"dependency": "transportation", "evidence_class": "KNOWN_AS_CATEGORY"},
        {"dependency": "credit", "evidence_class": "PARTIAL", "note": "Bank access FACT; allocation UNKNOWN"},
        {"dependency": "insurance", "evidence_class": "UNKNOWN"},
        {"dependency": "technology", "evidence_class": "UNKNOWN"},
        {"dependency": "imported_inputs", "evidence_class": "UNKNOWN"},
        {"dependency": "federal_policy", "evidence_class": "KNOWN_AS_CATEGORY", "note": "Quantified federal share UNKNOWN"},
        {"dependency": "commodity_markets", "evidence_class": "KNOWN_AS_CATEGORY", "sectors": ["agriculture_food", "energy"]},
        {"dependency": "healthcare", "evidence_class": "PARTIAL"},
        {"dependency": "housing", "evidence_class": "PARTIAL"},
    ],
}

metabolism = {
    "title": "Arkansas' Productive Metabolism",
    "centerpiece": True,
    "diagram": [
        "NATURAL / HUMAN / FINANCIAL INPUTS",
        "↓",
        "ARKANSAS PRODUCTIVE SYSTEM",
        "↓",
        "GOODS · SERVICES · KNOWLEDGE",
        "↓",
        "branch: ARKANSAS HOUSEHOLDS | ARKANSAS BUSINESSES | EXTERNAL MARKETS",
        "↓",
        "WAGES · PROFITS · TAXES · SAVINGS · REINVESTMENT · OWNERSHIP ACCUMULATION",
    ],
    "known_now": [
        "Statewide GDP / mfg / ag GDP scales",
        "QCEW private employment and wages",
        "Tourism spend scale",
        "Energy retail ownership shares",
        "Designated-county farm sales / labor / deposits",
    ],
    "conceptual_only": [
        "Profit destination by sector",
        "Ownership accumulation by Arkansas households from located production",
        "Full input→output→return county network",
    ],
}

patterns = [
    {
        "id": "PAT-PROD-001",
        "observation": "Manufacturing GDP (~$25.9B, 2023) is an order of magnitude larger than ag/forestry/fishing GDP (~$2.86B) in bound FACTS — without implying ownership or household retention.",
        "class": "OBSERVATION",
        "not": "PROBLEM or endorsement of industrial policy",
    },
    {
        "id": "PAT-PROD-002",
        "observation": "Tourism visitor spend ($10.2B, 2025) is a large external-income scale anchor but is not COUNTABLE public income and does not establish surplus ownership.",
        "class": "OBSERVATION",
        "not": "Claim that tourism 'pays for' government",
    },
    {
        "id": "PAT-PROD-003",
        "observation": "Within the designated Living Systems counties, 2022 ag product sales range from ~$15.6M (Van Buren) to ~$463M (Mississippi) — geographic production is not uniform.",
        "class": "OBSERVATION",
        "not": "County ranking",
    },
    {
        "id": "PAT-PROD-004",
        "observation": "Electric retail customer ownership is majority IOU (54.39%) with substantial cooperative share (31.91%) — a rare bound ownership structure FACT.",
        "class": "OBSERVATION",
        "not": "Preference for IOU or coop",
    },
    {
        "id": "PAT-PROD-005",
        "observation": "Food-hub / processing public free cash remains $0 COUNTABLE — large farm-gate production does not imply Arkansas-captured processing margin.",
        "class": "OBSERVATION",
        "not": "License to reopen facility cashflow investigation",
    },
    {
        "id": "PAT-PROD-006",
        "observation": "Beneficial ownership of manufacturing plants, processing, logistics, and tourism surplus is largely UNKNOWN in the bound corpus.",
        "class": "OBSERVATION",
        "not": "Assumption of external extraction",
    },
]

# Network edges (empirical start)
network_edges = [
    {
        "id": "EDGE-001",
        "source": "05085",
        "source_label": "Lonoke County",
        "destination": "05119",
        "destination_label": "Pulaski County",
        "relationship": "COMMUTING",
        "strength": None,
        "evidence": "Architectural example from V2-GEO narrative — LOD commute matrix not bound",
        "evidence_class": "UNKNOWN",
        "confidence": "LOW",
        "note": "Placeholder relationship class only — do not treat as measured edge until LOD/ACS bound.",
    },
    {
        "id": "EDGE-002",
        "source": "designated_rural_set",
        "destination": "regional_healthcare",
        "relationship": "HEALTHCARE",
        "strength": None,
        "evidence": "HPSA designations in designated-county set",
        "evidence_class": "PROXY",
        "confidence": "MEDIUM",
    },
]

# Close objects
NEW = {
    ("agriculture", "B"): ("COMPLETE", "Ag GDP + farm operations + designated-county farm sales scaffold."),
    ("agriculture", "F"): ("COMPLETE", "Farm-gate vs processing distinction locked; public free cash $0."),
    ("agriculture", "D"): ("COMPLETE", "Depends on water, commodity markets, labor, logistics, credit."),
    ("agriculture", "E"): ("COMPLETE", "Pass 3.6 + USDA NASS designated set."),
    ("capital", "B"): ("COMPLETE", "Capital Formation Ladder mapped; access amounts UNKNOWN."),
    ("capital", "F"): ("UNKNOWN-COMPLETE", "Savings→investment→return flows not measured statewide."),
    ("capital", "D"): ("COMPLETE", "Production depends on credit/equity access."),
    ("capital", "E"): ("COMPLETE", "FDIC access + explicit UNKNOWN ladder rungs."),
    ("banking", "B"): ("COMPLETE", "Bank access / deposit stock as capital-access baseline."),
    ("banking", "F"): ("UNKNOWN-COMPLETE", "Credit allocation by sector/geography UNKNOWN."),
    ("banking", "D"): ("COMPLETE", "Households/firms depend on local credit access."),
    ("banking", "E"): ("COMPLETE", "FDIC SOD designated + statewide notes."),
    ("business_formation", "B"): ("COMPLETE", "BDS entry architecture referenced; rates not re-fetched this pass."),
    ("business_formation", "F"): ("UNKNOWN-COMPLETE", "Formation→scale capital path UNKNOWN beyond ladder."),
    ("business_formation", "D"): ("COMPLETE", "Depends on credit, markets, workforce, infrastructure."),
    ("business_formation", "E"): ("COMPLETE", "Gap explicit."),
    ("natural_resources", "B"): ("COMPLETE", "Asset classes enumerated; valuations UNKNOWN."),
    ("natural_resources", "F"): ("UNKNOWN-COMPLETE", "Resource→product→return flows UNKNOWN."),
    ("natural_resources", "D"): ("COMPLETE", "Production depends on land/water/minerals where relevant."),
    ("natural_resources", "E"): ("COMPLETE", "Productive Asset Register."),
    ("land", "B"): ("COMPLETE", "Farmland/timberland classes + taxable AV proxy."),
    ("land", "F"): ("UNKNOWN-COMPLETE", "Land market / ownership transfer flows UNKNOWN."),
    ("land", "D"): ("COMPLETE", "Agriculture and housing depend on land systems."),
    ("land", "E"): ("COMPLETE", "AV + Census of Ag."),
    ("energy", "F"): ("COMPLETE", "Retail ownership structure FACT; generation flow UNKNOWN."),
    ("labor", "F"): ("COMPLETE", "Statewide QCEW employment/wages joined; county NAICS still UNKNOWN."),
    ("labor", "E"): ("COMPLETE", "BLS QCEW statewide."),
    ("transportation", "B"): ("COMPLETE", "Asset classes (highway/rail/ports/air) enumerated."),
    ("water", "B"): ("COMPLETE", "Water infrastructure as productive dependency class."),
    ("water", "D"): ("COMPLETE", "Ag and communities depend on water systems."),
    ("digital_infrastructure", "D"): ("COMPLETE", "Work/school/telehealth depend on broadband."),
    ("insurance_and_risk", "B"): ("UNKNOWN-COMPLETE", "Insurance markets as production dependency — panel not bound."),
    ("insurance_and_risk", "D"): ("COMPLETE", "Firms/households depend on risk markets."),
    ("insurance_and_risk", "E"): ("COMPLETE", "Gap explicit."),
}

obj_list = objects_doc["objects"]
closed_before = sum(1 for o in obj_list if o["status"] in ("COMPLETE", "UNKNOWN-COMPLETE"))
for o in obj_list:
    key = (o["home_id"], o["type"])
    if key in NEW and o["status"] == "OPEN":
        o["status"], o["note"] = NEW[key]
        o["closed_by_pass"] = "V2.1.3"

closed_after = sum(1 for o in obj_list if o["status"] in ("COMPLETE", "UNKNOWN-COMPLETE"))
v21_pct = round(100.0 * closed_after / len(obj_list), 1)
blueprint_pct = round(0.25 * v21_pct, 1)
objects_doc["closed_objects"] = closed_after
objects_doc["open_objects"] = len(obj_list) - closed_after
objects_doc["v2_1_completion_percent"] = v21_pct
objects_doc["decision_id"] = DEC
objects_doc["update_id"] = UPD
dump("data/project/cc_v2_1_closure_objects.json", objects_doc)

# GEO field-first: Production across all 75, then Employment, then Ownership & Capital
prod_partial = emp_partial = own_partial = 0
for rec in inventory["records"]:
    fips = rec["fips"]
    drow = designated.get(fips)

    # Production field
    pcell = rec["dimensions"]["production"]
    if drow and drow.get("ag_product_sales_usd"):
        pcell["status"] = "PARTIAL"
        pcell["evidence_class"] = "KNOWN"
        pcell["metrics"] = {
            "ag_product_sales_usd": {
                **drow["ag_product_sales_usd"],
                "evidence_class": "KNOWN",
            },
            "farm_operations": {
                **(drow.get("farm_operations") or {}),
                "evidence_class": "KNOWN",
            },
        }
        pcell["notes"] = [
            "Field-first Production: designated Living Systems ag scaffold only — not full industry mix.",
            "Production ≠ ownership ≠ household retention.",
        ]
        pcell["arkansas_now"] = "Measurable farm-gate production activity present in bound NASS series."
        prod_partial += 1
    else:
        pcell["status"] = "EMPTY"
        pcell["evidence_class"] = "UNKNOWN"
        pcell["notes"] = [
            "Field-first Production pass: county QCEW/NAICS not bound — cell EMPTY (not invented).",
        ]

    # Employment field
    ecell = rec["dimensions"]["employment"]
    if drow and drow.get("acs5_civilian_labor_force"):
        ecell["status"] = "PARTIAL"
        ecell["evidence_class"] = "KNOWN"
        ecell["metrics"] = {
            "acs5_civilian_labor_force": {**drow["acs5_civilian_labor_force"], "evidence_class": "KNOWN"},
            "acs5_unemployment_rate": {**(drow.get("acs5_unemployment_rate") or {}), "evidence_class": "KNOWN"},
        }
        ecell["notes"] = ["ACS labor force — not industry employment mix."]
        emp_partial += 1
    else:
        ecell["status"] = "EMPTY"
        ecell["evidence_class"] = "UNKNOWN"
        ecell["notes"] = ["Field-first Employment: no bound ACS/QCEW county industry panel."]

    # Ownership & Capital
    ocell = rec["dimensions"]["ownership_capital"]
    if drow and drow.get("fdic_deposits_usd"):
        ocell["status"] = "PARTIAL"
        ocell["evidence_class"] = "PROXY"
        ocell["metrics"] = {
            "fdic_branch_count": {**(drow.get("fdic_branch_count") or {}), "evidence_class": "KNOWN"},
            "fdic_deposits_usd": {**drow["fdic_deposits_usd"], "evidence_class": "KNOWN"},
        }
        ocell["notes"] = [
            "PROXY for capital access only — deposits ≠ beneficial ownership of productive capital.",
        ]
        own_partial += 1
    else:
        ocell["status"] = "EMPTY"
        ocell["evidence_class"] = "UNKNOWN"
        ocell["notes"] = ["Field-first Ownership & Capital: no FDIC SOD join for this county in corpus."]

    # Land & natural capital — seed from farm ops where present
    lcell = rec["dimensions"]["land_natural_capital"]
    if drow and drow.get("farm_operations"):
        lcell["status"] = "PARTIAL"
        lcell["evidence_class"] = "KNOWN"
        lcell["metrics"] = {
            "farm_operations": {**drow["farm_operations"], "evidence_class": "KNOWN"},
            "ag_product_sales_usd": {**(drow.get("ag_product_sales_usd") or {}), "evidence_class": "KNOWN"},
        }
        lcell["notes"] = ["Farm operations / sales as land-use production proxy — not land title ownership."]
    elif lcell.get("status") == "EMPTY":
        lcell["notes"] = ["Field-first Land: no designated NASS bind for this county."]

# Signatures for designated counties only
signatures = []
for fips, drow in designated.items():
    sales = (drow.get("ag_product_sales_usd") or {}).get("value") or 0
    ag = "HIGH" if sales > 200_000_000 else ("MEDIUM" if sales > 50_000_000 else "LOW")
    signatures.append(
        {
            "fips": fips,
            "county": drow["county"],
            "signature": {
                "Agriculture": ag,
                "Manufacturing": "UNKNOWN",
                "Healthcare_hub_dependence": "UNKNOWN",
                "External_commuting": "UNKNOWN",
                "Tourism": "UNKNOWN",
                "Ownership_evidence": "LOW_CONFIDENCE",
                "Capital_access_proxy": "PARTIAL" if drow.get("fdic_deposits_usd") else "UNKNOWN",
            },
            "rule": "Descriptive fingerprint — not a ranking and not a future assignment.",
        }
    )

inventory["cells_partial"] = sum(
    1 for r in inventory["records"] for d in r["dimensions"].values() if d["status"] == "PARTIAL"
)
inventory["cells_empty"] = inventory["matrix_cells"] - inventory["cells_partial"]
inventory["decision_id"] = DEC
inventory["update_id"] = UPD
inventory["v2_1_3_geo_note"] = {
    "production_partial": prod_partial,
    "employment_partial": emp_partial,
    "ownership_capital_partial": own_partial,
    "method": "field_first",
}
inventory["county_network_edges_seed"] = network_edges
inventory["county_economic_signatures_designated"] = signatures
dump("data/project/cc_v2_geo_arkansas_75_inventory.json", inventory)

# Unknowns
new_unks = [
    {
        "id": "UNK-PROD-001",
        "question": "Beneficial ownership shares of manufacturing / processing / logistics by Arkansas vs external?",
        "why_unknown": "No ownership registry bound.",
        "evidence_that_would_resolve": "Firm HQ / UBO / BEA FDI joins",
        "v2_2_requires_resolution": True,
        "class": "BLOCKING",
        "blocks": "V2.2 ownership redesign depth — not V2.1.3 observation closure",
        "home_ids": ["capital", "agriculture", "business_formation"],
    },
    {
        "id": "UNK-PROD-002",
        "question": "County QCEW/NAICS employment and wages for all 75?",
        "why_unknown": "Not ingested.",
        "evidence_that_would_resolve": "BLS QCEW county-industry extract",
        "v2_2_requires_resolution": False,
        "class": "NON-BLOCKING",
        "home_ids": ["labor"],
    },
    {
        "id": "UNK-PROD-003",
        "question": "Where can an Arkansas firm obtain $10k–$100M at each rung today?",
        "why_unknown": "Capital access ladder conceptual only.",
        "evidence_that_would_resolve": "Lender/CDFIs/VC survey + public program inventory",
        "v2_2_requires_resolution": True,
        "class": "BLOCKING",
        "blocks": "V2.3 capital architecture — not V2.1.3 close",
        "home_ids": ["capital", "banking"],
    },
    {
        "id": "UNK-PROD-004",
        "question": "Energy generation mix and export/import balance?",
        "why_unknown": "Pass 3.6 gap remains.",
        "evidence_that_would_resolve": "EIA generation + interchange",
        "v2_2_requires_resolution": False,
        "class": "NON-BLOCKING",
        "home_ids": ["energy"],
    },
    {
        "id": "UNK-PROD-005",
        "question": "Measured commuting edges for County Network?",
        "why_unknown": "LOD/ACS commute matrix not bound.",
        "evidence_that_would_resolve": "Census LODES",
        "v2_2_requires_resolution": False,
        "class": "NON-BLOCKING",
        "home_ids": ["geographic_disparities", "labor"],
    },
]
for e in new_unks:
    if not any(x.get("id") == e["id"] for x in unk.get("entries") or []):
        unk.setdefault("entries", []).append(e)
unk["decision_id"] = DEC
unk["update_id"] = UPD
dump("data/project/cc_v2_unknown_register.json", unk)

pass_doc = {
    "version": "1.0.0",
    "slice_id": "CC-V2-1-3-PRODUCTION-OWNERSHIP-CAPITAL-1.0",
    "decision_id": DEC,
    "update_id": UPD,
    "generated_at": TODAY,
    "status": "COMPLETE",
    "pass_id": "V2.1.3",
    "title": "Production, Ownership & Capital",
    "epistemic_class": "BASELINE_OBSERVATION_NOT_REDESIGN",
    "governing_question": (
        "What does Arkansas actually produce, who owns the productive capacity, where does the capital "
        "come from, where does economic value go, and what dependencies make that production possible?"
    ),
    "discipline": [
        "Production occurring in Arkansas ≠ productive capital owned by Arkansans ≠ wealth retained by Arkansas households.",
        "Recommendations: 0",
        "Do not reopen food hub cashflow",
        "No public bank / state investment fund / cooperative development / Arkansas-first procurement design",
    ],
    "recommendations_made": 0,
    "closure_standard_answers": {
        "what_arkansas_produces": "YES — GDP/mfg/ag/QCEW/tourism scales + sector roster",
        "where_production_occurs": "PARTIAL — designated-county ag; 68 counties EMPTY for industry mix",
        "who_works_in_it": "YES statewide QCEW; PARTIAL county ACS labor",
        "who_owns_assets": "PARTIAL — energy retail + housing tenure + farm structure; productive capital mostly UNKNOWN",
        "how_capital_formed": "LADDER YES; rung amounts UNKNOWN",
        "major_productive_assets": "CLASS REGISTER YES; inventories mostly UNKNOWN",
        "outside_purchasing_power": "PARTIAL — tourism/mfg/ag external orientation",
        "dependencies": "LEDGER YES — categorical",
        "geographic_variation": "PARTIAL — 7-county signatures + field-first cells",
        "unknowns": "YES — explicit UNKNOWN-COMPLETE and blocking-for-V2.2 list",
        "enough_for_v2_2_to_begin": "YES — with ownership/capital-access blocking unknowns for redesign depth",
    },
    "progress": {
        "baseline_objects_closed_after": closed_after,
        "baseline_objects_total": 152,
        "v2_1_percent": v21_pct,
        "v2_blueprint_percent": blueprint_pct,
        "geo_production_partial": prod_partial,
        "geo_employment_partial": emp_partial,
        "geo_ownership_capital_partial": own_partial,
        "network_edges_seeded": len(network_edges),
        "observed_patterns": len(patterns),
        "recommendations_made": 0,
    },
    "surfaces": {
        "pass": "/v2/see-arkansas/production-ownership-capital/",
        "what_changed": "/v2/see-arkansas/what-changed/v2-1-3/",
    },
    "next": "V2.1.4 — Institutions, Power & Constraints",
    "deferred": [
        "County QCEW/NAICS for 75",
        "Beneficial ownership registry",
        "Capital access survey $10k–$100M",
        "Energy generation mix",
        "Measured LODES commuting graph",
        "Food hub cashflow reopen (forbidden)",
        "Public bank / state funds / procurement redesign",
    ],
}

dump(
    "data/project/cc_v2_1_3_production_ownership_capital.json",
    {
        **pass_doc,
        "production_ledger": production_ledger,
        "three_economies": three_economies,
        "ownership_ledger": ownership_ledger,
        "capital_formation_ledger": capital_formation_ledger,
        "productive_asset_register": productive_assets,
        "external_income_map": external_income_map,
        "dependency_ledger": dependency_ledger,
        "productive_metabolism": metabolism,
        "observed_patterns": patterns,
        "county_network_edges_seed": network_edges,
        "county_economic_signatures_designated": signatures,
        "designated_county_extracts": list(designated.values()),
    },
)

what = {
    "version": "1.0.0",
    "pass_id": "V2.1.3",
    "pass_name": "Production, Ownership & Capital",
    "decision_id": DEC,
    "update_id": UPD,
    "generated_at": TODAY,
    "status": "COMPLETE",
    "before_after": [
        {"label": "V2 BLUEPRINT", "before": "12.5%", "after": f"{blueprint_pct}%"},
        {"label": "V2.1 objects", "before": f"{closed_before}/152", "after": f"{closed_after}/152"},
        {"label": "Production ≠ ownership ≠ retention", "before": "stated", "after": "operationalized in ledgers"},
        {"label": "GEO production PARTIAL", "before": "0/75", "after": f"{prod_partial}/75"},
        {"label": "GEO employment PARTIAL", "before": "0/75", "after": f"{emp_partial}/75"},
        {"label": "GEO ownership_capital PARTIAL", "before": "0/75", "after": f"{own_partial}/75"},
        {"label": "Food hub reopen", "before": "—", "after": "0 (forbidden)"},
        {"label": "Recommendations", "before": "0", "after": "0"},
    ],
    "objects_closed": [o["id"] for o in obj_list if o.get("closed_by_pass") == "V2.1.3"],
    "new_unknowns": [e["id"] for e in new_unks],
    "patterns_observed": [p["id"] for p in patterns],
    "nothing_recommended": True,
    "sources_added": [
        "Pass 3.6 arkansas_evidence_bound (reuse)",
        "USDA NASS designated-county living systems",
        "ACS5 designated labor",
        "FDIC SOD designated deposits",
        "EIA-861 retail ownership shares",
    ],
    "visuals_added": ["/v2/see-arkansas/production-ownership-capital/"],
    "decisions_recorded": ["V2-DEC-012"],
    "deferred_items": pass_doc["deferred"],
    "experience_links": [
        {"href": "/v2/see-arkansas/production-ownership-capital/", "label": "Production, Ownership & Capital →"},
        {"href": "/v2/see-arkansas/counties/", "label": "Arkansas 75 →"},
        {"href": "/v2/see-arkansas/", "label": "V2.1 hub →"},
    ],
}
dump("data/project/pass_changelogs/v2_1_3.json", what)

reg["entries"] = [e for e in reg["entries"] if e["id"] != "V2-DEC-012"] + [
    {
        "id": "V2-DEC-012",
        "date": TODAY,
        "title": "Close V2.1.3 with production/ownership separation and honest UNKNOWN ownership",
        "decision": pass_doc["governing_question"]
        + " Answered at system level with bound FACT spine; ownership of productive capital mostly UNKNOWN-COMPLETE.",
        "why": "Need productive machine map before power map and redesign — without inventing ownership shares.",
        "evidence": ["Pass 3.6", "QCEW", "USDA NASS", "EIA-861", "FDIC SOD"],
        "alternatives_rejected": [
            "Reopen food hub cashflow",
            "Invent beneficial ownership shares",
            "Design public bank / capital programs",
            "Collapse location into ownership",
        ],
        "could_reverse_if": "Primary GDP/QCEW binds shown wrong — correct and reopen affected objects.",
        "v1_doctrine_impact": "NONE",
    }
]
reg["decision_id"] = DEC
reg["update_id"] = UPD
dump("data/project/v2_decision_register.json", reg)

for p in v21["passes"]:
    if p["id"] == "V2.1.3":
        p["status"] = "COMPLETE"
        p["href"] = "/v2/see-arkansas/production-ownership-capital/"
        p["what_changed"] = "/v2/see-arkansas/what-changed/v2-1-3/"
    if p["id"] == "V2.1.4":
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

plan["decision_id"] = DEC
plan["update_id"] = UPD
plan["blueprint"]["percent"] = blueprint_pct
for g in plan["gates"]:
    if g["id"] == "V2.1":
        g["completion_percent"] = v21_pct
        g["objects_closed"] = closed_after
for c in plan["object_counters"]:
    if c["id"] == "baseline_objects_resolved":
        c["resolved"] = closed_after
plan["next_only"] = "V2.1.4 — Institutions, Power & Constraints (who can change what; describe only)."
plan["active_pass"] = "V2.1.3 COMPLETE → next V2.1.4"
dump("data/project/cc_v2_master_build_plan.json", plan)

ladder = load("data/project/completion_ladder_and_dashboard.json")
ladder["decision_id"] = DEC
ladder["update_id"] = UPD
ladder["v2_blueprint"] = {
    **ladder.get("v2_blueprint", {}),
    "percent": blueprint_pct,
    "v2_1_percent": v21_pct,
    "v2_1_closed": closed_after,
    "note": f"V2.1.3 complete. {closed_after}/152. Next: V2.1.4.",
    "href": "/v2/see-arkansas/",
}
dump("data/project/completion_ladder_and_dashboard.json", ladder)

state = load("data/project/current_build_state.json")
state["decision_id"] = DEC
state["status"] = "v2_1_3_complete_v2_1_4_next"
state["next_action"] = "V2.1.4 — Institutions, Power & Constraints"
state["v2_blueprint_percent"] = blueprint_pct
state["writing_focus"] = f"V2.1.3 COMPLETE. Blueprint {blueprint_pct}%. Next V2.1.4. Recommendations: 0."
state["notes"] = [
    f"{DEC}/{UPD}: V2.1.3 complete. {closed_after}/152. Production≠ownership≠retention. 0 recommendations."
] + [n for n in (state.get("notes") or []) if DEC not in str(n)]
dump("data/project/current_build_state.json", state)

bpreg = load("data/project/build_progress_registry.json")
bpreg["decision_id"] = DEC
bpreg["update_id"] = UPD
bpreg["next_objective"] = "V2.1.4 Institutions, Power & Constraints — who controls, funds, administers, oversees, can change, constrains."
bpreg["v2_blueprint"] = {"percent": blueprint_pct, "href": "/v2/see-arkansas/"}
if not any(x.get("id") == DEC for x in bpreg.get("infrastructure_checkpoints") or []):
    bpreg.setdefault("infrastructure_checkpoints", []).append(
        {"id": DEC, "title": "V2.1.3 Production, Ownership & Capital complete", "date": TODAY, "href": "/v2/see-arkansas/what-changed/v2-1-3/"}
    )
dump("data/project/build_progress_registry.json", bpreg)

sg = load("data/project/stewardship_governance_v1.json")
sg["recommended_next_priority"] = {
    "lane": "V2_BLUEPRINT",
    "focus": "V2.1.4 Institutions, Power & Constraints",
    "decision_id": DEC,
}
sg["v2_blueprint"] = {
    **sg.get("v2_blueprint", {}),
    "percent": blueprint_pct,
    "href": "/v2/see-arkansas/",
}
dump("data/project/stewardship_governance_v1.json", sg)

updates = load("data/project/updates.json")
if not any(u.get("id") == UPD for u in updates.get("updates") or []):
    updates["updates"].append(
        {
            "id": UPD,
            "date": TODAY,
            "title": "V2.1.3 Production, Ownership & Capital complete",
            "summary": (
                f"{DEC}: Production/ownership/capital ledgers; three economies; metabolism visual contract; "
                f"GEO field-first production/employment/ownership ({prod_partial}/{emp_partial}/{own_partial} PARTIAL). "
                f"Objects {closed_after}/152. Blueprint {blueprint_pct}%. Recommendations: 0. Next: V2.1.4."
            ),
            "public": True,
        }
    )
updates["last_updated"] = TODAY
dump("data/project/updates.json", updates)

rule_path = ROOT / ".cursor/rules/v2-doctrine-protection.mdc"
rule = rule_path.read_text(encoding="utf-8")
rule = rule.replace(
    "→ V2.1.2 Government & Money — **COMPLETE**  \n→ **NEXT:** V2.1.3 Production, Ownership & Capital",
    "→ V2.1.2 Government & Money — **COMPLETE**  \n"
    "→ V2.1.3 Production, Ownership & Capital — **COMPLETE**  \n"
    "→ **NEXT:** V2.1.4 Institutions, Power & Constraints",
)
rule_path.write_text(rule, encoding="utf-8")

(ROOT / "reports/CC_V2_1_3_PRODUCTION_OWNERSHIP_CAPITAL_RETURN.md").write_text(
    f"""# V2.1.3 — Production, Ownership & Capital — Return

**Decision:** {DEC} · **Update:** {UPD}

## Verdict

COMPLETE. Recommendations: **0**. Food hub: **not reopened**.

Objects: **{closed_after}/152** ({v21_pct}%) · Blueprint: **{blueprint_pct}%**

GEO PARTIAL — production {prod_partial}/75 · employment {emp_partial}/75 · ownership_capital {own_partial}/75

## Discipline held

Production ≠ ownership ≠ household retention.

## Next

**V2.1.4 — Institutions, Power & Constraints**
""",
    encoding="utf-8",
)

print(f"{closed_before}->{closed_after}/152 v21={v21_pct}% bp={blueprint_pct}% prod={prod_partial} emp={emp_partial} own={own_partial}")
