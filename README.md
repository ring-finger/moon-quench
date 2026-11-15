# 饮月听风 · 个人作品集

基于 [Astro](https://astro.build) 构建的纯静态个人作品集站点，部署于 GitHub Pages。

## 模块

- **首页** — 导览 + Three.js 星月粒子背景
- **博客** — 跳转到外部博客（https://blog.soulcottage.top/）
- **旅游路线** — 按年份倒序的树状结构，点击卡片展开详情
- **业余无线电** — 呼号、证件与电台分区地图（接入位）

## 技术栈

- Astro 5（纯静态输出）
- Three.js（本地引入，构建时打包，不依赖 CDN）
- 原生 CSS（现代清新风格）

## 项目结构

```
src/
├── layouts/Layout.astro          # 全局布局（导航 + 页脚）
├── components/ThreeBackground.astro  # 星月粒子背景
├── styles/global.css             # 全局样式
└── pages/
    ├── index.astro               # 首页导览
    ├── blog.astro                # 博客（外链）
    ├── travel.astro              # 旅游路线
    └── radio.astro               # 业余无线电
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

## 后续待办

- [ ] 导入旅游路线真实内容（替换 `travel.astro` 中的示例数据）
- [ ] 接入业余无线电台分区地图成品文件
