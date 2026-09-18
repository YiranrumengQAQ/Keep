/* ═══════════════════════════════════════════════════════════
   日期工具
   ═══════════════════════════════════════════════════════════ */
import { WEEKS } from '../data/schedule.js';

export const WEEKDAY_CN = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

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

export const now = new Date();
export const todayISO = toISO(now);

export function findToday() {
  for (let wi = 0; wi < WEEKS.length; wi++) {
    const days = WEEKS[wi].days;
    for (let di = 0; di < days.length; di++) {
      if (days[di].d === todayISO) return { wi, di };
    }
  }
  return null;
}

export const todayInfo = findToday();

export function pickInitialWeek() {
  if (todayInfo) return todayInfo.wi;
  return 0;
}
