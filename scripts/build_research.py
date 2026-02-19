#!/usr/bin/env python3
"""
Build script: converts 8 research markdown files into 9 HTML pages
(1 hub index + 8 individual articles) for the AMC Debt Navigator site.

Usage:
    python3 site/scripts/build_research.py
"""

import os
import re
import html as html_mod
import markdown
from bs4 import BeautifulSoup, NavigableString

# ── Paths ──────────────────────────────────────────────────
SITE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RESEARCH_SRC = os.path.join(os.path.dirname(SITE_DIR), "research")
RESEARCH_OUT = os.path.join(SITE_DIR, "research")

# ── Metadata for each research file ───────────────────────
RESEARCH_FILES = [
    {
        "src": "01_Foundational_LME_Concepts.md",
        "slug": "lme-concepts",
        "title": "LME Foundations",
        "subtitle": "Capital Structure, Provisions & Transaction Types",
        "icon": "&#9670;",
        "description": "Priority waterfalls, secured vs. unsecured debt, covenant mechanics, and the contractual provisions that enable modern LMEs.",
        "tags": [4],
    },
    {
        "src": "02_Novel_LME_Strategies_2022_2026.md",
        "slug": "novel-strategies",
        "title": "Novel LME Strategies",
        "subtitle": "2022-2026 Innovations & Tactics",
        "icon": "&#9733;",
        "description": "Creditor-on-creditor violence, cooperation agreements, dropdown 2.0, double-dip structures, and frontier transactions.",
        "tags": [2, 3, 4, 5, 7],
    },
    {
        "src": "03_Landmark_Case_Studies.md",
        "slug": "case-studies",
        "title": "Landmark Case Studies",
        "subtitle": "J.Crew through Pluralsight",
        "icon": "&#9830;",
        "description": "Detailed breakdowns of landmark LME transactions from J.Crew (2017) through Pluralsight (2024) and emerging 2025-2026 deals.",
        "tags": [],
    },
    {
        "src": "04_Credit_Doc_Countermeasures.md",
        "slug": "countermeasures",
        "title": "Credit Doc Countermeasures",
        "subtitle": "Anti-Serta, J.Crew Blockers & More",
        "icon": "&#9873;",
        "description": "Anti-uptier provisions, J.Crew blockers, anti-double-dip language, sacred rights evolution, and the lender evaluation checklist.",
        "tags": [1, 2, 3, 4, 5, 6, 7],
    },
    {
        "src": "05_Court_Rulings_Legal_Landscape.md",
        "slug": "court-rulings",
        "title": "Court Rulings & Legal Landscape",
        "subtitle": "Serta, Boardriders, Incora & Beyond",
        "icon": "&#9878;",
        "description": "Litigation outcomes from Serta, Boardriders, Incora/Wesco, and key legal doctrines shaping lender strategy.",
        "tags": [4],
    },
    {
        "src": "06_Lender_Strategy_Management_Alignment.md",
        "slug": "lender-strategy",
        "title": "Lender Strategy & Alignment",
        "subtitle": "Management Engagement & Dual-Track",
        "icon": "&#9881;",
        "description": "How creditor groups form, engage management, structure proposals, and execute lender-led restructurings.",
        "tags": [1, 2, 3, 4, 5, 6, 7],
    },
    {
        "src": "07_Odeon_Tranche_Analysis.md",
        "slug": "odeon-analysis",
        "title": "Odeon Tranche Analysis",
        "subtitle": "DOC 6 Deep Dive — UK Security & ICA",
        "icon": "&#9670;",
        "description": "Deep dive into Odeon Finco 12.75% Senior Secured Notes — UK security agent conventions, intercreditor mechanics, and restructuring scenarios.",
        "tags": [6],
    },
    {
        "src": "08_Muvico_Deep_Dive.md",
        "slug": "muvico-deep-dive",
        "title": "Muvico Deep Dive",
        "subtitle": "DOC 2/4/5/7 Cross-Document Analysis",
        "icon": "&#9830;",
        "description": "Comprehensive cross-document analysis of all Muvico instruments — lien priorities, interest mechanics, amendment thresholds, and restructuring scenarios.",
        "tags": [2, 4, 5, 7],
    },
]


def slugify(text):
    """Convert heading text to a URL-friendly slug."""
    text = re.sub(r'[^\w\s-]', '', text.lower())
    text = re.sub(r'[-\s]+', '-', text).strip('-')
    return text


def make_tag_html(tag_num):
    """Generate a DOC tag badge."""
    return f'<span class="tag tag-doc{tag_num}">DOC {tag_num}</span>'


def convert_markdown(filepath):
    """Read markdown file and convert to raw HTML string."""
    with open(filepath, 'r', encoding='utf-8') as f:
        md_text = f.read()
    # Convert to HTML using python-markdown with extensions
    raw_html = markdown.markdown(
        md_text,
        extensions=['tables', 'fenced_code', 'toc', 'smarty'],
        output_format='html5',
    )
    return raw_html


def detect_heading_levels(soup):
    """Detect which heading levels are used for articles vs sections.

    Some files use H1 for top-level content and H2 for subsections.
    Others use H2 for top-level and H3 for subsections.
    We detect the dominant pattern.
    """
    h1s = soup.find_all('h1')
    h2s = soup.find_all('h2')
    h3s = soup.find_all('h3')

    # If there are multiple H1s, they're content headings (articles)
    # with H2s as sections
    if len(h1s) > 2:
        return 'h1', 'h2'
    # Otherwise H2s are articles and H3s are sections
    return 'h2', 'h3'


def structure_content(raw_html):
    """Post-process HTML: wrap headings in doc-article/doc-section divs.

    Returns (structured_html, section_count).
    """
    soup = BeautifulSoup(raw_html, 'html.parser')

    article_tag, section_tag = detect_heading_levels(soup)

    # Add classes to tables and blockquotes first
    for table in soup.find_all('table'):
        existing = table.get('class', [])
        table['class'] = existing + ['research-table']

    for bq in soup.find_all('blockquote'):
        existing = bq.get('class', [])
        bq['class'] = existing + ['research-callout']

    # Now restructure: collect all top-level elements and group them
    # under article/section wrappers
    elements = list(soup.children)
    # Flatten to only direct children (skip whitespace NavigableStrings)
    elements = [e for e in elements if not (isinstance(e, NavigableString) and e.strip() == '')]

    result = BeautifulSoup('', 'html.parser')
    current_article = None
    current_section = None
    current_text = None
    section_count = 0
    seen_ids = set()

    def unique_id(base_id):
        uid = base_id
        counter = 2
        while uid in seen_ids:
            uid = f"{base_id}-{counter}"
            counter += 1
        seen_ids.add(uid)
        return uid

    def close_text(container):
        """Close current research-text div if open."""
        pass  # text divs are added inline

    def new_text_div():
        """Create a new research-text wrapper div."""
        div = result.new_tag('div')
        div['class'] = ['research-text']
        return div

    # Process elements sequentially
    for el in elements:
        if not hasattr(el, 'name'):
            continue

        if el.name == article_tag:
            # Close previous section/article
            current_section = None
            current_text = None

            heading_text = el.get_text().strip()
            slug = unique_id('art-' + slugify(heading_text))

            article_div = result.new_tag('div')
            article_div['class'] = ['doc-article']
            article_div['id'] = slug

            header_div = result.new_tag('div')
            header_div['class'] = ['article-header']
            header_div.string = heading_text

            article_div.append(header_div)
            result.append(article_div)
            current_article = article_div

        elif el.name == section_tag and current_article is not None:
            current_text = None
            section_count += 1

            heading_text = el.get_text().strip()
            slug = unique_id('sec-' + slugify(heading_text))

            section_div = result.new_tag('div')
            section_div['class'] = ['doc-section']
            section_div['id'] = slug

            header_div = result.new_tag('div')
            header_div['class'] = ['section-header']

            # Extract section number if present (e.g., "2.1", "3.2.1")
            num_match = re.match(r'^([\d]+(?:\.[\d]+)*)\s+', heading_text)
            if num_match:
                num_span = result.new_tag('span')
                num_span['class'] = ['section-number']
                num_span.string = num_match.group(1)
                header_div.append(num_span)
                title_text = heading_text[num_match.end():]
            else:
                title_text = heading_text

            title_span = result.new_tag('span')
            title_span['class'] = ['section-title']
            title_span.string = title_text

            header_div.append(title_span)
            section_div.append(header_div)
            current_article.append(section_div)
            current_section = section_div

        else:
            # Content element — wrap in research-text and append to current
            # section or article
            target = current_section or current_article
            if target is None:
                # Content before any heading — skip preamble/title content
                continue

            # Find or create research-text wrapper
            last_child = None
            for child in reversed(list(target.children)):
                if hasattr(child, 'name') and child.name is not None:
                    last_child = child
                    break

            if (last_child is not None and hasattr(last_child, 'get')
                    and 'research-text' in last_child.get('class', [])):
                text_div = last_child
            else:
                text_div = new_text_div()
                target.append(text_div)

            # Deep-copy the element into the text div
            import copy
            text_div.append(copy.copy(el))

    return str(result), section_count


def page_template(title, subtitle, slug, tags, section_count, content):
    """Wrap content in the standard site page template."""
    tag_html = ''
    for t in tags:
        tag_html += f'  <span class="tag tag-doc{t}">DOC {t}</span>\n'

    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AMC Debt Navigator - {html_mod.escape(title)}</title>
<link rel="stylesheet" href="../css/theme.css">
<link rel="stylesheet" href="../css/layout.css">
<link rel="stylesheet" href="../css/docs.css">
<link rel="stylesheet" href="../css/research.css">
</head>
<body data-page="research-{slug}" data-base="..">
<button class="mobile-toggle">&#9776;</button>
<div class="mobile-overlay"></div>
<div class="page-wrapper">
  <aside class="sidebar" id="sidebar"></aside>
  <main class="main-content">
    <header class="content-header" id="content-header" data-breadcrumb="Research &mdash; {html_mod.escape(title)}"></header>
    <div class="content-body">
      <div class="doc-layout">
        <div class="doc-toc">
          <div class="doc-toc-title">Contents</div>
          <div id="doc-toc-list"></div>
        </div>
        <div class="doc-content">
          <div class="doc-header">
            <div class="doc-type">Research</div>
            <h1>{html_mod.escape(title)}</h1>
            <div class="doc-meta">
              <div class="meta-item"><span class="meta-label">Topic:</span> {html_mod.escape(subtitle)}</div>
              <div class="meta-item"><span class="meta-label">Sections:</span> {section_count}</div>
            </div>
            <div style="margin-top:12px; display:flex; gap:8px; flex-wrap:wrap;">
{tag_html}            </div>
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
</html>'''


def hub_card(meta, section_count):
    """Generate a single card for the hub page."""
    tag_html = ''
    for t in meta['tags']:
        tag_html += f'        <span class="tag tag-doc{t}">DOC {t}</span>\n'

    return f'''    <a href="{meta['slug']}.html" class="research-card">
      <div class="research-card-icon">{meta['icon']}</div>
      <div class="research-card-body">
        <div class="research-card-title">{html_mod.escape(meta['title'])}</div>
        <div class="research-card-subtitle">{html_mod.escape(meta['subtitle'])}</div>
        <div class="research-card-desc">{html_mod.escape(meta['description'])}</div>
        <div class="research-card-meta">
          <span>{section_count} sections</span>
        </div>
        <div class="research-card-tags">
{tag_html}        </div>
      </div>
    </a>'''


def hub_page(cards_html):
    """Generate the research hub index page."""
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AMC Debt Navigator - Research Library</title>
<link rel="stylesheet" href="../css/theme.css">
<link rel="stylesheet" href="../css/layout.css">
<link rel="stylesheet" href="../css/docs.css">
<link rel="stylesheet" href="../css/research.css">
</head>
<body data-page="research" data-base="..">
<button class="mobile-toggle">&#9776;</button>
<div class="mobile-overlay"></div>
<div class="page-wrapper">
  <aside class="sidebar" id="sidebar"></aside>
  <main class="main-content">
    <header class="content-header" id="content-header" data-breadcrumb="Research Library"></header>
    <div class="content-body">
      <div class="research-hub-header">
        <div class="doc-type">Research</div>
        <h1>Research Library</h1>
        <p class="research-hub-subtitle">Deep-dive analyses covering LME mechanics, landmark case studies, legal rulings, credit doc countermeasures, and AMC-specific tranche analysis.</p>
      </div>
      <div class="research-hub-grid">
{cards_html}
      </div>
    </div>
  </main>
</div>
<script src="../js/components.js"></script>
</body>
</html>'''


def main():
    os.makedirs(RESEARCH_OUT, exist_ok=True)

    cards = []
    total_sections = 0

    for meta in RESEARCH_FILES:
        src_path = os.path.join(RESEARCH_SRC, meta['src'])
        if not os.path.exists(src_path):
            print(f"WARNING: {src_path} not found, skipping")
            continue

        print(f"Processing {meta['src']} -> {meta['slug']}.html ...")

        # Convert markdown to HTML
        raw_html = convert_markdown(src_path)

        # Structure content with doc-article / doc-section wrappers
        content, section_count = structure_content(raw_html)
        total_sections += section_count

        # Generate full page
        page_html = page_template(
            title=meta['title'],
            subtitle=meta['subtitle'],
            slug=meta['slug'],
            tags=meta['tags'],
            section_count=section_count,
            content=content,
        )

        # Write output
        out_path = os.path.join(RESEARCH_OUT, f"{meta['slug']}.html")
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(page_html)
        print(f"  -> {out_path} ({section_count} sections)")

        # Build card for hub
        cards.append(hub_card(meta, section_count))

    # Generate hub page
    cards_html = '\n'.join(cards)
    hub_html = hub_page(cards_html)
    hub_path = os.path.join(RESEARCH_OUT, 'index.html')
    with open(hub_path, 'w', encoding='utf-8') as f:
        f.write(hub_html)
    print(f"\nHub page -> {hub_path} ({len(cards)} cards)")
    print(f"Total: {len(cards) + 1} HTML files, {total_sections} sections across all articles")


if __name__ == '__main__':
    main()
