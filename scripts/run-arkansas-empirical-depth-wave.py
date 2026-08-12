#!/usr/bin/env python3
"""
CC-ARKANSAS-EMPIRICAL-DEPTH-WAVE-1.0
Census FTP repair (ACS5/CVAP), IPEDS CIP×institution×year, County×Year expansion,
Living Systems Explorer payload. Observation first; preserve prior provenance.
"""
from __future__ import annotations

import csv
import json
import re
import zipfile
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DL = ROOT / ".local" / "downloads" / "empirical-wave2"
DL1 = ROOT / ".local" / "downloads" / "empirical-wave"
PROJECT = ROOT / "data" / "project"
IMPORT = ROOT / "data" / "imports" / "arkansas-empirical-depth"
REPORTS = ROOT / "reports"

GENERATED_AT = "2026-08-12"
DECISION_ID = "CC-DEC-118"
UPDATE_ID = "UPD-131"
WAVE_SLICE = "CC-ARKANSAS-EMPIRICAL-DEPTH-WAVE-1.0"

COUNTIES = [
    {"fips": "05001", "name": "Arkansas County", "oe": "arkansas"},
    {"fips": "05073", "name": "Lafayette County", "oe": "lafayette"},
    {"fips": "05093", "name": "Mississippi County", "oe": "mississippi"},
    {"fips": "05107", "name": "Phillips County", "oe": "phillips"},
    {"fips": "05129", "name": "Searcy County", "oe": "searcy"},
    {"fips": "05141", "name": "Van Buren County", "oe": "van_buren"},
    {"fips": "05145", "name": "White County", "oe": "white"},
]
FIPS = {c["fips"] for c in COUNTIES}
NAME_TO_FIPS = {c["name"].replace(" County", "").lower(): c["fips"] for c in COUNTIES}
NAME_TO_FIPS.update({c["oe"]: c["fips"] for c in COUNTIES})

# Strategic CIP2 → workforce category (capacity taxonomy — not employment demand)
CIP2_WORKFORCE = {
    "01": "agriculture_food",
    "03": "agriculture_food",
    "11": "computer_ai_tech",
    "14": "engineering_advanced_mfg",
    "15": "engineering_advanced_mfg",
    "13": "education_human_services",
    "51": "healthcare",
    "60": "healthcare",
    "46": "trades_transport_logistics",
    "47": "trades_transport_logistics",
    "48": "trades_transport_logistics",
    "49": "trades_transport_logistics",
    "52": "business_management",
    "22": "public_law",
    "43": "public_law",
    "44": "education_human_services",
    "19": "education_human_services",
}

AWLEVEL_LABEL = {
    "3": "associates",
    "5": "bachelors",
    "7": "masters",
    "9": "doctors_research",
    "10": "doctors_professional",
    "1": "award_lt_1yr",
    "2": "award_1_2yr",
    "4": "postsec_certificate",
    "6": "postbac_certificate",
    "8": "postmasters_certificate",
    "17": "doctors_other",
    "18": "doctors_professional",
    "19": "doctors_research",
    "20": "doctors_other",
    "21": "certificate_lt_1yr",
}


def write_json(path: Path, obj) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(obj, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def obs(domain, metric, value, unit, definition, source_id, source_url, confidence, limitations, **extra):
    row = {
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
    row.update(extra)
    return row


def load_acs_table(year: str, table: str) -> dict[str, list[float]]:
    """GEO_ID -> list of numeric estimate fields (skip MOE pairs loosely)."""
    path = DL / "acs" / f"acsdt5y{year}-{table}.dat"
    out: dict[str, list[float]] = {}
    if not path.exists():
        return out
    for line in path.open(encoding="utf-8", errors="replace"):
        if not line.startswith("0500000US05"):
            continue
        parts = line.strip().split("|")
        geoid = parts[0]
        fips = geoid.replace("0500000US", "")
        if fips not in FIPS:
            continue
        vals = []
        for p in parts[1:]:
            try:
                vals.append(float(p) if p not in ("", ".") else None)
            except ValueError:
                vals.append(None)
        out[fips] = vals
    return out


def load_cvap() -> dict[str, dict]:
    path = DL / "cvap" / "extracted" / "County.csv"
    out = {}
    with path.open(encoding="latin-1", newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            geoid = row.get("geoid") or row.get("GEOID") or ""
            if not geoid.startswith("0500000US05"):
                continue
            fips = geoid.replace("0500000US", "")
            if fips not in FIPS:
                continue
            title = (row.get("lntitle") or row.get("LNTITLE") or "").strip()
            if title.lower() != "total":
                continue
            out[fips] = {
                "cvap": int(float(row["cvap_est"])),
                "vap_adult": int(float(row["adu_est"])),
                "citizen": int(float(row["cit_est"])),
                "total_pop_cvap_table": int(float(row["tot_est"])),
                "vintage": "2019-2023",
            }
    return out


def office_bucket(office: str) -> str | None:
    o = office.lower().strip()
    if o == "governor":
        return "gubernatorial_total_votes"
    if o.startswith("u.s. house") or o.startswith("u.s. congress") or o.startswith("us house") or "congress district" in o:
        return "us_house_total_votes"
    if o.startswith("state house") or o.startswith("state representative"):
        return "state_house_total_votes"
    if o.startswith("state senate") or o.startswith("state senator"):
        return "state_senate_total_votes"
    if o in ("u.s. senate", "us senate", "united states senate"):
        return "us_senate_total_votes"
    return None


def aggregate_openelections() -> dict[str, dict[str, dict[str, int]]]:
    """fips -> year -> metric -> votes"""
    out: dict[str, dict[str, dict[str, int]]] = defaultdict(lambda: defaultdict(lambda: defaultdict(int)))

    # 2018 statewide precinct
    p2018 = DL / "openelections" / "2018_general_precinct.csv"
    with p2018.open(encoding="utf-8", errors="replace", newline="") as f:
        for row in csv.DictReader(f):
            county = (row.get("county") or "").strip().lower()
            fips = NAME_TO_FIPS.get(county)
            if not fips:
                continue
            bucket = office_bucket(row.get("office") or "")
            if not bucket:
                continue
            try:
                votes = int(float(row.get("votes") or 0))
            except ValueError:
                continue
            out[fips]["2018"][bucket] += votes

    for year in ("2020", "2022"):
        for c in COUNTIES:
            path = DL / "openelections" / f"{year}_{c['oe']}.csv"
            if not path.exists() or path.stat().st_size < 100:
                continue
            with path.open(encoding="utf-8", errors="replace", newline="") as f:
                for row in csv.DictReader(f):
                    bucket = office_bucket(row.get("office") or "")
                    if not bucket:
                        continue
                    try:
                        votes = int(float(row.get("votes") or 0))
                    except ValueError:
                        continue
                    out[c["fips"]][year][bucket] += votes
    return out


def load_prior_layer() -> dict:
    return json.loads(
        (PROJECT / "arkansas_county_longitudinal_observation_layer.json").read_text(encoding="utf-8")
    )


def expand_longitudinal(prior: dict, cvap: dict, oe: dict) -> dict:
    # Index existing non-null metrics to avoid duplicate identical inserts
    layer = json.loads(json.dumps(prior))  # deep copy
    layer["version"] = "1.1.0"
    layer["slice_id"] = "CC-ARKANSAS-COUNTY-LONGITUDINAL-OBSERVATION-LAYER-1.1"
    layer["wave_slice_id"] = WAVE_SLICE
    layer["decision_id"] = DECISION_ID
    layer["update_id"] = UPDATE_ID
    layer["status"] = "LAYER_V1_1_ACS_CVAP_OPENELECTIONS"
    layer["generated_at"] = GENERATED_AT
    layer["method_wall"] = [
        "observation_first",
        "interpretation_second",
        "causation_only_after_modeling",
    ]
    layer["provenance_policy"] = (
        "Never silently overwrite prior observations. ACS5 joins are added alongside "
        "PEP/SAIPE series; prefer ACS for microdata-style SES joins where definitionally superior, "
        "but retain SAIPE/PEP with original source_id."
    )

    # Build lookup county->year->observations list
    county_map = {c["fips"]: c for c in layer["counties"]}

    def ensure_year(fips: str, year: str):
        c = county_map[fips]
        for yr in c["years"]:
            if yr["year"] == year:
                return yr
        yr = {"year": year, "observations": []}
        c["years"].append(yr)
        c["years"].sort(key=lambda x: x["year"])
        return yr

    def has_metric(yr, metric, source_id):
        return any(
            o.get("metric") == metric and o.get("source_id") == source_id and o.get("value") is not None
            for o in yr["observations"]
        )

    added = 0
    for year in ("2022", "2023"):
        income = load_acs_table(year, "b19013")
        poverty = load_acs_table(year, "b17001")
        labor = load_acs_table(year, "b23025")
        pop = load_acs_table(year, "b01003")
        for fips in FIPS:
            yr = ensure_year(fips, year)
            if fips in income and income[fips] and income[fips][0] is not None:
                if not has_metric(yr, "acs5_median_household_income", "CENSUS-ACS5-SF-B19013"):
                    yr["observations"].append(
                        obs(
                            "income",
                            "acs5_median_household_income",
                            int(income[fips][0]),
                            "usd",
                            "ACS 5-year median household income (B19013)",
                            "CENSUS-ACS5-SF-B19013",
                            f"https://www2.census.gov/programs-surveys/acs/summary_file/{year}/table-based-SF/data/5YRData/acsdt5y{year}-b19013.dat",
                            "verified_primary",
                            [
                                "5-year period estimate ending in stated year",
                                "Preserves parallel SAIPE median_household_income series",
                            ],
                            preferred_for_ses_microdata=True,
                            parallel_to="median_household_income",
                        )
                    )
                    added += 1
            if fips in poverty and len(poverty[fips]) >= 2 and poverty[fips][0] and poverty[fips][1] is not None:
                # B17001: E001 universe, E002 below poverty (estimates only; MOEs interleaved in some releases)
                # Table-based SF for B17001: typically estimate/moe pairs → E001, M001, E002, M002...
                ests = [v for i, v in enumerate(poverty[fips]) if i % 2 == 0 and v is not None]
                if len(ests) >= 2 and ests[0]:
                    rate = round(100.0 * ests[1] / ests[0], 1)
                    if not has_metric(yr, "acs5_poverty_rate_all_ages", "CENSUS-ACS5-SF-B17001"):
                        yr["observations"].append(
                            obs(
                                "poverty",
                                "acs5_poverty_count_all_ages",
                                int(ests[1]),
                                "persons",
                                "ACS 5-year persons below poverty (B17001)",
                                "CENSUS-ACS5-SF-B17001",
                                f"https://www2.census.gov/programs-surveys/acs/summary_file/{year}/table-based-SF/data/5YRData/acsdt5y{year}-b17001.dat",
                                "verified_primary",
                                ["Parallel to SAIPE poverty_count_all_ages"],
                                preferred_for_ses_microdata=True,
                            )
                        )
                        yr["observations"].append(
                            obs(
                                "poverty",
                                "acs5_poverty_rate_all_ages",
                                rate,
                                "percent",
                                "ACS 5-year poverty rate = below poverty / poverty universe (B17001)",
                                "CENSUS-ACS5-SF-B17001",
                                f"https://www2.census.gov/programs-surveys/acs/summary_file/{year}/table-based-SF/data/5YRData/acsdt5y{year}-b17001.dat",
                                "derived",
                                [
                                    "Parallel to SAIPE poverty_rate_all_ages; definitions differ — do not silently replace",
                                ],
                                preferred_for_ses_microdata=True,
                                parallel_to="poverty_rate_all_ages",
                            )
                        )
                        added += 2
            if fips in labor and labor[fips]:
                ests = [v for i, v in enumerate(labor[fips]) if i % 2 == 0 and v is not None]
                # B23025: total, in LF, civilian LF, employed, unemployed, armed forces, not in LF (approx)
                if len(ests) >= 5 and ests[2]:
                    unemp_rate = round(100.0 * ests[4] / ests[2], 1)
                    if not has_metric(yr, "acs5_unemployment_rate", "CENSUS-ACS5-SF-B23025"):
                        yr["observations"].append(
                            obs(
                                "employment",
                                "acs5_civilian_labor_force",
                                int(ests[2]),
                                "persons",
                                "ACS 5-year civilian labor force (B23025)",
                                "CENSUS-ACS5-SF-B23025",
                                f"https://www2.census.gov/programs-surveys/acs/summary_file/{year}/table-based-SF/data/5YRData/acsdt5y{year}-b23025.dat",
                                "verified_primary",
                                ["Not BLS LAUS; ACS period estimate"],
                            )
                        )
                        yr["observations"].append(
                            obs(
                                "employment",
                                "acs5_unemployed",
                                int(ests[4]),
                                "persons",
                                "ACS 5-year unemployed (B23025)",
                                "CENSUS-ACS5-SF-B23025",
                                f"https://www2.census.gov/programs-surveys/acs/summary_file/{year}/table-based-SF/data/5YRData/acsdt5y{year}-b23025.dat",
                                "verified_primary",
                                [],
                            )
                        )
                        yr["observations"].append(
                            obs(
                                "employment",
                                "acs5_unemployment_rate",
                                unemp_rate,
                                "percent",
                                "ACS 5-year unemployment rate = unemployed / civilian labor force",
                                "CENSUS-ACS5-SF-B23025",
                                f"https://www2.census.gov/programs-surveys/acs/summary_file/{year}/table-based-SF/data/5YRData/acsdt5y{year}-b23025.dat",
                                "derived",
                                ["Not interchangeable with BLS LAUS county rates"],
                            )
                        )
                        added += 3
            if fips in pop and pop[fips] and pop[fips][0] is not None:
                if not has_metric(yr, "acs5_population_total", "CENSUS-ACS5-SF-B01003"):
                    yr["observations"].append(
                        obs(
                            "population",
                            "acs5_population_total",
                            int(pop[fips][0]),
                            "persons",
                            "ACS 5-year total population (B01003)",
                            "CENSUS-ACS5-SF-B01003",
                            f"https://www2.census.gov/programs-surveys/acs/summary_file/{year}/table-based-SF/data/5YRData/acsdt5y{year}-b01003.dat",
                            "verified_primary",
                            ["Parallel to PEP population_total; do not overwrite PEP"],
                            parallel_to="population_total",
                        )
                    )
                    added += 1

    # CVAP / VAP — attach to 2023 (vintage 2019-2023)
    for fips, vals in cvap.items():
        yr = ensure_year(fips, "2023")
        if not has_metric(yr, "cvap_total", "CENSUS-CVAP-2019-2023"):
            yr["observations"].append(
                obs(
                    "civic",
                    "cvap_total",
                    vals["cvap"],
                    "persons",
                    "Citizen voting-age population (CVAP), ACS special tabulation Total",
                    "CENSUS-CVAP-2019-2023",
                    "https://www2.census.gov/programs-surveys/decennial/rdo/datasets/2023/2023-cvap/CVAP_2019-2023_ACS_csv_files.zip",
                    "verified_primary",
                    ["Period 2019–2023; race-detail available in source but Total used here"],
                )
            )
            yr["observations"].append(
                obs(
                    "civic",
                    "vap_adult_estimate",
                    vals["vap_adult"],
                    "persons",
                    "Adult (18+) estimate from CVAP County.csv adu_est",
                    "CENSUS-CVAP-2019-2023",
                    "https://www2.census.gov/programs-surveys/decennial/rdo/datasets/2023/2023-cvap/CVAP_2019-2023_ACS_csv_files.zip",
                    "verified_primary",
                    ["Not identical to ACS B01001 18+ sum; CVAP adult field"],
                )
            )
            added += 2

    # OpenElections midterm/office aggregates
    for fips, years in oe.items():
        for year, metrics in years.items():
            yr = ensure_year(fips, year)
            for metric, votes in metrics.items():
                if votes <= 0:
                    continue
                if not has_metric(yr, metric, "OPENELECTIONS-AR"):
                    yr["observations"].append(
                        obs(
                            "civic",
                            metric,
                            votes,
                            "votes",
                            f"County sum of precinct votes for {metric} (OpenElections AR)",
                            "OPENELECTIONS-AR",
                            "https://github.com/openelections/openelections-data-ar",
                            "verified_secondary",
                            [
                                "Secondary PDF→CSV compilation; SOS canvass cross-check still NEE",
                                "2022 Phillips County file missing in source repo",
                            ],
                        )
                    )
                    added += 1

    # Turnout of CVAP for presidential years when both present
    for fips, c in county_map.items():
        cvap_val = None
        for yr in c["years"]:
            for o in yr["observations"]:
                if o.get("metric") == "cvap_total" and o.get("value") is not None:
                    cvap_val = o["value"]
        if not cvap_val:
            continue
        for yr in c["years"]:
            if yr["year"] not in ("2016", "2020", "2024"):
                continue
            votes = next(
                (
                    o["value"]
                    for o in yr["observations"]
                    if o.get("metric") == "presidential_total_votes" and o.get("value") is not None
                ),
                None,
            )
            if votes is None:
                continue
            if not has_metric(yr, "presidential_turnout_of_cvap_percent", "DERIVED-PRES-CVAP"):
                # CVAP vintage is 2019-2023 — note year mismatch for 2016/2024
                yr["observations"].append(
                    obs(
                        "civic",
                        "presidential_turnout_of_cvap_percent",
                        round(100.0 * votes / cvap_val, 1),
                        "percent",
                        "Presidential total votes / CVAP Total (2019–2023 vintage) × 100",
                        "DERIVED-PRES-CVAP",
                        "https://www2.census.gov/programs-surveys/decennial/rdo/datasets/2023/2023-cvap/CVAP_2019-2023_ACS_csv_files.zip",
                        "derived",
                        [
                            "CVAP denominator is 2019–2023 period — imperfect for 2016 and 2024",
                            "Not registered-voter turnout",
                            "Not official SOS turnout",
                        ],
                    )
                )
                added += 1

    # Update NEE slots / blockers
    layer["blockers"] = [
        {
            "id": "census_api_key_still_invalid",
            "detail": "api.census.gov key remains invalid; ACS5/CVAP bound via www2 FTP (no key).",
        },
        {
            "id": "registered_voters_county_nee",
            "detail": "County registered-voter series still NEE (SOS PDF / EAVS next).",
        },
        {
            "id": "openelections_2022_phillips_missing",
            "detail": "OpenElections 2022 Phillips County precinct file absent.",
        },
        {
            "id": "healthcare_banking_county_still_nee",
            "detail": "County HPSA and FDIC branch/deposit concentration still NEE.",
        },
    ]
    non_null = 0
    for c in layer["counties"]:
        for yr in c["years"]:
            non_null += sum(1 for o in yr["observations"] if o.get("value") is not None)
    layer["stats"] = {
        "county_count": len(layer["counties"]),
        "year_span": [
            min(y["year"] for c in layer["counties"] for y in c["years"]),
            max(y["year"] for c in layer["counties"] for y in c["years"]),
        ],
        "non_null_observations": non_null,
        "observations_added_this_wave": added,
    }
    layer["nee_domains"] = [
        "registered_voters",
        "healthcare_access_county",
        "banking_local_capital_county",
        "educational_capacity_county_district",
        "infrastructure_indicators",
        "wages_county",
    ]
    return layer


def build_ipeds_cip_bind() -> dict:
    hd_path = DL / "ipeds" / "hd" / "HD2023.csv"
    ar_inst = {}
    with hd_path.open(encoding="utf-8-sig", newline="") as f:
        for row in csv.DictReader(f):
            if (row.get("STABBR") or "").upper() != "AR":
                continue
            unitid = row["UNITID"]
            # HD2023 uses FIPS (state) + COUNTYCD when present; COUNTYCD may be absent in some vintages
            county_cd = row.get("COUNTYCD") or row.get("COUNTYFIPS")
            ar_inst[unitid] = {
                "unitid": unitid,
                "name": row.get("INSTNM"),
                "city": row.get("CITY"),
                "county_fips": str(county_cd).zfill(5) if county_cd else None,
                "sector": row.get("SECTOR"),
                "iclevel": row.get("ICLEVEL"),
            }

    catalog = json.loads((PROJECT / "arkansas_official_program_catalog.json").read_text(encoding="utf-8"))
    strategic_cips = set()
    for prog in catalog.get("programs", []):
        cip = str(prog.get("cip_code") or "").strip()
        if cip:
            strategic_cips.add(cip)
            strategic_cips.add(cip.split(".")[0].zfill(2) if "." in cip else cip[:2])

    # Also include all CIP2 in CIP2_WORKFORCE for AR completions
    year_files = {
        "2021": DL / "ipeds" / "c2021" / "c2021_a_rv.csv",
        "2022": DL / "ipeds" / "c2022" / "c2022_a_rv.csv",
        "2023": DL / "ipeds" / "c2023" / "C2023_a_RV.csv",
    }
    # rows: institution × cip × award × year
    records = []
    by_family_year = defaultdict(lambda: defaultdict(int))
    by_inst_year = defaultdict(lambda: defaultdict(int))
    keystone = {
        "51.1201": "medicine_md",
        "51.0401": "dentistry_dds",
        "01.8001": "veterinary_dvm",
        "51.3801": "nursing_rn_bsn",
        "51.0904": "emergency_medical",
    }
    keystone_totals = defaultdict(lambda: defaultdict(int))

    for year, path in year_files.items():
        if not path.exists():
            # try non-rv
            alt = path.parent / path.name.replace("_rv", "").replace("_RV", "")
            path = alt if alt.exists() else path
        with path.open(encoding="utf-8-sig", newline="") as f:
            reader = csv.DictReader(f)
            for row in reader:
                unitid = row.get("UNITID")
                if unitid not in ar_inst:
                    continue
                if str(row.get("MAJORNUM") or "1") not in ("1", "1.0"):
                    continue  # first major only
                cip_raw = str(row.get("CIPCODE") or "").strip()
                if not cip_raw or cip_raw in ("99", "99.0000"):
                    continue
                # IPEDS stores CIP as float-like 51.1201 or 511201
                if "." in cip_raw:
                    cip = cip_raw
                else:
                    try:
                        n = int(float(cip_raw))
                        cip = f"{n // 10000}.{(n % 10000):04d}" if n >= 10000 else cip_raw
                    except ValueError:
                        cip = cip_raw
                cip2 = cip.split(".")[0].zfill(2)
                family = CIP2_WORKFORCE.get(cip2, "other")
                # Keep strategic families + keystones + catalog CIPs
                if family == "other" and cip not in strategic_cips and cip2 not in strategic_cips:
                    if cip not in keystone:
                        continue
                try:
                    total = int(float(row.get("CTOTALT") or 0))
                except ValueError:
                    total = 0
                if total <= 0:
                    continue
                aw = str(int(float(row.get("AWLEVEL")))) if row.get("AWLEVEL") not in (None, "") else "?"
                aw_label = AWLEVEL_LABEL.get(aw, f"awlevel_{aw}")
                family_out = keystone.get(cip, family)
                rec = {
                    "year": year,
                    "unitid": unitid,
                    "institution": ar_inst[unitid]["name"],
                    "cipcode": cip,
                    "cip2": cip2,
                    "workforce_category": family_out,
                    "award_level": aw_label,
                    "completions": total,
                    "layer": "educational_capacity",
                    "not": "employment_demand",
                }
                records.append(rec)
                by_family_year[family][year] += total
                by_inst_year[unitid][year] += total
                if cip in keystone:
                    keystone_totals[keystone[cip]][year] += total

    # Shortage signals: catalog existence vs low/zero IPEDS completions (capacity signal only)
    shortage_signals = []
    for kid, label in [
        ("51.1201", "medicine_md"),
        ("51.0401", "dentistry_dds"),
        ("01.8001", "veterinary_dvm"),
    ]:
        totals = keystone_totals.get(label, {})
        shortage_signals.append(
            {
                "cip": kid,
                "label": label,
                "ipeds_completions_by_year": dict(totals),
                "interpretation": "Educational capacity signal from completions — not employment demand proof",
                "status": "BOUND_CAPACITY_SIGNAL" if sum(totals.values()) else "NEE_OR_ZERO_COMPLETIONS",
            }
        )

    # Top CIP rows for explorer (compress)
    records.sort(key=lambda r: (-r["completions"], r["year"], r["cipcode"]))
    top = records[:2500]

    return {
        "version": "1.0.0",
        "slice_id": "CC-ARKANSAS-CIP-INSTITUTION-YEAR-COMPLETER-BIND-1.0",
        "wave_slice_id": WAVE_SLICE,
        "generated_at": GENERATED_AT,
        "decision_id": DECISION_ID,
        "update_id": UPDATE_ID,
        "status": "PASSED_PARTIAL_IPEDS_COMPLETIONS_NOT_ENROLLMENT",
        "purpose": "Connect educational capacity (CIP×institution×year completions) to workforce category taxonomy without claiming employment demand.",
        "distinction": {
            "educational_capacity": "Programs available + completers produced (IPEDS Completions + ADHE catalog)",
            "employment_demand": "NEE — requires ADWS / BLS projections / employer signals; not inferred from CIP counts alone",
        },
        "sources": [
            {
                "id": "IPEDS-C2021-2023",
                "title": "IPEDS Completions C2021_A–C2023_A",
                "url": "https://nces.ed.gov/ipeds/datacenter/",
            },
            {
                "id": "IPEDS-HD2023",
                "title": "IPEDS Institutional Characteristics HD2023",
                "url": "https://nces.ed.gov/ipeds/datacenter/",
            },
            {
                "id": "ADHE-CATALOG",
                "title": "ADHE official program catalog (existence)",
                "path": "data/project/arkansas_official_program_catalog.json",
            },
            {
                "id": "ADHE-FACTBOOK-2025",
                "note": "Fact Book 2025-27 is institutional finance — no CIP enrollment tables; IPEDS used for CIP×year completions",
            },
        ],
        "arkansas_institutions_in_hd2023": len(ar_inst),
        "completion_rows_bound": len(top),
        "completion_rows_total_matched": len(records),
        "completions_by_workforce_category": {
            fam: dict(years) for fam, years in sorted(by_family_year.items())
        },
        "keystone_capacity_signals": shortage_signals,
        "still_nee": [
            "CIP-level enrollment (headcount) by institution×year",
            "Arkansas workforce demand projections join",
            "Geographic student origin / county-of-residence",
            "Seat capacity / cohort limits for professional programs",
        ],
        "records": top,
        "method_holds": [
            "Completions ≠ employment demand",
            "Catalog existence ≠ sufficient scale",
            "Observation first — no shortage legislation claim from this bind alone",
        ],
    }


def build_explorer_payload(layer: dict, cip: dict) -> dict:
    counties = []
    for c in layer["counties"]:
        timeline = []
        for yr in c["years"]:
            metrics = {}
            for o in yr["observations"]:
                if o.get("value") is None:
                    continue
                metrics[o["metric"]] = {
                    "value": o["value"],
                    "unit": o.get("unit"),
                    "source_id": o.get("source_id"),
                    "definition": o.get("definition"),
                }
            if metrics:
                timeline.append({"year": yr["year"], "metrics": metrics})
        counties.append(
            {
                "fips": c["fips"],
                "county": c["county"],
                "role": c.get("role"),
                "timeline": timeline,
            }
        )

    compare_metrics = [
        "population_total",
        "acs5_population_total",
        "poverty_rate_all_ages",
        "acs5_poverty_rate_all_ages",
        "median_household_income",
        "acs5_median_household_income",
        "farm_operations",
        "ag_product_sales_usd",
        "presidential_total_votes",
        "presidential_turnout_of_cvap_percent",
        "gubernatorial_total_votes",
        "us_house_total_votes",
        "state_house_total_votes",
        "state_senate_total_votes",
        "cvap_total",
        "acs5_unemployment_rate",
    ]

    return {
        "version": "1.0.0",
        "slice_id": "CC-ARKANSAS-COUNTY-LIVING-SYSTEMS-EXPLORER-1.0",
        "wave_slice_id": WAVE_SLICE,
        "generated_at": GENERATED_AT,
        "decision_id": DECISION_ID,
        "update_id": UPDATE_ID,
        "status": "INTERNAL_RESEARCH_SURFACE_V1",
        "not": [
            "public_scoreboard",
            "community_health_index",
            "causal_model",
            "locked_pilot_ranking",
        ],
        "method_wall": [
            "observation_first",
            "interpretation_second",
            "causation_only_after_modeling",
        ],
        "research_questions": [
            "What changed before civic participation changed?",
            "What changed before economic conditions changed?",
            "Which communities became more resilient despite similar economic pressures?",
            "Which interventions or institutional changes appear alongside positive movement?",
            "Where do apparently successful theories fail? (counterexamples)",
        ],
        "compare_metrics": compare_metrics,
        "counties": counties,
        "education_workforce_bridge": {
            "status": cip["status"],
            "completions_by_workforce_category": cip["completions_by_workforce_category"],
            "keystone_capacity_signals": cip["keystone_capacity_signals"],
            "distinction": cip["distinction"],
        },
        "candidates_not_locked": ["AR-GEO-ROSE-BUD", "AR-GEO-LEWISVILLE"],
        "source_layer": "data/project/arkansas_county_longitudinal_observation_layer.json",
    }


def build_wave(layer, cip, explorer) -> dict:
    return {
        "version": "1.0.0",
        "slice_id": WAVE_SLICE,
        "generated_at": GENERATED_AT,
        "status": "wave_executed_depth_partial",
        "module_id": "CC-MOD-ARKANSAS-EMPIRICAL-DEPTH-WAVE",
        "decision_id": DECISION_ID,
        "update_id": UPDATE_ID,
        "amends_decision": "CC-DEC-117",
        "signal": "Repair Census joins via FTP, bind CIP×institution×year completions, expand County×Year civic domains, ship internal Living Systems Explorer — observation first.",
        "method_wall": [
            "observation_first",
            "interpretation_second",
            "causation_only_after_modeling",
        ],
        "dependency_chain": [
            {
                "pass": 1,
                "id": "census_ftp_acs_cvap",
                "status": "PASSED_FTP_NO_API_KEY",
                "note": "api.census.gov key still invalid; www2 FTP used",
            },
            {
                "pass": 2,
                "id": "cip_institution_year_ipeds",
                "artifact": "data/project/arkansas_cip_institution_year_completer_bind.json",
                "status": cip["status"],
            },
            {
                "pass": 3,
                "id": "county_year_expansion",
                "artifact": "data/project/arkansas_county_longitudinal_observation_layer.json",
                "status": layer["status"],
                "non_null_observations": layer["stats"]["non_null_observations"],
                "added": layer["stats"]["observations_added_this_wave"],
            },
            {
                "pass": 4,
                "id": "living_systems_explorer",
                "artifact": "data/project/arkansas_county_living_systems_explorer.json",
                "status": explorer["status"],
                "board_path": "/county-living-systems/",
            },
        ],
        "completion_rule": {
            "overall_percent_held": 43,
            "dial_meaning": "Honesty hold — foundational longitudinal laboratory advances the project even while dial stays flat",
        },
        "holds": [
            "No locked pilot site",
            "No public score / Community Health Index",
            "Educational capacity ≠ employment demand",
            "Prior PEP/SAIPE provenance preserved alongside ACS",
            "43% dial hold ≠ failure to advance",
        ],
        "structural_active_unchanged": "CC-PHASE-2.1-BASELINE-DEFINITION-LOCKS-AND-NEXT-LEGITIMATE-FILLS-1.0",
        "return": "reports/CC_ARKANSAS_EMPIRICAL_DEPTH_WAVE_1_0_RETURN.md",
        "upd130_clarification": "UPD-130 County×Year layer remains foundational infrastructure; 43% is not a verdict of failure.",
    }


def write_return(wave, layer, cip, explorer) -> str:
    w = next(c for c in layer["counties"] if c["fips"] == "05145")
    l = next(c for c in layer["counties"] if c["fips"] == "05073")

    def grab(county, year, metric):
        for yr in county["years"]:
            if yr["year"] != year:
                continue
            for o in yr["observations"]:
                if o.get("metric") == metric and o.get("value") is not None:
                    return o["value"]
        return None

    return "\n".join(
        [
            "# CC-ARKANSAS-EMPIRICAL-DEPTH-WAVE-1.0 — Return",
            "",
            f"**Slice ID:** `{WAVE_SLICE}`  ",
            "**Status:** PASSED (partial depth)  ",
            f"**Date:** {GENERATED_AT}  ",
            f"**Decision:** `{DECISION_ID}`  ",
            f"**Update:** `{UPDATE_ID}`",
            "",
            "## Clarification carried from UPD-130",
            "",
            "Holding overall completion at **43%** is an honesty hold against cosmetic inflation — **not** evidence that empirical grounding failed. The County×Year layer is foundational infrastructure for HYP-128, living-system profiles, and later modeling.",
            "",
            "## Method wall",
            "",
            "**Observation first → interpretation second → causation only after modeling.**",
            "",
            "## Pass 1 — Census repair (FTP)",
            "",
            "- `api.census.gov` key still invalid; bound ACS5 (B01003/B19013/B17001/B23025) for 2022–2023 and CVAP 2019–2023 via www2 FTP.",
            "- PEP/SAIPE series **preserved** with original provenance; ACS metrics added in parallel (`acs5_*`).",
            "",
            "## Pass 2 — Education → workforce bridge",
            "",
            f"- IPEDS completions 2021–2023 for Arkansas institutions; **{cip['completion_rows_total_matched']}** CIP×institution×award rows matched (top {cip['completion_rows_bound']} retained).",
            "- Explicit distinction: **educational capacity ≠ employment demand** (demand still NEE).",
            "- ADHE Fact Book 2025 is institutional finance — no CIP enrollment tables; IPEDS used for CIP×year.",
            "",
            "## Pass 3 — County×Year expansion",
            "",
            f"- Non-null observations: **{layer['stats']['non_null_observations']}** (+{layer['stats']['observations_added_this_wave']} this wave).",
            "- Added gubernatorial / US House / state House / state Senate vote totals (OpenElections 2018/2020/2022 where present).",
            "- Added CVAP + derived presidential turnout-of-CVAP (with vintage mismatch limitations).",
            "- Still NEE: registered voters, county HPSA, county banking, wages, 2022 Phillips OE file.",
            "",
            "## Pass 4 — Living Systems Explorer",
            "",
            "- Internal board surface `/county-living-systems/` — **not a public score**.",
            "- Select county timelines; compare two counties; counterexamples privileged.",
            "",
            "### Snapshot (descriptive)",
            "",
            f"- White 2023 ACS poverty rate: {grab(w,'2023','acs5_poverty_rate_all_ages')} (SAIPE preserved: {grab(w,'2023','poverty_rate_all_ages')})",
            f"- Lafayette 2023 ACS poverty rate: {grab(l,'2023','acs5_poverty_rate_all_ages')} (SAIPE preserved: {grab(l,'2023','poverty_rate_all_ages')})",
            f"- White 2024 presidential turnout-of-CVAP: {grab(w,'2024','presidential_turnout_of_cvap_percent')}%",
            f"- Lafayette 2024 presidential turnout-of-CVAP: {grab(l,'2024','presidential_turnout_of_cvap_percent')}%",
            "",
            "## Holds",
            "",
            "- Overall dial **43%** (honesty hold)",
            "- Rose Bud / Lewisville **not locked**",
            "- No causal claims",
            "",
            "## Next",
            "",
            "1. SOS/EAVS registered-voter series",
            "2. ADWS workforce demand join to CIP capacity",
            "3. County HPSA + FDIC",
            "4. Field readiness — still no convenience lock",
            "",
        ]
    )


def main():
    print("loading prior layer / cvap / openelections / ipeds...")
    prior = load_prior_layer()
    cvap = load_cvap()
    oe = aggregate_openelections()
    print(f"cvap counties={len(cvap)} oe counties={len(oe)}")
    layer = expand_longitudinal(prior, cvap, oe)
    cip = build_ipeds_cip_bind()
    explorer = build_explorer_payload(layer, cip)
    wave = build_wave(layer, cip, explorer)
    ret = write_return(wave, layer, cip, explorer)

    write_json(PROJECT / "arkansas_county_longitudinal_observation_layer.json", layer)
    write_json(PROJECT / "arkansas_cip_institution_year_completer_bind.json", cip)
    write_json(PROJECT / "arkansas_county_living_systems_explorer.json", explorer)
    write_json(PROJECT / "arkansas_empirical_depth_wave.json", wave)
    (REPORTS / "CC_ARKANSAS_EMPIRICAL_DEPTH_WAVE_1_0_RETURN.md").write_text(ret, encoding="utf-8")

    IMPORT.mkdir(parents=True, exist_ok=True)
    write_json(
        IMPORT / "manifest.json",
        {
            "import_id": "arkansas-empirical-depth-1.0",
            "generated_at": GENERATED_AT,
            "decision_id": DECISION_ID,
            "contains_api_keys": False,
            "sources": ["Census ACS5 SF FTP", "Census CVAP zip", "OpenElections AR", "IPEDS C/HD"],
        },
    )
    write_json(IMPORT / "designated_county_cvap_2019_2023.json", {"rows": [
        {"fips": f, **v, "county": next(c["name"] for c in COUNTIES if c["fips"] == f)}
        for f, v in cvap.items()
    ]})

    print(
        json.dumps(
            {
                "layer_obs": layer["stats"]["non_null_observations"],
                "added": layer["stats"]["observations_added_this_wave"],
                "cip_rows": cip["completion_rows_total_matched"],
                "cvap": len(cvap),
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
