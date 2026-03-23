---
phase: 5
slug: dashboard-and-navigation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-23
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Browser inspection + file checks |
| **Config file** | none |
| **Quick run command** | `grep -l 'global-nav' index.html models/dcf.html docs/doc1-covenant-strip.html` |
| **Full suite command** | `grep -rl 'global-nav' *.html docs/*.html models/*.html scenarios/*.html research/*.html | wc -l` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run quick grep for nav presence
- **After every plan wave:** Count pages with nav bar
- **Before `/gsd:verify-work`:** Browser visual check of dashboard + 3 sample pages
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 05-01-01 | 01 | 1 | DASH-01, DASH-02, DASH-03, DASH-04 | integration | `node -e "const f=require('fs').readFileSync('index.html','utf8'); if(!f.includes('kpi')&&!f.includes('heatmap')) throw 'missing dashboard'"` | ❌ W0 | ⬜ pending |
| 05-02-01 | 02 | 1 | NAV-01, NAV-02, NAV-03 | integration | `grep -rl 'global-nav' *.html docs/*.html models/*.html 2>/dev/null \| wc -l` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Dashboard page rewrite (index.html)
- [ ] Nav bar component (in components.js or new nav.js)

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| KPI tiles show correct values from JSON | DASH-01 | Requires browser + data verification | Open index.html, compare KPI values to ufcf.json/cap-table.json |
| Recovery heatmap renders with correct colors | DASH-03 | Visual inspection | Open index.html, verify heatmap matches pf-recovery.html |
| Nav bar works across all page depths | NAV-01 | Path resolution varies by depth | Test nav links from index.html, models/dcf.html, docs/doc1-covenant-strip.html |
| Quick-jump finds pages and terms | NAV-02 | Interactive feature | Open any page, trigger quick-jump, search for "DCF", "waterfall", "covenant" |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
