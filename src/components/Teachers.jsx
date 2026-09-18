/* ═══════════════════════════════════════════════════════════
   任课教师（列表由 COURSES 单一数据源派生，
   本学期暂未排课的课程带「未排课」标记）
   ═══════════════════════════════════════════════════════════ */
import { TEACHERS } from '../data/schedule.js';
import { IconUsers } from './Icon.jsx';

export default function Teachers() {
  return (
    <section className="teachers" aria-label="任课教师">
      <h2 className="teachers-title">
        <IconUsers size={17} />
        任课教师
      </h2>
      <div className="teacher-grid">
        {TEACHERS.map((t) => (
          <div className="teacher-item" key={t.key}>
            <span className="t-name">
              {t.name}
              {!t.scheduled && <span className="t-tag">未排课</span>}
            </span>
            <span className="t-person">{t.teacher}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
