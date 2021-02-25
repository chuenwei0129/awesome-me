# Windows 上面用 WSL 2 优雅开发

## 目录

- [Windows 上面用 WSL 2 优雅开发](#windows-上面用-wsl-2-优雅开发)
  - [安装适用于 Linux 的 Windows 子系统](#安装适用于-linux-的-windows-子系统)
  - [Ubuntu 创建 root 用户](#ubuntu-创建-root-用户)
  - [更换 /etc/apt/sources.list 文件里的源](#更换-etcaptsourceslist-文件里的源)
    - [备份源列表文件 sources.list](#备份源列表文件-sourceslist)
    - [sources.list 文件修改](#sourceslist-文件修改)
    - [刷新列表](#刷新列表)
    - [其他源](#其他源)
  - [安装中文语言包](#安装中文语言包)
    - [首先查看是否安装了中文语言包](#首先查看是否安装了中文语言包)
  - [参考](#参考)

## 安装适用于 Linux 的 Windows 子系统

必须先启用“适用于 Linux 的 Windows 子系统”可选功能，然后才能在 Windows 上安装 Linux 分发版。

以管理员身份打开 PowerShell 并运行：

```sh
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```

> 如只需要 WSL 此时可重启，然后在商店安装 Linux 分发版即可。

安装 WSL 2 之前，必须启用“虚拟机平台”可选功能。

以管理员身份打开 PowerShell 并运行：

```sh
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

重新启动计算机。

查看 WSL 版本，请运行：

```sh
wsl --list --verbose
```

若要将 WSL 升级为 WSL 2 版本支持，请运行：

```sh
wsl --set-version <distribution name> <versionNumber>
```

弹出信息：

WSL 2 需要更新其内核组件。有关信息，请访问 https://aka.ms/wsl2kernel

下载链接提供的 Linux 内核更新包，安装即可。

若要将分发版设置为默认 WSL 2 版本，请运行：

```sh
wsl --set-default-version 2
```

## Ubuntu 创建 root 用户

输入：`sudo passwd root`

终端会显示

`Enter new UNIX password:`

设置 root 用户密码，按 Enter

终端显示

`Retype new UNIX password:`

再输入一遍
确定之后终端会显示

`passwd: password updated successfully`

表示 root 用户成功创建并设置密码

## 更换 /etc/apt/sources.list 文件里的源

Ubuntu 配置的默认源并不是国内的服务器，下载更新软件都比较慢。

### 备份源列表文件 sources.list

```sh
sudo cp /etc/apt/sources.list /etc/apt/sources.list_backup
```

### sources.list 文件修改

选择合适的源，替换原文件的内容，保存编辑好的文件, 以阿里云更新服务器为例（可以分别测试阿里云、清华、中科大、163 源的速度，选择最快的）

打开 sources.list 文件：

```sh
sudo nano /etc/apt/sources.list
```

编辑 **/etc/apt/sources.list** 文件, 在文件最前面添加阿里云镜像源：

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

1. 备份 locale 文件

```sh
sudo cp /etc/default/locale /etc/default/locale_backup
```

2. 修改 locale 文件，配置中文

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

## 参考

- [适用于 Linux 的 Windows 子系统文档](https://docs.microsoft.com/zh-cn/windows/wsl/)
- [在 Windows 上面用 WSL 优雅开发](https://dowww.spencerwoo.com/1.1/1-preparations/1-0-intro.html#%E4%BB%80%E4%B9%88%E6%98%AF-wsl)
- [Windows 的 WSL 音频解决方案](https://github.com/AlanAlbert/wsl-audio-musicbox)
