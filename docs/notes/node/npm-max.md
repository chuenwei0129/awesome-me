---
title: npm 实操
order: 1
toc: content
group:
  title: 基础知识
---

## 实用工具

- [分析将 npm 软件包添加到项目的成本](https://bundlephobia.com/)
- [分析 npm 模块和依赖关系](https://npmgraph.js.org/)
- [分析 npm 包内容中的 TypeScript 类型问题](https://arethetypeswrong.github.io/)

## 或许是在项目中使用 npm 的最佳的实操建议

1. 优先使用 npm 的官方稳定版本，确保 npm 具备先进性和稳定性。
2. 初始搭建项目时，运行 `npm install` 来安装依赖，并提交 `package.json` 与 `package-lock.json` 文件。`node_modules` 目录无需提交。
3. 作为项目新成员，在 `checkout/clone` 项目后，执行 `npm install` 以安装所需依赖。
4. 需要升级依赖时：
   - 对于小版本更新，使用 `npm update`。
   - 对于大版本更新，使用 `npm install <package>@<version>`。
   - 可以直接在 `package.json` 中修改版本号，然后运行 `npm install`。
   - 升级并测试无误后，提交新的 `package.json` 和 `package-lock.json` 文件。
5. 降级依赖时，使用 `npm install <package>@<version>`，确认无误后提交更新的文件。
6. 移除依赖时：
   - 执行 `npm uninstall <package>`，验证后提交更新的 `package.json` 和 `package-lock.json`。
   - 或直接从 `package.json` 中删除依赖，然后运行 `npm install`，验证后提交更新。
7. 提交更新的 `package.json` 和 `package-lock.json` 后，通知团队成员以同步更新依赖。
8. 避免手动修改 `package-lock.json` 文件，以免引发问题。
9. 若 `package-lock.json` 出现问题，建议删除本地文件，从远端获取无冲突的版本，再执行 `npm install`。

## 一个项目中，你使用 yarn，我使用 npm，会不会有问题呢？

在项目开发中，选择合适的包管理工具对于确保依赖管理的一致性和效率至关重要。虽然 `yarn` 和 `npm` 都是流行的 JavaScript 包管理工具，它们在某些方面存在差异，尤其是当它们在同一项目中被混合使用时，可能会引发一系列问题。

### 什么是 yarn？

`yarn` 是一款于 2016 年发布的包管理工具，旨在解决当时 `npm` (尤其是其 V3 版本) 存在的一些问题，如依赖管理的不稳定性和安装速度慢等。`npm` 在那个时期还没有引入 `package-lock.json` 文件，这是 `yarn` 发布的背景。

![20240422003156](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240422003156.png)

`yarn` 采用了类似于 `npm v3` 的扁平依赖结构，并在安装依赖时自动生成 `yarn.lock` 文件，以确保项目依赖的一致性和稳定性。

```sh
"@babel/cli@^7.1.6", "@babel/cli@^7.5.5":
  version "7.8.4"
  resolved "http://npm.in.zhihu.com/@babel%2fcli/-/cli-7.8.4.tgz#505fb053721a98777b2b175323ea4f090b7d3c1c"
  integrity sha1-UF+wU3IamHd7KxdTI+pPCQt9PBw=
  dependencies:
    commander "^4.0.1"
    convert-source-map "^1.1.0"
    fs-readdir-recursive "^1.1.0"
    glob "^7.0.0"
    lodash "^4.17.13"
    make-dir "^2.1.0"
    slash "^2.0.0"
    source-map "^0.5.0"
  optionalDependencies:
    chokidar "^2.1.8"
```

与 `package-lock.json` 相比，**`yarn.lock` 使用了一种独特的格式**，并且其对子依赖版本的处理方式不同，这意味着**为了确定 `node_modules` 目录的结构，需要将 `yarn.lock` 与 `package.json` 文件一起使用，而 `package-lock.json` 则可以独立确定依赖结构**。

### 混用 yarn 和 npm 可能引发的问题

在同一个项目中同时使用 `yarn` 和 `npm` 可能会导致一系列问题。尽管这两个工具的主要目标都是为 JavaScript 项目管理依赖，但它们在依赖解析算法、锁文件的生成方式以及行为细节上存在差异。以下是混用它们可能导致的问题：

#### 锁文件冲突

- **不同的锁文件**：`yarn` 依赖 `yarn.lock` 文件，而 `npm` 则使用 `package-lock.json` (或在早期版本中为 `npm-shrinkwrap.json`) 来锁定依赖版本。如果团队成员间使用不同的工具，每次依赖的安装或更新都可能只更新其中一个锁文件，导致依赖版本的不一致。
- **版本不一致**：由于 `yarn` 和 `npm` 可能采用不同的依赖解析策略，即便是相同的 `package.json` 文件，两者解析出的依赖树也可能不同，这可能导致不同开发环境中应用的行为不一致。

#### 命令差异

- **命令不同**：虽然 `yarn` 和 `npm` 在许多命令上相似，但它们并不完全相同。例如，`yarn add` 和 `npm install` 都是用于添加依赖的命令，但它们的参数和具体行为可能存在差异，这可能导致误用命令，影响依赖管理。
- **行为差异**：即使是功能相似的命令，在两个工具中的具体行为也可能存在细微差异，如处理依赖冲突和版本升级的策略等。

这些问题提示我们，在一个项目中统一使用 `yarn` 或 `npm` 是维持依赖管理一致性和稳定性的最佳实践。

## 作为一个库的开发者，如何去保证依赖包之间的强制的最低版本的要求？

作为一个库的开发者，确保依赖包之间满足强制的最低版本要求是维护项目稳定性的关键。以 Vue 为例，Vue 官方强调，每当发布新版本的 Vue 包时，相应版本的 vue-template-compiler 也会同步发布。为了确保 vue-loader 能够生成与运行时代码兼容的代码，编译器的版本必须与 Vue 包的版本同步更新。

设想一个场景：**用户升级了 Vue 但未升级 vue-template-compiler**。面对这种情况，作为插件开发者，我们应如何处理？

此类情况背后的核心逻辑在于，依赖包之间的版本号需要严格匹配，以确保库的功能稳定性。我们可以从 create-react-app 的实践中获得灵感。在 create-react-app 的核心包 react-script 中，通过 verifyPackageTree 方法，对项目依赖进行了一系列的版本对比和限制工作。以下是这一方法的实现细节：

```js
function verifyPackageTree() {
  // 定义需要校验的依赖列表
  const depsToCheck = [
    'babel-eslint',
    'babel-jest',
    'babel-loader',
    'eslint',
    'jest',
    'webpack',
    'webpack-dev-server',
  ]

  // 生成用于匹配语义化版本号的正则表达式
  const getSemverRegex = () =>
    /\bv?(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-[\da-z-]+(?:\.[\da-z-]+)*)?(?:\+[\da-z-]+(?:\.[\da-z-]+)*)?\b/gi

  // 读取当前包的 package.json 文件
  const ownPackageJson = require('../../package.json')
  const expectedVersionsByDep = {}

  // 遍历依赖项，确保每个依赖在 package.json 中都有对应的、固定的版本号
  depsToCheck.forEach((dep) => {
    const expectedVersion = ownPackageJson.dependencies[dep]
    if (!expectedVersion) {
      throw new Error('This dependency list is outdated, fix it.')
    }
    if (!getSemverRegex().test(expectedVersion)) {
      throw new Error(
        `The ${dep} package should be pinned, instead got version ${expectedVersion}.`,
      )
    }
    expectedVersionsByDep[dep] = expectedVersion
  })

  let currentDir = __dirname

  // 循环向上遍历目录，直到到达文件系统的根目录
  while (true) {
    const previousDir = currentDir
    currentDir = path.resolve(currentDir, '..')
    if (currentDir === previousDir) {
      break // 已到达根目录
    }
    const maybeNodeModules = path.resolve(currentDir, 'node_modules')
    if (!fs.existsSync(maybeNodeModules)) {
      continue
    }

    // 对每个依赖项，在 node_modules 中检查实际版本是否符合预期
    depsToCheck.forEach((dep) => {
      const maybeDep = path.resolve(maybeNodeModules, dep)
      if (!fs.existsSync(maybeDep)) {
        return
      }
      const maybeDepPackageJson = path.resolve(maybeDep, 'package.json')
      if (!fs.existsSync(maybeDepPackageJson)) {
        return
      }
      const depPackageJson = JSON.parse(
        fs.readFileSync(maybeDepPackageJson, 'utf8'),
      )
      const expectedVersion = expectedVersionsByDep[dep]
      // 使用 semver 库检查版本是否满足要求
      if (!semver.satisfies(depPackageJson.version, expectedVersion)) {
        console.error(
          `The installed version of ${dep} (${depPackageJson.version}) does not satisfy the expected version range (${expectedVersion}). Please update your dependencies.`,
        )
        process.exit(1) // 版本不匹配时，终止进程
      }
    })
  }
}
```

通过这段代码，我们看到 create-react-app 对项目中的核心依赖项如 babel-eslint、babel-jest、babel-loader、eslint、jest、webpack 和 webpack-dev-server 等进行了仔细的版本检查。如果项目依赖的版本不符合 create-react-app 的要求，构建过程将直接报错并停止。

这样做的目的是确保这些核心依赖项的特定版本，从而维护 create-react-app 源码的功能稳定性。通过在构建过程中强制执行这些版本要求，create-react-app 提高了其工具的可靠性，为开发者提供了更加一致和顺畅的开发体验。

## 使用 verdaccio 搭建公司 npm 私有库

随着公司前端项目数量的增加，我们发现了许多可复用的业务组件和逻辑。为了提高开发效率、便于维护，并避免重复在项目之间复制粘贴相同的代码，我们计划将这些可复用的组件和逻辑封装成 npm 包，并通过 npm 包的形式引入。但鉴于这些都是公司内部的业务逻辑，我们一般不希望将它们发布到全球公共的 npm 仓库中。因此，搭建一个属于公司自己的私有 npm 仓库变得尤为重要。

### 搭建 npm 私有库的优势

- **保护业务代码和核心技术**：在公司内部网络中托管组件库和封装的 SDK，能有效保护公司的业务代码和核心技术不被外泄。
- **加速依赖包安装**：**使用像 verdaccio 这样的私有库，能缓存从 npm 公共库安装过的包**，再次安装时会直接从私有库下载，大大提升安装速度。

### verdaccio 简介

[verdaccio](https://verdaccio.org/) 是一个简洁、无需配置的本地私有 npm 包代理注册表。简而言之，verdaccio 允许我们在自己的服务器上搭建一个 npm 仓库，发布 npm 包。当项目中执行 `npm i` 安装依赖时，根据配置文件的指定，系统会优先从 verdaccio 私有库中查找依赖包，如果找到则直接下载，如果没有则从公共 npm 包仓库中下载。

### 安装 verdaccio

首先，我们通过 npm 全局安装 verdaccio：

```sh
sudo npm i verdaccio -g
```

安装完成后，运行以下命令启动 verdaccio：

```sh
verdaccio
```

![20240422142735](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240422142735.png)

启动成功后，你将看到一些关键信息，包括配置文件的目录和服务地址。此时，打开 <http://0.0.0.0:4873/>，你将看到私服已经成功启动。

![20240422170806](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240422170806.png)

为了让 verdaccio 在后台运行，我们可以使用 pm2 来启动和守护进程。如果你还没有安装 pm2，可以通过 `npm i pm2 -g` 来安装。然后，使用 pm2 启动 verdaccio：

```sh
pm2 start verdaccio
```

![20240422170629](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240422170629.png)

### 配置 verdaccio

为了保证安全，我们需要对注册账号、发布和删除 npm 包进行权限控制。verdaccio 提供了灵活的权限配置方案。编辑 verdaccio 的配置文件 (启动服务时会显示配置文件的位置)。

```sh
code /Users/chuenwei/.config/verdaccio/config.yaml
```

你可以按照以下示例配置权限：

```yaml
# 存储发布到私有库的包和从 npm 公共库下载过缓存的包
storage: /Users/chuenwei/.local/share/verdaccio/storage

# ...
auth:
  htpasswd:
    # 存储用户账号的文件
    file: ./htpasswd
    # Maximum amount of users allowed to register, defaults to "+inf".
    # You can set this to -1 to disable registration.
    # 在不需要添加用户的时候只需要把 max_users 的值设置为 -1，就不能添加用户了
    max_users: 1000

# ...

packages:
  '@*/*':
    # 作用域包
    access: $authenticated # 只有注册的账号才可以访问私有库的包
    publish: yourname # 指定账号可以发布包到私有库
    unpublish: yourname # 指定账号可以删除私有库上的包
    proxy: npmjs
  '**':
    access:$authenticated  # 只有注册的账号才可以访问私有库的包
    publish: yourname # 指定账号可以发布包到私有库
    unpublish: yourname # 指定账号可以删除私有库上的包
```

若需配置多个账户，只需用空格隔开即可，如 `publish: yourname othername`。

verdaccio 还提供了许多其他配置选项，包括配置 HTTPS、可视化界面展示配置、发布离线包等，具体可参考[官方文档](https://verdaccio.org/docs/configuration/)了解详细信息。

## 使用 patch-package 给 npm 包打补丁

https://juejin.cn/post/6962554654643191815
https://juejin.cn/post/7156518889151528997
https://juejin.cn/post/7159169143323754503

## 如何写一个全面兼容的 npm 库

https://innei.in/posts/tech/write-a-universally-compatible-js-library-with-fully-types

## npm 执行命令传递参数时，为何需要双横线？

在 `npm` 命令行工具中，当执行一个脚本命令 (如 `npm start`) 时，`npm` 本身也接受一些参数。这些参数用于控制 `npm` 的行为，如 `--silent`、`--verbose` 等。这就带来了一个问题：如果你想向 `npm` 脚本中指定的命令传递参数，如何区分这些参数是给 `npm` 本身的，还是要传递给 `npm` 脚本中指定的命令？

为了解决这个问题，`npm` 使用了双横线 `--` 作为一个特殊的标记，来区分参数是给 `npm` 还是给脚本中的命令。当 `npm` 在命令行中遇到 `--` 时，它会停止解析自己的参数，而把 `--` 后面的所有内容作为参数传递给脚本中指定的命令。这样，你就可以在 `npm` 脚本中使用命令行参数了，而不会与 `npm` 的参数混淆。

例如：

```json
{
  "start": "webpack"
}
```

如果你执行 `npm start -- --config my-config.js`，`npm` 会执行 `start` 脚本中指定的 `webpack` 命令，并将 `--config my-config.js` 作为参数传递给它。这里的 `--` 告诉 `npm`，`--config my-config.js` 不是 `npm` 的参数，而是要传递给 `webpack` 命令的。

这种设计允许 `npm` 脚本非常灵活地接受和处理命令行参数，同时避免了参数解析上的混淆。
