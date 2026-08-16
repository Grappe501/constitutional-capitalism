#!/usr/bin/env python3
"""CC-DEC-203 / UPD-216 — V2.2.3 Program, Process & Administrative Redesign.

Operating-system pass: how each function should work for the person using it
and the public servants operating it. Close 38 O objects. No tech build,
no budgets, no implementation manuals. Redesign certification deferred to V2.2.4.
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TODAY = "2026-08-16"
DEC = "CC-DEC-203"
UPD = "UPD-216"
V2DEC = "V2-DEC-017"

PROCESS_GRAMMAR = [
    "DISCOVER",
    "APPLY / REQUEST",
    "VERIFY",
    "DECIDE",
    "EXPLAIN",
    "DELIVER",
    "REVIEW / APPEAL",
    "CLOSE",
]

ADMIN_LAYERS = ["POLICY", "RULE", "PROCESS", "EXPERIENCE"]

LIFE_EVENTS = {
    "household": [
        "Have a child",
        "Enroll a child in school",
        "Lose a job",
        "Become disabled",
        "Care for an aging parent",
        "Need healthcare",
        "Buy/rent a home",
        "Move",
        "Retire",
    ],
    "productive": [
        "Start a business",
        "Hire someone",
        "Build something",
        "Farm",
        "Obtain a professional license",
        "Expand a facility",
        "Export a product",
    ],
    "civic": [
        "Register/vote",
        "See how money was spent",
        "Request a record",
        "Challenge a decision",
        "Participate in government",
    ],
}

PUBLIC_SERVICE_OPERATING_STANDARD = [
    "What am I trying to do?",
    "Where do I start?",
    "What information does government need?",
    "Why does it need it?",
    "Who makes the decision?",
    "How long should it take?",
    "What is happening while I wait?",
    "Why was this decision made?",
    "What can I do if it is wrong?",
    "Who is accountable?",
]

LOCKED_PRINCIPLES = {
    "citizen_not_org_chart": "A citizen should not need to understand the organizational chart of government to receive a legitimate public service.",
    "one_arkansas_front_door": "Citizen-facing service layer over institutional architecture — not necessarily one giant agency. Concept only; no tech procurement.",
    "tell_government_once": "Reuse verified information where lawful, secure, appropriate, and consent-compatible.",
    "data_reuse_counter_rule": "Data reuse does not imply unrestricted data access.",
    "public_decision_receipt": "Consequential interactions produce a standardized Public Decision Receipt.",
    "no_black_box": "Consequential decisions require explainable authority→rule→input→decision→reason→institution→appeal chain.",
    "citizen_time_tax": "Administrative burden consumes household prosperity even when no money changes hands.",
    "business_friction_test": "Does this burden accomplish a legitimate purpose proportionate to its cost?",
    "complexity_budget": "Every new requirement spends citizen/business/staff/data/appeal/technology/compliance burden.",
    "rural_equivalence": "Does this work for someone 45 minutes from the nearest service center with unreliable broadband?",
    "accessibility_architecture": "Good default design reduces unnecessary exceptional treatment; accommodations handle what remains.",
    "graceful_failure": "Systems must degrade to a less convenient but still functional pathway.",
    "no_tech_architecture": True,
    "no_program_budgets": True,
    "no_implementation_manuals": True,
    "funding_invented": 0,
    "redesign_certification": "DEFERRED_TO_V2_2_4",
}

RECEIPT_FIELDS = [
    "WHAT HAPPENED",
    "WHO DECIDED",
    "WHAT RULE APPLIED",
    "WHAT INFORMATION WAS USED",
    "RESULT",
    "WHY",
    "WHAT HAPPENS NEXT",
    "IF YOU DISAGREE",
    "DEADLINE",
]

DATA_REUSE_CONTROLS = [
    "purpose limitation",
    "minimum necessary access",
    "access logging",
    "retention rules",
    "citizen visibility",
    "correction rights",
    "sensitive-data separation",
    "legal authorization",
]

RULE_REVIEW_CLASSES = [
    "PERMANENT FOUNDATION",
    "PERIODIC REVIEW",
    "TRIGGERED REVIEW",
    "SUNSET UNLESS RENEWED",
]


def load(rel: str):
    return json.loads((ROOT / rel).read_text(encoding="utf-8"))


def dump(rel: str, obj):
    path = ROOT / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(obj, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


plan = load("data/project/cc_v2_master_build_plan.json")
objects = load("data/project/cc_v2_2_redesign_objects.json")
fpass = load("data/project/cc_v2_2_1_government_function_disposition.json")
ipass = load("data/project/cc_v2_2_2_institutional_geographic_redesign.json")
labels = {d["id"]: d.get("label") for d in plan["operating_system_inventory"]["domains"]}
f_by = {c["home_id"]: c for c in fpass["cards"]}
i_by = {c["home_id"]: c for c in ipass["cards"]}
families = fpass["families"]

# Per-home operating overlays (Wave A–D condensed). Defaults fill the rest.
O_SPEC: dict[str, dict] = {}


def put(hid: str, **kwargs):
    O_SPEC[hid] = kwargs


# Defaults applied when a field is omitted
DEFAULT_ACCESSIBILITY = "Defaults assume vision/hearing/mobility/cognition/literacy/language/tech/transport variation; accommodations for remainder."
DEFAULT_RURAL = "Digital-first not digital-only; regionalization must not dump travel/time cost onto households; phone/mail/in-person pathway required."
DEFAULT_FAILURE = "Degrade to staffed/phone/mail/in-person path when web/AI/data/staff/hazard conditions fail; never silent dead-end."
DEFAULT_DATA = "Tell-once where lawful + consent-compatible; purpose limitation; min necessary; logging; retention; citizen visibility/correction; sensitive separation."
DEFAULT_SAFEGUARDS = "Split rulemaking / decision / appeal where Role Conflict risk; publish decision authority; anti-capture on eligibility/procurement/incentives."

# --- 38 O overlays ---

put(
    "constitutional_structure",
    users=["Citizens", "Legislature", "Courts"],
    purpose="Keep constitutional change and interpretation comprehensible and usable.",
    entry="Civic Front Door → Constitution / amendment / court pathways",
    life_events=["Participate in government", "Challenge a decision"],
    decision_authority="Voters (amendment) / courts (interpretation) per constitution",
    information="Ballot titles, amendment text, published opinions",
    delivery="Public text + election/court process",
    explain="Plain-language ballot explanations + authoritative text",
    appeal="Judicial review / subsequent amendment",
    time_tax="Ballot complexity and petition burden are Citizen Time Tax",
    business=None,
    outputs=["Amendments proposed/passed", "Opinions published"],
    outcomes=["Agency (civic)", "Trust/accountability evidence"],
    fiscal="V2.3: civic information capacity",
    legal="V2.4: ballot title due process",
    transition="V2.5: none beyond clarity",
    confidence="HIGH",
    mind_change="If amendment pathways become elite-only in practice",
    review_class="PERMANENT FOUNDATION",
)

put(
    "revenue",
    users=["Taxpayers", "Employers", "Local collectors"],
    purpose="Collect lawful revenue with comprehensible rules and visible status.",
    entry="Front Door → Pay / file / appeal tax",
    life_events=["Start a business", "Hire someone", "Buy/rent a home", "Retire"],
    decision_authority="DFA/Revenue + local collectors; independent appeal",
    information="Identity, income/base facts already on file where lawful",
    delivery="Electronic filing + local payment; receipt always",
    explain="Assessment notice = Public Decision Receipt fields",
    appeal="Independent tax appeal path with deadline",
    time_tax="Duplicate filings and unclear collectors are Time Tax / Business Friction",
    business="Tax compliance friction ledger: steps, institutions, latency, fees",
    outputs=["Returns filed", "Collections", "Appeals resolved"],
    outcomes=["Household Cost/Time/Agency", "Business Formation friction"],
    fiscal="V2.3: rates/structure later — not here",
    legal="V2.4: appeal statute clarity",
    transition="V2.5: portal consolidation after I shared-services",
    confidence="MEDIUM",
    mind_change="If tell-once proves unlawful for major tax bases",
    review_class="PERIODIC REVIEW",
)

put(
    "expenditures",
    users=["Citizens", "Legislature", "Agencies"],
    purpose="Make functional public spending visible and outcome-linked.",
    entry="Civic Front Door → See how money was spent",
    life_events=["See how money was spent", "Participate in government"],
    decision_authority="Legislature appropriates; agencies execute; audits measure",
    information="Functional chart of accounts (depends public_data)",
    delivery="Public expenditure explorer by function/place where feasible",
    explain="Appropriation and allotment decisions documented",
    appeal="Political + audit pathways; bid protests where procurement",
    time_tax="Opacity forces citizen research Time Tax",
    business="Vendor payment latency on Business Friction Ledger",
    outputs=["Dollars by function", "Audit findings"],
    outcomes=["Government Trust/accountability", "Household Agency"],
    fiscal="V2.3: full fiscal join",
    legal="V2.4: disclosure mandates",
    transition="V2.5: publish functional views",
    confidence="HIGH",
    mind_change="If functional visibility proves technically impossible without fabricating",
    review_class="PERIODIC REVIEW",
)

put(
    "agencies",
    users=["Citizens", "Businesses", "Public servants"],
    purpose="Operate mission agencies behind a coherent citizen experience layer.",
    entry="One Arkansas Front Door → need recognition → route to mission owner",
    life_events=["Challenge a decision", "Request a record"] + LIFE_EVENTS["household"][:3],
    decision_authority="Program owner agency; shared services do not own appeals",
    information="Reuse identity/eligibility packets across programs where lawful",
    delivery="Agency program units + shared interface",
    explain="Receipt names program owner, not only portal brand",
    appeal="Independent of program office where rights affected",
    time_tax="Duplicate portals/applications are primary Time Tax target",
    business="Multi-agency licensing maze on Business Friction Ledger",
    outputs=["Cases closed", "Shared-service SLAs"],
    outcomes=["Access", "Timeliness", "Appeal", "Trust"],
    fiscal="V2.3: shared services cost",
    legal="V2.4: delegation + appeal independence",
    transition="V2.5: phase shared interface after I consolidate",
    confidence="MEDIUM",
    mind_change="If consolidation of interface worsens specialized capability",
    review_class="PERIODIC REVIEW",
)

put(
    "education",
    users=["Families", "Students", "Districts", "Educators"],
    purpose="Make enrollment, transfers, supports, and appeals navigable without org-chart literacy.",
    entry="Front Door → Enroll / transfer / support a learner",
    life_events=["Enroll a child in school", "Have a child", "Move"],
    decision_authority="Local district for delivery; state for floors; coop for specialty capacity",
    information="Student records reuse across district transfer with privacy controls",
    delivery="Local schools + regional specialty",
    explain="Placement/IEP/discipline decisions produce receipts where consequential",
    appeal="Local → state → courts as rights require",
    time_tax="Enrollment/transfer paperwork and travel to specialty services",
    business=None,
    outputs=["Enrollment", "Graduates", "Specialy service access"],
    outcomes=["Capability", "Time", "Agency", "Place Access"],
    fiscal="V2.3: adequacy/formula",
    legal="V2.4: adequacy litigation envelope",
    transition="V2.5: enrollment front door",
    confidence="MEDIUM",
    mind_change="If local boards cannot remain accountable under regional capacity",
    review_class="PERIODIC REVIEW",
)

put(
    "healthcare",
    users=["Patients", "Families", "Providers"],
    purpose="Get care/coverage decisions without forcing households to integrate payers and agencies.",
    entry="Front Door → Need healthcare / coverage / public health",
    life_events=["Need healthcare", "Have a child", "Become disabled", "Care for an aging parent"],
    decision_authority="State eligibility floors; providers deliver; regional hubs for specialty",
    information="Eligibility reuse across related programs where lawful; clinical data purpose-limited",
    delivery="Market/clinic + regional specialty + local public health",
    explain="Coverage denials/approvals = Public Decision Receipt",
    appeal="Independent eligibility appeal; clinical grievance paths",
    time_tax="Travel to hubs + eligibility maze = Time Tax (rural critical)",
    business="Provider enrollment/credentialing on Business Friction Ledger",
    outputs=["Enrollments", "Claims", "Clinic visits"],
    outcomes=["Security", "Cost", "Time", "Access"],
    fiscal="V2.3 after UNK-FISC-001 depth",
    legal="V2.4: Medicaid/appeal",
    transition="V2.5: coverage front door — not EHR mega-build",
    confidence="MEDIUM",
    mind_change="If regional hubs lack accountability pathway",
    review_class="PERIODIC REVIEW",
    blocker="UNK-FISC-001",
)

put(
    "justice",
    users=["Litigants", "Victims", "Accused", "Counsel"],
    purpose="Make court access, counsel, and case status comprehensible.",
    entry="Front Door → Court / counsel / records / specialty docket",
    life_events=["Challenge a decision", "Request a record"],
    decision_authority="Judges/prosecutors/defense per role separation",
    information="Case filings; identity verification; counsel appointment facts",
    delivery="Local trial + regional specialty capacity",
    explain="Orders and charging decisions with reasons where due process requires",
    appeal="Appellate review",
    time_tax="Travel to specialty dockets + counsel deserts",
    business="Licensing/court-related business filings friction where relevant",
    outputs=["Cases disposed", "Counsel appointments"],
    outcomes=["Rights floors", "Timeliness", "Trust"],
    fiscal="V2.3: counsel/specialty capacity",
    legal="V2.4: counsel rights",
    transition="V2.5: case-status visibility",
    confidence="MEDIUM",
    mind_change="If regional specialty worsens access without transport remedy",
    review_class="PERMANENT FOUNDATION",
)

put(
    "local_government",
    users=["Residents", "Local officials"],
    purpose="Keep local democracy usable: permits, meetings, services without state portal capture.",
    entry="Local Front Door (city/county) federated under statewide standards for receipts/appeals",
    life_events=["Buy/rent a home", "Build something", "Participate in government", "Move"],
    decision_authority="Local elected/administrative within state floors",
    information="Local property/identity; reuse with state where lawful",
    delivery="Local",
    explain="Permit/zoning decisions = receipts",
    appeal="Local board → courts; state only where rights floors",
    time_tax="Permit opacity and meeting access",
    business="Local permitting on Business Friction Ledger",
    outputs=["Permits", "Meetings held", "Services delivered"],
    outcomes=["Agency", "Place Access", "Trust"],
    fiscal="V2.3: local fiscal capacity (no unfunded devolution)",
    legal="V2.4: home rule / floors",
    transition="V2.5: federated local portals",
    confidence="HIGH",
    mind_change="If federation becomes forced metro government",
    review_class="PERMANENT FOUNDATION",
)

put(
    "housing",
    users=["Renters", "Buyers", "Builders", "Housing authorities"],
    purpose="Find, finance, and permit housing without multi-agency scavenger hunts.",
    entry="Front Door → Housing help / fair housing / permit path",
    life_events=["Buy/rent a home", "Move", "Have a child"],
    decision_authority="Local land-use; state fair-housing/floors; HA for targeted stock",
    information="Income/identity reuse for assistance; property records",
    delivery="Market production + local permitting + targeted public/nonprofit",
    explain="Assistance and enforcement decisions = receipts",
    appeal="Fair housing + local board + courts",
    time_tax="Permit delay + assistance application maze",
    business="Builder permitting friction ledger",
    outputs=["Units permitted", "Assistance cases"],
    outcomes=["Ownership", "Cost", "Security", "Time"],
    fiscal="V2.3: assistance/finance tools",
    legal="V2.4: fair housing",
    transition="V2.5: housing front door",
    confidence="MEDIUM",
    mind_change="If local devolution proceeds without funding/authority",
    review_class="PERIODIC REVIEW",
)

put(
    "land",
    users=["Owners", "Developers", "Farmers", "Assessors"],
    purpose="Clear land-use, assessment, and state-lands processes.",
    entry="Front Door → Land use / assessment / state lands",
    life_events=["Buy/rent a home", "Build something", "Farm"],
    decision_authority="Local planning; county assessment; state for state lands/floors",
    information="Parcel/cadastre reuse",
    delivery="Local + county + state stewards",
    explain="Zoning/assessment decisions = receipts",
    appeal="Boards of equalization / planning appeals / courts",
    time_tax="Assessment opacity; conflicting permits",
    business="Site control/permit friction",
    outputs=["Assessments", "Permits", "State land actions"],
    outcomes=["Ownership security", "Agency"],
    fiscal="V2.3: assessment capacity",
    legal="V2.4: property due process",
    transition="V2.5: parcel-linked status",
    confidence="MEDIUM",
    mind_change="If watershed coordination becomes unaccountable region",
    review_class="PERIODIC REVIEW",
)

put(
    "agriculture",
    users=["Farmers", "Processors", "Consumers"],
    purpose="Keep inspection, programs, and extension navigable for producers.",
    entry="Front Door → Farm / food safety / extension",
    life_events=["Farm", "Start a business", "Export a product"],
    decision_authority="State/federal program owners; extension delivery",
    information="Producer identity/licenses reuse",
    delivery="Market production + inspection + extension",
    explain="Enforcement and program decisions = receipts",
    appeal="Administrative + judicial",
    time_tax="Program navigation for small producers",
    business="Ag licensing/reporting friction ledger",
    outputs=["Inspections", "Program enrollments"],
    outcomes=["Productive Capacity", "Resilience", "Security"],
    fiscal="V2.3: extension/inspection capacity",
    legal="V2.4: food safety authority",
    transition="V2.5: producer front door",
    confidence="HIGH",
    mind_change="If capture by incumbents blocks new entrants",
    review_class="PERIODIC REVIEW",
)

put(
    "energy",
    users=["Households", "Businesses", "Utilities"],
    purpose="Comprehensible bills, outage status, and regulatory decisions.",
    entry="Front Door → Utility issue / assistance / PSC matter",
    life_events=["Move", "Need healthcare", "Start a business", "Expand a facility"],
    decision_authority="PSC/referee; utilities deliver",
    information="Account identity; assistance eligibility reuse where lawful",
    delivery="IOU/coop/muni",
    explain="Rate/case decisions public; disconnection rules explained",
    appeal="PSC complaint / courts",
    time_tax="Bill complexity; outage unknown status",
    business="Interconnection/permit friction",
    outputs=["Complaints resolved", "Outage minutes"],
    outcomes=["Cost", "Security", "Resilience"],
    fiscal="V2.3: assistance/programs if any",
    legal="V2.4: PSC authority",
    transition="V2.5: status visibility standards",
    confidence="MEDIUM",
    mind_change="If referee independence fails capture test",
    review_class="PERIODIC REVIEW",
)

put(
    "water",
    users=["Households", "Utilities", "Farmers"],
    purpose="Safe water access with visible quality, rates, and regional system status.",
    entry="Front Door → Water quality / service / assistance",
    life_events=["Buy/rent a home", "Farm", "Build something"],
    decision_authority="State primacy for quality; local/regional utilities deliver",
    information="Service address; quality reports public",
    delivery="Local/regional systems",
    explain="Boil advisories and enforcement = receipts/alerts",
    appeal="Utility board + state + courts",
    time_tax="System failure risk and rate shock communication",
    business="Connection/expansion friction",
    outputs=["Violations", "Connections", "Advisories"],
    outcomes=["Security", "Health", "Place Resilience"],
    fiscal="V2.3: regional system finance",
    legal="V2.4: SDWA primacy",
    transition="V2.5: quality/status alerts",
    confidence="MEDIUM",
    mind_change="If regional authorities lack local representation",
    review_class="PERIODIC REVIEW",
)

put(
    "transportation",
    users=["Travelers", "Freight", "Local governments"],
    purpose="Project status, permits, and transit access without black-box selection.",
    entry="Front Door → Roads / permits / transit / project status",
    life_events=["Move", "Build something", "Expand a facility", "Farm"],
    decision_authority="ARDOT/MPO/local per layer",
    information="Project records public; permit applications",
    delivery="State highways + local streets + regional transit",
    explain="Major awards and route decisions documented",
    appeal="Administrative + political + legal",
    time_tax="Travel time to services is rural Time Tax",
    business="Oversize/access permits friction",
    outputs=["Lane-miles", "Projects completed", "Transit trips"],
    outcomes=["Access", "Connectivity", "Time"],
    fiscal="V2.3: capital program",
    legal="V2.4: ROW/procurement",
    transition="V2.5: project status public grammar",
    confidence="HIGH",
    mind_change="If corridor regionalization removes public process",
    review_class="PERIODIC REVIEW",
)

put(
    "digital_infrastructure",
    users=["Households", "ISPs", "Communities"],
    purpose="Coverage, grants, and complaints with rural-equivalent pathways.",
    entry="Front Door → Broadband access / grant / complaint",
    life_events=["Move", "Start a business", "Enroll a child in school"],
    decision_authority="State broadband program + referee; market/coop deliver",
    information="Address eligibility; coverage maps",
    delivery="Market/coop last-mile; regional middle-mile",
    explain="Grant awards = Public Deal / Decision Receipt fields",
    appeal="Program appeal + procurement protest",
    time_tax="Unreliable broadband forces travel Time Tax for other services",
    business="ROW/permit friction for builds",
    outputs=["Locations served", "Grant milestones"],
    outcomes=["Connectivity", "Agency", "Productive Capacity"],
    fiscal="V2.3: program spend under eight gates",
    legal="V2.4: authority for public builds",
    transition="V2.5: coverage+complaint front door",
    confidence="MEDIUM",
    mind_change="If public builds lock out competition without exit",
    review_class="TRIGGERED REVIEW",
)

put(
    "labor",
    users=["Workers", "Employers", "Training providers"],
    purpose="Jobs, UI, safety, and training without multi-program scavenger hunts.",
    entry="Front Door → Lose a job / hire / train / workplace rights",
    life_events=["Lose a job", "Hire someone", "Become disabled", "Obtain a professional license"],
    decision_authority="State labor/workforce; regional boards for labor-market geography",
    information="Work history/UI eligibility reuse where lawful",
    delivery="Employers + local providers + regional boards",
    explain="UI and enforcement decisions = receipts",
    appeal="UI appeals; safety appeals",
    time_tax="Program maze after job loss",
    business="Hiring/reporting friction ledger",
    outputs=["UI claims", "Placements", "Inspections"],
    outcomes=["Income", "Security", "Time", "Productive Capacity"],
    fiscal="V2.3: UI/trust funds later",
    legal="V2.4: worker rights",
    transition="V2.5: job-loss life-event package",
    confidence="MEDIUM",
    mind_change="If regional boards captured by incumbents",
    review_class="PERIODIC REVIEW",
)

put(
    "capital",
    users=["Entrepreneurs", "CDFIs", "Investors"],
    purpose="Transparent public capital tools under eight gates — market primary.",
    entry="Front Door → Capital access / public instrument (if any)",
    life_events=["Start a business", "Expand a facility", "Farm"],
    decision_authority="Regulators + any public instrument board under eight gates",
    information="Business identity; disclose public deals",
    delivery="Market + CDFI; public exceptional",
    explain="Public awards = Public Deal Ledger + Decision Receipt",
    appeal="Program appeal; securities processes",
    time_tax="Opaque incentive capital wastes applicant time",
    business="Core Business Friction / Deal Ledger",
    outputs=["Deals disclosed", "Gate checklists completed"],
    outcomes=["Formation", "Competition", "Ownership"],
    fiscal="V2.3: any public capital priced then",
    legal="V2.4: authority for instruments",
    transition="V2.5: after UNK-INST-004 registry",
    confidence="MEDIUM",
    mind_change="If eight gates cannot be operationalized",
    review_class="TRIGGERED REVIEW",
    blocker="UNK-INST-004",
)

put(
    "banking",
    users=["Consumers", "Banks", "Credit unions"],
    purpose="Consumer protection and charter processes with clear complaints.",
    entry="Front Door → Banking complaint / charter matter",
    life_events=["Buy/rent a home", "Start a business", "Retire"],
    decision_authority="State banking dept within federal frame",
    information="Complaint facts; exam confidential where law requires",
    delivery="Market banks/CUs",
    explain="Enforcement actions public as law allows",
    appeal="Administrative + judicial",
    time_tax="Credit desert travel/time",
    business="Charter/exam friction proportionate to safety",
    outputs=["Complaints", "Exams"],
    outcomes=["Security", "Ownership", "Competition"],
    fiscal="V2.3: exam capacity",
    legal="V2.4: dual banking",
    transition="V2.5: complaint front door",
    confidence="HIGH",
    mind_change="If examiner capture evidenced",
    review_class="PERMANENT FOUNDATION",
)

put(
    "business_formation",
    users=["Entrepreneurs", "Licensees"],
    purpose="One-door formation: discover → apply → verify → decide → receipt.",
    entry="Front Door → Start a business / license",
    life_events=["Start a business", "Obtain a professional license", "Hire someone", "Expand a facility"],
    decision_authority="Secretary of State + specialized boards behind portal",
    information="Tell-once identity/entity packet across licenses",
    delivery="State portal + local permits federated",
    explain="License grant/deny = Public Decision Receipt",
    appeal="Board appeal + courts",
    time_tax="Primary Business Friction reduction target",
    business="Steps/institutions/duplication/latency ledger",
    outputs=["Entities formed", "Licenses issued", "Time-to-license"],
    outcomes=["Formation", "Competition", "Time"],
    fiscal="V2.3: portal shared services",
    legal="V2.4: board authorities preserved",
    transition="V2.5: consolidate front door (from I CONSOLIDATE)",
    confidence="HIGH",
    mind_change="If one door becomes gatekeeper without appeal",
    review_class="PERIODIC REVIEW",
)

put(
    "procurement",
    users=["Vendors", "Agencies", "Citizens"],
    purpose="Public need → competition → award → performance → public record.",
    entry="Front Door → Sell to government / protest / contract status",
    life_events=["Start a business", "Expand a facility", "See how money was spent"],
    decision_authority="OSP/agency buyers; independent protest path",
    information="Vendor registration reuse; specs public",
    delivery="Shared procurement capacity + agency execution",
    explain="Awards on Public Deal Ledger + Decision Receipt fields",
    appeal="Protest/appeal with deadlines",
    time_tax="Opaque bids waste vendor time",
    business="Core Business Friction Ledger",
    process_chain=[
        "PUBLIC NEED",
        "specification",
        "market discovery",
        "competition/allowed exception",
        "award",
        "contract",
        "performance",
        "payment",
        "outcome",
        "public record",
    ],
    outputs=["Awards", "Protests", "Performance scores"],
    outcomes=["Competition", "Cost", "Trust"],
    fiscal="V2.3: procurement savings measurement",
    legal="V2.4: procurement code",
    transition="V2.5: deal ledger publish",
    confidence="HIGH",
    mind_change="If central buyer capture worsens outcomes",
    review_class="PERIODIC REVIEW",
)

put(
    "economic_development",
    users=["Communities", "Firms", "Workers"],
    purpose="Public purpose → agreement → milestones → outcome; not silent gifts.",
    entry="Front Door → Site / incentive inquiry (disclosed)",
    life_events=["Start a business", "Expand a facility", "Hire someone", "See how money was spent"],
    decision_authority="State standards/referee; regional partnerships; local site work",
    information="Deal registry public (UNK-INST-004 dependency)",
    delivery="Market firms; public contribution only under gates",
    explain="Every material deal = Public Deal Ledger + Receipt",
    appeal="Protest/FOIA/political",
    time_tax="Opaque chase wastes community time",
    business="Incentive application friction vs purpose test",
    process_chain=[
        "PUBLIC PURPOSE",
        "eligibility",
        "application",
        "evaluation",
        "decision",
        "agreement",
        "public contribution",
        "recipient contribution",
        "milestones",
        "performance",
        "clawback/exit",
        "outcome",
    ],
    outputs=["Deals disclosed", "Milestones met", "Clawbacks"],
    outcomes=["Formation", "Retention", "Competition", "Trust"],
    fiscal="V2.3: incentive fiscal design",
    legal="V2.4: authority/clawback",
    transition="V2.5: after deal registry",
    confidence="MEDIUM",
    mind_change="If disclosure destroys legitimate negotiation without redesign",
    review_class="TRIGGERED REVIEW",
    blocker="UNK-INST-004",
    note="Giving money is an event; public investment requires theory of return + accountability.",
)

put(
    "pensions",
    users=["Members", "Retirees", "Employers", "Taxpayers"],
    purpose="Member-facing status and fiduciary decisions comprehensible; deep redesign HOLD.",
    entry="Front Door → Retirement account / estimate / appeal",
    life_events=["Retire", "Lose a job", "Care for an aging parent"],
    decision_authority="Statewide system trustees/boards",
    information="Service/salary records; schedule transparency pending UNK-FISC-004",
    delivery="Statewide systems",
    explain="Benefit determinations = receipts",
    appeal="Administrative + judicial",
    time_tax="Estimate opacity",
    business="Employer reporting friction",
    outputs=["Estimates issued", "Appeals"],
    outcomes=["Security", "Ownership", "Intergenerational honesty"],
    fiscal="V2.3 after UNK-FISC-004",
    legal="V2.4: fiduciary duties",
    transition="V2.5: member portal clarity — not funding redesign",
    confidence="LOW",
    mind_change="When schedules known — reopen depth",
    review_class="PERIODIC REVIEW",
    blocker="UNK-FISC-004",
    hold_complete=True,
)

put(
    "public_assets",
    users=["Agencies", "Citizens", "Lessees"],
    purpose="Inventory, surplus, and lease decisions with public record.",
    entry="Front Door → Public property / surplus / lease",
    life_events=["See how money was spent", "Start a business", "Build something"],
    decision_authority="Owner agency under statewide inventory standards",
    information="Asset registry",
    delivery="Owner stewardship + market lease under rules",
    explain="Surplus/lease awards = receipts / deal ledger",
    appeal="Administrative + FOIA + courts",
    time_tax="Unknown inventory wastes inquiry time",
    business="Lease opportunity friction",
    outputs=["Assets inventoried", "Surplus disposed"],
    outcomes=["Trust", "Cost", "Ownership (public)"],
    fiscal="V2.3: asset valuation",
    legal="V2.4: surplus process",
    transition="V2.5: inventory publish",
    confidence="MEDIUM",
    mind_change="If silent privatization pathway appears",
    review_class="PERIODIC REVIEW",
)

put(
    "natural_resources",
    users=["Public", "Industry", "Landowners"],
    purpose="Permits and stewardship with watershed-aware process grammar.",
    entry="Front Door → Resource permit / recreation / enforcement",
    life_events=["Farm", "Build something", "Participate in government"],
    decision_authority="State agencies; regional resource units",
    information="Location/resource facts; public comment record",
    delivery="Market operators under referee",
    explain="Permit decisions = receipts",
    appeal="Administrative + courts",
    time_tax="Conflicting local/state permits",
    business="Extraction/recreation permit friction vs purpose",
    outputs=["Permits", "Monitoring"],
    outcomes=["Resilience", "Public trust"],
    fiscal="V2.3: stewardship capacity",
    legal="V2.4: public trust doctrines",
    transition="V2.5: permit status grammar",
    confidence="MEDIUM",
    mind_change="If regional units unaccountable",
    review_class="PERIODIC REVIEW",
)

put(
    "federal_dependency",
    users=["Agencies", "Legislature", "Citizens"],
    purpose="All-funds visibility so citizens see federal/state joins.",
    entry="Civic Front Door → Federal funds by function",
    life_events=["See how money was spent"],
    decision_authority="Statewide coordination for visibility; programs remain mission-owned",
    information="Grant awards and CFDA-like identifiers",
    delivery="Publication layer",
    explain="Major acceptances documented",
    appeal="Political/FOIA",
    time_tax="Hidden federal share forces research Time Tax",
    business=None,
    outputs=["All-funds reports"],
    outcomes=["Trust", "Agency"],
    fiscal="V2.3 blocked in depth by UNK-FISC-001",
    legal="V2.4: reporting mandates",
    transition="V2.5: publish after map",
    confidence="MEDIUM",
    mind_change="When UNK-FISC-001 resolved",
    review_class="TRIGGERED REVIEW",
    blocker="UNK-FISC-001",
)

put(
    "household_economics",
    users=["Citizens", "Policymakers"],
    purpose="Publish household-lens measures; not a benefits agency.",
    entry="Civic Front Door → Household prosperity measures",
    life_events=["See how money was spent", "Participate in government"],
    decision_authority="Statistical/measurement home independent of program PR",
    information="Public statistics; privacy floors",
    delivery="Dashboards by state/county where valid",
    explain="Methodology cards public",
    appeal="Method critique / correction process",
    time_tax="Agency optics force citizens to reverse-engineer outcomes",
    business=None,
    outputs=["Dashboards published"],
    outcomes=["Income", "Cost", "Security", "Ownership", "Time", "Agency"],
    fiscal="V2.3: measurement capacity",
    legal="V2.4: privacy",
    transition="V2.5: public outcome ledger join",
    confidence="HIGH",
    mind_change="If measures become allocation weapons without rules",
    review_class="PERIODIC REVIEW",
)

put(
    "demographics",
    users=["Public", "Agencies", "Researchers"],
    purpose="Honest population facts with county truth.",
    entry="Civic Front Door → Demographics",
    life_events=["See how money was spent", "Participate in government"],
    decision_authority="Statistical office",
    information="Census/state estimates; microdata protected",
    delivery="Publication",
    explain="Method notes",
    appeal="Correction process",
    time_tax="Averages that hide place waste local advocacy time",
    business=None,
    outputs=["Estimates", "County tables"],
    outcomes=["Agency", "Place understanding"],
    fiscal="V2.3: statistical capacity",
    legal="V2.4: privacy",
    transition="V2.5: county twin join",
    confidence="HIGH",
    mind_change="If politicized allocation without rules",
    review_class="PERMANENT FOUNDATION",
)

put(
    "geographic_disparities",
    users=["Citizens", "Counties", "Policymakers"],
    purpose="Show place differences without ranking futures.",
    entry="Civic Front Door → Place differences / county twins",
    life_events=["Move", "See how money was spent", "Participate in government"],
    decision_authority="GEO measurement spine",
    information="V2-GEO-001 twins",
    delivery="Public twins; no opportunity portfolios",
    explain="Field notes and unknowns labeled",
    appeal="Data correction",
    time_tax="Statewide averages erase rural Time Tax reality",
    business=None,
    outputs=["Twins updated", "Unknowns listed"],
    outcomes=["Place Access/Capacity/Connectivity/Resilience"],
    fiscal="V2.3: none assigned by county future",
    legal="V2.4: none for portfolios",
    transition="V2.5: keep portfolios OFF until operating model ready",
    confidence="HIGH",
    mind_change="If used to pre-assign county economies",
    review_class="PERMANENT FOUNDATION",
    note="County Opportunity Portfolios remain OFF.",
)

put(
    "civic_institutions",
    users=["Nonprofits", "Libraries", "Associations"],
    purpose="Enable civic life without turning it into a ministry.",
    entry="Front Door → Civic grants / library / association (local-first)",
    life_events=["Participate in government", "Request a record"],
    decision_authority="Local/nonprofit; state enabling only",
    information="Grant applications where state funds",
    delivery="Local/coop/nonprofit",
    explain="Grant decisions = receipts",
    appeal="Grant appeal terms",
    time_tax="Grant navigation for small nonprofits",
    business=None,
    outputs=["Grants", "Library access metrics"],
    outcomes=["Agency", "Trust", "Capability"],
    fiscal="V2.3: enabling funds if any",
    legal="V2.4: association rights",
    transition="V2.5: light grant grammar",
    confidence="HIGH",
    mind_change="If state captures civic space",
    review_class="PERIODIC REVIEW",
)

put(
    "elections",
    users=["Voters", "Clerks", "Candidates"],
    purpose="Register, vote, and track ballots with equal rights floors.",
    entry="Front Door → Register / vote / ballot status",
    life_events=["Register/vote", "Move"],
    decision_authority="State standards; county clerks administer",
    information="Voter registration reuse on move where lawful",
    delivery="County administration",
    explain="Provisional/rejection reasons = receipt fields",
    appeal="Canvass/contest/courts",
    time_tax="Registration friction and polling access/travel",
    business=None,
    outputs=["Registration", "Turnout ops metrics", "Provisional rates"],
    outcomes=["Rights", "Trust", "Agency"],
    fiscal="V2.3: equipment/security",
    legal="V2.4: election code",
    transition="V2.5: ballot-status grammar",
    confidence="HIGH",
    mind_change="If centralization removes local admin accountability",
    review_class="PERMANENT FOUNDATION",
)

put(
    "direct_democracy",
    users=["Petitioners", "Voters"],
    purpose="Clear petition → title → ballot → result pathway.",
    entry="Front Door → Initiative / referendum",
    life_events=["Participate in government", "Challenge a decision"],
    decision_authority="Statutory process + courts on titles",
    information="Petition forms; signatures",
    delivery="Statewide pathway",
    explain="Title decisions reasoned",
    appeal="Courts",
    time_tax="Signature process complexity",
    business=None,
    outputs=["Petitions qualified", "Measures passed"],
    outcomes=["Agency", "Trust"],
    fiscal="V2.3: process capacity",
    legal="V2.4: title due process",
    transition="V2.5: petitioner guidance",
    confidence="HIGH",
    mind_change="If title gatekeeping becomes partisan capture",
    review_class="PERMANENT FOUNDATION",
)

put(
    "administrative_power",
    users=["Citizens", "Regulated parties", "Agencies"],
    purpose="APA grammar: discover rule → apply → decide → explain → appeal.",
    entry="Front Door → Challenge a decision / find the rule",
    life_events=["Challenge a decision", "Request a record", "Obtain a professional license"],
    decision_authority="Agency decision; independent appeal/ALJ where rights affected",
    information="Record of decision inputs",
    delivery="Agency + appeal body",
    explain="No Black Box — full chain required",
    appeal="Independent review + courts",
    time_tax="Unclear appeal paths",
    business="Regulatory process friction vs purpose test",
    outputs=["Rules published", "Appeals resolved", "Time-to-appeal"],
    outcomes=["Accuracy", "Appeal", "Trust"],
    fiscal="V2.3: hearing capacity",
    legal="V2.4: APA modernization",
    transition="V2.5: universal appeal discovery",
    confidence="HIGH",
    mind_change="If AI decisions skip disclosure requirements",
    review_class="PERMANENT FOUNDATION",
)

put(
    "public_data",
    users=["Citizens", "Agencies", "Journalists"],
    purpose="Request records and reuse open data under privacy floors.",
    entry="Front Door → Request a record / open data",
    life_events=["Request a record", "See how money was spent"],
    decision_authority="Custodian agencies; shared platform standards",
    information="Public records; privacy redaction rules",
    delivery="Shared platform + domain stewards",
    explain="Denial/redaction = receipt fields",
    appeal="FOIA appeal",
    time_tax="Fragmented portals",
    business="Data access for compliance reporting",
    outputs=["Requests fulfilled", "Datasets published"],
    outcomes=["Trust", "Agency", "Accuracy"],
    fiscal="V2.3: platform capacity",
    legal="V2.4: FOIA/privacy",
    transition="V2.5: consolidate platforms",
    confidence="HIGH",
    mind_change="If consolidation creates single point of opacity",
    review_class="PERIODIC REVIEW",
)

put(
    "ai",
    users=["Agencies", "Affected persons"],
    purpose="Any consequential AI assistance must satisfy No Black Box + disclosure — no AI agency invented.",
    entry="Front Door → Challenge automated/assisted decision",
    life_events=["Challenge a decision"],
    decision_authority="Agency remains responsible; provisional statewide policy floors",
    information="Input lineage retained as appropriate; inventory still UNKNOWN",
    delivery="Agency execution under floors",
    explain="AI assistance disclosed where consequential; human/institutional responsibility identifiable",
    appeal="Same as underlying program appeal",
    time_tax="Invisible automation increases error-correction Time Tax",
    business="Automated compliance tools must be explainable",
    outputs=["Disclosures", "Appeals involving AI assist"],
    outcomes=["Accuracy", "Appeal", "Trust"],
    fiscal="V2.3: none until inventory",
    legal="V2.4: automated decision due process",
    transition="V2.5: minimum inventory then deepen",
    confidence="LOW",
    mind_change="When inventory exists — refine architecture",
    review_class="TRIGGERED REVIEW",
    blocker="AI baseline inventory UNKNOWN",
    hold_complete=True,
    note="Administrative requirement for future AI — not an AI stack design.",
)

put(
    "emergency_government",
    users=["Public", "Local EM", "First responders"],
    purpose="Alerts, aid, and emergency powers with sunsets and after-action transparency.",
    entry="Front Door → Emergency alert / aid / after-action",
    life_events=["Need healthcare", "Lose a job", "Move"],
    decision_authority="Governor/local ICS per law; mutual aid regional",
    information="Situational; privacy in aid applications",
    delivery="Local ICS + regional mutual aid",
    explain="Declarations and aid decisions documented; sunsets visible",
    appeal="Aid eligibility appeal; political review of powers",
    time_tax="Unclear command and travel for specialty teams",
    business="Emergency procurement exceptions — still recorded",
    outputs=["Declarations", "AARs", "Aid cases"],
    outcomes=["Security", "Resilience", "Trust"],
    fiscal="V2.3: EM capacity",
    legal="V2.4: emergency powers bounds",
    transition="V2.5: alert+aid grammar",
    confidence="HIGH",
    mind_change="If emergency powers lack sunsets",
    review_class="SUNSET UNLESS RENEWED",
    note="Emergency mechanisms default toward sunset-unless-renewed class.",
)

put(
    "intergenerational_obligations",
    users=["Citizens", "Legislature"],
    purpose="Publish stewardship ledger; funding instruments later.",
    entry="Civic Front Door → Long-term obligations ledger",
    life_events=["See how money was spent", "Retire", "Participate in government"],
    decision_authority="Statewide stewardship home",
    information="Schedules pending UNK-FISC-004",
    delivery="Public ledger publication",
    explain="Methodology + unknowns labeled",
    appeal="Political/FOIA",
    time_tax="Invisible claims shift burden to future households",
    business=None,
    outputs=["Ledger editions"],
    outcomes=["Trust", "Intergenerational honesty"],
    fiscal="V2.3 after schedules",
    legal="V2.4: disclosure duties",
    transition="V2.5: publish partial ledger with unknowns",
    confidence="LOW",
    mind_change="When UNK-FISC-004 resolves",
    review_class="PERIODIC REVIEW",
    blocker="UNK-FISC-004",
    hold_complete=True,
)

put(
    "human_services",
    users=["Households", "Caseworkers", "Providers"],
    purpose="Life-event packages so households are not systems integrators.",
    entry="One Arkansas Front Door → life event (child/job loss/disability/aging/care)",
    life_events=[
        "Have a child",
        "Lose a job",
        "Become disabled",
        "Care for an aging parent",
        "Need healthcare",
        "Buy/rent a home",
    ],
    decision_authority="Program back-ends retain authority; front door routes/status",
    information="Tell-once eligibility packet with privacy counter-rules",
    delivery="Local/nonprofit delivery + state programs",
    explain="Eligibility decisions = Public Decision Receipt",
    appeal="Independent eligibility appeal",
    time_tax="Duplicate applications/eligibility = core Citizen Time Tax",
    business="Provider enrollment friction",
    outputs=["Cases", "Time-to-decision", "Repeat submissions"],
    outcomes=["Income", "Security", "Time", "Agency"],
    fiscal="V2.3 + UNK-FISC-001",
    legal="V2.4: eligibility appeals",
    transition="V2.5: life-event packages — not mega-agency",
    confidence="MEDIUM",
    mind_change="If front door becomes a new eligibility bottleneck without appeal",
    review_class="PERIODIC REVIEW",
    blocker="UNK-FISC-001",
    note="Single citizen-facing interface with multiple back-end functions — concept only.",
)

put(
    "insurance_and_risk",
    users=["Consumers", "Employers", "Insurers", "Public pools"],
    purpose="Navigate private lines and public pools without pretending one agency owns all risk.",
    entry="Front Door → Insurance complaint / UI-WC / disaster residual",
    life_events=["Lose a job", "Need healthcare", "Farm", "Start a business", "Become disabled"],
    decision_authority="DOI referee for private; statute for public pools",
    information="Policy/claim facts; purpose-limited",
    delivery="Market insurers + public pools",
    explain="Coverage decisions and enforcement = receipts",
    appeal="DOI/UI/WC appeal paths",
    time_tax="Coverage maze across related risks",
    business="Workers comp / unemployment reporting friction vs purpose",
    outputs=["Complaints", "Pool claims", "Solvency actions"],
    outcomes=["Security", "Cost", "Resilience"],
    fiscal="V2.3: pool funding later",
    legal="V2.4: insurance code",
    transition="V2.5: risk-type router in front door",
    confidence="MEDIUM",
    mind_change="If markets fail residual lines without statutory redesign",
    review_class="PERIODIC REVIEW",
)

assert set(O_SPEC) == set(labels), set(labels) ^ set(O_SPEC)

# Program purpose card template fields
PURPOSE_CARD_QUESTIONS = [
    "Why do we exist?",
    "Who is served/protected?",
    "What outcome are we trying to change?",
    "What authority permits us to act?",
    "What does it cost? → V2.3",
    "What do we measure?",
    "What would success look like?",
    "What would make us change?",
    "What would make us stop?",
]

OUTCOME_LEDGER_FAMILIES = {
    "household": ["Income", "Cost", "Security", "Ownership", "Time", "Agency"],
    "productive": ["Capacity", "Competition", "Formation", "Retention", "Resilience"],
    "government": ["Access", "Timeliness", "Accuracy", "Cost", "Appeal", "Trust/accountability evidence"],
    "place": ["Access", "Capacity", "Connectivity", "Resilience"],
}

before_after_visual = {
    "label": "PROPOSED MODEL — illustrative, not a claim that every current process was timed",
    "arkansas_now": [
        "Person",
        "website A",
        "form",
        "agency",
        "missing document",
        "second agency",
        "repeat data",
        "phone call",
        "waiting",
        "decision",
        "unclear reason",
    ],
    "cc_operating_model": [
        "Person",
        "Front Door",
        "need recognized",
        "authorized information reused",
        "responsible institutions coordinate",
        "status visible",
        "decision",
        "Public Decision Receipt",
        "service / appeal",
    ],
}

cards = []
for hid, spec in O_SPEC.items():
    fcard = f_by[hid]
    icard = i_by[hid]
    fam = fcard["family"]
    is_hold = bool(spec.get("hold_complete"))
    status = "HOLD-COMPLETE" if is_hold else "CLOSED"
    disposition = "OPERATING_MODEL_HOLD" if is_hold else "OPERATING_MODEL"

    card = {
        "home_id": hid,
        "label": labels[hid],
        "family": fam,
        "family_label": families[fam]["label"],
        "f_disposition": fcard["disposition"],
        "i_architecture": icard["architecture"],
        "i_structural_verb": icard["structural_verb"],
        "users": spec["users"],
        "purpose": spec["purpose"],
        "entry_point": spec["entry"],
        "life_events": spec["life_events"],
        "process_grammar": PROCESS_GRAMMAR,
        "special_process_chain": spec.get("process_chain"),
        "decision_authority": spec["decision_authority"],
        "information_required": spec["information"],
        "data_reuse_rules": DEFAULT_DATA,
        "delivery_mechanism": spec["delivery"],
        "decision_explanation": spec["explain"],
        "appeal_review": spec["appeal"],
        "citizen_time_implication": spec["time_tax"],
        "business_friction_implication": spec["business"],
        "accessibility": DEFAULT_ACCESSIBILITY,
        "rural_equivalence": DEFAULT_RURAL,
        "failure_pathway": DEFAULT_FAILURE,
        "output_measures": spec["outputs"],
        "outcome_measures": spec["outcomes"],
        "measurement_chain": [
            "INPUT",
            "ACTIVITY",
            "OUTPUT",
            "OBSERVED OUTCOME",
            "ATTRIBUTION CONFIDENCE",
        ],
        "power_capture_safeguards": DEFAULT_SAFEGUARDS,
        "admin_layers_separated": ADMIN_LAYERS,
        "rule_review_class": spec["review_class"],
        "program_purpose_card": PURPOSE_CARD_QUESTIONS,
        "public_decision_receipt": RECEIPT_FIELDS,
        "fiscal_question_v2_3": spec["fiscal"],
        "legal_question_v2_4": spec["legal"],
        "transition_dependency_v2_5": spec["transition"],
        "confidence": spec["confidence"],
        "what_changes_our_mind": spec["mind_change"],
        "evidence_blockers": [spec["blocker"]] if spec.get("blocker") else [],
        "note": spec.get("note"),
        "status": status,
        "disposition": disposition,
        "funding_invented": 0,
        "tech_architecture": None,
        "implementation_manual": None,
    }
    cards.append(card)

# Update O objects
obj_list = objects["objects"]
for o in obj_list:
    if o["type"] != "O":
        continue
    hid = o["home_id"]
    spec = O_SPEC[hid]
    is_hold = bool(spec.get("hold_complete"))
    o["status"] = "HOLD-COMPLETE" if is_hold else "CLOSED"
    o["disposition"] = "OPERATING_MODEL_HOLD" if is_hold else "OPERATING_MODEL"
    o["closed_by_pass"] = "V2.2.3"
    o["note"] = spec["purpose"]

closed = sum(1 for o in obj_list if o["status"] in ("CLOSED", "HOLD-COMPLETE"))
total = 114
assert closed == 114, closed
v22_pct = round(100.0 * closed / total, 1)
blueprint_pct = round(25.0 + 20.0 * (closed / total), 1)
assert v22_pct == 100.0
assert blueprint_pct == 45.0

f_c = sum(1 for o in obj_list if o["type"] == "F" and o["status"] in ("CLOSED", "HOLD-COMPLETE"))
i_c = sum(1 for o in obj_list if o["type"] == "I" and o["status"] in ("CLOSED", "HOLD-COMPLETE"))
o_c = sum(1 for o in obj_list if o["type"] == "O" and o["status"] in ("CLOSED", "HOLD-COMPLETE"))
hold_o = sum(1 for o in obj_list if o["type"] == "O" and o["status"] == "HOLD-COMPLETE")

objects.update(
    {
        "decision_id": DEC,
        "update_id": UPD,
        "generated_at": TODAY,
        "v2_2_completion_percent": v22_pct,
        "counts": {
            "total": total,
            "closed": closed,
            "open": 0,
            "by_type": {
                "F": {"closed": f_c, "open": 0},
                "I": {"closed": i_c, "open": 0},
                "O": {"closed": o_c, "open": 0},
            },
        },
        "objects": obj_list,
    }
)
dump("data/project/cc_v2_2_redesign_objects.json", objects)

pass_doc = {
    "version": "1.0.0",
    "slice_id": "CC-V2-2-3-PROGRAM-PROCESS-ADMINISTRATIVE-REDESIGN-1.0",
    "decision_id": DEC,
    "update_id": UPD,
    "v2_decision_id": V2DEC,
    "generated_at": TODAY,
    "status": "COMPLETE",
    "pass_id": "V2.2.3",
    "title": "Program, Process & Administrative Redesign",
    "gate": "V2.2",
    "epistemic_class": "REDESIGN_OPERATING_SYSTEM_NOT_TECH_NOT_BUDGET_NOT_MANUALS",
    "governing_question": "If the institutional architecture is right, how should Arkansas actually work for the person using it—and for the public servants operating it?",
    "permanent_principle": LOCKED_PRINCIPLES["citizen_not_org_chart"],
    "locked_principles": LOCKED_PRINCIPLES,
    "public_service_operating_standard": PUBLIC_SERVICE_OPERATING_STANDARD,
    "admin_layers": ADMIN_LAYERS,
    "universal_process_grammar": PROCESS_GRAMMAR,
    "life_events": LIFE_EVENTS,
    "one_arkansas_front_door": {
        "status": "CONCEPT_ONLY",
        "not": "Not necessarily one giant agency; not a software procurement",
        "flow": [
            "ONE ENTRY POINT",
            "determine need",
            "identify applicable functions",
            "reuse permitted information",
            "route to responsible institution",
            "display status",
            "explain decisions",
            "surface next action",
            "provide appeal",
            "close case",
        ],
    },
    "tell_government_once": {
        "principle": LOCKED_PRINCIPLES["tell_government_once"],
        "counter_rule": LOCKED_PRINCIPLES["data_reuse_counter_rule"],
        "controls": DATA_REUSE_CONTROLS,
    },
    "public_decision_receipt": {"fields": RECEIPT_FIELDS},
    "no_black_box_government": {
        "chain": ["authority", "rule", "evidence/input", "decision", "reason", "responsible institution", "appeal"],
        "ai_assistance": "Disclosed where consequential; institutional responsibility remains; lineage; reason; appeal",
    },
    "citizen_time_tax": {
        "definition": "Time government requires from a person to comply with or obtain something legitimately owed/available",
        "measures": [
            "forms",
            "documents",
            "visits",
            "calls",
            "websites",
            "agencies touched",
            "waiting time",
            "travel",
            "repeat submissions",
            "appeals",
            "total citizen time",
        ],
    },
    "business_friction_ledger": {
        "test": LOCKED_PRINCIPLES["business_friction_test"],
        "tracks": [
            "steps",
            "institutions",
            "time",
            "duplicated information",
            "uncertain requirements",
            "decision latency",
            "appeal/review",
            "fees",
        ],
    },
    "rule_sunset_review_architecture": RULE_REVIEW_CLASSES,
    "program_purpose_card": PURPOSE_CARD_QUESTIONS,
    "public_outcome_ledger": OUTCOME_LEDGER_FAMILIES,
    "complexity_budget": {
        "name": "COMPLEXITY BUDGET",
        "spends": [
            "citizen burden",
            "business burden",
            "staff burden",
            "data burden",
            "appeal burden",
            "technology burden",
            "compliance burden",
        ],
    },
    "procurement_process": [
        "PUBLIC NEED",
        "specification",
        "market discovery",
        "competition/allowed exception",
        "award",
        "contract",
        "performance",
        "payment",
        "outcome",
        "public record",
    ],
    "grants_incentives_process": [
        "PUBLIC PURPOSE",
        "eligibility",
        "application",
        "evaluation",
        "decision",
        "agreement",
        "public contribution",
        "recipient contribution",
        "milestones",
        "performance",
        "clawback/exit",
        "outcome",
    ],
    "before_after_visual": before_after_visual,
    "families": families,
    "progress": {
        "redesign_objects_closed": closed,
        "redesign_objects_total": total,
        "v2_2_percent": v22_pct,
        "v2_blueprint_percent": blueprint_pct,
        "f_objects_closed": f_c,
        "i_objects_closed": i_c,
        "o_objects_closed": o_c,
        "o_hold_complete": hold_o,
    },
    "exit_gate": {
        "o_objects_38": True,
        "redesign_objects_114": True,
        "life_event_architecture": True,
        "operating_standard": True,
        "process_grammar": True,
        "tell_once_and_privacy": True,
        "decision_receipt": True,
        "no_black_box": True,
        "citizen_time_tax": True,
        "business_friction_ledger": True,
        "program_purpose_card": True,
        "outcome_ledger": True,
        "complexity_budget": True,
        "accessibility_rural_failure": True,
        "procurement_grant_architecture": True,
        "funding_invented": 0,
        "redesign_certified": False,
        "next": "V2.2.4 Redesign Integration & Certification",
    },
    "surfaces": {
        "pass": "/v2/redesign/operating-system/",
        "life_events": "/v2/redesign/life-events/",
        "receipt": "/v2/redesign/public-decision-receipt/",
        "what_changed": "/v2/redesign/what-changed/v2-2-3/",
        "hub": "/v2/redesign/",
    },
    "next": "V2.2.4 — Redesign Integration & Certification (join + hostile tests; then certify)",
    "cards": cards,
    "should_rule": fpass["should_rule"],
}
dump("data/project/cc_v2_2_3_program_process_administrative_redesign.json", pass_doc)

hub = load("data/project/cc_v2_2_redesign_arkansas.json")
hub["decision_id"] = DEC
hub["update_id"] = UPD
hub["generated_at"] = TODAY
hub["status"] = "OBJECTS_CLOSED_AWAITING_CERTIFICATION"
hub["progress"] = {
    "redesign_objects_closed": closed,
    "redesign_objects_total": total,
    "v2_2_percent": v22_pct,
    "v2_blueprint_percent": blueprint_pct,
    "f_objects_closed": f_c,
    "i_objects_closed": i_c,
    "o_objects_closed": o_c,
    "o_objects_open": 0,
}
for p in hub["passes"]:
    if p["id"] == "V2.2.3":
        p["status"] = "COMPLETE"
        p["href"] = "/v2/redesign/operating-system/"
        p["what_changed"] = "/v2/redesign/what-changed/v2-2-3/"
        p["exit"] = "Operating system: life events, front door concept, process grammar, receipts."
    if p["id"] == "V2.2.4":
        p["status"] = "NEXT"
        p["href"] = None
        p["exit"] = "Join 114 decisions; hostile tests; then CERTIFY redesign (no new redesign)."
hub["signature_outputs"] = {
    **hub.get("signature_outputs", {}),
    "operating_system": "/v2/redesign/operating-system/",
    "life_events": "/v2/redesign/life-events/",
    "public_decision_receipt": "/v2/redesign/public-decision-receipt/",
}
hub["note"] = "114/114 objects closed. V2.2 not CERTIFIED until V2.2.4 join/hostile pass."
dump("data/project/cc_v2_2_redesign_arkansas.json", hub)

changelog = {
    "version": "1.0.0",
    "pass_id": "V2.2.3",
    "pass_name": "Program, Process & Administrative Redesign",
    "decision_id": DEC,
    "update_id": UPD,
    "generated_at": TODAY,
    "status": "COMPLETE",
    "before_after": [
        {"label": "O objects", "before": "0/38", "after": "38/38 (incl. HOLD-COMPLETE)"},
        {"label": "Redesign objects", "before": "76/114", "after": "114/114"},
        {"label": "V2.2", "before": "66.7%", "after": "100% (objects; certification pending 2.2.4)"},
        {"label": "V2 BLUEPRINT", "before": "38.3%", "after": f"{blueprint_pct}%"},
        {"label": "Front Door", "before": "—", "after": "CONCEPT_ONLY"},
        {"label": "Public Decision Receipt", "before": "—", "after": "established"},
        {"label": "Citizen Time Tax", "before": "—", "after": "established"},
        {"label": "Funding invented", "before": "0", "after": "0"},
        {"label": "Redesign CERTIFIED", "before": "no", "after": "no — next V2.2.4"},
    ],
    "nothing_funded": True,
    "decisions_recorded": [V2DEC],
    "experience_links": [
        {"href": "/v2/redesign/operating-system/", "label": "Operating System →"},
        {"href": "/v2/redesign/life-events/", "label": "Life Events →"},
        {"href": "/v2/redesign/public-decision-receipt/", "label": "Public Decision Receipt →"},
        {"href": "/v2/redesign/", "label": "Redesign hub →"},
    ],
}
dump("data/project/pass_changelogs/v2_2_3.json", changelog)

reg = load("data/project/v2_decision_register.json")
if not any(d.get("id") == V2DEC for d in reg.get("decisions") or []):
    reg.setdefault("decisions", []).append(
        {
            "id": V2DEC,
            "date": TODAY,
            "title": "Close V2.2.3 operating-system O objects for 38 functions",
            "decision": (
                "Lock Public Service Operating Standard, life-event architecture, Universal Process Grammar, "
                "Tell Government Once + privacy counter-rule, Public Decision Receipt, No Black Box, "
                "Citizen Time Tax, Business Friction Ledger, Complexity Budget, Program Purpose Card, "
                "Outcome Ledger architecture; close all 38 O objects. No tech build, budgets, or manuals. "
                "Do not certify REDESIGN until V2.2.4 join/hostile pass."
            ),
            "why": "Architecture without operating experience leaves households as systems integrators.",
            "evidence": ["V2.2.1 F", "V2.2.2 I", "SEE friction", "HP-09 accessibility", "GEO rural"],
            "alternatives_rejected": [
                "38 program policy manuals",
                "Software procurement for Front Door",
                "Budgeting in V2.2",
                "Certify redesign without join pass",
            ],
            "could_reverse_if": "V2.2.4 hostile test finds operating contradictions — reopen O only.",
            "v1_doctrine_impact": "NONE — applies Comprehensible Government + Digital Due Process + time-as-prosperity",
        }
    )
reg["decision_id"] = DEC
reg["update_id"] = UPD
dump("data/project/v2_decision_register.json", reg)

plan["status"] = "V2_2_OBJECTS_CLOSED_AWAITING_CERTIFICATION"
plan["decision_id"] = DEC
plan["update_id"] = UPD
plan["blueprint"]["percent"] = blueprint_pct
plan["blueprint"]["status"] = "IN_PROGRESS"
for g in plan["gates"]:
    if g["id"] == "V2.2":
        g["status"] = "OBJECTS_COMPLETE_AWAITING_CERTIFICATION"
        g["completion_percent"] = v22_pct
        g["redesign_objects_closed"] = closed
        g["redesign_objects_total"] = total
        g["certification"] = "PENDING_V2_2_4"
plan["next_only"] = "V2.2.4 — Redesign Integration & Certification (join + hostile tests)."
plan["active_pass"] = "V2.2.3 COMPLETE → next V2.2.4 (do not open V2.3 yet)"
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
    "redesign_status": "OBJECTS_CLOSED_AWAITING_V2_2_4",
    "note": f"V2.2.3 complete. Redesign objects 114/114. Blueprint {blueprint_pct}%. Certify after V2.2.4.",
    "href": "/v2/redesign/",
}
dump("data/project/completion_ladder_and_dashboard.json", ladder)

state = load("data/project/current_build_state.json")
state["decision_id"] = DEC
state["status"] = "v2_2_3_complete_v2_2_4_next"
state["next_action"] = "V2.2.4 — Redesign Integration & Certification"
state["v2_blueprint_percent"] = blueprint_pct
state["writing_focus"] = f"V2.2.3 COMPLETE. Objects 114/114. Blueprint {blueprint_pct}%. Next V2.2.4 join."
state["notes"] = [
    f"{DEC}/{UPD}: V2.2.3 operating system 38/38 O. Redesign 114/114. Blueprint {blueprint_pct}%. Certify pending 2.2.4."
] + [n for n in (state.get("notes") or []) if DEC not in str(n)]
dump("data/project/current_build_state.json", state)

bpreg = load("data/project/build_progress_registry.json")
bpreg["decision_id"] = DEC
bpreg["update_id"] = UPD
bpreg["next_objective"] = "V2.2.4 Redesign Integration & Certification — then V2.3 FUND ARKANSAS."
bpreg["v2_blueprint"] = {"percent": blueprint_pct, "href": "/v2/redesign/"}
if not any(x.get("id") == DEC for x in bpreg.get("infrastructure_checkpoints") or []):
    bpreg.setdefault("infrastructure_checkpoints", []).append(
        {
            "id": DEC,
            "title": "V2.2.3 Program, Process & Administrative Redesign complete",
            "date": TODAY,
            "href": "/v2/redesign/what-changed/v2-2-3/",
        }
    )
dump("data/project/build_progress_registry.json", bpreg)

sg = load("data/project/stewardship_governance_v1.json")
sg["recommended_next_priority"] = {
    "lane": "V2_BLUEPRINT",
    "focus": "V2.2.4 Redesign Integration & Certification",
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
            "title": "V2.2.3 Operating System redesign complete — certification next",
            "summary": (
                f"{DEC}: Closed 38/38 O objects. Redesign objects 114/114. V2.2 object completion 100% "
                f"(certification deferred to V2.2.4). Blueprint {blueprint_pct}%. Locked Front Door concept, "
                f"Public Decision Receipt, Citizen Time Tax, Tell Government Once. Funding invented 0. Next: V2.2.4."
            ),
            "public": True,
        }
    )
updates["last_updated"] = TODAY
dump("data/project/updates.json", updates)

rule_path = ROOT / ".cursor/rules/v2-doctrine-protection.mdc"
rule = rule_path.read_text(encoding="utf-8")
old = (
    "→ V2.2.2 Institutional & Geographic Redesign — **COMPLETE**  \n"
    "→ **NEXT:** V2.2.3 Program, Process & Administrative Redesign"
)
new = (
    "→ V2.2.2 Institutional & Geographic Redesign — **COMPLETE**  \n"
    "→ V2.2.3 Program, Process & Administrative Redesign — **COMPLETE**  \n"
    "→ **NEXT:** V2.2.4 Redesign Integration & Certification"
)
if old in rule:
    rule_path.write_text(rule.replace(old, new), encoding="utf-8")

(ROOT / "reports/CC_V2_2_3_PROGRAM_PROCESS_ADMINISTRATIVE_REDESIGN_RETURN.md").write_text(
    f"""# V2.2.3 — Program, Process & Administrative Redesign — Return

**Decision:** {DEC} · **Update:** {UPD} · **V2-DEC:** {V2DEC}

## Verdict

COMPLETE operating-system pass. 38/38 O closed. 114/114 redesign objects dispositioned.
**REDESIGN not CERTIFIED** — join/hostile pass is V2.2.4.

## Progress

- Redesign objects: **{closed}/114**
- V2.2 objects: **{v22_pct}%**
- Blueprint: **{blueprint_pct}%**
- O HOLD-COMPLETE: {hold_o}
- Funding invented: **0**

## Locked

Public Service Operating Standard · Life events · Process grammar · Tell Government Once + privacy counter-rule ·
Public Decision Receipt · No Black Box · Citizen Time Tax · Business Friction Ledger · Complexity Budget ·
Program Purpose Card · Outcome Ledger architecture · Front Door CONCEPT_ONLY

## Next

V2.2.4 — Redesign Integration & Certification → then V2.3 FUND ARKANSAS.
""",
    encoding="utf-8",
)

print(
    f"V2.2.3 COMPLETE {closed}/114 v22={v22_pct}% bp={blueprint_pct}% hold_o={hold_o} next=V2.2.4"
)
