---
phase: 2
slug: shared-utilities
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-23
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Browser console verification + file existence checks |
| **Config file** | none — manual browser verification |
| **Quick run command** | `ls site/js/amc-utils.js site/vendor/chartjs-plugin-annotation.min.js` |
| **Full suite command** | `python3 -m http.server -d site 8080 & sleep 1 && echo "Open http://localhost:8080/models/financials.html and check console for AMC_UTILS"` |
| **Estimated runtime** | ~5 seconds (file checks), ~15 seconds (browser) |

---

## Sampling Rate

- **After every task commit:** Run quick file existence check
- **After every plan wave:** Browser verification of window.AMC_UTILS
- **Before `/gsd:verify-work`:** Full browser check on multi-chart page
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | DATA-04 | integration | `node -e "const fs=require('fs'); const c=fs.readFileSync('site/js/amc-utils.js','utf8'); if(!c.includes('ChartRegistry')|| !c.includes('DataLoader')|| !c.includes('initChartDefaults')) throw 'missing exports'"` | ❌ W0 | ⬜ pending |
| 02-01-02 | 01 | 1 | DATA-05, DATA-06 | integration | `ls site/vendor/chartjs-plugin-annotation.min.js && node -e "const c=require('fs').readFileSync('site/js/amc-utils.js','utf8'); if(!c.includes('Chart.defaults.color')) throw 'no defaults'"` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `site/js/amc-utils.js` — shared utility module
- [ ] `site/vendor/chartjs-plugin-annotation.min.js` — annotation plugin

*Existing infrastructure: Chart.js 4.4.7 already vendored.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Tab switching on financials page produces no double-charts | DATA-04 | Requires browser DOM inspection | Open financials.html, switch IS/BS/CFS tabs rapidly 5 times, verify single chart per canvas |
| Annotation plugin renders correctly | DATA-06 | Requires visual chart inspection | Load a page with annotation, verify line/box renders on chart |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
