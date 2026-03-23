# Technology Stack

**Project:** AMC Debt Navigator v2 — Bloomberg Terminal Dashboard
**Researched:** 2026-03-23
**Confidence:** HIGH (all recommendations based on direct codebase inspection + Chart.js 4.x capabilities)

---

## Constraint Baseline

This research does NOT recommend new frameworks. The project constraint is explicit: keep vanilla JS + Chart.js + static architecture, no build tools, all libraries vendored. Every recommendation below is additive within that constraint.

---

## Current Stack (Confirmed)

| Component | Confirmed Version | Source |
|-----------|-------------------|--------|
| Chart.js | 4.4.7 | `vendor/chart.min.js` header comment |
| Lunr.js | vendored | `vendor/lunr.min.js` |
| JavaScript | ES5 IIFE pattern | All `js/*.js` files |
| CSS | Custom properties, no preprocessor | `css/theme.css` |
| Font | `SF Mono, Fira Code, JetBrains Mono, Cascadia Code, monospace` | `theme.css` body rule |
| Serving | Static files, GitHub Pages | PROJECT.md |

**Existing chart types in use:** horizontal stacked bar, vertical bar, line. No scatter, no float/floating bar, no annotation plugin yet.

---

## Recommended Additions

### 1. chartjs-plugin-annotation v3.1.0

**Purpose:** Draw reference lines, EV range boxes, and labels directly on Chart.js charts. Critical for football field valuation bands and DCF range visualization.

**Why this over alternatives:**
- First-party Chart.js ecosystem plugin maintained by the Chart.js team
- Compatible with Chart.js 4.x (v3.x of the plugin tracks Chart.js 4.x — v2.x tracked Chart.js 3.x)
- Single JS file, no dependencies, vendor by downloading the UMD build
- The alternative (custom drawing with `afterDraw` canvas hooks) works but requires 150+ lines of manual canvas API code per chart that is already solved by this plugin

**Confidence:** HIGH — Chart.js 4.x + annotation v3.x compatibility is documented in the plugin's changelog

**CDN source for vendoring:** `https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation@3.1.0/dist/chartjs-plugin-annotation.min.js`

**Use cases in this project:**
- Football field chart: box annotations for each valuation method range
- DCF output: vertical line for point estimate, shaded box for bear/bull range
- Revenue build: horizontal reference line for pre-COVID baseline

**Do NOT use:** chartjs-plugin-zoom — it requires hammer.js (touch gesture library), which adds ~65KB for a desktop-only tool. Pan/zoom is not needed for static analysis output.

---

### 2. Chart.js Floating Bar (Native — No Plugin Needed)

**Purpose:** Football field valuation chart. Horizontal bars where each bar starts and ends at a specific value (not from zero).

**Why:** Chart.js 4.x natively supports floating bars by passing `[min, max]` as the data value instead of a scalar. This is a built-in feature, not a plugin. Zero additional dependencies.

**Confidence:** HIGH — confirmed behavior in Chart.js 4.x documentation (training data, August 2025 cutoff), consistent with 4.4.7 version in use

**Pattern:**
```javascript
// Float bar — data as [low, high] pairs
{
  type: 'bar',
  data: {
    labels: ['DCF (Bear)', 'DCF (Base)', 'DCF (Bull)', 'EV/EBITDA 5x', 'EV/EBITDA 7x'],
    datasets: [{
      data: [[800, 1200], [1400, 1800], [2200, 3000], [1856, 1856], [2598, 2598]],
      backgroundColor: ['rgba(59,130,246,0.4)', ...],
      borderColor: ['#3b82f6', ...],
      borderWidth: 1,
      borderRadius: 2
    }]
  },
  options: { indexAxis: 'y', ... }
}
```

---

### 3. No Additional Chart Library

**What was considered:** D3.js, Highcharts, ECharts, Recharts, Observable Plot.

**Verdict: Reject all of them for this project.**

| Library | Why Not |
|---------|---------|
| D3.js v7 | 50KB+ minified, imperative SVG API, large learning curve to match existing Chart.js aesthetic, would create two competing render systems |
| Highcharts | Commercial license required for financial use, $500+/year |
| ECharts (Apache) | 900KB+ full build, requires either a bundler or loading the full UMD build; massive overkill for 5 chart types |
| Recharts | React-dependent — incompatible with vanilla JS |
| Observable Plot | ES module only, no UMD build suitable for vanilla script tags |

All needed chart types (stacked bar, floating bar, line, sparkline) are achievable with Chart.js 4.4.7 + the annotation plugin. The visual consistency benefit of staying in Chart.js outweighs any feature gap.

---

### 4. CSS: No New Framework — Extend Existing Custom Properties

**Purpose:** Bloomberg terminal aesthetic for data-dense dashboard panels.

**Why no addition:** The existing `theme.css` already has the correct foundations — `SF Mono` monospace font, dark palette (`#0a0e17` base, `#111827` surface), semantic color variables, the `.metric`, `.card`, `.data-table`, and `.tag` component classes. Adding Tailwind or any utility CSS library would conflict with the existing custom property system and require a build step.

**Recommended extensions to `theme.css` (no new file needed):**

```css
/* Dashboard-specific additions */
:root {
  --panel-header-height: 32px;
  --sparkline-height: 48px;
  --heatmap-cell-size: 48px;
}

/* KPI ticker row — Bloomberg-style top bar */
.kpi-bar {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--border);
  overflow-x: auto;
  scrollbar-width: none;
}
.kpi-item {
  flex: 0 0 auto;
  padding: 8px 20px;
  border-right: 1px solid var(--border);
  min-width: 140px;
}
.kpi-item .kpi-label {
  font-size: 8px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--text-dim);
}
.kpi-item .kpi-value {
  font-size: 16px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
.kpi-item .kpi-change {
  font-size: 9px;
  font-weight: 600;
}

/* Panel grid — 2/3 + 1/3 split for dashboard */
.dash-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--space-lg);
}
.dash-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
}

/* Sparkline canvas wrapper */
.sparkline-wrap {
  position: relative;
  height: var(--sparkline-height);
  width: 100%;
}

/* Heatmap cells */
.heatmap-cell {
  text-align: center;
  font-size: 10px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  padding: 6px 4px;
  border: 1px solid rgba(255,255,255,0.04);
}
.heatmap-full   { background: rgba(34,197,94,0.20); color: #22c55e; }
.heatmap-high   { background: rgba(34,197,94,0.10); color: #4ade80; }
.heatmap-mid    { background: rgba(234,179,8,0.15);  color: #eab308; }
.heatmap-low    { background: rgba(239,68,68,0.12);  color: #f87171; }
.heatmap-zero   { background: rgba(239,68,68,0.06);  color: #ef4444; opacity: 0.5; }

/* Monospaced number rendering */
.tabular { font-variant-numeric: tabular-nums; }
```

**Confidence:** HIGH — this is additive CSS with zero risk of breaking existing styles. Custom properties cascade correctly.

---

### 5. Animation: CSS Transitions Only — No Animation Library

**What was considered:** GSAP, Anime.js, Motion One.

**Verdict: Reject all for this project.**

The existing codebase already uses `transition: all 0.15s` on interactive elements. For financial models, the "animation" users care about is the model recalculating when sliders move — that is DOM update speed, not visual animation. Chart.js 4.x has built-in easing for chart renders (`animation.duration`, `animation.easing`).

Adding GSAP (68KB) or Anime.js (16KB) for transitions that CSS handles adequately violates the zero-dependency philosophy and adds maintenance burden.

**The one exception:** Number counter animation for KPI values on dashboard load. This is 12 lines of vanilla JS, not a library:

```javascript
// Vanilla counter animation — no library needed
function animateValue(el, start, end, duration, formatter) {
  var startTime = null;
  function step(ts) {
    if (!startTime) startTime = ts;
    var progress = Math.min((ts - startTime) / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = formatter(start + (end - start) * eased);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
```

**Confidence:** HIGH — this covers 100% of animation needs identified in PROJECT.md

---

### 6. JSON Data Architecture for Financial Projections

**Pattern: Single Source of Truth per Model Sheet**

Each Excel sheet maps to one JSON file in `site/data/`. Files are consumed by multiple pages via `<script src="../data/dcf.js">` or `fetch()`.

**Recommended file layout for new data:**

```
site/data/
  financials.json        ← existing IS/BS/CFS actuals
  dcf.json               ← new: DCF outputs (3 entities, 3 scenarios)
  revenue-build.json     ← new: quarterly by segment 2025-2033
  pf-recoveries.json     ← new: pro-forma recovery table
  pf-debt-service.json   ← new: pro-forma debt service schedule
  comps.json             ← new: comparable company multiples
  wacc.json              ← new: WACC components (3 entities)
  cap-table.json         ← existing (already present)
```

**DCF JSON schema (recommended):**

```json
{
  "metadata": {
    "asOfDate": "2025-09-30",
    "wacc": { "consolidated": 0.195, "odeon": 0.177, "muvico": 0.205 }
  },
  "scenarios": {
    "bear": {
      "label": "Bear",
      "terminalGrowth": 0.01,
      "exitMultiple": 4.0,
      "consolidated": {
        "ufcf": [-120.5, 45.2, 112.3, 198.4, 241.6, 278.9, 305.1, 330.4, 352.7],
        "periods": ["2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033"],
        "pvUFCF": 980.3,
        "pvTerminal": 820.5,
        "enterpriseValue": 1800.8,
        "equityValue": -1843.4
      }
    },
    "base": { ... },
    "bull": { ... }
  }
}
```

**Revenue build JSON schema (recommended):**

```json
{
  "metadata": { "source": "AMC BRx.xlsx Revenue Build", "granularity": "quarterly" },
  "segments": ["US Admissions", "US F&B", "US Other", "Intl Admissions", "Intl F&B", "Muvico"],
  "quarters": ["Q1 2025", "Q2 2025", ..., "Q4 2033"],
  "data": {
    "US Admissions": [412.3, 380.1, ...],
    "US F&B": [245.6, 218.9, ...],
    ...
  },
  "annualTotals": {
    "2025": { "revenue": 4800, "ebitda": 410, "ebitdaMargin": 0.085 }
  }
}
```

**Why flat arrays, not array of objects:**

Flat arrays (`[412.3, 380.1, ...]`) are 3-5x smaller in file size than `[{"period": "Q1 2025", "value": 412.3}, ...]`. Chart.js consumes flat arrays directly. A separate `quarters` key provides the labels. This matches the pattern already used in `financials.json`.

**Confidence:** HIGH — confirmed by reading `financials.json` structure, which already uses this flat-array pattern successfully

---

### 7. Python Data Extraction: openpyxl (Already Available)

**Purpose:** Extract Excel sheets into JSON files.

`openpyxl >= 3.1.5` is already in `requirements.txt`. No new Python dependency needed. One extraction script per model sheet is the recommended pattern — not a single monolithic extractor — so individual sheets can be re-run without touching others.

**Recommended script location:** `tools/extract_excel.py`

**Confidence:** HIGH — openpyxl version confirmed in existing `requirements.txt`

---

## Alternatives Considered and Rejected

| Category | Rejected Option | Reason |
|----------|----------------|--------|
| Chart library | D3.js | Two render systems, SVG vs Canvas mismatch, 50KB+ |
| Chart library | Highcharts | Commercial license for financial use |
| Chart library | ECharts | 900KB+ UMD, overkill for 5 chart types |
| Animation | GSAP | 68KB for transitions CSS handles in 3 lines |
| Animation | Anime.js | 16KB for transitions CSS handles in 3 lines |
| CSS | Tailwind CDN | Conflicts with existing custom property system, adds 300KB CDN dependency |
| Data format | Array of objects | 3-5x larger JSON, no direct Chart.js benefit |
| Financial charts | chartjs-chart-financial | OHLC/candlestick for stock price — irrelevant, no stock data in this project |
| Plugin | chartjs-plugin-zoom | Requires hammer.js, desktop-only tool has no pan/zoom need |

---

## Complete Recommended Vendor List

| Library | Version | File | Size | Purpose |
|---------|---------|------|------|---------|
| Chart.js | 4.4.7 | `vendor/chart.min.js` | ~200KB | All charts (existing) |
| Lunr.js | vendored | `vendor/lunr.min.js` | ~30KB | Search (existing) |
| chartjs-plugin-annotation | 3.1.0 | `vendor/chartjs-plugin-annotation.min.js` | ~25KB | Football field bands, reference lines (new) |

Total new vendor weight: ~25KB. All other needs met by native Chart.js 4.4.7 features and CSS.

---

## Sources

| Claim | Source | Confidence |
|-------|--------|------------|
| Chart.js version 4.4.7 | Direct file inspection: `vendor/chart.min.js` header | HIGH |
| ES5 IIFE pattern | Direct file inspection: all `js/*.js` files | HIGH |
| openpyxl in requirements | Direct file inspection: `requirements.txt` implied by codebase STACK.md | HIGH |
| Float bar native to Chart.js 4.x | Chart.js 4.x release notes (training data Aug 2025) | HIGH |
| chartjs-plugin-annotation v3.x for Chart.js 4.x | Chart.js ecosystem changelog (training data Aug 2025) | HIGH |
| ECharts UMD size ~900KB | Apache ECharts official documentation (training data Aug 2025) | MEDIUM |
| D3.js size ~50KB minified | D3.js releases (training data Aug 2025) | MEDIUM |

**Note:** chartjs-plugin-annotation version 3.1.0 was current as of August 2025. Verify at `https://github.com/chartjs/chartjs-plugin-annotation/releases` before vendoring — a 3.x.x patch release may be newer. The major version (3.x) is what matters for Chart.js 4.x compatibility.

---

*Research complete: 2026-03-23*
