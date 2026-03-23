# AMC Debt Navigator — v2 Upgrade

## What This Is

An internal Bloomberg-style web tool for a small team (2-4 analysts) to explore AMC Entertainment's capital structure, debt documents, financial projections, and restructuring scenarios. Currently a static site with 5 interactive models and 7 annotated legal documents. This upgrade incorporates a comprehensive Excel model (`AMC BRx.xlsx`) with DCF valuations, revenue builds, pro-forma recoveries, comps, and segment-level projections through 2033 — turning a spreadsheet into a navigable, interactive analysis platform.

## Core Value

Eliminate context-switching between Excel and the site — every number, every model, every scenario explorable from one place with a polished Bloomberg terminal aesthetic.

## Requirements

### Validated

- ✓ 7 annotated legal documents with section navigation — existing
- ✓ Recovery waterfall model (consolidated + Muvico) — existing
- ✓ Leverage ratio model — existing
- ✓ PIK accrual projector — existing
- ✓ Exchange/conversion calculator — existing
- ✓ Financial statements (IS/BS/CFS) with Chart.js charts — existing
- ✓ Full-text search across all documents (Lunr.js) — existing
- ✓ 12 LME scenario cards with filtering — existing
- ✓ 8+ research articles — existing
- ✓ Cross-document term linking and definitions — existing
- ✓ Dark theme with financial color coding — existing

### Active

- [ ] Executive dashboard with valuation summary, capital structure overview, recovery heatmap, and key financial sparklines
- [ ] DCF valuation models (Consolidated, Odeon, Muvico) with UFCF, WACC, terminal value — interactive assumptions
- [ ] Revenue build visualization — quarterly projections by segment (US/Intl/Muvico) through 2033
- [ ] Pro-forma recoveries model — restructuring outcome analysis with interactive EV scenarios
- [ ] Pro-forma debt service schedule visualization
- [ ] Comparable company analysis display with key multiples
- [ ] Odeon football field valuation chart
- [ ] Improved site navigation — global nav, breadcrumbs, quick-jump between all sections
- [ ] Bloomberg/Reuters terminal polish — refined typography, tighter spacing, data-dense layouts, smooth transitions
- [ ] Import all Excel data into site JSON data files (IS projections to 2033, BS, CFS, NWC, D&A, WACC, Cap Table, Recoveries, PF Recoveries, PF DS, DS, Comps, Revenue Build)

### Out of Scope

- Mobile optimization — this is a desktop analyst tool
- User authentication — internal team only
- Real-time data feeds — all data baked from Excel at build time
- Backend/database — remains a static site
- Editing/saving — read-only analysis tool

## Context

- **Existing codebase:** Static site with vanilla JS (IIFE pattern), Chart.js, Lunr.js, CSS custom properties
- **Data source:** `AMC BRx.xlsx` — 30 sheets including IS/BS/CFS (2016-2033 projections), Revenue Build (quarterly by segment), WACC (3 entities), DCF (3 entities), Recoveries, PF Recoveries, PF Debt Service, Cap Table, Comps
- **Team:** Small group of analysts at BRx for Spring 2026 Case Competition
- **Key financial data points:** Share price $1.09, Market Cap $577M, Total Debt ~$4B, WACC ~19.5%, Revenue projections $4.8B (2025) → $6.1B (2030)
- **Codebase map:** `.planning/codebase/` contains full architecture and structure documentation

## Constraints

- **Timeline:** Must be done this week — prioritize highest-impact changes
- **Tech stack:** Keep vanilla JS + Chart.js + static site architecture — no frameworks, no build tools
- **Data format:** Extract Excel data into JSON consumed by client-side JS modules
- **Browser:** Chrome desktop — no cross-browser or mobile concerns
- **Backward compatibility:** Don't break existing document viewer, search, or scenario features

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Keep static site architecture | No time to introduce frameworks; existing pattern works | — Pending |
| Bloomberg terminal aesthetic | Team preference; data-dense, professional, dark theme | — Pending |
| Interactive DCF + PF Recoveries, display-only for others | Balance interactivity vs. timeline pressure | — Pending |
| Extract all Excel data to JSON | Single source of truth, consumed by multiple models | — Pending |

---
*Last updated: 2026-03-23 after initialization*
