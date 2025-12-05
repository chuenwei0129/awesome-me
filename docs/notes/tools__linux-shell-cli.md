# macOS M1 + Linux 服务器下的命令行实战：面向 Web 开发者的高效排错与运维指南

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
- 构建与工具链：`vite`、`webpack`、`turbo`、`nx`
- 上线与运维：`ssh`、`rsync`、`docker`、`systemd`（远程 Linux）
- 排错：看日志、查端口、看进程、看磁盘 / 网络状态

尤其在 **远程 Linux 服务器（无 GUI）** 上，你几乎只能靠命令行。
而在 **本地 macOS M1** 上，脚本化和终端工具又能极大提高开发效率。

本文会用统一的结构，把 **本地 macOS（M1）** 和 **远程 Linux** 放在一起讲，并指出你在两端执行命令时需要注意的差异。

---

## 1. Terminal / Shell / Prompt：从 macOS 出发看清栈

日常说的“命令行”其实包含三层：

1. **Terminal（终端）**

   - 你看到的“窗口”：如 macOS 自带 Terminal、iTerm2、VS Code 内置终端。
   - 负责 UI，不执行命令本身。

2. **Shell**

   - 解释和执行命令的程序：`zsh`、`bash`、`fish` 等。
   - 本地 macOS 默认 Shell 是 **zsh**（自 macOS 10.15 起）。
   - 远程 Linux 常见默认是 **bash** 或 **dash + bash**。

3. **Prompt（提示符）**
   - 如 `username@hostname project %`（zsh）或 `user@host:~/project$`（bash）。
   - 可以通过配置显示 Git 分支、Node 版本等。

常见 Shell 与配置文件（本地 / 远程大体一致）：

| Shell | 典型提示符 | 常见配置文件                   | 说明                            |
| ----- | ---------- | ------------------------------ | ------------------------------- |
| zsh   | `%`        | `~/.zshrc`, `~/.zprofile`      | macOS 默认，功能强大            |
| bash  | `$`        | `~/.bashrc`, `~/.bash_profile` | 多数 Linux 默认                 |
| fish  | `>`        | `~/.config/fish/config.fish`   | 更友好交互，语法与 POSIX 有差异 |

**切换默认 Shell（本地 macOS 与远程 Linux 通用）：**

```bash
# 查看系统中可用的 Shell
cat /etc/shells

# 切换当前用户默认 Shell 为 zsh
chsh -s /bin/zsh   # 执行后重新登录生效
```

---

## 2. Shell 启动文件：zsh（macOS）与 bash（Linux）

### 2.1 macOS 上的 zsh 启动顺序

在 **macOS（M1）** 上，你默认用的是 zsh，常见行为：

- Terminal / iTerm2 默认启动 **登录 Shell（login shell）**
- VS Code 集成终端通常启动 **非登录 Shell**

zsh 常用文件：

- 登录 Shell：`~/.zprofile`
- 交互 Shell：`~/.zshrc`

推荐实践（本地 macOS）：

- **环境变量、PATH**：写在 `~/.zprofile`
- **别名、提示符、函数**：写在 `~/.zshrc`

```sh
# ~/.zprofile （macOS 推荐）
# 这里适合放 PATH、Homebrew 初始化等
if [ -f ~/.zshrc ]; then
  . ~/.zshrc
fi
```

修改后立即生效：

```bash
source ~/.zprofile
source ~/.zshrc
```

### 2.2 Linux 上的 bash 启动顺序（远程服务器）

在远程 Linux 服务器上常用 **bash**：

- 登录 Shell（SSH 登录时）：读取 `/etc/profile` 和 `~/.bash_profile` 或 `~/.profile`
- 非登录交互 Shell：读取 `~/.bashrc`

推荐实践（远程 Linux）：

- 环境变量、PATH：`~/.bash_profile` 或 `~/.profile`
- 别名、函数、提示符：`~/.bashrc`

```sh
# ~/.bash_profile 或 ~/.profile [Linux]
if [ -f ~/.bashrc ]; then
  . ~/.bashrc
fi
```

---

## 3. Homebrew 与 Apple Silicon（M1）注意事项 [macOS]

在 macOS 上，想用 `rg` / `fd` / `htop` / `jq` 等现代工具，基本都通过 **Homebrew** 安装。

### 3.1 安装 Homebrew（Apple Silicon / M1）

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

## 4. 文件系统与导航（macOS + Linux 通用）

### 4.1 常用命令

- `pwd`：打印当前目录
- `ls`：
  - `ls -l`、`ls -a`、`ls -lh`、`ls -alF`
- `cd`：
  - `cd` / `cd ~`：回到 home
  - `cd ..`：上一级
  - `cd -`：在当前目录和上一个目录之间切换

### 4.2 `./` 的意义

- 作为路径：`cd ./project` ≈ `cd project`
- 作为执行：`./script.sh` 执行“当前目录的脚本”；因为当前目录 `.` 通常不在 `PATH` 中（macOS 与 Linux 都一样）。

### 4.3 常见目录（macOS 和 Linux 差异）

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

## 5. 创建 / 复制 / 移动 / 删除（通用）

### 5.1 基础操作

```bash
touch app.log                      # 创建文件或更新时间戳
mkdir my-project                   # 创建目录
mkdir -p src/components/Button     # 递归创建多级目录

cp source.log dest.log             # 复制文件
cp -r src/ build/                  # 复制目录

mv app.log logs/                   # 移动文件
mv old.js new.js                   # 重命名文件
```

### 5.2 删除与安全策略

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

## 6. 查看文件与日志（排错核心）

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

## 7. 重定向 / `nohup` / 管道（通用）

### 7.1 标准输出 / 错误

```bash
ls -l > files.txt                 # 覆盖写入
echo "restart $(date)" >> log.txt # 追加写入

npm run build > build.log 2> build-errors.log    # 分离 stdout / stderr

nohup node server.js > app.log 2>&1 &            # stdout/stderr 都写 app.log
```

> `2>&1` 要放在 `>` 之后，表示“stderr 重定向到当前 stdout”。

### 7.2 `nohup`：避免 SSH 断开时进程退出

在远程 Linux 上临时启动服务：

```bash
nohup node server.js > app.log 2>&1 &
disown          # 可选，脱离当前 Shell 管理（macOS 也支持）
```

**长期运行建议**：改用 `pm2` 或 `systemd`，见后文。

### 7.3 管道：命令像乐高一样组合

日志统计错误类型 Top 10：

```bash
grep "ERROR" app.log \
  | sort \
  | uniq -c \
  | sort -nr \
  | head -n 10
```

---

## 8. 搜索与查找：`grep` / `rg` / `find` / `fd`

### 8.1 文本搜索：`grep`（通用）与 `rg`（推荐）

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

### 8.2 文件查找：`find`（通用）与 `fd`（现代替代）

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

### 8.3 `find` + `xargs` 批处理

```bash
find . -type f -name "*.log.bak" -print0 | xargs -0 rm
```

`-print0` + `-0` 安全处理带空格的文件名。

---

## 9. 进程与端口：macOS vs Linux 差异点

### 9.1 查看进程

```bash
ps aux                      # 通用
pgrep -fa node              # 通用：按名称查 PID
htop                        # [需要安装，macOS 用 brew install htop]
```

### 9.2 结束进程

```bash
kill <PID>        # SIGTERM，优雅终止
kill -9 <PID>     # SIGKILL，强制，可能丢数据
```

### 9.3 端口占用（最容易 macOS / Linux 弄混的地方）

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
