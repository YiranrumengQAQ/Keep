/* ═══════════════════════════════════════════════════════════
   Toast 通知渲染
   ═══════════════════════════════════════════════════════════ */
import { useToasts, dismiss } from '../store/toast.js';

export default function Toasts() {
  const items = useToasts();

  if (items.length === 0) return null;

  return (
    <div className="toast-host" role="status" aria-live="polite">
      {items.map((t) => (
        <button
          key={t.id}
          type="button"
          className={`toast toast-${t.tone}`}
          onClick={() => dismiss(t.id)}
          title="点击关闭"
        >
          {t.message}
        </button>
      ))}
    </div>
  );
}
