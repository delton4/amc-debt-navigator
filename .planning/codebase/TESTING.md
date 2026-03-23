# Testing

**Analysis Date:** 2026-03-23

## Current State

**No automated tests exist.** No test framework, test runner, or coverage tool is configured.

## What Exists

- **Manual browser testing** — open pages, interact with models, check console
- **Module-scoped state** via IIFE — not directly unit-testable without refactoring
- **Some debug hooks:** `window.resetToLTM()` exposed for manual console testing
- **Guard clauses** serve as runtime assertions (e.g., `if (!el) return`)

## What Should Be Tested

### High-Value Targets

| Module | Functions | Risk |
|--------|----------|------|
| `waterfall-model.js` | `calcConsolidated()`, `calcMuvico()` | Core financial calculations with 20+ TODO comments |
| `leverage-model.js` | Leverage ratio calculations | Business-critical numbers |
| `pik-model.js` | PIK accrual projections | Compound interest calculations |
| `exchange-model.js` | `calcConversion()` | Premium schedules, parity prices |
| `financials-model.js` | Period index mappings | Brittle hardcoded mappings |
| `search-engine.js` | `buildIndex()`, result ranking | User-facing search quality |

### Recommended Approach

1. **Extract pure calculation functions** from IIFEs into testable modules
2. **Add a lightweight test runner** (e.g., inline `<script>` test page or simple Node.js tests)
3. **Snapshot test** the search index generation output
4. **Visual regression** for Chart.js renders (screenshot comparison)

## Build Script Testing

Python build scripts (`build_search_index.py`, `build_research.py`) have no tests.
Recommended: test HTML parsing output against known document fixtures.

---

*Testing analysis: 2026-03-23*
