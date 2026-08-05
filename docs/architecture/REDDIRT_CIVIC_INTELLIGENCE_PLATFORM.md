# RedDirt Civic Intelligence Platform (RCIP)

**Canonical engine workspace:** `H:\SOSWebsite\RedDirt`  
**First external proof consumer:** Constitutional Capitalism (`H:\Constitutional-Capitalism`)  
**Decisions:** `CC-DEC-076`, `CC-DEC-077`, `CC-DEC-078`  
**Spine config:** `data/project/rcip_civic_data_spine.json`  
**Bridge config:** `data/project/public_statistics_bridge.json`

## Shared civic-data spine

The real advantage is not merely reusing API keys. It is one place where public data is:

- ingested once;
- normalized once;
- source-verified once;
- cross-checked across agencies;
- versioned;
- audited;
- reused safely by many applications.

```text
Federal and state APIs
        ↓
RedDirt Civic Intelligence Platform
        ↓
Normalization + provenance + cross-checking
        ↓
Approved public-data views and exports
        ↓
Constitutional Capitalism
Arkansas Civic University
County Workbench
Stand Up Arkansas
Future civic systems
```

Constitutional Capitalism must **not** duplicate Census/BLS/agency connectors. It consumes approved projections only.

## Strongest feature: multi-source validation

A county employment picture should not depend on one number. RCIP compares, for example:

```text
Census ACS employment estimates
+
BLS labor-force statistics
+
BEA income and industry data
+
state workforce records
+
business-establishment data
```

When sources agree, confidence increases.

When they differ, the system records:

- differing definitions;
- survey versus administrative data;
- reference periods;
- geographic boundaries;
- revisions;
- uncertainty;
- which source is authoritative for the specific question.

That prevents treating two similarly named statistics as interchangeable.

## Four layers

### 1. Raw source layer

Preserve API responses, metadata, query parameters, retrieval dates, and checksums  
(**RedDirt only** — credentials/raw payloads do not enter the CC public repo).

### 2. Canonical public-data layer

Normalize agencies into shared concepts: geography, date, population, employment, income, education, housing, industry, health, infrastructure.

### 3. Evidence and confidence layer

For every metric: primary source, corroborating sources, conflicting sources, confidence, limitations, revision status, approved public wording.

### 4. Product projection layer

Each application receives only what it needs:

| Application | Projection |
|---|---|
| Constitutional Capitalism | Evidence, baseline metrics, provenance, confidence/disagreement |
| County Workbench | County profiles and comparisons |
| Arkansas Civic University | Instructional datasets |
| Campaign systems | Only legally/operationally appropriate **public** statistics — not CC doctrine, not unrelated private data |

## Critical governance rule

RedDirt is the shared engine, **not** one giant unrestricted database.

Isolated schemas / projections:

```text
public_statistics
campaign_private
people_private
research_evidence
education_public
county_profiles
```

Each application accesses only approved views or exports.

## What a CC statistic should eventually show

```text
Value
Source
Reference year
Definition
Geographic level
Original API query / RedDirt retrieval reference
Last refresh
Corroborating datasets
Known disagreement
Confidence rating
Applications using it
```

That is far more powerful than publishing a bare number.

## Network effect

Every new connector — BEA, USDA, FCC, CDC, EPA, EIA, Treasury, state agencies — improves all consumers through comparison and validation.

## Phase 2 posture

- Formalize RCIP as the shared spine (this document + `rcip_civic_data_spine.json`).
- Constitutional Capitalism is the **first external proof consumer**.
- Delivery form: validated snapshots under `data/imports/reddirt-public-statistics/`.
- Architecture does **not** raise baseline `2/86`.
- Connector and warehouse implementation lives in `H:\SOSWebsite\RedDirt`.

## Related CC artifacts

- Slice: `CC-PHASE-2-PUBLIC-STATISTICS-BRIDGE-1.0`
- Handoff: `docs/handoffs/BURT_PUBLIC_STATISTICS_BRIDGE.md`
- Validator: `pnpm imports:validate`
