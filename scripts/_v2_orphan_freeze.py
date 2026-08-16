"""CC-DEC-194 — Orphan/scope/completion audit + freeze v2 map."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TODAY = "2026-08-16"


def load(rel: str):
    return json.loads((ROOT / rel).read_text(encoding="utf-8"))


def dump(rel: str, obj):
    (ROOT / rel).write_text(json.dumps(obj, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


plan = load("data/project/cc_v2_master_build_plan.json")
reg = load("data/project/v2_decision_register.json")


def domain(id_: str, label: str, gate: str, home_note: str):
    return {
        "id": id_,
        "label": label,
        "primary_gate": gate,
        "home_on_map": True,
        "home_note": home_note,
        "decision_eventually_required": (
            f"Disposition {label} under Constitutional Capitalism for Arkansas application."
        ),
        "minimum_evidence_for_current_phase": (
            "Enumeration + authoritative pointers sufficient to place the domain on the map "
            "and define the next decision's evidence budget — not a full research campaign."
        ),
        "source_hierarchy": plan["source_hierarchy_default"],
        "completion_gate": (
            "Domain has a known home; orphan-test PASS for this domain; "
            "deferred list explicit; no silent v1 doctrine change."
        ),
        "deferred_until": (
            "Deep measurement, redesign, fiscal proof, legal pathway, or implementation objects "
            f"— only when the active gate ({gate}) opens that work."
        ),
        "status": "ENUMERATED_NOT_RESEARCHED",
        "resolved_objects": 0,
    }


existing = {d["id"] for d in plan["operating_system_inventory"]["domains"]}

noms = [
    (
        "human_services",
        "Human services & safety-net programs",
        "NEW_DOMAIN",
        "Material DHS/SNAP/TANF/child-welfare operating surface not named as its own home.",
    ),
    (
        "insurance_and_risk",
        "Insurance & risk regulation",
        "NEW_DOMAIN",
        "Insurance markets and state regulation are a distinct operating surface from banking/credit.",
    ),
    (
        "environment_climate",
        "Environment, pollution & climate adaptation",
        "MERGE",
        "Home under natural_resources + energy + water — expand home_notes.",
    ),
    (
        "national_guard_military",
        "National Guard & military affairs",
        "MERGE",
        "Home under emergency_government + federal_dependency.",
    ),
    (
        "culture_tourism_parks",
        "Culture, tourism & parks",
        "MERGE",
        "Home under public_assets + economic_development.",
    ),
    (
        "tribal_relations",
        "Tribal & Indigenous relations",
        "MERGE",
        "Home under constitutional_structure + local_government.",
    ),
    (
        "waste_sanitation",
        "Waste & sanitation",
        "MERGE",
        "Home under water + local_government.",
    ),
    (
        "professional_licensing",
        "Professional licensing",
        "MERGE",
        "Home under business_formation + agencies.",
    ),
    ("corrections_detail", "Corrections as standalone", "HOME", "Already covered by justice."),
    ("higher_ed_detail", "Higher education as standalone", "HOME", "Already covered by education."),
    ("telecom", "Telecommunications", "HOME", "Already covered by digital_infrastructure."),
    (
        "veterans",
        "Veterans affairs",
        "MERGE",
        "Home under federal_dependency + healthcare + human_services.",
    ),
]

note_patches = {
    "natural_resources": " + environment/pollution/climate-adaptation interfaces (orphan MERGE).",
    "energy": " + climate/adaptation interfaces shared with natural_resources/water (orphan MERGE).",
    "water": " + waste/sanitation interfaces with local_government (orphan MERGE).",
    "emergency_government": (
        " + National Guard / military-affairs interfaces with federal_dependency (orphan MERGE)."
    ),
    "federal_dependency": " + National Guard / veterans interfaces (orphan MERGE).",
    "public_assets": " + parks/culture asset surfaces with economic_development (orphan MERGE).",
    "economic_development": " + tourism/culture interfaces with public_assets (orphan MERGE).",
    "constitutional_structure": (
        " + tribal/Indigenous constitutional interfaces with local_government (orphan MERGE)."
    ),
    "local_government": " + tribal interfaces, waste/sanitation with water (orphan MERGE).",
    "business_formation": " + professional licensing with agencies (orphan MERGE).",
    "agencies": " + professional licensing roster tags (orphan MERGE).",
    "healthcare": (
        " + veterans health interface with federal_dependency/human_services (orphan MERGE)."
    ),
}

for d in plan["operating_system_inventory"]["domains"]:
    patch = note_patches.get(d["id"])
    if patch and patch.strip() not in d["home_note"]:
        d["home_note"] = d["home_note"].rstrip(".") + patch

new_domains = []
if "human_services" not in existing:
    new_domains.append(
        domain(
            "human_services",
            "Human services & safety-net programs",
            "V2.2",
            "DHS/SNAP/TANF/child welfare/assistance — disposition under CC.",
        )
    )
if "insurance_and_risk" not in existing:
    new_domains.append(
        domain(
            "insurance_and_risk",
            "Insurance & risk regulation",
            "V2.2",
            "Insurance markets, state regulation, household risk — disposition under CC.",
        )
    )

plan["operating_system_inventory"]["domains"].extend(new_domains)
plan["operating_system_inventory"]["domain_count"] = len(
    plan["operating_system_inventory"]["domains"]
)

nominations_log = [
    {
        "nomination": label,
        "id_hint": nid,
        "disposition": disp,
        "why": why,
        "status": "RESOLVED",
    }
    for nid, label, disp, why in noms
]

plan["orphan_audit"] = {
    "status": "PASS",
    "tested_at": TODAY,
    "test_question": "Can anything important about operating Arkansas exist outside the map?",
    "answer": (
        "Effectively no — every material operating domain has a known home "
        "(HOME, MERGE, or NEW_DOMAIN assigned)."
    ),
    "pass_criterion": "Effectively no — every important operating domain has a known home.",
    "method": [
        "Walk inventory domain-by-domain",
        "Invite adversarial orphan nominations",
        "Assign each nomination: HOME | MERGE | DEFER | NEW_DOMAIN",
        "Freeze map only when residual orphans = 0 material items",
    ],
    "material_orphans_open": [],
    "nominations_log": nominations_log,
    "new_domains_added_this_audit": [d["id"] for d in new_domains],
    "domain_count_after": plan["operating_system_inventory"]["domain_count"],
    "freeze_condition": (
        "Orphan test PASS + Master Plan accepted → freeze v2 build map → open V2.1 only."
    ),
}

plan["status"] = "MAP_FROZEN_READY_FOR_V2_1"
plan["map_freeze"] = {
    "status": "FROZEN",
    "frozen_at": TODAY,
    "decision_id": "CC-DEC-194",
    "domain_count": plan["operating_system_inventory"]["domain_count"],
    "rule": (
        "Inventory homes frozen. Research begins only under V2.1 evidence budgets. "
        "New domains require explicit amendment to the map."
    ),
}

for g in plan["gates"]:
    if g["id"] == "V2.1":
        g["status"] = "OPEN_NOT_STARTED"
        g["forbidden_until_plan_frozen"] = False
    else:
        g["status"] = "QUEUED"
        g["forbidden_until_plan_frozen"] = True

for s in plan["sequence"]:
    if s["id"] in ("EXPLORER_HOLD", "MASTER_PLAN", "ORPHAN_SCOPE_AUDIT", "FREEZE_MAP"):
        s["status"] = "COMPLETE"
    elif s["id"] == "V2_1_SEE":
        s["status"] = "NEXT"

plan["forbidden_before_map_freeze"] = [
    "Explorer expansion (held at 0.1)",
    "Fiscal modeling before V2.1 baseline objects require it",
    "Agency redesign before V2.2",
    "Tax rates / public-bank design before V2.3 evidence gates",
    "Pilots before V2.5 implementation objects",
]
plan["forbidden_now"] = [
    "Skipping V2.1 baseline for premature redesign",
    "Silent v1 doctrine change",
    "Dial inflation by words written",
    "Explorer expansion while V2.1 is the active build priority",
]
plan["next_only"] = (
    "V2.1 — SEE ARKANSAS (baseline objects only). No redesign, funding architecture, or pilots yet."
)

new_entries = [
    {
        "id": "V2-DEC-005",
        "date": TODAY,
        "title": "Orphan / scope / completion audit PASS",
        "decision": (
            "Pass orphan test after assigning adversarial nominations "
            "(2 NEW domains: human_services, insurance_and_risk; remaining MERGE/HOME). "
            "Material orphans open = 0."
        ),
        "why": "Cannot open V2.1 until nothing important about operating Arkansas sits outside the map.",
        "evidence": [
            "Master Plan inventory walk",
            "Adversarial nomination log in cc_v2_master_build_plan.json",
        ],
        "alternatives_rejected": [
            "Open V2.1 with known orphans",
            "Endless domain invention without freeze",
        ],
        "could_reverse_if": (
            "A material operating surface is later shown with no HOME/MERGE path — "
            "reopen map amendment, do not silently research under wrong home."
        ),
        "v1_doctrine_impact": "NONE",
    },
    {
        "id": "V2-DEC-006",
        "date": TODAY,
        "title": "Freeze v2 build map",
        "decision": (
            f"Freeze operating-system inventory at "
            f"{plan['operating_system_inventory']['domain_count']} domain homes. "
            "V2.1 OPEN_NOT_STARTED. Blueprint remains 0% until objects resolve."
        ),
        "why": "Define the entire job before attacking it in finite passes.",
        "evidence": ["Orphan audit PASS", "CC-V2-MASTER-BUILD-PLAN-1.0"],
        "alternatives_rejected": [
            "Research campaign before freeze",
            "Partial map with soft orphans",
        ],
        "could_reverse_if": "Explicit map amendment after hostile gap — never silent domain drift.",
        "v1_doctrine_impact": "NONE",
    },
]

base = [e for e in plan["decision_register"]["entries"] if e["id"] not in ("V2-DEC-005", "V2-DEC-006")]
plan["decision_register"]["entries"] = base[:4] + new_entries
reg_base = [e for e in reg["entries"] if e["id"] not in ("V2-DEC-005", "V2-DEC-006")]
reg["entries"] = reg_base[:4] + new_entries

audit = {
    "version": "1.0.0",
    "slice_id": "CC-V2-ORPHAN-SCOPE-COMPLETION-AUDIT-1.0",
    "decision_id": "CC-DEC-194",
    "update_id": "UPD-207",
    "generated_at": TODAY,
    "status": "PASS",
    "depends_on": "CC-V2-MASTER-BUILD-PLAN-1.0",
    "tests": [
        {
            "id": "ORPHAN",
            "question": "Can anything important about operating Arkansas exist outside the map?",
            "status": "PASS",
            "result": (
                "Effectively no. 2 NEW domains added; remaining nominations MERGE or HOME. "
                "material_orphans_open=0."
            ),
        },
        {
            "id": "SCOPE",
            "question": "Does every gate have explicit objects, deferred lists, and forbidden work?",
            "status": "PASS",
            "result": "Gates, object_counters, per-domain deferred_until, and forbidden lists locked.",
        },
        {
            "id": "COMPLETION",
            "question": "Is 100% defined as five gates + object counters rather than words written?",
            "status": "PASS",
            "result": "blueprint.completion_definition and object_counters locked; UNKNOWN rule locked.",
        },
    ],
    "map_freeze": {
        "status": "FROZEN",
        "frozen_at": TODAY,
        "domain_count": plan["operating_system_inventory"]["domain_count"],
    },
    "v2_1_unlock": {
        "status": "UNLOCKED",
        "gate": "V2.1",
        "gate_status": "OPEN_NOT_STARTED",
        "blueprint_percent": 0,
        "note": (
            "Unlocked does not mean started. No research until V2.1 pass opens with evidence budgets."
        ),
    },
    "nominations_log": nominations_log,
}

dump("data/project/cc_v2_master_build_plan.json", plan)
dump("data/project/v2_decision_register.json", reg)
dump("data/project/cc_v2_orphan_scope_completion_audit.json", audit)

ladder = load("data/project/completion_ladder_and_dashboard.json")
ladder["v2_blueprint"] = {
    **ladder.get("v2_blueprint", {}),
    "percent": 0,
    "status": "MAP_FROZEN_READY_FOR_V2_1",
    "note": (
        "Map frozen. Orphan audit PASS. V2.1 unlocked but not started. "
        "Blueprint 0% until objects resolve."
    ),
    "href": "/v2/",
    "plan": "data/project/cc_v2_master_build_plan.json",
}
dump("data/project/completion_ladder_and_dashboard.json", ladder)

state = load("data/project/current_build_state.json")
state["status"] = "v2_map_frozen_ready_for_v2_1"
state["writing_focus"] = (
    "FOUNDATIONAL v1.0 COMPLETE · Explorer 0.1 HOLD · V2 BLUEPRINT 0% (map FROZEN). "
    "Next: V2.1 SEE ARKANSAS baseline objects only."
)
state["next_action"] = "V2.1 — SEE ARKANSAS (baseline objects; evidence budgets; UNKNOWN allowed)"
state["notes"] = [
    "CC-DEC-194 / UPD-207: Master Plan + orphan PASS + map freeze. V2.1 unlocked, not started."
] + [n for n in (state.get("notes") or []) if "CC-DEC-194" not in str(n)]
dump("data/project/current_build_state.json", state)

bpreg = load("data/project/build_progress_registry.json")
bpreg["next_objective"] = (
    "V2.1 SEE ARKANSAS — baseline objects only. Explorer HOLD. "
    "Foundational v1.0 frozen. V2 BLUEPRINT 0%."
)
bpreg["v2_blueprint"] = {
    "percent": 0,
    "status": "MAP_FROZEN_READY_FOR_V2_1",
    "plan": "data/project/cc_v2_master_build_plan.json",
    "href": "/v2/",
}
dump("data/project/build_progress_registry.json", bpreg)

sg = load("data/project/stewardship_governance_v1.json")
sg["recommended_next_priority"] = {
    "lane": "V2_BLUEPRINT",
    "focus": "V2.1 SEE ARKANSAS — baseline objects only",
    "status": "MAP_FROZEN",
    "decision_id": "CC-DEC-194",
    "explorer": "HOLD at 0.1",
    "why": "Map frozen after orphan PASS. Attack the job in finite passes starting with SEE.",
}
dump("data/project/stewardship_governance_v1.json", sg)

(ROOT / "reports/CC_V2_MASTER_BUILD_PLAN_1_0_RETURN.md").write_text(
    f"""# CC-V2-MASTER-BUILD-PLAN-1.0 — Return

**Decision:** CC-DEC-194 · **Update:** UPD-207 · **Date:** {TODAY}

## Verdict

V2 Master Build Plan **LOCKED**.
Orphan / scope / completion audit **PASS**.
v2 build map **FROZEN** ({plan['operating_system_inventory']['domain_count']} domains).
V2 BLUEPRINT **0%** (V2.1 unlocked, not started).
Explorer Experience 0.1 **HOLD**.
Foundational System v1.0 **FROZEN**.

## Three permanent indicators

1. FOUNDATIONAL SYSTEM v1.0 — COMPLETE
2. EXPLORER EXPERIENCE — 0.1 HOLD
3. V2 BLUEPRINT — 0% → 100%

## Orphan result

Adversarial nominations assigned. NEW: human_services, insurance_and_risk. Others MERGE/HOME. material_orphans_open = 0.

## Next only

**V2.1 — SEE ARKANSAS** (baseline objects). No redesign, funding architecture, tax rates, public bank, or pilots yet.
""",
    encoding="utf-8",
)

rule_path = ROOT / ".cursor/rules/v2-doctrine-protection.mdc"
rule = rule_path.read_text(encoding="utf-8")
old = """## Current sequence

Explorer Experience 0.1 — **HOLD**  
→ CC-V2-MASTER-BUILD-PLAN-1.0  
→ Orphan / scope / completion audit  
→ Freeze v2 build map  
→ V2.1 SEE ARKANSAS only after freeze

## Forbidden before map freeze

No Arkansas research campaign, fiscal modeling, agency redesign, public-bank discussion, tax rates, or pilots.
"""
new = """## Current sequence

Explorer Experience 0.1 — **HOLD**  
→ CC-V2-MASTER-BUILD-PLAN-1.0 — **COMPLETE**  
→ Orphan / scope / completion audit — **PASS**  
→ Freeze v2 build map — **FROZEN**  
→ **NEXT:** V2.1 SEE ARKANSAS (baseline objects only)

## Forbidden now (post-freeze)

No redesign before V2.2 · no funding architecture/tax rates/public bank before V2.3 · no pilots before V2.5 · no silent v1 doctrine change · no Explorer expansion while V2.1 is active.
"""
if old in rule:
    rule_path.write_text(rule.replace(old, new), encoding="utf-8")

print("domains", plan["operating_system_inventory"]["domain_count"])
print("orphan", plan["orphan_audit"]["status"])
print("freeze", plan["map_freeze"]["status"])
print("next", plan["next_only"])
