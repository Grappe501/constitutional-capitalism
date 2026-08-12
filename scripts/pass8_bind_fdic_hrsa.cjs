/**
 * RCIP-PASS-8 / CC-PUBLICATION-EVIDENCE-UPGRADE-PASS-8.0
 * Bind FDIC + HRSA arrays into existing rural/local-capital and primary-care panels.
 * No new panels. FRED not used generically.
 */
const fs = require("fs");

const arrays = JSON.parse(
  fs.readFileSync("data/imports/reddirt-public-statistics/series-arrays.json", "utf8")
);
const importMeta = JSON.parse(
  fs.readFileSync("data/imports/reddirt-public-statistics/manifest.json", "utf8")
);
const panelsPath = "data/project/publication_evidence_panels.json";
const data = JSON.parse(fs.readFileSync(panelsPath, "utf8"));
const exportId = importMeta.export_id || "unknown";

function seriesById(id, geo) {
  return arrays.series.find(
    (s) => s.consumer_metric_id === id && (!geo || s.geography_id === geo)
  );
}

function coverage(series) {
  if (!series?.points?.length) return "none";
  const sorted = [...series.points]
    .filter((p) => p.value != null)
    .sort((a, b) => String(a.period).localeCompare(String(b.period)));
  if (!sorted.length) return "none";
  return `${sorted[0].period} → ${sorted[sorted.length - 1].period}`;
}

function latest(series) {
  if (!series?.points?.length) return null;
  const sorted = [...series.points]
    .filter((p) => p.value != null && Number.isFinite(Number(p.value)))
    .sort((a, b) => String(a.period).localeCompare(String(b.period)));
  return sorted[sorted.length - 1] || null;
}

function toPoints(series, max = 14, format = (v) => String(v)) {
  if (!series) return [];
  const pts = series.points
    .filter((p) => p.value != null && Number.isFinite(Number(p.value)))
    .map((p) => ({
      period: String(p.period),
      value: format(Number(p.value)),
      geography: series.geography_name,
    }));
  if (pts.length <= max) return pts;
  const out = [pts[0]];
  const inner = max - 2;
  for (let i = 1; i <= inner; i += 1) {
    const idx = Math.round((i * (pts.length - 1)) / (inner + 1));
    out.push(pts[idx]);
  }
  out.push(pts[pts.length - 1]);
  const seen = new Set();
  return out.filter((p) => {
    if (seen.has(p.period)) return false;
    seen.add(p.period);
    return true;
  });
}

function find(id) {
  const p = data.panels.find((x) => x.panel_id === id);
  if (!p) throw new Error("missing " + id);
  return p;
}

function bilFromThousands(v) {
  return Number(v) / 1_000_000; // $ thousands → $ billions
}

const usBanks = seriesById("CC-PASS8-FDIC-US-BANKS", "geo:us");
const arBanks = seriesById("CC-PASS8-FDIC-AR-BANKS", "geo:us-ar");
const usBranches = seriesById("CC-PASS8-FDIC-US-BRANCHES", "geo:us");
const arBranches = seriesById("CC-PASS8-FDIC-AR-BRANCHES", "geo:us-ar");
const usDep = seriesById("CC-PASS8-FDIC-US-DEP", "geo:us");
const arDep = seriesById("CC-PASS8-FDIC-AR-DEP", "geo:us-ar");
const usActive = seriesById("CC-PASS8-FDIC-US-ACTIVE-BANKS", "geo:us");
const usCb = seriesById("CC-PASS8-FDIC-US-CB-BANKS", "geo:us");
const usActiveDep = seriesById("CC-PASS8-FDIC-US-ACTIVE-DEP", "geo:us");
const usCbDep = seriesById("CC-PASS8-FDIC-US-CB-DEP", "geo:us");
const arActive = seriesById("CC-PASS8-FDIC-AR-ACTIVE-BANKS", "geo:us-ar");
const arCb = seriesById("CC-PASS8-FDIC-AR-CB-BANKS", "geo:us-ar");
const arActiveDep = seriesById("CC-PASS8-FDIC-AR-ACTIVE-DEP", "geo:us-ar");
const arCbDep = seriesById("CC-PASS8-FDIC-AR-CB-DEP", "geo:us-ar");

const usHpsaN = seriesById("CC-PASS8-HRSA-US-HPSA-COUNT", "geo:us");
const arHpsaN = seriesById("CC-PASS8-HRSA-AR-HPSA-COUNT", "geo:us-ar");
const usHpsaPop = seriesById("CC-PASS8-HRSA-US-HPSA-POP-SUM", "geo:us");
const arHpsaPop = seriesById("CC-PASS8-HRSA-AR-HPSA-POP-SUM", "geo:us-ar");
const usHpsaFte = seriesById("CC-PASS8-HRSA-US-HPSA-FTE", "geo:us");
const arHpsaFte = seriesById("CC-PASS8-HRSA-AR-HPSA-FTE", "geo:us-ar");

if (!usBanks || !arBanks) throw new Error("FDIC bank series missing — import Pass 8 export first");
if (!usHpsaN || !arHpsaN) throw new Error("HRSA HPSA series missing — import Pass 8 export first");

const usCbShare =
  latest(usCbDep) && latest(usActiveDep)
    ? (100 * Number(latest(usCbDep).value)) / Number(latest(usActiveDep).value)
    : null;
const arCbShare =
  latest(arCbDep) && latest(arActiveDep)
    ? (100 * Number(latest(arCbDep).value)) / Number(latest(arActiveDep).value)
    : null;

// --- RURAL / LOCAL CAPITAL ---
{
  const p = find("CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1");
  const sys = p.evidence_system || {};
  const existingBds = (sys.series_points || []).filter((s) =>
    String(s.series_id || "").startsWith("CC-PASS6-BDS")
  );
  sys.series_points = [
    ...existingBds,
    {
      series_id: "CC-PASS8-FDIC-US-BANKS",
      label: "US commercial banks (FDIC summary)",
      source: `FDIC BankFind /summary via RedDirt ${exportId}`,
      point_count: usBanks?.points?.length || 0,
      coverage: coverage(usBanks),
      definition_note: "CB_SI:CB commercial banks — not identical to FDIC community-bank (CB:1).",
      points: toPoints(usBanks, 14, (v) => String(Math.round(v))),
    },
    {
      series_id: "CC-PASS8-FDIC-AR-BANKS",
      label: "Arkansas commercial banks (FDIC summary)",
      source: `FDIC BankFind /summary via RedDirt ${exportId}`,
      point_count: arBanks?.points?.length || 0,
      coverage: coverage(arBanks),
      definition_note: "Same CB_SI:CB definition as US summary — valid AR/US contrast.",
      points: toPoints(arBanks, 14, (v) => String(Math.round(v))),
    },
    {
      series_id: "CC-PASS8-FDIC-US-BRANCHES",
      label: "US commercial bank branches",
      source: `FDIC BankFind /summary via RedDirt ${exportId}`,
      point_count: usBranches?.points?.length || 0,
      coverage: coverage(usBranches),
      points: toPoints(usBranches, 14, (v) => String(Math.round(v))),
    },
    {
      series_id: "CC-PASS8-FDIC-AR-BRANCHES",
      label: "Arkansas commercial bank branches",
      source: `FDIC BankFind /summary via RedDirt ${exportId}`,
      point_count: arBranches?.points?.length || 0,
      coverage: coverage(arBranches),
      points: toPoints(arBranches, 14, (v) => String(Math.round(v))),
    },
    {
      series_id: "CC-PASS8-FDIC-US-DEP",
      label: "US commercial bank deposits ($ billions)",
      source: `FDIC BankFind /summary via RedDirt ${exportId}`,
      point_count: usDep?.points?.length || 0,
      coverage: coverage(usDep),
      definition_note: "Converted from FDIC $ thousands to $ billions (÷1,000,000) for readers.",
      points: toPoints(usDep, 14, (v) => bilFromThousands(v).toFixed(0)),
    },
    {
      series_id: "CC-PASS8-FDIC-AR-DEP",
      label: "Arkansas commercial bank deposits ($ billions)",
      source: `FDIC BankFind /summary via RedDirt ${exportId}`,
      point_count: arDep?.points?.length || 0,
      coverage: coverage(arDep),
      definition_note: "Converted from FDIC $ thousands to $ billions (÷1,000,000) for readers.",
      points: toPoints(arDep, 14, (v) => bilFromThousands(v).toFixed(1)),
    },
  ].filter((s) => s.point_count > 0);

  const lastUsBanks = latest(usBanks);
  const lastArBanks = latest(arBanks);
  const lastUsBr = latest(usBranches);
  const lastArBr = latest(arBranches);

  sys.geography_contrast = [
    {
      label: "Commercial banks latest year (AR vs US)",
      value:
        lastArBanks && lastUsBanks
          ? `AR ${Math.round(Number(lastArBanks.value))} vs US ${Math.round(Number(lastUsBanks.value))} (${lastArBanks.period})`
          : "NOT ATTACHED",
      note: "FDIC summary CB_SI:CB — institution structure, not community prosperity accounts.",
    },
    {
      label: "Commercial bank branches latest year (AR vs US)",
      value:
        lastArBr && lastUsBr
          ? `AR ${Math.round(Number(lastArBr.value))} vs US ${Math.round(Number(lastUsBr.value))} (${lastArBr.period})`
          : "NOT ATTACHED",
      note: "Branch counts describe access geography incompletely; rural towns can still be thin.",
    },
    {
      label: "Community-bank deposit share (CB:1 current snapshot)",
      value:
        arCbShare != null && usCbShare != null
          ? `AR ${arCbShare.toFixed(1)}% vs US ${usCbShare.toFixed(1)}%`
          : "NOT ATTACHED",
      note: "Derived from BankFind institutions CB:1 / ACTIVE deposits. Not the QBP multi-year path; definition differs from registry 13.1% QBP cell until reconciled.",
    },
    {
      label: "Rural definition contrast",
      value: "Census rural 20% vs ERS nonmetro 13.6%",
      note: "Keep both; never average them.",
    },
  ];

  sys.observation_history = [
    ...(usBanks
      ? [
          {
            period: coverage(usBanks),
            value: lastUsBanks
              ? `${Math.round(Number(lastUsBanks.value))} US commercial banks in ${lastUsBanks.period}`
              : "attached",
            label: "US commercial bank count path",
            geography: "US",
            note: `FDIC BankFind /summary via ${exportId}`,
          },
        ]
      : []),
    ...(arBanks
      ? [
          {
            period: coverage(arBanks),
            value: lastArBanks
              ? `${Math.round(Number(lastArBanks.value))} AR commercial banks in ${lastArBanks.period}`
              : "attached",
            label: "Arkansas commercial bank count path",
            geography: "AR",
          },
        ]
      : []),
    {
      period: "2005–2023",
      value: "146 rural-county hospital closures/conversions (81 shutdowns)",
      label: "ERS rural hospital access history",
      geography: "US rural counties",
      source_id: "CC-SRC-009",
    },
  ];

  sys.series_note = `Pass 8 attached FDIC BankFind commercial-bank banks/branches/deposits histories (AR vs US) and current community-bank (CB:1) deposit-share snapshots via ${exportId}. QBP multi-year community-bank share path still not a BankFind series. BDS arrays from Pass 6 retained.`;
  sys.series_status = "fdic_arrays_partial_qbp_path_blocked";
  sys.missing_layers = [
    "FDIC QBP multi-year community-bank domestic deposit/loan share path — PASS5-DEM-FDIC-PATH (current CB:1 snapshot only)",
    "Hospital-access baseline CM03 (deferred)",
    "SBA 7(a)/504 dollar series",
    "Community-level ownership / leakage maps",
  ];
  sys.qualification =
    "Bank/branch/deposit structure and community-bank snapshots describe local-capital infrastructure. They do not measure a specific Arkansas town’s prosperity account or prove community-laboratory success.";

  p.evidence_system = sys;
  p.evidence_strength = "Strong";
  p.strength_note =
    "Stronger with FDIC AR/US bank and branch histories. Still Partial for QBP community-bank share path and community-level outcomes. Statewide ≠ town baselines.";

  p.what_the_data_show = {
    key_finding: [
      lastArBanks && lastUsBanks
        ? `FDIC BankFind commercial-bank histories now show Arkansas and U.S. institution counts through ${lastArBanks.period} (AR ${Math.round(Number(lastArBanks.value))} vs US ${Math.round(Number(lastUsBanks.value))} banks).`
        : "FDIC bank histories attached.",
      lastArBr && lastUsBr
        ? `Branch counts: AR ${Math.round(Number(lastArBr.value))} vs US ${Math.round(Number(lastUsBr.value))} (${lastArBr.period}).`
        : null,
      arCbShare != null && usCbShare != null
        ? `Current community-bank (CB:1) deposit shares: AR ${arCbShare.toFixed(1)}% vs US ${usCbShare.toFixed(1)}% — snapshot only, not the QBP multi-year path.`
        : null,
      "These deepen local-capital structure under existing community-prosperity arguments; they do not prove town-level success.",
    ]
      .filter(Boolean)
      .join(" "),
    critical_numbers: [
      ...(lastArBanks && lastUsBanks
        ? [
            {
              label: "Commercial banks AR vs US",
              value: `AR ${Math.round(Number(lastArBanks.value))} / US ${Math.round(Number(lastUsBanks.value))}`,
              period: String(lastArBanks.period),
              geography: "AR / US",
              note: `FDIC summary via ${exportId}`,
            },
          ]
        : []),
      ...(arCbShare != null && usCbShare != null
        ? [
            {
              label: "Community-bank deposit share (CB:1 snapshot)",
              value: `AR ${arCbShare.toFixed(1)}% / US ${usCbShare.toFixed(1)}%`,
              period: String(latest(arCbDep).period),
              geography: "AR / US",
              note: "Derived from BankFind institutions aggregates — not QBP path.",
            },
          ]
        : []),
      {
        label: "Community-bank domestic deposit share (registry QBP)",
        value: "13.1%",
        period: "2024Q4",
        note: "Prior registry cell retained; do not overwrite with CB:1 snapshot without reconciliation.",
      },
    ],
    plain_english:
      "Local-capital pages can now show multi-decade bank and branch histories for Arkansas and the U.S., plus a clearly labeled current community-bank deposit-share snapshot — while still naming the missing QBP path and town-level unknowns.",
  };
  p.what_supports_this = [
    `FDIC BankFind Suite via RedDirt ${exportId}`,
    "Census BDS entry/exit histories (Pass 6)",
    "FDIC QBP (registry community-bank share cell)",
  ];
  p.what_challenges_it = [
    "Commercial-bank summary ≠ community-bank QBP definition",
    "Statewide banking structure ≠ town capital access",
    "CB:1 snapshot ≠ multi-year QBP share path",
  ];
  p.what_we_dont_know = [
    "Official multi-year QBP community-bank deposit/loan share arrays in-repo",
    "Community-level ownership / leakage maps",
    "CM03 hospital access (deferred)",
  ];
  p.last_updated = {
    date: "2026-08-11",
    dataset_or_release: `Pass 8 — FDIC arrays bound from ${exportId}`,
  };
}

// --- PRIMARY CARE / HPSA ---
{
  const p = find("CC-EP-PRIMARY-CARE-ACCESS-1");
  const sys = p.evidence_system || {};
  const lastUsN = latest(usHpsaN);
  const lastArN = latest(arHpsaN);
  const lastUsPop = latest(usHpsaPop);
  const lastArPop = latest(arHpsaPop);
  const lastUsFte = latest(usHpsaFte);
  const lastArFte = latest(arHpsaFte);

  sys.series_points = [
    {
      series_id: "CC-PASS8-HRSA-US-HPSA-COUNT",
      label: "US designated primary-care HPSA areas",
      source: `HRSA GIS HPSA MapServer layer 10 via RedDirt ${exportId}`,
      point_count: usHpsaN?.points?.length || 0,
      coverage: coverage(usHpsaN),
      definition_note: "Current designated-area count only — not a multi-year population-share path.",
      points: toPoints(usHpsaN, 4, (v) => String(Math.round(v))),
    },
    {
      series_id: "CC-PASS8-HRSA-AR-HPSA-COUNT",
      label: "Arkansas designated primary-care HPSA areas",
      source: `HRSA GIS HPSA MapServer layer 10 via RedDirt ${exportId}`,
      point_count: arHpsaN?.points?.length || 0,
      coverage: coverage(arHpsaN),
      points: toPoints(arHpsaN, 4, (v) => String(Math.round(v))),
    },
    {
      series_id: "CC-PASS8-HRSA-US-HPSA-FTE",
      label: "US primary-care HPSA FTE sum",
      source: `HRSA GIS via RedDirt ${exportId}`,
      point_count: usHpsaFte?.points?.length || 0,
      coverage: coverage(usHpsaFte),
      points: toPoints(usHpsaFte, 4, (v) => v.toFixed(1)),
    },
    {
      series_id: "CC-PASS8-HRSA-AR-HPSA-FTE",
      label: "Arkansas primary-care HPSA FTE sum",
      source: `HRSA GIS via RedDirt ${exportId}`,
      point_count: arHpsaFte?.points?.length || 0,
      coverage: coverage(arHpsaFte),
      points: toPoints(arHpsaFte, 4, (v) => v.toFixed(1)),
    },
    {
      series_id: "CC-PASS8-HRSA-US-HPSA-POP-SUM",
      label: "US HPSA designation population sum (may overlap)",
      source: `HRSA GIS via RedDirt ${exportId}`,
      point_count: usHpsaPop?.points?.length || 0,
      coverage: coverage(usHpsaPop),
      definition_note:
        "Sum of designation populations — overlap possible. Not a substitute for the ~22% E05 population-share dial.",
      points: toPoints(usHpsaPop, 4, (v) => Math.round(v).toLocaleString("en-US")),
    },
    {
      series_id: "CC-PASS8-HRSA-AR-HPSA-POP-SUM",
      label: "Arkansas HPSA designation population sum (may overlap)",
      source: `HRSA GIS via RedDirt ${exportId}`,
      point_count: arHpsaPop?.points?.length || 0,
      coverage: coverage(arHpsaPop),
      definition_note: "Overlap possible — do not convert to an Arkansas population-share claim.",
      points: toPoints(arHpsaPop, 4, (v) => Math.round(v).toLocaleString("en-US")),
    },
  ].filter((s) => s.point_count > 0);

  sys.geography_contrast = [
    {
      label: "Designated primary-care HPSA areas (AR vs US)",
      value:
        lastArN && lastUsN
          ? `AR ${Math.round(Number(lastArN.value))} vs US ${Math.round(Number(lastUsN.value))}`
          : "NOT ATTACHED",
      note: "Current HRSA GIS snapshot — counts of area designations, not visits delivered.",
    },
    {
      label: "Primary-care HPSA FTE sum (AR vs US)",
      value:
        lastArFte && lastUsFte
          ? `AR ${Number(lastArFte.value).toFixed(1)} vs US ${Number(lastUsFte.value).toFixed(1)}`
          : "NOT ATTACHED",
      note: "Workforce capacity inside designated areas — not a utilization rate.",
    },
    {
      label: "Arkansas HPSA population share",
      value: "NOT COMPUTED FROM OVERLAPPING SUMS",
      note: "Designation population sums may overlap; do not invent AR share from pop_sum. National E05 ~22% registry dial retained separately.",
    },
  ];

  sys.observation_history = [
    {
      period: String(lastUsN?.period || "current"),
      value: lastUsN
        ? `${Math.round(Number(lastUsN.value))} designated primary-care HPSA areas (US)`
        : "attached",
      label: "Current US HPSA area count",
      geography: "US",
      note: `HRSA GIS via ${exportId}; multi-year share path still blocked.`,
    },
    {
      period: String(lastArN?.period || "current"),
      value: lastArN
        ? `${Math.round(Number(lastArN.value))} designated primary-care HPSA areas (AR)`
        : "attached",
      label: "Current Arkansas HPSA area count",
      geography: "AR",
    },
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
      label: "Current E05 dial (registry)",
      geography: "US",
      source_id: "CC-SRC-225",
      note: "Retained; not replaced by overlapping GIS population sums.",
    },
  ];

  sys.series_note = `Pass 8 attached current HRSA primary-care HPSA area counts, FTE sums, and designation-population sums (AR vs US) via ${exportId}. Multi-year HPSA population-share arrays remain blocked — no official time-series API.`;
  sys.series_status = "hrsa_current_snapshot_history_blocked";
  sys.missing_layers = [
    "HRSA primary-care HPSA population-share multi-year array — RCIP-DEM-0412 / PASS5-DEM-HPSA-HISTORY",
    "Non-overlapping Arkansas HPSA population share (method lock required)",
    "CM03 hospital access baseline (deferred)",
    "E03/E04/E06 pending insurance/drug/prevention slots",
  ];
  sys.qualification =
    "Do not let health-system design prose outrun these dials. Designation ≠ utilization; overlapping population sums ≠ population share; mental-health HPSAs are separate.";

  p.evidence_system = sys;
  p.evidence_strength = "Partial";
  p.strength_note =
    "Stronger for current AR vs US HPSA area/FTE contrasts. Still Partial because multi-year HPSA share history is unavailable and designation ≠ care received.";

  p.what_the_data_show = {
    key_finding: [
      lastArN && lastUsN
        ? `HRSA GIS now shows ${Math.round(Number(lastArN.value))} designated primary-care HPSA areas in Arkansas vs ${Math.round(Number(lastUsN.value))} nationally (current snapshot).`
        : "HRSA HPSA area counts attached.",
      lastArFte && lastUsFte
        ? `Associated FTE sums: AR ${Number(lastArFte.value).toFixed(1)} vs US ${Number(lastUsFte.value).toFixed(1)}.`
        : null,
      "Designation-population sums are attached with an overlap warning and are not converted into an Arkansas share. The national ~22% E05 registry dial remains. Multi-year HPSA share arrays are still missing.",
    ]
      .filter(Boolean)
      .join(" "),
    critical_numbers: [
      ...(lastArN && lastUsN
        ? [
            {
              label: "Designated primary-care HPSA areas",
              value: `AR ${Math.round(Number(lastArN.value))} / US ${Math.round(Number(lastUsN.value))}`,
              period: String(lastArN.period),
              geography: "AR / US",
              note: `HRSA GIS via ${exportId}`,
            },
          ]
        : []),
      ...(lastArFte && lastUsFte
        ? [
            {
              label: "Primary-care HPSA FTE sum",
              value: `AR ${Number(lastArFte.value).toFixed(1)} / US ${Number(lastUsFte.value).toFixed(1)}`,
              period: String(lastArFte.period),
              geography: "AR / US",
            },
          ]
        : []),
      {
        label: "Population in primary-care HPSAs (registry E05)",
        value: "22%",
        period: "2024-06-30",
        metric_id: "CC-IND-E05",
        source_id: "CC-SRC-225",
        note: "Not replaced by overlapping GIS population sums.",
      },
      {
        label: "Rural hospital closures/conversions",
        value: "146",
        period: "2005–2023",
        geography: "US rural counties",
        source_id: "CC-SRC-009",
      },
    ],
    plain_english:
      "Healthcare pages can now contrast Arkansas and U.S. shortage-area counts and FTE capacity under HRSA definitions — while still saying clearly that multi-year HPSA share history and utilization remain open.",
  };
  p.what_supports_this = [
    `HRSA GIS Primary Care HPSA areas via RedDirt ${exportId}`,
    "HRSA / CC-SRC-225 E05 registry dial",
    "ERS rural hospital history (CC-SRC-009)",
  ];
  p.what_challenges_it = [
    "Designation ≠ care received",
    "Population sums may overlap — not a share",
    "No official multi-year HPSA API",
  ];
  p.what_we_dont_know = [
    "Multi-year HPSA population-share path",
    "Non-overlapping Arkansas HPSA share",
    "E03/E04/E06 still pending",
    "CM03 hospital access deferred",
  ];
  p.last_updated = {
    date: "2026-08-11",
    dataset_or_release: `Pass 8 — HRSA snapshot bound from ${exportId}`,
  };
}

// Also clear FDIC/HPSA from rural missing if HPSA was listed there
{
  const rural = find("CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1");
  rural.evidence_system.missing_layers = (rural.evidence_system.missing_layers || []).filter(
    (x) => !String(x).includes("HPSA")
  );
}

data.version = "1.7.0";
data.pass_summary = {
  pass: "CC-PUBLICATION-EVIDENCE-UPGRADE-PASS-8.0",
  slice_id: "RCIP-PASS-8-FRED-FDIC-HRSA-ADAPTERS-AND-BINDING-1.0",
  panels_total: 18,
  panels_added_pass_8: 0,
  systems_deepened_with_arrays: 5,
  export_id: exportId,
  observation_count: importMeta.observation_count || null,
  preference: "more_observations_under_existing_arguments",
  fdic: "commercial_bank_histories_plus_cb1_snapshot",
  hrsa: "current_hpsa_area_fte_popsum_ar_us",
  fred: "not_seeded_no_demanded_awkward_series",
  baseline_impact: "none — no ontology promotion; energy baseline unchanged",
  holds: [
    "CC-CLAIM-003 remains NEE",
    "Google Civic deferred",
    "Energy baseline does not move from EIA strength",
    "Energy reliability/ownership remain missing layers",
  ],
  note: "FDIC deepened rural/local-capital; HRSA deepened primary-care access. FRED reserved. No new panels.",
};
data.pass_8_rule =
  "More real observations under existing arguments, not more headline statistics. FDIC→HRSA→FRED(only if awkward). Bind existing panels only.";

fs.writeFileSync(panelsPath, JSON.stringify(data, null, 2) + "\n");
console.log(
  JSON.stringify(
    {
      ok: true,
      export_id: exportId,
      rural_fdic_series: (find("CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1").evidence_system.series_points || [])
        .filter((s) => String(s.series_id).includes("PASS8-FDIC"))
        .map((s) => ({ id: s.series_id, points: s.point_count, coverage: s.coverage })),
      healthcare_hrsa_series: (
        find("CC-EP-PRIMARY-CARE-ACCESS-1").evidence_system.series_points || []
      ).map((s) => ({ id: s.series_id, points: s.point_count, coverage: s.coverage })),
      cb_share: { ar: arCbShare, us: usCbShare },
    },
    null,
    2
  )
);
