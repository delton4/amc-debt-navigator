/* ===============================================
   AMC Debt Navigator - Comparable Company Analysis
   Comps table, statistics, and football field chart
   =============================================== */

(function() {
  'use strict';

  var AMC_UTILS = window.AMC_UTILS;

  // ── Module state ──────────────────────────────
  var compsData = null;
  var footballData = null;
  var sortField = null;
  var sortDir = 'desc';

  // ── Label aliases for football field chart ────
  var METHOD_LABELS = {
    'LTM EV/Revenue':       'LTM EV/Rev',
    'LTM EV/EBITDA':        'LTM EV/EBITDA',
    'FWD 2026 EV/Revenue':  "'26E EV/Rev",
    'FWD 2026 EV/EBITDA':   "'26E EV/EBITDA",
    'FWD 2027 EV/Revenue':  "'27E EV/Rev",
    'FWD 2027 EV/EBITDA':   "'27E EV/EBITDA",
    'P/E':                  'P/E',
    'DCF GG':               'DCF (Gordon)',
    'DCF MM':               'DCF (Multiples)'
  };

  // ── Data Loading ──────────────────────────────

  Promise.all([
    AMC_UTILS.DataLoader.fetch('comps.json'),
    AMC_UTILS.DataLoader.fetch('odeon-football-field.json')
  ]).then(function(results) {
    init(results[0], results[1]);
  });

  // ── Initialization ────────────────────────────

  function init(comps, football) {
    compsData = comps;
    footballData = football;
    renderMetrics();
    renderCompsTable();
    renderStatistics();
    renderCallout();
    renderFootballField();
  }

  // ── Summary Metrics ───────────────────────────

  function renderMetrics() {
    var container = document.getElementById('comp-metrics');
    if (!container) return;

    var stats = compsData.statistics;
    var amc = findAMC();
    var medianEv = stats.median.evEbitda2026;
    var amcEv = amc ? amc.evEbitda2026 : null;
    var peerCount = 0;
    for (var i = 0; i < compsData.companies.length; i++) {
      if (compsData.companies[i].ticker !== 'AMC') peerCount++;
    }

    var premDisc = (amcEv !== null && medianEv) ? ((amcEv - medianEv) / medianEv * 100) : null;
    var premDiscStr = premDisc !== null ? (premDisc >= 0 ? '+' : '') + premDisc.toFixed(1) + '%' : 'N/A';
    var premDiscColor = premDisc !== null ? (premDisc >= 0 ? '#ef4444' : '#22c55e') : 'var(--text-muted)';
    // For AMC, trading at a premium to peers is bad (overlevered), so red for premium, green for discount

    var tiles = [
      { label: 'Peer Median EV/EBITDA', value: AMC_UTILS.fmtX(medianEv), sub: '2026E' },
      { label: 'AMC EV/EBITDA', value: amcEv !== null ? AMC_UTILS.fmtX(amcEv) : 'N/A', sub: '2026E' },
      { label: 'Premium / (Discount)', value: premDiscStr, sub: 'vs Peer Median', color: premDiscColor },
      { label: 'Peer Count', value: peerCount + ' peers', sub: 'Excl. AMC' }
    ];

    var html = '';
    for (var t = 0; t < tiles.length; t++) {
      var tile = tiles[t];
      var valStyle = tile.color ? ' style="color:' + tile.color + '"' : '';
      html += '<div class="metric-tile">';
      html += '<div class="metric-label">' + tile.label + '</div>';
      html += '<div class="metric-value"' + valStyle + '>' + tile.value + '</div>';
      html += '<div class="metric-sub">' + tile.sub + '</div>';
      html += '</div>';
    }
    container.innerHTML = html;
  }

  // ── Comps Table ───────────────────────────────

  function renderCompsTable() {
    var tbody = document.getElementById('comps-body');
    if (!tbody) return;

    var companies = compsData.companies;
    var html = '';
    for (var i = 0; i < companies.length; i++) {
      var c = companies[i];
      var isAMC = c.ticker === 'AMC';
      var rowClass = isAMC ? ' class="amc-highlight"' : '';
      html += '<tr' + rowClass + '>';
      html += '<td>' + c.name + '</td>';
      html += '<td>' + c.ticker + '</td>';
      html += '<td class="right">' + AMC_UTILS.fmtDollar(c.price) + '</td>';
      html += '<td class="right">' + AMC_UTILS.fmtInt(c.marketCap) + '</td>';
      html += '<td class="right">' + AMC_UTILS.fmtInt(c.ev) + '</td>';
      html += '<td class="right">' + AMC_UTILS.fmtX(c.evEbitda2026) + '</td>';
      html += '<td class="right">' + AMC_UTILS.fmtX(c.evEbitda2027) + '</td>';
      html += '<td class="right">' + AMC_UTILS.fmtX(c.evRevenue2026) + '</td>';
      html += '<td class="right">' + AMC_UTILS.fmtX(c.evRevenue2027) + '</td>';
      html += '<td class="right">' + c.beta.toFixed(2) + '</td>';
      html += '</tr>';
    }
    tbody.innerHTML = html;
  }

  // ── Sort Handler ──────────────────────────────

  window.sortComps = function(field) {
    if (sortField === field) {
      sortDir = sortDir === 'desc' ? 'asc' : 'desc';
    } else {
      sortField = field;
      sortDir = 'desc';
    }

    compsData.companies.sort(function(a, b) {
      var valA = a[field];
      var valB = b[field];
      // String fields sort alphabetically
      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
        if (sortDir === 'asc') return valA < valB ? -1 : valA > valB ? 1 : 0;
        return valA > valB ? -1 : valA < valB ? 1 : 0;
      }
      // Numeric fields
      if (sortDir === 'asc') return valA - valB;
      return valB - valA;
    });

    renderCompsTable();
    updateSortIndicators();
  };

  function updateSortIndicators() {
    // Clear all indicators
    var fields = ['name', 'ticker', 'price', 'marketCap', 'ev',
                  'evEbitda2026', 'evEbitda2027', 'evRevenue2026', 'evRevenue2027', 'beta'];
    for (var i = 0; i < fields.length; i++) {
      var el = document.getElementById('sort-' + fields[i]);
      if (el) el.textContent = '';
    }
    // Set active indicator
    if (sortField) {
      var activeEl = document.getElementById('sort-' + sortField);
      if (activeEl) {
        activeEl.textContent = sortDir === 'asc' ? ' \u25B2' : ' \u25BC';
      }
    }
  }

  // ── Statistics Summary ────────────────────────

  function renderStatistics() {
    var container = document.getElementById('comps-stats');
    if (!container) return;

    var stats = compsData.statistics;
    var rows = ['min', 'q1', 'median', 'q3', 'max', 'average'];
    var labels = { min: 'Min', q1: 'Q1', median: 'Median', q3: 'Q3', max: 'Max', average: 'Average' };
    var cols = ['evEbitda2026', 'evEbitda2027', 'evRevenue2026', 'evRevenue2027'];
    var colLabels = ['EV/EBITDA 2026E', 'EV/EBITDA 2027E', 'EV/Rev 2026E', 'EV/Rev 2027E'];

    var html = '<table class="stats-table">';
    html += '<thead><tr><th>Statistic</th>';
    for (var h = 0; h < colLabels.length; h++) {
      html += '<th>' + colLabels[h] + '</th>';
    }
    html += '</tr></thead><tbody>';

    for (var r = 0; r < rows.length; r++) {
      var key = rows[r];
      var isMedian = key === 'median';
      var style = isMedian ? ' style="font-weight:700; color:var(--blue);"' : '';
      html += '<tr' + style + '>';
      html += '<td' + style + '>' + labels[key] + '</td>';
      for (var c = 0; c < cols.length; c++) {
        var val = stats[key] ? stats[key][cols[c]] : null;
        html += '<td' + style + '>' + AMC_UTILS.fmtX(val) + '</td>';
      }
      html += '</tr>';
    }

    html += '</tbody></table>';
    container.innerHTML = html;
  }

  // ── AMC Callout ───────────────────────────────

  function renderCallout() {
    var container = document.getElementById('amc-callout');
    if (!container) return;

    var amc = findAMC();
    if (!amc) return;

    var median = compsData.statistics.median.evEbitda2026;
    var amcVal = amc.evEbitda2026;
    var premDisc = ((amcVal - median) / median * 100);
    var direction = premDisc >= 0 ? 'premium' : 'discount';

    var html = '<div class="amc-callout">';
    html += '<strong>AMC Relative Positioning:</strong> ';
    html += 'AMC trades at <strong>' + AMC_UTILS.fmtX(amcVal) + '</strong> EV/EBITDA 2026E ';
    html += 'vs. peer median of <strong>' + AMC_UTILS.fmtX(median) + '</strong>, ';
    html += 'a <strong style="color:' + (premDisc >= 0 ? '#ef4444' : '#22c55e') + ';">';
    html += Math.abs(premDisc).toFixed(1) + '% ' + direction + '</strong> ';
    html += 'reflecting distressed capital structure dynamics.';
    html += '</div>';
    container.innerHTML = html;
  }

  // ── Football Field Chart ──────────────────────

  function renderFootballField() {
    var canvas = document.getElementById('football-chart');
    if (!canvas) return;

    var ranges = footballData.ranges;
    var labels = [];
    var dataValues = [];
    var bgColors = [];
    var borderColors = [];

    for (var i = 0; i < ranges.length; i++) {
      var r = ranges[i];
      var label = METHOD_LABELS[r.method] || r.method;
      labels.push(label);
      dataValues.push([r.min, r.max]);

      // DCF methods get green, comps-based get blue
      var isDCF = r.method.indexOf('DCF') === 0;
      if (isDCF) {
        bgColors.push('rgba(34, 197, 94, 0.7)');
        borderColors.push('rgba(34, 197, 94, 1)');
      } else {
        bgColors.push('rgba(59, 130, 246, 0.7)');
        borderColors.push('rgba(59, 130, 246, 1)');
      }
    }

    // Compute DCF midpoint annotation dynamically
    var dcfGG = null;
    var dcfMM = null;
    for (var d = 0; d < ranges.length; d++) {
      if (ranges[d].method === 'DCF GG') dcfGG = ranges[d];
      if (ranges[d].method === 'DCF MM') dcfMM = ranges[d];
    }
    var dcfMidValue = null;
    if (dcfGG && dcfMM) {
      var ggMid = (dcfGG.min + dcfGG.max) / 2;
      var mmMid = (dcfMM.min + dcfMM.max) / 2;
      dcfMidValue = (ggMid + mmMid) / 2;
    }

    var annotationConfig = {};
    if (dcfMidValue !== null) {
      annotationConfig = {
        dcfMidLine: {
          type: 'line',
          xMin: dcfMidValue,
          xMax: dcfMidValue,
          borderColor: 'rgba(34, 197, 94, 0.8)',
          borderWidth: 2,
          borderDash: [6, 4],
          label: {
            display: true,
            content: 'DCF Mid $' + Math.round(dcfMidValue) + 'M',
            position: 'start',
            backgroundColor: 'rgba(34, 197, 94, 0.15)',
            color: '#22c55e',
            font: { size: 10, weight: 'bold' },
            padding: 4
          }
        }
      };
    }

    var chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Implied EV Range ($M)',
          data: dataValues,
          backgroundColor: bgColors,
          borderColor: borderColors,
          borderWidth: 1,
          borderSkipped: false,
          barPercentage: 0.7,
          categoryPercentage: 0.85
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: '$M',
              font: { size: 11 }
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            },
            grid: {
              color: 'rgba(42, 54, 84, 0.5)'
            }
          },
          y: {
            grid: {
              display: false
            },
            ticks: {
              font: { size: 11 }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                var val = context.raw;
                if (Array.isArray(val)) {
                  return context.dataset.label + ': $' + Math.round(val[0]).toLocaleString() + ' - $' + Math.round(val[1]).toLocaleString() + ' ($M)';
                }
                return '';
              }
            }
          },
          annotation: {
            annotations: annotationConfig
          }
        }
      }
    });

    AMC_UTILS.ChartRegistry.set('football-chart', chart);
  }

  // ── Helpers ───────────────────────────────────

  function findAMC() {
    if (!compsData || !compsData.companies) return null;
    for (var i = 0; i < compsData.companies.length; i++) {
      if (compsData.companies[i].ticker === 'AMC') return compsData.companies[i];
    }
    return null;
  }

})();
