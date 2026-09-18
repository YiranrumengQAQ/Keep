/* ═══════════════════════════════════════════════════════════
   轻量 Toast 通知（全局队列，至多保留 3 条）
   ═══════════════════════════════════════════════════════════ */
import { useSyncExternalStore } from 'react';

let items = [];
let seq = 0;
const listeners = new Set();
const timers = new Map();

function emit() { listeners.forEach((fn) => fn()); }

function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function toast(message, tone = 'info', duration = 2600) {
  const id = ++seq;
  items = [...items.slice(-2), { id, message, tone }];
  emit();

  const timer = setTimeout(() => dismiss(id), duration);
  timers.set(id, timer);
  return id;
}

export function dismiss(id) {
  const timer = timers.get(id);
  if (timer) clearTimeout(timer);
  timers.delete(id);
  if (!items.some((t) => t.id === id)) return;
  items = items.filter((t) => t.id !== id);
  emit();
}

export function useToasts() {
  return useSyncExternalStore(subscribe, () => items);
}
