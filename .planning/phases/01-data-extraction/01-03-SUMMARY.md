---
phase: 01-data-extraction
plan: 03
subsystem: data
tags: [openpyxl, excel, json, extraction, recoveries, cap-table, debt-service, comps, reconciliation, validation]

# Dependency graph
requires:
  - "01-01: tools/extract_excel.py with round_cell(), get_period_columns(), extract_flat_array(), extract_sensitivity_grid(), find_row_by_label() utilities"
  - "01-02: Entity-specific extractors (Odeon/Muvico IS/WACC/D&A/DCF, Valuation, Revenue Build)"
provides:
  - "cap-table.json: Capital structure with 12 tranches across Muvico/Odeon/AMC entities (replaces hand-built version)"
  - "recoveries.json: Current recovery waterfall with entity-level breakdowns (Odeon/AMC/Muvico %/amount)"
  - "pf-recoveries.json: Pro-forma recovery waterfall with restructured capital stack breakdowns"
  - "pf-ds.json: Pro-forma debt service schedule with 9 per-tranche schedules (2026-2032)"
  - "ds.json: Current debt service schedule with 7 per-tranche schedules (2026-2032)"
  - "liq-roll-fwd-pf.json: Pro-forma liquidity roll forward with IS/CF/cash balance (7 periods)"
  - "liq-roll-fwd.json: Current liquidity roll forward (5 periods)"
  - "odeon-football-field.json: 9 valuation methodology ranges + chart data"
  - "comps.json: 5 comparable companies with trading multiples and statistics"
  - "cover.json: AMC metadata (ticker, share price, shares outstanding, market cap)"
  - "run_reconciliation_assertions(): IS subtotals, BS identity, Cap Table totals, file completeness (64 assertions)"
  - "--validate flag: fast re-check of existing JSON files without re-extraction"
affects: [02-ui-components, 03-interactive-models, 04-analysis-pages]

# Tech tracking
tech-stack:
  added: []
  patterns: [entity-breakdown-recovery-schema, per-tranche-debt-schedule-schema, liquidity-roll-forward-schema, reconciliation-assertions]

key-files:
  created:
    - "site/data/recoveries.json"
    - "site/data/pf-recoveries.json"
    - "site/data/pf-ds.json"
    - "site/data/ds.json"
    - "site/data/liq-roll-fwd-pf.json"
    - "site/data/liq-roll-fwd.json"
    - "site/data/odeon-football-field.json"
    - "site/data/comps.json"
    - "site/data/cover.json"
  modified:
    - "site/data/cap-table.json"
    - "tools/extract_excel.py"

key-decisions:
  - "Recoveries/PF Recoveries extracted as entity-breakdown waterfall (Odeon%/AMC%/Muvico% per tranche) rather than multi-EV-scenario format -- source Excel has single-scenario recovery analysis"
  - "Cap Table extracted with 12 tranches across 3 entity sections matching Excel structure; face values rounded to 0dp per Excel display format ($#,##0)"
  - "Reconciliation tolerances widened to 1.5 for IS subtotals (from plan's 0.2) due to accumulated rounding from 0dp display precision"
  - "DS/PF DS use two-pass extractor: first identifies tranche headers, then extracts data within bounded row ranges for reliable multi-tranche parsing"
  - "Odeon Football Field has two sections: EV ranges (for analysis) and chart positioning data (for visualization)"

patterns-established:
  - "entity-breakdown recovery: {evBreakdown, recoveries[{name, odeonPct, amcPct, muvicoPct, totalPct, ...}], totals, entityCapTables}"
  - "per-tranche debt schedule: {periods, tranches[{name, interestRate, maturity, startingBalance[], endingBalance[], interestExpense[]}], summary}"
  - "liquidity roll forward: {periods, ebitda[], da[], ebit[], interestExpense[], netIncome[], cashFromOps[], capex[], principalRepayments[], beginningCash[], endingCash[]}"
  - "reconciliation pattern: explicit if-not-condition-raise-AssertionError with contextual message (sheet, period, extracted, expected values)"

requirements-completed: [DATA-01, DATA-02, DATA-03]

# Metrics
duration: 12min
completed: 2026-03-23
---

# Phase 1 Plan 3: Recovery/Capital/Debt Service/Comps + Reconciliation Summary

**Extracted final 10 sheets (Cap Table, Recoveries, PF Recoveries, DS, PF DS, Liq Roll Fwd, Football Field, Comps, Cover) completing all 27 JSON files, with 64-assertion reconciliation covering IS subtotals, BS identity, and file completeness**

## Performance

- **Duration:** 12 min
- **Started:** 2026-03-23T21:38:05Z
- **Completed:** 2026-03-23T21:50:14Z
- **Tasks:** 2
- **Files created/modified:** 10

## Accomplishments
- Completed extraction of all 27 sheets from AMC BRx.xlsx to structured JSON (30 sheets minus 3 Reformat sheets)
- Cap Table replaces existing hand-built version with Excel-sourced data: 12 tranches across Muvico (4), Odeon (1), AMC (7)
- Recovery waterfalls extracted as entity-breakdown format showing Odeon/AMC/Muvico recovery percentages and dollar amounts per tranche
- Debt service schedules: PF DS has 9 per-tranche schedules (including First/Second/Third Out TLs), DS has 7 per-tranche schedules with interest, principal, PIK toggles, and SOFR curves
- Reconciliation assertions (64 total) verify IS Gross Profit, IS EBIT, BS accounting identity, and completeness of all 27 required files
- `--validate` flag enables fast re-check of existing files without re-extracting from Excel

## Task Commits

Each task was committed atomically:

1. **Task 1: Extract remaining 9 sheets + cover** - `7496d98` (feat) - 10 JSON files (9 new + cap-table.json replaced)
2. **Task 2: Add reconciliation assertions and --validate flag** - Script changes only (tools/extract_excel.py outside git repo)

**Plan metadata:** (pending)

## Files Created/Modified
- `tools/extract_excel.py` - Extended with 10 new extractors + run_reconciliation_assertions() + --validate flag (outside git repo)
- `site/data/cap-table.json` - Replaced: 12 tranches across Muvico/Odeon/AMC from Excel
- `site/data/recoveries.json` - Current recovery waterfall with entity breakdowns (7 recovery tranches)
- `site/data/pf-recoveries.json` - Pro-forma recovery waterfall (10 recovery tranches including First/Second/Third Out)
- `site/data/pf-ds.json` - Pro-forma debt service: 9 tranches x 7 periods (2026-2032)
- `site/data/ds.json` - Current debt service: 7 tranches x 7 periods (2026-2032)
- `site/data/liq-roll-fwd-pf.json` - Pro-forma liquidity roll forward (7 periods, IS+CF+cash balance)
- `site/data/liq-roll-fwd.json` - Current liquidity roll forward (5 periods)
- `site/data/odeon-football-field.json` - 9 valuation ranges + chart positioning data
- `site/data/comps.json` - 5 companies (AMC + 4 peers) with multiples + statistics (min/q1/median/q3/max/avg)
- `site/data/cover.json` - AMC metadata (ticker: AMC, share price: $1.09, market cap: $577.2M)

## Decisions Made
- Recoveries/PF Recoveries extracted as entity-breakdown waterfall format rather than multi-EV-scenario columns. The source Excel has a single-scenario recovery analysis with entity-level breakdowns (Odeon/AMC/Muvico percentages per tranche), not the multi-EV-scenario format the plan assumed.
- Cap Table extracted with all 12 individual tranches. Total/Net rows excluded from tranches array (they are summary rows, not actual debt instruments). The AMC section includes all Muvico tranches at AMC-consolidated level plus AMC-specific and unsecured instruments.
- Reconciliation tolerances set to 1.5 for IS subtotals (plan suggested 0.2 but accumulated rounding from 0dp display format causes up to 1.0 differences in single line items), and 1.0 for BS identity.
- DS/PF DS extractor uses a two-pass algorithm: first scan identifies all tranche header rows by looking for nearby "Interest Rate:" labels, then bounded row ranges ensure clean per-tranche extraction without cross-contamination.
- Odeon Football Field extracted as two sections: `ranges` (9 valuation methodology EV ranges with min/spread/max) and `chartData` (7 entries with positioning for visualization).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Recoveries/PF Recoveries schema differs from plan assumption**
- **Found during:** Task 1
- **Issue:** Plan assumed multi-EV-scenario columns (evScenarios + recovery percentages per scenario). Source Excel has single-scenario entity-breakdown format (Odeon%/AMC%/Muvico% per tranche).
- **Fix:** Extracted actual data structure: entity-breakdown recovery waterfall with evBreakdown, per-tranche recoveries with entity percentages/amounts, and totals.
- **Files modified:** site/data/recoveries.json, site/data/pf-recoveries.json
- **Verification:** Both files validated with correct entity breakdowns
- **Committed in:** 7496d98

**2. [Rule 1 - Bug] DS/PF DS tranche detection failed on first implementation**
- **Found during:** Task 1
- **Issue:** Initial tranche detection logic checked only next 2 rows for "Interest Rate:" but blank rows between header and rate label caused missed detections (found 0-1 tranches instead of 7-9)
- **Fix:** Rewrote to two-pass algorithm: first identifies all tranche headers by scanning ahead 4 rows for "Interest Rate:", then extracts data within bounded row ranges
- **Files modified:** tools/extract_excel.py
- **Verification:** PF DS correctly extracts 9 tranches, DS extracts 7 tranches
- **Committed in:** 7496d98

**3. [Rule 1 - Bug] Reconciliation tolerance too tight for display-precision rounding**
- **Found during:** Task 2
- **Issue:** Plan specified tolerance 0.2 for IS subtotals, but 0dp rounding (from $#,##0 format) causes up to 1.0 differences. IS Gross Profit 2020: extracted=-523.0 vs expected sales+cogs=-524.0 (diff=1.0)
- **Fix:** Widened IS subtotal tolerance to 1.5 to accommodate accumulated 0dp rounding. BS tolerance set to 1.0.
- **Files modified:** tools/extract_excel.py
- **Verification:** All 64 reconciliation assertions pass

---

**Total deviations:** 3 auto-fixed (3 bugs - plan assumptions didn't match source data structure or rounding behavior)
**Impact on plan:** All deviations reflect plan-vs-reality discrepancies. Extracted all available data in appropriate schema. No data fabricated. No scope creep.

## Issues Encountered
None beyond the auto-fixed deviations above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 27 Excel-extracted JSON files complete and validated
- Reconciliation assertions provide build-time data integrity checking
- `--validate` flag enables quick re-verification without full re-extraction
- financials.json preserved (not modified) for backward compatibility until Phase 3 JS migration
- Phase 1 Data Extraction is COMPLETE -- all DATA-01, DATA-02, DATA-03 requirements satisfied
- Phase 2 (UI Components) can proceed with full data foundation

## Self-Check: PASSED

- [x] site/data/cap-table.json exists (12 tranches)
- [x] site/data/recoveries.json exists (7 recovery tranches)
- [x] site/data/pf-recoveries.json exists (10 recovery tranches)
- [x] site/data/pf-ds.json exists (9 tranches, 7 periods)
- [x] site/data/ds.json exists (7 tranches, 7 periods)
- [x] site/data/liq-roll-fwd-pf.json exists (7 periods)
- [x] site/data/liq-roll-fwd.json exists (5 periods)
- [x] site/data/odeon-football-field.json exists (9 ranges)
- [x] site/data/comps.json exists (5 companies)
- [x] site/data/cover.json exists
- [x] tools/extract_excel.py has run_reconciliation_assertions() and --validate flag
- [x] Commit 7496d98 found in git log
- [x] python3 tools/extract_excel.py exits 0
- [x] python3 tools/extract_excel.py --validate exits 0
- [x] All 27 extracted JSON files parse cleanly

---
*Phase: 01-data-extraction*
*Completed: 2026-03-23*
