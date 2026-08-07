/**
 * CC-PHASE-2.1-UTILITIES-PEER-REVIEW-CONFIRMATION-AND-AGRICULTURE-INFLUENCE-DOSSIER-1.0
 *
 * Track A: independently test electric-utility WP against peer-reviewed / contrary evidence
 * Track B: first rigorous agriculture influence dossier (competing interests; cases; levels)
 * No forced geography; Faulkner not redone; capture not promoted unless mechanistically earned
 */
import fs from "node:fs";
import path from "node:path";
import { r } from "./lib/paths.mjs";

const TODAY = "2026-08-07";
const SLICE =
  "CC-PHASE-2.1-UTILITIES-PEER-REVIEW-CONFIRMATION-AND-AGRICULTURE-INFLUENCE-DOSSIER-1.0";
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
const sectoral = JSON.parse(
  fs.readFileSync(r("research/phase_2/sectoral_political_influence_capture_dossiers.json"), "utf8")
);
const buildState = JSON.parse(fs.readFileSync(r("data/project/current_build_state.json"), "utf8"));
const sliceQueue = JSON.parse(fs.readFileSync(r("data/project/slice_queue.json"), "utf8"));

const beforeWeak = priorMatrix.weak_fit_below_strong ?? 8;
const beforeStrong = priorMatrix.direct_strong_fit ?? 11;

function claim(id) {
  return claimDoc.claims.find((c) => c.claim_id === id);
}

// ============================================================================
// Sources CC-SRC-111–119
// ============================================================================

const newSources = [
  {
    source_id: "CC-SRC-111",
    title: "Nonmarket Strategy Performance: Evidence from U.S. Electric Utilities",
    authors: ["Jean-Philippe Bonardi", "Guy L. F. Holburn", "Richard G. Vanden Bergh"],
    year: 2006,
    url: "https://doi.org/10.5465/amj.2006.23478676",
    source_type: "peer_reviewed",
    reliability: "scholarly_primary_analysis",
    primary_or_secondary: "secondary",
    jurisdiction: "US-state-PUC",
    research_domain: "political_economic_power",
    publication_date: "2006",
    retrieval_date: TODAY,
    summary:
      "Peer-reviewed Academy of Management Journal analysis of U.S. electric utility rate-increase filings over 13 years. Finds nonmarket strategy performance depends on political-market attractiveness (interest-group/politician rivalry) and firm political capabilities — independent of the later Van Orden PUHCA working paper.",
    key_findings: [
      "Utility rate-case success associates with political environment and firm nonmarket capabilities",
      "Independent peer-reviewed evidence that political strategy matters for regulatory outcomes — not a replication of PUHCA DiD"
    ],
    limitations:
      "Observational political-markets design; does not isolate campaign-contribution legalization as a quasi-experiment; IOU-focused.",
    ideological_or_institutional_considerations: "Strategy / nonmarket strategy literature.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "UTILITIES confirmation — independent peer-reviewed association; NOT Van Orden confirmation."
  },
  {
    source_id: "CC-SRC-112",
    title:
      "The impact of consumer advocates on regulatory policy in the electric utility sector",
    authors: ["Adam R. Fremeth", "Guy L. F. Holburn", "Pablo T. Spiller"],
    year: 2014,
    url: "https://doi.org/10.1007/s11127-013-0145-z",
    source_type: "peer_reviewed",
    reliability: "scholarly_primary_analysis",
    primary_or_secondary: "secondary",
    jurisdiction: "US-state-PUC",
    research_domain: "political_economic_power",
    publication_date: "2014",
    retrieval_date: TODAY,
    summary:
      "Public Choice peer-reviewed panel of U.S. electric rate reviews 1980–2007. States with institutionalized consumer advocates authorize ROEs ~0.45 pp lower and show fewer rate reviews (utilities postponing). Demonstrates institutional counterweights can shift regulatory outcomes — competing explanation/partial contrary to one-sided industry capture narratives.",
    key_findings: [
      "Consumer advocates associated with ~0.45 pp lower authorized ROE",
      "Institutionalized consumer representation affects rate structures toward residential classes"
    ],
    limitations:
      "Does not prove absence of industry influence where advocates exist; observational with selection correction.",
    ideological_or_institutional_considerations: "Public Choice / regulation scholarship.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "UTILITIES — contrary/competitive: institutional structure (not only industry money) shapes ROE."
  },
  {
    source_id: "CC-SRC-113",
    title: "Corporate Political Strategy in Contested Regulatory Environments",
    authors: ["Adam Fremeth", "Guy L. F. Holburn", "Richard G. Vanden Bergh"],
    year: 2016,
    url: "https://doi.org/10.1287/stsc.2016.0021",
    source_type: "peer_reviewed",
    reliability: "scholarly_primary_analysis",
    primary_or_secondary: "secondary",
    jurisdiction: "US-state-PUC",
    research_domain: "political_economic_power",
    publication_date: "2016",
    retrieval_date: TODAY,
    summary:
      "Strategy Science peer-reviewed study: U.S. electric utilities increase campaign contributions to state politicians when stakeholder opposition in regulatory hearings rises, especially when regulators are less experienced or near reappointment. Supports association between contested rate environments and political spending — independent of Van Orden.",
    key_findings: [
      "Utilities escalate political contributions when regulatory hearings are contested",
      "Political strategy contingent on regulator experience and reappointment timing"
    ],
    limitations:
      "Contribution→outcome causal chain not identical to PUHCA legalization DiD; strategic response ≠ capture.",
    ideological_or_institutional_considerations: "Nonmarket strategy literature.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "UTILITIES confirmation of contribution activity under contestation (Level 1–3)."
  },
  {
    source_id: "CC-SRC-114",
    title: "Rate of return regulation revisited",
    authors: ["Karl Dunkle Werner", "Stephen Jarvis"],
    year: 2026,
    url: "https://doi.org/10.1016/j.jpubeco.2026.105654",
    source_type: "peer_reviewed",
    reliability: "scholarly_primary_analysis",
    primary_or_secondary: "secondary",
    jurisdiction: "US",
    research_domain: "political_economic_power",
    publication_date: "2026",
    retrieval_date: TODAY,
    summary:
      "Journal of Public Economics analysis of utility rate cases finds significant authorized-ROE premium vs capital-cost benchmarks, asymmetric adjustment (faster upward than downward), and capital-stock response. Estimates large consumer costs. Provides institutional/behavioral regulation explanation for elevated ROE without requiring a campaign-contribution mechanism.",
    key_findings: [
      "Regulated ROEs show premium vs capital-cost benchmarks",
      "Asymmetric rate-case timing and capital incentives can elevate costs without proving political capture"
    ],
    limitations:
      "Does not falsify contribution effects; offers competing institutional explanation for high ROE.",
    ideological_or_institutional_considerations: "Public economics / regulation.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "UTILITIES competing explanation — do not attribute ROE premium solely to political influence."
  },
  {
    source_id: "CC-SRC-115",
    title:
      "Investor-owned utilities served 72% of U.S. electricity customers in 2017",
    authors: ["U.S. Energy Information Administration"],
    year: 2019,
    url: "https://www.eia.gov/todayinenergy/detail.php?id=40913",
    source_type: "federal_statistical",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "energy_structure",
    publication_date: "2019-08-15",
    retrieval_date: TODAY,
    summary:
      "EIA Today in Energy descriptive ownership map: ~168 IOUs serve ~72% of customers; ~1,958 publicly owned utilities and ~812 cooperatives serve far smaller average customer bases. Ownership structure differs from rate-regulation structure (IOUs typically state-PUC regulated; munis/co-ops often locally governed).",
    key_findings: [
      "IOUs serve roughly three-quarters of U.S. electric customers despite fewer entities",
      "Ownership type is an institutional variable — not by itself evidence of capture"
    ],
    limitations:
      "2017 snapshot; does not compare political influence or rate outcomes by ownership type.",
    ideological_or_institutional_considerations: "Official EIA.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "UTILITIES ownership map for Institutional comparison — no doctrine inference."
  },
  {
    source_id: "CC-SRC-116",
    title: "Why do members of congress support agricultural protection?",
    authors: ["Marc F. Bellemare", "Nicholas Carnes"],
    year: 2015,
    url: "https://doi.org/10.1016/j.foodpol.2014.10.010",
    source_type: "peer_reviewed",
    reliability: "scholarly_primary_analysis",
    primary_or_secondary: "secondary",
    jurisdiction: "US-Congress",
    research_domain: "political_economic_power",
    publication_date: "2015",
    retrieval_date: TODAY,
    summary:
      "Food Policy peer-reviewed test of legislator preferences, electoral incentives, and lobbying on Farm Bureau scores / farm-bill votes (106th–110th Congress). Electoral incentives (farm constituency share) primarily explain support; lobbying and preferences matter less. Strong contrary to lobby-primary narratives.",
    key_findings: [
      "Electoral incentives dominate lobbying as predictor of agricultural protection support",
      "Legislator preferences and electoral pressure appear as substitutes"
    ],
    limitations:
      "1999–2009 window; Farm Bureau scores as outcome; does not measure processor vs farmer conflicts.",
    ideological_or_institutional_considerations: "Political economy of agriculture.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "AGRICULTURE contrary — lobbying not primary driver of farm-protection votes."
  },
  {
    source_id: "CC-SRC-117",
    title: "The US federal crop insurance program: a case study in rent seeking",
    authors: ["Vincent H. Smith", "Joseph W. Glauber"],
    year: 2020,
    url: "https://doi.org/10.1108/AFR-11-2018-0102",
    source_type: "peer_reviewed",
    reliability: "scholarly_primary_analysis",
    primary_or_secondary: "secondary",
    jurisdiction: "US",
    research_domain: "political_economic_power",
    publication_date: "2020",
    retrieval_date: TODAY,
    summary:
      "Agricultural Finance Review legislative-history analysis of 1980, 1994, and 2000 crop-insurance acts. Finds farm and insurance-industry coalitions designed packages with net benefits to both (and agricultural lenders) at rising taxpayer cost — rent-seeking coalition evidence, not proof that 'agriculture' is a single captured interest.",
    key_findings: [
      "Farm + crop-insurance lobbies form coalitions with joint net benefits across bills",
      "Taxpayer costs rose with successive subsidy expansions"
    ],
    limitations:
      "Process/legislative history rather than causal DiD; rent-seeking language ≠ Level-5 capture of USDA.",
    ideological_or_institutional_considerations: "Agricultural economics / Mercatus-adjacent authors historically.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "AGRICULTURE Level 3 association / influence-candidate for crop insurance coalitions."
  },
  {
    source_id: "CC-SRC-118",
    title: "Country of Origin Labeling Overview",
    authors: ["National Agricultural Law Center"],
    year: 2024,
    url: "https://nationalaglawcenter.org/overview/cool/",
    source_type: "legal_overview",
    reliability: "secondary_legal_summary",
    primary_or_secondary: "secondary",
    jurisdiction: "US",
    research_domain: "political_economic_power",
    publication_date: "2024",
    retrieval_date: TODAY,
    summary:
      "Legal overview of mandatory COOL: 2002 Farm Bill origins; WTO disputes with Canada/Mexico; 2015/2016 Consolidated Appropriations Act repeal of beef/pork COOL after authorized retaliation risk. Documents producer vs packer conflict and trade-counterfactual — preferred packer outcome coincided with WTO constraint, so influence inference must remain qualified.",
    key_findings: [
      "Beef/pork COOL repealed via appropriations after WTO adverse rulings",
      "Independent ranchers and packers held opposing preferences — agriculture is not unitary"
    ],
    limitations:
      "Overview not a causal identification paper; WTO trade retaliation is a major competing explanation.",
    ideological_or_institutional_considerations: "University-affiliated agricultural law center.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "AGRICULTURE policy case — packer preferred outcome with strong trade counterfactual."
  },
  {
    source_id: "CC-SRC-119",
    title:
      "The Evolving Distribution of Payments From Commodity, Conservation, and Federal Crop Insurance Programs",
    authors: ["USDA Economic Research Service"],
    year: 2018,
    url: "https://doi.org/10.22004/ag.econ.291932",
    source_type: "federal_statistical",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "farm_structure",
    publication_date: "2018",
    retrieval_date: TODAY,
    summary:
      "ERS report documenting long-run shift of commodity payments and crop-insurance indemnities toward larger farms as production consolidates; distinguishes structural change from program-design effects. Benefit concentration ≠ proof of political influence by itself (Level 1 descriptive for incidence).",
    key_findings: [
      "Commodity payment shares shifted toward larger farms with consolidation",
      "Program design and structural change both matter for incidence"
    ],
    limitations:
      "Does not identify lobbying causal effects; incidence is not influence.",
    ideological_or_institutional_considerations: "Official USDA ERS.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "AGRICULTURE family-farm distinction — aggregate 'ag support' ≠ small-family-farm benefit."
  }
];

for (const s of newSources) {
  const i = srcDoc.sources.findIndex((x) => x.source_id === s.source_id);
  if (i >= 0) srcDoc.sources[i] = s;
  else srcDoc.sources.push(s);
}

// Enrich existing EIB-283 with payment-concentration findings from same report
const ers73 = srcDoc.sources.find((s) => s.source_id === "CC-SRC-073");
if (ers73) {
  const extra = [
    "2023: midsize+large family farms ≈66% of production value and ≈71% of countercyclical-type payments",
    "Small family farms received ≈76% of CRP payments (different program incidence)"
  ];
  ers73.key_findings = Array.from(new Set([...(ers73.key_findings || []), ...extra]));
  ers73.notes =
    (ers73.notes || "") +
    " | Also used for agriculture influence dossier: payment incidence by farm size (not influence proof).";
  ers73.retrieval_date = TODAY;
}

srcDoc.last_updated = TODAY;
writeJson("data/research/source_registry.json", srcDoc);

// ============================================================================
// Evidence-level registry (CC-DEC-103 integrity rule)
// ============================================================================

const evidenceLevels = {
  version: "1.0.0",
  slice_id: SLICE,
  generated_at: TODAY,
  associated_decision: DECISION_ID,
  status: "ACTIVE_RESEARCH_INTEGRITY_RULE",
  rule:
    "Do not allow Level 1 evidence to support Level 4 or 5 language. Capture (Level 5) requires mechanism, duration, outcome, counterfactual, competing explanations, contrary cases, and replicability.",
  levels: [
    {
      level: 1,
      name: "ACTIVITY",
      definition: "Political spending, lobbying, or participation occurred."
    },
    {
      level: 2,
      name: "ACCESS",
      definition: "Evidence suggests differential access or participation."
    },
    {
      level: 3,
      name: "ASSOCIATION",
      definition: "Interest activity is associated with policy outcomes."
    },
    {
      level: 4,
      name: "INFLUENCE",
      definition:
        "Evidence supports a defensible causal or quasi-causal influence inference."
    },
    {
      level: 5,
      name: "CAPTURE",
      definition:
        "Evidence establishes sustained institutional distortion/control meeting a defined capture standard."
    }
  ],
  capture_burden: [
    "What institution is captured?",
    "By whom?",
    "Through what mechanism?",
    "Over what period?",
    "Toward what observable outcome?",
    "Compared with what counterfactual?",
    "What competing explanations were tested?",
    "What contrary cases exist?",
    "Can the result be replicated?"
  ]
};
writeJson(
  "research/phase_2/political_influence_evidence_level_registry.json",
  evidenceLevels
);
writeText(
  "reports/CC_POLITICAL_INFLUENCE_EVIDENCE_LEVEL_STANDARD_1_0.md",
  `# Political Influence Evidence Level Standard 1.0

Associated with **${DECISION_ID}** (research-integrity rule, not a new principle).

| Level | Name | Meaning |
|---|---|---|
| 1 | ACTIVITY | Spending / lobbying / participation occurred |
| 2 | ACCESS | Differential access or participation |
| 3 | ASSOCIATION | Activity associated with outcomes |
| 4 | INFLUENCE | Defensible causal / quasi-causal inference |
| 5 | CAPTURE | Sustained institutional distortion meeting capture burden |

**Rule:** Level 1 evidence may not underwrite Level 4–5 language.

Capture requires answers to: institution, actor, mechanism, period, outcome, counterfactual, competing explanations, contrary cases, replicability.
`
);

// ============================================================================
// TRACK A — Electric utilities confirmation dossier
// ============================================================================

const utilityDossier = {
  version: "1.0.0",
  slice_id: SLICE,
  generated_at: TODAY,
  sector_id: "SEC-ELECTRIC",
  working_paper_under_test: "CC-SRC-108",
  working_paper_proposition: {
    claim:
      "Legalizing electric-utility campaign contributions (via 2005 PUHCA repeal in 30 states) caused higher authorized ROEs relative to states that retained corporate-contribution bans.",
    methodology: "Difference-in-differences / quasi-experiment around PUHCA repeal",
    population: "U.S. investor-owned electric utilities / state PUCs",
    period: "Around 2005 PUHCA repeal; multi-year panel as reported in WP",
    outcome: "Authorized return on equity (ROE) in rate cases",
    epistemic_classification: "QUASI-CAUSAL EFFECT (working paper; not peer-reviewed settled)",
    independent_confirmation_rule:
      "Citations of the working paper do not count as independent confirmation."
  },
  independent_peer_reviewed: {
    supporting_association: ["CC-SRC-111", "CC-SRC-113", "CC-SRC-105"],
    institutional_counterweights_contrary_to_one_sided_capture: ["CC-SRC-112"],
    competing_institutional_explanations: ["CC-SRC-114"],
    ownership_structure_descriptive: ["CC-SRC-115"]
  },
  institutional_alternatives_considered: [
    "Industry influence via contributions / nonmarket strategy",
    "Information asymmetry / regulatory dependence on utility information",
    "Technical complexity and capital intensity",
    "Reliability and statutory mandates",
    "Rate-of-return regulation premiums and asymmetric rate-case timing (CC-SRC-114)",
    "Consumer advocate institutions (CC-SRC-112)",
    "Commission election vs appointment (literature noted; not newly identified this slice)",
    "Natural-monopoly economics"
  ],
  ownership_comparison: {
    sources: ["CC-SRC-115"],
    finding:
      "IOUs serve ~72% of customers; munis and co-ops are numerous but smaller on average; governance/rate-setting differ (state PUC vs local boards). No doctrine inference that public/coop ownership performs better.",
    influence_inference: "NOT ESTABLISHED by ownership map alone"
  },
  what_survived_scrutiny: [
    "Peer-reviewed literature independently shows utilities use political strategy and that contested hearings associate with contribution escalation (CC-SRC-111, CC-SRC-113).",
    "Consumer-advocate institutions associate with lower authorized ROE — institutional structure matters (CC-SRC-112).",
    "Elevated authorized ROE can arise from rate-of-return regulation design without proving contribution capture (CC-SRC-114)."
  ],
  what_did_not_survive_as_settled: [
    "Van Orden PUHCA DiD as peer-reviewed settled causal fact — remains working paper (CC-SRC-108).",
    "National utilities 'capture' wording — Level 5 burden not met.",
    "Attribution of all ROE premiums to campaign contributions alone."
  ],
  verdict: "PARTIALLY CONFIRMED",
  verdict_detail:
    "Independent peer-reviewed association between utility political strategy / contested regulation and regulatory politics is confirmed. The specific PUHCA-legalization quasi-causal estimate is NOT independently confirmed as peer-reviewed settled fact. Capture NOT MET.",
  strongest_defensible_proposition: {
    wording:
      "In U.S. investor-owned electric utility regulation, peer-reviewed evidence associates firm political strategy and institutional design (including consumer representation) with authorized returns and related rate-case outcomes; a working-paper quasi-experiment suggests contribution legalization raised authorized ROE, but that specific causal estimate remains provisional.",
    epistemic_type: "EMPIRICAL CLAIM (association) + HYPOTHESIS (PUHCA contribution legalization effect)",
    evidence_level_max_earned: 3,
    capture_language: "FORBIDDEN"
  },
  prior_sectoral_disposition_update: "PARTIALLY_CONFIRMED_ASSOCIATION_WP_STILL_PROVISIONAL"
};
writeJson(
  "research/phase_2/electric_utilities_influence_confirmation_dossier.json",
  utilityDossier
);
writeText(
  "reports/CC_ELECTRIC_UTILITIES_INFLUENCE_CONFIRMATION_1_0.md",
  `# Electric Utilities Influence Confirmation 1.0

## Working paper under test (CC-SRC-108)

- **Proposition:** PUHCA 2005 repeal legalizing utility contributions in 30 states raised authorized ROE vs control states.
- **Method:** DiD / quasi-experiment
- **Outcome:** Authorized ROE
- **Class:** QUASI-CAUSAL (working paper)

Citations of the WP are **not** independent confirmation.

## Independent evidence

| Source | Role |
|---|---|
| CC-SRC-111 Bonardi et al. 2006 | Peer-reviewed nonmarket strategy → rate outcomes |
| CC-SRC-113 Fremeth et al. 2016 | Contributions escalate under contested hearings |
| CC-SRC-112 Fremeth/Holburn/Spiller 2014 | Consumer advocates → lower ROE (institutional counterweight) |
| CC-SRC-114 Dunkle Werner & Jarvis 2026 | ROE premium from rate-of-return design (competing explanation) |
| CC-SRC-115 EIA | Ownership map (IOU/muni/coop) |

## Verdict

**PARTIALLY CONFIRMED**

Association of political strategy / institutional design with regulatory outcomes: **confirmed** in peer-reviewed literature.  
Specific PUHCA contribution-legalization causal estimate: **not** independently settled.  
**Capture: NOT MET.**

Strongest defensible type: **EMPIRICAL CLAIM (association)** + **HYPOTHESIS** for the PUHCA effect.
`
);

// ============================================================================
// TRACK B — Agriculture dossier + policy cases
// ============================================================================

const agDossier = {
  version: "1.0.0",
  slice_id: SLICE,
  generated_at: TODAY,
  sector_id: "SEC-AGRICULTURE",
  forbidden_phrase: "agriculture wants…",
  actor_disaggregation: [
    "Farmers / family farms",
    "Large agricultural operations",
    "Agricultural cooperatives",
    "Processors / meatpackers",
    "Seed / chemical companies",
    "Equipment manufacturers",
    "Commodity organizations",
    "Farm bureaus / associations",
    "Food manufacturers / retailers",
    "Agricultural lenders",
    "Crop insurance interests",
    "Consumers / environmental interests"
  ],
  institutional_map: {
    note: "Arrows = institutional interaction, not proven causation",
    layers: [
      "ECONOMIC ACTORS (disaggregated)",
      "Trade / producer organizations",
      "Legislative advocacy",
      "Congress / state legislatures",
      "USDA / state agencies",
      "Regulation / program administration",
      "Farmers / processors / consumers / communities"
    ]
  },
  mechanisms: {
    campaign_finance: {
      level_typical: 1,
      what_can_establish: "Activity and sometimes access; not outcomes alone"
    },
    lobbying: {
      level_typical: 1,
      note: "Hundreds of interests lobby Farm Bills; activity ≠ influence"
    },
    rulemaking_participation: { level_typical: 2, status: "case-dependent; not deeply measured this slice" },
    program_design_benefits: {
      level_typical: 1,
      note: "Benefit concentration (CC-SRC-073/119) is incidence, not influence"
    },
    market_structure_to_politics: {
      level_typical: "OPEN",
      note: "Concentration → political influence is a separate empirical question"
    },
    revolving_door: { level_typical: "OPEN", note: "Not primary identification this slice" }
  },
  family_farm_standard: {
    rule:
      "Do not infer family-farm benefit from aggregate agricultural spending. Ask who benefits: family farms, commodities, firm sizes, processors, landowners, or combinations.",
    evidence: ["CC-SRC-073", "CC-SRC-119"],
    finding:
      "Countercyclical payments track production shares (midsize/large family farms); CRP disproportionately goes to small family farms. 'Ag subsidies help family farms' is program-dependent."
  },
  arkansas_note:
    "No geography forced. Mississippi County remains available in designated set for future agri/industrial questions if data quality and contrast justify selection — not used as LCL.",
  synthesis: {
    one_interest_or_competing:
      "Competing interests — farmers, packers, insurers, lenders, commodity groups, and consumers often conflict (COOL; crop-insurance coalitions).",
    campaign_spending_predicts_outcomes:
      "Not established as primary driver for farm-protection votes (Bellemare & Carnes: electoral incentives dominate).",
    lobbying_establishes_influence:
      "Lobbying is ubiquitous (Level 1). Crop-insurance legislative history supports coalition rent-seeking association (Level 3 candidate). Not Level 5 capture.",
    capture_used: false,
    surprise:
      "The strongest contrary to lobby-primary stories is peer-reviewed: constituency farm share beats lobbying in explaining agricultural protection votes.",
    still_unknown: [
      "Causal effects of processor PAC spending on specific antitrust outcomes",
      "Arkansas-specific agency capture tests",
      "Right-to-repair and seed/patent influence modules",
      "Replication of crop-insurance coalition claims with modern identification"
    ]
  }
};
writeJson("research/phase_2/agriculture_political_influence_dossier.json", agDossier);

const agCases = {
  version: "1.0.0",
  slice_id: SLICE,
  generated_at: TODAY,
  selection_rule:
    "Choose cases by evidence quality; include at least one where concentrated interests did not clearly obtain preferred outcome, or where competing explanations dominate.",
  cases: [
    {
      case_id: "AG-CASE-CROP-INSURANCE",
      title: "Federal crop insurance subsidy expansions (1980–2000 acts)",
      sources: ["CC-SRC-117"],
      preferred_outcome_actors: ["farm interest groups", "crop insurance industry", "ag lenders (spillover)"],
      outcome: "Expanded subsidized crop insurance with joint net benefits to farm + insurance coalitions",
      evidence_level: 3,
      influence_language: "ASSOCIATION / rent-seeking coalition — not Level 5 capture",
      secondary_effects: [
        "Taxpayer cost increases",
        "Risk management for producers",
        "Possible over-production / land-use effects (not fully measured here)"
      ]
    },
    {
      case_id: "AG-CASE-FARM-BILL-VOTES",
      title: "Congressional support for agricultural protection (1999–2009)",
      sources: ["CC-SRC-116"],
      preferred_outcome_actors: ["farm constituencies; Farm Bureau-aligned scores"],
      outcome: "Electoral incentives primarily explain protection support; lobbying secondary",
      evidence_level: 3,
      influence_language: "CONTRARY to lobby-primary; electoral representation mechanism",
      secondary_effects: [
        "Rural electoral power can sustain transfers even as farm employment share falls",
        "Does not prove that all Farm Bill titles serve small family farms"
      ]
    },
    {
      case_id: "AG-CASE-COOL-REPEAL",
      title: "Mandatory COOL repeal for beef/pork (2015–2016)",
      sources: ["CC-SRC-118"],
      preferred_outcome_actors: ["large multi-country meatpackers / processors (opposed COOL)"],
      opposing_actors: ["independent ranchers / some producer groups (supported COOL)"],
      outcome: "Beef/pork COOL repealed after WTO adverse rulings and retaliation risk",
      evidence_level: 2,
      influence_language:
        "ACCESS/ACTIVITY + preferred packer outcome, but WTO trade counterfactual prevents clean Level 4 influence claim",
      negative_case_note:
        "Methodologically important: producer preferences did not prevail; also shows intra-agriculture conflict.",
      secondary_effects: [
        "Trade retaliation risk avoided",
        "Domestic origin differentiation tool removed for beef/pork",
        "Consumer information effects contested"
      ]
    },
    {
      case_id: "AG-CASE-PAYMENT-INCIDENCE",
      title: "Who receives farm program payments?",
      sources: ["CC-SRC-073", "CC-SRC-119"],
      outcome: "Payment shares vary by program; midsize/large farms dominate countercyclical; CRP skewed small",
      evidence_level: 1,
      influence_language: "INCIDENCE ONLY — not influence or capture",
      secondary_effects: [
        "Family Farm Prosperity architecture must not treat aggregate USDA spending as small-farm proof",
        "Program design choices redistribute across farm sizes"
      ]
    }
  ]
};
writeJson("research/phase_2/agriculture_policy_case_matrix.json", agCases);

writeText(
  "reports/CC_AGRICULTURE_POLITICAL_INFLUENCE_DOSSIER_1_0.md",
  `# Agriculture Political Influence Dossier 1.0

## Disaggregation

Do **not** say "agriculture wants…". Actors include farmers, family farms, large operations, co-ops, processors/meatpackers, input firms, commodity groups, Farm Bureau, lenders, crop insurers, retailers, consumers.

## Map (interaction ≠ causation)

Economic actors → organizations → legislative advocacy → Congress/state → USDA/agencies → programs → producers/processors/consumers/communities.

## Key findings

1. **Competing interests** — COOL pits ranchers against packers.
2. **Electoral > lobbying** for farm-protection votes (Bellemare & Carnes, CC-SRC-116).
3. **Crop insurance** shows farm–insurer coalitions with taxpayer costs (Smith & Glauber, CC-SRC-117) — Level 3 association candidate.
4. **Payment incidence** is size/program-dependent (CC-SRC-073/119) — not influence proof.
5. **Capture: NOT MET.**

## Arkansas

Not forced. Designated-set Mississippi County available later if methodologically justified.
`
);

writeText(
  "reports/CC_AGRICULTURE_POLICY_CASE_MATRIX_1_0.md",
  `# Agriculture Policy Case Matrix 1.0

| Case | Level | Takeaway |
|---|---|---|
| Crop insurance expansions | 3 | Farm + insurer coalitions; taxpayer costs |
| Farm Bill protection votes | 3 | Electoral incentives dominate lobbying |
| COOL beef/pork repeal | 2 | Packer-preferred outcome + WTO counterfactual; producers lost |
| Payment incidence | 1 | Who benefits ≠ who influenced |

Include negative/contested cases deliberately. Preferred industry outcome ≠ proven influence.
`
);

// Update sectoral electric + agriculture rows
const elec = sectoral.sectors.find((s) => s.sector_id === "SEC-ELECTRIC");
if (elec) {
  elec.best_supporting = ["CC-SRC-111", "CC-SRC-113", "CC-SRC-108"];
  elec.best_contrary = ["CC-SRC-112", "CC-SRC-114"];
  elec.evidence_type = "ASSOCIATIONAL (peer-reviewed) + PROVISIONAL QUASI-CAUSAL (WP)";
  elec.what_established =
    "Peer-reviewed association between utility political strategy / institutional design and rate-case outcomes; WP PUHCA effect still provisional.";
  elec.what_not_established =
    "Peer-reviewed confirmation of Van Orden DiD as settled; Level-5 capture; ROE premium solely from contributions.";
  elec.capture_bar = "NOT MET — PARTIALLY CONFIRMED association only.";
  elec.disposition = "PARTIALLY_CONFIRMED_ASSOCIATION_WP_PROVISIONAL";
  elec.confirmation_dossier =
    "research/phase_2/electric_utilities_influence_confirmation_dossier.json";
}
const agri = sectoral.sectors.find((s) => s.sector_id === "SEC-AGRICULTURE");
if (agri) {
  agri.best_supporting = ["CC-SRC-117"];
  agri.best_contrary = ["CC-SRC-116", "CC-SRC-118"];
  agri.evidence_type = "MIXED — association (crop insurance coalitions) + contrary (electoral > lobby; COOL trade CF)";
  agri.what_established =
    "Agriculture is not a unitary interest; electoral incentives dominate lobbying for protection votes; crop-insurance history shows coalitions; payment incidence is program/size specific.";
  agri.what_not_established = "Sector-wide capture; lobby-primary Farm Bill causation; family-farm benefit from aggregate spending.";
  agri.capture_bar = "NOT MET.";
  agri.disposition = "FIRST_DOSSIER_REGISTERED_NO_CAPTURE";
  agri.dossier = "research/phase_2/agriculture_political_influence_dossier.json";
  agri.arkansas_note =
    "Mississippi County available in designated set if future question requires — not used this slice.";
}
sectoral.synthesis = {
  cc_hyp_003_d_update:
    "Utilities association deepened with independent peer-reviewed sources; agriculture gap closed with first dossier showing competing interests. National capture claim still not earned.",
  promote_to_empirical_claim: false,
  reason_not_promoted:
    "Graduated model: activity/association in places; Level-5 capture nowhere in this slice.",
  recommended_public_language:
    "We can show political activity, some associations, and institutional counterweights — not that corporations control regulators or that agriculture is a single captured lobby.",
  evidence_level_standard:
    "research/phase_2/political_influence_evidence_level_registry.json"
};
sectoral.slice_id_confirmation = SLICE;
sectoral.last_updated = TODAY;
writeJson("research/phase_2/sectoral_political_influence_capture_dossiers.json", sectoral);

// ============================================================================
// Hypotheses / candidate claims (propose; careful approvals only)
// ============================================================================

const hyp = hypDoc.hypotheses.find((h) => h.hypothesis_id === "CC-HYP-003-D");
if (hyp) {
  hyp.empirical_status =
    "Utilities: peer-reviewed association PARTIALLY CONFIRMED; PUHCA WP still provisional. Agriculture: first dossier — competing interests; electoral>lobby for protection votes; crop-insurance coalitions Level-3 candidate. Capture NOT MET nationally or sectorally.";
  hyp.sources_support = Array.from(
    new Set([
      ...(hyp.sources_support || []),
      "CC-SRC-111",
      "CC-SRC-113",
      "CC-SRC-117"
    ])
  );
  hyp.sources_contrary = Array.from(
    new Set([
      ...(hyp.sources_contrary || []),
      "CC-SRC-112",
      "CC-SRC-114",
      "CC-SRC-116",
      "CC-SRC-118"
    ])
  );
  hyp.last_updated = TODAY;
  hyp.slice_id = SLICE;
  hyp.governance = {
    decision: "KEEP_AS_HYPOTHESIS",
    adjudicator: ADJUDICATOR,
    reason:
      "Additional sectoral association evidence deepens the hypothesis without clearing Level-5 capture burden or proving system-wide parent claim."
  };
}

if (!hypDoc.hypotheses.find((h) => h.hypothesis_id === "CC-HYP-UTILITY-PUHCA-ROE")) {
  hypDoc.hypotheses.push({
    hypothesis_id: "CC-HYP-UTILITY-PUHCA-ROE",
    text: "Legalizing electric-utility campaign contributions after the 2005 PUHCA repeal raised authorized ROEs in treated states relative to states retaining corporate contribution bans.",
    epistemic_class: "HYPOTHESIS",
    parent_claim_id: "CC-CLAIM-003",
    related_sector: "SEC-ELECTRIC",
    sources_support: ["CC-SRC-108"],
    sources_contrary: ["CC-SRC-114"],
    empirical_status:
      "Supported by working paper quasi-experiment only; not independently peer-review confirmed this slice.",
    not_empirical_proof: true,
    governance: {
      decision: "KEEP_AS_HYPOTHESIS",
      adjudicator: ADJUDICATOR,
      reason: "Do not promote WP causal estimate to empirical claim without independent confirmation."
    },
    last_updated: TODAY,
    slice_id: SLICE
  });
}
hypDoc.version = "0.3.0";
hypDoc.slice_id = SLICE;
writeJson("research/phase_2/hypothesis_registry_political_power.json", hypDoc);

const claim136 = {
  claim_id: "CC-CLAIM-136",
  claim_text:
    "In U.S. investor-owned electric utility regulation, peer-reviewed research associates firm political strategy and regulatory-institution design (including consumer-advocate presence) with rate-case outcomes such as authorized returns; such associations are not equivalent to proof that utilities capture or control public utility commissions.",
  chapter_ids: [],
  claim_type: "political_sectoral_association",
  claim_class: "descriptive_empirical",
  epistemic_class: "EMPIRICAL_CLAIM",
  importance: "high",
  support_level: "supported_with_qualification",
  evidence_strength: "moderate",
  consensus_status: "emerging_peer_reviewed",
  source_ids: ["CC-SRC-111", "CC-SRC-112", "CC-SRC-113", "CC-SRC-114", "CC-SRC-108"],
  opposing_evidence: [
    "Rate-of-return regulation can generate ROE premiums via institutional design without contribution mechanisms (CC-SRC-114).",
    "Consumer advocates associate with lower ROE — outcomes are contested, not unilaterally industry-determined (CC-SRC-112)."
  ],
  uncertainty:
    "PUHCA contribution-legalization causal estimate remains working-paper provisional (CC-HYP-UTILITY-PUHCA-ROE).",
  fact_check_status: "audited",
  publication_readiness: "not_ready",
  geographic_scope: "US-state-PUC",
  temporal_scope: "1980s–2010s panels vary by study",
  parent_claim_id: "CC-CLAIM-003",
  related_hypothesis_id: "CC-HYP-003-D",
  evidence_level: 3,
  governance: {
    decision: "APPROVE",
    adjudicator: ADJUDICATOR,
    decision_id: DECISION_ID,
    slice_id: SLICE,
    at: TODAY,
    note: "Association-only; capture verbs forbidden."
  },
  phase21_audit: {
    slice_id: SLICE,
    audited_at: TODAY,
    disposition: "SUPPORTED WITH QUALIFICATION",
    source_to_claim_fit: "PARTIAL",
    confidence: "Moderate",
    evidence_type: "ASSOCIATIONAL",
    reasoning:
      "Independent peer-reviewed utility literature confirms association; WP causal estimate kept as hypothesis."
  }
};

const claim137 = {
  claim_id: "CC-CLAIM-137",
  claim_text:
    "U.S. agricultural policy processes involve competing economic interests rather than a single 'agriculture' lobby; peer-reviewed evidence finds electoral incentives more important than lobbying in explaining congressional support for agricultural protection, while crop-insurance legislative history documents farm–insurer coalitions that jointly benefited from subsidy expansions at taxpayer cost.",
  chapter_ids: [],
  claim_type: "political_agriculture_structure",
  claim_class: "descriptive_empirical",
  epistemic_class: "EMPIRICAL_CLAIM",
  importance: "high",
  support_level: "supported_with_qualification",
  evidence_strength: "moderate",
  consensus_status: "contested_across_literatures",
  source_ids: ["CC-SRC-116", "CC-SRC-117", "CC-SRC-118", "CC-SRC-073", "CC-SRC-119"],
  opposing_evidence: [
    "Crop-insurance coalition history shows organized lobbies can obtain joint benefits (CC-SRC-117) — lobbying is not irrelevant, only not primary for farm-protection vote models in Bellemare & Carnes.",
    "COOL repeal aligned with packer preferences but WTO retaliation is a major competing explanation (CC-SRC-118)."
  ],
  uncertainty:
    "Does not establish Level-4/5 influence for all Farm Bill titles; Arkansas-specific modules pending.",
  fact_check_status: "audited",
  publication_readiness: "not_ready",
  geographic_scope: "US",
  temporal_scope: "varies_by_case",
  parent_claim_id: "CC-CLAIM-003",
  related_hypothesis_id: "CC-HYP-003-D",
  evidence_level: 3,
  governance: {
    decision: "APPROVE",
    adjudicator: ADJUDICATOR,
    decision_id: DECISION_ID,
    slice_id: SLICE,
    at: TODAY,
    note: "Competing-interests + electoral-primary + coalition association; no capture wording."
  },
  phase21_audit: {
    slice_id: SLICE,
    audited_at: TODAY,
    disposition: "SUPPORTED WITH QUALIFICATION",
    source_to_claim_fit: "PARTIAL",
    confidence: "Moderate",
    evidence_type: "ASSOCIATIONAL / STRUCTURAL",
    reasoning: "Disaggregates agriculture; cites contrary and supporting cases."
  }
};

for (const c of [claim136, claim137]) {
  const existing = claimDoc.claims.find((x) => x.claim_id === c.claim_id);
  if (existing) Object.assign(existing, c);
  else claimDoc.claims.push(c);
}

const c003 = claim("CC-CLAIM-003");
if (c003) {
  c003.utilities_confirmation =
    "research/phase_2/electric_utilities_influence_confirmation_dossier.json";
  c003.agriculture_dossier =
    "research/phase_2/agriculture_political_influence_dossier.json";
  c003.phase21_audit = {
    ...(c003.phase21_audit || {}),
    slice_id: SLICE,
    audited_at: TODAY,
    disposition: "NOT ENOUGH EVIDENCE",
    reasoning:
      "Sectoral association evidence (utilities PARTIALLY CONFIRMED; agriculture first dossier) does not revive the broad historical parent. Remain NEE."
  };
  c003.successor_claims = Array.from(
    new Set([...(c003.successor_claims || []), "CC-CLAIM-133", "CC-CLAIM-134", "CC-CLAIM-135", "CC-CLAIM-136", "CC-CLAIM-137"])
  );
}

const c135 = claim("CC-CLAIM-135");
if (c135) {
  c135.source_ids = Array.from(
    new Set([...(c135.source_ids || []), "CC-SRC-111", "CC-SRC-112", "CC-SRC-113", "CC-SRC-116", "CC-SRC-117"])
  );
}

claimDoc.last_updated = TODAY;
writeJson("data/research/claim_ledger.json", claimDoc);

const candidates = {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  adjudication: "ChatGPT under CC-DEC-103 for routine empirical governance; Steve only for philosophy",
  candidates: [
    {
      id: "CC-CAND-UTIL-ASSOC",
      status: "PROMOTED_TO_CC-CLAIM-136",
      proposed_wording: claim136.claim_text,
      epistemic_type: "EMPIRICAL_CLAIM",
      evidence_level: 3,
      best_support: ["CC-SRC-111", "CC-SRC-113"],
      best_contrary: ["CC-SRC-112", "CC-SRC-114"],
      source_to_claim_fit: "PARTIAL",
      confidence: "Moderate",
      boundary_conditions: "IOU / state PUC contexts; not munis/co-ops; not Level 5",
      public_reasoning_question: "Do corporations control utility regulators?"
    },
    {
      id: "CC-CAND-AG-STRUCTURE",
      status: "PROMOTED_TO_CC-CLAIM-137",
      proposed_wording: claim137.claim_text,
      epistemic_type: "EMPIRICAL_CLAIM",
      evidence_level: 3,
      best_support: ["CC-SRC-116", "CC-SRC-117"],
      best_contrary: ["CC-SRC-118"],
      source_to_claim_fit: "PARTIAL",
      confidence: "Moderate",
      boundary_conditions: "Not a capture claim; not Arkansas-specific",
      public_reasoning_question: "Do large agricultural companies have more political influence than farmers?"
    },
    {
      id: "CC-CAND-PUHCA-CAUSAL",
      status: "REMAINS_HYPOTHESIS_CC-HYP-UTILITY-PUHCA-ROE",
      proposed_wording:
        "PUHCA contribution legalization caused ~0.4 pp higher authorized ROE in treated states.",
      epistemic_type: "HYPOTHESIS",
      evidence_level: "provisional WP only",
      best_support: ["CC-SRC-108"],
      best_contrary: ["CC-SRC-114"],
      source_to_claim_fit: "INSUFFICIENT for empirical claim",
      confidence: "Low",
      boundary_conditions: "Needs independent peer-reviewed replication",
      public_reasoning_question: "If an industry gets the policy it wanted, does that prove political influence?"
    }
  ]
};
writeJson("research/phase_2/utilities_agriculture_candidate_claims.json", candidates);

// Research questions
const rqs = [
  {
    id: "CC-RQ-P21-034",
    question:
      "Can the Van Orden PUHCA contribution-legalization ROE effect be independently replicated in peer-reviewed work?",
    status: "open",
    domain: "political_economic_power",
    related_hypothesis: "CC-HYP-UTILITY-PUHCA-ROE",
    slice_id: SLICE
  },
  {
    id: "CC-RQ-P21-035",
    question:
      "Do authorized ROE and rate outcomes differ systematically by ownership type (IOU vs municipal vs cooperative) after controlling for cost and service conditions?",
    status: "open",
    domain: "political_economic_power",
    related_sources: ["CC-SRC-115"],
    slice_id: SLICE
  },
  {
    id: "CC-RQ-P21-036",
    question:
      "Under what conditions do processor/packer preferences prevail over independent producer preferences in livestock market regulation?",
    status: "open",
    domain: "political_economic_power",
    related_sources: ["CC-SRC-118"],
    slice_id: SLICE
  }
];
for (const q of rqs) {
  if (!rqDoc.questions.find((x) => x.id === q.id)) rqDoc.questions.push(q);
}
rqDoc.last_updated = TODAY;
writeJson("data/research/research_questions.json", rqDoc);

// Domain matrix touch
const pol = domainMatrix.domains?.find?.(
  (d) =>
    (d.domain_id && String(d.domain_id).includes("political")) ||
    (d.name && /political/i.test(d.name))
);
if (domainMatrix.domains) {
  for (const d of domainMatrix.domains) {
    if (/political|power/i.test(JSON.stringify(d).slice(0, 200))) {
      d.utilities_confirmation = "PARTIALLY_CONFIRMED";
      d.agriculture_dossier = "REGISTERED";
      d.sources = Array.from(
        new Set([...(d.sources || []), "CC-SRC-111", "CC-SRC-116", "CC-SRC-117"])
      );
      d.last_updated = TODAY;
    }
  }
}
domainMatrix.last_updated = TODAY;
writeJson("research/phase_2/priority_domain_research_matrix.json", domainMatrix);

// ============================================================================
// Public reasoning CC-PR-011 / 012
// ============================================================================

const prRecords = [
  {
    record_id: "CC-PR-011",
    claim_id: "CC-CLAIM-136",
    change_type: "NEW_ASSOCIATION_CLAIM",
    decision: "APPROVE",
    decision_id: DECISION_ID,
    adjudicator: ADJUDICATOR,
    decided_at: TODAY,
    skeptical_reader_question: "Do corporations control utility regulators?",
    public_answer:
      "Not on the evidence we trust. Peer-reviewed studies show utilities engage politically and that political strategy and institutional design associate with rate-case outcomes. Consumer advocates can pull authorized returns the other way. A working paper suggests contribution legalization raised returns, but that specific causal finding is not yet independently settled. Association is not control.",
    what_we_originally_said:
      "A working paper alone was treated as provisional sectoral evidence of contribution effects on ROE.",
    what_made_us_question_it:
      "We needed independent peer-reviewed confirmation and competing institutional explanations.",
    what_we_learned:
      "Utility politics is real and measurable at the association level; capture and control language still fail the burden.",
    where_our_reasoning_was_weak:
      "Risk of promoting a working-paper quasi-experiment as settled causal fact.",
    what_we_now_say: claim136.claim_text,
    why_we_made_that_decision:
      "Separate confirmed associations from provisional causal estimates; forbid capture wording.",
    what_we_still_dont_know:
      "Independent replication of the PUHCA DiD; ownership-type outcome comparisons.",
    what_else_this_could_affect: [
      "Energy and regulated-industry chapters",
      "Anti-capture design agendas",
      "CC-HYP-003-D sectoral deepening"
    ],
    potential_secondary_effects_or_unintended_consequences: [
      "Readers may hear 'association' as 'corruption' — clarify graduated evidence levels",
      "Understating contribution effects if WP later replicates"
    ],
    what_evidence_could_change_our_mind_again:
      "Peer-reviewed replications of contribution-legalization effects; mechanism tests meeting Level 4–5 burden."
  },
  {
    record_id: "CC-PR-012",
    claim_id: "CC-CLAIM-137",
    change_type: "NEW_ASSOCIATION_CLAIM",
    decision: "APPROVE",
    decision_id: DECISION_ID,
    adjudicator: ADJUDICATOR,
    decided_at: TODAY,
    skeptical_reader_question:
      "Do agricultural subsidies primarily help family farms? Do large agricultural companies have more political influence than farmers?",
    public_answer:
      "It depends which program and which actors. Midsize and large family farms receive most countercyclical payments roughly in line with production; conservation-reserve payments skew toward small farms. Agriculture is not one lobby — ranchers and packers fought over country-of-origin labeling. For congressional farm-protection votes, peer-reviewed work finds electoral incentives matter more than lobbying. Crop insurance history does show farm–insurer coalitions winning joint benefits. None of that equals proof that corporations captured USDA.",
    what_we_originally_said: "Agriculture was an evidence gap in sectoral dossiers.",
    what_made_us_question_it: "Family Farm Prosperity architecture needs high evidentiary standards.",
    what_we_learned:
      "Competing interests + electoral representation + selective coalition successes — not a unitary capture story.",
    where_our_reasoning_was_weak: "Temptation to treat 'ag policy' as corporate capture of family farms.",
    what_we_now_say: claim137.claim_text,
    why_we_made_that_decision: "Disaggregate actors; graduate evidence levels; keep capture bar.",
    what_we_still_dont_know:
      "Causal processor influence on antitrust; Arkansas-specific modules; seed/patent/right-to-repair cases.",
    what_else_this_could_affect: [
      "Family Farm Prosperity architecture qualifications",
      "Farm Bill public narratives",
      "Local food and ownership design"
    ],
    potential_secondary_effects_or_unintended_consequences: [
      "Removing crop-insurance subsidies could raise risk for producers and rural lenders",
      "COOL restoration could create trade costs"
    ],
    what_evidence_could_change_our_mind_again:
      "Causal studies linking specific firm political activity to agency outcomes after competing explanations; Arkansas designated-set tests if methodologically required."
  }
];

for (const rec of prRecords) {
  const i = prRegistry.records.findIndex((x) => x.record_id === rec.record_id);
  if (i >= 0) prRegistry.records[i] = rec;
  else prRegistry.records.push(rec);
  writeText(
    `reports/public_reasoning/${rec.record_id}_${rec.claim_id}.md`,
    `# ${rec.record_id} — ${rec.skeptical_reader_question}

## Public answer

${rec.public_answer}

## What we now say

${rec.what_we_now_say}

## Still unknown

${rec.what_we_still_dont_know}
`
  );
}
prRegistry.version = "0.2.0";
prRegistry.slice_id = SLICE;
prRegistry.generated_at = TODAY;
writeJson("research/phase_2/public_reasoning_registry.json", prRegistry);

writeText(
  "reports/CC_WHAT_WE_LEARNED_UTILITIES_AND_AGRICULTURE_INFLUENCE_1_0.md",
  `# What We Learned — Utilities & Agriculture Influence

## Citizen questions

1. **Do corporations control utility regulators?** Not established. Associations and institutional counterweights exist; control/capture does not.
2. **Does lobbying mean somebody bought a politician?** No. Lobbying is Level 1 activity unless stronger designs earn more.
3. **Do agricultural subsidies primarily help family farms?** Program-dependent; not automatic from aggregate spending.
4. **Do large agricultural companies have more political influence than farmers?** Sometimes preferences align with packers (COOL repeal), but electoral farm constituencies strongly shape protection votes; interests conflict.
5. **If an industry gets the policy it wanted, does that prove influence?** No — trade rules, electoral incentives, and coalitions can explain outcomes.
6. **How would we know an agency was captured?** Meet Level 5 burden: mechanism, duration, outcome, counterfactual, competing explanations, contrary cases, replication.

## Integrity answers

- WP utility finding: **partially** survived (association literature yes; specific DiD not independently settled).
- Contrary evidence weakened one-sided capture stories (consumer advocates; ROE institutional premium; electoral>lobby).
- Agriculture: **competing interests**, not one interest.
- Capture wording: **not used**.
`
);

// Integrity report JSON
writeJson("research/phase_2/utilities_agriculture_research_integrity.json", {
  version: "1.0.0",
  slice_id: SLICE,
  generated_at: TODAY,
  answers: {
    working_paper_survived_independent_scrutiny: "PARTIALLY — association literature yes; DiD unsettled",
    contrary_evidence_weakened_it: true,
    agriculture_one_interest_or_competing: "COMPETING",
    campaign_spending_predicted_outcomes: "Not primary for farm-protection votes (CC-SRC-116)",
    lobbying_established_influence: "Level 1 ubiquitous; Level 3 candidate for crop-insurance coalitions only",
    capture_language_earned: false,
    challenged_cc_assumptions: [
      "Aggregate ag spending ≠ family-farm benefit",
      "Lobby-primary Farm Bill stories overstated",
      "Utility ROE premium ≠ automatic contribution capture"
    ],
    surprises: [
      "Electoral incentives dominate lobbying in peer-reviewed farm-protection vote models",
      "Consumer advocates measurably lower authorized ROE"
    ],
    still_unknown: agDossier.synthesis.still_unknown
  }
});

// First-20 matrix — no manufactured movement
const weak_fit = beforeWeak;
const direct_strong = beforeStrong;
priorMatrix.note_slice = SLICE;
priorMatrix.note =
  "Utilities/agriculture slice adds CC-CLAIM-136/137 outside first-20 core; first-20 below STRONG unchanged unless connected claims change — they do not.";
priorMatrix.last_updated = TODAY;
writeJson("research/phase_2/first_20_claim_evidence_matrix.json", priorMatrix);

// GATE-02
const gate02Determination = "PARTIAL / REMAINS OPEN";
const gate = checklist.gates?.find?.((g) => g.id === "CC-P2-GATE-02") ||
  checklist.items?.find?.((g) => g.id === "CC-P2-GATE-02");
if (checklist.gates) {
  for (const g of checklist.gates) {
    if (g.id === "CC-P2-GATE-02") {
      g.status = gate02Determination;
      g.notes =
        (g.notes || "") +
        ` | ${SLICE}: utilities PARTIALLY CONFIRMED; agriculture dossier registered; parent 003 NEE; first-20 still ${weak_fit}/20 below STRONG.`;
    }
  }
}
checklist.last_updated = TODAY;
writeJson("data/project/phase2_acceptance_checklist.json", checklist);

// Knowledge graph
function nextNode() {
  const nums = kgDoc.nodes
    .map((n) => parseInt(String(n.node_id).replace(/\D/g, ""), 10))
    .filter((n) => !Number.isNaN(n));
  return (Math.max(0, ...nums) || 0) + 1;
}
let nId = nextNode();
kgDoc.nodes.push({
  node_id: `CC-KG-${String(nId++).padStart(3, "0")}`,
  label: "Utilities Influence Confirmation",
  kind: "system",
  related_slice: SLICE
});
kgDoc.nodes.push({
  node_id: `CC-KG-${String(nId++).padStart(3, "0")}`,
  label: "Agriculture Political Influence Dossier",
  kind: "system",
  related_slice: SLICE
});
kgDoc.nodes.push({
  node_id: `CC-KG-${String(nId++).padStart(3, "0")}`,
  label: "Political Influence Evidence Levels",
  kind: "standard",
  related_artifact: "research/phase_2/political_influence_evidence_level_registry.json"
});
kgDoc.last_updated = TODAY;
writeJson("data/research/knowledge_graph.json", kgDoc);

buildState.version = "0.4.3";
buildState.last_updated = TODAY;
buildState.mission_id = SLICE;
buildState.slice_return =
  "reports/CC_PHASE_2_1_UTILITIES_PEER_REVIEW_CONFIRMATION_AND_AGRICULTURE_INFLUENCE_DOSSIER_1_0_RETURN.md";
buildState.writing_focus =
  "Utilities association PARTIALLY CONFIRMED; agriculture competing-interests dossier registered; capture not promoted; evidence-level standard active.";
buildState.next_action =
  "Confirm/replicate PUHCA DiD if peer-reviewed outlet appears; deepen meatpacking/antitrust or Arkansas agri designated-set only if question requires; continue first-20 below-STRONG repair.";
buildState.gate_02 = gate02Determination;
buildState.weak_fit_claims = weak_fit;
buildState.direct_strong_fit = direct_strong;
buildState.sources_registered = srcDoc.sources.length;
buildState.baseline = "2/86";
writeJson("data/project/current_build_state.json", buildState);

writeJson("data/project/latest_cursor_return.json", {
  version: "0.1.0",
  generated_at: TODAY,
  slice_id: SLICE,
  summary: `Utilities PARTIALLY CONFIRMED (peer-reviewed association; WP DiD provisional). Agriculture first dossier: competing interests; electoral>lobby; crop-insurance coalitions. Capture NOT MET. Sources ${srcDoc.sources.length}. First-20 below STRONG ${weak_fit}. GATE-02 open.`,
  return_report:
    "reports/CC_PHASE_2_1_UTILITIES_PEER_REVIEW_CONFIRMATION_AND_AGRICULTURE_INFLUENCE_DOSSIER_1_0_RETURN.md"
});

const sliceEntry = {
  slice_id: SLICE,
  title: "Utilities Peer-Review Confirmation and Agriculture Influence Dossier",
  status: "completed",
  completed_at: TODAY,
  completion_evidence: [
    "electric_utilities_influence_confirmation_dossier.json",
    "agriculture_political_influence_dossier.json",
    "agriculture_policy_case_matrix.json",
    "political_influence_evidence_level_registry.json",
    "CC-SRC-111–119",
    "CC-CLAIM-136/137",
    "CC-PR-011/012"
  ],
  next_recommended_slice:
    "CC-PHASE-2.1-FIRST-20-BELOW-STRONG-REPAIR-OR-MEATPACKING-ANTITRUST-INFLUENCE-MODULE-1.0",
  note: "No forced geography. Capture bar held. Commit often."
};
const ex = sliceQueue.slices.find((s) => s.slice_id === SLICE);
if (ex) Object.assign(ex, sliceEntry);
else sliceQueue.slices.push(sliceEntry);
sliceQueue.active_slice = sliceEntry.next_recommended_slice;
sliceQueue.last_updated = TODAY;
writeJson("data/project/slice_queue.json", sliceQueue);

writeText(
  "reports/CC_PHASE_2_1_UTILITIES_PEER_REVIEW_CONFIRMATION_AND_AGRICULTURE_INFLUENCE_DOSSIER_1_0_RETURN.md",
  `# ${SLICE} — Return

## 1. Executive Summary

Independent utility literature **partially confirms** political-strategy associations with rate outcomes while leaving the Van Orden PUHCA DiD **provisional**. Agriculture’s critical gap is closed with a **competing-interests** dossier — not a capture verdict.

**Sources: ${srcDoc.sources.length}** · **First-20 below STRONG: ${beforeWeak} → ${weak_fit}** · **GATE-02: ${gate02Determination}** · **Baseline: 2/86** · **Capture: NOT MET**

## 2. Utility Working-Paper Test

CC-SRC-108 proposes a quasi-causal PUHCA contribution-legalization → higher authorized ROE effect. Method: DiD. Population: IOUs / state PUCs. Outcome: authorized ROE. Class: **QUASI-CAUSAL (WP)**. Citations of the WP ≠ independent confirmation.

## 3. Independent Utility Evidence

| Source | Role |
|---|---|
| CC-SRC-111 | Peer-reviewed nonmarket strategy / rate outcomes |
| CC-SRC-113 | Contributions escalate under contested hearings |
| CC-SRC-112 | Consumer advocates → lower ROE (counterweight) |
| CC-SRC-114 | ROE premium from rate-of-return design (competing explanation) |
| CC-SRC-115 | IOU/muni/coop ownership map |

## 4. Utility Verdict

**PARTIALLY CONFIRMED**

Strongest defensible: **EMPIRICAL CLAIM (association)** + **HYPOTHESIS** \`CC-HYP-UTILITY-PUHCA-ROE\` for the specific DiD.

## 5. Agriculture Actor Map

Disaggregated actors; forbidden phrase "agriculture wants…". Institutional map recorded as interaction, not causation.

## 6. Agriculture Policy Cases

Crop insurance (L3 coalitions) · Farm-protection votes (L3 electoral>lobby) · COOL repeal (L2 + WTO CF) · Payment incidence (L1).

## 7. Political Influence Evidence Levels

Shipped Levels 1–5 registry under ${DECISION_ID}. Level 1 may not underwrite Level 4–5 language.

## 8. Strongest Supporting Evidence

- Utilities: CC-SRC-111, CC-SRC-113
- Agriculture: CC-SRC-117 (coalitions); CC-SRC-116 (electoral mechanism)

## 9. Strongest Contrary Evidence

- Utilities: CC-SRC-112, CC-SRC-114
- Agriculture: CC-SRC-116 (lobby-primary false); CC-SRC-118 (trade CF / producer loss)

## 10. Capture Determination

**NOT MET** (utilities and agriculture).

## 11. Candidate Claims/Hypotheses

- **CC-CLAIM-136** APPROVED (association)
- **CC-CLAIM-137** APPROVED (competing interests / electoral / coalitions)
- **CC-HYP-UTILITY-PUHCA-ROE** KEEP
- **CC-HYP-003-D** KEEP

## 12. CC-CLAIM-003 Implications

**Remain NEE.** Sector evidence ≠ system-wide parent revival.

## 13. CC-HYP-003-D Implications

Deepened; still hypothesis; not promoted.

## 14. Public Reasoning Records

CC-PR-011, CC-PR-012 + citizen lesson report.

## 15. Secondary/Unintended Consequences

Crop-insurance cuts → producer/lender risk; COOL restoration → trade costs; misreading association as corruption.

## 16. Sources Added

CC-SRC-111–119 (plus EIB-283 payment-incidence enrichment on CC-SRC-073).

## 17. First-20 Fit

**${beforeWeak} → ${weak_fit}** (no manufactured movement).

## 18. GATE-02

# ${gate02Determination}

## 19. Baseline

**2/86** (unchanged).

## 20. Validators

| Command | Result |
|---|---|
| \`pnpm phase2:validate\` | PENDING |
| \`pnpm research:validate\` | PENDING |
| \`pnpm proofpacket:validate\` | PENDING |
| \`pnpm corpus:validate\` | PENDING |
| \`pnpm graph:validate\` | PENDING |
| \`pnpm baseline:validate\` | PENDING |
| \`pnpm institution:validate\` | PENDING |

## 21. Files Changed

See git status after commit.

## 22. Commit Hash

PENDING_COMMIT

## 23. Remaining Gaps

PUHCA DiD replication; ownership-type outcome tests; meatpacking antitrust module; Arkansas agri only if methodologically required.

## 24. Exact Next Recommended Slice

\`CC-PHASE-2.1-FIRST-20-BELOW-STRONG-REPAIR-OR-MEATPACKING-ANTITRUST-INFLUENCE-MODULE-1.0\`
`
);

console.log("=== COMPLETE ===");
console.log("sources", srcDoc.sources.length);
console.log("utility verdict", utilityDossier.verdict);
console.log("capture", false);
console.log("below STRONG", beforeWeak, "->", weak_fit);
console.log("geography forced: false");
