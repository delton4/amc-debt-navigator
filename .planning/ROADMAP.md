# Roadmap: AMC Debt Navigator v2

## Overview

Transform the existing static analysis site into a Bloomberg-quality interactive financial platform by building a strict unidirectional pipeline: Excel data extracted to JSON, shared utilities built first to eliminate technical debt, then core analytical models (DCF + Pro-Forma), then supporting display models (Revenue Build + Comps + Football Field), and finally the executive dashboard and global navigation that surfaces everything from one entry point. Phases 1 and 2 are strictly sequential blockers; Phases 3 and 4 can execute in parallel; Phase 5 closes the loop.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Data Extraction** - Extract all Excel sheets to validated, reconciled JSON files (completed 2026-03-23)
- [ ] **Phase 2: Shared Utilities** - Build the shared utility layer that all model modules depend on
- [ ] **Phase 3: Core Models** - DCF (3 entities) and Pro-Forma Recoveries with interactive sliders
- [ ] **Phase 4: Supporting Models** - Revenue Build, Comps, and Football Field (display-only)
- [ ] **Phase 5: Dashboard and Navigation** - Executive dashboard and persistent global navigation

## Phase Details

### Phase 1: Data Extraction
**Goal**: All Excel financial data is available as clean, validated JSON files that any model can consume
**Depends on**: Nothing (first phase)
**Requirements**: DATA-01, DATA-02, DATA-03
**Success Criteria** (what must be TRUE):
  1. Running the extraction script produces all required JSON files in `site/data/` with no errors
  2. Every extracted numerical value matches the Excel source to display precision (no floating-point artifacts visible in browser)
  3. Reconciliation assertions in the script catch subtotal mismatches and fail loudly at extraction time
  4. JSON schema follows the flat-array pattern (`periods` label array + value arrays) matching existing `financials.json` structure
**Plans**: 3 plans

Plans:
- [ ] 01-01-PLAN.md — Script scaffold + utility functions + consolidated financial statements (IS, BS, CFS, NWC, D&A, WACC, UFCF)
- [ ] 01-02-PLAN.md — Entity-specific sheets (Odeon, Muvico) + Revenue Build with positional quarter correction
- [ ] 01-03-PLAN.md — Recovery/capital/comps sheets + reconciliation assertions + --validate flag

### Phase 2: Shared Utilities
**Goal**: A shared utility layer exists that prevents Chart.js leaks, standardizes data loading, and provides consistent formatters for all new model modules
**Depends on**: Phase 1
**Requirements**: DATA-04, DATA-05, DATA-06
**Success Criteria** (what must be TRUE):
  1. `amc-utils.js` loads before all model modules and exposes `window.AMC_UTILS` with `ChartRegistry`, `DataLoader`, `initChartDefaults()`, and shared formatters
  2. Switching between tabs on any multi-chart page does not produce double-charts or blank canvases
  3. `chartjs-plugin-annotation` is available from `site/vendor/` and annotations render on charts that use it
  4. All Chart.js global defaults are set exactly once (in `amc-utils.js`), not overridden per-model
**Plans**: TBD

### Phase 3: Core Models
**Goal**: Analysts can explore DCF valuations for all three entities with interactive assumptions, and view pro-forma restructuring outcomes with an EV sensitivity slider
**Depends on**: Phase 2
**Requirements**: DCF-01, DCF-02, DCF-03, DCF-04, DCF-05, PF-01, PF-02, PF-03, PF-04
**Success Criteria** (what must be TRUE):
  1. Each DCF page (Consolidated, Odeon, Muvico) displays UFCF build, WACC decomposition, and terminal value sourced from JSON
  2. Moving the WACC or terminal growth rate slider updates the implied enterprise value and equity bridge in real time without page reload
  3. Clicking the DCF-to-waterfall bridge button opens the recovery waterfall pre-loaded with the DCF implied EV
  4. The pro-forma recoveries table shows recovery percentage per tranche across all EV scenarios, color-coded by recovery level
  5. Moving the EV slider on the pro-forma page updates the highlighted column in the recovery grid
**Plans**: TBD

### Phase 4: Supporting Models
**Goal**: Analysts can view revenue projections by segment, comparable company multiples, and a football field valuation range chart — all sourced from JSON, display-only
**Depends on**: Phase 2
**Requirements**: REV-01, REV-02, COMP-01, COMP-02
**Success Criteria** (what must be TRUE):
  1. The revenue build page shows quarterly or annual segment bars (US/International/Muvico) through 2030+ with a toggle between views
  2. YoY growth rates and segment mix percentages are visible alongside the revenue chart
  3. The comps table displays peer trading multiples and is sortable by column
  4. The football field chart shows DCF bear/base/bull, comps-implied, and PF-implied EV ranges as floating bars with the current share price marked
**Plans**: TBD

### Phase 5: Dashboard and Navigation
**Goal**: The site opens to an executive dashboard summarizing all analytical outputs, and every page links to every other page through a persistent global navigation bar
**Depends on**: Phase 3, Phase 4
**Requirements**: DASH-01, DASH-02, DASH-03, DASH-04, NAV-01, NAV-02, NAV-03
**Success Criteria** (what must be TRUE):
  1. The executive dashboard displays live KPI tiles (EV, equity value, implied share price) sourced from DCF base-case JSON — no hardcoded numbers
  2. The recovery heatmap on the dashboard shows all tranches across EV scenarios, color-coded, matching the pro-forma recoveries model
  3. The capital structure visual and financial sparklines (revenue, EBITDA, FCF) render correctly from JSON on dashboard load
  4. A persistent navigation bar appears on every page and links to all models without breaking existing document viewer or search features
  5. The Bloomberg terminal aesthetic is consistent across all pages: typography, spacing, color coding, and transitions match the dark theme
**Plans**: TBD

## Progress

**Execution Order:**
Phases 1 and 2 are strictly sequential. Phases 3 and 4 can execute in parallel once Phase 2 is complete. Phase 5 executes after both Phases 3 and 4 complete.

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Data Extraction | 3/3 | Complete    | 2026-03-23 |
| 2. Shared Utilities | 0/TBD | Not started | - |
| 3. Core Models | 0/TBD | Not started | - |
| 4. Supporting Models | 0/TBD | Not started | - |
| 5. Dashboard and Navigation | 0/TBD | Not started | - |
