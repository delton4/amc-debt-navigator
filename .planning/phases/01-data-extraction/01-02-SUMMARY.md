---
phase: 01-data-extraction
plan: 02
subsystem: data
tags: [openpyxl, excel, json, extraction, odeon, muvico, valuation, revenue-build, quarterly]

# Dependency graph
requires:
  - "01-01: tools/extract_excel.py with round_cell(), get_period_columns(), extract_flat_array(), extract_sensitivity_grid(), find_row_by_label() utilities"
provides:
  - "odeon-is.json: Odeon income statement flat-array 2018FY-2039FY with projected flags"
  - "wacc-odeon.json: Odeon WACC components, debt tranche, and CAPM inputs"
  - "odeon-da-capex.json: Odeon D&A and CapEx flat-array 2022FY-2036FYE"
  - "odeon-dcf.json: Odeon DCF UFCF time series + terminal value (exit multiple and perpetuity growth)"
  - "muvico-is.json: Muvico income statement with quarterly+annual periods Q3 2024-2036FY"
  - "muvico-wacc.json: Muvico WACC components, 4 debt tranches, and CAPM inputs"
  - "muvico-da-capex.json: Muvico D&A and CapEx flat-array 2024FY-2036FYE"
  - "muvico-dcf.json: Muvico DCF UFCF time series + terminal value methods"
  - "valuation.json: AMC implied EV tables (two scenarios); Odeon/Muvico sections empty in source"
  - "revenue-build.json: Quarterly revenue by segment 2020-2030 with positional label correction (51 periods)"
affects: [03-core-models, 04-supporting-models]

# Tech tracking
tech-stack:
  added: []
  patterns: [positional-column-label-correction, string-period-header-parsing, entity-section-extraction]

key-files:
  created:
    - "site/data/odeon-is.json"
    - "site/data/wacc-odeon.json"
    - "site/data/odeon-da-capex.json"
    - "site/data/odeon-dcf.json"
    - "site/data/muvico-is.json"
    - "site/data/muvico-wacc.json"
    - "site/data/muvico-da-capex.json"
    - "site/data/muvico-dcf.json"
    - "site/data/valuation.json"
    - "site/data/revenue-build.json"
  modified:
    - "tools/extract_excel.py"

key-decisions:
  - "Odeon/Muvico DCF sheets have no sensitivity grids (unlike consolidated UFCF); extracted terminal value methods (exit multiple + perpetuity growth) instead"
  - "Valuation sheet only has AMC data populated; Odeon/Muvico sections are empty headers in source Excel"
  - "Revenue Build uses hardcoded positional mapping for period labels to correct Excel copy-paste errors in columns 25-28, 40-53"
  - "Extracted 17 revenue segment rows (US/Intl/Muvico/AMCEH with admissions/F&B/other breakdowns) beyond minimum plan requirements"
  - "Odeon IS extended through 2039FY (22 periods) matching full Excel range for maximum downstream utility"

patterns-established:
  - "get_period_columns_string(): string-based period header parser for FY/FYE/quarterly labels"
  - "Positional column anchor pattern: annual columns define quarterly label boundaries"
  - "Entity DCF schema: time series + terminalValue{} + perpetuityGrowth{} (no sensitivity grid)"

requirements-completed: [DATA-01, DATA-02]

# Metrics
duration: 9min
completed: 2026-03-23
---

# Phase 1 Plan 2: Entity-Specific Sheets + Revenue Build Summary

**Extracted 10 entity-specific JSON files (Odeon IS/WACC/D&A/DCF, Muvico IS/WACC/D&A/DCF, Valuation, Revenue Build) with positional quarterly label correction for Revenue Build mislabeled columns**

## Performance

- **Duration:** 9 min
- **Started:** 2026-03-23T21:22:48Z
- **Completed:** 2026-03-23T21:32:28Z
- **Tasks:** 2
- **Files created:** 10

## Accomplishments
- Extracted all 9 entity-specific sheets (Odeon IS/WACC/D&A/DCF, Muvico IS/WACC/D&A/DCF, Valuation) with clean JSON and zero floating-point artifacts
- Revenue Build extraction uses positional column anchors to correct mislabeled quarterly headers (e.g., cols 25-28 labeled '2022Q1-Q4' actually hold 2025 data)
- Revenue Build produces 17 segment revenue rows across 51 periods with quarterly sum vs annual total validation
- Odeon/Muvico DCF files include both exit multiple and perpetuity growth terminal value methods

## Task Commits

Each task was committed atomically:

1. **Task 1: Extract entity-specific sheets (Odeon and Muvico)** - `e2a22ce` (feat) - 9 JSON files for Odeon/Muvico/Valuation
2. **Task 2: Extract Revenue Build with positional quarter label correction** - `e3dec64` (feat) - revenue-build.json with 51 periods

**Plan metadata:** (pending)

## Files Created/Modified
- `tools/extract_excel.py` - Extended with 10 new extractor functions + get_period_columns_string() utility
- `site/data/odeon-is.json` - Odeon income statement 2018FY-2039FY (22 periods, projected from 2026)
- `site/data/wacc-odeon.json` - Odeon WACC inputs, 1 debt tranche, CAPM cost of equity
- `site/data/odeon-da-capex.json` - Odeon D&A and CapEx 2022FY-2036FYE (15 periods, projected from 2026)
- `site/data/odeon-dcf.json` - Odeon UFCF time series 2026e-2036e with terminal value methods
- `site/data/muvico-is.json` - Muvico income statement Q3 2024 through 2036FY (19 periods, mixed quarterly/annual)
- `site/data/muvico-wacc.json` - Muvico WACC inputs, 4 debt tranches, CAPM cost of equity
- `site/data/muvico-da-capex.json` - Muvico D&A and CapEx 2024FY-2036FYE (13 periods, projected from 2026)
- `site/data/muvico-dcf.json` - Muvico UFCF time series 2026e-2036e with terminal value methods
- `site/data/valuation.json` - AMC implied EV with two scenarios (Odeon/Muvico sections empty in source)
- `site/data/revenue-build.json` - 17 revenue segments across 51 periods (2020-2030, quarterly + annual)

## Decisions Made
- Odeon/Muvico DCF sheets contain no sensitivity grid (unlike the consolidated UFCF sheet). Extracted terminal value sections (exit multiple + perpetuity growth methods) which provide the DCF valuation outputs.
- Valuation sheet has populated data only for AMC (two scenario columns); Odeon and Muvico sections are empty headers with no formula or data. Extracted AMC data and documented empty entity sections.
- Revenue Build period labels built from hardcoded positional anchors (col 4=2020, col 9=2021, ..., col 54=2030) rather than trusting mislabeled header strings. This corrects the known copy-paste error in the source Excel.
- Extended extraction to include all 17 meaningful revenue segment rows (US admissions/F&B/other, International admissions/F&B/other, Muvico, AMCEH) rather than just totals for maximum downstream analytical utility.
- Odeon IS extracted through 2039FY (22 periods), matching the full Excel column range.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Entity DCF sheets have no sensitivity grid**
- **Found during:** Task 1
- **Issue:** Plan specified `exitMultipleWaccGrid` for Odeon DCF and Muvico DCF, but inspection reveals these sheets contain only time series data + terminal value sections (no 2D sensitivity grid like the consolidated UFCF sheet)
- **Fix:** Extracted what actually exists: terminal value exit multiple method and perpetuity growth method as nested objects. Omitted `exitMultipleWaccGrid` key since the source data doesn't contain it.
- **Files modified:** site/data/odeon-dcf.json, site/data/muvico-dcf.json
- **Verification:** Both files validated with correct terminal value and perpetuity growth sections
- **Committed in:** e2a22ce (Task 1 commit)

**2. [Rule 1 - Bug] Valuation sheet Odeon/Muvico sections empty**
- **Found during:** Task 1
- **Issue:** Plan expected implied EV values for all three entities, but Odeon and Muvico sections only have header text with no data or formulas
- **Fix:** Extracted AMC data (two scenarios) and documented empty entity sections rather than fabricating data
- **Files modified:** site/data/valuation.json
- **Verification:** Confirmed with both data_only=True and data_only=False that no formulas or values exist in rows 12-27
- **Committed in:** e2a22ce (Task 1 commit)

**3. [Rule 1 - Bug] WACC Odeon/Muvico sheets have no sensitivity grid**
- **Found during:** Task 1
- **Issue:** Plan specified exitMultipleWaccGrid for WACC entity sheets, but these are small vertical-layout sheets (23-27 rows) with no 2D grid area
- **Fix:** Extracted WACC inputs and debt tranches without sensitivity grid
- **Files modified:** site/data/wacc-odeon.json, site/data/muvico-wacc.json
- **Verification:** Both files validated with correct inputs and debt tranche data
- **Committed in:** e2a22ce (Task 1 commit)

---

**Total deviations:** 3 auto-fixed (3 bugs - plan assumptions didn't match source data)
**Impact on plan:** All deviations reflect plan-vs-reality discrepancies in the source Excel. Extracted all data that actually exists. No data fabricated. No scope creep.

## Issues Encountered
None - extraction ran cleanly on first attempt for all 10 files.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 10 entity-specific + Revenue Build JSON files ready for downstream consumption
- Total JSON files in site/data/: 20 (7 from Plan 01 + 10 from Plan 02 + 3 pre-existing)
- Plan 03 (recovery/capital/comps sheets + reconciliation) can proceed
- Revenue Build data feeds Phase 4 revenue visualization
- Odeon/Muvico DCF data feeds Phase 3 entity-specific DCF model pages

## Self-Check: PASSED

- [x] site/data/odeon-is.json exists
- [x] site/data/wacc-odeon.json exists
- [x] site/data/odeon-da-capex.json exists
- [x] site/data/odeon-dcf.json exists
- [x] site/data/muvico-is.json exists
- [x] site/data/muvico-wacc.json exists
- [x] site/data/muvico-da-capex.json exists
- [x] site/data/muvico-dcf.json exists
- [x] site/data/valuation.json exists
- [x] site/data/revenue-build.json exists
- [x] tools/extract_excel.py exists
- [x] Commit e2a22ce found in git log
- [x] Commit e3dec64 found in git log

---
*Phase: 01-data-extraction*
*Completed: 2026-03-23*
