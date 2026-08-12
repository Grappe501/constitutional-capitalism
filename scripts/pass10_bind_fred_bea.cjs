/**
 * RCIP-PASS-10 / CC-PUBLICATION-EVIDENCE-UPGRADE-PASS-10.0
 * Bind FRED (DFA net-worth shares + BEA-via-FRED macro) into existing panels.
 * 0 new panels. Wealth structure ≠ political capture. FRED is a distribution channel.
 */
const fs = require("fs");

const arrays = JSON.parse(
  fs.readFileSync("data/imports/reddirt-public-statistics/series-arrays.json", "utf8"),
);
const importMeta = JSON.parse(
  fs.readFileSync("data/imports/reddirt-public-statistics/manifest.json", "utf8"),
);
const panelsPath = "data/project/publication_evidence_panels.json";
const data = JSON.parse(fs.readFileSync(panelsPath, "utf8"));
const exportId = importMeta.export_id || "unknown";

function seriesById(id, geo) {
  return arrays.series.find(
    (s) => s.consumer_metric_id === id && (!geo || s.geography_id === geo),
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

function earliest(series) {
  if (!series?.points?.length) return null;
  const sorted = [...series.points]
    .filter((p) => p.value != null && Number.isFinite(Number(p.value)))
    .sort((a, b) => String(a.period).localeCompare(String(b.period)));
  return sorted[0] || null;
}

function toPoints(series, max = 12, format = (v) => String(v)) {
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

function pct1(v) {
  return Number(v).toFixed(1) + "%";
}

function usd(v) {
  return "$" + Math.round(v).toLocaleString("en-US");
}

function usdBFromMillions(v) {
  return "$" + (v / 1000).toFixed(1) + "B";
}

function usdTFromBillions(v) {
  return "$" + (v / 1000).toFixed(1) + "T";
}

const top1 = seriesById("CC-PASS10-FRED-DFA-TOP1-NET-WORTH-SHARE", "geo:us");
const p90 = seriesById("CC-PASS10-FRED-DFA-P90-P99-NET-WORTH-SHARE", "geo:us");
const p50 = seriesById("CC-PASS10-FRED-DFA-P50-P90-NET-WORTH-SHARE", "geo:us");
const bot50 = seriesById("CC-PASS10-FRED-DFA-BOTTOM50-NET-WORTH-SHARE", "geo:us");
const save = seriesById("CC-PASS10-FRED-BEA-PERSONAL-SAVING-RATE", "geo:us");
const usPcpi = seriesById("CC-PASS10-FRED-BEA-US-PCPI", "geo:us");
const arPcpi = seriesById("CC-PASS10-FRED-BEA-AR-PCPI", "geo:us-ar");
const arGdp = seriesById("CC-PASS10-FRED-BEA-AR-GDP", "geo:us-ar");
const usGdp = seriesById("CC-PASS10-FRED-BEA-US-GDP", "geo:us");

if (!top1 || !bot50) {
  throw new Error("DFA net-worth share series missing — import Pass 10 export first");
}
if (!usPcpi || !arPcpi) {
  throw new Error("BEA PCPI series missing — import Pass 10 export first");
}

const lt1 = latest(top1);
const lb50 = latest(bot50);
const lp90 = latest(p90);
const lp50 = latest(p50);
const lSave = latest(save);
const lUsPcpi = latest(usPcpi);
const lArPcpi = latest(arPcpi);
const lArGdp = latest(arGdp);
const lUsGdp = latest(usGdp);

const netWorthNote =
  "These are Share of Total Net Worth (DFA via FRED). Baseline W02 dials (top 1% ≈28.8% / bottom 50% ≈5.3%) match Share of Total Assets in the same FRED release tables — do not collapse net-worth and asset shares.";

// --- OWNERSHIP / RETIREMENT ---
{
  const p = find("CC-EP-OWNERSHIP-RETIREMENT-SYSTEM-1");
  const sys = p.evidence_system || {};
  const keepNonPass10 = (sys.series_points || []).filter(
    (s) => !String(s.series_id || "").startsWith("CC-PASS10-FRED"),
  );
  sys.series_points = [
    ...keepNonPass10,
    {
      series_id: "CC-PASS10-FRED-DFA-TOP1-NET-WORTH-SHARE",
      label: "DFA top 1% net-worth share (via FRED)",
      unit: "percent_of_aggregate",
      coverage: coverage(top1),
      latest: lt1 ? { period: lt1.period, value: pct1(lt1.value) } : null,
      points: toPoints(top1, 12, pct1),
      note: netWorthNote,
    },
    {
      series_id: "CC-PASS10-FRED-DFA-P90-P99-NET-WORTH-SHARE",
      label: "DFA 90–99th net-worth share (via FRED)",
      unit: "percent_of_aggregate",
      coverage: coverage(p90),
      latest: lp90 ? { period: lp90.period, value: pct1(lp90.value) } : null,
      points: toPoints(p90, 12, pct1),
    },
    {
      series_id: "CC-PASS10-FRED-DFA-P50-P90-NET-WORTH-SHARE",
      label: "DFA 50–90th net-worth share (via FRED)",
      unit: "percent_of_aggregate",
      coverage: coverage(p50),
      latest: lp50 ? { period: lp50.period, value: pct1(lp50.value) } : null,
      points: toPoints(p50, 12, pct1),
    },
    {
      series_id: "CC-PASS10-FRED-DFA-BOTTOM50-NET-WORTH-SHARE",
      label: "DFA bottom 50% net-worth share (via FRED)",
      unit: "percent_of_aggregate",
      coverage: coverage(bot50),
      latest: lb50 ? { period: lb50.period, value: pct1(lb50.value) } : null,
      points: toPoints(bot50, 12, pct1),
      note: netWorthNote,
    },
  ];
  sys.series_status = "dfa_net_worth_path_bound_scf_triennial_still_blocked";
  sys.series_note =
    "Pass 10 attaches DFA quarterly net-worth share paths (1989–present via FRED). SCF triennial micro tables, CBO budget history, and markups remain blocked. Wealth shares ≠ capture.";
  sys.missing_layers = (sys.missing_layers || []).filter(
    (x) => !String(x).includes("DFA wealth shares quarterly path"),
  );
  if (lt1 && lb50) {
    const cmp = sys.comparison || [];
    const label = "Bottom 50% / top 1% net-worth shares (DFA via FRED)";
    const filtered = cmp.filter((c) => !String(c.label || "").includes("Bottom 50% / top 1%"));
    sys.comparison = [
      ...filtered,
      {
        label,
        value: `${pct1(lb50.value)} / ${pct1(lt1.value)} (${lt1.period})`,
        note: netWorthNote,
      },
    ];
    const hist = (sys.observation_history || []).filter(
      (h) => !String(h.label || "").includes("Official DFA history"),
    );
    const et1 = earliest(top1);
    const eb50 = earliest(bot50);
    sys.observation_history = [
      ...hist,
      {
        period: `${et1?.period || "1989-Q3"} → ${lt1.period}`,
        value:
          et1 && eb50
            ? `top 1% net worth ${pct1(et1.value)} → ${pct1(lt1.value)}; bottom 50% ${pct1(eb50.value)} → ${pct1(lb50.value)}`
            : `latest top 1% ${pct1(lt1.value)}; bottom 50% ${pct1(lb50.value)}`,
        label: "DFA net-worth share path (via FRED)",
        geography: "US",
        source_id: "CC-SRC-012",
        note: netWorthNote,
      },
    ];
  }
  p.evidence_system = sys;
  p.what_the_data_show = p.what_the_data_show || {};
  if (lt1 && lb50) {
    p.what_the_data_show.key_finding = `DFA quarterly net-worth shares are now attached (${coverage(top1)}): latest bottom 50% ${pct1(lb50.value)} vs top 1% ${pct1(lt1.value)} (${lt1.period}). Asset-share dials in baseline W02 remain complementary, not identical. SCF levels still differ from DFA shares.`;
    const nums = p.what_the_data_show.critical_numbers || [];
    p.what_the_data_show.critical_numbers = [
      ...nums.filter((n) => !String(n.label || "").includes("Bottom 50% / top 1%")),
      {
        label: "Bottom 50% / top 1% net-worth shares",
        value: `${pct1(lb50.value)} / ${pct1(lt1.value)}`,
        period: String(lt1.period).replace("-", " ") + " DFA",
        metric_id: "CC-IND-W02",
        source_id: "CC-SRC-012",
        note: "Net worth shares via FRED; not asset shares",
      },
    ];
  }
  p.last_updated = {
    date: "2026-08-12",
    dataset_or_release: `reddirt ${exportId} Pass 10 FRED/BEA`,
  };
  p.strength_note =
    "Strong for ownership/participation snapshots plus attached DFA net-worth path. Ownership ≠ adequacy; employee-ownership baseline (L03) still pending. Wealth shares ≠ political capture.";
}

// --- WEALTH BASELINE ---
{
  const p = find("CC-EP-WEALTH-BASELINE-1");
  // Panel historically lacks evidence_system; add a thin one without inventing new panel IDs.
  const sys = p.evidence_system || {
    reader_stack:
      "claim → current observation → historical series → qualification → provenance",
    definition:
      "W01 SCF median net worth; W02 DFA wealth shares (asset vs net-worth products differ); W04 homeownership.",
  };
  sys.series_points = [
    {
      series_id: "CC-PASS10-FRED-DFA-TOP1-NET-WORTH-SHARE",
      label: "DFA top 1% net-worth share (via FRED)",
      coverage: coverage(top1),
      latest: lt1 ? { period: lt1.period, value: pct1(lt1.value) } : null,
      points: toPoints(top1, 10, pct1),
      note: netWorthNote,
    },
    {
      series_id: "CC-PASS10-FRED-DFA-BOTTOM50-NET-WORTH-SHARE",
      label: "DFA bottom 50% net-worth share (via FRED)",
      coverage: coverage(bot50),
      latest: lb50 ? { period: lb50.period, value: pct1(lb50.value) } : null,
      points: toPoints(bot50, 10, pct1),
      note: netWorthNote,
    },
  ];
  sys.series_status = "dfa_net_worth_path_bound";
  sys.series_note =
    "Pass 10 binds DFA net-worth share histories. Baseline W02 point dials remain Share of Total Assets unless separately revised. Concentration ≠ oligarchy proof.";
  sys.qualification =
    "Do not upgrade CC-CLAIM-003 or treat wealth shares as market-power or capture evidence.";
  p.evidence_system = sys;
  if (lt1 && lb50) {
    p.what_the_data_show = p.what_the_data_show || {};
    p.what_the_data_show.key_finding = `Official Fed products show high household wealth concentration with product caveats: 2022 SCF median net worth about $192,900; DFA net-worth shares (via FRED, ${lt1.period}) place the bottom 50% near ${pct1(lb50.value)} and the top 1% near ${pct1(lt1.value)}. Baseline W02 asset-share dials (≈5.3% / 28.8%) remain a separate product row.`;
    p.what_the_data_show.critical_numbers = [
      ...(p.what_the_data_show.critical_numbers || []).filter(
        (n) =>
          !String(n.label || "").includes("Bottom 50%") &&
          !String(n.label || "").includes("Top 1%"),
      ),
      {
        label: "Bottom 50% net-worth share",
        value: pct1(lb50.value),
        period: String(lt1.period) + " DFA",
        metric_id: "CC-IND-W02",
        source_id: "CC-SRC-012",
      },
      {
        label: "Top 1% net-worth share",
        value: pct1(lt1.value),
        period: String(lt1.period) + " DFA",
        metric_id: "CC-IND-W02",
        source_id: "CC-SRC-012",
      },
      {
        label: "Bottom 50% / top 1% asset shares (baseline W02)",
        value: "5.3% / 28.8%",
        period: "2026-Q1 DFA assets",
        metric_id: "CC-IND-W02",
        source_id: "CC-SRC-012",
        note: "Asset shares — complementary to net-worth path above",
      },
    ];
  }
  p.last_updated = {
    date: "2026-08-12",
    dataset_or_release: `reddirt ${exportId} Pass 10 FRED/BEA`,
  };
}

// --- RURAL / LOCAL CAPITAL (AR vs US income/GDP contrast) ---
{
  const p = find("CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1");
  const sys = p.evidence_system || {};
  const keep = (sys.series_points || []).filter(
    (s) => !String(s.series_id || "").startsWith("CC-PASS10-FRED"),
  );
  sys.series_points = [
    ...keep,
    {
      series_id: "CC-PASS10-FRED-BEA-US-PCPI",
      label: "BEA US per capita personal income (via FRED)",
      coverage: coverage(usPcpi),
      latest: lUsPcpi ? { period: lUsPcpi.period, value: usd(lUsPcpi.value) } : null,
      points: toPoints(usPcpi, 10, usd),
    },
    {
      series_id: "CC-PASS10-FRED-BEA-AR-PCPI",
      label: "BEA Arkansas per capita personal income (via FRED)",
      coverage: coverage(arPcpi),
      latest: lArPcpi ? { period: lArPcpi.period, value: usd(lArPcpi.value) } : null,
      points: toPoints(arPcpi, 10, usd),
    },
    {
      series_id: "CC-PASS10-FRED-BEA-AR-GDP",
      label: "BEA Arkansas GDP all-industry (via FRED)",
      coverage: coverage(arGdp),
      latest: lArGdp ? { period: lArGdp.period, value: usdBFromMillions(lArGdp.value) } : null,
      points: toPoints(arGdp, 10, usdBFromMillions),
    },
    {
      series_id: "CC-PASS10-FRED-BEA-US-GDP",
      label: "BEA US GDP (via FRED)",
      coverage: coverage(usGdp),
      latest: lUsGdp ? { period: lUsGdp.period, value: usdTFromBillions(lUsGdp.value) } : null,
      points: toPoints(usGdp, 10, usdTFromBillions),
    },
    {
      series_id: "CC-PASS10-FRED-BEA-PERSONAL-SAVING-RATE",
      label: "BEA personal saving rate annual (via FRED)",
      coverage: coverage(save),
      latest: lSave ? { period: lSave.period, value: pct1(lSave.value) } : null,
      points: toPoints(save, 10, pct1),
    },
  ];
  if (lUsPcpi && lArPcpi) {
    const cmp = sys.comparison || [];
    sys.comparison = [
      ...cmp.filter((c) => !String(c.label || "").includes("per capita personal income")),
      {
        label: "Per capita personal income (BEA via FRED)",
        value: `AR ${usd(lArPcpi.value)} vs US ${usd(lUsPcpi.value)} (${lArPcpi.period})`,
        note: "State vs national personal-income levels — not rural-only and not capture evidence.",
      },
    ];
    sys.geography_contrast = [
      ...(sys.geography_contrast || []).filter(
        (g) => !String(g.label || "").includes("Per capita personal income"),
      ),
      {
        label: "Per capita personal income",
        value: `AR ${usd(lArPcpi.value)} vs US ${usd(lUsPcpi.value)} (${lArPcpi.period})`,
        note: "BEA via FRED; complements county NASS structure, does not explain farm consolidation causes.",
      },
    ];
  }
  sys.series_status = "county_nass_and_pass10_fred_bea_bound";
  sys.series_note =
    (sys.series_note || "") +
    " Pass 10 adds BEA/FRED AR–US personal income, GDP, and personal saving rate. Macro structure ≠ capture.";
  p.evidence_system = sys;
  p.last_updated = {
    date: "2026-08-12",
    dataset_or_release: `reddirt ${exportId} Pass 10 FRED/BEA + prior county NASS`,
  };
}

data.pass_10_rule =
  "FRED as distribution channel for Fed DFA net-worth histories and BEA-produced macro series. Bind existing panels only. 0 new panels. Wealth/income structure ≠ market power ≠ political capture.";
data.pass_10_export_id = exportId;
data.pass_10_bound_at = new Date().toISOString();

fs.writeFileSync(panelsPath, JSON.stringify(data, null, 2) + "\n");

const summary = {
  slice_id: "RCIP-PASS-10-FRED-BEA-MACRO-WEALTH-GAPS-1.0",
  export_id: exportId,
  panels_touched: [
    "CC-EP-OWNERSHIP-RETIREMENT-SYSTEM-1",
    "CC-EP-WEALTH-BASELINE-1",
    "CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1",
  ],
  new_panels: 0,
  latest: {
    top1_net_worth: lt1 ? { period: lt1.period, value: pct1(lt1.value) } : null,
    bottom50_net_worth: lb50 ? { period: lb50.period, value: pct1(lb50.value) } : null,
    ar_pcpi: lArPcpi ? { period: lArPcpi.period, value: usd(lArPcpi.value) } : null,
    us_pcpi: lUsPcpi ? { period: lUsPcpi.period, value: usd(lUsPcpi.value) } : null,
    personal_saving_rate: lSave ? { period: lSave.period, value: pct1(lSave.value) } : null,
  },
  coverage: {
    top1: coverage(top1),
    bottom50: coverage(bot50),
    ar_pcpi: coverage(arPcpi),
    saving: coverage(save),
  },
  distinction:
    "FRED/BEA establish macro and wealth-structure histories. They do not by themselves establish market power or political capture.",
  note: "DFA net-worth path bound; asset-share baseline dials retained as complementary. SCF/CBO/markups still blocked.",
};

console.log(JSON.stringify(summary, null, 2));
