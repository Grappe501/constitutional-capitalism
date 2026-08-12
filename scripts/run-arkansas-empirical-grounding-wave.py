#!/usr/bin/env python3
"""
CC-ARKANSAS-EMPIRICAL-GROUNDING-WAVE-1.0
Build enrollment bind, pilot readiness checklist, turnout inventory,
and county longitudinal observation layer (correlation-first; no causal claims).
"""
from __future__ import annotations

import csv
import json
import re
from collections import defaultdict
from datetime import date
from pathlib import Path

import xlrd

ROOT = Path(__file__).resolve().parents[1]
DL = ROOT / ".local" / "downloads" / "empirical-wave"
IMPORT_DIR = ROOT / "data" / "imports" / "arkansas-empirical-grounding"
PROJECT = ROOT / "data" / "project"
REPORTS = ROOT / "reports"

GENERATED_AT = "2026-08-12"
DECISION_ID = "CC-DEC-117"
UPDATE_ID = "UPD-130"
WAVE_SLICE = "CC-ARKANSAS-EMPIRICAL-GROUNDING-WAVE-1.0"

COUNTIES = [
    {"fips": "05001", "name": "Arkansas County", "role": "commodity/export ag pair"},
    {"fips": "05073", "name": "Lafayette County", "role": "Lewisville surrounding; extreme rural contrast"},
    {"fips": "05093", "name": "Mississippi County", "role": "Delta ag/industry"},
    {"fips": "05107", "name": "Phillips County", "role": "West Helena / Delta distress context"},
    {"fips": "05129", "name": "Searcy County", "role": "extreme rural"},
    {"fips": "05141", "name": "Van Buren County", "role": "Clinton / family-livestock specialty"},
    {"fips": "05145", "name": "White County", "role": "Rose Bud surrounding county context"},
]
FIPS_SET = {c["fips"] for c in COUNTIES}
COUNTY_BY_FIPS = {c["fips"]: c for c in COUNTIES}

PUBLIC_4YR = [
    ("ASU", "Arkansas State University"),
    ("ATU", "Arkansas Tech University"),
    ("HSU", "Henderson State University"),
    ("SAUM", "Southern Arkansas University"),
    ("UAF", "University of Arkansas, Fayetteville"),
    ("UAFS", "University of Arkansas at Fort Smith"),
    ("UALR", "University of Arkansas at Little Rock"),
    ("UAM", "University of Arkansas at Monticello"),
    ("UAMS", "University of Arkansas for Medical Sciences"),
    ("UAPB", "University of Arkansas at Pine Bluff"),
    ("UCA", "University of Central Arkansas"),
]
PUBLIC_2YR = [
    ("ANC", "Arkansas Northeastern College"),
    ("ASUB", "ASU-Beebe"),
    ("ASUMH", "ASU-Mountain Home"),
    ("ASUMS", "ASU Mid-South"),
    ("ASUN", "ASU-Newport"),
    ("ASUTR", "ASU Three Rivers"),
    ("BRTC", "Black River Technical College"),
    ("CCCUA", "Cossatot Community College of the UA"),
    ("EACC", "East Arkansas Community College"),
    ("NAC", "North Arkansas College"),
    ("NPC", "National Park College"),
    ("NWACC", "Northwest Arkansas Community College"),
    ("OZC", "Ozarka College"),
    ("PCCUA", "Phillips Community College of the UA"),
    ("SAC", "South Arkansas College"),
    ("SAUT", "Southern Arkansas University Tech"),
    ("SEAC", "Southeast Arkansas College"),
    ("UACCB", "UA Community College at Batesville"),
    ("UACCHT", "UA Community College at Hope-Texarkana"),
    ("UACCM", "UA Community College at Morrilton"),
    ("UACCRM", "UA Community College at Rich Mountain"),
    ("UAPTC", "UA Pulaski Technical College"),
]


def write_json(path: Path, obj) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(obj, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def num(s: str) -> int:
    return int(str(s).replace(",", "").replace("%", "").strip())


def pct(s: str) -> float:
    return float(str(s).replace("%", "").strip())


def load_nass() -> dict[str, dict[str, dict[str, float | None]]]:
    """fips -> year -> metric -> value"""
    arrays = json.loads(
        (ROOT / "data/imports/reddirt-public-statistics/series-arrays.json").read_text(
            encoding="utf-8"
        )
    )
    out: dict[str, dict[str, dict[str, float | None]]] = defaultdict(
        lambda: defaultdict(dict)
    )
    wanted = {
        "FARM-OPERATIONS": "farm_operations",
        "ACRES-OPERATED": "acres_operated",
        "AG-PRODUCT-SALES": "ag_product_sales_usd",
        "CROP-SALES": "crop_sales_usd",
        "ANIMAL-PRODUCT-SALES": "animal_product_sales_usd",
    }
    for series in arrays["series"]:
        mid = series.get("consumer_metric_id", "")
        if not mid.startswith("CC-COUNTY-NASS-"):
            continue
        m = re.match(r"CC-COUNTY-NASS-(\d{5})-(.+)", mid)
        if not m:
            continue
        fips, key = m.group(1), m.group(2)
        if fips not in FIPS_SET or key not in wanted:
            continue
        field = wanted[key]
        for pt in series.get("points", []):
            if pt.get("value") is None:
                continue
            year = str(pt["period"])
            out[fips][year][field] = float(pt["value"])
    return out


def load_pep() -> dict[str, dict[str, int]]:
    """fips -> year -> population"""
    path = DL / "co-est2023-alldata.csv"
    out: dict[str, dict[str, int]] = defaultdict(dict)
    with path.open(encoding="latin-1", newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row["STATE"] != "05" or row["COUNTY"] == "000":
                continue
            fips = f"05{row['COUNTY'].zfill(3)}"
            if fips not in FIPS_SET:
                continue
            for y in (2020, 2021, 2022, 2023):
                key = f"POPESTIMATE{y}"
                if row.get(key):
                    out[fips][str(y)] = int(row[key])
    return out


def load_saipe() -> dict[str, dict[str, dict]]:
    """fips -> year -> {poverty_count, poverty_rate, median_hh_income}"""
    out: dict[str, dict[str, dict]] = defaultdict(dict)
    year_files = {
        "2016": "saipe_est16all.xls",
        "2018": "saipe_est18all.xls",
        "2020": "saipe_est20all.xls",
        "2021": "saipe_est21all.xls",
        "2022": "saipe_est22all.xls",
        "2023": "saipe_est23all.xls",
    }
    # Also accept est23all.xls downloaded earlier
    if (DL / "est23all.xls").exists() and not (DL / "saipe_est23all.xls").exists():
        year_files["2023"] = "est23all.xls"

    for year, fname in year_files.items():
        path = DL / fname
        if not path.exists():
            continue
        wb = xlrd.open_workbook(str(path))
        sh = wb.sheet_by_index(0)
        # Find header row with State FIPS
        start = 0
        for i in range(min(10, sh.nrows)):
            if "State FIPS" in str(sh.cell_value(i, 0)):
                start = i + 1
                break
        for i in range(start, sh.nrows):
            st = str(sh.cell_value(i, 0)).strip()
            if st.endswith(".0"):
                st = st[:-2]
            st = st.zfill(2) if st.isdigit() else st
            cty = str(sh.cell_value(i, 1)).strip()
            if cty.endswith(".0"):
                cty = cty[:-2]
            if not cty.isdigit():
                continue
            fips = f"{st}{int(cty):03d}"
            if fips not in FIPS_SET:
                continue
            # Columns per SAIPE layout:
            # 4 poverty estimate all ages, 7 poverty percent, 22 median HH income (varies slightly)
            # Standard estYYall: col4=pov est, col7=pov%, col21 or 22 = median HH income
            pov_est = sh.cell_value(i, 4)
            pov_pct = sh.cell_value(i, 7)
            # Find median income column by scanning header row
            mhi = None
            header_row = start - 1
            for c in range(sh.ncols):
                h = str(sh.cell_value(header_row, c)).lower()
                if "median household income" in h:
                    mhi = sh.cell_value(i, c)
                    break
            if mhi is None and sh.ncols > 22:
                mhi = sh.cell_value(i, 22)
            out[fips][year] = {
                "poverty_count_all_ages": int(float(pov_est)) if pov_est != "" else None,
                "poverty_rate_all_ages_percent": float(pov_pct) if pov_pct != "" else None,
                "median_household_income_usd": int(float(mhi))
                if mhi not in ("", None)
                else None,
            }
    return out


def load_presidential() -> dict[str, dict[str, dict]]:
    """fips -> year -> vote metrics"""
    out: dict[str, dict[str, dict]] = defaultdict(dict)
    files = {
        "2016": "2016_county_pres.csv",
        "2020": "2020_county_pres.csv",
        "2024": "2024_county_pres.csv",
    }
    for year, fname in files.items():
        path = DL / fname
        with path.open(encoding="utf-8", newline="") as f:
            reader = csv.DictReader(f)
            for row in reader:
                if "county_fips" in row and row["county_fips"]:
                    fips = str(row["county_fips"]).zfill(5)
                elif "combined_fips" in row and row["combined_fips"]:
                    fips = str(int(float(row["combined_fips"]))).zfill(5)
                else:
                    continue
                if fips not in FIPS_SET:
                    continue
                total = int(float(row["total_votes"]))
                gop = int(float(row["votes_gop"]))
                dem = int(float(row["votes_dem"]))
                # 2016 file stores per_gop as fraction already (0.xx); same for 2020/24
                out[fips][year] = {
                    "presidential_total_votes": total,
                    "presidential_votes_gop": gop,
                    "presidential_votes_dem": dem,
                    "presidential_share_gop": float(row["per_gop"]),
                    "presidential_share_dem": float(row["per_dem"]),
                }
    return out


def parse_enrollment_from_text() -> dict:
    enroll_pages = json.loads(
        (DL / "parsed" / "enrollment_pages.json").read_text(encoding="utf-8")
    )
    text_by_page = {p["page"]: p["text"] for p in enroll_pages}

    def parse_block(page_no: int, institutions: list[tuple[str, str]]) -> list[dict]:
        text = text_by_page[page_no]
        rows = []
        for code, name in institutions:
            # Pattern: CODE 13106 12863 ... with commas
            m = re.search(
                rf"^{re.escape(code)}\s+([\d,]+)\s+([\d,]+)\s+([\d,]+)\s+([\d,]+)\s+([\d,]+)\s+(-?[\d.]+)%\s+(-?[\d.]+)%",
                text,
                re.M,
            )
            if not m:
                continue
            years = {
                "2020": num(m.group(1)),
                "2021": num(m.group(2)),
                "2022": num(m.group(3)),
                "2023": num(m.group(4)),
                "2024": num(m.group(5)),
            }
            rows.append(
                {
                    "institution_code": code,
                    "institution_name": name,
                    "metric": "fall_term_unduplicated_headcount",
                    "series": years,
                    "change_from_fall_2023_percent": pct(m.group(6)),
                    "change_from_fall_2020_percent": pct(m.group(7)),
                }
            )
        return rows

    public_4yr = parse_block(6, PUBLIC_4YR)
    public_2yr = parse_block(9, PUBLIC_2YR)

    statewide = {
        "fall_2024_total_unduplicated_headcount_all_sectors": 155446,
        "fall_2024_vs_fall_2023_percent_change": 3.1,
        "fall_2019_pre_pandemic_headcount": 156066,
        "fall_2024_multi_institution_enrollees": 1495,
        "sector_share_approximate_fall_2024": {
            "public_4yr_percent": 62,
            "public_2yr_percent": 28,
            "private_independent_percent": 10,
            "nursing_schools_percent": "<1",
        },
        "notes": [
            "Statewide figures transcribed from ADHE Annual Enrollment Report (AHECB Jan 24, 2025).",
            "Institution tables are fall headcount trends, not CIP-level program enrollment.",
        ],
    }

    credentials = {
        "academic_year": "2025",
        "period": "2024-07-01 to 2025-06-30",
        "credentials_awarded": 56708,
        "unduplicated_students_receiving_credentials": 45307,
        "credentials_vs_prior_year_percent": 5.7,
        "students_vs_prior_year_percent": 5.3,
        "level_signals_from_narrative": [
            {
                "level": "certificate_of_proficiency",
                "signal": "continued upward trend; >22% increase in one year (incl. basic certificates <9 hours)",
                "status": "BOUND_NARRATIVE",
            },
            {
                "level": "technical_certificate",
                "signal": "+2.8% vs 2024; consistently above 6,000 for seven years",
                "status": "BOUND_NARRATIVE",
            },
            {
                "level": "associate",
                "signal": "2025 decline 4.4% after 2024 jump; ~53% general ed/studies; ~20% of statewide credentials",
                "status": "BOUND_NARRATIVE",
            },
            {
                "level": "bachelors",
                "signal": "16,813 in 2025 (+8% vs 2024); ~30% of statewide credentials",
                "status": "BOUND_COUNT",
            },
            {
                "level": "masters",
                "signal": "6,549 in 2025; ~12% of statewide total",
                "status": "BOUND_COUNT",
            },
            {
                "level": "professional_practice_doctoral",
                "signal": "+~12% in 2025; medicine/pharmacy/PT/OT/law/nursing practice; ~2% of statewide total",
                "status": "BOUND_NARRATIVE",
            },
        ],
        "source": {
            "title": "ADHE Annual Report on Credentials Awarded (2025)",
            "url": "https://adhe.edu/File/2025%20Annual%20Report%20on%20Credentials%20Awarded.pdf",
            "meeting": "AHECB October 24, 2025",
        },
    }

    return {
        "version": "1.0.0",
        "slice_id": "CC-ARKANSAS-STRATEGIC-CAPACITY-ENROLLMENT-COMPLETER-BIND-1.0",
        "wave_slice_id": WAVE_SLICE,
        "generated_at": GENERATED_AT,
        "decision_id": DECISION_ID,
        "update_id": UPDATE_ID,
        "status": "PASSED_PARTIAL_INSTITUTION_AND_STATEWIDE_NOT_CIP",
        "purpose": "Turn ADHE program existence into enrollment/completer evidence where authoritative reports allow — without inventing CIP capacity.",
        "sources": [
            {
                "id": "ADHE-ENROLL-2025",
                "title": "ADHE Annual Enrollment Report 2025",
                "url": "https://adhe.edu/File/2025%20Annual%20Enrollment%20Report.pdf",
                "parent_index": "https://adhe.edu/data-publications/2025-comprehensive-report",
                "retrieved": GENERATED_AT,
            },
            {
                "id": "ADHE-CRED-2025",
                "title": "ADHE Annual Report on Credentials Awarded 2025",
                "url": "https://adhe.edu/File/2025%20Annual%20Report%20on%20Credentials%20Awarded.pdf",
                "parent_index": "https://adhe.edu/data-publications/2025-comprehensive-report",
                "retrieved": GENERATED_AT,
            },
            {
                "id": "ADHE-FACTBOOK-2025-27",
                "title": "ADHE Fact Book 2025-27 Biennium",
                "url": "https://adhe.edu/File/10%20-%20Fact%20Book%202025-27%20Biennium.pdf",
                "status": "INVENTORIED_NOT_FULLY_PARSED",
                "note": "Large PDF inventoried; CIP×institution enrollment tables remain NEE for structured bind.",
            },
        ],
        "statewide_enrollment": statewide,
        "institution_fall_headcount": {
            "public_4yr": public_4yr,
            "public_2yr": public_2yr,
            "private_independent_nursing": {
                "status": "NEE_TABLE_OCR",
                "note": "PDF chart/table on page 14 did not yield clean machine-readable rows in this pass.",
            },
        },
        "statewide_credentials": credentials,
        "still_nee": [
            "CIP-level enrollment by institution",
            "CIP-level completers by credential",
            "Program seat capacity / cohort size for medicine, dentistry, veterinary, CTE magnets",
            "Geographic student origin / county of residence joins",
            "Structured comparison of program completers against Arkansas workforce demand projections",
        ],
        "workforce_demand_comparison": {
            "status": "NEE",
            "note": "Do not invent demand ratios. Next: bind ADWS / CTE / healthcare shortage projections to CIP completer series when available.",
        },
        "method_holds": [
            "Program existence ≠ sufficient scale",
            "Institution headcount ≠ strategic CIP capacity",
            "Narrative credential shares are not CIP microdata",
        ],
        "counts": {
            "public_4yr_institutions_bound": len(public_4yr),
            "public_2yr_institutions_bound": len(public_2yr),
        },
    }


def build_turnout_inventory(pres: dict) -> dict:
    sources = [
        {
            "id": "TONMCG-US-COUNTY-PRES-08-24",
            "name": "tonmcg US County Level Presidential Results 2008–2024",
            "url": "https://github.com/tonmcg/US_County_Level_Election_Results_08-24",
            "coverage": "Presidential county vote totals 2016/2020/2024 bound for designated AR counties",
            "status": "BOUND_FOR_DESIGNATED_COUNTIES",
            "definition": "votes_gop / votes_dem / total_votes — NOT official turnout rate (no registered-voter or VAP denominator in source)",
            "years_bound": ["2016", "2020", "2024"],
            "license_note": "Public GitHub compilation of official county canvass aggregates; treat as research-grade secondary until SOS canvass cross-check",
        },
        {
            "id": "AR-SOS-ELECTION-RESEARCH",
            "name": "Arkansas Secretary of State election research / canvass",
            "url": "https://www.sos.arkansas.gov/",
            "coverage": "Official canvass; needed for registered voters, midterms, locals, school board",
            "status": "INVENTORY_NEEDED_OFFICIAL_CROSSCHECK",
        },
        {
            "id": "MIT-ELECTION-DATA-LAB",
            "name": "MIT Election Data + Science Lab / Harvard Dataverse county returns",
            "coverage": "Longer historical presidential/county series; midterm possibilities",
            "status": "CANDIDATE_NOT_BOUND",
        },
        {
            "id": "ACS-VAP-CVAP",
            "name": "ACS / CVAP voting-age / citizen voting-age population",
            "coverage": "Denominator for turnout_of_VAP / turnout_of_CVAP",
            "status": "BLOCKED_INVALID_CENSUS_API_KEY",
            "note": "Environment CENSUS_API_KEY present but rejected as Invalid Key (2026-08-12). Refresh key before ACS county join.",
        },
    ]

    designated = []
    for c in COUNTIES:
        fips = c["fips"]
        years = []
        for y, vals in sorted(pres.get(fips, {}).items()):
            years.append({"year": y, **vals})
        # crude persistence: stdev of total votes / mean if 3 years
        totals = [x["presidential_total_votes"] for x in years]
        persistence = None
        if len(totals) >= 2:
            mean = sum(totals) / len(totals)
            var = sum((t - mean) ** 2 for t in totals) / len(totals)
            persistence = {
                "total_votes_mean": round(mean, 1),
                "total_votes_stdev": round(var**0.5, 1),
                "definition": "Descriptive dispersion of presidential total votes across bound years — not causal stability claim",
            }
        designated.append(
            {
                "fips": fips,
                "county": c["name"],
                "role": c["role"],
                "presidential_series": years,
                "descriptive_dispersion": persistence,
            }
        )

    return {
        "version": "1.0.0",
        "slice_id": "CC-ARKANSAS-COUNTY-TURNOUT-SOURCE-INVENTORY-1.0",
        "wave_slice_id": WAVE_SLICE,
        "generated_at": GENERATED_AT,
        "decision_id": DECISION_ID,
        "update_id": UPDATE_ID,
        "hypothesis_id": "CC-HYP-CIVIC-ENGAGEMENT-AND-COMMUNITY-STRUCTURE",
        "incubator_alias": "HYP-128",
        "status": "PASSED_PARTIAL_PRESIDENTIAL_VOTES_BOUND",
        "purpose": "Inventory Arkansas county participation sources and bind clean presidential vote totals for designated counties — descriptive co-travel with structure, not causal proof.",
        "method_wall": [
            "correlation_and_pattern_discovery_first",
            "causal_hypothesis_second",
            "intervention_third",
            "measurement_fourth",
            "replication_fifth",
        ],
        "not": [
            "official_turnout_rate_without_denominator",
            "claim_that_poverty_causes_turnout_or_vice_versa",
            "Community Health Index baseline metric",
            "locked_pilot_site",
        ],
        "sources": sources,
        "designated_counties": designated,
        "still_nee": [
            "Registered-voter turnout (votes / registered)",
            "VAP/CVAP turnout (votes / voting-age population)",
            "Midterm, primary, municipal, school-board, ballot-initiative series",
            "Official SOS canvass cross-check of tonmcg aggregates",
            "Persistence/volatility measures on comparable election types",
        ],
        "feeds": [
            "data/project/arkansas_county_longitudinal_observation_layer.json",
            "data/project/arkansas_hyp128_site_selection_model.json",
            "data/project/civic_engagement_community_structure_research.json",
        ],
    }


def build_pilot_readiness() -> dict:
    checklist_fields = [
        {"id": "institutional_partner", "question": "Named school district / college / Extension / hospital partner with contact?"},
        {"id": "available_facility", "question": "Usable facility identified (shop, lab, clinic, classroom, land)?"},
        {"id": "existing_authority", "question": "Pathway runnable under existing LEARNS/CTE/Perkins/WIOA authority without new statute?"},
        {"id": "funding_eligibility", "question": "Eligibility worksheet complete for at least one real funding stack?"},
        {"id": "workforce_apprenticeship_partner", "question": "Registered apprenticeship or workforce board partner engaged?"},
        {"id": "employer_union_participation", "question": "Employer and/or union participation letter or MOU interest?"},
        {"id": "community_participation", "question": "Documented community meeting / LCL participation — not invented?"},
        {"id": "student_pipeline", "question": "District CTE / concurrent enrollment pipeline quantified?"},
        {"id": "transportation", "question": "Student/worker transportation plan feasible for catchment?"},
        {"id": "governance", "question": "Local governance body for pilot measurement and accountability named?"},
        {"id": "measurable_baseline", "question": "Pre-registered outcomes + county longitudinal baseline attached?"},
        {"id": "expansion_criteria", "question": "Pre-registered expansion / stop / revise criteria written?"},
    ]

    def candidate(geo_id, community, county, fips, role, notes):
        items = []
        for field in checklist_fields:
            status = "NOT_STARTED"
            detail = None
            if field["id"] == "measurable_baseline":
                status = "PARTIAL"
                detail = "County longitudinal layer + NASS + presidential votes + SAIPE/PEP bound; ACS VAP and district CTE still NEE"
            elif field["id"] == "existing_authority":
                status = "PARTIAL"
                detail = "LEARNS/CTE memo (CC-DEC-116) supplies pathway authority map; geography-specific worksheet still NEE"
            elif field["id"] == "expansion_criteria":
                status = "PARTIAL"
                detail = "Experimental frame exists in HYP-128 site model; geography-specific criteria not locked"
            items.append({**field, "status": status, "detail": detail})
        return {
            "id": geo_id,
            "community": community,
            "county": county,
            "fips": fips,
            "role_hypothesis": role,
            "status": "investigative_candidate_not_locked",
            "checklist": items,
            "notes": notes,
        }

    return {
        "version": "1.0.0",
        "slice_id": "CC-ARKANSAS-PILOT-GEOGRAPHY-READINESS-CHECKLIST-1.0",
        "wave_slice_id": WAVE_SLICE,
        "generated_at": GENERATED_AT,
        "decision_id": DECISION_ID,
        "update_id": UPDATE_ID,
        "status": "SCHEMA_AND_CANDIDATE_SHELLS_V1",
        "purpose": "Operational readiness checklist for pilot geographies — investigative only; no site lock.",
        "locked_site": None,
        "checklist_fields": checklist_fields,
        "candidates": [
            candidate(
                "AR-GEO-ROSE-BUD",
                "Rose Bud",
                "White County",
                "05145",
                "education / agriculture / renewal complement engine",
                [
                    "Surrounding-county NASS + presidential votes + SAIPE/PEP now attachable via longitudinal layer.",
                    "District CTE readiness and partner MOUs remain field work.",
                ],
            ),
            candidate(
                "AR-GEO-LEWISVILLE",
                "Lewisville",
                "Lafayette County",
                "05073",
                "resource / wealth complement engine; matched contrast candidate vs White County",
                [
                    "Ag-structure contrast with White County remains usable for matched-comparison design.",
                    "Do not lock on checklist shells alone.",
                ],
            ),
        ],
        "scoring_rule": "Do not compute a total readiness score until institutional partner, facility, funding eligibility, and measurable baseline are each at least PARTIAL with provenance.",
        "feeds": [
            "data/project/arkansas_hyp128_site_selection_model.json",
            "data/project/arkansas_magnet_hub_intervention_packets.json",
            "data/project/living_community_laboratories.json",
        ],
    }


def obs(
    domain: str,
    metric: str,
    value,
    unit: str,
    definition: str,
    source_id: str,
    source_url: str,
    confidence: str,
    limitations: list[str],
):
    return {
        "domain": domain,
        "metric": metric,
        "value": value,
        "unit": unit,
        "definition": definition,
        "source_id": source_id,
        "source_url": source_url,
        "confidence": confidence,
        "limitations": limitations,
    }


def build_longitudinal(nass, pep, saipe, pres) -> dict:
    # Years spanning farm census + pep + saipe + presidential
    years = sorted(
        {
            *{y for f in nass.values() for y in f},
            *{y for f in pep.values() for y in f},
            *{y for f in saipe.values() for y in f},
            *{y for f in pres.values() for y in f},
        }
    )

    definitions = {
        "population": {
            "definition": "Census Bureau Vintage 2023 county population estimate (July 1)",
            "source_id": "CENSUS-PEP-CO-EST2023",
            "source_url": "https://www2.census.gov/programs-surveys/popest/datasets/2020-2023/counties/totals/co-est2023-alldata.csv",
        },
        "poverty_rate": {
            "definition": "SAIPE model-based poverty percent, all ages",
            "source_id": "CENSUS-SAIPE",
            "source_url": "https://www.census.gov/programs-surveys/saipe.html",
        },
        "median_household_income": {
            "definition": "SAIPE model-based median household income",
            "source_id": "CENSUS-SAIPE",
            "source_url": "https://www.census.gov/programs-surveys/saipe.html",
        },
        "farm_operations": {
            "definition": "USDA NASS Census of Agriculture farm operations count",
            "source_id": "USDA-NASS-COA",
            "source_url": "https://quickstats.nass.usda.gov/",
        },
        "presidential_total_votes": {
            "definition": "County presidential total votes (secondary compilation) — not turnout rate",
            "source_id": "TONMCG-US-COUNTY-PRES-08-24",
            "source_url": "https://github.com/tonmcg/US_County_Level_Election_Results_08-24",
        },
    }

    nee_slots = [
        "employment_rate",
        "wages",
        "healthcare_access_county",
        "banking_local_capital_county",
        "educational_capacity_county",
        "demographic_structure_detail",
        "infrastructure_indicators",
        "turnout_rate_registered",
        "turnout_rate_vap",
        "acs_detailed_income_poverty_moe",
    ]

    counties_out = []
    observation_count = 0
    for c in COUNTIES:
        fips = c["fips"]
        year_rows = []
        for year in years:
            observations = []
            if year in pep.get(fips, {}):
                observations.append(
                    obs(
                        "population",
                        "population_total",
                        pep[fips][year],
                        "persons",
                        definitions["population"]["definition"],
                        definitions["population"]["source_id"],
                        definitions["population"]["source_url"],
                        "verified_primary",
                        ["July 1 estimate; not ACS 5-year"],
                    )
                )
            if year in saipe.get(fips, {}):
                s = saipe[fips][year]
                if s.get("poverty_rate_all_ages_percent") is not None:
                    observations.append(
                        obs(
                            "poverty",
                            "poverty_rate_all_ages",
                            s["poverty_rate_all_ages_percent"],
                            "percent",
                            definitions["poverty_rate"]["definition"],
                            definitions["poverty_rate"]["source_id"],
                            definitions["poverty_rate"]["source_url"],
                            "verified_primary",
                            ["Model-based SAIPE; not ACS microdata"],
                        )
                    )
                if s.get("poverty_count_all_ages") is not None:
                    observations.append(
                        obs(
                            "poverty",
                            "poverty_count_all_ages",
                            s["poverty_count_all_ages"],
                            "persons",
                            "SAIPE poverty estimate, all ages",
                            definitions["poverty_rate"]["source_id"],
                            definitions["poverty_rate"]["source_url"],
                            "verified_primary",
                            ["Model-based SAIPE"],
                        )
                    )
                if s.get("median_household_income_usd") is not None:
                    observations.append(
                        obs(
                            "income",
                            "median_household_income",
                            s["median_household_income_usd"],
                            "usd",
                            definitions["median_household_income"]["definition"],
                            definitions["median_household_income"]["source_id"],
                            definitions["median_household_income"]["source_url"],
                            "verified_primary",
                            ["Model-based SAIPE"],
                        )
                    )
            if year in nass.get(fips, {}):
                for metric, val in nass[fips][year].items():
                    unit = "usd" if "usd" in metric or "sales" in metric else (
                        "acres" if "acres" in metric else "operations"
                    )
                    observations.append(
                        obs(
                            "agriculture",
                            metric,
                            val,
                            unit,
                            definitions["farm_operations"]["definition"]
                            if metric == "farm_operations"
                            else f"USDA NASS Census of Agriculture {metric}",
                            definitions["farm_operations"]["source_id"],
                            definitions["farm_operations"]["source_url"],
                            "verified_primary",
                            [
                                "Production concentration ≠ market power ≠ monopsony ≠ political capture",
                                "Disclosure suppressions may omit cells in source arrays",
                            ],
                        )
                    )
            if year in pres.get(fips, {}):
                p = pres[fips][year]
                observations.append(
                    obs(
                        "civic",
                        "presidential_total_votes",
                        p["presidential_total_votes"],
                        "votes",
                        definitions["presidential_total_votes"]["definition"],
                        definitions["presidential_total_votes"]["source_id"],
                        definitions["presidential_total_votes"]["source_url"],
                        "verified_secondary",
                        [
                            "Not turnout rate — missing registered/VAP denominator",
                            "Secondary compilation pending SOS canvass cross-check",
                        ],
                    )
                )
                observations.append(
                    obs(
                        "civic",
                        "presidential_share_gop",
                        p["presidential_share_gop"],
                        "share",
                        "GOP share of presidential total votes",
                        definitions["presidential_total_votes"]["source_id"],
                        definitions["presidential_total_votes"]["source_url"],
                        "verified_secondary",
                        ["Partisan share ≠ civic health"],
                    )
                )
                observations.append(
                    obs(
                        "civic",
                        "presidential_share_dem",
                        p["presidential_share_dem"],
                        "share",
                        "Democratic share of presidential total votes",
                        definitions["presidential_total_votes"]["source_id"],
                        definitions["presidential_total_votes"]["source_url"],
                        "verified_secondary",
                        ["Partisan share ≠ civic health"],
                    )
                )
                # Optional intensity proxy when population available nearby
                pop = pep.get(fips, {}).get(year) or pep.get(fips, {}).get(str(int(year) - 1 if False else year))
                # For presidential years, use nearest PEP year
                if pop is None:
                    for yy in (year, str(int(year) - 1), str(int(year) + 1), "2023", "2020"):
                        if yy in pep.get(fips, {}):
                            pop = pep[fips][yy]
                            break
                if pop:
                    observations.append(
                        obs(
                            "civic",
                            "presidential_votes_per_1000_population",
                            round(1000.0 * p["presidential_total_votes"] / pop, 2),
                            "votes_per_1000_persons",
                            f"Presidential total votes per 1,000 population (PEP {year if year in pep.get(fips,{}) else 'nearest'}); crude intensity proxy — NOT official turnout",
                            "DERIVED-PRES-PEP",
                            definitions["presidential_total_votes"]["source_url"],
                            "derived",
                            [
                                "NOT turnout rate",
                                "Population denominator is total persons, not VAP/CVAP/registered",
                                "Year alignment may use nearest PEP vintage",
                            ],
                        )
                    )

            # Explicit NEE placeholders only on anchor years to avoid noise
            if year in {"2016", "2018", "2020", "2022", "2023", "2024"}:
                for slot in (
                    "healthcare_access_county",
                    "banking_local_capital_county",
                    "educational_capacity_county",
                    "employment_unemployment_rate",
                    "turnout_rate_vap",
                ):
                    if not any(o["metric"] == slot for o in observations):
                        observations.append(
                            {
                                "domain": "nee",
                                "metric": slot,
                                "value": None,
                                "unit": None,
                                "definition": f"Slot reserved for {slot}",
                                "source_id": None,
                                "source_url": None,
                                "confidence": "NEE",
                                "limitations": ["Not invented; await authoritative county bind"],
                                "status": "NEE",
                            }
                        )

            if observations:
                observation_count += len(
                    [o for o in observations if o.get("value") is not None]
                )
                year_rows.append({"year": year, "observations": observations})

        counties_out.append(
            {
                "fips": fips,
                "county": c["name"],
                "geography_id": f"geo:us-ar-{fips}",
                "role": c["role"],
                "years": year_rows,
            }
        )

    return {
        "version": "1.0.0",
        "slice_id": "CC-ARKANSAS-COUNTY-LONGITUDINAL-OBSERVATION-LAYER-1.0",
        "wave_slice_id": WAVE_SLICE,
        "generated_at": GENERATED_AT,
        "decision_id": DECISION_ID,
        "update_id": UPDATE_ID,
        "status": "LAYER_V1_CORRELATION_FIRST",
        "purpose": "County × Year observation layer joining economic structure, institutional capacity signals, and civic participation for pattern discovery — not causal attribution.",
        "research_question": "What combinations of economic structure, institutional capacity, health access, educational opportunity, agricultural structure, and civic participation tend to coexist — and how do those combinations change over time?",
        "method_wall": [
            "correlation_and_pattern_discovery_first",
            "causal_hypothesis_second",
            "intervention_third",
            "measurement_fourth",
            "replication_fifth",
        ],
        "not": [
            "causal_model",
            "Community Health Index baseline",
            "proof_that_poverty_agriculture_healthcare_education_turnout_cause_one_another",
            "locked_pilot_site",
        ],
        "grain": {"entity": "county", "time": "year"},
        "counties": counties_out,
        "metric_definitions": definitions,
        "nee_domains": nee_slots,
        "blockers": [
            {
                "id": "invalid_census_api_key",
                "detail": "ACS5 county detail blocked: CENSUS_API_KEY rejected as Invalid Key on 2026-08-12. SAIPE+PEP used as interim structural joins.",
            },
            {
                "id": "bls_laus_download_blocked",
                "detail": "BLS LAUS county xlsx endpoints returned non-workbook payloads in this environment; employment left NEE.",
            },
        ],
        "provenance_note": "Every non-null observation carries source_id, source_url, definition, confidence, and limitations.",
        "stats": {
            "county_count": len(counties_out),
            "year_span": [years[0], years[-1]] if years else [],
            "non_null_observations": observation_count,
        },
        "feeds": [
            "HYP-128 site selection",
            "Rose Bud / Lewisville living-system profiles",
            "Future matched-comparison design",
        ],
        "reddirt_export_id": "exp_5da8b3fe67d94923",
    }


def build_wave(enroll, turnout, pilot, longi) -> dict:
    return {
        "version": "1.0.0",
        "slice_id": WAVE_SLICE,
        "generated_at": GENERATED_AT,
        "status": "wave_executed_empirical_partial_depth",
        "module_id": "CC-MOD-ARKANSAS-EMPIRICAL-GROUNDING-WAVE",
        "decision_id": DECISION_ID,
        "update_id": UPDATE_ID,
        "amends_decision": "CC-DEC-116",
        "signal": "Less architecture, more empirical grounding. Turn NEE capacity/feasibility gaps into evidence; build county longitudinal observation layer before causal claims.",
        "method_wall": [
            "correlation_and_pattern_discovery_first",
            "causal_hypothesis_second",
            "intervention_third",
            "measurement_fourth",
            "replication_fifth",
        ],
        "dependency_chain": [
            {
                "pass": 1,
                "id": "enrollment_completer_bind",
                "slice": enroll["slice_id"],
                "artifact": "data/project/arkansas_adhe_enrollment_completer_bind.json",
                "status": enroll["status"],
            },
            {
                "pass": 2,
                "id": "pilot_readiness_checklist",
                "slice": pilot["slice_id"],
                "artifact": "data/project/arkansas_pilot_geography_readiness_checklist.json",
                "status": pilot["status"],
            },
            {
                "pass": 3,
                "id": "county_turnout_acs_joins_longitudinal",
                "slices": [
                    turnout["slice_id"],
                    longi["slice_id"],
                ],
                "artifacts": [
                    "data/project/arkansas_county_turnout_source_inventory.json",
                    "data/project/arkansas_county_longitudinal_observation_layer.json",
                ],
                "status": "PASSED_PARTIAL_PRESIDENTIAL_PLUS_SAIPE_PEP_NASS",
            },
        ],
        "completion_rule": {
            "overall_percent_held": 43,
            "earning_path_beyond_43": "CIP completers + VAP turnout + district readiness + measured local pilots — not another theoretical track",
        },
        "holds": [
            "No new theoretical major track",
            "No locked pilot site",
            "No causal claims from co-travel maps",
            "Architecture freeze intact",
            "CC-CLAIM-003 remains NEE",
            "Remaining 24 compare systems = controlled backlog",
        ],
        "structural_active_unchanged": "CC-PHASE-2.1-BASELINE-DEFINITION-LOCKS-AND-NEXT-LEGITIMATE-FILLS-1.0",
        "return": "reports/CC_ARKANSAS_EMPIRICAL_GROUNDING_WAVE_1_0_RETURN.md",
        "stats": {
            "public_4yr_headcount_series": enroll["counts"]["public_4yr_institutions_bound"],
            "public_2yr_headcount_series": enroll["counts"]["public_2yr_institutions_bound"],
            "longitudinal_non_null_observations": longi["stats"]["non_null_observations"],
            "designated_counties": longi["stats"]["county_count"],
        },
    }


def write_return(wave, enroll, turnout, pilot, longi) -> str:
    rb = next(c for c in longi["counties"] if c["fips"] == "05145")
    lv = next(c for c in longi["counties"] if c["fips"] == "05073")

    def latest(county, metric):
        for yr in reversed(county["years"]):
            for o in yr["observations"]:
                if o["metric"] == metric and o.get("value") is not None:
                    return yr["year"], o["value"]
        return None, None

    lines = [
        "# CC-ARKANSAS-EMPIRICAL-GROUNDING-WAVE-1.0 — Return",
        "",
        f"**Slice ID:** `{WAVE_SLICE}`  ",
        "**Status:** PASSED (partial depth — evidence into NEE gaps)  ",
        f"**Date:** {GENERATED_AT}  ",
        f"**Decision:** `{DECISION_ID}`  ",
        f"**Update:** `{UPDATE_ID}`",
        "",
        "## Method wall (held)",
        "",
        "**correlation / pattern discovery → causal hypothesis → intervention → measurement → replication**",
        "",
        "This wave does **not** claim that poverty, agriculture, healthcare, education, and turnout cause one another. It builds a County×Year observation layer so combinations can be described over time.",
        "",
        "## Pass 1 — Enrollment / completer bind",
        "",
        f"- Bound fall headcount trends for **{enroll['counts']['public_4yr_institutions_bound']}** public 4-year and **{enroll['counts']['public_2yr_institutions_bound']}** public 2-year institutions (2020–2024).",
        "- Statewide fall 2024 unduplicated headcount: **155,446** (+3.1% vs 2023; still below fall 2019 156,066).",
        "- Statewide AY2025 credentials: **56,708** to **45,307** students.",
        "- Still NEE: CIP-level enrollment/completers, seat capacity for keystone programs, workforce-demand ratios.",
        "",
        "## Pass 2 — Pilot-readiness checklist",
        "",
        "- Schema locked for 12 readiness fields (partner → expansion criteria).",
        "- Rose Bud and Lewisville shells created as **investigative candidates — not locked**.",
        "- Partial credit only where LEARNS memo / longitudinal baseline already exist.",
        "",
        "## Pass 3 — County turnout + structural joins + longitudinal layer",
        "",
        "- Turnout source inventory completed; presidential county vote totals bound for designated set (2016/2020/2024).",
        "- ACS5 blocked by **Invalid Census API key**; interim joins via **PEP population** + **SAIPE poverty/income** + existing **NASS** farm structure.",
        f"- Longitudinal layer: **{longi['stats']['county_count']}** counties, year span {longi['stats']['year_span'][0]}–{longi['stats']['year_span'][1]}, **{longi['stats']['non_null_observations']}** non-null observations with provenance.",
        "",
        "### Living-system snapshot (descriptive only)",
        "",
    ]
    for label, county in (("Rose Bud / White", rb), ("Lewisville / Lafayette", lv)):
        y_pop, pop = latest(county, "population_total")
        y_pov, pov = latest(county, "poverty_rate_all_ages")
        y_votes, votes = latest(county, "presidential_total_votes")
        y_ops, ops = latest(county, "farm_operations")
        lines += [
            f"**{label} County (`{county['fips']}`)**",
            f"- Population ({y_pop}): {pop:,}" if pop else f"- Population: NEE",
            f"- Poverty rate ({y_pov}): {pov}%" if pov is not None else "- Poverty rate: NEE",
            f"- Presidential total votes ({y_votes}): {votes:,}" if votes else "- Presidential votes: NEE",
            f"- Farm operations ({y_ops}): {ops:,.0f}" if ops else "- Farm operations: NEE",
            "",
        ]

    lines += [
        "## Holds",
        "",
        "- Overall completion dial held at **43%**",
        "- No pilot site lock",
        "- No causal model promotion",
        "- Votes ≠ turnout rate until VAP/registered denominators bind",
        "",
        "## Next depth (earn beyond 43%)",
        "",
        "1. Refresh Census API key → ACS5/VAP county joins",
        "2. CIP completer microdata / Fact Book structured parse + workforce demand crosswalk",
        "3. Field-complete pilot readiness for one geography (still no political convenience lock)",
        "4. SOS canvass cross-check + midterm/local participation series",
        "",
    ]
    return "\n".join(lines)


def export_imports(pres, pep, saipe):
    IMPORT_DIR.mkdir(parents=True, exist_ok=True)
    # Slim designated presidential extract
    rows = []
    for fips, years in pres.items():
        for year, vals in years.items():
            rows.append({"fips": fips, "year": year, **vals, "county": COUNTY_BY_FIPS[fips]["name"]})
    write_json(IMPORT_DIR / "designated_county_presidential_votes.json", {
        "source": "tonmcg/US_County_Level_Election_Results_08-24",
        "retrieved": GENERATED_AT,
        "rows": sorted(rows, key=lambda r: (r["fips"], r["year"])),
    })
    write_json(IMPORT_DIR / "designated_county_pep_population.json", {
        "source": "Census PEP co-est2023-alldata",
        "retrieved": GENERATED_AT,
        "rows": [
            {"fips": f, "year": y, "population": v, "county": COUNTY_BY_FIPS[f]["name"]}
            for f, ys in pep.items() for y, v in ys.items()
        ],
    })
    write_json(IMPORT_DIR / "designated_county_saipe.json", {
        "source": "Census SAIPE estYYall.xls",
        "retrieved": GENERATED_AT,
        "rows": [
            {"fips": f, "year": y, **vals, "county": COUNTY_BY_FIPS[f]["name"]}
            for f, ys in saipe.items() for y, vals in ys.items()
        ],
    })
    write_json(IMPORT_DIR / "manifest.json", {
        "import_id": "arkansas-empirical-grounding-1.0",
        "generated_at": GENERATED_AT,
        "decision_id": DECISION_ID,
        "contains_api_keys": False,
        "notes": [
            "Secondary presidential compilation + primary PEP/SAIPE extracts for designated AR counties.",
            "ACS5 not included — Census API key invalid at pull time.",
        ],
    })


def main():
    assert (DL / "parsed" / "enrollment_pages.json").exists(), "Run ADHE PDF extract first"
    nass = load_nass()
    pep = load_pep()
    saipe = load_saipe()
    pres = load_presidential()

    enroll = parse_enrollment_from_text()
    turnout = build_turnout_inventory(pres)
    pilot = build_pilot_readiness()
    longi = build_longitudinal(nass, pep, saipe, pres)
    wave = build_wave(enroll, turnout, pilot, longi)
    ret = write_return(wave, enroll, turnout, pilot, longi)

    write_json(PROJECT / "arkansas_adhe_enrollment_completer_bind.json", enroll)
    write_json(PROJECT / "arkansas_county_turnout_source_inventory.json", turnout)
    write_json(PROJECT / "arkansas_pilot_geography_readiness_checklist.json", pilot)
    write_json(PROJECT / "arkansas_county_longitudinal_observation_layer.json", longi)
    write_json(PROJECT / "arkansas_empirical_grounding_wave.json", wave)
    (REPORTS / "CC_ARKANSAS_EMPIRICAL_GROUNDING_WAVE_1_0_RETURN.md").write_text(
        ret, encoding="utf-8"
    )
    export_imports(pres, pep, saipe)

    print(
        json.dumps(
            {
                "wave": WAVE_SLICE,
                "enroll_4yr": enroll["counts"]["public_4yr_institutions_bound"],
                "enroll_2yr": enroll["counts"]["public_2yr_institutions_bound"],
                "longitudinal_obs": longi["stats"]["non_null_observations"],
                "saipe_counties": len(saipe),
                "pep_counties": len(pep),
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
