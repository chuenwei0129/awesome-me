# 我是如何使用 Terminal 的<!-- omit in toc -->

- [iTerm2 配置](#iterm2-配置)
  - [安装字体 Nerd Fonts](#安装字体-nerd-fonts)
  - [自定义配色方案](#自定义配色方案)
  - [调整 Status Bar](#调整-status-bar)
  - [窗口管理](#窗口管理)
    - [普通 Window](#普通-window)
    - [选项卡 Tab](#选项卡-tab)
    - [窗格 Panes](#窗格-panes)
  - [即时回放](#即时回放)
    - [历史剪切板](#历史剪切板)
    - [历史命令提示](#历史命令提示)
    - [即时回放](#即时回放-1)
  - [快捷功能](#快捷功能)
    - [智能复制](#智能复制)
    - [妙用 Command](#妙用-command)
  - [常用快捷键](#常用快捷键)

## iTerm2 配置

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

### 即时回放

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

- 清屏：`command + r` 或者 `ctrl + l`
- 清除当前行：`ctrl + u`
- 删除当前光标的字符：`ctrl + d`
- 删除光标之前的字符：`ctrl + h`
- 删除光标之前的单词：`ctrl + w`
- 删除到文本末尾：`ctrl + k`
- 交换光标处文本：`ctrl + t`
- 光标移动导行首：`ctrl + a`
- 光标移动到行尾：`ctrl + e`

<!-- TODO: vim -->
