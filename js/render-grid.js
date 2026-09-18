/* ═══════════════════════════════════════════════════════════
   渲染：周课表
   ═══════════════════════════════════════════════════════════ */
'use strict';
function buildSlot(item) {
  var li = document.createElement('li');
  li.className = 'slot';

  if (SPECIAL.has(item.c)) {
    li.classList.add('is-special');
  } else if (HUES[item.c] !== undefined) {
    li.style.setProperty('--h', String(HUES[item.c]));
  }

  var p = document.createElement('span');
  p.className = 'slot-period';
  p.textContent = item.p + '节';

  var c = document.createElement('span');
  c.className = 'slot-course';
  c.textContent = item.c;

  li.appendChild(p);
  li.appendChild(c);
  return li;
}

function buildDayCard(day) {
  var isToday = day.d === todayISO;

  var card = document.createElement('article');
  card.className = 'day-card' + (isToday ? ' is-today' : '');

  var head = document.createElement('header');
  head.className = 'day-head';

  var nameEl = document.createElement('span');
  nameEl.className = 'day-name';
  nameEl.textContent = day.w;

  var dateEl = document.createElement('span');
  dateEl.className = 'day-date';
  dateEl.textContent = fmtDate(day.d);

  head.appendChild(nameEl);
  head.appendChild(dateEl);

  if (isToday) {
    var badge = document.createElement('span');
    badge.className = 'today-badge';
    badge.textContent = '今天';
    head.appendChild(badge);
  }

  card.appendChild(head);

  var list = document.createElement('ul');
  list.className = 'slot-list';

  if (day.s.length === 0) {
    var empty = document.createElement('li');
    empty.className = 'slot-empty';
    empty.textContent = '无课';
    list.appendChild(empty);
  } else {
    for (var k = 0; k < day.s.length; k++) {
      list.appendChild(buildSlot(day.s[k]));
    }
  }

  card.appendChild(list);
  return card;
}

function buildEmptyState(message) {
  var wrap = document.createElement('div');
  wrap.className = 'empty-state';

  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.6');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');

  var r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  r.setAttribute('x', '3');
  r.setAttribute('y', '4.5');
  r.setAttribute('width', '18');
  r.setAttribute('height', '17');
  r.setAttribute('rx', '3');

  var l1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  l1.setAttribute('d', 'M8 2.5v4M16 2.5v4M3 10.5h18');

  svg.appendChild(r);
  svg.appendChild(l1);

  var p = document.createElement('p');
  p.textContent = message;

  wrap.appendChild(svg);
  wrap.appendChild(p);
  return wrap;
}

function collectDays() {
  if (prefs.range === 'today') {
    if (!todayInfo) return [];
    var w = WEEKS[todayInfo.wi];
    return w ? [w.days[todayInfo.di]] : [];
  }
  var week = WEEKS[activeWeek];
  return week ? week.days.slice() : [];
}

function renderWeekGrid() {
  var days = collectDays();
  var isSingle = prefs.range === 'today';

  gridEl.classList.toggle('single', isSingle);

  var frag = document.createDocumentFragment();

  if (days.length === 0) {
    frag.appendChild(buildEmptyState(
      isSingle
        ? '今天不在本学期教学周内，暂无课程安排。'
        : '本周暂无课程安排。'
    ));
  } else {
    for (var i = 0; i < days.length; i++) {
      frag.appendChild(buildDayCard(days[i]));
    }
  }

  gridEl.replaceChildren(frag);
}
