/* ═══════════════════════════════════════════════
   AMC Debt Navigator - Search Engine
   Uses Lunr.js for full-text search
   Falls back to simple substring matching if Lunr unavailable
   ═══════════════════════════════════════════════ */

(function() {
  'use strict';

  var docs = window.AMC_SEARCH_DOCS || [];
  var base = document.body.getAttribute('data-base') || '.';
  var searchInput = document.getElementById('search-input');
  var resultsContainer = document.getElementById('search-results');
  var resultCount = document.getElementById('result-count');
  var lunrIndex = null;

  // ── Build Lunr Index ──
  function buildIndex() {
    if (typeof lunr !== 'undefined') {
      lunrIndex = lunr(function() {
        this.ref('id');
        this.field('title', { boost: 10 });
        this.field('summary', { boost: 5 });
        this.field('keywords', { boost: 8 });
        this.field('docName', { boost: 3 });
        this.field('section', { boost: 2 });
        this.field('article');
        this.field('content', { boost: 1 });

        for (var i = 0; i < docs.length; i++) {
          this.add(docs[i]);
        }
      });
    }
  }

  // ── Lookup doc by id ──
  function getDoc(id) {
    for (var i = 0; i < docs.length; i++) {
      if (docs[i].id === id) return docs[i];
    }
    return null;
  }

  // ── Highlight matches ──
  function highlight(text, terms) {
    if (!terms || terms.length === 0) return escapeHtml(text);
    var escaped = escapeHtml(text);
    for (var i = 0; i < terms.length; i++) {
      var term = terms[i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (term.length < 2) continue;
      var re = new RegExp('(' + term + ')', 'gi');
      escaped = escaped.replace(re, '<mark>$1</mark>');
    }
    return escaped;
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // ── Context-aware snippet extraction ──
  function getSnippet(doc, terms) {
    var summary = doc.summary || '';
    if (!terms || terms.length === 0 || !doc.content) return summary;

    // Check if any term appears in summary already
    var summaryLower = summary.toLowerCase();
    for (var i = 0; i < terms.length; i++) {
      if (terms[i].length > 1 && summaryLower.indexOf(terms[i].toLowerCase()) !== -1) {
        return summary;
      }
    }

    // Search in content for best match
    var content = doc.content;
    var contentLower = content.toLowerCase();
    var bestPos = -1;

    for (var i = 0; i < terms.length; i++) {
      var pos = contentLower.indexOf(terms[i].toLowerCase());
      if (pos !== -1) {
        bestPos = pos;
        break;
      }
    }

    if (bestPos === -1) return summary;

    // Extract ~200 char window around match
    var windowSize = 100;
    var start = Math.max(0, bestPos - windowSize);
    var end = Math.min(content.length, bestPos + windowSize);

    // Snap to word boundaries
    if (start > 0) {
      var spaceAfter = content.indexOf(' ', start);
      if (spaceAfter !== -1 && spaceAfter < bestPos) start = spaceAfter + 1;
    }
    if (end < content.length) {
      var spaceBefore = content.lastIndexOf(' ', end);
      if (spaceBefore > bestPos) end = spaceBefore;
    }

    var snippet = '';
    if (start > 0) snippet += '...';
    snippet += content.substring(start, end).trim();
    if (end < content.length) snippet += '...';

    return snippet || summary;
  }

  // ── Simple fallback search (no Lunr) ──
  function simpleSearch(query) {
    var terms = query.toLowerCase().split(/\s+/).filter(function(t) { return t.length > 0; });
    if (terms.length === 0) return [];

    var scored = [];
    for (var i = 0; i < docs.length; i++) {
      var d = docs[i];
      var searchable = (d.title + ' ' + d.summary + ' ' + (d.keywords || '') + ' ' + d.docName + ' ' + d.section + ' ' + (d.content || '')).toLowerCase();
      var score = 0;
      var allMatch = true;

      for (var j = 0; j < terms.length; j++) {
        var idx = searchable.indexOf(terms[j]);
        if (idx !== -1) {
          score += 10;
          // Boost for title matches
          if (d.title.toLowerCase().indexOf(terms[j]) !== -1) score += 20;
          // Boost for keyword matches
          if ((d.keywords || '').toLowerCase().indexOf(terms[j]) !== -1) score += 15;
        } else {
          allMatch = false;
        }
      }

      if (score > 0 && (allMatch || terms.length === 1)) {
        scored.push({ doc: d, score: score });
      }
    }

    scored.sort(function(a, b) { return b.score - a.score; });
    return scored.map(function(s) { return s.doc; });
  }

  // ── Lunr search ──
  function lunrSearch(query) {
    if (!lunrIndex) return simpleSearch(query);
    try {
      var results = lunrIndex.search(query + '~1'); // fuzzy
      if (results.length === 0) {
        // Try without fuzzy
        results = lunrIndex.search(query);
      }
      if (results.length === 0) {
        // Try wildcard
        var terms = query.split(/\s+/).filter(function(t) { return t.length > 0; });
        var wildQuery = terms.map(function(t) { return t + '*'; }).join(' ');
        results = lunrIndex.search(wildQuery);
      }
      return results.map(function(r) { return getDoc(r.ref); }).filter(Boolean);
    } catch (e) {
      return simpleSearch(query);
    }
  }

  // ── Render results ──
  function renderResults(results, query) {
    var terms = query.split(/\s+/).filter(function(t) { return t.length > 1; });

    if (query.length === 0) {
      var uniqueDocs = {};
      for (var i = 0; i < docs.length; i++) uniqueDocs[docs[i].doc] = true;
      var docCount = Object.keys(uniqueDocs).length;
      resultCount.textContent = docs.length + ' sections indexed across ' + docCount + ' documents';
      resultsContainer.innerHTML = '<div class="search-empty">'
        + '<div class="search-empty-icon">&#8981;</div>'
        + '<div class="search-empty-text">Enter a search term to find sections across all ' + docCount + ' debt documents</div>'
        + '<div class="search-suggestions">'
        + '<span class="search-tag" data-query="covenant strip">covenant strip</span>'
        + '<span class="search-tag" data-query="cash hoarding">cash hoarding</span>'
        + '<span class="search-tag" data-query="exchange mechanics">exchange mechanics</span>'
        + '<span class="search-tag" data-query="events of default">events of default</span>'
        + '<span class="search-tag" data-query="PIK">PIK</span>'
        + '<span class="search-tag" data-query="restricted payments">restricted payments</span>'
        + '<span class="search-tag" data-query="liens">liens</span>'
        + '<span class="search-tag" data-query="change of control">change of control</span>'
        + '</div>'
        + '</div>';
      bindSuggestionTags();
      return;
    }

    if (results.length === 0) {
      resultCount.textContent = 'No results';
      resultsContainer.innerHTML = '<div class="search-empty">'
        + '<div class="search-empty-icon">&#8709;</div>'
        + '<div class="search-empty-text">No sections match "<strong>' + escapeHtml(query) + '</strong>"</div>'
        + '<div style="color:var(--text-dim); font-size:11px; margin-top:8px;">Try different keywords or check spelling</div>'
        + '</div>';
      return;
    }

    resultCount.textContent = results.length + ' result' + (results.length !== 1 ? 's' : '');

    var html = '';
    for (var i = 0; i < results.length; i++) {
      var d = results[i];
      var url = base + '/' + d.url;
      var docClass = 'doc-tag-' + d.doc;

      var snippet = getSnippet(d, terms);
      html += '<a href="' + url + '" class="search-result">'
        + '<div class="search-result-header">'
        + '  <span class="search-result-doc ' + docClass + '">' + escapeHtml(d.docName) + '</span>'
        + '  <span class="search-result-section">' + escapeHtml(d.section) + '</span>'
        + '</div>'
        + '<div class="search-result-title">' + highlight(d.title, terms) + '</div>'
        + '<div class="search-result-summary">' + highlight(snippet, terms) + '</div>'
        + '</a>';
    }

    resultsContainer.innerHTML = html;
  }

  // ── Bind suggestion tags ──
  function bindSuggestionTags() {
    var tags = document.querySelectorAll('.search-tag');
    for (var i = 0; i < tags.length; i++) {
      tags[i].addEventListener('click', function() {
        var q = this.getAttribute('data-query');
        searchInput.value = q;
        doSearch(q);
        searchInput.focus();
      });
    }
  }

  // ── Debounce ──
  var debounceTimer = null;
  function debounce(fn, delay) {
    return function() {
      var args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function() { fn.apply(null, args); }, delay);
    };
  }

  // ── Main search function ──
  function doSearch(query) {
    query = query.trim();
    var results = query.length > 0 ? lunrSearch(query) : [];
    renderResults(results, query);
  }

  // ── Initialize ──
  function init() {
    if (!searchInput || !resultsContainer || !resultCount) return;

    buildIndex();

    // Initial state
    renderResults([], '');

    // Search on input with debounce
    var debouncedSearch = debounce(function(q) { doSearch(q); }, 200);
    searchInput.addEventListener('input', function() {
      debouncedSearch(this.value);
    });

    // Immediate search on Enter
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        clearTimeout(debounceTimer);
        doSearch(this.value);
      }
    });

    // Check for URL query parameter
    var params = new URLSearchParams(window.location.search);
    var q = params.get('q');
    if (q) {
      searchInput.value = q;
      doSearch(q);
    }

    // Focus search input
    searchInput.focus();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
