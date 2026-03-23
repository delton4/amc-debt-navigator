# Phase 1: Data Extraction - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Extract all data from `AMC BRx.xlsx` (30 sheets) into clean, validated JSON files that downstream model modules can consume. Python script using openpyxl. This phase produces data files only — no JS, no HTML, no CSS changes.

</domain>

<decisions>
## Implementation Decisions

### Sheet Selection
- Extract ALL 30 sheets from the Excel file
- For paired sheets (IS Reformat / IS, BS Reformat / BS, CFS Reformat / CFS): the non-Reformat tabs (IS, BS, CFS) are the source of truth — they have projections
- Revenue Build: extract full quarterly detail (1400 rows × 56 columns) — maximum granularity
- NWC and D&A & CapEx: Claude's discretion — extract and determine if they warrant standalone pages or are supporting data for DCF
- Liquidity Roll Forward sheets: one is current, other is pro-forma — extract both

### JSON File Organization
- One JSON file per Excel sheet (mirrors Excel structure)
- File naming: match Excel sheet names in kebab-case (e.g., `is.json`, `bs.json`, `wacc.json`, `odeon-is.json`, `muvico-dcf.json`, `revenue-build.json`, `pf-recoveries.json`, `pf-ds.json`, `ds.json`, `cap-table.json`, `comps.json`, etc.)
- Replace existing `financials.json` and `cap-table.json` entirely — Excel is the single source of truth
- All files go in `site/data/`

### Historical vs Projected
- Time range: 2019–2033 (pre-COVID baseline through projections)
- Exclude 2016–2018 data
- Flag actual vs projected years in JSON (e.g., `"projectedStart": 2026` or `"isProjected": [false, false, ..., true, true]`) — enables dashed-line styling for projections on charts
- Revenue Build: quarterly granularity
- All other sheets: annual granularity only

### Existing Data Handling
- Replace `financials.json` and `cap-table.json` completely with Excel-extracted versions
- Segments: Claude preserves entity/segment breakdowns (US/Intl/Muvico/Odeon) wherever they exist in the Excel and it makes analytical sense
- Key naming: Claude decides whether to match existing JSON keys exactly or use new schema — goal is minimize breakage while using sensible names from Excel
- Search index, scenarios.js, definitions.js, link-graph.js: Claude determines if any need updating based on the extraction

### Data Quality
- Round all extracted values to match Excel display precision (1 decimal for $M values)
- Include reconciliation assertions: extracted subtotals must match Excel source totals
- Fail loudly on any mismatch — don't silently produce wrong numbers

### Claude's Discretion
- Whether NWC and D&A sheets get standalone JSON or are folded into DCF/financial data
- Exact JSON schema structure (flat arrays vs nested objects per entity)
- Whether to update search index or other existing data files
- Key naming strategy for backward compatibility vs clean naming
- How to handle cells with formulas that resolve to None/NaN in openpyxl

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `tools/build_search_index.py`: Example of existing Python build script pattern — uses BeautifulSoup, writes to `site/data/`
- `tools/build_research.py`: Another build script — reads Markdown, outputs HTML
- `requirements.txt`: Already includes `openpyxl>=3.1.5` — ready to use

### Established Patterns
- JSON flat-array pattern in `financials.json`: `{ "periods": [...], "admissions": [...], "fnb": [...] }` — periods as label array, values as parallel arrays
- `cap-table.json` uses rich objects with many fields per tranche — different pattern (object-per-entity)
- Data files loaded via `<script>` tags (JS files like `scenarios.js`) or `fetch()` (JSON files like `financials.json`)
- All paths relative to site root or use `data-base` attribute

### Integration Points
- `financials-model.js` reads `financials.json` via fetch with multiple path fallback
- `waterfall-model.js` has hardcoded tranche data (SHOULD read cap-table.json — known tech debt)
- `exchange-model.js` has hardcoded instrument data (same issue)
- New JSON files will be consumed by new model JS modules in Phases 3-4

</code_context>

<specifics>
## Specific Ideas

- "Extract everything" — user wants maximum data availability even if not all sheets get model pages
- Excel is the single source of truth — site should reflect Excel exactly
- Revenue Build quarterly detail is important — full segment breakdown matters for analysis

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-data-extraction*
*Context gathered: 2026-03-23*
