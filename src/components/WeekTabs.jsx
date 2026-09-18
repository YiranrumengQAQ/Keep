/* ═══════════════════════════════════════════════════════════
   周次切换标签
   ═══════════════════════════════════════════════════════════ */
import { WEEKS } from '../data/schedule.js';
import { usePref } from '../store/prefs.js';

export default function WeekTabs({ activeWeek, onSelect }) {
  const range = usePref('range');

  if (range === 'today') return null;

  return (
    <nav className="week-tabs" role="tablist" aria-label="周次切换">
      {WEEKS.map((week, i) => (
        <button
          key={week.label}
          type="button"
          className={`week-tab${i === activeWeek ? ' is-active' : ''}`}
          role="tab"
          aria-selected={i === activeWeek}
          onClick={() => onSelect(i)}
        >
          <span className="wt-label">{week.label}</span>
          <span className="wt-range">{week.range}</span>
        </button>
      ))}
    </nav>
  );
}
