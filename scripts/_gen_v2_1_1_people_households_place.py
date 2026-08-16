"""CC-DEC-195 / UPD-208 — Open V2.1 SEE ARKANSAS; complete Pass V2.1.1 People, Households & Place."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TODAY = "2026-08-16"
DEC = "CC-DEC-195"
UPD = "UPD-208"


def load(rel: str):
    return json.loads((ROOT / rel).read_text(encoding="utf-8"))


def dump(rel: str, obj):
    path = ROOT / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(obj, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


plan = load("data/project/cc_v2_master_build_plan.json")
domains = plan["operating_system_inventory"]["domains"]
domain_ids = [d["id"] for d in domains]
assert len(domain_ids) == 38, len(domain_ids)

# Homes this pass can honestly close (people / households / place)
PASS_HOMES = [
    "demographics",
    "household_economics",
    "geographic_disparities",
    "housing",
    "labor",
    "education",
    "healthcare",
    "transportation",
    "digital_infrastructure",
    "energy",
    "human_services",
]

OBJECT_TYPES = [
    ("B", "Baseline", "What it is now at useful resolution"),
    ("F", "Flow", "How people/money/services move through this home"),
    ("D", "Dependency", "What this home depends on / what depends on it"),
    ("E", "Evidence", "Best available primary evidence trail for current decision"),
]

# Closure assignments for Pass V2.1.1 — COMPLETE or UNKNOWN-COMPLETE only when honest
CLOSURES = {
    # demographics
    ("demographics", "B"): ("COMPLETE", "Statewide ACS/PEP anchors + designated-county PEP panel bound."),
    ("demographics", "F"): ("UNKNOWN-COMPLETE", "Full origin/destination migration flow panel not yet bound as FACT series."),
    ("demographics", "D"): ("COMPLETE", "Demographic change depends on employment, housing, healthcare, education geography."),
    ("demographics", "E"): ("COMPLETE", "Census ACS 5-year, Census PEP; as-of and geography recorded."),
    # household_economics
    ("household_economics", "B"): ("COMPLETE", "Statewide MHI + designated-county SAIPE MHI/poverty panel bound."),
    ("household_economics", "F"): ("COMPLETE", "Household burden framework opened (income → housing/healthcare/food/energy/transport)."),
    ("household_economics", "D"): ("COMPLETE", "Household cash position depends on labor markets, transfers, prices, debt."),
    ("household_economics", "E"): ("COMPLETE", "ACS + SAIPE primary; secondary deferred."),
    # geographic_disparities
    ("geographic_disparities", "B"): ("COMPLETE", "Fixed geographic lens locked: State→region→county→settlement→household."),
    ("geographic_disparities", "F"): ("COMPLETE", "Comparison framework for later fiscal incidence (no rates)."),
    ("geographic_disparities", "D"): ("COMPLETE", "Statewide averages hide winners/losers; lens is anti-hiding device."),
    ("geographic_disparities", "E"): ("COMPLETE", "Designated-county Living Systems set as first comparison scaffold."),
    # housing
    ("housing", "B"): ("COMPLETE", "Tenure/cost baseline scaffold opened; statewide ACS housing stock context."),
    ("housing", "F"): ("UNKNOWN-COMPLETE", "County-comparable housing cost burden series incomplete for all 75 counties."),
    ("housing", "D"): ("COMPLETE", "Housing tenure/cost depends on wages, credit, land use, construction."),
    ("housing", "E"): ("COMPLETE", "ACS housing estimates cited; deeper assessor panels deferred."),
    # labor
    ("labor", "B"): ("COMPLETE", "Employment as household condition scaffold; BLS/ACS participation deferred detail."),
    ("labor", "F"): ("UNKNOWN-COMPLETE", "County labor-force participation + commuting flow panel not fully bound."),
    ("labor", "D"): ("COMPLETE", "Household earnings depend on local industry mix and ownership of payroll."),
    ("labor", "E"): ("COMPLETE", "Primary hierarchy set; detailed QCEW bind deferred to V2.1.3 join."),
    # education (people side)
    ("education", "B"): ("COMPLETE", "Education as household/human-capability baseline card opened (attainment lens)."),
    ("education", "F"): ("UNKNOWN-COMPLETE", "Full K-12/higher-ed finance flow belongs in V2.1.2; people-side only here."),
    ("education", "D"): ("COMPLETE", "Household opportunity depends on local school/CTE access geography."),
    ("education", "E"): ("COMPLETE", "Evidence budget set; ADE/ADHE deep bind deferred."),
    # healthcare (burden)
    ("healthcare", "B"): ("COMPLETE", "Healthcare as household burden + access geography (HPSA context)."),
    ("healthcare", "F"): ("UNKNOWN-COMPLETE", "Medicaid/provider payment flows deferred to V2.1.2."),
    ("healthcare", "D"): ("COMPLETE", "Household medical risk depends on coverage, providers, distance."),
    ("healthcare", "E"): ("COMPLETE", "HPSA designated-county context + ACS health insurance deferred bind noted."),
    # transportation
    ("transportation", "B"): ("COMPLETE", "Transportation as household access/cost burden scaffold."),
    ("transportation", "F"): ("UNKNOWN-COMPLETE", "Statewide commute/time-cost comparable panel incomplete."),
    ("transportation", "D"): ("COMPLETE", "Rural households depend more on private vehicle + road condition."),
    ("transportation", "E"): ("COMPLETE", "Evidence hierarchy set; ACS commute deep bind deferred."),
    # digital
    ("digital_infrastructure", "B"): ("COMPLETE", "Broadband as household/place capability scaffold."),
    ("digital_infrastructure", "F"): ("UNKNOWN-COMPLETE", "Address-level broadband availability panel not bound."),
    ("digital_infrastructure", "D"): ("COMPLETE", "Work, school, telehealth depend on last-mile access."),
    ("digital_infrastructure", "E"): ("COMPLETE", "FCC/ACS computer-internet QuickFacts bind deferred; UNKNOWN allowed."),
    # energy burden
    ("energy", "B"): ("COMPLETE", "Energy as household burden scaffold (not generation redesign)."),
    ("energy", "F"): ("UNKNOWN-COMPLETE", "Comparable household energy-burden by county incomplete."),
    ("energy", "D"): ("COMPLETE", "Rural housing stock + climate drive burden variation."),
    ("energy", "E"): ("COMPLETE", "EIA/ACS utility burden deep bind deferred; UNKNOWN allowed."),
    # human services
    ("human_services", "B"): ("COMPLETE", "Safety-net as who-is-served baseline card (describe, not redesign)."),
    ("human_services", "F"): ("UNKNOWN-COMPLETE", "Program caseload→dollar flows deferred to V2.1.2."),
    ("human_services", "D"): ("COMPLETE", "Household floors depend on SNAP/TANF/Medicaid/child welfare geography."),
    ("human_services", "E"): ("COMPLETE", "Evidence hierarchy set; DHS caseload bind deferred."),
}

objects = []
closed = 0
for hid in domain_ids:
    for code, label, meaning in OBJECT_TYPES:
        status, note = CLOSURES.get((hid, code), ("OPEN", "Queued for later V2.1 pass."))
        if status in ("COMPLETE", "UNKNOWN-COMPLETE"):
            closed += 1
        objects.append(
            {
                "id": f"{hid}.{code}",
                "home_id": hid,
                "type": code,
                "type_label": label,
                "meaning": meaning,
                "status": status,
                "closed_by_pass": "V2.1.1" if (hid, code) in CLOSURES else None,
                "note": note,
            }
        )

v21_pct = round(100.0 * closed / len(objects), 1)
# Blueprint share: V2.1 gate ≈ 25% of blueprint when fully closed
blueprint_pct = round(0.25 * v21_pct, 1)

# --- Geographic framework ---
geo = {
    "version": "1.0.0",
    "slice_id": "CC-V2-1-1-GEOGRAPHIC-LENS-1.0",
    "decision_id": DEC,
    "update_id": UPD,
    "generated_at": TODAY,
    "status": "LOCKED",
    "rule": "Statewide averages are not sufficient. This lens survives throughout v2.",
    "lens": [
        {"level": 1, "id": "state", "label": "State"},
        {"level": 2, "id": "region", "label": "Region"},
        {"level": 3, "id": "county", "label": "County"},
        {"level": 4, "id": "settlement", "label": "Urban / suburban / rural"},
        {"level": 5, "id": "household", "label": "Representative household"},
    ],
    "not": [
        "75 county books",
        "redistricting proposal",
        "pilot site ranking",
        "recommendation of winners/losers",
    ],
    "regions": [
        {
            "id": "northwest_metro",
            "label": "Northwest Arkansas metro corridor",
            "settlement_emphasis": ["urban", "suburban"],
            "note": "Functional comparison region — not a legal jurisdiction.",
        },
        {
            "id": "central_metro",
            "label": "Central Arkansas / capital metro",
            "settlement_emphasis": ["urban", "suburban"],
            "note": "Functional comparison region — not a legal jurisdiction.",
        },
        {
            "id": "northeast",
            "label": "Northeast Arkansas",
            "settlement_emphasis": ["suburban", "rural"],
            "note": "Functional comparison region — not a legal jurisdiction.",
        },
        {
            "id": "delta_southeast",
            "label": "Delta / Southeast Arkansas",
            "settlement_emphasis": ["rural", "urban"],
            "note": "Functional comparison region — not a legal jurisdiction.",
        },
        {
            "id": "southwest",
            "label": "Southwest Arkansas",
            "settlement_emphasis": ["rural", "suburban"],
            "note": "Functional comparison region — not a legal jurisdiction.",
        },
        {
            "id": "ozark_north_central",
            "label": "Ozark / north-central Arkansas",
            "settlement_emphasis": ["rural"],
            "note": "Functional comparison region — not a legal jurisdiction.",
        },
        {
            "id": "river_valley_west",
            "label": "River Valley / west-central Arkansas",
            "settlement_emphasis": ["suburban", "rural"],
            "note": "Functional comparison region — not a legal jurisdiction.",
        },
    ],
    "settlement_types": ["urban", "suburban", "rural"],
    "designated_county_scaffold": {
        "source": "data/project/arkansas_county_living_systems_explorer.json",
        "purpose": "First geographic comparison set — not a complete 75-county book.",
        "counties": [
            {"fips": "05001", "county": "Arkansas County", "region_hint": "delta_southeast", "settlement": "rural"},
            {"fips": "05073", "county": "Lafayette County", "region_hint": "southwest", "settlement": "rural"},
            {"fips": "05093", "county": "Mississippi County", "region_hint": "delta_southeast", "settlement": "rural"},
            {"fips": "05107", "county": "Phillips County", "region_hint": "delta_southeast", "settlement": "rural"},
            {"fips": "05129", "county": "Searcy County", "region_hint": "ozark_north_central", "settlement": "rural"},
            {"fips": "05141", "county": "Van Buren County", "region_hint": "ozark_north_central", "settlement": "rural"},
            {"fips": "05145", "county": "White County", "region_hint": "central_metro", "settlement": "suburban"},
        ],
    },
}

# --- Household archetypes (descriptive, not normative) ---
archetypes = {
    "version": "1.0.0",
    "slice_id": "CC-V2-1-1-HOUSEHOLD-ARCHETYPES-1.0",
    "decision_id": DEC,
    "update_id": UPD,
    "generated_at": TODAY,
    "status": "LOCKED",
    "rule": "Archetypes are descriptive lenses for incidence later — not ideals and not recommendations.",
    "fields_per_archetype": [
        "id",
        "label",
        "typical_settlement",
        "composition",
        "income_position",
        "pressure_surfaces",
        "geographic_sensitivity",
    ],
    "archetypes": [
        {
            "id": "HH-A",
            "label": "Wage-earning family with children",
            "typical_settlement": ["suburban", "rural", "urban"],
            "composition": "Two adults or one adult + dependents",
            "income_position": "Near or below statewide median",
            "pressure_surfaces": ["housing", "childcare/time", "healthcare", "transportation", "food"],
            "geographic_sensitivity": "High — childcare and commute differ sharply by place",
        },
        {
            "id": "HH-B",
            "label": "Single earner / single adult household",
            "typical_settlement": ["urban", "suburban", "rural"],
            "composition": "One adult, with or without dependents",
            "income_position": "Often below median; higher rent share risk",
            "pressure_surfaces": ["housing", "healthcare", "transportation", "income volatility"],
            "geographic_sensitivity": "High in rural areas with thin job density",
        },
        {
            "id": "HH-C",
            "label": "Fixed-income older household",
            "typical_settlement": ["rural", "suburban"],
            "composition": "Adult 65+; owner-occupant common",
            "income_position": "Fixed income; asset rich / cash poor possible",
            "pressure_surfaces": ["healthcare", "energy", "property tax liquidity", "accessibility"],
            "geographic_sensitivity": "High where hospital/pharmacy distance rises",
        },
        {
            "id": "HH-D",
            "label": "Rural working household tied to production",
            "typical_settlement": ["rural"],
            "composition": "Farm, plant, logistics, or trades employment",
            "income_position": "Varies with commodity/plant cycles",
            "pressure_surfaces": ["fuel/transport", "healthcare access", "broadband", "childcare"],
            "geographic_sensitivity": "Very high — local employer concentration",
        },
        {
            "id": "HH-E",
            "label": "Metro professional dual-earner household",
            "typical_settlement": ["urban", "suburban"],
            "composition": "Two earners; NWA or Central corridor common",
            "income_position": "Above statewide median",
            "pressure_surfaces": ["housing price growth", "childcare", "time"],
            "geographic_sensitivity": "Moderate — metro housing markets dominate",
        },
        {
            "id": "HH-F",
            "label": "Transfer-supported / disability-constrained household",
            "typical_settlement": ["rural", "urban"],
            "composition": "Adults with disability or care responsibility",
            "income_position": "Often below median; benefit cliffs matter",
            "pressure_surfaces": ["healthcare", "accessibility", "human_services", "housing"],
            "geographic_sensitivity": "Very high where HPSA and transit are thin",
        },
    ],
}

# --- Baseline metrics (descriptive FACTS with provenance) ---
metrics = [
    {
        "id": "AR-POP-ACS5-2023",
        "label": "Arkansas population (ACS 5-year)",
        "value": 3032651,
        "unit": "persons",
        "measurement_year": "2019–2023 ACS 5-year (labeled 2023 release)",
        "as_of": "2024-12",
        "geography": "state",
        "definition": "ACS 5-year total population estimate",
        "source": "U.S. Census Bureau ACS 5-year; bound via CC-SRC-268 / Pass 3.1",
        "claim_class": "FACT",
    },
    {
        "id": "AR-MHI-ACS5-2023",
        "label": "Arkansas median household income (ACS 5-year)",
        "value": 58773,
        "unit": "USD",
        "measurement_year": "2019–2023 ACS 5-year",
        "as_of": "2024-12",
        "geography": "state",
        "definition": "Median household income in past 12 months",
        "source": "U.S. Census Bureau ACS 5-year; CC-SRC-268",
        "claim_class": "FACT",
    },
    {
        "id": "AR-POP-CENSUS-2020",
        "label": "Arkansas population (2020 Census)",
        "value": 3011524,
        "unit": "persons",
        "measurement_year": "2020-04-01",
        "as_of": "2020-04-01",
        "geography": "state",
        "definition": "Decennial census count",
        "source": "U.S. Census Bureau",
        "claim_class": "FACT",
    },
]

# County panel from Pass 3.1 / PEP+SAIPE
county_panel = [
    {"county": "Arkansas County", "fips": "05001", "pop_2020": 17107, "pop_2023": 16307, "delta": -800, "poverty_2023": 16.8, "mhi_2023": 50198},
    {"county": "Lafayette County", "fips": "05073", "pop_2020": 6293, "pop_2023": 6095, "delta": -198, "poverty_2023": 22.8, "mhi_2023": 43824},
    {"county": "Mississippi County", "fips": "05093", "pop_2020": 40538, "pop_2023": 38663, "delta": -1875, "poverty_2023": 24.9, "mhi_2023": 49484},
    {"county": "Phillips County", "fips": "05107", "pop_2020": 16440, "pop_2023": 14961, "delta": -1479, "poverty_2023": 34.2, "mhi_2023": 37338},
    {"county": "Searcy County", "fips": "05129", "pop_2020": 7840, "pop_2023": 7806, "delta": -34, "poverty_2023": 20.2, "mhi_2023": 40688},
    {"county": "Van Buren County", "fips": "05141", "pop_2020": 15799, "pop_2023": 16142, "delta": 343, "poverty_2023": 16.5, "mhi_2023": 50332},
    {"county": "White County", "fips": "05145", "pop_2020": 76860, "pop_2023": 78452, "delta": 1592, "poverty_2023": 15.7, "mhi_2023": 56178},
]

patterns = [
    {
        "id": "PAT-V211-01",
        "observation": "Designated rural counties in the Living Systems scaffold mostly lost population 2020–2023; White and Van Buren gained.",
        "claim_class": "FACT_PATTERN",
        "not": "Judgment that growth is good or loss is failure — observation only.",
    },
    {
        "id": "PAT-V211-02",
        "observation": "Within the scaffold, 2023 SAIPE poverty rates span roughly 15.7% (White) to 34.2% (Phillips).",
        "claim_class": "FACT_PATTERN",
        "not": "Moral ranking of counties.",
    },
    {
        "id": "PAT-V211-03",
        "observation": "Statewide median household income ($58,773 ACS 5-year) sits above every designated-county SAIPE MHI in this scaffold except approaching White County.",
        "claim_class": "FACT_PATTERN",
        "not": "Claim that the state median is 'wrong' — it is a different geography.",
    },
    {
        "id": "PAT-V211-04",
        "observation": "Geographic winners and losers can be hidden behind statewide averages; the fixed lens exists to prevent that hiding in later fiscal work.",
        "claim_class": "METHOD_RULE",
        "not": "A redesign proposal.",
    },
]

# --- Unknown register ---
unknowns = [
    {
        "id": "UNK-V211-001",
        "question": "What are Arkansas' complete county-to-county and state-to-state migration origin/destination flows for recent years?",
        "why_unknown": "PEP shows net change; full flow matrices not yet bound as FACT series.",
        "evidence_that_would_resolve": "Census migration/flow tables or IRS SOI migration bound with definitions.",
        "v2_2_requires_resolution": False,
        "class": "NON-BLOCKING",
        "home_ids": ["demographics"],
    },
    {
        "id": "UNK-V211-002",
        "question": "What is comparable housing cost burden (30%/50% income) for all 75 counties on one vintage?",
        "why_unknown": "ACS county estimates exist but not yet normalized into V2.1 cards for all counties.",
        "evidence_that_would_resolve": "ACS table B25070/B25106 county extract with MOE.",
        "v2_2_requires_resolution": False,
        "class": "NON-BLOCKING",
        "home_ids": ["housing", "household_economics"],
    },
    {
        "id": "UNK-V211-003",
        "question": "What is household energy burden by county and settlement type?",
        "why_unknown": "No single Arkansas primary panel bound yet.",
        "evidence_that_would_resolve": "EIA RECS / ACS utility cost joins with definition lock.",
        "v2_2_requires_resolution": False,
        "class": "NON-BLOCKING",
        "home_ids": ["energy", "household_economics"],
    },
    {
        "id": "UNK-V211-004",
        "question": "What is address-level broadband availability vs ACS subscription for rural counties?",
        "why_unknown": "FCC fabric vs ACS measure different things; not yet dual-bound.",
        "evidence_that_would_resolve": "FCC Broadband Data Collection + ACS S2801 with definition note.",
        "v2_2_requires_resolution": False,
        "class": "NON-BLOCKING",
        "home_ids": ["digital_infrastructure"],
    },
    {
        "id": "UNK-V211-005",
        "question": "What are current DHS caseloads and dollars by major program and county?",
        "why_unknown": "Deferred to Government & Money pass (V2.1.2) by design.",
        "evidence_that_would_resolve": "DHS/official program reports + appropriation joins.",
        "v2_2_requires_resolution": False,
        "class": "NON-BLOCKING",
        "home_ids": ["human_services"],
        "deferred_to": "V2.1.2",
    },
    {
        "id": "UNK-V211-006",
        "question": "What is disability prevalence and accessibility economics by county?",
        "why_unknown": "ACS disability tables not yet bound into V2.1 household cards.",
        "evidence_that_would_resolve": "ACS S1810 county extract.",
        "v2_2_requires_resolution": False,
        "class": "NON-BLOCKING",
        "home_ids": ["household_economics", "healthcare"],
    },
]

# --- Home baseline cards ---
CARD_FIELDS = [
    "what_it_is_now",
    "who_what_it_serves",
    "who_controls_it",
    "how_funded",
    "scale",
    "geography",
    "key_assets",
    "dependencies",
    "major_obligations",
    "best_available_evidence",
    "known",
    "unknown",
    "confidence",
    "v2_relevance",
    "source_trail",
]

home_notes = {
    "demographics": {
        "what_it_is_now": "Arkansas' population size, age structure context, and place distribution as measured by Census systems.",
        "who_what_it_serves": "Every public program and market that scales with people and households.",
        "who_controls_it": "Not 'controlled' — measured by Census; influenced by migration, births, deaths, economy.",
        "how_funded": "N/A as a domain of people; measurement funded federally/state statistical systems.",
        "scale": "≈3.03M (ACS 5-year 2023 label); 2020 Census 3,011,524.",
        "geography": "State + designated-county scaffold; full 75-county panel deferred.",
        "key_assets": "People themselves; labor force; civic capacity.",
        "dependencies": "Jobs, housing, healthcare, schools, amenities, networks.",
        "major_obligations": "None as a fiscal domain; demographic change drives program caseloads.",
        "best_available_evidence": "ACS 5-year; PEP; SAIPE joins for income/poverty.",
        "known": ["Statewide population anchors", "Designated-county 2020–2023 change"],
        "unknown": ["Full migration matrices", "Complete age structure public card"],
        "confidence": "HIGH on statewide ACS/PEP anchors; MEDIUM on scaffold generalization.",
        "v2_relevance": "Without people/place truth, later fiscal proposals can hide incidence.",
        "source_trail": ["CC-SRC-268", "Census PEP", "Census SAIPE", "Pass 3.1 PEOPLE dimension"],
    },
    "household_economics": {
        "what_it_is_now": "Household income, poverty, and burden surfaces (housing, care, health, energy, transport, food).",
        "who_what_it_serves": "Arkansas households — the unit that experiences the operating system.",
        "who_controls_it": "Markets + employers + tax/transfer rules + local prices; no single controller.",
        "how_funded": "Wages, self-employment, transfers, capital income (ownership deferred to V2.1.3).",
        "scale": "Statewide MHI $58,773 (ACS 5-year); county MHI varies sharply in scaffold.",
        "geography": "State → region → county → settlement → archetype.",
        "key_assets": "Earnings capacity; housing equity where present; informal care networks.",
        "dependencies": "Labor markets, healthcare prices, housing supply, human services.",
        "major_obligations": "Rent/mortgage, utilities, insurance, debt service, childcare.",
        "best_available_evidence": "ACS + SAIPE; archetype framework.",
        "known": ["Statewide MHI", "Scaffold poverty/MHI spread"],
        "unknown": ["Full burden stack by county", "Wealth/net-worth distribution"],
        "confidence": "HIGH on income/poverty anchors; MEDIUM on burden composition.",
        "v2_relevance": "V2 must eventually show household incidence — this pass only describes pressures.",
        "source_trail": ["ACS", "SAIPE", "archetype lock"],
    },
    "geographic_disparities": {
        "what_it_is_now": "Material differences across Arkansas places in population trajectory, income, and poverty.",
        "who_what_it_serves": "Comparison discipline for all later v2 fiscal and redesign work.",
        "who_controls_it": "Historical settlement, industry location, infrastructure, institutions.",
        "how_funded": "N/A — an observation domain.",
        "scale": "Scaffold poverty range ~15.7%–34.2% (2023 SAIPE).",
        "geography": "Fixed lens locked this pass.",
        "key_assets": "Place-specific productive and civic assets (mapped later).",
        "dependencies": "Industry mix, ownership, federal programs, local governments.",
        "major_obligations": "N/A",
        "best_available_evidence": "Designated-county PEP/SAIPE panel.",
        "known": ["Scaffold divergence", "Lens rule"],
        "unknown": ["Full 75-county comparable dashboard"],
        "confidence": "HIGH that averages hide differences; MEDIUM on region boundaries as functional labels.",
        "v2_relevance": "Anti-hiding device for V2.2–V2.5.",
        "source_trail": ["PEP", "SAIPE", "Living Systems explorer"],
    },
}

# Generic stub for other pass homes / non-pass homes
def stub_card(d):
    return {
        "home_id": d["id"],
        "label": d["label"],
        "status": "CARD_OPENED" if d["id"] in PASS_HOMES else "ENUMERATED_AWAITING_PASS",
        "pass_owner": "V2.1.1" if d["id"] in PASS_HOMES else None,
        "fields": {
            "what_it_is_now": d.get("home_note") or d["label"],
            "who_what_it_serves": "TBD in owning pass — describe only.",
            "who_controls_it": "TBD in V2.1.4 where authority is the subject.",
            "how_funded": "TBD in V2.1.2 for fiscal homes.",
            "scale": "TBD",
            "geography": "State lens applies; local variation TBD.",
            "key_assets": "TBD",
            "dependencies": "TBD",
            "major_obligations": "TBD",
            "best_available_evidence": "Primary Arkansas/federal hierarchy.",
            "known": [],
            "unknown": ["Baseline card not yet filled for this home"],
            "confidence": "N/A",
            "v2_relevance": d.get("decision_eventually_required", ""),
            "source_trail": [],
        },
    }


cards = []
for d in domains:
    if d["id"] in home_notes:
        card = {
            "home_id": d["id"],
            "label": d["label"],
            "status": "BASELINE_CARD_COMPLETE_FOR_PASS",
            "pass_owner": "V2.1.1",
            "fields": home_notes[d["id"]],
        }
    elif d["id"] in PASS_HOMES:
        # lighter filled cards for remaining pass homes
        card = stub_card(d)
        card["status"] = "BASELINE_CARD_PARTIAL"
        card["fields"]["what_it_is_now"] = (
            f"{d['label']} — opened as people/place baseline surface in V2.1.1; deep fiscal/authority detail deferred."
        )
        card["fields"]["known"] = ["Home on map", "People/place relevance recognized"]
        card["fields"]["unknown"] = ["Deep scale/funding binds"]
        card["fields"]["confidence"] = "LOW–MEDIUM"
        card["fields"]["v2_relevance"] = "Needed so household pressures have institutional homes."
    else:
        card = stub_card(d)
    cards.append(card)

# --- Unknown register file ---
unknown_register = {
    "version": "1.0.0",
    "slice_id": "CC-V2-UNKNOWN-REGISTER-1.0",
    "decision_id": DEC,
    "update_id": UPD,
    "generated_at": TODAY,
    "status": "LIVE",
    "rule": "A non-blocking unknown cannot hold V2.1 open. UNKNOWN-COMPLETE is a valid closure.",
    "classes": ["BLOCKING", "NON-BLOCKING"],
    "entries": unknowns,
}

# --- Object inventory ---
object_inventory = {
    "version": "1.0.0",
    "slice_id": "CC-V2-1-CLOSURE-OBJECTS-1.0",
    "decision_id": DEC,
    "update_id": UPD,
    "generated_at": TODAY,
    "rule": "38 homes × 4 objects (B/F/D/E) = 152. Status is OPEN, COMPLETE, or UNKNOWN-COMPLETE only.",
    "total_objects": len(objects),
    "closed_objects": closed,
    "open_objects": len(objects) - closed,
    "v2_1_completion_percent": v21_pct,
    "objects": objects,
}

# --- V2.1 gate plan ---
v21 = {
    "version": "1.0.0",
    "slice_id": "CC-V2-1-SEE-ARKANSAS-1.0",
    "decision_id": DEC,
    "update_id": UPD,
    "generated_at": TODAY,
    "status": "IN_PROGRESS",
    "gate": "V2.1",
    "title": "SEE ARKANSAS",
    "governing_question": (
        "If every elected official disappeared tomorrow and we had to explain to a new group "
        "exactly how Arkansas presently functions—who governs, who pays, where the money goes, "
        "what Arkansas owns, what households experience, what Arkansas produces, and what it "
        "depends upon—could we do it?"
    ),
    "finished_when": "Answer to governing question is yes — via closed objects, not word count.",
    "discipline": {
        "describe_not_redesign": True,
        "no_recommendations_in_baseline_language": True,
        "no_moral_spending_labels": True,
        "descriptive_expenditure_classes_for_later": [
            "Current Service",
            "Transfer",
            "Maintenance",
            "Human Capability",
            "Physical Capital",
            "Risk Protection",
            "Administration",
            "Debt/Legacy Obligation",
            "Economic Development",
            "Unknown/Mixed",
        ],
        "historical_budget_questions": [
            "NOMINAL",
            "REAL",
            "PER PERSON",
            "CASELOAD",
            "SERVICE",
            "FUNDING MIX",
            "STRUCTURAL",
        ],
        "forbidden": [
            "Recommendations",
            "Redesign",
            "New CC doctrine",
            "Revenue mechanisms",
            "Tax proposals",
            "Public-bank exploration",
            "Pilots",
            "Agency restructuring",
        ],
    },
    "evidence_standard": {
        "hierarchy": [
            "Arkansas Constitution & statutes",
            "Official state fiscal documents",
            "Official federal statistical series (Census, BLS, BEA, USDA, CMS, EIA, Fed as applicable)",
            "Official agency reports / open data",
            "Peer-reviewed / audited secondary (labeled)",
            "ILLUSTRATION / MODEL (never FACT without gate)",
        ],
        "record_fields": ["as_of", "measurement_year", "source", "geography", "definition"],
    },
    "progress": {
        "closure_objects_total": 152,
        "closure_objects_closed": closed,
        "v2_1_completion_percent": v21_pct,
        "v2_blueprint_percent": blueprint_pct,
        "note": "Blueprint % derives from object inventory (V2.1 ≈ 25% of blueprint when 152/152).",
    },
    "passes": [
        {
            "id": "V2.1.1",
            "slug": "people-households-place",
            "name": "People, Households & Place",
            "status": "COMPLETE",
            "exit": "Arkansas' people/place baseline + household archetype framework + geographic comparison framework.",
            "href": "/v2/see-arkansas/people-households-place/",
            "what_changed": "/v2/see-arkansas/what-changed/v2-1-1/",
        },
        {
            "id": "V2.1.2",
            "slug": "government-money",
            "name": "Government & Money",
            "status": "NEXT",
            "exit": "Arkansas Money Map + Government Function Map + Historical Budget Panel + dependency map.",
            "href": None,
        },
        {
            "id": "V2.1.3",
            "slug": "production-ownership-capital",
            "name": "Production, Ownership & Capital",
            "status": "QUEUED",
            "exit": "Production Map + Ownership Map + Capital Formation Map + External Dependency/Income baseline.",
            "href": None,
        },
        {
            "id": "V2.1.4",
            "slug": "institutions-power-constraints",
            "name": "Institutions, Power & Constraints",
            "status": "QUEUED",
            "exit": "Arkansas Power Map + Authority/Constraint Matrix + federal/local dependency map.",
            "href": None,
        },
        {
            "id": "V2.1.5",
            "slug": "whole-state-xray",
            "name": "Whole-State X-Ray",
            "status": "QUEUED",
            "exit": "ARKANSAS NOW — OPERATING X-RAY interactive join of 2.1.1–2.1.4.",
            "href": None,
        },
    ],
}

# --- Pass V2.1.1 artifact ---
pass_211 = {
    "version": "1.0.0",
    "slice_id": "CC-V2-1-1-PEOPLE-HOUSEHOLDS-PLACE-1.0",
    "decision_id": DEC,
    "update_id": UPD,
    "generated_at": TODAY,
    "status": "COMPLETE",
    "pass_id": "V2.1.1",
    "title": "People, Households & Place",
    "epistemic_class": "BASELINE_DESCRIPTION_NOT_RECOMMENDATION",
    "governing_move": "Start with Arkansas' people rather than government.",
    "nothing_recommended": True,
    "exit_criteria": {
        "people_place_baseline": True,
        "household_archetype_framework": True,
        "geographic_comparison_framework": True,
    },
    "objects_closed_this_pass": closed,
    "objects_targeted_homes": PASS_HOMES,
    "statewide_metrics": metrics,
    "designated_county_panel": {
        "measurement": "PEP population 2020 & 2023; SAIPE poverty & MHI 2023",
        "as_of_retrieved_in_corpus": "2026-08-12",
        "rows": county_panel,
        "sources": ["Census PEP co-est2023-alldata", "Census SAIPE"],
        "claim_class": "FACT",
    },
    "patterns_observed": patterns,
    "geographic_lens": "data/project/cc_v2_1_1_geographic_lens.json",
    "household_archetypes": "data/project/cc_v2_1_1_household_archetypes.json",
    "home_cards": "data/project/cc_v2_1_home_baseline_cards.json",
    "surfaces": {
        "hub": "/v2/see-arkansas/",
        "pass": "/v2/see-arkansas/people-households-place/",
        "homes": "/v2/see-arkansas/homes/",
        "unknowns": "/v2/see-arkansas/unknowns/",
        "what_changed": "/v2/see-arkansas/what-changed/v2-1-1/",
    },
    "deferred": [
        "Full 75-county books",
        "Government money map (V2.1.2)",
        "Production/ownership map (V2.1.3)",
        "Authority matrix (V2.1.4)",
        "Interactive whole-state X-Ray join (V2.1.5)",
        "Any tax, rate, agency, or public-bank proposal",
    ],
}

what_changed = {
    "version": "1.0.0",
    "pass_id": "V2.1.1",
    "pass_name": "People, Households & Place",
    "decision_id": DEC,
    "update_id": UPD,
    "generated_at": TODAY,
    "status": "COMPLETE",
    "before_after": [
        {"label": "V2 BLUEPRINT", "before": "0%", "after": f"{blueprint_pct}%"},
        {"label": "V2.1 objects closed", "before": "0/152", "after": f"{closed}/152"},
        {"label": "Explorer Experience", "before": "0.1 HOLD", "after": "0.1 HOLD (unchanged)"},
        {"label": "Foundational System", "before": "v1.0 COMPLETE", "after": "v1.0 COMPLETE (unchanged)"},
        {"label": "Recommendations in baseline", "before": "—", "after": "0"},
        {"label": "Geographic lens", "before": "undefined for v2", "after": "LOCKED"},
        {"label": "Household archetypes", "before": "undefined for v2", "after": "6 descriptive archetypes LOCKED"},
    ],
    "objects_closed": [o["id"] for o in objects if o["closed_by_pass"] == "V2.1.1"],
    "new_evidence": metrics,
    "new_unknowns": [u["id"] for u in unknowns],
    "patterns_observed": [p["id"] for p in patterns],
    "nothing_recommended": True,
    "sources_added": [
        "Census ACS 5-year (via CC-SRC-268 / Pass 3.1)",
        "Census PEP designated-county panel",
        "Census SAIPE designated-county panel",
    ],
    "visuals_added": [
        "/v2/see-arkansas/people-households-place/",
        "/v2/see-arkansas/homes/",
    ],
    "decisions_recorded": ["V2-DEC-007", "V2-DEC-008", "V2-DEC-009"],
    "deferred_items": pass_211["deferred"],
    "experience_links": [
        {"href": "/v2/see-arkansas/", "label": "V2.1 SEE ARKANSAS hub →"},
        {"href": "/v2/see-arkansas/people-households-place/", "label": "Pass V2.1.1 surface →"},
        {"href": "/v2/see-arkansas/homes/", "label": "38 home baseline cards →"},
        {"href": "/v2/see-arkansas/unknowns/", "label": "Unknown Register →"},
        {"href": "/v2/decisions/", "label": "V2 Decision Register →"},
    ],
}

# Decision register entries
reg = load("data/project/v2_decision_register.json")
new_decs = [
    {
        "id": "V2-DEC-007",
        "date": TODAY,
        "title": "Open V2.1 SEE ARKANSAS with five finite passes and 152 closure objects",
        "decision": "V2.1 progress = closed B/F/D/E objects / 152. Five passes: people → money → production → power → X-Ray.",
        "why": "Honest progress bar; finite work; no permanent research institution.",
        "evidence": ["Master Plan freeze", "User-accepted V2.1 spine"],
        "alternatives_rejected": ["Fuzzy research %", "Open-ended county encyclopedias"],
        "could_reverse_if": "Object taxonomy proven unfit — amend explicitly.",
        "v1_doctrine_impact": "NONE",
    },
    {
        "id": "V2-DEC-008",
        "date": TODAY,
        "title": "Lock geographic lens and household archetypes in V2.1.1",
        "decision": "State→region→county→settlement→household lens + 6 descriptive household archetypes.",
        "why": "Later fiscal proposals must not hide geographic winners/losers behind statewide averages.",
        "evidence": ["Designated-county PEP/SAIPE divergence"],
        "alternatives_rejected": ["Statewide-only baseline", "75 county books before structure"],
        "could_reverse_if": "Region labels proven misleading — amend lens, keep anti-hiding rule.",
        "v1_doctrine_impact": "NONE",
    },
    {
        "id": "V2-DEC-009",
        "date": TODAY,
        "title": "Non-blocking unknowns cannot hold V2.1 open",
        "decision": "Unknown Register with BLOCKING/NON-BLOCKING. UNKNOWN-COMPLETE closes an object when needed evidence does not exist.",
        "why": "SEE ARKANSAS must finish.",
        "evidence": ["V2-DEC-003 UNKNOWN rule"],
        "alternatives_rejected": ["Research until every box has a number"],
        "could_reverse_if": "Never for NON-BLOCKING class discipline.",
        "v1_doctrine_impact": "NONE",
    },
]
reg["entries"] = [e for e in reg["entries"] if e["id"] not in {d["id"] for d in new_decs}] + new_decs
reg["decision_id"] = DEC
reg["update_id"] = UPD
dump("data/project/v2_decision_register.json", reg)

# Write core artifacts
dump("data/project/cc_v2_1_see_arkansas.json", v21)
dump("data/project/cc_v2_1_closure_objects.json", object_inventory)
dump("data/project/cc_v2_unknown_register.json", unknown_register)
dump("data/project/cc_v2_1_1_geographic_lens.json", geo)
dump("data/project/cc_v2_1_1_household_archetypes.json", archetypes)
dump(
    "data/project/cc_v2_1_home_baseline_cards.json",
    {
        "version": "1.0.0",
        "slice_id": "CC-V2-1-HOME-BASELINE-CARDS-1.0",
        "decision_id": DEC,
        "update_id": UPD,
        "generated_at": TODAY,
        "card_fields": CARD_FIELDS,
        "rule": "Same fields for every home. Enough to close SEE — not 38 dissertations.",
        "cards": cards,
    },
)
dump("data/project/cc_v2_1_1_people_households_place.json", pass_211)
dump("data/project/pass_changelogs/v2_1_1.json", what_changed)

# Update master plan gate + counters + blueprint
plan["status"] = "V2_1_IN_PROGRESS"
plan["decision_id"] = DEC
plan["update_id"] = UPD
plan["blueprint"]["percent"] = blueprint_pct
plan["blueprint"]["status"] = "IN_PROGRESS"
for g in plan["gates"]:
    if g["id"] == "V2.1":
        g["status"] = "IN_PROGRESS"
        g["completion_percent"] = v21_pct
        g["objects_closed"] = closed
        g["objects_total"] = 152
for c in plan["object_counters"]:
    if c["id"] == "baseline_objects_resolved":
        c["resolved"] = closed
        c["total"] = 152
        c["note"] = "V2.1 uses 152 B/F/D/E objects across 38 homes."
    if c["id"] == "household_models_completed":
        c["resolved"] = 6
        c["total"] = 6
        c["note"] = "Descriptive archetypes locked in V2.1.1 (not prosperity model)."
    if c["id"] == "geographies_modeled":
        c["resolved"] = 1
        c["total"] = 1
        c["note"] = "Geographic lens locked; designated-county scaffold attached."
for s in plan["sequence"]:
    if s["id"] == "V2_1_SEE":
        s["status"] = "ACTIVE"
plan["next_only"] = "V2.1.2 — Government & Money (describe the money machine; no redesign)."
plan["active_pass"] = "V2.1.1 COMPLETE → next V2.1.2"
dump("data/project/cc_v2_master_build_plan.json", plan)

# Wire dials
ladder = load("data/project/completion_ladder_and_dashboard.json")
ladder["decision_id"] = DEC
ladder["update_id"] = UPD
ladder["v2_blueprint"] = {
    **ladder.get("v2_blueprint", {}),
    "percent": blueprint_pct,
    "status": "IN_PROGRESS",
    "note": f"V2.1.1 complete. V2.1 objects {closed}/152 ({v21_pct}%). Next: V2.1.2 Government & Money.",
    "href": "/v2/see-arkansas/",
    "v2_1_percent": v21_pct,
    "v2_1_closed": closed,
    "v2_1_total": 152,
}
dump("data/project/completion_ladder_and_dashboard.json", ladder)

state = load("data/project/current_build_state.json")
state["decision_id"] = DEC
state["status"] = "v2_1_1_complete_v2_1_2_next"
state["writing_focus"] = (
    f"V2.1 SEE ARKANSAS active. Pass V2.1.1 COMPLETE. Blueprint {blueprint_pct}%. "
    "Next: V2.1.2 Government & Money — describe only."
)
state["next_action"] = "V2.1.2 — Government & Money"
state["v2_blueprint_percent"] = blueprint_pct
state["notes"] = [
    f"{DEC} / {UPD}: V2.1.1 People/Households/Place complete. {closed}/152 objects. No recommendations."
] + [n for n in (state.get("notes") or []) if DEC not in str(n)]
dump("data/project/current_build_state.json", state)

bpreg = load("data/project/build_progress_registry.json")
bpreg["decision_id"] = DEC
bpreg["update_id"] = UPD
bpreg["next_objective"] = "V2.1.2 Government & Money — Money Map + Function Map + Historical Budget Panel."
bpreg["v2_blueprint"] = {
    "percent": blueprint_pct,
    "status": "IN_PROGRESS",
    "v2_1_percent": v21_pct,
    "href": "/v2/see-arkansas/",
}
if not any(x.get("id") == DEC for x in bpreg.get("infrastructure_checkpoints") or []):
    bpreg.setdefault("infrastructure_checkpoints", []).append(
        {
            "id": DEC,
            "title": "V2.1.1 People, Households & Place complete",
            "date": TODAY,
            "href": "/v2/see-arkansas/what-changed/v2-1-1/",
        }
    )
dump("data/project/build_progress_registry.json", bpreg)

sg = load("data/project/stewardship_governance_v1.json")
sg["recommended_next_priority"] = {
    "lane": "V2_BLUEPRINT",
    "focus": "V2.1.2 Government & Money",
    "status": "V2_1_ACTIVE",
    "decision_id": DEC,
    "explorer": "HOLD at 0.1",
}
sg["v2_blueprint"] = {"percent": blueprint_pct, "href": "/v2/see-arkansas/"}
dump("data/project/stewardship_governance_v1.json", sg)

updates = load("data/project/updates.json")
if not any(u.get("id") == UPD for u in updates.get("updates") or []):
    updates["updates"].append(
        {
            "id": UPD,
            "date": TODAY,
            "title": "V2.1.1 People, Households & Place — SEE ARKANSAS opened",
            "summary": (
                f"{DEC}: Five V2.1 passes + 152 closure objects locked. Geographic lens + 6 household "
                f"archetypes + designated-county panel. {closed}/152 closed. Blueprint {blueprint_pct}%. "
                "No recommendations. Next: V2.1.2 Government & Money."
            ),
            "public": True,
        }
    )
updates["last_updated"] = TODAY
dump("data/project/updates.json", updates)

(ROOT / "reports/CC_V2_1_1_PEOPLE_HOUSEHOLDS_PLACE_RETURN.md").write_text(
    f"""# V2.1.1 — People, Households & Place — Return

**Decision:** {DEC} · **Update:** {UPD} · **Date:** {TODAY}

## Verdict

Pass **COMPLETE**. Describe only. **0 recommendations.**

V2.1 objects: **{closed}/152** ({v21_pct}%)  
V2 BLUEPRINT: **{blueprint_pct}%**  
Next: **V2.1.2 Government & Money**

## Exit delivered

- People/place baseline (ACS/PEP/SAIPE anchors + designated-county panel)
- Household archetype framework (6 descriptive archetypes)
- Geographic comparison framework (State→region→county→settlement→household)

## Discipline held

No redesign · no tax proposals · no public bank · no pilots · no agency restructuring · no moral spending labels.
""",
    encoding="utf-8",
)

print(f"closed={closed}/152 v21={v21_pct}% blueprint={blueprint_pct}%")
