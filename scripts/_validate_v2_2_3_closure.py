#!/usr/bin/env python3
"""V2.2.3 closure gate validation."""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
errors: list[str] = []


def load(rel: str):
    return json.loads((ROOT / rel).read_text(encoding="utf-8"))


objs = load("data/project/cc_v2_2_redesign_objects.json")
passd = load("data/project/cc_v2_2_3_program_process_administrative_redesign.json")
hub = load("data/project/cc_v2_2_redesign_arkansas.json")
ladder = load("data/project/completion_ladder_and_dashboard.json")

O = [o for o in objs["objects"] if o["type"] == "O"]
closed = sum(1 for o in objs["objects"] if o["status"] in ("CLOSED", "HOLD-COMPLETE"))
o_closed = sum(1 for o in O if o["status"] in ("CLOSED", "HOLD-COMPLETE"))
if len(O) != 38:
    errors.append(f"O count {len(O)}")
if o_closed != 38:
    errors.append(f"O closed {o_closed}")
if closed != 114:
    errors.append(f"total closed {closed}")

req_card = [
    "home_id",
    "users",
    "purpose",
    "entry_point",
    "process_grammar",
    "decision_authority",
    "information_required",
    "data_reuse_rules",
    "delivery_mechanism",
    "decision_explanation",
    "appeal_review",
    "citizen_time_implication",
    "accessibility",
    "rural_equivalence",
    "failure_pathway",
    "output_measures",
    "outcome_measures",
    "power_capture_safeguards",
    "fiscal_question_v2_3",
    "legal_question_v2_4",
    "transition_dependency_v2_5",
    "confidence",
    "what_changes_our_mind",
]
cards = passd.get("cards") or []
if len(cards) != 38:
    errors.append(f"cards {len(cards)}")
for c in cards:
    for k in req_card:
        if k not in c or c[k] in (None, ""):
            errors.append(f"{c.get('home_id')} missing {k}")

locks = [
    "public_service_operating_standard",
    "universal_process_grammar",
    "life_events",
    "one_arkansas_front_door",
    "tell_government_once",
    "public_decision_receipt",
    "no_black_box_government",
    "citizen_time_tax",
    "business_friction_ledger",
    "program_purpose_card",
    "public_outcome_ledger",
    "complexity_budget",
    "procurement_process",
    "grants_incentives_process",
    "before_after_visual",
    "exit_gate",
]
for k in locks:
    if k not in passd:
        errors.append(f"missing lock {k}")

lp = passd.get("locked_principles") or {}
if lp.get("funding_invented") != 0:
    errors.append("funding invented !=0")
if lp.get("no_tech_architecture") is not True:
    errors.append("tech arch not blocked")
if passd.get("one_arkansas_front_door", {}).get("status") != "CONCEPT_ONLY":
    errors.append("front door not concept")
eg = passd.get("exit_gate") or {}
if eg.get("redesign_certified") is not False:
    errors.append("must not certify redesign yet")
if eg.get("o_objects_38") is not True:
    errors.append("exit o not true")
if eg.get("funding_invented") != 0:
    errors.append("exit funding")

prog = passd.get("progress") or {}
if prog.get("redesign_objects_closed") != 114:
    errors.append("prog closed")
if prog.get("v2_2_percent") != 100.0:
    errors.append(f"v22 {prog.get('v2_2_percent')}")
if prog.get("v2_blueprint_percent") != 45.0:
    errors.append(f"bp {prog.get('v2_blueprint_percent')}")
if hub.get("progress", {}).get("redesign_objects_closed") != 114:
    errors.append("hub closed")
if (ladder.get("v2_blueprint") or {}).get("percent") != 45.0:
    errors.append("ladder bp")

if passd.get("decision_id") != "CC-DEC-203":
    errors.append("DEC")
if passd.get("update_id") != "UPD-216":
    errors.append("UPD")
if passd.get("v2_decision_id") != "V2-DEC-017":
    errors.append("V2DEC")
if passd.get("status") != "COMPLETE":
    errors.append("status")

pages = [
    "apps/book-site/src/pages/v2/redesign/operating-system/index.astro",
    "apps/book-site/src/pages/v2/redesign/life-events/index.astro",
    "apps/book-site/src/pages/v2/redesign/public-decision-receipt/index.astro",
    "apps/book-site/src/pages/v2/redesign/what-changed/v2-2-3/index.astro",
]
for p in pages:
    if not (ROOT / p).exists():
        errors.append(f"missing page {p}")

blockers = set()
for c in cards:
    for b in c.get("evidence_blockers") or []:
        blockers.add(b)

print("GATE", "PASS" if not errors else "FAIL")
print("objects", f"{closed}/114")
print("O", f"{o_closed}/38")
print("v22", prog.get("v2_2_percent"), "bp", prog.get("v2_blueprint_percent"))
print("funding", lp.get("funding_invented"))
print("open_blockers", sorted(blockers))
print("hold_o", prog.get("o_hold_complete"))
print("redesign_certified", eg.get("redesign_certified"))
if errors:
    print("ERRORS:")
    for e in errors[:50]:
        print(" -", e)
    sys.exit(1)
