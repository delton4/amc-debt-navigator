/* ===============================================
   AMC Debt Navigator - DCF Valuation Model
   Interactive DCF with WACC/TGR sliders, 3-entity
   tabs, sensitivity grid, waterfall bridge
   =============================================== */

(function() {
  'use strict';

  var fmt = AMC_UTILS.fmt;
  var fmtPct = AMC_UTILS.fmtPct;
  var fmtPctDecimal = AMC_UTILS.fmtPctDecimal;
  var fmtX = AMC_UTILS.fmtX;
  var colorVal = AMC_UTILS.colorVal;

  // ── State ──
  var DATA = {};
  var currentEntity = 'consolidated';
  var currentMethod = 'exit'; // 'exit' | 'perpetuity'

  // Consolidated equity bridge defaults (from valuation.json)
  var CONSOL_DEBT = 4003.5;
  var CONSOL_CASH = 477.3;
  var CONSOL_DSO = 529.5;

  // ── Data Loading ──────────────────────────────

  function loadData() {
    return Promise.all([
      AMC_UTILS.DataLoader.fetch('ufcf.json'),
      AMC_UTILS.DataLoader.fetch('wacc.json'),
      AMC_UTILS.DataLoader.fetch('odeon-dcf.json'),
      AMC_UTILS.DataLoader.fetch('wacc-odeon.json'),
      AMC_UTILS.DataLoader.fetch('muvico-dcf.json'),
      AMC_UTILS.DataLoader.fetch('muvico-wacc.json'),
      AMC_UTILS.DataLoader.fetch('valuation.json')
    ]).then(function(results) {
      DATA.consolidated = { ufcf: results[0], wacc: results[1] };
      DATA.odeon = { ufcf: results[2], wacc: results[3] };
      DATA.muvico = { ufcf: results[4], wacc: results[5] };
      DATA.valuation = results[6];

      // Override consolidated debt/cash from valuation data
      if (DATA.valuation && DATA.valuation.amc && DATA.valuation.amc.scenario1) {
        var s1 = DATA.valuation.amc.scenario1;
        CONSOL_DEBT = Math.abs(s1['(-) Debt']) || 4003.5;
        CONSOL_CASH = s1['(+) Cash'] || 477.3;
        CONSOL_DSO = s1['DSO'] || 529.5;
      }

      return DATA;
    });
  }

  // ── Helpers ───────────────────────────────────

  function getEntityData() {
    return DATA[currentEntity] || DATA.consolidated;
  }

  function getDebt() {
    if (currentEntity === 'consolidated') return CONSOL_DEBT;
    var tv = getEntityData().ufcf.terminalValue;
    return (tv && tv.debt != null) ? tv.debt : 0;
  }

  function getCash() {
    if (currentEntity === 'consolidated') return CONSOL_CASH;
    var tv = getEntityData().ufcf.terminalValue;
    return (tv && tv.cash != null) ? tv.cash : 0;
  }

  function getDSO() {
    if (currentEntity === 'consolidated') return CONSOL_DSO;
    var w = getEntityData().wacc;
    return (w && w.inputs && w.inputs.dso) ? w.inputs.dso : CONSOL_DSO;
  }

  function getBaseWacc() {
    var w = getEntityData().wacc;
    return (w && w.inputs) ? w.inputs.wacc : 0.1949;
  }

  function getBaseTgr() {
    var pg = getEntityData().ufcf.perpetuityGrowth;
    return pg ? pg.tgr : 0.01;
  }

  function getBaseExitMultiple() {
    var tv = getEntityData().ufcf.terminalValue;
    return tv ? tv.exitMultiple : 5.91;
  }

  function getTerminalEbitda() {
    var tv = getEntityData().ufcf.terminalValue;
    if (tv && tv.ebitda != null) return tv.ebitda;
    // Consolidated uses ebitda2030
    if (tv && tv.ebitda2030 != null) return tv.ebitda2030;
    return 0;
  }

  // ── EV Recalculation ─────────────────────────

  function recalcEV() {
    var ed = getEntityData();
    var ufcfData = ed.ufcf;
    var wacc = parseFloat(document.getElementById('wacc-slider').value) / 100;
    var tgr = parseFloat(document.getElementById('tgr-slider').value) / 100;

    var ufcfArr = ufcfData.ufcf;
    var dpArr = ufcfData.discountPeriods;

    // Re-discount all projected UFCFs at user's WACC
    var pvSum = 0;
    var pvArr = [];
    for (var i = 0; i < ufcfArr.length; i++) {
      var pv = ufcfArr[i] / Math.pow(1 + wacc, dpArr[i]);
      pvArr.push(pv);
      pvSum += pv;
    }

    var lastDP = dpArr[dpArr.length - 1];
    var tv, pvTv, evResult;

    if (currentMethod === 'exit') {
      // Exit multiple method
      var exitMult = getBaseExitMultiple();
      var termEbitda = getTerminalEbitda();
      tv = termEbitda * exitMult;
      pvTv = tv / Math.pow(1 + wacc, lastDP);
      evResult = pvSum + pvTv;
    } else {
      // Perpetuity growth method
      var termUfcf = ufcfArr[ufcfArr.length - 1];
      if (wacc <= tgr) {
        // Avoid division by zero or negative
        tv = 0;
        pvTv = 0;
        evResult = pvSum;
      } else {
        tv = termUfcf / (wacc - tgr);
        pvTv = tv / Math.pow(1 + wacc, lastDP);
        evResult = pvSum + pvTv;
      }
    }

    // Equity bridge
    var debt = getDebt();
    var cash = getCash();
    var dso = getDSO();
    var equityValue = evResult - debt + cash;
    var sharePrice = equityValue / dso;

    return {
      ev: evResult,
      pvSum: pvSum,
      pvArr: pvArr,
      tv: tv,
      pvTv: pvTv,
      debt: debt,
      cash: cash,
      equityValue: equityValue,
      sharePrice: sharePrice,
      dso: dso,
      wacc: wacc,
      tgr: tgr
    };
  }

  // ── Render: Key Metrics Bar ──────────────────

  function renderKeyMetrics(calc) {
    var el = document.getElementById('key-metrics');
    var evColor = colorVal(calc.ev);
    var eqColor = colorVal(calc.equityValue);

    el.innerHTML = ''
      + '<div class="model-metric"><div class="label">Implied EV</div><div class="value" style="color:' + evColor + ';">' + fmt(calc.ev) + '</div></div>'
      + '<div class="model-metric"><div class="label">WACC</div><div class="value">' + fmtPctDecimal(calc.wacc) + '</div></div>'
      + '<div class="model-metric"><div class="label">Exit Multiple</div><div class="value">' + fmtX(getBaseExitMultiple()) + '</div></div>'
      + '<div class="model-metric"><div class="label">Equity Value</div><div class="value" style="color:' + eqColor + ';">' + fmt(calc.equityValue) + '</div></div>';
  }

  // ── Render: EV Result Box ────────────────────

  function renderEvResult(calc) {
    var el = document.getElementById('ev-result');
    var evColor = colorVal(calc.ev);
    var eqColor = colorVal(calc.equityValue);
    var spColor = colorVal(calc.sharePrice);
    var methodLabel = currentMethod === 'exit' ? 'Exit Multiple' : 'Perpetuity Growth';

    el.innerHTML = ''
      + '<h3>Implied Enterprise Value <span style="font-size:9px; font-weight:400; text-transform:none; letter-spacing:0; color:var(--text-dim);">(' + methodLabel + ')</span></h3>'
      + '<div style="display:flex; gap:32px; flex-wrap:wrap; margin-top:12px; align-items:baseline;">'
      + '  <div style="font-size:28px; font-weight:800; color:' + evColor + ';">' + fmt(calc.ev) + '</div>'
      + '</div>'
      + '<div style="margin-top:16px; font-size:12px; line-height:2;">'
      + '  <div style="display:flex; gap:24px; flex-wrap:wrap;">'
      + '    <div><span style="color:var(--text-muted);">EV:</span> <span style="font-weight:700;">' + fmt(calc.ev) + '</span></div>'
      + '    <div><span style="color:var(--text-muted);">(-) Debt:</span> <span style="font-weight:700; color:#ef4444;">' + fmt(calc.debt) + '</span></div>'
      + '    <div><span style="color:var(--text-muted);">(+) Cash:</span> <span style="font-weight:700; color:#22c55e;">' + fmt(calc.cash) + '</span></div>'
      + '    <div><span style="color:var(--text-muted);">= Equity:</span> <span style="font-weight:700; color:' + eqColor + ';">' + fmt(calc.equityValue) + '</span></div>'
      + '    <div><span style="color:var(--text-muted);">Share Price:</span> <span style="font-weight:700; color:' + spColor + ';">$' + calc.sharePrice.toFixed(2) + '</span></div>'
      + '  </div>'
      + '</div>'
      + '<div style="margin-top:8px; font-size:10px; color:var(--text-dim);">'
      + '  PV(UFCF): ' + fmt(calc.pvSum) + ' + PV(TV): ' + fmt(calc.pvTv) + ' = EV: ' + fmt(calc.ev)
      + '  &nbsp;|&nbsp; DSO: ' + AMC_UTILS.fmtShares(calc.dso) + 'M shares'
      + '</div>';
  }

  // ── Render: WACC Panel ───────────────────────

  function renderWaccPanel() {
    var ed = getEntityData();
    var w = ed.wacc;
    var el = document.getElementById('wacc-detail');

    if (!w || !w.inputs) {
      el.innerHTML = '<div style="color:var(--text-dim); font-size:11px;">WACC data not available for this entity.</div>';
      return;
    }

    var inp = w.inputs;
    var debtWeight = inp.ltDebtOutstanding / inp.totalCapitalization;
    var equityWeight = 1 - debtWeight;

    var html = '<div style="font-size:11px; line-height:2.2;">';

    // Cost of Debt section
    html += '<div style="margin-bottom:8px;">'
      + '<div style="color:var(--text-muted); font-size:9px; font-weight:700; letter-spacing:1px; text-transform:uppercase; margin-bottom:4px;">Cost of Debt</div>'
      + '<div>Pre-tax Cost of Debt: <span style="font-weight:700;">' + fmtPctDecimal(inp.pretaxCostOfDebt) + '</span></div>'
      + '<div>Tax Shield (1-t): <span style="font-weight:700;">' + (inp.oneMinusTaxRate != null ? (inp.oneMinusTaxRate * 100).toFixed(0) + '%' : 'N/A') + '</span></div>'
      + '<div>After-tax Kd: <span style="font-weight:700; color:#eab308;">' + fmtPctDecimal(inp.afterTaxCostOfDebt) + '</span></div>'
      + '</div>';

    // Cost of Equity section
    html += '<div style="margin-bottom:8px;">'
      + '<div style="color:var(--text-muted); font-size:9px; font-weight:700; letter-spacing:1px; text-transform:uppercase; margin-bottom:4px;">Cost of Equity (CAPM)</div>'
      + '<div>Risk-Free Rate: <span style="font-weight:700;">' + fmtPctDecimal(inp.riskFreeRate) + '</span></div>'
      + '<div>Beta: <span style="font-weight:700;">' + fmtX(inp.beta) + '</span></div>'
      + '<div>Market Return: <span style="font-weight:700;">' + fmtPctDecimal(inp.expectedMarketReturn) + '</span></div>'
      + '<div>CAPM Ke: <span style="font-weight:700; color:#3b82f6;">' + fmtPctDecimal(inp.capmCostOfEquity) + '</span></div>'
      + '</div>';

    // Capital weights section
    html += '<div style="margin-bottom:8px;">'
      + '<div style="color:var(--text-muted); font-size:9px; font-weight:700; letter-spacing:1px; text-transform:uppercase; margin-bottom:4px;">Capital Weights</div>'
      + '<div>Debt: <span style="font-weight:700;">' + fmt(inp.ltDebtOutstanding) + '</span> (<span style="font-weight:700;">' + fmtPctDecimal(debtWeight) + '</span>)</div>'
      + '<div>Equity: <span style="font-weight:700;">' + fmt(inp.totalCapitalization - inp.ltDebtOutstanding) + '</span> (<span style="font-weight:700;">' + fmtPctDecimal(equityWeight) + '</span>)</div>'
      + '</div>';

    // Final WACC
    html += '<div style="padding-top:8px; border-top:1px solid var(--border);">'
      + '<div style="color:var(--text-muted); font-size:9px; font-weight:700; letter-spacing:1px; text-transform:uppercase; margin-bottom:4px;">WACC = Wd * Kd(1-t) + We * Ke</div>'
      + '<div style="font-size:16px; font-weight:800; color:var(--text);">' + fmtPctDecimal(inp.wacc) + '</div>'
      + '</div>';

    html += '</div>';
    el.innerHTML = html;
  }

  // ── Render: Terminal Value Panel ─────────────

  function renderTvPanel(calc) {
    var ed = getEntityData();
    var el = document.getElementById('tv-detail');
    var html = '<div style="font-size:11px; line-height:2.2;">';

    if (currentMethod === 'exit') {
      var tv = ed.ufcf.terminalValue;
      var termLabel = tv.ebitdaLabel || ('Terminal EBITDA');
      html += '<div style="color:var(--text-muted); font-size:9px; font-weight:700; letter-spacing:1px; text-transform:uppercase; margin-bottom:4px;">Exit Multiple Method</div>'
        + '<div>' + termLabel + ': <span style="font-weight:700;">' + fmt(getTerminalEbitda()) + '</span></div>'
        + '<div>Exit Multiple: <span style="font-weight:700;">' + fmtX(getBaseExitMultiple()) + '</span></div>'
        + '<div>Terminal Value: <span style="font-weight:700;">' + fmt(calc.tv) + '</span></div>'
        + '<div>PV of Terminal Value: <span style="font-weight:700; color:#3b82f6;">' + fmt(calc.pvTv) + '</span></div>';
    } else {
      var pg = ed.ufcf.perpetuityGrowth;
      var ufcfLabel = (pg && pg.ufcfLabel) ? pg.ufcfLabel : 'Terminal UFCF';
      var termUfcf = ed.ufcf.ufcf[ed.ufcf.ufcf.length - 1];
      html += '<div style="color:var(--text-muted); font-size:9px; font-weight:700; letter-spacing:1px; text-transform:uppercase; margin-bottom:4px;">Perpetuity Growth Method</div>'
        + '<div>' + ufcfLabel + ': <span style="font-weight:700;">' + fmt(termUfcf) + '</span></div>'
        + '<div>Terminal Growth Rate: <span style="font-weight:700;">' + fmtPctDecimal(calc.tgr) + '</span></div>'
        + '<div>Discount Rate (WACC): <span style="font-weight:700;">' + fmtPctDecimal(calc.wacc) + '</span></div>'
        + '<div>Terminal Value: <span style="font-weight:700;">' + fmt(calc.tv) + '</span></div>'
        + '<div>PV of Terminal Value: <span style="font-weight:700; color:#3b82f6;">' + fmt(calc.pvTv) + '</span></div>';
    }

    // Summary
    html += '<div style="margin-top:8px; padding-top:8px; border-top:1px solid var(--border);">'
      + '<div>PV(UFCF): <span style="font-weight:700;">' + fmt(calc.pvSum) + '</span>'
      + ' + PV(TV): <span style="font-weight:700;">' + fmt(calc.pvTv) + '</span>'
      + ' = <span style="font-weight:800; color:' + colorVal(calc.ev) + ';">' + fmt(calc.ev) + '</span></div>'
      + '</div>';

    html += '</div>';
    el.innerHTML = html;
  }

  // ── Render: UFCF Build Table ─────────────────

  function renderUfcfTable() {
    var ed = getEntityData();
    var u = ed.ufcf;
    var el = document.getElementById('ufcf-table-container');

    var html = '<table class="data-table" style="font-size:11px; white-space:nowrap;">';

    // Header row
    html += '<thead><tr><th style="text-align:left; min-width:120px;">Line Item</th>';
    for (var h = 0; h < u.periods.length; h++) {
      html += '<th class="right" style="min-width:80px;">' + u.periods[h] + '</th>';
    }
    html += '</tr></thead><tbody>';

    // Row builder helper
    function addRow(label, arr, formatter, bold, accentColor) {
      var row = '<tr' + (bold ? ' style="font-weight:700;"' : '') + '>';
      row += '<td style="text-align:left; ' + (accentColor ? 'color:' + accentColor + ';' : '') + '">' + label + '</td>';
      for (var j = 0; j < u.periods.length; j++) {
        var val = arr ? arr[j] : null;
        var formatted = (val === null || val === undefined) ? '-' : formatter(val);
        row += '<td class="right"' + (accentColor ? ' style="color:' + accentColor + ';"' : '') + '>' + formatted + '</td>';
      }
      row += '</tr>';
      return row;
    }

    html += addRow('EBIT', u.ebit, fmt, false);
    html += addRow('(-) Taxes', u.taxes, function(v) { return v === 0 ? '$0.0M' : fmt(v); }, false);
    html += addRow('NOPAT', u.nopat, fmt, true);
    html += addRow('(+) D&A', u.da, fmt, false);
    html += addRow('(-) CapEx', u.capex, fmt, false);
    html += addRow('(-) NWC Changes', u.nwcChanges, fmt, false);

    // Separator row
    html += '<tr><td colspan="' + (u.periods.length + 1) + '" style="border-top:2px solid var(--border); padding:0;"></td></tr>';

    html += addRow('UFCF', u.ufcf, fmt, true, '#3b82f6');
    html += addRow('Discount Period', u.discountPeriods, function(v) { return v.toFixed(1); }, false);
    html += addRow('PV of UFCF', u.pvUfcf, fmt, false);

    html += '</tbody></table>';
    el.innerHTML = html;
  }

  // ── Render: UFCF Bar Chart ───────────────────

  function renderUfcfChart() {
    var ed = getEntityData();
    var u = ed.ufcf;
    var ctx = document.getElementById('ufcf-chart').getContext('2d');

    var barColors = u.ufcf.map(function(v) {
      return v >= 0 ? 'rgba(59,130,246,0.7)' : 'rgba(239,68,68,0.7)';
    });

    AMC_UTILS.ChartRegistry.set('dcf-ufcf', new Chart(ctx, {
      type: 'bar',
      data: {
        labels: u.periods,
        datasets: [{
          label: 'UFCF ($M)',
          data: u.ufcf,
          backgroundColor: barColors,
          borderWidth: 0,
          borderRadius: 3,
          barPercentage: 0.7
        }]
      },
      options: {
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(ctx) { return 'UFCF: ' + fmt(ctx.parsed.y); }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { size: 10 } }
          },
          y: {
            grid: { color: 'rgba(42,54,84,0.5)' },
            ticks: {
              callback: function(v) { return '$' + v + 'M'; },
              font: { size: 10 }
            },
            title: { display: true, text: 'UFCF ($M)', font: { size: 10 } }
          }
        }
      }
    }));
  }

  // ── Render: Sensitivity Grid ─────────────────

  function renderSensitivityGrid(calc) {
    var el = document.getElementById('sensitivity-grid');
    var ed = getEntityData();
    var grid = ed.ufcf.exitMultipleWaccGrid;

    if (!grid) {
      el.innerHTML = '<div style="padding:16px; font-size:11px; color:var(--text-dim);">Sensitivity grid available for Consolidated entity only.</div>';
      return;
    }

    var rowAxis = grid.rowAxis; // Exit multiples (rows)
    var colAxis = grid.colAxis; // WACC/2 values (columns)
    var data = grid.grid;

    // Find closest highlight cell
    var userWacc = calc.wacc;
    var baseExitMult = getBaseExitMultiple();

    var closestRow = 0;
    var closestCol = 0;
    var minRowDiff = Infinity;
    var minColDiff = Infinity;

    for (var r = 0; r < rowAxis.length; r++) {
      var diff = Math.abs(rowAxis[r] - baseExitMult);
      if (diff < minRowDiff) { minRowDiff = diff; closestRow = r; }
    }
    for (var c = 0; c < colAxis.length; c++) {
      // colAxis values are WACC/2 in the Excel -- compare against user WACC/2
      var diff2 = Math.abs(colAxis[c] - userWacc / 2);
      if (diff2 < minColDiff) { minColDiff = diff2; closestCol = c; }
    }

    var html = '<table class="data-table" style="font-size:10px; white-space:nowrap;">';
    html += '<thead><tr><th style="text-align:left;">Exit Mult \\ WACC/2</th>';
    for (var ch = 0; ch < colAxis.length; ch++) {
      html += '<th class="right">' + fmtPctDecimal(colAxis[ch]) + '</th>';
    }
    html += '</tr></thead><tbody>';

    for (var ri = 0; ri < rowAxis.length; ri++) {
      html += '<tr>';
      html += '<td style="font-weight:700;">' + fmtX(rowAxis[ri]) + '</td>';
      for (var ci = 0; ci < colAxis.length; ci++) {
        var isHighlight = (ri === closestRow && ci === closestCol);
        var cellStyle = isHighlight
          ? 'background:rgba(59,130,246,0.25); font-weight:700; color:var(--text); border:1px solid rgba(59,130,246,0.5);'
          : '';
        html += '<td class="right" style="' + cellStyle + '">' + fmt(data[ri][ci]) + '</td>';
      }
      html += '</tr>';
    }

    html += '</tbody></table>';
    el.innerHTML = html;
  }

  // ── Entity Tab Switching ─────────────────────

  function setupEntityTabs() {
    var tabs = document.querySelectorAll('#entity-tabs .toggle-btn');
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener('click', function() {
        for (var j = 0; j < tabs.length; j++) {
          tabs[j].classList.remove('active');
        }
        this.classList.add('active');
        currentEntity = this.getAttribute('data-entity');

        // Update slider defaults for the new entity
        var waccSlider = document.getElementById('wacc-slider');
        var tgrSlider = document.getElementById('tgr-slider');
        waccSlider.value = (getBaseWacc() * 100).toFixed(2);
        tgrSlider.value = (getBaseTgr() * 100).toFixed(2);
        document.getElementById('wacc-val').textContent = parseFloat(waccSlider.value).toFixed(2) + '%';
        document.getElementById('tgr-val').textContent = parseFloat(tgrSlider.value).toFixed(2) + '%';

        renderAll();
      });
    }
  }

  // ── Terminal Method Toggle ───────────────────

  function setupMethodToggle() {
    var btns = document.querySelectorAll('#tv-method-toggle .toggle-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function() {
        for (var j = 0; j < btns.length; j++) {
          btns[j].classList.remove('active');
        }
        this.classList.add('active');
        currentMethod = this.getAttribute('data-method');
        renderAll();
      });
    }
  }

  // ── Slider Event Listeners ───────────────────

  function setupSliders() {
    var waccSlider = document.getElementById('wacc-slider');
    var tgrSlider = document.getElementById('tgr-slider');

    waccSlider.addEventListener('input', function() {
      document.getElementById('wacc-val').textContent = parseFloat(this.value).toFixed(2) + '%';
      renderAll();
    });

    tgrSlider.addEventListener('input', function() {
      document.getElementById('tgr-val').textContent = parseFloat(this.value).toFixed(2) + '%';
      renderAll();
    });
  }

  // ── Waterfall Bridge ─────────────────────────

  function setupBridge() {
    var btn = document.getElementById('bridge-btn');
    if (!btn) return;

    btn.addEventListener('click', function() {
      var calc = recalcEV();
      var evRounded = Math.round(calc.ev);
      window.location.href = '../models/waterfall.html?ev=' + evRounded;
    });
  }

  // ── Master Render ────────────────────────────

  function renderAll() {
    var calc = recalcEV();
    renderKeyMetrics(calc);
    renderEvResult(calc);
    renderWaccPanel();
    renderTvPanel(calc);
    renderUfcfTable();
    renderUfcfChart();
    renderSensitivityGrid(calc);
  }

  // ── Initialization ───────────────────────────

  loadData().then(function() {
    // Set initial slider values from consolidated data
    var waccSlider = document.getElementById('wacc-slider');
    var tgrSlider = document.getElementById('tgr-slider');
    waccSlider.value = (getBaseWacc() * 100).toFixed(2);
    tgrSlider.value = (getBaseTgr() * 100).toFixed(2);
    document.getElementById('wacc-val').textContent = parseFloat(waccSlider.value).toFixed(2) + '%';
    document.getElementById('tgr-val').textContent = parseFloat(tgrSlider.value).toFixed(2) + '%';

    setupEntityTabs();
    setupMethodToggle();
    setupSliders();
    setupBridge();
    renderAll();
  }).catch(function(err) {
    console.error('DCF Model: Failed to load data', err);
    document.getElementById('ev-result').innerHTML = '<div style="color:#ef4444; padding:16px;">Failed to load DCF data. Check console for details.</div>';
  });

})();
