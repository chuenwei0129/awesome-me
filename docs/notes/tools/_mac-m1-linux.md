# macOS M1 + Linux 服务器下的命令行实战

> 本文假设：
>
> - **本地开发环境：macOS（Apple Silicon / M1）**
> - **线上环境：远程 Linux 服务器（常见：Ubuntu / Debian / CentOS 等）**
>
> 所有命令会标注适用范围：
>
> - 未注明：macOS + Linux 通用
> - `[macOS]`：只在本机 macOS 使用或推荐该写法
> - `[Linux]`：只在远程 Linux 服务器使用或该命令仅存在于 Linux

---

## 0. 为什么 Web 开发者需要精通命令行？

对现代前端 / 全栈 / Node.js 开发者来说，命令行已经深度嵌入到整个生命周期：

- 版本控制：`git`
- 本地开发：`npm` / `pnpm` / `yarn` / `bun`
- 构建与工具链：`vite`、`webpack`、
- 上线与运维：`ssh`、`docker`（远程 Linux）
- 排错：看日志、查端口、看进程、看磁盘 / 网络状态

尤其在 **远程 Linux 服务器（无 GUI）** 上，你几乎只能靠命令行。
而在 **本地 macOS M1** 上，脚本化和终端工具又能极大提高开发效率。

本文会用统一的结构，把 **本地 macOS（M1）** 和 **远程 Linux** 放在一起讲，并指出你在两端执行命令时需要注意的差异。

---

## 1. Terminal / Shell / Prompt

日常说的“命令行”其实包含三层：

### 1.1 Terminal（终端）

- 你看到的“窗口”：如 macOS 自带 Terminal、iTerm2、VS Code 内置终端
- 只负责 UI，不执行命令本身

---

### 1.2 Shell（命令解释器）

- 解释并执行命令的程序：`zsh`、`bash`、`fish` 等
- 本地 macOS（10.15+）默认 Shell 是 **zsh**
- 远程 Linux 服务器常见默认是 **bash**

  - Ubuntu / Debian 中 `/bin/sh` 通常指向 `dash`
  - **交互 shell 仍然是 bash**

---

### 1.3 Prompt（提示符）

- Shell 等待输入时显示的一行内容
- 如：

  ```text
  username@hostname project %
  user@host:~/project$
  ```

- Prompt 是 Shell 的一部分，可显示：

  - Git 分支
  - Node 版本
  - 当前目录
  - 命令执行状态

---

## 2. 交互 shell vs 登录 shell（两个正交概念）

> 一个 shell **可以同时是交互的，也是登录的**
> 这不是二选一关系。

---

### 2.1 如何判断当前 shell 状态

```bash
# 当前登录 shell（来自 /etc/passwd）
echo $SHELL

# 当前正在运行的 shell
echo $0

# 当前 shell 进程信息
ps -p $$
```

示例输出：

```text
/bin/zsh --login
```

说明：

- `--login` 表示这是一个 **登录 shell**
- 你能输入命令，说明它也是 **交互 shell**
- 因此这是一个：

  > **交互型登录 shell（interactive login shell）**

⚠️ 注意：

- `$0` 在交互 shell 中通常显示 shell 名
- 在脚本中，`$0` 表示脚本路径

---

### 2.2 macOS 上的新终端窗口是什么 shell？

在 **macOS（M1 / Apple Silicon）** 上：

- Terminal.app
- iTerm2（默认配置）
- VS Code 内置终端（常见配置）

👉 **新打开的终端窗口通常启动的是：**

```text
交互 shell + 登录 shell
```

也就是：

```bash
ps -p $$ -o arg=
# 输出 zsh --login
```

这是 macOS 的**刻意设计**，目的是：

- 保证 `/etc/profile`、`~/.zprofile` 被加载
- 让 GUI 启动的终端行为更接近真实登录会话

---

### 2.3 Linux / 服务器上的常见情况

在大多数 Linux 服务器上：

- SSH 登录：

  - **登录 shell**

- 新开一个 bash（或 VS Code 终端）：

  - **非登录的交互 shell**

因此：

- `.profile / .bash_profile` **不一定会被读取**
- `.bashrc` 几乎一定会被读取

---

## 3. Shell 启动文件加载规则（关键）

### 3.1 zsh（macOS）

当你在 macOS 上打开一个新终端窗口时，zsh 的典型加载顺序是：

```text
/etc/zprofile
~/.zprofile
/etc/zshrc
~/.zshrc
```

这意味着：

- `~/.zprofile` 里的 PATH / 环境变量会生效
- `~/.zshrc` 里的 alias / starship / prompt 也会生效

---

### 3.2 bash（Linux）

#### 登录 shell（如 SSH）

```text
/etc/profile
~/.bash_profile 或 ~/.profile
```

#### 非登录交互 shell

```text
~/.bashrc
```

---

## 4. 推荐实践（前端工程师）

### macOS（zsh）

- **长期存在的环境变量 / PATH**

  - `~/.zprofile`

- **交互行为**

  - `~/.zshrc`
  - alias / 函数 / starship

---

### Linux（bash）

- **环境变量**

  - `~/.profile`

- **交互行为**

  - `~/.bashrc`

---

## 5. 一个非常重要的结论（请记住）

> Terminal / iTerm / VS Code 打开的终端，
> **一定是交互 shell** > **在 macOS 上通常还是登录 shell** > **在 Linux 上通常不是**

这也是为什么：

- `.zprofile` 在 macOS 上“看起来什么都能生效”
- `.profile` 在服务器上却“经常不生效”

---

## 6. Homebrew 与 Apple Silicon（M1）注意事项 [macOS]

在 macOS 上，想用 `rg` / `fd` / `htop` / `jq` 等现代工具，基本都通过 **Homebrew** 安装。

### 6.1 安装 Homebrew（Apple Silicon / M1）

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

安装完成后，Apple Silicon 默认安装在 `/opt/homebrew`：

```bash
# [macOS] 将 Homebrew 加入 PATH（推荐写在 ~/.zprofile）
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

之后就可以：

```bash
brew install htop jq ripgrep fd eza bat tldr
```

---

## 7. 文件系统与导航（macOS + Linux 通用）

### 7.1 常用命令

- `pwd`：打印当前目录
- `ls`：
  - `ls -l`、`ls -a`、`ls -lh`、`ls -alF`
- `cd`：
  - `cd` / `cd ~`：回到 home
  - `cd ..`：上一级
  - `cd -`：在当前目录和上一个目录之间切换

### 7.2 `./` 的意义

- 作为路径：`cd ./project` ≈ `cd project`
- 作为执行：`./script.sh` 执行“当前目录的脚本”；因为当前目录 `.` 通常不在 `PATH` 中（macOS 与 Linux 都一样）。

### 7.3 常见目录（macOS 和 Linux 差异）

**远程 Linux：**

| 目录       | 说明                       |
| ---------- | -------------------------- |
| `/etc`     | 系统配置                   |
| `/var/log` | 系统和服务日志             |
| `/home`    | 普通用户主目录             |
| `/var/www` | Web 根目录（因发行版而异） |
| `/tmp`     | 临时目录                   |

**本地 macOS：**

| 目录            | 说明                                  |
| --------------- | ------------------------------------- |
| `/Users/<你>`   | 你的 home 目录                        |
| `/Applications` | GUI 应用                              |
| `/usr/local`    | 旧版 Intel Mac 上常见的 Homebrew 路径 |
| `/opt/homebrew` | Apple Silicon（M1）上 Homebrew 路径   |
| `/var/log`      | 系统日志（Darwin 风格）               |

---

## 8. 创建 / 复制 / 移动 / 删除（通用）

### 8.1 基础操作

```bash
touch app.log                      # 创建文件或更新时间戳
mkdir my-project                   # 创建目录
mkdir -p src/components/Button     # 递归创建多级目录

cp source.log dest.log             # 复制文件
cp -r src/ build/                  # 复制目录

mv app.log logs/                   # 移动文件
mv old.js new.js                   # 重命名文件
```

### 8.2 删除与安全策略

```bash
rm old.log           # 删除文件
rm -r old-project    # 递归删除目录
```

**强烈不要：**

```bash
rm -rf /             # 删系统
```

**交互时的安全别名：**

```bash
# ~/.zshrc 或 ~/.bashrc
alias rm='rm -i'     # 删除时要求确认
```

> 建议只在“交互式使用”里这样设置。
> 脚本中如需无交互删除，使用 `command rm` 或 `/bin/rm`。

---

## 9. 查看文件与日志（排错核心）

```bash
cat file              # 小文件
less app.log          # 大文件，分页查看
tail -n 100 app.log   # 最后 100 行
tail -F app.log       # 跟随日志并处理轮转
```

`less` 中常用快捷键：

- `空格 / f`：下一页
- `b`：上一页
- `/keyword`：向下搜索
- `n` / `N`：下一个 / 上一个匹配
- `g` / `G`：文件头 / 尾
- `q`：退出

---

## 10. 重定向 / 管道（通用）

### 10.1 标准输出 / 错误：理解“数据流”

首先，想象你写的 `console.log('Hello')` 和 `console.error('Failed!')`。在命令行世界里，每个命令也有两个默认的“输出频道”：

1.  **标准输出**：编号为 `1`，通常用于输出正常、预期的结果。相当于 `console.log`。
2.  **标准错误**：编号为 `2`，通常用于输出错误信息、警告。相当于 `console.error`。

默认情况下，它们都显示在你的终端屏幕上。**重定向**的作用，就是把这两个“数据流”引导到其他地方（主要是文件）。

#### 1. 基本重定向

```bash
# > 是“覆盖重定向”，文件不存在会创建，存在则清空后写入
ls -l > files.txt          # 将 ls 的“标准输出”覆盖写入 files.txt
echo "# 项目开始" > log.txt  # 清空 log.txt，然后写入这行字

# >> 是“追加重定向”，把内容添加到文件末尾
echo "Stage 1: npm install" >> log.txt
npm run build >> log.txt   # 将构建的标准输出追加到 log.txt 末尾
```

#### 2. 分离标准输出和错误 (stdout & stderr)

这是最实用的场景之一。假设你运行一个可能出错的脚本：

```bash
# 将标准输出(1)写入 build.log，将标准错误(2)写入 build-errors.log
npm run build 1> build.log 2> build-errors.log
# 通常可以省略 `1`，写成 `npm run build > build.log 2> errors.log`
```

**前端应用**：在 CI/CD 流水线中，这样可以分别检查构建产物和错误。

#### 3. 合并两个流到同一个文件

你想把所有输出，无论正常还是错误，都记录到一个完整的日志文件中。

```bash
# 错误写法： node app.js 2>&1 > all.log
# 正确写法：
node server.js > all.log 2>&1
# 或者更直观的写法：
node server.js &> all.log       # Bash 的简便写法，效果相同
```

**为什么顺序很重要？ `command > file 2>&1`**
这是一个理解难点。可以把它看作从左到右的“重定向连接”过程：

- `> all.log`： 首先，把 **标准输出 (1)** 的“目的地”设置为文件 `all.log`。
- `2>&1`： 然后，把 **标准错误 (2)** 的“目的地”设置为“**当前标准输出 (1) 的目的地**”，也就是 `all.log` 文件。
- 最终，两个流都流向了同一个文件。

如果写成 `2>&1 > file`，意思是“先把 stderr 指向当前 stdout（屏幕），然后再把 stdout 指向文件”，结果错误信息还是会显示在屏幕上。

---

### 10.2 管道：命令的“乐高积木”哲学

管道符 `|` 的威力在于，它能把**前一个命令的“标准输出”**，变成**后一个命令的“标准输入”**。就像工厂的流水线，数据经过一道道工序被加工。

#### 核心概念：每个命令“只做一件事，并做好”

- `grep`： 筛选文本，留下包含模式的行。
- `sort`： 对行进行排序。
- `uniq -c`： 合并连续重复行，并计数（`-c` 表示显示出现次数）。
- `head` / `tail`： 取文件的开头或结尾几行。

#### 详细拆解日志分析的例子

假设你的 `app.log` 里有这样的内容：

```
INFO: Server started on port 3000
ERROR: Database connection failed - timeout
ERROR: Database connection failed - timeout
WARN: High memory usage
ERROR: User 'bob' not found
INFO: GET /api/data 200
```

让我们一步步“组装”命令：

```bash
# 1. 筛选：只留下包含 “ERROR” 的行
grep "ERROR" app.log
# 输出：
# ERROR: Database connection failed - timeout
# ERROR: Database connection failed - timeout
# ERROR: User 'bob' not found

# 2. 排序：为下一步的‘去重计数’做准备（uniq 只能处理相邻的重复行）
grep "ERROR" app.log | sort
# 输出：（两行相同的错误排在一起了）
# ERROR: Database connection failed - timeout
# ERROR: Database connection failed - timeout
# ERROR: User 'bob' not found

# 3. 去重并计数
grep "ERROR" app.log | sort | uniq -c
# 输出：
#       2 ERROR: Database connection failed - timeout
#       1 ERROR: User 'bob' not found

# 4. 按计数数字反向排序（-n 按数字，-r 反向，即从大到小）
grep "ERROR" app.log | sort | uniq -c | sort -nr
# 输出：
#       2 ERROR: Database connection failed - timeout
#       1 ERROR: User 'bob' not found

# 5. 只取前10行
grep "ERROR" app.log | sort | uniq -c | sort -nr | head -n 10
# 输出：
#       2 ERROR: Database connection failed - timeout
#       1 ERROR: User 'bob' not found
```

现在你一眼就能看出，数据库连接超时是最主要的错误。

#### 前端实用管道示例

**1. 监控打包过程，并同时保存日志**

```bash
npm run build --verbose | tee build.log
# `tee` 命令像水管的三通：一份数据流向屏幕，一份流向文件。你可以实时看到进度，同时有完整记录。
```

**2. 快速找出项目里使用最多的某个依赖**

```bash
# 找出所有 import/require 行，过滤出包名，排序统计
grep -r "from 'react'" src/ | awk -F"'" '{print $2}' | sort | uniq -c | sort -nr
```

**3. 优雅地处理 JSON (结合 `jq` 工具)**
你的 `package.json` 或者 API 响应是 JSON，可以用 `jq` 解析，再用管道处理。

```bash
# 提取所有依赖包名，按字母排序
cat package.json | jq -r '.dependencies | keys[]' | sort
# 如果你调用一个 API
curl -s https://api.github.com/users/octocat/repos | jq '.[].name'
```

### 总结与最佳实践

- **`>` / `>>`**： 重定向**到文件**。用于**保存**输出。
- **`|`**： 管道**到另一个命令**。用于**即时处理**输出。
- **组合使用**：你可以在管道链的最后进行重定向。
  ```bash
  grep ERROR app.log | sort | uniq -c | sort -nr > top-errors.txt
  ```
- **调试技巧**：如果管道命令很长，可以一步步构建。先运行第一部分 `grep ERROR app.log`，确认输出正确后，再慢慢加上 `| sort`， `| uniq -c` 等等。

作为前端开发者，掌握这些能让你在分析构建日志 (`webpack`/`vite`)、处理测试输出、管理服务器日志时更加得心应手。把命令看成乐高积木，大胆组合试试吧！

---

## 11. 搜索与查找：`grep` / `rg` / `find` / `fd`

### 11.1 文本搜索：`grep`（通用）与 `rg`（推荐）

```bash
grep "axios" src/api.js
grep -R "TODO" src
grep -i "error" app.log
grep -n "User not found" app.log
grep -v "DEBUG" app.log         # -v = invert match 反向匹配
```

查看上下文：

```bash
grep -A 5 "Exception" error.log # 匹配行 + 后 5 行
grep -B 5 "Exception" error.log # 匹配行 + 前 5 行
grep -C 5 "Exception" error.log # 前后各 5 行
```

**`rg`（ripgrep）[macOS + Linux，需安装]：**

```bash
brew install ripgrep      # [macOS]
# 或 apt/yum 等 [Linux]

rg axios src
rg "useEffect\(" src
rg -g"*.test.tsx" "render"
```

### 11.2 文件查找：`find`（通用）与 `fd`（现代替代）

```bash
find . -name "*.js"
find src -type f -name "*.test.js"
find /var/log -type f -size +100M
find . -mtime -7           # 最近 7×24 小时内修改
```

**`fd`（推荐，通过 Homebrew / 包管理器安装）：**

```bash
brew install fd            # [macOS]
fd login src
fd "test" -e js
```

### 11.3 `find` + `xargs` 批处理

```bash
find . -type f -name "*.log.bak" -print0 | xargs -0 rm
```

`-print0` + `-0` 安全处理带空格的文件名。

---

## 12. 进程与端口：macOS vs Linux 差异点

### 12.1 查看进程

```bash
ps aux                      # 通用
pgrep -fa node              # 通用：按名称查 PID
htop                        # [需要安装，macOS 用 brew install htop]
```

### 12.2 结束进程

```bash
kill <PID>        # SIGTERM，优雅终止
kill -9 <PID>     # SIGKILL，强制，可能丢数据
```

### 12.3 端口占用（最容易 macOS / Linux 弄混的地方）

**远程 Linux 推荐：[Linux]**

```bash
sudo ss -tulpn | grep :3000
sudo lsof -nP -iTCP:3000 -sTCP:LISTEN
```

**本地 macOS 推荐：[macOS]**

`ss` 默认不存在，建议用：

```bash
sudo lsof -nP -iTCP:3000 -sTCP:LISTEN     # 强烈推荐
# 或：
netstat -anv | grep 3000
```

统一排查流程（本地 macOS & 远程 Linux）：

1. 用 `lsof` 查端口 → 知道 PID
2. 确认进程是否是你要的服务
3. 必要时 `kill PID` 或修改服务配置端口

---

## 10. 作业控制与守护：本地开发 vs 线上服务

### 10.1 作业控制（通用）

```bash
npm run dev &    # 后台启动
jobs             # 查看当前 shell 的后台作业
fg %1            # 把作业 1 拉到前台
bg %1            # 让作业 1 在后台继续
Ctrl+C           # 中断前台
Ctrl+Z           # 暂停并放入后台 (Stopped)
```

### 10.2 守护进程：`pm2` vs `systemd` vs macOS

- 本地 macOS 开发：一般只用 `npm run dev` + `Ctrl+C` 即可。
- 远程 Linux 生产环境：
  - Node：`pm2` 或 `systemd` 管理进程。
  - 其他服务：多用 `systemd`。

**`pm2` 示例（本地 / 远程都可）：**

```bash
npm i -g pm2
pm2 start server.js --name my-app
pm2 logs my-app
pm2 restart my-app
pm2 startup          # 设置开机自启（需根据提示执行）
```

**`systemd`（仅 Linux）示例单元文件 `/etc/systemd/system/my-app.service`：**

```ini
[Unit]
Description=My Node.js App
After=network.target

[Service]
WorkingDirectory=/var/www/my-app
ExecStart=/usr/bin/node server.js
Restart=always
Environment=NODE_ENV=production
User=www-data
Group=www-data

[Install]
WantedBy=multi-user.target
```

管理命令（仅 Linux）：

```bash
sudo systemctl daemon-reload
sudo systemctl enable my-app
sudo systemctl start my-app
sudo systemctl status my-app
journalctl -u my-app -f      # 实时看服务日志
```

> 本地 macOS 不使用 `systemd/journalctl`，而是 `launchd/launchctl` + `log` 命令；对日常 Web 开发而言，更多是连到 Linux 服务器看这些命令的输出即可。

---

## 11. 网络与 DNS：macOS 与 Linux 的命令对应

### 11.1 查看 IP 与路由

**远程 Linux：[Linux]**

```bash
ip addr
ip route
```

**本地 macOS：[macOS]**

macOS 没有 `ip` 命令，用以下替代：

```bash
ifconfig                          # 查看所有接口
ipconfig getifaddr en0            # 获取 en0 的 IPv4（常见为 Wi‑Fi）
ipconfig getifaddr en1            # 视你机器网卡而定

route -n get default              # 查看默认网关
```

简便的 IP 显示：

```bash
hostname -I      # [Linux] 通常可用
ipconfig getifaddr en0   # [macOS] 常用
```

### 11.2 连通性与端口

**通用：**

```bash
ping google.com              # ICMP，可能被禁
nc -zv api.example.com 443   # 测试 TCP 端口（Netcat）
curl -vkI https://api.example.com  # 看 HTTP/HTTPS
```

> 许多服务器禁用 ICMP，所以 `ping` 失败不一定代表服务不可达。
> 对 HTTP API 更推荐 `curl -v`。

### 11.3 路由诊断：`traceroute` / `mtr`

macOS 和 Linux 都有 `traceroute`（可能需要安装）：

```bash
traceroute google.com
```

更强的持续诊断工具 `mtr`：

```bash
# macOS
brew install mtr
sudo mtr google.com

# Linux（用包管理器）
sudo mtr google.com
```

### 11.4 DNS：`dig` / `host`（通用）

```bash
dig api.my-service.com
host api.my-service.com
```

看 `ANSWER SECTION` 中域名被解析到的 IP 是否正确。

---

## 12. SSH 与部署：macOS 本地连接 Linux 服务器

### 12.1 SSH 基本用法（macOS 调 Linux）

```bash
ssh user@server
ssh -p 2222 user@server
ssh -i ~/.ssh/id_ed25519 user@server
```

生成较新更安全的密钥（在 macOS 上执行）：

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

配置 `~/.ssh/config` 提升效率：

```text
Host my-prod
  HostName 1.2.3.4
  User deploy
  Port 22
  IdentityFile ~/.ssh/id_ed25519
```

之后：

```bash
ssh my-prod
```

### 12.2 文件传输：`scp` / `rsync`

**`scp`（简单场景，macOS → Linux）：**

```bash
# 上传
scp ./package.json user@server:/home/user/
scp -r ./dist user@server:/var/www/my-app

# 下载
scp user@server:/var/log/nginx/error.log ./
```

> 新版 OpenSSH 默认用 SFTP 语义实现 `scp`，适合简单传输。
> 大规模同步推荐 `rsync`。

**`rsync` 部署前端构建产物（推荐）：**

```bash
# 先 dry-run 看将发生什么
rsync -avz --delete --dry-run dist/ user@server:/var/www/my-app/

# 确认无误后去掉 --dry-run
rsync -avz --delete dist/ user@server:/var/www/my-app/
```

---

## 13. 权限管理：macOS 与 Linux 大致相同

macOS 与 Linux 都是 Unix 家族，权限模型几乎一样。

### 13.1 权限基本概念

```bash
ls -l
# drwxr-xr-x  5 user  staff  160 Jan  1 12:00 public
```

- 第 1 位：`d` 目录 / `-` 文件 / `l` 链接
- 2-4 位：所有者（user）
- 5-7 位：所属组（group）
- 8-10 位：其他用户（others）

权限字母：

- `r` 读（4）
- `w` 写（2）
- `x` 执行 / 目录“可进入”（1）

> 对目录来说，`x` 非常关键：
> 没有 `x` 就无法 `cd` 进去。

### 13.2 `chmod` 示例

符号模式：

```bash
chmod u+x deploy.sh          # user 增加执行
chmod go-w config.json       # 组和其他去掉写
chmod a+rX public/           # 目录自动加 x，文件只加 r
```

数字模式（常见）：

```bash
chmod 755 script.sh          # rwxr-xr-x
chmod 644 config.yml         # rw-r--r--
```

批量设置 Web 目录权限（远程 Linux 常用，macOS 也类似）：

```bash
sudo find /var/www/my-app -type d -exec chmod 755 {} \;
sudo find /var/www/my-app -type f -exec chmod 644 {} \;
```

### 13.3 `chown` 修改所有者（主要用于远程 Linux）

```bash
sudo chown -R www-data:www-data /var/www/my-app
```

在 macOS 上则是类似：

```bash
sudo chown -R yourname:staff /path/to/dir
```

### 13.4 “Permission denied” 排错流程（通用）

1. `ls -ld dir` / `ls -l file` 看权限与 owner
2. 用 `ps aux | grep nginx` 看 Nginx 用什么用户跑（远程 Linux）
3. `chown` 调整 owner / group；`chmod` 调整权限
4. 若在 Linux 上仍不行，可能是 SELinux（`sestatus`）或 ACL 限制

---

## 14. 环境变量 / 别名 / Node 版本（macOS M1 特别注意）

### 14.1 环境变量

通用写法：

```bash
export NODE_ENV=production           # 当前 shell 有效
NODE_ENV=production npm run build    # 仅当前命令
```

**注意：**

- macOS / Linux 上上述写法都 OK。
- Windows CMD 不支持第二种。

永久生效：写在 `~/.zprofile`（macOS）或 `~/.bash_profile`（Linux），并 `source` 它。

```bash
echo 'export API_BASE_URL="https://api.example.com"' >> ~/.zprofile
source ~/.zprofile
```

**跨平台 `cross-env`（前端项目常用）：**

```bash
npm install cross-env --save-dev

# package.json
"scripts": {
  "build": "cross-env NODE_ENV=production vite build"
}
```

### 14.2 别名

macOS 和 Linux 写法一样：

```bash
# ~/.zshrc（macOS）或 ~/.bashrc（Linux）
alias ll='ls -alF'
alias gs='git status'
alias gco='git checkout'
alias ..='cd ..'
```

### 14.3 Node 多版本管理（M1 上很重要）

在 macOS M1 上，推荐不要用系统自带 Node，而使用版本管理工具：

- `nvm`：主流，脚本注入
- `fnm`：速度更快
- `Volta`：锁项目工具链

**以 `nvm` 为例：**

```bash
# 按官方 README 安装（一般是 curl 脚本）
# 安装完后在 ~/.zshrc / ~/.zprofile 中添加 nvm 初始化代码

nvm install 18
nvm use 18
nvm ls
```

**Apple Silicon 注意：**

- 保证你安装的 Node 是 arm64 版本，而不是 x86_64 + Rosetta，以避免奇怪性能与路径问题。
- `node -p process.arch` 可以检查当前架构（`arm64` 为原生）。

---

## 15. 现代命令行工具（通过 Homebrew 安装 [macOS]）

本地 macOS M1 推荐先装这些：

```bash
brew install zsh zsh-completions
brew install ripgrep fd jq htop bat eza tldr fzf
```

- `fzf`：历史命令、文件模糊搜索
- `rg`（ripgrep）：项目级代码搜索神器
- `fd`：友好的 `find` 替代
- `bat`：带高亮的 `cat`
- `eza` / `lsd`：好看的 `ls`（`exa` 已停止维护，建议用 `eza`）
- `jq`：处理 JSON
- `tldr`：简化版 `man`（示例速查）

示例：

```bash
jq .scripts package.json
curl https://api.example.com/user/1 | jq .name

tldr tar
tldr rsync
```

---

## 16. 命令速查表：macOS 本机 vs 远程 Linux

**本地 macOS（M1）常用：**

- 导航：`pwd`、`ls -alF`、`cd path`、`cd -`
- 日志：`less app.log`、`tail -F app.log`、`grep -C 5 "ERROR" app.log`
- 搜索：`rg "useEffect" src`、`fd test src`
- 进程：`ps aux | grep '[n]ode'`、`pgrep -fa node`、`htop`
- 端口：`sudo lsof -nP -iTCP:3000 -sTCP:LISTEN`
- 网络：`ipconfig getifaddr en0`、`ping`、`curl -vkI https://host`、`nc -zv host 443`
- 权限：`chmod a+rX public/`、`chmod 755 dir`、`chown -R yourname:staff .`
- 环境：`echo "$PATH"`、`export VAR=value`、`source ~/.zprofile`
- 工具：`brew install ...`、`jq`、`rg`、`fd`、`tldr`

**远程 Linux 服务器常用：**

- 导航 / 文件：同 macOS
- 进程：`ps aux`、`pgrep -fa node`、`htop`
- 端口：`sudo ss -tulpn | grep :3000`、`sudo lsof -nP -iTCP:3000 -sTCP:LISTEN`
- 网络：`ip addr`、`ip route`、`ping`、`curl -vkI https://host`
- DNS：`dig`、`host`
- 日志：`less /var/log/nginx/error.log`、`journalctl -u my-app -f`
- 服务管理：`systemctl status my-app`、`systemctl restart my-app`
- 部署：`scp`、`rsync -avz --delete dist/ user@server:/var/www/my-app/`
- 权限：`chmod 755` / `644`、`chown -R www-data:www-data /var/www/my-app`

---

## 17. 结语：如何在 macOS M1 上练习到“肌肉记忆”

1. **每天用终端做真实工作**

   - 打开项目时，优先用 Terminal / iTerm2，而不是 Finder。
   - 在 macOS 上用 `rg` + `fd` 替代编辑器的模糊搜索。

2. **搭一个远程 Linux 测试机（或云服务器）**

   - 用 SSH 登录和部署一个简单的 Node 或前端静态站。
   - 故意制造端口占用、权限错误、磁盘满等小问题，用文中的命令去排查。

3. **按“问题 → 命令”的模式记忆**
   - 端口被占：macOS → `lsof`，Linux → `ss` + `lsof`
   - 网站打不开：`curl -vkI` + `dig` + `traceroute/mtr`
   - 权限错误：`ls -ld` + `chown` + `chmod a+rX` + 文件/目录 755/644
   - 服务挂掉：`systemctl status` + `journalctl -u`（在 Linux）
