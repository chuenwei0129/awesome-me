# Mac下配置Aria2
## 安装和设置 Aria2

```bash
# 使用 Homebrew 安装 aria2
brew install aria2

# 创建配置文件aria2.conf和空对话文件aria2.session
mkdir ~/.aria2 && cd ~/.aria2
touch aria2.conf
touch aria2.session
```
编辑配置文件`aria2.conf`

- [设置文件详解](#file-aria2-template-conf)
- [自用设置文件](#file-aria2-conf)

本人设置文件:

- 默认开启 RPC 模式
- 已设置RPC授权令牌, 详见设置文件注释
- 已经添加 BT tracker，更多详见 [XIU2/TrackersListCollection](https://trackerslist.com/#/zh)

## 设置为macOS的开机启动
> 参考: [控制macOS的开机启动](https://www.jianshu.com/p/eee8a7de179c)

### 创建用户启动文件

```bash
touch ~/Library/LaunchAgents/aria2.plist
```
写入如下

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

> 更多`launchctl`使用方法, 详见命令手册<br>
> 可使用`killall aria2c` 结束进程, 并会自动重启进程

## 添加自动更新`BT tracker`功能

### 创建`trackers-list-aria2.sh`脚本
> 参考: [Aria2 bt-tracker跟踪服务器列表自动更新](https://www.feng.ee/aria2-trackers-auto-update.html)

脚本内容详见: [trackers-list-aria2.sh](#file-trackers-list-aria2-sh), 脚本放置到如`~/.aria2/`

设置运行权限:
```bash
chmod +x ~/.aria2/trackers-list-aria2.sh
```

### 设置任务计划程序 实现自动更新
> 参考:
> - [Aria2 bt-tracker跟踪服务器列表自动更新](https://www.feng.ee/aria2-trackers-auto-update.html)
> - [mac下crontab执行定时脚本](https://blog.csdn.net/ty_hf/article/details/72354230)

编译当前用户任务计划
```bash
crontab -e
```

在打开的`vi`中 键入如下, 并使用`:wq`命令保存退出, 可用`crontab -l`查看当前用户任务计划
```
0 18 * * * ~/.aria2/trackers-list-aria2.sh
```
或者 直接
```bash
(crontab -l 2&> /dev/null; echo "0 18 * * * ~/.aria2/trackers-list-aria2.sh") | crontab
```

> 以上表示: 每天下午 6 点自动更新`BT tracker`(并重启`aria2`服务)<br>
> 更多`crontab`时间的设定详见: [这里](https://user-images.githubusercontent.com/7850715/87239248-94674100-c43f-11ea-8445-1d084be61436.png)

> 取消计划任务
> ```bash
> crontab -e
> ```
> 然后手动删除, 或者
> ```bash
> crontab -l 2&> /dev/null| sed "/trackers-list-aria2.sh/d" | crontab
> ```

## 添加下载通知

> 参考: [macOS下 给aria2 RPC添加一个下载通知](https://github.com/maboloshi/Blog/blob/hexo/source/_posts/05.%20macOS%E4%B8%8B%20%E7%BB%99aria2%20RPC%E6%B7%BB%E5%8A%A0%E4%B8%80%E4%B8%AA%E4%B8%8B%E8%BD%BD%E9%80%9A%E7%9F%A5.md)

最终效果：当下载完成会在屏幕右上角弹出一个提示框显示具体下载完成的文件名，同时中文语音播报：“有个文件下载完成，请查收！”

![macOS 下aria2 提示框实例](https://user-images.githubusercontent.com/7850715/74525348-cc159f80-4f18-11ea-84bd-56be79bf3b0a.png)

### 创建`download-complete-hook.sh`脚本

> 参考:
> - [aria2 event-hook](https://aria2.github.io/manual/en/html/aria2c.html#event-hook)
> - [Display notification from the Mac command line](https://code-maven.com/display-notification-from-the-mac-command-line)
> - [在mac命令行执行显示通知](https://www.zixi.org/archives/notification_on_macos.html)
> - [Pass in variable from shell script to applescript](https://stackoverflow.com/a/17243326/7488424)

脚本内容详见: [download-complete-hook.sh](#file-download-complete-hook-sh), 脚本放置到如`~/.aria2/`

设置运行权限:
```bash
chmod +x ~/.aria2/download-complete-hook.sh
```
### 添加 Hook 设置

> 参考:
> -  https://aria2.github.io/manual/en/html/aria2c.html#event-hook

在 aria2 设置文件`.aria2.conf`加入如下：

```bash
# BT下载完成(如有做种将包含做种，如需调用请务必确定设定完成做种条件)
on-bt-download-complete=${HOME}/.aria2/download-complete-hook.sh
# 下载完成
on-download-complete=${HOME}/.aria2/download-complete-hook.sh
```

## Aria2 web UI

无需安装，直接使用浏览器打开: [AriaNg版 UI](http://ariang.mayswind.net/latest/)

### PRC 设置
> 根据 aria2 配置文件中的 PRC 相关设置项进行设置

<img width="839" alt="AriaNg_PRC_设置" src="https://user-images.githubusercontent.com/7850715/73242932-3353f580-419e-11ea-8059-dc9490a5f595.png">

## 安装浏览器下载插件
[Aria2 for Chrome插件](https://chrome.google.com/webstore/detail/aria2-for-chrome/mpkodccbngfoacfalldjimigbofkhgjn)

- 内置一个离线 AriaNg版 UI
- 整合右键下载菜单

> 内置的离线 AriaNg版也需要设置PRC，否则无法“导出到 ARIA2 RPC”。

---
## **以下内容仅供参考 现阶段实用性不大**

## 百度云下载
> 方案来自: https://www.runningcheese.com/baiduyun

### 安装 [`网盘助手`](http://pan.newday.me/)

#### 浏览器插件版
直接进入[网盘助手](http://pan.newday.me/)主页,按浏览器不同下载并安装对应的插件

#### 脚本版
[网盘助手脚本](https://greasyfork.org/zh-CN/scripts/378301)，需要通过拓展 [Violentmonkey](https://violentmonkey.github.io/get-it/) 或者 [Tampermonkey](https://www.tampermonkey.net/) 等脚本管理器来启用

### 使用方法
> 配合[Aria2 for Chrome插件](https://chrome.google.com/webstore/detail/aria2-for-chrome/mpkodccbngfoacfalldjimigbofkhgjn)使用

1. 选择要下载的文件，点击页面里的 "生成链接" 来获取加速下载地址。
2. 使用鼠标右键点击链接，选择“导出到 ARIA2 RPC”，然后确定下载。

![网盘助手配合Aria2_for_Chrome](https://user-images.githubusercontent.com/7850715/73240648-81192f80-4197-11ea-8154-653c7b95adc1.gif)
> 图片出处:https://www.runningcheese.com/baiduyun

## 参考
- [Mac下配置Aria2来代替迅雷](https://www.damocles.me/2019/06/16/mac-aria2-configure/)
- [Aria2配置文件参数翻译详解](http://www.senra.me/aria2-conf-file-parameters-translation-and-explanation/)
- [关于aria2最完整的一篇](http://ivo-wang.github.io/2019/04/18/%E5%85%B3%E4%BA%8Earia2%E6%9C%80%E5%AE%8C%E6%95%B4%E7%9A%84%E4%B8%80%E7%AF%87/)
- [aria2c手册](https://aria2.github.io/manual/en/html/aria2c.html#aria2-conf)
