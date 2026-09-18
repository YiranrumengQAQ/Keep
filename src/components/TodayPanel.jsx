/* ═══════════════════════════════════════════════════════════
   今日课程面板（today 由 useToday() 提供，跨午夜自动刷新）
   ═══════════════════════════════════════════════════════════ */
import { WEEKS, COURSES, PERIOD_TIMES, TERM_RANGE, WEEKDAY_CN } from '../data/schedule.js';

export function SlotChip({ item, className }) {
  const course = COURSES[item.c];
  const special = !!course?.special;
  const hue = special ? undefined : course?.hue;
  const style = hue !== undefined ? { ['--h']: hue } : undefined;
  const time = PERIOD_TIMES[item.p];
  const isList = className === 'slot';
  const Tag = isList ? 'li' : 'div';

  return (
    <Tag className={`${className}${special ? ' is-special' : ''}`} style={style}>
      <span className={isList ? 'slot-period' : 'ts-period'}>
        {item.p}节
      </span>
      {time && <span className="slot-time">{time}</span>}
      <span className={isList ? 'slot-course' : 'ts-course'}>
        {course ? course.name : item.c}
      </span>
    </Tag>
  );
}

export default function TodayPanel({ today, onJumpToday }) {
  const { now, info: todayInfo } = today;
  const dateText = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${WEEKDAY_CN[now.getDay()]}`;

  return (
    <section aria-label="今日课程">
      <div className="today-card">
        <div className="today-head">
          <span className="today-label">今天</span>
          <span className="today-date">{dateText}</span>
          {todayInfo && (
            <>
              <span className="today-week">
                {WEEKS[todayInfo.wi].label} · {WEEKS[todayInfo.wi].days[todayInfo.di].w}
              </span>
              <button type="button" className="ghost-btn" onClick={onJumpToday}>
                定位到今日
              </button>
            </>
          )}
        </div>

        {todayInfo ? (
          <div className="today-slots">
            {WEEKS[todayInfo.wi].days[todayInfo.di].s.length === 0 ? (
              <p className="today-note">今天没有安排课程，可以好好休息。</p>
            ) : (
              WEEKS[todayInfo.wi].days[todayInfo.di].s.map((item, i) => (
                <SlotChip key={`${item.p}-${i}`} item={item} className="today-slot" />
              ))
            )}
          </div>
        ) : (
          <p className="today-note">
            当前日期不在本学期教学周内（{TERM_RANGE}），下方展示第 1 周课表。
          </p>
        )}
      </div>
    </section>
  );
}
