# 我的 Windows 工具清单<!-- omit in toc -->

- [常用软件](#常用软件)
	- [PowerToys：系统增强工具](#powertoys系统增强工具)
		- [功能简介](#功能简介)
			- [PowerToys Run：快速启动](#powertoys-run快速启动)
			- [Image Resizer：图片尺寸调整](#image-resizer图片尺寸调整)
			- [PowerRename：文件重命名](#powerrename文件重命名)
			- [Shortcut Guide：系统快捷键指南](#shortcut-guide系统快捷键指南)
		- [Keyboard Manager：键盘映射](#keyboard-manager键盘映射)
	- [微软官方已删除数据恢复工具](#微软官方已删除数据恢复工具)
	- [Edge & Chrome：浏览器](#edge--chrome浏览器)
		- [插件（可通用）](#插件可通用)
	- [PotPlayer：视频播放器](#potplayer视频播放器)
		- [常用快捷键](#常用快捷键)
	- [qBittorrent：BT 下载](#qbittorrentbt-下载)
	- [Dism++：Windows 的一个集中式的系统管理工具](#dismwindows-的一个集中式的系统管理工具)
	- [其他](#其他)

## 常用软件

### [PowerToys](https://github.com/microsoft/PowerToys/releases)：系统增强工具

#### 功能简介

##### PowerToys Run：快速启动

快速启动器，类似于第三方应用中的 [WOX](http://www.wox.one/) ，能够快速定位软件、文件或是文件夹并迅速打开。

> 操作技巧

`Alt + Space` 的操作唤出 PowerToys Run 的面板

被选中（深色标出）的选项右侧会出现数个选项，对不同类型的选项有不同的操作。

- 应用程序可以选择以管理员方式打开，快捷键 `Ctrl + Shift + Enter`
- 文件或文件夹则可以复制所在的路径，快捷键 `Ctrl + C`
- 文件还可以选择打开文件所在位置，快捷键 `Ctrl + Shift + E`

通过直接输入公式来通过 Windows 自带的计算器进行计算操作。经过测试，可以使用如 abs，sqrt 等等。

![](../Images/tool_list_2.png)

另外还能够通过 `>` 来执行一些命令。

![](../Images/tool_list_3.png)

##### Image Resizer：图片尺寸调整

在 PowerToys 打开 Enable Image Resizer 之后，在文件资源管理器中右键单击一个或选定多个图像文件，然后从右键菜单中选择「重设图片大小」。

![](../Images/tool_list_1.png)

- 关于尺寸，用户可以添加新的预设大小。可以配置为填充，适合或拉伸。用于调整大小的单位也可以设置为厘米、英寸、百分比和像素。
- 关于编码，用户可以更改回滚编码器(当不能保存为原始格式时使用的编码器)并修改 PNG、JPEG 和 TIFF 的设置。
- 关于文件，用户可以修改调整大小后的图像文件名的格式，也可以选择保留原来最后修改日期的调整后的图像。

##### PowerRename：文件重命名

![](../Images/tool_list_4.png)

下面对该界面的选项或设置做详细介绍。

|          选项           |                                                                       介绍                                                                       |
| :---------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------: |
|       Search for        |                                                       要在文件名称中匹配的文本或正则表达式                                                       |
|      Replace with       |                                                   要替换与搜索文本匹配的文件名称中的实例的文本                                                   |
| Use Regular Expressions |         勾选此项，搜索字段将被解释为正则表达式，「替换为」 字段还可以包含正则表达式变量，如果没有选中，搜索字段将被用作替换字段中的文本          |
|     Case Sensitive      |                                                             默认情况下，不区分大小写                                                             |
|  Match All Occurrences  | 勾选此项，搜索字段中所有匹配的文本将被更改为「替换为」字段的文本。否则，将只替换项目中搜索文本的第一个实例（从左到右），例如： win_win -> pc_win |
|      Exclude Files      |                                                         文件将不被包括在本次重命名操作中                                                         |
|     Exclude Folders     |                                                          文件夹将不被包括在重命名操作中                                                          |
| Exclude Subfolder Items |                                    文件夹中的项将不包括在重命名操作中，默认情况下，所有子文件夹项也将被重命名                                    |
|     Enumerate Items     |                                       在操作中修改的文件名后追加一个数字后缀。例如：foo.jpg -> foo (1).jpg                                       |
|     Item Name Only      |                                    该操作只修改文件名部分（而不修改文件扩展名）。例如：txt.txt -> NewName.txt                                    |
|   Item Extension Only   |                                  该操作只修改文件扩展名部分（而不是文件名）。例如：txt.txt -> txt.NewExtension                                   |

##### Shortcut Guide：系统快捷键指南

按住键盘上的 Windows 键大约 1 秒钟（默认设置为 900 毫秒），会出现一个显示和 Windows 快捷键相关的叠加层展示使用 Windows 键的常见键盘快捷键。

#### Keyboard Manager：键盘映射

这是一款非常简单却又非常实用的小工具，能够将一个按键映射为另一个按键，或者将一组快捷键映射为另一组。

### 微软官方已删除数据恢复工具

[Windows File Recovery](https://www.microsoft.com/zh-cn/p/windows-file-recovery/9n26s50ln705?activetab=pivot:overviewtab) 是微软发布的用于数据恢复的命令行工具，可以用来恢复 NTFS, FAT, exFAT 和 ReFS 文件系统的文件，支持 HDD, SSD, USB, 和记忆卡。

![](../Images/winfr_1.png)

在 Windows 商店安装后，以管理员权限启动的 cmd 或者 powershell 来直接运行 winfr

![](../Images/winfr_2.png)

比如，你要恢复 U 盘（E: 盘）里的 jpg 文件，那么就需要使用签名模式，命令如下：

```sh
winfr E: D: /x /n *.pdf
```

然后就开始扫描（需要按下 Y 同意继续）就可以恢复文件了：

![](../Images/winfr_3.png)

最终，winfr 将其他格式的图片甚至视频也一起恢复了（意外恢复了我的小片片 😳），并且保存在了 D 盘下的 Recovery_20200704_155233 文件夹中。

![](../Images/winfr_4.png)

具体使用方法参见[官方文档](https://support.microsoft.com/zh-cn/help/4538642/windows-10-restore-lost-files)

### Edge & Chrome：浏览器

#### 插件（可通用）

**uBlock Origin**：一款高效的网络请求过滤工具，占用极低的内存和 CPU。日常上网必须，屏蔽各种广告。

**Google 翻译**：浏览网页时可轻松查看翻译版本。由 Google 翻译小组提供，我一般用来翻译整个页面，平时会在扩展选项里把 **不显示图标和弹出式翻译** 勾选上，不用于划词翻译，因为有更好的。

**沙拉查词-聚合词典划词翻译**：Saladict 沙拉查词是一款专业划词翻译扩展，为交叉阅读而生。大量权威词典涵盖中英日韩法德西语，支持复杂的划词操作、网页翻译、生词本与 PDF 浏览。
我一般用来翻译页面上的单词或长句。

**IDM Integration Module**：IDM 浏览器集成插件，将浏览器下载链接使用 IDM 多线程下载

**图片助手(ImageAssistant) 批量图片下载器**：一款用于嗅探、分析网页图片并提供批量下载等功能及在线收藏、检索、分享服务的浏览器扩展程序。偶尔用一下吧

**掘金**：为程序员、设计师、产品经理每日发现优质内容。

**FeHelper(前端助手)**：JSON 自动格式化、手动格式化，支持排序、解码、下载等，更多功能可在配置页按需安装！

**Tampermonkey**：油猴脚本，使用自定义网站脚本的插件，可以使用各种 user.js 脚本，相当于小型的插件管理器，下面是我常用的脚本，其他用途的脚本请自行探索 [Greasy Fork](https://greasyfork.org/zh-CN)、[Sleazy Fork](https://sleazyfork.org/zh-CN)、[OpenUserJS](https://openuserjs.org/)

- [Userscript+](https://greasyfork.org/zh-CN/scripts/24508-userscript-show-site-all-userjs)：显示当前网站所有可用的 UserJS 脚本
- [My Novel Reader](https://greasyfork.org/zh-CN/scripts/292-my-novel-reader)：小说阅读脚本，统一阅读样式，内容去广告、修正拼音字、段落整理，自动下一页小说阅读脚本
- [Bilibili Evolved](https://github.com/the1812/Bilibili-Evolved)：强大的哔哩哔哩增强脚本：下载视频, 音乐, 封面, 弹幕 / 简化直播间, 评论区, 首页 / 自定义顶栏, 删除广告, 夜间模式 / 触屏设备支持
- [豆瓣资源下载大师](https://greasyfork.org/zh-CN/scripts/329484-%E8%B1%86%E7%93%A3%E8%B5%84%E6%BA%90%E4%B8%8B%E8%BD%BD%E5%A4%A7%E5%B8%88-1%E7%A7%92%E6%90%9E%E5%AE%9A%E8%B1%86%E7%93%A3%E7%94%B5%E5%BD%B1-%E9%9F%B3%E4%B9%90-%E5%9B%BE%E4%B9%A6%E4%B8%8B%E8%BD%BD/feedback)：1 秒搞定豆瓣电影 | 音乐 | 图书下载
- [网盘助手](https://greasyfork.org/zh-CN/scripts/378301-%E7%BD%91%E7%9B%98%E5%8A%A9%E6%89%8B)：插件主要功能有：[1] 百度网盘、腾讯微云、蓝奏云、天翼云盘万能钥匙 [2] 百度网盘生成并展示下载链接 [3] 百度网盘分享时自定义提取码

### PotPlayer：视频播放器

#### 常用快捷键

> 可以在 选项 -> 基本 -> 快捷键 中调整

|                 功能                  |            快捷键            |
| :-----------------------------------: | :--------------------------: |
|               播放/暂停               |             空格             |
|                 音量                  |   鼠标滚轮，上 / 下方向键    |
|              前进 / 后退              |        左 / 右方向键         |
|              全屏 / 还原              |            Enter             |
|                 倍速                  | C - 加速，X - 减速，Z - 复位 |
|              上 / 下一帧              |            D / F             |
| 截图并保存，存储位置可在 选项 -> 存档 |        设置 Ctrl + E         |
|            视频、GIF 录制             |           Alt + C            |

- 26 个直播平台的直播源：[real-url](https://github.com/wbt5/real-url)
- 直播源相关资源汇总：[Tvlist-awesome-m3u-m3u8](https://github.com/billy21/Tvlist-awesome-m3u-m3u8)

### qBittorrent：BT 下载

勾选下图红框内的选项 并复制所有 Tracker 后粘贴到下方输入框中，然后点击 [Apply] 保存。(如下图所示)

![](../Images/tool_list_5.png)

全网热门 [BitTorrent Tracker](https://github.com/XIU2/TrackersListCollection) 列表！

- 精选列表：https://trackerslist.com/best.txt

- 完整列表：https://trackerslist.com/all.txt

### Dism++：Windows 的一个集中式的系统管理工具

官网：[Dism++ | 全新的 Windows 实用工具](https://www.chuyu.me/zh-Hans/Document.html)

### 其他

- [x] [WOX](https://github.com/Wox-launcher/Wox)：快速启动

- [x] [Clash for Windows](https://github.com/Fndroid/clash_for_windows_pkg/releases)：科学上网

- [x] Bandizip：压缩/解压缩

- [x] Everything：文件快速搜索

- [x] Snipaste & ShareX：截图/贴图

- [x] ScreenToGif：录制 GIF 动态图

- [x] QuickLook：文件管理器预览增强

- [x] LockHunter：解除文件占用

- [x] Geek Uninstaller：软件卸载

- [x] QQ：国内不得不用的流氓 IM

- [x] 微信：同上

- [x] 百度网盘：国内事实上的垄断网盘

- [x] Acrobat DC：Adobe 家的 PDF 解决方案

- [x] Typora：Markdown 软件，界面简洁

- [x] Telegram：国外跨平台的即时通信软件

- [x] GoogleDrive：文件自动同步、共享、备份

- [x] 网易云 & Listen1：在线音乐

- [x] Mcool：本地无损音乐

- [x] Rufus：USB 启动盘制作工具

- [x] Wise Registry Cleaner：注册表清理

- [x] Lenovo Vantage：硬件设置、硬件检测、联想官方驱动和固件更新


