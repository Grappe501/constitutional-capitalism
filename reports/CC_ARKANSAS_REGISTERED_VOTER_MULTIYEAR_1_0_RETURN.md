# CC-ARKANSAS-REGISTERED-VOTER-MULTIYEAR-1.0 — Return

**Decision:** CC-DEC-122  
**Update:** UPD-135  
**Date:** 2026-08-12  
**Overall completion:** **43%** (held)

## Verdict

Multi-year registered-voter series bound for all **7 designated Arkansas counties** from **EAC EAVS 2016, 2018, 2020, 2022, and 2024**. County×Year layer advanced to **v1.3** (**866** non-null observations; **+107** this slice).

## What landed

| Year | Election type label | A1a registration | A1b active | F1a ballots | Turnout-of-registered |
|---|---|---|---|---|---|
| 2016 | presidential_general_2016 | ✓ | n/a in EAVS 2016 | ✓ | general + presidential |
| 2018 | midterm_general_2018 | ✓ | ✓ | ✓ | general |
| 2020 | presidential_general_2020 | ✓ | ✓ | ✓ | general + presidential |
| 2022 | midterm_general_2022 | ✓ | ✓ | ✓ | general |
| 2024 | presidential_general_2024 | ✓ (prior) | ✓ (prior) | ✓ (prior) | prior + preserved |

## Artifacts

- `data/project/arkansas_county_longitudinal_observation_layer.json` (v1.3)
- `data/project/arkansas_county_living_systems_explorer.json` (v1.2)
- `data/project/arkansas_registered_voter_multiyear_wave.json`
- `data/imports/arkansas-registered-voter-multiyear/designated_county_eavs_multiyear.json`
- `data/project/arkansas_county_missing_data_registry.json` (GAP-REG-MULTIYEAR → PASSED)
- `data/project/arkansas_county_turnout_source_inventory.json` (EAVS multi-year status)
- Builder: `scripts/run-arkansas-registered-voter-multiyear.py`

## Method holds

- Observation first; no causal turnout model  
- Election-type labels preserved (presidential vs midterm general)  
- CVAP turnout ≠ registered turnout  
- SOS daily/PDF rolls and municipal/school-board series remain **NEE**  
- No site lock; dial held at 43%

## Still NEE

- Arkansas SOS historical daily registration rolls  
- Municipal / school-board registration  
- Primary election denominators  

## Next

Validated comparative diagnosis packets using the multi-year registration series + Counterexample Register; structural definition-locks remain the active structural slice.
