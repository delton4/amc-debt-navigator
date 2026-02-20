/* ===============================================
   AMC Debt Navigator - Scenario Rendering Engine
   Reads window.AMC_SCENARIOS, renders cards into
   .hub-grid, handles category filtering + search.
   =============================================== */
(function () {
  'use strict';

  /* ════════════════════════════════════════════
     (a) DATA SOURCES
     ════════════════════════════════════════════ */

  var scenarios = window.AMC_SCENARIOS || [];
  var base = document.body.getAttribute('data-base') || '.';

  /* ── Tranche Lookup ── */
  var TRANCHES = {
    'term-loan':     { name: '$2B Term Loan',     color: '#dc2626' },
    'muvico-8pik':   { name: 'Muvico 8% PIK',     color: '#ea580c' },
    'muvico-15pik':  { name: 'Muvico 15% PIK',    color: '#d97706' },
    'muvico-6-8pik': { name: '6/8% PIK Toggle',   color: '#ca8a04' },
    'amc-750':       { name: 'AMC 7.5%',           color: '#6b7280' },
    'odeon-1275':    { name: 'Odeon 12.75%',       color: '#3b82f6' },
    'amc-sub':       { name: 'AMC 6.125% Sub',     color: '#a855f7' }
  };

  /* ── Doc ID -> Display Name + URL ── */
  var DOC_MAP = {
    'doc1': { name: 'DOC 1', url: 'docs/doc1-covenant-strip.html' },
    'doc2': { name: 'DOC 2', url: 'docs/doc2-muvico-secured-2029.html' },
    'doc3': { name: 'DOC 3', url: 'docs/doc3-amc-7500-notes.html' },
    'doc4': { name: 'DOC 4', url: 'docs/doc4-credit-agreement.html' },
    'doc5': { name: 'DOC 5', url: 'docs/doc5-exchangeable-2030.html' },
    'doc6': { name: 'DOC 6', url: 'docs/doc6-odeon-notes.html' },
    'doc7': { name: 'DOC 7', url: 'docs/doc7-pik-toggle.html' }
  };

  /* ── Research Slug -> Display Name + URL ── */
  var RESEARCH_MAP = {
    'lme-concepts':      { name: 'LME Foundations',  url: 'research/lme-concepts.html' },
    'novel-strategies':  { name: 'Novel Strategies',  url: 'research/novel-strategies.html' },
    'case-studies':      { name: 'Case Studies',      url: 'research/case-studies.html' },
    'countermeasures':   { name: 'Countermeasures',   url: 'research/countermeasures.html' },
    'court-rulings':     { name: 'Court Rulings',     url: 'research/court-rulings.html' },
    'lender-strategy':   { name: 'Lender Strategy',   url: 'research/lender-strategy.html' },
    'odeon-analysis':    { name: 'Odeon Analysis',    url: 'research/odeon-analysis.html' },
    'muvico-deep-dive':  { name: 'Muvico Deep Dive',  url: 'research/muvico-deep-dive.html' },
    'court-solutions':   { name: 'Court Solutions',   url: 'research/court-solutions.html' }
  };

  /* ── Model Slug -> Base URL ── */
  var MODEL_MAP = {
    'waterfall':      'models/waterfall.html',
    'pik-projector':  'models/pik-projector.html',
    'leverage':       'models/leverage.html',
    'exchange':       'models/exchange.html',
    'financials':     'models/financials.html'
  };

  /* ── Category Badge Config ── */
  var CATEGORY_BADGE = {
    'offensive':  { text: 'OFFENSIVE',  bg: 'rgba(239,68,68,0.15)',  color: '#ef4444', border: 'rgba(239,68,68,0.3)' },
    'defensive':  { text: 'DEFENSIVE',  bg: 'rgba(34,197,94,0.15)',  color: '#22c55e', border: 'rgba(34,197,94,0.3)' },
    'hybrid':     { text: 'HYBRID',     bg: 'rgba(234,179,8,0.15)',  color: '#eab308', border: 'rgba(234,179,8,0.3)' },
    'in-court':   { text: 'IN-COURT',   bg: 'rgba(59,130,246,0.15)',  color: '#3b82f6', border: 'rgba(59,130,246,0.3)' }
  };

  /* ── Risk Level Colors ── */
  var RISK_COLORS = {
    'high':   '#ef4444',
    'medium': '#eab308',
    'low':    '#22c55e'
  };

  /* ════════════════════════════════════════════
     (b) CARD RENDERING
     ════════════════════════════════════════════ */

  function buildCard(s) {
    var card = document.createElement('div');
    card.className = 'scenario-card cat-' + s.category;
    card.setAttribute('data-category', s.category);

    var html = '';

    /* ── Category Badge ── */
    var badge = CATEGORY_BADGE[s.category] || CATEGORY_BADGE.hybrid;
    html += '<div class="tag" style="background:' + badge.bg + '; color:' + badge.color + '; border:1px solid ' + badge.border + '; margin-bottom:12px;">' + badge.text + '</div>';

    /* ── Title ── */
    html += '<h3 style="font-weight:700; margin-bottom:8px;">' + escHtml(s.name) + '</h3>';

    /* ── Summary ── */
    html += '<div style="font-size:12px; color:var(--text-muted); line-height:1.6; margin-bottom:12px;">' + escHtml(s.summary) + '</div>';

    /* ── Mechanics (expandable) ── */
    html += '<details style="margin-bottom:12px;">';
    html += '<summary style="font-size:11px; font-weight:600; color:var(--text-muted); cursor:pointer; letter-spacing:0.5px; text-transform:uppercase;">How it works</summary>';
    html += '<div style="font-size:11px; color:var(--text-muted); line-height:1.7; margin-top:8px; padding:12px; background:var(--surface-2); border-radius:6px; border:1px solid var(--border);">' + escHtml(s.mechanics) + '</div>';
    html += '</details>';

    /* ── Affected Tranches ── */
    if (s.affectedTranches && s.affectedTranches.length > 0) {
      html += '<div style="margin-bottom:12px;">';
      html += '<div style="font-size:9px; text-transform:uppercase; letter-spacing:1px; color:var(--text-dim); margin-bottom:6px; font-weight:600;">Affected Tranches</div>';
      html += '<div style="display:flex; flex-wrap:wrap; gap:4px;">';
      for (var t = 0; t < s.affectedTranches.length; t++) {
        var tid = s.affectedTranches[t];
        var tr = TRANCHES[tid];
        if (tr) {
          html += '<span style="display:inline-block; font-size:9px; padding:2px 7px; border-radius:3px; font-weight:600; letter-spacing:0.5px; background:' + hexToRgba(tr.color, 0.15) + '; color:' + tr.color + '; border:1px solid ' + hexToRgba(tr.color, 0.3) + ';">' + escHtml(tr.name) + '</span>';
        }
      }
      html += '</div></div>';
    }

    /* ── Run in Model Links ── */
    if (s.modelLinks && s.modelLinks.length > 0) {
      html += '<div style="margin-bottom:12px;">';
      html += '<div style="font-size:9px; text-transform:uppercase; letter-spacing:1px; color:var(--text-dim); margin-bottom:6px; font-weight:600;">Run in Model</div>';
      html += '<div style="display:flex; flex-wrap:wrap; gap:6px;">';
      for (var m = 0; m < s.modelLinks.length; m++) {
        var ml = s.modelLinks[m];
        var modelUrl = MODEL_MAP[ml.model];
        if (modelUrl) {
          var qs = Object.keys(ml.params).map(function(k) { return k + '=' + encodeURIComponent(ml.params[k]); }).join('&');
          var href = base + '/' + modelUrl + '?' + qs;
          html += '<a href="' + href + '" class="btn" style="font-size:10px; padding:5px 10px;">' + escHtml(ml.label) + '</a>';
        }
      }
      html += '</div></div>';
    }

    /* ── Related Docs ── */
    if (s.relatedDocs && s.relatedDocs.length > 0) {
      html += '<div style="margin-bottom:12px;">';
      html += '<div style="font-size:9px; text-transform:uppercase; letter-spacing:1px; color:var(--text-dim); margin-bottom:6px; font-weight:600;">Related Documents</div>';
      html += '<div style="display:flex; flex-wrap:wrap; gap:6px;">';
      for (var d = 0; d < s.relatedDocs.length; d++) {
        var docInfo = DOC_MAP[s.relatedDocs[d]];
        if (docInfo) {
          html += '<a href="' + base + '/' + docInfo.url + '" style="font-size:10px; color:var(--blue);">' + escHtml(docInfo.name) + '</a>';
          if (d < s.relatedDocs.length - 1) {
            html += '<span style="color:var(--text-dim); font-size:10px;">&middot;</span>';
          }
        }
      }
      html += '</div></div>';
    }

    /* ── Related Research ── */
    if (s.relatedResearch && s.relatedResearch.length > 0) {
      html += '<div style="margin-bottom:12px;">';
      html += '<div style="font-size:9px; text-transform:uppercase; letter-spacing:1px; color:var(--text-dim); margin-bottom:6px; font-weight:600;">Related Research</div>';
      html += '<div style="display:flex; flex-wrap:wrap; gap:6px;">';
      for (var r = 0; r < s.relatedResearch.length; r++) {
        var resInfo = RESEARCH_MAP[s.relatedResearch[r]];
        if (resInfo) {
          html += '<a href="' + base + '/' + resInfo.url + '" style="font-size:10px; color:var(--blue);">' + escHtml(resInfo.name) + '</a>';
          if (r < s.relatedResearch.length - 1) {
            html += '<span style="color:var(--text-dim); font-size:10px;">&middot;</span>';
          }
        }
      }
      html += '</div></div>';
    }

    /* ── Outputs Summary ── */
    if (s.outputs) {
      var riskColor = RISK_COLORS[s.outputs.riskLevel] || '#eab308';
      html += '<div style="margin-bottom:12px; padding:10px 12px; background:var(--surface-2); border-radius:6px; border:1px solid var(--border);">';
      html += '<div style="font-size:9px; text-transform:uppercase; letter-spacing:1px; color:var(--text-dim); margin-bottom:8px; font-weight:600;">Expected Outcomes</div>';
      html += '<div style="display:flex; gap:16px; flex-wrap:wrap;">';
      html += '<div style="font-size:10px;"><span style="color:var(--text-dim);">Winner: </span><span style="color:var(--green); font-weight:700;">' + escHtml(s.outputs.winnerRecovery) + '</span></div>';
      html += '<div style="font-size:10px;"><span style="color:var(--text-dim);">Loser: </span><span style="color:var(--red); font-weight:700;">' + escHtml(s.outputs.loserRecovery) + '</span></div>';
      html += '<div style="font-size:10px;"><span style="color:var(--text-dim);">Risk: </span><span style="font-weight:700; text-transform:uppercase; color:' + riskColor + ';">' + escHtml(s.outputs.riskLevel) + '</span></div>';
      html += '</div></div>';
    }

    /* ── Precedents ── */
    if (s.precedents && s.precedents.length > 0) {
      html += '<div style="font-size:10px; color:var(--text-dim); font-style:italic; line-height:1.6;">';
      html += 'Precedents: ' + s.precedents.map(escHtml).join(' &middot; ');
      html += '</div>';
    }

    card.innerHTML = html;
    return card;
  }

  /* ════════════════════════════════════════════
     (c) CATEGORY FILTERING
     ════════════════════════════════════════════ */

  var activeCategory = 'all';
  var searchQuery = '';

  function applyFilters() {
    var cards = document.querySelectorAll('.scenario-card');
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var cat = card.getAttribute('data-category') || '';
      var text = (card.textContent || '').toLowerCase();

      var matchesCat = activeCategory === 'all' || cat === activeCategory;
      var matchesSearch = !searchQuery || text.indexOf(searchQuery) !== -1;

      card.style.display = (matchesCat && matchesSearch) ? '' : 'none';
    }
  }

  function bindFilterButtons() {
    var btns = document.querySelectorAll('.hub-filter .filter-btn');
    for (var j = 0; j < btns.length; j++) {
      btns[j].addEventListener('click', function () {
        for (var k = 0; k < btns.length; k++) {
          btns[k].classList.remove('active');
        }
        this.classList.add('active');
        activeCategory = (this.getAttribute('data-filter') || 'all').toLowerCase();
        applyFilters();
      });
    }
  }

  /* ════════════════════════════════════════════
     (d) TEXT SEARCH
     ════════════════════════════════════════════ */

  function bindSearch() {
    var input = document.querySelector('.hub-search input');
    if (!input) return;
    input.addEventListener('keyup', function () {
      searchQuery = (this.value || '').toLowerCase().trim();
      applyFilters();
    });
  }

  /* ════════════════════════════════════════════
     HELPERS
     ════════════════════════════════════════════ */

  function escHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function hexToRgba(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  }

  /* ════════════════════════════════════════════
     (e) INITIALIZATION
     ════════════════════════════════════════════ */

  function init() {
    var grid = document.getElementById('scenario-grid');
    if (!grid) return;

    // Clear loading placeholder
    grid.innerHTML = '';

    // Render all scenario cards
    for (var i = 0; i < scenarios.length; i++) {
      var cardEl = buildCard(scenarios[i]);
      (function(scenario, el) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', function(e) {
          if (e.target.closest('a')) return;
          if (e.target.closest('summary')) return;
          window.location.href = base + '/scenarios/detail.html?id=' + encodeURIComponent(scenario.id);
        });
      })(scenarios[i], cardEl);
      grid.appendChild(cardEl);
    }

    // Bind filter + search
    bindFilterButtons();
    bindSearch();

    // Rescan cross-links if available
    if (window.AMCCrossLink && typeof window.AMCCrossLink.rescan === 'function') {
      window.AMCCrossLink.rescan();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
