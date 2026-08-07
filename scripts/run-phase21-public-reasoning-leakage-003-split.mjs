/**
 * CC-PHASE-2.1-THIN-DOMAIN-LEAKAGE-AND-CLAIM-003-MODULE-SPLIT-1.0
 *
 * 1) Extend CC-DEC-103 with Public Reasoning Standard (research governance, not platform)
 * 2) Backfill public reasoning for six applied claim changes
 * 3) Operationalize leakage definition; split CC-CLAIM-003 into research modules
 * 4) Re-audit honesty; GATE-02; no unauthorized claim_text mutations for 003
 */
import fs from "node:fs";
import path from "node:path";
import { r } from "./lib/paths.mjs";

const TODAY = "2026-08-07";
const SLICE =
  "CC-PHASE-2.1-THIN-DOMAIN-LEAKAGE-AND-CLAIM-003-MODULE-SPLIT-1.0";
const DECISION_ID = "CC-DEC-103";
const ADJUDICATOR = "ChatGPT";

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

const decisionsDoc = JSON.parse(fs.readFileSync(r("data/decisions/decisions.json"), "utf8"));
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
const buildState = JSON.parse(fs.readFileSync(r("data/project/current_build_state.json"), "utf8"));
const sliceQueue = JSON.parse(fs.readFileSync(r("data/project/slice_queue.json"), "utf8"));
const conceptReg = JSON.parse(
  fs.readFileSync(r("research/phase_2/political_power_concept_registry.json"), "utf8")
);

const beforeWeak = priorMatrix.weak_fit_below_strong ?? 8;
const beforeStrong = priorMatrix.direct_strong_fit ?? 11;

function claim(id) {
  return claimDoc.claims.find((c) => c.claim_id === id);
}

// ============================================================================
// 1. Extend CC-DEC-103 — Public Reasoning Standard
// ============================================================================

const prs = {
  version: "1.0.0",
  decision_id: DECISION_ID,
  slice_id: SLICE,
  generated_at: TODAY,
  status: "ACTIVE_RESEARCH_GOVERNANCE_STANDARD",
  architecture_note:
    "Public Reasoning Standard only. Not a new platform feature, doctrine expansion, or Systems Intelligence Engine build.",
  governing_idea:
    "We do not hide the places where Constitutional Capitalism fails a test. We explain the test, the problem it revealed, why we changed our conclusion, and what that change means for the rest of the system.",
  public_test:
    "Can an ordinary citizen understand why we believe this is the most responsible answer right now?",
  required_fields: [
    "what_we_originally_said",
    "what_made_us_question_it",
    "what_we_learned",
    "where_our_reasoning_was_weak",
    "what_we_now_say",
    "why_we_made_that_decision",
    "what_we_still_dont_know",
    "what_else_this_could_affect",
    "potential_secondary_effects_or_unintended_consequences",
    "what_evidence_could_change_our_mind_again",
    "skeptical_reader_question",
    "public_answer"
  ],
  triggers: [
    "Supports → Qualifies",
    "rewrite",
    "contradiction",
    "retirement",
    "prediction transfer",
    "consequential design change",
    "module split of an overbroad claim"
  ],
  placement_rule:
    "Public reasoning should eventually appear beside relevant public text — not only in research appendices.",
  adjudicator_requirement:
    "Future research-governance decisions must include a short Reason for Decision written for an intelligent citizen unfamiliar with the research architecture."
};

writeJson("research/phase_2/public_reasoning_standard.json", prs);
writeText(
  "reports/CC_PUBLIC_REASONING_STANDARD_1_0.md",
  `# Public Reasoning Standard 1.0

**Attached to:** \`${DECISION_ID}\`  
**Status:** Active research-governance standard (not new platform architecture)  
**Slice formalized:** \`${SLICE}\`

## Governing idea

> We do not hide the places where Constitutional Capitalism fails a test. We explain the test, the problem it revealed, why we changed our conclusion, and what that change means for the rest of the system.

## Public test

> Can an ordinary citizen understand why we believe this is the most responsible answer right now?

## Required fields for every material change

1. What we originally said  
2. What made us question it  
3. What we learned  
4. Where our reasoning was weak  
5. What we now say  
6. Why we made that decision  
7. What we still don't know  
8. What else in Constitutional Capitalism this could affect  
9. Potential secondary effects or unintended consequences  
10. What evidence could cause us to change our mind again  

Plus: the skeptical reader's natural next question, and a plain-language public answer.

## Why the last three matter

They prevent a glorified corrections page. They force **systems reasoning**: tradeoffs, second-order effects, and falsifiability conditions stay visible.
`
);

const dec103 = decisionsDoc.decisions.find((d) => d.decision_id === DECISION_ID);
if (dec103) {
  dec103.title =
    "Claim-governance decisions + Public Reasoning Standard (research integrity)";
  dec103.public_reasoning_standard = {
    status: "ACTIVE",
    formalized_at: TODAY,
    formalized_in_slice: SLICE,
    artifact: "research/phase_2/public_reasoning_standard.json",
    report: "reports/CC_PUBLIC_REASONING_STANDARD_1_0.md",
    extension_note:
      "Permanent scholarly rule: every material Supports→Qualifies, rewrite, contradiction, retirement, prediction transfer, or consequential design change must generate a citizen-facing public reasoning record. Not a platform feature."
  };
  if (!dec103.impact.includes("Public Reasoning Standard 1.0")) {
    dec103.impact.push("Public Reasoning Standard 1.0");
    dec103.impact.push("public_reasoning registry + backfill for CC-CHG-P21-*");
  }
  dec103.last_extended_at = TODAY;
}
decisionsDoc.last_updated = TODAY;
writeJson("data/decisions/decisions.json", decisionsDoc);

// ============================================================================
// 2. Backfill public reasoning records for six applied changes
// ============================================================================

const records = [
  {
    record_id: "CC-PR-001",
    change_id: "CC-CHG-P21-001",
    claim_id: "CC-CLAIM-001",
    change_type: "REWRITE",
    decision: "MODIFY",
    decision_id: DECISION_ID,
    adjudicator: ADJUDICATOR,
    decided_at: TODAY,
    skeptical_reader_question:
      "Why did you stop saying capitalism has produced broad prosperity across historical contexts?",
    public_answer:
      "Because that sentence treated a huge, contested historical pattern as if it were already settled. Across different periods and institutions, living standards sometimes rose under market-oriented systems and sometimes did not, and crises and unequal distribution matter. We still take the prosperity question seriously — but we will not state a strong historical conclusion until historical evidence modules earn it.",
    what_we_originally_said:
      "Capitalism has produced broad prosperity across historical contexts.",
    what_made_us_question_it:
      "A source-to-claim audit found no registered supporting sources and an unfalsifiable civilizational sweep.",
    what_we_learned:
      "An honest claim can be weaker than a persuasive slogan. Canonizing first and sourcing later creates false certainty.",
    where_our_reasoning_was_weak:
      "We collapsed diverse historical experiences into one success story without scoped evidence.",
    what_we_now_say:
      claim("CC-CLAIM-001").claim_text,
    why_we_made_that_decision:
      "Do not repair an unsupported claim by replacing it with a slightly better unsupported claim. State variation and research need until history modules exist.",
    what_we_still_dont_know:
      "Magnitude and conditions of any broad prosperity association by period, institution, crisis exposure, and distribution.",
    what_else_this_could_affect: [
      "Opening chapters and public prosperity narratives",
      "Any design that assumes market systems automatically deliver broad gains",
      "Comparative historical proof tracks"
    ],
    potential_secondary_effects_or_unintended_consequences: [
      "Readers may temporarily think Constitutional Capitalism is more skeptical of markets than it is — clarification needed: this is epistemic caution, not anti-market doctrine",
      "Partners seeking a simple prosperity slogan may feel the project is less confident"
    ],
    what_evidence_could_change_our_mind_again:
      "Scoped historical modules with primary/secondary sources showing where, when, and under what institutions market-oriented growth was associated with broad living-standard gains — and where it failed."
  },
  {
    record_id: "CC-PR-002",
    change_id: "CC-CHG-P21-005",
    claim_id: "CC-CLAIM-006",
    change_type: "REWRITE",
    decision: "MODIFY",
    decision_id: DECISION_ID,
    adjudicator: ADJUDICATOR,
    decided_at: TODAY,
    skeptical_reader_question:
      "Why did you separate corporate relocation from rural banking and healthcare decline?",
    public_answer:
      "Because the evidence we currently trust documents rural structural stress — population loss and weakened local institutions — more clearly than it proves that corporate relocation itself caused those specific losses. Relocation may still matter. We are not denying it. We are refusing to treat a plausible mechanism as a proven cause until it is tested on its own.",
    what_we_originally_said:
      "Corporate relocation and rural structural decline can drain community capacity, including local banking and healthcare access.",
    what_made_us_question_it:
      "The sentence grammatically bundled relocation with outcomes sourced mainly for rural structural decline.",
    what_we_learned:
      "Softening words like 'can' do not fix a causal bundle. Evidence-fit requires separating observed conditions from unproven mechanisms.",
    where_our_reasoning_was_weak:
      "We let narrative convenience join two propositions that need different proof standards.",
    what_we_now_say: claim("CC-CLAIM-006").claim_text,
    why_we_made_that_decision:
      "Preserve the rural diagnosis the sources support; label relocation as a hypothesis requiring separate causal evaluation.",
    what_we_still_dont_know:
      "Independent causal effect sizes of corporate relocation on local banking/healthcare access after controlling for broader rural decline.",
    what_else_this_could_affect: [
      "Community retention and ownership-design chapters",
      "Anti-extraction local economic narratives",
      "Rural healthcare/banking policy modules"
    ],
    potential_secondary_effects_or_unintended_consequences: [
      "May understate relocation harms if later evidence shows strong causal effects",
      "May delay some relocation-focused remedies until causal modules exist — possibly appropriate caution"
    ],
    what_evidence_could_change_our_mind_again:
      "Causal studies isolating relocation/plant-closure effects on local banking, healthcare access, and community capacity, including Arkansas-relevant cases."
  },
  {
    record_id: "CC-PR-003",
    change_id: "CC-CHG-P21-RET-009",
    claim_id: "CC-CLAIM-009",
    change_type: "RETIREMENT_TO_PREDICTION",
    decision: "APPROVE",
    decision_id: DECISION_ID,
    adjudicator: ADJUDICATOR,
    decided_at: TODAY,
    prediction_id: "CC-PRED-009",
    skeptical_reader_question: "Why did you remove this claim?",
    public_answer:
      "Because we discovered we were presenting something we hope or expect the system could accomplish as though evidence had already established it. It hasn't. The idea may eventually prove correct, but answering it requires defined policy packages, modeling, comparison to alternatives, and ultimately real-world evidence. We preserved the idea as a prediction instead of allowing it to masquerade as a fact.",
    what_we_originally_said:
      "System-level Constitutional Capitalism over 10–20 years would produce larger distributional effects than isolated corporate tax increases.",
    what_made_us_question_it:
      "Diagnosis audit: zero sources; predictive class; failed source-to-claim fit as an empirical claim.",
    what_we_learned:
      "A proposition can be important and still not be a fact. Classification is part of honesty.",
    where_our_reasoning_was_weak:
      "We mixed aspiration and design expectation into the empirical claim layer.",
    what_we_now_say:
      "CC-CLAIM-009 is RETIRED. Live proposition is CC-PRED-009: a sufficiently broad Constitutional Capitalism reform package may produce larger long-run distributional effects than an isolated corporate-tax increase; this is an untested comparative prediction requiring defined policy specifications, distributional modeling, sensitivity analysis, and ultimately empirical evaluation.",
    why_we_made_that_decision:
      "It isn't bad because it is unproven. It's bad as an empirical claim because it is unproven.",
    what_we_still_dont_know:
      "Comparative distributional effects under defined packages vs defined tax-only baselines across horizons and behavioral responses.",
    what_else_this_could_affect: [
      "Transition timeline and modeling agenda",
      "Any public comparison of Constitutional Capitalism vs 'just raise corporate taxes'",
      "Proof-packet design for package reforms"
    ],
    potential_secondary_effects_or_unintended_consequences: [
      "Opponents may say we walked back a core promise — correct response: we clarified epistemic status, not abandoned the research question",
      "Supporters may feel less certainty — that is the point of research integrity"
    ],
    what_evidence_could_change_our_mind_again:
      "Modeled comparative scenarios with transparent assumptions, then pilots or quasi-experimental evaluations showing larger sustained distributional effects from package reforms than from isolated corporate-tax increases."
  },
  {
    record_id: "CC-PR-004",
    change_id: "CC-CHG-P21-002",
    claim_id: "CC-CLAIM-010",
    change_type: "REWRITE_AND_SPLIT_PREDICTION",
    decision: "MODIFY",
    decision_id: DECISION_ID,
    adjudicator: ADJUDICATOR,
    decided_at: TODAY,
    prediction_id: "CC-PRED-012",
    skeptical_reader_question:
      "Why did you stop saying broader ownership would shift households toward multi-source capital ownership?",
    public_answer:
      "Because we were using solid evidence about today's wealth concentration to underwrite an untested redesign forecast. Those are different jobs. We now state the concentration fact as a claim. The idea that expanding ownership participation would change household income composition remains a prediction that still needs modeling and real evaluation.",
    what_we_originally_said:
      "Broader ownership participation would shift many households from wage-only dependence toward multi-source capital ownership.",
    what_made_us_question_it:
      "SCF/DFA sources support concentration, not the forecast that redesign 'would shift' households.",
    what_we_learned:
      "The claim should tell us what we know. The hypothesis should tell us what we think might happen.",
    where_our_reasoning_was_weak:
      "One record tried to do both empirical diagnosis and design prediction.",
    what_we_now_say: claim("CC-CLAIM-010").claim_text,
    related_prediction_now:
      "Expanding household ownership participation may increase the number of households receiving income or asset appreciation from capital, but the magnitude, distribution, persistence, and household-level effects are untested and require modeling and empirical evaluation. (CC-PRED-012)",
    why_we_made_that_decision:
      "Separation will pay dividends later for Systems Intelligence and public trust — facts and hopes are not epistemically equivalent.",
    what_we_still_dont_know:
      "Magnitude, distribution, persistence, and household-level effects of ownership-expansion designs.",
    what_else_this_could_affect: [
      "Ownership chapter claims",
      "CC-PRED-006 and related ownership predictions",
      "Pilot design metrics for household capital income"
    ],
    potential_secondary_effects_or_unintended_consequences: [
      "May slow public ownership rhetoric until pilots exist",
      "Overlap with CC-CLAIM-011 concentration wording needs editorial coordination so readers don't think we duplicated claims carelessly"
    ],
    what_evidence_could_change_our_mind_again:
      "Pilots or quasi-experiments showing ownership-participation designs materially increase the share of households receiving capital income/appreciation, with measured magnitudes and distribution."
  },
  {
    record_id: "CC-PR-005",
    change_id: "CC-CHG-P21-003",
    claim_id: "CC-CLAIM-016",
    change_type: "REWRITE",
    decision: "MODIFY",
    decision_id: DECISION_ID,
    adjudicator: ADJUDICATOR,
    decided_at: TODAY,
    skeptical_reader_question:
      "Why did you stop saying online commerce extracts spending through platform concentration and wealth leakage?",
    public_answer:
      "Because 'wealth leakage' sounded precise while remaining undefined and unmeasured in our evidence. We do know online commerce is a material share of U.S. retail sales, and that local effects deserve serious study. We also know consumer benefits exist and that local tax analysis must use the post-Wayfair legal environment. So we kept what we can support and moved leakage from assumed mechanism to open research.",
    what_we_originally_said:
      "Online commerce can extract spending from local economies via platform concentration and wealth leakage.",
    what_made_us_question_it:
      "Fit audit: scale and tax-law sources do not prove extraction via leakage; consumer-surplus contrary evidence exists.",
    what_we_learned:
      "Finding the word 'leakage' in literature would not rescue an undefined concept. Operational definition must come first.",
    where_our_reasoning_was_weak:
      "Mechanism overclaim; ignored countervailing consumer welfare; argumentative 'myths' language in an intermediate draft.",
    what_we_now_say: claim("CC-CLAIM-016").claim_text,
    why_we_made_that_decision:
      "Scholarly precision: state the scale fact, keep local effects as research, and describe the tax environment neutrally.",
    what_we_still_dont_know:
      "Operational local wealth/income leakage or multiplier effects of e-commerce by geography, including Arkansas.",
    what_else_this_could_affect: [
      "Local/rural economy chapters",
      "Marketplace facilitator / sales-tax design",
      "Any anti-platform extraction narrative"
    ],
    potential_secondary_effects_or_unintended_consequences: [
      "May under-mobilize political energy against platforms if leakage later proves large",
      "May understate consumer and rural-access benefits if research focuses only on harms"
    ],
    what_evidence_could_change_our_mind_again:
      "Registered studies with operational leakage/multiplier definitions showing net local income, employment, or fiscal effects after accounting for consumer surplus, logistics employment, and post-Wayfair tax collection."
  },
  {
    record_id: "CC-PR-006",
    change_id: "CC-CHG-P21-004",
    claim_id: "CC-CLAIM-017",
    change_type: "REWRITE",
    decision: "APPROVE",
    decision_id: DECISION_ID,
    adjudicator: ADJUDICATOR,
    decided_at: TODAY,
    skeptical_reader_question:
      "Why did you stop saying property taxes threaten ownership security?",
    public_answer:
      "Evidence supports real affordability and liquidity burdens for some households, but property taxes are also an important and comparatively stable source of local revenue. Describing them simply as a threat to ownership security ignored that second function and could push remedies that weaken local fiscal capacity. So we narrowed the diagnosis toward burdens and targeted relief rather than assuming the tax itself should broadly be weakened.",
    what_we_originally_said:
      "Property taxation can threaten ownership security for some households.",
    what_made_us_question_it:
      "Burden/relief evidence did not justify the stronger 'threaten ownership security' framing; institutional revenue role was missing.",
    what_we_learned:
      "A policy can create legitimate hardship for some people while performing an important institutional function. Solving the first by pretending the second does not exist is bad systems design.",
    where_our_reasoning_was_weak:
      "One-sided hardship framing without fiscal-function balance.",
    what_we_now_say: claim("CC-CLAIM-017").claim_text,
    why_we_made_that_decision:
      "Align wording with evidence and keep both hardship and institutional function visible.",
    what_we_still_dont_know:
      "Arkansas-specific burden distributions; which targeted relief designs best protect vulnerable owners without eroding essential local revenue.",
    what_else_this_could_affect: [
      "Local government finance chapters",
      "Housing security proposals",
      "School-funding / property-tax tradeoff analysis"
    ],
    potential_secondary_effects_or_unintended_consequences: [
      "Targeted relief that is too broad could still erode local revenue",
      "Protecting revenue without relief could leave liquidity-constrained owners exposed",
      "This is exactly the tradeoff the revised claim forces into the open"
    ],
    what_evidence_could_change_our_mind_again:
      "Evidence that property-tax burdens, under common local designs, systematically force involuntary ownership loss at scale — or conversely that current relief tools already neutralize the burden problem for the relevant households."
  }
];

const registry = {
  version: "0.1.0",
  decision_id: DECISION_ID,
  standard: "research/phase_2/public_reasoning_standard.json",
  slice_id: SLICE,
  generated_at: TODAY,
  note: "Citizen-facing systems reasoning — not a glorified corrections page.",
  records
};
writeJson("research/phase_2/public_reasoning_registry.json", registry);

for (const rec of records) {
  writeText(
    `reports/public_reasoning/${rec.record_id}_${rec.claim_id}.md`,
    `# ${rec.record_id} — Public Reasoning for ${rec.claim_id}

**Skeptical reader asks:** ${rec.skeptical_reader_question}

## Public answer

${rec.public_answer}

---

| Field | Content |
|---|---|
| What we originally said | ${rec.what_we_originally_said} |
| What made us question it | ${rec.what_made_us_question_it} |
| What we learned | ${rec.what_we_learned} |
| Where our reasoning was weak | ${rec.where_our_reasoning_was_weak} |
| What we now say | ${rec.what_we_now_say}${rec.related_prediction_now ? ` / ${rec.related_prediction_now}` : ""} |
| Why we made that decision | ${rec.why_we_made_that_decision} |
| What we still don't know | ${rec.what_we_still_dont_know} |
| What else this could affect | ${(rec.what_else_this_could_affect || []).join("; ")} |
| Secondary effects / unintended consequences | ${(rec.potential_secondary_effects_or_unintended_consequences || []).join("; ")} |
| Evidence that could change our mind again | ${rec.what_evidence_could_change_our_mind_again} |

**Decision:** ${rec.decision_id} · ${rec.decision} · ${rec.adjudicator} · ${rec.decided_at}
`
  );
}

writeText(
  "reports/CC_PUBLIC_REASONING_BACKFILL_CC_DEC_103.md",
  `# Public Reasoning Backfill — CC-DEC-103

Six citizen-facing records for the applied claim-governance changes:

${records.map((r) => `- [${r.record_id}](public_reasoning/${r.record_id}_${r.claim_id}.md) — ${r.claim_id}: ${r.skeptical_reader_question}`).join("\n")}

Registry: \`research/phase_2/public_reasoning_registry.json\`
`
);

// Link public reasoning on claims
for (const rec of records) {
  const c = claim(rec.claim_id);
  if (!c) continue;
  c.public_reasoning_ids = Array.from(
    new Set([...(c.public_reasoning_ids || []), rec.record_id])
  );
}

// ============================================================================
// 3. Source: BEA RIMS II for leakage operationalization spine
// ============================================================================

const newSources = [
  {
    source_id: "CC-SRC-099",
    title: "BEA Regional Input-Output Modeling System (RIMS II)",
    authors: ["U.S. Bureau of Economic Analysis"],
    year: 2026,
    url: "https://apps.bea.gov/regional/rims/rimsii/",
    source_type: "federal_statistical",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "internet_commerce",
    publication_date: "ongoing",
    retrieval_date: TODAY,
    summary:
      "Official BEA regional multipliers tool for estimating how final-demand changes ripple through local output, value added, earnings, and employment. Critical methodological constraint for retail: multipliers apply to local retail margins, not gross sales — because goods sold locally are often produced elsewhere. Provides an operational scaffold for local economic-impact analysis, not a ready-made measure of 'wealth leakage' from e-commerce.",
    key_findings: [
      "Local demand shocks can be analyzed with regional multipliers for output, value added, earnings, employment",
      "Retail requires margin treatment — gross sales must not be fed directly into retail multipliers"
    ],
    limitations:
      "Static I-O assumptions; does not by itself measure e-commerce diversion, platform concentration, or community wealth ownership effects; purchased multipliers are region-specific; household consumption-pattern shifts are outside core strengths.",
    ideological_or_institutional_considerations: "Official BEA regional accounts tool.",
    verification_status: "url_verified_via_search_excerpt",
    notes:
      "Operationalization spine for CC-RQ-P21-028 leakage definition — method, not proof of net harm."
  },
  {
    source_id: "CC-SRC-100",
    title: "RIMS II — Retail Sales / Retail Margin Treatment",
    authors: ["U.S. Bureau of Economic Analysis"],
    year: 2024,
    url: "https://apps.bea.gov/regional/pdf/rims/RetailSales.pdf",
    source_type: "federal_statistical",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "internet_commerce",
    publication_date: "undated_bea_guide",
    retrieval_date: TODAY,
    summary:
      "BEA guidance showing that only the retail margin (not purchaser value of goods) should be applied to RIMS II retail multipliers. Demonstrates why naive 'sales left town' arithmetic is methodologically invalid for local impact claims.",
    key_findings: [
      "Retail share/margin varies by product category",
      "Local impact estimates must use margins, not gross sales"
    ],
    limitations:
      "Illustrative regional examples; not an e-commerce study; does not measure ownership of platform profits.",
    ideological_or_institutional_considerations: "Official BEA methodological guidance.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "Directly disciplines leakage measurement mistakes for CC-CLAIM-016 research."
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
// 4. Leakage operationalization (definition — not keyword rescue)
// ============================================================================

const leakage = {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  research_question: "CC-RQ-P21-028",
  status: "OPERATIONAL_DEFINITION_PROPOSED — MEASUREMENT NOT YET COMPLETE",
  rule: "Do not use 'leakage' in public empirical claims until at least one component below is measured for a defined geography and net of countervailing effects.",
  rejected_definitions: [
    "Any sentence that uses 'leakage' without a measurable numerator/denominator",
    "Gross online sales treated as local loss dollar-for-dollar",
    "Platform concentration alone as proof of community wealth extraction"
  ],
  working_definition:
    "Local economic leakage from e-commerce is a net, geography-specific reduction in local value added, earnings, or fiscal capacity attributable to shifts in retail/service demand toward remote sellers, after accounting for (a) retained local retail margins and hybrid sellers, (b) logistics/fulfillment employment, (c) consumer surplus / accessibility gains, and (d) post-Wayfair tax remittance.",
  measurable_components: [
    {
      id: "LEAK-COMP-01",
      name: "Local retail margin displacement",
      method: "Estimate change in local retail margins (not gross sales) using BEA RIMS II retail-margin treatment",
      sources: ["CC-SRC-099", "CC-SRC-100", "CC-SRC-085"],
      status: "METHOD_READY — REGION DATA NOT ATTACHED"
    },
    {
      id: "LEAK-COMP-02",
      name: "Logistics/fulfillment offset",
      method: "Net employment/earnings in transportation, warehousing, and related local fulfillment",
      sources: ["CC-SRC-097"],
      status: "PARTIAL_LITERATURE"
    },
    {
      id: "LEAK-COMP-03",
      name: "Consumer surplus / accessibility",
      method: "Welfare gains from variety/convenience; distribution by income and density",
      sources: ["CC-SRC-098"],
      status: "PARTIAL_LITERATURE — OFTEN COUNTERVAILING"
    },
    {
      id: "LEAK-COMP-04",
      name: "Local fiscal remittance",
      method: "Sales-tax collections under destination/marketplace-facilitator rules post-Wayfair",
      sources: ["CC-SRC-086"],
      status: "LEGAL_FRAMEWORK_SOURCED — ARKANSAS SERIES OPEN"
    },
    {
      id: "LEAK-COMP-05",
      name: "Ownership of remote platform profits",
      method: "Share of profits accruing to non-local capital owners (hard; often unavailable)",
      sources: [],
      status: "CRITICAL GAP"
    }
  ],
  netting_rule:
    "A responsible leakage claim must be net of LEAK-COMP-02, 03, and 04 — not a gross sales diversion story.",
  arkansas_status: "Not yet measured",
  relation_to_cc_claim_016:
    "Current CC-CLAIM-016 correctly refuses to assert leakage as established; this definition is the research path to eventually support, qualify, or reject leakage language.",
  public_reasoning_seed: {
    skeptical_reader_question: "What do you even mean by leakage?",
    public_answer:
      "We mean a net local loss of value added, earnings, or fiscal capacity after counting what communities still keep — local retail margins, logistics jobs, consumer benefits, and taxes remitted under current law. Gross 'sales left town' arithmetic is not good enough."
  }
};
writeJson("research/phase_2/leakage_operational_definition.json", leakage);
writeText(
  "reports/CC_PHASE_2_LEAKAGE_OPERATIONAL_DEFINITION.md",
  `# Leakage Operational Definition

**Status:** Definition proposed — measurement not complete  
**RQ:** CC-RQ-P21-028

## Working definition

${leakage.working_definition}

## Components

| ID | Component | Status |
|---|---|---|
${leakage.measurable_components.map((c) => `| ${c.id} | ${c.name} | ${c.status} |`).join("\n")}

## Netting rule

${leakage.netting_rule}

## Skeptical reader

**Q:** ${leakage.public_reasoning_seed.skeptical_reader_question}  
**A:** ${leakage.public_reasoning_seed.public_answer}

Sources added: CC-SRC-099, CC-SRC-100 (BEA RIMS II / retail margin).
`
);

// Close RQ-028 as QUALIFIES (definition), not measurement complete
const rqKey = rqDoc.questions ? "questions" : "research_questions";
const rq028 = (rqDoc[rqKey] || []).find((q) => q.id === "CC-RQ-P21-028");
if (rq028) {
  rq028.status = "closed_in_slice";
  rq028.closeout_status =
    "CLOSED — QUALIFIES (operational definition proposed; measurement still open)";
  rq028.closeout_slice = SLICE;
  rq028.closeout_date = TODAY;
  rq028.last_updated = TODAY;
  rq028.artifact = "research/phase_2/leakage_operational_definition.json";
}

// ============================================================================
// 5. CC-CLAIM-003 module split (research modules — no silent claim_text mutation)
// ============================================================================

const modules = {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  parent_claim_id: "CC-CLAIM-003",
  parent_claim_text: claim("CC-CLAIM-003").claim_text,
  parent_status: "NOT ENOUGH EVIDENCE — retained pending governance on successor wording",
  rule: "Do not mutate CC-CLAIM-003 claim_text in this slice. Create falsifiable modules. Public reasoning explains why the umbrella claim fails.",
  concept_registry: "research/phase_2/political_power_concept_registry.json",
  modules: [
    {
      module_id: "CC-MOD-003-A",
      title: "Economic resource concentration",
      epistemic_class: "EMPIRICAL_CLAIM",
      proposed_wording:
        "U.S. household wealth and selected industry market structures show high concentration at the top of their distributions.",
      best_support: ["CC-SRC-001", "CC-SRC-002", "CC-SRC-005", "CC-SRC-012"],
      disposition_if_promoted: "SUPPORTED WITH QUALIFICATION",
      fit_if_promoted: "STRONG",
      notes: "Already largely covered by CC-CLAIM-011/005 — module exists to stop smuggling concentration into 'accountability'."
    },
    {
      module_id: "CC-MOD-003-B",
      title: "Unequal policy responsiveness",
      epistemic_class: "EMPIRICAL_CLAIM",
      proposed_wording:
        "Under some research designs, U.S. national policy outcomes associate more strongly with affluent and organized-business preferences than with average-citizen preferences when those preferences diverge; the magnitude and causal interpretation remain contested.",
      best_support: ["CC-SRC-094"],
      best_contrary: ["CC-SRC-095"],
      disposition_if_promoted: "SUPPORTED WITH QUALIFICATION",
      fit_if_promoted: "PARTIAL",
      notes: "Gilens/Page + Branham/Soroka/Wlezien — association/contested causation, not capture."
    },
    {
      module_id: "CC-MOD-003-C",
      title: "Campaign finance and lobbying disclosure (descriptive)",
      epistemic_class: "EMPIRICAL_CLAIM",
      proposed_wording:
        "Federal campaign-finance and lobbying disclosure systems make large flows of political money and lobbying activity publicly observable; disclosure alone does not establish that economic concentration weakens democratic accountability.",
      best_support: ["CC-SRC-092", "CC-SRC-093", "CC-SRC-096"],
      disposition_if_promoted: "SUPPORTED AS WRITTEN",
      fit_if_promoted: "DIRECT",
      notes: "Descriptive only."
    },
    {
      module_id: "CC-MOD-003-D",
      title: "Regulatory capture (sectoral)",
      epistemic_class: "CAUSAL_CLAIM",
      proposed_wording:
        "In specific regulated sectors, industry actors can systematically shape the agencies that regulate them; such capture must be evidenced sector-by-sector and is not established by national concentration statistics alone.",
      best_support: [],
      disposition_if_promoted: "NOT ENOUGH EVIDENCE",
      fit_if_promoted: "NON-SUPPORTING",
      notes: "Requires agency/sector modules — currently open."
    },
    {
      module_id: "CC-MOD-003-E",
      title: "State capture (systemic)",
      epistemic_class: "CAUSAL_CLAIM",
      proposed_wording:
        "Private actors can, under some conditions, shape the formation of laws and rules to their advantage on a systemic basis; whether U.S. national politics meets a state-capture standard is not established by current Constitutional Capitalism sources.",
      best_support: [],
      best_contrary: ["CC-SRC-095"],
      disposition_if_promoted: "NOT ENOUGH EVIDENCE",
      fit_if_promoted: "NON-SUPPORTING",
      notes: "Do not promote without identification standards."
    }
  ],
  recommendation_for_parent:
    "Keep CC-CLAIM-003 as NEE umbrella OR retire/rewrite after ChatGPT governance choosing among modules A–E. Do not upgrade Supports."
};
writeJson("research/phase_2/claim_003_research_modules.json", modules);

const pr003 = {
  record_id: "CC-PR-007",
  change_id: "CC-MOD-SPLIT-003",
  claim_id: "CC-CLAIM-003",
  change_type: "MODULE_SPLIT_RESEARCH",
  decision: "NO_CLAIM_TEXT_MUTATION",
  decision_id: DECISION_ID,
  adjudicator: "Cursor (research execution under Public Reasoning Standard)",
  decided_at: TODAY,
  skeptical_reader_question:
    "Why won't you say economic concentration weakens democratic accountability?",
  public_answer:
    "Because that sentence asks one claim to do too many jobs. We can show that wealth and some markets are concentrated. We can show contested evidence that policy sometimes responds more to affluent and organized interests. We can show that campaign money and lobbying are disclosed. What we cannot yet show is that 'concentration' as such weakens 'democratic accountability,' or that the United States meets a capture standard. Mixing those ideas would teach the wrong lesson: that a scary conclusion is settled when the hard causal work is still ahead.",
  what_we_originally_said: claim("CC-CLAIM-003").claim_text,
  what_made_us_question_it:
    "Political-power dossier: FEC/LDA ≠ capture; Gilens/Page ≠ state capture; Branham et al. contradict strong oligarchy readings; concept registry forbids synonym collapse.",
  what_we_learned:
    "Campaign finance, lobbying, access, responsiveness, regulatory capture, and state capture are different empirical propositions.",
  where_our_reasoning_was_weak:
    "Umbrella causal wording invited readers to treat adjacent literatures as proof of capture.",
  what_we_now_say:
    "CC-CLAIM-003 remains NOT ENOUGH EVIDENCE. Successor research modules CC-MOD-003-A…E are drafted for separate proof. No silent rewrite this slice.",
  why_we_made_that_decision:
    "Module split without pretending the parent claim earned Supports. Public reasoning first; governance later for any successor canonical wording.",
  what_we_still_dont_know:
    "Sectoral regulatory capture cases; state/local modules; causal identification from market concentration to democratic accountability.",
  what_else_this_could_affect: [
    "Political power chapters",
    "Antitrust-democracy narratives",
    "Any design assuming 'break concentration → restore democracy' as established"
  ],
  potential_secondary_effects_or_unintended_consequences: [
    "May frustrate readers who want a single capture thesis now",
    "May protect the project from building policy on an unproven causal bridge",
    "If later evidence supports a narrow capture claim, we can promote a module without laundering it through the old umbrella"
  ],
  what_evidence_could_change_our_mind_again:
    "Identified causal designs linking defined concentration measures to defined accountability/capture outcomes at relevant government levels, plus sectoral capture case dossiers that survive contrary review."
};
records.push(pr003);
registry.records = records;
writeJson("research/phase_2/public_reasoning_registry.json", registry);
writeText(
  `reports/public_reasoning/${pr003.record_id}_${pr003.claim_id}.md`,
  `# ${pr003.record_id} — Public Reasoning for ${pr003.claim_id}

**Skeptical reader asks:** ${pr003.skeptical_reader_question}

## Public answer

${pr003.public_answer}

---

| Field | Content |
|---|---|
| What we originally said | ${pr003.what_we_originally_said} |
| What made us question it | ${pr003.what_made_us_question_it} |
| What we learned | ${pr003.what_we_learned} |
| Where our reasoning was weak | ${pr003.where_our_reasoning_was_weak} |
| What we now say | ${pr003.what_we_now_say} |
| Why we made that decision | ${pr003.why_we_made_that_decision} |
| What we still don't know | ${pr003.what_we_still_dont_know} |
| What else this could affect | ${pr003.what_else_this_could_affect.join("; ")} |
| Secondary effects | ${pr003.potential_secondary_effects_or_unintended_consequences.join("; ")} |
| Evidence that could change our mind again | ${pr003.what_evidence_could_change_our_mind_again} |
`
);

const c003 = claim("CC-CLAIM-003");
c003.research_modules = "research/phase_2/claim_003_research_modules.json";
c003.public_reasoning_ids = Array.from(
  new Set([...(c003.public_reasoning_ids || []), "CC-PR-007"])
);
c003.phase21_module_split = {
  slice_id: SLICE,
  at: TODAY,
  parent_disposition: "NOT ENOUGH EVIDENCE",
  modules: modules.modules.map((m) => m.module_id),
  claim_text_mutated: false
};

writeText(
  "reports/CC_PHASE_2_CLAIM_003_RESEARCH_MODULE_SPLIT.md",
  `# CC-CLAIM-003 Research Module Split

**Parent claim retained:** NOT ENOUGH EVIDENCE  
**claim_text mutated this slice:** No

| Module | Title | If promoted |
|---|---|---|
${modules.modules.map((m) => `| ${m.module_id} | ${m.title} | ${m.disposition_if_promoted} / ${m.fit_if_promoted} |`).join("\n")}

Public reasoning: \`reports/public_reasoning/CC-PR-007_CC-CLAIM-003.md\`
`
);

// Update RQ-029
const rq029 = (rqDoc[rqKey] || []).find((q) => q.id === "CC-RQ-P21-029");
if (rq029) {
  rq029.status = "closed_in_slice";
  rq029.closeout_status =
    "CLOSED — QUALIFIES (modules drafted; parent claim still NEE; successor wording awaits governance)";
  rq029.closeout_slice = SLICE;
  rq029.closeout_date = TODAY;
  rq029.last_updated = TODAY;
  rq029.artifact = "research/phase_2/claim_003_research_modules.json";
}
rqDoc.last_updated = TODAY;
writeJson("data/research/research_questions.json", rqDoc);

// Update internet dossier + domain matrix lightly
const internetDossier = JSON.parse(
  fs.readFileSync(r("research/phase_2/internet_commerce_leakage_evidence_dossier.json"), "utf8")
);
internetDossier.version = "0.2.0";
internetDossier.slice_id = SLICE;
internetDossier.operational_definition =
  "research/phase_2/leakage_operational_definition.json";
internetDossier.research_streams.local_economic_leakage = {
  status: "DEFINITION_PROPOSED",
  sources: ["CC-SRC-099", "CC-SRC-100"],
  note: "Operational definition + RIMS margin discipline; measurement not complete"
};
internetDossier.existing_sources = Array.from(
  new Set([
    ...(internetDossier.best_supporting_evidence || []),
    "CC-SRC-085",
    "CC-SRC-086",
    "CC-SRC-097",
    "CC-SRC-098",
    "CC-SRC-099",
    "CC-SRC-100"
  ])
);
writeJson(
  "research/phase_2/internet_commerce_leakage_evidence_dossier.json",
  internetDossier
);

const domainMatrix = JSON.parse(
  fs.readFileSync(r("research/phase_2/priority_domain_research_matrix.json"), "utf8")
);
for (const d of domainMatrix.domains) {
  if (d.domain === "internet commerce") {
    d.existing_sources = Array.from(
      new Set([...(d.existing_sources || []), "CC-SRC-099", "CC-SRC-100"])
    );
    d.primary_sources = Array.from(
      new Set([...(d.primary_sources || []), "CC-SRC-099", "CC-SRC-100"])
    );
    d.government_sources = Array.from(
      new Set([...(d.government_sources || []), "CC-SRC-099", "CC-SRC-100"])
    );
    d.major_gaps = [
      "Arkansas/region RIMS application",
      "Ownership of remote platform profits (LEAK-COMP-05)",
      "Net leakage measurement after consumer surplus"
    ];
    d.open_research_questions = ["CC-RQ-P21-023", "CC-RQ-P21-024", "CC-RQ-P21-030"];
    d.note =
      "Leakage definition proposed (CC-RQ-P21-028 QUALIFIES). Domain remains THIN until net measurement.";
    d.coverage_assessment = "THIN";
  }
  if (d.domain === "political and economic power") {
    d.major_gaps = [
      "Promote or govern successor modules for CC-CLAIM-003",
      "Sectoral regulatory capture dossiers",
      "Media ownership (CC-RQ-P21-026)"
    ];
    d.open_research_questions = ["CC-RQ-P21-026", "CC-RQ-P21-010", "CC-RQ-P21-013"];
    d.modules = "research/phase_2/claim_003_research_modules.json";
    d.note = "Module split drafted; parent 003 still NEE; domain remains THIN.";
    d.coverage_assessment = "THIN";
  }
}
domainMatrix.version = "0.3.0";
domainMatrix.slice_id = SLICE;
domainMatrix.generated_at = TODAY;
writeJson("research/phase_2/priority_domain_research_matrix.json", domainMatrix);

claimDoc.last_updated = TODAY;
writeJson("data/research/claim_ledger.json", claimDoc);

// First-20: 003 unchanged disposition; maybe annotate modules. Fit scoreboard unchanged unless we improve something.
const rows = priorMatrix.rows.map((row) => {
  if (row.claim_id === "CC-CLAIM-003") {
    return {
      ...row,
      modules: modules.modules.map((m) => m.module_id),
      public_reasoning: "CC-PR-007",
      note: "Module split research complete; claim_text unchanged; still NEE"
    };
  }
  if (row.claim_id === "CC-CLAIM-016") {
    return {
      ...row,
      support_sources: Array.from(
        new Set([...(row.support_sources || []), "CC-SRC-099", "CC-SRC-100"])
      ),
      note: "Leakage operational definition attached; claim wording unchanged"
    };
  }
  return row;
});

const weak_fit = rows.filter((row) =>
  ["PARTIAL", "WEAK", "NON-SUPPORTING"].includes(row.fit)
).length;
const direct_strong = rows.filter((row) => ["DIRECT", "STRONG"].includes(row.fit)).length;

writeJson("research/phase_2/first_20_claim_evidence_matrix.json", {
  ...priorMatrix,
  version: "0.4.1",
  slice_id: SLICE,
  generated_at: TODAY,
  public_reasoning_standard: "research/phase_2/public_reasoning_standard.json",
  weak_fit_below_strong: weak_fit,
  direct_strong_fit: direct_strong,
  rows
});

// GATE-02
const gate02 = checklist.gate_items.find((g) => g.id === "CC-P2-GATE-02");
const gate02Determination = "PARTIAL / REMAINS OPEN";
if (gate02) {
  gate02.status = "open";
  gate02.last_evaluated = TODAY;
  gate02.slice_id = SLICE;
  gate02.forensic_note = `GATE-02 remains open because:
- ${weak_fit}/20 claims remain below STRONG fit; ${direct_strong}/20 are DIRECT/STRONG
- CC-CLAIM-003 remains NOT ENOUGH EVIDENCE (modules drafted, parent not upgraded)
- Leakage definition proposed but net measurement not complete (internet domain THIN)
- Baseline still 2/86
- Public Reasoning Standard now active under CC-DEC-103`;
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

// KG light touch
const nextNode = () => {
  const nums = kgDoc.nodes.map((n) => parseInt(String(n.node_id).replace(/\D/g, ""), 10) || 0);
  return Math.max(0, ...nums) + 1;
};
let nId = nextNode();
kgDoc.nodes.push({
  node_id: `CC-KG-${String(nId++).padStart(3, "0")}`,
  label: "Public Reasoning Standard",
  kind: "system",
  related_decision: DECISION_ID,
  related_slice: SLICE
});
kgDoc.last_updated = TODAY;
writeJson("data/research/knowledge_graph.json", kgDoc);

// Build / slice state
buildState.version = "0.4.0";
buildState.last_updated = TODAY;
buildState.mission_id = SLICE;
buildState.slice_return =
  "reports/CC_PHASE_2_1_THIN_DOMAIN_LEAKAGE_AND_CLAIM_003_MODULE_SPLIT_1_0_RETURN.md";
buildState.writing_focus =
  "PUBLIC REASONING STANDARD active under CC-DEC-103. Leakage defined; CC-CLAIM-003 modules drafted; parent still NEE.";
buildState.next_action =
  "ChatGPT may govern successor wording for CC-CLAIM-003 modules; measure net leakage for a pilot geography; continue THIN domains.";
buildState.gate_02 = gate02Determination;
buildState.weak_fit_claims = weak_fit;
buildState.direct_strong_fit = direct_strong;
buildState.sources_registered = srcDoc.sources.length;
buildState.public_reasoning_standard = "ACTIVE";
buildState.baseline = "2/86";
writeJson("data/project/current_build_state.json", buildState);

writeJson("data/project/latest_cursor_return.json", {
  version: "0.1.0",
  generated_at: TODAY,
  slice_id: SLICE,
  summary: `Public Reasoning Standard formalized under CC-DEC-103; 7 public reasoning records (6 backfill + 003 module split). Leakage operational definition + BEA RIMS sources 099–100. CC-CLAIM-003 modules A–E drafted; parent still NEE. Below-STRONG fit ${beforeWeak}→${weak_fit}. GATE-02 remains open.`,
  return_report:
    "reports/CC_PHASE_2_1_THIN_DOMAIN_LEAKAGE_AND_CLAIM_003_MODULE_SPLIT_1_0_RETURN.md",
  gate_02: gate02Determination,
  weak_fit: `${weak_fit}/20`
});

const sliceEntry = {
  slice_id: SLICE,
  title: "Thin Domain Leakage + Claim-003 Module Split + Public Reasoning",
  purpose:
    "Formalize Public Reasoning Standard under CC-DEC-103; backfill citizen explanations; operationalize leakage; split CC-CLAIM-003 into research modules without false Supports.",
  status: "completed",
  completed_at: TODAY,
  completion_evidence: [
    "Public Reasoning Standard 1.0",
    "7 public reasoning records",
    "leakage operational definition",
    "CC-SRC-099–100",
    "CC-CLAIM-003 modules A–E",
    "parent 003 still NEE"
  ],
  next_recommended_slice:
    "CC-PHASE-2.1-CLAIM-003-SUCCESSOR-GOVERNANCE-AND-PILOT-LEAKAGE-MEASUREMENT-1.0",
  note: "Research governance standard + substantive THIN-domain work. No new architecture."
};
const existing = sliceQueue.slices.find((s) => s.slice_id === SLICE);
if (existing) Object.assign(existing, sliceEntry);
else sliceQueue.slices.push(sliceEntry);
sliceQueue.active_slice = sliceEntry.next_recommended_slice;
sliceQueue.last_updated = TODAY;
writeJson("data/project/slice_queue.json", sliceQueue);

const returnMd = `# CC-PHASE-2.1-THIN-DOMAIN-LEAKAGE-AND-CLAIM-003-MODULE-SPLIT-1.0 — Return

## 1. Executive Summary

**Public Reasoning Standard** formalized under **CC-DEC-103** (permanent scholarly rule, not platform). Six applied claim changes backfilled with citizen-facing systems explanations; CC-CLAIM-003 received a seventh record for module-split research. Leakage operationalized with BEA RIMS margin discipline (**CC-SRC-099–100**). **CC-CLAIM-003 remains NOT ENOUGH EVIDENCE** — modules A–E drafted, parent wording not silently upgraded.

**Below STRONG fit: ${beforeWeak}/20 → ${weak_fit}/20**  
**GATE-02: ${gate02Determination}**  
**Baseline: 2/86**  
**Sources: ${srcDoc.sources.length}**

## 2. Public Reasoning Standard (CC-DEC-103 extension)

Governing idea: we do not hide failed tests — we explain them.

Public test: *Can an ordinary citizen understand why this is the most responsible answer right now?*

Artifacts:
- \`research/phase_2/public_reasoning_standard.json\`
- \`reports/CC_PUBLIC_REASONING_STANDARD_1_0.md\`
- \`research/phase_2/public_reasoning_registry.json\`

## 3. Public Reasoning Records

| ID | Claim | Skeptical question |
|---|---|---|
${records.map((r) => `| ${r.record_id} | ${r.claim_id} | ${r.skeptical_reader_question} |`).join("\n")}

Exemplars: **CC-PR-006 (017)** and **CC-PR-003 (009)** match the educational standard requested.

## 4. Leakage Operationalization

Working definition + five components (margins, logistics offset, consumer surplus, fiscal remittance, remote profit ownership).  
**CC-RQ-P21-028:** CLOSED — QUALIFIES (definition; measurement open).  
Internet domain remains **THIN**.

## 5. CC-CLAIM-003 Module Split

| Module | Focus |
|---|---|
| CC-MOD-003-A | Resource concentration |
| CC-MOD-003-B | Unequal responsiveness |
| CC-MOD-003-C | Disclosure descriptive |
| CC-MOD-003-D | Regulatory capture (sectoral) |
| CC-MOD-003-E | State capture (systemic) |

Parent **NEE** unchanged. **CC-RQ-P21-029:** CLOSED — QUALIFIES.

## 6. Canonical claim_text mutations this slice

**0** (003 not rewritten; public reasoning + modules only)

## 7. Source-to-Claim Fit

${beforeWeak}/20 → **${weak_fit}/20** below STRONG (no artificial inflation)

## 8. P0 / Baseline

P0: 0 open · Baseline: 2/86

## 9. GATE-02

# ${gate02Determination}

## 10. All 16 Gates

| ID | Text | Status |
|---|---|---|
${gateTable}

## 11. Validators

Run after script.

## 12. Files Changed

- Public reasoning standard/registry/reports
- leakage definition + claim_003 modules
- source_registry 099–100
- CC-DEC-103 extended
- domain matrix / build state / return

## 13. Next Slice

\`CC-PHASE-2.1-CLAIM-003-SUCCESSOR-GOVERNANCE-AND-PILOT-LEAKAGE-MEASUREMENT-1.0\`
`;

writeText(
  "reports/CC_PHASE_2_1_THIN_DOMAIN_LEAKAGE_AND_CLAIM_003_MODULE_SPLIT_1_0_RETURN.md",
  returnMd
);

console.log("\n=== SLICE COMPLETE ===");
console.log(`public reasoning records: ${records.length}`);
console.log(`sources: ${srcDoc.sources.length}`);
console.log(`below STRONG: ${beforeWeak} → ${weak_fit}`);
console.log(`GATE-02: ${gate02Determination}`);
console.log(`003 claim_text mutated: false`);
