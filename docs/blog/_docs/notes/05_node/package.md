---
title: package.json
order: 2
toc: content
group:
  title: 基础知识
---

> 本文从「字段说明 → 依赖管理 → 最佳实践 → 实战模板」完整整理 `package.json`，统一术语和风格，并修正常见误解。示例中使用的带注释 JSON（`jsonc`）仅用于讲解，**真实的 `package.json` 必须是合法 JSON：不允许任何注释，也不能有多余的逗号**。

---

## package.json 简述

`package.json` 是 Node.js / 前端工程中最核心的配置文件之一，用来描述：

- 项目信息（名称、版本、描述、作者等）
- 依赖管理（依赖、开发依赖、对等依赖等）
- 运行与构建脚本（scripts）
- 打包入口（main / module / exports / browser 等）
- 运行环境约束（engines、os 等）

在空目录中执行：

```bash
npm init -y
```

会自动生成一个基础的 `package.json`：

```jsonc
{
  "name": "my-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

> 再次强调：上述示例使用 `jsonc` 语法展示。实际项目中的 `package.json` 不允许出现注释和多余逗号。

更多配置项可以参考 [npm 官方文档](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)。

---

## npm 官方字段

### name, version

- `name`（包名）
  - 长度必须 ≤ 214 字节；
  - 不能以 `.` 或 `_` 开头；
  - 不能包含大写字母；
  - 不能包含空格或非 URL 安全字符（如 `~)('!*` 等）；
  - 支持作用域名：`@scope/package-name`；
  - 建议不要与 Node 核心模块（如 `fs`、`http`）重名，也不建议刻意加 `js` / `node`。
- `version`（版本号）
  - 必须符合语义化版本 SemVer：`主版本.次版本.补丁`，如 `1.2.3`；
  - 每次发布到 npm 的版本号必须唯一。

> `name` 和 `version` 在包要发布到 npm registry 时是必填字段，对于只在本地使用的私有项目可不强求，但建议也保持规范。

---

### scripts

`scripts` 字段用来定义各种 npm 脚本命令，便于统一管理开发、构建、测试等操作：

```jsonc
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

当你运行 `npm run xxx` 时，npm 会临时创建一个 Shell，并将当前项目的 `node_modules/.bin` 目录加入 `PATH`，因此可以在脚本中直接调用本地安装的 CLI 命令（如 `vite`、`eslint`）。

常见脚本约定：

- `dev`：本地开发服务器
- `build`：生产环境打包
- `test` / `test:watch`：测试
- `lint` / `format`：代码风格与格式
- `prepare`：包安装后自动执行的脚本，常用于 Husky 等 Git hook 初始化

---

### bin

`bin` 用于定义 CLI 工具的命令名与入口文件映射。

```jsonc
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

- 当用户**全局安装**你的包（或使用 `npx`，或在 `npm run` 环境中）：
  - 在终端执行 `webpack` 时，就会执行 `bin/index.js`
- `PATH` 相关说明：
  - 系统执行命令时，会根据环境变量 `PATH` 查找可执行文件；
  - 本地安装的包只会在 `./node_modules/.bin` 中注册命令，不会加入全局 PATH；
  - `npm run` / `npx` 会临时把 `node_modules/.bin` 加入 PATH。

---

### config

`config` 用于定义通过 npm 覆盖的配置项，这些配置会在 `npm run` 执行脚本时，注入到环境变量中。

```jsonc
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

> 现在新项目中较少主动使用 `config`，但遇到时要能看懂。

---

### author, contributors

- `author`：单一作者信息
- `contributors`：贡献者列表

两者都可以用对象或字符串表示：

```jsonc
{
  "author": {
    "name": "yourname",
    "email": "youremail@xx.com",
    "url": "https://yoururl.com/"
  },
  "contributors": ["name <b@rubble.com> (http://barnyrubble.tumblr.com/)"]
}
```

---

### dependencies, devDependencies, optionalDependencies

- `dependencies`
  - 运行时依赖：项目在**运行中**需要的包；
  - 例如 React、Vue、Ant Design、Axios 等。
- `devDependencies`
  - 开发/构建依赖：只在**开发或构建阶段**需要；
  - 例如 webpack、Vite、Babel、ESLint、TypeScript、Jest 等。
- `optionalDependencies`
  - 可选依赖：安装失败不会导致整个安装失败；
  - 常用于某些平台特定的依赖或可选特性。

版本值可以是：

- 版本范围（推荐做法）
  - 如：`"axios": "^1.7.0"`、`"lodash": "~4.17.21"` 等，遵循 SemVer。
- tarball 地址
  - 如：`"my-lib": "https://cdn.com/my-lib-1.0.0.tgz"`。
- 本地路径（适合本地调试）
  - 如：`"my-lib": "file:../packages/my-lib"`。
- GitHub 简写
  - 如：`"antd": "ant-design/ant-design#4.0.0-alpha.8"`。
- 完整 Git URL
  - 如：`"my-lib": "git+https://github.com/user/repo.git#v1.2.3"`。

示例：

```jsonc
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

> 对于**应用项目**，框架和 UI 库通常放在 `dependencies`；
> 对于**组件库**，很多时候应该放在 `peerDependencies`（见下文）。

---

### peerDependencies

`peerDependencies`（对等依赖）主要用于**库 / 插件**场景：

- 你的包要依赖某个“宿主”库（如 React/Vue），但不希望把它打包进来；
- 要求使用你库的人，在他们的项目中自行安装且保持版本兼容。

示例：React 组件库要求使用者安装 `>=17.0.1` 的 React：

```jsonc
{
  "peerDependencies": {
    "react": ">=17.0.1",
    "react-dom": ">=17.0.1"
  }
}
```

关键点：

1. 体积优化
   - 使用你的组件库的人本地已经安装了 React，你再打包一份会导致多份 React 共存和体积膨胀。
2. 版本一致性
   - 要求使用者使用与你兼容的 React 版本，否则会产生警告或运行时错误。

> 行为差异：
>
> - npm 6 及之前：不会自动安装 `peerDependencies`，只给出警告，必须使用者手动安装；
> - npm 7+：会尝试自动安装，但遇到版本冲突仍会报错，所以声明范围要谨慎。
> - 对于可选 peer 依赖可以配合 `peerDependenciesMeta` 使用。

---

### engines

`engines` 用来声明对 Node/npm 版本的要求：

```jsonc
{
  "engines": {
    "node": ">=16.0.0 <22.0.0",
    "npm": ">=8.0.0"
  }
}
```

不同工具的处理：

- npm：默认只警告，不阻止安装（可通过配置 `engine-strict=true` 变严格）；
- Yarn / pnpm：通常更严格，但也可通过配置关闭检查。

---

### workspaces

`workspaces` 用于在一个仓库中管理多个包（monorepo），被声明的子包会通过软链接形式统一管理。

1. 初始化根项目：

   ```bash
   npm init -y
   ```

2. 在根目录 `package.json` 中启用 workspaces：

   ```jsonc
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

---

### files

`files` 指定 `npm publish` 时要包含的文件/目录列表：

```jsonc
{
  "files": ["dist", "index.js", "README.md"]
}
```

- 指定目录时，会包含目录下所有内容；
- 可以通过 `.npmignore` 声明不发布的文件（类似 `.gitignore`）；
- 如果同时存在 `files` 和 `.npmignore`，**`.npmignore` 优先**，即 `.npmignore` 中的文件会被排除。

当没有 `.npmignore` 时，npm 会使用 `.gitignore` 作为默认忽略规则。

---

### main

`main` 指定包的默认入口文件：

```jsonc
{
  "main": "dist/index.cjs"
}
```

- 不指定时默认是 `index.js`；
- Node.js 在加载 CommonJS 包（`require('your-package')`）时，如果没有 `exports` 字段，会使用 `main` 作为入口；
- 文件是 CommonJS 还是 ESM，取决于文件扩展名（`.cjs` / `.mjs`）和 `type` 字段（见后文）。

---

### publishConfig

`publishConfig` 用于在**发布时**覆盖部分配置，例如发布到特定 registry：

```jsonc
{
  "publishConfig": {
    "registry": "https://registry.npmjs.org/",
    "access": "public"
  }
}
```

私有包可以设置不同的 registry 与 access 策略。

---

### browser

`browser` 字段通常由打包工具使用，用于指定浏览器环境的入口或替换实现：

```jsonc
{
  "main": "dist/index.cjs",
  "browser": "dist/index.umd.js"
}
```

- Node.js 本身不会使用 `browser`；
- Webpack/Rollup 等工具可以根据配置优先使用 `browser` 字段。

---

### description, keywords

`description` 和 `keywords` 会影响 npm 搜索排名和曝光度：

```jsonc
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

`npm search` 或 npm 官网搜索时，会匹配这些字段。

---

### homepage, bugs, repository

```jsonc
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

---

### license

`license` 指定项目的开源协议，决定他人可以如何使用、修改、分发你的代码。

常见协议：

- MIT
- Apache-2.0
- GPL-3.0
- BSD-2-Clause / BSD-3-Clause 等

合理选择并声明 license 对开源项目非常重要，避免法律风险。

---

### private

```jsonc
{
  "private": true
}
```

`private: true` 会阻止 npm 发布该包，常用于：

- 私有应用项目（前端 SPA / 后台）
- monorepo 根目录（配合 `workspaces`）

---

### os

`os` 用于限制包在哪些操作系统上可安装：

只允许 macOS 和 Linux：

```jsonc
{
  "os": ["darwin", "linux"]
}
```

黑名单形式：禁止在 Windows 上安装：

```jsonc
{
  "os": ["!win32"]
}
```

---

## 非 npm 官方字段（构建与工具集成）

### package.json 的演进

1. npm 成为前端包管理中心
   - 前后端统一使用 npm 生态，JavaScript 依赖管理集中到 `package.json`。
2. 多入口支持
   - `main`、`browser`、`module`、`exports` 等字段出现，让包能针对 Node、浏览器、打包器提供不同构建。
3. TypeScript 集成
   - `types` / `typings` 字段作为类型入口，加速 TS 普及。
4. 工具配置集中化
   - 许多工具支持直接在 `package.json` 中内联配置（Babel、ESLint、Prettier、Husky 等），虽然大型项目往往更倾向使用独立配置文件。

---

### types / typings

为 TypeScript 提供类型声明入口：

```jsonc
{
  "main": "dist/index.cjs",
  "types": "dist/index.d.ts"
}
```

- `types` / `typings` 都可以被 TypeScript 识别；
- 纯 JS 库如果同时发布 `.d.ts`，可以大幅提升使用体验。

---

### module（构建工具约定字段）

`module` 不是 Node/npm 官方字段，而是**打包工具约定**用来指向 ES Module 入口：

```jsonc
{
  "main": "dist/index.cjs",
  "module": "dist/index.esm.js"
}
```

- Node.js 不会读取 `module`；
- Webpack/Rollup 等工具可以优先使用 `module` 的 ESM 版本，以实现更好的 tree-shaking。

---

### exports（推荐的现代入口声明）

`exports` 是 Node.js 官方推荐的现代入口声明方式，可以精细控制不同环境和导入路径。

示例：

```jsonc
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
- `"browser"`：浏览器环境入口（具体使用由工具决定）；
- `"types"`：类型声明文件路径（TS 编译器使用）；
- `"./main"`：子路径导出，对应 `import main from 'packageName/main'`。

> 当构建工具和运行时都支持 `exports` 时，一般会优先使用 `exports`，`main` / `module` / `browser` 更多作为兼容旧工具的补充。

---

### type（模块系统）

`type` 用来声明包中 `.js` 文件的默认模块系统：

```jsonc
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

> UMD 不是 `type` 的合法值，它只是构建产物的一种打包格式（通常由打包工具生成到 `dist/*.umd.js`）。

---

### sideEffects（tree-shaking 相关）

`sideEffects` 是打包工具使用的字段，用于指示哪些文件存在副作用，直接影响 tree-shaking 效果。

典型写法：

```jsonc
{
  "sideEffects": false
}
```

含义：

- `"sideEffects": false`
  - 表示**所有导入未使用的模块都可以被安全地移除**；
  - 适用于纯函数式的组件库/工具库（没有在模块顶层修改全局变量、注入 polyfill 等副作用逻辑）。

如果某些文件有副作用（例如全局样式、polyfill），可以用数组形式：

```jsonc
{
  "sideEffects": ["./src/polyfills.js", "./src/styles/global.css"]
}
```

含义：

- 除数组中列出的文件之外，其它模块都被视为“无副作用”，可以被消除；
- 数组中的文件即使只被导入但未使用，也不会被 tree-shaking 移除。

实践建议：

- 对于**组件库**：
  - 提前设计模块结构，尽量做到无副作用，启用 `"sideEffects": false`；
  - 如有全局样式/注册逻辑，列入 `sideEffects` 数组。
- 对于**应用项目**：
  - 一般不需要设置（由框架和打包器处理即可）；
  - 若需要精细优化打包体积，可视情况使用。

---

## package.json 与 package-lock.json

> `package.json` 负责“声明你想要什么范围的版本”；
> `package-lock.json` 负责“记录实际安装的具体版本和依赖树”。

### 为什么 package.json 允许版本范围

如果在 `package.json` 里写死版本：

```jsonc
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

> 这些只是“允许范围”，**真正安装的具体版本还受 `package-lock.json` 影响**。

---

### package-lock.json 的作用

`package-lock.json` 会记录：

- 顶层依赖及其**实际安装版本**；
- 每个依赖的子依赖树（嵌套依赖）；
- 下载源（registry、tarball URL 等）；

目的：保证不同时间、不同机器运行 `npm install`，得到**完全一致**的依赖树。

举例：

```jsonc
{
  "dependencies": {
    "lodash": "^4.17.20"
  }
}
```

- 第一次安装时，如果最新可用版本是 `4.17.21`，`npm install` 会安装 `4.17.21`；
- `package-lock.json` 会记录 `"version": "4.17.21"`；
- 后续即便发布了 `4.17.22`，在不修改锁文件的前提下再执行 `npm install`，仍会安装 `4.17.21`。

官方说明：

> It describes the exact tree that was generated, such that subsequent installs are able to generate identical trees, regardless of intermediate dependency updates.

相关工具的锁文件：

- npm：`package-lock.json` / `npm-shrinkwrap.json`；
- Yarn：`yarn.lock`；
- pnpm：`pnpm-lock.yaml`。

---

### package-lock.json 是否应该提交到 Git

基于 npm v8 官方文档，推荐**将 `package-lock.json` 提交到版本控制系统**。

好处：

1. **依赖一致性**
   - 所有开发者、测试环境、生产环境使用完全一致的依赖版本。
2. **安装更快、更稳定**
   - 减少解析版本范围和网络请求，降低安装失败概率。
3. **可审计性**
   - 通过锁文件的 diff 可以清晰查看依赖变更，便于代码审查和安全审计。
4. **简化新环境配置**
   - 新同事或 CI/CD 只需 `npm ci` / `npm install` 即可复原依赖环境。

> 对于 npm 项目，推荐使用 `npm ci` 在 CI 环境中根据 `package-lock.json` 进行干净安装。

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

> 不同 npm 版本的颜色策略略有差异，**不要过分依赖颜色判断**，重点看 `Current / Wanted / Latest` 三列，结合自己的版本策略决定是否升级。

---

### 依赖管理最佳实践（总结）

1. **选择合适的版本策略**

   - 核心依赖（框架、ORM、驱动等）：
     - 倾向稳定，可使用较严格的版本范围 + 锁文件控制更新节奏。
   - 非核心依赖：
     - 可以使用 `^` / `~` 接收补丁或小版本更新。

2. **定期审查和更新**

   - 使用 `npm audit` 检查安全漏洞；
   - 使用 `npm outdated` 定期梳理可更新列表；
   - 以“版本周期”为单位（每个大版本或每月/每季度）做一次集中升级。

3. **管理锁文件**

   - 始终提交 `package-lock.json` 到版本控制；
   - 更新依赖时同步更新锁文件，并跑一轮基础测试。

4. **处理不活跃依赖**
   - 对于不再维护的依赖，建议锁定版本，防范意外变更；
   - 如果有明显问题或安全风险，尽量迁移到更活跃的替代品。

---

## 实战示例：库项目与应用项目的 package.json 模板

下面给出两类最常见项目的 `package.json` 模板，可以直接在项目中裁剪使用。

> 说明：以下示例使用 `jsonc` 带注释，真实项目请删除所有注释。

### 1. 组件库项目示例（以 React UI 库为例）

特点：会发布到 npm；要考虑对外入口、类型、tree-shaking、peerDependencies 等。

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
    "prepare": "npm run build" // 发布前自动构建（可选）
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

- 宿主框架（如 React / Vue）放在 `peerDependencies`；
- 对外入口优先通过 `exports` 管理，同时保留 `main` / `module` / `types` / `browser` 兼容旧工具；
- 使用 `"sideEffects": false`，并确保模块设计无顶层副作用，以提升 tree-shaking 效果；
- 通过 `files` 控制发布内容，只包含必要的构建产物和文档。

---

### 2. 前端应用项目示例（SPA / 管理后台）

特点：不会发布到 npm（只构建部署）；更关注运行时依赖、脚本和工具链。

```jsonc
{
  "name": "my-awesome-app",
  "version": "0.1.0",
  "private": true, // 应用项目通常不发布到 npm，必须设为 true
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
  }
}
```

**应用项目关键点：**

- 一定要 `private: true`，避免误发布；
- 框架和 UI 库（React / Vue / AntD 等）放在 `dependencies`，因为运行时代码会直接使用；
- 入口由构建工具（Vite/Webpack）配置决定，一般不需要 `exports` / `main` / `module`；
- 重点是合理设计 `scripts` 和工具链（ESLint、Prettier、测试框架等）。
