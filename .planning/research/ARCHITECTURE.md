# Architecture Patterns

**Domain:** Static-site financial dashboard — adding 4+ new models and executive dashboard to existing vanilla JS + Chart.js site
**Researched:** 2026-03-23
**Confidence:** HIGH (based on direct codebase inspection + established vanilla JS patterns)

---

## Current Architecture Diagnosis

Before prescribing patterns, here is what the existing code actually does — this is the baseline every new component must fit into.

### How Existing Models Work

1. **HTML page** sets `data-page` and `data-base` on `<body>`.
2. **Script tags** load in order: vendor libs → data files → component JS → model JS.
3. **Data files** (`cap-table.json`, `financials.json`) loaded via `fetch()` with path-trial fallback (`../data/`, `./data/`, `data/`). `scenarios.js` and `definitions.js` loaded as `<script>` tags that set `window.AMC_SCENARIOS` etc.
4. **Model IIFE** initializes after data load by calling an internal `init()` from the fetch `.then()` callback.
5. **Charts** are module-level variables (`var isChart = null`). Destroyed and recreated on tab switches.
6. **Globals set on window** expose functions the HTML calls inline: `onclick="setTab('is')"` etc.

### Critical Existing Defects Affecting New Build

| Defect | Impact on New Models |
|--------|---------------------|
| `waterfall-model.js` duplicates all tranche data from `cap-table.json` inline | New models that reference tranche data MUST read from `cap-table.json` not hardcode |
| `Chart.defaults.color` and `Chart.defaults.borderColor` set in every model | With 4+ new model pages, last-loaded wins; fix by setting once in a shared init file |
| `IS_IDX`/`BS_IDX`/`CFS_IDX` maps hardcoded in `financials-model.js` | New projection data (IS 2025-2033) will extend the periods array — existing index maps break |
| `fmt()`, `fmtPct()`, `fmtM()` duplicated across files | New models should not add a 5th copy; introduce one shared utility |
| Chart destroy/recreate on every tab switch | DCF and revenue build models have many tabs; need instance-keyed registry |

---

## Recommended Architecture for the Upgrade

### Layer Overview

```
┌──────────────────────────────────────────────────────────────┐
│  Excel Source (AMC BRx.xlsx — 30 sheets)                     │
│  Build-time only. Analysts run extract script manually.      │
└──────────────────┬───────────────────────────────────────────┘
                   │ tools/extract_excel.py (one-time + on change)
                   ▼
┌──────────────────────────────────────────────────────────────┐
│  Canonical JSON Data Layer  (site/data/)                     │
│  One file per logical domain. Read-only at runtime.          │
│  financials.json  dcf.json  revenue-build.json               │
│  pf-recoveries.json  debt-service.json  comps.json           │
│  wacc.json  cap-table.json (existing, owns all tranche data) │
└──────────────────┬───────────────────────────────────────────┘
                   │ fetch() with path-trial fallback (existing pattern)
                   ▼
┌──────────────────────────────────────────────────────────────┐
│  Shared JS Utilities  (site/js/amc-utils.js)  NEW            │
│  fmt(), fmtPct(), fmtM(), fmtX()                             │
│  initChartDefaults()  — called ONCE per page                 │
│  ChartRegistry — keyed destroy/get/set for Chart instances   │
│  DataLoader — fetch with path-trial, returns Promise         │
└──────────────────┬───────────────────────────────────────────┘
                   │ window.AMC_UTILS (single global)
                   ▼
┌──────────────────────────────────────────────────────────────┐
│  Model Modules  (site/js/*-model.js)                         │
│  Each is a self-contained IIFE. Reads from JSON via          │
│  DataLoader. Exposes only event-handler functions on window  │
│  that HTML needs to call. All business logic internal.       │
│                                                              │
│  NEW: dcf-model.js  revenue-model.js  pf-recovery-model.js  │
│       comps-model.js  debt-service-model.js                  │
│  EXISTING (modified): waterfall-model.js financials-model.js │
└──────────────────┬───────────────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────────────────┐
│  Executive Dashboard  (site/index.html + site/js/dashboard.js│
│  Pulls summary data from multiple JSON files via Promise.all │
│  Renders sparklines, key metrics, valuation summary,         │
│  recovery heatmap. No recalculation — display layer only.    │
└──────────────────┬───────────────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────────────────┐
│  Navigation Layer  (site/js/components.js — extended)        │
│  Global nav bar added to components.js breadcrumb init.      │
│  components.js is already loaded on every page.              │
└──────────────────────────────────────────────────────────────┘
```

---

## Component Boundaries

### 1. Data Layer — `site/data/*.json`

**Responsibility:** Single source of truth for all numerical data.

**Rule:** No model file ever hardcodes a financial number. Tranche data lives exclusively in `cap-table.json`. `waterfall-model.js` will be patched to read from `cap-table.json` instead of its internal `tranches[]` array.

| File | Owner Sheet(s) in Excel | Consumed By |
|------|------------------------|-------------|
| `cap-table.json` | Cap Table, DS | waterfall, leverage, pik, exchange, executive dashboard |
| `financials.json` | IS, BS, CFS, NWC, D&A | financials-model, executive dashboard |
| `dcf.json` | DCF (×3 entities), WACC (×3) | dcf-model, executive dashboard |
| `revenue-build.json` | Revenue Build (quarterly by segment) | revenue-model, executive dashboard sparklines |
| `pf-recoveries.json` | PF Recoveries | pf-recovery-model, executive dashboard heatmap |
| `debt-service.json` | PF DS, DS | debt-service-model |
| `comps.json` | Comps | comps-model |
| `wacc.json` | WACC (3 entities) | dcf-model (loaded separately so WACC can be adjusted interactively) |

**Communicates with:** Nothing. Data layer is a passive sink read by model modules.

### 2. Extraction Pipeline — `tools/extract_excel.py` (new)

**Responsibility:** One-way transform: `AMC BRx.xlsx` → multiple `site/data/*.json` files.

**Rule:** This script is run manually by analysts when the Excel model is updated. It does not run at browser time. It is the only place openpyxl/xlrd imports live.

**Communicates with:** Excel file (reads), `site/data/*.json` files (writes).

### 3. Shared Utilities — `site/js/amc-utils.js` (new)

**Responsibility:** Formatting functions, Chart.js theme initialization, chart instance registry.

**Public API (on `window.AMC_UTILS`):**
- `fmt(n)` — dollars in millions, parentheses for negatives
- `fmtPct(n)` — percentage, 1 decimal place
- `fmtM(n)` — compact millions label (e.g. "$1.2B")
- `fmtX(n)` — leverage multiples (e.g. "12.5x")
- `initChartDefaults()` — sets `Chart.defaults.color` and `Chart.defaults.borderColor` ONCE
- `ChartRegistry.set(key, instance)` — stores a Chart instance
- `ChartRegistry.destroy(key)` — destroys and removes by key
- `ChartRegistry.get(key)` — returns instance or null
- `DataLoader.fetch(relativePath)` — wraps the existing path-trial fetch logic, returns Promise

**Load order:** Must be the first JS loaded after vendor libs on every page that uses charts.

**Communicates with:** Nothing inbound. Outbound: `window.AMC_UTILS` global consumed by all model modules.

### 4. Model Modules — `site/js/*-model.js`

**Responsibility:** One model per file. Load their required JSON via `DataLoader.fetch()`. Perform all calculations internally. Render into DOM. Expose named tab-switch / slider handlers on `window` only where HTML `onclick` attributes require it.

**Boundaries:**
- Models do NOT communicate with each other directly.
- Models do NOT touch other models' DOM elements.
- Models read from the data layer only — no writing back to JSON.
- Models use `AMC_UTILS.ChartRegistry` instead of module-level chart variables.

**New modules to create:**

| Module | JSON Input | Interactive? | Key Chart Types |
|--------|-----------|--------------|-----------------|
| `dcf-model.js` | `dcf.json`, `wacc.json` | YES — WACC/terminal value sliders | Waterfall bar (bridge), sensitivity table |
| `revenue-model.js` | `revenue-build.json` | Minimal — segment toggle | Stacked bar (quarterly), area chart |
| `pf-recovery-model.js` | `pf-recoveries.json`, `cap-table.json` | YES — EV slider | Horizontal bar (recovery by tranche) |
| `comps-model.js` | `comps.json` | No — display only | Table + scatter (EV/EBITDA) |
| `debt-service-model.js` | `debt-service.json` | No — display only | Stacked bar (cash vs PIK by year) |

**Existing modules to patch (minimally):**

| Module | Required Change | Risk |
|--------|----------------|------|
| `waterfall-model.js` | Replace inline `tranches[]` with `DataLoader.fetch('cap-table.json')` | Medium — core calc logic must stay identical |
| `financials-model.js` | Extend IS periods to 2033 projections; add projection flag to data; fix `IS_IDX` to derive from data not hardcode | Low — additive change |

### 5. Executive Dashboard — `site/index.html` + `site/js/dashboard.js` (new/replace)

**Responsibility:** Landing page surface. Displays summary panels from multiple data sources simultaneously. Does NOT recalculate — it reads pre-computed summary fields from JSON files.

**Data loading pattern:**
```javascript
Promise.all([
  DataLoader.fetch('dcf.json'),
  DataLoader.fetch('cap-table.json'),
  DataLoader.fetch('pf-recoveries.json'),
  DataLoader.fetch('revenue-build.json')
]).then(function(results) {
  renderValuationSummary(results[0]);
  renderCapStructure(results[1]);
  renderRecoveryHeatmap(results[2]);
  renderSparklines(results[3]);
});
```

**Communicates with:** Data layer (reads 4 JSON files). Renders into `index.html` DOM. Links to model pages — navigation is HTML `<a>` tags, not JS.

### 6. Navigation Layer — `site/js/components.js` (extended)

**Responsibility:** Global persistent navigation bar across all pages. Currently provides breadcrumbs; extend to include a top-bar with links to all five hubs.

**Change:** Add a `buildGlobalNav()` function to `components.js` (already loaded on every page). The global nav is injected into a `<nav id="global-nav">` placeholder that will be added to every page's HTML template.

**New pages to register in `HIERARCHY` map:**
- `'dashboard'` (existing) → add executive entry point label
- `'dcf'`, `'revenue-build'`, `'pf-recovery'`, `'comps'`, `'debt-service'`

**Communicates with:** `data-page` and `data-base` body attributes (existing contract). No data layer access.

---

## Data Flow: Excel to Charts

```
STEP 1 — EXTRACTION (build time, run once or on Excel update)
  AMC BRx.xlsx
    → tools/extract_excel.py (openpyxl, reads data_only=True)
    → site/data/dcf.json          (DCF + WACC sheets, 3 entities)
    → site/data/revenue-build.json (Revenue Build sheet, quarterly)
    → site/data/pf-recoveries.json (PF Recoveries sheet)
    → site/data/debt-service.json  (PF DS + DS sheets)
    → site/data/comps.json         (Comps sheet)
    → site/data/financials.json    (IS/BS/CFS/NWC/D&A, extend to 2033)
    → site/data/cap-table.json     (Cap Table sheet — overwrite/merge)

STEP 2 — PAGE LOAD (runtime, browser)
  Browser requests *.html
    → HTML parsed, <script> tags execute in order:
        1. vendor/chart.min.js
        2. js/amc-utils.js          → window.AMC_UTILS initialized
           AMC_UTILS.initChartDefaults() called
        3. js/components.js         → breadcrumbs + global nav injected
        4. js/*-model.js            → IIFE begins
           DataLoader.fetch('data/dcf.json')  [or whichever JSON]
             → fetch() with path trials (../data/, ./data/, data/)
             → .then(data => init(data))

STEP 3 — INITIALIZATION (runtime, after data loaded)
  init(data)
    → Validate required fields
    → Render static metric tiles
    → Render default chart tab using AMC_UTILS.ChartRegistry.set(key, new Chart(...))
    → Bind slider/tab event listeners

STEP 4 — USER INTERACTION (runtime, on user action)
  User moves WACC slider
    → Handler calls recalculate(newWacc)
    → recalculate() computes new DCF outputs
    → AMC_UTILS.ChartRegistry.destroy('dcf-bridge')
    → ChartRegistry.set('dcf-bridge', new Chart(...))
    → Update metric tiles
```

**Direction is strictly one-way:** Excel → JSON → JS → DOM. No flow reverses.

---

## JSON Schema Patterns

### Projection Series Pattern

All multi-period projection data follows this schema so consuming modules can iterate without hardcoded index maps:

```json
{
  "periods": ["FY 2024", "FY 2025E", "FY 2026E", "FY 2027E", "FY 2028E", "FY 2029E", "FY 2030E"],
  "periodTypes": ["actual", "estimate", "estimate", "estimate", "estimate", "estimate", "estimate"],
  "revenue": [4637.2, 4867.0, 5100.0, 5350.0, 5600.0, 5850.0, 6100.0]
}
```

The `periodTypes` array allows models to visually distinguish actuals from estimates (e.g., dashed borders on projected bars) without hardcoded index thresholds.

### DCF Summary Pattern

```json
{
  "entities": ["consolidated", "odeon", "muvico"],
  "consolidated": {
    "wacc": 0.195,
    "terminalGrowth": 0.025,
    "enterpriseValue": 2100.0,
    "equityValue": 420.0,
    "impliedSharePrice": 0.79,
    "ufcf": [120.0, 145.0, 168.0, 191.0, 215.0],
    "sensitivity": {
      "waccRange": [0.165, 0.175, 0.185, 0.195, 0.205, 0.215, 0.225],
      "tgRange": [0.010, 0.015, 0.020, 0.025, 0.030],
      "evMatrix": [[...], [...], [...]]
    }
  }
}
```

### Recovery Heatmap Pattern

```json
{
  "scenarios": [
    {
      "label": "Bear",
      "ev": 1500,
      "tranches": [
        { "id": "term-loan", "recovery": 0.75, "recoveryDollar": 1499.3 },
        { "id": "muvico-8pik", "recovery": 0.00, "recoveryDollar": 0.0 }
      ]
    }
  ]
}
```

Recovery values are pre-computed in the extraction script so the browser renders a lookup, not a calculation. Interactive EV slider models override these pre-computed values with inline JS math.

---

## Chart Instance Management

The current `financials-model.js` pattern (module-level `var isChart = null`) fails to scale to 4+ model pages because:
- Each module invents its own variable names
- No way to destroy all charts on a page without knowing each module's internal variable names
- Chart.js warns when a canvas that already has a chart attached gets a new chart without prior destroy

**Replace with `ChartRegistry` in `amc-utils.js`:**

```javascript
var ChartRegistry = (function() {
  var _charts = {};
  return {
    set: function(key, instance) {
      if (_charts[key]) { _charts[key].destroy(); }
      _charts[key] = instance;
    },
    destroy: function(key) {
      if (_charts[key]) { _charts[key].destroy(); delete _charts[key]; }
    },
    get: function(key) {
      return _charts[key] || null;
    },
    destroyAll: function() {
      Object.keys(_charts).forEach(function(k) { _charts[k].destroy(); });
      _charts = {};
    }
  };
})();
```

Usage in model modules:
```javascript
// Instead of: isChart = destroyChart(isChart); isChart = new Chart(...)
AMC_UTILS.ChartRegistry.set('is-chart', new Chart(canvas, config));
```

---

## Navigation Architecture

### Current State

`components.js` builds a breadcrumb bar based on `data-page` attribute. No global nav. Users navigate between hubs via `<a>` links on hub index pages.

### Required Change

**Add a persistent top navigation bar** so analysts can jump between hubs from any page without going back to `index.html`. This is a one-file change: extend `components.js` to inject a `<nav id="global-nav">` above the breadcrumb bar.

```
Global Nav Bar:   [AMC Navigator]  Documents  Models  Research  Scenarios  [Search]
Breadcrumb Bar:   Models > DCF Valuation
Page Content:     ...
```

**New pages to add to HIERARCHY in `components.js`:**
```javascript
'dcf':            ['Models', 'DCF Valuation'],
'revenue-build':  ['Models', 'Revenue Build'],
'pf-recovery':    ['Models', 'Pro-Forma Recoveries'],
'comps':          ['Models', 'Comparable Companies'],
'debt-service':   ['Models', 'Debt Service Schedule'],
'executive':      ['Dashboard'],
```

**Hub count update:** The `index.html` dashboard currently shows "5 Models". This counter is hardcoded in HTML; update to "10 Models" (or whatever the final count is) when new model pages are added.

---

## Build Order (Dependency Graph)

Components must be built in this order because later components consume earlier ones:

```
1. tools/extract_excel.py
   [Unblocks all data-dependent work]
   Prerequisite: openpyxl installed (already in requirements.txt)
   Output: site/data/dcf.json, revenue-build.json, pf-recoveries.json,
           debt-service.json, comps.json
           (financials.json and cap-table.json already exist — extend/overwrite)

2. site/js/amc-utils.js
   [Unblocks all new model modules]
   Prerequisite: only vendor/chart.min.js must load before it
   Output: window.AMC_UTILS with ChartRegistry + DataLoader + formatters

3. site/data/*.json validation
   [Manually verify extracted JSON shape against expected schemas]
   Prerequisite: Step 1 complete
   Output: confidence that model modules will not receive malformed data

4. site/models/dcf.html + site/js/dcf-model.js
   [Highest value, most complex — build first among models]
   Prerequisite: Steps 1, 2, 3
   Dependencies: dcf.json, wacc.json, amc-utils.js

5. site/models/revenue-build.html + site/js/revenue-model.js
   Prerequisite: Steps 1, 2, 3
   Dependencies: revenue-build.json, amc-utils.js

6. site/models/pf-recovery.html + site/js/pf-recovery-model.js
   Prerequisite: Steps 1, 2, 3
   Dependencies: pf-recoveries.json, cap-table.json, amc-utils.js

7. site/models/comps.html + site/js/comps-model.js
   Prerequisite: Steps 1, 2, 3
   Dependencies: comps.json, amc-utils.js

8. site/models/debt-service.html + site/js/debt-service-model.js
   Prerequisite: Steps 1, 2, 3
   Dependencies: debt-service.json, amc-utils.js

9. site/index.html (executive dashboard panels) + site/js/dashboard.js
   [Last because it surfaces summary data from all models]
   Prerequisite: Steps 1–8 complete and JSON shapes confirmed
   Dependencies: dcf.json, cap-table.json, pf-recoveries.json, revenue-build.json

10. Navigation overhaul (components.js + HTML templates)
    [Can be done in parallel with 4–8, but tested after all pages exist]
    Prerequisite: All new page filenames known (so HIERARCHY map is complete)
```

**Steps 4–8 can be done in parallel** if multiple people are working. They share no runtime dependencies on each other — only both depend on Steps 1–3.

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Hardcoded Period Index Maps
**What:** `var IS_IDX = { 'FY2022': 0, 'FY2023': 1 }` in model JS
**Why bad:** When `financials.json` adds 2025E–2033E projection periods, every index map silently becomes wrong for the projection slice
**Instead:** Store period labels in JSON and find index at runtime: `data.periods.indexOf('FY 2026E')`

### Anti-Pattern 2: Tranche Data Inlined in Model Files
**What:** `var tranches = [{ id: 'term-loan', face: 1999.1 ... }]` inside `waterfall-model.js`
**Why bad:** Already duplicated. Adding PF recovery model would create a third copy. A face value change in the Excel requires finding and updating 3 files.
**Instead:** Read from `cap-table.json`. The JSON is already on disk and already correct.

### Anti-Pattern 3: Chart Defaults Set Per Module
**What:** `Chart.defaults.color = '#8899b4'` inside every model IIFE
**Why bad:** With 5+ models on 10+ pages, load order determines which color wins. Dark theme can silently break on any page.
**Instead:** Call `AMC_UTILS.initChartDefaults()` once in `amc-utils.js` initialization, after Chart.js loads.

### Anti-Pattern 4: Calculation in the Dashboard
**What:** `dashboard.js` re-computing DCF enterprise value from raw UFCF arrays
**Why bad:** Dashboard must stay in sync with DCF model logic. Two implementations diverge.
**Instead:** `dcf.json` includes pre-computed `enterpriseValue` summary fields. Dashboard reads those fields — it does not recalculate.

### Anti-Pattern 5: One Monolithic `all-models.json`
**What:** Merging all 30 Excel sheets into a single JSON file
**Why bad:** Dashboard loads ~200KB it doesn't need. Models that only need DCF data load revenue build rows too. Partial updates require re-extracting everything.
**Instead:** One JSON file per logical domain (as specified in Component 1 above). Dashboard uses `Promise.all` over the 4 files it actually needs.

---

## Scalability Considerations

| Concern | At Current Scale (5 models) | After Upgrade (10 models) | If Grows Beyond (20+ models) |
|---------|----------------------------|--------------------------|------------------------------|
| JSON data size | ~50KB total | ~300KB total (30 Excel sheets) | Consider lazy fetch per model instead of eager |
| Chart instances | 3–5 per page | 3–8 per page (DCF has multiple) | ChartRegistry.destroyAll() on tab hide events |
| Script load order | Manageable by hand | Still manageable (IIFE + window globals pattern) | Would need ES modules or bundler — out of scope now |
| `components.js` HIERARCHY map | 20 entries | 30 entries | Still fine; it's a lookup table, not computation |

---

## Sources

- Direct inspection of `site/js/financials-model.js`, `site/js/waterfall-model.js`, `site/js/components.js` (2026-03-23)
- Direct inspection of `site/data/financials.json`, `site/data/cap-table.json` (2026-03-23)
- `.planning/codebase/ARCHITECTURE.md`, `STRUCTURE.md`, `CONCERNS.md` (2026-03-23)
- `.planning/PROJECT.md` (2026-03-23)
- Chart.js v3 documentation — `ChartRegistry` pattern consistent with Chart.js official destroy/recreate guidance (HIGH confidence, established pattern)
- `Promise.all` multi-fetch pattern — standard vanilla JS, no library required (HIGH confidence)
