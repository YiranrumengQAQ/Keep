/* ═══════════════════════════════════════════════════════════
   课程数据 —— 单一数据源
   ─────────────────────────────────────────────────────────
   · COURSES   ：课程 → 名称 / 教师 / 色相 / 特殊标记（全站唯一定义处）
   · RAW_WEEKS ：每周排课，只存「日期 + 课程键 + 节次」
   · WEEKS     ：由 RAW_WEEKS 自动派生（周次标签 / 日期范围 / 星期 / 补课标记）
   · TEACHERS  ：由 COURSES 自动派生（课程名与教师永远同源，不会再对不上）

   修改课表只需要动 COURSES 和 RAW_WEEKS 两处；
   星期写错、范围忘记改、两套课程名不一致这类问题从结构上消除。
   ═══════════════════════════════════════════════════════════ */

export const WEEKDAY_CN = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

/* ── 课程总表 ────────────────────────────────────────────────
   name    显示名（全站唯一来源）
   teacher 任课教师（教师列表由此派生）
   hue     课程色块色相；特殊日程与未排课课程无需填写
   special 特殊日程（放假 / 运动会），不算课程、不进教师列表 */
export const COURSES = {
  /* 本学期已排课 */
  trad:  { name: '中国传统文化',     teacher: '张文君', hue: 268 },
  /* ⚠️ 待核对：旧数据课表写「免疫技术与检验」、教师名单写「免疫学技术与检验」，
     此处统一取教师名单写法；如需改回只改这一行。 */
  immu:  { name: '免疫学技术与检验', teacher: '孙荣华', hue: 199 },
  bio:   { name: '生物化学检验',     teacher: '林笑宇', hue: 158 },
  comm:  { name: '人际沟通',         teacher: '张萌',   hue: 33 },
  /* ⚠️ 待核对：同上，「微生物检验」/「微生物学检验」统一取教师名单写法。 */
  micro: { name: '微生物学检验',     teacher: '刘长林', hue: 352 },
  path:  { name: '病理检验技术',     teacher: '崔妲',   hue: 232 },
  pe:    { name: '体育',             teacher: '崔丰旭', hue: 312 },

  /* 任课教师总表中、第 1～6 周暂未排课的课程（教师列表会标注「未排课」） */
  policy:      { name: '形势与政策',     teacher: '赵桐萱' },
  aesthetics:  { name: '大学美育',       teacher: '吴雅莉' },
  instrument:  { name: '临床检验仪器',   teacher: '崔妲' },
  molecular:   { name: '分子生物学概要', teacher: '陈莹莹' },
  parasite:    { name: '寄生虫学检验',   teacher: '张雅惠' },
  transfusion: { name: '输血检验技术',   teacher: '崔妲' },

  /* 特殊日程 */
  midAut: { name: '中秋节放假', special: true },
  natDay: { name: '国庆节放假', special: true },
  sports: { name: '校运动会',   special: true }
};

/* 节次对应时刻（仅供参考，如需调整在此修改） */
export const PERIOD_TIMES = {
  '1-2': '08:00 - 09:35',
  '3-4': '09:55 - 11:30',
  '5-6': '13:30 - 15:05',
  '7-8': '15:25 - 17:00'
};

/* ── 每周排课（c 存的是 COURSES 的键，不是课程名） ── */
function P(period, key) { return { p: period, c: key }; }

const MON_FULL = [P('1-2', 'trad'), P('3-4', 'pe'), P('5-6', 'immu'), P('7-8', 'immu')];
const TUE_A    = [P('1-2', 'immu'), P('3-4', 'immu')];
const TUE_B    = [P('1-2', 'immu'), P('3-4', 'immu'), P('5-6', 'comm')];
const WED_FULL = [P('1-2', 'bio'), P('3-4', 'bio'), P('5-6', 'micro'), P('7-8', 'micro')];
const THU_A    = [P('1-2', 'comm'), P('3-4', 'pe'), P('5-6', 'path'), P('7-8', 'path')];
const THU_PATH = [P('1-2', 'path'), P('3-4', 'path')];
const THU_MIC  = [P('1-2', 'micro'), P('3-4', 'micro')];
const FRI_MIC  = [P('1-2', 'micro'), P('3-4', 'micro')];
const THU_W6   = [P('1-2', 'micro'), P('3-4', 'micro'), P('5-6', 'bio'), P('7-8', 'bio')];
const FRI_W6   = [P('1-2', 'micro'), P('3-4', 'micro'), P('5-6', 'immu'), P('7-8', 'immu')];

const RAW_WEEKS = [
  {
    days: [
      { d: '2026-08-31', s: MON_FULL },
      { d: '2026-09-01', s: TUE_A },
      { d: '2026-09-02', s: WED_FULL },
      { d: '2026-09-03', s: THU_A },
      { d: '2026-09-04', s: FRI_MIC }
    ]
  },
  {
    days: [
      { d: '2026-09-07', s: MON_FULL },
      { d: '2026-09-08', s: TUE_A },
      { d: '2026-09-09', s: WED_FULL },
      { d: '2026-09-10', s: THU_A },
      { d: '2026-09-11', s: FRI_MIC }
    ]
  },
  {
    days: [
      { d: '2026-09-14', s: MON_FULL },
      { d: '2026-09-15', s: TUE_B },
      { d: '2026-09-16', s: WED_FULL },
      { d: '2026-09-17', s: THU_PATH },
      { d: '2026-09-18', s: FRI_MIC },
      { d: '2026-09-19', s: [] },
      /* ⚠️ 待核对：原始课表是否确有周日补课（病理 1-2 / 3-4）？
         疑为国庆假期调课，若为复制笔误请改成 []。 */
      { d: '2026-09-20', s: THU_PATH }
    ]
  },
  {
    days: [
      { d: '2026-09-21', s: MON_FULL },
      { d: '2026-09-22', s: TUE_B },
      { d: '2026-09-23', s: WED_FULL },
      { d: '2026-09-24', s: THU_MIC },
      { d: '2026-09-25', s: [P('1-2', 'midAut')] }
    ]
  },
  {
    days: [
      { d: '2026-09-28', s: [P('1-2', 'trad'), P('3-4', 'pe'), P('5-6', 'comm')] },
      { d: '2026-09-29', s: [P('1-2', 'sports')] },
      { d: '2026-09-30', s: [] },
      { d: '2026-10-01', s: [P('1-2', 'natDay')] },
      { d: '2026-10-02', s: [] }
    ]
  },
  {
    days: [
      { d: '2026-10-05', s: [] },
      { d: '2026-10-06', s: [] },
      { d: '2026-10-07', s: [] },
      { d: '2026-10-08', s: THU_W6 },
      { d: '2026-10-09', s: FRI_W6 },
      /* ⚠️ 待核对：周六补课（病理 1-2 / 3-4）是否属实？若为笔误请改成 []。 */
      { d: '2026-10-10', s: THU_PATH },
      /* ⚠️ 待核对：10.11（周日）暂按无课处理，若仍有安排请补上课程。 */
      { d: '2026-10-11', s: [] }
    ]
  }
];

/* ── 以下全部自动派生，无需手工维护 ───────────────────────── */

function dateOf(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function isoOf(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function weekdayOf(iso) {
  return WEEKDAY_CN[dateOf(iso).getDay()];
}

function fmtShort(iso) {
  const [, m, d] = iso.split('-').map(Number);
  return `${m}.${d}`;
}

function fmtFull(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${y}.${m}.${d}`;
}

/* 周次标签 / 日期范围 / 星期 / 补课标记，全部由日期自动计算。
   范围按「自然周」推导：从本周首日延伸到周日，
   再与最后一个有课条目的日期取较晚者（覆盖补课出现在周日的情况）。 */
export const WEEKS = RAW_WEEKS.map((week, i) => {
  const days = week.days.map((day) => {
    const w = weekdayOf(day.d);
    const makeup = (w === '周六' || w === '周日') && day.s.length > 0;
    return { d: day.d, s: day.s, w, makeup };
  });
  const start = dateOf(days[0].d);
  const daysToSunday = (7 - start.getDay()) % 7;
  start.setDate(start.getDate() + daysToSunday);
  const lastEntry = dateOf(days[days.length - 1].d);
  const weekEnd = lastEntry > start ? lastEntry : start;
  return {
    label: `第${i + 1}周`,
    range: `${fmtShort(days[0].d)} - ${fmtShort(isoOf(weekEnd))}`,
    days
  };
});

/* 学期总日期范围（今日面板的「不在教学周内」提示语用） */
export const TERM_RANGE = (() => {
  const first = WEEKS[0].days[0].d;
  const lastWeek = WEEKS[WEEKS.length - 1];
  const last = lastWeek.days[lastWeek.days.length - 1].d;
  return `${fmtFull(first)} - ${fmtShort(last)}`;
})();

/* 课表中实际出现过的课程键（教师列表据此标注「未排课」） */
const SCHEDULED_KEYS = new Set();
for (const week of RAW_WEEKS) {
  for (const day of week.days) {
    for (const slot of day.s) SCHEDULED_KEYS.add(slot.c);
  }
}

/* 任课教师总表：由 COURSES 派生，含本学期未排课的课程 */
export const TEACHERS = Object.entries(COURSES)
  .filter(([, course]) => !course.special)
  .map(([key, course]) => ({
    key,
    name: course.name,
    teacher: course.teacher,
    scheduled: SCHEDULED_KEYS.has(key)
  }));

/* 八种界面风格元信息：名称 / 简介 / 色卡标识（设置与新手引导共用） */
export const STYLES = [
  { id: 'flat',      name: '现代化扁平卡片', desc: '极简几何 · 克制阴影' },
  { id: 'clay',      name: '粘土拟物',       desc: '双向柔光 · 肉感圆角' },
  { id: 'neobrutal', name: '新野兽派',       desc: '粗描边 · 硬投影撞色' },
  { id: 'glass',     name: '超清液晶玻璃',   desc: '液态折射 · 晶体棱边' },
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
  glass:     { light: '#bdd4ff', dark: '#05070f' },
  terminal:  { light: '#1a1206', dark: '#0a0a0c' },
  paper:     { light: '#f8f6f0', dark: '#1c1b19' },
  pixel:     { light: '#8bac0f', dark: '#14141e' },
  skeuo:     { light: '#d2cec7', dark: '#26241f' }
};
