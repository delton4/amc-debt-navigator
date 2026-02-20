/* ═══════════════════════════════════════════════
   AMC Debt Navigator - Hub Search & Filter
   Client-side card filtering for hub pages
   ═══════════════════════════════════════════════ */

(function() {
  'use strict';

  var searchInput = document.querySelector('.hub-search input[type="text"]');
  var cards = document.querySelectorAll('.hub-card');
  var filterBtns = document.querySelectorAll('.hub-filter .filter-btn');

  var activeFilter = 'all';

  // ── Text Search ──
  function filterCards() {
    var query = (searchInput ? searchInput.value : '').toLowerCase().trim();

    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var text = (card.textContent || '').toLowerCase();
      var category = (card.getAttribute('data-category') || '').toLowerCase();

      var matchesSearch = !query || text.indexOf(query) !== -1;
      var matchesFilter = activeFilter === 'all' || category.indexOf(activeFilter) !== -1;

      card.style.display = (matchesSearch && matchesFilter) ? '' : 'none';
    }
  }

  // ── Search Input Handler ──
  if (searchInput) {
    searchInput.addEventListener('keyup', filterCards);
  }

  // ── Filter Button Handlers ──
  for (var j = 0; j < filterBtns.length; j++) {
    filterBtns[j].addEventListener('click', function() {
      // Remove active from all siblings
      for (var k = 0; k < filterBtns.length; k++) {
        filterBtns[k].classList.remove('active');
      }
      // Set active on clicked
      this.classList.add('active');
      activeFilter = (this.getAttribute('data-filter') || 'all').toLowerCase();
      filterCards();
    });
  }

})();