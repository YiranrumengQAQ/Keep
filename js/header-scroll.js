/* ═══════════════════════════════════════════════════════════
   顶栏滚动阴影
   ═══════════════════════════════════════════════════════════ */
'use strict';
var lastScrollY = -1;

function onScroll() {
  if (rafId) return;
  rafId = requestAnimationFrame(function () {
    rafId = 0;
    var y = window.scrollY || window.pageYOffset || 0;
    if (y === lastScrollY) return;
    lastScrollY = y;
    headerEl.classList.toggle('is-scrolled', y > 6);
  });
}

window.addEventListener('scroll', onScroll, { passive: true, signal: signal });
onScroll();
