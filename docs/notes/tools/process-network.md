---
group:
  title: 命令行
  order: 0
title: 进程与网络管理
toc: content
order: 2
---

# 进程与网络管理

## 1. 核心概念与环境速查：磨刀不误砍柴工

在深入解决问题之前，我们先快速建立一些核心概念的认知，并完成基础工具的配置。

### 1.1 核心概念快速入门

#### 1. 进程 (Process)

- **小白理解：** 正在运行的程序实例。你每打开一个应用（VS Code, Chrome）或执行一个命令（`npm run dev`），就创建了一个进程。每个进程都有一个唯一的身份证号：**PID (Process ID)**。
- **为什么重要：** 定位占用资源或端口的“元凶”。

#### 2. 端口 (Port)

- **小白理解：** 电脑里一道道用于网络通信的“门牌号”。程序通过特定的端口收发数据。前端开发常用 3000、5173、8080 等端口。
- **为什么重要：** “端口被占用”是前端最常见的错误之一。

#### 3. IP 地址 (IP Address)

- **小白理解：** 设备在网络上的"地址"。
  - **`127.0.0.1` / `localhost`：** 特殊地址，代表"我自己"（IPv4 回环地址）。
  - **`::1`：** IPv6 的回环地址，等同于 `127.0.0.1`。
  - **`0.0.0.0`：** 在配置服务时，表示"监听所有可用的 IP 地址"，允许本机、局域网乃至互联网上的其他设备访问。
  - **`::`：** IPv6 的全零地址，服务器监听时表示"所有 IPv6 地址"。
  - **局域网 IP (LAN IP)：**
    - **IPv4**：`192.168.x.x` 或 `10.x.x.x` 等，你的设备在内部网络中的地址。
    - **IPv6**：`fe80::` 开头的是链路本地地址（Link-Local），仅在同一网段有效；`fd00::` 或 `fc00::` 是唯一本地地址（类似私有 IP）。
  - **广域网 IP (WAN IP)：** 你的网络出口（通常是路由器）在互联网上的地址。由于 NAT 技术，大多数设备并没有独立的公网 IP，而是通过路由器共享一个公网 IP。
- **为什么重要：** 决定你的服务是只有自己能访问，还是局域网/互联网也能访问。

> 💡 **IPv6 提示**：现代操作系统默认启用 IPv6。在 `ifconfig` 或 `ip addr` 输出中，你会看到 `inet6 fe80::...` 这样的地址。如果你的开发服务器只监听 IPv4（`0.0.0.0`），IPv6 客户端可能无法访问，需要配置服务器同时监听 IPv6（`::`）或使用双栈绑定。

#### 4. DNS (Domain Name System)

- **小白理解：** 互联网“电话簿”，把 `google.com` 这样的域名翻译成 `142.250.7.142` 这样的 IP 地址。
- **为什么重要：** DNS 解析错误会导致无法访问网站或 API。

#### 5. TCP (Transmission Control Protocol)

- **小白理解：** 一种**可靠**的通信协议，确保数据完整、按序传输。HTTP 等应用层协议都基于 TCP。
- **为什么重要：** 网络问题排查的第一步：看 TCP 连接能否建立。

#### 6. HTTP (Hypertext Transfer Protocol)

- **小白理解：** 网页浏览器和服务器之间传输超文本（网页、API 数据）的应用层协议。
- **为什么重要：** TCP 连通后，还需要检查 HTTP 协议层面的响应状态（200、404、500 等）和头部信息。

#### 7. 网络接口 (Network Interface)

- **小白理解：** 你的电脑连接网络的“网卡”在操作系统中的表现。每个接口可能有自己的 IP 地址。
  - `lo0` (loopback)：回环接口，`127.0.0.1` 走的接口。
  - `en0`, `en1` 等：通常是 Wi-Fi 或有线网卡。
  - `utunX`：通常是 VPN 或虚拟网络接口。
- **为什么重要：** 找到正确的局域网 IP，特别是连接 VPN 或有多个网卡时。

### 1.2 前端专用 `~/.zshrc` 配置（macOS）

将下面这段配置贴进你的 `~/.zshrc` 文件，然后运行 `source ~/.zshrc`，就能立刻获得一系列实用工具。后文的所有示例都将基于这些工具。

> 💡 本配置针对 **macOS (Apple Silicon M1/M2/M3)** 优化，系统工具均为内置，无需额外安装。

```sh
# ===== Frontend Dev Helpers for macOS =====

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │ 端口管理 (Port Management)                                                  │
# │ 核心命令: lsof (List Open Files) - 在 Unix 中，网络连接也是"文件"            │
# └─────────────────────────────────────────────────────────────────────────────┘

# 查看常用开发端口是否被占用
# lsof 参数说明:
#   -n    不将 IP 转为主机名（加快速度）
#   -P    不将端口号转为服务名（如 80 → http），直接显示数字
#   -i    选择网络文件，格式: -i[协议][@主机][:端口]
#   -s    过滤连接状态，格式: -s[协议]:状态
alias p3000='lsof -nP -iTCP:3000 -sTCP:LISTEN'
alias p4200='lsof -nP -iTCP:4200 -sTCP:LISTEN'  # Angular
alias p5173='lsof -nP -iTCP:5173 -sTCP:LISTEN'
alias p8080='lsof -nP -iTCP:8080 -sTCP:LISTEN'
alias p8081='lsof -nP -iTCP:8081 -sTCP:LISTEN'  # Metro (React Native)

# 查看所有正在监听的 TCP 端口
alias ports='lsof -nP -iTCP -sTCP:LISTEN'

# 查看指定端口 (如: pport 8080)
# JS 类比:
#   function pport(port) {
#     if (!port) throw new Error('Usage: pport <port>');
#     return exec(`lsof -nP -iTCP:${port} -sTCP:LISTEN`);
#   }
pport() {
  local port="${1:?用法: pport <端口号>}"  # ${1:?msg} 如果 $1 为空则报错
  lsof -nP -iTCP:"$port" -sTCP:LISTEN
}

# 安全版：杀掉指定端口上的进程（先展示，再确认）
# JS 类比:
#   async function killport(port) {
#     const pids = await findProcessesByPort(port);
#     if (!pids.length) return console.log('No process found');
#     const confirmed = await confirm('Kill these processes?');
#     if (!confirmed) return;
#     pids.forEach(pid => process.kill(pid, 'SIGTERM'));
#     await sleep(1000);
#     // 如果还活着，强制杀死
#     const remaining = await findProcessesByPort(port);
#     remaining.forEach(pid => process.kill(pid, 'SIGKILL'));
#   }
killport() {
  local port="${1:?用法: killport <端口号>}"
  local pids

  # lsof -t: 只输出 PID（terse 模式）
  # 2>/dev/null: 将错误输出重定向到空设备（静默错误）
  pids=$(lsof -t -iTCP:"$port" -sTCP:LISTEN 2>/dev/null)

  # -z: 检查字符串是否为空
  if [ -z "$pids" ]; then
    echo "端口 $port 上没有进程在监听"
    return 0
  fi

  echo "以下进程正在监听端口 $port:"
  lsof -nP -iTCP:"$port" -sTCP:LISTEN

  # printf: 格式化输出（不换行）; read -r: 读取用户输入（-r 禁止反斜杠转义）
  printf '确认杀死这些进程? [y/N] '
  read -r ok

  # 字符串比较: != 不等于
  if [ "$ok" != "y" ] && [ "$ok" != "Y" ]; then
    echo "已取消"
    return 1
  fi

  # kill 信号说明:
  #   SIGTERM (15): 温和终止，给进程时间清理资源（类似 process.exit()）
  #   SIGKILL (9):  强制终止，立即杀死（类似直接断电）
  echo "发送 SIGTERM 信号到: $pids"
  kill $pids 2>/dev/null
  sleep 1  # 等待进程清理

  # -n: 检查字符串是否非空
  pids=$(lsof -t -iTCP:"$port" -sTCP:LISTEN 2>/dev/null)
  if [ -n "$pids" ]; then
    echo "进程仍存活，发送 SIGKILL 强制终止: $pids"
    kill -9 $pids 2>/dev/null
  fi

  # || : 前一个命令失败时执行后一个（类似 JS 的 ||）
  lsof -nP -iTCP:"$port" -sTCP:LISTEN || echo "✅ 端口 $port 已释放"
}

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │ 进程管理 (Process Management)                                               │
# │ 核心命令: pgrep (Process Grep) - 根据名称/模式查找进程                       │
# └─────────────────────────────────────────────────────────────────────────────┘

# pgrep 参数说明:
#   -f    按完整命令行匹配（包括路径和参数）
#   -l    显示进程名称（list）
alias nodeps='pgrep -fl node'   # 所有 node 进程
alias viteps='pgrep -fl vite'   # 所有 vite 进程

# 列出所有常见的前端开发服务器进程
# JS 类比:
#   function devps() {
#     const keywords = ['node', 'vite', 'next', 'nuxt', 'webpack'];
#     return keywords.flatMap(kw => exec(`pgrep -fl ${kw}`));
#   }
# pgrep -fl 'pattern': 支持正则表达式，用 | 表示"或"关系，一次查询更高效
devps() {
  pgrep -fl 'node|vite|next|nuxt|webpack' 2>/dev/null
}

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │ 系统监控 (System Monitoring)                                                │
# │ 核心命令: top (Table Of Processes) - 实时显示进程资源占用                    │
# └─────────────────────────────────────────────────────────────────────────────┘

# top 参数说明 (macOS):
#   -l 1    logging mode，取 1 次快照后退出（非交互式）
#   -o cpu  按 CPU 使用率排序
# head -20: 只显示前 20 行（管道符 | 将输出传递给下一个命令）
alias cpu='top -l 1 -o cpu | head -20'

# jobs 参数说明:
#   -l    同时显示进程 ID（long format）
# 用于查看当前 shell 的后台任务（Ctrl+Z 暂停的进程）
alias j='jobs -l'

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │ HTTP 调试 (HTTP Debugging)                                                  │
# │ 核心命令: curl (Client URL) - 命令行 HTTP 客户端                             │
# └─────────────────────────────────────────────────────────────────────────────┘

# 检查本地服务是否存活（只看响应头）
# JS 类比:
#   async function clocal(port = 3000) {
#     const res = await fetch(`http://localhost:${port}`, { method: 'HEAD' });
#     console.log(res.headers);
#   }
# curl 参数说明:
#   -I    只发送 HEAD 请求，只获取响应头（不下载内容）
clocal() {
  local port="${1:-3000}"  # ${1:-默认值} 如果 $1 为空则使用默认值
  echo "== curl -I http://localhost:$port =="
  curl -I "http://localhost:$port"
}

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │ DNS 诊断 (DNS Diagnostics)                                                  │
# │ 核心命令: dig (Domain Information Groper) - DNS 查询工具                     │
# └─────────────────────────────────────────────────────────────────────────────┘

# 快速查询域名对应的 IP 地址
# JS 类比:
#   const { Resolver } = require('dns').promises;
#   async function dshort(domain) {
#     return await new Resolver().resolve4(domain);
#   }
# dig 参数说明:
#   +short    只输出精简结果（IP 地址）
dshort() {
  local host="${1:?用法: dshort <域名>}"
  dig +short "$host"
}

# 💡 本地 hosts 文件说明:
# /etc/hosts 文件可以绕过 DNS，直接将域名映射到指定 IP
# 优先级: hosts 文件 > DNS 服务器
# 查看 hosts 配置: cat /etc/hosts
# 临时添加映射（需 sudo）: echo "192.168.1.100 api.local.dev" | sudo tee -a /etc/hosts
# 常用场景: 本地开发环境、测试环境域名映射、屏蔽广告域名

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │ 网络连通性 (Network Connectivity)                                           │
# │ 核心命令: nc (Netcat) - 网络瑞士军刀; ping - ICMP 回显测试                   │
# └─────────────────────────────────────────────────────────────────────────────┘

# 测试 TCP 端口是否可连接
# JS 类比:
#   const net = require('net');
#   function cport(host, port) {
#     return new Promise((resolve, reject) => {
#       const socket = net.connect(port, host);
#       socket.on('connect', () => { socket.destroy(); resolve(true); });
#       socket.on('error', reject);
#     });
#   }
# nc 参数说明:
#   -v    详细输出（verbose）
#   -z    零 I/O 模式，只测试连接，不发送数据（zero-I/O）
cport() {
  local host="${1:?用法: cport <主机> <端口>}"
  local port="${2:?用法: cport <主机> <端口>}"
  nc -vz "$host" "$port"
}

# traceroute 参数说明:
#   -n    不进行 DNS 反向解析，只显示 IP（加快速度）
# 用 trn 避免覆盖系统的 tr 命令（文本替换工具）
alias trn='traceroute -n'

# ping 参数说明:
#   -c 5    发送 5 个数据包后停止（count）
alias pp='ping -c 5'

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │ IP 地址 (IP Address)                                                        │
# │ 核心命令: ipconfig / ifconfig - 网络接口配置                                 │
# └─────────────────────────────────────────────────────────────────────────────┘

# 获取本机局域网 IP（优先 Wi-Fi）
# JS 类比:
#   const os = require('os');
#   function myip() {
#     const interfaces = os.networkInterfaces();
#     for (const [name, addrs] of Object.entries(interfaces)) {
#       const ipv4 = addrs.find(a => a.family === 'IPv4' && !a.internal);
#       if (ipv4) return ipv4.address;
#     }
#   }
# ipconfig getifaddr 参数说明:
#   en0         Apple Silicon Mac: Wi-Fi 接口; Intel Mac: 以太网接口
#   en1         Apple Silicon Mac: 以太网接口; Intel Mac: Wi-Fi 接口
#   bridge100   网络共享时的桥接接口
myip() {
  local ip
  # || : 短路求值，前一个失败才执行后一个（类似 JS 的 ||）
  ip=$(ipconfig getifaddr en0 2>/dev/null || \
       ipconfig getifaddr en1 2>/dev/null || \
       ipconfig getifaddr bridge100 2>/dev/null)

  if [ -n "$ip" ]; then
    echo "$ip"
  else
    echo "未找到局域网 IP，请检查网络连接"
    echo "可尝试: ifconfig | grep 'inet '"
  fi
}

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │ PM2 进程管理器 (PM2 Process Manager)                                        │
# │ pm2: Node.js 生产环境进程管理器（需 npm install -g pm2）                     │
# └─────────────────────────────────────────────────────────────────────────────┘

alias pml='pm2 list'     # 列出所有 PM2 管理的进程
alias pmlog='pm2 logs'   # 查看所有进程日志（实时）
alias pmmon='pm2 monit'  # 打开 PM2 监控面板（CPU/内存/日志）

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │ Node.js 网络调试 (Node.js Network Debugging)                                │
# │ 环境变量配置，用于调试 Node.js 网络层问题                                     │
# └─────────────────────────────────────────────────────────────────────────────┘

# 开启 Node.js 原生 HTTP/HTTPS 调试输出（显示请求/响应详情）
# 使用示例: NODE_DEBUG=http,https node server.js
# 使用示例: NODE_DEBUG=http,https npm run dev

# 指定额外的 CA 证书（企业内网、自签名证书常用）
# 使用示例: NODE_EXTRA_CA_CERTS=/path/to/cert.pem npm run dev

# 💡 快速调试函数（可选添加）
# 开启 HTTP 调试的便捷方式
nodehttp() {
  NODE_DEBUG=http,https "$@"
}
# 使用: nodehttp node server.js 或 nodehttp npm run dev

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │ 实用工具 (Utilities)                                                        │
# └─────────────────────────────────────────────────────────────────────────────┘

# watch 参数说明:
#   -n 1    每 1 秒刷新一次
# 用 wn 避免覆盖 macOS 的 w 命令（显示登录用户）
# 使用示例: wn 'lsof -nP -iTCP -sTCP:LISTEN'  # 实时监控端口变化
# 如果未安装 watch，使用下面的纯 shell 实现：
#   wn() { while true; do clear; eval "$@"; sleep 1; done }
alias wn='watch -n 1'
```

### 1.3 工具与环境准备（macOS）

上述配置使用的工具在 macOS 上的安装状态：

| 命令          | 来源     | 安装方式                     |
| ------------- | -------- | ---------------------------- |
| `lsof`        | 系统内置 | ✅ 无需安装                  |
| `nc` (netcat) | 系统内置 | ✅ 无需安装                  |
| `ping`        | 系统内置 | ✅ 无需安装                  |
| `curl`        | 系统内置 | ✅ 无需安装                  |
| `dig`         | 系统内置 | ✅ 无需安装（随 macOS 预装） |
| `traceroute`  | 系统内置 | ✅ 无需安装                  |
| `ipconfig`    | 系统内置 | ✅ 无需安装                  |
| `top`         | 系统内置 | ✅ 无需安装                  |
| `watch`       | Homebrew | `brew install watch`         |
| `pm2`         | npm      | `npm install -g pm2`         |

> **快速检查：** 运行 `source ~/.zshrc` 后，如果提示 `command not found: watch`，执行 `brew install watch` 即可。

### 1.2.1 高级配置增强（可选）

如果你需要更健壮的配置（错误处理、颜色输出等），可以将以下函数替换或添加到上述配置中。

```sh
# ========== 增强版 pport - 带错误处理 ==========
pport() {
  local port="${1:?用法: pport <端口号>}"

  # 端口号校验（必须为数字且在有效范围内）
  if ! [[ "$port" =~ ^[0-9]+$ ]]; then
    echo "❌ 错误: 端口号必须是数字"
    return 1
  fi

  if [ "$port" -lt 1 ] || [ "$port" -gt 65535 ]; then
    echo "❌ 错误: 端口号必须在 1-65535 之间"
    return 1
  fi

  lsof -nP -iTCP:"$port" -sTCP:LISTEN
}

# ========== 增强版 killport - 带超时和颜色输出 ==========
killport() {
  local port="${1:?用法: killport <端口号>}"
  local timeout="${2:-10}"  # 默认等待确认 10 秒
  local pids

  # 端口校验
  if ! [[ "$port" =~ ^[0-9]+$ ]]; then
    echo "❌ 错误: 端口号必须是数字"
    return 1
  fi

  pids=$(lsof -t -iTCP:"$port" -sTCP:LISTEN 2>/dev/null)

  if [ -z "$pids" ]; then
    echo "✅ 端口 $port 上没有进程在监听"
    return 0
  fi

  echo ""
  echo "🔍 以下进程正在监听端口 $port:"
  lsof -nP -iTCP:"$port" -sTCP:LISTEN
  echo ""

  printf '⚠️  确认杀死这些进程? [y/N] (将在 %d 秒后超时) ' "$timeout"
  read -t "$timeout" -r ok

  # 超时或非 y/Y 均取消
  if [ $? -ne 0 ] || { [ "$ok" != "y" ] && [ "$ok" != "Y" ]; }; then
    echo ""
    echo "❌ 已取消"
    return 1
  fi

  echo ""
  echo "🔄 发送 SIGTERM 信号到: $pids"
  kill $pids 2>/dev/null
  sleep 1

  pids=$(lsof -t -iTCP:"$port" -sTCP:LISTEN 2>/dev/null)
  if [ -n "$pids" ]; then
    echo "⚡ 进程仍存活，发送 SIGKILL 强制终止: $pids"
    kill -9 $pids 2>/dev/null
    sleep 1
  fi

  echo ""
  lsof -nP -iTCP:"$port" -sTCP:LISTEN 2>/dev/null || echo "✅ 端口 $port 已释放"
}

# ========== 增强版 myip - 显示更多信息 ==========
myip() {
  local ip
  ip=$(ipconfig getifaddr en0 2>/dev/null || \
       ipconfig getifaddr en1 2>/dev/null || \
       ipconfig getifaddr bridge100 2>/dev/null)

  if [ -n "$ip" ]; then
    echo "📡 局域网 IP: $ip"
    # 顺便显示端口访问 URL 提示
    echo "💡 其他设备可访问: http://$ip:<端口>"
  else
    echo "❌ 未找到局域网 IP，请检查网络连接"
    echo "📝 可尝试: ifconfig | grep 'inet '"
  fi
}

# ========== 增强版 cport - 带超时和重试 ==========
cport() {
  local host="${1:?用法: cport <主机> <端口>}"
  local port="${2:?用法: cport <主机> <端口>}"
  local timeout="${3:-5}"

  # 端口校验
  if ! [[ "$port" =~ ^[0-9]+$ ]]; then
    echo "❌ 错误: 端口号必须是数字"
    return 1
  fi

  echo "🔌 正在连接 $host:$port (超时 ${timeout}秒)..."
  timeout "$timeout" nc -vz "$host" "$port"
  local result=$?

  echo ""
  if [ $result -eq 0 ]; then
    echo "✅ 连接成功: $host:$port"
  elif [ $result -eq 124 ]; then
    echo "❌ 连接超时: $host:$port"
  else
    echo "❌ 连接失败: $host:$port"
  fi
  return $result
}

# ========== 彩色化端口列表 ==========
alias ports_color='lsof -nP -iTCP -sTCP:LISTEN | awk "NR==1 || /LISTEN/" | GREP_COLOR="01;32" grep --color=always -E "^|:[0-9]+.*LISTEN|"'

# ========== 显示版本信息 ==========
# 使用这些命令查看工具版本，帮助排查兼容性问题
show_versions() {
  echo "🔧 工具版本信息:"
  echo "   zsh: $(zsh --version)"
  echo "   lsof: $(lsof -v 2>&1 | head -1)"
  echo "   nc: $(nc -h 2>&1 | head -1 || nc --version 2>&1 | head -1)"
  echo "   curl: $(curl --version | head -1)"
  echo "   dig: $(dig -v | head -1)"
}
alias versions=show_versions
```

**增强功能说明：**

- **错误处理**：端口号非数字时给出友好提示
- **超时控制**：`killport` 和 `cport` 支持超时设置，避免无限等待
- **颜色输出**：使用 emoji 和颜色增强可读性
- **版本检查**：`versions` 命令显示所有工具版本，便于排查兼容性问题
- **快捷提示**：`myip` 输出同时显示访问 URL 格式提示

**使用示例：**

```bash
# 带超时的端口测试（3 秒）
cport api.example.com 443 3

# 查看 IP 时自动生成访问提示
myip
# 输出：
# 📡 局域网 IP: 192.168.5.136
# 💡 其他设备可访问: http://192.168.5.136:<端口>

# 查看工具版本（排查兼容性）
versions
```

---

## 2. 问题一：本地开发服务“端口被占用” (EADDRINUSE)

**现象：** 运行 `npm run dev` 或 `yarn dev` 时，终端报错 `Error: listen EADDRINUSE: address already in use :::5173` （或 3000、8080 等其他端口）。

**问题分析：** 这个错误非常直接，意味着你想要使用的端口已经被另一个进程占用了。通常是你上次启动的开发服务器没有正常关闭，或者其他应用（如数据库、代理、VPN）占用了该端口。

### 常见端口冲突速查表

| 端口 | 常见占用者 | 快速解决方案 |
|------|-----------|-------------|
| **3000** | React / Rails / Grafana | `killport 3000` 或重启开发服务器 |
| **4200** | Angular CLI | `killport 4200` |
| **5000** | Flask / macOS AirPlay Receiver | `killport 5000` 或关闭 AirPlay：系统设置 -> 通用 -> 隔空播放接收器 |
| **5173** | Vite | `killport 5173` |
| **8000** | Django / Python HTTP Server | `killport 8000` |
| **8080** | Tomcat / Webpack / Jenkins | `killport 8080` |
| **8081** | React Native Metro | `killport 8081` 或 `npx react-native start --reset-cache` |
| **9000** | PHP-FPM / SonarQube | `killport 9000` |
| **3306** | MySQL | 检查是否有 MySQL 服务在运行：`brew services list` (macOS) |
| **5432** | PostgreSQL | 检查是否有 PostgreSQL 服务在运行 |
| **6379** | Redis | 检查 Redis 服务：`redis-cli ping` |
| **27017** | MongoDB | 检查 MongoDB 服务 |

> 💡 **macOS 系统端口提示**：端口 5000 和 7000 在 macOS Monterey+ 上默认被 AirPlay Receiver 和 Control Center 占用。如果频繁遇到冲突，建议在系统设置中关闭这些功能，或使用其他端口。

**诊断路径：从"盲关终端"到"有意识释放端口"**

#### 步骤 1：是谁占用了这个端口？ (使用 `pport` / `lsof`)

```bash
# 例如，端口是 5173
p5173
# 或针对任意端口：
pport 5173
```

**命令解释 `lsof -nP -iTCP:PORT -sTCP:LISTEN`：**

- `lsof` (List Open Files): 显示打开的文件，在 Unix/Linux 中，网络连接也被视为文件。
- `-n`: 不将 IP 地址转换为主机名，加快速度。
- `-P`: 不将端口号转换成服务名（如 80 转成 http），我们想看数字。
- `-iTCP:PORT`: 过滤 TCP 协议，并指定端口号。
- `-sTCP:LISTEN`: 进一步过滤，只显示处于"监听"状态的连接。

> 💡 **权限提示**：在某些系统上，查看其他用户的进程可能需要 `sudo` 权限。如果输出为空但确定端口被占用，尝试 `sudo lsof -nP -iTCP:PORT -sTCP:LISTEN`。

**输出解读：**

```text
COMMAND   PID   USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
node    12345  alice   22u  IPv6 0xabcdef...      0t0  TCP *:5173 (LISTEN)
```

- `COMMAND`: 是 `node` 程序。
- `PID`: 进程 ID `12345`。这是它的唯一标识。
- `USER`: 用户 `alice`。
- `NAME`: `*:5173 (LISTEN)` 表示它正在监听所有 IP 地址的 5173 端口。

#### 步骤 2：看一下所有开发相关的进程全貌 (使用 `devps`)

在确定了某个端口被占用后，你可能想知道是不是还有其他旧的开发服务器在后台运行。

```bash
devps
```

**命令解释 `pgrep -fl PATTERN`：**

- `pgrep` (Process Grep): 根据名称查找进程 ID。
- `-f`: 按**完整命令行**匹配，比如 `node /path/to/my-project/server.js`。
- `-l`: 显示进程 ID (PID) 和完整的命令行。

**输出解读：**
会列出所有包含 `node`, `vite`, `next`, `nuxt`, `webpack` 等关键词的进程。你可以根据项目路径和 PID，判断哪个进程是多余的。

#### 步骤 3：确认后再安全释放端口 (使用 `killport`)

直接 `kill -9` 某个 PID 可能会误杀重要进程。`killport` 会先让你看清，再决定是否执行。

```bash
killport 5173
```

**`killport` 函数逻辑解释：**

1.  它会先用 `lsof` 列出占用指定端口的所有进程。
2.  提示你“Kill these processes? [y/N]”，只有输入 `y` 或 `Y` 才会继续。
3.  发送 `SIGTERM` 信号 (默认 `kill` 信号)：这是“温柔”的终止，给进程时间清理资源。等待 1 秒。
4.  如果进程仍在，则发送 `SIGKILL` 信号 (`kill -9`)：这是“强制”终止，不给进程任何清理时间。
5.  最后再次检查端口，确认已释放。

**小技巧：后台作业 (Job Control)**

很多人习惯为 `npm run dev` 开一个单独终端。其实你可以使用 Shell 的作业控制功能更高效地管理进程。

**方法一：使用 `Ctrl+Z` 和 `bg`（适合临时切换）**

1.  `npm run dev` (启动服务)
2.  `Ctrl + Z` (暂停服务，并将其放到后台的 `stopped` 状态)
3.  `bg` (让最近的后台作业在后台继续运行，变为 `running` 状态)
4.  `j` (或 `jobs -l`): 查看所有后台作业的列表，比如 `[1] + Running npm run dev`
5.  `fg %1`: 当你需要看日志或与服务交互时，把作业 1 重新拉回前台 (`fg` 是 foreground)

**方法二：直接后台启动（使用 `&`）**

```bash
# 直接在后台启动，输出重定向到文件
npm run dev > dev.log 2>&1 &

# 查看作业编号
jobs -l

# 查看日志
tail -f dev.log

# 停止后台作业
kill %1  # 或使用具体的 PID
```

**两种方法的区别：**
- **`Ctrl+Z` + `bg`**：先在前台启动，需要时可暂停并后台化。灵活但步骤多。
- **`&` 直接后台**：一步到位，适合长时间运行且不需要频繁查看输出的任务。

**常用作业控制命令速查：**
- `jobs -l`：列出所有后台作业及 PID
- `fg %N`：将作业 N 拉回前台
- `bg %N`：让暂停的作业 N 在后台继续运行
- `kill %N`：终止作业 N
- `disown %N`：让作业 N 脱离当前 Shell（关闭终端后继续运行）

> 💡 **注意**：Shell 作业控制仅对当前 Shell 会话有效。如果需要进程在退出 Shell 后继续运行，使用 `nohup` 或 `pm2` 等工具。

---

## 3. 问题二：电脑风扇狂转、系统卡顿 (CPU/内存飙升)

**现象：** 开发机风扇突然狂转，系统响应迟钝，浏览器页面卡死，内存占用过高。

**问题分析：** 某个（或多个）进程占用了过多的 CPU 或内存资源。这可能是你的开发服务器进入死循环、内存泄漏，或浏览器渲染复杂页面、运行大量 JS 脚本导致。

**诊断路径：先确认“是谁”，再想“为什么”**

#### 步骤 1：是谁在吃资源？ (使用 `cpu`)

```bash
cpu
```

**命令解释 `top`：**

- `top` (Table Of Processes): 实时动态地显示系统进程信息，包括 CPU、内存使用。
- **macOS (`top -l 1 | head -20`)：** `-l 1` 取一次快照。
- **Linux (`top -b -n 1 | head -n 20`)：** `-b` 批处理模式，`-n 1` 取一次快照。
- `| head -20`: 管道符将 `top` 输出传递给 `head`，只显示前 20 行（系统概况及资源占用最多的进程）。

**输出解读 (简化)：**

```text
Processes: 300 total, 2 running, 298 sleeping...
CPU usage: 10.00% user, 20.00% sys, 70.00% idle
MemRegions: 153090 total, 17G committed...
PhysMem: 16G used (2G wired), 0 bytes free.

PID    COMMAND        %CPU   %MEM   ...
12345  node           80.0   10.0   ...  # node 进程占用 80% CPU
67890  chrome         50.0   15.0   ...  # Chrome 浏览器占用 50% CPU
...
```

- `%CPU`: 进程占用的 CPU 百分比。
- `%MEM`: 进程占用的内存百分比。

你可以一眼看出哪个 `COMMAND`（程序）消耗了大量资源。

#### 步骤 2：定位具体的 Node / Dev Server 进程 (使用 `nodeps` / `devps`)

如果 `cpu` 命令显示 `node` 进程占用过高，你需要知道是哪个具体的开发服务器：

```bash
nodeps   # 所有 node 相关进程
devps    # 常见 dev server 进程
```

结合 PID 和完整命令行，判断是哪个项目的问题。

#### 步骤 2.5：查看 TCP 连接状态（高级诊断）

如果你的开发服务器频繁出现连接问题，可以深入查看 TCP 连接状态。

```bash
# 查看所有 TCP 连接及其状态（macOS）
lsof -nP -iTCP | awk '{print $NF}' | sort | uniq -c | sort -rn

# 或使用 netstat（跨平台，但在新版 Linux 上已被 ss 替代）
netstat -an | grep tcp | awk '{print $6}' | sort | uniq -c | sort -rn
```

**TCP 连接状态速查表**：

| 状态 | 含义 | 常见原因 | 排查建议 |
|------|------|---------|---------|
| **LISTEN** | 监听状态，等待连接 | 服务器正常运行 | 这是正常状态 |
| **ESTABLISHED** | 连接已建立 | 客户端与服务器正常通信 | 正常状态，数量过多可能是高并发或未释放连接 |
| **TIME_WAIT** | 连接关闭后的等待期 | TCP 四次挥手后的等待阶段（2MSL，约2分钟） | 高并发场景下大量 TIME_WAIT 是正常的，会自动释放 |
| **CLOSE_WAIT** | 对方关闭连接，本地未关闭 | **可能是资源泄漏**：客户端已关闭，但服务端代码未 close socket | 检查代码是否正确关闭连接，特别是异常处理分支 |
| **FIN_WAIT_1/2** | 主动关闭连接的一方等待 | 正在关闭连接 | 短暂出现正常，长期存在需检查网络 |
| **SYN_SENT** | 发送连接请求后等待 | 客户端尝试连接服务器 | 大量此状态说明连接无法建立，检查服务端或网络 |
| **SYN_RECEIVED** | 服务器收到连接请求 | 服务器等待客户端确认 | 大量此状态可能是 SYN Flood 攻击 |

**实战示例：诊断 CLOSE_WAIT 过多问题**

```bash
# 1. 统计各状态数量
lsof -nP -iTCP | grep CLOSE_WAIT | wc -l

# 2. 查看哪个进程产生了大量 CLOSE_WAIT
lsof -nP -iTCP | grep CLOSE_WAIT | awk '{print $1}' | sort | uniq -c | sort -rn

# 3. 如果是 node 进程，查看具体是哪个服务
lsof -nP -iTCP | grep CLOSE_WAIT | grep node

# 4. 解决方案：
#    - 短期：重启该服务
#    - 长期：检查代码中的 socket/connection 是否在 try-catch-finally 中正确关闭
```

#### 步骤 3：进程优先级与资源限制（性能调优）

当多个开发任务同时运行时，合理分配资源可以避免系统卡顿。

**查看进程优先级（Nice 值）**

```bash
# 查看所有 node 进程的优先级
ps -eo pid,ni,comm | grep node

# 输出示例：
# PID   NI COMMAND
# 12345  0 node      # NI=0 是默认优先级
# 67890 10 node      # NI=10 是降低后的优先级（更"友好"）
```

**Nice 值说明：**
- 范围：`-20` (最高优先级) 到 `19` (最低优先级)
- 默认值：`0`
- 数值越大，进程越"友好"（nice），优先级越低，获得的 CPU 时间越少

**使用场景：**

```bash
# 场景1：后台构建任务，不影响前端开发服务器
nice -n 10 npm run build  # 降低优先级

# 场景2：紧急调试，需要更多 CPU 资源（需要 sudo）
sudo nice -n -10 npm run dev  # 提高优先级（慎用）

# 场景3：已运行进程动态调整优先级
renice -n 15 -p 12345  # 将 PID 12345 的优先级降低到 15
```

**限制 Node.js 内存使用**

```bash
# 方法1：使用 NODE_OPTIONS 环境变量
NODE_OPTIONS="--max-old-space-size=2048" npm run dev  # 限制为 2GB

# 方法2：直接在 package.json 中配置
# "dev": "node --max-old-space-size=2048 server.js"

# 方法3：使用 ulimit 限制虚拟内存（macOS/Linux）
ulimit -v 2048000  # 限制为约 2GB（单位是 KB）
npm run dev

# 查看当前限制
ulimit -a
```

**PM2 资源管理（生产环境推荐）**

```bash
# 启动时设置内存上限，超限自动重启
pm2 start server.js --max-memory-restart 512M

# 设置 CPU 核心数限制
pm2 start server.js -i 2  # 使用 2 个 CPU 核心

# 监控资源使用
pm2 monit
```

**实战建议：**
- **开发环境**：使用 `nice` 降低构建任务优先级，避免影响实时编译
- **本地多项目**：为每个项目的 dev server 设置不同的内存限制
- **测试环境**：使用 PM2 + 内存限制，模拟生产环境资源约束

#### 步骤 4：更深层的排查与优化

- **如果是 `node` / `vite` 占用高 CPU：**
  - 优先怀疑代码逻辑问题，例如死循环渲染、无限请求、定时器未清理。
  - 配合浏览器开发工具 (Performance / Network / Memory 面板) 进一步排查前端渲染或数据请求问题。
  - 如果 Node.js 作为后端服务，检查其日志，分析业务逻辑或第三方依赖。
- **如果是浏览器 (Chrome/Safari) 占用高 CPU：**
  - 问题很可能在前端渲染性能或复杂的 DOM 操作。使用浏览器 Performance 面板进行详细分析。
- **如果是 Node.js 服务 OOM (内存溢出) ：**
  - 如果是在本地开发环境，可以尝试 `pm2 start server.js --max-memory-restart 512M` 为 Node 服务设置内存上限，并在达到上限时自动重启。
  - 检查 Node.js 代码是否存在内存泄漏，如未清理的缓存、大型对象引用等。

---

## 4. 问题三：手机 / 同事无法访问本地开发服务

**现象：** 你电脑上 `http://localhost:3000` 运行的开发服务一切正常，但手机浏览器或同事电脑访问你的局域网 IP 时却无法打开。

**问题分析：** 这个问题通常是多方面的：

1.  **服务只监听 `localhost`：** 默认情况下，很多开发服务器只允许本机访问。
2.  **IP 地址不正确：** 手机/同事使用的 IP 地址不是你电脑的局域网 IP，或者你连接了 VPN 导致 IP 混淆。
3.  **网络不通：** 你们不在同一个局域网，或者存在防火墙/AP 隔离。

**诊断路径：从“服务配置”到“网络连通性”**

#### 步骤 1：让你的开发服务监听 `0.0.0.0`

这是最常见的坑！`localhost` (即 `127.0.0.1`) 意味着“只有我自己”。要让其他设备访问，必须让服务监听 `0.0.0.0`，这代表“所有可用网络接口”。

**常见前端框架配置示例：**

- **Vite:**
  ```bash
  npm run dev -- --host
  # 或者在 vite.config.js 中配置 server.host = true
  ```
- **Next.js:**
  ```bash
  next dev --hostname 0.0.0.0 -p 3000
  # 或者在 package.json 的 scripts 中修改 "dev": "next dev --hostname 0.0.0.0"
  ```
- **Nuxt:**
  ```bash
  nuxi dev --host 0.0.0.0 --port 3000
  # 或者在 nuxt.config.ts 中配置 server.host = '0.0.0.0'
  ```
- **Create React App:**
  ```bash
  HOST=0.0.0.0 npm start
  # 或者在项目根目录创建 .env 文件，添加: HOST=0.0.0.0
  ```

> ⚠️ **安全提示**：在公共网络（如咖啡厅 Wi-Fi）上使用 `0.0.0.0` 会暴露你的服务给同网络的所有人，请谨慎使用。开发时建议在受信任的网络环境中进行。

#### 步骤 2：找到你的局域网 IP (使用 `myip` / `ifconfig` / `ip addr show`)

```bash
myip
# 例：192.168.5.136
```

如果 `myip` 成功显示了 IP，直接跳到下一步。如果提示“No LAN IP found”，你需要手动查找。

**手动查找你的局域网 IP：`ifconfig` (macOS) / `ip addr show` (Linux)**

**以您的 `ifconfig` 输出为例进行详细解读：**
您的 `ifconfig` 输出很长，包含了许多网络接口。关键在于找到一个 `status: active` 且 `inet` 后跟 `192.168.x.x` 或 `10.x.x.x` 格式的 IP 地址。

```text
# ... (其他 inactive 或无关接口略) ...

en0: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500 constrained
	options=6460<TSO4,TSO6,CHANNEL_IO,PARTIAL_CSUM,ZEROINVERT_CSUM>
	ether 26:53:68:e7:48:a7
	inet6 fe80::ff:871f:9fac:26cf%en0 prefixlen 64 secured scopeid 0xb
	inet 192.168.5.136 netmask 0xffffff00 broadcast 192.168.5.255  # <--- 你的局域网IP！
	nd6 options=201<PERFORMNUD,DAD>
	media: autoselect
	status: active                                                # <--- 此接口处于活动状态
```

- `en0`: 这是您的**主网络接口**，通常是 Wi-Fi 或有线网卡。
- `status: active`: 表明此接口正在连接网络，是**活动状态**。
- `inet 192.168.5.136`: 这就是您要找的**局域网 IP 地址**！
- 其他 `inactive` 的接口（如 `en1`, `en2` 等）没有连接网络，所以不会有有效 IP。
- `utunX` 接口（如 `utun4` 上的 `198.18.0.1`）：这些是**虚拟隧道接口**，通常由 VPN 或 Docker 等工具创建。如果你的手机或同事没有连接同一个 VPN/虚拟网络，他们无法通过这个 IP 访问你。

**结论：** 从您的输出看，您的局域网 IP 是 `192.168.5.136`。手机或同事应该访问 `http://192.168.5.136:你的端口号`。

#### 步骤 3：在对方机器上检查网络连通性 (使用 `pp` / `cport`)

假设您的 IP 是 `192.168.5.136`，端口是 `5173`。

**首先，对方用 `ping` 检查主机是否可达：**
在**手机或同事的电脑**上打开终端/命令提示符：

```bash
pp 192.168.5.136
```

- 如果能收到回复 (`time=XXms`) 且无丢包，说明您电脑是活跃的，并且网络路由可达。
- 如果 `Request timeout` 或 `Destination Host Unreachable`，说明网络不通。

**接着，对方用 `nc` 检查特定端口是否可达：**
在**手机或同事的电脑**上：

```bash
cport 192.168.5.136 5173
```

**命令解释 `nc -vz HOST PORT`：**

- `-v`: 显示详细过程。
- `-z`: **零输入/输出模式**，只尝试建立 TCP 连接，不发送数据，连接成功或失败后立即退出。

**输出解读：**

- `Connection to 192.168.5.136 5173 port [tcp/*] succeeded!`: **太棒了！** 说明网络、防火墙都没问题，并且你电脑的 5173 端口上有服务在监听。如果此时手机/同事浏览器仍打不开，那问题很可能在你的前端代码（路由、CORS、JS 错误）。
- `nc: connect to 192.168.5.136 port 5173 (tcp) failed: Connection timed out`: **连接超时。** 这通常是网络层的阻断。可能是：
  - 公司 Wi-Fi 开启了 **AP 隔离**（Guest Wi-Fi 常见）。
  - 你电脑的系统防火墙阻止了外部连接（请看下一步）。
  - 你们不在同一个局域网。
  - 你的电脑连接了 VPN，导致 IP 混淆。
- `nc: connect to 192.168.5.136 port 5173 (tcp) failed: Connection refused`: **连接被拒绝。** 说明数据包到达了你的电脑，但你的 5173 端口上**没有程序监听**。回退到步骤 1，确认服务是否已启动并监听 `0.0.0.0`。

#### 步骤 4：检查并配置防火墙

如果 `nc` 显示 `Connection timed out`，很大一部分原因可能是你的设备防火墙阻止了外部连接。

- **macOS 防火墙检查：**
  1.  **macOS Ventura (13.0) 及以上：** 打开"系统设置" -> "网络" -> "防火墙"。
  2.  **旧版 macOS：** 打开"系统偏好设置" -> "安全性与隐私" -> "防火墙"。
  3.  确保防火墙处于关闭状态，或在"选项"中允许了相关应用（如 Node.js）的传入连接，或添加了对你的开发端口的允许规则。
- **Windows 防火墙检查：**
  1.  打开“控制面板” -> “系统和安全” -> “Windows Defender 防火墙”。
  2.  点击“允许应用通过 Windows Defender 防火墙”，检查你的开发服务器进程是否被允许。
  3.  或点击“高级设置” -> “入站规则” -> “新建规则”，添加允许特定端口（如 3000, 5173）的 TCP 连接。
- **Linux 防火墙检查（适用于本地 Linux 开发机）：**
  1.  **UFW (Uncomplicated Firewall):** `sudo ufw status` 查看状态。如果开启，需要 `sudo ufw allow 5173/tcp`。
  2.  **firewalld:** `sudo firewall-cmd --list-ports` 查看已开放端口。如果未开放，需要 `sudo firewall-cmd --add-port=5173/tcp --permanent && sudo firewall-cmd --reload`。

#### 步骤 5：确保你本机服务已启动 (使用 `clocal`)

这是一个自我验证步骤，确保你的服务在你本地是确实可访问的。

```bash
clocal 5173
```

**命令解释 `curl -I URL`：**

- `curl`: 强大的命令行 HTTP 客户端。
- `-I`: 只发送 HTTP `HEAD` 请求，并只显示响应头，不下载页面内容。用于快速检查服务是否存活和返回状态码。

**输出解读：**

- 如果看到 `HTTP/1.1 200 OK` 或其他 2xx/3xx 状态码，说明服务已启动并响应。
- 如果返回 `curl: (7) Failed to connect to localhost port 5173: Connection refused`，说明服务压根没起来。

**小结：简单的“网络拓扑心智图”**

- **理想情况：** 手机/同事电脑 -> 同一个 Wi-Fi/有线网 -> 你的开发机 (服务监听 `0.0.0.0` 且防火墙放行)。只要 IP 没错，基本一定能通。
- **AP 隔离：** 手机连 Guest Wi-Fi，你连内网 Wi-Fi。两者无法互访。解决：让两者连接同一个内部网络。
- **VPN / 多网卡：** 你开着 VPN，服务可能绑定在 VPN 的虚拟网卡 IP 上。手机没进 VPN，无法通过物理网卡 IP 访问。解决：让手机也进同一个 VPN，或使用内网穿透方案。

---

## 5. 问题四：远程 API 慢、不稳定或无法访问

**现象：** 你的前端代码没有任何改动，但线上或测试环境的 API 接口突然变得很慢，间歇性返回 5xx 错误，或者直接请求超时。

**问题分析：** 此时前端代码很可能无辜。问题可能出在：

1.  **DNS 解析错误：** 域名解析到了错误的 IP。
2.  **网络连通性：** 从你的机器到目标服务器的网络路径有问题（防火墙、路由、丢包）。
3.  **服务器端问题：** 后端服务未启动、代码异常、数据库慢、服务器负载高。
4.  **代理问题：** 企业网络代理配置不当或代理服务器本身故障。
5.  **CORS/缓存问题：** 虽然通常在浏览器端体现，但 `curl` 可以提供初步线索。

**诊断路径：网络诊断“四板斧” + 证据链**

#### 步骤 1：第一板斧：主机通不通？ (使用 `pp`)

首先，最基础的测试，看你的电脑是否能和 API 的域名通信。

```bash
pp api.example.com
```

**命令解释 `ping -c 5 HOST`：**

- `-c 5`: 发送 5 个数据包。

**输出解读：**

- `5 packets transmitted, 5 packets received, 0.0% packet loss`: 目标主机活跃，网络畅通无丢包。
- `Request timeout` / `Destination Host Unreachable`: 目标主机不响应 Ping，可能离线、防火墙阻断或网络不通。

#### 步骤 2：第二板斧：域名解析对不对？ (使用 `dshort` / `dig`)

确保你的机器将 API 域名解析到了正确的 IP 地址。

```bash
dshort api.example.com
# 详细解析，可以指定 DNS 服务器，如 Google Public DNS
dig @8.8.8.8 api.example.com
```

**命令解释 `dig +short DOMAIN`：**

- `+short`: 只输出 IP 地址。
- `dig @DNS_SERVER DOMAIN`: 使用指定的 DNS 服务器进行解析。

**输出解读：**

- 返回一个或多个 IP 地址（如 `203.0.113.10`）：DNS 解析正常。如果返回多个 IP，说明存在 DNS 轮询或负载均衡。
- 没有任何输出：DNS 解析失败，可能是域名拼写错误、DNS 服务器故障或本地 DNS 缓存问题。
- 返回了 IP，但你怀疑“环境不对”（如测试域名解析到生产环境 IP）：需要检查 `hosts` 文件 (`/etc/hosts`) 或联系运维确认。

**小技巧：刷新本地 DNS 缓存**
如果 DNS 解析结果不对，且你确认域名配置无误，可能是本地 DNS 缓存问题：

- **macOS:** `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`
- **Linux (systemd 239+):** `sudo resolvectl flush-caches`
- **Linux (旧版 systemd):** `sudo systemd-resolve --flush-caches`
- **Windows:** `ipconfig /flushdns`

#### 步骤 2.5：SSL/TLS 证书检查（排查 HTTPS 证书问题）

当遇到 SSL 证书错误（如 `SSL certificate problem`）时，需要检查服务器证书信息。

```bash
# 查看服务器 SSL/TLS 证书详情（有效期、颁发者、域名）
openssl s_client -connect api.example.com:443 -servername api.example.com </dev/null 2>/dev/null | openssl x509 -noout -dates -subject -issuer

# 输出示例：
# notBefore=Jan  1 00:00:00 2024 GMT
# notAfter=Dec 31 23:59:59 2025 GMT
# subject=CN=api.example.com
# issuer=C=US, O=Let's Encrypt, CN=R3

# 检查完整证书链
openssl s_client -connect api.example.com:443 -showcerts </dev/null 2>/dev/null
```

**常见问题排查：**

- **证书过期：** `notAfter` 日期早于当前日期
- **域名不匹配：** `subject` 中的 CN 与访问域名不一致
- **自签名证书：** `issuer` 与 `subject` 相同，浏览器会警告
- **企业内网证书：** 需要安装企业根证书到系统信任库

#### 3. 第三板斧：端口能连上吗？ (使用 `cport`)

`ping` 只能测试主机可达，但目标端口可能没开。`nc` 可以精确测试指定端口。

```bash
cport api.example.com 443 # 假设是 HTTPS 接口
```

**输出解读：**

- `succeeded!`: TCP 连接成功，目标服务器的 443 端口上有服务在监听。如果 API 仍然有问题，那问题肯定在 HTTP 协议层或服务器业务逻辑。
- `Connection timed out`: 数据包中途被丢弃。可能是防火墙、网络策略、跨区域访问不畅。
- `Connection refused`: 数据包到达服务器，但目标端口没有程序监听（后端服务未启动或端口配错）。

#### 4. 第四板斧：HTTP/业务层正常吗？ (使用 `curl -v -w` 等)

如果前三板斧都正常，那么问题基本锁定在 HTTP 协议层或后端业务逻辑。`curl` 是此时最有力的工具。

##### 4.1 检查 GET 请求的详细过程与耗时

```bash
# 测试 GET 请求，并输出详细耗时
curl -o /dev/null -s -v \
  -w 'Connect: %{time_connect}s  TLS: %{time_appconnect}s  StartTransfer: %{time_starttransfer}s  Total: %{time_total}s\n' \
  https://api.example.com/user
```

**命令解释 `curl -v -w`：**

- `-o /dev/null`: 不将响应体保存到文件或输出到屏幕。
- `-s`: 静默模式，不显示进度条和错误信息。
- `-v`: **详细模式**。显示整个请求和响应过程，包括 DNS、TCP、TLS 握手、发送的 HTTP 头、接收的 HTTP 头。这是最有用的排查信息！
  - 注意输出中的 `* SSL connection using TLSvX.X`，它显示使用的 TLS 协议版本，有助于排查 TLS 兼容性问题。
- `-w 'FORMAT'`：自定义输出格式，用于打印请求各阶段的耗时。
  - `time_connect`: TCP 连接建立耗时。
  - `time_appconnect`: TLS/SSL 握手耗时。
  - `time_starttransfer`: 从发出请求到接收到**首字节**数据的时间。**这个指标非常关键！** 如果前两个时间很短，但这个时间很高，说明问题很可能在**后端服务器处理请求的业务逻辑**。
  - `time_total`: 整个请求的总耗时。

**输出解读：**

```text
*   Trying 203.0.113.10:443...
* Connected to api.example.com (203.0.113.10) port 443 (#0)
* ALPN: offers h2
* ALPN: offers http/1.1
*  CAfile: /etc/ssl/cert.pem
*  CApath: none
* SSL connection using TLSv1.3 / AEAD-AES256-GCM-SHA384
* server certificate verification OK
...
< HTTP/2 504 # <--- 服务器返回 504 错误
...
Connect: 0.050s  TLS: 0.200s  StartTransfer: 2.800s  Total: 2.900s
```

- 如果 `Connect` 和 `TLS` 时间很短，但 `StartTransfer` 很高，且返回 5xx 状态码，基本可以确定是后端服务的问题。
- `TLSvX.X` 的信息可以帮助排查一些老旧系统或特殊安全策略导致的 TLS 握手失败问题。

##### 4.2 测试 POST 请求，发送 JSON Body

调试 API 时，经常需要模拟发送 POST 请求并携带 JSON 数据。

```bash
curl -X POST \
     -H "Content-Type: application/json" \
     -d '{"username": "frontend_dev", "password": "secure_password"}' \
     https://api.example.com/auth/login
```

- `-X POST`: 指定请求方法为 POST。
- `-H "Content-Type: application/json"`: 设置请求头。
- `-d 'JSON数据'`: 携带 JSON 数据作为请求体。

##### 4.2.5 检查 HTTP/2 和 HTTP/3 支持

现代 Web 应用越来越多地使用 HTTP/2 和 HTTP/3 协议以提升性能。检查服务器是否支持这些协议：

```bash
# 检查服务器是否支持 HTTP/2
curl -I --http2 https://api.example.com

# 强制使用 HTTP/2（如果服务器不支持会失败）
curl -v --http2-prior-knowledge http://api.example.com

# 检查是否支持 HTTP/3 (QUIC)
# 注意：需要 curl 7.66.0+ 且编译时启用 HTTP/3 支持
curl -I --http3 https://api.example.com 2>&1 | grep "HTTP/3"
```

**输出解读：**

```bash
# HTTP/2 成功输出示例
< HTTP/2 200
< content-type: application/json
# 注意 "HTTP/2" 而非 "HTTP/1.1"

# HTTP/1.1 回退输出示例
< HTTP/1.1 200 OK
# 说明服务器不支持 HTTP/2 或未配置
```

**为什么关心 HTTP 版本？**
- **HTTP/2**：多路复用、头部压缩、服务器推送，显著提升性能
- **HTTP/3**：基于 QUIC（UDP），更低延迟，特别适合移动网络
- **性能对比**：对于前端资源加载，HTTP/2 比 HTTP/1.1 快 30-50%

**前端开发建议：**
- 生产环境 API 应启用 HTTP/2（大多数 CDN 和云服务商默认支持）
- 不再需要域名分片（Domain Sharding）等 HTTP/1.1 时代的优化技巧
- 使用浏览器开发者工具 Network 面板的 Protocol 列确认实际使用的协议

##### 4.3 诊断 CORS 问题

虽然 `curl` 本身不受 CORS 限制，但通过其详细输出，我们可以获取到后端响应头，从而初步判断是否存在 CORS 配置问题（例如缺少 `Access-Control-Allow-Origin` 头部）。
例如，当你期望后端允许来自 `http://localhost:3000` 的请求时，可以这样模拟：

```bash
curl -v -H "Origin: http://localhost:3000" https://api.example.com/some-endpoint
```

观察响应头中是否有 `Access-Control-Allow-Origin: http://localhost:3000` 或 `Access-Control-Allow-Origin: *`。如果缺少或不匹配，则可能就是 CORS 问题。

##### 4.4 检查 CDN 缓存状态

对于前端资源或 API 接口，CDN 缓存状态对性能影响巨大。通过 `curl -v` 我们可以检查相关 HTTP 头部。

```bash
curl -v https://your-cdn-domain.com/your-asset.js
```

在输出中寻找以下头部：

- `Cache-Control`: 指示缓存策略（`max-age`, `no-cache`, `no-store`等）。
- `Age`: 响应在代理缓存中存活了多长时间。
- `X-Cache` (或类似 `CF-Cache-Status`, `X-Served-By`): CDN 服务商自定义的缓存命中状态（`HIT`, `MISS`, `EXPIRED`）。
  这些信息能帮助你判断资源是否从 CDN 命中、是否已过期，从而排查缓存相关问题。

#### 5. 特殊情况：代理问题与证书

在企业环境中，HTTP/S 代理是常见障碍。代理可能拦截、修改请求，导致网络问题。

1.  **检查环境变量：**
    `echo $HTTP_PROXY`, `echo $HTTPS_PROXY`, `echo $NO_PROXY`。如果设置了代理，而代理本身有问题，则会导致网络不通。
    - **带认证的代理：** `curl -x http://user:password@proxy.example.com:8080 https://api.example.com`
2.  **临时禁用 `curl` 代理：**
    `curl --noproxy '*' -v https://api.example.com`。如果禁用后成功，问题就在代理配置。
3.  **信任企业内部证书：**
    代理可能替换 SSL 证书导致 `curl: (60) SSL certificate problem`，需要安装企业根证书或暂时忽略证书验证（`curl -k`，不推荐用于生产）。

#### 6. 路由：路上是不是被卡住了？ (使用 `trn` / `mtr`)

如果 `ping`, `nc` 都正常，但 `curl` 延迟很高，你可以用 `traceroute` 查看数据包经过了哪些路由器，判断是哪一段网络路径变慢。

```bash
trn api.example.com
```

**命令解释 `traceroute -n HOST`：**

- `-n`: 不进行 DNS 反向解析，只显示 IP，加快速度。

**输出解读 (简化)：**

```text
 1  192.168.1.1 (192.168.1.1)  1.234 ms  0.987 ms  1.567 ms # 你家路由器
 2  10.0.0.1 (10.0.0.1)  5.678 ms  6.123 ms  5.999 ms    # 运营商出口
 3  203.0.113.1 (203.0.113.1)  20.123 ms  21.456 ms  20.789 ms
 4  * * *                                                # 某跳超时
 5  142.250.7.142 (142.250.7.142)  50.123 ms  51.456 ms  50.789 ms # 目标服务器
```

- 每行表示一个网络“跳”（路由器），显示 IP 和三次探测的延迟。
- `* * *` 表示该跳没有响应。
- 观察延迟时间，如果从某一行开始延迟显著增高，就说明问题可能出在那一跳或之后。

**高级工具：`mtr` (My Traceroute)**
`mtr` 结合了 `ping` 和 `traceroute` 的功能，能够持续跟踪网络路径，实时显示每跳的延迟和丢包率，对于定位间歇性网络问题非常有效。
安装：`brew install mtr` (macOS), `sudo apt install mtr` (Linux)
使用：`sudo mtr api.example.com` (需要 root 权限)

#### 7. WebSocket 连接测试（现代前端常用）

WebSocket 是现代 Web 应用中用于实时通信的重要协议。测试 WebSocket 连接需要专门的工具。

```bash
# 安装 websocat（WebSocket 命令行工具）
brew install websocat

# 测试 WebSocket 连接
websocat ws://localhost:3000/ws

# 测试加密的 WebSocket (wss://)
websocat wss://api.example.com/socket

# 发送消息并观察响应（交互式）
# 连接后直接输入文本并按回车发送，观察服务器响应

# 使用 curl 测试 WebSocket 握手（检查 HTTP 升级请求）
curl -i -N \
  -H "Connection: Upgrade" \
  -H "Upgrade: websocket" \
  -H "Sec-WebSocket-Version: 13" \
  -H "Sec-WebSocket-Key: $(echo -n 'test' | base64)" \
  http://localhost:3000/ws
```

**常见问题排查：**

- **连接被拒绝：** 检查服务器是否支持 WebSocket，路径是否正确
- **握手失败：** 检查 HTTP 响应状态码（应为 101 Switching Protocols）
- **连接断开：** 检查防火墙、代理、负载均衡器是否支持长连接

#### 7. 汇总成一句“可执行”的问题描述给后端/运维

将前面收集到的所有信息汇总成一个清晰、结构化的报告，能大大加快问题解决速度，也能保护前端自己。

**一个理想的提单示例：**

> - **时间：** YYYY-MM-DD HH:mm–HH:mm（GMT+8）
> - **源 IP：** `203.0.113.20`（前端出口 IP，可咨询公司运维获取）
> - **目标：** `https://api.example.com/user`（443 端口）
> - **现象：** 浏览器中明显感觉接口变慢，经常超过 3 秒，间歇性返回 504 错误。
> - **本机诊断数据：**

    -   `ping api.example.com`：平均 RTT 50ms，无丢包。
    -   `dig +short api.example.com`：解析到 `203.0.113.10` (预期IP)。
    -   `nc -vz api.example.com 443`：`succeeded!` (TCP连接正常)。
    -   `curl -v -w '...' https://api.example.com/user` (示例输出)：
        -   `Connect: 0.06s TLS: 0.18s StartTransfer: 2.80s Total: 2.90s`
        -   `curl -v` 输出中显示 `* SSL connection using TLSv1.3`
        -   响应头中未找到 `Access-Control-Allow-Origin` 头部 (如存在 CORS 问题)。
    -   `traceroute -n api.example.com`：从 `198.51.100.10` 这一跳开始 RTT 200ms+ 且波动大。
    -   `mtr api.example.com`：显示第 4 跳 `198.51.100.10` 处出现 10% 丢包。

> - **初步判断：** 根据 `curl` 耗时分析，`Connect` 和 `TLS` 正常，但 `StartTransfer` 时间过长，怀疑后端处理逻辑慢。`traceroute` 和 `mtr` 显示网络路径中段存在高延迟和丢包，可能存在链路问题。浏览器中也观察到 CORS 错误，可能与后端缺少 `Access-Control-Allow-Origin` 响应头有关。

---

## 6. 迁移到服务器：Linux 简明对照

你在 macOS 上用的那套思路，在 Linux 服务器上基本都成立，只是命令略有区别。

| 目的               | macOS（本地）                      | Linux（服务器常见）                                                                                           | 备注                                   |
| :----------------- | :--------------------------------- | :------------------------------------------------------------------------------------------------------------ | :------------------------------------- | ----------------------------------------- |
| 看端口被谁占       | `lsof -nP -iTCP:3000 -sTCP:LISTEN` | `sudo ss -tulpn                                                                                               | grep :3000`                            | `ss` (Socket Statistics) 更现代、性能更好 |
| 看所有监听端口     | `ports`                            | `sudo ss -tulpn`                                                                                              | `ss` 是 `netstat` 的替代品             |
| 查进程             | `ps aux` / `nodeps` / `devps`      | `ps aux` / `pgrep -fl node`                                                                                   |                                        |
| CPU / 内存快照     | `cpu`                              | `top` / `htop` (更美观且功能强大)                                                                             |                                        |
| 网络接口           | `ifconfig` / `myip`                | `ip addr show` / `hostname -I`                                                                                | `ifconfig` 在新版 Linux 已被 `ip` 取代 |
| traceroute         | `trn`（`traceroute -n`）           | `traceroute` / `mtr` (更强大，持续追踪丢包)                                                                   |                                        |
| DNS 查询           | `dig` / `dshort`                   | `dig` / `host`                                                                                                | `host` 也是一个不错的选择              |
| Ping 测试          | `pp`（`ping -c 5`）                | `ping`                                                                                                        |                                        |
| Node 服务管理      | `pm2` / `pml` / `pmlog`            | `pm2`（+ systemd 管理，如 `systemctl status pm2`）                                                            |                                        |
| 检查防火墙状态     | 系统设置 / 安全软件界面            | `sudo ufw status` / `sudo firewall-cmd --list-ports`                                                          | 取决于使用哪种防火墙工具               |
| 防火墙开放端口示例 | (macOS/Windows GUI)                | `sudo ufw allow 3000/tcp` / `sudo firewall-cmd --add-port=3000/tcp --permanent && sudo firewall-cmd --reload` |                                        |
| 持续监控           | `wn COMMAND`                       | `watch COMMAND`                                                                                               |                                        |

**典型服务器排查流程 (把本地套路搬上去)：**

```bash
# 1. 确认服务进程在跑
pgrep -fl node

# 2. 确认端口正在监听
sudo ss -tulpn | grep :3000

# 3. 在服务器本机发起请求，检查服务是否健康 (避免网络干扰)
curl -s -o /dev/null -w '%{http_code} %{time_total}\n' http://127.0.0.1:3000/health
```

- 如果服务器本机 `curl` 就超时 / 5xx → 说明后端服务本身有问题。
- 如果服务器本机很快，但前端机却很慢 → 问题很可能在“前端机到服务器”的网络路径上，回到第 5 章的 DNS/TCP/路由排查。

---

## 7. 成为命令行侦探：构建你的排查心智图

至此，你已经掌握了命令行诊断前端开发痛点的核心技能。文章中所有的命令，最终都归结为解决实际问题的几条“实战路径”。记住这些路径，你就能在现场从容不迫。

1.  **端口冲突 / dev server 起不来**

    ```text
    pport / p5173 → devps → killport → npm run dev
    ```

2.  **手机 / 同事访问不了本机服务**

    ```text
    确保 dev server 监听 --host / 0.0.0.0 →
    myip 找到正确局域网 IP →
    本机 clocal 验证服务 →
    对方机器 pp / cport 检查网络通畅 →
    不通则排查防火墙 / Wi‑Fi 隔离 / VPN
    ```

3.  **远程 API 慢 / 时好时坏**

    ```text
    pp 看基础可达性 →
    dshort / dig @8.8.8.8 看 DNS 解析并刷新本地缓存 →
    cport 看 TCP 端口可达性 →
    curl -v / -w 看 HTTP 状态、TLS 版本、耗时拆分、CORS/CDN头部、代理情况 →
    trn / mtr 看网络哪一跳变慢、丢包 →
    整理成一条“可执行”的问题描述给后端/运维
    ```

4.  **CPU / 内存飙升**
    ```text
    cpu 看高占用进程 →
    nodeps / devps 定位具体 Node / dev server →
    ps / lsof 辅助查看进程详情 →
    本地配合浏览器 DevTools 查死循环 / 内存泄漏 →
    线上则用 pm2 做兜底 + 日志分析
    ```

这些技能将让你不再是面对报错信息一头雾水的“小白”，而是能够清晰地定位问题、分析现象，并能用专业数据与他人沟通的“命令行侦探”。多加实践，你会发现命令行世界大有可为！

---
