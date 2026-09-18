import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/* 开发模式下剥离 CSP meta（React Fast Refresh 依赖内联脚本）；
   生产构建保留严格 CSP，静态托管即安全边界。 */
const stripCspInDev = {
  name: 'strip-csp-in-dev',
  transformIndexHtml: {
    order: 'post',
    handler(html, ctx) {
      if (!ctx || !ctx.server) return html;
      return html.replace(/\s*<meta\s+http-equiv="Content-Security-Policy"[^>]*>/, '');
    }
  }
};

export default defineConfig({
  base: './',
  plugins: [react(), stripCspInDev],
  build: {
    outDir: 'docs',          // 构建产物提交进仓库，GitHub Pages 直接托管 /docs
    emptyOutDir: true,
    sourcemap: false
  },
  server: { host: '0.0.0.0' },
  /* 允许经反向代理 / 预览域名访问（如 e2b 沙箱预览、Codespaces 等） */
  preview: { host: '0.0.0.0', allowedHosts: true }
});
