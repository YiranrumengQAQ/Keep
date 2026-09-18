/* ═══════════════════════════════════════════════════════════
   周次切换标签（完整 tablist 语义 + 键盘导航）
   · aria-controls / aria-selected / roving tabindex
   · ← → 循环切换，Home / End 跳到首尾
   ═══════════════════════════════════════════════════════════ */
import { useRef } from 'react';
import { WEEKS } from '../data/schedule.js';
import { usePref } from '../store/prefs.js';

export default function WeekTabs({ activeWeek, onSelect }) {
  const range = usePref('range');
  const tabRefs = useRef([]);

  if (range === 'today') return null;

  const total = WEEKS.length;

  function onKeyDown(e) {
    let next = null;
    if (e.key === 'ArrowRight') next = (activeWeek + 1) % total;
    else if (e.key === 'ArrowLeft') next = (activeWeek - 1 + total) % total;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = total - 1;
    if (next === null || next === activeWeek) return;
    e.preventDefault();
    onSelect(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <nav className="week-tabs" role="tablist" aria-label="周次切换" onKeyDown={onKeyDown}>
      {WEEKS.map((week, i) => (
        <button
          key={week.label}
          ref={(el) => { tabRefs.current[i] = el; }}
          type="button"
          id={`week-tab-${i}`}
          className={`week-tab${i === activeWeek ? ' is-active' : ''}`}
          role="tab"
          aria-selected={i === activeWeek}
          aria-controls="weekGrid"
          tabIndex={i === activeWeek ? 0 : -1}
          onClick={() => onSelect(i)}
        >
          <span className="wt-label">{week.label}</span>
          <span className="wt-range">{week.range}</span>
        </button>
      ))}
    </nav>
  );
}
