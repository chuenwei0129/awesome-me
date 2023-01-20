# M1 Mac 查询硬盘使用量

## 安装 smartctl

在终端中输入如下代码，即可进行安装：

```perl
brew install smartmontools
```

## 查看硬盘使用量

在终端中输入如下代码，即可进行看查硬盘使用量。

```perl
smartctl -a disk0
```

结果如下，里面的 `Percentage Used` 就是损耗值，`Data Units Written` 就是写入量。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/SCR-20220328-wth.png)
