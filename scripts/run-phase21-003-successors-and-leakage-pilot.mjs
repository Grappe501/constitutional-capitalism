/**
 * CC-PHASE-2.1-CLAIM-003-SUCCESSOR-GOVERNANCE-AND-LOCAL-LEAKAGE-MEASUREMENT-PILOT-1.0
 * Track A: govern 003 modules → successors/hypotheses/RQs + public reasoning
 * Track B: Faulkner County AR leakage measurement pilot (honest limits)
 */
import fs from "node:fs";
import path from "node:path";
import { r } from "./lib/paths.mjs";

const TODAY = "2026-08-07";
const SLICE =
  "CC-PHASE-2.1-CLAIM-003-SUCCESSOR-GOVERNANCE-AND-LOCAL-LEAKAGE-MEASUREMENT-PILOT-1.0";
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

const claimDoc = JSON.parse(fs.readFileSync(r("data/research/claim_ledger.json"), "utf8"));
const srcDoc = JSON.parse(fs.readFileSync(r("data/research/source_registry.json"), "utf8"));
const rqDoc = JSON.parse(fs.readFileSync(r("data/research/research_questions.json"), "utf8"));
const kgDoc = JSON.parse(fs.readFileSync(r("data/research/knowledge_graph.json"), "utf8"));
const checklist = JSON.parse(
  fs.readFileSync(r("data/project/phase2_acceptance_checklist.json"), "utf8")
);
const priorMatrix = JSON.parse(
  fs.readFileSync(r("research/phase_2/first_20_claim_evidence_matrix.json"), "utf8")
);
const prRegistry = JSON.parse(
  fs.readFileSync(r("research/phase_2/public_reasoning_registry.json"), "utf8")
);
const modulesDoc = JSON.parse(
  fs.readFileSync(r("research/phase_2/claim_003_research_modules.json"), "utf8")
);
const buildState = JSON.parse(fs.readFileSync(r("data/project/current_build_state.json"), "utf8"));
const sliceQueue = JSON.parse(fs.readFileSync(r("data/project/slice_queue.json"), "utf8"));

const beforeWeak = priorMatrix.weak_fit_below_strong ?? 8;
const beforeStrong = priorMatrix.direct_strong_fit ?? 11;

function claim(id) {
  return claimDoc.claims.find((c) => c.claim_id === id);
}

// ============================================================================
// Sources
// ============================================================================
const newSources = [
  {
    source_id: "CC-SRC-101",
    title: "U.S. Census Bureau QuickFacts: Faulkner County, Arkansas",
    authors: ["U.S. Census Bureau"],
    year: 2025,
    url: "https://www.census.gov/quickfacts/faulknercountyarkansas",
    source_type: "federal_statistical",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US-AR-Faulkner",
    research_domain: "internet_commerce",
    publication_date: "2025",
    retrieval_date: TODAY,
    summary:
      "Official QuickFacts for Faulkner County, AR including population estimates, 2022 Economic Census retail sales ($2,537,534 thousand), retail sales per capita ($19,892), transportation/warehousing receipts, and 2023 County Business Patterns employer establishments (2,990) and employment (37,718).",
    key_findings: [
      "2022 total retail sales about $2.54 billion; per capita about $19,892",
      "2023 employer employment 37,718 across 2,990 establishments",
      "2022 transportation and warehousing receipts about $116.2 million"
    ],
    limitations:
      "Aggregate retail sales are not e-commerce; not ownership-of-profits; not leakage. Economic Census and CBP definitions differ from household consumption maps.",
    ideological_or_institutional_considerations: "Official Census QuickFacts compilation.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "Primary geography spine for leakage measurement pilot."
  },
  {
    source_id: "CC-SRC-102",
    title: "Remote Sellers and Marketplace Facilitators — Arkansas DFA",
    authors: ["Arkansas Department of Finance and Administration"],
    year: 2019,
    url: "https://www.dfa.arkansas.gov/office/taxes/excise-tax-administration/sales-use-tax/remote-sellers/",
    source_type: "state_government",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US-AR",
    research_domain: "internet_commerce",
    publication_date: "2019-07-01",
    retrieval_date: TODAY,
    summary:
      "Arkansas Act 822 (effective July 1, 2019) requires remote sellers and marketplace facilitators exceeding $100,000 in Arkansas sales or 200 transactions to collect and remit state and local sales/use tax — Arkansas implementation of post-Wayfair destination-based collection.",
    key_findings: [
      "Economic nexus thresholds for remote sellers/marketplace facilitators",
      "State and local sales/use tax remittance obligation into Arkansas"
    ],
    limitations:
      "Legal framework — not county-level remittance totals attributable to e-commerce; local NAICS distribution reports exist separately and were not scraped into a time series in this pilot.",
    ideological_or_institutional_considerations: "State tax administration.",
    verification_status: "url_verified_via_fetch",
    notes: "Fiscal remittance legal spine for LEAK-COMP-04."
  },
  {
    source_id: "CC-SRC-103",
    title: "The Theory of Economic Regulation",
    authors: ["George J. Stigler"],
    year: 1971,
    url: "https://doi.org/10.2307/3003160",
    source_type: "peer_reviewed",
    reliability: "scholarly_primary_analysis",
    primary_or_secondary: "secondary",
    jurisdiction: "US",
    research_domain: "political_economic_power",
    publication_date: "1971",
    retrieval_date: TODAY,
    summary:
      "Classic Bell Journal article arguing regulation is often acquired by industry and operated primarily for its benefit — foundational theoretical literature for regulatory-capture research. Does not by itself establish contemporary U.S. national capture from economic concentration.",
    key_findings: [
      "Industry demand for regulation as private benefit",
      "Theoretical supply-side of political process favoring organized interests"
    ],
    limitations:
      "Theoretical/illustrative; contested empirical generalizations; not a measurement of modern national democratic accountability; Stigler did not use the phrase 'regulatory capture' in the article itself.",
    ideological_or_institutional_considerations: "Foundational Chicago-school regulation theory.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "THEORETICAL spine for Module D — not causal proof for CC-CLAIM-003."
  },
  {
    source_id: "CC-SRC-104",
    title: "County Business Patterns (program page)",
    authors: ["U.S. Census Bureau"],
    year: 2025,
    url: "https://www.census.gov/programs-surveys/cbp.html",
    source_type: "federal_statistical",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "internet_commerce",
    publication_date: "2025",
    retrieval_date: TODAY,
    summary:
      "Official CBP program documentation: annual subnational establishment, employment, and payroll statistics by NAICS. API access now requires a Census API key; QuickFacts aggregates used for Faulkner County pilot when keyed API pulls unavailable.",
    key_findings: [
      "CBP provides county industry employment/payroll",
      "Excludes most self-employed and most government employment"
    ],
    limitations: "Disclosure suppressions; not sales; not e-commerce share; API key gated.",
    ideological_or_institutional_considerations: "Official Census program.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "Methodology reference for pilot data inventory."
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
// TRACK A — Module audit + governance
// ============================================================================

const moduleAudits = [
  {
    module_id: "CC-MOD-003-A",
    governance: "RECLASSIFY",
    admissible_as: "CROSS_REFERENCE_TO_EXISTING_CLAIMS",
    epistemic_class: "EMPIRICAL_CLAIM",
    evidence_type: "DESCRIPTIVE",
    measurable: true,
    terminology_defined: true,
    falsifiable: true,
    evidence_exists: true,
    association_or_causation: "descriptive concentration (not causation to accountability)",
    geographic_scope: "US",
    temporal_scope: "recent SCF/DFA/Economic Census frames",
    decision_reason:
      "Empirically strong but redundant with CC-CLAIM-011 and CC-CLAIM-005. Do not create a duplicate canonical claim that smuggles accountability.",
    successor_claim_id: null,
    points_to: ["CC-CLAIM-011", "CC-CLAIM-005"]
  },
  {
    module_id: "CC-MOD-003-B",
    governance: "APPROVE_WITH_MODIFY",
    admissible_as: "EMPIRICAL_CLAIM",
    epistemic_class: "EMPIRICAL_CLAIM",
    evidence_type: "ASSOCIATIONAL (contested causal interpretation)",
    measurable: true,
    terminology_defined: true,
    falsifiable: true,
    evidence_exists: true,
    association_or_causation: "association; causation contested",
    geographic_scope: "US national policy sample (Gilens/Page frame)",
    temporal_scope: "late 20th / early 21st century policy cases in source",
    decision_reason:
      "Promote narrow unequal-responsiveness claim with contrary Branham/Soroka/Wlezien explicit. Forbidden words (capture/control/buy/owns/determines) excluded.",
    successor_claim_id: "CC-CLAIM-133",
    successor_text:
      "Under some research designs, U.S. national policy outcomes associate more strongly with affluent and organized-business preferences than with average-citizen preferences when those preferences diverge; the magnitude and causal interpretation remain contested, and association is not the same as capture or control."
  },
  {
    module_id: "CC-MOD-003-C",
    governance: "APPROVE",
    admissible_as: "EMPIRICAL_CLAIM",
    epistemic_class: "EMPIRICAL_CLAIM",
    evidence_type: "DESCRIPTIVE",
    measurable: true,
    terminology_defined: true,
    falsifiable: true,
    evidence_exists: true,
    association_or_causation: "descriptive disclosure (not influence)",
    geographic_scope: "US federal",
    temporal_scope: "ongoing disclosure systems",
    decision_reason:
      "Direct fit to FEC/LDA sources. Explicitly states disclosure ≠ accountability weakening.",
    successor_claim_id: "CC-CLAIM-134",
    successor_text:
      "Federal campaign-finance and lobbying disclosure systems make large flows of political money and lobbying activity publicly observable; those disclosures do not by themselves establish that economic concentration weakens democratic accountability."
  },
  {
    module_id: "CC-MOD-003-D",
    governance: "RECLASSIFY",
    admissible_as: "HYPOTHESIS",
    epistemic_class: "HYPOTHESIS",
    evidence_type: "THEORETICAL (+ future sectoral)",
    measurable: "sector-by-sector only",
    terminology_defined: true,
    falsifiable: true,
    evidence_exists: "theory yes (Stigler); contemporary sectoral capture dossiers not yet registered",
    association_or_causation: "theoretical mechanism; causal claims require sector evidence",
    geographic_scope: "sector/agency-specific (not national blanket)",
    temporal_scope: "open",
    decision_reason:
      "High bar to 'capture' unmet for a canonical claim. Keep as hypothesis CC-HYP-003-D. Forbidden mechanism verbs not used in claim form.",
    successor_claim_id: null,
    hypothesis_id: "CC-HYP-003-D",
    hypothesis_text:
      "In specific regulated sectors, industry actors may systematically shape the agencies that regulate them; each alleged case requires sector evidence and is not established by national concentration statistics or campaign-finance totals alone."
  },
  {
    module_id: "CC-MOD-003-E",
    governance: "RECLASSIFY",
    admissible_as: "RESEARCH_QUESTION",
    epistemic_class: "RESEARCH_QUESTION",
    evidence_type: "THEORETICAL / UNDER-IDENTIFIED",
    measurable: "debated at national level",
    terminology_defined: true,
    falsifiable: "only with operational state-capture standard",
    evidence_exists: false,
    association_or_causation: "not established",
    geographic_scope: "US national — not established",
    temporal_scope: "open",
    decision_reason:
      "NOT ADMISSIBLE as canonical claim. Remains research question. Contrary congruence literature warns against oligarchy shortcuts.",
    successor_claim_id: null,
    research_question_id: "CC-RQ-P21-031"
  }
];

writeJson("research/phase_2/claim_003_module_governance.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  adjudicator: ADJUDICATOR,
  decision_authority: "CC-DEC-103 routine epistemic classification (no philosophy stop)",
  forbidden_words_for_capture_claims: ["capture", "control", "buy", "owns", "determines"],
  investigation_chain_not_causation: [
    "Political spending",
    "Access",
    "Political responsiveness",
    "Policy influence",
    "Regulatory capture"
  ],
  note: "Arrows are questions to investigate — not encoded as causation.",
  parent_claim_id: "CC-CLAIM-003",
  parent_disposition: "NOT ENOUGH EVIDENCE",
  parent_action: "PRESERVE — historical umbrella explaining why decomposition was necessary",
  audits: moduleAudits,
  philosophy_decision_required: false
});

// Add successor claims 133, 134
function upsertClaim(obj) {
  const i = claimDoc.claims.findIndex((c) => c.claim_id === obj.claim_id);
  if (i >= 0) claimDoc.claims[i] = { ...claimDoc.claims[i], ...obj };
  else claimDoc.claims.push(obj);
}

upsertClaim({
  claim_id: "CC-CLAIM-133",
  claim_text: moduleAudits[1].successor_text,
  chapter_ids: [],
  claim_type: "political_responsiveness",
  claim_class: "descriptive_empirical",
  epistemic_class: "EMPIRICAL_CLAIM",
  importance: "high",
  support_level: "supported_with_qualification",
  evidence_strength: "moderate",
  consensus_status: "contested_across_literatures",
  source_ids: ["CC-SRC-094", "CC-SRC-095"],
  opposing_evidence: [
    "Branham, Soroka & Wlezien 2017: when income groups disagree, the rich do not dominate (CC-SRC-095)."
  ],
  uncertainty: "Association ≠ capture; preference correlation and identification debates remain.",
  fact_check_status: "audited",
  publication_readiness: "not_ready",
  geographic_scope: "US",
  temporal_scope: "late_20th_early_21st_century_policy_samples",
  parent_claim_id: "CC-CLAIM-003",
  successor_of_module: "CC-MOD-003-B",
  governance: {
    decision: "APPROVE_WITH_MODIFY",
    adjudicator: ADJUDICATOR,
    decision_id: DECISION_ID,
    slice_id: SLICE,
    at: TODAY
  },
  phase21_audit: {
    slice_id: SLICE,
    audited_at: TODAY,
    disposition: "SUPPORTED WITH QUALIFICATION",
    source_to_claim_fit: "PARTIAL",
    confidence: "Moderate",
    evidence_type: "ASSOCIATIONAL",
    reasoning: "Gilens/Page association with explicit contrary and no capture language."
  }
});

upsertClaim({
  claim_id: "CC-CLAIM-134",
  claim_text: moduleAudits[2].successor_text,
  chapter_ids: [],
  claim_type: "political_disclosure",
  claim_class: "descriptive_empirical",
  epistemic_class: "EMPIRICAL_CLAIM",
  importance: "high",
  support_level: "supported",
  evidence_strength: "strong",
  consensus_status: "established_descriptive",
  source_ids: ["CC-SRC-092", "CC-SRC-093", "CC-SRC-096"],
  opposing_evidence: [],
  uncertainty: "Disclosure completeness and state/local coverage limits.",
  fact_check_status: "audited",
  publication_readiness: "not_ready",
  geographic_scope: "US-federal",
  temporal_scope: "ongoing",
  parent_claim_id: "CC-CLAIM-003",
  successor_of_module: "CC-MOD-003-C",
  governance: {
    decision: "APPROVE",
    adjudicator: ADJUDICATOR,
    decision_id: DECISION_ID,
    slice_id: SLICE,
    at: TODAY
  },
  phase21_audit: {
    slice_id: SLICE,
    audited_at: TODAY,
    disposition: "SUPPORTED AS WRITTEN",
    source_to_claim_fit: "DIRECT",
    confidence: "High",
    evidence_type: "DESCRIPTIVE",
    reasoning: "FEC/LDA disclosure spines; explicit non-inference to accountability."
  }
});

const c003 = claim("CC-CLAIM-003");
c003.lifecycle_status = "active_historical_umbrella";
c003.decomposition_status = {
  slice_id: SLICE,
  parent_disposition: "NOT ENOUGH EVIDENCE",
  retained: true,
  deleted: false,
  successors: ["CC-CLAIM-133", "CC-CLAIM-134"],
  hypotheses: ["CC-HYP-003-D"],
  research_questions: ["CC-RQ-P21-031"],
  reclassified_modules: ["CC-MOD-003-A"]
};
c003.phase21_audit = {
  ...(c003.phase21_audit || {}),
  slice_id: SLICE,
  audited_at: TODAY,
  disposition: "NOT ENOUGH EVIDENCE",
  source_to_claim_fit: "PARTIAL",
  confidence: "Low",
  reasoning:
    "Parent preserved as historical umbrella. Narrow successors 133/134 carry what evidence can support. Capture modules not promoted."
};

modulesDoc.version = "0.2.0";
modulesDoc.slice_id = SLICE;
modulesDoc.governance = "research/phase_2/claim_003_module_governance.json";
modulesDoc.parent_status = "NOT ENOUGH EVIDENCE — preserved historical umbrella";
for (const m of modulesDoc.modules) {
  const a = moduleAudits.find((x) => x.module_id === m.module_id);
  if (a) {
    m.governance_decision = a.governance;
    m.admissible_as = a.admissible_as;
    m.evidence_type = a.evidence_type;
    m.successor_claim_id = a.successor_claim_id || null;
    m.hypothesis_id = a.hypothesis_id || null;
  }
}
writeJson("research/phase_2/claim_003_research_modules.json", modulesDoc);

writeJson("research/phase_2/hypothesis_registry_political_power.json", {
  version: "0.1.0",
  slice_id: SLICE,
  hypotheses: [
    {
      hypothesis_id: "CC-HYP-003-D",
      text: moduleAudits[3].hypothesis_text,
      epistemic_class: "HYPOTHESIS",
      parent_claim_id: "CC-CLAIM-003",
      module_id: "CC-MOD-003-D",
      theoretical_sources: ["CC-SRC-103"],
      empirical_status: "sectoral dossiers not yet registered",
      not_empirical_proof: true
    }
  ]
});

const rqKey = rqDoc.questions ? "questions" : "research_questions";
const rq031 = {
  id: "CC-RQ-P21-031",
  question:
    "Does U.S. national politics meet an operational state-capture standard, and if so under what measurement and identification design?",
  status: "open",
  domain: "political_economic_power",
  slice_id: SLICE,
  created: TODAY,
  last_updated: TODAY,
  priority: "P1",
  parent_claim_id: "CC-CLAIM-003",
  module_id: "CC-MOD-003-E"
};
if (!(rqDoc[rqKey] || []).find((q) => q.id === "CC-RQ-P21-031")) {
  rqDoc[rqKey].push(rq031);
}
rqDoc.last_updated = TODAY;
writeJson("data/research/research_questions.json", rqDoc);

// ============================================================================
// TRACK B — Faulkner County leakage pilot
// ============================================================================

const geo = {
  geography_id: "US-AR-Faulkner-County",
  name: "Faulkner County, Arkansas",
  fips: "05045",
  selection_method: {
    criteria: [
      "data_availability",
      "clear_geographic_boundaries",
      "economic_data_availability",
      "retail_data_availability",
      "population_scale",
      "BEA_compatibility",
      "replicability",
      "research_usefulness"
    ],
    candidates_considered: [
      {
        name: "Rose Bud / Lewisville (future LCL towns)",
        rejected_because:
          "Must not auto-select future LCLs; town-scale retail/e-commerce flows largely unavailable"
      },
      {
        name: "Pulaski County, AR",
        rejected_because:
          "Highest data density but metro complexity reduces interpretability as a bounded 'local' pilot"
      },
      {
        name: "Faulkner County, AR",
        selected_because:
          "Arkansas county with clear FIPS boundary; Census QuickFacts retail sales + CBP employment; mid-scale population; BEA RIMS-compatible county unit; not an LCL town; replicable to other AR counties"
      }
    ],
    selected: "Faulkner County, Arkansas",
    pilot_type: "measurement_pilot_not_LCL"
  }
};

const observed = {
  population_acs_2019_2023: {
    value: 126001,
    unit: "persons",
    status: "DIRECTLY_OBSERVABLE",
    source: "CC-SRC-101"
  },
  population_estimate_2024_07_01: {
    value: 131611,
    unit: "persons",
    status: "DIRECTLY_OBSERVABLE",
    source: "CC-SRC-101"
  },
  retail_sales_2022: {
    value: 2537534000,
    unit: "USD",
    status: "DIRECTLY_OBSERVABLE",
    source: "CC-SRC-101",
    note: "Economic Census aggregate retail sales — not e-commerce"
  },
  retail_sales_per_capita_2022: {
    value: 19892,
    unit: "USD",
    status: "DIRECTLY_OBSERVABLE",
    source: "CC-SRC-101"
  },
  employer_establishments_2023: {
    value: 2990,
    status: "DIRECTLY_OBSERVABLE",
    source: "CC-SRC-101"
  },
  total_employment_2023: {
    value: 37718,
    status: "DIRECTLY_OBSERVABLE",
    source: "CC-SRC-101"
  },
  transport_warehousing_receipts_2022: {
    value: 116192000,
    unit: "USD",
    status: "DIRECTLY_OBSERVABLE",
    source: "CC-SRC-101",
    note: "Receipts ≠ fulfillment employment attributable to e-commerce"
  },
  arkansas_remote_seller_nexus_law: {
    status: "DIRECTLY_OBSERVABLE",
    source: "CC-SRC-102",
    note: "Act 822 effective 2019-07-01; thresholds $100k or 200 transactions"
  }
};

const dataInventory = {
  version: "0.1.0",
  slice_id: SLICE,
  geography: geo,
  generated_at: TODAY,
  variables: [
    {
      variable: "Total retail sales",
      classification: "DIRECTLY_OBSERVABLE",
      source: "CC-SRC-101"
    },
    {
      variable: "Employer employment / establishments",
      classification: "DIRECTLY_OBSERVABLE",
      source: "CC-SRC-101"
    },
    {
      variable: "Transport/warehousing receipts",
      classification: "DIRECTLY_OBSERVABLE",
      source: "CC-SRC-101"
    },
    {
      variable: "Remote-seller / marketplace facilitator legal obligation",
      classification: "DIRECTLY_OBSERVABLE",
      source: "CC-SRC-102"
    },
    {
      variable: "County e-commerce share of retail",
      classification: "UNAVAILABLE",
      note: "Census national e-commerce share exists; county seller-location split not in QuickFacts"
    },
    {
      variable: "Online purchase seller location",
      classification: "UNAVAILABLE",
      note: "Platform proprietary; not in public county stats"
    },
    {
      variable: "Platform margins accruing outside county",
      classification: "UNAVAILABLE"
    },
    {
      variable: "Local retail margin (for RIMS)",
      classification: "ESTIMABLE",
      note: "Requires distribution-cost/margin tables + purchased RIMS II county multipliers — not applied without multipliers"
    },
    {
      variable: "RIMS II Type I/II multipliers (Faulkner)",
      classification: "UNAVAILABLE",
      note: "BEA sells region multipliers; no invented local multiplier used"
    },
    {
      variable: "Fulfillment employment offset attributable to e-commerce",
      classification: "PROXY_ONLY",
      note: "Transport/warehousing receipts observable; attribution to e-commerce not identified"
    },
    {
      variable: "Consumer surplus from e-commerce (county)",
      classification: "PROXY_ONLY",
      note: "National Dolfen et al. (CC-SRC-098); denser counties gained more — Faulkner is mixed density"
    },
    {
      variable: "Local sales-tax remittance from remote sellers by county",
      classification: "ESTIMABLE",
      note: "AR DFA Local Distribution by NAICS exists but e-commerce-attributable remittance not isolated in this pilot"
    },
    {
      variable: "Profit ownership of remote platform firms",
      classification: "UNAVAILABLE"
    },
    {
      variable: "Local vs non-local ownership of local retail firms",
      classification: "UNAVAILABLE"
    }
  ]
};

const flowMap = {
  version: "0.1.0",
  slice_id: SLICE,
  geography: geo.geography_id,
  note: "Measurement map — not a causal model. No Economic Flow → Prosperity edges.",
  nodes: [
    "HOUSEHOLDS",
    "CONSUMPTION",
    "LOCAL_BUSINESSES",
    "WAGES",
    "SUPPLIERS_LOCAL",
    "SUPPLIERS_NONLOCAL",
    "PROFITS_LOCAL_OWNERS",
    "PROFITS_NONLOCAL_OWNERS",
    "TAXES_LOCAL",
    "TAXES_STATE",
    "TAXES_FEDERAL",
    "REMOTE_SELLERS_PLATFORMS"
  ],
  edges: [
    { from: "HOUSEHOLDS", to: "CONSUMPTION", relation: "spend" },
    { from: "CONSUMPTION", to: "LOCAL_BUSINESSES", relation: "local_purchase", measurable: "partial" },
    {
      from: "CONSUMPTION",
      to: "REMOTE_SELLERS_PLATFORMS",
      relation: "online_or_remote_purchase",
      measurable: "unavailable_at_county"
    },
    { from: "LOCAL_BUSINESSES", to: "WAGES", relation: "pay", measurable: "aggregate_cbp_yes" },
    { from: "WAGES", to: "HOUSEHOLDS", relation: "income", measurable: "partial" },
    {
      from: "LOCAL_BUSINESSES",
      to: "SUPPLIERS_LOCAL",
      relation: "intermediate_purchase",
      measurable: "unavailable"
    },
    {
      from: "LOCAL_BUSINESSES",
      to: "SUPPLIERS_NONLOCAL",
      relation: "intermediate_purchase",
      measurable: "unavailable"
    },
    {
      from: "LOCAL_BUSINESSES",
      to: "PROFITS_LOCAL_OWNERS",
      relation: "profit_distribution",
      measurable: "unavailable"
    },
    {
      from: "LOCAL_BUSINESSES",
      to: "PROFITS_NONLOCAL_OWNERS",
      relation: "profit_distribution",
      measurable: "unavailable"
    },
    {
      from: "CONSUMPTION",
      to: "TAXES_LOCAL",
      relation: "sales_use_tax",
      measurable: "legal_yes_amount_attribution_no"
    },
    { from: "CONSUMPTION", to: "TAXES_STATE", relation: "sales_use_tax", measurable: "legal_yes" },
    { from: "WAGES", to: "TAXES_FEDERAL", relation: "income_payroll_tax", measurable: "not_in_pilot" }
  ],
  flow_distinctions: [
    "Retail purchase outside geography",
    "Online purchase outside geography",
    "Local purchase from non-local firm",
    "Local purchase with non-local supply chain",
    "Profit distribution outside geography",
    "Labor income retained locally",
    "Tax revenue retained locally",
    "Local intermediate purchasing"
  ]
};

const pilot = {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  geography: geo,
  operational_definition: "research/phase_2/leakage_operational_definition.json",
  rims_discipline: {
    sources: ["CC-SRC-099", "CC-SRC-100"],
    rule: "No invented local multiplier. Retail requires margin not gross sales.",
    multipliers_applied: false,
    reason_not_applied:
      "Faulkner County RIMS II multipliers not purchased/available in environment; applying a borrowed multiplier would manufacture precision.",
    direct_indirect_induced:
      "Distinguished conceptually; none quantified for Faulkner in this pilot."
  },
  observed_facts: observed,
  e_commerce_hypothesis_test: {
    can_local_online_spending_be_measured: "NO — county series unavailable",
    can_seller_location_be_identified: "NO — public data",
    can_platform_margins_be_identified: "NO",
    can_fulfillment_offset_be_identified: "NOT SEPARATELY — only aggregate transport/warehousing receipts",
    what_tax_revenue_remains_locally: "LEGAL OBLIGATION YES; ATTRIBUTABLE AMOUNT NOT ISOLATED",
    wayfair_alter_tax_effects: "YES — AR Act 822 / DFA remote seller rules (CC-SRC-102)",
    consumer_surplus_benefits: "NATIONAL LITERATURE YES (CC-SRC-098); COUNTY TRANSFER PROXY ONLY",
    rural_product_access: "MIXED — national study finds denser counties gained more",
    local_businesses_export_via_platforms: "PLAUSIBLE — UNAVAILABLE in public county data",
    net_finding: "NOT_MEASURABLE",
    net_finding_explanation:
      "Public data establish retail scale and tax-law environment for Faulkner County but do not permit a defensible net e-commerce leakage estimate after required netting (margins, logistics, surplus, remittance, ownership)."
  },
  component_results: {
    "LEAK-COMP-01": "METHOD_READY — multipliers UNAVAILABLE; gross sales must not be treated as leakage",
    "LEAK-COMP-02": "PROXY_ONLY — transport/warehousing receipts observable; e-commerce attribution unidentified",
    "LEAK-COMP-03": "PROXY_ONLY — national consumer-surplus literature",
    "LEAK-COMP-04": "LEGAL_FRAMEWORK_OBSERVABLE — remittance attribution ESTIMABLE later via DFA NAICS extracts",
    "LEAK-COMP-05": "UNAVAILABLE"
  },
  honest_bottom_line:
    "Current public data do not permit a defensible net local e-commerce leakage estimate for Faulkner County. That is a research finding, not a failure of the pilot."
};

writeJson("research/phase_2/local_leakage_measurement_pilot.json", pilot);
writeJson("research/phase_2/local_economic_flow_map.json", flowMap);
writeJson("research/phase_2/local_leakage_data_inventory.json", dataInventory);

writeText(
  "reports/CC_LOCAL_LEAKAGE_MEASUREMENT_PILOT_1_0.md",
  `# Local Leakage Measurement Pilot 1.0

**Geography:** Faulkner County, Arkansas (FIPS 05045)  
**Type:** Measurement pilot — **not** an LCL  
**Net e-commerce leakage finding:** **NOT MEASURABLE** with current public data

## Why this geography

Selected for data availability, clear county boundaries, Arkansas relevance, BEA/RIMS compatibility, and replicability — explicitly **not** because it is a future LCL town.

## What we can observe

| Fact | Value | Source |
|---|---|---|
| ACS 2019–2023 population | 126,001 | CC-SRC-101 |
| 2024-07-01 population estimate | 131,611 | CC-SRC-101 |
| 2022 retail sales | ~$2.54 billion | CC-SRC-101 |
| 2022 retail sales / capita | ~$19,892 | CC-SRC-101 |
| 2023 employer employment | 37,718 | CC-SRC-101 |
| 2023 employer establishments | 2,990 | CC-SRC-101 |
| 2022 transport/warehousing receipts | ~$116.2 million | CC-SRC-101 |
| AR remote-seller nexus | Act 822 / Jul 1, 2019 | CC-SRC-102 |

## What we refused to invent

- County e-commerce share
- Seller location of online purchases
- Platform margins
- Faulkner-specific RIMS multipliers
- Net "money left town" number from gross retail sales

## RIMS discipline

Direct / indirect / induced effects distinguished conceptually. **No multiplier applied.**

## E-commerce hypothesis

**NOT MEASURABLE** at county net-leakage level. Legal tax environment is post-Wayfair; consumer-surplus literature is national/proxy only.
`
);

writeText(
  "reports/CC_LOCAL_LEAKAGE_DATA_LIMITATIONS_1_0.md",
  `# Local Leakage Data Limitations 1.0

## Classification summary

| Classification | Examples |
|---|---|
| DIRECTLY OBSERVABLE | Retail sales, employment, establishments, nexus law |
| ESTIMABLE | Local retail margins (with tables + purchased RIMS); DFA remittance extracts |
| PROXY ONLY | National e-commerce surplus; aggregate warehousing receipts |
| UNAVAILABLE | Seller location, platform margins, profit ownership, county e-commerce share |

## Census API note

Keyed Census API access was unavailable in this environment. QuickFacts official aggregates were used instead of fabricating CBP NAICS micro-extracts.

## Critical sentence

> **Current public data do not permit a defensible net local e-commerce leakage estimate for Faulkner County.**
`
);

writeText(
  "reports/CC_LOCAL_LEAKAGE_SECOND_ORDER_EFFECTS_1_0.md",
  `# Local Leakage Second-Order Effects 1.0

## Discipline applied

For every major finding we ask: benefit with cost, cost with benefit, who gains/loses, over what period, outside geography, and cross-system damage risk.

## Findings

1. **Post-Wayfair remittance**  
   - Benefit: local/state tax base less eroded by remote sales than pre-2019 myths implied.  
   - Cost: compliance burden on remote sellers; does not restore local retail margins or ownership.  
   - Who gains: local public budgets (if remitted). Who loses: households paying tax they might previously have avoided.  
   - Cross-system: fiscal health ≠ main-street employment.

2. **Large observed retail sales ($2.54B)**  
   - Benefit: shows substantial local retail activity remains.  
   - Cost: gross sales overstate local value added (goods often produced elsewhere) — RIMS margin rule.  
   - Second-order risk: using gross sales as "local prosperity" would mislead policy.

3. **Consumer surplus (national literature)**  
   - Benefit: variety/convenience, especially where local selection is thin.  
   - Cost: may coincide with local retail displacement; denser counties gained more in Dolfen et al.  
   - Cross-system: accessibility gains can reduce travel/time costs while still shifting ownership of profits.

4. **NOT MEASURABLE net leakage**  
   - Benefit: prevents false certainty and bad remedies.  
   - Cost: frustrates activists wanting a single number.  
   - Cross-system: preserves trust for later LCL work.

## Unintended consequence of premature leakage claims

If Constitutional Capitalism asserted net harm without measurement, it could push remedies that raise consumer prices or block rural access while missing the fiscal/ownership variables that actually matter.
`
);

writeText(
  "reports/CC_LOCAL_LEAKAGE_REPLICATION_PROTOCOL_1_0.md",
  `# Local Leakage Replication Protocol 1.0

## Can we repeat this for another Arkansas community without redesigning the methodology?

**Yes, at county scale** — with the same honesty rules.

## Steps

1. Select a county using the documented criteria (not LCL favoritism).  
2. Pull Census QuickFacts + Economic Census retail sales + CBP employment.  
3. Register AR DFA remote-seller/marketplace rules (statewide).  
4. Build flow map with the same eight flow distinctions.  
5. Classify every variable: DIRECTLY OBSERVABLE / ESTIMABLE / PROXY ONLY / UNAVAILABLE.  
6. Apply RIMS discipline: margins not gross sales; no invented multipliers.  
7. Answer e-commerce questions with NOT MEASURABLE when data fail.  
8. Write second-order effects and a public reasoning record.  
9. Do **not** encode flow → prosperity causation in the knowledge graph.

## What prevents town-scale replication today

Town-level e-commerce seller location, platform margins, and ownership splits are generally **UNAVAILABLE** in public data. Town pilots would need business surveys, tax microdata under legal access, or platform research partnerships.

## LCL bridge

When Living Community Laboratories begin, this county protocol is the outer ring; LCL surveys can fill UNAVAILABLE cells — they do not replace the honesty classification.
`
);

writeText(
  "reports/CC_PHASE_2_CLAIM_003_MODULE_GOVERNANCE.md",
  `# CC-CLAIM-003 Module Governance

Parent **preserved** as NOT ENOUGH EVIDENCE (historical umbrella).

| Module | Decision | Becomes |
|---|---|---|
| A | RECLASSIFY | Cross-ref to CC-CLAIM-011 / 005 |
| B | APPROVE_WITH_MODIFY | **CC-CLAIM-133** (PARTIAL / Qualifies) |
| C | APPROVE | **CC-CLAIM-134** (DIRECT / Supports) |
| D | RECLASSIFY | **CC-HYP-003-D** |
| E | RECLASSIFY | **CC-RQ-P21-031** |

Forbidden in capture claims unless mechanistically earned: capture, control, buy, owns, determines.

Investigation chain (not causation): spending → access → responsiveness → influence → regulatory capture.
`
);

// Public reasoning records
const newPR = [
  {
    record_id: "CC-PR-008",
    claim_id: "CC-CLAIM-003",
    change_type: "MODULE_GOVERNANCE_DECOMPOSITION",
    decision: "PRESERVE_PARENT_NEE_PROMOTE_NARROW_SUCCESSORS",
    skeptical_reader_question:
      "Why did you break apart the original claim about political power?",
    public_answer:
      "Because several related phenomena had been bundled together even though evidence for one does not establish the others. Campaign-finance totals can show money is disclosed. Some studies find unequal policy responsiveness. Neither fact proves 'capture,' 'control,' or that economic concentration weakens democratic accountability as a single mechanism. We kept the original claim visible as the historical record of the over-broad statement, and we promoted only the narrower statements the evidence can actually support.",
    what_we_originally_said: "Economic concentration can weaken democratic accountability.",
    what_made_us_question_it:
      "Concept collapse across spending, access, responsiveness, influence, and capture; high bar to capture language.",
    what_we_learned:
      "Political inequality is not automatically capture. Influence is not automatically control. Congruence is not automatically causation.",
    where_our_reasoning_was_weak: "One causal umbrella invited readers to treat adjacent literatures as proof.",
    what_we_now_say:
      "Parent remains NEE. Successors: CC-CLAIM-133 (unequal responsiveness, contested), CC-CLAIM-134 (disclosure descriptive). Capture remains hypothesis/RQ.",
    why_we_made_that_decision:
      "Intellectual cleanliness under CC-DEC-103 > preserving a dramatic claim.",
    what_we_still_dont_know:
      "Sectoral regulatory capture cases; whether any operational state-capture standard is met nationally.",
    what_else_this_could_affect: [
      "Political-power chapters",
      "Antitrust-as-democracy narratives",
      "Public education on money in politics"
    ],
    potential_secondary_effects_or_unintended_consequences: [
      "May disappoint readers seeking a single oligarchy thesis",
      "Creates clearer entry points for economists, lawyers, and organizers to challenge specific modules"
    ],
    what_evidence_could_change_our_mind_again:
      "Identified causal designs and sectoral dossiers that earn carefully worded capture claims without forbidden overclaim verbs."
  },
  {
    record_id: "CC-PR-009",
    claim_id: "CC-CLAIM-016",
    change_type: "MEASUREMENT_PILOT_REASSESSMENT",
    decision: "KEEP_SUPPORTED_WITH_QUALIFICATION",
    skeptical_reader_question: "Does shopping online hurt my town?",
    public_answer:
      "We measured what public data allow for Faulkner County, Arkansas. We can see large local retail sales and a post-Wayfair tax system that requires many remote sellers to remit sales tax. We cannot yet see a trustworthy net 'leakage' number after logistics jobs, consumer benefits, taxes remitted, and who owns the profits. So we will not pretend a simple yes-or-no answer. The honest answer today is: it depends on which flow you mean — and some of the most important flows are still unmeasurable in public statistics.",
    what_we_originally_said_before_rewrite:
      "Online commerce can extract spending from local economies via platform concentration and wealth leakage.",
    what_we_now_say: claim("CC-CLAIM-016").claim_text,
    what_made_us_question_it: "Undefined leakage + pilot showing NOT MEASURABLE net county estimate.",
    what_we_learned:
      "Gross retail sales are not local value added. Buying local does not guarantee money stays local. Local stores are not always locally owned.",
    where_our_reasoning_was_weak: "Earlier architecture suspected net harm without a measurement path.",
    why_we_made_that_decision:
      "Pilot supports keeping the rewritten claim's caution; it does not earn a stronger anti-ecommerce claim.",
    what_we_still_dont_know:
      "County e-commerce share, seller location, platform margins, profit ownership, RIMS-applied margin impacts.",
    what_else_this_could_affect: ["LCL survey design", "local tax policy", "main-street programs"],
    potential_secondary_effects_or_unintended_consequences: [
      "Policies that raise consumer costs or reduce rural access without measuring ownership/fiscal flows"
    ],
    what_evidence_could_change_our_mind_again:
      "County-attributable e-commerce flows with margin treatment, remittance extracts, and ownership data yielding a signed net estimate."
  }
];

for (const rec of newPR) {
  prRegistry.records.push({
    ...rec,
    decision_id: DECISION_ID,
    adjudicator: ADJUDICATOR,
    decided_at: TODAY,
    slice_id: SLICE
  });
  writeText(
    `reports/public_reasoning/${rec.record_id}_${rec.claim_id}.md`,
    `# ${rec.record_id} — ${rec.claim_id}

**Q:** ${rec.skeptical_reader_question}

## Public answer

${rec.public_answer}

| Field | Content |
|---|---|
| Originally | ${rec.what_we_originally_said || rec.what_we_originally_said_before_rewrite || ""} |
| Now | ${rec.what_we_now_say} |
| Why | ${rec.why_we_made_that_decision} |
| Still unknown | ${rec.what_we_still_dont_know} |
| Secondary effects | ${(rec.potential_secondary_effects_or_unintended_consequences || []).join("; ")} |
| Mind-changing evidence | ${rec.what_evidence_could_change_our_mind_again} |
`
  );
}
prRegistry.slice_id = SLICE;
prRegistry.last_updated = TODAY;
writeJson("research/phase_2/public_reasoning_registry.json", prRegistry);

writeText(
  "reports/CC_WHAT_WE_LEARNED_POLITICAL_POWER_AND_LOCAL_LEAKAGE_1_0.md",
  `# What We Learned: Political Power and Local Leakage

*Citizen-facing. Minimal jargon.*

## Does money buy political outcomes?

Money in politics is real and publicly disclosed at the federal level. Some research finds that when the preferences of average citizens and affluent or business groups diverge, policy lines up more often with the affluent and organized groups. Other research finds that income groups usually agree, and that the rich do not simply dominate when they disagree. **None of that equals proof that someone "bought" an outcome, "owns" the government, or that economic concentration automatically weakens democracy.**

## Is political influence the same as corruption?

No. Legal campaign contributions, lobbying, unequal responsiveness, regulatory capture, and criminal corruption are different things. Treating them as synonyms makes it harder to know what to measure — and easier to accuse without evidence.

## What would count as evidence of regulatory capture?

Evidence that, in a specific regulated sector, the industry systematically shapes the agency that regulates it for private benefit — not merely that the industry is large, concentrates markets, or spends on politics. Classic theory (Stigler) motivates the question; it does not finish the proof for America today.

## Why can't campaign-finance totals answer these questions by themselves?

Because totals describe **activity**, not **control**. Disclosure is necessary for research. It is not sufficient for a capture verdict.

## Does shopping online hurt my town?

It can change who gets the retail margin, who gets the logistics job, who gets the tax remittance, and who gets the profit — and those are different answers. In Faulkner County, Arkansas, we can see large retail sales and a modern tax remittance rule for many remote sellers. We **cannot** yet produce a trustworthy net "leakage" number from public data.

## Does buying from a local store mean the money stays local?

Not necessarily. Goods on the shelf may be produced elsewhere. Profits may accrue to non-local owners. Taxes may be shared across governments. Local purchase is one flow among many.

## Are local businesses always locally owned?

No — and public county statistics usually will not tell you ownership residence. That is one reason ownership questions need separate measurement.

## Why is this harder to measure than it sounds?

Because "money leaves town" collapses many flows into one slogan. Responsible measurement separates them, nets countervailing benefits, and admits when data are missing.

## What did Constitutional Capitalism originally assume?

Earlier wording too easily treated concentration as democratic harm, and online commerce as local extraction via "leakage."

## What did the research force us to reconsider?

We broke the political-power claim into pieces. We turned leakage from a slogan into a measurement problem. We kept only what evidence can carry.

## What don't we know yet?

Sectoral capture cases; national state-capture standards; county e-commerce shares; platform margins; profit ownership; RIMS-applied local margin impacts.

---

Related public reasoning: CC-PR-007, CC-PR-008, CC-PR-009.
`
);

// Reassess 016 — keep Qualifies/STRONG
const c016 = claim("CC-CLAIM-016");
c016.phase21_pilot_reassessment = {
  slice_id: SLICE,
  disposition: "SUPPORTED WITH QUALIFICATION",
  fit: "STRONG",
  note: "Pilot confirms measurement hardness; does not strengthen anti-ecommerce mechanism claim; rewritten wording remains appropriate."
};
c016.source_ids = Array.from(
  new Set([...(c016.source_ids || []), "CC-SRC-101", "CC-SRC-102", "CC-SRC-104"])
);

claimDoc.last_updated = TODAY;
writeJson("data/research/claim_ledger.json", claimDoc);

// First-20 matrix: 003 still NEE; annotate. Successors are outside first-20.
const rows = priorMatrix.rows.map((row) => {
  if (row.claim_id === "CC-CLAIM-003") {
    return {
      ...row,
      disposition: "NOT ENOUGH EVIDENCE",
      fit: "PARTIAL",
      note: "Preserved umbrella; successors CC-CLAIM-133/134 outside first-20; capture not promoted",
      successors: ["CC-CLAIM-133", "CC-CLAIM-134"],
      public_reasoning: ["CC-PR-007", "CC-PR-008"]
    };
  }
  if (row.claim_id === "CC-CLAIM-016") {
    return {
      ...row,
      disposition: "SUPPORTED WITH QUALIFICATION",
      fit: "STRONG",
      pilot_net_finding: "NOT_MEASURABLE",
      public_reasoning: ["CC-PR-005", "CC-PR-009"],
      note: "Pilot did not earn stronger claim; retained rewritten wording"
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
  version: "0.5.0",
  slice_id: SLICE,
  generated_at: TODAY,
  weak_fit_below_strong: weak_fit,
  direct_strong_fit: direct_strong,
  successor_claims_outside_first_20: {
    "CC-CLAIM-133": { fit: "PARTIAL", disposition: "SUPPORTED WITH QUALIFICATION" },
    "CC-CLAIM-134": { fit: "DIRECT", disposition: "SUPPORTED AS WRITTEN" }
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
- ${weak_fit}/20 first-20 claims remain below STRONG fit; ${direct_strong}/20 DIRECT/STRONG
- CC-CLAIM-003 parent remains NEE (successors 133/134 exist but first-20 umbrella unresolved as Supports)
- Local leakage pilot finding NOT MEASURABLE — internet domain still lacks net measurement
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

// KG
const nextNode = () => {
  const nums = kgDoc.nodes.map((n) => parseInt(String(n.node_id).replace(/\D/g, ""), 10) || 0);
  return Math.max(0, ...nums) + 1;
};
const nextEdge = () => {
  const nums = kgDoc.edges.map((e) => parseInt(String(e.edge_id).replace(/\D/g, ""), 10) || 0);
  return Math.max(0, ...nums) + 1;
};
let nId = nextNode();
let eId = nextEdge();
const geoNode = {
  node_id: `CC-KG-${String(nId++).padStart(3, "0")}`,
  label: "Faulkner County AR",
  kind: "geography",
  geography_id: "US-AR-Faulkner-County"
};
const measNode = {
  node_id: `CC-KG-${String(nId++).padStart(3, "0")}`,
  label: "Local Leakage Pilot Measurement",
  kind: "measurement",
  related_slice: SLICE
};
kgDoc.nodes.push(geoNode, measNode);
kgDoc.edges.push({
  edge_id: `CC-KGE-${String(eId++).padStart(3, "0")}`,
  from: geoNode.node_id,
  relation: "measured_by",
  to: measNode.node_id,
  class: "documented",
  note: "Measurement map — not causal prosperity link"
});
const c016n = kgDoc.nodes.find((n) => n.claim_id === "CC-CLAIM-016")?.node_id;
if (c016n) {
  kgDoc.edges.push({
    edge_id: `CC-KGE-${String(eId++).padStart(3, "0")}`,
    from: measNode.node_id,
    relation: "informs",
    to: c016n,
    class: "documented",
    note: "Pilot finding NOT MEASURABLE for net leakage; claim retained as Qualifies"
  });
}
kgDoc.last_updated = TODAY;
writeJson("data/research/knowledge_graph.json", kgDoc);

buildState.version = "0.4.1";
buildState.last_updated = TODAY;
buildState.mission_id = SLICE;
buildState.slice_return =
  "reports/CC_PHASE_2_1_CLAIM_003_SUCCESSOR_GOVERNANCE_AND_LOCAL_LEAKAGE_MEASUREMENT_PILOT_1_0_RETURN.md";
buildState.writing_focus =
  "003 decomposed (133/134 live; capture not promoted). Faulkner leakage pilot: NOT MEASURABLE net. Public reasoning + citizen lessons shipped.";
buildState.next_action =
  "Sectoral capture dossiers OR DFA remittance extract + purchased RIMS for second geography; continue THIN domains without slogans.";
buildState.gate_02 = gate02Determination;
buildState.weak_fit_claims = weak_fit;
buildState.direct_strong_fit = direct_strong;
buildState.sources_registered = srcDoc.sources.length;
buildState.baseline = "2/86";
buildState.leakage_pilot = "Faulkner County — NOT MEASURABLE net";
writeJson("data/project/current_build_state.json", buildState);

writeJson("data/project/latest_cursor_return.json", {
  version: "0.1.0",
  generated_at: TODAY,
  slice_id: SLICE,
  summary: `003 modules governed: successors 133/134; parent NEE preserved; capture→hypothesis/RQ. Faulkner County leakage pilot: NOT MEASURABLE net. Sources ${srcDoc.sources.length}. First-20 below STRONG ${beforeWeak}→${weak_fit}. GATE-02 open.`,
  return_report:
    "reports/CC_PHASE_2_1_CLAIM_003_SUCCESSOR_GOVERNANCE_AND_LOCAL_LEAKAGE_MEASUREMENT_PILOT_1_0_RETURN.md",
  gate_02: gate02Determination
});

const sliceEntry = {
  slice_id: SLICE,
  title: "Claim-003 Successor Governance + Local Leakage Measurement Pilot",
  status: "completed",
  completed_at: TODAY,
  completion_evidence: [
    "module governance A–E",
    "CC-CLAIM-133/134",
    "Faulkner pilot NOT MEASURABLE",
    "public reasoning CC-PR-008/009",
    "citizen lessons report"
  ],
  next_recommended_slice:
    "CC-PHASE-2.1-SECTORAL-CAPTURE-DOSSIERS-OR-RIMS-ENABLED-SECOND-GEOGRAPHY-1.0",
  note: "Ask questions; follow evidence. No manufactured leakage number."
};
const ex = sliceQueue.slices.find((s) => s.slice_id === SLICE);
if (ex) Object.assign(ex, sliceEntry);
else sliceQueue.slices.push(sliceEntry);
sliceQueue.active_slice = sliceEntry.next_recommended_slice;
sliceQueue.last_updated = TODAY;
writeJson("data/project/slice_queue.json", sliceQueue);

const returnMd = `# ${SLICE} — Return

## 1. Executive Summary

Track A decomposed political power without promoting capture slogans. Track B ran a Faulkner County, AR leakage pilot and found **net e-commerce leakage NOT MEASURABLE** with current public data — a valuable finding. Parent **CC-CLAIM-003 remains NEE**. Successors **CC-CLAIM-133** (PARTIAL) and **CC-CLAIM-134** (DIRECT) now carry what evidence can support.

**First-20 below STRONG: ${beforeWeak} → ${weak_fit}**  
**GATE-02: ${gate02Determination}**  
**Baseline: 2/86**  
**Sources: ${srcDoc.sources.length}**  
**Philosophy stop: none**

## 2. Claim-003 Module Decisions

| Module | Decision | Outcome |
|---|---|---|
| A | RECLASSIFY | Cross-ref 011/005 |
| B | APPROVE_WITH_MODIFY | CC-CLAIM-133 |
| C | APPROVE | CC-CLAIM-134 |
| D | RECLASSIFY | CC-HYP-003-D |
| E | RECLASSIFY | CC-RQ-P21-031 |

## 3. Successor Claims / Hypotheses / Questions

- **CC-CLAIM-133** — unequal responsiveness (associational; contested)
- **CC-CLAIM-134** — disclosure descriptive (direct)
- **CC-HYP-003-D** — sectoral regulatory shaping hypothesis
- **CC-RQ-P21-031** — state-capture standard research question

## 4. Public Reasoning

- CC-PR-008 — why break apart political power
- CC-PR-009 — does shopping online hurt my town?

## 5. Pilot Geography

**Faulkner County, Arkansas** — selected for data/boundaries/BEA compatibility/replicability; **not** an LCL town.

## 6–8. Data / Observable vs Estimated / Leakage Findings

See pilot JSON + data inventory. Net finding: **NOT MEASURABLE**.

## 9. E-commerce Findings

Legal remittance environment post-Wayfair (AR Act 822). County share/seller location/margins unavailable. Consumer surplus national/proxy only.

## 10. Second-Order Effects

Documented in \`CC_LOCAL_LEAKAGE_SECOND_ORDER_EFFECTS_1_0.md\`.

## 11. Unexpected Findings

The strongest result is negative capability: refusing a leakage number when data cannot support one.

## 12. CC-CLAIM-016 Disposition

**SUPPORTED WITH QUALIFICATION / STRONG** (unchanged) — pilot confirms caution; does not strengthen mechanism claims.

## 13. CC-CLAIM-003 Disposition

**NOT ENOUGH EVIDENCE** (preserved umbrella). Option B partially executed via successors without deleting parent.

## 14. First-20 Fit

Below STRONG **${beforeWeak} → ${weak_fit}**; DIRECT/STRONG **${beforeStrong} → ${direct_strong}**.

## 15. GATE-02

# ${gate02Determination}

| ID | Text | Status |
|---|---|---|
${gateTable}

## 16. Baseline

2/86

## 17. New Research Questions

CC-RQ-P21-031 (state capture standard)

## 18. Validators

Run after script.

## 19. Files Changed

Claim ledger 133/134; module governance; Faulkner pilot artifacts; public reasoning; citizen lessons; sources 101–104.

## 20. Commit Hash

_(working tree)_

## 21. Exact Next Slice

\`CC-PHASE-2.1-SECTORAL-CAPTURE-DOSSIERS-OR-RIMS-ENABLED-SECOND-GEOGRAPHY-1.0\`
`;

writeText(
  `reports/CC_PHASE_2_1_CLAIM_003_SUCCESSOR_GOVERNANCE_AND_LOCAL_LEAKAGE_MEASUREMENT_PILOT_1_0_RETURN.md`,
  returnMd
);

console.log("=== COMPLETE ===");
console.log("sources", srcDoc.sources.length);
console.log("below STRONG", beforeWeak, "->", weak_fit);
console.log("leakage", pilot.e_commerce_hypothesis_test.net_finding);
console.log("003 parent NEE preserved; successors 133/134");
