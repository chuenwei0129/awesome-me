# 只用命令行就能覆盖所有操作而且能提升工作效率的终端使用技巧你喜欢吗<!-- omit in toc -->

***👀 TIPS: 二级标题可返回目录***

---

> ## 目录

- [iTerm2 配置](#iterm2-配置)
  - [安装字体 Nerd Fonts](#安装字体-nerd-fonts)
  - [自定义配色方案](#自定义配色方案)
  - [调整 Status Bar](#调整-status-bar)
  - [窗口管理](#窗口管理)
    - [普通 Window](#普通-window)
    - [选项卡 Tab](#选项卡-tab)
    - [窗格 Panes](#窗格-panes)
  - [回放](#回放)
    - [历史剪切板](#历史剪切板)
    - [历史命令提示](#历史命令提示)
    - [即时回放](#即时回放)
  - [快捷功能](#快捷功能)
    - [智能复制](#智能复制)
    - [妙用 Command](#妙用-command)
  - [常用快捷键](#常用快捷键)
- [BBDown](#bbdown)
  - [注意](#注意)
  - [下载](#下载)
  - [开始使用](#开始使用)

## [iTerm2 配置](#目录)

[iTerm2](https://iterm2.com/index.html) 是默认终端的替代品，也是目前 Mac 系统下最好用的终端工具，集颜值和效率于一身。

### 安装字体 Nerd Fonts

通过 `brew` 来安装：

```sh
brew tap homebrew/cask-fonts
brew cask install font-hack-nerd-font
```

但是不建议这样，因为这个文件太大了，太大了，太大了。。。

我们可以这样：

打开 https://github.com/ryanoasis/nerd-fonts/releases

我们只要下载心仪的字体包，然后**打开启动台 -> 搜索"字体册"并打开 -> 然后添加下载好的字体中的一个或多个即可**。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220330-19g.png)

### 自定义配色方案

iTerm2 主题的 GitHub 仓库位于：[mbadolato/iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes)，其官网 [iterm2colorschemes](https://iterm2colorschemes.com/) 上面我们也可以直接看到相应的主题预览。**这里的主题还支持 macOS 原生 `Terminal.app`**。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220330-dc.png)

打开 iTerm2 的设置：**Preferences → Profiles → Colors → Color Presets**。点击 **import** 选择你想要的主题（.itermcolors 文件）导入。

> [Honukai theme and colors for Oh My ZSH and iTerm](https://github.com/oskarkrawczyk/honukai-iterm-zsh)

### 调整 Status Bar

>  将 iTerm2 自带 theme 修改为 Minimal （ Preferences-Appearance-General-Theme ） 以达到顶栏沉浸式的效果

可以在 Profiles 选项卡，Session 页面最底部看到开启选项。Status bar enabled 选项，勾选上即可打开。点击右边的 **Configure Status Bar** 按钮可设置显示的内容。

可以看到能显示的内容非常多，把上方要显示的内容拖动到下方 Active Components 区域即添加。

在 Preference 页面中点击 Appearance 选项卡，可以设置 Status bar 的位置，修改 Status bar location，我这里改到 Bottom 底部。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220330-sy.png)

**Status bar效果：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220330-yn.png)

显示的内容也可以自己调节：

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220330-uv.png)

### 窗口管理

> 和 Mac 原生的 Terminal 一个关键的区别就是 iTerm2 支持任意分割和创建窗口。按层级划分：window、tab、session

#### 普通 Window

- 新建 Window：`Command + N`
- 关闭 Window：`Command + W`
- 全屏：`Command + Enter`，再按一次还原

#### 选项卡 Tab

- 新建标签：`Command + T`
- 关闭标签：`Command + W`
- 切换标签：`Command + 数字` 或者 `Command + 左 / 右方向`

#### 窗格 Panes

- 垂直分屏：`Command + D`
- 水平分屏：`Command + Shift + D`
- 切换窗格：`Command + Option + 方向键` 或者 `Command + 左右中括号`

### 回放

> 除了窗口划分，`Term2` 的另一杀手锏就是回放。不仅可以查看剪切板的历史记录，还能像视频一样回放窗口内的历史记录！

#### 历史剪切板

对于普通文本编辑器来说，每次复制后都会覆盖之前的剪切板，非常不好用。而 `iTerm2` 提供了和 `IDEA` 一样查看历史剪切板功能，对于 `CV` 工程师来说是相当友好了！

快捷键：`Command + Shift + H`

#### 历史命令提示

命令提示，能够提示最近输入的内容，以及常用的命令；需要注意的是，这里仅仅会输入过的内容。

快捷键：`Command + ;`

当然除了历史命令提示之外，也可以使用系统支持的方式来搜索和查看历史命令。

- 上一条命令：`Ctrl + P(previous)` 或 向上方向键
- 下一条命令： `Ctrl + N(next)` 或 向下方向键
- 搜索历史命令：`Ctrl + R`

#### 即时回放

非常有意思的功能，像录屏一样，记录过去一段时间内窗口显示的内容。

快捷键：`Command + Option + B`

前进/后退：左右箭头/鼠标拖动进度条

退出回放：`ESC`

### 快捷功能

#### 智能复制

在 `item` 中选中即复制，被选择的文本会自动保存在剪切板中。**双击选中**，**三击选中整行**，四击智能选择，可以智能的选中你想要的数据，如网址，邮箱，括号或引号中的数据等。

同样也支持快速粘贴，鼠标选中复制后，可以通过鼠标中键或者 `Command + V` 进行粘贴。同时，选中后也可以通过拖拽实现快速的复制和粘贴。

使用 `Command + F` 即可完成搜索，搜索后，通过 `Tab` 或者 `Tab + Shift` 可向右或向左扩大选中范围，完成复制。

#### 妙用 Command

`Command` 既可以和其他按键组合成快捷键，也可以搭配鼠标实现一些快捷功能。只需要按下 `Command` 在搭配一下操作即可。

- 点击 `url`，调用默认浏览器访问该网址
- 点击文件，调用默认程序打开文件。如果选中的是文件名:数字，且默认文本编辑器是 `Vim` 将会直接打开到这一行。
- 点击文件夹，在 `Finder` 中打开该文件夹
- 配合 `Option` 键，使用鼠标可以选择矩形区域内容

### 常用快捷键

这些快捷键并非 `iTem2` 特有，也是非常基础的快捷键。当然最重要的是它们非常实用，几乎每天都会用到。

- **清屏：`command + r` 或者 `ctrl + l`**
- **清除当前行：`ctrl + u`**
- 删除当前光标的字符：`ctrl + d`
- 删除光标之前的字符：`ctrl + h`
- 删除光标之前的单词：`ctrl + w`
- 删除到文本末尾：`ctrl + k`
- 交换光标处文本：`ctrl + t`
- **光标移动导行首：`ctrl + a`**
- 光标移动到行尾：`ctrl + e`

## [BBDown](#目录)

> 一款命令行式哔哩哔哩下载器，支持 [m1 Mac](https://github.com/nilaoda/BBDown/issues/221)

### 注意

本软件混流时需要外部程序：

- 普通视频：[ffmpeg](https://www.gyan.dev/ffmpeg/builds/) ，或 [mp4box](https://gpac.wp.imt.fr/downloads/)
- 杜比视界：ffmpeg5.0 以上或新版 mp4box.

### 下载

Release 版本：[https://github.com/nilaoda/BBDown/releases](https://github.com/nilaoda/BBDown/releases)

自动构建的测试版本：[https://github.com/nilaoda/BBDown/actions](https://github.com/nilaoda/BBDown/actions)

m1 Mac 需要从 Actions 里下载 [osx_arm64](https://github.com/nilaoda/BBDown/actions/runs/1997270461) 可执行文件，然后[手动为文件增加可执行权限](https://support.apple.com/zh-cn/guide/terminal/apdd100908f-06b3-4e63-8a87-32e71241bab4/mac)

```sh
cd <BBDown 可执行文件所在目录> && chmod 755 BBDown
```

### 开始使用

命令 `BBDown` 只能在 `<BBDown 可执行文件所在目录>` 中执行，可以把它加入环境变量中，也可以直接 alias 别名运行

```sh
# 查看环境变量
echo $PATH

# 临时添加环境变量
export PATH=/Users/gakki/bilibili:$PATH

# 或者直接 alias
alias bd="/Users/gakki/bilibili/BBDown"
```

目前命令行参数支持情况

```sh
BBDown
  BBDown是一个免费且便捷高效的哔哩哔哩下载/解析软件.

Usage:
  BBDown [options] <url> [command]

Arguments:
  <url>  视频地址 或 av|bv|BV|ep|ss

Options:
  -tv, --use-tv-api                      使用TV端解析模式
  -app, --use-app-api                    使用APP端解析模式
  -intl, --use-intl-api                  使用国际版解析模式
  --use-mp4box                           使用MP4Box来混流
  -hevc, --only-hevc                     只下载hevc编码
  -avc, --only-avc                       只下载avc编码
  -av1, --only-av1                       只下载av1编码
  -info, --only-show-info                仅解析而不进行下载
  -hs, --hide-streams                    不要显示所有可用音视频流
  -ia, --interactive                     交互式选择清晰度
  --show-all                             展示所有分P标题
  --use-aria2c                           调用aria2c进行下载(你需要自行准备好二进制可执行文件)
  --aria2c-proxy <aria2c-proxy>          调用aria2c进行下载时的代理地址配置
  -mt, --multi-thread                    使用多线程下载
  -p, --select-page <select-page>        选择指定分p或分p范围：(-p 8 或 -p 1,2 或 -p 3-5 或 -p ALL)
  --audio-only                           仅下载音频
  --video-only                           仅下载视频
  --sub-only                             仅下载字幕
  --no-padding-page-num                  不给分P序号补零
  --debug                                输出调试日志
  --skip-mux                             跳过混流步骤
  --skip-subtitle                        跳过字幕下载
  --skip-cover                           跳过封面下载
  -dd, --download-danmaku                下载弹幕
  --add-dfn-subfix                       为文件加入清晰度后缀，如XXX[1080P 高码率]
  --no-part-prefix                       多P时，不要加入分P前缀，如[P1],[P2]等
  --language <language>                  设置混流的音频语言(代码)，如chi, jpn等
  -c, --cookie <cookie>                  设置字符串cookie用以下载网页接口的会员内容
  -token, --access-token <access-token>  设置access_token用以下载TV/APP接口的会员内容
  --work-dir <work-dir>                  设置程序的工作目录
  --ffmpeg-path <ffmpeg-path>            设置ffmpeg的路径
  --mp4box-path <mp4box-path>            设置mp4box的路径
  --aria2c-path <aria2c-path>            设置aria2c的路径
  --delay-per-page <delay-per-page>      设置下载合集分P之间的下载间隔时间(单位: 秒, 默认无间隔)
  --version                              Show version information
  -?, -h, --help                         Show help and usage information

Commands:
  login    通过APP扫描二维码以登录您的WEB账号
  logintv  通过APP扫描二维码以登录您的TV账号
```

<!-- TODO: vim -->
