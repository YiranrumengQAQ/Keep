/* ═══════════════════════════════════════════════════════════
   课程数据
   ═══════════════════════════════════════════════════════════ */
export const C = {
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

export const SPECIAL = new Set([C.midAut, C.natDay, C.sports]);

export const HUES = {
  [C.trad]: 268,
  [C.immu]: 199,
  [C.bio]: 158,
  [C.comm]: 33,
  [C.micro]: 352,
  [C.path]: 232,
  [C.pe]: 312
};

/* 节次对应时刻（仅供参考，如需调整在此修改） */
export const PERIOD_TIMES = {
  '1-2': '08:00 - 09:35',
  '3-4': '09:55 - 11:30',
  '5-6': '13:30 - 15:05',
  '7-8': '15:25 - 17:00'
};

function P(period, course) { return { p: period, c: course }; }

const MON_FULL = [P('1-2', C.trad), P('3-4', C.pe), P('5-6', C.immu), P('7-8', C.immu)];
const TUE_A    = [P('1-2', C.immu), P('3-4', C.immu)];
const TUE_B    = [P('1-2', C.immu), P('3-4', C.immu), P('5-6', C.comm)];
const WED_FULL = [P('1-2', C.bio), P('3-4', C.bio), P('5-6', C.micro), P('7-8', C.micro)];
const THU_A    = [P('1-2', C.comm), P('3-4', C.pe), P('5-6', C.path), P('7-8', C.path)];
const THU_PATH = [P('1-2', C.path), P('3-4', C.path)];
const THU_MIC  = [P('1-2', C.micro), P('3-4', C.micro)];
const FRI_MIC  = [P('1-2', C.micro), P('3-4', C.micro)];
const THU_W6   = [P('1-2', C.micro), P('3-4', C.micro), P('5-6', C.bio), P('7-8', C.bio)];
const FRI_W6   = [P('1-2', C.micro), P('3-4', C.micro), P('5-6', C.immu), P('7-8', C.immu)];

export const WEEKS = [
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

export const TEACHERS = [
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

/* 八种界面风格元信息：名称 / 简介 / 色卡标识（设置与新手引导共用） */
export const STYLES = [
  { id: 'flat',      name: '现代化扁平卡片', desc: '极简几何 · 克制阴影' },
  { id: 'clay',      name: '粘土拟物',       desc: '双向柔光 · 肉感圆角' },
  { id: 'neobrutal', name: '新野兽派',       desc: '粗描边 · 硬投影撞色' },
  { id: 'glass',     name: '玻璃拟态',       desc: '毛玻璃 · 折射高光' },
  { id: 'terminal',  name: '极客赛博终端',   desc: 'CRT 荧光 · 扫描线' },
  { id: 'paper',     name: '纸质墨水屏',     desc: '手账纸感 · 马克笔' },
  { id: 'pixel',     name: '复古像素风',     desc: '8-Bit 点阵 · 街机' },
  { id: 'skeuo',     name: '拟物机械实体',   desc: '金属拉丝 · 皮革压印' }
];

/* 浏览器地址栏主题色（按风格×明暗） */
export const META_COLORS = {
  flat:      { light: '#f4f6fb', dark: '#0a0f1a' },
  clay:      { light: '#eef1fa', dark: '#10131e' },
  neobrutal: { light: '#fdf6e3', dark: '#16161a' },
  glass:     { light: '#dbe6ff', dark: '#070b18' },
  terminal:  { light: '#1a1206', dark: '#0a0a0c' },
  paper:     { light: '#f8f6f0', dark: '#1c1b19' },
  pixel:     { light: '#8bac0f', dark: '#14141e' },
  skeuo:     { light: '#d2cec7', dark: '#26241f' }
};
