---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: in-progress
stopped_at: Completed 04-02-PLAN.md
last_updated: "2026-03-23T22:53:30Z"
last_activity: "2026-03-23 — Completed 04-02: Comps table + Football Field chart (Phases 1-4 all complete)"
progress:
  total_phases: 5
  completed_phases: 4
  total_plans: 8
  completed_plans: 8
  percent: 100
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-23)

**Core value:** Eliminate context-switching between Excel and site — every number explorable from one Bloomberg-quality interface
**Current focus:** Phases 1-4 COMPLETE (8/8 plans) — Ready for Phase 5 (Dashboard & Navigation)

## Current Position

Phase: 4 of 5 (Phases 1-4 all complete)
Plan: 8 of 8 total plans complete
Status: Phases 3 and 4 both complete; only Phase 5 (Dashboard & Navigation) remains
Last activity: 2026-03-23 — Completed 04-02: Comps table + Football Field chart

Progress: [██████████] 100%

## Performance Metrics

**Velocity:**
- Total plans completed: 8
- Average duration: 6min
- Total execution time: 47min

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-data-extraction | 3/3 | 33min | 11min |
| 02-shared-utilities | 1/1 | 3min | 3min |
| 03-core-models | 2/2 | 8min | 4min |
| 04-supporting-models | 2/2 | 7min | 3.5min |

**Recent Trend:**
- Last 5 plans: 02-01 (3min), 03-01 (3min), 04-01 (4min), 03-02 (5min), 04-02 (3min)
- Trend: improving

*Updated after each plan completion*
| Phase 01-data-extraction P01 | 12min | 2 tasks | 8 files |
| Phase 01-data-extraction P02 | 9min | 2 tasks | 10 files |
| Phase 01-data-extraction P03 | 12min | 2 tasks | 10 files |
| Phase 02-shared-utilities P01 | 3min | 2 tasks | 3 files |
| Phase 03-core-models P01 | 3min | 2 tasks | 2 files |
| Phase 03-core-models P02 | 5min | 2 tasks | 5 files |
| Phase 04-supporting-models P01 | 4min | 1 task | 3 files |
| Phase 04-supporting-models P02 | 3min | 2 tasks | 2 files |

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [Init]: Interactive scope locked — DCF sliders (WACC, TGR) + PF EV slider only; everything else display-only
- [Init]: Phases 3 and 4 can execute in parallel once Phase 2 is complete (parallel execution enabled)
- [Init]: All DCF sensitivity grids baked from Excel at extraction time, not recomputed in JS
- [01-01]: Rounded all values to Excel number_format display precision (0 dp for #,##0, 2 dp for #,##0.00)
- [01-01]: Included NWC/D&A projected data through 2033 (beyond plan scope) for maximum downstream utility
- [01-01]: Label-scanning approach for row detection (find_row_by_label) instead of hardcoded row numbers
- [01-02]: Entity DCF sheets have no sensitivity grids; extracted terminal value methods (exit multiple + perpetuity growth) instead
- [01-02]: Revenue Build uses positional column anchor mapping to correct mislabeled quarterly headers
- [01-02]: Valuation sheet only has AMC data populated (Odeon/Muvico sections empty in source Excel)
- [01-03]: Recoveries use entity-breakdown format (not multi-EV-scenario) matching actual Excel structure
- [01-03]: Reconciliation tolerances widened to 1.5 for IS subtotals due to 0dp display rounding accumulation
- [01-03]: DS/PF DS use two-pass tranche detection (header scan then bounded extraction) for reliable parsing
- [Phase 02-01]: Auto-execute initChartDefaults() at IIFE load time to match existing behavior
- [Phase 02-01]: Store Promise in DataLoader cache before resolution to deduplicate concurrent fetch calls
- [Phase 02-01]: Use var throughout (ES5 codebase convention from existing model files)
- [Phase 03-01]: Sensitivity grid colAxis displayed as WACC/2 values matching Excel source format
- [Phase 03-01]: Consolidated equity bridge from valuation.json (debt 4003.5, cash 477.3, DSO 529.5M)
- [Phase 03-01]: Exit multiple held constant when WACC slider moves; perpetuity growth recalculates TV fully
- [Phase 03-01]: Entity tab switch auto-resets sliders to entity base WACC/TGR values
- [Phase 03-02]: Waterfall allocation walks tranches top-to-bottom by seniority, allocating min(face, remaining_EV)
- [Phase 03-02]: Entity recovery split uses original proportions from pf-recoveries.json base-case
- [Phase 03-02]: DS tranche 8 (6.125% AMC Unsecured) is consolidated total row, excluded from aggregation
- [Phase 04-01]: Single stack per bar (all 6 segments) with blue/amber color palette for US/Intl visual grouping
- [Phase 04-01]: Projected periods at 0.55 opacity vs 0.85 for actuals to distinguish forecast
- [Phase 04-01]: Quarterly growth table simplified to period + total revenue only (no misleading Q-over-Q)
- [Phase 04-02]: Football field uses Odeon-level valuations from odeon-football-field.json (not AMC consolidated EV)
- [Phase 04-02]: DCF midpoint annotation computed dynamically from average of DCF GG and DCF MM range midpoints
- [Phase 04-02]: AMC premium shown in red (premium = negative for distressed company), discount in green
- [Phase 04-02]: Statistics table includes all 6 rows (Min/Q1/Median/Q3/Max/Average) with Median in blue bold

### Pending Todos

None yet.

### Blockers/Concerns

- [Phase 3]: DCF formula fidelity for live WACC/TGR slider requires manual verification against Excel after implementation
- [Phase 3]: Confirm whether Excel has Bear/Base/Bull scenario columns or only base case — if base only, multi-scenario toggle must be deferred

## Session Continuity

Last session: 2026-03-23T22:53:30Z
Stopped at: Completed 04-02-PLAN.md
Resume file: None
