# 饮月听风 · 个人作品集

基于 [Astro](https://astro.build) 构建的纯静态个人作品集站点，部署于 GitHub Pages。

> 仓库地址：https://github.com/ring-finger/moon-quench
> 在线访问：https://ring-finger.github.io/moon-quench/

## 模块

- **首页** — 导览 + Three.js 星月粒子背景
- **博客** — 跳转到外部博客（https://blog.soulcottage.top/）
- **旅游路线** — 按时间倒序的单侧时间轴卡片，点击展开逐日行程与景点
- **业余无线电** — 呼号、证件与中国业余无线电分区地图（0–9 区，可按大区高亮查看）

## 技术栈

- Astro 7（纯静态输出）
- Three.js（本地引入，构建时打包，不依赖 CDN）
- 原生 CSS（现代清新风格）

## 项目结构

```
src/
├── layouts/Layout.astro          # 全局布局（导航 + 页脚）
├── components/
│   ├── BrandMark.astro           # 品牌标识（深藏青方块 + 「月风」竖排）
│   └── ThreeBackground.astro     # 星月粒子背景
├── styles/global.css             # 全局样式
├── assets/
│   ├── radio-map.svg             # 无线电分区图源图（扁平 SVG）
│   └── radio-map.rg.svg          # 带 data-rg 标记（由脚本生成）
└── pages/
    ├── index.astro               # 首页导览
    ├── blog.astro                # 博客（外链）
    ├── travel.astro              # 旅游路线
    └── radio.astro               # 业余无线电
scripts/
└── prep-radio-map.mjs            # 给分区图打大区标记
```

## 本地开发

```sh
npm install
npm run dev        # localhost:4321
```

## 构建与部署

```sh
npm run build      # 输出到 dist/
npm run preview    # 本地预览构建产物
```

部署到 GitHub Pages（构建产物 `dist/` 即为静态站点）。

> 完整的启动与 Git 提交操作步骤见 [TUTORIAL.md](./TUTORIAL.md)。

## 其他脚本

```sh
npm run map:radio  # 重新生成带大区标记的分区图 radio-map.rg.svg
```

仅在修改 `src/assets/radio-map.svg` 源图后需要运行，输出 `src/assets/radio-map.rg.svg`。
