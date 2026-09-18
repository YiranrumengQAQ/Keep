# Keep · 课程表

2025 级医学检验技术专业（1）班 · 2026 年秋季学期课程表。

在线演示：<https://yiranrumengqaq.github.io/Keep/>

## 项目介绍

展示第 1～6 教学周（2026.8.31 – 10.11）的每日课程安排与任课教师信息。
基于 **Vite + React 19** 构建，严格 CSP 安全加固，零网络请求下发数据，偏好仅存本机。

主要能力：

- 按周浏览课表，一键定位到今天；「全部天数 / 仅今天」两种显示范围
- **8 种界面风格** × 浅色 / 深色 / 跟随系统，偏好保存在本机
- **新手引导**：首次打开分步定制主题、风格、字体偏好，实时预览
- **字体排版**：5 套字体栈 × 4 档字号 × 3 种抗锯齿策略
- **自定义 CSS**：贴入样式即改即生效；危险语法自动拦截；页面改崩后**快速连点 10 下**自动恢复
- **偏好管理**：保存当前设置为默认 / 双重确认重置（回到你的默认或出厂值）
- 任课教师一览、今日课程面板、响应式布局、打印样式、`prefers-reduced-motion` 支持
- PWA 基础（静态 Manifest、应用图标，Service Worker 预留）

## 界面风格

| 风格         | 说明                                       |
| ------------ | ------------------------------------------ |
| 现代化扁平卡片 | 极简几何、克制阴影，信息优先               |
| 粘土拟物     | 双向柔光阴影、超柔圆角                     |
| 新野兽派     | 粗描边、硬投影、高饱和撞色                 |
| 玻璃拟态     | 毛玻璃、半透明边框与高光                   |
| 极客赛博终端 | CRT 荧光字符、扫描线、日志格式、闪烁光标   |
| 纸质墨水屏   | 米黄纸底、素描虚线、马克笔色痕、作业本红线 |
| 复古像素风   | 8-Bit 双层像素描边、Zpix 像素字体、街机按压 |
| 拟物机械实体 | 金属拉丝、亚麻布纹、压印文字、挂历装订孔   |

> 「极客赛博终端」为低压显示管美学：浅色 = 琥珀 CRT，深色 = 绿光 CRT。
> 「复古像素风」的中文像素字体（Zpix，OFL 许可）按需经 jsDelivr 联网加载，
> 加载失败时自动回退系统等宽字体，不影响使用。

## 技术架构

```text
Keep/
├── index.html              # 入口（含严格 CSP / boot 预载）
├── vite.config.js          # 构建输出到 docs/（GitHub Pages 托管目录）
├── package.json
├── public/
│   ├── boot.js             # 首屏前置：读偏好锁定主题，防闪烁（零依赖原生）
│   ├── icon.svg            # 应用图标
│   └── manifest.webmanifest
├── src/
│   ├── main.jsx            # 入口：按级联顺序导入全部样式
│   ├── App.jsx             # 根组件：偏好 → <html> 属性/自定义 CSS/meta 同步
│   ├── store/              # 状态中心（useSyncExternalStore 外置 store）
│   │   ├── prefs.js        # 偏好读写、白名单校验、默认快照、引导标记
│   │   └── toast.js        # Toast 通知队列
│   ├── utils/
│   │   ├── date.js         # 日期工具
│   │   ├── sanitizeCss.js  # 自定义 CSS 消毒器
│   │   └── pwa.js          # PWA 注入（失败静默降级）
│   ├── hooks/useRescue.js  # 十连击救援
│   ├── data/schedule.js    # 课程数据 / 风格元信息
│   ├── components/         # Header / TodayPanel / WeekTabs / WeekGrid /
│   │                       # Teachers / SettingsModal / OnboardingWizard /
│   │                       # Segmented / StyleGrid / FontControls /
│   │                       # CustomCssEditor / PrefManager / Toasts / Icon
│   └── styles/             # 样式：base + typography + 8 主题 + 组件层
└── docs/                   # 构建产物（提交进仓库，Pages 直接托管）
└── scripts/                # jsdom 冒烟/交互测试（node 直接运行）
```

## 安全设计

- **严格 CSP**（`index.html` meta）：脚本仅同源；样式同源+内联（自定义 CSS 特性所需）；
  字体放行同源与 jsDelivr；`object/base/form` 一律禁止；无第三方脚本与追踪。
- **自定义 CSS 消毒**：`javascript:` / `expression()` / `@import` / `behavior` 等
  危险语法在保存与注入时双重拦截；注入使用 `textContent`，无 HTML 解析面。
- **零内联脚本**：首屏 boot 亦为外部文件，`script-src 'self'` 无例外。
- 偏好数据全部经**白名单校验**后落盘；localStorage 损坏/隐私模式自动降级。
- 敏感操作（重置设置）双重确认；CSS 崩溃有十连击紧急逃生通道。

## 开发

```bash
npm install        # 安装依赖
npm run dev        # 本地开发（开发模式自动剥离 CSP 以兼容 Fast Refresh）
npm run build      # 构建到 docs/
npm run preview    # 预览构建产物

node scripts/smoke-test.mjs        # 冒烟测试（构建后可运行）
node scripts/interaction-test.mjs  # 深度交互测试
```

## 部署（重要）

仓库无 CI 构建步骤，构建产物已提交在 `docs/` 目录。

GitHub 仓库 → **Settings → Pages → Build and deployment → Deploy from a branch**，
选择主分支、目录选择 **`/docs`**。访问根路径即可直达应用：

```text
https://<用户名>.github.io/<仓库名>/
```

修改源代码后记得 `npm run build` 并把 `docs/` 一并提交。

## 数据维护

- 周次与每日课程：`src/data/schedule.js` → `WEEKS`
- 课程简称与色相：`src/data/schedule.js` → `C` / `HUES`（放假等特殊项在 `SPECIAL`）
- 节次时刻表（终端风格日志格式使用）：`src/data/schedule.js` → `PERIOD_TIMES`
- 任课教师：`src/data/schedule.js` → `TEACHERS`

## 偏好设置

偏好保存在 `localStorage`，键为 `med-lab-ct-prefs-v4`（自动迁移 v3 数据），包含
`theme` / `style`（8 种）/ `range` / `font` / `fontSize` / `smoothing` / `customCSS`。
「保存为默认」快照键为 `med-lab-ct-default-v4`；新手引导完成标记独立于偏好，
重置设置不会重播引导。

## 浏览器兼容

支持 Chrome / Edge / Firefox / Safari 近年版本。
字号缩放使用标准化 `zoom`（Firefox 需 ≥126），旧内核自动降级为标准字号；
像素字体加载失败回退等宽字体；毛玻璃、PWA 安装等能力按渐进增强处理。
