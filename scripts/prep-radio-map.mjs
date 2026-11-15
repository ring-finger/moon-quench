/**
 * 给无线电分区图打大区标记。
 *
 * 输入：src/assets/radio-map.svg（原始扁平 SVG，339 条 path，无分组）
 * 输出：src/assets/radio-map.rg.svg（每条 path / 图例色块带 data-rg）
 *
 * 原理：原图用「图例色块」表示大区，同一区的所有省份 path 同色，
 * 因此按 fill 反查区号即可，无需地理计算。
 *
 * 修正的坑：北京、天津、上海、香港、澳门 是引线外置标注，不能按文字位置判断归属。
 * 北京（#e74c3c）虽是单独一区，图例里也单列一条，颜色独立，直接映射为 1 区。
 *
 * 运行：node scripts/prep-radio-map.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const SRC = path.resolve('src/assets/radio-map.svg');
const OUT = path.resolve('src/assets/radio-map.rg.svg');

// 图例色块（x=1232 那一列，y 从上到下即 1→9→0 区）反查所得
const FILL_TO_REGION = {
  '#e74c3c': 1, // 北京
  '#5499c7': 2, // 黑龙江、吉林、辽宁
  '#f0cf4a': 3, // 天津、内蒙古、河北、山西
  '#58d68d': 4, // 上海、山东、江苏
  '#af7ac5': 5, // 浙江、江西、福建
  '#f5b041': 6, // 安徽、河南、湖北
  '#a2d9ce': 7, // 湖南、广东、广西、海南
  '#ec7063': 8, // 四川、重庆、贵州、云南
  '#7fb3d5': 9, // 陕西、甘肃、宁夏、青海
  '#e6b17e': 0, // 新疆、西藏
  // #c8ced3（台湾 BV / 香港 VR2 / 澳门 XX9）不属 0–9 区，不标记
};

let svg = fs.readFileSync(SRC, 'utf8');
let pathHits = 0;
let rectHits = 0;

const rgOf = (attrs) => {
  const fill = (attrs.match(/fill="([^"]*)"/) || [])[1];
  if (!fill) return undefined;
  return FILL_TO_REGION[fill.toLowerCase()];
};

// ① 省份 path
svg = svg.replace(/<path\b([^>]*?)(\/?)>/g, (full, attrs, slash) => {
  if (/data-rg=/.test(attrs)) return full;
  const rg = rgOf(attrs);
  if (rg === undefined) return full;
  pathHits++;
  return `<path${attrs} data-rg="${rg}"${slash}>`;
});

// ② 图例色块（也做成悬停入口，手机上点色块比点小省份容易）
svg = svg.replace(/<rect\b([^>]*?)(\/?)>/g, (full, attrs, slash) => {
  if (/data-rg=/.test(attrs)) return full;
  if (!/\by="(1[5-9]\d|2\d\d|3[0-9]\d|40\d)"/.test(attrs)) return full;
  const rg = rgOf(attrs);
  if (rg === undefined) return full;
  rectHits++;
  return `<rect${attrs} data-rg="${rg}"${slash}>`;
});

fs.writeFileSync(OUT, svg, 'utf8');
const kb = (n) => (n / 1024).toFixed(0) + ' KB';
console.log(`path 标记 ${pathHits} 条，图例色块 ${rectHits} 个`);
console.log(`输出 ${path.relative(process.cwd(), OUT)}  ${kb(Buffer.byteLength(svg))}`);
