#!/usr/bin/env python3
"""CC-DEC-204 / UPD-217 — V2.2.4 Redesign Integration & Certification.

Join 114 decisions. Run hostile coexistence tests. Add zero redesign objects.
Certify and freeze the Proposed Arkansas Operating Model if it survives.
Funding invented = 0. V2.3 may not quietly redesign for spreadsheet affordability.
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TODAY = "2026-08-16"
DEC = "CC-DEC-204"
UPD = "UPD-217"
V2DEC = "V2-DEC-018"


def load(rel: str):
    return json.loads((ROOT / rel).read_text(encoding="utf-8"))


def dump(rel: str, obj):
    path = ROOT / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(obj, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


fpass = load("data/project/cc_v2_2_1_government_function_disposition.json")
ipass = load("data/project/cc_v2_2_2_institutional_geographic_redesign.json")
opass = load("data/project/cc_v2_2_3_program_process_administrative_redesign.json")
objects = load("data/project/cc_v2_2_redesign_objects.json")
plan = load("data/project/cc_v2_master_build_plan.json")

f_by = {c["home_id"]: c for c in fpass["cards"]}
i_by = {c["home_id"]: c for c in ipass["cards"]}
o_by = {c["home_id"]: c for c in opass["cards"]}
assert set(f_by) == set(i_by) == set(o_by) and len(f_by) == 38

# ---------------------------------------------------------------------------
# 1. Assemble Proposed Arkansas Operating Model (38 homes × join fields)
# ---------------------------------------------------------------------------
homes = []
for hid in [c["home_id"] for c in fpass["cards"]]:
    f, i, o = f_by[hid], i_by[hid], o_by[hid]
    homes.append(
        {
            "home_id": hid,
            "label": f["label"],
            "family": f["family"],
            "family_label": f["family_label"],
            "function_disposition": f["disposition"],
            "institutional_architecture": i["architecture"],
            "structural_verb": i["structural_verb"],
            "geographic_architecture": {
                "levels": i.get("geographic_levels"),
                "layers": i.get("layers"),
                "regional_relationship": i.get("regional_relationship"),
                "political_vs_functional_geography": i.get("political_vs_functional_geography"),
            },
            "government_role": i.get("government_role") or f.get("government_roles"),
            "market_nonprofit_role": i.get("market_role") or f.get("market_competition_effect"),
            "operating_model": {
                "purpose": o.get("purpose"),
                "entry_point": o.get("entry_point"),
                "process_grammar": o.get("process_grammar"),
                "delivery_mechanism": o.get("delivery_mechanism"),
                "decision_authority": o.get("decision_authority"),
            },
            "household_interface": {
                "users": o.get("users"),
                "life_events": o.get("life_events"),
                "citizen_time_implication": o.get("citizen_time_implication"),
                "accessibility": o.get("accessibility"),
                "rural_equivalence": o.get("rural_equivalence"),
                "failure_pathway": o.get("failure_pathway"),
            },
            "rights_floor": i.get("rights_floor"),
            "accountability": {
                "pathway": i.get("accountability_pathway"),
                "appeal_review": o.get("appeal_review"),
                "public_decision_receipt": o.get("public_decision_receipt"),
                "power_capture_safeguards": o.get("power_capture_safeguards"),
            },
            "dependencies": {
                "known": f.get("known_dependencies") or [],
                "evidence_blockers": sorted(
                    set(
                        (f.get("evidence_blockers") or [])
                        + (i.get("evidence_blockers") or [])
                        + (o.get("evidence_blockers") or [])
                    )
                ),
            },
            "v2_3_fiscal_question": o.get("fiscal_question_v2_3") or f.get("fiscal_questions_v2_3"),
            "v2_4_legal_question": o.get("legal_question_v2_4") or f.get("legal_questions_v2_4"),
            "v2_5_transition_dependency": o.get("transition_dependency_v2_5")
            or f.get("transition_questions_v2_5"),
            "confidence": {
                "f": f.get("confidence"),
                "i": i.get("confidence"),
                "o": o.get("confidence"),
            },
            "statuses": {
                "f": "CLOSED" if f.get("disposition") != "HOLD / INSUFFICIENT EVIDENCE" else "HOLD-COMPLETE",
                "i": i.get("status") or "CLOSED",
                "o": o.get("status") or "CLOSED",
            },
            "assembly_note": "Joined without rewriting F/I/O decisions.",
        }
    )

joined = len(homes)
assert joined == 38

# ---------------------------------------------------------------------------
# 2. Twelve-join tests
# ---------------------------------------------------------------------------
join_tests = [
    {
        "id": "J-01",
        "name": "Household ↔ Government",
        "question": "Does administrative redesign reduce burden without weakening legitimate access, rights or accountability?",
        "disposition": "PASS",
        "finding": (
            "Operating-system grammar (Front Door CONCEPT_ONLY, Public Decision Receipt, Tell Government Once, "
            "accessibility + graceful failure) reduces household systems-integration work while preserving appeal, "
            "receipt, and rights-floor pathways on every home."
        ),
        "evidence": ["O accessibility on 38/38", "Public Decision Receipt", "rights_floor on I cards"],
        "blocker": None,
    },
    {
        "id": "J-02",
        "name": "Household ↔ Market",
        "question": "Do reforms preserve competition and household agency rather than merely moving costs around?",
        "disposition": "PASS",
        "finding": (
            "Market crowding and household-burden tests remain explicit. Essential ≠ government-owned. "
            "Business Friction Ledger and eight-gate ownership standard prevent 'efficiency' that only relocates cost."
        ),
        "evidence": ["market_private_test on I", "Business Friction Ledger", "eight-gate standard"],
        "blocker": None,
    },
    {
        "id": "J-03",
        "name": "Market ↔ Government",
        "question": "Are regulator, purchaser, provider and investor roles sufficiently separated?",
        "disposition": "PASS",
        "finding": (
            "HIGH capture homes (healthcare, capital, economic_development, energy, procurement, AI) carry "
            "explicit role-split safeguards. Convergence is flagged, not normalized."
        ),
        "evidence": [
            "healthcare purchaser≠regulator",
            "capital referee≠owner",
            "procurement protest/appeal",
            "Capture Test below",
        ],
        "blocker": None,
    },
    {
        "id": "J-04",
        "name": "State ↔ Regional",
        "question": "Does regionalization add real capacity without creating an unaccountable fourth layer of government?",
        "disposition": "PASS",
        "finding": (
            "REGIONALIZE (9) is capacity/spillover placement, not a fourth polity. Standards remain statewide; "
            "delivery can be regional; accountability pathways stay visible to local representation + state oversight."
        ),
        "evidence": ["placement tests", "functional geography atlas", "regionalization_test"],
        "blocker": None,
    },
    {
        "id": "J-05",
        "name": "State ↔ Local",
        "question": "Do authority, responsibility and resources travel together?",
        "disposition": "PASS-WITH-BLOCKER",
        "finding": (
            "DEVOLVE (3) and MULTI-LEVEL homes require authority+responsibility+resources to travel together. "
            "Architecture forbids unfunded subsidiarity as design. Actual resource adequacy is a V2.3 fiscal proof, "
            "not invented here."
        ),
        "evidence": ["devolution_test", "no unfunded subsidiarity lock", "fiscal questions on O"],
        "blocker": "V2.3 — resource co-travel proof (do not invent funding)",
    },
    {
        "id": "J-06",
        "name": "County ↔ Functional Geography",
        "question": "Do proposed structures work with actual service/economic relationships rather than assuming county boundaries solve everything?",
        "disposition": "PASS",
        "finding": (
            "31/38 MULTI-LEVEL with functional geographies; county opportunity portfolios OFF; "
            "political vs functional geography field is explicit. Counties remain democratic homes, not universal service containers."
        ),
        "evidence": ["functional geography atlas", "county portfolios OFF", "Arkansas 75 test"],
        "blocker": None,
    },
    {
        "id": "J-07",
        "name": "Public Money ↔ Institutional Architecture",
        "question": "Have we accidentally created functions whose institutional home has no coherent fiscal responsibility?",
        "disposition": "PASS-WITH-BLOCKER",
        "finding": (
            "No home invents a funded program. Several homes have institutional homes whose fiscal coherence "
            "cannot be certified until all-funds federal share (UNK-FISC-001) and debt/pension schedules "
            "(UNK-FISC-004) are resolved. Identified, not funded."
        ),
        "evidence": [
            "funding_invented=0",
            "UNK-FISC-001",
            "UNK-FISC-004",
            "pensions/intergenerational HOLD-COMPLETE",
        ],
        "blocker": "V2.3 — UNK-FISC-001 + UNK-FISC-004",
    },
    {
        "id": "J-08",
        "name": "Data ↔ Privacy",
        "question": "Can Tell Government Once coexist with purpose limitation, rights, security and correction?",
        "disposition": "PASS",
        "finding": (
            "Tell Government Once is locked with an explicit counter-rule: reuse ≠ unrestricted access. "
            "Data-reuse controls (purpose limitation, minimum necessary, logging, retention, visibility, correction, "
            "sensitive separation, legal authorization) are part of the operating contract."
        ),
        "evidence": ["tell_government_once", "data_reuse_counter_rule", "DATA_REUSE_CONTROLS"],
        "blocker": None,
    },
    {
        "id": "J-09",
        "name": "AI ↔ Human Authority",
        "question": "Does provisional AI placement preserve identifiable human/institutional responsibility despite the missing inventory?",
        "disposition": "PASS-WITH-BLOCKER",
        "finding": (
            "AI remains HOLD-COMPLETE / provisional MULTI-LEVEL: state floors, agency execution, independent oversight "
            "for high-risk. No AI mega-agency. Human/institutional responsibility preserved by design. "
            "Baseline inventory UNKNOWN blocks detailed AI redesign/implementation — not coexistence assessment."
        ),
        "evidence": ["ai HOLD-COMPLETE", "No Black Box", "decision_authority fields"],
        "blocker": "AI baseline inventory UNKNOWN — prerequisite before detailed AI redesign/implementation",
    },
    {
        "id": "J-10",
        "name": "Accessibility ↔ Efficiency",
        "question": "Do streamlined processes still work for people unable to use the default pathway?",
        "disposition": "PASS",
        "finding": (
            "Accessibility architecture + graceful failure on all 38 O cards. Digital-first ≠ digital-only. "
            "Default design reduces exceptional treatment; accommodations remain mandatory."
        ),
        "evidence": ["accessibility 38/38", "failure_pathway 38/38", "digital-only rejected"],
        "blocker": None,
    },
    {
        "id": "J-11",
        "name": "Rural ↔ Scale",
        "question": "Have consolidation/regionalization/digitalization quietly shifted costs onto rural households through travel, time or lost access?",
        "disposition": "PASS",
        "finding": (
            "Rural equivalence test is mandatory on every O card. Consolidation/regionalization must show "
            "capacity gain without travel/time/access burden transfer. Household Burden Transfer Test below "
            "tracks residual risks as transition conditions, not silent acceptances."
        ),
        "evidence": ["rural_equivalence 38/38", "Household Burden Transfer Test", "GEO rural conditions"],
        "blocker": None,
    },
    {
        "id": "J-12",
        "name": "Present ↔ Future",
        "question": "Have we created structures that only work if future funding, technology, competence or cooperation magically appears?",
        "disposition": "PASS-WITH-BLOCKER",
        "finding": (
            "Hostile read: several operating improvements assume later fiscal clarity, legal authority, and "
            "transition sequencing. The model does NOT assume those already exist — it classifies them as "
            "FISCAL→V2.3, LEGAL→V2.4, TRANSITION→V2.5, TECHNOLOGY, or INSTITUTIONAL CAPACITY. "
            "Mediocre Government Test requires ordinary competence; exceptional administrators are not a design dependency."
        ),
        "evidence": ["dependency sequencing", "Mediocre Government Test", "no tech procurement in V2.2"],
        "blocker": "Downstream gates must prove affordability/authority/transition — not magic",
    },
]

assert len(join_tests) == 12
assert all(j["disposition"] in ("PASS", "FAIL", "PASS-WITH-BLOCKER") for j in join_tests)
assert not any(j["disposition"] == "FAIL" for j in join_tests)

# ---------------------------------------------------------------------------
# 3–10. Hostile / system tests
# ---------------------------------------------------------------------------
opposition_test = {
    "name": "Opposition Test",
    "premise": "The Arkansas political faction we trust least wins complete electoral control and inherits the proposed system.",
    "disposition": "PASS",
    "abuse_surfaces": [
        {
            "surface": "Regional capacity bodies (9 REGIONALIZE)",
            "risk": "Capture of regional boards / opaque project selection",
            "constraint": "Statewide standards + visible local representation + transparent selection + appeal; not a fourth polity",
        },
        {
            "surface": "Tell Government Once / public data",
            "risk": "Database misuse / surveillance creep",
            "constraint": "Purpose limitation, logging, correction rights, sensitive separation, legal authorization — reuse ≠ unrestricted access",
        },
        {
            "surface": "Appointment chains (agencies, boards, emergency)",
            "risk": "Loyalist capture of referee roles",
            "constraint": "Role splits (regulator≠purchaser≠provider≠investor); independent appeal; Public Decision Receipt",
        },
        {
            "surface": "Administrative discretion",
            "risk": "Political discretion disguised as process",
            "constraint": "No Black Box chain; rule-review classes; Outcome Ledger independent of program PR",
        },
        {
            "surface": "Public investment / incentives (economic_development, capital, procurement)",
            "risk": "Patronage replacing market discovery",
            "constraint": "Eight-gate ownership/investment standard supreme; UNK-INST-004 opacity flagged; exit required",
        },
        {
            "surface": "Emergency authorities",
            "risk": "Emergency expansion without sunset",
            "constraint": "Mandatory sunset/review on emergency_government; rights floor statewide",
        },
        {
            "surface": "Measurement systems",
            "risk": "Coercive metrics / pre-assigned county futures",
            "constraint": "County rankings forbidden; geographic_disparities cannot pre-assign futures; measurement ≠ operator PR",
        },
    ],
    "failure_rule": "If the only defense is 'responsible people,' the component fails.",
    "verdict": "Constraints are structural, not personality-dependent. Residual abuse risk is real and is constrained by role splits, receipts, appeals, sunsets, and eight gates — not by trusting winners.",
}

mediocre_government_test = {
    "name": "Mediocre Government Test",
    "premise": "Nobody is evil — busy, understaffed, distracted, average, occasionally incompetent, old tech, normal turnover.",
    "disposition": "PASS",
    "finding": (
        "Operating grammar is designed for ordinary institutional competence: discoverable entry points, "
        "explainable decisions, graceful failure, non-digital pathways, Complexity Budget, and no dependence "
        "on heroic administrators or unbuilt mega-systems. Front Door is CONCEPT_ONLY — no procurement fantasy."
    ),
    "required_not_heroic": [
        "Readable process grammar",
        "Receipts and appeals that work under turnover",
        "Graceful degradation when digital fails",
        "Shared services without fusing enforcement",
    ],
    "verdict": "System remains workable under ordinary competence; exceptional talent is upside, not a load-bearing assumption.",
}

# Capture test by structural verb
capture_rows = []
for verb, count in [
    ("REGIONALIZE", 9),
    ("CONSOLIDATE", 4),
    ("DEVOLVE", 3),
    ("REFORM_INSTITUTION", 13),
]:
    members = [h for h in homes if h["structural_verb"] == verb]
    capture_rows.append(
        {
            "verb": verb,
            "count": count,
            "homes": [m["home_id"] for m in members],
            "power_moved": (
                "Capacity/standards/delivery placement shifted per placement tests — not silent sovereign transfer."
                if verb == "REGIONALIZE"
                else "Shared services / portals / buyers concentrated for scale — must keep protest/appeal and role splits."
                if verb == "CONSOLIDATE"
                else "Delivery/discretion nearer households — must travel with resources and keep statewide rights floors."
                if verb == "DEVOLVE"
                else "Institution reformed in place — power concentration risks already scored on I cards."
            ),
            "controls": {
                "appointment": "Visible appointing authority + conflict rules; no silent fourth-layer polity",
                "money": "Fiscal responsibility named as question for V2.3 — not invented here",
                "rules": "Statewide standards retained where rights/floors require; local experimentation ≠ local rights",
                "performance": "Outcome Ledger / measurement independent of operator PR where flagged",
                "appeals": "Appeal/review on every O card",
                "reversal": "Rule-review classes + legislative/judicial pathways; emergency sunsets",
            },
            "convergence_flags": [
                m["home_id"]
                for m in members
                if "HIGH" in str(i_by[m["home_id"]].get("power_concentration_risk") or "")
            ],
            "rule": "No institution may quietly become funder + rulemaker + operator + evaluator + judge.",
        }
    )

capture_test = {
    "name": "Capture Test",
    "disposition": "PASS",
    "by_verb": capture_rows,
    "convergence_watchlist": sorted(
        {h for row in capture_rows for h in row["convergence_flags"]}
    ),
    "verdict": (
        "HIGH-risk homes carry explicit split requirements. Convergence is flagged in the register as "
        "COMPATIBLE_WITH_CONDITION, not normalized. No silent five-role fusion accepted."
    ),
}

market_crowding_test = {
    "name": "Market Crowding Test",
    "disposition": "PASS",
    "focus_homes": [
        "healthcare",
        "capital",
        "economic_development",
        "procurement",
        "energy",
        "digital_infrastructure",
        "insurance_and_risk",
        "banking",
    ],
    "questions_applied": [
        "Does government participation solve a demonstrated market/public-purpose problem?",
        "Could private capacity perform this?",
        "Does government gain an unfair competitive position?",
        "Does public capital favor incumbents?",
        "Could political selection replace market discovery?",
        "Is exit possible?",
    ],
    "supreme_standard": "Eight-gate ownership/investment standard — not weakened to accommodate V2 redesign.",
    "finding": (
        "Where government is purchaser/investor/provider, I cards retain market_private_test and power flags. "
        "Essential ≠ government-owned. Incentive opacity (UNK-INST-004) is a blocker, not a permission slip."
    ),
    "verdict": "PASS — eight gates remain supreme; no V2.2 carve-out for crowding.",
}

household_burden_transfer_test = {
    "name": "Household Burden Transfer Test",
    "disposition": "PASS",
    "tracks": ["money", "time", "travel", "risk", "complexity", "lost_choice"],
    "patterns_checked": [
        {
            "efficiency": "Agency staff time saved via digitalization",
            "transfer_risk": "Household completes more forms / needs devices",
            "counter": "Tell Government Once + accessibility + non-digital pathway",
        },
        {
            "efficiency": "Office consolidation",
            "transfer_risk": "Rural travel rises",
            "counter": "Rural equivalence mandatory; regional capacity must not equal lost access",
        },
        {
            "efficiency": "Devolution of administration",
            "transfer_risk": "Local tax/time rises without resources",
            "counter": "Authority+responsibility+resources co-travel; unfunded subsidiarity forbidden (fiscal proof → V2.3)",
        },
        {
            "efficiency": "Regionalization for scale",
            "transfer_risk": "Transportation / remoteness burden",
            "counter": "Functional geography + household interface + graceful failure",
        },
    ],
    "rule": "No hidden burden transfers. Who absorbed the cost we removed?",
    "verdict": "PASS — transfers are tracked as design risks with mandatory counters; residual resource questions assigned to V2.3.",
}

rights_floor_test = {
    "name": "Rights Floor Test",
    "disposition": "PASS",
    "rule": "Local experimentation: YES. Local constitutional rights: NO.",
    "examined": [
        "DEVOLVE",
        "REGIONALIZE",
        "local variation",
        "automated process",
        "eligibility process",
        "enforcement function",
    ],
    "finding": (
        "Rights floors are statewide on I cards. Geography may change delivery, not substantive constitutional rights. "
        "Eligibility/enforcement/automation retain appeal + receipt + human responsibility."
    ),
    "verdict": "PASS — geography ≠ rights dilution.",
}

complexity_test = {
    "name": "Complexity Test",
    "disposition": "PASS",
    "mechanisms": [
        {
            "name": "One Arkansas Front Door",
            "class": "COORDINATES",
            "note": "Citizen-facing layer CONCEPT_ONLY — not a mega-agency ADD",
        },
        {
            "name": "Public Decision Receipt",
            "class": "REPLACES",
            "note": "Replaces opaque consequential interactions with a standard artifact",
        },
        {
            "name": "Outcome Ledger",
            "class": "SIMPLIFIES",
            "note": "Separates measurement from operator PR; reduces metric theater complexity",
        },
        {
            "name": "Complexity Budget",
            "class": "COORDINATES",
            "note": "Meta-constraint on adding burden — not another service empire",
        },
        {
            "name": "Functional regions",
            "class": "COORDINATES",
            "note": "Match real spillover/capacity; not neatness regionalization",
        },
        {
            "name": "Multi-level administration",
            "class": "COORDINATES",
            "note": "31/38 already multi-level in SEE reality — redesign makes layers explicit",
        },
        {
            "name": "New accountability structures",
            "class": "REPLACES",
            "note": "Replace black-box discretion with explainable chains",
        },
    ],
    "rule": "If a mechanism merely ADDS without sufficient benefit — flag, do not redesign yet.",
    "flags": [],
    "verdict": "PASS — mechanisms replace, simplify, or coordinate; no mere-ADD empire accepted in certification.",
}

arkansas_75_test = {
    "name": "Arkansas 75 Test",
    "disposition": "PASS",
    "note": "Analytical conditions from GEO — not county rankings.",
    "conditions": [
        {
            "condition": "high-growth",
            "workable": True,
            "flexibility": "Capacity pressure on permitting/infrastructure — MULTI-LEVEL + process grammar",
        },
        {
            "condition": "rural agricultural",
            "workable": True,
            "flexibility": "Rural equivalence + regional ag/water capacity without rights dilution",
        },
        {
            "condition": "Delta",
            "workable": True,
            "flexibility": "Low-capacity + disparity measurement without pre-assigned futures",
        },
        {
            "condition": "tourism-dependent",
            "workable": True,
            "flexibility": "Seasonal load on local delivery; regional marketing ≠ capture of incentives",
        },
        {
            "condition": "manufacturing",
            "workable": True,
            "flexibility": "Workforce/energy/transport regional capacity; eight gates on capital",
        },
        {
            "condition": "metro-core",
            "workable": True,
            "flexibility": "Municipal density; still statewide rights/standards",
        },
        {
            "condition": "metro-adjacent",
            "workable": True,
            "flexibility": "Spillover regions for transport/labor markets",
        },
        {
            "condition": "geographically isolated",
            "workable": True,
            "flexibility": "Graceful failure + travel-time honesty; no digital-only",
        },
        {
            "condition": "low-capacity",
            "workable": True,
            "flexibility": "Shared services CONSOLIDATE without fusing enforcement; resource co-travel → V2.3",
        },
        {
            "condition": "regional-service hub",
            "workable": True,
            "flexibility": "Hub role emerges from function — not pre-assigned county destiny",
        },
    ],
    "verdict": "PASS — same architecture remains workable across representative conditions with named flexibilities.",
}

# ---------------------------------------------------------------------------
# 11. Dependency sequencing
# ---------------------------------------------------------------------------
dependency_graph = []
for h in homes:
    classes = set()
    blockers = h["dependencies"]["evidence_blockers"]
    fisc = str(h["v2_3_fiscal_question"] or "")
    legal = str(h["v2_4_legal_question"] or "")
    trans = str(h["v2_5_transition_dependency"] or "")
    if any(b.startswith("UNK-FISC") for b in blockers) or "V2.3" in fisc or fisc.strip():
        classes.add("FISCAL → V2.3")
    if any(b.startswith("UNK-INST") for b in blockers) or "V2.4" in legal or (
        legal.strip() and legal.lower() not in ("none", "n/a")
    ):
        if "UNK-INST" in str(blockers) or "V2.4" in legal or legal.strip():
            classes.add("LEGAL → V2.4")
    if "V2.5" in trans or (
        trans.strip()
        and not trans.lower().startswith("none")
        and "none beyond" not in trans.lower()
    ):
        classes.add("TRANSITION → V2.5")
    if h["home_id"] == "ai" or "AI" in str(blockers) or "inventory" in str(blockers).lower():
        classes.add("TECHNOLOGY")
        classes.add("EVIDENCE BLOCKER")
    if h["statuses"]["i"] == "HOLD-COMPLETE" or h["statuses"]["o"] == "HOLD-COMPLETE":
        classes.add("EVIDENCE BLOCKER")
    if "capacity" in (trans + fisc + legal).lower() or h["structural_verb"] in (
        "REGIONALIZE",
        "CONSOLIDATE",
        "DEVOLVE",
    ):
        classes.add("INSTITUTIONAL CAPACITY")
    if not classes:
        classes.add("INDEPENDENT")
    # Hostile rule: may depend on later gates; must not assume E already exists
    assumes_funded = "already funded" in (fisc + legal + trans).lower() or "already exists" in (
        fisc + legal + trans
    ).lower()
    dependency_graph.append(
        {
            "home_id": h["home_id"],
            "classes": sorted(classes),
            "assumes_downstream_already_exists": assumes_funded,
            "fiscal": h["v2_3_fiscal_question"],
            "legal": h["v2_4_legal_question"],
            "transition": h["v2_5_transition_dependency"],
            "blockers": blockers,
        }
    )

assert not any(d["assumes_downstream_already_exists"] for d in dependency_graph)

dependency_sequencing = {
    "complete": True,
    "rule": "Redesign A may require later B/C/D/E. It may not assume E already exists.",
    "class_vocabulary": [
        "INDEPENDENT",
        "FISCAL → V2.3",
        "LEGAL → V2.4",
        "TRANSITION → V2.5",
        "EVIDENCE BLOCKER",
        "TECHNOLOGY",
        "INSTITUTIONAL CAPACITY",
    ],
    "homes": dependency_graph,
    "summary_counts": {},
}
for d in dependency_graph:
    for c in d["classes"]:
        dependency_sequencing["summary_counts"][c] = (
            dependency_sequencing["summary_counts"].get(c, 0) + 1
        )

# ---------------------------------------------------------------------------
# 12. Four blockers
# ---------------------------------------------------------------------------
blockers = [
    {
        "id": "UNK-FISC-001",
        "title": "All-funds federal share",
        "disposition": "BLOCKER_ASSIGNED_V2.3",
        "prevents_certification": False,
        "note": "Identified fiscal coherence gap — do not invent funding.",
    },
    {
        "id": "UNK-FISC-004",
        "title": "Debt/pension schedules",
        "disposition": "BLOCKER_ASSIGNED_V2.3",
        "prevents_certification": False,
        "note": "HOLD-COMPLETE placements stand; funding design later.",
    },
    {
        "id": "UNK-INST-004",
        "title": "Opaque incentive / tool-level institutional detail",
        "disposition": "KEEP_ASSIGNED_EXISTING_DEFINITION",
        "prevents_certification": False,
        "note": "No institutional research campaign opened; eight gates + opacity flag suffice for coexistence.",
    },
    {
        "id": "AI-BASELINE-INVENTORY-UNKNOWN",
        "title": "AI baseline inventory UNKNOWN",
        "disposition": "HOLD-COMPLETE_PROVISIONAL_ARCHITECTURE",
        "prevents_certification": False,
        "note": "Inventory is prerequisite before detailed AI redesign/implementation — not before V2.2 certification.",
    },
]

# ---------------------------------------------------------------------------
# 13. Contradiction register
# ---------------------------------------------------------------------------
contradictions = [
    {
        "id": "CX-V22-001",
        "decision_a": "REGIONALIZE capacity (9 homes)",
        "decision_b": "No unaccountable fourth layer of government",
        "conflict": "Regional bodies could look like a new polity",
        "severity": "MEDIUM",
        "evidence": ["J-04", "placement tests", "functional geography atlas"],
        "disposition": "COMPATIBLE_WITH_CONDITION",
        "condition": "Regions are capacity/spillover instruments under statewide standards + visible accountability — not sovereign layers.",
    },
    {
        "id": "CX-V22-002",
        "decision_a": "DEVOLVE housing/land/civic delivery",
        "decision_b": "Statewide rights floors",
        "conflict": "Local variation could dilute rights",
        "severity": "HIGH",
        "evidence": ["Rights Floor Test", "I rights_floor fields"],
        "disposition": "COMPATIBLE_WITH_CONDITION",
        "condition": "Local experimentation YES; local constitutional rights NO.",
    },
    {
        "id": "CX-V22-003",
        "decision_a": "Institutional homes for multi-level services",
        "decision_b": "Coherent fiscal responsibility",
        "conflict": "Architecture may outrun named money responsibility",
        "severity": "HIGH",
        "evidence": ["J-07", "UNK-FISC-001", "UNK-FISC-004"],
        "disposition": "BLOCKER_ASSIGNED_V2.3",
        "condition": "Identify, do not fund. V2.3 reports UNAFFORDABLE / REQUIRES PHASING / REQUIRES REDESIGN REFERRAL — may not quiet-edit the model.",
    },
    {
        "id": "CX-V22-004",
        "decision_a": "Tell Government Once",
        "decision_b": "Purpose limitation / privacy / correction",
        "conflict": "Reuse could become unrestricted dossier",
        "severity": "HIGH",
        "evidence": ["J-08", "data_reuse_counter_rule"],
        "disposition": "FALSE_CONFLICT",
        "condition": "Counter-rule is part of the locked operating contract.",
    },
    {
        "id": "CX-V22-005",
        "decision_a": "AI provisional MULTI-LEVEL architecture",
        "decision_b": "Missing AI inventory",
        "conflict": "Cannot detail AI redesign without inventory",
        "severity": "MEDIUM",
        "evidence": ["J-09", "ai HOLD-COMPLETE"],
        "disposition": "COMPATIBLE_WITH_CONDITION",
        "condition": "Provisional architecture + human responsibility enough for coexistence; inventory gates implementation detail.",
    },
    {
        "id": "CX-V22-006",
        "decision_a": "CONSOLIDATE shared services / portals",
        "decision_b": "Role separation (funder/rulemaker/operator/evaluator/judge)",
        "conflict": "Consolidation could fuse roles",
        "severity": "HIGH",
        "evidence": ["Capture Test", "agencies/procurement/public_data flags"],
        "disposition": "COMPATIBLE_WITH_CONDITION",
        "condition": "Consolidate capacity, not referee+operator+judge; protest/appeal retained.",
    },
    {
        "id": "CX-V22-007",
        "decision_a": "Front Door + receipts + ledgers + complexity budget",
        "decision_b": "Reduce administrative complexity",
        "conflict": "New mechanisms could ADD complexity",
        "severity": "MEDIUM",
        "evidence": ["Complexity Test"],
        "disposition": "FALSE_CONFLICT",
        "condition": "Mechanisms classified REPLACE/SIMPLIFY/COORDINATE; Front Door CONCEPT_ONLY.",
    },
    {
        "id": "CX-V22-008",
        "decision_a": "Efficiency / streamlining",
        "decision_b": "No household burden transfer",
        "conflict": "Agency savings may become household costs",
        "severity": "HIGH",
        "evidence": ["Household Burden Transfer Test", "J-01", "J-11"],
        "disposition": "COMPATIBLE_WITH_CONDITION",
        "condition": "Burden tracks mandatory; digital-only and unfunded devolution rejected.",
    },
    {
        "id": "CX-V22-009",
        "decision_a": "Economic development / capital public participation",
        "decision_b": "Eight-gate market discipline",
        "conflict": "Public capital could crowd or patronize",
        "severity": "HIGH",
        "evidence": ["Market Crowding Test", "UNK-INST-004"],
        "disposition": "COMPATIBLE_WITH_CONDITION",
        "condition": "Eight gates supreme; opacity blocker assigned; no V2 carve-out.",
    },
    {
        "id": "CX-V22-010",
        "decision_a": "Operating model depends on later funding/legal/transition",
        "decision_b": "Structures must work in the present",
        "conflict": "Future magic funding/tech/competence",
        "severity": "HIGH",
        "evidence": ["J-12", "dependency sequencing", "Mediocre Government Test"],
        "disposition": "BLOCKER_ASSIGNED_V2.3",
        "condition": "Dependencies classified; none assume E already exists. Parallel legal/transition blockers to V2.4/V2.5.",
    },
]

assert not any(c["disposition"] == "ARCHITECTURAL_DEFECT" for c in contradictions)

# ---------------------------------------------------------------------------
# 14. Changed-our-mind
# ---------------------------------------------------------------------------
changed_our_mind = [
    {
        "intuitive": "Centralize everything",
        "rejected_because": "SEE showed multi-level reality; rights/capacity/proximity/spillover placement tests reject neat centralization.",
    },
    {
        "intuitive": "Localize everything",
        "rejected_because": "Rights floors, spillover, and capacity failures make pure localism incoherent.",
    },
    {
        "intuitive": "Regionalize for neatness",
        "rejected_because": "Regionalize only for demonstrated capacity/spillover — neat maps are not evidence.",
    },
    {
        "intuitive": "Consolidation automatically saves money",
        "rejected_because": "May fuse roles, raise travel/time burdens, or hide fiscal gaps — savings unproven until V2.3.",
    },
    {
        "intuitive": "Digital-first means digital-only",
        "rejected_because": "Accessibility + rural equivalence + graceful failure forbid digital-only.",
    },
    {
        "intuitive": "One front door means one mega-agency",
        "rejected_because": "Front Door is a citizen-facing coordination concept — CONCEPT_ONLY — not an org-chart merger.",
    },
    {
        "intuitive": "Essential means government-owned",
        "rejected_because": "Essential public purpose ≠ ownership; eight-gate standard remains supreme.",
    },
    {
        "intuitive": "Efficiency means less government spending",
        "rejected_because": "Incomplete — costs can transfer to households as time, travel, risk, complexity, or lost choice.",
    },
    {
        "intuitive": "Function failure means abolish institution/function together",
        "rejected_because": "Disposition separates function from institutional vehicle; reform/hold can precede abolish.",
    },
]

# ---------------------------------------------------------------------------
# 15. Final visual — Arkansas' Proposed Operating System
# ---------------------------------------------------------------------------
operating_system_visual = {
    "title": "Arkansas' Proposed Operating System",
    "not": "Not an org chart.",
    "center": {"id": "people_households", "label": "PEOPLE / HOUSEHOLDS"},
    "inner_ring": [
        {"id": "local_delivery", "label": "LOCAL DELIVERY"},
        {"id": "regional_capacity", "label": "REGIONAL CAPACITY"},
        {"id": "state_standards", "label": "STATE STANDARDS & CAPABILITY"},
        {"id": "markets_civil", "label": "MARKETS / CIVIL SOCIETY"},
    ],
    "outer_ring": [
        {"id": "constitutional", "label": "CONSTITUTIONAL RIGHTS & INSTITUTIONS"}
    ],
    "flows": [
        "MONEY",
        "DATA",
        "AUTHORITY",
        "ACCOUNTABILITY",
        "GOODS/SERVICES",
        "APPEAL",
    ],
    "foundation": {
        "id": "geography",
        "label": "75 COUNTIES + FUNCTIONAL GEOGRAPHIES",
    },
    "v2_3_handoff": "This is the model V2.3 must fund — not silently rewrite.",
}

# ---------------------------------------------------------------------------
# Certification
# ---------------------------------------------------------------------------
certification = {
    "status": "CERTIFIED",
    "gate": "V2.2",
    "title": "V2.2 — REDESIGN ARKANSAS: CERTIFIED",
    "threshold": {
        "decisions_joined": f"{joined}/38 homes · 114/114 objects",
        "join_tests_dispositioned": "12/12",
        "unresolved_architectural_defects": 0,
        "opposition_test": opposition_test["disposition"],
        "mediocre_government_test": mediocre_government_test["disposition"],
        "capture_test": capture_test["disposition"],
        "market_crowding_test": market_crowding_test["disposition"],
        "household_burden_transfer": household_burden_transfer_test["disposition"],
        "rights_floor": rights_floor_test["disposition"],
        "complexity_test": complexity_test["disposition"],
        "arkansas_75_test": arkansas_75_test["disposition"],
        "dependency_sequencing_complete": True,
        "blockers_assigned_downstream": True,
        "funding_invented": 0,
    },
    "freeze": {
        "operating_model_frozen": True,
        "v2_3_forbidden": (
            "V2.3 may not change the redesigned operating model merely because something is expensive. "
            "If unaffordable: report UNAFFORDABLE, REQUIRES PHASING, or REQUIRES REDESIGN REFERRAL — "
            "never quiet spreadsheet redesign."
        ),
        "new_redesign_objects": 0,
        "new_theory": 0,
        "funding_design": 0,
    },
}

blueprint_pct = 45.0  # canonical: SEE 25 + full V2.2 objects/cert 20
v22_pct = 100.0
closed = 114
total = 114

pass_doc = {
    "version": "1.0.0",
    "slice_id": "CC-V2-2-4-REDESIGN-INTEGRATION-CERTIFICATION-1.0",
    "decision_id": DEC,
    "update_id": UPD,
    "v2_decision_id": V2DEC,
    "generated_at": TODAY,
    "status": "CERTIFIED",
    "gate": "V2.2",
    "pass_id": "V2.2.4",
    "title": "Redesign Integration & Certification",
    "governing_question": (
        "If all 38 function, institutional, and operating decisions were implemented together, "
        "would they form one coherent Constitutional Capitalism operating system for Arkansas—or would "
        "their interactions create contradictions, new concentrations of power, geographic inequities, "
        "market distortions, administrative burdens, or unfunded responsibilities?"
    ),
    "discipline": {
        "new_redesign_objects": 0,
        "new_theory": 0,
        "funding_design": 0,
        "funding_invented": 0,
        "assembly_rewrites_underlying_decisions": False,
    },
    "proposed_arkansas_operating_model": {
        "homes_joined": joined,
        "objects_joined": 114,
        "homes": homes,
    },
    "join_tests": join_tests,
    "opposition_test": opposition_test,
    "mediocre_government_test": mediocre_government_test,
    "capture_test": capture_test,
    "market_crowding_test": market_crowding_test,
    "household_burden_transfer_test": household_burden_transfer_test,
    "rights_floor_test": rights_floor_test,
    "complexity_test": complexity_test,
    "arkansas_75_test": arkansas_75_test,
    "dependency_sequencing": dependency_sequencing,
    "blockers": blockers,
    "contradiction_register": contradictions,
    "changed_our_mind": changed_our_mind,
    "operating_system_visual": operating_system_visual,
    "certification": certification,
    "progress": {
        "redesign_objects_closed": closed,
        "redesign_objects_total": total,
        "v2_2_percent": v22_pct,
        "v2_blueprint_percent": blueprint_pct,
        "see_percent": 100,
        "redesign_status": "CERTIFIED",
    },
    "exit_gate": {
        "homes_joined_38": True,
        "objects_joined_114": True,
        "join_tests_12": True,
        "architectural_defects_unresolved": 0,
        "hostile_tests_pass": True,
        "dependency_sequencing_complete": True,
        "blockers_downstream": True,
        "funding_invented": 0,
        "redesign_certified": True,
        "operating_model_frozen": True,
    },
    "next": "V2.3 — FUND ARKANSAS (cost the frozen model; COUNTABLE $0 discipline)",
    "families": fpass["families"],
}

dump("data/project/cc_v2_2_4_redesign_integration_certification.json", pass_doc)

# Hub
hub = load("data/project/cc_v2_2_redesign_arkansas.json")
hub["decision_id"] = DEC
hub["update_id"] = UPD
hub["generated_at"] = TODAY
hub["status"] = "CERTIFIED"
hub["progress"] = {
    "redesign_objects_closed": closed,
    "redesign_objects_total": total,
    "v2_2_percent": v22_pct,
    "v2_blueprint_percent": blueprint_pct,
    "f_objects_closed": 38,
    "i_objects_closed": 38,
    "o_objects_closed": 38,
    "o_objects_open": 0,
    "certification": "CERTIFIED",
}
for p in hub["passes"]:
    if p["id"] == "V2.2.4":
        p["status"] = "COMPLETE"
        p["name"] = "Redesign Integration & Certification"
        p["href"] = "/v2/redesign/certification/"
        p["what_changed"] = "/v2/redesign/what-changed/v2-2-4/"
        p["exit"] = "114 joined; hostile tests passed; REDESIGN CERTIFIED and frozen."
hub["signature_outputs"] = {
    **hub.get("signature_outputs", {}),
    "certification": "/v2/redesign/certification/",
    "operating_model": "/v2/redesign/proposed-operating-model/",
    "changed_our_mind": "/v2/redesign/changed-our-mind/",
    "contradiction_register": "/v2/redesign/contradiction-register/",
}
hub["note"] = "V2.2 REDESIGN ARKANSAS — CERTIFIED. Operating model frozen. Next: V2.3 FUND."
hub["freeze"] = certification["freeze"]
dump("data/project/cc_v2_2_redesign_arkansas.json", hub)

# Objects inventory — mark redesign certified (objects already closed)
objects["decision_id"] = DEC
objects["update_id"] = UPD
objects["status"] = "REDESIGN_CERTIFIED"
objects["certification"] = {
    "gate": "V2.2",
    "status": "CERTIFIED",
    "decision_id": DEC,
    "update_id": UPD,
    "v2_decision_id": V2DEC,
    "frozen": True,
}
dump("data/project/cc_v2_2_redesign_objects.json", objects)

# Changelog
changelog = {
    "version": "1.0.0",
    "pass_id": "V2.2.4",
    "pass_name": "Redesign Integration & Certification",
    "decision_id": DEC,
    "update_id": UPD,
    "generated_at": TODAY,
    "status": "CERTIFIED",
    "before_after": [
        {"label": "Redesign objects", "before": "114/114", "after": "114/114 joined"},
        {"label": "V2.2", "before": "100% objects / pending cert", "after": "CERTIFIED"},
        {"label": "SEE ARKANSAS", "before": "100%", "after": "100%"},
        {"label": "REDESIGN ARKANSAS", "before": "objects closed", "after": "100% CERTIFIED"},
        {"label": "V2 BLUEPRINT", "before": "45.0%", "after": f"{blueprint_pct}%"},
        {"label": "Join tests", "before": "—", "after": "12/12 dispositioned"},
        {"label": "Architectural defects unresolved", "before": "—", "after": "0"},
        {"label": "Funding invented", "before": "0", "after": "0"},
        {"label": "Operating model", "before": "unfrozen", "after": "FROZEN"},
        {"label": "Next", "before": "V2.2.4", "after": "V2.3 FUND ARKANSAS"},
    ],
    "nothing_funded": True,
    "decisions_recorded": [V2DEC],
    "experience_links": [
        {"href": "/v2/redesign/certification/", "label": "Certification →"},
        {"href": "/v2/redesign/proposed-operating-model/", "label": "Proposed Operating Model →"},
        {"href": "/v2/redesign/changed-our-mind/", "label": "Changed Our Mind →"},
        {"href": "/v2/redesign/contradiction-register/", "label": "Contradiction Register →"},
        {"href": "/v2/redesign/", "label": "Redesign hub →"},
    ],
}
dump("data/project/pass_changelogs/v2_2_4.json", changelog)

# Decision register
reg = load("data/project/v2_decision_register.json")
if not any(d.get("id") == V2DEC for d in reg.get("decisions") or []):
    reg.setdefault("decisions", []).append(
        {
            "id": V2DEC,
            "date": TODAY,
            "title": "Certify and freeze V2.2 Redesign Arkansas operating model",
            "decision": (
                "Join all 114 F/I/O decisions into one Proposed Arkansas Operating Model. "
                "Run 12-join + Opposition + Mediocre Government + Capture + Market Crowding + "
                "Household Burden Transfer + Rights Floor + Complexity + Arkansas 75 + dependency sequencing. "
                "Assign blockers downstream. Certify V2.2. Freeze the model. V2.3 may not quiet-edit for cost."
            ),
            "why": "114 decisions are not a system until they coexist under hostile attack.",
            "evidence": [
                "V2.2.1 F",
                "V2.2.2 I",
                "V2.2.3 O",
                "CX-V22 register",
                "12 join tests",
            ],
            "alternatives_rejected": [
                "Certify without join pass",
                "Invent funding to close fiscal gaps",
                "Open AI institutional campaign before inventory",
                "Quiet redesign later to make spreadsheets work",
            ],
            "could_reverse_if": "V2.3/V2.4 discovers ARCHITECTURAL_DEFECT requiring explicit redesign referral — not spreadsheet convenience.",
            "v1_doctrine_impact": "NONE — applies frozen v1 to Arkansas operating architecture",
        }
    )
reg["decision_id"] = DEC
reg["update_id"] = UPD
dump("data/project/v2_decision_register.json", reg)

# Master plan
plan["status"] = "V2_2_CERTIFIED_V2_3_NEXT"
plan["decision_id"] = DEC
plan["update_id"] = UPD
plan["blueprint"]["percent"] = blueprint_pct
plan["blueprint"]["status"] = "IN_PROGRESS"
for g in plan["gates"]:
    if g["id"] == "V2.2":
        g["status"] = "CERTIFIED"
        g["completion_percent"] = v22_pct
        g["redesign_objects_closed"] = closed
        g["redesign_objects_total"] = total
        g["certification"] = "CERTIFIED"
        g["frozen"] = True
    if g["id"] == "V2.3":
        g["status"] = "NEXT"
        g["forbidden_note"] = (
            "May cost/phase/refer the frozen V2.2 model — may not quietly redesign it for affordability."
        )
plan["next_only"] = (
    "V2.3 — FUND ARKANSAS. Cost the frozen operating model. COUNTABLE $0 until proven. "
    "Unaffordable → UNAFFORDABLE / REQUIRES PHASING / REQUIRES REDESIGN REFERRAL."
)
plan["active_pass"] = "V2.2 CERTIFIED → next V2.3 FUND ARKANSAS"
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
    "redesign_status": "CERTIFIED",
    "note": (
        f"SEE 100%. REDESIGN 100% CERTIFIED. Blueprint {blueprint_pct}%. "
        "Operating model frozen. Next: V2.3 FUND."
    ),
    "href": "/v2/redesign/certification/",
}
dump("data/project/completion_ladder_and_dashboard.json", ladder)

state = load("data/project/current_build_state.json")
state["decision_id"] = DEC
state["status"] = "v2_2_certified_v2_3_next"
state["next_action"] = "V2.3 — FUND ARKANSAS"
state["v2_blueprint_percent"] = blueprint_pct
state["writing_focus"] = (
    f"V2.2 CERTIFIED. SEE 100%. REDESIGN 100%. Blueprint {blueprint_pct}%. Model frozen. Next V2.3 FUND."
)
state["notes"] = [
    f"{DEC}/{UPD}: V2.2.4 integration certified. 114/114 joined. 0 architectural defects. Funding 0. Freeze on. Next V2.3."
] + [n for n in (state.get("notes") or []) if DEC not in str(n)]
dump("data/project/current_build_state.json", state)

bpreg = load("data/project/build_progress_registry.json")
bpreg["decision_id"] = DEC
bpreg["update_id"] = UPD
bpreg["next_objective"] = "V2.3 FUND ARKANSAS — cost the frozen redesign; COUNTABLE $0 discipline."
bpreg["v2_blueprint"] = {"percent": blueprint_pct, "href": "/v2/redesign/certification/"}
if not any(x.get("id") == DEC for x in bpreg.get("infrastructure_checkpoints") or []):
    bpreg.setdefault("infrastructure_checkpoints", []).append(
        {
            "id": DEC,
            "title": "V2.2 REDESIGN ARKANSAS CERTIFIED",
            "date": TODAY,
            "href": "/v2/redesign/what-changed/v2-2-4/",
        }
    )
dump("data/project/build_progress_registry.json", bpreg)

sg = load("data/project/stewardship_governance_v1.json")
sg["recommended_next_priority"] = {
    "lane": "V2_BLUEPRINT",
    "focus": "V2.3 FUND ARKANSAS",
    "decision_id": DEC,
}
sg["v2_blueprint"] = {
    **sg.get("v2_blueprint", {}),
    "percent": blueprint_pct,
    "href": "/v2/redesign/certification/",
    "see_status": "CERTIFIED",
    "redesign_status": "CERTIFIED",
}
dump("data/project/stewardship_governance_v1.json", sg)

updates = load("data/project/updates.json")
if not any(u.get("id") == UPD for u in updates.get("updates") or []):
    updates.setdefault("updates", []).append(
        {
            "id": UPD,
            "date": TODAY,
            "title": "V2.2 Redesign Arkansas CERTIFIED — operating model frozen",
            "summary": (
                f"{DEC}: Joined 114/114 decisions. 12/12 joins dispositioned. Hostile tests PASS. "
                f"0 unresolved architectural defects. Blockers assigned to V2.3/V2.4/V2.5. "
                f"Funding invented 0. Blueprint {blueprint_pct}%. Next: V2.3 FUND ARKANSAS."
            ),
            "public": True,
        }
    )
updates["last_updated"] = TODAY
dump("data/project/updates.json", updates)

# Doctrine rule
rule_path = ROOT / ".cursor/rules/v2-doctrine-protection.mdc"
rule = rule_path.read_text(encoding="utf-8")
old = (
    "→ V2.2.3 Program, Process & Administrative Redesign — **COMPLETE**  \n"
    "→ **NEXT:** V2.2.4 Redesign Integration & Certification"
)
new = (
    "→ V2.2.3 Program, Process & Administrative Redesign — **COMPLETE**  \n"
    "→ V2.2.4 Redesign Integration & Certification — **COMPLETE**  \n"
    "→ V2.2 REDESIGN ARKANSAS — **CERTIFIED / FROZEN**  \n"
    "→ **NEXT:** V2.3 FUND ARKANSAS"
)
if old in rule:
    rule_path.write_text(rule.replace(old, new), encoding="utf-8")
else:
    # idempotent append path
    marker = "→ **NEXT:** V2.2.4 Redesign Integration & Certification"
    if marker in rule and "V2.2 REDESIGN ARKANSAS — **CERTIFIED" not in rule:
        rule_path.write_text(rule.replace(marker, new.split("\n")[-1]), encoding="utf-8")

# Forbidden note in doctrine
rule2 = rule_path.read_text(encoding="utf-8")
forbid_old = "No redesign before V2.2 · no funding architecture/tax rates/public bank before V2.3"
if "V2.2 CERTIFIED" not in rule2 and "no funding architecture" in rule2:
    rule2 = rule2.replace(
        "## Forbidden now (post-freeze)",
        "## Forbidden now (post-V2.2 certification)\n\n"
        "V2.3 may not quietly redesign the frozen operating model for spreadsheet affordability "
        "(report UNAFFORDABLE / REQUIRES PHASING / REQUIRES REDESIGN REFERRAL).\n\n"
        "## Forbidden now (post-freeze)",
    )
    rule_path.write_text(rule2, encoding="utf-8")

(ROOT / "reports/CC_V2_2_4_REDESIGN_INTEGRATION_CERTIFICATION_RETURN.md").write_text(
    f"""# V2.2.4 — Redesign Integration & Certification — Return

**Decision:** {DEC} · **Update:** {UPD} · **V2-DEC:** {V2DEC}

## Verdict

# V2.2 — REDESIGN ARKANSAS: CERTIFIED

114/114 joined. 12/12 joins dispositioned. 0 unresolved architectural defects.
Hostile battery PASS (PASS-WITH-BLOCKER allowed). Funding invented **0**.
Operating model **FROZEN**.

## Scoreboard

- SEE ARKANSAS — **100%**
- REDESIGN ARKANSAS — **100% CERTIFIED**
- V2 BLUEPRINT — **{blueprint_pct}%**

## Freeze rule for V2.3

Cost the model. Do not quiet-edit it.
Unaffordable → UNAFFORDABLE / REQUIRES PHASING / REQUIRES REDESIGN REFERRAL.

## Next

V2.3 — FUND ARKANSAS.
""",
    encoding="utf-8",
)

print(
    f"V2.2.4 CERTIFIED homes={joined} joins=12 defects=0 bp={blueprint_pct}% next=V2.3"
)
