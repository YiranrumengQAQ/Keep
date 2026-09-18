/* ═══════════════════════════════════════════════════════════
   新手引导：首次打开网页的分步偏好向导
   步骤：欢迎 → 主题外观 → 界面风格 → 字体排版 → 完成
   每一步的选择都实时生效（直接写入偏好中心）
   ═══════════════════════════════════════════════════════════ */
import { useState, useEffect, useRef } from 'react';
import { usePref, setPref, setOnboarded } from '../store/prefs.js';
import Segmented from './Segmented.jsx';
import StyleGrid from './StyleGrid.jsx';
import FontControls from './FontControls.jsx';
import {
  IconCalendar, IconSun, IconMoon, IconSystem, IconPalette,
  IconType, IconFlag, IconArrowLeft, IconArrowRight, IconShield, IconCode
} from './Icon.jsx';

const THEME_OPTIONS = [
  { value: 'light',  icon: <IconSun size={16} />,    label: '浅色' },
  { value: 'dark',   icon: <IconMoon size={16} />,   label: '深色' },
  { value: 'system', icon: <IconSystem size={16} />, label: '跟随系统' }
];

export default function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const theme = usePref('theme');
  const bodyRef = useRef(null);
  const TOTAL = 5;

  /* 引导期间锁定背景滚动 */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  /* 每步切换时内容滚回顶部，并聚焦当前步骤 */
  useEffect(() => {
    const el = bodyRef.current;
    if (el && typeof el.scrollTo === 'function') {
      el.scrollTo({ top: 0, behavior: 'auto' });
    } else if (el) {
      el.scrollTop = 0;
    }
    el?.querySelector('.ob-step-title')?.focus?.();
  }, [step]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight' && step < TOTAL - 1) setStep((s) => Math.min(TOTAL - 1, s + 1));
      if (e.key === 'ArrowLeft' && step > 0) setStep((s) => Math.max(0, s - 1));
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [step]);

  function finish() { setOnboarded(true); }

  const steps = [
    {
      key: 'welcome',
      icon: <IconCalendar size={34} />,
      title: '欢迎使用课程表',
      body: (
        <div className="ob-welcome">
          <p>
            这是 2025级医学检验技术专业（1）班 的 2026 年秋季学期课程表。
            接下来用几个简单步骤，定制你的专属外观。
          </p>
          <ul className="ob-feature-list">
            <li><IconPalette size={15} /><span>8 种界面风格，从极简扁平到 CRT 终端</span></li>
            <li><IconType size={15} /><span>字体、字号、抗锯齿均可微调</span></li>
            <li><IconCode size={15} /><span>支持注入自定义 CSS，深度改造页面</span></li>
            <li><IconShield size={15} /><span>所有数据只存在本机，安全加固无追踪</span></li>
          </ul>
        </div>
      )
    },
    {
      key: 'theme',
      icon: <IconSun size={30} />,
      title: '第一步 · 选择主题外观',
      body: (
        <div className="ob-block">
          <p className="ob-desc">白天的清爽、夜晚的护眼，或跟随系统自动切换。</p>
          <Segmented label="主题外观" wide options={THEME_OPTIONS} value={theme}
                     onChange={(v) => setPref('theme', v)} />
        </div>
      )
    },
    {
      key: 'style',
      icon: <IconPalette size={30} />,
      title: '第二步 · 选择界面风格',
      body: (
        <div className="ob-block">
          <p className="ob-desc">8 种截然不同的视觉语言，点选即可实时预览整个页面。</p>
          <StyleGrid />
        </div>
      )
    },
    {
      key: 'font',
      icon: <IconType size={30} />,
      title: '第三步 · 字体与排版',
      body: (
        <div className="ob-block">
          <p className="ob-desc">挑一套顺眼的字体，再微调字号与渲染平滑度。</p>
          <FontControls />
        </div>
      )
    },
    {
      key: 'done',
      icon: <IconFlag size={30} />,
      title: '全部就绪',
      body: (
        <div className="ob-welcome">
          <p>偏好已保存到本机，即时生效。之后随时可以打开右上角「设置」重新调整。</p>
          <ul className="ob-feature-list">
            <li><IconCode size={15} /><span>设置 → 自定义 CSS：贴入你的样式代码，保存即生效</span></li>
            <li><IconShield size={15} /><span>如果样式把页面改崩了：快速连点页面 10 下立即恢复</span></li>
            <li><IconCalendar size={15} /><span>支持添加到主屏幕，像 App 一样离线使用</span></li>
          </ul>
        </div>
      )
    }
  ];

  const isLast = step === TOTAL - 1;
  const isFirst = step === 0;

  return (
    <div className="onboarding" role="dialog" aria-modal="true" aria-label="新手引导">
      <div className="ob-card">
        <div className="ob-head">
          <div className="ob-step-badge">
            {steps[step].icon}
            <span className="ob-step-count">第 {step + 1} 步 / 共 {TOTAL} 步</span>
          </div>
          <button type="button" className="ob-skip" onClick={finish}>
            跳过引导
          </button>
        </div>

        <div className="ob-body" ref={bodyRef}>
          <h2 className="ob-step-title" tabIndex={-1}>{steps[step].title}</h2>
          {steps[step].body}
        </div>

        <div className="ob-foot">
          <div className="ob-dots" aria-hidden="true">
            {steps.map((s, i) => (
              <button
                key={s.key}
                type="button"
                className={`ob-dot${i === step ? ' is-current' : ''}${i < step ? ' is-done' : ''}`}
                aria-label={`跳到第 ${i + 1} 步`}
                onClick={() => setStep(i)}
                tabIndex={-1}
              />
            ))}
          </div>
          <div className="ob-nav">
            {!isFirst && (
              <button type="button" className="btn" onClick={() => setStep(step - 1)}>
                <IconArrowLeft size={15} />
                上一步
              </button>
            )}
            {isLast ? (
              <button type="button" className="btn btn-primary" onClick={finish}>
                开始使用
                <IconArrowRight size={15} />
              </button>
            ) : (
              <button type="button" className="btn btn-primary" onClick={() => setStep(step + 1)}>
                下一步
                <IconArrowRight size={15} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
