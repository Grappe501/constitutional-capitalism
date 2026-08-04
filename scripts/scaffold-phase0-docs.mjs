import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TODAY = "2026-08-04";

function write(rel, body) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, body.trimStart() + "\n", "utf8");
  console.log("wrote", rel);
}

write(
  "START_HERE_FOR_AI.md",
  `# START HERE FOR AI

Mission context for any AI assistant working on **Constitutional Capitalism**.

## Canonical root

\`H:\\Constitutional-Capitalism\`

Remote: https://github.com/Grappe501/constitutional-capitalism

## Read first

1. This file
2. \`README.md\`
3. \`PROJECT_MASTER_MAP.md\`
4. \`CONSTITUTIONAL_CAPITALISM_MASTER_BUILD_PLAN.md\`
5. \`data/project/book_identity.json\`
6. \`data/project/current_build_state.json\`
7. \`data/project/latest_cursor_return.json\`
8. \`docs/governance/H_DRIVE_ONLY_PROTOCOL.md\`
9. \`docs/handoffs/CURRENT_THREAD_HANDOFF.md\`

## Hard rules

- **H:-only** for all project-controlled files, caches, temps, and artifacts.
- Never invent citations, economic proof, or legal conclusions.
- Never present unfinished chapters as finished.
- Never change the canonical title or subtitle.
- Never commit secrets.
- Licensing requires Steve's explicit approval.
- Source of truth is \`data/\` and \`content/\`, not the dashboard UI.

## Environment bootstrap

\`\`\`powershell
cd H:\\Constitutional-Capitalism
powershell -ExecutionPolicy Bypass -File scripts\\enter-cc-environment.ps1
pnpm env:verify
\`\`\`

## Common commands

\`\`\`powershell
pnpm content:validate
pnpm project:validate
pnpm progress:generate
pnpm book:dev
pnpm board:dev
pnpm gate
\`\`\`

## Apps

| App | Path | Port | Purpose |
|---|---|---|---|
| Book site | \`apps/book-site\` | 4321 | Public book website |
| Build Board | \`apps/build-board\` | 4322 | Master project dashboard |

## Collaboration

Steve (owner) · ChatGPT (mission design / review) · Cursor (implementation)

Follow \`docs/governance/AI_COLLABORATION_PROTOCOL.md\` and handoff docs under \`docs/handoffs/\`.
`
);

write(
  "README.md",
  `# Constitutional Capitalism

**Restoring Prosperity Through Constitutional Principles**

This repository is the canonical operating system for developing, researching, writing, publishing, and tracking the Constitutional Capitalism project.

## Canonical definition

> Constitutional Capitalism is an economic philosophy in which free markets, private property, entrepreneurship, and innovation are protected by constitutional principles that ensure economic power remains accountable to the people. It recognizes that wealth is most effectively created through free enterprise, but that lasting prosperity depends upon broad opportunity, meaningful competition, responsible ownership, and institutions that prevent the excessive concentration of economic or political power.

## Central belief

> The purpose of an economy is not merely to create wealth, but to create a prosperous, free, and self-governing people.

## Repository layout

- \`apps/book-site\` — public book website (Astro)
- \`apps/build-board\` — master Build Board (Astro)
- \`content/\` — manuscript, research notes, declarations, glossary
- \`data/\` — canonical structured project records (source of truth)
- \`docs/\` — governance, writing, research, publishing, operations
- \`scripts/\` — H:-only env, validation, progress, reports
- \`schemas/\` — JSON Schema validators
- \`reports/\` — generated validation and return reports

## H:-only protocol

Local development must keep project-controlled caches and temps on \`H:\`.

\`\`\`powershell
cd H:\\Constitutional-Capitalism
powershell -ExecutionPolicy Bypass -File scripts\\enter-cc-environment.ps1
pnpm env:verify
pnpm install
\`\`\`

Honest scope: Windows, Cursor, and Git may still touch \`C:\` for system internals. The enforceable rule is that project-controlled outputs and caches are redirected to \`H:\`.

## Scripts

| Command | Purpose |
|---|---|
| \`pnpm env:verify\` | Verify H:-only paths |
| \`pnpm book:dev\` / \`pnpm board:dev\` | Local app servers |
| \`pnpm content:validate\` | Manuscript/content checks |
| \`pnpm project:validate\` | Schema validation |
| \`pnpm progress:generate\` | Derive progress snapshot from data |
| \`pnpm gate\` | Full validation + builds + reports |

## Deployment

Two Netlify sites from one GitHub repo:

1. Book site — see \`netlify.book.toml\` and \`docs/deployment/\`
2. Build Board — see \`netlify.board.toml\` (enable access protection before sensitive content)

## Status

Phase 0 foundation. Manuscript chapters are architectural placeholders. Licensing decision open.

AI operators: begin at \`START_HERE_FOR_AI.md\`.
`
);

write(
  "PROJECT_MASTER_MAP.md",
  `# Project Master Map

Last updated: ${TODAY}

## Purpose

Map every major system in the Constitutional Capitalism repository.

## Systems

| System | Location | Role |
|---|---|---|
| Book identity | \`data/project/book_identity.json\` | Canonical title, definition, belief |
| Book architecture | \`data/manuscript/book_structure.json\` | Parts, chapters, stable IDs |
| Manuscript files | \`content/manuscript/\` | Chapter Markdown placeholders |
| Research registers | \`data/research/\` | Sources, claims, queues |
| Research notes | \`content/research/\` | Domain research directories |
| Policy system | \`data/project/policy_*.json\` | Pillars and proposals |
| Constitutional articles | \`data/project/constitutional_articles.json\` | Emerging economic constitution |
| Decisions | \`data/decisions/decisions.json\` | Open/approved/rejected decisions |
| Risks | \`data/project/risk_register.json\` | Risk register |
| Progress | \`data/metrics/\` | Layers, snapshots, milestones |
| Build slices | \`data/project/slice_queue.json\` | Mission/slice queue |
| Book site | \`apps/book-site\` | Public website |
| Build Board | \`apps/build-board\` | Master dashboard |
| Governance docs | \`docs/governance/\` | Project rules |
| Validation | \`scripts/\` + \`schemas/\` | Machine checks |
| CI | \`.github/workflows/check.yml\` | PR/main validation |
| Netlify | \`netlify.book.toml\`, \`netlify.board.toml\` | Dual deploy configs |

## Authority order

1. Steve's explicit decisions
2. Canonical JSON in \`data/\`
3. Governance documents in \`docs/\`
4. Manuscript content in \`content/\`
5. Derived UI (sites/board/reports)

## Current phase

Phase 0 — Foundation and Governance
`
);

write(
  "CONSTITUTIONAL_CAPITALISM_MASTER_BUILD_PLAN.md",
  `# Constitutional Capitalism — Master Build Plan

## Phase 0 — Foundation and Governance

Repository, H:-only environment, architecture, book map, canonical data, public-site shell, board shell, validation, deployment preparation.

## Phase 1 — Foundational Declaration

Define Constitutional Capitalism; first principles; preamble; Declaration; terms; boundaries from capitalism, socialism, Marxism, corporatism, and social democracy.

## Phase 2 — Diagnosis and Historical Foundation

Productivity/wages, wealth concentration, corporate power, financialization, globalization, internet commerce, local decline, constitutional history.

## Phase 3 — Economic Constitution

Rights, responsibilities, institutions, markets, competition, ownership, accountability, amendment/adaptation.

## Phase 4 — Policy Architecture

Taxation, corporations, labor, ownership, local commerce, banking, trade, technology, social wealth, measurement.

## Phase 5 — Testing and Opposition

Economic modeling, legal/constitutional review, counterarguments, adversarial analysis, international comparisons, failure modes.

## Phase 6 — Full Manuscript

Drafting, editorial passes, citations, continuity, voice, duplication reduction.

## Phase 7 — Public Education Edition

Citizen summary, policy guide, visuals, FAQs, glossary, downloadables.

## Phase 8 — Publication

Web, PDF, EPUB, print-ready, accessibility, licensing, distribution.

## Phase 9 — Public Launch and Continuing Work

Launch, feedback, corrections, versioned editions, international adaptation, continuing research.

## Progress discipline

Do not inflate percentages. Architecture/governance may advance early; manuscript, research verification, legal review, and launch readiness remain low until evidence exists.
`
);

const docs = [
  [
    "docs/governance/PROJECT_CHARTER.md",
    `# Project Charter

## Mission

Build a durable public intellectual system for developing and freely publishing *Constitutional Capitalism*.

## Scope

Philosophy, research, manuscript, policy proposals, public education, dual websites, and auditable project operations.

## Out of scope (Phase 0)

Database, authentication, CMS, paid services, invented citations, finished chapters.

## Owner

Steve Grappe (project creator). Public byline remains an open decision.

## Success for Phase 0

Validated monorepo, dual Astro apps, canonical data, governance docs, H:-only local protocol, Netlify-ready configs, GitHub remote synchronized.
`,
  ],
  [
    "docs/governance/FOUNDATIONAL_DOCTRINE.md",
    `# Foundational Doctrine

Working doctrine pending Phase 1 formalization.

1. Free enterprise creates wealth most effectively under real competition and broad opportunity.
2. Lasting prosperity requires accountable economic power.
3. Ownership, work, and local communities are civic as well as economic goods.
4. Markets need rules that protect liberty rather than entrench domination.
5. Government must be limited and capable.
6. The aim is a prosperous, free, and self-governing people — not wealth aggregates alone.

Boundaries against capitalism-as-extraction, socialism, Marxism, corporatism, and social democracy will be written in Phase 1.
`,
  ],
  [
    "docs/governance/CANONICAL_DEFINITION.md",
    `# Canonical Definition

Source of truth: \`data/project/book_identity.json\`

Do not maintain conflicting hard-coded definitions in application code.

Title and subtitle are non-negotiable unless Steve explicitly changes them.
`,
  ],
  [
    "docs/governance/CONTENT_AUTHORITY_RULES.md",
    `# Content Authority Rules

1. Stable IDs (\`CC-CH-###\`, \`CC-DEC-###\`, etc.) are permanent once issued.
2. Titles may change; IDs do not.
3. Public site may only mark chapters available when \`public_status\` permits.
4. Dashboard is a view, not authority.
5. AI drafts require human/editorial acceptance before publication claims.
`,
  ],
  [
    "docs/governance/FACTUAL_INTEGRITY_STANDARD.md",
    `# Factual Integrity Standard

- No invented facts or citations.
- Distinguish fact, interpretation, and proposal.
- Every major factual claim eventually links to claim-ledger + source IDs.
- Uncertainty must be explicit.
- AI output is presumptively unverified until checked.
`,
  ],
  [
    "docs/governance/CITATION_AND_SOURCE_STANDARD.md",
    `# Citation and Source Standard

- Register sources in \`data/research/source_registry.json\` before citing.
- Prefer primary data, peer-reviewed research, official statistics, and reputable legal texts.
- Record opposing evidence where material.
- Citation style decision remains open (\`CC-DEC-009\`).
`,
  ],
  [
    "docs/governance/EDITORIAL_INDEPENDENCE_STANDARD.md",
    `# Editorial Independence Standard

The book must not become a party pamphlet. Arguments stand on principles, evidence, and institutional design. Accidental partisanship is a tracked risk.
`,
  ],
  [
    "docs/governance/VERSIONING_AND_RELEASE_STANDARD.md",
    `# Versioning and Release Standard

- Project version in book identity (semver-like pre-release tags allowed).
- Public editions are versioned.
- Breaking architecture changes require decision log entries.
- Do not silently rewrite published claims; issue corrections.
`,
  ],
  [
    "docs/governance/AI_COLLABORATION_PROTOCOL.md",
    `# AI Collaboration Protocol

## Roles

- Steve: owner, final authority
- ChatGPT: mission framing, critique, handoffs
- Cursor: repository implementation and validation

## Rules

- Missions use stable IDs
- Returns written to \`reports/\` and \`data/project/latest_cursor_return.json\`
- No secret storage in repo
- H:-only local protocol always on
`,
  ],
  [
    "docs/governance/H_DRIVE_ONLY_PROTOCOL.md",
    `# H:-Only Protocol

## Rule

Everything project-controlled for Constitutional Capitalism must live under \`H:\\Constitutional-Capitalism\`.

## Includes

Repo files, builds, caches, package stores, Netlify local state, Astro/Vite caches, logs, downloads, backups, generated artifacts.

## Bootstrap

Use \`scripts/enter-cc-environment.ps1\` and verify with \`scripts/verify-h-drive-only.ps1\`.

## Honest distinction

This protocol redirects project-controlled paths. It cannot guarantee that Windows, Cursor, or Git never touch \`C:\` for their own internals. The enforceable requirement is project-controlled redirection to \`H:\`.

## CI distinction

GitHub Actions runners may use GitHub-managed paths. H:-only applies to the local machine.
`,
  ],
  [
    "docs/governance/SECURITY_AND_SECRETS_POLICY.md",
    `# Security and Secrets Policy

- Never commit tokens, passwords, or \`.env\` secrets.
- Build Board must not expose private personal data.
- Board is public-by-URL until access protection is enabled — document that honestly.
- Netlify/\`.netlify\` state is gitignored.
`,
  ],
  [
    "docs/governance/CHANGE_APPROVAL_POLICY.md",
    `# Change Approval Policy

| Change type | Approval |
|---|---|
| Canonical title/subtitle | Steve only |
| Licensing | Steve only |
| Public byline | Steve only |
| Architecture / schemas | Logged decision |
| Chapter title changes | Allowed with stable ID retention |
| Routine content drafts | Slice workflow |
`,
  ],
  [
    "docs/writing/BOOK_VOICE_AND_STYLE_GUIDE.md",
    `# Book Voice and Style Guide

Voice: serious, civic, clear, non-demagogic. Prefer concrete institutions over slogans. Explain before persuading. Respect the reader’s intelligence. Avoid academic fog and partisan pep rallies.
`,
  ],
  [
    "docs/writing/CHAPTER_DEVELOPMENT_WORKFLOW.md",
    `# Chapter Development Workflow

concept → outline → researching → drafting → draft_complete → editing → fact_check → legal_review → final → published

Update chapter front matter and \`book_structure.json\` together. Keep \`chapter_id\` stable.
`,
  ],
  [
    "docs/writing/ARGUMENT_CONSTRUCTION_STANDARD.md",
    `# Argument Construction Standard

1. State the claim
2. Define terms
3. Present evidence
4. Address strongest objection
5. State residual uncertainty
6. Link to related principles/articles
`,
  ],
  [
    "docs/writing/READER_ACCESSIBILITY_STANDARD.md",
    `# Reader Accessibility Standard

Plain language where possible; define necessary terms; short sections; progressive depth from citizen summary to policymaker detail.
`,
  ],
  [
    "docs/writing/COUNTERARGUMENT_STANDARD.md",
    `# Counterargument Standard

Steelman opposing views before rebuttal. Track major objections in \`data/project/objections.json\`. Do not mock critics.
`,
  ],
  [
    "docs/writing/TERMINOLOGY_STANDARD.md",
    `# Terminology Standard

Maintain definitions in \`data/project/terms_to_define.json\` and eventual glossary. Prefer one canonical term per concept.
`,
  ],
  [
    "docs/research/RESEARCH_PROTOCOL.md",
    `# Research Protocol

Research notes live under \`content/research/<domain>/\`. Registers live under \`data/research/\`. No invented sources. Separate data gathering from advocacy.
`,
  ],
  [
    "docs/research/CLAIM_LEDGER_PROTOCOL.md",
    `# Claim Ledger Protocol

Each major factual claim receives a claim ID, support level, source IDs, opposing evidence, uncertainty, fact-check status, and publication readiness.
`,
  ],
  [
    "docs/research/SOURCE_HIERARCHY.md",
    `# Source Hierarchy

1. Primary official data / statutes / court opinions
2. Peer-reviewed research
3. Reputable institutional analysis
4. High-quality journalism
5. Advocacy sources (label clearly)
`,
  ],
  [
    "docs/research/FACT_CHECKING_PROTOCOL.md",
    `# Fact-Checking Protocol

Claims move through \`data/research/fact_check_queue.json\`. Publication requires resolved fact-check status for high-importance claims.
`,
  ],
  [
    "docs/research/ECONOMIC_MODELING_REQUIREMENTS.md",
    `# Economic Modeling Requirements

No policy certainty claims without documented assumptions, incidence analysis, transition risks, and sensitivity notes. Modeling is Phase 5+ work.
`,
  ],
  [
    "docs/research/LEGAL_REVIEW_REQUIREMENTS.md",
    `# Legal Review Requirements

Constitutional, statutory, and trade-law sensitive claims require legal-review flags. This project does not claim legal advice or compliance certification.
`,
  ],
  [
    "docs/publishing/PUBLICATION_STRATEGY.md",
    `# Publication Strategy

Free public web edition first; PDF/EPUB later; print-ready optional. Public site must not overstate completion.
`,
  ],
  [
    "docs/publishing/FREE_DISTRIBUTION_COMMITMENT.md",
    `# Free Distribution Commitment

The finished book is intended to be freely available. Exact license pending Steve approval (\`CC-DEC-002\`).
`,
  ],
  [
    "docs/publishing/WEB_EDITION_PLAN.md",
    `# Web Edition Plan

Astro static site with chapter navigation, definition, principles, status, and future reader. Publish only cleared chapters.
`,
  ],
  [
    "docs/publishing/PDF_EPUB_PRINT_PLAN.md",
    `# PDF / EPUB / Print Plan

Deferred until manuscript maturity. Print dimensions remain an open decision.
`,
  ],
  [
    "docs/publishing/ACCESSIBILITY_STANDARD.md",
    `# Accessibility Standard

Semantic HTML, keyboard access, focus states, skip links, contrast, responsive type, reduced motion, meaningful titles, SR labels, no color-only meaning.
`,
  ],
  [
    "docs/publishing/LICENSING_DECISION_REQUIRED.md",
    `# Licensing Decision Required

**OPEN DECISION (\`CC-DEC-002\`)**

Do not select a final Creative Commons or public-domain license without Steve's approval. Record interim status as open.
`,
  ],
  [
    "docs/operations/CURSOR_RETURN_PROTOCOL.md",
    `# Cursor Return Protocol

Each mission ends with a return report covering mission ID, status, commits, files, validation, progress, risks, next slice, and next command. Store under \`reports/\` and update \`latest_cursor_return.json\`.
`,
  ],
  [
    "docs/operations/BUILD_SLICE_PROTOCOL.md",
    `# Build Slice Protocol

Slices have IDs, purpose, prerequisites, allowed/forbidden paths, required outputs, validation commands, and next recommended slice. Do not advance phases without validation evidence.
`,
  ],
  [
    "docs/operations/VALIDATION_AND_GATE_PROTOCOL.md",
    `# Validation and Gate Protocol

\`pnpm gate\` is the root quality gate: env verify, content/project validation, checks, builds, report, handoff.
`,
  ],
  [
    "docs/operations/DEPLOYMENT_PROTOCOL.md",
    `# Deployment Protocol

Local H: → git commit → GitHub → Netlify Git integration.

Do not embed Netlify credentials. Record URLs only after confirmation.
`,
  ],
  [
    "docs/operations/ROLLBACK_PROTOCOL.md",
    `# Rollback Protocol

Prefer revert commits on \`main\`. Netlify rollback to prior deploy if a bad build ships. Never force-push \`main\` unless Steve explicitly orders it.
`,
  ],
  [
    "docs/operations/PROJECT_BACKUP_PROTOCOL.md",
    `# Project Backup Protocol

Primary backup: GitHub remote. Local mirrors/backups under \`H:\\Constitutional-Capitalism\\.local\\backups\` only.
`,
  ],
  [
    "docs/handoffs/NEW_THREAD_HANDOFF_PROTOCOL.md",
    `# New Thread Handoff Protocol

Before starting a new thread, generate handoff via \`pnpm handoff:generate\` and point the next operator to \`START_HERE_FOR_AI.md\` + current return report.
`,
  ],
  [
    "docs/handoffs/CURSOR_TO_CHATGPT_HANDOFF.md",
    `# Cursor → ChatGPT Handoff

Provide: mission ID, status, commit range, validation results, open decisions, risks, recommended next slice, and exact next command.
`,
  ],
  [
    "docs/handoffs/CHATGPT_TO_CURSOR_MISSION_STANDARD.md",
    `# ChatGPT → Cursor Mission Standard

Missions must include ID, objective, allowed paths, forbidden actions, validation commands, and return requirements.
`,
  ],
  [
    "docs/architecture/SYSTEM_ARCHITECTURE.md",
    `# System Architecture

pnpm monorepo · two Astro static apps · JSON canonical data · Markdown manuscript · JSON Schema validation · GitHub Actions check · dual Netlify sites · no DB/auth/CMS in Phase 0.
`,
  ],
  [
    "docs/architecture/DATA_MODEL.md",
    `# Data Model

Canonical records in \`data/\` validated by \`schemas/\`. Apps import JSON at build time. Progress snapshots are derived, not authoritative.
`,
  ],
  [
    "docs/deployment/NETLIFY_SETUP.md",
    `# Netlify Setup Checklist

## Book Site

1. Import GitHub repo \`Grappe501/constitutional-capitalism\`
2. Site name suggestion: \`constitutional-capitalism\`
3. Base directory: \`apps/book-site\`
4. Build command: \`cd ../.. && corepack enable && pnpm install --frozen-lockfile && pnpm --filter book-site build\`
5. Publish directory: \`dist\`
6. Production branch: \`main\`
7. Deploy and record URL in \`data/deployments/deployment_status.json\`

## Build Board

1. Import the **same** repo as a second site
2. Site name suggestion: \`constitutional-capitalism-board\`
3. Base directory: \`apps/build-board\`
4. Build command: \`cd ../.. && corepack enable && pnpm install --frozen-lockfile && pnpm --filter build-board build\`
5. Publish directory: \`dist\`
6. Production branch: \`main\`
7. Enable Netlify site access protection before sensitive planning content
8. Record URL only after confirmation

Config references: \`netlify.book.toml\`, \`netlify.board.toml\`.
`,
  ],
  [
    "docs/deployment/GITHUB_ACTIONS_NOTE.md",
    `# GitHub Actions Note

CI uses GitHub-hosted runners and may cache on GitHub infrastructure. The H:-only rule applies to local development, not managed CI runners.
`,
  ],
];

for (const [rel, body] of docs) write(rel, body);

// Placeholder content dirs
write(
  "content/declarations/README.md",
  `# Declarations

Phase 1 will hold the Declaration of Constitutional Capitalism and related foundational texts.
`
);
write(
  "content/glossary/README.md",
  `# Glossary

Terms tracked in \`data/project/terms_to_define.json\`. Glossary drafting follows later phases.
`
);
write(
  "content/citations/README.md",
  `# Citations

Do not invent citations. Sources must be registered in \`data/research/source_registry.json\`.
`
);
write(
  "content/policy/README.md",
  `# Policy Content

Long-form policy notes. Structured proposals live in \`data/project/policy_proposals.json\`.
`
);
write(
  "content/public-resources/README.md",
  `# Public Resources

Future downloadable public materials.
`
);

// gitkeeps for .local
const localKeep = [
  ".local/tmp",
  ".local/cache",
  ".local/npm-cache",
  ".local/pnpm-store",
  ".local/pnpm-home",
  ".local/netlify",
  ".local/astro",
  ".local/vite",
  ".local/logs",
  ".local/downloads",
  ".local/backups",
];
for (const d of localKeep) {
  write(`${d}/.gitkeep`, "");
}

console.log("Docs scaffold complete.");
