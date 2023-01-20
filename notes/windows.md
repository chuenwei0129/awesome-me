# 呼呼…Windows 酱…抱歉了呢…我可能回不去了……能够出生，并与你相遇，真是太好了

***👀 TIPS: 二级标题可返回目录***

---

> ## 目录

- [呼呼…Windows 酱…抱歉了呢…我可能回不去了……能够出生，并与你相遇，真是太好了](#呼呼windows-酱抱歉了呢我可能回不去了能够出生并与你相遇真是太好了)
  - [重装系统](#重装系统)
    - [事先准备](#事先准备)
    - [通过 U 盘启动电脑](#通过-u-盘启动电脑)
  - [Windows 快速检查修复系统](#windows-快速检查修复系统)
  - [利用 Windows 系统评估工具测试硬盘速度](#利用-windows-系统评估工具测试硬盘速度)
  - [系统邮件添加并同步 Gmail](#系统邮件添加并同步-gmail)
    - [准备工作](#准备工作)
    - [向 win10 邮件 app 添加 Gmail 账户](#向-win10-邮件-app-添加-gmail-账户)
  - [局域网内 Windows / Ipad 传输文件](#局域网内-windows--ipad-传输文件)
    - [第一步：Windows 设置共享文件夹](#第一步windows-设置共享文件夹)
    - [第二步：Ipad 上访问局域网](#第二步ipad-上访问局域网)
  - [Windows Terminal 完美配置 PowerShell](#windows-terminal-完美配置-powershell)
    - [Windows Terminal 添加到右键菜单](#windows-terminal-添加到右键菜单)
    - [配置 Windows Terminal](#配置-windows-terminal)
    - [安装 Powershell Core](#安装-powershell-core)
    - [安装 Powershell 插件](#安装-powershell-插件)
      - [安装字体](#安装字体)
      - [安装 Powershell 模块](#安装-powershell-模块)
      - [定制自己的主题](#定制自己的主题)
      - [美化 ls 输出](#美化-ls-输出)
      - [安装 z.lua 插件](#安装-zlua-插件)
        - [安装 lua 环境](#安装-lua-环境)
        - [z.lua](#zlua)
      - [PSReadLine](#psreadline)
      - [Screenfetch](#screenfetch)
    - [Git Bash 工具包](#git-bash-工具包)
  - [适用于 Linux 的 Windows 子系统（WSL）](#适用于-linux-的-windows-子系统wsl)
    - [安装 wsl](#安装-wsl)
    - [子系统 ubuntu 创建 root 用户](#子系统-ubuntu-创建-root-用户)
    - [更换 `/etc/apt/sources.list` 文件里的源](#更换-etcaptsourceslist-文件里的源)
    - [子系统安装中文语言包](#子系统安装中文语言包)
      - [首先查看是否安装了中文语言包](#首先查看是否安装了中文语言包)
      - [然后添加中文支持](#然后添加中文支持)
      - [修改回英文](#修改回英文)
    - [zsh](#zsh)
      - [安装、配置](#安装配置)
      - [插件、主题](#插件主题)
    - [wsl 解决 ls 命令背景色问题](#wsl-解决-ls-命令背景色问题)
  - [代理](#代理)
    - [windows 终端](#windows-终端)
    - [WSL](#wsl)
  - [环境变量（知识拓展）](#环境变量知识拓展)
  - [PowerShell 脚本执行策略（知识拓展）](#powershell-脚本执行策略知识拓展)
    - [**Restricted**](#restricted)
    - [**AllSigned**](#allsigned)
    - [**RemoteSigned**](#remotesigned)
    - [**Unrestricted**](#unrestricted)
    - [**Bypass**](#bypass)
    - [**Undefined**](#undefined)
    - [**Execution Policy Scope**](#execution-policy-scope)
  - [PowerShell 设置命令别名 Alias（知识拓展）](#powershell-设置命令别名-alias知识拓展)
    - [查看别名](#查看别名)
    - [创建或更改别名](#创建或更改别名)
      - [创建不带参数的别名](#创建不带参数的别名)
      - [创建或更改带参数的别名](#创建或更改带参数的别名)
      - [删除别名](#删除别名)
  - [Powershell 对文件批量重命名](#powershell-对文件批量重命名)
    - [单个文件重命名](#单个文件重命名)
    - [批量改文件扩展名](#批量改文件扩展名)
    - [批量为文件加前缀](#批量为文件加前缀)
    - [批量重命名并编号](#批量重命名并编号)
  - [快速保存图片 && 图片批量编号](#快速保存图片--图片批量编号)
  - [Windows 软件包管理工具](#windows-软件包管理工具)
    - [WinGet](#winget)
      - [安装](#安装)
      - [仓库](#仓库)
      - [操作和命令](#操作和命令)
      - [官方文档](#官方文档)
    - [Scoop](#scoop)
      - [安装 Scoop](#安装-scoop)
      - [帮助文档](#帮助文档)
      - [自定义软件安装的位置](#自定义软件安装的位置)
      - [配置代理](#配置代理)
      - [aria2 多线程下载](#aria2-多线程下载)
      - [添加仓库](#添加仓库)
      - [常用操作和命令](#常用操作和命令)
      - [备份](#备份)
      - [基本信息](#基本信息)
      - [小技巧](#小技巧)
  - [Windows 软件清单](#windows-软件清单)
    - [PowerToys：系统增强工具](#powertoys系统增强工具)
      - [PowerToys Run：快速启动](#powertoys-run快速启动)
      - [Image Resizer：图片尺寸调整](#image-resizer图片尺寸调整)
      - [PowerRename：文件重命名](#powerrename文件重命名)
      - [Shortcut Guide：系统快捷键指南](#shortcut-guide系统快捷键指南)
      - [Keyboard Manager：键盘映射](#keyboard-manager键盘映射)
    - [微软官方已删除数据恢复工具](#微软官方已删除数据恢复工具)
    - [PotPlayer：视频播放器](#potplayer视频播放器)
      - [常用快捷键](#常用快捷键)
    - [qBittorrent：BT 下载](#qbittorrentbt-下载)
    - [Dism++：Windows 的一个集中式的系统管理工具](#dismwindows-的一个集中式的系统管理工具)
    - [其他](#其他)

## [重装系统](#目录)

### 事先准备

准备大于等于 `8G` 的空白 `U` 盘，去 [微软官方](https://www.microsoft.com/zh-cn/software-download/windows10) 下载制作工具，

点击 `exe` 文件，根据提示无脑下一步即可。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/system_re.png)

制作工具 **MediaCreationTool<版本号>**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/tool.jpg)

### 通过 U 盘启动电脑

1. **电脑不能启动**： 插入制作好的 `win10` 安装 `U` 盘，开机狂按 `F12` 修改 `BIOS` 为 `U` 盘启动即可（不同品牌启动项快捷键不同，此处为联想笔记本）。

   **电脑能启动**：插入制作好的 `win10` 安装 `U` 盘，`win + i` 打开 `windows` 设置 ---> 更新和安全 ---> 恢复 ---> 高级启动 ---> 高级选项 ---> 点击 `UEFI` 固件设置即可。

   ![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/uefi.jpg)

2. 不出意外，两种情况都会进入一个安装界面，无脑下一步即可。

   ![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/win10.jpg)

3. 为了安装一个纯净的系统，此处 `custom` 选择 **自定义：“仅安装 window”**

   ![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/custom.jpg)

4. 删除系统盘（系统分区所在的驱动器）的所有分区，如图所示为：驱动器 `0` ，此时驱动器 `0` 为一整块未分配分区，开始新建硬盘分区，系统会自动重新分区。

   ![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/disk.jpg)

5. 看到这个界面，接下来就没有困难了，无脑下一步，即可完成重装。

   ![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/win_start.jpg)

## [Windows 快速检查修复系统](#目录)

这个是系统自检命令，用来检查当前系统是否存在问题。

```sh
sfc /SCANNOW
```

如果查出问题的话，我们可以用

```sh
Dism /Online /Cleanup-Image /ScanHealth
```

进行修复。

> TIPS：这条命令会扫描系统文件并和官方服务器上文件进行对比，找到问题。
> 为什么会出现系统会和官方不一致的情况：被第三方软件篡改（含优化、安全管理）、系统使用过程中死机造成的文件丢失、下载补丁网络闪断造成文件缺失等，所以呢，扫描出问题是很正常的事情。

如果发现了有问题，想要修复的话，使用

```sh
Dism /Online /Cleanup-Image /CheckHealth
```

就行了，系统会自动联网下载与官方不同的系统文件进行替换，安心等待即可。

要是觉得命令一条一条输入实在是太麻烦了，直接来个终极版的

```sh
DISM /Online /Cleanup-image /RestoreHealth
```

这条命令的作用就是把和官方不同的系统文件直接还原成源文件，简单粗暴。

## [利用 Windows 系统评估工具测试硬盘速度](#目录)

- 以管理员模式输入命令 `winsat disk` 并回车，此时为默认扫描系统盘，一般也就是 `C` 盘。

  ![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/winsat_c.png)

- 输入 **winsat disk** + 参数 **-drive** 盘符,就是扫描指定盘了，例如扫描 `D` 盘：`winsat disk -drive d`

  ![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/winsat_d.png)

- 更多功能可以输入命令 `winsat -help` 查看。

  ![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/winsat_help.png)

## [系统邮件添加并同步 Gmail](#目录)

### 准备工作

登录 `Gmail` 邮箱，点击右上角的图标进入设置界面

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/gmail_1.jpg)

点击“转发和 `POP / IMAP` 并启用 `IMAP` 服务”

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/gmail_2.jpg)

启用两步验证后，进入 `google` 账户，选择“登录 `google`”，进入“应用专用密码”子栏。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/gmail_3.jpg)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/gmail_4.jpg)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/gmail_5.jpg)

按实际情况选择设备和应用，生成应用专用密码并复制

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/gmail_6.jpg)

### 向 win10 邮件 app 添加 Gmail 账户

点击邮件中的 **其他账户 这一栏**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/gmail_7.jpg)

把应用专用密码粘贴进去，保存即可

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/gmail_8.jpg)

## [局域网内 Windows / Ipad 传输文件](#目录)

### 第一步：Windows 设置共享文件夹

Windows 在 **文件管理器 => 在文件夹上右键 => 属性** 中可以看到共享，接下来，设置该文件夹为共享文件夹，那么 `Ipad` 便能下载 / 上传文件到该目录中了。

1. 点击共享
2. 选择共享的用户
3. 确认共享

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/share_file.png)

### 第二步：Ipad 上访问局域网

打开文件 `app` ，点击左上角三个点，弹出对话框，点击连接服务器，输入主机 `IP` 、主机用户名、密码即可。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/share_file_1.png)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/share_file_2.png)

## [Windows Terminal 完美配置 PowerShell](#目录)

### Windows Terminal 添加到右键菜单

`Github` 上面有 `powershell` 脚本可以用管理员身份运行该脚本 + 某些参数以实现一键配置右键菜单。

[原版 Github 仓库](https://github.com/lextm/windowsterminal-shell/)

[修改后的脚本仓库](https://github.com/LittleNewton/windows_terminal_here)

建议下载修改后的脚本仓库，然后在管理员模式的 `powershell` 里运行：

```sh
.\install.ps1 mini # 在你下载的脚本仓库目录下运行，类似 C:\...\windows_terminal_here>
```

### 配置 Windows Terminal

在 `Windows Terminal` 的下拉菜单中，选择 `Settings`（或使用快捷键 `Ctrl + ,`），会使用你系统默认的文本编辑器打开 `Windows Terminal` 的配置文件，按住 `Alt` 键，再选择 `Settings`，会打开 `Windows Terminal` 的默认配置文件。

配置文件可将 [GUID](https://www.uuidgenerator.net/)（在线生成） 用作唯一标识符。 若要将某个配置文件设置为默认配置文件（打开 `Windows Terminal` 默认启动），则需要 `defaultProfile` 全局设置的 `GUID`。

图标可以在 [icons8](https://icons8.com/icons/set/ubuntu)、[iconfont](https://www.iconfont.cn/) 等网站上进行搜索，`96px` 的尺寸适合 `Windows Terminal`

了解更多，请参阅[官方文档](https://docs.microsoft.com/zh-cn/windows/terminal/customize-settings/profile-settings)。

我的部分配置：

```js
{
    "guid": "{574e775e-4f2a-5b96-ac1e-a2962a402336}",
    "hidden": false,
    "name": "PowerShell",
    // 写上 -nologo，否则 powershll 会有一段话输出，很难看！
    "commandline": "C:/Program Files/PowerShell/7-preview/pwsh.exe",
    "source": "Windows.Terminal.PowershellCore",
    // 字体，默认 "Cascadia Mono"
    "fontFace": "FuraCode NF",
    // 字体大小
    "fontSize": 11,
    // 字体粗细，默认值： "normal"
    // "fontWeight": "normal",
    // 默认值： "8, 8, 8, 8"
    "padding": "5, 5, 20, 25",
    // 设置为 true，在键入时，窗口将滚动到命令输入行。设置为 false，在开始键入时，窗口不会滚动，默认值：true。
    // "snapOnInput": true,
    // 设置在窗口显示的内容上方可以回滚的行数，默认值：9001。
    // "historySize": 8888,
    // 背景颜色
    // "background": "#013456",
    // 素材路径的语法格式为 ms-appdata: ///roaming/{图片名}
    // 真实路径：C:\Users\{用户名}\AppData\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\RoamingState\dark.png
    // "backgroundImage": "ms-appdata:///roaming/dark.png",
    // 设置背景图片伸缩模式为「按比例放大」
    // "backgroundImageStretchMode": "uniformToFill",
    // 设置背景图片透明度为 0.6
    // "backgroundImageOpacity": 0.6,
    // 背景会添加 Windows Fluent 设计风格的亚克力着色
    // 在系统个性化 => 颜色 => 透明效果，关了的情况下不生效。
    // 光标颜色，如果设置了 colorScheme，将替代配色方案中设置的 cursorColor
    // "cursorColor": "#013456"
    // "useAcrylic": true,
    // 定义了亚克力效果的透明度
    // "acrylicOpacity": 0.8,
    // 配色方案
    "colorScheme": "Galaxy"
},
 {
    "guid": "{3526449b-4a2c-4d8d-8b01-1a3476d1e9aa}",
    "name": "TencentCloud (remote)",
    "commandline": "powershell.exe ssh cvm",
    "hidden": false,
    // 选项卡和下拉菜单中显示的图标
    "icon": "ms-appdata:///roaming/ubuntu.png",
    // "background": "#013456",
    "acrylicOpacity": 0.8,
    "fontFace": "JetBrains Mono",
    "fontSize": 11,
    "colorScheme": "Atom"
}
```

> 关于配色方案

`Github` 上这个仓库 [atomcorp/themes](https://github.com/atomcorp/themes) 提供了解决方案

1. 在 <https://atomcorp.github.io/themes/> 预览并复制喜欢的主题（Get theme 按钮）
2. 打开 `Windows Terminal settings` 复制到 `"schemes"` 下，然后配置即可。

我的配色方案

```json
"schemes":[
    {
        "name": "Galaxy",
        "black": "#000000",
        "red": "#f9555f",
        "green": "#21b089",
        "yellow": "#fef02a",
        "blue": "#589df6",
        "purple": "#944d95",
        "cyan": "#1f9ee7",
        "white": "#bbbbbb",
        "brightBlack": "#555555",
        "brightRed": "#fa8c8f",
        "brightGreen": "#35bb9a",
        "brightYellow": "#ffff55",
        "brightBlue": "#589df6",
        "brightPurple": "#e75699",
        "brightCyan": "#3979bc",
        "brightWhite": "#ffffff",
        "background": "#1d2837",
        "foreground": "#ffffff"
    }
]
```

我的终端：

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/terminal.png)

### 安装 Powershell Core

开源，还是开源。在 <https://github.com/PowerShell/PowerShell/releases> 这个 `GitHub` 链接里，有目前 `Powershell` 的最新版，从 `release` 里选个最新的 `preview` 版本安装。经过测试，这些预览版都相当稳定。

> TIPS：在我的电脑上，`preview4` 版本中出现如下情况 "--version" 会被显示成 " -version"
>
> 在 vscode 测试，没有问题，奇怪，不懂，猜测是 Windows 字符编码问题 😳，头疼！！！
>
> 😭😭😭 oh shit，没想到是字体的锅！！！我真是傻逼 🤯🤯🤯

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/posh_core.png)

### 安装 Powershell 插件

#### 安装字体

首先需要注意的是，`oh-my-posh` 主题使用了一些非 `Powerline` 字体不支持的字符，因此如果你使用默认的等宽字体（比如 Consolas），在显示过程中就会出现乱码、字符显示不全的现象。

`Powerline` 字体在 `GitHub` 开源，我们可以在这里：[powerline/fonts](https://github.com/powerline/fonts) 下载支持相关字符的字体。

#### 安装 Powershell 模块

输入命令：

```sh
# 1. 安装 PSReadline 包，该插件可以让命令行很好用，类似 zsh
Install-Module -Name PSReadLine -AllowPrerelease -Force -Verbose

# 2. 安装 posh-git 包，让你的 git 更好用
Install-Module posh-git -Scope CurrentUser -Verbose

# 3. 安装 oh-my-posh 包，让你的命令行更酷炫、优雅
Install-Module oh-my-posh -Scope CurrentUser -Verbose
```

后面两个包的来源不受系统信任，不用管它，如果让你选择是否信任，直接输入 Y 即可。

在 powershell 中输入：

```sh
code $Profile # 生成的 PowerShell 的用户配置文件在 C:\Users\<用户名>\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1 中
```

这个 `Profile` 配置文件与 `.zshrc` / `.bashrc` 文件一样，都是控制启动前参数的，接下来定制的过程，就修改这个文件来配置即可。

输入下面这一长串代码：

```sh
#------------------------------- Import Modules BEGIN -------------------------------

# 引入 posh-git
Import-Module posh-git

# 引入 oh-my-posh
Import-Module oh-my-posh

# 设置 PowerShell 主题
Set-Theme Paradox

#------------------------------- Import Modules END -------------------------------
```

保存并关闭重启，完美。

#### 定制自己的主题

命令行输入：

```sh
$ThemeSettings # take a look at your oh-my-posh's profile
```

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/powershell_theme.png)

从 `CurrentThemeLocation` 可以看出主题的目录位置，在该目录下新建一个 `xxxx.psm1`，之后按照其他主题的写法进行修改就可以了，具体写法查看 [oh-my-posh](https://github.com/JanDeDobbeleer/oh-my-posh#themes) 这个库。使用 `Set-Theme xxxx` 这个命令来让你的自定义主题生效。

`Github` 上比较好看的一个自定义主题：[spencerwooo/dotfiles](https://github.com/spencerwooo/dotfiles)，自定义主题中涉及到一些 `Powerline` 字体不支持的字符，需要在这里 [ryanoasis/nerd-fonts](https://github.com/ryanoasis/nerd-fonts) 下载 `Nerd Fonts` 来正常使用。

输入命令 `theme` 可查看所有主题。

#### 美化 ls 输出

命令行输入：

```sh
Install-Module -AllowClobber Get-ChildItemColor
```

编辑 \$profile：

```sh
#------------------------------- Import Modules BEGIN -------------------------------

# 美化 ls 输出
Import-Module Get-ChildItemColor

#------------------------------- Import Modules END ---------------------------------

#-------------------------------   Set Alias BEGIN    -------------------------------

If (-Not (Test-Path Variable:PSise)) {
    # Only run this in the console and not in the ISE

    Import-Module Get-ChildItemColor

    Set-Alias ll Get-ChildItem -option AllScope
    Set-Alias ls Get-ChildItemColorFormatWide -option AllScope
}

#-------------------------------   Set Alias END    ---------------------------------
```

#### 安装 [z.lua](https://github.com/skywind3000/z.lua) 插件

> 快速路径切换工具（类似 [z.sh](https://github.com/rupa/z) / autojump / fasd），兼容 `Windows` 和所有 `Posix Shell` 以及 `Fish Shell`，同时包含了众多改进。

##### 安装 lua 环境

1. 下载安装 [lua](http://joedf.ahkscript.org/LuaBuilds/)
2. 配置环境变量

   ![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/lua_win.png)

   把存放 `Lua` 文件夹的路径写入如下位置即可。

3. `powershell` 输入 `lua` 输出如下即成功。

   ![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/lua_sucess.png)

##### [z.lua](https://github.com/skywind3000/z.lua)

```sh
git clone https://github.com/skywind3000/z.lua.git
```

然后编辑 `$profile`，安装了 `vscode` 使用 `code $profile` 打开文件添加语句如下。

```sh
# 添加快速路径切换工具
# 这里的 C:/Users/Gakki/z.lua/z.lua 就是刚才下载的项目路径
iex ($(lua C:/Users/Gakki/z.lua/z.lua --init powershell) -join "`n")
```

[Examples](https://github.com/skywind3000/z.lua/blob/master/README.cn.md)

```sh
z foo       # 跳转到包含 foo 并且权重（Frecent）最高的路径
z foo bar   # 跳转到同时包含 foo 和 bar 并且权重最高的路径
z -r foo    # 跳转到包含 foo 并且访问次数最高的路径
z -t foo    # 跳转到包含 foo 并且最近访问过的路径
z -l foo    # 不跳转，只是列出所有匹配 foo 的路径
z -c foo    # 跳转到包含 foo 并且是当前路径的子路径的权重最高的路径
z -e foo    # 不跳转，只是打印出匹配 foo 并且权重最高的路径
z -i foo    # 进入交互式选择模式，让你自己挑选去哪里（多个结果的话）
z -I foo    # 进入交互式选择模式，但是使用 fzf 来选择
z -b foo    # 跳转到父目录中名称以 foo 开头的那一级
```

#### [PSReadLine](https://github.com/PowerShell/PSReadLine)

设置类似于 `Bash` 的菜单选择功能

在 `$profile` 文件增加一行

```sh
Set-PSReadlineKeyHandler -Key Tab -Function MenuComplete
```

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/tab.png)

设置类似于 `zsh-autosuggestions` 基于输入历史的自动命令提示

在 `$profile` 文件增加

```sh
Set-PSReadLineOption -HistorySearchCursorMovesToEnd
Set-PSReadLineKeyHandler -Key UpArrow -Function HistorySearchBackward
Set-PSReadLineKeyHandler -Key DownArrow -Function HistorySearchForward
```

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/suggestions.gif)

更完整的配置可参照[官方样例](https://github.com/PowerShell/PSReadLine/blob/master/PSReadLine/SamplePSReadLineProfile.ps1)

#### Screenfetch

`Linux` 装机以后必晒图之一就是 `screenfetch` 了，想不到在 `Windows` 下也有这种东西。

因为 [windows-screenfetch](https://github.com/JulianChow94/Windows-screenFetch) 这个模块在 `powershell core` 有 `bug` （高版本有命名冲突 ：Get-Uptime），所以从 `github` 搜到了其他的类似模块 [SystemSplash](https://github.com/mmillar-bolis/SystemSplash)

输入命令：

```sh
Install-Module -Name SystemSplash -Repository PSGallery -Scope CurrentUser
```

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/screenfetch.png)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/screenfetch_graph.png)

配置别名

```sh
function screenSystem {Get-SystemSplash -graph}
Set-Alias sf Get-SystemSplash
Set-Alias sfg screenSystem
```

windows powershell（系统自带 5.1）执行以下命令安装 `screenfetch`（此版本无 bug）：

```sh
Install-Module windows-screenfetch -Scope CurrentUser # 经测试当前版本在 powershell core 下有 bug
```

安装好以后直接输入 `Screenfetch` 就可以看到效果了，十分炫酷。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/sf_win_posh.png)

### Git Bash 工具包

因为 `Git` 的 `usr\bin` 下所有 `GNU` 工具都是 `exe` 可执行文件，所以 `Powershell` 完全可以直接运行这些工具。要在 `Powershell` 下使用这个工具，只需要将 `Git` 的 `usr\bin` 目录添加到 `PATH` 中即可。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/git_gnu.png)

`Powershell` 自带的命令别名会把 `GNU` 的同名工具命令覆盖。

利用 `Get-Alias` 命令就可以查看 `Powershell` 中设置的·命令别名，这样我们就可以很方便的找出冲突的命令，并取消对应的命令别名。

找出冲突的别名后就可以用 `Remove-Item alias:\<command>` 删除命令别名了，比如我删除了以下的命令别名：

```sh
Remove-Item alias:\rm
Remove-Item alias:\cp
```

## [适用于 Linux 的 Windows 子系统（WSL）](#目录)

### 安装 wsl

必须先启用 **“适用于 Linux 的 Windows 子系统”** 可选功能，然后才能在 `Windows` 上安装 `Linux` 分发版。

以管理员身份打开 `PowerShell` 并运行：

```sh
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```

> 如只需要 `WSL` 此时可重启，然后在商店安装 `Linux` 分发版即可。

安装 `WSL 2` 之前，必须启用 **“虚拟机平台”** 可选功能。

以管理员身份打开 `PowerShell` 并运行：

```sh
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

重新启动计算机。

查看 `WSL` 版本，请运行：

```sh
wsl --list --verbose
```

若要将 `WSL` 升级为 `WSL 2` 版本支持，请运行：

```sh
wsl --set-version <distribution name> <versionNumber>
```

弹出信息：

> `WSL 2` 需要更新其内核组件。有关信息，请访问 <https://aka.ms/wsl2kernel>

下载链接提供的 `Linux` 内核更新包，安装即可。

若要将分发版设置为默认 `WSL 2` 版本，请运行：

```sh
wsl --set-default-version 2
```

### 子系统 ubuntu 创建 root 用户

输入：`sudo passwd root`

终端会显示

`Enter new UNIX password:`

设置 `root` 用户密码，按 `Enter`

终端显示

`Retype new UNIX password:`

再输入一遍

确定之后终端会显示

`passwd: password updated successfully`

表示 `root` 用户成功创建并设置密码

### 更换 `/etc/apt/sources.list` 文件里的源

`ubuntu` 配置的默认源并不是国内的服务器，下载更新软件都比较慢。

**备份源列表文件 `sources.list`**

```sh
sudo cp /etc/apt/sources.list /etc/apt/sources.list_backup
```

**`sources.list` 文件修改**

选择合适的源，替换原文件的内容，保存编辑好的文件, 以阿里云更新服务器为例（可以分别测试阿里云、清华、中科大、163 源的速度，选择最快的）

打开 `sources.list` 文件：

```sh
sudo nano /etc/apt/sources.list
```

编辑 `/etc/apt/sources.list` 文件, 在文件最前面添加阿里云镜像源：

```sh
# 阿里源
deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
```

> 其他源

中科大源：

```sh
# 中科大源
deb https://mirrors.ustc.edu.cn/ubuntu/ bionic main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ bionic main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ bionic-security main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ bionic-security main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse
```

163 源：

```sh
# 163 源
deb http://mirrors.163.com/ubuntu/ bionic main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ bionic-security main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ bionic-updates main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ bionic-backports main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ bionic main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ bionic-security main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ bionic-updates main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ bionic-backports main restricted universe multiverse
```

清华源：

```sh
# 清华源
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-security main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-security main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse
```

### 子系统安装中文语言包

#### 首先查看是否安装了中文语言包

输入命令 `locale -a` 查看是否有：`zh_CN.utf8`，如果没有，首先需要安装中文语言包，输入以下命令：

```sh
sudo apt-get install language-pack-zh-hans
```

#### 然后添加中文支持

1. 备份 `locale` 文件

```sh
sudo cp /etc/default/locale /etc/default/locale_backup
```

1. 修改 `locale` 文件，配置中文

```sh
sudo nano /etc/default/locale
```

修改配置文件为：

```sh
LANG="zh_CN.UTF-8"
LANGUAGE="zh_CN:zh:en_US:en"
LC_NUMERIC="zh_CN.UTF-8"
LC_TIME="zh_CN.UTF-8"
LC_MONETARY="zh_CN.UTF-8"
LC_PAPER="zh_CN.UTF-8"
LC_IDENTIFICATION="zh_CN.UTF-8"
LC_NAME="zh_CN.UTF-8"
LC_ADDRESS="zh_CN.UTF-8"
LC_TELEPHONE="zh_CN.UTF-8"
LC_MEASUREMENT="zh_CN.UTF-8"
LC_ALL=zh_CN.UTF-8
```

#### 修改回英文

如果没安装英文语言包可以安装：

```sh
sudo apt-get install language-pack-en
```

然后添加英文支持

修改配置文件为：

```sh
LANG=en_US.UTF-8
LANGUAGE="en_US:en"
LC_NUMERIC="en_US.UTF-8"
LC_TIME="en_US.UTF-8"
LC_MONETARY="en_US.UTF-8"
LC_PAPER="en_US.UTF-8"
LC_IDENTIFICATION="en_US.UTF-8"
LC_NAME="en_US.UTF-8"
LC_ADDRESS="en_US.UTF-8"
LC_TELEPHONE="en_US.UTF-8"
LC_MEASUREMENT="en_US.UTF-8"
LC_ALL=en_US.UTF-8
```

### zsh

#### 安装、配置

查看当前发行版可以使用的 `shell`

```sh
cat /etc/shells
```

查看当前 `shell`

```sh
echo $SHELL
```

切换 `shell`

```sh
chsh -s /bin/bash
```

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/linux_shell.png)

安装 `zsh`

```sh
sudo apt install zsh
```

下载安装 `oh-my-zsh`

运行命令下载安装

```sh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/oh_my_zsh.png)

#### 插件、主题

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/zsh_plugin.png)

- [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)：为 `zsh` 提供基于输入历史的自动命令提示

  ```sh
  git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
  ```

- [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)：为 zsh 命令提供色彩高亮

  ```sh
  git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
  ```

- [z](https://github.com/rupa/z)：快速跳转不同的目录、路径、文件夹，oh-my-zsh 内置。

- ~~[z.lua](https://github.com/skywind3000/z.lua)：快速路径切换工具，在我的 wsl 2 中 cpu 会狂转，遂放弃，纯净的 linux 系统可以一试。~~

- [powerlevel10k](https://github.com/romkatv/powerlevel10k#oh-my-zsh)：A fast reimplementation of Powerlevel9k ZSH theme，花里胡哨的。

### wsl 解决 ls 命令背景色问题

[DrvFs 文件权限问题](https://printempw.github.io/wsl-guide/#6-6-DrvFs-%E6%96%87%E4%BB%B6%E6%9D%83%E9%99%90%E9%97%AE%E9%A2%98)。

不对文件系统的权限进行修改

可以在 `.zshrc` 最尾部添加如下代码

```sh
# Change ls colours
LS_COLORS="ow=01;36;40" && export LS_COLORS

# make cd use the ls colours
zstyle ':completion:*' list-colors "${(@s.:.)LS_COLORS}"
autoload -Uz compinit
compinit
```

加载设置：`source ~/.zshrc`

## [代理](#目录)

机场：[百草云](https://nsfwcloud.com/auth/login#)

订阅：[订阅转换](https://acl4ssr.netlify.app/)

工具：[clash_for_windows_pkg](https://github.com/Fndroid/clash_for_windows_pkg/releases)

### windows 终端

- `[CMD]` 中用 `set http_proxy` 设置

- `[Git Bash]` 中用 `export http_proxy` 设置

- `[PowerShell]` 中用 `$Env:http_proxy` 设置

- `curl google.com` 验证，如果返回如下，代理设置成功。

  ```html
  <HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
  <TITLE>301 Moved</TITLE></HEAD><BODY>
  <H1>301 Moved</H1>
  The document has moved
  <A HREF="http://www.google.com/">here</A>.
  </BODY></HTML
  ```

- `PowerShell` 可以通过配置 `$profile` 初始化启动代理

  ```sh
  #-----------  Set Proxy BEGIN  ---------------------

  # 配置 http 代理
  $Env:http_proxy="http://127.0.0.1:7890"

  # 配置 https 代理
  $Env:https_proxy="http://127.0.0.1:7890"

  # 配置 socks5 代理
  # $Env:all_proxy="socks5://127.0.0.1:7890"

  #------------ Set Proxy END ------------------------
  ```

### WSL

1. `powershell` 输入 `ipconfig` 或在 `clash` 客户端均可获取到主机 `IP`

   ![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/ipconfig.png)

2. clash 客户端勾选上 Allow LAN

   ![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/clash_wsl.png)

3. 通过 `alias`（别名）加入 `~/.zshrc` 中，方便快速输入。在 `~/.zshrc` 中添加如下内容：

   ```sh
   # 墙外
   alias nogfw='export http_proxy="http://192.168.43.97:7890";export https_proxy="http://192.168.43.97:7890";'
   # 墙内
   alias gfw="unset http_proxy https_proxy"
   # 测试 IP
   alias myip="curl ipinfo.io"
   ```

   然后执行 `source ~/.zshrc` 加载配置文件。

## [环境变量（知识拓展）](#目录)

> `Windows` 系统中有两种环境变量：用户变量和系统变量

1. 环境变量不区分大小写，例如 `path` 跟 `PATH` 是一样的

2. 系统变量对所有用户有效，用户变量只对当前用户有效

3. 用户变量与系统变量，名称是变量，值是里面的内容，也就是通过变量存储了想要存储的内容，方便调用

4. 系统变量与用户变量的 `PATH`：告诉系统可执行文件放在什么路径（平常执行程序的路径，要放在 `PATH` 里面，不能建一个变量，`CMD` 会提示“不是内部或外部命令，或者不是可执行程序”）

5. `windows` 系统在执行用户命令时，若用户未给出文件的绝对路径，则首先在当前目录下寻找相应的可执行文件、批处理文件等

6. 若果当前目录找不到对应文件名的程序，在系统变量的 `PATH` 的路径中，依次寻找对应的可执行程序文件（查找顺序是按照路径的录入顺序从左往右寻找的，最前面一条的优先级最高，如果找到程序就停止寻找，后面的路径不再执行）

7. 如果系统变量的 `PATH` 的路径找不到，再到用户变量的 `PATH` 路径中寻找（如果系统变量和用户变量的 `PATH` 中同时包含了同一个命令，则优先执行系统变量 `PATH` 中的命令）

8. 新加了环境变量以后，要确定保存后，再重启 `CMD`，否则命令不生效

## [PowerShell 脚本执行策略（知识拓展）](#目录)

为防止恶意脚本的执行，`PowerShell` 中设计了一个叫做执行策略 (Execution Policy) 的东西。我们可以在不同的应用场景中设置不同的策略来防止恶意脚本的执行。

`PowerShell` 提供了 `Restricted`、`AllSigned`、`RemoteSigned`、`Unrestricted`、`Bypass`、`Undefined` 六种类型的执行策略，接下来我们一一介绍。

### **Restricted**

单词 `Restricted` 的意思是 "受限制的"，所以这种执行策略主要是限制脚本的执行。说简单点就是：可以执行单个的命令，但是不能执行脚本。

### **AllSigned**

`Signed` 在这里指有数字签名的脚本，也就是说 `AllSigned` 执行策略允许执行所有具有数字签名的脚本。当然我们也可以换个角度说：只能运行具有数字签名的脚本。据我所知我们能见到的绝大多数的 `PowerShell` 脚本是没有数字签名的。

### **RemoteSigned**

这个执行策略的意思是：当执行从网络上下载的脚本时，需要脚本具有数字签名，否则不会运行这个脚本。如果是在本地创建的脚本则可以直接执行，不要求脚本具有数字签名。

### **Unrestricted**

这是一种比较宽容的策略，允许运行未签名的脚本。对于从网络上下载的脚本，在运行前会进行安全性提示

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/unrestricted.png)

但这仅仅是个提示，还是允许脚本执行的。

### **Bypass**

`Bypass` 执行策略对脚本的执行不设任何的限制，任何脚本都可以执行，并且不会有安全性提示。

### **Undefined**

`Undefined` 表示没有设置脚本策略。当然此时会发生继承或应用默认的脚本策略。

### **Execution Policy Scope**

`Scope` 指执行策略的应用范围。原来我们可以给不同的应用范围设置执行策略。比如进程、当前用户和本机。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/scope_list.png)

`Get-ExecutionPolicy` 和 `Set-ExecutionPolicy` 命令默认操作的都是本机的脚本执行策略。
如果要获得当前用户的执行策略可以使用 `-Scope` 选项：

```sh
Get-ExecutionPolicy -Scope CurrentUser
```

同样如果仅修改当前用户的执行策略可以在 `Set-ExecutionPolicy` 命令中使用 `scope` 参数。

```sh
Set-ExecutionPolicy -ExecutionPolicy <PolicyName> -Scope CurrentUser
```

## [PowerShell 设置命令别名 Alias（知识拓展）](#目录)

### 查看别名

- 查看已经设定的所有别名：`Get-Alias` 或 `gal`

- 查看某别名的原命令，如 `ls` 的原命令：`Get-Alias ls`

- 查看某原命令的别名，如 `Get-ChildItem` 的别名：`Get-Alias -Definition Get-ChildItem`

### 创建或更改别名

#### 创建不带参数的别名

使用 `Set-Alias` 命令创建或更改别名。如为 `Get-ChildItem` 命令设定别名 `list`：

```sh
Set-Alias -Name list -Value get-childitem
```

或简单一些：

```sh
Set-Alias list get-childitem
```

注意：对于系统默认设定的别名，不可在删除此别名之前重新对这个别名赋值。

另外，`PowerShell` 中还有一个命令 `New-Alias`，该命令和 `Set-Alias` 基本功能一样，只是前者不能更改别名，只能创建别名。

#### 创建或更改带参数的别名

如果命令带参数，如想为 `Get-ChildItem -Name` 设定别名为 ls 则我们需要两步：第一步为这个带参数原命令设定一个中间 `function`，第二步为这个 `function` 指定别名：

```sh
function getlist {Get-ChildItem -Name}
Set-Alias ls getlist
```

#### 删除别名

使用 `Remove-Item alias` 命令删除已设定的别名。如删除别名 `ls`

```sh
Remove-Item alias:\ls
```

## [Powershell 对文件批量重命名](#目录)

### 单个文件重命名

需求：將 `C:\Users\Gakki\Pictures\Saved Pictures` 文件夾下的 `test.jpg` 文件重命名为 `TEST.jpg`

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/posh_rename_1.png)

```sh
Rename-Item 'C:\Users\Gakki\Pictures\Saved Pictures\test.jpg' -NewName 'TEST.jpg'
```

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/posh_rename_2.png)

### 批量改文件扩展名

需求：將 `C:\Users\Gakki\Pictures\TEST` 文件夾下的所有的 `png` 文件改为 `jpg` 文件，即 `.png` 改为 `.jpg`

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/posh_rename_3.png)

```sh
get-childItem 'C:\Users\Gakki\Pictures\TEST' *.png | rename-item -newname { $_.name -replace '\.png','.jpg' }
```

PS：由于 `replace` 的模式匹配字符串参数支持正则，`'.png'` 要转义成 `'\.png'` 。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/posh_rename_4.png)

### 批量为文件加前缀

需求：將 `C:\Users\Gakki\Pictures\Saved Pictures` 文件夾下的所有的 `jpg` 文件加上一个 `"Test\_"` 的前缀

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/posh_rename_5.png)

```sh
get-childItem 'C:\Users\Gakki\Pictures\Saved Pictures' -r *.jpg | rename-Item -newname { 'Test_'+ $_.name }
```

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/posh_rename_6.png)

### 批量重命名并编号

需求：將 `C:\Users\Gakki\Pictures\Saved Pictures` 文件夾下的所有的 `jpg` 文件重命名为 `win_wallpaper_1.jpg`、`win_wallpaper_2.jpg` 这样的形式

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/posh_rename_7.png)

```sh
get-childItem 'C:\Users\Gakki\Pictures\Saved Pictures' -r *.jpg | foreach-Object -Begin { $count = 1 } -Process { rename-Item $_.fullname -NewName "win_wallpaper_$count.jpg"; $count++ }
```

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/posh_rename_8.png)

## [快速保存图片 && 图片批量编号](#目录)

当在网上看到喜欢的图片，不需要再右键另存了，直接拖拽到要存放的位置即可！

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/win_tips3.gif)

当对文件夹中的图片进行批量编号时，系统就会自动将所有图片重命名为 “ 新名称 +（数字编号）” 的格式。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/win_tips1.gif)

## [Windows 软件包管理工具](#目录)

### WinGet

#### 安装

在 `WinGet` 的官方 `GitHub` 仓库 [Release](https://github.com/microsoft/winget-cli/releases) 页面下，手动下载 `WinGet` 的安装程序进行手动安装。

#### 仓库

可用应用程序的完整 `Manifest` 文件列表可以在 `GitHub` 上面开源的 [microsoft / winget-pkgs](https://github.com/microsoft/winget-pkgs/tree/master/manifests) 仓库找到。

#### 操作和命令

搜索特定软件

```sh
winget search --name wechat  # --name 可省略
```

显示软件详细信息

```sh
winget show wechat
```

安装软件

```sh
winget install wechat --rainbow # --rainbow 进度条花里胡哨
```

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/winget_1.png)

基本信息

安装的是 `exe` 文件，安装后在桌面自动创建快捷方式，默认的安装路径是在 `C` 盘的 `Program Flies(x86)` 里面，当然安装位置在安装时可以添加命令修改，目前 `winget` 还不支持卸载文件。

常用命令

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/winget_2.png)

**PS:** `WinGet` 提供了一个 `source` 的命令，利用 `winget source <command>`，我们就可以方便地管理不同的 `WinGet` 软件 `Manifest` 仓库，比如：

- `winget source add <软件源>`：添加新的软件源
- `winget source list`：列出当前已添加的软件源
- `winget source update`：更新当前全部添加的软件源
- `winget source remove`：移除当前使用的软件源 ……

当然，由于 `WinGet` 还处于预览版，所以还没有出现除了官方仓库外可用的软件仓库。

#### 官方文档

<https://docs.microsoft.com/zh-cn/windows/package-manager/>

### Scoop

> 安装前，强烈建议将自己手动配的环境变量清除，比如 `$HOME`，`$PYTHONPATH` 等，既然选择试用 `scoop`，那就用 `scoop` 自己处理环境变量，否则可能会与其他软件冲突。

#### 安装 Scoop

```sh
Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')

# or shorter
iwr -useb get.scoop.sh | iex
```

#### 帮助文档

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/scoop_help.png)

#### 自定义软件安装的位置

自定义 `Scoop` 安装软件的位置，需要指定 `$SCOOP` 环境变量，在 `powershell` 里可以用几条命令完成。

```sh
$env:SCOOP='D:\Applications\Scoop'
[Environment]::SetEnvironmentVariable('SCOOP', $env:SCOOP, 'User')
```

#### 配置代理

由于某些程序网站的网络环境的问题，如果有代理可以配置一下代理

```sh
scoop config proxy [username:password@]host:port
```

这会将相关配置写入 `Scoop` 的配置文件，一般在 `$HOME/.config/scoop/config.json` 里配置。

#### aria2 多线程下载

`aria2` 多线程下载替换默认下载方式：`scoop install aria2`

#### 添加仓库

`Scoop` 自带的 `main bucket` 软件过少，我们需要添加常用仓库 `extras bucket`：

```sh
scoop bucket add extras
```

以及

```sh
scoop bucket add Ash258 'https://github.com/Ash258/scoop-Ash258.git'
```

前者是官方的，后者是个人维护的，有许多有用的但无法进入官方标准的软件，比如 `potplayer`

社区提供的可用源列表 `github` 地址如下：<https://github.com/lukesampson/scoop/blob/master/buckets.json>

其他原团队或者个人维护的资源库列表参考地址：[scoop-directory](https://rasa.github.io/scoop-directory/)

#### 常用操作和命令

|   命令    |     动作     |
| :-------: | :----------: |
|  🌟search  |  搜索软件名  |
|   info    | 查看软件详情 |
|   home    | 打开软件主页 |
| 🌟install  |   安装软件   |
|  🌟status  | 查看软件状态 |
|  update   |   更新软件   |
| uninstall |   卸载软件   |

#### 备份

`Scoop` 有一个功能可以导出所安装的软件至文本文件，但目前我还没找到如何导入…… 幸运的是，有一款叫[scoop-backup](https://github.com/KNOXDEV/scoop-backup) 的软件可以把当前所安装的软件都导出成一个 `.ps1` 文件或者 `.bat` 文件。双击该文件可以恢复整个 `Scoop` 软件列表。不过 `persist` 文件夹的设置文件目前还需要手动拷贝粘贴。

#### 基本信息

`Scoop` 在你的用户根目录（一般是 `C:\Users\用户名`）下创建了一个名为 `scoop` 的文件夹，并默认将软件下载安装到这个文件夹下

`Scoop` 将软件安装到一个相对隔离的环境下（Each program you install is isolated and independent），从而保证环境的统一和路径不被污染

`scoop` 是通过 `shim` 来软链接一些应用，这样的设计让应用之间不会互相干扰，十分方便。

进阶命令和使用方法可以参考 [Github](https://github.com/lukesampson/scoop)，[Wiki](https://github.com/lukesampson/scoop/wiki)。

#### 小技巧

强制安装，像 `vscode-portable-nightly` 这种 `nightly` 的软件如果有更新，其指向的链接通常没有变化，但 `Scoop` 无法检测到的时候可以通过 `scoop update vscode-portable-nightly -kf` 来强制更新。

`Scoop` 路径下 `$SCOOP\persist` 是持续存在的目录，通常用来放配置文件，即使软件更新也可以保持老的配置。但有时你想完全重装某个软件的时候，就需要删除该目录下对应的软件文件夹，以达到完全重装的目的。

## [Windows 软件清单](#目录)

### [PowerToys](https://github.com/microsoft/PowerToys/releases)：系统增强工具

#### PowerToys Run：快速启动

快速启动器，类似于第三方应用中的 [WOX](http://www.wox.one/) ，能够快速定位软件、文件或是文件夹并迅速打开。

> 操作技巧

`Alt + Space` 的操作唤出 `PowerToys Run` 的面板

被选中（深色标出）的选项右侧会出现数个选项，对不同类型的选项有不同的操作。

- 应用程序可以选择以管理员方式打开，快捷键 `Ctrl + Shift + Enter`
- 文件或文件夹则可以复制所在的路径，快捷键 `Ctrl + C`
- 文件还可以选择打开文件所在位置，快捷键 `Ctrl + Shift + E`

通过直接输入公式来通过 `Windows` 自带的计算器进行计算操作。经过测试，可以使用如 `abs`，s`qrt` 等等。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/tool_list_2.png)

另外还能够通过 `>` 来执行一些命令。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/tool_list_3.png)

#### Image Resizer：图片尺寸调整

在 `PowerToys` 打开 `Enable Image Resizer` 之后，在文件资源管理器中右键单击一个或选定多个图像文件，然后从右键菜单中选择「重设图片大小」。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/tool_list_1.png)

- 关于尺寸，用户可以添加新的预设大小。可以配置为填充，适合或拉伸。用于调整大小的单位也可以设置为厘米、英寸、百分比和像素。
- 关于编码，用户可以更改回滚编码器(当不能保存为原始格式时使用的编码器)并修改 PNG、JPEG 和 TIFF 的设置。
- 关于文件，用户可以修改调整大小后的图像文件名的格式，也可以选择保留原来最后修改日期的调整后的图像。

#### PowerRename：文件重命名

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/tool_list_4.png)

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

#### Shortcut Guide：系统快捷键指南

按住键盘上的 `Windows` 键大约 1 秒钟（默认设置为 900 毫秒），会出现一个显示和 `Windows` 快捷键相关的叠加层展示使用 `Windows` 键的常见键盘快捷键。

#### Keyboard Manager：键盘映射

这是一款非常简单却又非常实用的小工具，能够将一个按键映射为另一个按键，或者将一组快捷键映射为另一组。

### 微软官方已删除数据恢复工具

[Windows File Recovery](https://www.microsoft.com/zh-cn/p/windows-file-recovery/9n26s50ln705?activetab=pivot:overviewtab) 是微软发布的用于数据恢复的命令行工具，可以用来恢复 NTFS, FAT, exFAT 和 ReFS 文件系统的文件，支持 HDD, SSD, USB, 和记忆卡。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/winfr_1.png)

在 `Windows` 商店安装后，以管理员权限启动的 `cmd` 或者 `powershell` 来直接运行 `winfr`

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/winfr_2.png)

比如，你要恢复 `U` 盘（E: 盘）里的 `jpg` 文件，那么就需要使用签名模式，命令如下：

```sh
winfr E: D: /x /n *.pdf
```

然后就开始扫描（需要按下 `Y` 同意继续）就可以恢复文件了：

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/winfr_3.png)

最终，`winfr` 将其他格式的图片甚至视频也一起恢复了（意外恢复了我的小片片 😳），并且保存在了 `D` 盘下的 `Recovery_20200704_155233` 文件夹中。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/win/winfr_4.png)

具体使用方法参见[官方文档](https://support.microsoft.com/zh-cn/help/4538642/windows-10-restore-lost-files)

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

- `26` 个直播平台的直播源：[real-url](https://github.com/wbt5/real-url)
- 直播源相关资源汇总：[Tvlist-awesome-m3u-m3u8](https://github.com/billy21/Tvlist-awesome-m3u-m3u8)

### qBittorrent：BT 下载

勾选下图红框内的选项 并复制所有 `Tracker` 后粘贴到下方输入框中，然后点击 [Apply] 保存。(如下图所示)

![](../Images/tool_list_5.png)

全网热门 [BitTorrent Tracker](https://github.com/XIU2/TrackersListCollection) 列表！

- 精选列表：<https://trackerslist.com/best.txt>

- 完整列表：<https://trackerslist.com/all.txt>

### Dism++：Windows 的一个集中式的系统管理工具

官网：[Dism++ | 全新的 Windows 实用工具](https://www.chuyu.me/zh-Hans/Document.html)

### 其他

- [WOX](https://github.com/Wox-launcher/Wox)：快速启动（[Wox 主题样式基础的自定义](https://blog.csdn.net/weixin_36872950/article/details/100028325)）

- [Clash for Windows](https://github.com/Fndroid/clash_for_windows_pkg/releases)：科学上网

- Bandizip：压缩/解压缩

- Everything：文件快速搜索

- Snipaste：截图/贴图

- ScreenToGif：录制 GIF 动态图

- QuickLook：文件管理器预览增强

- LockHunter：解除文件占用

- Geek Uninstaller：软件卸载

- QQ：国内不得不用的流氓 IM

- 微信：同上

- 百度网盘：国内事实上的垄断网盘

- Acrobat DC：Adobe 家的 PDF 解决方案

- Typora：Markdown 软件，界面简洁

- Telegram：国外跨平台的即时通信软件

- GoogleDrive：文件自动同步、共享、备份

- 网易云 & Listen1：在线音乐

- Mcool：本地无损音乐

- Rufus：USB 启动盘制作工具

- Wise Registry Cleaner：注册表清理

- Lenovo Vantage：硬件设置、硬件检测、联想官方驱动和固件更新
