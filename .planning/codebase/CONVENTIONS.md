# Coding Conventions

**Analysis Date:** 2026-03-23

## Overview

Static web app for financial debt analysis. No linting or formatting tools configured. Conventions enforced by consistency.

## Module Pattern

All JavaScript uses **IIFE (Immediately Invoked Function Expression)**:

```javascript
(function() {
  'use strict';
  // Config → State → Helpers → Business logic → Event listeners → Init
  var state = null;
  function helper() { ... }
  function init() { ... }
  init();
})();
```

## Naming

| Context | Convention | Examples |
|---------|-----------|---------|
| JS files | kebab-case | `waterfall-model.js`, `search-engine.js` |
| JS functions | camelCase | `calcConsolidated()`, `buildIndex()` |
| JS variables | camelCase | `currentView`, `financialData` |
| JS constants | UPPER_CASE or camelCase | `HIERARCHY`, `DOC_MAP` |
| Format helpers | Short names | `fmt()`, `fmtPct()`, `fmtX()`, `fmtM()` |
| Window globals | `window.AMC_*` | `window.AMC_SCENARIOS` |
| Python functions | snake_case | `clean_text()`, `detect_heading_levels()` |
| Python files | snake_case | `build_search_index.py` |
| CSS properties | kebab-case tokens | `--lien-1l`, `--surface-2` |

## Comments

- **File header:** Decorative box with `/* ═══ Module Name ═══ */`
- **Section dividers:** `// ── Section Name ──`
- **No JSDoc/TSDoc** — code is self-documenting
- **Python:** Triple-quoted docstrings on functions

## Error Handling

- **Guard clauses:** `if (!element) return;` — silent exit if DOM missing
- **Fetch retry:** Try multiple URL paths, fallback through array
- **Defensive defaults:** `var val = field || defaultValue`
- **No try-catch** in business logic (one exception in search-engine.js)
- **`console.error`** only for critical failures (e.g., data load failure)

## Cross-Module Communication

1. **Window globals** for shared data: `window.AMC_SCENARIOS`
2. **HTML data attributes** for config: `data-page`, `data-base`
3. **DOM queries** for element references
4. **No imports/exports** — script tag load order matters

## Formatting

- 2-space indentation (JS)
- Single quotes in JS, double quotes in Python
- Trailing semicolons always present
- Number formatting: `$1,234.5M` pattern via regex `/\B(?=(\d{3})+(?!\d))/g`
- HTML escaping via `escapeHtml()` / `escHtml()` for user input

## Function Design

- Most functions: 10-50 lines, none exceed 100
- Minimal parameters — close over module-level state
- One file = one concern (e.g., `waterfall-model.js` = waterfall only)

---

*Convention analysis: 2026-03-23*
