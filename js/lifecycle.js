/* ═══════════════════════════════════════════════════════════
   生命周期管理：统一信号源，页面销毁时一次性解绑，防止内存泄漏
   ═══════════════════════════════════════════════════════════ */
'use strict';
var controller = new AbortController();
var signal = controller.signal;
var rafId = 0;

function teardown() {
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = 0;
  }
  if (!controller.signal.aborted) controller.abort();
}

window.addEventListener('pagehide', function (e) {
  /* 进入 bfcache 时保留现场，真正卸载才清理 */
  if (e.persisted) return;
  teardown();
}, { signal: signal });
