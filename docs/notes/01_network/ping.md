---
title: ping 的工作原理
order: 1
toc: content
group:
  title: 基础知识
---

## ping 命令的工作原理

`ping` 是一个广泛使用的网络工具，它位于应用层，其功能相对简单：通过发送消息到目标主机，来检查该主机是否可达。这一过程背后依赖的是网络层的 ICMP 协议。

### ICMP 协议

ICMP，即互联网控制报文协议 (Internet Control Message Protocol)，扮演着网络通信中的 “控制” 角色。它负责在网络通信过程中传递控制消息，如报告路由问题和连接故障等，从而使网络设备能够响应并调整传输策略，确保数据有效传输。

![ICMP协议工作原理](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240411224956.png)

### IP、ICMP 和 Ping 的关系

尽管 ICMP 协议与 IP 协议都位于网络层，但 ICMP 实际上是依托 IP 协议来传输其控制消息的。这意味着，从本质上讲，`ping` 命令和其他应用程序发送消息的过程并无太大差异。

![Ping工作流程](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240411225749.png)

这也是在网络出现问题时，常会询问你是否能 `ping` 通目标地址的原因。**简单来说，`ping` 就是自己组装一个数据包，让系统按照发送数据的常规路径进行传输。如果能够成功，那么理论上其他应用发送的数据也能够顺利传输。**

## 为何断网时仍能 ping 通 127.0.0.1

`127.0.0.1` 是一个特殊的 IP 地址，被称为本地回环地址。**发送到这个地址的消息不会离开本机，而是直接在本机内部进行处理。**

`localhost` 虽为域名，但默认解析为 `127.0.0.1`。无论是通过 `ping` 命令还是通过 TCP 等协议向本地回环地址发送数据，实际上都不会离开本机，而是在即将离开网络接口前被重定向，最终通过软中断机制被本机处理，因而即使在断网的情况下也能成功。

关于 `ping 0.0.0.0`，这个地址在 IPv4 中代表无效的目标地址。然而，如果服务器监听在 `0.0.0.0` 上，它实际上表示监听本机的所有 IPv4 地址。因此，使用 `127.0.0.1` 或本机的其他 IPv4 地址都可以访问到监听在 `0.0.0.0` 上的服务。

`127.0.0.1` 可以简写成 `127.1`