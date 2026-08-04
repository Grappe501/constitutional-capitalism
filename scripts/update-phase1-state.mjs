import fs from "node:fs";
import { r } from "./lib/paths.mjs";

const TODAY = "2026-08-04";

const slices = JSON.parse(fs.readFileSync(r("data/project/slice_queue.json"), "utf8"));
slices.active_slice = "CC-PHASE-1-FOUNDATIONAL-DECLARATION-1.0";
slices.last_updated = TODAY;
const p1 = slices.slices.find((s) => s.slice_id === "CC-PHASE-1-FOUNDATIONAL-DECLARATION-1.0");
if (p1) {
  p1.status = "in_progress";
  p1.next_recommended_slice = "CC-PHASE-2-DIAGNOSIS-RESEARCH-FOUNDATION-1.0";
}
if (!slices.slices.find((s) => s.slice_id === "CC-PHASE-2-DIAGNOSIS-RESEARCH-FOUNDATION-1.0")) {
  slices.slices.push({
    slice_id: "CC-PHASE-2-DIAGNOSIS-RESEARCH-FOUNDATION-1.0",
    title: "Diagnosis Research Foundation",
    purpose:
      "Begin source-backed diagnosis of wages/productivity, concentration, financialization, monopoly, local decline, corporate power, internet commerce, globalization, and taxation of labor and capital.",
    prerequisites: ["CC-PHASE-1-FOUNDATIONAL-DECLARATION-1.0"],
    allowed_paths: ["content/research/**", "data/research/**", "data/project/**", "apps/**", "reports/**", "docs/**"],
    forbidden_paths: [],
    required_outputs: ["sourced research registers", "claim support upgrades"],
    validation_commands: ["pnpm gate"],
    completion_evidence: [],
    status: "queued",
    next_recommended_slice: null,
  });
}
fs.writeFileSync(r("data/project/slice_queue.json"), JSON.stringify(slices, null, 2) + "\n");

const state = {
  version: "0.2.0",
  last_updated: TODAY,
  mission_id: "CC-PHASE-1-FOUNDATIONAL-DECLARATION-1.0",
  phase: "phase-1",
  status: "in_progress",
  writing_focus: "Declaration of Constitutional Capitalism and foundational principles",
  next_action: "Complete Phase 1 validation gate, commit, push; then begin diagnosis research foundation",
  blockers: [],
};
fs.writeFileSync(r("data/project/current_build_state.json"), JSON.stringify(state, null, 2) + "\n");

const phases = JSON.parse(fs.readFileSync(r("data/project/phases.json"), "utf8"));
phases.current_phase = "phase-1";
phases.last_updated = TODAY;
const ph0 = phases.phases.find((p) => p.id === "phase-0");
const ph1 = phases.phases.find((p) => p.id === "phase-1");
if (ph0) ph0.status = "complete";
if (ph1) ph1.status = "in_progress";
fs.writeFileSync(r("data/project/phases.json"), JSON.stringify(phases, null, 2) + "\n");

const milestones = JSON.parse(fs.readFileSync(r("data/metrics/project_milestones.json"), "utf8"));
const ms1 = milestones.milestones.find((m) => m.id === "MS-001");
const ms2 = milestones.milestones.find((m) => m.id === "MS-002");
if (ms1) ms1.status = "complete";
if (ms2) ms2.status = "in_progress";
milestones.last_updated = TODAY;
fs.writeFileSync(r("data/metrics/project_milestones.json"), JSON.stringify(milestones, null, 2) + "\n");

const identity = JSON.parse(fs.readFileSync(r("data/project/book_identity.json"), "utf8"));
identity.version = "0.2.0-phase1";
identity.project_status = "foundational_declaration";
identity.last_updated = TODAY;
fs.writeFileSync(r("data/project/book_identity.json"), JSON.stringify(identity, null, 2) + "\n");

console.log("Phase 1 operational state updated");
