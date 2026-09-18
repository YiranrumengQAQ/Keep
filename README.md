# Keep · 课程表

2025 级医学检验技术专业（1）班 · 2026 年秋季学期课程表。

在线演示：<https://yiranrumengqaq.github.io/Keep/app.html>

## 项目介绍

这是一个纯静态的课程表单页应用，用于展示第 1～6 教学周（2026.8.31 – 10.11）的每日课程安排与任课教师信息。页面原生 HTML / CSS / JavaScript 编写，零依赖、零构建，拆分为多个模块文件后直接用静态服务器托管即可访问。

主要能力：

- 按周浏览课表，一键定位到今天
- 「全部天数 / 仅今天」两种显示范围
- 4 种界面风格 × 浅色 / 深色 / 跟随系统，偏好保存在本机
- 任课教师一览、今日课程面板
- 响应式布局、打印样式、`prefers-reduced-motion` 支持
- PWA 基础（动态 Manifest、应用图标，Service Worker 预留）

## 界面风格

| 风格            | 说明                       |
| --------------- | -------------------------- |
| 现代化扁平卡片  | 极简几何、克制阴影，信息优先 |
| 粘土拟物        | 双向柔光阴影、超柔圆角       |
| 新野兽派        | 粗描边、硬投影、高饱和撞色   |
| 玻璃拟态        | 毛玻璃、半透明边框与高光     |

## 目录结构

```text
Keep/
├── app.html            # 入口（原单文件 index.html 拆分后的替代入口）
├── css/                # 样式模块（与原 <style> 小节一一对应，按序加载）
│   ├── base.css            # 00. 基础重置
│   ├── theme-flat.css      # 01. 扁平主题变量（浅色/深色）
│   ├── theme-clay.css      # 02. 粘土拟物主题变量
│   ├── theme-neobrutal.css # 03. 新野兽派主题变量
│   ├── theme-glass.css     # 04. 玻璃拟态主题变量
│   ├── header.css          # 05. 顶部栏
│   ├── segmented.css       # 06. 分段控件
│   ├── layout.css          # 07. 主区域
│   ├── today.css           # 08. 今日卡片
│   ├── week-tabs.css       # 09. 周切换标签
│   ├── week-grid.css       # 10. 周课表网格
│   ├── teachers.css        # 11. 教师信息
│   ├── settings.css        # 12. 设置面板
│   └── responsive.css      # 13. 响应式 / 打印 / 动态偏好
└── js/                 # 脚本模块（普通 script，按序加载，共享全局作用域）
    ├── boot.js             # 首屏前置：读偏好、锁定主题，避免闪烁
    ├── lifecycle.js        # 生命周期管理（AbortController 统一解绑）
    ├── data.js             # 课程数据：课程、周次、色相、教师
    ├── date.js             # 日期工具：今天判定、格式化
    ├── prefs.js            # 偏好读写（localStorage）
    ├── dom.js              # DOM 引用
    ├── theme.js            # 浅色/深色/跟随系统
    ├── style.js            # 4 种界面风格切换
    ├── range.js            # 全部天数/仅今天
    ├── render-today.js     # 今日面板渲染
    ├── render-tabs.js      # 周次标签渲染
    ├── render-grid.js      # 周课表渲染
    ├── render-teachers.js  # 教师列表渲染
    ├── week-state.js       # 当前周状态与跳转
    ├── header-scroll.js    # 顶栏滚动阴影
    ├── settings-modal.js   # 设置面板开关
    ├── events.js           # 统一事件委托、Esc 关闭、焦点循环
    ├── pwa.js              # Manifest / 图标注入、SW 注册（失败静默降级）
    └── init.js             # 初始化（必须最后加载）
```

> 说明：本项目由单文件 `index.html` 逐字拆分而来，未增删任何功能逻辑。
> 拆分时唯一的适配改动是 `js/pwa.js` 中 Manifest 的 `start_url` 由 `'./'` 改为
> `'./app.html'`（入口文件改名所致）；另有机械性调整：去掉统一 IIFE 包裹、
> 每个模块顶部加 `'use strict';` 以保持原严格模式语义。

## 快速开始

```bash
# 方式一：Python（仓库根目录执行）
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000/app.html

# 方式二：Node
npx serve .
# 浏览器打开提示地址下的 /app.html
```

直接双击 `app.html` 用 `file://` 打开也能正常查看（Service Worker 与部分
PWA 能力在该方式下不可用，不影响课表功能）。

## 部署

推送到 GitHub 后开启 Pages（Deploy from branch）即可，仓库无构建步骤。

注意入口文件名为 `app.html`（原 `index.html` 已按模块化拆分并删除），
线上访问地址需带文件名，例如：

```text
https://<用户名>.github.io/<仓库名>/app.html
```

如需根路径直达，把 `app.html` 改回 `index.html` 即可（同时把
`js/pwa.js` 的 `start_url` 改回 `'./'`）。

## 数据维护

- 周次与每日课程：`js/data.js` → `WEEKS`
- 课程简称与色相：`js/data.js` → `C` / `HUES`（放假、运动会等特殊项在 `SPECIAL`）
- 任课教师：`js/data.js` → `TEACHERS`
- 「今天」判定与教学周边界提示：`js/date.js`、`js/render-today.js`

## 偏好设置

偏好保存在 `localStorage`，键为 `med-lab-ct-prefs-v3`，
包含 `theme`（light / dark / system）、`style`
（flat / clay / neobrutal / glass）、`range`（all / today）三项，
换浏览器或清缓存后恢复默认值。

## 浏览器兼容

支持 Chrome / Edge / Firefox / Safari 近年版本。毛玻璃（`backdrop-filter`）、
PWA 安装等能力按渐进增强处理，不支持时自动降级，不影响课表查看。
