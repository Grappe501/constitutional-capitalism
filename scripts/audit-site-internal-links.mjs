import fs from "node:fs";
import path from "node:path";
import { r } from "./lib/paths.mjs";

function collectRoutes(pagesRoot) {
  const out = new Set();
  function walk(dir, prefix = "") {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        walk(full, `${prefix}${ent.name}/`);
        continue;
      }
      if (!ent.name.endsWith(".astro")) continue;
      if (ent.name === "404.astro") {
        out.add("/404/");
        continue;
      }
      if (ent.name.startsWith("[")) continue;
      const base = ent.name.replace(/\.astro$/, "");
      const route = base === "index" ? `/${prefix}` : `/${prefix}${base}/`;
      out.add(route.replace(/\/+/g, "/"));
    }
  }
  walk(pagesRoot);
  return out;
}

function walkFiles(root, acc = []) {
  for (const ent of fs.readdirSync(root, { withFileTypes: true })) {
    const full = path.join(root, ent.name);
    if (ent.isDirectory()) walkFiles(full, acc);
    else if (/\.(astro|ts|tsx|js|mjs)$/.test(ent.name)) acc.push(full);
  }
  return acc;
}

function collectHrefs(file) {
  const text = fs.readFileSync(file, "utf8");
  return [...text.matchAll(/href=["'](\/[^"'#?]*)["']/g)].map((m) => m[1]);
}

function normalize(href) {
  if (!href.startsWith("/")) return href;
  if (href.includes(".")) return href;
  return href.endsWith("/") ? href : `${href}/`;
}

function audit(label, pagesRoot, srcRoot) {
  const routes = collectRoutes(pagesRoot);
  const broken = [];
  for (const file of walkFiles(srcRoot)) {
    for (const href of collectHrefs(file)) {
      if (href.startsWith("http")) continue;
      const norm = normalize(href);
      if (norm.includes(".")) continue;
      if (!routes.has(norm)) {
        broken.push({
          href,
          file: path.relative(r("."), file).replace(/\\/g, "/"),
        });
      }
    }
  }
  console.log(`${label}: routes=${routes.size} broken_internal=${broken.length}`);
  for (const b of broken) console.log(`  ${b.href} <- ${b.file}`);
  return { routes: [...routes].sort(), broken };
}

const book = audit("BOOK", r("apps/book-site/src/pages"), r("apps/book-site/src"));
const board = audit("BOARD", r("apps/build-board/src/pages"), r("apps/build-board/src"));

const out = {
  generated_at: new Date().toISOString().slice(0, 10),
  book: { route_count: book.routes.length, broken: book.broken },
  board: { route_count: board.routes.length, broken: board.broken },
};
fs.mkdirSync(r("data/project"), { recursive: true });
fs.writeFileSync(
  r("data/project/site_internal_link_audit_1_0.json"),
  JSON.stringify(out, null, 2) + "\n"
);
console.log("[OK] wrote data/project/site_internal_link_audit_1_0.json");
