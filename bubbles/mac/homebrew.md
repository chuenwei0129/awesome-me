# Homebrew 包管理

## 安装 Homebrew

### 安装 ARM 版 Homebrew

`ARM` 版 `Homebrew` 需要安装在 `/opt/homebrew` 路径下，**早期的时候需要手动创建目录执行命令，目前使用 [🍺官网](https://brew.sh/index_zh-cn) 最新脚本不需要手动操作。**

直接执行：

```perl
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

然后还需设置环境变量，具体操作步骤如图所示，一定要仔细阅读。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/homebrew.png)

### 安装 X86 版 Homebrew (可选)

因为目前很多软件包没有支持 `ARM` 架构，我们也可以考虑使用 `x86` 版的 `Homebrew`。

在命令前面添加 `arch -x86_64`，就可以按 X86 模式执行该命令，比如：

```perl
arch -x86_64 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### ARM 和 X86 版 Homebrew 的共存问题

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
2. 如果软件包还没有兼容新架构，使用 ARM 版 Homebrew 安装会报错，此时可以换用 X86 版 Homebrew 安装。另外，值得一提的是，现在的 Homebrew 已再不需要额外使用 `--cask` 参数安装 Cask 程序，所以直接使用 `brew install <app>` 就好了。
3. 对于图形界面（GUI）程序，即通过 Homebrew Cask 安装的 .app 程序：对于这类软件，Homebrew 起的作用只是从官方渠道下载这些软件的安装包，然后安装到 `/Applications` 路径（及执行安装脚本，如果有）。因此无论其是否针对新架构优化，通过任一版本 Homebrew 都可以安装。考虑到日后维护方便，建议直接用 ARM 版 Homebrew 安装即可。

> ✨ **No.1 的小秘籍**

安装 homebrew 过程遇到解决不了的问题，先删除 `homebrew` 目录再重新运行脚本安装。

- x86 上安装目录： `/usr/local/Homebrew/`
- arm 上安装目录： `/opt/homebrew`

### 🚀 跑题：为什么 ARM 版 Mac 要使用 /opt 路径？

根据《文件系统层次结构标准》（Filesystem Hierarchy Standard，主要为 Linux 系统制定，但对具有共同 UNIX 基因的 macOS 也有参考价值）：

- `/usr/local` 目录用于系统管理员在本地安装软件。系统软件更新时，该目录应免于被覆盖。
- `/opt` 目录留作附加应用程序（add-on application）软件包的安装。安装在该目录下的软件包必须将其静态文件放置在单独的 `/opt/<package>` 或 `/opt/<provider>` 路径下。

历史上，`/usr/local` 主要用于放置在本地编译并另行安装的程序，避免和 `/usr` 下的系统自带版本冲突；而 `/opt` 则用于安装非系统自带的、第三方预先编译并发行的独立软件包。

**显然，在如今的 macOS 使用场景下，用户很少会需要自行编译软件包，`/usr/local` 和 `/opt` 的区分一定程度上已经成为名义上的了。Homebrew 启用 `/opt` 作为 ARM 版的安装路径，可能更多是出于确保与 `X86` 版相互区隔的考虑**

参考：[在 M1 芯片 Mac 上使用 Homebrew](https://sspai.com/post/63935)

## Homebrew 的几个核心概念

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

## Homebrew 搜索软件

很多时候，我们不知道自己想要的软件是否有，或者说具体的名字是什么，这个时候你有两种方式来完成搜索

### 使用命令搜索

在命令行中，你可以直接使用 `brew search [关键词]` 来进行搜索

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/install.png)

输入你想要的关键词，来搜索即可得到结果。

> 在搜索时应当遵循宁可少字，不能错字的原则来搜索。

### 使用网页搜索

除了使用命令行搜索以外，你可以使用网页端的搜索工具来辅助你进行搜索。在 Homebrew 的[官网](https://formulae.brew.sh/cask/)，你可以找到 casks 的链接，或者直接访问 <https://formulae.brew.sh/> 来进行搜索 formula。你只需要在界面的输入框中输入你要搜索的命令，然后就会出现对应的候选命令

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/search.png)

## Homebrew 常用命令

### 安装卸载软件

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

### 升级软件相关

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

## 检查 Homebrew 环境

如果你的 Homebrew 没有办法正常的工作，你可以执行 `brew doctor` 来开启 Homebrew 自带的检查，从而确认有哪些问题，并进行修复。

## 管理后台软件

> macOS 使用 `launchctl` 命令加载开机自动运行的服务，`brew service` 可以简化 `launchctl` 的操作。

诸如 Nginx、MySQL 等软件，都是有一些服务端软件在后台运行，如果你希望对这些软件进行管理，可以使用 `brew services` 命令来进行管理

- `brew services list`： 查看所有服务。
- `brew services run [服务名]`: 单次运行某个服务（仅启动不注册）。
- `brew services start [服务名]`: 运行某个服务，并设置开机自动运行（启动服务，并注册）。
- `brew services stop [服务名]`：停止某个服务（停止服务，并取消注册）。
- `brew services restart`：重启某个服务（重启服务，并注册）。
- `brew services cleanup`：清除已卸载应用的无用的配置。

## 访问应用官网

有时我们不确定自己是否需要更新一个应用，比如，它的新功能我是不是需要？它的新版本适不适配我的系统？纠结这些，不如即刻去应用官网上一探究竟：

```sh
brew home 应用名
```

## 垃圾清理

### 前置知识

通过 `open ~/Library/Caches/Homebrew` 命令可以打开 HomeBrew 缓存目录。

HomeBrew 缓存目录下存放了数个索引文件，以及指向所有 HomeBrew Formulae 软件包的符号链接（软链接）；Cask 目录则存放了指向所有 HomeBrew Cask 软件包的软链接。在 downloads 目录中，我们可以看到被指向的这些软件包。

> 软链接，或者叫符号链接，是文件系统中指向其他位置的一种特殊文件。不同于 macOS 中的「替身」和 Windows 中的「快捷方式」，对软链接的访问将直接指向原始文件或目录，因此可以通过软链接访问原始目录内的文件。值得一提的是「访达」会将软链接显示为「替身」，不过二者实际上有很大的不同。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/cleanup.png)

HomeBrew 虽然提供了 `brew cleanup` 工具来回收空间，但它默认只会清理 120 天以前的下载缓存。各种软件包可能堆积在这个目录中，一点一点蚕食 Mac 宝贵的硬盘空间。

垃圾清理软件的工作原理一般是扫描可能的缓存路径，并且对其中可以清理的目录进行移除。然而，HomeBrew 的缓存目录中除了占据较大空间的软件包之外，还有指令表等其他索引。虽然这些索引可以随时重建，但如果能够精准定位并移除要清理的文件，就能将重建缓存和目录结构的时间节约下来。

### 清理未完成的下载

在 HomeBrew 中，未完成的下载统一使用了 `.incomplete` 作为扩展名。它们不会被建立符号连接，因此不能用上文的方式进行处理。对于这类缓存，我们可以直接在下载目录中进行定位并删除。所需命令大致如下：

```sh
rm ~/Library/Caches/Homebrew/downloads/*.incomplete
```

其中，`*` 是通配符，`*.incomplete` 即表示该目录下所有名称以 `.incomplete` 结尾的文件。

### cleanup 工具

- `brew cleanup -n` 如果你只是想看看有哪些应用可以清理，但暂时不需要处理它们，则可以通过这个命令一窥究竟
- `brew cleanup --prune 0` 将会移除所有 HomeBrew 缓存，包括不建议清理的指令缓存文件，但它的清理效果和安全性是最有保障的，缺点是效率低、比较费时
- `brew cleanup -s` 只会移除未安装的软件包，清理效果有限，只适合希望保留已安装软件包的用户

> 暴力一点直接整个文件夹删掉不行么？一秒钟的事情：`rm -rf $(brew --cache)`

参考：[从零开始，编写一个 HomeBrew 缓存清理脚本](https://sspai.com/post/65842)

## 用 Homebrew 来卸载软件

即使你的软件不是用 Homebrew 安装的，你也可以用它来卸载（加 --force ），还可以加上 `--zap` 让 Homebrew 把所有关联的数据文件都删除（可以用 brew cat 查看具体包括哪些文件），如

```sh
`brew uninstall --cask --force --zap zoom`
```

> 必须是存在这个 cask formula 才能通过 force 卸载；而且 zap 是写在 formula 里的。
> ⚠️ May remove files which are shared between applications.

具体讨论：[macOS 各位同学都用什么卸载软件？或者有什么好的卸载软件推荐？](https://v2ex.com/t/834735)
