/* ═══════════════════════════════════════════════════════════
   自定义 CSS 消毒器
   ─ 自定义 CSS 经此函数过滤后才允许落盘/注入 <style>
   ─ 配合 CSP（无外部域、无 form/base/object）实现纵深防御
   ═══════════════════════════════════════════════════════════ */
const MAX_LEN = 40000;

export function sanitizeCss(input) {
  let css = String(input == null ? '' : input);
  if (css.length > MAX_LEN) css = css.slice(0, MAX_LEN);

  /* CSS 语法不需要 "<"，从根上杜绝 </style> 等闭合逃逸标记 */
  css = css.replace(/</g, '');

  css = css
    /* 阻断外联导入（CSP 已兜底，这里再挡一层，同时避免诡异网络请求） */
    .replace(/@import[^;}]*/gi, '/* blocked */')
    .replace(/@charset[^;}]*/gi, '/* blocked */')
    /* 阻断历史 IE 脚本表达式与伪协议 */
    .replace(/expression\s*\([^)]*\)/gi, '/* blocked */')
    .replace(/javascript\s*:/gi, 'blocked:')
    .replace(/vbscript\s*:/gi, 'blocked:')
    /* 阻断浏览器遗留可执行绑定特性 */
    .replace(/-moz-binding\s*:[^;}]+/gi, '/* blocked */')
    .replace(/\bbehavior\s*:[^;}]+/gi, '/* blocked */');

  return css;
}
