# Mac 这种操作系统简直比 Siri 还智障所以就去写了个笔记<!-- omit in toc -->

***👀 TIPS: 二级标题可返回目录***

---

> ## 目录

- [给 Mac 硬件做健康检查](#给-mac-硬件做健康检查)
- [给 m1 芯片 Mac 重装系统](#给-m1-芯片-mac-重装系统)
- [Clash 代理](#clash-代理)
  - [Clash](#clash)
  - [机场](#机场)
  - [Terminal 使用代理](#terminal-使用代理)
  - [其他代理设置（补充）](#其他代理设置补充)
    - [git](#git)
    - [git clone ssh 如何走代理](#git-clone-ssh-如何走代理)
    - [npm](#npm)
- [macOS 中“安全性与隐私”没有允许任何来源](#macos-中安全性与隐私没有允许任何来源)
- [macOS DMG 安装后无法打开，提示损坏](#macos-dmg-安装后无法打开提示损坏)
- [Mac 下显示 / 隐藏文件](#mac-下显示--隐藏文件)
- [Homebrew 包管理](#homebrew-包管理)
  - [安装 Homebrew](#安装-homebrew)
    - [安装 ARM 版 Homebrew](#安装-arm-版-homebrew)
    - [跑题：为什么 ARM 版 Mac 要使用 /opt 路径？](#跑题为什么-arm-版-mac-要使用-opt-路径)
    - [安装 X86 版 Homebrew (可选)](#安装-x86-版-homebrew-可选)
    - [ARM 和 X86 版 Homebrew 的共存问题](#arm-和-x86-版-homebrew-的共存问题)
  - [Homebrew 的几个核心概念](#homebrew-的几个核心概念)
  - [Homebrew 搜索软件](#homebrew-搜索软件)
    - [使用命令搜索](#使用命令搜索)
    - [使用网页搜索](#使用网页搜索)
  - [Homebrew 常用命令](#homebrew-常用命令)
    - [安装卸载软件](#安装卸载软件)
    - [升级软件相关](#升级软件相关)
  - [检查 Homebrew 环境](#检查-homebrew-环境)
  - [管理后台软件](#管理后台软件)
  - [👀 Tips：访问应用官网](#-tips访问应用官网)
  - [垃圾清理相关](#垃圾清理相关)
    - [前置知识](#前置知识)
    - [清理未完成的下载](#清理未完成的下载)
    - [cleanup 工具](#cleanup-工具)
  - [用 Homebrew 来卸载](#用-homebrew-来卸载)
- [m1 查询硬盘写入](#m1-查询硬盘写入)
  - [安装 smartctl](#安装-smartctl)
  - [查看硬盘使用量](#查看硬盘使用量)
- [用自带工具快速判断 macOS 的网络质量](#用自带工具快速判断-macos-的网络质量)
- [更改启动台应用程序显示数目](#更改启动台应用程序显示数目)
- [macOS 软件清单](#macos-软件清单)
- [浏览器](#浏览器)
  - [为 Chrome 设置搜索引擎关键词](#为-chrome-设置搜索引擎关键词)
  - [浏览器插件](#浏览器插件)
  - [油猴脚本](#油猴脚本)
- [有用的链接](#有用的链接)

## [给 Mac 硬件做健康检查](#目录)

在使用 Mac 电脑的过程中，如果认为 Mac 可能存在硬件问题，[可以使用“Apple 诊断”来帮助确定可能存在故障的硬件组件](https://support.apple.com/zh-cn/HT202731)。

## [给 m1 芯片 Mac 重装系统](#目录)

m1 芯片的 Mac 进入恢复模式很简单，就是先关机，然后长按电源键一直按住不动，直到出现图中这个 `⚙️` 的图标就算进入恢复模式了。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/macos01.png)

选择“选项”，然后点按“继续”。

如果是已有用户的话，应该会弹出用户图标以及输入密码登录界面，要求输入这个用户的管理员密码，请照做。

如果系统要求输入之前在这台 Mac 上使用过的 Apple ID 和密码，请照做。

接下来会提示 Mac 需要激活，所以必须连接网线或者 WiFi，这个界面没有出现 WiFi 的选项，实际在右上角，点击图标后就可以选择 WiFi，连接成功后点击下一步。Mac 会自动转圈显示激活成功。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/macos02.jpg)

然后在这个界面会弹出熟悉的几个选项，这里先不要点击第二个重新安装 macOS 。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac08.jpg)

点击左上角的实用工具-终端。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac11.jpg)

输入 `resetpassword`， 回车。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac09.jpg)

在弹出的重设密码界面，不管显示啥不用去管，直接点击左上角的恢复助理-抹掉 Mac...

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac14.jpg)

弹出的抹掉 Mac 界面，继续点下面的**小蓝字**，抹掉 Mac...

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac04.jpg)

在弹出的警告图标选择抹掉 Mac 就可以了。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac12.jpg)

然后就是耐心得等待进度条加载完毕，就算抹掉成功了，不会太久。抹掉后可以看到和一开始的页面很像，这个页面就是提示激活 Mac，WiFi 图标还是右上角。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac03.jpg)

显示联网激活成功，点击下面的退出到恢复界面。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac10.jpg)

这个时候 Mac 就是干干净净的了，可以点击第二个选项开始重装系统了。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac06.jpg)

点击继续 Continue。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac13.jpg)

点击同意 Agree。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac05.jpg)

接下来就是就是纯粹的联网下载安装了。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac.jpg)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac07.jpg)

## [Clash 代理](#目录)

### Clash

- [Clash](https://github.com/Dreamacro/clash)：一个 Go 语言开发的多平台代理客户端
- [ClashX](https://github.com/yichengchen/clashX)：Clash 的一个简单轻量化的代理客户端
- [Clash for Windows](https://github.com/Fndroid/clash_for_windows_pkg)：Clash 的 Windows/macOS [跨平台可定制化的图形客户端](https://docs.cfw.lbyczf.com/)

### 机场

- <https://baicao.link/>

### Terminal 使用代理

> TIPS: Socks5 是一个代理协议，它在使用 TCP/IP 协议通讯的前端机器和服务器机器之间扮演一个中介角色，使得内部网中的前端机器变得能够访问 Internet 网中的服务器，或者使通讯更加安全。
>
> Socks5 代理工作在会话层，不要求应用程序遵循特定的操作系统平台，Socks5 代理只是简单地传递数据包，而不必关心是何种应用协议（比如 FTP、HTTP 和 NNTP 请求）。
> socks5 包含 https，https 又包含 http，socks5 代理工作在 osi 七层模型中的会话层（第五层），https/http 代理工作在 osi 七层模型的应用层（第七层）,所以说 socks 代理更加底层。

通过设置 http_proxy、https_proxy、all_proxy，可以让终端走指定的代理。

```sh
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890
export all_proxy=socks5://127.0.0.1:7890
```

> 7890 是 http 代理对应的端口，根据实际情况修改。

这里提供一个便捷脚本，里面包含打开、关闭功能：

```sh
function nogfw() {
    export http_proxy=http://127.0.0.1:7890
    export https_proxy=$http_proxy
    export all_proxy=socks5://127.0.0.1:7890
    echo -e "终端代理已开启。"
}

function gfw(){
    unset http_proxy https_proxy all_proxy
    echo -e "终端代理已关闭。"
}
```

通过 `nogfw` 启动代理，`gfw` 关闭代理。

接下来需要把脚本写入 `.zshrc`，`source ~/.zshrc` 就可以永久生效。

可以执行 `curl cip.cc` 验证

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/ip.png)

### 其他代理设置（补充）

#### git

```sh
# 设置
git config --global http.proxy 'socks5://127.0.0.1:7890'
git config --global https.proxy 'socks5://127.0.0.1:7890'
```

```sh
# 恢复
git config --global --unset http.proxy
git config --global --unset https.proxy
```

#### git clone ssh 如何走代理

打开 `~/.ssh/config`，如果没有这个文件，自己手动创建。

```sh
# 全局
# ProxyCommand nc -X 5 -x 127.0.0.1:1080 %h %p
# 只为特定域名设定
Host github.com
    ProxyCommand nc -X 5 -x 127.0.0.1:7890 %h %p
```

#### npm

```sh
# 设置
npm config set proxy http://127.0.0.1:7890
npm config set https-proxy http://127.0.0.1:7890
```

```sh
# 恢复
npm config delete proxy
npm config delete https-proxy
```

## [macOS 中“安全性与隐私”没有允许任何来源](#目录)

为了安全，macOS 新版本已经默认屏蔽未知开发者选项，需要用命令手动开启

```sh
sudo spctl --master-disable
```

如果以后想撤消它，则可以返回 Terminal 并运行以下命令：

```sh
sudo spctl --master-enable
```

## [macOS DMG 安装后无法打开，提示损坏](#目录)

网络下载应用被 Apple 添加隔离标识，终端输入命令解除即可：

```sh
# sudo xattr -r -d com.apple.quarantine

sudo xattr -r -d com.apple.quarantine <应用路径>

# 比如我装 M1 版本的语雀
sudo xattr -rd com.apple.quarantine /Applications/语雀.app
```

## [Mac 下显示 / 隐藏文件](#目录)

同 Windows 一样，macOS 会将重要文件隐藏起来，以防止意外删除这些文件而损坏系统。但是，有时候我们需要显示隐藏文件。则需要使用如下方法。

打开「启动台」，选择「终端」软件，输入以下命令，显示隐藏文件：

```sh
defaults write com.apple.finder AppleShowAllFiles Yes && killall Finder
```

如果需要不显示隐藏文件，则执行下面的命令：

```sh
defaults write com.apple.finder AppleShowAllFiles No && killall Finder
```

## [Homebrew 包管理](#目录)

### 安装 Homebrew

#### 安装 ARM 版 Homebrew

`ARM` 版 `Homebrew` 需要安装在 `/opt/homebrew` 路径下，早期的时候需要手动创建目录执行命令，目前使用 [🍺官网](https://brew.sh/index_zh-cn) 最新脚本不需要手动操作。

直接执行：

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

然后还需设置环境变量，具体操作步骤如图所示，一定要仔细阅读。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/homebrew.png)

#### 跑题：为什么 ARM 版 Mac 要使用 /opt 路径？

根据《文件系统层次结构标准》（Filesystem Hierarchy Standard，主要为 Linux 系统制定，但对具有共同 UNIX 基因的 macOS 也有参考价值）：

- `/usr/local` 目录用于系统管理员在本地安装软件。系统软件更新时，该目录应免于被覆盖。
- `/opt` 目录留作附加应用程序（add-on application）软件包的安装。安装在该目录下的软件包必须将其静态文件放置在单独的 `/opt/<package>` 或 `/opt/<provider>` 路径下。

历史上，`/usr/local` 主要用于放置在本地编译并另行安装的程序，避免和 `/usr` 下的系统自带版本冲突；而 `/opt` 则用于安装非系统自带的、第三方预先编译并发行的独立软件包。

**显然，在如今的 macOS 使用场景下，用户很少会需要自行编译软件包，`/usr/local` 和 `/opt` 的区分一定程度上已经成为名义上的了。Homebrew 启用 `/opt` 作为 ARM 版的安装路径，可能更多是出于确保与 `X86` 版相互区隔的考虑**

> TIPS: 其实，注意到在任何命令前增加 `arch -x86_64`，就可以以 X86 模式运行该命令。因此，运行：
>
> ```sh
>   arch -x86_64 $SHELL
> ```
>
> 就可以启动一个 X86 模式终端，使得之后运行的命令都在 X86 模式下运行。

#### 安装 X86 版 Homebrew (可选)

因为目前很多软件包没有支持 `ARM` 架构，我们也可以考虑使用 `x86` 版的 `Homebrew`。

在命令前面添加 `arch -x86_64`，就可以按 X86 模式执行该命令，比如：

```sh
arch -x86_64 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### ARM 和 X86 版 Homebrew 的共存问题

经过上面的步骤，系统中目前有了两个 `brew` 程序，即 X86 版的 `/usr/local/bin/brew` 和 ARM 版的 `/opt/homebrew/bin/brew`。**那么，当在终端中执行 `brew` 命令时，系统会以哪个为准呢？**

**当存在重名程序时，终端会按照重名程序在环境变量 `PATH` 中的先后顺序选择要执行的版本。**

由于之前配置 `~/.zshrc` 时，将 ARM 版 Homebrew 的路径放在了 `PATH` 的最前面，因此执行 `brew` 时，位于 `/opt/homebrew/bin/brew` 的 ARM 版将被优先运行。如果要运行 X86 版，则需要手动输入完整路径 `arch -x86_64 /usr/local/bin/brew`。

如果觉得输入这么长的命令过于麻烦，可以在 `~/.zshrc` 中为两个版本分别设置简称（alias）：

```sh
alias abrew='/opt/homebrew/bin/brew' # ARM Homebrew
alias ibrew='arch -x86_64 /usr/local/bin/brew' # X86 Homebrew
```

这样，执行 `abrew install <package>` 就可以调用 ARM 版 Homebrew 安装软件包，执行 `ibrew install <package>` 就可以调用 X86 版，从而不容易混淆。

**至于应该使用哪个版本的 Homebrew 安装软件包，需要区别考虑：**

对于命令行（CLI）程序：可以优先尝试使用 ARM 版 Homebrew 安装，保证获得针对新架构编译的版本，实现最佳的运行效果。但注意：

1. 有的软件包已经兼容新架构、但还没有发布相应的编译版，需要安装的过程中在本地编译，耗时会相对很长；
2. 如果软件包还没有兼容新架构，使用 ARM 版 Homebrew 安装会报错，此时可以换用 X86 版 Homebrew 安装。另外，值得一提的是，现在的 Homebrew 已再不需要额外使用 `--cask` 参数安装 Cask 程序，所以直接使用 `brew install maccy` 就好了。
3. 对于图形界面（GUI）程序，即通过 Homebrew Cask 安装的 .app 程序：对于这类软件，Homebrew 起的作用只是从官方渠道下载这些软件的安装包，然后安装到 `/Applications` 路径（及执行安装脚本，如果有）。因此无论其是否针对新架构优化，通过任一版本 Homebrew 都可以安装。考虑到日后维护方便，建议直接用 ARM 版 Homebrew 安装即可。

> **No.1 的小秘籍**

安装 homebrew 过程遇到解决不了的问题，先删除 `homebrew` 目录再重新运行脚本安装。

- x86 上安装目录： `/usr/local/Homebrew/`
- arm 上安装目录： `/opt/homebrew`

### Homebrew 的几个核心概念

|    词汇     |                                              含义                                              |
| :---------: | :--------------------------------------------------------------------------------------------: |
| formula (e) |                               安装包的描述文件，formulae 为复数                                |
|   cellar    |                                       安装好后所在的目录                                       |
|     keg     |                          具体某个包所在的目录，keg 是 cellar 的子目录                          |
|   bottle    | 预先编译好的包，不需要现场下载编译源码，速度会快很多；官方库中的包大多都是通过 bottle 方式安装 |
|     tap     |                        下载源，可以类比于 Linux 下的包管理器 repository                        |
|    cask     |                安装 macOS native 应用的扩展，你也可以理解为有图形化界面的应用。                |
|   bundle    |                                    描述 Homebrew 依赖的扩展                                    |

其中，最关键的是 `tap` 、`cask`，我们在后续会经常用到。

### Homebrew 搜索软件

很多时候，我们不知道自己想要的软件是否有，或者说具体的名字是什么，这个时候你有两种方式来完成搜索

#### 使用命令搜索

在命令行中，你可以直接使用 `brew search [关键词]` 来进行搜索

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/install.png)

输入你想要的关键词，来搜索即可得到结果。

> 在搜索时应当遵循宁可少字，不能错字的原则来搜索。

#### 使用网页搜索

除了使用命令行搜索以外，你可以使用网页端的搜索工具来辅助你进行搜索。在 Homebrew 的[官网](https://formulae.brew.sh/cask/)，你可以找到 casks 的链接，或者直接访问 <https://formulae.brew.sh/> 来进行搜索 formula。你只需要在界面的输入框中输入你要搜索的命令，然后就会出现对应的候选命令

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/search.png)

### Homebrew 常用命令

#### 安装卸载软件

1. `brew --version` 或者 `brew -v` 显示 brew 版本信息

2. `brew install <formula>` 安装指定软件

3. `brew uninstall <formula>` 卸载指定软件

4. `brew list` 显示所有的已安装的软件

5. `brew search text` 搜索本地远程仓库的软件，**已安装会显示绿色的勾**

6. `brew search /text/` 使用正则表达式搜软件

7. `brew info <formula>` 显示指定软件信息

8. `brew reinstall <formula>` 重新安装指定软件，先卸载后安装

9. `brew install <formula> --build-from-source` 源码安装指定软件，可以给定指定参数

10. `brew commands` 列出所有可用命令

#### 升级软件相关

1. `brew update` 自动升级 Homebrew （从 github 下载最新版本），**Homebrew 经常会在执行命令的时候触发更新**

2. `brew outdated` 检测已经过时的软件

3. `brew upgrade` 升级所有已过时的软件，即列出的以过时软件

4. `brew upgrade <formula>` 升级指定的软件

5. `brew pin <formula>` 禁止指定软件升级

6. `brew unpin <formula>` 解锁禁止升级

7. `brew upgrade --all` 升级所有的软件包，包括未清理干净的旧版本的包

8. `brew edit <formula>` 编辑软件，不会的情况下慎用

9. `brew tap` 列出本地资源仓库，其中 Homebrew 是默认仓库，其它都是第三方仓库

10. `brew tap <user/repo>` 添加[第三方仓库](https://docs.brew.sh/Taps)，命名的规则按照 github 来定的。

11. `brew untap <user/repo>` 删除仓库

12. `brew deps <formula>` 查看指定软件依赖于哪些软件

13. `brew uses <formula>` 查看指定软件被哪些软件所依赖

### 检查 Homebrew 环境

如果你的 Homebrew 没有办法正常的工作，你可以执行 `brew doctor` 来开启 Homebrew 自带的检查，从而确认有哪些问题，并进行修复。

### 管理后台软件

> macOS 使用 `launchctl` 命令加载开机自动运行的服务，`brew service` 可以简化 `launchctl` 的操作。

诸如 Nginx、MySQL 等软件，都是有一些服务端软件在后台运行，如果你希望对这些软件进行管理，可以使用 `brew services` 命令来进行管理

- `brew services list`： 查看所有服务。
- `brew services run [服务名]`: 单次运行某个服务（仅启动不注册）。
- `brew services start [服务名]`: 运行某个服务，并设置开机自动运行（启动服务，并注册）。
- `brew services stop [服务名]`：停止某个服务（停止服务，并取消注册）。
- `brew services restart`：重启某个服务（重启服务，并注册）。
- `brew services cleanup`：清除已卸载应用的无用的配置。

### 👀 Tips：访问应用官网

有时我们不确定自己是否需要更新一个应用，比如，它的新功能我是不是需要？它的新版本适不适配我的系统？纠结这些，不如即刻去应用官网上一探究竟：

```sh
brew home 应用名
```

### 垃圾清理相关

#### 前置知识

通过 `open ~/Library/Caches/Homebrew` 命令可以打开 HomeBrew 缓存目录。

HomeBrew 缓存目录下存放了数个索引文件，以及指向所有 HomeBrew Formulae 软件包的符号链接（软链接）；Cask 目录则存放了指向所有 HomeBrew Cask 软件包的软链接。在 downloads 目录中，我们可以看到被指向的这些软件包。

> 软链接，或者叫符号链接，是文件系统中指向其他位置的一种特殊文件。不同于 macOS 中的「替身」和 Windows 中的「快捷方式」，对软链接的访问将直接指向原始文件或目录，因此可以通过软链接访问原始目录内的文件。值得一提的是「访达」会将软链接显示为「替身」，不过二者实际上有很大的不同。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/cleanup.png)

HomeBrew 虽然提供了 `brew cleanup` 工具来回收空间，但它默认只会清理 120 天以前的下载缓存。各种软件包可能堆积在这个目录中，一点一点蚕食 Mac 宝贵的硬盘空间。

垃圾清理软件的工作原理一般是扫描可能的缓存路径，并且对其中可以清理的目录进行移除。然而，HomeBrew 的缓存目录中除了占据较大空间的软件包之外，还有指令表等其他索引。虽然这些索引可以随时重建，但如果能够精准定位并移除要清理的文件，就能将重建缓存和目录结构的时间节约下来。

#### 清理未完成的下载

在 HomeBrew 中，未完成的下载统一使用了 `.incomplete` 作为扩展名。它们不会被建立符号连接，因此不能用上文的方式进行处理。对于这类缓存，我们可以直接在下载目录中进行定位并删除。所需命令大致如下：

```sh
rm ~/Library/Caches/Homebrew/downloads/*.incomplete
```

其中，`*` 是通配符，`*.incomplete` 即表示该目录下所有名称以 `.incomplete` 结尾的文件。

#### cleanup 工具

- `brew cleanup -n` 如果你只是想看看有哪些应用可以清理，但暂时不需要处理它们，则可以通过这个命令一窥究竟
- `brew cleanup --prune 0` 将会移除所有 HomeBrew 缓存，包括不建议清理的指令缓存文件，但它的清理效果和安全性是最有保障的，缺点是效率低、比较费时
- `brew cleanup -s` 只会移除未安装的软件包，清理效果有限，只适合希望保留已安装软件包的用户

> 暴力一点直接整个文件夹删掉不行么？一秒钟的事情：`rm -rf $(brew --cache)`

参考：[从零开始，编写一个 HomeBrew 缓存清理脚本](https://sspai.com/post/65842)

### 用 Homebrew 来卸载

即使你的软件不是用 Homebrew 安装的，你也可以用它来卸载（加 --force ），还可以加上 `--zap` 让 Homebrew 把所有关联的数据文件都删除（可以用 brew cat 查看具体包括哪些文件），如

```sh
`brew uninstall --cask --force --zap zoom`
```

> 必须是存在这个 cask formula 才能通过 force 卸载；而且 zap 是写在 formula 里的。
> ⚠️ May remove files which are shared between applications.

具体讨论：[Mac Os 各位同学都用什么卸载软件？或者有什么好的卸载软件推荐？](https://v2ex.com/t/834735)

## [m1 查询硬盘写入](#目录)

### 安装 smartctl

在终端中输入如下代码，即可进行安装：

```sh
brew install smartmontools
```

### 查看硬盘使用量

在终端中输入如下代码，即可进行看查硬盘使用量。

```sh
smartctl -a disk0
```

结果如下，里面的 `Percentage Used` 就是损耗值，`Data Units Written` 就是写入量。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/SCR-20220328-wth.png)

## [用自带工具快速判断 macOS 的网络质量](#目录)

在打开的终端窗口中，输入 `networkQuality`（注意大小写），然后回车。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/network.png)

「responsiveness」，是指上传和下载的综合「响应能力」，根据 Apple 的[支持文档](https://support.apple.com/zh-cn/HT212313)，它的衡量指标是每分钟往返次数 (RPM)，即在正常工作条件下，网络能够在一分钟内完成的连续往返次数或事务数量。

根据 RPM 的高低数值不同，`networkQuality` 对响应能力的评价也分为「低」「中」「高」三个等级。这可以大致反映当前网络的拥堵程度，从而帮助间接估测视频通话、游戏等应用的效果：

- 评价为「Low」（低），说明同一网络的设备会互相影响，导致其他设备的网络连接不可靠；
- 评价为「Medium」（中），则表明多设备共享网络时会造成短暂卡顿；
- 评价为「High」（高）则最为理想，表明网络通畅，多设备并行联网也能和平共处，保持良好连通。

此外，`networkQuality` 命令可以接受一些参数。

- `-c` 会输出 json 格式的测速详情；
- `-s` 会分开测试下载和上传，而非像默认那样对两者同时测试（同时测试更能反映通话等真实应用的场景）；
- `-I` 可以测试特定网络接口的速度，例如，命令 `networkQuality -I en0` 是指测试内建 Wi-Fi 网络的速度。

更多参数和说明，可以用如下命令查阅手册页面 `networkQuality(8)`：`man networkQuality`

## [更改启动台应用程序显示数目](#目录)

默认情况下，启动台应用的显示数目为每行 7 个图标，总共有 5 行。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/launchpad.jpeg)

我们可以通过命令行的方式对显示效果进行更改。

> 操作步骤：
>
> 打开「应用程序」-\>「实用工具」-\>「终端」，输入下面的命令，点击回车。

- 更改每行显示应用程序的个数的命令：

  ```sh
  defaults write com.apple.dock springboard-columns -int 5
  ```

- 更改应用程序总共显示的行数的命令：

  ```sh
  defaults write com.apple.dock springboard-rows -int 3
  ```

最后，更改完成之后，还需要重启「启动台（Launchpad）」来应用更改。

> **注意：**
>
> **在重新启动「启动台（Launchpad）」之后，所有的应用程序图标排列方式都会被重置，包括文件夹显示，图标排列顺序等等。请慎重操作。**

- 更改设置，重启启动台的命令：

  ```sh
  defaults write com.apple.dock ResetLaunchPad -bool TRUE; killall Dock
  ```

## [macOS 软件清单](#目录)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/casks.png)

|                           软件                            |                                                  功能简述                                                  |                       相关                       |
| :-------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------: | :----------------------------------------------: |
|          [bob](https://github.com/ripperhe/Bob)           |                       一款 Mac 端翻译软件，支持划词翻译、截图翻译以及手动输入翻译。                        |      [#](https://ripperhe.gitee.io/bob/#/)       |
|           [iina](https://github.com/iina/iina)            |                                            体验最佳的视频播放器                                            |
|     [keycastr](https://github.com/keycastr/keycastr)      |                                    录屏好帮手，实时显示按键操作的小工具                                    |
|     [neteasemusic](https://music.163.com/#/download)      |                                   网易云音乐，网易公司推出的网络音乐软件                                   |
|    [telegram-desktop](https://telegram.org/?setln=en)     |                                            跨平台的即时通信软件                                            |
|  [cheatsheet](https://www.mediaatelier.com/CheatSheet/)   |                                             快速查看快捷键列表                                             |
|     [istat-menus](https://bjango.com/mac/istatmenus/)     |            电脑硬件信息监控软件，实时监控 CPU、GPU、内存、硬盘、网络、温度、电池以及系统时间。             |   [#](https://www.jianshu.com/p/1345a10331cb)    |
|       [lyricsx](https://github.com/ddddxxx/LyricsX)       |                                             功能完备的歌词工具                                             |
|            [raycast](https://www.raycast.com/)            |                   效率神器。应用与文件搜索、剪贴板管理、快捷短语输入，丰富全面的插件功能                   | [#](https://www.youtube.com/watch?v=KL0unqxkcDA) |
|          [thor](https://github.com/gbammc/Thor)           |         Mac 应用程序开启 /切换工具，通过它，给应用程序设定快捷键，即可使用快捷键迅速打开或切换应用         |
| [google-chrome](https://www.google.cn/intl/zh-CN/chrome/) |                                       谷歌浏览器，基于 Chromium 内核                                       |
|               [iterm2](https://iterm2.com/)               |                           专为 macOS 用户打造的命令行应用。可替代原生的 Terminal                           | [#](https://juejin.cn/post/6917659162025394183)  |
|         [maccy](https://github.com/p0deje/Maccy)          |                                           轻量级的剪贴板管理工具                                           |
|    [rectangle](https://github.com/rxhanson/Rectangle)     |     开源的窗口管理器，基于 Spectacle 应用，用 Swift 语言编写，让用户使用键盘快捷键来移动和调整窗口大小     |
|   [visual-studio-code](https://code.visualstudio.com/)    | 微软公司出品的一个运行于 Mac OSX、Windows 和 Linux 之上的，针对于编写现代 Web 和云应用的跨平台源代码编辑器 |
|     [hiddenbar](https://github.com/dwarvesf/hidden/)      |                                               菜单栏管理工具                                               |
|           [keka](https://github.com/aonez/Keka)           |                                            简单好用的解压缩工具                                            |
|       [motrix](https://github.com/agalwood/Motrix)        |                       全能的下载工具，支持下载 HTTP、FTP、BT、磁力链、百度网盘等资源                       |
|               [shottr](https://shottr.cc/)                |         方便好用的截图工具。功能包括：窗口截图 / 滚动截图 / 取色器功能 / 贴图功能 / 丰富的标注功能         |        [#](https://sspai.com/post/71485)         |
|      [wechat](https://mac.weixin.qq.com/?lang=zh_CN)      |                                             Mac 下微信客户端。                                             |
|       [picgo](https://github.com/Molunerfinn/PicGo)       |                                                图床管理工具                                                | [#](https://picgo.github.io/PicGo-Doc/zh/guide/) |
|         [squirrel](https://github.com/ssnhd/rime)         |                                                   输入法                                                   |     [#](https://ssnhd.com/2022/01/06/rime/)      |

## [浏览器](#目录)

### 为 Chrome 设置搜索引擎关键词

`Chrome` 的搜索栏同时支持多种搜索：

1. 进入设置搜索引擎的界面：为百度搜索设置 关键字 `bd`

2. 搜索成功! 在地址栏输入关键词 `bd` 后, 按空格键, 就可以快速切换到百度搜索了

### 浏览器插件

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/plug.png)

### 油猴脚本

> 使用自定义网站脚本的插件，可以使用各种 **user.js** 脚本，相当于小型的插件管理器，下面是我常用的脚本，其他用途的脚本请自行探索 [Greasy Fork](https://greasyfork.org/zh-CN)、[Sleazy Fork](https://sleazyfork.org/zh-CN)、[OpenUserJS](https://openuserjs.org/)

- [计时器掌控者](https://timer.palerock.cn/)：视频广告跳过 | 视频广告加速器

- [文本选中复制](https://github.com/WindrunnerMax/TKScript)：解除网站不允许复制的限制，文本选中后点击复制按钮即可复制

- ~~[拒绝二维码登陆](https://greasyfork.org/zh-CN/scripts/27183-%E6%8B%92%E7%BB%9D%E4%BA%8C%E7%BB%B4%E7%A0%81%E7%99%BB%E5%BD%95-%E6%B7%98%E5%AE%9D-%E4%BA%AC%E4%B8%9C%E7%AD%89%E7%BD%91%E7%AB%99%E9%BB%98%E8%AE%A4%E5%87%BA%E7%8E%B0%E8%B4%A6%E5%8F%B7%E5%AF%86%E7%A0%81%E7%99%BB%E5%BD%95%E7%95%8C%E9%9D%A2)：淘宝、京东、阿里云等网站默认使用账号密码登录，不出现二维码登录界面~~

- [解除 B 站区域限制](https://greasyfork.org/zh-CN/scripts/25718-%E8%A7%A3%E9%99%A4b%E7%AB%99%E5%8C%BA%E5%9F%9F%E9%99%90%E5%88%B6)：解除 `B` 站 区域限制; 只对 `HTML5` 播放器生效

## [有用的链接](#目录)

- <https://github.com/jaywcjlove/awesome-mac/blob/master/README-zh.md>
