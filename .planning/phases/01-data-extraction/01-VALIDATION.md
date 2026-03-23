---
phase: 1
slug: data-extraction
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-23
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Python script assertions + manual JSON inspection |
| **Config file** | none — extraction script has built-in assertions |
| **Quick run command** | `python3 tools/extract_excel.py --validate` |
| **Full suite command** | `python3 tools/extract_excel.py && python3 -c "import json, glob; [json.load(open(f)) for f in glob.glob('site/data/*.json')]"` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `python3 tools/extract_excel.py --validate`
- **After every plan wave:** Run full suite command
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 1 | DATA-01 | integration | `python3 tools/extract_excel.py && ls site/data/*.json` | ❌ W0 | ⬜ pending |
| 01-01-02 | 01 | 1 | DATA-02 | unit | `python3 -c "import json; d=json.load(open('site/data/is.json')); assert all(isinstance(v, (int, float)) for v in d['totalRevenues'][:5])"` | ❌ W0 | ⬜ pending |
| 01-01-03 | 01 | 1 | DATA-03 | integration | `python3 tools/extract_excel.py --validate` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tools/extract_excel.py` — main extraction script with `--validate` flag
- [ ] Reconciliation assertion functions embedded in extraction script

*Existing infrastructure: openpyxl already in requirements.txt.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| JSON values match Excel display | DATA-02 | Requires visual comparison | Open 3 random JSON files, spot-check 5 values against Excel |
| All 30 sheets extracted | DATA-01 | Sheet count verification | Compare `ls site/data/*.json | wc -l` against expected count |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
