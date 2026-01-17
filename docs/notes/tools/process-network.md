---
group:
  title: 命令行
  order: 0
title: 进程与网络管理
toc: content
order: 2
---

# 进程与网络管理：前端开发者命令行实战指南

## 0. 一次配置，天天省事：前端专用 `~/.zshrc`

### 0.1 推荐 alias / 函数（直接可用）

把下面这段贴进 `~/.zshrc`，然后：

```sh
source ~/.zshrc
```

后文所有示例都基于这些工具。

```sh
# ===== Frontend dev helpers (ports / node / network) =====

# 查看常用端口是否被占用
alias p3000='lsof -nP -iTCP:3000 -sTCP:LISTEN'
alias p5173='lsof -nP -iTCP:5173 -sTCP:LISTEN'

# 查看所有监听中的 TCP 端口
alias ports='lsof -nP -iTCP -sTCP:LISTEN'

# 查看指定端口（如：pport 8080）
pport() {
  local port="${1:?Usage: pport <port>}"
  lsof -nP -iTCP:"$port" -sTCP:LISTEN
}

# 安全版：杀掉指定端口上的进程（先展示，再确认）
killport() {
  local port="${1:?Usage: killport <port>}"
  local pids

  pids=$(lsof -t -iTCP:"$port" -sTCP:LISTEN 2>/dev/null)
  if [ -z "$pids" ]; then
    echo "No process listening on TCP:$port"
    return 0
  fi

  echo "Processes listening on TCP:$port:"
  lsof -nP -iTCP:"$port" -sTCP:LISTEN

  printf 'Kill these processes? [y/N] '
  read -r ok
  if [ "$ok" != "y" ] && [ "$ok" != "Y" ]; then
    echo "Abort."
    return 1
  fi

  echo "Sending SIGTERM to: $pids"
  kill $pids 2>/dev/null
  sleep 1

  pids=$(lsof -t -iTCP:"$port" -sTCP:LISTEN 2>/dev/null)
  if [ -n "$pids" ]; then
    echo "Still alive, sending SIGKILL to: $pids"
    kill -9 $pids 2>/dev/null
  fi

  lsof -nP -iTCP:"$port" -sTCP:LISTEN || echo "Port $port is free"
}

# Node / dev server 相关进程（兼容 macOS / 大多数 Linux）
alias nodeps='pgrep -fl node'
alias viteps='pgrep -fl vite'

devps() {
  # 列出常见 dev server 进程
  pgrep -fl node 2>/dev/null
  pgrep -fl vite 2>/dev/null
  pgrep -fl next 2>/dev/null
  pgrep -fl nuxt 2>/dev/null
  pgrep -fl webpack 2>/dev/null
}

# CPU / 内存快照（macOS）
alias cpu='top -l 1 | head -20'

# 作业控制
alias j='jobs -l'

# 本地 HTTP 检查（只看状态）
clocal() {
  local port="${1:-3000}"
  echo "== curl -I http://localhost:$port =="
  curl -I "http://localhost:$port"
}

# DNS 查询（只看 IP）
dshort() {
  local host="${1:?Usage: dshort <domain>}"
  dig +short "$host"
}

# TCP 连通性测试
cport() {
  local host="${1:?Usage: cport <host> <port>}"
  local port="${2:?Usage: cport <host> <port>}"
  nc -vz "$host" "$port"
}

# traceroute 快速测试（避免覆盖系统 tr 命令）
alias trn='traceroute -n'

# 获取本机局域网 IP（优先 Wi‑Fi / 常见桥接接口）
myip() {
  local ip
  ip=$(ipconfig getifaddr en0 2>/dev/null || \
       ipconfig getifaddr en1 2>/dev/null || \
       ipconfig getifaddr bridge100 2>/dev/null)

  if [ -n "$ip" ]; then
    echo "$ip"
  else
    echo "No LAN IP found. Try: ifconfig | grep 'inet '"
  fi
}

# pm2 快捷命令
alias pml='pm2 list'
alias pmlog='pm2 logs'
alias pmmon='pm2 monit'
```

#### 这些 alias 解决什么问题？

- `p3000 / p5173 / pport / ports`：所有“端口被占用？”的问题都从这里开始。
- `killport`：安全释放某个端口（先看清是谁，再决定杀不杀）。
- `nodeps / viteps / devps`：快速定位“到底哪几个 dev server / Node 服务在跑”。
- `cpu`：遇到风扇狂转先跑它，看是谁吃 CPU / 内存。
- `clocal`：一秒判断“服务到底起来了没”。
- `dshort / cport / trn`：组成 DNS / TCP / 路由“三板斧”。
- `myip`：所有“手机/同事访问本机服务”的起点。
- `pml / pmlog / pmmon`：把 node 服务从“命令行裸跑”升级到有监控的进程管理。

---

### 0.2 工具与环境准备（建议先检查一遍）

这些 alias 假设你有：

- **macOS**

  - `lsof`, `nc`：系统自带。
  - `dig`：可通过 `brew install bind`。
  - `traceroute`：`brew install traceroute`。
  - `pm2`：`npm install -g pm2`。

- **Linux**
  - `lsof`：`sudo apt install lsof` 或 `sudo yum install lsof`。
  - `nc`（netcat）：`sudo apt install netcat-openbsd` 或 `sudo yum install nmap-ncat`。
  - `dig`：`sudo apt install dnsutils` 或 `sudo yum install bind-utils`。
  - `traceroute`：`sudo apt install traceroute` 或 `sudo yum install traceroute`。
  - `pm2`：`npm install -g pm2`。

> 如果 `source ~/.zshrc` 提示某命令不存在，优先根据上面列表补齐即可。

---

### 0.3 核心命令快速认知

| 命令                               | 参数说明                                                       | 典型用途             |
| ---------------------------------- | -------------------------------------------------------------- | -------------------- |
| `lsof -nP -iTCP:PORT -sTCP:LISTEN` | `-n` 不解析 IP，`-P` 不解析端口名，只看指定端口上的监听 socket | 查“端口被谁占用”     |
| `pgrep -fl PATTERN`                | `-f` 按完整命令行匹配，`-l` 输出 PID + 命令名                  | 找 Node / dev server |
| `top -l 1 \| head -20`             | macOS 一次取一帧 top，再取前 20 行                             | 看谁在吃 CPU / 内存  |
| `curl -I URL`                      | `-I` 只取响应头，不下载 body                                   | HTTP 服务是否起来    |
| `dig +short DOMAIN`                | `+short` 只输出 IP                                             | DNS 是否正确解析     |
| `nc -vz HOST PORT`                 | `-v` 输出详细过程，`-z` 只做 TCP 建连，不发数据                | 端口是否可达         |
| `traceroute -n HOST`               | `-n` 只显示 IP，不反查域名                                     | 哪一跳网络变慢/阻断  |
| `ipconfig getifaddr en0`           | macOS 取某网卡 IP                                              | 找到局域网 IP        |

下面的章节会围绕“**问题场景 → 诊断路径**”展开，而不是重复贴命令。

---

## 1. 端口与进程：搞定 dev server 冲突

### 1.1 学会读这句错误：EADDRINUSE

典型报错：

```text
Error: listen EADDRINUSE: address already in use :::5173
```

含义：

- `address already in use`：端口已被别的进程占用。
- `5173`：你当前 dev server 想用的端口。
- 多数情况下，是你自己之前开过一次 dev server 忘记关；也可能是别的服务（代理、VPN、系统服务）占用。

### 1.2 从“盲关终端”到“有意识释放端口”

**第 1 步：是谁占了端口？**

```bash
p5173
# 或针对任意端口：
pport 5173
```

示例输出：

```text
COMMAND   PID   USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
node    12345  alice   22u  IPv6 0xabcdef...      0t0  TCP *:5173 (LISTEN)
```

你关心的几个字段：

- `COMMAND`：哪个程序（node / nginx / mysqld / …）。
- `PID`：进程号。
- `USER`：哪个用户的进程（一般就是你自己）。
- `NAME`：`*:5173 (LISTEN)` 表明它在监听 5173 端口。

如果看到是你自己的 dev server，比如 `node vite`，可以安全杀；如果是数据库、nginx、VPN 客户端，就要非常谨慎。

**第 2 步：看一下 dev 相关进程全貌**

```bash
devps
```

- 会列出所有包含 `node` / `vite` / `next` / `nuxt` / `webpack` 的进程。
- 你可以对照项目路径，判断哪个是当前项目，哪个是以前不再需要的。

**第 3 步：确认后再释放端口**

```bash
killport 5173
```

- 函数会把该端口上所有监听进程列出来，让你先看清楚。
- 输入 `y` / `Y` 才会去发送 `SIGTERM`，必要时再 `SIGKILL`。
- 最后再打印一次 `lsof`，确认端口已空。

**第 4 步：重启你的 dev server**

```bash
npm run dev
```

> 为什么不建议直接 `kill -9 $(lsof -t -i:5173)`？
> 因为你很容易把“团队共享代理”“本地数据库”干掉，调试体验瞬间变成灾难。`killport` 的目的就是：**“先看清楚，再开枪”**。

---

### 1.3 后台作业：让 dev server 留在背景里跑

很多人习惯开一个终端 tab 只放 dev server，其实不认识 `jobs/bg/fg` 在 SSH / 远程排查时会很难受。

典型用法：

```bash
npm run dev      # 启动 dev server
Ctrl+Z           # 暂停并挂到后台（变成 stopped 状态）
bg               # 让它在后台继续跑
j                # 或用 j alias，看所有后台作业
fg %1            # 需要看日志时，把作业 1 拉回前台
```

适用场景：

- 在同一 SSH 会话里，又想跑 dev server，又想跑别的命令。
- 临时要执行一个阻塞命令，不想开新终端。

---

### 1.4 CPU / 内存吃满：先确认“是谁”，再想“为什么”

开发机风扇狂转、页面卡顿时：

```bash
cpu      # macOS：top 快照前 20 行
nodeps   # 所有 node 相关进程
devps    # 常见 dev server 进程
```

几个实用视角：

- 如果 top 里是 `node` / `vite` 占了高 CPU，而你刚改过代码：
  - 优先怀疑“死循环渲染、无限请求、定时器没清理”。
  - 用浏览器 Performance / Network / Memory 面板配合排查。
- 如果 top 是浏览器在吃 CPU，而 node 并不高：
  - 问题在前端渲染或频繁 DOM 操作，而不是 dev server 本身。
- 如果你在做 SSR / Node API，本地就 OOM：
  - 用 pm2 加个兜底：`pm2 start server.js --max-memory-restart 512M`。
  - 记得看日志找疑似“请求没结束 / buffer 越堆越大”的代码。

---

## 2. 网络诊断三板斧：DNS / TCP / HTTP

把网络问题拆成三个层次：

1. **DNS：名字对不对？**
2. **TCP：能不能连上？**
3. **HTTP：上层协议/业务是不是正常？**

你会发现很多“线上接口有问题？是不是我代码写错了？”其实可以很快自证清白。

---

### 2.1 DNS：`dig +short` 看 IP 对不对

```bash
dshort api.example.com
# 等价于：dig +short api.example.com
```

如何理解结果：

- **返回一个或多个 IP**：DNS 已生效。
- **啥都不返回**：域名没解析出来，可能是：
  - 域名拼错。
  - DNS 还没生效 / TTL 没到。
  - 你机器上有特殊 DNS 配置（VPN、公司代理）。
- **返回 IP 但“环境不对”**（比如测试环境域名指到生产 IP）：
  - 查看 `hosts` 文件是否写死了：`/etc/hosts`。
  - 或问运维“这个域名按现在的配置应该指向哪个环境”。

> 小技巧：
> `dig +short` 的输出可以直接贴给后端/运维：
> “我这边 `api.example.com` 解析到的是 XXX，这个是预期的吗？”

---

### 2.2 TCP：`nc -vz` 判断“能不能握手”

```bash
cport api.example.com 443
# 等价于：nc -vz api.example.com 443
```

三种典型情况：

1. **`succeeded` / `open`**

   - 说明从你当前机器到目标 `IP:PORT` 的 TCP 握手没问题。
   - 即使应用层 500/504，那也是“服务逻辑问题”，不是“网不通”。

2. **`Connection timed out`**

   - 中途被丢弃（防火墙/路由器掉包），或者根本到不了。
   - 常见于：公司网络策略、云厂商安全组、跨区域访问不畅。

3. **`Connection refused`**
   - 对方机器收到了你的请求，但没有进程在监听这个端口。
   - 常见于后端服务没启动 / 端口配置错了。

> 和 `curl` 的关系：
>
> - `nc` 只是测试“TCP 三次握手能不能完成”，不涉及 HTTP 协议。
> - `curl` 在此基础上还要发 HTTP 请求、收响应。
>   先用 `nc`，能让你把“网络层问题”和“业务层问题”分开。

---

### 2.3 HTTP：`curl -I` / `curl -w` 看状态与耗时

**本地 dev server 是否起来：**

```bash
clocal 5173
# → curl -I http://localhost:5173
```

观察：

- 状态码：
  - `200` / `3xx`：服务正常。
  - `404`：路由问题或 HEAD 不支持，但通常服务还是起来的。
  - `5xx`：服务代码内部异常。
- 响应头：看 CORS、缓存头、Server 等。

**线上接口到底慢在哪？**

```bash
curl -o /dev/null -s \
  -w 'Connect: %{time_connect}s  TLS: %{time_appconnect}s  StartTransfer: %{time_starttransfer}s  Total: %{time_total}s\n' \
  https://api.example.com/user
```

解读四个指标：

- `time_connect`：TCP 建连时间。
  - 正常：几十毫秒以内（同区）或 100 ～ 200ms（跨区）。
  - 如果这里就 1 ～ 2 秒，多半是网络问题／防火墙／跨国线路。
- `time_appconnect`：TLS 握手时间。
  - 一般在几百毫秒以内。
  - 太高时，可能是证书链复杂、TLS 参数不合理。
- `time_starttransfer`：从发出请求到收到**首字节**时间。
  - 包含“排队 + 业务逻辑 + 后端依赖”。
  - 如果 `Connect` 很低，但 `StartTransfer` 很高，多半是后端慢。
- `time_total`：完整请求总耗时。
  - 通常略大于 `StartTransfer`，除非返回 body 很大。

> 价值：
> 把这行输出截个图给后端，可以快速讨论“到底是他们系统慢，还是你到他们的路上慢”。

---

## 3. 手机 / 同事访问本机服务：常见坑一次梳理

这是前端日常最“迷信”的一块：
“我电脑上明明能打开，为啥手机/同事就是访问不了？”

其实流程很固定。

---

### 3.1 让 dev server 不止监听 localhost

默认 dev server 都喜欢只监听 `127.0.0.1`，只对本机开放。
要让手机/同事访问，你必须让它监听在 `0.0.0.0`（所有网卡）。

常见配置：

```bash
# Vite
npm run dev -- --host

# Next.js
next dev -H 0.0.0.0 -p 3000

# Nuxt
nuxi dev --host 0.0.0.0 --port 3000
```

> 边界理解：
>
> - `localhost` ≈ “只我自己能访问”。
> - `0.0.0.0` ≈ “局域网里别人也能访问我这台机器的这个端口”。

---

### 3.2 找到你的局域网 IP

```bash
myip
# 例：192.168.0.23
```

如果没找到：

- `ifconfig | grep 'inet '` 看所有 IP。
- 常见局域网网段：`192.168.*.*`、`10.*.*.*`、`172.16-31.*.*`。
- 选和手机/同事在同一网段的那个 IP。

然后手机/同事访问：

```text
http://192.168.0.23:5173
```

---

### 3.3 用 `cport` 快速判断“网络通不通”

假设你的 IP 是 `192.168.0.23`，端口 `5173`：

在 **对方机器** 上：

```bash
cport 192.168.0.23 5173
```

如果输出 `succeeded`：

- 说明网络和防火墙基本没问题。
- 如果浏览器还是打不开，多半是 dev server 的路由/CORS/code 问题。

如果是 `timed out`：

- 很可能是：
  - 公司 Wi‑Fi 开了 AP 隔离。
  - 你在 VPN 内，对方没在。
  - 防火墙禁止同网段互访。

> 一句话：
> `clocal` 解决“我本机服务到底起来没”。
> `cport` 解决“别人能不能通过网络连到我”。

---

### 3.4 简单的“网络拓扑心智图”

- **理想情况（最顺的）**

  ```text
  手机 / 同事电脑
        │
        ├── 同一个 Wi‑Fi / 有线网
        │
  你的开发机（dev server 监听 0.0.0.0）
  ```

  满足：同一网段 + 监听 `0.0.0.0` → 基本一定能通。

- **常见问题 1：AP 隔离**

  ```text
  手机 —— Guest Wi‑Fi （与内部隔离）
  你的电脑 —— 内网 Wi‑Fi
  ```

  → `ping` 不通，`cport` 超时。唯一解：让两者进同一网络。

- **常见问题 2：VPN / 多网卡**

  - 你开着公司 VPN，dev server 实际绑在了 VPN 网卡 IP 上。
  - 手机没进 VPN，只能看见你物理网卡的 IP。

  解决思路：

  - 让手机也进同一 VPN。
  - 或者用 “内网穿透”/ssh 隧道等方案（属于进阶范畴）。

---

## 4. 远程 API 慢 / 超时：如何给后端/运维有价值的信息

很多时候你已经确定“前端代码没问题”，但接口就是时好时坏。
这时你需要的不只是“接口慢”，而是可以让后端/运维立刻动起来的线索。

---

### 4.1 用一次完整的 `curl -v` 抓证据

```bash
curl -o /dev/null -s -v \
  -w 'Connect: %{time_connect}s  TLS: %{time_appconnect}s  StartTransfer: %{time_starttransfer}s  Total: %{time_total}s\n' \
  https://api.example.com/user
```

重点看：

- `* Connected to api.example.com (IP)`：说明 TCP OK。
- `* SSL connection using ...`：说明 TLS OK。
- `< HTTP/2 504` 或其他状态码：后端/网关返回什么。
- 四个时间指标的比例关系。

你可以记录几次典型值，比如：

```text
Connect: 0.050s  TLS: 0.200s  StartTransfer: 2.800s  Total: 2.900s
```

这代表：

- 网络层只用了 0.25 秒。
- 真正耗时的是后端业务（2.8 秒）。

---

### 4.2 路由：`trn` 看“路上是不是被卡住了”

```bash
trn api.example.com
```

- 如果前几跳（你家路由器、公司网关）就开始超时/延迟高：
  - 自己网络环境／公司出口有问题。
- 如果前几跳正常，中后段在某个 IP 开始变得 200ms+ 且波动大：
  - 多半是云厂商侧 / 目标机房 / 某段跨境链路问题。

你不需要完全懂 BGP/AS，只要把 **“哪一跳明显开始变慢”** 的 IP 和 RTT 贴给运维，就已经很有价值。

---

### 4.3 汇总成一句“可执行”的问题描述

一个理想的提单示例：

> - 时间：2024‑xx‑xx 14:05–14:15（GMT+8）
> - 源 IP：`203.0.113.20`（前端出口 IP）
> - 目标：`https://api.example.com/user`（443 端口）
> - 现象：浏览器中明显感觉接口变慢，经常超过 3 秒
> - 本机 `curl` 数据（示例）：
>   - `Connect: 0.06s TLS: 0.18s StartTransfer: 2.80s Total: 2.90s`
> - `dig +short`：`203.0.113.10`
> - `traceroute -n api.example.com`：从 `198.51.100.10` 这一跳开始 RTT 200ms+ 且波动大

这比一句“接口好慢”有用太多，也更能保护前端自己。

---

## 5. Linux 简明对照：把本地排查套路平移到服务器

你在 macOS 上用的那套思路，在 Linux 上基本都成立，只是命令略有区别。

| 目的           | macOS（本地）                      | Linux（服务器常见）                                  |
| -------------- | ---------------------------------- | ---------------------------------------------------- |
| 看端口被谁占   | `lsof -nP -iTCP:3000 -sTCP:LISTEN` | `sudo ss -tulpn \| grep :3000`                       |
| 看所有监听端口 | `ports`                            | `sudo ss -tulpn`                                     |
| 查进程         | `ps aux` / `nodeps` / `devps`      | `ps aux` / `pgrep -fl node`                          |
| CPU / 内存快照 | `cpu`                              | `top` / `htop`                                       |
| 网络接口       | `ifconfig` / `myip`                | `ip addr show`                                       |
| traceroute     | `trn`（`traceroute -n`）           | `traceroute` / `mtr`                                 |
| DNS 查询       | `dig` / `dshort`                   | `dig` / `host`                                       |
| Node 服务管理  | `pm2` / `pml` / `pmlog`            | `pm2`（+ systemd 管理）                              |
| 检查防火墙状态 | 系统设置 / 安全软件界面            | `sudo ufw status` / `sudo firewall-cmd --list-ports` |

典型服务器排查（把本地套路搬上去）：

```bash
# 1. 确认服务在跑
pgrep -fl node

# 2. 确认端口监听
sudo ss -tulpn | grep :3000

# 3. 在服务器本机发起请求
curl -s -o /dev/null -w '%{http_code} %{time_total}\n' http://127.0.0.1:3000/health
```

- 如果服务器本机 `curl` 就超时 / 5xx → 后端服务有问题。
- 如果服务器本机很快，前端机却慢 → 是“前端机到服务器”的网络问题，回到 2、4 章的 DNS/TCP/路由排查。

---

## 6. 收个尾：把命令串成几条“路径”

文章里所有命令，大致可以归到几条“实战路径”里，你只要记住路径，就不会在现场慌乱。

1. **端口冲突 / dev server 起不来**

   ```text
   pport / p5173 → devps → killport → npm run dev
   ```

2. **手机 / 同事访问不了本机服务**

   ```text
   dev server 加 --host / 0.0.0.0 →
   myip 找到正确 IP →
   本机 clocal 验证服务 →
   对方机器 cport 检查 TCP →
   不通则看防火墙 / Wi‑Fi 隔离 / VPN
   ```

3. **远程 API 慢 / 时好时坏**

   ```text
   dshort 看 DNS →
   cport 看 TCP →
   curl -v / -w 看耗时拆分 →
   trn 看哪一跳变慢 →
   整理成一条“可执行”的问题描述给后端/运维
   ```

4. **CPU / 内存飙升**

   ```text
   cpu 看高占用进程 →
   nodeps / devps 定位具体 Node / dev server →
   ps / lsof 看这个进程在干嘛 →
   本地配合浏览器 DevTools 查死循环 / 内存泄漏 →
   线上则用 pm2 做兜底 + 日志分析
   ```

只要你把这些路径练熟，遇到“端口冲突 / 本地服务访问不了 / 远程接口慢”时，就不再是漫无目的地重启，而是有条理地证明：
**问题在哪一层，不在哪一层。**
