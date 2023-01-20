# 最傻逼的用户，被 macOS 百般折磨后，努力至今，终尝回报，突然得到了最强使用技巧

## m1 芯片 Mac 重装系统

> [[m1-reinstall]]

## macOS 中 “安全性与隐私” 没有允许任何来源

如果下载的应用软件没有通过 App Store 下载，而是来自第三方网站或者平台，那么打开时可能会提示 **XXX 已损坏，无法打开。您应该将它移到废纸篓** 或者 **打不开 XXX,因为它来自身份不明的开发者**，从而无法运行该应用软件。

原因：这是因为 Mac 启用了安全机制，默认只信任 App Store 下载的软件以及拥有开发者 ID 签名的软件，但是同时也阻止了非开发者签名的软件。

为了安全，macOS 新版本已经默认屏蔽未知开发者选项，需要用命令手动开启

```perl
sudo spctl --master-disable
```

如果以后想撤消它，则可以返回 Terminal，并运行以下命令：

```perl
sudo spctl --master-enable
```




- 2️⃣ [[gfw]]：系统代理
- 3️⃣ [[homebrew]]：Homebrew 包管理
- 4️⃣ [[macos-apps]]：macOS 软件清单
- 5️⃣ [[m1-disk]]：M1 Mac 查询硬盘使用量
- 6️⃣ [[macos-speedtest]]：判断 macOS 的网络质量
- 7️⃣ 
- 8️⃣
- 9️⃣
- 🔟

命令行的艺术
[[macos-tips]]：macOS 使用技巧

## 用自带工具快速判断 macOS 的网络质量

在打开的终端窗口中，输入 `networkQuality`（注意大小写），然后回车。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/network.png)

「responsiveness」，是指上传和下载的综合「响应能力」，根据 Apple 的[支持文档](https://support.apple.com/zh-cn/HT212313)，它的衡量指标是每分钟往返次数 (RPM)，即在正常工作条件下，网络能够在一分钟内完成的连续往返次数或事务数量。

根据 RPM 的高低数值不同，`networkQuality` 对响应能力的评价也分为「低」「中」「高」三个等级。这可以大致反映当前网络的拥堵程度，从而帮助间接估测视频通话、游戏等应用的效果：

- 评价为「Low」说明同一网络的设备会互相影响，导致其他设备的网络连接不可靠；
- 评价为「Medium」则表明多设备共享网络时会造成短暂卡顿；
- 评价为「High」则最为理想，表明网络通畅，多设备并行联网也能和平共处，保持良好连通。

此外，`networkQuality` 命令可以接受一些参数。

- `-c` 会输出 json 格式的测速详情；
- `-s` 会分开测试下载和上传，而非像默认那样对两者同时测试（同时测试更能反映通话等真实应用的场景）；
- `-I` 可以测试特定网络接口的速度，例如，命令 `networkQuality -I en0` 是指测试内建 Wi-Fi 网络的速度。

更多参数和说明，可以用如下命令查阅手册页面 `man networkQuality`

## macOS DMG 安装后无法打开，提示损坏

网络下载应用被 Apple 添加隔离标识，终端输入命令解除即可：

```perl
# sudo xattr -r -d com.apple.quarantine
sudo xattr -r -d com.apple.quarantine <应用路径>

# 比如我装 m1 版本的语雀
sudo xattr -rd com.apple.quarantine /Applications/语雀.app
```

## macOS 软件清单

### 📝 清单

![20221104001932](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/ts/20221104001932.png)

### 🔎 关联

|                           软件                            |                                                  功能简述                                                  |                       相关                       |
| :-------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------: | :----------------------------------------------: |
|          [bob](https://github.com/ripperhe/Bob)           |                       一款 Mac 端翻译软件，支持划词翻译、截图翻译以及手动输入翻译。                        |                     [[bob]]                      |
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

## [有用的链接](#目录)

- <https://github.com/jaywcjlove/awesome-mac/blob/master/README-zh.md>

[//begin]: # "Autogenerated link references for markdown compatibility"
[m1-reinstall]: ../bubbles/mac/m1-reinstall.md "m1 芯片 Mac 重装系统"
[gfw]: gfw.md "越过长城，走向世界"
[homebrew]: ../bubbles/mac/homebrew.md "Homebrew 包管理"
[macos-apps]: ../bubbles/mac/macos-apps.md "macOS 软件清单"
[m1-disk]: ../bubbles/mac/m1-disk.md "M1 Mac 查询硬盘使用量"
[macos-speedtest]: ../bubbles/mac/macos-speedtest.md "判断 macOS 的网络质量"
[macos-tips]: ../bubbles/mac/macos-tips.md "使用技巧"
[bob]: ../bubbles/mac/bob.md "我是如何使用 Bob 的"
[//end]: # "Autogenerated link references"
