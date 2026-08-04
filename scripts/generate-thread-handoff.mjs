import fs from "node:fs";
import { execSync } from "node:child_process";
import { r } from "./lib/paths.mjs";

function safe(cmd) {
  try {
    return execSync(cmd, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
  } catch {
    return "unavailable";
  }
}

const snapshot = JSON.parse(fs.readFileSync(r("data/metrics/progress_snapshot.json"), "utf8"));
const state = JSON.parse(fs.readFileSync(r("data/project/current_build_state.json"), "utf8"));
const slices = JSON.parse(fs.readFileSync(r("data/project/slice_queue.json"), "utf8"));
const decisions = JSON.parse(fs.readFileSync(r("data/decisions/decisions.json"), "utf8"));
const identity = JSON.parse(fs.readFileSync(r("data/project/book_identity.json"), "utf8"));

const active = slices.slices.find((s) => s.slice_id === slices.active_slice);
const next =
  slices.slices.find((s) => s.slice_id === active?.next_recommended_slice) ||
  slices.slices.find((s) => s.status === "queued");

const handoff = `# Thread Handoff — Constitutional Capitalism

Generated: ${new Date().toISOString()}

## For the next AI / human operator

Read these first:

1. \`START_HERE_FOR_AI.md\`
2. \`PROJECT_MASTER_MAP.md\`
3. \`data/project/book_identity.json\`
4. \`data/project/current_build_state.json\`
5. \`data/project/latest_cursor_return.json\`
6. \`reports/CC_PHASE_0_MASTER_PROJECT_FOUNDATION_1_0_RETURN.md\` (if present)

## Project

- **Title:** ${identity.title}
- **Subtitle:** ${identity.subtitle}
- **Local root:** \`H:\\Constitutional-Capitalism\`
- **Remote:** https://github.com/Grappe501/constitutional-capitalism
- **Branch:** \`${safe("git branch --show-current")}\`
- **HEAD:** \`${safe("git rev-parse --short HEAD")}\`

## Current state

- Mission / slice: \`${state.mission_id}\`
- Phase: \`${state.phase}\`
- Status: \`${state.status}\`
- Writing focus: ${state.writing_focus}
- Next action: ${state.next_action}
- Overall progress: **${snapshot.overall_percent}%**

## Active slice

- ID: \`${active?.slice_id || "none"}\`
- Title: ${active?.title || "n/a"}
- Status: \`${active?.status || "n/a"}\`

## Recommended next slice

- ID: \`${next?.slice_id || "TBD"}\`
- Title: ${next?.title || "TBD"}
- Do **not** mark Phase 1 active until Phase 0 validation succeeds.

## Open decisions (sample)

${decisions.decisions
  .filter((d) => d.status === "open")
  .slice(0, 8)
  .map((d) => `- \`${d.decision_id}\` ${d.title}`)
  .join("\n")}

## Hard rules

- H:-only protocol for project-controlled paths
- Do not invent citations or economic proof
- Do not present unfinished chapters as complete
- Do not change canonical title/subtitle
- Do not commit secrets
- Licensing requires Steve's approval

## Exact next commands

\`\`\`powershell
cd H:\\Constitutional-Capitalism
powershell -ExecutionPolicy Bypass -File scripts\\enter-cc-environment.ps1
pnpm env:verify
pnpm gate
\`\`\`

After Phase 0 is committed and pushed, begin:

\`CC-PHASE-1-FOUNDATIONAL-DECLARATION-1.0\`
`;

fs.writeFileSync(r("docs/handoffs/CURRENT_THREAD_HANDOFF.md"), handoff);
fs.writeFileSync(r("reports/CURRENT_THREAD_HANDOFF.md"), handoff);
console.log("[OK] Wrote docs/handoffs/CURRENT_THREAD_HANDOFF.md");
console.log("[OK] Wrote reports/CURRENT_THREAD_HANDOFF.md");
