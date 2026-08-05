/**
 * UPD-065 — Comparative Living Community Laboratory methodology.
 * Refines UPD-062–064 under CC-DEC-102. Not doctrine. Does not interrupt PP-FF-01.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const write = (p, data) =>
  fs.writeFileSync(path.join(root, p), `${JSON.stringify(data, null, 2)}\n`, "utf8");

const UPD = "UPD-065";
const TODAY = "2026-08-05";

const engines = [
  {
    id: "natural_resource_opportunity",
    exemplar_case: "CC-CASE-LEWISVILLE-001",
    question:
      "How does a community translate emerging natural-resource opportunity into durable local prosperity?"
  },
  {
    id: "education_human_capital",
    exemplar_case: "CC-CASE-ROSEBUD-001",
    related_hypothesis: "HYP-123",
    question:
      "How does a community translate education and human capital into durable local prosperity?"
  },
  { id: "tourism_cultural_economy", question: "Future laboratory candidate" },
  { id: "healthcare_regional_development", question: "Future laboratory candidate" },
  { id: "advanced_manufacturing", question: "Future laboratory candidate" },
  { id: "forestry_wood_products", question: "Future laboratory candidate" },
  { id: "outdoor_recreation", question: "Future laboratory candidate" },
  { id: "logistics_transportation", question: "Future laboratory candidate" },
  { id: "technology_remote_work", question: "Future laboratory candidate" },
  { id: "historic_downtown_revitalization", question: "Future laboratory candidate" }
];

const lcl = read("data/project/living_community_laboratories.json");
lcl.version = "0.4.0";
lcl.last_updated = TODAY;
lcl.recorded_as_updates = Array.from(
  new Set([...(lcl.recorded_as_updates || []), UPD].filter(Boolean))
);
lcl.recorded_as_update = UPD;
lcl.comparative_methodology = {
  update_id: UPD,
  decision_anchor: "CC-DEC-102",
  closes_with: "UPD-064",
  rule: "Lewisville and Rose Bud are not two independent curiosities — they begin a comparative research methodology across different engines of community development.",
  not_prescriptive:
    "Constitutional Capitalism does not say every community should become Rose Bud (or Lewisville). It asks what engine of prosperity is most authentic to this community, and how institutions can help that engine create broad, durable local wealth.",
  guiding_question:
    "What engine of prosperity is most authentic to this community, and how can institutions be designed to help that engine create broad, durable local wealth?",
  paired_engines: {
    lewisville:
      "How does a community translate emerging natural-resource opportunity into durable local prosperity?",
    rose_bud:
      "How does a community translate education and human capital into durable local prosperity?"
  },
  development_engines: engines,
  future_sie_synthesis: {
    deferred_to: "Phase 9 Systems Intelligence Engine",
    not_ask: "Which community is best?",
    ask: "Under what conditions did each development strategy succeed?",
    expected_insight:
      "Some institutional designs may work across nearly all community types; others are highly context-dependent."
  },
  verdict_discipline:
    "Reality—not preference—determines Supports / Qualifies / Contradicts for each hypothesis."
};
lcl.maturation_note = {
  update_id: UPD,
  text: "Ideas that once might have become doctrine now enter as research hypotheses, Living Community Laboratories, explicit questions, and predetermined Supports/Qualifies/Contradicts verdicts."
};
write("data/project/living_community_laboratories.json", lcl);

const updates = read("data/project/updates.json");
if (!updates.updates.some((u) => u.id === UPD)) {
  updates.updates.push({
    id: UPD,
    date: TODAY,
    title: "Comparative Living Community Laboratory methodology",
    summary:
      "Under CC-DEC-102 (not doctrine): Lewisville and Rose Bud framed as the start of comparative methodology across development engines (resource vs education/human capital). Guiding question: authentic prosperity engine per community—not one prescribed model. Future SIE synthesis compares conditions of success across community types. Closes the UPD-064 loop. Does not interrupt PP-FF-01.",
    public: true
  });
  updates.last_updated = TODAY;
  write("data/project/updates.json", updates);
}

const sie = read("data/project/systems_intelligence_engine_framework.json");
sie.living_community_laboratories = {
  ...(sie.living_community_laboratories || {}),
  comparative_methodology_update: UPD,
  synthesis_ask: "Under what conditions did each development strategy succeed?",
  not_ask: "Which community is best?"
};
write("data/project/systems_intelligence_engine_framework.json", sie);

const eras = read("data/project/project_eras_roadmap.json");
eras.living_community_laboratories = {
  ...(eras.living_community_laboratories || {}),
  comparative_methodology_update: UPD,
  guiding_question:
    "What engine of prosperity is most authentic to this community, and how can institutions be designed to help that engine create broad, durable local wealth?"
};
write("data/project/project_eras_roadmap.json", eras);

const cbs = read("data/project/current_build_state.json");
cbs.living_community_laboratories = {
  ...(cbs.living_community_laboratories || {}),
  update_id: UPD,
  rule: "Comparative LCL methodology captured. Scaffolds only. PP-FF-01 remains next execution milestone."
};
write("data/project/current_build_state.json", cbs);

// Light note on hyp files / overviews
const rosePath = path.join(root, "content/research/case-studies/rose-bud/00-overview.md");
let rose = fs.readFileSync(rosePath, "utf8");
if (!rose.includes("UPD-065")) {
  rose = rose.replace(
    "## Complement to Lewisville",
    "## Comparative methodology (UPD-065)\n\nLewisville and Rose Bud begin a **comparative** Living Community Laboratory method — different engines of development (resource opportunity vs education/human capital), not a single prescribed community model.\n\nGuiding question: *What engine of prosperity is most authentic to this community, and how can institutions help that engine create broad, durable local wealth?*\n\n## Complement to Lewisville"
  );
  fs.writeFileSync(rosePath, rose, "utf8");
}

const hypPath = path.join(root, "content/research/hypotheses/rural-prosperity-campus.md");
let hyp = fs.readFileSync(hypPath, "utf8");
if (!hyp.includes("UPD-065")) {
  hyp = hyp.replace(
    "## Honesty",
    "## Comparative placement (UPD-065)\n\nPart of a family of development-engine laboratories. Not “every community should become Rose Bud.” Authenticity of the local prosperity engine comes first; institutional design follows.\n\n## Honesty"
  );
  fs.writeFileSync(hypPath, hyp, "utf8");
}

console.log("UPD-065: Comparative LCL methodology captured.");
