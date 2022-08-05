# 前端工程化：前置知识<!-- omit in toc -->

- [Node 版本管理：nvm](#node-版本管理nvm)
  - [windows](#windows)
    - [nvm-windows 安装](#nvm-windows-安装)
    - [常用命令](#常用命令)
    - [使用淘宝镜像](#使用淘宝镜像)
    - [windows 下 npm 全局包设置](#windows-下-npm-全局包设置)
    - [nrm 管理 npm 镜像](#nrm-管理-npm-镜像)
  - [MacOS](#macos)
    - [第一步：安装](#第一步安装)
    - [第二步：设置 nvm 的环境变量](#第二步设置-nvm-的环境变量)
    - [MacOS 下 常用 nvm 命令](#macos-下-常用-nvm-命令)
    - [M1 芯片 Mac 管理 `v14` 及以下的老版本 Node](#m1-芯片-mac-管理-v14-及以下的老版本-node)
    - [Node 被安装在哪里？](#node-被安装在哪里)
    - [MacOS：在多环境中，npm 该如何使用呢？](#macos在多环境中npm-该如何使用呢)
- [包管理：npm](#包管理npm)
  - [基础命令](#基础命令)
  - [npm init 创建模块](#npm-init-创建模块)
  - [npm set 设置环境变量](#npm-set-设置环境变量)
  - [npm search 搜索模块](#npm-search-搜索模块)
  - [npm list 查看模块](#npm-list-查看模块)
  - [npm install 安装模块](#npm-install-安装模块)
  - [npm uninstall 卸载模块](#npm-uninstall-卸载模块)
  - [npm update 更新模块](#npm-update-更新模块)
  - [npm run 执行脚本](#npm-run-执行脚本)
  - [npm publish 发布模块](#npm-publish-发布模块)
  - [npm-link](#npm-link)
  - [npm 网络问题](#npm-网络问题)
    - [npm 镜像](#npm-镜像)
    - [镜像设置](#镜像设置)
    - [node-gyp](#node-gyp)
    - [node-sass](#node-sass)
    - [Node 版本与 node-sass 版本不兼容](#node-版本与-node-sass-版本不兼容)
    - [npm 安装失败后重新安装](#npm-安装失败后重新安装)
    - [总结](#总结)
- [npx](#npx)
  - [用于简化在终端中对 node_modules 下 .bin 文件的直接执行](#用于简化在终端中对-node_modules-下-bin-文件的直接执行)
  - [避免污染全局环境](#避免污染全局环境)
  - [npx 执行命令和 package.json/script 执行命令的区别](#npx-执行命令和-packagejsonscript-执行命令的区别)
- [面试官：听说你对 package.json 很熟？](#面试官听说你对-packagejson-很熟)
  - [基础版的 package.json](#基础版的-packagejson)
  - [scripts（快捷脚本）](#scripts快捷脚本)
  - [dependencies & devDependencies（项目依赖）](#dependencies--devdependencies项目依赖)
  - [main（主要入口）](#main主要入口)
  - [bin（自定义命令）](#bin自定义命令)
  - [package.json 和 package-lock.json 有哪些区别和作用？](#packagejson-和-package-lockjson-有哪些区别和作用)
  - [npm 与 yarn 对 peerDependencies 处理的差异](#npm-与-yarn-对-peerdependencies-处理的差异)
- [实现一个简易的 npm install](#实现一个简易的-npm-install)
  - [依赖分析](#依赖分析)
  - [解决版本冲突](#解决版本冲突)
  - [解决循环依赖](#解决循环依赖)
  - [依赖分析和下载分离](#依赖分析和下载分离)
  - [全局缓存](#全局缓存)
- [pnpm](#pnpm)

## Node 版本管理：nvm

### windows

#### nvm-windows 安装

下载 [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)，下载完成，解压文件之后，双击进行安装即可。

安装完成，在命令行输入：`nvm v`，查看到对应的版本号，说明 nvm 安装成功了。

#### 常用命令

|         命令          |                            功能                            |
| :-------------------: | :--------------------------------------------------------: |
|  nvm list available   | 列出所有远程服务器的 nodejs 版本（官方 node version list） |
|  nvm install latest   |                   安装最新的 nodejs 版本                   |
|  nvm install 12.18.1  |                   安装对应的 nodejs 版本                   |
|    nvm use 12.18.1    |                   使用对应的 nodejs 版本                   |
| nvm uninstall 12.18.1 |                   卸载对应的 nodejs 版本                   |
|       nvm list        |                 列出已经安装的 nodejs 版本                 |

更多命令在命令行输入 `nvm` 即可查看。

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

#### nrm 管理 npm 镜像

**全局安装 nrm：**

```sh
npm install nrm -g
```

安装完成后，输入命令 `nrm ls`，可以看到默认的 6 个源（带 `*` 号的为当前使用的源）

```sh
* npm ---- https://registry.npmjs.org/
  cnpm --- http://r.cnpmjs.org/
  taobao - https://registry.npm.taobao.org/
  nj ----- https://registry.nodejitsu.com/
  npmMirror  https://skimdb.npmjs.com/registry/
  edunpm - http://registry.enpmjs.org/
```

输入 `nrm use taobao`，即切换 registry 到 taobao，即可使用淘宝的源进行下载了。

**nrm 常用命令：**

|              命令               |                     功能                      |
| :-----------------------------: | :-------------------------------------------: |
|             nrm ls              |        查看所有配置好的源以及对应名称         |
| nrm add xxx <http://npm.xxx.cn> | 添加源，xxx 是自定义名称，后面是源的 url 地址 |
|           nrm del xxx           |                 删除对应的源                  |
|          nrm test xxx           |   测试源的速度，不加名称，测试所有源的速度    |
|           nrm use xxx           |         切换源，即可使用对应名称的源          |

更多命令在命令行输入 `nrm` 即可查看。

### MacOS

#### 第一步：安装

**homebrew 安装：**

```sh
brew install nvm
```

**[脚本直接安装](https://github.com/nvm-sh/nvm)：**

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
```

#### 第二步：设置 nvm 的环境变量

安装好 nvm 后，需要将环境变量写入我们的 shell 配置文件中。

将以下环境变量脚本 copy 进 shell 配置文件中：`vim ~/.zshrc`

```sh
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

至此 nvm 已经安装好，可以尝试在命令行中输入 `nvm`，你可以看到 nvm 已经正常工作了。

#### MacOS 下 常用 nvm 命令

- **`nvm ls-remote`：** 列出所有可安装的版本。

- **`nvm install <version>`：** 安装指定的版本，例如 `nvm install v8.14.0`。

- **`nvm uninstall <version>`：** 卸载指定的版本。

- **`nvm ls`：** 列出所有已经安装的版本。

- **`nvm use <version>`：** 切换使用指定的版本。

- **`nvm current`：** 显示当前使用的版本。

- **`nvm alias default <version>`：** 设置默认 node 版本。

- **`nvm run 4.2.2 --version`：** 在当前终端的子进程中运行特定版本的 node。

- **`nvm deactivate`：** 解除当前版本绑定：

  > nvm 默认是不能删除被设定为 default 版本的 node，特别是只安装了一个 node 的时候，这个时候我们需要先解除当前版本绑定，然后再使用 `nvm uninstall <version>` 删除。

#### M1 芯片 Mac 管理 `v14` 及以下的老版本 Node

**低版本的 Node 并不是基于 `arm64` 架构的，不适配 `M1` 芯片**。

在终端中，输入：

```sh
arch -x86_64 zsh
```

通过这个命令可以让 shell 运行在 Rosetta2 下。

之后可以通过 `nvm install v12` 来安装低版本 Node。

> 在此之后，可以不用在 Rosetta2 中就可以使用安装的可执行文件，也就是说，可以将 `Node v15` 与其他节点版本互换使用。

#### Node 被安装在哪里？

在终端我们可以使用 `which node` 来查看我们的 Node 被安装到了哪里，这里终端打印出来的地址其实是你当前使用的 Node 版本快捷方式的地址。

```sh
/Users/你的用户名/.nvm/versions/node/v10.13.0/bin/node
```

如果你想查看所有 Node 版本的安装文件夹，我们可以在**访达**中使用快捷键 `Command+Shift+G` 输入 **`/Users/你的用户名/.nvm/versions`** 地址就可以看到。

> **.nvm** 是个隐藏文件夹在**访达**中默认是不显示隐藏文件夹，显示隐藏文件的快捷键是 `Command+Shift+.`，关闭也是这个快捷键。

#### MacOS：在多环境中，npm 该如何使用呢？

每个版本的 Node 都会自带一个不同版本的 npm，可以用 `npm -v` 来查看 npm 的版本。全局安装的 npm 包并不会在不同的 `Node` 环境中共享，因为这会引起兼容问题。

它们被放在了不同版本的目录下，例如 **`~/.nvm/versions/node/<version>/lib/node_modules</version>`** 这样的目录。这刚好也省去我们在 Linux 中使用 `sudo` 的功夫了。因为这是用户的主文件夹，并不会引起权限问题。

但问题来了，我们安装过的 `npm` 包，都要重新再装一次？幸运的是，我们有个办法来解决我们的问题，运行下面这个命令，可以从特定版本导入到我们将要安装的新版本 Node：

```sh
nvm install v5.0.0 --reinstall-packages-from=4.2
```

## 包管理：npm

### 基础命令

- **查看 `npm` 的版本**： `npm -v`
- **查看各个命令的简单用法**： `npm -l`
- **查看 `npm` 命令列表**： `npm help`
- **查看 `npm` 的配置**： `npm config list -l`

### npm init 创建模块

尾缀带 `-f`（代表 force）、`-y`（代表 yes）

### npm set 设置环境变量

```sh
npm set init-author-name 'my name jerry'
npm set init-author-email '12345@qq.com'
npm set init-author-url 'http://yourdomain.com'
npm set init-license 'MIT'

# 设置代理
npm config set proxy http://server:port
npm config set https-proxy http://server:port

# 删除代理
npm config delete proxy
npm config delete https-proxy
```

执行了以上的修改，此时 Package.json 并没有发生变化

```sh
# 设置后执行 init 才是真正修改成功
npm init
```

### npm search 搜索模块

```sh
npm search <搜索词> [-g]
```

`npm search` 命令用于搜索 npm 仓库，它后面可以跟字符串，也可以跟正则表达式。

### npm list 查看模块

```sh
# 当前项目安装的所有模块
npm list

# 列出全局安装的模块 带上[--depth=0] 不深入到包的支点 更简洁
npm list -g --depth=0

# 列出需要升级的全局包 包括 npm 自己
npm outdated -g
```

### npm install 安装模块

```sh
# 读取 package.json 里面的配置单安装
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

### npm uninstall 卸载模块

```sh
# 卸载当前项目或全局模块
npm uninstall <name> [-g]
# eg: npm uninstall gulp --save-dev
```

卸载后，你可以到 **`/node_modules/`** 目录下查看包是否还存在

### npm update 更新模块

```sh
# 升级当前项目或全局的指定模块
npm update <name> [-g]
# eg: npm update express
```

### npm run 执行脚本

Package.json 的 `scripts` 字段，可以用于指定脚本命令，供 npm 直接调用。`npm run` 会创建一个 Shell，执行指定的命令。

1. **两个命令简写**：**`start` 和 `test` 属于特殊命令，可以省略 `run`，其余的都得带上 `run`。**

2. **可配置参数**：格式是加上两个连词线（--）

3. **内部变量：**

    ```js
    {
      "name": "npm_test",
      "version": "1.0.0",
      "config": {
        "reporter": "xunit"
      },
      "script":{
        "bundle": "mkdir -p build/$npm_package_version/",
        // $npm_package_version 读的是外层 "version" 的值，同理 $npm_package_name 读的是外层 "name" 的值
        "test": "mocha test/ --reporter $npm_package_config_reporter"
        // $npm_package_config_reporter 读的是 "config" 里的 "reporter"
      }
    }
    ```

4. **`pre-` 和 `post-` 两个钩子：**

```sh
# 因为有定义了两个钩子 pretest、posttest
npm run test
# 所以先执行 npm run pretest
# 然后执行 npm run test
# 最后执行 npm run posttest
```

### npm publish 发布模块

```sh
# 未注册 申请注册一个用户 直接在 https://www.npmjs.com/ 注册一样
npm adduser
# 执行后 填写几个问题 Username、Password、Email

#已注册
npm login

#发布
npm publish
```

### npm-link

使用 `npm link` 能够避免重复且繁琐的打包发布操作，给开发调试带来便捷，而且使用方法简单。

假设你维护的下游业务项目叫做 app，上游的依赖叫做 dep，那么要想做到 **「dep 一改动，app 就能同步更新」**，只需要这样：

```sh
# 1. 在 dep 所在路径执行
npm link

# 2. 在 app 所在路径执行
npm link dep
```

这样就形成了 app 与 dep 之间基本的「链接」关系。只要进入 app 的 `node_modules` 查看一下，不难发现 npm 其实就是替你建立了一个操作系统的「快捷方式」（软链接）跳到 dep 下而已。

在存在多个互相依赖的包的时候，手动维护这个链接关系非常麻烦而且容易出错，这时候你可以用社区的 `yarn workspace` 或 Lerna 来自动帮你管理这些包。

**解除链接：**

```sh
# 1. 在 dep 所在路径执行，这样本地的 dep 包模块就解除了，其他项目的软连接也失效了。
npm unlink dep

# 2. 在 app 所在路径执行，这样 app 里就解除了 dep 模块的软连接
npm unlink dep
```

### npm 网络问题

#### npm 镜像

- **原镜像**：<https://registry.npmjs.org/>
- **淘宝镜像**：<https://registry.npm.taobao.org/>

#### 镜像设置

```js
npm config set registry https://registry.npm.taobao.org/
```

手动设置不够灵活推荐使用 npm 镜像管理工具 nrm

#### node-gyp

有了 nrm 切换到淘宝镜像上，安装速度会明显加快，但是遇上安装的模块**依赖了 C++ 模块**那就坑爹了。在安装过程中会隐式安装 node-gyp，node-gyp 可编译这些依赖 C++ 模块的模块。

那么问题来了，node-gyp 在首次编译时会依赖 Node 源码，所以又悄悄去下载 Node。**虽然在前面已设置了淘宝镜像，但是在这里一点卵用都没有**。这样又因为国内网络环境的原因，再次遇上安装过慢或安装失败的情况。

还好 `npm config` 提供了一个参数 `disturl`，它可设置 Node 镜像地址，当然还是将其指向国内的淘宝镜像。这样又能爽歪歪安装这些依赖 C++ 模块的模块了。

```js
npm config set disturl https://npm.taobao.org/mirrors/node/
```

#### node-sass

> dart-sass 比 node-sass 更香

安装 node-sass 时，在 install 阶段会从 Github 上下载一个叫 binding.node 的文件，而 GitHub Releases 里的文件都托管在 **s3.amazonaws.com** 上，这个网址被 **Q** 了，所以安装不了。

然而办法总比困难多，从 node-sass 的官方文档中可找到一个叫 `sass_binary_site` 的参数，它可设置 sass 镜像地址，毫无疑问还是将其指向国内的淘宝镜像。这样又能爽歪歪安装 node-sass 了。

```js
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
```

其实还有好几个类似的模块，统一设置方便安装。以下是常用的几个模块镜像地址配置，请收下！

分别是：`Sass`、`Sharp`、`Electron`、`Puppeteer`、`Phantom`、`Sentry`、`Sqlite`、`Python`。

**镜像地址配置：**

```sh
# npm config set <name> <url> 一键复制，永久使用。特别注意，别漏了最后面的 / ,带 / 的话才能拼成一个完整的镜像路径，否则可能拼接路径失败
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
npm config set sharp_dist_base_url https://npm.taobao.org/mirrors/sharp-libvips/
npm config set electron_mirror https://npm.taobao.org/mirrors/electron/
npm config set puppeteer_download_host https://npm.taobao.org/mirrors/
npm config set phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs/
npm config set sentrycli_cdnurl https://npm.taobao.org/mirrors/sentry-cli/
npm config set sqlite3_binary_site https://npm.taobao.org/mirrors/sqlite3/
npm config set python_mirror https://npm.taobao.org/mirrors/python/
```

如果有条件，建议把这些镜像文件搬到自己或公司的服务器上，将镜像地址指向自己的服务器即可。在公司内网搭建一个这样的镜像服务器，一直安装一直爽。

```sh
npm config set electron_mirror https://yyyxxx/mirrors/electron/
```

**源码分析：**

以经常卡住的 node-sass 为例，下面是坑爹货 **`node-sass/lib/extensions.js`** 的源码部分，可看出它会默认走 GitHub Releases 的托管地址，上面也分析过原因，在这里就不重复了。

```js
function getBinaryUrl() {
  const site =
    getArgument('--sass-binary-site') ||
    process.env.SASS_BINARY_SITE ||
    process.env.npm_config_sass_binary_site ||
    (pkg.nodeSassConfig && pkg.nodeSassConfig.binarySite) ||
    'https://github.com/sass/node-sass/releases/download'
  const result = [site, 'v' + pkg.version, getBinaryName()].join('/')
  return result
}
```

#### Node 版本与 node-sass 版本不兼容

node-sass 版本兼容性好差，必须与 Node 版本对应使用才行，详情请参考 `node-sass-version-association`，复用官方文档的版本对照表，如下。

| NodeJS  | Minimum node-sass version | Node Module |
| :-----: | :-----------------------: | :---------: |
| Node 14 |           4.14+           |     83      |
| Node 13 |           4.13+           |     79      |
| Node 12 |           4.12+           |     72      |
| Node 11 |           4.10+           |     67      |
| Node 10 |           4.9+            |     64      |
| Node 8  |          4.5.3+           |     57      |

假如本地使用 nvm 或 n 进行 Node 版本管理，并且已切换了 Node 版本，在安装过程中可能会出现 **`Windows/OS X/Linux 64-bit with Node.js 12.x`** 这样的提示

这是因为 node-sass 版本和 Node 版本是关联的(看上面的表格)，修改 Node 版本后在全局缓存中匹配不到对应的 **`binding.node`** 文件而导致安装失败。根据错误提示，清理 npm 缓存且重新安装即可，解决办法如下。

```sh
npm cache clean -f
npm rebuild node-sass
```

#### npm 安装失败后重新安装

有可能无权限删除已安装的内容，导致重新安装时可能会产生某些问题，建议将 node_modules 全部删除并重新安装。

推荐使用 `rimraf` 删除 node_modules，一个 Node 版的 `rm -rf` 工具。

```sh
npm i -g rimraf
```

在项目的 `package.json` 中加入 `npm scripts` 让 `rimraf` 常驻。三大操作系统通用，非常推荐使用。

```js
{
  "scripts": {
    "reinstall": "rimraf node_modules && npm i"
  }
}
```

#### 总结

**npm** 镜像问题的坑确实很多，归根到底还是网络环境导致的。当然这些问题也阻碍不了乐于探索的我们，办法总比困难多，坚持下去始终能找到解决方式。

还有一个坑是一些小众 npm 包存在淘宝源同步不及时的情况，这时候要到淘宝 npm 手动 `sync` 一下这个 npm 包

通过 web 方式来同步: [/sync/connect](https://npm.taobao.org/sync/connect)

```sh
open https://npm.taobao.org/sync/connect
```

## npx

和 nvm 和 nrm 不同的是，npx 解决的是一些比较细节方面的需求，例如：

1. 用于简化在终端中对 **node_modules** 下 **.bin** 文件的直接执行

2. 使用某个全局命令行工具时候，下载使用完就自动删除，避免污染全局环境

### 用于简化在终端中对 node_modules 下 .bin 文件的直接执行

**🌰：** Taro 是一个多端小程序开发框架，如果在终端通过 `taro` 命令编译代码，可在项目内部安装 `taro cli`，并进入项目根目录运行:

```sh
node_modules/.bin/taro build --type weapp
```

如果你只是想要在终端临时执行命令，而并不想把命令配置到 `package.json` 的 `script` 字段下，这时可以在终端通过 `npx` 进行简化

```sh
npx taro build --type weapp
# 等效于: node_modules/.bin/taro build --type weapp
```

### 避免污染全局环境

npx 的另外一个作用是过多的全局命令行工具避免污染全局环境。

有很多框架的上手教程里会使用 `npx` 来下载脚手架并初始化项目，它们的意思其实是：

> “如果你只是下个 demo 玩一玩的话，就不污染全局环境给你添麻烦了”

例如下面的 `npx` 命令，会下载 `create-react-app` 并用其初始化 `my-app` 项目, 用完就将 `create-react-app` 删除。

```sh
npx create-react-app my-app
```

### npx 执行命令和 package.json/script 执行命令的区别

- 相同点：都是先从 `node_modules/.bin` 路径下寻找执行文件，然后再从全局寻找命令

- 不同点：
  - 对于 `npx`，当局部和全局都没有找到执行命令会下载安装然后使用
  - 对于 `package.json` 下 `script` 字段配置的命令，**如果没有找到就报错了。**

## [面试官：听说你对 package.json 很熟？](https://zhuanlan.zhihu.com/p/384484213)

### 基础版的 package.json

当我们新建一个名称为 my-test 的项目时，使用 `yarn init -y` 或 `npm init -y` 命令后，在项目目录下会新增一个 package.json 文件，内容如下：

```json
{
  "name": "my-test", # 项目名称
  "version": "1.0.0", # 项目版本（格式：大版本.次要版本.小版本）
  "description": "", # 项目描述
  "main": "index.js", # 入口文件
  "scripts": { # 指定运行脚本命令的 npm 命令行缩写
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [], # 关键词
  "author": "", # 作者
  "license": "ISC" # 许可证
}
```

### scripts（快捷脚本）

`scripts` 字段是 `package.json` 中的一种元数据功能，它接受一个对象，对象的属性为可以通过 `npm run` 运行的脚本，值为实际运行的命令（通常是终端命令），如：

```json
"scripts": {
  "start": "node index.js"
}
```

> 更多内容：见上文 [npm scripts](#npm-run-执行脚本)

### dependencies & devDependencies（项目依赖）

- **`dependencies` 字段指定了项目运行所依赖的模块**：可以理解为我们的项目在生产环境运行中要用到的东西。比如说我们常用的 antd 只能哪个代码块就会用到里面的组件，所以要放到 `dependencies` 里面去。

- **`devDependencies` 字段指定了项目开发所需要的模块：** 开发环境会用到的东西，比如说 webpack。我们打包的时候会用到，但是项目运行的时候却用不到，所以只需要放到 `devDependencies` 中去就好了。

### main（主要入口）

- `main` 字段是 `package.json` 中的另一种元数据功能，它可以用来指定加载的入口文件。假如你的项目是一个 npm 包，当用户安装你的包后，`require('第三方模块')` 返回的是 `main` 字段中所列出文件的 `module.exports` 属性。

- 当不指定 `main` 字段时，默认值是模块根目录下面的 `index.js` 文件。

### bin（自定义命令）

<!-- TODO -->

<!-- 很多包都有一个或多个他们想要安装到 PATH 中的可执行文件。npm 使这变得非常简单（实际上，它使用此功能来安装“npm”可执行文件。）

要使用它，请 `bin` 在 package.json 中提供一个字段，它是命令名到本地文件名的映射。在安装时，npm 会将该文件符号链接到 `prefix/bin` 全局安装或 `./node_modules/.bin/` 本地安装。

给大家看看我自己做一个简单的 demo：

{
  "name": "react-cli-library",
  "version": "0.0.2",
  "description": "",
  "bin": {
    "react-cli": "./bin/index.js"
  },
}

我的名称叫做react-cli-library。

所以，`npm i react-cli-library`

![](https://pic2.zhimg.com/80/v2-6777e0ac0b1d8514f8e755de0c05e77d_1440w.jpg)

安装完成之后，执行react-cli就会有一些命令，他会执行我的根目录底下`./bin/index.js`这个文件。

![](https://pic2.zhimg.com/80/v2-90bb4956b588876b561e5dfaf0f8d629_1440w.jpg)

虽然我的项目名称是：`react-cli-library`。但是我执行的内容却是`react-cli`，这个取决于bin的内容 -->

### package.json 和 package-lock.json 有哪些区别和作用？

简单的说，同一个 package.json 在两次 install 的时候安装的依赖可能不一样。 但是 lock 文件可以保证不管几次安装，安装的依赖都是一样的。

下面是一个 package.json 简单示例

```json
{
  "name": "test-project",
  "version": "1.0.0",
  "description": "A test project",
  "author": "xxx",
  "scripts": {},
  "dependencies": {
    "vue": "^2.6.0",
    "cross-env": "~5.2.0",
    "element-ui": "*",
    "axios": "18.0.0"
  },
  "devDependencies": {
  }
}
```

我们看上述文件的依赖版本有四种：

- `~` 开头的版本会匹配最近的小版本依赖包，比如 ~1.2.3 会匹配所有 1.2.x 版本，但是不包括 1.3.0
- `^` 开头的版本会匹配最新的次版本依赖包，比如 ^1.2.3 会匹配所有 1.x.x 的包，包括 1.3.0，但是不包括 2.0.0
- `*` 这意味着安装最新版本的依赖包
- 不带以上前缀的就是下载固定的版本号

当我们首次执行 `npm install` 的时候会根据上述规则去下载对应版本的依赖包，然后生成 package-lock.json 文件，这个文件记录了实际下载的版本，这样当我们把项目提交到 git 上后，其他人 clone 后执行 `npm install`，由于存在 package-lock.json 文件，安装的时候会根据 package-lock.json 文件声明的版本去安装，**这样就能保证每个人安装的依赖包版本都是一样的了**。

- package.json 仅会**申请依赖包及其版本范围**。而 lock 文件会申明具体的请求地址，具体的版本号，甚至 sha 值（怕别人修改已有包）。
- lock 文件记录的依赖信息比 package.json 更全。lock 文件，是 package.json 项目无法完整描述依赖树的另一个补充文件。

为什么要保证版本一样呢，首先依赖包本身升级可能是没有问题的，但是可能会与现有代码库有兼容问题，也可能与其他依赖包有兼容问题，所以保证每个环境的版本一致是有必要的。

如需升级需要经过测试在将 package-lock.json 提交到代码库，这样其他人重新拉取代码执行 npm install 就完成依赖的升级了。

**💥 小知识：**

起初。是只有 package.json 的。并且 package.json 是用来描述当前的 npm 包信息的。这些信息保护当前 npm 包的名称，版本，作者，仓库，issue 的地址。还有入口文件 main 等。

值得注意的是。刚开始 npm 只是 node 的包管理平台。后来打败了其它的包管理工具，逐步**也成为了前端的包管理平台**。因为前端代码在浏览器上运行，和 node 在服务器上运行的差异。package.json 也出现了 browser 入口。期间还有提议 module 和 esnext 当成 es6 的入口，不过最终 node 和 webpack 把 **module** 作为 esModule 的入口文件。

还有 npm 本来是用 javascript 写代码的。typescript 出来后，package.json 出了一个叫 types 的字段。来指定类型入口文件。

也有一些工具如 babel，husky，允许用户将配置写到 package.json 中。这说明 package.json 是**包的信息记录文件**。除了官方的信息还有其它社区开源库也用它来记录信息。并且随着时间的发展，记录信息的字段也越来越多。

### [npm 与 yarn 对 peerDependencies 处理的差异](https://zhuanlan.zhihu.com/p/237532427)

1. 如果希望供 npm 使用，且你只是一个 npm 包而不是依赖链终点的实际 app，那么不要“帮用户”安装 peer 依赖，而是在自己的 package.json 中加上相同的 peerDependencies，请最终用户来满足这些依赖。

2. 如果仅供 yarn 使用，你可以放心地帮用户把 peer 依赖全部搞定，保持对用户封装效果，减少用户的使用成本。

3. 由于这种情况出现的概率其实很小，且 npm 7.x 会解决这一问题，因此推荐帮用户装上 peer 依赖，真出了意外可以推荐用户安装 npm 7.x。

## [实现一个简易的 npm install](https://zhuanlan.zhihu.com/p/373511155)

### 依赖分析

我们首先梳理了不同环境（浏览器、node、跨端引擎）对于第三方包的处理方式不同，浏览器需要打包，node 是运行时查找，**跨端引擎也是运行时查找**，但是用自己实现的一套机制。

通过分析项目根目录的 `bundle.json` 作为入口，下载每一个依赖，分析 `bundle.json`，然后继续下载每一个依赖项，**递归这个过程**。这就是依赖分析的过程。

但是这种思路存在问题，比如：版本冲突怎么办？循环依赖怎么办？版本冲突时的冗余下载？多个项目的公共依赖的重复下载？

### 解决版本冲突

版本冲突是多个包依赖了同一个包，但是依赖的版本不同，这时候就要选择一个版本来安装，我们可以简单的把规则定为使用高版本的那个。

### 解决循环依赖

包之间是可能有循环依赖的（这也是为什么叫做依赖图，而不是依赖树），这种问题的解决方式就是记录下处理过的包，如果同个版本的包被分析过，那么久不再进行分析，直接拿缓存。

### 依赖分析和下载分离

版本冲突时会下载版本最高的包，但是这时候之前的低版本的包已经下载过了，那么就多了没必要的下载，能不能把这部分冗余下载去掉。

多下载了一些低版本的包的原因是我们在依赖分析的过程中进行了下载，那么能不能依赖分析的时候只下载 bundle.json 来做分析，分析完确定了依赖图之后再去批量下载依赖？

这样我们在依赖分析的时候只下载一个 bundle.json 到临时目录，分析依赖、解决冲突，确定了依赖图之后，再去批量下载，最后要把临时目录删除。

### 全局缓存

为了避免多个项目的公共依赖的重复下载，我们实现了全局缓存，先下载到全局目录，然后再复制到本地。

## pnpm

- [Pnpm: 最先进的包管理工具](https://zhuanlan.zhihu.com/p/404784010)
- [pnpm 是凭什么对 npm 和 yarn 降维打击的](https://zhuanlan.zhihu.com/p/549189023)
