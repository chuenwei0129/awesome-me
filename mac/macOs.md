# 我的 MAC 工具清单<!-- omit in toc -->

> 本文内容：**mac** 好用的软件、**iterm2** 配置、谷歌插件、油猴脚本、网站导航

- [mac 好用的软件](#mac-好用的软件)
  - [iMobie M1 App Checker：M1 Mac 应用检测工具](#imobie-m1-app-checkerm1-mac-应用检测工具)
  - [Telegram：跨平台的即时通信软件](#telegram跨平台的即时通信软件)
  - [Downie 4：优秀的网页在线视频下载工具](#downie-4优秀的网页在线视频下载工具)
- [开源软件](#开源软件)
- [iterm2](#iterm2)
  - [安装字体 Nerd Fonts](#安装字体-nerd-fonts)
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
- [chrome 插件](#chrome-插件)
- [油猴脚本](#油猴脚本)
- [为 Chrome 设置搜索引擎关键词](#为-chrome-设置搜索引擎关键词)
- [网站导航](#网站导航)

## mac 好用的软件

### iMobie M1 App Checker：M1 Mac 应用检测工具

- 🖥 [官网](https://www.imobie.com/cn/m1-app-checker/)

`iMobie M1 App Checker` 是一款免费且简单好用的应用检测工具。它可以帮助您检查您喜爱的 `Mac` 或 `iPhone` 应用是否在 `M1 Mac` 上也支持。同时，它还可以通过导入 `.ipa` 文件使您的 `iPhone` 应用在 `M1 Mac` 上运行!

### Telegram：跨平台的即时通信软件

- 🖥 [官网](https://telegram.org/)

- [x] 客户端汉化

1. 点击 https://t.me/setlanguage/classic-zh-cn

2. 然后 点击 CHANGE

3. 重启即可完成汉化操作

- [x] `iOS` 官方原生客户端进入 `Apple` 限制群（开车群）的方法

- `Windows` 电脑桌面客户端：左上角三短线：**设置 → 隐私 → 开启** "显示含有敏感内容的媒体"

- `macOS` 电脑桌面客户端：**设置 → 隐私安全 → 开启** "显示含有敏感内容的媒体"

- 网页版：手机或电脑浏览器访问官方网页版地址：https://web.telegram.org，**对话列表 → 左上角 / 右上角三短线 → Settings → 打开** "Show Sensitive Content"

- [x] 频道或群组分享

- [中文频道大全-TG 上的好 123](https://t.me/hao123bots)

- [JIKE 社区](https://t.me/jikeinfo)

- [Newlearner の自留地](https://t.me/NewlearnerChannel)

- [4K 影视资源分享](https://t.me/Remux_2160P)

### Downie 4：优秀的网页在线视频下载工具

- 🖥 [官网](https://software.charliemonroe.net/downie/)

支持包括爱奇艺、优酷、土豆、腾讯视频、网易云音乐、哔哩哔哩 `Bilibili` 等国内外 **10000** 多个在线视频网站的视频下载，特点是下载成功率很高

## 开源软件

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
| [Gifski](https://github.com/sindresorhus/Gifski)   | 在 Mac 上将视频转换为高质量的 GIF                                                                               |
| [LyricsX](https://github.com/ddddxxx/LyricsX)   | 功能完备的歌词工具                                                                               |
| [OpenEmu](https://github.com/OpenEmu/OpenEmu)   | macOS 老游戏模拟器                                                                               |
| [PicGo](https://github.com/Molunerfinn/PicGo)   | 图床管理工具                                                                               |
| [Maccy](https://github.com/p0deje/Maccy)   | 轻量级的剪贴板管理工具                                                                               |

## iterm2

### 安装字体 Nerd Fonts

通过 brew 来安装：

```sh
brew tap homebrew/cask-fonts
brew cask install font-hack-nerd-font
```

但是不建议这样，包括不建议你下载 zip 包，因为这个文件太大了，太大了，太大了。。。

我们可以这样：

打开 https://github.com/ryanoasis/nerd-fonts/releases

我们只要下载单个字体包，解压缩之后就会获得一些 `ttf` 字体文件，双击安装即可。

### 普通 Window

- 新建 Window：`Command + N`
- 关闭 Window：`Command + W`
- 全屏：`Command + Enter`，再按一次还原
- 展示所有窗口：`Command + Option + E`
- 关闭窗口：`Command + W`

### 选项卡 Tab

- 新建标签：`Command + t`
- 关闭标签：`Command + w`
- 切换标签：`Command + 数字` 或者 `Command + 左 / 右方向`

### 窗格 Panes

- 垂直分屏：`Command + d`
- 水平分屏：`Command + shift + d`
- 切换窗格：`Command + Option + 方向键` 或者 `Command + 左右中括号`

### 即时回放

>除了窗口划分，Term2 的另一杀手锏就是回放。不仅可以查看剪切板的历史记录，还能像视频一样回放窗口内的历史记录！

#### 历史剪切板

对于普通文本编辑器来说，每次复制后都会覆盖之前的剪切板，非常不好用。而 iTerm2 提供了和 IDEA 一样查看历史剪切板功能，对于 CV 工程师来说是相当友好了！

快捷键：`Command + Shift + h`

#### 历史命令提示

命令提示，能够提示最近输入的内容，以及常用的命令；需要注意的是，这里仅仅会输入过的内容。

快捷键：`Command + ;`

当然除了历史命令提示之外，也可以使用系统支持的方式来搜索和查看历史命令。

- 上一条命令：`Ctrl + p(previous)` 或 向上方向键
- 下一条命令： `Ctrl + n(next)` 或 向下方向键
- 搜索历史命令：`ctrl + r`

#### 即时回放

非常有意思的功能，像录屏一样，记录过去一段时间内窗口显示的内容。

快捷键：`Command + Option + b`

前进/后退：左右箭头/鼠标拖动进度条

退出回放：`esc`

### 快捷功能

#### 智能复制

在 item 中选中即复制，被选择的文本会自动保存在剪切板中。**双击选中**，**三击选中整行**，四击智能选择，可以智能的选中你想要的数据，如网址，邮箱，括号或引号中的数据等。

同样也支持快速粘贴，鼠标选中复制后，可以通过鼠标中键或者 `Command + v` 进行粘贴。同时，选中后也可以通过拖拽实现快速的复制和粘贴。

使用 `Command + f` 即可完成搜索，搜索后，通过 `Tab` 或者 `Tab + Shift` 可向右或向左扩大选中范围，完成复制。

#### 妙用 Command

`Command` 既可以和其他按键组合成快捷键，也可以搭配鼠标实现一些快捷功能。只需要按下 `Command` 在搭配一下操作即可。

- 点击 url，调用默认浏览器访问该网址
- 点击文件，调用默认程序打开文件。如果选中的是文件名:数字，且默认文本编辑器是 `Vim` 将会直接打开到这一行。
- 点击文件夹，在 `Finder` 中打开该文件夹
- 配合 `Option` 键，使用鼠标可以选择矩形区域内容

### 常用快捷键

这些快捷键并非 `iTem2` 特有，也是非常基础的快捷键。当然最重要的是它们非常实用，几乎每天都会用到。

- 清屏：`Command + r` 或者 `ctrl + l`
- 清除当前行：`ctrl + u`
- 删除当前光标的字符：`ctrl + d`
- 删除光标之前的字符：`ctrl + h`
- 删除光标之前的单词：`ctrl + w`
- 删除到文本末尾：`ctrl + k`
- 交换光标处文本：`ctrl + t`
- 光标移动导行首：`Ctrl + a`
- 光标移动到行位：`Ctrl + e`

## chrome 插件

[uBlock Origin](https://chrome.google.com/webstore/detail/ublock-origin-development/cgbcahbpdhpcegmbfconppldiemgcoii)：日常上网必备，屏蔽各种广告。

[沙拉查词-聚合词典划词翻译](https://chrome.google.com/webstore/detail/%E6%B2%99%E6%8B%89%E6%9F%A5%E8%AF%8D-%E8%81%9A%E5%90%88%E8%AF%8D%E5%85%B8%E5%88%92%E8%AF%8D%E7%BF%BB%E8%AF%91/cdonnmffkdaoajfknoeeecmchibpmkmg)：划词翻译、网页翻译

[掘金](https://chrome.google.com/webstore/detail/%E6%8E%98%E9%87%91/lecdifefmmfjnjjinhaennhdlmcaeeeb)：为程序员、设计师、产品经理每日发现优质内容

[图片助手](https://chrome.google.com/webstore/detail/imageassistant-batch-imag/dbjbempljhcmhlfpfacalomonjpalpko)：批量图片下载器

[Web for TikTok](https://chrome.google.com/webstore/detail/web-for-tiktok/dedphjedjalglppdfpmmibdbbkmifnbb)：用 Chrome 刷海外版抖音 TikTok，下载 Tiktok 短视频

[Listen1](https://chrome.google.com/webstore/detail/listen-1/indecfegkejajpaipjipfkkbedgaodbp)：支持多平台的音乐播放器

[Similarsites](https://chrome.google.com/webstore/detail/similar-sites-discover-re/necpbmbhhdiplmfhmjicabdeighkndkn)：发现类似的网站

[FireShot](https://chrome.google.com/webstore/detail/take-webpage-screenshots/mcbpblocgmgfnpjjppndjkmgjaogfceg)：网页截图

[Screenity](https://chrome.google.com/webstore/detail/screenity-screen-recorder/kbbdabhdfibnancpjfhlkhafgdilcnji)：屏幕录像和标注工具

[前端助手](https://chrome.google.com/webstore/detail/fehelper%E5%89%8D%E7%AB%AF%E5%8A%A9%E6%89%8B/pkgccpejnmalmdinmhkkfafefagiiiad)：JSON 自动格式化、手动格式化，支持排序、解码、下载等，更多功能可在配置页按需安装！

[AHA Music](https://chrome.google.com/webstore/detail/aha-music-song-finder-for/dpacanjfikmhoddligfbehkpomnbgblf)：听歌识曲

[Alexa Traffic Rank](https://chrome.google.com/webstore/detail/alexa-traffic-rank/cknebhggccemgcnbidipinkifmmegdel)：网站排名

[OneTab Plus](https://chrome.google.com/webstore/detail/onetab-plustab-manage-pro/lepdjbhbkpfenckechpdfohdmkhogojf)：标签效率管理扩展

[Open In IINA](https://chrome.google.com/webstore/detail/open-in-iina/pdnojahnhpgmdhjdhgphgdcecehkbhfo)：在 IINA 中打开视频和音频

[Search by Image](https://chrome.google.com/webstore/detail/search-by-image/cnojnbdhbhnkbcieeekonklommdnndci)：图像搜索工具，支持各种搜索引擎

[哔哩哔哩助手](https://chrome.google.com/webstore/detail/%E5%93%94%E5%93%A9%E5%93%94%E5%93%A9%E5%8A%A9%E6%89%8B%EF%BC%9Abilibilicom-%E7%BB%BC%E5%90%88%E8%BE%85%E5%8A%A9%E6%89%A9%E5%B1%95/kpbnombpnpcffllnianjibmpadjolanh)：助你快速成为 B 站老司机

[Wappalyzer](https://chrome.google.com/webstore/detail/wappalyzer/gppongmhjkpfnbhagpmjfkannfbllamg)：一键分析网站技术栈

[speedtest](https://chrome.google.com/webstore/detail/speedtest-by-ookla/pgjjikdiikihdfpoppgaidccahalehjh)：网络测速插件

[loom](https://chrome.google.com/webstore/detail/loom-for-chrome/liecbddmkiiihnedobmlmillhodjkdmb)：翻录网页视频神器

[chrono](https://chrome.google.com/webstore/detail/chrono-download-manager/mciiogijehkdemklbdcbfkefimifhecn)：让 Chrome 下载资源更容易

[Downie](https://github.com/charlieMonroe/DownieExtensions)：在浏览器中打开 downie 链接

[扩展管理器](https://chrome.google.com/webstore/detail/extension-manager/gjldcdngmdknpinoemndlidpcabkggco)： 管理你的 Chrome 扩展

[Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)：油猴脚本，给浏览器开个挂！

## 油猴脚本

> 使用自定义网站脚本的插件，可以使用各种 **user.js** 脚本，相当于小型的插件管理器，下面是我常用的脚本，其他用途的脚本请自行探索 [Greasy Fork](https://greasyfork.org/zh-CN)、[Sleazy Fork](https://sleazyfork.org/zh-CN)、[OpenUserJS](https://openuserjs.org/)

[计时器掌控者](https://greasyfork.org/zh-CN/scripts/372673-%E8%AE%A1%E6%97%B6%E5%99%A8%E6%8E%8C%E6%8E%A7%E8%80%85-%E8%A7%86%E9%A2%91%E5%B9%BF%E5%91%8A%E8%B7%B3%E8%BF%87-%E8%A7%86%E9%A2%91%E5%B9%BF%E5%91%8A%E5%8A%A0%E9%80%9F%E5%99%A8)：视频广告跳过 | 视频广告加速器

[豆瓣资源下载大师](https://greasyfork.org/zh-CN/scripts/329484-%E8%B1%86%E7%93%A3%E8%B5%84%E6%BA%90%E4%B8%8B%E8%BD%BD%E5%A4%A7%E5%B8%88-1%E7%A7%92%E6%90%9E%E5%AE%9A%E8%B1%86%E7%93%A3%E7%94%B5%E5%BD%B1-%E9%9F%B3%E4%B9%90-%E5%9B%BE%E4%B9%A6%E4%B8%8B%E8%BD%BD)：豆瓣电影 | 音乐 | 图书下载

[文本选中复制](https://greasyfork.org/zh-CN/scripts/405130-%E6%96%87%E6%9C%AC%E9%80%89%E4%B8%AD%E5%A4%8D%E5%88%B6)：解除网站不允许复制的限制，文本选中后点击复制按钮即可复制

[CSDN 助手](https://greasyfork.org/zh-CN/scripts/378351-%E6%8C%81%E7%BB%AD%E6%9B%B4%E6%96%B0-csdn%E5%B9%BF%E5%91%8A%E5%AE%8C%E5%85%A8%E8%BF%87%E6%BB%A4-%E4%BA%BA%E6%80%A7%E5%8C%96%E8%84%9A%E6%9C%AC%E4%BC%98%E5%8C%96-%E4%B8%8D%E7%94%A8%E5%86%8D%E7%99%BB%E5%BD%95%E4%BA%86-%E8%AE%A9%E4%BD%A0%E4%BD%93%E9%AA%8C%E4%BB%A4%E4%BA%BA%E6%83%8A%E5%96%9C%E7%9A%84%E5%B4%AD%E6%96%B0csdn)：CSDN 广告完全过滤、人性化脚本优化

[知乎网页助手](https://greasyfork.org/zh-CN/scripts/384172-%E7%9F%A5%E4%B9%8E%E7%BD%91%E9%A1%B5%E5%8A%A9%E6%89%8B)：最全面的知乎助手了

[超级视频助手](https://greasyfork.org/zh-CN/scripts/418804-%E8%B6%85%E7%BA%A7%E8%A7%86%E9%A2%91%E5%8A%A9%E6%89%8B-%E5%93%94%E5%93%A9%E5%93%94%E5%93%A9%E8%A7%A3%E9%94%81%E5%A4%A7%E4%BC%9A%E5%91%98-b%E7%AB%99%E8%A7%86%E9%A2%91%E8%A7%A3%E6%9E%90%E4%B8%8B%E8%BD%BD-a%E7%AB%99%E8%A7%86%E9%A2%91%E8%A7%A3%E6%9E%90%E4%B8%8B%E8%BD%BD-%E7%88%B1%E5%A5%87%E8%89%BA-%E8%85%BE%E8%AE%AF-%E4%BC%98%E9%85%B7-%E8%8A%92%E6%9E%9C%E7%AD%89%E5%85%A8%E7%BD%91vip%E8%A7%86%E9%A2%91%E5%85%8D%E8%B4%B9%E7%9C%8B%E7%A0%B4%E8%A7%A3%E5%8E%BB%E5%B9%BF%E5%91%8A-%E5%85%8D%E8%B7%B3%E7%9B%B4%E6%8E%A5%E7%9C%8B-youtube-facebook%E7%AD%89%E8%A7%86%E9%A2%91%E8%A7%A3%E6%9E%90%E4%B8%8B%E8%BD%BD)：全网 VIP 视频免费看

[拒绝二维码登陆](https://greasyfork.org/zh-CN/scripts/27183-%E6%8B%92%E7%BB%9D%E4%BA%8C%E7%BB%B4%E7%A0%81%E7%99%BB%E5%BD%95-%E6%B7%98%E5%AE%9D-%E4%BA%AC%E4%B8%9C%E7%AD%89%E7%BD%91%E7%AB%99%E9%BB%98%E8%AE%A4%E5%87%BA%E7%8E%B0%E8%B4%A6%E5%8F%B7%E5%AF%86%E7%A0%81%E7%99%BB%E5%BD%95%E7%95%8C%E9%9D%A2)：淘宝、京东、阿里云等网站默认使用账号密码登录，不出现二维码登录界面

[解除 B 站区域限制](https://greasyfork.org/zh-CN/scripts/25718-%E8%A7%A3%E9%99%A4b%E7%AB%99%E5%8C%BA%E5%9F%9F%E9%99%90%E5%88%B6)：解除 B 站 区域限制; 只对 HTML5 播放器生效

[HTML5 视频截图器](https://greasyfork.org/zh-CN/scripts/370819-html5%E8%A7%86%E9%A2%91%E6%88%AA%E5%9B%BE%E5%99%A8)：基于 HTML5 的简单原生视频截图，可控制快进/逐帧/视频调速，支持自定义快捷键

## 为 Chrome 设置搜索引擎关键词

Chrome 的搜索栏同时支持多种搜索：

1. 进入设置搜索引擎的界面：为百度搜索设置 关键字 `bd`

2. 搜索成功! 在地址栏输入关键词 `bd` 后, 按空格键, 就可以快速切换到百度搜索了

## 网站导航

- [图片无损放大 - waifu2x](http://waifu2x.udp.jp/index.zh-CN.html)
- [极简插件](https://chrome.zzzmh.cn/index#index)
