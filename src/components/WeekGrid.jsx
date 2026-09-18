/* ═══════════════════════════════════════════════════════════
   周课表网格
   ═══════════════════════════════════════════════════════════ */
import { WEEKS } from '../data/schedule.js';
import { usePref } from '../store/prefs.js';
import { fmtDate, todayISO, todayInfo } from '../utils/date.js';
import { SlotChip } from './TodayPanel.jsx';
import { IconCalendar } from './Icon.jsx';

function DayCard({ day }) {
  const isToday = day.d === todayISO;

  return (
    <article className={`day-card${isToday ? ' is-today' : ''}`}>
      <header className="day-head">
        <span className="day-name">{day.w}</span>
        <span className="day-date">{fmtDate(day.d)}</span>
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

export default function WeekGrid({ activeWeek, gridRef }) {
  const range = usePref('range');
  const isSingle = range === 'today';

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

  return (
    <section ref={gridRef} className={`week-grid${isSingle ? ' single' : ''}`} aria-label="课程表">
      {days.length === 0 ? (
        <EmptyState
          message={isSingle ? '今天不在本学期教学周内，暂无课程安排。' : '本周暂无课程安排。'}
        />
      ) : (
        days.map((day) => <DayCard key={day.d} day={day} />)
      )}
    </section>
  );
}
