---
phase: 03-core-models
plan: 02
subsystem: models
tags: [recovery-analysis, debt-service, chart.js, waterfall, heatmap, IIFE]

requires:
  - phase: 01-data-extraction
    provides: pf-recoveries.json, pf-ds.json, cap-table.json
  - phase: 02-shared-utilities
    provides: AMC_UTILS (DataLoader, ChartRegistry, formatters), components.js breadcrumbs
provides:
  - Pro-forma recovery page with interactive EV slider and color-coded heatmap
  - Pro-forma debt service schedule page with per-tranche breakdown and dual charts
  - Waterfall-style recovery allocation engine for arbitrary EV scenarios
affects: [04-static-models, 05-integration]

tech-stack:
  added: []
  patterns: [waterfall-recovery-allocation, heatmap-grid-visualization, collapsible-detail-rows]

key-files:
  created:
    - site/models/pf-recovery.html
    - site/js/pf-recovery-model.js
    - site/models/debt-service.html
    - site/js/debt-service-model.js
  modified:
    - site/js/components.js

key-decisions:
  - "Waterfall allocation walks tranches top-to-bottom by seniority, allocating EV until face exhausted"
  - "Entity-level recovery split uses original proportions from pf-recoveries.json base-case data"
  - "Heatmap uses 11 fixed EV steps ($500M-$5B) with highlighted column tracking slider position"
  - "Debt service detail uses click-to-expand pattern for per-tranche rows (summary visible by default)"
  - "Tranche index 8 in pf-ds.json (6.125% AMC Unsecured) treated as consolidated total row, excluded from aggregation"

patterns-established:
  - "Waterfall allocation pattern: iterate by seniority, allocate min(face, remaining_EV), subtract from pool"
  - "Heatmap grid pattern: fixed scenario columns x tranche rows, inline CSS background coloring"
  - "Collapsible detail rows: click tranche header to toggle sub-rows via display:none/block"

requirements-completed: [PF-01, PF-02, PF-03, PF-04]

duration: 5min
completed: 2026-03-23
---

# Phase 03 Plan 02: Pro-Forma Recovery & Debt Service Summary

**Interactive EV-driven recovery analysis with waterfall allocation and color-coded heatmap, plus display-only debt service schedule with stacked interest/balance charts**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-23T22:47:37Z
- **Completed:** 2026-03-23T22:52:10Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- Recovery page with EV slider (500-6000) that recalculates waterfall allocation in real-time across 10 tranches with entity-level breakdown (Odeon/AMC/Muvico)
- Color-coded heatmap grid showing recovery % across 11 EV scenarios, with cells green/yellow/red by recovery level and highlighted column tracking current slider value
- Debt service schedule with summary/detail views, per-tranche expandable rows, stacked bar chart for interest, and stacked area chart for declining balance
- Full integration with AMC_UTILS (DataLoader, ChartRegistry, formatters) and components.js breadcrumb system

## Task Commits

Each task was committed atomically:

1. **Task 1: Build pro-forma recovery page with EV slider, recovery table, and color-coded heatmap** - `03c9833` (feat)
2. **Task 2: Build pro-forma debt service schedule page with per-tranche table and interest chart** - `fc6fba0` (feat)

## Files Created/Modified
- `site/models/pf-recovery.html` - Recovery analysis page with EV slider, table/heatmap toggle, entity cap tables
- `site/js/pf-recovery-model.js` - IIFE module: waterfall allocation, heatmap rendering, Chart.js recovery chart, entity breakdown
- `site/models/debt-service.html` - Debt service schedule page with summary/detail views and dual charts
- `site/js/debt-service-model.js` - IIFE module: summary/detail table rendering, stacked bar/area Chart.js charts
- `site/js/components.js` - Added breadcrumb entries for pf-recovery and debt-service pages

## Decisions Made
- Waterfall allocation engine walks tranches by seniority order from the recoveries array, allocating min(face, remaining_EV) and cascading remainder to junior tranches
- Entity-level recovery proportions for each tranche use the original base-case JSON data (not recomputed from EV ratios) to maintain accuracy with source Excel
- Face values derived from entityCapTables in pf-recoveries.json with fallback to cap-table.json, ensuring correct waterfall allocation at all EV levels
- Debt service tranche 8 (6.125% AMC Unsecured Notes) identified as consolidated total row per plan note; excluded from per-tranche aggregation to avoid double-counting
- PIK accrual tracked separately from cash interest in both summary and detail views

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Recovery and debt service pages complete, ready for integration in Phase 5
- Both pages load data via DataLoader with path-trial fallback, work on file:// and GitHub Pages
- ChartRegistry manages lifecycle for all Chart.js instances (no double-render risk)

## Self-Check: PASSED

- [x] site/models/pf-recovery.html exists (126 lines, min 80)
- [x] site/js/pf-recovery-model.js exists (534 lines, min 150)
- [x] site/models/debt-service.html exists (82 lines, min 60)
- [x] site/js/debt-service-model.js exists (409 lines, min 100)
- [x] site/js/components.js modified (breadcrumb entries added)
- [x] Commit 03c9833: feat(03-02) recovery page
- [x] Commit fc6fba0: feat(03-02) debt service page

---
*Phase: 03-core-models*
*Completed: 2026-03-23*
