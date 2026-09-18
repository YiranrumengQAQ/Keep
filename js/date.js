/* ═══════════════════════════════════════════════════════════
   日期工具
   ═══════════════════════════════════════════════════════════ */
'use strict';
var WEEKDAY_CN = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

function toISO(date) {
  var y = date.getFullYear();
  var m = String(date.getMonth() + 1).padStart(2, '0');
  var d = String(date.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + d;
}

function fmtDate(iso) {
  var parts = iso.split('-');
  return Number(parts[1]) + '月' + Number(parts[2]) + '日';
}

var now = new Date();
var todayISO = toISO(now);

function findToday() {
  for (var wi = 0; wi < WEEKS.length; wi++) {
    var days = WEEKS[wi].days;
    for (var di = 0; di < days.length; di++) {
      if (days[di].d === todayISO) return { wi: wi, di: di };
    }
  }
  return null;
}

var todayInfo = findToday();
