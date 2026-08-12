import fs from "node:fs";
import path from "node:path";
import { abs } from "./paths.mjs";

export function readJson(rel) {
  return JSON.parse(fs.readFileSync(abs(rel), "utf8"));
}

export function writeJson(rel, data) {
  const p = abs(rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export function exists(rel) {
  return fs.existsSync(abs(rel));
}
