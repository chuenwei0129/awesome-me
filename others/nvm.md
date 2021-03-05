# NVM<!-- omit in toc -->

- [Windows](#windows)
  - [nvm-windows 安装](#nvm-windows-安装)
  - [nvm-windows 常用命令](#nvm-windows-常用命令)
  - [nvm-windows 使用淘宝镜像](#nvm-windows-使用淘宝镜像)
  - [设置 npm 全局包](#设置-npm-全局包)
  - [nrm 的安装](#nrm-的安装)
  - [nrm 常用命令](#nrm-常用命令)
- [Mac](#mac)
  - [Homebrew 安装 Nvm](#homebrew-安装-nvm)
  - [直接安装 Nvm](#直接安装-nvm)
    - [安装 Nvm](#安装-nvm)
    - [设置 Nvm 的环境变量](#设置-nvm-的环境变量)
  - [如何安装 `v14` 及以下的老版本 Node](#如何安装-v14-及以下的老版本-node)
  - [一些常见的 nvm 命令](#一些常见的-nvm-命令)
  - [node 被安装在哪里](#node-被安装在哪里)
  - [在多环境中，npm 该如何使用呢？](#在多环境中npm-该如何使用呢)

## Windows

### nvm-windows 安装

下载 [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)，下载完成，解压文件之后，双击进行安装即可。

安装完成，在命令行输入：`nvm v`，查看到对应的版本号，说明 nvm 安装成功了。

### nvm-windows 常用命令

|         命令          |                            功能                            |
| :-------------------: | :--------------------------------------------------------: |
|  nvm list available   | 列出所有远程服务器的 nodejs 版本（官方 node version list） |
|  nvm install latest   |                   安装最新的 nodejs 版本                   |
|  nvm install 12.18.1  |                   安装对应的 nodejs 版本                   |
|    nvm use 12.18.1    |                   使用对应的 nodejs 版本                   |
| nvm uninstall 12.18.1 |                   卸载对应的 nodejs 版本                   |
|       nvm list        |                 列出已经安装的 nodejs 版本                 |

更多命令在命令行输入 `nvm` 即可查看

### nvm-windows 使用淘宝镜像

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

### 设置 npm 全局包

解决 nvm 切换版本后，全局安装的包，需要重新安装一遍的问题，如下：

1. 设置 npm 全局包的安装路径，执行命令：`npm config set prefix "全局包安装路径"`
2. 配置环境变量：变量名为：`NPM_HOME`，变量值为：全局包安装路径
3. 在 path 中，在 `%NVM_SYMLINK%` 之前，添加 `%NPM_HOME%`

查看已经安装的全局包：`npm ls -g --depth=0`

### nrm 的安装

全局安装 nrm：

```sh
npm install nrm -g
```

安装完成后，输入命令 `nrm ls`，可以看到默认的 6 个源（带 \* 号的为当前使用的源）

```sh
* npm ---- https://registry.npmjs.org/
  cnpm --- http://r.cnpmjs.org/
  taobao - https://registry.npm.taobao.org/
  nj ----- https://registry.nodejitsu.com/
  npmMirror  https://skimdb.npmjs.com/registry/
  edunpm - http://registry.enpmjs.org/
```

输入 `nrm use taobao`，即切换 registry 到 taobao，即可使用淘宝的源进行下载了。

### nrm 常用命令

|             命令              |                     功能                      |
| :---------------------------: | :-------------------------------------------: |
|            nrm ls             |        查看所有配置好的源以及对应名称         |
| nrm add xxx http://npm.xxx.cn | 添加源，xxx 是自定义名称，后面是源的 url 地址 |
|          nrm del xxx          |                 删除对应的源                  |
|         nrm test xxx          |   测试源的速度，不加名称，测试所有源的速度    |
|          nrm use xxx          |         切换源，即可使用对应名称的源          |

更多命令在命令行输入 `nrm` 即可查看

## Mac

### Homebrew 安装 Nvm

```sh
brew install nvm
```

### 直接安装 Nvm

#### 安装 [Nvm](https://github.com/nvm-sh/nvm)

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
```

#### 设置 Nvm 的环境变量

安装好 `nvm` 后，需要将环境变量写入我们的 `shell` 配置文件中。

将以下环境变量脚本 `copy` 进 `shell` 配置文件中：`vim ~/.zshrc`

```sh
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

至此 `Nvm` 已经安装好，可以尝试在命令行中输入 `nvm`，你可以看到 `nvm` 已经正常工作了。

### 如何安装 `v14` 及以下的老版本 Node

低版本的 `node` 并不是基于 `arm64` 架构的，不适配 `M1` 芯片。

在终端中，输入：

```sh
arch -x86_64 zsh
```

通过这个命令可以让 `shell` 运行在 `Rosetta2` 下。

之后可以通过 `nvm install v12` 来安装低版本 `Node`。

在此之后，可以不用在 `Rosetta2` 中就可以使用安装的可执行文件，也就是说，可以将 `Node v15` 与其他节点版本互换使用。

### 一些常见的 nvm 命令

`nvm ls-remote` 列出所有可安装的版本

`nvm install <version>` 安装指定的版本，如 `nvm install v8.14.0`

`nvm uninstall <version>` 卸载指定的版本

`nvm ls` 列出所有已经安装的版本

`nvm use <version>` 切换使用指定的版本

`nvm current` 显示当前使用的版本

`nvm alias default <version>` 设置默认 `node` 版本

`nvm run 4.2.2 --version` 在当前终端的子进程中运行特定版本的 `node`

`nvm deactivate` 解除当前版本绑定

> `nvm` 默认是不能删除被设定为 `default` 版本的 `node`，特别是只安装了一个 `node` 的时候，这个时候我们需要先解除当前版本绑定，然后再使用 `nvm uninstall <version>` 删除

### node 被安装在哪里

在终端我们可以使用 `which node` 来查看我们的 `node` 被安装到了哪里，这里终端打印出来的地址其实是你当前使用的 `node` 版本快捷方式的地址。

```sh
/Users/你的用户名/.nvm/versions/node/v10.13.0/bin/node
```

如果你想查看所有 `node` 版本的安装文件夹，我们可以在 `访达（finder）` 中使用快捷键 `Command+Shift+G` 输入 `/Users/你的用户名/.nvm/versions` 地址就可以看到。`.nvm` 是个隐藏文件夹在 `访达（finder）` 中默认是不显示隐藏文件夹，在    下显示隐藏文件的快捷键是 `Command+Shift+.`，关闭也是这个快捷键。

### 在多环境中，npm 该如何使用呢？

每个版本的 `Node` 都会自带一个不同版本的 `npm`，可以用 `npm -v` 来查看 `npm` 的版本。全局安装的 `npm` 包并不会在不同的 `Node` 环境中共享，因为这会引起兼容问题。它们被放在了不同版本的目录下，例如 `~/.nvm/versions/node/<version>/lib/node_modules</version>` 这样的目录。这刚好也省去我们在 `Linux` 中使用 `sudo` 的功夫了。因为这是用户的主文件夹，并不会引起权限问题。

但问题来了，我们安装过的 `npm` 包，都要重新再装一次？幸运的是，我们有个办法来解决我们的问题，运行下面这个命令，可以从特定版本导入到我们将要安装的新版本 `Node`：

```sh
nvm install v5.0.0 --reinstall-packages-from=4.2
```
