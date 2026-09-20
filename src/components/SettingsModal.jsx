/* ═══════════════════════════════════════════════════════════
   设置面板：主题 / 风格 / 范围 / 字体 / 自定义 CSS / 偏好管理
   ═══════════════════════════════════════════════════════════ */
import { useEffect, useRef } from 'react';
import { usePref, setPref } from '../store/prefs.js';
import Segmented from './Segmented.jsx';
import StyleGrid from './StyleGrid.jsx';
import FontControls from './FontControls.jsx';
import CustomCssEditor from './CustomCssEditor.jsx';
import PrefManager from './PrefManager.jsx';
import {
  IconGear, IconClose, IconSun, IconMoon, IconSystem,
  IconWeek, IconClock, IconInfo, IconType, IconCode, IconPalette,
  IconBolt
} from './Icon.jsx';

const THEME_OPTIONS = [
  { value: 'light',  icon: <IconSun size={16} />,    label: '浅色' },
  { value: 'dark',   icon: <IconMoon size={16} />,   label: '深色' },
  { value: 'system', icon: <IconSystem size={16} />, label: '跟随系统' }
];

const RANGE_OPTIONS = [
  { value: 'all',   icon: <IconWeek size={16} />,  label: '全部天数' },
  { value: 'today', icon: <IconClock size={16} />, label: '仅今天' }
];

export default function SettingsModal({ open, onClose, onReopenOnboarding }) {
  const theme = usePref('theme');
  const range = usePref('range');
  const hwAccel = usePref('hwAccel');
  const modalRef = useRef(null);
  const lastFocusedRef = useRef(null);

  /* 开关生命周期：焦点管理 + 背景滚动锁定 + 背景 inert 隔离 */
  useEffect(() => {
    if (!open) return;
    lastFocusedRef.current = document.activeElement;
    document.body.classList.add('modal-open');
    const background = [
      document.querySelector('header.app-header'),
      document.querySelector('main')
    ];
    background.forEach((el) => { if (el) el.inert = true; });
    const closeBtn = modalRef.current?.querySelector('.modal-close');
    closeBtn?.focus();

    return () => {
      document.body.classList.remove('modal-open');
      background.forEach((el) => { if (el) el.inert = false; });
      const prev = lastFocusedRef.current;
      if (prev && typeof prev.focus === 'function') prev.focus();
    };
  }, [open]);

  /* Esc 关闭 + 焦点循环 */
  useEffect(() => {
    if (!open) return;

    function onKeyDown(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !modalRef.current) return;
      const focusables = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  return (
    <div
      className={`modal-backdrop${open ? ' is-open' : ''}`}
      role="presentation"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settingsTitle"
        ref={modalRef}
      >
        <div className="modal-head">
          <h2 id="settingsTitle">
            <IconGear size={18} />
            设置
          </h2>
          <button type="button" className="icon-btn modal-close" aria-label="关闭设置" onClick={onClose}>
            <IconClose size={18} />
          </button>
        </div>

        <div className="modal-body">

          <section className="setting-group">
            <h3><IconSun size={13} />主题外观</h3>
            <Segmented label="主题外观" wide options={THEME_OPTIONS} value={theme}
                       onChange={(v) => setPref('theme', v)} />
          </section>

          <section className="setting-group">
            <h3><IconPalette size={13} />界面风格</h3>
            <StyleGrid />
          </section>

          <section className="setting-group">
            <h3><IconWeek size={13} />显示范围</h3>
            <Segmented label="显示范围" wide options={RANGE_OPTIONS} value={range}
                       onChange={(v) => setPref('range', v)} />
            <p className="setting-hint">
              选择「仅今天」后，页面只显示当天课程，并自动隐藏周次切换栏。
            </p>
          </section>

          <section className="setting-group">
            <h3><IconType size={13} />字体排版</h3>
            <FontControls />
          </section>

          <section className="setting-group">
            <h3><IconCode size={13} />自定义 CSS</h3>
            <CustomCssEditor />
          </section>

          <section className="setting-group">
            <h3><IconBolt size={13} />性能</h3>
            <label className="toggle-row">
              <input
                type="checkbox"
                className="toggle-input"
                checked={hwAccel}
                onChange={(e) => setPref('hwAccel', e.target.checked)}
                aria-label="硬件加速"
              />
              <span className="toggle-switch" role="presentation" aria-hidden="true">
                <span className="toggle-thumb" />
              </span>
              <span className="toggle-text">
                <span className="toggle-label">硬件加速</span>
                <span className="toggle-desc">启用 GPU 合成层，滚动与动画更流畅</span>
              </span>
            </label>
            <p className="setting-hint">
              开启后会为卡片和弹窗启用 GPU 加速，可提升滚动和动画流畅度；若出现画面闪烁或耗电异常请关闭。
            </p>
          </section>

          <section className="setting-group">
            <h3><IconGear size={13} />偏好管理</h3>
            <PrefManager onReopenOnboarding={onReopenOnboarding} />
          </section>

          <div className="info-strip">
            <IconInfo size={15} />
            <span>所有偏好仅保存在本机浏览器中，不会上传到任何服务器。页面支持添加到主屏幕，离线也能查看课表。</span>
          </div>

        </div>
      </div>
    </div>
  );
}
