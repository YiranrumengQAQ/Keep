/* ═══════════════════════════════════════════════════════════
   今日课程面板
   ═══════════════════════════════════════════════════════════ */
import { WEEKS, SPECIAL, HUES, PERIOD_TIMES } from '../data/schedule.js';
import { now, todayInfo, WEEKDAY_CN } from '../utils/date.js';

export function SlotChip({ item, className }) {
  const special = SPECIAL.has(item.c);
  const hue = HUES[item.c];
  const style = !special && hue !== undefined ? { ['--h']: hue } : undefined;
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
        {item.c}
      </span>
    </Tag>
  );
}

export default function TodayPanel({ onJumpToday }) {
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
            当前日期不在本学期教学周内（2026.8.31 - 10.11），下方展示第 1 周课表。
          </p>
        )}
      </div>
    </section>
  );
}
