/**
 * CC-PHASE-2.1-LOCAL-INDEPENDENT-JOURNALISM-CIVIC-INFORMATION-MODULE-1.0
 *
 * RESEARCH HYPOTHESIS REGISTRATION ONLY — not doctrine, not a new principle,
 * consistent with architecture / doctrine freeze.
 *
 * Central research idea (not canonized principle):
 * A prosperous self-governing community requires independent local information
 * infrastructure; citizens cannot meaningfully govern institutions they cannot see.
 */
import fs from "node:fs";
import path from "node:path";
import { r } from "./lib/paths.mjs";

const TODAY = "2026-08-07";
const SLICE =
  "CC-PHASE-2.1-LOCAL-INDEPENDENT-JOURNALISM-CIVIC-INFORMATION-MODULE-1.0";
const MOD_ID =
  "CC-MOD-LOCAL-INDEPENDENT-JOURNALISM-AND-CIVIC-INFORMATION-INFRASTRUCTURE";
const HYP_PARENT = "CC-HYP-LOCAL-INDEPENDENT-JOURNALISM-ECOSYSTEM";
const HYP_PRODUCTIVE = "CC-HYP-CIVIC-INFORMATION-AS-PRODUCTIVE-INFRASTRUCTURE";
const HYP_CREDITS = "CC-HYP-CITIZEN-DIRECTED-JOURNALISM-ALLOCATION";
const HYP_SHARED = "CC-HYP-REGIONAL-NEWSROOM-SHARED-SERVICES";
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
const rqDoc = JSON.parse(fs.readFileSync(r("data/research/research_questions.json"), "utf8"));
const kgDoc = JSON.parse(fs.readFileSync(r("data/research/knowledge_graph.json"), "utf8"));
const prDoc = JSON.parse(fs.readFileSync(r("research/phase_2/public_reasoning_registry.json"), "utf8"));
const geoSet = JSON.parse(
  fs.readFileSync(r("research/phase_2/arkansas_designated_research_geography_set.json"), "utf8")
);
const buildState = JSON.parse(fs.readFileSync(r("data/project/current_build_state.json"), "utf8"));
const sliceQueue = JSON.parse(fs.readFileSync(r("data/project/slice_queue.json"), "utf8"));

const GEO_IDS = [
  "AR-GEO-SEARCY-COUNTY",
  "AR-GEO-LAFAYETTE-COUNTY",
  "AR-GEO-WEST-HELENA",
  "AR-GEO-BENTON-COUNTY",
  "AR-GEO-PULASKI-COUNTY",
  "AR-GEO-JACKSONVILLE",
];

const newSources = [
  {
    source_id: "CC-SRC-144",
    title: "New Jersey Civic Information Consortium — N.J.S.A. 18A:64-96 et seq. (P.L.2018, c.111)",
    authors: ["New Jersey Legislature"],
    year: 2018,
    url: "https://pub.njleg.state.nj.us/Bills/2018/PL18/111_.PDF",
    source_type: "statute",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "New Jersey",
    research_domain: "civic_information_journalism",
    publication_date: "2018",
    retrieval_date: TODAY,
    summary:
      "State statute establishing the New Jersey Civic Information Consortium as a nonprofit university consortium to advance media/technology research and fund civic-information projects. Creates a publicly authorized but organizationally independent vehicle for civic-information grants — a comparative model for studying public finance of local information without a government newsroom.",
    key_findings: [
      "Consortium established by state law as nonprofit among member public universities",
      "Grant goals include quantity/quality of civic information and underserved communities",
      "Statutory design separates consortium nonprofit structure from ordinary agency editorial control"
    ],
    limitations:
      "New Jersey-specific; does not prove citizen-directed voucher design; grant metrics and outcomes require separate evaluation; not an Arkansas model endorsement.",
    ideological_or_institutional_considerations:
      "Public appropriation + independent nonprofit intermediary — study for firewall design, not copy blindly.",
    verification_status: "url_verified",
    notes: "Foundational comparative model named in Local Information Commons research brief."
  },
  {
    source_id: "CC-SRC-145",
    title: "What We Do | New Jersey Civic Information Consortium",
    authors: ["New Jersey Civic Information Consortium"],
    year: 2026,
    url: "https://njcivicinfo.org/what-we-do/",
    source_type: "program_documentation",
    reliability: "primary_institutional",
    primary_or_secondary: "primary",
    jurisdiction: "New Jersey",
    research_domain: "civic_information_journalism",
    publication_date: "retrieved-2026-08-07",
    retrieval_date: TODAY,
    summary:
      "Consortium program description: grants for local news and civic information; states that state law prevents New Jersey and the Consortium from owning funded projects or exercising editorial control over grantees. Useful for documenting claimed structural firewalls in an existing public-finance experiment.",
    key_findings: [
      "Self-described first-of-its-kind state initiative for local journalism/civic information",
      "Claims statutory barrier to state/consortium ownership and editorial control of funded projects",
      "Grantmaking framed around underserved and civic-engagement priorities"
    ],
    limitations:
      "Self-description; independence claims require statutory and practice verification; grant amounts cited on site are program facts, not CC modeling proposals.",
    ideological_or_institutional_considerations: "Implementer documentation — pair with statute (CC-SRC-144).",
    verification_status: "url_verified",
    notes: "Pair with statute; do not treat marketing language as constitutional theory."
  },
  {
    source_id: "CC-SRC-146",
    title: "Local News in America — research program overview (Pew Research Center)",
    authors: ["Pew Research Center"],
    year: 2024,
    url: "https://www.pewresearch.org/topic/news-habits-media/news-platforms-sources/local-news/",
    source_type: "research_organization",
    reliability: "secondary_reputable",
    primary_or_secondary: "secondary",
    jurisdiction: "US",
    research_domain: "civic_information_journalism",
    publication_date: "program-page",
    retrieval_date: TODAY,
    summary:
      "Pew Research Center topical hub for local-news habits, platforms, and related surveys. Marks the existence of sustained national survey research on local-news consumption and attitudes — bibliography entry for news-desert / local-trust literature, not a substitute for Arkansas geography measurement.",
    key_findings: [
      "Established national research program on local news habits and sources",
      "Useful entry point to peer Pew reports on local news decline and audience behavior"
    ],
    limitations:
      "Hub page aggregating multiple studies; specific statistics must be taken from individual report pages when used in claims; national averages ≠ Arkansas county reality.",
    ideological_or_institutional_considerations: "Nonpartisan survey research organization.",
    verification_status: "url_verified",
    notes: "Bibliography gateway — attach specific Pew report PDFs before promoting any magnitude claim."
  },
  {
    source_id: "CC-SRC-147",
    title: "The Expanding News Desert (UNC Hussman School of Journalism and Media)",
    authors: ["UNC Hussman School of Journalism and Media", "Penny Abernathy / related project literature"],
    year: 2023,
    url: "https://www.usnewsdeserts.com/",
    source_type: "academic_project",
    reliability: "secondary_reputable",
    primary_or_secondary: "secondary",
    jurisdiction: "US",
    research_domain: "civic_information_journalism",
    publication_date: "project-site",
    retrieval_date: TODAY,
    summary:
      "Long-running academic mapping project on newspaper closures, ownership consolidation, and communities lacking robust local news. Primary comparative reference for 'news desert' diagnostics — to be used carefully with method notes when Arkansas geographies are scored.",
    key_findings: [
      "Documents widespread local newspaper loss and ownership consolidation patterns in the U.S.",
      "Provides a research vocabulary for information-poor communities beyond 'has/doesn't have a paper'"
    ],
    limitations:
      "Definitions of desert and newspaper counts vary by release; website aggregates evolving data; verify vintage before citing counts; print-centric measures understate digital/radio/nonprofit substitutes.",
    ideological_or_institutional_considerations: "Academic public-interest research project.",
    verification_status: "url_verified",
    notes: "Use for problem framing; do not invent Arkansas desert scores in this registration slice."
  },
  {
    source_id: "CC-SRC-148",
    title: "26 U.S.C. § 501(c)(3) — Exemption from tax on corporations, certain trusts, etc.",
    authors: ["United States Congress"],
    year: 2026,
    url: "https://www.law.cornell.edu/uscode/text/26/501",
    source_type: "statute",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "civic_information_journalism",
    publication_date: "current-code",
    retrieval_date: TODAY,
    summary:
      "Federal tax-exemption statute under which many nonprofit newsrooms and civic-information organizations organize. Establishes that U.S. law already provides a nonprofit pathway used by journalism organizations — relevant to ownership-form research, not a claim that 501(c)(3) solves local-news economics.",
    key_findings: [
      "Statutory pathway for charitable/educational organizations including many nonprofit newsrooms",
      "Public charity / supporting-organization structures appear in models like NJ CIC"
    ],
    limitations:
      "Tax status ≠ editorial quality or sustainability; IRS rules constrain lobbying/campaign intervention; does not create viewpoint-neutral public financing by itself.",
    ideological_or_institutional_considerations: "Neutral code provision; applications are contested.",
    verification_status: "url_verified",
    notes: "Structural baseline for nonprofit journalism ownership research."
  }
];

for (const s of newSources) {
  if (!srcDoc.sources.some((x) => x.source_id === s.source_id)) srcDoc.sources.push(s);
}
srcDoc.last_updated = TODAY;
srcDoc.note =
  (srcDoc.note || "") +
  " Phase 2.1 (2026-08-07): CC-SRC-144–148 registered for Local Independent Journalism / Civic Information Infrastructure module (hypothesis registration only).";

const moduleDoc = {
  version: "0.1.0",
  status: "OPEN_HYPOTHESIS_REGISTRATION",
  slice_id: SLICE,
  generated_at: TODAY,
  module_id: MOD_ID,
  status_note:
    "RESEARCH MODULE — not doctrine, not a new principle, not a funding proposal with dollar amounts, not a government newsroom.",
  architecture_freeze_compliance:
    "Introduced as research hypothesis under infrastructure/doctrine freeze; does not add principles to the frozen set.",
  primary_hypothesis_id: HYP_PARENT,
  related_hypothesis_ids: [HYP_PRODUCTIVE, HYP_CREDITS, HYP_SHARED],
  central_research_idea_not_principle:
    "A prosperous self-governing community requires independent local information infrastructure. Citizens cannot meaningfully govern institutions they cannot see.",
  public_function_focus:
    "Preserve and expand the public function of journalism across newspapers, radio, newsletters, podcasts, video, investigative, civic-data journalism, livestreaming, community correspondents, and future technologies — not preserve any single business model.",
  coverage_targets_research:
    [
      "city councils",
      "quorum courts",
      "school boards",
      "planning commissions",
      "courts",
      "police/fire/EMS",
      "utilities",
      "hospitals",
      "economic-development authorities",
      "local businesses",
      "agriculture",
      "nonprofits",
      "elections",
      "budgets",
      "procurement",
      "neighborhood/community life"
    ],
  financing_design_constraint:
    "Government may help finance journalism capacity but must not control which journalism receives support, what it covers, or what it says. Citizens allocate; journalists report; government cannot choose winners or punish critics.",
  mechanism_under_research: {
    name: "Civic Information Credit / citizen-directed journalism allocation",
    status: "MODELING_VARIABLE_NOT_PROPOSAL",
    dollar_amount: "NOT SPECIFIED — modeling variable only; no invented budgets in this slice",
    other_revenue_stack: [
      "subscriptions",
      "memberships",
      "philanthropy",
      "advertising",
      "cooperative ownership",
      "local-business sponsorship",
      "charitable contributions",
      "community investment",
      "possible Community Prosperity capital for appropriate infrastructure (hypothesis only)"
    ],
    comparative_models: ["CC-SRC-144", "CC-SRC-145", "CC-SRC-148"]
  },
  local_ownership_pathways_to_research: [
    "journalist-owned organizations",
    "worker cooperatives",
    "community-owned publications",
    "nonprofit newsrooms",
    "locally owned newspapers/radio",
    "public-benefit corporations",
    "university/community-college journalism partnerships",
    "hybrid structures",
    "community news cooperatives after newspaper loss"
  ],
  shared_services_hypothesis:
    "Regional shared-services cooperatives may centralize expensive infrastructure (legal/FOIA, data, video, investigative specialists, tech, accounting, cybersecurity, archives) while decentralizing reporters, editorial independence, and ownership — distinct from consolidating into one distant corporate newsroom.",
  public_data_cost_reduction_agenda: [
    "machine-readable budgets, expenditures, contracts",
    "agendas/minutes",
    "campaign finance / lobbying",
    "property / permits",
    "legislation / regulatory actions",
    "public meetings",
    "open-source investigative tools",
    "AI anomaly flagging with human journalistic judgment retained"
  ],
  technology_requirement_hypothesis:
    "Public-interest journalism should continuously adopt emerging communication technology early enough that citizens do not become dependent upon either government communications systems or a handful of private platforms for civic information. Protect independent civic information production/distribution — do not constitutionally privilege newspapers as a form.",
  structural_firewalls_to_research: [
    "No government editorial authority",
    "No ideological qualification / political loyalty test",
    "No government pre-publication review",
    "No funding conditioned on favorable coverage",
    "Transparent funding",
    "Independent eligibility administration",
    "Viewpoint-neutral rules",
    "Multiple funding pathways",
    "Judicially enforceable anti-retaliation protections",
    "Citizen allocation as diffusion of funding power",
    "Minimum civic-information infrastructure floor alongside citizen-directed credits"
  ],
  failure_modes_to_research: [
    "Popular outlets capture most credits",
    "Sensationalism outperforms tedious public-service reporting",
    "Wealthier communities supplement outlets more easily (equity gap)",
    "Political organizations coordinate allocation campaigns",
    "Philanthropic dependency / donor capture",
    "Platform dependence",
    "Government retaliation despite formal firewalls",
    "Shared services quietly recentralize editorial control"
  ],
  granular_coverage_metric_hypothesis:
    "Percent of institutions exercising public power in a community that receive meaningful independent journalistic scrutiny (coverage dashboard), not merely whether a county 'has a newspaper.'",
  falsification_agenda: [
    "Local-news economics collapse and consolidation literature",
    "News-desert measurement validity for Arkansas geographies",
    "Public-media, nonprofit, cooperative, and voucher/subsidy proposals — successes and failures",
    "NJ CIC and peer state experiments: independence in practice vs statute",
    "First Amendment and anti-retaliation constraints on public support designs",
    "Whether more local reporting measurably changes government behavior, participation, trust, or economic decisions",
    "Rural radio and university partnership evidence",
    "Advertising economics and platform intermediation",
    "Whether citizen credits worsen sensationalism or partisan capture",
    "Minimum viable information infrastructure by population scale (1.5k / 15k / 150k)"
  ],
  related_geographies: GEO_IDS,
  geography_research_question:
    "What is the minimum independent information infrastructure necessary for meaningful self-government regardless of whether ~1,500, ~15,000, or ~150,000 people live there?",
  sie_modeling_note:
    "Eventually candidate Systems Intelligence Engine variable linking government accountability, business competition, education, civic participation, corruption risk, community identity, and prosperity — modeling only after evidence, not doctrine.",
  not_in_this_slice: [
    "New constitutional principle",
    "Doctrine expansion",
    "Specified Civic Information Credit dollar amounts",
    "Arkansas legislation draft",
    "Government newsroom proposal",
    "Invented news-desert scores for AR geographies",
    "Claim that local journalism causally improves prosperity (untested here)",
    "Canonical ownership mandates"
  ],
  sources_seed: ["CC-SRC-144", "CC-SRC-145", "CC-SRC-146", "CC-SRC-147", "CC-SRC-148"],
  last_updated: TODAY
};

const hypRegistry = {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  status: "RESEARCH_HYPOTHESES_NOT_DOCTRINE",
  module_id: MOD_ID,
  hypotheses: [
    {
      hypothesis_id: HYP_PARENT,
      text:
        "A decentralized, technologically adaptive and independently governed local journalism ecosystem—supported through a mix of market revenue, local ownership, philanthropy and viewpoint-neutral citizen-directed public financing—may increase the quantity and resilience of granular civic reporting without creating governmental control over journalism.",
      epistemic_class: "HYPOTHESIS",
      module_id: MOD_ID,
      not_empirical_proof: true,
      deliberate_falsification: true,
      central_idea_not_principle:
        "Independent local information infrastructure is necessary for meaningful self-government because citizens cannot meaningfully govern institutions they cannot see.",
      obsolete_framing_rejected:
        "Save local newspapers as a business model / create a government newsroom — REJECTED as the research objective. Objective is the public function of journalism across evolving technologies.",
      stronger_research_question:
        "Can viewpoint-neutral public financing + local ownership + shared infrastructure + open public data raise granular civic coverage (councils, boards, courts, utilities, procurement, etc.) without government editorial control?",
      related_geographies: GEO_IDS,
      sources_foundation: ["CC-SRC-144", "CC-SRC-145", "CC-SRC-146", "CC-SRC-147", "CC-SRC-148"],
      governance: {
        decision: "KEEP_AS_HYPOTHESIS",
        adjudicator: ADJUDICATOR,
        decision_id: DECISION_ID,
        reason:
          "Steve-directed foundational institutional research interest under architecture freeze: register as hypothesis module, not principle. Existing comparative models (e.g., NJ CIC) and news-desert literature justify research opening; causal prosperity and Arkansas coverage claims remain unproven."
      },
      empirical_status: "UNTESTED",
      last_updated: TODAY,
      slice_id: SLICE
    },
    {
      hypothesis_id: HYP_PRODUCTIVE,
      text:
        "Independent local information infrastructure is productive civic infrastructure: communities with greater access to sustained, granular, independent reporting may exhibit stronger governmental accountability, civic participation, institutional trust and economic decision-making than otherwise comparable information-poor communities.",
      epistemic_class: "HYPOTHESIS",
      parent_hypothesis_id: HYP_PARENT,
      module_id: MOD_ID,
      not_empirical_proof: true,
      deliberate_falsification: true,
      note:
        "Some relationships have existing scholarship; others need qualification. Do not promote to claim without sourced magnitudes and contrary evidence.",
      governance: {
        decision: "KEEP_AS_HYPOTHESIS",
        adjudicator: ADJUDICATOR,
        decision_id: DECISION_ID
      },
      empirical_status: "UNTESTED",
      last_updated: TODAY,
      slice_id: SLICE
    },
    {
      hypothesis_id: HYP_CREDITS,
      text:
        "A viewpoint-neutral Civic Information Credit (citizen-directed allocation of public journalism support), combined with a minimum civic-information infrastructure floor, may finance journalism capacity while preventing government selection of winners, editorial control, or retaliation—subject to tested failure modes (popularity capture, sensationalism, equity gaps, coordinated partisan allocation).",
      epistemic_class: "HYPOTHESIS",
      parent_hypothesis_id: HYP_PARENT,
      module_id: MOD_ID,
      not_empirical_proof: true,
      deliberate_falsification: true,
      modeling_note: "Dollar amounts are modeling variables only — not proposed in this slice.",
      governance: {
        decision: "KEEP_AS_HYPOTHESIS",
        adjudicator: ADJUDICATOR,
        decision_id: DECISION_ID
      },
      empirical_status: "UNTESTED",
      last_updated: TODAY,
      slice_id: SLICE
    },
    {
      hypothesis_id: HYP_SHARED,
      text:
        "Regional shared-services cooperatives among locally owned newsrooms can reduce fixed costs of legal/FOIA, data, video, investigative specialty, technology, and back-office functions while preserving decentralized reporters, editorial independence, and community ownership—unlike distant corporate consolidation of newsrooms.",
      epistemic_class: "HYPOTHESIS",
      parent_hypothesis_id: HYP_PARENT,
      module_id: MOD_ID,
      not_empirical_proof: true,
      deliberate_falsification: true,
      governance: {
        decision: "KEEP_AS_HYPOTHESIS",
        adjudicator: ADJUDICATOR,
        decision_id: DECISION_ID
      },
      empirical_status: "UNTESTED",
      last_updated: TODAY,
      slice_id: SLICE
    }
  ]
};

const newRQs = [
  {
    id: "CC-RQ-P21-053",
    domain: "civic_information_journalism",
    question:
      "Map Arkansas local-news ownership, closures, and substitute outlets (print/radio/digital/nonprofit) for designated geographies without inventing desert scores.",
    status: "open",
    related_hypothesis: HYP_PARENT,
    related_module: MOD_ID,
    slice_id: SLICE
  },
  {
    id: "CC-RQ-P21-054",
    domain: "civic_information_journalism",
    question:
      "Compare NJ Civic Information Consortium statutory firewalls and practice against citizen-directed voucher proposals and public-media models.",
    status: "open",
    related_hypothesis: HYP_CREDITS,
    related_module: MOD_ID,
    slice_id: SLICE,
    related_sources: ["CC-SRC-144", "CC-SRC-145"]
  },
  {
    id: "CC-RQ-P21-055",
    domain: "civic_information_journalism",
    question:
      "Identify First Amendment and anti-retaliation constraints on any public support for journalism; catalog failure modes of viewpoint-neutral designs.",
    status: "open",
    related_hypothesis: HYP_CREDITS,
    related_module: MOD_ID,
    slice_id: SLICE
  },
  {
    id: "CC-RQ-P21-056",
    domain: "civic_information_journalism",
    question:
      "What evidence exists that increased granular local reporting changes government behavior, participation, trust, or economic decisions — and what contrary findings qualify that claim?",
    status: "open",
    related_hypothesis: HYP_PRODUCTIVE,
    related_module: MOD_ID,
    slice_id: SLICE
  },
  {
    id: "CC-RQ-P21-057",
    domain: "civic_information_journalism",
    question:
      "Design and pilot a coverage dashboard metric: share of local public-power institutions receiving meaningful independent scrutiny (vs newspaper-presence binary).",
    status: "open",
    related_hypothesis: HYP_PARENT,
    related_module: MOD_ID,
    slice_id: SLICE
  },
  {
    id: "CC-RQ-P21-058",
    domain: "civic_information_journalism",
    question:
      "Evaluate regional shared-services co-op models vs corporate consolidation on cost, independence, and rural coverage resilience.",
    status: "open",
    related_hypothesis: HYP_SHARED,
    related_module: MOD_ID,
    slice_id: SLICE
  },
  {
    id: "CC-RQ-P21-059",
    domain: "civic_information_journalism",
    question:
      "What minimum independent information infrastructure is necessary for meaningful self-government at approximately 1,500 / 15,000 / 150,000 population scales (using Arkansas designated geographies as contrasts)?",
    status: "open",
    related_hypothesis: HYP_PARENT,
    related_module: MOD_ID,
    slice_id: SLICE,
    related_geographies: GEO_IDS
  }
];

for (const q of newRQs) {
  if (!rqDoc.questions.some((x) => x.id === q.id)) rqDoc.questions.push(q);
}
rqDoc.last_updated = TODAY;

// Geography annotations
geoSet.version = "1.3.0";
geoSet.slice_id = SLICE;
geoSet.last_civic_information_note =
  "Journalism/civic-information contrast set: Searcy & Lafayette (extreme rural), West Helena (distressed Delta), Benton & Pulaski (larger markets), Jacksonville (municipal). Preference sampling only — not LCL field launch.";
for (const loc of geoSet.locations) {
  if (GEO_IDS.includes(loc.id)) {
    loc.civic_information_research = {
      module_id: MOD_ID,
      related_hypothesis: HYP_PARENT,
      role:
        loc.id.includes("SEARCY") || loc.id.includes("LAFAYETTE")
          ? "extreme_rural_information_economics"
          : loc.id.includes("WEST-HELENA")
            ? "distressed_delta_information_economics"
            : loc.id.includes("JACKSONVILLE")
              ? "municipal_information_market"
              : "larger_information_market",
      note: "Candidate contrast geography for Local Information Commons research — not a field assignment."
    };
  }
}

// Knowledge graph
const maxKg = Math.max(
  ...kgDoc.nodes.map((n) => parseInt(String(n.node_id).replace("CC-KG-", ""), 10)).filter(Number.isFinite)
);
let kgN = maxKg;
function addNode(label, kind, related_id) {
  kgN += 1;
  const id = `CC-KG-${String(kgN).padStart(3, "0")}`;
  if (!kgDoc.nodes.some((n) => n.related_id === related_id && n.label === label)) {
    kgDoc.nodes.push({
      node_id: id,
      label,
      kind,
      related_id,
      slice_id: SLICE
    });
  }
  return id;
}
addNode("Local Independent Journalism Module", "module", MOD_ID);
addNode("Local Independent Journalism Ecosystem Hypothesis", "hypothesis", HYP_PARENT);
addNode("Civic Information as Productive Infrastructure", "hypothesis", HYP_PRODUCTIVE);
addNode("Citizen-Directed Journalism Allocation Hypothesis", "hypothesis", HYP_CREDITS);
addNode("Regional Newsroom Shared Services Hypothesis", "hypothesis", HYP_SHARED);
addNode("NJ Civic Information Consortium Statute", "source", "CC-SRC-144");
kgDoc.last_updated = TODAY;

// Public reasoning (RESEARCH_ANSWER records — not claim rewrites)
const prEntries = [
  {
    record_id: "CC-PR-019",
    change_type: "RESEARCH_ANSWER",
    decision: "APPROVE",
    decision_id: DECISION_ID,
    adjudicator: ADJUDICATOR,
    decided_at: TODAY,
    skeptical_reader_question: "Is Constitutional Capitalism proposing a government newspaper?",
    public_answer:
      "No. We are researching how communities can sustain independent civic reporting. The design constraint under study is the opposite of a government newsroom: public money, if any, must not let government choose winners, dictate coverage, or punish critics.",
    what_we_originally_said: "Journalism matters to prosperity and self-government.",
    what_made_us_question_it:
      "Risk of being misread as state media, or of collapsing the idea into 'save newspapers.'",
    what_we_learned:
      "Foundational institutional interest can be registered as a research module without adding a principle during freeze.",
    where_our_reasoning_was_weak: "Under-specified firewalls and financing mechanisms.",
    what_we_now_say:
      "Registered research module CC-MOD-LOCAL-INDEPENDENT-JOURNALISM-AND-CIVIC-INFORMATION-INFRASTRUCTURE — hypothesis only, not a principle and not a funding bill.",
    why_we_made_that_decision: "Architecture/doctrine freeze + Steve research direction.",
    what_we_still_dont_know:
      "Whether citizen-directed credits, nonprofit models, cooperatives, or shared services can raise granular coverage without capture or retaliation.",
    what_else_this_could_affect: [
      "Community Prosperity / local ownership pathways",
      "Public-data and transparency agendas",
      "SIE variable set (future modeling only)"
    ],
    potential_secondary_effects_or_unintended_consequences: [
      "Readers may assume a near-term voucher program exists — it does not",
      "Public financing talk may scare First Amendment skeptics unless firewalls are foregrounded"
    ],
    what_evidence_could_change_our_mind_again:
      "Strong evidence that any public financing inevitably produces editorial capture — or conversely, replicated independence under well-designed funds."
  },
  {
    record_id: "CC-PR-020",
    change_type: "RESEARCH_ANSWER",
    decision: "APPROVE",
    decision_id: DECISION_ID,
    adjudicator: ADJUDICATOR,
    decided_at: TODAY,
    skeptical_reader_question: "Why not just 'save the local newspaper'?",
    public_answer:
      "Because the public function is independent civic information — not any one printing business. Technologies change. We care whether councils, boards, courts, utilities, and budgets receive meaningful scrutiny.",
    what_we_originally_said: "Local newspapers are collapsing.",
    what_made_us_question_it:
      "Form-privilege (newspapers) can miss radio, nonprofit digital, cooperatives, and future channels.",
    what_we_learned:
      "Protect production and distribution of independent civic information; measure institutional coverage, not logo survival alone.",
    where_our_reasoning_was_weak: "Business-model nostalgia vs public-function clarity.",
    what_we_now_say:
      "Research target is a Local Information Commons across formats; newspapers are one historical vehicle.",
    why_we_made_that_decision: "Technology-adaptive requirement in the research brief.",
    what_we_still_dont_know:
      "Arkansas geography-specific coverage dashboards and substitute-outlet maps.",
    what_else_this_could_affect: ["Metrics for news deserts", "Ownership pathway design"],
    potential_secondary_effects_or_unintended_consequences: [
      "Legacy publishers may hear indifference to newspapers — clarify: public function may include newspapers without constitutionalizing the form"
    ],
    what_evidence_could_change_our_mind_again:
      "Evidence that a particular form is uniquely necessary for accountability at local scale."
  },
  {
    record_id: "CC-PR-021",
    change_type: "RESEARCH_ANSWER",
    decision: "APPROVE",
    decision_id: DECISION_ID,
    adjudicator: ADJUDICATOR,
    decided_at: TODAY,
    skeptical_reader_question: "Would citizen journalism credits just reward sensationalism?",
    public_answer:
      "That is a named failure mode we intend to test — along with popularity capture, equity gaps, and coordinated political allocation. A minimum civic-information floor for courthouse-level coverage is part of the research design space precisely because popularity alone may fail.",
    what_we_originally_said: "Citizen allocation can diffuse funding power away from politicians.",
    what_made_us_question_it: "Public-choice and attention-economy risks.",
    what_we_learned: "Diffusion ≠ automatic public-service reporting.",
    where_our_reasoning_was_weak: "Under-weighting demand-side distortions.",
    what_we_now_say:
      "Hypothesis CC-HYP-CITIZEN-DIRECTED-JOURNALISM-ALLOCATION remains UNTESTED; dollar amounts are modeling variables only.",
    why_we_made_that_decision: "Falsify deliberately before any proposal.",
    what_we_still_dont_know:
      "Empirical performance of voucher-like designs versus consortium grants and nonprofit philanthropy.",
    what_else_this_could_affect: ["Floor vs voucher mix", "Eligibility administration design"],
    potential_secondary_effects_or_unintended_consequences: [
      "Partisan mobilization of credits",
      "Rural under-allocation relative to metros"
    ],
    what_evidence_could_change_our_mind_again:
      "Field or quasi-experimental evidence on allocation patterns and coverage of tedious public institutions."
  }
];

prDoc.slice_id = SLICE;
prDoc.generated_at = TODAY;
prDoc.version = "0.5.0";
for (const e of prEntries) {
  if (!prDoc.records.some((x) => x.record_id === e.record_id)) prDoc.records.push(e);
}

for (const e of prEntries) {
  writeText(
    `reports/public_reasoning/${e.record_id}.md`,
    `# ${e.record_id} - ${e.skeptical_reader_question}

## Public answer

${e.public_answer}

## What we now say

${e.what_we_now_say}

## What we still don't know

${e.what_we_still_dont_know}
`
  );
}

writeText(
  "reports/CC_LOCAL_INDEPENDENT_JOURNALISM_CIVIC_INFORMATION_RESEARCH_HYPOTHESIS_1_0.md",
  `# Local Independent Journalism & Civic Information Infrastructure — Research Hypothesis 1.0

**Status:** RESEARCH HYPOTHESIS — not doctrine, not a new principle  
**Module:** \`${MOD_ID}\`  
**Slice:** \`${SLICE}\`  
**Architecture freeze:** compliant (hypothesis registration only)

## Central research idea (not canonized principle)

> A prosperous self-governing community requires independent local information infrastructure. Citizens cannot meaningfully govern institutions they cannot see.

## Parent hypothesis

\`${HYP_PARENT}\`

${hypRegistry.hypotheses[0].text}

## Child hypotheses

- \`${HYP_PRODUCTIVE}\` — productive civic infrastructure claim (UNTESTED)
- \`${HYP_CREDITS}\` — citizen-directed Civic Information Credit + infrastructure floor (modeling variables only; no dollar proposal)
- \`${HYP_SHARED}\` — regional shared-services co-op vs corporate consolidation

## Design constraint under research

Government may help finance journalism but must not control which journalism receives support, what it covers, or what it says.

**Citizens allocate. Journalists report. Government cannot choose winners or punish critics.**

## Comparative seeds

- New Jersey Civic Information Consortium (CC-SRC-144, CC-SRC-145)
- Nonprofit journalism pathway via 501(c)(3) (CC-SRC-148)
- News-desert / local-news research programs (CC-SRC-146, CC-SRC-147)

## Geographies (contrast preference)

Searcy County, Lafayette County, West Helena, Benton County, Pulaski County, Jacksonville.

## Explicit non-goals this slice

No new principle; no legislation; no credit dollar amounts; no invented Arkansas desert scores; no government newsroom.
`
);

writeText(
  "reports/CC_PHASE_2_1_LOCAL_INDEPENDENT_JOURNALISM_CIVIC_INFORMATION_MODULE_1_0_RETURN.md",
  `# ${SLICE} — Return

## 1. Executive Summary

Registered **${MOD_ID}** and parent hypothesis **${HYP_PARENT}** as research under architecture/doctrine freeze — **not a new principle**. Seeded comparative sources CC-SRC-144–148 (NJ CIC; Pew local-news hub; UNC news deserts project; 501(c)(3)). Opened child hypotheses on productive infrastructure, citizen-directed credits, and regional shared services. Public reasoning CC-PR-019–021. No invented dollars; no coverage scores; no doctrine.

**Sources: ${srcDoc.sources.length}** · **Hypotheses: UNTESTED** · **PR: CC-PR-019–021**

## 2. Mission / Scope

Hypothesis registration and research agenda for a Local Information Commons / independent civic journalism ecosystem.

## 3. Hypotheses

| ID | Status |
|---|---|
| ${HYP_PARENT} | KEEP_AS_HYPOTHESIS / UNTESTED |
| ${HYP_PRODUCTIVE} | KEEP_AS_HYPOTHESIS / UNTESTED |
| ${HYP_CREDITS} | KEEP_AS_HYPOTHESIS / UNTESTED |
| ${HYP_SHARED} | KEEP_AS_HYPOTHESIS / UNTESTED |

## 4. Sources Added

CC-SRC-144–148

## 5. Research Questions

CC-RQ-P21-053 through CC-RQ-P21-059 OPEN

## 6. Geographies

Annotated designated set v1.3 for journalism contrasts (6 locations).

## 7. What Remains Unknown

Arkansas outlet maps; coverage dashboards; causal effects; credit design performance; firewall effectiveness in practice.

## 8. Next Slice Candidates

Primary remains livestock/Clinton track unless Steve prioritizes journalism evidence pass:  
\`CC-PHASE-2.1-AR-LOCAL-NEWS-OUTLET-MAP-AND-COVERAGE-DASHBOARD-PILOT-1.0\`  
or deepen NJ CIC / voucher comparative dossier.

## 9. Freeze compliance

No principle added. Infrastructure freeze respected (research module only).
`
);

// Slice queue
sliceQueue.last_updated = TODAY;
sliceQueue.active_slice =
  "CC-PHASE-2.1-CLINTON-HUB-FSIS-TEST-AND-AR-ESTABLISHMENT-CAPACITY-MAP-1.0";
if (!sliceQueue.slices.some((x) => x.slice_id === SLICE)) {
  sliceQueue.slices.push({
    slice_id: SLICE,
    title: "Local Independent Journalism & Civic Information Module Registration",
    status: "completed",
    completed_at: TODAY,
    completion_evidence: [
      MOD_ID,
      HYP_PARENT,
      HYP_PRODUCTIVE,
      HYP_CREDITS,
      HYP_SHARED,
      "CC-SRC-144–148",
      "CC-PR-019–021",
      "CC-RQ-P21-053–059",
      "geography set v1.3 journalism annotations"
    ],
    next_recommended_slice:
      "CC-PHASE-2.1-CLINTON-HUB-FSIS-TEST-AND-AR-ESTABLISHMENT-CAPACITY-MAP-1.0",
    alternate_next: [
      "CC-PHASE-2.1-AR-LOCAL-NEWS-OUTLET-MAP-AND-COVERAGE-DASHBOARD-PILOT-1.0",
      "CC-PHASE-2.1-NJ-CIC-AND-JOURNALISM-VOUCHER-COMPARATIVE-DOSSIER-1.0",
      "CC-PHASE-2.1-AR-STC-CENTER-LEVEL-DATA-REQUEST-AND-OSD-ANNUAL-REPORT-HARVEST-1.0"
    ],
    note: "Hypothesis registration only. Not a principle. No invented credit dollars."
  });
}

Object.assign(buildState, {
  version: "0.4.8",
  last_updated: TODAY,
  mission_id: SLICE,
  slice_return:
    "reports/CC_PHASE_2_1_LOCAL_INDEPENDENT_JOURNALISM_CIVIC_INFORMATION_MODULE_1_0_RETURN.md",
  writing_focus:
    "Registered Local Information Commons / independent journalism as RESEARCH HYPOTHESIS module under freeze — not principle. Sources 144–148. Credits = modeling variables only.",
  next_action:
    "Continue Clinton/FSIS capacity map OR journalism outlet-map/coverage-dashboard pilot if Steve prioritizes civic information.",
  sources_registered: srcDoc.sources.length,
  arkansas_geography_set: "ACTIVE_11_LOCATIONS_V1_3_JOURNALISM_ANNOTATED",
  journalism_module: MOD_ID,
  journalism_hypothesis: HYP_PARENT,
  infrastructure_freeze: true,
  doctrine_freeze: buildState.doctrine_freeze
});

writeJson("data/project/latest_cursor_return.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  summary:
    "Registered Local Independent Journalism / Civic Information Infrastructure as research module+hypotheses under architecture freeze (not a principle). Seeded NJ CIC and news-desert bibliography CC-SRC-144–148; CC-PR-019–021; RQs 053–059.",
  module_id: MOD_ID,
  primary_hypothesis: HYP_PARENT,
  empirical_status: "UNTESTED",
  sources_registered: srcDoc.sources.length,
  doctrine_expanded: false,
  principle_added: false,
  return_path:
    "reports/CC_PHASE_2_1_LOCAL_INDEPENDENT_JOURNALISM_CIVIC_INFORMATION_MODULE_1_0_RETURN.md"
});

writeJson("research/phase_2/local_independent_journalism_civic_information_module.json", moduleDoc);
writeJson("research/phase_2/civic_information_research_hypothesis_registry.json", hypRegistry);
writeJson("data/research/source_registry.json", srcDoc);
writeJson("data/research/research_questions.json", rqDoc);
writeJson("data/research/knowledge_graph.json", kgDoc);
writeJson("research/phase_2/public_reasoning_registry.json", prDoc);
writeJson("research/phase_2/arkansas_designated_research_geography_set.json", geoSet);
writeJson("data/project/slice_queue.json", sliceQueue);
writeJson("data/project/current_build_state.json", buildState);

console.log("[DONE]", SLICE, "sources=", srcDoc.sources.length);
