/* ═══════════════════════════════════════════════
   AMC Debt Navigator - Shared Components
   Sidebar, header, footer injection
   Works on file:// and GitHub Pages
   ═══════════════════════════════════════════════ */

(function() {
  'use strict';

  var page = document.body.getAttribute('data-page') || '';
  var pageTitle = document.title || 'AMC Debt Navigator';

  // Determine base path from data-base attribute or default
  var base = document.body.getAttribute('data-base') || '.';

  function isActive(id) {
    return page === id ? ' active' : '';
  }

  // ── Sidebar HTML ──
  var sidebarHTML = ''
    + '<div class="sidebar-header">'
    + '  <a href="' + base + '/index.html" class="sidebar-brand">AMC Debt Navigator</a>'
    + '  <div class="sidebar-sub">BRx Spring 2026 Case Competition</div>'
    + '</div>'
    + '<nav class="sidebar-nav">'

    // Overview
    + '<div class="nav-section">'
    + '  <div class="nav-section-title">Overview</div>'
    + '  <a href="' + base + '/index.html" class="nav-link' + isActive('dashboard') + '">'
    + '    <span class="nav-icon">&#9638;</span>Dashboard</a>'
    + '  <a href="' + base + '/structure.html" class="nav-link' + isActive('structure') + '">'
    + '    <span class="nav-icon">&#9640;</span>Structure Diagram</a>'
    + '  <a href="' + base + '/compare.html" class="nav-link' + isActive('compare') + '">'
    + '    <span class="nav-icon">&#8860;</span>Covenant Comparison</a>'
    + '  <a href="' + base + '/glossary.html" class="nav-link' + isActive('glossary') + '">'
    + '    <span class="nav-icon">&#9776;</span>Glossary</a>'
    + '  <a href="' + base + '/search.html" class="nav-link' + isActive('search') + '">'
    + '    <span class="nav-icon">&#8981;</span>Search All Docs</a>'
    + '</div>'

    // Documents
    + '<div class="nav-section">'
    + '  <div class="nav-section-title">Documents</div>'
    + '  <a href="' + base + '/docs/doc1-covenant-strip.html" class="nav-link' + isActive('doc1') + '">'
    + '    <span class="nav-icon">1</span>Covenant Strip'
    + '    <span class="nav-tag tag-unsec">Sub</span></a>'
    + '  <a href="' + base + '/docs/doc2-muvico-secured-2029.html" class="nav-link' + isActive('doc2') + '">'
    + '    <span class="nav-icon">2</span>Muvico 15% PIK'
    + '    <span class="nav-tag tag-15l">1.5L</span></a>'
    + '  <a href="' + base + '/docs/doc3-amc-7500-notes.html" class="nav-link' + isActive('doc3') + '">'
    + '    <span class="nav-icon">3</span>AMC 7.5% Notes'
    + '    <span class="nav-tag tag-2l">2L</span></a>'
    + '  <a href="' + base + '/docs/doc4-credit-agreement.html" class="nav-link' + isActive('doc4') + '">'
    + '    <span class="nav-icon">4</span>$2B Term Loan'
    + '    <span class="nav-tag tag-1l">1L</span></a>'
    + '  <a href="' + base + '/docs/doc5-exchangeable-2030.html" class="nav-link' + isActive('doc5') + '">'
    + '    <span class="nav-icon">5</span>Muvico 8% PIK'
    + '    <span class="nav-tag tag-125l">1.25L</span></a>'
    + '  <a href="' + base + '/docs/doc6-odeon-notes.html" class="nav-link' + isActive('doc6') + '">'
    + '    <span class="nav-icon">6</span>Odeon 12.75%'
    + '    <span class="nav-tag tag-unsec">Unsec</span></a>'
    + '  <a href="' + base + '/docs/doc6-odeon-exhibits.html" class="nav-link' + isActive('doc6-ex') + '">'
    + '    <span class="nav-icon">&nbsp;</span>DOC 6 Exhibits</a>'
    + '  <a href="' + base + '/docs/doc7-pik-toggle.html" class="nav-link' + isActive('doc7') + '">'
    + '    <span class="nav-icon">7</span>6/8% PIK Toggle'
    + '    <span class="nav-tag tag-2l">2L</span></a>'
    + '  <a href="' + base + '/docs/doc7-pik-toggle-exhibits.html" class="nav-link' + isActive('doc7-ex') + '">'
    + '    <span class="nav-icon">&nbsp;</span>DOC 7 Exhibits</a>'
    + '</div>'

    // Models
    + '<div class="nav-section">'
    + '  <div class="nav-section-title">Models</div>'
    + '  <a href="' + base + '/models/waterfall.html" class="nav-link' + isActive('waterfall') + '">'
    + '    <span class="nav-icon">&#9660;</span>Recovery Waterfall</a>'
    + '  <a href="' + base + '/models/pik-projector.html" class="nav-link' + isActive('pik') + '">'
    + '    <span class="nav-icon">&#8593;</span>PIK Projector</a>'
    + '  <a href="' + base + '/models/leverage.html" class="nav-link' + isActive('leverage') + '">'
    + '    <span class="nav-icon">&#8982;</span>Leverage Analyzer</a>'
    + '  <a href="' + base + '/models/exchange.html" class="nav-link' + isActive('exchange') + '">'
    + '    <span class="nav-icon">&#8644;</span>Exchange Calculator</a>'
    + '</div>'

    + '</nav>'
    + '<div class="sidebar-footer">'
    + '  AMC Entertainment Holdings, Inc.<br>'
    + '  Data as of Feb 18, 2026<br>'
    + '  BRx Spring 2026 Case Competition'
    + '</div>';

  // ── Inject Sidebar ──
  var sidebarEl = document.getElementById('sidebar');
  if (sidebarEl) {
    sidebarEl.innerHTML = sidebarHTML;
  }

  // ── Inject Header ──
  var headerEl = document.getElementById('content-header');
  if (headerEl) {
    var breadcrumb = headerEl.getAttribute('data-breadcrumb') || pageTitle;
    headerEl.innerHTML = ''
      + '<div class="breadcrumb">'
      + '  <a href="' + base + '/index.html">AMC Debt Navigator</a>'
      + '  <span class="sep">/</span>'
      + '  <span>' + breadcrumb + '</span>'
      + '</div>'
      + '<div class="header-actions">'
      + '  <a href="' + base + '/search.html" class="btn">&#8981; Search</a>'
      + '</div>';
  }

  // ── Mobile Toggle ──
  var toggle = document.querySelector('.mobile-toggle');
  var overlay = document.querySelector('.mobile-overlay');
  if (toggle && sidebarEl) {
    toggle.addEventListener('click', function() {
      sidebarEl.classList.toggle('open');
      if (overlay) overlay.classList.toggle('open');
    });
    if (overlay) {
      overlay.addEventListener('click', function() {
        sidebarEl.classList.remove('open');
        overlay.classList.remove('open');
      });
    }
  }

})();
