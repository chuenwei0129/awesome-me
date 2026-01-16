---
group:
  title: 命令行
  order: 0
title: 基础与环境配置
toc: content
---

## 为什么 Web 开发者需要了解命令行基础？

对现代前端/全栈/Node.js 开发者来说，命令行不再是可选技能。无论是：

- 使用 `git` 进行版本控制
- 通过 `npm` / `yarn` / `pnpm` / `bun` 管理依赖
- 使用 `nvm` / `fnm` / `volta` 管理 Node 版本
- 在服务器上通过 `ssh` 部署应用，跑构建脚本
- 在 CI（GitHub Actions / GitLab CI 等）里执行脚本

命令行都贯穿整个开发流程。

但很多开发者在使用命令行时会遇到类似问题：

- 为什么在 macOS 上配置的环境变量，在 Linux 服务器上不生效？
- 为什么有些命令在这台机器能用，在另一台机器就不行？
- `.bashrc`、`.bash_profile`、`.zshrc`、`.profile` 这些文件到底什么时候会被加载？
- 本地 VS Code 终端能找到 `node`，远程服务器的 CI 环境却找不到？

本文将从命令行的基础概念开始，解析这些问题的根源，并给出前端工程视角下的配置最佳实践。

---

## 1. Terminal / Shell / Prompt：理解三层架构

日常说的“命令行”其实包含三个层次：

### 1.1 Terminal（终端）

你看到的“窗口”，例如：

- macOS 自带的 Terminal.app
- iTerm2
- VS Code 内置终端

它只负责 UI 展示和与用户交互（输入/输出），**不执行命令本身**。

### 1.2 Shell（命令解释器）

Shell 是实际解释并执行命令的程序，常见的有：

- `zsh`
- `bash`
- `fish`
- `dash`（很多 Debian 系系统中 `/bin/sh` 指向它）

**常见平台差异**：

- **macOS（10.15+）**：用户默认登录 Shell 是 **zsh**
- **远程 Linux 服务器（典型配置）**：
  - 用户默认登录 Shell 通常是 **bash**（除非运维改过 `/etc/passwd`）
  - Ubuntu/Debian 中 `/bin/sh` 通常指向 **dash**（为了脚本执行速度）
  - 一般来说，交互登录时使用的是 bash（或其他你账号配置的登录 Shell）

> 总结：你在命令行里敲命令、配置别名、设置环境变量，是在跟某个 Shell 打交道，而不是跟“终端窗口”打交道。

### 1.3 Prompt（提示符）

Shell 等待输入时显示的那一行内容，例如：

```bash
username@hostname project %
user@host:~/project$
```

Prompt 是 Shell 的一部分，可以通过配置显示 Git 分支、Node 版本、当前目录等信息（例如使用 starship / oh-my-zsh / powerlevel10k 等）。

---

## 2. 交互 Shell vs 登录 Shell：两个正交概念

**重要概念：**

- “交互”（interactive）和“登录”（login）是两个独立维度
- 一个 Shell 可以：
  - 既是交互的又是登录的
  - 是交互的但不是登录的
  - 是登录的但不交互
  - 既不是交互也不是登录（例如某些脚本执行场景）

### 2.1 如何判断当前 Shell 状态

在当前终端中执行：

```bash
# 1. 用户账户配置的默认登录 Shell（来自 /etc/passwd，通常不会随子 Shell 改变）
echo "SHELL (默认登录 Shell): $SHELL"

# 2. 当前正在运行的 Shell 程序（可能是登录 Shell，也可能是手动开启的子 Shell）
echo "当前 Shell 程序: $0"

# 3. 当前 Shell 进程的完整启动参数（是否带有 --login 等）
ps -p $$ -o args=
```

示例输出（macOS Terminal 打开一个默认 zsh）：

```text
/bin/zsh --login
```

这表示：

- 用户账户配置的默认登录 Shell 是 `/bin/zsh`
- 当前运行的是 `zsh`，并带有 `--login` 参数（或以 `-zsh` 形式表示），说明这是一个**登录 Shell**
- 你能在其中输入命令，说明它也是**交互 Shell**

> 因此，这是一个**交互型登录 Shell（interactive login shell）**。

要进一步区分“是否交互”，可以在 Shell 内查看 `$-`：

```bash
case $- in
  *i*) echo "这是交互 Shell" ;;
  *)   echo "这是非交互 Shell" ;;
esac
```

### 2.2 登录 vs 交互：四种典型组合

用一张表来理解更直观（以 bash 为例）：

| 场景示例                                         | 登录 Shell | 交互 Shell |
| ------------------------------------------------ | ---------- | ---------- |
| SSH 登录 `ssh user@host`                         | ✅         | ✅         |
| macOS 上 Terminal.app 默认启动的 Shell           | ✅         | ✅         |
| 在终端中运行 `bash`                              | ❌         | ✅         |
| 执行脚本 `bash script.sh`                        | ❌         | ❌         |
| CI 中 `run: npm test`（GitHub Actions 默认行为） | 通常 ❌    | ❌         |

**这张表背后的重点：**

- **SSH 登录远程服务器**：默认拿到的是登录 + 交互 Shell
- **macOS GUI 终端（Terminal / iTerm2）**：默认也是登录 + 交互 Shell
- **在终端里再敲一次 `bash` / `zsh`**：一般是交互但非登录 Shell（因为你已经登录过了）
- **脚本、CI、cron** 等场景：通常既不是登录也不是交互 Shell

后面我们会看到：**不同类型的 Shell 会加载不同的配置文件**，这就是“本地看起来一切正常，服务器上就炸了”的根源。

### 2.3 macOS vs Linux：Shell 启动行为的差异

#### macOS（M1/Apple Silicon）的典型行为

当你打开一个新的终端窗口时：

Terminal.app / iTerm2 默认会以**登录 + 交互 Shell**的方式启动

这意味着：

- 登录时加载的文件（如 `/etc/profile`、`~/.zprofile`）会被读取
- 交互配置文件（如 `/etc/zshrc`、`~/.zshrc`）也会被读取

**VS Code 内置终端（macOS）**

- VS Code 内置终端是否以“登录 Shell”的方式启动，取决于 VS Code 配置（如 `terminal.integrated.defaultProfile.osx`、`shellArgs` 等）
- 实际工程中，建议不要假设它一定是登录 Shell，而是用 `ps -p $$ -o args=` 实际查看

#### Linux 服务器的常见情况

在 Linux 服务器上，常见场景是：

- **通过 SSH 登录**：
  - 得到一个**交互 + 登录 Shell**。例如（bash）：
    ```bash
    ps -p $$ -o args=
    # 可能输出：-bash
    # 或：bash --login
    ```
- **在已登录会话中再启动一个 Shell**：
  - 例如你在 SSH 会话中输入 `bash` 或 `zsh`，这通常是**交互但非登录 Shell**
  - 在 tmux/screen 内再开一个 `bash` 也是类似情况

这意味着在 Linux 服务器上：

- **SSH 登录时**：登录 Shell 的配置文件（如 `~/.bash_profile` / `~/.profile`）会读取
- **你手动再开一层 Shell 时**：只会读取交互 Shell 的配置文件（如 `~/.bashrc`）

---

## 3. Shell 启动文件加载规则（关键！）

理解 Shell 如何加载配置文件，是解决环境变量和 PATH 问题的关键。

### 3.1 macOS 上的 zsh 加载顺序（简化版）

zsh 启动文件比较多，完整规则略复杂，这里给出对前端工程师足够实用的简化版：

**交互 + 登录 Shell（macOS Terminal 默认情况）** 常见加载顺序：

```text
/etc/zshenv        # 系统级设置（一般不用动）
~/.zshenv          # 很少使用

/etc/zprofile      # 系统级登录设置
~/.zprofile        # 登录时运行，适合放 PATH / 持久环境变量

/etc/zshrc         # 系统级交互设置
~/.zshrc           # 交互时运行，适合放别名 / 函数 / Prompt 等

/etc/zlogin
~/.zlogin          # 登录结束时执行（较少用）
```

**重点记住两条：**

1. `~/.zprofile`：适合放**环境变量 / PATH 等长期配置**
2. `~/.zshrc`：适合放**别名 / 函数 / Prompt / 插件等交互配置**

**非登录但交互的 zsh（例如在 zsh 里再敲一次 `zsh`）**：

- 一般只读取 `/etc/zshrc` 和 `~/.zshrc`，**不会再读 `~/.zprofile`**
- 这就能解释：有时你在一个终端里再开 zsh，发现 PATH 跟刚打开窗口时不一样

### 3.2 Linux 上的 bash 加载顺序

bash 的启动文件规则同样有“登录”和“交互”的区分。

#### 对于登录 Shell（如 SSH 登录、或 `bash -l`）：

加载顺序为（只会使用找到的第一个用户配置文件）：

```text
/etc/profile
~/.bash_profile   # 如果存在
~/.bash_login     # 如果 ~/.bash_profile 不存在
~/.profile        # 如果上面两个都不存在
```

Linux 发行版常见做法：

- 在 `~/.bash_profile` 或 `~/.profile` 中手动 `source ~/.bashrc`，以保证登录 Shell 也能使用 `~/.bashrc` 里的别名等配置（ bash 默认不读 `~/.bashrc`，需手动在 profile 中 source）

#### 对于非登录的交互 Shell（如在已登录会话中敲 `bash`）：

```text
~/.bashrc
```

所以：

- **环境变量 / PATH 等长期配置**：推荐放在 `~/.bash_profile` 或 `~/.profile` 中
- **别名、PS1、函数等交互配置**：推荐放在 `~/.bashrc` 中

#### 非交互的 bash（脚本 / CI 场景）

- 执行 `bash script.sh` 时，默认**既不是登录 Shell，也不是交互 Shell**
- 此时 bash 不会自动读取 `~/.bashrc`，也不读取 `~/.bash_profile`
- 如果设置了环境变量 `BASH_ENV`，bash 会在执行脚本前 `source $BASH_ENV` 指定的文件

> 这也是为什么：在 CI 里跑脚本，往往“本地 Shell 能找到的命令，在 CI 里找不到”——因为 CI 中的 Shell 没有加载你本地的启动文件。

---

## 4. 配置最佳实践（前端工程师视角）

### 4.1 macOS（zsh）推荐配置方案

**`~/.zprofile` – 长期存在的环境变量 / PATH**

```bash
# ~/.zprofile

# Homebrew（Apple Silicon 通常安装在 /opt/homebrew）
export PATH="/opt/homebrew/bin:$PATH"

# 为常用工具统一设置 PATH（示例）
export PATH="$HOME/.local/bin:$PATH"

# 编辑器配置示例（无全局副作用）
export EDITOR="code --wait"
```

> 建议：避免在这里全局设置 `NODE_ENV` 为 `production` 或 `development`，否则所有 Node 程序（包括 CLI 工具、构建脚本）都会受到影响，容易出现难以排查的行为差异。

**`~/.zshrc` – 交互行为、别名、函数、主题**

```bash
# ~/.zshrc

# 常用别名
alias ll="ls -alF"
alias gs="git status"
alias ..="cd .."

# Node / pnpm / nvm 等工具的初始化（示例）
export PNPM_HOME="$HOME/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

# 引入共享别名（跨 macOS / Linux 共用）
if [ -f "$HOME/.shared_aliases" ]; then
  . "$HOME/.shared_aliases"
fi
```

### 4.2 Linux（bash）推荐配置方案

**`~/.profile` 或 `~/.bash_profile` – 环境变量 / PATH（登录 Shell 用）**

```bash
# ~/.profile 或 ~/.bash_profile

# 为当前用户添加本地 bin 目录
export PATH="$HOME/.local/bin:$PATH"

# Node / pnpm 的 PATH 设定（示例）
export PNPM_HOME="$HOME/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"

# 如果存在 ~/.bashrc，则在登录时加载它
if [ -f "$HOME/.bashrc" ]; then
  . "$HOME/.bashrc"
fi
```

**`~/.bashrc` – 别名和交互设置**

```bash
# ~/.bashrc

# 交互时再加一些 PATH 或仅交互使用的工具（可选）
# export PATH="$HOME/.some-interactive-tools/bin:$PATH"

# 常用别名
alias ll="ls -alF"
alias gs="git status"
alias ..="cd .."

# 共享别名
if [ -f "$HOME/.shared_aliases" ]; then
  . "$HOME/.shared_aliases"
fi
```

### 4.3 跨平台共享配置技巧

如果你同时在 macOS 和 Linux 上工作，可以创建共享配置文件：

```bash
# 创建 ~/.shared_aliases
cat > ~/.shared_aliases <<"EOF"
alias ll="ls -alF"
alias gs="git status"
alias ..="cd .."
alias npmrun="npm run"
alias y="yarn"
alias p="pnpm"
EOF
```

在 `~/.zshrc`（macOS）和 `~/.bashrc`（Linux）中引用：

```bash
# macOS 的 ~/.zshrc:
if [ -f "$HOME/.shared_aliases" ]; then
  . "$HOME/.shared_aliases"
fi

# Linux 的 ~/.bashrc:
if [ -f "$HOME/.shared_aliases" ]; then
  . "$HOME/.shared_aliases"
fi
```

这样你只需要维护一份常用别名，在所有环境中保持一致。

---

## 5. 一个必须记住的重要结论

> GUI 打开的终端（Terminal / iTerm 等）几乎总是**交互 Shell**。
>
> 在 macOS 上，Terminal / iTerm2 默认会启动**交互 + 登录 Shell**（例如 `zsh -l`）。
>
> 在 Linux 上：
>
> - 通过 **SSH 登录** 时：你得到的是**交互 + 登录 Shell**
> - 在已登录会话中手动再执行 `bash` / `zsh`：通常是**交互但非登录 Shell**

这直接导致下面的典型现象：

- 在 macOS 上，你写在 `~/.zprofile` 里的 PATH/环境变量“看起来什么都能生效”，因为 GUI 打开终端就是登录 Shell
- 在 Linux 服务器上，你把 PATH 写在 `~/.profile` 里：
  - 通过 SSH 登录时是生效的
  - 但如果你在 tmux/screen 里再执行一次 `bash`，就可能**只读了 `~/.bashrc`，没读 `~/.profile`**，导致 PATH 不一致

---

## 6. 快速诊断 Shell 环境问题：实用排查流程

当你遇到“环境变量不生效”或“某个命令在这台机器有，在那台机器没有”时，可以按以下步骤排查：

```bash
# 1. 查看默认登录 Shell（用户配置）
echo "SHELL (默认登录 Shell): $SHELL"

# 2. 查看当前正在运行的 Shell 程序
echo "当前 Shell 程序: $0"

# 3. 查看当前 Shell 进程的启动参数（是否带有 --login）
ps -p $$ -o args=

# 4. 判断是否为交互 Shell
case $- in
  *i*) echo "这是交互 Shell" ;;
  *)   echo "这是非交互 Shell" ;;
esac

# 5. 查看 PATH 等关键环境变量
echo "PATH: $PATH"
echo "当前目录: $PWD"

# 6. 手动加载配置文件测试

# 在 macOS 上（zsh）
source ~/.zprofile      # 模拟登录 Shell 读入的配置
source ~/.zshrc         # 模拟交互 Shell 读入的配置

# 在 Linux 上（bash）
source ~/.profile       # 或 ~/.bash_profile（如果你用的是这个）
source ~/.bashrc
```

通过这套流程，你基本能判断：

- 当前 Shell 是什么类型（zsh/bash）
- 是登录 / 非登录，交互 / 非交互
- 它实际读了哪些启动文件
- PATH/环境变量来自哪里

---

## 7. 非交互 Shell 与脚本/CI 场景（工程实践关键）

前端工程经常会在 CI / 自动化脚本中使用 Node、pnpm、构建工具等，这时 Shell 的行为跟你本地终端非常不同。

### 7.1 常见非交互场景

- `bash script.sh`
- `sh deploy.sh`
- cron 定时任务：
  ```bash
  * * * * * /bin/bash /home/user/scripts/backup.sh
  ```
- CI 平台中的一步：
  ```yaml
  steps:
    - run: npm test
  ```

这些场景的共同特点：

- **不是登录 Shell**
- **不是交互 Shell**

以 bash 为例：

- 默认不会自动读取 `~/.bash_profile` / `~/.profile`
- 默认不会自动读取 `~/.bashrc`
- 除非显式 `source`，或者通过 `BASH_ENV` 指定要加载的文件

### 7.2 实战建议：CI / 脚本的配置策略

对于 CI / 脚本中的命令：

- 尽量在脚本/配置文件内显式设置关键 PATH / 环境变量，而不是依赖用户家目录的 dotfiles
- 或者在脚本开头显式 `source` 所需的配置文件（例如专门为 CI 准备一个 `ci-env.sh`）

示例（GitHub Actions）：

```yaml
steps:
  - uses: actions/checkout@v4

  - name: Setup Node
    uses: actions/setup-node@v4
    with:
      node-version: 20

  - name: Set up pnpm
    run: |
      corepack enable
      pnpm -v

  - name: Run tests
    run: pnpm test
```

这里的关键是：**CI 不依赖你的 `~/.zshrc` / `~/.bashrc`，而是用 actions/setup-node 等方式显式安装和配置环境。**

---

## 8. 总结与实践建议

从前端 / 全栈工程视角，理解 Shell 的基础概念和加载顺序，是稳定使用命令行环境的第一步。

请重点记住以下几点：

1. **区分 Terminal / Shell / Prompt：**

   - 终端只是“窗口”，真正执行命令的是 Shell
   - Prompt 是 Shell 提示符，可以高度定制

2. **理解“交互 vs 登录”这两个维度：**

   - SSH 登录、macOS Terminal 默认情况：交互 + 登录 Shell
   - 在 Shell 里再开 `bash` / `zsh`：交互但非登录
   - CI、脚本：通常既不是登录也不是交互

3. **熟悉常用启动文件角色：**

   - macOS（zsh）：
     - `~/.zprofile`：用于 PATH / 环境变量
     - `~/.zshrc`：用于别名 / 函数 / Prompt / 插件
   - Linux（bash）：
     - `~/.bash_profile` / `~/.profile`：用于 PATH / 环境变量（登录 Shell）
     - `~/.bashrc`：用于交互别名 / 函数 / Prompt

4. **避免在全局启动文件中设置有强副作用的变量（如 `NODE_ENV`）：**

   - 更推荐：在项目内用 `.env`、`cross-env` 或在具体命令前设定

5. **为跨平台开发设计合理的配置结构：**

   - 用共享文件（如 `~/.shared_aliases`）复用别名
   - 将 Node / pnpm / nvm 等关键 PATH 配置在两个平台的启动文件中都做好

6. **脚本 / CI 环境不要依赖用户家目录配置：**
   - 显式设置 PATH 或通过官方工具（如 `actions/setup-node`）配置环境
   - 需要时，在脚本开头 `source` 专门为脚本准备的环境文件，而不是个人的 `~/.bashrc`

掌握这些基础概念和实践建议后，你将能更自信地：

- 配置本地 macOS 开发环境和远程 Linux 服务器
- 理解“为什么在某个环境下配置失效了”
- 快速定位 PATH / 环境变量相关故障
- 为前端工程构建更稳定、可复用的命令行工作流
