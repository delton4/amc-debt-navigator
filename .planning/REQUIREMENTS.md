# Requirements: AMC Debt Navigator v2

**Defined:** 2026-03-23
**Core Value:** Eliminate context-switching between Excel and site — every number explorable from one Bloomberg-quality interface

## v1 Requirements

### Data Foundation

- [ ] **DATA-01**: Python extraction script converts all relevant Excel sheets to structured JSON files
- [ ] **DATA-02**: Extracted values rounded to match Excel display precision (no floating-point artifacts)
- [ ] **DATA-03**: Extraction script includes reconciliation assertions (extracted totals match Excel source)
- [ ] **DATA-04**: Shared utility module (`amc-utils.js`) with ChartRegistry, DataLoader, and centralized formatters
- [ ] **DATA-05**: Chart.js global defaults centralized in shared module (fix existing collision bug)
- [ ] **DATA-06**: `chartjs-plugin-annotation` vendored in `site/vendor/`

### DCF Valuation

- [ ] **DCF-01**: Consolidated DCF model page with UFCF build, WACC decomposition, and terminal value
- [ ] **DCF-02**: Odeon DCF model page with entity-specific UFCF and WACC
- [ ] **DCF-03**: Muvico DCF model page with entity-specific UFCF and WACC
- [ ] **DCF-04**: Interactive WACC and terminal growth rate sliders with live EV recalculation
- [ ] **DCF-05**: Click-through from DCF implied EV to recovery waterfall model

### Pro-Forma Analysis

- [ ] **PF-01**: Pro-forma recoveries table showing recovery % by tranche across EV scenarios
- [ ] **PF-02**: Pro-forma debt service schedule visualization
- [ ] **PF-03**: Interactive EV slider on pro-forma recoveries with live update
- [ ] **PF-04**: Color-coded recovery heatmap (tranches × EV scenarios)

### Revenue Build

- [ ] **REV-01**: Quarterly revenue charts by segment (US/International/Muvico) through 2030+
- [ ] **REV-02**: YoY growth rates and segment mix visualizations

### Comps & Valuation

- [ ] **COMP-01**: Comparable company analysis table with key trading multiples
- [ ] **COMP-02**: Football field valuation chart (range visualization across DCF, comps, market)

### Executive Dashboard

- [ ] **DASH-01**: Valuation summary KPIs (enterprise value, equity value, implied share price)
- [ ] **DASH-02**: Capital structure visual overview (debt stack with yields and maturities)
- [ ] **DASH-03**: Recovery heatmap quick-view (tranche recovery matrix)
- [ ] **DASH-04**: Key financial sparklines (revenue, EBITDA, FCF trends)

### Navigation & Polish

- [ ] **NAV-01**: Global persistent navigation bar across all pages
- [ ] **NAV-02**: Quick-jump menu (dropdown or keyboard shortcut to any page)
- [ ] **NAV-03**: Bloomberg terminal polish (typography, spacing, transitions, data-dense layouts)

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
| DATA-01 | Phase 1 | Pending |
| DATA-02 | Phase 1 | Pending |
| DATA-03 | Phase 1 | Pending |
| DATA-04 | Phase 2 | Pending |
| DATA-05 | Phase 2 | Pending |
| DATA-06 | Phase 2 | Pending |
| DCF-01 | Phase 3 | Pending |
| DCF-02 | Phase 3 | Pending |
| DCF-03 | Phase 3 | Pending |
| DCF-04 | Phase 3 | Pending |
| DCF-05 | Phase 3 | Pending |
| PF-01 | Phase 3 | Pending |
| PF-02 | Phase 3 | Pending |
| PF-03 | Phase 3 | Pending |
| PF-04 | Phase 3 | Pending |
| REV-01 | Phase 4 | Pending |
| REV-02 | Phase 4 | Pending |
| COMP-01 | Phase 4 | Pending |
| COMP-02 | Phase 4 | Pending |
| DASH-01 | Phase 5 | Pending |
| DASH-02 | Phase 5 | Pending |
| DASH-03 | Phase 5 | Pending |
| DASH-04 | Phase 5 | Pending |
| NAV-01 | Phase 5 | Pending |
| NAV-02 | Phase 5 | Pending |
| NAV-03 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 26 total
- Mapped to phases: 26
- Unmapped: 0

---
*Requirements defined: 2026-03-23*
*Last updated: 2026-03-23 — traceability confirmed against ROADMAP.md*
