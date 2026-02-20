/* ===============================================
   AMC Debt Navigator - Scenario Detail Renderer
   Reads ?id= URL param, looks up scenario in
   AMC_SCENARIOS + AMC_SCENARIO_DETAILS, renders
   the full detail page.
   =============================================== */
(function () {
  'use strict';

  /* ════════════════════════════════════════════
     DATA SOURCES
     ════════════════════════════════════════════ */

  var scenarios = window.AMC_SCENARIOS || [];
  var details   = window.AMC_SCENARIO_DETAILS || {};
  var base      = document.body.getAttribute('data-base') || '..';

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
    'doc1': { name: 'DOC 1 - Covenant Strip',          url: 'docs/doc1-covenant-strip.html' },
    'doc2': { name: 'DOC 2 - Muvico 15% PIK Notes',    url: 'docs/doc2-muvico-secured-2029.html' },
    'doc3': { name: 'DOC 3 - AMC 7.5% Notes',          url: 'docs/doc3-amc-7500-notes.html' },
    'doc4': { name: 'DOC 4 - Term Loan Credit Agmt',    url: 'docs/doc4-credit-agreement.html' },
    'doc5': { name: 'DOC 5 - Exchangeable Notes',       url: 'docs/doc5-exchangeable-2030.html' },
    'doc6': { name: 'DOC 6 - Odeon Notes',              url: 'docs/doc6-odeon-notes.html' },
    'doc7': { name: 'DOC 7 - PIK Toggle Notes',         url: 'docs/doc7-pik-toggle.html' }
  };

  /* ── Research Slug -> Display Name + URL ── */
  var RESEARCH_MAP = {
    'lme-concepts':      { name: 'LME Foundations',     url: 'research/lme-concepts.html' },
    'novel-strategies':  { name: 'Novel Strategies',     url: 'research/novel-strategies.html' },
    'case-studies':      { name: 'Case Studies',         url: 'research/case-studies.html' },
    'countermeasures':   { name: 'Countermeasures',      url: 'research/countermeasures.html' },
    'court-rulings':     { name: 'Court Rulings',        url: 'research/court-rulings.html' },
    'court-solutions':   { name: 'Court Solutions',      url: 'research/court-solutions.html' },
    'lender-strategy':   { name: 'Lender Strategy',      url: 'research/lender-strategy.html' },
    'odeon-analysis':    { name: 'Odeon Analysis',       url: 'research/odeon-analysis.html' },
    'muvico-deep-dive':  { name: 'Muvico Deep Dive',     url: 'research/muvico-deep-dive.html' }
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
    'offensive':  { text: 'OFFENSIVE',   bg: 'rgba(239,68,68,0.15)',  color: '#ef4444', border: 'rgba(239,68,68,0.3)' },
    'defensive':  { text: 'DEFENSIVE',   bg: 'rgba(34,197,94,0.15)',  color: '#22c55e', border: 'rgba(34,197,94,0.3)' },
    'hybrid':     { text: 'HYBRID',      bg: 'rgba(234,179,8,0.15)',  color: '#eab308', border: 'rgba(234,179,8,0.3)' },
    'in-court':   { text: 'IN-COURT',    bg: 'rgba(59,130,246,0.15)', color: '#3b82f6', border: 'rgba(59,130,246,0.3)' }
  };

  var RISK_COLORS = {
    'high':   '#ef4444',
    'medium': '#eab308',
    'low':    '#22c55e'
  };

  /* ════════════════════════════════════════════
     HELPERS
     ════════════════════════════════════════════ */

  function esc(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function hexToRgba(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  }

  function nlToParagraphs(text) {
    if (!text) return '';
    return text.split(/\n\n+/).map(function (p) {
      return '<p>' + esc(p.trim()) + '</p>';
    }).join('');
  }

  function getParam(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match ? decodeURIComponent(match[1]) : null;
  }

  /* ════════════════════════════════════════════
     SECTION BUILDERS
     ════════════════════════════════════════════ */

  function buildHero(scenario) {
    var badge = CATEGORY_BADGE[scenario.category] || CATEGORY_BADGE.hybrid;
    var badgeEl = document.getElementById('scenario-category-badge');
    var titleEl = document.getElementById('scenario-title');
    var metaEl  = document.getElementById('scenario-meta');

    badgeEl.textContent = badge.text;
    badgeEl.style.cssText = 'display:inline-block; font-size:10px; font-weight:700; letter-spacing:1px; padding:4px 10px; border-radius:4px; background:' + badge.bg + '; color:' + badge.color + '; border:1px solid ' + badge.border + ';';

    titleEl.textContent = scenario.name;
    document.title = 'AMC Debt Navigator - ' + scenario.name;

    var meta = '';
    meta += '<div class="meta-item"><span class="meta-label">Category:</span> ' + esc(scenario.category) + '</div>';
    if (scenario.outputs) {
      meta += '<div class="meta-item"><span class="meta-label">Risk Level:</span> <span style="color:' + (RISK_COLORS[scenario.outputs.riskLevel] || '#eab308') + '; font-weight:700; text-transform:uppercase;">' + esc(scenario.outputs.riskLevel) + '</span></div>';
    }
    if (scenario.precedents && scenario.precedents.length) {
      meta += '<div class="meta-item"><span class="meta-label">Precedents:</span> ' + scenario.precedents.map(esc).join(', ') + '</div>';
    }
    metaEl.innerHTML = meta;

    /* Tranche tags */
    if (scenario.affectedTranches && scenario.affectedTranches.length) {
      var tagsDiv = document.createElement('div');
      tagsDiv.style.cssText = 'margin-top:12px; display:flex; gap:8px; flex-wrap:wrap;';
      for (var i = 0; i < scenario.affectedTranches.length; i++) {
        var tid = scenario.affectedTranches[i];
        var tr = TRANCHES[tid];
        if (tr) {
          tagsDiv.innerHTML += '<span style="display:inline-block; font-size:10px; padding:3px 8px; border-radius:4px; font-weight:600; background:' + hexToRgba(tr.color, 0.15) + '; color:' + tr.color + '; border:1px solid ' + hexToRgba(tr.color, 0.3) + ';">' + esc(tr.name) + '</span>';
        }
      }
      document.getElementById('scenario-header').appendChild(tagsDiv);
    }
  }

  function buildSummarySection(scenario) {
    var html = '';
    html += '<div class="doc-article" id="art-summary">';
    html += '<div class="article-header">Summary</div>';
    html += '<div class="doc-section" id="sec-overview">';
    html += '<div class="section-header"><span class="section-title">Overview</span></div>';
    html += '<div class="research-text">';
    html += '<p>' + esc(scenario.summary) + '</p>';
    html += '</div></div></div>';
    return html;
  }

  function buildMechanicsSection(scenario, detail) {
    var text = (detail && detail.detailedMechanics) ? detail.detailedMechanics : scenario.mechanics;
    var html = '';
    html += '<div class="doc-article" id="art-detailed-mechanics">';
    html += '<div class="article-header">Detailed Mechanics</div>';
    html += '<div class="doc-section" id="sec-mechanics">';
    html += '<div class="section-header"><span class="section-title">How It Works</span></div>';
    html += '<div class="research-text">';
    html += nlToParagraphs(text);
    html += '</div></div></div>';
    return html;
  }

  function buildApplicabilitySection(scenario, detail) {
    var text = (detail && detail.applicability) ? detail.applicability : scenario.applicability;
    if (!text) return '';
    var html = '';
    html += '<div class="doc-article" id="art-applicability">';
    html += '<div class="article-header">Why This Works at AMC</div>';
    html += '<div class="doc-section" id="sec-applicability">';
    html += '<div class="section-header"><span class="section-title">AMC-Specific Application</span></div>';
    html += '<div class="research-text">';
    html += nlToParagraphs(text);
    html += '</div></div></div>';
    return html;
  }

  function buildDocEvidenceSection(detail) {
    if (!detail || !detail.docEvidence || !detail.docEvidence.length) return '';
    var html = '';
    html += '<div class="doc-article" id="art-doc-evidence">';
    html += '<div class="article-header">Document Evidence</div>';

    for (var d = 0; d < detail.docEvidence.length; d++) {
      var docGroup = detail.docEvidence[d];
      var docInfo = DOC_MAP[docGroup.doc];
      var docName = docInfo ? docInfo.name : docGroup.doc;
      var docUrl  = docInfo ? (base + '/' + docInfo.url) : '#';

      for (var s = 0; s < docGroup.sections.length; s++) {
        var sec = docGroup.sections[s];
        var secId = 'sec-doc-' + docGroup.doc + '-' + s;
        html += '<div class="doc-section" id="' + secId + '">';
        html += '<div class="section-header">';
        html += '<span class="section-number"><a href="' + docUrl + '" style="color:var(--blue); text-decoration:none;">' + esc(docName) + '</a></span>';
        html += '<span class="section-title">' + esc(sec.ref) + ' - ' + esc(sec.title) + '</span>';
        html += '</div>';
        html += '<div class="translation-block">';
        html += '<div class="translation-label">RELEVANCE TO THIS SCENARIO</div>';
        html += '<div class="translation-text">';
        html += nlToParagraphs(sec.summary);
        html += '</div></div></div>';
      }
    }

    html += '</div>';
    return html;
  }

  function buildResearchContextSection(detail) {
    if (!detail || !detail.researchContext || !detail.researchContext.length) return '';
    var html = '';
    html += '<div class="doc-article" id="art-research-context">';
    html += '<div class="article-header">Research Context</div>';

    for (var r = 0; r < detail.researchContext.length; r++) {
      var ctx = detail.researchContext[r];
      var resInfo = RESEARCH_MAP[ctx.source];
      var resName = resInfo ? resInfo.name : ctx.source;
      var resUrl  = resInfo ? (base + '/' + resInfo.url) : '#';
      var secId = 'sec-research-' + r;

      html += '<div class="doc-section" id="' + secId + '">';
      html += '<div class="section-header">';
      html += '<span class="section-number"><a href="' + resUrl + '" style="color:var(--blue); text-decoration:none;">' + esc(resName) + '</a></span>';
      html += '<span class="section-title">' + esc(ctx.title) + '</span>';
      html += '</div>';
      html += '<div class="translation-block">';
      html += '<div class="translation-label">KEY FINDINGS</div>';
      html += '<div class="translation-text">';
      html += nlToParagraphs(ctx.excerpt);
      html += '</div></div></div>';
    }

    html += '</div>';
    return html;
  }

  function buildModelLinksSection(scenario) {
    if (!scenario.modelLinks || !scenario.modelLinks.length) return '';
    var html = '';
    html += '<div class="doc-article" id="art-model-links">';
    html += '<div class="article-header">Run in Model</div>';
    html += '<div class="doc-section" id="sec-model-links">';
    html += '<div class="section-header"><span class="section-title">Interactive Model Scenarios</span></div>';
    html += '<div class="research-text">';
    html += '<p>Explore this scenario in the interactive models with pre-configured parameters:</p>';
    html += '<div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:12px;">';

    for (var m = 0; m < scenario.modelLinks.length; m++) {
      var ml = scenario.modelLinks[m];
      var modelUrl = MODEL_MAP[ml.model];
      if (modelUrl) {
        var qs = Object.keys(ml.params).map(function (k) {
          return k + '=' + encodeURIComponent(ml.params[k]);
        }).join('&');
        var href = base + '/' + modelUrl + '?' + qs;
        html += '<a href="' + href + '" class="btn" style="font-size:12px; padding:8px 16px;">' + esc(ml.label) + '</a>';
      }
    }

    html += '</div></div></div></div>';
    return html;
  }

  function buildOutcomesSection(scenario) {
    if (!scenario.outputs) return '';
    var riskColor = RISK_COLORS[scenario.outputs.riskLevel] || '#eab308';
    var html = '';
    html += '<div class="doc-article" id="art-outcomes">';
    html += '<div class="article-header">Expected Outcomes</div>';
    html += '<div class="doc-section" id="sec-outcomes">';
    html += '<div class="section-header"><span class="section-title">Recovery Estimates</span></div>';
    html += '<div class="research-text">';
    html += '<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:16px; margin:16px 0;">';

    /* Winner */
    html += '<div style="padding:16px; background:var(--surface-2); border-radius:8px; border:1px solid var(--border);">';
    html += '<div style="font-size:10px; text-transform:uppercase; letter-spacing:1px; color:var(--text-dim); margin-bottom:8px; font-weight:600;">Winner Recovery</div>';
    html += '<div style="font-size:24px; font-weight:700; color:var(--green);">' + esc(scenario.outputs.winnerRecovery) + '</div>';
    html += '</div>';

    /* Loser */
    html += '<div style="padding:16px; background:var(--surface-2); border-radius:8px; border:1px solid var(--border);">';
    html += '<div style="font-size:10px; text-transform:uppercase; letter-spacing:1px; color:var(--text-dim); margin-bottom:8px; font-weight:600;">Loser Recovery</div>';
    html += '<div style="font-size:24px; font-weight:700; color:var(--red);">' + esc(scenario.outputs.loserRecovery) + '</div>';
    html += '</div>';

    /* Risk */
    html += '<div style="padding:16px; background:var(--surface-2); border-radius:8px; border:1px solid var(--border);">';
    html += '<div style="font-size:10px; text-transform:uppercase; letter-spacing:1px; color:var(--text-dim); margin-bottom:8px; font-weight:600;">Risk Level</div>';
    html += '<div style="font-size:24px; font-weight:700; text-transform:uppercase; color:' + riskColor + ';">' + esc(scenario.outputs.riskLevel) + '</div>';
    html += '</div>';

    html += '</div></div></div></div>';
    return html;
  }

  function buildPrecedentsSection(scenario) {
    if (!scenario.precedents || !scenario.precedents.length) return '';
    var html = '';
    html += '<div class="doc-article" id="art-precedents">';
    html += '<div class="article-header">Precedents</div>';
    html += '<div class="doc-section" id="sec-precedents">';
    html += '<div class="section-header"><span class="section-title">Historical Examples</span></div>';
    html += '<div class="research-text"><ul>';
    for (var p = 0; p < scenario.precedents.length; p++) {
      html += '<li>' + esc(scenario.precedents[p]) + '</li>';
    }
    html += '</ul></div></div></div>';
    return html;
  }

  function buildRelatedLinksSection(scenario) {
    var hasDocs = scenario.relatedDocs && scenario.relatedDocs.length;
    var hasResearch = scenario.relatedResearch && scenario.relatedResearch.length;
    if (!hasDocs && !hasResearch) return '';

    var html = '';
    html += '<div class="doc-article" id="art-related">';
    html += '<div class="article-header">Related Resources</div>';
    html += '<div class="doc-section" id="sec-related-links">';
    html += '<div class="section-header"><span class="section-title">Documents &amp; Research</span></div>';
    html += '<div class="research-text">';

    if (hasDocs) {
      html += '<p><strong>Related Documents:</strong></p><ul>';
      for (var d = 0; d < scenario.relatedDocs.length; d++) {
        var docInfo = DOC_MAP[scenario.relatedDocs[d]];
        if (docInfo) {
          html += '<li><a href="' + base + '/' + docInfo.url + '">' + esc(docInfo.name) + '</a></li>';
        }
      }
      html += '</ul>';
    }

    if (hasResearch) {
      html += '<p><strong>Related Research:</strong></p><ul>';
      for (var r = 0; r < scenario.relatedResearch.length; r++) {
        var resInfo = RESEARCH_MAP[scenario.relatedResearch[r]];
        if (resInfo) {
          html += '<li><a href="' + base + '/' + resInfo.url + '">' + esc(resInfo.name) + '</a></li>';
        }
      }
      html += '</ul>';
    }

    html += '</div></div></div>';
    return html;
  }

  /* ════════════════════════════════════════════
     404 / NOT FOUND
     ════════════════════════════════════════════ */

  function renderNotFound(id) {
    document.getElementById('scenario-title').textContent = 'Scenario Not Found';
    document.getElementById('scenario-body').innerHTML =
      '<div class="doc-article"><div class="research-text">' +
      '<p>No scenario found with ID <code>' + esc(id || '(empty)') + '</code>.</p>' +
      '<p><a href="' + base + '/scenarios.html">Back to Scenario Laboratory</a></p>' +
      '</div></div>';
  }

  /* ════════════════════════════════════════════
     MAIN RENDER
     ════════════════════════════════════════════ */

  function render() {
    var id = getParam('id');
    if (!id) { renderNotFound(id); return; }

    /* Look up scenario in AMC_SCENARIOS */
    var scenario = null;
    for (var i = 0; i < scenarios.length; i++) {
      if (scenarios[i].id === id) { scenario = scenarios[i]; break; }
    }
    if (!scenario) { renderNotFound(id); return; }

    /* Look up detail in AMC_SCENARIO_DETAILS */
    var detail = details[id] || null;

    /* Build hero */
    buildHero(scenario);

    /* Build body sections */
    var bodyHtml = '';
    bodyHtml += buildSummarySection(scenario);
    bodyHtml += buildMechanicsSection(scenario, detail);
    bodyHtml += buildApplicabilitySection(scenario, detail);
    bodyHtml += buildDocEvidenceSection(detail);
    bodyHtml += buildResearchContextSection(detail);
    bodyHtml += buildModelLinksSection(scenario);
    bodyHtml += buildOutcomesSection(scenario);
    bodyHtml += buildPrecedentsSection(scenario);
    bodyHtml += buildRelatedLinksSection(scenario);

    document.getElementById('scenario-body').innerHTML = bodyHtml;

    /* Update breadcrumb - set text after components.js renders the breadcrumb */
    setTimeout(function () {
      var crumbLinks = document.querySelectorAll('.breadcrumb-bar a, .breadcrumb-bar span');
      var lastCrumb = crumbLinks[crumbLinks.length - 1];
      if (lastCrumb) {
        lastCrumb.textContent = scenario.name;
      }
    }, 100);

    /* Trigger TOC build if doc-nav.js is available */
    if (window.AMCDocNav && typeof window.AMCDocNav.buildTOC === 'function') {
      setTimeout(function () { window.AMCDocNav.buildTOC(); }, 50);
    }

    /* Rescan cross-links */
    if (window.AMCCrossLink && typeof window.AMCCrossLink.rescan === 'function') {
      setTimeout(function () { window.AMCCrossLink.rescan(); }, 100);
    }
  }

  /* ════════════════════════════════════════════
     INIT
     ════════════════════════════════════════════ */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }

})();
