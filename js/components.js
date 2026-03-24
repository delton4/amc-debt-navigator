/* =====================================================
   AMC Debt Navigator - Global Navigation + Quick-Jump
   Persistent nav bar on all pages + Cmd/Ctrl+K overlay
   ES5 IIFE — works on file:// and GitHub Pages
   ===================================================== */

(function() {
  'use strict';

  var page = document.body.getAttribute('data-page') || '';
  var base = document.body.getAttribute('data-base') || '.';

  /* ── NAV_GROUPS: 5 dropdown groups with all 38 pages ── */
  var NAV_GROUPS = {
    'Documents': [
      { page: 'docs-hub',   label: 'Documents Hub',               href: base + '/docs/index.html',                   keywords: 'docs hub documents index' },
      { page: 'doc1',       label: 'DOC 1 \u2014 Covenant Strip',         href: base + '/docs/doc1-covenant-strip.html',      keywords: 'covenant strip doc1 indenture' },
      { page: 'doc2',       label: 'DOC 2 \u2014 Muvico 15% PIK',        href: base + '/docs/doc2-muvico-secured-2029.html', keywords: 'muvico 15 pik secured 2029 doc2' },
      { page: 'doc3',       label: 'DOC 3 \u2014 AMC 7.5% Notes',        href: base + '/docs/doc3-amc-7500-notes.html',      keywords: 'amc 7.5 notes doc3 7500' },
      { page: 'doc4',       label: 'DOC 4 \u2014 $2B Term Loan',         href: base + '/docs/doc4-credit-agreement.html',     keywords: 'credit agreement term loan 2b doc4' },
      { page: 'doc5',       label: 'DOC 5 \u2014 Muvico 8% PIK',         href: base + '/docs/doc5-exchangeable-2030.html',    keywords: 'muvico 8 pik exchangeable 2030 doc5' },
      { page: 'doc6',       label: 'DOC 6 \u2014 Odeon 12.75%',          href: base + '/docs/doc6-odeon-notes.html',          keywords: 'odeon 12.75 notes doc6' },
      { page: 'doc6-ex',    label: 'DOC 6 Exhibits',              href: base + '/docs/doc6-odeon-exhibits.html',      keywords: 'odeon exhibits doc6' },
      { page: 'doc7',       label: 'DOC 7 \u2014 6/8% PIK Toggle',       href: base + '/docs/doc7-pik-toggle.html',           keywords: 'pik toggle 6 8 doc7' },
      { page: 'doc7-ex',    label: 'DOC 7 Exhibits',              href: base + '/docs/doc7-pik-toggle-exhibits.html', keywords: 'pik toggle exhibits doc7' }
    ],
    'Models': [
      { page: 'models-hub',    label: 'Models Hub',               href: base + '/models/index.html',          keywords: 'models hub index' },
      { page: 'strategy',      label: 'Strategy Analysis',        href: base + '/models/strategy.html',       keywords: 'strategy lme transaction analysis exchange incentive' },
      { page: 'dcf',           label: 'DCF Valuation',            href: base + '/models/dcf.html',            keywords: 'dcf wacc valuation discount cash flow terminal' },
      { page: 'pf-recovery',   label: 'Pro-Forma Recovery',       href: base + '/models/pf-recovery.html',    keywords: 'pro forma recovery waterfall entity' },
      { page: 'waterfall',     label: 'Recovery Waterfall',       href: base + '/models/waterfall.html',      keywords: 'waterfall recovery allocation tranche' },
      { page: 'debt-service',  label: 'Debt Service Schedule',    href: base + '/models/debt-service.html',   keywords: 'debt service schedule interest coverage' },
      { page: 'financials',    label: 'Financial Statements',     href: base + '/models/financials.html',     keywords: 'financials income balance sheet cash flow' },
      { page: 'revenue-build', label: 'Revenue Build',            href: base + '/models/revenue-build.html',  keywords: 'revenue build admissions concessions' },
      { page: 'comps',         label: 'Comparable Companies',     href: base + '/models/comps.html',          keywords: 'comps comparable companies football field' },
      { page: 'leverage',      label: 'Leverage Analyzer',        href: base + '/models/leverage.html',       keywords: 'leverage ratio debt ebitda' },
      { page: 'exchange',      label: 'Exchange Calculator',      href: base + '/models/exchange.html',       keywords: 'exchange offer calculator uptier' },
      { page: 'pik',           label: 'PIK Projector',            href: base + '/models/pik-projector.html',  keywords: 'pik projector toggle accrual' }
    ],
    'Research': [
      { page: 'research',                label: 'Research Hub',          href: base + '/research/index.html',            keywords: 'research hub index' },
      { page: 'research-lme-concepts',   label: 'LME Foundations',       href: base + '/research/lme-concepts.html',     keywords: 'lme liability management foundations concepts' },
      { page: 'research-novel-strategies',label: 'Novel Strategies',     href: base + '/research/novel-strategies.html',  keywords: 'novel strategies uptier dropdown' },
      { page: 'research-case-studies',   label: 'Case Studies',          href: base + '/research/case-studies.html',      keywords: 'case studies serta incora' },
      { page: 'research-countermeasures',label: 'Countermeasures',       href: base + '/research/countermeasures.html',   keywords: 'countermeasures defenses lender protection' },
      { page: 'research-court-rulings',  label: 'Court Rulings',         href: base + '/research/court-rulings.html',     keywords: 'court rulings precedent litigation' },
      { page: 'research-lender-strategy',label: 'Lender Strategy',       href: base + '/research/lender-strategy.html',   keywords: 'lender strategy creditor playbook' },
      { page: 'research-odeon-analysis', label: 'Odeon Analysis',        href: base + '/research/odeon-analysis.html',    keywords: 'odeon analysis subsidiary' },
      { page: 'research-muvico-deep-dive',label: 'Muvico Deep Dive',    href: base + '/research/muvico-deep-dive.html',  keywords: 'muvico deep dive subsidiary analysis' },
      { page: 'research-court-solutions',label: 'Court Solutions',       href: base + '/research/court-solutions.html',   keywords: 'court solutions in-court bankruptcy restructuring' }
    ],
    'Scenarios': [
      { page: 'scenarios',        label: 'Scenario Overview',     href: base + '/scenarios.html',            keywords: 'scenarios overview bear base bull' },
      { page: 'scenario-detail',  label: 'Scenario Detail',       href: base + '/scenarios/detail.html',     keywords: 'scenario detail analysis drilldown' }
    ],
    'Tools': [
      { page: 'search',    label: 'Search All Docs',       href: base + '/search.html',      keywords: 'search full text find' },
      { page: 'compare',   label: 'Covenant Comparison',   href: base + '/compare.html',     keywords: 'compare covenant comparison side by side' },
      { page: 'structure', label: 'Structure Diagram',     href: base + '/structure.html',   keywords: 'structure diagram org chart entity' },
      { page: 'glossary',  label: 'Glossary',              href: base + '/glossary.html',    keywords: 'glossary terms definitions' }
    ]
  };

  /* ── Determine which group the current page belongs to ── */
  var activeGroup = '';
  var groupNames = ['Documents', 'Models', 'Research', 'Scenarios', 'Tools'];
  var g, gi, items;
  for (gi = 0; gi < groupNames.length; gi++) {
    items = NAV_GROUPS[groupNames[gi]];
    for (g = 0; g < items.length; g++) {
      if (items[g].page === page) {
        activeGroup = groupNames[gi];
        break;
      }
    }
    if (activeGroup) break;
  }
  // Dashboard is a special case
  if (page === 'dashboard') activeGroup = '';

  /* ── Build Nav Bar HTML ── */
  var barEl = document.getElementById('breadcrumb-bar');
  if (barEl) {
    barEl.className = 'global-nav';

    var html = '';

    // Brand
    html += '<a href="' + base + '/index.html" class="nav-brand">';
    html += '<span class="nav-brand-logo">BRx</span>';
    html += '<span class="nav-brand-title">AMC Debt Navigator</span>';
    html += '</a>';

    // Dropdown groups
    html += '<div class="nav-groups">';
    for (var ni = 0; ni < groupNames.length; ni++) {
      var gName = groupNames[ni];
      var gItems = NAV_GROUPS[gName];
      var isActive = (gName === activeGroup);

      html += '<div class="nav-group" data-group="' + gName + '">';
      html += '<button class="nav-group-btn' + (isActive ? ' active' : '') + '" type="button">';
      html += gName;
      html += '<span class="nav-caret">&#9662;</span>';
      html += '</button>';

      html += '<div class="nav-dropdown">';
      for (var di = 0; di < gItems.length; di++) {
        var item = gItems[di];
        var isCurrent = (item.page === page);
        html += '<a href="' + item.href + '" class="nav-dropdown-link' + (isCurrent ? ' current' : '') + '">';
        html += item.label;
        html += '</a>';
      }
      html += '</div>';
      html += '</div>';
    }
    html += '</div>';

    // Quick-jump trigger
    html += '<button class="nav-quickjump-btn" type="button" id="quickjump-trigger">';
    html += '<span class="nav-search-icon">&#8981;</span>';
    html += '<span class="nav-quickjump-hint">';
    html += (navigator.platform && navigator.platform.indexOf('Mac') > -1) ? 'Cmd+K' : 'Ctrl+K';
    html += '</span>';
    html += '</button>';

    barEl.innerHTML = html;
  }

  /* ── Dropdown Behavior ── */
  var openDropdown = null;

  function closeAllDropdowns() {
    var drops = document.querySelectorAll('.nav-dropdown');
    for (var i = 0; i < drops.length; i++) {
      drops[i].classList.remove('open');
    }
    var btns = document.querySelectorAll('.nav-group-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.remove('expanded');
    }
    openDropdown = null;
  }

  function toggleDropdown(groupEl) {
    var dropdown = groupEl.querySelector('.nav-dropdown');
    var btn = groupEl.querySelector('.nav-group-btn');
    if (!dropdown) return;

    var wasOpen = dropdown.classList.contains('open');
    closeAllDropdowns();

    if (!wasOpen) {
      dropdown.classList.add('open');
      btn.classList.add('expanded');
      openDropdown = dropdown;
    }
  }

  // Delegate click on nav group buttons
  if (barEl) {
    barEl.addEventListener('click', function(e) {
      var btn = e.target.closest('.nav-group-btn');
      if (btn) {
        e.preventDefault();
        e.stopPropagation();
        toggleDropdown(btn.parentElement);
        return;
      }

      // Clicking a link closes dropdowns (navigation will happen)
      var link = e.target.closest('.nav-dropdown-link');
      if (link) {
        closeAllDropdowns();
      }
    });
  }

  // Click outside closes dropdowns
  document.addEventListener('click', function(e) {
    if (openDropdown && !e.target.closest('.nav-group')) {
      closeAllDropdowns();
    }
  });

  /* ── Quick-Jump Overlay ── */
  var JUMP_ITEMS = [];
  // Build flat list from all groups
  for (var ji = 0; ji < groupNames.length; ji++) {
    var gn = groupNames[ji];
    var gits = NAV_GROUPS[gn];
    for (var jj = 0; jj < gits.length; jj++) {
      JUMP_ITEMS.push({
        label: gits[jj].label,
        group: gn,
        href: gits[jj].href,
        keywords: gits[jj].keywords,
        page: gits[jj].page
      });
    }
  }
  // Also add dashboard
  JUMP_ITEMS.unshift({
    label: 'Dashboard',
    group: 'Home',
    href: base + '/index.html',
    keywords: 'dashboard home kpi overview',
    page: 'dashboard'
  });

  var qjBackdrop = null;
  var qjModal = null;
  var qjInput = null;
  var qjResults = null;
  var qjSelectedIdx = 0;
  var qjVisible = [];

  function buildQuickJump() {
    if (qjBackdrop) return; // Already built

    qjBackdrop = document.createElement('div');
    qjBackdrop.className = 'quick-jump-backdrop';
    qjBackdrop.style.display = 'none';

    qjModal = document.createElement('div');
    qjModal.className = 'quick-jump-modal';

    qjInput = document.createElement('input');
    qjInput.className = 'quick-jump-input';
    qjInput.type = 'text';
    qjInput.placeholder = 'Jump to page...';
    qjInput.setAttribute('autocomplete', 'off');
    qjInput.setAttribute('spellcheck', 'false');

    qjResults = document.createElement('div');
    qjResults.className = 'quick-jump-results';

    qjModal.appendChild(qjInput);
    qjModal.appendChild(qjResults);
    qjBackdrop.appendChild(qjModal);
    document.body.appendChild(qjBackdrop);

    // Input filtering
    qjInput.addEventListener('input', function() {
      filterQuickJump(qjInput.value);
    });

    // Keyboard navigation inside input
    qjInput.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeQuickJump();
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        qjSelectedIdx = Math.min(qjSelectedIdx + 1, qjVisible.length - 1);
        renderQuickJumpResults();
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        qjSelectedIdx = Math.max(qjSelectedIdx - 1, 0);
        renderQuickJumpResults();
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        if (qjVisible[qjSelectedIdx]) {
          window.location.href = qjVisible[qjSelectedIdx].href;
        }
        return;
      }
    });

    // Click backdrop to close
    qjBackdrop.addEventListener('click', function(e) {
      if (e.target === qjBackdrop) {
        closeQuickJump();
      }
    });

    // Click result items
    qjResults.addEventListener('click', function(e) {
      var item = e.target.closest('.quick-jump-item');
      if (item) {
        var idx = parseInt(item.getAttribute('data-idx'), 10);
        if (qjVisible[idx]) {
          window.location.href = qjVisible[idx].href;
        }
      }
    });
  }

  function filterQuickJump(query) {
    var q = query.toLowerCase().trim();
    if (!q) {
      qjVisible = JUMP_ITEMS.slice();
    } else {
      qjVisible = [];
      for (var i = 0; i < JUMP_ITEMS.length; i++) {
        var it = JUMP_ITEMS[i];
        var haystack = (it.label + ' ' + it.keywords + ' ' + it.group).toLowerCase();
        if (haystack.indexOf(q) > -1) {
          qjVisible.push(it);
        }
      }
    }
    qjSelectedIdx = 0;
    renderQuickJumpResults();
  }

  function renderQuickJumpResults() {
    var html = '';
    for (var i = 0; i < qjVisible.length; i++) {
      var it = qjVisible[i];
      var isActive = (i === qjSelectedIdx);
      var isCurrent = (it.page === page);
      html += '<div class="quick-jump-item' + (isActive ? ' active' : '') + (isCurrent ? ' current' : '') + '" data-idx="' + i + '">';
      html += '<span class="quick-jump-label">' + it.label + '</span>';
      html += '<span class="quick-jump-group">' + it.group + '</span>';
      html += '</div>';
    }
    if (qjVisible.length === 0) {
      html = '<div class="quick-jump-empty">No matching pages</div>';
    }
    qjResults.innerHTML = html;

    // Scroll active item into view
    var activeEl = qjResults.querySelector('.quick-jump-item.active');
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }

  function openQuickJump() {
    buildQuickJump();
    qjBackdrop.style.display = '';
    qjInput.value = '';
    qjVisible = JUMP_ITEMS.slice();
    qjSelectedIdx = 0;
    renderQuickJumpResults();
    // Delay focus to allow display transition
    setTimeout(function() { qjInput.focus(); }, 10);
  }

  function closeQuickJump() {
    if (qjBackdrop) {
      qjBackdrop.style.display = 'none';
    }
  }

  /* ── Quick-Jump Trigger Button ── */
  var triggerBtn = document.getElementById('quickjump-trigger');
  if (triggerBtn) {
    triggerBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openQuickJump();
    });
  }

  /* ── Keyboard Shortcuts ── */
  document.addEventListener('keydown', function(e) {
    // Escape closes quick-jump if open
    if (e.key === 'Escape' && qjBackdrop && qjBackdrop.style.display !== 'none') {
      closeQuickJump();
      return;
    }

    var tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

    // Cmd+K (Mac) / Ctrl+K (all) -> quick-jump overlay
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openQuickJump();
      return;
    }
  });

})();
