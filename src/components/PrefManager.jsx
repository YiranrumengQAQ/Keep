/* ═══════════════════════════════════════════════════════════
   偏好管理：保存默认为 / 重置设置 / 重播新手引导
   ═══════════════════════════════════════════════════════════ */
import { useState, useRef, useEffect } from 'react';
import { saveAsDefault, resetSettings, setOnboarded } from '../store/prefs.js';
import { toast } from '../store/toast.js';
import { IconReset, IconSave, IconSpark } from './Icon.jsx';

export default function PrefManager({ onReopenOnboarding }) {
  const [confirming, setConfirming] = useState(false);
  const timerRef = useRef(0);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  function handleSaveDefault() {
    if (saveAsDefault()) {
      toast('已把当前设置保存为默认配置', 'ok');
    } else {
      toast('保存失败：浏览器存储不可用', 'warn');
    }
  }

  function handleReset() {
    if (!confirming) {
      setConfirming(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setConfirming(false), 3200);
      return;
    }
    clearTimeout(timerRef.current);
    setConfirming(false);
    const source = resetSettings();
    toast(source === 'user' ? '已恢复你保存的默认配置' : '已恢复出厂设置', 'ok');
  }

  function handleOnboarding() {
    setOnboarded(false);
    if (onReopenOnboarding) onReopenOnboarding();
  }

  return (
    <div className="pref-manager">
      <div className="pref-actions">
        <button type="button" className="btn" onClick={handleSaveDefault}>
          <IconSave size={15} />
          保存当前设置为默认
        </button>
        <button
          type="button"
          className={`btn btn-danger${confirming ? ' is-armed' : ''}`}
          onClick={handleReset}
          aria-live="polite"
        >
          <IconReset size={15} />
          {confirming ? '再次点击确认重置' : '重置设置'}
        </button>
        <button type="button" className="btn" onClick={handleOnboarding}>
          <IconSpark size={15} />
          重新打开新手引导
        </button>
      </div>
      <p className="setting-hint">
        「保存为默认」后，重置将回到你保存的配置；未保存过则回到出厂设置。重置不会重播新手引导。
      </p>
    </div>
  );
}
