---
phase: 04-supporting-models
plan: 02
subsystem: ui
tags: [chart.js, comps, football-field, annotation-plugin, floating-bar, sortable-table]

# Dependency graph
requires:
  - phase: 01-data-extraction
    provides: comps.json, odeon-football-field.json, valuation.json
  - phase: 02-shared-utilities
    provides: AMC_UTILS (ChartRegistry, DataLoader, formatters), chartjs-plugin-annotation
provides:
  - Comparable company analysis table with sortable columns and AMC highlighting
  - Football field valuation chart with 9 methodology floating bars and DCF midpoint annotation
  - Summary metrics tiles for comps KPIs
affects: [05-dashboard-navigation]

# Tech tracking
tech-stack:
  added: []
  patterns: [horizontal floating bar chart, sortable table with indicator toggles, annotation plugin reference lines]

key-files:
  created:
    - site/models/comps.html
    - site/js/comps-model.js
  modified: []

key-decisions:
  - "Football field uses Odeon-level valuations ($100-700M range) from odeon-football-field.json, not AMC consolidated"
  - "DCF midpoint annotation computed dynamically from average of DCF GG and DCF MM range midpoints"
  - "AMC premium shown in red (premium = negative signal for distressed company), discount in green"
  - "Statistics table includes all 6 rows (Min/Q1/Median/Q3/Max/Average) with Median highlighted in blue"

patterns-established:
  - "Display-only model page pattern: no inputs panel, data-driven table + chart layout"
  - "Sortable table with window-exposed sort handler and triangle indicators"

requirements-completed: [COMP-01, COMP-02]

# Metrics
duration: 3min
completed: 2026-03-23
---

# Phase 4 Plan 2: Comps & Football Field Summary

**Sortable peer comps table with 5 companies and AMC highlighting, plus 9-methodology football field floating bar chart with DCF midpoint annotation**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-23T22:47:59Z
- **Completed:** 2026-03-23T22:50:59Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Comps table renders all 5 companies (AMC, Marcus, Wanda, Cinemark, Cineplex) with EV/EBITDA, EV/Revenue, and Beta multiples
- Table is sortable by any column with ascending/descending toggle and triangle indicators
- AMC row visually highlighted with blue tint and left border; AMC callout shows 33.2% premium vs peer median
- Football field chart displays 9 valuation methodologies as horizontal floating bars (blue for comps, green for DCF)
- DCF midpoint reference annotation line drawn dynamically from Gordon Growth and Multiples Method ranges
- Summary metrics bar shows 4 KPI tiles: Peer Median EV/EBITDA, AMC EV/EBITDA, Premium/Discount, Peer Count

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Comps and Football Field HTML page and JS model** - `230d7bb` (feat)
2. **Task 2: Visual verification of Comps and Football Field page** - checkpoint approved, no commit

**Plan metadata:** pending (docs: complete plan)

## Files Created/Modified
- `site/models/comps.html` - Comps and Football Field page with table, statistics, callout, and chart canvas
- `site/js/comps-model.js` - IIFE module: loads comps.json + odeon-football-field.json, renders sortable table and horizontal floating bar chart (371 lines)

## Decisions Made
- Football field uses Odeon-level valuations from odeon-football-field.json (not AMC consolidated EV) since the data maps to Odeon entity
- DCF midpoint annotation computed dynamically as average of (DCF GG midpoint, DCF MM midpoint) rather than hardcoded
- AMC premium colored red (premium signals overlevered distress), discount colored green (conventional restructuring framing)
- Statistics table shows all 6 stat rows with Median row highlighted in blue bold for visual emphasis

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Phase 4 is now complete (both plans 04-01 and 04-02 done)
- Football field chart ready for dashboard integration in Phase 5 (KPI tiles, chart references)
- Comps data available for cross-linking from DCF and recovery pages

## Self-Check: PASSED

- FOUND: models/comps.html (4686 bytes)
- FOUND: js/comps-model.js (12764 bytes)
- FOUND: .planning/phases/04-supporting-models/04-02-SUMMARY.md
- FOUND: commit 230d7bb

---
*Phase: 04-supporting-models*
*Completed: 2026-03-23*
