# 饮月听风 · 启动与提交教程

本文件是项目（`moon-quench`）的日常开发操作手册，覆盖**启动服务**、**构建部署**、**Git 提交**三个环节。项目介绍、技术栈与结构说明见 [README.md](./README.md)。

---

## 0. 环境要求

| 项目 | 版本 |
| --- | --- |
| Node.js | >= 22.23.4 |
| 包管理器 | npm 11.20.0 |
| 框架 | Astro 7.x |

- 远程仓库：`https://github.com/ring-finger/moon-quench.git`
- 默认分支：`main`
- 部署：GitHub Pages（项目站，`base` 为 `/moon-quench/`）

> 首次使用前先安装依赖：
> ```sh
> npm install
> ```

---

## 1. 启动开发服务

本地开发服务器运行在 `http://localhost:4321`。有两种启动方式，按需选择。

### 1.1 常规启动（前台）

```sh
npm run dev
```

启动后进程占用当前终端并持续输出日志，适合日常本地调试。

**停止方式**：在运行 `npm run dev` 的终端里按 `Ctrl + C`。

若服务在后台运行或终端已关闭，则按端口结束进程：

| 系统 | 命令 |
| --- | --- |
| Windows | `netstat -ano \| findstr :4321` → 查 PID，再 `taskkill /PID <PID> /F` |
| macOS / Linux | `lsof -ti :4321 \| xargs kill` |

### 1.2 后台启动（推荐）

长时间开发时用后台模式启动，不占用终端：

```sh
astro dev --background
```

后台服务的常用管理命令：

| 命令 | 作用 |
| --- | --- |
| `astro dev status` | 查看服务状态 |
| `astro dev logs` | 查看运行日志 |
| `astro dev stop` | 停止后台服务 |

> 说明：`astro dev --background` 来自项目的 `AGENTS.md` 约定，适合在编辑器/Agent 环境下使用；个人在终端调试时直接用 `npm run dev` 更直观。

---

## 2. 构建与部署

### 2.1 本地构建

```sh
npm run build       # 构建产物输出到 dist/
npm run preview     # 本地预览构建产物
```

### 2.2 部署到 GitHub Pages

构建产物 `dist/` 即为静态站点。将 `main` 分支的更新推送到 `origin` 后，由 GitHub Pages 按仓库配置自动发布（详见仓库 `Settings → Pages`）。

> 站点 `base` 已配置为 `/moon-quench/`，非用户主页仓库，无需修改 `astro.config.mjs`。

---

## 3. Git 提交

以下命令按顺序执行，完成一次完整的提交。

### 3.1 查看当前改动

```sh
git status          # 查看工作区状态
git diff            # 查看具体改动内容
```

### 3.2 暂存改动

```sh
git add .                        # 暂存全部改动
# 或精确暂存指定文件（推荐）
git add src/pages/index.astro
```

### 3.3 提交

```sh
git commit -m "描述本次改动的信息"
```

提交信息建议：简洁描述「做了什么」，例如：

- `feat: 新增旅游路线页面`
- `fix: 修复星月粒子背景闪烁问题`
- `docs: 补充启动与提交教程`

### 3.4 推送到远程

```sh
git push origin main
```

> 提交作者为 `ring-finger`（对应邮箱 `minionzw@163.com`），保持与 GitHub 一致即可，无需额外配置。如需按项目单独指定身份，可加 `--local`：
> ```sh
> git config --local user.name "ring-finger"
> git config --local user.email "minionzw@163.com"
> ```

---

## 4. 常用命令速查

```sh
npm install          # 安装依赖
npm run dev          # 启动开发服务（localhost:4321），前台运行，Ctrl+C 停止
astro dev --background # 后台启动开发服务
astro dev status     # 后台服务状态
astro dev logs       # 后台服务日志
astro dev stop       # 停止后台服务
npm run build        # 构建到 dist/
npm run preview      # 预览构建产物
git status           # 查看改动
git add .            # 暂存改动
git commit -m "..."  # 提交
git push origin main # 推送
```

---

## 5. 关联文档

- [README.md](./README.md) — 项目介绍、技术栈、结构、待办
- [AGENTS.md](./AGENTS.md) — 开发约定（后台启动方式、文档链接）
