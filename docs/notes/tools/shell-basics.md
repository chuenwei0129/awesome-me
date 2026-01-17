---
group:
  title: 命令行
  order: 0
title: Shell 基础与环境配置
toc: content
order: 0
---

# 命令行基础与环境配置：从 Shell 解析开始

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

## 1. 核心概念：Terminal、Shell 与 Prompt

在解决问题前，必须区分三个常被混淆的概念：

### 1.1 Terminal（终端）

终端是你看到的**窗口界面**。它负责处理输入输出（键盘输入、屏幕显示），但**不执行命令**。

- **常见终端**：macOS Terminal.app, iTerm2, Windows Terminal, VS Code 内置终端。
- **关键点**：关掉终端窗口并不会停止后台运行的守护进程，终端只是一个“外壳”。

### 1.2 Shell（命令解释器）

Shell 是实际运行在终端内部、负责**解释并执行命令**的程序。

- **常见 Shell**：
  - `zsh`：macOS (10.15+) 默认 Shell，功能强大，插件丰富。
  - `bash`：大多数 Linux 发行版的默认交互 Shell。
  - `sh` / `dash`：Debian/Ubuntu 系系统中 `/bin/sh` 的实际指向，启动速度快，常用于脚本执行。
  - `fish`：以交互体验著称，但语法非 POSIX 标准（不建议用于编写通用脚本）。

### 1.3 Prompt（提示符）

Shell 等待输入时显示的那一行字符（如 `user@host:~$`）。

- 通过配置 Prompt（如使用 Starship, Oh My Zsh），我们可以实时显示 Git 分支、Node 版本、执行耗时等信息。

---

## 2. 关键维度：交互 Shell vs 登录 Shell

这是理解“配置文件为什么不加载”的核心。Shell 的运行模式由两个**正交**的维度决定：

1.  **交互式 (Interactive)**：Shell 是否在等待用户输入？
2.  **登录式 (Login)**：Shell 启动时是否执行了完整的登录流程？

### 2.1 四种典型场景矩阵

| 场景示例            | 类型                | 特征与加载行为                                     |
| :------------------ | :------------------ | :------------------------------------------------- |
| **SSH 远程登录**    | **登录 + 交互**     | 读取最完整的配置文件（profile 类 + rc 类）         |
| **macOS 打开终端**  | **登录 + 交互**     | **注意**：macOS 默认将每个新终端窗口视为登录 Shell |
| **手动输入 `bash`** | **非登录 + 交互**   | 仅读取 rc 类文件（如 `~/.bashrc`），忽略 profile   |
| **执行脚本/CI**     | **非登录 + 非交互** | 默认不读取任何用户配置（除非特殊设置）             |

### 2.2 如何自测当前状态？

在你的终端中执行以下命令，即可“验明正身”：

```bash
# 1. 查看当前 Shell 进程名及参数
# 如果输出包含 --login 或以 - 开头（如 -zsh），则是登录 Shell
ps -p $$ -o args=

# 2. 检查是否为交互式
# 如果输出包含 i，则是交互 Shell
echo $-
```

---

## 3. 配置文件加载规则（由浅入深）

理解加载顺序，才能知道环境变量该写在哪里。

### 3.1 macOS (Zsh) 加载顺序

macOS 的终端默认是 **Login Shell**，其加载顺序如下（简化版）：

1.  `/etc/zshenv` (系统级)
2.  `~/.zshenv` (用户级，任何时候都加载，**不建议在此输出任何内容**)
3.  `~/.zprofile` (登录时加载，**适合放 PATH 和 export**)
4.  `~/.zshrc` (交互时加载，**适合放 alias、prompt、plugins**)

> **⚠️ 常见误区**：
> 很多教程让你把所有东西都塞进 `~/.zshrc`。在 macOS 上这通常没问题（因为它是 Login Shell，也会读 rc 文件）。但在 Linux 或某些特殊场景下，会导致混乱。
> **最佳实践**：遵循“Profile 放环境，RC 放配置”的原则。

### 3.2 Linux (Bash) 加载顺序

Bash 的加载逻辑有一个**短路机制**，这是 Linux 用户最容易踩坑的地方。

**对于登录 Shell (Login Shell)：**
Bash 会**按顺序**查找以下文件，**一旦找到其中一个，就执行它并停止查找后续文件**：

1.  `~/.bash_profile`
2.  `~/.bash_login`
3.  `~/.profile` (推荐使用这个，兼容性最好)

**对于非登录交互 Shell (Non-login Interactive)：**

- 只加载 `~/.bashrc`

> **🐧 Ubuntu/Debian 惯例**：
> 系统默认通常只有 `~/.profile`。为了让登录 Shell 也能拥有颜色和别名，`~/.profile` 内部通常会显式包含一段代码来 source `~/.bashrc`。如果你的环境变量在 SSH 登录时不生效，检查一下你的 `~/.profile` 是否意外覆盖了逻辑。

---

## 4. 前端工程师的最佳配置实践

为了确保你的环境在 macOS、Linux 和 WSL 中表现一致，推荐以下配置结构。

### 4.1 环境变量与 PATH (`~/.zprofile` 或 `~/.profile`)

将这些配置放在 Profile 文件中。注意 `export` 的使用，没有它，子进程（如 Webpack、Node 脚本）将无法读取变量。

```bash
# ⚠️ PATH 优先级技巧：
# 将新路径拼在 $PATH 的左边（前缀），确保优先使用我们安装的版本
# 例如：覆盖系统自带的 git 或 node

# 1. Homebrew (macOS Apple Silicon)
if [ -f "/opt/homebrew/bin/brew" ]; then
  eval "$(/opt/homebrew/bin/brew shellenv)"
fi

# 2. 用户级 bin 目录
export PATH="$HOME/.local/bin:$PATH"

# 3. pnpm 配置
export PNPM_HOME="$HOME/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"

# 4. 编辑器设置 (git commit 时会用到)
export EDITOR="code --wait"
```

### 4.2 别名与交互行为 (`~/.zshrc` 或 `~/.bashrc`)

```bash
# 1. 常用别名
alias ll="ls -alF"
alias gs="git status"
alias gcm="git commit -m"
alias ..="cd .."

# 2. NVM (Node Version Manager) 初始化
# 注意：NVM 初始化较慢，放在 rc 文件中意味着每次开终端都要跑一遍
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

# 3. 跨平台共享别名技巧
# 你可以创建一个 ~/.shared_aliases 文件，然后在 zshrc/bashrc 中 source 它
[ -f "$HOME/.shared_aliases" ] && . "$HOME/.shared_aliases"
```

### 4.3 Windows 用户特别指引

- **WSL (Windows Subsystem for Linux)**：完全遵循上述 Linux Bash/Zsh 规则。
- **Git Bash**：模拟了 Bash 环境，会读取 `~/.bashrc` 和 `~/.bash_profile`。
- **PowerShell**：完全不同的体系，上述配置文件无效（需配置 `$PROFILE`）。

---

## 5. 常见痛点诊断与修复

### 痛点 A：CI/CD 流水线中找不到命令

**现象**：本地运行 `npm run build` 正常，但 GitHub Actions 报错 `command not found`。
**原因**：CI 环境通常是**非登录、非交互 Shell**，它**不会**加载你的 `~/.zshrc` 或 `~/.profile`。
**解决方案**：

1.  **不要依赖 Dotfiles**：在 CI 脚本中显式设置 PATH。
2.  **使用官方 Action**：如 `actions/setup-node`，它会自动配置临时 PATH。
3.  **BASH_ENV**：如果必须加载配置，可以设置环境变量 `BASH_ENV` 指向你的配置文件。

### 痛点 B：脚本中的 Shebang (`#!`)

当你编写一个 CLI 工具（如 `create-my-app`）时，文件头部的 Shebang 决定了它的执行环境。

- **❌ 不推荐**：`#!/bin/bash`
  - 这会使用系统默认 Bash，可能版本过老（macOS 自带 Bash 还是 3.2 版本）。
  - 且不加载用户环境。
- **✅ 推荐**：`#!/usr/bin/env node` 或 `#!/usr/bin/env bash`
  - 这会去 `$PATH` 中查找第一个 `node` 或 `bash`。
  - 这意味着它能利用你通过 `nvm` 或 `brew` 安装的最新版本。

### 痛点 C：VS Code 终端环境不一致

**现象**：VS Code 里 `node -v` 是旧版本，外面终端是新版本。
**原因**：VS Code 启动时可能继承了应用启动时的快照环境，或者插件覆盖了 PATH。
**排查**：

- 检查 VS Code 设置 `terminal.integrated.shellArgs` 是否包含 `--login`。
- 在 VS Code 终端运行 `echo $PATH`，对比系统终端。

---

## 6. 快速诊断脚本

将此脚本保存为 `check_env.sh` 并在出问题的环境中运行，可快速定位问题：

```bash
#!/bin/bash

echo "------ Shell 环境诊断 ------"
echo "1. 默认登录 Shell (/etc/passwd): $SHELL"
echo "2. 当前运行进程: $0"
echo "3. 进程启动参数: $(ps -p $$ -o args=)"

echo -n "4. 交互模式判定: "
case $- in
  *i*) echo "✅ 是交互 Shell" ;;
  *)   echo "❌ 是非交互 Shell" ;;
esac

echo "5. 关键环境变量:"
echo "   NODE_ENV: $NODE_ENV"
echo "   PATH (前200字符): ${PATH:0:200}..."

echo "6. 常见工具位置:"
echo "   Node: $(which node 2>/dev/null || echo 'Not found')"
echo "   Npm:  $(which npm 2>/dev/null || echo 'Not found')"
echo "   Git:  $(which git 2>/dev/null || echo 'Not found')"

echo "--------------------------"
```

## 7. 总结

1.  **区分场景**：记住 GUI 终端通常是**交互+登录**，而 CI/脚本通常是**非交互+非登录**。
2.  **各司其职**：
    - `~/.zprofile` / `~/.profile`：放 **环境变量** (PATH, KEY)。
    - `~/.zshrc` / `~/.bashrc`：放 **交互配置** (Alias, Prompt)。
3.  **PATH 顺序**：新安装的工具路径应放在 `$PATH` 的**左侧**以确保优先级。
4.  **CI 隔离**：不要让 CI 依赖你的个人 Dotfiles，显式定义环境是工程化的基石。
