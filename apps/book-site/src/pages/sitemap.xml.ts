import type { APIRoute } from "astro";
import comparisonRaw from "../../../../data/project/economic_system_comparison.json";

type Sys = { slug?: string };

const staticPages = [
  "/",
  "/about/",
  "/assistance/",
  "/book/",
  "/build-progress/",
  "/build-progress/passes/",
  "/build-progress/passes/pass-1/",
  "/build-progress/passes/pass-2/",
  "/build-progress/passes/pass-3/",
  "/build-progress/passes/pass-4/",
  "/build-progress/passes/pass-5/",
  "/build-your-community/",
  "/citizen-service/",
  "/civic-wealth/",
  "/collaborative-review/",
  "/community-prosperity/",
  "/community-resilience/",
  "/compare/",
  "/constitutional-citizenship/",
  "/constitutional-defense/",
  "/declaration/",
  "/definition/",
  "/democracy/",
  "/energy-sovereignty/",
  "/equal-standing/",
  "/essential-systems/",
  "/evidence/",
  "/evidence/methodology/",
  "/evidence/open-questions/",
  "/family/",
  "/family-farm-prosperity/",
  "/federalism/",
  "/flourishing/",
  "/food-security/",
  "/foundational-axioms/",
  "/health/",
  "/human-capital/",
  "/justice/",
  "/local-ownership/",
  "/metrics/",
  "/peoples-branch/",
  "/principles/",
  "/prosperous-aging/",
  "/public-service/",
  "/read/",
  "/research/",
  "/resource-sovereignty/",
  "/resources/",
  "/status/",
  "/system/",
  "/system/arkansas-state-baseline/",
  "/system/visual-language/",
  "/system/money-ownership/",
  "/system/household-place/",
  "/system/government-power/",
  "/system/transition-measurement/",
  "/systems-intelligence/",
  "/transparency/",
  "/updates/",
  "/where-we-are/",
  "/why/",
];

const systems = (Array.isArray(comparisonRaw) ? comparisonRaw : []) as Sys[];
const systemPages = systems
  .map((s) => s.slug)
  .filter((slug): slug is string => typeof slug === "string" && slug.length > 0)
  .map((slug) => `/compare/${slug}/`);

const pages = [...staticPages, ...systemPages];

export const GET: APIRoute = ({ site }) => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) =>
      `  <url><loc>${new URL(p, site).toString()}</loc><changefreq>weekly</changefreq></url>`
  )
  .join("\n")}
</urlset>`;
  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
