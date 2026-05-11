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

| 模块 | 路径 | 职责 |
|------|------|------|
| Layout 层 | `src/layouts/` | HTML shell（Layout.astro）→ 页眉/页脚骨架（Pages.astro） |
| 首页 | `src/pages/index.astro` | Hero + Interests 轮播 + Friends + Footer |
| 博客 | `src/pages/markdown/` | 列表页 + `[slug].astro` 渲染 MDX |
| 作品 | `src/pages/project/` | 同上，对应 projects collection |
| 导航 | `src/components/Nav.astro` | 双栏导航（固定层淡出 + 粘性层滑入） |
| 交互组件 | `src/components/*.svelte` | Interests/DotsImage/Friends 等岛屿组件 |
| 样式 | `src/styles/` | global.css（tailwind + daisy 主题）+ markdown.css（GitHub 风格） |

### 设计哲学

- **暗色优先** — 始终为 dark 色域构建
- **性能敏感** — 禁用 Shiki 语法高亮，使用纯 CSS 标记样式；`markdown.css` 为 ≥1000 行的大文件
- **内容驱动** — 所有页面内容源自 `src/content/` 中的 `.md` / `.mdx` 文件
- **滚动感知导航** — 固定导航于滚动时淡出，粘性导航滑入；仅有 `scrolled` 类切换
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

- **posts collection**：顶层命名为 `posts`。必需字段：`title`（string）、`date`（date）。可选字段：`draft`、`tags`、`description`。
- **projects collection**：顶层命名为 `projects`。必需字段同上。特有可选字段：`links`（Record<string, string>）、`icon`、`image`（string[]）。
- 添加新条目前，验证 frontmatter 符合 Zod 模式（定义于 `src/content.config.ts`）。

### 开发工作流

```bash
npm run dev        # 本地开发
npm run build      # 生产构建（含备案号）
npm run format     # Prettier 格式化全部
```

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
