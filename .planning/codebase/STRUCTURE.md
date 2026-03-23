# Directory Structure

**Analysis Date:** 2026-03-23

## Top-Level Layout

```
site/
├── index.html                  # Main hub/dashboard
├── search.html                 # Full-text search page
├── css/
│   ├── theme.css               # Design system (colors, typography)
│   └── layout.css              # Page layout, grid, responsive
├── js/
│   ├── components.js           # Shared: breadcrumbs, keyboard shortcuts
│   ├── context-panel.js        # Right sidebar: related docs/terms
│   ├── crosslink.js            # Term hover previews
│   ├── doc-nav.js              # Document page navigation
│   ├── hub-search.js           # Hub page filtering
│   ├── search-engine.js        # Lunr.js search integration
│   ├── scenario-engine.js      # Scenario cards and filtering
│   ├── scenario-detail.js      # Individual scenario page logic
│   ├── waterfall-model.js      # Recovery waterfall calculator
│   ├── leverage-model.js       # Leverage ratio model
│   ├── pik-model.js            # PIK accrual projections
│   ├── exchange-model.js       # Conversion value calculator
│   └── financials-model.js     # IS/BS/CFS charts and tables
├── data/
│   ├── cap-table.json          # Capital structure (tranches, rates)
│   ├── financials.json         # Financial statements (IS, BS, CFS)
│   ├── scenarios.js            # 12 LME scenario definitions
│   ├── definitions.js          # Financial term glossary
│   ├── search-docs.js          # Full-text search index (~2.3MB)
│   └── link-graph.js           # Document cross-reference graph
├── vendor/
│   ├── chart.min.js            # Chart.js (vendored)
│   └── lunr.min.js             # Lunr.js (vendored)
├── docs/
│   ├── doc1-covenant-strip.html
│   ├── doc2-second-lien.html
│   ├── doc3-odeon-notes.html
│   ├── doc4-credit-agreement.html
│   ├── doc5-muvico-exchangeable.html
│   ├── doc6-odeon-secured.html
│   └── doc7-exchangeable-notes.html
├── models/
│   ├── waterfall.html          # Recovery waterfall
│   ├── leverage.html           # Leverage model
│   ├── pik-projector.html      # PIK accrual projector
│   ├── exchange.html           # Exchange/conversion model
│   └── financials.html         # Financial statements
├── research/
│   └── *.html                  # Generated from Markdown articles
├── scenarios/
│   └── *.html                  # Individual scenario pages
└── images/
    └── *.png                   # Logos, icons
```

## Build Tools (outside `site/`)

```
tools/
├── ollama_research.py          # Local AI research assistant
├── build_search_index.py       # Generate search-docs.js from HTML
├── build_research.py           # Convert Markdown articles to HTML
└── parse_documents.py          # PDF/HTML document processing

research/
└── *.md                        # Source Markdown for research articles

requirements.txt                # Python build dependencies
CLAUDE.md                       # AI assistant instructions
```

## Naming Conventions

| Category | Convention | Example |
|----------|-----------|---------|
| JS modules | kebab-case | `waterfall-model.js` |
| Python scripts | snake_case | `build_search_index.py` |
| HTML pages | kebab-case with doc prefix | `doc1-covenant-strip.html` |
| CSS files | kebab-case | `theme.css`, `layout.css` |
| Data files | kebab-case | `cap-table.json` |
| JSON keys | camelCase | `"cashRate"`, `"waterfallRank"` |

## Key Locations

| What | Where |
|------|-------|
| Design system tokens | `site/css/theme.css` |
| Page layout | `site/css/layout.css` |
| Shared components | `site/js/components.js` |
| Financial data | `site/data/financials.json` |
| Capital structure | `site/data/cap-table.json` |
| Search index | `site/data/search-docs.js` |
| Vendored libs | `site/vendor/` |

## Where to Add New Code

| Adding | Location | Pattern |
|--------|----------|---------|
| New model page | `site/models/new-model.html` + `site/js/new-model.js` | Copy existing model pattern |
| New data file | `site/data/new-data.json` | JSON consumed via fetch or script tag |
| New document | `site/docs/doc8-name.html` | Follow doc template structure |
| New research article | `research/new-article.md` → run `build_research.py` | Markdown source |
| New scenario | Add entry to `site/data/scenarios.js` | Follow existing object structure |
| New CSS component | Add section to `site/css/theme.css` or `layout.css` | Use CSS custom properties |

---

*Structure analysis: 2026-03-23*
