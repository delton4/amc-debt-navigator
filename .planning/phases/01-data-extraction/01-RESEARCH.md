# Phase 1: Data Extraction - Research

**Researched:** 2026-03-23
**Domain:** Python / openpyxl Excel-to-JSON extraction
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Extract ALL 30 sheets from `AMC BRx.xlsx`
- For paired sheets (IS Reformat / IS, BS Reformat / BS, CFS Reformat / CFS): use the non-Reformat tabs (IS, BS, CFS) — they have projections
- Revenue Build: extract full quarterly detail (1407 rows x 56 columns) — maximum granularity
- One JSON file per Excel sheet, kebab-case filenames matching sheet names
- Replace existing `financials.json` and `cap-table.json` entirely — Excel is single source of truth
- All files go in `site/data/`
- Time range: 2019–2033 (exclude 2016–2018 data)
- Flag actual vs projected years in JSON (`"isProjected"` boolean array or `"projectedStart"` integer)
- Revenue Build: quarterly granularity; all other sheets: annual granularity only
- Round all extracted values to match Excel display precision (parse `number_format`)
- Include reconciliation assertions: extracted subtotals must match Excel source totals
- Fail loudly (raise, don't silently continue) on any mismatch

### Claude's Discretion
- Whether NWC and D&A sheets get standalone JSON or are folded into DCF/financial data
- Exact JSON schema structure (flat arrays vs nested objects per entity)
- Whether to update search index or other existing data files
- Key naming strategy for backward compatibility vs clean naming
- How to handle cells with formulas that resolve to None/NaN in openpyxl

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| DATA-01 | Python extraction script converts all relevant Excel sheets to structured JSON files | Sheet inventory confirmed (30 sheets), openpyxl 3.1.5 already installed, output path `site/data/` established |
| DATA-02 | Extracted values rounded to match Excel display precision (no floating-point artifacts) | `number_format` on cells gives `#,##0` (0 dp), `#,##0.0` (1 dp), `0%`, `0.00%` etc — parseable with regex |
| DATA-03 | Extraction script includes reconciliation assertions (extracted totals match Excel source) | IS: Gross = Sales+COGS, EBIT = Gross+SGA; BS: Total Assets = Total Liabilities + Total Equity — verified numerically |
</phase_requirements>

---

## Summary

The extraction target is `AMC BRx.xlsx` (in the project root, not `site/`) containing exactly 30 sheets. The sheet inventory is fully confirmed. The non-Reformat financial statements (IS, BS, CFS) contain projections through 2033; the Reformat variants stop at 2025 and are intentionally excluded as source of truth. openpyxl 3.1.5 is already installed. Loading with `data_only=True` resolves all formula cells correctly — no formulas return as strings, all projected numeric cells have their computed float values available.

The primary technical challenge is precision: projected cells carry raw Python floats (e.g., `5251.583318644179`) but the Excel format `#,##0` means display as a whole number. The fix is to read `cell.number_format`, extract decimal places via regex, and call `round(value, decimals)` before writing to JSON. Integer-formatted values (0 dp) round to 1 decimal precision when the raw float already has a `.1` term (e.g., `3911.4` stays `3911.4` — round(x, 0) would incorrectly make it `3911.0`; the correct approach is `round(x, 1)` for `#,##0.0` formats or preserving the existing decimal for `#,##0` formats that already have clean 1-decimal values). The safest approach: use the number_format to determine display decimal places, then round to that many decimals — returning a float, not an int.

The Revenue Build sheet has a column labeling anomaly: quarterly sub-headers repeat labels (`2022Q1`, `2027Q1`) across different annual groups. The correct quarterly period strings must be inferred from position: annual columns at positions 4, 9, 14, 19, 24, 29, 34, 39, 44, 49, 54 anchor the year, and the four preceding quarterly columns belong to that year. This requires positional logic, not trusting the raw header string.

**Primary recommendation:** Write a single `tools/extract_excel.py` script that loads `AMC BRx.xlsx` with `data_only=True`, iterates all 30 sheets with per-sheet extraction logic, writes one JSON file per sheet to `site/data/`, and runs reconciliation assertions at the end with `assert` or explicit `raise` on mismatch.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| openpyxl | 3.1.5 (installed) | Read `.xlsx` workbooks, access cell values + number_format | Only pure-Python xlsx reader with full `data_only` formula resolution; already in requirements.txt |
| json (stdlib) | Python 3 built-in | Serialize output | No dependency overhead |
| re (stdlib) | Python 3 built-in | Parse `number_format` strings for decimal places | Lightweight, sufficient |
| os / pathlib (stdlib) | Python 3 built-in | Construct output paths relative to script | No dependency needed |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| math (stdlib) | Python 3 built-in | `math.isnan()`, `math.isinf()` checks | Sanitize cells that hold NaN sentinel floats |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| openpyxl data_only=True | xlrd | xlrd dropped xlsx support in v2.0; openpyxl is the standard |
| openpyxl data_only=True | pandas read_excel | pandas adds ~40MB dependency; also masks number_format access; overkill for structured extraction |
| Hand-rolled number_format parser | openpyxl NumberFormat | openpyxl's internal NumberFormat class is private/unstable; regex on the format string is simpler and sufficient |

**Installation:** No new installs needed. openpyxl 3.1.5 is already in `requirements.txt` and installed.

---

## Excel File: Confirmed Sheet Inventory

The file is at `/path/to/project/AMC BRx.xlsx` (project root, NOT inside `site/`).

| # | Sheet Name | JSON Output | Max Row | Max Col | Notes |
|---|-----------|-------------|---------|---------|-------|
| 1 | Cover | `cover.json` | — | — | No data rows; may produce empty/minimal JSON |
| 2 | IS Reformat | SKIP | 44 | 12 | Actuals only (2016–2025), no projections; IS is source of truth |
| 3 | IS | `is.json` | 70 | 20 | **2016–2033**; exclude cols 3–5 (2016–2018); projections start col 13 (2026) |
| 4 | BS Reformat | SKIP | 76 | 12 | Actuals only; BS is source of truth |
| 5 | BS | `bs.json` | 76 | 16 | **2016–2025** only (no projection columns populated); exclude 2016–2018 |
| 6 | CFS Reformat | SKIP | 59 | 12 | Actuals only; CFS is source of truth |
| 7 | CFS | `cfs.json` | 59 | 12 | **2016–2025** only; exclude 2016–2018 |
| 8 | NWC | `nwc.json` | 25 | 17 | **2020–2025** actuals (no projections populated) |
| 9 | D&A & CapEx | `da-capex.json` | 21 | 14 | **2022–2031** (mix of actuals + projections) |
| 10 | Revenue Build | `revenue-build.json` | 1407 | 56 | Quarterly detail; complex column mapping required |
| 11 | WACC | `wacc.json` | 26 | 11 | WACC components + EV sensitivity grid |
| 12 | UFCF | `ufcf.json` | 37 | 14 | DCF projections + exit multiple sensitivity grid (rows 17–27, cols 5–13) |
| 13 | Odeon IS | `odeon-is.json` | 32 | 24 | 2018FY–2025FY actuals + projections |
| 14 | WACC Odeon | `wacc-odeon.json` | ~26 | ~11 | Odeon-specific WACC |
| 15 | Odeon D&A & CapEX | `odeon-da-capex.json` | 8 | 17 | 2022–2031 |
| 16 | Odeon DCF | `odeon-dcf.json` | 33 | 22 | 2026e–2035e projections |
| 17 | Muvico IS | `muvico-is.json` | 82 | 22 | Q3 2024 through 2030+ (quarterly then annual) |
| 18 | Muvico WACC | `muvico-wacc.json` | ~26 | ~11 | Muvico-specific WACC |
| 19 | Muvico D&A & CapEx | `muvico-da-capex.json` | 8 | 15 | 2024FY–2031 |
| 20 | Muvico DCF | `muvico-dcf.json` | 33 | 13 | 2026e–2033e projections |
| 21 | Valuation | `valuation.json` | 27 | 6 | AMC, Odeon, Muvico implied EV tables |
| 22 | Recoveries | `recoveries.json` | 68 | 32 | Current cap table + waterfall recovery % by EV scenario |
| 23 | PF Recoveries | `pf-recoveries.json` | 76 | 34 | Pro-forma restructured cap table + waterfall |
| 24 | PF DS | `pf-ds.json` | 134 | 11 | Pro-forma debt service 2026–2032+ |
| 25 | DS | `ds.json` | 106 | 11 | Current debt service 2026–2030+ |
| 26 | Cap Table | `cap-table.json` | 48 | 27 | Muvico + Odeon + AMC tranches; replaces existing |
| 27 | Liq Roll Frwd PF | `liq-roll-fwd-pf.json` | 43 | 9 | Pro-forma liquidity roll forward 2026–2032 |
| 28 | Liq Roll Frwd | `liq-roll-fwd.json` | 43 | 7 | Current liquidity roll forward 2026–2030 |
| 29 | Odeon Football field | `odeon-football-field.json` | 20 | 5 | Football field valuation ranges |
| 30 | Comps | `comps.json` | 25 | 20 | 5 comparable companies + statistics |

**Sheets to SKIP (excluded from extraction):** IS Reformat, BS Reformat, CFS Reformat. These have no projection data and the non-Reformat versions are the declared source of truth.

**Cover sheet:** Produces minimal JSON (empty or metadata-only) — no data rows found.

---

## Architecture Patterns

### Recommended Project Structure
```
tools/
└── extract_excel.py        # single extraction script
site/data/
├── is.json                 # income statement
├── bs.json                 # balance sheet
├── cfs.json                # cash flow statement
├── nwc.json                # net working capital
├── da-capex.json           # D&A and CapEx
├── revenue-build.json      # quarterly revenue detail
├── wacc.json               # consolidated WACC + sensitivity
├── ufcf.json               # UFCF DCF + sensitivity grid
├── odeon-is.json
├── wacc-odeon.json
├── odeon-da-capex.json
├── odeon-dcf.json
├── muvico-is.json
├── muvico-wacc.json
├── muvico-da-capex.json
├── muvico-dcf.json
├── valuation.json
├── recoveries.json
├── pf-recoveries.json
├── pf-ds.json
├── ds.json
├── cap-table.json          # replaces existing
├── liq-roll-fwd-pf.json
├── liq-roll-fwd.json
├── odeon-football-field.json
└── comps.json
```

### Pattern 1: Flat-Array Schema (primary financial sheets)
**What:** Periods as label array + parallel value arrays, matching the existing `financials.json` pattern.
**When to use:** IS, BS, CFS, NWC, D&A sheets — any sheet with a time-series column structure.
**Example:**
```python
# Source: existing financials.json + site/scripts/export_financials.py
{
  "periods": ["2019", "2020", "2021", "2022", "2023", "2024", "2025",
               "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033"],
  "isProjected": [false, false, false, false, false, false, false,
                  true, true, true, true, true, true, true, true],
  "projectedStart": 2026,
  "sales": [5471.0, 1242.4, 2527.9, 3911.4, 4812.6, 4637.2, 4848.9,
             5251.6, 5454.7, 5800.6, 5918.8, 6111.5, 6252.0, 6395.8, 6542.9],
  "cogs": [...],
  ...
}
```

### Pattern 2: Row-Object Schema (cap table, comps)
**What:** Array of objects, one per row entity — mirrors existing `cap-table.json`.
**When to use:** Cap Table, Comps, Valuation, Recoveries — sparse data where each row is a named entity.
**Example:**
```python
# Source: existing cap-table.json (site/data/cap-table.json)
{
  "tranches": [
    {
      "entity": "muvico",
      "lien": "1L",
      "name": "$2bn 2029 TL",
      "face": 1999.1,
      "price": 82.0,
      "market": 1639.3,
      "coupon": "SOFR + 700",
      "cashInterest": 212.7,
      "maturity": "2029-01-01"
    }
    ...
  ]
}
```

### Pattern 3: Sensitivity Grid Schema (UFCF, WACC)
**What:** 2D grid object for EV sensitivity tables — rows are one axis, columns another.
**When to use:** UFCF rows 17–27 (exit multiple × WACC → EV), Odeon/Muvico DCF sensitivity.
**Example:**
```python
# Source: UFCF sheet rows 16-27 inspection
{
  "exitMultipleWaccGrid": {
    "waccAxis": [0.1072, 0.1022, 0.0972, 0.0922, 0.0872, 0.0822, 0.0772, 0.0722],
    "exitMultipleAxis": [8.5, 8.0, 7.5, 7.0, 6.5, 6.0, 5.5, 5.0, 4.5, 4.0],
    "evGrid": [
      [4592.7, 4679.2, 4767.8, 4858.6, 4951.7, 5047.1, 5144.8, 5245.1],
      ...
    ]
  }
}
```

### Pattern 4: Revenue Build Quarterly Schema
**What:** Quarters AND annual totals in the same structure, with period labels corrected for column-position logic.
**When to use:** Revenue Build exclusively.
```python
# Column position → period label mapping (corrected, not from raw header)
# col 4 = 2020 (annual)
# cols 5-8 = 2021Q1-Q4, col 9 = 2021
# cols 10-13 = 2022Q1-Q4, col 14 = 2022
# cols 15-18 = 2023Q1-Q4, col 19 = 2023
# cols 20-23 = 2024Q1-Q4, col 24 = 2024
# cols 25-28 = 2025Q1-Q4 (MISLABELED as 2022Q1-Q4 in Excel!), col 29 = 2025
# cols 30-33 = 2026Q1-Q4, col 34 = 2026
# cols 35-38 = 2027Q1-Q4, col 39 = 2027
# cols 40-43 = 2028Q1-Q4 (MISLABELED as 2027Q1-Q4), col 44 = 2028
# cols 45-48 = 2029Q1-Q4 (MISLABELED as 2027Q1-Q4), col 49 = 2029
# cols 50-53 = 2030Q1-Q4 (MISLABELED as 2027Q1-Q4), col 54 = 2030
```

### Extraction Function Pattern
```python
def extract_sheet_flat_array(ws, row_map, period_row, data_row_start,
                              data_row_end, period_col_start, period_col_end,
                              exclude_periods=None):
    """
    row_map: {output_key: excel_row_number}
    Returns dict with 'periods', 'isProjected', and one array per row_map key.
    """
    periods = []
    for col in range(period_col_start, period_col_end + 1):
        v = ws.cell(row=period_row, column=col).value
        if v is not None:
            periods.append(str(v))

    result = {"periods": periods, "isProjected": [...]}
    for key, row_num in row_map.items():
        values = []
        for col in range(period_col_start, period_col_end + 1):
            cell = ws.cell(row=row_num, column=col)
            values.append(round_cell(cell))
        result[key] = values
    return result


def round_cell(cell):
    """Round numeric value to match Excel display precision."""
    import re, math
    val = cell.value
    if val is None or not isinstance(val, (int, float)):
        return val
    if math.isnan(val) or math.isinf(val):
        return None
    fmt = cell.number_format or 'General'
    if fmt == 'General':
        return val  # leave unrounded (metadata cells)
    if '%' in fmt:
        m = re.search(r'0\.(0+)%', fmt)
        dp = len(m.group(1)) if m else 0
        return round(val, dp + 2)  # store as decimal, not percent
    m = re.search(r'0\.(0+)', fmt)
    dp = len(m.group(1)) if m else 0
    return round(val, dp)
```

### Anti-Patterns to Avoid
- **Using `read_only=True` mode for the final write:** `read_only=True` is fine for inspection but does NOT give `number_format` access on cells. Use `data_only=True` (without `read_only`) to get both resolved values and number_format. Confirmed: `data_only=True` alone resolves formulas correctly in this workbook.
- **Trusting Revenue Build column header strings:** Columns 25–28 are labeled `2022Q1..2022Q4` but contain 2025 quarter data. Columns 40–43, 45–48, 50–53 are all labeled `2027Q1..2027Q4` but contain 2028/2029/2030 quarter data. Use positional logic keyed off annual columns (4, 9, 14, 19, 24, 29, 34, 39, 44, 49, 54).
- **Excluding 2016–2018 via period string filtering:** Period headers in IS are raw integers (2016, 2017, 2018...), not strings. Filter by comparing `int(period_value) < 2019` and skip those columns.
- **Outputting rounded integers for `#,##0` formatted cells:** A value like `3911.4` stored with format `#,##0` (zero decimal places) means display as `3,912` but the underlying value has meaningful precision. Re-read the context: DATA-02 says "to display precision" — Excel displays `#,##0` as whole numbers. However the stored value is `3911.4` (already 1 dp). The correct interpretation: round to the number of decimal places in the format string. For `#,##0`, that is 0 dp → `round(3911.4, 0)` = `3911.0`. For `#,##0.0`, it's 1 dp → `round(5251.583, 1)` = `5251.6`. Return floats, not ints.
- **Silently skipping None cells in reconciliation:** The reconciliation must collect the Excel-reported subtotal and re-compute from extracted components; mismatches must `raise AssertionError` not just print a warning.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Read `.xlsx` with formula resolution | Custom XML parser | `openpyxl.load_workbook(data_only=True)` | Handles shared strings, cached values, all cell types |
| Parse number formats | Custom format engine | Regex on `cell.number_format` | Format string is a simple pattern; full format parsing is 500+ line Excel spec |
| NaN/Inf sanitization | Try/except on every cell | `math.isnan()` / `math.isinf()` guard before rounding | Consistent, explicit, no hidden exceptions |
| JSON serialization | String concatenation | `json.dumps(data, indent=2)` | Handles Unicode, escape sequences, float precision correctly |

**Key insight:** openpyxl with `data_only=True` is a single-library solution. Every formula cell in this workbook resolves to a cached Python float — confirmed by inspection. The only custom logic needed is number_format-aware rounding and positional period label correction.

---

## Common Pitfalls

### Pitfall 1: Revenue Build Column Label Mismatch
**What goes wrong:** Using `ws.cell(row=2, column=col).value` as the period label for columns 25–28 returns `"2022Q1"` through `"2022Q4"` but the actual data is Q1–Q4 of 2025. Same issue for columns 40–53.
**Why it happens:** Excel copy-paste error in the source file; the quarterly sub-column headers were not updated when projections were extended.
**How to avoid:** Build period label map from the annual-column anchors: col 29 = `"2025"`, so cols 25–28 = `"2025Q1"` through `"2025Q4"`. Similarly col 44 = `"2028"` → cols 40–43 = `"2028Q1"` through `"2028Q4"`.
**Warning signs:** Any annual total for a given year that does not equal the sum of its four quarters.

### Pitfall 2: Floating-Point Artifacts in Projected Cells
**What goes wrong:** Projected cells computed via Excel formulas produce Python floats like `706.7000000000003` or `-387.0999999999997`. Writing these directly to JSON produces visually wrong numbers.
**Why it happens:** openpyxl reads the IEEE 754 float as stored in Excel's cache; Excel formula arithmetic accumulates rounding error.
**How to avoid:** Apply `round_cell()` on every numeric cell using its `number_format` to determine decimal places. Confirmed: `round(-387.0999999999997, 0)` = `-387.0` (correct for `#,##0` format).
**Warning signs:** JSON values ending in many decimal digits that wouldn't appear in the Excel UI.

### Pitfall 3: IS Has % Rows Mixed With $ Rows
**What goes wrong:** Extracting all rows from IS naively includes percentage rows (e.g., `as % of Revenue` with values like `0.819`) alongside dollar rows. If the JSON consumer doesn't know which is which, it treats pct as dollars.
**Why it happens:** Excel stores pct as decimals; the `0%` number_format is display-only.
**How to avoid:** For the flat-array schema, use an explicit `row_map` that only extracts named rows (Sales, COGS, etc.) and skips `as % of` rows. If percentage rows are needed, label them distinctly (e.g., key suffix `Pct`).
**Warning signs:** Values less than 1.0 appearing in dollar-labeled arrays.

### Pitfall 4: BS Has No Projected Columns
**What goes wrong:** Expecting BS to have projected data through 2033 like IS does, and writing empty arrays or None arrays for missing projection years.
**Why it happens:** The BS sheet stops at DEC '25 (col 12); columns 13–16 exist but all values are None.
**How to avoid:** Detect the actual data range per sheet: read the period header row and include only columns with non-None period values.
**Warning signs:** `isProjected` array full of `true` entries but value arrays full of `null`.

### Pitfall 5: Cap Table Dates Loaded as datetime Objects
**What goes wrong:** Maturity date cells like `2029-01-01` are read by openpyxl as `datetime.datetime(2029, 1, 1, 0, 0)` objects, which are not JSON-serializable.
**Why it happens:** openpyxl auto-converts Excel date serial numbers to Python datetimes.
**How to avoid:** Check `isinstance(val, datetime)` and call `.strftime('%Y-%m-%d')` before serializing.
**Warning signs:** `TypeError: Object of type datetime is not JSON serializable` at script runtime.

### Pitfall 6: WACC Sheet Has Two Distinct Value Columns
**What goes wrong:** WACC input values sit in column 6 (not column 3 or 4) with labels in column 2 and blank spacer columns in between. Naive row-iteration misses values.
**Why it happens:** WACC is a vertical-list layout with merged cells for visual spacing; column 6 is the actual value column (`Principal`, `YTM`, `Weight`, CAPM inputs, final WACC).
**How to avoid:** Inspect WACC with explicit column targeting: iterate rows 5–26, use column 2 for label and column 6 for value (with occasional columns 10–11 for the CAPM side).

### Pitfall 7: Revenue Build Has ~71,000 None Cells
**What goes wrong:** The Revenue Build has 1407 rows × 56 columns = 78,792 cells, but only ~3,277 are numeric. Iterating all cells and writing nulls inflates the JSON dramatically.
**Why it happens:** Most rows (film titles, spacer rows, %-change rows) have data in only a few columns; most column×row combinations are empty.
**How to avoid:** For the flat-array schema, only extract rows that have a meaningful number of non-None numeric values (e.g., >= 4 values in the data range). Skip spacer/% rows by label matching.

---

## Code Examples

Verified patterns from direct inspection of this workbook:

### Load Workbook (data_only resolves formulas)
```python
import openpyxl
wb = openpyxl.load_workbook('AMC BRx.xlsx', data_only=True)
ws = wb['IS']
# All formula cells return computed floats, not formula strings
val = ws.cell(row=4, column=13).value  # 5251.583318644179 (2026 Sales)
fmt = ws.cell(row=4, column=13).number_format  # '#,##0_);(#,##0)'
```

### Round to Display Precision
```python
import re, math

def round_to_display(value, number_format):
    if value is None or not isinstance(value, (int, float)):
        return value
    if math.isnan(value) or math.isinf(value):
        return None
    fmt = number_format or 'General'
    if fmt == 'General':
        return value
    if '%' in fmt:
        m = re.search(r'0\.(0+)%', fmt)
        dp = len(m.group(1)) if m else 0
        return round(value, dp + 2)  # keep as decimal fraction
    m = re.search(r'0\.(0+)', fmt)
    dp = len(m.group(1)) if m else 0
    return round(value, dp)

# Example: IS Sales 2026
round_to_display(5251.583318644179, '#,##0_);(#,##0)')  # -> 5251.6 (round to 0 dp = 5252.0? No...)
```

**Important correction on IS format:** The IS `#,##0` format (zero decimal places) means display as integer. `round(5251.583, 0)` = `5252.0`. But the existing `financials.json` stores `3911.4` (1 decimal) for the same kind of data. This tension needs a design decision: **use 1 decimal for dollar values (`#,##0` format → store as round(x, 1)) and 0 decimal for pure integers**. The existing data files use 1-decimal precision for $M values as a convention. Recommend: `#,##0` formats → round to 1 dp (matching existing `financials.json` convention); `#,##0.0` formats → round to 1 dp; percentage formats → keep as decimal fraction rounded to format precision.

### IS Period + Projection Mapping
```python
# IS sheet: row 3 has integer year values
# col 3 = 2016, col 12 = 2025 (last actual), col 13 = 2026 (first projected)
period_row = 3
period_col_start = 3
period_col_end = 20
projected_start_year = 2026
exclude_before = 2019  # skip 2016, 2017, 2018

periods = []
is_projected = []
valid_cols = []
for col in range(period_col_start, period_col_end + 1):
    year_val = ws.cell(row=period_row, column=col).value
    if year_val is None:
        continue
    year = int(year_val)
    if year < exclude_before:
        continue
    valid_cols.append(col)
    periods.append(str(year))
    is_projected.append(year >= projected_start_year)
```

### Revenue Build Period Label Correction
```python
# Annual column positions (1-indexed): 4, 9, 14, 19, 24, 29, 34, 39, 44, 49, 54
# Quarterly sub-columns immediately precede each annual column
ANNUAL_COLS = {4: 2020, 9: 2021, 14: 2022, 19: 2023, 24: 2024,
               29: 2025, 34: 2026, 39: 2027, 44: 2028, 49: 2029, 54: 2030}

def get_rb_period_label(col_1indexed):
    """Return corrected period label for Revenue Build column."""
    if col_1indexed in ANNUAL_COLS:
        return str(ANNUAL_COLS[col_1indexed])
    # Find the annual column this quarterly col precedes
    for annual_col, year in sorted(ANNUAL_COLS.items()):
        if annual_col - 4 <= col_1indexed < annual_col:
            quarter = col_1indexed - (annual_col - 4)  # 1..4
            return f"{year}Q{quarter}"
    return None
```

### Reconciliation Assertions
```python
def assert_subtotal(ws, subtotal_row, component_rows, col, tolerance=0.01, label=""):
    """Assert that subtotal cell equals sum of component cells."""
    subtotal = ws.cell(row=subtotal_row, column=col).value
    if subtotal is None:
        return  # skip empty cells
    computed = sum(
        ws.cell(row=r, column=col).value or 0
        for r in component_rows
    )
    diff = abs(subtotal - computed)
    if diff > tolerance:
        raise AssertionError(
            f"Reconciliation FAILED [{label}] col {col}: "
            f"expected {subtotal}, computed {computed}, diff {diff}"
        )

# IS assertions (run for each period column):
# Gross Income (row 12) = Sales (row 4) + COGS (row 5)
assert_subtotal(ws, 12, [4, 5], col, label="IS:GrossIncome")
# EBIT (row 15) = Gross Income (row 12) + SGA (row 13)
assert_subtotal(ws, 15, [12, 13], col, label="IS:EBIT")

# BS assertions:
# Total Assets (row 35) = Total Liabilities (row 54) + Total Equity (row 68)
assert_subtotal(bs_ws, 35, [54, 68], col, label="BS:BalanceCheck")
```

### datetime Handling for Cap Table
```python
from datetime import datetime

def serialize_cell_value(val):
    if isinstance(val, datetime):
        return val.strftime('%Y-%m-%d')
    if isinstance(val, float) and (math.isnan(val) or math.isinf(val)):
        return None
    return val
```

---

## Key Per-Sheet Extraction Notes

### IS (`is.json`)
- Row 3: period header (integer years 2016–2033)
- Exclude cols for 2016, 2017, 2018 (col 3, 4, 5)
- Data rows 4–47 (use explicit row map to skip `as % of` rows)
- Projection start: year 2026 (col 13)
- Key reconciliations: Gross Income = Sales + COGS; EBIT = Gross + SGA

### BS (`bs.json`)
- Row 3: period header (`DEC '16` through `DEC '25`) — string format, not integers
- Exclude DEC '16, '17, '18; keep '19–'25 (cols 6–12)
- No projection columns (cols 13–16 are empty)
- Key reconciliation: Total Assets (row 35) = Total Liabilities (row 54) + Total Equity (row 68)

### CFS (`cfs.json`)
- Same structure as BS; max col = 12, all actuals 2016–2025
- Exclude 2016–2018

### Revenue Build (`revenue-build.json`)
- 1407 rows; data starts row 3 (row 2 is header)
- First meaningful section: rows 3–98 (US/International/Muvico/AMC revenue + drivers)
- Second section: rows 101–121 (box office context)
- Row 101 is a duplicate title row — marks start of section 2
- Rows 123–174: film title list — label rows only, NO numeric data; skip entirely
- Columns map: annual anchors at {4:2020, 9:2021, 14:2022, 19:2023, 24:2024, 29:2025, 34:2026, 39:2027, 44:2028, 49:2029, 54:2030}
- isProjected: 2020–2025 = false (actuals), 2026–2030 = true

### UFCF (`ufcf.json`)
- Two sections: (1) UFCF time series rows 4–13 (cols 3–10: 2026e–2033e), and (2) Sensitivity grid rows 17–27 (exit multiple × WACC)
- Sensitivity grid: row 17 = WACC axis, col 5 = exit multiple axis, intersection cells = EV
- Also includes perpetuity growth method EVs (rows 28–31)

### Cap Table (`cap-table.json`)
- Three entity sections: Muvico (rows 6–19), Odeon (rows 26–29), AMC consolidated (rows 35–48)
- Date cells are datetime objects — must convert to ISO string
- Replaces existing `cap-table.json` entirely

### Comps (`comps.json`)
- 5 companies (rows 5–9) + statistics section (rows 13–18: Min, Q1, Median, Q3, Max, Average)
- Period columns in row 4: Company, Ticker, Price, DSO, Market Cap, Cash, Debt, EV, 2026 EBITDA, 2027 EBITDA

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `financials.json` hand-coded from export_financials.py fallback | Excel as single source of truth via openpyxl extraction | Phase 1 (now) | eliminates manual sync drift |
| `cap-table.json` hardcoded | Extracted from Cap Table sheet | Phase 1 (now) | tranche data auto-updates from Excel |
| xlrd for xlsx reading | openpyxl | xlrd v2.0 (2020) dropped xlsx | openpyxl is the current standard |

**Deprecated/outdated:**
- `site/scripts/export_financials.py`: reads `AMC_Financial_Statements.xlsx` (a different, older file) with hardcoded fallback data. This script is superseded entirely by the new extraction script targeting `AMC BRx.xlsx`.
- `site/data/financials.json` (current): contains quarterly LTM data for FY2022–Q3 2025. Phase 1 replaces this with IS-derived annual data for 2019–2033.

---

## Open Questions

1. **Rounding convention for `#,##0` format (zero-decimal-place) dollar values**
   - What we know: Existing `financials.json` stores `3911.4` (1 dp); the IS format `#,##0` rounds to 0 dp = `3912`
   - What's unclear: Should the new JSON follow the Excel display convention (round to 0) or match the existing JSON convention (1 dp)?
   - Recommendation: Use **1 decimal place** for all `#,##0` and `#,##0.0` dollar values to match existing `financials.json` and preserve sub-dollar precision. This is `round(x, 1)` for all $M values regardless of `#,##0` vs `#,##0.0`.

2. **NWC and D&A sheets: standalone JSON or folded into DCF JSON?**
   - What we know: NWC has 25 rows × 17 cols (2020–2025 actuals only); D&A has 21 rows × 14 cols (2022–2031 with some projections). Both are relatively small. The UFCF sheet already has D&A and CapEx baked in.
   - Recommendation: Extract as **standalone JSON files** (`nwc.json`, `da-capex.json`). They are small, self-contained, and may be useful for model cross-checking even if no dedicated page is built in Phase 4.

3. **`financials.json` backward compatibility for `financials-model.js`**
   - What we know: `financials-model.js` loads `financials.json` via `fetch()` and expects `incomeStatement.revenue`, `incomeStatement.ebitda`, etc. The new `is.json` uses different keys.
   - Recommendation: Write **both** `is.json` (new full schema) and a backward-compatible `financials.json` with only the keys that `financials-model.js` needs. This prevents breaking the existing page while Phase 2 migrates the JS module.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | pytest (not yet installed — Wave 0 gap) |
| Config file | none — see Wave 0 |
| Quick run command | `python -m pytest tools/test_extract_excel.py -x -q` |
| Full suite command | `python -m pytest tools/ -q` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DATA-01 | Running extraction script produces all 27 JSON output files in `site/data/` | smoke | `python tools/extract_excel.py && python -m pytest tools/test_extract_excel.py::test_output_files_exist -x` | Wave 0 |
| DATA-01 | Each JSON file is valid JSON and non-empty | unit | `python -m pytest tools/test_extract_excel.py::test_json_valid -x` | Wave 0 |
| DATA-02 | No extracted numeric value has more than 1 decimal place for $M fields | unit | `python -m pytest tools/test_extract_excel.py::test_no_float_artifacts -x` | Wave 0 |
| DATA-02 | IS 2022 Sales value equals 3911.4 (known ground truth) | unit | `python -m pytest tools/test_extract_excel.py::test_spot_check_values -x` | Wave 0 |
| DATA-03 | IS: Gross Income = Sales + COGS for each period | unit | `python -m pytest tools/test_extract_excel.py::test_is_reconciliation -x` | Wave 0 |
| DATA-03 | BS: Total Assets = Total Liabilities + Total Equity for each period | unit | `python -m pytest tools/test_extract_excel.py::test_bs_reconciliation -x` | Wave 0 |

### Sampling Rate
- **Per task commit:** `python tools/extract_excel.py` (script itself raises on any reconciliation failure)
- **Per wave merge:** `python -m pytest tools/ -q`
- **Phase gate:** All reconciliation assertions pass + all output files exist and are valid JSON before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `tools/test_extract_excel.py` — covers DATA-01, DATA-02, DATA-03
- [ ] pytest install: `pip install pytest` — no test runner detected in project
- [ ] The extraction script itself (`tools/extract_excel.py`) is the primary Wave 0 deliverable

*(Existing project has no test infrastructure — pytest and test file are both new.)*

---

## Sources

### Primary (HIGH confidence)
- Direct `openpyxl.load_workbook('AMC BRx.xlsx', data_only=True)` inspection — all sheet names, dimensions, cell values, number_format, and reconciliation math verified live against actual file
- `site/data/financials.json` — established flat-array schema pattern (confirmed existing)
- `site/data/cap-table.json` — established row-object schema pattern (confirmed existing)
- `site/scripts/export_financials.py` — established Python script conventions for this project

### Secondary (MEDIUM confidence)
- openpyxl 3.1.5 documentation: `data_only=True` parameter behavior with cached formula values
- openpyxl number_format attribute: available on `Cell` objects when loaded without `read_only=True`

### Tertiary (LOW confidence)
- None

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — openpyxl 3.1.5 confirmed installed, behavior verified live
- Architecture: HIGH — schemas confirmed against existing files + direct sheet inspection
- Pitfalls: HIGH — Revenue Build label anomaly confirmed by inspection; BS projection absence confirmed; datetime cells confirmed; float artifacts confirmed in projected cells
- Reconciliation logic: HIGH — Gross Income, EBIT, and BS balance checks all verified numerically against actual data

**Research date:** 2026-03-23
**Valid until:** 2026-05-01 (stable — no moving parts once Excel file is locked)
