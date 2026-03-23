# Phase 2: Shared Utilities - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Build a shared utility module (`amc-utils.js`) that all new model modules depend on: ChartRegistry for lifecycle management, DataLoader for consistent JSON fetching, centralized formatters, and Chart.js global defaults set once. Vendor `chartjs-plugin-annotation`. This phase creates JS infrastructure only — no new model pages.

</domain>

<decisions>
## Implementation Decisions

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
- Source: CDN download → vendor in `site/vendor/`
- Version: 3.x for Chart.js 4.x compatibility
- Verify renders correctly with existing Chart.js version

**Backward compatibility:**
- Whether existing model files (waterfall-model.js, financials-model.js, etc.) get migrated to shared utils in this phase
- Minimum: new modules use shared utils; existing modules can be migrated later

</decisions>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches. Bloomberg terminal aesthetic is the north star for visual decisions.

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `site/js/components.js`: Shared breadcrumb + keyboard shortcuts — pattern for cross-page utilities
- `site/css/theme.css`: CSS custom properties (`--text`, `--surface`, `--border`, `--blue`) — chart colors should reference these

### Established Patterns
- IIFE module pattern: `(function() { 'use strict'; ... })();`
- Window globals: `window.AMC_*` for cross-module data sharing
- Script load order: data files → libraries → feature modules (HTML `<script>` tag order)
- `financials-model.js` lines 10-11: `Chart.defaults.color = '#8899b4'; Chart.defaults.borderColor = '#2a3654';` — the collision pattern to fix

### Integration Points
- New `amc-utils.js` must load BEFORE all model modules (script tag order)
- `chartjs-plugin-annotation` must load AFTER `chart.min.js` but BEFORE model modules
- Existing modules set `Chart.defaults.*` independently — shared utils must override this pattern
- 27 new JSON files in `site/data/` from Phase 1 need a consistent loading pattern

### Known Bugs to Fix
- Chart destroy/recreate cycle in `financials-model.js` (memory leak on tab switching)
- Chart.js global defaults set in multiple modules (last loaded wins — unpredictable)
- Formatting helpers duplicated with slight variations across 6+ files

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-shared-utilities*
*Context gathered: 2026-03-23*
