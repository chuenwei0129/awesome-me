---
title: package.json
order: 2
toc: content
group:
  title: 基础知识
---

## npm 版本号发布规则

[官方文档](https://docs.npmjs.com/about-semantic-versioning)中建议的 npm 库的版本号的发布规则如下：

| 场景               | 阶段       | 规则                                    | 例子  |
| ------------------ | ---------- | --------------------------------------- | ----- |
| 首次发布           | 新产品     | 从 1.0.0 开始                           | 1.0.0 |
| 向后兼容的bug修复  | 发布补丁   | 第三位数字值递增                        | 1.0.1 |
| 向后兼容的新特性   | 小版本更新 | 第二位数字递增且将第三位数字重置为0     | 1.1.0 |
| 破坏向后兼容的修改 | 大版本更新 | 第一位数字递增且将第二、三为数字重置为0 | 2.0.0 |

这些规则可以图解为：

![20240421173455](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240421173455.png)

尽管理论上清晰，现实中许多库并未严格遵循这些规则，有时导致了一些混乱。

## package.json 与 package-lock.json 的协同作用

> package.json 与 package-lock.json 组合的用法应该理解为工程实践上的一种权衡。**同时考虑便利性和可靠性而做出的一种权衡。**

### 为什么 package.json 允许定义版本范围

在 package.json 文件中，明确指定依赖版本，如 `"my-package": "1.0.1"`，确保了您使用的是特定的库版本。然而，这种做法可能会限制您及时获取库更新的机会。例如，**如果某个库发布了性能改进的补丁或新增了实用功能，固定版本号会导致您错过这些更新**。为了解决这个问题，package.json 允许您定义一个版本范围，从而在保持一定稳定性的同时，也能享受到依赖库的及时更新。

以下是不同场景下的版本范围定义示例及其解释：

| 场景                             | 示例范围                                     | 描述                                                                            |
| -------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------- |
| 指定大版本的最新补丁             | `"some-lib": "1.0"` 或 `"some-lib": "1.0.x"` | 可以安装1.0.x中最新的补丁版本，例如1.0.2、1.0.6等。                             |
| 指定小版本以上的最新补丁         | `"some-lib": "~1.0.4"`                       | 可以安装1.0.x中，1.0.4及以上的最新补丁版本，但不会安装低于1.0.4的版本。         |
| 指定大版本的最新小版本和补丁     | `"some-lib": "1"` 或 `"some-lib": "1.x"`     | 可以安装1.x.x中的任意最新小版本和补丁版本，例如1.0.6、1.1.6、1.2.3、1.3.0等。   |
| 指定小版本以上的最新小版本和补丁 | `"some-lib": "^1.1.4"`                       | 可以安装1.x.x中，1.1.4及以上的最新小版本和补丁版本，但不会安装低于1.1.4的版本。 |
| 安装最新版本                     | `"some-lib": "*"` 或 `"some-lib": "x"`       | 可以安装最新版本的库，不受大版本、小版本或补丁版本的限制。                      |

> 注意：以上都是以项目中没有 package-lock.json 为前提假设，package-lock.json 的存在会对依赖安装过程产生影响，这一点将在后续部分讨论。

### package-lock.json 的必要性与作用

在使用 npm 安装项目依赖时，package.json 允许我们为依赖指定一个版本范围。这种灵活性的好处是可以自动接收到依赖的安全补丁和小更新，但它也带来了一个问题：如何确保在不同的开发环境或者在不同时间点上使用 `npm install` 安装的依赖是完全一致的？

这就是 `package-lock.json` 文件的作用所在。它记录了安装时每个依赖项的确切版本，以及这些依赖项的依赖树，从而确保了无论何时运行 `npm install`，不论依赖项的中间版本如何更新，都能生成一模一样的依赖树。

假设在项目的 `package.json` 中，我们有这样一个依赖声明：

```json
"lodash": "^4.17.20"
```

这意味着安装 `lodash` 时，可以安装 `4.17.20` 以上的版本，但不会安装到下一个大版本 (即不会安装到 `5.x.x`)。如果在项目初始化时，最新的 `lodash` 版本是 `4.17.21`，那么 `npm install` 将安装 `4.17.21` 版本的 `lodash`。

此时，package-lock.json 将记录下 `lodash` 的具体版本为 `4.17.21`。后续，即使 `lodash` 发布了新的补丁版本 (比如 `4.17.22`)，再次运行 `npm install` 时，由于 package-lock.json 的存在，将仍然安装 `4.17.21` 版本，确保所有开发者和部署环境中的依赖完全一致。

package-lock.json 的作用 —— 当 `npm install` 时发现本地有 package-lock.json，就会严格按照 package-lock.json 的版本来安装。

> 官方文档原文：
> It describes the exact tree that was generated，such that subsequent installs are able to generate identical trees，regardless of intermediate dependency updates。

(注意：这个行为在某些 npm 版本里是有问题的 —— 如 npm 5.1.0 中这个行为一度被废弃，即如果 npm 发现符合 package.json 里的新版本的库依然会忽视 package-lock.json 安装新版本。

### 该不该将 package-lock.json 上传到 git

基于 Npm 最新版本 (v8.x) 的官方文档 [package-lock.json | npm Docs](https://docs.npmjs.com/cli/v8/configuring-npm/package-lock-json/)

结论是**应该把 package-lock.json 上传到 git**。

![20240421174644](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240421174644.png)

将 package-lock.json 文件上传到 Git 的好处：

1. **确保依赖一致性**：`package-lock.json` 记录了项目依赖树的确切状态，包括每个包的具体版本和来源。这意味着无论何时何地运行 `npm install`，只要 `package-lock.json` 存在，就能保证安装的依赖与其他开发者和生产环境完全一致。这对于避免 “在我这里可以运行，但在你那里却不行” 的问题至关重要。

2. **减少不必要的网络请求**：当存在 `package-lock.json` 时，npm 可以直接使用文件中的信息来安装依赖，而不需要额外的网络请求去查询每个包的最新版本。这不仅加快了依赖安装的过程，还减少了因网络问题导致的安装失败的可能性。

3. **方便代码审查**：更新 `package-lock.json` 并将其提交到 Git，可以让团队成员通过 Git 的 Diff 功能清楚地看到依赖的变化。这对于审查代码、跟踪依赖更新及其可能带来的影响非常有帮助。

4. **避免重复解析 `package.json`**：从 npm v7 版本开始，`package-lock.json` 已经能够完整地描述 `package.json` 中定义的依赖关系，这意味着 npm 可以直接使用 `package-lock.json` 中的信息，而无需再次解析 `package.json`。这进一步提高了安装过程的效率。

5. **简化项目设置**：通过将 `package-lock.json` 加入版本控制，新团队成员或构建系统在克隆项目后可以立即使用 `npm install` 安装确切的依赖版本，无需担心依赖不一致的问题。这使得项目设置变得更加简单和可靠。

### 定期更新依赖

我们的目的是保证团队中使用的依赖一致或者稳定，而不是永远不去更新这些依赖。实际开发场景下，我们虽然不需要每次都去安装新的版本，仍然需要定时去升级依赖版本，来让我们享受依赖包升级带来的问题修复、性能提升、新特性更新。

![20240421214323](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240421214323.png)

使用 `npm outdated` 可以帮助我们列出有哪些还没有升级到最新版本的依赖：

- 黄色表示不符合我们指定的语意化版本范围 - 不需要升级
- 红色表示符合指定的语意化版本范围 - 需要升级

执行 `npm update` 会升级所有的红色依赖。

### 最佳实践

#### 选择合适的版本策略

- **对于核心和关键依赖**，推荐使用更稳定的版本号策略。精确版本号 (例如 `1.2.3` 而非 `^1.2.3` 或 `~1.2.3`) 可以保证依赖的稳定性，避免自动更新可能带来的不兼容问题。这种做法对于确保项目的长期稳定性尤为重要。
- **对于非关键依赖**，可以考虑使用模糊版本号 (如使用 `^` 或 `~`)，以便自动接收补丁和小更新。这样做可以帮助项目保持更新，同时减少潜在的安全风险。

#### 定期审查和更新依赖

- **定期审查项目依赖**，确保依赖库仍然得到维护，并且没有已知的安全问题。使用如 `npm audit` 这样的工具可以帮助检测存在安全漏洞的依赖。
- **计划性地更新依赖**，而非仅仅依赖自动更新。虽然自动更新可以帮助快速修复问题，但手动审查更新可以确保更新不会引入新的问题。

#### 管理 `package-lock.json`

- **始终将 `package-lock.json` 文件提交到版本控制系统**。这有助于确保所有开发者和部署环境使用完全相同的依赖版本，从而避免 “在我的机器上可以运行” 这类问题。
- **定期更新 `package-lock.json`**，尤其是在更新项目依赖后，确保它反映了项目依赖的最新状态。

#### 对于不活跃的依赖库

- **对于个人维护或不再活跃的库**，使用精确版本号来锁定依赖。这可以减少因库的不稳定更新而带来的风险。
- **考虑替代方案**。如果某个依赖不再活跃，且存在已知问题或不再满足需求，寻找更加稳定和活跃的替代库可能是一个好选择。

## package.json 简述

package.json 是一个 JSON 文件，用于描述项目信息，比如项目名称、版本号、依赖等信息。

当我们新建一个名称为 my-app 的项目时，使用 `npm init -y` 命令后，在项目目录下会新增一个 package.json 文件，内容如下：

```json
{
  "name": "my-app", # 项目名称
  "version": "1.0.0", # 项目版本
  "description": "", # 用于编写描述信息。有助于人们在npm库中搜索的时候发现你的模块。
  "main": "index.js", # 入口文件
  "scripts": { # 指定运行脚本命令的 npm 命令行缩写
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [], # 关键词。有助于人们在npm库中搜索的时候发现你的模块。
  "author": "", # 作者
  "license": "ISC" # 开源许可证 在所有副本中保留版权声明和许可证声明，使用者就可以拿你的代码做任何想做的事情，你也无需承担任何责任
}
```

更多配置项可以参考[官方文档](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)。

## package.json 里 npm 官方的字段

### name, version

- name 必须小于等于 214 个字符，不能以 `.` 或 `_` 开头，不能有大写字母，因为名称最终成为 URL 的一部分因此不能包含任何非 URL 安全字符。npm 官方建议我们不要使用与核心节点模块相同的名称。不要在名称中加 js 或 node。
- version 定义项目的版本号，格式为：`大版本号.次版本号.修订号`，每次发布时 version 不能与已存在的一致。
- name 和 version 只有作为包发布时才是必须字段。

    ![20240421172842](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240421172842.png)

#### bin

`bin` 项用来指定每个内部命令对应的可执行文件的位置。如果你编写的是一个 node 工具的时候一定会用到 `bin` 字段。

当我们编写一个 `cli` 工具的时候，需要指定工具的运行命令，比如常用的 `webpack` 模块，他的运行命令就是 `webpack`。

```json
{
  "bin": {
    "webpack": "bin/index.js",
  }
}
```

当我们执行 `webpack` 命令的时候就会执行 `bin/index.js` 文件中的代码。

> PATH 环境变量，是告诉系统，当要求系统运行一个程序而没有告诉它程序所在的完整路径时，系统除了在当前目录下面寻找此程序外，还应到哪些目录下去寻找。
>
> 在 terminal 中执行命令时，命令会在 PATH 环境变量里包含的路径中去寻找相同名字的可执行文件。局部安装的包只在 `./node_modules/.bin` 中注册了它们的可执行文件，不会被包含在 PATH 环境变量中，这个时候在 terminal 中输入命令将会报无法找到的错误。
>
> 那为什么通过 `npm run` 可以执行局部安装的命令行包呢？
>
> 是因为每当执行 `npm run` 时，会自动新建一个 Shell，这个 Shell 会将当前项目的 `node_modules/.bin` 的绝对路径加入到环境变量 PATH 中，执行结束后，再将环境变量 PATH 恢复原样。
>
> 如果是全局安装，npm 将会使用符号链接把可执行文件链接到 `/usr/local/bin`，如果是本地安装，会链接到 `./node_modules/.bin/`。

### config

`config` 字段用于添加命令行的环境变量。

```json
{
  "name" : "webpack",
  "config" : { "port" : "8080" },
  "scripts" : { "start" : "node server.js" }
}

```

然后，在 `server.js` 脚本就可以引用 `config` 字段的值。

```js
console.log(process.env.npm_package_config_port); // 8080
```

用户可以通过 `npm config set` 来修改这个值。

```sh
npm config set webpack:port 8000
```

### author, contributors

`author` 是具体一个人，`contributors` 表示一群人，他们都表示当前项目的共享者。同时每个人都是一个对象。具有 `name` 字段和可选的 `url` 及 `email` 字段。

```json
{
  "author": {
    "name" : "yourname",
    "email" : "youremail@xx.com",
    "url" : "https://yoururl.com/"
  }
}
```

也可以写成一个字符串：

```json
{
  "contributors": [
    "name <b@rubble.com> (http://barnyrubble.tumblr.com/)"
  ]
}
```

### dependencies, devDependencies

- **`dependencies` 字段指定了项目运行所依赖的模块**：可以理解为我们的项目在生产环境运行中要用到的东西。比如说我们常用的 antd 只能哪个代码块就会用到里面的组件，所以要放到 `dependencies` 里面去。
- **`devDependencies` 字段指定了项目开发所需要的模块**：开发环境会用到的东西，比如说 webpack。我们打包的时候会用到，但是项目运行的时候却用不到，所以只需要放到 `devDependencies` 中去就好了。

依赖的模块遵循下面几种配置规则：

- `依赖包名称:VERSION`
  - `VERSION` 是一个遵循 `SemVer` 规范的版本号配置，`npm install` 时将到 npm 服务器下载符合指定版本范围的包。
- `依赖包名称:DWONLOAD_URL`
  - `DWONLOAD_URL` 是一个可下载的 `tarball` 压缩包地址，模块安装时会将这个 `.tar` 下载并安装到本地。
- `依赖包名称:LOCAL_PATH`
  - `LOCAL_PATH` 是一个本地的依赖包路径，例如 `file:../pacakges/pkgName`。适用于你在本地测试一个 `npm` 包，不应该将这种方法应用于线上。
- `依赖包名称:GITHUB_URL`
  - `GITHUB_URL` 即 `github` 的 `username/modulename` 的写法，例如：`ant-design/ant-design`，你还可以在后面指定 `tag` 和 `commit id`。
- `依赖包名称:GIT_URL`
  - `GIT_URL` 即我们平时 clone 代码库的 `git url`，其遵循以下形式：`<protocol>://[<user>[:<password>]@]<hostname>[:<port>][:][/]<path>[#<commit-ish> | #semver:<semver>]`

```json
"dependencies": {
    "antd": "ant-design/ant-design#4.0.0-alpha.8",
    "axios": "^1.2.0",
    "test-js": "file:../test",
    "test2-js": "http://cdn.com/test2-js.tar.gz",
    "core-js": "^1.1.5",
}
```

### peerDependencies

对等依赖的作用：

1. 减小打包体积：例如使用 react 开发的组件库，安装 react 是必不可少的，而使用组件库的开发者，本地项目肯定安装了 react，因此开发的组件库中不必把 react 打包进去 (期望项目的使用者来提供这些模块的实现)。
2. 版本一致性：使用你的组件库的开发者需要确保他们项目中安装了与你声明的对等依赖版本兼容的包，以确保组件库正常运行。

示例：声明要使用组件库，需在项目中安装大于 `17.0.1` 版本的 react。

```json
"peerDependencies": {
  "react": "> 17.0.1"
}
```

### engines

> engines 声明了对 npm 或 node 的版本要求
>
> 目前对 npm 来说，engines 只是起一个说明的作用，即使用户安装的版本不符合要求，也不影响依赖包的安装。但使用 pnpm 和 yarn 安装，如果版本不符合要求会导致安装失败。

```json
"engines": {
  "node": ">=8.10.3 <12.13.0",
  "npm": ">=6.9.0"
}
```

### workspaces

单个代码库中统一管理多个包 (monorepo)，在 workspaces 声明目录下的 package 会软链到根目录的 node_modules 中。

1. 初始化项目：

    ```bash
    npm init -y
    ```

2. 声明本项目是 workspaces 模式

    ```json
    "private":"true",
    "workspaces": [
      "packages/*"
    ],
    ```

3. 声明子项目 p1

    ```sh
    npm init -w packages/p1 -y
    ```

    在 `node_modules/.package-lock.json` 中可以看到 `"link": true` 链接符号信息

4. 声明子项目 p2

    ```sh
    npm init -w packages/p2 -y
    ```

5. 新建 packages/p1/index.js

    ```js
    const add = (a, b) => {
      return a + b
    }

    module.exports = {
      add,
    }
    ```

6. 在 packages/p2/index.js 引入 p1

    ```sh
    npm i p1 -w p2
    ```

    安装，卸载等命令与 npm 命令都是一样的，只是多了 “--workspace=” 参数 (简写-w)，用来指定在哪个包中执行命令

7. 在 packages/p2/index.js 中使用 p1

    ```js
    const { add } = require('p1')
    console.log(add(1, 2))
    ```

    执行 `node packages/p2/index.js` 输出 3

### files

> files 属性用于描述你 `npm publish` 后推送到 npm 服务器的文件列表，如果指定文件夹，则文件夹内的所有内容都会包含进来。

示例：只推送 index.js 和 dist 包到 npm 服务器。

```json
"files": [
  "index.js",
  "dist"
]
```

可以在项目根目录新建一个 `.npmignore` 文件，说明不需要提交到 npm 服务器的文件，类似 `.gitignore`。**写在这个文件中的文件即便被写在 files 属性里也会被排除在外。**

`.gitignore` 文件也可以充当 `.npmignore` 文件。

### main

指定 CommonJS 模块或 ES 模块入口文件。如果不指定该字段，默认是根目录下的 index.js。

提示：从 Node.js 12.20.0 版本开始，“main” 字段也可以指定 ES 模块的入口文件

### publishConfig

在发布包时指定特定的配置，示例：指定包发布的注册表 URL，指定所有用户都可以访问 (私有的会收费)。

```json
{
  "publishConfig": {
    "registry": "https://registry.npmjs.org/",
    "access": "public"
  }
}
```

### browser

指定浏览器使用的入口文件，例如 umd 模块。

### description, keywords

![20240421211414](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240421211414.png)

> 当你使用 npm search 检索模块时，会到 description 和 keywords 中进行匹配。写好 description 和 keywords 有利于你的模块获得更多更精准的曝光。

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

### homepage, bugs, repository

![20240421211552](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240421211552.png)

- `homepage` 用于指定该模块的主页。
- `repository` 用于指定模块的代码仓库。
- `bugs` 指定一个地址或者一个邮箱，对你的模块存在疑问的人可以到这里提出问题。

```json
{
  "homepage": "http://ant.design/",
  "bugs": {
    "url": "https://github.com/ant-design/ant-design/issues"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/ant-design/ant-design"
  },
}
```

### license

> license 字段用于指定软件的开源协议，开源协议里面详尽表述了其他人获得你代码后拥有的权利，可以对你的的代码进行何种操作，何种操作又是被禁止的。

以下就是几种主流的开源协议：

![20240421213001](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240421213001.png)

### private

如果将 private 属性设置为 true，npm 将拒绝发布它，这是为了防止一个私有模块被无意间发布出去。

### os

假如你开发了一个模块，只能跑在 darwin 系统下，你需要保证 windows 用户不会安装到你的模块，从而避免发生不必要的错误。

```json
# 指定你的模块只能被安装在某些系统下
"os" : [ "darwin", "linux" ]
# 指定一个不能安装的系统黑名单
"os" : [ "!win32" ]
```

## 非 npm 官方字段

### `package.json` 的演进

1. **npm 的崛起**：npm 最初作为 Node.js 的包管理工具，随着时间的发展，它逐渐成为前端开发的中心。这一转变标志着 JavaScript 生态的融合，前后端代码的界限变得模糊。
2. **多入口支持**：随着 `browser`、`module`、和 `main` 等字段的引入，`package.json` 允许开发者为不同环境指定不同的入口文件。这对于构建跨平台的库和应用尤其重要。
3. **TypeScript 的集成**：`types` 字段的引入为 TypeScript 提供了官方的类型定义入口。这促进了 TypeScript 在前端项目中的广泛应用，加强了代码的类型安全。
4. **工具和配置的集成**：`package.json` 也成为了配置项目工具 (如 Babel、ESLint、Prettier、Husky 等) 的地方，使得项目配置更加集中和一致。

### module

> module 字段用来指定 ES Module 的入口文件。

1. 默认情况下，npm 会将 package.json 中的 main 字段作为 CommonJS 的入口文件。
2. 如果 package.json 中没有 main 字段，npm 会将 package.json 中的 module 字段作为 ES Module 的入口文件。

### exports

当打包工具 (如 Webpack 或 Rollup) 支持 exports 字段时，main、browser、module 和 types 这四个字段都将被忽略。

exports 字段提供了一个更细粒度的控制，允许指定不同模块系统和环境的导出路径：

- “`.`” 表示默认导出
- “import”：指定了 ES module (ESM) 规范下的导出文件路径
- “require”：指定了 CommonJS 规范下的导出文件路径
- “browser”：指定了用于浏览器环境的导出文件路径
- “types”：指定了类型声明文件的路径

```json
"exports": {
  ".": {
    "import": "./dist/index.esm.js",
    "require": "./dist/index.cjs.js",
    "browser": "./dist/index.umd.js",
    "types": "./dist/index.d.ts"
  }
  "./main": "./src/main.js"
}
```

在其他项目中，可以使用以下方式导入模块：

```js
import package from 'packageName'; // . 方式定义的
import main from 'packageName/main'; // ./main 方式定义的
```

### type

指定模块系统的使用方式，“commonjs”，“module”，“umd”，“json”

示例：指定模块系统为 ES module 模式，使用 CommonJS 文件时，需显式的定义为 `.cjs` 文件扩展名，来明确指定这些文件为 CommonJS 模块

```json
"type": "module"
```
