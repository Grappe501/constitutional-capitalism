/**
 * UPD-062 — Living Community Laboratories + Lewisville first case study (not a pilot).
 * Not a new decision / not a new principle. Does not displace PP-FF-01.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const write = (p, data) =>
  fs.writeFileSync(path.join(root, p), `${JSON.stringify(data, null, 2)}\n`, "utf8");

const UPD = "UPD-062";
const HYP = "HYP-121";
const TODAY = "2026-08-05";

const updates = read("data/project/updates.json");
if (!updates.updates.some((u) => u.id === UPD)) {
  updates.updates.push({
    id: UPD,
    date: TODAY,
    title: "Living Community Laboratories; Lewisville case study (not pilot)",
    summary:
      "Under CC-DEC-102 (not a new decision): adds Living Community Laboratories research category — integrated multi-doctrine community case studies, distinct from single-doctrine proof packets and from pilots. Lewisville captured as first Comprehensive Community Case Study scaffold (CC-CASE-LEWISVILLE-001 / HYP-121). Purpose: learn from the community. Six-part case structure. Does not displace PP-FF-01; no invented local statistics.",
    public: true
  });
  updates.last_updated = TODAY;
  write("data/project/updates.json", updates);
}

const inc = read("data/project/architecture_incubator.json");
inc.related_decision_ids = Array.from(
  new Set([...(inc.related_decision_ids || []), "CC-DEC-102"])
);
const cards = inc.hypothesis_cards || [];
if (!cards.some((h) => h.hypothesis_id === HYP)) {
  cards.push({
    hypothesis_id: HYP,
    title: "Lewisville Comprehensive Community Case Study",
    proposition:
      "A real community facing a major economic transition can serve as the first Living Community Laboratory — a Comprehensive Community Case Study that tests how multiple Constitutional Capitalism doctrines interact — provided the work remains investigative (not a validation pilot) and baseline facts are registered before analysis.",
    status: "Research hypothesis — case scaffold only",
    publishable: false,
    confidence_percent: 8,
    related_principle_ids: [],
    related_decision_ids: ["CC-DEC-102", "CC-DEC-097"],
    related_framework: "data/project/living_community_laboratories.json",
    public_path: null,
    evidence_needed: [
      "Verified community baseline from registered sources",
      "Scoped description of economic transition (e.g., lithium) without advocacy framing",
      "Systems map of interacting local domains",
      "Scenario assumptions published and labeled as estimates",
      "Lessons feeding Supports/Qualifies/Contradicts for affected doctrines"
    ],
    proof_packet_status: "not_started",
    note: "Not a pilot. Not doctrine. Does not raise modeling %. Priority remains PP-FF-01."
  });
}
inc.hypothesis_cards = cards;
inc.living_community_laboratories = {
  update_id: UPD,
  file: "data/project/living_community_laboratories.json",
  rule: "Multi-doctrine community case studies. Distinct from proof packets. Case study ≠ pilot."
};
inc.last_updated = TODAY;
write("data/project/architecture_incubator.json", inc);

const pbr = read("data/project/proof_burden_registry.json");
pbr.living_community_laboratories = {
  update_id: UPD,
  file: "data/project/living_community_laboratories.json",
  rule: "Complementary to proof packets. Packets test doctrines; laboratories test multi-doctrine interaction in one place. PP-FF-01 remains immediate priority."
};
write("data/project/proof_burden_registry.json", pbr);

const eras = read("data/project/project_eras_roadmap.json");
eras.living_community_laboratories = {
  update_id: UPD,
  file: "data/project/living_community_laboratories.json",
  first_case: "CC-CASE-LEWISVILLE-001",
  rule: "Research Chapter tool. Learn from communities; do not use early cases as proof-of-concept pilots."
};
write("data/project/project_eras_roadmap.json", eras);

const sie = read("data/project/systems_intelligence_engine_framework.json");
sie.living_community_laboratories = {
  update_id: UPD,
  role: "Future consumer of case-study baselines, systems maps, and scenario comparisons — deferred with Phase 9",
  rule: "Case studies may seed digital-twin / systems mapping later; do not build twins now."
};
write("data/project/systems_intelligence_engine_framework.json", sie);

const cbs = read("data/project/current_build_state.json");
cbs.living_community_laboratories = {
  update_id: UPD,
  first_case: "CC-CASE-LEWISVILLE-001",
  rule: "Scaffold only. Do not invent Lewisville stats. PP-FF-01 remains next execution milestone."
};
write("data/project/current_build_state.json", cbs);

const schemaPath = "schemas/living_community_laboratories.schema.json";
if (!fs.existsSync(path.join(root, schemaPath))) {
  write(schemaPath, {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $id: "living_community_laboratories.schema.json",
    type: "object",
    required: ["version", "status", "title", "cases", "standard_case_structure"],
    additionalProperties: true
  });
}

const vpdPath = path.join(root, "scripts/validate-project-data.mjs");
let vpd = fs.readFileSync(vpdPath, "utf8");
if (!vpd.includes("living_community_laboratories.json")) {
  const after =
    "  ['data/project/reviewers_charter.json','schemas/reviewers_charter.schema.json'],\n";
  const row =
    "  ['data/project/living_community_laboratories.json','schemas/living_community_laboratories.schema.json'],\n";
  if (vpd.includes(after)) {
    fs.writeFileSync(vpdPath, vpd.replace(after, after + row), "utf8");
  }
}

console.log("UPD-062: Living Community Laboratories + Lewisville scaffold captured.");
