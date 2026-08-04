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
  ['data/project/economic_system_comparison.json','schemas/economic_system_comparison.schema.json']
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
