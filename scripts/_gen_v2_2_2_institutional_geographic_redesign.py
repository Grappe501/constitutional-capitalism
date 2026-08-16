#!/usr/bin/env python3
"""CC-DEC-202 / UPD-215 — V2.2.2 Institutional & Geographic Redesign.

Who should perform each legitimate function, at what geographic level,
and through what institutional form?

Field-first: Wave A architectures → Wave B five tests → deepen contested only.
No funding design. No county opportunity portfolios. No boundary redraw.
"""
from __future__ import annotations

import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TODAY = "2026-08-16"
DEC = "CC-DEC-202"
UPD = "UPD-215"
V2DEC = "V2-DEC-016"

ARCHITECTURES = [
    "STATEWIDE",
    "REGIONAL",
    "COUNTY",
    "MUNICIPAL / LOCAL",
    "MARKET / PRIVATE",
    "COOPERATIVE / NONPROFIT / INSTITUTIONAL",
    "MULTI-LEVEL",
    "HOLD / INSUFFICIENT EVIDENCE",
]

STRUCTURAL_VERBS = ["NONE", "REGIONALIZE", "DEVOLVE", "CONSOLIDATE", "REFORM_INSTITUTION"]

LOCKED_RULES = [
    "Do not centralize for neatness. Do not decentralize for ideology.",
    "Put each function where capability, accountability, rights, scale, and geography fit best.",
    "Separate standard-setting from delivery — do not force whole functions into one level.",
    "Political geography ≠ functional geography; record mismatch; do not redraw boundaries yet.",
    "Regionalize / Devolve / Consolidate only when their burden tests pass.",
    "Essential does not mean publicly owned.",
    "Responsibility, authority, and resources must travel together (no unfunded subsidiarity).",
    "County Opportunity Portfolios remain OFF — institutional geography ≠ economic futures.",
    "No funding invented (V2.3). No final legal opinions (V2.4).",
    "Power concentration: split rulemaking / funding / delivery / enforcement / measurement / appeal when they converge dangerously.",
    "Accountability-distance: every upward shift needs a citizen pathway.",
]


def load(rel: str):
    return json.loads((ROOT / rel).read_text(encoding="utf-8"))


def dump(rel: str, obj):
    path = ROOT / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(obj, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def tests(rights, capacity, scale, proximity, spillover, synthesis):
    return {
        "rights": rights,
        "capacity": capacity,
        "scale": scale,
        "proximity": proximity,
        "spillover": spillover,
        "synthesis": synthesis,
    }


def layers(standard, capacity, delivery):
    return {
        "standard_setting": standard,
        "capacity": capacity,
        "delivery": delivery,
    }


plan = load("data/project/cc_v2_master_build_plan.json")
fpass = load("data/project/cc_v2_2_1_government_function_disposition.json")
objects = load("data/project/cc_v2_2_redesign_objects.json")
labels = {d["id"]: d.get("label") for d in plan["operating_system_inventory"]["domains"]}
f_by = {c["home_id"]: c for c in fpass["cards"]}
families = fpass["families"]

I: dict[str, dict] = {}


def put(hid: str, **kwargs):
    I[hid] = kwargs


# --- Wave A+B: all 38 institutional homes (field-first; deepen contested in notes) ---

put(
    "constitutional_structure",
    architecture="STATEWIDE",
    structural_verb="NONE",
    current="Arkansas Constitution + statewide amendment/judicial interpretation pathways",
    proposed="Keep statewide constitutional architecture; no institutional relocation",
    geographic_levels=["STATEWIDE"],
    layers=layers("STATEWIDE", "STATEWIDE", "STATEWIDE (amendment/courts)"),
    government_role="RULEMAKER (foundational)",
    market_role="None — constitutional frame",
    rights_floor="Equal constitutional rights statewide",
    capacity_requirement="Legislative/judicial capacity for amendment and interpretation",
    regional_relationship="None required",
    accountability_pathway="Voters (amendment/election) + courts",
    power_concentration_risk="LOW if amendment pathways remain usable; HIGH if amendment becomes elite-only",
    placement=tests(
        "Yes — rights floors cannot vary by county without constitutional change",
        "Statewide institutions already administer",
        "Duplication of constitutions impossible",
        "Local knowledge does not rewrite constitutional text",
        "Constitutional choices affect all Arkansans",
        "STATEWIDE KEEP of institutional home",
    ),
    regionalization=None,
    devolution=None,
    consolidation=None,
    market=None,
    political_vs_functional="Aligned — statewide polity",
    friction=["Amendment complexity can feel distant to households"],
    blocker=None,
    confidence="HIGH",
    note="F=KEEP. Institution stays statewide. No redesign theater.",
)

put(
    "revenue",
    architecture="MULTI-LEVEL",
    structural_verb="REFORM_INSTITUTION",
    current="DFA / Revenue Division + local tax collectors; federal tax overlay",
    proposed="State standard-setting & major collections; local collectors for local levies; federal interface explicit",
    geographic_levels=["STATEWIDE", "COUNTY", "MUNICIPAL / LOCAL"],
    layers=layers("STATEWIDE (+ federal constraints)", "STATEWIDE", "STATE + LOCAL collectors"),
    government_role="RULEMAKER + PROVIDER/PURCHASER (collection)",
    market_role="Private payroll/withholding agents; not tax policy owners",
    rights_floor="Uniform statutory incidence rules; due process on assessment/appeal",
    capacity_requirement="Statewide IT + audit; local collection competence varies",
    regional_relationship="Regional shared audit/IT capacity only if county capacity fails Scale/Capacity tests",
    accountability_pathway="Legislature + elected executives; local millage votes where applicable",
    power_concentration_risk="MEDIUM — collection + rulemaking converge at DFA; keep appeals independent",
    placement=tests(
        "Uniform tax rights/due process require state floors",
        "Many counties cannot run modern audit/IT alone",
        "Duplicate collection systems costly",
        "Local millage/knowledge matters for local levies",
        "Tax base competition spills across jurisdictions",
        "MULTI-LEVEL: state standards/major tax; local for local levies",
    ),
    regionalization={
        "shared_demand": False,
        "local_inadequate": "Partial — IT/audit",
        "regional_improves": "Possible shared services",
        "accountability_clear": "Only if optional shared service, not new tax authority",
        "result": "NOT regionalized as primary; optional shared capacity",
    },
    devolution=None,
    consolidation={
        "duplication_shown": "Overlapping local/state filing friction (SEE)",
        "functions_overlap": "Partial — admin not policy",
        "transition_costs": "HIGH if forced merger of collectors",
        "accountability": "Could worsen if local millage opaque",
        "capability_risk": "Local knowledge loss",
        "citizen_friction": "One portal helps; consolidating collectors unproven",
        "result": "REFORM portals/process in V2.2.3; do not CONSOLIDATE collectors yet",
    },
    market=None,
    political_vs_functional="Political: county collectors. Functional: statewide filing/withholding.",
    friction=["Duplicate filings", "Unclear who sets vs collects", "Appeal path hard to find"],
    blocker="UNK-FISC-001 for federal-share depth later",
    confidence="MEDIUM",
    note="No rates. Institutional placement only.",
)

put(
    "expenditures",
    architecture="MULTI-LEVEL",
    structural_verb="REFORM_INSTITUTION",
    current="Agency budgets + legislative appropriation; local budgets separate",
    proposed="Statewide appropriation standards & functional visibility; agency delivery; local budgets for local functions",
    geographic_levels=["STATEWIDE", "COUNTY", "MUNICIPAL / LOCAL"],
    layers=layers("STATEWIDE (chart of accounts / visibility)", "STATEWIDE + AGENCY", "AGENCY + LOCAL"),
    government_role="RULEMAKER + PROVIDER/PURCHASER",
    market_role="Vendors under procurement rules",
    rights_floor="Public money transparency as civic right floor",
    capacity_requirement="Functional spending visibility (depends on public_data.I)",
    regional_relationship="None as primary spender",
    accountability_pathway="Legislature + audits + public functional reports",
    power_concentration_risk="HIGH if agencies both allocate and measure themselves — split measurement",
    placement=tests(
        "Equal protection in program access may require statewide floors",
        "Agencies have capacity; citizens lack functional visibility",
        "Duplicate opaque line-items weaken oversight",
        "Local budgets need local knowledge",
        "State spending decisions spill statewide",
        "MULTI-LEVEL with statewide visibility standard",
    ),
    regionalization=None,
    devolution=None,
    consolidation=None,
    market=None,
    political_vs_functional="Agency silos ≠ household-experienced spending geography",
    friction=["Agency optics vs household reach", "Unclear accountability for outcomes"],
    blocker=None,
    confidence="HIGH",
    note="Feeds RD-DEP-001 → public_data visibility before agency consolidate.",
)

put(
    "agencies",
    architecture="MULTI-LEVEL",
    structural_verb="CONSOLIDATE",
    current="Many executive agencies with overlapping admin/support and citizen-facing portals",
    proposed="Keep mission agencies; CONSOLIDATE duplicated back-office & shared citizen interface layers where duplication demonstrated",
    geographic_levels=["STATEWIDE"],
    layers=layers("STATEWIDE executive/legislative", "SHARED STATE SERVICES", "AGENCY PROGRAM UNITS"),
    government_role="PROVIDER/PURCHASER + RULEMAKER (delegated)",
    market_role="Contractors; not substitute for public accountability",
    rights_floor="Digital Due Process + appeal independent of program office",
    capacity_requirement="Shared services must not erase specialized mission skill",
    regional_relationship="Field offices may be regional for access — not new governments",
    accountability_pathway="Governor/legislature + inspectorate/audit + program appeals",
    power_concentration_risk="HIGH if shared services + program + enforcement merge — split",
    placement=tests(
        "Agency discretion can create unequal rights — need statewide floors",
        "Smaller agencies lack modern shared IT/HR/procurement capacity",
        "Duplicated support functions raise cost without mission gain",
        "Field proximity helps service delivery",
        "Agency rules spill across counties",
        "CONSOLIDATE support layers; REFORM mission boundaries carefully",
    ),
    regionalization=None,
    devolution=None,
    consolidation={
        "duplication_shown": "SEE: overlapping portals, purchasing, eligibility stacks",
        "functions_overlap": "Admin/support yes; mission cores often distinct",
        "transition_costs": "HIGH — phase shared services first",
        "accountability": "Improve if single citizen interface + clear program owners",
        "capability_risk": "Do not merge specialized regulators into one blob",
        "citizen_friction": "Should decline with fewer duplicate applications",
        "result": "CONSOLIDATE shared services / interface; not wholesale agency abolition",
    },
    market=None,
    political_vs_functional="Agency org chart ≠ household journey geography",
    friction=[
        "Duplicate applications",
        "Duplicate data entry",
        "Multiple eligibility determinations",
        "Unclear accountability",
    ],
    blocker=None,
    confidence="MEDIUM",
    note="High burden met only for shared services — not org-chart elegance.",
)

put(
    "education",
    architecture="MULTI-LEVEL",
    structural_verb="REGIONALIZE",
    current="ADE + districts (≠ counties) + cooperatives; higher ed separate",
    proposed="STATE standards/rights floor; LOCAL district delivery; REGIONAL coops for specialized capacity; higher-ed regions functional",
    geographic_levels=["STATEWIDE", "REGIONAL", "MUNICIPAL / LOCAL"],
    layers=layers(
        "STATEWIDE rights/quality/finance floors",
        "REGIONAL cooperatives / specialized services",
        "LOCAL districts (+ charter/private under referee rules)",
    ),
    government_role="RULEMAKER + REFEREE + PROVIDER/PURCHASER",
    market_role="Private/charter options under equal referee rules — not unregulated",
    rights_floor="Adequacy/equal educational opportunity floors statewide",
    capacity_requirement="Small districts need coop/regional specialized capacity",
    regional_relationship="Education cooperatives + higher-ed catchment — functional geography",
    accountability_pathway="Local boards + state ADE + courts on adequacy; coops accountable to member districts",
    power_concentration_risk="MEDIUM — keep curriculum/finance rulemaking from swallowing local delivery",
    placement=tests(
        "Yes — unequal rights risk without statewide floors",
        "Many districts lack specialized capacity alone",
        "Duplicating specialists across tiny districts weakens quality",
        "Local knowledge improves school fit",
        "Labor markets and higher-ed spill across district lines",
        "MULTI-LEVEL with REGIONALIZE of specialized capacity",
    ),
    regionalization={
        "shared_demand": True,
        "local_inadequate": True,
        "regional_improves": True,
        "accountability_clear": "Via member-district governance of coops",
        "result": "REGIONALIZE specialized capacity; do not abolish districts",
    },
    devolution={
        "local_competence": "Variable",
        "rights_floor": "Must remain statewide",
        "spillovers": "Manageable for K-12 delivery",
        "funding_follows": "Required — else unfunded subsidiarity",
        "citizen_accountability": "Local boards",
        "result": "Delivery remains local; not further DEVOLVE standards",
    },
    consolidation=None,
    market={
        "competition_works": "Partial",
        "customer_choice": "Partial (residence + limited choice)",
        "barriers": "High for new schools",
        "externalities": "High (civic capability)",
        "universal_access": True,
        "natural_monopoly": "Local delivery often quasi-monopoly",
        "regulation_enough": "Referee needed; pure market fails universal access",
        "result": "Public delivery core + regulated choice — not MARKET primary",
    },
    political_vs_functional="District borders ≠ county borders ≠ labor/higher-ed regions",
    friction=["Finance complexity", "Cross-district service gaps", "Parent navigation burden"],
    blocker=None,
    confidence="MEDIUM",
    note="Institutional geography only — no county education-economy assignment.",
)

put(
    "healthcare",
    architecture="MULTI-LEVEL",
    structural_verb="REGIONALIZE",
    current="ADH/DHS Medicaid admin + private providers + regional hospital hubs; federal co-governance",
    proposed="STATE standards/eligibility floors; REGIONAL care hubs & EMS; LOCAL clinics/public health; MARKET providers under referee",
    geographic_levels=["STATEWIDE", "REGIONAL", "COUNTY", "MARKET / PRIVATE"],
    layers=layers(
        "STATEWIDE (+ federal constraints)",
        "REGIONAL hospital/specialty/EMS networks",
        "LOCAL public health + MARKET providers",
    ),
    government_role="RULEMAKER + REFEREE + PROVIDER/PURCHASER",
    market_role="Primary clinical delivery via competing providers where competition real",
    rights_floor="Access floors; emergency care; due process on eligibility",
    capacity_requirement="Rural counties cannot each run full specialty systems",
    regional_relationship="Hospital referral regions / trauma / specialty — functional geography",
    accountability_pathway="State agency + CMS conditions + elected oversight; regional boards must be visible to citizens",
    power_concentration_risk="HIGH — purchaser + regulator convergence; split referee from monopoly purchaser behavior",
    placement=tests(
        "Yes — unequal access is a rights/security problem",
        "County-alone specialty capacity fails widely",
        "Duplicating specialty plants across counties is wasteful/impossible",
        "Local clinics and public health need proximity",
        "Hospital catchments cross counties routinely",
        "REGIONALIZE capacity; MULTI-LEVEL overall",
    ),
    regionalization={
        "shared_demand": True,
        "local_inadequate": True,
        "regional_improves": True,
        "accountability_clear": "REQUIRED — regional boards + public reporting; else HOLD deepen",
        "result": "REGIONALIZE specialty/EMS capacity with accountability pathway",
    },
    devolution=None,
    consolidation=None,
    market={
        "competition_works": "Partial — urban more than rural",
        "customer_choice": "Constrained by insurance/networks",
        "barriers": "High (CON, capital, specialty)",
        "externalities": "High",
        "universal_access": True,
        "natural_monopoly": "Rural hospital often local monopoly",
        "regulation_enough": "Regulation alone insufficient for rural access",
        "result": "MARKET delivery + public purchaser/referee + regional capacity",
    },
    political_vs_functional="County health units ≠ hospital referral regions",
    friction=["Long travel", "Eligibility handoffs", "Insurance/provider maze"],
    blocker="UNK-FISC-001 for program-depth later",
    confidence="MEDIUM",
    note="Says regional function — NOT 'County X becomes healthcare economy'.",
)

put(
    "justice",
    architecture="MULTI-LEVEL",
    structural_verb="REGIONALIZE",
    current="Courts (circuit/district) + prosecutors + public defense + corrections; some specialized dockets",
    proposed="STATEWIDE constitutional floors & appellate; COUNTY/LOCAL trial courts; REGIONAL specialty dockets & shared defense/forensics capacity",
    geographic_levels=["STATEWIDE", "REGIONAL", "COUNTY"],
    layers=layers("STATEWIDE rights/appellate", "REGIONAL specialty & shared capacity", "COUNTY/LOCAL trial delivery"),
    government_role="RULEMAKER + REFEREE + PROVIDER/PURCHASER",
    market_role="Private counsel; not core adjudication",
    rights_floor="Equal justice / counsel / due process — non-negotiable statewide",
    capacity_requirement="Small counties need shared specialty capacity",
    regional_relationship="Specialty courts / forensics / public defense overload — functional",
    accountability_pathway="Elected judges/prosecutors + appellate review + judicial discipline",
    power_concentration_risk="HIGH if prosecutor + adjudicator + jailer converge without checks",
    placement=tests(
        "Yes — rights variation is intolerable",
        "Specialty capacity uneven",
        "Duplicate specialty courts costly",
        "Local courts need local knowledge",
        "Crime and caseloads spill across borders",
        "MULTI-LEVEL + REGIONALIZE specialty capacity",
    ),
    regionalization={
        "shared_demand": True,
        "local_inadequate": True,
        "regional_improves": True,
        "accountability_clear": "Via circuit structure + public metrics",
        "result": "REGIONALIZE specialty/shared defense-forensics; keep local trial access",
    },
    devolution=None,
    consolidation=None,
    market=None,
    political_vs_functional="Circuit geography already ≠ pure county for some functions",
    friction=["Counsel deserts", "Travel to specialty dockets", "Unclear who owns backlog"],
    blocker=None,
    confidence="MEDIUM",
    note="No new courts invented without capacity+accountability.",
)

put(
    "local_government",
    architecture="MUNICIPAL / LOCAL",
    structural_verb="NONE",
    current="Counties + municipalities + special districts — constitutional local democracy",
    proposed="KEEP local democratic institutions; apply per-function subsidiarity elsewhere without abolishing local government",
    geographic_levels=["COUNTY", "MUNICIPAL / LOCAL"],
    layers=layers("STATEWIDE enabling law", "LOCAL", "LOCAL"),
    government_role="RULEMAKER (local) + PROVIDER/PURCHASER",
    market_role="Local contracting under conflict rules",
    rights_floor="State/federal constitutional floors bind locals",
    capacity_requirement="Highly variable — drives shared services in other homes",
    regional_relationship="Optional interlocal agreements — not forced metro government",
    accountability_pathway="Local elections + state oversight where rights require",
    power_concentration_risk="LOW at institution type; HIGH in weak-oversight special districts",
    placement=tests(
        "Local variation OK within rights floors",
        "Capacity uneven — solve via shared services, not abolition",
        "Blanket consolidation unproven",
        "Proximity is the point of local government",
        "Spillovers handled per function, not by erasing locals",
        "KEEP institutional form; DEVOLVE/REGIONALIZE only on other homes",
    ),
    regionalization=None,
    devolution=None,
    consolidation={
        "duplication_shown": "Not statewide demonstrated as general rule",
        "functions_overlap": "Special districts sometimes",
        "transition_costs": "HIGH",
        "accountability": "Often worsens with forced metro mergers",
        "capability_risk": "Local knowledge loss",
        "citizen_friction": "May increase if remote",
        "result": "Do NOT consolidate local government as a class",
    },
    market=None,
    political_vs_functional="Political local units remain; functional networks overlay",
    friction=["Special-district opacity", "Interlocal complexity"],
    blocker=None,
    confidence="HIGH",
    note="RD-DEP-006 resolved: local democracy kept; functions tested separately.",
)

put(
    "housing",
    architecture="MULTI-LEVEL",
    structural_verb="DEVOLVE",
    current="Local zoning/permitting + state/federal finance overlays + housing authorities",
    proposed="STATE rights/anti-exclusion floors & finance rules; LOCAL land-use delivery; MARKET builders; NONPROFIT/HA for targeted stock",
    geographic_levels=["STATEWIDE", "MUNICIPAL / LOCAL", "MARKET / PRIVATE", "COOPERATIVE / NONPROFIT / INSTITUTIONAL"],
    layers=layers("STATEWIDE floors", "STATE/REGIONAL finance capacity", "LOCAL permitting + MARKET production"),
    government_role="RULEMAKER + REFEREE (+ limited PROVIDER/PURCHASER)",
    market_role="Primary production of housing",
    rights_floor="Fair housing / habitability; anti-exclusion where rights require",
    capacity_requirement="Local planning capacity uneven; state technical assistance",
    regional_relationship="Labor-market housing regions ≠ city borders",
    accountability_pathway="Local councils + state fair-housing enforcement",
    power_concentration_risk="MEDIUM if state both funds and micromanages all land use",
    placement=tests(
        "Exclusionary local rules can violate equal opportunity — state floor needed",
        "Local capacity for planning varies",
        "Statewide one-size zoning fails proximity test",
        "Local knowledge dominates siting",
        "Housing markets spill across municipal borders",
        "DEVOLVE delivery with STATE floors + MARKET production",
    ),
    regionalization=None,
    devolution={
        "local_competence": "Often yes for zoning/permitting",
        "rights_floor": "State/federal fair housing",
        "spillovers": "Manageable with regional planning coordination",
        "funding_follows": "Must — otherwise unfunded mandates",
        "citizen_accountability": "Local elections",
        "result": "DEVOLVE land-use delivery; do not devolve rights floors",
    },
    consolidation=None,
    market={
        "competition_works": "Yes if barriers managed",
        "customer_choice": "Yes",
        "barriers": "Zoning/capital/insurance",
        "externalities": "Neighborhood effects",
        "universal_access": "Floor needed for vulnerable households",
        "natural_monopoly": "No",
        "regulation_enough": "Mostly — public stock targeted",
        "result": "MARKET primary + public floors/targeted provision",
    },
    political_vs_functional="City limits ≠ metro housing markets",
    friction=["Permit delay", "Multiple agencies for assistance", "Long travel to jobs"],
    blocker=None,
    confidence="MEDIUM",
    note="Devolution with resources/authority — no unfunded subsidiarity.",
)

put(
    "land",
    architecture="MULTI-LEVEL",
    structural_verb="DEVOLVE",
    current="Local planning/zoning + county assessors + state lands/agencies",
    proposed="LOCAL primary land-use; STATE resource/constitutional floors; COUNTY assessment; state lands statewide",
    geographic_levels=["STATEWIDE", "COUNTY", "MUNICIPAL / LOCAL"],
    layers=layers("STATEWIDE floors", "COUNTY assessment / state lands", "LOCAL planning"),
    government_role="RULEMAKER + REFEREE",
    market_role="Private ownership dominant",
    rights_floor="Property rights + environmental/rights floors",
    capacity_requirement="Local planning + statewide cadastral integrity",
    regional_relationship="Watershed/ecosystem functional overlays",
    accountability_pathway="Local boards + courts + state agencies for state lands",
    power_concentration_risk="MEDIUM if assessment + zoning + enforcement fused opaquely",
    placement=tests(
        "Property rights need statewide legal floor",
        "Local planning capacity variable",
        "Central land-use bureau fails proximity",
        "Local knowledge critical",
        "Watersheds spill across borders",
        "DEVOLVE land-use; STATE floors; record functional ecology mismatch",
    ),
    regionalization=None,
    devolution={
        "local_competence": "Generally yes",
        "rights_floor": "Protected",
        "spillovers": "Watershed — manage via functional coordination",
        "funding_follows": "Assessment capacity needed",
        "citizen_accountability": "Local",
        "result": "DEVOLVE land-use authority within floors",
    },
    consolidation=None,
    market=None,
    political_vs_functional="Parcels local; watersheds regional",
    friction=["Assessment opacity", "Conflicting local/state rules"],
    blocker=None,
    confidence="MEDIUM",
    note="No statewide zoning bureau.",
)

put(
    "agriculture",
    architecture="MULTI-LEVEL",
    structural_verb="NONE",
    current="USDA + Arkansas Dept of Ag + local extension; private farms",
    proposed="KEEP multi-level: federal/state standards; extension/local delivery; MARKET farms; coops",
    geographic_levels=["STATEWIDE", "COUNTY", "MARKET / PRIVATE", "COOPERATIVE / NONPROFIT / INSTITUTIONAL"],
    layers=layers("STATE/FEDERAL", "EXTENSION / STATE", "MARKET + COOPS"),
    government_role="RULEMAKER + REFEREE (+ limited PROVIDER)",
    market_role="Primary production",
    rights_floor="Food safety / labor / environmental floors",
    capacity_requirement="Extension and inspection capacity",
    regional_relationship="Commodity and watershed regions",
    accountability_pathway="Elected Ag structures + federal rules + markets",
    power_concentration_risk="LOW-MEDIUM — watch checkoff/incumbent capture",
    placement=tests(
        "Safety floors statewide",
        "Extension capacity county-aware",
        "Duplicate inspection wasteful",
        "Local agronomy knowledge matters",
        "Pests/water spill across farms/counties",
        "KEEP multi-level; no forced regional government",
    ),
    regionalization=None,
    devolution=None,
    consolidation=None,
    market={
        "competition_works": "Yes in many commodities",
        "customer_choice": "Yes",
        "barriers": "Capital/land",
        "externalities": "Environment",
        "universal_access": "Food security floor separate",
        "natural_monopoly": "No",
        "regulation_enough": "Mostly",
        "result": "MARKET primary",
    },
    political_vs_functional="County extension ≠ commodity regions",
    friction=["Program navigation for small producers"],
    blocker=None,
    confidence="HIGH",
    note="F=KEEP carries into institutional KEEP posture.",
)

put(
    "energy",
    architecture="MULTI-LEVEL",
    structural_verb="REFORM_INSTITUTION",
    current="PSC regulation + utilities (IOU/coops/munis) + state energy office",
    proposed="STATE referee/standards; MARKET/PRIVATE + COOP/MUNI delivery; regional grid coordination",
    geographic_levels=["STATEWIDE", "REGIONAL", "MARKET / PRIVATE", "COOPERATIVE / NONPROFIT / INSTITUTIONAL", "MUNICIPAL / LOCAL"],
    layers=layers("STATEWIDE (PSC/standards)", "REGIONAL grid", "UTILITY/COOP/MUNI delivery"),
    government_role="RULEMAKER + REFEREE",
    market_role="IOUs compete where markets allow; coops/munis institutional",
    rights_floor="Universal service / affordability floors via regulation",
    capacity_requirement="Grid planning beyond any single city",
    regional_relationship="Transmission / reliability regions",
    accountability_pathway="PSC + elected officials + coop member governance",
    power_concentration_risk="HIGH if utility + regulator capture — strengthen referee independence",
    placement=tests(
        "Service floors statewide",
        "Cities cannot run transmission alone",
        "Duplicate generation planning wasteful at tiny scale",
        "Local distribution knowledge matters",
        "Grid spills statewide/regionally",
        "MULTI-LEVEL market/coop delivery + state referee",
    ),
    regionalization={
        "shared_demand": True,
        "local_inadequate": True,
        "regional_improves": True,
        "accountability_clear": "Via PSC + RTO/grid bodies with public reporting",
        "result": "Regional grid coordination — not a new general-purpose regional government",
    },
    devolution=None,
    consolidation=None,
    market={
        "competition_works": "Partial (generation more than wires)",
        "customer_choice": "Limited for wires",
        "barriers": "High",
        "externalities": "High",
        "universal_access": True,
        "natural_monopoly": "Distribution/transmission yes",
        "regulation_enough": "Yes for natural monopoly wires",
        "result": "Regulate monopoly segments; market where competition real",
    },
    political_vs_functional="Franchise territories ≠ reliability regions",
    friction=["Bill complexity", "Outage accountability unclear"],
    blocker=None,
    confidence="MEDIUM",
    note="Essential ≠ publicly owned.",
)

put(
    "water",
    architecture="MULTI-LEVEL",
    structural_verb="REGIONALIZE",
    current="Local utilities + districts + state quality/rights agencies; watersheds cross borders",
    proposed="STATE quality/rights standards; REGIONAL systems where capacity fails; LOCAL delivery where competent",
    geographic_levels=["STATEWIDE", "REGIONAL", "MUNICIPAL / LOCAL"],
    layers=layers("STATEWIDE quality/rights", "REGIONAL shared plants/systems", "LOCAL distribution"),
    government_role="RULEMAKER + REFEREE + PROVIDER/PURCHASER (often local)",
    market_role="Limited private operators under franchise/regulation",
    rights_floor="Safe drinking water / sanitation floors",
    capacity_requirement="Many small systems lack technical/fiscal capacity",
    regional_relationship="Watersheds and shared treatment — functional geography",
    accountability_pathway="Local utility boards + state primacy agency + public quality reports",
    power_concentration_risk="MEDIUM — regional authorities need visible local representation",
    placement=tests(
        "Safe water rights cannot vary below floor",
        "Many localities fail capacity alone",
        "Duplicate tiny plants costly/unsafe",
        "Local distribution knowledge matters",
        "Watershed decisions spill heavily",
        "REGIONALIZE shared capacity; LOCAL delivery where fit",
    ),
    regionalization={
        "shared_demand": True,
        "local_inadequate": True,
        "regional_improves": True,
        "accountability_clear": "Must include local representation + quality dashboards",
        "result": "REGIONALIZE where capacity/spillover tests fail locally",
    },
    devolution={
        "local_competence": "Sometimes",
        "rights_floor": "State/federal SDWA",
        "spillovers": "Often not limited",
        "funding_follows": "Required for any local mandate",
        "citizen_accountability": "Local boards when competent",
        "result": "Devolve only when capacity+spillover OK",
    },
    consolidation=None,
    market={
        "competition_works": "Rare for pipes",
        "customer_choice": "Low",
        "barriers": "High",
        "externalities": "High",
        "universal_access": True,
        "natural_monopoly": True,
        "regulation_enough": "With public/regulated provision",
        "result": "Natural monopoly — public/regulated institutional forms",
    },
    political_vs_functional="City limits ≠ watersheds",
    friction=["Tiny system failure risk", "Rate shock", "Cross-border disputes"],
    blocker=None,
    confidence="MEDIUM",
    note="Regionalize systems — not redraw counties.",
)

put(
    "transportation",
    architecture="MULTI-LEVEL",
    structural_verb="REGIONALIZE",
    current="ARDOT + local streets + MPOs/transit agencies",
    proposed="STATE highways/standards; REGIONAL corridors/MPOs/transit; LOCAL streets",
    geographic_levels=["STATEWIDE", "REGIONAL", "MUNICIPAL / LOCAL"],
    layers=layers("STATEWIDE design/safety standards", "REGIONAL corridor/MPO planning", "LOCAL streets + STATE highways"),
    government_role="RULEMAKER + PROVIDER/PURCHASER",
    market_role="Construction contractors; freight private",
    rights_floor="Safety and reasonable access floors",
    capacity_requirement="Corridor planning exceeds single city",
    regional_relationship="Freight/commute corridors — functional geography",
    accountability_pathway="Highway Commission/legislature + local councils + MPO boards",
    power_concentration_risk="MEDIUM — keep project selection transparent",
    placement=tests(
        "Safety standards statewide",
        "Locals cannot fund interstate alone",
        "Duplicate corridor planning wasteful",
        "Local streets need proximity",
        "Traffic/freight spill massively",
        "REGIONALIZE corridors; MULTI-LEVEL overall",
    ),
    regionalization={
        "shared_demand": True,
        "local_inadequate": True,
        "regional_improves": True,
        "accountability_clear": "MPO/commission public process required",
        "result": "REGIONALIZE corridor planning/transit where shared demand exists",
    },
    devolution=None,
    consolidation=None,
    market=None,
    political_vs_functional="County roads ≠ commute sheds",
    friction=["Project opacity", "Long travel for services", "Transit gaps"],
    blocker=None,
    confidence="HIGH",
    note="No county logistics-economy assignment.",
)

put(
    "digital_infrastructure",
    architecture="MULTI-LEVEL",
    structural_verb="REGIONALIZE",
    current="Private ISPs + state broadband programs + local/coop builds",
    proposed="STATE standards/rights-to-connect floors; REGIONAL middle-mile; MARKET/COOP last-mile; LOCAL permitting",
    geographic_levels=["STATEWIDE", "REGIONAL", "MARKET / PRIVATE", "COOPERATIVE / NONPROFIT / INSTITUTIONAL", "MUNICIPAL / LOCAL"],
    layers=layers("STATEWIDE", "REGIONAL middle-mile", "MARKET/COOP last-mile"),
    government_role="RULEMAKER + REFEREE (+ limited INVESTOR/OWNER under eight gates)",
    market_role="Primary last-mile where competition works",
    rights_floor="Access floors for civic/economic participation",
    capacity_requirement="Middle-mile scale exceeds many towns",
    regional_relationship="Middle-mile routes — functional",
    accountability_pathway="State broadband office + PSC-like referee + local permitting",
    power_concentration_risk="MEDIUM if state becomes both funder and incumbent operator without exit",
    placement=tests(
        "Access inequality is rights-adjacent",
        "Tiny towns lack middle-mile capital",
        "Duplicate middle-mile wasteful",
        "Local permitting/needs knowledge matters",
        "Networks spill across borders",
        "REGIONALIZE middle-mile; MARKET/COOP last-mile",
    ),
    regionalization={
        "shared_demand": True,
        "local_inadequate": True,
        "regional_improves": True,
        "accountability_clear": "State program + public maps",
        "result": "REGIONALIZE middle-mile capacity",
    },
    devolution=None,
    consolidation=None,
    market={
        "competition_works": "Partial",
        "customer_choice": "Often weak rural",
        "barriers": "High capital",
        "externalities": "High",
        "universal_access": True,
        "natural_monopoly": "Partial (last-mile)",
        "regulation_enough": "Not always — may need public/coop build under eight gates",
        "result": "Market-first; public/coop where competition fails",
    },
    political_vs_functional="City limits ≠ fiber routes",
    friction=["Coverage gaps", "Permit delays", "Duplicate public builds"],
    blocker=None,
    confidence="MEDIUM",
    note="Investor/Owner only under eight gates.",
)

put(
    "labor",
    architecture="MULTI-LEVEL",
    structural_verb="REFORM_INSTITUTION",
    current="State labor/workforce agencies + local boards + federal programs",
    proposed="STATE standards; REGIONAL workforce boards for labor-market geography; LOCAL delivery partners; MARKET employers",
    geographic_levels=["STATEWIDE", "REGIONAL", "MARKET / PRIVATE"],
    layers=layers("STATEWIDE", "REGIONAL workforce areas", "LOCAL providers + employers"),
    government_role="RULEMAKER + REFEREE + PROVIDER/PURCHASER",
    market_role="Employers primary; training markets mixed",
    rights_floor="Wage/hour/safety rights statewide",
    capacity_requirement="Workforce regions match commuting",
    regional_relationship="Workforce investment areas — functional",
    accountability_pathway="State agency + regional boards with employer/labor/public seats",
    power_concentration_risk="MEDIUM — incumbent training capture",
    placement=tests(
        "Worker rights statewide",
        "Local boards need regional labor-market scale",
        "Duplicate tiny workforce shops weak",
        "Employer proximity matters",
        "Commuting spills across counties",
        "MULTI-LEVEL with regional workforce geography",
    ),
    regionalization={
        "shared_demand": True,
        "local_inadequate": True,
        "regional_improves": True,
        "accountability_clear": "Workforce board composition + outcomes",
        "result": "Use regional workforce geography; not new counties",
    },
    devolution=None,
    consolidation=None,
    market=None,
    political_vs_functional="County ≠ commute shed",
    friction=["Program maze", "Multiple eligibility systems"],
    blocker=None,
    confidence="MEDIUM",
    note="No county 'workforce future' assignment.",
)

put(
    "capital",
    architecture="MULTI-LEVEL",
    structural_verb="REFORM_INSTITUTION",
    current="Private capital markets + limited state/CDFIs/economic tools",
    proposed="MARKET primary; STATE referee/standards; limited public/CDFI under eight gates; no public bank invented here",
    geographic_levels=["STATEWIDE", "MARKET / PRIVATE", "COOPERATIVE / NONPROFIT / INSTITUTIONAL"],
    layers=layers("STATEWIDE referee", "MARKET + CDFI", "MARKET allocation"),
    government_role="RULEMAKER + REFEREE (+ INVESTOR/OWNER only under eight gates)",
    market_role="Primary capital allocation",
    rights_floor="Anti-fraud / fair access floors",
    capacity_requirement="Statewide securities/banking interface",
    regional_relationship="Capital flows ignore county lines",
    accountability_pathway="Regulators + disclosure + eight-gate public instruments",
    power_concentration_risk="HIGH if state becomes both referee and large owner",
    placement=tests(
        "Investor protection floors statewide",
        "State lacks capacity to replace markets",
        "Duplicate public funds without gates is waste",
        "Local knowledge via CDFIs useful",
        "Capital flight/spillovers statewide",
        "MARKET primary; public capital exceptional",
    ),
    regionalization=None,
    devolution=None,
    consolidation=None,
    market={
        "competition_works": "Yes when fair",
        "customer_choice": "Yes",
        "barriers": "Information/credit deserts",
        "externalities": "Systemic risk",
        "universal_access": "Credit access floor limited",
        "natural_monopoly": "No",
        "regulation_enough": "Usually",
        "result": "MARKET / PRIVATE primary",
    },
    political_vs_functional="Deal geography ≠ county politics",
    friction=["Opaque incentive capital (UNK-INST-004)"],
    blocker="UNK-INST-004 for tool-level later",
    confidence="MEDIUM",
    note="No public bank / funding architecture (V2.3).",
)

put(
    "banking",
    architecture="MULTI-LEVEL",
    structural_verb="NONE",
    current="Federal/state dual banking charter + private banks/credit unions",
    proposed="KEEP dual system; STATE referee within federal frame; MARKET/COOP delivery",
    geographic_levels=["STATEWIDE", "MARKET / PRIVATE", "COOPERATIVE / NONPROFIT / INSTITUTIONAL"],
    layers=layers("FEDERAL+STATE", "REGULATORS", "BANKS/CREDIT UNIONS"),
    government_role="RULEMAKER + REFEREE",
    market_role="Primary",
    rights_floor="Consumer protection / fair lending floors",
    capacity_requirement="Exam capacity",
    regional_relationship="Branch networks cross counties",
    accountability_pathway="Banking department + federal regulators + markets",
    power_concentration_risk="MEDIUM — capture of examiners",
    placement=tests(
        "Consumer rights statewide",
        "State exam capacity exists in dual system",
        "State-only banking fails scale",
        "Local credit knowledge via community banks/CUs",
        "Runs/spillovers systemic",
        "KEEP institutional dual+market form",
    ),
    regionalization=None,
    devolution=None,
    consolidation=None,
    market={
        "competition_works": "Yes",
        "customer_choice": "Yes",
        "barriers": "Charter/capital",
        "externalities": "Systemic",
        "universal_access": "Partial deserts",
        "natural_monopoly": "No",
        "regulation_enough": "Yes",
        "result": "MARKET / COOP primary",
    },
    political_vs_functional="Branches ≠ counties",
    friction=["Credit deserts in some places"],
    blocker=None,
    confidence="HIGH",
    note="F=KEEP.",
)

put(
    "business_formation",
    architecture="MULTI-LEVEL",
    structural_verb="CONSOLIDATE",
    current="Secretary of State + licenses across agencies + local permits",
    proposed="STATE one-door formation/standards; LOCAL permits remain; CONSOLIDATE redundant license portals",
    geographic_levels=["STATEWIDE", "MUNICIPAL / LOCAL"],
    layers=layers("STATEWIDE formation law", "STATE shared portal", "LOCAL permits + STATE licenses"),
    government_role="RULEMAKER + REFEREE",
    market_role="Businesses private",
    rights_floor="Equal formation rights; non-arbitrary licensing",
    capacity_requirement="Shared digital portal",
    regional_relationship="None primary",
    accountability_pathway="Secretary of State + licensing boards + courts",
    power_concentration_risk="LOW-MEDIUM if one portal also becomes gatekeeper without appeal",
    placement=tests(
        "Equal formation rights statewide",
        "Agencies duplicate intake",
        "Duplicate licenses raise cost",
        "Local permits need proximity",
        "Markets statewide",
        "CONSOLIDATE portals; keep necessary specialized licenses",
    ),
    regionalization=None,
    devolution=None,
    consolidation={
        "duplication_shown": "Multiple agency intakes for same business",
        "functions_overlap": "Intake/identity yes; some licenses distinct",
        "transition_costs": "MEDIUM",
        "accountability": "Improves with clear board owners behind portal",
        "capability_risk": "Low if specialization preserved",
        "citizen_friction": "Should decline",
        "result": "CONSOLIDATE front door; not abolish specialized boards blindly",
    },
    market=None,
    political_vs_functional="License geography statewide; local permits municipal",
    friction=["Duplicate applications", "Duplicate data entry", "Conflicting standards"],
    blocker=None,
    confidence="HIGH",
    note="Feeds V2.2.3 citizen friction work.",
)

put(
    "procurement",
    architecture="MULTI-LEVEL",
    structural_verb="CONSOLIDATE",
    current="OSP + agency purchasing + local procurement rules",
    proposed="STATE shared procurement capacity/standards; agencies buy within; LOCAL keeps local buys; CONSOLIDATE duplicate statewide purchasing capability",
    geographic_levels=["STATEWIDE", "MUNICIPAL / LOCAL"],
    layers=layers("STATEWIDE rules", "SHARED STATE PROCUREMENT", "AGENCY + LOCAL execution"),
    government_role="RULEMAKER + REFEREE + PROVIDER/PURCHASER",
    market_role="Vendors compete under rules",
    rights_floor="Fair competition / anti-corruption",
    capacity_requirement="Specialized buyers beat 50 amateur shops",
    regional_relationship="Optional cooperative purchasing",
    accountability_pathway="OSP + audits + protest procedures",
    power_concentration_risk="MEDIUM — central buyer capture; keep protest/appeal",
    placement=tests(
        "Fair competition floors statewide",
        "Small agencies lack buyer expertise",
        "Duplicate purchasing raises price",
        "Local knowledge for local buys",
        "Vendor markets statewide",
        "CONSOLIDATE specialized purchasing capacity",
    ),
    regionalization=None,
    devolution=None,
    consolidation={
        "duplication_shown": "Multiple agencies buying same capability",
        "functions_overlap": "Yes for common goods/services",
        "transition_costs": "MEDIUM",
        "accountability": "Improves with transparency",
        "capability_risk": "Preserve specialized agency buyers where needed",
        "citizen_friction": "Indirect — lower waste",
        "result": "CONSOLIDATE common procurement capacity",
    },
    market={
        "competition_works": "Yes under fair rules",
        "customer_choice": "Government as buyer",
        "barriers": "Incumbent lock-in",
        "externalities": "Corruption risk",
        "universal_access": "N/A",
        "natural_monopoly": "No",
        "regulation_enough": "Procurement law is the referee",
        "result": "Market supply + public purchasing discipline",
    },
    political_vs_functional="Buyers statewide; delivery local",
    friction=["Multiple agencies purchasing same capability", "Protest opacity"],
    blocker=None,
    confidence="HIGH",
    note="Consolidation burden met for common buys.",
)

put(
    "economic_development",
    architecture="MULTI-LEVEL",
    structural_verb="REGIONALIZE",
    current="AEDC + local ED orgs + incentive stack; deal opacity (UNK-INST-004)",
    proposed="STATE standards/disclosure/referee; REGIONAL ED partnerships for labor-market geography; LOCAL hospitality/site work; MARKET firms",
    geographic_levels=["STATEWIDE", "REGIONAL", "MUNICIPAL / LOCAL", "MARKET / PRIVATE"],
    layers=layers("STATEWIDE disclosure & rules", "REGIONAL partnerships", "LOCAL + MARKET"),
    government_role="RULEMAKER + REFEREE (+ INVESTOR/OWNER only under eight gates)",
    market_role="Firms primary",
    rights_floor="Transparent public deals; equal treatment rules",
    capacity_requirement="Deal analysis capacity scarce locally",
    regional_relationship="Labor/site regions — functional; NOT county futures",
    accountability_pathway="Public deal registry + legislature + local elected",
    power_concentration_risk="HIGH — incentive capture; eight gates mandatory",
    placement=tests(
        "Equal treatment / disclosure statewide",
        "Tiny towns cannot analyze mega-deals alone",
        "Duplicate incentives race-to-bottom",
        "Local site knowledge matters",
        "Firm location spills across counties",
        "REGIONALIZE partnership capacity; STATE referee",
    ),
    regionalization={
        "shared_demand": True,
        "local_inadequate": True,
        "regional_improves": True,
        "accountability_clear": "Only with public registry + elected oversight",
        "result": "REGIONALIZE capacity/partnerships — not assign county economic futures",
    },
    devolution=None,
    consolidation=None,
    market=None,
    political_vs_functional="County ED orgs ≠ commute/site regions",
    friction=["Opaque deals", "Duplicate local ED pitches"],
    blocker="UNK-INST-004",
    confidence="MEDIUM",
    note="Institutional geography only — Opportunity Portfolios OFF.",
)

put(
    "pensions",
    architecture="STATEWIDE",
    structural_verb="NONE",
    current="Statewide retirement systems (multiple plans) — schedules UNKNOWN (UNK-FISC-004)",
    proposed="Institutional responsibility remains STATEWIDE systems/trustees; deep redesign HOLD until schedules known",
    geographic_levels=["STATEWIDE"],
    layers=layers("STATEWIDE statute", "STATEWIDE systems", "STATEWIDE administration"),
    government_role="RULEMAKER + PROVIDER/PURCHASER (fiduciary)",
    market_role="Asset managers under fiduciary rules",
    rights_floor="Member rights / fiduciary duty",
    capacity_requirement="Actuarial/investment capacity statewide",
    regional_relationship="None",
    accountability_pathway="Boards/trustees + legislature + disclosure; deepen after UNK-FISC-004",
    power_concentration_risk="HIGH — funding + investment + rulemaking; keep independent fiduciaries",
    placement=tests(
        "Member rights statewide",
        "Local systems cannot all run sophisticated portfolios",
        "Fragmented tiny plans often worse",
        "Proximity low for investment",
        "Fiscal spillovers statewide",
        "Place STATEWIDE; HOLD deep reform pending schedules",
    ),
    regionalization=None,
    devolution=None,
    consolidation=None,
    market=None,
    political_vs_functional="Aligned statewide",
    friction=["Schedule opacity to citizens"],
    blocker="UNK-FISC-004",
    confidence="LOW",
    note="HOLD-COMPLETE: enough to place institution statewide; not enough to redesign funding (V2.3).",
    hold_complete=True,
)

put(
    "public_assets",
    architecture="MULTI-LEVEL",
    structural_verb="REFORM_INSTITUTION",
    current="State lands/buildings + local assets; incomplete inventories",
    proposed="STATEWIDE inventory standards; STATE/LOCAL stewardship by owner; MARKET leases under eight gates",
    geographic_levels=["STATEWIDE", "COUNTY", "MUNICIPAL / LOCAL"],
    layers=layers("STATEWIDE inventory/standards", "OWNER AGENCY", "OWNER + MARKET lease"),
    government_role="RULEMAKER + INVESTOR/OWNER (existing assets) + REFEREE",
    market_role="Lessees/operators under rules",
    rights_floor="Public trust / transparency",
    capacity_requirement="Asset registry capacity",
    regional_relationship="Some assets serve regions",
    accountability_pathway="Inventories + audits + surplus rules",
    power_concentration_risk="MEDIUM if silent privatization without process",
    placement=tests(
        "Public trust floors statewide",
        "Local asset mgmt variable",
        "Duplicate unused assets costly",
        "Local use knowledge matters",
        "Some assets spill regionally",
        "MULTI-LEVEL stewardship with statewide inventory standard",
    ),
    regionalization=None,
    devolution=None,
    consolidation=None,
    market=None,
    political_vs_functional="Ownership political; use catchment functional",
    friction=["Unknown asset inventory", "Surplus opacity"],
    blocker=None,
    confidence="MEDIUM",
    note="No fire-sale. Inventory first.",
)

put(
    "natural_resources",
    architecture="MULTI-LEVEL",
    structural_verb="REGIONALIZE",
    current="State resource agencies + federal + local land-use interface",
    proposed="STATE stewardship standards; REGIONAL watershed/resource units; LOCAL land-use interface; MARKET extraction under referee",
    geographic_levels=["STATEWIDE", "REGIONAL", "MARKET / PRIVATE"],
    layers=layers("STATEWIDE", "REGIONAL watershed/resource", "MARKET operators + LOCAL interface"),
    government_role="RULEMAKER + REFEREE (+ OWNER of public resources)",
    market_role="Extraction/recreation markets under rules",
    rights_floor="Public trust / environmental floors",
    capacity_requirement="Watershed science exceeds counties",
    regional_relationship="Watersheds/forests — functional geography",
    accountability_pathway="Agencies + public comment + courts",
    power_concentration_risk="MEDIUM — extractive capture",
    placement=tests(
        "Public trust statewide",
        "County science capacity limited",
        "Duplicate monitoring wasteful",
        "Local use knowledge matters",
        "Watersheds spill heavily",
        "REGIONALIZE resource geography under state standards",
    ),
    regionalization={
        "shared_demand": True,
        "local_inadequate": True,
        "regional_improves": True,
        "accountability_clear": "State agency + regional advisory with public process",
        "result": "REGIONALIZE management units along functional resource geography",
    },
    devolution=None,
    consolidation=None,
    market=None,
    political_vs_functional="County lines ≠ watersheds",
    friction=["Conflicting local/state permits"],
    blocker=None,
    confidence="MEDIUM",
    note="Functional resource atlas layer.",
)

put(
    "federal_dependency",
    architecture="STATEWIDE",
    structural_verb="REFORM_INSTITUTION",
    current="Diffuse across agencies; all-funds map incomplete (UNK-FISC-001)",
    proposed="STATEWIDE coordination/visibility institution for federal funds; program delivery stays in mission homes",
    geographic_levels=["STATEWIDE"],
    layers=layers("STATEWIDE visibility", "STATEWIDE coordination", "AGENCY program delivery"),
    government_role="RULEMAKER + PROVIDER/PURCHASER (pass-through)",
    market_role="Subrecipients sometimes private/nonprofit",
    rights_floor="Equal program access under federal/state rules",
    capacity_requirement="All-funds analytic capacity",
    regional_relationship="None as primary",
    accountability_pathway="Legislature + public all-funds reports",
    power_concentration_risk="MEDIUM if coordinator becomes silent appropriator",
    placement=tests(
        "Statewide fiscal truth needed",
        "Agencies alone hide cross-cuts",
        "Duplicate grant shops wasteful",
        "Proximity low for fiscal map",
        "Federal rules spill statewide",
        "STATEWIDE visibility home; delivery remains distributed",
    ),
    regionalization=None,
    devolution=None,
    consolidation=None,
    market=None,
    political_vs_functional="Federal program geographies overlay state",
    friction=["Unknown federal share by function"],
    blocker="UNK-FISC-001",
    confidence="MEDIUM",
    note="Institutional placement for visibility — not funding redesign.",
)

put(
    "household_economics",
    architecture="MULTI-LEVEL",
    structural_verb="REFORM_INSTITUTION",
    current="No single household-success institution; metrics fragmented",
    proposed="STATEWIDE measurement/standards home; LOCAL/AGENCY delivery unchanged; household lens overlays all",
    geographic_levels=["STATEWIDE", "COUNTY"],
    layers=layers("STATEWIDE metrics", "STATEWIDE analytic capacity", "ALL agencies + LOCAL"),
    government_role="RULEMAKER (success definition) + PROVIDER/PURCHASER (measurement)",
    market_role="Does not replace markets",
    rights_floor="Honest public statistics",
    capacity_requirement="Dashboard/statistical capacity",
    regional_relationship="County publication for truth",
    accountability_pathway="Public dashboards + legislature",
    power_concentration_risk="LOW if measurement independent of program PR",
    placement=tests(
        "Equal statistical integrity",
        "Need statewide capacity",
        "Duplicate vanity metrics wasteful",
        "County publication needed",
        "Policy effects spill statewide",
        "STATEWIDE measurement institution; multi-level use",
    ),
    regionalization=None,
    devolution=None,
    consolidation=None,
    market=None,
    political_vs_functional="Household life crosses agency borders",
    friction=["Agency optics vs household outcomes"],
    blocker=None,
    confidence="HIGH",
    note="Measurement home — not a new benefits agency.",
)

put(
    "demographics",
    architecture="STATEWIDE",
    structural_verb="NONE",
    current="State demographic/statistical capacity + federal Census",
    proposed="KEEP statewide measurement; publish county truth",
    geographic_levels=["STATEWIDE", "COUNTY"],
    layers=layers("STATEWIDE", "STATEWIDE", "PUBLICATION STATEWIDE/COUNTY"),
    government_role="PROVIDER/PURCHASER (measurement)",
    market_role="Neutral",
    rights_floor="Privacy floors on microdata",
    capacity_requirement="Statistical office capacity",
    regional_relationship="None",
    accountability_pathway="Method transparency + nonpartisan norms",
    power_concentration_risk="MEDIUM if used as allocation weapon without rules",
    placement=tests(
        "Measurement integrity statewide",
        "Capacity exists centrally",
        "Duplicate demography offices wasteful",
        "County tables need local grain",
        "Statewide planning uses it",
        "STATEWIDE KEEP",
    ),
    regionalization=None,
    devolution=None,
    consolidation=None,
    market=None,
    political_vs_functional="Aligned",
    friction=["Averages hide county decline"],
    blocker=None,
    confidence="HIGH",
    note="F=KEEP.",
)

put(
    "geographic_disparities",
    architecture="MULTI-LEVEL",
    structural_verb="REFORM_INSTITUTION",
    current="Cross-cutting lens; no single owning agency; GEO twins exist",
    proposed="STATEWIDE disparity measurement/standards; FUNCTIONAL overlays per atlas; LOCAL response within floors — no rankings/futures",
    geographic_levels=["STATEWIDE", "COUNTY", "REGIONAL"],
    layers=layers("STATEWIDE", "STATEWIDE GEO capacity", "PER-FUNCTION LOCAL/REGIONAL"),
    government_role="RULEMAKER (measurement) + REFEREE",
    market_role="Neutral",
    rights_floor="Equal rights despite place",
    capacity_requirement="75× field capacity already locked in V2-GEO-001",
    regional_relationship="Disparity often regional patterns",
    accountability_pathway="Public county twins + legislature",
    power_concentration_risk="HIGH if used to pre-assign county futures — FORBIDDEN now",
    placement=tests(
        "Equal rights across places",
        "Need statewide GEO spine",
        "One disparity office without functions fails",
        "Local context essential",
        "Disparities spill regionally",
        "MULTI-LEVEL lens; Opportunity Portfolios OFF",
    ),
    regionalization=None,
    devolution=None,
    consolidation=None,
    market=None,
    political_vs_functional="Core product of this pass — record mismatches",
    friction=["Statewide averages erase place"],
    blocker=None,
    confidence="HIGH",
    note="Uses V2-GEO-001; no county future assignment.",
)

put(
    "civic_institutions",
    architecture="MULTI-LEVEL",
    structural_verb="DEVOLVE",
    current="Libraries, nonprofits, associations — mixed public/private",
    proposed="LOCAL/COOP/NONPROFIT primary; STATE enabling/funding floors where justified; not a state ministry of civic life",
    geographic_levels=["MUNICIPAL / LOCAL", "COOPERATIVE / NONPROFIT / INSTITUTIONAL", "STATEWIDE"],
    layers=layers("STATEWIDE enabling", "LOCAL/NONPROFIT", "LOCAL/NONPROFIT"),
    government_role="RULEMAKER (enabling) + limited PROVIDER/PURCHASER",
    market_role="Associations private",
    rights_floor="Association/speech rights",
    capacity_requirement="Local variation expected",
    regional_relationship="Some civic networks regional",
    accountability_pathway="Local boards + nonprofit governance + donors/members",
    power_concentration_risk="LOW unless state captures civic space",
    placement=tests(
        "Speech/association rights statewide",
        "State cannot run civic life",
        "Central civic bureaucracy fails",
        "Proximity is the point",
        "Spillovers limited",
        "DEVOLVE to local/nonprofit institutional forms",
    ),
    regionalization=None,
    devolution={
        "local_competence": True,
        "rights_floor": "Protected",
        "spillovers": "Limited",
        "funding_follows": "If state funds, clear contracts",
        "citizen_accountability": "Local/member",
        "result": "DEVOLVE",
    },
    consolidation=None,
    market=None,
    political_vs_functional="Civic life local",
    friction=["Grant navigation for small nonprofits"],
    blocker=None,
    confidence="HIGH",
    note="Do not nationalize civil society.",
)

put(
    "elections",
    architecture="MULTI-LEVEL",
    structural_verb="REFORM_INSTITUTION",
    current="State election board/secretary + county clerks",
    proposed="STATEWIDE standards/security; COUNTY administration; uniform rights floor",
    geographic_levels=["STATEWIDE", "COUNTY"],
    layers=layers("STATEWIDE", "STATEWIDE security/support", "COUNTY clerks"),
    government_role="RULEMAKER + REFEREE + PROVIDER/PURCHASER",
    market_role="Vendors for equipment under strict rules",
    rights_floor="Equal voting rights — non-negotiable",
    capacity_requirement="County admin + state security",
    regional_relationship="None primary",
    accountability_pathway="Elected clerks + state board + courts",
    power_concentration_risk="HIGH — must split certification/rulemaking/administration checks",
    placement=tests(
        "Yes — rights cannot vary below floor",
        "Counties administer; state supports",
        "Fifty election codes wasteful",
        "Local admin knowledge matters",
        "Statewide contests spill",
        "MULTI-LEVEL: state standards + county delivery",
    ),
    regionalization=None,
    devolution=None,
    consolidation=None,
    market=None,
    political_vs_functional="Aligned mostly to counties",
    friction=["Equipment vendor opacity", "Provisional ballot confusion"],
    blocker=None,
    confidence="HIGH",
    note="Rights floor dominates.",
)

put(
    "direct_democracy",
    architecture="STATEWIDE",
    structural_verb="NONE",
    current="Statewide initiative/referendum pathways",
    proposed="KEEP statewide institutional pathway; clarity reforms possible later without relocating",
    geographic_levels=["STATEWIDE"],
    layers=layers("STATEWIDE", "STATEWIDE", "STATEWIDE voters"),
    government_role="RULEMAKER (process)",
    market_role="Petition industry private — referee signatures",
    rights_floor="Petition/vote rights",
    capacity_requirement="Ballot title/process capacity",
    regional_relationship="None",
    accountability_pathway="Voters + courts",
    power_concentration_risk="MEDIUM — ballot title gatekeeping",
    placement=tests(
        "Statewide franchise",
        "Central process capacity",
        "Local initiative separate topic",
        "Proximity via petition gathering",
        "Laws affect all",
        "STATEWIDE KEEP",
    ),
    regionalization=None,
    devolution=None,
    consolidation=None,
    market=None,
    political_vs_functional="Aligned",
    friction=["Signature process complexity"],
    blocker=None,
    confidence="HIGH",
    note="F=KEEP.",
)

put(
    "administrative_power",
    architecture="MULTI-LEVEL",
    structural_verb="REFORM_INSTITUTION",
    current="APA + agency discretion + emergency powers overlap",
    proposed="STATEWIDE APA/due-process floors; AGENCY execution; independent appeal; LOCAL admin where local functions",
    geographic_levels=["STATEWIDE", "MUNICIPAL / LOCAL"],
    layers=layers("STATEWIDE APA", "AGENCY", "AGENCY + APPEAL BODY"),
    government_role="RULEMAKER + REFEREE",
    market_role="None",
    rights_floor="Digital Due Process / hearing rights",
    capacity_requirement="Independent hearing capacity",
    regional_relationship="Field offices regional for access",
    accountability_pathway="APA + independent ALJ/appeal + courts + legislature oversight",
    power_concentration_risk="HIGH — split rulemaking, enforcement, appeal",
    placement=tests(
        "Due process statewide",
        "Agencies need capacity; citizens need independent appeal",
        "Duplicate opaque procedures",
        "Local admin for local functions",
        "Rules spill statewide",
        "MULTI-LEVEL with mandatory power split",
    ),
    regionalization=None,
    devolution=None,
    consolidation=None,
    market=None,
    political_vs_functional="Agency reach statewide",
    friction=["Unclear appeal", "Unnecessary handoffs"],
    blocker=None,
    confidence="HIGH",
    note="Role Conflict Test → institutional architecture.",
)

put(
    "public_data",
    architecture="MULTI-LEVEL",
    structural_verb="CONSOLIDATE",
    current="Fragmented agency datasets; incomplete open data",
    proposed="STATEWIDE data standards & shared platform capacity; agencies remain stewards of domain data; CONSOLIDATE duplicate platforms",
    geographic_levels=["STATEWIDE"],
    layers=layers("STATEWIDE standards", "SHARED DATA PLATFORM", "AGENCY stewards"),
    government_role="RULEMAKER + PROVIDER/PURCHASER",
    market_role="Vendors under open standards — avoid lock-in",
    rights_floor="Privacy + public records floors",
    capacity_requirement="Shared platform + domain stewards",
    regional_relationship="None primary",
    accountability_pathway="CIO/data office + public records + audits",
    power_concentration_risk="HIGH if one office both hides and publishes — split transparency mandate",
    placement=tests(
        "Equal access to public data",
        "Agencies lack shared platform capacity",
        "Duplicate warehouses costly",
        "Domain expertise stays in agencies",
        "Statewide reuse",
        "CONSOLIDATE platforms; keep domain stewardship",
    ),
    regionalization=None,
    devolution=None,
    consolidation={
        "duplication_shown": "Multiple warehouses/portals",
        "functions_overlap": "Platform yes; domain semantics no",
        "transition_costs": "MEDIUM-HIGH",
        "accountability": "Improves with open standards",
        "capability_risk": "Preserve domain stewards",
        "citizen_friction": "Should decline",
        "result": "CONSOLIDATE shared data platform capacity",
    },
    market=None,
    political_vs_functional="Data about places ≠ owned by places",
    friction=["Duplicate data entry", "Conflicting standards"],
    blocker=None,
    confidence="HIGH",
    note="Unlocks expenditures visibility (RD-DEP-001).",
)

put(
    "ai",
    architecture="MULTI-LEVEL",
    structural_verb="NONE",
    current="Inventory UNKNOWN — uses scattered across agencies; no dedicated AI ministry",
    proposed="HOLD-COMPLETE: provisional MULTI-LEVEL — STATE policy/floors; AGENCY execution; independent oversight for high-risk; do NOT invent AI agency yet",
    geographic_levels=["STATEWIDE", "MULTI-LEVEL"],
    layers=layers("STATEWIDE policy floors", "INDEPENDENT OVERSIGHT (high-risk)", "AGENCY execution"),
    government_role="RULEMAKER + REFEREE",
    market_role="Vendors — procurement/referee rules",
    rights_floor="Digital Due Process if automated decisions affect rights",
    capacity_requirement="Minimum inventory still missing",
    regional_relationship="None until inventory",
    accountability_pathway="Provisional: agency owners + statewide policy + audit; finalize after inventory",
    power_concentration_risk="HIGH if one AI agency runs everything — avoid",
    placement=tests(
        "Automated decisions can violate rights — floors needed",
        "Inventory insufficient to assign operators",
        "Central AI agency fails without inventory",
        "Agency domain knowledge matters",
        "Models spill across programs",
        "HOLD-COMPLETE multi-level posture; no new agency",
    ),
    regionalization=None,
    devolution=None,
    consolidation=None,
    market=None,
    political_vs_functional="Unknown until inventory",
    friction=["Invisible automated decisions"],
    blocker="AI baseline inventory UNKNOWN",
    confidence="LOW",
    note="Minimum institutional posture only. HOLD-COMPLETE valid.",
    hold_complete=True,
)

put(
    "emergency_government",
    architecture="MULTI-LEVEL",
    structural_verb="REGIONALIZE",
    current="ADEM + local EM + mutual aid; emergency powers statewide",
    proposed="STATEWIDE declaration/standards; REGIONAL mutual aid & specialized response; LOCAL incident command",
    geographic_levels=["STATEWIDE", "REGIONAL", "COUNTY", "MUNICIPAL / LOCAL"],
    layers=layers("STATEWIDE", "REGIONAL mutual aid", "LOCAL ICS"),
    government_role="RULEMAKER + PROVIDER/PURCHASER",
    market_role="Contractors under emergency procurement rules",
    rights_floor="Emergency powers time-bounded; rights survive",
    capacity_requirement="Hazards exceed single county",
    regional_relationship="Mutual aid regions / trauma / fire — functional",
    accountability_pathway="Governor/legislature + local elected + after-action public reports",
    power_concentration_risk="HIGH — emergency powers; mandatory sunset/review",
    placement=tests(
        "Rights floors during emergencies statewide",
        "Locals cannot alone handle major hazards",
        "Duplicate specialty teams wasteful",
        "Local ICS needs proximity",
        "Disasters spill heavily",
        "REGIONALIZE mutual aid capacity; MULTI-LEVEL",
    ),
    regionalization={
        "shared_demand": True,
        "local_inadequate": True,
        "regional_improves": True,
        "accountability_clear": "Mutual aid compacts + public AARs",
        "result": "REGIONALIZE specialized response / mutual aid",
    },
    devolution=None,
    consolidation=None,
    market=None,
    political_vs_functional="County EM ≠ hazard footprint",
    friction=["Unclear who commands", "Long travel for specialty teams"],
    blocker=None,
    confidence="HIGH",
    note="Power concentration test critical.",
)

put(
    "intergenerational_obligations",
    architecture="STATEWIDE",
    structural_verb="NONE",
    current="Diffuse across pensions, debt, environment, infrastructure — schedules UNKNOWN",
    proposed="STATEWIDE stewardship/accountability home for intergenerational ledger; funding design later (V2.3); HOLD deep tools pending UNK-FISC-004",
    geographic_levels=["STATEWIDE"],
    layers=layers("STATEWIDE", "STATEWIDE stewardship", "AGENCY execution of pieces"),
    government_role="RULEMAKER + REFEREE (stewardship)",
    market_role="None primary",
    rights_floor="Future citizens' claim to honest ledgers",
    capacity_requirement="Integrated long-term schedule capacity",
    regional_relationship="None",
    accountability_pathway="Public intergenerational ledger + legislature; deepen after schedules",
    power_concentration_risk="MEDIUM — stewardship must not become silent fiscal authority",
    placement=tests(
        "Obligation truth statewide",
        "Only statewide can see full ledger",
        "Fragmented silence is the failure",
        "Proximity low",
        "Burdens spill to future statewide",
        "Place STATEWIDE stewardship; HOLD instruments",
    ),
    regionalization=None,
    devolution=None,
    consolidation=None,
    market=None,
    political_vs_functional="Aligned statewide",
    friction=["Invisible long-term claims"],
    blocker="UNK-FISC-004",
    confidence="LOW",
    note="HOLD-COMPLETE: who carries stewardship = statewide; not funding design.",
    hold_complete=True,
)

put(
    "human_services",
    architecture="MULTI-LEVEL",
    structural_verb="REFORM_INSTITUTION",
    current="DHS-dominant with many programs; household must self-integrate across health/housing/benefits/care",
    proposed="STATEWIDE eligibility floors & back-end programs; LOCAL delivery partners; citizen-facing interface principle (design in V2.2.3) — not a new mega-agency yet",
    geographic_levels=["STATEWIDE", "COUNTY", "MUNICIPAL / LOCAL", "COOPERATIVE / NONPROFIT / INSTITUTIONAL"],
    layers=layers(
        "STATEWIDE rights/eligibility floors",
        "STATE shared eligibility/data capacity",
        "LOCAL/NONPROFIT delivery + program back-ends",
    ),
    government_role="RULEMAKER + PROVIDER/PURCHASER",
    market_role="Providers/nonprofits under contract",
    rights_floor="Due process on eligibility; household security floors",
    capacity_requirement="Shared eligibility/interface capacity",
    regional_relationship="Service deserts create regional travel",
    accountability_pathway="DHS/legislature + independent appeal + public navigation metrics",
    power_concentration_risk="HIGH — eligibility + provision + appeal must not fuse",
    placement=tests(
        "Equal eligibility rights",
        "Locals cannot each rebuild eligibility systems",
        "Duplicate determinations wasteful/cruel",
        "Local casework proximity matters",
        "Service access spills across counties",
        "MULTI-LEVEL + shared front door principle",
    ),
    regionalization={
        "shared_demand": True,
        "local_inadequate": "For eligibility systems yes",
        "regional_improves": "Shared capacity yes",
        "accountability_clear": "State program owners + local delivery partners",
        "result": "Shared capacity / interface — not regional government replacing local delivery",
    },
    devolution=None,
    consolidation={
        "duplication_shown": "Multiple eligibility stacks",
        "functions_overlap": "Intake yes; program rules often distinct",
        "transition_costs": "HIGH",
        "accountability": "Improves with one interface + clear back-ends",
        "capability_risk": "Do not erase specialized program skill",
        "citizen_friction": "Should decline — primary goal",
        "result": "CONSOLIDATE citizen interface/eligibility capacity — defer build to V2.2.3",
    },
    market=None,
    political_vs_functional="Household journey ≠ agency org chart",
    friction=[
        "Duplicate applications",
        "Duplicate data entry",
        "Multiple eligibility determinations",
        "Unnecessary handoffs",
        "Household as systems integrator",
    ],
    blocker="UNK-FISC-001",
    confidence="MEDIUM",
    note="Key question: household experience of many functions — interface later, friction now.",
)

put(
    "insurance_and_risk",
    architecture="MULTI-LEVEL",
    structural_verb="REFORM_INSTITUTION",
    current="Private markets + DOI regulation + public risk pools (UI, WC, Medicaid interactions, disaster, crop, public asset)",
    proposed="MULTI-LEVEL / MARKET + REGULATORY: STATE referee for private lines; public pools where universal/social insurance; LOCAL/state for disaster; no single 'insurance agency' owns all risk",
    geographic_levels=["STATEWIDE", "MARKET / PRIVATE", "REGIONAL"],
    layers=layers(
        "STATEWIDE regulation & social-insurance statute",
        "PUBLIC POOLS where required + MARKET insurers",
        "MARKET delivery + PUBLIC programs",
    ),
    government_role="RULEMAKER + REFEREE (+ PROVIDER for public pools)",
    market_role="Primary for private lines where competition works",
    rights_floor="Solvency/consumer protection; mandated coverages where statute",
    capacity_requirement="DOI exam + actuarial for public pools",
    regional_relationship="Disaster/residual markets sometimes regional",
    accountability_pathway="DOI + legislature + public pool boards + courts",
    power_concentration_risk="MEDIUM — regulator must not become silent insurer of last resort without statute",
    placement=tests(
        "Consumer protection statewide",
        "Markets need referee; public pools need state capacity",
        "One insurance mega-agency would blur distinct risks",
        "Local agents/knowledge matter",
        "Disaster risk spills regionally",
        "MULTI-LEVEL MARKET + REGULATORY earned",
    ),
    regionalization=None,
    devolution=None,
    consolidation=None,
    market={
        "competition_works": "Yes in many lines; weak in residual/disaster",
        "customer_choice": "Yes when markets work",
        "barriers": "Capital/regulation",
        "externalities": "Systemic / disaster",
        "universal_access": "Some lines require mandates/pools",
        "natural_monopoly": "No generally",
        "regulation_enough": "Often for private lines",
        "result": "MARKET + REGULATORY; public pools where universal/social insurance",
    },
    political_vs_functional="Risk pools ≠ county borders",
    friction=["Coverage gaps", "Multiple agencies for related risks"],
    blocker=None,
    confidence="MEDIUM",
    note="Cross-cutting map — not one agency.",
)

assert set(I) == set(labels), f"Missing/extra homes: {set(labels)^set(I)}"

# --- Build cards / map rows / friction / atlas ---
cards = []
future_map = []
friction_register = []
arch_counts = Counter()
verb_counts = Counter()
hold_i = 0

for hid, spec in I.items():
    fcard = f_by[hid]
    fam = fcard["family"]
    arch = spec["architecture"]
    verb = spec["structural_verb"]
    arch_counts[arch] += 1
    verb_counts[verb] += 1
    is_hold = bool(spec.get("hold_complete")) or arch.startswith("HOLD")
    if is_hold:
        hold_i += 1
    status = "HOLD-COMPLETE" if is_hold else "CLOSED"
    disposition = arch

    card = {
        "home_id": hid,
        "label": labels[hid],
        "family": fam,
        "family_label": families[fam]["label"],
        "f_disposition": fcard["disposition"],
        "architecture": arch,
        "structural_verb": verb,
        "current_institutional_home": spec["current"],
        "proposed_institutional_architecture": spec["proposed"],
        "geographic_levels": spec["geographic_levels"],
        "layers": spec["layers"],
        "government_role": spec["government_role"],
        "market_role": spec["market_role"],
        "rights_floor": spec["rights_floor"],
        "capacity_requirement": spec["capacity_requirement"],
        "regional_relationship": spec["regional_relationship"],
        "accountability_pathway": spec["accountability_pathway"],
        "power_concentration_risk": spec["power_concentration_risk"],
        "placement_tests": spec["placement"],
        "regionalization_test": spec["regionalization"],
        "devolution_test": spec["devolution"],
        "consolidation_test": spec["consolidation"],
        "market_private_test": spec["market"],
        "political_vs_functional_geography": spec["political_vs_functional"],
        "friction": spec["friction"],
        "evidence_blockers": [spec["blocker"]] if spec.get("blocker") else [],
        "confidence": spec["confidence"],
        "note": spec["note"],
        "status": status,
        "county_opportunity_portfolios": "OFF",
        "funding_invented": 0,
    }
    cards.append(card)

    future_map.append(
        {
            "function": labels[hid],
            "home_id": hid,
            "f_disposition": fcard["disposition"],
            "current_institutional_home": spec["current"],
            "proposed_institutional_architecture": arch,
            "structural_verb": verb,
            "geographic_levels": spec["geographic_levels"],
            "government_role": spec["government_role"],
            "market_role": spec["market_role"],
            "rights_floor": spec["rights_floor"],
            "capacity_requirement": spec["capacity_requirement"],
            "regional_relationship": spec["regional_relationship"],
            "accountability_pathway": spec["accountability_pathway"],
            "power_concentration_risk": spec["power_concentration_risk"],
            "blocker": spec.get("blocker"),
            "confidence": spec["confidence"],
            "layers": spec["layers"],
            "status": status,
        }
    )

    for f in spec["friction"]:
        friction_register.append(
            {
                "home_id": hid,
                "label": labels[hid],
                "friction": f,
                "redesign_response": spec["proposed"],
                "feeds": "V2.2.3",
            }
        )

# Functional Geography Atlas (signature output)
atlas_layers = [
    {
        "id": "healthcare",
        "title": "Healthcare geography",
        "political": "County health units / political counties",
        "functional": "Hospital referral / trauma / specialty catchments crossing counties",
        "alignment": "DIVERGE",
        "homes": ["healthcare", "insurance_and_risk", "emergency_government"],
        "implication": "REGIONALIZE specialty/EMS capacity; do not treat care as county-sealed",
    },
    {
        "id": "education",
        "title": "Education geography",
        "political": "School districts (≠ counties) + state ADE",
        "functional": "Coops + higher-ed / labor catchments",
        "alignment": "DIVERGE",
        "homes": ["education", "labor"],
        "implication": "REGIONALIZE specialized capacity; keep local delivery",
    },
    {
        "id": "transportation",
        "title": "Transportation / logistics geography",
        "political": "ARDOT districts / counties / cities",
        "functional": "Commute sheds, freight corridors, MPO regions",
        "alignment": "DIVERGE",
        "homes": ["transportation", "economic_development", "labor"],
        "implication": "REGIONALIZE corridor planning",
    },
    {
        "id": "water",
        "title": "Water geography",
        "political": "Municipal / district utility borders",
        "functional": "Watersheds and shared treatment systems",
        "alignment": "DIVERGE",
        "homes": ["water", "natural_resources", "land"],
        "implication": "REGIONALIZE where capacity/spillover fail locally",
    },
    {
        "id": "workforce_economy",
        "title": "Economic / workforce geography",
        "political": "Counties / cities / local ED orgs",
        "functional": "Labor-market / site regions",
        "alignment": "DIVERGE",
        "homes": ["labor", "economic_development", "business_formation", "capital"],
        "implication": "Regional partnerships allowed; county opportunity portfolios OFF",
    },
    {
        "id": "emergency",
        "title": "Emergency-service geography",
        "political": "County/municipal EM",
        "functional": "Mutual aid / hazard footprints",
        "alignment": "DIVERGE",
        "homes": ["emergency_government", "healthcare"],
        "implication": "REGIONALIZE mutual aid specialty",
    },
    {
        "id": "admin_access",
        "title": "Administrative / service-access geography",
        "political": "Agency field offices / county seats",
        "functional": "Household travel-to-service reality (SEE distance patterns)",
        "alignment": "DIVERGE",
        "homes": ["human_services", "agencies", "justice", "healthcare"],
        "implication": "Shared interface + regional access points; V2.2.3 deepens experience",
    },
]

# Update redesign objects: close all I
obj_list = objects["objects"]
for o in obj_list:
    if o["type"] != "I":
        continue
    hid = o["home_id"]
    spec = I[hid]
    is_hold = bool(spec.get("hold_complete")) or spec["architecture"].startswith("HOLD")
    o["status"] = "HOLD-COMPLETE" if is_hold else "CLOSED"
    o["disposition"] = spec["architecture"]
    o["closed_by_pass"] = "V2.2.2"
    o["note"] = spec["note"]
    o["structural_verb"] = spec["structural_verb"]

closed = sum(1 for o in obj_list if o["status"] in ("CLOSED", "HOLD-COMPLETE"))
total = 114
assert closed == 76, closed
v22_pct = round(100.0 * closed / total, 1)
blueprint_pct = round(25.0 + 20.0 * (closed / total), 1)
assert v22_pct == 66.7, v22_pct
assert blueprint_pct == 38.3, blueprint_pct

f_closed = sum(1 for o in obj_list if o["type"] == "F" and o["status"] in ("CLOSED", "HOLD-COMPLETE"))
i_closed = sum(1 for o in obj_list if o["type"] == "I" and o["status"] in ("CLOSED", "HOLD-COMPLETE"))
o_open = sum(1 for o in obj_list if o["type"] == "O" and o["status"] == "OPEN")

objects.update(
    {
        "decision_id": DEC,
        "update_id": UPD,
        "generated_at": TODAY,
        "v2_2_completion_percent": v22_pct,
        "counts": {
            "total": total,
            "closed": closed,
            "open": total - closed,
            "by_type": {
                "F": {"closed": f_closed, "open": 38 - f_closed},
                "I": {"closed": i_closed, "open": 38 - i_closed},
                "O": {"closed": 0, "open": o_open},
            },
        },
        "objects": obj_list,
    }
)
dump("data/project/cc_v2_2_redesign_objects.json", objects)

locked = {
    "no_unfunded_subsidiarity": "Responsibility, authority, and resources must travel together.",
    "county_opportunity_portfolios": "OFF until operating model context exists",
    "funding_invented": 0,
    "boundary_redraw": False,
    "essential_not_publicly_owned": True,
}

pass_doc = {
    "version": "1.0.0",
    "slice_id": "CC-V2-2-2-INSTITUTIONAL-GEOGRAPHIC-REDESIGN-1.0",
    "decision_id": DEC,
    "update_id": UPD,
    "v2_decision_id": V2DEC,
    "generated_at": TODAY,
    "status": "COMPLETE",
    "pass_id": "V2.2.2",
    "title": "Institutional & Geographic Redesign",
    "gate": "V2.2",
    "epistemic_class": "REDESIGN_INSTITUTION_NOT_FUNDING_NOT_COUNTY_FUTURES",
    "governing_question": "Who should actually perform each legitimate function, at what geographic level, and through what institutional form?",
    "placement_rule": "Do not centralize for neatness. Do not decentralize for ideology. Put each function where capability, accountability, rights, scale, and geography fit best.",
    "discipline": LOCKED_RULES,
    "architecture_vocabulary": ARCHITECTURES,
    "structural_verbs": STRUCTURAL_VERBS,
    "five_placement_tests": ["RIGHTS", "CAPACITY", "SCALE", "PROXIMITY", "SPILLOVER"],
    "burden_tests": {
        "regionalization": [
            "Shared demand exists",
            "Individual local capacity materially inadequate or duplicative",
            "Regional scale improves capability/access/cost",
            "Accountability can remain understandable",
        ],
        "devolution": [
            "Local competence",
            "Rights floor protected",
            "Spillovers limited/manageable",
            "Funding follows responsibility",
            "Citizens can hold decision-makers accountable",
        ],
        "consolidation": [
            "Actual duplication demonstrated",
            "Functions genuinely overlap",
            "Transition costs understood",
            "Accountability does not worsen",
            "Specialized capability not lost",
            "Citizen friction should decline",
        ],
        "market_private": [
            "Can competition work?",
            "Can customers meaningfully choose?",
            "Are barriers manageable?",
            "Are externalities manageable?",
            "Is universal access required?",
            "Is this a natural monopoly?",
            "Could regulation accomplish the public purpose without public provision?",
        ],
    },
    "locked_rules": locked,
    "families": families,
    "architecture_counts": dict(arch_counts),
    "structural_verb_counts": dict(verb_counts),
    "hold_complete_i_objects": hold_i,
    "progress": {
        "redesign_objects_closed": closed,
        "redesign_objects_total": total,
        "v2_2_percent": v22_pct,
        "v2_blueprint_percent": blueprint_pct,
        "f_objects_closed": f_closed,
        "i_objects_closed": i_closed,
        "o_objects_open": o_open,
    },
    "exit_gate": {
        "i_objects_38": True,
        "five_tests": True,
        "standards_vs_delivery": True,
        "functional_geography": True,
        "regionalization_burden": True,
        "devolution_burden": True,
        "consolidation_burden": True,
        "market_private_test": True,
        "three_holds_dispositioned": True,
        "human_services_friction": True,
        "insurance_architecture": True,
        "power_concentration": True,
        "accountability_distance": True,
        "no_unfunded_subsidiarity": True,
        "county_futures_unassigned": True,
        "funding_invented": 0,
    },
    "surfaces": {
        "pass": "/v2/redesign/institutional-geographic/",
        "future_map": "/v2/redesign/institutional-future-map/",
        "atlas": "/v2/redesign/functional-geography-atlas/",
        "friction": "/v2/redesign/institutional-geographic/#friction",
        "what_changed": "/v2/redesign/what-changed/v2-2-2/",
        "hub": "/v2/redesign/",
    },
    "next": "V2.2.3 — Program, Process & Administrative Redesign",
    "cards": cards,
    "institutional_future_map": future_map,
    "institutional_friction_register": friction_register,
    "should_rule": fpass["should_rule"],
}
dump("data/project/cc_v2_2_2_institutional_geographic_redesign.json", pass_doc)

atlas_doc = {
    "version": "1.0.0",
    "slice_id": "CC-V2-2-2-FUNCTIONAL-GEOGRAPHY-ATLAS-1.0",
    "decision_id": DEC,
    "update_id": UPD,
    "generated_at": TODAY,
    "status": "COMPLETE",
    "title": "Functional Geography Atlas",
    "rule": "Classify political vs functional geography. Where they differ, record it. Do not redraw governmental boundaries yet.",
    "county_opportunity_portfolios": "OFF",
    "layers": atlas_layers,
    "href": "/v2/redesign/functional-geography-atlas/",
}
dump("data/project/cc_v2_2_2_functional_geography_atlas.json", atlas_doc)

hub = load("data/project/cc_v2_2_redesign_arkansas.json")
hub["decision_id"] = DEC
hub["update_id"] = UPD
hub["generated_at"] = TODAY
hub["status"] = "IN_PROGRESS"
hub["progress"] = {
    "redesign_objects_closed": closed,
    "redesign_objects_total": total,
    "v2_2_percent": v22_pct,
    "v2_blueprint_percent": blueprint_pct,
    "f_objects_closed": f_closed,
    "i_objects_closed": i_closed,
    "i_objects_open": 0,
    "o_objects_open": o_open,
}
for p in hub["passes"]:
    if p["id"] == "V2.2.1":
        p["status"] = "COMPLETE"
    if p["id"] == "V2.2.2":
        p["status"] = "COMPLETE"
        p["href"] = "/v2/redesign/institutional-geographic/"
        p["what_changed"] = "/v2/redesign/what-changed/v2-2-2/"
        p["exit"] = "Who performs functions — architectures, geography, burden tests."
    if p["id"] == "V2.2.3":
        p["status"] = "NEXT"
        p["href"] = None
hub["signature_outputs"] = {
    "institutional_future_map": "/v2/redesign/institutional-future-map/",
    "functional_geography_atlas": "/v2/redesign/functional-geography-atlas/",
}
dump("data/project/cc_v2_2_redesign_arkansas.json", hub)

changelog = {
    "version": "1.0.0",
    "pass_id": "V2.2.2",
    "pass_name": "Institutional & Geographic Redesign",
    "decision_id": DEC,
    "update_id": UPD,
    "generated_at": TODAY,
    "status": "COMPLETE",
    "before_after": [
        {"label": "I objects", "before": "0/38 closed", "after": "38/38 closed (incl. HOLD-COMPLETE)"},
        {"label": "Redesign objects", "before": "38/114", "after": f"{closed}/114"},
        {"label": "V2.2", "before": "33.3%", "after": f"{v22_pct}%"},
        {"label": "V2 BLUEPRINT", "before": "31.7%", "after": f"{blueprint_pct}%"},
        {"label": "Structural verbs", "before": "0 applied in 2.2.1", "after": str(dict(verb_counts))},
        {"label": "Architectures", "before": "—", "after": str(dict(arch_counts))},
        {"label": "Functional Geography Atlas", "before": "—", "after": f"{len(atlas_layers)} layers"},
        {"label": "County opportunity portfolios", "before": "OFF", "after": "OFF"},
        {"label": "Funding invented", "before": "0", "after": "0"},
    ],
    "architecture_counts": dict(arch_counts),
    "structural_verb_counts": dict(verb_counts),
    "nothing_funded": True,
    "decisions_recorded": [V2DEC],
    "experience_links": [
        {"href": "/v2/redesign/institutional-geographic/", "label": "Institutional & Geographic →"},
        {"href": "/v2/redesign/institutional-future-map/", "label": "Institutional Future Map →"},
        {"href": "/v2/redesign/functional-geography-atlas/", "label": "Functional Geography Atlas →"},
        {"href": "/v2/redesign/", "label": "Redesign hub →"},
    ],
}
dump("data/project/pass_changelogs/v2_2_2.json", changelog)

reg = load("data/project/v2_decision_register.json")
if not any(d.get("id") == V2DEC for d in reg.get("decisions") or []):
    reg.setdefault("decisions", []).append(
        {
            "id": V2DEC,
            "date": TODAY,
            "title": "Close V2.2.2 institutional & geographic homes for 38 functions",
            "decision": (
                "Assign institutional architectures to all 38 I objects using five placement tests; "
                "separate standards from delivery; apply regionalize/devolve/consolidate/market burdens; "
                "publish Functional Geography Atlas and Institutional Future Map; lock no-unfunded-subsidiarity; "
                "keep county opportunity portfolios OFF; invent no funding."
            ),
            "why": "Function without institutional geography cannot become an operating model.",
            "evidence": [
                "V2.2.1 F dispositions",
                "V2.1 SEE / GEO-001",
                "X-Ray joins",
                "placement + burden tests",
            ],
            "alternatives_rejected": [
                "Centralize everything for neatness",
                "Decentralize everything for ideology",
                "Redraw counties now",
                "Assign county economic futures",
                "Invent AI agency without inventory",
                "Fund redesign in V2.2",
            ],
            "could_reverse_if": "Hostile test shows architecture contradicts rights/capacity evidence — reopen I object only.",
            "v1_doctrine_impact": "NONE — applies subsidiarity, Role Conflict, essential≠owned to Arkansas institutions",
        }
    )
reg["decision_id"] = DEC
reg["update_id"] = UPD
dump("data/project/v2_decision_register.json", reg)

plan["status"] = "V2_2_IN_PROGRESS"
plan["decision_id"] = DEC
plan["update_id"] = UPD
plan["blueprint"]["percent"] = blueprint_pct
plan["blueprint"]["status"] = "IN_PROGRESS"
for g in plan["gates"]:
    if g["id"] == "V2.2":
        g["status"] = "IN_PROGRESS"
        g["completion_percent"] = v22_pct
        g["redesign_objects_closed"] = closed
        g["redesign_objects_total"] = total
plan["next_only"] = "V2.2.3 — Program, Process & Administrative Redesign (citizen/business friction)."
plan["active_pass"] = "V2.2.2 COMPLETE → next V2.2.3"
dump("data/project/cc_v2_master_build_plan.json", plan)

ladder = load("data/project/completion_ladder_and_dashboard.json")
ladder["decision_id"] = DEC
ladder["update_id"] = UPD
ladder["v2_blueprint"] = {
    **ladder.get("v2_blueprint", {}),
    "percent": blueprint_pct,
    "v2_1_percent": 100,
    "v2_2_percent": v22_pct,
    "see_status": "CERTIFIED",
    "redesign_status": "IN_PROGRESS",
    "note": f"V2.2.2 complete. Redesign {closed}/114. Blueprint {blueprint_pct}%. Next: V2.2.3.",
    "href": "/v2/redesign/",
}
dump("data/project/completion_ladder_and_dashboard.json", ladder)

state = load("data/project/current_build_state.json")
state["decision_id"] = DEC
state["status"] = "v2_2_2_complete_v2_2_3_next"
state["next_action"] = "V2.2.3 — Program, Process & Administrative Redesign"
state["v2_blueprint_percent"] = blueprint_pct
state["writing_focus"] = f"V2.2.2 COMPLETE. Blueprint {blueprint_pct}%. Next V2.2.3."
state["notes"] = [
    f"{DEC}/{UPD}: V2.2.2 institutional/geographic 38/38 I. Redesign {closed}/114. Blueprint {blueprint_pct}%."
] + [n for n in (state.get("notes") or []) if DEC not in str(n)]
dump("data/project/current_build_state.json", state)

bpreg = load("data/project/build_progress_registry.json")
bpreg["decision_id"] = DEC
bpreg["update_id"] = UPD
bpreg["next_objective"] = "V2.2.3 Program, Process & Administrative Redesign — household experience of government."
bpreg["v2_blueprint"] = {"percent": blueprint_pct, "href": "/v2/redesign/"}
if not any(x.get("id") == DEC for x in bpreg.get("infrastructure_checkpoints") or []):
    bpreg.setdefault("infrastructure_checkpoints", []).append(
        {
            "id": DEC,
            "title": "V2.2.2 Institutional & Geographic Redesign complete",
            "date": TODAY,
            "href": "/v2/redesign/what-changed/v2-2-2/",
        }
    )
dump("data/project/build_progress_registry.json", bpreg)

sg = load("data/project/stewardship_governance_v1.json")
sg["recommended_next_priority"] = {
    "lane": "V2_BLUEPRINT",
    "focus": "V2.2.3 Program, Process & Administrative Redesign",
    "decision_id": DEC,
}
sg["v2_blueprint"] = {**sg.get("v2_blueprint", {}), "percent": blueprint_pct, "href": "/v2/redesign/"}
dump("data/project/stewardship_governance_v1.json", sg)

updates = load("data/project/updates.json")
if not any(u.get("id") == UPD for u in updates.get("updates") or []):
    updates.setdefault("updates", []).append(
        {
            "id": UPD,
            "date": TODAY,
            "title": "V2.2.2 Institutional & Geographic Redesign complete",
            "summary": (
                f"{DEC}: 38/38 Institutional objects dispositioned with five placement tests, "
                f"Functional Geography Atlas, and Institutional Future Map. Redesign {closed}/114. "
                f"Blueprint {blueprint_pct}%. Structural verbs applied under burden tests. "
                f"County futures OFF. Funding invented 0. Next: V2.2.3."
            ),
            "public": True,
        }
    )
updates["last_updated"] = TODAY
dump("data/project/updates.json", updates)

rule_path = ROOT / ".cursor/rules/v2-doctrine-protection.mdc"
rule = rule_path.read_text(encoding="utf-8")
old = (
    "→ V2.2.1 Government Function Disposition — **COMPLETE**  \n"
    "→ **NEXT:** V2.2.2 Institutional & Geographic Redesign"
)
new = (
    "→ V2.2.1 Government Function Disposition — **COMPLETE**  \n"
    "→ V2.2.2 Institutional & Geographic Redesign — **COMPLETE**  \n"
    "→ **NEXT:** V2.2.3 Program, Process & Administrative Redesign"
)
if old in rule:
    rule_path.write_text(rule.replace(old, new), encoding="utf-8")

(ROOT / "reports/CC_V2_2_2_INSTITUTIONAL_GEOGRAPHIC_REDESIGN_RETURN.md").write_text(
    f"""# V2.2.2 — Institutional & Geographic Redesign — Return

**Decision:** {DEC} · **Update:** {UPD} · **V2-DEC:** {V2DEC}

## Verdict

COMPLETE. Who performs each function — architecture + geography — without funding design or county futures.

## Progress

- Redesign objects: **{closed}/114** (F+I closed; O open)
- V2.2: **{v22_pct}%**
- Blueprint: **{blueprint_pct}%**
- Architectures: {dict(arch_counts)}
- Structural verbs: {dict(verb_counts)}
- HOLD-COMPLETE I: {hold_i}

## Locked

Responsibility, authority, and resources travel together. County Opportunity Portfolios OFF. Funding invented = 0.

## Next

V2.2.3 — Program, Process & Administrative Redesign.
""",
    encoding="utf-8",
)

print(
    f"V2.2.2 COMPLETE {closed}/114 v22={v22_pct}% bp={blueprint_pct}% "
    f"arch={dict(arch_counts)} verbs={dict(verb_counts)} hold_i={hold_i}"
)
