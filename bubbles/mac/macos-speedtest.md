# 判断 macOS 的网络质量

## 软件测试

![20221117145542](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/20221117145542.png)

## 通过 Apple 网络响应能力测试无线局域网

从 macOS Monterey 开始，macOS 已经内置了一个网络情况测试工具 `networkQuality`。

这个工具利用 Apple 遍布全球的 CDN（内容分发网络）服务器来测速，比较客观准确，在很多场景下可以免去寻找第三方工具的麻烦。同时，它还会对当前网络的拥堵情况作出直观的高低评价，帮你快速估测此地是否适合打电话、玩游戏。

### 基本使用

在打开的终端窗口中，输入 `networkQuality`（注意大小写），然后回车。

**macOS Monterey：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/network.png)

**macos Ventura：**

![20221117150258](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/20221117150258.png)

### 衡量指标

responsiveness 是指上传和下载的综合响应能力，根据 Apple 的[支持文档](https://support.apple.com/zh-cn/HT212313)，它的衡量指标是每分钟往返次数 (RPM)，**即在正常工作条件下，网络能够在一分钟内完成的连续往返次数或事务数量。**

根据 RPM 的高低数值不同，`networkQuality` 对响应能力的评价也分为「低」「中」「高」三个等级。这可以大致反映当前网络的拥堵程度，从而帮助间接估测视频通话、游戏等应用的效果：

- 评价为 **「Low」** 说明同一网络的设备会互相影响，导致其他设备的网络连接不可靠；
- 评价为 **「Medium」** 则表明多设备共享网络时会造成短暂卡顿；
- 评价为 **「High」** 则最为理想，表明网络通畅，多设备并行联网也能和平共处，保持良好连通。

更多参数和说明，可以用如下命令查阅手册页面 `man networkQuality`

## 参考文章

- [一日一技 | 用自带工具快速判断 macOS 和 iOS 的网络质量](https://sspai.com/post/69966)
