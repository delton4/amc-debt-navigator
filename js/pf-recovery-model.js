/* ===============================================
   AMC Debt Navigator - Pro-Forma Recovery Model
   EV slider, waterfall recalculation, heatmap
   =============================================== */

(function() {
  'use strict';

  var U = window.AMC_UTILS;
  var fmt = U.fmt;
  var fmtPct = U.fmtPct;

  // ── State ──
  var recoveryData = null;
  var capTableData = null;
  var originalTotalEV = 0;
  var currentView = 'table';

  // ── Face values for waterfall allocation (ordered by seniority) ──
  // These are derived from pf-recoveries.json recoveries array
  var trancheFaces = null; // populated on data load

  // ── Helpers ──

  /**
   * Compute recovery percentages via waterfall allocation for a given total EV.
   * Walks tranches top-to-bottom by seniority, allocates EV to each until face exhausted.
   * Returns array of { name, face, totalAmt, totalPct, odeonAmt, odeonPct, amcAmt, amcPct, muvicoAmt, muvicoPct }
   */
  function computeWaterfall(totalEV, recoveries, evBreakdown) {
    var origTotal = evBreakdown.amc + evBreakdown.odeon + evBreakdown.muvico;
    if (origTotal <= 0) origTotal = 1;

    // Entity EV proportions
    var odeonRatio = evBreakdown.odeon / origTotal;
    var amcRatio = evBreakdown.amc / origTotal;
    var muvicoRatio = evBreakdown.muvico / origTotal;

    var remaining = totalEV;
    var results = [];

    for (var i = 0; i < recoveries.length; i++) {
      var r = recoveries[i];
      // Face = totalAmt at full recovery (use original total recovery proportions)
      var face = trancheFaces[i];
      var allocated = Math.min(face, Math.max(0, remaining));
      remaining -= allocated;
      var pct = face > 0 ? allocated / face : 0;

      // Entity split: use original proportions from the base-case JSON data
      // If in original data a tranche had entity recoveries, distribute proportionally
      var origOdeon = r.odeonAmt || 0;
      var origAmc = r.amcAmt || 0;
      var origMuvico = r.muvicoAmt || 0;
      var origTotal_t = origOdeon + origAmc + origMuvico;

      var odeonAmt, amcAmt, muvicoAmt;
      if (origTotal_t > 0) {
        // Scale based on original entity proportions for this tranche
        odeonAmt = allocated * (origOdeon / origTotal_t);
        amcAmt = allocated * (origAmc / origTotal_t);
        muvicoAmt = allocated * (origMuvico / origTotal_t);
      } else {
        // No original recovery -- distribute by overall EV ratios
        odeonAmt = allocated * odeonRatio;
        amcAmt = allocated * amcRatio;
        muvicoAmt = allocated * muvicoRatio;
      }

      results.push({
        name: r.name,
        face: face,
        totalAmt: allocated,
        totalPct: pct,
        odeonAmt: odeonAmt,
        odeonPct: face > 0 ? odeonAmt / face : 0,
        amcAmt: amcAmt,
        amcPct: face > 0 ? amcAmt / face : 0,
        muvicoAmt: muvicoAmt,
        muvicoPct: face > 0 ? muvicoAmt / face : 0
      });
    }
    return results;
  }

  /**
   * Determine face value for each tranche from the pf-recoveries data.
   * Uses the entityCapTables to find total face for each recovery tranche name.
   */
  function deriveFaceValues(data) {
    var faces = [];
    var entityCaps = data.entityCapTables || [];

    // Build lookup of face values from entity cap tables
    var faceLookup = {};
    for (var e = 0; e < entityCaps.length; e++) {
      var ent = entityCaps[e];
      for (var t = 0; t < ent.tranches.length; t++) {
        var tr = ent.tranches[t];
        if (tr.face && !faceLookup[tr.name]) {
          faceLookup[tr.name] = tr.face;
        }
      }
    }

    // Map recovery names to face values
    // Recovery array includes: Total Term Loans (sum of First+Second+Third Out),
    // then individual tranches
    var recoveries = data.recoveries;
    for (var i = 0; i < recoveries.length; i++) {
      var r = recoveries[i];
      var name = r.name;

      if (name === 'Total Term Loans') {
        // Sum of First Out + Second Out + Third Out faces
        var fo = faceLookup['First Out (1L)'] || 576;
        var so = faceLookup['Second Out (1L)'] || 846;
        var to = faceLookup['Third Out (1L)'] || 270;
        faces.push(fo + so + to);
      } else if (faceLookup[name]) {
        faces.push(faceLookup[name]);
      } else if (name === 'AMC 7.5% Notes due 2029') {
        faces.push(360);
      } else if (name === 'Odeon Finco Plc Notes') {
        faces.push(400);
      } else if (name === 'AMC 6.125% Notes due 2027') {
        faces.push(126);
      } else {
        // Fallback: if totalPct > 0, derive from totalAmt / totalPct
        if (r.totalPct > 0) {
          faces.push(Math.round(r.totalAmt / r.totalPct));
        } else {
          faces.push(r.totalAmt || 0);
        }
      }
    }
    return faces;
  }

  // ── Render Recovery Table ──

  function renderRecoveryTable(results) {
    var tbody = document.getElementById('recovery-body');
    if (!tbody) return;
    var html = '';
    var totalFace = 0, totalOdeon = 0, totalAmc = 0, totalMuvico = 0, totalAll = 0;

    for (var i = 0; i < results.length; i++) {
      var r = results[i];
      totalFace += r.face;
      totalOdeon += r.odeonAmt;
      totalAmc += r.amcAmt;
      totalMuvico += r.muvicoAmt;
      totalAll += r.totalAmt;

      var pctColor = recoveryColor(r.totalPct);
      html += '<tr>'
        + '<td style="font-weight:600; font-size:11px;">' + r.name + '</td>'
        + '<td class="right" style="font-size:11px;">' + fmt(r.face) + '</td>'
        + '<td class="right" style="font-size:10px; color:var(--text-muted);">' + fmtPct(r.odeonPct * 100) + '</td>'
        + '<td class="right" style="font-size:10px; color:var(--text-muted);">' + fmt(r.odeonAmt) + '</td>'
        + '<td class="right" style="font-size:10px; color:var(--text-muted);">' + fmtPct(r.amcPct * 100) + '</td>'
        + '<td class="right" style="font-size:10px; color:var(--text-muted);">' + fmt(r.amcAmt) + '</td>'
        + '<td class="right" style="font-size:10px; color:var(--text-muted);">' + fmtPct(r.muvicoPct * 100) + '</td>'
        + '<td class="right" style="font-size:10px; color:var(--text-muted);">' + fmt(r.muvicoAmt) + '</td>'
        + '<td class="right" style="font-weight:700; color:' + pctColor + ';">' + fmtPct(r.totalPct * 100) + '</td>'
        + '<td class="right" style="font-weight:700; color:' + pctColor + ';">' + fmt(r.totalAmt) + '</td>'
        + '</tr>';
    }

    // Totals row
    var totalPct = totalFace > 0 ? totalAll / totalFace : 0;
    html += '<tr style="border-top:2px solid var(--border); font-weight:700;">'
      + '<td>TOTAL</td>'
      + '<td class="right">' + fmt(totalFace) + '</td>'
      + '<td class="right" style="font-size:10px;">' + fmtPct((totalFace > 0 ? totalOdeon / totalFace : 0) * 100) + '</td>'
      + '<td class="right">' + fmt(totalOdeon) + '</td>'
      + '<td class="right" style="font-size:10px;">' + fmtPct((totalFace > 0 ? totalAmc / totalFace : 0) * 100) + '</td>'
      + '<td class="right">' + fmt(totalAmc) + '</td>'
      + '<td class="right" style="font-size:10px;">' + fmtPct((totalFace > 0 ? totalMuvico / totalFace : 0) * 100) + '</td>'
      + '<td class="right">' + fmt(totalMuvico) + '</td>'
      + '<td class="right" style="color:' + recoveryColor(totalPct) + ';">' + fmtPct(totalPct * 100) + '</td>'
      + '<td class="right" style="color:' + recoveryColor(totalPct) + ';">' + fmt(totalAll) + '</td>'
      + '</tr>';

    tbody.innerHTML = html;
  }

  // ── Recovery color coding ──
  function recoveryColor(pct) {
    // pct is decimal (0.0 to 1.0)
    if (pct >= 0.80) return '#22c55e';
    if (pct >= 0.40) return '#eab308';
    return '#ef4444';
  }

  function recoveryBgColor(pct) {
    if (pct >= 0.80) return 'rgba(34,197,94,0.20)';
    if (pct >= 0.40) return 'rgba(234,179,8,0.15)';
    if (pct > 0) return 'rgba(239,68,68,0.12)';
    return 'rgba(239,68,68,0.06)';
  }

  // ── Render Heatmap ──

  function renderHeatmap(currentEV) {
    var container = document.getElementById('heatmap-grid');
    if (!container || !recoveryData) return;

    var evSteps = [500, 1000, 1500, 2000, 2176, 2500, 3000, 3500, 4000, 4500, 5000];
    var recoveries = recoveryData.recoveries;
    var evBreakdown = recoveryData.evBreakdown;

    // Find closest EV column to highlight
    var closestIdx = 0;
    var closestDist = Math.abs(evSteps[0] - currentEV);
    for (var c = 1; c < evSteps.length; c++) {
      var dist = Math.abs(evSteps[c] - currentEV);
      if (dist < closestDist) { closestDist = dist; closestIdx = c; }
    }

    var html = '<table class="data-table" style="min-width:700px; font-size:10px;">';

    // Header row
    html += '<thead><tr><th style="min-width:160px; font-size:10px;">Tranche</th>';
    for (var h = 0; h < evSteps.length; h++) {
      var isHighlight = (h === closestIdx);
      var thStyle = 'font-size:9px; text-align:center;';
      if (isHighlight) thStyle += ' background:rgba(59,130,246,0.15); color:var(--blue); font-weight:700;';
      html += '<th class="right" style="' + thStyle + '">$' + (evSteps[h] >= 1000 ? (evSteps[h] / 1000).toFixed(1) + 'B' : evSteps[h] + 'M') + '</th>';
    }
    html += '</tr></thead><tbody>';

    // One row per tranche
    for (var t = 0; t < recoveries.length; t++) {
      html += '<tr><td style="font-weight:600; font-size:10px; white-space:nowrap;">' + recoveries[t].name + '</td>';
      for (var e = 0; e < evSteps.length; e++) {
        var waterfall = computeWaterfall(evSteps[e], recoveries, evBreakdown);
        var pct = waterfall[t].totalPct;
        var isHighlight2 = (e === closestIdx);
        var cellStyle = 'text-align:center; font-weight:700; font-size:10px;'
          + ' color:' + recoveryColor(pct) + ';'
          + ' background:' + recoveryBgColor(pct) + ';';
        if (isHighlight2) cellStyle += ' outline:2px solid var(--blue); outline-offset:-2px;';
        var label = pct >= 1.0 ? '100%' : pct > 0 ? Math.round(pct * 100) + '%' : '\u2014';
        html += '<td style="' + cellStyle + '">' + label + '</td>';
      }
      html += '</tr>';
    }

    html += '</tbody></table>';
    html += '<div style="font-size:9px; color:var(--text-dim); margin-top:6px;">Highlighted column is closest to current EV slider value. Green = &ge;80%, yellow = 40-80%, red = &lt;40%.</div>';
    container.innerHTML = html;
  }

  // ── Render Recovery Chart (horizontal stacked bar) ──

  function renderRecoveryChart(results) {
    var canvas = document.getElementById('recovery-chart');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');

    var labels = [];
    var odeonData = [];
    var amcData = [];
    var muvicoData = [];
    var faceData = [];

    for (var i = 0; i < results.length; i++) {
      labels.push(results[i].name);
      odeonData.push(parseFloat(results[i].odeonAmt.toFixed(1)));
      amcData.push(parseFloat(results[i].amcAmt.toFixed(1)));
      muvicoData.push(parseFloat(results[i].muvicoAmt.toFixed(1)));
      faceData.push(parseFloat((results[i].face - results[i].totalAmt).toFixed(1)));
    }

    var chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          { label: 'Odeon', data: odeonData, backgroundColor: '#3b82f6', borderWidth: 0, borderRadius: 2 },
          { label: 'AMC', data: amcData, backgroundColor: '#6b7280', borderWidth: 0, borderRadius: 2 },
          { label: 'Muvico', data: muvicoData, backgroundColor: '#ea580c', borderWidth: 0, borderRadius: 2 },
          { label: 'Unrecovered', data: faceData, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 0, borderRadius: 2 }
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: 'top', labels: { padding: 16, usePointStyle: true, pointStyle: 'rect', font: { size: 10 } } },
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
            ticks: { font: { size: 9 } }
          }
        }
      }
    });

    U.ChartRegistry.set('pf-recovery', chart);
  }

  // ── Render Entity Cap Tables ──

  function renderEntityCapTables(entityCapTables) {
    var container = document.getElementById('entity-cap-tables');
    if (!container || !entityCapTables) return;

    var entityLabels = { muvico: 'Muvico', odeon: 'Odeon', amc: 'AMC (Consolidated)' };
    var html = '';

    for (var e = 0; e < entityCapTables.length; e++) {
      var ent = entityCapTables[e];
      var label = entityLabels[ent.entity] || ent.entity;
      html += '<div style="margin-bottom:20px;">';
      html += '<h4 style="font-size:11px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:var(--text-muted); margin-bottom:8px; padding-bottom:6px; border-bottom:1px solid var(--border);">' + label + '</h4>';
      html += '<div style="overflow-x:auto;"><table class="data-table" style="font-size:10px;">';
      html += '<thead><tr>'
        + '<th>Tranche</th><th>Lien</th><th class="right">Face ($M)</th>'
        + '<th class="right">Price</th><th class="right">Market ($M)</th>'
        + '<th>Coupon</th><th class="right">Cash Int ($M)</th>'
        + '<th>Maturity</th><th class="right">YTM</th>'
        + '<th class="right">Int. Cov.</th><th class="right">D/E Face</th><th class="right">D/E Mkt</th>'
        + '</tr></thead><tbody>';

      for (var t = 0; t < ent.tranches.length; t++) {
        var tr = ent.tranches[t];
        var isSummary = tr.name.indexOf('Total') === 0 || tr.name.indexOf('Net') === 0;
        var rowStyle = isSummary ? 'font-weight:700; background:var(--surface-2);' : '';
        html += '<tr style="' + rowStyle + '">'
          + '<td>' + tr.name + '</td>'
          + '<td style="color:var(--text-muted);">' + (tr.lien || '-') + '</td>'
          + '<td class="right">' + (tr.face != null ? fmt(tr.face) : '-') + '</td>'
          + '<td class="right">' + (tr.price != null ? tr.price : '-') + '</td>'
          + '<td class="right">' + (tr.market != null ? fmt(tr.market) : '-') + '</td>'
          + '<td>' + (tr.coupon || '-') + '</td>'
          + '<td class="right">' + (tr.cashInterest != null ? fmt(tr.cashInterest) : '-') + '</td>'
          + '<td>' + (tr.maturity || '-') + '</td>'
          + '<td class="right">' + (tr.ytm != null ? fmtPct(tr.ytm * 100) : '-') + '</td>'
          + '<td class="right">' + (tr.intCoverage != null ? tr.intCoverage.toFixed(1) + 'x' : '-') + '</td>'
          + '<td class="right">' + (tr.debtEbitdaFace != null ? tr.debtEbitdaFace.toFixed(1) + 'x' : '-') + '</td>'
          + '<td class="right">' + (tr.debtEbitdaMkt != null ? tr.debtEbitdaMkt.toFixed(1) + 'x' : '-') + '</td>'
          + '</tr>';
      }

      html += '</tbody></table></div></div>';
    }

    container.innerHTML = html;
  }

  // ── Update Key Metrics ──

  function updateKeyMetrics(ev, results) {
    var metricsEl = document.getElementById('key-metrics');
    if (!metricsEl) return;

    var totalFace = 0, totalRecovery = 0;
    var senior1LRecovery = 0, senior1LFace = 0;
    var juniorRecovery = 0, juniorFace = 0;

    for (var i = 0; i < results.length; i++) {
      var r = results[i];
      totalFace += r.face;
      totalRecovery += r.totalAmt;

      // Senior = first 4 tranches (Term Loans, First/Second/Third Out)
      // Actually use index: 0 is Total Term Loans which is the senior 1L
      if (i === 0) {
        senior1LFace += r.face;
        senior1LRecovery += r.totalAmt;
      } else if (i >= 4) {
        // Junior: 8% PIK, 15% PIK, 6/8% PIK, AMC 7.5%, Odeon, AMC 6.125%
        juniorFace += r.face;
        juniorRecovery += r.totalAmt;
      }
    }

    var weightedAvg = totalFace > 0 ? totalRecovery / totalFace : 0;
    var seniorPct = senior1LFace > 0 ? senior1LRecovery / senior1LFace : 0;
    var juniorPct = juniorFace > 0 ? juniorRecovery / juniorFace : 0;

    metricsEl.innerHTML = ''
      + '<div class="model-metric"><div class="label">Total Enterprise Value</div><div class="value" style="color:#3b82f6;">' + fmt(ev) + '</div></div>'
      + '<div class="model-metric"><div class="label">Total Recovery</div><div class="value" style="color:' + recoveryColor(weightedAvg) + ';">' + fmt(totalRecovery) + '</div></div>'
      + '<div class="model-metric"><div class="label">Weighted Avg Recovery</div><div class="value" style="color:' + recoveryColor(weightedAvg) + ';">' + fmtPct(weightedAvg * 100) + '</div></div>'
      + '<div class="model-metric"><div class="label">Senior (1L) Recovery</div><div class="value" style="color:' + recoveryColor(seniorPct) + ';">' + fmtPct(seniorPct * 100) + '</div></div>'
      + '<div class="model-metric"><div class="label">Junior Recovery</div><div class="value" style="color:' + recoveryColor(juniorPct) + ';">' + fmtPct(juniorPct * 100) + '</div></div>';
  }

  // ── Update EV Breakdown Display ──

  function updateEVBreakdown(ev) {
    var el = document.getElementById('ev-breakdown');
    if (!el || !recoveryData) return;

    var evB = recoveryData.evBreakdown;
    var origTotal = evB.amc + evB.odeon + evB.muvico;
    if (origTotal <= 0) return;

    var odeonEV = ev * (evB.odeon / origTotal);
    var amcEV = ev * (evB.amc / origTotal);
    var muvicoEV = ev * (evB.muvico / origTotal);

    el.innerHTML = ''
      + '<div style="display:flex; justify-content:space-between; margin-bottom:2px;"><span style="color:var(--text-muted);">Odeon</span><span style="font-weight:700; color:#3b82f6;">' + fmt(odeonEV) + '</span></div>'
      + '<div style="display:flex; justify-content:space-between; margin-bottom:2px;"><span style="color:var(--text-muted);">AMC</span><span style="font-weight:700; color:#6b7280;">' + fmt(amcEV) + '</span></div>'
      + '<div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Muvico</span><span style="font-weight:700; color:#ea580c;">' + fmt(muvicoEV) + '</span></div>';
  }

  // ── Master Update ──

  function updateAll() {
    if (!recoveryData) return;

    var slider = document.getElementById('ev-slider');
    var ev = parseFloat(slider.value) || 2176;
    document.getElementById('ev-slider-val').textContent = fmt(ev);

    var results = computeWaterfall(ev, recoveryData.recoveries, recoveryData.evBreakdown);

    updateKeyMetrics(ev, results);
    updateEVBreakdown(ev);
    renderRecoveryTable(results);
    renderHeatmap(ev);
    renderRecoveryChart(results);
  }

  // ── View Toggle ──

  function setView(view) {
    currentView = view;
    var tableEl = document.getElementById('recovery-table-container');
    var heatmapEl = document.getElementById('heatmap-container');
    var btnTable = document.getElementById('btn-view-table');
    var btnHeatmap = document.getElementById('btn-view-heatmap');

    if (view === 'table') {
      tableEl.style.display = '';
      heatmapEl.style.display = 'none';
      btnTable.classList.add('active');
      btnHeatmap.classList.remove('active');
    } else {
      tableEl.style.display = 'none';
      heatmapEl.style.display = '';
      btnTable.classList.remove('active');
      btnHeatmap.classList.add('active');
    }
  }

  // ── Cap table toggle ──

  function setupCapToggle() {
    var toggle = document.getElementById('cap-toggle');
    var tables = document.getElementById('entity-cap-tables');
    var icon = document.getElementById('cap-toggle-icon');
    if (!toggle || !tables) return;

    toggle.addEventListener('click', function() {
      var isHidden = tables.style.display === 'none';
      tables.style.display = isHidden ? '' : 'none';
      icon.textContent = isHidden ? '\u2212' : '+';
    });
  }

  // ── Initialize ──

  function init() {
    Promise.all([
      U.DataLoader.fetch('pf-recoveries.json'),
      U.DataLoader.fetch('cap-table.json')
    ]).then(function(dataArr) {
      recoveryData = dataArr[0];
      capTableData = dataArr[1];
      originalTotalEV = recoveryData.evBreakdown.amc + recoveryData.evBreakdown.odeon + recoveryData.evBreakdown.muvico;

      // Derive face values
      trancheFaces = deriveFaceValues(recoveryData);

      // Set slider default to original EV
      var slider = document.getElementById('ev-slider');
      slider.value = originalTotalEV;

      // Event listeners
      slider.addEventListener('input', updateAll);

      // View toggle
      document.getElementById('btn-view-table').addEventListener('click', function() { setView('table'); });
      document.getElementById('btn-view-heatmap').addEventListener('click', function() { setView('heatmap'); });

      // Preset buttons
      var presetBtns = document.querySelectorAll('.preset-btn[data-ev]');
      for (var i = 0; i < presetBtns.length; i++) {
        presetBtns[i].addEventListener('click', function() {
          var ev = parseFloat(this.getAttribute('data-ev'));
          if (!isNaN(ev)) {
            slider.value = ev;
            updateAll();
          }
        });
      }

      // Cap table toggle
      setupCapToggle();

      // Render entity cap tables (static, one-time)
      renderEntityCapTables(recoveryData.entityCapTables);

      // Initial render
      updateAll();
    });
  }

  init();

})();
