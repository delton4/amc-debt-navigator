/* ===============================================
   AMC Debt Navigator - Recovery Waterfall Model
   Calculates per-tranche recovery by EV scenario
   =============================================== */

(function() {
  'use strict';

  // ── Chart.js dark theme defaults ──
  Chart.defaults.color = '#8899b4';
  Chart.defaults.borderColor = '#2a3654';

  // ── Tranche data from cap-table.json ──
  var tranches = [
    { id: 'term-loan',    name: '$2B Term Loan (DOC 4)',    shortName: 'Term Loan',      lien: '1L',    face: 1999.1, waterfallRank: 1, entity: 'muvico', color: '#dc2626',
      doc: 'DOC 4', coupon: 'SOFR+700 (~10.6%)', maturity: 'Jul 2029', docUrl: '../docs/doc4-credit-agreement.html',
      structuralNote: 'Dual-borrower (AMC + Muvico). Senior-most lien on all Muvico assets. Includes Cash Hoarding covenant (§6.13) requiring ≥$240M combined cash.' },
    { id: 'muvico-8pik',  name: 'Muvico 8% PIK Exch. (DOC 5)', shortName: 'Muvico 8% PIK', lien: '1.25L', face: 154.5,  waterfallRank: 2, entity: 'muvico', color: '#ea580c',
      doc: 'DOC 5', coupon: '2% Cash + 6% PIK', maturity: 'Mar 2030', docUrl: '../docs/doc5-exchangeable-2030.html',
      structuralNote: 'Sits between 1L Term Loan and 1.5L PIK Notes. Exchangeable into AMC common stock at Art. X. Soft call only. PIK accruing to face.' },
    { id: 'muvico-15pik', name: 'Muvico 15% PIK (DOC 2)',   shortName: 'Muvico 15% PIK', lien: '1.5L',  face: 857.0,  waterfallRank: 3, entity: 'muvico', color: '#d97706',
      doc: 'DOC 2', coupon: '9% Cash + 6% PIK (Level 1)', maturity: 'Mar 2029', docUrl: '../docs/doc2-muvico-secured-2029.html',
      structuralNote: 'Leverage-grid rate: currently Level 1 (Muvico ≥7.5x) → 9% cash + 6% PIK. PIK growing face value. Largest single tranche by face.' },
    { id: 'muvico-6-8pik',name: '6/8% PIK Toggle (DOC 7)', shortName: '6/8% Toggle',    lien: '2L',    face: 107.4,  waterfallRank: 4, entity: 'muvico', color: '#ca8a04',
      doc: 'DOC 7', coupon: '6% Cash OR 8% PIK', maturity: 'Mar 2030', docUrl: '../docs/doc7-pik-toggle.html',
      structuralNote: 'Cash/PIK toggle at issuer election each period. Currently paying 8% PIK. Exchangeable into AMC common @ $5.66/share with declining call premium.' },
    { id: 'amc-750',      name: 'AMC 7.5% Notes (DOC 3)',  shortName: 'AMC 7.5%',       lien: '2L',    face: 360.0,  waterfallRank: 5, entity: 'amc',    color: '#6b7280',
      doc: 'DOC 3', coupon: '7.500% Fixed', maturity: 'Feb 2029', docUrl: '../docs/doc3-amc-7500-notes.html',
      structuralNote: 'AMC direct issue — 1L at AMC level but structurally 2L at Muvico. Recovery depends on AMC-level residual EV after all Muvico claims satisfied.' },
    { id: 'odeon-1275',   name: 'Odeon 12.75% (DOC 6)',    shortName: 'Odeon 12.75%',   lien: '1L-Ode', face: 400.0, waterfallRank: 6, entity: 'odeon',  color: '#3b82f6',
      doc: 'DOC 6', coupon: '12.750% Fixed', maturity: 'Feb 2027', docUrl: '../docs/doc6-odeon-notes.html',
      structuralNote: 'Ring-fenced in UK entity (Odeon Finco PLC). AMC guarantee is unsecured only. EARLIEST maturity (Feb 2027) — key near-term refinancing risk.' },
    { id: 'amc-sub',      name: 'AMC 6.125% Sub (DOC 1)', shortName: 'AMC 6.125% Sub', lien: 'Sub',   face: 125.5,  waterfallRank: 7, entity: 'amc',    color: '#a855f7',
      doc: 'DOC 1', coupon: '6.125% (covenants stripped)', maturity: 'Jun 2027', docUrl: '../docs/doc1-covenant-strip.html',
      structuralNote: 'All protective covenants deleted in 2020 LME (§§4.05–4.11 removed). Events of Default (e)–(j) deleted. All guarantees released. Lowest in waterfall.' }
  ];

  var totalFace = 0;
  for (var i = 0; i < tranches.length; i++) totalFace += tranches[i].face;

  // Pre-compute break-even EVs (cumulative face needed for full recovery)
  var sortedByRank = tranches.slice().sort(function(a,b) { return a.waterfallRank - b.waterfallRank; });
  var cumFace = 0;
  for (var bi = 0; bi < sortedByRank.length; bi++) {
    cumFace += sortedByRank[bi].face;
    sortedByRank[bi].breakEvenEV = cumFace;
    // Also set on original tranche object
    for (var bj = 0; bj < tranches.length; bj++) {
      if (tranches[bj].id === sortedByRank[bi].id) {
        tranches[bj].breakEvenEV = cumFace;
        break;
      }
    }
  }

  var currentView = 'consolidated';
  var chart = null;
  var entityCharts = { muvico: null, odeon: null, amc: null };

  // ── Formatting helpers ──
  function fmt(n) { return '$' + n.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'M'; }
  function fmtPct(n) { return n.toFixed(1) + '%'; }
  function fmtX(n) { return n.toFixed(2) + 'x'; }

  // ── Consolidated waterfall calculation ──
  function calcConsolidated(ev) {
    var remaining = ev;
    var results = [];
    // Sort by waterfallRank
    var sorted = tranches.slice().sort(function(a,b) { return a.waterfallRank - b.waterfallRank; });
    for (var i = 0; i < sorted.length; i++) {
      var t = sorted[i];
      var recovery = Math.min(t.face, Math.max(0, remaining));
      remaining -= recovery;
      var pct = t.face > 0 ? (recovery / t.face) * 100 : 0;
      var centsOnDollar = t.face > 0 ? (recovery / t.face) * 100 : 0;
      results.push({
        name: t.shortName,
        lien: t.lien,
        face: t.face,
        recovery: recovery,
        pct: pct,
        color: t.color,
        entity: t.entity,
        breakEvenEV: t.breakEvenEV,
        centsOnDollar: centsOnDollar,
        docUrl: t.docUrl,
        structuralNote: t.structuralNote,
        doc: t.doc,
        coupon: t.coupon,
        maturity: t.maturity
      });
    }
    return results;
  }

  // ── Entity-level waterfall calculation ──
  function calcEntityLevel(ev) {
    // Split EV proportionally by EBITDA share (50% Muvico, 4.7% Odeon, 45.3% AMC residual)
    var muvicoEV = ev * 0.50;
    var odeonEV = ev * 0.047;
    var amcEV = ev * 0.453;

    var pools = { muvico: [], odeon: [], amc: [] };

    // Muvico pool: tranches with entity='muvico', ranked by muvico lien priority
    var muvicoTranches = [
      { name: 'Term Loan',       face: 1999.1, color: '#dc2626', rank: 1 },
      { name: 'Muvico 8% PIK',   face: 154.5,  color: '#ea580c', rank: 2 },
      { name: 'Muvico 15% PIK',  face: 857.0,  color: '#d97706', rank: 3 },
      { name: '6/8% Toggle',     face: 107.4,  color: '#ca8a04', rank: 4 }
    ];

    var remaining = muvicoEV;
    var deficiency = 0;
    for (var i = 0; i < muvicoTranches.length; i++) {
      var t = muvicoTranches[i];
      var recovery = Math.min(t.face, Math.max(0, remaining));
      remaining -= recovery;
      deficiency += (t.face - recovery);
      pools.muvico.push({ name: t.name, face: t.face, recovery: recovery, pct: t.face > 0 ? (recovery/t.face)*100 : 0, color: t.color });
    }

    // Odeon pool
    remaining = odeonEV;
    var odeonDeficiency = 0;
    var odeonT = { name: 'Odeon 12.75%', face: 400.0, color: '#3b82f6' };
    var odeonRec = Math.min(odeonT.face, Math.max(0, remaining));
    remaining -= odeonRec;
    odeonDeficiency = odeonT.face - odeonRec;
    pools.odeon.push({ name: odeonT.name, face: odeonT.face, recovery: odeonRec, pct: odeonT.face > 0 ? (odeonRec/odeonT.face)*100 : 0, color: odeonT.color });

    // AMC residual pool: AMC-level claims + deficiency claims flowing up
    remaining = amcEV;
    var amcTranches = [
      { name: 'AMC 7.5% Notes',  face: 360.0,  color: '#6b7280' },
      { name: 'AMC 6.125% Sub',  face: 125.5,  color: '#a855f7' },
      { name: 'Muvico Deficiency', face: deficiency, color: '#ca8a04' },
      { name: 'Odeon Deficiency',  face: odeonDeficiency, color: '#3b82f6' }
    ];
    for (var j = 0; j < amcTranches.length; j++) {
      var a = amcTranches[j];
      if (a.face <= 0) continue;
      var rec = Math.min(a.face, Math.max(0, remaining));
      remaining -= rec;
      pools.amc.push({ name: a.name, face: a.face, recovery: rec, pct: a.face > 0 ? (rec/a.face)*100 : 0, color: a.color });
    }

    return pools;
  }

  // ── Update key metrics ──
  function updateMetrics(ev, results) {
    var totalRecovery = 0;
    var weightedSum = 0;
    if (Array.isArray(results)) {
      for (var i = 0; i < results.length; i++) {
        totalRecovery += results[i].recovery;
        weightedSum += results[i].pct * results[i].face;
      }
    }
    var weightedAvg = totalFace > 0 ? weightedSum / totalFace : 0;

    document.getElementById('key-metrics').innerHTML = ''
      + '<div class="model-metric"><div class="label">Total Enterprise Value</div><div class="value" style="color:#3b82f6;">' + fmt(ev) + '</div></div>'
      + '<div class="model-metric"><div class="label">Total Debt (Face)</div><div class="value" style="color:#e2e8f0;">' + fmt(totalFace) + '</div></div>'
      + '<div class="model-metric"><div class="label">Total Recovery</div><div class="value" style="color:' + (totalRecovery >= totalFace ? '#22c55e' : '#ef4444') + ';">' + fmt(totalRecovery) + '</div></div>'
      + '<div class="model-metric"><div class="label">Weighted Avg Recovery</div><div class="value" style="color:' + (weightedAvg >= 100 ? '#22c55e' : weightedAvg >= 50 ? '#eab308' : '#ef4444') + ';">' + fmtPct(weightedAvg) + '</div></div>';
  }

  // ── Build consolidated chart ──
  function buildConsolidatedChart(results) {
    var ctx = document.getElementById('waterfall-chart').getContext('2d');

    var labels = [];
    var recoveryData = [];
    var lossData = [];
    var colors = [];
    var lossColors = [];

    for (var i = 0; i < results.length; i++) {
      labels.push(results[i].name);
      recoveryData.push(results[i].recovery);
      lossData.push(results[i].face - results[i].recovery);
      colors.push(results[i].color);
      lossColors.push('rgba(255,255,255,0.06)');
    }

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Recovery',
            data: recoveryData,
            backgroundColor: colors,
            borderWidth: 0,
            borderRadius: 2
          },
          {
            label: 'Loss',
            data: lossData,
            backgroundColor: lossColors,
            borderWidth: 0,
            borderRadius: 2
          }
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: 'top', labels: { padding: 16, usePointStyle: true, pointStyle: 'rect', font: { size: 10, family: "'SF Mono', monospace" } } },
          tooltip: {
            callbacks: {
              label: function(ctx) {
                return ctx.dataset.label + ': ' + fmt(ctx.parsed.x);
              }
            }
          }
        },
        scales: {
          x: {
            stacked: true,
            grid: { color: 'rgba(42,54,84,0.5)' },
            ticks: { callback: function(v) { return '$' + v + 'M'; }, font: { size: 10 } },
            title: { display: true, text: '$ Millions', font: { size: 10 } }
          },
          y: {
            stacked: true,
            grid: { display: false },
            ticks: { font: { size: 11, family: "'SF Mono', monospace" } }
          }
        }
      }
    });
  }

  // ── Build entity-level charts ──
  function buildEntityChart(canvasId, data, existingChart) {
    if (existingChart) existingChart.destroy();
    if (!data || data.length === 0) return null;

    var ctx = document.getElementById(canvasId).getContext('2d');
    var labels = [], recoveryData = [], lossData = [], colors = [];

    for (var i = 0; i < data.length; i++) {
      labels.push(data[i].name);
      recoveryData.push(data[i].recovery);
      lossData.push(data[i].face - data[i].recovery);
      colors.push(data[i].color);
    }

    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          { label: 'Recovery', data: recoveryData, backgroundColor: colors, borderWidth: 0, borderRadius: 2 },
          { label: 'Loss', data: lossData, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 0, borderRadius: 2 }
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: function(ctx) { return ctx.dataset.label + ': ' + fmt(ctx.parsed.x); } } }
        },
        scales: {
          x: { stacked: true, grid: { color: 'rgba(42,54,84,0.5)' }, ticks: { callback: function(v) { return '$' + v + 'M'; }, font: { size: 10 } } },
          y: { stacked: true, grid: { display: false }, ticks: { font: { size: 10, family: "'SF Mono', monospace" } } }
        }
      }
    });
  }

  // ── Build results table ──
  function buildTable(results, ev) {
    var tbody = document.getElementById('results-body');
    var html = '';
    for (var i = 0; i < results.length; i++) {
      var r = results[i];
      var barClass = r.pct >= 100 ? '' : r.pct > 0 ? ' partial' : ' zero';
      var barWidth = Math.max(2, r.pct);
      var cents = r.face > 0 ? (r.recovery / r.face * 100) : 0;
      var centsColor = cents >= 100 ? '#22c55e' : cents > 0 ? '#eab308' : '#ef4444';
      var beColor = ev >= r.breakEvenEV ? '#22c55e' : ev >= (r.breakEvenEV - r.face) ? '#eab308' : '#ef4444';
      var docLink = r.docUrl ? '<a href="' + r.docUrl + '" style="color:inherit; opacity:0.6; font-size:9px; font-weight:700; margin-left:5px; letter-spacing:0.5px;">' + r.doc + '</a>' : '';
      html += '<tr>'
        + '<td style="color:' + r.color + '; font-weight:600;">' + r.name + docLink + '</td>'
        + '<td style="font-size:10px; color:var(--text-muted);">' + (r.lien || '-') + '</td>'
        + '<td class="right" style="font-size:11px;">' + fmt(r.face) + '</td>'
        + '<td class="right" style="font-size:11px; color:' + beColor + ';">' + fmt(r.breakEvenEV) + '</td>'
        + '<td class="right" style="font-weight:700; color:' + (r.pct >= 100 ? '#22c55e' : r.pct > 0 ? '#eab308' : '#ef4444') + ';">' + fmt(r.recovery) + '</td>'
        + '<td class="right" style="color:' + (r.pct >= 100 ? '#22c55e' : r.pct > 0 ? '#eab308' : '#ef4444') + ';">' + fmtPct(r.pct) + '</td>'
        + '<td class="right" style="font-weight:700; color:' + centsColor + ';">' + cents.toFixed(0) + '¢</td>'
        + '<td><div class="recovery-bar-cell"><div class="recovery-bar' + barClass + '" style="width:' + barWidth + '%;"></div></div></td>'
        + '</tr>';
    }
    tbody.innerHTML = html;
  }

  // ── Build entity results table ──
  function buildEntityTable(pools) {
    var tbody = document.getElementById('results-body');
    var html = '';
    var sections = [
      { label: 'MUVICO POOL', data: pools.muvico },
      { label: 'ODEON POOL', data: pools.odeon },
      { label: 'AMC RESIDUAL POOL', data: pools.amc }
    ];
    for (var s = 0; s < sections.length; s++) {
      html += '<tr><td colspan="6" style="background:var(--surface-2); font-size:9px; font-weight:700; letter-spacing:1.5px; color:var(--text-muted); padding:8px 12px;">' + sections[s].label + '</td></tr>';
      for (var i = 0; i < sections[s].data.length; i++) {
        var r = sections[s].data[i];
        var barClass = r.pct >= 100 ? '' : r.pct > 0 ? ' partial' : ' zero';
        var barWidth = Math.max(2, r.pct);
        html += '<tr>'
          + '<td style="color:' + r.color + '; font-weight:600;">' + r.name + '</td>'
          + '<td>-</td>'
          + '<td class="right">' + fmt(r.face) + '</td>'
          + '<td class="right" style="font-weight:700; color:' + (r.pct >= 100 ? '#22c55e' : r.pct > 0 ? '#eab308' : '#ef4444') + ';">' + fmt(r.recovery) + '</td>'
          + '<td class="right" style="color:' + (r.pct >= 100 ? '#22c55e' : r.pct > 0 ? '#eab308' : '#ef4444') + ';">' + fmtPct(r.pct) + '</td>'
          + '<td><div class="recovery-bar-cell"><div class="recovery-bar' + barClass + '" style="width:' + barWidth + '%;"></div></div></td>'
          + '</tr>';
      }
    }
    tbody.innerHTML = html;
  }

  // ── Sensitivity table ──
  function buildSensitivityTable(ebitda, cash) {
    var container = document.getElementById('sensitivity-table');
    if (!container) return;

    var multiples = [2, 3, 4, 5, 6, 7, 8, 10];
    var sorted = tranches.slice().sort(function(a,b) { return a.waterfallRank - b.waterfallRank; });

    var html = '<div style="overflow-x:auto;"><table class="data-table" style="min-width:600px;">';
    // Header row
    html += '<thead><tr><th style="font-size:10px;">Tranche</th><th class="right" style="font-size:9px; color:var(--text-muted);">Face</th>';
    for (var m = 0; m < multiples.length; m++) {
      var ev = multiples[m] * ebitda + cash;
      html += '<th class="right" style="font-size:9px;">' + multiples[m] + 'x<br><span style="color:var(--text-dim); font-weight:400;">' + fmt(ev) + '</span></th>';
    }
    html += '</tr></thead><tbody>';

    // One row per tranche
    for (var t = 0; t < sorted.length; t++) {
      var tr = sorted[t];
      html += '<tr><td style="font-size:11px; font-weight:600; color:' + tr.color + ';">' + tr.shortName + '</td>';
      html += '<td class="right" style="font-size:10px; color:var(--text-muted);">' + fmt(tr.face) + '</td>';
      for (var m2 = 0; m2 < multiples.length; m2++) {
        var scenEV = multiples[m2] * ebitda + cash;
        var results = calcConsolidated(scenEV);
        var rec = results[t] ? results[t].pct : 0;
        var bgColor = rec >= 100 ? 'rgba(34,197,94,0.15)' : rec > 0 ? 'rgba(234,179,8,0.15)' : 'rgba(239,68,68,0.08)';
        var txtColor = rec >= 100 ? '#22c55e' : rec > 0 ? '#eab308' : '#ef4444';
        html += '<td class="right" style="font-size:10px; font-weight:700; color:' + txtColor + '; background:' + bgColor + ';">' + (rec >= 100 ? '100%' : rec > 0 ? rec.toFixed(0) + '%' : '—') + '</td>';
      }
      html += '</tr>';
    }

    html += '</tbody></table></div>';
    html += '<div style="font-size:9px; color:var(--text-dim); margin-top:6px;">EV = Multiple × EBITDA input + Cash input. Green = full recovery, yellow = partial, red = zero.</div>';
    container.innerHTML = html;
  }

  // ── Tranche reference cards (static, built once) ──
  function buildTrancheCards() {
    var container = document.getElementById('tranche-cards');
    if (!container) return;

    var sorted = tranches.slice().sort(function(a,b) { return a.waterfallRank - b.waterfallRank; });
    var html = '<div class="tranche-card-grid">';

    for (var i = 0; i < sorted.length; i++) {
      var t = sorted[i];
      html += '<div class="tranche-card" style="border-left:3px solid ' + t.color + ';">'
        + '<div class="tranche-card-header">'
        + '  <span style="color:' + t.color + '; font-weight:700; font-size:12px;">' + t.shortName + '</span>'
        + '  <span class="tranche-card-lien" style="background:' + t.color + '22; color:' + t.color + ';">' + t.lien + '</span>'
        + '</div>'
        + '<div class="tranche-card-meta">'
        + '  <div class="tranche-meta-row"><span class="meta-label">Document</span><a href="' + t.docUrl + '" style="color:var(--blue); font-size:10px; font-weight:600;">' + t.doc + ' ↗</a></div>'
        + '  <div class="tranche-meta-row"><span class="meta-label">Coupon</span><span>' + t.coupon + '</span></div>'
        + '  <div class="tranche-meta-row"><span class="meta-label">Maturity</span><span>' + t.maturity + '</span></div>'
        + '  <div class="tranche-meta-row"><span class="meta-label">Face</span><span>' + fmt(t.face) + '</span></div>'
        + '  <div class="tranche-meta-row"><span class="meta-label">Break-Even EV</span><span style="color:var(--text-muted);">' + fmt(t.breakEvenEV) + '</span></div>'
        + '</div>'
        + '<div class="tranche-card-note">' + t.structuralNote + '</div>'
        + '</div>';
    }

    html += '</div>';
    container.innerHTML = html;
  }

  // ── Main update function ──
  function update() {
    var multiple = parseFloat(document.getElementById('ev-multiple').value) || 0;
    var ebitda = parseFloat(document.getElementById('ebitda-input').value) || 0;
    var cash = parseFloat(document.getElementById('cash-input').value) || 0;

    document.getElementById('ev-multiple-val').textContent = fmtX(multiple);

    var ev = (multiple * ebitda) + cash;

    if (currentView === 'consolidated') {
      var results = calcConsolidated(ev);
      updateMetrics(ev, results);
      document.getElementById('chart-wrapper').parentElement.style.display = '';
      document.getElementById('entity-charts').style.display = 'none';
      buildConsolidatedChart(results);
      buildTable(results, ev);

      // EV exhaustion note
      var noteEl = document.getElementById('ev-exhaustion-note');
      if (noteEl && currentView === 'consolidated') {
        var sorted2 = tranches.slice().sort(function(a,b) { return a.waterfallRank - b.waterfallRank; });
        var remaining2 = ev;
        var parts = [];
        for (var ni = 0; ni < sorted2.length; ni++) {
          var nt = sorted2[ni];
          var nRec = Math.min(nt.face, Math.max(0, remaining2));
          remaining2 -= nRec;
          var nPct = nt.face > 0 ? nRec / nt.face * 100 : 0;
          if (nPct >= 100) {
            parts.push('<span style="color:#22c55e;">✓ ' + nt.shortName + '</span>');
          } else if (nPct > 0) {
            parts.push('<span style="color:#eab308;">⚡ ' + nt.shortName + ' (' + nPct.toFixed(0) + '%)</span>');
          } else {
            parts.push('<span style="color:#ef4444; opacity:0.5;">✗ ' + nt.shortName + '</span>');
          }
        }
        noteEl.innerHTML = 'EV ' + fmt(ev) + ' → ' + parts.join(' · ');
      } else if (noteEl) {
        noteEl.innerHTML = '';
      }
    } else {
      var pools = calcEntityLevel(ev);
      // Flatten for metrics
      var flat = pools.muvico.concat(pools.odeon).concat(pools.amc);
      updateMetrics(ev, flat);
      document.getElementById('chart-wrapper').parentElement.style.display = 'none';
      document.getElementById('entity-charts').style.display = '';
      entityCharts.muvico = buildEntityChart('muvico-chart', pools.muvico, entityCharts.muvico);
      entityCharts.odeon = buildEntityChart('odeon-chart', pools.odeon, entityCharts.odeon);
      entityCharts.amc = buildEntityChart('amc-chart', pools.amc, entityCharts.amc);
      buildEntityTable(pools);

      // Clear exhaustion note in entity view
      var noteEl2 = document.getElementById('ev-exhaustion-note');
      if (noteEl2) noteEl2.innerHTML = '';
    }

    buildSensitivityTable(ebitda, cash);
  }

  // ── EV Preset buttons ──
  window.setEVPreset = function(preset) {
    var LTM_EBITDA = 371.1;
    var NET_DEBT = 3644.2;
    var multipleEl = document.getElementById('ev-multiple');
    var ebitdaEl = document.getElementById('ebitda-input');

    if (preset === 'nd') {
      // Set EV = Net Debt (par recovery scenario)
      ebitdaEl.value = LTM_EBITDA;
      var cashVal = parseFloat(document.getElementById('cash-input').value) || 366;
      var neededMultiple = (NET_DEBT - cashVal) / LTM_EBITDA;
      multipleEl.value = Math.max(0, Math.min(neededMultiple, parseFloat(multipleEl.max || 20))).toFixed(1);
    } else {
      ebitdaEl.value = LTM_EBITDA;
      multipleEl.value = preset;
      document.getElementById('ev-multiple-val').textContent = preset.toFixed ? preset.toFixed(2) + 'x' : preset + '.00x';
    }
    update();
  };

  // ── View toggle ──
  window.setView = function(view) {
    currentView = view;
    var btns = document.querySelectorAll('.toggle-btn[data-view]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle('active', btns[i].getAttribute('data-view') === view);
    }
    update();
  };

  // ── Event listeners ──
  document.getElementById('ev-multiple').addEventListener('input', update);
  document.getElementById('ebitda-input').addEventListener('input', update);
  document.getElementById('cash-input').addEventListener('input', update);

  // ── URL parameter presets ──
  (function() {
    var params = new URLSearchParams(window.location.search);
    var LTM_EBITDA = 371.1;
    var evParam = params.get('ev');
    var scenarioParam = params.get('scenario');
    var targetEV = null;
    if (scenarioParam === 'distress')   targetEV = 2000;
    else if (scenarioParam === 'base')  targetEV = 3500;
    else if (scenarioParam === 'optimistic') targetEV = 5000;
    if (evParam !== null && !isNaN(parseFloat(evParam))) targetEV = parseFloat(evParam);
    if (targetEV !== null) {
      var cashVal = parseFloat(document.getElementById('cash-input').value) || 366;
      document.getElementById('ebitda-input').value = LTM_EBITDA;
      var neededMultiple = Math.max(0, (targetEV - cashVal) / LTM_EBITDA);
      document.getElementById('ev-multiple').value = neededMultiple.toFixed(2);
      update();
    }
  })();

  // ── Initial render ──
  update();
  buildTrancheCards();

})();
