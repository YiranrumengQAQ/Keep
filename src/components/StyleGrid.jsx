/* ═══════════════════════════════════════════════════════════
   界面风格选择网格（8 种，带 CSS 手绘色卡预览）
   设置面板与新手引导共用
   ═══════════════════════════════════════════════════════════ */
import { STYLES } from '../data/schedule.js';
import { usePref, setPref } from '../store/prefs.js';
import { IconCheck } from './Icon.jsx';

export default function StyleGrid() {
  const current = usePref('style');

  return (
    <div className="style-grid" role="radiogroup" aria-label="界面风格">
      {STYLES.map((s) => {
        const active = s.id === current;
        return (
          <button
            key={s.id}
            type="button"
            className="style-btn"
            role="radio"
            aria-checked={active}
            onClick={() => setPref('style', s.id)}
          >
            <span className="style-swatch" data-swatch={s.id} aria-hidden="true" />
            <span className="style-name">
              <span className="style-name-text">
                {s.name}
                <small className="style-desc">{s.desc}</small>
              </span>
              <IconCheck className="style-check" size={15} sw={3} />
            </span>
          </button>
        );
      })}
    </div>
  );
}
