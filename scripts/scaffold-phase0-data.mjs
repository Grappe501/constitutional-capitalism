/**
 * Phase 0 scaffold generator — creates canonical structured data,
 * manuscript placeholders, schemas, and seed records.
 * Run once from repo root after H:-only env is loaded.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const TODAY = "2026-08-04";

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function writeJson(rel, data) {
  const full = path.join(ROOT, rel);
  ensureDir(path.dirname(full));
  fs.writeFileSync(full, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log("wrote", rel);
}

function writeText(rel, content) {
  const full = path.join(ROOT, rel);
  ensureDir(path.dirname(full));
  fs.writeFileSync(full, content, "utf8");
  console.log("wrote", rel);
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// --- Book identity ---
const bookIdentity = {
  title: "Constitutional Capitalism",
  subtitle: "Restoring Prosperity Through Constitutional Principles",
  short_title: "Constitutional Capitalism",
  philosophy_name: "Constitutional Capitalism",
  canonical_definition:
    "Constitutional Capitalism is an economic philosophy in which free markets, private property, entrepreneurship, and innovation are protected by constitutional principles that ensure economic power remains accountable to the people. It recognizes that wealth is most effectively created through free enterprise, but that lasting prosperity depends upon broad opportunity, meaningful competition, responsible ownership, and institutions that prevent the excessive concentration of economic or political power.",
  central_belief:
    "The purpose of an economy is not merely to create wealth, but to create a prosperous, free, and self-governing people.",
  working_author: "Steve Grappe",
  public_byline: null,
  public_byline_note:
    "Public byline remains configurable. Working author field identifies project creator only. Final author byline is an open decision.",
  project_creator: "Steve Grappe",
  project_status: "foundation",
  publication_intent: "public_free_distribution",
  public_availability_commitment:
    "The finished book is intended to be freely available to the public. Licensing decision remains open pending Steve's approval.",
  version: "0.1.0-phase0",
  last_updated: TODAY,
};

writeJson("data/project/book_identity.json", bookIdentity);

// --- Book structure ---
const frontMatter = [
  { number: null, title: "Title Page", section: "front-matter", order: 1 },
  { number: null, title: "Dedication", section: "front-matter", order: 2 },
  { number: null, title: "A Note to the Reader", section: "front-matter", order: 3 },
  {
    number: null,
    title: "Preface: Why This Book Is Being Given Away",
    section: "front-matter",
    order: 4,
  },
  {
    number: null,
    title: "The Definition of Constitutional Capitalism",
    section: "front-matter",
    order: 5,
  },
  { number: null, title: "The Central Proposition", section: "front-matter", order: 6 },
  { number: null, title: "How to Read This Book", section: "front-matter", order: 7 },
];

const parts = [
  {
    id: "CC-PART-01",
    number: 1,
    title: "Why We Need Something New",
    dir: "part-01",
    chapters: [
      "The Promise of Free Enterprise",
      "When Success Creates New Problems",
      "The Great Economic Disconnect",
      "The Concentration of Wealth and Power",
      "What Happened to the Common Worker?",
      "When Communities Lose Their Economic Center",
      "The Constitutional Question",
    ],
  },
  {
    id: "CC-PART-02",
    number: 2,
    title: "First Principles",
    dir: "part-02",
    chapters: [
      "The Purpose of an Economy",
      "The Dignity of Work",
      "The Rights of the Individual",
      "The Responsibilities of Ownership",
      "Competition Protects Liberty",
      "Local Communities Matter",
      "Markets Require Rules",
      "Power Naturally Concentrates",
      "Government Must Be Limited and Capable",
      "Prosperity Must Be Broadly Rooted",
      "Ownership Is the Foundation of Economic Freedom",
    ],
  },
  {
    id: "CC-PART-03",
    number: 3,
    title: "The Economic Constitution",
    dir: "part-03",
    chapters: [
      "A Constitution for Economic Power",
      "Article I: Individual Economic Rights",
      "Article II: The Rights and Duties of Workers",
      "Article III: The Rights and Duties of Owners",
      "Article IV: The Responsibilities of Corporations",
      "Article V: Fair and Open Markets",
      "Article VI: Competition and Monopoly",
      "Article VII: Broad-Based Ownership",
      "Article VIII: Communities and Local Economies",
      "Article IX: The Proper Role of Government",
      "Article X: Accountability, Transparency, and Enforcement",
      "Article XI: Future Generations and the National Inheritance",
      "Article XII: Amendment and Adaptation",
    ],
  },
  {
    id: "CC-PART-04",
    number: 4,
    title: "Rebuilding the System",
    dir: "part-04",
    chapters: [
      "Taxing Wealth Creation Without Taxing Survival",
      "Moving the Burden Away from Ordinary Work",
      "The Corporate Social Contribution",
      "Destination-Based Corporate Taxation",
      "Internet Commerce and Equal Taxation",
      "Restoring Local Purchasing",
      "Worker Ownership and Employee Trusts",
      "Profit Sharing as an Economic Right",
      "Executive Compensation and Corporate Accountability",
      "Stock Buybacks and Financial Extraction",
      "Banking for Productive Communities",
      "Community Investment and Public Banking",
      "Small Business as Civic Infrastructure",
      "Labor, Benefits, and the Future of Work",
      "Education for Ownership and Citizenship",
      "Housing and the Geography of Opportunity",
      "Healthcare and Economic Freedom",
      "Retirement and Shared National Prosperity",
      "Trade Without Abandoning the Nation",
      "Corporate Relocation and Market Access",
      "Rebuilding Communities After Corporate Exit",
      "Agriculture, Land, and Resource Stewardship",
      "Infrastructure as Shared Capital",
      "Energy, Natural Resources, and Economic Rents",
      "Technology, Automation, and Artificial Intelligence",
      "The Social Wealth Fund",
      "A New Measure of National Prosperity",
    ],
  },
  {
    id: "CC-PART-05",
    number: 5,
    title: "Protecting the Republic",
    dir: "part-05",
    chapters: [
      "When Economic Power Becomes Political Power",
      "Campaign Finance and Corporate Influence",
      "Lobbying, Transparency, and Regulatory Capture",
      "Antitrust as a Constitutional Safeguard",
      "Information Power, Media, and Digital Platforms",
      "Democratic Participation in Economic Governance",
      "The Balance Between National Standards and Local Control",
    ],
  },
  {
    id: "CC-PART-06",
    number: 6,
    title: "The Transition",
    dir: "part-06",
    chapters: [
      "Reform Without Revolution",
      "What Must Change First",
      "What Must Not Be Broken",
      "A Ten-Year Transition Framework",
      "Protecting Workers During the Transition",
      "Protecting Small Businesses During the Transition",
      "Preventing Capital Flight",
      "International Adoption and National Adaptation",
      "Testing, Measurement, and Constitutional Review",
      "How Constitutional Capitalism Can Fail",
      "Safeguards Against Corruption and Capture",
    ],
  },
  {
    id: "CC-PART-07",
    number: 7,
    title: "The Future",
    dir: "part-07",
    chapters: [
      "The Family in a Prosperous Republic",
      "The Rebirth of Local Communities",
      "A Nation of Owners",
      "Technology That Serves the People",
      "A New Social Compact Without Centralized Control",
      "What We Owe the Next Generation",
      "The Prosperous, Free, and Self-Governing People",
    ],
  },
];

const closing = [
  "The Declaration of Constitutional Capitalism",
  "The Proposed Economic Articles",
  "A Citizen’s Summary",
  "A Policymaker’s Implementation Guide",
  "Glossary",
  "Sources and Notes",
  "Index",
  "Invitation to Continue the Work",
];

const chapters = [];
let chapterNumber = 0;
let idCounter = 1;

function addChapter({ title, partId, partTitle, section, dir, number, order }) {
  const chapterId = `CC-CH-${String(idCounter).padStart(3, "0")}`;
  idCounter += 1;
  const fileSlug = `${String(order).padStart(2, "0")}-${slugify(title)}.md`;
  const relPath = `content/manuscript/${dir}/${fileSlug}`;
  const record = {
    chapter_id: chapterId,
    title,
    part_id: partId,
    part_title: partTitle,
    section,
    chapter_number: number,
    order,
    status: "concept",
    public_status: "hidden",
    summary: "",
    central_question: "",
    core_claims: [],
    research_requirements: [],
    source_ids: [],
    word_count_target: number ? 2500 : 1200,
    current_word_count: 0,
    review_status: "unreviewed",
    research_readiness: 0,
    editorial_readiness: 0,
    file: relPath,
    last_updated: TODAY,
  };
  chapters.push(record);

  const md = `---
chapter_id: ${chapterId}
title: "${title.replace(/"/g, '\\"')}"
part_id: ${partId ?? "null"}
chapter_number: ${number ?? "null"}
status: concept
public_status: hidden
summary: ""
central_question: ""
core_claims: []
research_requirements: []
source_ids: []
word_count_target: ${record.word_count_target}
current_word_count: 0
review_status: unreviewed
last_updated: ${TODAY}
---

# ${title}

> **Status:** Concept placeholder — not a finished chapter.  
> **Stable ID:** \`${chapterId}\` (reorder-safe)

## Purpose

This chapter exists in the master architecture as a planned unit of the book. Its title and placement are initial and may change without breaking the stable chapter ID.

## Opening Note

*Constitutional Capitalism* is being built as an auditable public project. This file is a structural placeholder created during Phase 0 foundation work. Substantive drafting belongs to later phases after definition, principles, research, and claim discipline are established.

## Questions This Chapter Must Eventually Answer

1. What is the central claim of this chapter?
2. What evidence would make that claim credible?
3. What honest objections must be answered?
4. How does this chapter advance the book’s central belief: that the purpose of an economy is to create a prosperous, free, and self-governing people?

## Research Requirements

- [ ] Identify primary claims that will require sources
- [ ] Distinguish established facts from working hypotheses
- [ ] Note constitutional, legal, and economic open questions
- [ ] Record related chapters for continuity

## Editorial Note

Do not present this page publicly as finished content. Public status remains \`hidden\` until substantive drafting and review standards are met.
`;
  writeText(relPath, md);
}

frontMatter.forEach((item) => {
  addChapter({
    title: item.title,
    partId: null,
    partTitle: "Front Matter",
    section: "front-matter",
    dir: "front-matter",
    number: null,
    order: item.order,
  });
});

parts.forEach((part) => {
  part.chapters.forEach((title, idx) => {
    chapterNumber += 1;
    addChapter({
      title,
      partId: part.id,
      partTitle: part.title,
      section: part.dir,
      dir: part.dir,
      number: chapterNumber,
      order: idx + 1,
    });
  });
});

closing.forEach((title, idx) => {
  chapterNumber += 1;
  addChapter({
    title,
    partId: "CC-PART-CLOSE",
    partTitle: "Closing Materials",
    section: "closing",
    dir: "closing",
    number: chapterNumber,
    order: idx + 1,
  });
});

const bookStructure = {
  version: "0.1.0",
  last_updated: TODAY,
  note: "Initial master architecture. Chapter titles are not permanently fixed. Stable chapter_id values survive reordering.",
  identity_ref: "data/project/book_identity.json",
  front_matter: frontMatter.map((f, i) => chapters[i].chapter_id),
  parts: parts.map((p) => ({
    part_id: p.id,
    number: p.number,
    title: p.title,
    dir: p.dir,
    chapter_ids: chapters
      .filter((c) => c.part_id === p.id)
      .map((c) => c.chapter_id),
  })),
  closing: {
    part_id: "CC-PART-CLOSE",
    title: "Closing Materials",
    chapter_ids: chapters.filter((c) => c.section === "closing").map((c) => c.chapter_id),
  },
  chapters,
  totals: {
    architectural_units: chapters.length,
    numbered_chapters: chapters.filter((c) => c.chapter_number != null).length,
    front_matter_units: frontMatter.length,
    closing_units: closing.length,
  },
};

writeJson("data/manuscript/book_structure.json", bookStructure);
writeJson("data/manuscript/chapters_index.json", {
  version: "0.1.0",
  last_updated: TODAY,
  chapters: chapters.map((c) => ({
    chapter_id: c.chapter_id,
    title: c.title,
    part_id: c.part_id,
    chapter_number: c.chapter_number,
    status: c.status,
    public_status: c.public_status,
    file: c.file,
    word_count_target: c.word_count_target,
    current_word_count: c.current_word_count,
  })),
});

// --- Principles ---
const principles = [
  "Free enterprise creates wealth most effectively when opportunity is broad and competition is real.",
  "Private property and responsible ownership are foundations of economic freedom.",
  "The dignity of work is central to a free and self-governing people.",
  "Markets require rules that protect liberty, competition, and accountability.",
  "Economic power naturally concentrates and must be constitutionally constrained.",
  "Local communities are essential economic and civic centers.",
  "Government must be limited in scope and capable in legitimate functions.",
  "Prosperity must be broadly rooted, not merely aggregated at the top.",
  "Corporations are powerful institutions that carry public responsibilities when they exercise public-scale power.",
  "Democratic self-government requires that economic power remain accountable to the people.",
];

writeJson("data/project/principles.json", {
  version: "0.1.0",
  last_updated: TODAY,
  status: "initial_working_set",
  note: "Initial first principles for Phase 0–1 development. Not final doctrine until approved.",
  principles: principles.map((text, i) => ({
    id: `CC-PRIN-${String(i + 1).padStart(2, "0")}`,
    text,
    status: "draft",
    related_chapters: [],
  })),
});

// --- Policy pillars ---
const pillarNames = [
  "Constitutional limits on economic power",
  "Broad-based ownership",
  "Taxation and public revenue",
  "Corporate responsibility",
  "Worker prosperity",
  "Fair competition",
  "Local economic resilience",
  "Banking and productive capital",
  "Internet commerce",
  "Trade and market access",
  "Technology and artificial intelligence",
  "Democratic accountability",
  "Intergenerational prosperity",
  "Transition and implementation",
  "Measurement and constitutional review",
];

writeJson("data/project/policy_pillars.json", {
  version: "0.1.0",
  last_updated: TODAY,
  pillars: pillarNames.map((name, i) => ({
    id: `CC-PILLAR-${String(i + 1).padStart(2, "0")}`,
    title: name,
    description: `Policy development pillar: ${name}.`,
    maturity_percent: 5,
    status: "seeded",
    proposal_ids: [],
  })),
});

writeJson("data/project/policy_proposals.json", {
  version: "0.1.0",
  last_updated: TODAY,
  note: "Seed proposals only. No economic modeling or legal conclusions claimed.",
  proposals: [
    {
      proposal_id: "CC-PROP-001",
      title: "Destination-Based Corporate Taxation Exploration",
      description:
        "Explore whether corporate tax can be structured around destination of sales to reduce profit-shifting incentives.",
      problem_addressed: "Cross-border profit shifting and unequal treatment of local vs remote commerce",
      principle_served: "CC-PRIN-04",
      beneficiaries: ["domestic workers", "local businesses", "tax base integrity"],
      likely_opposition: ["multinational tax planners", "jurisdictions benefiting from profit shifting"],
      economic_risks: ["pass-through to consumers", "implementation complexity", "trade friction"],
      constitutional_questions: ["federal vs state authority", "commerce clause implications"],
      legal_questions: ["WTO/trade-law compatibility", "administrative feasibility"],
      implementation_level: "national_with_state_coordination",
      fiscal_questions: ["revenue neutrality", "transition scoring"],
      research_status: "queued",
      book_chapters: ["CC-CH-035", "CC-CH-036"],
      current_recommendation: "research_required",
      maturity_percentage: 5,
    },
    {
      proposal_id: "CC-PROP-002",
      title: "Worker Ownership Expansion Pathways",
      description:
        "Evaluate employee trusts, ESOP-like structures, and profit-sharing rights as ownership expansion tools.",
      problem_addressed: "Narrow ownership of productive capital",
      principle_served: "CC-PRIN-08",
      beneficiaries: ["workers", "communities", "long-term firm stewardship"],
      likely_opposition: ["incumbent control interests", "short-term financial extractors"],
      economic_risks: ["governance complexity", "capital access frictions"],
      constitutional_questions: ["property rights design", "compelled ownership structures"],
      legal_questions: ["securities law", "fiduciary duties", "ERISA-like constraints"],
      implementation_level: "national_framework_local_adoption",
      fiscal_questions: ["tax treatment of trusts", "transition credits"],
      research_status: "queued",
      book_chapters: ["CC-CH-038", "CC-CH-039"],
      current_recommendation: "research_required",
      maturity_percentage: 5,
    },
    {
      proposal_id: "CC-PROP-003",
      title: "Equal Taxation of Online and Local Sales",
      description:
        "Develop rules so online and local commerce face comparable tax treatment without unlawful discrimination.",
      problem_addressed: "Structural disadvantage for local retail and Main Street commerce",
      principle_served: "CC-PRIN-06",
      beneficiaries: ["local retailers", "municipal tax bases", "community economies"],
      likely_opposition: ["platforms optimized for tax arbitrage"],
      economic_risks: ["compliance costs for small sellers", "price effects"],
      constitutional_questions: ["dormant commerce clause", "equal protection framing"],
      legal_questions: ["nexus rules", "marketplace facilitator statutes"],
      implementation_level: "state_and_national_coordination",
      fiscal_questions: ["revenue allocation", "administrative cost"],
      research_status: "queued",
      book_chapters: ["CC-CH-036", "CC-CH-037"],
      current_recommendation: "research_required",
      maturity_percentage: 5,
    },
  ],
});

// Constitutional articles
const articleTitles = [
  "Individual Economic Rights",
  "The Rights and Duties of Workers",
  "The Rights and Duties of Owners",
  "The Responsibilities of Corporations",
  "Fair and Open Markets",
  "Competition and Monopoly",
  "Broad-Based Ownership",
  "Communities and Local Economies",
  "The Proper Role of Government",
  "Accountability, Transparency, and Enforcement",
  "Future Generations and the National Inheritance",
  "Amendment and Adaptation",
];

writeJson("data/project/constitutional_articles.json", {
  version: "0.1.0",
  last_updated: TODAY,
  status: "architectural_seed",
  note: "Emerging Articles of Constitutional Capitalism. Not ratified doctrine.",
  preamble_status: "not_drafted",
  articles: articleTitles.map((title, i) => ({
    article_id: `CC-ART-${String(i + 1).padStart(2, "0")}`,
    roman: ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"][i],
    title,
    status: "concept",
    summary: "",
    related_chapter_ids: chapters
      .filter((c) => c.title.includes(`Article ${["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"][i]}:`))
      .map((c) => c.chapter_id),
    maturity_percent: 3,
  })),
});

writeJson("data/project/open_questions.json", {
  version: "0.1.0",
  last_updated: TODAY,
  questions: [
    {
      id: "CC-Q-001",
      question: "How should ordinary labor be taxed under Constitutional Capitalism?",
      domain: "taxation",
      status: "open",
      importance: "critical",
      related_chapters: [],
    },
    {
      id: "CC-Q-002",
      question: "Can corporate taxation replace payroll or income taxation in whole or in part?",
      domain: "taxation",
      status: "open",
      importance: "critical",
    },
    {
      id: "CC-Q-003",
      question: "Who bears corporate taxes economically under plausible incidence models?",
      domain: "taxation",
      status: "open",
      importance: "critical",
    },
    {
      id: "CC-Q-004",
      question: "How can destination-based taxation work in practice?",
      domain: "taxation",
      status: "open",
      importance: "high",
    },
    {
      id: "CC-Q-005",
      question: "How should online and local sales be taxed equally without unlawful discrimination?",
      domain: "internet-commerce",
      status: "open",
      importance: "high",
    },
    {
      id: "CC-Q-006",
      question: "How can local purchasing be encouraged without unlawful discrimination?",
      domain: "community-economics",
      status: "open",
      importance: "high",
    },
    {
      id: "CC-Q-007",
      question: "What market-access rules can apply to relocating corporations?",
      domain: "trade",
      status: "open",
      importance: "high",
    },
    {
      id: "CC-Q-008",
      question: "How can worker ownership be expanded at scale?",
      domain: "ownership",
      status: "open",
      importance: "critical",
    },
    {
      id: "CC-Q-009",
      question: "How should AI productivity gains be shared?",
      domain: "technology-ai",
      status: "open",
      importance: "critical",
    },
    {
      id: "CC-Q-010",
      question: "How can concentrated economic power threaten constitutional democracy?",
      domain: "constitutional-law",
      status: "open",
      importance: "critical",
    },
    {
      id: "CC-Q-011",
      question:
        "How can a transition avoid capital flight, inflation, unemployment, or investment collapse?",
      domain: "transition",
      status: "open",
      importance: "critical",
    },
    {
      id: "CC-Q-012",
      question: "Which elements can be adapted across different constitutional republics?",
      domain: "international-models",
      status: "open",
      importance: "high",
    },
  ],
});

writeJson("data/project/objections.json", {
  version: "0.1.0",
  last_updated: TODAY,
  note: "Seed objections for adversarial development. Not rebutted yet.",
  objections: [
    {
      id: "CC-OBJ-001",
      objection: "This is just conventional capitalism with nicer language.",
      category: "identity",
      status: "open",
      response_status: "not_drafted",
    },
    {
      id: "CC-OBJ-002",
      objection: "This is socialism or Marxism in constitutional clothing.",
      category: "identity",
      status: "open",
      response_status: "not_drafted",
    },
    {
      id: "CC-OBJ-003",
      objection: "Corporate taxes are always passed to workers and consumers.",
      category: "economics",
      status: "open",
      response_status: "not_drafted",
    },
    {
      id: "CC-OBJ-004",
      objection: "Any transition will trigger capital flight and investment collapse.",
      category: "implementation",
      status: "open",
      response_status: "not_drafted",
    },
    {
      id: "CC-OBJ-005",
      objection: "Constitutionalizing economic rules will empower courts and bureaucrats excessively.",
      category: "constitutional",
      status: "open",
      response_status: "not_drafted",
    },
  ],
});

writeJson("data/project/terms_to_define.json", {
  version: "0.1.0",
  last_updated: TODAY,
  terms: [
    { id: "CC-TERM-001", term: "Constitutional Capitalism", status: "draft_definition_exists" },
    { id: "CC-TERM-002", term: "Economic Constitution", status: "needed" },
    { id: "CC-TERM-003", term: "Broad-based ownership", status: "needed" },
    { id: "CC-TERM-004", term: "Corporate social contribution", status: "needed" },
    { id: "CC-TERM-005", term: "Destination-based taxation", status: "needed" },
    { id: "CC-TERM-006", term: "Productive capital", status: "needed" },
    { id: "CC-TERM-007", term: "Economic power", status: "needed" },
    { id: "CC-TERM-008", term: "Local economic center", status: "needed" },
    { id: "CC-TERM-009", term: "Social wealth fund", status: "needed" },
    { id: "CC-TERM-010", term: "Self-governing people", status: "needed" },
  ],
});

// Research registers
writeJson("data/research/source_registry.json", {
  version: "0.1.0",
  last_updated: TODAY,
  note: "No invented citations. Registry is empty of claimed sources in Phase 0.",
  sources: [],
});

writeJson("data/research/claim_ledger.json", {
  version: "0.1.0",
  last_updated: TODAY,
  note: "Claims will be added as drafting proceeds. No fabricated support levels.",
  claims: [],
});

writeJson("data/research/research_questions.json", {
  version: "0.1.0",
  last_updated: TODAY,
  questions: [
    "How should ordinary labor be taxed?",
    "Can corporate taxation replace payroll or income taxation?",
    "Who bears corporate taxes economically?",
    "How can destination-based taxation work?",
    "How should online and local sales be taxed equally?",
    "How can local purchasing be encouraged without unlawful discrimination?",
    "What market-access rules can apply to relocating corporations?",
    "How can worker ownership be expanded?",
    "How should AI productivity gains be shared?",
    "How can concentrated economic power threaten constitutional democracy?",
    "How can a transition avoid capital flight, inflation, unemployment, or investment collapse?",
    "Which elements can be adapted across different constitutional republics?",
  ].map((q, i) => ({
    id: `CC-RQ-${String(i + 1).padStart(3, "0")}`,
    question: q,
    status: "open",
    domain: "multi",
    linked_open_question_id: `CC-Q-${String(i + 1).padStart(3, "0")}`,
  })),
});

writeJson("data/research/fact_check_queue.json", {
  version: "0.1.0",
  last_updated: TODAY,
  queue: [],
  note: "Empty until factual claims are drafted.",
});

writeJson("data/research/expert_review_queue.json", {
  version: "0.1.0",
  last_updated: TODAY,
  queue: [],
  note: "Empty until materials are ready for expert review.",
});

// Research domain READMEs
const researchDomains = [
  "economics",
  "taxation",
  "labor",
  "corporations",
  "ownership",
  "antitrust",
  "banking",
  "internet-commerce",
  "trade",
  "technology-ai",
  "constitutional-law",
  "international-models",
  "history",
  "community-economics",
];

for (const domain of researchDomains) {
  writeText(
    `content/research/${domain}/README.md`,
    `# Research Domain: ${domain}

This directory holds research notes for **${domain}**.

## Rules

- Do not invent citations.
- Separate facts, interpretations, and proposals.
- Link claims to \`data/research/claim_ledger.json\` source IDs when evidence exists.
- Mark uncertainty explicitly.

## Status

Phase 0 seed directory. Substantive research begins in later phases.
`
  );
}

// Decisions
const decisions = [
  ["final author byline", "What public author byline will appear on the book?"],
  ["licensing", "Public-domain or Creative Commons licensing — Steve approval required."],
  ["build board visibility", "Should the Build Board remain publicly accessible by URL?"],
  ["visual identity", "Final color and visual identity for public site and board."],
  ["definition approval", "Final approval of the canonical definition."],
  ["chapter title approval", "Which chapter titles are locked vs revisable?"],
  ["country-specific appendices", "Whether the book will include country-specific policy appendices."],
  [
    "universal text vs American examples",
    "Whether the main text remains universal with American examples.",
  ],
  ["citation style", "Which citation style will be canonical?"],
  ["print dimensions", "Print edition trim size and production specs."],
  ["public feedback", "Whether and how public feedback will be accepted."],
  ["contributor credit", "Whether contributors will be credited and how."],
  ["advisory review board", "Whether an advisory review board will be formed."],
];

writeJson("data/decisions/decisions.json", {
  version: "0.1.0",
  last_updated: TODAY,
  decisions: decisions.map((d, i) => ({
    decision_id: `CC-DEC-${String(i + 1).padStart(3, "0")}`,
    title: d[0],
    question: d[1],
    status: "open",
    rationale: "",
    impact: [],
    approved_by: null,
    decided_at: null,
    supersedes: null,
  })),
});

// Risks
const risks = [
  ["philosophy mistaken for conventional capitalism", "high", "high", "editorial"],
  ["philosophy mistaken for socialism", "high", "high", "editorial"],
  ["policies described before economic modeling is complete", "critical", "high", "research"],
  ["unsupported economic claims", "critical", "medium", "research"],
  ["constitutional or trade-law conflicts", "high", "medium", "legal"],
  ["tax incidence shifted back to workers or consumers", "critical", "medium", "economics"],
  ["excessive complexity", "high", "medium", "editorial"],
  ["accidental partisanship", "high", "medium", "editorial"],
  ["capital-flight risk", "critical", "medium", "implementation"],
  ["inflation risk", "high", "medium", "economics"],
  ["small-business burden", "high", "medium", "implementation"],
  ["international adaptation problems", "medium", "medium", "policy"],
  ["public dashboard exposing internal planning", "high", "medium", "security"],
  ["project scope becoming too large", "high", "high", "operations"],
  ["manuscript losing a unified voice", "high", "medium", "editorial"],
  ["AI-generated factual errors", "critical", "high", "research"],
  ["citation drift", "high", "medium", "research"],
  ["GitHub or Netlify deployment misconfiguration", "medium", "medium", "technical"],
  ["accidental C:-drive usage", "high", "medium", "operations"],
];

writeJson("data/project/risk_register.json", {
  version: "0.1.0",
  last_updated: TODAY,
  risks: risks.map((r, i) => ({
    risk_id: `CC-RISK-${String(i + 1).padStart(3, "0")}`,
    title: r[0],
    severity: r[1],
    likelihood: r[2],
    category: r[3],
    affected_layers: [],
    mitigation: "Documented in governance and research protocols; monitored on Build Board.",
    owner: "Steve Grappe",
    status: "open",
  })),
});

// Phases / milestones / slices
const phases = [
  {
    id: "phase-0",
    title: "Foundation and Governance",
    number: 0,
    status: "in_progress",
    deliverables: [
      "repository",
      "H:-only environment",
      "architecture",
      "book map",
      "canonical data",
      "public-site shell",
      "board shell",
      "validation",
      "deployment preparation",
    ],
  },
  {
    id: "phase-1",
    title: "Foundational Declaration",
    number: 1,
    status: "planned",
    deliverables: [
      "define Constitutional Capitalism",
      "define first principles",
      "write the preamble",
      "create the Declaration",
      "define terms",
      "establish boundaries from related ideologies",
    ],
  },
  {
    id: "phase-2",
    title: "Diagnosis and Historical Foundation",
    number: 2,
    status: "planned",
    deliverables: [
      "productivity and wages",
      "wealth concentration",
      "corporate power",
      "financialization",
      "globalization",
      "internet commerce",
      "local economic decline",
      "constitutional history",
    ],
  },
  {
    id: "phase-3",
    title: "Economic Constitution",
    number: 3,
    status: "planned",
    deliverables: [
      "rights",
      "responsibilities",
      "institutions",
      "markets",
      "competition",
      "ownership",
      "accountability",
      "amendments and adaptation",
    ],
  },
  {
    id: "phase-4",
    title: "Policy Architecture",
    number: 4,
    status: "planned",
    deliverables: [
      "taxation",
      "corporations",
      "labor",
      "ownership",
      "local commerce",
      "banking",
      "trade",
      "technology",
      "social wealth",
      "measurement",
    ],
  },
  {
    id: "phase-5",
    title: "Testing and Opposition",
    number: 5,
    status: "planned",
    deliverables: [
      "economic modeling",
      "legal review",
      "constitutional review",
      "counterarguments",
      "adversarial analysis",
      "international comparisons",
      "failure modes",
    ],
  },
  {
    id: "phase-6",
    title: "Full Manuscript",
    number: 6,
    status: "planned",
    deliverables: [
      "chapter drafting",
      "editorial passes",
      "citation completion",
      "continuity review",
      "voice review",
      "duplication reduction",
    ],
  },
  {
    id: "phase-7",
    title: "Public Education Edition",
    number: 7,
    status: "planned",
    deliverables: [
      "citizen summary",
      "policy guide",
      "visual explanations",
      "FAQs",
      "glossary",
      "downloadable materials",
    ],
  },
  {
    id: "phase-8",
    title: "Publication",
    number: 8,
    status: "planned",
    deliverables: [
      "web edition",
      "PDF",
      "EPUB",
      "print-ready edition",
      "accessibility review",
      "licensing",
      "distribution",
    ],
  },
  {
    id: "phase-9",
    title: "Public Launch and Continuing Work",
    number: 9,
    status: "planned",
    deliverables: [
      "launch",
      "public feedback",
      "corrections",
      "versioned editions",
      "international adaptation",
      "continuing research",
    ],
  },
];

writeJson("data/project/phases.json", {
  version: "0.1.0",
  last_updated: TODAY,
  current_phase: "phase-0",
  phases,
});

writeJson("data/metrics/project_milestones.json", {
  version: "0.1.0",
  last_updated: TODAY,
  milestones: [
    {
      id: "MS-001",
      title: "Phase 0 foundation complete",
      phase: "phase-0",
      status: "in_progress",
      evidence: ["repo structure", "apps build", "governance docs", "validation gate"],
    },
    {
      id: "MS-002",
      title: "Canonical definition approved",
      phase: "phase-1",
      status: "not_started",
      evidence: [],
    },
    {
      id: "MS-003",
      title: "First published chapter",
      phase: "phase-6",
      status: "not_started",
      evidence: [],
    },
    {
      id: "MS-004",
      title: "Public free edition released",
      phase: "phase-8",
      status: "not_started",
      evidence: [],
    },
  ],
});

writeJson("data/project/slice_queue.json", {
  version: "0.1.0",
  last_updated: TODAY,
  active_slice: "CC-PHASE-0-MASTER-PROJECT-FOUNDATION-1.0",
  slices: [
    {
      slice_id: "CC-PHASE-0-MASTER-PROJECT-FOUNDATION-1.0",
      title: "Master Project Foundation",
      purpose: "Establish repository, governance, apps, data, validation, and deployment readiness.",
      prerequisites: [],
      allowed_paths: ["**"],
      forbidden_paths: [],
      required_outputs: [
        "apps/book-site",
        "apps/build-board",
        "data/**",
        "docs/**",
        "reports/CC_PHASE_0_MASTER_PROJECT_FOUNDATION_1_0_RETURN.md",
      ],
      validation_commands: ["pnpm gate"],
      completion_evidence: [],
      status: "in_progress",
      next_recommended_slice: "CC-PHASE-1-FOUNDATIONAL-DECLARATION-1.0",
    },
    {
      slice_id: "CC-PHASE-1-FOUNDATIONAL-DECLARATION-1.0",
      title: "Foundational Declaration",
      purpose:
        "Define Constitutional Capitalism, first principles, boundaries, declaration, and key terms.",
      prerequisites: ["CC-PHASE-0-MASTER-PROJECT-FOUNDATION-1.0"],
      allowed_paths: [
        "content/**",
        "data/project/**",
        "data/manuscript/**",
        "docs/governance/**",
        "docs/writing/**",
        "apps/book-site/**",
        "apps/build-board/**",
        "reports/**",
      ],
      forbidden_paths: [],
      required_outputs: [
        "content/declarations/",
        "updated principles",
        "definition approval path",
      ],
      validation_commands: ["pnpm check:all", "pnpm build:all"],
      completion_evidence: [],
      status: "queued",
      next_recommended_slice: null,
    },
  ],
});

writeJson("data/project/current_build_state.json", {
  version: "0.1.0",
  last_updated: TODAY,
  mission_id: "CC-PHASE-0-MASTER-PROJECT-FOUNDATION-1.0",
  phase: "phase-0",
  status: "in_progress",
  writing_focus: "Foundation architecture — no chapter drafting yet",
  next_action: "Complete Phase 0 validation gate, commit, push, connect Netlify",
  blockers: [],
});

writeJson("data/deployments/deployment_status.json", {
  version: "0.1.0",
  last_updated: TODAY,
  note: "Do not invent production URLs. Update only with confirmed information.",
  applications: [
    {
      id: "book-site",
      name: "Constitutional Capitalism Book Site",
      suggested_netlify_name: "constitutional-capitalism",
      path: "apps/book-site",
      status: "not_deployed",
      production_url: null,
      last_build_status: null,
      last_known_commit: null,
      build_command: "pnpm build",
      publish_directory: "dist",
      base_directory: "apps/book-site",
      netlify_config: "netlify.book.toml",
      access: "public",
      manual_setup_required: [
        "Import GitHub repo in Netlify",
        "Set base directory apps/book-site",
        "Set build command pnpm build (with pnpm install at root or package-dir strategy)",
        "Set publish directory dist",
        "Confirm production branch main",
        "Record production URL after first deploy",
      ],
    },
    {
      id: "build-board",
      name: "Constitutional Capitalism Build Board",
      suggested_netlify_name: "constitutional-capitalism-board",
      path: "apps/build-board",
      status: "not_deployed",
      production_url: null,
      last_build_status: null,
      last_known_commit: null,
      build_command: "pnpm build",
      publish_directory: "dist",
      base_directory: "apps/build-board",
      netlify_config: "netlify.board.toml",
      access: "public_url_unprotected",
      access_note:
        "Board is NOT private until Netlify site-level access protection or another approved auth layer is configured. Do not place sensitive planning information until protected.",
      manual_setup_required: [
        "Import same GitHub repo as second Netlify site",
        "Set base directory apps/build-board",
        "Set build command pnpm build",
        "Set publish directory dist",
        "Confirm production branch main",
        "Enable access protection before sensitive content",
        "Record production URL after first deploy",
      ],
    },
  ],
});

writeJson("data/metrics/build_history.json", {
  version: "0.1.0",
  last_updated: TODAY,
  builds: [],
});

writeJson("data/metrics/validation_history.json", {
  version: "0.1.0",
  last_updated: TODAY,
  validations: [],
});

// Progress layers — honest Phase 0 values
const progressLayers = [
  ["project_governance", "Project Governance", 85],
  ["book_architecture", "Book Architecture", 90],
  ["foundational_philosophy", "Foundational Philosophy", 25],
  ["manuscript", "Manuscript", 3],
  ["research_foundation", "Research Foundation", 20],
  ["source_verification", "Source Verification", 0],
  ["policy_development", "Policy Development", 10],
  ["economic_modeling", "Economic Modeling", 0],
  ["constitutional_analysis", "Constitutional Analysis", 5],
  ["legal_review", "Legal Review", 0],
  ["editorial_review", "Editorial Review", 0],
  ["public_book_website", "Public Book Website", 40],
  ["build_board", "Build Board", 45],
  ["accessibility", "Accessibility", 35],
  ["publishing_formats", "Publishing Formats", 5],
  ["free_distribution", "Free Distribution", 15],
  ["deployment_readiness", "Deployment Readiness", 50],
  ["public_launch_readiness", "Public Launch Readiness", 5],
];

writeJson("data/metrics/progress_layers.json", {
  version: "0.1.0",
  last_updated: TODAY,
  note: "Phase 0 values reflect architecture/governance progress. Manuscript/research/legal remain low by design.",
  layers: progressLayers.map(([id, label, percent]) => ({
    id,
    label,
    percent,
    status:
      percent === 0 ? "not_started" : percent >= 80 ? "strong" : percent >= 30 ? "underway" : "early",
    basis: ["phase_0_scaffold"],
    blockers: [],
    next_actions: [],
    last_updated: TODAY,
  })),
});

writeJson("data/metrics/progress_snapshot.json", {
  version: "0.1.0",
  generated_at: null,
  note: "Generated by scripts/generate-progress-snapshot.mjs",
  overall_percent: 0,
  layers: [],
});

writeJson("data/project/latest_cursor_return.json", {
  mission_id: "CC-PHASE-0-MASTER-PROJECT-FOUNDATION-1.0",
  status: "in_progress",
  updated_at: TODAY,
  summary: "Scaffold generator initialized. Full return pending validation.",
});

writeJson("data/project/project_config.json", {
  version: "0.1.0",
  last_updated: TODAY,
  repository: "https://github.com/Grappe501/constitutional-capitalism",
  local_root: "H:\\Constitutional-Capitalism",
  package_manager: "pnpm",
  apps: ["book-site", "build-board"],
  h_drive_only: true,
  database: false,
  authentication: false,
  cms: false,
});

writeJson("data/project/updates.json", {
  version: "0.1.0",
  updates: [
    {
      id: "UPD-001",
      date: TODAY,
      title: "Phase 0 foundation initiated",
      summary:
        "Repository, governance, book architecture, research systems, and dual Astro applications established.",
      public: true,
    },
  ],
});

console.log("\nScaffold complete.");
console.log("Chapters:", chapters.length);
console.log("Numbered:", chapters.filter((c) => c.chapter_number != null).length);
