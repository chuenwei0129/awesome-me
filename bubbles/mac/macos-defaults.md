# macOS defaults list

> 📘 关联阅读：[macOS defaults](https://macOS-defaults.com)

## macOS 中“安全性与隐私”没有允许任何来源

为了安全，macOS 新版本已经默认屏蔽未知开发者选项，需要用命令手动开启

```perl
sudo spctl --master-disable
```

如果以后想撤消它，则可以返回 Terminal 并运行以下命令：

```perl
sudo spctl --master-enable
```

## 更改启动台应用程序显示数目

默认情况下，启动台应用的显示数目为每行 7 个图标，总共有 5 行。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/launchpad.jpeg)

我们可以通过命令行的方式对显示效果进行更改。

🎈 操作步骤：

打开「应用程序」-\>「实用工具」-\>「终端」，输入下面的命令，点击回车。

- 更改每行显示应用程序的个数的命令：

  ```perl
  defaults write com.apple.dock springboard-columns -int 5
  ```

- 更改应用程序总共显示的行数的命令：

  ```perl
  defaults write com.apple.dock springboard-rows -int 3
  ```

最后，更改完成之后，还需要重启「启动台（Launchpad）」来应用更改。

> 💡 **注意：**
>
> **在重新启动「启动台（Launchpad）」之后，所有的应用程序图标排列方式都会被重置，包括文件夹显示，图标排列顺序等等。请慎重操作。**

- 更改设置，重启启动台的命令：

  ```perl
  defaults write com.apple.dock ResetLaunchPad -bool TRUE; killall Dock
  ```

## macOS 下显示 / 隐藏文件

同 Windows 一样，macOS 会将重要文件隐藏起来，以防止意外删除这些文件而损坏系统。但是，有时候我们需要显示隐藏文件。则需要使用如下方法。

打开「启动台」，选择「终端」软件，输入以下命令，显示隐藏文件：

```perl
defaults write com.apple.finder AppleShowAllFiles Yes && killall Finder
```

如果需要不显示隐藏文件，则执行下面的命令：

```perl
defaults write com.apple.finder AppleShowAllFiles No && killall Finder
```

## 去除 macOS 系统偏好设置右上角红色上标

```perl
defaults write com.apple.systempreferences AttentionPrefBundleIDs 0 && killall Dock
```
