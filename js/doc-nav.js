/* ═══════════════════════════════════════════════
   AMC Debt Navigator - Document Navigation
   In-page TOC generation, scroll-spy, collapse/expand
   ═══════════════════════════════════════════════ */

(function() {
  'use strict';

  // ── Build TOC from sections ──
  var tocEl = document.getElementById('doc-toc-list');
  if (!tocEl) return;

  var sections = document.querySelectorAll('.doc-section[id], .doc-article[id]');
  if (!sections.length) return;

  var html = '';
  sections.forEach(function(sec) {
    var id = sec.id;
    var isArticle = sec.classList.contains('doc-article');
    var titleEl = sec.querySelector('.article-header, .section-title, .section-header');
    if (!titleEl) return;

    var text = titleEl.textContent.trim();
    if (text.length > 60) text = text.substring(0, 57) + '...';

    if (isArticle) {
      html += '<a href="#' + id + '" class="toc-link toc-article">' + text + '</a>';
    } else {
      html += '<a href="#' + id + '" class="toc-link toc-section">' + text + '</a>';
    }
  });
  tocEl.innerHTML = html;

  // ── Scroll Spy ──
  var tocLinks = tocEl.querySelectorAll('.toc-link');
  var sectionEls = [];
  tocLinks.forEach(function(link) {
    var href = link.getAttribute('href');
    if (href) {
      var target = document.querySelector(href);
      if (target) sectionEls.push({ el: target, link: link });
    }
  });

  function updateScrollSpy() {
    var scrollTop = window.scrollY + 56;
    var current = null;
    for (var i = 0; i < sectionEls.length; i++) {
      if (sectionEls[i].el.offsetTop <= scrollTop) {
        current = sectionEls[i];
      }
    }
    tocLinks.forEach(function(l) { l.classList.remove('active'); });
    if (current) current.link.classList.add('active');
  }

  var scrollTimer;
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(updateScrollSpy, 50);
  });
  updateScrollSpy();

  // ── Expand/Collapse All ──
  var expandBtn = document.getElementById('expand-all');
  var collapseBtn = document.getElementById('collapse-all');

  if (expandBtn) {
    expandBtn.addEventListener('click', function() {
      document.querySelectorAll('.legal-details').forEach(function(d) {
        d.open = true;
      });
    });
  }
  if (collapseBtn) {
    collapseBtn.addEventListener('click', function() {
      document.querySelectorAll('.legal-details').forEach(function(d) {
        d.open = false;
      });
    });
  }

})();
