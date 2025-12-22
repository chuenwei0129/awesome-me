---
title: 深入 npm 生态
order: 2
toc: content
---

## 一、前言：为什么要认真对待 Node.js / npm 生态

在现代前端和全栈开发中，你几乎不可能绕开 Node.js：

- 前端构建工具（Vite、Webpack、Rollup、esbuild…）
- 工程化工具（ESLint、Prettier、Jest、Vitest…）
- 脚手架（create-react-app、create-vue、create-next-app…）
- 各种 CLI（TypeScript 编译器、lint 工具、代码生成器…）

这些工具都依赖 Node.js 和 npm（或其它包管理器）。一旦 Node 版本或依赖管理混乱，就会出现大量“玄学问题”：

- 本地跑得好，CI 一直红；
- 同一个项目，同事能跑你不能跑；
- 升级了某个包，构建突然开始报一些莫名其妙的错误；
- 多个项目对 Node 的版本要求不同，你来回切换环境非常痛苦。

造成这些问题的根源往往只有两个字：**“不统一”**——

- 没有统一管理 Node 版本；
- 没有统一管理 npm 配置和依赖版本；
- 没有利用锁文件和私有仓库来锁定整体环境。

本文的目标，就是帮你构建一套**系统、可落地**的实践：

- 用合适的工具管理 Node 版本；
- 理解 npm 的配置体系和命令，用对每一个指令；
- 读懂依赖树和锁文件，知道为什么“不要手改 package-lock.json”；
- 知道什么时候用 npm、什么时候用 npx、什么时候必须用私有仓库；
- 在你自己写库或脚手架时，如何约束依赖版本、防止用户踩坑。

阅读完成后，你应该能够：

- 快速在一台新机器上搭起“干净、稳定”的 Node 环境；
- 为团队制定一套统一、可执行的 Node/npm 使用规范；
- 排查大部分与“环境/依赖版本”相关的问题，而不是靠“删 node_modules 重装”碰运气。

---

## 二、Node.js 版本管理：nvm / fnm / volta

### 2.1 为什么必须使用版本管理器

直接用系统自带的 Node（或在官网下一路“下一步”安装）看似简单，问题却很多：

- 不同项目要求不同的 Node 主版本（16 / 18 / 20…）；
- 升级 Node 后，旧项目突然跑不起来；
- 回退 Node 很麻烦，甚至需要卸载重装。

**正确姿势**：无论是个人开发还是团队项目，都应该使用**版本管理器**来管理 Node：

- 同时安装多个 Node 版本；
- 为不同项目设置不同 Node 版本；
- 一条命令在多个版本之间切换。

常见选择有：

| 工具          | 特点概览                                                   | 平台支持                |
| ------------- | ---------------------------------------------------------- | ----------------------- |
| `nvm`         | 历史最久、资料多，纯 Shell 实现，社区生态成熟              | macOS / Linux           |
| `fnm`         | Rust 实现，启动快、切换快，配置简单                        | macOS / Linux / Windows |
| `volta`       | 更偏“工具链管理”：Node + npm/yarn/pnpm + 常用 CLI 一起管理 | macOS / Linux / Windows |
| `nvm-windows` | 与 nvm 概念类似的独立项目，专为 Windows 设计               | Windows                 |

> **强烈建议：一台机器只使用其中一个版本管理工具，不要混装。**

下面以社区使用最广泛的 **nvm（macOS / Linux）** 为例，讲清楚安装与使用。

---

### 2.2 使用 nvm 管理 Node（macOS / Linux）

#### 2.2.1 安装方式总览

nvm 官方推荐的安装方式有两种：

- 用包管理器（如 Homebrew）安装 nvm；
- 直接用官方脚本安装。

两种方式的**区别主要在于 nvm 文件的安装位置和初始化方式**，不要把它们的环境变量配置混在一起用。

---

#### 2.2.2 使用 Homebrew 安装 nvm（macOS 推荐）

1）安装 nvm：

```bash
brew install nvm
```

2）创建 nvm 工作目录（若不存在）：

```bash
mkdir -p ~/.nvm
```

3）在你的 shell 配置文件中加入以下内容（以 zsh 为例）：

```bash
# ~/.zshrc 或 ~/.bashrc

export NVM_DIR="$HOME/.nvm"
# brew --prefix nvm 会输出 nvm 的安装路径，适配 Intel / Apple Silicon
[ -s "$(brew --prefix nvm)/nvm.sh" ] && . "$(brew --prefix nvm)/nvm.sh"
[ -s "$(brew --prefix nvm)/etc/bash_completion.d/nvm" ] && . "$(brew --prefix nvm)/etc/bash_completion.d/nvm"
```

4）重新加载配置：

```bash
source ~/.zshrc   # 或对应的 shell 配置文件
```

5）验证安装：

```bash
nvm --version
```

能输出版本号就说明 nvm 生效了。

> 注意：网上很多教程把 `NVM_DIR` 和 `nvm.sh` 路径写死到 `~/.nvm/nvm.sh`，那是**官方脚本安装**的写法，和 Homebrew 方式并不完全相同，直接照抄容易导致 nvm 找不到。

---

#### 2.2.3 使用官方脚本安装 nvm

如果你不使用 Homebrew，或者在 Linux 环境中，通常使用官方脚本安装：

```bash
# 版本号建议去 nvm 仓库 README 上查看最新版本
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

安装脚本会自动把类似下面的内容加入你的 `~/.bashrc`、`~/.zshrc` 等配置文件中：

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
# 可选：bash 补全
[ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion"
```

执行完脚本后，重新打开一个终端或手动执行 `source ~/.zshrc`，再运行：

```bash
nvm --version
```

如果能看到版本号，说明已安装成功。

---

#### 2.2.4 常用 nvm 命令

装好 nvm 之后，你可以用它来安装和切换 Node 版本：

```bash
# 列出已安装的 Node 版本
nvm ls

# 查看远程可安装版本（非常多，可以配合 grep）
nvm ls-remote

# 安装最新 LTS（长期支持版）
nvm install --lts

# 安装指定主版本的最新小版本，例如 18.x
nvm install 18

# 切换当前 shell 使用某个版本
nvm use 18

# 设置默认 Node 版本（新开终端生效）
nvm alias default 18
```

**关于 `nvm deactivate`**

- 实际行为：将当前 shell 中通过 nvm 注入的 `node` / `npm` 等从 `PATH` 中移除，让你“临时停用 nvm 管理的 Node”。
- 它 **不会** 删除任何版本，也 **不会** 修改 `default` 别名。

```bash
# 当前 shell 中停用 nvm 管理的 Node
nvm deactivate
```

如果你需要“删除被设为 default 的版本”，正确做法是：

1. 先把 `default` 别名改到其他版本：

   ```bash
   nvm alias default 18
   ```

2. 再卸载旧版本：

   ```bash
   nvm uninstall 16
   ```

---

#### 2.2.5 使用 `.nvmrc` 为项目固定 Node 版本

在团队协作中，建议每个项目在根目录放一个 `.nvmrc`，写明推荐的 Node 版本：

```text
18
# 或写全版本号，比如 v18.19.0
```

然后所有开发者在项目根目录执行：

```bash
nvm use
```

nvm 会读取 `.nvmrc` 的内容并自动切换到对应版本（如果未安装，会提示你先 `nvm install`）。

这可以大幅减少“你的 Node 版本不一致导致项目跑不起来”的问题。

---

### 2.3 Apple Silicon 与旧版 Node

Apple Silicon（M1/M2/M3）采用 arm64 架构，而很多旧版本的 Node 只提供 x64（Intel）构建，因此会出现“某些老版本 Node 无法在 M1 上原生运行”的情况。

**比较稳妥的建议：**

- 新项目：尽量使用当前 LTS 及以上的 Node 版本（例如 18 / 20），这些版本已经提供成熟的 arm64 支持。
- 维护老项目或必须使用极老版本 Node：
  - 可以通过 Rosetta 2 以 x86_64 模式运行 zsh，再安装旧版 Node。

示例（在 M1 上安装仅有 x64 构建的老版本 Node）：

```bash
# 以 Rosetta 2 方式启动一个 x86_64 的 zsh
arch -x86_64 zsh

# 在这个 shell 里用 nvm 安装旧版 Node
nvm install 10.24.1
nvm use 10.24.1
```

Rosetta 会为你提供一个“Intel 模式”的环境，此时 Node 以 x64 形式运行，代价是性能有所下降，但兼容性更好。

---

### 2.4 查看 Node 安装位置与版本分布

使用 nvm 后，你的 Node 不再安装在系统级路径（如 `/usr/local/bin`），而是在 nvm 管理的目录中。

**1）查看当前使用的 Node 路径**

```bash
which node
# 可能输出：
# /Users/你的用户名/.nvm/versions/node/v18.19.0/bin/node
```

**2）查看所有已安装版本的物理位置**

- 所有 nvm 管理的 Node 版本一般都位于：

  ```text
  ~/.nvm/versions/node
  ```

- macOS 上可以通过 Finder 用 `Command + Shift + G` 跳转到：

  ```text
  /Users/你的用户名/.nvm/versions/node
  ```

  `.nvm` 是隐藏目录，可以用 `Command + Shift + .` 切换显示/隐藏。

---

### 2.5 多版本 Node 与全局 npm 包

使用 nvm 时，一个重要行为是：**每个 Node 版本都有自己独立的一套全局 npm 包**。

- 不同 Node 版本的全局包互不共享。
- 路径类似：

  ```text
  ~/.nvm/versions/node/<版本>/lib/node_modules
  ```

这意味着：

- 你在 Node 18 下用 `npm install -g xxx` 安装的全局 CLI，在切到 Node 16 时可能就“消失”了（实际上它们存在，但在另一个版本的目录里）。
- 在生产环境和 CI 中，**更推荐使用项目内安装 + `npx` 或 `npm run` 调用**，而不要依赖全局安装的命令。

如果你在升级 Node 时想“顺带迁移全局包”，nvm 提供了一个很实用的参数：

```bash
# 安装 v18，同时把 v16 的全局包迁移过来
nvm install v18.0.0 --reinstall-packages-from=v16.0.0
```

这样可以减少“换版本后很多命令又要重装一遍”的痛点。

---

> 到这里，你已经拥有了一套相对完整的 Node 版本管理方案。
> 接下来在后续章节中，会基于这个前提继续展开：如何用 npm 管理依赖、配置镜像与私有仓库、理解锁文件和依赖树，并最终形成一套“团队级”的稳定工作流。

## 三、npm 基础：npm 的三重身份与核心概念

在 Node 生态里，“npm”这个词经常被混着用，可能指：

1. 你机器上安装的那个命令行工具；
2. 互联网上的公共包仓库；
3. 以及围绕它的一整套生态（脚手架、镜像、私服等）。

先把概念理清，有助于后面理解配置、镜像、私服这些内容。

---

### 3.1 npm 的三重身份

**1）包管理器（Package Manager）**

- npm 是 Node.js 的官方包管理器，用来：
  - 安装/卸载/更新第三方包；
  - 管理项目依赖版本；
  - 执行项目脚本（`npm run`）。
- 绝大多数前端工程化工具都是通过 npm（或 Yarn/pnpm）安装的。

**2）仓库（Registry）**

- npm 也指那台“中心服务器”：
  - 默认地址是 `https://registry.npmjs.org/`；
  - 里面存着开源的 npm 包（Node 包、前端包、CLI 工具等）。
- 你可以：
  - 将自己的包发布到公共 npm 仓库；
  - 在企业内部使用私有 Registry（如 Verdaccio、Nexus、Artifactory 等）。

**3）命令行工具（CLI）**

- `npm` 这个命令行程序，是你与包管理器和仓库交互的入口：
  - `npm install`、`npm publish`、`npm run`、`npm config` 等。
- 它负责：
  - 根据 `package.json` 与配置，解析依赖树；
  - 从 Registry 下载包，校验完整性，写入 `node_modules`；
  - 运行与你项目相关的脚本命令。

---

### 3.2 Node 与 npm 的绑定关系

- 绝大多数 Node 安装包都会**自带一个对应版本的 npm**。
- 不同 Node 主版本上线时，通常会附带某个 npm 版本作为“起始版本”，但：
  - npm 本身可以独立升级（`npm install -g npm`），
  - 这也意味着**同一个 Node 版本，可能对应不同的 npm 版本**。

实践上更推荐：

- 使用 nvm/fnm/volta 管理 Node 版本；
- Node 升级/降级时，顺带使用对应捆绑的 npm 版本；
- 只有在明确知道自己在做什么时，才特意全局升级 npm。

---

## 四、npm 配置体系：来源、优先级与 `.npmrc`

npm 的行为高度可配置，包括：

- 从哪里下载包（`registry`）；
- 是否验证 HTTPS 证书（`strict-ssl`）；
- 是否生成 `package-lock.json`；
- 默认保存依赖的版本前缀（`^` / `~` / 精确版本）；
- 缓存目录、代理服务器等。

这些配置可以来自多个地方，最终生效的结果取决于**优先级**。理解这一点，对排查“为什么我这边走的是这个源/配置”的问题非常关键。

---

### 4.1 配置来源与优先级

从高到低，npm 配置大致遵循以下优先级（不同 npm 版本在细节上略有差异，但大原则一致）：

1. **命令行参数**
   - 如：`npm install --registry=... --loglevel=verbose`。
2. **环境变量（`npm_config_` 前缀）**
   - 如：`export npm_config_registry=...`。
3. **项目级 `.npmrc`**
   - 位于项目根目录，仅对当前项目生效。
4. **用户级 `.npmrc`**
   - 通常在用户主目录：`~/.npmrc` 或 `C:\Users\<用户名>\.npmrc`。
5. **全局级 `.npmrc`**
   - 一般位于 `$PREFIX/etc/npmrc`，可用 `npm config get globalconfig` 查询。
6. **npm 内置默认配置**
   - npm 自带的一份默认配置。

> **“就近覆盖”原则**：同一个配置项越靠上的来源优先级越高，会覆盖下层的值。

**示例：**

- 项目 `.npmrc` 中写了：

  ```ini
  registry=https://registry.company.com/
  ```

- 你在命令行运行：

  ```bash
  npm install --registry=https://registry.npmmirror.com
  ```

- 那么这次安装会用 `registry.npmmirror.com`，而不是项目 `.npmrc` 里的公司源。

---

### 4.2 方式一：命令行参数（CLI Options）

命令行参数是**最高优先级**的配置方式，适合临时改变行为，而不污染任何 `.npmrc`。

示例：

```bash
# 临时使用指定 registry 安装依赖
npm install --registry=https://registry.npmmirror.com

# 临时禁用 package-lock 生成
npm install --package-lock=false
```

这些设置只对当前命令生效，不会写入配置文件。

:::info{title="拓展知识：参数传递中的 -- 分界线"}

当你执行 `npm run` 时，有一个容易混淆的问题：

- 有些参数是传给 **npm 本身** 的；
- 有些参数是传给 **脚本内部的命令** 的。

npm 使用 `--` 作为分界线：

- `npm` 遇到 `--` 之后，就不再解析自己的参数；
- `--` 后面的所有内容，都会原样传递给脚本中的命令。

示例 `package.json`：

```json
{
  "scripts": {
    "start": "webpack"
  }
}
```

运行：

```bash
npm start -- --config webpack.prod.js
```

- `npm` 会执行 `scripts.start` 中的 `webpack`；
- `--config webpack.prod.js` 会传给 webpack，而不是 npm。

:::

---

### 4.3 方式二：环境变量（`npm_config_` 前缀）

npm 会自动识别以 `npm_config_` 为前缀的环境变量，将其视为配置项。

**示例：禁用生成 `package-lock.json`：**

```bash
# macOS / Linux
export npm_config_package_lock=false
npm install
```

此时，`npm_config_package_lock` 的值相当于在配置里设置 `package-lock=false`。

#### 4.3.1 环境变量的基本操作

**类 Unix 系统（macOS / Linux）：**

```bash
# 查看某个环境变量
echo $npm_config_package_lock

# 删除（仅当前 shell 会话）
unset npm_config_package_lock
```

**Windows（cmd）：**

```bat
set npm_config_package_lock=false
npm install
```

**Windows（PowerShell）：**

```powershell
$env:npm_config_package_lock = "false"
npm install
```

#### 4.3.2 普通环境变量 vs npm 配置变量

容易混淆的一点是：**普通环境变量** 和 **npm 配置变量** 是两回事。

- `NODE_ENV`：
  - 约定俗成的应用环境变量（`development` / `production`）；
  - 一般由你的应用代码或打包工具使用，npm 不会把它当作配置项。
- `npm_config_xxx`：
  - npm 会识别这一前缀，并将其视为配置项；
  - 如 `npm_config_registry`、`npm_config_package_lock` 等。

示例：

```bash
export NODE_ENV=production                         # 用于应用逻辑
export npm_config_registry=https://registry.npmmirror.com  # npm 配置
npm install
```

---

### 4.4 方式三：`.npmrc` 配置文件

`.npmrc` 是 npm 的持久化配置文件，用于保存较长期的设置。典型用途：

- 固定镜像源（`registry`）；
- 配置私有仓库地址与 token；
- 设置缓存路径、代理；
- 安装策略（如版本前缀、严格 SSL 校验等）。

根据作用范围不同，`.npmrc` 有几个层级：

1. **项目级 `.npmrc`**

   - 位于项目根目录；
   - 仅对当前项目生效；
   - 通常用来：
     - 固定项目使用的 `registry`；
     - 固定安装策略（`save-prefix`、`engine-strict` 等）。

2. **用户级 `.npmrc`**

   - macOS / Linux：`~/.npmrc`
   - Windows：`C:\Users\<用户名>\.npmrc`
   - 可通过 `npm config get userconfig` 查看准确路径；
   - 一般用来放个人偏好：默认镜像、代理配置等。

3. **全局级 `.npmrc`**

   - 通常位于 `$PREFIX/etc/npmrc`；
   - 可通过 `npm config get globalconfig` 查看；
   - 影响这台机器上所有用户的默认行为（不常改）。

4. **npm 内置 `.npmrc`**
   - npm 自带的默认配置文件，一般不直接修改。

> 优先级：项目级 > 用户级 > 全局级 > 内置配置。

**一个常见的 `.npmrc`：**

```bash
# 使用国内镜像（全局或用户级）
registry=https://registry.npmmirror.com/

# 安装时的版本写入策略
save-prefix=~           # package.json 中依赖写成 ~1.2.3
strict-ssl=true         # 强制使用 HTTPS 且校验证书

# 自定义缓存目录（按需）
# cache=/path/to/.npm-cache

# 代理设置（如有公司代理）
# proxy=http://proxy.company.com:8080
# https-proxy=http://proxy.company.com:8080
```

**私有 npm 仓库配置示例：**

```bash
# 默认公共源
registry=https://registry.npmmirror.com/

# 为特定 scope 配置私有仓库
@your-scope:registry=https://registry.your-company.com/

# 私有仓库 token（不要提交到代码仓库）
# //registry.your-company.com/:_authToken=${NPM_TOKEN}
```

实践建议：

- 私有仓库的 token：
  - 本机开发：可以写在用户级 `.npmrc`（但不要提交）；
  - CI 环境：通过 CI 的“机密变量（Secret）”注入，例如 `NPM_TOKEN`。

---

### 4.5 方式四：`npm config` 命令

`npm config` 命令是操作配置的官方入口，它会根据当前上下文写入对应的 `.npmrc`。

常用形式：

```bash
# 设置配置项
npm config set <key> <value>

# 获取配置项
npm config get <key>

# 删除配置项（默认删除用户级配置中的 key）
npm config delete <key>

# 查看所有配置（包括默认值）
npm config list

# 在编辑器中打开配置文件（默认用户级）
npm config edit
```

**示例：设置用户级 registry：**

```bash
npm config set registry https://registry.npmmirror.com
npm config get registry
```

执行后，在你的用户级 `~/.npmrc` 中会出现：

```ini
registry=https://registry.npmmirror.com/
```

**指定配置作用位置（`--location`）：**

在较新的 npm（9+）中，部分 `npm config` 命令支持 `--location` 参数，用来明确配置写入的位置：

```bash
# 写入项目级 .npmrc
npm config set registry https://registry.npmmirror.com --location=project

# 读取项目级配置
npm config get registry --location=project
```

这在你希望“**项目内固定 registry，而不影响其他项目**”时非常实用。

---

### 4.6 镜像源与 nrm：切换加速源的方式

npm 默认使用 `https://registry.npmjs.org/`，在国内访问速度可能不稳定，因此常会配置镜像源，如淘宝的 `https://registry.npmmirror.com/`。

#### 4.6.1 手动配置镜像源

- 查看当前镜像源：

  ```bash
  npm config get registry
  ```

- 设置镜像源（用户级或项目级）：

  ```bash
  npm config set registry https://registry.npmmirror.com
  ```

> **团队/CI 建议**：更推荐在**项目级 `.npmrc`** 中统一配置 `registry`，保证所有人以及 CI 使用同一个源。

#### 4.6.2 使用 nrm 管理多个源

当你需要在多个源之间频繁切换（如 npm 官方源、公司私服、淘宝源等），可以使用 `nrm`：

```bash
npm install -g nrm
```

常用命令：

```bash
nrm ls            # 查看当前配置的源列表
nrm use taobao    # 切换为淘宝源
nrm add corp http://npm.corp.com/  # 添加公司源
nrm del corp      # 删除某个源
nrm test          # 测试各源响应速度
```

注意事项：

- nrm 通过修改当前环境的 npm 配置（通常是用户级 `.npmrc`）来生效；
- 在团队和 CI 中，**不要仅依赖个人的 nrm 设置**，而是：
  - 项目级 `.npmrc` 固定 `registry`；
  - CI 使用同一套 `.npmrc` 或对应的配置注入方式。

---

> 至此，关于 npm 配置体系的“骨架”已经搭好：
>
> - 你知道有哪些配置来源，它们的优先级如何；
> - 知道如何通过命令行、环境变量和 `.npmrc` 控制 npm 行为；
> - 知道如何配置镜像源与私有源，并在团队中统一策略。
>
> 在后续章节，我们会在此基础上进一步展开：
>
> - npx 的使用
> - 依赖树、扁平化安装、`package-lock.json` 与 `yarn.lock`；`npm install`/`npm ci` 的安装流程和差异；
> - SemVer 版本规则
> - Verdaccio 私服与企业实践等。

## 五、npx / `npm exec`：一次性命令与脚手架

`npx` 经常被误解成一个“单独安装的工具”，其实它是 **npm 内置命令 `npm exec` 的别名**，两者在 npm@7+ 中功能基本等价。

它解决的核心问题是：**如何在不全局安装的情况下，方便地运行某个 npm 包提供的 CLI**，典型场景包括脚手架（`create-*`）、一次性工具、临时脚本等。

---

### 5.1 `npx` 与 `npm exec` 的关系

- 自 `npm@5.2.0` 起，`npx` 作为独立可执行文件随 npm 一起安装。
- 自 `npm@7` 起，`npx` 只是 `npm exec` 的一个“短命令”，行为基本一致。
- 实际调用链可以简单理解为：

  ```text
  npx <cmd> == npm exec <cmd>
  ```

> 建议习惯上仍使用 `npx`，因为更短、更符合社区习惯；在脚本中需要更明确行为时，可以考虑直接用 `npm exec`。

---

### 5.2 npx 的查找与执行流程

当你运行：

```sh
npx some-cli ...
```

时，大致会经历以下步骤（简化概念模型）：

1. 在当前项目的 `node_modules/.bin` 中查找 `some-cli`；
2. 找不到，再在全局可执行路径（全局 npm）中查找；
3. 若仍找不到：
   - 若传了 `--no-install`：直接报错；
   - 否则：
     - 从当前配置的 registry 下载这个包；
     - 将其安装到 **npm 的缓存/临时目录** 中；
4. 在这个隔离环境中执行 `some-cli`；
5. 退出后清理临时执行目录，但**缓存的包本身会保留**，以便下次复用。

关键点：

- **不会**每次执行完就清空整个缓存目录；
  否则无法做到“多次执行同一工具时只下载一次”的效果。
- 默认会尊重你的 `registry` 配置（包括镜像源与私服配置）。

---

### 5.3 常见参数与行为

常用参数：

```sh
# 避免交互式确认，直接同意安装
npx -y <pkg>@<version> ...

# 禁止自动安装，只使用项目本地/全局已有的命令
npx --no-install <cmd> ...

# 在某个 workspace 中执行（npm workspaces）
npx -w packages/web-app -- vite build
```

- `-y` / `--yes`：
  - 在某些 npm 版本中，如果 npx 需要下载并执行新包，会询问你“是否继续”；
  - 加上 `-y` 可以跳过这个交互，适合脚本和 CI 环境。
- `--no-install`：
  - 用于严格控制：**只能执行已经安装好的命令**；
  - 找不到就报错，不会发起网络请求。

---

### 5.4 典型使用场景

**1）初始化项目脚手架**

```sh
# 创建一个 Vite + React + TS 项目（推荐显式版本）
npx create-vite@latest my-app --template react-ts

# 使用特定版本的 Create React App
npx create-react-app@5.0.1 my-cra-app
```

实践建议：

- 文档中尽量写成 `@latest` 或明确版本：`@5` / `@5.0.1`；
- 避免只写 `npx create-xxx`，否则不同时间执行可能得到完全不同的脚手架版本。

---

**2）执行项目本地依赖中的 CLI**

项目 `devDependencies` 里常有这些工具：

- `eslint`、`prettier`、`jest`、`vitest`、`webpack`、`vite`…

可直接用 `npx` 调用，而不依赖全局安装：

```sh
npx eslint .
npx prettier --write src/
npx jest --coverage
npx vite build
```

相当于系统自动帮你执行 `./node_modules/.bin/eslint` 等。

---

**3）一次性工具或特定版本命令**

不想把某个工具写进 `package.json`，只想临时用一下：

```sh
# 查看 webpack 某个旧版本的用法
npx webpack@4.44.0 --help

# 临时分析一个包的体积
npx bundle-phobia-cli date-fns

# 启动一个简单的静态资源服务器
npx serve ./dist
```

---

**4）Monorepo / npm Workspaces 下的子包命令**

在使用 npm Workspaces 的 Monorepo 中，可以指定工作空间执行命令：

```sh
# 在 packages/web-app 这个 workspace 下执行构建
npx -w packages/web-app -- vite build
```

相比手动 `cd` 切换目录，这种方式更容易脚本化。

---

### 5.5 与 `npm run` / 直接执行的对比与选择

| 方式                        | 主要用途                               | 特点                                          |
| --------------------------- | -------------------------------------- | --------------------------------------------- |
| `npx <command>`             | 临时命令、脚手架、一次性工具           | 可临时安装指定版本，支持 `--no-install`       |
| `npm run <script>`          | 项目固定流程（dev/build/test/lint 等） | 依赖 `package.json/scripts`，更适合标准化任务 |
| `./node_modules/.bin/<cmd>` | 脚本里精确调用项目本地工具             | 明确指定路径，不受 PATH 干扰                  |

**简单决策：**

- 项目规范化任务（开发、构建、测试）：在 `scripts` 里写好，用 `npm run xxx`；
- 临时/一次性命令、脚手架、实验性工具：用 `npx`；
- Shell 脚本或 CI 配置里需要“绝对明确”的命令来源：可用 `./node_modules/.bin/<cmd>`。

---

下面是整合了前面评估和修改建议之后的【第 6 章 + 第 7 章】完整优化稿，你可以直接替换原文对应部分使用。

---

## 六、理解 npm 的依赖包层级关系

要真正理解 npm 行为、定位“鬼畜依赖问题”，必须理解三件事：

1. 依赖树是什么样子的；
2. npm 是如何安装依赖和“扁平化”的；
3. `package-lock.json` / `yarn.lock` 等锁文件的作用。

---

### 6.1 嵌套安装：npm 2.x 时代

假设你的项目 `App` 依赖：

```json
"dependencies": {
  "A": "1.0.0",
  "B": "1.0.0",
  "C": "1.0.0"
}
```

它们各自依赖不同版本的 D：

- A@1.0.0 → D@1.0.0
- B@1.0.0 → D@2.0.0
- C@1.0.0 → D@2.0.0

在 **npm 2.x** 的时代，安装后会形成一个彻底嵌套的结构：

```
node_modules
├── A@1.0.0
│   └── node_modules
│       └── D@1.0.0
├── B@1.0.0
│   └── node_modules
│       └── D@2.0.0
└── C@1.0.0
    └── node_modules
        └── D@2.0.0
```

**特点**：

- 每个模块都带着自己的一套依赖；
- 不同父模块依赖的不同版本不会互相干扰；
- 但缺点是：
  - 目录非常深；
  - 依赖重复严重，占用大量磁盘空间；
  - 在 Windows 上经常遇到路径过长（`MAX_PATH`）问题，是当年一大痛点。

这种模式在当时是“简单可靠”的，但对现代前端项目的体量来说效率太低，因此后续有了“扁平化安装”的演进。

---

### 6.2 扁平化安装：npm 3.x 及之后

从 **npm 3.x** 开始，引入了“尽可能扁平”的安装策略：

- **提升原则**：能提升到顶层 `node_modules` 的依赖，就不再嵌套；
- **冲突处理**：只有版本冲突时，才在子 `node_modules` 下安装多个版本。

直观理解：在不违反版本约束的前提下，尽量减少重复安装，让“同一个版本的包尽量只装一份”。

#### 6.2.1 扁平化决策过程示意

沿用前面的 A/B/C/D 示例，实际安装结果可能是以下两种结构之一（这里是为了帮助理解，并非 npm 真实算法的精确还原）。

##### 情况一：D@2.0.0 被提升到顶层

```
node_modules
├── A@1.0.0
│   └── node_modules
│       └── D@1.0.0  # A 需要 D@1.0.0，顶层是 D@2.0.0
├── B@1.0.0          # B 需要 D@2.0.0，直接使用顶层
├── C@1.0.0          # C 需要 D@2.0.0，直接使用顶层
└── D@2.0.0          # 被提升到顶层
```

可以**粗略理解为**：

- D@2.0.0 被 B 和 C 两个包需要；
- D@1.0.0 只被 A 一个包需要；
- 于是“更通用”的 D@2.0.0 更有机会被提升到顶层，从而减少嵌套安装。

这是一个“近似最优”的结果：只在 A 下面额外嵌套了一份 D@1.0.0，而 B 和 C 直接使用顶层的 D@2.0.0。

> 注意：真实 npm 内部的版本选择与提升算法比这个示例复杂得多，而且没有作为稳定 API 文档化。你可以**用这个例子帮助理解大致思路，但不要依赖它来预测真实安装结果**。

##### 情况二：D@1.0.0 被提升到顶层

```
node_modules
├── A@1.0.0          # A 需要 D@1.0.0，直接使用顶层
├── B@1.0.0
│   └── node_modules
│       └── D@2.0.0  # B 需要 D@2.0.0，只好在自己的 node_modules 下装
├── C@1.0.0
│   └── node_modules
│       └── D@2.0.0  # C 同上
└── D@1.0.0          # 被提升到顶层
```

这种结构在早期 npm 版本中容易出现，可能原因包括：

1. **安装顺序影响**
   例如先安装 A，npm 将 D@1.0.0 提升到顶层；
   之后安装 B 和 C 时，发现顶层已有 D@1.0.0 但不满足版本约束，于是只能在各自的 `node_modules` 下再装一份 D@2.0.0。

2. **算法局限**
   早期 npm 在“流式安装”时无法预知完整依赖树，只能基于当前状态做局部最优的决策，因此容易出现这种“次优结构”。

#### 6.2.2 扁平化带来的关键问题

扁平化极大减少了重复依赖和路径深度，但也带来了一些新问题：

1. **依赖树不唯一（在没有锁文件或锁失效时）**

   - 相同的 `package.json`，在不同时间或不同安装顺序下，可能得到略有差异的 `node_modules` 结构；
   - 尤其是在 npm 3/4 时代、尚未引入 `package-lock.json` 的情况下更明显。

2. **安装顺序敏感（旧版本 npm）**

   - 先安装的包有可能“抢占”顶层位置；
   - 后装的包再来安装依赖时，只能在子层级补充。

3. **环境差异**
   - 开发机器、CI 环境、生产环境如果没有统一锁文件和 npm 版本，最终的依赖树可能存在细微差异；
   - 某些“靠运气存在”的模块会在某个环境里突然消失，引发“在我机器上好好的”的问题。

> 现代 npm（7+）配合锁文件后，**在同一 npm 主版本下**，依赖树已经基本是确定的。
> 真正不确定的场景，主要发生在：
>
> - 没有提交或不使用锁文件；
> - 锁文件和 `package.json` 不兼容；
> - 团队成员使用了不同版本的 npm / 不同包管理器。

---

#### 6.2.3 模块解析机制与幽灵依赖

再来看一个与“鬼畜依赖问题”高度相关的点：**Node 的模块解析规则**。

在 A 模块中执行：

```javascript
const D = require('D');
```

Node 会按照以下顺序查找（简化版）：

1. 从当前文件所在目录开始，查找 `./node_modules/D`；
2. 如果找不到，回退到上一级目录，查找 `../node_modules/D`；
3. 再找不到，继续向上，直到项目根目录，甚至全局目录。

对应前面的结构：

```text
node_modules
├── A
│   └── node_modules
│       └── D@1.0.0
└── D@2.0.0
```

`require('D')` 的查找顺序是：

1. `A/node_modules/D`（如果存在，就直接命中 D@1.0.0）；
2. 如果 `A/node_modules/D` 不存在，才会去找顶层 `node_modules/D`（D@2.0.0）。

因此：

- 只要 `A/node_modules/D` 存在，**它一定比顶层的 D 更优先**；
- 真正危险的情况是：
  - A 根本没有自己的 `node_modules/D`（被扁平化/去重掉了），但顶层 `node_modules` 里刚好有一个 D；
  - 或者 A 在自己的 `package.json` 里没有声明对 D 的依赖，却直接 `require('D')`（因为“刚好能 require 到”），这就是典型的**幽灵依赖（phantom dependency）**。

**幽灵依赖的风险在于**：

- 在当前依赖树结构下，代码可能“跑得好好的”；
- 一旦升级某个依赖、删除重装、或者换用另一个包管理器，依赖树被重排：
  - 顶层的 D 换了版本或消失；
  - A 原来能 require 到的模块突然不见了；
- 这就会出现各种诡异的运行时错误和“在某些机器上才会出现”的问题。

**实践建议**：

- 模块用到什么包，就在自己的 `package.json` 里显式写进 `dependencies` 或 `peerDependencies`；
- 不要依赖“刚好在顶层存在”的模块；
- 在切换到 pnpm / Yarn PnP 等更严格的包管理器时，这类幽灵依赖往往会直接报错，有利于暴露问题。

---

#### 6.2.4 关于 peerDependencies 的一嘴

与依赖树的形态高度相关的还有 **`peerDependencies`**：

- 它表达的是“**我需要和你共用同一份依赖，由你来安装它**”；
  - 典型例子：React 插件要求宿主应用提供 React；
- 在 npm 6 及之前，peerDependencies 需要开发者手动安装；
- 从 **npm 7 开始**，npm 会尝试自动安装 peerDependencies，使依赖树更完整，但也带来了一些复杂的冲突场景。

理解 peerDependencies 有助于你判断：

- 某个依赖是应该写在 `dependencies`（自己带）、还是 `peerDependencies`（由使用者提供）；
- 出现 “peer dep mismatch” 或 “invalid peer dependency” 报错时，该往哪一层的 `package.json` 去调整。

---

### 6.3 `npm install` 的大致流程与 `package-lock.json`

执行 `npm install` 时，可以抽象成两种典型情况：**没有锁文件** 和 **存在锁文件**。

#### 6.3.1 没有 lock 文件时

1. 读取 `.npmrc` 配置（按照前面提到的优先级）；
2. 根据 `package.json` 中的依赖声明解析出“期望版本范围”（如 `^1.2.0`）；
3. 向 registry 查询可用版本信息，构建一棵**理想依赖树**；
4. 查找本地缓存，有则用缓存，无则从远程下载；
5. 将依赖按“尽量扁平”的策略写入 `node_modules`；
6. 生成或更新 `package-lock.json`，把这次解析出的**具体版本、下载地址、完整性信息和依赖结构**记录下来。

可以理解为：**`package-lock.json` 是这次“解析出的依赖树”的快照**。

#### 6.3.2 存在 lock 文件时

1. 读取并比对 `package.json` 与 `package-lock.json` 是否兼容；
   - 若版本范围与 lock 中记录的版本不兼容，npm 可能会重新解析并更新 lock；
2. 若兼容：
   - 直接按 lock 文件中的版本和依赖关系构建依赖树；
   - **跳过“根据版本范围重新解版本”的过程**，从而保证依赖树的确定性；
3. 从缓存/远程获取包内容并写入 `node_modules`；
4. **关于 lock 文件是否会被改动**：
   - 如果执行的是 `npm install <new-package>` 添加依赖，或你修改了 `package.json` 中的版本范围，则一定会更新 `package-lock.json`；
   - 如果只是无参数执行 `npm install`，且 `package.json` 与 lock 文件兼容，一般不会对 lock 做语义上的修改；
   - 但在 npm 主版本升级、lock 文件格式迁移（例如从旧版本 lock 升级）等情况下，`npm install` 仍有可能重写 lock 文件，对其进行字段补全或格式升级。

> **关键点：** > `package-lock.json` 的目的就是**锁定整棵依赖树**，在同一 npm 版本下保证不同环境、不同时间运行 `npm install` 能得到一致的 `node_modules` 结构。

---

### 6.4 `npm install` vs `npm ci`

这是实际项目中经常被忽略，但在 CI/生产环境里非常重要的一对命令。

**`npm install`：**

- 用途：本地开发 / 初次安装 / 手工调整依赖；
- 行为：
  - 根据 `package.json`（以及可能存在的 `package-lock.json`）解析依赖；
  - 如有需要，会更新 `package-lock.json`；
  - 不会自动删除已有的 `node_modules`；
  - 在某些情况下可能对 lock 文件做格式或内容更新。

**`npm ci`：**

- “ci” 意为“continuous integration”（持续集成）；
- 用途：**CI、Docker 镜像构建、需要“可重复安装”的场景**；
- 要求：
  - 必须存在 `package-lock.json`；
  - 若 `package.json` 与 lock 文件不一致，会直接报错；
- 行为：
  - **先删除现有的 `node_modules`**；
  - 严格按照 `package-lock.json` 中记录的版本和依赖关系安装；
  - **不会修改 `package-lock.json`**；
  - 通常比 `npm install` 更快、更稳定。

**实践约定**（推荐）：

- 应用项目（Web 前端、Node 服务）：
  - 本地开发：
    - 初次安装依赖：`npm install`
    - 日常开发中：继续使用 `npm install` 添加/更新依赖；
  - CI / Docker 构建：
    - 优先使用 `npm ci`；
    - 将 `package-lock.json` 与 `package.json` 一并提交版本库。
- 类库项目（发布到 npm 的库）：
  - 是否提交 `package-lock.json` 有一定争议：
    - 有人选择不提交，让下游应用控制最终依赖树；
    - 也有人选择提交，以保证本仓库开发和测试环境的一致性；
  - 团队内需要约定清楚，并在 README 中说明。

---

### 6.5 `npm dedupe`：进一步扁平化依赖

在复杂项目里，随着不断安装/卸载/升级依赖，`node_modules` 有时会出现多份可以“合并”的重复依赖。`npm dedupe` 用于尝试将这些重复依赖上移到更高层级（通常是顶层 `node_modules`），以减少冗余。

**大致行为**：

- 扫描整个依赖树，查找可以共享的依赖版本；
- 尝试把子依赖“提升”到更高层级；
- 前提是：
  - 被提升的版本满足所有引用方的版本范围；
  - 提升后不会破坏现有依赖的版本约束。

**现代变化与实践建议**：

- 在 npm v7+ 中，`npm install` 和 `npm ci` 已内置更积极的去重算法；
- 因此，`npm dedupe` 的使用频率进一步降低；
- 但在某些极端升级/降级操作之后，如果感觉 `node_modules` 过于臃肿，可以：
  - 执行一次 `npm dedupe`；
  - 查看并提交更新后的 `package-lock.json`；
  - 在 CI 中继续使用 `npm ci` 按新的锁定结构安装。

---

### 6.6 Yarn 的 `yarn.lock` 与 npm 的 `package-lock.json`，以及混用问题

Yarn 出现的初衷之一，就是在 npm 3 时代提供“更确定的依赖树”和“默认的锁文件”（`yarn.lock`），其目的与 `package-lock.json` 相同：**锁定具体版本和整体结构**。

**共同点**：

- 都是“锁文件”：记录了完整依赖树的具体版本和结构；
- 都用于保证不同环境、不同时间安装得到的依赖树是一致的。

**差异**（简略版）：

- 锁文件格式不同，解析算法不同；
- 对依赖解析、去重策略、peerDependencies 处理等细节存在差异；
- Yarn 自身又分为：
  - Yarn v1（classic）：依然基于 `node_modules`；
  - Yarn v2+（Berry）：支持 Plug'n'Play（PnP）、零 `node_modules` 等更激进的模式。

**pnpm 一笔带过**：

- pnpm 使用“内容寻址 + 全局 store + 硬链接/符号链接”的方式管理依赖；
- 既极大节省磁盘空间，又通过更严格的模块解析规则减少幽灵依赖；
- 对理解“依赖树形态如何影响运行时行为”非常有帮助；
- 对大型前端工程，它是 npm/Yarn 之外非常值得考虑的第三种选择。

**混用 npm 和 Yarn/pnpm 可能带来的问题**：

- 同一项目同时存在 `package-lock.json` 和 `yarn.lock`/`pnpm-lock.yaml`：
  - 不同开发者可能使用不同工具安装依赖；
  - CI、本地环境可能使用了不同的锁文件，依赖树不一致；
- 不同包管理器对同一版本范围的解析结果可能不同；
- 去重策略、peerDependencies 安装策略不一致；
- 最终表现就是典型的“在我机器上没问题”的环境漂移。

**实践结论**：

- **同一个项目只使用一个包管理器**（npm / Yarn / pnpm），不要混用；
- 仓库里只提交一个锁文件：
  - 用 npm 就只提交 `package-lock.json`；
  - 用 Yarn 就只提交 `yarn.lock`；
  - 用 pnpm 就只提交 `pnpm-lock.yaml`；
- 在 README 或贡献指南中明确写出：
  - 推荐的 Node 版本（可以配合 `.nvmrc` / `.node-version`）；
  - 约定使用的包管理器和锁文件；
- 考虑在项目中添加环境检查脚本（如 preinstall 检查 `npm_config_user_agent`），确保团队成员使用统一的工具链。

---

### 6.7 实战最佳实践小结

把上面的内容压缩成几条“落地可执行”的建议：

- **锁文件必交（针对应用）**
  前端应用、Node 服务务必提交 `package-lock.json` / `yarn.lock` / `pnpm-lock.yaml`，并在 CI 中使用对应的“锁定式安装”命令（`npm ci` / `yarn install --frozen-lockfile` / `pnpm install --frozen-lockfile`）。

- **包管理器统一**
  整个项目统一使用 npm / Yarn / pnpm 其中一种，不要混用；仓库中只保留一种锁文件。

- **显式声明依赖，禁止幽灵依赖**
  模块用到什么包，就写进自己的 `dependencies`（或者 `peerDependencies`）；不要依赖“刚好能 require 到”的顶层依赖。

- **`npm install` 和 `npm ci` 分工清晰**
  本地开发：`npm install` 用于添加/修改依赖；
  CI/Docker 构建：`npm ci` 用于确保可重复构建。

- **谨慎动 cache 和 lock 文件**
  遇到依赖问题时，优先：

  - 删除 `node_modules`；
  - 运行 `npm cache verify`；
  - 必要时再重建 lock 文件，而不是“随手删 lock 再装”。

- **理解 peerDependencies 和扁平化**
  对复杂前端项目（React/Vue/Monorepo），理解 peerDependencies 和扁平化的行为，有助于读懂各种“peer dep mismatch”和“幽灵依赖”错误。

---

## 七、npm 缓存与离线模式

每次执行 `npm install` / `npm update` 时，npm 并不是简单地“下载 → 解压”，它会维护一个本地缓存，用来：

- 提高后续安装的速度；
- 减少重复下载；
- 支持一定程度的离线安装能力。

---

### 7.1 缓存位置与结构

默认情况下（macOS / Linux）：

- npm 缓存目录可以通过：

  ```sh
  npm config get cache
  ```

  来查看，不要简单假设为某一个固定路径。

- 在较新的 npm 中，缓存目录内部通常包含 `_cacache` 目录，里面有两个核心子目录：
  - `content-v2`：存放包文件内容（按内容 hash 分布）；
  - `index-v5`：存放索引信息，包括 key 与内容 hash 的映射。

**缓存使用过程简述**：

1. npm 根据依赖信息生成一个 key（通常来自 `name` / `version` / `resolved` / `integrity` 等字段）；
2. 在 `index-v5` 中查找该 key 对应的内容 hash；
3. 找到后，从 `content-v2` 中取出对应内容；
4. 验证完整性（例如对比 `integrity` 字段）；
5. 验证通过后，将包展开到项目的 `node_modules` 中。

若缓存缺失或校验失败，npm 会从远程 registry 重新拉取，再更新缓存。

---

### 7.2 缓存相关命令

npm 提供了一些命令来管理缓存：

```sh
# 手动将某个 tarball 加入缓存（通常不需要自己用）
npm cache add <tarball-url or package>

# 清空缓存目录（需要 --force，谨慎使用）
npm cache clean --force

# 校验缓存的完整性并清理无用数据
npm cache verify
```

**实践建议**：

- 日常开发 / CI 使用中，一般**不需要频繁清空缓存**；
- 当遇到“缓存损坏”、“某个包始终安装失败且怀疑缓存有问题”时，可以：
  - 先尝试 `npm cache verify`；
  - 必要时再执行 `npm cache clean --force`，然后重新安装依赖。

---

### 7.3 离线与优先策略：`--prefer-offline` / `--prefer-online` / `--offline`

npm 支持几种与离线相关的安装模式，有助于在网络不稳定或完全离线的环境中工作。

- `--prefer-offline`

  - 优先使用缓存中的包；
  - 若缓存中不存在，才从网络下载；
  - 在有 lock 文件的前提下，这通常是一个**速度与稳定性都不错的选择**；
  - 适合本地开发、普通 CI 环境。

- `--prefer-online`

  - 优先尝试从网络获取最新的包；
  - 若网络失败，再回退到缓存；
  - 适合希望“尽量保持依赖是最新版本”，又不想因网络波动导致安装失败的情况；
  - 注意：结合 lock 文件使用时，真正“变动”的主要是首次解析或明确升级时的版本选择。

- `--offline`

  - 完全依赖缓存；
  - 如果缓存中没有某个包，则安装直接失败；
  - 适合“提前在有网环境缓存了一批依赖，然后到完全离线环境中工作”的场景，比如：
    - 飞机上开发；
    - 强内网环境、外网受限的 CI 集群。

示例：

```bash
# 更偏向使用缓存（开发环境常用）
npm install --prefer-offline

# 尽量拉取最新，失败再用缓存
npm install --prefer-online

# 完全离线模式（CI 内网、飞行中开发等）
npm install --offline
```

与**公司内私有仓库 / 镜像源**结合使用时，这些模式可以进一步提高安装速度和稳定性：

- 先通过私有仓库统一缓存依赖；
- CI 中配合 `--prefer-offline` 或 `--offline`，在网络抖动时仍能保证构建稳定可重复。

---

## 八、npm 版本策略

版本号不是随便写的。几乎所有 npm 包都遵循 **语义化版本（Semantic Versioning, SemVer）** 规范，它由 GitHub 联合创始人 **Tom Preston‑Werner** 提出，用来通过版本号传达“这个版本改动的性质”。

---

### 8.1 SemVer 格式与含义

标准格式：

```text
<主版本>.<次版本>.<补丁>-<预发布号>+<构建信息>
例如：1.4.2、2.0.0-beta.1、3.1.0+build.20240421
```

各部分含义：

- `主版本（major）`：有破坏性变更时递增（不向后兼容）。
- `次版本（minor）`：向后兼容的新特性。
- `补丁（patch）`：向后兼容的 bug 修复。
- `预发布号（pre-release）`：如 `-alpha.1`、`-beta.0`、`-rc.2` 等，表示尚未正式发布。
- `构建信息（build metadata）`：如 `+build.20240421`，用于标识构建，不影响版本排序。

**版本变更意义（官方推荐）：**

| 场景                | 阶段       | 规则                     | 例子          |
| ------------------- | ---------- | ------------------------ | ------------- |
| 首次发布            | 新产品     | 从 `1.0.0` 开始          | `1.0.0`       |
| 向后兼容的 bug 修复 | 补丁发布   | 第三位数字递增           | `1.0.0→1.0.1` |
| 向后兼容的新特性    | 小版本发布 | 第二位递增，第三位归 0   | `1.0.0→1.1.0` |
| 破坏向后兼容的修改  | 大版本发布 | 第一位递增，第二三位归 0 | `1.1.0→2.0.0` |

现实中很多库执行得并不严，但你自己维护的库**越遵守这个规范，使用者越轻松**。

---

### 8.2 版本范围符号：`^` 与 `~`

在 `package.json` 的依赖声明中，最常见的就是 `^` 和 `~`，它们代表的是一个“版本范围”，而不是单点版本。

**常用规则（对主版本 > 0 的情况）：**

- `^1.2.3`

  - 等价于：`>=1.2.3 <2.0.0`
  - 意味着：允许自动升级次版本和补丁版本，但不跨主版本。
  - 适合：希望自动修复 bug & 小改动，但不接受破坏性变更。

- `~1.2.3`

  - 等价于：`>=1.2.3 <1.3.0`
  - 意味着：允许自动升级补丁版本，但不跨次版本。
  - 适合：更保守，只接受补丁更新。

- 精确版本：`1.2.3`

  - 不允许自动升级，即使有 `1.2.4` 也不会自动安装。
  - 适合极度追求稳定、由你严格控制升级节奏的场景。

npm 默认会在 `package.json` 中使用 `^` 前缀，你可以通过配置修改这一行为（见后文）。

---

### 8.3 使用 `npm version` 管理版本号

手动改 `package.json` 的版本号既容易出错，也无法同步打标签。npm 提供了 `npm version` 命令简化这一流程：

```sh
# 补丁版本：1.0.0 -> 1.0.1
npm version patch

# 次版本：1.0.0 -> 1.1.0
npm version minor

# 主版本：1.0.0 -> 2.0.0
npm version major

# 以下是预发布相关命令（pre-release）

npm version prepatch   # 1.2.3 -> 1.2.4-0
npm version preminor   # 1.2.3 -> 1.3.0-0
npm version premajor   # 1.2.3 -> 2.0.0-0
npm version prerelease # 1.2.4-0 -> 1.2.4-1
```

这些命令会：

- 更新 `package.json` 中的版本号；
- 如存在 `package-lock.json`，也会同步更新；
- 如果项目是 git 仓库，还会创建一个对应的 git tag（可通过 `--no-git-tag-version` 关闭）。

---

### 8.4 使用 `semver` 包操作版本

在脚本或工具中，你可以使用 npm 的 `semver` 包来比较和处理版本号。

安装：

```sh
npm install semver
```

示例用法（伪代码示意）：

```js
const semver = require('semver');

// 比较大小
semver.gt('1.0.0', '0.9.0'); // true
semver.lt('1.0.0', '2.0.0'); // true

// 判断是否满足某个范围
semver.satisfies('1.5.0', '>=1.0.0 <2.0.0'); // true

// 解析版本（返回包含更多字段的对象）
const v = semver.parse('1.0.0-beta');
// v.version -> '1.0.0-beta'
// v.major -> 1, v.minor -> 0, v.patch -> 0
// v.prerelease -> ['beta']
// 实际对象字段比这更多，这里是简化示意

// 自动递增版本
semver.inc('1.0.0', 'patch'); // '1.0.1'
semver.inc('1.0.0', 'minor'); // '1.1.0'
semver.inc('1.0.0', 'major'); // '2.0.0'

// 计算两个版本的差异类型
semver.diff('1.0.0', '1.0.1'); // 'patch'
semver.diff('1.0.0', '2.0.0'); // 'major'
```

这个包在你编写脚手架、CI 校验脚本或者运行时版本检查时非常有用（后文会提到）。

---

## 九、npm 标签（dist-tag）与 Scoped Packages

除了“版本号”，npm 还提供了“标签（tag）”机制，用于标记某个版本，比如 `latest`、`beta`、`next` 等。它相当于为版本增加了一层“指针”。

---

### 9.1 npm 标签（dist-tag）

运行：

```sh
npm dist-tag ls vue
```

可以看到类似：

```text
latest: 3.x.x
next: 3.x.x-beta.x
...
```

这里的每个标签（如 `latest`、`beta`、`next`）都指向某一个具体版本。

- 发布时：

  ```sh
  # 默认是 latest
  npm publish                 # 等价于 npm publish --tag latest

  # 指定标签，如 beta
  npm publish --tag beta
  ```

- 安装时：

  ```sh
  npm install vue             # 等价于 npm install vue@latest
  npm install vue@beta        # 安装 beta 标签对应的版本
  ```

你也可以手动调整标签指向：

```sh
# 将 1.0.2-0 这个版本标记为 beta
npm dist-tag add vue@1.0.2-0 beta

# 当 beta 版本稳定后，将其设置为 latest
npm dist-tag add vue@1.0.2-0 latest
```

**实践建议：**

- 稳定版：用 `latest`；
- 预发布版（测试用户）：用 `beta` / `next` 等；
- 在文档中明确告诉用户应安装哪个 tag，如：
  - 稳定用户：`npm install your-lib`；
  - 体验用户：`npm install your-lib@beta`。

---

### 9.2 Scoped Packages（域级包）

包名形如 `@scope/name` 的就是 **scoped package**，即 “带命名空间的包”。

示例：

```json
"devDependencies": {
  "@commitlint/cli": "^17.0.0",
  "commitizen": "^4.0.0"
}
```

其中 `@commitlint/cli` 就是一个 scoped 包。

作用：

- 为一组相关的包提供统一命名空间；
- 避免命名冲突（不同组织可以有同名包）；
- 常用于企业/团队组织名（如 `@your-company/ui`）。

#### 9.2.1 如何创建 scoped 包

在初始化时加入 `--scope`：

```sh
npm init --scope=your-scope -y
```

生成的 `package.json` 大致会是：

```json
{
  "name": "@your-scope/package"
}
```

此时：

- `your-scope` 可以是你的 npm 用户名，或组织名；
- 安装时：

  ```sh
  npm install @your-scope/package
  ```

#### 9.2.2 scoped 包与私有包的关系

- 所有私有包必须是 scoped 包；
- 但 scoped 包不一定是私有的——也可以是公开的。

当你使用 scoped 名称时，npm 默认可能按“私有包”处理发布权限，因此在发布公开包时，要写明：

```sh
npm publish --access=public
```

私有包则需要付费账号或企业方案，并通过访问控制（和私有 Registry）限制可见性。

---

## 十、常用 npm 命令与推荐工作流

这一节重点从“工具清单”转向“工作流”：不仅列出命令，还说明**在实际项目中怎么组合使用**。

---

### 10.1 项目初始化：`npm init`

**基础用法：**

```sh
npm init
# 或简写，全部使用默认值
npm init -y
```

`npm init` 会引导你填写项目名称、版本、描述、license 等，并生成 `package.json`。

你可以配置默认值，减少每次输入：

```sh
npm config set init-author-name 'your name'
npm config set init-author-email 'your@email.com'
npm config set init-author-url 'https://yourdomain.com'
npm config set init-license 'MIT'
```

**隐藏能力：脚手架入口**

`npm init <initializer>` 等价于 `npx create-<initializer>`：

- `npm init vite@latest` ≈ `npx create-vite@latest`
- `npm init react-app` ≈ `npx create-react-app`

转换规则：

- `npm init foo` → `npx create-foo`
- `npm init @usr/foo` → `npx @usr/create-foo`
- `npm init @usr` → `npx @usr/create`

---

### 10.2 安装依赖：`npm install` / `npm ci`

**安装项目现有依赖：**

```sh
npm install   # 默认读取 package.json + package-lock.json
# 简写：npm i
```

**安装新依赖：**

```sh
# 安装最新 (latest) 版本，作为生产依赖（dependencies）
npm install lodash

# 安装指定版本
npm install lodash@4.17.21

# 按版本范围安装（不常用）
npm install vue@">=2.6.0 <3.0.0"

# 安装为开发依赖（devDependencies）
npm install --save-dev typescript
```

**远程仓库 / Git 仓库：**

```sh
npm install git+https://github.com/user/repo.git
```

**CI / Docker：`npm ci`（再次强调）**

```sh
npm ci
```

- 要求：存在 `package-lock.json`；
- 行为：删除 `node_modules`，严格按 lock 文件安装；
- 不会修改 `package-lock.json`；
- 更快、更稳定，适合 CI/生产构建。

---

### 10.3 升级/卸载依赖：`npm update` / `npm uninstall`

**升级：**

```sh
# 升级项目中的某个依赖（在 version range 允许范围内）
npm update axios

# 升级全局安装的包
npm update -g npm
```

更精确的升级策略通常是：

- 在 `package.json` 中直接调整版本范围或精确版本；
- 然后执行 `npm install` 让 lock 文件同步更新；
- 测试通过后提交 `package.json` + `package-lock.json`。

**卸载：**

```sh
npm uninstall lodash
# 或简写
npm un lodash
```

此命令会：

- 从 `dependencies` 或 `devDependencies` 中移除条目；
- 更新 `package-lock.json`；
- 删除 `node_modules` 中对应目录（局部）。

---

### 10.4 查看依赖信息：`npm list` / `npm outdated` / `npm view`

**项目中已安装的依赖列表：**

```sh
npm list                  # 递归列出所有安装的依赖
npm list --depth=0        # 只看一级依赖，简洁概览

# 全局安装的包
npm list -g --depth=0
```

**过期依赖：**

```sh
npm outdated              # 查看哪些包有新版本
npm outdated -g           # 全局包的更新情况
```

**包信息查询：**

```sh
# 查看某个包的元信息
npm view react

# 查看指定版本的信息
npm view react@18.2.0

# 查看最新版本
npm view react version

# 查看所有发布版本列表
npm view react versions
```

---

### 10.5 任务与脚本：`npm run`

`package.json` 中的 `scripts` 字段用于定义项目任务：

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "jest",
    "lint": "eslint ."
  }
}
```

执行：

```sh
npm run dev
npm run build
npm run lint
```

特例：`start` 和 `test` 可以省略 `run`：

```sh
npm start  # == npm run start
npm test   # == npm run test
```

**参数传递：**

```json
{
  "scripts": {
    "build": "webpack"
  }
}
```

执行：

```sh
npm run build -- --mode production --config webpack.prod.js
```

- `--` 之后的参数传给 `webpack`，而不是 npm。

**内部变量：**

npm 会把 `package.json` 中的字段通过环境变量暴露给脚本：

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "config": {
    "reporter": "xunit"
  },
  "scripts": {
    "bundle": "mkdir -p build/$npm_package_version/",
    "test": "mocha test/ --reporter $npm_package_config_reporter"
  }
}
```

- `$npm_package_name` → `"my-app"`
- `$npm_package_version` → `"1.0.0"`
- `$npm_package_config_reporter` → `"xunit"`

**前后置钩子：`pre` / `post`**

```json
{
  "scripts": {
    "prebuild": "echo pre",
    "build": "echo build",
    "postbuild": "echo post"
  }
}
```

`npm run build` 会依次执行：`prebuild` → `build` → `postbuild`。

---

### 10.6 发布与调试：`npm publish` / `npm link`

**发布流程：**

```sh
# 登录（若尚未登录）
npm login    # 或历史命令 npm adduser

# 发布包
npm publish
# 发布特定标签
npm publish --tag beta
# scoped 包公开发布
npm publish --access=public
```

**本地联调：`npm link`**

用于在开发本地库和本地应用时快速联调：

假设：

- 上游库：`dep`；
- 下游业务项目：`app`。

步骤：

```sh
# 在 dep 路径下
npm link

# 在 app 路径下
npm link dep
```

效果：

- `app/node_modules/dep` 会变成指向本地 dep 的符号链接；
- 修改 dep 代码并重新构建后，app 里会立刻使用最新代码。

解除：

```sh
# 在 app 中解除链接
npm unlink dep

# 在 dep 中解除全局链接
npm unlink
```

---

### 10.7 其他实用命令与配置

- `npm run env`：打印当前执行脚本时的环境变量（便于调试）。
- `npm doctor`：检查本机环境是否适合运行 npm（网络、权限、缓存等）。
- `npm audit`：检查依赖中的已知安全漏洞，可配合 `--json` 做自动化分析。

**版本前缀策略：**

```sh
# 默认使用 ^ 前缀
npm config set save-prefix="^"

# 换成 ~ 前缀
npm config set save-prefix="~"

# 使用精确版本（不带前缀）
npm config set save-exact=true
```

**跨目录运行脚本：**

```sh
npm run dev --prefix /path/to/project
```

可以在一个“工具仓库”统一触发多个项目的脚本，而不用频繁切换目录。

---

### 10.8 推荐的依赖管理工作流

1. **新项目初始化：**

   - `npm init -y` 初始化；
   - 配置 `.nvmrc` / `.npmrc`；
   - 提交 `package.json`。

2. **添加依赖：**

   - 使用 `npm install xxx` / `npm install -D yyy`；
   - 检查运行是否正常；
   - 提交 `package.json` + `package-lock.json`（不提交 `node_modules`）。

3. **新成员拉取项目：**

   - `git clone`；
   - `nvm use`（或对应版本管理器）；
   - `npm install`（首次）或 `npm ci`（已经有 lock）。

4. **升级依赖：**

   - 小范围更新：`npm update <pkg>`；
   - 大版本更新：明确指定版本 `npm install <pkg>@<version>`，或手动改 `package.json` 后 `npm install`；
   - 升级后跑完测试，通过再提交。

5. **降级依赖：**

   - `npm install <pkg>@<version>`；
   - 确认兼容性后提交。

6. **移除依赖：**

   - `npm uninstall <pkg>`；
   - 验证无误后提交。

7. **锁文件管理：**

   - 不手动改 `package-lock.json`；
   - 若 lock 文件看起来“脏”或出现异常冲突：
     - 删除本地 lock 文件；
     - 从远端拉最新版本；
     - `npm ci` 或 `npm install` 重新安装。

8. **CI / 生产环境：**
   - 使用 `npm ci`；
   - 严格依赖 `package-lock.json`；
   - Node 版本通过 nvm/fnm/volta 或容器镜像固定。

---

## 十一、版本一致性与依赖约束策略（库作者视角）

当你只是“应用开发者”时，对依赖版本的约束主要靠 `dependencies` / `devDependencies` 即可。但如果你是在写一个“库”或“脚手架”，就要考虑“**如何强制（或至少提醒）用户安装正确的依赖版本**”。

---

### 11.1 `peerDependencies`：声明对宿主框架的兼容需求

典型场景：

- 你写了一个 React 插件；
- 这个插件只能在 React 18 下正常工作。

在 `package.json` 中，你可以写：

```json
"peerDependencies": {
  "react": "^18.0.0"
}
```

含义：

- 你的库本身不会自动安装 React；
- 但你要求 **使用你的库的项目** 必须安装一个满足 `^18.0.0` 的 React 版本。

npm / Yarn 在安装时：

- 会检测宿主项目的依赖是否满足这条规则；
- 不满足时会给出 warning 或 error（视包管理器和版本而定）。

---

### 11.2 运行时版本检查：借鉴 create-react-app

有些工具（如 create-react-app 的 `react-scripts`）会在运行时做更严格的版本检查。

其思路可以概括为：

1. 维护一份“期望依赖版本表”：

   ```js
   const expectedDeps = {
     'babel-jest': '^29.0.0',
     webpack: '^5.0.0',
     // ...
   };
   ```

2. 遍历项目的 `node_modules`，读取这些依赖的 `package.json`：

   - 使用 `fs` + `path` 找到实际安装的版本；
   - 通过 `semver.satisfies(installed, expectedRange)` 检查是否符合预期。

3. 一旦发现不满足：

   - 输出清晰的错误提示；
   - 给出修复建议（升级/降级某个依赖）；
   - 直接 `process.exit(1)` 终止构建或启动流程。

这样做的价值在于：

- 对于“工具型”项目，可以大幅减少“用户自行升级某个依赖导致工具崩溃”的隐性问题；
- 你可以把“经过充分验证的依赖版本组合”固定下来，用脚本在运行时进行守护。

---

### 11.3 实战建议（给库作者）

- 在 `peerDependencies` 中声明对核心宿主（如 React/Vue/Webpack）的版本要求；
- 使用 `engines` 字段声明对 Node/npm 的最低版本要求：

  ```json
  "engines": {
    "node": ">=18",
    "npm": ">=8"
  }
  ```

- 对于脚手架、构建工具、CLI 等复杂项目：
  - 可以在入口文件中加一段“依赖版本检查”逻辑；
  - 避免用户升级某些核心依赖后导致不可预期的问题；
  - 同时给出明确的错误提示和修复指导。

---

## 十二、Verdaccio：搭建企业内部 npm 私有仓库

### 一、目标与场景

你现在的场景是：

- 开发环境主要在一台 Mac（M1）上；
- 这台 Mac 同时是“开发机 + 本地服务机”；
- 希望在这台 Mac 上跑一个 Verdaccio 实例，把它当作公司的 npm 私有仓库原型；
- 所有本地项目（甚至局域网内其他设备）都可以通过这个 Mac 的地址访问私服。

想解决的问题：

- 多个项目重复实现类似组件（按钮、弹窗、表单、SDK）；
- 修 bug 后很难同步到所有项目；
- 不适合把业务实现发到公共 npm；
- 想先在本机验证整个私服方案，再推广给团队。

---

### 二、在 Mac 上安装和启动 Verdaccio

#### 2.1 检查 Node.js 环境

推荐 Node.js 18+。在终端（Terminal/iTerm）中执行：

```bash
node -v
```

如果版本 < 18，建议通过 nvm 或 Homebrew 升级（略）。

#### 2.2 全局安装 Verdaccio（本机）

在终端执行：

```bash
npm install -g verdaccio
```

安装完成后执行：

```bash
verdaccio
```

你会看到类似输出（路径以你本机为准）：

```text
info --- Verdaccio started
info --- address: http://localhost:4873/
info --- config file: /Users/你的用户名/.config/verdaccio/config.yaml
info --- storage: /Users/你的用户名/.local/share/verdaccio/storage
```

在浏览器打开：

```text
http://localhost:4873/
```

可以看到 Verdaccio 的 Web UI，这就是你本机的 npm 私有仓库主页。

---

### 三、从默认 config.yaml 演进到企业配置（以本机 Mac 为例）

#### 3.1 找到并打开默认配置文件

根据启动日志，配置文件在类似位置：

```text
/Users/你的用户名/.config/verdaccio/config.yaml
```

默认配置的特点是：

- 使用 `htpasswd` 做认证；
- 默认允许“无限注册”用户；
- 所有包都可以通过上游 `registry.npmjs.org` 代理；
- 适合本地试用，不适合企业安全要求。

简化一下默认的关键部分，大概是这样的：

```yaml
storage: /Users/你/.local/share/verdaccio/storage

auth:
  htpasswd:
    file: ./htpasswd
    # max_users: 1000
    # 可设置为 -1 以禁用注册

uplinks:
  npmjs:
    url: https://registry.npmjs.org/

packages:
  '@*/*':
    access: $all
    publish: $authenticated
    unpublish: $authenticated
    proxy: npmjs

  '**':
    access: $all
    publish: $authenticated
    unpublish: $authenticated
    proxy: npmjs

listen: 0.0.0.0:4873
```

直接用这个在本机玩玩没问题，但如果要当作“企业私服原型”，建议做 3 件事：

1. 禁用 npm 自助注册，改为管理员手工建账号；
2. 为公司的 scope（如 `@geektech/*`）单独设权限，并关闭上游代理；
3. 将上游源从官方 npm 改为国内镜像，并开启缓存。

#### 3.2 锁住账号注册方式（max_users: -1）

在 `auth.htpasswd` 下增加配置：

```yaml
auth:
  htpasswd:
    file: ./htpasswd
    # 禁用自助注册（不允许 npm adduser）
    max_users: -1
    # 建议使用 bcrypt 存储密码
    algorithm: bcrypt
    rounds: 10
```

解释：

- 默认不写 `max_users` 相当于“无限注册”（`+inf`）；
- 官方注释明确写了：**`-1` 表示禁用注册**；
- 这样，在你的 Mac 上跑的 Verdaccio，就不会允许任何人用 `npm adduser` 自助注册账号了，所有账号都要你在本机通过 `htpasswd` 命令创建。

#### 3.3 为公司 scope 写专门规则（并关闭 proxy）

在 `packages:` 部分，为你的公司 scope（例如 `@geektech/*`）增加一段规则：

```yaml
packages:
  '@geektech/*':
    access: $authenticated # 仅登录用户可读
    publish: $authenticated # 仅登录用户可发布
    unpublish: admin1 admin2 # 仅少数维护者可撤销发布
    proxy: false # 不向上游 npm 查找这个 scope

  '@*/*':
    access: $all
    publish: $authenticated
    unpublish: admin1
    proxy: npmjs

  '**':
    access: $all
    publish: $authenticated
    unpublish: admin1
    proxy: npmjs
```

说明：

- `@geektech/*` 是公司内部包；
- `proxy: false` 避免“依赖混淆”：即使公网上有人抢注了同名包，你的 Verdaccio 也不会去外面拉；
- `admin1 admin2` 请替换成你实际的维护者用户名。

#### 3.4 上游源换成国内镜像（npmmirror）

在 `uplinks` 中把 `registry.npmjs.org` 换成国内镜像，例如：

```yaml
uplinks:
  npmjs:
    url: https://registry.npmmirror.com/
    cache: true
```

`cache: true` 表示 Verdaccio 会把从 npmmirror 拉下来的包缓存在本机 `storage` 中，之后本机其它项目安装相同版本就非常快。

#### 3.5 一份适合“本机 Mac + 企业规则”的完整配置示例

综合上面几步，你可以把配置整理成类似这样（路径按你本地为准）：

```yaml
storage: /Users/你的用户名/.local/share/verdaccio/storage
plugins: ./plugins

web:
  title: GeekTech npm Registry (Local)

auth:
  htpasswd:
    file: ./htpasswd
    max_users: -1 # 禁用自助注册
    algorithm: bcrypt
    rounds: 10

uplinks:
  npmjs:
    url: https://registry.npmmirror.com/
    cache: true

packages:
  '@geektech/*':
    access: $authenticated
    publish: $authenticated
    unpublish: admin1 admin2
    proxy: false

  '@*/*':
    access: $all
    publish: $authenticated
    unpublish: admin1
    proxy: npmjs

  '**':
    access: $all
    publish: $authenticated
    unpublish: admin1
    proxy: npmjs

server:
  keepAliveTimeout: 60

# 本机开发环境：localhost 或 0.0.0.0 都可以
# - localhost:4873：只本机访问
# - 0.0.0.0:4873：局域网其它设备也可以访问你的 Mac 私服
listen: localhost:4873

middlewares:
  audit:
    enabled: true

log:
  type: stdout
  format: pretty
  level: http
# 如果想在本机上试 npm token 子命令，可以打开
# experiments:
#   token: true
```

修改完 `config.yaml` 后，重新启动 Verdaccio：

```bash
# 在开着 verdaccio 的终端中按 Ctrl + C 结束
verdaccio
# 再次启动
verdaccio
```

---

### 四、在本机上创建账号（htpasswd，macOS 版本）

因为我们把 `max_users` 设成了 `-1`，所以不能通过 `npm adduser` 自助注册账号，必须在本机命令行用 `htpasswd` 创建。

在 macOS 上，可以这样安装 `htpasswd`：

```bash
# 如果你已安装 Homebrew
brew install httpd
```

安装完成后，`htpasswd` 通常会出现在 `/opt/homebrew/bin/htpasswd`（Apple Silicon）或 `/usr/local/bin/htpasswd` 路径下，直接在终端执行：

```bash
htpasswd -h
```

能看到帮助就说明可以用了。

然后在 Verdaccio 配置目录中创建用户（这个目录就是 `config.yaml` 所在位置）：

```bash
cd /Users/你的用户名/.config/verdaccio

# 创建第一个用户（admin1，-c 表示创建新文件）
htpasswd -c htpasswd admin1

# 创建第二个用户（admin2，不要再用 -c）
htpasswd htpasswd admin2
```

完成之后，重启 Verdaccio：

```bash
verdaccio
#（如果原本开着就先 Ctrl + C，然后再重启一次）
```

现在你可以在本机任何一个终端中，用这两个账号进行 login：

```bash
npm login --registry=http://localhost:4873/
# 按提示输入 admin1 / 密码
```

---

### 五、在 Mac 上发布第一个内部包（@geektech/button）

假设你想在这个本地私服上发布一个“公司统一按钮组件”。

#### 5.1 创建组件项目

在你的 Mac 上开一个终端：

```bash
mkdir geek-button
cd geek-button
npm init -y
```

修改 `package.json`：

```json
{
  "name": "@geektech/button",
  "version": "1.0.0",
  "description": "极客科技统一按钮组件",
  "main": "index.js",
  "private": false
}
```

创建 `index.js`（CommonJS，避免 ESM 兼容问题）：

```javascript
// 一个极简示例：返回 HTML 字符串
const Button = ({ children, type = 'primary' }) => {
  const styles = {
    primary: 'bg-blue-500 text-white',
    danger: 'bg-red-500 text-white',
  };

  const cls = styles[type] || styles.primary;
  return `<button class="${cls}">${children}</button>`;
};

module.exports = { Button };
```

#### 5.2 为这个项目指定私服源（本机地址）

在 `geek-button` 项目根目录创建 `.npmrc`：

```ini
# 公司内部 scope 走本机私服
@geektech:registry=http://localhost:4873/

# 其他包走公共镜像（npmmirror）
registry=https://registry.npmmirror.com/
```

#### 5.3 登录并发布

第一次需要 login（使用刚才的 admin1/admin2）：

```bash
npm login --registry=http://localhost:4873/
# 输入 admin1 / 密码 / 邮箱（邮箱随便填）
```

然后执行发布：

```bash
npm publish --registry=http://localhost:4873/
```

看到类似输出：

```text
+ @geektech/button@1.0.0
```

说明已经成功发布到你本机的 Verdaccio 里了。

建议在 `package.json` 中加一段：

```json
"publishConfig": {
  "registry": "http://localhost:4873/"
}
```

以后在本项目里只需 `npm publish` 即可，默认就发到本机私服。

#### 5.4 在浏览器查看本机私服

打开：

```text
http://localhost:4873/
```

你可以在左侧看到 `@geektech/button`，点击可查看版本等信息。

---

### 六、在其它本地项目中使用私有包

现在你在本机另一个项目（例如电商项目）中使用这个按钮组件。

#### 6.1 在电商项目中配置 `.npmrc`

进入电商项目根目录，在该目录创建或修改 `.npmrc`：

```ini
@geektech:registry=http://localhost:4873/
registry=https://registry.npmmirror.com/
```

#### 6.2 安装内部包

在项目根目录执行：

```bash
npm install @geektech/button
```

#### 6.3 使用组件

```javascript
// ES Module 写法
import { Button } from '@geektech/button';

// Node.js CommonJS 写法
// const { Button } = require('@geektech/button');

const App = () => {
  return Button({
    children: '立即购买',
    type: 'primary',
  });
};
```

到这一步，你已经在“一台 Mac 本机上”跑通了：

- 本机 Verdaccio；
- 本机发布内部包；
- 本机其它项目从私服安装和使用内部包。

---

### 七、在本机上理解和使用 npm token（用于 CI）

即便私服跑在你本机上，你可能仍然希望：

- 在本机跑 GitLab Runner / GitHub Actions Runner / Jenkins；
- CI 自动执行 `npm publish` 到本机 Verdaccio。

CI 不能像人一样输入用户名密码，所以需要 npm 的 token 机制。

#### 7.1 npm token 是什么？

可以把它理解为一个“npm 访问令牌”：

- 当你执行 `npm login --registry=http://localhost:4873/` 时，Verdaccio 会给你签发一个 token，并写入你本机的 `~/.npmrc`；
- 这行配置通常长这样：

  ```ini
  //localhost:4873/:_authToken=xxxxx-xxxx-xxxx
  ```

- npm 以后访问 `http://localhost:4873/` 时，就会在 HTTP 请求里带上这个 token，来证明“我是 admin1”。

在 CI 中，我们一般这么用：

1. 把这条 `_authToken` 的值提取出来；
2. 配置为 CI 的环境变量 `NPM_TOKEN`；
3. 在 CI 脚本里生成一个 `.npmrc`，写入：

   ```ini
   //localhost:4873/:_authToken=${NPM_TOKEN}
   ```

4. 然后在 CI 中执行 `npm publish --registry=http://localhost:4873/`，就等价于在命令行中以你本人身份发布。

#### 7.2 如何在本机上获得 NPM_TOKEN？

步骤非常简单：

1. 在你 Mac 上执行一次登录（前面已经做过）：

   ```bash
   npm login --registry=http://localhost:4873/
   ```

2. 然后查看你的 `~/.npmrc`（注意是你用户目录下的，不是项目目录下）：

   ```bash
   cat ~/.npmrc
   ```

   找到类似一行：

   ```ini
   //localhost:4873/:_authToken=xxxxx-xxxx-xxxx
   ```

3. 把 `xxxxx-xxxx-xxxx` 这一串复制出来，就是你的 `NPM_TOKEN`。

#### 7.3 在本机 CI 中使用 token（示例）

假设你在 Mac 上跑了一个 GitLab Runner（或者以后跑），可以在项目里写一个 `.gitlab-ci.yml`：

```yaml
stages:
  - test
  - deploy

publish:
  stage: deploy
  script:
    # 为当前 CI 任务生成 .npmrc，注入 token
    - echo "//localhost:4873/:_authToken=${NPM_TOKEN}" > .npmrc
    - npm ci
    - npm test
    - npm publish --registry=http://localhost:4873/
  only:
    - tags
```

然后在 GitLab CI 变量中配置：

- `NPM_TOKEN=xxxxx-xxxx-xxxx`（刚刚从 `~/.npmrc` 复制出来的值）。

> 可选：如果你在 `config.yaml` 中打开了 `experiments.token: true`，还可以在本机执行 `npm token create --registry=http://localhost:4873/` 来生成新的 token，并在 `npm token list` 中管理它们。对于日常使用，上面“从 `~/.npmrc` 拿 token”的方法已经足够。

---

### 八、可选：让局域网同事也能访问你这台 Mac 的私服

如果你愿意把这台 Mac 临时当作团队的私服服务器，可以做两件事：

1. 在 `config.yaml` 中把 `listen` 改成：

   ```yaml
   listen: 0.0.0.0:4873
   ```

   表示“监听所有网卡地址”，而不仅仅是本机。

2. 让同事在浏览器打开：

   ```text
   http://你的Mac局域网IP:4873/
   ```

   比如 `http://192.168.1.23:4873/`；在他们的项目 `.npmrc` 中配置：

   ```ini
   @geektech:registry=http://192.168.1.23:4873/
   ```

> 注意：这只是“把你的 Mac 暂时当服务器用”，网络和安全问题需要你自己评估。正式生产环境一般还是会用专门的服务器或云主机。

---

### 九、常见问题（针对本机场景）

#### Q1：在项目中安装包报 404 / 找不到包？

检查项目根目录 `.npmrc`：

```bash
cat .npmrc
```

确认里面有：

```ini
@geektech:registry=http://localhost:4873/
```

同时检查全局 npm 配置是否覆盖：

```bash
npm config get @geektech:registry
npm config get registry
```

如果有其它地方设置了 scope registry，把它改回来即可。

#### Q2：npm login 提示认证失败？

- 确认你在 `~/.config/verdaccio/htpasswd` 中确实创建了这个用户（用 `cat` 看看）；
- 确认 `config.yaml` 中 `auth.htpasswd.file` 配置指向的路径与实际一致（如果你手动改过路径）；
- 修改完后记得重启 Verdaccio。

#### Q3：Node/包管理器说 `Unexpected token export` 之类的错误？

- 说明你发布的包用的是 ESM 语法，但 `package.json` 没有声明 `"type": "module"` 或输出的 `main` 指向 ESM 文件；
- 本文使用 CommonJS（`module.exports`），就是为了避免这类问题；
- 如果你后续要升级到 ESM + 构建，记得同步更新 `package.json`（`type`、`main`、`exports` 等）。

---

## 十三、patch-package 与“全面兼容”的库

这一节主要作为“进阶工具”与“延伸阅读”的入口。

---

### 13.1 使用 patch-package 临时修补第三方依赖

场景：

- 某个第三方库有 bug，尚未合并你的 PR 或发布修复版本；
- 你又必须在当前版本上修复它。

`patch-package` 的思路是：

- 直接修改本地 `node_modules` 中的依赖；
- 然后通过 diff 生成补丁文件；
- 每次安装依赖后自动应用这些补丁。

基本流程：

1. 安装工具：

   ```sh
   npm install patch-package postinstall-postinstall --save-dev
   ```

2. 修改 `package.json` 的 `scripts`：

   ```json
   {
     "scripts": {
       "postinstall": "patch-package"
     }
   }
   ```

3. 在 `node_modules` 中直接修改目标包代码（仅限小 patch）。

4. 生成补丁：

   ```sh
   npx patch-package some-buggy-package
   ```

   会在项目根目录生成 `patches/some-buggy-package+<version>.patch`。

5. 提交 `patches/` 目录到仓库。

之后，你或 CI 每次 `npm install`（触发 `postinstall`）时，patch-package 都会自动应用这些补丁。

注意事项：

- 升级目标依赖版本后，补丁可能失效，需要重新生成；
- 只适合**小范围修复**，大改动还是应该推动上游修复并升级依赖；
- patch 文件本质上是 diff，建议在代码评审中认真审查。

---

### 13.2 写一个“全面兼容”的 npm 库（概要思路）

当你要写一个“面向公众”的 npm 库时（尤其是工具类、UI 组件库），有几个兼容性问题需要统一考虑：

- 模块格式：
  - CommonJS（`require`）；
  - ES Module（`import`）；
  - 浏览器直接 `<script>` 引入。
- 运行环境：
  - Node 环境；
  - 浏览器环境；
  - SSR 场景（Next.js、Nuxt 等）。
- 类型支持：
  - TypeScript 类型声明（`.d.ts`）；
  - JSDoc 注释 / 类型导出。

典型实践包括：

- `package.json` 中同时正确设置 `main` / `module` / `exports` / `types` 等字段；
- 打包输出多种构建产物（CJS / ESM / UMD）；
- 明确 engine 与 peerDependencies；
- 在 README 中写清楚使用方式（Node 环境与浏览器环境）。

---

下面按“问题场景 → 原因 → 解决步骤”的形式整理一个**常见坑 & 排查指南**，你可以作为新的一章直接插入到文章末尾。

---

## 十四、常见坑 & 排查指南（FAQ）

### 14.1 `npm ERR! ERESOLVE unable to resolve dependency tree`

**典型报错**

```text
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR!
npm ERR! While resolving: your-app@1.0.0
npm ERR! Found: react@18.2.0
npm ERR! Could not resolve dependency:
npm ERR! peer react@"^17.0.0" from some-lib@1.2.3
```

**问题本质**

- 从 **npm 7+** 开始，对 `peerDependencies` 的解析更严格：
  - 以前只是给 warning，很多冲突直接“糊过去”；
  - 现在遇到不兼容的 peer 依赖会直接报错。
- 常见场景：
  - 你的项目用了 React 18，而某个依赖声明 `peerDependencies: react: ^17.0.0`；
  - 或者多个依赖对同一个包的 peer 版本要求互相矛盾。

**不推荐的“偷懒修复”**

```sh
# 会关闭严格解析，回退到旧行为
npm install --legacy-peer-deps
# 或者全局关闭
npm config set legacy-peer-deps true
```

这会让 npm 忽略 peer 依赖冲突，短期能跑，长期风险很大（某些包其实不支持你现在用的版本）。

**推荐做法**

1. **找出冲突链路**

   - 用报错信息定位是哪个包的 `peerDependencies` 不兼容；
   - 必要时用：

     ```sh
     npm ls <包名>
     ```

     看这个包是被谁依赖进来的。

2. **升级 / 替换问题依赖**

   - 查这个问题包是否有支持你当前环境的新版本：
     - 升级：`npm install some-lib@latest`；
     - 或寻找替代库。

3. **必要时“降级宿主依赖”**

   - 如果你用的是刚出的大版本（例如 React 18 出来初期）：
     - 部分生态库暂时只支持 React 17，这时可以考虑：
       - 回退到 React 17；
       - 或者只在某个项目中维持旧版本，等待生态跟上。

4. **只在“短期过渡 + 风险可控”时考虑 `--legacy-peer-deps`**

   - 比如：一个老项目，依赖极多且短期内不计划升级；
   - 把 `--legacy-peer-deps` 写在 CI 中，并在 README 写明原因；
   - 同时规划一个“升级日”，集中清理这些历史债务。

---

### 14.2 Node 版本不一致导致构建或运行错误

**典型现象**

- 某人机器上报错，别人同项目没问题；
- 报错信息类似：
  - `SyntaxError: Unexpected token '??'`
  - `Error: error:0308010C:digital envelope routines::unsupported`
  - 某些 CLI 提示 “Node >= 18 required”

**问题本质**

- 项目依赖的工具链（Vite、Webpack、Babel、ESLint、TS 等）通常对 Node 版本有要求；
- 你本地的 Node 版本和：
  - **项目推荐版本**（`.nvmrc` / README）；
  - 或 **CI 使用的版本**
    不一致时，就可能出现各种奇怪错误。

**排查 & 解决步骤**

1. **第一步永远是确认 Node 版本**

   ```sh
   node -v
   ```

2. **对照项目要求**

   - 查看项目根目录是否有 `.nvmrc`：
     - 有：`nvm use` / `fnm use` / `volta` 等切到指定版本；
     - 没有：确认 README 或项目文档的推荐版本。
   - CI/Docker 环境：看看用的是哪一个官方 Node 镜像。

3. **统一到同一主版本（最好是 LTS）**

   - 建议用当前 LTS（如 18 / 20）；
   - 所有人 + CI 统一；

4. **针对特定报错的附加说明**

   - `error:0308010C:digital envelope routines::unsupported`

     - 常见于 **Node 17+ + 老 Webpack** 组合；
     - 临时绕过方法：

       ```sh
       export NODE_OPTIONS=--openssl-legacy-provider
       ```

     - 长期方案：升级 Webpack/CLI 到支持 Node 17+/18+ 的版本。

   - `Unexpected token '??'` / `'?.'`
     - 表示运行环境（Node 版本或某些 Babel 配置）不支持这些新语法；
     - 要么升级 Node，要么正确配置 Babel/TS 编译目标。

---

### 14.3 网络 / 镜像 / 证书相关错误（ETIMEDOUT / ECONNRESET 等）

**典型报错**

```text
npm ERR! code ETIMEDOUT
npm ERR! errno ECONNRESET
npm ERR! network request to https://registry.npmjs.org/... failed
```

**问题本质**

- 访问默认 registry（npmjs.org）时网络不通或不稳定；
- 在公司网络下，可能需要通过代理访问外网；
- 某些公司自签证书，导致 `strict-ssl` 下 TLS 验证失败。

**排查 & 解决步骤**

1. **检查当前使用的 registry**

   ```sh
   npm config get registry
   ```

   - 若是 `https://registry.npmjs.org/`：
     - 在国内可能不稳定，考虑换国内镜像（如 npmmirror 等）；
   - 若是公司私服：
     - 检查私服是否在线，URL 是否写错。

2. **公司内网有代理的情况**

   - 在 `.npmrc` 或环境变量中配置：

     ```ini
     proxy=http://user:pass@proxy.company.com:8080
     https-proxy=http://user:pass@proxy.company.com:8080
     ```

   - 或通过 `HTTP_PROXY` / `HTTPS_PROXY` 环境变量配置。

3. **严格 SSL 校验问题**

   - 有的公司会用自签根证书劫持 HTTPS；
   - npm 默认 `strict-ssl=true`；
   - 最安全的办法是：
     - 安装公司根证书，让系统信任；
   - 临时调试可以设置（不推荐长期使用）：

     ```sh
     npm config set strict-ssl false
     ```

4. **简单自查命令**

   ```sh
   npm ping                  # 测试是否能连上当前 registry
   npm config list           # 查看整体配置是否有奇怪的 proxy/registry
   ```

---

### 14.4 `package-lock.json` 冲突 / `npm ci` 失败

**典型现象**

- `npm ci` 报：

  ```text
  npm ERR! Cannot destructure property 'integrity' of 'idealTree.legacyPeerDeps'...
  ```

- 或提示 `package.json` 与 `package-lock.json` 不一致；
- git 提交时，`package-lock.json` 变化巨大，甚至不同人不断互相覆盖。

**问题本质**

- 锁文件就是用来“锁版本”的，但前提是：
  - 所有人用的是**同一套包管理器 + 同一主版本**（至少大版本一致）；
- 不同 npm 大版本（6/7/8）使用不同的 lockfileVersion；
- 不同人用不同工具（npm/Yarn/pnpm）混着装，锁文件会不断被重写。

**推荐规范**

1. **一个项目只用一个包管理器**

   - 用 npm：只提交 `package-lock.json`；
   - 用 Yarn：只提交 `yarn.lock`；
   - 另一种锁文件直接加到 `.gitignore`。

2. **尽量统一 npm 大版本（尤其是 6 vs 7+）**

   - 可以通过 `engines` 字段 + CI 检查强制约束：

     ```json
     "engines": {
       "node": ">=18",
       "npm": "^9"
     }
     ```

3. **`npm ci` 报“lock 文件不匹配”时**

   - 说明：你改了 `package.json`，但没同步更新 `package-lock.json`；
   - 正确流程：
     - 在本地运行一次 `npm install`；
     - 确认没问题后提交 `package.json` + `package-lock.json`；
     - 再让 CI 跑 `npm ci`。

4. **不要手改 `package-lock.json`**

   - 任何手动编辑都容易埋坑；
   - 一律通过 `npm install` / `npm uninstall` / `npm update` 让 npm 自己维护。

---

### 14.5 `node_modules` 损坏 / 切分支后项目跑不起来

**典型现象**

- 切到另一个 git 分支后各种报错；
- 或者升级了一些依赖后，某些包似乎“既在又不在”。

**问题本质**

- `node_modules` 是一个随 `package.json` + `package-lock.json` 变化而变化的“构建产物”；
- 在分支之间频繁切换、强行合并锁文件、网络中断等情况下，`node_modules` 很容易变成“半残状态”。

**推荐修复步骤**

1. **把 `node_modules` 当成可删除目录看待**

   - 在已经提交 lock 文件的前提下：

     - 删除 `node_modules`：

       ```sh
       rm -rf node_modules
       ```

     - 然后用 `npm ci`（有 lock 文件）或 `npm install` 重新安装。

2. **切换分支时的最佳实践**

   - 代码仓库切分支前，如果两个分支依赖差异很大：
     - 可以先 `rm -rf node_modules`；
     - 切到新分支后重新 `npm ci`；
   - 初看成本不低，但远比在一个“脏 node_modules”里排查玄学问题划算。

---

### 14.6 `npx` / CLI 命令“找不到”或版本不对

**典型现象**

- `npx eslint` 提示找不到命令；
- 或者你明明刚全局装了 CLI，命令却不生效；
- 在使用 nvm/fnm/volta 时更常见。

**问题本质**

- 每个 Node 版本有自己独立的全局包目录；
- 全局命令是否可用，取决于当前 Node 版本 + PATH；
- `npx` 也会优先在“当前项目 + 当前 Node 版本下”找命令。

**排查 & 解决建议**

1. **先看当前 Node 版本**

   ```sh
   node -v
   which node
   ```

   - 如果在用 nvm：
     - `nvm ls` 看看当前 `->` 指向哪个版本。

2. **尽量避免依赖全局 CLI**

   - 把 CLI 安装到项目 `devDependencies`；
   - 使用 `npx` 或 `npm run` 调用；
   - 保证所有人 + CI 用的是同一版本。

3. **确认项目是否正确安装了依赖**

   - `npm ls eslint` 看是否有安装；
   - 没有的话先 `npm install -D eslint` 再 `npx eslint ...`。

---

### 14.7 一键“删缓存 + 删 node_modules + 重装”到底什么时候用？

**很多人习惯：**

```sh
rm -rf node_modules
npm cache clean --force
npm install
```

**问题本质**

- 这三步确实能解决一部分问题，但也非常“核弹级”：
  - 浪费时间；
  - 且隐藏根本原因，长远看不利于工程化。

**建议的使用顺序**

1. **先检查配置 & 版本**

   - registry / 代理 / Node 版本 / npm 版本；
   - 参考本节前面几小点逐个排查。

2. **再看 lock 文件与分支是否混乱**

   - 是否多人混用 npm/Yarn；
   - 是否频繁修改 `package.json` 却没同步 lock。

3. **最后再考虑“删 node_modules + 重新安装”**

   - 有 lock 文件时优先用 `npm ci`；
   - 只有在怀疑缓存损坏时，才顺带 `npm cache clean --force`；
   - 并把这次事故的原因记录在团队知识库中（例如：某个私服挂了、某个 npm 版本有 bug）。

## 十五、实用工具

- [分析将 npm 软件包添加到项目的成本](https://bundlephobia.com/)
- [分析 npm 模块和依赖关系](https://npmgraph.js.org/)
- [分析 npm 包内容中的 TypeScript 类型问题](https://arethetypeswrong.github.io/)
- [比较一段时间内的 npm 软件包下载数量](https://npmtrends.com/)
