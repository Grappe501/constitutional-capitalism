"""CC-DEC-196 / UPD-209 — V2-GEO-001: 75-County Geographic Dimension (narrow Master Plan amendment)."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TODAY = "2026-08-16"
DEC = "CC-DEC-196"
UPD = "UPD-209"
GEO = "V2-GEO-001"

# Official Arkansas counties: name, FIPS (050xx)
COUNTIES = [
    ("Arkansas", "05001"),
    ("Ashley", "05003"),
    ("Baxter", "05005"),
    ("Benton", "05007"),
    ("Boone", "05009"),
    ("Bradley", "05011"),
    ("Calhoun", "05013"),
    ("Carroll", "05015"),
    ("Chicot", "05017"),
    ("Clark", "05019"),
    ("Clay", "05021"),
    ("Cleburne", "05023"),
    ("Cleveland", "05025"),
    ("Columbia", "05027"),
    ("Conway", "05029"),
    ("Craighead", "05031"),
    ("Crawford", "05033"),
    ("Crittenden", "05035"),
    ("Cross", "05037"),
    ("Dallas", "05039"),
    ("Desha", "05041"),
    ("Drew", "05043"),
    ("Faulkner", "05045"),
    ("Franklin", "05047"),
    ("Fulton", "05049"),
    ("Garland", "05051"),
    ("Grant", "05053"),
    ("Greene", "05055"),
    ("Hempstead", "05057"),
    ("Hot Spring", "05059"),
    ("Howard", "05061"),
    ("Independence", "05063"),
    ("Izard", "05065"),
    ("Jackson", "05067"),
    ("Jefferson", "05069"),
    ("Johnson", "05071"),
    ("Lafayette", "05073"),
    ("Lawrence", "05075"),
    ("Lee", "05077"),
    ("Lincoln", "05079"),
    ("Little River", "05081"),
    ("Logan", "05083"),
    ("Lonoke", "05085"),
    ("Madison", "05087"),
    ("Marion", "05089"),
    ("Miller", "05091"),
    ("Mississippi", "05093"),
    ("Monroe", "05095"),
    ("Montgomery", "05097"),
    ("Nevada", "05099"),
    ("Newton", "05101"),
    ("Ouachita", "05103"),
    ("Perry", "05105"),
    ("Phillips", "05107"),
    ("Pike", "05109"),
    ("Poinsett", "05111"),
    ("Polk", "05113"),
    ("Pope", "05115"),
    ("Prairie", "05117"),
    ("Pulaski", "05119"),
    ("Randolph", "05121"),
    ("St. Francis", "05123"),
    ("Saline", "05125"),
    ("Scott", "05127"),
    ("Searcy", "05129"),
    ("Sebastian", "05131"),
    ("Sevier", "05133"),
    ("Sharp", "05135"),
    ("Stone", "05137"),
    ("Union", "05139"),
    ("Van Buren", "05141"),
    ("Washington", "05143"),
    ("White", "05145"),
    ("Woodruff", "05147"),
    ("Yell", "05149"),
]
assert len(COUNTIES) == 75


def load(rel: str):
    return json.loads((ROOT / rel).read_text(encoding="utf-8"))


def dump(rel: str, obj):
    path = ROOT / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(obj, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


DIMENSIONS = [
    {
        "id": "people",
        "label": "People",
        "question": "Population, age, migration, households, workforce",
    },
    {
        "id": "household_prosperity",
        "label": "Household Prosperity",
        "question": "Income, housing, costs, poverty, ownership proxies, economic pressure",
    },
    {
        "id": "human_capability",
        "label": "Human Capability",
        "question": "Schools, credentials, trades, colleges, skills, health",
    },
    {
        "id": "production",
        "label": "Production",
        "question": "What the county actually produces",
    },
    {
        "id": "employment",
        "label": "Employment",
        "question": "Industries, occupations, wages, commuting",
    },
    {
        "id": "ownership_capital",
        "label": "Ownership & Capital",
        "question": "Local businesses, farms, major employers, financial access, productive assets",
    },
    {
        "id": "land_natural_capital",
        "label": "Land & Natural Capital",
        "question": "Agriculture, forests, water, minerals, recreation",
    },
    {
        "id": "infrastructure",
        "label": "Infrastructure",
        "question": "Roads, rail, broadband, power, water, logistics",
    },
    {
        "id": "essential_systems",
        "label": "Essential Systems",
        "question": "Healthcare, food, energy, care, housing",
    },
    {
        "id": "government_public_money",
        "label": "Government & Public Money",
        "question": "Local revenue, expenditures, state/federal dependence, public assets",
    },
    {
        "id": "connectivity",
        "label": "Connectivity",
        "question": "Where residents work/shop/study/receive care; county relationships",
    },
    {
        "id": "resilience",
        "label": "Resilience",
        "question": "Concentration, population loss, disaster, employer/federal dependence",
    },
]

EVIDENCE_CLASSES = ["KNOWN", "ESTIMATED", "PROXY", "UNKNOWN"]

EMERGENT_ROLE_CANDIDATES = [
    "production_county",
    "commuter_county",
    "regional_service_hub",
    "logistics_corridor",
    "tourism_recreation",
    "agricultural_production_cluster",
    "manufacturing_cluster",
    "healthcare_hub",
    "education_center",
    "retirement_destination",
    "high_growth_absorption_zone",
    "graceful_contraction_candidate",
    "multi_county_dependency_node",
]

# Seed only designated Living Systems counties with partial people/household fields from prior FACT binds
SEED = {
    "05001": {"pop_2020": 17107, "pop_2023": 16307, "poverty_2023": 16.8, "mhi_2023": 50198},
    "05073": {"pop_2020": 6293, "pop_2023": 6095, "poverty_2023": 22.8, "mhi_2023": 43824},
    "05093": {"pop_2020": 40538, "pop_2023": 38663, "poverty_2023": 24.9, "mhi_2023": 49484},
    "05107": {"pop_2020": 16440, "pop_2023": 14961, "poverty_2023": 34.2, "mhi_2023": 37338},
    "05129": {"pop_2020": 7840, "pop_2023": 7806, "poverty_2023": 20.2, "mhi_2023": 40688},
    "05141": {"pop_2020": 15799, "pop_2023": 16142, "poverty_2023": 16.5, "mhi_2023": 50332},
    "05145": {"pop_2020": 76860, "pop_2023": 78452, "poverty_2023": 15.7, "mhi_2023": 56178},
}

geo_decision = {
    "version": "1.0.0",
    "id": GEO,
    "decision_id": DEC,
    "update_id": UPD,
    "generated_at": TODAY,
    "status": "LOCKED",
    "title": "75-County Geographic Dimension",
    "amendment_class": "NARROW_MASTER_PLAN_AMENDMENT",
    "does_not": [
        "Open a sixth V2 gate",
        "Reopen Foundational System v1.0",
        "Authorize 75 county books",
        "Authorize best-to-worst county rankings",
        "Assign future roles to counties in advance",
        "Authorize fabricated county cash-flow precision",
    ],
    "decision": (
        "Add a permanent geographic dimension inside V2.1 SEE ARKANSAS: "
        "75 standardized county digital-twin records (same 12 dimensions), "
        "regional relationship graph, county balance sheets, geographic decomposition rule, "
        "opportunity portfolio architecture, county UNKNOWN register, and interactive map/data contract."
    ),
    "why": (
        "If geography waits until v3, every v2 baseline and redesign must be retrofitted. "
        "Arkansas is not one average place. Build the spine now; analyze in v2; personalize in v3."
    ),
    "build_method": {
        "wrong": "County 1 research → write → perfect; then County 2…",
        "right": "Field 1 → all 75; Field 2 → all 75; continuous statewide completeness.",
        "effort_sketch": {
            "schema_model_design": "15%",
            "data_ingestion_normalization": "30%",
            "derived_metrics": "15%",
            "county_interpretation": "20%",
            "maps_visualization": "15%",
            "qa": "5%",
        },
    },
    "guardrails": [
        "No county ranking from best to worst.",
        "Compare dimensions, not composite scores.",
        "Roles emerge from evidence; never assigned beforehand.",
        "CC FUTURE is opportunity portfolio — not central planning.",
        "Evidence classes: KNOWN | ESTIMATED | PROXY | UNKNOWN.",
        "Non-blocking unknowns cannot hold V2.1 open.",
        "Describe metabolism before redesigning it.",
    ],
    "version_progression": {
        "v1_foundational_book": "What is Constitutional Capitalism? — COMPLETE",
        "v2_blueprint_book": "How could Arkansas actually apply it? — ACTIVE (uses geographic spine)",
        "v3_living_arkansas_book": "What does this mean where I live? — FUTURE (personalized county/region experience)",
    },
}

schema = {
    "version": "1.0.0",
    "slice_id": "CC-V2-GEO-COUNTY-DIGITAL-TWIN-SCHEMA-1.0",
    "decision_id": DEC,
    "update_id": UPD,
    "geo_decision_id": GEO,
    "generated_at": TODAY,
    "status": "LOCKED",
    "title": "Arkansas 75 — County Digital Twin Schema",
    "matrix": {"counties": 75, "dimensions": 12, "cells": 900},
    "two_questions": {
        "arkansas_now": {
            "label": "ARKANSAS NOW",
            "question": "What role does this county actually play in Arkansas' present political-economic system?",
        },
        "cc_future": {
            "label": "CC FUTURE",
            "question": (
                "Given its people, assets, geography, capabilities, constraints and relationships "
                "with surrounding counties, what functions could this county realistically perform "
                "in a more prosperous Arkansas?"
            ),
            "rule": "Identify possibilities and pathways — never decide that a county must become something.",
        },
    },
    "dimensions": DIMENSIONS,
    "evidence_classes": EVIDENCE_CLASSES,
    "balance_sheet": {
        "assets": [
            "people",
            "skills",
            "businesses",
            "land",
            "natural_resources",
            "infrastructure",
            "institutions",
            "location",
            "productive_capacity",
            "community_capital",
        ],
        "pressures": [
            "housing",
            "healthcare",
            "population_change",
            "poverty",
            "infrastructure_deficiencies",
            "workforce_mismatch",
            "fiscal_pressure",
            "market_concentration",
            "external_dependency",
        ],
        "flows": [
            "people_in_out",
            "workers_in_out",
            "money_in_out",
            "goods_in_out",
            "energy_in_out",
            "public_money_in_out",
            "capital_in_out",
        ],
        "note": "Metabolism of the county — not a complete audited cash-flow statement.",
    },
    "geographic_money_statement": {
        "status": "CONTRACT_ONLY",
        "inflows_targets": [
            "private_income_entering",
            "public_transfers_investment_entering",
            "external_sales",
            "investment_income",
            "other_measurable_inflows",
        ],
        "rule": "Show KNOWN / ESTIMATED / PROXY / UNKNOWN. Do not fabricate precision.",
    },
    "opportunity_portfolio": {
        "status": "ARCHITECTURE_LOCKED_CONTENT_DEFERRED",
        "fields": [
            "existing_strengths",
            "underused_capability",
            "binding_constraints",
            "regional_relationships",
            "potential_pathways",
            "required_conditions",
            "failure_conditions",
            "household_transmission",
            "resilience_implications",
        ],
        "forbidden_publication": "The future of County X is [single industry].",
        "philosophy": "The system identifies opportunity; people and markets still decide what actually emerges.",
    },
    "network": {
        "label": "THE ARKANSAS COUNTY NETWORK",
        "stack": ["county", "neighboring_counties", "regional_hub", "arkansas", "national_world"],
        "emergent_role_candidates_not_preassigned": EMERGENT_ROLE_CANDIDATES,
        "example_graph_questions": [
            "Which counties depend on the same hospital?",
            "Where are food-processing gaps?",
            "Where does electricity originate versus get consumed?",
            "Where do workers commute?",
            "Where are housing pressures spreading?",
            "Where are childcare deserts?",
            "Which counties depend disproportionately on one employer?",
            "Which communities share water systems?",
            "Where does broadband weakness constrain otherwise viable development?",
            "Where could several counties share infrastructure rather than duplicating it?",
        ],
    },
    "map_data_contract": {
        "status": "CONTRACT_LOCKED_UI_DEFERRED",
        "layers": [
            "Population",
            "Household Prosperity",
            "Housing",
            "Healthcare",
            "Agriculture",
            "Manufacturing",
            "Energy",
            "Employment",
            "Wages",
            "Ownership",
            "Public Spending",
            "Federal Dependency",
            "Infrastructure",
            "Migration",
            "Resilience",
            "Future Opportunity",
        ],
        "interaction": "Full-screen Arkansas map → choose layer → click county → County X-Ray.",
        "what_if_scenarios_deferred_to_v2_v3": [
            "RECESSION",
            "AI_DISRUPTION",
            "MAJOR_EMPLOYER_LOSS",
            "FEDERAL_FUNDING_REDUCTION",
            "POPULATION_PLUS_10",
            "POPULATION_MINUS_10",
            "ENERGY_EXPANSION",
            "FOOD_PROCESSING_EXPANSION",
            "HEALTHCARE_REGIONALIZATION",
        ],
    },
    "field_first_pipeline": {
        "rule": "Populate one field across all 75 before deepening interpretation.",
        "phase_0": "Schema lock + empty 75 records (THIS SLICE)",
        "phase_1": "People fields across all 75 (PEP/ACS)",
        "phase_2": "Household prosperity fields across all 75 (SAIPE/ACS)",
        "later": "Remaining dimensions field-first; network edges; balance sheets; portfolios",
    },
    "decomposition_rule": {
        "id": "V2-GEO-DECOMPOSITION-RULE",
        "text": (
            "Every baseline object capable of geographic decomposition must be evaluated for "
            "State → Region → County applicability. Not every metric needs county data. "
            "Every major system must ask whether geography materially changes the answer."
        ),
    },
}

# Build 75 records
records = []
for name, fips in COUNTIES:
    seed = SEED.get(fips)
    dims = {}
    for dim in DIMENSIONS:
        cell = {
            "dimension_id": dim["id"],
            "status": "EMPTY",
            "evidence_class": "UNKNOWN",
            "arkansas_now": None,
            "metrics": {},
            "notes": [],
        }
        if seed and dim["id"] == "people":
            cell["status"] = "PARTIAL"
            cell["evidence_class"] = "KNOWN"
            cell["metrics"] = {
                "population_2020": {
                    "value": seed["pop_2020"],
                    "source": "Census PEP co-est2023-alldata",
                    "evidence_class": "KNOWN",
                },
                "population_2023": {
                    "value": seed["pop_2023"],
                    "source": "Census PEP co-est2023-alldata",
                    "evidence_class": "KNOWN",
                },
            }
            cell["notes"] = ["Seeded from V2.1.1 designated-county scaffold — not a complete People dimension."]
        if seed and dim["id"] == "household_prosperity":
            cell["status"] = "PARTIAL"
            cell["evidence_class"] = "KNOWN"
            cell["metrics"] = {
                "poverty_rate_2023": {
                    "value": seed["poverty_2023"],
                    "unit": "percent",
                    "source": "Census SAIPE",
                    "evidence_class": "KNOWN",
                },
                "median_household_income_2023": {
                    "value": seed["mhi_2023"],
                    "unit": "USD",
                    "source": "Census SAIPE",
                    "evidence_class": "KNOWN",
                },
            }
            cell["notes"] = ["Seeded from V2.1.1 designated-county scaffold."]
        dims[dim["id"]] = cell

    records.append(
        {
            "fips": fips,
            "county": name,
            "label": f"{name} County",
            "status": "RECORD_OPENED",
            "arkansas_now_summary": None,
            "cc_future_opportunity_portfolio": None,
            "emergent_roles": [],
            "balance_sheet": {"assets": {}, "pressures": {}, "flows": {}},
            "network_edges": [],
            "dimensions": dims,
            "unknowns": [],
        }
    )

partial = sum(
    1
    for r in records
    for d in r["dimensions"].values()
    if d["status"] == "PARTIAL"
)

inventory = {
    "version": "1.0.0",
    "slice_id": "CC-V2-GEO-ARKANSAS-75-INVENTORY-1.0",
    "decision_id": DEC,
    "update_id": UPD,
    "geo_decision_id": GEO,
    "generated_at": TODAY,
    "status": "SCHEMA_LOCKED_FIELD_POPULATION_OPEN",
    "county_count": len(records),
    "dimension_count": len(DIMENSIONS),
    "matrix_cells": len(records) * len(DIMENSIONS),
    "cells_partial": partial,
    "cells_empty": len(records) * len(DIMENSIONS) - partial,
    "population_method": "field_first",
    "no_ranking": True,
    "records": records,
}

county_unknowns = {
    "version": "1.0.0",
    "slice_id": "CC-V2-GEO-COUNTY-UNKNOWN-REGISTER-1.0",
    "decision_id": DEC,
    "update_id": UPD,
    "generated_at": TODAY,
    "status": "LIVE",
    "rule": "County unknowns inherit NON-BLOCKING default unless a specific V2.2 redesign decision requires resolution.",
    "entries": [
        {
            "id": "UNK-GEO-001",
            "question": "Complete PEP/ACS people fields for all 75 counties on one vintage?",
            "class": "NON-BLOCKING",
            "resolves_via": "Field-first People pass across all 75",
            "v2_2_requires": False,
        },
        {
            "id": "UNK-GEO-002",
            "question": "Comparable household prosperity burden stack for all 75?",
            "class": "NON-BLOCKING",
            "resolves_via": "Field-first Household Prosperity pass",
            "v2_2_requires": False,
        },
        {
            "id": "UNK-GEO-003",
            "question": "Complete county cash-flow / Geographic Money Statement?",
            "class": "NON-BLOCKING",
            "resolves_via": "Partial KNOWN/ESTIMATED/PROXY panels — never fabricated completeness",
            "v2_2_requires": False,
        },
        {
            "id": "UNK-GEO-004",
            "question": "Commuting / care / shopping edge graph for the County Network?",
            "class": "NON-BLOCKING",
            "resolves_via": "LOD / ACS commute / healthcare referral proxies",
            "v2_2_requires": False,
        },
    ],
}

# Persist core artifacts
dump("data/project/cc_v2_geo_001_decision.json", geo_decision)
dump("data/project/cc_v2_geo_county_digital_twin_schema.json", schema)
dump("data/project/cc_v2_geo_arkansas_75_inventory.json", inventory)
dump("data/project/cc_v2_geo_county_unknown_register.json", county_unknowns)

# Narrow amend master plan
plan = load("data/project/cc_v2_master_build_plan.json")
plan["decision_id"] = DEC
plan["update_id"] = UPD
plan["geographic_dimension"] = {
    "id": GEO,
    "status": "LOCKED",
    "inside_gate": "V2.1",
    "not_a_sixth_gate": True,
    "schema": "data/project/cc_v2_geo_county_digital_twin_schema.json",
    "inventory": "data/project/cc_v2_geo_arkansas_75_inventory.json",
    "decomposition_rule": schema["decomposition_rule"]["text"],
    "href": "/v2/see-arkansas/counties/",
}
# Extend epistemic rules
extra_rules = [
    "Every baseline object capable of geographic decomposition must be evaluated for State → Region → County applicability.",
    "No county ranking from best to worst — compare dimensions.",
    "County roles emerge from evidence; never pre-assign futures.",
    "Populate county fields field-first across all 75 — not 75 sequential books.",
]
for r in extra_rules:
    if r not in plan["epistemic_rules"]:
        plan["epistemic_rules"].append(r)
plan["next_only"] = (
    "Continue V2.1.2 Government & Money — with geographic decomposition rule active. "
    "County field-first population proceeds in parallel as spine, not a separate gate."
)
dump("data/project/cc_v2_master_build_plan.json", plan)

# Amend V2.1
v21 = load("data/project/cc_v2_1_see_arkansas.json")
v21["decision_id"] = DEC
v21["update_id"] = UPD
v21["geographic_dimension"] = {
    "id": GEO,
    "status": "LOCKED",
    "matrix": "75 counties × 12 dimensions",
    "href": "/v2/see-arkansas/counties/",
    "decomposition_rule": schema["decomposition_rule"]["text"],
    "finish_line_addition": (
        "When V2.1 closes: Here's Arkansas—and here's how the Arkansas system manifests "
        "differently across its 75 counties."
    ),
}
v21["discipline"]["forbidden"] = list(
    dict.fromkeys(
        (v21["discipline"].get("forbidden") or [])
        + [
            "75 county books",
            "Best-to-worst county rankings",
            "Pre-assigned county futures",
            "Fabricated county cash-flow precision",
        ]
    )
)
# Insert geo spine note into passes without adding a sixth gate
v21["passes_note"] = (
    "Geographic 75-county spine is permanent infrastructure inside SEE — populated field-first "
    "alongside passes 2.1.1–2.1.5, not as a sixth pass/gate."
)
dump("data/project/cc_v2_1_see_arkansas.json", v21)

# Extend geographic lens
geo = load("data/project/cc_v2_1_1_geographic_lens.json")
geo["decision_id"] = DEC
geo["update_id"] = UPD
geo["arkansas_75"] = {
    "status": "SCHEMA_LOCKED",
    "href": "/v2/see-arkansas/counties/",
    "inventory": "data/project/cc_v2_geo_arkansas_75_inventory.json",
    "note": "Designated-county scaffold remains the first comparison set; 75-county twin inventory is the full spine.",
}
dump("data/project/cc_v2_1_1_geographic_lens.json", geo)

# Decision register
reg = load("data/project/v2_decision_register.json")
entry = {
    "id": "V2-DEC-010",
    "date": TODAY,
    "title": f"{GEO} — 75-County Geographic Dimension (narrow amendment)",
    "decision": geo_decision["decision"],
    "why": geo_decision["why"],
    "evidence": [
        "V2.1.1 designated-county divergence",
        "User-accepted geographic spine for v2 analysis / v3 personalization",
    ],
    "alternatives_rejected": [
        "Sixth V2 gate for counties",
        "Wait until v3 to collect county architecture",
        "75 sequential county books",
        "Composite best/worst county scores",
        "Pre-assigning county futures (central planning)",
    ],
    "could_reverse_if": "Schema proven unfit after first field-first pass — amend schema explicitly, keep anti-ranking and anti-book rules.",
    "v1_doctrine_impact": "NONE — applications geography only.",
}
reg["entries"] = [e for e in reg["entries"] if e["id"] != "V2-DEC-010"] + [entry]
reg["decision_id"] = DEC
reg["update_id"] = UPD
dump("data/project/v2_decision_register.json", reg)

# Also append GEO id crosswalk into register meta
reg2 = load("data/project/v2_decision_register.json")
reg2["geo_decisions"] = [{"id": GEO, "v2_dec": "V2-DEC-010"}]
dump("data/project/v2_decision_register.json", reg2)

# Merge county unknowns into main unknown register pointer
unk = load("data/project/cc_v2_unknown_register.json")
unk["county_register"] = "data/project/cc_v2_geo_county_unknown_register.json"
for e in county_unknowns["entries"]:
    if not any(x.get("id") == e["id"] for x in unk.get("entries") or []):
        unk.setdefault("entries", []).append(
            {
                "id": e["id"],
                "question": e["question"],
                "why_unknown": "County geographic spine opened; field-first population not yet run statewide.",
                "evidence_that_would_resolve": e["resolves_via"],
                "v2_2_requires_resolution": e["v2_2_requires"],
                "class": e["class"],
                "home_ids": ["geographic_disparities", "demographics", "household_economics"],
            }
        )
unk["decision_id"] = DEC
unk["update_id"] = UPD
dump("data/project/cc_v2_unknown_register.json", unk)

# What Changed for GEO amendment
what = {
    "version": "1.0.0",
    "pass_id": GEO,
    "pass_name": "75-County Geographic Dimension",
    "decision_id": DEC,
    "update_id": UPD,
    "generated_at": TODAY,
    "status": "COMPLETE",
    "amendment_class": "NARROW_MASTER_PLAN_AMENDMENT",
    "before_after": [
        {"label": "V2 gates", "before": "5", "after": "5 (unchanged — not a sixth gate)"},
        {"label": "Geographic spine", "before": "lens + 7-county scaffold", "after": "75×12 digital-twin schema LOCKED"},
        {"label": "County records opened", "before": "0", "after": "75"},
        {"label": "Matrix cells", "before": "—", "after": f"900 ({partial} PARTIAL seed / {900-partial} EMPTY)"},
        {"label": "County rankings", "before": "—", "after": "FORBIDDEN"},
        {"label": "Recommendations", "before": "—", "after": "0"},
    ],
    "objects_closed": [],
    "note": "Schema lock does not inflate V2.1 object closures. Field-first population closes cells later.",
    "new_unknowns": [e["id"] for e in county_unknowns["entries"]],
    "patterns_observed": [],
    "nothing_recommended": True,
    "sources_added": ["Census PEP/SAIPE seed for 7 designated counties only"],
    "visuals_added": ["/v2/see-arkansas/counties/", "/v2/see-arkansas/counties/network/"],
    "decisions_recorded": ["V2-DEC-010", GEO],
    "deferred_items": [
        "Full field-first People pass across 75",
        "Interactive full-screen map UI",
        "What-if scenario maps",
        "Opportunity portfolio content per county",
        "Complete Geographic Money Statements",
        "v3 personalized 'where you live' book experience",
    ],
    "experience_links": [
        {"href": "/v2/see-arkansas/counties/", "label": "Arkansas 75 — County Digital Twins →"},
        {"href": "/v2/see-arkansas/counties/network/", "label": "County Network contract →"},
        {"href": "/v2/see-arkansas/", "label": "V2.1 hub →"},
        {"href": "/v2/decisions/", "label": "Decision Register →"},
    ],
}
dump("data/project/pass_changelogs/v2_geo_001.json", what)

# Wire dials lightly (blueprint unchanged — schema only)
state = load("data/project/current_build_state.json")
state["decision_id"] = DEC
state["notes"] = [
    f"{DEC} / {UPD}: {GEO} locked — 75×12 county digital-twin spine inside V2.1. No sixth gate. No rankings."
] + [n for n in (state.get("notes") or []) if DEC not in str(n)]
state["writing_focus"] = (
    "V2.1 active. Geographic 75-county spine LOCKED. Next still V2.1.2 Government & Money "
    "(with decomposition rule). Field-first county population is parallel spine work."
)
dump("data/project/current_build_state.json", state)

bpreg = load("data/project/build_progress_registry.json")
bpreg["decision_id"] = DEC
bpreg["update_id"] = UPD
if not any(x.get("id") == DEC for x in bpreg.get("infrastructure_checkpoints") or []):
    bpreg.setdefault("infrastructure_checkpoints", []).append(
        {
            "id": DEC,
            "title": f"{GEO} — 75-County Geographic Dimension locked",
            "date": TODAY,
            "href": "/v2/see-arkansas/counties/",
        }
    )
dump("data/project/build_progress_registry.json", bpreg)

ladder = load("data/project/completion_ladder_and_dashboard.json")
ladder["decision_id"] = DEC
ladder["update_id"] = UPD
ladder["v2_geographic_dimension"] = {
    "id": GEO,
    "status": "LOCKED",
    "counties": 75,
    "dimensions": 12,
    "href": "/v2/see-arkansas/counties/",
    "note": "Inside V2.1 — not a sixth gate. Schema locked; field-first population open.",
}
dump("data/project/completion_ladder_and_dashboard.json", ladder)

sg = load("data/project/stewardship_governance_v1.json")
sg["v2_geographic_dimension"] = {"id": GEO, "href": "/v2/see-arkansas/counties/", "status": "LOCKED"}
dump("data/project/stewardship_governance_v1.json", sg)

updates = load("data/project/updates.json")
if not any(u.get("id") == UPD for u in updates.get("updates") or []):
    updates["updates"].append(
        {
            "id": UPD,
            "date": TODAY,
            "title": f"{GEO} — 75-County Geographic Dimension locked inside V2.1",
            "summary": (
                f"{DEC}: Narrow Master Plan amendment. 75×12 digital-twin schema, balance sheets, "
                "network contract, opportunity portfolios, anti-ranking guardrail. Not a sixth gate. "
                "Field-first population next. V2.1.2 remains the active SEE pass."
            ),
            "public": True,
        }
    )
updates["last_updated"] = TODAY
dump("data/project/updates.json", updates)

# Cursor rule tweak
rule_path = ROOT / ".cursor/rules/v2-doctrine-protection.mdc"
rule = rule_path.read_text(encoding="utf-8")
if "V2-GEO-001" not in rule:
    rule = rule.replace(
        "## Forbidden now (post-freeze)",
        "## Geographic spine (inside V2.1)\n\n"
        "**V2-GEO-001** locked: 75×12 county digital twins. Field-first across all 75. "
        "No rankings. No sixth gate. No pre-assigned county futures.\n\n"
        "## Forbidden now (post-freeze)",
    )
    rule_path.write_text(rule, encoding="utf-8")

(ROOT / "reports/CC_V2_GEO_001_RETURN.md").write_text(
    f"""# {GEO} — 75-County Geographic Dimension — Return

**Decision:** {DEC} · **Update:** {UPD} · **Date:** {TODAY}

## Verdict

Narrow Master Plan amendment **LOCKED**.
Not a sixth gate. Inside **V2.1 SEE ARKANSAS**.

75 county records opened · 12 dimensions · **900** matrix cells  
({partial} PARTIAL seed from V2.1.1 scaffold · {900 - partial} EMPTY)

## Locked

- Same analytical model for every county
- ARKANSAS NOW vs CC FUTURE (opportunity portfolios, not mandates)
- County Balance Sheet + flows (metabolism)
- County Network graph contract
- Map/data contract (UI deferred)
- Geographic decomposition rule
- Anti-ranking · anti-book · field-first

## Next

V2.1.2 Government & Money remains the active SEE pass.  
County field-first People/Household population is parallel spine work.
""",
    encoding="utf-8",
)

print(f"counties={len(records)} cells={len(records)*12} partial={partial}")
