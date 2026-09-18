/* ═══════════════════════════════════════════════════════════
   应用根组件：布局编排 + 偏好 → DOM 副作用同步
   ═══════════════════════════════════════════════════════════ */
import { useState, useEffect, useRef, useCallback } from 'react';
import { usePrefs, useOnboarded } from './store/prefs.js';
import { sanitizeCss } from './utils/sanitizeCss.js';
import { META_COLORS, WEEKS } from './data/schedule.js';
import useToday from './hooks/useToday.js';
import useRescue from './hooks/useRescue.js';

import Header from './components/Header.jsx';
import TodayPanel from './components/TodayPanel.jsx';
import WeekTabs from './components/WeekTabs.jsx';
import WeekGrid from './components/WeekGrid.jsx';
import Teachers from './components/Teachers.jsx';
import SettingsModal from './components/SettingsModal.jsx';
import OnboardingWizard from './components/OnboardingWizard.jsx';
import Toasts from './components/Toasts.jsx';

function useSystemDark() {
  const [dark, setDark] = useState(() =>
    window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)').matches : false
  );
  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => setDark(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return dark;
}

export default function App() {
  const prefs = usePrefs();
  const onboarded = useOnboarded();
  const systemDark = useSystemDark();
  const today = useToday();
  const todayInfo = today.info;

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeWeek, setActiveWeek] = useState(() => (todayInfo ? todayInfo.wi : 0));
  const gridRef = useRef(null);

  /* 十连击救援常驻 */
  useRescue();

  /* 偏好 → <html> 数据集属性 */
  const resolvedTheme = prefs.theme === 'system' ? (systemDark ? 'dark' : 'light') : prefs.theme;
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = resolvedTheme;
    root.dataset.style = prefs.style;
    root.dataset.range = prefs.range;
    root.dataset.font = prefs.font;
    root.dataset.size = prefs.fontSize;
    root.dataset.smoothing = prefs.smoothing;

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      const palette = META_COLORS[prefs.style] || META_COLORS.flat;
      meta.setAttribute('content', palette[resolvedTheme] || palette.light);
    }
  }, [prefs, resolvedTheme]);

  /* 自定义 CSS 注入（消毒后写入专用 <style>，永远排在最后保证优先级） */
  useEffect(() => {
    let el = document.getElementById('custom-css');
    if (!el) {
      el = document.createElement('style');
      el.id = 'custom-css';
      document.head.appendChild(el);
    }
    el.textContent = sanitizeCss(prefs.customCSS);
  }, [prefs.customCSS]);

  /* 仅今天时锁定到今天所在周（today 跨午夜变化后同步跟进） */
  useEffect(() => {
    if (prefs.range === 'today' && todayInfo) {
      setActiveWeek(todayInfo.wi);
    }
  }, [prefs.range, todayInfo]);

  const selectWeek = useCallback((index, scrollToday = false) => {
    setActiveWeek(Math.max(0, Math.min(index, WEEKS.length - 1)));
    if (scrollToday) {
      requestAnimationFrame(() => {
        const el = gridRef.current?.querySelector('.day-card.is-today');
        el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      });
    }
  }, []);

  const jumpToday = useCallback(() => {
    if (!todayInfo) return;
    if (prefs.range === 'all') selectWeek(todayInfo.wi, true);
  }, [prefs.range, todayInfo, selectWeek]);

  const activeWeekMeta = WEEKS[activeWeek];

  return (
    <>
      <Header onOpenSettings={() => setSettingsOpen(true)} />

      <main>
        {/* 打印抬头（屏幕上隐藏，打印时显示班级 / 学期 / 周次） */}
        <p className="print-title">
          2025级医学检验技术专业（1）班 · 2026 年秋季学期课表
          {prefs.range === 'all' && activeWeekMeta
            ? `（${activeWeekMeta.label} ${activeWeekMeta.range}）`
            : ''}
        </p>

        <TodayPanel today={today} onJumpToday={jumpToday} />
        <WeekTabs activeWeek={activeWeek} onSelect={(i) => selectWeek(i)} />
        <WeekGrid activeWeek={activeWeek} today={today} gridRef={gridRef} />
        <Teachers />
        <p className="footnote">
          数据来源：2025级医学检验技术专业（1）班课程表（2026 年秋季学期）
        </p>
      </main>

      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onReopenOnboarding={() => setSettingsOpen(false)}
      />

      {!onboarded && <OnboardingWizard />}
      <Toasts />
    </>
  );
}
