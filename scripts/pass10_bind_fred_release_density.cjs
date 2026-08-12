/**
 * RCIP-PASS-10-FRED-RELEASE-OBSERVATIONS-DENSITY-1.0 bind.
 * Z.1 demand-filtered densify into existing panels. 0 new panels.
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

function seriesById(id) {
  return (
    arrays.series.find((s) => s.consumer_metric_id === id && s.geography_id === "geo:us") ||
    arrays.series.find((s) => s.consumer_metric_id === id && s.geography_id === "nation") ||
    arrays.series.find((s) => s.consumer_metric_id === id)
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

function toPoints(series, max = 12, format = (v) => String(v)) {
  if (!series) return [];
  const pts = series.points
    .filter((p) => p.value != null && Number.isFinite(Number(p.value)))
    .map((p) => ({
      period: String(p.period),
      value: format(Number(p.value)),
      geography: series.geography_name || series.geography_id,
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

function usdM(v) {
  // Z.1 levels are millions of USD
  const n = Number(v);
  if (Math.abs(n) >= 1_000_000) return "$" + (n / 1_000_000).toFixed(1) + "T";
  if (Math.abs(n) >= 1_000) return "$" + (n / 1_000).toFixed(1) + "B";
  return "$" + Math.round(n).toLocaleString("en-US") + "M";
}

function find(id) {
  const p = data.panels.find((x) => x.panel_id === id);
  if (!p) throw new Error("missing " + id);
  return p;
}

function row(id, label, note) {
  const series = seriesById(id);
  if (!series?.points?.length) return null;
  const last = latest(series);
  return {
    series_id: id,
    label,
    coverage: coverage(series),
    latest: last ? { period: last.period, value: usdM(last.value) } : null,
    points: toPoints(series, 12, usdM),
    producer: "Board of Governors of the Federal Reserve System (Z.1 via FRED)",
    note,
  };
}

const required = [
  "CC-PASS10-Z1-HH-NET-WORTH",
  "CC-PASS10-Z1-HH-DEBT-SECURITIES-LOANS",
  "CC-PASS10-Z1-HH-CONSUMER-CREDIT",
  "CC-PASS10-Z1-NFC-NET-WORTH",
  "CC-PASS10-Z1-CORPORATE-FARM-NET-WORTH",
];
for (const id of required) {
  if (!seriesById(id)?.points?.length) {
    throw new Error(`Missing Z.1 series ${id} — import exp_5da8b3fe67d94923 first`);
  }
}

const wealthRows = [
  row(
    "CC-PASS10-Z1-HH-NET-WORTH",
    "Household + nonprofit net worth (Z.1 level)",
    "Balance-sheet stock; complements DFA distribution shares. Not ownership remedy.",
  ),
  row(
    "CC-PASS10-Z1-HH-DEPOSITS",
    "Household + nonprofit currency & deposits incl. MMF (Z.1)",
    "Liquid asset stock only.",
  ),
  row(
    "CC-PASS10-Z1-HH-DEBT-SECURITIES-LOANS",
    "Household + nonprofit debt securities & loans liability (Z.1)",
    "Liability stock; not distress or capture.",
  ),
  row(
    "CC-PASS10-Z1-HH-CONSUMER-CREDIT",
    "Household + nonprofit consumer credit liability (Z.1)",
    "Consumer credit stock only.",
  ),
].filter(Boolean);

const ownershipRows = [
  row(
    "CC-PASS10-Z1-NFC-NET-WORTH",
    "Nonfinancial corporate business net worth (Z.1)",
    "Corporate balance-sheet net worth ≠ worker/local ownership.",
  ),
  row(
    "CC-PASS10-Z1-NFC-DEBT-SECURITIES",
    "Nonfinancial corporate debt securities liability excl. EREITs (Z.1)",
    "Corporate leverage structure; not market power proof.",
  ),
  row(
    "CC-PASS10-Z1-NFC-CORPORATE-EQUITIES",
    "Nonfinancial corporate equities liability excl. EREITs (Z.1)",
    "Equity liability stock; not concentration of control.",
  ),
].filter(Boolean);

const ruralRows = [
  row(
    "CC-PASS10-Z1-CORPORATE-FARM-NET-WORTH",
    "Corporate farm business net worth (Z.1)",
    "National farm corporate NW; not county structure (use NASS for counties).",
  ),
  row(
    "CC-PASS10-Z1-NONCORP-FARM-PROPRIETORS-EQUITY",
    "Noncorporate farm proprietors' equity (Z.1)",
    "National noncorporate farm equity; complements BEA farm income, not NASS ops.",
  ),
  row(
    "CC-PASS10-Z1-HH-MORTGAGES-LIAB",
    "Household 1–4 family residential mortgages liability (Z.1)",
    "Mortgage liability stock; not local housing prosperity.",
  ),
].filter(Boolean);

function upsertBlock(panel, blockId, title, rows, epistemic) {
  if (!panel.evidence_blocks) panel.evidence_blocks = [];
  const idx = panel.evidence_blocks.findIndex((b) => b.block_id === blockId);
  const block = {
    block_id: blockId,
    title,
    source_channel: "FRED v2 release/observations + Z.1 aliases",
    producer: "Board of Governors of the Federal Reserve System (Z.1)",
    export_id: exportId,
    retrieved_for_slice: "RCIP-PASS-10-FRED-RELEASE-OBSERVATIONS-DENSITY-1.0",
    rows,
    epistemic_note: epistemic,
  };
  if (idx >= 0) panel.evidence_blocks[idx] = { ...panel.evidence_blocks[idx], ...block };
  else panel.evidence_blocks.push(block);
  panel.updated_at = "2026-08-12";
  panel.last_export_id = exportId;
}

const wealth = find("CC-EP-WEALTH-BASELINE-1");
upsertBlock(
  wealth,
  "z1-hh-balance-sheet-release",
  "Z.1 household/nonprofit balance-sheet stocks (FRED release densify)",
  wealthRows,
  "Z.1 levels are aggregate stocks. They do not measure distribution alone (use DFA shares) and do not establish capture.",
);

const ownership = find("CC-EP-OWNERSHIP-RETIREMENT-SYSTEM-1");
upsertBlock(
  ownership,
  "z1-nfc-balance-sheet-release",
  "Z.1 nonfinancial corporate balance-sheet stocks (FRED release densify)",
  ownershipRows,
  "Corporate net worth / debt / equity liabilities ≠ employee ownership or local ownership.",
);

const rural = find("CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1");
upsertBlock(
  rural,
  "z1-farm-balance-sheet-release",
  "Z.1 farm-sector balance-sheet stocks (FRED release densify)",
  ruralRows,
  "National Z.1 farm stocks complement county NASS structure and BEA farm income; they are not local prosperity or causation evidence.",
);

fs.writeFileSync(panelsPath, JSON.stringify(data, null, 2) + "\n");

const hhNw = latest(seriesById("CC-PASS10-Z1-HH-NET-WORTH"));
const nfcNw = latest(seriesById("CC-PASS10-Z1-NFC-NET-WORTH"));
const farmNw = latest(seriesById("CC-PASS10-Z1-CORPORATE-FARM-NET-WORTH"));

console.log(
  JSON.stringify(
    {
      slice_id: "RCIP-PASS-10-FRED-RELEASE-OBSERVATIONS-DENSITY-1.0",
      export_id: exportId,
      panels_touched: [
        "CC-EP-WEALTH-BASELINE-1",
        "CC-EP-OWNERSHIP-RETIREMENT-SYSTEM-1",
        "CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1",
      ],
      new_panels: 0,
      latest: {
        hh_net_worth: hhNw ? { period: hhNw.period, value: usdM(hhNw.value) } : null,
        nfc_net_worth: nfcNw ? { period: nfcNw.period, value: usdM(nfcNw.value) } : null,
        corporate_farm_net_worth: farmNw
          ? { period: farmNw.period, value: usdM(farmNw.value) }
          : null,
      },
      distinction:
        "Z.1 balance-sheet structure histories ≠ worker/local ownership, market power, county prosperity, or political capture.",
    },
    null,
    2,
  ),
);
