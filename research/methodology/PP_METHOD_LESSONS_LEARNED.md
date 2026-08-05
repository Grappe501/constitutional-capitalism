# PP-FF-01 Method Lessons Learned

## Worked Well

- Canonical template forced contrary, alternatives, boundaries, failure conditions.
- Registered-source discipline prevented invented citations.
- Qualifies verdict demonstrated investigator mindset (CC-DEC-102).
- Ledger + contract made the packet machine-checkable.
- Confidence capped at Low when contrary external corpus was empty.

## Needs Improvement

- Contrary evidence must include registered `CC-SRC-*` sources before Complete.
- Separate descriptive_confidence vs hypothesis_confidence in contract.
- Encode minimum contrary_search_log length in validator.
- Legal/economic section checklists with explicit “gap” vs “reviewed” flags.

## Unexpected Problems

- Scaffold opposing notes felt like contrary evidence but are not external literature.
- Architecture prose is rhetorically strong and must stay out of the evidence column.
- “Supports / Qualifies / Contradicts” headings all required even when two are “Not selected.”

## Reviewer Friction

- No independent reviewer yet (Founding Steward beta).
- Method audit authored by packet author — independence deferred.

## Research Bottlenecks

- Source registration before citation is slow but necessary.
- No corpus home for reusable contrary literature (addressed in Script 4).
- Peer-reviewed searches not yet operationalized as jobs (Script 6).

## Missing Standards

- Verdict decision tree (now added).
- Research quality metrics (now added).
- Confirmation-bias checklist as first-class artifact (now added).

## Ambiguous Instructions

- When Not Enough Evidence vs Qualifies for thin descriptive baselines.
- How many contrary sources are “enough” for Complete.

## Validation Improvements

- Fail Complete without external contrary CC-SRC (unless waived with rationale).
- Require methodology_version on all executive packets (already present).
- Warn when supporting_sources >> contrary_sources by >3:1 without Low confidence.

## Automation Opportunities

- Ledger row generation from claim_ledger / source_registry IDs.
- Coverage metrics dashboard from registry JSON.
- Duplicate source detection at corpus layer.
