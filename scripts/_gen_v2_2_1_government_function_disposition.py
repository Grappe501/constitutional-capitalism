#!/usr/bin/env python3
"""CC-DEC-201 / UPD-214 — V2.2.1 Government Function Disposition (function first; money later)."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TODAY = "2026-08-16"
DEC = "CC-DEC-201"
UPD = "UPD-214"
V2DEC = "V2-DEC-015"

DISPOSITIONS = [
    "KEEP",
    "REFORM",
    "CONSOLIDATE",
    "DEVOLVE",
    "REGIONALIZE",
    "PHASE OUT",
    "ELIMINATE",
    "NEW",
    "HOLD / INSUFFICIENT EVIDENCE",
]

ROLES = ["RULEMAKER", "REFEREE", "PROVIDER/PURCHASER", "INVESTOR/OWNER"]

FAMILIES = {
    "people_human_capability": {
        "label": "People & Human Capability",
        "homes": [
            "demographics",
            "household_economics",
            "education",
            "healthcare",
            "human_services",
            "labor",
            "insurance_and_risk",
        ],
    },
    "household_essential_systems": {
        "label": "Household & Essential Systems",
        "homes": ["housing", "water", "energy", "digital_infrastructure"],
    },
    "markets_production_capital": {
        "label": "Markets, Production & Capital",
        "homes": [
            "agriculture",
            "natural_resources",
            "land",
            "capital",
            "banking",
            "business_formation",
            "economic_development",
            "procurement",
        ],
    },
    "government_operations_public_money": {
        "label": "Government Operations & Public Money",
        "homes": [
            "revenue",
            "expenditures",
            "agencies",
            "pensions",
            "public_assets",
            "federal_dependency",
            "intergenerational_obligations",
        ],
    },
    "democracy_rights_administration": {
        "label": "Democracy, Rights & Administration",
        "homes": [
            "constitutional_structure",
            "elections",
            "direct_democracy",
            "justice",
            "civic_institutions",
            "administrative_power",
            "public_data",
            "ai",
            "emergency_government",
        ],
    },
    "infrastructure_place_resilience": {
        "label": "Infrastructure, Place & Resilience",
        "homes": ["transportation", "local_government", "geographic_disparities"],
    },
}


def load(rel: str):
    return json.loads((ROOT / rel).read_text(encoding="utf-8"))


def dump(rel: str, obj):
    path = ROOT / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(obj, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


plan = load("data/project/cc_v2_master_build_plan.json")
xray = load("data/project/cc_v2_1_5_whole_state_xray.json")
readiness = {h["home_id"]: h for h in xray["home_audit_38"]}
labels = {d["id"]: d.get("label") for d in plan["operating_system_inventory"]["domains"]}

# Function dispositions: function first. Point every SHOULD to V2.1 evidence.
# Format: disposition, roles[], level_hint (preliminary — I objects later), failure, see_refs, blockers, household, market, power, confidence, mind_change, fiscal_q, legal_q

F = {}

def put(hid, **kwargs):
    F[hid] = kwargs


put(
    "demographics",
    disposition="KEEP",
    roles=["PROVIDER/PURCHASER"],
    level="STATEWIDE + COUNTY measurement",
    legitimate_function="Measure and publish who lives in Arkansas and how that changes.",
    failure="Statewide averages erase county truth (SEE V2.1.1 Phillips guide).",
    see=["V2.1.1 people/place", "GEO people PARTIAL"],
    household="Security via honest public facts; Agency via comprehensible state",
    market="Neutral measurement",
    power="Information power — must stay non-capture",
    confidence="HIGH",
    mind_change="If measurement itself becomes politicized allocation tool",
    fiscal="V2.3: statistical capacity funding",
    legal="V2.4: privacy floors on microdata",
)

put(
    "household_economics",
    disposition="REFORM",
    roles=["RULEMAKER", "PROVIDER/PURCHASER"],
    level="MULTI-LEVEL",
    legitimate_function="Orient public success metrics and policy design around household capability (income, cost, security, ownership, time, agency).",
    failure="Agency budgets optimize agencies; household unit of success underweighted (V2.1.1+X-Ray).",
    see=["V2.1.1 archetypes", "V2.1.5 production≠prosperity distinction"],
    household="Primary — all five dimensions + agency",
    market="Does not replace markets; reframes what success means",
    power="Shifts evaluative power from agency optics to household effects",
    confidence="HIGH",
    mind_change="If household metrics prove unworkable without fabricating data",
    fiscal="V2.3: cost of household dashboards / transfers redesign later",
    legal="V2.4: statutory success definitions",
)

put(
    "education",
    disposition="REFORM",
    roles=["RULEMAKER", "PROVIDER/PURCHASER", "REFEREE"],
    level="MULTI-LEVEL (state standards + local delivery; coops already cross-county)",
    legitimate_function="Develop human capability under equal rights floors.",
    failure="District≠county geography; adequacy/finance pathways court-entangled (V2.1.4).",
    see=["V2.1.4 federalism education", "EDGE education cross-boundary"],
    household="Capability, time, security, long-run ownership",
    market="Labor supply; avoid incumbent-only vocational capture",
    power="Board/local vs state; Opposition Test on curriculum/finance power",
    confidence="MEDIUM",
    mind_change="If SEE later shows delivery already meets CC household test statewide",
    fiscal="V2.3: adequacy/formula questions — not rates here",
    legal="V2.4: adequacy litigation envelope",
    blocker_note="Institutional geography in V2.2.2",
)

put(
    "healthcare",
    disposition="REFORM",
    roles=["RULEMAKER", "REFEREE", "PROVIDER/PURCHASER"],
    level="MULTI-LEVEL + REGIONAL service geographies",
    legitimate_function="Secure access to necessary care and referee market failures without becoming silent monopoly purchaser without due process.",
    failure="Federal-state co-governance; clinic reach ≠ funded line-item (V2.1.2/2.1.4).",
    see=["federalism healthcare", "UNK-FISC-001", "Phillips service distance"],
    household="Security, cost, time, income (via employment-tied coverage)",
    market="Competition among providers; avoid locking incumbents",
    power="CMS conditions + state admin — capture risk high",
    confidence="MEDIUM",
    mind_change="If all-funds federal map shows radically different AR discretion",
    fiscal="V2.3 after UNK-FISC-001 where needed",
    legal="V2.4: Medicaid waiver/authority",
    evidence_blocker="UNK-FISC-001 for detailed program redesign depth",
)

put(
    "human_services",
    disposition="REFORM",
    roles=["PROVIDER/PURCHASER", "RULEMAKER"],
    level="STATEWIDE admin + LOCAL delivery",
    legitimate_function="Deliver justified transfers/services that protect household floors without replacing work/ownership pathways by default.",
    failure="Largest GR share; agency optics vs household reach (V2.1.2).",
    see=["Allocation A DHS pattern", "UNK-FISC-001"],
    household="Income, security, time, agency (navigation burden)",
    market="Provider markets; nonprofit admin material",
    power="Eligibility discretion — Digital Due Process required",
    confidence="MEDIUM",
    mind_change="If federal share evidence changes state option set",
    fiscal="V2.3 + UNK-FISC-001",
    legal="V2.4: eligibility appeals",
    evidence_blocker="UNK-FISC-001",
)

put(
    "labor",
    disposition="REFORM",
    roles=["RULEMAKER", "REFEREE"],
    level="STATEWIDE (federal floor) + LOCAL workforce boards PARTIAL",
    legitimate_function="Referee fair labor markets and enable capability matching — not allocate jobs by politics.",
    failure="County industry employment often EMPTY; wage transmission known statewide only (V2.1.3).",
    see=["QCEW statewide", "GEO employment 7/75"],
    household="Income, security, time",
    market="Competition and barriers to entry",
    power="Regulatory capture by incumbents",
    confidence="MEDIUM",
    mind_change="If county labor maps show different failure mode",
    fiscal="V2.3: workforce program inventory pricing",
    legal="V2.4: federal preemption envelope",
)

put(
    "insurance_and_risk",
    disposition="REFORM",
    roles=["RULEMAKER", "REFEREE"],
    level="STATEWIDE regulation; MARKET provision primary",
    legitimate_function="Referee insurance markets so households/firms can manage risk without silent public backstops becoming default ownership.",
    failure="Production/household dependency noted; market flows UNKNOWN (V2.1.3/2.1.5).",
    see=["UNK insurance flows", "dependency graph"],
    household="Security, cost",
    market="Competition; avoid crowding out",
    power="Regulator vs industry",
    confidence="LOW",
    mind_change="If risk markets shown adequate under household test",
    fiscal="V2.3: residual public risk pools only if justified",
    legal="V2.4: insurance code",
)

put(
    "housing",
    disposition="REFORM",
    roles=["RULEMAKER", "REFEREE", "PROVIDER/PURCHASER"],
    level="LOCAL land-use primary + STATE floors/funding partner",
    legitimate_function="Enable adequate housing supply and referee exclusionary rules without becoming universal landlord.",
    failure="Local land-use + cost pressure on households (SEE household archetypes).",
    see=["V2.1.1 housing pressures", "owner-occupancy ≠ firm ownership"],
    household="Cost, security, ownership, time",
    market="Supply competition; incumbent landowner favors",
    power="Zoning as concentrated local power",
    confidence="MEDIUM",
    mind_change="If supply already unconstrained in evidence",
    fiscal="V2.3: housing finance tools — not designed here",
    legal="V2.4: home rule / preemption",
)

put(
    "water",
    disposition="REFORM",
    roles=["RULEMAKER", "REFEREE", "PROVIDER/PURCHASER"],
    level="MULTI-LEVEL + REGIONAL systems common",
    legitimate_function="Secure water for households, farms, and ecology under rights and sustainability constraints.",
    failure="Critical dependency; flow quantities UNKNOWN-COMPLETE (V2.1.5).",
    see=["dependency water", "productive asset water"],
    household="Security, cost",
    market="Utility structure; natural monopoly traits",
    power="Utility boards / districts",
    confidence="MEDIUM",
    mind_change="If asset register later shows different ownership/capacity",
    fiscal="V2.3: capital maintenance",
    legal="V2.4: water rights / districts",
)

put(
    "energy",
    disposition="REFORM",
    roles=["RULEMAKER", "REFEREE", "PROVIDER/PURCHASER"],
    level="STATEWIDE regulation + MIXED ownership (IOU/coop/muni FACT)",
    legitimate_function="Referee reliable energy markets; public ownership only where eight-gate standard met.",
    failure="Retail ownership known; generation mix UNKNOWN; Role Conflict risk if state owns and regulates (V2.1.3).",
    see=["EIA ownership shares", "Role Conflict Test"],
    household="Cost, security",
    market="Competition where feasible; coop/muni already mixed",
    power="PSC/boards; investor vs coop politics",
    confidence="MEDIUM",
    mind_change="If generation ownership evidence changes monopoly diagnosis",
    fiscal="V2.3: only if INVESTOR/OWNER proposed under eight gates",
    legal="V2.4: utility regulation",
    investor_owner="NOT default — eight gates required",
)

put(
    "digital_infrastructure",
    disposition="REFORM",
    roles=["RULEMAKER", "REFEREE", "PROVIDER/PURCHASER"],
    level="MULTI-LEVEL; possible REGIONALIZE for middle-mile",
    legitimate_function="Ensure connectivity sufficient for work, school, care, and civic participation.",
    failure="GEO connectivity mostly EMPTY; essential for modern household agency (V2.1.5).",
    see=["GEO connectivity", "dependency essential systems"],
    household="Income access, time, agency",
    market="Avoid locking single ISP incumbents without referee",
    power="Franchise/capture",
    confidence="MEDIUM",
    mind_change="If coverage already adequate under measured maps",
    fiscal="V2.3: broadband capital",
    legal="V2.4: municipal authority",
)

put(
    "agriculture",
    disposition="KEEP",
    roles=["RULEMAKER", "REFEREE", "PROVIDER/PURCHASER"],
    level="STATEWIDE policy + LOCAL production; processing ownership UNKNOWN",
    legitimate_function="Support productive agriculture and food systems under fair markets — not invent farm ownership shares.",
    failure="Production≠ownership≠retention already established; do not reopen food hub (V2.1.3).",
    see=["ag GDP", "farm ops", "UNK-PROD-001"],
    household="Income (farm/rural), cost (food), ownership",
    market="Commodity markets; concentration UNKNOWN",
    power="Boards/checkoffs PARTIAL",
    confidence="HIGH",
    mind_change="If ownership evidence shows public purpose requires different role",
    fiscal="V2.3: existing ag program inventory only",
    legal="V2.4: commodity/marketing order law",
    note="KEEP function; processing ownership remains UNKNOWN — no NEW public food enterprise here",
)

put(
    "natural_resources",
    disposition="REFORM",
    roles=["RULEMAKER", "REFEREE", "INVESTOR/OWNER"],
    level="STATEWIDE stewardship",
    legitimate_function="Steward common natural capital; public ownership/royalty only under eight gates.",
    failure="Asset classes named; valuations UNKNOWN (V2.1.3 balance sheet).",
    see=["natural capital UNKNOWN valuation", "eight gates"],
    household="Security, long-run ownership of common wealth",
    market="Extraction competition; anti-capture",
    power="Lease/permit discretion",
    confidence="MEDIUM",
    mind_change="If resource rents already fully captured under household test",
    fiscal="V2.3: royalty/public-income candidates only after gates — COUNTABLE still $0 until proven",
    legal="V2.4: resource title",
    investor_owner="Conditional on eight gates — not automatic",
)

put(
    "land",
    disposition="REFORM",
    roles=["RULEMAKER", "REFEREE"],
    level="LOCAL primary + STATE floors",
    legitimate_function="Define and referee land use and property rules that enable prosperity without feudal concentration.",
    failure="Taxable AV proxy only; title/beneficial patterns UNKNOWN (V2.1.2/2.1.3).",
    see=["AV millage", "land ownership UNKNOWN"],
    household="Cost, ownership, security",
    market="Entry barriers via land",
    power="Assessors/zoning",
    confidence="MEDIUM",
    mind_change="If land markets shown competitive and transparent",
    fiscal="V2.3: property tax questions later — not redesigned here",
    legal="V2.4: assessment uniformity",
)

put(
    "capital",
    disposition="REFORM",
    roles=["RULEMAKER", "REFEREE"],
    level="STATEWIDE rules; MARKET capital primary",
    legitimate_function="Enable capital formation access without pretending location=ownership or inventing public banks in V2.2.",
    failure="Capital ladder mapped; $10k–$100M access UNKNOWN; beneficial ownership UNKNOWN (V2.1.3).",
    see=["capital ladder", "UNK-PROD-001", "UNK-PROD-003"],
    household="Ownership, income, security",
    market="Must not favor political capital allocation",
    power="Public capital programs = high capture risk",
    confidence="MEDIUM",
    mind_change="If access survey shows no material gap",
    fiscal="V2.3 FUNDING REQUIREMENT for any NEW capital instrument",
    legal="V2.4: public bank/authority only if NEW later — not now",
    evidence_blocker="UNK-PROD-001/003 for ownership-heavy NEW",
    note="No public bank / state fund design in V2.2.1",
)

put(
    "banking",
    disposition="KEEP",
    roles=["RULEMAKER", "REFEREE"],
    level="STATEWIDE charter/regulation + FEDERAL dual system",
    legitimate_function="Referee safe banking and credit markets.",
    failure="Deposits≠ownership; access PARTIAL via FDIC SOD (V2.1.3).",
    see=["FDIC designated", "capital access PROXY"],
    household="Security, ownership pathways via credit",
    market="Competition among banks/CUs",
    power="Regulator capture",
    confidence="HIGH",
    mind_change="If credit deserts proven requiring PROVIDER role",
    fiscal="V2.3 only if public credit vehicle proposed later",
    legal="V2.4: dual banking",
)

put(
    "business_formation",
    disposition="REFORM",
    roles=["RULEMAKER", "REFEREE"],
    level="STATEWIDE filing + LOCAL conditions",
    legitimate_function="Lower lawful barriers to forming and scaling firms.",
    failure="Formation→scale capital path UNKNOWN (V2.1.3).",
    see=["business_formation UNKNOWN-COMPLETE flows"],
    household="Income, ownership, agency",
    market="Entry; anti-incumbent protectionism",
    power="Licensing boards (join admin_power)",
    confidence="MEDIUM",
    mind_change="If formation already easy under measured frictions",
    fiscal="V2.3: filing/IT systems",
    legal="V2.4: entity law",
)

put(
    "economic_development",
    disposition="REFORM",
    roles=["RULEMAKER", "REFEREE", "PROVIDER/PURCHASER"],
    level="MULTI-LEVEL",
    legitimate_function="Narrow, transparent tools that expand productive capacity without opaque deal patronage.",
    failure="Deal transparency FRAGMENTED; multi-actor pathway (V2.1.4); risk of political allocation.",
    see=["UNK-INST-004", "PAT-INST transparency"],
    household="Income/jobs uncertain without ownership retention",
    market="Often favors incumbents — explicit test required",
    power="High capture — Opposition Test mandatory",
    confidence="LOW",
    mind_change="If deal registry shows competitive neutrality already",
    fiscal="V2.3: incentive scoring — not inventing new taxes here",
    legal="V2.4: incentive statutes",
    evidence_blocker="UNK-INST-004 before final tool-level KEEP/ELIMINATE",
)

put(
    "procurement",
    disposition="REFORM",
    roles=["RULEMAKER", "REFEREE", "PROVIDER/PURCHASER"],
    level="STATEWIDE code + agency execution",
    legitimate_function="Convert appropriations into performance with competition, audit, and appeal.",
    failure="Volumes UNKNOWN; chokepoint PWR-CP-005; citizen/business friction (V2.1.2/2.1.4).",
    see=["procurement UNKNOWN volumes", "Who Controls the Dollar"],
    household="Indirect via service quality/cost",
    market="Entry for vendors; anti-incumbent",
    power="Award discretion",
    confidence="MEDIUM",
    mind_change="If protest/transparency already strong under evidence",
    fiscal="V2.3: procurement IT",
    legal="V2.4: procurement code",
    note="No Arkansas-first procurement redesign package in this pass",
)

put(
    "revenue",
    disposition="REFORM",
    roles=["RULEMAKER"],
    level="STATEWIDE (+ local levies separate)",
    legitimate_function="Raise lawful public revenue with household-visible incidence.",
    failure="GR rides heavily on wages/retail (V2.1.2); all-funds federal UNKNOWN.",
    see=["IIT+sales dominance", "UNK-FISC-001"],
    household="Cost, income, security",
    market="Incidence and investment location",
    power="Tax expenditure opacity PARTIAL",
    confidence="HIGH on diagnosis; HOLD on rate design",
    mind_change="If federal/all-funds map changes incidence picture",
    fiscal="FUNDING REQUIREMENT: V2.3 — no tax replacement design here",
    legal="V2.4: constitutional tax limits",
    evidence_blocker="UNK-FISC-001 for some redesign depth",
    note="Function REFORM (incidence transparency + structure questions); rates/mechanisms = V2.3",
)

put(
    "expenditures",
    disposition="REFORM",
    roles=["PROVIDER/PURCHASER", "RULEMAKER"],
    level="STATEWIDE appropriation → agency admin",
    legitimate_function="Spend public money by economic function and household effect — not agency press labels.",
    failure="Agency line-items hide function (V2.1.2 SEE classes PARTIAL).",
    see=["Money River", "Who Controls the Dollar"],
    household="Services, transfers, time (navigation)",
    market="Vendor markets",
    power="Appropriation chokepoint PWR-CP-001",
    confidence="HIGH",
    mind_change="If functional classification already controls decisions",
    fiscal="V2.3: chart of accounts reform cost",
    legal="V2.4: appropriation act structure",
)

put(
    "agencies",
    disposition="REFORM",
    roles=["PROVIDER/PURCHASER", "RULEMAKER", "REFEREE"],
    level="STATEWIDE institutional form (geography in V2.2.2)",
    legitimate_function="Capable administration of lawful functions.",
    failure="Inherited boundaries ≠ household/productive functions; Function≠Institution rule (V2.1.4/X-Ray).",
    see=["Authority Ledger", "agency optics"],
    household="Navigation friction",
    market="Regulatory consistency",
    power="Appointment chains PWR-CP-002",
    confidence="HIGH",
    mind_change="If functional org already exists under evidence",
    fiscal="V2.3: transition costs of any consolidate",
    legal="V2.4: reorganization statutes",
    note="F=REFORM administration model; do not eliminate 'agencies' as capacity. Institutional map = V2.2.2",
)

put(
    "pensions",
    disposition="HOLD / INSUFFICIENT EVIDENCE",
    roles=["PROVIDER/PURCHASER", "RULEMAKER"],
    level="STATEWIDE",
    legitimate_function="Honor legitimate retirement obligations without silent intergenerational transfer.",
    failure="Schedules UNKNOWN — UNK-FISC-004 blocks responsible REFORM vs KEEP depth.",
    see=["UNK-FISC-004", "intergenerational DEFERRED-BLOCKING"],
    household="Security (retirees), cost (taxpayers)",
    market="Capital markets via funds",
    power="Board trustees",
    confidence="LOW until schedules",
    mind_change="When CAFR debt/pension panel bound",
    fiscal="V2.3 blocked on schedules",
    legal="V2.4: impairment rules",
    evidence_blocker="UNK-FISC-004",
)

put(
    "public_assets",
    disposition="REFORM",
    roles=["PROVIDER/PURCHASER", "INVESTOR/OWNER"],
    level="MULTI-LEVEL",
    legitimate_function="Inventory, maintain, and steward public assets honestly.",
    failure="No complete public asset register (V2.1.1/2.1.3/X-Ray balance sheet).",
    see=["incomplete asset register", "UNKNOWN valuations"],
    household="Services from assets; anti-sell-off theater",
    market="Lease/competition where appropriate",
    power="Disposal/lease discretion",
    confidence="HIGH",
    mind_change="If register already exists outside corpus",
    fiscal="V2.3: maintenance backlog pricing",
    legal="V2.4: disposal rules",
    investor_owner="Stewardship ≠ new enterprise without eight gates",
)

put(
    "federal_dependency",
    disposition="REFORM",
    roles=["RULEMAKER", "PROVIDER/PURCHASER"],
    level="STATEWIDE strategy toward FEDERAL partner",
    legitimate_function="Manage federal partnership consciously — implement, fund-match, or exit with eyes open.",
    failure="Dependency real; statewide share UNKNOWN (UNK-FISC-001).",
    see=["federalism map", "UNK-FISC-001"],
    household="Security of federally entangled services",
    market="Pass-through provider markets",
    power="Federal conditioner chokepoint PWR-CP-003",
    confidence="MEDIUM",
    mind_change="When all-funds map arrives",
    fiscal="V2.3 requires UNK-FISC-001 for major exits/builds",
    legal="V2.4: waiver/supremacy",
    evidence_blocker="UNK-FISC-001",
)

put(
    "intergenerational_obligations",
    disposition="HOLD / INSUFFICIENT EVIDENCE",
    roles=["RULEMAKER"],
    level="STATEWIDE",
    legitimate_function="Make long-term obligations visible and governable.",
    failure="Class named; schedules deferred (V2.1.5).",
    see=["UNK-FISC-004", "balance sheet obligations"],
    household="Security across generations",
    market="Debt markets",
    power="Opacity benefits current actors",
    confidence="LOW",
    mind_change="When obligation schedules bound",
    fiscal="V2.3",
    legal="V2.4",
    evidence_blocker="UNK-FISC-004",
)

put(
    "constitutional_structure",
    disposition="KEEP",
    roles=["RULEMAKER"],
    level="STATEWIDE",
    legitimate_function="Bind government by constitution; enable lawful amendment.",
    failure="None requiring replacement of constitutional government — pathways mapped (V2.1.4).",
    see=["Authority Ledger", "Change Pathway Matrix"],
    household="Rights floors, agency via democracy",
    market="Rule of law",
    power="Separation of powers — KEEP",
    confidence="HIGH",
    mind_change="Only via explicit amendment process — not redesign whim",
    fiscal="none in V2.2.1",
    legal="V2.4 labels amendment needs for other reforms",
    note="KEEP structure; specific amendments may be labeled later for other homes",
)

put(
    "elections",
    disposition="REFORM",
    roles=["RULEMAKER", "REFEREE", "PROVIDER/PURCHASER"],
    level="STATEWIDE rules + COUNTY administration",
    legitimate_function="Administer free and fair elections.",
    failure="Admin capacity PARTIAL county evidence; legitimacy function KEEP, process REFORM for clarity/access (V2.1.4).",
    see=["Democratic Power Map", "EAVS designated"],
    household="Agency (sovereignty)",
    market="N/A primarily",
    power="Election admin capture risk — Pass 4.5 observation seed only",
    confidence="MEDIUM",
    mind_change="If administration already meets access/integrity evidence",
    fiscal="V2.3: election admin funding",
    legal="V2.4: election code / federal constraints",
)

put(
    "direct_democracy",
    disposition="KEEP",
    roles=["RULEMAKER"],
    level="STATEWIDE ballot processes",
    legitimate_function="Citizen reclaim via initiative/referendum within rights floors.",
    failure="Detail thresholds PARTIAL; function exists and fits CC popular sovereignty (V2.1.4).",
    see=["direct democracy pathways", "Power Loop"],
    household="Agency",
    market="N/A",
    power="Majority vs rights floors — already constrained",
    confidence="HIGH",
    mind_change="If process shown captured/unusable under evidence",
    fiscal="minimal",
    legal="V2.4: petition/rights hardening if reformed later",
)

put(
    "justice",
    disposition="REFORM",
    roles=["REFEREE", "PROVIDER/PURCHASER"],
    level="CIRCUITS cross counties — not 75 duplicates",
    legitimate_function="Adjudicate rights and disputes independently.",
    failure="Circuit≠county; funding/caseflow UNKNOWN-COMPLETE (V2.1.4).",
    see=["judicial actor", "EDGE justice"],
    household="Security, agency (appeal)",
    market="Contract enforcement",
    power="Independent judiciary — protect",
    confidence="MEDIUM",
    mind_change="If access/delay evidence changes",
    fiscal="V2.3: court funding",
    legal="V2.4: judicial article",
)

put(
    "civic_institutions",
    disposition="REFORM",
    roles=["RULEMAKER", "REFEREE"],
    level="STATEWIDE boards class + LOCAL",
    legitimate_function="Channel expertise and public participation without invisible appointment power.",
    failure="Board roster UNKNOWN; appointment graph opaque (V2.1.4).",
    see=["UNK-INST-001", "appointment graph"],
    household="Agency via visible boards",
    market="Licensing entry barriers",
    power="Appointment chokepoints",
    confidence="MEDIUM",
    mind_change="If roster/transparency already complete",
    fiscal="V2.3: transparency systems",
    legal="V2.4: board sunrise/sunset",
)

put(
    "administrative_power",
    disposition="REFORM",
    roles=["RULEMAKER", "REFEREE", "PROVIDER/PURCHASER"],
    level="STATEWIDE + LOCAL",
    legitimate_function="Execute law with notice, reason, and appeal (Digital Due Process).",
    failure="Representative decision map shows appeal PARTIAL; rule inventory UNKNOWN (V2.1.4).",
    see=["admin decision map", "Pass 3.5 DDP"],
    household="Agency, time, security",
    market="Predictable rules",
    power="Discretion without appeal = defect risk",
    confidence="HIGH",
    mind_change="If APA practice already meets DDP evidence",
    fiscal="V2.3: hearings/IT",
    legal="V2.4: APA",
)

put(
    "public_data",
    disposition="REFORM",
    roles=["PROVIDER/PURCHASER", "RULEMAKER"],
    level="STATEWIDE platforms + LOCAL custodians",
    legitimate_function="Make government comprehensible: structured where possible, request-based where necessary.",
    failure="Transparency uneven — votes STRUCTURED; contracts/ED FRAGMENTED; FOIA rates UNKNOWN (V2.1.4).",
    see=["transparency architecture", "UNK-INST-002"],
    household="Agency via information",
    market="Vendor/ED deal sunlight",
    power="Opacity protects incumbents",
    confidence="HIGH",
    mind_change="If portals already meet Comprehensible Government evidence",
    fiscal="V2.3: data platforms",
    legal="V2.4: FOIA modernization labels",
)

put(
    "ai",
    disposition="HOLD / INSUFFICIENT EVIDENCE",
    roles=["RULEMAKER", "REFEREE"],
    level="STATEWIDE standards when used",
    legitimate_function="If AI exercises state authority, bind it with Digital Due Process — inventory first.",
    failure="Arkansas NOW AI inventory UNKNOWN-COMPLETE (V2.1.5); cannot REFORM what isn't mapped.",
    see=["ai UNKNOWN-COMPLETE", "DDP"],
    household="Agency if automated denial",
    market="Vendor AI lock-in",
    power="Silent authority risk",
    confidence="LOW",
    mind_change="When consequential AI inventory exists",
    fiscal="later",
    legal="V2.4: automated decision rules",
    note="HOLD on disposition depth; NEW standards may follow inventory — not a chatbot mandate",
)

put(
    "emergency_government",
    disposition="REFORM",
    roles=["RULEMAKER", "PROVIDER/PURCHASER"],
    level="STATEWIDE with LOCAL execution",
    legitimate_function="Time-bounded emergency authority with sunsets and legislative/judicial check.",
    failure="Light baseline only; statute digest UNKNOWN (UNK-INST-005) — enough to require REFORM toward bounded emergency, not Stage 4 treatise.",
    see=["V2.1.4 emergency light", "UNK-INST-005"],
    household="Security, rights",
    market="Emergency procurement risks",
    power="Executive concentration — Opposition Test",
    confidence="MEDIUM",
    mind_change="If sunsets/checks already strong under statute digest",
    fiscal="V2.3: emergency funds",
    legal="V2.4: emergency powers article/statute",
)

put(
    "transportation",
    disposition="REFORM",
    roles=["PROVIDER/PURCHASER", "RULEMAKER"],
    level="STATEWIDE + LOCAL; corridors REGIONALIZE candidates",
    legitimate_function="Provide mobility infrastructure connecting people to work, care, and markets.",
    failure="Asset classes named; county network PARTIAL (V2.1.3/2.1.4).",
    see=["productive assets transport", "county roads pathway"],
    household="Time, cost, income access",
    market="Logistics competition",
    power="Project selection politics",
    confidence="MEDIUM",
    mind_change="If access already equalized under evidence",
    fiscal="V2.3: capital program",
    legal="V2.4: highway/federal-aid",
)

put(
    "local_government",
    disposition="KEEP",
    roles=["RULEMAKER", "PROVIDER/PURCHASER"],
    level="COUNTY/MUNICIPAL under subsidiarity",
    legitimate_function="Local self-government for local goods within state/federal floors.",
    failure="Capacity uneven; not a reason to eliminate local democracy (V2.1.2/2.1.4).",
    see=["local authority actor", "millage PARTIAL"],
    household="Services, tax cost, agency",
    market="Local business climate",
    power="Closest to people — KEEP with floors",
    confidence="HIGH",
    mind_change="If rights-floor failures dominate evidence",
    fiscal="V2.3: local fiscal capacity",
    legal="V2.4: home rule",
    note="KEEP local government as level; specific function DEVOLVE/REGIONALIZE decided per function in V2.2.2",
)

put(
    "geographic_disparities",
    disposition="REFORM",
    roles=["RULEMAKER", "PROVIDER/PURCHASER"],
    level="STATEWIDE policy awareness; no county rankings",
    legitimate_function="Design must see geographic difference without ranking counties best→worst.",
    failure="Statewide averages mislead; GEO EMPTY cells honest (V2-GEO-001).",
    see=["V2-GEO-001", "coverage map", "no rankings rule"],
    household="Place-based cost/security/time",
    market="Location of opportunity",
    power="Avoid engineered regional government by stealth",
    confidence="HIGH",
    mind_change="If disparities shown immaterial under household test",
    fiscal="V2.3: equalization tools later",
    legal="V2.4: as needed per tool",
    note="REFORM = make disparity-visible design mandatory; not NEW regional mega-government",
)

# Validate all 38 present
home_ids = [d["id"] for d in plan["operating_system_inventory"]["domains"]]
missing = [h for h in home_ids if h not in F]
extra = [h for h in F if h not in home_ids]
assert not missing and not extra, f"missing={missing} extra={extra}"

# ---------------------------------------------------------------------------
# Redesign objects 38 × F/I/O
# ---------------------------------------------------------------------------
objects = []
for hid in home_ids:
    for t, tlabel in [("F", "Function disposition"), ("I", "Institutional/geographic home"), ("O", "Operating-model integration")]:
        oid = f"{hid}.{t}"
        if t == "F":
            fd = F[hid]
            status = "HOLD-COMPLETE" if fd["disposition"].startswith("HOLD") else "CLOSED"
            objects.append(
                {
                    "object_id": oid,
                    "home_id": hid,
                    "type": t,
                    "label": tlabel,
                    "status": status,
                    "disposition": fd["disposition"],
                    "closed_by_pass": "V2.2.1",
                    "note": fd.get("note") or fd["legitimate_function"][:120],
                }
            )
        else:
            objects.append(
                {
                    "object_id": oid,
                    "home_id": hid,
                    "type": t,
                    "label": tlabel,
                    "status": "OPEN",
                    "disposition": None,
                    "closed_by_pass": None,
                    "note": "Queued — function first; institution/operating model later.",
                }
            )

closed = sum(1 for o in objects if o["status"] in ("CLOSED", "HOLD-COMPLETE"))
total = len(objects)
assert total == 114
v22_pct = round(100.0 * closed / total, 1)
# V2.1=25%; V2.2 target band ~45% => 20 points scaled by redesign objects
blueprint_pct = round(25.0 + 20.0 * (closed / total), 1)

redesign_objects = {
    "version": "1.0.0",
    "slice_id": "CC-V2-2-REDESIGN-OBJECTS-1.0",
    "decision_id": DEC,
    "update_id": UPD,
    "generated_at": TODAY,
    "rule": "38 homes × F/I/O = 114 redesign objects. HOLD-COMPLETE is a legitimate closed result.",
    "disposition_vocabulary": DISPOSITIONS,
    "types": {"F": "Function disposition", "I": "Institutional/geographic home", "O": "Operating-model integration"},
    "total_objects": total,
    "closed_objects": closed,
    "open_objects": total - closed,
    "v2_2_completion_percent": v22_pct,
    "objects": objects,
}
dump("data/project/cc_v2_2_redesign_objects.json", redesign_objects)

# Cards
cards = []
disp_counts = {}
for hid in home_ids:
    fd = F[hid]
    disp_counts[fd["disposition"]] = disp_counts.get(fd["disposition"], 0) + 1
    fam = next(k for k, v in FAMILIES.items() if hid in v["homes"])
    cards.append(
        {
            "home_id": hid,
            "label": labels.get(hid, hid),
            "family": fam,
            "family_label": FAMILIES[fam]["label"],
            "current_function": fd["legitimate_function"],
            "current_structure": "Inherited Arkansas structure — see V2.1 Authority/SEE homes",
            "problem_opportunity_from_see": fd["failure"],
            "cc_principle_implicated": "Four roles + Role Conflict + subsidiarity + household prosperity test + anti-capture",
            "alternatives_considered": [
                "KEEP unchanged",
                "REFORM mechanism",
                "CONSOLIDATE/REGIONALIZE/DEVOLVE (deferred to V2.2.2 where relevant)",
                "PHASE OUT / ELIMINATE (only if function unjustified)",
                "NEW capability",
                "HOLD",
            ],
            "disposition": fd["disposition"],
            "future_function": fd["legitimate_function"],
            "who_should_perform_it": "Institutional form deferred to V2.2.2 — function decided first",
            "government_roles": fd["roles"],
            "geographic_level_preliminary": fd["level"],
            "household_effect": fd["household"],
            "market_competition_effect": fd["market"],
            "ownership_implication": fd.get("investor_owner")
            or "No new public productive ownership implied by this F disposition alone",
            "administrative_effect": "Navigation/appeal/transparency implications for V2.2.3",
            "power_capture_effect": fd["power"],
            "known_dependencies": fd["see"],
            "evidence_blockers": ([fd["evidence_blocker"]] if fd.get("evidence_blocker") else [])
            + (readiness.get(hid, {}).get("remaining_unknowns") or []),
            "legal_questions_v2_4": fd["legal"],
            "fiscal_questions_v2_3": fd["fiscal"],
            "transition_questions_v2_5": "Sequencing after institutional map (V2.2.2) and funding (V2.3)",
            "confidence": fd["confidence"],
            "what_would_change_our_mind": fd["mind_change"],
            "v2_1_should_backlink": fd["see"],
            "burden_of_change": {
                "current_failure_misfit": fd["failure"],
                "expected_improvement": "Align function with CC roles and household/market/power tests",
                "transition_cost": "Deferred to institutional/operating passes — not assumed free",
                "reversibility": "Prefer reversible reforms; constitutional KEEP high bar",
            },
            "funding_requirement": "V2.3" if "V2.3" in fd["fiscal"] else "none_or_minimal_in_v2_2",
            "note": fd.get("note"),
        }
    )

# Dependency seeds (redesign)
redesign_deps = [
    {
        "id": "RD-DEP-001",
        "from": "expenditures.F REFORM",
        "requires": "public_data.F REFORM (functional spending visibility)",
        "then": "agencies.I possible consolidate",
    },
    {
        "id": "RD-DEP-002",
        "from": "healthcare.F / human_services.F REFORM depth",
        "requires": "UNK-FISC-001 all-funds federal share",
        "then": "V2.3 pricing / V2.2.3 process redesign",
    },
    {
        "id": "RD-DEP-003",
        "from": "pensions.F / intergenerational.F HOLD",
        "requires": "UNK-FISC-004 schedules",
        "then": "exit HOLD to KEEP or REFORM",
    },
    {
        "id": "RD-DEP-004",
        "from": "economic_development.F tool-level",
        "requires": "UNK-INST-004 deal registry",
        "then": "KEEP/ELIMINATE specific tools",
    },
    {
        "id": "RD-DEP-005",
        "from": "capital.F NEW instruments (if any later)",
        "requires": "eight-gate standard + V2.3 funding + V2.4 legal",
        "then": "possible institution — not in V2.2.1",
    },
    {
        "id": "RD-DEP-006",
        "from": "local_government.F KEEP",
        "requires": "per-function V2.2.2 subsidiarity tests",
        "then": "DEVOLVE/REGIONALIZE decisions without abolishing local democracy",
    },
]

pass_doc = {
    "version": "1.0.0",
    "slice_id": "CC-V2-2-1-GOVERNMENT-FUNCTION-DISPOSITION-1.0",
    "decision_id": DEC,
    "update_id": UPD,
    "v2_decision_id": V2DEC,
    "generated_at": TODAY,
    "status": "COMPLETE",
    "pass_id": "V2.2.1",
    "title": "Government Function Disposition",
    "gate": "V2.2",
    "epistemic_class": "REDESIGN_FUNCTION_NOT_FUNDING_NOT_LEGAL_FINAL",
    "governing_question": "What should government actually be responsible for?",
    "discipline": [
        "Every SHOULD points to V2.1 fact/flow/dependency/constraint/unknown",
        "Function first; institution second",
        "No funding design (V2.3)",
        "No final legal opinions (V2.4)",
        "No agency org-chart elegance for its own sake",
        "Burden of Change required",
        "KEEP is a success when earned",
        "HOLD / INSUFFICIENT EVIDENCE is legitimate",
        "Just-in-time blockers only",
    ],
    "disposition_vocabulary": DISPOSITIONS,
    "government_roles": ROLES,
    "investor_owner_rule": "INVESTOR/OWNER only under eight-gate standard (public purpose, legal authority, additionality, competitive neutrality, bounded risk, independent measurement, failure exit, anti-capture).",
    "families": FAMILIES,
    "disposition_counts": disp_counts,
    "progress": {
        "redesign_objects_closed": closed,
        "redesign_objects_total": total,
        "v2_2_percent": v22_pct,
        "v2_blueprint_percent": blueprint_pct,
        "f_objects_closed": 38,
        "i_objects_open": 38,
        "o_objects_open": 38,
    },
    "surfaces": {
        "pass": "/v2/redesign/function-disposition/",
        "hub": "/v2/redesign/",
        "what_changed": "/v2/redesign/what-changed/v2-2-1/",
        "disposition_map": "/v2/redesign/disposition-map/",
    },
    "next": "V2.2.2 — Institutional & Geographic Redesign (who performs functions)",
    "cards": cards,
    "redesign_dependency_graph_seed": redesign_deps,
    "should_rule": "Every should in V2.2 must point backward to a V2.1 fact, flow, dependency, constraint, or explicitly acknowledged unknown.",
}
dump("data/project/cc_v2_2_1_government_function_disposition.json", pass_doc)

hub = {
    "version": "1.0.0",
    "slice_id": "CC-V2-2-REDESIGN-ARKANSAS-1.0",
    "decision_id": DEC,
    "update_id": UPD,
    "generated_at": TODAY,
    "status": "IN_PROGRESS",
    "gate": "V2.2",
    "title": "REDESIGN ARKANSAS",
    "governing_question": (
        "Given how Arkansas actually works today, what should we KEEP, REFORM, CONSOLIDATE, DEVOLVE, "
        "REGIONALIZE, PHASE OUT, ELIMINATE, or create NEW under Constitutional Capitalism?"
    ),
    "should_rule": pass_doc["should_rule"],
    "disposition_vocabulary": DISPOSITIONS,
    "passes": [
        {
            "id": "V2.2.1",
            "name": "Government Function Disposition",
            "status": "COMPLETE",
            "href": "/v2/redesign/function-disposition/",
            "what_changed": "/v2/redesign/what-changed/v2-2-1/",
            "exit": "What should government be responsible for? Roles + preliminary disposition for 38 homes.",
        },
        {
            "id": "V2.2.2",
            "name": "Institutional & Geographic Redesign",
            "status": "NEXT",
            "href": None,
            "exit": "Who performs functions — statewide/regional/local/market/multi-level.",
        },
        {
            "id": "V2.2.3",
            "name": "Program, Process & Administrative Redesign",
            "status": "QUEUED",
            "href": None,
            "exit": "Citizen/Business Friction Map — experience redesign inside functions.",
        },
        {
            "id": "V2.2.4",
            "name": "Whole-State Operating Model & Redesign Certification",
            "status": "QUEUED",
            "href": None,
            "exit": "CC Arkansas Operating Model join + orphan/contradiction tests.",
        },
    ],
    "progress": pass_doc["progress"],
    "object_model": "38 × F/I/O = 114 redesign objects",
    "see_certified": True,
    "see_href": "/v2/see-arkansas/",
}
dump("data/project/cc_v2_2_redesign_arkansas.json", hub)

changelog = {
    "version": "1.0.0",
    "pass_id": "V2.2.1",
    "pass_name": "Government Function Disposition",
    "decision_id": DEC,
    "update_id": UPD,
    "generated_at": TODAY,
    "status": "COMPLETE",
    "before_after": [
        {"label": "Gate", "before": "SEE CERTIFIED", "after": "REDESIGN IN_PROGRESS"},
        {"label": "Word SHOULD", "before": "forbidden in baseline", "after": "permitted with V2.1 backlink rule"},
        {"label": "Redesign objects", "before": "0/114", "after": f"{closed}/114 (all F)"},
        {"label": "V2.2", "before": "0%", "after": f"{v22_pct}%"},
        {"label": "V2 BLUEPRINT", "before": "25%", "after": f"{blueprint_pct}%"},
        {"label": "Funding design", "before": "—", "after": "0 (deferred V2.3)"},
        {"label": "Disposition map", "before": "—", "after": str(disp_counts)},
    ],
    "disposition_counts": disp_counts,
    "nothing_funded": True,
    "decisions_recorded": [V2DEC],
    "experience_links": [
        {"href": "/v2/redesign/function-disposition/", "label": "Function Disposition →"},
        {"href": "/v2/redesign/disposition-map/", "label": "Disposition Map →"},
        {"href": "/v2/redesign/", "label": "Redesign hub →"},
    ],
}
dump("data/project/pass_changelogs/v2_2_1.json", changelog)

# Decision register
reg = load("data/project/v2_decision_register.json")
if not any(d.get("id") == V2DEC for d in reg.get("decisions") or []):
    reg.setdefault("decisions", []).append(
        {
            "id": V2DEC,
            "date": TODAY,
            "title": "Open V2.2 and close V2.2.1 function dispositions for 38 homes",
            "decision": (
                "Lock disposition vocabulary; create 114 F/I/O redesign objects; complete all 38 Function "
                "dispositions with four-role tags and V2.1 backlinks. Institution/geography deferred to V2.2.2. "
                "No funding design. HOLD used where evidence blockers prevent responsible depth."
            ),
            "why": "Function first prevents agency-boundary redesign and instinctive 'should'.",
            "evidence": ["V2.1 SEE CERTIFIED", "four roles Pass 3.5", "eight gates", "X-Ray joins"],
            "alternatives_rejected": [
                "38 independent policy papers",
                "Institution-first agency reshuffle",
                "Invent tax replacements in V2.2",
                "Clear all eight blockers before starting",
            ],
            "could_reverse_if": "Hostile redesign orphan test finds function mis-specified — reopen F object only.",
            "v1_doctrine_impact": "NONE — applies v1 roles/gates to Arkansas SEE",
        }
    )
reg["decision_id"] = DEC
reg["update_id"] = UPD
dump("data/project/v2_decision_register.json", reg)

# Master plan / dials
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
plan["next_only"] = "V2.2.2 — Institutional & Geographic Redesign (who performs functions; GEO tests)."
plan["active_pass"] = "V2.2.1 COMPLETE → next V2.2.2"
plan["redesign"] = {
    "status": "IN_PROGRESS",
    "href": "/v2/redesign/",
    "object_model": "114 F/I/O",
    "disposition_vocabulary": DISPOSITIONS,
}
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
    "note": f"V2.2.1 complete. Redesign {closed}/114. Blueprint {blueprint_pct}%. Next: V2.2.2.",
    "href": "/v2/redesign/",
}
dump("data/project/completion_ladder_and_dashboard.json", ladder)

state = load("data/project/current_build_state.json")
state["decision_id"] = DEC
state["status"] = "v2_2_1_complete_v2_2_2_next"
state["next_action"] = "V2.2.2 — Institutional & Geographic Redesign"
state["v2_blueprint_percent"] = blueprint_pct
state["writing_focus"] = f"V2.2.1 COMPLETE. Blueprint {blueprint_pct}%. Function first. Next V2.2.2."
state["notes"] = [
    f"{DEC}/{UPD}: V2.2.1 function dispositions 38/38. Redesign {closed}/114. Blueprint {blueprint_pct}%."
] + [n for n in (state.get("notes") or []) if DEC not in str(n)]
dump("data/project/current_build_state.json", state)

bpreg = load("data/project/build_progress_registry.json")
bpreg["decision_id"] = DEC
bpreg["update_id"] = UPD
bpreg["next_objective"] = "V2.2.2 Institutional & Geographic Redesign — who performs functions."
bpreg["v2_blueprint"] = {"percent": blueprint_pct, "href": "/v2/redesign/"}
if not any(x.get("id") == DEC for x in bpreg.get("infrastructure_checkpoints") or []):
    bpreg.setdefault("infrastructure_checkpoints", []).append(
        {
            "id": DEC,
            "title": "V2.2.1 Government Function Disposition complete",
            "date": TODAY,
            "href": "/v2/redesign/what-changed/v2-2-1/",
        }
    )
dump("data/project/build_progress_registry.json", bpreg)

sg = load("data/project/stewardship_governance_v1.json")
sg["recommended_next_priority"] = {
    "lane": "V2_BLUEPRINT",
    "focus": "V2.2.2 Institutional & Geographic Redesign",
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
            "title": "V2.2.1 Government Function Disposition complete",
            "summary": (
                f"{DEC}: Opened REDESIGN. 38/38 function dispositions with four-role tags and V2.1 backlinks. "
                f"Redesign objects {closed}/114. Blueprint {blueprint_pct}%. No funding design. Next: V2.2.2."
            ),
            "public": True,
        }
    )
updates["last_updated"] = TODAY
dump("data/project/updates.json", updates)

rule_path = ROOT / ".cursor/rules/v2-doctrine-protection.mdc"
rule = rule_path.read_text(encoding="utf-8")
old = (
    "→ V2.1 SEE ARKANSAS — **CERTIFIED**  \n"
    "→ **NEXT:** V2.2 REDESIGN ARKANSAS"
)
new = (
    "→ V2.1 SEE ARKANSAS — **CERTIFIED**  \n"
    "→ V2.2 REDESIGN ARKANSAS — **ACTIVE**  \n"
    "→ V2.2.1 Government Function Disposition — **COMPLETE**  \n"
    "→ **NEXT:** V2.2.2 Institutional & Geographic Redesign"
)
if old in rule:
    rule_path.write_text(rule.replace(old, new), encoding="utf-8")
elif "V2.2.1 Government Function Disposition — **COMPLETE**" not in rule:
    rule_path.write_text(
        rule.replace(
            "→ **NEXT:** V2.2 REDESIGN ARKANSAS",
            "→ V2.2 REDESIGN ARKANSAS — **ACTIVE**  \n"
            "→ V2.2.1 Government Function Disposition — **COMPLETE**  \n"
            "→ **NEXT:** V2.2.2 Institutional & Geographic Redesign",
        ),
        encoding="utf-8",
    )

(ROOT / "reports/CC_V2_2_1_GOVERNMENT_FUNCTION_DISPOSITION_RETURN.md").write_text(
    f"""# V2.2.1 — Government Function Disposition — Return

**Decision:** {DEC} · **Update:** {UPD} · **V2-DEC:** {V2DEC}

## Verdict

COMPLETE. Function first. Institution second. Money later.

## Progress

- Redesign objects: **{closed}/114** (all F closed; I/O open)
- V2.2: **{v22_pct}%**
- Blueprint: **{blueprint_pct}%**
- Disposition counts: {disp_counts}

## Rule

Every SHOULD points backward to V2.1 evidence or acknowledged unknown.

## Next

V2.2.2 — Institutional & Geographic Redesign.
""",
    encoding="utf-8",
)

print(f"V2.2.1 COMPLETE {closed}/114 v22={v22_pct}% bp={blueprint_pct}% counts={disp_counts}")
