"""Generate CC-V2-MASTER-BUILD-PLAN-1.0 — define the job; do not research Arkansas yet."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# Operating-system inventory: enumerate homes only — no research campaign.
INVENTORY = [
    ("constitutional_structure", "State constitutional structure", "V2.1", "Map articles, amendment paths, separation of powers, rights floors."),
    ("revenue", "Revenue", "V2.1", "Enumerate tax types, fees, federal flows, dedicated funds — totals later."),
    ("expenditures", "Expenditures", "V2.1", "Enumerate major appropriation classes and earmarks."),
    ("agencies", "Agencies & institutions", "V2.1", "Complete agency/institution roster with function tags."),
    ("education", "Education", "V2.2", "K-12, higher ed, CTE, adequacy — disposition under CC."),
    ("healthcare", "Healthcare", "V2.2", "Public health, Medicaid, hospitals, workforce — disposition."),
    ("justice", "Justice & public safety", "V2.2", "Courts, corrections, policing interfaces — disposition."),
    ("local_government", "Local government", "V2.2", "Counties, cities, special districts, home rule."),
    ("housing", "Housing", "V2.2", "Supply, finance, land use interfaces."),
    ("land", "Land & property systems", "V2.2", "Cadastre, assessment, ownership layers."),
    ("agriculture", "Agriculture & food systems", "V2.2", "Production, markets, rural services."),
    ("energy", "Energy", "V2.2", "Generation, transmission, regulation, resilience."),
    ("water", "Water", "V2.2", "Supply, quality, rights, infrastructure."),
    ("transportation", "Transportation", "V2.2", "Highways, transit, aviation, freight."),
    ("digital_infrastructure", "Digital infrastructure", "V2.2", "Broadband, identity, public systems, AI interfaces."),
    ("labor", "Labor & workforce", "V2.2", "Employment, skills, unemployment, workplace rules."),
    ("capital", "Capital formation", "V2.3", "Private capital, public investment gates, COUNTABLE discipline."),
    ("banking", "Banking & credit", "V2.3", "Charters, credit access, public banking only if gates pass."),
    ("business_formation", "Business formation", "V2.2", "Entity law, licensing, entry barriers."),
    ("procurement", "Procurement", "V2.2", "Purchasing, contracting, capture surfaces."),
    ("economic_development", "Economic development", "V2.2", "Incentives, sites, industrial policy boundaries."),
    ("pensions", "Pensions & long-term liabilities", "V2.3", "Obligations, funding status, intergenerational honesty."),
    ("public_assets", "Public assets", "V2.3", "Registers, valuation posture, waterfall eligibility."),
    ("natural_resources", "Natural resources", "V2.2", "Extraction, stewardship, royalty/public claim tests."),
    ("federal_dependency", "Federal dependency", "V2.1", "Catalog federal flows and conditionality — replaceability later."),
    ("household_economics", "Household economics", "V2.1", "Cost, income, ownership, security, time, agency baselines."),
    ("demographics", "Demographics", "V2.1", "Age, migration, fertility, labor-force structure."),
    ("geographic_disparities", "Geographic disparities", "V2.1", "Regions, counties, rural/urban capability gaps."),
    ("civic_institutions", "Civic institutions", "V2.2", "Associations, nonprofits, media, trust capacity."),
    ("elections", "Elections", "V2.2", "Administration, campaign finance interfaces, integrity."),
    ("direct_democracy", "Direct democracy", "V2.2", "Initiative/referendum/constitutional amendment practice."),
    ("administrative_power", "Administrative power", "V2.2", "Rulemaking, discretion, Digital Due Process surfaces."),
    ("public_data", "Public data & transparency", "V2.2", "Ledgers, FOIA posture, comprehensible government."),
    ("ai", "AI in government & economy", "V2.2", "Automation, rights, productivity, capture risks."),
    ("emergency_government", "Emergency government", "V2.4", "Emergency powers, sunset, accountability."),
    ("intergenerational_obligations", "Intergenerational obligations", "V2.5", "Debt, deferred maintenance, natural capital, Gen 2 tests."),
]

SOURCE_HIERARCHY = [
    "Arkansas Constitution & statutes (primary law)",
    "Official state fiscal documents (AFY, CAFR, appropriation acts, DFA releases)",
    "Official federal statistical series (Census, BEA, BLS, CMS, USDA, EIA as applicable)",
    "Official agency reports and open data portals",
    "Peer-reviewed / audited secondary analysis (labeled)",
    "ILLUSTRATION / MODEL (never counted as FACT without gate)",
]

OBJECT_COUNTERS = [
    {"id": "baseline_objects_resolved", "label": "Baseline objects resolved", "gate": "V2.1"},
    {"id": "functions_dispositioned", "label": "Functions dispositioned", "gate": "V2.2"},
    {"id": "fiscal_flows_proven", "label": "Fiscal flows proven", "gate": "V2.3"},
    {"id": "legal_pathways_classified", "label": "Legal pathways classified", "gate": "V2.4"},
    {"id": "household_models_completed", "label": "Household models completed", "gate": "V2.1–V2.5"},
    {"id": "geographies_modeled", "label": "Geographies modeled", "gate": "V2.1–V2.5"},
    {"id": "propositions_validated", "label": "Propositions validated", "gate": "V2.4"},
    {"id": "implementation_objects_specified", "label": "Implementation objects specified", "gate": "V2.5"},
]


def question_template(domain_id: str, label: str, primary_gate: str, home_note: str) -> dict:
    return {
        "id": domain_id,
        "label": label,
        "primary_gate": primary_gate,
        "home_on_map": True,
        "home_note": home_note,
        "decision_eventually_required": f"Disposition {label} under Constitutional Capitalism for Arkansas application.",
        "minimum_evidence_for_current_phase": (
            "Enumeration + authoritative pointers sufficient to place the domain on the map "
            "and define the next decision's evidence budget — not a full research campaign."
        ),
        "source_hierarchy": SOURCE_HIERARCHY,
        "completion_gate": (
            f"Domain has a known home; orphan-test PASS for this domain; "
            f"deferred list explicit; no silent v1 doctrine change."
        ),
        "deferred_until": (
            "Deep measurement, redesign, fiscal proof, legal pathway, or implementation objects "
            f"— only when the active gate ({primary_gate}) opens that work."
        ),
        "status": "ENUMERATED_NOT_RESEARCHED",
        "resolved_objects": 0,
    }


gates = [
    {
        "id": "V2.1",
        "slug": "see-arkansas",
        "name": "SEE ARKANSAS",
        "question": "How does Arkansas actually work today?",
        "completion_result": "Government + fiscal + household + productive-capital baseline",
        "status": "LOCKED_UNTIL_MAP_FROZEN",
        "forbidden_until_plan_frozen": True,
        "object_focus": ["baseline_objects_resolved", "household_models_completed", "geographies_modeled"],
    },
    {
        "id": "V2.2",
        "slug": "redesign-arkansas",
        "name": "REDESIGN ARKANSAS",
        "question": "What specifically changes under CC?",
        "completion_result": "Every major state function dispositioned",
        "status": "QUEUED",
        "forbidden_until_plan_frozen": True,
        "object_focus": ["functions_dispositioned"],
    },
    {
        "id": "V2.3",
        "slug": "fund-arkansas",
        "name": "FUND ARKANSAS",
        "question": "How does the redesigned state pay for itself?",
        "completion_result": "Complete fiscal architecture with evidence-gated money flows",
        "status": "QUEUED",
        "forbidden_until_plan_frozen": True,
        "object_focus": ["fiscal_flows_proven"],
        "countable_discipline": "COUNTABLE remains $0 until waterfall proves cash. Hypotheticals are not revenue.",
    },
    {
        "id": "V2.4",
        "slug": "legalize-and-break-it",
        "name": "LEGALIZE & BREAK IT",
        "question": "Is it lawful, administrable, resilient and capture-resistant?",
        "completion_result": "Hostile validation of the proposed operating model",
        "status": "QUEUED",
        "forbidden_until_plan_frozen": True,
        "object_focus": ["legal_pathways_classified", "propositions_validated"],
    },
    {
        "id": "V2.5",
        "slug": "build-the-roadmap",
        "name": "BUILD THE ROADMAP",
        "question": "How could Arkansas actually transition?",
        "completion_result": "Implementation-grade Year 0 → Gen 2 blueprint",
        "status": "QUEUED",
        "forbidden_until_plan_frozen": True,
        "object_focus": ["implementation_objects_specified"],
    },
]

domains = [question_template(*row) for row in INVENTORY]

# Seed decision register entries for plan lock itself
decision_register = [
    {
        "id": "V2-DEC-001",
        "date": "2026-08-16",
        "title": "Open V2 Master Build Plan; freeze Explorer Experience 0.1 as HOLD",
        "decision": (
            "Define what v2.0 means at 100% before any Arkansas research campaign, "
            "fiscal modeling, agency redesign, tax rates, or pilots."
        ),
        "why": (
            "v1 taught that completion requires a finish line. v2 must not confuse project growth "
            "with blueprint completion."
        ),
        "evidence": ["CC Foundational System v1.0 complete", "Explorer Experience 0.1 accepted and held"],
        "alternatives_rejected": [
            "Immediate Arkansas budget deep-dive",
            "Immediate revenue-mechanism design",
            "Immediate public-bank / tax-rate work",
            "Continuing Explorer expansion before V2 map freeze",
        ],
        "could_reverse_if": "Plan fails orphan test or scope is shown incomplete after deliberate audit.",
        "v1_doctrine_impact": "NONE — applications lane only; no silent doctrine change.",
    },
    {
        "id": "V2-DEC-002",
        "date": "2026-08-16",
        "title": "Progress measured by resolved objects, not words written",
        "decision": (
            "V2 BLUEPRINT percent derives from object counters "
            "(baseline, functions, fiscal flows, legal pathways, households, geographies, "
            "propositions, implementation objects)."
        ),
        "why": "Word-count and research volume inflated dials in earlier eras.",
        "evidence": ["v1 completion governance lessons"],
        "alternatives_rejected": ["Percent by pages written", "Percent by research hours"],
        "could_reverse_if": "Object taxonomy proven unfit after first gate — amend explicitly.",
        "v1_doctrine_impact": "NONE",
    },
    {
        "id": "V2-DEC-003",
        "date": "2026-08-16",
        "title": "UNKNOWN is a completed research result when needed evidence does not exist",
        "decision": (
            "When the evidence required for the current decision does not exist, record UNKNOWN "
            "as a completed result for that decision slot — do not endlessly research."
        ),
        "why": "Protects against three-week rabbit holes when three facts would suffice.",
        "evidence": ["v1 COUNTABLE / Stage 4 honesty practice"],
        "alternatives_rejected": ["Research until every box has a number"],
        "could_reverse_if": "Never — this is a permanent epistemic rule for v2.",
        "v1_doctrine_impact": "NONE — reinforces v1 honesty culture.",
    },
    {
        "id": "V2-DEC-004",
        "date": "2026-08-16",
        "title": "v2 may challenge applications of v1; may not silently change v1 doctrine",
        "decision": (
            "If implementation reveals a foundational proposition is defective, stop, label a "
            "potential v2.0 architectural amendment, run hostile test, and record version change."
        ),
        "why": "Keeps Foundational System v1.0 meaningful.",
        "evidence": ["Stewardship governance v1 hard rule"],
        "alternatives_rejected": ["Doctrinal drift through implementation notes"],
        "could_reverse_if": "Never as a silent path — only explicit amendment process.",
        "v1_doctrine_impact": "PROTECTED",
    },
]

orphan_audit = {
    "status": "READY_TO_RUN",
    "test_question": "Can anything important about operating Arkansas exist outside the map?",
    "pass_criterion": "Effectively no — every important operating domain has a known home.",
    "method": [
        "Walk inventory domain-by-domain",
        "Invite adversarial orphan nominations",
        "Assign each nomination: HOME | MERGE | DEFER | NEW_DOMAIN",
        "Freeze map only when residual orphans = 0 material items",
    ],
    "material_orphans_open": [],
    "nominations_log": [],
    "freeze_condition": "Orphan test PASS + Master Plan accepted → freeze v2 build map → open V2.1 only.",
}

sequence = [
    {"step": 1, "id": "EXPLORER_HOLD", "label": "Explorer Experience 0.1 — HOLD", "status": "COMPLETE"},
    {"step": 2, "id": "MASTER_PLAN", "label": "CC-V2-MASTER-BUILD-PLAN-1.0", "status": "THIS_SLICE"},
    {"step": 3, "id": "ORPHAN_SCOPE_AUDIT", "label": "Whole-plan orphan / scope / completion audit", "status": "NEXT"},
    {"step": 4, "id": "FREEZE_MAP", "label": "Freeze v2 build map", "status": "QUEUED"},
    {"step": 5, "id": "V2_1_SEE", "label": "V2.1 — SEE ARKANSAS", "status": "LOCKED"},
]

forbidden_now = [
    "Arkansas research campaign",
    "Fiscal modeling",
    "Agency redesign",
    "New public-bank discussion",
    "Tax rates",
    "Pilots",
    "Explorer expansion (held at 0.1)",
]

plan = {
    "version": "1.0.0",
    "slice_id": "CC-V2-MASTER-BUILD-PLAN-1.0",
    "decision_id": "CC-DEC-194",
    "update_id": "UPD-207",
    "generated_at": "2026-08-16",
    "status": "PLAN_LOCKED_MAP_NOT_YET_FROZEN",
    "title": "Constitutional Capitalism v2.0 — Master Build Plan",
    "purpose": "Define what v2.0 means at 100% before researching, redesigning, funding, or piloting.",
    "foundational_system": {
        "version": "v1.0",
        "status": "COMPLETE_FROZEN",
        "rule": "v2 may challenge applications of v1, but it may not silently change v1 doctrine.",
    },
    "explorer_experience": {
        "version": "0.1",
        "status": "HOLD",
        "rule": "Enough grammar established; pause expansion until later stewardship resume.",
    },
    "blueprint": {
        "label": "V2 BLUEPRINT",
        "percent": 0,
        "status": "DEFINED_NOT_STARTED",
        "completion_definition": (
            "100% when all five gates pass: SEE → REDESIGN → FUND → LEGALIZE & BREAK → ROADMAP, "
            "measured by resolved objects — not words written."
        ),
        "separate_from": [
            "FOUNDATIONAL SYSTEM v1.0 — COMPLETE",
            "EXPLORER EXPERIENCE — 0.1 HOLD",
        ],
    },
    "epistemic_rules": [
        "UNKNOWN is a completed research result when the evidence needed for the current decision does not exist.",
        "Preassign for every v2 question: decision, minimum evidence, source hierarchy, completion gate, deferred.",
        "Deferred field protects against three-week rabbit holes when three facts would suffice.",
        "No doctrinal drift through implementation — architectural amendments are explicit version events.",
        "COUNTABLE remains $0 until proven. Hypotheticals are not revenue.",
    ],
    "gates": gates,
    "object_counters": [
        {**c, "resolved": 0, "total": None, "note": "Totals set when map freezes / gate opens."}
        for c in OBJECT_COUNTERS
    ],
    "operating_system_inventory": {
        "rule": "Inventory first — enumerate homes. Do not research yet.",
        "domain_count": len(domains),
        "domains": domains,
    },
    "source_hierarchy_default": SOURCE_HIERARCHY,
    "decision_register": {
        "path": "data/project/v2_decision_register.json",
        "permanent_from_day_1": True,
        "fields": [
            "id",
            "date",
            "title",
            "decision",
            "why",
            "evidence",
            "alternatives_rejected",
            "could_reverse_if",
            "v1_doctrine_impact",
        ],
        "entries": decision_register,
    },
    "orphan_audit": orphan_audit,
    "sequence": sequence,
    "forbidden_before_map_freeze": forbidden_now,
    "architectural_amendment_protocol": {
        "trigger": "Implementation or hostile test shows a foundational v1 proposition is defective.",
        "steps": [
            "STOP application work on the affected proposition",
            "Open explicit potential v2.0 architectural amendment record",
            "Run appropriate hostile test",
            "Record version change (Foundational v1.x amendment or v2.0 doctrine revision as classified)",
            "No silent rewrite of Public Book / Unabridged as if v1 always said the new thing",
        ],
    },
    "surfaces": {
        "plan": "/v2/",
        "decision_register": "/v2/decisions/",
        "build_progress": "/build-progress/",
        "status": "/status/",
    },
    "next_only": "Whole-plan orphan / scope / completion audit — then freeze map — then V2.1.",
}

(ROOT / "data/project/cc_v2_master_build_plan.json").write_text(
    json.dumps(plan, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
)

register = {
    "version": "1.0.0",
    "slice_id": "CC-V2-DECISION-REGISTER-1.0",
    "decision_id": "CC-DEC-194",
    "update_id": "UPD-207",
    "generated_at": "2026-08-16",
    "status": "LIVE",
    "rule": "Every material v2 decision is logged with why, evidence, losers, and reverse conditions.",
    "entries": decision_register,
}
(ROOT / "data/project/v2_decision_register.json").write_text(
    json.dumps(register, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
)

# Orphan / scope audit shell (ready; not yet PASS)
audit = {
    "version": "1.0.0",
    "slice_id": "CC-V2-ORPHAN-SCOPE-COMPLETION-AUDIT-1.0",
    "decision_id": "CC-DEC-194",
    "update_id": "UPD-207",
    "generated_at": "2026-08-16",
    "status": "OPEN_NEXT",
    "depends_on": "CC-V2-MASTER-BUILD-PLAN-1.0",
    "tests": [
        {
            "id": "ORPHAN",
            "question": "Can anything important about operating Arkansas exist outside the map?",
            "status": "NOT_YET_RUN",
            "result": None,
        },
        {
            "id": "SCOPE",
            "question": "Does every gate have explicit objects, deferred lists, and forbidden work?",
            "status": "PRECHECK_PASS_ON_PLAN_TEXT",
            "result": "Plan text includes gates, objects, deferred fields, and forbidden_before_map_freeze.",
        },
        {
            "id": "COMPLETION",
            "question": "Is 100% defined as five gates + object counters rather than words written?",
            "status": "PRECHECK_PASS_ON_PLAN_TEXT",
            "result": "blueprint.completion_definition and object_counters locked.",
        },
    ],
    "map_freeze": {"status": "NOT_FROZEN", "requires": "ORPHAN PASS"},
    "v2_1_unlock": {"status": "LOCKED", "requires": "map_freeze"},
}
(ROOT / "data/project/cc_v2_orphan_scope_completion_audit.json").write_text(
    json.dumps(audit, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
)

print("wrote plan, register, audit shell")
print("domains", len(domains))
