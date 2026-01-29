---

group:
title: 2024 🐲
order: -2024
title: Mac 食用指北
toc: content
------------

# Mac 食用指北：从被 macOS 折磨到日常在用的上手套路（强烈推荐收藏）

我算是那种“用到的时候再装”的人，但 Mac 这玩意儿吧，不提前把路铺好，后面就容易各种“诈尸”。这篇文章我主要做两件事：

1. 记录我日常在用的工具、配置和系统优化
2. 以后换机或重装时照着抄，快速恢复开发环境

---

## 重装系统

我个人习惯：新机到手先验硬件，再走一遍重装流程。老机器用久了也一样，重装一次，心里踏实。

> 如果怀疑硬件有问题，先跑一遍 [Apple 诊断](https://support.apple.com/zh-cn/HT202731)。它能帮你定位是哪块组件“生病”了。

下面是我整理的重装流程，按步骤来就行。

### 准备工作：进入恢复模式

进入恢复模式的核心就三步，我一般这么做：

1. 先关机。别学我瞎折腾，真的先关机。
2. 按住电源键不松手，像捏瓶盖一样稳住。
3. 看到 ⚙️ 图标再松手，恢复模式就进来了。

进入后选“选项”→“继续”，接下来开始操作。

![进入恢复模式界面](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/macos01.png)

📋 **注意：**

- 如果出现用户图标并提示输入密码：输入管理员密码继续。
- 如果提示输入之前的 Apple ID：别吐槽它健忘，按要求输入就行。

接着会要求激活 Mac，本质就是让你连网。右上角选 WiFi，连上后下一步，系统会提示激活成功。

![激活成功界面](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/macos02.jpg)

### 恢复界面：别急着点“重新安装 macOS”

激活后会出现多个选项。这里我建议先别直接冲“重新安装 macOS”，不然后面可能要返工。

![多个选项](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac08.jpg)

**操作路径：左上角「实用工具」→「终端」**

![选择终端](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac11.jpg)

终端输入：

```sh
resetpassword
```

回车。

![终端输入 resetpassword](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac09.jpg)

弹出密码重置界面后，我一般不在这页纠缠，直接走“抹掉 Mac”。

路径：左上角「恢复助理」→「抹掉 Mac...」

![抹掉 Mac](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac14.jpg)

再确认一次「抹掉 Mac」，等进度条跑完。

![确认抹掉 Mac](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac04.jpg)

完成后会回到类似初始的激活页面。

![重新激活页面](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac03.jpg)

联网激活成功后，点“退出到恢复界面”。

![退出到恢复界面](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac10.jpg)

到这里，系统基本就是“新生状态”。恭喜，你的 Mac 已经干净得像刚出厂一样。

### 开始重装系统

回到恢复界面后，选择“重新安装 macOS”（一般是第二个选项）开始安装。

![开始重装系统](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac06.jpg)

一路 Continue，像在电影里按按钮，但这次是重生键。

![点击继续](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac13.jpg)

条款直接同意即可（我知道你也不会认真看）。

![同意条款](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac05.jpg)

最后就是等待下载 + 安装。网速决定体验，慢的时候就当自己在修行。

![下载安装完成](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac07.jpg)

祝你重装顺利 🎉

---

## 安装软件前需要做的准备

很多“软件已损坏”“无法打开”并不是真的坏，更多是 macOS 的安全策略在发力。

### 常见问题

![安装软件提示已损坏](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/SCR-20230103-lyu.png)

### 可能原因

1. 「安全性与隐私」未允许“任何来源”
2. 下载的 App 被加了隔离标识（quarantine）
3. 极少数情况：软件确实坏了

### 参考资料

- 文档：[在 Mac 上安全地打开 App](https://support.apple.com/zh-cn/HT202491)
- 视频：[在 Mac 上装软件，要学会和苹果斗智斗勇](https://www.bilibili.com/video/BV1tg411t7hN)

### 解决方案

#### 1）开启“任何来源”（按需）

新版本 macOS 默认不显示未知开发者选项，需要手动开启：

```sh
sudo spctl --master-disable
```

不需要时建议关回去：

```sh
sudo spctl --master-enable
```

我个人习惯：**装完需要的就关**，安全第一。

#### 2）解除隔离标识（quarantine）

如果是网络下载的 App，经常会中招。终端执行：

```sh
# 从访达中将应用程序拖拽到终端中并执行以下命令
sudo xattr -rd com.apple.quarantine /Applications/PicGo.app
```

更多细节看上面的文档/视频。我们都是苹果生态的“斗士”，但也要讲策略 💪

![详细内容](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/SCR-20230103-lkc.png)

---

## 网络

### 终端代理

我常用做法：直接用环境变量让终端走代理。也可以用猫猫头的增强模式，看你习惯。

```sh
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890
export all_proxy=socks5://127.0.0.1:7890
```

> 💡 7890 是常见端口，按你自己的代理配置修改。

为了省事，我把开关写成脚本，日常在用：

```sh
function po() {
    export http_proxy=http://127.0.0.1:7890
    export https_proxy=$http_proxy
    export all_proxy=socks5://127.0.0.1:7890
    echo -e "终端代理已开启，走你！🚀"
}

function pf() {
    unset http_proxy https_proxy all_proxy
    echo -e "终端代理已关闭，看我大侠卸甲！✌️"
}
```

把它写进 `.zshrc`，然后：

- `po`：开启代理
- `pf`：关闭代理
- `source ~/.zshrc`：让配置生效

验证方式我一般用：

- `curl ipinfo.io`

![curl ipinfo.io](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/ip.png)

### 其他代理问题：Arc 注册报错

如果注册 Arc 时遇到 “Unknown server error”，我遇到过，基本就是网络访问不到它的服务。

![Arc 注册错误](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/ts/20221028151344.png)

一种可行方案：用 Warp 的终端代理完成注册（临时救火）。

```sh
# 确保终端代理已开启
# 在命令行运行 Warp 或 Arc
/Applications/Warp.app/Contents/MacOS/stable
# 或者使用猫猫头的增强模式
```

![启动 Warp](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/20221117135416.png)

---

## 软件分享

> 💡 以下默认都是 Mac 版。Windows 版请自行搜索对应替代。

![20241110164559](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241110164559.png)
![20241110164718](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241110164718.png)
![20241110164751](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241110164751.png)

（这块我后续会补充：按“必装/可选/用到的时候再装”三类整理，复用性更强。）

---

## 浏览器

### 书签管理

我书签很多，属于重度患者。参考这篇思路就够用：

> [高效书签管理：我是如何管理 5000 条书签的](https://www.runningcheese.com/bm)

### 为 Chrome 配置搜索关键词

Chrome 地址栏可以配置“关键词搜索”，我日常强烈推荐：

1. 进入设置 → 搜索引擎 → 管理搜索引擎
2. 给百度配置关键字：`bd`
3. 使用时：地址栏输入 `bd` + 空格 → 直接百度搜索

这个配置做完，效率很明显。

### 常用插件

> 下面是我常用的一些插件（偏实用向）

![20241110165206](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241110165206.png)

### 油猴脚本（Tampermonkey）

油猴就是一个“脚本管理器”，很多场景比装插件更轻。脚本来源我一般看：

- [Greasy Fork](https://greasyfork.org/zh-CN)
- [Sleazy Fork](https://sleazyfork.org/zh-CN)
- [OpenUserJS](https://openuserjs.org/)

我常用的脚本：

- [计时器掌控者](https://timer.palerock.cn/)：视频广告跳过 / 加速
- [文本选中复制](https://github.com/WindrunnerMax/TKScript)：解除不让复制的限制
- ~~[拒绝二维码登陆](https://greasyfork.org/zh-CN/scripts/27183-%E6%8B%92%E7%BB%9D%E4%BA%8C%E7%BB%B4%E7%A0%81%E7%99%BB%E5%BD%95-%E6%B7%98%E5%AE%9D-%E4%BA%AC%E4%B8%9C%E7%AD%89%E7%BD%91%E7%AB%99%E9%BB%98%E8%AE%A4%E5%87%BA%E7%8E%B0%E8%B4%A6%E5%8F%B7%E5%AF%86%E7%A0%81%E7%99%BB%E5%BD%95%E7%95%8C%E9%9D%A2)~~：已不常用
- [解除 B 站区域限制](https://greasyfork.org/zh-CN/scripts/25718-%E8%A7%A3%E9%99%A4b%E7%AB%99%E5%8C%BA%E5%9F%9F%E9%99%90%E5%88%B6)：仅对 HTML5 播放器生效

---

## 开发环境配置

### Homebrew

#### 安装

##### 安装 arm 版 Homebrew

arm 版 Homebrew 默认装在 `/opt/homebrew`。现在直接跑官网脚本就行，不需要手动建目录。

```perl
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

装完按提示配置环境变量即可：

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/homebrew.png)

##### 安装 x86 版 Homebrew（兼容老包）

有些包还没完整支持 arm，我会在需要时装一个 x86 版，用 Rosetta 跑：

```perl
arch -x86_64 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

##### arm / x86 共存怎么用？

共存后通常会有两个 `brew`：

- x86：`/usr/local/bin/brew`
- arm：`/opt/homebrew/bin/brew`

终端执行哪个版本取决于 `PATH` 顺序。为了不混，我一般直接配别名：

```perl
alias abrew='/opt/homebrew/bin/brew' # arm
alias ibrew='arch -x86_64 /usr/local/bin/brew' # x86
```

这样：

- `abrew install xxx`：走 arm
- `ibrew install xxx`：走 x86

✨ **小秘籍（强烈推荐记住）**
Homebrew 安装遇到玄学问题，先删目录再装，很多“神”一样的疑难杂症会直接消失。

- x86 目录：`/usr/local/homebrew/`
- arm 目录：`/opt/homebrew/`

##### 为什么 arm 要用 /opt？

简单说就是路径分工不同：

- `/usr/local`：更偏“本地手工安装”，避免被系统更新覆盖
- `/opt`：更偏“附加应用”，第三方预编译包更适合放这里

现在 macOS 场景下它更多是“隔离 arm 与 x86”的工程选择。参考这篇：

- [在 m1 芯片 Mac 上使用 Homebrew](https://sspai.com/post/63935)

#### 核心概念（看懂就够用）

|    词汇    | 含义                              |
| :--------: | :-------------------------------- |
| formula(e) | 安装包的描述文件                  |
|   cellar   | 安装目录                          |
|    keg     | 某个包的具体目录（cellar 子目录） |
|   bottle   | 预编译包，安装更快                |
|    tap     | 下载源（类似 repo）               |
|    cask    | 安装 macOS 图形化 App             |
|   bundle   | 描述 Homebrew 依赖集合            |

我个人最常用的是 `tap`、`cask`。

#### 软件搜索

不知道包名时我会两种方式：

1. 命令行搜索：`brew search 关键词`
   关键词宁可少字，不能错字。

2. 网页搜索：Homebrew 的搜索站点也很方便

   - [formulae / cask 搜索](https://formulae.brew.sh/cask/)
   - 或直接访问 [https://formulae.brew.sh/](https://formulae.brew.sh/)

#### 环境检查

brew 不正常就跑：

- `brew doctor`

它会把问题列出来，照着修就行。

#### 管理后台服务

后台服务我一般用 `brew services` 管理（本质是简化 `launchctl`）：

- `brew services list`
- `brew services run [服务名]`
- `brew services start [服务名]`
- `brew services stop [服务名]`
- `brew services restart [服务名]`
- `brew services cleanup`

#### 访问应用官网

纠结要不要更新？直接开官网看看：

```sh
brew home 应用名
```

#### 清理缓存

Homebrew 缓存目录：

- `open ~/Library/Caches/Homebrew`

默认 `brew cleanup` 只清 120 天前的缓存，空间紧张时不太够用。

##### 清理未完成下载

`.incomplete` 文件可以直接删：

```perl
rm ~/Library/Caches/Homebrew/downloads/*.incomplete
```

##### cleanup 参数

- `brew cleanup -n`：只预览不执行
- `brew cleanup --prune 0`：清理所有缓存（更彻底但更慢）
- `brew cleanup -s`：只清未安装的软件包缓存

想暴力一点也行（我偶尔会这么干）：

- `rm -rf $(brew --cache)`

参考阅读：

- [从零开始，编写一个 HomeBrew 缓存清理脚本](https://sspai.com/post/65842)

#### 卸载软件（含彻底清理）

Homebrew 卸载 cask 时我一般会加 `--zap`，清关联数据：

```sh
`brew uninstall --cask --force --zap zoom`
```

> ⚠️ `zap` 可能会删除应用间共享文件，谨慎使用。

更多讨论：

- [macOS 各位同学都用什么卸载软件？](https://v2ex.com/t/834735)

---

### iTerm2

我日常最常用的 terminal 其实是 VSCode 集成终端。iTerm2 排第二，但它确实很稳。

- 官网：[iTerm2](https://iterm2.com/index.html)

#### Nerd Fonts（不建议 brew 装）

brew 安装方式：

```perl
brew tap homebrew/cask-fonts
brew cask install font-hack-nerd-font
```

但字体包太大了，我不推荐。更省事的方式：

1. 打开 [https://github.com/ryanoasis/nerd-fonts/releases](https://github.com/ryanoasis/nerd-fonts/releases)
2. 下载你喜欢的字体包
3. 启动台 → 打开「字体册」→ 添加字体

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220330-19g.png)

#### 配色方案

主题仓库：

- [mbadolato/iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes)

导入路径：

- Preferences → Profiles → Colors → Color Presets → Import（.itermcolors）

参考：

- [Honukai theme and colors for Oh My ZSH and iTerm](https://github.com/oskarkrawczyk/honukai-iterm-zsh)

#### Status Bar（沉浸顶栏）

我会把 theme 改成 Minimal（Preferences → Appearance → General → Theme），然后开 Status Bar：

- Profiles → Session → 勾选 Status bar enabled
- 点击 Configure Status Bar 自定义内容
- Appearance 里可以改位置，我一般放 Bottom

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220330-sy.png)

效果大概这样：

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220330-yn.png)

#### 窗口管理（分屏是灵魂）

层级：window → tab → session（pane）

- Window：`Command + N` 新建，`Command + W` 关闭，`Command + Enter` 全屏
- Tab：`Command + T` 新建，`Command + 数字` 切换
- Panes：`Command + D` 垂直分屏，`Command + Shift + D` 水平分屏
  切换：`Command + Option + 方向键` 或 `Command + [ / ]`

#### 回放 / 剪切板历史（真的很神）

- 历史剪切板：`Command + Shift + H`
- 历史命令提示：`Command + ;`
- 即时回放：`Command + Option + B`，左右键前进后退，`ESC` 退出

#### 常用快捷键（每天都在用）

- 清屏：`Command + R` 或 `Ctrl + L`
- 清除当前行：`Ctrl + U`
- 光标到行首：`Ctrl + A`
- 光标到行尾：`Ctrl + E`
- 删除光标前单词：`Ctrl + W`
- 删除到行尾：`Ctrl + K`

---

### VSCode

VSCode 这块我单独写过笔记，直接看这里：

> [VSCode 使用笔记](../notes/vscode/index.md)

---

## macOS 使用技巧

### 显示 / 隐藏文件

需要显示隐藏文件时我用这条：

```perl
defaults write com.apple.finder AppleShowAllFiles Yes && killall Finder
```

要关回去：

```sh
defaults write com.apple.finder AppleShowAllFiles No && killall Finder
```

### 查询硬盘写入量（损耗值）

#### 安装 smartctl

```sh
brew install smartmontools
```

#### 查看硬盘信息

```sh
smartctl -a disk0
```

重点看两个字段：

- `Percentage Used`：损耗值
- `Data Units Written`：写入量

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/SCR-20220328-wth.png)

### 修改启动台图标布局

默认每行 7 个、共 5 行。我一般会改小一点，让页面更“干净”。

- 每行个数：

  ```sh
  defaults write com.apple.dock springboard-columns -int 5
  ```

- 行数：

  ```sh
  defaults write com.apple.dock springboard-rows -int 3
  ```

应用更改需要重启 Launchpad：

```sh
defaults write com.apple.dock ResetLaunchPad -bool TRUE; killall Dock
```

> **注意：** 重启后图标排列会被重置（文件夹、顺序等）。慎重操作。

---

## 有用的链接（用到的时候再装 / 再看）

- 拒绝盗版从我做起：[https://appstorrent.ru/](https://appstorrent.ru/)
- [UTM：开源的多面手 macOS 虚拟机（更新到 2023.1.8）](https://zhuanlan.zhihu.com/p/526352487)
- [macOS defaults list](https://macos-defaults.com/)
- [Awesome Mac](https://github.com/jaywcjlove/awesome-mac/blob/master/README-zh.md)
- [后悔知道晚了：让触控板好用 10 倍的软件](https://zhuanlan.zhihu.com/p/542673617)
- [高效实用的 macOS 内置命令](https://zhuanlan.zhihu.com/p/696672441)
- [打造一个高效的开发终端【Mac 篇】](https://zhuanlan.zhihu.com/p/438124776)
- [Mac 装机记录](https://yutengjing.com/posts/mac-%E8%A3%85%E6%9C%BA%E8%AE%B0%E5%BD%95/)

---
