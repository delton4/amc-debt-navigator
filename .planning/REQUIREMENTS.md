# Requirements: AMC Debt Navigator v2

**Defined:** 2026-03-23
**Core Value:** Eliminate context-switching between Excel and site — every number explorable from one Bloomberg-quality interface

## v1 Requirements

### Data Foundation

- [x] **DATA-01**: Python extraction script converts all relevant Excel sheets to structured JSON files
- [x] **DATA-02**: Extracted values rounded to match Excel display precision (no floating-point artifacts)
- [x] **DATA-03**: Extraction script includes reconciliation assertions (extracted totals match Excel source)
- [x] **DATA-04**: Shared utility module (`amc-utils.js`) with ChartRegistry, DataLoader, and centralized formatters
- [x] **DATA-05**: Chart.js global defaults centralized in shared module (fix existing collision bug)
- [x] **DATA-06**: `chartjs-plugin-annotation` vendored in `site/vendor/`

### DCF Valuation

- [x] **DCF-01**: Consolidated DCF model page with UFCF build, WACC decomposition, and terminal value
- [x] **DCF-02**: Odeon DCF model page with entity-specific UFCF and WACC
- [x] **DCF-03**: Muvico DCF model page with entity-specific UFCF and WACC
- [x] **DCF-04**: Interactive WACC and terminal growth rate sliders with live EV recalculation
- [x] **DCF-05**: Click-through from DCF implied EV to recovery waterfall model

### Pro-Forma Analysis

- [x] **PF-01**: Pro-forma recoveries table showing recovery % by tranche across EV scenarios
- [x] **PF-02**: Pro-forma debt service schedule visualization
- [x] **PF-03**: Interactive EV slider on pro-forma recoveries with live update
- [x] **PF-04**: Color-coded recovery heatmap (tranches × EV scenarios)

### Revenue Build

- [x] **REV-01**: Quarterly revenue charts by segment (US/International/Muvico) through 2030+
- [x] **REV-02**: YoY growth rates and segment mix visualizations

### Comps & Valuation

- [x] **COMP-01**: Comparable company analysis table with key trading multiples
- [x] **COMP-02**: Football field valuation chart (range visualization across DCF, comps, market)

### Executive Dashboard

- [ ] **DASH-01**: Valuation summary KPIs (enterprise value, equity value, implied share price)
- [ ] **DASH-02**: Capital structure visual overview (debt stack with yields and maturities)
- [ ] **DASH-03**: Recovery heatmap quick-view (tranche recovery matrix)
- [ ] **DASH-04**: Key financial sparklines (revenue, EBITDA, FCF trends)

### Navigation & Polish

- [x] **NAV-01**: Global persistent navigation bar across all pages
- [x] **NAV-02**: Quick-jump menu (dropdown or keyboard shortcut to any page)
- [x] **NAV-03**: Bloomberg terminal polish (typography, spacing, transitions, data-dense layouts)

## v2 Requirements

### Interactivity Enhancements

- **INT-01**: User-configurable comp set (add/remove comparables)
- **INT-02**: Editable assumptions with save/load to localStorage
- **INT-03**: Historical vs. projected overlay toggle on financial charts

### Output

- **OUT-01**: Print/export mode for key pages
- **OUT-02**: Screenshot-ready chart layouts

## Out of Scope

| Feature | Reason |
|---------|--------|
| Mobile optimization | Desktop analyst tool only |
| User authentication | Internal team, no auth needed |
| Real-time data feeds | Static site, all data from Excel |
| Backend/database | Remains static site architecture |
| Data editing/saving | Read-only analysis tool |
| Framework migration | No time; vanilla JS + Chart.js works |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| DATA-01 | Phase 1 | Complete |
| DATA-02 | Phase 1 | Complete |
| DATA-03 | Phase 1 | Complete |
| DATA-04 | Phase 2 | Complete |
| DATA-05 | Phase 2 | Complete |
| DATA-06 | Phase 2 | Complete |
| DCF-01 | Phase 3 | Complete |
| DCF-02 | Phase 3 | Complete |
| DCF-03 | Phase 3 | Complete |
| DCF-04 | Phase 3 | Complete |
| DCF-05 | Phase 3 | Complete |
| PF-01 | Phase 3 | Complete |
| PF-02 | Phase 3 | Complete |
| PF-03 | Phase 3 | Complete |
| PF-04 | Phase 3 | Complete |
| REV-01 | Phase 4 | Complete |
| REV-02 | Phase 4 | Complete |
| COMP-01 | Phase 4 | Complete |
| COMP-02 | Phase 4 | Complete |
| DASH-01 | Phase 5 | Pending |
| DASH-02 | Phase 5 | Pending |
| DASH-03 | Phase 5 | Pending |
| DASH-04 | Phase 5 | Pending |
| NAV-01 | Phase 5 | Complete |
| NAV-02 | Phase 5 | Complete |
| NAV-03 | Phase 5 | Complete |

**Coverage:**
- v1 requirements: 26 total
- Mapped to phases: 26
- Unmapped: 0

---
*Requirements defined: 2026-03-23*
*Last updated: 2026-03-23 — traceability confirmed against ROADMAP.md*
