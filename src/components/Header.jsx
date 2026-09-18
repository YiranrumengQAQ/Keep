/* ═══════════════════════════════════════════════════════════
   顶部栏
   ═══════════════════════════════════════════════════════════ */
import { useState, useEffect, useRef } from 'react';
import { usePref, setPref } from '../store/prefs.js';
import { WEEKS } from '../data/schedule.js';
import Segmented from './Segmented.jsx';
import { IconCalendar, IconSun, IconMoon, IconSystem, IconGear } from './Icon.jsx';

const THEME_OPTIONS = [
  { value: 'light',  icon: <IconSun size={16} />,    title: '浅色',     label: '' },
  { value: 'dark',   icon: <IconMoon size={16} />,   title: '深色',     label: '' },
  { value: 'system', icon: <IconSystem size={16} />, title: '跟随系统', label: '' }
];

export default function Header({ onOpenSettings }) {
  const theme = usePref('theme');
  const [scrolled, setScrolled] = useState(false);
  const rafRef = useRef(0);

  useEffect(() => {
    let last = -1;
    function onScroll() {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        const y = window.scrollY || window.pageYOffset || 0;
        if (y === last) return;
        last = y;
        setScrolled(y > 6);
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <header className={`app-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="header-inner">
        <div className="brand">
          <span className="brand-icon-wrap">
            <IconCalendar className="brand-icon" size={38} />
          </span>
          <div className="brand-text">
            <h1>2025级医学检验技术专业（1）班</h1>
            <p>2026 年秋季学期 · 第 1～{WEEKS.length} 周</p>
          </div>
        </div>

        <div className="header-actions">
          <Segmented
            label="主题模式"
            options={THEME_OPTIONS}
            value={theme}
            onChange={(v) => setPref('theme', v)}
          />
          <button
            type="button"
            className="icon-btn"
            aria-label="打开设置"
            aria-haspopup="dialog"
            onClick={onOpenSettings}
          >
            <IconGear size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
