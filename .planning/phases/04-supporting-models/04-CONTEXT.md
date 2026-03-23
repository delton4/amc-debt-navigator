# Phase 4: Supporting Models - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Build display-only model pages: Revenue Build (quarterly segment charts with growth rates), Comparable Company Analysis (table with trading multiples), and Football Field valuation chart (range visualization). All data from Phase 1 JSON. Uses Phase 2 shared utilities. No interactive sliders — display and explore only.

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion
User granted full discretion. Key areas:

**Revenue Build:**
- Chart type for quarterly segment breakdown (stacked bar recommended)
- Annual vs quarterly toggle behavior
- YoY growth rate display (overlay, separate chart, or table)
- Segment color coding (US, International, Muvico)
- How to handle the wide quarterly data (horizontal scroll, responsive table)

**Comps Table:**
- Column selection (which multiples to show: EV/EBITDA, EV/Revenue, P/E, etc.)
- Sortable columns or static display
- Highlighting AMC's position relative to peers
- Statistical summary row (median, mean)

**Football Field Chart:**
- Floating bar chart showing valuation ranges (DCF, comps, market implied)
- Chart.js floating bars with annotation plugin for reference lines
- Current share price marker
- How many methodologies to include

**General:**
- Bloomberg terminal aesthetic
- Use `window.AMC_UTILS` for all formatters, ChartRegistry, DataLoader
- Follow IIFE module pattern
- Pages in `site/models/` directory

</decisions>

<specifics>
## Specific Ideas

- Football field chart is a mandatory expectation — any restructuring pitch without it will be questioned
- Comps table should feel like a Bloomberg terminal screen
- Revenue build should show the full segment story through 2030+

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `site/js/amc-utils.js`: ChartRegistry, DataLoader, formatters
- `site/vendor/chartjs-plugin-annotation.min.js`: For football field reference lines
- `site/data/revenue-build.json`: Quarterly revenue by segment
- `site/data/comps.json`: 5 comparable companies with multiples and statistics
- `site/data/odeon-football-field.json`: Valuation range data
- `site/data/valuation.json`: Valuation summary data

### Established Patterns
- Same as Phase 3 (IIFE, Chart.js, dark theme, page template)

### Integration Points
- New pages in `site/models/`
- Football field may link to DCF and comps pages for drill-down

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-supporting-models*
*Context gathered: 2026-03-23*
