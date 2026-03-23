---
phase: 01-data-extraction
plan: 01
subsystem: data
tags: [openpyxl, excel, json, extraction, financial-data, dcf, wacc]

# Dependency graph
requires: []
provides:
  - "tools/extract_excel.py with round_cell(), get_period_columns(), extract_flat_array(), extract_sensitivity_grid() utilities"
  - "is.json: Income Statement flat-array 2019-2033 with projected flags"
  - "bs.json: Balance Sheet flat-array 2019-2025 (actuals)"
  - "cfs.json: Cash Flow Statement flat-array 2019-2025 (actuals)"
  - "nwc.json: Net Working Capital flat-array 2020-2033 with projected flags"
  - "da-capex.json: D&A and CapEx flat-array 2022-2033 with projected flags"
  - "wacc.json: WACC components, debt tranches, and EV sensitivity grid"
  - "ufcf.json: UFCF DCF time series, terminal value, perpetuity growth, and EV sensitivity grid"
affects: [02-ui-components, 03-interactive-models, 04-analysis-pages]

# Tech tracking
tech-stack:
  added: []
  patterns: [number_format-aware rounding, flat-array JSON schema, sensitivity-grid JSON schema, label-scanning row detection]

key-files:
  created:
    - "tools/extract_excel.py"
    - "site/data/is.json"
    - "site/data/bs.json"
    - "site/data/cfs.json"
    - "site/data/nwc.json"
    - "site/data/da-capex.json"
    - "site/data/wacc.json"
    - "site/data/ufcf.json"
  modified: []

key-decisions:
  - "Rounded all values to Excel number_format display precision (0 dp for #,##0, 2 dp for #,##0.00, percentage dp+2 for 0.00%)"
  - "Included NWC and D&A projected data through 2033 (beyond plan's 2025/2031 scope) since data exists in Excel and maximizes downstream utility"
  - "Extraction script lives at project root tools/ (outside site/ git repo) following existing tooling convention"
  - "Used label-scanning (find_row_by_label) instead of hardcoded row numbers for resilient extraction"

patterns-established:
  - "flat-array schema: {periods, isProjected, projectedStart, ...value_arrays}"
  - "sensitivity-grid schema: {rowAxis, colAxis, grid} for 2D EV tables"
  - "round_cell(cell) as universal cell-value rounding for all sheets"
  - "get_period_columns() with both integer and DEC 'YY string header support"
  - "Label-based row detection via find_row_by_label() / find_rows_by_labels()"

requirements-completed: [DATA-01, DATA-02, DATA-03]

# Metrics
duration: 12min
completed: 2026-03-23
---

# Phase 1 Plan 1: Data Extraction Summary

**Extraction script with number_format-aware rounding producing 7 consolidated financial JSON files (IS, BS, CFS, NWC, D&A, WACC, UFCF) from AMC BRx.xlsx**

## Performance

- **Duration:** 12 min
- **Started:** 2026-03-23T21:05:47Z
- **Completed:** 2026-03-23T21:18:04Z
- **Tasks:** 2
- **Files created:** 8

## Accomplishments
- Built extraction script with reusable utilities: round_cell() for format-aware precision, extract_flat_array() for time-series sheets, extract_sensitivity_grid() for 2D WACC/EV grids
- Extracted all 7 consolidated financial statement sheets to clean JSON with zero floating-point artifacts
- IS covers full 2019-2033 range with projected flag at 2026; BS and CFS limited to 2019-2025 actuals (no projection columns in source)
- WACC and UFCF both include 10x8 exit-multiple-vs-WACC sensitivity grids ready for interactive consumption

## Task Commits

Each task was committed atomically:

1. **Task 1+2: Script scaffold + 7 sheet extraction** - `68fd06d` (feat) - Combined commit since script is outside git repo; JSON outputs tracked

**Plan metadata:** (pending)

## Files Created/Modified
- `tools/extract_excel.py` - Main extraction script with utilities and 7 sheet extractors (outside git repo at project root)
- `site/data/is.json` - Income statement 2019-2033 (15 periods, projected from 2026)
- `site/data/bs.json` - Balance sheet 2019-2025 (7 periods, actuals only)
- `site/data/cfs.json` - Cash flow statement 2019-2025 (7 periods, actuals only)
- `site/data/nwc.json` - Net working capital 2020-2033 (14 periods, projected from 2026)
- `site/data/da-capex.json` - D&A and CapEx 2022-2033 (12 periods, projected from 2026)
- `site/data/wacc.json` - WACC inputs, 7 debt tranches, and 10x8 EV sensitivity grid
- `site/data/ufcf.json` - UFCF time series 2026e-2033e, terminal value, perpetuity growth, and 10x8 EV sensitivity grid

## Decisions Made
- Used Excel number_format display precision for rounding (0 dp for `#,##0`, 2 dp for `$#,##0.00`, percentage dp+2 for `0.00%`). This means IS dollar values like 3911.4 are stored as 3911.0 (matching what Excel displays).
- Included NWC projection data through 2033 and D&A data through 2033 even though the plan specified narrower ranges (2025 and 2031 respectively). The Excel sheet contains this data and the CONTEXT.md directive is "extract everything" for maximum analytical utility.
- Extraction script placed at project root `tools/` directory (alongside existing `ollama_research.py` and `build_financials.py`) rather than inside `site/` git repo. This follows the established project convention.
- Used label-scanning approach (`find_row_by_label`) to dynamically locate rows by their text labels, making the script resilient to minor row shifts in the Excel file.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Script location outside git repo**
- **Found during:** Task 1
- **Issue:** The git repository root is `site/` but the plan specified `tools/extract_excel.py` at the project root (parent of `site/`). The script cannot be committed to the `site/` repo.
- **Fix:** Kept the script at the project root to follow existing convention (build_financials.py, ollama_research.py are already there). Only JSON output files in `site/data/` are committed. Tasks 1 and 2 combined into a single commit.
- **Files modified:** N/A (path decision)
- **Verification:** Script runs correctly from project root, JSON files committed to git

**2. [Rule 2 - Missing Critical] Extended NWC and D&A data ranges**
- **Found during:** Task 2
- **Issue:** Plan specified NWC 2020-2025 and D&A 2022-2031 but Excel contains projections through 2033 for both. Truncating available data would reduce downstream utility.
- **Fix:** Included all available periods with projectedStart=2026 flag so consumers can filter if needed
- **Files modified:** site/data/nwc.json, site/data/da-capex.json
- **Verification:** Both files have correct projectedStart flag and complete data

---

**Total deviations:** 2 auto-fixed (1 blocking, 1 missing critical)
**Impact on plan:** Both deviations improve the deliverable. No scope creep.

## Issues Encountered
None - extraction ran cleanly on first attempt for all 7 sheets.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 7 consolidated financial JSON files ready for downstream consumption
- Utility functions (round_cell, extract_flat_array, extract_sensitivity_grid) established for Plans 02 and 03 which extract the remaining ~20 sheets
- Existing `financials.json` preserved (not replaced) for backward compatibility until Phase 2 migrates JS modules

## Self-Check: PASSED

- [x] tools/extract_excel.py exists
- [x] site/data/is.json exists
- [x] site/data/bs.json exists
- [x] site/data/cfs.json exists
- [x] site/data/nwc.json exists
- [x] site/data/da-capex.json exists
- [x] site/data/wacc.json exists
- [x] site/data/ufcf.json exists
- [x] Commit 68fd06d found in git log

---
*Phase: 01-data-extraction*
*Completed: 2026-03-23*
