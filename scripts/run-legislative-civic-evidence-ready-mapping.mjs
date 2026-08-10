#!/usr/bin/env node
/**
 * Map targeted legislative/civic ingest objects → which of the 289 demand
 * opportunities are now evidence-ready (no page rewrites in this slice).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function readJson(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
}
function writeJson(rel, obj) {
  const abs = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, JSON.stringify(obj, null, 2) + "\n", "utf8");
}

const exportPack = readJson("data/imports/reddirt-legislative-civic/legislative-civic-export.json");
const contentMap = readJson("data/project/legislative_civic_source_to_content_map.json");
const opportunities = contentMap.opportunities || [];

const ingestedTemplates = new Set(exportPack.objects.map((o) => o.template_id));
const objectsByTemplate = {};
for (const o of exportPack.objects) {
  if (!objectsByTemplate[o.template_id]) objectsByTemplate[o.template_id] = [];
  objectsByTemplate[o.template_id].push(o.object_id);
}

function objectSupportStatus(sample) {
  if (!sample) return "NOT_YET";
  if (sample.object_type === "reuse_pointer") {
    return {
      status: "PARTIAL_READY",
      reason: "Reuse pointer to prior CPS/HC07 export — bindable but not re-ingested in this package.",
    };
  }
  if (sample.retrieval_status === "ip_restricted") {
    return {
      status: "PARTIAL_READY",
      reason: "Provenance path present; Google Civic key IP-restricted for this runtime — re-run from allowed machine.",
    };
  }
  if (typeof sample.retrieval_status === "string" && sample.retrieval_status.startsWith("http_")) {
    return {
      status: "PARTIAL_READY",
      reason: `API retrieval failed (${sample.retrieval_status}); object shell retained for provenance.`,
    };
  }
  const m = sample.metrics || {};
  const emptyChecks = [
    ["sampled_bill_count", m.sampled_bill_count],
    ["legislator_count", m.legislator_count],
    ["sampled_vote_count", m.sampled_vote_count],
    ["places_with_contests", m.places_with_contests],
    ["supported_election_count", m.supported_election_count],
    ["division_result_count", m.division_result_count],
  ];
  for (const [field, value] of emptyChecks) {
    if (field in m && (!value || value === 0)) {
      return {
        status: "PARTIAL_READY",
        reason: `Provenance path present but payload empty (${field}=0). Election-window / API query follow-up needed before publication bind.`,
      };
    }
  }
  // Positive support signals
  if (typeof m.top_decile_share_of_receipts === "number") {
    return { status: "EVIDENCE_READY", reason: "Multi-cycle OpenFEC receipts concentration metrics present." };
  }
  if ((m.current_member_sample_count || 0) > 0 || (m.sampled_house_committee_count || 0) > 0) {
    return { status: "EVIDENCE_READY", reason: "Congress sample payload non-empty." };
  }
  if ((m.sampled_bill_count || 0) > 0 && sample.source_family === "CONGRESS_GOV") {
    return { status: "EVIDENCE_READY", reason: "Congress bill sample payload non-empty." };
  }
  if ((m.population || 0) > 0 || (m.median_household_income || 0) > 0) {
    return { status: "EVIDENCE_READY", reason: "ACS context metrics present." };
  }
  if ((m.places_with_contests || 0) > 0 || (m.supported_election_count || 0) > 0 || (m.division_result_count || 0) > 0) {
    return { status: "EVIDENCE_READY", reason: "Google Civic payload non-empty." };
  }
  if ((m.sampled_bill_count || 0) > 0 || (m.legislator_count || 0) > 0 || (m.sampled_vote_count || 0) > 0) {
    return { status: "EVIDENCE_READY", reason: "Open States payload non-empty." };
  }
  return {
    status: "PARTIAL_READY",
    reason: "Object present with provenance but insufficient metric payload for direct publication bind.",
  };
}

const readiness = {
  EVIDENCE_READY: [],
  PARTIAL_READY: [],
  NOT_YET: [],
};

const reasonByTemplate = {};

for (const opp of opportunities) {
  const objs = objectsByTemplate[opp.template_id] || [];
  if (!objs.length) {
    readiness.NOT_YET.push(opp.demand_opportunity_id);
    continue;
  }
  const samples = exportPack.objects.filter((o) => o.template_id === opp.template_id);
  // Prefer any non-empty sibling object for the same template
  let best = { status: "PARTIAL_READY", reason: "No usable sample." };
  for (const sample of samples) {
    const result = objectSupportStatus(sample);
    if (result.status === "EVIDENCE_READY") {
      best = result;
      break;
    }
    best = result;
  }
  reasonByTemplate[opp.template_id] = best.reason;

  const row = {
    demand_opportunity_id: opp.demand_opportunity_id,
    template_id: opp.template_id,
    source_family: opp.source_family,
    content_file: opp.content_location.file,
    content_section: opp.content_location.section,
    surface_class: opp.content_location.surface_class,
    reuse_potential: opp.reuse_potential,
    priority: opp.priority,
    status: best.status,
    readiness_reason: best.reason,
    supporting_object_ids: objs,
    expected_fit: opp.expected_fit,
    contrary_evidence_need: opp.contrary_evidence_need,
  };
  readiness[best.status].push(row);
}

const bySurface = {};
for (const status of Object.keys(readiness)) {
  for (const r of readiness[status]) {
    const k = r.surface_class;
    bySurface[k] = bySurface[k] || { EVIDENCE_READY: 0, PARTIAL_READY: 0, NOT_YET: 0 };
    bySurface[k][status]++;
  }
}

const byFamily = {};
for (const status of Object.keys(readiness)) {
  for (const r of readiness[status]) {
    const k = r.source_family;
    byFamily[k] = byFamily[k] || { EVIDENCE_READY: 0, PARTIAL_READY: 0, NOT_YET: 0 };
    byFamily[k][status]++;
  }
}

const highReuseReady = readiness.EVIDENCE_READY.filter((r) => (r.reuse_potential || 0) >= 0.85).length;

const report = {
  version: "1.0.0",
  slice_id: "RCIP-LEGISLATIVE-CIVIC-TARGETED-INGEST-1.0",
  generated_at: "2026-08-10",
  export_id: exportPack.export_id,
  success_criterion:
    "How many existing CC passages, claims, baselines, Public Reasoning records, and comparison pages become directly supportable from these targeted civic/legislative ingest objects?",
  note: "No page rewrites in this slice — mapping only. Next: publication evidence-upgrade pass on highest-reuse EVIDENCE_READY items.",
  ingested_templates: [...ingestedTemplates],
  object_count: exportPack.objects.length,
  opportunity_total: opportunities.length,
  template_readiness_notes: reasonByTemplate,
  summary: {
    EVIDENCE_READY: readiness.EVIDENCE_READY.length,
    PARTIAL_READY: readiness.PARTIAL_READY.length,
    NOT_YET: readiness.NOT_YET.length,
    evidence_ready_share: Math.round((readiness.EVIDENCE_READY.length / Math.max(opportunities.length, 1)) * 1000) / 10,
    high_reuse_evidence_ready: highReuseReady,
    directly_supportable_plus_partial: readiness.EVIDENCE_READY.length + readiness.PARTIAL_READY.length,
  },
  by_surface_class: bySurface,
  by_source_family: byFamily,
  evidence_ready: readiness.EVIDENCE_READY,
  partial_ready: readiness.PARTIAL_READY,
  not_yet_ids: readiness.NOT_YET,
};

writeJson("data/imports/reddirt-legislative-civic/evidence-ready-mapping.json", report);
writeJson("data/project/legislative_civic_evidence_ready_mapping.json", report);

console.log(JSON.stringify({ ok: true, export_id: report.export_id, summary: report.summary, bySurface, byFamily }, null, 2));
