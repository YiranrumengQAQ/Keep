/* ═══════════════════════════════════════════════════════════
   日期工具（纯函数 + 「今天」的动态计算）
   ─────────────────────────────────────────────────────────
   「今天」不再是一次性读取的模块常量：computeToday() 可随时重算，
   配合 useToday() Hook 在跨午夜 / 页面恢复可见时自动刷新，
   长时间挂着的页面或已安装的 PWA 也能正确翻到新的一天。
   ═══════════════════════════════════════════════════════════ */
import { WEEKS } from '../data/schedule.js';

export { WEEKDAY_CN } from '../data/schedule.js';

export function toISO(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function fmtDate(iso) {
  const parts = iso.split('-');
  return `${Number(parts[1])}月${Number(parts[2])}日`;
}

function findDay(iso) {
  for (let wi = 0; wi < WEEKS.length; wi++) {
    const days = WEEKS[wi].days;
    for (let di = 0; di < days.length; di++) {
      if (days[di].d === iso) return { wi, di };
    }
  }
  return null;
}

/* 某个时刻的「今天」快照：now / iso / info（学期内的周与天下标） */
export function computeToday(now = new Date()) {
  const iso = toISO(now);
  return { now, iso, info: findDay(iso) };
}

/* 距下一个零点的毫秒数（加 5 秒缓冲，避开零点边界的定时抖动） */
export function msUntilNextMidnight() {
  const now = new Date();
  const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 5);
  return Math.max(1000, next - now);
}
