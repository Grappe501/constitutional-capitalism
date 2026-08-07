/**
 * CC-PHASE-2.1-PRIORITY-CLAIM-REWRITE-AND-P0-CLOSEOUT-1.0
 * Claim-integrity slice: P0 closeout, governed rewrite queue, formal 009 retirement.
 * Does NOT silently mutate canonical claim_text.
 */
import fs from "node:fs";
import path from "node:path";
import { r } from "./lib/paths.mjs";

const TODAY = "2026-08-07";
const SLICE = "CC-PHASE-2.1-PRIORITY-CLAIM-REWRITE-AND-P0-CLOSEOUT-1.0";

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
const predDoc = JSON.parse(fs.readFileSync(r("data/project/prediction_ledger.json"), "utf8"));
const kgDoc = JSON.parse(fs.readFileSync(r("data/research/knowledge_graph.json"), "utf8"));
const checklist = JSON.parse(fs.readFileSync(r("data/project/phase2_acceptance_checklist.json"), "utf8"));
const priorMatrix = JSON.parse(fs.readFileSync(r("research/phase_2/first_20_claim_evidence_matrix.json"), "utf8"));
const priorTriage = JSON.parse(fs.readFileSync(r("research/phase_2/research_question_triage.json"), "utf8"));

const before = {
  dispositions: { ...priorMatrix.disposition_counts },
  fit: { ...priorMatrix.fit_counts },
  weak_fit: (priorMatrix.rows || []).filter((r) =>
    ["PARTIAL", "WEAK", "NON-SUPPORTING"].includes(r.fit)
  ).length,
  direct_strong: (priorMatrix.rows || []).filter((r) => ["DIRECT", "STRONG"].includes(r.fit))
    .length,
  p0_open: (priorTriage.items || []).filter((t) => t.priority === "P0" && t.status === "open")
    .length,
  sources: srcDoc.sources.length,
  baseline: "2/86",
  gate02: "PARTIAL / REMAINS OPEN"
};

const newSources = [
  {
    source_id: "CC-SRC-091",
    title: "Measuring labor market concentration using the QCEW",
    authors: ["U.S. Bureau of Labor Statistics", "Monthly Labor Review"],
    year: 2024,
    url: "https://www.bls.gov/opub/mlr/2024/article/measuring-labor-market-concentration-using-the-qcew.htm",
    source_type: "federal_statistical",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "labor_monopsony",
    publication_date: "2024",
    retrieval_date: TODAY,
    summary:
      "BLS Monthly Labor Review article measuring U.S. labor-market concentration with QCEW data (2002–2023). Finds average markets highly concentrated by DOJ/FTC guidelines and a significant negative association between employer concentration and wages; also simulates merger impacts on local labor-market power.",
    key_findings: [
      "Average U.S. labor market highly concentrated by 2010 DOJ/FTC guidelines in the study frame",
      "Higher employer concentration significantly associated with lower wages in QCEW-based measures"
    ],
    limitations:
      "Association ≠ universal causal proof in every market; Arkansas transfer not automatic; merger simulations are counterfactual.",
    ideological_or_institutional_considerations: "Official BLS statistical research article.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "Closes CC-RQ-P21-014 dataset gap with official QCEW-based concentration measurement; supports CC-CLAIM-015 Qualifies."
  },
  {
    source_id: "CC-SRC-092",
    title: "FEC Campaign Finance Data (disclosure portal)",
    authors: ["Federal Election Commission"],
    year: 2026,
    url: "https://www.fec.gov/data/",
    source_type: "federal_statistical",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "political_economic_power",
    publication_date: "ongoing",
    retrieval_date: TODAY,
    summary:
      "Official FEC portal for federal campaign finance disclosures: candidate/committee receipts and disbursements, individual contributions, filings, and bulk data. Primary spine for lobbying/campaign-finance bibliography — does not by itself prove that economic concentration weakens democratic accountability.",
    key_findings: [
      "Federal campaign finance disclosures are publicly available for candidates and committees",
      "Data enable research on money in politics but require careful identification for causal claims"
    ],
    limitations:
      "Disclosure ≠ capture. Does not measure lobbying influence or policy outcomes; state/local races largely outside FEC; OpenFEC API access separate.",
    ideological_or_institutional_considerations: "Independent federal regulatory commission disclosure system.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "Bibliography spine for CC-RQ-P21-025; NON-SUPPORTING for CC-CLAIM-003 as written."
  },
  {
    source_id: "CC-SRC-093",
    title: "FEC Campaign Finance Statistics (summary tables)",
    authors: ["Federal Election Commission"],
    year: 2026,
    url: "https://www.fec.gov/campaign-finance-data/campaign-finance-statistics/",
    source_type: "federal_statistical",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "political_economic_power",
    publication_date: "ongoing",
    retrieval_date: TODAY,
    summary:
      "FEC summary statistics tables for campaign financial activity by election cycle and filer type (candidates, parties, PACs, communications).",
    key_findings: [
      "Provides cycle-level summary tables for federal campaign finance activity",
      "Useful for descriptive political-economy modules — not causal capture proofs"
    ],
    limitations: "Aggregate tables; causal inference requires research designs beyond the tables.",
    ideological_or_institutional_considerations: "Official FEC statistical tables.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "Companion to CC-SRC-092 for P0 bibliography closeout."
  }
];

const existing = new Set(srcDoc.sources.map((s) => s.source_id));
for (const s of newSources) {
  if (!existing.has(s.source_id)) {
    srcDoc.sources.push(s);
    existing.add(s.source_id);
  }
}
srcDoc.last_updated = TODAY;
srcDoc.version = "0.3.0";

// --- Formal retirement of CC-CLAIM-009 ---
const claim009 = claimDoc.claims.find((c) => c.claim_id === "CC-CLAIM-009");
const predId = "CC-PRED-009";
if (claim009) {
  claim009.lifecycle_status = "retirement_recommended";
  claim009.retirement = {
    slice_id: SLICE,
    recommended_at: TODAY,
    approval_status: "PENDING",
    reason:
      "Unsupported system-level prediction comparing Constitutional Capitalism package reforms to isolated corporate-tax increases. Not a diagnosis claim. Fails source-to-claim fit; requires modeling before any assertion.",
    evidence_failure:
      "No registered sources; predictive claim class; cannot be validated by Phase 2 diagnosis evidence rules.",
    supersession_target: predId,
    preserve_historical: true,
    delete_forbidden: true
  };
  claim009.support_level = "unsupported";
  claim009.publication_readiness = "not_ready";
  claim009.fact_check_status = "retired_pending_approval";
  claim009.phase21_repair = {
    slice_id: SLICE,
    disposition: "RETIRE",
    defect: "FORECAST WITHOUT MODEL",
    fit: "NON-SUPPORTING",
    confidence: "Very Low"
  };
}
if (!(predDoc.predictions || []).some((p) => p.prediction_id === predId)) {
  predDoc.predictions.push({
    prediction_id: predId,
    text: claim009?.claim_text,
    layer: "prediction",
    confidence: "speculative_until_modeled",
    modeling_status: "not_started",
    related_scenarios: ["CC-SCEN-01", "CC-SCEN-02"],
    related_chapters: [],
    publication_readiness: "not_ready",
    migrated_from_claim: "CC-CLAIM-009",
    migration_slice: SLICE,
    migration_date: TODAY,
    note: "Migrated from diagnosis claim ledger as retirement recommendation; original claim preserved historically."
  });
}
predDoc.last_updated = TODAY;

// Attach new sources to relevant claims without changing claim_text
const c015 = claimDoc.claims.find((c) => c.claim_id === "CC-CLAIM-015");
if (c015) {
  c015.source_ids = [...new Set([...(c015.source_ids || []), "CC-SRC-091"])];
}
const c003 = claimDoc.claims.find((c) => c.claim_id === "CC-CLAIM-003");
if (c003) {
  c003.source_ids = [...new Set([...(c003.source_ids || []), "CC-SRC-092", "CC-SRC-093"])];
  c003.opposing_evidence = [
    ...(c003.opposing_evidence || []),
    "FEC disclosure availability demonstrates transparency infrastructure; disclosure is not evidence of capture or of concentration causing weakened accountability."
  ].slice(0, 8);
}

// --- Rewrite candidates (canonical text unchanged) ---
const rewrites = [
  {
    claim_id: "CC-CLAIM-001",
    current_wording: claimDoc.claims.find((c) => c.claim_id === "CC-CLAIM-001")?.claim_text,
    why_fails: "Civilizationally sweeping; no registered sources; unfalsifiable as written.",
    fit_defect: "NON-SUPPORTING / CONCEPTUAL AMBIGUITY",
    defect_category: "WORDING TOO BROAD",
    strongest_defensible:
      "Market-oriented growth has been associated with large gains in material living standards in many countries and periods, with important exceptions and distributional conflicts.",
    proposed_replacement:
      "In many countries and periods, market-oriented growth has been associated with large gains in material living standards, with important exceptions, crises, and distributional conflicts that must be scoped before public wording.",
    evidence_supporting_replacement: [],
    contrary_evidence: ["Cross-country and within-country experiences vary widely."],
    removed: ["Universal 'capitalism has produced', implied inevitability across all contexts"],
    narrowed: ["Association not inevitability", "requires scoped modules", "exceptions explicit"],
    confidence: "Very Low until sourced modules exist",
    proposed_fit_if_approved: "PARTIAL",
    proposed_disposition_if_approved: "NOT ENOUGH EVIDENCE",
    governance_recommendation: "REWRITE — then open historical modules before any Supports path."
  },
  {
    claim_id: "CC-CLAIM-010",
    current_wording: claimDoc.claims.find((c) => c.claim_id === "CC-CLAIM-010")?.claim_text,
    why_fails: "Uses SCF/DFA concentration sources to support a redesign forecast.",
    fit_defect: "NON-SUPPORTING / CAUSAL OVERREACH / FORECAST WITHOUT MODEL",
    defect_category: "FORECAST WITHOUT MODEL",
    strongest_defensible:
      "U.S. household wealth is highly concentrated; effects of broader ownership participation on household income composition are untested predictions.",
    proposed_replacement:
      "U.S. household wealth is highly concentrated; whether broader ownership participation would shift households toward multi-source capital income is an untested design prediction requiring modeling and pilots.",
    evidence_supporting_replacement: ["CC-SRC-001", "CC-SRC-002", "CC-SRC-012"],
    contrary_evidence: ["Concentration facts do not validate ownership-redesign outcomes."],
    removed: ["Would shift many households", "implied empirical forecast"],
    narrowed: ["Descriptive concentration preserved", "prediction labeled untested"],
    confidence: "High for concentration clause; Very Low for prediction clause",
    proposed_fit_if_approved: "PARTIAL",
    proposed_disposition_if_approved: "SUPPORTED WITH QUALIFICATION",
    governance_recommendation: "REWRITE (split descriptive vs predictive) — or SPLIT into two claims."
  },
  {
    claim_id: "CC-CLAIM-016",
    current_wording: claimDoc.claims.find((c) => c.claim_id === "CC-CLAIM-016")?.claim_text,
    why_fails: "Leakage/extraction unproven; scale sources do not establish the mechanism claim.",
    fit_defect: "WEAK / CAUSAL OVERREACH / MEASUREMENT MISMATCH",
    defect_category: "CAUSAL OVERREACH",
    strongest_defensible:
      "Online commerce is a material share of U.S. retail sales; local wealth effects require dedicated studies; pre-Wayfair tax myths are outdated.",
    proposed_replacement:
      "Online commerce is a material share of U.S. retail sales; effects on local spending, platform margins, and community wealth require dedicated leakage/multiplier studies and must not recycle pre-Wayfair tax myths.",
    evidence_supporting_replacement: ["CC-SRC-085", "CC-SRC-086"],
    contrary_evidence: ["Consumer choice and hybrid local/online sellers; Wayfair collection authority."],
    removed: ["can extract", "wealth leakage as established mechanism"],
    narrowed: ["Scale fact", "research agenda for leakage", "legal update"],
    confidence: "High for retail share; Low for local effects until studies registered",
    proposed_fit_if_approved: "STRONG",
    proposed_disposition_if_approved: "SUPPORTED WITH QUALIFICATION",
    governance_recommendation: "REWRITE — then keep leakage as open research, not claim fact."
  },
  {
    claim_id: "CC-CLAIM-017",
    current_wording: claimDoc.claims.find((c) => c.claim_id === "CC-CLAIM-017")?.claim_text,
    why_fails: "'Threaten ownership security' overclaims relative to burden/relief evidence.",
    fit_defect: "PARTIAL / WORDING TOO BROAD",
    defect_category: "WORDING TOO BROAD",
    strongest_defensible:
      "Property taxes can impose high burdens relative to income or liquidity for some households; they remain a central local revenue source.",
    proposed_replacement:
      "Property taxes can impose high burdens relative to income or liquidity for some households, motivating targeted relief design; they are also a central, relatively stable local revenue source.",
    evidence_supporting_replacement: ["CC-SRC-089"],
    contrary_evidence: ["Lincoln Institute emphasizes property-tax strengths and targeted relief over blunt limits."],
    removed: ["threaten ownership security"],
    narrowed: ["burden/liquidity", "relief design", "institutional role preserved"],
    confidence: "Moderate",
    proposed_fit_if_approved: "STRONG",
    proposed_disposition_if_approved: "SUPPORTED WITH QUALIFICATION",
    governance_recommendation: "REWRITE"
  },
  {
    claim_id: "CC-CLAIM-006",
    current_wording: claimDoc.claims.find((c) => c.claim_id === "CC-CLAIM-006")?.claim_text,
    why_fails: "Bundles corporate relocation causality with documented rural structural stress.",
    fit_defect: "PARTIAL / CAUSAL OVERREACH",
    defect_category: "CAUSAL OVERREACH",
    strongest_defensible:
      "Rural structural decline can erode community capacity in population, banking, and healthcare access; relocation is a plausible separate mechanism.",
    proposed_replacement:
      "Rural structural decline can erode community capacity (population, banking, healthcare access); corporate relocation is a plausible contributing mechanism requiring separate causal modules.",
    evidence_supporting_replacement: ["CC-SRC-008", "CC-SRC-009", "CC-SRC-010"],
    contrary_evidence: ["Heterogeneous nonmetro outcomes; some post-2020 gains."],
    removed: ["Joint proven package of relocation + decline"],
    narrowed: ["Structural indicators", "relocation labeled plausible/unproven"],
    confidence: "Moderate",
    proposed_fit_if_approved: "STRONG",
    proposed_disposition_if_approved: "SUPPORTED WITH QUALIFICATION",
    governance_recommendation: "REWRITE or SPLIT — optional fifth repair beyond original four."
  }
];

const governanceQueue = {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  note: "Canonical claim_text is NOT mutated by this slice. Approval required.",
  changes: [
    ...rewrites.map((rw, i) => ({
      change_id: `CC-CHG-P21-${String(i + 1).padStart(3, "0")}`,
      claim_id: rw.claim_id,
      change_type: rw.claim_id === "CC-CLAIM-010" || rw.claim_id === "CC-CLAIM-006" ? "REWRITE" : "REWRITE",
      current_text: rw.current_wording,
      proposed_text: rw.proposed_replacement,
      evidence_basis: rw.evidence_supporting_replacement,
      reason: rw.why_fails,
      affected_artifacts: [
        "data/research/claim_ledger.json",
        "content/research/national-diagnosis/*",
        "content/evidence-companion/*",
        "apps/build-board"
      ],
      review_required: true,
      approval_status: "PENDING"
    })),
    {
      change_id: "CC-CHG-P21-RET-009",
      claim_id: "CC-CLAIM-009",
      change_type: "RETIRE",
      current_text: claim009?.claim_text,
      proposed_text: null,
      evidence_basis: [],
      reason: claim009?.retirement?.reason,
      affected_artifacts: [
        "data/research/claim_ledger.json",
        "data/project/prediction_ledger.json",
        "data/research/knowledge_graph.json"
      ],
      review_required: true,
      approval_status: "PENDING",
      supersession_target: predId
    }
  ]
};

// --- P0 closeout ledger ---
const p0Ledger = [
  {
    id: "CC-RQ-P21-005",
    claims: ["CC-CLAIM-015", "CC-CLAIM-002"],
    why_p0: "Blocks validity of wage-suppression vs descriptive productivity-pay gap separation.",
    evidence_needed: "Official/peer monopsony sources distinct from BLS productivity-gap sources.",
    sources_reviewed: ["CC-SRC-003", "CC-SRC-004", "CC-SRC-081", "CC-SRC-082", "CC-SRC-088", "CC-SRC-091"],
    best_support: "CC-SRC-091 QCEW concentration–wage association; CC-SRC-081/088.",
    best_contrary: "Identification debates; not all markets; measurement disputes on pay gap (CC-SRC-090).",
    fit: "STRONG for separation task",
    jurisdiction: "US",
    freshness: "CURRENT",
    result: "Descriptive gap (002) and monopsony (015) now have distinct source spines; 015 remains Qualifies.",
    remaining_uncertainty: "Arkansas transfer; exact causal ID in every market.",
    closeout_status: "CLOSED — QUALIFIES"
  },
  {
    id: "CC-RQ-P21-008",
    claims: ["CC-CLAIM-014"],
    why_p0: "Incidence wording blocked without official/peer review of contested shares.",
    evidence_needed: "CBO/CRS or peer incidence reviews with opposing assumptions.",
    sources_reviewed: ["CC-SRC-083", "CC-SRC-084"],
    best_support: "CBO 2011 review + CRS agency labor-share assumptions.",
    best_contrary: "Capital-majority allocations in CBO/JCT/Treasury tables; consumer channel contested.",
    fit: "STRONG for 'may be borne partly by workers'",
    jurisdiction: "US",
    freshness: "AGING",
    result: "Modal claim 014 justified as Qualifies; consumer burden still open.",
    remaining_uncertainty: "Point estimates; consumer prices.",
    closeout_status: "CLOSED — QUALIFIES"
  },
  {
    id: "CC-RQ-P21-014",
    claims: ["CC-CLAIM-015"],
    why_p0: "Needed official labor-market concentration dataset/measurement before wage-suppression claims.",
    evidence_needed: "Government dataset-based concentration measures.",
    sources_reviewed: ["CC-SRC-088", "CC-SRC-091", "CC-SRC-081"],
    best_support: "BLS MLR QCEW concentration article (CC-SRC-091).",
    best_contrary: "Association with caveats; merger simulations counterfactual.",
    fit: "STRONG",
    jurisdiction: "US",
    freshness: "CURRENT",
    result: "Official QCEW-based concentration measurement registered.",
    remaining_uncertainty: "Local Arkansas modules.",
    closeout_status: "CLOSED — QUALIFIES"
  },
  {
    id: "CC-RQ-P21-022",
    claims: ["CC-CLAIM-016"],
    why_p0: "E-commerce scale sources required before any commerce claim upgrade.",
    evidence_needed: "Census e-commerce share series.",
    sources_reviewed: ["CC-SRC-085"],
    best_support: "Census quarterly e-commerce share (~16.9% Q1 2026).",
    best_contrary: "Scale ≠ leakage.",
    fit: "DIRECT for share; NON-SUPPORTING for leakage wording",
    jurisdiction: "US",
    freshness: "CURRENT",
    result: "Question to register share sources is satisfied; leakage claim still fails as written.",
    remaining_uncertainty: "Local multiplier studies.",
    closeout_status: "CLOSED — QUALIFIES"
  },
  {
    id: "CC-RQ-P21-024",
    claims: ["CC-CLAIM-016"],
    why_p0: "Fiscal narratives must not recycle pre-Wayfair law.",
    evidence_needed: "Primary Wayfair opinion.",
    sources_reviewed: ["CC-SRC-086"],
    best_support: "South Dakota v. Wayfair (2018).",
    best_contrary: "n/a — legal update is the point",
    fit: "DIRECT for collection-authority update",
    jurisdiction: "US",
    freshness: "HISTORICAL BY DESIGN",
    result: "Verified SCOTUS source registered.",
    remaining_uncertainty: "State implementation variation.",
    closeout_status: "CLOSED — QUALIFIES"
  },
  {
    id: "CC-RQ-P21-025",
    claims: ["CC-CLAIM-003"],
    why_p0: "Political-economy bibliography required before any capture claim path.",
    evidence_needed: "Primary campaign-finance disclosure sources + later lobbying modules.",
    sources_reviewed: ["CC-SRC-092", "CC-SRC-093", "CC-SRC-005"],
    best_support: "FEC data portal + statistics tables as bibliography spine.",
    best_contrary: "Disclosure ≠ capture; concentration ≠ accountability failure.",
    fit: "DIRECT for bibliography existence; WEAK/NON-SUPPORTING for claim 003 wording",
    jurisdiction: "US",
    freshness: "CURRENT",
    result: "Bibliography spine opened with primary FEC sources. Claim 003 remains NEE.",
    remaining_uncertainty: "Causal identification; lobbying influence modules; media ownership.",
    closeout_status: "CLOSED — QUALIFIES"
  },
  {
    id: "CC-RQ-P21-027",
    claims: ["CC-CLAIM-003"],
    why_p0: "Process guardrail: do not upgrade 003 without identification standards.",
    evidence_needed: "Audit discipline + registry honesty.",
    sources_reviewed: ["CC-SRC-005", "CC-SRC-092", "CC-SRC-093"],
    best_support: "Claim remains requires_additional_research / NEE disposition.",
    best_contrary: "n/a",
    fit: "n/a — process question",
    jurisdiction: "US",
    freshness: "CURRENT",
    result: "Guardrail satisfied: 003 not upgraded; FEC added as backdrop only.",
    remaining_uncertainty: "Future researchers may still overclaim — keep gate.",
    closeout_status: "CLOSED — QUALIFIES"
  },
  {
    id: "CC-RQ-P21-AUD-001",
    claims: ["CC-CLAIM-001"],
    why_p0: "Blocks honest public wording of civilizational prosperity claim.",
    evidence_needed: "Governed rewrite + scoped historical modules.",
    sources_reviewed: [],
    best_support: "Rewrite candidate queued (PENDING).",
    best_contrary: "Variation/exceptions must remain explicit.",
    fit: "REWRITE addresses misframe",
    jurisdiction: "International",
    freshness: "HISTORICAL BY DESIGN",
    result: "Question reframed: original claim invalid as diagnosis sentence; rewrite candidate filed.",
    remaining_uncertainty: "Still needs sourced modules after rewrite approval.",
    closeout_status: "CLOSED — QUESTION INVALID / MISFRAMED"
  },
  {
    id: "CC-RQ-P21-AUD-009",
    claims: ["CC-CLAIM-009"],
    why_p0: "Prediction must leave diagnosis claim set.",
    evidence_needed: "Retirement recommendation + prediction ledger migration.",
    sources_reviewed: [],
    best_support: "Prediction ledger entry CC-PRED-009 created; claim preserved.",
    best_contrary: "n/a",
    fit: "n/a",
    jurisdiction: "US",
    freshness: "n/a",
    result: "Formal retirement recommendation PENDING approval; historical claim retained.",
    remaining_uncertainty: "Awaiting Steve/governance approval to mark fully retired.",
    closeout_status: "CLOSED — QUALIFIES"
  }
];

// Update RQ statuses in research_questions.json
for (const item of p0Ledger) {
  const q = (rqDoc.questions || []).find((x) => x.id === item.id);
  if (q) {
    q.status = item.closeout_status.startsWith("CLOSED") ? "closed_in_slice" : "open";
    q.closeout_status = item.closeout_status;
    q.closeout_slice = SLICE;
    q.closeout_date = TODAY;
    q.last_updated = TODAY;
  }
}
rqDoc.last_updated = TODAY;

// --- Re-audit first-20 rows (canonical text unchanged) ---
const repairRows = [];
for (const row of priorMatrix.rows || []) {
  const id = row.claim_id;
  const claim = claimDoc.claims.find((c) => c.claim_id === id);
  let disposition = row.disposition;
  let fit = row.fit;
  let confidence = row.confidence;
  let defect = null;
  let rewrite = false;
  let p0_status = "n/a";
  let new_fit = fit;

  if (id === "CC-CLAIM-009") {
    disposition = "RETIRE";
    fit = "NON-SUPPORTING";
    new_fit = "N/A — RETIREMENT RECOMMENDED";
    defect = "FORECAST WITHOUT MODEL";
    p0_status = "AUD-009 CLOSED — QUALIFIES";
  } else if (id === "CC-CLAIM-015") {
    disposition = "SUPPORTED WITH QUALIFICATION";
    fit = "STRONG";
    new_fit = "STRONG";
    confidence = "Moderate";
    defect = null;
    p0_status = "005/014 CLOSED — QUALIFIES";
    claim.phase21_repair = {
      slice_id: SLICE,
      disposition,
      fit: new_fit,
      defect: null,
      confidence
    };
  } else if (id === "CC-CLAIM-014") {
    disposition = "SUPPORTED WITH QUALIFICATION";
    fit = "STRONG";
    new_fit = "STRONG";
    p0_status = "008 CLOSED — QUALIFIES";
  } else if (id === "CC-CLAIM-003") {
    disposition = "NOT ENOUGH EVIDENCE";
    fit = "WEAK";
    new_fit = "WEAK";
    defect = "CAUSAL OVERREACH";
    p0_status = "025/027 CLOSED — QUALIFIES (bibliography/discipline); claim remains NEE";
    confidence = "Low";
  } else if (id === "CC-CLAIM-016") {
    disposition = "REWRITE REQUIRED";
    fit = "WEAK";
    new_fit = "WEAK (proposed STRONG if rewrite approved)";
    defect = "CAUSAL OVERREACH";
    rewrite = true;
    p0_status = "022/024 CLOSED — QUALIFIES";
  } else if (["CC-CLAIM-001", "CC-CLAIM-010", "CC-CLAIM-017"].includes(id)) {
    disposition = "REWRITE REQUIRED";
    rewrite = true;
    defect =
      id === "CC-CLAIM-001"
        ? "WORDING TOO BROAD"
        : id === "CC-CLAIM-010"
          ? "FORECAST WITHOUT MODEL"
          : "WORDING TOO BROAD";
    new_fit =
      id === "CC-CLAIM-001"
        ? "NON-SUPPORTING (proposed PARTIAL)"
        : id === "CC-CLAIM-010"
          ? "NON-SUPPORTING (proposed PARTIAL)"
          : "PARTIAL (proposed STRONG)";
    p0_status = id === "CC-CLAIM-001" ? "AUD-001 CLOSED — MISFRAMED" : "open/partial";
  } else if (id === "CC-CLAIM-006") {
    disposition = "SUPPORTED WITH QUALIFICATION";
    fit = "PARTIAL";
    new_fit = "PARTIAL (proposed STRONG if rewrite approved)";
    defect = "CAUSAL OVERREACH";
    rewrite = true;
  } else if (id === "CC-CLAIM-007" || id === "CC-CLAIM-008" || id === "CC-CLAIM-018") {
    disposition = "NOT ENOUGH EVIDENCE";
    fit = "NON-SUPPORTING";
    new_fit = "NON-SUPPORTING";
    defect = id === "CC-CLAIM-008" ? "SOURCE GAP" : id === "CC-CLAIM-007" ? "SOURCE GAP" : "SOURCE GAP";
  } else if (id === "CC-CLAIM-005" || id === "CC-CLAIM-013" || id === "CC-CLAIM-020") {
    disposition = "SUPPORTED WITH QUALIFICATION";
    fit = "PARTIAL";
    new_fit = "PARTIAL";
    defect =
      id === "CC-CLAIM-005"
        ? "MEASUREMENT MISMATCH"
        : id === "CC-CLAIM-013"
          ? "SOURCE GAP"
          : "MEASUREMENT MISMATCH";
  } else if (id === "CC-CLAIM-011" || id === "CC-CLAIM-012") {
    disposition = "SUPPORTED AS WRITTEN";
    fit = "DIRECT";
    new_fit = "DIRECT";
  } else if (id === "CC-CLAIM-002" || id === "CC-CLAIM-004" || id === "CC-CLAIM-019") {
    disposition = "SUPPORTED WITH QUALIFICATION";
    fit = "STRONG";
    new_fit = "STRONG";
  }

  // Normalize new_fit category for counting
  let fitBucket = new_fit;
  if (new_fit.startsWith("DIRECT")) fitBucket = "DIRECT";
  else if (new_fit.startsWith("STRONG")) fitBucket = "STRONG";
  else if (new_fit.startsWith("PARTIAL")) fitBucket = "PARTIAL";
  else if (new_fit.startsWith("WEAK")) fitBucket = "WEAK";
  else if (new_fit.startsWith("NON-SUPPORTING")) fitBucket = "NON-SUPPORTING";
  else if (new_fit.startsWith("N/A")) fitBucket = "N/A_RETIRED";

  repairRows.push({
    claim_id: id,
    prior_disposition: row.disposition,
    defect: defect,
    p0_status,
    prior_fit: row.fit,
    new_fit: fitBucket,
    new_fit_detail: new_fit,
    rewrite,
    proposed_disposition: disposition,
    confidence: confidence || row.confidence,
    claim_text: claim?.claim_text
  });

  if (claim) {
    claim.phase21_repair = {
      slice_id: SLICE,
      disposition,
      fit: fitBucket,
      fit_detail: new_fit,
      defect,
      confidence: confidence || row.confidence,
      rewrite_queued: rewrite
    };
  }
}

const afterDisp = {};
const afterFit = {};
for (const r of repairRows) {
  afterDisp[r.proposed_disposition] = (afterDisp[r.proposed_disposition] || 0) + 1;
  afterFit[r.new_fit] = (afterFit[r.new_fit] || 0) + 1;
}
const afterWeak = repairRows.filter((r) =>
  ["PARTIAL", "WEAK", "NON-SUPPORTING"].includes(r.new_fit)
).length;
const afterDirectStrong = repairRows.filter((r) => ["DIRECT", "STRONG"].includes(r.new_fit)).length;
const p0Closed = p0Ledger.filter((p) => p.closeout_status.startsWith("CLOSED")).length;
const p0Open = p0Ledger.filter((p) => !p.closeout_status.startsWith("CLOSED")).length;

const pendingRewrites = governanceQueue.changes.filter(
  (c) => c.change_type === "REWRITE" && c.approval_status === "PENDING"
).length;

const gate02Reason = `GATE-02 remains open:
- ${afterWeak}/20 claims remain below STRONG source-to-claim fit (PARTIAL/WEAK/NON-SUPPORTING); ${afterDirectStrong}/20 are DIRECT/STRONG
- ${p0Open} P0 questions remain open (${p0Closed}/9 closed this slice)
- ${pendingRewrites} claims require governed rewrite approval before canonical wording can improve fit
- Political accountability (CC-CLAIM-003) remains NOT ENOUGH EVIDENCE despite FEC bibliography spine
- Baseline still 2/86; three-layer presence is not three-layer proof`;

const gate02 = "PARTIAL / REMAINS OPEN";
const g2 = checklist.gate_items.find((x) => x.id === "CC-P2-GATE-02");
if (g2) {
  g2.status = "open";
  g2.forensic_note = gate02Reason;
  g2.last_evaluated = TODAY;
  g2.slice_id = SLICE;
}
checklist.last_updated = TODAY;

// Knowledge graph — non-speculative
const nextNode = () => `CC-KG-${String(kgDoc.nodes.length + 1).padStart(3, "0")}`;
const nextEdge = () => `CC-KGE-${String(kgDoc.edges.length + 1).padStart(3, "0")}`;
function addNode(label, kind, extra = {}) {
  const hit = kgDoc.nodes.find((n) => n.label === label);
  if (hit) return hit.node_id;
  const id = nextNode();
  kgDoc.nodes.push({ node_id: id, label, kind, ...extra });
  return id;
}
if (!kgDoc.relationship_types.includes("retirement_recommended_by")) {
  kgDoc.relationship_types.push(
    "qualified_by",
    "retirement_recommended_by",
    "rewrite_proposed_by",
    "research_gap_for"
  );
}
const repairNode = addNode("Claim Repair Slice P21", "system", { related_slice: SLICE });
const c009n = addNode("CC-CLAIM-009", "metric", { claim_id: "CC-CLAIM-009" });
kgDoc.edges.push({
  edge_id: nextEdge(),
  from: repairNode,
  relation: "retirement_recommended_by",
  to: c009n,
  class: "documented",
  note: "Retirement recommendation PENDING governance approval; claim not deleted.",
  review_status: "draft"
});
for (const id of ["CC-CLAIM-001", "CC-CLAIM-010", "CC-CLAIM-016", "CC-CLAIM-017", "CC-CLAIM-006"]) {
  const n = addNode(id, "metric", { claim_id: id });
  kgDoc.edges.push({
    edge_id: nextEdge(),
    from: repairNode,
    relation: "rewrite_proposed_by",
    to: n,
    class: "documented",
    note: "Rewrite candidate PENDING; canonical text unchanged.",
    review_status: "draft"
  });
}
kgDoc.last_updated = TODAY;

// Persist registries
claimDoc.last_updated = TODAY;
claimDoc.version = "0.3.1";
writeJson("data/research/source_registry.json", srcDoc);
writeJson("data/research/claim_ledger.json", claimDoc);
writeJson("data/research/research_questions.json", rqDoc);
writeJson("data/project/prediction_ledger.json", predDoc);
writeJson("data/research/knowledge_graph.json", kgDoc);
writeJson("data/project/phase2_acceptance_checklist.json", checklist);

writeJson("research/phase_2/p0_closeout_ledger.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  closed: p0Closed,
  open: p0Open,
  items: p0Ledger
});
writeJson("research/phase_2/priority_claim_rewrite_candidates.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  rule: "Canonical claim_text not mutated.",
  candidates: rewrites
});
writeJson("research/phase_2/claim_change_governance_queue.json", governanceQueue);
writeJson("research/phase_2/claim_repair_matrix.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  before,
  after: {
    dispositions: afterDisp,
    fit: afterFit,
    weak_fit: afterWeak,
    direct_strong: afterDirectStrong,
    p0_closed: p0Closed,
    p0_open: p0Open,
    gate02
  },
  rows: repairRows
});
writeJson("research/phase_2/first_20_claim_evidence_matrix.json", {
  version: "0.2.0",
  slice_id: SLICE,
  generated_at: TODAY,
  prior_slice: "CC-PHASE-2.1-DIAGNOSIS-RESEARCH-CONTINUATION-1.0",
  disposition_counts: afterDisp,
  fit_counts: afterFit,
  rows: repairRows.map((r) => ({
    claim_id: r.claim_id,
    claim_text: r.claim_text,
    support_sources: claimDoc.claims.find((c) => c.claim_id === r.claim_id)?.source_ids || [],
    fit: r.new_fit,
    fit_detail: r.new_fit_detail,
    disposition: r.proposed_disposition,
    confidence: r.confidence,
    defect: r.defect
  }))
});

// Markdown reports
writeText(
  "reports/CC_PHASE_2_P0_CLOSEOUT_LEDGER.md",
  `# P0 Closeout Ledger

**Slice:** \`${SLICE}\`  
**Closed:** ${p0Closed} · **Open:** ${p0Open}

| RQ | Status | Claims | Result |
|---|---|---|---|
${p0Ledger.map((p) => `| ${p.id} | **${p.closeout_status}** | ${p.claims.join(", ")} | ${p.result} |`).join("\n")}
`
);

writeText(
  "reports/CC_PHASE_2_PRIORITY_CLAIM_REWRITE_CANDIDATES.md",
  `# Priority Claim Rewrite Candidates

**Rule:** Canonical wording is **not** overwritten. Approval status: PENDING.

${rewrites
  .map(
    (rw) => `## ${rw.claim_id}

**Current:** ${rw.current_wording}

**Why it fails:** ${rw.why_fails}

**Defect:** ${rw.defect_category}

**Proposed:** ${rw.proposed_replacement}

**Removed:** ${rw.removed.join("; ")}

**Narrowed:** ${rw.narrowed.join("; ")}

**Evidence:** ${(rw.evidence_supporting_replacement || []).join(", ") || "—"}

**Confidence:** ${rw.confidence}

**Governance:** ${rw.governance_recommendation}
`
  )
  .join("\n")}
`
);

writeText(
  "reports/CC_PHASE_2_CLAIM_REPAIR_MATRIX.md",
  `# Claim Repair Matrix

| Claim | Prior Disposition | Defect | P0 Status | New Fit | Rewrite? | Proposed Disposition | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
${repairRows
  .map(
    (r) =>
      `| ${r.claim_id} | ${r.prior_disposition} | ${r.defect || "—"} | ${r.p0_status} | ${r.new_fit} | ${r.rewrite ? "Y" : "N"} | ${r.proposed_disposition} | ${r.confidence} |`
  )
  .join("\n")}
`
);

writeText(
  "reports/CC_PHASE_2_1_PRIORITY_CLAIM_REPAIR_DELTA.md",
  `# Priority Claim Repair Delta

**Slice:** \`${SLICE}\`

| Metric | Before | After |
|---|---:|---:|
| P0 open | ${before.p0_open} | ${p0Open} |
| P0 closed (this slice) | 0 | ${p0Closed} |
| Sources | ${before.sources} | ${srcDoc.sources.length} |
| Weak-fit claims | ${before.weak_fit} | ${afterWeak} |
| Direct/Strong fit | ${before.direct_strong} | ${afterDirectStrong} |
| Baseline | ${before.baseline} | 2/86 |
| GATE-02 | ${before.gate02} | ${gate02} |

## Dispositions before → after

Before: ${JSON.stringify(before.dispositions)}

After: ${JSON.stringify(afterDisp)}

## What became more defensible?
- CC-CLAIM-015 with official QCEW concentration measurement (CC-SRC-091)
- CC-CLAIM-014 incidence Qualifies unchanged but P0 closed
- CC-CLAIM-016 scale/legal spines closed as questions even while wording awaits rewrite
- CC-CLAIM-003 honesty preserved while FEC bibliography opened

## What became narrower?
- Rewrite candidates for 001, 006, 010, 016, 017 (PENDING)
- 009 migrated to prediction ledger recommendation

## What was abandoned?
- Treating 009 as a diagnosis claim (retirement recommended)
- Treating e-commerce share registration as leakage proof

## What remains speculative?
- 003 capture/accountability causation
- 007 AI/automation
- 008 destination-based tax
- 010/009 forecasts until modeled
- 018 education-cost incidence

## Still depends on modeling
- 009/010 package vs tax / ownership-shift forecasts
- DEFERRED modeling noted for prediction ledger items

## Still depends on legal review
- Broader constitutional/legal tracks across domains
- Wayfair registered for tax collection only

## Fit before → after
Before: ${JSON.stringify(before.fit)}
After: ${JSON.stringify(afterFit)}
`
);

console.log(
  JSON.stringify(
    {
      p0Closed,
      p0Open,
      afterWeak,
      afterDirectStrong,
      afterDisp,
      afterFit,
      sources: srcDoc.sources.length,
      gate02,
      gate02Reason
    },
    null,
    2
  )
);
