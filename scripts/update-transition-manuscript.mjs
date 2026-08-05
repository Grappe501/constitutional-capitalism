import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TODAY = "2026-08-04";

const briefs = {
  "CC-CH-074": {
    central_question: "What should happen first — and what should remain unchanged — in the opening phase of reform?",
    argument:
      "Define a First 100 Days / early sequencing agenda: which laws are introduced, which agencies change, what stays the same, and what protections exist. Prefer structural setup over dramatic overnight redistribution.",
    principles: ["CC-PRIN-17", "CC-PRIN-05", "CC-PRIN-16"],
    predictions: ["CC-PRED-002", "CC-PRED-009"],
    research: ["Comparative transition sequencing", "Administrative capacity constraints"],
    outcome: "Reader sees reform as ordered constitutional change, not shock therapy.",
  },
  "CC-CH-076": {
    central_question: "How could a 10–20 year transition unfold if Constitutional Capitalism were implemented as a system?",
    argument:
      "Develop scenario horizons (years 1–3, 3–7, 7–15, 10–20) as predictions, not promises. Emphasize that isolated policies differ from system-level reform; ownership broadening is the distinctive long-horizon mechanism.",
    principles: ["CC-PRIN-06", "CC-PRIN-17", "CC-PRIN-01"],
    predictions: ["CC-PRED-002", "CC-PRED-003", "CC-PRED-006", "CC-PRED-007"],
    research: ["Transition economics", "Employee ownership scale-up evidence", "Tax incidence modeling queue"],
    outcome: "Reader can distinguish principles, proposals, predictions, and evidence across the transition horizon.",
  },
  "CC-CH-081": {
    central_question: "How would Constitutional Capitalism be tested, measured, and revised?",
    argument:
      "Specify a testing ladder: models → state pilots → regional implementation → national adoption. Pre-define metrics, publish failures, and require periodic constitutional-style review (living framework).",
    principles: ["CC-PRIN-17", "CC-PRIN-14", "CC-PRIN-19"],
    predictions: ["CC-PRED-010"],
    research: ["Policy pilot design", "Outcome measurement frameworks", "Amendment/review institutions"],
    outcome: "Reader trusts the project to evaluate itself rather than demand belief.",
  },
  "CC-CH-082": {
    central_question: "How could Constitutional Capitalism fail, and how would we know?",
    argument:
      "Steelman failure modes: investment decline, capital flight, price increases, ownership stagnation, bureaucratic burden, and shifted capture. Define detection metrics and adjustment paths. Title spirit: If We Are Wrong.",
    principles: ["CC-PRIN-17", "CC-PRIN-10"],
    predictions: ["CC-PRED-001", "CC-PRED-009", "CC-PRED-010"],
    research: ["Historical reform failures", "Capital mobility responses", "Regulatory burden studies"],
    outcome: "Reader sees intellectual honesty as a constitutional virtue.",
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
  ch.core_claims = brief.predictions;
  ch.research_requirements = brief.research;
  ch.research_readiness = 20;
  ch.editorial_readiness = 20;
  ch.last_updated = TODAY;

  const md = `---
chapter_id: ${ch.chapter_id}
title: "${ch.title.replace(/"/g, '\\"')}"
part_id: ${ch.part_id}
chapter_number: ${ch.chapter_number}
status: outline
public_status: hidden
summary: "${brief.argument.replace(/"/g, '\\"')}"
central_question: "${brief.central_question.replace(/"/g, '\\"')}"
core_claims: ${JSON.stringify(brief.predictions)}
research_requirements: ${JSON.stringify(brief.research)}
source_ids: []
word_count_target: ${ch.word_count_target}
current_word_count: 0
review_status: unreviewed
last_updated: ${TODAY}
---

# ${ch.title}

> **Status:** Outline brief — predictions and transition architecture only. Not empirical proof.  
> **Stable ID:** \`${ch.chapter_id}\`

## Central Question

${brief.central_question}

## Intended Argument

${brief.argument}

## Argument Layers

Follow \`docs/writing/ARGUMENT_LAYERS_STANDARD.md\`:

1. Principles
2. Proposals
3. Predictions
4. Evidence

## Supporting Principles

${brief.principles.map((p) => `- \`${p}\``).join("\n")}

## Linked Predictions

${brief.predictions.map((p) => `- \`${p}\` (see \`data/project/prediction_ledger.json\`)`).join("\n")}

## Research Requirements

${brief.research.map((r) => `- [ ] ${r}`).join("\n")}

## Dependencies

- \`docs/architecture/TRANSITION_AND_TESTING_ARCHITECTURE.md\`
- \`data/project/transition_scenarios.json\`
- \`data/project/national_impact_assessments.json\`
- Declaration: \`content/declarations/DECLARATION_OF_CONSTITUTIONAL_CAPITALISM.md\`

## Target Reader Outcome

${brief.outcome}
`;
  fs.writeFileSync(path.join(ROOT, ch.file), md);
  console.log("updated", ch.chapter_id);
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
console.log("Transition manuscript briefs updated");
