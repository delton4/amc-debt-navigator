#!/usr/bin/env python3
"""
Build full-text search index from HTML document pages.

Reads all 9 HTML files in site/docs/, extracts every section's text,
and outputs site/data/search-docs.js for Lunr.js indexing.
"""

import json
import os
import re
from bs4 import BeautifulSoup

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
SITE_DIR = os.path.dirname(SCRIPT_DIR)
DOCS_DIR = os.path.join(SITE_DIR, "docs")
OUTPUT_FILE = os.path.join(SITE_DIR, "data", "search-docs.js")

# Document metadata keyed by data-page attribute
DOC_META = {
    "doc1": {"doc": 1, "docName": "DOC 1: Covenant Strip"},
    "doc2": {"doc": 2, "docName": "DOC 2: Muvico 15% PIK"},
    "doc3": {"doc": 3, "docName": "DOC 3: AMC 7.5% Notes"},
    "doc4": {"doc": 4, "docName": "DOC 4: $2B Term Loan"},
    "doc5": {"doc": 5, "docName": "DOC 5: Muvico 8% PIK Exch."},
    "doc6": {"doc": 6, "docName": "DOC 6: Odeon 12.75%"},
    "doc6-ex": {"doc": 6, "docName": "DOC 6: Odeon 12.75% (Exhibits)"},
    "doc7": {"doc": 7, "docName": "DOC 7: 6/8% PIK Toggle"},
    "doc7-ex": {"doc": 7, "docName": "DOC 7: 6/8% PIK Toggle (Exhibits)"},
}

# Map data-page to HTML filename
PAGE_TO_FILE = {
    "doc1": "doc1-covenant-strip.html",
    "doc2": "doc2-muvico-secured-2029.html",
    "doc3": "doc3-amc-7500-notes.html",
    "doc4": "doc4-credit-agreement.html",
    "doc5": "doc5-exchangeable-2030.html",
    "doc6": "doc6-odeon-notes.html",
    "doc6-ex": "doc6-odeon-exhibits.html",
    "doc7": "doc7-pik-toggle.html",
    "doc7-ex": "doc7-pik-toggle-exhibits.html",
}

CONTENT_MAX = 3000
SUMMARY_MAX = 250


def clean_text(element):
    """Extract and clean text from a BeautifulSoup element."""
    if element is None:
        return ""
    text = element.get_text(separator=" ", strip=True)
    # Collapse whitespace
    text = re.sub(r"\s+", " ", text).strip()
    return text


def truncate(text, limit):
    """Truncate text to limit, breaking at word boundary."""
    if len(text) <= limit:
        return text
    truncated = text[:limit]
    # Break at last space
    last_space = truncated.rfind(" ")
    if last_space > limit * 0.7:
        truncated = truncated[:last_space]
    return truncated + "..."


def extract_defined_terms(element):
    """Extract defined-term data-term values from an element."""
    terms = []
    for dt in element.select(".defined-term[data-term]"):
        term = dt.get("data-term", "").strip()
        if term:
            terms.append(term)
    return list(dict.fromkeys(terms))  # dedupe preserving order


def get_article_name(section_el):
    """Walk up to find the parent doc-article's header."""
    article = section_el.find_parent("div", class_="doc-article")
    if article:
        header = article.select_one(".article-header")
        if header:
            return clean_text(header)
    return ""


def get_article_id(section_el):
    """Get the id of the parent doc-article."""
    article = section_el.find_parent("div", class_="doc-article")
    if article:
        return article.get("id", "")
    return ""


def process_section(section, page_id, filename, meta):
    """Process a single doc-section element into a search entry."""
    sec_id = section.get("id", "")
    if not sec_id:
        return None

    section_number_el = section.select_one(".section-number")
    section_title_el = section.select_one(".section-title")
    section_number = clean_text(section_number_el) if section_number_el else ""
    section_title = clean_text(section_title_el) if section_title_el else ""

    article_name = get_article_name(section)

    # Gather text from all sources
    translation_parts = []
    for tt in section.select(".translation-text"):
        translation_parts.append(clean_text(tt))
    translation_text = " ".join(translation_parts)

    legal_parts = []
    for lt in section.select(".legal-text"):
        legal_parts.append(clean_text(lt))
    legal_text = " ".join(legal_parts)

    raw_parts = []
    for rs in section.select(".raw-section"):
        raw_parts.append(clean_text(rs))
    raw_text = " ".join(raw_parts)

    # Build content: all text sources combined
    content_parts = [p for p in [translation_text, legal_text, raw_text] if p]
    content = " ".join(content_parts)
    content = truncate(content, CONTENT_MAX)

    # Build summary: prefer translation, fall back to legal/raw
    summary_source = translation_text or legal_text or raw_text
    summary = truncate(summary_source, SUMMARY_MAX)

    # Extract defined terms as keywords
    terms = extract_defined_terms(section)
    keywords = " ".join(terms)

    entry_id = f"{page_id}-{sec_id}"

    return {
        "id": entry_id,
        "doc": meta["doc"],
        "docName": meta["docName"],
        "article": article_name,
        "section": section_number,
        "title": section_title,
        "url": f"docs/{filename}#{sec_id}",
        "summary": summary,
        "keywords": keywords,
        "content": content,
    }


def process_article_level(article, page_id, filename, meta):
    """Process a doc-article that has no doc-section children (exhibits)."""
    art_id = article.get("id", "")
    if not art_id:
        return None

    header_el = article.select_one(".article-header")
    article_name = clean_text(header_el) if header_el else ""

    # Gather all text within the article
    translation_parts = []
    for tt in article.select(".translation-text"):
        translation_parts.append(clean_text(tt))
    translation_text = " ".join(translation_parts)

    legal_parts = []
    for lt in article.select(".legal-text"):
        legal_parts.append(clean_text(lt))
    legal_text = " ".join(legal_parts)

    raw_parts = []
    for rs in article.select(".raw-section"):
        raw_parts.append(clean_text(rs))
    raw_text = " ".join(raw_parts)

    content_parts = [p for p in [translation_text, legal_text, raw_text] if p]
    content = " ".join(content_parts)
    content = truncate(content, CONTENT_MAX)

    summary_source = translation_text or legal_text or raw_text
    summary = truncate(summary_source, SUMMARY_MAX)

    terms = extract_defined_terms(article)
    keywords = " ".join(terms)

    entry_id = f"{page_id}-{art_id}"

    return {
        "id": entry_id,
        "doc": meta["doc"],
        "docName": meta["docName"],
        "article": article_name,
        "section": article_name,
        "title": article_name,
        "url": f"docs/{filename}#{art_id}",
        "summary": summary,
        "keywords": keywords,
        "content": content,
    }


def process_file(page_id, filename):
    """Process a single HTML file and return list of search entries."""
    filepath = os.path.join(DOCS_DIR, filename)
    if not os.path.exists(filepath):
        print(f"  WARNING: {filepath} not found, skipping")
        return []

    meta = DOC_META[page_id]

    with open(filepath, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f.read(), "html.parser")

    entries = []

    # Process all doc-sections first
    sections = soup.select(".doc-section")
    for section in sections:
        entry = process_section(section, page_id, filename, meta)
        if entry and (entry["content"] or entry["summary"]):
            entries.append(entry)

    # For articles that have NO doc-section children, index at article level
    # (this handles exhibit files)
    articles = soup.select(".doc-article")
    for article in articles:
        child_sections = article.select(".doc-section")
        if not child_sections:
            entry = process_article_level(article, page_id, filename, meta)
            if entry and (entry["content"] or entry["summary"]):
                entries.append(entry)

    # Also index article-level overview text for articles that DO have sections
    # This captures the article overview translation blocks
    for article in articles:
        child_sections = article.select(".doc-section")
        if child_sections:
            art_id = article.get("id", "")
            if not art_id:
                continue
            # Get only direct translation blocks (not from child sections)
            header_el = article.select_one(".article-header")
            article_name = clean_text(header_el) if header_el else ""

            # Find translation blocks that are direct children of the article
            # (not nested inside doc-section)
            overview_text = ""
            for tb in article.find_all("div", class_="translation-block", recursive=False):
                for tt in tb.select(".translation-text"):
                    overview_text += " " + clean_text(tt)

            overview_text = overview_text.strip()
            if overview_text:
                entry_id = f"{page_id}-{art_id}"
                # Skip if we already have this id from a section
                existing_ids = {e["id"] for e in entries}
                if entry_id not in existing_ids:
                    entries.append({
                        "id": entry_id,
                        "doc": meta["doc"],
                        "docName": meta["docName"],
                        "article": article_name,
                        "section": article_name,
                        "title": article_name + " - Overview",
                        "url": f"docs/{filename}#{art_id}",
                        "summary": truncate(overview_text, SUMMARY_MAX),
                        "keywords": "",
                        "content": truncate(overview_text, CONTENT_MAX),
                    })

    return entries


def main():
    all_entries = []

    for page_id, filename in PAGE_TO_FILE.items():
        print(f"Processing {filename} ({page_id})...")
        entries = process_file(page_id, filename)
        print(f"  -> {len(entries)} entries")
        all_entries.append((page_id, entries))

    # Sort: by doc number, then by order within file
    final = []
    for page_id, entries in sorted(all_entries, key=lambda x: DOC_META[x[0]]["doc"]):
        final.extend(entries)

    # Write output
    json_str = json.dumps(final, indent=2, ensure_ascii=False)
    output = f"/* AMC Debt Navigator - Search Index Data */\n/* Auto-generated by build_search_index.py - DO NOT EDIT MANUALLY */\n\nwindow.AMC_SEARCH_DOCS = {json_str};\n"

    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(output)

    unique_docs = len(set(e["doc"] for e in final))
    print(f"\nDone! {len(final)} entries across {unique_docs} documents")
    print(f"Output: {OUTPUT_FILE}")
    print(f"File size: {len(output):,} bytes ({len(output)/1024:.1f} KB)")


if __name__ == "__main__":
    main()
