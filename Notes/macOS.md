## 我的 macOS 工具清单

> 本文内容：**mac** 好用的软件、**iterm2** 配置、谷歌插件、油猴脚本、网站导航

### mac 好用的软件

#### iMobie M1 App Checker：应用检测工具
[iMobie M1 App Checker](https://www.imobie.com/cn/m1-app-checker/) 是一款免费且简单好用的应用检测工具。它可以帮助您检查您喜爱的 Mac 或 iPhone 应用是否在 M1 Mac 上也支持。同时，它还可以通过导入 .ipa 文件使您的 iPhone 应用在 M1 Mac 上运行。

#### Telegram：跨平台的即时通信软件

- 🖥 [官网](https://telegram.org/)

**客户端汉化**

1. 点击 https://t.me/setlanguage/classic-zh-cn

2. 然后 点击 CHANGE

3. 重启即可完成汉化操作

**iOS 官方原生客户端进入 Apple 限制群（开车群）的方法**

- Windows 电脑桌面客户端：左上角三短线：设置 → 隐私 → 开启"显示含有敏感内容的媒体"

- macOS 电脑桌面客户端：设置 → 隐私安全 → 开启"显示含有敏感内容的媒体"

- 网页版：手机或电脑浏览器访问官方网页版地址：https://web.telegram.org，对话列表 → 左上角 / 右上角三短线 → Settings → 打开"Show Sensitive Content"

**频道或群组分享**

- [中文频道大全-TG 上的好 123](https://t.me/hao123bots)

- [JIKE 社区](https://t.me/jikeinfo)

- [Newlearner の自留地](https://t.me/NewlearnerChannel)

- [4K 影视资源分享](https://t.me/Remux_2160P)

#### Downie 4：优秀的网页在线视频下载工具

- 🖥 [官网](https://software.charliemonroe.net/downie/)

支持包括爱奇艺、优酷、土豆、腾讯视频、网易云音乐、哔哩哔哩 Bilibili 等国内外 10000 多个在线视频网站的视频下载，特点是下载成功率很高。



#### 开源软件

| 软件                                               | 备注                                                                                               |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| [Keycastr](https://github.com/keycastr/keycastr)   | 录屏好帮手，实时显示按键操作的小工具                                                               |
| [Thor](https://github.com/gbammc/Thor)             | MAC 应用程序开启 /切换工具，通过它，给应用程序设定快捷键，即可使用快捷键迅速打开或切换应用         |
| [NTFSTool](https://github.com/ntfstool/ntfstool)   | 免费的 NTFS 读写工具，支持 NTFS 磁盘读写、挂载，推出、管理等功能                                   |
| [Rectangle](https://github.com/rxhanson/Rectangle) | 开源的窗口管理器，基于 Spectacle 应用，用 Swift 语言编写，让用户使用键盘快捷键来移动和调整窗口大小 |
| [Keka](https://github.com/aonez/Keka)              | 简单好用的解压缩工具                                                                               |
| [IINA](https://github.com/iina/iina)               | 体验最佳的视频播放器                                                                               |
| [ClashX](https://github.com/yichengchen/clashX)    | 基于 clash 的一款支持规则过滤的科学上网工具                                                        |
| [Motrix](https://github.com/agalwood/Motrix)       | 全能的下载工具，支持下载 HTTP、FTP、BT、磁力链、百度网盘等资源                                     |
| [Bob](https://github.com/ripperhe/Bob)             | 简小好用的翻译工具，支持语言自动检测，截图翻译                                                     |
| [Hidden Bar](https://github.com/dwarvesf/hidden)   | 简洁的工具栏隐藏软件                                                                               |

### mac 使用技巧

#### 常用快捷键

control option 空格 表情
强制退出 option commond esc
commod + k

### iterm2

安装字体 Nerd Fonts
上文我们已经安装了 PowerFonts，如果需要使用一些图标，这个字体是不够用的，我们需要一个强大的字体： Nerd Fonts，它支持下面这么多种图标：


安装
你可以如官网所说，通过 brew 来安装：

brew tap homebrew/cask-fonts
brew cask install font-hack-nerd-font
但是我不建议这样，包括不建议你下载 zip 包，因为这个文件太大了，太大了，太大了。。。

我们可以这样：

打开 https://github.com/ryanoasis/nerd-fonts/releases，滑动页面找到 Assets 区域，如图：


我们只要下载箭头所指的 Hack.zip 这个字体包，解压缩之后就会获得一些 ttf 字体文件，双击安装即可。

#### 普通 Window

- 新建 Window：`Command + N`
- 关闭 Window：`Command + W`
- 全屏：`Command + Enter`，再按一次还原
- 展示所有窗口：`Command + Option + E`
- 关闭窗口：`Command + W`

#### 选项卡 Tab

- 新建标签：`Command + t`
- 关闭标签：`Command + w`
- 切换标签：`Command + 数字` 或者 `Command + 左 / 右方向`

#### 窗格 Panes

- 垂直分屏：`Command + d`
- 水平分屏：`Command + shift + d`
- 切换窗格：`Command + Option + 方向键` 或者 `Command + 左右中括号`

#### 即时回放

>除了窗口划分，Term2 的另一杀手锏就是回放。不仅可以查看剪切板的历史记录，还能像视频一样回放窗口内的历史记录！

##### 历史剪切板

对于普通文本编辑器来说，每次复制后都会覆盖之前的剪切板，非常不好用。而 iTerm2 提供了和 IDEA 一样查看历史剪切板功能，对于 CV 工程师来说是相当友好了！

快捷键：`Command + Shift + h`

##### 历史命令提示

命令提示，能够提示最近输入的内容，以及常用的命令；需要注意的是，这里仅仅会输入过的内容。

快捷键：`Command + ;`

当然除了历史命令提示之外，也可以使用系统支持的方式来搜索和查看历史命令。

- 上一条命令：`Ctrl + p(previous)` 或 向上方向键
- 下一条命令： `Ctrl + n(next)` 或 向下方向键
- 搜索历史命令：`ctrl + r`

##### 即时回放

非常有意思的功能，像录屏一样，记录过去一段时间内窗口显示的内容。

快捷键：`Command + Option + b`

前进/后退：左右箭头/鼠标拖动进度条

退出回放：`esc`

#### 快捷功能

##### 智能复制

在 item 中选中即复制，被选择的文本会自动保存在剪切板中。**双击选中**，**三击选中整行**，四击智能选择，可以智能的选中你想要的数据，如网址，邮箱，括号或引号中的数据等。

同样也支持快速粘贴，鼠标选中复制后，可以通过鼠标中键或者 `Command + v` 进行粘贴。同时，选中后也可以通过拖拽实现快速的复制和粘贴。

使用 `Command + f` 即可完成搜索，搜索后，通过 `Tab` 或者 `Tab + Shift` 可向右或向左扩大选中范围，完成复制。

##### 妙用 Command

`Command` 既可以和其他按键组合成快捷键，也可以搭配鼠标实现一些快捷功能。只需要按下 `Command` 在搭配一下操作即可。

- 点击 url，调用默认浏览器访问该网址
- 点击文件，调用默认程序打开文件。如果选中的是文件名:数字，且默认文本编辑器是 `Vim` 将会直接打开到这一行。
- 点击文件夹，在 `Finder` 中打开该文件夹
- 配合 `Option` 键，使用鼠标可以选择矩形区域内容

#### 常用快捷键

这些快捷键并非 iTem2 特有，也是非常基础的快捷键。当然最重要的是它们非常实用，几乎每天都会用到。

- 清屏：`Command + r` 或者 `ctrl + l`
- 清除当前行：`ctrl + u`
- 删除当前光标的字符：`ctrl + d`
- 删除光标之前的字符：`ctrl + h`
- 删除光标之前的单词：`ctrl + w`
- 删除到文本末尾：`ctrl + k`
- 交换光标处文本：`ctrl + t`
- 光标移动导行首：`Ctrl + a`
- 光标移动到行位：`Ctrl + e`