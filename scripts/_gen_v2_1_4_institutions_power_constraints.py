#!/usr/bin/env python3
"""CC-DEC-199 / UPD-212 — V2.1.4 Institutions, Power & Constraints (observation only)."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TODAY = "2026-08-16"
DEC = "CC-DEC-199"
UPD = "UPD-212"
V2DEC = "V2-DEC-013"


def load(rel: str):
    return json.loads((ROOT / rel).read_text(encoding="utf-8"))


def dump(rel: str, obj):
    path = ROOT / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(obj, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


objects_doc = load("data/project/cc_v2_1_closure_objects.json")
inventory = load("data/project/cc_v2_geo_arkansas_75_inventory.json")
unk = load("data/project/cc_v2_unknown_register.json")
reg = load("data/project/v2_decision_register.json")
plan = load("data/project/cc_v2_master_build_plan.json")
v21 = load("data/project/cc_v2_1_see_arkansas.json")
money = load("data/project/cc_v2_1_2_government_money.json")

# ---------------------------------------------------------------------------
# Ledgers (describe only — recommendations: 0)
# ---------------------------------------------------------------------------

POWER_FORMS = [
    "CONSTITUTIONAL",
    "LEGISLATIVE",
    "EXECUTIVE",
    "ADMINISTRATIVE",
    "FISCAL",
    "DEMOCRATIC",
]

authority_ledger = {
    "id": "authority",
    "question": "Who can make whom do what?",
    "rule": "Map by power, not org-chart completeness. UNKNOWN board counts allowed.",
    "actors": [
        {
            "id": "ACT-PEOPLE",
            "label": "People of Arkansas (sovereign source)",
            "power_forms": ["DEMOCRATIC", "CONSTITUTIONAL"],
            "source_of_authority": "Popular sovereignty under Arkansas and U.S. Constitutions",
            "controls": "Delegation via election, initiative/referendum, constitutional amendment pathways",
            "administers": None,
            "money_influence": "Indirect via representation, ballot, and accountability",
            "who_appoints_elects": "N/A — elects others",
            "who_can_remove": "N/A",
            "who_oversees": "Self via elections, courts, records",
            "what_can_override": "Higher constitutional floors (U.S.); rights floors",
            "what_constrains": "U.S. Constitution; Arkansas Constitution; federal statute",
            "geographic_jurisdiction": "Statewide + local electorates",
            "public_accountability": "Elections; initiative/referendum; FOIA/meetings; courts",
            "evidence_class": "DERIVED",
            "confidence": "HIGH",
            "source": "Pass 3.5 Power Loop / Pass 1.3 spine",
        },
        {
            "id": "ACT-GA",
            "label": "Arkansas General Assembly",
            "power_forms": ["LEGISLATIVE", "FISCAL", "CONSTITUTIONAL"],
            "source_of_authority": "Arkansas Constitution — legislative power",
            "controls": "Statutes; appropriations; institutional design; oversight statutes",
            "administers": "Does not day-to-day administer agencies",
            "money_influence": "Appropriates General Revenue and other funds within constitutional/fiscal rules",
            "who_appoints_elects": "Elected by districts",
            "who_can_remove": "Voters; expulsion rules UNKNOWN detail this pass",
            "who_oversees": "Voters; courts (constitutionality); ethics mechanisms UNKNOWN inventory",
            "what_can_override": "Constitutional amendment; federal preemption; court orders",
            "what_constrains": "Arkansas Constitution; U.S. Constitution; federal conditions",
            "geographic_jurisdiction": "Statewide",
            "public_accountability": "Elections; public votes; hearings",
            "evidence_class": "KNOWN",
            "confidence": "HIGH",
            "source": "Pass 3.5 / 4.2 constitutional spine",
        },
        {
            "id": "ACT-GOV",
            "label": "Governor",
            "power_forms": ["EXECUTIVE", "ADMINISTRATIVE", "FISCAL"],
            "source_of_authority": "Arkansas Constitution — executive power",
            "controls": "Executive direction within law; appointments; budget proposal influence",
            "administers": "Executive branch leadership",
            "money_influence": "Budget proposal / veto / allotment practices — detail PARTIAL",
            "who_appoints_elects": "Statewide election",
            "who_can_remove": "Voters; impeachment pathway EXISTS conceptually — process detail PARTIAL",
            "who_oversees": "Voters; General Assembly; courts",
            "what_can_override": "Legislation; constitutional limits; federal law; courts",
            "what_constrains": "Constitution; statute; appropriations; federal conditions",
            "geographic_jurisdiction": "Statewide",
            "public_accountability": "Election; public acts; oversight hearings",
            "evidence_class": "KNOWN",
            "confidence": "HIGH",
        },
        {
            "id": "ACT-CONST-OFFICERS",
            "label": "Other constitutional officers (AG, SOS, Auditor, Treasurer, Land Commissioner, Lt. Gov.)",
            "power_forms": ["EXECUTIVE", "ADMINISTRATIVE", "CONSTITUTIONAL"],
            "source_of_authority": "Arkansas Constitution / statute",
            "controls": "Office-specific legal domains (elections admin, legal opinions, funds custody, land, etc.)",
            "administers": "Respective offices",
            "money_influence": "Varies by office — PARTIAL",
            "who_appoints_elects": "Statewide election (typical)",
            "who_can_remove": "Voters; other removal paths UNKNOWN inventory",
            "who_oversees": "Voters; courts; legislative oversight",
            "what_can_override": "Statute/constitution change; courts",
            "what_constrains": "Constitution; statute; federal law where applicable",
            "geographic_jurisdiction": "Statewide",
            "public_accountability": "Election",
            "evidence_class": "DERIVED",
            "confidence": "MEDIUM",
            "note": "Roster roles known; exhaustive duty map not required for V2.1.4 closure",
        },
        {
            "id": "ACT-JUDICIARY",
            "label": "Arkansas judiciary",
            "power_forms": ["CONSTITUTIONAL", "ADMINISTRATIVE"],
            "source_of_authority": "Arkansas Constitution / statute",
            "controls": "Cases; constitutional interpretation; orders affecting agencies/actors",
            "administers": "Court system administration",
            "money_influence": "Limited direct fiscal; can constrain spending via orders",
            "who_appoints_elects": "Mix of election/appointment pathways — detail PARTIAL",
            "who_can_remove": "Voters / discipline pathways PARTIAL",
            "who_oversees": "Higher courts; judicial discipline; voters where elected",
            "what_can_override": "Higher court; constitutional amendment; federal court",
            "what_constrains": "Jurisdiction; rights floors; federal supremacy",
            "geographic_jurisdiction": "Statewide + circuits/districts",
            "public_accountability": "Opinions; elections where applicable; discipline",
            "evidence_class": "DERIVED",
            "confidence": "MEDIUM",
        },
        {
            "id": "ACT-AGENCIES",
            "label": "Major executive agencies (incl. GR Allocation A recipients)",
            "power_forms": ["ADMINISTRATIVE", "FISCAL", "EXECUTIVE"],
            "source_of_authority": "Statute + appropriation + executive direction",
            "controls": "Programs, licensing, eligibility, enforcement within statute",
            "administers": "Day-to-day public administration",
            "money_influence": "Spends/allocates appropriated funds; contracts",
            "who_appoints_elects": "Typically Governor-appointed directors / boards — chain PARTIAL",
            "who_can_remove": "Appointing authority / statute",
            "who_oversees": "Governor; GA; auditors; courts; federal partners where conditioned",
            "what_can_override": "Statute; appropriation; court; federal condition",
            "what_constrains": "APA-like procedure; statute; federal rules; budget",
            "geographic_jurisdiction": "Statewide (service footprints vary)",
            "public_accountability": "Rules dockets; reports; FOIA; hearings",
            "evidence_class": "KNOWN",
            "confidence": "HIGH",
            "join": "V2.1.2 agencies home + Allocation A — not re-enumerated",
        },
        {
            "id": "ACT-BOARDS",
            "label": "Boards / commissions / authorities (class)",
            "power_forms": ["ADMINISTRATIVE", "FISCAL"],
            "source_of_authority": "Statute / constitution",
            "controls": "Licensing, rate/regulatory domains, some capital/authority functions",
            "administers": "Delegated domains",
            "money_influence": "Fees/funds where authorized — inventory UNKNOWN",
            "who_appoints_elects": "Typically Governor + confirmation patterns — exhaustive map UNKNOWN",
            "who_can_remove": "Statute-specific — UNKNOWN inventory",
            "who_oversees": "Appointing authority; GA; courts",
            "what_can_override": "Statute; courts; sometimes referendum",
            "what_constrains": "Enabling act; APA; ethics; federal law",
            "geographic_jurisdiction": "Statewide or special-purpose",
            "public_accountability": "Meetings; FOIA; appointments visibility FRAGMENTED",
            "evidence_class": "UNKNOWN-COMPLETE",
            "confidence": "LOW",
            "note": "Class mapped; full Arkansas board roster not required — UNKNOWN count is valid",
        },
        {
            "id": "ACT-LOCAL",
            "label": "Counties / municipalities / local governments",
            "power_forms": ["LEGISLATIVE", "ADMINISTRATIVE", "FISCAL", "DEMOCRATIC"],
            "source_of_authority": "Constitution + statute (home-rule patterns PARTIAL)",
            "controls": "Local ordinances, services, property tax levy within law",
            "administers": "Local services",
            "money_influence": "Local levies, fees, shares — millage/AV PARTIAL from V2.1.2",
            "who_appoints_elects": "Local elections",
            "who_can_remove": "Voters; statutory removal",
            "who_oversees": "Voters; state law; courts",
            "what_can_override": "State statute; constitution; federal law",
            "what_constrains": "Dillon/home-rule posture PARTIAL; state preemption; debt limits UNKNOWN inventory",
            "geographic_jurisdiction": "County/city limits",
            "public_accountability": "Local elections; meetings; FOIA",
            "evidence_class": "KNOWN",
            "confidence": "HIGH",
            "join": "V2.1.2 local_government home",
        },
        {
            "id": "ACT-SCHOOLS",
            "label": "School districts / school governance",
            "power_forms": ["ADMINISTRATIVE", "FISCAL", "DEMOCRATIC"],
            "source_of_authority": "Statute + local election",
            "controls": "Local education operations within state/federal frameworks",
            "administers": "Schools",
            "money_influence": "Local millage + state adequacy/earmarks + federal education funds",
            "who_appoints_elects": "School boards elected (typical)",
            "who_can_remove": "Voters",
            "who_oversees": "State education agency; voters; courts; federal conditions",
            "what_can_override": "State statute; court orders; federal conditions",
            "what_constrains": "Adequacy/funding formulas; civil rights; federal program rules",
            "geographic_jurisdiction": "District (≠ county boundaries)",
            "public_accountability": "Board meetings; elections; reports",
            "evidence_class": "DERIVED",
            "confidence": "MEDIUM",
        },
        {
            "id": "ACT-FEDERAL",
            "label": "Federal government (partner / conditioner / regulator)",
            "power_forms": ["CONSTITUTIONAL", "FISCAL", "ADMINISTRATIVE"],
            "source_of_authority": "U.S. Constitution / federal statute",
            "controls": "Preemption; funding conditions; waivers; direct federal programs",
            "administers": "Federal agencies; some direct services",
            "money_influence": "Major — all-funds federal share still UNKNOWN (UNK-FISC-001)",
            "who_appoints_elects": "National democratic processes",
            "who_can_remove": "National processes",
            "who_oversees": "Congress; federal courts; inspectors general",
            "what_can_override": "Higher federal law / courts",
            "what_constrains": "U.S. Constitution; statutes",
            "geographic_jurisdiction": "National; facilities/programs in Arkansas",
            "public_accountability": "Federal transparency systems",
            "evidence_class": "KNOWN",
            "confidence": "HIGH",
            "join": "V2.1.2 federal_dependency UNKNOWN-COMPLETE shares",
        },
    ],
}

change_pathway_matrix = {
    "id": "change_pathway",
    "question": "If Arkansas wanted to change this tomorrow, what would actually have to happen?",
    "rule": "Descriptive pathways only — not whether change should happen.",
    "pathway_classes": [
        "Administrative action",
        "Agency rule",
        "Legislation",
        "Appropriation",
        "Local action",
        "Constitutional amendment",
        "Ballot process",
        "Federal approval/waiver",
        "Court-dependent",
        "Contract/debt constrained",
        "Multiple actors",
        "UNKNOWN",
    ],
    "rows": [
        {
            "subject": "Income tax structure/rates",
            "primary_pathway": "Legislation",
            "also": ["Appropriation", "Constitutional amendment (if locked)", "Multiple actors"],
            "federal": "Limited direct — federal income tax separate",
            "confidence": "HIGH",
            "evidence_class": "DERIVED",
        },
        {
            "subject": "School finance / adequacy",
            "primary_pathway": "Legislation",
            "also": ["Appropriation", "Court-dependent", "Local action", "Multiple actors"],
            "federal": "Federal education funds conditions",
            "confidence": "MEDIUM",
            "evidence_class": "DERIVED",
        },
        {
            "subject": "Medicaid eligibility/benefits administration",
            "primary_pathway": "Multiple actors",
            "also": ["Agency rule", "Legislation", "Appropriation", "Federal approval/waiver"],
            "federal": "HIGH — CMS approval/waiver/conditions",
            "confidence": "HIGH",
            "evidence_class": "DERIVED",
        },
        {
            "subject": "County roads",
            "primary_pathway": "Local action",
            "also": ["Appropriation", "Legislation", "Federal approval/waiver (federal-aid)"],
            "federal": "Federal-aid highway rules when applicable",
            "confidence": "MEDIUM",
            "evidence_class": "DERIVED",
        },
        {
            "subject": "Utility regulation",
            "primary_pathway": "Agency rule",
            "also": ["Legislation", "Court-dependent", "Multiple actors"],
            "federal": "Partial (FERC/interstate)",
            "confidence": "MEDIUM",
            "evidence_class": "DERIVED",
        },
        {
            "subject": "Occupational licensing",
            "primary_pathway": "Multiple actors",
            "also": ["Agency rule", "Legislation", "Boards"],
            "federal": "Usually low",
            "confidence": "MEDIUM",
            "evidence_class": "DERIVED",
        },
        {
            "subject": "Elections administration rules",
            "primary_pathway": "Legislation",
            "also": ["Agency rule", "Constitutional amendment", "Court-dependent", "Federal constraints"],
            "federal": "Voting Rights / federal election constraints where applicable",
            "confidence": "MEDIUM",
            "evidence_class": "DERIVED",
        },
        {
            "subject": "Procurement code / major purchasing rules",
            "primary_pathway": "Legislation",
            "also": ["Agency rule", "Administrative action"],
            "federal": "Federal funds procurement conditions when spending federal dollars",
            "confidence": "MEDIUM",
            "evidence_class": "DERIVED",
            "note": "Dollar volumes / vendor geography still UNKNOWN-COMPLETE from V2.1.2",
        },
        {
            "subject": "Economic-development deal authority",
            "primary_pathway": "Multiple actors",
            "also": ["Legislation", "Appropriation", "Contract/debt constrained", "Local action"],
            "federal": "Sometimes (tax credit / federal program)",
            "confidence": "LOW",
            "evidence_class": "UNKNOWN",
            "note": "Deal inventory transparency FRAGMENTED",
        },
        {
            "subject": "Emergency powers scope/sunset",
            "primary_pathway": "Legislation",
            "also": ["Constitutional amendment", "Court-dependent", "Executive"],
            "federal": "Federal emergency declarations separate",
            "confidence": "MEDIUM",
            "evidence_class": "DERIVED",
        },
    ],
}

appointment_graph = {
    "id": "appointment_power",
    "question": "How does appointment power propagate?",
    "chain": [
        "PEOPLE",
        "elected officials",
        "appointments",
        "boards/commissions",
        "executives/administrators",
        "decisions",
        "public consequences",
    ],
    "nodes": [
        {
            "id": "APPT-GOV-AGENCY",
            "appointment_authority": "Governor (typical for agency directors)",
            "confirmation": "PARTIAL — some confirmed by Senate; inventory UNKNOWN",
            "term": "PARTIAL / UNKNOWN by office",
            "removal": "At-pleasure or for-cause — statute-specific UNKNOWN inventory",
            "vacancy": "UNKNOWN inventory",
            "origin": "Statute",
            "oversight": "GA; auditors; courts",
            "evidence_class": "DERIVED",
        },
        {
            "id": "APPT-GOV-BOARD",
            "appointment_authority": "Governor → boards/commissions",
            "confirmation": "Often Senate confirmation — not fully inventoried",
            "term": "Staggered terms common — UNKNOWN complete roster",
            "removal": "UNKNOWN inventory",
            "vacancy": "UNKNOWN inventory",
            "origin": "Enabling statutes",
            "oversight": "Ethics/meetings/FOIA FRAGMENTED visibility",
            "evidence_class": "UNKNOWN-COMPLETE",
            "note": "Invisible institutional power — class mapped without fake board count",
        },
        {
            "id": "APPT-LOCAL",
            "appointment_authority": "Local elected officials → local boards/administrators",
            "confirmation": "Varies",
            "term": "Varies",
            "removal": "Local/statute",
            "vacancy": "Local",
            "origin": "Local charter/statute",
            "oversight": "Local voters",
            "evidence_class": "DERIVED",
        },
    ],
}

# Money-power chain joins V2.1.2 FACT spine
money_power_chain = {
    "id": "public_dollar_power",
    "question": "Who raises → controls fund → appropriates → allocates → spends → audits → challenges?",
    "join": "V2.1.2 Money River (gross GR $8.69B → net $7.15B → Allocation A ~$6.49B)",
    "spine": [
        {
            "step": "raise",
            "actors": ["DFA / tax administration", "General Assembly (tax law)", "local assessors/collectors (property)"],
            "evidence_class": "KNOWN",
            "note": "GR composition FACT FY2025–26; all-funds federal UNKNOWN",
        },
        {
            "step": "fund_control",
            "actors": ["Constitutional/statutory fund structure", "Treasurer/custody roles"],
            "evidence_class": "PARTIAL",
            "note": "Fund ledger classes from V2.1.2; exhaustive fund inventory UNKNOWN",
        },
        {
            "step": "appropriate",
            "actors": ["General Assembly"],
            "evidence_class": "KNOWN",
        },
        {
            "step": "allocate_administer",
            "actors": ["Agencies / DHS and other Allocation A recipients", "Governor budget execution"],
            "evidence_class": "KNOWN",
            "note": "Allocation A pattern FACT; SEE economic-function classification PARTIAL",
        },
        {
            "step": "spend_contract",
            "actors": ["Agencies", "procurement officials", "grantees/contractors"],
            "evidence_class": "PARTIAL",
            "note": "Procurement volumes UNKNOWN-COMPLETE",
        },
        {
            "step": "audit",
            "actors": ["Legislative Audit (class)", "internal agency audit", "federal auditors when conditioned"],
            "evidence_class": "DERIVED",
            "note": "Audit coverage inventory not fully bound",
        },
        {
            "step": "challenge_misuse",
            "actors": ["Courts", "prosecutors/AG", "inspectors", "citizens via FOIA/politics"],
            "evidence_class": "DERIVED",
        },
    ],
    "rule": "A large program means different things depending on who can redirect, condition, audit, and terminate the money.",
}

constraint_ledger = {
    "id": "constraints",
    "question": "What constrains major actors/functions?",
    "rule": "Constraint map — not V2.4 legal opinion.",
    "classes": [
        "Arkansas Constitution",
        "U.S. Constitution",
        "federal statute/regulation",
        "state statute",
        "judicial precedent/order",
        "debt covenant",
        "contract",
        "federal funding condition",
        "administrative procedure",
        "rights floor",
        "local jurisdiction",
        "institutional dependency",
        "UNKNOWN",
    ],
    "by_domain": [
        {
            "domain": "Taxation",
            "constraints": ["Arkansas Constitution", "state statute", "U.S. Constitution", "judicial precedent/order"],
            "evidence_class": "DERIVED",
        },
        {
            "domain": "Medicaid / human services",
            "constraints": [
                "federal statute/regulation",
                "federal funding condition",
                "state statute",
                "administrative procedure",
                "rights floor",
            ],
            "evidence_class": "DERIVED",
        },
        {
            "domain": "Elections",
            "constraints": ["Arkansas Constitution", "state statute", "U.S. Constitution", "federal statute/regulation"],
            "evidence_class": "DERIVED",
        },
        {
            "domain": "Local government",
            "constraints": ["state statute", "Arkansas Constitution", "local jurisdiction", "debt covenant"],
            "evidence_class": "PARTIAL",
            "note": "Debt covenant inventory UNKNOWN",
        },
        {
            "domain": "Procurement / contracting",
            "constraints": ["state statute", "administrative procedure", "federal funding condition", "contract"],
            "evidence_class": "PARTIAL",
        },
        {
            "domain": "Emergency powers",
            "constraints": ["Arkansas Constitution", "state statute", "judicial precedent/order", "UNKNOWN"],
            "evidence_class": "PARTIAL",
            "note": "Light baseline only — deep emergency architecture deferred toward V2.4",
        },
    ],
}

federalism_map = {
    "id": "federalism_functional",
    "question": "For each system: FEDERAL ↔ ARKANSAS ↔ LOCAL (+ private/nonprofit)?",
    "role_tags": [
        "sovereign actor",
        "implementing partner",
        "funding partner",
        "regulated actor",
        "administrator",
        "dependent recipient",
    ],
    "systems": [
        {"system": "healthcare", "arkansas_roles": ["implementing partner", "administrator", "dependent recipient"], "local": "providers/hospitals", "private_nonprofit": "HIGH", "evidence_class": "DERIVED"},
        {"system": "education", "arkansas_roles": ["funding partner", "regulator", "administrator"], "local": "districts", "private_nonprofit": "MEDIUM", "evidence_class": "DERIVED"},
        {"system": "transportation", "arkansas_roles": ["implementing partner", "funding partner", "administrator"], "local": "counties/cities", "private_nonprofit": "LOW", "evidence_class": "DERIVED"},
        {"system": "environment", "arkansas_roles": ["implementing partner", "regulated actor", "administrator"], "local": "PARTIAL", "private_nonprofit": "MEDIUM", "evidence_class": "DERIVED"},
        {"system": "labor", "arkansas_roles": ["regulated actor", "administrator"], "local": "LOW", "private_nonprofit": "LOW", "evidence_class": "DERIVED"},
        {"system": "elections", "arkansas_roles": ["sovereign actor", "administrator"], "local": "county election admin", "private_nonprofit": "LOW", "evidence_class": "DERIVED"},
        {"system": "agriculture", "arkansas_roles": ["implementing partner", "regulated actor"], "local": "extension/local", "private_nonprofit": "MEDIUM", "evidence_class": "DERIVED"},
        {"system": "energy", "arkansas_roles": ["regulated actor", "administrator"], "local": "munis/coops", "private_nonprofit": "HIGH (IOU/coop)", "evidence_class": "KNOWN"},
        {"system": "human_services", "arkansas_roles": ["implementing partner", "administrator", "dependent recipient"], "local": "offices/providers", "private_nonprofit": "HIGH", "evidence_class": "DERIVED"},
        {"system": "housing", "arkansas_roles": ["funding partner", "implementing partner"], "local": "authorities/zoning", "private_nonprofit": "HIGH", "evidence_class": "DERIVED"},
        {"system": "justice", "arkansas_roles": ["sovereign actor", "administrator"], "local": "sheriffs/courts/jails", "private_nonprofit": "MEDIUM", "evidence_class": "DERIVED"},
        {"system": "infrastructure", "arkansas_roles": ["funding partner", "administrator"], "local": "utilities/roads", "private_nonprofit": "MEDIUM", "evidence_class": "DERIVED"},
    ],
}

democratic_power_map = {
    "id": "democratic_power",
    "question": "What does Arkansas' actual Power Loop look like?",
    "rule": "Empirical map — do not grade yet. Normative v1 Power Loop remains doctrine; this is Arkansas NOW observation.",
    "loop": [
        {"step": "citizen", "mechanisms": ["residence/eligibility"], "evidence_class": "DERIVED"},
        {"step": "vote", "mechanisms": ["federal/state/local elections"], "evidence_class": "KNOWN"},
        {"step": "representation", "mechanisms": ["GA", "Governor", "local boards"], "evidence_class": "KNOWN"},
        {"step": "law_policy", "mechanisms": ["statutes", "ordinances", "appropriations"], "evidence_class": "KNOWN"},
        {"step": "administration", "mechanisms": ["agencies", "boards", "local admin"], "evidence_class": "KNOWN"},
        {"step": "outcome", "mechanisms": ["services", "regulation", "taxes"], "evidence_class": "DERIVED"},
        {"step": "information", "mechanisms": ["FOIA", "meetings", "portals", "media"], "evidence_class": "PARTIAL"},
        {"step": "accountability", "mechanisms": ["elections", "courts", "audit", "oversight"], "evidence_class": "DERIVED"},
    ],
    "alongside": [
        {"mechanism": "initiative/referendum", "status": "EXISTS", "evidence_class": "KNOWN", "detail_inventory": "PARTIAL"},
        {"mechanism": "public meetings", "status": "EXISTS", "evidence_class": "DERIVED"},
        {"mechanism": "public records / FOIA", "status": "EXISTS", "evidence_class": "DERIVED", "fulfillment_stats": "UNKNOWN"},
        {"mechanism": "courts", "status": "EXISTS", "evidence_class": "KNOWN"},
        {"mechanism": "administrative appeal", "status": "EXISTS", "evidence_class": "DERIVED", "coverage_inventory": "UNKNOWN"},
    ],
    "v1_join": "stage1_pass3_government_democratic_power_spine.json — Legitimate Power Loop",
}

admin_decision_map = {
    "id": "administrative_decisions",
    "question": "How are representative administrative decisions made and challenged?",
    "rule": "Representative types only — not every agency action.",
    "types": [
        {"type": "license issued/denied", "maker": "Board/agency", "standard": "Statute/rule", "notice": "PARTIAL", "appeal": "Admin + court", "evidence_class": "DERIVED"},
        {"type": "benefit eligibility", "maker": "Agency", "standard": "Statute/rule/federal", "notice": "REQUIRED typically", "appeal": "Admin hearing + court", "evidence_class": "DERIVED"},
        {"type": "permit", "maker": "Agency/local", "standard": "Statute/rule/ordinance", "notice": "PARTIAL", "appeal": "Admin + court", "evidence_class": "DERIVED"},
        {"type": "procurement award", "maker": "Agency procurement", "standard": "Procurement code", "notice": "PARTIAL", "appeal": "Protest pathways PARTIAL", "evidence_class": "PARTIAL"},
        {"type": "grant", "maker": "Agency", "standard": "Program rules", "notice": "PARTIAL", "appeal": "PARTIAL/UNKNOWN", "evidence_class": "PARTIAL"},
        {"type": "professional discipline", "maker": "Licensing board", "standard": "Statute/rule", "notice": "REQUIRED typically", "appeal": "Admin + court", "evidence_class": "DERIVED"},
        {"type": "tax determination", "maker": "DFA/local assessor", "standard": "Tax code", "notice": "PARTIAL", "appeal": "Admin + court", "evidence_class": "DERIVED"},
        {"type": "school decision", "maker": "District/board", "standard": "Statute/policy", "notice": "PARTIAL", "appeal": "Board + state/court", "evidence_class": "DERIVED"},
        {"type": "land-use/local decision", "maker": "Local body", "standard": "Ordinance", "notice": "Meetings", "appeal": "Local + court", "evidence_class": "DERIVED"},
        {"type": "public-record request", "maker": "Custodian", "standard": "FOIA", "notice": "Request-based", "appeal": "Court/AG pathways PARTIAL", "evidence_class": "DERIVED"},
    ],
}

transparency_architecture = {
    "id": "transparency",
    "question": "What can citizens presently see?",
    "rule": "Not whether transparency is good enough — classification only.",
    "domains": [
        {"domain": "budgets", "availability": "DOCUMENT", "evidence_class": "DERIVED"},
        {"domain": "spending", "availability": "FRAGMENTED", "evidence_class": "PARTIAL"},
        {"domain": "contracts", "availability": "REQUEST-BASED", "evidence_class": "PARTIAL"},
        {"domain": "votes", "availability": "STRUCTURED", "evidence_class": "KNOWN", "note": "Legislative civic imports exist"},
        {"domain": "agency rules", "availability": "DOCUMENT", "evidence_class": "DERIVED"},
        {"domain": "board membership", "availability": "FRAGMENTED", "evidence_class": "UNKNOWN"},
        {"domain": "meetings", "availability": "DOCUMENT", "evidence_class": "DERIVED"},
        {"domain": "public records", "availability": "REQUEST-BASED", "evidence_class": "DERIVED"},
        {"domain": "campaign finance", "availability": "STRUCTURED", "evidence_class": "PARTIAL"},
        {"domain": "economic-development deals", "availability": "FRAGMENTED", "evidence_class": "UNKNOWN"},
        {"domain": "performance/outcomes", "availability": "FRAGMENTED", "evidence_class": "PARTIAL"},
    ],
}

chokepoints = [
    {
        "id": "PWR-CP-001",
        "actor": "General Assembly",
        "power": "Appropriation + statute",
        "affected_functions": ["nearly all state programs"],
        "source_of_authority": "Constitution",
        "constraint": "Constitutional/fiscal/federal",
        "alternatives_override": "Amendment; courts; federal preemption",
        "evidence": "Pass 3.5 / V2.1.2",
        "confidence": "HIGH",
        "judgment": "NONE",
    },
    {
        "id": "PWR-CP-002",
        "actor": "Governor appointments",
        "power": "Populate agencies/boards",
        "affected_functions": ["administration", "licensing", "regulation"],
        "source_of_authority": "Constitution/statute",
        "constraint": "Confirmation/ethics/statute",
        "alternatives_override": "Legislation restructuring; elections",
        "evidence": "Appointment graph class",
        "confidence": "MEDIUM",
        "judgment": "NONE",
    },
    {
        "id": "PWR-CP-003",
        "actor": "Federal funding conditions (esp. Medicaid/human services)",
        "power": "Condition / waive / withhold",
        "affected_functions": ["healthcare", "human services"],
        "source_of_authority": "Federal statute",
        "constraint": "U.S. Constitution / admin law",
        "alternatives_override": "State-only funding (fiscal capacity UNKNOWN); waiver negotiation",
        "evidence": "Federalism map + UNK-FISC-001",
        "confidence": "HIGH",
        "judgment": "NONE",
    },
    {
        "id": "PWR-CP-004",
        "actor": "School finance / adequacy structure",
        "power": "Channel large recurring education money",
        "affected_functions": ["education", "local levies"],
        "source_of_authority": "Statute/constitution/courts",
        "constraint": "Court orders; formula; federal",
        "alternatives_override": "Legislation; litigation",
        "evidence": "Change pathway matrix",
        "confidence": "MEDIUM",
        "judgment": "NONE",
    },
    {
        "id": "PWR-CP-005",
        "actor": "Procurement / contracting authority",
        "power": "Convert appropriation into private performance",
        "affected_functions": ["services", "capital", "IT"],
        "source_of_authority": "Statute",
        "constraint": "Procurement code; federal conditions",
        "alternatives_override": "Legislation; protest/court",
        "evidence": "V2.1.2 procurement UNKNOWN volumes",
        "confidence": "MEDIUM",
        "judgment": "NONE",
    },
]

patterns = [
    {
        "id": "PAT-INST-001",
        "observation": "Multiple administrative functions converge on gubernatorial appointment chains into boards/agencies.",
        "not": "Not a defect judgment — concentration ≠ capture without further proof.",
    },
    {
        "id": "PAT-INST-002",
        "observation": "Major human-services and healthcare administration is structurally federal-state co-governed.",
        "not": "Not a recommendation to federalize or defederalize.",
    },
    {
        "id": "PAT-INST-003",
        "observation": "Transparency is uneven: votes more structured than contracts, board membership, and ED deals.",
        "not": "Not a Comprehensible Government design yet.",
    },
    {
        "id": "PAT-INST-004",
        "observation": "Service geographies (schools, courts, hospitals) routinely cross county political boundaries.",
        "not": "Not a ranking of counties.",
    },
    {
        "id": "PAT-INST-005",
        "observation": "Funding authority (GA appropriation) is often separated from day-to-day administration (agencies) and from federal conditioners.",
        "not": "Not a claim that separation is good or bad.",
    },
    {
        "id": "PAT-INST-006",
        "observation": "Citizen reclaim pathways exist (elections, ballot, courts, FOIA) but fulfillment/coverage inventories remain PARTIAL/UNKNOWN.",
        "not": "Not a grade of democratic quality.",
    },
]

who_runs_what = {
    "id": "who_actually_runs_what",
    "title": "WHO ACTUALLY RUNS WHAT?",
    "nodes": [
        "PEOPLE",
        "Election",
        "Office",
        "Appointment",
        "Agency/Board",
        "Authority",
        "Money",
        "Decision",
        "Service/Regulation",
        "Household/Business/Community",
        "Appeal/Audit/Election/Court/Initiative",
    ],
    "node_reveal_fields": ["authority", "funding", "constraint", "accountability", "evidence"],
    "note": "Empirical counterpart to v1 Power Loop — observation only.",
}

can_arkansas_change = {
    "id": "can_arkansas_change_this",
    "title": "Can Arkansas Change This?",
    "rule": "Returns authority/pathway/constraints — never recommendations.",
    "subjects": [r["subject"] for r in change_pathway_matrix["rows"]],
    "returns": [
        "Who has authority",
        "Required pathway",
        "Other actors",
        "Major constraints",
        "Federal involvement",
        "Evidence confidence",
    ],
}

# Institutional network edges (no power scores)
network_edges = [
    {
        "id": "EDGE-INST-001",
        "source": "05007",
        "source_label": "Benton County",
        "destination": "regional_health_hub",
        "destination_label": "NW Arkansas / regional hospital system (class)",
        "relationship": "HEALTHCARE",
        "strength": None,
        "evidence": "Designated Living Systems / regional hub pattern — facility graph not fully bound",
        "evidence_class": "PROXY",
        "confidence": "LOW",
    },
    {
        "id": "EDGE-INST-002",
        "source": "05107",
        "source_label": "Phillips County",
        "destination": "state_agency_service",
        "destination_label": "State human-services / health administration (Little Rock hub class)",
        "relationship": "PUBLIC_MONEY_SERVICE",
        "strength": None,
        "evidence": "V2.1.1/2.1.2 distance between agency line-item and local clinic — logistics observation",
        "evidence_class": "DERIVED",
        "confidence": "MEDIUM",
    },
    {
        "id": "EDGE-INST-003",
        "source": "county_class",
        "source_label": "Counties (class)",
        "destination": "judicial_circuit",
        "destination_label": "Judicial circuit/district (≠ county)",
        "relationship": "JUSTICE",
        "strength": None,
        "evidence": "Circuit geography crosses counties — exact circuit map not ingested this pass",
        "evidence_class": "DERIVED",
        "confidence": "MEDIUM",
    },
    {
        "id": "EDGE-INST-004",
        "source": "county_class",
        "source_label": "Counties (class)",
        "destination": "education_coop_district",
        "destination_label": "School districts / education cooperatives",
        "relationship": "EDUCATION",
        "strength": None,
        "evidence": "District boundaries ≠ county boundaries (general Arkansas fact)",
        "evidence_class": "KNOWN",
        "confidence": "HIGH",
    },
    {
        "id": "EDGE-INST-005",
        "source": "05035",
        "source_label": "Crittenden County",
        "destination": "federal_metro_adjacency",
        "destination_label": "Memphis TN metro / cross-state labor-service adjacency",
        "relationship": "CONNECTIVITY",
        "strength": None,
        "evidence": "Designated county role — cross-border service geography",
        "evidence_class": "PROXY",
        "confidence": "MEDIUM",
    },
]

# ---------------------------------------------------------------------------
# Main artifact
# ---------------------------------------------------------------------------

closed_before = sum(
    1 for o in objects_doc["objects"] if o["status"] in ("COMPLETE", "UNKNOWN-COMPLETE")
)

NEW = {
    ("constitutional_structure", "B"): (
        "COMPLETE",
        "Authority Ledger + constitutional officers/GA/judiciary/executive mapped as control diagram.",
    ),
    ("constitutional_structure", "F"): (
        "COMPLETE",
        "Six power forms tagged; change pathways for constitutional vs statutory vs ballot distinguished.",
    ),
    ("constitutional_structure", "D"): (
        "COMPLETE",
        "Constraint Ledger — AR/US constitutions as binding floors on actors.",
    ),
    ("constitutional_structure", "E"): (
        "COMPLETE",
        "Pass 3.5 / 4.2 constitutional spine + authority map harvested.",
    ),
    ("civic_institutions", "B"): (
        "COMPLETE",
        "Boards/commissions/authorities as class; roster count UNKNOWN-COMPLETE.",
    ),
    ("civic_institutions", "F"): (
        "UNKNOWN-COMPLETE",
        "Appointment→decision flows class-mapped; exhaustive board inventory not bound.",
    ),
    ("civic_institutions", "D"): (
        "COMPLETE",
        "Appointment chokepoints and oversight dependencies recorded.",
    ),
    ("civic_institutions", "E"): (
        "COMPLETE",
        "Pass 2.4/3.5/4.5 appointment/board architecture + explicit UNKNOWN roster.",
    ),
    ("elections", "B"): (
        "COMPLETE",
        "Democratic Power Map — vote/representation steps + election administration actors.",
    ),
    ("elections", "F"): (
        "COMPLETE",
        "Citizen→vote→office chain specified; county EAVS series available for designated set.",
    ),
    ("elections", "D"): (
        "COMPLETE",
        "Election rules constrained by AR/US constitutions and federal law.",
    ),
    ("elections", "E"): (
        "COMPLETE",
        "Pass 3.5 + designated-county EAVS imports + civic legislative evidence.",
    ),
    ("direct_democracy", "B"): (
        "COMPLETE",
        "Initiative/referendum/amendment pathways present in Change Pathway Matrix.",
    ),
    ("direct_democracy", "F"): (
        "COMPLETE",
        "Ballot process as reclaim mechanism in Democratic Power Map.",
    ),
    ("direct_democracy", "D"): (
        "COMPLETE",
        "Rights floors and constitutional limits constrain ballot outcomes.",
    ),
    ("direct_democracy", "E"): (
        "COMPLETE",
        "Pass 3.5 / 4.2 / popular_sovereignty_framework harvested — detailed petition thresholds PARTIAL.",
    ),
    ("administrative_power", "B"): (
        "COMPLETE",
        "Administrative decision map for representative decision types.",
    ),
    ("administrative_power", "F"): (
        "UNKNOWN-COMPLETE",
        "Rulemaking/licensing inventories not fully bound — decision pattern mapped.",
    ),
    ("administrative_power", "D"): (
        "COMPLETE",
        "Admin power depends on statute, APA-like procedure, federal conditions, courts.",
    ),
    ("administrative_power", "E"): (
        "COMPLETE",
        "Pass 3.5 Digital Due Process / admin gov + Pass 4.2 pathway types.",
    ),
    ("justice", "B"): (
        "COMPLETE",
        "Judiciary as authority actor; justice federalism row; circuit≠county edge.",
    ),
    ("justice", "F"): (
        "UNKNOWN-COMPLETE",
        "Caseflow/funding geography not fully bound — institutional role mapped.",
    ),
    ("justice", "D"): (
        "COMPLETE",
        "Courts as override/constraint on other actors.",
    ),
    ("justice", "E"): (
        "COMPLETE",
        "Pass 3.5 justice relationships + justice_framework join.",
    ),
    ("public_data", "B"): (
        "COMPLETE",
        "Transparency architecture classified across major record types.",
    ),
    ("public_data", "F"): (
        "UNKNOWN-COMPLETE",
        "FOIA fulfillment rates / portal completeness UNKNOWN — mechanisms exist.",
    ),
    ("public_data", "D"): (
        "COMPLETE",
        "Accountability loop depends on information availability.",
    ),
    ("public_data", "E"): (
        "COMPLETE",
        "transparency_framework + Pass 3.5 FOIA posture; no invented fulfillment stats.",
    ),
    ("procurement", "F"): (
        "COMPLETE",
        "Procurement as money-power + change-pathway + chokepoint; volumes still UNKNOWN.",
    ),
    ("procurement", "D"): (
        "COMPLETE",
        "Procurement depends on statute, federal fund conditions, protest/court paths.",
    ),
    ("economic_development", "F"): (
        "UNKNOWN-COMPLETE",
        "ED deal authority multi-actor; deal transparency FRAGMENTED.",
    ),
    ("economic_development", "D"): (
        "COMPLETE",
        "ED tools constrained by statute, contracts, sometimes federal credits.",
    ),
}

obj_list = objects_doc["objects"]
for o in obj_list:
    key = (o["home_id"], o["type"])
    if key in NEW and o["status"] == "OPEN":
        o["status"], o["note"] = NEW[key]
        o["closed_by_pass"] = "V2.1.4"

closed_after = sum(1 for o in obj_list if o["status"] in ("COMPLETE", "UNKNOWN-COMPLETE"))
newly = closed_after - closed_before
v21_pct = round(100.0 * closed_after / len(obj_list), 1)
blueprint_pct = round(0.25 * v21_pct, 1)
objects_doc["closed_objects"] = closed_after
objects_doc["open_objects"] = len(obj_list) - closed_after
objects_doc["v2_1_completion_percent"] = v21_pct
objects_doc["decision_id"] = DEC
objects_doc["update_id"] = UPD
dump("data/project/cc_v2_1_closure_objects.json", objects_doc)

# GEO: deepen government_public_money notes; seed essential_systems / connectivity lightly on designated
designated_fips = {"05007", "05035", "05069", "05093", "05107", "05123", "05139"}
ess_partial = 0
conn_partial = 0
for rec in inventory["records"]:
    fips = rec["fips"]
    gcell = rec["dimensions"].get("government_public_money") or {}
    if gcell.get("status") == "PARTIAL":
        notes = list(gcell.get("notes") or [])
        add = "V2.1.4: money-power chain join (raise→appropriate→allocate→spend→audit) — not a county power score."
        if add not in notes:
            notes.append(add)
        gcell["notes"] = notes

    ecell = rec["dimensions"].get("essential_systems") or {}
    if fips in designated_fips:
        ecell["status"] = "PARTIAL"
        ecell["evidence_class"] = "PROXY"
        ecell["notes"] = [
            "Institutional service geography: school/justice/health often cross county lines.",
            "No political power score assigned.",
        ]
        ecell["metrics"] = {
            "institutional_boundary_mismatch": {
                "value": "OBSERVED_CLASS",
                "evidence_class": "DERIVED",
            }
        }
        ess_partial += 1
    elif ecell.get("status") in (None, "EMPTY"):
        ecell["status"] = "EMPTY"
        ecell["evidence_class"] = "UNKNOWN"
        ecell["notes"] = ["Field-first Essential Systems: institutional edges not bound for this county."]

    ccell = rec["dimensions"].get("connectivity") or {}
    if fips in designated_fips:
        ccell["status"] = "PARTIAL"
        ccell["evidence_class"] = "PROXY"
        ccell["notes"] = [
            "Connectivity as institutional/service adjacency (not broadband score).",
        ]
        conn_partial += 1
    elif ccell.get("status") in (None, "EMPTY"):
        ccell["status"] = ccell.get("status") or "EMPTY"
        if ccell.get("status") == "EMPTY":
            ccell["evidence_class"] = "UNKNOWN"

# Merge network edges
existing = list(inventory.get("county_network_edges_seed") or [])
ids = {e.get("id") for e in existing}
for e in network_edges:
    if e["id"] not in ids:
        existing.append(e)
inventory["county_network_edges_seed"] = existing
inventory["cells_partial"] = sum(
    1 for r in inventory["records"] for d in r["dimensions"].values() if d.get("status") == "PARTIAL"
)
inventory["cells_empty"] = inventory["matrix_cells"] - inventory["cells_partial"]
inventory["decision_id"] = DEC
inventory["update_id"] = UPD
inventory["v2_1_4_geo_note"] = {
    "essential_systems_partial": ess_partial,
    "connectivity_partial": conn_partial,
    "institutional_edges_added": len(network_edges),
    "method": "field_first_no_power_scores",
}
dump("data/project/cc_v2_geo_arkansas_75_inventory.json", inventory)

# Unknowns
new_unks = [
    {
        "id": "UNK-INST-001",
        "question": "Complete Arkansas boards/commissions roster with appointment, term, removal, confirmation?",
        "why_unknown": "No authoritative inventory bound in corpus.",
        "evidence_that_would_resolve": "SOS / legislative research board database join",
        "v2_2_requires_resolution": False,
        "class": "NON-BLOCKING",
        "blocks": "Not required for V2.1.4 control-diagram closure",
        "home_ids": ["civic_institutions"],
    },
    {
        "id": "UNK-INST-002",
        "question": "FOIA fulfillment rates / average response times statewide?",
        "why_unknown": "No performance panel bound; inventing rates forbidden.",
        "evidence_that_would_resolve": "Custodian logs / AG opinions dataset",
        "v2_2_requires_resolution": False,
        "class": "NON-BLOCKING",
        "home_ids": ["public_data"],
    },
    {
        "id": "UNK-INST-003",
        "question": "Exact judicial circuit ↔ county membership graph for all 75?",
        "why_unknown": "Circuit map not ingested.",
        "evidence_that_would_resolve": "AOC circuit shapefile / table",
        "v2_2_requires_resolution": False,
        "class": "NON-BLOCKING",
        "home_ids": ["justice"],
    },
    {
        "id": "UNK-INST-004",
        "question": "Economic-development deal registry (authority, amount, clawbacks) statewide?",
        "why_unknown": "Transparency FRAGMENTED.",
        "evidence_that_would_resolve": "AEDC / legislative disclosures structured extract",
        "v2_2_requires_resolution": True,
        "class": "BLOCKING",
        "blocks": "V2.2 redesign of ED tools — not V2.1.4 observation closure",
        "home_ids": ["economic_development"],
    },
    {
        "id": "UNK-INST-005",
        "question": "Emergency powers statute inventory with sunsets and Guard activation pathways?",
        "why_unknown": "Light baseline only this pass.",
        "evidence_that_would_resolve": "Primary statute digest",
        "v2_2_requires_resolution": False,
        "class": "NON-BLOCKING",
        "home_ids": ["emergency_government"],
        "note": "emergency_government objects intentionally left OPEN for deeper fill / V2.4 adjacency",
    },
]
entries = unk.get("unknowns") or unk.get("entries") or []
existing_ids = {u.get("id") for u in entries}
for u in new_unks:
    if u["id"] not in existing_ids:
        entries.append(u)
if "unknowns" in unk:
    unk["unknowns"] = entries
else:
    unk["entries"] = entries
unk["decision_id"] = DEC
unk["update_id"] = UPD
dump("data/project/cc_v2_unknown_register.json", unk)

pass_doc = {
    "version": "1.0.0",
    "slice_id": "CC-V2-1-4-INSTITUTIONS-POWER-CONSTRAINTS-1.0",
    "decision_id": DEC,
    "update_id": UPD,
    "v2_decision_id": V2DEC,
    "generated_at": TODAY,
    "status": "COMPLETE",
    "pass_id": "V2.1.4",
    "title": "Institutions, Power & Constraints",
    "epistemic_class": "BASELINE_OBSERVATION_NOT_REDESIGN",
    "governing_question": (
        "Who actually possesses the authority to make, administer, finance, constrain, "
        "challenge, or reverse decisions affecting Arkansas' political-economic system?"
    ),
    "discipline": [
        "Not a civics textbook — control diagram for the mapped machine",
        "Recommendations: 0",
        "OBSERVATION ≠ DEFECT",
        "No county political power scores or rankings",
        "UNKNOWN board counts / FOIA rates allowed",
        "Do not reopen production or money FACT spines — join only",
    ],
    "recommendations_made": 0,
    "power_forms": POWER_FORMS,
    "closure_standard_answers": {
        "who_exercises_power": "YES — Authority Ledger principal actors",
        "authority_origin": "YES — constitution/statute/federal/local tags",
        "citizen_delegate_reclaim": "YES — Democratic Power Map (not graded)",
        "appointment_propagation": "PARTIAL — class graph; roster UNKNOWN",
        "public_money_control": "YES — money-power chain joined to V2.1.2",
        "constraints": "YES — Constraint Ledger by domain",
        "federal_local_dependence": "YES — functional federalism map",
        "change_pathways": "YES — Change Pathway Matrix (no should)",
        "admin_decisions": "YES — representative types",
        "transparency": "YES — classified availability",
        "cross_boundary_geography": "PARTIAL — institutional network edges seeded",
        "unknowns": "YES — UNK-INST-* + prior fiscal unknowns",
        "enough_for_v2_1_5_join": "YES",
    },
    "progress": {
        "baseline_objects_closed_before": closed_before,
        "baseline_objects_closed_after": closed_after,
        "objects_newly_closed": newly,
        "baseline_objects_total": 152,
        "v2_1_percent": v21_pct,
        "v2_blueprint_percent": blueprint_pct,
        "geo_essential_systems_partial": ess_partial,
        "geo_connectivity_partial": conn_partial,
        "network_edges_institutional": len(network_edges),
        "chokepoints": len(chokepoints),
        "observed_patterns": len(patterns),
        "recommendations_made": 0,
        "emergency_government_objects": "LEFT_OPEN",
    },
    "surfaces": {
        "pass": "/v2/see-arkansas/institutions-power-constraints/",
        "what_changed": "/v2/see-arkansas/what-changed/v2-1-4/",
    },
    "next": "V2.1.5 — Whole-State X-Ray (join; almost no new research)",
    "deferred": [
        "Full Arkansas board roster",
        "FOIA fulfillment statistics",
        "Complete judicial circuit map ingest",
        "Emergency powers deep statute digest (objects left OPEN)",
        "ai / intergenerational_obligations homes",
        "Any redesign / capture fix / public bank",
        "Narration Director (separate track)",
    ],
    "authority_ledger": authority_ledger,
    "change_pathway_matrix": change_pathway_matrix,
    "appointment_power_graph": appointment_graph,
    "public_dollar_power_chain": money_power_chain,
    "constraint_ledger": constraint_ledger,
    "federalism_functional_map": federalism_map,
    "democratic_power_map": democratic_power_map,
    "administrative_decision_map": admin_decision_map,
    "transparency_architecture": transparency_architecture,
    "power_chokepoints": chokepoints,
    "observed_patterns": patterns,
    "visual_who_runs_what": who_runs_what,
    "visual_can_arkansas_change": can_arkansas_change,
    "county_network_edges_institutional": network_edges,
    "harvested_sources": [
        "stage3_pass35_government_democratic_power.json",
        "stage2_pass24_government_operating_system.json",
        "stage4_pass42_legal_constitutional_attack.json",
        "stage4_pass45_political_administrative_capture_attack.json",
        "transparency_framework.json",
        "popular_sovereignty_framework.json",
        "federalism_framework.json",
        "democracy_framework.json",
        "cc_v2_1_2_government_money.json",
        "data/imports/reddirt-legislative-civic/",
        "designated-county EAVS (elections evidence)",
    ],
}
dump("data/project/cc_v2_1_4_institutions_power_constraints.json", pass_doc)

changelog = {
    "version": "1.0.0",
    "pass_id": "V2.1.4",
    "pass_name": "Institutions, Power & Constraints",
    "decision_id": DEC,
    "update_id": UPD,
    "generated_at": TODAY,
    "status": "COMPLETE",
    "before_after": [
        {"label": "V2 BLUEPRINT", "before": "17.3%", "after": f"{blueprint_pct}%"},
        {"label": "V2.1 objects", "before": f"{closed_before}/152", "after": f"{closed_after}/152"},
        {"label": "Control diagram", "before": "missing", "after": "Authority + pathway + constraint ledgers"},
        {"label": "Money × power join", "before": "Money River only", "after": "Public-dollar power chain"},
        {"label": "County power scores", "before": "—", "after": "0 (forbidden)"},
        {"label": "Recommendations", "before": "0", "after": "0"},
    ],
    "objects_closed": [f"{h}.{t}" for (h, t) in NEW.keys()],
    "new_unknowns": [u["id"] for u in new_unks],
    "patterns_observed": [p["id"] for p in patterns],
    "chokepoints": [c["id"] for c in chokepoints],
    "nothing_recommended": True,
    "decisions_recorded": [V2DEC],
    "deferred_items": pass_doc["deferred"],
    "experience_links": [
        {"href": "/v2/see-arkansas/institutions-power-constraints/", "label": "Institutions, Power & Constraints →"},
        {"href": "/v2/see-arkansas/counties/network/", "label": "County Network →"},
        {"href": "/v2/see-arkansas/", "label": "V2.1 hub →"},
    ],
}
dump("data/project/pass_changelogs/v2_1_4.json", changelog)

if not any(d.get("id") == V2DEC for d in reg.get("decisions") or []):
    reg.setdefault("decisions", []).append(
        {
            "id": V2DEC,
            "date": TODAY,
            "title": "Close V2.1.4 with Arkansas control diagram (power ≠ org chart)",
            "decision": (
                "Who can make, administer, finance, constrain, challenge, or reverse decisions "
                "affecting Arkansas' political-economic system? Answered at system resolution with "
                "Authority/Change/Constraint ledgers; board roster and FOIA rates UNKNOWN-COMPLETE; "
                "emergency_government left OPEN for deeper fill."
            ),
            "why": "Need control diagram before Whole-State X-Ray and redesign — without civics textbook or rankings.",
            "evidence": [
                "Pass 3.5",
                "Pass 4.2",
                "Pass 4.5",
                "V2.1.2 money join",
                "transparency/sovereignty/federalism frameworks",
            ],
            "alternatives_rejected": [
                "Invent board counts or FOIA rates",
                "County political power scores",
                "Capture fixes / redesign prescriptions",
                "Close emergency_government without statute digest",
            ],
            "could_reverse_if": "Primary constitutional/statutory authority binds shown wrong — correct and reopen affected objects.",
            "v1_doctrine_impact": "NONE",
        }
    )
reg["decision_id"] = DEC
reg["update_id"] = UPD
dump("data/project/v2_decision_register.json", reg)

for p in v21["passes"]:
    if p["id"] == "V2.1.4":
        p["status"] = "COMPLETE"
        p["href"] = "/v2/see-arkansas/institutions-power-constraints/"
        p["what_changed"] = "/v2/see-arkansas/what-changed/v2-1-4/"
    if p["id"] == "V2.1.5":
        p["status"] = "NEXT"
v21["decision_id"] = DEC
v21["update_id"] = UPD
v21["progress"] = {
    "closure_objects_total": 152,
    "closure_objects_closed": closed_after,
    "v2_1_completion_percent": v21_pct,
    "v2_blueprint_percent": blueprint_pct,
}
dump("data/project/cc_v2_1_see_arkansas.json", v21)

plan["decision_id"] = DEC
plan["update_id"] = UPD
plan["blueprint"]["percent"] = blueprint_pct
for g in plan["gates"]:
    if g["id"] == "V2.1":
        g["completion_percent"] = v21_pct
        g["objects_closed"] = closed_after
for c in plan["object_counters"]:
    if c["id"] == "baseline_objects_resolved":
        c["resolved"] = closed_after
plan["next_only"] = "V2.1.5 — Whole-State X-Ray (join 2.1.1–2.1.4 + GEO; almost no new research)."
plan["active_pass"] = "V2.1.4 COMPLETE → next V2.1.5"
dump("data/project/cc_v2_master_build_plan.json", plan)

ladder = load("data/project/completion_ladder_and_dashboard.json")
ladder["decision_id"] = DEC
ladder["update_id"] = UPD
ladder["v2_blueprint"] = {
    **ladder.get("v2_blueprint", {}),
    "percent": blueprint_pct,
    "v2_1_percent": v21_pct,
    "v2_1_closed": closed_after,
    "note": f"V2.1.4 complete. {closed_after}/152. Next: V2.1.5 Whole-State X-Ray.",
    "href": "/v2/see-arkansas/",
}
dump("data/project/completion_ladder_and_dashboard.json", ladder)

state = load("data/project/current_build_state.json")
state["decision_id"] = DEC
state["status"] = "v2_1_4_complete_v2_1_5_next"
state["next_action"] = "V2.1.5 — Whole-State X-Ray"
state["v2_blueprint_percent"] = blueprint_pct
state["writing_focus"] = f"V2.1.4 COMPLETE. Blueprint {blueprint_pct}%. Next V2.1.5. Recommendations: 0."
state["notes"] = [
    f"{DEC}/{UPD}: V2.1.4 complete. {closed_after}/152. Control diagram. 0 recommendations."
] + [n for n in (state.get("notes") or []) if DEC not in str(n)]
dump("data/project/current_build_state.json", state)

bpreg = load("data/project/build_progress_registry.json")
bpreg["decision_id"] = DEC
bpreg["update_id"] = UPD
bpreg["next_objective"] = "V2.1.5 Whole-State X-Ray — join SEE layers; orphan test; certify V2.1."
bpreg["v2_blueprint"] = {"percent": blueprint_pct, "href": "/v2/see-arkansas/"}
if not any(x.get("id") == DEC for x in bpreg.get("infrastructure_checkpoints") or []):
    bpreg.setdefault("infrastructure_checkpoints", []).append(
        {
            "id": DEC,
            "title": "V2.1.4 Institutions, Power & Constraints complete",
            "date": TODAY,
            "href": "/v2/see-arkansas/what-changed/v2-1-4/",
        }
    )
dump("data/project/build_progress_registry.json", bpreg)

sg = load("data/project/stewardship_governance_v1.json")
sg["recommended_next_priority"] = {
    "lane": "V2_BLUEPRINT",
    "focus": "V2.1.5 Whole-State X-Ray",
    "decision_id": DEC,
}
sg["v2_blueprint"] = {**sg.get("v2_blueprint", {}), "percent": blueprint_pct, "href": "/v2/see-arkansas/"}
dump("data/project/stewardship_governance_v1.json", sg)

updates = load("data/project/updates.json")
if not any(u.get("id") == UPD for u in updates.get("updates") or []):
    updates.setdefault("updates", []).append(
        {
            "id": UPD,
            "date": TODAY,
            "title": "V2.1.4 Institutions, Power & Constraints complete",
            "summary": (
                f"{DEC}: Authority/Change/Constraint/Money-power ledgers; Who Runs What + Can Arkansas Change This; "
                f"GEO institutional edges. Objects {closed_after}/152. Blueprint {blueprint_pct}%. "
                "Recommendations: 0. Next: V2.1.5."
            ),
            "public": True,
        }
    )
updates["last_updated"] = TODAY
dump("data/project/updates.json", updates)

rule_path = ROOT / ".cursor/rules/v2-doctrine-protection.mdc"
rule = rule_path.read_text(encoding="utf-8")
old = (
    "→ V2.1.3 Production, Ownership & Capital — **COMPLETE**  \n"
    "→ **NEXT:** V2.1.4 Institutions, Power & Constraints"
)
new = (
    "→ V2.1.3 Production, Ownership & Capital — **COMPLETE**  \n"
    "→ V2.1.4 Institutions, Power & Constraints — **COMPLETE**  \n"
    "→ **NEXT:** V2.1.5 Whole-State X-Ray"
)
if old in rule:
    rule_path.write_text(rule.replace(old, new), encoding="utf-8")
elif "V2.1.4 Institutions, Power & Constraints — **COMPLETE**" not in rule:
    rule_path.write_text(
        rule.replace(
            "→ **NEXT:** V2.1.4 Institutions, Power & Constraints",
            "→ V2.1.4 Institutions, Power & Constraints — **COMPLETE**  \n→ **NEXT:** V2.1.5 Whole-State X-Ray",
        ),
        encoding="utf-8",
    )

(ROOT / "reports/CC_V2_1_4_INSTITUTIONS_POWER_CONSTRAINTS_RETURN.md").write_text(
    f"""# V2.1.4 — Institutions, Power & Constraints — Return

**Decision:** {DEC} · **Update:** {UPD} · **V2-DEC:** {V2DEC}

## Verdict

COMPLETE. Recommendations: **0**. County power scores: **0**.

## Progress

- Objects: {closed_before} → **{closed_after}/152** (+{newly})
- V2.1: **{v21_pct}%**
- Blueprint: **{blueprint_pct}%**
- emergency_government: left OPEN (light baseline only)

## What closed

Authority Ledger · six power forms · Change Pathway Matrix · Appointment graph ·
Money-power chain · Constraint Ledger · Federalism map · Democratic Power Map ·
Admin decision map · Transparency architecture · PWR-CP-* · PAT-INST-* ·
WHO ACTUALLY RUNS WHAT? · Can Arkansas Change This?

## Next

V2.1.5 — Whole-State X-Ray (join; almost no new research) → orphan → SEE CERTIFIED.
""",
    encoding="utf-8",
)

print(
    f"{closed_before}->{closed_after}/152 (+{newly}) v21={v21_pct}% bp={blueprint_pct}% "
    f"ess={ess_partial} conn={conn_partial} edges={len(network_edges)}"
)
