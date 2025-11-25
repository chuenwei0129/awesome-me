---
title: 安装和设置 Aria2
toc: content
order: 999
---

## 安装和设置 Aria2

```bash
# 使用 Homebrew 安装 aria2
brew install aria2

# 创建配置文件 aria2.conf 和空对话文件 aria2.session
mkdir ~/.aria2 && cd ~/.aria2
touch aria2.conf
touch aria2.session
```

编辑配置文件 `aria2.conf`

本人设置:

- 默认开启 RPC 模式
- 已设置RPC授权令牌, 详见设置文件注释
- 已经添加 BT tracker，更多详见 [XIU2/TrackersListCollection](https://trackerslist.com/#/zh)

## 设置为 macOS 的开机启动

> 参考: [控制 macOS 的开机启动](https://www.jianshu.com/p/eee8a7de179c)

### 创建用户启动文件

```bash
touch ~/Library/LaunchAgents/aria2.plist
```

写入如下内容：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>KeepAlive</key>
    <true/>
    <key>Label</key>
    <string>aria2</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/local/bin/aria2c</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>WorkingDirectory</key>
    <string>/Users/maboloshi/Downloads</string>
</dict>
</plist>
```

> 注意: 修改`WorkingDirectory`目录

```bash
# 检查plist语法是否正确
plutil ~/Library/LaunchAgents/aria2.plist

# 修改文件权限
chmod 644 ~/Library/LaunchAgents/aria2.plist
```

### 添加并启用自启动项

```bash
# 添加自启动项: aria2
launchctl load ~/Library/LaunchAgents/aria2.plist

# 删除自启动项: aria2
launchctl unload ~/Library/LaunchAgents/aria2.plist

# 启动服务: aria2
launchctl start aria2

# 停止服务: aria2
launchctl stop aria2
```

> 更多 `launchctl` 使用方法, 详见命令手册
> 可使用 `killall aria2c` 结束进程, 并会自动重启进程

## 添加自动更新 `BT tracker` 功能

### 创建 `trackers-list-aria2.sh` 脚本

> 参考: [Aria2 bt-tracker跟踪服务器列表自动更新](https://www.feng.ee/aria2-trackers-auto-update.html)

脚本内容详见: [trackers-list-aria2.sh](#file-trackers-list-aria2-sh), 脚本放置路径如`~/.aria2/`

设置运行权限:

```bash
chmod +x ~/.aria2/trackers-list-aria2.sh
```

### 创建 `download-complete-hook.sh` 脚本

> - [aria2 event-hook](https://aria2.github.io/manual/en/html/aria2c.html#event-hook)
> - [Display notification from the Mac command line](https://code-maven.com/display-notification-from-the-mac-command-line)
> - [在mac命令行执行显示通知](https://www.zixi.org/archives/notification_on_macos.html)
> - [Pass in variable from shell script to applescript](https://stackoverflow.com/a/17243326/7488424)

脚本内容详见: [download-complete-hook.sh](#file-download-complete-hook-sh), 脚本放置路径如`~/.aria2/`

设置运行权限:

```bash
chmod +x ~/.aria2/download-complete-hook.sh
```

### 添加 Hook 设置

> 参考: <https://aria2.github.io/manual/en/html/aria2c.html#event-hook>

在 aria2 设置文件`.aria2.conf`中加入如下内容：

```bash
# BT下载完成(如有做种将包含做种，如需调用请务必确定设定完成做种条件)
on-bt-download-complete=${HOME}/.aria2/download-complete-hook.sh
# 下载完成
on-download-complete=${HOME}/.aria2/download-complete-hook.sh
```

## Aria2 web UI

无需安装，直接使用浏览器打开: [AriaNg 版 UI](http://ariang.mayswind.net/latest/)

### RPC 设置

> 根据 aria2 配置文件中的 RPC 相关设置项进行设置

![AriaNg_RPC_设置](https://user-images.githubusercontent.com/7850715/73242932-3353f580-419e-11ea-8059-dc9490a5f595.png)
*（图片描述：AriaNg 界面上的 RPC 设置）*

## 安装浏览器下载插件

[Aria2 for Chrome插件](https://chrome.google.com/webstore/detail/aria2-for-chrome/mpkodccbngfoacfalldjimigbofkhgjn)

- 内置一个离线 AriaNg 版 UI
- 整合右键下载菜单

> 内置的离线 AriaNg 版也需要设置 RPC，否则无法“导出到 ARIA2 RPC”。

## 百度云下载

> 方案来自: <https://www.runningcheese.com/baiduyun>

### 安装 [`网盘助手`](http://pan.newday.me/)

#### 浏览器插件版

直接进入[网盘助手](http://pan.newday.me/)主页, 按浏览器不同下载并安装对应的插件

#### 脚本版

[网盘助手脚本](https://greasyfork.org/zh-CN/scripts/378301)，需要通过扩展 [Violentmonkey](https://violentmonkey.github.io/get-it/) 或者 [Tampermonkey](https://www.tampermonkey.net/) 等脚本管理器来启用

### 使用方法

> 配合[Aria2 for Chrome插件](https://chrome.google.com/webstore/detail/aria2-for-chrome/mpkodccbngfoacfalldjimigbofkhgjn)使用

1. 选择要下载的文件，点击页面里的 "生成链接" 来获取加速下载地址。
2. 使用鼠标右键点击链接，选择“导出到 ARIA2 RPC”，然后确定下载。

![网盘助手配合Aria2_for_Chrome](https://user-images.githubusercontent.com/7850715/73240648-81192f80-4197-11ea-8154-653c7b95adc1.gif)

*（图片出处：https://www.runningcheese.com/baiduyun）*

## 参考

- [Mac下配置Aria2来代替迅雷](https://www.damocles.me/2019/06/16/mac-aria2-configure/)
- [Aria2配置文件参数翻译详解](http://www.senra.me/aria2-conf-file-parameters-translation-and-explanation/)
- [关于aria2最完整的一篇](http://ivo-wang.github.io/2019/04/18/%E5%85%B3%E4%BA%8Earia2%E6%9C%80%E5%AE%8C%E6%95%B4%E7%9A%84%E4%B8%80%E7%AF%87/)
- [aria2c手册](https://aria2.github.io/manual/en/html/aria2c.html#aria2-conf)
