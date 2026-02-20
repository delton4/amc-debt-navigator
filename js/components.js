/* ═══════════════════════════════════════════════
   AMC Debt Navigator - Shared Components
   Breadcrumb bar injection + keyboard shortcuts
   Works on file:// and GitHub Pages
   ═══════════════════════════════════════════════ */

(function() {
  'use strict';

  var page = document.body.getAttribute('data-page') || '';
  var base = document.body.getAttribute('data-base') || '.';

  // ── Breadcrumb Hierarchy Map ──
  var HIERARCHY = {
    'dashboard':                ['Dashboard'],
    'structure':                ['Structure Diagram'],
    'compare':                  ['Covenant Comparison'],
    'glossary':                 ['Glossary'],
    'search':                   ['Search All Docs'],
    'scenarios':                ['Scenarios'],
    'doc1':                     ['Documents', 'DOC 1 \u2014 Covenant Strip'],
    'doc2':                     ['Documents', 'DOC 2 \u2014 Muvico 15% PIK'],
    'doc3':                     ['Documents', 'DOC 3 \u2014 AMC 7.5% Notes'],
    'doc4':                     ['Documents', 'DOC 4 \u2014 $2B Term Loan'],
    'doc5':                     ['Documents', 'DOC 5 \u2014 Muvico 8% PIK'],
    'doc6':                     ['Documents', 'DOC 6 \u2014 Odeon 12.75%'],
    'doc6-ex':                  ['Documents', 'DOC 6 Exhibits'],
    'doc7':                     ['Documents', 'DOC 7 \u2014 6/8% PIK Toggle'],
    'doc7-ex':                  ['Documents', 'DOC 7 Exhibits'],
    'waterfall':                ['Models', 'Recovery Waterfall'],
    'pik':                      ['Models', 'PIK Projector'],
    'leverage':                 ['Models', 'Leverage Analyzer'],
    'exchange':                 ['Models', 'Exchange Calculator'],
    'financials':               ['Models', 'Financial Statements'],
    'research':                 ['Research'],
    'research-lme-concepts':    ['Research', 'LME Foundations'],
    'research-novel-strategies':['Research', 'Novel Strategies'],
    'research-case-studies':    ['Research', 'Case Studies'],
    'research-countermeasures': ['Research', 'Countermeasures'],
    'research-court-rulings':   ['Research', 'Court Rulings'],
    'research-lender-strategy': ['Research', 'Lender Strategy'],
    'research-odeon-analysis':  ['Research', 'Odeon Analysis'],
    'research-muvico-deep-dive':['Research', 'Muvico Deep Dive'],
    'research-court-solutions': ['Research', 'Court Solutions'],
    'scenario-detail':          ['Scenarios', 'Detail'],
    'docs-hub':                 ['Documents'],
    'models-hub':               ['Models']
  };

  // ── Hub URL Map ──
  var HUB_URLS = {
    'Documents': base + '/docs/index.html',
    'Models':    base + '/models/index.html',
    'Research':  base + '/research/index.html',
    'Scenarios': base + '/scenarios.html'
  };

  // ── Build Breadcrumb Bar ──
  var barEl = document.getElementById('breadcrumb-bar');
  if (barEl) {
    var chain = HIERARCHY[page] || [page];
    var crumbs = '<a href="' + base + '/index.html">AMC Debt Navigator</a>';

    for (var i = 0; i < chain.length; i++) {
      crumbs += '<span class="sep">/</span>';
      var item = chain[i];
      var isLast = (i === chain.length - 1);

      if (!isLast && HUB_URLS[item]) {
        crumbs += '<a href="' + HUB_URLS[item] + '">' + item + '</a>';
      } else if (isLast) {
        crumbs += '<span class="breadcrumb-current">' + item + '</span>';
      } else {
        crumbs += '<span>' + item + '</span>';
      }
    }

    var actionsHTML = '<div class="breadcrumb-actions">'
      + '<a href="' + base + '/search.html" style="color:var(--text-muted); text-decoration:none; font-size:11px;">&#8981; Search</a>'
      + '<span class="kb-shortcut">Ctrl+K</span>'
      + '</div>';

    barEl.innerHTML = '<div>' + crumbs + '</div>' + actionsHTML;
  }

  // ── Keyboard Shortcuts ──
  document.addEventListener('keydown', function(e) {
    var tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

    // Ctrl+K or "/" -> search
    if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && !e.ctrlKey && !e.metaKey)) {
      e.preventDefault();
      window.location.href = base + '/search.html';
    }
  });

})();
