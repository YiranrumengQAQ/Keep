/* ═══════════════════════════════════════════════════════════
   十连击救援：自定义 CSS 把页面改崩时，
   在任意位置快速连点 10 下即可清空自定义样式恢复默认。
   仅在存在自定义样式时激活，避免误触。
   ═══════════════════════════════════════════════════════════ */
import { useEffect } from 'react';
import { getPrefs, setPref } from '../store/prefs.js';
import { toast } from '../store/toast.js';

const NEED = 10;      // 需要连点次数
const GAP = 900;      // 相邻两次点击的最大间隔（毫秒）

export default function useRescue() {
  useEffect(() => {
    let count = 0;
    let timer = 0;

    function reset() { count = 0; }

    function onPointerDown() {
      if (!getPrefs().customCSS) { reset(); return; }

      count += 1;
      clearTimeout(timer);
      timer = setTimeout(reset, GAP);

      if (count === 5) {
        toast('继续快速点击 5 次，将清除自定义样式', 'warn', 2000);
      }
      if (count >= NEED) {
        reset();
        setPref('customCSS', '');
        toast('已清除自定义样式，页面恢复正常', 'ok', 3200);
      }
    }

    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      clearTimeout(timer);
    };
  }, []);
}
