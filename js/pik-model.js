/* ===============================================
   AMC Debt Navigator - PIK Interest Accrual Model
   Projects principal balance growth from PIK
   =============================================== */

(function() {
  'use strict';

  // ── Chart.js dark theme defaults ──
  Chart.defaults.color = '#8899b4';
  Chart.defaults.borderColor = '#2a3654';

  // ── Instrument data from cap-table.json ──
  var DOC2 = {
    name: 'DOC 2 - Muvico 15% PIK',
    face: 857.0,
    baseRate: 7.5,
    leverageGrid: [
      { minLeverage: 7.50, cashIncrement: 1.5,   pikIncrement: 6.0 },
      { minLeverage: 6.50, maxLeverage: 7.50, cashIncrement: 2.375, pikIncrement: 2.375 },
      { minLeverage: 0,    maxLeverage: 6.50, cashIncrement: 4.0,   pikIncrement: 0 }
    ],
    color: '#d97706'
  };

  var DOC5 = {
    name: 'DOC 5 - Muvico 8% PIK Exch.',
    face: 154.5,
    cashRate: 2.0,
    pikRate: 6.0,
    color: '#ea580c'
  };

  var DOC7 = {
    name: 'DOC 7 - 6/8% PIK Toggle',
    face: 107.4,
    cashRate: 6.0,
    pikRate: 8.0,
    color: '#ca8a04'
  };

  var doc7Mode = 'pik'; // 'cash' or 'pik'
  var chart = null;

  // ── Formatting helpers ──
  function fmt(n) { return '$' + n.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'M'; }
  function fmtPct(n) { return n.toFixed(2) + '%'; }
  function fmtDollar(n) { return '$' + n.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }

  // ── Get DOC 2 rates based on leverage ──
  function getDoc2Rates(leverage) {
    if (leverage >= 7.50) {
      return { cash: DOC2.baseRate + 1.5, pik: 6.0 };
    } else if (leverage >= 6.50) {
      return { cash: DOC2.baseRate + 2.375, pik: 2.375 };
    } else {
      return { cash: DOC2.baseRate + 4.0, pik: 0 };
    }
  }

  // ── Project PIK accrual for one instrument ──
  function projectInstrument(startPrincipal, cashRatePct, pikRatePct, years) {
    var rows = [];
    var principal = startPrincipal;
    var totalPIK = 0;
    var totalCash = 0;

    for (var y = 1; y <= years; y++) {
      var pikAccrual = principal * (pikRatePct / 100);
      var cashInterest = principal * (cashRatePct / 100);
      var endPrincipal = principal + pikAccrual;

      rows.push({
        year: y,
        startPrincipal: principal,
        pikAccrual: pikAccrual,
        endPrincipal: endPrincipal,
        cashInterest: cashInterest
      });

      totalPIK += pikAccrual;
      totalCash += cashInterest;
      principal = endPrincipal;
    }

    return { rows: rows, totalPIK: totalPIK, totalCash: totalCash, finalPrincipal: principal };
  }

  // ── Build line chart ──
  function buildChart(doc2Data, doc5Data, doc7Data, years) {
    var ctx = document.getElementById('pik-chart').getContext('2d');
    if (chart) chart.destroy();

    // Build labels: Year 0, 1, 2, ...
    var labels = ['Today'];
    for (var y = 1; y <= years; y++) labels.push('Year ' + y);

    // Build data arrays (include starting value)
    var doc2Vals = [DOC2.face];
    var doc5Vals = [DOC5.face];
    var doc7Vals = [DOC7.face];
    for (var i = 0; i < doc2Data.rows.length; i++) doc2Vals.push(doc2Data.rows[i].endPrincipal);
    for (var j = 0; j < doc5Data.rows.length; j++) doc5Vals.push(doc5Data.rows[j].endPrincipal);
    for (var k = 0; k < doc7Data.rows.length; k++) doc7Vals.push(doc7Data.rows[k].endPrincipal);

    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'DOC 2 ($857M)',
            data: doc2Vals,
            borderColor: DOC2.color,
            backgroundColor: DOC2.color + '33',
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: DOC2.color,
            fill: false,
            tension: 0.1
          },
          {
            label: 'DOC 5 ($154.5M)',
            data: doc5Vals,
            borderColor: DOC5.color,
            backgroundColor: DOC5.color + '33',
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: DOC5.color,
            fill: false,
            tension: 0.1
          },
          {
            label: 'DOC 7 ($107.4M)',
            data: doc7Vals,
            borderColor: DOC7.color,
            backgroundColor: DOC7.color + '33',
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: DOC7.color,
            fill: false,
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: 'index' },
        plugins: {
          legend: {
            position: 'top',
            labels: { padding: 16, usePointStyle: true, pointStyle: 'circle', font: { size: 10, family: "'SF Mono', monospace" } }
          },
          tooltip: {
            callbacks: {
              label: function(ctx) {
                return ctx.dataset.label.split(' (')[0] + ': ' + fmtDollar(ctx.parsed.y) + 'M';
              }
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(42,54,84,0.5)' },
            ticks: { font: { size: 10 } }
          },
          y: {
            grid: { color: 'rgba(42,54,84,0.5)' },
            ticks: { callback: function(v) { return '$' + v + 'M'; }, font: { size: 10 } },
            title: { display: true, text: 'Principal ($M)', font: { size: 10 } }
          }
        }
      }
    });
  }

  // ── Build table for one instrument ──
  function buildTableBody(tbodyId, data) {
    var tbody = document.getElementById(tbodyId);
    var html = '';
    for (var i = 0; i < data.rows.length; i++) {
      var r = data.rows[i];
      html += '<tr>'
        + '<td>Year ' + r.year + '</td>'
        + '<td class="right">' + fmt(r.startPrincipal) + '</td>'
        + '<td class="right" style="color:' + (r.pikAccrual > 0 ? '#ef4444' : '#22c55e') + ';">' + (r.pikAccrual > 0 ? '+' : '') + fmt(r.pikAccrual) + '</td>'
        + '<td class="right" style="font-weight:700;">' + fmt(r.endPrincipal) + '</td>'
        + '<td class="right" style="color:#eab308;">' + fmt(r.cashInterest) + '</td>'
        + '</tr>';
    }
    // Summary row
    html += '<tr style="border-top:2px solid var(--border);">'
      + '<td style="font-weight:700;">Total</td>'
      + '<td class="right">-</td>'
      + '<td class="right" style="color:#ef4444; font-weight:700;">+' + fmt(data.totalPIK) + '</td>'
      + '<td class="right" style="font-weight:700;">' + fmt(data.finalPrincipal) + '</td>'
      + '<td class="right" style="color:#eab308; font-weight:700;">' + fmt(data.totalCash) + '</td>'
      + '</tr>';
    tbody.innerHTML = html;
  }

  // ── Update key metrics ──
  function updateMetrics(doc2Data, doc5Data, doc7Data) {
    var totalPIK = doc2Data.totalPIK + doc5Data.totalPIK + doc7Data.totalPIK;
    var totalEndPrincipal = doc2Data.finalPrincipal + doc5Data.finalPrincipal + doc7Data.finalPrincipal;
    var totalCash = doc2Data.totalCash + doc5Data.totalCash + doc7Data.totalCash;
    var startTotal = DOC2.face + DOC5.face + DOC7.face;

    document.getElementById('key-metrics').innerHTML = ''
      + '<div class="model-metric"><div class="label">Starting PIK Principal</div><div class="value" style="color:#e2e8f0;">' + fmt(startTotal) + '</div></div>'
      + '<div class="model-metric"><div class="label">Total PIK Accretion</div><div class="value" style="color:#ef4444;">+' + fmt(totalPIK) + '</div></div>'
      + '<div class="model-metric"><div class="label">Ending Principal</div><div class="value" style="color:#d97706;">' + fmt(totalEndPrincipal) + '</div></div>'
      + '<div class="model-metric"><div class="label">Total Cash Interest</div><div class="value" style="color:#eab308;">' + fmt(totalCash) + '</div></div>';
  }

  // ── Main update function ──
  function update() {
    var years = parseInt(document.getElementById('years-slider').value) || 3;
    var leverage = parseFloat(document.getElementById('leverage-input').value) || 12.47;

    document.getElementById('years-val').textContent = years + ' year' + (years > 1 ? 's' : '');

    // DOC 2 rates
    var doc2Rates = getDoc2Rates(leverage);
    var doc2Data = projectInstrument(DOC2.face, doc2Rates.cash, doc2Rates.pik, years);

    // DOC 5: always 2% cash + 6% PIK
    var doc5Data = projectInstrument(DOC5.face, DOC5.cashRate, DOC5.pikRate, years);

    // DOC 7: 6% cash / 0% PIK or 0% cash / 8% PIK
    var doc7CashRate = doc7Mode === 'cash' ? DOC7.cashRate : 0;
    var doc7PikRate = doc7Mode === 'pik' ? DOC7.pikRate : 0;
    var doc7Data = projectInstrument(DOC7.face, doc7CashRate, doc7PikRate, years);

    updateMetrics(doc2Data, doc5Data, doc7Data);
    buildChart(doc2Data, doc5Data, doc7Data, years);
    buildTableBody('doc2-body', doc2Data);
    buildTableBody('doc5-body', doc5Data);
    buildTableBody('doc7-body', doc7Data);
  }

  // ── DOC 7 mode toggle ──
  window.setDoc7Mode = function(mode) {
    doc7Mode = mode;
    var btns = document.querySelectorAll('.toggle-btn[data-mode]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle('active', btns[i].getAttribute('data-mode') === mode);
    }
    update();
  };

  // ── Event listeners ──
  document.getElementById('years-slider').addEventListener('input', update);
  document.getElementById('leverage-input').addEventListener('input', update);

  // ── Initial render ──
  update();

})();
