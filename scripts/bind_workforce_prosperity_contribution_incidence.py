#!/usr/bin/env python3
"""Workforce Prosperity Contribution incidence ledger (HYP-131 Human-capital engine).

Fail-closed: COUNTABLE NOW stays $0 until Arkansas-specific incidence, credit leakage,
legal design, and small-business protection gates clear. Illustrative yields are NOT
replacement dollars.
"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "imports" / "arkansas-revenue-replacement"
OUT.mkdir(parents=True, exist_ok=True)

SLICE = "CC-ARKANSAS-WORKFORCE-PROSPERITY-CONTRIBUTION-INCIDENCE-1.0"
DEC, UPD = "CC-DEC-130", "UPD-143"
COMBINED_TARGET = 7_231_905_638
IIT_GROSS = 3_859_100_000

# Bound anchors
CIT_GROSS_FY2026 = 523_600_000
CIT_NET_FY2026 = 453_800_000
CIT_TOP_RATE = 0.043  # DFA / Act 4 2nd Ext. Sess. 2024 — income > $11,000

QCEW_YEAR = 2024
QCEW_PRIVATE_ESTABS = 99_464
QCEW_PRIVATE_EMPL = 1_097_701
QCEW_PRIVATE_WAGES = 64_458_593_075
QCEW_AVG_ANNUAL_PAY = 58_721
QCEW_SOURCE = "https://data.bls.gov/cew/data/api/2024/a/area/05000.csv"

# FRED / BLS Industry Productivity — private nonfarm labor compensation ($ millions)
COMP_2024_M = 86_042.723
COMP_2025_M = 91_021.406
COMP_SERIES = "IPUZNL020050000"

# FRED ARNGSP — Arkansas GDP ($ millions)
GDP_2024_M = 188_339.6
GDP_2025_M = 198_422.0
GDP_SERIES = "ARNGSP"

COMP_2024 = int(round(COMP_2024_M * 1_000_000))
COMP_2025 = int(round(COMP_2025_M * 1_000_000))
GDP_2024 = int(round(GDP_2024_M * 1_000_000))
GDP_2025 = int(round(GDP_2025_M * 1_000_000))


def incidence(**kwargs):
    required = [
        "statutory_payer",
        "likely_economic_payer",
        "worker_effect",
        "consumer_price_effect",
        "investment_effect",
        "small_business_effect",
        "competitiveness_effect",
        "revenue_stability",
        "incidence_confidence",
    ]
    for r in required:
        if r not in kwargs:
            raise KeyError(r)
    return kwargs


def base_row(**kwargs):
    required = [
        "id",
        "name",
        "base_definition",
        "bound_scale",
        "illustrative_rates",
        "illustrative_gross_yields_usd",
        "already_spent_overlap",
        "incidence",
        "small_family_protection",
        "credit_interaction",
        "legal_status",
        "truly_incremental_recurring_usd_countable",
        "bucket",
        "notes",
    ]
    for r in required:
        if r not in kwargs:
            raise KeyError(r)
    return kwargs


def main() -> None:
    # Illustrative gross yields (NOT counted) — show scale envelopes before credits/incidence
    payroll_05 = int(round(QCEW_PRIVATE_WAGES * 0.005))
    payroll_10 = int(round(QCEW_PRIVATE_WAGES * 0.01))
    payroll_15 = int(round(QCEW_PRIVATE_WAGES * 0.015))
    per_emp_250 = QCEW_PRIVATE_EMPL * 250
    per_emp_500 = QCEW_PRIVATE_EMPL * 500
    per_emp_1000 = QCEW_PRIVATE_EMPL * 1000
    va_025 = int(round(GDP_2024 * 0.0025))  # GDP envelope — not true private VA
    va_05 = int(round(GDP_2024 * 0.005))
    comp_05 = int(round(COMP_2024 * 0.005))
    # Implied CIT taxable income envelope if entire CIT were at top rate (illustrative only)
    implied_cit_base = int(round(CIT_GROSS_FY2026 / CIT_TOP_RATE))
    profits_plus_1pt = int(round(implied_cit_base * 0.01))  # +1pp on same implied base
    profits_plus_2pt = int(round(implied_cit_base * 0.02))

    bases = [
        base_row(
            id="WPC-BASE-PAYROLL",
            name="Payroll base (QCEW private total annual wages)",
            base_definition="Employer contribution as % of Arkansas-covered private wages (UI/QCEW concept)",
            bound_scale={
                "status": "BOUND",
                "year": QCEW_YEAR,
                "private_establishments": QCEW_PRIVATE_ESTABS,
                "private_employment": QCEW_PRIVATE_EMPL,
                "private_total_annual_wages_usd": QCEW_PRIVATE_WAGES,
                "avg_annual_pay_usd": QCEW_AVG_ANNUAL_PAY,
                "source": QCEW_SOURCE,
                "supplemental_compensation_2024_usd": COMP_2024,
                "supplemental_compensation_series": COMP_SERIES,
                "note": "Compensation series > wages because it includes supplements (benefits, legally required).",
            },
            illustrative_rates=["0.5%", "1.0%", "1.5% of QCEW private wages"],
            illustrative_gross_yields_usd={
                "at_0_5_percent": payroll_05,
                "at_1_0_percent": payroll_10,
                "at_1_5_percent": payroll_15,
                "status": "ILLUSTRATIVE_NOT_COUNTED — before credits, thresholds, behavioral response",
            },
            already_spent_overlap="Distinct from CIT, but wage costs already embed existing payroll taxes (FICA, UI, workers' comp). WPC would be additive unless CIT is redesigned/credited against it.",
            incidence=incidence(
                statutory_payer="Employers with Arkansas covered payroll (after thresholds)",
                likely_economic_payer="SUBSTANTIAL SHARE ON WORKERS via lower wages/slower raises over time; remainder on owners/consumers depending on labor-market power and product-market competition",
                worker_effect="HIGH RISK — classic payroll-tax incidence literature assigns much of the burden to labor; must not assume employers 'eat' the contribution",
                consumer_price_effect="MODERATE — some pass-through in local/non-tradable sectors",
                investment_effect="MODERATE — raises marginal cost of labor-intensive expansion",
                small_business_effect="HIGH if no threshold — ~99k establishments; most are small. Structural exemption required.",
                competitiveness_effect="MODERATE_TO_HIGH vs low-tax neighbors if rate material and base broad",
                revenue_stability="MODERATE_HIGH — wages more stable than profits; still cyclical",
                incidence_confidence="QUALITATIVE_LITERATURE — Arkansas-specific pass-through NEE",
            ),
            small_family_protection={
                "posture": "STRUCTURALLY_PROTECTED_BY_DEFAULT",
                "design": "Exempt below employee-count and/or payroll thresholds; phase-in; sole props/small LLCs out unless evidence requires inclusion",
                "size_class_payroll_share_status": "NEE — QCEW size-class bind not completed this slice",
            },
            credit_interaction="Payroll base pairs naturally with apprenticeship/tuition credits — but credits can zero out cash while still building capacity (gross ≠ net GR)",
            legal_status="NEW_STATUTE_REQUIRED — interaction with CIT, UI, and AEDC incentives LEGAL_PENDING",
            truly_incremental_recurring_usd_countable=0,
            bucket="PLAUSIBLE_BUT_INCIDENCE_AND_CREDIT_PENDING",
            notes="Largest clean addressable wage base bound this slice (~$64.5B). Scale envelope is real; incidence/credit gates block counting.",
        ),
        base_row(
            id="WPC-BASE-PROFITS",
            name="Profits / corporate taxable income base",
            base_definition="Surcharge or redesign layered on Arkansas corporate net taxable income (or replacement of CIT with WPC-profits form)",
            bound_scale={
                "status": "BOUND_COLLECTIONS_ONLY",
                "cit_gross_fy2026_usd": CIT_GROSS_FY2026,
                "cit_net_of_refunds_fy2026_usd": CIT_NET_FY2026,
                "cit_top_rate": CIT_TOP_RATE,
                "implied_taxable_income_if_flat_at_top_rate_usd": implied_cit_base,
                "note": "Implied base is an envelope from collections÷top rate — not a DFA taxable-income bind. Pass-through entities and credits make true base harder.",
            },
            illustrative_rates=["+1 percentage point", "+2 percentage points on implied CIT base"],
            illustrative_gross_yields_usd={
                "plus_1pp_on_implied_base": profits_plus_1pt,
                "plus_2pp_on_implied_base": profits_plus_2pt,
                "existing_cit_gross_already_spent": CIT_GROSS_FY2026,
                "status": "ILLUSTRATIVE_NOT_COUNTED — CIT already funds GR; hike ≠ free capacity",
            },
            already_spent_overlap="YES — entire ~$524M CIT gross is already GR. Raising CIT is not incremental replacement capacity without spending cuts or net-new yield after behavioral response.",
            incidence=incidence(
                statutory_payer="C-corporations (and whatever entities statute includes)",
                likely_economic_payer="MIXED — more capital/shareholder in closed settings; mobile capital, markups, and monopsony can shift to workers/consumers",
                worker_effect="NONZERO RISK especially if firms have local labor monopsony or cut training/wages",
                consumer_price_effect="MODERATE in concentrated local markets",
                investment_effect="HIGH RISK for marginal investment / HQ location if rate rises without credit path",
                small_business_effect="LOWER if limited to C-corps above income thresholds — but many Arkansas employers are pass-throughs (would miss them)",
                competitiveness_effect="HIGH sensitivity — Arkansas already cut top CIT to 4.3%; further profit taxes fight site-selection narrative",
                revenue_stability="LOW_TO_MODERATE — profits more volatile than payroll (T2 weakness from prior T1–T5)",
                incidence_confidence="QUALITATIVE — entity composition and Arkansas pass-through share NEE",
            ),
            small_family_protection={
                "posture": "NATURALLY_NARROWER_IF_C_CORP_ONLY",
                "design": "Keep pass-through/family firms out unless using public workforce at corporate scale; do not recreate broad business tax on Main Street",
                "warning": "Narrow profits base may miss large pass-through employers that still depend on public human capital",
            },
            credit_interaction="Credit model can convert a profits surcharge into workforce investment — but then cash to Tax Retirement Fund falls",
            legal_status="CIT statute exists; WPC-profits redesign LEGAL_PENDING",
            truly_incremental_recurring_usd_countable=0,
            bucket="PLAUSIBLE_BUT_INCIDENCE_AND_CREDIT_PENDING",
            notes="Closest to 'just raise corporate tax' — philosophically weaker unless credits force workforce investment. Existing CIT already spent.",
        ),
        base_row(
            id="WPC-BASE-VALUE-ADDED",
            name="Value-added base (output − intermediate inputs)",
            base_definition="Arkansas value-added of in-scope employers (closer to GVA than profits or wages alone)",
            bound_scale={
                "status": "ENVELOPE_ONLY",
                "arkansas_gdp_2024_usd": GDP_2024,
                "arkansas_gdp_2025_usd": GDP_2025,
                "series": GDP_SERIES,
                "private_value_added_status": "NEE — need BEA GDP-by-state private industries table",
                "note": "Using total GDP as ceiling only; government/output mix means private VA < GDP.",
            },
            illustrative_rates=["0.25% of GDP envelope", "0.50% of GDP envelope"],
            illustrative_gross_yields_usd={
                "at_0_25_percent_of_gdp_envelope": va_025,
                "at_0_50_percent_of_gdp_envelope": va_05,
                "status": "ILLUSTRATIVE_CEILING_NOT_COUNTED — true private VA base unbound",
            },
            already_spent_overlap="Would overlap economically with sales, CIT, and payroll costs; not a free new pie.",
            incidence=incidence(
                statutory_payer="In-scope businesses on Arkansas value added",
                likely_economic_payer="SUBSTANTIAL CONSUMER/WORKER SHARE — VAT-like taxes commonly forward-shifted",
                worker_effect="MODERATE_TO_HIGH via prices and labor demand",
                consumer_price_effect="HIGH RISK — can resemble a broad consumption tax unless strongly targeted",
                investment_effect="MODERATE — taxes capital+labor value creation",
                small_business_effect="HIGH without thresholds — compliance complexity alone is a Main Street tax",
                competitiveness_effect="MODERATE_TO_HIGH for tradable sectors",
                revenue_stability="MODERATE — broader than profits, still cyclical",
                incidence_confidence="QUALITATIVE — Arkansas VA base unbound",
            ),
            small_family_protection={
                "posture": "REQUIRES_STRONG_THRESHOLDS",
                "design": "High VA/payroll floor; simplified computation for mid-size; exclude micro firms",
            },
            credit_interaction="Credits can offset, but VA measurement + credit audit is administratively heavy",
            legal_status="NEW_STATUTE + ADMIN SYSTEM — LEGAL_AND_ADMIN_PENDING",
            truly_incremental_recurring_usd_countable=0,
            bucket="PLAUSIBLE_BUT_INCIDENCE_AND_CREDIT_PENDING",
            notes="Philosophically closer to taxing productive activity than pure profits — but consumer-incidence risk is the fatal gate without careful design.",
        ),
        base_row(
            id="WPC-BASE-EMPLOYEE-COUNT",
            name="Employee-count / headcount base",
            base_definition="Fixed annual contribution per Arkansas employee (or FTE) above threshold",
            bound_scale={
                "status": "BOUND",
                "year": QCEW_YEAR,
                "private_employment": QCEW_PRIVATE_EMPL,
                "source": QCEW_SOURCE,
            },
            illustrative_rates=["$250 / employee", "$500 / employee", "$1,000 / employee"],
            illustrative_gross_yields_usd={
                "at_250_per_employee": per_emp_250,
                "at_500_per_employee": per_emp_500,
                "at_1000_per_employee": per_emp_1000,
                "status": "ILLUSTRATIVE_NOT_COUNTED — before thresholds/credits",
            },
            already_spent_overlap="New form unless replacing other business taxes; interacts with hiring incentives.",
            incidence=incidence(
                statutory_payer="Employers above headcount threshold",
                likely_economic_payer="Workers and firms — headcount taxes can suppress hiring, raise contractor use, or slow wage growth",
                worker_effect="HIGH RISK for hiring margins and contingent-work substitution",
                consumer_price_effect="MODERATE",
                investment_effect="MODERATE — penalizes labor-intensive models vs capital/automation",
                small_business_effect="PROTECTED if threshold high (e.g., 50/100/250 employees); HARMFUL if threshold low",
                competitiveness_effect="MODERATE",
                revenue_stability="MODERATE_HIGH — employment less volatile than profits",
                incidence_confidence="QUALITATIVE",
            ),
            small_family_protection={
                "posture": "THRESHOLD_IS_THE_PROTECTION",
                "design": "Hard floor (illustrative 100+ or 250+ employees) + phase-in; never per-head tax on micro firms",
            },
            credit_interaction="Per-head credits for apprentices/interns can neutralize anti-hiring bias if well designed",
            legal_status="NEW_STATUTE_REQUIRED",
            truly_incremental_recurring_usd_countable=0,
            bucket="PLAUSIBLE_BUT_INCIDENCE_AND_CREDIT_PENDING",
            notes="Simple admin, but blunt. Best only with high thresholds and strong apprentice credits.",
        ),
        base_row(
            id="WPC-BASE-HIGH-SKILL-DEMAND",
            name="High-skill workforce demand base",
            base_definition="Surcharge tied to employment/payroll in high-skill occupations or to H-1B/STEM/degree-intensive roles that most depend on public K-12→university pipelines",
            bound_scale={
                "status": "NEE",
                "need": "OES/ACS occupation×industry Arkansas tables + definition of high-skill bundle",
                "related_bound": {
                    "private_avg_annual_pay_usd": QCEW_AVG_ANNUAL_PAY,
                    "private_compensation_2024_usd": COMP_2024,
                },
            },
            illustrative_rates=["UNMODELED — no occupation base bound"],
            illustrative_gross_yields_usd={
                "status": "UNMODELED",
                "gross": None,
            },
            already_spent_overlap="Could complement CIT; targets dependence on public human capital more precisely.",
            incidence=incidence(
                statutory_payer="Employers of in-scope high-skill roles",
                likely_economic_payer="MIXED — may reduce skilled hiring, raise skilled wages (if supply constrained), or accelerate automation/remote hiring out of state",
                worker_effect="AMBIGUOUS — could fund training (gain) or suppress skilled headcount (loss)",
                consumer_price_effect="LOW_TO_MODERATE — concentrated in skill-intensive sectors",
                investment_effect="MODERATE — site selection for HQ/tech/advanced manufacturing sensitive",
                small_business_effect="LIKELY_LOWER if high-skill intensity correlates with larger firms — still need carveouts for clinics/small professional firms",
                competitiveness_effect="HIGH for talent-competitive sectors",
                revenue_stability="MODERATE — skill mix drifts; definition games likely",
                incidence_confidence="LOW — base unbound",
            ),
            small_family_protection={
                "posture": "DESIGN_CAREFULLY",
                "design": "Exclude small professional practices below payroll floor; focus on large corporate-scale skill demand",
            },
            credit_interaction="Strongest philosophical fit — credit for university partnerships, apprenticeships, rural training directly offsets high-skill dependence",
            legal_status="NEW_STATUTE + OCCUPATION DEFINITIONS — LEGAL_PENDING",
            truly_incremental_recurring_usd_countable=0,
            bucket="PLAUSIBLE_BUT_INCIDENCE_AND_CREDIT_PENDING",
            notes="Best philosophy match among pure bases, worst data readiness this slice.",
        ),
        base_row(
            id="WPC-BASE-COMBINATION",
            name="Combination base (payroll + profits or payroll + headcount threshold)",
            base_definition="Hybrid: e.g., payroll % above large-employer threshold with profits kicker, or dual-threshold (employees AND payroll)",
            bound_scale={
                "status": "COMPOSITE_OF_ABOVE",
                "components": ["WPC-BASE-PAYROLL", "WPC-BASE-PROFITS", "WPC-BASE-EMPLOYEE-COUNT"],
            },
            illustrative_rates=["Design-dependent — not selected this slice"],
            illustrative_gross_yields_usd={
                "status": "UNSELECTED — premature to pick a winner before incidence/credit model",
                "envelope_note": "Payroll 0.5–1.0% on full private wages spans ~$322M–$645M before thresholds/credits; large-employer subset would be materially smaller (size share NEE).",
            },
            already_spent_overlap="Depends whether CIT is credited/replaced; double-tax risk if stacked carelessly.",
            incidence=incidence(
                statutory_payer="Large employers meeting dual thresholds",
                likely_economic_payer="Still mixed — hybrid does not eliminate worker/consumer pass-through; it can reduce small-business hit",
                worker_effect="REMAINS MATERIAL unless credits expand training supply and wages",
                consumer_price_effect="MODERATE",
                investment_effect="MODERATE",
                small_business_effect="IMPROVED vs broad bases IF thresholds bind",
                competitiveness_effect="MODERATE — depends on net rate after credits",
                revenue_stability="MODERATE_HIGH if payroll-weighted",
                incidence_confidence="QUALITATIVE",
            ),
            small_family_protection={
                "posture": "PREFERRED_DIRECTION",
                "design": "Dual floor (employees + payroll) + phase-in + verified-credit pathway; target corporate scale that materially depends on Arkansas public human capital",
            },
            credit_interaction="Combination + credit model is the intended Constitutional Capitalism shape: contribute OR build verified capacity",
            legal_status="NEW_STATUTE_REQUIRED",
            truly_incremental_recurring_usd_countable=0,
            bucket="PLAUSIBLE_BUT_INCIDENCE_AND_CREDIT_PENDING",
            notes="Do not pick a single base yet. Combination + credits is the design hypothesis to stress-test next.",
        ),
    ]

    credit_model = {
        "id": "WPC-CREDIT-VERIFIED-CAPACITY",
        "logic": "Contribute cash to the shared workforce system OR directly build verified workforce capacity",
        "eligible_investments": [
            "registered apprenticeships",
            "CTE partnerships",
            "university / community-college partnerships",
            "rural training programs",
            "paid internships",
            "tuition support / student debt assistance tied to Arkansas work",
            "workforce infrastructure (labs, training centers)",
        ],
        "design_rules": [
            "Credits require third-party verification — no self-certified marketing spend",
            "Credit cannot exceed obligation without creating refundable cash sink unless statute intends grants",
            "Direct investment that builds capacity counts toward prosperity goals even when it reduces net GR cash",
            "Net Tax Retirement Fund dollars = max(0, gross liability − verified credits − admin) after behavioral response",
        ],
        "gross_vs_net": {
            "rule": "Gross illustrative yields are NOT countable replacement dollars",
            "credit_leakage_status": "UNMODELED",
            "warning": "A high-credit design can be philosophically correct and still produce little IIT-replacement cash",
        },
        "earmark": "K-12 → CTE → apprenticeships → community colleges → universities → strategic capacity",
        "bucket": "PLAUSIBLE_BUT_INCIDENCE_AND_CREDIT_PENDING",
        "truly_incremental_recurring_usd_countable": 0,
    }

    # Central question answer (honest)
    central_answer = {
        "question": "Can large employers materially finance Arkansas education and workforce capacity in a way that increases productive capability without simply shifting the cost back onto workers, consumers, or small businesses?",
        "answer_this_slice": "NOT_YET_DEMONSTRATED",
        "why": [
            "Addressable scale is real (private wages ~$64.5B; labor compensation ~$86B; GDP ~$188B) — Human-capital is not a tiny base.",
            "Existing CIT ~$524M is already spent GR and is not free WPC capacity.",
            "Payroll/headcount bases have high classical risk of worker incidence; VA base has high consumer-price risk; profits base is volatile and fights competitiveness narrative.",
            "Credit path is the philosophical core but makes net cash for tax retirement uncertain until leakage is modeled.",
            "Small/family businesses must stay structurally protected; large-employer size-class wage share still NEE.",
        ],
        "what_would_make_it_yes": [
            "Arkansas-specific incidence study (statutory→economic payer)",
            "QCEW/OES size-class and high-skill occupation binds",
            "Credit verification + leakage microsimulation",
            "Legal draft with dual thresholds and CIT interaction",
            "Stress test: recession employment drop; credit uptake 30/60/90%",
        ],
    }

    buckets = {
        "COUNTABLE_NOW": {
            "ids": [],
            "incremental_recurring_usd": 0,
            "verdict": "EMPTY — no base clears incidence + credit leakage + legal + stress gates as free incremental replacement dollars",
        },
        "PLAUSIBLE_BUT_INCIDENCE_AND_CREDIT_PENDING": {
            "ids": [b["id"] for b in bases] + [credit_model["id"]],
            "verdict": "All bases remain open for design; combination + verified-credit pathway is preferred hypothesis; none counted",
        },
        "NOT_MATERIAL_OR_NOT_SUITABLE": {
            "ids": [
                "RAISE_CIT_WITHOUT_WORKFORCE_CREDIT_PATH",
                "BROAD_HEADCOUNT_TAX_ON_SMALL_BUSINESS",
                "VA_BASE_WITHOUT_HOUSEHOLD_PROTECTION",
            ],
            "verdict": "Generic corporate-tax hike, Main-Street headcount tax, and unprotected VA/consumption-like designs fail the prosperity test even if they raise cash",
        },
    }

    unsuitable = [
        {
            "id": "RAISE_CIT_WITHOUT_WORKFORCE_CREDIT_PATH",
            "bucket": "NOT_MATERIAL_OR_NOT_SUITABLE",
            "why": "Just raising corporate tax is not the Human-capital engine — misses 'contribute OR build capacity' logic; existing CIT already spent",
        },
        {
            "id": "BROAD_HEADCOUNT_TAX_ON_SMALL_BUSINESS",
            "bucket": "NOT_MATERIAL_OR_NOT_SUITABLE",
            "why": "Violates small/family structural protection; high hiring distortion",
        },
        {
            "id": "VA_BASE_WITHOUT_HOUSEHOLD_PROTECTION",
            "bucket": "NOT_MATERIAL_OR_NOT_SUITABLE",
            "why": "Risks becoming a regressive consumption-like burden rename",
        },
    ]

    out = {
        "version": "1.0.0",
        "slice_id": SLICE,
        "generated_at": "2026-08-12",
        "decision_id": DEC,
        "update_id": UPD,
        "hypothesis_id": "CC-HYP-PROSPERITY-BASED-REVENUE-REPLACEMENT-SYSTEM",
        "incubator_alias": "HYP-131",
        "engine_id": "ENGINE-HUMAN-CAPITAL",
        "status": "INCIDENCE_PASS_ZERO_COUNTABLE",
        "central_question": central_answer["question"],
        "central_answer": central_answer,
        "design_logic": "Contribute to the shared workforce system OR directly build verified workforce capacity — not merely raise the corporate tax.",
        "count_rule": "COUNTABLE NOW stays $0 until a design survives brutal incidence mapping, credit leakage, small-business protection, legal authority, and stress testing as truly incremental reserved cash.",
        "replacement_target_usd": COMBINED_TARGET,
        "iit_gross_fy2026_usd": IIT_GROSS,
        "counted_toward_replacement_usd": 0,
        "bound_anchors": {
            "qcew_private_2024": {
                "establishments": QCEW_PRIVATE_ESTABS,
                "employment": QCEW_PRIVATE_EMPL,
                "total_annual_wages_usd": QCEW_PRIVATE_WAGES,
                "avg_annual_pay_usd": QCEW_AVG_ANNUAL_PAY,
                "source": QCEW_SOURCE,
            },
            "private_nonfarm_labor_compensation": {
                "usd_2024": COMP_2024,
                "usd_2025": COMP_2025,
                "series": COMP_SERIES,
                "source": "https://fred.stlouisfed.org/series/IPUZNL020050000",
            },
            "arkansas_gdp": {
                "usd_2024": GDP_2024,
                "usd_2025": GDP_2025,
                "series": GDP_SERIES,
                "source": "https://fred.stlouisfed.org/series/ARNGSP",
            },
            "corporate_income_tax_fy2026": {
                "gross_usd": CIT_GROSS_FY2026,
                "net_of_refunds_usd": CIT_NET_FY2026,
                "top_rate": CIT_TOP_RATE,
                "already_spent": True,
                "source": "data/imports/arkansas-revenue-replacement/fy2026_dfa_general_revenue_bind.json",
            },
            "illustrative_0_5pct_private_wages_usd": payroll_05,
            "illustrative_1_0pct_private_wages_usd": payroll_10,
            "note": "Illustrative yields show scale envelopes only — not recommended rates and not countable dollars.",
        },
        "bases_tested": bases,
        "credit_model": credit_model,
        "unsuitable_designs": unsuitable,
        "buckets": buckets,
        "scale_implication": {
            "human_capital_role": "Last large near-term recurring-cash concept before long-horizon Prosperity Fund compounding",
            "after_this_pass": "Still $0 countable — proceeds to Prosperity Fund capital path, then External Income, then integrate all 10 engines vs ~$7.23B",
            "honesty_rule": "If integrated engines cannot safely replace IIT/property, say so — taxes are earned into retirement, not assumed away",
        },
        "next_slice": "CC-ARKANSAS-PROSPERITY-FUND-CAPITAL-PATH-1.0",
        "sequence_lock": [
            "CC-ARKANSAS-WORKFORCE-PROSPERITY-CONTRIBUTION-INCIDENCE-1.0",
            "CC-ARKANSAS-PROSPERITY-FUND-CAPITAL-PATH-1.0",
            "CC-ARKANSAS-EXTERNAL-INCOME-SECTOR-CAPTURE-1.0",
            "CC-ARKANSAS-PUBLIC-INCOME-ENGINES-INTEGRATED-STRESS-TEST-1.0",
        ],
        "holds": [
            "overall_percent_held_at_43",
            "KEEP_AS_HYPOTHESIS",
            "no_abolish_today",
            "zero_counted_until_cashflow_model",
            "illustrative_yield_is_not_countable",
            "small_family_business_protected_by_default",
            "existing_cit_already_spent",
        ],
    }

    path = OUT / "workforce_prosperity_contribution_incidence_ledger.json"
    path.write_text(json.dumps(out, indent=2) + "\n", encoding="utf-8")
    print(
        json.dumps(
            {
                "path": str(path),
                "countable_usd": 0,
                "qcew_wages_b": round(QCEW_PRIVATE_WAGES / 1e9, 3),
                "illustrative_1pct_wages_m": round(payroll_10 / 1e6, 1),
                "bases": [b["id"] for b in bases],
                "next": out["next_slice"],
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
