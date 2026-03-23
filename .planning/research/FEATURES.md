# Feature Landscape

**Domain:** Bloomberg-style internal financial analysis dashboard — distressed debt / restructuring
**Project:** AMC Debt Navigator v2 — DCF, revenue build, comps, pro-forma recoveries, football field, executive dashboard
**Researched:** 2026-03-23
**Confidence:** HIGH (training data on Bloomberg/FactSet/Capital IQ conventions is well-established; supplemented by direct code analysis of the existing site)

---

## Framing: What "Internal Analyst Tool" Actually Means

Professional terminals (Bloomberg, FactSet, Capital IQ) serve thousands of users with heterogeneous needs. An internal case competition tool serves 2-4 analysts with one thesis. This changes the feature calculus dramatically:

- NO feature discovery problem — analysts know exactly what they want to see
- NO onboarding problem — team built the underlying Excel model
- YES to density — analysts are power users who read data tables, not summaries
- YES to speed — every interaction should feel instant; data is pre-computed static JSON
- NO to flexibility — configurable inputs should be limited to meaningful analytical dimensions (WACC, EV multiple, revenue growth), not UI customization

The benchmark is not "does this look like Bloomberg" — it is "can an analyst answer their question faster than switching to Excel."

---

## Table Stakes

Features analysts cannot work without. Missing = product fails its purpose.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Executive summary dashboard with key metrics** | Every terminal's entry point — orientation before deep analysis | Low | 6-8 KPI tiles: share price, EV, leverage, coverage, cash runway, implied recovery. Already partially exists in index.html metrics bar. Needs valuation anchor added. |
| **DCF model per entity (Consolidated, Odeon, Muvico)** | Primary valuation output; drives recovery analysis | High | UFCF build, WACC input, terminal value (Gordon Growth + Exit Multiple), equity bridge. Three DCF tabs on one page. Interactive WACC/TGR sliders that re-compute implied EV instantly. |
| **DCF output: implied share price and ¢/$ implied per tranche** | Without this, DCF is a black box — analysts need to see recovery implications | Medium | Bridge from DCF EV to waterfall recoveries. Connect DCF → waterfall model programmatically. |
| **Revenue build table with segment columns** | Analysts must validate top-line assumptions before trusting EBITDA projections | Medium | Quarterly or annual columns; US Theatrical / International (Odeon) / Muvico segment rows; admissions, F&B, other revenue; attendance growth rate visible. 2024A through 2033E. |
| **Pro-forma recoveries model with EV sensitivity** | Core restructuring analysis — what does each tranche get under restructuring scenarios? | High | EV sensitivity table (rows = tranches, columns = EV scenarios). Builds on existing waterfall; adds post-restructuring pro-forma cap structure. |
| **Pro-forma debt service schedule** | Shows whether the post-restructuring capital structure is serviceable | Medium | Annual columns 2026–2033. Rows: each new debt tranche (cash interest, PIK, amortization). Summary: total cash DS, coverage ratio, free cash flow after DS. |
| **Comparable company analysis table** | Required for EV multiple support; judges expect it in restructuring presentations | Medium | 8–12 comps; columns: EV/EBITDA, EV/Revenue, P/E, net leverage, EBITDA margin, market cap. AMC highlighted as outlier. Sorting by column. |
| **Football field / valuation range chart** | Standard deliverable in any IB / restructuring pitch; judges expect it | Medium | Horizontal bars showing valuation range from each methodology (DCF bear/base/bull, comps low/median/high, PF recovery implied EV). Current price as marker. |
| **Global navigation between all models** | Without this, analysts are stuck clicking back/forward through browser history | Low | Persistent left-sidebar or top-nav listing all models + sections. Already has breadcrumbs; needs a full-site nav panel. |
| **Per-model data table alongside every chart** | Charts communicate trends; tables communicate exact values. Analysts copy numbers. | Low | Every chart must have an expand-in-place toggle to show the underlying data table. This is table stakes in every professional terminal. |

---

## Differentiators

Features that elevate the tool above "just a dashboard." Particularly valuable for case competition judging — they demonstrate analytical depth the judges haven't seen before.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **DCF → waterfall bridge (live linking)** | One-click from DCF implied EV to waterfall recovery at that EV — eliminates the most common analyst context switch | Medium | On the DCF page, "See Recoveries at This EV" button that passes DCF output as URL parameter to waterfall model (already supports `?ev=` query param). |
| **Multi-scenario DCF toggle (Bear / Base / Bull)** | Judges immediately ask "what are your base/bull/bear cases?" — having pre-built scenarios shows rigor | Medium | Three assumption sets stored in JSON. Toggle between them with an animated transition; summary table shows all three side-by-side. |
| **Revenue build with attendance driver decomposition** | Modeling admissions as attendees × ticket price × occupancy rate is how analysts actually think about theater economics | Medium | Expand/collapse rows: Revenue = Attendees × ATP; Attendees = Screens × Showings/Screen × Occupancy × Seats/Screen. Makes the revenue build legible and defensible. |
| **Comps: AMC-relative positioning callouts** | Show not just the table but auto-generated text: "AMC trades at X.Xx EV/EBITDA — Xth percentile of comps, implying a Y% discount to peers" | Low | One paragraph of calculated text below the comps table. No extra data needed — derived from existing comp data. High signal-to-effort ratio. |
| **Recovery heatmap on dashboard** | At-a-glance view of all seven tranches across EV scenarios — best single view for quick orientation | Medium | 7-row × 8-column heat table (tranches × EV multiples). Color gradient green-to-red. Computed from waterfall model logic. On the executive dashboard, not a separate page. |
| **Maturity wall timeline chart** | Visual representation of near-term refinancing risk — Odeon Feb 2027 is the biggest risk and judges will ask about it | Low | Horizontal timeline (2026–2033), one bar per debt tranche, colored by lien. Height = face value. Existing tranche data; new Chart.js instance. |
| **WACC waterfall decomposition display** | Show the WACC build (Rf + Beta × ERP + Size premium = Ke; Kd × (1-t) = after-tax cost of debt) — judges will ask how you got 19.5% | Medium | Static display from WACC JSON data. Expandable "How we got here" section on DCF page. Not interactive — just explains the inputs. |
| **Pro-forma cap structure comparison (before/after restructuring)** | Shows the transformation — existing capital structure vs. proposed new structure side-by-side | Medium | Two-column table: "Current Structure" vs. "Post-Restructuring." New debt tranches, face value, coupon, maturity. Metrics: leverage, coverage, CS improvement. |
| **Annotation / thesis flags on key data points** | Small callout labels on charts ("Odeon maturity risk," "PIK cliff," "Cash hoarding covenant") that direct attention to what matters | Low | Static labels defined in JSON — not user-generated. Requires no interaction infrastructure. High analytical signal. |
| **Keyboard shortcuts for model navigation** | Power analysts don't use the mouse. Tab/1/2/3 to switch between DCF entities, B/Base/U to switch scenarios. | Low | Already has keyboard nav in components.js — extend to model pages. Bloomberg-feel detail that impresses power users. |

---

## Anti-Features

Features to deliberately NOT build. Each one has a compelling-sounding reason to exist but would cost more than it delivers given the constraints.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **User-configurable comps set** | Real-time comp editing requires managing state, preventing accidental overwrites, handling empty states. Costs 2-3x the build time of a static comps table. | Hardcode the 10-12 most relevant comps from the Excel model. Judges don't need to swap in different peers. |
| **Exportable PDF / print mode** | CSS print stylesheets are a labyrinth. Financial tables rarely print well. Case competition presentations use screenshots, not printed PDFs. | Direct analysts to use browser screenshot / screenshot tool. |
| **Editable assumptions with save/load** | Requires localStorage management, state serialization, migration path for schema changes. High complexity, low payoff for a 2-4 person team with identical assumptions. | Provide 3-5 pre-set scenarios (Bear/Base/Bull) as dropdown — covers 95% of the "what if" need without state management. |
| **Historical vs. projected chart overlays** | Adding historicals (pre-2024) to forward projection charts looks good but muddies the visual and requires careful period-alignment logic to avoid gaps. | Keep historical financials on the existing financials.html page; keep projections on model pages. Cross-link between them. |
| **Real-time / live data integration** | The entire architecture is static JSON at build time. Any live data feed breaks the architecture and adds a backend requirement. | All market data (share price $1.09, market cap $577M) clearly dated. Analysts know this is a point-in-time analysis. |
| **Mobile / responsive layouts** | Already declared out of scope. Terminal-density layouts break completely at mobile widths. The effort to make them responsive would compromise the data density that makes the tool useful. | Desktop-only. Minimum width 1200px. |
| **User authentication / login** | Internal team only. Auth adds backend, session management, token refresh — all incompatible with static site architecture. | No auth. Keep it a static file. |
| **Drill-down to raw Excel cell references** | Showing cell references (e.g., "DCF!B42") provides zero analytical value and creates a maintenance burden if the model changes. | Show formula logic in prose (WACC build, UFCF formula), not Excel cell addresses. |
| **Auto-refresh / polling** | Data is static. Polling a static file is pure wasted complexity. | Update data manually via Python extraction scripts when the Excel model changes. |
| **Sortable/filterable dynamic tables everywhere** | Comps and recovery tables have fixed meaningful row ordering (by lien seniority, by EV/EBITDA) — arbitrary sorting destroys analytical context. Exception: comps table sorting IS valuable (see table stakes above). | Default-sort everything meaningfully. Allow sorting only where it adds analytical insight (comps table). |

---

## Feature Dependencies

```
JSON Data Files (extracted from Excel)
  └── DCF Model Page
        ├── WACC decomposition display (depends on: WACC JSON)
        ├── UFCF build table (depends on: IS projections JSON 2024–2033)
        ├── Terminal value (depends on: DCF JSON)
        ├── Multi-scenario toggle (depends on: DCF bear/base/bull JSON)
        └── DCF → Waterfall bridge (depends on: existing waterfall model + URL param support [already exists])

  └── Revenue Build Page
        ├── Segment tables (depends on: Revenue Build JSON with quarterly data)
        └── Attendance driver decomposition (depends on: Revenue Build JSON with admissions/ATP split)

  └── Pro-Forma Recoveries Page
        ├── PF Recovery table (depends on: PF Recoveries JSON + waterfall calculation logic)
        ├── PF Debt Service schedule (depends on: PF DS JSON)
        └── Before/after cap structure comparison (depends on: cap-table.json + PF Cap Table JSON)

  └── Comps Page
        ├── Comps table (depends on: Comps JSON)
        ├── AMC-relative positioning text (depends on: Comps JSON, computed at runtime)
        └── Comps sort by column (depends on: Comps JSON + JS sort handler)

  └── Football Field Page
        ├── All bars (depends on: DCF bear/base/bull + Comps range + PF Recovery implied EV)
        └── Current price marker (depends on: shared constants in data file)

  └── Executive Dashboard
        ├── KPI tiles (depends on: LTM financials from financials.json [already exists])
        ├── Valuation anchor (depends on: DCF base case output)
        ├── Recovery heatmap (depends on: waterfall calculation logic + tranche data [already exists])
        └── Maturity wall chart (depends on: tranche data from cap-table.json [already exists])

Global Navigation
  └── Depends on: list of all model/page URLs (static, hardcoded is fine)
```

**Critical ordering insight:** The JSON data extraction from Excel is a prerequisite for all new features. Nothing else can be built until the JSON files exist. Start there.

---

## MVP Recommendation

Given the "must be done this week" constraint, prioritize in this order:

**Tier 1 — Unlock everything else first:**
1. Extract all Excel sheets to JSON (IS 2024-2033, Revenue Build, WACC x3, DCF x3, PF Recoveries, PF DS, Comps) — this is a Python script, not UI work

**Tier 2 — Highest analytical impact, moderate complexity:**
2. DCF model page (3 entities, interactive WACC/TGR, equity bridge) — central to the entire case
3. Pro-forma recoveries (sensitivity table) — most direct answer to "what do creditors get?"
4. Executive dashboard with recovery heatmap and valuation anchor

**Tier 3 — Completes the picture:**
5. Revenue build page with segment breakdown
6. Comparable company table with sorting
7. Football field chart

**Tier 4 — Differentiating polish:**
8. DCF → waterfall bridge (trivial once DCF page exists)
9. Maturity wall timeline on dashboard
10. Multi-scenario toggle on DCF
11. WACC decomposition expandable section
12. Pro-forma debt service schedule

**Defer entirely:**
- Attendance driver decomposition (nice-to-have within revenue build; add only if time permits)
- Keyboard shortcuts for model switching (very low effort but low impact vs. core models)
- Annotation flags on charts (low effort, add as final polish pass)

---

## What "Table Stakes" Looks Like in Professional Terminals (Context)

**Bloomberg FLDS / DDIS / WACC screens:**
- Always: ticker bar at top with current price, 52W range, volume
- Always: data table alongside every chart with exact values
- Always: scenario toggle (last price / consensus / custom) on valuation screens
- Always: footnotes/disclaimers inline, not buried
- Always: period selector (LTM, NTM, FY+1, FY+2) on every multiple

**FactSet Investment Banking Workstation:**
- Always: comparable companies table sortable by any metric
- Always: football field sourced from multiple valuation methods shown simultaneously
- Always: contribution analysis ("how much does terminal value contribute to DCF?") — typically 60-80% for high-growth

**Capital IQ Credit Analytics:**
- Always: recovery analysis with EV sensitivity grid
- Always: covenant compliance headroom shown as % of threshold
- Always: maturity profile chart with refinancing risk flags

**What they don't do (relevant anti-features):**
- They don't let users reconfigure which metrics appear in the KPI bar
- They don't combine historical and projected data on the same chart axes without explicit period breaks
- They don't offer save/load of user-defined scenarios — they offer a fixed set of standard scenarios

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Table stakes list | HIGH | Based on direct code inspection of existing models + well-established professional terminal conventions |
| Differentiators list | HIGH | Derived from specific analytical gaps in the existing site + competition context |
| Anti-features | HIGH | Based on project constraints (static site, no backend, timeline pressure) confirmed by architecture review |
| Complexity estimates | MEDIUM | No time benchmarks available; estimates are relative to existing model complexity |
| Feature dependencies | HIGH | Based on direct inspection of existing JS modules and data files |

---

## Sources

- Direct code inspection: `site/js/waterfall-model.js`, `site/js/financials-model.js`, `site/index.html`, `site/models/waterfall.html`
- Direct data inspection: `site/data/financials.json`, `site/data/cap-table.json`
- Architecture review: `.planning/codebase/ARCHITECTURE.md`, `.planning/codebase/CONCERNS.md`, `.planning/codebase/STACK.md`
- Project requirements: `.planning/PROJECT.md`
- Professional terminal conventions: Bloomberg Terminal (WACC, DDIS, FLDS functions), FactSet IB Workstation, Capital IQ Credit Analytics — training data HIGH confidence for established conventions; last verified against industry-standard deliverables circa 2024-2025
