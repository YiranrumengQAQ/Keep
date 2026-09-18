/* ═══════════════════════════════════════════════════════════
   渲染：教师
   ═══════════════════════════════════════════════════════════ */
'use strict';
function renderTeachers() {
  var frag = document.createDocumentFragment();

  for (var i = 0; i < TEACHERS.length; i++) {
    var item = document.createElement('div');
    item.className = 'teacher-item';

    var name = document.createElement('span');
    name.className = 't-name';
    name.textContent = TEACHERS[i][0];

    var person = document.createElement('span');
    person.className = 't-person';
    person.textContent = TEACHERS[i][1];

    item.appendChild(name);
    item.appendChild(person);
    frag.appendChild(item);
  }

  teacherGridEl.replaceChildren(frag);
}
