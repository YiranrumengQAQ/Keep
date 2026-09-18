/* 深度交互测试：自定义 CSS 生命周期 / 十连击救援 / 默认快照与重置 / 周切换 */
import { readFileSync, readdirSync } from 'node:fs';
import { JSDOM } from 'jsdom';

const html = readFileSync('docs/index.html', 'utf8');
const jsFile = readdirSync('docs/assets').find((f) => f.endsWith('.js'));
const jsCode = readFileSync(`docs/assets/${jsFile}`, 'utf8');

function makeDom() {
  const dom = new JSDOM(html, {
    url: 'https://schedule.test/',
    runScripts: 'dangerously',
    pretendToBeVisual: true,
    beforeParse(window) {
      window.matchMedia = (q) => ({
        matches: false, media: q,
        addEventListener() {}, removeEventListener() {},
        addListener() {}, removeListener() {}, onchange: null, dispatchEvent() { return false; }
      });
      window.scrollTo = () => {};
      window.requestAnimationFrame = (fn) => setTimeout(fn, 16);
      window.cancelAnimationFrame = clearTimeout;
    }
  });
  const script = dom.window.document.createElement('script');
  script.textContent = jsCode;
  dom.window.document.body.appendChild(script);
  return dom;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const fire = (win, el, type = 'click') =>
  el?.dispatchEvent(new win.MouseEvent(type, { bubbles: true }));
const firePointer = (win) =>
  win.document.body.dispatchEvent(new win.MouseEvent('pointerdown', { bubbles: true }));

let failed = 0;
const check = (name, ok) => {
  console.log(ok ? 'PASS ' + name : 'FAIL ' + name);
  if (!ok) failed++;
};

const dom = makeDom();
const win = dom.window;
const doc = win.document;
await sleep(700);

/* ── 走完新手引导全流程 ── */
check('引导出现', !!doc.querySelector('.onboarding'));
for (let i = 0; i < 4; i++) {
  const next = [...doc.querySelectorAll('.ob-nav .btn-primary')][0];
  fire(win, next);
  await sleep(150);
}
check('到达最后一步', doc.body.textContent.includes('全部就绪'));
const startBtn = [...doc.querySelectorAll('.ob-nav .btn-primary')].find((b) => b.textContent.includes('开始使用'));
fire(win, startBtn);
await sleep(150);
check('完成引导后向导关闭', !doc.querySelector('.onboarding'));
check('完成标记写入 localStorage', win.localStorage.getItem('med-lab-ct-onboarded-v1') === '1');

/* ── 打开设置，保存一份自定义 CSS ── */
fire(win, doc.querySelector('.icon-btn'));
await sleep(250);
const editor = doc.querySelector('.css-editor');
check('CSS 编辑器存在', !!editor);
check('设置打开时锁定背景滚动（body.modal-open）', doc.body.classList.contains('modal-open'));
check('设置打开时背景 inert 隔离', !!doc.querySelector('main') && doc.querySelector('main').inert === true);
const setter = Object.getOwnPropertyDescriptor(win.HTMLTextAreaElement.prototype, 'value').set;
setter.call(editor, '.day-card { border-width: 9px; } @import url(evil); <script>alert(1)</' + 'script>');
editor.dispatchEvent(new win.Event('input', { bubbles: true }));
await sleep(60);
const saveBtn = [...doc.querySelectorAll('.css-actions .btn')].find((b) => b.textContent.includes('保存'));
fire(win, saveBtn);
await sleep(150);
const customStyle = doc.getElementById('custom-css');
check('自定义 CSS 已注入', customStyle && customStyle.textContent.includes('border-width: 9px'));
check('保存时已消毒 @import', !customStyle.textContent.includes('@import'));
check('保存时拦截 script 标记', !customStyle.textContent.toLowerCase().includes('<script>'));
check('Toast 出现', !!doc.querySelector('.toast'));

/* ── 十连击救援：快速 10 次 pointerdown ── */
for (let i = 0; i < 10; i++) {
  firePointer(win);
  await sleep(30);
}
await sleep(150);
check('十连击后自定义 CSS 被清空', !doc.getElementById('custom-css')?.textContent.includes('border-width'));
const persisted = win.localStorage.getItem('med-lab-ct-prefs-v4');
check('localStorage 中的 customCSS 同步清空', persisted && JSON.parse(persisted).customCSS === '');

/* ── 保存为默认 → 修改 → 重置 → 应回到保存的配置 ── */
// 先保存默认（当前：flat + system + all）
const saveDefaultBtn = [...doc.querySelectorAll('.pref-actions .btn')].find((b) => b.textContent.includes('保存当前设置为默认'));
fire(win, saveDefaultBtn);
await sleep(120);
check('默认配置快照已写入', !!win.localStorage.getItem('med-lab-ct-default-v4'));

// 修改风格到 pixel
const pixelBtn = [...doc.querySelectorAll('.modal .style-btn')].find((b) => b.querySelector('[data-swatch="pixel"]'));
fire(win, pixelBtn);
await sleep(120);
check('风格切到 pixel', doc.documentElement.dataset.style === 'pixel');

// 重置（需两次点击确认）
const resetBtn = [...doc.querySelectorAll('.pref-actions .btn')].find((b) => b.textContent.includes('重置设置'));
fire(win, resetBtn);
await sleep(100);
check('第一次点击进入确认态', resetBtn.textContent.includes('确认重置'));
fire(win, resetBtn);
await sleep(150);
check('重置后回到保存的默认（flat）', doc.documentElement.dataset.style === 'flat');

/* ── 周标签切换 ── */
const weekTabs = doc.querySelectorAll('.week-tab');
check('周标签 6 个', weekTabs.length === 6);
check('周标签含完整 tab 语义',
  doc.querySelectorAll('.week-tab[role="tab"][aria-controls="weekGrid"]').length === 6);
check('课表容器为 tabpanel', !!doc.querySelector('#weekGrid[role="tabpanel"]'));

fire(win, weekTabs[3]);
await sleep(150);
check('切到第4周', doc.querySelectorAll('.week-tab')[3].classList.contains('is-active'));
check('第4周含中秋放假', doc.body.textContent.includes('中秋节放假'));

/* 第3周：周末补课应有徽章标注 */
fire(win, doc.querySelectorAll('.week-tab')[2]);
await sleep(150);
check('第3周周日补课有徽章', !!doc.querySelector('.day-card .makeup-badge'));

/* 方向键切换周次（roving tabindex + ← →） */
const activeTab = [...doc.querySelectorAll('.week-tab')]
  .find((t) => t.getAttribute('aria-selected') === 'true');
activeTab.dispatchEvent(new win.KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
await sleep(150);
check('方向键切到下一周',
  [...doc.querySelectorAll('.week-tab')].find((t) => t.classList.contains('is-active'))
    ?.textContent.includes('第4周'));

/* ── 仅今天模式 ── */
const rangeTodayBtn = [...doc.querySelectorAll('.modal .seg-btn')].find((b) => b.textContent.includes('仅今天'));
fire(win, rangeTodayBtn);
await sleep(150);
check('仅今天模式隐藏周标签', doc.querySelectorAll('.week-tab').length === 0);
check('仅今天模式锁定今天（周五·微生物）', doc.querySelectorAll('.week-grid.single .day-card').length === 1);

console.log(failed === 0 ? '\nINTERACTION OK' : `\nINTERACTION FAILED (${failed})`);
process.exit(failed === 0 ? 0 : 1);
