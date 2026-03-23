# Concerns

**Analysis Date:** 2026-03-23

## Technical Debt

### High Priority

1. **Widespread data duplication** — Tranche/document metadata hardcoded in 8+ JS files (`waterfall-model.js`, `scenario-engine.js`, `scenario-detail.js`, `crosslink.js`, `exchange-model.js`, `pik-model.js`, `context-panel.js`). Changes require updating all files.

2. **Brittle period mappings** — `financials-model.js` has hardcoded index maps (`IS_IDX`, `BS_IDX`, `CFS_IDX`) that break if `financials.json` periods change. No validation.

3. **20+ TODO comments in `waterfall-model.js`** — Recovery waterfall calculations have numerous incomplete or estimated values. Core business logic is partially stubbed.

### Medium Priority

4. **No module system** — All JS uses IIFEs with window globals. No bundler, no imports. Refactoring requires manual dependency tracking.

5. **Formatting helpers duplicated** — `fmt()`, `fmtPct()`, `fmtM()` defined independently in multiple model files with slight variations.

6. **No automated tests** — Zero unit, integration, or E2E tests for financial calculations that drive the entire application.

## Known Bugs

1. **Silent definition load failure** — `crosslink.js` loads `definitions.js` dynamically but `onerror` handler is a no-op. Hover previews silently break.

2. **Missing null guards in scenario rendering** — Scenario detail page assumes all scenario properties exist. Missing properties cause runtime errors.

3. **Chart destroy/recreate cycle** — Chart.js instances destroyed and recreated on every tab switch in `financials-model.js`. Memory leak risk on rapid switching.

## Security

1. **Search index contains full document text** — `search-docs.js` (~2.3MB) embeds complete content of all 7 legal documents. If repo goes public, all document content is exposed in a single file.

2. **Regex from user input** — Search highlighting constructs regex from user search terms. Special regex characters could cause unexpected behavior (not exploitable, but could break highlighting).

3. **No CSP headers** — Static site has no Content Security Policy. All scripts load via `<script>` tags.

## Performance

1. **2.3MB search index** — `data/search-docs.js` loads on search page. Significant first-load penalty on slow connections.

2. **Large model files** — `financials-model.js` (837 lines), `waterfall-model.js` (700+ lines) loaded in full even if user only views one tab.

3. **Synchronous script loading** — No `defer` or `async` on script tags. Page interactivity blocked until all JS loads.

4. **Chart.js global defaults overwritten** — Multiple modules set `Chart.defaults.color` and `Chart.defaults.borderColor`. Last loaded wins.

## Fragile Areas

1. **Scenario engine ↔ scenario detail coupling** — Both files duplicate scenario metadata. Adding a scenario requires changes in `data/scenarios.js` AND `scenario-detail.js`.

2. **Waterfall calculations ↔ DOM rendering** — Business logic and presentation tightly coupled in `waterfall-model.js`. Cannot calculate recoveries without a DOM.

3. **Cross-link regex patterns** — `crosslink.js` uses regex to find financial terms in document HTML. Overlapping terms or new terms can break highlighting.

4. **Script load order** — Data files must load before consuming modules. No dependency declaration — order enforced by HTML `<script>` tag position.

## Scaling Limits

1. **Search index size** — Single 2.3MB file will become prohibitive beyond ~50 documents. No pagination, lazy loading, or server-side search.

2. **Waterfall visualization** — Stacked bar charts become unreadable beyond 15-20 tranches.

3. **Manual data entry** — `financials.json` and `cap-table.json` updated by hand. No pipeline from source filings.

---

*Concerns analysis: 2026-03-23*
