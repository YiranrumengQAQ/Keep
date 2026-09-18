/* ═══════════════════════════════════════════════════════════
   应用入口：样式按级联顺序导入，顺序即优先级
   ═══════════════════════════════════════════════════════════ */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { initPwa } from './utils/pwa.js';

/* 00 基础 + 字体系统 */
import './styles/base.css';
import './styles/typography.css';

/* 01-08 八种界面风格主题（越靠后定义优先级越高） */
import './styles/theme-flat.css';
import './styles/theme-clay.css';
import './styles/theme-neobrutal.css';
import './styles/theme-glass.css';
import './styles/theme-terminal.css';
import './styles/theme-paper.css';
import './styles/theme-pixel.css';
import './styles/theme-skeuo.css';

/* 组件结构样式 */
import './styles/header.css';
import './styles/segmented.css';
import './styles/layout.css';
import './styles/today.css';
import './styles/week-tabs.css';
import './styles/week-grid.css';
import './styles/teachers.css';
import './styles/settings.css';
import './styles/onboarding.css';
import './styles/toast.css';
import './styles/responsive.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

initPwa();
