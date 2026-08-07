/**
 * CC-PHASE-2.1-SECTORAL-POLITICAL-INFLUENCE-AND-CAPTURE-EVIDENCE-DOSSIERS-1.0
 *
 * - Register designated Arkansas research geography set + selection rule
 * - Do NOT redo Faulkner leakage pilot
 * - Build sectoral influence/capture dossiers (no forced geography)
 * - Update CC-HYP-003-D; public reasoning; honest claim posture
 */
import fs from "node:fs";
import path from "node:path";
import { r } from "./lib/paths.mjs";

const TODAY = "2026-08-07";
const SLICE =
  "CC-PHASE-2.1-SECTORAL-POLITICAL-INFLUENCE-AND-CAPTURE-EVIDENCE-DOSSIERS-1.0";
const ADJUDICATOR = "ChatGPT";
const DECISION_ID = "CC-DEC-103";

function writeJson(rel, obj) {
  const p = r(rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + "\n");
  console.log("[OK]", rel);
}
function writeText(rel, text) {
  const p = r(rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, text.endsWith("\n") ? text : text + "\n");
  console.log("[OK]", rel);
}

const srcDoc = JSON.parse(fs.readFileSync(r("data/research/source_registry.json"), "utf8"));
const claimDoc = JSON.parse(fs.readFileSync(r("data/research/claim_ledger.json"), "utf8"));
const rqDoc = JSON.parse(fs.readFileSync(r("data/research/research_questions.json"), "utf8"));
const kgDoc = JSON.parse(fs.readFileSync(r("data/research/knowledge_graph.json"), "utf8"));
const checklist = JSON.parse(
  fs.readFileSync(r("data/project/phase2_acceptance_checklist.json"), "utf8")
);
const priorMatrix = JSON.parse(
  fs.readFileSync(r("research/phase_2/first_20_claim_evidence_matrix.json"), "utf8")
);
const hypDoc = JSON.parse(
  fs.readFileSync(r("research/phase_2/hypothesis_registry_political_power.json"), "utf8")
);
const prRegistry = JSON.parse(
  fs.readFileSync(r("research/phase_2/public_reasoning_registry.json"), "utf8")
);
const domainMatrix = JSON.parse(
  fs.readFileSync(r("research/phase_2/priority_domain_research_matrix.json"), "utf8")
);
const buildState = JSON.parse(fs.readFileSync(r("data/project/current_build_state.json"), "utf8"));
const sliceQueue = JSON.parse(fs.readFileSync(r("data/project/slice_queue.json"), "utf8"));

const beforeWeak = priorMatrix.weak_fit_below_strong ?? 8;
const beforeStrong = priorMatrix.direct_strong_fit ?? 11;

function claim(id) {
  return claimDoc.claims.find((c) => c.claim_id === id);
}

// ============================================================================
// 1. Arkansas designated research geography set + selection rule
// ============================================================================

const geoSet = {
  version: "1.0.0",
  slice_id: SLICE,
  generated_at: TODAY,
  status: "ACTIVE_SELECTION_PREFERENCE",
  architecture_note:
    "Sampling preference for geographic research questions — not LCL field launch, not new platform.",
  rule: "Prefer the designated Arkansas research geography set when one or more locations provide a methodologically appropriate sample. Select by research question, data quality, contrast value, and replicability—not by the result we expect to find. Document why the location was selected and why the other candidates were not necessary.",
  paired_comparison_future:
    "Eventually construct paired comparisons (e.g., high-growth Benton County vs structurally challenged rural/Delta geography) to investigate why the same state-level institutional environment produces radically different local outcomes.",
  do_not_redo: {
    geography: "Faulkner County, Arkansas",
    reason:
      "Negative/not-measurable leakage pilot result is valuable intellectual history; do not repeat immediately for lower research value."
  },
  this_slice_geography_required: false,
  this_slice_note:
    "Sectoral capture/influence dossiers are national/sector literature questions — no Arkansas geography forced.",
  locations: [
    {
      id: "AR-GEO-JACKSONVILLE",
      name: "Jacksonville, Arkansas",
      type: "municipality",
      contrast_role: "suburban / military-linked municipal systems",
      counties: ["Pulaski"]
    },
    {
      id: "AR-GEO-SEARCY-COUNTY",
      name: "Searcy County, Arkansas",
      type: "county",
      fips: "05129",
      contrast_role: "very rural conditions"
    },
    {
      id: "AR-GEO-LAFAYETTE-COUNTY",
      name: "Lafayette County, Arkansas",
      type: "county",
      fips: "05073",
      contrast_role: "very rural conditions"
    },
    {
      id: "AR-GEO-HOT-SPRINGS-VILLAGE",
      name: "Hot Springs Village, Arkansas",
      type: "planned_community",
      contrast_role: "unusual retirement/community structure crossing county boundaries",
      counties: ["Garland", "Saline"]
    },
    {
      id: "AR-GEO-WEST-HELENA",
      name: "West Helena / Helena-West Helena, Arkansas",
      type: "municipality",
      contrast_role: "Delta urban/rural economic distress",
      counties: ["Phillips"]
    },
    {
      id: "AR-GEO-PULASKI-COUNTY",
      name: "Pulaski County, Arkansas",
      type: "county",
      fips: "05119",
      contrast_role: "state metropolitan / government center"
    },
    {
      id: "AR-GEO-BENTON-COUNTY",
      name: "Benton County, Arkansas",
      type: "county",
      fips: "05007",
      contrast_role: "high-growth / high-income economic development"
    },
    {
      id: "AR-GEO-MISSISSIPPI-COUNTY",
      name: "Mississippi County, Arkansas",
      type: "county",
      fips: "05093",
      contrast_role: "agriculture / industry and major industrial investment"
    }
  ]
};

writeJson("research/phase_2/arkansas_designated_research_geography_set.json", geoSet);
writeText(
  "reports/CC_ARKANSAS_DESIGNATED_RESEARCH_GEOGRAPHY_SET_1_0.md",
  `# Arkansas Designated Research Geography Set 1.0

**Status:** Active sampling preference when a research question requires geography.  
**Not:** automatic LCL launch · forced sample for every study · result-shopping.

## Selection rule

> Prefer the designated Arkansas research geography set when one or more locations provide a methodologically appropriate sample. Select by research question, data quality, contrast value, and replicability—not by the result we expect to find. Document why the location was selected and why the other candidates were not necessary.

## The eight locations

| ID | Place | Contrast role |
|---|---|---|
${geoSet.locations.map((l) => `| ${l.id} | ${l.name} | ${l.contrast_role} |`).join("\n")}

## Future paired comparisons

Example: Benton County (high-growth) vs a Delta/rural distressed geography — same state institutional environment, different local outcomes.

## Faulkner County

Prior leakage pilot remains in the record. **Do not redo immediately.**
`
);

// ============================================================================
// 2. Sources for sectoral dossiers
// ============================================================================

const newSources = [
  {
    source_id: "CC-SRC-105",
    title:
      "Does Private Money Buy Public Policy? Campaign Contributions and Regulatory Outcomes in Telecommunications",
    authors: ["Rui J. P. de Figueiredo", "Geoff Edwards"],
    year: 2007,
    url: "https://doi.org/10.1111/j.1530-9134.2007.00150.x",
    source_type: "peer_reviewed",
    reliability: "scholarly_primary_analysis",
    primary_or_secondary: "secondary",
    jurisdiction: "US-state",
    research_domain: "political_economic_power",
    publication_date: "2007",
    retrieval_date: TODAY,
    summary:
      "Journal of Economics & Management Strategy study linking campaign contributions from competing local telecom interests to measurable state public utility commission regulatory outcomes. Finds a significant association between private money mix and regulatory outcomes, robust to multiple specifications; argues omitted-variable bias would need to be extreme to erase the result. Sectoral evidence of political money associating with regulatory outcomes — not national state capture from economic concentration.",
    key_findings: [
      "Campaign contributions associated with measurable telecom PUC regulatory outcomes",
      "Uses policy outcomes rather than only legislative roll-call votes"
    ],
    limitations:
      "State telecom PUC context; observational identification debates remain; does not prove nationwide capture or that market concentration causes democratic failure.",
    ideological_or_institutional_considerations: "Peer-reviewed industrial organization / political economy.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "TELECOM dossier — ASSOCIATIONAL / contested causal strength; avoid 'buy/owns/determines' overclaim in CC wording."
  },
  {
    source_id: "CC-SRC-106",
    title: "Bank Lobbying: Regulatory Capture and Beyond",
    authors: ["Deniz Igan", "Thomas Lambert"],
    year: 2019,
    url: "https://doi.org/10.5089/9781484347546.001",
    source_type: "working_paper",
    reliability: "scholarly_secondary",
    primary_or_secondary: "secondary",
    jurisdiction: "US",
    research_domain: "political_economic_power",
    publication_date: "2019-08",
    retrieval_date: TODAY,
    summary:
      "IMF working paper surveying motivations and empirical evidence on bank lobbying. Argues findings are consistent with regulatory capture that lessens support for tighter rules/enforcement and can enable riskier practices; also notes motivation identification is hard and does not call for an outright lobbying ban. Sectoral synthesis — not a single causal identification of national capture.",
    key_findings: [
      "LDA-era bank lobbying literature often consistent with capture-like patterns",
      "Motivation (information vs influence) hard to pin down empirically"
    ],
    limitations:
      "IMF WP survey/synthesis; not peer-reviewed journal article; capture language in title/abstract must not be imported wholesale into CC claims without sector wording discipline.",
    ideological_or_institutional_considerations: "IMF staff working paper.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "BANKING dossier — ASSOCIATIONAL / interpretive capture-consistency; pair with contrary revolving-door evidence."
  },
  {
    source_id: "CC-SRC-107",
    title: "The Revolving Door and Worker Flows in Banking Regulation",
    authors: ["David Lucca", "Amit Seru", "Francesco Trebbi"],
    year: 2014,
    url: "https://doi.org/10.1016/j.jmoneco.2014.04.006",
    source_type: "peer_reviewed",
    reliability: "scholarly_primary_analysis",
    primary_or_secondary: "secondary",
    jurisdiction: "US",
    research_domain: "political_economic_power",
    publication_date: "2014",
    retrieval_date: TODAY,
    summary:
      "Journal of Monetary Economics analysis of career transitions of U.S. banking regulators. Finds patterns inconsistent with a simple quid-pro-quo revolving-door capture story and more consistent with a 'regulatory schooling' hypothesis; enforcement intensity relates to both inflows and outflows. Direct contrary check against blanket revolving-door = capture claims in banking.",
    key_findings: [
      "Revolving-door flows in banking regulation do not cleanly support quid-pro-quo capture",
      "Regulatory schooling / expertise interpretation more consistent with observed flows"
    ],
    limitations:
      "Banking regulators specifically; does not erase all lobbying-outcome associations in finance; different mechanisms possible.",
    ideological_or_institutional_considerations: "Peer-reviewed monetary economics / Fed staff research lineage.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "BANKING dossier — CONTRARY to simple revolving-door capture narrative."
  },
  {
    source_id: "CC-SRC-108",
    title:
      "Power Play: Political Contributions and Regulatory Capture in the Electric Utility Industry",
    authors: ["Mark Van Orden"],
    year: 2023,
    url: "https://www.thecgo.org/wp-content/uploads/2023/10/Power-Play-Political-Contributions_02.pdf",
    source_type: "working_paper",
    reliability: "scholarly_secondary",
    primary_or_secondary: "secondary",
    jurisdiction: "US-state",
    research_domain: "political_economic_power",
    publication_date: "2023",
    retrieval_date: TODAY,
    summary:
      "Working paper exploiting 2005 PUHCA repeal that legalized certain electric-utility campaign contributions in some states but not others. Estimates association between eased contribution restrictions and authorized returns on equity, interpreting results as consistent with capture mechanisms. Useful quasi-experimental sectoral design — not yet treated as settled peer-reviewed fact for CC claim upgrades.",
    key_findings: [
      "PUHCA repeal created cross-state variation in utility contribution legality",
      "Author finds higher authorized ROEs where contribution restrictions eased"
    ],
    limitations:
      "Working paper / think-tank hosted; peer-review status not established here; ROE authorized ≠ full public-interest failure; Arkansas-specific transfer not automatic.",
    ideological_or_institutional_considerations: "CGO-hosted working paper — register with caution.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "ELECTRIC UTILITIES dossier — QUASI-CAUSAL candidate; keep provisional."
  },
  {
    source_id: "CC-SRC-109",
    title:
      "Mechanisms of regulatory capture: Testing claims of industry influence in the case of Vioxx",
    authors: ["Eva Heims", "Sophie Moxon"],
    year: 2024,
    url: "https://doi.org/10.1111/rego.12531",
    source_type: "peer_reviewed",
    reliability: "scholarly_primary_analysis",
    primary_or_secondary: "secondary",
    jurisdiction: "UK-regulator-case / comparative",
    research_domain: "political_economic_power",
    publication_date: "2024",
    retrieval_date: TODAY,
    summary:
      "Peer-reviewed process-tracing study of the Vioxx scandal often labeled as capture. Tests revolving-door, information-overload, and shared-cultural-framework mechanisms and finds the degree of capture through those mechanisms was limited — warning against misdiagnosing capture. Strong contrary/methodological discipline source for pharma and for capture claims generally.",
    key_findings: [
      "Popular capture diagnosis can overstate mechanism evidence",
      "Revolving door / information / culture mechanisms limited in the Vioxx UK-regulator case studied"
    ],
    limitations:
      "UK drug-regulator case; not a full U.S. FDA institutional map; one high-profile case.",
    ideological_or_institutional_considerations: "Peer-reviewed regulation scholarship.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "PHARMA dossier — CONTRARY to casual capture labeling; mechanism discipline."
  },
  {
    source_id: "CC-SRC-110",
    title: "From Revolving Doors to Regulatory Capture? Evidence from Patent Examiners",
    authors: ["Haris Tabakovic", "Thomas G. Wollmann"],
    year: 2018,
    url: "https://doi.org/10.3386/w24638",
    source_type: "working_paper",
    reliability: "scholarly_secondary",
    primary_or_secondary: "secondary",
    jurisdiction: "US",
    research_domain: "political_economic_power",
    publication_date: "2018",
    retrieval_date: TODAY,
    summary:
      "NBER working paper finding patent examiners grant more/lenient patents to firms that later hire them, suggestive of revolving-door capture in USPTO examination. Contrasts with banking revolving-door studies that often do not find quid-pro-quo patterns — shows sector dependence.",
    key_findings: [
      "Examiner leniency toward future employers in patent grants",
      "Sector-specific revolving-door effects possible"
    ],
    limitations:
      "NBER WP (not automatically peer-reviewed journal); patent office ≠ economic utility regulation; suggestive not universal.",
    ideological_or_institutional_considerations: "NBER working paper.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "Cross-sector revolving-door contrast — PATENT sector SUGGESTIVE; banking contrary."
  }
];

const existingSrc = new Set(srcDoc.sources.map((s) => s.source_id));
for (const s of newSources) {
  if (!existingSrc.has(s.source_id)) {
    srcDoc.sources.push(s);
    existingSrc.add(s.source_id);
  }
}
srcDoc.last_updated = TODAY;
writeJson("data/research/source_registry.json", srcDoc);

// ============================================================================
// 3. Sectoral dossiers
// ============================================================================

const dossiers = {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  parent_hypothesis: "CC-HYP-003-D",
  parent_claim: "CC-CLAIM-003",
  geography_forced: false,
  forbidden_claim_verbs_unless_earned: ["capture", "control", "buy", "owns", "determines"],
  evidence_type_scale: [
    "DESCRIPTIVE",
    "ASSOCIATIONAL",
    "QUASI-CAUSAL",
    "CAUSAL",
    "THEORETICAL"
  ],
  sectors: [
    {
      sector_id: "SEC-TELECOM",
      name: "Telecommunications (state PUC regulation)",
      best_supporting: ["CC-SRC-105"],
      best_contrary: [],
      evidence_type: "ASSOCIATIONAL (robust observational; causal strength debated)",
      what_established:
        "In studied state telecom contexts, campaign contribution patterns associate with measurable PUC regulatory outcomes.",
      what_not_established:
        "That economic concentration nationally weakens democratic accountability; that money 'buys' or 'owns' regulators as universal law.",
      capture_bar: "NOT MET for a CC canonical 'capture' claim — association ≠ capture wording.",
      arkansas_note: "Not Arkansas-specific; transfer requires state PUC modules later if needed.",
      disposition: "SECTORAL_ASSOCIATION_DOCUMENTED"
    },
    {
      sector_id: "SEC-BANKING",
      name: "Banking regulation / lobbying",
      best_supporting: ["CC-SRC-106"],
      best_contrary: ["CC-SRC-107"],
      evidence_type: "MIXED — survey consistency with capture-like patterns + contrary revolving-door evidence",
      what_established:
        "Substantial literature links bank lobbying to softer regulatory posture in some designs; revolving-door worker flows do not cleanly support quid-pro-quo capture.",
      what_not_established:
        "A single national banking-capture verdict; revolving door as automatic capture mechanism.",
      capture_bar: "NOT MET for blanket claim; hypothesis remains open sector-by-sector.",
      arkansas_note: "No AR geography required for this literature slice.",
      disposition: "MIXED_EVIDENCE"
    },
    {
      sector_id: "SEC-ELECTRIC",
      name: "Electric utilities (authorized ROE / contributions)",
      best_supporting: ["CC-SRC-108"],
      best_contrary: [],
      evidence_type: "QUASI-CAUSAL CANDIDATE (working paper)",
      what_established:
        "A quasi-experimental design around PUHCA repeal suggests easing contribution restrictions associated with higher authorized ROEs in some states.",
      what_not_established:
        "Peer-reviewed settled fact for CC; Arkansas-specific utility capture; 'owns/determines' language.",
      capture_bar: "PROVISIONAL — do not promote capture claim from WP alone.",
      arkansas_note: "Future AR PSC modules could use designated set if state regulator questions arise.",
      disposition: "PROVISIONAL_QUASI_EXPERIMENTAL"
    },
    {
      sector_id: "SEC-PHARMA",
      name: "Pharmaceuticals / drug safety regulation",
      best_supporting: [],
      best_contrary: ["CC-SRC-109"],
      evidence_type: "MECHANISM TEST — limited capture in studied Vioxx case",
      what_established:
        "High-profile scandals labeled 'capture' can fail mechanism tests (revolving door, information overload, culture) under process tracing.",
      what_not_established:
        "That pharma markets are free of industry influence; opposite extreme also unwarranted.",
      capture_bar: "Casual capture labeling REJECTED for this case; keep mechanism discipline.",
      arkansas_note: "Not geographic.",
      disposition: "CONTRARY_TO_CASUAL_CAPTURE_LABEL"
    },
    {
      sector_id: "SEC-PATENT-REVOLVING",
      name: "Patent examination revolving door (contrast sector)",
      best_supporting: ["CC-SRC-110"],
      best_contrary: ["CC-SRC-107"],
      evidence_type: "SUGGESTIVE (NBER WP) vs banking contrary",
      what_established:
        "Revolving-door effects appear sector-dependent: suggestive in patent examination WP; not supported as quid-pro-quo in banking peer-reviewed flows.",
      what_not_established: "Universal revolving-door capture law.",
      capture_bar: "Sector dependence reinforces high bar.",
      arkansas_note: "Not geographic.",
      disposition: "SECTOR_DEPENDENT_MECHANISM"
    },
    {
      sector_id: "SEC-AGRICULTURE",
      name: "Agriculture / commodity regulation",
      best_supporting: [],
      best_contrary: [],
      evidence_type: "OPEN",
      what_established: "Nothing registered in this slice.",
      what_not_established: "Any capture or influence claim for agriculture.",
      capture_bar: "NOT ADMISSIBLE yet.",
      arkansas_note:
        "Mississippi County designated set may matter later for agri/industrial contrast — not used here.",
      disposition: "CRITICAL_GAP"
    }
  ],
  synthesis: {
    cc_hyp_003_d_update:
      "Hypothesis remains open. Sectoral association evidence exists (telecom; banking literature mixed; utilities provisional). Blanket capture claims still forbidden. Mechanism tests can falsify casual capture labels (pharma Vioxx).",
    promote_to_empirical_claim: false,
    reason_not_promoted:
      "No sector yet clears the high wording bar for 'capture/control/buy/owns/determines' as a CC canonical claim; associations must stay labeled as associations.",
    recommended_public_language:
      "In some regulated sectors, political money and lobbying associate with more favorable regulatory outcomes under specific research designs. That is not the same as proving national democratic capture by economic concentration."
  }
};

writeJson(
  "research/phase_2/sectoral_political_influence_capture_dossiers.json",
  dossiers
);

writeText(
  "reports/CC_PHASE_2_SECTORAL_POLITICAL_INFLUENCE_AND_CAPTURE_EVIDENCE_DOSSIERS.md",
  `# Sectoral Political Influence and Capture Evidence Dossiers

**Slice:** \`${SLICE}\`  
**Geography forced:** No  
**Parent hypothesis:** CC-HYP-003-D

## High bar

No successor claim may use capture / control / buy / owns / determines unless the mechanism is earned.

## Sector summary

| Sector | Evidence type | Disposition |
|---|---|---|
${dossiers.sectors.map((s) => `| ${s.name} | ${s.evidence_type} | ${s.disposition} |`).join("\n")}

## Synthesis

${dossiers.synthesis.cc_hyp_003_d_update}

**Promote to empirical capture claim?** ${dossiers.synthesis.promote_to_empirical_claim}

Recommended public language: ${dossiers.synthesis.recommended_public_language}
`
);

// Per-sector short reports
for (const s of dossiers.sectors) {
  writeText(
    `reports/sectoral_dossiers/${s.sector_id}.md`,
    `# ${s.sector_id} — ${s.name}

**Evidence type:** ${s.evidence_type}  
**Disposition:** ${s.disposition}

## What is established

${s.what_established}

## What is not established

${s.what_not_established}

## Capture bar

${s.capture_bar}

## Sources

- Support: ${(s.best_supporting || []).join(", ") || "—"}
- Contrary: ${(s.best_contrary || []).join(", ") || "—"}

## Arkansas

${s.arkansas_note}
`
  );
}

// Update hypothesis
const hyp = hypDoc.hypotheses.find((h) => h.hypothesis_id === "CC-HYP-003-D");
if (hyp) {
  hyp.empirical_status =
    "Sectoral dossiers registered (telecom association; banking mixed; utilities provisional WP; pharma mechanism-limited; agriculture open). Still NOT a proven national capture claim.";
  hyp.sectoral_dossiers =
    "research/phase_2/sectoral_political_influence_capture_dossiers.json";
  hyp.sources_support = ["CC-SRC-105", "CC-SRC-106", "CC-SRC-108", "CC-SRC-110"];
  hyp.sources_contrary = ["CC-SRC-107", "CC-SRC-109"];
  hyp.last_updated = TODAY;
  hyp.slice_id = SLICE;
  hyp.not_empirical_proof = true;
  hyp.governance = {
    decision: "KEEP_AS_HYPOTHESIS",
    adjudicator: ADJUDICATOR,
    reason:
      "Sectoral associations and provisional quasi-experiments deepen the research program without clearing the capture wording bar."
  };
}
hypDoc.version = "0.2.0";
hypDoc.slice_id = SLICE;
writeJson("research/phase_2/hypothesis_registry_political_power.json", hypDoc);

// Optional careful claim — associational only, no capture verbs
const claim135 = {
  claim_id: "CC-CLAIM-135",
  claim_text:
    "In some regulated sectors, under specific research designs, campaign contributions or lobbying activity associate with more favorable regulatory outcomes; such associations are sector-dependent, methodologically contested in strength, and do not by themselves establish national democratic capture by economic concentration.",
  chapter_ids: [],
  claim_type: "political_sectoral_association",
  claim_class: "descriptive_empirical",
  epistemic_class: "EMPIRICAL_CLAIM",
  importance: "high",
  support_level: "supported_with_qualification",
  evidence_strength: "moderate",
  consensus_status: "contested_across_literatures",
  source_ids: ["CC-SRC-105", "CC-SRC-106", "CC-SRC-107", "CC-SRC-108", "CC-SRC-109"],
  opposing_evidence: [
    "Lucca/Seru/Trebbi 2014: banking revolving-door flows inconsistent with simple quid-pro-quo capture (CC-SRC-107).",
    "Vioxx process-tracing: limited support for common capture mechanisms in studied case (CC-SRC-109)."
  ],
  uncertainty:
    "Sector dependence; working-paper provisional results; association ≠ capture wording.",
  fact_check_status: "audited",
  publication_readiness: "not_ready",
  geographic_scope: "US-sectoral",
  temporal_scope: "varies_by_study",
  parent_claim_id: "CC-CLAIM-003",
  related_hypothesis_id: "CC-HYP-003-D",
  governance: {
    decision: "APPROVE",
    adjudicator: ADJUDICATOR,
    decision_id: DECISION_ID,
    slice_id: SLICE,
    at: TODAY,
    note: "Association claim only — capture hypothesis remains separate."
  },
  phase21_audit: {
    slice_id: SLICE,
    audited_at: TODAY,
    disposition: "SUPPORTED WITH QUALIFICATION",
    source_to_claim_fit: "PARTIAL",
    confidence: "Moderate",
    evidence_type: "ASSOCIATIONAL",
    reasoning:
      "Telecom peer-reviewed association + banking mixed + utilities provisional + explicit contrary; no capture verbs."
  }
};
if (!claimDoc.claims.find((c) => c.claim_id === "CC-CLAIM-135")) {
  claimDoc.claims.push(claim135);
} else {
  Object.assign(
    claimDoc.claims.find((c) => c.claim_id === "CC-CLAIM-135"),
    claim135
  );
}

const c003 = claim("CC-CLAIM-003");
c003.sectoral_dossiers =
  "research/phase_2/sectoral_political_influence_capture_dossiers.json";
c003.related_claim_ids = Array.from(
  new Set([...(c003.related_claim_ids || []), "CC-CLAIM-133", "CC-CLAIM-134", "CC-CLAIM-135"])
);
c003.phase21_audit = {
  ...(c003.phase21_audit || {}),
  slice_id: SLICE,
  audited_at: TODAY,
  disposition: "NOT ENOUGH EVIDENCE",
  source_to_claim_fit: "PARTIAL",
  confidence: "Low",
  reasoning:
    "Sectoral association evidence deepens modules but parent umbrella still overbroad for Supports."
};
claimDoc.last_updated = TODAY;
writeJson("data/research/claim_ledger.json", claimDoc);

// RQs
const rqKey = rqDoc.questions ? "questions" : "research_questions";
const newRQs = [
  {
    id: "CC-RQ-P21-032",
    question:
      "Register peer-reviewed electric-utility contribution→ROE studies (or confirm/reject CC-SRC-108 after journal status) before any utilities capture wording.",
    status: "open",
    domain: "political_economic_power",
    slice_id: SLICE,
    created: TODAY,
    last_updated: TODAY,
    priority: "P1"
  },
  {
    id: "CC-RQ-P21-033",
    question:
      "Build an agriculture/commodity regulation influence dossier (Mississippi County designated set only if geography required).",
    status: "open",
    domain: "political_economic_power",
    slice_id: SLICE,
    created: TODAY,
    last_updated: TODAY,
    priority: "P2"
  }
];
for (const q of newRQs) {
  if (!(rqDoc[rqKey] || []).find((x) => x.id === q.id)) rqDoc[rqKey].push(q);
}
rqDoc.last_updated = TODAY;
writeJson("data/research/research_questions.json", rqDoc);

// Domain matrix update
for (const d of domainMatrix.domains) {
  if (d.domain === "political and economic power") {
    d.existing_sources = Array.from(
      new Set([
        ...(d.existing_sources || []),
        "CC-SRC-105",
        "CC-SRC-106",
        "CC-SRC-107",
        "CC-SRC-108",
        "CC-SRC-109",
        "CC-SRC-110"
      ])
    );
    d.peer_reviewed_sources = Array.from(
      new Set([
        ...(d.peer_reviewed_sources || []),
        "CC-SRC-094",
        "CC-SRC-095",
        "CC-SRC-105",
        "CC-SRC-107",
        "CC-SRC-109"
      ])
    );
    d.contrary_sources = Array.from(
      new Set([...(d.contrary_sources || []), "CC-SRC-095", "CC-SRC-107", "CC-SRC-109"])
    );
    d.major_gaps = [
      "Agriculture sector dossier",
      "Peer-reviewed utilities confirmation",
      "Arkansas PSC modules if needed later",
      "Parent CC-CLAIM-003 still NEE"
    ];
    d.coverage_assessment = "THIN";
    d.note =
      "Sectoral dossiers deepen influence/association evidence; capture hypothesis open; still not ADEQUATE.";
    d.sectoral_dossiers =
      "research/phase_2/sectoral_political_influence_capture_dossiers.json";
  }
}
domainMatrix.version = "0.4.0";
domainMatrix.slice_id = SLICE;
domainMatrix.generated_at = TODAY;
writeJson("research/phase_2/priority_domain_research_matrix.json", domainMatrix);

// Public reasoning
const pr010 = {
  record_id: "CC-PR-010",
  claim_id: "CC-CLAIM-003",
  change_type: "SECTORAL_DOSSIERS_WITHOUT_CAPTURE_UPGRADE",
  decision: "KEEP_PARENT_NEE_PROMOTE_ASSOCIATION_CLAIM_135",
  decision_id: DECISION_ID,
  adjudicator: ADJUDICATOR,
  decided_at: TODAY,
  slice_id: SLICE,
  skeptical_reader_question: "What would actually count as evidence of regulatory capture?",
  public_answer:
    "Not campaign-finance totals alone, and not a revolving door by itself. Capture would require sector evidence that the industry systematically shapes the agency that regulates it so regulation serves private industry interest over the public interest. In telecom, some careful studies find political money associating with regulatory outcomes. In banking, lobbying literatures often look capture-consistent, but revolving-door career patterns do not simply prove quid-pro-quo. In a famous drug-safety scandal, mechanism tests found less capture than the label suggested. So we deepened the research — and still refuse to say Constitutional Capitalism has proven national capture.",
  what_we_originally_said: "Economic concentration can weaken democratic accountability.",
  what_made_us_question_it: "Umbrella wording + high capture bar under CC-DEC-103.",
  what_we_learned:
    "Influence evidence is sector-dependent. Mechanisms that sound like capture can fail empirical tests. Associations must be labeled associations.",
  where_our_reasoning_was_weak:
    "Temptation to treat any money-in-politics finding as democratic capture.",
  what_we_now_say:
    "Parent 003 remains NEE. CC-CLAIM-135 states sectoral associations carefully. CC-HYP-003-D remains the capture hypothesis.",
  why_we_made_that_decision:
    "Intellectual cleanliness: register sectoral evidence without laundering it into an overclaim.",
  what_we_still_dont_know:
    "Agriculture dossier; peer-reviewed utilities confirmation; Arkansas-specific regulator modules.",
  what_else_this_could_affect: [
    "Political power chapters",
    "Antitrust-democracy narratives",
    "Public education on money and regulation"
  ],
  potential_secondary_effects_or_unintended_consequences: [
    "Readers may think we are soft on industry power — correct framing: we are hard on evidence standards",
    "Sector findings could later support narrow claims without resurrecting the umbrella"
  ],
  what_evidence_could_change_our_mind_again:
    "Multiple sector dossiers with identification designs that earn narrowly worded capture claims without forbidden overclaim verbs — still without converting parent 003 into Supports casually."
};

prRegistry.records.push(pr010);
prRegistry.last_updated = TODAY;
writeJson("research/phase_2/public_reasoning_registry.json", prRegistry);
writeText(
  "reports/public_reasoning/CC-PR-010_CC-CLAIM-003.md",
  `# CC-PR-010 — Sectoral dossiers without capture upgrade

**Q:** ${pr010.skeptical_reader_question}

## Public answer

${pr010.public_answer}

| Field | Content |
|---|---|
| Originally | ${pr010.what_we_originally_said} |
| Now | ${pr010.what_we_now_say} |
| Why | ${pr010.why_we_made_that_decision} |
| Still unknown | ${pr010.what_we_still_dont_know} |
| Secondary effects | ${pr010.potential_secondary_effects_or_unintended_consequences.join("; ")} |
| Mind-changing evidence | ${pr010.what_evidence_could_change_our_mind_again} |
`
);

writeText(
  "reports/CC_WHAT_WE_LEARNED_SECTORAL_INFLUENCE_AND_CAPTURE_1_0.md",
  `# What We Learned: Sectoral Influence and Capture

*Citizen-facing.*

## Does money influence regulation?

Sometimes, in some sectors, under some research designs — **association between political money/lobbying and regulatory outcomes has been documented** (notably in telecommunications studies of state utility commissions). That is not the same as proving that money always buys outcomes, or that concentrated firms own democracy.

## Is a revolving door proof of corruption or capture?

Not by itself. In banking regulation, careful career-flow studies often fit a “regulatory schooling / expertise” story better than a simple quid-pro-quo. In patent examination, other research is more suggestive of leniency toward future employers. **The mechanism depends on the sector.**

## Why did a famous drug scandal not automatically prove capture?

Because when researchers tested the usual mechanisms — revolving door, information overload, shared culture — the capture story was weaker than the label. Scandals can involve industry influence, error, and harm without meeting a capture standard.

## Why won't Constitutional Capitalism say "capture" yet?

Because our rule is: use the narrowest accurate word. Association is association. Capture is a stronger claim that needs sector evidence of systematic agency shaping. We would rather be precise than dramatic.

## Did we study Arkansas towns for this?

No. This question did not require a geography sample. When a future question does, we will prefer the designated Arkansas set and choose by method — not by the answer we hope for. Faulkner County's earlier "not measurable" leakage result stays on the record and will not be redone just to get a different number.
`
);

// First-20: 003 still NEE; fit unchanged
const rows = priorMatrix.rows.map((row) => {
  if (row.claim_id === "CC-CLAIM-003") {
    return {
      ...row,
      disposition: "NOT ENOUGH EVIDENCE",
      fit: "PARTIAL",
      related_successors: ["CC-CLAIM-133", "CC-CLAIM-134", "CC-CLAIM-135"],
      sectoral_dossiers: true,
      public_reasoning: ["CC-PR-007", "CC-PR-008", "CC-PR-010"],
      note: "Sectoral dossiers deepen association evidence; parent still NEE; capture not promoted"
    };
  }
  return row;
});
const weak_fit = rows.filter((r) =>
  ["PARTIAL", "WEAK", "NON-SUPPORTING"].includes(r.fit)
).length;
const direct_strong = rows.filter((r) => ["DIRECT", "STRONG"].includes(r.fit)).length;

writeJson("research/phase_2/first_20_claim_evidence_matrix.json", {
  ...priorMatrix,
  version: "0.5.1",
  slice_id: SLICE,
  generated_at: TODAY,
  weak_fit_below_strong: weak_fit,
  direct_strong_fit: direct_strong,
  successor_claims_outside_first_20: {
    ...(priorMatrix.successor_claims_outside_first_20 || {}),
    "CC-CLAIM-135": {
      fit: "PARTIAL",
      disposition: "SUPPORTED WITH QUALIFICATION"
    }
  },
  rows
});

const gate02 = checklist.gate_items.find((g) => g.id === "CC-P2-GATE-02");
const gate02Determination = "PARTIAL / REMAINS OPEN";
if (gate02) {
  gate02.status = "open";
  gate02.last_evaluated = TODAY;
  gate02.slice_id = SLICE;
  gate02.forensic_note = `GATE-02 remains open because:
- ${weak_fit}/20 first-20 claims remain below STRONG; ${direct_strong}/20 DIRECT/STRONG
- CC-CLAIM-003 parent remains NEE despite sectoral association dossiers
- Capture hypothesis open; agriculture sector gap remains
- Leakage still NOT MEASURABLE at net county level (Faulkner preserved)
- Baseline 2/86`;
}
checklist.last_updated = TODAY;
writeJson("data/project/phase2_acceptance_checklist.json", checklist);

const gateTable = checklist.gate_items
  .map((g) => {
    let st = (g.status || "open").toUpperCase();
    if (g.id === "CC-P2-GATE-02") st = gate02Determination;
    return `| ${g.id} | ${g.text} | ${st} |`;
  })
  .join("\n");

// KG light
const nextNode = () => {
  const nums = kgDoc.nodes.map((n) => parseInt(String(n.node_id).replace(/\D/g, ""), 10) || 0);
  return Math.max(0, ...nums) + 1;
};
let nId = nextNode();
kgDoc.nodes.push({
  node_id: `CC-KG-${String(nId++).padStart(3, "0")}`,
  label: "Sectoral Influence/Capture Dossiers",
  kind: "system",
  related_slice: SLICE
});
kgDoc.nodes.push({
  node_id: `CC-KG-${String(nId++).padStart(3, "0")}`,
  label: "Arkansas Designated Research Geography Set",
  kind: "system",
  related_artifact: "research/phase_2/arkansas_designated_research_geography_set.json"
});
kgDoc.last_updated = TODAY;
writeJson("data/research/knowledge_graph.json", kgDoc);

buildState.version = "0.4.2";
buildState.last_updated = TODAY;
buildState.mission_id = SLICE;
buildState.slice_return =
  "reports/CC_PHASE_2_1_SECTORAL_POLITICAL_INFLUENCE_AND_CAPTURE_EVIDENCE_DOSSIERS_1_0_RETURN.md";
buildState.writing_focus =
  "Sectoral association evidence registered; capture not promoted; AR geography set active for future geographic questions; Faulkner leakage result preserved.";
buildState.next_action =
  "Peer-review utilities confirmation (CC-RQ-P21-032) and/or agriculture dossier; geographic work only when question requires designated-set selection.";
buildState.gate_02 = gate02Determination;
buildState.weak_fit_claims = weak_fit;
buildState.direct_strong_fit = direct_strong;
buildState.sources_registered = srcDoc.sources.length;
buildState.baseline = "2/86";
buildState.arkansas_geography_set = "ACTIVE";
writeJson("data/project/current_build_state.json", buildState);

writeJson("data/project/latest_cursor_return.json", {
  version: "0.1.0",
  generated_at: TODAY,
  slice_id: SLICE,
  summary: `Sectoral dossiers (telecom/banking/utilities/pharma) registered; CC-CLAIM-135 association-only; CC-HYP-003-D kept; parent 003 NEE. AR designated geography set shipped; Faulkner not redone. Sources ${srcDoc.sources.length}. Below STRONG ${beforeWeak}→${weak_fit}. GATE-02 open.`,
  return_report:
    "reports/CC_PHASE_2_1_SECTORAL_POLITICAL_INFLUENCE_AND_CAPTURE_EVIDENCE_DOSSIERS_1_0_RETURN.md"
});

const sliceEntry = {
  slice_id: SLICE,
  title: "Sectoral Political Influence and Capture Evidence Dossiers",
  status: "completed",
  completed_at: TODAY,
  completion_evidence: [
    "arkansas designated geography set",
    "sectoral dossiers JSON + reports",
    "CC-SRC-105–110",
    "CC-CLAIM-135",
    "CC-PR-010",
    "Faulkner not redone"
  ],
  next_recommended_slice:
    "CC-PHASE-2.1-UTILITIES-PEER-REVIEW-CONFIRMATION-AND-AGRICULTURE-INFLUENCE-DOSSIER-1.0",
  note: "No forced geography. Capture bar held."
};
const ex = sliceQueue.slices.find((s) => s.slice_id === SLICE);
if (ex) Object.assign(ex, sliceEntry);
else sliceQueue.slices.push(sliceEntry);
sliceQueue.active_slice = sliceEntry.next_recommended_slice;
sliceQueue.last_updated = TODAY;
writeJson("data/project/slice_queue.json", sliceQueue);

writeText(
  "reports/CC_PHASE_2_1_SECTORAL_POLITICAL_INFLUENCE_AND_CAPTURE_EVIDENCE_DOSSIERS_1_0_RETURN.md",
  `# ${SLICE} — Return

## 1. Executive Summary

Sectoral influence/capture research deepened **without** promoting a national capture claim and **without** forcing geography. Faulkner County leakage result preserved. Designated Arkansas research geography set activated for future geographic questions.

**Sources: ${srcDoc.sources.length}** · **First-20 below STRONG: ${beforeWeak} → ${weak_fit}** · **GATE-02: ${gate02Determination}** · **Baseline: 2/86**

## 2. Arkansas Geography Rule

Shipped: \`research/phase_2/arkansas_designated_research_geography_set.json\`  
Eight locations with contrast roles; paired-comparison future noted; Faulkner do-not-redo recorded.  
**This slice required no geography.**

## 3. Sectoral Decisions

| Sector | Finding |
|---|---|
| Telecom | Peer-reviewed association contributions→PUC outcomes |
| Banking | Capture-consistent lobbying literature + contrary revolving-door evidence |
| Electric utilities | Provisional quasi-experiment (WP) — not promoted as settled |
| Pharma | Mechanism test limits casual capture label |
| Patents (contrast) | Suggestive WP vs banking contrary |
| Agriculture | Critical gap |

## 4. Claims / Hypotheses

- **CC-CLAIM-003:** still **NEE**
- **CC-CLAIM-135:** APPROVED association-only (PARTIAL / Qualifies)
- **CC-HYP-003-D:** KEEP as hypothesis (deepened, not proven)

## 5. Public Reasoning

CC-PR-010 — what counts as capture evidence  
Citizen lesson: \`reports/CC_WHAT_WE_LEARNED_SECTORAL_INFLUENCE_AND_CAPTURE_1_0.md\`

## 6. GATE-02

# ${gate02Determination}

| ID | Text | Status |
|---|---|---|
${gateTable}

## 7. Validators

Run after script.

## 8. Next Slice

\`CC-PHASE-2.1-UTILITIES-PEER-REVIEW-CONFIRMATION-AND-AGRICULTURE-INFLUENCE-DOSSIER-1.0\`
`
);

console.log("=== COMPLETE ===");
console.log("sources", srcDoc.sources.length);
console.log("below STRONG", beforeWeak, "->", weak_fit);
console.log("geography forced: false");
console.log("capture promoted: false");
