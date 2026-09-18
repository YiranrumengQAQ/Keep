/* ═══════════════════════════════════════════════════════════
   渲染：今日面板
   ═══════════════════════════════════════════════════════════ */
'use strict';
function buildChip(item, className) {
  var el = document.createElement('div');
  el.className = className;

  if (SPECIAL.has(item.c)) {
    el.classList.add('is-special');
  } else if (HUES[item.c] !== undefined) {
    el.style.setProperty('--h', String(HUES[item.c]));
  }

  var p = document.createElement('span');
  p.className = 'ts-period';
  p.textContent = item.p + '节';

  var c = document.createElement('span');
  c.className = 'ts-course';
  c.textContent = item.c;

  el.appendChild(p);
  el.appendChild(c);
  return el;
}

function renderTodayPanel() {
  var card = document.createElement('div');
  card.className = 'today-card';

  var head = document.createElement('div');
  head.className = 'today-head';

  var label = document.createElement('span');
  label.className = 'today-label';
  label.textContent = '今天';

  var dateEl = document.createElement('span');
  dateEl.className = 'today-date';
  dateEl.textContent = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' +
                       now.getDate() + '日 ' + WEEKDAY_CN[now.getDay()];

  head.appendChild(label);
  head.appendChild(dateEl);

  if (todayInfo) {
    var week = WEEKS[todayInfo.wi];
    var day = week.days[todayInfo.di];

    var wk = document.createElement('span');
    wk.className = 'today-week';
    wk.textContent = week.label + ' · ' + day.w;
    head.appendChild(wk);

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ghost-btn';
    btn.dataset.action = 'jump-today';
    btn.textContent = '定位到今日';
    head.appendChild(btn);

    card.appendChild(head);

    var slots = document.createElement('div');
    slots.className = 'today-slots';

    if (day.s.length === 0) {
      var note = document.createElement('p');
      note.className = 'today-note';
      note.textContent = '今天没有安排课程，可以好好休息。';
      slots.appendChild(note);
    } else {
      for (var i = 0; i < day.s.length; i++) {
        slots.appendChild(buildChip(day.s[i], 'today-slot'));
      }
    }

    card.appendChild(slots);
  } else {
    card.appendChild(head);

    var tip = document.createElement('p');
    tip.className = 'today-note';
    tip.textContent = '当前日期不在本学期教学周内（2026.8.31 - 11.1），下方展示第 1 周课表。';
    card.appendChild(tip);
  }

  todayPanelEl.replaceChildren(card);
}
