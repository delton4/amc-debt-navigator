/* ===============================================
   AMC Debt Navigator - Executive Dashboard
   KPIs, Cap Structure, Recovery Heatmap, Sparklines
   Loads all data via AMC_UTILS.DataLoader
   =============================================== */

(function() {
  'use strict';

  var U = window.AMC_UTILS;
  var fmt = U.fmt;
  var fmtPct = U.fmtPct;

  // ── Recovery color helpers (duplicated from pf-recovery-model.js) ──

  function recoveryColor(pct) {
    if (pct >= 0.80) return '#22c55e';
    if (pct >= 0.40) return '#eab308';
    if (pct > 0) return '#ef4444';
    return '#6b7280';
  }

  function recoveryBgColor(pct) {
    if (pct >= 0.80) return 'rgba(34,197,94,0.15)';
    if (pct >= 0.40) return 'rgba(234,179,8,0.15)';
    if (pct > 0) return 'rgba(239,68,68,0.12)';
    return 'rgba(239,68,68,0.06)';
  }

  // ── Face value derivation (duplicated from pf-recovery-model.js) ──

  function deriveFaceValues(data) {
    var faces = [];
    var entityCaps = data.entityCapTables || [];
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

    var recoveries = data.recoveries;
    for (var i = 0; i < recoveries.length; i++) {
      var r = recoveries[i];
      var name = r.name;

      if (name === 'Total Term Loans') {
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
        if (r.totalPct > 0) {
          faces.push(Math.round(r.totalAmt / r.totalPct));
        } else {
          faces.push(r.totalAmt || 0);
        }
      }
    }
    return faces;
  }

  // ── Waterfall computation (duplicated from pf-recovery-model.js) ──

  function computeWaterfall(totalEV, recoveries, evBreakdown, trancheFaces) {
    var origTotal = evBreakdown.amc + evBreakdown.odeon + evBreakdown.muvico;
    if (origTotal <= 0) origTotal = 1;

    var remaining = totalEV;
    var results = [];

    for (var i = 0; i < recoveries.length; i++) {
      var r = recoveries[i];
      var face = trancheFaces[i];
      var allocated = Math.min(face, Math.max(0, remaining));
      remaining -= allocated;
      var pct = face > 0 ? allocated / face : 0;

      results.push({
        name: r.name,
        face: face,
        totalAmt: allocated,
        totalPct: pct
      });
    }
    return results;
  }

  // ── Helper: format month name from date string ──

  var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  function formatMaturity(dateStr) {
    if (!dateStr) return '--';
    var parts = dateStr.split('-');
    if (parts.length < 2) return dateStr;
    var yr = parts[0];
    var mo = parseInt(parts[1], 10);
    return MONTHS[mo - 1] + ' ' + yr;
  }

  // ── Helper: set KPI value with color class ──

  function setKPI(id, valueText, colorClass, subText) {
    var el = document.getElementById(id);
    if (!el) return;
    var valEl = el.querySelector('.value');
    if (valEl) {
      valEl.textContent = valueText;
      valEl.className = 'value';
      if (colorClass) valEl.classList.add(colorClass);
    }
    if (subText) {
      var subEl = el.querySelector('.sub');
      if (subEl) subEl.textContent = subText;
    }
  }

  // ── Render KPIs ──

  function renderKPIs(ufcf, val, wacc, cap) {
    // EV from exit multiple method
    var evExit = ufcf && ufcf.terminalValue ? ufcf.terminalValue.enterpriseValue : null;
    setKPI('kpi-ev-exit', evExit != null ? '$' + U.fmtInt(evExit) + 'M' : '--');

    // EV from perpetuity growth method
    var evPerp = ufcf && ufcf.perpetuityGrowth ? ufcf.perpetuityGrowth.enterpriseValue : null;
    setKPI('kpi-ev-perp', evPerp != null ? '$' + U.fmtInt(Math.round(evPerp)) + 'M' : '--');

    // Implied equity value
    var equity = val && val.amc && val.amc.scenario1 ? val.amc.scenario1['Implied Equity Value'] : null;
    setKPI('kpi-equity', equity != null ? (equity < 0 ? '($' + U.fmtInt(Math.abs(equity)) + 'M)' : '$' + U.fmtInt(equity) + 'M') : '--',
      equity != null && equity < 0 ? 'distress' : null);

    // Implied share price
    var sharePrice = val && val.amc && val.amc.scenario1 ? val.amc.scenario1['Share Price'] : null;
    setKPI('kpi-share', sharePrice != null ? (sharePrice < 0 ? '($' + Math.abs(sharePrice).toFixed(2) + ')' : '$' + sharePrice.toFixed(2)) : '--',
      sharePrice != null && sharePrice < 0 ? 'distress' : null);

    // Total debt face
    var totalDebt = wacc && wacc.inputs ? wacc.inputs.totalPrincipal : null;
    setKPI('kpi-debt', totalDebt != null ? '$' + U.fmtInt(Math.round(totalDebt)) + 'M' : '--');

    // WACC
    var waccVal = wacc && wacc.inputs ? wacc.inputs.wacc : null;
    setKPI('kpi-wacc', waccVal != null ? (waccVal * 100).toFixed(1) + '%' : '--', 'distress');

    // Weighted avg cost of debt
    var costDebt = wacc && wacc.inputs ? wacc.inputs.pretaxCostOfDebt : null;
    setKPI('kpi-cost-debt', costDebt != null ? (costDebt * 100).toFixed(1) + '%' : '--', 'distress');

    // Market cap
    var mktcap = wacc && wacc.inputs ? wacc.inputs.marketCap : null;
    setKPI('kpi-mktcap', mktcap != null ? '$' + U.fmtInt(Math.round(mktcap)) + 'M' : '--');

    // Find nearest maturity from cap table
    if (cap && cap.tranches) {
      var nearestDate = null;
      var nearestName = '';
      for (var i = 0; i < cap.tranches.length; i++) {
        var tr = cap.tranches[i];
        if (tr.maturity) {
          if (!nearestDate || tr.maturity < nearestDate) {
            nearestDate = tr.maturity;
            nearestName = tr.name;
          }
        }
      }
      if (nearestDate) {
        setKPI('kpi-debt', null, null, 'Nearest maturity: ' + formatMaturity(nearestDate) + ' (' + nearestName + ')');
      }
    }
  }

  // ── Render Capital Structure Table ──

  function renderCapStructure(cap) {
    var container = document.getElementById('cap-structure-table');
    if (!container || !cap || !cap.tranches) return;

    // Use unique tranches from cap-table.json
    // The cap-table has duplicates (entity-level views) -- use first 5 unique by entity grouping
    // Actually, the cap-table.json has muvico tranches first, then odeon, then amc consolidated
    // For the dashboard, show unique instruments from the muvico + odeon entities (7 unique tranches)
    var seen = {};
    var tranches = [];
    for (var i = 0; i < cap.tranches.length; i++) {
      var t = cap.tranches[i];
      // Skip AMC consolidated duplicates (entity=amc repeats the same instruments)
      if (t.entity === 'amc') continue;
      var key = t.name + '|' + t.entity;
      if (!seen[key]) {
        seen[key] = true;
        tranches.push(t);
      }
    }

    // Find max face for bar scaling
    var maxFace = 0;
    var totalFace = 0;
    for (var j = 0; j < tranches.length; j++) {
      if (tranches[j].face > maxFace) maxFace = tranches[j].face;
      totalFace += tranches[j].face;
    }

    // Lien tag class map
    var lienClass = {
      '1L': 'tag-1l',
      '1.25L': 'tag-125l',
      '1.5L': 'tag-15l',
      '2L': 'tag-2l',
      'Unsec': 'tag-unsec'
    };

    var html = '<table class="data-table">';
    html += '<thead><tr>'
      + '<th>Tranche</th>'
      + '<th>Entity</th>'
      + '<th>Lien</th>'
      + '<th class="right">Face ($M)</th>'
      + '<th>Coupon</th>'
      + '<th>Maturity</th>'
      + '<th class="right">YTM</th>'
      + '</tr></thead><tbody>';

    for (var k = 0; k < tranches.length; k++) {
      var tr = tranches[k];
      var barWidth = maxFace > 0 ? Math.round((tr.face / maxFace) * 100) : 0;
      var tagClass = lienClass[tr.lien] || 'tag-unsec';
      var entityLabel = tr.entity === 'muvico' ? 'Muvico' : tr.entity === 'odeon' ? 'Odeon' : 'AMC';

      html += '<tr>'
        + '<td style="font-weight:600; font-size:11px;">' + tr.name
        + '<br><span class="cap-bar" style="width:' + barWidth + '%;"></span></td>'
        + '<td style="font-size:10px; color:var(--text-muted);">' + entityLabel + '</td>'
        + '<td><span class="tag ' + tagClass + '">' + tr.lien + '</span></td>'
        + '<td class="right" style="font-weight:600;">' + fmt(tr.face) + '</td>'
        + '<td style="font-size:10px;">' + (tr.coupon || '--') + '</td>'
        + '<td style="font-size:10px;">' + formatMaturity(tr.maturity) + '</td>'
        + '<td class="right" style="font-size:10px;">' + (tr.ytm != null ? fmtPct(tr.ytm * 100) : '--') + '</td>'
        + '</tr>';
    }

    // Total row
    html += '<tr class="cap-structure-total">'
      + '<td colspan="3" style="font-weight:700;">TOTAL</td>'
      + '<td class="right" style="font-weight:700;">' + fmt(totalFace) + '</td>'
      + '<td colspan="3"></td>'
      + '</tr>';

    html += '</tbody></table>';
    container.innerHTML = html;
  }

  // ── Render Recovery Heatmap ──

  function renderHeatmap(pfRec) {
    var container = document.getElementById('recovery-heatmap');
    if (!container || !pfRec || !pfRec.recoveries) return;

    var trancheFaces = deriveFaceValues(pfRec);
    var recoveries = pfRec.recoveries;
    var evBreakdown = pfRec.evBreakdown;

    // EV scenarios: $0M to $5,000M in $500M steps
    var evSteps = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000];

    // Filter out tranche 8 (index 7 in 0-based, which is AMC 7.5%) -- actually per Phase 3 decision
    // DS tranche 8 = "AMC 6.125% Notes due 2027" is excluded as consolidated total row
    // The recoveries array has: 0=Total Term Loans, 1=First Out, 2=Second Out, 3=Third Out,
    // 4=Muvico 8% PIK, 5=Muvico 15% PIK, 6=Muvico 6/8% PIK, 7=AMC 7.5%, 8=Odeon, 9=AMC 6.125%
    // Skip sub-tranches (First/Second/Third Out) since Total Term Loans covers them
    var displayIndices = [0, 4, 5, 6, 7, 8, 9];

    var html = '<table class="data-table" style="min-width:600px; font-size:10px;">';
    html += '<thead><tr><th style="min-width:140px; font-size:10px;">Tranche</th>';

    for (var h = 0; h < evSteps.length; h++) {
      var evLabel = evSteps[h] >= 1000
        ? '$' + (evSteps[h] / 1000).toFixed(1) + 'B'
        : '$' + evSteps[h] + 'M';
      html += '<th class="right" style="font-size:9px; text-align:center; min-width:44px;">' + evLabel + '</th>';
    }
    html += '</tr></thead><tbody>';

    for (var t = 0; t < displayIndices.length; t++) {
      var idx = displayIndices[t];
      html += '<tr><td style="font-weight:600; font-size:10px; white-space:nowrap;">' + recoveries[idx].name + '</td>';

      for (var e = 0; e < evSteps.length; e++) {
        var waterfall = computeWaterfall(evSteps[e], recoveries, evBreakdown, trancheFaces);
        var pct = waterfall[idx].totalPct;
        var cellStyle = 'text-align:center; font-weight:700; font-size:10px;'
          + ' color:' + recoveryColor(pct) + ';'
          + ' background:' + recoveryBgColor(pct) + ';';
        var label = pct >= 1.0 ? '100' : pct > 0 ? Math.round(pct * 100).toString() : '\u2014';
        html += '<td style="' + cellStyle + '">' + label + '</td>';
      }
      html += '</tr>';
    }

    html += '</tbody></table>';
    html += '<div style="font-size:9px; color:var(--text-dim); margin-top:6px;">'
      + 'Values show recovery % at each EV level. Green = \u226580%, yellow = 40-80%, red = <40%.'
      + '</div>';

    container.innerHTML = html;
  }

  // ── Render Sparklines ──

  function renderSparklines(is_, ufcf) {
    // Revenue sparkline
    if (is_ && is_.sales && is_.periods) {
      var revValues = is_.sales;
      var revPeriods = is_.periods;
      var latestRev = revValues[revValues.length - 1];
      var revEl = document.getElementById('spark-val-revenue');
      if (revEl) revEl.textContent = '$' + U.fmtInt(Math.round(latestRev)) + 'M';

      var revCanvas = document.getElementById('spark-revenue');
      if (revCanvas) {
        var revChart = new Chart(revCanvas.getContext('2d'), {
          type: 'line',
          data: {
            labels: revPeriods,
            datasets: [{
              data: revValues,
              borderColor: '#3b82f6',
              borderWidth: 1.5,
              fill: { target: 'origin', above: 'rgba(59,130,246,0.08)' },
              pointRadius: 0,
              tension: 0.3
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { enabled: false } },
            scales: { x: { display: false }, y: { display: false } }
          }
        });
        U.ChartRegistry.set('spark-revenue', revChart);
      }
    }

    // EBITDA sparkline (ebit + da)
    if (is_ && is_.ebit && is_.da && is_.periods) {
      var ebitdaValues = [];
      for (var i = 0; i < is_.ebit.length; i++) {
        ebitdaValues.push(is_.ebit[i] + is_.da[i]);
      }
      var ebitdaPeriods = is_.periods;
      var latestEbitda = ebitdaValues[ebitdaValues.length - 1];
      var ebitdaEl = document.getElementById('spark-val-ebitda');
      if (ebitdaEl) ebitdaEl.textContent = '$' + U.fmtInt(Math.round(latestEbitda)) + 'M';

      var ebitdaCanvas = document.getElementById('spark-ebitda');
      if (ebitdaCanvas) {
        var ebitdaChart = new Chart(ebitdaCanvas.getContext('2d'), {
          type: 'line',
          data: {
            labels: ebitdaPeriods,
            datasets: [{
              data: ebitdaValues,
              borderColor: '#22c55e',
              borderWidth: 1.5,
              fill: { target: 'origin', above: 'rgba(34,197,94,0.08)' },
              pointRadius: 0,
              tension: 0.3
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { enabled: false } },
            scales: { x: { display: false }, y: { display: false } }
          }
        });
        U.ChartRegistry.set('spark-ebitda', ebitdaChart);
      }
    }

    // UFCF sparkline
    if (ufcf && ufcf.ufcf && ufcf.periods) {
      var ufcfValues = ufcf.ufcf;
      var ufcfPeriods = ufcf.periods;
      var latestUfcf = ufcfValues[ufcfValues.length - 1];
      var ufcfEl = document.getElementById('spark-val-ufcf');
      if (ufcfEl) ufcfEl.textContent = '$' + U.fmtInt(Math.round(latestUfcf)) + 'M';

      var ufcfCanvas = document.getElementById('spark-ufcf');
      if (ufcfCanvas) {
        var ufcfChart = new Chart(ufcfCanvas.getContext('2d'), {
          type: 'line',
          data: {
            labels: ufcfPeriods,
            datasets: [{
              data: ufcfValues,
              borderColor: '#06b6d4',
              borderWidth: 1.5,
              fill: { target: 'origin', above: 'rgba(6,182,212,0.08)' },
              pointRadius: 0,
              tension: 0.3
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { enabled: false } },
            scales: { x: { display: false }, y: { display: false } }
          }
        });
        U.ChartRegistry.set('spark-ufcf', ufcfChart);
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
    var ufcf = results[0];
    var val = results[1];
    var wacc = results[2];
    var cap = results[3];
    var pfRec = results[4];
    var is_ = results[5];

    renderKPIs(ufcf, val, wacc, cap);
    renderCapStructure(cap);
    renderHeatmap(pfRec);
    renderSparklines(is_, ufcf);
  });

})();
