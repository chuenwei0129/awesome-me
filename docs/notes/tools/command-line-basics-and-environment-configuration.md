---
group:
  title: 工具
  order: 0
title: 命令行基础与环境配置
toc: content
---

# 命令行基础与环境配置：从 Shell 解析到跨平台实践

> **适用场景**：
>
> - 本地开发环境：macOS（Apple Silicon / M1）
> - 线上环境：远程 Linux 服务器（常见：Ubuntu / Debian / CentOS 等）
>
> 本文是命令行系列的第一篇，将帮助你理解命令行工作的基本原理，特别是 macOS 与 Linux 在 Shell 环境上的关键差异。

## 为什么 Web 开发者需要了解命令行基础？

对现代前端/全栈/Node.js 开发者来说，命令行不再是可选技能。无论是使用 `git` 进行版本控制、通过 `npm`/`yarn`/`pnpm` 管理依赖，还是在服务器上通过 `ssh` 部署应用，命令行都贯穿整个开发流程。

但很多开发者在使用命令行时遇到各种困惑：

- 为什么在 macOS 上配置的环境变量，在 Linux 服务器上不生效？
- 为什么有些命令在这台机器能用，在另一台机器就不行？
- `.bashrc`、`.bash_profile`、`.zshrc`、`.profile` 这些文件到底有什么区别？

本文将从命令行的基础概念开始，解析这些问题的根源。

## 1. Terminal / Shell / Prompt：理解三层架构

日常说的"命令行"其实包含三个层次：

### 1.1 Terminal（终端）

你看到的"窗口"，如 macOS 自带的 Terminal、iTerm2、VS Code 内置终端。它只负责 UI，不执行命令。

### 1.2 Shell（命令解释器）

解释并执行命令的程序，如 `zsh`、`bash`、`fish` 等。

**平台差异**：

- **macOS（10.15+）**：默认 Shell 是 **zsh**
- **远程 Linux 服务器**：常见默认是 **bash**
  - Ubuntu/Debian 中 `/bin/sh` 通常指向 `dash`（为了脚本执行速度）
  - 但**交互式 shell**仍然是 bash

### 1.3 Prompt（提示符）

Shell 等待输入时显示的那一行内容，例如：

```bash
username@hostname project %
user@host:~/project$
```

Prompt 是 Shell 的一部分，可以显示 Git 分支、Node 版本、当前目录等信息。

## 2. 交互 Shell vs 登录 Shell：理解两个正交概念

**重要**：一个 Shell 可以同时是交互的，也是登录的。这不是二选一关系。

### 2.1 如何判断当前 Shell 状态

```bash
# 1. 当前登录Shell（来自/etc/passwd的配置）
echo $SHELL

# 2. 当前正在运行的Shell
echo $0

# 3. 当前Shell进程的详细信息
ps -p $$
```

示例输出：

```text
/bin/zsh --login
```

这表示：

- 当前运行的是 `/bin/zsh`
- `--login` 参数表明这是一个**登录 Shell**
- 你能在其中输入命令，说明它也是**交互 Shell**

因此，这是一个**交互型登录 Shell（interactive login shell）**。

### 2.2 macOS vs Linux：Shell 启动行为的差异

#### macOS（M1/Apple Silicon）的默认行为

当你打开新的终端窗口（Terminal.app、iTerm2、VS Code 内置终端）时，通常启动的是：

```bash
# 查看进程参数
ps -p $$ -o arg=
# 输出：zsh --login
```

即：**交互 Shell + 登录 Shell**

这是 macOS 的**刻意设计**，目的是：

- 保证 `/etc/profile`、`~/.zprofile` 等登录时加载的文件被读取
- 让 GUI 启动的终端行为更接近真实登录会话

#### Linux 服务器的常见情况

在大多数 Linux 服务器上：

- **SSH 登录**：登录 Shell
- **在已登录会话中新开一个终端**：非登录的交互 Shell

这意味着在 Linux 服务器上，`.profile`或`.bash_profile`**不一定**会被读取，而`.bashrc`几乎一定会被读取。

## 3. Shell 启动文件加载规则（关键！）

理解 Shell 如何加载配置文件是解决环境变量问题的关键。

### 3.1 macOS 上的 zsh 加载顺序

当你在 macOS 上打开一个新终端窗口时，zsh 的典型加载顺序是：

```text
/etc/zprofile
~/.zprofile    # 环境变量/PATH的最佳位置
/etc/zshrc
~/.zshrc       # 别名/函数/Prompt的最佳位置
```

这意味着：

1. `~/.zprofile` 里的环境变量和 PATH 设置会生效
2. `~/.zshrc` 里的别名、函数和 Prompt 配置也会生效

### 3.2 Linux 上的 bash 加载顺序

#### 对于登录 Shell（如 SSH 登录）：

```text
/etc/profile
~/.bash_profile  # 如果存在
~/.profile       # 如果.bash_profile不存在
```

#### 对于非登录交互 Shell：

```text
~/.bashrc
```

**注意**：很多 Linux 发行版在`~/.profile`或`~/.bash_profile`中会主动加载`~/.bashrc`，确保配置的一致性。

## 4. 配置最佳实践（前端工程师视角）

### macOS（zsh）配置方案

```bash
# ~/.zprofile - 长期存在的环境变量/PATH
export PATH="/opt/homebrew/bin:$PATH"
export NODE_ENV=development
export EDITOR="code --wait"

# ~/.zshrc - 交互行为、别名、函数
alias ll="ls -alF"
alias gs="git status"
alias npmrun="npm run"
alias ..="cd .."

# 设置Prompt主题（如使用starship）
eval "$(starship init zsh)"
```

### Linux（bash）配置方案

```bash
# ~/.profile 或 ~/.bash_profile - 环境变量
export PATH="$HOME/.local/bin:$PATH"
export NODE_ENV=production

# ~/.bashrc - 别名和交互设置
alias ll="ls -alF"
alias gs="git status"
alias ..="cd .."

# 颜色设置
PS1='\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
```

### 跨平台配置技巧

如果你同时在 macOS 和 Linux 上工作，可以创建共享配置：

```bash
# 创建 ~/.shared_aliases
alias ll="ls -alF"
alias gs="git status"
alias ..="cd .."
alias npmrun="npm run"

# 在 ~/.zshrc 和 ~/.bashrc 中分别引用
# macOS的 ~/.zshrc:
if [ -f ~/.shared_aliases ]; then
    . ~/.shared_aliases
fi

# Linux的 ~/.bashrc:
if [ -f ~/.shared_aliases ]; then
    . ~/.shared_aliases
fi
```

## 5. 一个必须记住的重要结论

> Terminal / iTerm / VS Code 打开的终端，
> **一定是交互 Shell**。
> **在 macOS 上，它通常还是登录 Shell**。
> **在 Linux 服务器上，它通常不是登录 Shell**。

这是导致环境配置问题的根本原因之一：

- 在 macOS 上，你写在`~/.zprofile`里的配置"看起来什么都能生效"
- 在 Linux 服务器上，你写在`~/.profile`里的配置却"经常不生效"

## 6. 快速诊断 Shell 环境问题

当遇到环境变量不生效等问题时，按此流程排查：

```bash
# 1. 查看当前Shell类型
echo "当前Shell: $0"
echo "登录Shell: $SHELL"

# 2. 检查是否是登录Shell
# 如果输出包含"--login"，则是登录Shell
ps -p $$ -o args=

# 3. 查看PATH等关键环境变量
echo "PATH: $PATH"
echo "当前目录: $PWD"

# 4. 手动加载配置文件测试
# 在macOS上
source ~/.zprofile
source ~/.zshrc

# 在Linux上
source ~/.profile
source ~/.bashrc
```

## 7. 实际案例：在不同平台上配置 PATH

### macOS（M1）上的 PATH 配置

```bash
# ~/.zprofile
export PATH="/opt/homebrew/bin:$PATH"      # Homebrew (Apple Silicon)
export PATH="$HOME/.local/bin:$PATH"       # 用户本地安装的脚本
export PATH="./node_modules/.bin:$PATH"    # 项目本地Node模块
```

### Linux 服务器上的 PATH 配置

```bash
# ~/.profile
export PATH="$HOME/.local/bin:$PATH"       # 用户本地安装的脚本
export PATH="$HOME/bin:$PATH"              # 用户bin目录
export PATH="/usr/local/bin:$PATH"         # 系统级本地安装
```

## 总结

理解 Shell 的基础概念和加载顺序是有效使用命令行的第一步。记住：

1. **macOS 和 Linux 在 Shell 默认行为上有差异**：macOS 终端通常是登录 Shell，Linux 通常不是
2. **配置文件有明确的加载顺序**：`.zprofile`/`.profile`用于环境变量，`.zshrc`/`.bashrc`用于交互设置
3. **根据平台选择正确的配置文件**：避免把环境变量写在错误的文件中

掌握了这些基础概念后，你将能更自信地配置开发环境，并理解为什么某些配置在特定环境下会失效。
