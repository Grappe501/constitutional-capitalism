import fs from "node:fs";
import { execSync } from "node:child_process";
import { r } from "./lib/paths.mjs";

function safe(cmd) {
  try {
    return execSync(cmd, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
  } catch (e) {
    return `(unavailable: ${e.message.split("\n")[0]})`;
  }
}

const snapshot = JSON.parse(fs.readFileSync(r("data/metrics/progress_snapshot.json"), "utf8"));
const identity = JSON.parse(fs.readFileSync(r("data/project/book_identity.json"), "utf8"));
const deployments = JSON.parse(
  fs.readFileSync(r("data/deployments/deployment_status.json"), "utf8")
);
const decisions = JSON.parse(fs.readFileSync(r("data/decisions/decisions.json"), "utf8"));
const risks = JSON.parse(fs.readFileSync(r("data/project/risk_register.json"), "utf8"));
const structure = JSON.parse(fs.readFileSync(r("data/manuscript/book_structure.json"), "utf8"));

const gitStatus = safe("git status --short");
const gitBranch = safe("git branch --show-current");
const gitCommit = safe("git rev-parse --short HEAD");
const bookDist = fs.existsSync(r("apps/book-site/dist")) ? "present" : "missing";
const boardDist = fs.existsSync(r("apps/build-board/dist")) ? "present" : "missing";

const layerBars = snapshot.layers
  .map((l) => {
    const filled = Math.round(l.percent / 5);
    const bar = "█".repeat(filled) + "░".repeat(20 - filled);
    return `| ${l.label} | ${bar} | ${l.percent}% | ${l.status} |`;
  })
  .join("\n");

const report = `# Project Validation Report

Generated: ${new Date().toISOString()}

## Identity

- **Title:** ${identity.title}
- **Subtitle:** ${identity.subtitle}
- **Version:** ${identity.version}
- **Status:** ${identity.project_status}

## H:-Only Environment

Project-controlled caches and temps must resolve to \`H:\\Constitutional-Capitalism\\.local\\...\`.

Run \`pnpm env:verify\` for the authoritative check. This report does not claim OS/editor internals never touch \`C:\`.

| Variable / Path | Expected |
|---|---|
| TEMP / TMP | H:\\Constitutional-Capitalism\\.local\\tmp |
| npm cache | H:\\Constitutional-Capitalism\\.local\\npm-cache |
| pnpm store | H:\\Constitutional-Capitalism\\.local\\pnpm-store |
| Netlify home | H:\\Constitutional-Capitalism\\.local\\netlify |

## Repository State

- Branch: \`${gitBranch}\`
- HEAD: \`${gitCommit}\`
- Git status:
\`\`\`
${gitStatus || "(clean)"}
\`\`\`

## Schema / Data Validation

Structured records under \`data/\` are validated by \`pnpm project:validate\` and \`pnpm content:validate\`.

- Architectural units: **${structure.totals.architectural_units}**
- Numbered chapters: **${structure.totals.numbered_chapters}**
- Open decisions: **${decisions.decisions.filter((d) => d.status === "open").length}**
- Open risks: **${risks.risks.filter((x) => x.status === "open").length}**

## Application Builds

| App | Dist output |
|---|---|
| book-site | ${bookDist} |
| build-board | ${boardDist} |

## Progress

**Overall:** ${snapshot.overall_percent}%

| Layer | Progress | % | Status |
|---|---|---|---|
${layerBars}

## Deployment Readiness

${deployments.applications
  .map(
    (a) => `### ${a.name}
- Status: \`${a.status}\`
- Base directory: \`${a.base_directory}\`
- Build: \`${a.build_command}\`
- Publish: \`${a.publish_directory}\`
- Production URL: ${a.production_url || "_not yet configured_"}
- Manual setup remaining: ${(a.manual_setup_required || []).length} items
`
  )
  .join("\n")}

## Current Limitations

- Manuscript chapters are concept placeholders only.
- No citations invented; source registry is empty.
- No economic modeling completed.
- No legal review completed.
- Build Board is not access-protected yet.
- Licensing decision remains open.
- Public byline remains configurable / undecided.

## Deployment Readiness Verdict

Local foundation and Netlify configuration files are prepared. Production URLs must be recorded only after confirmed Netlify Git integration deploys.

## Notes

- Source of truth: structured files in \`data/\`
- Dashboard and this report are derived views
`;

fs.writeFileSync(r("reports/PROJECT_VALIDATION_REPORT.md"), report);
console.log("[OK] Wrote reports/PROJECT_VALIDATION_REPORT.md");
