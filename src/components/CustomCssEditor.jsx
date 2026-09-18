/* ═══════════════════════════════════════════════════════════
   自定义 CSS 编辑器
   ─ 保存即生效；输入经 sanitizeCss 消毒后才落盘/注入
   ─ 救援机制：任意页面位置快速连点 10 下自动清空恢复
   ═══════════════════════════════════════════════════════════ */
import { useState, useEffect, useRef } from 'react';
import { usePref, setPref } from '../store/prefs.js';
import { sanitizeCss } from '../utils/sanitizeCss.js';
import { toast } from '../store/toast.js';
import { IconCode, IconShield } from './Icon.jsx';

export default function CustomCssEditor() {
  const saved = usePref('customCSS');
  const [draft, setDraft] = useState(saved);
  const taRef = useRef(null);

  /* 外部变更（十连击救援 / 重置）时同步草稿 */
  useEffect(() => {
    setDraft(saved);
  }, [saved]);

  const dirty = draft !== saved;

  function save() {
    setPref('customCSS', sanitizeCss(draft));
    toast('自定义样式已保存并生效', 'ok');
  }

  function clear() {
    setDraft('');
    setPref('customCSS', '');
    toast('已清空自定义样式', 'ok');
  }

  const cleanLen = sanitizeCss(saved).length;

  return (
    <div className="custom-css">
      <textarea
        ref={taRef}
        className="css-editor"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder={'/* 在这里编写你的 CSS，例如：\n   .day-card { border-width: 3px; }\n   main { max-width: 1000px; } */'}
        spellCheck="false"
        autoCorrect="off"
        autoCapitalize="off"
        aria-label="自定义 CSS 代码"
        rows={7}
      />
      <div className="css-actions">
        <button type="button" className="btn btn-primary" onClick={save} disabled={!dirty}>
          保存并应用
        </button>
        <button type="button" className="btn" onClick={clear} disabled={!saved && !draft}>
          清空
        </button>
        <span className="css-status" role="status">
          {saved
            ? (dirty ? `已生效 ${cleanLen} 字符 · 有未保存修改` : `已生效 ${cleanLen} 字符`)
            : '未启用'}
        </span>
      </div>
      <div className="setting-hint css-rescue-hint">
        <IconShield size={13} />
        <span>
          样式崩溃自救：在页面任意位置<strong>快速连点 10 下</strong>，即刻清除自定义样式并恢复。
          危险语法（javascript:、@import 等）会在保存时自动拦截。
        </span>
      </div>
    </div>
  );
}
