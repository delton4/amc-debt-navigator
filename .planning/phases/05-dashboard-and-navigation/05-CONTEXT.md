# Phase 5: Dashboard and Navigation - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Replace the current hub-style index.html with an executive dashboard (KPI tiles, cap structure visual, recovery heatmap, sparklines). Add persistent global nav bar to ALL pages. Add quick-jump menu. Apply Bloomberg terminal polish across the site. This is the final phase — it ties everything together.

</domain>

<decisions>
## Implementation Decisions

### Dashboard Layout
- Replace current index.html entirely — dashboard IS the homepage
- Existing hub cards (Docs, Models, Scenarios, Research) move to global nav bar
- KPI tiles at top: Valuation metrics (EV, equity value, implied share price) and Debt maturity wall (total debt, nearest maturity, weighted avg coupon)
- Recovery heatmap: Full tranche grid — all tranches × all EV scenarios, color-coded
- Sparklines: Claude's discretion on which to include
- All data sourced from JSON files (no hardcoded numbers) — uses AMC_UTILS.DataLoader
- Context: This is a research tool for team members to access data and information quickly

### Global Navigation
- Sticky top bar on ALL pages (docs, models, scenarios, research, dashboard, search — everything)
- BRx branding in the logo/identity area
- Page organization: Claude's discretion on grouping (dropdowns recommended for 20+ pages)
- Active page indicator: Claude's discretion
- Must work with existing page structure — pages use `data-base` for relative paths

### Quick-Jump Menu
- Trigger: Claude's discretion (Cmd+K, nav search, or both)
- Scope: Claude's discretion (pages, terms, document sections)
- Purpose: Team members need to find things fast — this is the key navigability improvement

### Bloomberg Polish
- Consistent dark terminal aesthetic across all pages
- Typography tightening, spacing refinement, smooth transitions
- Data-dense layouts — maximize information per screen

### Claude's Discretion
- Sparkline selection (revenue, EBITDA, leverage, debt — pick what's most useful)
- Nav grouping strategy for 20+ pages
- Active page visual indicator style
- Quick-jump trigger mechanism and search scope
- Cap structure visual design (bar chart, table, or hybrid)
- How to handle the `components.js` breadcrumb system — integrate with or replace

</decisions>

<specifics>
## Specific Ideas

- "It's mainly a research tool for my team members to access data and information they need" — optimize for findability, not presentation
- BRx branding in nav bar
- Full recovery heatmap (not simplified) — team wants the dense data view
- Replace hub entirely — dashboard should be the single entry point

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `site/js/components.js`: Current breadcrumb + keyboard shortcut system (Ctrl+/ for search) — may need updating for global nav
- `site/js/hub-search.js`: Hub page filtering — may be superseded by quick-jump
- `site/css/theme.css`: Full CSS custom property system — all colors, spacing
- `site/css/layout.css`: Page layout, grid system, `.card` class
- `site/css/hubs.css`: Hub-specific styles (may be partially reusable for dashboard)
- `site/data/*.json`: 27+ JSON files from Phase 1 — dashboard reads from these
- `site/js/amc-utils.js`: DataLoader, formatters, ChartRegistry

### Established Patterns
- Every HTML page: `<body data-page="..." data-base="...">` — used by components.js for breadcrumbs
- Script load order: CSS → vendor → data → amc-utils → model JS
- IIFE module pattern for all JS
- `site/js/components.js` auto-generates breadcrumbs from `data-page` attribute

### Integration Points
- `index.html` will be completely rewritten (dashboard replaces hub)
- Global nav component needs to be injected into 20+ existing HTML pages
- `components.js` likely needs modification to support global nav alongside breadcrumbs
- New model pages (dcf.html, pf-recovery.html, etc.) already exist but have no global nav
- Existing doc pages, scenario pages, research pages all need nav bar added

### Pages to Update (nav bar injection)
- `index.html` (rewrite)
- `search.html`
- `docs/index.html` + 7 doc pages
- `models/index.html` + 11 model pages
- `scenarios/index.html` + scenario pages
- `research/index.html` + research pages

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 05-dashboard-and-navigation*
*Context gathered: 2026-03-23*
