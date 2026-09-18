/* ═══════════════════════════════════════════════════════════
   渲染：周次标签
   ═══════════════════════════════════════════════════════════ */
'use strict';
function renderWeekTabs() {
  tabsEl.hidden = prefs.range === 'today';
  if (prefs.range === 'today') return;

  var frag = document.createDocumentFragment();

  for (var i = 0; i < WEEKS.length; i++) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'week-tab';
    btn.dataset.week = String(i);
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', i === activeWeek ? 'true' : 'false');

    if (i === activeWeek) btn.classList.add('is-active');

    var lbl = document.createElement('span');
    lbl.className = 'wt-label';
    lbl.textContent = WEEKS[i].label;

    var rng = document.createElement('span');
    rng.className = 'wt-range';
    rng.textContent = WEEKS[i].range;

    btn.appendChild(lbl);
    btn.appendChild(rng);
    frag.appendChild(btn);
  }

  tabsEl.replaceChildren(frag);
}
