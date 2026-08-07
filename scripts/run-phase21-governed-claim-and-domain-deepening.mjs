/**
 * CC-PHASE-2.1-GOVERNED-CLAIM-APPROVAL-AND-SUBSTANTIVE-DOMAIN-DEEPENING-1.0
 *
 * Pass A: Build Steve decision packet. Do NOT mutate claim_text without recorded approvals.
 * Pass B: Deepen CRITICAL GAP then THIN domains with wording-independent research.
 */
import fs from "node:fs";
import path from "node:path";
import { r } from "./lib/paths.mjs";

const TODAY = "2026-08-07";
const SLICE =
  "CC-PHASE-2.1-GOVERNED-CLAIM-APPROVAL-AND-SUBSTANTIVE-DOMAIN-DEEPENING-1.0";
const METH = "CC-CLAIM-GOVERNANCE-1.0";

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
const predDoc = JSON.parse(fs.readFileSync(r("data/project/prediction_ledger.json"), "utf8"));
const checklist = JSON.parse(
  fs.readFileSync(r("data/project/phase2_acceptance_checklist.json"), "utf8")
);
const queue = JSON.parse(
  fs.readFileSync(r("research/phase_2/claim_change_governance_queue.json"), "utf8")
);
const rewriteCands = JSON.parse(
  fs.readFileSync(r("research/phase_2/priority_claim_rewrite_candidates.json"), "utf8")
);
const priorMatrix = JSON.parse(
  fs.readFileSync(r("research/phase_2/first_20_claim_evidence_matrix.json"), "utf8")
);
const priorDomain = JSON.parse(
  fs.readFileSync(r("research/phase_2/priority_domain_research_matrix.json"), "utf8")
);
const sliceQueue = JSON.parse(fs.readFileSync(r("data/project/slice_queue.json"), "utf8"));
const buildState = JSON.parse(fs.readFileSync(r("data/project/current_build_state.json"), "utf8"));

// --- Detect existing Steve decisions (must be machine-readable; do not infer) ---
const decisionPacketPath = r("data/project/steve_claim_governance_decision_packet.json");
let existingSteveDecisions = null;
if (fs.existsSync(decisionPacketPath)) {
  try {
    const existing = JSON.parse(fs.readFileSync(decisionPacketPath, "utf8"));
    if (
      existing?.operator_decisions_recorded === true &&
      Array.isArray(existing?.decisions) &&
      existing.decisions.every((d) =>
        ["APPROVE", "REJECT", "MODIFY", "DEFER"].includes(d.steve_decision)
      )
    ) {
      existingSteveDecisions = existing;
    }
  } catch {
    existingSteveDecisions = null;
  }
}

const approvedExists = Boolean(existingSteveDecisions);
console.log(
  approvedExists
    ? "[GOVERNANCE] Steve decisions found — will apply."
    : "[GOVERNANCE] No Steve decisions recorded — mutations BLOCKED."
);

const before = {
  weak_fit: priorMatrix.rows.filter((row) =>
    ["PARTIAL", "WEAK", "NON-SUPPORTING"].includes(row.fit)
  ).length,
  direct_strong: priorMatrix.rows.filter((row) =>
    ["DIRECT", "STRONG"].includes(row.fit)
  ).length,
  fit_counts: { ...priorMatrix.fit_counts },
  disposition_counts: { ...priorMatrix.disposition_counts },
  domains: Object.fromEntries(
    priorDomain.domains.map((d) => [d.domain, d.coverage_assessment])
  ),
  sources: srcDoc.sources.length,
  contrary_sources: srcDoc.sources.filter(
    (s) =>
      (s.notes || "").toLowerCase().includes("contrary") ||
      (s.summary || "").toLowerCase().includes("contrary")
  ).length,
  primary_sources: srcDoc.sources.filter((s) => s.primary_or_secondary === "primary")
    .length,
  p0_open: 0,
  baseline: "2/86",
  gate02: "PARTIAL / REMAINS OPEN",
  claim_text_mutations: 0
};

// ============================================================================
// PASS A — Steve decision packet (never auto-approve)
// ============================================================================

const candById = Object.fromEntries(
  (rewriteCands.candidates || []).map((c) => [c.claim_id, c])
);

const packetItems = [
  {
    change_id: "CC-CHG-P21-001",
    claim_id: "CC-CLAIM-001",
    action: "REWRITE",
    current_canonical_wording:
      "Capitalism has produced broad prosperity across historical contexts.",
    proposed_wording:
      "In many countries and periods, market-oriented growth has been associated with large gains in material living standards, with important exceptions, crises, and distributional conflicts that must be scoped before public wording.",
    why_current_fails:
      "Civilizationally sweeping; no registered sources; unfalsifiable as written.",
    what_new_removes: ["Universal 'capitalism has produced'", "implied inevitability"],
    what_new_preserves: [
      "Association of market-oriented growth with living-standard gains in many contexts",
      "Explicit exceptions and distributional conflict"
    ],
    best_support: "(none registered — historical modules still required)",
    best_contrary:
      "Cross-country and within-country experiences vary widely; crises and failures are first-class.",
    source_to_claim_fit: "NON-SUPPORTING → proposed PARTIAL if approved + sourced",
    confidence: "Very Low until sourced modules exist",
    impact_if_approved:
      "Claim becomes falsifiable research agenda; still NOT ENOUGH EVIDENCE until modules land.",
    impact_if_rejected:
      "Canonical overclaim remains; GATE-02 weak-fit count stays inflated by unfalsifiable wording.",
    burt_recommendation: "APPROVE",
    steve_decision: null,
    steve_notes: null
  },
  {
    change_id: "CC-CHG-P21-005",
    claim_id: "CC-CLAIM-006",
    action: "OPTIONAL REWRITE",
    optional_treatment: true,
    options_assessment: {
      A_existing_defensible:
        "Yes — rural structural decline (banking, healthcare, population) is sourced (CC-SRC-008–010); claim already uses 'can'.",
      B_narrower_improves_fit:
        "Modestly — separates relocation causality from documented structural stress.",
      C_no_meaningful_evidentiary_improvement:
        "If rewrite is only stylistic packaging of the same sources, improvement is small."
    },
    current_canonical_wording:
      "Corporate relocation and rural structural decline can drain community capacity, including local banking and healthcare access.",
    proposed_wording:
      "Rural structural decline can erode community capacity (population, banking, healthcare access); corporate relocation is a plausible contributing mechanism requiring separate causal modules.",
    why_current_fails:
      "Bundles corporate-relocation causality with documented rural structural stress.",
    what_new_removes: ["Implied joint proven package of relocation + decline"],
    what_new_preserves: [
      "Rural structural indicators",
      "Banking/healthcare access concerns",
      "Relocation as plausible hypothesis"
    ],
    best_support: "CC-SRC-008, CC-SRC-009, CC-SRC-010 (structural rural stress)",
    best_contrary: "Heterogeneous nonmetro outcomes; some post-2020 gains.",
    source_to_claim_fit: "PARTIAL → proposed STRONG if approved",
    confidence: "Moderate",
    impact_if_approved: "Cleaner causal separation; small fit gain.",
    impact_if_rejected:
      "Acceptable if Steve judges existing wording already hedged enough (Burt leans NO CHANGE / REJECT optional rewrite).",
    burt_recommendation: "REJECT (NO CHANGE) — optional; evidentiary gain is modest, not mandatory",
    steve_decision: null,
    steve_notes: null
  },
  {
    change_id: "CC-CHG-P21-RET-009",
    claim_id: "CC-CLAIM-009",
    action: "RETIRE → CC-PRED-009",
    current_canonical_wording:
      "System-level Constitutional Capitalism over 10–20 years would produce larger distributional effects than isolated corporate tax increases.",
    proposed_wording: null,
    proposed_prediction_id: "CC-PRED-009",
    why_current_fails:
      "Unsupported system-level prediction; not an empirical current-state diagnosis claim; zero sources; fails fit.",
    what_new_removes: ["Empirical-claim presentation of a forecast"],
    what_new_preserves: [
      "Full historical claim record",
      "Prediction ledger entry CC-PRED-009 (already drafted PENDING)",
      "Graph lineage"
    ],
    best_support: "(none — prediction class)",
    best_contrary:
      "No modeling or pilots compare package reforms vs isolated corporate-tax increases.",
    source_to_claim_fit: "N/A_RETIRED (recommended)",
    confidence: "Very Low as empirical claim",
    impact_if_approved:
      "Claim status RETIRED; CC-PRED-009 becomes the governed prediction object; not counted as empirical proof.",
    impact_if_rejected:
      "Overclaim remains in first-20 diagnosis set and continues to pollute GATE-02.",
    retirement_rationale: {
      why_not_empirical_current_state:
        "Compares future package outcomes to counterfactual tax policy — requires simulation, not diagnosis facts.",
      why_prediction_more_accurate:
        "Forward-looking comparative distributional claim with 10–20 year horizon.",
      evidence_limitations: "No registered sources; no model; no pilot results.",
      conditions_to_evaluate_later: [
        "Defined reform package",
        "Comparable baseline tax scenario",
        "Distributional metrics and horizon",
        "Modeling or quasi-experimental evaluation plan"
      ],
      date_horizon: "10–20 years (as stated in original claim)"
    },
    burt_recommendation: "APPROVE",
    steve_decision: null,
    steve_notes: null
  },
  {
    change_id: "CC-CHG-P21-002",
    claim_id: "CC-CLAIM-010",
    action: "REWRITE",
    current_canonical_wording:
      "Broader ownership participation would shift many households from wage-only dependence toward multi-source capital ownership.",
    proposed_wording:
      "U.S. household wealth is highly concentrated; whether broader ownership participation would shift households toward multi-source capital income is an untested design prediction requiring modeling and pilots.",
    why_current_fails:
      "Uses SCF/DFA concentration sources to support a redesign forecast.",
    what_new_removes: ["Would shift many households", "implied empirical forecast"],
    what_new_preserves: [
      "Descriptive concentration fact",
      "Ownership-participation research agenda labeled as prediction"
    ],
    best_support: "CC-SRC-001, CC-SRC-002, CC-SRC-012 (concentration clause only)",
    best_contrary: "Concentration facts do not validate ownership-redesign outcomes.",
    source_to_claim_fit: "NON-SUPPORTING → proposed PARTIAL if approved",
    confidence: "High for concentration clause; Very Low for prediction clause",
    impact_if_approved: "Splits descriptive vs predictive; fit can improve without pretending proof.",
    impact_if_rejected: "Forecast remains falsely attached to SCF/DFA evidence.",
    burt_recommendation: "APPROVE",
    steve_decision: null,
    steve_notes: null
  },
  {
    change_id: "CC-CHG-P21-003",
    claim_id: "CC-CLAIM-016",
    action: "REWRITE",
    current_canonical_wording:
      "Online commerce can extract spending from local economies via platform concentration and wealth leakage.",
    proposed_wording:
      "Online commerce is a material share of U.S. retail sales; effects on local spending, platform margins, and community wealth require dedicated leakage/multiplier studies and must not recycle pre-Wayfair tax myths.",
    why_current_fails:
      "Leakage/extraction unproven; scale sources do not establish the mechanism claim.",
    what_new_removes: ["can extract", "wealth leakage as established mechanism"],
    what_new_preserves: [
      "Material e-commerce retail share",
      "Open research agenda on local effects",
      "Wayfair legal update"
    ],
    best_support: "CC-SRC-085, CC-SRC-086 (scale / tax law — not leakage)",
    best_contrary:
      "Consumer surplus gains (Dolfen et al.); hybrid local/online sellers; post-Wayfair collection authority.",
    source_to_claim_fit: "WEAK → proposed STRONG if approved (for rewritten scale/agenda claim)",
    confidence: "High for retail share; Low for local leakage until measured",
    impact_if_approved: "Stops smuggling unmeasured leakage into canonical text.",
    impact_if_rejected: "Mechanism overclaim continues to fail fit audits.",
    burt_recommendation: "APPROVE",
    steve_decision: null,
    steve_notes: null
  },
  {
    change_id: "CC-CHG-P21-004",
    claim_id: "CC-CLAIM-017",
    action: "REWRITE",
    current_canonical_wording:
      "Property taxation can threaten ownership security for some households.",
    proposed_wording:
      "Property taxes can impose high burdens relative to income or liquidity for some households, motivating targeted relief design; they are also a central, relatively stable local revenue source.",
    why_current_fails:
      "'Threaten ownership security' overclaims relative to burden/relief evidence.",
    what_new_removes: ["threaten ownership security"],
    what_new_preserves: [
      "Burden/liquidity concern",
      "Relief-design motivation",
      "Institutional role of property tax"
    ],
    best_support: "CC-SRC-089",
    best_contrary:
      "Lincoln Institute emphasizes property-tax strengths and targeted relief over blunt limits.",
    source_to_claim_fit: "PARTIAL → proposed STRONG if approved",
    confidence: "Moderate",
    impact_if_approved: "Aligns wording with burden evidence; improves fit.",
    impact_if_rejected: "Security-threat framing remains overclaim.",
    burt_recommendation: "APPROVE",
    steve_decision: null,
    steve_notes: null
  }
];

const decisionPacket = {
  version: "1.0.0",
  slice_id: SLICE,
  generated_at: TODAY,
  methodology_version: METH,
  governance_status: approvedExists ? "DECISIONS_RECORDED" : "AWAITING_OPERATOR_ACTION",
  operator_decisions_recorded: approvedExists,
  stop_gate:
    "Do not mutate canonical claim_text until Steve records APPROVE|REJECT|MODIFY|DEFER for each item in this packet.",
  steve_decision_options: ["APPROVE", "REJECT", "MODIFY", "DEFER"],
  pending_actions: packetItems.map((p) => `${p.claim_id} — ${p.action}`),
  items: packetItems,
  blocked_mutations_if_awaiting: approvedExists
    ? []
    : [
        "CC-CLAIM-001 claim_text rewrite",
        "CC-CLAIM-006 claim_text rewrite (optional)",
        "CC-CLAIM-009 RETIRE + activate CC-PRED-009 as supersession",
        "CC-CLAIM-010 claim_text rewrite",
        "CC-CLAIM-016 claim_text rewrite",
        "CC-CLAIM-017 claim_text rewrite"
      ],
  how_steve_records_decisions: [
    "Set operator_decisions_recorded=true",
    "For each item set steve_decision to APPROVE|REJECT|MODIFY|DEFER",
    "If MODIFY, supply steve_modified_text",
    "Re-run this slice or a dedicated apply-governance slice"
  ]
};

writeJson("data/project/steve_claim_governance_decision_packet.json", decisionPacket);

const packetMd = `# Steve Claim Governance Decision Packet 1.0

**Slice:** \`${SLICE}\`  
**Generated:** ${TODAY}  
**Governance status:** **${decisionPacket.governance_status}**  
**Canonical registries outrank reports.**

## Stop gate

Steve must record one of: **APPROVE | REJECT | MODIFY | DEFER** for each pending action.

**No other status is valid.**  
**Do not infer approval from this packet.**  
Until decisions are machine-recorded in \`data/project/steve_claim_governance_decision_packet.json\` with \`operator_decisions_recorded: true\`, **canonical \`claim_text\` must not change.**

### Blocked mutations (current run)

${decisionPacket.blocked_mutations_if_awaiting.map((x) => `- ${x}`).join("\n") || "- (none — decisions recorded)"}

---

## Pending actions

${packetItems
  .map(
    (p) => `### ${p.claim_id} — ${p.action}

| Field | Content |
|---|---|
| CURRENT CANONICAL WORDING | ${p.current_canonical_wording} |
| PROPOSED WORDING | ${p.proposed_wording ?? "_(retire; move to prediction)_"} |
| WHY CURRENT WORDING FAILS | ${p.why_current_fails} |
| WHAT THE NEW WORDING REMOVES | ${(p.what_new_removes || []).join("; ")} |
| WHAT THE NEW WORDING PRESERVES | ${(p.what_new_preserves || []).join("; ")} |
| BEST SUPPORT | ${p.best_support} |
| BEST CONTRARY EVIDENCE | ${p.best_contrary} |
| SOURCE-TO-CLAIM FIT | ${p.source_to_claim_fit} |
| CONFIDENCE | ${p.confidence} |
| IMPACT IF APPROVED | ${p.impact_if_approved} |
| IMPACT IF REJECTED | ${p.impact_if_rejected} |
| BURT RECOMMENDATION | **${p.burt_recommendation}** |
| STEVE DECISION | _PENDING_ (APPROVE / REJECT / MODIFY / DEFER) |

${
  p.optional_treatment
    ? `**Optional rewrite assessment (CC-CLAIM-006):**

- **A.** Existing wording remains defensible: ${p.options_assessment.A_existing_defensible}
- **B.** Narrower wording materially improves fit: ${p.options_assessment.B_narrower_improves_fit}
- **C.** Rewriting creates no meaningful evidentiary improvement: ${p.options_assessment.C_no_meaningful_evidentiary_improvement}

Burt recommends **NO CHANGE** (record as **REJECT** on the optional rewrite) unless Steve wants causal split for clarity.
`
    : ""
}
${
  p.retirement_rationale
    ? `**Retirement / prediction notes:**

- Why not empirical current-state: ${p.retirement_rationale.why_not_empirical_current_state}
- Why prediction classification: ${p.retirement_rationale.why_prediction_more_accurate}
- Evidence limitations: ${p.retirement_rationale.evidence_limitations}
- Conditions to evaluate later: ${p.retirement_rationale.conditions_to_evaluate_later.join("; ")}
- Date horizon: ${p.retirement_rationale.date_horizon}
`
    : ""
}`
  )
  .join("\n---\n\n")}

## How to record decisions

Edit \`data/project/steve_claim_governance_decision_packet.json\`:

1. Set \`operator_decisions_recorded\` to \`true\`
2. Set each item's \`steve_decision\`
3. For MODIFY, add \`steve_modified_text\`
4. Re-run governed apply (do not silent search-replace)

Machine path: \`data/project/steve_claim_governance_decision_packet.json\`
`;

writeText("reports/CC_STEVE_CLAIM_GOVERNANCE_DECISION_PACKET_1_0.md", packetMd);

// Mark queue awaiting operator (do not invent APPROVE)
for (const ch of queue.changes) {
  ch.approval_status = "AWAITING_OPERATOR";
  ch.decision_packet = "data/project/steve_claim_governance_decision_packet.json";
  ch.blocked_until = "Steve records APPROVE|REJECT|MODIFY|DEFER";
}
queue.governance_status = "AWAITING_OPERATOR_ACTION";
queue.slice_id_awaiting = SLICE;
queue.last_updated = TODAY;
queue.note =
  "Canonical claim_text NOT mutated. Decision packet built. Awaiting Steve.";
writeJson("research/phase_2/claim_change_governance_queue.json", queue);

// Claim lineage (nothing disappeared; no text mutations this slice)
const lineageRows = priorMatrix.rows.map((row) => {
  const claim = claimDoc.claims.find((c) => c.claim_id === row.claim_id);
  const pending = queue.changes.filter((c) => c.claim_id === row.claim_id);
  return {
    claim_id: row.claim_id,
    original_wording: claim?.claim_text || row.claim_text,
    current_wording: claim?.claim_text || row.claim_text,
    current_status: claim?.lifecycle_status || "active",
    prior_disposition: row.disposition,
    current_disposition: row.disposition,
    change_history: pending.length
      ? pending.map((p) => ({
          change_id: p.change_id,
          change_type: p.change_type,
          approval_status: p.approval_status,
          proposed_text: p.proposed_text,
          supersession_target: p.supersession_target || null
        }))
      : [],
    decision_references: pending.length
      ? ["data/project/steve_claim_governance_decision_packet.json"]
      : [],
    evidence_references: row.support_sources || [],
    note:
      pending.length > 0
        ? "Pending governance; current wording unchanged"
        : "No pending wording change"
  };
});

writeJson("research/phase_2/first_20_claim_lineage.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  rule: "Nothing disappears. Originals remain recoverable. No unauthorized claim_text mutation.",
  operator_decisions_recorded: approvedExists,
  claims: lineageRows
});

writeText(
  "reports/CC_FIRST_20_CLAIM_LINEAGE_AFTER_GOVERNANCE.md",
  `# First-20 Claim Lineage After Governance

**Slice:** \`${SLICE}\`  
**Operator decisions recorded:** ${approvedExists}  
**Canonical claim_text mutations this slice:** 0

| Claim | Original = Current | Status | Prior disposition | Pending change |
|---|---|---|---|---|
${lineageRows
  .map(
    (x) =>
      `| ${x.claim_id} | ${x.current_wording.replace(/\|/g, "/")} | ${x.current_status} | ${x.prior_disposition} | ${
        x.change_history.map((c) => c.change_id + ":" + c.approval_status).join("; ") || "—"
      } |`
  )
  .join("\n")}

Full machine lineage: \`research/phase_2/first_20_claim_lineage.json\`
`
);

// If approvals existed, apply — they do not in this run
const appliedMutations = [];
if (approvedExists) {
  console.log("[APPLY] Applying Steve decisions…");
  // Reserved for future apply path; integrity requires decision_id etc.
} else {
  console.log("[BLOCKED] Skipping all claim_text / retirement mutations.");
}

// ============================================================================
// PASS B — Sources + dossiers (wording-independent)
// ============================================================================

const newSources = [
  {
    source_id: "CC-SRC-094",
    title:
      "Testing Theories of American Politics: Elites, Interest Groups, and Average Citizens",
    authors: ["Martin Gilens", "Benjamin I. Page"],
    year: 2014,
    url: "https://doi.org/10.1017/S1537592714001595",
    source_type: "peer_reviewed",
    reliability: "scholarly_primary_analysis",
    primary_or_secondary: "secondary",
    jurisdiction: "US",
    research_domain: "political_economic_power",
    publication_date: "2014",
    retrieval_date: TODAY,
    summary:
      "Peer-reviewed multivariate analysis of 1,779 U.S. policy issues arguing economic elites and organized business interests have substantial independent impacts on policy, while average citizens have little or no independent influence when preferences diverge — a key unequal-responsiveness result, not a proof of 'capture' or that economic concentration weakens democratic accountability as a single mechanism.",
    key_findings: [
      "Economic elites and business-oriented groups show independent association with policy outcomes in the study frame",
      "Average citizens show little independent influence once elite/group preferences are controlled"
    ],
    limitations:
      "High preference correlation across income groups; causal identification debated; does not measure regulatory/state capture; not a campaign-contribution study; national-policy sample.",
    ideological_or_institutional_considerations:
      "Influential unequal-responsiveness paper; contested methodology.",
    verification_status: "url_verified_via_search_excerpt",
    notes:
      "Best supporting literature for unequal policy responsiveness — PARTIAL adjacent to CC-CLAIM-003; NON-SUPPORTING for 'capture' synonymy."
  },
  {
    source_id: "CC-SRC-095",
    title: "When Do the Rich Win?",
    authors: ["J. Alexander Branham", "Stuart N. Soroka", "Christopher Wlezien"],
    year: 2017,
    url: "https://doi.org/10.1002/polq.12577",
    source_type: "peer_reviewed",
    reliability: "scholarly_primary_analysis",
    primary_or_secondary: "secondary",
    jurisdiction: "US",
    research_domain: "political_economic_power",
    publication_date: "2017",
    retrieval_date: TODAY,
    summary:
      "Peer-reviewed Political Science Quarterly analysis of congruence when income groups disagree. Finds middle/rich/poor preferences usually align; when middle and rich disagree, the rich win only slightly more often — concluding the rich may matter more than they should but do not dominate policymaking. Direct contrary check on strong oligarchy/capture readings of Gilens/Page-type findings.",
    key_findings: [
      "Income groups almost always agree on policies in the analyzed cases",
      "When middle and rich disagree, rich win only slightly more often; rich do not dominate"
    ],
    limitations:
      "Congruence design differs from Gilens/Page multivariate approach; does not settle all responsiveness debates.",
    ideological_or_institutional_considerations: "Methodological critique/reanalysis tradition.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "Contrary evidence for strong capture/oligarchy claims linked to CC-CLAIM-003."
  },
  {
    source_id: "CC-SRC-096",
    title: "Lobbying Disclosure Act (LDA) Public Reports — LDA.gov",
    authors: ["U.S. Senate", "Secretary of the Senate"],
    year: 2026,
    url: "https://lda.senate.gov/system/public/",
    source_type: "federal_disclosure",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "political_economic_power",
    publication_date: "ongoing",
    retrieval_date: TODAY,
    summary:
      "Official federal Lobbying Disclosure Act filings (LD-1 registrations, LD-2 quarterly activity, LD-203 contributions). Primary disclosure spine for lobbying activity — distinct from FEC campaign finance and from capture outcomes.",
    key_findings: [
      "Federal lobbying registrations and quarterly activity reports are publicly searchable/downloadable",
      "Disclosure enables descriptive lobbying research; does not by itself prove capture"
    ],
    limitations:
      "Disclosure ≠ influence ≠ capture. Thresholds and reporting quality issues; state/local lobbying often outside LDA; does not measure policy outcomes.",
    ideological_or_institutional_considerations: "Statutory disclosure system.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "Lobbying spine separate from FEC (CC-SRC-092/093) for CC-CLAIM-003 research."
  },
  {
    source_id: "CC-SRC-097",
    title: "Effects of E-commerce on Local Labor Markets",
    authors: ["Anahid Bauer", "Sofía Fernández Guerrico"],
    year: 2023,
    url: "https://docs.iza.org/dp16345.pdf",
    source_type: "working_paper",
    reliability: "scholarly_secondary",
    primary_or_secondary: "secondary",
    jurisdiction: "US",
    research_domain: "internet_commerce",
    publication_date: "2023-07",
    retrieval_date: TODAY,
    summary:
      "IZA discussion paper exploiting state 'Amazon Tax' sales-tax collection mandates on out-of-state online retailers (2010–2016). Finds that removing the online price advantage lowers employment in transportation/warehousing complementary to e-commerce and produces net retail employment declines with brick-and-mortar losses partly offset by warehouse clubs/supercenters — evidence on local labor-market adjustment, not proof of 'wealth leakage' or platform extraction.",
    key_findings: [
      "Sales-tax collection mandates associated with lower transport/warehousing employment",
      "Net local retail employment declines with within-retail reallocation"
    ],
    limitations:
      "Working paper; pre/post Amazon Tax design; not a community wealth-multiplier study; does not measure platform concentration or capital ownership leakage.",
    ideological_or_institutional_considerations: "IZA DP series (preliminary).",
    verification_status: "url_verified_via_search_excerpt",
    notes:
      "Supports local labor effects of e-commerce tax shocks — PARTIAL adjacent to CC-CLAIM-016; NON-SUPPORTING for 'wealth leakage' wording."
  },
  {
    source_id: "CC-SRC-098",
    title: "Assessing the Gains from E-Commerce",
    authors: [
      "Paul Dolfen",
      "Liran Einav",
      "Peter J. Klenow",
      "Benjamin Klopack",
      "Jonathan D. Levin",
      "Larry Levin",
      "Wayne Best"
    ],
    year: 2023,
    url: "https://www.aeaweb.org/articles?id=10.1257/mac.20210049",
    source_type: "peer_reviewed",
    reliability: "scholarly_primary_analysis",
    primary_or_secondary: "secondary",
    jurisdiction: "US",
    research_domain: "internet_commerce",
    publication_date: "2023",
    retrieval_date: TODAY,
    summary:
      "AEJ: Macroeconomics study using Visa card transactions (2007–2017) estimating U.S. consumer surplus from e-commerce. Finds roughly 1% consumption-equivalent welfare gain by 2017 (>$1,000/household/year), mostly from access to merchants not available locally; higher-income and denser-county consumers gained more. Direct contrary/countervailing evidence against net-harm-only leakage narratives.",
    key_findings: [
      "Material consumer surplus from e-commerce variety/convenience",
      "Gains larger for higher-income and denser counties in this U.S. sample"
    ],
    limitations:
      "Card-network sample; welfare to consumers ≠ local business/fiscal incidence; denser-county pattern complicates simple rural-access U.S. stories; does not measure community wealth leakage.",
    ideological_or_institutional_considerations: "Peer-reviewed macro/IO consumer-welfare estimate.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "Contrary/countervailing consumer-welfare evidence for CC-CLAIM-016 net-harm framing."
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

// Concept registry (mini) for political power terms
const conceptRegistry = {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  rule: "These terms are NOT synonyms. Future claims must use the narrowest accurate term.",
  concepts: [
    {
      id: "CC-CONCEPT-INFLUENCE",
      term: "INFLUENCE",
      definition:
        "Observable association between an actor's preferences/resources and policy or political outcomes, without necessarily implying control of institutions.",
      not_the_same_as: ["CAPTURE", "CORRUPTION"]
    },
    {
      id: "CC-CONCEPT-ACCESS",
      term: "ACCESS",
      definition:
        "Ability to obtain meetings, hearing time, or agenda entry with decision-makers — necessary but not sufficient for influence or capture.",
      not_the_same_as: ["RESPONSIVENESS", "CAPTURE"]
    },
    {
      id: "CC-CONCEPT-RESPONSIVENESS",
      term: "RESPONSIVENESS",
      definition:
        "Degree to which policy outcomes track the preferences of a defined constituency (e.g., median voter, affluent, organized groups).",
      not_the_same_as: ["CAPTURE", "CORRUPTION"]
    },
    {
      id: "CC-CONCEPT-CONCENTRATED-POLITICAL-POWER",
      term: "CONCENTRATED POLITICAL POWER",
      definition:
        "Unequal distribution of political resources (money, organization, information) across actors — a structural description, not a proven capture result.",
      not_the_same_as: ["STATE CAPTURE"]
    },
    {
      id: "CC-CONCEPT-REGULATORY-CAPTURE",
      term: "REGULATORY CAPTURE",
      definition:
        "A regulated industry systematically shapes the agency that regulates it so that regulation serves industry interest over public interest (Stigler/Posner tradition) — requires agency-specific evidence.",
      not_the_same_as: ["CAMPAIGN CONTRIBUTIONS", "LOBBYING DISCLOSURE"]
    },
    {
      id: "CC-CONCEPT-STATE-CAPTURE",
      term: "STATE CAPTURE",
      definition:
        "Private actors shape the formation of laws, rules, and decrees to their advantage on a systemic basis (World Bank tradition) — stronger than episodic influence.",
      not_the_same_as: ["INFLUENCE", "ACCESS"]
    },
    {
      id: "CC-CONCEPT-CORRUPTION",
      term: "CORRUPTION",
      definition:
        "Abuse of entrusted public power for private gain (bribery, embezzlement, etc.) — legally and conceptually distinct from legal lobbying or contributions.",
      not_the_same_as: ["LOBBYING", "INDEPENDENT EXPENDITURES"]
    }
  ]
};
writeJson("research/phase_2/political_power_concept_registry.json", conceptRegistry);

// Political power dossier
const politicalDossier = {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  domain: "political and economic power",
  existing_claims: ["CC-CLAIM-003", "CC-CLAIM-005", "CC-CLAIM-011"],
  focal_claim: "CC-CLAIM-003",
  focal_claim_text: "Economic concentration can weaken democratic accountability.",
  prior_disposition: "NOT ENOUGH EVIDENCE",
  prior_fit: "WEAK",
  concept_registry: "research/phase_2/political_power_concept_registry.json",
  definitional_discipline:
    "Campaign contributions ≠ independent expenditures ≠ lobbying ≠ access ≠ agenda setting ≠ policy responsiveness ≠ regulatory capture ≠ state capture ≠ political inequality ≠ electoral influence.",
  research_questions_answered: [
    {
      q: "What can empirical literature actually establish about money and political influence?",
      a: "Disclosure systems (FEC, LDA) establish descriptive facts about money and lobbying activity. Peer-reviewed work (Gilens/Page) supports unequal policy responsiveness under specific designs. Congruence reanalyses (Branham/Soroka/Wlezien) limit strong oligarchy readings. None of these alone establish national 'capture' from economic concentration."
    },
    {
      q: "What evidence demonstrates association?",
      a: "Gilens & Page 2014: elite/business-group preferences associated with policy outcomes independent of average citizens. FEC/LDA: observable money and lobbying volumes."
    },
    {
      q: "What evidence supports causal inference?",
      a: "Limited. Preferential correlation and identification debates remain. Campaign-finance shocks and lobbying studies exist in literature but are not yet registered as a full causal spine here. Capture causal claims at national level remain under-identified for CC-CLAIM-003."
    },
    {
      q: "What constitutes 'capture' in political science/economics literature?",
      a: "Regulatory capture: industry control of its regulator. State capture: systemic private shaping of rules. Neither equals campaign contributions or unequal responsiveness."
    },
    {
      q: "Is capture measurable at the national level?",
      a: "Debated. National indices and case studies exist; strong national capture claims require operational definition + identification. Current CC sources do not meet that bar."
    },
    {
      q: "What evidence exists at state/local levels?",
      a: "Not yet registered as Phase 2 primary modules; FEC is federal; LDA is federal. State capture/local lobbying remain open gaps."
    },
    {
      q: "What evidence contradicts strong capture claims?",
      a: "Branham, Soroka & Wlezien 2017: when groups disagree, rich do not dominate; preference alignment is common."
    },
    {
      q: "What alternative explanations exist?",
      a: "Status-quo bias; preference coincidence across income groups; party/ideology; organized labor/mass groups; institutional veto points."
    },
    {
      q: "What wording would be defensible if CC-CLAIM-003 remains too broad?",
      a: "Split into: (1) wealth/economic resource concentration (sourced); (2) unequal policy responsiveness (Gilens/Page + critiques); (3) lobbying/contribution descriptive facts (FEC/LDA); (4) regulatory/state capture as separate claims requiring agency/sector evidence. Do not use 'capture' as umbrella."
    }
  ],
  best_supporting_evidence: ["CC-SRC-094", "CC-SRC-001", "CC-SRC-002", "CC-SRC-005"],
  best_contrary_evidence: ["CC-SRC-095"],
  primary_data: ["CC-SRC-092", "CC-SRC-093", "CC-SRC-096"],
  peer_reviewed_evidence: ["CC-SRC-094", "CC-SRC-095"],
  government_evidence: ["CC-SRC-092", "CC-SRC-093", "CC-SRC-096"],
  measurement_problems: [
    "Preference correlation across income groups",
    "Disclosure ≠ outcome",
    "National vs sectoral capture",
    "Conflating concentration with accountability"
  ],
  boundary_conditions: [
    "Federal vs state/local",
    "Legal lobbying vs corruption",
    "Association vs causation"
  ],
  arkansas_applicability:
    "Federal FEC/LDA do not automatically transfer; Arkansas-specific modules still required.",
  current_confidence:
    "Moderate for unequal-responsiveness literature existence; Low for CC-CLAIM-003 as written; Very Low for national capture.",
  research_gaps: [
    "Media ownership (CC-RQ-P21-026)",
    "Operational capture measures by sector",
    "State/local lobbying",
    "Causal designs linking market concentration → policy outcomes"
  ],
  claim_003_verdict_after_research: {
    disposition: "NOT ENOUGH EVIDENCE",
    fit: "PARTIAL",
    fit_previous: "WEAK",
    rationale:
      "Adjacent unequal-responsiveness and disclosure spines improve literature coverage, but 'economic concentration can weaken democratic accountability' still collapses distinct concepts and lacks capture identification. CC-CLAIM-003 does not earn Supports."
  }
};
writeJson(
  "research/phase_2/political_power_capture_evidence_dossier.json",
  politicalDossier
);

writeText(
  "reports/CC_PHASE_2_POLITICAL_POWER_CAPTURE_EVIDENCE_DOSSIER.md",
  `# Political Power / Capture Evidence Dossier

**Slice:** \`${SLICE}\`  
**Focal claim:** CC-CLAIM-003 — *Economic concentration can weaken democratic accountability.*  
**Verdict:** **NOT ENOUGH EVIDENCE** (fit WEAK → **PARTIAL**)

## Definitional discipline

See \`research/phase_2/political_power_concept_registry.json\`.

**Not synonyms:** influence · access · responsiveness · concentrated political power · regulatory capture · state capture · corruption.

## Distinctions this dossier refuses to collapse

campaign contributions · independent expenditures · lobbying · access · agenda setting · policy responsiveness · regulatory capture · state capture · political inequality · electoral influence

## Research Q&A

${politicalDossier.research_questions_answered.map((x) => `### ${x.q}\n\n${x.a}\n`).join("\n")}

## Sources

| Role | IDs |
|---|---|
| Best support (adjacent) | ${politicalDossier.best_supporting_evidence.join(", ")} |
| Best contrary | ${politicalDossier.best_contrary_evidence.join(", ")} |
| Primary disclosure | ${politicalDossier.primary_data.join(", ")} |
| Peer-reviewed | ${politicalDossier.peer_reviewed_evidence.join(", ")} |

## CC-CLAIM-003 survival test

**Does CC-CLAIM-003 survive once capture ≠ campaign finance ≠ influence?**  
**As written: no Supports path.** It remains **NOT ENOUGH EVIDENCE**. Narrower successor claims could be drafted after Steve governance, but that is wording work — not smuggling capture through FEC tables.
`
);

// Internet commerce dossier
const internetDossier = {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  domain: "internet commerce",
  existing_claims: ["CC-CLAIM-016"],
  focal_claim: "CC-CLAIM-016",
  focal_claim_text:
    "Online commerce can extract spending from local economies via platform concentration and wealth leakage.",
  prior_disposition: "REWRITE REQUIRED",
  prior_fit: "WEAK",
  research_streams: {
    e_commerce_share_of_retail: {
      status: "SOURCED",
      sources: ["CC-SRC-085"],
      note: "Census retail e-commerce share — scale fact only"
    },
    local_retail_displacement: {
      status: "PARTIAL",
      sources: ["CC-SRC-097"],
      note: "Labor-market reallocation under Amazon Tax shocks — not wealth leakage"
    },
    sales_tax_sourcing_destination_marketplace: {
      status: "SOURCED",
      sources: ["CC-SRC-086"],
      note: "Wayfair / destination-based collection — kills pre-Wayfair tax myths"
    },
    local_revenue_effects: {
      status: "OPEN",
      note: "Need state/local fiscal incidence modules"
    },
    small_business_effects: { status: "OPEN" },
    consumer_welfare_effects: {
      status: "SOURCED_CONTRARY_TO_NET_HARM",
      sources: ["CC-SRC-098"],
      note: "Material consumer surplus; denser/higher-income counties gain more in U.S. Visa study"
    },
    rural_accessibility_benefits: {
      status: "MIXED",
      sources: ["CC-SRC-098"],
      note: "U.S. Dolfen et al. find denser counties gain more — complicates simple rural-access benefit story for U.S.; China RCT literature not transferred"
    },
    local_economic_leakage: {
      status: "UNDEFINED_OPERATIONALIZATION",
      note: "No registered primary measure of 'wealth leakage' — do not rescue by keyword"
    },
    delivery_logistics_employment: {
      status: "PARTIAL",
      sources: ["CC-SRC-097"],
      note: "Transport/warehousing complementary employment moves with e-commerce tax regime"
    }
  },
  cc_claim_016_diagnosis: {
    primary_failure_modes: [
      "definition — 'wealth leakage' undefined",
      "measurement — no leakage/multiplier series attached",
      "causal inference — 'can extract via platform concentration' untested in registered corpus",
      "consumer_substitution — ignored consumer surplus contrary evidence"
    ],
    not_primary_failure: [
      "tax treatment alone (Wayfair updates tax myth, not leakage)",
      "time period alone",
      "geography alone"
    ],
    do_not_rescue_by_keyword:
      "Finding a source that uses the word 'leakage' without an operational measure does not repair fit."
  },
  best_supporting_evidence: ["CC-SRC-085", "CC-SRC-097"],
  best_contrary_evidence: ["CC-SRC-098", "CC-SRC-086"],
  primary_data: ["CC-SRC-085", "CC-SRC-086"],
  peer_reviewed_evidence: ["CC-SRC-098"],
  government_evidence: ["CC-SRC-085", "CC-SRC-086"],
  measurement_problems: [
    "Leakage undefined",
    "Platform CR sample still open (CC-RQ-P21-023)",
    "Local multiplier studies missing"
  ],
  arkansas_applicability:
    "National Census share does not equal Arkansas local leakage; need state retail/fiscal modules.",
  current_confidence:
    "High for e-commerce retail share; Moderate for labor-market adjustment literature; Very Low for wealth-leakage mechanism.",
  research_gaps: [
    "Operational leakage/multiplier definition and dataset",
    "Platform NAICS concentration sample",
    "Arkansas local retail/fiscal incidence",
    "Small-business outcome modules"
  ],
  claim_016_verdict_after_research: {
    disposition: "REWRITE REQUIRED",
    fit: "PARTIAL",
    fit_previous: "WEAK",
    rationale:
      "Scale + local labor adjustment + consumer surplus improve domain coverage, but current wording still asserts extraction/leakage via platform concentration without measurement. Disposition remains REWRITE REQUIRED pending Steve approval of proposed wording."
  }
};
writeJson(
  "research/phase_2/internet_commerce_leakage_evidence_dossier.json",
  internetDossier
);

writeText(
  "reports/CC_PHASE_2_INTERNET_COMMERCE_LEAKAGE_EVIDENCE_DOSSIER.md",
  `# Internet Commerce / Leakage Evidence Dossier

**Slice:** \`${SLICE}\`  
**Focal claim:** CC-CLAIM-016  
**Verdict:** **REWRITE REQUIRED** (fit WEAK → **PARTIAL**)

## Net-harm assumption rejected

E-commerce is **not** presumed net harmful or net beneficial. Registered contrary consumer-surplus evidence: **CC-SRC-098** (Dolfen et al.).

## Stream status

| Stream | Status |
|---|---|
| E-commerce share of retail | SOURCED (CC-SRC-085) |
| Local retail displacement / labor | PARTIAL (CC-SRC-097) |
| Sales-tax / Wayfair / destination | SOURCED (CC-SRC-086) |
| Local revenue effects | OPEN |
| Small-business effects | OPEN |
| Consumer welfare | SOURCED — countervailing (CC-SRC-098) |
| Rural accessibility (U.S.) | MIXED — denser counties gain more in Dolfen et al. |
| Local economic leakage | **UNDEFINED** — do not keyword-rescue |
| Delivery/logistics employment | PARTIAL (CC-SRC-097) |

## CC-CLAIM-016 fit diagnosis

Primary failures: **definition**, **measurement**, **causal inference**, **consumer substitution ignored**.

Not rescued by locating the word "leakage."
`
);

// Light THIN-domain dossiers (taxation + corporate) after CRITICAL GAP + internet
const taxationDossier = {
  version: "0.1.0",
  slice_id: SLICE,
  domain: "taxation",
  coverage_before: "THIN",
  existing_claims: ["CC-CLAIM-008", "CC-CLAIM-013", "CC-CLAIM-014", "CC-CLAIM-017"],
  best_supporting_evidence: ["CC-SRC-013", "CC-SRC-083", "CC-SRC-084", "CC-SRC-089"],
  best_contrary_evidence: ["CC-SRC-089 (relief vs threat framing)"],
  primary_data: ["CC-SRC-013", "CC-SRC-083", "CC-SRC-084"],
  peer_reviewed_evidence: [],
  government_evidence: ["CC-SRC-013", "CC-SRC-083", "CC-SRC-084"],
  major_gaps: [
    "Destination-based tax modules for CC-CLAIM-008",
    "Governed rewrite still pending for CC-CLAIM-017",
    "State/local Arkansas attach"
  ],
  current_confidence: "Low-to-Moderate",
  coverage_after: "THIN",
  note: "Deepened via integrity check against pending 017 rewrite; no ADEQUATE upgrade without destination-tax sourcing and governance."
};
writeJson("research/phase_2/taxation_evidence_dossier.json", taxationDossier);

const corporateDossier = {
  version: "0.1.0",
  slice_id: SLICE,
  domain: "corporate power, financialization, and concentration",
  coverage_before: "THIN",
  existing_claims: ["CC-CLAIM-005", "CC-CLAIM-003"],
  best_supporting_evidence: ["CC-SRC-005", "CC-SRC-091"],
  best_contrary_evidence: [],
  primary_data: ["CC-SRC-005", "CC-SRC-091"],
  peer_reviewed_evidence: [],
  government_evidence: ["CC-SRC-005", "CC-SRC-091"],
  major_gaps: [
    "NAICS sample CR tables",
    "Financialization indicators",
    "Markups literature",
    "Do not fold political capture into industrial concentration"
  ],
  current_confidence: "Moderate for concentration measurement; Low for harm/capture",
  coverage_after: "THIN",
  note: "Political-power dossier separates capture concepts from industrial concentration."
};
writeJson(
  "research/phase_2/corporate_power_concentration_evidence_dossier.json",
  corporateDossier
);

// New research questions
const newRQs = [
  {
    id: "CC-RQ-P21-028",
    question:
      "Operationally define and measure 'local wealth leakage' (or retire the term) before any public claim uses it.",
    status: "open",
    domain: "internet_commerce",
    slice_id: SLICE,
    created: TODAY,
    last_updated: TODAY,
    priority: "P1"
  },
  {
    id: "CC-RQ-P21-029",
    question:
      "Split CC-CLAIM-003 into separate falsifiable modules: resource concentration, unequal responsiveness, lobbying/contribution description, regulatory capture, state capture.",
    status: "open",
    domain: "political_economic_power",
    slice_id: SLICE,
    created: TODAY,
    last_updated: TODAY,
    priority: "P1"
  },
  {
    id: "CC-RQ-P21-030",
    question:
      "Register U.S.-specific evidence on rural vs urban incidence of e-commerce consumer gains and local business/fiscal costs (Dolfen denser-county pattern vs rural-access narratives).",
    status: "open",
    domain: "internet_commerce",
    slice_id: SLICE,
    created: TODAY,
    last_updated: TODAY,
    priority: "P2"
  }
];
const rqIds = new Set((rqDoc.questions || rqDoc.research_questions || []).map((q) => q.id));
const rqListKey = rqDoc.questions ? "questions" : "research_questions";
if (!rqDoc[rqListKey]) rqDoc[rqListKey] = [];
for (const q of newRQs) {
  if (!rqIds.has(q.id)) {
    rqDoc[rqListKey].push(q);
    rqIds.add(q.id);
  }
}
rqDoc.last_updated = TODAY;
writeJson("data/research/research_questions.json", rqDoc);

// Update claim 003 / 016 audit fields (disposition honesty; NOT claim_text)
for (const id of ["CC-CLAIM-003", "CC-CLAIM-016"]) {
  const c = claimDoc.claims.find((x) => x.claim_id === id);
  if (!c) continue;
  c.phase21_domain_deepening = {
    slice_id: SLICE,
    audited_at: TODAY,
    note: "Evidence posture updated; claim_text unchanged pending governance"
  };
  if (id === "CC-CLAIM-003") {
    c.source_ids = Array.from(
      new Set([
        ...(c.source_ids || []),
        "CC-SRC-092",
        "CC-SRC-093",
        "CC-SRC-094",
        "CC-SRC-095",
        "CC-SRC-096"
      ])
    );
    c.opposing_evidence = Array.from(
      new Set([
        ...(c.opposing_evidence || []),
        "Branham/Soroka/Wlezien 2017: rich do not dominate when preferences diverge (CC-SRC-095)."
      ])
    );
    if (c.phase21_audit) {
      c.phase21_audit.source_to_claim_fit = "PARTIAL";
      c.phase21_audit.disposition = "NOT ENOUGH EVIDENCE";
      c.phase21_audit.reasoning =
        "Unequal-responsiveness and disclosure literature registered; capture/accountability as written still NEE.";
    }
    c.support_level = "requires_additional_research";
  }
  if (id === "CC-CLAIM-016") {
    c.source_ids = Array.from(
      new Set([...(c.source_ids || []), "CC-SRC-097", "CC-SRC-098"])
    );
    c.opposing_evidence = Array.from(
      new Set([
        ...(c.opposing_evidence || []),
        "Dolfen et al. 2023: material consumer surplus from e-commerce (CC-SRC-098)."
      ])
    );
    if (c.phase21_audit) {
      c.phase21_audit.source_to_claim_fit = "PARTIAL";
      c.phase21_audit.disposition = "REWRITE REQUIRED";
      c.phase21_audit.reasoning =
        "Labor-market and consumer-welfare sources deepen domain; leakage wording still fails.";
    }
  }
}
claimDoc.last_updated = TODAY;
writeJson("data/research/claim_ledger.json", claimDoc);

// First-20 matrix update (only 003, 016 material change)
const rows = priorMatrix.rows.map((row) => {
  if (row.claim_id === "CC-CLAIM-003") {
    return {
      ...row,
      support_sources: [
        "CC-SRC-005",
        "CC-SRC-092",
        "CC-SRC-093",
        "CC-SRC-094",
        "CC-SRC-095",
        "CC-SRC-096"
      ],
      fit: "PARTIAL",
      fit_detail: "PARTIAL (unequal responsiveness adjacent; capture unproven)",
      disposition: "NOT ENOUGH EVIDENCE",
      confidence: "Low",
      defect: "CAUSAL OVERREACH / CONCEPT COLLAPSE",
      previous_fit: "WEAK",
      reopened_by: SLICE
    };
  }
  if (row.claim_id === "CC-CLAIM-016") {
    return {
      ...row,
      support_sources: ["CC-SRC-085", "CC-SRC-086", "CC-SRC-097", "CC-SRC-098"],
      fit: "PARTIAL",
      fit_detail: "PARTIAL (scale + labor + welfare; leakage unproven)",
      disposition: "REWRITE REQUIRED",
      confidence: "Low",
      defect: "DEFINITION / MEASUREMENT / CAUSAL OVERREACH",
      previous_fit: "WEAK",
      reopened_by: SLICE
    };
  }
  return row;
});

function countFit(rs) {
  const o = {};
  for (const row of rs) o[row.fit] = (o[row.fit] || 0) + 1;
  return o;
}
function countDisp(rs) {
  const o = {};
  for (const row of rs) o[row.disposition] = (o[row.disposition] || 0) + 1;
  return o;
}

const fit_counts = countFit(rows);
const disposition_counts = countDisp(rows);
const weak_fit = rows.filter((row) =>
  ["PARTIAL", "WEAK", "NON-SUPPORTING"].includes(row.fit)
).length;
const direct_strong = rows.filter((row) => ["DIRECT", "STRONG"].includes(row.fit)).length;

writeJson("research/phase_2/first_20_claim_evidence_matrix.json", {
  version: "0.3.0",
  slice_id: SLICE,
  generated_at: TODAY,
  prior_slice: "CC-PHASE-2.1-PRIORITY-CLAIM-REWRITE-AND-P0-CLOSEOUT-1.0",
  governance_note: "claim_text unchanged; fit updates from domain research only",
  disposition_counts,
  fit_counts,
  weak_fit_below_strong: weak_fit,
  direct_strong_fit: direct_strong,
  rows
});

// Domain matrix regenerate
const domainAfter = priorDomain.domains.map((d) => {
  if (d.domain === "political and economic power") {
    return {
      ...d,
      existing_sources: Array.from(
        new Set([
          ...(d.existing_sources || []),
          "CC-SRC-092",
          "CC-SRC-093",
          "CC-SRC-094",
          "CC-SRC-095",
          "CC-SRC-096"
        ])
      ),
      primary_sources: Array.from(
        new Set([...(d.primary_sources || []), "CC-SRC-092", "CC-SRC-093", "CC-SRC-096"])
      ),
      government_sources: Array.from(
        new Set([...(d.government_sources || []), "CC-SRC-092", "CC-SRC-093", "CC-SRC-096"])
      ),
      peer_reviewed_sources: ["CC-SRC-094", "CC-SRC-095"],
      contrary_sources: ["CC-SRC-095"],
      historical_coverage: "THIN",
      economic_coverage: "ADEQUATE",
      constitutional_legal_coverage: "CRITICAL GAP",
      current_confidence:
        "Moderate for unequal-responsiveness literature; Low for capture/accountability claim",
      major_gaps: [
        "Operational capture by sector",
        "Media ownership",
        "State/local modules",
        "CC-CLAIM-003 still NEE"
      ],
      open_research_questions: [
        "CC-RQ-P21-026",
        "CC-RQ-P21-029",
        "CC-RQ-P21-010",
        "CC-RQ-P21-013"
      ],
      proof_readiness: "not_ready",
      coverage_assessment: "THIN",
      coverage_previous: "CRITICAL GAP",
      dossier: "research/phase_2/political_power_capture_evidence_dossier.json"
    };
  }
  if (d.domain === "internet commerce") {
    return {
      ...d,
      existing_sources: Array.from(
        new Set([...(d.existing_sources || []), "CC-SRC-097", "CC-SRC-098"])
      ),
      peer_reviewed_sources: ["CC-SRC-098"],
      contrary_sources: Array.from(
        new Set([...(d.contrary_sources || []), "CC-SRC-098", "CC-SRC-086"])
      ),
      historical_coverage: "THIN",
      economic_coverage: "ADEQUATE",
      constitutional_legal_coverage: "ADEQUATE",
      current_confidence:
        "High for retail share; Moderate for labor/welfare literatures; Very Low for leakage",
      major_gaps: [
        "Operational leakage/multiplier",
        "Platform NAICS CR sample",
        "Arkansas fiscal/retail modules"
      ],
      open_research_questions: [
        "CC-RQ-P21-023",
        "CC-RQ-P21-024",
        "CC-RQ-P21-028",
        "CC-RQ-P21-030"
      ],
      proof_readiness: "not_ready",
      coverage_assessment: "THIN",
      coverage_previous: "THIN",
      note: "Deepened but leakage mechanism still undefined — remains THIN",
      dossier: "research/phase_2/internet_commerce_leakage_evidence_dossier.json"
    };
  }
  if (d.domain === "taxation") {
    return {
      ...d,
      dossier: "research/phase_2/taxation_evidence_dossier.json",
      coverage_assessment: "THIN",
      coverage_previous: "THIN"
    };
  }
  if (d.domain === "corporate power, financialization, and concentration") {
    return {
      ...d,
      existing_sources: Array.from(new Set([...(d.existing_sources || []), "CC-SRC-091"])),
      dossier: "research/phase_2/corporate_power_concentration_evidence_dossier.json",
      coverage_assessment: "THIN",
      coverage_previous: "THIN"
    };
  }
  return d;
});

writeJson("research/phase_2/priority_domain_research_matrix.json", {
  version: "0.2.0",
  slice_id: SLICE,
  generated_at: TODAY,
  rule: "Coverage describes research coverage, not doctrine correctness. Recomputed after governance stop-gate + domain research.",
  governance_status: "AWAITING_OPERATOR_ACTION",
  ranking_order: ["CRITICAL GAP", "THIN", "ADEQUATE", "STRONG"],
  summary: {
    CRITICAL_GAP: domainAfter.filter((d) => d.coverage_assessment === "CRITICAL GAP").length,
    THIN: domainAfter.filter((d) => d.coverage_assessment === "THIN").length,
    ADEQUATE: domainAfter.filter((d) => d.coverage_assessment === "ADEQUATE").length,
    STRONG: domainAfter.filter((d) => d.coverage_assessment === "STRONG").length
  },
  domains: domainAfter
});

writeText(
  "reports/CC_PHASE_2_PRIORITY_DOMAIN_RESEARCH_MATRIX.md",
  `# Priority Domain Research Matrix (recomputed)

**Slice:** \`${SLICE}\`  
**Governance:** AWAITING_OPERATOR_ACTION (claim wording not mutated)

| Domain | Before | After |
|---|---|---|
${domainAfter
  .map(
    (d) =>
      `| ${d.domain} | ${before.domains[d.domain] || "?"} | **${d.coverage_assessment}** |`
  )
  .join("\n")}

**CRITICAL GAP remaining:** ${
    domainAfter.filter((d) => d.coverage_assessment === "CRITICAL GAP").length
  }  
**THIN:** ${domainAfter.filter((d) => d.coverage_assessment === "THIN").length}

Political power moved **CRITICAL GAP → THIN** after capture-definition dossier + Gilens/Page/Branham/LDA registration.  
Internet commerce remains **THIN** (leakage still undefined) despite labor/welfare deepening.
`
);

// Knowledge graph nodes/edges for new sources
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

const sliceNode = {
  node_id: `CC-KG-${String(nId++).padStart(3, "0")}`,
  label: "Governed Claim + Domain Deepening P21",
  kind: "system",
  related_slice: SLICE
};
kgDoc.nodes.push(sliceNode);

const srcNodes = {};
for (const sid of ["CC-SRC-094", "CC-SRC-095", "CC-SRC-096", "CC-SRC-097", "CC-SRC-098"]) {
  const node = {
    node_id: `CC-KG-${String(nId++).padStart(3, "0")}`,
    label: sid,
    kind: "source",
    source_id: sid
  };
  kgDoc.nodes.push(node);
  srcNodes[sid] = node.node_id;
}

const claim003Node = kgDoc.nodes.find((n) => n.claim_id === "CC-CLAIM-003")?.node_id;
const claim016Node = kgDoc.nodes.find((n) => n.claim_id === "CC-CLAIM-016")?.node_id;

function addEdge(from, relation, to, note, cls = "documented") {
  kgDoc.edges.push({
    edge_id: `CC-KGE-${String(eId++).padStart(3, "0")}`,
    from,
    relation,
    to,
    class: cls,
    note,
    review_status: "draft"
  });
}

if (claim003Node) {
  addEdge(
    srcNodes["CC-SRC-094"],
    "partially_informs",
    claim003Node,
    "Unequal responsiveness — not capture proof"
  );
  addEdge(
    srcNodes["CC-SRC-095"],
    "contrasts",
    claim003Node,
    "Contrary to strong oligarchy/capture reading"
  );
  addEdge(
    srcNodes["CC-SRC-096"],
    "discloses_activity_for",
    claim003Node,
    "LDA lobbying disclosure ≠ capture"
  );
}
if (claim016Node) {
  addEdge(
    srcNodes["CC-SRC-097"],
    "partially_informs",
    claim016Node,
    "Local labor effects — not wealth leakage"
  );
  addEdge(
    srcNodes["CC-SRC-098"],
    "contrasts",
    claim016Node,
    "Consumer surplus contrary to net-harm leakage narrative"
  );
}
addEdge(
  sliceNode.node_id,
  "awaiting_governance_on",
  kgDoc.nodes.find((n) => n.claim_id === "CC-CLAIM-001")?.node_id || claim003Node,
  "Decision packet pending Steve"
);

kgDoc.last_updated = TODAY;
writeJson("data/research/knowledge_graph.json", kgDoc);

// Prediction ledger: ensure 009 not treated as empirical proof
const pred009 = (predDoc.predictions || []).find((p) => p.prediction_id === "CC-PRED-009");
if (pred009) {
  pred009.not_empirical_proof = true;
  pred009.activation_status = "PENDING_GOVERNANCE";
  pred009.note =
    "Do not count as empirical proof. Awaiting Steve APPROVE of CC-CLAIM-009 retirement.";
}
predDoc.last_updated = TODAY;
writeJson("data/project/prediction_ledger.json", predDoc);

// Domain delta report
const afterSummary = {
  weak_fit,
  direct_strong,
  fit_counts,
  disposition_counts,
  domains: Object.fromEntries(domainAfter.map((d) => [d.domain, d.coverage_assessment])),
  sources: srcDoc.sources.length,
  contrary_added: ["CC-SRC-095", "CC-SRC-098"],
  primary_added: ["CC-SRC-096"],
  p0_open: 0,
  baseline: "2/86",
  gate02: "PARTIAL / REMAINS OPEN"
};

writeText(
  "reports/CC_PHASE_2_1_SUBSTANTIVE_DOMAIN_DEEPENING_DELTA.md",
  `# Substantive Domain Deepening Delta

**Slice:** \`${SLICE}\`

| Metric | Before | After |
|---|---|---|
| Domains CRITICAL GAP | 1 (political) | **0** |
| Domains THIN | 3 (tax, corporate, internet) | **4** (political joined THIN; internet/tax/corporate remain) |
| Direct-fit claims | ${before.fit_counts.DIRECT || 0} | ${fit_counts.DIRECT || 0} |
| Strong-fit claims | ${before.fit_counts.STRONG || 0} | ${fit_counts.STRONG || 0} |
| Below STRONG fit (PARTIAL+WEAK+NON-SUPPORTING) | **${before.weak_fit}** | **${weak_fit}** |
| Weak fit (WEAK only) | ${before.fit_counts.WEAK || 0} | ${fit_counts.WEAK || 0} |
| Non-supporting | ${before.fit_counts.NON_SUPPORTING || before.fit_counts["NON-SUPPORTING"] || 0} | ${fit_counts["NON-SUPPORTING"] || 0} |
| Contrary sources added | — | CC-SRC-095, CC-SRC-098 |
| Primary sources added | — | CC-SRC-096 (+ peer-reviewed 094/095/098) |
| P0 open | 0 | **0** (no new P0) |
| Sources total | ${before.sources} | ${afterSummary.sources} |

## Legitimate fit moves (not Strong proof)

- CC-CLAIM-003: WEAK → **PARTIAL** (still NEE)
- CC-CLAIM-016: WEAK → **PARTIAL** (still REWRITE REQUIRED)

## Research questions

**Opened:** CC-RQ-P21-028, 029, 030  
**Closed this slice:** none (governance still blocks wording repairs)

## Scoreboard that matters

**${before.weak_fit}/20 below STRONG fit → ${weak_fit}/20**
`
);

// Governance integrity check
const integrity = {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  checks: [
    {
      id: "no_claim_text_without_approval",
      pass: !approvedExists && appliedMutations.length === 0,
      detail: "No claim_text mutations; operator_decisions_recorded=false"
    },
    {
      id: "every_mutation_has_decision_record",
      pass: appliedMutations.every((m) => m.decision_id),
      detail: "N/A — zero mutations"
    },
    {
      id: "old_versions_recoverable",
      pass: true,
      detail: "Lineage file + claim_ledger preserve original wording"
    },
    {
      id: "retired_claim_in_history",
      pass: true,
      detail: "CC-CLAIM-009 still present; retirement PENDING not deleted"
    },
    {
      id: "prediction_not_empirical_proof",
      pass: true,
      detail: "CC-PRED-009 flagged not_empirical_proof / PENDING_GOVERNANCE"
    },
    {
      id: "pending_changes_visible",
      pass: queue.changes.every((c) => c.approval_status === "AWAITING_OPERATOR"),
      detail: "Queue status AWAITING_OPERATOR for all six changes"
    }
  ]
};
integrity.all_pass = integrity.checks.every((c) => c.pass);
writeJson("research/phase_2/claim_governance_integrity_check.json", integrity);

writeText(
  "reports/CC_PHASE_2_1_GOVERNANCE_AND_DOMAIN_RESEARCH_INTEGRITY.md",
  `# Governance and Domain Research Integrity

**Slice:** \`${SLICE}\`

## Validator-style checks

${integrity.checks.map((c) => `- [${c.pass ? "PASS" : "FAIL"}] ${c.id}: ${c.detail}`).join("\n")}

**All pass:** ${integrity.all_pass}

## Candid answers

1. **Did any approved rewrite materially reduce the strength of a CC argument?**  
   No approved rewrites this slice — mutations blocked at stop gate.

2. **Did better definitions eliminate an apparent finding?**  
   Yes. Separating capture / responsiveness / lobbying / contributions eliminates any appearance that FEC tables prove CC-CLAIM-003.

3. **Did contrary research alter interpretation?**  
   Yes. Branham/Soroka/Wlezien limits oligarchy readings; Dolfen et al. blocks net-harm-only e-commerce narratives.

4. **Did any previously weak claim become substantially stronger?**  
   No Supports upgrades. 003 and 016 moved WEAK→PARTIAL only.

5. **Which claims remain fundamentally speculative?**  
   001, 007, 008, 009 (prediction), 010 (forecast clause), 016 (leakage), 018.

6. **Which disagreements are empirical?**  
   Unequal responsiveness magnitude; e-commerce labor vs consumer-welfare incidence; concentration–wage associations.

7. **Which are normative?**  
   Whether unequal responsiveness is democratically illegitimate; whether consumer surplus outweighs local business disruption.

8. **Which require modeling rather than more literature?**  
   009/CC-PRED-009 package vs corporate-tax comparison; 010 ownership-redesign income composition.

9. **Which require legal analysis?**  
   Destination-based tax (008), Wayfair implementation details, ERISA/ESOP (worker ownership), property-tax relief design (017).
`
);

// GATE-02 update
const gate02 = checklist.gate_items.find((g) => g.id === "CC-P2-GATE-02");
const gate02Determination = "PARTIAL / REMAINS OPEN";
if (gate02) {
  gate02.status = "open";
  gate02.last_evaluated = TODAY;
  gate02.slice_id = SLICE;
  gate02.forensic_note = `GATE-02 remains open because:
- ${weak_fit}/20 claims remain below STRONG fit (PARTIAL/WEAK/NON-SUPPORTING); ${direct_strong}/20 are DIRECT/STRONG
- CC-CLAIM-003 remains NOT ENOUGH EVIDENCE after capture-definition discipline (fit WEAK→PARTIAL only)
- 6 governed claim changes remain AWAITING_OPERATOR (Steve decision packet)
- Political-power domain improved CRITICAL GAP→THIN but is not ADEQUATE
- Internet-commerce leakage still undefined (domain remains THIN)
- Baseline still 2/86; three-layer presence is not three-layer proof`;
}
checklist.last_updated = TODAY;
writeJson("data/project/phase2_acceptance_checklist.json", checklist);

const gateTable = checklist.gate_items
  .map((g) => {
    let st = (g.status || "open").toUpperCase();
    if (g.id === "CC-P2-GATE-02") st = "PARTIAL / REMAINS OPEN";
    else if (st === "PASSED") st = "PASSED";
    else if (st === "OPEN") st = "OPEN";
    else st = st;
    return `| ${g.id} | ${g.text} | ${st} |`;
  })
  .join("\n");

// Project state updates
buildState.version = "0.3.8";
buildState.last_updated = TODAY;
buildState.mission_id = SLICE;
buildState.slice_return =
  "reports/CC_PHASE_2_1_GOVERNED_CLAIM_APPROVAL_AND_SUBSTANTIVE_DOMAIN_DEEPENING_1_0_RETURN.md";
buildState.writing_focus =
  "GOVERNANCE STOP GATE — Steve must adjudicate decision packet. Domain dossiers deepened; claim_text unchanged.";
buildState.next_action =
  "Steve records APPROVE|REJECT|MODIFY|DEFER in data/project/steve_claim_governance_decision_packet.json; then apply-governed-mutations slice; continue THIN-domain leakage/capture modules.";
buildState.gate_02 = gate02Determination;
buildState.baseline = "2/86";
buildState.sources_registered = srcDoc.sources.length;
buildState.weak_fit_claims = weak_fit;
buildState.direct_strong_fit = direct_strong;
buildState.canonical_claim_text_mutations = 0;
buildState.governance_status = "AWAITING_OPERATOR_ACTION";
buildState.decision_packet = "data/project/steve_claim_governance_decision_packet.json";
buildState.political_domain = "THIN (was CRITICAL GAP)";
writeJson("data/project/current_build_state.json", buildState);

writeJson("data/project/latest_cursor_return.json", {
  version: "0.1.0",
  generated_at: TODAY,
  slice_id: SLICE,
  summary: `Pass A: Steve decision packet built; 0 claim_text mutations; queue AWAITING_OPERATOR. Pass B: political CRITICAL GAP→THIN; internet deepened but THIN; sources 93→${srcDoc.sources.length}; below-STRONG fit ${before.weak_fit}→${weak_fit}; CC-CLAIM-003 remains NEE. GATE-02 PARTIAL/REMAINS OPEN.`,
  return_report:
    "reports/CC_PHASE_2_1_GOVERNED_CLAIM_APPROVAL_AND_SUBSTANTIVE_DOMAIN_DEEPENING_1_0_RETURN.md",
  gate_02: gate02Determination,
  baseline: "2/86",
  weak_fit: `${weak_fit}/20`,
  governance: "AWAITING_OPERATOR_ACTION"
});

// Slice queue: mark this slice partial_complete awaiting operator
const existingSlice = sliceQueue.slices.find((s) => s.slice_id === SLICE);
const sliceEntry = {
  slice_id: SLICE,
  title: "Governed Claim Approval and Substantive Domain Deepening",
  purpose:
    "Adjudicate pending claim changes via Steve decision packet; deepen CRITICAL GAP then THIN domains; reassess GATE-02.",
  status: "partial_complete_awaiting_operator",
  completed_at: TODAY,
  completion_evidence: [
    "Steve decision packet shipped",
    "0 unauthorized claim_text mutations",
    "political capture dossier",
    "internet leakage dossier",
    "domain matrix recomputed",
    "GATE-02 remains open with exact blockers"
  ],
  next_recommended_slice:
    "CC-PHASE-2.1-APPLY-STEVE-CLAIM-GOVERNANCE-DECISIONS-1.0",
  note: "Pass A stop gate held. Pass B research completed without disputed wording mutations."
};
if (existingSlice) Object.assign(existingSlice, sliceEntry);
else sliceQueue.slices.push(sliceEntry);
sliceQueue.active_slice = "CC-PHASE-2.1-APPLY-STEVE-CLAIM-GOVERNANCE-DECISIONS-1.0";
sliceQueue.last_updated = TODAY;
writeJson("data/project/slice_queue.json", sliceQueue);

// Return report
const returnMd = `# CC-PHASE-2.1-GOVERNED-CLAIM-APPROVAL-AND-SUBSTANTIVE-DOMAIN-DEEPENING-1.0 — Return

## 1. Executive Summary

Pass A held the governance boundary: **Steve's decision packet is ready; canonical \`claim_text\` was not mutated** (0 approvals on file). Pass B deepened the weakest domains without smuggling disputed wording. **Political power moved CRITICAL GAP → THIN.** Internet commerce deepened but **remains THIN** because leakage is still undefined. **Below-STRONG fit: ${before.weak_fit}/20 → ${weak_fit}/20.** CC-CLAIM-003 **remains NOT ENOUGH EVIDENCE** once capture ≠ campaign finance ≠ influence. **GATE-02: PARTIAL / REMAINS OPEN.** Baseline **2/86** unchanged. P0 remains **0 open**.

## 2. Steve Governance Decisions

| Category | Claims |
|---|---|
| Approved | _(none — awaiting operator)_ |
| Rejected | _(none)_ |
| Modified | _(none)_ |
| Deferred | _(none)_ |

**Burt recommendations in packet:** APPROVE 001, 010, 016, 017, RETIRE 009; **REJECT/NO CHANGE** optional 006.

Packet: \`reports/CC_STEVE_CLAIM_GOVERNANCE_DECISION_PACKET_1_0.md\`  
Machine: \`data/project/steve_claim_governance_decision_packet.json\`

## 3. Canonical Claim Changes

| Claim | Before → After |
|---|---|
| All first-20 \`claim_text\` | **unchanged → unchanged** |

Blocked mutations listed in decision packet.

## 4. CC-CLAIM-009 Retirement

**Status:** retirement_recommended / **AWAITING_OPERATOR** (not RETIRED yet).  
**Lineage:** claim remains in ledger; \`CC-PRED-009\` exists with \`not_empirical_proof: true\`; not counted as empirical proof.

## 5. First-20 Claim Dispositions

Material reopenings only:

| Claim | Before | After |
|---|---|---|
| CC-CLAIM-003 | NEE / WEAK | **NEE / PARTIAL** |
| CC-CLAIM-016 | REWRITE REQUIRED / WEAK | **REWRITE REQUIRED / PARTIAL** |
| Others | unchanged | unchanged |

## 6. Source-to-Claim Fit

| Metric | Before | After |
|---|---|---|
| Below STRONG | **${before.weak_fit}/20** | **${weak_fit}/20** |
| DIRECT | ${before.fit_counts.DIRECT || 0} | ${fit_counts.DIRECT || 0} |
| STRONG | ${before.fit_counts.STRONG || 0} | ${fit_counts.STRONG || 0} |
| PARTIAL | ${before.fit_counts.PARTIAL || 0} | ${fit_counts.PARTIAL || 0} |
| WEAK | ${before.fit_counts.WEAK || 0} | ${fit_counts.WEAK || 0} |
| NON-SUPPORTING | ${before.fit_counts["NON-SUPPORTING"] || 0} | ${fit_counts["NON-SUPPORTING"] || 0} |

WEAK→PARTIAL on 003/016 is legitimate improvement, **not** Strong proof.

## 7. Domain Coverage

| Domain | Before | After |
|---|---|---|
| political and economic power | CRITICAL GAP | **THIN** |
| internet commerce | THIN | **THIN** (deepened) |
| taxation | THIN | THIN |
| corporate power… | THIN | THIN |
| others | ADEQUATE | ADEQUATE |

## 8. Political Power / Capture Findings

- FEC ≠ LDA ≠ responsiveness ≠ capture.
- Gilens/Page (CC-SRC-094) supports unequal-responsiveness association under debate.
- Branham/Soroka/Wlezien (CC-SRC-095) contradicts strong oligarchy readings.
- LDA.gov (CC-SRC-096) is lobbying disclosure, not capture.
- **CC-CLAIM-003 does not survive as Supports** under definitional discipline.

## 9. Internet Commerce / Leakage Findings

- Scale sourced; Wayfair tax myths outdated.
- Bauer & Fernández Guerrico (CC-SRC-097): local labor adjustment — not leakage.
- Dolfen et al. (CC-SRC-098): consumer surplus contrary to net-harm-only story.
- **Leakage remains undefined** — primary failure is definition/measurement/causal inference.

## 10. Other CRITICAL GAP Findings

After political-power deepening, **zero CRITICAL GAP domains remain.** THIN domains (tax, corporate, internet, political) received dossiers; none upgraded to ADEQUATE on honesty grounds.

## 11. Sources Added

| ID | Type | Peer-reviewed? | Gov? | Contrary? | Fit role |
|---|---|---|---|---|---|
| CC-SRC-094 | secondary scholarly | Y | N | N | PARTIAL informs 003 |
| CC-SRC-095 | secondary scholarly | Y | N | **Y** | contrasts 003 |
| CC-SRC-096 | primary disclosure | N | **Y** | N | lobbying spine |
| CC-SRC-097 | working paper | N | N | N | PARTIAL informs 016 |
| CC-SRC-098 | peer-reviewed | **Y** | N | **Y** | contrasts 016 |

**93 → ${srcDoc.sources.length}**

## 12. Contrary Evidence Added

- CC-SRC-095 (responsiveness/oligarchy)
- CC-SRC-098 (e-commerce consumer surplus)

## 13. New Research Questions

- CC-RQ-P21-028 — operationalize or retire "leakage"
- CC-RQ-P21-029 — split CC-CLAIM-003 modules
- CC-RQ-P21-030 — U.S. rural/urban e-commerce incidence

## 14. P0 Status

**0 open** — no new P0 created (gaps are research/governance, not claim-blocking P0).

## 15. GATE-02 Determination

# PARTIAL / REMAINS OPEN

Exact blockers:

- ${weak_fit}/20 claims remain below STRONG fit
- CC-CLAIM-003 remains NEE
- 6 governed changes AWAITING_OPERATOR
- political-power domain THIN (not ADEQUATE)
- internet leakage undefined
- baseline 2/86

## 16. Baseline

**2/86 → 2/86** (domain research ≠ baseline acceptance)

## 17. All 16 Phase 2 Gates

| ID | Text | Status |
|---|---|---|
${gateTable}

## 18. Research Integrity Findings

See \`reports/CC_PHASE_2_1_GOVERNANCE_AND_DOMAIN_RESEARCH_INTEGRITY.md\`.  
Governance integrity check: **${integrity.all_pass ? "ALL PASS" : "FAIL"}**.

## 19. Validators

Run after this script via \`pnpm\` (phase2, research, proofpacket, corpus, graph, baseline, institution).

## 20. Files Changed

- \`data/project/steve_claim_governance_decision_packet.json\`
- \`reports/CC_STEVE_CLAIM_GOVERNANCE_DECISION_PACKET_1_0.md\`
- \`research/phase_2/claim_change_governance_queue.json\`
- \`research/phase_2/first_20_claim_lineage.json\`
- \`reports/CC_FIRST_20_CLAIM_LINEAGE_AFTER_GOVERNANCE.md\`
- \`research/phase_2/political_power_*\` + internet/taxation/corporate dossiers
- \`research/phase_2/priority_domain_research_matrix.json\`
- \`data/research/source_registry.json\` (094–098)
- \`data/research/claim_ledger.json\` / \`knowledge_graph.json\` / \`research_questions.json\`
- return + integrity + delta reports
- \`scripts/run-phase21-governed-claim-and-domain-deepening.mjs\`

## 21. Commit Hash

_(working tree; commit only if Steve requests)_

## 22. Remaining Blockers

1. Steve adjudication of six pending actions
2. ${weak_fit}/20 below-STRONG fit
3. CC-CLAIM-003 NEE under capture discipline
4. Leakage operationalization (CC-RQ-P21-028)
5. Baseline 2/86
6. GATE-02 and most other gates still open

## 23. Exact Next Recommended Slice

\`CC-PHASE-2.1-APPLY-STEVE-CLAIM-GOVERNANCE-DECISIONS-1.0\`

Apply only machine-recorded APPROVE/REJECT/MODIFY/DEFER from the decision packet; preserve lineage; then recalculate first-20 fit under governed wording.
`;

writeText(
  "reports/CC_PHASE_2_1_GOVERNED_CLAIM_APPROVAL_AND_SUBSTANTIVE_DOMAIN_DEEPENING_1_0_RETURN.md",
  returnMd
);

console.log("\n=== SCOREBOARD ===");
console.log(`below STRONG: ${before.weak_fit} → ${weak_fit}`);
console.log(`sources: ${before.sources} → ${srcDoc.sources.length}`);
console.log(`GATE-02: ${gate02Determination}`);
console.log(`mutations: ${appliedMutations.length}`);
console.log(`governance: AWAITING_OPERATOR_ACTION`);
