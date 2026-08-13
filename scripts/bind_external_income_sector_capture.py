#!/usr/bin/env python3
"""External Income sector capture model (HYP-131) — swing variable.

Central question: How much money can Arkansas deliberately pull in from outside
the state and keep circulating inside Arkansas long enough to create recurring
public income, local ownership, and a larger prosperity base?

Hard wall: External income is NOT automatically public revenue. Only an
evidence-backed mechanism (royalty, lease, participation, enterprise return,
workforce contribution, Prosperity Fund feeder, etc.) can count toward ~$7.23B.
"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "imports" / "arkansas-revenue-replacement"
OUT.mkdir(parents=True, exist_ok=True)

SLICE = "CC-ARKANSAS-EXTERNAL-INCOME-SECTOR-CAPTURE-1.0"
DEC, UPD = "CC-DEC-135", "UPD-148"
COMBINED = 7_231_905_638
IIT = 3_859_100_000

# Bound / secondary scale anchors from prior HYP-131 work + official tourism report
ANCHORS = {
    "arkansas_gdp_2024_usd": 188_339_600_000,
    "arkansas_gdp_2025_usd": 198_422_000_000,
    "arkansas_gdp_source": "https://fred.stlouisfed.org/series/ARNGSP",
    "manufacturing_gdp_2023_current_usd": 25_898_000_000,
    "ag_forestry_fishing_gdp_2023_current_usd": 2_855_000_000,
    "aedc_gdp_report": "https://www.arkansasedc.com/docs/default-source/data-and-reports/2023-gdp-report_2024-10.pdf?sfvrsn=54112996_1",
    "tourism_visitor_spending_2025_usd": 10_200_000_000,
    "tourism_total_impact_2025_usd": 17_400_000_000,
    "tourism_visitors_2025": 54_300_000,
    "tourism_2pct_tax_fy2026_usd": 26_851_526,
    "tourism_report": "https://www.arkansas.com/sites/default/files/2026-07/Arkansas%20Tourism%202025-FY2026%20Economic%20Impact%20Report.pdf",
    "natural_gas_severance_fy2026_usd": 25_615_616,
    "dfa_gr_severance_fy2026_usd": 10_600_000,
    "dfa_gr_corporate_fy2026_usd": 523_600_000,
    "qcew_private_wages_2024_usd": 64_458_593_075,
}


def capture_chain() -> dict:
    return {
        "name": "Arkansas External Income Capture Chain",
        "steps": [
            "outside_dollars_entering",
            "arkansas_payroll",
            "arkansas_owned_margin",
            "local_supplier_spend",
            "state_local_public_revenue",
            "retained_earnings_ownership",
            "leakage_back_out_of_state",
        ],
        "rule": (
            "A $1B export sector is not automatically $1B of Arkansas prosperity if most "
            "ownership, purchasing, profits, or IP rents leave the state"
        ),
        "leakage_line_essential": True,
    }


def eicr_definition() -> dict:
    return {
        "name": "External Income Capture Ratio",
        "status": "MODELING_TOOL_NOT_PUBLIC_BASELINE",
        "definition": (
            "Share of outside-origin revenue that remains as Arkansas wages, local profits, "
            "public revenue, retained ownership, and reinvestment"
        ),
        "formula_concept": (
            "(AR payroll + AR-owned margin + local supplier value-add + incremental public "
            "revenue + retained ownership reinvestment) / outside_origin_gross"
        ),
        "use": (
            "Sector ranking tool — a smaller locally owned food-processing ecosystem may retain "
            "more Arkansas value than a much larger externally owned operation with high leakage"
        ),
        "not": "A locked public statistics dial or countable replacement metric",
    }


def fields_required() -> list[str]:
    return [
        "current_arkansas_scale",
        "current_external_revenue_share",
        "current_local_ownership_share",
        "import_dependence",
        "export_potential",
        "workforce_bottleneck",
        "infrastructure_bottleneck",
        "public_capital_requirement",
        "realistic_public_participation_mechanism",
        "time_to_scale",
        "volatility",
        "legal_constraints",
        "direct_public_cash_flow_potential",
        "indirect_prosperity_effects",
        "leakage_risk",
    ]


def sector(**kwargs) -> dict:
    required = [
        "id",
        "name",
        "outside_demand_source",
        "current_arkansas_scale",
        "current_external_revenue_share",
        "current_local_ownership_share",
        "import_dependence",
        "export_potential",
        "workforce_bottleneck",
        "infrastructure_bottleneck",
        "public_capital_requirement",
        "realistic_public_participation_mechanism",
        "time_to_scale",
        "volatility",
        "legal_constraints",
        "direct_public_cash_flow_potential",
        "indirect_prosperity_effects",
        "leakage_risk",
        "illustrative_eicr_band",
        "hyp130_capacity_link",
        "rejected_designs",
        "countable_public_cash_usd",
        "bucket",
        "notes",
    ]
    for r in required:
        if r not in kwargs:
            raise KeyError(r)
    kwargs["status"] = kwargs.get("status", "SCORED_ZERO_COUNTABLE")
    return kwargs


def build_sectors() -> list[dict]:
    return [
        sector(
            id="EI-ENERGY",
            name="Energy exports and related infrastructure participation",
            outside_demand_source="Interstate/regional power and fuel markets; industrial energy demand; future lithium/critical minerals value chain",
            current_arkansas_scale={
                "status": "PARTIAL_BOUND",
                "natural_gas_severance_fy2026_usd": ANCHORS["natural_gas_severance_fy2026_usd"],
                "dfa_gr_severance_fy2026_usd": ANCHORS["dfa_gr_severance_fy2026_usd"],
                "note": "Severance is tiny vs ~$7.23B and mostly highway-dedicated; generation/transmission ownership scale NEE",
            },
            current_external_revenue_share="HIGH_POTENTIAL — energy is tradable; exact export share NEE without EIA/utility join",
            current_local_ownership_share="MIXED_TO_LOW for large generation/transmission — public/cooperative participation redesign required",
            import_dependence="Equipment, specialized services, some fuels/inputs imported",
            export_potential="HIGH if generation, storage, lithium processing, and transmission access capture designed inside Arkansas",
            workforce_bottleneck="Electrical trades, plant ops, mining/processing technicians — HYP-130 energy/trades cells",
            infrastructure_bottleneck="Transmission, interconnection, processing plants, water for some pathways",
            public_capital_requirement="MEDIUM_TO_HIGH for participation/ownership stakes; LOW for royalty redesign alone",
            realistic_public_participation_mechanism=[
                "production royalties / severance redesign (non-discriminatory)",
                "public land / pore-space / infrastructure leases",
                "generation or storage partnerships with public equity share",
                "utility / cooperative dividend pathways",
                "Prosperity Fund feeder from public energy returns",
            ],
            time_to_scale="4–16 years depending on lithium/FID and ownership deals",
            volatility="HIGH — commodity and power-price cycles",
            legal_constraints="No discriminatory energy export tax (Commerce / Import-Export); Amendment 47/ad valorem issues if wealth-like; PSC/utility regulation",
            direct_public_cash_flow_potential="SUPPORT_ENGINE today (~$26M gas severance, mostly spent); TRANSFORMATIONAL only with ownership/permanent-share design",
            indirect_prosperity_effects="Payroll, supplier ecosystems, landowner royalties, rural tax base",
            leakage_risk="HIGH if out-of-state owners take resource rents and equipment/IP margins leave",
            illustrative_eicr_band={
                "status": "ILLUSTRATIVE",
                "low": 0.15,
                "base": 0.30,
                "high_with_public_participation": 0.45,
                "note": "Not calibrated — forces ownership design question",
            },
            hyp130_capacity_link="Energy / skilled trades / processing technician pathways",
            rejected_designs=["Discriminatory energy export tax / interstate surcharge"],
            countable_public_cash_usd=0,
            bucket="STRATEGIC_SWING_ZERO_COUNTABLE",
            notes="Swing feeder for Prosperity Fund Accelerated path; existing severance already spent",
        ),
        sector(
            id="EI-FOOD-AG-PROCESSING",
            name="Food/ag exports with more in-state processing and margin capture",
            outside_demand_source="National/international grocery, foodservice, and ingredient markets",
            current_arkansas_scale={
                "status": "PARTIAL_BOUND",
                "ag_forestry_fishing_gdp_2023_current_usd": ANCHORS["ag_forestry_fishing_gdp_2023_current_usd"],
                "source": ANCHORS["aedc_gdp_report"],
                "note": "Farm GDP ≠ export receipts or processing margins; NASS cash receipts / export join NEE this slice",
            },
            current_external_revenue_share="HIGH for commodities shipped raw; processing share is the capture question",
            current_local_ownership_share="FARM_LEVEL OFTEN LOCAL; PROCESSING/BRANDING OFTEN EXTERNAL — redesign target",
            import_dependence="Inputs, packaging, some processing equipment",
            export_potential="HIGH if hubs retain processing/logistics/marketing margins before goods leave",
            workforce_bottleneck="Food science, cold-chain, sanitation, packaging, QA — HYP-130 ag/processing cells",
            infrastructure_bottleneck="Cold storage, slaughter/processing capacity, rail/truck, food hubs",
            public_capital_requirement="MEDIUM — hubs, co-ops, patient capital, shared facilities",
            realistic_public_participation_mechanism=[
                "cooperative / community food-hub ownership",
                "public or mixed facility leases",
                "AEDC participation redesigned for equity/return",
                "procurement weighting for Arkansas-processed goods",
            ],
            time_to_scale="4–12 years for meaningful hub ecosystems",
            volatility="MODERATE_HIGH — commodity prices, weather, trade",
            legal_constraints="No discriminatory food-export tax; antitrust/co-op law; food safety",
            direct_public_cash_flow_potential="LOW today as dedicated public income; HIGH as Enterprise/Prosperity Fund feeder if ownership retained",
            indirect_prosperity_effects="Farm income, rural jobs, local supplier multipliers — often higher EICR than raw commodity export",
            leakage_risk="VERY_HIGH under raw-commodity export with external packer/brand ownership",
            illustrative_eicr_band={
                "status": "ILLUSTRATIVE",
                "raw_commodity_export": 0.20,
                "local_processing_hub": 0.45,
                "branded_arkansas_owned": 0.55,
            },
            hyp130_capacity_link="Agriculture / food processing / extension / CTE",
            rejected_designs=["Specific tax because food is exported to another state"],
            countable_public_cash_usd=0,
            bucket="HIGH_CAPTURE_DESIGN_PRIORITY_ZERO_COUNTABLE",
            notes="Classic EICR lesson: smaller locally owned processing can beat larger leaky export volume",
        ),
        sector(
            id="EI-TOURISM",
            name="Tourism and destination spending",
            outside_demand_source="Out-of-state and international visitors; day and overnight travel",
            current_arkansas_scale={
                "status": "BOUND",
                "visitor_spending_2025_usd": ANCHORS["tourism_visitor_spending_2025_usd"],
                "total_economic_impact_2025_usd": ANCHORS["tourism_total_impact_2025_usd"],
                "visitors_2025": ANCHORS["tourism_visitors_2025"],
                "state_2pct_tax_fy2026_usd": ANCHORS["tourism_2pct_tax_fy2026_usd"],
                "source": ANCHORS["tourism_report"],
            },
            current_external_revenue_share="VERY_HIGH — visitor spending is definitionally outside-origin demand",
            current_local_ownership_share="MIXED — lodging/restaurants often local; national chains and OTAs leak",
            import_dependence="Some goods/services imported; labor often local",
            export_potential="N/A (inbound services export) — scale via destination quality and season extension",
            workforce_bottleneck="Hospitality, outdoor recreation guides, culinary — trainable in-state",
            infrastructure_bottleneck="Parks, trails, lodging quality, airports/roads, broadband in destinations",
            public_capital_requirement="MEDIUM — parks/heritage/outdoor infrastructure + marketing",
            realistic_public_participation_mechanism=[
                "existing 2% tourism tax (already earmarked marketing)",
                "local hospitality taxes",
                "park/concession enterprise returns",
                "destination ownership/cooperative lodging experiments",
            ],
            time_to_scale="1–8 years for incremental; destination quality compounds",
            volatility="MODERATE — recession/travel shocks; weather",
            legal_constraints="Generally applicable lodging/tourism taxes OK; no discriminatory interstate barriers",
            direct_public_cash_flow_potential="REAL BUT SPENT — ~$26.9M 2% tax FY2026 already funds tourism marketing; not free IIT replacement",
            indirect_prosperity_effects="Large payroll and small-business spend; one of the cleanest outside-dollar engines",
            leakage_risk="MEDIUM — OTAs, national chains, imported goods; still often better EICR than commodity exports",
            illustrative_eicr_band={
                "status": "ILLUSTRATIVE",
                "low": 0.35,
                "base": 0.50,
                "high_local_ownership": 0.65,
            },
            hyp130_capacity_link="Hospitality / outdoor recreation / culinary pathways",
            rejected_designs=[],
            countable_public_cash_usd=0,
            bucket="BOUND_SCALE_ALREADY_SPENT_PUBLIC_SLICE",
            notes="$10.2B visitor spend is outside demand scale — public countable remains $0 until new incremental mechanisms",
        ),
        sector(
            id="EI-DEFENSE-FEDERAL",
            name="Defense / federal procurement",
            outside_demand_source="DoD, federal civilian agencies, aerospace/defense primes and subcontractors",
            current_arkansas_scale={
                "status": "NEE",
                "note": "Statewide federal procurement / defense contract award census not bound this slice — USASpending/DoD join required",
            },
            current_external_revenue_share="HIGH when contracts are won — federal dollars are outside-origin",
            current_local_ownership_share="OFTEN LOW at prime level; Arkansas capture depends on subcontractor and workforce share",
            import_dependence="Federal specs; many components from national supply chains",
            export_potential="N/A — federal demand pull; Arkansas competes for share",
            workforce_bottleneck="Aerospace, cyber, skilled manufacturing, clearances — HYP-130 manufacturing/tech/public-service cells",
            infrastructure_bottleneck="Industrial sites, testing, secure facilities, airports/rail",
            public_capital_requirement="MEDIUM — site readiness, training pipelines, selective public participation",
            realistic_public_participation_mechanism=[
                "workforce training as public investment with employer contribution credits",
                "industrial site / port / airport enterprise returns",
                "selective equity/participation only where public capital is at risk",
            ],
            time_to_scale="4–12 years for major platforms; continuous for subcontracting",
            volatility="MODERATE — federal budget cycles and program risk",
            legal_constraints="No state import tax for defense; federal procurement rules; ITAR/security",
            direct_public_cash_flow_potential="INDIRECT via payroll taxes and CIT already spent; new public income needs ownership/fee design",
            indirect_prosperity_effects="High-wage jobs, supplier ecosystems, veteran pipelines",
            leakage_risk="HIGH if primes and IP owners are out-of-state and Arkansas is only a low-margin labor node",
            illustrative_eicr_band={
                "status": "ILLUSTRATIVE",
                "labor_node_only": 0.25,
                "strong_subcontractor_base": 0.40,
                "with_local_equity_participation": 0.50,
            },
            hyp130_capacity_link="Aerospace / advanced manufacturing / cyber / veteran pathways",
            rejected_designs=["State tax on interstate imports for national defense"],
            countable_public_cash_usd=0,
            bucket="STRATEGIC_ZERO_COUNTABLE_SCALE_NEE",
            notes="Federal ledger remains federal; Arkansas strategy is capture of contracts and local value-add",
        ),
        sector(
            id="EI-LOGISTICS",
            name="Logistics and distribution",
            outside_demand_source="National freight flows through Arkansas geography (I-40/I-30/I-55, river, rail, air cargo)",
            current_arkansas_scale={
                "status": "NEE",
                "note": "Freight tonnage / warehouse VA / port volumes not bound this slice",
            },
            current_external_revenue_share="HIGH for through-freight; capture depends on whether Arkansas is a warehouse/value-add stop or a pass-through",
            current_local_ownership_share="MIXED — national 3PLs dominate many nodes",
            import_dependence="Rolling stock, software, some labor",
            export_potential="HIGH as value-added logistics / cross-dock / packaging node",
            workforce_bottleneck="CDL, warehouse tech, maintenance, logistics analysts",
            infrastructure_bottleneck="Intermodal, last-mile, river ports, highway capacity",
            public_capital_requirement="MEDIUM_HIGH for ports/intermodal; fee-recoverable use design preferred",
            realistic_public_participation_mechanism=[
                "port/intermodal enterprise returns",
                "use fees aligned to infrastructure wear (Use engine overlap)",
                "public land leases for logistics parks with participation",
            ],
            time_to_scale="4–12 years",
            volatility="MODERATE — trade and e-commerce cycles",
            legal_constraints="Dormant Commerce Clause on discriminatory freight taxes; Highway Revenue Distribution constraints on fuel dollars",
            direct_public_cash_flow_potential="OVERLAP with Use engine; incremental public income needs port/enterprise design",
            indirect_prosperity_effects="Jobs, site selection magnet for manufacturers",
            leakage_risk="HIGH for pure through-freight with out-of-state 3PL ownership",
            illustrative_eicr_band={
                "status": "ILLUSTRATIVE",
                "pass_through": 0.15,
                "value_added_node": 0.35,
            },
            hyp130_capacity_link="CDL / logistics / industrial maintenance",
            rejected_designs=["Discriminatory tax on goods merely because they leave Arkansas"],
            countable_public_cash_usd=0,
            bucket="INFRASTRUCTURE_ENABLED_ZERO_COUNTABLE",
            notes="Geography is an asset only if Arkansas captures stop/value-add, not just pavement wear",
        ),
        sector(
            id="EI-ADVANCED-MFG",
            name="Advanced manufacturing",
            outside_demand_source="National/global goods markets; OEM supply chains",
            current_arkansas_scale={
                "status": "PARTIAL_BOUND",
                "manufacturing_gdp_2023_current_usd": ANCHORS["manufacturing_gdp_2023_current_usd"],
                "source": ANCHORS["aedc_gdp_report"],
            },
            current_external_revenue_share="HIGH for tradable manufactures",
            current_local_ownership_share="OFTEN LOW for large plants — HQ/IP frequently out-of-state",
            import_dependence="Components, machine tools, engineering services",
            export_potential="HIGH",
            workforce_bottleneck="Mechatronics, welding, industrial controls, quality — HYP-130 manufacturing cells",
            infrastructure_bottleneck="Sites, power, water, rail, housing near plants",
            public_capital_requirement="HIGH if competing with incentive packages; redesign toward participation/return",
            realistic_public_participation_mechanism=[
                "AEDC participation / clawbacks with real public return",
                "workforce prosperity contribution credits tied to training",
                "site/infrastructure leases with upside share",
            ],
            time_to_scale="4–16 years per major cluster",
            volatility="MODERATE_HIGH — industrial cycles, trade policy",
            legal_constraints="Incentive legality; Commerce Clause; no export-discriminatory taxes",
            direct_public_cash_flow_potential="Existing CIT/sales already spent; incremental public income requires redesigned participation",
            indirect_prosperity_effects="High-wage jobs; supplier ecosystems if local sourcing rules/practices improve",
            leakage_risk="VERY_HIGH under externally owned plants with thin local supplier base",
            illustrative_eicr_band={
                "status": "ILLUSTRATIVE",
                "branch_plant_high_leakage": 0.20,
                "dense_local_supplier_network": 0.40,
                "with_public_or_local_equity": 0.50,
            },
            hyp130_capacity_link="Advanced manufacturing / mechatronics / industrial tech",
            rejected_designs=[],
            countable_public_cash_usd=0,
            bucket="LARGE_SCALE_HIGH_LEAKAGE_RISK_ZERO_COUNTABLE",
            notes="~$25.9B manufacturing GDP is scale — not Arkansas-owned surplus or public cash",
        ),
        sector(
            id="EI-HEALTHCARE-INBOUND",
            name="Healthcare as an inbound regional service",
            outside_demand_source="Patients from bordering states and regions seeking Arkansas specialty care",
            current_arkansas_scale={
                "status": "NEE",
                "note": "Out-of-state patient revenue share for UAMS/systems not bound; HYP-130 signals primary-care shortage even as specialty magnets may exist",
            },
            current_external_revenue_share="PARTIAL — some systems already draw regional patients; share NEE",
            current_local_ownership_share="MIXED — nonprofit systems, physician groups, national chains",
            import_dependence="Pharma, devices, specialty labor",
            export_potential="MEDIUM_HIGH for regional specialty hubs",
            workforce_bottleneck="Physicians, nurses, allied health — HYP-130 healthcare shortage signals",
            infrastructure_bottleneck="Specialty capacity, housing, transport for patients/families",
            public_capital_requirement="HIGH for academic medical / specialty expansion",
            realistic_public_participation_mechanism=[
                "public academic medical enterprise returns where lawful",
                "workforce pipeline investment with retention bargains",
                "facility partnerships with community benefit + return rules",
            ],
            time_to_scale="8–16 years for specialty hub buildout",
            volatility="MODERATE — payer mix and federal health policy",
            legal_constraints="Nonprofit rules; CON/regulation; federal program rules",
            direct_public_cash_flow_potential="LIMITED as GR replacement; stronger as prosperity/workforce effects",
            indirect_prosperity_effects="High-wage professional employment; regional spend by patients/families",
            leakage_risk="MEDIUM — national device/pharma margins leak; clinical labor often local",
            illustrative_eicr_band={
                "status": "ILLUSTRATIVE",
                "base": 0.40,
                "strong_local_clinical_ownership": 0.55,
            },
            hyp130_capacity_link="Healthcare/medicine — leave-state residency/specialty question is the gate",
            rejected_designs=[],
            countable_public_cash_usd=0,
            bucket="CAPACITY_GATED_ZERO_COUNTABLE",
            notes="Cannot scale inbound specialty care without training capacity HYP-130 flags as incomplete",
        ),
        sector(
            id="EI-HIGHER-ED",
            name="Higher education / specialized training attracting out-of-state students",
            outside_demand_source="Out-of-state tuition, living spend, and research collaborators",
            current_arkansas_scale={
                "status": "NEE",
                "note": "Out-of-state enrollment × net tuition × living spend census not bound this slice",
            },
            current_external_revenue_share="MATERIAL for flagships/regionals with nonresident students — exact share NEE",
            current_local_ownership_share="PUBLIC institutions are Arkansas public assets; private colleges vary",
            import_dependence="Faculty market is national; some services imported",
            export_potential="HIGH for distinctive programs (ag, logistics, outdoor, health, engineering niches)",
            workforce_bottleneck="Faculty/specialty program capacity — circular with HYP-130",
            infrastructure_bottleneck="Labs, housing, broadband, clinical sites",
            public_capital_requirement="MEDIUM_HIGH for program buildout",
            realistic_public_participation_mechanism=[
                "public university enterprise / auxiliary returns",
                "IP commercialization share (see EI-RESEARCH-IP)",
                "training programs tied to employer / Prosperity Fund feeders",
            ],
            time_to_scale="4–12 years per distinctive program cluster",
            volatility="MODERATE — demographics and enrollment cycles",
            legal_constraints="Tuition policy; residency rules; accreditation",
            direct_public_cash_flow_potential="AUXILIARY/ENTERPRISE potential; not currently modeled as Tax Retirement cash",
            indirect_prosperity_effects="Talent magnetism, local spend, research clustering",
            leakage_risk="MEDIUM — graduates may leave (brain drain) unless retention bargains exist",
            illustrative_eicr_band={
                "status": "ILLUSTRATIVE",
                "base": 0.45,
                "with_graduate_retention": 0.60,
            },
            hyp130_capacity_link="Direct — build program → attract students → retain talent → sector capacity",
            rejected_designs=[],
            countable_public_cash_usd=0,
            bucket="HYP130_FEEDBACK_LOOP_ZERO_COUNTABLE",
            notes="Core of capacity→workforce→external income loop",
        ),
        sector(
            id="EI-RESEARCH-IP",
            name="Research / IP commercialization",
            outside_demand_source="Licensing, sponsored research, spinouts selling into national/global markets",
            current_arkansas_scale={
                "status": "NEE",
                "note": "University/tech-transfer licensing revenue and patent commercialization not bound",
            },
            current_external_revenue_share="POTENTIALLY HIGH per successful license; volume currently small vs GDP",
            current_local_ownership_share="Depends on tech-transfer terms and spinout ownership — often weak Arkansas retention",
            import_dependence="Research talent and capital often external",
            export_potential="VERY_HIGH for successful IP — also highest leakage risk if owned elsewhere",
            workforce_bottleneck="Researchers, tech-transfer, entrepreneurial operators",
            infrastructure_bottleneck="Labs, incubators, patient capital",
            public_capital_requirement="MEDIUM for TTOs/incubators; HIGH for translational facilities",
            realistic_public_participation_mechanism=[
                "public university IP share / royalty streams",
                "Prosperity Fund as limited partner in spinouts",
                "community venture structures with anti-raid rules",
            ],
            time_to_scale="8–16+ years",
            volatility="VERY_HIGH — hit-driven",
            legal_constraints="Bayh-Dole / university IP policy; securities; conflict-of-interest",
            direct_public_cash_flow_potential="LONG_TAIL — not near-term replacement dollars",
            indirect_prosperity_effects="Cluster formation, high-skill jobs",
            leakage_risk="VERY_HIGH if IP assigned/licensed out with thin Arkansas residual",
            illustrative_eicr_band={
                "status": "ILLUSTRATIVE",
                "weak_retention": 0.10,
                "strong_public_ip_share": 0.40,
            },
            hyp130_capacity_link="Research universities / engineering / biotech capacity",
            rejected_designs=[],
            countable_public_cash_usd=0,
            bucket="LONG_HORIZON_HIGH_UPSIDE_ZERO_COUNTABLE",
            notes="Do not count hoped-for IP royalties as replacement dollars",
        ),
        sector(
            id="EI-AI-TECH-SERVICES",
            name="AI / data / technology services",
            outside_demand_source="National clients buying Arkansas-delivered software, data, AI, and professional tech services",
            current_arkansas_scale={
                "status": "NEE",
                "note": "Tech services export receipts / remote-service GSP share not bound",
            },
            current_external_revenue_share="POTENTIALLY HIGH — services are exportable without freight",
            current_local_ownership_share="CRITICAL VARIABLE — founders/HQ location determines EICR",
            import_dependence="Cloud, chips, talent competition",
            export_potential="VERY_HIGH",
            workforce_bottleneck="Software, data, AI ops — HYP-130 technology cells largely NEE/quantified",
            infrastructure_bottleneck="Broadband, power for data centers, talent housing",
            public_capital_requirement="MEDIUM for talent/power; HIGH if chasing hyperscale data centers without return design",
            realistic_public_participation_mechanism=[
                "power/land leases with participation for data centers",
                "workforce pipeline bargains",
                "avoid pure tax-abate-and-pray packages without public return",
            ],
            time_to_scale="4–12 years",
            volatility="HIGH — tech cycles",
            legal_constraints="Incentive packages; data privacy; utility regulation",
            direct_public_cash_flow_potential="LOW unless lease/participation designed; CIT already spent",
            indirect_prosperity_effects="High wages if talent retained locally",
            leakage_risk="VERY_HIGH for externally owned remote delivery or hyperscale with thin local supplier base",
            illustrative_eicr_band={
                "status": "ILLUSTRATIVE",
                "external_hq_remote": 0.15,
                "arkansas_founded_scaled": 0.55,
            },
            hyp130_capacity_link="Technology / computer science / data pathways — capacity gap is the gate",
            rejected_designs=[],
            countable_public_cash_usd=0,
            bucket="OWNERSHIP_SENSITIVE_ZERO_COUNTABLE",
            notes="Ownership location dominates EICR more than headline 'AI investment' announcements",
        ),
        sector(
            id="EI-SPECIALTY-AG-BRAND",
            name="Specialty agriculture and branded Arkansas products",
            outside_demand_source="Premium national/international consumers seeking differentiated Arkansas goods",
            current_arkansas_scale={
                "status": "NEE",
                "note": "Specialty/branded export receipts distinct from commodity ag GDP not bound",
            },
            current_external_revenue_share="GROWABLE — currently smaller than commodity complex",
            current_local_ownership_share="POTENTIALLY HIGH if brands remain Arkansas-controlled",
            import_dependence="Packaging/marketing services sometimes external",
            export_potential="HIGH per unit margin even if smaller volume",
            workforce_bottleneck="Food branding, QA, e-commerce, specialty production",
            infrastructure_bottleneck="Small-batch processing, cold chain, certification",
            public_capital_requirement="LOW_TO_MEDIUM — branding, co-pack, patient capital",
            realistic_public_participation_mechanism=[
                "cooperative brands",
                "extension + marketing support with measurable return rules",
                "shared co-pack facilities with lease returns",
            ],
            time_to_scale="4–10 years",
            volatility="MODERATE",
            legal_constraints="Labeling, food safety, trademark",
            direct_public_cash_flow_potential="SMALL DIRECT; HIGH EICR per dollar",
            indirect_prosperity_effects="Rural entrepreneurship; tourism crossover (agritourism)",
            leakage_risk="LOW_TO_MEDIUM if brand ownership retained; HIGH if sold to external consolidators",
            illustrative_eicr_band={
                "status": "ILLUSTRATIVE",
                "arkansas_owned_brand": 0.60,
                "sold_to_external_consolidator": 0.25,
            },
            hyp130_capacity_link="Extension / food entrepreneurship / CTE",
            rejected_designs=[],
            countable_public_cash_usd=0,
            bucket="HIGH_EICR_PER_DOLLAR_ZERO_COUNTABLE",
            notes="EICR poster child vs raw commodity volume",
        ),
        sector(
            id="EI-RETIREMENT-MIGRATION",
            name="Retirement migration / high-value residency (net-fiscal test required)",
            outside_demand_source="Retirees and high-net-worth residents relocating spending and sometimes capital to Arkansas",
            current_arkansas_scale={
                "status": "NEE",
                "note": "Net migration by age/income and fiscal incidence not bound; residual wealth model is separate",
            },
            current_external_revenue_share="INBOUND wealth/spend — not an export sector",
            current_local_ownership_share="N/A — residency choice; housing/healthcare ownership mixes",
            import_dependence="Healthcare capacity; amenities",
            export_potential="N/A",
            workforce_bottleneck="Geriatric care, home health — HYP-130 healthcare link",
            infrastructure_bottleneck="Healthcare, housing, amenities in destination counties",
            public_capital_requirement="MEDIUM if chasing amenities without cost recovery",
            realistic_public_participation_mechanism=[
                "generally applicable taxes/fees already in system",
                "do NOT count hoped-for wealth-tax yield as External Income",
                "only count if net-fiscal study shows surplus after service costs",
            ],
            time_to_scale="Ongoing; fiscal proof is the gate",
            volatility="MODERATE — housing and healthcare cost cycles",
            legal_constraints="Residency/tax rules; residual wealth contribution legal track separate (CC-DEC-134)",
            direct_public_cash_flow_potential="CONDITIONAL — can raise sales/property bases while raising service costs; net effect NEE",
            indirect_prosperity_effects="Local spend; possible entrepreneurship — or housing pressure",
            leakage_risk="MEDIUM — medical/out-of-state family transfers; seasonal residency",
            illustrative_eicr_band={
                "status": "ILLUSTRATIVE",
                "note": "EICR poorly defined; use net-fiscal balance instead of capture ratio",
                "net_fiscal_status": "NEE",
            },
            hyp130_capacity_link="Healthcare / aging services capacity",
            rejected_designs=[
                "Treating in-migration as automatically countable public revenue",
                "Using residual wealth contribution yield as External Income",
            ],
            countable_public_cash_usd=0,
            bucket="NET_FISCAL_TEST_REQUIRED_ZERO_COUNTABLE",
            notes="Include only if net-positive after service costs — otherwise a prosperity narrative without public cash",
        ),
    ]


def ranking(sectors: list[dict]) -> list[dict]:
    """Qualitative ranking by strategic capture priority — not by gross outside dollars."""
    order = [
        ("EI-FOOD-AG-PROCESSING", "Highest redesign leverage: processing/brand ownership raises EICR vs raw export"),
        ("EI-TOURISM", "Largest bound outside-demand scale; public slice real but already spent"),
        ("EI-SPECIALTY-AG-BRAND", "High EICR per dollar; complements food hubs"),
        ("EI-ENERGY", "Swing feeder for Prosperity Fund if participation/royalty redesigned"),
        ("EI-HIGHER-ED", "HYP-130 feedback loop — capacity creates attraction creates capacity"),
        ("EI-ADVANCED-MFG", "Large GDP scale; leakage risk dominates unless ownership/suppliers redesign"),
        ("EI-DEFENSE-FEDERAL", "High-wage external dollars; subcontract/local equity determine capture"),
        ("EI-LOGISTICS", "Geography advantage only with value-add stop, not pass-through"),
        ("EI-HEALTHCARE-INBOUND", "Capacity-gated by HYP-130 shortages"),
        ("EI-AI-TECH-SERVICES", "Ownership-location sensitive; capacity-gated"),
        ("EI-RESEARCH-IP", "Long-horizon upside; do not count hoped royalties"),
        ("EI-RETIREMENT-MIGRATION", "Net-fiscal test required before treating as engine"),
    ]
    by_id = {s["id"]: s for s in sectors}
    out = []
    for i, (sid, why) in enumerate(order, 1):
        s = by_id[sid]
        out.append(
            {
                "rank": i,
                "sector_id": sid,
                "name": s["name"],
                "why": why,
                "bucket": s["bucket"],
                "countable_public_cash_usd": 0,
            }
        )
    return out


def hyp130_loop() -> dict:
    return {
        "hypothesis_id": "CC-HYP-ARKANSAS-STRATEGIC-CAPACITY",
        "incubator_alias": "HYP-130",
        "inventory": "data/project/arkansas_strategic_capacity_inventory.json",
        "loop": [
            "capacity_gap",
            "build_program",
            "produce_workforce",
            "attract_sector",
            "capture_external_income",
            "grow_public_wealth",
            "reduce_tax_burden",
        ],
        "rule": (
            "Sectors Arkansas cannot scale for lack of training/higher-ed capacity remain "
            "aspirational External Income until HYP-130 gaps close"
        ),
        "priority_capacity_gates": [
            "healthcare specialty/residency slots",
            "advanced manufacturing / mechatronics",
            "AI/tech pathways",
            "food processing / cold-chain skills",
            "energy / industrial trades",
        ],
    }


def main() -> None:
    sectors = build_sectors()
    assert sum(s["countable_public_cash_usd"] for s in sectors) == 0

    out = {
        "version": "1.0.0",
        "slice_id": SLICE,
        "generated_at": "2026-08-12",
        "decision_id": DEC,
        "update_id": UPD,
        "hypothesis_id": "CC-HYP-PROSPERITY-BASED-REVENUE-REPLACEMENT-SYSTEM",
        "incubator_alias": "HYP-131",
        "engine_id": "ENGINE-EXTERNAL-INCOME",
        "status": "EXTERNAL_INCOME_SECTOR_CAPTURE_SCORED_ZERO_COUNTABLE",
        "central_question": (
            "How much money can Arkansas deliberately pull in from outside the state and keep "
            "circulating inside Arkansas long enough to create recurring public income, local "
            "ownership, and a larger prosperity base?"
        ),
        "hard_wall": (
            "External income is not automatically public revenue. Only an evidence-backed "
            "mechanism—royalty, lease, participation agreement, enterprise return, workforce "
            "contribution, prosperity-fund feeder, etc.—can count toward the ~$7.23B replacement burden."
        ),
        "philosophical_note": (
            "Not fundamentally about taxation — about bringing outside dollars in and retaining "
            "Arkansas value through ownership and circulation"
        ),
        "capture_chain": capture_chain(),
        "external_income_capture_ratio": eicr_definition(),
        "sector_fields_required": fields_required(),
        "scale_anchors": ANCHORS,
        "sectors": sectors,
        "sector_ranking_by_capture_priority": ranking(sectors),
        "hyp130_feedback_loop": hyp130_loop(),
        "constitutional_rejects": [
            "Discriminatory tax on goods exported from Arkansas",
            "State tax on interstate imports for national defense",
            "Energy export tax / discriminatory interstate surcharge",
        ],
        "buckets": {
            "COUNTABLE_NOW": {
                "incremental_recurring_usd": 0,
                "verdict": "No sector clears the hard wall this slice",
            },
            "BOUND_OUTSIDE_DEMAND_SCALE": {
                "ids": ["EI-TOURISM"],
                "verdict": "$10.2B visitor spend bound; $26.9M 2% tax already spent — scale ≠ countable",
            },
            "PARTIAL_GDP_SCALE": {
                "ids": ["EI-ADVANCED-MFG", "EI-FOOD-AG-PROCESSING", "EI-ENERGY"],
                "verdict": "Manufacturing/ag GDP and severance bound as envelopes — ownership/capture NEE",
            },
            "HIGH_CAPTURE_DESIGN_PRIORITY": {
                "ids": ["EI-FOOD-AG-PROCESSING", "EI-SPECIALTY-AG-BRAND", "EI-TOURISM", "EI-ENERGY"],
                "verdict": "Best redesign leverage for raising EICR and feeding Enterprise/Prosperity Fund",
            },
            "CAPACITY_GATED_BY_HYP130": {
                "ids": ["EI-HEALTHCARE-INBOUND", "EI-HIGHER-ED", "EI-AI-TECH-SERVICES", "EI-ADVANCED-MFG"],
                "verdict": "Cannot honestly scale without training/higher-ed capacity build",
            },
            "NOT_SUITABLE_WITHOUT_NET_FISCAL_PROOF": {
                "ids": ["EI-RETIREMENT-MIGRATION"],
                "verdict": "Migration is not automatically External Income public cash",
            },
        },
        "headline_answers": {
            "countable_toward_723b_usd": 0,
            "largest_bound_outside_demand_usd": ANCHORS["tourism_visitor_spending_2025_usd"],
            "largest_bound_outside_demand_label": "2025 visitor spending",
            "reading": (
                "Arkansas already pulls material outside dollars (e.g. ~$10.2B visitor spend). "
                "That does not retire taxes. Capture requires ownership, processing, participation, "
                "and public-return mechanisms. Manufacturing (~$25.9B GDP) and ag GDP envelopes show "
                "scale with high leakage risk if ownership stays external. COUNTABLE NOW remains $0. "
                "External Income is the swing variable for Prosperity Fund Accelerated paths and for "
                "any realistic path toward the ~$7.23B stack."
            ),
        },
        "counted_toward_prosperity_replacement_usd": 0,
        "replacement_target_usd": COMBINED,
        "iit_gross_fy2026_usd": IIT,
        "next_slice": "CC-ARKANSAS-PUBLIC-INCOME-REPLACEMENT-STACK-1.0",
        "next_slice_aliases": [
            "CC-ARKANSAS-PUBLIC-INCOME-ENGINES-INTEGRATED-STRESS-TEST-1.0",
            "CC-ARKANSAS-PUBLIC-INCOME-REPLACEMENT-STACK-1.0",
        ],
        "integration_stack_will_include": [
            "countable_current_revenue",
            "plausible_near_term_revenue",
            "4_year",
            "8_year",
            "12_year",
            "16_year_ranges",
            "stress_case",
            "optimistic_case",
            "tax_retirement_thresholds",
            "ten_engines_plus_effective_residual_wealth_base",
        ],
        "holds": [
            "overall_percent_held_at_43",
            "KEEP_AS_HYPOTHESIS",
            "no_abolish_today",
            "external_income_not_automatically_public_revenue",
            "zero_counted_until_cashflow_model",
            "illustrative_eicr_not_baseline",
            "no_discriminatory_export_tax",
            "defense_is_federal_ledger",
            "hyp130_capacity_gates_external_income",
            "gross_outside_revenue_ne_arkansas_capture",
        ],
    }

    path = OUT / "external_income_sector_capture_ledger.json"
    path.write_text(json.dumps(out, indent=2) + "\n", encoding="utf-8")
    print(
        json.dumps(
            {
                "path": str(path),
                "sectors": len(sectors),
                "countable": 0,
                "tourism_spend_b": ANCHORS["tourism_visitor_spending_2025_usd"] / 1e9,
                "mfg_gdp_b": ANCHORS["manufacturing_gdp_2023_current_usd"] / 1e9,
                "top3": [r["sector_id"] for r in out["sector_ranking_by_capture_priority"][:3]],
                "next": out["next_slice"],
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
