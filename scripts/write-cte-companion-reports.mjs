import fs from "node:fs";
import path from "node:path";
import { r } from "./lib/paths.mjs";

function w(rel, t) {
  const p = r(rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, t.endsWith("\n") ? t : t + "\n");
  console.log("[OK]", rel);
}

const inv = JSON.parse(
  fs.readFileSync(r("research/phase_2/arkansas_secondary_career_center_inventory.json"), "utf8")
);
const fund = JSON.parse(
  fs.readFileSync(r("research/phase_2/arkansas_cte_funding_stack.json"), "utf8")
);
const centers = inv.centers || inv.inventory || [];
const sources = fund.sources || fund.funding_sources || [];

w(
  "reports/CC_ARKANSAS_SECONDARY_CAREER_CENTER_INVENTORY_1_0.md",
  `# Arkansas Secondary Career Center Inventory 1.0

Source: OSD 2024–25 directory (CC-SRC-137). Centers listed: **${centers.length}**.

Canonical JSON: \`research/phase_2/arkansas_secondary_career_center_inventory.json\`

Per-center enrollment, capacity, outcomes, and funding: **UNKNOWN / REQUIRES LOCAL REQUEST** unless stated in JSON.

| Center | Host city | Sample programs |
|---|---|---|
${centers
  .map((c) => {
    const name = c.name || c.center_name || "—";
    const city = c.city || c.location || "—";
    const progs = (c.programs || c.programs_of_study || []).slice(0, 5).join("; ") || "see JSON";
    return `| ${name} | ${city} | ${progs} |`;
  })
  .join("\n")}
`
);

w(
  "reports/CC_ARKANSAS_CTE_OUTCOMES_MATRIX_1_0.md",
  `# Arkansas CTE Outcomes Matrix 1.0

Canonical: \`research/phase_2/arkansas_cte_outcomes_matrix.json\`

## Levels

CENTER · PROGRAM · DISTRICT · STATEWIDE — do not attribute statewide results to a center.

## Key historical finding (Dougherty 2017, CC-SRC-138)

Secondary career-center concentrator outcomes (graduation, college, early earnings) were **comparable** to traditional high-school CTE concentrators — not meaningfully different.

## Current center-level wages/placement

**NOT PUBLICLY AVAILABLE** in this slice (OSD annual report not harvested).
`
);

w(
  "reports/CC_ARKANSAS_CTE_FUNDING_STACK_1_0.md",
  `# Arkansas CTE Funding Stack 1.0

Canonical: \`research/phase_2/arkansas_cte_funding_stack.json\`

| Source | Class |
|---|---|
${sources
  .map((s) => {
    const name = s.name || s.program || s.funding_id || "—";
    const cls = s.classification || s.funding_class || s.type || "see JSON";
    return `| ${name} | ${cls} |`;
  })
  .join("\n")}

See also: \`reports/CC_CTE_RECURRING_VS_ONE_TIME_FUNDING_ANALYSIS_1_0.md\`
`
);

w(
  "reports/CC_ARKANSAS_CTE_STUDENT_FUNDING_FLOW_1_0.md",
  `# Arkansas CTE Student Funding Flow 1.0

Canonical: \`research/phase_2/arkansas_cte_student_funding_flow.json\`

Summary: Secondary Technical Center attendance involves sending-district enrollment plus center VCA FTE aid. OSD materials state center programs are funded without tuition to families. Exact foundation-funding follow rules, special-education obligations, and choice interactions: many fields remain **UNKNOWN** pending statute/finance memo harvest.
`
);

w(
  "reports/CC_CTE_MARGINAL_STUDENT_COST_FRAMEWORK_1_0.md",
  `# CTE Marginal Student Cost Framework 1.0

Canonical: \`research/phase_2/cte_marginal_student_cost_framework.json\`

Accounting framework only — **no invented dollar values**. Variables include instruction, transportation, equipment/consumables, credential fees, counseling, special education, food, admin, insurance, facilities, WBL supervision.
`
);

w(
  "reports/CC_ARKANSAS_CTE_ACCESS_GAPS_1_0.md",
  `# Arkansas CTE Access Gaps 1.0

Companion to \`reports/CC_ARKANSAS_CTE_ACCESS_MAP_1_0.md\` and \`research/phase_2/arkansas_cte_access_map.json\`.

Distance alone ≠ lack of access. Capacity, schedule, eligibility, transportation, and district participation matter.

Sample geographies evaluated (selection documented in JSON): Rose Bud, West Helena, Searcy County, Mississippi County, Lafayette County, Clinton/Van Buren.
`
);

w(
  "reports/CC_RURAL_CTE_SPECIALTY_FIT_MATRIX_1_0.md",
  `# Rural CTE Specialty Fit Matrix 1.0

Canonical: \`research/phase_2/rural_cte_specialty_fit_matrix.json\`

Labels only: STRONG CANDIDATE / PLAUSIBLE / WEAK / NOT ENOUGH EVIDENCE.
**No permanent specialty assignments.**
`
);

w(
  "reports/CC_RURAL_CTE_LOCAL_RETENTION_TEST_1_0.md",
  `# Rural CTE Local Retention Test 1.0

Companion to \`reports/CC_CTE_RETENTION_VS_STUDENT_SUCCESS_FRAMEWORK_1_0.md\`.

## Critical falsification

Training students for jobs elsewhere is **not** rural revitalization.

Track separately: STUDENT SUCCESS · PROGRAM SUCCESS · EMPLOYER SUCCESS · COMMUNITY RETENTION · COMMUNITY WEALTH.

Arkansas local-retention evidence for STC graduates: largely **UNTESTED** in public sources this slice.
`
);

const transp = fs.readFileSync(r("reports/CC_CTE_TRANSPORTATION_FEASIBILITY_1_0.md"), "utf8");
w(
  "reports/CC_RURAL_CTE_REGIONAL_TRANSPORTATION_FEASIBILITY_1_0.md",
  transp.replace(/^# .*/m, "# Rural CTE Regional Transportation Feasibility 1.0")
);

const fail = fs.readFileSync(
  r("reports/CC_CTE_FAILURE_MODES_AND_DOUGHERTY_IMPLICATION_1_0.md"),
  "utf8"
);
w(
  "reports/CC_RURAL_CTE_MAGNET_FAILURE_MODES_1_0.md",
  fail.replace(/^# .*/m, "# Rural CTE Magnet Failure Modes 1.0")
);

console.log("companion reports done");
