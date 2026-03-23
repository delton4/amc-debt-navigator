# Domain Pitfalls

**Domain:** Financial dashboard — static site, vanilla JS, Chart.js, Excel-to-JSON, no build tools
**Project:** AMC Debt Navigator v2 upgrade
**Researched:** 2026-03-23
**Confidence:** HIGH (first-party codebase evidence + well-established Chart.js/JS patterns)

---

## Critical Pitfalls

Mistakes that cause rewrites, wrong numbers surfacing in the presentation, or the week's work
being unusable by competition day.

---

### Pitfall 1: Chart.js instance leak on rapid tab switching

**What goes wrong:** Every call to `new Chart(canvas, config)` registers the instance in Chart.js's
internal registry. If the previous instance on that canvas is not destroyed first, Chart.js throws
`"Canvas is already in use"` in v3/v4, or silently renders a broken double-chart in v2. The existing
codebase already has this bug: `financials-model.js` destroys and recreates three chart instances on
every tab switch. Adding 6–8 more charts (DCF, revenue build, football field, comps, sparklines,
recovery heatmap) across multiple pages multiplies the surface area of this problem.

**Why it happens:** Developers add a new chart to a tab or section, forget that the tab can be revisited,
and do not pair every `new Chart()` with a guarded `chart.destroy()` before recreation. With 8+ charts
on a dashboard page and no module isolation, any one missing destroy call makes ALL charts on the page
suspect.

**Consequences:**
- Stale chart data from a previous render bleeds into a new render (wrong numbers shown)
- Chrome DevTools shows steadily climbing memory on repeated tab visits
- Canvas throws on re-render and the chart goes blank with no visible error to the user
- Hard to debug because the symptom (blank canvas) looks like a data loading failure

**Warning signs:**
- Any function that calls `new Chart()` without first checking and destroying an existing instance
- Chart variables declared at module scope but not reset to `null` after `destroy()`
- A canvas element reused across multiple render calls (tab switching, scenario changes, slider updates)

**Prevention:**
- Use the pattern already established in `financials-model.js`: module-scoped `var chart = null;`,
  always call `if (chart) { chart.destroy(); chart = null; }` before `chart = new Chart(...)`.
- Codify this as a required code pattern in every new model file. Do not skip it under time pressure.
- For the dashboard (which may render 6+ sparkline/summary charts), consider a `chartRegistry` object
  keyed by canvas ID so all instances can be bulk-destroyed on navigation away.
- Assign `animation: false` on sparkline charts — saves render time and avoids partial-animation
  state if a tab switch triggers before animation completes.

**Phase mapping:** Dashboard phase (executive summary sparklines), DCF phase (football field),
Revenue Build phase (multi-series line chart).

---

### Pitfall 2: Excel floating-point values causing presentation-layer rounding errors

**What goes wrong:** `openpyxl` reads Excel cell values as Python `float`. A cell showing `$321.0M`
in Excel may be stored internally as `320.99999999999994` or `321.00000000000006`. When written
directly to JSON and then formatted with JavaScript's `toFixed(1)`, the displayed value can differ
from what the Excel model shows by $0.1M–$1.0M. For a valuation model (WACC, terminal value, EV
per share) these discrepancies look like analytical errors to judges.

**Why it happens:** Excel's binary floating-point representation, combined with formula chains
(sum-of-parts → subtotals → totals), accumulates tiny errors that are invisible in Excel (which rounds
for display) but become visible in JSON after JavaScript formatting.

**Consequences:**
- Recovery waterfall subtotals don't add up to their parent totals on screen
- DCF sensitivity table shows $0.1B EV differences that don't match the Excel model
- Comps multiples display as `6.7x` when Excel shows `6.8x`
- Team notices discrepancies during competition Q&A — credibility damage

**Warning signs:**
- Any value in JSON that ends in many 9s or 0s after the decimal (e.g., `321.0000000000003`)
- Subtotals that are computed in Excel as `=SUM(range)` rather than hardcoded

**Prevention:**
- Round all values in the Python extraction script, not in the JS formatter. For dollar values
  (millions), round to 1 decimal: `round(float(cell.value), 1)`. For percentages, round to 4
  decimal places: `round(float(cell.value), 4)`. For multiples, round to 2 decimal places.
- Add a reconciliation check in the Python script: for each subtotal row, assert that
  `abs(subtotal - sum(components)) < 0.05`. Fail loudly during extraction, not silently at
  render time.
- Never compute subtotals in JS from JSON arrays when Excel already has the subtotal — use the
  Excel-computed value directly. This avoids JS floating-point re-accumulation.

**Phase mapping:** Data extraction phase (Python script that reads `AMC BRx.xlsx`). Must be solved
before any model pages are built, because JSON is the single source of truth for all downstream
rendering.

---

### Pitfall 3: Script load order breaks new data files silently

**What goes wrong:** The codebase has no module system — data files must be loaded via `<script>` tags
before the consuming JS modules run. The existing pattern works because the 2 JSON files (loaded via
`fetch`) and 2 JS globals (`scenarios.js`, `definitions.js`) have a fixed, known order. Adding 10–15
new JSON files (DCF x3, Revenue Build, PF Recoveries, PF Debt Service, Comps, WACC x3, Cap Table,
NWC, D&A) creates a dependency graph that is entirely maintained by hand in HTML `<script>` tag order.

**Why it happens:** Under time pressure, developers copy an existing model's HTML page, add a new
`<script src="../data/new-data.json">` tag, and don't notice that the existing consuming module
initializes before the new data is available. Because error handling uses `if (!data) return;` guard
clauses (the existing convention), the failure is silent — the page renders with no data and no error.

**Consequences:**
- New model page appears to load but shows empty charts or "N/A" in all metric tiles
- Debugging requires `console.log` archaeology since no error is thrown
- A page that works when loaded directly may break when navigated to from another page (browser cache
  state differs)

**Warning signs:**
- New `<script>` tag for data added after the consuming model's `<script>` tag
- Model's `init()` function called synchronously at the bottom of the IIFE, before any async fetch
  completes
- `window.AMC_*` global is `undefined` at the point of first access

**Prevention:**
- Adopt a consistent loading pattern for new JSON data: either (a) use `fetch()` with a promise chain
  (as `financials-model.js` does) so the data load is inherently async, or (b) if using a `<script>`
  tag for a JS global, place ALL data `<script>` tags in the `<head>` before ANY model `<script>` tags.
- Add an explicit guard with a visible console warning (not a silent return) for every data dependency:
  `if (!window.AMC_DCF_DATA) { console.error('dcf-model: AMC_DCF_DATA not loaded'); return; }`.
- Pick one pattern (fetch vs. script-tag global) for all new data files and stick to it throughout
  the week. Mixing patterns doubles the mental overhead.

**Phase mapping:** Data extraction phase (when JSON files are created) and every model page that
consumes new JSON.

---

### Pitfall 4: Global Chart.js defaults overwritten by the last-loaded model

**What goes wrong:** The existing `financials-model.js` sets `Chart.defaults.color` and
`Chart.defaults.borderColor` at module scope (lines 11–12). Any new model JS file that also sets
these globals will overwrite the previous values if it loads after `financials-model.js`. On the
dashboard page (which aggregates charts from multiple logical models), the last `<script>` tag wins,
making chart axis labels and grid lines the wrong color.

**Why it happens:** The IIFE pattern provides no namespacing for Chart.js defaults. Each model was
written as a standalone page where it was the only consumer of Chart.js. On the dashboard, multiple
model scripts run on the same page.

**Consequences:**
- Dashboard chart labels render in the wrong color (white text on white background, or missing
  entirely)
- Grid lines disappear or turn the wrong shade
- Inconsistent appearance depending on script load order — hard to reproduce

**Warning signs:**
- Any new model JS file that sets `Chart.defaults.*` at the top of its IIFE
- Dashboard page loading more than one model's JS file

**Prevention:**
- Set Chart.js global defaults exactly once, in a shared `chart-defaults.js` file loaded before
  any model scripts. All model files remove their per-file `Chart.defaults.*` assignments.
- For the dashboard specifically: pass all styling options inline in each dataset config object
  rather than relying on defaults. This is verbose but immune to ordering bugs.

**Phase mapping:** Dashboard phase, and any phase that creates a new model JS file used on a
multi-chart page.

---

### Pitfall 5: Navigation complexity explosion — too many pages, no clear entry path

**What goes wrong:** Adding 6 new model pages (DCF x3, Revenue Build, PF Recoveries, Comps) to the
existing 5 model pages, plus a new Executive Dashboard, grows the site from ~25 navigable pages to
~35. Without a deliberate navigation architecture, each new page is an island — linked from the
models index but not from the dashboard, not from related models, and not cross-linked to the
document pages that justify the numbers.

**Why it happens:** Under deadline pressure, each feature is built in isolation. Navigation is treated
as "done" once the breadcrumb bar works. The user experience of moving from the DCF to the comparable
companies page, or from the pro-forma recovery to the underlying cap table, is never designed.

**Consequences:**
- During the competition presentation, navigating between related models requires going back to the
  hub index — looks clunky and slows Q&A
- Models that reference each other (e.g., DCF EV feeds into PF Recoveries) have no visible link
  between them
- The "5 models" count on the dashboard hub card will be wrong (stale hardcoded number)

**Warning signs:**
- New model pages added without updating `index.html` hub card counts
- No `context-panel.js` entries for new models (the existing right sidebar already supports
  related-content links)
- Breadcrumb shows only `Home > Models > [Page]` with no quick-jump to sibling models

**Prevention:**
- Before building any new model page, add it to the navigation map: (1) hub card count update,
  (2) breadcrumb entry in `components.js`, (3) context panel related-links entry. These are 10-minute
  tasks that are easy to skip but painful to retrofit.
- The executive dashboard is the natural entry point — build it first or build it in parallel with
  the first model, so that every subsequent model has a home to link back to.
- Add a "Related Models" row to each model page (can be simple `<a>` links, no JS needed) that
  links to the 2–3 most directly related pages.

**Phase mapping:** Dashboard phase (navigation architecture) and every subsequent model phase.

---

### Pitfall 6: CSS layout collapse on data-dense tables

**What goes wrong:** The existing layout uses `max-width: 1200px` (or `1400px` for `.wide`) centered
content. Financial tables with 9 time-series columns (2025E–2033E) plus a labels column plus a CAGR
column will be 11 columns wide. At 1400px max-width, each column is ~120px. Revenue Build has
quarterly data — 36 quarters of data. These tables overflow their containers and break the dark-theme
aesthetic, or they silently scroll horizontally in an unstyled way.

**Why it happens:** CSS grids and table layouts designed for 3–5 column financial data (the existing
IS/BS/CFS tables) do not generalize to 11+ column projection tables. The existing `.model-table`
class (if it exists) was not designed for this column count. Under deadline pressure, the first
working render is shipped without testing at the full column width.

**Consequences:**
- Pro-forma debt service table (quarterly, 2025–2033) renders with columns so narrow the numbers
  are truncated
- Revenue Build table with 36 quarterly columns is unreadable without horizontal scroll
- Horizontal scrollbars appear without visible affordance — analysts miss data at the right edge

**Warning signs:**
- Any table with more than 7 data columns
- `table-layout: auto` (the browser default) on a wide table — columns will be whatever width
  the browser decides
- No `overflow-x: auto` wrapper on the table's parent container

**Prevention:**
- For wide projection tables (8+ years annual, or any quarterly series), use `overflow-x: auto`
  on the table wrapper as a baseline. This is the correct default for data-dense tools; horizontal
  scroll is acceptable and expected in terminal-aesthetic tools.
- Pin the label column with `position: sticky; left: 0; background: var(--surface-2);` so row
  labels don't scroll away.
- For the Revenue Build quarterly view, consider an annual aggregation as the default display with
  a toggle to quarterly — this reduces column count from 36 to 9 and is more analytically useful.
- Set `font-size: 11px` and `padding: 4px 8px` on all new projection table cells from the start.
  The existing financial tables use these values — stay consistent rather than discovering they
  need to be reduced after the table overflows.

**Phase mapping:** Revenue Build phase (worst-case column count), Pro-Forma Debt Service phase,
and any DCF sensitivity table.

---

## Moderate Pitfalls

---

### Pitfall 7: DCF WACC sensitivity table — computed in JS vs. baked from Excel

**What goes wrong:** DCF sensitivity tables (EV at varying WACC and terminal growth rates) are
typically 5x5 or 7x7 grids. If the JS recalculates DCF from scratch on every slider change, any
error in the JS DCF formula (UFCF discounting, mid-year convention, terminal value formula) will
silently produce wrong numbers that don't match the Excel model. The mismatch only surfaces when
someone compares the site's output to the Excel directly.

**Prevention:**
- For sensitivity tables specifically, bake the full grid from Python/Excel into JSON at extraction
  time. The JS renders the pre-computed grid; it does not recompute DCF from scratch.
- Reserve live JS recalculation only for the "base case" assumption sliders (WACC, TGR) where the
  formula is simple enough to verify in 5 minutes. If the formula requires more than 15 lines of
  JS, bake it.
- Add a `// SOURCE: baked from Excel sheet DCF, cell [range]` comment next to every hardcoded
  sensitivity grid so a future reviewer can trace the numbers.

**Phase mapping:** DCF model phase.

---

### Pitfall 8: Hardcoded index maps will break when new JSON periods are added

**What goes wrong:** The existing `IS_IDX`, `BS_IDX`, `CFS_IDX` maps in `financials-model.js`
hardcode the mapping from period labels to array indices. The CONCERNS.md already flags this as
high-priority debt. Adding projection periods (2025E–2033E) to the IS/BS data (for the Revenue Build
or pro-forma income statement) will shift indices if the new periods are prepended or inserted rather
than appended.

**Prevention:**
- When defining JSON for new projection data, use period labels as object keys, not positional
  arrays. Example: `{ "2025E": { "revenue": 4800 }, "2026E": { "revenue": 5100 } }` instead of
  `{ "periods": ["2025E","2026E"], "revenue": [4800, 5100] }`.
- If positional arrays are used for performance (Chart.js datasets prefer arrays), build the index
  map dynamically: `var IDX = {}; data.periods.forEach(function(p, i) { IDX[p] = i; });` at the
  start of the consuming module.
- Do not mix the new projection JSON structure with the existing `financials.json` structure in the
  same file — keep them separate to avoid breaking the working IS/BS/CFS model.

**Phase mapping:** Data extraction phase, Revenue Build phase.

---

### Pitfall 9: Scope creep — interactive everything under a one-week deadline

**What goes wrong:** The project already has a tension between "interactive DCF + PF Recoveries"
and "display-only for others" (noted as a pending decision in PROJECT.md). Under deadline pressure,
developers add interactivity features incrementally — a slider here, a toggle there — without
evaluating whether each interactive element is necessary for the competition outcome or just feels
good to build. Each interactive element requires: UI controls, event handlers, recalculation logic,
re-render logic, and edge-case handling (what happens at boundary values). A single slider that
"should take 30 minutes" can consume 3 hours.

**Warning signs:**
- Any new model file that has more than 2 input controls (sliders, dropdowns, toggles)
- Interactive controls added after the static display version already works
- "It would be cool if..." language in team discussions

**Prevention:**
- Define, in writing before the week starts, exactly which models are interactive and which are
  display-only. This is the "pending decision" in PROJECT.md that must be resolved on Day 1.
  Recommended: Interactive = DCF assumptions (WACC, TGR, revenue growth), PF Recoveries (EV
  slider). Display-only = Revenue Build, Comps, Debt Service Schedule, Football Field.
- Ship display-only first. A polished, data-accurate display-only table is worth more in a
  competition than a broken interactive model. Add interactivity only after the static version
  is verified against Excel.
- Use a daily cut-off rule: any feature not started by Day 4 of the week is cut. No exceptions.

**Phase mapping:** All model phases. Addressed at roadmap-level by explicitly labeling each model
as interactive vs. display-only before any implementation begins.

---

### Pitfall 10: Stale hardcoded numbers in static HTML

**What goes wrong:** The existing `index.html` has numbers hardcoded directly in HTML
(`$4.0B Total Debt`, `7 Legal Documents`, the hub card counts). When new models are added, the
"5 Models" count is wrong. When financial data is updated from a new Excel extract, the dashboard
metric tiles (EBITDA, Share Price, etc.) remain at their old values unless someone manually updates
the HTML. In a fast-moving week this is easy to forget.

**Prevention:**
- Add a `// FIXME: update count when models page grows` comment next to every hardcoded count in
  HTML during initial development.
- For the new executive dashboard metrics (key valuation summary, capital structure overview), source
  all numbers from the JSON data files via JS, not from hardcoded HTML. Use the same pattern as
  `updateSummaryMetrics()` in `financials-model.js` — populate metric tiles from JSON on page load.
- Do a final hardcoded-numbers audit on the last day before the competition: `grep -r "\$[0-9]"
  site/*.html` to find all inline financial figures that might be stale.

**Phase mapping:** Dashboard phase (executive summary tiles), final polish phase.

---

## Minor Pitfalls

---

### Pitfall 11: Chart canvas aspect ratio inconsistency

**What goes wrong:** Chart.js defaults to `maintainAspectRatio: true` with a 2:1 ratio. On a
data-dense dashboard with multiple charts in a grid, this causes tall charts to expand vertically
and push content below the fold. Sparklines embedded in metric tiles look oversized. Setting
`height` in CSS conflicts with Chart.js's own sizing unless `maintainAspectRatio: false` is set
explicitly.

**Prevention:**
- Set `maintainAspectRatio: false` and specify explicit `height` on the canvas element for every
  chart that must fit a constrained space (sparklines, heatmap cells, any chart in a grid).
- Use `responsive: true` (the default) for full-width charts like the revenue build timeline.
- Pick two sizes: "full-width chart" (height: 280px) and "inline sparkline" (height: 80px). Use
  only these two to keep visual rhythm consistent.

**Phase mapping:** Dashboard phase.

---

### Pitfall 12: `fmt()` helper inconsistency across new model files

**What goes wrong:** The codebase has `fmt()`, `fmtPct()`, `fmtM()` defined in multiple files with
slight variations (CONCERNS.md item 5). Adding 6 new model files will add 6 more independent copies
of these helpers. The DCF model might format `$321M` as `$321.0M` while the comps model formats it
as `$321M` — visually inconsistent within a single page.

**Prevention:**
- Before building any new model, extract the formatting helpers into a shared `site/js/fmt.js`
  file (a simple IIFE that sets `window.AMCFmt = { fmt, fmtPct, fmtM, fmtX }`). Load it in every
  page's `<head>`. Takes 20 minutes and prevents 6 divergent implementations.
- If there is not time to refactor, at minimum copy `fmt()` verbatim from `financials-model.js`
  into every new file — do not write a new implementation.

**Phase mapping:** Pre-implementation setup (Day 1 of the week).

---

### Pitfall 13: Football field chart labels truncated

**What goes wrong:** Football field valuation charts (horizontal bar ranges showing methodology
spreads: DCF, Comps, 52-week, LBO) require multi-line y-axis labels. Chart.js does not natively
support multi-line axis tick labels. Long methodology names (`"Precedent Transactions"`,
`"DCF — Bear / Bull"`) get truncated or overflow the chart area.

**Prevention:**
- Use short label aliases in the chart config: `"Prec. Trans."`, `"DCF"`. Display the full name
  in a legend or annotation outside the chart.
- Pre-allocate sufficient left padding in the chart layout options:
  `layout: { padding: { left: 120 } }`.
- If using Chart.js's horizontal bar chart, test label rendering before wiring up data.

**Phase mapping:** Football field (Odeon valuation) phase.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Python Excel extraction | Floating-point rounding errors in financial values | Round at extraction; reconcile subtotals in script |
| Python Excel extraction | Period index maps baked into consuming JS | Use label-keyed JSON objects, not positional arrays |
| Dashboard (executive summary) | Chart.js globals overwritten by multiple model scripts | Single `chart-defaults.js`, inline all per-chart styling |
| Dashboard | Hardcoded metric values in HTML go stale | Source all metrics from JSON via JS on page load |
| Dashboard | 6+ charts cause memory pressure on repeated navigation | `chartRegistry` object; bulk-destroy on nav away |
| DCF models (x3) | JS DCF formula diverges from Excel | Bake sensitivity grids from Excel; JS recalculates only base case |
| Revenue Build | 36-column quarterly table overflows layout | `overflow-x: auto` wrapper; sticky label column; default to annual view |
| Pro-Forma Debt Service | 32-period table column overflow | Same as Revenue Build treatment |
| Comps display | Formatting inconsistency vs. other models | Shared `fmt.js` before any model is started |
| Football Field | Y-axis label truncation | Short labels + left padding pre-allocated |
| Navigation upgrade | New pages not wired into hub counts and breadcrumbs | Navigation map checklist run before each new page ships |
| All models | Scope creep (interactive when display-only suffices) | Lock interactive vs. display-only on Day 1; ship static first |

---

## Sources

All findings are derived from:
- First-party codebase analysis: `/site/.planning/codebase/CONCERNS.md` (Chart.js destroy/recreate,
  index map brittleness, formatting helper duplication, Chart.js global defaults conflict, script
  load order dependency)
- First-party codebase analysis: `/site/.planning/PROJECT.md` (scope decisions, timeline constraint,
  data sources)
- First-party code inspection: `financials-model.js` (Chart.js destroy pattern, IS_IDX hardcoding,
  Chart.defaults mutation, tab switch re-render pattern)
- First-party code inspection: `layout.css` (1200px/1400px max-width constraint)
- Training knowledge (HIGH confidence): Chart.js v3/v4 canvas-reuse behavior, openpyxl float
  representation, browser rendering of wide tables, IIFE global collision patterns

Confidence levels:
| Area | Level | Reason |
|------|-------|--------|
| Chart.js memory/instance pitfalls | HIGH | Codebase already documents the exact bug; Chart.js behavior is well-established |
| Excel floating-point | HIGH | openpyxl float behavior is documented and well-known; confirmed by inspection of existing JSON values |
| Script load order | HIGH | CONCERNS.md explicitly flags this; pattern verified in codebase |
| CSS layout overflow | HIGH | Layout constraints measured from `layout.css`; column arithmetic from PROJECT.md scope |
| Navigation complexity | HIGH | Exact page count and hub card hardcoding confirmed by reading `index.html` |
| Scope creep patterns | MEDIUM | Inferred from PROJECT.md "pending decisions" and timeline constraint — not codebase-confirmed |
