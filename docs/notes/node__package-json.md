---
title: 深入 package.json
order: 2
toc: content
---

## package.json 简述

`package.json` 是 Node.js / 前端工程中最核心的配置文件之一，用来描述一个项目/包的“身份证”和“工程说明书”。常见作用包括：

- **项目信息**：名称、版本、描述、作者、仓库等
- **依赖管理**：依赖、开发依赖、对等依赖、可选依赖等
- **运行与构建脚本**：开发、构建、测试、格式化等脚本
- **发布入口与模块系统**：`main` / `module` / `exports` / `browser` / `types` 等
- **运行环境约束**：`engines`、`os`、`packageManager` 等
- **多包管理**：`workspaces` 等

在空目录中执行：

```bash
npm init -y
```

会自动生成一个基础的 `package.json`：

> 下面示例中的 `//` 注释仅为讲解使用，**真实的 `package.json` 不支持注释**，使用时请删除这些注释。

```jsonc
{
  "name": "my-app", // 项目名称
  "version": "1.0.0", // 项目版本
  "description": "", // 描述信息，便于在 npm 中搜索和了解模块
  "main": "index.js", // 包入口文件（CommonJS）
  "scripts": {
    // 指定 npm 命令行缩写
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [], // 关键词，利于 npm 搜索
  "author": "", // 作者
  "license": "ISC" // 许可证
}
```

更多配置项可以参考 [npm 官方文档](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)。

---

### package.json 的演进（背景）

理解演进有助于理解为什么会有这么多字段：

1. **npm 成为前端包管理中心**
   - 前后端统一使用 npm 生态，JavaScript 依赖管理集中到 `package.json`。
2. **多入口与多环境支持**
   - 出现 `main`、`browser`、`module`、`exports` 等字段，让包能针对 Node、浏览器、打包器提供不同入口。
3. **TypeScript 普及**
   - `types` / `typings` 字段作为类型入口，提升 TS 使用体验。
4. **工具配置集中化**
   - 许多工具支持直接在 `package.json` 中内联配置（Babel、ESLint、Prettier、Husky 等），虽然大型项目往往更倾向使用独立配置文件。
5. **Monorepo 与多包管理**
   - `workspaces` 等语法出现，支持在一个仓库中管理多个包。

---

## 字段分层总览：先建立整体视图

在细看每个字段之前，先看一下 `package.json` 中的字段大致归属：

| 维度                    | 典型字段                                                                                                                       | 作用简述                              |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| **基础身份与元信息**    | `name`, `version`, `description`, `keywords`, `license`, `author`, `contributors`, `homepage`, `repository`, `bugs`, `private` | 标识项目/包本身与相关信息             |
| **依赖与版本管理**      | `dependencies`, `devDependencies`, `peerDependencies`, `peerDependenciesMeta`, `optionalDependencies`, `overrides`             | 管理依赖种类与版本策略                |
| **发布入口与模块系统**  | `main`, `module`, `browser`, `exports`, `types`, `typings`, `type`, `sideEffects`, `files`, `publishConfig`, `bin`             | 决定包如何被导入、打包和发布          |
| **工程脚本与工具配置**  | `scripts`, `config` 以及内联的 `eslintConfig`, `browserslist`, `lint-staged` 等                                                | 管理开发、构建、测试、Lint 等工程行为 |
| **运行环境与平台约束**  | `engines`, `os`, `packageManager`                                                                                              | 限制或提示在哪些环境/工具上使用该项目 |
| **多包管理与 Monorepo** | `workspaces`                                                                                                                   | 在一个仓库内管理多个包（monorepo）    |

后文会按这些维度展开讲解。

---

## 一、基础身份与元信息层

### name, version

- `name`（包名）
  - 长度必须 ≤ 214 字节；
  - 不能以 `.` 或 `_` 开头；
  - 不能包含空格或非 URL 安全字符（如 `~)('!*` 等）；
  - **建议使用全小写**，发布到 npm 时会被转成小写；
  - 支持作用域名：`@scope/package-name`；
  - 建议不要与 Node 核心模块（如 `fs`、`http`）重名，也不建议刻意加 `js` / `node`。
- `version`（版本号）
  - 必须符合语义化版本 SemVer：`主版本.次版本.补丁`，如 `1.2.3`；
  - 每次发布到 npm 的版本号必须唯一，不能回退。

> 对于要发布到 npm registry 的包，`name` 和 `version` 是必填字段。
> 对于只在本地使用的私有项目，理论上可以不严格要求，但**依然强烈建议规范填写**，有利于后期迁移与管理。

---

### description, keywords

`description` 和 `keywords` 会影响 npm 搜索结果与阅读体验：

```json
{
  "description": "An enterprise-class UI design language and React components implementation",
  "keywords": [
    "ant",
    "component",
    "components",
    "design",
    "framework",
    "frontend",
    "react",
    "react-component",
    "ui"
  ]
}
```

- `description`：一句话概括核心价值；
- `keywords`：提升可搜索性，方便用户通过主题/框架等关键词找到你的包。

---

### author, contributors

- `author`：单一主要作者信息；
- `contributors`：贡献者列表。

两者都可以用对象或字符串表示：

```json
{
  "author": {
    "name": "yourname",
    "email": "youremail@xx.com",
    "url": "https://yoururl.com/"
  },
  "contributors": ["name <b@rubble.com> (http://barnyrubble.tumblr.com/)"]
}
```

- 对开源项目：建议至少写清楚 `author` 与 `repository`，方便他人联系和贡献。
- 对公司内部项目：也可以用团队名或组织邮箱。

---

### homepage, bugs, repository

```json
{
  "homepage": "https://ant.design/",
  "bugs": {
    "url": "https://github.com/ant-design/ant-design/issues"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/ant-design/ant-design"
  }
}
```

- `homepage`：项目主页（文档站、官网等）；
- `repository`：代码仓库地址；
- `bugs`：问题反馈入口（issue 地址或邮箱）。

这些字段会在 npm 官网展示，对开源项目非常重要，有助于用户找到文档和反馈渠道。

---

### license

`license` 指定项目的开源协议，决定他人可以如何使用、修改、分发你的代码。

常见协议：

- `MIT`
- `Apache-2.0`
- `GPL-3.0`
- `BSD-2-Clause` / `BSD-3-Clause` 等

> 对开源项目：合理选择并声明 license 可以避免法律风险。
> 对内部项目：也建议明确写上，方便公司内部合规审查。

---

### private

```json
{
  "private": true
}
```

- `private: true` 会阻止 npm 发布该包。
- 常用于：
  - 私有应用项目（前端 SPA / 管理后台等）；
  - monorepo 根目录（配合 `workspaces`）。

> 实战建议：前端应用项目通常不会发布到 npm，**强烈建议设置 `private: true`**，避免误执行 `npm publish` 把内部代码发到公共 registry。

---

## 二、依赖与版本管理层

### dependencies, devDependencies, optionalDependencies

- `dependencies`
  - 运行时依赖：项目在**运行中**需要的包；
  - 例如：React、Vue、Ant Design、Axios 等。
- `devDependencies`
  - 开发/构建依赖：只在**开发或构建阶段**需要；
  - 例如：webpack、Vite、Babel、ESLint、TypeScript、Jest 等。
- `optionalDependencies`
  - 可选依赖：安装失败不会导致整个安装失败；
  - 常用于某些平台特定的依赖或可选特性。

版本值可以是：

- 版本范围（推荐做法）
  - `"axios": "^1.7.0"`、`"lodash": "~4.17.21"` 等，遵循 SemVer。
- tarball 地址
  - `"my-lib": "https://cdn.com/my-lib-1.0.0.tgz"`。
- 本地路径（适合本地调试）
  - `"my-lib": "file:../packages/my-lib"`。
- GitHub 简写
  - `"antd": "ant-design/ant-design#4.0.0-alpha.8"`。
- 完整 Git URL
  - `"my-lib": "git+https://github.com/user/repo.git#v1.2.3"`。

示例：

```json
{
  "dependencies": {
    "antd": "ant-design/ant-design#4.0.0-alpha.8",
    "axios": "^1.7.0",
    "core-js": "^3.37.0",
    "my-local-lib": "file:../packages/my-local-lib",
    "remote-lib": "https://cdn.com/remote-lib-1.0.0.tgz"
  }
}
```

> 对于**应用项目**：框架、UI 库和运行时会被打包进最终产物的依赖，通常放在 `dependencies`。
> 对于**组件库**：宿主框架（如 React/Vue）通常放在 `peerDependencies`（见下文）。

---

### peerDependencies 与 peerDependenciesMeta

`peerDependencies`（对等依赖）主要用于**库 / 插件**场景：

- 你的包在运行时依赖某个“宿主”库（如 React/Vue），但**不希望把它打包进来**；
- 要求使用你库的人，在他们的项目中自行安装且保持版本兼容。

示例：React 组件库要求使用者安装 `>=17.0.1` 的 React：

```json
{
  "peerDependencies": {
    "react": ">=17.0.1",
    "react-dom": ">=17.0.1"
  }
}
```

关键点：

1. **体积优化**
   - 使用你的组件库的人本地已经安装了 React，你再打包一份会导致多份 React 共存和体积膨胀。
2. **版本一致性**
   - 要求使用者使用与你兼容的 React 版本，否则会产生警告或运行时错误。

不同 npm 版本的行为差异：

- npm 6 及之前：
  - 不会自动安装 `peerDependencies`；
  - 仅给出警告，必须使用者手动安装。
- npm 7+：
  - 会尝试自动安装 `peerDependencies`；
  - 如果版本冲突，会直接报错或安装失败。

对于可选的 peer 依赖，可以配合 `peerDependenciesMeta` 使用：

```json
{
  "peerDependencies": {
    "react": ">=17.0.0",
    "react-dom": ">=17.0.0",
    "styled-components": ">=5.0.0"
  },
  "peerDependenciesMeta": {
    "styled-components": {
      "optional": true
    }
  }
}
```

含义：`react` / `react-dom` 是必需对等依赖，而 `styled-components` 是可选的。

> 反例：如果把 React 直接放入组件库的 `dependencies`，会导致使用者项目中出现两份 React，引发 hooks 运行报错，是组件库初学者常见坑。

---

### engines（Node / npm 版本要求）

`engines` 用来声明对 Node/npm 版本的要求：

```json
{
  "engines": {
    "node": ">=16.0.0 <22.0.0",
    "npm": ">=8.0.0"
  }
}
```

不同工具的处理：

- npm：
  - 默认只警告，不阻止安装；
  - 可通过用户配置 `engine-strict=true` 变严格。
- Yarn / pnpm：
  - 通常会更严格，某些情况下会直接阻止安装；
  - 也可以通过配置关闭检查。

> 实战建议：对内部项目，`engines` 范围不要写得过于精确（例如 `=18.17.0`），容易导致团队成员略有版本差异就装不上依赖。通常推荐类似 `>=18 <22` 这种范围，再配 `.nvmrc` / `.tool-versions` 等工具统一开发环境。

---

### os（操作系统约束）

`os` 用于限制包在哪些操作系统上可安装：

只允许 macOS 和 Linux：

```json
{
  "os": ["darwin", "linux"]
}
```

黑名单形式：禁止在 Windows 上安装：

```json
{
  "os": ["!win32"]
}
```

典型用途：

- 某些依赖只有在特定平台（如 macOS）才有意义；
- 或者某些原生扩展不支持某些平台。

---

### package.json 与 package-lock.json：声明 vs 实际安装

> `package.json` 负责“声明你想要什么范围的版本”；
> `package-lock.json` 负责“记录实际安装的具体版本和依赖树”。

#### 1. 为什么 package.json 允许版本范围

如果在 `package.json` 里写死版本：

```json
{
  "dependencies": {
    "my-package": "1.0.1"
  }
}
```

虽然可以保证每次安装都是同一版本，但会错过 `1.0.2`、`1.0.3` 等补丁更新。

因此 npm 支持语义化版本范围，让你在**稳定性**和**更新速度**之间做平衡。

常见写法：

| 场景                    | 示例范围                     | 描述                                                   |
| ----------------------- | ---------------------------- | ------------------------------------------------------ |
| 同一小版本的补丁更新    | `"some-lib": "1.0.x"`        | 安装 `1.0.x` 中最新补丁，如 `1.0.6`。                  |
| 从 1.0.4 起的补丁更新   | `"some-lib": "~1.0.4"`       | 安装 `1.0.x` 中 `>=1.0.4` 最新版本。                   |
| 大版本 1 的最新小版本   | `"some-lib": "1.x"` 或 `"1"` | 安装 `1.x.x` 中的最新版本，如 `1.3.0`。                |
| 从 1.1.4 起的所有小版本 | `"some-lib": "^1.1.4"`       | 安装 `1.x.x` 中 `>=1.1.4` 的最新版本，不会升到 `2.x`。 |
| 永远安装最新            | `"some-lib": "*"` 或 `"x"`   | 安装 registry 上的最新版本。                           |

> 这些只是“允许范围”，**真正安装的具体版本由 `package-lock.json` 记录**。

#### 2. package-lock.json 的作用

`package-lock.json` 会记录：

- 顶层依赖及其**实际安装版本**；
- 每个依赖的子依赖树（嵌套依赖）；
- 下载源（registry、tarball URL 等）；

目的：保证不同时间、不同机器运行 `npm install`，得到**完全一致**的依赖树。

举例：

```json
{
  "dependencies": {
    "lodash": "^4.17.20"
  }
}
```

- 第一次安装时，如果最新可用版本是 `4.17.21`，`npm install` 会安装 `4.17.21`；
- `package-lock.json` 会记录 `"version": "4.17.21"`；
- 后续即便发布了 `4.17.22`，在不修改锁文件的前提下再执行 `npm install`，仍会安装 `4.17.21`。

相关工具的锁文件：

- npm：`package-lock.json` / `npm-shrinkwrap.json`；
- Yarn：`yarn.lock`；
- pnpm：`pnpm-lock.yaml`。

#### 3. package-lock.json 是否应该提交到 Git

官方推荐：**将 `package-lock.json` 提交到版本控制系统**。

好处：

1. **依赖一致性**
   - 所有开发者、测试环境、生产环境使用完全一致的依赖版本。
2. **安装更快、更稳定**
   - 减少解析版本范围和网络请求，降低安装失败概率。
3. **可审计性**
   - 通过锁文件的 diff 可以清晰查看依赖变更，便于代码审查和安全审计。
4. **简化新环境配置**
   - 新同事或 CI/CD 只需 `npm ci` / `npm install` 即可复原依赖环境。

> 对于 npm 项目，在 CI 环境推荐使用 `npm ci` 根据 `package-lock.json` 进行干净安装。

---

### overrides / resolutions：修正子依赖版本（进阶）

实际项目中经常遇到这种情况：

- 某个第三方依赖 A 依赖了一个老版本库 B；
- B 有安全漏洞或 bug，需要强行升级。

此时可以用“依赖覆盖”机制：

- npm（8+）：`overrides`
- Yarn classic：`resolutions`
- pnpm：`pnpm.overrides`

示例（npm）：

```json
{
  "overrides": {
    "webpack": {
      "browserslist": "^4.22.0"
    }
  }
}
```

含义：即便某些版本的 `webpack` 自己依赖老版本 `browserslist`，也强制使用 `^4.22.0`。

> 使用建议：只在必要时使用 `overrides`，并在代码审查中关注锁文件和 `overrides` 的变更，避免隐式破坏依赖树。

---

### 定期更新依赖

目标不是“永远不动依赖”，而是在可控范围内享受更新带来的修复和优化。

- 使用 `npm outdated` 查看可更新的依赖：

  ```bash
  npm outdated
  ```

  关注三列：

  - `Current`：当前安装版本；
  - `Wanted`：在 `package.json` 版本范围内可安装的最新版本；
  - `Latest`：registry 上最新发布版本。

- 使用 `npm update` 在版本范围允许的前提下更新到 `Wanted` 版本，并更新锁文件：

  ```bash
  npm update
  ```

> 不同 npm 版本的颜色策略略有差异，不要过分依赖颜色判断，重点看 `Current / Wanted / Latest` 三列，结合自己的版本策略决定是否升级。

---

### 依赖管理最佳实践（总结）

1. **选择合适的版本策略**
   - 核心依赖（框架、ORM、数据库驱动等）：
     - 倾向稳定，可使用较严格的版本范围 + 锁文件控制更新节奏。
   - 非核心依赖：
     - 可以使用 `^` / `~` 接收补丁或小版本更新。
2. **定期审查和更新**
   - 使用 `npm audit` 检查安全漏洞；
   - 使用 `npm outdated` 定期梳理可更新列表；
   - 以“版本周期”为单位（每个大版本或每月/每季度）做一次集中升级，并配合测试。
3. **管理锁文件**
   - 始终提交 `package-lock.json` 到版本控制；
   - 更新依赖时同步更新锁文件，并跑一轮基础测试。
4. **处理不活跃依赖**
   - 对于不再维护的依赖，建议锁定版本，防范意外变更；
   - 如果有明显问题或安全风险，尽量迁移到更活跃的替代品。

---

## 三、发布入口与模块系统层

这一层决定“别人如何使用你的包”：Node 如何 `require` / `import`，打包器如何 tree-shaking，TypeScript 如何找类型等。

### main

`main` 指定包的默认入口文件（传统 CommonJS 入口）：

```json
{
  "main": "dist/index.cjs"
}
```

- 不指定时默认是 `index.js`；
- Node.js 在加载 CommonJS 包（`require('your-package')`）时，如果没有 `exports` 字段，会使用 `main` 作为入口；
- 文件是 CommonJS 还是 ESM，取决于：
  - 文件扩展名（`.cjs` / `.mjs`）；
  - 以及 `type` 字段（见后文）。

---

### module（打包器约定字段）

`module` 不是 Node/npm 官方字段，而是**打包工具约定**用来指向 ES Module 入口：

```json
{
  "main": "dist/index.cjs",
  "module": "dist/index.esm.js"
}
```

- Node.js 本身不会读取 `module`；
- Webpack/Rollup/Vite 等工具可以优先使用 `module` 的 ESM 版本，实现更好的 tree-shaking。

---

### browser

`browser` 字段通常由打包工具使用，用于指定浏览器环境的入口或替换实现：

```json
{
  "main": "dist/index.cjs",
  "browser": "dist/index.umd.js"
}
```

典型用途：

- 在浏览器环境下使用 UMD 版本；
- 或覆盖某些只在 Node 环境下存在的模块（如 `fs`）以避免打包报错。

注意：

- Node.js 本身不会使用 `browser`；
- Webpack/Rollup 等工具可以根据配置优先使用 `browser` 字段。

---

### types / typings

为 TypeScript 提供类型声明入口：

```json
{
  "main": "dist/index.cjs",
  "types": "dist/index.d.ts"
}
```

- `types` / `typings` 都可以被 TypeScript 识别；
- 对于纯 JS 库，如果同时发布 `.d.ts` 类型声明文件，可以大幅提升 TS 使用体验；
- 对 TS 编写的库，一般用打包流程生成 `d.ts` 到 `dist`，并通过 `types` 暴露。

---

### type（模块系统模式）

`type` 用来声明包中 `.js` 文件的默认模块系统：

```json
{
  "type": "module"
}
```

合法值只有两个：

- `"module"`：
  - `.js` → 视为 ES Module；
  - `.cjs` → 强制视为 CommonJS。
- `"commonjs"`（默认）：
  - `.js` → 视为 CommonJS；
  - `.mjs` → 强制视为 ES Module。

> 注意：UMD 不是 `type` 的合法值，它只是构建产物的一种打包格式（通常由打包工具生成到 `dist/*.umd.js`）。

---

### exports（推荐的现代入口声明）

`exports` 是 Node.js 官方推荐的现代入口声明方式，可以精细控制不同环境和导入路径。

示例：

```json
{
  "name": "packageName",
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.cjs",
      "browser": "./dist/index.umd.js",
      "types": "./dist/index.d.ts"
    },
    "./main": "./src/main.js"
  }
}
```

说明：

- `"."`：默认导出（`import pkg from 'packageName'`）；
- `"import"`：ES Module 环境入口；
- `"require"`：CommonJS 环境入口；
- `"browser"`：浏览器环境入口（具体使用由打包工具决定）；
- `"types"`：类型声明文件路径（TS 编译器使用）；
- `"./main"`：子路径导出，对应 `import main from 'packageName/main'`。

要点：

- 一旦声明了 `exports`，Node.js 在解析包入口时会**优先使用 `exports`** 而不是 `main`；
- 对于现代库，**推荐优先使用 `exports` 管理入口**，同时保留 `main` / `module` / `types` 等字段兼容旧工具。

---

### files（控制发布内容）

`files` 指定 `npm publish` 时要包含的文件/目录列表：

```json
{
  "files": ["dist", "index.js", "README.md"]
}
```

规则：

- 指定目录时，会包含目录下所有内容；
- 可以通过 `.npmignore` 声明不发布的文件（类似 `.gitignore`）；
- 如果同时存在 `files` 和 `.npmignore`：
  - `files` 先定义一个“允许发布的白名单”；
  - `.npmignore` 在此基础上再排除一部分文件（黑名单）；
  - 即：**`.npmignore` 可以把本来被 `files` 选中的文件排除掉**。

当没有 `.npmignore` 时，npm 会使用 `.gitignore` 作为默认忽略规则。

---

### sideEffects（tree-shaking 相关）

`sideEffects` 是打包工具（如 webpack）使用的字段，用于指示哪些文件存在副作用，直接影响 tree-shaking 效果。

典型写法：

```json
{
  "sideEffects": false
}
```

含义：

- `"sideEffects": false`
  - 表示**所有导入但未使用的模块都可以被安全地移除**；
  - 适用于纯函数式的组件库/工具库（没有在模块顶层修改全局变量、注入 polyfill 等副作用逻辑）。

如果某些文件有副作用（例如全局样式、polyfill），可以用数组形式：

```json
{
  "sideEffects": ["./src/polyfills.js", "./src/styles/global.css"]
}
```

含义：

- 除数组中列出的文件之外，其它模块都被视为“无副作用”，可以被 tree-shaking 移除；
- 数组中的文件即使只被导入但未使用，也不会被打包器移除。

> 易踩坑提示：如果设置了 `"sideEffects": false` 却忘记把全局样式、polyfill 等加入 `sideEffects` 数组，打包器可能会把这些“只为副作用而导入”的文件当成无用代码删掉，导致样式丢失或运行异常。

---

### publishConfig（发布时覆盖配置）

`publishConfig` 用于在**发布时**覆盖部分配置，例如发布到特定 registry：

```json
{
  "publishConfig": {
    "registry": "https://registry.npmjs.org/",
    "access": "public"
  }
}
```

典型用法：

- 多 registry 场景（公司私有 registry + 公共 npm）；
- 控制私有包访问级别（例如 `access: "restricted"`）。

---

### bin（命令行入口）

`bin` 用于定义 CLI 工具的命令名与入口文件映射。

```json
{
  "name": "my-webpack-cli",
  "version": "1.0.0",
  "bin": {
    "webpack": "bin/index.js"
  }
}
```

`bin/index.js` 一般形如：

```js
#!/usr/bin/env node

console.log('Hello from CLI');
```

并赋予可执行权限：

```bash
chmod +x bin/index.js
```

行为说明：

- 当用户**全局安装**你的包，或使用 `npx` / 在 `npm run` 环境中：
  - 终端执行 `webpack` 时，就会执行 `bin/index.js`。
- `PATH` 相关：
  - 系统执行命令时，会根据环境变量 `PATH` 查找可执行文件；
  - 本地安装的包只会在 `./node_modules/.bin` 中注册命令，不会加入全局 PATH；
  - `npm run` / `npx` 会临时把 `node_modules/.bin` 加入 PATH。

---

## 四、工程脚本与工具配置层

这一层决定“怎么启动项目、如何构建、如何做质量保障”。

### scripts（npm 脚本）

`scripts` 字段用来定义各种 npm 脚本命令，便于统一管理开发、构建、测试等操作：

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "lint": "eslint src --ext .js,.jsx,.ts,.tsx",
    "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,css,scss,md}\""
  }
}
```

执行方式：

```bash
npm run dev
npm run build
npm run lint
```

当你运行 `npm run xxx` 时，npm 会：

- 临时创建一个 Shell；
- 将当前项目的 `node_modules/.bin` 目录加入 `PATH`；
- 因此脚本中可以直接调用本地安装的 CLI 命令（如 `vite`、`eslint`）。

常见脚本约定：

- `dev`：本地开发服务器；
- `build`：生产环境打包；
- `test` / `test:watch`：测试；
- `lint` / `format`：代码风格与格式；
- `prepare`：包安装/发布前自动执行的脚本（见下）。

#### pre / post 钩子

npm 对脚本有 `pre` / `post` 钩子约定，例如：

- 执行 `npm run build` 时：
  - 如存在 `prebuild`，会先执行 `prebuild`；
  - 执行 `build`；
  - 如存在 `postbuild`，最后执行 `postbuild`。

适用于在主脚本前后插入准备/清理逻辑，例如：

```json
{
  "scripts": {
    "prebuild": "npm run lint",
    "build": "vite build",
    "postbuild": "node scripts/after-build.js"
  }
}
```

#### prepare 的行为

`prepare` 在以下场景会执行：

- 对当前包执行 `npm install`；
- `npm publish`、`npm pack`；
- 从 Git 仓库安装依赖时（例如 `npm install git+https://...`）。

典型用途：

- 组件库：在 `prepare` 中构建产物，保证从 Git 安装时也有 `dist`；
- 应用项目：常用于 Husky 等 Git hooks 初始化。

> 实战建议：**应用项目的 `prepare` 不要做太重的构建**，否则每次安装依赖都会变慢。

---

### config（脚本配置注入）

`config` 用于定义通过 npm 覆盖的配置项，这些配置会在 `npm run` 执行脚本时，注入到环境变量中。

```json
{
  "name": "webpack",
  "config": {
    "port": "8080"
  },
  "scripts": {
    "start": "node server.js"
  }
}
```

在 `server.js` 中可以这样访问：

```js
console.log(process.env.npm_package_config_port); // 8080
```

用户可以通过 `npm config set` 覆盖默认值：

```bash
npm config set webpack:port 8000
```

> 现在新项目中较少主动使用 `config`，但遇到时要能看懂其行为：相当于通过 `npm config` 做简单的运行时参数注入。

---

### 工具配置集中化（可选）

越来越多工具支持在 `package.json` 中内联配置，例如：

- `eslintConfig`
- `babel`
- `prettier`
- `lint-staged`
- `browserslist`

示例（片段）：

```json
{
  "eslintConfig": {
    "extends": ["eslint:recommended", "plugin:react/recommended"]
  },
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"]
  }
}
```

实战建议：

- 小型项目：集中写在 `package.json` 中，方便管理；
- 中大型项目：推荐使用独立配置文件（如 `.eslintrc.cjs`、`prettier.config.mjs`），避免 `package.json` 过于臃肿。

---

## 五、运行环境与多包管理层

这一层主要约束“在哪个环境、用什么工具、以什么结构管理项目”。

### packageManager（推荐的包管理器）

在较新的 Node.js / npm 版本中，可以通过 `packageManager` 字段声明推荐使用的包管理器及版本：

```json
{
  "packageManager": "pnpm@9.0.0"
}
```

常见值示例：

- `"npm@10.2.0"`
- `"yarn@1.22.22"`
- `"pnpm@9.0.0"`

作用：

- 帮助团队在不同环境中统一使用同一种包管理器；
- 配合 `corepack` 等工具，可以自动拉起对应版本的 npm/yarn/pnpm；
- 避免多人使用不同包管理器导致锁文件冲突。

---

### workspaces（monorepo 多包管理）

`workspaces` 用于在一个仓库中管理多个包（monorepo），被声明的子包会通过软链接形式统一管理。

> 前提：npm workspaces 功能需要 npm 7 及以上版本（通常搭配 Node.js 16+）。

1. 初始化根项目：

   ```bash
   npm init -y
   ```

2. 在根目录 `package.json` 中启用 workspaces：

   ```json
   {
     "private": true,
     "workspaces": ["packages/*"]
   }
   ```

   > `private: true` 可以避免根包被误发布到 npm。

3. 新建子项目 p1：

   ```bash
   npm init -w packages/p1 -y
   ```

   会生成 `packages/p1/package.json`，`name` 默认是 `p1`。

4. 新建子项目 p2：

   ```bash
   npm init -w packages/p2 -y
   ```

5. 在 `packages/p1/index.js` 中导出函数：

   ```js
   const add = (a, b) => a + b;
   module.exports = { add };
   ```

6. 在 p2 中声明对 p1 的依赖：

   ```bash
   npm i p1 -w packages/p2
   ```

   `-w` / `--workspace` 用来指定在某个 workspace 下执行命令。

7. 在 `packages/p2/index.js` 中使用：

   ```js
   const { add } = require('p1');
   console.log(add(1, 2)); // 3
   ```

   然后执行：

   ```bash
   node packages/p2/index.js
   ```

工作区带来的好处：

- 多个包共享依赖，避免重复安装；
- 本地包之间通过软链接依赖，开发体验接近真实发布后的使用方式；
- 配合 Lerna / Turborepo / Nx 等工具可以做更精细的任务编排。

---

## 六、实战模板：库项目 vs 应用项目

下面给出两类最常见项目的 `package.json` 模板，可以按需裁剪使用。

> 使用建议：不要一上来“全抄”，可以先保留核心脚本和依赖，随着项目成长再逐步完善。

---

### 1. 组件库项目示例（以 React UI 库为例）

特点：会发布到 npm；要考虑对外入口、类型、tree-shaking、`peerDependencies` 等。

```jsonc
{
  "name": "@your-scope/ui-lib", // 包名，推荐使用作用域
  "version": "0.1.0",
  "description": "Your awesome React UI library",
  "keywords": ["react", "ui", "components"],
  "license": "MIT",

  "repository": {
    "type": "git",
    "url": "https://github.com/your-org/ui-lib.git"
  },
  "homepage": "https://github.com/your-org/ui-lib#readme",
  "bugs": {
    "url": "https://github.com/your-org/ui-lib/issues"
  },

  "type": "module", // 默认 .js 按 ESM 处理

  // 传统入口（给旧工具兜底）
  "main": "dist/index.cjs", // CommonJS 入口
  "module": "dist/index.esm.js", // ESM 入口（打包工具）
  "types": "dist/index.d.ts", // TS 类型入口
  "browser": "dist/index.umd.js", // 浏览器 UMD 构建（如需）

  // 推荐：统一通过 exports 管理入口
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.cjs",
      "browser": "./dist/index.umd.js",
      "types": "./dist/index.d.ts"
    },
    "./hooks": {
      "import": "./dist/hooks.esm.js",
      "require": "./dist/hooks.cjs",
      "types": "./dist/hooks.d.ts"
    }
  },

  // 只发布构建产物和文档
  "files": ["dist", "README.md", "LICENSE"],

  // 默认认为模块无副作用，利于 tree-shaking
  "sideEffects": false,

  // 宿主库作为 peer 依赖，不随包一起安装
  "peerDependencies": {
    "react": ">=17.0.0 <19.0.0",
    "react-dom": ">=17.0.0 <19.0.0"
  },

  // 库自身运行时需要的依赖（会一并安装）
  "dependencies": {
    "clsx": "^2.0.0"
  },

  // 开发/构建阶段依赖
  "devDependencies": {
    "typescript": "^5.5.0",
    "vite": "^5.0.0",
    "rollup": "^4.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "eslint": "^9.0.0",
    "jest": "^29.0.0"
  },

  "scripts": {
    "dev": "vite", // 文档站 / demo 开发
    "build": "vite build && npm run build:types",
    "build:types": "tsc -p tsconfig.build.json",
    "test": "jest",
    "lint": "eslint src --ext .ts,.tsx",
    "prepare": "npm run build" // 发布前/从 Git 安装时自动构建（可选）
  },

  "engines": {
    "node": ">=18.0.0"
  },
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  }
}
```

**组件库关键点：**

- 宿主框架（如 React / Vue）放在 `peerDependencies`，避免打包多份；
- 对外入口优先通过 `exports` 管理，同时保留 `main` / `module` / `types` / `browser` 兼容旧工具；
- 使用 `"sideEffects": false`，并确保模块设计无顶层副作用；
- 通过 `files` 控制发布内容，只包含必要的构建产物和文档；
- 可以在 `prepare` 中自动构建，确保从 Git 安装也有 `dist`。

> 使用建议：初次搭建时可以先保留最小集合（例如只用 Vite 或只用 Rollup），随着项目需要再补齐测试、Lint 等工具，避免一开始工具链过于复杂。

---

### 2. 前端应用项目示例（SPA / 管理后台）

特点：不会发布到 npm（只构建部署）；更关注运行时依赖、脚本和工具链。

```jsonc
{
  "name": "my-awesome-app",
  "version": "0.1.0",
  "private": true, // 应用项目通常不发布到 npm，强烈建议设为 true
  "description": "My awesome front-end SPA",
  "keywords": ["react", "spa"],
  "license": "MIT",

  "homepage": ".", // 有时用于 gh-pages / 静态托管
  "repository": {
    "type": "git",
    "url": "https://github.com/your-org/my-awesome-app.git"
  },
  "bugs": {
    "url": "https://github.com/your-org/my-awesome-app/issues"
  },

  "type": "module",

  "scripts": {
    "dev": "vite", // 本地开发
    "build": "vite build", // 生产构建
    "preview": "vite preview", // 预览构建产物

    "lint": "eslint src --ext .js,.jsx,.ts,.tsx",
    "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,css,scss,md}\"",
    "typecheck": "tsc --noEmit",

    "test": "vitest run",
    "test:watch": "vitest",

    "prepare": "husky install" // 安装 git hooks（可选）
  },

  // 运行时依赖：会被打包到最终产物中
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-router-dom": "^6.22.0",
    "axios": "^1.7.0",
    "zustand": "^4.5.0",
    "immer": "^10.0.0"
  },

  // 开发/构建工具依赖
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "typescript": "^5.5.0",

    "vite": "^5.0.0",
    "@vitejs/plugin-react-swc": "^4.0.0",

    "eslint": "^9.0.0",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.0",
    "prettier": "^3.2.0",

    "vitest": "^1.5.0",
    "@vitest/ui": "^1.5.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",

    "husky": "^9.0.0",
    "lint-staged": "^15.0.0"
  },

  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"]
  },

  "engines": {
    "node": ">=18.0.0"
  },

  "packageManager": "pnpm@9.0.0"
}
```

**应用项目关键点：**

- 一定要 `private: true`，避免误发布；
- 框架和 UI 库（React / Vue / AntD 等）放在 `dependencies`，因为运行时代码会直接使用；
- 入口由构建工具（Vite/Webpack）配置决定，一般不需要 `exports` / `main` / `module`；
- 重点是合理设计 `scripts` 和工具链（ESLint、Prettier、测试框架等）；
- 通过 `packageManager` 统一团队使用的包管理器。

> 使用建议：如果暂时不用单元测试或 Git hooks，可以先删掉 `husky`、`lint-staged`、`vitest` 相关配置，确保项目“先能跑起来”，再逐步完善工程化。

---

## 总结：用分层思维看 package.json

当你再打开一个陌生项目的 `package.json` 时，可以按以下顺序快速扫一遍：

1. **基础身份与元信息**：看看 `name` / `version` / `description` / `repository` / `license`，理解这是什么东西、从哪来的。
2. **依赖与版本管理**：重点看 `dependencies` / `devDependencies` / `peerDependencies`，判断它是应用还是库，注意版本策略与锁文件。
3. **发布入口与模块系统**：查看 `main` / `module` / `exports` / `types` / `sideEffects`，判断包是 CommonJS 还是 ESM，是否友好支持 tree-shaking 和 TypeScript。
4. **工程脚本与工具配置**：看 `scripts`、是否内联了 `eslintConfig`、`lint-staged` 等，了解项目如何开发/构建/测试。
5. **运行环境与多包管理**：检查 `engines` / `os` / `packageManager` / `workspaces`，了解 Node 版本要求、包管理器和是否为 monorepo。

只要掌握了这套“分层视角”，`package.json` 不再是一个杂乱的配置文件，而是一张结构清晰、可读性很强的“工程说明书”，对于构建可维护的前端工程体系非常关键。
