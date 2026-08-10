#!/usr/bin/env node
/**
 * RCIP-LEGISLATIVE-CIVIC-PUBLICATION-DEMAND-MANIFEST-1.0
 *
 * Demand-driven evidence map: existing CC writing → exact civic/legislative API objects.
 * No wholesale harvest. No CC-side clients. api.data.gov deferred nonblocking.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SLICE_ID = "RCIP-LEGISLATIVE-CIVIC-PUBLICATION-DEMAND-MANIFEST-1.0";
const GENERATED_AT = "2026-08-10";

function readJson(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
}
function writeJson(rel, obj) {
  const abs = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, JSON.stringify(obj, null, 2) + "\n", "utf8");
}
function walk(dirRel, exts) {
  const abs = path.join(ROOT, dirRel);
  if (!fs.existsSync(abs)) return [];
  const out = [];
  const stack = [abs];
  while (stack.length) {
    const cur = stack.pop();
    for (const ent of fs.readdirSync(cur, { withFileTypes: true })) {
      const p = path.join(cur, ent.name);
      if (ent.isDirectory()) {
        if (["node_modules", ".git", ".local", "dist"].includes(ent.name)) continue;
        stack.push(p);
      } else if (exts.some((e) => ent.name.endsWith(e))) out.push(path.relative(ROOT, p).replace(/\\/g, "/"));
    }
  }
  return out.sort();
}

/** Curated demand templates — exact objects RedDirt should ingest when content matches */
const DEMAND_TEMPLATES = [
  {
    template_id: "OPENFEC-CANDIDATE-RECEIPTS-CONCENTRATION",
    source_family: "OPENFEC",
    api_object: "GET /v1/candidates/ + /v1/candidate/{candidate_id}/totals/ (cycle receipts)",
    endpoint: "https://api.open.fec.gov/v1/candidates/",
    fields: ["candidate_id", "name", "party", "office", "state", "district", "cycle", "receipts", "disbursements", "cash_on_hand_end_period"],
    geography: "US (House+Senate)",
    historical_range: "election cycles 2000–present (or longest defensible FEC API coverage)",
    historical_depth_preference: "series_over_snapshot",
    expected_fit: "DIRECT MATCH / refresh for CC-IND-D04; supporting for CC-CLAIM-134",
    contrary_evidence_need: "Compare API totals to FEC weball/bulk statistical summaries; disclose universe differences; do not equate disclosure with capture.",
    intended_visualization: ["distribution", "line_chart", "number_callout", "table"],
    topic_re: /\b(campaign.?financ|political.?money|contribution|receipt|FEC|donor|fundraising|CC-IND-D04|CC-CLAIM-134)\b/i,
    reuse_surfaces_default: ["baseline_dashboard", "national_diagnosis_political_power", "public_reasoning", "democracy_framework", "book_chapters_campaign_finance"],
    priority_boost: 1.0,
  },
  {
    template_id: "OPENFEC-COMMITTEE-TOTALS-SERIES",
    source_family: "OPENFEC",
    api_object: "GET /v1/committee/{committee_id}/totals/",
    endpoint: "https://api.open.fec.gov/v1/committee/{committee_id}/totals/",
    fields: ["committee_id", "committee_name", "committee_type", "cycle", "receipts", "disbursements", "independent_expenditures"],
    geography: "US",
    historical_range: "multi-cycle series where available",
    historical_depth_preference: "series_over_snapshot",
    expected_fit: "SUPPORTING for political-money / IE context; not automatic capture proof",
    contrary_evidence_need: "Separate candidate committees from IE-only/super PAC structures; avoid double-counting.",
    intended_visualization: ["line_chart", "bar_chart", "table"],
    topic_re: /\b(super.?PAC|independent.?expenditure|committee.?total|dark.?money|political.?committee)\b/i,
    reuse_surfaces_default: ["national_diagnosis_political_power", "public_reasoning", "democracy_framework"],
    priority_boost: 0.85,
  },
  {
    template_id: "CONGRESS-BILL-ACTIONS-SPONSORS",
    source_family: "CONGRESS_GOV",
    api_object: "GET /v3/bill/{congress}/{billType}/{billNumber} + actions + cosponsors",
    endpoint: "https://api.congress.gov/v3/bill/",
    fields: ["congress", "type", "number", "title", "sponsors", "cosponsors", "committees", "actions", "introducedDate", "latestAction"],
    geography: "US federal",
    historical_range: "recent congresses with depth for selected bills tied to CC topics (antitrust, agriculture, campaign finance, journalism, citizenship)",
    historical_depth_preference: "bill_history_series_over_single_status",
    expected_fit: "PRIMARY RESEARCH for institutional-design / legislative-history passages",
    contrary_evidence_need: "Bill introduction ≠ enactment; cosponsorship ≠ support strength; preserve failed/stalled bills.",
    intended_visualization: ["timeline", "table", "comparison_matrix"],
    topic_re: /\b(Congress|bill|legislation|sponsor|cosponsor|committee|enact|statute|Article V|antitrust.?as.?constitutional|campaign.?finance.?reform)\b/i,
    reuse_surfaces_default: ["national_diagnosis_democracy", "public_reasoning", "democracy_framework", "book_chapters_political_power", "economic_system_comparison"],
    priority_boost: 0.9,
  },
  {
    template_id: "CONGRESS-MEMBER-BY-STATE",
    source_family: "CONGRESS_GOV",
    api_object: "GET /v3/member?currentMember=true (+ state filter / member detail)",
    endpoint: "https://api.congress.gov/v3/member",
    fields: ["bioguideId", "name", "partyName", "state", "district", "terms", "depiction"],
    geography: "US; Arkansas members prioritized for LCL linkage",
    historical_range: "current membership + term history where available",
    historical_depth_preference: "term_history_when_available",
    expected_fit: "SUPPORTING political geography / accountability pages",
    contrary_evidence_need: "Member roster ≠ voting record or influence; do not infer capture from membership alone.",
    intended_visualization: ["table", "national_map", "number_callout"],
    topic_re: /\b(member of Congress|U\.?S\.? (House|Senate)|representative|senator|Arkansas.?delegation|political geography)\b/i,
    reuse_surfaces_default: ["LCL_community", "democracy_framework", "google_civic_crosswalk", "book_site_theory"],
    priority_boost: 0.75,
  },
  {
    template_id: "CONGRESS-COMMITTEE-STRUCTURE",
    source_family: "CONGRESS_GOV",
    api_object: "GET /v3/committee/{chamber}/{committeeCode}",
    endpoint: "https://api.congress.gov/v3/committee/",
    fields: ["systemCode", "name", "chamber", "subcommittees", "bills"],
    geography: "US federal",
    historical_range: "current congress + prior where API exposes history",
    historical_depth_preference: "committee_workload_over_time_when_available",
    expected_fit: "SUPPORTING legislative-structure / accountability claims",
    contrary_evidence_need: "Committee jurisdiction changes; avoid treating committee existence as proof of capture or reform.",
    intended_visualization: ["table", "comparison_matrix"],
    topic_re: /\b(committee|subcommittee|legislative.?structure|oversight|hearing)\b/i,
    reuse_surfaces_default: ["democracy_framework", "national_diagnosis_democracy", "public_reasoning"],
    priority_boost: 0.7,
  },
  {
    template_id: "OPENSTATES-AR-BILLS",
    source_family: "OPENSTATES",
    api_object: "GET /bills?jurisdiction=Arkansas (+ detail actions/sponsors/votes)",
    endpoint: "https://v3.openstates.org/bills",
    fields: ["id", "identifier", "title", "session", "sponsorships", "actions", "votes", "subject", "classification"],
    geography: "Arkansas",
    historical_range: "longest defensible Arkansas session coverage in Open States v3",
    historical_depth_preference: "multi_session_series",
    expected_fit: "PRIMARY for AR institutional behavior; LCL / journalism accountability",
    contrary_evidence_need: "Bill volume ≠ scrutiny; Open States coverage gaps possible; preserve UNKNOWN where data missing.",
    intended_visualization: ["timeline", "table", "bar_chart"],
    topic_re: /\b(Arkansas|AR-|state.?legislat|Arkleg|LEARNS|state.?bill|preemption|home.?rule)\b/i,
    reuse_surfaces_default: ["LCL_community", "journalism_module", "national_diagnosis_democracy", "public_reasoning", "agriculture_posture"],
    priority_boost: 0.95,
  },
  {
    template_id: "OPENSTATES-AR-LEGISLATORS",
    source_family: "OPENSTATES",
    api_object: "GET /people?jurisdiction=Arkansas",
    endpoint: "https://v3.openstates.org/people",
    fields: ["id", "name", "party", "current_role", "district", "offices", "links"],
    geography: "Arkansas",
    historical_range: "current + prior terms when available",
    historical_depth_preference: "role_history_when_available",
    expected_fit: "SUPPORTING AR political geography / LCL",
    contrary_evidence_need: "Roster ≠ performance; cross-check with official Arkleg when contested.",
    intended_visualization: ["table", "county_map"],
    topic_re: /\b(Arkansas|state.?senate|state.?house|legislator|district|Arkleg)\b/i,
    reuse_surfaces_default: ["LCL_community", "google_civic_crosswalk", "democracy_framework"],
    priority_boost: 0.8,
  },
  {
    template_id: "OPENSTATES-AR-VOTES",
    source_family: "OPENSTATES",
    api_object: "GET /votes?jurisdiction=Arkansas",
    endpoint: "https://v3.openstates.org/votes",
    fields: ["id", "motion_text", "result", "start_date", "counts", "votes", "bill_id"],
    geography: "Arkansas",
    historical_range: "multi-session where available",
    historical_depth_preference: "vote_series_over_single_rollcall",
    expected_fit: "SUPPORTING accountability / journalism coverage comparisons",
    contrary_evidence_need: "Missing vote records must remain UNKNOWN; do not invent contested-race metrics from incomplete votes.",
    intended_visualization: ["table", "timeline", "bar_chart"],
    topic_re: /\b(roll.?call|recorded.?vote|legislative.?transparency|CC-IND-D05|vote.?record)\b/i,
    reuse_surfaces_default: ["journalism_module", "baseline_dashboard", "national_diagnosis_democracy"],
    priority_boost: 0.85,
  },
  {
    template_id: "GOOGLE-CIVIC-ELECTIONS-LIST",
    source_family: "GOOGLE_CIVIC",
    api_object: "GET /civicinfo/v2/elections",
    endpoint: "https://www.googleapis.com/civicinfo/v2/elections",
    fields: ["id", "name", "electionDay", "ocdDivisionId"],
    geography: "US (supported elections only)",
    historical_range: "point-in-time supported elections — capture snapshots over time; not a permanent historical DB",
    historical_depth_preference: "repeated_snapshots_for_supported_elections",
    expected_fit: "SUPPORTING election calendar / civic-information infrastructure",
    contrary_evidence_need: "Coverage incomplete; unsupported addresses/elections must be labeled unavailable.",
    intended_visualization: ["timeline", "table", "number_callout"],
    topic_re: /\b(election|ballot|turnout|voter.?info|polling|civic.?information|CC-IND-D03|HC07)\b/i,
    reuse_surfaces_default: ["journalism_module", "democracy_framework", "baseline_dashboard", "LCL_community"],
    priority_boost: 0.8,
  },
  {
    template_id: "GOOGLE-CIVIC-VOTERINFO-CONTESTS",
    source_family: "GOOGLE_CIVIC",
    api_object: "GET /civicinfo/v2/voterinfo (controlled reference addresses only)",
    endpoint: "https://www.googleapis.com/civicinfo/v2/voterinfo",
    fields: ["election", "contests", "candidates", "referendumTitle", "district", "pollingLocations", "earlyVoteSites", "dropOffLocations", "state.electionAdministrationBody"],
    geography: "Controlled AR reference places (e.g., county seats / LCL anchors) — NEVER residential address warehouse",
    historical_range: "capture at supported election windows; retain dated snapshots",
    historical_depth_preference: "election_window_snapshots_over_time",
    expected_fit: "PRIMARY for ballot complexity / contest counts / election administration maps",
    contrary_evidence_need: "Privacy: controlled addresses only. Coverage gaps honest. Contests≠turnout.",
    intended_visualization: ["table", "number_callout", "comparison_matrix", "county_map"],
    topic_re: /\b(ballot|contest|polling|early.?vot|election.?admin|how much government|uncontested|civic.?information.?infrastructure)\b/i,
    reuse_surfaces_default: ["journalism_module", "LCL_community", "democracy_framework", "public_reasoning", "constitutional_citizenship"],
    priority_boost: 0.95,
  },
  {
    template_id: "GOOGLE-CIVIC-DIVISIONS",
    source_family: "GOOGLE_CIVIC",
    api_object: "GET /civicinfo/v2/divisions",
    endpoint: "https://www.googleapis.com/civicinfo/v2/divisions",
    fields: ["ocdId", "name", "aliases"],
    geography: "Arkansas / LCL OCD divisions",
    historical_range: "current OCD graph; re-query on redistricting cycles",
    historical_depth_preference: "versioned_ocd_snapshots_on_redistricting",
    expected_fit: "SUPPORTING political geography join key to Census/BLS",
    contrary_evidence_need: "OCD IDs are join keys, not performance metrics.",
    intended_visualization: ["county_map", "table"],
    topic_re: /\b(political.?geography|OCD|division|district|redistrict|community.?→.?political)\b/i,
    reuse_surfaces_default: ["LCL_community", "baseline_dashboard", "systems_intelligence_later"],
    priority_boost: 0.7,
  },
  {
    template_id: "CENSUS-CPS-VOTING-CONTEXT",
    source_family: "CENSUS_BLS_PUBLIC_STATISTICS",
    api_object: "Census CPS Voting and Registration / ACS demographics join",
    endpoint: "official_workbook_or_API (existing RCIP hierarchy)",
    fields: ["voting_rate", "registration_rate", "age", "citizenship", "geography", "year"],
    geography: "US + Arkansas (+ county where ACS supports)",
    historical_range: "longest CPS voting series + ACS demographic context",
    historical_depth_preference: "series_over_snapshot",
    expected_fit: "DIRECT/SUPPORTING for CC-IND-D03 / HC07 context around elections",
    contrary_evidence_need: "Self-reported voting overstates; label survey limitations.",
    intended_visualization: ["line_chart", "bar_chart", "number_callout"],
    topic_re: /\b(turnout|voter.?participation|voting.?rate|registration|CC-IND-D03|HC07|civic.?participation)\b/i,
    reuse_surfaces_default: ["baseline_dashboard", "democracy_framework", "constitutional_citizenship", "public_reasoning"],
    priority_boost: 0.9,
  },
  {
    template_id: "CENSUS-ACS-DEMOGRAPHIC-CONTEXT-FOR-POLITICS",
    source_family: "CENSUS_BLS_PUBLIC_STATISTICS",
    api_object: "ACS5 demographics/income/education for political geographies",
    endpoint: "Census API ACS5",
    fields: ["B01003_001E", "B19013_001E", "B15003_*", "geography", "year"],
    geography: "US / AR / county / selected places for LCL",
    historical_range: "multi-year ACS where comparable",
    historical_depth_preference: "multi_year_acs",
    expected_fit: "CONTEXT surrounding institutions — not causal proof of capture",
    contrary_evidence_need: "Socioeconomic context ≠ political causation; label association risks.",
    intended_visualization: ["county_map", "scatterplot", "table"],
    topic_re: /\b(community|county|LCL|West Helena|Lewisville|Rose Bud|rural|local.?accountab|civic.?information)\b/i,
    reuse_surfaces_default: ["LCL_community", "journalism_module", "baseline_dashboard", "community_comparisons"],
    priority_boost: 0.75,
  },
];

const PRIORITY_PATHS = [
  "content/research/national-diagnosis/16-political-and-economic-power.md",
  "content/research/national-diagnosis/22-democracy-representation-and-distributed-government.md",
  "content/research/national-diagnosis/00-overview.md",
  "data/project/democracy_framework.json",
  "data/project/constitutional_citizenship_framework.json",
  "data/project/popular_sovereignty_framework.json",
  "data/project/transparency_framework.json",
  "data/project/research_design_constraint_registry.json",
  "research/phase_2/suffrage_and_civic_education_hypothesis_registry.json",
  "research/phase_2/civic_information_research_hypothesis_registry.json",
  "research/phase_2/hypothesis_registry_political_power.json",
  "content/public-resources/economic-system-comparison.md",
];

function stripFm(md) {
  if (md.startsWith("---")) {
    const end = md.indexOf("\n---", 3);
    if (end !== -1) return md.slice(end + 4);
  }
  return md;
}

function extractPassages(file, text) {
  const body = file.endsWith(".json") ? JSON.stringify(JSON.parse(text), null, 2) : stripFm(text);
  const chunks = [];
  if (file.endsWith(".json")) {
    // claim ledger handled separately
    const paras = body.split(/\n\s*\n/).map((p) => p.replace(/\s+/g, " ").trim()).filter((p) => p.length >= 80);
    for (const p of paras.slice(0, 80)) chunks.push({ section: path.basename(file), statement: p.slice(0, 400) });
    return chunks;
  }
  let section = "Document";
  let buf = [];
  const flush = () => {
    const t = buf.join(" ").replace(/\s+/g, " ").trim();
    if (t.length >= 60) chunks.push({ section, statement: t.slice(0, 450) });
    buf = [];
  };
  for (const line of body.split(/\r?\n/)) {
    const h = line.match(/^#{1,3}\s+(.+)/);
    if (h) {
      flush();
      section = h[1].trim();
    } else buf.push(line);
  }
  flush();
  return chunks;
}

function reuseScore(surfaces, template) {
  const set = new Set([...(surfaces || []), ...(template.reuse_surfaces_default || [])]);
  // chapter + PR + baseline + community = high
  let score = Math.min(1, set.size / 6);
  const bonuses = ["baseline_dashboard", "public_reasoning", "book_chapters", "LCL_community", "national_diagnosis", "democracy_framework", "journalism_module"];
  let hits = 0;
  for (const b of bonuses) {
    if ([...set].some((s) => s.includes(b) || b.includes(s))) hits++;
  }
  score = Math.min(1, score + hits * 0.08);
  return Math.round(score * 1000) / 1000;
}

function rankBand(score) {
  if (score >= 0.75) return "HIGH";
  if (score >= 0.5) return "MEDIUM";
  return "LOW";
}

function main() {
  const opportunities = [];
  const filesScanned = new Set();
  let seq = 0;
  const nextId = () => `LCD-${String(++seq).padStart(4, "0")}`;

  // 1) Claims
  const ledger = readJson("data/research/claim_ledger.json");
  for (const claim of ledger.claims || []) {
    const text = `${claim.claim_text || ""} ${claim.public_wording || ""} ${(claim.opposing_evidence || []).join(" ")}`;
    const matched = DEMAND_TEMPLATES.filter((t) => t.topic_re.test(text));
    if (!matched.length) continue;
    filesScanned.add("data/research/claim_ledger.json");
    for (const t of matched) {
      const surfaces = [
        "claim_ledger",
        ...(claim.chapter_ids || []),
        ...(claim.public_reasoning_ids || []),
        "baseline_dashboard",
        "public_reasoning",
      ];
      const reuse = reuseScore(surfaces, t);
      const priority = Math.round((0.55 * t.priority_boost + 0.45 * reuse) * 1000) / 1000;
      opportunities.push({
        demand_opportunity_id: nextId(),
        content_location: {
          file: "data/research/claim_ledger.json",
          section: claim.claim_id,
          surface_class: "claim_ledger",
        },
        existing_statement: (claim.claim_text || "").slice(0, 450),
        empirical_proposition: claim.claim_text,
        evidence_question: `What ${t.source_family} observations would let a reader evaluate whether ${claim.claim_id} deserves belief?`,
        source_family: t.source_family,
        exact_api_object: t.api_object,
        endpoint: t.endpoint,
        fields_needed: t.fields,
        geography: t.geography,
        historical_range: t.historical_range,
        historical_depth_preference: t.historical_depth_preference,
        expected_fit: t.expected_fit,
        contrary_evidence_need: t.contrary_evidence_need,
        intended_visualization: t.intended_visualization,
        reusable_publication_surfaces: [...new Set([...surfaces, ...t.reuse_surfaces_default])],
        template_id: t.template_id,
        related_claim_ids: [claim.claim_id],
        related_baseline_ids: (text.match(/CC-IND-[A-Z0-9]+/g) || []),
        reuse_potential: reuse,
        priority_score: priority,
        priority: rankBand(priority),
        audit_method: "claim_ledger_match",
      });
    }
  }

  // 2) Priority markdown/json paths + broader scans
  const scanFiles = new Set([
    ...PRIORITY_PATHS,
    ...walk("reports/public_reasoning", [".md"]),
    ...walk("content/public-resources/systems", [".md"]),
    ...walk("research/living_community_laboratories", [".md"]),
    ...walk("content/research/case-studies", [".md"]),
    ...walk("reports/sectoral_dossiers", [".md"]),
    "content/manuscript/part-05/01-when-economic-power-becomes-political-power.md",
    "content/manuscript/part-05/02-campaign-finance-and-corporate-influence.md",
    "content/manuscript/part-05/03-lobbying-transparency-and-regulatory-capture.md",
    "content/manuscript/part-05/06-democratic-participation-in-economic-governance.md",
    "reports/CC_RCIP_LEGISLATIVE_CIVIC_SOURCE_HEALTH_1_0_STATUS.md",
    "data/project/legislative_civic_api_source_families.json",
  ]);

  for (const file of scanFiles) {
    const abs = path.join(ROOT, file);
    if (!fs.existsSync(abs)) continue;
    if (file === "data/research/claim_ledger.json") continue;
    let text;
    try {
      text = fs.readFileSync(abs, "utf8");
    } catch {
      continue;
    }
    filesScanned.add(file);
    const passages = extractPassages(file, text);
    for (const { section, statement } of passages) {
      const matched = DEMAND_TEMPLATES.filter((t) => t.topic_re.test(statement) || t.topic_re.test(section));
      if (!matched.length) continue;
      // skip pure meta
      if (/Developing analytical tool|No invented statistics|gitignored/i.test(statement)) continue;
      for (const t of matched) {
        const surfaceClass = file.includes("national-diagnosis")
          ? "national_diagnosis"
          : file.includes("public_reasoning")
            ? "public_reasoning"
            : file.includes("systems/")
              ? "economic_system"
              : file.includes("framework")
                ? "theory_framework"
                : file.includes("living_community") || file.includes("case-studies")
                  ? "lcl_community"
                  : file.includes("manuscript")
                    ? "manuscript"
                    : file.includes("journalism") || file.includes("civic_information")
                      ? "journalism_module"
                      : "other";
        const surfaces = [surfaceClass, ...t.reuse_surfaces_default];
        if (file.includes("22-democracy") || file.includes("16-political")) {
          surfaces.push("baseline_dashboard", "public_reasoning", "book_chapters");
        }
        const reuse = reuseScore(surfaces, t);
        const central = /Current findings|MISSING|Central|campaign finance|political|democracy|election|ballot/i.test(section);
        const priority = Math.round((0.5 * t.priority_boost + 0.35 * reuse + (central ? 0.15 : 0)) * 1000) / 1000;
        opportunities.push({
          demand_opportunity_id: nextId(),
          content_location: { file, section, surface_class: surfaceClass },
          existing_statement: statement,
          empirical_proposition: statement.slice(0, 280),
          evidence_question: `What exact ${t.source_family} object would strengthen or challenge this passage without overclaiming?`,
          source_family: t.source_family,
          exact_api_object: t.api_object,
          endpoint: t.endpoint,
          fields_needed: t.fields,
          geography: t.geography,
          historical_range: t.historical_range,
          historical_depth_preference: t.historical_depth_preference,
          expected_fit: t.expected_fit,
          contrary_evidence_need: t.contrary_evidence_need,
          intended_visualization: t.intended_visualization,
          reusable_publication_surfaces: [...new Set(surfaces)],
          template_id: t.template_id,
          related_claim_ids: [...new Set(statement.match(/CC-CLAIM-\d+/g) || [])],
          related_baseline_ids: [...new Set(statement.match(/CC-IND-[A-Z0-9]+/g) || [])],
          reuse_potential: reuse,
          priority_score: priority,
          priority: rankBand(priority),
          audit_method: "passage_template_match",
        });
      }
    }
  }

  // Dedup by file|section|template
  const dedup = new Map();
  for (const o of opportunities) {
    const key = `${o.content_location.file}|${o.content_location.section}|${o.template_id}`;
    const prev = dedup.get(key);
    if (!prev || o.priority_score > prev.priority_score) dedup.set(key, o);
  }
  const finalOpps = [...dedup.values()].sort((a, b) => b.priority_score - a.priority_score || b.reuse_potential - a.reuse_potential);
  finalOpps.forEach((o, i) => {
    o.rank = i + 1;
  });

  // Aggregate unique ingest demands for RedDirt
  const demandMap = new Map();
  for (const o of finalOpps) {
    const key = o.template_id;
    if (!demandMap.has(key)) {
      demandMap.set(key, {
        demand_id: `RCIP-LCD-${String(demandMap.size + 1).padStart(3, "0")}`,
        template_id: o.template_id,
        source_family: o.source_family,
        exact_api_object: o.exact_api_object,
        endpoint: o.endpoint,
        fields_needed: o.fields_needed,
        geography: o.geography,
        historical_range: o.historical_range,
        historical_depth_preference: o.historical_depth_preference,
        expected_fit: o.expected_fit,
        contrary_evidence_need: o.contrary_evidence_need,
        intended_visualization: o.intended_visualization,
        supporting_opportunity_ids: [],
        content_files: [],
        reusable_publication_surfaces: new Set(),
        related_claim_ids: new Set(),
        related_baseline_ids: new Set(),
        max_priority_score: 0,
        max_reuse_potential: 0,
        ingest_status: "QUEUED_FOR_TARGETED_INGEST",
      });
    }
    const d = demandMap.get(key);
    d.supporting_opportunity_ids.push(o.demand_opportunity_id);
    if (!d.content_files.includes(o.content_location.file)) d.content_files.push(o.content_location.file);
    for (const s of o.reusable_publication_surfaces) d.reusable_publication_surfaces.add(s);
    for (const c of o.related_claim_ids || []) d.related_claim_ids.add(c);
    for (const b of o.related_baseline_ids || []) d.related_baseline_ids.add(b);
    d.max_priority_score = Math.max(d.max_priority_score, o.priority_score);
    d.max_reuse_potential = Math.max(d.max_reuse_potential, o.reuse_potential);
  }

  const demands = [...demandMap.values()]
    .map((d) => ({
      ...d,
      reusable_publication_surfaces: [...d.reusable_publication_surfaces],
      related_claim_ids: [...d.related_claim_ids],
      related_baseline_ids: [...d.related_baseline_ids],
      supporting_opportunity_count: d.supporting_opportunity_ids.length,
      supporting_opportunity_ids: d.supporting_opportunity_ids.slice(0, 60),
      content_files: d.content_files.slice(0, 40),
      reuse_potential: d.max_reuse_potential,
      priority_score: Math.round((0.55 * d.max_priority_score + 0.45 * d.max_reuse_potential) * 1000) / 1000,
      priority: rankBand(0.55 * d.max_priority_score + 0.45 * d.max_reuse_potential),
    }))
    .sort((a, b) => b.priority_score - a.priority_score || b.supporting_opportunity_count - a.supporting_opportunity_count);

  const byFamily = {};
  for (const d of demands) {
    byFamily[d.source_family] = (byFamily[d.source_family] || 0) + 1;
  }
  const bySurface = {};
  for (const o of finalOpps) {
    bySurface[o.content_location.surface_class] = (bySurface[o.content_location.surface_class] || 0) + 1;
  }

  const top25 = finalOpps.slice(0, 25);
  const topIngest = demands.filter((d) => d.priority === "HIGH").slice(0, 12);

  const manifest = {
    version: "1.0.0",
    slice_id: SLICE_ID,
    generated_at: GENERATED_AT,
    title: "RCIP Legislative/Civic Publication Demand Manifest",
    governing_rules: [
      "Demand-driven, not source-driven.",
      "API availability is not evidence relevance.",
      "No wholesale Congress/FEC/Open States ingestion.",
      "No new CC-side API clients.",
      "When a reliable time series exists, prefer the defensible series over a single current snapshot.",
      "api.data.gov remains DEFERRED_NONBLOCKING — excluded from ingest queue.",
    ],
    source_health_inputs: {
      CONGRESS_GOV: "LIVE_USABLE",
      OPENFEC: "LIVE_USABLE",
      OPENSTATES: "LIVE_USABLE",
      GOOGLE_CIVIC: "SEPARATE_FAMILY_ELIGIBLE",
      CENSUS_BLS_PUBLIC_STATISTICS: "SEPARATE_SPINE_LIVE",
      API_DOT_GOV: "DEFERRED_NONBLOCKING",
    },
    relationship_schema: [
      "content_location",
      "empirical_proposition",
      "evidence_question",
      "source_family",
      "exact_api_object",
      "fields_needed",
      "geography",
      "historical_range",
      "expected_fit",
      "contrary_evidence_need",
      "historical_depth_preference",
      "intended_visualization",
      "reusable_publication_surfaces",
      "reuse_potential",
    ],
    summary: {
      files_scanned: filesScanned.size,
      demand_opportunities: finalOpps.length,
      unique_ingest_demands: demands.length,
      high_priority_opportunities: finalOpps.filter((o) => o.priority === "HIGH").length,
      by_source_family: byFamily,
      by_surface_class: bySurface,
    },
    next_ingest_queue: topIngest.map((d) => ({
      demand_id: d.demand_id,
      template_id: d.template_id,
      source_family: d.source_family,
      exact_api_object: d.exact_api_object,
      priority: d.priority,
      reuse_potential: d.reuse_potential,
      supporting_opportunity_count: d.supporting_opportunity_count,
      historical_depth_preference: d.historical_depth_preference,
    })),
    demands,
    top_25_opportunity_ids: top25.map((o) => o.demand_opportunity_id),
  };

  const contentMap = {
    version: "1.0.0",
    slice_id: SLICE_ID,
    generated_at: GENERATED_AT,
    note: "Source-to-content map for legislative/civic demand opportunities. One canonical observation should serve multiple surfaces when relevant.",
    opportunities: finalOpps,
  };

  writeJson("data/project/RCIP_LEGISLATIVE_CIVIC_PUBLICATION_DEMAND_MANIFEST.json", manifest);
  writeJson("data/project/legislative_civic_source_to_content_map.json", contentMap);
  writeJson("data/project/legislative_civic_demand_top25.json", {
    version: "1.0.0",
    slice_id: SLICE_ID,
    generated_at: GENERATED_AT,
    items: top25,
    next_ingest_queue: topIngest,
  });

  console.log(
    JSON.stringify(
      {
        ok: true,
        files_scanned: filesScanned.size,
        opportunities: finalOpps.length,
        unique_demands: demands.length,
        high: finalOpps.filter((o) => o.priority === "HIGH").length,
        byFamily,
        next_ingest: topIngest.map((d) => d.template_id),
      },
      null,
      2
    )
  );
}

main();
