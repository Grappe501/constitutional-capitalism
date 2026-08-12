/**
 * CC-PUBLICATION-EVIDENCE-UPGRADE-PASS-5.0
 * Depth over panel count: attach sourced history/geography layers + energy endpoints panel.
 */
const fs = require("fs");

const panelsPath = "data/project/publication_evidence_panels.json";
const data = JSON.parse(fs.readFileSync(panelsPath, "utf8"));

const STACK =
  "claim → current observation → historical series → Arkansas/U.S. comparison → distribution/geography → qualification/counterevidence → provenance. Layers absent are listed below.";

function find(id) {
  const p = data.panels.find((x) => x.panel_id === id);
  if (!p) throw new Error("missing " + id);
  return p;
}

{
  const p = find("CC-EP-WAGES-PRODUCTIVITY-1");
  p.last_updated = {
    date: "2026-08-11",
    dataset_or_release:
      "national_baseline_metrics.json + reddirt-public-statistics exp_79f42d2fe71f4b69 + CC-SRC-003/004",
  };
  const nums = p.what_the_data_show.critical_numbers;
  if (!nums.some((n) => n.label.includes("CES AHE level"))) {
    nums.push(
      {
        label: "CES AHE level (nominal)",
        value: "$35.69",
        period: "2024-M12",
        geography: "US",
        source_id: "CC-SRC-219",
        note: "Supporting level from RedDirt import CES0500000003 — not the L01 growth dial.",
      },
      {
        label: "CPI-U index level",
        value: "315.605",
        period: "2024-M12",
        geography: "US",
        source_id: "CC-SRC-219",
        note: "Supporting deflator input CUUR0000SA0 — not a wage outcome.",
      }
    );
  }
  p.what_the_data_show.key_finding =
    "A small labor evidence system shows recent official dials (real AHE +1.1% to Dec 2025; productivity +2.3% in 2024; quits 2.1%) beside nominal CES/CPI levels and a longer BLS-documented productivity–compensation divergence since the 1970s, with EPI secondary endpoints for 1979–2020.";
  p.what_the_data_show.plain_english =
    "Readers should see current dials, supporting levels, historical endpoints, AR labor-market context where definitions permit, and explicit missing multi-year arrays — not treat 1.1% as the whole labor story.";
  p.evidence_system = {
    reader_stack: STACK,
    definition:
      "L01 = 12-month % change in real average hourly earnings (CES, CPI-U). L02 = annual % change in nonfarm-business labor productivity (BLS). L04 = JOLTS annual-average voluntary quits rate. CES AHE / CPI-U levels are supporting inputs, not substitute dials.",
    comparison: [
      {
        label: "Recent wage dial vs productivity dial",
        value: "1.1% vs 2.3%",
        note: "Different concepts/years — not a causal gap estimate.",
      },
      {
        label: "Voluntary quits rate (mobility proxy)",
        value: "2.1% (2024)",
        note: "Quits ≠ job-to-job flows; not Census J2J.",
      },
      {
        label: "Long-run productivity–compensation relationship",
        value: "co-movement then divergence (BLS)",
        note: "BLS Beyond the Numbers: rose together after the 1940s; diverged since the 1970s; industry lag documented 1987–2015 (CC-SRC-003).",
      },
    ],
    observation_history: [
      {
        period: "1979–2020",
        value: "net productivity +61.8% vs typical-worker pay +17.5%",
        label: "EPI secondary cumulative endpoints",
        geography: "US",
        source_id: "CC-SRC-004",
        note: "Secondary methodology — not a federal official series; magnitude contested.",
      },
      {
        period: "post-1970s / 1987–2015",
        value: "aggregate + industry compensation lag vs productivity",
        label: "BLS gap analysis span",
        geography: "US",
        source_id: "CC-SRC-003",
        note: "Primary staff analysis; older than current BLS releases.",
      },
      {
        period: "2024-M12",
        value: "CES AHE $35.69; CPI-U 315.605",
        label: "Supporting levels (imported)",
        geography: "US",
        note: "From reddirt-public-statistics; levels ≠ L01 % change.",
      },
      {
        period: "2025-12 vs 2024-12",
        value: "real AHE +1.1%",
        label: "Current L01 dial",
        geography: "US",
        source_id: "CC-SRC-219",
      },
    ],
    geography_contrast: [
      {
        label: "Unemployment rate (LAUS/CPS, 2024-M12)",
        value: "AR 3.7% vs US 4.1%",
        note: "Comparable labor-market context only — not an Arkansas real-AHE or productivity dial. Definitions differ from L01/L02.",
      },
    ],
    series_note:
      "Pass 5 attaches sourced historical endpoints + supporting CES/CPI levels + AR/US unemployment contrast. Full multi-year L01/L02/L04 point arrays remain demanded via RCIP (not inventable from single-period imports).",
    series_status: "partial_history_endpoints_attached",
    missing_layers: [
      "Multi-year real AHE OTY path (L01) — RCIP-DEM-0006 / PASS5-DEM-L01-SERIES",
      "Multi-decade NFB productivity annual path (L02) — PASS5-DEM-L02-SERIES",
      "JOLTS quits history from 2000 (L04) — PASS5-DEM-L04-SERIES",
      "Arkansas CES real AHE / state productivity analogues (definition lock required)",
      "Official post-2015 industry productivity–compensation update tables",
    ],
    qualification:
      "L01 is mean AHE of jobs, not median/typical-worker pay. EPI endpoints must stay labeled secondary. One-year dials do not close the post-1970s shared-gains debate.",
  };
}

{
  const p = find("CC-EP-OWNERSHIP-RETIREMENT-SYSTEM-1");
  p.last_updated = {
    date: "2026-08-11",
    dataset_or_release:
      "national_baseline_metrics.json + arkansas-baseline ACS5 2022 + CC-SRC-001/012",
  };
  p.what_the_data_show.key_finding =
    "Ownership/retirement evidence now includes SCF 2019→2022 history endpoints (real median +37%, real mean +23%), current concentration/participation dials, and an Arkansas ACS homeownership contrast — still not a multi-decade chart warehouse.";
  p.evidence_system = {
    reader_stack: STACK,
    definition:
      "W01 SCF median net worth; W02 DFA wealth shares; W04 homeownership rate; W05 share of families with retirement accounts (SCF). SCF and DFA are not interchangeable products.",
    comparison: [
      { label: "Median net worth (SCF 2022)", value: "$192,900" },
      {
        label: "Mean net worth (SCF 2022)",
        value: "$1,063,700",
        note: "Mean far above median — concentration predicate.",
      },
      { label: "Bottom 50% / top 1% wealth shares (DFA 2026-Q1)", value: "5.3% / 28.8%" },
      {
        label: "Families with retirement accounts",
        value: "54.3% (2022 SCF)",
        note: "Participation ≠ balance adequacy.",
      },
    ],
    observation_history: [
      {
        period: "2019→2022",
        value: "real median net worth +37%; real mean +23%",
        label: "SCF three-year episode",
        geography: "US",
        source_id: "CC-SRC-001",
        note: "Largest three-year median increase in modern SCF history; some narrowing while inequality remains high.",
      },
      {
        period: "1989–present (product span)",
        value: "DFA wealth-share product available",
        label: "Official DFA history",
        geography: "US",
        source_id: "CC-SRC-012",
        note: "In-repo attachment is 2026-Q1 snapshot only — quarterly path not attached.",
      },
      {
        period: "2022 SCF / 2026-Q1 DFA / 2023 ACS",
        value: "current ownership dials (W01/W02/W04/W05)",
        label: "Current observations",
        geography: "US",
      },
    ],
    geography_contrast: [
      {
        label: "Homeownership rate",
        value: "AR ACS5 66.2% (2022) vs US ACS 65.2% (2023)",
        note: "Different ACS products/years — geographic contrast only; do not treat as identical survey cells.",
      },
    ],
    series_note:
      "Pass 5 attaches the SCF 2019–2022 episode endpoints and AR/US homeownership contrast. Full SCF triennial table and DFA quarterly path remain demanded.",
    series_status: "partial_history_endpoints_attached",
    missing_layers: [
      "SCF triennial median/mean table 1989–2022 — RCIP-DEM-0001 / PASS5-DEM-SCF-HISTORY",
      "DFA wealth shares quarterly path 1989–present — PASS5-DEM-DFA-PATH",
      "W05 retirement ownership triennial path",
      "Employee-ownership wealth by percentile (L03 pending)",
      "State/local ownership maps",
    ],
    qualification:
      "Do not treat retirement-account ownership as proof of secure aging, or wealth concentration as proof of oligarchy. The 2019–2022 narrowing episode qualifies any ever-rising story.",
  };
}

{
  const p = find("CC-EP-FISCAL-REVENUE-SYSTEM-1");
  p.last_updated = {
    date: "2026-08-11",
    dataset_or_release:
      "national_baseline_metrics.json + CBO distributional/historical demand status",
  };
  p.what_the_data_show.key_finding =
    "Federal fiscal dials remain receipts 17.1% / outlays 23.4% / debt held by the public ~99% of GDP, with CBO 2021 household compression ~19×→~7×. Pass 5 makes the missing multi-decade budget-identity history and state/local tax modules explicit rather than inventing series.";
  p.evidence_system = {
    reader_stack: STACK,
    definition:
      "G01 = federal receipts % GDP (FY). G02 = federal outlays % GDP (FY). G03 = federal debt held by the public % GDP. All federal — not state/local tax capacity or property-tax modules.",
    comparison: [
      {
        label: "Receipts vs outlays (FY2024)",
        value: "17.1% vs 23.4% of GDP",
        note: "Gap is a fiscal identity, not a tax-incidence model.",
      },
      {
        label: "Debt held by the public",
        value: "~99% of GDP (2024)",
        note: "Outlook vintages revise; later vintages may show ~100% for 2025.",
      },
      {
        label: "CBO household distribution (2021)",
        value: "pre-tax ~19× → after transfers/taxes ~7× (Q5/Q1)",
        note: "Distributional fact for 2021; pandemic-year effects matter. Not a property-tax module.",
      },
    ],
    observation_history: [
      {
        period: "FY2024 / 2024",
        value: "receipts 17.1%; outlays 23.4%; debt ~99% GDP",
        label: "Current federal identities",
        geography: "US",
        source_id: "CC-SRC-241",
      },
      {
        period: "2021",
        value: "Q5/Q1 ~19× → ~7× after transfers/taxes",
        label: "CBO household distribution snapshot",
        geography: "US",
        source_id: "CC-SRC-013",
        note: "One-year distributional cut — not a long-run tax-composition series.",
      },
    ],
    geography_contrast: [
      {
        label: "State/local no-PIT / no-property-tax redesign modules",
        value: "NOT ATTACHED",
        note: "Federal identities cannot validate Arkansas or national prosperity-tax redesigns.",
      },
    ],
    series_note:
      "CBO Historical Budget Data and long-run average tax rates by income group are official. Pass 5 does not invent point arrays; it marks the history layer as demanded.",
    series_status: "official_series_available_not_attached",
    missing_layers: [
      "Federal receipts/outlays/debt % GDP multi-decade path — RCIP-DEM-0007 / PASS5-DEM-CBO-BUDGET-HISTORY",
      "CBO average federal tax rates by income group over time — PASS5-DEM-CBO-TAX-RATES",
      "Federal revenue composition (individual/corporate/payroll/excise) historical shares — PASS5-DEM-REV-COMPOSITION",
      "State/local tax capacity and property-tax modules (CC-CLAIM-017)",
      "Destination-based tax administration evidence (CC-CLAIM-008)",
    ],
    qualification:
      "These dials do not prove a no-personal-income-tax / no-property-tax redesign is feasible. Do not invent state revenue replacement paths.",
  };
}

{
  const p = find("CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1");
  p.last_updated = {
    date: "2026-08-11",
    dataset_or_release: "national_baseline + arkansas-baseline + BDS rates + CC-SRC-008/009",
  };
  const nums = p.what_the_data_show.critical_numbers;
  if (!nums.some((n) => n.label.includes("Establishment entry rate"))) {
    nums.push(
      {
        label: "Establishment entry rate (BDS)",
        value: "10.608%",
        period: "2023",
        geography: "US",
        metric_id: "CC-IND-B01",
        note: "National dynamics rate from RedDirt import — not a rural-only rate.",
      },
      {
        label: "Establishment exit rate (BDS)",
        value: "9.396%",
        period: "2023",
        geography: "US",
        metric_id: "CC-IND-B02",
        note: "National dynamics rate — not competitiveness or rural survival.",
      },
      {
        label: "Rural hospital closures/conversions",
        value: "146",
        period: "2005–2023",
        geography: "US rural counties",
        source_id: "CC-SRC-009",
        note: "81 complete shutdowns; access proxy — not CM03 hospital-access baseline.",
      }
    );
  }
  p.source_ids = Array.from(new Set([...(p.source_ids || []), "CC-SRC-008", "CC-SRC-009", "CC-SRC-268"]));
  p.metric_ids = Array.from(new Set([...(p.metric_ids || []), "CC-IND-B01", "CC-IND-B02"]));
  p.what_the_data_show.key_finding =
    "Rural/local-capital evidence now combines Census-rural 20% with ERS nonmetro 13.6% (different definitions), national BDS entry/exit rates, community-bank/credit dials, a 2005–2023 rural-hospital closure count, and Arkansas ACS statewide context — still labeled national/statewide ≠ local.";
  p.evidence_system = {
    reader_stack: STACK,
    definition:
      "CM02 = Census rural population share. ERS nonmetro is a different geography. CM04/E01 = FDIC/NCUA local-capital shares. E02 = SBCS + FSA. BDS entry/exit rates = national establishment dynamics.",
    comparison: [
      { label: "Census rural population share (2020)", value: "20%" },
      {
        label: "ERS nonmetro population share (July 2024)",
        value: "13.6% (~46.2M)",
        note: "Different rural definition than Census urban/rural — do not collapse.",
      },
      { label: "Community-bank domestic deposit share", value: "13.1% (2024Q4)" },
      { label: "Community bank + CU loan share", value: "24.9% (2024Q4)" },
      {
        label: "BDS entry / exit rates",
        value: "10.608% / 9.396% (2023)",
        note: "National rates from imported series — not rural-only.",
      },
    ],
    observation_history: [
      {
        period: "2005–2023",
        value: "146 rural-county hospital closures/conversions (81 shutdowns)",
        label: "ERS rural hospital access history",
        geography: "US rural counties",
        source_id: "CC-SRC-009",
        note: "Multi-year count — not a complete hospital-access baseline (CM03 deferred).",
      },
      {
        period: "July 2020–June 2024",
        value: "51% of nonmetro counties lost population",
        label: "ERS county decline share",
        geography: "US nonmetro",
        source_id: "CC-SRC-008",
        note: "Aggregate nonmetro gains can coexist with widespread county decline.",
      },
      {
        period: "2020 / 2023 / 2024",
        value: "current rural + capital + dynamics dials",
        label: "Current observations",
        geography: "US",
      },
    ],
    geography_contrast: [
      {
        label: "Rural definition contrast",
        value: "Census rural 20% vs ERS nonmetro 13.6%",
        note: "Keep both; never average them.",
      },
      {
        label: "Arkansas statewide ACS5 context (2022)",
        value:
          "pop ~3.02M; median HH income $56,335; poverty 16.2%; LFPR 58.2%; broadband 82.4%",
        note: "Statewide context from RedDirt AR import — not Rose Bud/Lewisville community baselines.",
      },
      {
        label: "AR vs US unemployment (2024-M12)",
        value: "3.7% vs 4.1%",
        note: "Labor-market backdrop only.",
      },
    ],
    series_note:
      "Pass 5 attaches definition contrasts, BDS rates, ERS county/hospital history endpoints, and AR ACS context. FDIC QBP multi-year paths and county series remain demanded.",
    series_status: "partial_history_endpoints_attached",
    missing_layers: [
      "FDIC QBP community-bank deposit/loan share path — RCIP-DEM-0414 / PASS5-DEM-FDIC-PATH",
      "BDS ESTABS_* multi-year national + AR paths — PASS5-DEM-BDS-HISTORY",
      "Decennial rural-share series beyond 2020 — PASS5-DEM-RURAL-SHARE-HISTORY",
      "Hospital-access baseline CM03 (deferred)",
      "SBA 7(a)/504 dollar series",
      "Community-level ownership / leakage maps",
    ],
    qualification:
      "These are structural dials for rural/local capital context. They do not measure a specific Arkansas town’s prosperity account or prove community-laboratory success.",
  };
}

{
  const p = find("CC-EP-PRIMARY-CARE-ACCESS-1");
  p.last_updated = {
    date: "2026-08-11",
    dataset_or_release: "national_baseline_metrics.json + CC-SRC-009/225",
  };
  p.source_ids = Array.from(new Set([...(p.source_ids || []), "CC-SRC-009"]));
  if (!p.what_the_data_show.critical_numbers.some((n) => n.label.includes("Rural hospital"))) {
    p.what_the_data_show.critical_numbers.push({
      label: "Rural hospital closures/conversions",
      value: "146",
      period: "2005–2023",
      geography: "US rural counties",
      source_id: "CC-SRC-009",
      note: "Related access history — not a substitute for E05 HPSA share or CM03.",
    });
  }
  p.what_the_data_show.key_finding =
    "Primary-care HPSA population share is about 22% (~75M) as of 2024-06-30. Separately, ERS counts 146 rural hospital closures/conversions from 2005–2023. Multi-year HPSA share arrays and Arkansas HPSA maps are not yet attached.";
  p.evidence_system = {
    reader_stack: STACK,
    definition:
      "E05 ≈ share of U.S. population residing in designated primary-care Health Professional Shortage Areas (HRSA). Rural hospital closure counts are a related access history, not the same metric.",
    comparison: [
      {
        label: "Population in primary-care HPSAs",
        value: "~22% (~75 million)",
        note: "Designation proxy, not visits delivered.",
      },
      {
        label: "Rural hospital closures/conversions",
        value: "146 (2005–2023)",
        note: "81 complete shutdowns (CC-SRC-009).",
      },
      {
        label: "Hospital-access baseline (CM03)",
        value: "DEFERRED",
        note: "Do not substitute HPSA or closure counts for CM03.",
      },
    ],
    observation_history: [
      {
        period: "2005–2023",
        value: "146 closures/conversions; 81 shutdowns",
        label: "ERS rural hospital history",
        geography: "US rural counties",
        source_id: "CC-SRC-009",
      },
      {
        period: "2024-06-30",
        value: "~22% population in primary-care HPSAs",
        label: "Current E05 dial",
        geography: "US",
        source_id: "CC-SRC-225",
      },
    ],
    geography_contrast: [
      {
        label: "Arkansas primary-care HPSA share / county map",
        value: "NOT ATTACHED",
        note: "Demand PASS5-DEM-HPSA-AR — do not invent from national 22%.",
      },
    ],
    series_note:
      "Pass 5 attaches the multi-year rural-hospital closure count beside the current HPSA dial. Multi-year HPSA population-share arrays remain demanded.",
    series_status: "partial_history_endpoints_attached",
    missing_layers: [
      "HRSA primary-care HPSA population-share multi-year array — RCIP-DEM-0412 / PASS5-DEM-HPSA-HISTORY",
      "Arkansas HPSA share and county designations — PASS5-DEM-HPSA-AR",
      "CM03 hospital access baseline (deferred)",
      "E03/E04/E06 pending insurance/drug/prevention slots",
    ],
    qualification:
      "Do not let health-system design prose outrun these thin but honest dials. Designation ≠ utilization; mental-health HPSAs are separate.",
  };
}

{
  const p = find("CC-EP-MARKET-DYNAMICS-SYSTEM-1");
  p.last_updated = {
    date: "2026-08-11",
    dataset_or_release: "reddirt BDS rates + national_baseline C02/C03",
  };
  if (!p.what_the_data_show.critical_numbers.some((n) => n.label.includes("entry / exit rates"))) {
    p.what_the_data_show.critical_numbers.splice(1, 0, {
      label: "Establishment entry / exit rates (BDS)",
      value: "10.608% / 9.396%",
      period: "2023",
      geography: "US",
      note: "Rate companions to the 790,295 entrant count — still not markups or CR.",
    });
  }
  p.metric_ids = Array.from(new Set([...(p.metric_ids || []), "CC-IND-B01", "CC-IND-B02"]));
  p.what_the_data_show.key_finding =
    "Market-dynamics evidence supports an entry count (~790k), entry/exit rates (10.608%/9.396%), and an enforcement dial (20 DOJ ATR criminal cases). Concentration ratios, markups, and multi-year CR tables remain explicitly missing — enforcement is not competitiveness.";
  p.what_the_data_show.plain_english =
    "Pass 5 deepens the dynamics dials with imported BDS rates and keeps the competitiveness gap visible as a data demand, not a filled cell.";
  p.evidence_system = {
    reader_stack: STACK,
    definition:
      "C02 = Census BDS establishments born in the last 12 months. B01/B02 = establishment entry/exit rates. C03 = DOJ ATR criminal antitrust cases filed (FY). Industry CR shares are cell-based — no national concentration percent.",
    comparison: [
      {
        label: "New establishment entrants (BDS)",
        value: "790,295 (2023)",
        note: "Dynamics count — not survival or markups.",
      },
      {
        label: "Entry / exit rates (BDS)",
        value: "10.608% / 9.396% (2023)",
        note: "National rates from RedDirt import.",
      },
      {
        label: "DOJ ATR criminal cases filed",
        value: "20 (FY2024)",
        note: "Enforcement activity ≠ market competitiveness.",
      },
      {
        label: "Industry concentration / markups",
        value: "NOT ATTACHED",
        note: "Need fixed-NAICS CR and/or markup series before calling this competitiveness evidence.",
      },
    ],
    observation_history: [
      {
        period: "2023",
        value: "790,295 entrants; entry 10.608%; exit 9.396%",
        label: "Current BDS dynamics cluster",
        geography: "US",
        source_id: "CC-SRC-263",
      },
      {
        period: "FY2024",
        value: "20 criminal cases filed",
        label: "Current enforcement dial",
        geography: "US",
        source_id: "CC-SRC-255",
      },
    ],
    geography_contrast: [
      {
        label: "Arkansas BDS entry/exit or industry CR sample",
        value: "NOT ATTACHED",
        note: "PASS5-DEM-BDS-AR / PASS5-DEM-CR-SAMPLE",
      },
    ],
    series_note:
      "BDS annual history and Economic Census CR tables exist officially. Pass 5 attaches current rate companions only; multi-year CR/markup paths are demanded before competition claims escalate.",
    series_status: "partial_history_endpoints_attached",
    missing_layers: [
      "Fixed-NAICS multi-year CR4/CR8 sample table — PASS5-DEM-CR-SAMPLE",
      "Markup / price-cost margin comparable series — PASS5-DEM-MARKUPS",
      "BDS multi-year entry/exit path (US + AR) — PASS5-DEM-BDS-HISTORY",
      "Labor-market concentration datasets",
      "Merger retrospective attachments",
    ],
    qualification:
      "Do not treat 20 criminal cases as a competitiveness score. Do not invent a national CR4. Entry counts and enforcement counts answer different reader questions.",
  };
}

const energyId = "CC-EP-ENERGY-STRUCTURAL-ENDPOINTS-1";
if (!data.panels.some((p) => p.panel_id === energyId)) {
  data.panels.push({
    panel_id: energyId,
    title: "Energy structural endpoints (not a prosperity-fund scorecard)",
    reader_question:
      "What energy production, trade, and generation facts are already sourced — and which historical series still must be demanded before design claims sit on an empirical foundation?",
    surfaces: [
      "apps/book-site/src/pages/energy-sovereignty.astro",
      "apps/build-board/src/pages/energy-sovereignty.astro",
      "data/project/energy_sovereignty_framework.json",
    ],
    claim_ids: [],
    metric_ids: [],
    source_ids: [
      "CC-SRC-056",
      "CC-SRC-057",
      "CC-SRC-058",
      "CC-SRC-059",
      "CC-SRC-060",
      "CC-SRC-061",
    ],
    evidence_strength: "Partial",
    strength_note:
      "Strong for the cited EIA/DOE structural endpoints. Partial because multi-year arrays, prices, reliability, ownership shares, and Arkansas series are not attached — and none of these endpoints validate a National Energy Prosperity Fund.",
    evidence_system: {
      reader_stack: STACK,
      definition:
        "Structural energy endpoints from EIA/DOE publications already in the source registry. These are not CC baseline energy metrics and not public-return or dividend outcomes.",
      comparison: [
        {
          label: "Primary energy balance (2024)",
          value: "production > consumption; net exports 9.3 quads",
          note: "Highest net exports in EIA records dating to 1949 (CC-SRC-056).",
        },
        {
          label: "Electricity net generation (2025)",
          value: "4.43 thousand TWh",
          note: "Record generation; not reliability or affordability (CC-SRC-057).",
        },
        {
          label: "Crude oil production (2025)",
          value: "13.6 million b/d",
          note: "STEO-linked annual estimate; revisions possible (CC-SRC-058).",
        },
        {
          label: "LNG exports",
          value: "0.5 Bcf/d (2016) → 15.0 Bcf/d (2025)",
          note: "True multi-year endpoints from CC-SRC-061; DOE YTD 2025 ~5.5 Tcf by vessel (CC-SRC-059).",
        },
      ],
      observation_history: [
        {
          period: "1949–2024 (record span cited)",
          value: "net energy exports 9.3 quads in 2024 — highest in EIA records to 1949",
          label: "Primary energy net-export record",
          geography: "US",
          source_id: "CC-SRC-056",
          note: "Endpoint + record claim — full annual quads path not attached in-repo.",
        },
        {
          period: "2016→2025",
          value: "LNG exports 0.5 → 15.0 Bcf/d",
          label: "LNG export growth endpoints",
          geography: "US",
          source_id: "CC-SRC-061",
        },
        {
          period: "2020 onward",
          value: "total petroleum net exporter (while still importing some crude/products)",
          label: "Petroleum trade status",
          geography: "US",
          source_id: "CC-SRC-060",
          note: "Sovereignty ≠ autarky.",
        },
        {
          period: "2024–2025",
          value: "current production/generation/export endpoints",
          label: "Current observations",
          geography: "US",
        },
      ],
      geography_contrast: [
        {
          label: "Arkansas production / consumption / prices / capacity",
          value: "NOT ATTACHED",
          note: "PASS5-DEM-ENERGY-AR — do not invent from national endpoints.",
        },
      ],
      series_note:
        "Pass 5 publishes sourced structural endpoints and the LNG mini-history already in the registry, then routes the remaining energy desert through the public-statistics demand backlog rather than decorating the page with unsourced series.",
      series_status: "structural_endpoints_partial_history",
      missing_layers: [
        "Primary energy production/consumption/net exports annual quads path — PASS5-DEM-ENERGY-MER",
        "Electricity net generation annual path + capacity — PASS5-DEM-ENERGY-ELEC",
        "Crude oil production annual path — PASS5-DEM-ENERGY-CRUDE",
        "LNG / petroleum trade full annual tables — PASS5-DEM-ENERGY-TRADE",
        "Electricity prices / household energy burden (definition lock first) — PASS5-DEM-ENERGY-PRICES",
        "Reliability metrics where measurable — PASS5-DEM-ENERGY-RELIABILITY",
        "IOU / municipal / cooperative customer-share ownership structure — PASS5-DEM-ENERGY-OWNERSHIP",
        "Arkansas energy accounts — PASS5-DEM-ENERGY-AR",
        "Public-return / prosperity-fund outcome metrics (definition lock — do not invent)",
      ],
      qualification:
        "Production, exports, and generation facts do not measure public capture of energy rents, People’s Energy Dividend feasibility, or community hosting outcomes. Do not promote these endpoints into baseline prosperity metrics without ontology lock.",
    },
    what_the_data_show: {
      key_finding:
        "Sourced EIA/DOE endpoints show the U.S. produced more primary energy than it consumed in 2024 (net exports 9.3 quads, record since 1949), record electricity generation in 2025 (4.43 thousand TWh), record crude production (13.6 mb/d), and LNG exports rising from 0.5 Bcf/d in 2016 to 15.0 Bcf/d in 2025 — while petroleum net-exporter status since 2020 still coexists with imports.",
      critical_numbers: [
        {
          label: "Net primary energy exports",
          value: "9.3 quads",
          period: "2024",
          geography: "US",
          source_id: "CC-SRC-056",
          note: "Highest in EIA records dating to 1949.",
        },
        {
          label: "Energy exports",
          value: "30.9 quads",
          period: "2024",
          geography: "US",
          source_id: "CC-SRC-056",
        },
        {
          label: "Electricity net generation",
          value: "4.43 thousand TWh",
          period: "2025",
          geography: "US",
          source_id: "CC-SRC-057",
        },
        {
          label: "Crude oil production",
          value: "13.6 million b/d",
          period: "2025",
          geography: "US",
          source_id: "CC-SRC-058",
          note: "STEO-linked; may revise.",
        },
        {
          label: "LNG exports",
          value: "15.0 Bcf/d",
          period: "2025 (from 0.5 in 2016)",
          geography: "US",
          source_id: "CC-SRC-061",
        },
      ],
      plain_english:
        "Energy Sovereignty pages should sit on these structural facts and the visible missing-layer list. Abundance and export capacity are measurable; public-return design is not yet an empirical scorecard.",
    },
    what_supports_this: [
      "EIA Today in Energy / Energy Explained (CC-SRC-056/057/058/060/061)",
      "DOE Natural Gas Imports and Exports Monthly (CC-SRC-059)",
      "energy_sovereignty_framework sourced_context_baselines",
    ],
    what_challenges_it: [
      "Endpoints ≠ full historical series attached in-repo",
      "Net exporter status ≠ energy autarky or household affordability",
      "No measurement here of public vs private capture of export value",
    ],
    what_we_dont_know: [
      "In-repo multi-year MER/electricity/price/reliability arrays",
      "Arkansas energy accounts",
      "Prosperity-fund distributable outcomes (modeling 0%)",
    ],
    last_updated: {
      date: "2026-08-11",
      dataset_or_release: "source_registry CC-SRC-056–061 (no energy baseline slots)",
    },
    explore: {
      methodology: "docs/publishing/DATA_DENSE_PUBLICATION_STANDARD.md",
      mapping: "data/project/CC_PASS_5_EVIDENCE_DESERT_DATA_DEMAND_BACKLOG.json",
    },
  });
}

data.version = "1.4.0";
data.slice_id = "CC-PUBLICATION-EVIDENCE-UPGRADE-PASS-5.0";
data.generated_at = "2026-08-11";
data.pass_summary = {
  pass: "CC-PUBLICATION-EVIDENCE-UPGRADE-PASS-5.0",
  panels_total: data.panels.length,
  panels_added_pass_5: 1,
  systems_deepened_pass_5: 6,
  preference: "depth_over_panel_count",
  google_civic_bound: false,
  energy_baseline_bound: false,
  energy_structural_panel_bound: true,
  note: "Turn snapshots into histories where sourced endpoints exist; route deserts through data-demand backlog.",
};
data.pass_5_rule =
  "Prefer more observations behind existing evidence systems rather than more evidence-panel count. Claim → current → history → AR/US → geography → qualification → provenance; say so when layers are missing.";

fs.writeFileSync(panelsPath, JSON.stringify(data, null, 2) + "\n");
console.log("OK panels=", data.panels.length);
