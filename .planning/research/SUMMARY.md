# Project Research Summary

**Project:** AMC Debt Navigator v2 — Bloomberg Terminal Dashboard
**Domain:** Static-site financial analysis dashboard — distressed debt / restructuring
**Researched:** 2026-03-23
**Confidence:** HIGH

## Executive Summary

This project is a data-dense internal analyst tool modeled after Bloomberg/FactSet/Capital IQ terminals, built entirely as static vanilla JS + Chart.js on GitHub Pages with no build tooling. The research is grounded in direct codebase inspection of the existing site, not hypothetical recommendations. The recommended approach is strictly additive: add one shared utility layer (`amc-utils.js`), one annotation plugin (`chartjs-plugin-annotation v3.1.0`), and five new model modules, all following the IIFE pattern already in use. The data pipeline runs Excel → Python (`openpyxl`) → flat-array JSON → Chart.js, mirroring the pattern already working for `financials.json` and `cap-table.json`.

The core build constraint is a one-week competition deadline, which makes scope discipline the highest-risk variable. Research identifies a clear priority order: JSON data extraction must come first (it unblocks everything), followed by the DCF model (highest analytical impact), then pro-forma recoveries, then the executive dashboard. The remaining display-only models (revenue build, comps, debt service, football field) can be built in parallel once the shared utility layer exists. All interactivity should be limited to DCF assumptions (WACC, TGR) and the pro-forma EV slider — everything else ships as display-only with a verified-against-Excel static output.

The most dangerous pitfalls are Chart.js instance leaks on tab switching (already present in the existing codebase and will compound with 4+ new models), Excel floating-point rounding errors that produce visually wrong numbers during competition Q&A, and the silent failure mode when script load order breaks data availability. All three have concrete mitigations documented in the research and must be addressed in the pre-implementation shared utilities phase rather than patched incrementally.

---

## Key Findings

### Recommended Stack

The stack is fixed — no new frameworks, no build tools. The only addition warranted is `chartjs-plugin-annotation v3.1.0` (~25KB UMD, vendored), which solves football field valuation bands and DCF range boxes. Chart.js 4.4.7 (already vendored) natively supports floating bars via `[min, max]` data pairs, covering the football field chart without additional plugins. All competing chart libraries (D3, Highcharts, ECharts) were evaluated and rejected for this project.

The data layer follows a flat-array JSON schema (matching the existing `financials.json` pattern), with `periods` as a separate label array. New files needed: `dcf.json`, `revenue-build.json`, `pf-recoveries.json`, `debt-service.json`, `comps.json`, `wacc.json`. A new shared CSS block (`~50 lines`) extends `theme.css` with `.kpi-bar`, `.dash-grid`, `.sparkline-wrap`, and `.heatmap-cell` classes.

**Core technologies:**
- Chart.js 4.4.7: all charts — already vendored, supports floating bars natively
- chartjs-plugin-annotation 3.1.0: football field bands and reference lines — only new dependency (~25KB)
- openpyxl (already in requirements.txt): Excel-to-JSON extraction, run once before browser work starts
- Vanilla JS ES5 IIFEs + `window.AMC_UTILS`: shared utilities, chart registry, formatters — zero new dependencies
- CSS custom properties (existing `theme.css` extended): Bloomberg-aesthetic dark theme, no new CSS framework

### Expected Features

**Must have (table stakes):**
- Executive summary dashboard with KPI tiles (EV, leverage, coverage, cash runway, implied recovery) and valuation anchor
- DCF model for all three entities (Consolidated, Odeon, Muvico) with interactive WACC/TGR sliders
- DCF output bridged to implied share price and cents-on-dollar per tranche
- Revenue build table with segment breakdown (US Theatrical, International, Muvico) from 2024A through 2033E
- Pro-forma recoveries model with EV sensitivity grid (tranches x EV scenarios)
- Pro-forma debt service schedule (annual 2026-2033, coverage ratio, free cash flow after debt service)
- Comparable company analysis table with sorting by column
- Football field / valuation range chart (DCF bear/base/bull, comps, PF implied EV, current price marker)
- Global navigation between all models (persistent, not just breadcrumbs)
- Underlying data table alongside every chart (expand-in-place toggle)

**Should have (differentiators):**
- DCF to waterfall bridge: "See Recoveries at This EV" button that passes implied EV via URL parameter
- Multi-scenario DCF toggle (Bear / Base / Bull) with side-by-side summary table
- Recovery heatmap on the executive dashboard (7 tranches x 8 EV scenarios, color-coded)
- Maturity wall timeline chart on the dashboard (bars per tranche by maturity date)
- WACC waterfall decomposition (expandable "how we got to 19.5%" section on DCF page)
- Pro-forma cap structure comparison table (current vs. post-restructuring side by side)
- AMC-relative positioning callout text below the comps table
- Revenue build with attendance driver decomposition (Attendees x ATP = Admissions)

**Defer entirely:**
- User-configurable comps set (state management complexity exceeds value for 2-4 person team)
- Exportable PDF / print mode (CSS print stylesheets for financial tables are unreliable)
- Editable assumptions with save/load (localStorage state management, not worth it with pre-set scenarios)
- Real-time data integration (breaks static architecture, all data is explicitly point-in-time)
- Mobile / responsive layouts (explicitly out of scope; desktop-only, minimum 1200px)
- User authentication (incompatible with static site architecture)

### Architecture Approach

The architecture is a strict unidirectional pipeline: Excel at build time generates JSON via a Python extraction script; JSON is fetched at runtime by isolated IIFE model modules; all display is DOM-only, no bidirectional binding. The single most important architectural addition is `amc-utils.js`, a shared utility module that provides a `ChartRegistry` (solves the canvas leak problem at its root), a `DataLoader` (standardizes the fetch-with-path-trial pattern), `initChartDefaults()` (prevents Chart.js global defaults from being overwritten), and shared formatters (`fmt`, `fmtPct`, `fmtM`, `fmtX`). This file must be built before any new model module is started.

**Major components:**
1. `tools/extract_excel.py` — one-time build-time transform from `AMC BRx.xlsx` to `site/data/*.json`; run manually when Excel changes; never runs in the browser
2. `site/js/amc-utils.js` (new) — `window.AMC_UTILS`: `ChartRegistry`, `DataLoader`, `initChartDefaults()`, shared formatters; loaded first on every page
3. `site/js/*-model.js` — five new IIFE model modules (`dcf`, `revenue`, `pf-recovery`, `comps`, `debt-service`), each reads one or two JSON files, renders into its own DOM, exposes minimal window handlers
4. `site/js/dashboard.js` (new/replace) — executive dashboard aggregator; uses `Promise.all` over 4 JSON files; display-only, no recalculation
5. `site/js/components.js` (extended) — adds `buildGlobalNav()` injecting a persistent top nav bar across all pages; new model pages registered in HIERARCHY map
6. `site/data/*.json` — canonical data layer, one file per logical domain; `cap-table.json` is the single source of truth for all tranche data

### Critical Pitfalls

1. **Chart.js instance leaks on tab switching** — Every `new Chart()` without a prior `destroy()` causes double-charts or blank canvases. The existing codebase already has this bug. Fix by centralizing all chart lifecycle in `AMC_UTILS.ChartRegistry.set(key, new Chart(...))` before writing a single new model module. This is the highest-consequence bug because it silently shows wrong numbers.

2. **Excel floating-point rounding producing wrong financial values** — `openpyxl` reads `$321M` as `320.9999999994`. Round all values in the Python extraction script (`round(float(cell.value), 1)` for dollar amounts in millions). Add reconciliation assertions for subtotals in the script so errors fail loudly at extraction time, not silently at render time during Q&A.

3. **Script load order breaking new data files silently** — With no module system, a `<script>` tag placed after the consuming IIFE causes the model to init with no data and render blank with zero visible errors. Fix by adopting `fetch()` with promise chains as the exclusive pattern for all new JSON data (the same pattern `financials-model.js` already uses). Never use synchronous `<script src="data/x.json">` for new data files.

4. **Chart.js global defaults overwritten on multi-chart pages** — Any new model JS that sets `Chart.defaults.color` at IIFE scope will overwrite the value on pages that load multiple models (the dashboard). Fix by calling `AMC_UTILS.initChartDefaults()` exactly once in `amc-utils.js` and removing all per-model `Chart.defaults.*` assignments from existing and new model files.

5. **CSS layout collapse on data-dense projection tables** — Revenue build (36 quarterly columns), debt service, and DCF sensitivity tables exceed the 1200-1400px max-width layout. Apply `overflow-x: auto` on all table wrappers with `position: sticky; left: 0` on label columns from the start. Default revenue build to annual view; add quarterly toggle only if time permits.

---

## Implications for Roadmap

Based on research, the dependency graph produces a clear 5-phase structure. The first two phases are infrastructure that unblock everything. Phases 3-5 are build phases that can overlap once Phase 2 is done.

### Phase 1: Data Extraction Foundation
**Rationale:** Every single feature in this project depends on JSON data files that do not yet exist. This is the absolute blocker. No browser work can be verified without it.
**Delivers:** `site/data/dcf.json`, `revenue-build.json`, `pf-recoveries.json`, `debt-service.json`, `comps.json`, `wacc.json`; extended `financials.json` and `cap-table.json`; validated flat-array schema; Python reconciliation assertions catching floating-point errors
**Addresses:** All table-stakes features (data dependency), MVP Tier 1
**Avoids:** Pitfall 2 (floating-point rounding), Pitfall 8 (hardcoded index maps — use label-keyed projection JSON with `periodTypes` array)
**Research flag:** Standard pattern (openpyxl, confirmed in codebase). No additional research needed.

### Phase 2: Shared Utilities Layer
**Rationale:** `amc-utils.js` is the architectural prerequisite for all new model modules. Building even one model before this exists means that model will need to be refactored. This is a one-time, low-risk investment that prevents the five most dangerous technical pitfalls from manifesting.
**Delivers:** `site/js/amc-utils.js` with `ChartRegistry`, `DataLoader`, `initChartDefaults()`, shared formatters; `chartjs-plugin-annotation v3.1.0` vendored; CSS additions to `theme.css` (`.kpi-bar`, `.dash-grid`, `.sparkline-wrap`, `.heatmap-cell`)
**Addresses:** Code consistency, shared formatting
**Avoids:** Pitfall 1 (Chart.js instance leaks via ChartRegistry), Pitfall 3 (DataLoader standardizes fetch pattern), Pitfall 4 (Chart.js defaults — initChartDefaults), Pitfall 12 (formatting inconsistency — shared formatters)
**Research flag:** Standard pattern. No additional research needed.

### Phase 3: Core Analytical Models
**Rationale:** DCF and pro-forma recoveries are the central deliverables of a restructuring analysis. Everything else references them. Build these before display-only models so that the football field and executive dashboard have real data to surface.
**Delivers:**
- `site/models/dcf.html` + `dcf-model.js` (3 entity tabs, WACC/TGR sliders, equity bridge, multi-scenario toggle, sensitivity table baked from Excel)
- `site/models/pf-recovery.html` + `pf-recovery-model.js` (EV sensitivity grid, before/after cap structure comparison, EV slider)
- `site/models/debt-service.html` + `debt-service-model.js` (display-only, annual 2026-2033)
**Addresses:** DCF model (table stakes), DCF implied share price and cents-on-dollar (table stakes), pro-forma recoveries (table stakes), pro-forma debt service (table stakes), multi-scenario toggle (differentiator), WACC decomposition (differentiator), pro-forma cap structure comparison (differentiator)
**Avoids:** Pitfall 7 (bake DCF sensitivity grids from Excel, not re-computed in JS), Pitfall 9 (scope creep — only WACC/TGR sliders are interactive; sensitivity table is display-only from JSON)
**Research flag:** Standard pattern for DCF and recovery waterfall. No additional research needed.

### Phase 4: Supporting Display Models
**Rationale:** Revenue build and comps complete the analytical picture and support the football field chart. These are display-only, which keeps implementation risk low. They can be built in parallel with Phase 3 once Phase 2 is done.
**Delivers:**
- `site/models/revenue-build.html` + `revenue-model.js` (annual default view, quarterly toggle, segment stacked bars, attendance driver decomposition)
- `site/models/comps.html` + `comps-model.js` (table with column sorting, AMC-relative positioning callout)
- `site/models/football-field.html` + football field chart (floating bar using native Chart.js `[min, max]` pairs, annotation plugin for reference lines)
**Addresses:** Revenue build (table stakes), comps table (table stakes), football field (table stakes), AMC-relative positioning (differentiator), attendance driver decomposition (differentiator — defer if time-constrained)
**Avoids:** Pitfall 6 (wide table overflow — annual default, overflow-x wrapper, sticky label column), Pitfall 13 (football field label truncation — short label aliases, 120px left padding)
**Research flag:** Standard patterns. Football field floating bar is native Chart.js 4.x (confirmed). No additional research needed.

### Phase 5: Executive Dashboard and Navigation
**Rationale:** The dashboard surfaces summary data from all models and is the entry point for the competition presentation. It must come after the model JSON files are finalized so it reads real pre-computed values, not placeholders. Navigation wiring closes the last gap — every page must link correctly before the final review.
**Delivers:**
- Executive dashboard overhaul: KPI ticker bar, recovery heatmap (7 tranches x 8 EV scenarios), valuation anchor from DCF base case, maturity wall timeline chart, sparklines
- `site/js/dashboard.js` using `Promise.all` over 4 JSON files
- Global persistent navigation via extended `components.js`
- DCF to waterfall bridge (URL parameter passthrough)
- Final hardcoded-number audit (`grep -r "\$[0-9]" site/*.html`)
**Addresses:** Executive dashboard (table stakes), global navigation (table stakes), recovery heatmap (differentiator), maturity wall (differentiator), DCF-to-waterfall bridge (differentiator)
**Avoids:** Pitfall 4 (Chart.js global defaults — all dashboard charts use inline config), Pitfall 5 (navigation complexity — HIERARCHY map, hub card counts, related-model links all done in this phase), Pitfall 10 (stale hardcoded numbers — final audit, all metrics sourced from JSON), Pitfall 11 (canvas aspect ratio — `maintainAspectRatio: false` on all sparklines)
**Research flag:** Standard patterns. `Promise.all` multi-fetch is established. No additional research needed.

### Phase Ordering Rationale

- Phases 1 and 2 are strictly ordered before everything else: JSON data must exist before any model can display real numbers, and shared utilities must exist before any model writes a chart.
- Phases 3 and 4 can overlap once Phase 2 is complete. DCF (Phase 3) and comps/revenue build (Phase 4) share no runtime dependencies. If two people are working, split them.
- Phase 5 (dashboard) must come last because it displays summary outputs from the Phase 3 models. Building the dashboard before DCF JSON exists means placeholder data will be hardcoded and likely left there.
- The "interactive vs. display-only" decision must be locked on Day 1, before Phase 3 begins. Research recommendation: interactive = DCF sliders (WACC, TGR) + PF recovery EV slider. Display-only = revenue build, comps, debt service, football field.

### Research Flags

Phases with standard patterns (skip research-phase for all):
- **Phase 1:** openpyxl extraction is a confirmed dependency with established patterns; JSON schema defined in STACK.md
- **Phase 2:** ChartRegistry, DataLoader, and shared formatter patterns are established vanilla JS; Chart.js v4 plugin compatibility confirmed
- **Phase 3:** DCF model, waterfall recovery, and sensitivity table patterns are standard restructuring analysis deliverables with well-documented Chart.js implementations
- **Phase 4:** Floating bar for football field is native Chart.js 4.x; comps sorting is basic JS array sort; revenue build is a stacked bar chart
- **Phase 5:** `Promise.all` multi-fetch is standard; navigation injection into existing `components.js` is a straightforward extension

No phase in this project requires a `gsd:research-phase` invocation. All patterns are either confirmed in the existing codebase or are well-documented vanilla JS / Chart.js behavior. The research confidence is uniformly HIGH across all areas.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All recommendations based on direct file inspection of the existing codebase (vendor/, js/, css/). Chart.js 4.4.7 floating bar and annotation plugin compatibility confirmed against training data through August 2025. |
| Features | HIGH | Table stakes derived from direct code inspection of existing models plus well-established Bloomberg/FactSet/Capital IQ terminal conventions. Anti-features grounded in explicit project constraints (static site, no backend, one-week timeline). |
| Architecture | HIGH | Patterns derived from direct inspection of all existing JS model files and data files. Defects identified in the existing codebase (instance leaks, hardcoded index maps, duplicated formatters) are confirmed first-party findings, not inferences. |
| Pitfalls | HIGH | Six of seven pitfall sources are confirmed first-party (codebase already exhibits the bug or the constraint is explicitly measured). Scope creep pitfall is MEDIUM (inferred from PROJECT.md pending decisions and timeline). |

**Overall confidence:** HIGH

### Gaps to Address

- **Excel model completeness:** The research assumes `AMC BRx.xlsx` contains all 30 sheets needed (DCF x3, Revenue Build, WACC x3, PF Recoveries, PF DS, Comps). If any sheet is missing or has a different structure than assumed in the JSON schemas defined in STACK.md, Phase 1 duration will expand. Validate the Excel structure before committing to Phase 1 scope.
- **DCF formula fidelity:** The research recommends baking DCF sensitivity grids from Excel rather than recomputing in JS, which sidesteps the formula-fidelity gap. However, the WACC/TGR live slider on the base-case DCF still requires a JS implementation of the Gordon Growth and exit multiple formulas. These must be manually verified against the Excel model after implementation — no automated check is available.
- **Scenario data completeness:** The JSON schemas define Bear/Base/Bull scenarios for the DCF. Whether the Excel model already has three complete scenario columns (vs. a single base case) is unconfirmed. If only a base case exists in Excel, the multi-scenario toggle must either be deferred or built with manually-entered Bear/Bull assumptions.

---

## Sources

### Primary (HIGH confidence — direct codebase inspection)
- `site/js/financials-model.js` — Chart.js destroy pattern, IS_IDX hardcoding, Chart.defaults mutation, tab switch re-render
- `site/js/waterfall-model.js` — tranche data duplication, waterfall calculation logic
- `site/js/components.js` — navigation and breadcrumb architecture
- `site/data/financials.json`, `site/data/cap-table.json` — flat-array JSON schema, existing data structure
- `site/vendor/chart.min.js` — Chart.js 4.4.7 version confirmed
- `site/css/theme.css` — existing design tokens and component classes
- `requirements.txt` — openpyxl confirmed as existing dependency
- `.planning/codebase/CONCERNS.md` — six confirmed technical debt items
- `.planning/PROJECT.md` — scope decisions, timeline constraint, data sources

### Secondary (HIGH confidence — established documentation through August 2025 training cutoff)
- Chart.js 4.x documentation — floating bar `[min, max]` data format, ChartRegistry destroy pattern, `maintainAspectRatio` option
- chartjs-plugin-annotation changelog — v3.x tracks Chart.js 4.x (v2.x tracked Chart.js 3.x)
- Bloomberg Terminal (WACC, DDIS, FLDS functions), FactSet IB Workstation, Capital IQ Credit Analytics — professional terminal feature conventions
- openpyxl documentation — float representation of Excel cell values

### Tertiary (MEDIUM confidence — inferred)
- ECharts UMD size (~900KB) — from Apache ECharts documentation, not directly measured
- Scope creep risk patterns — inferred from PROJECT.md "pending decisions," not confirmed by codebase events

---
*Research completed: 2026-03-23*
*Ready for roadmap: yes*
