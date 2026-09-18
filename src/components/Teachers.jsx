/* ═══════════════════════════════════════════════════════════
   任课教师
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
        {TEACHERS.map(([course, person]) => (
          <div className="teacher-item" key={`${course}-${person}`}>
            <span className="t-name">{course}</span>
            <span className="t-person">{person}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
