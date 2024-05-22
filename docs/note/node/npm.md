---
title: npm 基础
order: -1
toc: content
group:
  title: 基础知识
---

## npm 是什么？

npm 是一个具有多重语义的术语，它可以指以下几个含义：

1. **Node.js 的包管理器**：npm 作为 Node.js 的包管理器，从 2009 年开始开源，旨在帮助 JavaScript 开发者轻松分享和管理代码包。开发者可以通过 npm 安装、更新和删除依赖包，以及管理项目的依赖关系。

2. **npm 源站**：npm 还提供了一个公共的代码包集合服务，即 npm 源站。这个源站包含了 Node.js、前端应用、移动端应用等各种类型的代码包。开发者可以在 npm 源站上发布和共享自己的代码包，也可以从源站上下载和使用其他开发者分享的代码包。

3. **npm CLI**：npm CLI 是 npm 的命令行界面工具，用于执行与包管理相关的操作。通过 npm CLI，开发者可以安装、卸载、更新和发布代码包，管理项目的依赖关系，运行脚本等。npm CLI 提供了一系列命令，使得开发者可以方便地进行包管理操作。

对于 npm 源站来说，不同的公司也可以在内部部署私有化的 npm 源站，以满足公司内部的需求。这样可以确保公司内部的代码包能够得到有效管理和共享。

对于 CLI 来说，它的主要作用就是从源站读取包信息、下载包内容，并按照某种规范排布目录，使得 Node.js 在使用的时候，能正常通过 `require()` 或是 `import` 来导入模块。不同的 CLI 排布规则不一样，但是在 Node.js 中能达到同样的效果。而排布规则的不同大多都是出于依赖体积、安装速度考虑的。

## Node.js 与 npm 的版本关系

自 Node.js 10.0.0 版本起，Node.js 与 npm 的版本关系变得更加密切。每个新发布的 Node.js 主要版本通常会捆绑一个特定版本的 npm，以确保双方的兼容性。例如，Node.js 12.x 版本默认搭配 npm 6.x 版。尽管如此，由于 npm 更新的频率往往高于 Node.js，即便在同一主要版本系列中，也可能出现多个兼容的 npm 版本。为了维护 npm 的稳定运行，其版本需要与 Node.js 相匹配。

## Node.js 版本管理工具

以下是三款 Node.js 版本管理工具：

- [nvm](https://github.com/nvm-sh/nvm#intro)：一个基于 Shell 脚本的 Node.js 版本管理工具。
- [fnm](https://github.com/Schniz/fnm)：一个使用 Rust 编写的快速且易用的 Node.js 版本管理器。
- [volta](https://github.com/volta-cli/volta)：一个旨在快速、无缝安装和运行任何 JavaScript 工具的工具，基于 Rust 构建，以快速静态二进制文件运行。

**注意**：选择其中一个工具进行安装即可，**安装多个可能会引起冲突**。我们以 nvm 为例进行介绍。

### macOS 安装 nvm

**通过 homebrew 安装：**

```sh
brew install nvm
```

**[通过脚本直接安装](https://github.com/nvm-sh/nvm)：**

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
```

#### 配置 nvm 环境变量

安装完成后，将以下脚本添加到 shell 配置文件 (例如。zshrc) 中：

```sh
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

完成配置后，尝试在命令行输入 `nvm` 检查安装是否成功。

#### macOS 中常用的 nvm 命令

- **`nvm ls-remote`**：列出所有可安装的 Node.js 版本。
- **`nvm install <version>`**：安装指定的版本，例如 `nvm install 8.14.0`。
- **`nvm uninstall <version>`**：卸载指定的版本。
- **`nvm ls`**：列出所有已经安装的版本。
- **`nvm use <version>`**：切换使用指定的版本。
- **`nvm current`**：显示当前使用的版本。
- **`nvm alias default <version>`**：设置默认 node 版本。
- **`nvm deactivate`**：解除当前版本绑定，nvm 默认是不能删除被设定为 default 版本的 node，特别是只安装了一个 node 的时候，这个时候我们需要先解除当前版本绑定，然后再使用 `nvm uninstall <version>` 删除。

#### 在 m1 芯片 Mac 上管理旧版本 Node.js

**低版本的 Node 并不是基于 arm64 架构的，不适配 m1 芯片**。

在终端中，输入：

```sh
arch -x86_64 zsh
```

通过这个命令可以让 shell 运行在 Rosetta2 下。

之后可以通过 `nvm install <version>` 来安装低版本 Node。

> 在 v14 之后，可以不用在 Rosetta2 中就可以使用安装的可执行文件。

#### Node.js 安装位置

在终端我们可以使用 `which node` 来查看我们的 Node 被安装到了哪里，这里终端打印出来的地址其实是你当前使用的 Node 版本快捷方式的地址。

```sh
/Users/你的用户名/.nvm/versions/node/v10.13.0/bin/node
```

如果你想查看所有 Node 版本的安装文件夹，我们可以在**访达**中使用快捷键 `Command+Shift+G` 输入 **`/Users/你的用户名/.nvm/versions`** 地址就可以看到。

> **`.nvm`** 是个隐藏文件夹在**访达**中默认是不显示隐藏文件夹，显示隐藏文件的快捷键是 `Command+Shift+.`，关闭也是这个快捷键。

#### 多版本环境下的 npm 使用

每个版本的 Node 都会自带一个不同版本的 npm，可以用 `npm -v` 来查看 npm 的版本。**全局安装的 npm 包并不会在不同的 `Node` 环境中共享，因为这会引起兼容问题**。

它们被放在了不同版本的目录下，例如 **`~/.nvm/versions/node/<version>/lib/node_modules</version>`** 这样的目录。这刚好也省去我们在 Linux 中使用 `sudo` 的功夫了。因为这是用户的主文件夹，并不会引起权限问题。

如需在新版本 Node.js 中使用旧版本安装的 npm 包 (注意：该命令无法对已存在的 `node` 迁移全局 `npm` 包)，可使用以下命令导入：

```sh
nvm install v5.0.0 --reinstall-packages-from=4.2
```

### windows 安装 nvm

下载 [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)，下载完成，解压文件之后，双击进行安装即可。

安装完成，在命令行输入：`nvm v`，查看到对应的版本号，说明 nvm 安装成功了。

#### 使用淘宝镜像

在 nvm 安装目录下找到 `settings.txt` 文件，添加下面两行代码：

```sh
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

或者在命令行输入：

```sh
nvm node_mirror https://npm.taobao.org/mirrors/node/  # 默认地址：https://nodejs.org/dist/.
nvm npm_mirror https://npm.taobao.org/mirrors/npm/  # 默认地址：https://github.com/npm/cli/archive/.
```

#### windows 下 npm 全局包设置

**解决 nvm 切换版本后，全局安装的包，需要重新安装一遍的问题**，如下：

1. 设置 npm 全局包的安装路径，执行命令：`npm config set prefix 全局包安装路径`
2. 配置环境变量：变量名为：`NPM_HOME`，变量值为：**全局包安装路径**
3. 在 path 中，在 `%NVM_SYMLINK%` 之前，添加 `%NPM_HOME%`

## 什么是 npm？

### 理解 npm 配置

npm 配置是一个强大的功能，允许开发者预设和自定义项目的行为。掌握 npm 配置能够提高开发效率并确保项目的一致性。

npm 配置可通过多种方式设定，具体取决于以下来源的**优先级**：

1. **命令行参数** - 直接在命令行中设置，如：

   ```sh
   npm run serve -- --params=123
   ```

   此命令会设置 `params` 的值为 `123`，覆盖其他来源的同名配置。可通过 `process.env.npm_config_params` 访问。

2. **环境变量** - 环境变量中的 `npm_config_` 前缀将识别为 npm 配置。

   ```sh
   export npm_config_package_lock=false
   ```

   执行 `npm install` 时，npm 不会生成 package-lock.json 文件，因为它采用了环境变量的配置。

   查看和删除环境变量的命令分别是：

   ```sh
   echo $NODE_ENV
   unset NODE_ENV
   ```

3. **npmrc 文件** - 编辑这些文件以直接修改配置，它们的访问优先级如下：

   - **项目级** `.npmrc`：仅在当前项目中有效。
   - **用户级** `.npmrc`：位于 `~/.npmrc` 或通过 `npm config get userconfig` 查看。
   - **全局级** `.npmrc`：位于 `$PREFIX/etc/npmrc` 或通过 `npm config get globalconfig` 查看。
   - **npm 内置** `.npmrc`：不可更改的默认配置文件。

4. **npm config** - 默认配置参数，可通过以下命令查看和修改：

   ```sh
   # 设置配置项
   npm config set <key> <value>
   # 获取配置项
   npm config get <key>
   # 删除配置项（无法删除项目级配置）
   npm config delete <key>
   # 查看所有配置项，包括默认配置
   npm config list
   # 在编辑器中编辑配置文件
   npm config edit
   ```

### `.npmrc` 文件

`.npmrc` 文件是 npm 的配置文件，它包含了一些 npm 的配置信息，比如代理、镜像、命令别名等。通过修改 `.npmrc` 文件，可以更改 npm 的默认行为。

全局中，`.npmrc` 文件通常位于用户主目录下 (Linux 和 Mac 是 `~/.npmrc`)。

也可以在项目根目录下创建一个 `.npmrc` 文件，此时该项目下执行 npm 将会复用此份配置。

更多配置项可以参考 [npm 的官方文档](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc)。

### 镜像源管理

npm 默认的镜像源地址是：<https://registry.npmjs.org/>，

国内访问较慢，通常会使用淘宝开源的镜像站：<https://registry.npmmirror.com/>。

#### 手动切换

- 查看当前的镜像源：`npm config get registry`
- 设置当前的镜像源为淘宝源：`npm config set registry https://registry.npmmirror.com`

#### 使用镜像源管理工具

手动设置不够灵活，推荐使用 npm 镜像管理工具 nrm。

**全局安装 nrm：**

```sh
npm install nrm -g
```

安装完成后，输入命令 `nrm ls`，可以看到默认的 6 个源 (带 `*` 号的为当前使用的源)

```sh
  npm ---------- https://registry.npmjs.org/
  yarn --------- https://registry.yarnpkg.com/
  tencent ------ https://mirrors.cloud.tencent.com/npm/
  cnpm --------- https://r.cnpmjs.org/
* taobao ------- https://registry.npmmirror.com/
  npmMirror ---- https://skimdb.npmjs.com/registry/
```

输入 `nrm use taobao`，即切换 registry 到 taobao，即可使用淘宝的源进行下载了。

**nrm 常用命令：**

|              命令               |                        功能                         |
| :-----------------------------: | :-------------------------------------------------: |
|             nrm ls              |           查看所有配置好的源以及对应名称            |
| nrm add xxx <http://npm.xxx.cn> | 添加自定义源，xxx 是自定义名称，后面是源的 url 地址 |
|           nrm del xxx           |                    删除对应的源                     |
|          nrm test xxx           |      测试源的速度，不加名称，测试所有源的速度       |
|           nrm use xxx           |            切换源，即可使用对应名称的源             |

更多命令在命令行输入 `nrm` 即可查看。

### 常用 npm 指令

#### npm init

使用 `npm init` 初始化一个新的项目时会提示你去填写一些项目描述信息。如果觉得填写这些信息比较麻烦的话，可以使用-y 标记表示接受 package.json 中的一些默认值：

```sh
npm init -y
```

也可以设置初始化的默认值：

```sh
npm config set init-author-name 'your name'
npm config set init-author-email 'yourdoemail@qq.com'
npm config set init-author-url 'http://yourdomain.com'
npm config set init-license 'MIT'
```

#### npm list

```sh
# 当前项目安装的所有模块
npm list

# 列出全局安装的模块 带上[--depth=0] 不深入到包的支点 更简洁
npm list -g --depth=0

# 列出需要升级的全局包 包括 npm 自己
npm outdated -g
```

#### npm install

```sh
# 读取 package.json 安装
npm install
# 可简写成 npm i

# 默认安装指定模块的最新(@latest)版本
npm install [<@scope>/]<name>
# eg: npm install gulp

# 安装指定模块的指定版本
npm install [<@scope>/]<name>@<version>
# eg: npm install gulp@3.9.1

# 安装指定指定版本范围内的模块
npm install [<@scope>/]<name>@<version range>
# eg: npm install vue@">=1.0.28 < 2.0.0"

# 安装指定模块的指定标签 默认值为(@latest)
npm install [<@scope>/]<name>@<tag>
# eg: npm install sax@0.1.1

# 通过 Github 代码库地址安装
npm install <tarball url>
# eg: npm install git://github.com/package/path.git
```

#### npm update

```sh
# 升级当前项目或全局的指定模块
npm update <name> [-g]
# eg: npm update express
```

> 当然也可以通过重新安装包的方式更新包。

#### npm view

> name 是一个包的唯一标识，不得和其他包名重复，我们可以执行 `npm view packageName` 查看包是否被占用，并可以查看它的一些基本信息。若包名称从未被使用过，则会抛出 404 错误。

```sh
# 查看指定模块的版本信息
npm view <name>
# eg: npm view express

# 查看指定模块的指定版本信息
npm view <name>@<version>
# eg: npm view express@1.0.0
```

你可以执行 `npm view package version` 查看某个 `package` 的最新版本。
执行 `npm view conard versions` 查看某个 `package` 在 npm 服务器上所有发布过的版本。

![20240421213850](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240421213850.png)

#### npm run

package.json 的 `scripts` 字段，可以用于指定脚本命令，供 npm 直接调用。`npm run` 会创建一个 Shell，执行指定的命令。

用法指南：

1. **命令简写**：**`start` 和 `test` 属于特殊命令，可以省略 `run`，其余的都得带上 `run`。**
2. **可配置参数**：格式是加上两个连词线 (--)
3. **内部变量**：

   ```json
   {
     "name": "npm_test",
     "version": "1.0.0",
     "config": {
       "reporter": "xunit"
     },
     "scripts": {
       "bundle": "mkdir -p build/$npm_package_version/",
       // $npm_package_version 读的是 "version" 的值，同理 $npm_package_name 读的是 "name" 的值
       "test": "mocha test/ --reporter $npm_package_config_reporter"
       // $npm_package_config_reporter 读的是 "config" 里的 "reporter"
     }
   }
   ```

4. **`pre-` 和 `post-` 两个钩子**：

   当你在 package.json 中定义了一个脚本时，比如 build，你可以同时定义 prebuild 和 postbuild 脚本。npm 会在执行 `npm run build` 命令时，自动先查找并执行 prebuild 脚本，然后执行 build 脚本，最后执行 postbuild 脚本。

   假设你的 package.json 文件中有如下脚本定义：

   ```json
   "scripts": {
     "prebuild": "echo Preparing for build...",
     "build": "echo Building the project...",
     "postbuild": "echo Build completed."
     }
   ```

   当你运行 `npm run build` 命令时，输出将会是：

   ```sh
   > Preparing for build...
   > Building the project...
   > Build completed.
   ```

5. **串行执行**：`npm run script1 && npm run script2`

6. **并行执行**：`npm run script1 & npm run script2`

#### npm publish

```sh
# 未注册 注册一个用户 和直接在 https://www.npmjs.com/ 注册一样
npm adduser
# 执行后 填写几个问题 Username、Password、Email

#已注册 登录
npm login

#发布
npm publish
```

#### npm-link

使用 `npm link` 能够避免重复且繁琐的打包发布操作，给开发调试带来便捷，而且使用方法简单。

![20240425171009](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240425171009.png)

假设你维护的下游业务项目叫做 app，上游的依赖叫做 dep，那么要想做到 **“dep 一改动，app 就能同步更新”**，只需要这样：

```sh
# 1. 在 dep 所在路径执行
npm link

# 2. 在 app 所在路径执行
npm link dep
```

这样就形成了 app 与 dep 之间基本的 “链接” 关系。只要进入 app 的 `node_modules` 查看一下，不难发现 npm 其实就是替你建立了一个操作系统的 “快捷方式” (软链接) 跳到 dep 下而已。

**解除链接：**

```sh
# 1. 在 dep 所在路径执行，这样本地的 dep 包模块就解除了，其他项目的软连接也失效了。
npm unlink dep

# 2. 在 app 所在路径执行，这样 app 里就解除了 dep 模块的软连接
npm unlink dep
```

#### npm exec

`npm exec`（或者在一些 npm 版本中作为 `npx` 出现）是一个 npm 命令，用于在 npm 包管理的环境中执行任意命令。这个命令的一个常见用途是执行安装在项目本地或全局的 npm 包中的可执行文件，而不需要全局安装这些包或者直接引用它们的路径。这使得在不同项目之间共享和使用开发工具变得更加简单和一致。

##### 基本用法

- **执行本地安装的包**：如果你在项目中本地安装了一个包（例如，`eslint`），你可以使用 `npm exec eslint` 来执行它，而不需要知道它的具体安装路径。
- **无需事先安装直接执行包**：`npm exec` 还允许你执行尚未安装的 npm 包。例如，`npm exec --package=eslint -- eslint .` 会临时安装 `eslint`（如果尚未安装）并在当前目录执行它。

##### 选项和参数

- `-w` 或 `--workspace`：指定要在哪个工作空间执行命令（仅在使用 npm workspaces 时适用）。
- `--`：用于明确分隔 `npm exec` 命令的选项和要执行的实际命令及其参数。
- `--package`：允许指定要临时安装并执行的包，这对于一次性运行某个命令非常有用，无需永久添加到项目依赖中。

##### 示例

- **执行本地安装的命令**：`npm exec tsc`（假设 `tsc`，即 TypeScript 编译器，已作为本地依赖安装）。
- **指定工作空间执行命令**：`npm exec -w some-workspace -- some-command`（在名为 `some-workspace` 的工作空间中执行 `some-command`）。
- **临时安装并执行包**：`npm exec --package=cowsay -- cowsay "Hello, World!"`（临时安装 `cowsay` 并执行它）。

`npm exec` 命令提供了一种便捷的方式来执行 npm 包中的命令，无论它们是全局安装的、项目本地安装的，还是即时下载执行的。这在开发过程中提高了效率，尤其是在处理多个项目和依赖时。

## 什么是 npx？

npx 是随 Node.js 安装附带的另一个指令，可以更方便的调用 Node.js 生态中的包 (通常是一些 Node CLI 工具)，

npx 解决的是一些比较细节方面的需求，例如：

1. 用于简化在终端中对 **node_modules** 下 `.bin` 文件的直接执行。
2. 使用某个全局命令行工具时候，下载使用完就自动删除，避免污染全局环境。

### 简化终端中对 node_modules/.bin 目录下可执行文件的调用

以 Taro 开发框架为例，如果在终端通过 `taro` 命令编译代码，可在项目内部安装 `taro cli`，并进入项目根目录运行：

```sh
node_modules/.bin/taro build --type weapp
```

如果你只是想要在终端临时执行命令，而并不想把命令配置到 `package.json` 的 `scripts` 字段下，这时可以在终端通过 `npx` 进行简化

```sh
npx taro build --type weapp
# 等效于: node_modules/.bin/taro build --type weapp
```

### 避免污染全局环境

npx 的另外一个作用是过多的全局命令行工具避免污染全局环境。

有很多框架的上手教程里会使用 `npx` 来下载脚手架并初始化项目，它们的意思其实是：

> 如果你只是下个 demo 玩一玩的话，就不污染全局环境给你添麻烦了。

例如下面的 `npx` 命令，会下载 `create-react-app` 并用其初始化 `my-app` 项目，用完就将 `create-react-app` 删除。

```sh
npx create-react-app my-app
```

### npx 执行命令和 package.json/script 执行命令的区别

- 相同点：都是先从 `node_modules/.bin` 路径下寻找执行文件，然后再从全局寻找命令
- 不同点：
  - 对于 `npx`，当局部和全局都没有找到执行命令会下载安装然后使用。
  - 对于 package.json 下 `scripts` 字段配置的命令，**如果没有找到就报错了。**
