# Phase 3: Core Models - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Build interactive DCF valuation pages (Consolidated, Odeon, Muvico) and Pro-Forma analysis pages (Recoveries with EV sensitivity, Debt Service). DCF pages have interactive WACC/TGR sliders. Pro-Forma recoveries have interactive EV slider and color-coded heatmap. All data sourced from Phase 1 JSON files. Uses Phase 2 shared utilities (AMC_UTILS).

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion
User granted full discretion. Key areas:

**DCF Page Layout:**
- How to present UFCF build, WACC decomposition, terminal value, and implied EV
- Tab structure (3 separate pages vs tabbed single page for Consolidated/Odeon/Muvico)
- Slider design for WACC and terminal growth rate inputs
- How the DCF-to-waterfall bridge link works (URL param to existing waterfall page)

**Pro-Forma Recoveries:**
- Recovery table layout (tranches as rows, EV scenarios as columns)
- Color coding scheme for recovery percentages (green/yellow/red gradient)
- EV slider interaction — which column highlights or how the view updates
- Heatmap visualization approach

**Pro-Forma Debt Service:**
- Display format for debt service schedule
- Chart type (stacked bar, table, or both)

**General:**
- Bloomberg terminal aesthetic — dark theme, data-dense, consistent with existing site
- Use `window.AMC_UTILS` for all formatters, ChartRegistry, DataLoader
- Follow IIFE module pattern established in codebase

</decisions>

<specifics>
## Specific Ideas

- DCF sliders should update implied EV in real-time without page reload
- DCF-to-waterfall bridge: clicking opens waterfall model pre-loaded with DCF implied EV
- Recovery heatmap should make it immediately obvious which tranches recover what

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `site/js/amc-utils.js`: ChartRegistry, DataLoader, formatters, initChartDefaults
- `site/js/waterfall-model.js`: Existing waterfall accepts `?ev=` URL param — DCF bridge target
- `site/js/leverage-model.js`: Example of interactive slider pattern with Chart.js
- `site/data/ufcf.json`, `site/data/wacc.json`: Consolidated DCF data with sensitivity grids
- `site/data/odeon-dcf.json`, `site/data/muvico-dcf.json`: Entity DCF data
- `site/data/pf-recoveries.json`, `site/data/pf-ds.json`: Pro-forma data
- `site/data/recoveries.json`, `site/data/ds.json`: Current structure data

### Established Patterns
- IIFE module with `'use strict'`
- HTML pages follow: `<link css>` → `<main>` → `<script vendor>` → `<script data>` → `<script module>`
- Chart.js for all visualizations
- `data-base` attribute for relative paths

### Integration Points
- New model pages added to `site/models/` directory
- Must include `amc-utils.js` before model-specific JS
- Waterfall bridge: link to `models/waterfall.html?ev={value}`

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-core-models*
*Context gathered: 2026-03-23*
