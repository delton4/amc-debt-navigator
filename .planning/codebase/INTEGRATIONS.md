# External Integrations

**Analysis Date:** 2026-03-23

## Overview

This is a **fully self-contained static site** with **no external API integrations**, no database connections, no authentication, and no third-party webhooks. All data is baked into JSON files at build time.

## External Services

| Category | Status |
|----------|--------|
| External APIs | None |
| Databases | None |
| Authentication | None |
| Webhooks | None |
| Analytics | None |
| CDN | None (all assets self-hosted) |
| Payment | None |

## Data Sources (Build-Time Only)

Data is processed offline by Python build scripts and output as static JSON/JS:

| Source | Build Script | Output |
|--------|-------------|--------|
| Legal documents (PDF/HTML) | `tools/build_search_index.py` | `data/search-docs.js` |
| Research articles (Markdown) | `tools/build_research.py` | `site/research/*.html` |
| Financial statements | Manual entry | `data/financials.json` |
| Capital table | Manual entry | `data/cap-table.json` |
| Scenario definitions | Manual entry | `data/scenarios.js` |
| Term definitions | Manual entry | `data/definitions.js` |
| Cross-reference graph | `tools/build_search_index.py` | `data/link-graph.js` |

## Deployment

- **Platform:** GitHub Pages (static file hosting)
- **Build process:** Run Python scripts locally, commit output, push
- **No CI/CD pipeline configured**

## Local Development Tools

| Tool | Purpose |
|------|---------|
| Ollama + DeepSeek R1 14B | Local AI research assistant (see `tools/ollama_research.py`) |
| Python HTTP server | Local preview (`python3 -m http.server`) |

---

*Integration analysis: 2026-03-23*
