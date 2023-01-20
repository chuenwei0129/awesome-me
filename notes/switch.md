# 关于我破解了 Switch 并且装满了游戏依然吃灰这件事

> 这条笔记创建于: 2022 年 10 月 25 日，星期二，13: 17。

## SX OS 拥抱大气层

[SX 完整拥抱大气层 图文教程](https://shipengliang.com/games/sx-%e5%ae%8c%e6%95%b4%e6%8b%a5%e6%8a%b1%e5%a4%a7%e6%b0%94%e5%b1%82-%e5%9b%be%e6%96%87%e6%95%99%e7%a8%8b.html)

## USB 安装游戏

1. Mac 下用 USB 连接 Switch 需要 [Android File Transfer](https://www.android.com/filetransfer/)

2. [Switch DBI 图文使用教程](https://shipengliang.com/games/switch-dbi-%e5%9b%be%e6%96%87%e4%bd%bf%e7%94%a8%e6%95%99%e7%a8%8b.html)

## 离线升降级系统

> [图解更新大气层文件和升级 Switch 系统方法](http://www.265xh.com/nszhinan/4464.html)

1. 文件传输方式推荐参考：[Switch 大气层 Hekate 下的 USB 传输](https://shipengliang.com/games/switch-%e5%a4%a7%e6%b0%94%e5%b1%82-hekate%e4%b8%8b%e7%9a%84usb%e4%bc%a0%e8%be%93.html) 或用读卡器（DBI 不支持大气层核心文件传输）。
2. 下载最新大气层整合包：[Atmosphere](https://github.com/AK478BB/AK-Atmosphere/releases) 并覆盖更新到 TF 卡根目录。
3. 下载目标版本固件包：[Switch Firmware 固件](https://github.com/THZoria/NX_Firmware/releases)，并将固件包解压后传输到 TF 卡根目录。
4. [启动系统后，进入相册，运行 Daybreak](https://shipengliang.com/games/switch-%e5%a4%a7%e6%b0%94%e5%b1%82-atmosphere-%e5%a6%82%e4%bd%95%e7%a6%bb%e7%ba%bf%e5%8d%87%e7%ba%a7%e7%b3%bb%e7%bb%9f.html)

## 小插曲

TX 拥抱大气层，使用 Mac 更新固件到 13.2.1 时，遇到报错

```perl
“failed to get update information, result: 0x00234a02”
```

经过 Google，在这个 [Error trying to update with Daybreak](https://gbatemp.net/threads/error-trying-to-update-with-daybreak.579036/) 讨论下的 [#17](https://gbatemp.net/threads/error-trying-to-update-with-daybreak.579036/#post-9299632) 得到了我们想要的答案。

> **问题及解决方案**（备份）

如果你平常是用 PC 来管理 SD 卡中的内容，而当你某次把 SD 卡插入 Mac 中，再插回 NS 中，往往就会报错无法开机。其原因主要和 Archive Bit 有关。

```perl
Some of you have noticed, that thinks like Homebrew-Launcher and LayeredFS-Injects aren’t working as expected when using macOS for SD-Card-Management.

The problem is, macOS is setting an “archive flag” on every sd-card mounted and the switch won’t read that folders.
```

**步骤一**、删除 macOS 产生的垃圾

在将 SD 卡插入 Mac，并复制、修改完文件后，macOS 系统会在 SD 卡内产生例如 .DS_Store 等垃圾文件，我们可以下载 [CleanEject](https://www.javawa.nl/cleaneject_en.html) 进行清理，会自动清理完并弹出 SD 卡。

**步骤二**、修复 archive flag 问题

其实这个功能在 Hekate 中就内置了，可以通过以下步骤来解决：

如果你打开了自动进入虚拟系统（默认打开），则需要在启动时，看到开机 Logo 就按住 - 键，进入 Hekate 菜单
选择 `Tools > Arch bit • RCM • Touch • Partition > Fix Archive Bit` 进行修复

> 解决方案来自：[如何优雅地在 macOS 上管理 NS](https://blog.dov.moe/posts/52726/)

## 白嫖网站

- <https://xxxxx520.com/>

<!-- ## 模拟器 -->
<!-- TODO -->
