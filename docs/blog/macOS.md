---
group:
  title: 2024 🐲
  order: -2024
title: macOS
toc: content
---

# 最傻逼的用户，被 macOS 百般折磨后，努力至今终尝回报，突然得到了最强使用技巧

## 系统设置

### 在 macOS 上安装软件前需要做的准备

**遇到问题：** Mac 安装软件时提示已损坏

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/SCR-20230103-lyu.png)

**可能原因：**

1. macOS 中 “安全性与隐私” 没有允许任何来源
1. 网络下载应用被 Apple 添加隔离标识，该应用的安全隔离属性未解除
1. 软件坏了

**追根溯源：**

- 文档：[在 Mac 上安全地打开 App](https://support.apple.com/zh-cn/HT202491)
- 视频：[在 Mac 上装软件，要学会和苹果斗智斗勇](https://www.bilibili.com/video/BV1tg411t7hN)

**针对解决：**

1. macOS 中 “安全性与隐私” 没有允许任何来源

    为了安全，macOS 新版本已经默认屏蔽未知开发者选项，需要用命令手动开启

    ```perl
    sudo spctl --master-disable
    ```

    如果以后想撤消它，则可以运行以下命令：

    ```perl
    sudo spctl --master-enable
    ```

2. 网络下载应用被 Apple 添加隔离标识，终端输入命令解除即可：

    ```perl
    # 访达中拖拽应用程序到 Terminal 中
    # sudo xattr -r -d com.apple.quarantine 拖拽应用程序到这里
    sudo xattr -rd com.apple.quarantine /Applications/PicGo.app
    ```

**更多：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/SCR-20230103-lkc.png)




## 自检硬件

> 在使用 Mac 电脑的过程中，如果认为 Mac 可能存在硬件问题，[可以使用 “Apple 诊断” 来帮助确定可能存在故障的硬件组件](https://support.apple.com/zh-cn/HT202731)。

## m1 芯片 Mac 重装系统

首先，m1 芯片的 Mac 进入恢复模式：

1. 关闭 Mac。
2. 按住电源键不放。
3. 当出现 ⚙️ 图标时，松开电源键。此时就算进入恢复模式了。

进入恢复模式后，选择 “选项”，然后点按 “继续”。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/macos01.png)

📋 注意事项：

- 如果在进入恢复模式后，弹出了用户图标和输入密码的登录界面，那么就意味着在进入恢复模式时，系统检测到了已登录的用户。这时，系统会要求输入该用户的管理员密码。**请照做**。
- 如果在进入恢复模式后，系统要求输入之前在这台 Mac 上使用过的 Apple ID 和密码，**也请照做**。

接下来会提示激活 Mac，所以必须连接到网络，点击右上角图标后就可以选择 WiFi，连接成功后点击下一步。Mac 会自动转圈显示激活成功。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/macos02.jpg)

然后在这个界面会弹出的几个选项，**这里先不要点击第二个重新安装 macOS。**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac08.jpg)

**点击左上角的实用工具 - 终端。**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac11.jpg)

输入 `resetpassword`，回车。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac09.jpg)

**在弹出的重设密码界面，不管显示啥不用去管**，直接点击左上角的恢复助理 - 抹掉 Mac...

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac14.jpg)

弹出的抹掉 Mac 界面，继续点下面的小蓝字 - 抹掉 Mac...

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac04.jpg)

在弹出的警告图标选择抹掉 Mac 就可以了。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac12.jpg)

然后就是耐心得等待进度条加载完毕，就算抹掉成功了。抹掉后可以看到和一开始的页面很像，这个页面就是提示激活 Mac，WiFi 图标还是右上角。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac03.jpg)

显示联网激活成功，点击下面的退出到恢复界面。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac10.jpg)

**这个时候 Mac 就是干干净净的了，可以点击第二个选项开始重装系统了。**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac06.jpg)

点击继续 Continue。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac13.jpg)

点击同意 Agree。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac05.jpg)

接下来就是就是纯粹的联网下载安装了（看网速，可能会比较久）。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac.jpg)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac07.jpg)

## 在 Mac 上安装软件前需要做的准备

**遇到问题：** Mac 安装软件时提示已损坏

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/SCR-20230103-lyu.png)

**可能原因：**

1. macOS 中 “安全性与隐私” 没有允许任何来源
1. 网络下载应用被 Apple 添加隔离标识，该应用的安全隔离属性未解除
1. 软件坏了

**追更溯源：**

- 文档：[在 Mac 上安全地打开 App](https://support.apple.com/zh-cn/HT202491)
- 视频：[在 Mac 上装软件，要学会和苹果斗智斗勇](https://www.bilibili.com/video/BV1tg411t7hN)

**针对解决：**

1. macOS 中 “安全性与隐私” 没有允许任何来源

    为了安全，macOS 新版本已经默认屏蔽未知开发者选项，需要用命令手动开启

    ```perl
    sudo spctl --master-disable
    ```

    如果以后想撤消它，则可以运行以下命令：

    ```perl
    sudo spctl --master-enable
    ```

2. 网络下载应用被 Apple 添加隔离标识，终端输入命令解除即可：

    ```perl
    # 访达中拖拽应用程序到 Terminal 中
    # sudo xattr -r -d com.apple.quarantine 拖拽应用程序到这里
    sudo xattr -rd com.apple.quarantine /Applications/PicGo.app
    ```

**更多：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/SCR-20230103-lkc.png)

## 网络代理

### Clash

- [Clash](https://github.com/Dreamacro/clash)：一个 Go 语言开发的多平台代理客户端
- [ClashX](https://github.com/yichengchen/clashX)：Clash 的一个简单轻量化的代理客户端
- [Clash for Windows](https://github.com/Fndroid/clash_for_windows_pkg)：Clash 的 Windows / macOS [跨平台可定制化的图形客户端](https://docs.cfw.lbyczf.com/)

### 机场

- **使用中：** [🏆 Flyint 飞数](https://www.flyint.cc/)
- **备用：** [🐔 XFLTD 养鸡场](https://xfltd.org/)
- **免费：** [免费节点及订阅地址](https://github.com/Pawdroid/Free-servers)
- **寻找机场：** [机场列表大全](https://t.me/jichang_list)

### 终端代理

通过设置 `http_proxy`、`https_proxy`、`all_proxy`，可以让终端走指定的代理。

```perl
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890
export all_proxy=socks5://127.0.0.1:7890
```

> 💡 7890 是 http 代理对应的端口，根据实际情况修改。

这里提供一个便捷脚本，里面包含打开、关闭功能：

```perl
function po() {
    export http_proxy=http://127.0.0.1:7890
    export https_proxy=$http_proxy
    export all_proxy=socks5://127.0.0.1:7890
    echo -e "终端代理已开启!"
}

function pf(){
    unset http_proxy https_proxy all_proxy
    echo -e "终端代理已关闭!"
}
```

通过 `po` 启动代理，`pf` 关闭代理。

接下来需要把脚本写入 `.zshrc`，`source ~/.zshrc` 就可以永久生效。

可以执行 `curl ipinfo.io` 验证

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/ip.png)

### 其他代理问题

Arc 浏览器在注册的时候遇到 “Unknown server error” 的错误

![20221028151344](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/ts/20221028151344.png)

**原因是网络无法访问 Arc 的服务**，这个问题我在之前尝试 Warp 终端的时候也遇到了。

一种解决办法是使用 [clashX Pro](https://install.appcenter.ms/users/clashx/apps/clashx-pro/distribution_groups/public) 的增强模式。

**另一种解决办法：**

```perl
# 1. 首先确保终端处于代理开启状态
# 2. 命令行运行 warp 或 Arc
/Applications/Warp.app/Contents/macOS/stable
```

![20221117135416](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/20221117135416.png)

### 使用 ClashX Pro 给 Switch 加速

> 参照：[利用 ClashX Pro，加速你的 Switch](https://sonatta.top/post/Oa-JnB-qx/)

**首先你需要：**

1. ClashX Pro 开启增强模式
1. 确定你的机场节点支持 UDP 转发

**然后，具体步骤如下：**

1. 在本机的网络设置中查看本机 ip

    ![20230103165110](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/20230103165110.png)

2. 在 Switch 的网络设置中，连接上和 Mac 相同的 WiFi，然后修改网络设置

    把 **IP地址设置** 改为 **手动**，然后填一个 ip 地址（如果你的电脑 ip 是 `192.168.1.XXX`，这里需要填 `192.168.1.YYY`，即前三段一样）

    把 **网关** 和 **首选DNS** 改为 Mac 的 ip。

    ![SCR-20230103-ni8](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/SCR-20230103-ni8.png)

3. 点击保存，然后重新连接到网络，即可享受加速。

## Homebrew 包管理

### Homebrew 的安装

#### 安装 arm 版 Homebrew

`arm` 版 `Homebrew` 安装在 `/opt/homebrew` 路径下，**早期的时候需要手动创建目录执行命令，目前使用 [🍺官网](https://brew.sh/index_zh-cn) 最新脚本即可，不需要手动操作。**

**直接执行脚本：**

```perl
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

然后还需设置环境变量，具体操作步骤如图所示：

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/homebrew.png)

#### 安装 x86 版 Homebrew

因为目前还有很多软件包没有支持 `arm` 架构，我们也可以考虑使用 `x86` 版的 `Homebrew`。

在命令前面添加 `arch -x86_64`，就可以按 x86 模式执行该命令，比如：

```perl
arch -x86_64 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### arm 和 x86 版 Homebrew 的共存问题

经过上面的步骤，系统中目前有了两个 `brew` 程序，即 x86 版的 `/usr/local/bin/brew` 和 arm 版的 `/opt/homebrew/bin/brew`。

**问：那么，当在终端中执行 `brew` 命令时，系统会以哪个为准呢？**

**答：当存在重名程序时，终端会按照重名程序在环境变量 `PATH` 中的先后顺序选择要执行的版本。**

也可以在 `~/.zshrc` 中为两个版本分别设置别名（alias）：

```perl
alias abrew='/opt/homebrew/bin/brew' # arm
alias ibrew='arch -x86_64 /usr/local/bin/brew' # x86
```

这样，执行 `abrew install <package>` 就可以调用 arm 版 Homebrew 安装软件包，执行 `ibrew install <package>` 就可以调用 x86 版，从而不容易混淆。

✨ **No.1 的小秘籍**

安装 Homebrew 过程遇到解决不了的问题，先删除安装目录再重新运行脚本安装。

- x86 上安装目录： `/usr/local/homebrew/`
- arm 上安装目录： `/opt/homebrew/`

#### 跑题：为什么 arm 版 Mac 要使用 /opt 路径？

根据《文件系统层次结构标准》（Filesystem Hierarchy Standard，主要为 Linux 系统制定，但对具有共同 UNIX 基因的 macOS 也有参考价值）：

- `/usr/local` 目录用于系统管理员在本地安装软件。系统软件更新时，该目录应免于被覆盖。
- `/opt` 目录留作附加应用程序（add-on application）软件包的安装。安装在该目录下的软件包必须将其静态文件放置在单独的 `/opt/<package>` 或 `/opt/<provider>` 路径下。

历史上，`/usr/local` 主要用于放置在本地编译并另行安装的程序，避免和 `/usr` 下的系统自带版本冲突；而 `/opt` 则用于安装非系统自带的、第三方预先编译并发行的独立软件包。

**显然，在如今的 macOS 使用场景下，用户很少会需要自行编译软件包，`/usr/local` 和 `/opt` 的区分一定程度上已经成为名义上的了。Homebrew 启用 `/opt` 作为 arm 版的安装路径，可能更多是出于确保与 `x86` 版相互区隔的考虑**

参考：[在 m1 芯片 Mac 上使用 Homebrew](https://sspai.com/post/63935)

### Homebrew 的核心概念

|    词汇     |                                              含义                                              |
| :---------: | :--------------------------------------------------------------------------------------------: |
| formula (e) |                               安装包的描述文件，formulae 为复数                                |
|   cellar    |                                       安装好后所在的目录                                       |
|     keg     |                          具体某个包所在的目录，keg 是 cellar 的子目录                          |
|   bottle    | 预先编译好的包，不需要现场下载编译源码，速度会快很多；官方库中的包大多都是通过 bottle 方式安装 |
|     tap     |                        下载源，可以类比于 Linux 下的包管理器 repository                        |
|    cask     |                安装 macOS Native 应用的扩展，你也可以理解为有图形化界面的应用。                |
|   bundle    |                                    描述 Homebrew 依赖的扩展                                    |

其中，最关键的是 `tap` 、`cask`，我们在后续会经常用到。

### Homebrew 搜索软件

很多时候，我们不知道自己想要的软件是否有，或者说具体的名字是什么，这个时候你有两种方式来完成搜索

1. 使用命令搜索

    在命令行中，你可以直接使用 `brew search 关键词` 来进行搜索

    ![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/install.png)

    输入你想要的关键词，来搜索即可得到结果。

    > 在搜索时应当遵循宁可少字，不能错字的原则来搜索。

2. 使用网页搜索

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

### Homebrew 环境检查

如果你的 Homebrew 没有办法正常的工作，你可以执行 `brew doctor` 来开启 Homebrew 自带的检查，从而确认有哪些问题，并进行修复。

### Homebrew 管理后台软件

> macOS 使用 `launchctl` 命令加载开机自动运行的服务，`brew service` 可以简化 `launchctl` 的操作。

诸如 Nginx、MySQL 等软件，都是有一些服务端软件在后台运行，如果你希望对这些软件进行管理，可以使用 `brew services` 命令来进行管理

- `brew services list`： 查看所有服务。
- `brew services run [服务名]`: 单次运行某个服务（仅启动不注册）。
- `brew services start [服务名]`: 运行某个服务，并设置开机自动运行（启动服务，并注册）。
- `brew services stop [服务名]`：停止某个服务（停止服务，并取消注册）。
- `brew services restart`：重启某个服务（重启服务，并注册）。
- `brew services cleanup`：清除已卸载应用的无用的配置。

### Homebrew 访问应用官网

有时我们不确定自己是否需要更新一个应用，比如，它的新功能我是不是需要？它的新版本适不适配我的系统？纠结这些，不如即刻去应用官网上一探究竟：

```sh
brew home 应用名
```

### Homebrew 清理垃圾

#### 拓展知识

通过 `open ~/Library/Caches/Homebrew` 命令可以打开 Homebrew 缓存目录。

Homebrew 缓存目录下存放了数个索引文件，以及指向所有 Homebrew Formulae 软件包的符号链接（软链接）；Cask 目录则存放了指向所有 Homebrew Cask 软件包的软链接。在 downloads 目录中，我们可以看到被指向的这些软件包。

> 软链接，或者叫符号链接，是文件系统中指向其他位置的一种特殊文件。不同于 macOS 中的「替身」和 Windows 中的「快捷方式」，对软链接的访问将直接指向原始文件或目录，因此可以通过软链接访问原始目录内的文件。值得一提的是「访达」会将软链接显示为「替身」，不过二者实际上有很大的不同。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/cleanup.png)

Homebrew 虽然提供了 `brew cleanup` 工具来回收空间，但它默认只会清理 120 天以前的下载缓存。各种软件包可能堆积在这个目录中，一点一点蚕食 Mac 宝贵的硬盘空间。

垃圾清理软件的工作原理一般是扫描可能的缓存路径，并且对其中可以清理的目录进行移除。然而，Homebrew 的缓存目录中除了占据较大空间的软件包之外，还有指令表等其他索引。虽然这些索引可以随时重建，但如果能够精准定位并移除要清理的文件，就能将重建缓存和目录结构的时间节约下来。

#### 清理未完成的下载

在 Homebrew 中，未完成的下载统一使用了 `.incomplete` 作为扩展名。它们不会被建立符号连接，因此不能用上文的方式进行处理。对于这类缓存，我们可以直接在下载目录中进行定位并删除。所需命令大致如下：

```perl
rm ~/Library/Caches/Homebrew/downloads/*.incomplete
```

其中，`*` 是通配符，`*.incomplete` 即表示该目录下所有名称以 `.incomplete` 结尾的文件。

#### cleanup 工具

- `brew cleanup -n` 如果你只是想看看有哪些应用可以清理，但暂时不需要处理它们，则可以通过这个命令一窥究竟
- `brew cleanup --prune 0` 将会移除所有 HomeBrew 缓存，包括不建议清理的指令缓存文件，但它的清理效果和安全性是最有保障的，缺点是效率低、比较费时
- `brew cleanup -s` 只会移除未安装的软件包，清理效果有限，只适合希望保留已安装软件包的用户

> 暴力一点直接整个文件夹删掉不行么？一秒钟的事情：`rm -rf $(brew --cache)`

参考：[从零开始，编写一个 HomeBrew 缓存清理脚本](https://sspai.com/post/65842)

### Homebrew 卸载软件

即使你的软件不是用 Homebrew 安装的，你也可以用它来卸载（加 --force ），还可以加上 `--zap` 让 Homebrew 把所有关联的数据文件都删除（可以用 brew cat 查看具体包括哪些文件），如

```sh
`brew uninstall --cask --force --zap zoom`
```

> 必须是存在这个 cask formula 才能通过 force 卸载；而且 zap 是写在 formula 里的。
> ⚠️ May remove files which are shared between applications.

**具体讨论**：[macOS 各位同学都用什么卸载软件？或者有什么好的卸载软件推荐？](https://v2ex.com/t/834735)

## 6. 编程相关

1. [只用命令行就能覆盖所有操作，而且能提升工作效率的终端使用技巧你喜欢吗？](terminal.md)
2. [怕遗忘 Git 的我，把相关知识点都记录下来就对了！](git.md)
3. [VSCode 因为插件丰富、功能强大被大家喜欢，真是令人烦恼啊？](code.md)
4. [前端工程化：Node 相关知识点](../engineering/node.md)

## 7. 软件清单

|                           软件                            |                                                  功能简述                                                  |                       相关                       |
| :-------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------: | :----------------------------------------------: |
|          [bob](https://github.com/ripperhe/Bob)           |                       一款 Mac 端翻译软件，支持划词翻译、截图翻译以及手动输入翻译。                        |                   [#](bob.md)                    |
|           [iina](https://github.com/iina/iina)            |                                                 视频播放器                                                 |
|     [keycastr](https://github.com/keycastr/keycastr)      |                                    录屏好帮手，实时显示按键操作的小工具                                    |
|     [neteasemusic](https://music.163.com/#/download)      |                                                 网易云音乐                                                 |
|    [telegram-desktop](https://telegram.org/?setln=en)     |                                                即时通信软件                                                |
|  [cheatsheet](https://www.mediaatelier.com/CheatSheet/)   |                                                 快捷键列表                                                 |
|     [istat-menus](https://bjango.com/mac/istatmenus/)     |            电脑硬件信息监控软件，实时监控 CPU、GPU、内存、硬盘、网络、温度、电池以及系统时间。             |   [#](https://www.jianshu.com/p/1345a10331cb)    |
|       [lyricsx](https://github.com/ddddxxx/LyricsX)       |                                                  歌词工具                                                  |
|            [raycast](https://www.raycast.com/)            |                   效率神器。应用与文件搜索、剪贴板管理、快捷短语输入，丰富全面的插件功能                   | [#](https://www.youtube.com/watch?v=KL0unqxkcDA) |
|          [thor](https://github.com/gbammc/Thor)           |         Mac 应用程序开启 /切换工具，通过它，给应用程序设定快捷键，即可使用快捷键迅速打开或切换应用         |
| [google-chrome](https://www.google.cn/intl/zh-CN/chrome/) |                                       谷歌浏览器，基于 Chromium 内核                                       |
|               [iterm2](https://iterm2.com/)               |                           专为 macOS 用户打造的命令行应用。可替代原生的 Terminal                           |             [#](terminal.md#iterm2)              |
|         [maccy](https://github.com/p0deje/Maccy)          |                                           轻量级的剪贴板管理工具                                           |
|    [rectangle](https://github.com/rxhanson/Rectangle)     |     开源的窗口管理器，基于 Spectacle 应用，用 Swift 语言编写，让用户使用键盘快捷键来移动和调整窗口大小     |
|   [visual-studio-code](https://code.visualstudio.com/)    | 微软公司出品的一个运行于 Mac OSX、Windows 和 Linux 之上的，针对于编写现代 Web 和云应用的跨平台源代码编辑器 |                   [#](code.md)                   |
|     [hiddenbar](https://github.com/dwarvesf/hidden/)      |                                               菜单栏管理工具                                               |
|           [keka](https://github.com/aonez/Keka)           |                                            简单好用的解压缩工具                                            |
|       [motrix](https://github.com/agalwood/Motrix)        |                       全能的下载工具，支持下载 HTTP、FTP、BT、磁力链、百度网盘等资源                       |
|               [shottr](https://shottr.cc/)                |         方便好用的截图工具。功能包括：窗口截图 / 滚动截图 / 取色器功能 / 贴图功能 / 丰富的标注功能         |        [#](https://sspai.com/post/71485)         |
|      [wechat](https://mac.weixin.qq.com/?lang=zh_CN)      |                                             Mac 下微信客户端。                                             |
|       [picgo](https://github.com/Molunerfinn/PicGo)       |                                                图床管理工具                                                | [#](https://picgo.github.io/PicGo-Doc/zh/guide/) |
|         [squirrel](https://github.com/ssnhd/rime)         |                                                   输入法                                                   |     [#](https://ssnhd.com/2022/01/06/rime/)      |

## 8. macOS 使用技巧

### Mac 下显示 / 隐藏文件

同 Windows 一样，macOS 会将重要文件隐藏起来，以防止意外删除这些文件而损坏系统。但是，有时候我们需要显示隐藏文件。则需要使用如下方法。

打开 「启动台」，选择 「终端」 软件，输入以下命令，显示隐藏文件：

```perl
defaults write com.apple.finder AppleShowAllFiles Yes && killall Finder
```

如果需要不显示隐藏文件，则执行下面的命令：

```sh
defaults write com.apple.finder AppleShowAllFiles No && killall Finder
```

### m1 Mac 查询硬盘写入

#### 安装 smartctl

在终端中输入如下代码，即可进行安装：

```sh
brew install smartmontools
```

#### 查看硬盘使用量

在终端中输入如下代码，即可进行看查硬盘使用量。

```sh
smartctl -a disk0
```

结果如下，里面的 `Percentage Used` 就是损耗值，`Data Units Written` 就是写入量。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/SCR-20220328-wth.png)

### 更改启动台应用程序显示数目

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

### 其他

- [打造一个高效的开发终端【Mac 篇】](https://zhuanlan.zhihu.com/p/438124776)
- [UTM：开源的多面手 macOS 虚拟机（更新到 2023.1.8）](https://zhuanlan.zhihu.com/p/526352487)
- [macOS defaults list](https://macos-defaults.com/)
- [Mac 自动填充验证码的探索](https://www.v2ex.com/t/851374)
- [一日一技 | 用自带工具快速判断 macOS 和 iOS 的网络质量](https://sspai.com/post/69966)
- [Mac 安装 man 中文手册](https://learnku.com/articles/28016)

## 9. 浏览器

### 管理书签

> [高效书签管理，我是如何管理 5000 条书签的](https://www.runningcheese.com/bm)

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

## 10. 有用的链接

- <https://appstorrent.ru/>
- <https://macosicons.com/#/>
- <https://github.com/jaywcjlove/awesome-mac/blob/master/README-zh.md>

