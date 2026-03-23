# Architecture

**Analysis Date:** 2026-03-23

## Pattern

**Static site with client-side MVC** — no backend server. Data is pre-computed JSON consumed by vanilla JavaScript modules that render interactive financial models.

## Layers

```
┌─────────────────────────────────────────────────┐
│  Presentation Layer (HTML + CSS)                │
│  - Page templates with data attributes          │
│  - CSS custom properties for theming            │
├─────────────────────────────────────────────────┤
│  Component Layer (JS)                           │
│  - components.js (breadcrumbs, keyboard nav)    │
│  - context-panel.js (related docs sidebar)      │
│  - crosslink.js (term hover previews)           │
│  - doc-nav.js (document navigation)             │
├─────────────────────────────────────────────────┤
│  Search & Navigation Layer (JS)                 │
│  - search-engine.js (Lunr.js full-text search)  │
│  - hub-search.js (hub page filtering)           │
├─────────────────────────────────────────────────┤
│  Financial Modeling Layer (JS)                  │
│  - waterfall-model.js (recovery waterfall)      │
│  - leverage-model.js (leverage ratios)          │
│  - pik-model.js (PIK accrual projections)       │
│  - exchange-model.js (conversion values)        │
│  - financials-model.js (IS/BS/CFS charts)       │
├─────────────────────────────────────────────────┤
│  Scenario Engine Layer (JS)                     │
│  - scenario-engine.js (scenario cards/filters)  │
│  - scenario-detail.js (individual scenarios)    │
├─────────────────────────────────────────────────┤
│  Data Layer (JSON/JS)                           │
│  - cap-table.json, financials.json              │
│  - scenarios.js, definitions.js                 │
│  - search-docs.js, link-graph.js                │
└─────────────────────────────────────────────────┘
```

## Four Primary Hubs

1. **Documents Hub** (`site/docs/`) — 7 annotated legal documents (covenant strips, indentures, credit agreements)
2. **Models Hub** (`site/models/`) — 5 interactive financial calculators (waterfall, leverage, PIK, exchange, financials)
3. **Research Hub** (`site/research/`) — 8+ analytical articles generated from Markdown
4. **Scenarios Hub** (`site/scenarios/`) — 12 LME (Liability Management Exercise) strategies

## Data Flow

```
Build Time:
  PDF/HTML docs → Python scripts → JSON/JS data files → git commit

Runtime:
  Browser loads HTML → <script> tags load data files →
  JS modules read window.AMC_* globals →
  Calculate + render charts/tables →
  User interacts (sliders, tabs, filters) →
  Recalculate + re-render
```

## Key Abstractions

### Window Globals (Cross-Module Communication)
- `window.AMC_SCENARIOS` — scenario definitions
- `window.AMC_SEARCH_DOCS` — search index entries
- `window.AMC_LINK_GRAPH` — document cross-reference graph
- `window.AMC_DEFINITIONS` — financial term definitions

### HTML Data Attributes (Page Configuration)
- `data-page` — current page identifier
- `data-base` — base URL for relative paths
- `data-doc` — document number for doc pages

### CSS Custom Properties (Design System)
- Color tokens: `--text`, `--surface`, `--border`, `--blue`, `--yellow`
- Lien colors: `--lien-1l`, `--lien-15l`, `--lien-2l`, `--unsec`
- Spacing: `--space-sm`, `--space-md`, `--space-lg`, `--space-xl`

## Entry Points

| Entry Point | Purpose |
|-------------|---------|
| `site/index.html` | Main dashboard/hub |
| `site/docs/doc*.html` | Individual legal document views |
| `site/models/*.html` | Interactive financial model pages |
| `site/research/*.html` | Research article pages |
| `site/scenarios/*.html` | Scenario detail pages |
| `site/search.html` | Full-text search |

## Progressive Enhancement

- HTML pages render meaningful content without JavaScript
- JavaScript adds interactivity (charts, calculations, search)
- No JavaScript framework — all DOM manipulation is vanilla

---

*Architecture analysis: 2026-03-23*
