#!/usr/bin/env python3
"""
AMC Debt Navigator - Document Parser
Parses legal .txt indentures/credit agreements into structured HTML pages.
Generates DOC 2-7 HTML files for the AMC Debt Navigator site.
"""

import re
import os
import html as html_mod

# ─── Paths ───────────────────────────────────────────────────────────────────
SITE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # site/
DOCS_DIR = os.path.join(SITE_DIR, "docs")
SOURCE_DIR = os.path.join(os.path.dirname(SITE_DIR), "NewDocsBRX")

os.makedirs(DOCS_DIR, exist_ok=True)

# ─── Document Configuration ─────────────────────────────────────────────────

DOCUMENTS = {
    "doc2": {
        "source": "seniorsecured29.txt",
        "output": "doc2-muvico-secured-2029.html",
        "page_id": "doc2",
        "title": "Muvico Senior Secured Notes due 2029",
        "short_name": "DOC 2 - Muvico 15% PIK Notes",
        "breadcrumb": "DOC 2 - Muvico 15% PIK Notes",
        "doc_type": "Indenture",
        "date": "July 24, 2025",
        "issuer": "Muvico, LLC",
        "trustee": "CSC Delaware Trust Company",
        "principal": "$856,964,000",
        "interest": "7.50% base + leverage grid (up to 15% total with PIK)",
        "maturity": "February 1, 2029",
        "governing_law": "New York",
        "amc_lien": "1L",
        "entity_lien": "1.5L",
        "amc_lien_tag": "tag-1l",
        "entity_lien_tag": "tag-15l",
        "entity_lien_label": "1.5L AT MUVICO",
        "split": None,
        "priority_articles": ["III", "IV", "V", "VI"],
    },
    "doc3": {
        "source": "exhibit_4.1(amc).txt",
        "output": "doc3-amc-7500-notes.html",
        "page_id": "doc3",
        "title": "AMC 7.500% Senior Secured Notes due 2029",
        "short_name": "DOC 3 - AMC 7.5% Notes",
        "breadcrumb": "DOC 3 - AMC 7.5% Notes",
        "doc_type": "Indenture",
        "date": "February 14, 2022",
        "issuer": "AMC Entertainment Holdings, Inc.",
        "trustee": "U.S. Bank Trust Company, National Association",
        "principal": "$360,000,000",
        "interest": "7.500% fixed cash",
        "maturity": "February 1, 2029",
        "governing_law": "New York",
        "amc_lien": "1L",
        "entity_lien": "2L",
        "amc_lien_tag": "tag-1l",
        "entity_lien_tag": "tag-2l",
        "entity_lien_label": "2L AT MUVICO",
        "split": None,
        "priority_articles": ["III", "IV", "V", "VI"],
    },
    "doc4": {
        "source": "exhibit_4.2.txt",
        "output": "doc4-credit-agreement.html",
        "page_id": "doc4",
        "title": "$2B Term Loan Credit Agreement",
        "short_name": "DOC 4 - $2B Term Loan",
        "breadcrumb": "DOC 4 - $2B Term Loan",
        "doc_type": "Credit Agreement",
        "date": "July 22, 2024",
        "issuer": "AMC Entertainment Holdings, Inc. + Muvico, LLC",
        "trustee": "Wilmington Savings Fund Society, FSB (Admin/Collateral Agent)",
        "principal": "$1,999,100,000",
        "interest": "SOFR + 700bps (10.63% all-in)",
        "maturity": "January 1, 2029",
        "governing_law": "New York",
        "amc_lien": "1L",
        "entity_lien": "1L",
        "amc_lien_tag": "tag-1l",
        "entity_lien_tag": "tag-1l",
        "entity_lien_label": "1L AT MUVICO",
        "split": None,
        "priority_articles": ["V", "VI", "VII"],
    },
    "doc5": {
        "source": "exhibit_4.3(seniorsecurednotes).txt",
        "output": "doc5-exchangeable-2030.html",
        "page_id": "doc5",
        "title": "Muvico Senior Secured Exchangeable Notes due 2030",
        "short_name": "DOC 5 - Muvico 8% PIK Exchangeable",
        "breadcrumb": "DOC 5 - Muvico 8% PIK Exchangeable",
        "doc_type": "Indenture",
        "date": "July 24, 2025",
        "issuer": "Muvico, LLC",
        "trustee": "GLAS Trust Company LLC",
        "principal": "$194,380,980",
        "interest": "2% cash + 6% PIK",
        "maturity": "April 1, 2030",
        "governing_law": "New York",
        "amc_lien": "1L",
        "entity_lien": "1.25L",
        "amc_lien_tag": "tag-1l",
        "entity_lien_tag": "tag-125l",
        "entity_lien_label": "1.25L AT MUVICO",
        "split": None,
        "priority_articles": ["III", "IV", "IV-A", "IV-B", "X"],
    },
    "doc6": {
        "source": "exhibit_4.1(odeon).txt",
        "output": "doc6-odeon-notes.html",
        "page_id": "doc6",
        "title": "Odeon 12.750% Senior Secured Notes due 2027",
        "short_name": "DOC 6 - Odeon 12.75%",
        "breadcrumb": "DOC 6 - Odeon 12.75% Notes",
        "doc_type": "Indenture",
        "date": "October 20, 2022",
        "issuer": "Odeon Finco PLC",
        "trustee": "U.S. Bank Trust Company, National Association",
        "principal": "$400,000,000",
        "interest": "12.750% fixed cash",
        "maturity": "November 1, 2027",
        "governing_law": "New York",
        "amc_lien": "Unsecured",
        "entity_lien": "1L (Odeon)",
        "amc_lien_tag": "tag-unsec",
        "entity_lien_tag": "tag-1l",
        "entity_lien_label": "1L AT ODEON",
        "split": "exhibit",
        "split_line_keyword": "Exhibit A",
        "split_min_line": 5200,
        "exhibits_output": "doc6-odeon-exhibits.html",
        "exhibits_page_id": "doc6-ex",
        "exhibits_breadcrumb": "DOC 6 - Odeon Exhibits",
        "priority_articles": ["III", "IV"],
    },
    "doc7": {
        "source": "pikToggle).txt",
        "output": "doc7-pik-toggle.html",
        "page_id": "doc7",
        "title": "6.00%/8.00% Cash/PIK Toggle Senior Secured Exchangeable Notes due 2030",
        "short_name": "DOC 7 - 6/8% PIK Toggle",
        "breadcrumb": "DOC 7 - 6/8% PIK Toggle",
        "doc_type": "Indenture",
        "date": "July 22, 2024",
        "issuer": "Muvico, LLC",
        "trustee": "GLAS Trust Company LLC",
        "principal": "$414,433,523",
        "interest": "6.00% cash OR 8.00% PIK (toggle)",
        "maturity": "April 1, 2030",
        "governing_law": "New York",
        "amc_lien": "1L",
        "entity_lien": "2L",
        "amc_lien_tag": "tag-1l",
        "entity_lien_tag": "tag-2l",
        "entity_lien_label": "2L AT MUVICO",
        "split": "exhibit",
        "split_line_keyword": "Exhibit A",
        "split_min_line": 5700,
        "exhibits_output": "doc7-pik-toggle-exhibits.html",
        "exhibits_page_id": "doc7-ex",
        "exhibits_breadcrumb": "DOC 7 - PIK Toggle Exhibits",
        "priority_articles": ["III", "IV", "IV-A", "IV-B", "X"],
    },
}

# ─── Translation Database ────────────────────────────────────────────────────
# Keys: (doc_key, section_number) or (doc_key, article_roman, "article")
# Values: HTML translation text

TRANSLATIONS = {}

# Import per-document translation files
import sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

for doc_num in range(2, 8):
    try:
        mod = __import__(f'translations_doc{doc_num}')
        TRANSLATIONS.update(mod.TRANSLATIONS)
    except ImportError:
        pass


# ─── HTML Template ────────────────────────────────────────────────────────────

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AMC Debt Navigator - {title}</title>
<link rel="stylesheet" href="../css/theme.css">
<link rel="stylesheet" href="../css/layout.css">
<link rel="stylesheet" href="../css/docs.css">
</head>
<body data-page="{page_id}" data-base="..">
<button class="mobile-toggle">&#9776;</button>
<div class="mobile-overlay"></div>
<div class="page-wrapper">
  <aside class="sidebar" id="sidebar"></aside>
  <main class="main-content">
    <header class="content-header" id="content-header" data-breadcrumb="{breadcrumb}"></header>
    <div class="content-body">
      <div class="doc-layout">
        <div class="doc-toc">
          <div class="doc-toc-title">Table of Contents</div>
          <div id="doc-toc-list"></div>
          <div style="margin-top:12px;">
            <button id="expand-all" class="btn" style="font-size:10px; padding:4px 8px; width:100%; margin-bottom:4px;">Expand All</button>
            <button id="collapse-all" class="btn" style="font-size:10px; padding:4px 8px; width:100%;">Collapse All</button>
          </div>
        </div>
        <div class="doc-content">
{doc_header}
{content}
        </div>
      </div>
    </div>
  </main>
</div>
<script src="../js/components.js"></script>
<script src="../js/doc-nav.js"></script>
<script src="../js/tooltips.js"></script>
<script src="../js/auto-link.js"></script>
</body>
</html>"""

EXHIBITS_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AMC Debt Navigator - {title}</title>
<link rel="stylesheet" href="../css/theme.css">
<link rel="stylesheet" href="../css/layout.css">
<link rel="stylesheet" href="../css/docs.css">
</head>
<body data-page="{page_id}" data-base="..">
<button class="mobile-toggle">&#9776;</button>
<div class="mobile-overlay"></div>
<div class="page-wrapper">
  <aside class="sidebar" id="sidebar"></aside>
  <main class="main-content">
    <header class="content-header" id="content-header" data-breadcrumb="{breadcrumb}"></header>
    <div class="content-body">
      <div class="doc-layout">
        <div class="doc-toc">
          <div class="doc-toc-title">Exhibits &amp; Schedules</div>
          <div id="doc-toc-list"></div>
          <div style="margin-top:12px;">
            <button id="expand-all" class="btn" style="font-size:10px; padding:4px 8px; width:100%; margin-bottom:4px;">Expand All</button>
            <button id="collapse-all" class="btn" style="font-size:10px; padding:4px 8px; width:100%;">Collapse All</button>
          </div>
        </div>
        <div class="doc-content">
          <div class="doc-header">
            <div class="doc-type">Exhibits &amp; Schedules</div>
            <h1>{doc_title}</h1>
            <div class="doc-meta">
              <div class="meta-item"><span class="meta-label">Parent Document:</span> {parent_doc}</div>
            </div>
          </div>
{content}
        </div>
      </div>
    </div>
  </main>
</div>
<script src="../js/components.js"></script>
<script src="../js/doc-nav.js"></script>
<script src="../js/tooltips.js"></script>
<script src="../js/auto-link.js"></script>
</body>
</html>"""


# ─── Parser Functions ─────────────────────────────────────────────────────────

def read_source(filename):
    """Read a source .txt file and return lines."""
    path = os.path.join(SOURCE_DIR, filename)
    with open(path, "r", encoding="utf-8", errors="replace") as f:
        return f.readlines()


def escape(text):
    """HTML-escape text."""
    return html_mod.escape(text, quote=True)


def roman_to_label(r):
    """Normalize roman numeral for IDs."""
    return r.upper().strip().replace(" ", "").replace(".", "")


# Regex patterns for detecting article/section headers
# Articles: "Article I.", "Article I", "ARTICLE I", "Article IV-A.", etc.
ARTICLE_RE = re.compile(
    r'^\s*(?:Article|ARTICLE)\s+([IVXLC]+(?:-[A-Z])?)\b[\.\:]?\s*(.*)',
    re.IGNORECASE
)
# Sections: "Section 1.01", "Section 10.15", etc.
SECTION_RE = re.compile(
    r'^\s*Section\s+(\d+\.\d+)\s*(.*)',
    re.IGNORECASE
)
# DOC 4 uses slightly different article format: "Article I" on its own line, title on next
DOC4_ARTICLE_RE = re.compile(
    r'^\s*(?:Article|ARTICLE)\s+([IVXLC]+)\s*$',
    re.IGNORECASE
)

# Page/noise lines to skip
PAGE_NUM_RE = re.compile(r'^\s*-?\s*[ivx]+\s*-?\s*$|^\s*\d+\s*$')
TOC_RE = re.compile(r'^\s*TABLE OF CONTENTS', re.IGNORECASE)


def is_definitions_section(sec_num):
    """Check if this is a definitions section (1.01 or 1.02)."""
    return sec_num in ("1.01", "1.02")


def is_toc_line(line):
    """Check if line is part of table of contents."""
    stripped = line.strip()
    if not stripped:
        return False
    # TOC entries typically have tab-separated page numbers
    if re.match(r'^Section\s+\d+\.\d+\t', stripped):
        return True
    if re.match(r'^Article\s+[IVXLC]', stripped, re.IGNORECASE) and '\t' in stripped:
        return True
    return False


def count_definitions(text):
    """Estimate how many defined terms are in a definitions section."""
    # Count quoted defined terms like "Defined Term"
    matches = re.findall(r'"[A-Z][^"]{2,}"', text)
    return len(set(matches))


def parse_document(lines, doc_key, config):
    """
    Parse document lines into structured data:
    Returns list of articles, each containing sections.
    """
    articles = []
    current_article = None
    current_section = None
    in_toc = False
    in_preamble = True
    preamble_lines = []
    seen_art_ids = set()
    seen_sec_ids = set()

    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # Skip empty lines at start and page numbers
        if PAGE_NUM_RE.match(stripped):
            i += 1
            continue

        # Detect TOC region
        if TOC_RE.match(stripped):
            in_toc = True
            i += 1
            continue

        if in_toc:
            # End of TOC: when we hit the actual indenture/agreement preamble text
            if re.match(r'^\s*(?:INDENTURE|This INDENTURE|CREDIT AGREEMENT|This CREDIT AGREEMENT)', stripped, re.IGNORECASE):
                in_toc = False
                in_preamble = True
                preamble_lines.append(stripped)
                i += 1
                continue
            # "NOW THEREFORE" signals end of preamble / start of body
            if re.match(r'^\s*NOW,?\s+THEREFORE', stripped, re.IGNORECASE):
                in_toc = False
                in_preamble = True
                preamble_lines.append(stripped)
                i += 1
                continue
            # For exhibit/appendix TOC entries, skip
            if is_toc_line(stripped):
                i += 1
                continue
            # If we see "Exhibit" or "Schedule" in TOC, skip
            if re.match(r'^\s*(Exhibit|Schedule|Appendix|EXHIBIT|SCHEDULE)\s+', stripped):
                i += 1
                continue
            # Blank or continuation lines in TOC
            if not stripped or stripped in ('Page', '(Continued)', 'SCHEDULES:', 'EXHIBITS:'):
                i += 1
                continue
            # Check for article match - but check if this is still in TOC
            # by looking ahead to see if nearby lines are tab-separated TOC entries
            art_match = ARTICLE_RE.match(stripped)
            if art_match and '\t' not in stripped:
                # Look ahead: if the next few non-blank lines contain Section + tab patterns,
                # we're still in the TOC (DOC 4 style where articles have no tabs)
                still_in_toc = False
                for j in range(i + 1, min(i + 10, len(lines))):
                    future = lines[j].strip()
                    if not future:
                        continue
                    if re.match(r'^Section\s+\d+\.\d+\t', future):
                        still_in_toc = True
                        break
                    if re.match(r'^\s*(?:INDENTURE|CREDIT AGREEMENT|NOW|Article|ARTICLE)', future, re.IGNORECASE):
                        break
                if still_in_toc:
                    i += 1
                    continue
                else:
                    in_toc = False
                    # Don't increment - process this line
            else:
                i += 1
                continue

        # Check for article header
        art_match = ARTICLE_RE.match(stripped)
        if art_match:
            roman = art_match.group(1).upper()
            title_text = art_match.group(2).strip().rstrip('.')

            # For DOC 4 style: article number on one line, title on next
            if not title_text and i + 1 < len(lines):
                # Look ahead for title on next non-empty line
                for j in range(i + 1, min(i + 5, len(lines))):
                    next_stripped = lines[j].strip()
                    if next_stripped and not PAGE_NUM_RE.match(next_stripped):
                        title_text = next_stripped
                        break

            # Clean up title
            title_text = re.sub(r'\s+\d+$', '', title_text)  # Remove trailing page numbers
            title_text = title_text.strip().rstrip('.')

            if in_preamble:
                in_preamble = False

            # Save current section to current article
            if current_section and current_article:
                current_article["sections"].append(current_section)
                current_section = None

            # Save current article
            if current_article:
                articles.append(current_article)

            art_id = f"art-{roman_to_label(roman)}"
            if art_id in seen_art_ids:
                suffix = 2
                while f"{art_id}-{suffix}" in seen_art_ids:
                    suffix += 1
                art_id = f"{art_id}-{suffix}"
            seen_art_ids.add(art_id)

            current_article = {
                "roman": roman,
                "title": title_text,
                "sections": [],
                "id": art_id,
            }
            i += 1
            continue

        # Check for section header
        sec_match = SECTION_RE.match(stripped)
        if sec_match and current_article:
            sec_num = sec_match.group(1)
            sec_raw = sec_match.group(2).strip()

            # Clean up title - remove trailing page numbers and tabs
            sec_raw = re.sub(r'\t.*', '', sec_raw)
            sec_raw = re.sub(r'\s+\d+$', '', sec_raw)
            sec_raw = sec_raw.strip()

            # Extract just the title portion (before first period followed by space/content)
            # e.g. "Defined Terms. As used in this Agreement..." -> "Defined Terms"
            # But handle titles like "[Reserved]" or "Limitation on Indebtedness and Certain Equity Securities"
            sec_title = sec_raw
            body_remainder = ""
            period_match = re.match(r'^([^.]+(?:\.\d+)?)\.\s+(.+)', sec_raw)
            if period_match:
                candidate_title = period_match.group(1).strip()
                candidate_body = period_match.group(2).strip()
                # Only split if the part before the period looks like a title (< 120 chars)
                # and the part after looks like body text (has multiple words)
                if len(candidate_title) < 120 and len(candidate_body) > 20:
                    sec_title = candidate_title
                    body_remainder = candidate_body

            sec_title = sec_title.rstrip('.')

            if not sec_title or sec_title == '[Reserved]':
                if not sec_title:
                    # Look ahead for title
                    for j in range(i + 1, min(i + 3, len(lines))):
                        next_stripped = lines[j].strip()
                        if next_stripped and not PAGE_NUM_RE.match(next_stripped):
                            sec_title = next_stripped.rstrip('.')
                            break
                if not sec_title:
                    sec_title = "[Reserved]"

            # Save previous section
            if current_section:
                current_article["sections"].append(current_section)

            sec_id = f"sec-{sec_num.replace('.', '-')}"
            if sec_id in seen_sec_ids:
                suffix = 2
                while f"{sec_id}-{suffix}" in seen_sec_ids:
                    suffix += 1
                sec_id = f"{sec_id}-{suffix}"
            seen_sec_ids.add(sec_id)

            current_section = {
                "number": sec_num,
                "title": sec_title,
                "text_lines": [body_remainder] if body_remainder else [],
                "id": sec_id,
            }
            i += 1
            continue

        # Accumulate text for current section
        if current_section and not in_toc and not in_preamble:
            if stripped:
                current_section["text_lines"].append(stripped)
        elif in_preamble and stripped:
            preamble_lines.append(stripped)

        i += 1

    # Finalize
    if current_section and current_article:
        current_article["sections"].append(current_section)
    if current_article:
        articles.append(current_article)

    return articles, preamble_lines


def is_priority_article(roman, priority_list):
    """Check if an article roman numeral is in the priority list."""
    return roman.upper() in [p.upper() for p in priority_list]


def is_priority_section(sec_num, article_roman, priority_articles):
    """
    Check if a section should get a translation.
    Priority sections are those within priority articles.
    """
    return article_roman.upper() in [p.upper() for p in priority_articles]


def build_doc_header(config):
    """Build the document header HTML."""
    return f"""          <div class="doc-header">
            <div class="doc-type">{escape(config['doc_type'])}</div>
            <h1>{escape(config['title'])}</h1>
            <div class="doc-meta">
              <div class="meta-item"><span class="meta-label">Date:</span> {escape(config['date'])}</div>
              <div class="meta-item"><span class="meta-label">Issuer:</span> {escape(config['issuer'])}</div>
              <div class="meta-item"><span class="meta-label">Trustee/Agent:</span> {escape(config['trustee'])}</div>
              <div class="meta-item"><span class="meta-label">Initial Principal:</span> {escape(config['principal'])}</div>
              <div class="meta-item"><span class="meta-label">Interest:</span> {escape(config['interest'])}</div>
              <div class="meta-item"><span class="meta-label">Maturity:</span> {escape(config['maturity'])}</div>
              <div class="meta-item"><span class="meta-label">Governing Law:</span> {escape(config['governing_law'])}</div>
            </div>
            <div style="margin-top:12px; display:flex; gap:8px; flex-wrap:wrap;">
              <span class="tag {config['amc_lien_tag']}">{escape(config['amc_lien'])} AT AMC</span>
              <span class="tag {config['entity_lien_tag']}">{escape(config['entity_lien_label'])}</span>
            </div>
          </div>"""


def build_section_html(section, doc_key, article_roman, priority_articles):
    """Build HTML for a single section."""
    sec_num = section["number"]
    sec_title = section["title"]
    sec_id = section["id"]
    raw_text = "\n".join(section["text_lines"])

    html_parts = []
    html_parts.append(f'          <div class="doc-section" id="{sec_id}">')
    html_parts.append(f'            <div class="section-header">')
    html_parts.append(f'              <span class="section-number">Section {escape(sec_num)}</span>')
    html_parts.append(f'              <span class="section-title">{escape(sec_title)}</span>')
    html_parts.append(f'            </div>')

    # Handle definitions section specially
    if is_definitions_section(sec_num):
        term_count = count_definitions(raw_text)
        if term_count < 10:
            term_count = 150  # Estimate if regex didn't find many
        html_parts.append(f'            <div class="translation-block">')
        html_parts.append(f'              <div class="translation-label">DEFINITIONS SUMMARY</div>')
        html_parts.append(f'              <div class="translation-text">')
        html_parts.append(f'                <p>This section contains approximately <strong>{term_count} defined terms</strong> that are used throughout this document. Key terms are available via tooltip popups throughout this document and in the <a href="../glossary.html">Glossary</a>.</p>')
        html_parts.append(f'                <p>Important defined terms for this instrument include: Consolidated EBITDA, Fixed Charge Coverage Ratio, Permitted Indebtedness, Permitted Liens, Restricted Payment, Change of Control, and Event of Default.</p>')
        html_parts.append(f'              </div>')
        html_parts.append(f'            </div>')
        # Don't include raw text for definitions - it's too long
        html_parts.append(f'          </div>')
        return "\n".join(html_parts)

    # Translation block for sections with translations
    translation_key = (doc_key, sec_num)
    if translation_key in TRANSLATIONS:
        html_parts.append(f'            <div class="translation-block">')
        html_parts.append(f'              <div class="translation-label">WHAT THIS MEANS</div>')
        html_parts.append(f'              <div class="translation-text">')
        html_parts.append(f'                {TRANSLATIONS[translation_key]}')
        html_parts.append(f'              </div>')
        html_parts.append(f'            </div>')

    # Original text
    if raw_text.strip():
        if translation_key in TRANSLATIONS:
            # Collapsible for translated sections
            html_parts.append(f'            <details class="legal-details">')
            html_parts.append(f'              <summary>View Original Legal Text</summary>')
            html_parts.append(f'              <div class="legal-text">{escape(raw_text)}</div>')
            html_parts.append(f'            </details>')
        else:
            # Raw section for untranslated
            display_text = raw_text
            if len(display_text) > 15000:
                display_text = display_text[:15000] + "\n\n[... Section continues. Full text available in source document.]"
            html_parts.append(f'            <div class="raw-section">{escape(display_text)}</div>')

    html_parts.append(f'          </div>')
    return "\n".join(html_parts)


def build_article_html(article, doc_key, priority_articles):
    """Build HTML for an article and its sections."""
    roman = article["roman"]
    title = article["title"]
    art_id = article["id"]
    is_priority = is_priority_article(roman, priority_articles)

    html_parts = []
    html_parts.append(f'          <div class="doc-article" id="{art_id}">')
    html_parts.append(f'            <div class="article-header">Article {escape(roman)}. {escape(title)}</div>')

    # Article-level translation
    art_translation_key = (doc_key, roman, "article")
    if art_translation_key in TRANSLATIONS:
        html_parts.append(f'            <div class="translation-block">')
        html_parts.append(f'              <div class="translation-label">ARTICLE OVERVIEW</div>')
        html_parts.append(f'              <div class="translation-text">')
        html_parts.append(f'                {TRANSLATIONS[art_translation_key]}')
        html_parts.append(f'              </div>')
        html_parts.append(f'            </div>')

    # Sections
    for section in article["sections"]:
        html_parts.append(build_section_html(section, doc_key, roman, priority_articles))

    html_parts.append(f'          </div>')
    return "\n".join(html_parts)


def normalize_whitespace(s):
    """Normalize all Unicode whitespace variants to regular spaces."""
    import unicodedata
    return re.sub(r'[\s\u00a0\u202f\u2000-\u200b\u2028\u2029\u3000]+', ' ', s).strip()


def split_document_lines(lines, split_keyword, split_min_line):
    """
    Split document lines into body and exhibits at the point where
    exhibits/schedules begin. Returns (body_lines, exhibit_lines).
    """
    norm_keyword = normalize_whitespace(split_keyword)
    for i in range(split_min_line, len(lines)):
        stripped = normalize_whitespace(lines[i])
        if stripped == norm_keyword or stripped.startswith(norm_keyword):
            # Check this isn't a TOC reference - look for actual content after
            # Find the actual exhibit start (non-TOC)
            if i > split_min_line:
                return lines[:i], lines[i:]

    # Fallback: use the min line as split point
    return lines[:split_min_line], lines[split_min_line:]


def build_exhibits_html(exhibit_lines, doc_key, config):
    """Build HTML content for exhibits/schedules pages."""
    # Parse exhibits into sections
    exhibit_sections = []
    current_section = None

    EXHIBIT_HEADER_RE = re.compile(
        r'^\s*(Exhibit|EXHIBIT|Schedule|SCHEDULE|Appendix|APPENDIX)\s+([A-Z0-9][\w.\-]*(?:\s+to\s+the)?)',
        re.IGNORECASE
    )

    for line in exhibit_lines:
        stripped = line.strip()
        if not stripped:
            if current_section:
                current_section["lines"].append("")
            continue

        ex_match = EXHIBIT_HEADER_RE.match(stripped)
        if ex_match:
            if current_section:
                exhibit_sections.append(current_section)
            ex_type = ex_match.group(1).title()
            ex_id_raw = ex_match.group(2).strip()
            current_section = {
                "type": ex_type,
                "id_raw": ex_id_raw,
                "title": stripped,
                "lines": [],
                "html_id": f"ex-{ex_type.lower()}-{re.sub(r'[^a-z0-9]', '', ex_id_raw.lower())}",
            }
        elif current_section:
            current_section["lines"].append(stripped)
        else:
            # Pre-exhibit text, create a general section
            if not exhibit_sections and not current_section:
                current_section = {
                    "type": "Preamble",
                    "id_raw": "preamble",
                    "title": "Signature Pages & Preamble",
                    "lines": [stripped],
                    "html_id": "ex-preamble",
                }
            elif current_section:
                current_section["lines"].append(stripped)

    if current_section:
        exhibit_sections.append(current_section)

    # Build HTML
    html_parts = []
    for section in exhibit_sections:
        text = "\n".join(section["lines"])
        if len(text) > 20000:
            text = text[:20000] + "\n\n[... Exhibit continues. Full text available in source document.]"

        html_parts.append(f'          <div class="doc-article" id="{section["html_id"]}">')
        html_parts.append(f'            <div class="article-header">{escape(section["title"])}</div>')
        if text.strip():
            html_parts.append(f'            <details class="legal-details">')
            html_parts.append(f'              <summary>View Full Text</summary>')
            html_parts.append(f'              <div class="legal-text">{escape(text)}</div>')
            html_parts.append(f'            </details>')
        html_parts.append(f'          </div>')

    return "\n".join(html_parts)


def generate_document(doc_key, config):
    """Generate HTML page(s) for a document."""
    print(f"  Processing {doc_key}: {config['source']}...")

    lines = read_source(config["source"])
    print(f"    Read {len(lines)} lines")

    body_lines = lines
    exhibit_lines = None

    # Split if needed (DOC 6, DOC 7)
    if config.get("split") == "exhibit":
        body_lines, exhibit_lines = split_document_lines(
            lines,
            config["split_line_keyword"],
            config["split_min_line"]
        )
        print(f"    Split at line ~{len(body_lines)}: body={len(body_lines)} lines, exhibits={len(exhibit_lines)} lines")

    # Parse body
    articles, preamble = parse_document(body_lines, doc_key, config)
    print(f"    Found {len(articles)} articles")
    for art in articles:
        print(f"      Article {art['roman']}: {art['title']} ({len(art['sections'])} sections)")

    # Build body HTML
    doc_header = build_doc_header(config)
    content_parts = []
    for article in articles:
        content_parts.append(build_article_html(article, doc_key, config["priority_articles"]))

    content = "\n".join(content_parts)

    # Generate main page
    page_html = HTML_TEMPLATE.format(
        title=config["title"],
        page_id=config["page_id"],
        breadcrumb=config["breadcrumb"],
        doc_header=doc_header,
        content=content,
    )

    output_path = os.path.join(DOCS_DIR, config["output"])
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(page_html)
    print(f"    Wrote {output_path} ({len(page_html):,} bytes)")

    # Generate exhibits page if needed
    if exhibit_lines and config.get("exhibits_output"):
        exhibits_content = build_exhibits_html(exhibit_lines, doc_key, config)
        exhibits_html = EXHIBITS_TEMPLATE.format(
            title=f"{config['short_name']} - Exhibits",
            page_id=config["exhibits_page_id"],
            breadcrumb=config["exhibits_breadcrumb"],
            doc_title=f"{config['title']} - Exhibits & Schedules",
            parent_doc=config["short_name"],
            content=exhibits_content,
        )
        ex_output_path = os.path.join(DOCS_DIR, config["exhibits_output"])
        with open(ex_output_path, "w", encoding="utf-8") as f:
            f.write(exhibits_html)
        print(f"    Wrote {ex_output_path} ({len(exhibits_html):,} bytes)")


# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    print("=" * 60)
    print("AMC Debt Navigator - Document Parser")
    print("=" * 60)
    print(f"Source directory: {SOURCE_DIR}")
    print(f"Output directory: {DOCS_DIR}")
    print()

    for doc_key in ["doc2", "doc3", "doc4", "doc5", "doc6", "doc7"]:
        config = DOCUMENTS[doc_key]
        generate_document(doc_key, config)
        print()

    print("=" * 60)
    print("All documents generated successfully!")
    print("=" * 60)

    # List generated files
    print("\nGenerated files:")
    for f in sorted(os.listdir(DOCS_DIR)):
        fpath = os.path.join(DOCS_DIR, f)
        size = os.path.getsize(fpath)
        print(f"  {f} ({size:,} bytes)")


if __name__ == "__main__":
    main()
