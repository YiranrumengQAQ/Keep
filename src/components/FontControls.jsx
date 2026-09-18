/* ═══════════════════════════════════════════════════════════
   字体排版控制：字族 / 字号 / 渲染平滑
   设置面板与新手引导共用
   ═══════════════════════════════════════════════════════════ */
import { usePref, setPref } from '../store/prefs.js';
import Segmented from './Segmented.jsx';

const FONTS = [
  { id: 'system',  name: '系统默认', sample: 'Aa 课程永', hint: '跟随系统界面字体' },
  { id: 'serif',   name: '衬线宋体', sample: 'Aa 课程永', hint: '宋体 / Noto Serif' },
  { id: 'rounded', name: '圆体',     sample: 'Aa 课程永', hint: '柔和圆润字腔' },
  { id: 'mono',    name: '等宽字体', sample: 'Aa 课程永', hint: '代码同款对齐感' },
  { id: 'kai',     name: '楷体',     sample: 'Aa 课程永', hint: '手写书卷气息' }
];

const SIZES = [
  { value: 's',  label: '偏小' },
  { value: 'm',  label: '标准' },
  { value: 'l',  label: '偏大' },
  { value: 'xl', label: '特大' }
];

const SMOOTHING = [
  { value: 'auto',   label: '自动' },
  { value: 'smooth', label: '平滑' },
  { value: 'sharp',  label: '锐利' }
];

export default function FontControls() {
  const font = usePref('font');
  const size = usePref('fontSize');
  const smoothing = usePref('smoothing');

  return (
    <div className="font-controls">
      <div className="font-field">
        <span className="font-field-label">字体</span>
        <div className="font-picker" role="radiogroup" aria-label="字体">
          {FONTS.map((f) => {
            const active = f.id === font;
            return (
              <button
                key={f.id}
                type="button"
                className={`font-option${active ? ' is-active' : ''}`}
                role="radio"
                aria-checked={active}
                data-font-preview={f.id}
                onClick={() => setPref('font', f.id)}
              >
                <span className="font-sample" aria-hidden="true">{f.sample}</span>
                <span className="font-meta">
                  <span className="font-name">{f.name}</span>
                  <small className="font-hint">{f.hint}</small>
                </span>
              </button>
            );
          })}
        </div>
        <p className="setting-hint">
          提示：选择「复古像素风」界面风格时会自动启用像素 Web 字体（联网加载，失败则回退等宽字体）。
        </p>
      </div>

      <div className="font-field">
        <span className="font-field-label">字号</span>
        <Segmented
          label="字号"
          wide
          options={SIZES}
          value={size}
          onChange={(v) => setPref('fontSize', v)}
        />
      </div>

      <div className="font-field">
        <span className="font-field-label">字体渲染（抗锯齿）</span>
        <Segmented
          label="字体渲染"
          wide
          options={SMOOTHING}
          value={smoothing}
          onChange={(v) => setPref('smoothing', v)}
        />
        <p className="setting-hint">
          「平滑」开启全灰阶抗锯齿（macOS / iOS 效果显著）；「锐利」关闭平滑，边缘更硬，适合低分屏。
        </p>
      </div>
    </div>
  );
}
