/**
 * Fail if Arkansas's (wrong possessive) appears in Public Book surfaces or Stage 5 chapter JSON.
 * House style: Arkansas' — never Arkansas's.
 */
import fs from "node:fs";
import path from "node:path";
import { ROOT, r } from "./lib/paths.mjs";

const BAD = "Arkansas's";
const errors = [];

function walk(dir, filter) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(full, filter));
    else if (filter(full)) out.push(full);
  }
  return out;
}

const targets = [
  ...walk(r("apps/book-site/src/pages/public-book"), (f) => f.endsWith(".astro")),
  ...walk(r("data/project"), (f) => {
    const base = path.basename(f);
    return /^stage5_pass5.*\.json$/.test(base);
  }),
];

for (const file of targets) {
  const raw = fs.readFileSync(file, "utf8");
  // Allow explicit house-style prohibition sentences that mention the wrong form in quotes/never clauses
  const lines = raw.split(/\r?\n/);
  lines.forEach((line, i) => {
    if (!line.includes(BAD)) return;
    const lowered = line.toLowerCase();
    if (
      lowered.includes("never") ||
      lowered.includes("house style") ||
      lowered.includes("house_style") ||
      lowered.includes("possessive") ||
      lowered.includes("refused") ||
      lowered.includes("incorrect") ||
      lowered.includes("wrong form") ||
      line.includes(`“${BAD}”`) ||
      line.includes(`"${BAD}"`) ||
      line.includes(`'${BAD}'`)
    ) {
      return;
    }
    errors.push(`${path.relative(ROOT, file)}:${i + 1}: found ${BAD}`);
  });
}

if (errors.length) {
  console.error("[FAIL] Arkansas' house-style violations:");
  errors.forEach((e) => console.error(" ", e));
  process.exit(1);
}

console.log(`[OK] Arkansas' house style — 0 violations in ${targets.length} Public Book / Stage 5 files`);
