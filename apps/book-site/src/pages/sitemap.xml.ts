import type { APIRoute } from "astro";
import comparisonRaw from "../../../../data/project/economic_system_comparison.json";

type Sys = { slug?: string };

const staticPages = [
  "/",
  "/definition/",
  "/declaration/",
  "/why/",
  "/principles/",
  "/compare/",
  "/book/",
  "/read/",
  "/about/",
  "/status/",
  "/resources/",
  "/updates/",
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
