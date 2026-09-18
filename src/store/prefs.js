/* ═══════════════════════════════════════════════════════════
   偏好中心：单一可信源（useSyncExternalStore 外置 store）
   ─ 所有读写经白名单校验；localStorage 损坏/隐私模式均静默降级
   ═══════════════════════════════════════════════════════════ */
import { useSyncExternalStore } from 'react';

export const STORAGE_KEY = 'med-lab-ct-prefs-v4';
const LEGACY_KEY = 'med-lab-ct-prefs-v3';
const DEFAULT_KEY = 'med-lab-ct-default-v4';
const ONBOARD_KEY = 'med-lab-ct-onboarded-v1';

export const VALID = {
  theme: ['light', 'dark', 'system'],
  style: ['flat', 'clay', 'neobrutal', 'glass', 'terminal', 'paper', 'pixel', 'skeuo'],
  range: ['all', 'today'],
  font: ['system', 'serif', 'rounded', 'mono', 'kai'],
  fontSize: ['s', 'm', 'l', 'xl'],
  smoothing: ['auto', 'smooth', 'sharp']
};

export const FACTORY = Object.freeze({
  theme: 'system',
  style: 'flat',
  range: 'all',
  font: 'system',
  fontSize: 'm',
  smoothing: 'auto',
  customCSS: ''
});

const listeners = new Set();

function emit() { listeners.forEach((fn) => fn()); }

function readJSON(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function sanitizePrefs(p) {
  const out = { ...FACTORY };
  if (!p || typeof p !== 'object' || Array.isArray(p)) return out;
  for (const key of Object.keys(VALID)) {
    if (VALID[key].includes(p[key])) out[key] = p[key];
  }
  if (typeof p.customCSS === 'string') out.customCSS = p.customCSS.slice(0, 40000);
  return out;
}

/* 初始状态：v4 → v3 迁移 → 出厂值 */
let state = sanitizePrefs(readJSON(STORAGE_KEY) ?? readJSON(LEGACY_KEY));

let onboardedFlag = (function () {
  try { return localStorage.getItem(ONBOARD_KEY) === '1'; } catch (e) { return false; }
})();

function persist() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* 存储不可用静默 */ }
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getPrefs() { return state; }

export function usePrefs() {
  return useSyncExternalStore(subscribe, () => state);
}

export function usePref(key) {
  return useSyncExternalStore(subscribe, () => state[key]);
}

export function setPref(key, value) {
  if (!(key in FACTORY)) return;
  if (VALID[key] && !VALID[key].includes(value)) return;
  if (key === 'customCSS') value = String(value ?? '').slice(0, 40000);
  if (state[key] === value) return;
  state = { ...state, [key]: value };
  persist();
  emit();
}

function applyAll(next) {
  state = sanitizePrefs(next);
  persist();
  emit();
}

/* ── 新手引导标记（独立于偏好：重置偏好不会重播引导） ── */
export function useOnboarded() {
  return useSyncExternalStore(subscribe, () => onboardedFlag);
}

export function setOnboarded(v) {
  onboardedFlag = !!v;
  try { localStorage.setItem(ONBOARD_KEY, v ? '1' : '0'); } catch (e) { /* 静默 */ }
  emit();
}

/* ── 偏好管理：默认配置快照 / 重置 ── */
export function saveAsDefault() {
  try {
    localStorage.setItem(DEFAULT_KEY, JSON.stringify(state));
    return true;
  } catch (e) {
    return false;
  }
}

export function hasUserDefault() {
  return readJSON(DEFAULT_KEY) !== null;
}

/* 重置：优先回到用户保存的默认配置，否则回出厂值。
   返回 'user' | 'factory' 供界面提示。 */
export function resetSettings() {
  const snap = readJSON(DEFAULT_KEY);
  if (snap) {
    applyAll(snap);
    return 'user';
  }
  applyAll(FACTORY);
  return 'factory';
}
