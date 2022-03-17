# 我是如何使用 Mac 的<!-- omit in toc -->

## 给 Mac 硬件做健康检查

在使用 Mac 电脑的过程中，如果认为 Mac 可能存在硬件问题，[可以使用“Apple 诊断”来帮助确定可能存在故障的硬件组件](https://support.apple.com/zh-cn/HT202731)。

## 给 M1 芯片 Mac 重装系统

M1 芯片的 Mac 进入恢复模式很简单，就是先关机，然后长按电源键一直按住不动，直到出现图中这个 ⚙️ 的图标就算进入恢复模式了。

![Mac恢复模式](macos-monterey-as-recovery-options-selected.png)

选择“选项”，然后点按“继续”。

如果是已有用户的话，应该会弹出用户图标以及输入密码登录界面，要求输入这个用户的管理员密码，请照做。

如果系统要求输入之前在这台 Mac 上使用过的 Apple ID 和密码，请照做。

接下来会提示 Mac 需要激活，所以必须连接网线或者 WiFi，这个界面没有出现 WiFi 的选项，实际在右上角，点击图标后就可以选择 WiFi，连接成功后点击下一步。Mac 会自动转圈显示激活成功。

![](macos-refactor-wifi.jpg)

然后在这个界面会弹出熟悉的几个选项，这里先不要点击第二个重新安装 macOS 。

![](v2-29309a7989e2540f53a6a2df5c1cd20b_b.jpg)

点击左上角的实用工具-终端。

![](v2-a1aa6b7e0ed6662fb0e11b27647d4a1e_b.jpg)

输入 `resetpassword`， 回车。

![](v2-9135394786d6ffcdcecbcc4c45b6766a_b.jpg)

在弹出的重设密码界面，不管显示啥不用去管，直接点击左上角的恢复助理-抹掉 Mac...

![](v2-f8d4fa70e04f7fe4e3196cd246c93841_b.jpg)

弹出的抹掉 Mac 界面，继续点下面的**小蓝字**，抹掉 Mac...

![](v2-31f4da3d9f685a2c85c33308c134148b_b.jpg)

在弹出的警告图标选择抹掉 Mac 就可以了。

![](v2-c8cb18fe8160f0e94a5982587dc6e798_b.jpg)

然后就是耐心得等待进度条加载完毕，就算抹掉成功了，不会太久。抹掉后可以看到和一开始的页面很像，这个页面就是提示激活 Mac，WiFi 图标还是右上角。

![](v2-28c9fbf107d276dac10e9fb1279cee31_b.jpg)

显示联网激活成功，点击下面的退出到恢复界面。

![](v2-026637987676f06150d8fd0b85e9d5c9_b.jpg)

这个时候 Mac 就是干干净净的了，可以点击第二个选项开始重装系统了。

![](v2-64d677c2cba9435d8ef4ae0739e3f120_b.jpg)

点击继续 Continue。

![](v2-e25a684239f7cebe66bd6506fb8c146f_b.jpg)

点击同意 Agree。

![](v2-37c337d99cbb935efc78e70eb8d4107e_b.jpg)

接下来就是就是纯粹的联网下载安装了。

![](v2-2f869cb38468c98f4fbcbb75649d89cd_b.jpg)

![](v2-627d8b2b676b9b639fd1fe0954d4bc35_b.jpg)

## 安装

一些常用命令
1. 安装卸载软件
brew --version 或者 brew -v 显示 brew 版本信息
brew install <name> 安装指定软件
brew unistall <name> 卸载指定软件
brew list 显示所有的已安装的软件
brew search text 搜索本地远程仓库的软件，已安装会显示绿色的勾
brew search /text/ 使用正则表达式搜软件
2. 升级软件相关
brew update 自动升级 Homebrew（从 github 下载最新版本）
brew outdated 检测已经过时的软件
brew upgrade 升级所有已过时的软件，即列出的以过时软件
brew upgrade <formula> 升级指定的软件
brew pin <formula> 禁止指定软件升级
brew unpin <formula> 解锁禁止升级
brew upgrade --all 升级所有的软件包，包括未清理干净的旧版本的包
3. 清理相关
Homebrew 再升级软件时候不会清理相关的旧版本，在软件升级后我们可以使用如下命令清理

brew cleanup -n 列出需要清理的内容

brew cleanup <formula> 清理指定的软件过时包

brew cleanup 清理所有的过时软件

brew unistall <formula> 卸载指定软件

brew unistall <fromula> --force 彻底卸载指定软件，包括旧版本

