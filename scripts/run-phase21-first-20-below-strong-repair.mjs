/**
 * CC-PHASE-2.1-FIRST-20-BELOW-STRONG-REPAIR-1.0
 * Plus: CC Arkansas agriculture research posture lock.
 *
 * Evidence upgrades only. No silent claim-text mutations.
 * Do not reopen AR processing/feed as a first-20 fix.
 * Ag lanes remain human-voice-gated (~3/0/0 processing; feed quotes/toll IP).
 */
import fs from "node:fs";
import path from "node:path";
import { r } from "./lib/paths.mjs";

const TODAY = "2026-08-10";
const SLICE = "CC-PHASE-2.1-FIRST-20-BELOW-STRONG-REPAIR-1.0";
const DECISION_ID = "CC-DEC-103";
const ADJUDICATOR = "ChatGPT";
const PROCESSING_BASELINE = {
  cattle_accessible_claimed_desk: 3,
  booking_confirmed: 0,
  economically_usable_confirmed: 0,
};

function wj(rel, obj) {
  const p = r(rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + "\n");
  console.log("[OK]", rel);
}
function wt(rel, text) {
  const p = r(rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, text.endsWith("\n") ? text : text + "\n");
  console.log("[OK]", rel);
}

const srcDoc = JSON.parse(fs.readFileSync(r("data/research/source_registry.json"), "utf8"));
const claimDoc = JSON.parse(fs.readFileSync(r("data/research/claim_ledger.json"), "utf8"));
const matrix = JSON.parse(
  fs.readFileSync(r("research/phase_2/first_20_claim_evidence_matrix.json"), "utf8")
);
const prRegistry = JSON.parse(
  fs.readFileSync(r("research/phase_2/public_reasoning_registry.json"), "utf8")
);
const checklist = JSON.parse(
  fs.readFileSync(r("data/project/phase2_acceptance_checklist.json"), "utf8")
);
const buildState = JSON.parse(fs.readFileSync(r("data/project/current_build_state.json"), "utf8"));
const sliceQueue = JSON.parse(fs.readFileSync(r("data/project/slice_queue.json"), "utf8"));
const updates = JSON.parse(fs.readFileSync(r("data/project/updates.json"), "utf8"));
const processingCalls = JSON.parse(
  fs.readFileSync(r("research/phase_2/ar_processing_voice_call_records.json"), "utf8")
);
const feedCalls = JSON.parse(
  fs.readFileSync(r("research/phase_2/ar_feed_voice_call_records.json"), "utf8")
);

// ─── Part A: Agriculture posture lock ───────────────────────────
wt(
  "reports/CC_ARKANSAS_AGRICULTURE_RESEARCH_POSTURE_LOCK_1_0.md",
  `# Arkansas Agriculture Research Posture Lock 1.0

**Locked:** ${TODAY}  
**Decision frame:** CC-DEC-103 research integrity (not doctrine)

## Combined finding

> Arkansas often has the physical capacity somewhere in the system, but independent producers may lack practical access to that capacity on usable terms.

This pattern now appears in both:

1. **Livestock processing**
2. **Specialty / non-GMO / organic feed**

## Locked posture

### Processing

- Desk-evidenced pathways exist (~**3** accessible inspected cattle pathways claimed at desk).
- Booking confirmation: **0**
- Economically usable confirmation: **0**
- Zeros mean **not yet verified**, not “no capacity.”

### Feed

- Milling / licensed feed capacity exists (including open custom mills and large captive integrator mills).
- Verified open specialty supply (grown+milled+distributed AR chain) and **IP toll capability** remain unverified.
- Least-cost repair candidate (to be voice-tested, not assumed):

> existing mill + segregated/IP grain contract + aggregated producer demand + toll/custom run

## What we will not do until human calls return

- Build another agriculture infrastructure hypothesis (new plants / new mills) from desk inference.
- Invent booking lead times, mill quotes, toll willingness, or segregation capability.
- Decide whether the binding constraint is capacity vs access / scheduling / segregation / minimums / certification / labor / pricing / demand aggregation.

## Human instruments (already shipped)

- Processing: \`reports/CC_AR_PROCESSING_HUMAN_VOICE_CALL_PROTOCOL_1_0.md\` → \`ar_processing_voice_call_records.json\`
- Feed: \`reports/CC_AR_FEED_HUMAN_VOICE_CALL_PROTOCOL_1_0.md\` → \`ar_feed_voice_call_records.json\`

## Active Cursor program while waiting

Pivot off agriculture desk depth to independent Phase 2 claim-quality work:

\`${SLICE}\`
`
);

processingCalls.status = "AWAITING_HUMAN_CALLS";
processingCalls.desk_pass_baseline_preserve = {
  ...processingCalls.desk_pass_baseline_preserve,
  ...PROCESSING_BASELINE,
  zeros_mean: "NOT_YET_VERIFIED — not proof that no capacity exists",
  agriculture_posture_lock: "CC_ARKANSAS_AGRICULTURE_RESEARCH_POSTURE_LOCK_1_0",
  frozen_at: TODAY,
};
fs.writeFileSync(
  r("research/phase_2/ar_processing_voice_call_records.json"),
  JSON.stringify(processingCalls, null, 2) + "\n"
);

feedCalls.status = "AWAITING_HUMAN_CALLS";
feedCalls.agriculture_posture_lock = "CC_ARKANSAS_AGRICULTURE_RESEARCH_POSTURE_LOCK_1_0";
feedCalls.processing_lane_frozen = PROCESSING_BASELINE;
feedCalls.last_updated = TODAY;
fs.writeFileSync(
  r("research/phase_2/ar_feed_voice_call_records.json"),
  JSON.stringify(feedCalls, null, 2) + "\n"
);

// ─── Sources 211–217 ───────────────────────────────────────────
const newSources = [
  {
    source_id: "CC-SRC-211",
    title: "CBO — The Budget and Economic Outlook: 2024 to 2034 (revenue composition)",
    authors: ["Congressional Budget Office"],
    year: 2024,
    url: "https://www.cbo.gov/system/files/2024-02/59710-Outlook-2024.pdf",
    source_type: "federal_budget_office",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "taxation",
    publication_date: "2024-02",
    retrieval_date: TODAY,
    summary:
      "CBO baseline tables show individual income taxes and payroll taxes as the two largest federal revenue categories (e.g., 2024: individual income taxes ~8.8% of GDP; payroll taxes ~5.9% of GDP; total revenues ~17.5% of GDP). Supports descriptive claim that payroll and individual income taxes are major federal tax instruments bearing on labor income. Does not settle economic incidence between workers and employers.",
    key_findings: [
      "Individual income + payroll taxes dominate federal revenue composition",
      "Payroll tax base primarily wages/salaries",
    ],
    limitations: "Statutory/revenue composition ≠ final economic incidence.",
    verification_status: "url_verified_via_search",
    notes: "CC-CLAIM-013 repair spine.",
  },
  {
    source_id: "CC-SRC-212",
    title: "Census Bureau — 2022 Economic Census EC2200SIZECONCEN concentration of largest firms",
    authors: ["U.S. Census Bureau"],
    year: 2022,
    url: "https://data.census.gov/table/ECNSIZE2022.EC2200SIZECONCEN",
    source_type: "federal_statistical",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "competition_concentration",
    publication_date: "2022_Economic_Census_release",
    retrieval_date: TODAY,
    summary:
      "Official Economic Census table publishing concentration of largest firms (CR4/CR8/etc.; HHI for select manufacturing) for U.S. industries. Provides the measurement spine for industry concentration. Concentration levels are not automatic proof of weakened competition or consumer harm.",
    key_findings: [
      "Official CR/HHI concentration measurement available for U.S. industries",
      "Supports measurement half of concentration→competition claims",
    ],
    limitations: "Concentration ≠ competitive harm; product-market definition matters.",
    verification_status: "url_verified_via_search",
    notes: "CC-CLAIM-005 measurement repair.",
  },
  {
    source_id: "CC-SRC-213",
    title: "Autor & Salomons — Is automation labor-share-displacing? (BPEA 2018)",
    authors: ["David Autor", "Anna Salomons"],
    year: 2018,
    url: "https://www.brookings.edu/articles/is-automation-labor-displacing-productivity-growth-employment-and-the-labor-share/",
    source_type: "peer_reviewed_journal",
    reliability: "peer_reviewed",
    primary_or_secondary: "primary",
    jurisdiction: "OECD_cross_country",
    research_domain: "technology_labor",
    publication_date: "2018",
    retrieval_date: TODAY,
    summary:
      "Brookings Papers on Economic Activity study finds automation (TFP / related instruments) has been employment-augmenting but labor-share-displacing over recent decades in OECD industry panels. Own-industry labor-share losses are not fully offset elsewhere. Provides empirical spine for automation→capital/labor distribution claims. Does not settle AI-specific future distributional outcomes.",
    key_findings: [
      "Automation associated with lower labor share",
      "Employment not aggregate-displaced in their framework",
      "AI-specific prediction remains open",
    ],
    limitations: "TFP proxy for automation; AI wave not identified separately.",
    verification_status: "url_verified_via_search",
    notes: "CC-CLAIM-007 adjacent empirical spine — not AI proof.",
  },
  {
    source_id: "CC-SRC-214",
    title: "Auerbach, Devereux, Keen & Vella — Destination-Based Cash Flow Taxation (CBT WP 17/01)",
    authors: ["Alan Auerbach", "Michael P. Devereux", "Michael Keen", "John Vella"],
    year: 2017,
    url: "https://eml.berkeley.edu/~auerbach/CBTWP1701.pdf",
    source_type: "working_paper",
    reliability: "scholarly_working_paper",
    primary_or_secondary: "secondary",
    jurisdiction: "international_tax_design",
    research_domain: "taxation",
    publication_date: "2017-01",
    retrieval_date: TODAY,
    summary:
      "Canonical design paper for destination-based cash-flow taxation (DBCFT). Argues taxing business income at destination (location of final purchasers) improves efficiency and reduces profit-shifting relative to origin-based systems, aligning tax with market access/consumption location. Theoretical/design analysis — not an empirical evaluation of enacted U.S. outcomes.",
    key_findings: [
      "Design rationale: destination aligns tax with relatively immobile market location",
      "Border adjustment analogous to VAT destination principle",
    ],
    limitations: "Proposal/design literature; WTO/admin/incidence debates unresolved here.",
    verification_status: "url_verified_via_fetch",
    notes: "CC-CLAIM-008 design literature spine.",
  },
  {
    source_id: "CC-SRC-215",
    title: "Becker — Investment in Human Capital (JPE 1962)",
    authors: ["Gary S. Becker"],
    year: 1962,
    url: "https://www.nber.org/system/files/chapters/c3733/c3733.pdf",
    source_type: "peer_reviewed_classic",
    reliability: "canonical_theory",
    primary_or_secondary: "primary",
    jurisdiction: "theory_general",
    research_domain: "human_capital",
    publication_date: "1962",
    retrieval_date: TODAY,
    summary:
      "Classic human-capital theory: workers tend to bear costs of general training because they capture wage returns across firms; firm-specific training costs/returns are shared. Supports a qualified reading that education/training costs are often borne by workers for general skills while employers benefit from productivity — but workers also capture private returns, and employers fund substantial specific training.",
    key_findings: [
      "General training: workers typically finance",
      "Specific training: cost/return sharing",
    ],
    limitations: "Theory; modern employer general-training empirics vary; subsidies share costs.",
    verification_status: "url_verified_via_search",
    notes: "CC-CLAIM-018 theoretical spine.",
  },
  {
    source_id: "CC-SRC-216",
    title: "Jones & Williams — Measuring the Social Return to R&D (QJE 1998)",
    authors: ["Charles I. Jones", "John C. Williams"],
    year: 1998,
    url: "https://web.stanford.edu/~chadj/JonesWilliamsQJE.pdf",
    source_type: "peer_reviewed_journal",
    reliability: "peer_reviewed",
    primary_or_secondary: "primary",
    jurisdiction: "US_theory_empirics",
    research_domain: "innovation",
    publication_date: "1998",
    retrieval_date: TODAY,
    summary:
      "Shows empirical R&D-productivity estimates imply large social returns and substantial underinvestment relative to private returns, consistent with knowledge spillovers from research (including publicly supported research channels in the broader literature). Strengthens the claim that public/social research investment contributes to private innovation beyond private appropriability — without proving every commercial product's public pedigree.",
    key_findings: [
      "Social return to R&D exceeds private return (lower-bound interpretation)",
      "Spillover rationale for public research contribution",
    ],
    limitations: "Does not attribute specific products; private R&D remains central.",
    verification_status: "url_verified_via_fetch",
    notes: "CC-CLAIM-020 spillover/measurement repair with NSF funding spine.",
  },
  {
    source_id: "CC-SRC-217",
    title: "ITIF — Still Insignificant? Update on concentration in the U.S. economy (2025)",
    authors: ["Information Technology and Innovation Foundation"],
    year: 2025,
    url: "https://itif.org/publications/2025/12/08/still-insignificant-an-update-on-concentration-in-the-us-economy/",
    source_type: "think_tank",
    reliability: "secondary_advocacy_research",
    primary_or_secondary: "secondary",
    jurisdiction: "US",
    research_domain: "competition_concentration",
    publication_date: "2025-12",
    retrieval_date: TODAY,
    summary:
      "ITIF analysis of 2022 Economic Census C4 ratios argues most industries remain unconcentrated by their thresholds and that average C4 changed little vs 2017. Used as contrary/qualifying evidence: concentration measurement exists, but aggregate 'rising concentration everywhere' narratives are disputed. Does not negate industry-specific competition concerns.",
    key_findings: [
      "Aggregate C4 averages can be moderate even when some industries are concentrated",
      "Useful opposing evidence for overclaiming national concentration harm",
    ],
    limitations: "Advocacy institute; C4≠HHI; industry definition disputes.",
    verification_status: "url_verified_via_search",
    notes: "Contrary evidence for CC-CLAIM-005.",
  },
];

for (const s of newSources) {
  const i = srcDoc.sources.findIndex((x) => x.source_id === s.source_id);
  if (i >= 0) srcDoc.sources[i] = s;
  else srcDoc.sources.push(s);
}
srcDoc.last_updated = TODAY;
srcDoc.note =
  (srcDoc.note || "") +
  ` Phase 2.1 (${TODAY}): CC-SRC-211–217 first-20 below-STRONG repair + ag posture lock.`;
fs.writeFileSync(r("data/research/source_registry.json"), JSON.stringify(srcDoc, null, 2) + "\n");
console.log("[OK] sources; total", srcDoc.sources.length);

// ─── Claim upgrade specs ───────────────────────────────────────
const upgrades = {
  "CC-CLAIM-001": {
    fit: "PARTIAL",
    disposition: "NOT ENOUGH EVIDENCE",
    confidence: "Very Low",
    defect: "SOURCE GAP / HISTORICAL RESEARCH REQUIRED",
    change: "NO_EARNED_UPGRADE",
    note: "Historical breadth still requires dedicated historical module; honesty preserved.",
    add_sources: [],
  },
  "CC-CLAIM-003": {
    fit: "PARTIAL",
    disposition: "NOT ENOUGH EVIDENCE",
    confidence: "Low",
    defect: "CAUSAL OVERREACH / CONCEPT COLLAPSE",
    change: "NO_EARNED_UPGRADE",
    note: "Do not inflate with Arkansas ag infrastructure research. Modules A–E remain path.",
    add_sources: [],
  },
  "CC-CLAIM-005": {
    fit: "STRONG",
    disposition: "SUPPORTED WITH QUALIFICATION",
    confidence: "Moderate",
    defect: null,
    change: "UPGRADED_FIT_PARTIAL_TO_STRONG",
    note: "Census 2022 concentration table closes measurement gap for modal 'can weaken'; contrary ITIF aggregate narrative preserved. Harm still industry-specific.",
    add_sources: ["CC-SRC-212", "CC-SRC-217"],
    opposing_add: [
      "ITIF 2025: many industries remain below common C4 concentration thresholds; aggregate C4 little changed 2017→2022.",
    ],
  },
  "CC-CLAIM-007": {
    fit: "PARTIAL",
    disposition: "SUPPORTED WITH QUALIFICATION",
    confidence: "Low",
    defect: "AI-SPECIFIC PREDICTION STILL OPEN",
    change: "UPGRADED_NONSUPPORTING_TO_PARTIAL",
    note: "Autor/Salomons supply automation→labor-share empirical spine. Claim remains modal; AI-specific futures not proven. Epistemic class stays PREDICTION-adjacent.",
    add_sources: ["CC-SRC-213"],
    epistemic_class: "PREDICTION",
  },
  "CC-CLAIM-008": {
    fit: "PARTIAL",
    disposition: "SUPPORTED WITH QUALIFICATION",
    confidence: "Low",
    defect: "DESIGN_LITERATURE_NOT_EMPIRICAL_OUTCOMES",
    change: "UPGRADED_NONSUPPORTING_TO_PARTIAL",
    note: "Auerbach et al. provide design rationale that destination taxation can align obligations with market location. Not U.S. enacted-outcome proof. Normative/admin/WTO issues remain.",
    add_sources: ["CC-SRC-214"],
    epistemic_class: "CAUSAL_CLAIM",
  },
  "CC-CLAIM-013": {
    fit: "STRONG",
    disposition: "SUPPORTED WITH QUALIFICATION",
    confidence: "Moderate",
    defect: null,
    change: "UPGRADED_FIT_PARTIAL_TO_STRONG",
    note: "CBO revenue composition shows individual income + payroll as major federal revenue components on labor income. Incidence sharing with employers still qualified.",
    add_sources: ["CC-SRC-211"],
  },
  "CC-CLAIM-018": {
    fit: "PARTIAL",
    disposition: "SUPPORTED WITH QUALIFICATION",
    confidence: "Low",
    defect: "THEORY_PLUS_INCIDENCE_NUANCE",
    change: "UPGRADED_NONSUPPORTING_TO_PARTIAL",
    note: "Becker general/specific training framework supports qualified worker-borne general education/training costs while employers benefit from skills — with opposing note that workers capture wage returns and employers fund specific training.",
    add_sources: ["CC-SRC-215"],
    opposing_add: [
      "Workers capture private returns via higher wages; employers fund substantial firm-specific training; public subsidies already share some education costs.",
    ],
  },
  "CC-CLAIM-020": {
    fit: "STRONG",
    disposition: "SUPPORTED WITH QUALIFICATION",
    confidence: "Moderate",
    defect: null,
    change: "UPGRADED_FIT_PARTIAL_TO_STRONG",
    note: "Jones/Williams social-return/spillover framework plus existing NSF funding spine support mild 'public research contributes to private innovation' wording. Attribution of specific products remains contested.",
    add_sources: ["CC-SRC-216"],
  },
};

const claims = claimDoc.claims || claimDoc;
function findClaim(id) {
  if (Array.isArray(claims)) return claims.find((c) => c.claim_id === id);
  return null;
}

const repairLog = [];
for (const [id, u] of Object.entries(upgrades)) {
  const c = findClaim(id);
  const row = matrix.rows.find((x) => x.claim_id === id);
  if (!c || !row) {
    console.warn("[WARN] missing", id);
    continue;
  }
  const prevFit = row.fit;
  const prevDisp = row.disposition;

  if (u.add_sources?.length) {
    c.source_ids = [...new Set([...(c.source_ids || []), ...u.add_sources])];
    row.support_sources = [...new Set([...(row.support_sources || []), ...u.add_sources])];
  }
  if (u.opposing_add?.length) {
    c.opposing_evidence = [...new Set([...(c.opposing_evidence || []), ...u.opposing_add])];
  }
  if (u.epistemic_class) {
    c.epistemic_class = u.epistemic_class;
    row.epistemic_class = u.epistemic_class;
  }

  row.fit = u.fit;
  row.fit_detail = u.fit;
  row.disposition = u.disposition;
  row.confidence = u.confidence;
  row.defect = u.defect;
  row.previous_fit = prevFit;
  row.previous_disposition = prevDisp;
  row.reopened_by = SLICE;
  row.decision_id = DECISION_ID;
  row.repair_note = u.note;

  c.phase21_repair = {
    slice_id: SLICE,
    disposition: u.disposition,
    fit: u.fit,
    fit_detail: u.fit,
    defect: u.defect,
    confidence: u.confidence,
    change: u.change,
    note: u.note,
    repaired_at: TODAY,
  };
  if (u.disposition === "SUPPORTED WITH QUALIFICATION") {
    c.support_level = "supported_with_qualification";
  }
  if (u.disposition === "NOT ENOUGH EVIDENCE") {
    c.support_level = c.support_level || "requires_additional_research";
  }

  repairLog.push({
    claim_id: id,
    previous_fit: prevFit,
    new_fit: u.fit,
    previous_disposition: prevDisp,
    new_disposition: u.disposition,
    change: u.change,
  });
}

// Recompute matrix counts
const fitCounts = {};
const dispCounts = {};
let weak = 0;
let strongDirect = 0;
for (const row of matrix.rows) {
  fitCounts[row.fit] = (fitCounts[row.fit] || 0) + 1;
  dispCounts[row.disposition] = (dispCounts[row.disposition] || 0) + 1;
  if (row.fit === "STRONG" || row.fit === "DIRECT") strongDirect += 1;
  else if (row.fit !== "N/A_RETIRED") weak += 1;
}
matrix.fit_counts = fitCounts;
matrix.disposition_counts = dispCounts;
matrix.weak_fit_below_strong = weak;
matrix.direct_strong_fit = strongDirect;
matrix.version = "0.6.0";
matrix.slice_id = SLICE;
matrix.generated_at = TODAY;
matrix.decision_id = DECISION_ID;
matrix.adjudicator = ADJUDICATOR;
matrix.note = `First-20 below-STRONG repair under ${SLICE}. Weak fit ${weak}/20 (retired excluded from weak). DIRECT/STRONG ${strongDirect}/20. CC-CLAIM-001 and 003 remain NEE. Ag lanes not used to inflate 003.`;
matrix.repair_log = repairLog;

fs.writeFileSync(
  r("research/phase_2/first_20_claim_evidence_matrix.json"),
  JSON.stringify(matrix, null, 2) + "\n"
);
fs.writeFileSync(r("data/research/claim_ledger.json"), JSON.stringify(claimDoc, null, 2) + "\n");
console.log("[OK] matrix + ledger; weak_fit", weak, "strong/direct", strongDirect);

wj("research/phase_2/first_20_below_strong_repair_log.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  before_weak_fit: 8,
  after_weak_fit: weak,
  before_direct_strong: 11,
  after_direct_strong: strongDirect,
  repairs: repairLog,
  sources_added: newSources.map((s) => s.source_id),
  honesty:
    "Staying below STRONG on 001/003/007/008/018 (or subset) is acceptable. No claim-text mutations.",
});

// Public reasoning for material upgrades
const prs = [
  [
    "069",
    "Why upgrade some first-20 claims but leave others weak?",
    "Because evidence must earn the upgrade. New official and peer-reviewed spines strengthened concentration measurement, labor-tax composition, and public-research spillovers. Historical prosperity claims and democratic-capture claims still do not clear their bars.",
  ],
  [
    "070",
    "Did Arkansas agriculture research prove corporate capture of democracy?",
    "No. Processing and feed work test producer access to capacity. They do not prove that economic concentration weakens democratic accountability. That claim remains NOT ENOUGH EVIDENCE.",
  ],
  [
    "071",
    "If automation research exists, why is the AI claim still cautious?",
    "Autor and Salomons provide evidence that automation has been labor-share-displacing. That is not the same as a settled forecast about AI’s future distributional effects. Modal language and open AI-specific uncertainty remain.",
  ],
];
for (const [num, q, a] of prs) {
  const id = `CC-PR-${num}`;
  wt(
    `reports/public_reasoning/${id}.md`,
    `# ${id}\n\n## Skeptical reader question\n\n${q}\n\n## Public answer\n\n${a}\n\n## Slice\n\n${SLICE}\n`
  );
  const rec = {
    record_id: id,
    slice_id: SLICE,
    skeptical_reader_question: q,
    public_answer: a,
    decision_id: DECISION_ID,
    adjudicator: ADJUDICATOR,
    decided_at: TODAY,
    domain: "claim_evidence_quality",
  };
  const ri = prRegistry.records.findIndex((x) => x.record_id === id);
  if (ri >= 0) prRegistry.records[ri] = { ...prRegistry.records[ri], ...rec };
  else prRegistry.records.push(rec);
}
prRegistry.last_updated = TODAY;
fs.writeFileSync(
  r("research/phase_2/public_reasoning_registry.json"),
  JSON.stringify(prRegistry, null, 2) + "\n"
);

// GATE-02 reassessment note — do not falsely close
const gate02 = (checklist.gate_items || []).find((g) => g.id === "CC-P2-GATE-02");
if (gate02) {
  gate02.status = "open";
  gate02.last_evaluated = TODAY;
  gate02.slice_id = SLICE;
  gate02.forensic_note = `GATE-02 remains open because:\n- ${weak}/20 first-20 claims remain below STRONG; ${strongDirect}/20 DIRECT/STRONG (improved from 8/20 weak and 11/20 DIRECT/STRONG)\n- CC-CLAIM-001 and CC-CLAIM-003 remain NOT ENOUGH EVIDENCE\n- Capture hypothesis open; do not use AR ag access research to close 003\n- Leakage still NOT MEASURABLE at net county level (Faulkner preserved)\n- Baseline 2/86`;
}
checklist.last_updated = TODAY;
fs.writeFileSync(
  r("data/project/phase2_acceptance_checklist.json"),
  JSON.stringify(checklist, null, 2) + "\n"
);

const returnMd = `# CC-PHASE-2.1-FIRST-20-BELOW-STRONG-REPAIR-1.0 — Return

**Generated:** ${TODAY}  
**Agriculture posture:** LOCKED — processing ~${PROCESSING_BASELINE.cattle_accessible_claimed_desk}/${PROCESSING_BASELINE.booking_confirmed}/${PROCESSING_BASELINE.economically_usable_confirmed}; feed specialty/toll IP voice-gated. See \`CC_ARKANSAS_AGRICULTURE_RESEARCH_POSTURE_LOCK_1_0.md\`.

## 1. Executive Summary

Independent claim-quality pass while agriculture is human-gated.

| Metric | Before | After |
| --- | ---: | ---: |
| Below STRONG (active) | 8 | **${weak}** |
| DIRECT/STRONG | 11 | **${strongDirect}** |

GATE-02 remains **open**. Improvement is real; closure is not claimed.

## 2. Agriculture posture lock

Combined finding locked:

> Arkansas often has physical capacity somewhere in the system, but independent producers may lack practical access on usable terms.

No new ag infrastructure hypotheses. No invented booking/mill quotes.

## 3. Repair outcomes by claim

| Claim | Change | Fit now | Disposition |
| --- | --- | --- | --- |
| 001 | none earned | PARTIAL | NEE |
| 003 | none earned (no ag inflation) | PARTIAL | NEE |
| 005 | PARTIAL→STRONG | STRONG | Qualifies |
| 007 | NON-SUPPORTING→PARTIAL | PARTIAL | Qualifies (AI still open) |
| 008 | NON-SUPPORTING→PARTIAL | PARTIAL | Qualifies (design lit) |
| 013 | PARTIAL→STRONG | STRONG | Qualifies |
| 018 | NON-SUPPORTING→PARTIAL | PARTIAL | Qualifies |
| 020 | PARTIAL→STRONG | STRONG | Qualifies |

## 4. Sources

CC-SRC-211–217 (CBO revenues; Census concentration; Autor/Salomons; Auerbach DBCFT; Becker human capital; Jones/Williams R&D; ITIF contrary concentration). Total sources: ${srcDoc.sources.length}.

## 5. Integrity

- No silent claim-text mutations
- Staying weak on 001/003 is intentional honesty
- 007/008/018 upgraded only to PARTIAL — still below STRONG
- Public Reasoning: CC-PR-069–071

## 6. GATE-02

Reassessed; remains open. Forensic note updated with new weak/strong counts. Baseline still **2/86**. Modeling/legal **0%**.

## 7. Validators

Filled at ship.

## 8. Exact next

Human: processing + feed voice calls (independent).  
Cursor (if still waiting): journalism 90-day coverage coding **or** baseline verified-subset expansion — not more ag desk depth.
`;

wt(`reports/CC_PHASE_2_1_FIRST_20_BELOW_STRONG_REPAIR_1_0_RETURN.md`, returnMd);

// Slice queue / updates / build state
const sliceRec = {
  slice_id: SLICE,
  title: "First-20 Below-STRONG Repair",
  status: "completed",
  completed_at: TODAY,
  completion_evidence: [
    "agriculture posture lock 1.0",
    `weak_fit ${weak}/20 (was 8)`,
    `direct_strong ${strongDirect}/20 (was 11)`,
    "CC-SRC-211–217",
    "CC-PR-069–071",
    "GATE-02 reassessed still open",
  ],
  next_recommended_slice: "CC-PHASE-2.1-AR-COVERAGE-MATRIX-90-DAY-CODING-PASS-1.0",
  alternate_next: [
    "CC-PHASE-2.1-BASELINE-VERIFIED-SUBSET-EXPANSION-1.0",
    "CC-PHASE-2.1-AR-PROCESSING-VOICE-BOOKING-CONFIRMATION-AND-MARGIN-PILOT-1.0",
    "CC-PHASE-2.1-AR-FEED-VOICE-BOTTLENECK-ADJUDICATION-1.0",
  ],
  note: "Evidence upgrades only. Ag lanes frozen awaiting human calls. No new mills/plants hypotheses.",
};
const sqi = (sliceQueue.slices || []).findIndex((s) => s.slice_id === SLICE);
if (sqi >= 0) sliceQueue.slices[sqi] = { ...sliceQueue.slices[sqi], ...sliceRec };
else sliceQueue.slices.push(sliceRec);

sliceQueue.active_slice = "CC-PHASE-2.1-AR-COVERAGE-MATRIX-90-DAY-CODING-PASS-1.0";
sliceQueue.parallel_blocked = {
  processing: {
    slice_id: "CC-PHASE-2.1-AR-PROCESSING-VOICE-BOOKING-CONFIRMATION-AND-MARGIN-PILOT-1.0",
    status: "AWAITING_HUMAN_CALLS",
    baseline: "~3 / 0 / 0",
  },
  feed: {
    slice_id: "CC-PHASE-2.1-AR-NON-GMO-FEED-PRIMARY-PRICE-IP-GRAIN-AND-TOLL-MILLING-STUDY-1.0",
    status: "AWAITING_HUMAN_CALLS",
    note: "AR mill quotes and IP toll willingness empty until voice records entered",
  },
};
sliceQueue.agriculture_posture_lock =
  "reports/CC_ARKANSAS_AGRICULTURE_RESEARCH_POSTURE_LOCK_1_0.md";
sliceQueue.last_completed_slice = SLICE;
sliceQueue.last_updated = TODAY;
fs.writeFileSync(r("data/project/slice_queue.json"), JSON.stringify(sliceQueue, null, 2) + "\n");

const upd087 = {
  id: "UPD-087",
  date: TODAY,
  title: "Agriculture posture lock + first-20 below-STRONG repair",
  summary: `Locked AR ag posture (capacity≠access) with processing ~3/0/0 and feed toll/IP voice-gated. First-20 weak fit ${weak}/20 (was 8); DIRECT/STRONG ${strongDirect}/20 (was 11). Claims 005/013/020→STRONG; 007/008/018→PARTIAL; 001/003 remain NEE. GATE-02 still open. Sources 211–217.`,
  public: true,
};
const ui = updates.updates.findIndex((u) => u.id === "UPD-087");
if (ui >= 0) updates.updates[ui] = upd087;
else updates.updates.push(upd087);
updates.last_updated = TODAY;
fs.writeFileSync(r("data/project/updates.json"), JSON.stringify(updates, null, 2) + "\n");

Object.assign(buildState, {
  last_updated: TODAY,
  mission_id: SLICE,
  last_completed_slice: SLICE,
  writing_focus:
    "Ag posture locked. First-20 claim quality improved; GATE-02 open. Awaiting human ag calls.",
});
fs.writeFileSync(r("data/project/current_build_state.json"), JSON.stringify(buildState, null, 2) + "\n");

wj("data/project/latest_cursor_return.json", {
  mission_id: SLICE,
  status: "PARTIAL",
  updated_at: TODAY,
  summary: `Ag posture locked (capacity≠access). First-20 weak fit ${weak}/20 (was 8); DIRECT/STRONG ${strongDirect}/20 (was 11). 001/003 remain NEE. GATE-02 open. Processing ~3/0/0 and feed voice still human-gated. Sources 211–217.`,
  repository_root: "H:\\Constitutional-Capitalism",
  branch: "main",
  starting_commit: "pending",
  ending_commit: "pending",
  github_push: "pending",
  remote_url: "https://github.com/Grappe501/constitutional-capitalism",
  overall_percent: 43,
  phase_2_status: "PARTIAL",
  recommended_next_slice: "CC-PHASE-2.1-AR-COVERAGE-MATRIX-90-DAY-CODING-PASS-1.0",
  decision_ids: ["CC-DEC-103"],
  update_ids: ["UPD-087"],
  public_paths: [],
  board_paths: ["/research/"],
  integrity_note:
    "No silent claim-text mutations. No ag inflation of CC-CLAIM-003. No invented booking/mill quotes. GATE-02 not falsely closed.",
  next_command:
    "Human ag voice calls in parallel; Cursor may proceed to journalism coverage coding or baseline subset expansion",
  report: "reports/CC_PHASE_2_1_FIRST_20_BELOW_STRONG_REPAIR_1_0_RETURN.md",
  agriculture_posture_lock: "reports/CC_ARKANSAS_AGRICULTURE_RESEARCH_POSTURE_LOCK_1_0.md",
  sources_registered: srcDoc.sources.length,
  doctrine_expanded: false,
  principle_added: false,
  weak_fit_below_strong: weak,
  direct_strong_fit: strongDirect,
  processing_baseline: PROCESSING_BASELINE,
  feed_voice_status: "AWAITING_HUMAN_CALLS",
});

console.log("\nFirst-20 repair + ag lock complete");
console.log("weak_fit", weak, "direct_strong", strongDirect);
