/* ═══════════════════════════════════════════════
   Auto-Link Engine
   Scans legal text containers and converts dead
   section / document references into hyperlinks.
   ═══════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Document Map ── */
  var DOC_MAP = [
    { pattern: /Term\s+Loan\s+Credit\s+Agreement/i, url: 'doc4-credit-agreement.html' },
    { pattern: /Credit\s+Agreement/i, url: 'doc4-credit-agreement.html' },
    { pattern: /Muvico\s+Senior\s+Secured\s+Notes/i, url: 'doc2-muvico-secured-2029.html' },
    { pattern: /15%\s+PIK\s+Notes/i, url: 'doc2-muvico-secured-2029.html' },
    { pattern: /Senior\s+Secured\s+Notes\s+due\s+2029/i, url: 'doc2-muvico-secured-2029.html' },
    { pattern: /7[.,]500%\s+Senior\s+Secured\s+Notes/i, url: 'doc3-amc-7500-notes.html' },
    { pattern: /AMC\s+7\.?5%\s+Notes/i, url: 'doc3-amc-7500-notes.html' },
    { pattern: /Exchangeable\s+Notes/i, url: 'doc5-exchangeable-2030.html' },
    { pattern: /Senior\s+Secured\s+Exchangeable\s+Notes\s+due\s+2030/i, url: 'doc5-exchangeable-2030.html' },
    { pattern: /12[.,]750%\s+Senior\s+Secured\s+Notes/i, url: 'doc6-odeon-notes.html' },
    { pattern: /Odeon[\s\S]{0,30}Notes/i, url: 'doc6-odeon-notes.html' },
    { pattern: /Cash\/PIK\s+Toggle/i, url: 'doc7-pik-toggle.html' },
    { pattern: /PIK\s+Toggle/i, url: 'doc7-pik-toggle.html' },
    { pattern: /6[.,]00%\/8[.,]00%/i, url: 'doc7-pik-toggle.html' }
  ];

  /* ── DOC Number → URL Map ── */
  var DOC_NUM_MAP = {
    1: 'doc1-covenant-strip.html',
    2: 'doc2-muvico-secured-2029.html',
    3: 'doc3-amc-7500-notes.html',
    4: 'doc4-credit-agreement.html',
    5: 'doc5-exchangeable-2030.html',
    6: 'doc6-odeon-notes.html',
    7: 'doc7-pik-toggle.html'
  };

  /* ── Regex Patterns ── */

  // Tier 1 – Cross-doc section refs: "Section 4.05 of the Credit Agreement"
  var CROSS_DOC_RE = /\b(Section\s+(\d+(?:\.\d+)*))\s+of\s+the\s+((?:(?:Term\s+Loan\s+)?Credit\s+Agreement|Muvico\s+Senior\s+Secured\s+Notes|15%\s+PIK\s+Notes|Senior\s+Secured\s+Notes\s+due\s+2029|7[.,]500%\s+Senior\s+Secured\s+Notes|AMC\s+7\.?5%\s+Notes|(?:Senior\s+Secured\s+)?Exchangeable\s+Notes(?:\s+due\s+2030)?|12[.,]750%\s+Senior\s+Secured\s+Notes|Odeon[\s\S]{0,30}Notes|Cash\/PIK\s+Toggle|PIK\s+Toggle|6[.,]00%\/8[.,]00%))/gi;

  // Tier 2 – Same-page section/article refs
  var SECTION_RE = /\bSection\s+(\d+(?:\.\d+)*)\b/g;
  var ARTICLE_RE = /\bArticle\s+((?:X{0,3})(?:IX|IV|V?I{0,3})(?:-[A-Z])?)\b/g;

  // Tier 0.5 – DOC number + section refs: "DOC 4 Section 6.13" or "DOC 4, Section 6.13"
  var DOC_NUM_SECTION_RE = /\bDOC\s+(\d)\s*[,:]?\s*(?:Section|Sec\.?)\s+(\d+(?:\.\d+)*)\b/gi;
  // Tier 3.5 – Standalone DOC number refs: "DOC 4"
  var DOC_NUM_STANDALONE_RE = /\bDOC\s+(\d)\b/g;

  // Tier 3 – Named document refs: "the Credit Agreement"
  var NAMED_DOC_RE = /\bthe\s+(Term\s+Loan\s+Credit\s+Agreement|Credit\s+Agreement|Muvico\s+Senior\s+Secured\s+Notes|15%\s+PIK\s+Notes|Senior\s+Secured\s+Notes\s+due\s+2029|7[.,]500%\s+Senior\s+Secured\s+Notes|AMC\s+7\.?5%\s+Notes|Senior\s+Secured\s+Exchangeable\s+Notes\s+due\s+2030|Exchangeable\s+Notes|12[.,]750%\s+Senior\s+Secured\s+Notes|Cash\/PIK\s+Toggle|PIK\s+Toggle)\b/gi;

  /* ── Helpers ── */

  var SKIP_TAGS = { A: 1, SCRIPT: 1, STYLE: 1 };

  function isInsideSkip(node) {
    var el = node.parentElement;
    while (el) {
      if (SKIP_TAGS[el.tagName]) return true;
      if (el.classList && el.classList.contains('defined-term')) return true;
      el = el.parentElement;
    }
    return false;
  }

  function sectionNumToAnchor(num) {
    // "4.05" → "sec-4-05", "6.13" → "sec-6-13"
    return 'sec-' + num.replace(/\./g, '-');
  }

  function resolveDocUrl(name) {
    for (var i = 0; i < DOC_MAP.length; i++) {
      if (DOC_MAP[i].pattern.test(name)) {
        DOC_MAP[i].pattern.lastIndex = 0;
        return DOC_MAP[i].url;
      }
    }
    return null;
  }

  function docsBasePath() {
    // Determine the relative path to the docs/ folder from the current page
    var path = window.location.pathname;
    if (path.indexOf('/docs/') !== -1) return '';
    if (path.indexOf('/research/') !== -1) return '../docs/';
    if (path.indexOf('/models/') !== -1) return '../docs/';
    return 'docs/';
  }

  function makeLink(text, href, className) {
    var a = document.createElement('a');
    a.href = href;
    a.className = className;
    a.textContent = text;
    return a;
  }

  /* ── Core Processing ── */

  function processTextNode(textNode) {
    if (isInsideSkip(textNode)) return;

    var text = textNode.nodeValue;
    if (!text || !text.trim()) return;

    // Quick bail-out: does the text contain anything linkable?
    if (!/DOC|Section|Article|Credit Agreement|Notes|PIK|Exchangeable|Odeon|Indenture|Toggle|Muvico|7[.,]500|12[.,]750|6[.,]00/i.test(text)) {
      return;
    }

    var fragments = [];
    var lastIndex = 0;
    var basePath = docsBasePath();

    // We process by finding all matches across all tiers,
    // then applying them in document order without overlaps.
    var matches = [];

    // Tier 0.5: DOC number + section refs (e.g. "DOC 4 Section 6.13")
    DOC_NUM_SECTION_RE.lastIndex = 0;
    var m;
    while ((m = DOC_NUM_SECTION_RE.exec(text)) !== null) {
      var docFile = DOC_NUM_MAP[parseInt(m[1])];
      if (docFile) {
        matches.push({
          start: m.index,
          end: m.index + m[0].length,
          text: m[0],
          href: basePath + docFile + '#' + sectionNumToAnchor(m[2]),
          className: 'cross-doc-ref',
          priority: 0
        });
      }
    }

    // Tier 1: Cross-doc section refs
    CROSS_DOC_RE.lastIndex = 0;
    while ((m = CROSS_DOC_RE.exec(text)) !== null) {
      var docUrl = resolveDocUrl(m[3]);
      if (docUrl) {
        matches.push({
          start: m.index,
          end: m.index + m[0].length,
          text: m[0],
          href: basePath + docUrl + '#' + sectionNumToAnchor(m[2]),
          className: 'cross-doc-ref',
          priority: 1
        });
      }
    }

    // Tier 2a: Same-page section refs
    SECTION_RE.lastIndex = 0;
    while ((m = SECTION_RE.exec(text)) !== null) {
      var anchor = sectionNumToAnchor(m[1]);
      if (document.getElementById(anchor)) {
        matches.push({
          start: m.index,
          end: m.index + m[0].length,
          text: m[0],
          href: '#' + anchor,
          className: 'section-ref',
          priority: 2
        });
      }
    }

    // Tier 2b: Same-page article refs
    ARTICLE_RE.lastIndex = 0;
    while ((m = ARTICLE_RE.exec(text)) !== null) {
      var artAnchor = 'art-' + m[1];
      if (document.getElementById(artAnchor)) {
        matches.push({
          start: m.index,
          end: m.index + m[0].length,
          text: m[0],
          href: '#' + artAnchor,
          className: 'section-ref',
          priority: 2
        });
      }
    }

    // Tier 3: Named document refs
    NAMED_DOC_RE.lastIndex = 0;
    while ((m = NAMED_DOC_RE.exec(text)) !== null) {
      var namedUrl = resolveDocUrl(m[1]);
      if (namedUrl) {
        // Don't link if it's the current page
        var currentFile = window.location.pathname.split('/').pop();
        if (namedUrl === currentFile) continue;
        matches.push({
          start: m.index,
          end: m.index + m[0].length,
          text: m[0],
          href: basePath + namedUrl,
          className: 'cross-doc-ref',
          priority: 3
        });
      }
    }

    // Tier 3.5: Standalone DOC number refs (e.g. "DOC 4")
    DOC_NUM_STANDALONE_RE.lastIndex = 0;
    while ((m = DOC_NUM_STANDALONE_RE.exec(text)) !== null) {
      var standaloneFile = DOC_NUM_MAP[parseInt(m[1])];
      if (standaloneFile) {
        matches.push({
          start: m.index,
          end: m.index + m[0].length,
          text: m[0],
          href: basePath + standaloneFile,
          className: 'cross-doc-ref',
          priority: 4
        });
      }
    }

    if (matches.length === 0) return;

    // Sort by start position, then by priority (lower = higher priority)
    matches.sort(function (a, b) {
      if (a.start !== b.start) return a.start - b.start;
      return a.priority - b.priority;
    });

    // Remove overlapping matches (higher-priority wins)
    var filtered = [matches[0]];
    for (var i = 1; i < matches.length; i++) {
      var prev = filtered[filtered.length - 1];
      if (matches[i].start >= prev.end) {
        filtered.push(matches[i]);
      }
      // If it overlaps, skip it (the earlier/higher-priority one wins)
    }

    // Build fragments
    lastIndex = 0;
    for (var j = 0; j < filtered.length; j++) {
      var match = filtered[j];
      if (match.start > lastIndex) {
        fragments.push(document.createTextNode(text.slice(lastIndex, match.start)));
      }
      fragments.push(makeLink(match.text, match.href, match.className));
      lastIndex = match.end;
    }
    if (lastIndex < text.length) {
      fragments.push(document.createTextNode(text.slice(lastIndex)));
    }

    // Replace the text node with the fragments
    var parent = textNode.parentNode;
    for (var k = 0; k < fragments.length; k++) {
      parent.insertBefore(fragments[k], textNode);
    }
    parent.removeChild(textNode);
  }

  function processContainer(container) {
    // Use TreeWalker to iterate text nodes
    var walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    // Collect all text nodes first (we'll mutate the DOM during processing)
    var textNodes = [];
    var node;
    while ((node = walker.nextNode())) {
      textNodes.push(node);
    }

    for (var i = 0; i < textNodes.length; i++) {
      processTextNode(textNodes[i]);
    }
  }

  /* ── Init ── */

  function init() {
    var containers = document.querySelectorAll('.legal-text, .raw-section, .translation-text, .research-text');
    for (var i = 0; i < containers.length; i++) {
      processContainer(containers[i]);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
