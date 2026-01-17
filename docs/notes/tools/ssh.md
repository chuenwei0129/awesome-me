---
group:
  title: 命令行
  order: 0
title: SSH 完全指南
toc: content
order: 3
---

# SSH

> SSH 不是一个命令。
> SSH 是一套关于 **身份、信任、权限与安全边界** 的完整工程体系。

这篇文章会**先从你日常真会遇到的问题出发**，
帮你在 M1 Mac 上，把 SSH 工作流跑顺：连服务器、连 GitHub、多账号、隧道、排错。

然后再回到协议和信任模型本身，回答另一个更大的问题：

> “为什么 SSH 要设计成这样？
> 它和 HTTPS 到底区别在哪？”

> 如果你现在对 `ssh` / `ssh-agent` / `ssh-add` 等命令完全陌生，可以先把这篇文章当故事读一遍，或者直接跳到文末的
> **「附录 A：常用 SSH 命令和参数（速查）」** 看一眼，再回来按场景操作。

---

## 0. 你可能正遇到的问题

在 M1 Mac 上做前端 / 全栈，你多半遇到过这些场景：

- 想从 Mac 登录一台 Ubuntu 服务器，结果：
  `Permission denied (publickey)` / `Host key verification failed`
- 想把 Git 仓库改用 SSH 推代码，又遇到：
  `no mutual signature supported`
- 既有个人 GitHub，又有公司 GitHub，不知道怎么区分身份
- 想安全地关闭服务器密码登录，但又怕把自己锁在门外
- 想远程调试一台内网服务器上的前端 / Node 服务，不想暴露公网端口

**第一部分**我们就围绕这些问题，把完整 SSH 工作流跑通；
**第二部分**再系统讲清楚 SSH 的设计、信任模型以及和 HTTPS 的关系。

---

## 一、先搞定实际问题：M1 Mac 上的 SSH 实战工作流

### 1. 准备：在 M1 Mac 上配置密钥 + agent + config

#### 1.1 生成 Ed25519 密钥（附带 passphrase）

在 M1 Mac 上，推荐使用 Ed25519：

```bash
ssh-keygen -t ed25519 -C "m1-mac"
```

按提示设置一个**强一点的 passphrase（密码短语）**（推荐，不要直接回车）。

会生成两份文件：

```text
~/.ssh/id_ed25519      # 私钥（不要泄露）
~/.ssh/id_ed25519.pub  # 公钥（可以公开）
```

在现代 Apple Silicon + 新版 macOS / Ubuntu / GitHub 场景下：

> **Ed25519 是默认、强烈推荐的密钥类型。**
> 极老旧系统若不支持 Ed25519，才考虑退回 RSA。

给私钥加 passphrase 的好处：

- 私钥文件被拷走 ≠ 身份立刻被复制；
- 还需要 passphrase 才能使用，安全性高一个数量级。

---

#### 1.2 用 ssh-agent + macOS 钥匙串，解决“每次输入密码太烦”

私钥加了 passphrase，日常使用就需要 `ssh-agent` 来帮忙。

在现代 macOS 上，`ssh-agent` 由系统托管，推荐在 `~/.ssh/config` 顶部加一段：

```ssh
Host *
    AddKeysToAgent yes
    UseKeychain yes
    IdentityFile ~/.ssh/id_ed25519
```

含义：

- `AddKeysToAgent yes`：第一次用这把 key 时，自动加入 ssh-agent；
- `UseKeychain yes`：把 passphrase 安全存入 macOS 钥匙串；
- `IdentityFile`：默认使用的私钥路径。

然后手动执行一次：

```bash
ssh-add ~/.ssh/id_ed25519
```

输入 passphrase 后，之后系统会从钥匙串自动加载，
日常 `ssh` / `git` 基本不再需要重复输入。

---

## 二、问题 1：如何在 M1 Mac 上安全登录一台 Ubuntu 服务器？

目标：从 Mac → Ubuntu，
在 **不暴露密码登录** 的前提下，
做到“平时方便、出错可救”。

### 1. 把公钥放到 Ubuntu 上

在 Mac 上：

```bash
cat ~/.ssh/id_ed25519.pub
```

复制整行。

在 Ubuntu 上（先用密码 / 控制台登录）：

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys
```

粘贴公钥，一行一个。保存后：

```bash
chmod 600 ~/.ssh/authorized_keys
```

权限错误会导致 SSH 不认这个文件，这是常见坑。

---

### 2. 第一次连接：确认 host key 身份

在 Mac 上：

```bash
ssh user@server_ip
```

第一次会看到：

```text
The authenticity of host 'x.x.x.x' can't be established.
Are you sure you want to continue connecting (yes/no)?
```

这一步非常关键：

- 最好通过云控制台 / 管理员提供的指纹，**核对一下 host key fingerprint**；
- 确认无误后再输入 `yes`。

此时服务器的 Host Key 指纹会被写入：

```bash
~/.ssh/known_hosts
```

之后每次连接：

- 指纹一致 → 正常登录；
- 指纹变了 → `Host key verification failed`，SSH 直接拉响警报。

---

### 3. 不要立刻关密码，先验证 key 登录稳定

**改配置前，先确认：**

- 用 key 连这台机器可以稳定登录（多试几次）；
- 最好开两个终端：一个保持目前会话，另一个尝试新登录，防止误锁死。

---

### 4. 分阶段关闭密码登录（避免把自己锁在门外）

确认 key 登录没问题后，在 Ubuntu 上编辑：

```bash
sudo nano /etc/ssh/sshd_config
```

确保有：

```text
PubkeyAuthentication yes
PasswordAuthentication no
```

建议流程：

1. 保留当前登录会话；
2. 执行：
   ```bash
   sudo systemctl reload ssh
   ```
   先 reload，再中新开一个终端测试。
3. 在新终端执行：
   ```bash
   ssh user@server_ip
   ```
   确认可以正常登录；
4. 确认云服务商提供**控制台终端 / 救援方式**，防止配置错了没法回滚。

到这里，你的 Ubuntu：

- 只接受拥有对应私钥的用户；
- 不再暴露密码登录，极大降低被扫号 / 暴力破解的风险。

---

### 5. 为这条信任关系“起个名字”（SSH config）

在 Mac 的 `~/.ssh/config` 增加：

```ssh
Host ubuntu-prod
    HostName 1.2.3.4
    User ubuntu
    IdentityFile ~/.ssh/id_ed25519
    IdentitiesOnly yes
```

之后登录只需要：

```bash
ssh ubuntu-prod
```

`IdentitiesOnly yes` 确保：

> 只用你指定的这把 key，不会被 ssh-agent 里其它 key 干扰。

你不再是在记一串 IP / 命令，而是在为一条稳定的信任关系起名字。

---

## 三、问题 2：如何在 M1 Mac 上用 SSH 优雅地连 GitHub（含多账号）？

### 1. 单账号：把公钥加到 GitHub

在 Mac 上：

```bash
cat ~/.ssh/id_ed25519.pub
```

GitHub 网页 → `Settings` → `SSH and GPG Keys` → `New SSH key` → 粘贴 → 保存。

---

### 2. 测试 SSH 连接 GitHub

```bash
ssh -T git@github.com
```

第一次会看到 GitHub 的 host key 提示，
核对 fingerprint 后输入 `yes`。

看到类似：

```text
Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```

说明 SSH 身份验证成功。

---

### 3. 确保仓库使用 SSH 地址

SSH 形式的地址应该是：

```bash
git@github.com:username/repo.git
```

不是：

```bash
https://github.com/username/repo.git
```

已有仓库如果是 HTTPS，可以这样切换：

```bash
git remote set-url origin git@github.com:username/repo.git
```

之后所有 `git pull` / `git push` 都走 SSH。

---

### 4. 多账号（个人 / 公司）：通过 Host 做身份隔离

#### 4.1 为两个账号各生成一把 key

```bash
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_personal -C "github-personal"
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_work     -C "github-work"
```

分别把 `.pub` 添加到对应 GitHub 账号的 SSH Keys 中。

---

#### 4.2 在 SSH config 里声明“哪个 Host 用哪把 key”

编辑 `~/.ssh/config`：

```ssh
# 默认：个人 GitHub
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_personal
    IdentitiesOnly yes
    AddKeysToAgent yes
    UseKeychain yes

# 公司：单独的 Host 别名
Host github-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_work
    IdentitiesOnly yes
    AddKeysToAgent yes
    UseKeychain yes
```

`IdentitiesOnly yes` 在多 key 场景非常关键，
避免 OpenSSH 一股脑把 agent 里的所有 key 往对端砸，导致“尝试次数超限”。

---

#### 4.3 克隆时通过 Host 区分身份

- 个人仓库：

  ```bash
  git clone git@github.com:chuenwei0129/awesome-me.git
  # 等价于 git clone ssh://git@github.com/chuenwei0129/awesome-me.git
  ```

- 公司仓库：

  ```bash
  git clone git@github-work:company/repo.git

  ```

`github-work` 不是域名，而是你在 `~/.ssh/config` 里定义的 Host 别名。
你是在说：

> “这条连接，请用我为 `Host github-work` 声明的那一套身份 / 信任配置。”

这是一种**工程级的身份隔离**方案，而不是单纯“账号切换”。

---

## 四、问题 3：如何用 SSH 做远程调试和安全访问内网服务？

SSH 不只用来开一个 shell，它还有一个对前端工程师非常实用的能力：**隧道 / 端口转发**。

### 1. 远程访问 dev server（例如远程 `localhost:3000`）

假设远程 Ubuntu 上跑了前端开发服务器：

- 远端：`localhost:3000`（只在服务器本机可访问）；
- 你想在本地浏览器访问它。

在 Mac 上执行：

```bash
ssh -L 3000:localhost:3000 ubuntu-prod
```

含义：

- 把本地 `localhost:3000` → 映射到远程 `localhost:3000`；
- 通道通过 SSH 加密；
- 不需要在安全组 / 防火墙上开放服务器的 3000 端口。

这是**本地端口转发（Local Port Forwarding）**，
非常适合：

- 远程调试前端页面；
- 访问只在服务器本地开放的 API / GraphQL 服务。

---

### 2. 安全访问远程数据库 / 内部服务

例如，把远程 MySQL 转到本地使用：

```bash
ssh -L 3306:localhost:3306 ubuntu-prod
```

然后你本机的数据库客户端连接 `localhost:3306` 即可，
实际访问的是远程的 MySQL。

同理适用于：

- MongoDB / Redis / PostgreSQL
- 公司内部的 Grafana / Kibana / 私有服务

关键是：

> 数据库 / 内部服务端口可以只在局域网开放，不必暴露在公网，所有访问通过 SSH 通道进来。

---

## 五、问题 4：常见错误怎么系统排查？

### 1. `Permission denied (publickey)`

排查顺序：

1. **公钥是否加对？**
   - 服务器的 `~/.ssh/authorized_keys` 是否有这一行？
   - GitHub 的 SSH Keys 是否有这个 `.pub`？
2. **权限是否正确？**
   - 服务器上：
     ```bash
     chmod 700 ~/.ssh
     chmod 600 ~/.ssh/authorized_keys
     ```
3. **config 是否匹配？**
   - 你使用的 Host 名称是否和 `~/.ssh/config` 一致；
   - 是否指定了正确的 `IdentityFile` 和 `IdentitiesOnly yes`。
4. **key 是否在 agent 里？**
   - `ssh-add -l` 看看 agent 中有哪些 key；
   - 必要时：
     ```bash
     ssh-add ~/.ssh/id_ed25519
     ```
5. **用 `-v` 看详细日志：**
   ```bash
   ssh -v user@server_ip
   ```
   或对 Git：
   ```bash
   GIT_SSH_COMMAND="ssh -v" git pull
   ```
   看客户端到底有没有尝试你期望的那把 key。

---

### 2. `no mutual signature supported`

典型场景：

- 本地是新版本 OpenSSH（如 macOS 自带），默认禁用了老旧 `ssh-rsa`（基于 SHA-1）；
- 远端服务器只配置了 `ssh-rsa` 这一种算法；
- 双方算法集合不相交，就报 “no mutual signature supported”。

**优先解决方向是“更新服务端能力”，而不是“回退客户端安全性”：**

1. 在服务器上新增 Ed25519 / ECDSA host key：
   ```bash
   sudo ssh-keygen -t ed25519 -f /etc/ssh/ssh_host_ed25519_key
   ```
   在 `sshd_config` 里加上：
   ```text
   HostKey /etc/ssh/ssh_host_ed25519_key
   ```
   reload sshd。
2. 升级服务器上的 OpenSSH 版本，避免只能用 `ssh-rsa`。
3. 对 GitHub / GitLab.com 这类现代服务，
   只要你本地用 Ed25519 key 即可，服务端已支持现代算法。

不推荐长期使用：

```bash
ssh -oHostKeyAlgorithms=+ssh-rsa ...
```

这会重新依赖弱算法，只适合作为临时过渡。

---

### 3. `Host key verification failed`

遇到这个错误，请**不要条件反射式地先 `ssh-keygen -R`**。

正确姿势：

1. 先问清楚：
   - 这台机器是否真的重装 / 换机 / 换 IP / 换 host key？
   - 是否可能是自己连错了机器 / 域名？
2. 通过第二信道核对 host key 指纹：
   - 云控制台 / 管理后台；
   - 可信的同事 / 运维给到的指纹。
3. 确认是**合法的变化**后，再执行：
   ```bash
   ssh-keygen -R your.host.name
   ```
4. 下次连接时，SSH 会当成首次连接，让你重新确认新的指纹。

这一条是 SSH 对中间人攻击的最后防线，
**不是一个“万能重置大法”。**

---

## 六、回头看：SSH 其实在解决什么问题？

到这里，M1 Mac 上的主要实战场景基本跑通了。
接下来我们反过来问：

> “SSH 在协议层到底在解决什么问题？
> 它为什么要这样设计？”

### 1. 三个根本问题

在任何不可信网络中，所有远程操作都会遇到三个问题：

1. **我连到的是不是正确的机器？**
2. **对方如何确认“我是我”？**
3. **通信过程会不会被监听或篡改？**

SSH 的设计，就是围绕这三点展开。

---

### 2. SSH 是一个“熟人社会”的协议

SSH 的前提假设：

- 你连接的不是随机服务器；
- 连接对象数量有限（几台、几十台）；
- 信任关系是长期存在的；
- 你愿意为**第一次连接**付出人工确认成本。

所以它做了一个非常大胆的选择：

> **放弃“陌生人自动信任”，把第一次连接交给你亲自确认。**

这和 HTTPS 的“自动信任陌生网站”形成了鲜明对比。

---

### 3. SSH 的三层结构

从协议栈角度，SSH 分三层：

```text
┌─────────────────────────┐
│ SSH Authentication      │ ← 你是谁
├─────────────────────────┤
│ SSH Connection          │ ← 你能干什么
├─────────────────────────┤
│ SSH Transport           │ ← 如何安全通信
└─────────────────────────┘
```

- **Transport**：负责服务器身份（Host Key）、加密通道；
- **Authentication**：负责用户身份（密码 / 公钥）；
- **Connection**：负责复用通道（shell、隧道、SFTP 等）。

前面实战中的：

- Host Key + `known_hosts` → Transport 层；
- 用户 key + passphrase → Authentication 层；
- 端口转发（`-L`）→ Connection 层。

---

### 4. Transport 层：Host Key & known_hosts

每台 SSH 服务器都有一对 **Host Key**，
就像这台机器的“身份证”。

- 第一次连接时，你确认这张身份证（指纹）；
- 之后 `~/.ssh/known_hosts` 会记住它；
- 一旦身份证和记录不符，就报警并中断连接。

这是 SSH 防御中间人攻击（MITM）的根基。

---

### 5. Authentication 层：私钥、公钥与 passphrase

SSH 使用非对称密钥来证明“你是你”：

- 私钥只在你本机；
- 公钥写在服务器的 `authorized_keys` 或 GitHub 的 SSH Keys 中；
- 认证通过“签名 + 验证”完成，私钥永不离机。

passphrase 则是给私钥再加一层密码保护：
**私钥被拷走 ≠ 身份被复制。**

`ssh-agent` + macOS 钥匙串，
则在“安全”和“好用”之间找到一个工程化的折中：
**你只需偶尔输入一次 passphrase，日常由系统托管。**

---

### 6. Connection 层：一个通道，多种用法

在一条 SSH 加密通道上，可以开启多个“子通道”：

- 交互式 shell；
- 多条端口转发（隧道）；
- 文件传输（SFTP）等等。

我们前面用 `ssh -L` 做的隧道，
正是 Connection 层的一个具体能力。

---

## 七、SSH 与 HTTPS：两种完全不同的信任哲学

最后回到那个常被问起的问题：

> “HTTPS 也很安全，为什么 SSH 要这么麻烦？
> 它们到底差在哪？”

### 1. 解决的问题根本不同

| 协议  | 主要解决的问题                                     |
| ----- | -------------------------------------------------- |
| HTTPS | **“我正在访问的，是不是我想访问的那个网站？”**     |
| SSH   | **“我正在连接的，是不是我之前信任过的那台机器？”** |

- HTTPS 面向的是所有网站、所有用户：**陌生人社会**；
- SSH 面向的是你那有限的几台机器：**熟人社会**。

---

### 2. 信任来源：CA 权威 vs 用户本人

- **HTTPS：信任来自“第三方权威”（CA）**

  ```text
  浏览器
    ↓ 信任
  操作系统 / 浏览器内置 CA 列表
    ↓ 信任
  证书颁发机构（CA）
    ↓ 签名
  网站证书
  ```

  用户几乎不参与判断，信任是自动建立的。

- **SSH：信任来自“你自己”**

  ```text
  你
   ↓ 亲自确认
  服务器 Host Key
   ↓ 本地记录
  ~/.ssh/known_hosts
  ```

  必须人工确认第一次连接，
  信任责任完全由你承担。

---

### 3. 第一次连接的态度差异

- HTTPS：第一次连接网站时，所有事自动完成，你几乎无感；
- SSH：第一次连接一定会问你一句：

  ```text
  Are you sure you want to continue connecting (yes/no)?
  ```

  潜台词是：

  > “从现在起，这台机器的身份，由你负责。”

---

### 4. 中间人攻击：集中信任 vs 历史一致性

- HTTPS：通过 CA 签名体系防御 MITM；
- SSH：通过“你记住的 host key 指纹”防御 MITM。

**工程上的差异：**

- HTTPS 把风险集中到少数 CA 机构身上；
- SSH 把风险切成一小块一小块，分摊给每个用户自己。

---

### 5. 工程视角下的小表总结

| 维度       | HTTPS      | SSH        |
| ---------- | ---------- | ---------- |
| 设计对象   | 陌生人社会 | 熟人社会   |
| 信任来源   | CA 权威    | 用户本人   |
| 第一次连接 | 自动       | 必须确认   |
| 身份验证   | 域名证书   | 密钥持有者 |
| 中间人防御 | CA 签名    | 指纹一致性 |
| 失败策略   | 警告/阻断  | 直接中断   |

没有谁更高级，只有是否适配场景。

---

## 八、SSH 的安全边界与团队实践

### 1. SSH 能保证什么？

- 你连的服务器，是你曾经信任过的那台（Host Key + known_hosts）；
- 对方确认“你是你”（密钥认证）；
- 通信过程不可被窃听 / 篡改（加密通道）。

### 2. SSH **不能**保证什么？

- 你登录后不会手滑删库；
- 拥有权限的同事不会犯错；
- 服务器操作系统本身没有被入侵。

> **SSH 做的是“通道安全”，不是“行为安全”。**

---

### 3. 团队 / 公司层面的最佳实践

- 每个人都有自己的一把（或多把）私钥，**禁止共享私钥**；
- 新人入职：添加他的公钥；离职：删除他的公钥；
- 为生产环境使用专门的受限账号 + 单独 key（例如 `deploy`）；
- 定期轮换关键 key，支持新旧 key 共存一段时间。

---

## 结语：你在同时使用两种信任哲学

当你在 M1 Mac 上：

- 用 HTTPS 浏览世界；
- 用 SSH 登录 Ubuntu、拉取 GitHub 代码、打通隧道调试服务；

你其实在同时使用两套完全不同的安全与信任哲学：

- 一个面向全球互联网的“陌生人社会”；
- 一个面向你那几台机器的“熟人社会”。

当你搞清楚：

- 怎么在 M1 Mac 上把 SSH 工作流跑顺；
- 为什么 SSH 要设计成这样；
- 它和 HTTPS 解决的是完全不同的信任问题；

你就不再只是“会用 SSH”，
而是可以把它当成**工程级基础设施**，
为自己的前端工程、DevOps 工作、团队安全打底。

而每一条 SSH 连接，本质上都是一句话：

> **“这条信任链，由我负责。”**

---

## 附录 A：常用 SSH 命令和参数（小白版速查）

这一部分就是专门给“对命令不熟的小白”的，你可以当成小字典：遇到一个命令 / 参数不懂，就来这里翻一眼。

---

### A.1 你以后最常遇到的几个命令

- `ssh`：真正“连过去”的命令（登录服务器 / GitHub）
- `ssh-keygen`：生成 / 管理密钥对（私钥 + 公钥）
- `ssh-add`：把私钥交给“钥匙保管员”（`ssh-agent`）
- `ssh-agent`：在内存里帮你保管已解锁的私钥
- `ssh-keygen -R`：从“已信任列表”（`known_hosts`）里删除一台机器的身份记录
- `scp`：通过 SSH 复制文件（像安全版 `cp`，但可以跨机器）
- `sftp`：通过 SSH 传文件的交互式工具（像 FTP 的安全版）

---

### A.2 `ssh`：真正“去敲门”的那个命令

基本格式：

```bash
ssh [选项] user@host
```

例子：

```bash
ssh ubuntu@1.2.3.4
```

意思是：用 SSH 连接 `1.2.3.4` 这台机器上的 `ubuntu` 用户。

#### 常见参数

1. `-p`：指定端口（默认 22）

   ```bash
   ssh -p 2222 ubuntu@1.2.3.4
   ```

   如果 SSH 服务不在 22 端口，而是在 2222，就要用 `-p 2222` 指定。

2. `-i`：指定私钥文件

   ```bash
   ssh -i ~/.ssh/id_ed25519 ubuntu@1.2.3.4
   ```

   当你有多把私钥时，用这个告诉 SSH：
   “这次连接就用这把私钥”。

3. `-T`：不分配终端（常用于 GitHub）

   ```bash
   ssh -T git@github.com
   ```

   含义：只做身份验证，不要给我一个交互式 shell。
   GitHub 不提供 shell，只需要验证你是谁，然后打印一句提示退出。

4. `-L`：本地端口转发（打隧道）

   ```bash
   ssh -L 3000:localhost:3000 ubuntu@1.2.3.4
   ```

   含义：
   “我本机开一个 `localhost:3000`，把流量通过 SSH 转发到远程机器的 `localhost:3000`。”

   典型用途：远程 dev server / 内网服务调试。

5. `-N`：不执行远程命令，只用来打隧道

   ```bash
   ssh -L 3000:localhost:3000 -N ubuntu@1.2.3.4
   ```

   只建立隧道，不进入远程 bash。适合纯端口转发场景。

6. `-v` / `-vv` / `-vvv`：打印详细调试信息

   ```bash
   ssh -v ubuntu@1.2.3.4
   ```

   连接失败时用它，能看到“SSH 在尝试哪些 key、为什么失败”。

   调试 Git 连接也可以：

   ```bash
   GIT_SSH_COMMAND="ssh -v" git pull
   ```

7. `-o`：临时设置一个配置项

   ```bash
   ssh -oHostKeyAlgorithms=+ssh-rsa user@server
   ```

   等价于在配置文件里写一条对应的配置，只对这一次连接生效。
   新手阶段用到的少，知道有这么个东西即可。

---

### A.3 `ssh-keygen`：生成 / 管理密钥对

最常见用法：

```bash
ssh-keygen -t ed25519 -C "m1-mac"
```

- `-t ed25519`：使用 Ed25519 算法（推荐）；
- `-C "m1-mac"`：给这把 key 加一个备注，方便以后知道是谁的。

它会问你：

1. 保存路径（直接回车，用默认即可：`~/.ssh/id_ed25519`）；
2. passphrase（给私钥加密码，强烈建议设置）。

生成两个文件：

- `~/.ssh/id_ed25519`：私钥（只能你自己保管，不要泄露）；
- `~/.ssh/id_ed25519.pub`：公钥（可以复制给服务器 / GitHub）。

#### `ssh-keygen -R`：删掉一台机器的 Host Key 记录

```bash
ssh-keygen -R your.host.name
```

作用：从 `~/.ssh/known_hosts` 里删掉 `your.host.name` 对应的那条记录。
适用场景：

- 服务器真的重装 / 换机 / 换了 Host Key；
- 你已经确认新的指纹是“合法变化”，需要让 SSH 忘掉旧的。

不确认就乱删，是有风险的（可能帮中间人攻击“洗白”）。

---

### A.4 `ssh-add`：把私钥交给 ssh-agent

常见用法：

```bash
ssh-add ~/.ssh/id_ed25519
```

它会问你一次私钥的密码（passphrase），
然后把解锁后的 key 放到 `ssh-agent` 中。

之后你：

- `ssh user@server`
- `git clone git@github.com:xxx/xxx.git`

就不需要每次再输私钥密码。

常用子命令：

- `ssh-add -l`：列出 agent 中有哪些 key
- `ssh-add -D`：删除 agent 中所有 key（清空）
- `ssh-add -d ~/.ssh/xxx`：从 agent 中移除指定 key

---

### A.5 `ssh-agent`：在后台替你拿钥匙的人

- 在 macOS（尤其 M1）上，系统通常会自动启动一个 `ssh-agent`；
- 你平时通常不需要手动操心它。

很多教程里会让你敲：

```bash
eval "$(ssh-agent -s)"
```

含义是：

> 启动一个 `ssh-agent`，并让当前终端知道“怎么找到它”。

在新版本 macOS + 正常配置下，你往往只要：

1. 在 `~/.ssh/config` 里加上：

   ```ssh
   Host *
       AddKeysToAgent yes
       UseKeychain yes
   ```

2. 执行一次：

   ```bash
   ssh-add ~/.ssh/id_ed25519
   ```

之后基本就可以忘记 `ssh-agent` 的存在了，它一直在后台帮你托管 key。

---

### A.6 `scp` / `sftp`：通过 SSH 传文件

#### `scp`：安全复制文件（像 `cp` 的远程版）

- 上传文件到服务器：

  ```bash
  scp ./local.txt ubuntu@1.2.3.4:/home/ubuntu/
  ```

- 从服务器下载文件到本地：

  ```bash
  scp ubuntu@1.2.3.4:/home/ubuntu/remote.txt ./local.txt
  ```

- 服务器 SSH 端口不是 22 时（注意是大写 `-P`）：

  ```bash
  scp -P 2222 ./local.txt ubuntu@1.2.3.4:/home/ubuntu/
  ```

#### `sftp`：基于 SSH 的 FTP

```bash
sftp ubuntu@1.2.3.4
```

进去后可以：

- `ls` / `cd`：查看远程目录；
- `get 文件`：下载；
- `put 文件`：上传。

底层同样走 SSH 加密通道，比传统 FTP 安全。

---

### A.7 服务器端常见配置项（看懂即可）

在服务器 `sshd_config` 中你常会看到：

- `PubkeyAuthentication yes`：允许使用密钥认证；
- `PasswordAuthentication no`：关闭密码登录；
- `HostKey /etc/ssh/ssh_host_ed25519_key`：指定服务器自己的 Host Key 文件。

这些一般由运维 / 后端修改，新手只要理解大概含义，不要自己随便改即可。

---

## 附录 B：Clash TUN 模式下 GitHub SSH 卡住、`kex_exchange_identification` 实战案例

> 以下为在 macOS + Clash TUN/Fake-IP 环境下排查
> `ssh -T git@github.com` 报 `kex_exchange_identification` 的完整实战过程，可作为调试参考。

### 一、问题现象和环境

在开启 Clash 的代理 + TUN（虚拟网卡）模式后：

- 访问 GitHub 网页（https://github.com）一切正常；
- 但执行 SSH 命令时出现异常或卡住：

```bash
ssh -T git@github.com
```

开启 debug 后（`-vvv`）可以看到如下输出（节选）：

```text
❯ ssh -T -vvv git@github.com
debug1: OpenSSH_10.0p2, LibreSSL 3.3.6
debug3: Running on Darwin 25.2.0 Darwin Kernel Version 25.2.0: Tue Nov 18 21:09:55 PST 2025; root:xnu-12377.61.12~1/RELEASE_ARM64_T8103 arm64
debug3: Started with: ssh -T -vvv git@github.com
debug1: Reading configuration data /etc/ssh/ssh_config
debug1: /etc/ssh/ssh_config line 21: include /etc/ssh/ssh_config.d/* matched no files
debug1: /etc/ssh/ssh_config line 54: Applying options for *
debug3: expanded UserKnownHostsFile '~/.ssh/known_hosts' -> '/Users/chuenwei/.ssh/known_hosts'
debug3: expanded UserKnownHostsFile '~/.ssh/known_hosts2' -> '/Users/chuenwei/.ssh/known_hosts2'
debug1: Authenticator provider $SSH_SK_PROVIDER did not resolve; disabling
debug3: channel_clear_timeouts: clearing
debug1: Connecting to github.com port 22.
debug1: Connection established.
debug1: identity file /Users/chuenwei/.ssh/id_rsa type -1
debug1: identity file /Users/chuenwei/.ssh/id_rsa-cert type -1
debug1: identity file /Users/chuenwei/.ssh/id_ecdsa type -1
debug1: identity file /Users/chuenwei/.ssh/id_ecdsa-cert type -1
debug1: identity file /Users/chuenwei/.ssh/id_ecd25519 type -1
debug1: identity file /Users/chuenwei/.ssh/id_ed25519-cert type -1
debug1: identity file /Users/chuenwei/.ssh/id_ed25519_sk type -1
debug1: identity file /Users/chuenwei/.ssh/id_ed25519_sk-cert type -1
debug1: identity file /Users/chuenwei/.ssh/id_xmss type -1
debug1: identity file /Users/chuenwei/.ssh/id_xmss-cert type -1
debug1: Local version string SSH-2.0-OpenSSH_10.0
kex_exchange_identification: Connection closed by remote host
Connection closed by 198.18.0.63 port 22
```

这段日志里最关键的是这几行：

```text
debug1: Connecting to github.com port 22.
debug1: Connection established.
debug1: Local version string SSH-2.0-OpenSSH_10.0
kex_exchange_identification: Connection closed by remote host
Connection closed by 198.18.0.63 port 22
```

可以看到：

- 到 `github.com:22` 的 TCP 已经建立成功（`Connection established.`）；
- 但在开始密钥交换（kex）之前，对端就主动关闭了连接（`kex_exchange_identification: Connection closed by remote host`）；
- 日志中的 “remote host” 实际是 Clash 提供的 Fake-IP（`198.18.0.63`），而不是真实的 GitHub IP。

---

### 二、先用工具确认“表面上”端口是开的

很多人第一反应是用 `nc` 或 `telnet` 测一下 22 端口：

```bash
nc -vz github.com 22
```

实际输出类似：

```text
❯ nc -vz github.com 22
Warning: Inverse name lookup failed for `198.18.0.63'
github.com [198.18.0.63] 22 (ssh) open
```

这里要注意两点：

- `open` 只说明本机到 Fake-IP（`198.18.0.63:22`）这条链路是开的，也就是到 Clash 的入口是通的；
- 它不能证明“从 Clash 再向外到 GitHub 真正的 22 端口也是通的”。

换句话说：

- `nc` 证明的是「内环」（本机 → Clash）通了；
- 但「外环」（Clash → 上游代理 → GitHub:22）可能被丢弃或不支持；
- 这就对应了前面的 `kex_exchange_identification: Connection closed by remote host`：握手阶段在 Clash/上游就被掐掉了。

---

### 三、Clash TUN + Fake-IP 模式下流量是怎么走的？

在 Clash 开启 TUN + Fake-IP 模式时，大致流程是：

1. 系统的所有 TCP 流量被重定向到一个虚拟网卡（TUN）；
2. Clash 在本机绑定一段保留 IP 段（比如 `198.18.0.0/16`，这是专门用于测试/benchmark 的保留网段）；
3. 系统 DNS 请求由 Clash 接管，返回的不是 GitHub 真 IP，而是一个 Fake-IP，例如：

   ```text
   github.com → 198.18.0.63
   ```

4. 应用程序（SSH/nc/git）认为自己在连接 `github.com:22`，实际上是连到 Clash 的 `198.18.0.63:22`；
5. Clash 再根据规则（直连/代理）把这条 TCP 流量转发出去。

如果：

- 上游代理类型不支持任意 TCP（例如是只支持 HTTP 的代理，不能转发原始 SSH 流量）；
- 或者网络环境把到 GitHub 22 端口的连接“静默丢弃”；
- 或 Clash 规则没有正确处理 `github.com:22`；

就会出现我们看到的现象：TCP 一建立就被上游关掉，SSH 提示 `kex_exchange_identification` 并显示 `198.18.0.63`。

---

### 四、为什么 443 端口可以正常握手？

GitHub 官方除了 `github.com:22` 外，还提供了一个专门给“22 被封/代理不好用”情况准备的 SSH 入口：

```bash
ssh -T -p 443 git@ssh.github.com
```

在同样的 Clash + TUN 环境下，实际输出是：

```text
❯ ssh -T -p 443 git@ssh.github.com
The authenticity of host '[ssh.github.com]:443 ([198.18.0.16]:443)' can't be established.
ED25519 key fingerprint is SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

这说明：

- 通过 Clash/TUN 到 `ssh.github.com:443` 的 TCP 连接是通的；
- 出现的是 SSH 标准的主机指纹确认流程，说明已经进入正常握手阶段；
- 只要输入 `yes`，就可以完成指纹确认，后续仅剩下公钥认证问题（`Permission denied (publickey)` 之类）。

为什么 443 更稳？

- 绝大多数代理节点/网络设备都会优先保证 `443`（HTTPS 服务）可用；
- Clash 对 443 端口的转发链路普遍配置和测试得更完善；
- 很多上游环境确实对 22 更“敏感”。

所以在 Clash + TUN/Fake-IP 场景下，用 `ssh.github.com:443` 来走 SSH，成功率远高于 `github.com:22`。

---

### 五、推荐的工程实践：统一改用 `ssh.github.com:443`

从工程角度，最实用的一套方案是：

- 在用户层面保持习惯不变：照样写 `git@github.com:owner/repo.git`；
- 在 SSH 层做映射：只要是 Host 为 `github.com` 的连接，都实际连到 `ssh.github.com:443`；
- 让这套配置在 Clash + TUN 模式下“免感知地”长期工作。

#### 第一步：确认并记录 443 的主机指纹

先在终端里执行一次（输入 `yes`）：

```bash
ssh -T -p 443 git@ssh.github.com
```

看到：

```text
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

时输入：

```text
yes
```

这一笔会把 GitHub 443 的主机指纹写入 `~/.ssh/known_hosts`，以后就不会再重复确认。

#### 第二步：配置 `~/.ssh/config` 将 `github.com` 映射到 443

在 `~/.ssh/config` 中增加（或修改）这样一段：

```ssh
Host github.com
    HostName ssh.github.com
    User git
    Port 443
    IdentityFile ~/.ssh/id_ed25519_github    # 换成你自己的 key 路径
    IdentitiesOnly yes
```

说明：

- `Host github.com`：匹配你写的 `git@github.com:xxx/yyy.git` 这类地址；
- `HostName ssh.github.com`：真正连接的服务器改成 `ssh.github.com`；
- `Port 443`：端口改为 443；
- `IdentityFile`：指定你用于 GitHub 的 SSH 私钥，例如 `~/.ssh/id_ed25519_github`；
- `IdentitiesOnly yes`：避免 SSH 去尝试其他无关的 key，减少认证失败。

#### 第三步：验证配置是否生效

配置完成后，直接使用“老习惯”的命令：

```bash
ssh -T git@github.com
```

预期结果：

- 如果 key 配置正确，会输出类似：

  ```text
  Hi <your-username>! You've successfully authenticated, but GitHub does not provide shell access.
  ```

- 如果是第一次使用这个 key 或没加到 GitHub，会看到：

  ```text
  git@github.com: Permission denied (publickey).
  ```

此时只要确认公钥已经添加到 GitHub，重新尝试即可。

你也可以通过 debug 确认真正连接的是 `ssh.github.com:443`：

```bash
ssh -T -vvv git@github.com
```

在输出中可以看到类似：

```text
debug1: Connecting to ssh.github.com [198.18.0.16] port 443.
```

说明 `~/.ssh/config` 的映射已经生效。

---

### 六、如果一定要用 22 端口，该怎么排查？（可选）

如果你出于某些原因必须用 `github.com:22`：

1. **先在完全关闭 Clash/TUN 的情况下测试**：

   ```bash
   ssh -T git@github.com
   ```

   - 如果裸连就失败，多半是运营商或大环境对 22 封锁，不建议继续折腾；
   - 如果裸连没问题，说明问题确实在 Clash/TUN 链路上。

2. **在 Clash 中为 `github.com:22` 配一个支持任意 TCP 的节点**：

   - 确保使用的是支持 TCP 直连的代理协议（vmess/trojan/ss 等），而不是纯 HTTP 代理；
   - 在规则里为 `github.com:22` / `ssh.github.com:22` 单独指向这个节点；
   - 具体写法根据你使用的 Clash 内核和配置格式稍有不同。

3. **不建议在国内环境坚持走 22**：

   在已经开启 Clash + TUN 的前提下，长远来看，SSH over 443 是更抗折腾、维护成本更低的方案。
   除非有明确的运维/安全要求，否则可以把真实的 22 当成“备选链路”，而不是主力。
