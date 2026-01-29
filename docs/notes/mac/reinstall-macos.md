---
group:
  title: macOS
  order: 0
title: 重装 macOS
toc: content
order: 2
---

# 重装 macOS：恢复模式 + 抹掉 Mac + 重新安装（我日常在用）

我重装 Mac 的频率不算低。新机到手要走一遍流程，老机器用久了也会来一次“清爽模式”。
这篇我按我自己的操作顺序写，目标是：**抹干净、能激活、能顺利重装**，别在关键步骤诈尸。

---

## 适用范围与准备

### 适用范围

- Apple Silicon（M 系列）都可参考
- 重点流程：进入恢复模式 → 抹掉 Mac → 重新安装 macOS

### 准备工作

- 稳定网络（最好连 Wi-Fi，重装时需要联网下载）
- 电源接上（别让它半路断电）
- 如果有重要数据：先备份（Time Machine / 移动硬盘 / 云盘）

📋 **注意：**
抹掉 Mac 会清空本机数据。你如果只是“系统出问题”，不一定非要抹盘重装。这里默认你就是要干净重来。

---

## 先做硬件诊断（可选，但推荐）

如果你怀疑机器状态不对劲（风扇狂转、异常发热、偶发死机），我会先跑一遍 Apple 诊断：

- 文档：[Apple 诊断](https://support.apple.com/zh-cn/HT202731)

这一步不是必须，但能提前排除“硬件有病，系统背锅”的情况。

---

## Step 1：进入恢复模式

目标：进入带 ⚙️ 的恢复界面。

### Apple Silicon（M 系列）进入方式

1. **关机**
2. **按住电源键不松手**
3. 看到 ⚙️（选项）后松手

### Intel 进入方式（常见）

1. **关机**
2. 开机瞬间按住 `Command + R`（直到看到恢复界面）

进入后选择“选项”→“继续”。

![进入恢复模式界面](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/macos01.png)

📋 **注意：**

- 如果出现用户图标并要求输入密码：输入管理员密码继续
- 如果要求输入之前用过的 Apple ID：照做即可（它就是要确认机器归属）

---

## Step 2：联网激活（必须）

恢复模式里很多操作需要联网，尤其是后面的“重新安装 macOS”。

1. 右上角点击网络图标
2. 选择 Wi-Fi 并连接
3. 等系统提示激活成功

![激活成功界面](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/macos02.jpg)

📋 **注意：**

- 激活卡住，大概率是网络问题。换个 Wi-Fi 或热点试试。
- 如果公司网/校园网有认证页面，恢复模式可能打不开认证页，建议直接用手机热点。

---

## Step 3：打开终端，触发“抹掉 Mac”入口

很多人会在看到菜单后直接点“重新安装 macOS”。我建议先抹干净再装，省得后面残留配置诈尸。

激活成功后会看到多个选项：

![多个选项](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac08.jpg)

这里按我常用流程走：

1. 左上角 **实用工具**
2. 打开 **终端**

![选择终端](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac11.jpg)

在终端输入：

```sh
resetpassword
```

回车。

![终端输入 resetpassword](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac09.jpg)

---

## Step 4：抹掉 Mac（关键步骤）

输入 `resetpassword` 后，会弹出密码重置界面。**这页不用管**，我直接走抹盘入口：

1. 左上角 **恢复助理**
2. 选择 **抹掉 Mac...**

![抹掉 Mac](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac14.jpg)

弹出警告后，再点一次 **抹掉 Mac** 确认。

![确认抹掉 Mac](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac04.jpg)

然后就是等待进度条跑完。

📋 **注意：**

- 这一步会清空数据，别手滑。
- 抹掉过程不要断网、不要断电。
- 如果你看到它转圈很久：耐心一点，别强制重启。

完成后会回到类似初始的激活页面：

![重新激活页面](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac03.jpg)

---

## Step 5：再次联网激活，回到恢复界面

抹掉后系统会要求再次激活：

1. 连接 Wi-Fi
2. 显示激活成功后，点击 **退出到恢复界面**

![退出到恢复界面](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac10.jpg)

到这里，你的 Mac 基本就是“新生状态”。可以庆祝一下。

---

## Step 6：重新安装 macOS

回到恢复界面后，选择 **重新安装 macOS**（通常是第二个选项）。

![开始重装系统](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac06.jpg)

点击 Continue：

![点击继续](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac13.jpg)

同意条款：

![同意条款](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac05.jpg)

选择安装磁盘，然后开始下载 + 安装。

![下载安装完成](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/mac07.jpg)

📋 **注意：**

- 下载速度完全看网速，慢就慢，别急。
- 中途会自动重启多次，正常现象。
- 如果你有外接硬盘/多个分区，选盘时别选错。

---

## 常见问题（排坑）

### 1）恢复模式要求输入 Apple ID / 管理员密码

这是正常的归属验证。输入即可。
如果忘了账号密码，先走 Apple ID 找回流程，别硬刚。

### 2）激活失败 / 一直转圈

优先排查网络：

- 换 Wi-Fi / 手机热点
- 避开需要网页登录认证的网络
- 关闭复杂的代理/防火墙环境（能简单就简单）

### 3）我只是想“重装”，需要先抹掉吗？

看目的：

- 想要干净：强烈推荐先抹掉再装
- 只想修复系统：可以直接“重新安装 macOS”（但残留配置可能会继续作妖）

---

## 收尾：装完后我一般做什么

重装完成只是起点。后续我会在单独文章里写，对应入口：

todo

---

祝你重装顺利。装完别急着狂装软件，先把网络、终端、开发环境打底配置好，后面会省很多时间。🎉
