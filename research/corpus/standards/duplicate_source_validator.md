# Duplicate Source Validator

Prevent the same paper, dataset, or report being entered multiple times.

## Checks

1. Exact `source_id` uniqueness
2. Normalized title+year+organization match
3. URL match
4. DOI / report number match when present
5. New edition → link `supersedes` / `superseded_by`, do not silently replace

Automated in `npm run corpus:validate`.
