/* ═══════════════════════════════════════════════════════════
   「今天」响应式 Hook
   · 定时器精确瞄准下一个零点，跨午夜自动刷新（不做每分钟轮询）
   · 页面从后台恢复可见时兜底重算（移动端会冻结后台定时器）
   · 日期没变就不触发重渲染
   ═══════════════════════════════════════════════════════════ */
import { useEffect, useState } from 'react';
import { computeToday, msUntilNextMidnight } from '../utils/date.js';

export default function useToday() {
  const [today, setToday] = useState(() => computeToday());

  useEffect(() => {
    let timer = 0;

    function refresh() {
      setToday((prev) => {
        const next = computeToday();
        return next.iso === prev.iso ? prev : next;
      });
    }

    function schedule() {
      timer = setTimeout(() => {
        refresh();
        schedule();
      }, msUntilNextMidnight());
    }
    schedule();

    function onVisible() {
      if (!document.hidden) refresh();
    }
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  return today;
}
