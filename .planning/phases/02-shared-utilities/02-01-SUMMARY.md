---
phase: 02-shared-utilities
plan: 01
subsystem: ui
tags: [chartjs, iife, es5, chart-lifecycle, data-loader, formatters, annotation-plugin]

# Dependency graph
requires:
  - phase: 01-data-extraction
    provides: JSON data files in site/data/ consumed by DataLoader
provides:
  - window.AMC_UTILS global with ChartRegistry, DataLoader, initChartDefaults, 8 formatters
  - chartjs-plugin-annotation v3.1.0 vendored and auto-registered
  - Centralized Chart.js defaults (eliminates per-model collision bug)
  - Path-trial data loading with Promise caching and deduplication
affects: [03-interactive-models, 04-static-models, 05-integration]

# Tech tracking
tech-stack:
  added: [chartjs-plugin-annotation@3.1.0]
  patterns: [IIFE module via window.AMC_UTILS, ChartRegistry destroy-before-create, DataLoader path-trial with Promise dedup]

key-files:
  created:
    - site/js/amc-utils.js
    - site/vendor/chartjs-plugin-annotation.min.js
    - site/tests/utils-test.html
  modified: []

key-decisions:
  - "Auto-execute initChartDefaults() at IIFE load time to match existing behavior where defaults are set immediately"
  - "Store Promise in DataLoader cache before resolution to deduplicate concurrent fetch calls"
  - "Use var throughout (ES5 codebase convention from existing model files)"

patterns-established:
  - "IIFE module pattern: window.AMC_UTILS namespace for all shared utilities"
  - "ChartRegistry.set(key, chart) for chart lifecycle -- auto-destroys previous instance"
  - "DataLoader.fetch(filename) for all JSON loading -- caches + deduplicates"
  - "Formatter convention: N/A for null/undefined/NaN, parentheses for negatives"

requirements-completed: [DATA-04, DATA-05, DATA-06]

# Metrics
duration: 3min
completed: 2026-03-23
---

# Phase 02 Plan 01: Shared Utilities Summary

**IIFE utility module (amc-utils.js) with ChartRegistry, DataLoader, 8 formatters, centralized Chart.js defaults, and vendored annotation plugin**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-23T22:27:30Z
- **Completed:** 2026-03-23T22:30:38Z
- **Tasks:** 2
- **Files created:** 3

## Accomplishments
- Created `amc-utils.js` shared utility module exposing `window.AMC_UTILS` with 8 formatters, ChartRegistry, DataLoader, and centralized Chart.js defaults
- Vendored chartjs-plugin-annotation v3.1.0 (37KB UMD build) for line/box annotations on charts
- Built comprehensive verification test page (25 automated checks) covering all utility APIs and chart lifecycle

## Task Commits

Each task was committed atomically:

1. **Task 1: Create amc-utils.js shared utility module** - `e45298b` (feat)
2. **Task 2: Vendor annotation plugin and create verification test page** - `d8e5313` (feat)

## Files Created/Modified
- `site/js/amc-utils.js` - Shared utility IIFE: formatters (fmt, fmtPct, fmtPctDecimal, fmtX, fmtDollar, fmtShares, fmtInt, colorVal), initChartDefaults, ChartRegistry, DataLoader
- `site/vendor/chartjs-plugin-annotation.min.js` - Chart.js annotation plugin v3.1.0 UMD build (37KB)
- `site/tests/utils-test.html` - Standalone verification page with 25 automated checks and Bloomberg dark theme

## Decisions Made
- Auto-execute `initChartDefaults()` at IIFE load time to match existing behavior where Chart.js defaults are set at script load, not deferred
- Store Promise in DataLoader._cache immediately (before resolution) to deduplicate concurrent fetch calls for the same filename
- Used `var` throughout to maintain ES5 codebase convention consistent with all existing model files

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- `window.AMC_UTILS` is available for all Phase 3-5 model modules to import
- ChartRegistry eliminates tab-switch memory leak pattern in existing models
- DataLoader provides cached JSON fetching -- existing per-model loadData() functions can be replaced
- initChartDefaults centralizes Chart.js theming -- existing per-model `Chart.defaults.color` lines can be removed
- Annotation plugin ready for debt maturity timeline annotations and waterfall threshold lines
- No existing model files were modified (backward compatibility preserved)
- Verification: open `site/tests/utils-test.html` in browser to confirm all 25 checks pass green

## Self-Check: PASSED

- All 3 created files exist on disk
- Both task commits (e45298b, d8e5313) verified in git log
- All 11 API surface members confirmed present in amc-utils.js
- Plugin file validated (37KB, contains 'annotation' string)
- Zero existing model files modified

---
*Phase: 02-shared-utilities*
*Completed: 2026-03-23*
