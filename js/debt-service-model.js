/* ===============================================
   AMC Debt Navigator - Pro-Forma Debt Service Model
   Display-only: summary/detail tables + charts
   =============================================== */

(function() {
  'use strict';

  var U = window.AMC_UTILS;
  var fmt = U.fmt;

  // Number of real tranches (skip index 8 which is consolidated totals)
  var REAL_TRANCHE_COUNT = 8;

  // Tranche colors for charts (ordered by index 0-7)
  var TRANCHE_COLORS = [
    '#dc2626', // First Out TL - red
    '#ef4444', // Second Out TL - lighter red
    '#f97316', // Third Out TL - orange-red
    '#ea580c', // 8% PIK - orange
    '#d97706', // 15% PIK - amber
    '#ca8a04', // 6/8% PIK Toggle - yellow
    '#3b82f6', // Odeon 12.75% - blue
    '#6b7280'  // AMC 7.5% - gray
  ];

  var currentView = 'summary';

  // ── Render Summary Table ──

  function renderSummaryTable(data) {
    var periods = data.periods;
    var tranches = data.tranches;

    // Build header
    var headHtml = '<th style="min-width:180px;">Metric</th>';
    for (var p = 0; p < periods.length; p++) {
      headHtml += '<th class="right">' + periods[p] + '</th>';
    }
    document.getElementById('summary-head').innerHTML = headHtml;

    // Aggregate across real tranches (0 to REAL_TRANCHE_COUNT-1)
    var totalStartBal = [];
    var totalInterest = [];
    var totalPrincipal = [];
    var totalDebtService = [];
    var totalEndBal = [];
    var totalPik = [];

    for (var pi = 0; pi < periods.length; pi++) {
      var sb = 0, ie = 0, pp = 0, eb = 0, pik = 0;
      for (var ti = 0; ti < REAL_TRANCHE_COUNT; ti++) {
        var t = tranches[ti];
        sb += (t.startingBalance && t.startingBalance[pi]) || 0;
        ie += (t.interestExpense && t.interestExpense[pi]) || 0;
        pp += Math.abs((t.borrowingsRepayments && t.borrowingsRepayments[pi]) || 0);
        eb += (t.endingBalance && t.endingBalance[pi]) || 0;
        pik += (t.pikToggle && t.pikToggle[pi]) || 0;
      }
      totalStartBal.push(sb);
      totalInterest.push(ie);
      totalPrincipal.push(pp);
      totalDebtService.push(ie + pp);
      totalEndBal.push(eb);
      totalPik.push(pik);
    }

    // Render rows
    var rows = [
      { label: 'Starting Balance', data: totalStartBal, bold: false },
      { label: 'Cash Interest Expense', data: totalInterest, bold: false },
      { label: 'PIK Accrual', data: totalPik, bold: false },
      { label: 'Principal Payments', data: totalPrincipal, bold: false },
      { label: 'Total Debt Service', data: totalDebtService, bold: true },
      { label: 'Ending Balance', data: totalEndBal, bold: true }
    ];

    var bodyHtml = '';
    for (var r = 0; r < rows.length; r++) {
      var row = rows[r];
      var style = row.bold ? 'font-weight:700; background:var(--surface-2);' : '';
      bodyHtml += '<tr style="' + style + '">';
      bodyHtml += '<td style="font-size:11px; ' + (row.bold ? 'font-weight:700;' : '') + '">' + row.label + '</td>';
      for (var c = 0; c < row.data.length; c++) {
        var val = row.data[c];
        var color = '';
        if (row.label === 'Cash Interest Expense' || row.label === 'Total Debt Service') {
          color = val > 200 ? '#ef4444' : val > 100 ? '#eab308' : '#22c55e';
        }
        bodyHtml += '<td class="right" style="font-size:11px;' + (color ? ' color:' + color + ';' : '') + '">' + fmt(val) + '</td>';
      }
      bodyHtml += '</tr>';
    }

    document.getElementById('summary-body').innerHTML = bodyHtml;
  }

  // ── Render Detail Table ──

  function renderDetailTable(data) {
    var periods = data.periods;
    var tranches = data.tranches;

    // Build header
    var headHtml = '<th style="min-width:200px;">Tranche / Metric</th>';
    for (var p = 0; p < periods.length; p++) {
      headHtml += '<th class="right">' + periods[p] + '</th>';
    }
    document.getElementById('detail-head').innerHTML = headHtml;

    var bodyHtml = '';

    for (var ti = 0; ti < REAL_TRANCHE_COUNT; ti++) {
      var t = tranches[ti];
      var color = TRANCHE_COLORS[ti];
      var hasPik = t.pikToggle && t.pikToggle.some(function(v) { return v > 0; });
      var hasToggle = !!t.toggleCashPik;

      // Tranche header row (always visible, shows name + total interest)
      bodyHtml += '<tr class="ds-tranche-header" data-tranche="' + ti + '" style="cursor:pointer; background:var(--surface-2);">';
      bodyHtml += '<td style="font-weight:700; font-size:11px; color:' + color + ';">'
        + '<span style="display:inline-block; width:8px; height:8px; border-radius:2px; background:' + color + '; margin-right:6px; vertical-align:middle;"></span>'
        + t.name
        + ' <span style="font-size:9px; color:var(--text-muted); font-weight:400;">' + t.interestRate + ' | Mat. ' + t.maturity + '</span>'
        + '</td>';
      for (var h = 0; h < periods.length; h++) {
        var interest = (t.interestExpense && t.interestExpense[h]) || 0;
        var pikVal = (t.pikToggle && t.pikToggle[h]) || 0;
        var totalInt = interest + pikVal;
        bodyHtml += '<td class="right" style="font-size:10px; font-weight:700; color:' + (totalInt > 0 ? color : 'var(--text-dim)') + ';">' + (totalInt > 0 ? fmt(totalInt) : '\u2014') + '</td>';
      }
      bodyHtml += '</tr>';

      // Sub-rows (hidden by default)
      var subRows = [
        { label: 'Starting Balance', arr: t.startingBalance },
        { label: 'Cash Interest', arr: t.interestExpense }
      ];
      if (hasPik) {
        subRows.push({ label: 'PIK Accrual', arr: t.pikToggle });
      }
      if (hasToggle) {
        subRows.push({ label: 'Cash/PIK Mode', arr: t.toggleCashPik, isToggle: true });
      }
      subRows.push({ label: 'Borr./Repayments', arr: t.borrowingsRepayments });
      subRows.push({ label: 'Ending Balance', arr: t.endingBalance });

      for (var sr = 0; sr < subRows.length; sr++) {
        var sub = subRows[sr];
        bodyHtml += '<tr class="ds-sub-row ds-sub-' + ti + '" style="display:none;">';
        bodyHtml += '<td style="font-size:10px; color:var(--text-muted); padding-left:24px;">' + sub.label + '</td>';
        for (var sc = 0; sc < periods.length; sc++) {
          var val = (sub.arr && sub.arr[sc]) != null ? sub.arr[sc] : 0;
          if (sub.isToggle) {
            var modeLabel = val === 1 ? 'PIK' : val === 0 ? 'Cash' : '\u2014';
            var modeColor = val === 1 ? '#d97706' : val === 0 ? '#22c55e' : 'var(--text-dim)';
            bodyHtml += '<td class="right" style="font-size:9px; color:' + modeColor + ';">' + modeLabel + '</td>';
          } else {
            var valColor = val < 0 ? '#ef4444' : 'var(--text)';
            bodyHtml += '<td class="right" style="font-size:10px; color:' + valColor + ';">' + (val !== 0 ? fmt(val) : '\u2014') + '</td>';
          }
        }
        bodyHtml += '</tr>';
      }
    }

    document.getElementById('detail-body').innerHTML = bodyHtml;

    // Add click-to-expand listeners
    var headers = document.querySelectorAll('.ds-tranche-header');
    for (var hi = 0; hi < headers.length; hi++) {
      headers[hi].addEventListener('click', function() {
        var idx = this.getAttribute('data-tranche');
        var subRows2 = document.querySelectorAll('.ds-sub-' + idx);
        var isVisible = subRows2.length > 0 && subRows2[0].style.display !== 'none';
        for (var si = 0; si < subRows2.length; si++) {
          subRows2[si].style.display = isVisible ? 'none' : '';
        }
      });
    }
  }

  // ── Render Interest Stacked Bar Chart ──

  function renderInterestChart(data) {
    var canvas = document.getElementById('interest-chart');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');

    var periods = data.periods;
    var datasets = [];

    for (var ti = 0; ti < REAL_TRANCHE_COUNT; ti++) {
      var t = data.tranches[ti];
      var interestArr = [];
      for (var p = 0; p < periods.length; p++) {
        var cashInt = (t.interestExpense && t.interestExpense[p]) || 0;
        var pikInt = (t.pikToggle && t.pikToggle[p]) || 0;
        interestArr.push(parseFloat((cashInt + pikInt).toFixed(2)));
      }
      datasets.push({
        label: t.name,
        data: interestArr,
        backgroundColor: TRANCHE_COLORS[ti],
        borderWidth: 0,
        borderRadius: 1
      });
    }

    var chart = new Chart(ctx, {
      type: 'bar',
      data: { labels: periods, datasets: datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: 'bottom', labels: { padding: 10, usePointStyle: true, pointStyle: 'rect', font: { size: 9 } } },
          tooltip: {
            mode: 'index',
            callbacks: {
              label: function(ctx) {
                return ctx.dataset.label + ': ' + fmt(ctx.parsed.y);
              },
              footer: function(items) {
                var sum = 0;
                for (var i = 0; i < items.length; i++) sum += items[i].parsed.y;
                return 'Total: ' + fmt(sum);
              }
            }
          }
        },
        scales: {
          x: {
            stacked: true,
            grid: { color: 'rgba(42,54,84,0.5)' },
            ticks: { font: { size: 11 } }
          },
          y: {
            stacked: true,
            grid: { color: 'rgba(42,54,84,0.3)' },
            ticks: { callback: function(v) { return '$' + v + 'M'; }, font: { size: 10 } },
            title: { display: true, text: 'Interest ($M)', font: { size: 10 } }
          }
        }
      }
    });

    U.ChartRegistry.set('ds-interest', chart);
  }

  // ── Render Balance Area Chart ──

  function renderBalanceChart(data) {
    var canvas = document.getElementById('balance-chart');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');

    var periods = data.periods;
    var datasets = [];

    for (var ti = 0; ti < REAL_TRANCHE_COUNT; ti++) {
      var t = data.tranches[ti];
      var balArr = [];
      for (var p = 0; p < periods.length; p++) {
        balArr.push((t.endingBalance && t.endingBalance[p]) || 0);
      }
      datasets.push({
        label: t.name,
        data: balArr,
        backgroundColor: TRANCHE_COLORS[ti] + '66',
        borderColor: TRANCHE_COLORS[ti],
        borderWidth: 1.5,
        fill: true,
        pointRadius: 2,
        tension: 0.2
      });
    }

    var chart = new Chart(ctx, {
      type: 'line',
      data: { labels: periods, datasets: datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: 'bottom', labels: { padding: 10, usePointStyle: true, pointStyle: 'rect', font: { size: 9 } } },
          tooltip: {
            mode: 'index',
            callbacks: {
              label: function(ctx) {
                return ctx.dataset.label + ': ' + fmt(ctx.parsed.y);
              },
              footer: function(items) {
                var sum = 0;
                for (var i = 0; i < items.length; i++) sum += items[i].parsed.y;
                return 'Total: ' + fmt(sum);
              }
            }
          },
          filler: { propagate: false }
        },
        scales: {
          x: {
            grid: { color: 'rgba(42,54,84,0.5)' },
            ticks: { font: { size: 11 } }
          },
          y: {
            stacked: true,
            grid: { color: 'rgba(42,54,84,0.3)' },
            ticks: { callback: function(v) { return '$' + v + 'M'; }, font: { size: 10 } },
            title: { display: true, text: 'Balance ($M)', font: { size: 10 } }
          }
        }
      }
    });

    U.ChartRegistry.set('ds-balance', chart);
  }

  // ── Update Key Metrics ──

  function updateKeyMetrics(data) {
    var metricsEl = document.getElementById('key-metrics');
    if (!metricsEl) return;

    var periods = data.periods;
    var tranches = data.tranches;

    // Year 1 total interest
    var yr1Interest = 0;
    var yr1Principal = 0;
    for (var ti = 0; ti < REAL_TRANCHE_COUNT; ti++) {
      yr1Interest += (tranches[ti].interestExpense && tranches[ti].interestExpense[0]) || 0;
      yr1Interest += (tranches[ti].pikToggle && tranches[ti].pikToggle[0]) || 0;
      yr1Principal += Math.abs((tranches[ti].borrowingsRepayments && tranches[ti].borrowingsRepayments[0]) || 0);
    }

    // Peak interest year
    var peakInterest = 0;
    var peakYear = periods[0];
    for (var p = 0; p < periods.length; p++) {
      var periodInt = 0;
      for (var t = 0; t < REAL_TRANCHE_COUNT; t++) {
        periodInt += (tranches[t].interestExpense && tranches[t].interestExpense[p]) || 0;
        periodInt += (tranches[t].pikToggle && tranches[t].pikToggle[p]) || 0;
      }
      if (periodInt > peakInterest) {
        peakInterest = periodInt;
        peakYear = periods[p];
      }
    }

    // Total principal over projection
    var totalPrincipal = 0;
    for (var ti2 = 0; ti2 < REAL_TRANCHE_COUNT; ti2++) {
      for (var p2 = 0; p2 < periods.length; p2++) {
        totalPrincipal += Math.abs((tranches[ti2].borrowingsRepayments && tranches[ti2].borrowingsRepayments[p2]) || 0);
      }
    }

    metricsEl.innerHTML = ''
      + '<div class="model-metric"><div class="label">Year 1 Interest</div><div class="value" style="color:#ef4444;">' + fmt(yr1Interest) + '</div></div>'
      + '<div class="model-metric"><div class="label">Year 1 Debt Service</div><div class="value" style="color:#eab308;">' + fmt(yr1Interest + yr1Principal) + '</div></div>'
      + '<div class="model-metric"><div class="label">Peak Interest Year</div><div class="value" style="color:#3b82f6;">' + peakYear + ' (' + fmt(peakInterest) + ')</div></div>'
      + '<div class="model-metric"><div class="label">Total Principal (7yr)</div><div class="value" style="color:#22c55e;">' + fmt(totalPrincipal) + '</div></div>';
  }

  // ── View Toggle ──

  function setView(view) {
    currentView = view;
    var summaryEl = document.getElementById('summary-table');
    var detailEl = document.getElementById('detail-table');
    var btnSummary = document.getElementById('btn-view-summary');
    var btnDetail = document.getElementById('btn-view-detail');

    if (view === 'summary') {
      summaryEl.style.display = '';
      detailEl.style.display = 'none';
      btnSummary.classList.add('active');
      btnDetail.classList.remove('active');
    } else {
      summaryEl.style.display = 'none';
      detailEl.style.display = '';
      btnSummary.classList.remove('active');
      btnDetail.classList.add('active');
    }
  }

  // ── Initialize ──

  function init() {
    U.DataLoader.fetch('pf-ds.json').then(function(data) {
      // Render everything
      updateKeyMetrics(data);
      renderSummaryTable(data);
      renderDetailTable(data);
      renderInterestChart(data);
      renderBalanceChart(data);

      // View toggle
      document.getElementById('btn-view-summary').addEventListener('click', function() { setView('summary'); });
      document.getElementById('btn-view-detail').addEventListener('click', function() { setView('detail'); });
    });
  }

  init();

})();
