---
phase: 02-shared-utilities
verified: 2026-03-23T23:45:00Z
status: passed
score: 5/5 must-haves verified
re_verification: false
---

# Phase 2: Shared Utilities Verification Report

**Phase Goal:** A shared utility layer exists that prevents Chart.js leaks, standardizes data loading, and provides consistent formatters for all new model modules
**Verified:** 2026-03-23T23:45:00Z
**Status:** passed
**Re-verification:** No -- initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | window.AMC_UTILS exists and exposes ChartRegistry, DataLoader, initChartDefaults, and all shared formatters | VERIFIED | `window.AMC_UTILS = AMC_UTILS;` at line 236. All 11 API members confirmed: fmt, fmtPct, fmtPctDecimal, fmtX, fmtDollar, fmtShares, fmtInt, colorVal, initChartDefaults, ChartRegistry, DataLoader |
| 2 | Chart.js global defaults (color, borderColor, font) are set exactly once via initChartDefaults(), not per-model | VERIFIED | `_defaultsInitialized` guard at lines 84/91/92. Chart.defaults set at lines 101-119 (color, borderColor, font.family, font.size, responsive, maintainAspectRatio, tooltip, legend). Auto-executed at line 233 before global export. Zero existing model files modified (confirmed via git diff). |
| 3 | ChartRegistry.set(key, chart) auto-destroys previous instance for that key before storing new one | VERIFIED | Line 132-133: `if (this._instances[key]) { this._instances[key].destroy(); }` followed by `this._instances[key] = chartInstance;`. Also exposes get, destroy, destroyAll, has, keys methods. |
| 4 | DataLoader.fetch(filename) returns a Promise resolving to parsed JSON, caching results and deduplicating in-flight requests | VERIFIED | Line 222: `self._cache[filename] = promise;` stores Promise before resolution (dedup). Line 188-189: returns cached data or in-flight Promise on subsequent calls. Line 211: replaces Promise with resolved data. Line 199: cleans cache on failure. Path-trial fallback via `_basePaths: ['../data/', './data/', 'data/']`. |
| 5 | chartjs-plugin-annotation is loadable from site/vendor/ and auto-registers with Chart.js when included after chart.min.js | VERIFIED | File exists at `site/vendor/chartjs-plugin-annotation.min.js` (38,359 bytes, v3.1.0 UMD build). Starts with `/*! chartjs-plugin-annotation v3.1.0`. Test page at `tests/utils-test.html` loads it in correct order (chart.min.js -> annotation plugin -> amc-utils.js) and verifies registration via `Chart.registry.plugins.get('annotation')`. |

**Score:** 5/5 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `site/js/amc-utils.js` | Shared utility module with ChartRegistry, DataLoader, formatters, initChartDefaults (min 120 lines) | VERIFIED | 238 lines. IIFE pattern. Contains `window.AMC_UTILS`. All 11 API members present. ES5 `var` throughout. No TODOs/placeholders. |
| `site/vendor/chartjs-plugin-annotation.min.js` | Chart.js annotation plugin v3.x UMD build (min 1 line) | VERIFIED | 37KB minified UMD. v3.1.0. Contains 'annotation' string. Valid JS (not HTML error page). |
| `site/tests/utils-test.html` | Verification page for all shared utilities | VERIFIED | 187 lines. References AMC_UTILS 20+ times. 25 automated checks: formatters, chart defaults, ChartRegistry API, DataLoader API, annotation plugin registration, and ChartRegistry destroy lifecycle. Correct script load order. |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `site/js/amc-utils.js` | `Chart.defaults` | initChartDefaults() reads CSS custom properties from theme.css and sets Chart.defaults | WIRED | 15 `Chart.defaults.*` assignments at lines 101-119. `getComputedStyle(document.documentElement)` reads `--text-muted` and `--border` with fallbacks. Guard prevents double-init. |
| `site/js/amc-utils.js` | `site/data/*.json` | DataLoader.fetch() with path-trial fallback | WIRED | `_basePaths: ['../data/', './data/', 'data/']` at line 176. `fetch(url)` with `.json()` parsing at lines 204-211. Promise caching and dedup at lines 188-222. |
| `site/vendor/chartjs-plugin-annotation.min.js` | `site/vendor/chart.min.js` | UMD auto-registration (loaded after Chart.js via script tag order) | WIRED | Both files exist in `site/vendor/`. Test page (`utils-test.html`) loads them in correct order (lines 57-58) and verifies registration succeeds (line 129). |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| DATA-04 | 02-01-PLAN | Shared utility module (`amc-utils.js`) with ChartRegistry, DataLoader, and centralized formatters | SATISFIED | `site/js/amc-utils.js` exists with all specified APIs: ChartRegistry (set/get/destroy/destroyAll/has/keys), DataLoader (fetch/clearCache/\_basePaths), 8 formatters (fmt, fmtPct, fmtPctDecimal, fmtX, fmtDollar, fmtShares, fmtInt, colorVal), initChartDefaults. |
| DATA-05 | 02-01-PLAN | Chart.js global defaults centralized in shared module (fix existing collision bug) | SATISFIED | `initChartDefaults()` sets all Chart.defaults once with `_defaultsInitialized` guard. Reads CSS custom properties with fallbacks. Auto-executes at IIFE load time. Zero existing model files modified (collision pattern no longer needed in new modules). |
| DATA-06 | 02-01-PLAN | `chartjs-plugin-annotation` vendored in `site/vendor/` | SATISFIED | `site/vendor/chartjs-plugin-annotation.min.js` exists (37KB, v3.1.0 UMD). Auto-registers with Chart.js 4.4.7. Verified by test page. |

No orphaned requirements found. REQUIREMENTS.md maps DATA-04, DATA-05, DATA-06 to Phase 2. All three are claimed by plan 02-01 and verified above.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| (none) | -- | -- | -- | -- |

No TODOs, FIXMEs, placeholders, empty implementations, or console.log-only handlers found in any phase 2 artifact. All three files are clean.

### Human Verification Required

### 1. Test Page Browser Check

**Test:** Open `site/tests/utils-test.html` in a browser (serve via local HTTP server to allow fetch calls)
**Expected:** All 25 checks show green "[PASS]" with summary "25/25 checks passed" in green
**Why human:** Chart.js rendering, CSS custom property resolution, and DOM-based verification cannot be tested via static file analysis. The annotation plugin's UMD auto-registration requires a real browser context.

### 2. Script Load Order in Production Pages

**Test:** When Phase 3+ pages are built, confirm that `amc-utils.js` loads after `chart.min.js` and `chartjs-plugin-annotation.min.js` but before all model modules
**Expected:** `window.AMC_UTILS` is available when model modules execute
**Why human:** Script ordering is HTML-level wiring that only matters in the context of actual page construction in later phases

### Gaps Summary

No gaps found. All five observable truths are verified. All three artifacts pass all three verification levels (exists, substantive, wired). All three requirement IDs (DATA-04, DATA-05, DATA-06) are satisfied. No anti-patterns detected.

The shared utility layer is complete and ready to serve as foundation for Phases 3-5.

---

_Verified: 2026-03-23T23:45:00Z_
_Verifier: Claude (gsd-verifier)_
