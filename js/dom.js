/* ═══════════════════════════════════════════════════════════
   DOM 引用
   ═══════════════════════════════════════════════════════════ */
'use strict';
var root = document.documentElement;
var headerEl = document.getElementById('appHeader');
var gridEl = document.getElementById('weekGrid');
var tabsEl = document.getElementById('weekTabs');
var todayPanelEl = document.getElementById('todayPanel');
var teacherGridEl = document.getElementById('teacherGrid');
var modalEl = document.getElementById('settingsModal');

var themeButtons = Array.prototype.slice.call(document.querySelectorAll('.theme-btn'));
var styleButtons = Array.prototype.slice.call(document.querySelectorAll('.style-btn'));
var rangeButtons = Array.prototype.slice.call(document.querySelectorAll('.range-btn'));
