/* ═══════════════════════════════════════════════════════════
   课程数据
   ═══════════════════════════════════════════════════════════ */
'use strict';
var C = {
  trad:   '中国传统文化',
  immu:   '免疫技术与检验',
  bio:    '生物化学检验',
  comm:   '人际沟通',
  micro:  '微生物检验',
  path:   '病理检验技术',
  pe:     '体育',
  midAut: '中秋节放假',
  natDay: '国庆节放假',
  sports: '校运动会'
};

var SPECIAL = new Set([C.midAut, C.natDay, C.sports]);

var HUES = {};
HUES[C.trad]  = 268;
HUES[C.immu]  = 199;
HUES[C.bio]   = 158;
HUES[C.comm]  = 33;
HUES[C.micro] = 352;
HUES[C.path]  = 232;
HUES[C.pe]    = 312;

function P(period, course) { return { p: period, c: course }; }

var MON_FULL = [P('1-2', C.trad), P('3-4', C.pe), P('5-6', C.immu), P('7-8', C.immu)];
var TUE_A    = [P('1-2', C.immu), P('3-4', C.immu)];
var TUE_B    = [P('1-2', C.immu), P('3-4', C.immu), P('5-6', C.comm)];
var WED_FULL = [P('1-2', C.bio), P('3-4', C.bio), P('5-6', C.micro), P('7-8', C.micro)];
var THU_A    = [P('1-2', C.comm), P('3-4', C.pe), P('5-6', C.path), P('7-8', C.path)];
var THU_PATH = [P('1-2', C.path), P('3-4', C.path)];
var THU_MIC  = [P('1-2', C.micro), P('3-4', C.micro)];
var FRI_MIC  = [P('1-2', C.micro), P('3-4', C.micro)];
var THU_W6   = [P('1-2', C.micro), P('3-4', C.micro), P('5-6', C.bio), P('7-8', C.bio)];
var FRI_W6   = [P('1-2', C.micro), P('3-4', C.micro), P('5-6', C.immu), P('7-8', C.immu)];

var WEEKS = [
  {
    label: '第1周', range: '8.31 - 9.6',
    days: [
      { w: '周一', d: '2026-08-31', s: MON_FULL },
      { w: '周二', d: '2026-09-01', s: TUE_A },
      { w: '周三', d: '2026-09-02', s: WED_FULL },
      { w: '周四', d: '2026-09-03', s: THU_A },
      { w: '周五', d: '2026-09-04', s: FRI_MIC }
    ]
  },
  {
    label: '第2周', range: '9.7 - 9.13',
    days: [
      { w: '周一', d: '2026-09-07', s: MON_FULL },
      { w: '周二', d: '2026-09-08', s: TUE_A },
      { w: '周三', d: '2026-09-09', s: WED_FULL },
      { w: '周四', d: '2026-09-10', s: THU_A },
      { w: '周五', d: '2026-09-11', s: FRI_MIC }
    ]
  },
  {
    label: '第3周', range: '9.14 - 9.20',
    days: [
      { w: '周一', d: '2026-09-14', s: MON_FULL },
      { w: '周二', d: '2026-09-15', s: TUE_B },
      { w: '周三', d: '2026-09-16', s: WED_FULL },
      { w: '周四', d: '2026-09-17', s: THU_PATH },
      { w: '周五', d: '2026-09-18', s: FRI_MIC },
      { w: '周六', d: '2026-09-19', s: [] },
      { w: '周日', d: '2026-09-20', s: THU_PATH }
    ]
  },
  {
    label: '第4周', range: '9.21 - 9.27',
    days: [
      { w: '周一', d: '2026-09-21', s: MON_FULL },
      { w: '周二', d: '2026-09-22', s: TUE_B },
      { w: '周三', d: '2026-09-23', s: WED_FULL },
      { w: '周四', d: '2026-09-24', s: THU_MIC },
      { w: '周五', d: '2026-09-25', s: [P('1-2', C.midAut)] }
    ]
  },
  {
    label: '第5周', range: '9.28 - 10.4',
    days: [
      { w: '周一', d: '2026-09-28', s: [P('1-2', C.trad), P('3-4', C.pe), P('5-6', C.comm)] },
      { w: '周二', d: '2026-09-29', s: [P('1-2', C.sports)] },
      { w: '周三', d: '2026-09-30', s: [] },
      { w: '周四', d: '2026-10-01', s: [P('1-2', C.natDay)] },
      { w: '周五', d: '2026-10-02', s: [] }
    ]
  },
  {
    label: '第6周', range: '10.5 - 10.11',
    days: [
      { w: '周一', d: '2026-10-05', s: [] },
      { w: '周二', d: '2026-10-06', s: [] },
      { w: '周三', d: '2026-10-07', s: [] },
      { w: '周四', d: '2026-10-08', s: THU_W6 },
      { w: '周五', d: '2026-10-09', s: FRI_W6 },
      { w: '周六', d: '2026-10-10', s: THU_PATH }
    ]
  }
];

var TEACHERS = [
  ['形势与政策', '赵桐萱'],
  ['大学美育', '吴雅莉'],
  ['体育', '崔丰旭'],
  ['中国传统文化', '张文君'],
  ['人际沟通', '张萌'],
  ['临床检验仪器', '崔妲'],
  ['分子生物学概要', '陈莹莹'],
  ['生物化学检验', '林笑宇'],
  ['微生物学检验', '刘长林'],
  ['寄生虫学检验', '张雅惠'],
  ['免疫学技术与检验', '孙荣华'],
  ['输血检验技术', '崔妲'],
  ['病理检验技术', '崔妲']
];
