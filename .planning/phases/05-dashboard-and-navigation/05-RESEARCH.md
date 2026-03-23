# Phase 5: Dashboard and Navigation - Research

**Researched:** 2026-03-23
**Domain:** Executive dashboard UI, global navigation, Bloomberg-terminal aesthetic (vanilla JS + Chart.js)
**Confidence:** HIGH

## Summary

Phase 5 replaces the current hub-style `index.html` with a data-driven executive dashboard and adds a persistent global navigation bar to all 38 HTML pages. The codebase is a static vanilla JS site using Chart.js 4.4.7, an IIFE module pattern (ES5 `var` convention), and `AMC_UTILS.DataLoader` for JSON fetching. All financial data is already extracted into 27+ JSON files from prior phases.

The dashboard needs four sections: KPI tiles (from `ufcf.json`, `valuation.json`, `wacc.json`), a capital structure visual (from `cap-table.json` and `pf-recoveries.json` entity cap tables), a recovery heatmap (reusing the proven `computeWaterfall()` pattern from `pf-recovery-model.js`), and sparklines (from `is.json` for revenue/EBITDA trends). The global nav bar must replace/extend the existing breadcrumb-bar system in `components.js`, which already reads `data-page` and `data-base` attributes from every page's `<body>` tag.

The main engineering challenge is the nav bar injection across 38 pages at varying directory depths (root, `/docs/`, `/models/`, `/research/`, `/scenarios/`). The existing `data-base` attribute on each page already solves relative pathing. The quick-jump feature (Cmd+K / Ctrl+K) can extend the existing keyboard shortcut handler in `components.js` that already binds Ctrl+K to navigate to search.

**Primary recommendation:** Build a single `dashboard.js` IIFE that loads 4-5 JSON files via DataLoader and renders all dashboard sections into DOM containers. Extend `components.js` to inject a global nav bar (replacing the breadcrumb bar) and a quick-jump overlay on all pages. Update all 38 HTML pages to include the nav bar markup.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Replace current index.html entirely -- dashboard IS the homepage
- Existing hub cards (Docs, Models, Scenarios, Research) move to global nav bar
- KPI tiles at top: Valuation metrics (EV, equity value, implied share price) and Debt maturity wall (total debt, nearest maturity, weighted avg coupon)
- Recovery heatmap: Full tranche grid -- all tranches x all EV scenarios, color-coded
- All data sourced from JSON files (no hardcoded numbers) -- uses AMC_UTILS.DataLoader
- Context: This is a research tool for team members to access data and information quickly
- Sticky top bar on ALL pages (docs, models, scenarios, research, dashboard, search -- everything)
- BRx branding in the logo/identity area
- Must work with existing page structure -- pages use `data-base` for relative paths
- Consistent dark terminal aesthetic across all pages
- Typography tightening, spacing refinement, smooth transitions
- Data-dense layouts -- maximize information per screen

### Claude's Discretion
- Sparkline selection (revenue, EBITDA, leverage, debt -- pick what's most useful)
- Nav grouping strategy for 20+ pages
- Active page visual indicator style
- Quick-jump trigger mechanism and search scope
- Cap structure visual design (bar chart, table, or hybrid)
- How to handle the `components.js` breadcrumb system -- integrate with or replace

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| DASH-01 | Valuation summary KPIs (enterprise value, equity value, implied share price) | Data available in `ufcf.json` (terminalValue.enterpriseValue=2586, perpetuityGrowth.enterpriseValue=1767), `valuation.json` (equity value=-222, share price=-0.4, DSO=529.5), `wacc.json` (totalPrincipal=4003.5, sharePrice=1.09, WACC=0.1949). Use DataLoader to fetch, formatters from AMC_UTILS. |
| DASH-02 | Capital structure visual overview (debt stack with yields and maturities) | Data available in `cap-table.json` (7 tranches with entity, lien, face, price, market, coupon, cashInterest, maturity, ytm) and `pf-recoveries.json` entityCapTables. Recommend horizontal stacked bar chart via Chart.js matching existing patterns. |
| DASH-03 | Recovery heatmap quick-view (tranche recovery matrix) | Proven implementation exists in `pf-recovery-model.js` `renderHeatmap()` function. 10 tranches x 11 EV steps, color-coded (green >= 80%, yellow 40-80%, red < 40%). Reuse `computeWaterfall()` algorithm. Data from `pf-recoveries.json`. |
| DASH-04 | Key financial sparklines (revenue, EBITDA, FCF trends) | Revenue from `is.json` (sales array, 15 periods 2019-2033). EBITDA computable as ebit+da from same file. UFCF from `ufcf.json` (8 projected periods). Use Chart.js line charts with minimal config (no axes, no legend) for sparkline effect. |
| NAV-01 | Global persistent navigation bar across all pages | Extend `components.js` which already injects breadcrumb bar into `#breadcrumb-bar` on every page. Replace breadcrumb with sticky nav bar. All 38 pages already have `data-page` and `data-base` attributes. Group into: Dashboard, Documents (10), Models (10), Research (9), Scenarios, Tools (search, compare, structure, glossary). |
| NAV-02 | Quick-jump menu (dropdown or keyboard shortcut to any page) | Existing Ctrl+K binding in `components.js` navigates to search.html. Replace with in-page overlay that fuzzy-matches page names. Scope: all pages + optionally glossary terms from `data/definitions.js`. |
| NAV-03 | Bloomberg terminal polish (typography, spacing, transitions, data-dense layouts) | Full CSS custom property system in `theme.css` (15 color vars, 6 spacing vars). Monospace font family already set globally. Refine: tighter card padding, smaller margins, add subtle transitions, ensure consistent use of design tokens across all CSS files. |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Chart.js | 4.4.7 | Sparklines, cap structure chart | Already vendored in `site/vendor/chart.min.js`, used by all model pages |
| Vanilla JS (ES5) | N/A | All logic, DOM manipulation | Project convention -- `var` throughout, IIFE pattern, no build step |
| AMC_UTILS | Custom | DataLoader, formatters, ChartRegistry | Established in Phase 2, used by all model modules |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| chartjs-plugin-annotation | vendored | Chart annotations | Only if cap structure chart needs reference lines |
| Lunr.js | vendored | Full-text search | Already used by search.html; quick-jump can reuse if searching terms |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Chart.js sparklines | SVG hand-drawn sparklines | Lighter weight but inconsistent with existing chart patterns; Chart.js already loaded |
| DOM-based heatmap | Canvas heatmap | DOM approach proven in pf-recovery-model.js; no benefit to switching |
| JS nav injection | Build-time HTML includes | Would require build tooling not in project; JS injection is established pattern |

**Installation:**
```bash
# No installation needed -- all libraries already vendored
```

## Architecture Patterns

### Recommended Project Structure
```
site/
  index.html              # REWRITE -- executive dashboard
  css/
    theme.css             # ADD nav bar vars (--nav-height), polish refinements
    layout.css            # ADD nav bar styles, adjust content-body top padding
    dashboard.css         # NEW -- dashboard-specific grid, sparkline, heatmap styles
  js/
    components.js         # MODIFY -- replace breadcrumb with global nav bar + quick-jump
    dashboard.js          # NEW -- IIFE loading JSON, rendering KPIs/heatmap/sparklines/cap structure
  [38 HTML pages]         # MODIFY -- add nav bar placeholder, adjust breadcrumb-bar usage
```

### Pattern 1: Dashboard Data Loading
**What:** Single IIFE that loads multiple JSON files in parallel via DataLoader, then renders all sections
**When to use:** Dashboard page initialization
**Example:**
```javascript
// Source: Established pattern from dcf-model.js, pf-recovery-model.js
(function() {
  'use strict';
  var U = window.AMC_UTILS;
  var fmt = U.fmt;

  Promise.all([
    U.DataLoader.fetch('ufcf.json'),
    U.DataLoader.fetch('valuation.json'),
    U.DataLoader.fetch('wacc.json'),
    U.DataLoader.fetch('pf-recoveries.json'),
    U.DataLoader.fetch('is.json'),
    U.DataLoader.fetch('cap-table.json')
  ]).then(function(results) {
    var ufcf = results[0], val = results[1], wacc = results[2];
    var pfRec = results[3], is = results[4], cap = results[5];
    renderKPIs(ufcf, val, wacc);
    renderCapStructure(cap);
    renderHeatmap(pfRec);
    renderSparklines(is, ufcf);
  });
})();
```

### Pattern 2: Global Nav Bar Injection via components.js
**What:** Extend existing components.js to build a nav bar from the HIERARCHY map + inject into every page
**When to use:** Every page load
**Example:**
```javascript
// Current: builds breadcrumb into #breadcrumb-bar
// New: build nav bar with grouped dropdowns, active page indicator
// Uses existing data-page and data-base attributes
var base = document.body.getAttribute('data-base') || '.';
var page = document.body.getAttribute('data-page') || '';

var NAV_GROUPS = {
  'Documents': [
    { page: 'doc1', label: 'DOC 1 - Covenant Strip', href: base + '/docs/doc1-covenant-strip.html' },
    // ... all doc pages
  ],
  'Models': [
    { page: 'dcf', label: 'DCF Valuation', href: base + '/models/dcf.html' },
    // ... all model pages
  ],
  // Research, Scenarios, Tools
};
```

### Pattern 3: Quick-Jump Overlay
**What:** Modal overlay triggered by Ctrl+K / Cmd+K that filters a flat list of all pages
**When to use:** Any page, keyboard shortcut
**Example:**
```javascript
// Flat list of all navigable items
var JUMP_ITEMS = [
  { label: 'Dashboard', href: base + '/index.html', keywords: 'home dashboard kpi' },
  { label: 'DCF Valuation', href: base + '/models/dcf.html', keywords: 'dcf wacc valuation' },
  // ...
];
// Filter on input, navigate on Enter/click
```

### Pattern 4: Chart.js Sparklines
**What:** Minimal line charts with no axes, no legend, no tooltips -- just the line and optional fill
**When to use:** Dashboard sparkline tiles
**Example:**
```javascript
// Source: Chart.js 4.x minimal line chart pattern
new Chart(ctx, {
  type: 'line',
  data: {
    labels: periods,
    datasets: [{
      data: values,
      borderColor: '#3b82f6',
      borderWidth: 1.5,
      fill: { target: 'origin', above: 'rgba(59,130,246,0.08)' },
      pointRadius: 0,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: {
      x: { display: false },
      y: { display: false }
    }
  }
});
```

### Anti-Patterns to Avoid
- **Hardcoding financial values in HTML:** All numbers must come from JSON via DataLoader. The current index.html has hardcoded metrics that must be replaced.
- **Building nav HTML server-side or in a build step:** This is a static site with no build system. Nav must be injected at runtime via JS, matching the existing components.js pattern.
- **Using ES6+ syntax (let, const, arrow functions, template literals):** Project convention is ES5 with `var` throughout. All existing model files follow this.
- **Creating separate nav.js loaded before components.js:** Keep nav logic in components.js which is already loaded on every page. Avoid adding another script tag to all 38 pages.
- **Fetching JSON on non-dashboard pages for the nav bar:** The nav bar is static navigation links -- no data fetching needed. Only the dashboard page loads JSON.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Recovery waterfall calculation | Custom allocation algorithm | Reuse `computeWaterfall()` from pf-recovery-model.js | Already tested, handles entity split ratios correctly |
| Number formatting | Custom formatters | `AMC_UTILS.fmt`, `fmtPct`, `fmtX`, `fmtDollar` | Consistent formatting across all pages |
| Chart lifecycle management | Manual destroy/recreate | `AMC_UTILS.ChartRegistry.set()` | Auto-destroys previous instance, prevents memory leaks |
| Relative path resolution | String concatenation guessing | `data-base` attribute already on every page | Handles root vs subdirectory pages correctly |
| Fuzzy search for quick-jump | Custom fuzzy matching | Simple `indexOf` / case-insensitive substring match | Only ~40 items to search; fuzzy matching overkill |

**Key insight:** The Phase 2 utilities (DataLoader, ChartRegistry, formatters) and Phase 3 waterfall algorithm are the foundation. The dashboard is a display layer over already-computed data, not new computation.

## Common Pitfalls

### Pitfall 1: CSS Variable --breadcrumb-height Referenced Everywhere
**What goes wrong:** Changing the breadcrumb bar to a nav bar changes height. Pages using `top: var(--breadcrumb-height)` for sticky positioning break.
**Why it happens:** The breadcrumb bar is 40px. A nav bar with dropdowns needs more height (48-56px). `models.css` `.model-inputs` has `top: calc(var(--header-height) + 16px)`.
**How to avoid:** Add a `--nav-height` CSS variable to `:root` in theme.css. Update all references. The existing `--breadcrumb-height: 40px` should be replaced or aliased.
**Warning signs:** Sticky sidebars overlapping the nav bar.

### Pitfall 2: data-base Path Differences Across Page Depths
**What goes wrong:** Nav links break because some pages are at root (data-base="."), some at one level deep (data-base=".."), and scenarios/detail.html might be at two levels.
**Why it happens:** The nav bar generates hrefs using `base + '/path'`. If base is wrong, links 404.
**How to avoid:** Always use the `data-base` attribute from `document.body`. Every page already has this set correctly. Test nav links from pages at each depth level.
**Warning signs:** 404s when clicking nav links from doc/model/research pages.

### Pitfall 3: Chart.js Canvas Context Conflicts on Dashboard
**What goes wrong:** Multiple small Chart.js instances (sparklines + cap structure) cause performance issues or rendering glitches.
**Why it happens:** Chart.js 4.x registers plugins globally. Multiple charts with different configurations can conflict.
**How to avoid:** Use ChartRegistry to manage all chart instances. Keep sparkline configurations minimal (no plugins, no annotations). Initialize all charts after DOM is ready.
**Warning signs:** Blank canvases, charts not responding to resize.

### Pitfall 4: Heatmap computeWaterfall Unavailable on Dashboard
**What goes wrong:** Dashboard tries to call `computeWaterfall()` but it's scoped inside pf-recovery-model.js IIFE.
**Why it happens:** All model JS files use IIFE scope -- functions are not exported globally.
**How to avoid:** Either: (a) duplicate the waterfall algorithm in dashboard.js (it's ~30 lines), or (b) extract it to AMC_UTILS as a shared utility. Option (a) is simpler given the project's copy-paste pattern across model files.
**Warning signs:** "computeWaterfall is not defined" error on dashboard load.

### Pitfall 5: Quick-Jump Overlay Z-Index Wars
**What goes wrong:** Quick-jump modal appears behind the nav bar or behind Chart.js canvases.
**Why it happens:** The nav bar has `z-index: 50`. Chart.js canvases can create stacking context issues.
**How to avoid:** Give quick-jump overlay `z-index: 1000` and a full-screen backdrop. Use `position: fixed`.
**Warning signs:** Modal text partially hidden behind other elements.

### Pitfall 6: Script Load Order on Dashboard Page
**What goes wrong:** `dashboard.js` runs before `amc-utils.js` is loaded, `AMC_UTILS` is undefined.
**Why it happens:** Script load order matters in non-module vanilla JS.
**How to avoid:** Follow established pattern: vendor scripts first, then amc-utils.js, then components.js, then page-specific JS. Dashboard script tag must be last.
**Warning signs:** "AMC_UTILS is not defined" or "Chart is not defined" on dashboard.

## Code Examples

Verified patterns from the existing codebase:

### KPI Tile HTML Structure (from theme.css .metric class)
```html
<!-- Source: site/css/theme.css lines 101-127, used in current index.html -->
<div class="metric">
  <div class="label">Enterprise Value (DCF)</div>
  <div class="value distress" id="kpi-ev">--</div>
  <div class="sub">Exit multiple method</div>
</div>
```

### DataLoader Fetch Pattern (from dcf-model.js)
```javascript
// Source: site/js/dcf-model.js, site/js/pf-recovery-model.js
var U = window.AMC_UTILS;
U.DataLoader.fetch('ufcf.json').then(function(data) {
  // data is parsed JSON, cached for subsequent calls
  var ev = data.terminalValue.enterpriseValue; // 2586
});
```

### Recovery Heatmap Color Functions (from pf-recovery-model.js)
```javascript
// Source: site/js/pf-recovery-model.js lines 190-202
function recoveryColor(pct) {
  if (pct >= 0.80) return '#22c55e';
  if (pct >= 0.40) return '#eab308';
  if (pct > 0) return '#ef4444';
  return '#6b7280';
}
function recoveryBgColor(pct) {
  if (pct >= 0.80) return 'rgba(34,197,94,0.15)';
  if (pct >= 0.40) return 'rgba(234,179,8,0.15)';
  if (pct > 0) return 'rgba(239,68,68,0.12)';
  return 'rgba(239,68,68,0.06)';
}
```

### Breadcrumb / Nav Injection Pattern (from components.js)
```javascript
// Source: site/js/components.js
var page = document.body.getAttribute('data-page') || '';
var base = document.body.getAttribute('data-base') || '.';
var barEl = document.getElementById('breadcrumb-bar');
if (barEl) {
  barEl.innerHTML = '...'; // Inject HTML
}
```

### Chart.js Instance Registration (from model files)
```javascript
// Source: all model JS files
U.ChartRegistry.set('sparkline-revenue', new Chart(ctx, config));
```

## Data Sources for Dashboard

### KPI Tiles (DASH-01)
| KPI | JSON File | Path | Value |
|-----|-----------|------|-------|
| Enterprise Value (Exit Multiple) | ufcf.json | terminalValue.enterpriseValue | $2,586M |
| Enterprise Value (Perpetuity Growth) | ufcf.json | perpetuityGrowth.enterpriseValue | $1,767M |
| Implied Equity Value | valuation.json | amc.scenario1["Implied Equity Value"] | ($222M) |
| Implied Share Price | valuation.json | amc.scenario1["Share Price"] | ($0.40) |
| Total Debt (Face) | wacc.json | inputs.totalPrincipal | $4,003.5M |
| WACC | wacc.json | inputs.wacc | 19.49% |
| DSO (Shares Outstanding) | wacc.json | inputs.dso | 529.5M |
| Market Cap | wacc.json | inputs.marketCap | $577.2M |
| Nearest Maturity | cap-table.json | min(tranches[].maturity) | 2027-11-01 (Odeon) |
| Weighted Avg Coupon | wacc.json | inputs.pretaxCostOfDebt | 24.46% |

### Capital Structure (DASH-02)
| Source | JSON File | Key Fields |
|--------|-----------|------------|
| Tranche list | cap-table.json | tranches[] with entity, lien, name, face, price, market, coupon, maturity, ytm |
| Entity breakdown | pf-recoveries.json | entityCapTables[] with per-entity tranche detail |

### Recovery Heatmap (DASH-03)
| Source | JSON File | Key Fields |
|--------|-----------|------------|
| Base recoveries | pf-recoveries.json | recoveries[], evBreakdown |
| Entity cap tables | pf-recoveries.json | entityCapTables[] for face value derivation |

### Sparklines (DASH-04)
| Metric | JSON File | Array | Periods |
|--------|-----------|-------|---------|
| Revenue | is.json | sales | 2019-2033 (15 points) |
| EBITDA | is.json | ebit + da (computed) | 2019-2033 (15 points) |
| UFCF | ufcf.json | ufcf | 2026e-2033e (8 points) |
| Leverage | Compute: wacc.inputs.totalPrincipal / (is.ebit[i]+is.da[i]) | derived | 2019-2033 |

## Page Inventory for Nav Bar Injection

### Root Level (data-base=".")
| Page | data-page | Category |
|------|-----------|----------|
| index.html | dashboard | Dashboard (REWRITE) |
| compare.html | compare | Tools |
| glossary.html | glossary | Tools |
| search.html | search | Tools |
| structure.html | structure | Tools |
| scenarios.html | scenarios | Scenarios |

### /docs/ (data-base="..")
| Page | data-page | Nav Group |
|------|-----------|-----------|
| docs/index.html | docs-hub | Documents |
| docs/doc1-covenant-strip.html | doc1 | Documents |
| docs/doc2-muvico-secured-2029.html | doc2 | Documents |
| docs/doc3-amc-7500-notes.html | doc3 | Documents |
| docs/doc4-credit-agreement.html | doc4 | Documents |
| docs/doc5-exchangeable-2030.html | doc5 | Documents |
| docs/doc6-odeon-notes.html | doc6 | Documents |
| docs/doc6-odeon-exhibits.html | doc6-ex | Documents |
| docs/doc7-pik-toggle.html | doc7 | Documents |
| docs/doc7-pik-toggle-exhibits.html | doc7-ex | Documents |

### /models/ (data-base="..")
| Page | data-page | Nav Group |
|------|-----------|-----------|
| models/index.html | models-hub | Models |
| models/dcf.html | dcf | Models |
| models/pf-recovery.html | pf-recovery | Models |
| models/waterfall.html | waterfall | Models |
| models/debt-service.html | debt-service | Models |
| models/financials.html | financials | Models |
| models/revenue-build.html | revenue-build | Models |
| models/comps.html | comps | Models |
| models/leverage.html | leverage | Models |
| models/exchange.html | exchange | Models |
| models/pik-projector.html | pik | Models |

### /research/ (data-base="..")
| Page | data-page | Nav Group |
|------|-----------|-----------|
| research/index.html | research | Research |
| research/lme-concepts.html | research-lme-concepts | Research |
| research/novel-strategies.html | research-novel-strategies | Research |
| research/case-studies.html | research-case-studies | Research |
| research/countermeasures.html | research-countermeasures | Research |
| research/court-rulings.html | research-court-rulings | Research |
| research/lender-strategy.html | research-lender-strategy | Research |
| research/odeon-analysis.html | research-odeon-analysis | Research |
| research/muvico-deep-dive.html | research-muvico-deep-dive | Research |
| research/court-solutions.html | research-court-solutions | Research |

### /scenarios/ (data-base="..")
| Page | data-page | Nav Group |
|------|-----------|-----------|
| scenarios/detail.html | scenario-detail | Scenarios |

**Total: 38 pages** (37 to add nav bar + 1 complete rewrite)

## Recommended Discretion Choices

### Sparkline Selection
**Recommendation:** Revenue, EBITDA, and UFCF (3 sparklines)
**Rationale:** These are the three most critical financial progression metrics for a distressed debt analysis. Revenue shows top-line trajectory, EBITDA shows operating profitability (the denominator in all leverage metrics), and UFCF shows cash generation (the basis for DCF valuation). Leverage ratio is derivable from EBITDA and already shown in KPI tiles.

### Nav Grouping Strategy
**Recommendation:** 5 dropdown groups: Dashboard (home link), Documents (11 pages), Models (11 pages), Research (10 pages), Tools (search, compare, structure, glossary, scenarios)
**Rationale:** Maps to existing directory structure. Each group has 4-11 items -- small enough for a single dropdown without scrolling. Scenarios could be in Tools since there are only 2 scenario pages.

### Active Page Indicator
**Recommendation:** Blue left border or blue underline on the active nav group, bold text on the active page within dropdown
**Rationale:** Consistent with existing `.toggle-btn.active` pattern (blue background tint) and `.tab-btn.active` (blue bottom border). The `data-page` attribute already on every page makes detection trivial.

### Quick-Jump Trigger
**Recommendation:** Both Cmd/Ctrl+K keyboard shortcut AND a search icon in the nav bar
**Rationale:** Power users (team members) will learn the shortcut. The icon provides discoverability. Existing Ctrl+K binding in components.js already exists but navigates away to search.html -- replace with in-page overlay.

### Cap Structure Visual
**Recommendation:** Hybrid -- horizontal stacked bar chart (Chart.js) showing face values by lien priority, with a compact data table below showing yields, maturities, and market values
**Rationale:** Bar chart provides instant visual density of the debt stack. Table provides the precise numbers team members need. Matches the data-dense Bloomberg aesthetic. Existing `cap-table.json` has exactly the right data structure.

### Components.js Breadcrumb Handling
**Recommendation:** Replace the breadcrumb bar entirely with the global nav bar. Add the current page name as a subtle indicator within the nav (not a full breadcrumb trail).
**Rationale:** The breadcrumb trail (Dashboard > Documents > DOC 1) provided navigation, but a global nav bar makes it redundant. The page title block on each page already shows what page you're on. Keep the `#breadcrumb-bar` element ID for backward compatibility but repurpose it as the nav bar container.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Hub-style index with static cards | Data-driven executive dashboard | Phase 5 | Homepage becomes analytical tool, not just navigation |
| Per-page breadcrumb navigation | Global persistent nav bar | Phase 5 | Any-to-any page navigation without returning to hub |
| Ctrl+K goes to search.html | In-page quick-jump overlay | Phase 5 | Instant navigation without page reload |
| Hardcoded metrics in HTML | JSON-sourced KPI tiles | Phase 5 | Single source of truth, automatically reflects data changes |

**Deprecated/outdated:**
- `hub-search.js`: Superseded by quick-jump menu. Can be deleted.
- Hub card grid on index.html: Replaced by dashboard. Navigation moves to nav bar.
- Breadcrumb trail: Replaced by nav bar with active page indicator.

## Open Questions

1. **Scenarios page depth**
   - What we know: `scenarios.html` is at root level, but `scenarios/detail.html` is one level deep
   - What's unclear: Whether other scenario pages might be added later
   - Recommendation: Handle both depths via `data-base` attribute (already set correctly on both pages)

2. **EBITDA data availability for sparklines**
   - What we know: `is.json` has `ebit` and `da` arrays that sum to EBITDA. `financials.json` has LTM EBITDA (371.1).
   - What's unclear: Whether to use projected EBITDA from IS (is.json 2019-2033) or just LTM
   - Recommendation: Use full `is.json` series (ebit+da) for sparkline -- shows historical + projected trajectory

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Manual browser testing (static site, no JS test runner configured) |
| Config file | none |
| Quick run command | Open `index.html` in browser, verify dashboard renders |
| Full suite command | Open each page category in browser, verify nav bar on all |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DASH-01 | KPI tiles show EV, equity value, share price from JSON | smoke | Open index.html, check KPI values match JSON | N/A -- manual |
| DASH-02 | Cap structure visual renders debt stack | smoke | Open index.html, verify chart renders | N/A -- manual |
| DASH-03 | Recovery heatmap shows all tranches x EV scenarios | smoke | Open index.html, verify heatmap grid | N/A -- manual |
| DASH-04 | Sparklines render revenue, EBITDA, UFCF trends | smoke | Open index.html, verify 3 sparkline charts | N/A -- manual |
| NAV-01 | Persistent nav bar on every page | e2e-manual | Open 5+ pages from different directories, verify nav present | N/A -- manual |
| NAV-02 | Quick-jump menu works via Cmd/Ctrl+K | smoke | Press Ctrl+K on any page, type page name, verify navigation | N/A -- manual |
| NAV-03 | Bloomberg polish consistent | visual | Compare pages for consistent typography, spacing, transitions | N/A -- manual |

### Sampling Rate
- **Per task commit:** Open modified pages in browser, verify rendering
- **Per wave merge:** Open pages from each directory depth (root, /docs/, /models/, /research/)
- **Phase gate:** Full visual walkthrough of all 38 pages

### Wave 0 Gaps
None -- this is a static site with no test framework. All validation is browser-based visual inspection. The existing `tests/utils-test.html` only tests AMC_UTILS functions and won't cover dashboard/nav functionality.

## Sources

### Primary (HIGH confidence)
- Codebase inspection of all 38 HTML pages, 19 JS files, 7 CSS files, 27+ JSON data files
- `site/js/components.js` -- current breadcrumb + keyboard shortcut system
- `site/js/amc-utils.js` -- DataLoader, ChartRegistry, formatters
- `site/js/pf-recovery-model.js` -- heatmap rendering pattern, waterfall algorithm
- `site/css/theme.css` -- full design token system
- `site/css/layout.css` -- page layout, breadcrumb bar styles
- `site/css/models.css` -- chart container, metric, toggle patterns
- `site/vendor/chart.min.js` -- Chart.js 4.4.7

### Secondary (MEDIUM confidence)
- Chart.js 4.x documentation for sparkline configuration (minimal line chart options)

### Tertiary (LOW confidence)
- None -- all findings verified against codebase

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all libraries already vendored and in use across 8 completed plans
- Architecture: HIGH -- patterns directly observed in existing model files (dcf-model.js, pf-recovery-model.js)
- Pitfalls: HIGH -- identified from actual code inspection (z-index values, script load order, IIFE scoping, CSS variables)
- Data sources: HIGH -- all JSON files inspected, values verified

**Research date:** 2026-03-23
**Valid until:** Indefinitely (static codebase, no external dependencies to change)
