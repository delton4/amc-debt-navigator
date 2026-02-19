/* ═══════════════════════════════════════════════
   AMC Debt Navigator - Definition Tooltip System
   Loads definitions.json, shows popups on hover
   ═══════════════════════════════════════════════ */

(function() {
  'use strict';

  var definitions = {};
  var tooltipEl = null;

  // Load definitions
  var base = document.body.getAttribute('data-base') || '.';
  var script = document.createElement('script');
  script.src = base + '/data/definitions.js';
  script.onload = function() {
    if (window.AMC_DEFINITIONS) {
      definitions = window.AMC_DEFINITIONS;
      bindTooltips();
    }
  };
  // Fallback: try loading as JSON via inline data
  script.onerror = function() {
    // definitions not available - tooltips won't work but site still functions
    bindTooltips();
  };
  document.head.appendChild(script);

  function createTooltip() {
    tooltipEl = document.createElement('div');
    tooltipEl.className = 'tooltip';
    tooltipEl.innerHTML = '<div class="tooltip-term"></div><div class="tooltip-def"></div>';
    document.body.appendChild(tooltipEl);
    return tooltipEl;
  }

  function showTooltip(term, e) {
    if (!tooltipEl) createTooltip();
    var def = definitions[term.toLowerCase()] || definitions[term] || null;
    if (!def) return;

    tooltipEl.querySelector('.tooltip-term').textContent = term;
    tooltipEl.querySelector('.tooltip-def').textContent = def;
    tooltipEl.classList.add('visible');

    // Position near cursor
    var x = e.clientX + 12;
    var y = e.clientY + 12;
    var rect = tooltipEl.getBoundingClientRect();

    // Keep on screen
    if (x + 360 > window.innerWidth) x = e.clientX - 370;
    if (y + rect.height > window.innerHeight) y = e.clientY - rect.height - 12;

    tooltipEl.style.left = x + 'px';
    tooltipEl.style.top = y + 'px';
  }

  function hideTooltip() {
    if (tooltipEl) tooltipEl.classList.remove('visible');
  }

  function bindTooltips() {
    // Bind explicitly marked terms
    var terms = document.querySelectorAll('.defined-term');
    terms.forEach(function(el) {
      var term = el.getAttribute('data-term') || el.textContent;
      el.addEventListener('mouseenter', function(e) { showTooltip(term, e); });
      el.addEventListener('mousemove', function(e) {
        if (tooltipEl && tooltipEl.classList.contains('visible')) {
          var x = e.clientX + 12;
          var y = e.clientY + 12;
          if (x + 360 > window.innerWidth) x = e.clientX - 370;
          tooltipEl.style.left = x + 'px';
          tooltipEl.style.top = y + 'px';
        }
      });
      el.addEventListener('mouseleave', hideTooltip);
    });

    // Auto-scan translation blocks for defined terms
    if (Object.keys(definitions).length > 0) {
      autoLinkTerms();
    }
  }

  function autoLinkTerms() {
    // Build sorted term list (longest first to avoid partial matches)
    var termList = Object.keys(definitions).sort(function(a, b) {
      return b.length - a.length;
    });
    if (termList.length === 0) return;

    // Build regex matching all defined terms (case-insensitive, word boundary)
    var escaped = termList.map(function(t) {
      return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    });
    var re = new RegExp('\\b(' + escaped.join('|') + ')\\b', 'gi');

    // Scan translation-text and section-title elements
    var containers = document.querySelectorAll('.translation-text, .section-title');
    containers.forEach(function(container) {
      walkTextNodes(container, re);
    });

    // Re-bind events on newly created .defined-term elements
    var newTerms = document.querySelectorAll('.defined-term:not([data-bound])');
    newTerms.forEach(function(el) {
      el.setAttribute('data-bound', '1');
      var term = el.getAttribute('data-term') || el.textContent;
      el.addEventListener('mouseenter', function(e) { showTooltip(term, e); });
      el.addEventListener('mousemove', function(e) {
        if (tooltipEl && tooltipEl.classList.contains('visible')) {
          var x = e.clientX + 12;
          var y = e.clientY + 12;
          if (x + 360 > window.innerWidth) x = e.clientX - 370;
          tooltipEl.style.left = x + 'px';
          tooltipEl.style.top = y + 'px';
        }
      });
      el.addEventListener('mouseleave', hideTooltip);
    });
  }

  function walkTextNodes(el, re) {
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach(function(textNode) {
      if (textNode.parentNode.classList && textNode.parentNode.classList.contains('defined-term')) return;
      var text = textNode.textContent;
      if (!re.test(text)) return;
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
    });
  }

})();
