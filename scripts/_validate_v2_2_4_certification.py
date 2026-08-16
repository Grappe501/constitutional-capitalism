#!/usr/bin/env python3
"""V2.2.4 certification gate validation."""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
errors: list[str] = []


def load(rel: str):
    return json.loads((ROOT / rel).read_text(encoding="utf-8"))


passd = load("data/project/cc_v2_2_4_redesign_integration_certification.json")
hub = load("data/project/cc_v2_2_redesign_arkansas.json")
objs = load("data/project/cc_v2_2_redesign_objects.json")
plan = load("data/project/cc_v2_master_build_plan.json")
ladder = load("data/project/completion_ladder_and_dashboard.json")

homes = (passd.get("proposed_arkansas_operating_model") or {}).get("homes") or []
if len(homes) != 38:
    errors.append(f"homes joined {len(homes)}")

req_home = [
    "home_id",
    "function_disposition",
    "institutional_architecture",
    "geographic_architecture",
    "government_role",
    "market_nonprofit_role",
    "operating_model",
    "household_interface",
    "rights_floor",
    "accountability",
    "dependencies",
    "v2_3_fiscal_question",
    "v2_4_legal_question",
    "v2_5_transition_dependency",
]
for h in homes:
    for k in req_home:
        if k not in h or h[k] in (None, ""):
            errors.append(f"{h.get('home_id')} missing {k}")

joins = passd.get("join_tests") or []
if len(joins) != 12:
    errors.append(f"joins {len(joins)}")
for j in joins:
    if j.get("disposition") not in ("PASS", "FAIL", "PASS-WITH-BLOCKER"):
        errors.append(f"bad join disposition {j.get('id')}")
    if j.get("disposition") == "FAIL":
        errors.append(f"join FAIL {j.get('id')}")

for key in [
    "opposition_test",
    "mediocre_government_test",
    "capture_test",
    "market_crowding_test",
    "household_burden_transfer_test",
    "rights_floor_test",
    "complexity_test",
    "arkansas_75_test",
]:
    t = passd.get(key) or {}
    if t.get("disposition") != "PASS":
        errors.append(f"{key} not PASS")

cx = passd.get("contradiction_register") or []
if len(cx) < 1:
    errors.append("empty contradiction register")
for c in cx:
    if c.get("disposition") == "ARCHITECTURAL_DEFECT":
        errors.append(f"unresolved architectural defect {c.get('id')}")
    if not c.get("id", "").startswith("CX-V22-"):
        errors.append(f"bad cx id {c.get('id')}")

dep = passd.get("dependency_sequencing") or {}
if not dep.get("complete"):
    errors.append("dependency sequencing incomplete")
if any(d.get("assumes_downstream_already_exists") for d in dep.get("homes") or []):
    errors.append("dependency assumes downstream already exists")

disc = passd.get("discipline") or {}
if disc.get("new_redesign_objects") != 0:
    errors.append("new redesign objects")
if disc.get("funding_invented") != 0:
    errors.append("funding invented")
if disc.get("funding_design") != 0:
    errors.append("funding design")

cert = passd.get("certification") or {}
if cert.get("status") != "CERTIFIED":
    errors.append("not certified")
if not (cert.get("freeze") or {}).get("operating_model_frozen"):
    errors.append("not frozen")

eg = passd.get("exit_gate") or {}
if eg.get("redesign_certified") is not True:
    errors.append("exit not certified")
if eg.get("funding_invented") != 0:
    errors.append("exit funding")
if eg.get("architectural_defects_unresolved") != 0:
    errors.append("exit defects")

if hub.get("status") != "CERTIFIED":
    errors.append("hub not certified")
if objs.get("status") != "REDESIGN_CERTIFIED":
    errors.append("objects not redesign certified")

g22 = next(g for g in plan["gates"] if g["id"] == "V2.2")
if g22.get("status") != "CERTIFIED":
    errors.append("plan V2.2 not certified")
if plan["blueprint"]["percent"] != 45.0:
    errors.append(f"blueprint {plan['blueprint']['percent']} != 45.0")

bp = (ladder.get("v2_blueprint") or {})
if bp.get("redesign_status") != "CERTIFIED":
    errors.append("ladder redesign not certified")
if bp.get("see_status") != "CERTIFIED":
    errors.append("ladder see not certified")
if bp.get("percent") != 45.0:
    errors.append("ladder blueprint != 45")

closed = sum(1 for o in objs["objects"] if o["status"] in ("CLOSED", "HOLD-COMPLETE"))
if closed != 114:
    errors.append(f"objects closed {closed}")

com = passd.get("changed_our_mind") or []
if len(com) < 9:
    errors.append(f"changed-our-mind {len(com)}")

vis = passd.get("operating_system_visual") or {}
if "PEOPLE" not in (vis.get("center") or {}).get("label", ""):
    errors.append("visual center missing people")

if errors:
    print("GATE FAIL")
    for e in errors:
        print(" -", e)
    sys.exit(1)

print("GATE PASS — V2.2.4 CERTIFIED · frozen · blueprint 45.0% · next V2.3")
