/* ===============================================
   AMC Debt Navigator - Financial Statements Model
   Renders IS, BS, and CFS charts and tables from
   data/financials.json
   =============================================== */

(function() {
  'use strict';

  // ── Chart.js dark theme defaults ──
  Chart.defaults.color = '#8899b4';
  Chart.defaults.borderColor = '#2a3654';

  // ── Module-level state ──
  var financialData = null;
  var isChart  = null;
  var bsChart  = null;
  var cfsChart = null;

  var currentISPeriod  = 'FY2022';
  var currentBSPeriod  = 'Dec2023';
  var currentCFSPeriod = 'FY2022';

  // ── IS period index map: button label -> index in incomeStatement.periods ──
  // incomeStatement.periods: ["FY 2022","FY 2023","FY 2024","9M 2024","9M 2025","Q3 2024","Q3 2025"]
  var IS_IDX = { 'FY2022': 0, 'FY2023': 1, 'FY2024': 2, '9M2024': 3, '9M2025': 4 };
  var IS_LABELS = { 'FY2022': 'FY 2022', 'FY2023': 'FY 2023', 'FY2024': 'FY 2024', '9M2024': '9M 2024', '9M2025': '9M 2025' };

  // ── BS period index map: button label -> index in balanceSheet.periods ──
  // balanceSheet.periods: ["Dec 31, 2023","Dec 31, 2024","Sep 30, 2025"]
  var BS_IDX = { 'Dec2023': 0, 'Dec2024': 1, 'Sep2025': 2 };
  var BS_LABELS = { 'Dec2023': 'Dec 31, 2023', 'Dec2024': 'Dec 31, 2024', 'Sep2025': 'Sep 30, 2025' };

  // ── CFS period index map ──
  // cashFlow.periods: ["FY 2022","FY 2023","FY 2024","9M 2024","9M 2025"]
  var CFS_IDX = { 'FY2022': 0, 'FY2023': 1, 'FY2024': 2, '9M2024': 3, '9M2025': 4 };
  var CFS_LABELS = { 'FY2022': 'FY 2022', 'FY2023': 'FY 2023', 'FY2024': 'FY 2024', '9M2024': '9M 2024', '9M2025': '9M 2025' };

  // ── Formatting helpers ──
  function fmt(n) {
    if (n === null || n === undefined || isNaN(n)) return 'N/A';
    var abs = Math.abs(n);
    var s = '$' + abs.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'M';
    return n < 0 ? '(' + s + ')' : s;
  }
  function fmtPct(n) {
    if (n === null || n === undefined || isNaN(n)) return 'N/A';
    return (n * 100).toFixed(1) + '%';
  }
  function colorVal(n) {
    return n < 0 ? '#ef4444' : '#22c55e';
  }
  function colorBar(n, alpha) {
    alpha = alpha !== undefined ? alpha : 0.7;
    return n >= 0 ? 'rgba(34,197,94,' + alpha + ')' : 'rgba(239,68,68,' + alpha + ')';
  }
  function colorBorder(n) {
    return n >= 0 ? '#22c55e' : '#ef4444';
  }

  // ── Destroy a chart instance safely ──
  function destroyChart(chartRef) {
    if (chartRef) { chartRef.destroy(); }
    return null;
  }

  // ── Text helper ──
  function setElText(id, text) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = text;
  }

  // ── Fetch financials.json ──
  function loadData() {
    var paths = ['../data/financials.json', './data/financials.json', 'data/financials.json'];
    var idx = 0;
    function tryNext() {
      if (idx >= paths.length) {
        console.error('financials-model: Could not load financials.json');
        return;
      }
      var url = paths[idx++];
      fetch(url)
        .then(function(r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          return r.json();
        })
        .then(function(data) {
          financialData = data;
          init();
        })
        .catch(tryNext);
    }
    tryNext();
  }

  // ── Initialise all tabs after data loaded ──
  function init() {
    updateSummaryMetrics();
    renderISTab(currentISPeriod);
    renderBSTab(currentBSPeriod);
    renderCFSTab(currentCFSPeriod);
  }

  // ── Update static metric tiles from LTM data ──
  function updateSummaryMetrics() {
    var ltm = financialData.ltm;
    if (!ltm) return;
    var bs = financialData.balanceSheet;
    var cash = bs.cash[2];
    var netDebt = bs.netDebt[2];
    var metricsEl = document.getElementById('summary-metrics');
    if (!metricsEl) return;
    metricsEl.innerHTML = ''
      + '<div class="model-metric">'
      + '  <div class="label">LTM Revenue</div>'
      + '  <div class="value" style="color:var(--blue);">' + fmt(ltm.revenue) + '</div>'
      + '</div>'
      + '<div class="model-metric">'
      + '  <div class="label">LTM EBITDA</div>'
      + '  <div class="value" style="color:var(--green);">' + fmt(ltm.ebitda) + '</div>'
      + '</div>'
      + '<div class="model-metric">'
      + '  <div class="label">Cash (Sep 2025)</div>'
      + '  <div class="value" style="color:var(--yellow);">' + fmt(cash) + '</div>'
      + '</div>'
      + '<div class="model-metric">'
      + '  <div class="label">Net Debt (Sep 2025)</div>'
      + '  <div class="value" style="color:var(--red);">' + fmt(netDebt) + '</div>'
      + '</div>';
  }

  // ════════════════════════════════════════════
  //  INCOME STATEMENT TAB
  // ════════════════════════════════════════════

  function renderISTab(period) {
    isChart = destroyChart(isChart);
    var canvas = document.getElementById('is-chart');
    if (!canvas || !financialData) return;
    var is = financialData.incomeStatement;

    if (period === '9MComp') {
      renderISComp(canvas, is);
      renderISTableComp(is, IS_IDX['9M2024'], IS_IDX['9M2025']);
      setElText('is-chart-title', 'Income Statement \u2014 9M2024 vs 9M2025');
      setElText('is-table-title', 'Summary \u2014 9M Comparison');
    } else {
      var i = IS_IDX[period];
      if (i === undefined) return;
      renderISSingle(canvas, is, i, IS_LABELS[period]);
      renderISTableSingle(is, i, IS_LABELS[period]);
      setElText('is-chart-title', 'Income Statement \u2014 ' + IS_LABELS[period]);
      setElText('is-table-title', 'Summary \u2014 ' + IS_LABELS[period]);
    }
  }

  function renderISSingle(canvas, is, i, label) {
    var rev    = is.revenue[i];
    var ebitda = is.ebitda[i];
    var margin = is.ebitdaMargin[i];
    isChart = new Chart(canvas.getContext('2d'), {
      data: {
        labels: [label],
        datasets: [
          {
            type: 'bar',
            label: 'Revenue',
            data: [rev],
            backgroundColor: 'rgba(59,130,246,0.7)',
            borderColor: '#3b82f6',
            borderWidth: 1,
            yAxisID: 'y'
          },
          {
            type: 'bar',
            label: 'EBITDA',
            data: [ebitda],
            backgroundColor: ebitda >= 0 ? 'rgba(34,197,94,0.7)' : 'rgba(239,68,68,0.7)',
            borderColor: ebitda >= 0 ? '#22c55e' : '#ef4444',
            borderWidth: 1,
            yAxisID: 'y'
          },
          {
            type: 'line',
            label: 'EBITDA Margin %',
            data: [margin * 100],
            borderColor: '#eab308',
            backgroundColor: 'rgba(234,179,8,0.15)',
            pointBackgroundColor: '#eab308',
            pointRadius: 7,
            pointHoverRadius: 9,
            borderWidth: 2,
            yAxisID: 'y2'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, labels: { color: '#8899b4', boxWidth: 12 } },
          tooltip: {
            callbacks: {
              label: function(ctx) {
                if (ctx.dataset.yAxisID === 'y2') {
                  return ' ' + ctx.dataset.label + ': ' + ctx.parsed.y.toFixed(1) + '%';
                }
                return ' ' + ctx.dataset.label + ': ' + fmt(ctx.parsed.y);
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: '#2a3654' },
            ticks: { callback: function(v) { return '$' + v.toFixed(0) + 'M'; } },
            title: { display: true, text: 'USD ($M)', color: '#8899b4' }
          },
          y2: {
            position: 'right',
            grid: { display: false },
            ticks: { callback: function(v) { return v.toFixed(1) + '%'; }, color: '#eab308' },
            title: { display: true, text: 'EBITDA Margin %', color: '#eab308' }
          },
          x: { grid: { display: false } }
        }
      }
    });
  }

  function renderISComp(canvas, is) {
    var i24 = IS_IDX['9M2024'];
    var i25 = IS_IDX['9M2025'];
    isChart = new Chart(canvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Revenue', 'EBITDA'],
        datasets: [
          {
            label: '9M 2024',
            data: [is.revenue[i24], is.ebitda[i24]],
            backgroundColor: 'rgba(99,102,241,0.65)',
            borderColor: '#6366f1',
            borderWidth: 1
          },
          {
            label: '9M 2025',
            data: [is.revenue[i25], is.ebitda[i25]],
            backgroundColor: [
              'rgba(59,130,246,0.7)',
              is.ebitda[i25] >= 0 ? 'rgba(34,197,94,0.7)' : 'rgba(239,68,68,0.7)'
            ],
            borderColor: [
              '#3b82f6',
              is.ebitda[i25] >= 0 ? '#22c55e' : '#ef4444'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, labels: { color: '#8899b4', boxWidth: 12 } },
          tooltip: {
            callbacks: {
              label: function(ctx) {
                return ' ' + ctx.dataset.label + ': ' + fmt(ctx.parsed.y);
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: '#2a3654' },
            ticks: { callback: function(v) { return '$' + v.toFixed(0) + 'M'; } }
          },
          x: { grid: { display: false } }
        }
      }
    });
  }

  function renderISTableSingle(is, i, label) {
    var head = document.getElementById('is-table-head');
    if (head) {
      head.innerHTML = '<th>Metric</th><th class="right">' + label + '</th>';
    }
    var tbody = document.getElementById('is-table-body');
    if (!tbody) return;
    var rows = [
      { label: 'Revenue',          val: is.revenue[i],          color: '' },
      { label: 'Admissions',       val: is.admissions[i],       color: '' },
      { label: 'F&B Revenue',      val: is.fnb[i],              color: '' },
      { label: 'Other Revenue',    val: is.other[i],            color: '' },
      { label: 'EBITDA',           val: is.ebitda[i],           color: colorVal(is.ebitda[i]) },
      { label: 'EBITDA Margin',    val: null, str: fmtPct(is.ebitdaMargin[i]), color: '#eab308' },
      { label: 'Interest Expense', val: is.interestCorp[i],     color: '#ef4444' },
      { label: 'Net Loss',         val: is.netLoss[i],          color: colorVal(is.netLoss[i]) }
    ];
    var html = '';
    rows.forEach(function(r) {
      var disp = r.str !== undefined ? r.str : fmt(r.val);
      var style = r.color ? 'style="color:' + r.color + ';"' : '';
      html += '<tr><td>' + r.label + '</td><td class="right" ' + style + '>' + disp + '</td></tr>';
    });
    tbody.innerHTML = html;
  }

  function renderISTableComp(is, i24, i25) {
    var head = document.getElementById('is-table-head');
    if (head) {
      head.innerHTML = '<th>Metric</th>'
        + '<th class="right">9M 2024</th>'
        + '<th class="right">9M 2025</th>'
        + '<th class="right">Change</th>';
    }
    var tbody = document.getElementById('is-table-body');
    if (!tbody) return;

    var metrics = [
      { label: 'Revenue',          v24: is.revenue[i24],          v25: is.revenue[i25]          },
      { label: 'Admissions',       v24: is.admissions[i24],       v25: is.admissions[i25]       },
      { label: 'F&B Revenue',      v24: is.fnb[i24],              v25: is.fnb[i25]              },
      { label: 'EBITDA',           v24: is.ebitda[i24],           v25: is.ebitda[i25]           },
      {
        label: 'EBITDA Margin',
        v24: null, v25: null,
        s24: fmtPct(is.ebitdaMargin[i24]),
        s25: fmtPct(is.ebitdaMargin[i25]),
        chgNum: (is.ebitdaMargin[i25] - is.ebitdaMargin[i24]) * 100,
        chgStr: function(c) { return (c >= 0 ? '+' : '') + c.toFixed(1) + 'pp'; },
        isPct: true
      },
      { label: 'Interest Expense', v24: is.interestCorp[i24],     v25: is.interestCorp[i25]     },
      { label: 'Net Loss',         v24: is.netLoss[i24],          v25: is.netLoss[i25]          }
    ];

    var html = '';
    metrics.forEach(function(m) {
      var s24, s25, chgStr, chgColor;
      if (m.isPct) {
        s24 = m.s24; s25 = m.s25;
        var c = m.chgNum;
        chgStr = m.chgStr(c);
        chgColor = colorVal(c);
      } else {
        s24 = fmt(m.v24); s25 = fmt(m.v25);
        var chg = m.v25 - m.v24;
        chgStr = (chg >= 0 ? '+' : '') + fmt(chg);
        chgColor = colorVal(chg);
      }
      html += '<tr>'
        + '<td>' + m.label + '</td>'
        + '<td class="right">' + s24 + '</td>'
        + '<td class="right">' + s25 + '</td>'
        + '<td class="right" style="color:' + chgColor + ';">' + chgStr + '</td>'
        + '</tr>';
    });
    tbody.innerHTML = html;
  }

  // ════════════════════════════════════════════
  //  BALANCE SHEET TAB
  // ════════════════════════════════════════════

  function renderBSTab(period) {
    bsChart = destroyChart(bsChart);
    var canvas = document.getElementById('bs-chart');
    if (!canvas || !financialData) return;
    var bs = financialData.balanceSheet;

    if (period === 'All') {
      renderBSAll(canvas, bs);
      renderBSTableAll(bs);
      setElText('bs-chart-title', 'Balance Sheet \u2014 All Periods');
      setElText('bs-table-title', 'Summary \u2014 All Periods');
    } else {
      var i = BS_IDX[period];
      if (i === undefined) return;
      renderBSSingle(canvas, bs, i, BS_LABELS[period]);
      renderBSTableSingle(bs, i, BS_LABELS[period]);
      setElText('bs-chart-title', 'Balance Sheet \u2014 ' + BS_LABELS[period]);
      setElText('bs-table-title', 'Summary \u2014 ' + BS_LABELS[period]);
    }
  }

  function renderBSSingle(canvas, bs, i, label) {
    bsChart = new Chart(canvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Cash', 'Receivables', 'Other Current', 'PP&E (Net)', 'ROU Assets', 'Goodwill / Other'],
        datasets: [{
          label: label,
          data: [
            bs.cash[i],
            bs.receivables[i],
            bs.otherCurrent[i],
            bs.propertyNet[i],
            bs.rouAssets[i],
            bs.intangibles[i] + bs.goodwill[i] + bs.otherLongTerm[i]
          ],
          backgroundColor: [
            'rgba(234,179,8,0.7)',
            'rgba(59,130,246,0.6)',
            'rgba(99,102,241,0.5)',
            'rgba(34,197,94,0.6)',
            'rgba(6,182,212,0.5)',
            'rgba(168,85,247,0.5)'
          ],
          borderColor: ['#eab308','#3b82f6','#6366f1','#22c55e','#06b6d4','#a855f7'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(ctx) { return ' ' + fmt(ctx.parsed.y); }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: '#2a3654' },
            ticks: { callback: function(v) { return '$' + v.toFixed(0) + 'M'; } }
          },
          x: { grid: { display: false } }
        }
      }
    });
  }

  function renderBSAll(canvas, bs) {
    var labels = bs.periods;
    bsChart = new Chart(canvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Cash',
            data: bs.cash,
            backgroundColor: 'rgba(234,179,8,0.7)',
            borderColor: '#eab308',
            borderWidth: 1,
            stack: 'assets'
          },
          {
            label: 'Other Current',
            data: bs.totalCurrentAssets.map(function(v, i) { return v - bs.cash[i] - bs.restrictedCash[i]; }),
            backgroundColor: 'rgba(59,130,246,0.55)',
            borderColor: '#3b82f6',
            borderWidth: 1,
            stack: 'assets'
          },
          {
            label: 'PP&E + ROU',
            data: bs.propertyNet.map(function(v, i) { return v + bs.rouAssets[i]; }),
            backgroundColor: 'rgba(34,197,94,0.45)',
            borderColor: '#22c55e',
            borderWidth: 1,
            stack: 'assets'
          },
          {
            label: 'Intangibles + Goodwill',
            data: bs.goodwill.map(function(v, i) { return v + bs.intangibles[i] + bs.otherLongTerm[i]; }),
            backgroundColor: 'rgba(168,85,247,0.4)',
            borderColor: '#a855f7',
            borderWidth: 1,
            stack: 'assets'
          },
          {
            type: 'line',
            label: 'Net Debt',
            data: bs.netDebt,
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239,68,68,0.1)',
            pointBackgroundColor: '#ef4444',
            pointRadius: 6,
            pointHoverRadius: 8,
            borderWidth: 2,
            yAxisID: 'y2'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, labels: { color: '#8899b4', boxWidth: 12 } },
          tooltip: {
            callbacks: {
              label: function(ctx) {
                if (ctx.dataset.yAxisID === 'y2') {
                  return ' Net Debt: ' + fmt(ctx.parsed.y);
                }
                return ' ' + ctx.dataset.label + ': ' + fmt(ctx.parsed.y);
              }
            }
          }
        },
        scales: {
          y: {
            stacked: true,
            beginAtZero: true,
            grid: { color: '#2a3654' },
            ticks: { callback: function(v) { return '$' + (v / 1000).toFixed(1) + 'B'; } },
            title: { display: true, text: 'Total Assets (USD)', color: '#8899b4' }
          },
          y2: {
            position: 'right',
            grid: { display: false },
            ticks: { callback: function(v) { return '$' + v.toFixed(0) + 'M'; }, color: '#ef4444' },
            title: { display: true, text: 'Net Debt ($M)', color: '#ef4444' }
          },
          x: { grid: { display: false } }
        }
      }
    });
  }

  function renderBSTableSingle(bs, i, label) {
    var head = document.getElementById('bs-table-head');
    if (head) {
      head.innerHTML = '<th>Metric</th><th class="right">' + label + '</th>';
    }
    var tbody = document.getElementById('bs-table-body');
    if (!tbody) return;
    var rows = [
      { label: 'Cash & Equivalents',          val: bs.cash[i],               color: '#eab308' },
      { label: 'Restricted Cash',              val: bs.restrictedCash[i],     color: '' },
      { label: 'Total Current Assets',         val: bs.totalCurrentAssets[i], color: '' },
      { label: 'PP&E, Net',                    val: bs.propertyNet[i],        color: '' },
      { label: 'ROU Assets',                   val: bs.rouAssets[i],          color: '' },
      { label: 'Goodwill',                     val: bs.goodwill[i],           color: '' },
      { label: 'Total Assets',                 val: bs.totalAssets[i],        color: '' },
      { label: 'Corporate Borrowings',         val: bs.corporateBorrowings[i], color: '#ef4444' },
      { label: 'Total Debt (incl. leases)',    val: bs.totalDebt[i],          color: '#ef4444' },
      { label: 'Net Debt',                     val: bs.netDebt[i],            color: '#ef4444' },
      { label: "Stockholders' Deficit",        val: bs.stockholdersDeficit[i], color: '#ef4444' }
    ];
    var html = '';
    rows.forEach(function(r) {
      var style = r.color ? 'style="color:' + r.color + ';"' : '';
      html += '<tr><td>' + r.label + '</td><td class="right" ' + style + '>' + fmt(r.val) + '</td></tr>';
    });
    tbody.innerHTML = html;
  }

  function renderBSTableAll(bs) {
    var periods = bs.periods;
    var head = document.getElementById('bs-table-head');
    if (head) {
      head.innerHTML = '<th>Metric</th>'
        + periods.map(function(p) { return '<th class="right">' + p + '</th>'; }).join('');
    }
    var tbody = document.getElementById('bs-table-body');
    if (!tbody) return;

    var metrics = [
      { label: 'Cash & Equivalents',       key: 'cash',               color: '#eab308' },
      { label: 'Restricted Cash',          key: 'restrictedCash',     color: '' },
      { label: 'Total Current Assets',     key: 'totalCurrentAssets', color: '' },
      { label: 'Total Assets',             key: 'totalAssets',        color: '' },
      { label: 'Corporate Borrowings',     key: 'corporateBorrowings', color: '#ef4444' },
      { label: 'Total Debt',               key: 'totalDebt',          color: '#ef4444' },
      { label: 'Net Debt',                 key: 'netDebt',            color: '#ef4444' },
      { label: "Stockholders' Deficit",    key: 'stockholdersDeficit', color: '#ef4444' }
    ];

    var html = '';
    metrics.forEach(function(m) {
      html += '<tr><td>' + m.label + '</td>';
      [0, 1, 2].forEach(function(i) {
        var style = m.color ? 'style="color:' + m.color + ';"' : '';
        html += '<td class="right" ' + style + '>' + fmt(bs[m.key][i]) + '</td>';
      });
      html += '</tr>';
    });
    tbody.innerHTML = html;
  }

  // ════════════════════════════════════════════
  //  CASH FLOW TAB
  // ════════════════════════════════════════════

  function renderCFSTab(period) {
    cfsChart = destroyChart(cfsChart);
    var canvas = document.getElementById('cfs-chart');
    if (!canvas || !financialData) return;
    var cfs = financialData.cashFlow;

    if (period === '9MComp') {
      renderCFSComp(canvas, cfs);
      renderCFSTableComp(cfs, CFS_IDX['9M2024'], CFS_IDX['9M2025']);
      setElText('cfs-chart-title', 'Cash Flow Statement \u2014 9M2024 vs 9M2025');
      setElText('cfs-table-title', 'Summary \u2014 9M Comparison');
    } else {
      var i = CFS_IDX[period];
      if (i === undefined) return;
      renderCFSSingle(canvas, cfs, i, CFS_LABELS[period]);
      renderCFSTableSingle(cfs, i, CFS_LABELS[period]);
      setElText('cfs-chart-title', 'Cash Flow Statement \u2014 ' + CFS_LABELS[period]);
      setElText('cfs-table-title', 'Summary \u2014 ' + CFS_LABELS[period]);
    }
  }

  function renderCFSSingle(canvas, cfs, i, label) {
    var cfo = cfs.cfOperating[i];
    var cfi = cfs.cfInvesting[i];
    var cff = cfs.cfFinancing[i];
    var net = cfs.netCashChange[i];
    cfsChart = new Chart(canvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['CFO', 'CFI', 'CFF', 'Net Change'],
        datasets: [{
          label: label,
          data: [cfo, cfi, cff, net],
          backgroundColor: [colorBar(cfo), colorBar(cfi, 0.6), colorBar(cff), colorBar(net, 0.5)],
          borderColor: [colorBorder(cfo), colorBorder(cfi), cff >= 0 ? '#3b82f6' : '#ef4444', colorBorder(net)],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(ctx) { return ' ' + fmt(ctx.parsed.y); }
            }
          }
        },
        scales: {
          y: {
            grid: { color: '#2a3654' },
            ticks: { callback: function(v) { return '$' + v.toFixed(0) + 'M'; } }
          },
          x: { grid: { display: false } }
        }
      }
    });
  }

  function renderCFSComp(canvas, cfs) {
    var i24 = CFS_IDX['9M2024'];
    var i25 = CFS_IDX['9M2025'];
    var labels = ['CFO', 'CFI', 'CFF', 'Net Change'];
    var vals24 = [cfs.cfOperating[i24], cfs.cfInvesting[i24], cfs.cfFinancing[i24], cfs.netCashChange[i24]];
    var vals25 = [cfs.cfOperating[i25], cfs.cfInvesting[i25], cfs.cfFinancing[i25], cfs.netCashChange[i25]];
    cfsChart = new Chart(canvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: '9M 2024',
            data: vals24,
            backgroundColor: 'rgba(99,102,241,0.6)',
            borderColor: '#6366f1',
            borderWidth: 1
          },
          {
            label: '9M 2025',
            data: vals25,
            backgroundColor: vals25.map(function(v) { return colorBar(v); }),
            borderColor: vals25.map(function(v) { return colorBorder(v); }),
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, labels: { color: '#8899b4', boxWidth: 12 } },
          tooltip: {
            callbacks: {
              label: function(ctx) {
                return ' ' + ctx.dataset.label + ': ' + fmt(ctx.parsed.y);
              }
            }
          }
        },
        scales: {
          y: {
            grid: { color: '#2a3654' },
            ticks: { callback: function(v) { return '$' + v.toFixed(0) + 'M'; } }
          },
          x: { grid: { display: false } }
        }
      }
    });
  }

  function renderCFSTableSingle(cfs, i, label) {
    var head = document.getElementById('cfs-table-head');
    if (head) {
      head.innerHTML = '<th>Metric</th><th class="right">' + label + '</th>';
    }
    var tbody = document.getElementById('cfs-table-body');
    if (!tbody) return;
    var cfo = cfs.cfOperating[i];
    var cfi = cfs.cfInvesting[i];
    var cff = cfs.cfFinancing[i];
    var net = cfs.netCashChange[i];
    var end = cfs.endingCash[i];
    var rows = [
      { label: 'Cash from Operations (CFO)', val: cfo, color: colorVal(cfo) },
      { label: 'Capital Expenditures',       val: cfs.capex[i], color: '#ef4444' },
      { label: 'Cash from Investing (CFI)',  val: cfi, color: colorVal(cfi) },
      { label: 'Equity Issuances',           val: cfs.equityIssuances[i], color: '#3b82f6' },
      { label: 'Debt Proceeds',              val: cfs.debtProceeds[i], color: '#3b82f6' },
      { label: 'Debt Repayments',            val: cfs.debtRepayments[i], color: '#ef4444' },
      { label: 'Cash from Financing (CFF)',  val: cff, color: colorVal(cff) },
      { label: 'Net Cash Change',            val: net, color: colorVal(net) },
      { label: 'Ending Cash + Restricted',  val: end, color: '#eab308' }
    ];
    var html = '';
    rows.forEach(function(r) {
      html += '<tr><td>' + r.label + '</td>'
        + '<td class="right" style="color:' + r.color + ';">' + fmt(r.val) + '</td></tr>';
    });
    tbody.innerHTML = html;
  }

  function renderCFSTableComp(cfs, i24, i25) {
    var head = document.getElementById('cfs-table-head');
    if (head) {
      head.innerHTML = '<th>Metric</th>'
        + '<th class="right">9M 2024</th>'
        + '<th class="right">9M 2025</th>'
        + '<th class="right">Change</th>';
    }
    var tbody = document.getElementById('cfs-table-body');
    if (!tbody) return;

    var keys = [
      { label: 'Cash from Operations (CFO)', key: 'cfOperating' },
      { label: 'Capital Expenditures',       key: 'capex' },
      { label: 'Cash from Investing (CFI)',  key: 'cfInvesting' },
      { label: 'Cash from Financing (CFF)',  key: 'cfFinancing' },
      { label: 'Net Cash Change',            key: 'netCashChange' },
      { label: 'Ending Cash + Restricted',  key: 'endingCash', cashColor: true }
    ];

    var html = '';
    keys.forEach(function(m) {
      var v24 = cfs[m.key][i24];
      var v25 = cfs[m.key][i25];
      var chg = v25 - v24;
      var color24 = m.cashColor ? '#eab308' : colorVal(v24);
      var color25 = m.cashColor ? '#eab308' : colorVal(v25);
      var chgColor = colorVal(chg);
      var chgStr = (chg >= 0 ? '+' : '') + fmt(chg);
      html += '<tr>'
        + '<td>' + m.label + '</td>'
        + '<td class="right" style="color:' + color24 + ';">' + fmt(v24) + '</td>'
        + '<td class="right" style="color:' + color25 + ';">' + fmt(v25) + '</td>'
        + '<td class="right" style="color:' + chgColor + ';">' + chgStr + '</td>'
        + '</tr>';
    });
    tbody.innerHTML = html;
  }

  // ════════════════════════════════════════════
  //  PUBLIC API (called from HTML onclick attrs)
  // ════════════════════════════════════════════

  window.setTab = function(tabId) {
    // Toggle content visibility
    ['is', 'bs', 'cfs'].forEach(function(t) {
      var el = document.getElementById('tab-' + t);
      if (el) el.classList.toggle('active', t === tabId);
    });
    // Toggle button active state
    document.querySelectorAll('.tab-btn').forEach(function(b) {
      b.classList.toggle('active', b.getAttribute('data-tab') === tabId);
    });
    // Re-render (canvas may have been hidden, needs fresh draw)
    if (tabId === 'is') {
      isChart = destroyChart(isChart);
      renderISTab(currentISPeriod);
    } else if (tabId === 'bs') {
      bsChart = destroyChart(bsChart);
      renderBSTab(currentBSPeriod);
    } else if (tabId === 'cfs') {
      cfsChart = destroyChart(cfsChart);
      renderCFSTab(currentCFSPeriod);
    }
  };

  window.setISPeriod = function(period) {
    currentISPeriod = period;
    updatePeriodBtns('tab-is', period);
    renderISTab(period);
  };

  window.setBSPeriod = function(period) {
    currentBSPeriod = period;
    updatePeriodBtns('tab-bs', period);
    renderBSTab(period);
  };

  window.setCFSPeriod = function(period) {
    currentCFSPeriod = period;
    updatePeriodBtns('tab-cfs', period);
    renderCFSTab(period);
  };

  function updatePeriodBtns(tabId, activePeriod) {
    var tab = document.getElementById(tabId);
    if (!tab) return;
    tab.querySelectorAll('.period-btn').forEach(function(b) {
      b.classList.toggle('active', b.getAttribute('data-period') === activePeriod);
    });
  }

  // ── Boot ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadData);
  } else {
    loadData();
  }

})();
