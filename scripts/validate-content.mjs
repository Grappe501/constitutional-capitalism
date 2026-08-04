import fs from "node:fs";
import path from "node:path";
import { ROOT, r } from "./lib/paths.mjs";

const errors = [];
const warnings = [];

function fail(msg) {
  errors.push(msg);
  console.error("[FAIL]", msg);
}
function warn(msg) {
  warnings.push(msg);
  console.warn("[WARN]", msg);
}
function ok(msg) {
  console.log("[OK]", msg);
}

const structurePath = r("data/manuscript/book_structure.json");
if (!fs.existsSync(structurePath)) {
  fail("Missing data/manuscript/book_structure.json — run scaffold first");
  process.exit(1);
}

const structure = JSON.parse(fs.readFileSync(structurePath, "utf8"));
const chapters = structure.chapters || [];

if (chapters.length < 90) {
  fail(`Expected at least 90 architectural units, found ${chapters.length}`);
} else {
  ok(`Book structure has ${chapters.length} units`);
}

const ids = new Set();
for (const ch of chapters) {
  if (!ch.chapter_id) fail(`Chapter missing chapter_id: ${ch.title}`);
  if (ids.has(ch.chapter_id)) fail(`Duplicate chapter_id: ${ch.chapter_id}`);
  ids.add(ch.chapter_id);

  const filePath = r(ch.file);
  if (!fs.existsSync(filePath)) {
    fail(`Missing manuscript file: ${ch.file}`);
  } else {
    const raw = fs.readFileSync(filePath, "utf8");
    if (!raw.startsWith("---")) fail(`Missing front matter: ${ch.file}`);
    if (!raw.includes(`chapter_id: ${ch.chapter_id}`)) {
      fail(`Front matter chapter_id mismatch: ${ch.file}`);
    }
    if (!raw.includes(`title:`) && !raw.includes(`title :`)) {
      warn(`Title field not found in ${ch.file}`);
    }
  }
}

// Research domain directories
const domains = [
  "economics",
  "taxation",
  "labor",
  "corporations",
  "ownership",
  "antitrust",
  "banking",
  "internet-commerce",
  "trade",
  "technology-ai",
  "constitutional-law",
  "international-models",
  "history",
  "community-economics",
];
for (const d of domains) {
  const p = r("content/research", d);
  if (!fs.existsSync(p)) fail(`Missing research domain: ${d}`);
}
ok(`Research domains present (${domains.length})`);

// Identity check
const identity = JSON.parse(fs.readFileSync(r("data/project/book_identity.json"), "utf8"));
if (identity.title !== "Constitutional Capitalism") {
  fail("Canonical title must remain Constitutional Capitalism");
}
if (identity.subtitle !== "Restoring Prosperity Through Constitutional Principles") {
  fail("Canonical subtitle mismatch");
}
ok("Book identity title/subtitle intact");

console.log("");
console.log(`Content validation: ${errors.length ? "FAILED" : "PASSED"}`);
if (warnings.length) console.log(`Warnings: ${warnings.length}`);
if (errors.length) process.exit(1);
