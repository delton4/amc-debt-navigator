# Phase 2: Shared Utilities - Research

**Researched:** 2026-03-23
**Domain:** Chart.js utility infrastructure, vanilla JS module patterns, chart lifecycle management
**Confidence:** HIGH

## Summary

Phase 2 creates a single shared utility file (`site/js/amc-utils.js`) that all downstream model modules depend on. The file provides four capabilities: (1) ChartRegistry for centralized chart instance lifecycle management, (2) DataLoader for consistent JSON fetching with path-trial fallback, (3) centralized formatters to replace 6+ duplicated helper functions across model files, and (4) a one-time Chart.js global defaults initializer. Additionally, `chartjs-plugin-annotation` v3.1.0 must be vendored into `site/vendor/`.

The codebase already uses Chart.js 4.4.7 (UMD via `site/vendor/chart.min.js`), the IIFE module pattern with `window.*` globals, and `<script>` tag ordering for dependency management. The shared utility must follow these exact conventions -- no bundler, no ES modules, no npm. Every existing model file (`waterfall-model.js`, `financials-model.js`, `leverage-model.js`, `pik-model.js`, `exchange-model.js`) sets `Chart.defaults.color` and `Chart.defaults.borderColor` independently, and each defines its own `fmt()`, `fmtPct()`, etc. The Phase 2 utility centralizes these, but existing model files are NOT migrated in this phase -- only new modules (Phases 3-5) will consume `window.AMC_UTILS`.

**Primary recommendation:** Build `amc-utils.js` as a single IIFE that exposes `window.AMC_UTILS` with `ChartRegistry`, `DataLoader`, `initChartDefaults()`, and all shared formatters. Vendor `chartjs-plugin-annotation@3.1.0` from jsDelivr CDN. Do NOT modify existing model files in this phase.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
None -- user granted full discretion on all technical decisions for this infrastructure phase.

### Claude's Discretion
User granted full discretion on all technical decisions for this infrastructure phase. Key areas:

**Formatter behavior:**
- How to unify the 6+ duplicate `fmt()`, `fmtPct()`, `fmtM()` functions
- Number format conventions ($1,234.5M style vs alternatives)
- Whether existing model files get updated to use shared formatters in this phase or deferred

**Chart theme defaults:**
- Chart.js color palette, grid style, tooltip format
- How to prevent per-model overrides (the existing collision bug)
- Dark theme color tokens integration with CSS custom properties

**Data loading pattern:**
- Single fetch vs preload vs lazy loading
- Error handling strategy (current multi-path fallback vs simpler approach)
- How DataLoader integrates with existing `window.AMC_*` global pattern

**ChartRegistry design:**
- API for registering, destroying, and replacing chart instances
- How to solve the tab-switch destroy/recreate memory leak
- Whether to wrap Chart.js constructor or provide a factory

**chartjs-plugin-annotation:**
- Source: CDN download to vendor in `site/vendor/`
- Version: 3.x for Chart.js 4.x compatibility
- Verify renders correctly with existing Chart.js version

**Backward compatibility:**
- Whether existing model files (waterfall-model.js, financials-model.js, etc.) get migrated to shared utils in this phase
- Minimum: new modules use shared utils; existing modules can be migrated later

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| DATA-04 | Shared utility module (`amc-utils.js`) with ChartRegistry, DataLoader, and centralized formatters | Full architecture pattern documented below; API surface mapped from 5 existing model files; formatter catalog compiled from codebase grep |
| DATA-05 | Chart.js global defaults centralized in shared module (fix existing collision bug) | All 5 model files confirmed to independently set `Chart.defaults.color = '#8899b4'` and `Chart.defaults.borderColor = '#2a3654'`; `initChartDefaults()` pattern documented |
| DATA-06 | `chartjs-plugin-annotation` vendored in `site/vendor/` | Version 3.1.0 confirmed compatible with Chart.js 4.4.7; jsDelivr CDN URL identified; UMD auto-registers globally when loaded via script tag |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Chart.js | 4.4.7 | Charting library (already vendored) | Already in use across all 5 model files |
| chartjs-plugin-annotation | 3.1.0 | Annotation overlays on charts (line, box, label) | Required by DATA-06; v3.x is the compatible line for Chart.js 4.x |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| No new libraries | -- | -- | This phase adds zero new dependencies beyond the annotation plugin |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Single IIFE utility file | ES modules with bundler | Project explicitly excludes framework migration (Out of Scope); IIFE + window globals is the established pattern |
| Path-trial DataLoader | Service worker pre-cache | Overkill for static site served from file:// and GitHub Pages |
| ChartRegistry (manual) | Chart.getChart() static method | Chart.getChart() finds by canvas ID but lacks key-based semantics and explicit lifecycle control the project needs |

**Installation:**
```bash
# Download chartjs-plugin-annotation UMD from jsDelivr
curl -o site/vendor/chartjs-plugin-annotation.min.js \
  "https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation@3.1.0/dist/chartjs-plugin-annotation.min.js"
```

## Architecture Patterns

### Recommended Project Structure
```
site/
  vendor/
    chart.min.js                        # Chart.js 4.4.7 (existing)
    chartjs-plugin-annotation.min.js    # v3.1.0 (NEW - Phase 2)
    lunr.min.js                         # (existing)
  js/
    amc-utils.js                        # NEW - Phase 2: shared utilities
    components.js                       # (existing)
    *-model.js                          # (existing + new in Phases 3-5)
  data/
    *.json                              # 27 JSON files from Phase 1
  css/
    theme.css                           # CSS custom properties (existing)
```

### Pattern 1: IIFE Module with Window Global
**What:** `amc-utils.js` uses the same IIFE pattern as all existing code, exposing its API on `window.AMC_UTILS`.
**When to use:** Always -- this is the project's only module system.
**Example:**
```javascript
// Source: Derived from existing codebase convention (components.js, *-model.js)
(function() {
  'use strict';

  var AMC_UTILS = {};

  // --- Formatters ---
  AMC_UTILS.fmt = function(n) { /* ... */ };
  AMC_UTILS.fmtPct = function(n) { /* ... */ };
  // ...

  // --- Chart Defaults ---
  AMC_UTILS.initChartDefaults = function() { /* ... */ };

  // --- ChartRegistry ---
  AMC_UTILS.ChartRegistry = { /* ... */ };

  // --- DataLoader ---
  AMC_UTILS.DataLoader = { /* ... */ };

  window.AMC_UTILS = AMC_UTILS;
})();
```

### Pattern 2: ChartRegistry for Lifecycle Management
**What:** A keyed registry that stores Chart.js instances by string key, providing destroy-before-create semantics.
**When to use:** Every chart creation in every model module.
**Example:**
```javascript
// Source: Derived from Chart.js 4.4.7 API (chart.destroy())
// and existing financials-model.js tab-switch pattern
var ChartRegistry = {
  _instances: {},

  set: function(key, chartInstance) {
    // Destroy existing before storing new
    if (this._instances[key]) {
      this._instances[key].destroy();
    }
    this._instances[key] = chartInstance;
    return chartInstance;
  },

  get: function(key) {
    return this._instances[key] || null;
  },

  destroy: function(key) {
    if (this._instances[key]) {
      this._instances[key].destroy();
      delete this._instances[key];
    }
  },

  destroyAll: function() {
    var keys = Object.keys(this._instances);
    for (var i = 0; i < keys.length; i++) {
      this._instances[keys[i]].destroy();
    }
    this._instances = {};
  }
};
```

### Pattern 3: DataLoader with Path-Trial Fallback
**What:** Wraps the existing multi-path `fetch()` pattern (from `financials-model.js` lines 74-95) into a reusable Promise-based function.
**When to use:** Every model module that needs JSON data.
**Example:**
```javascript
// Source: Derived from financials-model.js loadData() pattern
var DataLoader = {
  _cache: {},
  _basePaths: ['../data/', './data/', 'data/'],

  fetch: function(filename) {
    if (this._cache[filename]) {
      return Promise.resolve(this._cache[filename]);
    }
    var self = this;
    var paths = this._basePaths.map(function(base) { return base + filename; });
    var idx = 0;

    function tryNext(resolve, reject) {
      if (idx >= paths.length) {
        reject(new Error('DataLoader: Could not load ' + filename));
        return;
      }
      var url = paths[idx++];
      window.fetch(url)
        .then(function(r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          return r.json();
        })
        .then(function(data) {
          self._cache[filename] = data;
          resolve(data);
        })
        .catch(function() { tryNext(resolve, reject); });
    }

    return new Promise(tryNext);
  }
};
```

### Pattern 4: initChartDefaults() Called Once Per Page
**What:** Sets Chart.js global defaults exactly once. References CSS custom properties from `theme.css` via `getComputedStyle()` for consistency with the design system.
**When to use:** Called automatically when `amc-utils.js` loads, or explicitly by model modules if deferred initialization is needed.
**Example:**
```javascript
// Source: Consolidation of existing pattern found in all 5 model files
// Chart.defaults.color = '#8899b4'; Chart.defaults.borderColor = '#2a3654';
var _defaultsInitialized = false;

AMC_UTILS.initChartDefaults = function() {
  if (_defaultsInitialized) return;
  _defaultsInitialized = true;

  // Read from CSS custom properties for design system consistency
  var style = getComputedStyle(document.documentElement);
  var textMuted = style.getPropertyValue('--text-muted').trim() || '#8899b4';
  var border = style.getPropertyValue('--border').trim() || '#2a3654';

  Chart.defaults.color = textMuted;
  Chart.defaults.borderColor = border;
  Chart.defaults.font.family = "'SF Mono', 'Fira Code', 'JetBrains Mono', monospace";
  Chart.defaults.font.size = 11;
  Chart.defaults.responsive = true;
  Chart.defaults.maintainAspectRatio = false;

  // Tooltip defaults
  Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(17, 24, 39, 0.95)';
  Chart.defaults.plugins.tooltip.titleFont = { size: 11, family: "'SF Mono', monospace" };
  Chart.defaults.plugins.tooltip.bodyFont = { size: 10, family: "'SF Mono', monospace" };
  Chart.defaults.plugins.tooltip.borderColor = border;
  Chart.defaults.plugins.tooltip.borderWidth = 1;
  Chart.defaults.plugins.tooltip.padding = 8;

  // Legend defaults
  Chart.defaults.plugins.legend.labels.font = { size: 10, family: "'SF Mono', monospace" };
  Chart.defaults.plugins.legend.labels.padding = 12;
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
};
```

### Pattern 5: HTML Script Tag Load Order
**What:** Every model page must load scripts in this exact order.
**When to use:** Every HTML page that uses charts.
**Example:**
```html
<!-- Source: Derived from existing financials.html pattern + new requirements -->
<script src="../vendor/chart.min.js"></script>
<script src="../vendor/chartjs-plugin-annotation.min.js"></script>
<script src="../js/amc-utils.js"></script>
<script src="../js/components.js"></script>
<script src="../js/*-model.js"></script>
```

### Anti-Patterns to Avoid
- **Setting Chart.defaults in model files:** Every existing model file does this. New modules MUST NOT. `initChartDefaults()` is the single source of truth.
- **Module-level chart variables without registry:** The existing `var chart = null;` pattern in model files leads to orphaned instances when tab-switching creates new charts without properly destroying old ones.
- **Hardcoding data paths:** The existing `financials-model.js` hardcodes three path fallbacks inline. New modules use `DataLoader.fetch()` instead.
- **Re-defining formatters per module:** Each existing model file defines its own `fmt()`, `fmtPct()`, etc. with subtle differences. New modules use `AMC_UTILS.fmt()` exclusively.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Number formatting (currency) | Custom regex per file | Centralized `AMC_UTILS.fmt()` with Intl.NumberFormat or regex | 6+ slightly different implementations exist already; the `exchange-model.js` `fmt()` uses 2 decimals while `waterfall-model.js` uses 1 |
| Chart instance cleanup | Manual `if (chart) chart.destroy()` in every file | `ChartRegistry.set(key, instance)` auto-destroys previous | Prevents orphaned chart instances; single point of lifecycle control |
| JSON path resolution | Copy-paste path-trial fetch in every model | `DataLoader.fetch(filename)` with caching | Existing pattern in `financials-model.js` works well but must not be duplicated |
| Chart annotation overlays | Custom canvas drawing or HTML overlays | `chartjs-plugin-annotation` | Handles resize, zoom, animation, and tooltip integration automatically |

**Key insight:** The current codebase has already proven these patterns work -- this phase extracts and centralizes them, not invents new ones.

## Common Pitfalls

### Pitfall 1: Chart.defaults Race Condition
**What goes wrong:** `initChartDefaults()` is called before `Chart` is loaded, or after a model file has already set different defaults.
**Why it happens:** Script tag ordering error in HTML, or a model file loaded via async/defer.
**How to avoid:** `amc-utils.js` must be loaded synchronously after `chart.min.js` and before all model scripts. The `_defaultsInitialized` guard prevents double-initialization. Never use `async` or `defer` on these scripts.
**Warning signs:** Charts rendering with white text on white background, or inconsistent grid colors between pages.

### Pitfall 2: Canvas Reuse Without Destroy
**What goes wrong:** Creating a new Chart on a canvas that already has a Chart instance produces "Canvas is already in use" error or renders a ghost overlay of the old chart.
**Why it happens:** Tab-switching calls render functions that create new Chart instances without destroying the old one first.
**How to avoid:** `ChartRegistry.set(key, new Chart(...))` auto-destroys the previous instance for that key before storing the new one. Models should always use `ChartRegistry.set()` instead of bare `new Chart()`.
**Warning signs:** Double chart rendering (two overlaid charts), console warnings about canvas reuse.

### Pitfall 3: DataLoader Cache Serving Stale Data
**What goes wrong:** DataLoader caches a response, then a different page needs the same file but expects fresh data.
**Why it happens:** This is a static site -- data files never change at runtime. So this is actually NOT a problem. Cache is beneficial.
**How to avoid:** Cache is page-scoped (IIFE module state resets on page navigation). No stale data risk.
**Warning signs:** None expected. If issues arise, add `DataLoader.clearCache()`.

### Pitfall 4: chartjs-plugin-annotation Version Mismatch
**What goes wrong:** Plugin doesn't render annotations, or throws registration errors.
**Why it happens:** Using annotation plugin v2.x with Chart.js 4.x, or using v3.x with Chart.js 3.x.
**How to avoid:** Chart.js 4.4.7 requires chartjs-plugin-annotation 3.x. Pin to 3.1.0. The UMD build auto-registers globally when loaded via `<script>` tag after `chart.min.js`.
**Warning signs:** Console errors like "annotation is not a registered plugin" or annotations simply not appearing.

### Pitfall 5: getComputedStyle Before DOM Ready
**What goes wrong:** `initChartDefaults()` reads CSS custom properties via `getComputedStyle()` but gets empty strings if called before stylesheets are parsed.
**Why it happens:** Script in `<head>` executes before CSS is loaded.
**How to avoid:** All scripts are at the bottom of `<body>` in this project (after CSS link tags), so this should not occur. Fallback values (`|| '#8899b4'`) provide safety.
**Warning signs:** Chart text appearing with default black color instead of theme muted color.

### Pitfall 6: Existing Model Files Still Set Chart.defaults
**What goes wrong:** Even after `amc-utils.js` centralizes defaults, existing model files like `waterfall-model.js` still have `Chart.defaults.color = '#8899b4'` on line 10. If they load after `amc-utils.js`, they re-set the same values (harmless). If values ever diverge, the last-loaded file wins.
**Why it happens:** This phase explicitly does NOT modify existing model files.
**How to avoid:** Accept this technical debt for Phase 2. The existing files all set identical values (`#8899b4` and `#2a3654`) so there's no functional conflict. Future phases that modify existing modules should remove these lines.
**Warning signs:** None in Phase 2 since values are identical.

## Code Examples

Verified patterns from the existing codebase:

### Formatter Catalog (from codebase analysis)
```javascript
// Source: Grep across all 5 model files in site/js/

// === fmt() variations ===
// waterfall-model.js:61 / leverage-model.js:43 / pik-model.js:46
//   function fmt(n) { return '$' + n.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'M'; }
//
// financials-model.js:40 (handles null/negative)
//   function fmt(n) {
//     if (n === null || n === undefined || isNaN(n)) return 'N/A';
//     var abs = Math.abs(n);
//     var s = '$' + abs.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'M';
//     return n < 0 ? '(' + s + ')' : s;
//   }
//
// exchange-model.js:51 (plain dollars, 2 decimal)
//   function fmt(n) { return '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }

// === UNIFIED FORMATTERS (recommended for amc-utils.js) ===

// Dollar millions: $1,234.5M with parentheses for negatives, N/A for null
AMC_UTILS.fmt = function(n) {
  if (n === null || n === undefined || isNaN(n)) return 'N/A';
  var abs = Math.abs(n);
  var s = '$' + abs.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'M';
  return n < 0 ? '(' + s + ')' : s;
};

// Percentage: "12.5%" (from raw percentage, NOT decimal)
AMC_UTILS.fmtPct = function(n) {
  if (n === null || n === undefined || isNaN(n)) return 'N/A';
  return n.toFixed(1) + '%';
};

// Leverage multiple: "5.50x"
AMC_UTILS.fmtX = function(n) {
  if (n === null || n === undefined || isNaN(n)) return 'N/A';
  return n.toFixed(2) + 'x';
};

// Plain dollar amount (no M suffix): "$1,234.50"
AMC_UTILS.fmtDollar = function(n) {
  if (n === null || n === undefined || isNaN(n)) return 'N/A';
  var abs = Math.abs(n);
  var s = '$' + abs.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return n < 0 ? '(' + s + ')' : s;
};

// Share count: "1,234.56"
AMC_UTILS.fmtShares = function(n) {
  if (n === null || n === undefined || isNaN(n)) return 'N/A';
  return n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Color helper: green for positive, red for negative
AMC_UTILS.colorVal = function(n) {
  return n < 0 ? '#ef4444' : '#22c55e';
};
```

### Existing Data Loading Pattern (to replicate in DataLoader)
```javascript
// Source: financials-model.js lines 74-95
// This is the ONLY existing file that uses fetch() for JSON.
// Other model files hardcode their data or use <script> tag globals.

function loadData() {
  var paths = ['../data/financials.json', './data/financials.json', 'data/financials.json'];
  var idx = 0;
  function tryNext() {
    if (idx >= paths.length) {
      console.error('financials-model: Could not load financials.json');
      return;
    }
    var url = paths[idx++];
    fetch(url)
      .then(function(r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function(data) {
        financialData = data;
        init();
      })
      .catch(tryNext);
  }
  tryNext();
}
```

### Existing Chart Destroy Pattern (to replace with ChartRegistry)
```javascript
// Source: financials-model.js lines 62-65, 781-801
// The manual destroy-before-create pattern used in tab switching:

function destroyChart(chartRef) {
  if (chartRef) { chartRef.destroy(); }
  return null;
}

// In setTab():
window.setTab = function(tabId) {
  if (tabId === 'is') {
    isChart = destroyChart(isChart);
    renderISTab(currentISPeriod);
  } else if (tabId === 'bs') {
    bsChart = destroyChart(bsChart);
    renderBSTab(currentBSPeriod);
  }
  // ...
};
```

### CSS Custom Properties Available for Chart Theme
```css
/* Source: site/css/theme.css lines 7-37 */
:root {
  --bg: #0a0e17;
  --surface: #111827;
  --surface-2: #1a2236;
  --border: #2a3654;         /* Used for Chart.defaults.borderColor */
  --text: #e2e8f0;
  --text-muted: #8899b4;    /* Used for Chart.defaults.color */
  --text-dim: #5a6d8a;
  --green: #22c55e;
  --red: #ef4444;
  --blue: #3b82f6;
  --purple: #a855f7;
  --cyan: #06b6d4;
  --yellow: #eab308;
  --orange: #f97316;
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `Chart.defaults.global.color` | `Chart.defaults.color` | Chart.js 3.0 (2021) | Project already uses v4 syntax -- no migration needed |
| Manual plugin registration | UMD auto-registration for script tags | Chart.js 3.x+ | annotation plugin auto-registers when loaded via `<script>` after Chart.js |
| `Chart.instances` array lookup | `Chart.getChart(canvasId)` static method | Chart.js 3.0+ | Available for canvas-based lookup, but ChartRegistry provides better key-based semantics |
| Annotation plugin v2.x | v3.1.0 | May 2024 | v3.x required for Chart.js 4.x; v2.x only works with Chart.js 3.7-3.9 |

**Deprecated/outdated:**
- `Chart.defaults.global`: Removed in Chart.js 3.0. Use `Chart.defaults` directly. Project already does this correctly.
- `chartjs-plugin-annotation v2.x`: Only compatible with Chart.js 3.7-3.9. Must use v3.x for Chart.js 4.4.7.

## Open Questions

1. **Should initChartDefaults() auto-execute on load or require explicit call?**
   - What we know: Existing files set defaults at module scope (IIFE body). Architecture spec says "called ONCE per page."
   - Recommendation: Auto-execute at end of IIFE (after DOM check). This matches existing behavior where defaults are set at script load time. Provide the function on the API so models can verify/re-call if needed, but call it immediately by default.

2. **fmtPct() convention: does input represent raw percentage or decimal?**
   - What we know: `waterfall-model.js` passes raw percentages (e.g., 85.3 -> "85.3%"). `financials-model.js` passes decimals (e.g., 0.853 -> "85.3%", multiplying by 100 internally). Both conventions exist.
   - Recommendation: Provide two functions: `fmtPct(n)` for raw percentages (most common use), and `fmtPctDecimal(n)` that multiplies by 100 first (for `financials-model.js` convention). Document the distinction clearly.

3. **Should DataLoader support concurrent requests for the same file?**
   - What we know: `Promise.all([DataLoader.fetch('a.json'), DataLoader.fetch('b.json')])` is the planned dashboard pattern. If two modules request the same file simultaneously before cache is populated, both will make network requests.
   - Recommendation: Store the pending Promise in the cache immediately (not just the resolved data). This deduplicates in-flight requests. Simple to implement.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None -- no test infrastructure exists |
| Config file | none -- see Wave 0 |
| Quick run command | Manual browser testing (open HTML file, check console) |
| Full suite command | Manual browser testing |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DATA-04 | `window.AMC_UTILS` exposes ChartRegistry, DataLoader, initChartDefaults, formatters | manual-only | Open any model page in browser, run `typeof window.AMC_UTILS.ChartRegistry` in console | N/A |
| DATA-05 | Chart.js defaults set exactly once, not per-model | manual-only | Open financials page, verify `Chart.defaults.color === '#8899b4'` in console; check no double-set by adding console.log to initChartDefaults | N/A |
| DATA-06 | chartjs-plugin-annotation vendored and loadable | manual-only | Check `site/vendor/chartjs-plugin-annotation.min.js` exists; open a page that includes it and verify `Chart.registry.plugins.get('annotation')` is truthy | N/A |

### Sampling Rate
- **Per task commit:** Open test HTML page in browser, verify console has no errors
- **Per wave merge:** Open all model pages, verify charts render correctly
- **Phase gate:** All 3 requirements verified via browser console checks

### Wave 0 Gaps
- No automated test framework exists. For a static vanilla JS site without npm/node, automated testing would require significant infrastructure setup (jsdom, puppeteer, etc.) that is out of scope for this case competition project.
- Validation is manual: browser console checks confirm API surface exists and charts render.
- **Justification for manual-only:** This is a static HTML/JS site for a business case competition with no build system. The overhead of setting up automated browser testing exceeds the value for this project scope.

## Sources

### Primary (HIGH confidence)
- Chart.js 4.4.7 vendor file header -- confirmed exact version from `site/vendor/chart.min.js` line 2: `/npm/chart.js@4.4.7/dist/chart.umd.js`
- Existing codebase analysis -- all patterns derived from direct grep/read of 5 model files in `site/js/`
- CSS custom properties -- read directly from `site/css/theme.css` lines 7-37
- [Chart.js Configuration docs](https://www.chartjs.org/docs/latest/configuration/) -- global defaults merging behavior
- [Chart.js API docs](https://www.chartjs.org/docs/latest/developers/api.html) -- `Chart.getChart()` static method, `chart.destroy()` API

### Secondary (MEDIUM confidence)
- [chartjs-plugin-annotation v3.1.0 releases](https://github.com/chartjs/chartjs-plugin-annotation/releases) -- version 3.1.0 released Oct 16, 2024; compatible with Chart.js 4.x
- [chartjs-plugin-annotation integration guide](https://www.chartjs.org/chartjs-plugin-annotation/latest/guide/integration.html) -- UMD script tag auto-registration confirmed
- [jsDelivr CDN for chartjs-plugin-annotation](https://www.jsdelivr.com/package/npm/chartjs-plugin-annotation) -- CDN download URL for vendoring
- [Chart.js memory management](https://github.com/chartjs/Chart.js/issues/4291) -- destroy() required before canvas reuse; best practice for tab switching

### Tertiary (LOW confidence)
- None -- all findings verified against primary or secondary sources.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- Chart.js 4.4.7 confirmed from vendor file; annotation plugin 3.1.0 verified from GitHub releases
- Architecture: HIGH -- all patterns derived from direct codebase analysis of 5 existing model files
- Pitfalls: HIGH -- every pitfall observed directly in the existing codebase (duplicate defaults, manual destroy, path-trial duplication)

**Research date:** 2026-03-23
**Valid until:** 2026-04-23 (stable -- Chart.js 4.x and plugin 3.x are mature releases)
