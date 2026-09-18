/* 构建产物冒烟测试：jsdom 中真实挂载 React 应用并断言关键内容。
   运行：node scripts/smoke-test.mjs */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { JSDOM } from 'jsdom';

const html = readFileSync('docs/index.html', 'utf8');
const jsFile = readdirSync('docs/assets').find((f) => f.endsWith('.js'));
const jsCode = readFileSync(`docs/assets/${jsFile}`, 'utf8');

const dom = new JSDOM(html, {
  url: 'https://schedule.test/',
  runScripts: 'dangerously',
  pretendToBeVisual: true,
  beforeParse(window) {
    // jsdom 无 matchMedia / rAF 视觉环境，做最小 polyfill
    window.matchMedia = (q) => ({
      matches: false, media: q,
      addEventListener() {}, removeEventListener() {},
      addListener() {}, removeListener() {}, onchange: null, dispatchEvent() { return false; }
    });
    window.scrollTo = () => {};
    window.requestAnimationFrame = (fn) => setTimeout(fn, 16);
    window.cancelAnimationFrame = clearTimeout;
    if (!window.PointerEvent) window.PointerEvent = window.MouseEvent;
  }
});

// 注入构建后的应用脚本
const script = dom.window.document.createElement('script');
script.textContent = jsCode;
dom.window.document.body.appendChild(script);

await new Promise((r) => setTimeout(r, 800));

const doc = dom.window.document;
const bodyText = doc.body.textContent || '';

/* 「今天」相关断言按运行当天动态计算，不硬编码日期 */
const nowD = new Date();
const dateText = `${nowD.getFullYear()}年${nowD.getMonth() + 1}月${nowD.getDate()}日`;

const checks = [
  ['React 挂载', doc.getElementById('root')?.children.length > 0],
  ['班级标题', bodyText.includes('2025级医学检验技术专业（1）班')],
  ['今日面板（按当天日期断言）', bodyText.includes(dateText)],
  ['今日课程内容（课程条目或休息提示）',
    doc.querySelectorAll('.today-card .today-slot, .today-card .today-note').length > 0],
  ['周次标签', bodyText.includes('第1周')],
  ['教师列表', bodyText.includes('刘长林')],
  ['未排课课程有标记', bodyText.includes('未排课')],
  ['PWA：sw.js 已随构建部署', existsSync('docs/sw.js')],
  ['PWA：PNG 图标齐全',
    existsSync('docs/icons/icon-192.png') &&
    existsSync('docs/icons/icon-512.png') &&
    existsSync('docs/icons/maskable-512.png') &&
    existsSync('docs/icons/apple-touch-icon.png')],
  ['新手引导出现（首次访问）', !!doc.querySelector('.onboarding')],
  ['引导欢迎语', bodyText.includes('欢迎使用课程表')],
];

let failed = 0;
for (const [name, ok] of checks) {
  console.log(ok ? 'PASS ' + name : 'FAIL ' + name);
  if (!ok) failed++;
}

// 交互模拟：点击「跳过引导」→ 应出现设置按钮；点设置 → 8 种风格齐全
if (!failed) {
  const skipBtn = doc.querySelector('.ob-skip');
  skipBtn?.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));
  await new Promise((r) => setTimeout(r, 200));

  const root = doc.documentElement;
  const onboardingGone = !doc.querySelector('.onboarding');
  console.log(onboardingGone ? 'PASS 跳过引导后向导关闭' : 'FAIL 引导未关闭');
  if (!onboardingGone) failed++;

  // 打开设置
  const settingsBtn = doc.querySelector('.icon-btn');
  settingsBtn?.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));
  await new Promise((r) => setTimeout(r, 300));
  const styleBtns = doc.querySelectorAll('.modal .style-btn');
  console.log(styleBtns.length === 8 ? 'PASS 设置面板含 8 种风格' : `FAIL 风格数量=${styleBtns.length}`);
  if (styleBtns.length !== 8) failed++;

  const fontBtns = doc.querySelectorAll('.modal .font-option');
  console.log(fontBtns.length === 5 ? 'PASS 字体选项 5 种' : `FAIL 字体选项=${fontBtns.length}`);
  if (fontBtns.length !== 5) failed++;

  // 切换到终端风格
  const terminalBtn = [...styleBtns].find((b) => b.querySelector('[data-swatch="terminal"]'));
  terminalBtn?.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));
  await new Promise((r) => setTimeout(r, 200));
  console.log(root.dataset.style === 'terminal' ? 'PASS 终端风格已应用到 <html>' : 'FAIL 风格切换无效');
  if (root.dataset.style !== 'terminal') failed++;

  // 自定义 CSS 保存 + 十连击救援
  const cssText = doc.body.textContent.includes('自定义样式');
  console.log(cssText ? 'PASS 自定义 CSS 区域存在' : 'FAIL 自定义 CSS 区域缺失');
  if (!cssText) failed++;
}

console.log(failed === 0 ? '\nSMOKE OK' : `\nSMOKE FAILED (${failed})`);
process.exit(failed === 0 ? 0 : 1);
