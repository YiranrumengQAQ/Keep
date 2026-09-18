/* ═══════════════════════════════════════════════════════════
   分段控件（主题 / 范围 / 字号 / 平滑 等共用）
   ═══════════════════════════════════════════════════════════ */
export default function Segmented({ label, options, value, onChange, wide = false }) {
  return (
    <div className={`segmented${wide ? ' seg-wide' : ''}`} role="radiogroup" aria-label={label}>
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            className={`seg-btn${active ? ' is-active' : ''}`}
            role="radio"
            aria-checked={active}
            title={opt.title || undefined}
            onClick={() => onChange(opt.value)}
          >
            {opt.icon}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
