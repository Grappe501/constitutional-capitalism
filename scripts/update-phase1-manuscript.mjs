/**
 * Advance foundational manuscript units from concept → outline with chapter briefs.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TODAY = "2026-08-04";

const briefs = {
  "CC-CH-005": {
    title: "The Definition of Constitutional Capitalism",
    central_question:
      "What precisely is Constitutional Capitalism, and how does the canonical definition govern the book?",
    argument:
      "Present the approved definition, explain each clause, and show why free enterprise and constitutional accountability are jointly necessary.",
    principles: ["CC-PRIN-01", "CC-PRIN-02", "CC-PRIN-04", "CC-PRIN-10"],
    objections: ["CC-OBJ-001", "CC-OBJ-002"],
    research: [
      "Historical definitions of capitalism",
      "Uses of “constitutional” as applied to economic power",
    ],
    claims: ["CC-CLAIM-001"],
    outcome: "Reader can state the definition accurately and distinguish it from slogans.",
  },
  "CC-CH-006": {
    title: "The Central Proposition",
    central_question:
      "What is the book’s governing proposition about the purpose of an economy?",
    argument:
      "Develop the central belief that prosperity must serve a free and self-governing people, not merely aggregate wealth.",
    principles: ["CC-PRIN-01", "CC-PRIN-19"],
    objections: ["CC-OBJ-008"],
    research: ["Measures of prosperity beyond GDP"],
    claims: [],
    outcome: "Reader understands why indicators of growth are necessary but insufficient.",
  },
  "CC-CH-015": {
    title: "The Purpose of an Economy",
    central_question: "What is an economy for?",
    argument:
      "Establish evaluative criteria: dignity, liberty, security, opportunity, family, community, self-government, and intergenerational progress.",
    principles: ["CC-PRIN-01", "CC-PRIN-14"],
    objections: ["CC-OBJ-015"],
    research: ["History of economic purpose debates"],
    claims: ["CC-CLAIM-001"],
    outcome: "Reader gains a purpose framework before policy instruments.",
  },
  "CC-CH-016": {
    title: "The Dignity of Work",
    central_question: "How should a free republic understand work?",
    argument:
      "Work is contribution and a path toward independence; productivity gains should not flow exclusively upward; human worth is not reducible to employment.",
    principles: ["CC-PRIN-07", "CC-PRIN-15"],
    objections: ["CC-OBJ-017"],
    research: ["Labor share / productivity debates (for later sourcing)"],
    claims: ["CC-CLAIM-002"],
    outcome: "Reader sees workers as contributors, not mere inputs.",
  },
  "CC-CH-018": {
    title: "The Responsibilities of Ownership",
    central_question: "What responsibilities accompany ownership and investment?",
    argument:
      "Ownership rights remain; responsibilities include bearing risk, avoiding monopoly abuse, and honoring obligations attached to legal privilege.",
    principles: ["CC-PRIN-03", "CC-PRIN-08"],
    objections: ["CC-OBJ-011"],
    research: ["Corporate charter history; limited liability duties"],
    claims: [],
    outcome: "Reader rejects both anti-ownership hostility and privilege without duty.",
  },
  "CC-CH-019": {
    title: "Competition Protects Liberty",
    central_question: "Why is competition a constitutional safeguard?",
    argument:
      "Competition disperses power, protects choice, strengthens bargaining, and limits political capture; antitrust is part of republican architecture.",
    principles: ["CC-PRIN-09", "CC-PRIN-10"],
    objections: ["CC-OBJ-016"],
    research: ["Antitrust and republican government literature queue"],
    claims: ["CC-CLAIM-005"],
    outcome: "Reader stops seeing competition only as a price-efficiency tool.",
  },
  "CC-CH-022": {
    title: "Power Naturally Concentrates",
    central_question: "Why does economic power concentrate, and why does that matter constitutionally?",
    argument:
      "Without rules protecting rivalry and accountability, power gathers in markets as in politics; both public and private concentration threaten liberty.",
    principles: ["CC-PRIN-02", "CC-PRIN-10", "CC-PRIN-20"],
    objections: ["CC-OBJ-009", "CC-OBJ-016"],
    research: ["Political economy of concentrated wealth"],
    claims: ["CC-CLAIM-003"],
    outcome: "Reader accepts concentration as a structural tendency requiring institutions.",
  },
  "CC-CH-023": {
    title: "Government Must Be Limited and Capable",
    central_question: "What is the proper character of government in Constitutional Capitalism?",
    argument:
      "Government must be limited in scope and capable in legitimate functions: enforce contracts, protect property, defend competition, prevent capture — without commanding ordinary production.",
    principles: ["CC-PRIN-05", "CC-PRIN-16", "CC-PRIN-17"],
    objections: ["CC-OBJ-006", "CC-OBJ-007"],
    research: ["Limited government and regulatory capacity"],
    claims: [],
    outcome: "Reader rejects both night-watchman absolutism and managerial omnipotence.",
  },
  "CC-CH-025": {
    title: "Ownership Is the Foundation of Economic Freedom",
    central_question: "Why is broad ownership central rather than optional?",
    argument:
      "Wages support life; ownership builds independence. Broad ownership is the primary mechanism for durable prosperity and distributed influence.",
    principles: ["CC-PRIN-06", "CC-PRIN-07"],
    objections: ["CC-OBJ-005", "CC-OBJ-017"],
    research: ["Employee ownership; retirement ownership; cooperatives"],
    claims: ["CC-CLAIM-004"],
    outcome: "Reader sees ownership pathways as constitutional-economic infrastructure.",
  },
  "CC-CH-035": {
    title: "Article IX: The Proper Role of Government",
    central_question: "How should the Economic Articles define government’s role?",
    argument:
      "Translate Declaration principles into an Article-level statement of government duties and prohibitions without claiming finished legal text.",
    principles: ["CC-PRIN-05", "CC-PRIN-02"],
    objections: ["CC-OBJ-006", "CC-OBJ-019"],
    research: ["Comparative constitutional economic clauses"],
    claims: [],
    outcome: "Reader understands philosophy-to-article pathway.",
  },
  "CC-CH-073": {
    title: "Reform Without Revolution",
    central_question: "How can deep economic reform proceed without destroying productive order?",
    argument:
      "Reject confiscatory chaos and class retaliation; require law, consent, prospective rules, phased implementation, measurement, and correction.",
    principles: ["CC-PRIN-17"],
    objections: ["CC-OBJ-003", "CC-OBJ-010"],
    research: ["Transition failures and successful gradual reforms"],
    claims: [],
    outcome: "Reader trusts that reform can be serious without being revolutionary.",
  },
  "CC-CH-080": {
    title: "International Adoption and National Adaptation",
    central_question: "Which principles are universal, and which designs must vary by nation?",
    argument:
      "Universal principles of enterprise-plus-accountability can travel; statutory design must adapt to constitutional structure and local institutions.",
    principles: ["CC-PRIN-18"],
    objections: ["CC-OBJ-012"],
    research: ["Constitutional adaptation across nations"],
    claims: [],
    outcome: "Reader sees CC as framework, not U.S.-only program.",
  },
  "CC-CH-091": {
    title: "The Declaration of Constitutional Capitalism",
    central_question: "What founding statement should govern the project?",
    argument:
      "Publish and refine the standalone Declaration as the philosophical spine for principles, articles, and policies.",
    principles: ["CC-PRIN-01", "CC-PRIN-02", "CC-PRIN-20"],
    objections: ["CC-OBJ-001", "CC-OBJ-002", "CC-OBJ-013", "CC-OBJ-014"],
    research: ["Comparable founding economic declarations / charters (queue)"],
    claims: [],
    outcome: "Reader can share a coherent founding document.",
  },
};

const structurePath = path.join(ROOT, "data/manuscript/book_structure.json");
const structure = JSON.parse(fs.readFileSync(structurePath, "utf8"));

for (const ch of structure.chapters) {
  const brief = briefs[ch.chapter_id];
  if (!brief) continue;

  ch.status = "outline";
  ch.summary = brief.argument;
  ch.central_question = brief.central_question;
  ch.core_claims = brief.claims;
  ch.research_requirements = brief.research;
  ch.research_readiness = 15;
  ch.editorial_readiness = 20;
  ch.last_updated = TODAY;

  const filePath = path.join(ROOT, ch.file);
  const md = `---
chapter_id: ${ch.chapter_id}
title: "${ch.title.replace(/"/g, '\\"')}"
part_id: ${ch.part_id ?? "null"}
chapter_number: ${ch.chapter_number ?? "null"}
status: outline
public_status: hidden
summary: "${brief.argument.replace(/"/g, '\\"')}"
central_question: "${brief.central_question.replace(/"/g, '\\"')}"
core_claims: ${JSON.stringify(brief.claims)}
research_requirements: ${JSON.stringify(brief.research)}
source_ids: []
word_count_target: ${ch.word_count_target}
current_word_count: 0
review_status: unreviewed
last_updated: ${TODAY}
---

# ${ch.title}

> **Status:** Outline brief — not a finished chapter.  
> **Stable ID:** \`${ch.chapter_id}\`

## Central Question

${brief.central_question}

## Intended Argument

${brief.argument}

## Supporting Principles

${brief.principles.map((p) => `- \`${p}\``).join("\n")}

## Objections to Address

${brief.objections.map((o) => `- \`${o}\``).join("\n")}

## Research Requirements

${brief.research.map((r) => `- [ ] ${r}`).join("\n")}

## Factual Claims Requiring Verification

${
  brief.claims.length
    ? brief.claims.map((c) => `- \`${c}\` (see claim ledger)`).join("\n")
    : "- None registered for this unit yet beyond normative argument."
}

## Dependencies

- Canonical definition and central belief in \`data/project/book_identity.json\`
- Declaration draft: \`content/declarations/DECLARATION_OF_CONSTITUTIONAL_CAPITALISM.md\`
- Principles register: \`data/project/principles.json\`

## Target Reader Outcome

${brief.outcome}

## Editorial Note

Advanced from \`concept\` to \`outline\` during Phase 1. Do not mark \`draft_complete\` until substantive drafting and review standards are met.
`;
  fs.writeFileSync(filePath, md);
  console.log("updated", ch.chapter_id, ch.file);
}

structure.last_updated = TODAY;
fs.writeFileSync(structurePath, JSON.stringify(structure, null, 2) + "\n");

const indexPath = path.join(ROOT, "data/manuscript/chapters_index.json");
const index = JSON.parse(fs.readFileSync(indexPath, "utf8"));
index.chapters = structure.chapters.map((c) => ({
  chapter_id: c.chapter_id,
  title: c.title,
  part_id: c.part_id,
  chapter_number: c.chapter_number,
  status: c.status,
  public_status: c.public_status,
  file: c.file,
  word_count_target: c.word_count_target,
  current_word_count: c.current_word_count,
}));
index.last_updated = TODAY;
fs.writeFileSync(indexPath, JSON.stringify(index, null, 2) + "\n");

console.log("Manuscript Phase 1 briefs complete.");
