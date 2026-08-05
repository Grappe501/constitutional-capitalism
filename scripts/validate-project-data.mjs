import fs from 'node:fs';
import { createRequire } from 'node:module';
import { r } from './lib/paths.mjs';

const require = createRequire(import.meta.url);
const Ajv2020 = require('ajv/dist/2020.js').default || require('ajv/dist/2020.js');
const ajv = new Ajv2020({ allErrors: true, strict: false });
const errors = [];
const fail = message => { errors.push(message); console.error('[FAIL]', message); };
const ok = message => console.log('[OK]', message);
const validations = [
  ['data/project/book_identity.json','schemas/book_identity.schema.json'],
  ['data/manuscript/book_structure.json','schemas/book_structure.schema.json'],
  ['data/metrics/progress_layers.json','schemas/progress_layers.schema.json'],
  ['data/research/claim_ledger.json','schemas/claim_ledger.schema.json'],
  ['data/research/source_registry.json','schemas/source_registry.schema.json'],
  ['data/project/policy_proposals.json','schemas/policy_proposals.schema.json'],
  ['data/decisions/decisions.json','schemas/decisions.schema.json'],
  ['data/project/risk_register.json','schemas/risk_register.schema.json'],
  ['data/deployments/deployment_status.json','schemas/deployment_status.schema.json'],
  ['data/project/phases.json','schemas/phases.schema.json'],
  ['data/project/constitutional_articles.json','schemas/constitutional_articles.schema.json'],
  ['data/project/latest_cursor_return.json','schemas/build_report.schema.json'],
  ['data/project/principles.json','schemas/principles.schema.json'],
  ['data/project/objections.json','schemas/objections.schema.json'],
  ['data/project/terms_to_define.json','schemas/terms_to_define.schema.json'],
  ['data/project/economic_system_comparison.json','schemas/economic_system_comparison.schema.json'],
  ['data/project/prediction_ledger.json','schemas/prediction_ledger.schema.json'],
  ['data/project/transition_scenarios.json','schemas/transition_scenarios.schema.json'],
  ['data/project/national_impact_assessments.json','schemas/national_impact_assessments.schema.json'],
  ['data/project/three_book_architecture.json','schemas/three_book_architecture.schema.json'],
  ['data/project/national_baseline.json','schemas/national_baseline.schema.json'],
  ['data/project/constitutional_capitalism_test.json','schemas/constitutional_capitalism_test.schema.json'],
  ['data/project/chapter_evaluation_template.json','schemas/chapter_evaluation_template.schema.json'],
  ['data/project/civilizational_core.json','schemas/civilizational_core.schema.json'],
  ['data/project/website_information_architecture.json','schemas/website_information_architecture.schema.json'],
  ['data/project/developing_doctrine.json','schemas/developing_doctrine.schema.json'],
  ['data/project/transition_timeline.json','schemas/transition_timeline.schema.json'],
  ['data/baseline/national_baseline_metrics.json','schemas/national_baseline_metrics.schema.json'],
  ['data/project/justice_framework.json','schemas/justice_framework.schema.json'],
  ['data/project/democracy_framework.json','schemas/democracy_framework.schema.json'],
  ['data/project/government_capacity_framework.json','schemas/government_capacity_framework.schema.json'],
  ['data/project/transparency_framework.json','schemas/transparency_framework.schema.json'],
  ['data/project/essential_systems_framework.json','schemas/essential_systems_framework.schema.json'],
  ['data/project/human_capital_framework.json','schemas/human_capital_framework.schema.json'],
  ['data/project/community_operating_system_framework.json','schemas/community_operating_system_framework.schema.json'],
  ['data/project/resource_sovereignty_framework.json','schemas/resource_sovereignty_framework.schema.json'],
  ['data/project/community_food_security_framework.json','schemas/community_food_security_framework.schema.json'],
  ['data/project/phase2_mission_lock.json','schemas/phase2_mission_lock.schema.json'],
  ['data/project/equal_standing_framework.json','schemas/equal_standing_framework.schema.json'],
  ['data/project/constitutional_citizenship_framework.json','schemas/constitutional_citizenship_framework.schema.json'],
  ['data/project/family_framework.json','schemas/family_framework.schema.json'],
  ['data/project/assistance_framework.json','schemas/assistance_framework.schema.json'],
  ['data/project/federalism_framework.json','schemas/federalism_framework.schema.json'],
  ['data/project/popular_sovereignty_framework.json','schemas/popular_sovereignty_framework.schema.json'],
  ['data/project/citizen_public_service_framework.json','schemas/citizen_public_service_framework.schema.json'],
  ['data/project/systems_map.json','schemas/systems_map.schema.json'],
  ['data/project/human_flourishing_index.json','schemas/human_flourishing_index.schema.json'],
  ['data/project/living_project_identity.json','schemas/living_project_identity.schema.json'],
  ['data/project/phase2_acceptance_checklist.json','schemas/phase2_acceptance_checklist.schema.json'],
  ['data/project/forensic_audit_governance.json','schemas/forensic_audit_governance.schema.json'],
  ['data/project/public_statistics_bridge.json','schemas/public_statistics_bridge.schema.json'],
  ['data/project/rcip_civic_data_spine.json','schemas/rcip_civic_data_spine.schema.json']
];
for (const [dataRel, schemaRel] of validations) {
  if (!fs.existsSync(r(dataRel))) { fail(`Missing data file: ${dataRel}`); continue; }
  if (!fs.existsSync(r(schemaRel))) { fail(`Missing schema: ${schemaRel}`); continue; }
  const validate = ajv.compile(JSON.parse(fs.readFileSync(r(schemaRel), 'utf8')));
  if (!validate(JSON.parse(fs.readFileSync(r(dataRel), 'utf8')))) {
    fail(`${dataRel} failed schema validation`);
    (validate.errors ?? []).forEach(error => console.error(`  - ${error.instancePath || '/'} ${error.message}`));
  } else ok(dataRel);
}
for (const relative of ['data/project/open_questions.json','data/research/research_questions.json','data/project/updates.json']) {
  try { JSON.parse(fs.readFileSync(r(relative), 'utf8')); ok(`parse ${relative}`); }
  catch { fail(`Missing or invalid data: ${relative}`); }
}
console.log(`Project data validation: ${errors.length ? 'FAILED' : 'PASSED'}`);
if (errors.length) process.exit(1);
