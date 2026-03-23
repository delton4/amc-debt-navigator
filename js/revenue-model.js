/* ===============================================
   AMC Debt Navigator - Revenue Build Model
   Stacked bar charts for US + International segment
   revenue 2020A-2030E with annual/quarterly toggle
   =============================================== */

(function() {
  'use strict';

  var currentView = 'annual';
  var rawData = null;

  // ── Color palette ──
  var COLORS = {
    usAdmissions:       { bg: '#3b82f6', border: '#2563eb' },
    usFoodAndBeverage:  { bg: '#60a5fa', border: '#3b82f6' },
    usOtherTheatre:     { bg: '#93c5fd', border: '#60a5fa' },
    intlAdmissions:     { bg: '#f59e0b', border: '#d97706' },
    intlFoodAndBeverage:{ bg: '#fbbf24', border: '#f59e0b' },
    intlOtherTheatre:   { bg: '#fcd34d', border: '#fbbf24' }
  };

  var SEGMENT_LABELS = {
    usAdmissions:       'US Admissions',
    usFoodAndBeverage:  'US Food & Beverage',
    usOtherTheatre:     'US Other Theatre',
    intlAdmissions:     'Intl Admissions',
    intlFoodAndBeverage:'Intl Food & Beverage',
    intlOtherTheatre:   'Intl Other Theatre'
  };

  var SEGMENT_KEYS = [
    'usAdmissions', 'usFoodAndBeverage', 'usOtherTheatre',
    'intlAdmissions', 'intlFoodAndBeverage', 'intlOtherTheatre'
  ];

  // ── Data filtering ──

  function getFilteredIndices(periods, view) {
    var indices = [];
    for (var i = 0; i < periods.length; i++) {
      var hasQ = periods[i].indexOf('Q') !== -1;
      if (view === 'annual' && !hasQ) {
        indices.push(i);
      } else if (view === 'quarterly' && hasQ) {
        indices.push(i);
      }
    }
    return indices;
  }

  function filterArray(arr, indices) {
    var result = [];
    for (var i = 0; i < indices.length; i++) {
      result.push(arr[indices[i]]);
    }
    return result;
  }

  // ── Summary metrics ──

  function renderMetrics(data) {
    var periods = data.periods;
    var idx2024 = periods.indexOf('2024');
    var idx2030 = periods.indexOf('2030');
    var idx2025 = periods.indexOf('2025');

    var rev2024 = idx2024 >= 0 ? data.totalRevenue[idx2024] : null;
    var rev2030 = idx2030 >= 0 ? data.totalRevenue[idx2030] : null;
    var usRev2025 = idx2025 >= 0 ? data.totalUsRevenue[idx2025] : null;
    var totalRev2025 = idx2025 >= 0 ? data.totalRevenue[idx2025] : null;

    var el2024 = document.getElementById('metric-fy2024');
    var el2030 = document.getElementById('metric-fy2030');
    var elCagr = document.getElementById('metric-cagr');
    var elUs   = document.getElementById('metric-us-share');

    if (el2024) el2024.textContent = AMC_UTILS.fmt(rev2024);
    if (el2030) el2030.textContent = AMC_UTILS.fmt(rev2030);

    if (elCagr && rev2024 && rev2030 && rev2024 > 0) {
      var cagr = (Math.pow(rev2030 / rev2024, 1 / 6) - 1) * 100;
      elCagr.textContent = AMC_UTILS.fmtPct(cagr);
    }

    if (elUs && usRev2025 !== null && totalRev2025 !== null && totalRev2025 > 0) {
      var usShare = (usRev2025 / totalRev2025) * 100;
      elUs.textContent = AMC_UTILS.fmtPct(usShare);
    }
  }

  // ── Main stacked bar chart ──

  function renderRevenueChart(data, view) {
    var indices = getFilteredIndices(data.periods, view);
    var labels = filterArray(data.periods, indices);
    var projected = filterArray(data.isProjected, indices);

    var datasets = [];
    for (var s = 0; s < SEGMENT_KEYS.length; s++) {
      var key = SEGMENT_KEYS[s];
      var values = filterArray(data[key], indices);
      var colors = COLORS[key];

      // Build per-bar background colors with reduced opacity for projected
      var bgColors = [];
      for (var p = 0; p < projected.length; p++) {
        if (projected[p]) {
          bgColors.push(hexToRgba(colors.bg, 0.55));
        } else {
          bgColors.push(hexToRgba(colors.bg, 0.85));
        }
      }

      datasets.push({
        label: SEGMENT_LABELS[key],
        data: values,
        backgroundColor: bgColors,
        borderColor: colors.border,
        borderWidth: 1,
        stack: 'revenue'
      });
    }

    var ctx = document.getElementById('revenue-chart');
    if (!ctx) return;

    AMC_UTILS.ChartRegistry.set('revenue-chart', new Chart(ctx, {
      type: 'bar',
      data: { labels: labels, datasets: datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
            ticks: {
              maxRotation: view === 'quarterly' ? 90 : 0,
              font: { size: view === 'quarterly' ? 9 : 11 }
            }
          },
          y: {
            stacked: true,
            title: { display: true, text: '$M' },
            ticks: {
              callback: function(val) {
                return val.toLocaleString();
              }
            }
          }
        },
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function(ctx) {
                return ctx.dataset.label + ': ' + AMC_UTILS.fmt(ctx.raw);
              },
              afterBody: function(items) {
                var total = 0;
                for (var i = 0; i < items.length; i++) {
                  total += (items[i].raw || 0);
                }
                return 'Total: ' + AMC_UTILS.fmt(total);
              }
            }
          },
          legend: {
            position: 'bottom',
            labels: { boxWidth: 12 }
          }
        }
      }
    }));
  }

  // ── Segment mix chart (annual only) ──

  function renderMixChart(data) {
    var indices = getFilteredIndices(data.periods, 'annual');
    var labels = filterArray(data.periods, indices);
    var usRevs = filterArray(data.totalUsRevenue, indices);
    var totalRevs = filterArray(data.totalRevenue, indices);

    var usPcts = [];
    var intlPcts = [];
    for (var i = 0; i < totalRevs.length; i++) {
      if (totalRevs[i] && totalRevs[i] > 0) {
        var usPct = (usRevs[i] / totalRevs[i]) * 100;
        usPcts.push(Math.round(usPct * 10) / 10);
        intlPcts.push(Math.round((100 - usPct) * 10) / 10);
      } else {
        usPcts.push(0);
        intlPcts.push(0);
      }
    }

    var ctx = document.getElementById('mix-chart');
    if (!ctx) return;

    AMC_UTILS.ChartRegistry.set('mix-chart', new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'US',
            data: usPcts,
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: '#3b82f6',
            borderWidth: 1,
            stack: 'mix'
          },
          {
            label: 'International',
            data: intlPcts,
            backgroundColor: 'rgba(245, 158, 11, 0.8)',
            borderColor: '#f59e0b',
            borderWidth: 1,
            stack: 'mix'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { stacked: true },
          y: {
            stacked: true,
            max: 100,
            title: { display: true, text: '%' },
            ticks: {
              callback: function(val) { return val + '%'; }
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(ctx) {
                return ctx.dataset.label + ': ' + ctx.raw.toFixed(1) + '%';
              }
            }
          },
          legend: {
            position: 'bottom',
            labels: { boxWidth: 12 }
          }
        }
      }
    }));
  }

  // ── Growth table ──

  function renderGrowthTable(data, view) {
    var headEl = document.getElementById('growth-table-head');
    var bodyEl = document.getElementById('growth-table-body');
    if (!headEl || !bodyEl) return;

    var indices = getFilteredIndices(data.periods, view);
    var labels = filterArray(data.periods, indices);
    var totalRevs = filterArray(data.totalRevenue, indices);

    if (view === 'quarterly') {
      // Simpler table for quarterly view
      headEl.innerHTML = '<th>Period</th><th class="right">Total Revenue</th>';
      var rows = '';
      for (var i = 0; i < labels.length; i++) {
        rows += '<tr>';
        rows += '<td>' + labels[i] + '</td>';
        rows += '<td class="right">' + AMC_UTILS.fmt(totalRevs[i]) + '</td>';
        rows += '</tr>';
      }
      bodyEl.innerHTML = rows;
      return;
    }

    // Full table for annual view
    var usRevs = filterArray(data.totalUsRevenue, indices);
    var intlRevs = filterArray(data.totalIntlRevenue, indices);
    var projected = filterArray(data.isProjected, indices);

    headEl.innerHTML = '<th>Period</th><th class="right">Total Revenue</th>' +
      '<th class="right">YoY Growth</th><th class="right">US Revenue</th>' +
      '<th class="right">Intl Revenue</th><th class="right">US Share</th>' +
      '<th class="right">Intl Share</th>';

    var rows = '';
    for (var i = 0; i < labels.length; i++) {
      var label = labels[i] + (projected[i] ? 'E' : '');
      var yoy = '';
      var yoyColor = '';
      if (i > 0 && totalRevs[i - 1] && totalRevs[i - 1] > 0) {
        var growth = ((totalRevs[i] - totalRevs[i - 1]) / totalRevs[i - 1]) * 100;
        yoy = AMC_UTILS.fmtPct(growth);
        yoyColor = AMC_UTILS.colorVal(growth);
      }

      var usShare = totalRevs[i] > 0 ? AMC_UTILS.fmtPct((usRevs[i] / totalRevs[i]) * 100) : 'N/A';
      var intlShare = totalRevs[i] > 0 ? AMC_UTILS.fmtPct((intlRevs[i] / totalRevs[i]) * 100) : 'N/A';

      rows += '<tr>';
      rows += '<td>' + label + '</td>';
      rows += '<td class="right">' + AMC_UTILS.fmt(totalRevs[i]) + '</td>';
      rows += '<td class="right" style="color:' + yoyColor + ';">' + yoy + '</td>';
      rows += '<td class="right">' + AMC_UTILS.fmt(usRevs[i]) + '</td>';
      rows += '<td class="right">' + AMC_UTILS.fmt(intlRevs[i]) + '</td>';
      rows += '<td class="right">' + usShare + '</td>';
      rows += '<td class="right">' + intlShare + '</td>';
      rows += '</tr>';
    }
    bodyEl.innerHTML = rows;
  }

  // ── Hex to rgba helper ──

  function hexToRgba(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  }

  // ── Mix chart container visibility ──

  function toggleMixChart(view) {
    var container = document.getElementById('mix-chart-container');
    if (!container) return;
    container.style.display = view === 'annual' ? '' : 'none';
  }

  // ── Toggle handler ──

  window.setRevenueView = function(view) {
    currentView = view;

    // Update active button
    var btns = document.querySelectorAll('.tab-nav .tab-btn');
    for (var i = 0; i < btns.length; i++) {
      var btn = btns[i];
      if (btn.getAttribute('data-view') === view) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    }

    // Re-render
    renderRevenueChart(rawData, view);
    renderGrowthTable(rawData, view);
    toggleMixChart(view);

    // Recreate mix chart if switching back to annual
    if (view === 'annual') {
      renderMixChart(rawData);
    } else {
      AMC_UTILS.ChartRegistry.destroy('mix-chart');
    }
  };

  // ── Init ──

  function init(data) {
    rawData = data;
    renderMetrics(data);
    renderRevenueChart(data, currentView);
    renderGrowthTable(data, currentView);
    renderMixChart(data);
    toggleMixChart(currentView);
  }

  // ── Load data ──
  AMC_UTILS.DataLoader.fetch('revenue-build.json').then(init);

})();
