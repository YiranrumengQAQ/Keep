/* ═══════════════════════════════════════════════════════════
   周课表网格
   · 与周次标签构成 tablist / tabpanel 关系（aria-labelledby）
   · 周末有课的日子自动标注「补课」徽章
   ═══════════════════════════════════════════════════════════ */
import { WEEKS } from '../data/schedule.js';
import { usePref } from '../store/prefs.js';
import { fmtDate } from '../utils/date.js';
import { SlotChip } from './TodayPanel.jsx';
import { IconCalendar } from './Icon.jsx';

function DayCard({ day, todayISO }) {
  const isToday = day.d === todayISO;

  return (
    <article className={`day-card${isToday ? ' is-today' : ''}`}>
      <header className="day-head">
        <span className="day-name">{day.w}</span>
        <span className="day-date">{fmtDate(day.d)}</span>
        {day.makeup && <span className="makeup-badge">补课</span>}
        {isToday && <span className="today-badge">今天</span>}
      </header>

      <ul className="slot-list">
        {day.s.length === 0 ? (
          <li className="slot-empty">无课</li>
        ) : (
          day.s.map((item, i) => (
            <SlotChip key={`${item.p}-${i}`} item={item} className="slot" />
          ))
        )}
      </ul>
    </article>
  );
}

function EmptyState({ message }) {
  return (
    <div className="empty-state">
      <IconCalendar size={42} sw={1.6} />
      <p>{message}</p>
    </div>
  );
}

export default function WeekGrid({ activeWeek, today, gridRef }) {
  const range = usePref('range');
  const isSingle = range === 'today';
  const todayInfo = today.info;

  let days = [];
  if (isSingle) {
    if (todayInfo) {
      const week = WEEKS[todayInfo.wi];
      if (week) days = [week.days[todayInfo.di]];
    }
  } else {
    const week = WEEKS[activeWeek];
    if (week) days = week.days;
  }

  /* 周次标签可见时，本区域作为其 tabpanel；仅今天模式下是独立区域 */
  const tabPanelProps = isSingle
    ? {}
    : { role: 'tabpanel', 'aria-labelledby': `week-tab-${activeWeek}` };

  return (
    <section
      ref={gridRef}
      id="weekGrid"
      className={`week-grid${isSingle ? ' single' : ''}`}
      aria-label="课程表"
      {...tabPanelProps}
    >
      {days.length === 0 ? (
        <EmptyState
          message={isSingle ? '今天不在本学期教学周内，暂无课程安排。' : '本周暂无课程安排。'}
        />
      ) : (
        days.map((day) => <DayCard key={day.d} day={day} todayISO={today.iso} />)
      )}
    </section>
  );
}
