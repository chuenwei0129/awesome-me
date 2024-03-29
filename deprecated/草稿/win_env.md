# 打造完美的、纯净的 Windows 开发环境<!-- omit in toc -->

- [安装适用于 Linux 的 Windows 子系统](#安装适用于-linux-的-windows-子系统)
- [Ubuntu 创建 root 用户](#ubuntu-创建-root-用户)
- [更换 `/etc/apt/sources.list` 文件里的源](#更换-etcaptsourceslist-文件里的源)
  - [备份源列表文件 `sources.list`](#备份源列表文件-sourceslist)
  - [`sources.list` 文件修改](#sourceslist-文件修改)
  - [刷新列表](#刷新列表)
  - [其他源](#其他源)
- [安装中文语言包](#安装中文语言包)
  - [首先查看是否安装了中文语言包](#首先查看是否安装了中文语言包)
- [环境变量](#环境变量)
- [代理](#代理)
  - [windows 终端](#windows-终端)
  - [WSL](#wsl)
- [开发环境](#开发环境)
  - [lua](#lua)
    - [windows](#windows)
    - [ubuntu](#ubuntu)
  - [powershell](#powershell)
    - [z.lua](#zlua)
    - [PSReadLine](#psreadline)
    - [Git Bash 工具包](#git-bash-工具包)
  - [zsh](#zsh)
    - [安装、配置](#安装配置)
    - [插件、主题](#插件主题)
    - [解决 ls 命令背景色问题](#解决-ls-命令背景色问题)

## 安装适用于 Linux 的 Windows 子系统

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

> `WSL 2` 需要更新其内核组件。有关信息，请访问 https://aka.ms/wsl2kernel

下载链接提供的 `Linux` 内核更新包，安装即可。

若要将分发版设置为默认 `WSL 2` 版本，请运行：

```sh
wsl --set-default-version 2
```

## Ubuntu 创建 root 用户

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

## 更换 `/etc/apt/sources.list` 文件里的源

`Ubuntu` 配置的默认源并不是国内的服务器，下载更新软件都比较慢。

### 备份源列表文件 `sources.list`

```sh
sudo cp /etc/apt/sources.list /etc/apt/sources.list_backup
```

### `sources.list` 文件修改

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

### 刷新列表

```sh
sudo apt update
sudo apt upgrade
```

### 其他源

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

## 安装中文语言包

### 首先查看是否安装了中文语言包

输入命令 `locale -a` 查看是否有：`zh_CN.utf8`，如果没有，首先需要安装中文语言包，输入以下命令：

```sh
sudo apt-get install language-pack-zh-hans
```

然后添加中文支持

1. 备份 `locale` 文件

```sh
sudo cp /etc/default/locale /etc/default/locale_backup
```

2. 修改 `locale` 文件，配置中文

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

修改为英文，如果没安装英文语言包可以安装：

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

## 环境变量

> `Windows` 系统中有两种环境变量：用户变量和系统变量

1. 环境变量不区分大小写，例如 `path` 跟 `PATH` 是一样的

2. 系统变量对所有用户有效，用户变量只对当前用户有效

3. 用户变量与系统变量，名称是变量，值是里面的内容，也就是通过变量存储了想要存储的内容，方便调用

4. 系统变量与用户变量的 `PATH`：告诉系统可执行文件放在什么路径（平常执行程序的路径，要放在 `PATH` 里面，不能建一个变量，`CMD` 会提示“不是内部或外部命令，或者不是可执行程序”）

5. `windows` 系统在执行用户命令时，若用户未给出文件的绝对路径，则首先在当前目录下寻找相应的可执行文件、批处理文件等

6. 若果当前目录找不到对应文件名的程序，在系统变量的 `PATH` 的路径中，依次寻找对应的可执行程序文件（查找顺序是按照路径的录入顺序从左往右寻找的，最前面一条的优先级最高，如果找到程序就停止寻找，后面的路径不再执行）

7. 如果系统变量的 `PATH` 的路径找不到，再到用户变量的 `PATH` 路径中寻找（如果系统变量和用户变量的 `PATH` 中同时包含了同一个命令，则优先执行系统变量 `PATH` 中的命令）

8. 新加了环境变量以后，要确定保存后，再重启 `CMD`，否则命令不生效

## 代理

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

- 检测 IP ：

  ```sh
  # 国外
  curl ipinfo.io

  # 国内
  curl cip.cc
  ```

- `PowerShell` 可以通过配置 `$profile` 初始化启动代理

  ```sh
  #-----------  Set Proxy BEGIN  ---------------------

  # 配置 http 代理
  $Env:http_proxy="http://127.0.0.1:7890"

  # 配置 https 代理
  $Env:https_proxy="http://127.0.0.1:7890"

  # 配置 socks5 代理
  # $Env:all_proxy="socks5://127.0.0.1:7891"

  #------------ Set Proxy END ------------------------
  ```

### WSL

1. `powershell` 输入 `ipconfig` 或在 `clash` 客户端均可获取到主机 `IP`

   ![](../Images/ipconfig.png)

2. clash 客户端勾选上 Allow LAN

   ![](../Images/clash_wsl.png)

3. 通过 `alias`（别名）加入 `~/.zshrc` 中，方便快速输入。在 `~/.zshrc` 中添加如下内容：

   ```sh
   # 墙外
   alias gfw='export http_proxy="http://192.168.43.97:7890";export https_proxy="http://192.168.43.97:7890";'
   # 墙内
   alias ungfw="unset http_proxy https_proxy"
   # 测试 IP
   alias myip="curl ipinfo.io"
   ```

   然后执行 `source ~/.zshrc` 加载配置文件。

## 开发环境

### lua

#### windows

1. [下载安装](http://joedf.ahkscript.org/LuaBuilds/)
2. 配置环境变量

   ![](../Images/lua_win.png)

   把存放 `Lua` 文件夹的路径写入如下位置即可。

3. `powershell` 输入 `lua` 输出如下即成功。

   ![](../Images/lua_sucess.png)

#### ubuntu

在 `Ubuntu` 系统上使用以下命令编译安装 `Lua`：

安装依赖库：

```sh
sudo apt install build-essential # 安装 gcc 和 make
sudo apt install libreadline-dev
```

然后依次执行：

```sh
curl -R -O http://www.lua.org/ftp/lua-5.3.5.tar.gz
tar zxf lua-5.3.5.tar.gz
cd lua-5.3.5
sudo make linux test
sudo make linux install
```

### powershell

#### [z.lua](https://github.com/skywind3000/z.lua)

快速路径切换工具（类似 [z.sh](https://github.com/rupa/z) / autojump / fasd），兼容 `Windows` 和所有 `Posix Shell` 以及 `Fish Shell`，同时包含了众多改进。

前面安装 `lua` 环境就是为了这个工具。

首先下载该项目

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

![](../Images/tab.png)

设置类似于 `zsh-autosuggestions` 基于输入历史的自动命令提示

在 `$profile` 文件增加

```sh
Set-PSReadLineOption -HistorySearchCursorMovesToEnd
Set-PSReadLineKeyHandler -Key UpArrow -Function HistorySearchBackward
Set-PSReadLineKeyHandler -Key DownArrow -Function HistorySearchForward
```

![](../Images/suggestions.gif)

更完整的配置可参照[官方样例](https://github.com/PowerShell/PSReadLine/blob/master/PSReadLine/SamplePSReadLineProfile.ps1)

#### Git Bash 工具包

因为 `Git` 的 `usr\bin` 下所有 `GNU` 工具都是 `exe` 可执行文件，所以 `Powershell` 完全可以直接运行这些工具。要在 `Powershell` 下使用这个工具，只需要将 `Git` 的 `usr\bin` 目录添加到 `PATH` 中即可。

![](../Images/git_gnu.png)

`Powershell` 自带的命令别名会把 `GNU` 的同名工具命令覆盖。

利用 `Get-Alias` 命令就可以查看 `Powershell` 中设置的·命令别名，这样我们就可以很方便的找出冲突的命令，并取消对应的命令别名。

找出冲突的别名后就可以用 `Remove-Item alias:\<command>` 删除命令别名了，比如我删除了以下的命令别名：

```sh
Remove-Item alias:\rm
Remove-Item alias:\cp
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

![](../Images/linux_shell.png)

安装 `zsh`

```sh
sudo apt install zsh
```

下载安装 `oh-my-zsh`

运行命令下载安装

```sh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

![](../Images/oh_my_zsh.png)

#### 插件、主题

![](../Images/zsh_plugin.png)

- [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)：为 `zsh `提供基于输入历史的自动命令提示

  ```sh
  git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
  ```

- [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)：为 zsh 命令提供色彩高亮

  ```sh
  git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
  ```

- [z](https://github.com/rupa/z)：快速跳转不同的目录、路径、文件夹，oh-my-zsh 内置。

- [z.lua](https://github.com/skywind3000/z.lua)：快速路径切换工具，在我的 wsl 2 中 cpu 会狂转，遂放弃，纯净的 linux 系统可以一试。

- [powerlevel10k](https://github.com/romkatv/powerlevel10k#oh-my-zsh)：A fast reimplementation of Powerlevel9k ZSH theme，花里胡哨的现在也不喜欢了。

#### 解决 ls 命令背景色问题

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

现在觉得没啥必要。
