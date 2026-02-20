/* ═══════════════════════════════════════════════
   AMC Debt Navigator - Unified Cross-Link System
   Replaces auto-link.js + tooltips.js with a
   single scanning/linking/tooltip engine.
   ═══════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ════════════════════════════════════════════
     (a) DOCUMENT MAP
     ════════════════════════════════════════════ */

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

  var DOC_NUM_MAP = {
    1: 'doc1-covenant-strip.html',
    2: 'doc2-muvico-secured-2029.html',
    3: 'doc3-amc-7500-notes.html',
    4: 'doc4-credit-agreement.html',
    5: 'doc5-exchangeable-2030.html',
    6: 'doc6-odeon-notes.html',
    7: 'doc7-pik-toggle.html'
  };

  var DOC_NUM_NAMES = {
    1: 'Covenant Strip (6.125% Sub Notes)',
    2: 'Muvico 15% PIK Senior Secured Notes',
    3: 'AMC 7.500% Senior Secured Notes',
    4: '$2B Term Loan Credit Agreement',
    5: 'Muvico 8% PIK Exchangeable Notes',
    6: 'Odeon 12.75% Senior Secured Notes',
    7: '6/8% PIK Toggle Exchangeable Notes'
  };

  /* ════════════════════════════════════════════
     (b) DEFINITIONS
     Load definitions.js which sets window.AMC_DEFINITIONS
     ════════════════════════════════════════════ */

  var definitions = {};
  var definitionsReady = false;
  var definitionsCallbacks = [];

  function onDefinitionsReady(fn) {
    if (definitionsReady) { fn(); return; }
    definitionsCallbacks.push(fn);
  }

  function fireDefinitionsReady() {
    definitionsReady = true;
    for (var i = 0; i < definitionsCallbacks.length; i++) {
      definitionsCallbacks[i]();
    }
    definitionsCallbacks = [];
  }

  var base = document.body ? (document.body.getAttribute('data-base') || '.') : '.';
  var defScript = document.createElement('script');
  defScript.src = base + '/data/definitions.js';
  defScript.onload = function () {
    if (window.AMC_DEFINITIONS) {
      definitions = window.AMC_DEFINITIONS;
    }
    fireDefinitionsReady();
  };
  defScript.onerror = function () {
    // Definitions not available — tooltips for terms won't work but site still functions
    fireDefinitionsReady();
  };
  document.head.appendChild(defScript);

  /* ════════════════════════════════════════════
     (c) TRANCHE DATA
     ════════════════════════════════════════════ */

  var TRANCHES = {
    "term-loan":    { name: "$2B Term Loan",      lien: "1L",     face: 1999.1, entity: "muvico", color: "#dc2626", doc: "DOC 4" },
    "muvico-8pik":  { name: "Muvico 8% PIK",      lien: "1.25L",  face: 154.5,  entity: "muvico", color: "#ea580c", doc: "DOC 5" },
    "muvico-15pik": { name: "Muvico 15% PIK",     lien: "1.5L",   face: 857.0,  entity: "muvico", color: "#d97706", doc: "DOC 2" },
    "muvico-6-8pik":{ name: "6/8% PIK Toggle",    lien: "2L",     face: 107.4,  entity: "muvico", color: "#ca8a04", doc: "DOC 7" },
    "amc-750":      { name: "AMC 7.5%",           lien: "2L",     face: 360.0,  entity: "amc",    color: "#6b7280", doc: "DOC 3" },
    "odeon-1275":   { name: "Odeon 12.75%",        lien: "1L-Ode", face: 400.0,  entity: "odeon",  color: "#3b82f6", doc: "DOC 6" },
    "amc-sub":      { name: "AMC 6.125% Sub",      lien: "Sub",    face: 125.5,  entity: "amc",    color: "#a855f7", doc: "DOC 1" }
  };

  /* ════════════════════════════════════════════
     (d) LINK ENGINE
     Exact replica of auto-link.js tiers & logic
     ════════════════════════════════════════════ */

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

  /* ── Core Text-Node Processing ── */

  function processTextNode(textNode) {
    if (isInsideSkip(textNode)) return;

    var text = textNode.nodeValue;
    if (!text || !text.trim()) return;

    // Quick bail-out: does the text contain anything linkable?
    if (!/DOC|Section|Article|Credit Agreement|Notes|PIK|Exchangeable|Odeon|Indenture|Toggle|Muvico|7[.,]500|12[.,]750|6[.,]00/i.test(text)) {
      return;
    }

    var basePath = docsBasePath();
    var matches = [];
    var m;

    // Tier 0.5: DOC number + section refs (e.g. "DOC 4 Section 6.13")
    DOC_NUM_SECTION_RE.lastIndex = 0;
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
    var fragments = [];
    var lastIndex = 0;
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
    var walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    var textNodes = [];
    var node;
    while ((node = walker.nextNode())) {
      textNodes.push(node);
    }

    for (var i = 0; i < textNodes.length; i++) {
      processTextNode(textNodes[i]);
    }
  }

  function runLinkEngine() {
    var containers = document.querySelectorAll('.legal-text, .raw-section, .translation-text, .research-text');
    for (var i = 0; i < containers.length; i++) {
      processContainer(containers[i]);
    }
  }

  /* ════════════════════════════════════════════
     (e) TOOLTIP ENGINE
     Rich tooltips for defined terms, section refs,
     cross-doc refs, tranches, and entities
     ════════════════════════════════════════════ */

  var tooltipEl = null;

  function ensureTooltip() {
    if (tooltipEl) return tooltipEl;
    tooltipEl = document.createElement('div');
    tooltipEl.className = 'crosslink-tooltip';
    tooltipEl.innerHTML =
      '<div class="tooltip-badge"></div>' +
      '<div class="tooltip-name"></div>' +
      '<div class="tooltip-summary"></div>' +
      '<div class="tooltip-stats"></div>' +
      '<div class="tooltip-mini-bar"><div class="tooltip-mini-bar-fill"></div></div>';
    document.body.appendChild(tooltipEl);
    return tooltipEl;
  }

  function classifyElement(el) {
    if (el.classList.contains('defined-term'))  return 'term';
    if (el.classList.contains('cross-doc-ref')) return 'doc';
    if (el.classList.contains('section-ref'))   return 'section';
    return null;
  }

  function badgeHTML(type) {
    var labels = {
      term:    { text: 'DEFINED TERM', cls: 'badge-term' },
      doc:     { text: 'DOCUMENT REF', cls: 'badge-doc' },
      section: { text: 'SECTION REF',  cls: 'badge-section' },
      tranche: { text: 'TRANCHE',      cls: 'badge-tranche' },
      entity:  { text: 'ENTITY',       cls: 'badge-entity' }
    };
    var info = labels[type] || labels.doc;
    return info;
  }

  function resolveDocNumFromHref(href) {
    for (var n = 1; n <= 7; n++) {
      if (href && href.indexOf(DOC_NUM_MAP[n]) !== -1) return n;
    }
    return null;
  }

  function resolveTrancheFromDocNum(docNum) {
    for (var key in TRANCHES) {
      if (TRANCHES[key].doc === 'DOC ' + docNum) return { id: key, data: TRANCHES[key] };
    }
    return null;
  }

  function showRichTooltip(el, e) {
    var tip = ensureTooltip();
    var type = classifyElement(el);
    if (!type) return;

    var badge = badgeHTML(type);
    var badgeEl    = tip.querySelector('.tooltip-badge');
    var nameEl     = tip.querySelector('.tooltip-name');
    var summaryEl  = tip.querySelector('.tooltip-summary');
    var statsEl    = tip.querySelector('.tooltip-stats');
    var miniBarEl  = tip.querySelector('.tooltip-mini-bar');

    // Reset
    badgeEl.textContent = badge.text;
    badgeEl.className   = 'tooltip-badge ' + badge.cls;
    nameEl.textContent  = '';
    summaryEl.textContent = '';
    statsEl.textContent = '';
    statsEl.innerHTML   = '';
    miniBarEl.style.display = 'none';

    if (type === 'term') {
      var term = el.getAttribute('data-term') || el.textContent;
      var def = definitions[term.toLowerCase()] || definitions[term] || null;
      nameEl.textContent = term;
      summaryEl.textContent = def || 'No definition available.';
    }

    else if (type === 'doc') {
      var href = el.getAttribute('href') || '';
      var docNum = resolveDocNumFromHref(href);
      var trancheInfo = docNum ? resolveTrancheFromDocNum(docNum) : null;

      if (trancheInfo) {
        // Show as tranche tooltip (richer)
        badgeEl.textContent = 'TRANCHE';
        badgeEl.className   = 'tooltip-badge badge-tranche';
        nameEl.textContent  = trancheInfo.data.name;

        var docTitle = DOC_NUM_NAMES[docNum] || ('DOC ' + docNum);
        summaryEl.textContent = docTitle + ' \u2014 Click to view';

        statsEl.innerHTML =
          '<span>Face: $' + trancheInfo.data.face.toFixed(1) + 'M</span>' +
          '<span>Lien: ' + trancheInfo.data.lien + '</span>' +
          '<span>Entity: ' + trancheInfo.data.entity.charAt(0).toUpperCase() + trancheInfo.data.entity.slice(1) + '</span>';
        statsEl.style.display = '';

        // Mini bar showing relative size (max = $2B term loan)
        var pct = Math.min(100, (trancheInfo.data.face / 1999.1) * 100);
        miniBarEl.style.display = '';
        var fillEl = miniBarEl.querySelector('.tooltip-mini-bar-fill');
        if (fillEl) {
          fillEl.style.width = pct + '%';
          fillEl.style.background = trancheInfo.data.color;
        }
      } else if (docNum) {
        nameEl.textContent = 'DOC ' + docNum;
        summaryEl.textContent = (DOC_NUM_NAMES[docNum] || '') + ' \u2014 Click to view';
      } else {
        nameEl.textContent = el.textContent;
        summaryEl.textContent = 'Cross-document reference \u2014 Click to view';
      }
    }

    else if (type === 'section') {
      nameEl.textContent = el.textContent;
      summaryEl.textContent = 'Same-page section reference \u2014 Click to jump';
    }

    tip.classList.add('visible');
    positionTooltip(e);
  }

  function positionTooltip(e) {
    if (!tooltipEl) return;
    var x = e.clientX + 12;
    var y = e.clientY + 12;
    var rect = tooltipEl.getBoundingClientRect();

    // Clamp to viewport bounds
    if (x + rect.width > window.innerWidth)  x = e.clientX - rect.width - 12;
    if (y + rect.height > window.innerHeight) y = e.clientY - rect.height - 12;
    if (x < 0) x = 4;
    if (y < 0) y = 4;

    tooltipEl.style.left = x + 'px';
    tooltipEl.style.top  = y + 'px';
  }

  function hideTooltip() {
    if (tooltipEl) tooltipEl.classList.remove('visible');
  }

  function bindTooltipEvents(el) {
    el.addEventListener('mouseenter', function (e) { showRichTooltip(el, e); });
    el.addEventListener('mousemove',  function (e) {
      if (tooltipEl && tooltipEl.classList.contains('visible')) positionTooltip(e);
    });
    el.addEventListener('mouseleave', hideTooltip);
  }

  function bindAllTooltips() {
    var elems = document.querySelectorAll('.defined-term, .section-ref, .cross-doc-ref');
    for (var i = 0; i < elems.length; i++) {
      if (!elems[i].getAttribute('data-tip-bound')) {
        elems[i].setAttribute('data-tip-bound', '1');
        bindTooltipEvents(elems[i]);
      }
    }

    // Preserve click-to-jump for defined terms (same as tooltips.js)
    var terms = document.querySelectorAll('.defined-term');
    for (var j = 0; j < terms.length; j++) {
      if (!terms[j].getAttribute('data-click-bound')) {
        terms[j].setAttribute('data-click-bound', '1');
        terms[j].addEventListener('click', function () {
          var defSection = document.getElementById('sec-1-01');
          if (defSection) {
            defSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      }
    }
  }

  /* ════════════════════════════════════════════
     (f) TERM AUTO-LINKING
     Replicate the auto-scan from tooltips.js
     ════════════════════════════════════════════ */

  function autoLinkTerms() {
    if (Object.keys(definitions).length === 0) return;

    // Build sorted term list (longest first to avoid partial matches)
    var termList = Object.keys(definitions).sort(function (a, b) {
      return b.length - a.length;
    });
    if (termList.length === 0) return;

    // Build regex matching all defined terms (case-insensitive, word boundary)
    var escaped = termList.map(function (t) {
      return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    });
    var re = new RegExp('\\b(' + escaped.join('|') + ')\\b', 'gi');

    // Scan same containers as tooltips.js
    var containers = document.querySelectorAll('.translation-text, .section-title, .legal-text, .raw-section, .research-text');
    for (var i = 0; i < containers.length; i++) {
      walkTextNodesForTerms(containers[i], re);
    }

    // Re-bind events on newly created .defined-term elements
    var newTerms = document.querySelectorAll('.defined-term:not([data-bound])');
    for (var j = 0; j < newTerms.length; j++) {
      newTerms[j].setAttribute('data-bound', '1');
      bindTooltipEvents(newTerms[j]);
      // Preserve click-to-definitions
      (function (el) {
        el.addEventListener('click', function () {
          var defSection = document.getElementById('sec-1-01');
          if (defSection) {
            defSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      })(newTerms[j]);
    }
  }

  function walkTextNodesForTerms(el, re) {
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    for (var n = 0; n < nodes.length; n++) {
      var textNode = nodes[n];
      // Skip nodes inside links or already-wrapped terms
      var parent = textNode.parentNode;
      if (parent.closest && parent.closest('a')) continue;
      if (parent.classList && parent.classList.contains('defined-term')) continue;
      var text = textNode.textContent;
      if (!re.test(text)) continue;
      re.lastIndex = 0; // reset regex

      var frag = document.createDocumentFragment();
      var lastIdx = 0;
      var match;
      while ((match = re.exec(text)) !== null) {
        // Add text before match
        if (match.index > lastIdx) {
          frag.appendChild(document.createTextNode(text.slice(lastIdx, match.index)));
        }
        // Create defined-term span
        var span = document.createElement('span');
        span.className = 'defined-term';
        span.setAttribute('data-term', match[1].toLowerCase());
        span.textContent = match[0];
        frag.appendChild(span);
        lastIdx = re.lastIndex;
      }
      // Remaining text
      if (lastIdx < text.length) {
        frag.appendChild(document.createTextNode(text.slice(lastIdx)));
      }
      textNode.parentNode.replaceChild(frag, textNode);
    }
  }

  /* ════════════════════════════════════════════
     (g) PUBLIC API
     ════════════════════════════════════════════ */

  window.AMCCrossLink = {
    getTrancheData: function (id) {
      return TRANCHES[id] || null;
    },
    getDocData: function (num) {
      var n = parseInt(num);
      if (!DOC_NUM_MAP[n]) return null;
      return {
        num: n,
        url: DOC_NUM_MAP[n],
        name: DOC_NUM_NAMES[n] || 'DOC ' + n,
        tranche: resolveTrancheFromDocNum(n)
      };
    },
    getTermDefinition: function (term) {
      if (!term) return null;
      return definitions[term.toLowerCase()] || definitions[term] || null;
    },
    getCrossRefs: function (pageId) {
      if (window.AMC_LINK_GRAPH && window.AMC_LINK_GRAPH[pageId]) {
        return window.AMC_LINK_GRAPH[pageId];
      }
      return null;
    },
    rescan: function () {
      runLinkEngine();
      onDefinitionsReady(function () {
        autoLinkTerms();
        bindAllTooltips();
      });
    }
  };

  /* ════════════════════════════════════════════
     (h) INITIALIZATION
     ════════════════════════════════════════════ */

  function init() {
    // Phase 1: Run the link engine (section/doc refs — no dependency on definitions)
    runLinkEngine();

    // Phase 2: Once definitions are loaded, auto-link terms and bind tooltips
    onDefinitionsReady(function () {
      autoLinkTerms();
      bindAllTooltips();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
