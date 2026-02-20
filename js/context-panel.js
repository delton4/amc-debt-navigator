/* ═══════════════════════════════════════════════
   AMC Debt Navigator - Context Panel
   Populates the side panel with related docs, key
   terms, and model links. Scroll-spy via
   IntersectionObserver updates key terms on scroll.
   ═══════════════════════════════════════════════ */

(function() {
  'use strict';

  // ── Element & data guards ──
  var panel = document.getElementById('context-panel');
  if (!panel) return;

  var pageId = (document.body.getAttribute('data-page') || '').replace(/-ex$/, '');
  if (!pageId) return;

  var graph = window.AMC_LINK_GRAPH;
  var docUrls = window.AMC_DOC_URLS;
  var modelUrls = window.AMC_MODEL_URLS;
  if (!graph || !docUrls || !modelUrls) return;

  var entry = graph[pageId];
  if (!entry) return;

  // ── Helpers ──
  function el(tag, cls, html) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (html) node.innerHTML = html;
    return node;
  }

  // ── Section 1: Related Documents ──
  if (entry.relatedDocs && entry.relatedDocs.length) {
    var sec = el('div', 'context-section');
    sec.appendChild(el('div', 'context-title', 'Related Documents'));

    entry.relatedDocs.forEach(function(docKey) {
      var info = graph[docKey];
      var url  = docUrls[docKey];
      if (!info || !url) return;

      var item = el('div', 'context-item');
      var badge = el('span', 'context-badge', docKey.toUpperCase());
      var link  = document.createElement('a');
      link.href = url;
      link.textContent = info.name;

      item.appendChild(badge);
      item.appendChild(link);
      sec.appendChild(item);
    });

    panel.appendChild(sec);
  }

  // ── Section 2: Key Terms (scroll-spy updates this) ──
  var termsSec = el('div', 'context-section');
  termsSec.appendChild(el('div', 'context-title', 'Key Terms'));

  var termsList = el('div', '', '');
  termsList.id = 'context-terms-list';
  termsSec.appendChild(termsList);
  panel.appendChild(termsSec);

  // Initial population with all visible defined terms
  function collectTerms(root) {
    var nodes = (root || document).querySelectorAll('.defined-term');
    var seen = {};
    var terms = [];
    for (var i = 0; i < nodes.length; i++) {
      var t = nodes[i].getAttribute('data-term') || nodes[i].textContent.trim();
      if (!t || seen[t]) continue;
      seen[t] = true;
      terms.push(t);
      if (terms.length >= 10) break;
    }
    return terms;
  }

  function renderTerms(terms) {
    termsList.innerHTML = '';
    if (!terms.length) {
      termsList.innerHTML = '<div class="context-item" style="color:var(--text-dim);font-style:italic;">No terms in view</div>';
      return;
    }

    function doRender(defs) {
      termsList.innerHTML = '';
      terms.forEach(function(t) {
        var item = el('div', 'context-term-item');
        var nameEl = el('div', 'context-term-name');
        nameEl.textContent = t;
        item.appendChild(nameEl);

        if (defs) {
          var key = t.toLowerCase();
          var def = defs[key];
          if (def) {
            var defEl = el('div', 'context-term-def');
            defEl.textContent = def.length > 120 ? def.slice(0, 117) + '...' : def;
            item.appendChild(defEl);
          }
        }

        termsList.appendChild(item);
      });
    }

    if (window.AMC_DEFINITIONS) {
      doRender(window.AMC_DEFINITIONS);
    } else {
      doRender(null);
      setTimeout(function() {
        if (window.AMC_DEFINITIONS) doRender(window.AMC_DEFINITIONS);
      }, 300);
    }
  }

  // Show initial terms from the whole page
  renderTerms(collectTerms(document));

  // ── Section 3: Model Visual Previews ──
  var VISUALS = {
    waterfall: {
      title: 'Recovery Waterfall',
      build: function(container) {
        var wf = el('div', 'mini-waterfall');
        var tranches = [
          { label: '1L TL', h: 38, cls: 'wf-1l' },
          { label: '1.25L', h: 10, cls: 'wf-125l' },
          { label: '1.5L', h: 16, cls: 'wf-15l' },
          { label: '2L-A', h: 7, cls: 'wf-2l' },
          { label: '2L-B', h: 5, cls: 'wf-2l' },
          { label: 'Unsec', h: 8, cls: 'wf-unsec' },
          { label: 'Eq', h: 6, cls: 'wf-eq' }
        ];
        tranches.forEach(function(tr) {
          var box = el('div', 'mini-wf-box ' + tr.cls);
          box.style.height = tr.h + 'px';
          box.title = tr.label;
          wf.appendChild(box);
        });
        var evLine = el('div', 'mini-wf-ev-line');
        evLine.title = 'EV = $2,500M';
        wf.appendChild(evLine);
        container.appendChild(wf);
      }
    },
    leverage: {
      title: 'Leverage Analyzer',
      build: function(container) {
        var gauge = el('div', 'mini-gauge');
        var track = el('div', 'mini-gauge-track');
        var fill = el('div', 'mini-gauge-fill');
        fill.style.transform = 'rotate(' + (180 * Math.min(12.47 / 20, 1)) + 'deg)';
        track.appendChild(fill);
        gauge.appendChild(track);
        var val = el('div', 'mini-gauge-value', '12.47x');
        gauge.appendChild(val);
        container.appendChild(gauge);
      }
    },
    pik: {
      title: 'PIK Projector',
      build: function(container) {
        var bars = el('div', 'mini-pik-bars');
        for (var y = 1; y <= 4; y++) {
          var h = Math.round(20 * Math.pow(1.08, y));
          var bar = el('div', 'mini-pik-bar');
          bar.style.height = h + 'px';
          bar.title = 'Year ' + y;
          bars.appendChild(bar);
        }
        container.appendChild(bars);
      }
    },
    exchange: {
      title: 'Exchange Calculator',
      build: function(container) {
        var exch = el('div', 'mini-exchange');
        var before = el('div', 'mini-exch-box mini-exch-before', '<div class="mini-exch-label">DEBT</div><div class="mini-exch-val">$154M</div>');
        var arrow = el('div', 'mini-exch-arrow', '&#8594;');
        var after = el('div', 'mini-exch-box mini-exch-after', '<div class="mini-exch-label">EQUITY</div><div class="mini-exch-val">27.3M sh</div>');
        exch.appendChild(before);
        exch.appendChild(arrow);
        exch.appendChild(after);
        container.appendChild(exch);
      }
    }
  };

  if (entry.relatedModels && entry.relatedModels.length) {
    var mSec = el('div', 'context-section');
    mSec.appendChild(el('div', 'context-title', 'Models'));

    entry.relatedModels.forEach(function(modelKey) {
      var info = modelUrls[modelKey];
      if (!info) return;

      var card = el('a', 'model-preview');
      card.href = '../models/' + info.url;

      var visual = VISUALS[modelKey];
      if (visual) {
        var titleEl = el('div', 'model-preview-title', visual.title);
        card.appendChild(titleEl);
        var vizContainer = el('div', 'model-preview-viz');
        visual.build(vizContainer);
        card.appendChild(vizContainer);
      } else {
        card.appendChild(el('div', 'model-preview-title', info.name));
      }

      mSec.appendChild(card);
    });

    panel.appendChild(mSec);
  }

  // ── Scroll-Spy: update Key Terms per visible section ──
  var sections = document.querySelectorAll('.doc-section');
  if (!sections.length) return;

  var visibleSections = new Set();
  var rafPending = false;

  function updateTermsFromVisible() {
    rafPending = false;

    // Collect terms from all currently visible sections
    var allTerms = [];
    var seen = {};

    visibleSections.forEach(function(sec) {
      var nodes = sec.querySelectorAll('.defined-term');
      for (var i = 0; i < nodes.length; i++) {
        var t = nodes[i].getAttribute('data-term') || nodes[i].textContent.trim();
        if (!t || seen[t]) continue;
        seen[t] = true;
        allTerms.push(t);
      }
    });

    // Cap at 10
    if (allTerms.length > 10) allTerms = allTerms.slice(0, 10);

    // Only re-render if we have visible sections with terms;
    // if nothing visible, keep the last known set
    if (visibleSections.size > 0) {
      renderTerms(allTerms);
    }
  }

  function scheduleUpdate() {
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(updateTermsFromVisible);
    }
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(ent) {
      if (ent.isIntersecting) {
        visibleSections.add(ent.target);
      } else {
        visibleSections.delete(ent.target);
      }
    });
    scheduleUpdate();
  }, {
    rootMargin: '-10% 0px -10% 0px',
    threshold: 0
  });

  sections.forEach(function(sec) {
    observer.observe(sec);
  });

})();
