/* ===============================================
   AMC Debt Navigator - Executive Dashboard
   KPIs, Cap Structure, Recovery Heatmap, Sparklines
   Everything is clickable and interactive
   =============================================== */

(function() {
  'use strict';

  var U = window.AMC_UTILS;
  var fmt = U.fmt;
  var fmtPct = U.fmtPct;
  var base = document.body.getAttribute('data-base') || '.';

  // ── Recovery color helpers — terminal palette ──

  function recoveryColor(pct) {
    if (pct >= 0.80) return 'var(--terminal-green)';
    if (pct >= 0.40) return 'var(--amber)';
    if (pct > 0) return 'var(--terminal-red)';
    return 'var(--text-dim)';
  }

  function recoveryBgColor(pct) {
    if (pct >= 0.80) return 'rgba(51,255,102,0.1)';
    if (pct >= 0.40) return 'rgba(255,153,0,0.1)';
    if (pct > 0) return 'rgba(255,51,51,0.08)';
    return 'rgba(255,51,51,0.03)';
  }

  // ── Face value derivation ──

  function deriveFaceValues(data) {
    var faces = [];
    var entityCaps = data.entityCapTables || [];
    var faceLookup = {};
    for (var e = 0; e < entityCaps.length; e++) {
      var ent = entityCaps[e];
      for (var t = 0; t < ent.tranches.length; t++) {
        var tr = ent.tranches[t];
        if (tr.face && !faceLookup[tr.name]) faceLookup[tr.name] = tr.face;
      }
    }
    var recoveries = data.recoveries;
    for (var i = 0; i < recoveries.length; i++) {
      var r = recoveries[i];
      var name = r.name;
      if (name === 'Total Term Loans') {
        faces.push((faceLookup['First Out (1L)'] || 576) + (faceLookup['Second Out (1L)'] || 846) + (faceLookup['Third Out (1L)'] || 270));
      } else if (faceLookup[name]) {
        faces.push(faceLookup[name]);
      } else if (name === 'AMC 7.5% Notes due 2029') {
        faces.push(360);
      } else if (name === 'Odeon Finco Plc Notes') {
        faces.push(400);
      } else if (name === 'AMC 6.125% Notes due 2027') {
        faces.push(126);
      } else {
        faces.push(r.totalPct > 0 ? Math.round(r.totalAmt / r.totalPct) : (r.totalAmt || 0));
      }
    }
    return faces;
  }

  // ── Waterfall computation ──

  function computeWaterfall(totalEV, recoveries, evBreakdown, trancheFaces) {
    var remaining = totalEV;
    var results = [];
    for (var i = 0; i < recoveries.length; i++) {
      var face = trancheFaces[i];
      var allocated = Math.min(face, Math.max(0, remaining));
      remaining -= allocated;
      results.push({ name: recoveries[i].name, face: face, totalAmt: allocated, totalPct: face > 0 ? allocated / face : 0 });
    }
    return results;
  }

  var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  function formatMaturity(dateStr) {
    if (!dateStr) return '--';
    var parts = dateStr.split('-');
    if (parts.length < 2) return dateStr;
    return MONTHS[parseInt(parts[1], 10) - 1] + ' ' + parts[0];
  }

  // ── KPI click links ──
  var KPI_LINKS = {
    'kpi-ev-exit': 'models/dcf.html',
    'kpi-ev-perp': 'models/dcf.html',
    'kpi-equity': 'models/dcf.html',
    'kpi-share': 'models/dcf.html',
    'kpi-debt': 'models/debt-service.html',
    'kpi-wacc': 'models/dcf.html',
    'kpi-cost-debt': 'models/debt-service.html',
    'kpi-mktcap': 'models/comps.html'
  };

  // ── Set KPI with click behavior ──

  function setKPI(id, valueText, colorClass, subText) {
    var el = document.getElementById(id);
    if (!el) return;
    var valEl = el.querySelector('.value');
    if (valEl) {
      valEl.textContent = valueText || '--';
      valEl.className = 'value';
      if (colorClass) valEl.classList.add(colorClass);
    }
    if (subText) {
      var subEl = el.querySelector('.sub');
      if (subEl) subEl.textContent = subText;
    }
    // Make clickable
    if (KPI_LINKS[id]) {
      el.style.cursor = 'pointer';
      el.title = 'Click to view model';
      el.onclick = function() { window.location.href = base + '/' + KPI_LINKS[id]; };
    }
  }

  // ── Render KPIs ──

  function renderKPIs(ufcf, val, wacc, cap) {
    var evExit = ufcf && ufcf.terminalValue ? ufcf.terminalValue.enterpriseValue : null;
    setKPI('kpi-ev-exit', evExit != null ? '$' + U.fmtInt(evExit) + 'M' : '--');

    var evPerp = ufcf && ufcf.perpetuityGrowth ? ufcf.perpetuityGrowth.enterpriseValue : null;
    setKPI('kpi-ev-perp', evPerp != null ? '$' + U.fmtInt(Math.round(evPerp)) + 'M' : '--');

    var equity = val && val.amc && val.amc.scenario1 ? val.amc.scenario1['Implied Equity Value'] : null;
    setKPI('kpi-equity', equity != null ? (equity < 0 ? '($' + U.fmtInt(Math.abs(equity)) + 'M)' : '$' + U.fmtInt(equity) + 'M') : '--',
      equity != null && equity < 0 ? 'distress' : null);

    var sharePrice = val && val.amc && val.amc.scenario1 ? val.amc.scenario1['Share Price'] : null;
    setKPI('kpi-share', sharePrice != null ? (sharePrice < 0 ? '($' + Math.abs(sharePrice).toFixed(2) + ')' : '$' + sharePrice.toFixed(2)) : '--',
      sharePrice != null && sharePrice < 0 ? 'distress' : null);

    var totalDebt = wacc && wacc.inputs ? wacc.inputs.totalPrincipal : null;
    setKPI('kpi-debt', totalDebt != null ? '$' + U.fmtInt(Math.round(totalDebt)) + 'M' : '--');

    var waccVal = wacc && wacc.inputs ? wacc.inputs.wacc : null;
    setKPI('kpi-wacc', waccVal != null ? (waccVal * 100).toFixed(1) + '%' : '--', 'distress');

    var costDebt = wacc && wacc.inputs ? wacc.inputs.pretaxCostOfDebt : null;
    setKPI('kpi-cost-debt', costDebt != null ? (costDebt * 100).toFixed(1) + '%' : '--', 'distress');

    var mktcap = wacc && wacc.inputs ? wacc.inputs.marketCap : null;
    setKPI('kpi-mktcap', mktcap != null ? '$' + U.fmtInt(Math.round(mktcap)) + 'M' : '--');

    if (cap && cap.tranches) {
      var nearestDate = null, nearestName = '';
      for (var i = 0; i < cap.tranches.length; i++) {
        var tr = cap.tranches[i];
        if (tr.maturity && (!nearestDate || tr.maturity < nearestDate)) {
          nearestDate = tr.maturity;
          nearestName = tr.name;
        }
      }
      if (nearestDate) setKPI('kpi-debt', null, null, 'Nearest maturity: ' + formatMaturity(nearestDate) + ' (' + nearestName + ')');
    }
  }

  // ── Doc link map for tranches ──
  var TRANCHE_LINKS = {
    '$2bn 2029 TL': 'docs/doc4-credit-agreement.html',
    'Muvico 8% PIK Notes': 'docs/doc5-exchangeable-2030.html',
    'Muvico 15% PIK Notes': 'docs/doc2-muvico-secured-2029.html',
    'Muvico 6/8% PIK Notes': 'docs/doc7-pik-toggle.html',
    'Odeon Finco Plc Notes': 'docs/doc6-odeon-notes.html',
    'AMC 7.5% Notes due 2029': 'docs/doc3-amc-7500-notes.html',
    'AMC 6.125% Notes due 2027': 'docs/doc1-covenant-strip.html'
  };

  // ── Render Capital Structure Table — clickable rows ──

  function renderCapStructure(cap) {
    var container = document.getElementById('cap-structure-table');
    if (!container || !cap || !cap.tranches) return;

    var seen = {}, tranches = [];
    for (var i = 0; i < cap.tranches.length; i++) {
      var t = cap.tranches[i];
      if (t.entity === 'amc') continue;
      var key = t.name + '|' + t.entity;
      if (!seen[key]) { seen[key] = true; tranches.push(t); }
    }

    var maxFace = 0, totalFace = 0;
    for (var j = 0; j < tranches.length; j++) {
      if (tranches[j].face > maxFace) maxFace = tranches[j].face;
      totalFace += tranches[j].face;
    }

    var lienClass = { '1L': 'tag-1l', '1.25L': 'tag-125l', '1.5L': 'tag-15l', '2L': 'tag-2l', 'Unsec': 'tag-unsec' };

    var html = '<table class="data-table">';
    html += '<thead><tr><th>Tranche</th><th>Entity</th><th>Lien</th><th class="right">Face ($M)</th><th>Coupon</th><th>Maturity</th><th class="right">YTM</th></tr></thead><tbody>';

    for (var k = 0; k < tranches.length; k++) {
      var tr = tranches[k];
      var barWidth = maxFace > 0 ? Math.round((tr.face / maxFace) * 100) : 0;
      var tagClass = lienClass[tr.lien] || 'tag-unsec';
      var entityLabel = tr.entity === 'muvico' ? 'Muvico' : tr.entity === 'odeon' ? 'Odeon' : 'AMC';
      var link = TRANCHE_LINKS[tr.name];
      var clickAttr = link ? ' style="cursor:pointer;" onclick="window.location.href=\'' + base + '/' + link + '\'" title="View document"' : '';

      html += '<tr' + clickAttr + '>'
        + '<td style="font-weight:600; font-size:10px;">' + tr.name
        + '<br><span class="cap-bar" style="width:' + barWidth + '%;"></span></td>'
        + '<td style="font-size:9px; color:var(--text-muted);">' + entityLabel + '</td>'
        + '<td><span class="tag ' + tagClass + '">' + tr.lien + '</span></td>'
        + '<td class="right" style="font-weight:700; color:var(--terminal-white);">' + fmt(tr.face) + '</td>'
        + '<td style="font-size:9px;">' + (tr.coupon || '--') + '</td>'
        + '<td style="font-size:9px;">' + formatMaturity(tr.maturity) + '</td>'
        + '<td class="right" style="font-size:9px;">' + (tr.ytm != null ? fmtPct(tr.ytm * 100) : '--') + '</td>'
        + '</tr>';
    }

    html += '<tr class="cap-structure-total"><td colspan="3">TOTAL</td><td class="right">' + fmt(totalFace) + '</td><td colspan="3"></td></tr>';
    html += '</tbody></table>';
    container.innerHTML = html;
  }

  // ── Render Recovery Heatmap — clickable rows, hover highlights ──

  function renderHeatmap(pfRec) {
    var container = document.getElementById('recovery-heatmap');
    if (!container || !pfRec || !pfRec.recoveries) return;

    var trancheFaces = deriveFaceValues(pfRec);
    var recoveries = pfRec.recoveries;
    var evBreakdown = pfRec.evBreakdown;
    var evSteps = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000];
    var displayIndices = [0, 4, 5, 6, 7, 8, 9];

    var html = '<table class="data-table" style="min-width:600px;">';
    html += '<thead><tr><th style="min-width:130px;">Tranche</th>';
    for (var h = 0; h < evSteps.length; h++) {
      var evLabel = evSteps[h] >= 1000 ? '$' + (evSteps[h] / 1000).toFixed(1) + 'B' : '$' + evSteps[h] + 'M';
      html += '<th style="text-align:center; min-width:40px; font-size:8px;">' + evLabel + '</th>';
    }
    html += '</tr></thead><tbody>';

    for (var t = 0; t < displayIndices.length; t++) {
      var idx = displayIndices[t];
      var trancheName = recoveries[idx].name;
      html += '<tr style="cursor:pointer;" onclick="window.location.href=\'' + base + '/models/pf-recovery.html\'" title="Open recovery model">';
      html += '<td style="font-weight:600; font-size:9px; white-space:nowrap;">' + trancheName + '</td>';

      for (var e = 0; e < evSteps.length; e++) {
        var waterfall = computeWaterfall(evSteps[e], recoveries, evBreakdown, trancheFaces);
        var pct = waterfall[idx].totalPct;
        var cellStyle = 'text-align:center; font-weight:700; font-size:9px; padding:2px 1px;'
          + ' color:' + recoveryColor(pct) + '; background:' + recoveryBgColor(pct) + ';';
        var label = pct >= 1.0 ? '100' : pct > 0 ? Math.round(pct * 100).toString() : '\u2014';
        html += '<td style="' + cellStyle + '">' + label + '</td>';
      }
      html += '</tr>';
    }

    html += '</tbody></table>';
    html += '<div style="font-size:8px; color:var(--text-dim); margin-top:4px;">'
      + 'Click any row to open the recovery model. Green \u226580% | Amber 40-80% | Red <40%'
      + '</div>';
    container.innerHTML = html;
  }

  // ── Render Sparklines — clickable to financials ──

  function renderSparklines(is_, ufcf) {
    // Make all spark panels clickable
    var sparkPanels = document.querySelectorAll('.spark-panel');
    for (var p = 0; p < sparkPanels.length; p++) {
      sparkPanels[p].style.cursor = 'pointer';
      sparkPanels[p].title = 'Click to view financial statements';
      sparkPanels[p].onclick = function() { window.location.href = base + '/models/financials.html'; };
    }

    // Revenue
    if (is_ && is_.sales && is_.periods) {
      var revValues = is_.sales;
      var latestRev = revValues[revValues.length - 1];
      var revEl = document.getElementById('spark-val-revenue');
      if (revEl) revEl.textContent = '$' + U.fmtInt(Math.round(latestRev)) + 'M';

      var revCanvas = document.getElementById('spark-revenue');
      if (revCanvas) {
        U.ChartRegistry.set('spark-revenue', new Chart(revCanvas.getContext('2d'), {
          type: 'line',
          data: { labels: is_.periods, datasets: [{ data: revValues, borderColor: 'var(--terminal-blue, #3399ff)', borderWidth: 1.5, fill: { target: 'origin', above: 'rgba(51,153,255,0.06)' }, pointRadius: 0, tension: 0.3 }] },
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: false } }, scales: { x: { display: false }, y: { display: false } } }
        }));
      }
    }

    // EBITDA
    if (is_ && is_.ebit && is_.da && is_.periods) {
      var ebitdaValues = [];
      for (var i = 0; i < is_.ebit.length; i++) ebitdaValues.push(is_.ebit[i] + is_.da[i]);
      var latestEbitda = ebitdaValues[ebitdaValues.length - 1];
      var ebitdaEl = document.getElementById('spark-val-ebitda');
      if (ebitdaEl) ebitdaEl.textContent = '$' + U.fmtInt(Math.round(latestEbitda)) + 'M';

      var ebitdaCanvas = document.getElementById('spark-ebitda');
      if (ebitdaCanvas) {
        U.ChartRegistry.set('spark-ebitda', new Chart(ebitdaCanvas.getContext('2d'), {
          type: 'line',
          data: { labels: is_.periods, datasets: [{ data: ebitdaValues, borderColor: 'var(--terminal-green, #33ff66)', borderWidth: 1.5, fill: { target: 'origin', above: 'rgba(51,255,102,0.06)' }, pointRadius: 0, tension: 0.3 }] },
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: false } }, scales: { x: { display: false }, y: { display: false } } }
        }));
      }
    }

    // UFCF
    if (ufcf && ufcf.ufcf && ufcf.periods) {
      var ufcfValues = ufcf.ufcf;
      var latestUfcf = ufcfValues[ufcfValues.length - 1];
      var ufcfEl = document.getElementById('spark-val-ufcf');
      if (ufcfEl) ufcfEl.textContent = '$' + U.fmtInt(Math.round(latestUfcf)) + 'M';

      var ufcfCanvas = document.getElementById('spark-ufcf');
      if (ufcfCanvas) {
        U.ChartRegistry.set('spark-ufcf', new Chart(ufcfCanvas.getContext('2d'), {
          type: 'line',
          data: { labels: ufcf.periods, datasets: [{ data: ufcfValues, borderColor: 'var(--terminal-cyan, #33cccc)', borderWidth: 1.5, fill: { target: 'origin', above: 'rgba(51,204,204,0.06)' }, pointRadius: 0, tension: 0.3 }] },
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: false } }, scales: { x: { display: false }, y: { display: false } } }
        }));
      }
    }
  }

  // ── Data Load ──

  Promise.all([
    U.DataLoader.fetch('ufcf.json'),
    U.DataLoader.fetch('valuation.json'),
    U.DataLoader.fetch('wacc.json'),
    U.DataLoader.fetch('cap-table.json'),
    U.DataLoader.fetch('pf-recoveries.json'),
    U.DataLoader.fetch('is.json')
  ]).then(function(results) {
    renderKPIs(results[0], results[1], results[2], results[3]);
    renderCapStructure(results[3]);
    renderHeatmap(results[4]);
    renderSparklines(results[5], results[0]);
  });

})();
