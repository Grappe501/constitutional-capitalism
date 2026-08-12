/**
 * CC-PUBLICATION-EVIDENCE-UPGRADE-PASS-9.0 structural deepen bind
 * - FDIC QBP community-bank loan/asset share multi-year paths → rural panel
 * - EIA-861 ownership + reliability (if extracted) → energy panel
 * - HPSA history: explicit gap retention on primary-care panel
 * No new panels. Baseline unchanged.
 */
const fs = require("fs");
const path = require("path");

const panelsPath = "data/project/publication_evidence_panels.json";
const qbpPath = "data/imports/fdic-qbp/community_bank_industry_shares_q1_2026.json";
const eiaPath = "data/imports/eia-861/ownership_reliability_bind.json";
const hpsaHuntPath = "data/imports/hrsa-hpsa/historical_hunt.json";

const data = JSON.parse(fs.readFileSync(panelsPath, "utf8"));
const qbp = JSON.parse(fs.readFileSync(qbpPath, "utf8"));

function find(id) {
  const p = data.panels.find((x) => x.panel_id === id);
  if (!p) throw new Error("missing " + id);
  return p;
}

function upsertSeries(panel, seriesObj) {
  const arr = panel.evidence_system.series_points || [];
  const idx = arr.findIndex((s) => s.series_id === seriesObj.series_id);
  if (idx >= 0) arr[idx] = seriesObj;
  else arr.unshift(seriesObj);
  panel.evidence_system.series_points = arr;
}

function removeMissingContaining(panel, needles) {
  const ml = panel.evidence_system.missing_layers || [];
  panel.evidence_system.missing_layers = ml.filter(
    (m) => !needles.some((n) => String(m).toLowerCase().includes(n.toLowerCase()))
  );
}

function upsertMissing(panel, item) {
  const ml = panel.evidence_system.missing_layers || [];
  if (!ml.some((m) => m === item)) ml.push(item);
  panel.evidence_system.missing_layers = ml;
}

function upsertContrast(panel, label, value, note) {
  const arr = panel.evidence_system.geography_contrast || [];
  const idx = arr.findIndex((x) => x.label === label);
  const row = { label, value, note };
  if (idx >= 0) arr[idx] = row;
  else arr.unshift(row);
  panel.evidence_system.geography_contrast = arr;
}

function upsertHistory(panel, row) {
  const arr = panel.evidence_system.observation_history || [];
  const idx = arr.findIndex((x) => x.label === row.label);
  if (idx >= 0) arr[idx] = row;
  else arr.unshift(row);
  panel.evidence_system.observation_history = arr;
}

function fmtPct(v) {
  return `${Number(v).toFixed(1)}%`;
}

// --- QBP bind ---
const rural = find("CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1");
const loan = qbp.series.loan_share;
const asset = qbp.series.asset_share;
if (!loan || !asset) throw new Error("QBP loan/asset shares missing — run extract_qbp_shares.py");

const loanPts = loan.publication_points_year_end.map((p) => ({
  period: p.period,
  value: fmtPct(p.value),
  geography: "United States",
}));
const assetPts = asset.publication_points_year_end.map((p) => ({
  period: p.period,
  value: fmtPct(p.value),
  geography: "United States",
}));

upsertSeries(rural, {
  series_id: "CC-PASS9-QBP-CB-LOAN-SHARE-US",
  label: "US community-bank share of industry loans & leases (QBP)",
  source: qbp.source,
  source_url: qbp.source_url,
  point_count: loan.point_count,
  coverage: loan.coverage,
  definition_note: qbp.definition_note + " Year-end (Q4) publication sample shown; full quarterly path in import JSON.",
  points: loanPts,
});

upsertSeries(rural, {
  series_id: "CC-PASS9-QBP-CB-ASSET-SHARE-US",
  label: "US community-bank share of industry assets (QBP)",
  source: qbp.source,
  source_url: qbp.source_url,
  point_count: asset.point_count,
  coverage: asset.coverage,
  definition_note: qbp.definition_note + " Companion structure path; not deposit share.",
  points: assetPts,
});

const loanLatest = loan.latest;
const loanYe = loan.year_end_q4 || [];
const loan1984 = loanYe.find((p) => p.year === 1984);
const loan2024 = loanYe.find((p) => p.year === 2024) || loanYe[loanYe.length - 1];

upsertHistory(rural, {
  period: loan.coverage,
  value: `${fmtPct(loan1984?.value ?? loanYe[0]?.value)} → ${fmtPct(loanLatest.value)} (latest ${loanLatest.period})`,
  label: "US QBP community-bank loan & lease share path",
  geography: "US",
  note: "Official FDIC QBP community-bank definition. Not BankFind CB:1.",
});

upsertContrast(rural, "QBP community-bank loan & lease share (US)", `${fmtPct(loanLatest.value)} (${loanLatest.period})`, "Multi-year QBP path bound. Definition differs from BankFind CB:1 deposit snapshot and registry QBP deposit cell.");
upsertContrast(rural, "QBP community-bank asset share (US)", `${fmtPct(asset.latest.value)} (${asset.latest.period})`, "Companion QBP structure path.");

// Deposit share: no labeled section in Q1 2026 Ratios by CB vs NCB workbook
removeMissingContaining(rural, ["PASS5-DEM-FDIC-PATH", "QBP multi-year"]);
upsertMissing(
  rural,
  "FDIC QBP labeled 'Share of Industry Deposits' path — absent from Q1 2026 Time Series 'Ratios by CB vs. NCB' sheet (loan & asset shares bound instead); registry deposit cell 13.1% 2024Q4 retained; BankFind CB:1 AR/US snapshot retained separately"
);

rural.evidence_system.series_note =
  (rural.evidence_system.series_note || "") +
  " Pass 9 structural deepen bound FDIC QBP community-bank industry loan-share and asset-share quarterly paths (1984Q1→latest) from official Time Series Spreadsheet Q1 2026. QBP ≠ BankFind CB:1 ≠ CB_SI:CB. Labeled industry deposit-share section not present in that sheet.";
rural.evidence_system.series_status = "qbp_loan_asset_shares_bound_deposit_section_absent";
rural.last_updated = "2026-08-12";
rural.strength_note =
  "Stronger with official QBP multi-year community-bank loan/asset share paths plus prior FDIC/NASS/FRED arrays. Deposit-share labeled QBP section absent in current workbook — registry/BankFind snapshots retained with definition breaks. Structure ≠ capture.";

// --- HPSA hunt ---
let hpsaHunt = {
  status: "NO_DEFENSIBLE_OFFICIAL_MULTIYEAR_SHARE_SERIES",
  hunted: [
    "HRSA data.hrsa.gov primary-care HPSA downloads",
    "HRSA GIS MapServer current layer (already bound Pass 8)",
    "Federal Register HPSA designation notices (not a stable share series)",
  ],
  rule: "Do not manufacture multi-year population-share arrays from overlapping designation pop sums.",
};
if (fs.existsSync(hpsaHuntPath)) {
  hpsaHunt = JSON.parse(fs.readFileSync(hpsaHuntPath, "utf8"));
}
const pcare = find("CC-EP-PRIMARY-CARE-ACCESS-1");
pcare.evidence_system.series_status = "hrsa_current_snapshot_history_explicitly_missing";
pcare.evidence_system.series_note =
  (pcare.evidence_system.series_note || "") +
  " Pass 9 structural deepen: HPSA historical population-share hunt closed fail-closed — no defensible official multi-year share object found; current GIS snapshot retained; overlapping pop sums not converted to fake shares.";
upsertMissing(
  pcare,
  "HRSA primary-care HPSA population-share multi-year array — PASS5-DEM-HPSA-HISTORY explicitly missing after archived-file hunt (no defensible longitudinal share object)"
);
pcare.last_updated = "2026-08-12";

// --- Energy ---
const energy = find("CC-EP-ENERGY-STRUCTURAL-ENDPOINTS-1");
if (fs.existsSync(eiaPath)) {
  const eia = JSON.parse(fs.readFileSync(eiaPath, "utf8"));
  if (eia.ownership?.ar_latest) {
    const o = eia.ownership;
    upsertSeries(energy, {
      series_id: "CC-PASS9-EIA861-AR-OWNERSHIP-CUSTOMERS",
      label: "Arkansas retail electricity customers by utility ownership (EIA-861)",
      source: "EIA Form EIA-861 Sales to Ultimate Customers",
      source_url: "https://www.eia.gov/electricity/data/eia861/",
      point_count: (o.ar_path || []).length,
      coverage: o.coverage,
      definition_note: "Customer-count shares by ownership code (IOU/muni/coop/other). Not generation ownership; not prosperity-fund returns.",
      points: (o.ar_path || []).map((p) => ({
        period: String(p.year),
        value: p.label,
        geography: "Arkansas",
      })),
    });
    upsertContrast(
      energy,
      "Arkansas retail customers by ownership (latest EIA-861)",
      o.ar_latest.label,
      "Official EIA-861 ownership structure — not reliability and not generation."
    );
    removeMissingContaining(energy, ["RCIP-DEM-0424", "ownership"]);
  }
  if (eia.reliability?.ar_path?.length) {
    const r = eia.reliability;
    upsertSeries(energy, {
      series_id: "CC-PASS9-EIA861-AR-SAIDI",
      label: "Arkansas SAIDI (minutes; EIA-861 reliability / EPA table)",
      source: r.source,
      source_url: r.source_url,
      point_count: r.ar_path.length,
      coverage: r.coverage,
      definition_note: r.definition_note,
      points: r.ar_path.map((p) => ({
        period: String(p.year),
        value: String(p.saidi),
        geography: "Arkansas",
      })),
    });
    if (r.us_path?.length) {
      upsertSeries(energy, {
        series_id: "CC-PASS9-EIA861-US-SAIDI",
        label: "US SAIDI (minutes; EIA-861 reliability / EPA table)",
        source: r.source,
        source_url: r.source_url,
        point_count: r.us_path.length,
        coverage: r.coverage,
        definition_note: r.definition_note,
        points: r.us_path.map((p) => ({
          period: String(p.year),
          value: String(p.saidi),
          geography: "United States",
        })),
      });
    }
    const latest = r.ar_path[r.ar_path.length - 1];
    const usLatest = r.us_path?.[r.us_path.length - 1];
    upsertContrast(
      energy,
      "SAIDI minutes (AR vs US, latest)",
      usLatest ? `AR ${latest.saidi} vs US ${usLatest.saidi} (${latest.year})` : `AR ${latest.saidi} (${latest.year})`,
      "Reliability layer separate from generation/production and from ownership."
    );
    removeMissingContaining(energy, ["RCIP-DEM-0423", "Reliability"]);
  }
  energy.evidence_system.series_status = eia.series_status || "eia861_ownership_reliability_partial";
  energy.evidence_system.series_note =
    (energy.evidence_system.series_note || "") +
    " Pass 9 structural deepen separated generation (MER) from reliability (SAIDI) and ownership (EIA-861 customer shares).";
  // Update NOT ATTACHED contrast
  const gc = energy.evidence_system.geography_contrast || [];
  const idx = gc.findIndex((x) => /ownership \/ reliability/i.test(x.label) || /NOT ATTACHED/i.test(x.value));
  if (idx >= 0) {
    gc[idx] = {
      label: "Arkansas ownership / reliability vs generation",
      value: "OWNERSHIP/RELIABILITY LAYERS ADVANCED WHERE BOUND",
      note: "Generation/production remain MER/retail arrays; do not collapse layers.",
    };
  }
  energy.evidence_system.geography_contrast = gc;
  energy.strength_note =
    "Stronger where EIA-861 ownership and/or SAIDI reliability layers are bound alongside MER generation. Layers remain separated. Prosperity-fund outcomes unproven.";
} else {
  upsertMissing(energy, "Reliability metrics (SAIDI/SAIFI) — RCIP-DEM-0423 pending EIA-861 extract in this pass");
  upsertMissing(energy, "IOU / municipal / cooperative customer-share ownership — RCIP-DEM-0424 pending EIA-861 extract in this pass");
}
energy.last_updated = "2026-08-12";

// panel meta
data.version = data.version || "1.7.0";
data.pass_summary = data.pass_summary || {};
data.pass_summary.structural_deepen_pass9 = {
  date: "2026-08-12",
  qbp_loan_asset_bound: true,
  qbp_deposit_section_absent: true,
  hpsa_history: "explicitly_missing",
  energy_file_present: fs.existsSync(eiaPath),
  panels_total: data.panels.length,
};

fs.writeFileSync(panelsPath, JSON.stringify(data, null, 2) + "\n");
console.log("Bound Pass 9 structural deepen into panels.");
console.log("panels", data.panels.length);
console.log("QBP loan latest", loanLatest);
console.log("QBP asset latest", asset.latest);
console.log("HPSA", hpsaHunt.status);
console.log("EIA bind file", fs.existsSync(eiaPath));
