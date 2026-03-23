# Technology Stack

**Analysis Date:** 2026-03-23

## Languages

| Language | Usage | Files |
|----------|-------|-------|
| JavaScript (ES5) | Client-side interactive models, search, UI | `site/js/*.js` (~15 files) |
| Python 3 | Build scripts, data processing, document parsing | `tools/*.py`, `site/tools/*.py` |
| HTML5 | Page templates, document views | `site/*.html`, `site/docs/*.html`, `site/models/*.html` |
| CSS3 | Theming, layout, responsive design | `site/css/*.css` |
| JSON | Structured data (financials, cap table, scenarios) | `site/data/*.json` |

## Runtime

- **Client:** Browser-only, no Node.js runtime required
- **Build:** Python 3.x for offline document processing and search index generation
- **Deployment:** Static files served via GitHub Pages (no server)

## Frameworks & Libraries

### Client-Side (vendored, no package manager)
| Library | Version | Purpose | Location |
|---------|---------|---------|----------|
| Chart.js | vendored | Financial charts (bar, line, doughnut) | `site/vendor/chart.min.js` |
| Lunr.js | vendored | Full-text search index | `site/vendor/lunr.min.js` |

### Python Build Dependencies (`requirements.txt`)
| Package | Version | Purpose |
|---------|---------|---------|
| PyMuPDF | >=1.24.0 | PDF text extraction |
| pytesseract | >=0.3.10 | OCR for scanned documents |
| Pillow | >=10.0.0 | Image processing |
| beautifulsoup4 | >=4.12.0 | HTML parsing and transformation |
| requests | >=2.28.0 | HTTP requests |
| openpyxl | >=3.1.5 | Excel file processing |
| markdown | (imported) | Markdown-to-HTML conversion |

## Package Management

- **No npm/yarn/pnpm** — all JS libraries vendored in `site/vendor/`
- **No bundler** (webpack, vite, etc.) — raw script tags in HTML
- **Python:** `pip install -r requirements.txt` for build tools only

## Configuration

- **No `.env` files** — no environment variables used
- **No build configuration** (no `webpack.config.js`, `vite.config.js`, etc.)
- **CSS custom properties** in `site/css/theme.css` define the entire design system
- **Data-driven configuration** via JSON files in `site/data/`

## Key Architectural Choices

1. **Zero-dependency client-side** — only Chart.js and Lunr.js vendored
2. **No transpilation** — ES5 JavaScript runs directly in browsers
3. **IIFE module pattern** — each JS file is a self-contained module
4. **Static-first** — all data baked into JSON at build time, no runtime API calls
5. **CSS custom properties** for theming — dark theme with financial color coding

---

*Stack analysis: 2026-03-23*
