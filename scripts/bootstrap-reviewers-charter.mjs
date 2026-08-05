import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const write = (p, data) =>
  fs.writeFileSync(path.join(root, p), `${JSON.stringify(data, null, 2)}\n`, "utf8");

const ccr = read("data/project/collaborative_constitutional_review_framework.json");
ccr.related_decision_ids = Array.from(
  new Set([...(ccr.related_decision_ids || []), "CC-DEC-102"])
);
ccr.reviewers_charter = {
  update_id: "UPD-058",
  file: "data/project/reviewers_charter.json",
  public_text: "content/research/REVIEWERS_CHARTER.md",
  rule: "Deferred charter for first scholarly collaborators. Objective: intellectual seriousness, not conviction. Does not activate Phase 8."
};
ccr.last_updated = "2026-08-05";
write("data/project/collaborative_constitutional_review_framework.json", ccr);

const updates = read("data/project/updates.json");
if (!updates.updates.some((u) => u.id === "UPD-058")) {
  updates.updates.push({
    id: "UPD-058",
    date: "2026-08-05",
    title: "Reviewer's Charter for first collaborators (deferred)",
    summary:
      "Under CC-DEC-102/096 (not a new decision; not Phase 8 activation): captures Reviewer's Charter — invite scrutiny for intellectual seriousness, not advocacy. Expected economist-style challenge questions recorded. Success = serious scholarship engaged on merits. Use after proof progress; PP-FF-01 remains next execution milestone.",
    public: true
  });
  updates.last_updated = "2026-08-05";
  write("data/project/updates.json", updates);
}

const cbs = read("data/project/current_build_state.json");
cbs.reviewers_charter = {
  update_id: "UPD-058",
  file: "data/project/reviewers_charter.json",
  rule: "Deferred. Do not invite public review platform. Execute PP-FF-01 first."
};
write("data/project/current_build_state.json", cbs);

const schemaPath = "schemas/reviewers_charter.schema.json";
if (!fs.existsSync(path.join(root, schemaPath))) {
  write(schemaPath, {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $id: "reviewers_charter.schema.json",
    type: "object",
    required: ["version", "status", "title", "primary_objective"],
    additionalProperties: true
  });
}

const vpdPath = path.join(root, "scripts/validate-project-data.mjs");
let vpd = fs.readFileSync(vpdPath, "utf8");
if (!vpd.includes("reviewers_charter.json")) {
  const after =
    "  ['data/project/project_eras_roadmap.json','schemas/project_eras_roadmap.schema.json'],\n";
  const row =
    "  ['data/project/reviewers_charter.json','schemas/reviewers_charter.schema.json'],\n";
  if (vpd.includes(after)) {
    fs.writeFileSync(vpdPath, vpd.replace(after, after + row), "utf8");
  }
}

console.log("Reviewers charter wired (deferred).");
