#!/usr/bin/env python3
"""V2.3.1 current fiscal baseline gate validation."""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
errors: list[str] = []


def load(rel: str):
    return json.loads((ROOT / rel).read_text(encoding="utf-8"))


passd = load("data/project/cc_v2_3_1_current_fiscal_baseline.json")
hub = load("data/project/cc_v2_3_fund_arkansas.json")
objs = load("data/project/cc_v2_3_fund_objects.json")
bind = load("data/imports/arkansas-state-baseline/normalized/fy2024_acfr_afy_fiscal_bind.json")
plan = load("data/project/cc_v2_master_build_plan.json")

if passd.get("discipline", {}).get("countable_public_cash_usd") != 0:
    errors.append("COUNTABLE != 0")
if passd.get("discipline", {}).get("revenue_ideation") is not False:
    errors.append("revenue ideation not blocked")
if passd.get("discipline", {}).get("redesign_costing") is not False:
    errors.append("redesign costing not blocked")

for k in [
    "pricing_readiness",
    "current_fiscal_model",
    "consolidated_public_money_statement",
    "opening_balance_and_flow_statement",
    "blockers",
]:
    if k not in passd:
        errors.append(f"missing {k}")

pr = passd.get("pricing_readiness", {}).get("headline", {})
if not pr.get("known_surface_share"):
    errors.append("pricing readiness missing")

base = [o for o in objs["objects"] if o["family"] == "CURRENT_FISCAL_BASELINE"]
if len(base) != 20:
    errors.append(f"baseline objects {len(base)}")
if any(o["status"] not in ("CLOSED", "HOLD-COMPLETE") for o in base):
    errors.append("baseline not all closed/hold")

if len(objs["objects"]) != 95:
    errors.append(f"total objects {len(objs['objects'])}")

afy = bind.get("afy", {})
if afy.get("grand_total_operating_usd") != 33222831607:
    errors.append("AFY total mismatch")
if afy.get("by_fund_type_usd", {}).get("federal_revenue") != 10731595513:
    errors.append("AFY federal mismatch")

acfr = bind.get("acfr", {})
fp = acfr.get("federal_proxy", {})
if fp.get("operating_plus_capital_grants_thousands") != 11291493 + 1145960:
    errors.append("ACFR grants mismatch")

bmap = {b["id"]: b for b in passd.get("blockers") or []}
if bmap.get("UNK-FISC-001", {}).get("disposition") != "RESOLVED_ENVELOPE":
    errors.append("UNK-FISC-001 not resolved envelope")
if bmap.get("UNK-FISC-004", {}).get("disposition") != "RESOLVED_BALANCES":
    errors.append("UNK-FISC-004 not resolved balances")

if hub.get("passes", [{}])[0].get("status") != "COMPLETE":
    errors.append("hub V2.3.1 not COMPLETE")

g23 = next(g for g in plan["gates"] if g["id"] == "V2.3")
if g23.get("status") != "ACTIVE":
    errors.append("plan V2.3 not ACTIVE")
if plan["blueprint"]["percent"] != passd["progress"]["v2_blueprint_percent"]:
    errors.append("blueprint mismatch")

eg = passd.get("exit_gate") or {}
if eg.get("countable_remains_zero") is not True:
    errors.append("exit countable")
if eg.get("revenue_ideation_forbidden") is not True:
    errors.append("exit revenue")

if errors:
    print("GATE FAIL")
    for e in errors:
        print(" -", e)
    sys.exit(1)

print(
    f"GATE PASS — V2.3.1 · COUNTABLE $0 · bp={passd['progress']['v2_blueprint_percent']}% · next V2.3.2"
)
