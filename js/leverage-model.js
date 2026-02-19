/* ===============================================
   AMC Debt Navigator - Leverage Scenario Analyzer
   Models EBITDA scenarios and entity-level ratios
   =============================================== */

(function() {
  'use strict';

  // ── Chart.js dark theme defaults ──
  Chart.defaults.color = '#8899b4';
  Chart.defaults.borderColor = '#2a3654';

  // ── Debt data from cap-table.json ──
  // Muvico entity debt: Term Loan (1999.1) + Muvico 8% PIK (154.5) + Muvico 15% PIK (857.0) + 6/8% Toggle (107.4) = 3118.0
  // Note: AMC 7.5% Notes (360.0) and 6/8% Toggle are 2L at Muvico but sit at AMC level for lien purposes
  // Odeon: 400.0
  // AMC-level (non-subsidiary): AMC 7.5% (360.0) + AMC 6.125% Sub (125.5)
  // Total consolidated: 4003.5

  var MUVICO_DEBT = 3118.0;  // face at Muvico entity
  var ODEON_DEBT = 400.0;
  var AMC_TOTAL_DEBT = 4003.5;

  // ── Reset to LTM Actuals ──
  window.resetToLTM = function() {
    var slider = document.getElementById('ebitda-slider');
    slider.value = 371.1;
    update();
  };

  // Cash interest components (base rates)
  // Term Loan: SOFR+700 on $1999.1M
  // Muvico 8% PIK: 2% cash on $154.5M = $3.1M
  // Muvico 15% PIK: base 7.5% + grid-based increment on $857M (cash portion)
  // 6/8% Toggle: 6% cash on $107.4M = $6.4M
  // AMC 7.5%: 7.5% on $360M = $27.0M
  // Odeon 12.75%: 12.75% on $400M = $51.0M
  // AMC 6.125% Sub: 6.125% on $125.5M = $7.7M

  var chart = null;

  // ── Formatting helpers ──
  function fmt(n) { return '$' + n.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'M'; }
  function fmtX(n) { return n.toFixed(2) + 'x'; }
  function fmtPct(n) { return n.toFixed(2) + '%'; }

  // ── Calculate DOC 2 interest rate based on Muvico leverage ──
  function getDoc2Rates(muvicoLeverage) {
    if (muvicoLeverage >= 7.50) {
      return { cashRate: 7.5 + 1.5, pikRate: 6.0, label: 'Level 1 (>= 7.5x)', levelColor: '#ef4444' };
    } else if (muvicoLeverage >= 6.50) {
      return { cashRate: 7.5 + 2.375, pikRate: 2.375, label: 'Level 2 (6.5-7.5x)', levelColor: '#eab308' };
    } else {
      return { cashRate: 7.5 + 4.0, pikRate: 0, label: 'Level 3 (< 6.5x)', levelColor: '#22c55e' };
    }
  }

  // ── Calculate cash interest by entity ──
  function calcCashInterest(sofr, muvicoLeverage) {
    var doc2 = getDoc2Rates(muvicoLeverage);

    // Muvico-level cash interest
    var termLoanRate = (sofr + 7.0) / 100;
    var termLoanInterest = 1999.1 * termLoanRate;
    var doc5CashInterest = 154.5 * 0.02;
    var doc2CashInterest = 857.0 * (doc2.cashRate / 100);
    var doc7CashInterest = 107.4 * 0.06;
    var muvicoCashInterest = termLoanInterest + doc5CashInterest + doc2CashInterest + doc7CashInterest;

    // Odeon cash interest
    var odeonCashInterest = 400.0 * 0.1275;

    // AMC-only cash interest
    var amc750Interest = 360.0 * 0.075;
    var amcSubInterest = 125.5 * 0.06125;
    var amcOnlyCashInterest = amc750Interest + amcSubInterest;

    // Total consolidated
    var totalCashInterest = muvicoCashInterest + odeonCashInterest + amcOnlyCashInterest;

    return {
      muvico: muvicoCashInterest,
      odeon: odeonCashInterest,
      amcOnly: amcOnlyCashInterest,
      total: totalCashInterest,
      doc2Rates: doc2
    };
  }

  // ── Build chart ──
  function buildChart(muvicoLev, odeonLev, consolLev) {
    var ctx = document.getElementById('leverage-chart').getContext('2d');
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Muvico, LLC', 'Odeon Finco PLC', 'AMC Consolidated'],
        datasets: [{
          label: 'Leverage Ratio',
          data: [muvicoLev, odeonLev, consolLev],
          backgroundColor: [
            muvicoLev >= 7.5 ? '#ef4444' : muvicoLev >= 6.5 ? '#eab308' : '#22c55e',
            odeonLev >= 7.5 ? '#ef4444' : odeonLev >= 6.5 ? '#eab308' : '#22c55e',
            consolLev >= 7.5 ? '#ef4444' : consolLev >= 6.5 ? '#eab308' : '#22c55e'
          ],
          borderWidth: 0,
          borderRadius: 4,
          barPercentage: 0.6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(ctx) { return 'Leverage: ' + fmtX(ctx.parsed.y); }
            }
          },
          annotation: undefined
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { size: 11, family: "'SF Mono', monospace" } }
          },
          y: {
            grid: { color: 'rgba(42,54,84,0.5)' },
            ticks: { callback: function(v) { return v + 'x'; }, font: { size: 10 } },
            title: { display: true, text: 'Leverage (Debt / EBITDA)', font: { size: 10 } },
            suggestedMax: Math.max(muvicoLev, odeonLev, consolLev) * 1.15
          }
        }
      },
      plugins: [{
        id: 'thresholdLines',
        afterDraw: function(chart) {
          var yScale = chart.scales.y;
          var ctx = chart.ctx;

          // 7.5x line
          var y75 = yScale.getPixelForValue(7.5);
          if (y75 >= yScale.top && y75 <= yScale.bottom) {
            ctx.save();
            ctx.beginPath();
            ctx.setLineDash([6, 4]);
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 1.5;
            ctx.moveTo(chart.chartArea.left, y75);
            ctx.lineTo(chart.chartArea.right, y75);
            ctx.stroke();
            ctx.fillStyle = '#ef4444';
            ctx.font = '9px monospace';
            ctx.textAlign = 'right';
            ctx.fillText('7.5x DOC 2 Grid L1', chart.chartArea.right, y75 - 4);
            ctx.restore();
          }

          // 6.5x line
          var y65 = yScale.getPixelForValue(6.5);
          if (y65 >= yScale.top && y65 <= yScale.bottom) {
            ctx.save();
            ctx.beginPath();
            ctx.setLineDash([6, 4]);
            ctx.strokeStyle = '#eab308';
            ctx.lineWidth = 1.5;
            ctx.moveTo(chart.chartArea.left, y65);
            ctx.lineTo(chart.chartArea.right, y65);
            ctx.stroke();
            ctx.fillStyle = '#eab308';
            ctx.font = '9px monospace';
            ctx.textAlign = 'right';
            ctx.fillText('6.5x DOC 2 Grid L2', chart.chartArea.right, y65 - 4);
            ctx.restore();
          }

          // FY2024 Actual EBITDA leverage line
          var yFY24 = yScale.getPixelForValue(Math.min(12.81, chart.options.scales.y.suggestedMax || 35));
          if (yFY24 >= yScale.top && yFY24 <= yScale.bottom) {
            ctx.save();
            ctx.beginPath();
            ctx.setLineDash([3, 3]);
            ctx.strokeStyle = '#eab308';
            ctx.lineWidth = 1;
            ctx.moveTo(chart.chartArea.left, yFY24);
            ctx.lineTo(chart.chartArea.right, yFY24);
            ctx.stroke();
            ctx.fillStyle = '#eab308';
            ctx.font = '9px monospace';
            ctx.textAlign = 'right';
            ctx.fillText('FY2024 EBITDA Impl. Lev: 12.81x', chart.chartArea.right, yFY24 - 4);
            ctx.restore();
          }
          // LTM Actual EBITDA leverage line
          var yLTM = yScale.getPixelForValue(Math.min(10.79, chart.options.scales.y.suggestedMax || 35));
          if (yLTM >= yScale.top && yLTM <= yScale.bottom) {
            ctx.save();
            ctx.beginPath();
            ctx.setLineDash([3, 3]);
            ctx.strokeStyle = '#22c55e';
            ctx.lineWidth = 1;
            ctx.moveTo(chart.chartArea.left, yLTM);
            ctx.lineTo(chart.chartArea.right, yLTM);
            ctx.stroke();
            ctx.fillStyle = '#22c55e';
            ctx.font = '9px monospace';
            ctx.textAlign = 'right';
            ctx.fillText('LTM EBITDA Impl. Lev: 10.79x', chart.chartArea.right, yLTM - 4);
            ctx.restore();
          }
        }
      }]
    });
  }

  // ── Update DOC 2 rate detail box ──
  function updateDoc2Detail(muvicoLev, cashInterestData) {
    var doc2 = cashInterestData.doc2Rates;
    var el = document.getElementById('doc2-rate-detail');
    el.innerHTML = ''
      + '<div style="display:flex; gap:24px; flex-wrap:wrap;">'
      + '  <div>'
      + '    <span style="color:var(--text-muted);">Muvico Leverage:</span> '
      + '    <span style="color:' + doc2.levelColor + '; font-weight:700;">' + fmtX(muvicoLev) + '</span>'
      + '  </div>'
      + '  <div>'
      + '    <span style="color:var(--text-muted);">Grid Level:</span> '
      + '    <span style="color:' + doc2.levelColor + '; font-weight:700;">' + doc2.label + '</span>'
      + '  </div>'
      + '  <div>'
      + '    <span style="color:var(--text-muted);">Cash Rate:</span> '
      + '    <span style="font-weight:700;">' + fmtPct(doc2.cashRate) + '</span>'
      + '    <span style="color:var(--text-dim);"> (7.5% base + ' + fmtPct(doc2.cashRate - 7.5) + ')</span>'
      + '  </div>'
      + '  <div>'
      + '    <span style="color:var(--text-muted);">PIK Rate:</span> '
      + '    <span style="font-weight:700; color:' + (doc2.pikRate > 0 ? '#ef4444' : '#22c55e') + ';">' + fmtPct(doc2.pikRate) + '</span>'
      + '  </div>'
      + '  <div>'
      + '    <span style="color:var(--text-muted);">DOC 2 Cash Interest:</span> '
      + '    <span style="font-weight:700;">' + fmt(857.0 * doc2.cashRate / 100) + '</span>'
      + '  </div>'
      + '</div>';
  }

  // ── Main update function ──
  function update() {
    var ebitda = parseFloat(document.getElementById('ebitda-slider').value) || 321;
    var sofr = parseFloat(document.getElementById('sofr-input').value) || 3.64;
    var muvicoPct = parseFloat(document.getElementById('muvico-pct').value) || 50;
    var odeonEBITDA = parseFloat(document.getElementById('odeon-ebitda').value) || 15;

    document.getElementById('ebitda-val').textContent = '$' + ebitda + 'M';
    document.getElementById('muvico-pct-val').textContent = muvicoPct + '%';

    var muvicoEBITDA = ebitda * (muvicoPct / 100);
    var amcResidualEBITDA = ebitda - muvicoEBITDA - odeonEBITDA;
    if (amcResidualEBITDA < 0) amcResidualEBITDA = 0;

    var muvicoLev = muvicoEBITDA > 0 ? MUVICO_DEBT / muvicoEBITDA : 999;
    var odeonLev = odeonEBITDA > 0 ? ODEON_DEBT / odeonEBITDA : 999;
    var consolLev = ebitda > 0 ? AMC_TOTAL_DEBT / ebitda : 999;

    var cashInterest = calcCashInterest(sofr, muvicoLev);

    var muvicoCov = muvicoEBITDA > 0 ? muvicoEBITDA / cashInterest.muvico : 0;
    var odeonCov = odeonEBITDA > 0 ? odeonEBITDA / cashInterest.odeon : 0;
    var consolCov = ebitda > 0 ? ebitda / cashInterest.total : 0;

    // Key metrics
    document.getElementById('key-metrics').innerHTML = ''
      + '<div class="model-metric"><div class="label">Consolidated Leverage</div><div class="value" style="color:' + (consolLev >= 7.5 ? '#ef4444' : consolLev >= 6.5 ? '#eab308' : '#22c55e') + ';">' + fmtX(consolLev) + '</div></div>'
      + '<div class="model-metric"><div class="label">Muvico Leverage</div><div class="value" style="color:' + (muvicoLev >= 7.5 ? '#ef4444' : muvicoLev >= 6.5 ? '#eab308' : '#22c55e') + ';">' + fmtX(muvicoLev) + '</div></div>'
      + '<div class="model-metric"><div class="label">Total Cash Interest</div><div class="value" style="color:#eab308;">' + fmt(cashInterest.total) + '</div></div>'
      + '<div class="model-metric"><div class="label">Coverage Ratio</div><div class="value" style="color:' + (consolCov >= 1 ? '#22c55e' : '#ef4444') + ';">' + fmtX(consolCov) + '</div></div>';

    // Chart
    buildChart(
      Math.min(muvicoLev, 35),
      Math.min(odeonLev, 35),
      Math.min(consolLev, 35)
    );

    // DOC 2 rate detail
    updateDoc2Detail(muvicoLev, cashInterest);

    // Results table
    var tbody = document.getElementById('results-body');
    var rows = [
      { name: 'Muvico, LLC', ebitda: muvicoEBITDA, debt: MUVICO_DEBT, lev: muvicoLev, cashInt: cashInterest.muvico, cov: muvicoCov },
      { name: 'Odeon Finco PLC', ebitda: odeonEBITDA, debt: ODEON_DEBT, lev: odeonLev, cashInt: cashInterest.odeon, cov: odeonCov },
      { name: 'AMC Consolidated', ebitda: ebitda, debt: AMC_TOTAL_DEBT, lev: consolLev, cashInt: cashInterest.total, cov: consolCov }
    ];

    var html = '';
    for (var i = 0; i < rows.length; i++) {
      var r = rows[i];
      var levColor = r.lev >= 7.5 ? '#ef4444' : r.lev >= 6.5 ? '#eab308' : '#22c55e';
      var covColor = r.cov >= 1 ? '#22c55e' : '#ef4444';
      html += '<tr>'
        + '<td style="font-weight:600;">' + r.name + '</td>'
        + '<td class="right">' + fmt(r.ebitda) + '</td>'
        + '<td class="right">' + fmt(r.debt) + '</td>'
        + '<td class="right" style="font-weight:700; color:' + levColor + ';">' + fmtX(r.lev > 99 ? 999 : r.lev) + '</td>'
        + '<td class="right" style="color:#eab308;">' + fmt(r.cashInt) + '</td>'
        + '<td class="right" style="font-weight:700; color:' + covColor + ';">' + fmtX(r.cov) + '</td>'
        + '</tr>';
    }

    // AMC Residual row
    html += '<tr style="border-top:2px solid var(--border);">'
      + '<td style="font-weight:600; color:var(--text-muted);">AMC Residual (ex-sub)</td>'
      + '<td class="right" style="color:var(--text-muted);">' + fmt(amcResidualEBITDA) + '</td>'
      + '<td class="right" style="color:var(--text-dim);">-</td>'
      + '<td class="right" style="color:var(--text-dim);">-</td>'
      + '<td class="right" style="color:var(--text-dim);">-</td>'
      + '<td class="right" style="color:var(--text-dim);">-</td>'
      + '</tr>';

    tbody.innerHTML = html;
  }

  // ── Event listeners ──
  document.getElementById('ebitda-slider').addEventListener('input', update);
  document.getElementById('sofr-input').addEventListener('input', update);
  document.getElementById('muvico-pct').addEventListener('input', update);
  document.getElementById('odeon-ebitda').addEventListener('input', update);

  // ── Initial render ──
  update();

})();
