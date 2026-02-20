/* ===============================================
   AMC Debt Navigator - Exchange/Conversion Model
   Calculates conversion values and payoff diagrams
   =============================================== */

(function() {
  'use strict';

  // ── Chart.js dark theme defaults ──
  Chart.defaults.color = '#8899b4';
  Chart.defaults.borderColor = '#2a3654';

  // ── Instrument data from cap-table.json ──
  var instruments = {
    doc7: {
      name: 'DOC 7 - 6/8% PIK Toggle Exchangeable Notes',
      face: 107.4,
      exchangePrice: 5.66,        // $/share
      exchangeRate: 176.6379,     // shares per $1K principal
      premiumSchedule: [
        { yearsFrom: 0, yearsTo: 3, premium: 18.0 },
        { yearsFrom: 3, yearsTo: 4, premium: 12.0 },
        { yearsFrom: 4, yearsTo: 5, premium: 6.0 },
        { yearsFrom: 5, yearsTo: 999, premium: 0 }
      ],
      coupon: '6% Cash / 8% PIK',
      maturity: '2030-04-01',
      color: '#ca8a04'
    },
    doc5: {
      name: 'DOC 5 - Muvico 8% PIK Exchangeable Notes',
      face: 154.5,
      exchangePrice: 6.50,        // estimated
      exchangeRate: 153.8462,     // 1000/6.50
      premiumSchedule: [
        { yearsFrom: 0, yearsTo: 2, premium: 15.0 },
        { yearsFrom: 2, yearsTo: 3, premium: 10.0 },
        { yearsFrom: 3, yearsTo: 4, premium: 5.0 },
        { yearsFrom: 4, yearsTo: 999, premium: 0 }
      ],
      coupon: '2% Cash + 6% PIK',
      maturity: '2030-04-01',
      color: '#ea580c'
    }
  };

  var selectedDoc = 'doc7';
  var chart = null;

  // ── Formatting helpers ──
  function fmt(n) { return '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function fmtM(n) { return '$' + n.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'M'; }
  function fmtK(n) { return '$' + n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'K'; }
  function fmtShares(n) { return n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function fmtPct(n) { return n.toFixed(1) + '%'; }

  // ── Get current premium based on years since issuance ──
  function getPremium(inst, yearsSince) {
    for (var i = 0; i < inst.premiumSchedule.length; i++) {
      var p = inst.premiumSchedule[i];
      if (yearsSince >= p.yearsFrom && yearsSince < p.yearsTo) {
        return p.premium;
      }
    }
    return 0;
  }

  // ── Calculate conversion values ──
  function calcConversion(inst, stockPrice, holdingK, yearsSince) {
    var premium = getPremium(inst, yearsSince);

    // Adjusted exchange price = base price / (1 + premium%)
    // More shares when premium is positive (early redemption penalty means issuer gives more shares)
    var adjExchangePrice = inst.exchangePrice / (1 + premium / 100);
    var adjSharesPerK = 1000 / adjExchangePrice;

    // Base shares (no premium adjustment)
    var baseShares = inst.exchangeRate * holdingK;
    // Total shares with adjustment
    var totalShares = adjSharesPerK * holdingK;
    // Adjustment shares
    var adjustmentShares = totalShares - baseShares;

    // Conversion value at current stock price
    var conversionValue = totalShares * stockPrice;
    // Par value
    var parValue = holdingK * 1000;

    // Parity price: stock price where conversion value = par
    var parityPrice = parValue / totalShares;

    // Breakeven: stock price where conversion value = par (same as parity for plain exchange)
    var breakevenPrice = parityPrice;

    // Premium/discount to par
    var premiumToParPct = ((conversionValue / parValue) - 1) * 100;

    return {
      premium: premium,
      adjExchangePrice: adjExchangePrice,
      adjSharesPerK: adjSharesPerK,
      baseShares: baseShares,
      adjustmentShares: adjustmentShares,
      totalShares: totalShares,
      conversionValue: conversionValue,
      parValue: parValue,
      parityPrice: parityPrice,
      breakevenPrice: breakevenPrice,
      premiumToParPct: premiumToParPct
    };
  }

  // ── Build payoff diagram ──
  function buildChart(inst, holdingK, yearsSince) {
    var ctx = document.getElementById('payoff-chart').getContext('2d');
    if (chart) chart.destroy();

    var premium = getPremium(inst, yearsSince);
    var adjExchangePrice = inst.exchangePrice / (1 + premium / 100);
    var adjSharesPerK = 1000 / adjExchangePrice;
    var totalSharesPerK = adjSharesPerK;
    var parValue = holdingK * 1000;

    // Generate stock price range
    var prices = [];
    var noteValues = [];
    var equityValues = [];
    var parLine = [];

    var maxPrice = Math.max(inst.exchangePrice * 3, 15);

    for (var p = 0; p <= maxPrice; p += 0.25) {
      prices.push(p);
      var eqVal = totalSharesPerK * holdingK * p;
      var noteVal = Math.max(parValue, eqVal); // Note floor = par, upside = equity
      noteValues.push(noteVal / 1000); // display in $K
      equityValues.push(eqVal / 1000);
      parLine.push(parValue / 1000);
    }

    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: prices,
        datasets: [
          {
            label: 'Note Value (Floor + Upside)',
            data: noteValues,
            borderColor: inst.color,
            backgroundColor: inst.color + '22',
            borderWidth: 2.5,
            pointRadius: 0,
            fill: true,
            tension: 0
          },
          {
            label: 'Equity Conversion Value',
            data: equityValues,
            borderColor: '#3b82f6',
            backgroundColor: 'transparent',
            borderWidth: 1.5,
            borderDash: [4, 4],
            pointRadius: 0,
            fill: false,
            tension: 0
          },
          {
            label: 'Par Value (Floor)',
            data: parLine,
            borderColor: '#6b7280',
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderDash: [8, 4],
            pointRadius: 0,
            fill: false,
            tension: 0
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
            labels: { padding: 16, usePointStyle: true, pointStyle: 'line', font: { size: 10, family: "'SF Mono', monospace" } }
          },
          tooltip: {
            callbacks: {
              title: function(items) { return 'Stock Price: $' + parseFloat(items[0].label).toFixed(2); },
              label: function(ctx) {
                return ctx.dataset.label + ': ' + fmtK(ctx.parsed.y);
              }
            }
          }
        },
        scales: {
          x: {
            type: 'linear',
            grid: { color: 'rgba(42,54,84,0.5)' },
            ticks: { callback: function(v) { return '$' + v; }, font: { size: 10 }, maxTicksLimit: 15 },
            title: { display: true, text: 'Stock Price ($)', font: { size: 10 } }
          },
          y: {
            grid: { color: 'rgba(42,54,84,0.5)' },
            ticks: { callback: function(v) { return '$' + v + 'K'; }, font: { size: 10 } },
            title: { display: true, text: 'Total Value ($K)', font: { size: 10 } }
          }
        }
      }
    });
  }

  // ── Build results table ──
  function buildResults(inst, calc, stockPrice) {
    var tbody = document.getElementById('results-body');
    var inMoney = calc.conversionValue > calc.parValue;

    var rows = [
      ['Document', inst.name, ''],
      ['Coupon', inst.coupon, ''],
      ['Maturity', inst.maturity, ''],
      ['Base Exchange Price', fmt(inst.exchangePrice), 'per share'],
      ['Base Exchange Rate', fmtShares(inst.exchangeRate), 'shares / $1K'],
      ['Current Premium', fmtPct(calc.premium), calc.premium > 0 ? 'early exchange premium' : 'no premium'],
      ['Adj. Exchange Price', fmt(calc.adjExchangePrice), 'per share (after premium adj.)'],
      ['Adj. Shares / $1K', fmtShares(calc.adjSharesPerK), 'shares per $1K principal'],
      ['---', '', ''],
      ['Base Shares', fmtShares(calc.baseShares), 'shares'],
      ['Adjustment Shares', (calc.adjustmentShares >= 0 ? '+' : '') + fmtShares(calc.adjustmentShares), 'from premium'],
      ['Total Shares', fmtShares(calc.totalShares), 'shares'],
      ['---', '', ''],
      ['Current Stock Price', fmt(stockPrice), ''],
      ['Conversion Value', fmt(calc.conversionValue), inMoney ? 'IN THE MONEY' : 'OUT OF THE MONEY'],
      ['Par Value', fmt(calc.parValue), 'face value of holding'],
      ['Parity Price', fmt(calc.parityPrice), 'breakeven stock price'],
      ['Premium/Discount to Par', (calc.premiumToParPct >= 0 ? '+' : '') + fmtPct(calc.premiumToParPct), calc.premiumToParPct >= 0 ? 'premium' : 'discount']
    ];

    var html = '';
    for (var i = 0; i < rows.length; i++) {
      var r = rows[i];
      if (r[0] === '---') {
        html += '<tr><td colspan="3" style="border-bottom:2px solid var(--border); padding:0;"></td></tr>';
        continue;
      }
      var valueColor = '#e2e8f0';
      if (r[0] === 'Conversion Value') valueColor = inMoney ? '#22c55e' : '#ef4444';
      if (r[0] === 'Premium/Discount to Par') valueColor = calc.premiumToParPct >= 0 ? '#22c55e' : '#ef4444';
      if (r[0] === 'Current Premium') valueColor = calc.premium > 0 ? '#eab308' : '#22c55e';

      html += '<tr>'
        + '<td style="color:var(--text-muted); font-weight:600;">' + r[0] + '</td>'
        + '<td class="right" style="font-weight:700; color:' + valueColor + ';">' + r[1] + '</td>'
        + '<td style="color:var(--text-dim); font-size:10px;">' + r[2] + '</td>'
        + '</tr>';
    }
    tbody.innerHTML = html;
  }

  // ── Build premium schedule table ──
  function buildPremiumTable(inst) {
    var tbody = document.getElementById('premium-body');
    var html = '';
    for (var i = 0; i < inst.premiumSchedule.length; i++) {
      var p = inst.premiumSchedule[i];
      var periodLabel = p.yearsTo >= 999 ? 'Year ' + p.yearsFrom + '+' : 'Year ' + p.yearsFrom + ' - ' + p.yearsTo;
      var adjPrice = inst.exchangePrice / (1 + p.premium / 100);
      var adjShares = 1000 / adjPrice;
      html += '<tr>'
        + '<td>' + periodLabel + '</td>'
        + '<td class="right" style="color:' + (p.premium > 0 ? '#eab308' : '#22c55e') + ';">' + fmtPct(p.premium) + '</td>'
        + '<td class="right">' + fmt(adjPrice) + '</td>'
        + '<td class="right">' + fmtShares(adjShares) + '</td>'
        + '</tr>';
    }
    tbody.innerHTML = html;
  }

  // ── Update key metrics ──
  function updateMetrics(inst, calc, stockPrice) {
    var inMoney = calc.conversionValue > calc.parValue;
    document.getElementById('key-metrics').innerHTML = ''
      + '<div class="model-metric"><div class="label">Conversion Value</div><div class="value" style="color:' + (inMoney ? '#22c55e' : '#ef4444') + ';">' + fmt(calc.conversionValue) + '</div></div>'
      + '<div class="model-metric"><div class="label">Par Value</div><div class="value" style="color:#e2e8f0;">' + fmt(calc.parValue) + '</div></div>'
      + '<div class="model-metric"><div class="label">Parity Price</div><div class="value" style="color:#3b82f6;">' + fmt(calc.parityPrice) + '</div></div>'
      + '<div class="model-metric"><div class="label">Premium/Discount</div><div class="value" style="color:' + (calc.premiumToParPct >= 0 ? '#22c55e' : '#ef4444') + ';">' + (calc.premiumToParPct >= 0 ? '+' : '') + fmtPct(calc.premiumToParPct) + '</div></div>';
  }

  // ── Main update function ──
  function update() {
    var inst = instruments[selectedDoc];
    var stockPrice = parseFloat(document.getElementById('stock-price').value) || 4.00;
    var holdingK = parseFloat(document.getElementById('holding-amount').value) || 1000;
    var yearsSince = parseFloat(document.getElementById('years-since').value) || 1;

    document.getElementById('years-val').textContent = yearsSince.toFixed(1) + ' years';

    var calc = calcConversion(inst, stockPrice, holdingK, yearsSince);

    updateMetrics(inst, calc, stockPrice);
    buildChart(inst, holdingK, yearsSince);
    buildResults(inst, calc, stockPrice);
    buildPremiumTable(inst);
  }

  // ── Document selector toggle ──
  window.setDoc = function(doc) {
    selectedDoc = doc;
    var btns = document.querySelectorAll('.toggle-btn[data-doc]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle('active', btns[i].getAttribute('data-doc') === doc);
    }
    // Update hint text
    var inst = instruments[doc];
    var hint = document.querySelector('.input-hint');
    if (hint) {
      if (doc === 'doc7') {
        hint.textContent = 'DOC 7: $5.66/share, 176.6379 shares/$1K. Premium declines: 18%/12%/6%/0% over time.';
      } else {
        hint.textContent = 'DOC 5: ~$6.50/share est., 153.85 shares/$1K. Premium declines: 15%/10%/5%/0% over time.';
      }
    }
    update();
  };

  // ── Event listeners ──
  document.getElementById('stock-price').addEventListener('input', update);
  document.getElementById('holding-amount').addEventListener('input', update);
  document.getElementById('years-since').addEventListener('input', update);

  // ── URL parameter presets ──
  (function() {
    var params = new URLSearchParams(window.location.search);
    var stockPriceParam = params.get('stockPrice');
    var scenarioParam = params.get('scenario');
    var targetPrice = null;
    if (scenarioParam === 'base')  targetPrice = 3;
    else if (scenarioParam === 'bull') targetPrice = 8;
    else if (scenarioParam === 'bear') targetPrice = 1;
    if (stockPriceParam !== null && !isNaN(parseFloat(stockPriceParam))) targetPrice = parseFloat(stockPriceParam);
    if (targetPrice !== null) {
      document.getElementById('stock-price').value = targetPrice;
      update();
    }
  })();

  // ── Initial render ──
  update();

})();
