---
title: npm 进阶
order: 0
toc: content
group:
  title: 基础知识
---

## 语义化版本控制 (SemVer)

在 `npm` 生态系统中，模块的版本管理遵循一个被广泛认可的标准：语义化版本控制 (Semantic Versioning)，简称为 `SemVer`。这一规范是由 `GitHub` 提出的，旨在通过版本号提供更多关于软件变更的信息。

**官方网站**：您可以访问 [semver.org](https://semver.org/lang/zh-CN/) 了解 `SemVer` 规范的详细信息。

[规范的 SemVer 格式](https://semver.org/#backusnaur-form-grammar-for-valid-semver-versions)为：`<主版本号>.<次版本号>.<修订号>-<先行版本号>+<构建号>`。其中主版本号、次版本号和修订号必须是数字。先行版本号和构建号可以是字母、数字以及小数点 `.`，不过先行版本号是不可以有前导零的，构建号可以。

我们常见的在 SemVer 前面加上 `~`、`^` 等符号，就表示这是一个 SemVer 范围。下面不严谨地讲一下，更严谨的说明可参阅 [node-semver 文档](https://github.com/npm/node-semver#advanced-range-syntax)。

当我们更新了 `npm` 包的功能并需要发布新版本时，推荐的做法是使用 `npm` 命令行工具自动更新 `package.json` 文件中的版本号，避免手动更改导致的错误。以下是一些常用命令：

- `npm version patch`：发布修订版，例如 `1.0.0` -> `1.0.1`
- `npm version minor`：发布次版本，例如 `1.0.0` -> `1.1.0`
- `npm version major`：发布主版本，例如 `1.0.0` -> `2.0.0`
- `npm version prepatch`：版本号变为 `1.2.4-0`，也就是 `1.2.4` 版本的第一个预发布版本
- `npm version preminor`：版本号变为 `1.3.0-0`，也就是 `1.3.0` 版本的第一个预发布版本
- `npm version premajor`：版本号变为 `2.0.0-0`，也就是 `2.0.0` 版本的第一个预发布版本
- `npm version prerelease`：版本号变为 `2.0.0-1`，也就是使预发布版本号加一

为了方便地操作和比较版本号，我们可以使用 `npm` 提供的 `semver` 包：

```sh
npm install semver
```

这个工具包使我们能够执行以下操作：

```js
const semver = require('semver')

// 比较版本号大小
console.log(semver.gt('1.0.0', '0.9.0')) // 输出：true
console.log(semver.lt('1.0.0', '2.0.0')) // 输出：true

// 验证版本号是否符合某个范围
console.log(semver.satisfies('1.0.0', '>=1.0.0')) // 输出：true

// 将版本号字符串解析为对象
console.log(semver.parse('1.0.0-beta'))
// 输出：{ version: '1.0.0-beta', major: 1, minor: 0, patch: 0, prerelease: ['beta'], build: [] }

// 升级特定类型的版本号
console.log(semver.inc('1.0.0', 'patch')) // 输出：1.0.1
console.log(semver.inc('1.0.0', 'minor')) // 输出：1.1.0
console.log(semver.inc('1.0.0', 'major')) // 输出：2.0.0

// 计算两个版本之间的差异类型
console.log(semver.diff('1.0.0', '1.0.1')) // 输出：patch
```

这些是 `semver` 包的基础用法，更多高级功能和详细文档，请访问 [semver 文档](https://github.com/npm/node-semver)。

## 理解 npm 的依赖包层级关系

在现代 JavaScript 项目中，依赖管理是一个核心环节。项目 `App` 依赖于三个模块 `A`、`B`、和 `C`，它们各自又依赖于不同版本的模块 `D`，构成了一个典型的依赖场景：

```json
"dependencies": {
    "A": "1.0.0",
    "B": "1.0.0",
    "C": "1.0.0"
}
```

具体依赖关系如下：

- A@1.0.0 -> D@1.0.0
- B@1.0.0 -> D@2.0.0
- C@1.0.0 -> D@2.0.0

### 嵌套安装

在 `npm 2.x` 版本中，这种依赖关系通过递归方式安装，形成了一种树状的目录结构。每个包都会在自己的 `node_modules` 目录下安装它所依赖的包：

```sh
├── node_modules
│   ├── A@1.0.0
│   │   └── node_modules
│   │       └── D@1.0.0
│   ├── B@1.0.0
│   │   └── node_modules
│   │       └── D@2.0.0
│   └── C@1.0.0
│       └── node_modules
│           └── D@2.0.0
```

这种方式虽然简单直接，但可能导致模块的大量冗余和深层嵌套。

### 扁平化安装

从 `npm 3.x` 版本开始，npm 引入了一种扁平化的安装策略，旨在将依赖尽可能地安装在项目的顶层 `node_modules` 目录，这样做可以显著减少模块的冗余和嵌套深度。

当你执行 `npm install` 命令后，`node_modules` 的目录结构可能呈现出不同的样态。例如，你可能会看到如下两种目录结构之一：

```sh
├── node_modules
│   ├── A@1.0.0
│   │   └── node_modules
│   │       └── D@1.0.0
│   ├── B@1.0.0
│   ├── C@1.0.0
│   └── D@2.0.0
```

或者：

```sh
├── node_modules
│   ├── A@1.0.0
│   ├── B@1.0.0
│   │   └── node_modules
│   │       └── D@2.0.0
│   ├── C@1.0.0
│   │   └── node_modules
│   │       └── D@2.0.0
│   └── D@1.0.0
```

在这两种情况中，`D@2.0.0` 和 `D@1.0.0` 模块都有可能被优先安装在一级 `node_modules` 目录。那么，面对多个相同但版本不同的模块，哪个版本会被优先安装在一级目录下呢？

通过分析，我们可以得出结论：`npm install` 时，npm 首先会根据 package.json 中依赖的首字母顺序 (@符号排在最前) 对依赖进行排序，然后按照广度优先的策略进行安装。这意味着，系统会优先安装同一层级的模块及其依赖，而不是深入到某个模块的所有子模块。

例如，假设 `D@2.0.0` 最先被安装在一级 `node_modules` 目录下。之后，当你在项目中新增安装依赖于 `D@1.0.0` 的模块 `E@1.0.0` 时，目录结构将变为：

```sh
├── node_modules
│   ├── A@1.0.0
│   │   └── node_modules
│   │       └── D@1.0.0
│   ├── B@1.0.0
│   ├── C@1.0.0
│   ├── D@2.0.0
│   ├── E@1.0.0
│   │   └── node_modules
│   │       └── D@1.0.0
```

这表明，即使一级 `node_modules` 中已存在某个版本的依赖包，如果新安装的依赖包存在版本冲突，它仍会被安装在该新依赖包自己的 `node_modules` 目录中。

另一方面，如果在一级 `node_modules` 中已存在某个版本的依赖包，且新安装的依赖包不存在版本冲突，则新的依赖包将不会被重新安装。这一行为可以通过安装依赖于 `D@2.0.0` 的模块 `F@1.0.0` 来观察，其结果仅包含 `F` 模块，而不会重新安装 `D@2.0.0`。

```sh
├── node_modules
│   ├── A@1.0.0
│   │   └── node_modules
│   │   │   └── D@1.0.0
│   ├── B@1.0.0
│   ├── C@1.0.0
│   ├── D@2.0.0
│   ├── E@1.0.0
│   │   └── node_modules
│   │   │   └── D@1.0.0
│   └── F@1.0.0
```

尽管 `npm 3.x` 采取了扁平化安装策略，但它并没有完全解决 `npm 2.x` 时代存在的问题，有时甚至可能退化到 `npm 2.x` 的处理方式。

为了解决目录中存在多个版本副本的问题，可以使用 `npm dedupe` 命令。这个命令会尝试将所有的二级依赖模块 `D@1.0.0` 重定向到一级目录下，前提是这些模块可以安全地升级到 `D@2.0.0`：

```sh
├── node_modules
│   ├── A@1.0.0
│   ├── D@2.0.0
│   ├── B@1.0.0
│   ├── C@1.0.0
│   ├── E@1.0.0
│   └── F@1.0.0
```

通过这种方式，`npm` 旨在优化项目的依赖管理，减少不必要的模块重复和深层嵌套。

## 为什么 lock 文件至关重要：确保依赖结构的一致性

在分析 npm 的依赖包层级时，我们注意到 npm 3.x 版本引入了扁平化安装策略。尽管这种策略有其优势，但它也带来了一个挑战：依赖结构的不确定性。这种不确定性可能导致不同的安装环境之间出现差异，从而影响项目的可移植性和可复现性。

为了解决这一问题，npm 5.x 版本引入了 package-lock.json 文件。这个文件的目的是锁定依赖结构，确保每次执行 `npm install` 时，无论在何种环境下，都能重现相同的 node_modules 结构。这样，开发者可以确信，他们的代码在所有环境中都将按照相同的方式运行，从而减少了与依赖相关的问题。

## package-lock.json 文件结构

> package-lock.json 文件缓存了项目依赖包的确切版本信息和下载链接，避免了对远程仓库的重复查询。这种机制可以直接跳转到文件完整性校验阶段，显著减少了网络请求的数量。

![20240421223059](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240421223059.png)

## npm 缓存管理

当您运行 `npm install` 或 `npm update` 命令以下载项目依赖时，npm 不仅会在项目的 `node_modules` 目录中安装这些包，而且还会在本地的缓存目录中存储这些包的副本。

在 Linux 或 Mac 系统中，默认的缓存位置是位于用户主目录的 `.npm/_cacache`。此缓存包含两个关键子目录：`content-v2` 和 `index-v5`。`content-v2` 存储实际的包文件缓存，而 `index-v5` 则记录每个包的 hash 值。

npm 利用 `package-lock.json` 文件中的信息，如包的 `integrity`、`version` 和 `name`，来生成一个独特的 key。这个 key 用于定位 `index-v5` 中的缓存记录，进而检索对应的包 hash 值。一旦 hash 值被找到，npm 就可以直接使用缓存中的包，从而加快安装速度。

要管理这些缓存数据，npm 提供了以下命令：

- `npm cache add`：虽然这个命令通常由 npm 内部使用，但开发者也可以用它来手动为特定包添加缓存。
- `npm cache clean`：这个命令将清除缓存目录中的所有数据。出于数据完整性的考虑，执行此操作需要加上 `--force` 参数。
- `npm cache verify`：此命令用于检查缓存数据的有效性和完整性，并清理无用数据。

此外，npm 支持几种离线安装模式，使得在无网络连接时也能安装依赖：

- `--prefer-offline`：此模式下，npm 会优先使用缓存数据进行安装，仅当缓存不可用时才从远程仓库下载。
- `--prefer-online`：与上述模式相反，npm 会优先尝试从网络获取最新的包，仅当网络请求失败时才回退到缓存数据。
- `--offline`：此模式完全依赖于缓存数据，如果缓存中没有所需的包，则安装会失败。

通过合理使用这些缓存管理策略和离线模式，开发者可以在各种环境下高效地使用 npm 进行包管理。

## 校验文件完整性

在下载依赖包之前，我们一般就能拿到 npm 对该依赖包计算的 hash 值，例如我们执行 `npm info` 命令，紧跟 tarball (下载链接) 的就是 shasum(hash)。

用户下载依赖包到本地后，需要确定在下载过程中没有出现错误，所以在下载完成之后需要在本地在计算一次文件的 hash 值，如果两个 hash 值是相同的，则确保下载的依赖是完整的，如果不同，则进行重新下载。

## npm install 整体流程

`npm install` 大概流程如图所示：

![20240421222714](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240421222714.png)

详细概述：

1. **检查 `.npmrc` 文件的优先级顺序**：系统在处理 npm 配置时，会按照以下顺序考虑 `.npmrc` 文件的设置：首先是项目级别的 `.npmrc` 文件，其次是用户级别的，然后是全局级别的，最后是 npm 内置的配置文件。

2. **检查项目中是否存在 `lock` 文件**：
   - **若不存在 `lock` 文件**：
     1. 系统将从 npm 远程仓库获取包的信息。
     2. 根据 `package.json` 文件构建依赖树。在这个过程中，无论是直接依赖还是间接依赖，系统优先尝试将其放置在 `node_modules` 的根目录下。如果遇到相同的模块，系统会检查已存在的模块版本是否满足新模块的版本要求。如果满足，则跳过；如果不满足，则会在当前模块的 `node_modules` 目录下放置新的模块版本。
     3. 接下来，系统会在缓存中查找每个依赖包：
        - 如果**缓存不存在**，系统会从 npm 远程仓库下载包，并进行完整性校验。如果校验失败，系统会尝试重新下载；校验成功后，则将包复制到 npm 缓存目录，并按照依赖结构解压到 `node_modules` 目录中。
        - 如果**缓存存在**，则直接将缓存的包按照依赖结构解压到 `node_modules` 目录中。
     4. 最后，系统会生成 `lock` 文件，以锁定依赖版本。
   - **若存在 `lock` 文件**：
     1. 系统首先检查 `package.json` 中的依赖版本与 `package-lock.json` 中记录的版本是否存在冲突。
     2. 如果没有冲突，系统将直接使用 `lock` 文件中的信息来查找缓存中的包，跳过获取包信息和构建依赖树的过程，后续操作与无 `lock` 文件时相同。

为了深入了解每个包的具体安装过程和细节，您可以执行命令 `npm install package --timing=true --loglevel=verbose`。这将启用详细日志记录，同时显示包安装的时间统计信息，帮助您更好地理解 npm 包的安装流程。

## npm 模块标签 (tag) 简介

如果你不是经常发布 npm 包，可能会对 “模块标签 (tag)” 感到陌生。以 Vue.js 为例，你可以通过运行 `npm dist-tag ls vue` 来查看 Vue.js 包的所有标签。

![npm tags for vue](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240422011943.png)

你会看到像 `beta`、`csp` 和 `latest` 这样的标签。每个标签都与一个特定版本相关联。

标签的作用是什么呢？标签在 npm 中的作用类似于 Git 中的分支。它允许发布者在特定的标签上发布特定版本，同时用户可以选择安装特定标签下的版本。不同标签下的版本互不干扰，这样即使发布者推出预发布版，也不会影响到稳定版的用户。

通常，发布 npm 包时使用 `npm publish` 命令，默认会使用 `latest` 标签，实际上等同于执行 `npm publish --tag latest`。安装包时，使用 `npm install vue` 命令会默认安装 `latest` 标签下的最新版本，等同于执行 `npm install vue@latest`。你也可以创建和使用自定义标签：

```sh
# 假设当前版本是1.0.1
npm version prerelease  # 升级到1.0.2-0
npm publish --tag beta  # 以beta标签发布
npm dist-tag ls vue     # 查看vue的标签，beta对应1.0.2-0
npm install vue@beta    # 安装beta标签的版本，即1.0.2-0
```

当你的预发布版本足够稳定，想要将其设置为正式发布版本时，可以这样操作：

```sh
npm dist-tag add vue@1.0.2-0 latest  # 将1.0.2-0版本的标签设置为latest
npm dist-tag ls vue                   # 现在latest标签对应1.0.2-0版本
```

## 理解和发布域级包 (Scoped Packages)

在 `package.json` 文件中，您可能会遇到两种不同类型的依赖声明：

```json
"devDependencies": {
  "@commitlint/cli": "^7.2.1",
  "commitizen": "^3.0.4"
}
```

这里，以 `@` 符号开头的包名表示它是一个域级包 (scoped package)。域级包的设计初衷是为了把一系列相关的包组织在同一个命名空间之下。这样做不仅便于统一管理，还有助于避免不同包之间的命名冲突。

### 如何发布您的域级包

若要发布一个域级包，您需要在 `package.json` 文件的 `name` 字段中包含域 (scope) 的声明。这可以通过以下命令轻松完成：

```sh
npm init --scope=scopeName -y
```

执行后，您的 `package.json` 将更新为：

```json
{
  "name": "@scopeName/package"
}
```

此时，您可以选择使用您的用户名或组织名作为域。

注意，由于使用了 `@` 符号，npm 默认会将这个包视为私有包。然而，托管私有包在 npm 上是需要付费的。为了明确这是一个公开包，您可以在发布时使用 `--access=public` 选项，这样 npm 就会知道它是公开的：

```sh
npm publish --access=public
```

重要提示：**尽管所有私有包都是域级包，但并不是所有域级包都是私有的**。

### 安装域级包

当您想要安装一个域级包时，您需要使用其完整的名字，如下所示：

```sh
npm install @scopeName/package
```

通过这种方式，您可以确保正确地安装了所需的域级包。

## 深入探索 npm init

`npm init` 是一个众所周知的命令，用于建立新的 npm 包，但它还藏着一个鲜为人知的强大功能：

> 使用 `npm init <initializer>` 可以快速启动项目构建。

这里的 `<initializer>` 指的是一个名为 `create-<initializer>` 的 npm 包。当你运行 `npm init` 命令时，它会通过 `npx` 自动安装这个包，并执行包内 `package.json` 文件中 `bin` 字段指定的脚本。这个过程不仅创建或更新了 `package.json` 文件，还执行了初始化项目所需的其他操作。

转换规则如下：

- 执行 `npm init foo` 相当于运行 `npx create-foo`
- 执行 `npm init @usr/foo` 相当于运行 `npx @usr/create-foo`
- 执行 `npm init @usr` 相当于运行 `npx @usr/create`

以 `Vite` 为例，官方推荐的初始化命令：

```sh
npm init vite@latest -> npx create-vite@latest
```

实际上也就是通过 `npx` 去下载 `create-vite` 最新的包。

## npm 实用命令

- **查看项目脚本**：要快速查看当前项目的 npm 脚本，您可以直接在项目的 `package.json` 文件中查找 `scripts` 部分。或者，使用 `npm run` 命令来列出所有可用的脚本。
- **查看环境变量**：运行 `npm run env` 命令可以显示当前的环境变量。这对于调试和确保正确的环境配置很有帮助。
- **环境自检**：使用 `npm doctor` 命令，您可以执行一系列检查，以确保您的环境配置适合 npm 操作。这包括连接到 npm 服务的能力、`node` 与 `npm` 的版本校验、npm 源检查以及缓存文件权限验证。
- **安全漏洞检查**：运行 `npm audit` 来检查项目依赖中的安全漏洞。添加 `--json` 标志可以以 JSON 格式输出报告，便于进一步的分析。
- **依赖版本锁定**：默认情况下，npm 使用脱字符 `^` 来限制安装的模块的主版本号。您可以通过运行 `npm config set save-prefix="~"` 来改用波浪符 `~`，或者使用 `npm config set save-exact true` 来仅安装精确版本的模块。
- **跨目录运行脚本**：如果您有多个应用程序分布在不同的目录中，可以使用 `--prefix` 标志配合 `npm run` 命令来指定在哪个目录下运行脚本，例如：`npm run dev --prefix /path/to/your/folder`，从而避免了多次使用 `cd` 命令切换目录。
