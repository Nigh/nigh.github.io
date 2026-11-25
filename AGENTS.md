# AGENTS.md — nigh.github.io

## 项目 DNA

**个人主页 / 博客 / 作品集** — 由 xianii 构建的极简暗色静态站点。

### 核心技术栈

- **Astro 6** (SSG) + **Svelte 5** (交互岛屿) + **TypeScript**
- **Tailwind CSS 4 + DaisyUI 5** — 自定义暗色主题 `xianii`，纯 CSS 驱动
- **MDX** — 博客与项目的唯一内容格式（`src/content/`）
- **Astro Content Collections** — Zod 校验 frontmatter
- **astro-icon** (Iconify: `mingcute`, `simple-icons`)

### 关键模块

| 模块      | 路径                          | 职责                                                                      |
| --------- | ----------------------------- | ------------------------------------------------------------------------- |
| Layout 层 | `src/layouts/`                | HTML shell（Layout.astro）→ 侧栏内容框架（Pages.astro / IndexPage.astro） |
| 首页      | `src/pages/index.astro`       | Hero（头像 + 名字 + 头衔，入口指向 About）+ 背景项目卡片流动墙（CSS marquee） |
| Notes     | `src/pages/notes/`            | 文章列表页 + `[slug].astro` 渲染 MDX；`/markdown/` 保留为旧链接跳转       |
| 作品      | `src/pages/project/`          | 项目案例卡片与详情页，对应 projects collection                            |
| 应用      | `src/pages/app/`              | Web、桌面、移动端应用目录（数据源：`src/components/apps_data.ts`）        |
| 友链      | `src/pages/friends.astro`     | 友链与本站链接自取                                                        |
| 导航      | `src/components/navbar.astro` | 桌面固定侧边导航（底栏含 GitHub + 可选备案/版权）；`navbarMobile.astro` 提供移动端汉堡抽屉 |
| 交互组件  | `src/components/*.svelte`     | Friends、Toast 等客户端岛屿组件                                           |
| 样式      | `src/styles/`                 | global.css（tailwind + daisy 主题）+ markdown.css（GitHub 风格）          |

### 设计哲学

- **暗色优先** — 始终为 dark 色域构建
- **性能敏感** — 禁用 Shiki 语法高亮，使用纯 CSS 标记样式；`markdown.css` 为 ≥1000 行的大文件
- **内容驱动** — 所有页面内容源自 `src/content/` 中的 `.md` / `.mdx` 文件
- **响应式导航** — 桌面端固定侧边栏，移动端使用带焦点管理的汉堡抽屉
- **View Transitions** — 全局启用 `@view-transition`

---

## 行为准则

### 编码规范

- **组件风格**：静态/布局用 `.astro`，交互逻辑用 `.svelte`。不要在 `.astro` 中嵌入复杂 JS。
- **路径引用**：始终使用 `import.meta.env.BASE_URL` / `PUBLIC_BASE_URL` 前缀公共资源路径。不要硬编码路径。
- **样式作用域**：`.astro` 文件使用 `<style>` 标签（自动作用域）；Svelte 用 `<style scoped>`。Tailwind 用于全局布局和间距，markdown 内容使用 `markdown-body` CSS 类。
- **TypeScript**：开启严格模式。Props 接口始终显式声明（如 `interface Props { post: CollectionEntry<"posts"> }`）。
- **格式化**：提交前运行 `npm run format`（Prettier）。保持现有风格一致。
- **命名约定**：
  - 组件文件：`PascalCase.astro` / `PascalCase.svelte`
  - 工具/数据文件：`snake_case.ts` / `kebab-case.ts`
  - Collection entry 文件：`kebab-case.md` / `kebab-case.mdx`

### 内容与集合

- **posts collection**：顶层命名为 `posts`。必需字段：`title`（string）、`date`（date）。可选字段：`draft`、`tags`、`description`。所有公开列表和路由都应排除 `draft: true`。
- **projects collection**：顶层命名为 `projects`。必需字段：`title`（string）。可选字段：`draft`、`tags`、`description`、`links`（Record<string, string>，含 `github` 时构建期拉取创建年与默认分支最新 commit 年）、`icon`、`image`（string[]）、`featured`。列表按 GitHub 最新 commit 时间排序；卡片展示生命周期年份（如 `2021–2026`）。不再使用手填 `date` / `status`。
- 添加新条目前，验证 frontmatter 符合 Zod 模式（定义于 `src/content.config.ts`）。

### 开发工作流

```bash
npm run dev         # 本地开发（含 BEIAN；会阻塞式启动 web 服务，非直接要求不用运行）
npm run build       # 生产构建（不含备案号）
npm run build:beian # 生产构建并注入 BEIAN（国内部署用）
npm run format      # Prettier 格式化全部
```

- **Node**：Astro 6 要求 `>=22.12.0`。GitHub Pages 部署用 `withastro/action@v6`，workflow 显式 `node-version: 22`。
- **备案**：`BEIAN` 经 Vite `loadEnv` 注入；有值时显示在侧栏/抽屉底栏（`footer.astro`）。`dev` / `build:beian` 会设置；默认 `build` 与 GitHub Pages CI 不设置。
- **GitHub API**：构建期用 GraphQL 拉项目生命周期年份；可选设 `GITHUB_TOKEN` / `GH_TOKEN`（CI 已注入）。无 token 或限流时 warn 并跳过年份，不阻断构建。

---

## 关键约束：自我同步规则

> 当你（Agent）对项目架构、核心逻辑、依赖库或开发流程做出**任何实质性修改或优化**后，**必须同步评估并更新本 `AGENTS.md`** 中的相关条款，确保该文档始终反映项目的最新真实状态。

这包括但不限于：

- 添加/移除/升级依赖库（`package.json`）
- 修改内容集合结构（`src/content.config.ts`）
- 更改布局层级或页面路由模式
- 引入新的 CSS 框架或覆盖主题系统
- 改变组件交互模式（如从 `client:load` 改为 `client:visible`）
- 修改构建流程或部署配置（`astro.config.mjs`）

**不更新 → 文档失准 → 后续 Agent 行为异常。这是硬性要求。**
