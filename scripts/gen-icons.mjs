/* 从 public/icon.svg 生成各尺寸 PNG 图标（PWA 安装 / iOS 触屏图标用）
   运行：npm run icons
   · icon-192 / icon-512 ：常规图标（any，圆角 + 透明底）
   · maskable-512        ：Android 自适应图标（全出血方形，内容在安全区内）
   · apple-touch-icon    ：iOS 主屏图标（180×180 全出血方形，iOS 自己切圆角） */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';

const OUT_DIR = 'public/icons';
mkdirSync(OUT_DIR, { recursive: true });

const rounded = readFileSync('public/icon.svg', 'utf8');
const square = rounded.replace('rx="112"', 'rx="0"');

function render(svg, size, file) {
  /* SVG 没有固有宽高，直接注入目标尺寸再渲染 */
  const sized = svg.replace(
    '<svg ',
    `<svg width="${size}" height="${size}" `
  );
  const resvg = new Resvg(sized, {
    background: 'rgba(0,0,0,0)'
  });
  const png = resvg.render().asPng();
  writeFileSync(`${OUT_DIR}/${file}`, png);
  console.log(`✓ ${OUT_DIR}/${file} (${size}×${size}, ${png.length} bytes)`);
}

render(rounded, 192, 'icon-192.png');
render(rounded, 512, 'icon-512.png');
render(square, 512, 'maskable-512.png');
render(square, 180, 'apple-touch-icon.png');
