---
group:
  title: 2021 🐮
  order: -2021
title: Switch 吃灰中
toc: content
---

> 关于我破解了 Switch 并且装满了游戏，依然吃灰这件事！

## SX OS 拥抱大气层

> [SX 完整拥抱大气层图文教程](https://shipengliang.com/games/sx-%e5%ae%8c%e6%95%b4%e6%8b%a5%e6%8a%b1%e5%a4%a7%e6%b0%94%e5%b1%82-%e5%9b%be%e6%96%87%e6%95%99%e7%a8%8b.html)

## 大气层离线升降级系统

> Switch 有真实系统和虚拟系统，真实系统进真实正版系统联网升级，虚拟破解系统用 Daybreak 离线升级。

💡 更新大气层和升级 Switch 系统是两步，因为大气层向下兼容，所以先更新大气层，再升级 Switch 系统。

**🕒 准备工作：**

文件传输方式参考：[Switch 大气层 Hekate 下的 USB 传输](https://shipengliang.com/games/switch-%e5%a4%a7%e6%b0%94%e5%b1%82-hekate%e4%b8%8b%e7%9a%84usb%e4%bc%a0%e8%be%93.html)或用**读卡器** (DBI 不支持大气层核心文件传输)。

**📋 注意事项：**

1. **emuMMC** 目录是大气层虚拟系统所在的位置，虚拟系统里的游戏和存档都在里面，所以不能删。
2. **Nintendo** 目录是真实系统所在的位置真实系统里的游戏都在里面，所以不能删
3. 所以最稳定的大气层更新方法：**保留 SD 卡上 emuMMC 和 Nintendo 两个目录后删除其它文件，再覆盖最新的大气层整合包。**

**🕹️ 更新步骤：**

1. 下载最新大气层整合包：[Atmosphere](https://github.com/AK478BB/AK-Atmosphere/releases) 并覆盖更新到 TF 卡根目录。
2. 下载 Switch 版本固件包：[Switch Firmware 固件](https://github.com/THZoria/NX_Firmware/releases)，并将固件包解压后传输到 TF 卡根目录。
3. [启动系统后，进入相册，运行 Daybreak](https://shipengliang.com/games/switch-%e5%a4%a7%e6%b0%94%e5%b1%82-atmosphere-%e5%a6%82%e4%bd%95%e7%a6%bb%e7%ba%bf%e5%8d%87%e7%ba%a7%e7%b3%bb%e7%bb%9f.html)

**🚗 图文教程：**

![20221119133546](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/20221119133546.png)

## USB 安装游戏

Mac 下用 USB 连接 Switch 需要 [Android File Transfer](https://www.android.com/filetransfer/) 支持。

![20221119140511](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/20221119140511.png)

> 💾 参考资料：[Switch DBI 图文使用教程](https://shipengliang.com/games/switch-dbi-%e5%9b%be%e6%96%87%e4%bd%bf%e7%94%a8%e6%95%99%e7%a8%8b.html)

## 小插曲

TX 拥抱大气层，使用 Mac 更新固件到 13.2.1 时，遇到报错

```sh
“failed to get update information, result: 0x00234a02”
```

经过 Google，在这个 [Error trying to update with Daybreak](https://gbatemp.net/threads/error-trying-to-update-with-daybreak.579036/) 讨论下的 [#17](https://gbatemp.net/threads/error-trying-to-update-with-daybreak.579036/#post-9299632) 得到了我们想要的答案。

> **问题及解决方案** (备份)

如果你平常是用 PC 来管理 SD 卡中的内容，而当你某次把 SD 卡插入 Mac 中，再插回 NS 中，往往就会报错无法开机。其原因主要和 Archive Bit 有关。

```sh
Some of you have noticed, that thinks like Homebrew-Launcher and LayeredFS-Injects aren’t working as expected when using MacOS for SD-Card-Management.

The problem is, MacOS is setting an “archive flag” on every sd-card mounted and the switch won’t read that folders.
```

**步骤一**、删除 macOS 产生的垃圾

在将 SD 卡插入 Mac，并复制、修改完文件后，macOS 系统会在 SD 卡内产生例如 `.DS_Store` 等垃圾文件，我们可以下载 [CleanEject](https://www.javawa.nl/cleaneject_en.html) 进行清理，会自动清理完并弹出 SD 卡。

> 关于 CleanEject 启动时提示，未获得授权将 Apple 事件发送给 Finder。

![20221119160829](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/20221119160829.png)

原因是 Mac 更新后，自动化无法手动添加，我们可以使用 Terminal 方式来运行软件。

![20221119183904](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/20221119183904.png)

运行终端，把 iTerm 添加到自动化中即可。

![20221119183650](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/20221119183650.png)

**步骤二**、修复 archive flag 问题

其实这个功能在 Hekate 中就内置了，可以通过以下步骤来解决：

如果你打开了自动进入虚拟系统 (默认打开)，则需要在启动时，看到开机 Logo 就按住 - 键，进入 Hekate 菜单
选择 `Tools > Arch bit • RCM • Touch • Partition > Fix Archive Bit` 进行修复

> 解决方案来自：[如何优雅地在 macOS 上管理 NS](https://blog.dov.moe/posts/52726/)

## 使用 ClashX Pro 给 Switch 加速

> 参照：[利用 ClashX Pro，加速你的 Switch](https://sonatta.top/post/Oa-JnB-qx/)

### 准备步骤

1. 打开 ClashX Pro，并启用增强模式
2. 确认你的代理节点支持 UDP 转发

### 具体步骤

1. 在本机的网络设置中查看本机 IP：

   ![查看本机 IP](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/20230103165110.png)

2. 在 Switch 的网络设置中，连接与 Mac 相同的 WiFi，然后修改网络设置：

   - 将 **IP 地址设置** 改为 **手动**，并填写一个 IP 地址（如果你的电脑 IP 是 `192.168.1.XXX`，这里需要填写 `192.168.1.YYY`，前三段保持相同）。
   - 将 **网关** 和 **首选 DNS** 填写为 Mac 的 IP。

   ![Switch 网络设置](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/SCR-20230103-ni8.png)

3. 保存设置，然后重新连接网络，就可以享受加速效果了。
