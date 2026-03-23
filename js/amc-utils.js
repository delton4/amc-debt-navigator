/* ═══════════════════════════════════════════════
   AMC Debt Navigator - Shared Utilities
   ChartRegistry, DataLoader, formatters, defaults
   Foundation for all model modules (Phases 3-5)
   ═══════════════════════════════════════════════ */

(function() {
  'use strict';

  var AMC_UTILS = {};

  // ── Formatters ──────────────────────────────────

  /**
   * Dollar millions: $1,234.5M, parentheses for negatives, 'N/A' for null
   */
  AMC_UTILS.fmt = function(n) {
    if (n === null || n === undefined || isNaN(n)) return 'N/A';
    var abs = Math.abs(n);
    var s = '$' + abs.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'M';
    return n < 0 ? '(' + s + ')' : s;
  };

  /**
   * Raw percentage input: 85.3 -> '85.3%'
   */
  AMC_UTILS.fmtPct = function(n) {
    if (n === null || n === undefined || isNaN(n)) return 'N/A';
    return n.toFixed(1) + '%';
  };

  /**
   * Decimal percentage input: 0.853 -> '85.3%'
   * Multiplies by 100 then delegates to fmtPct.
   */
  AMC_UTILS.fmtPctDecimal = function(n) {
    if (n === null || n === undefined || isNaN(n)) return 'N/A';
    return AMC_UTILS.fmtPct(n * 100);
  };

  /**
   * Leverage multiple: 5.5 -> '5.50x'
   */
  AMC_UTILS.fmtX = function(n) {
    if (n === null || n === undefined || isNaN(n)) return 'N/A';
    return n.toFixed(2) + 'x';
  };

  /**
   * Plain dollar: $1,234.50 (no M suffix), parentheses for negatives
   */
  AMC_UTILS.fmtDollar = function(n) {
    if (n === null || n === undefined || isNaN(n)) return 'N/A';
    var abs = Math.abs(n);
    var s = '$' + abs.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return n < 0 ? '(' + s + ')' : s;
  };

  /**
   * Share count: 1,234.56 with commas
   */
  AMC_UTILS.fmtShares = function(n) {
    if (n === null || n === undefined || isNaN(n)) return 'N/A';
    return n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  /**
   * Integer with commas: 1,234 (no decimals)
   */
  AMC_UTILS.fmtInt = function(n) {
    if (n === null || n === undefined || isNaN(n)) return 'N/A';
    return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  /**
   * Color value: red for negative, green for non-negative
   */
  AMC_UTILS.colorVal = function(n) {
    return n < 0 ? '#ef4444' : '#22c55e';
  };

  // ── Chart Defaults ──────────────────────────────

  var _defaultsInitialized = false;

  /**
   * Set Chart.js global defaults once. Reads CSS custom properties
   * from theme.css with hardcoded fallbacks.
   */
  AMC_UTILS.initChartDefaults = function() {
    if (_defaultsInitialized) return;
    _defaultsInitialized = true;

    var styles = getComputedStyle(document.documentElement);
    var textMuted = (styles.getPropertyValue('--text-muted') || '').trim() || '#8899b4';
    var border = (styles.getPropertyValue('--border') || '').trim() || '#2a3654';

    var monoFont = "'SF Mono', 'Fira Code', 'JetBrains Mono', monospace";

    // Core defaults
    Chart.defaults.color = textMuted;
    Chart.defaults.borderColor = border;
    Chart.defaults.font.family = monoFont;
    Chart.defaults.font.size = 11;
    Chart.defaults.responsive = true;
    Chart.defaults.maintainAspectRatio = false;

    // Tooltip defaults
    Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(17, 24, 39, 0.95)';
    Chart.defaults.plugins.tooltip.titleFont = { family: monoFont, size: 11 };
    Chart.defaults.plugins.tooltip.bodyFont = { family: monoFont, size: 10 };
    Chart.defaults.plugins.tooltip.borderColor = border;
    Chart.defaults.plugins.tooltip.borderWidth = 1;
    Chart.defaults.plugins.tooltip.padding = 8;

    // Legend defaults
    Chart.defaults.plugins.legend.labels.font = { family: monoFont, size: 10 };
    Chart.defaults.plugins.legend.labels.padding = 12;
    Chart.defaults.plugins.legend.labels.usePointStyle = true;
  };

  // ── ChartRegistry ───────────────────────────────

  AMC_UTILS.ChartRegistry = {
    _instances: {},

    /**
     * Store a chart instance. Auto-destroys previous instance for same key.
     * Returns the chartInstance for assignment convenience.
     */
    set: function(key, chartInstance) {
      if (this._instances[key]) {
        this._instances[key].destroy();
      }
      this._instances[key] = chartInstance;
      return chartInstance;
    },

    /** Get a chart instance by key, or null if not found. */
    get: function(key) {
      return this._instances[key] || null;
    },

    /** Destroy a chart by key and remove from registry. No-op if not found. */
    destroy: function(key) {
      if (this._instances[key]) {
        this._instances[key].destroy();
        delete this._instances[key];
      }
    },

    /** Destroy all registered charts and reset the registry. */
    destroyAll: function() {
      var keys = Object.keys(this._instances);
      for (var i = 0; i < keys.length; i++) {
        this._instances[keys[i]].destroy();
      }
      this._instances = {};
    },

    /** Check if a chart is registered under the given key. */
    has: function(key) {
      return !!this._instances[key];
    },

    /** Return array of all registered keys. */
    keys: function() {
      return Object.keys(this._instances);
    }
  };

  // ── DataLoader ──────────────────────────────────

  AMC_UTILS.DataLoader = {
    _cache: {},
    _basePaths: ['../data/', './data/', 'data/'],

    /**
     * Fetch and parse a JSON file with path-trial fallback.
     * Caches results and deduplicates in-flight requests.
     * @param {string} filename - e.g. 'financials.json'
     * @returns {Promise} resolving to parsed JSON data
     */
    fetch: function(filename) {
      var self = this;

      // Return cached data or in-flight Promise
      if (self._cache[filename]) {
        return Promise.resolve(self._cache[filename]);
      }

      // Create promise with path-trial fallback
      var promise = new Promise(function(resolve, reject) {
        var paths = self._basePaths.map(function(base) { return base + filename; });
        var idx = 0;

        function tryNext() {
          if (idx >= paths.length) {
            delete self._cache[filename];
            reject(new Error('DataLoader: Could not load ' + filename + ' from any path'));
            return;
          }
          var url = paths[idx++];
          fetch(url)
            .then(function(r) {
              if (!r.ok) throw new Error('HTTP ' + r.status);
              return r.json();
            })
            .then(function(data) {
              // Replace promise with resolved data for future lookups
              self._cache[filename] = data;
              resolve(data);
            })
            .catch(function() {
              tryNext();
            });
        }
        tryNext();
      });

      // Store promise immediately for deduplication of concurrent requests
      self._cache[filename] = promise;
      return promise;
    },

    /** Clear all cached data and in-flight requests. */
    clearCache: function() {
      this._cache = {};
    }
  };

  // ── Auto-initialize chart defaults ──────────────
  AMC_UTILS.initChartDefaults();

  // ── Expose globally ─────────────────────────────
  window.AMC_UTILS = AMC_UTILS;

})();
