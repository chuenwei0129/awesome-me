---
title: 什么是 shell
toc: content
---

## Shell 和 Terminal 是什么？有什么区别？🤔

在计算机科学中，“shell” 和 “terminal” 是两个相关但不同的概念。下面是它们的定义和区别：

### Shell 是什么？🧐

1. **定义**：
   - Shell 是一个命令行解释器，它提供了一个用户界面，用于访问操作系统的服务。用户可以在 shell 中输入命令，shell 解释并执行这些命令。

2. **类型**：
   - 常见的 shell 包括 Bash (Bourne Again Shell)、Zsh (Z Shell)、Ksh (Korn Shell)、Fish (Friendly Interactive Shell) 等。

3. **功能**：
   - 解释和执行用户输入的命令。
   - 提供编程功能，如变量、循环、条件判断等。
   - 允许用户编写脚本以自动化任务。

4. **示例**：
   - 当你在命令行中输入 `ls -l` 并按下回车键时，shell 解释并执行这个命令，显示当前目录的详细列表。

### Terminal 是什么？😎

1. **定义**：
   - Terminal (终端) 是一个用户界面设备，用于与计算机进行交互。现代终端通常是软件实现的，提供一个窗口，用户可以在其中与 shell 互动。

2. **类型**：
   - 终端可以是物理的 (如早期的电传打字机) 或虚拟的 (如现代的终端仿真器)。常见的终端仿真器包括 GNOME Terminal、Konsole、iTerm2、Windows Terminal 等。

3. **功能**：
   - 提供一个环境，让用户可以与 shell 互动。
   - 支持文本输入和输出，显示 shell 的输出结果。

4. **示例**：
   - 当你打开一个终端窗口 (如 GNOME Terminal)，你会看到一个命令提示符，等待你输入命令。这时，终端正在运行一个 shell 实例。

### Shell 和 Terminal 的区别是什么？🤓

- **Shell 是软件**：Shell 是一个程序，负责解释和执行用户输入的命令。
- **Terminal 是接口**：Terminal 是一个界面，通过它，用户可以与 shell 互动。终端可以是物理设备，也可以是软件环境 (终端仿真器)。

简而言之，shell 是你用来输入命令的程序，而 terminal 是你用来访问 shell 的界面。

## Last login：Mon May 27 12:58:33 on ttys013，这里 ttys013 是什么意思？

在 Unix 和类 Unix 系统 (如 macOS 和 Linux) 中，`ttys013` 表示一个终端设备文件。具体来说：

- `tty` 是 “teletypewriter” 的缩写，最早指的是连接到计算机的物理终端设备。如今，它泛指任何类型的终端接口。
- `s` 表示这是一个伪终端 (pseudo-terminal)，与物理终端不同。
- `013` 是这个特定终端的标识符。每个终端设备文件都有一个唯一的标识符，用于区分不同的终端会话。

因此，`ttys013` 表示这是系统上的第 13 个伪终端设备。每当你打开一个新的终端窗口或者通过 SSH 连接到系统时，系统会分配一个新的伪终端设备文件给该会话。

## Shell 提示符 🔍

Shell 提示符 (shell prompt) 是 shell 提供的一个文本提示符，显示在终端界面上，表示 shell 准备接受用户输入的命令。提示符通常包括一些有用的信息，如当前用户、主机名、当前工作目录等。用户可以在提示符后输入命令，然后按下回车键，shell 就会解释并执行这些命令。

### Shell 提示符的组成

- **用户信息**：提示符可以包含当前登录用户的用户名。例如，`user`。
- **主机名**：提示符可以包含计算机的主机名。例如，`hostname`。
- **当前目录**：提示符可以包含当前工作目录。例如，`/home/user`。
- **提示符符号**：常见的提示符符号包括 `$` (普通用户) 和 `#` (超级用户或 root 用户)。

### 示例

以下是一些常见的 shell 提示符示例：

1. **普通用户的 Bash 提示符**：

   ```sh
   user@hostname:~$
   ```

   - `user` 是当前用户名。
   - `hostname` 是主机名。
   - `~` 表示当前目录是用户的主目录。
   - `$` 表示这是一个普通用户。

2. **root 用户的 Bash 提示符**：

   ```sh
   root@hostname:/root#
   ```

   - `root` 是当前用户名。
   - `hostname` 是主机名。
   - `/root` 表示当前目录是 root 用户的主目录。
   - `#` 表示这是一个超级用户。

3. **简化的提示符**：

   ```sh
   $
   ```

   - 仅包含一个 `$` 符号，表示这是一个普通用户。

4. **Zsh 提示符**：

   ```sh
   user@hostname%
   ```

   - Zsh 的默认提示符可能使用 `%` 作为普通用户的提示符。

### 自定义 Shell 提示符

在大多数 shell 中，提示符是可以自定义的。例如，在 Bash 中，可以通过修改环境变量 `PS1` 来自定义提示符。

```sh
export PS1="\u@\h:\w\$ "
```

- `\u` 表示用户名。
- `\h` 表示主机名。
- `\w` 表示当前工作目录。
- `\$` 表示提示符符号 (普通用户是 `$`，超级用户是 `#`)。

## 常见的 Shell 及其使用方法

### 常见的 Shell 类型

#### 1. Bash (Bourne Again Shell)

- **特点**：
  - Bash 是最常见的 Shell，默认安装在大多数 Linux 发行版和 macOS 上。它兼容 Bourne Shell (sh)，并增加了许多新功能。
- **使用**：

  ```sh
  # 启动 Bash
  bash
  ```

#### 2. Zsh (Z Shell)

- **特点**：
  - Zsh 是一个功能强大的 Shell，具有许多增强功能，如更好的自动补全、更灵活的脚本编写能力和更强的可定制性。
- **使用**：

  ```sh
  # 启动 Zsh
  zsh
  ```

#### 3. Ksh (Korn Shell)

- **特点**：
  - Ksh 结合了 Bourne Shell 和 C Shell 的优点，适用于编写复杂的脚本。
- **使用**：

  ```sh
  # 启动 Korn Shell
  ksh
  ```

#### 4. Fish (Friendly Interactive Shell)

- **特点**：
  - Fish 是一个用户友好的 Shell，具有强大的自动补全和语法高亮功能，适合新手和高级用户。
- **使用**：

  ```sh
  # 启动 Fish
  fish
  ```

#### 5。Csh (C Shell) 和 Tcsh (Tee-See Shell)

- **特点**：
  - Csh 具有类似 C 语言的语法，而 Tcsh 是 Csh 的增强版，增加了许多用户友好的功能。
- **使用**：

  ```sh
  # 启动 Csh
  csh

  # 启动 Tcsh
  tcsh
  ```

### 如何切换 Shell

在大多数 Linux 和 macOS 系统中，可以使用 `chsh` 命令更改默认 Shell。以下是更改默认 Shell 的步骤：

1. **查看已安装的 Shell 列表**：

   ```sh
   cat /etc/shells
   ```

   这将显示系统上可用的 Shell 列表。

2. **更改默认 Shell**：

   ```sh
   chsh -s /bin/zsh
   ```

   上述命令将默认 Shell 更改为 Zsh。你需要输入用户密码以确认更改。

3. **重新登录**：
   更改默认 Shell 后，需要重新登录以使更改生效。

### 临时切换 Shell

如果你只想临时切换到其他 Shell，可以直接在命令行中输入 Shell 的名称。例如：

```sh
# 切换到 Zsh
zsh

# 切换到 Fish
fish
```

要返回到原来的 Shell，可以输入 `exit` 或按 `Ctrl-D`。

### 自定义 Shell 配置

每个 Shell 都有自己的配置文件，用于设置环境变量、别名和其他配置项。例如：

- **Bash**:
  - `~/.bashrc` 或 `~/.bash_profile`

- **Zsh**:
  - `~/.zshrc`

- **Fish**:
  - `~/.config/fish/config.fish`

你可以编辑这些配置文件以自定义 Shell 的行为。例如，在 Bash 中添加别名：

```sh
# 编辑 ~/.bashrc
nano ~/.bashrc

# 添加别名
alias ll='ls -la'

# 保存并退出
source ~/.bashrc
```

### `~/.bashrc` 与 `~/.bash_profile` 的区别

#### `~/.bash_profile`

1. **用途**：
   - `~/.bash_profile` 是为登录 Shell 会话 (login shell session) 设计的配置文件。当你登录到一个系统时，比如通过 SSH 连接，或者在终端中打开一个新的登录 Shell 会话时，Bash 会读取并执行这个文件。

2. **加载时机**：
   - 仅在启动登录 Shell 时加载。

3. **典型内容**：
   - 设置环境变量 (如 `PATH`)。
   - 运行其他配置文件 (如 `~/.bashrc`)。

4. **示例**：

   ```sh
   # ~/.bash_profile

   # 设置 PATH 环境变量
   export PATH="$HOME/bin:$PATH"

   # 运行 ~/.bashrc
   if [ -f ~/.bashrc ]; then
       source ~/.bashrc
   fi
   ```

#### `~/.bashrc`

1. **用途**：
   - `~/.bashrc` 是为交互式非登录 Shell 会话 (interactive non-login shell session) 设计的配置文件。当你打开一个新的终端窗口或标签页时，Bash 会读取并执行这个文件。

2. **加载时机**：
   - 仅在启动交互式非登录 Shell 时加载。

3. **典型内容**：
   - 设置命令别名 (aliases)。
   - 定义 Shell 函数。
   - 设置 Shell 提示符 (prompt)。
   - 配置命令自动补全。

4. **示例**：

   ```sh
   # ~/.bashrc

   # 设置命令别名
   alias ll='ls -la'

   # 设置 Shell 提示符
   export PS1='\u@\h:\w\$ '

   # 启用命令自动补全
   if [ -f /etc/bash_completion ]; then
       . /etc/bash_completion
   fi
   ```

#### 如何选择使用

- **登录 Shell 会话**：当你登录到一个远程系统或启动一个新的登录 Shell 会话时，`~/.bash_profile` 会被读取。为了确保所有配置都被加载，通常在 `~/.bash_profile` 中包含对 `~/.bashrc` 的调用。适合设置环境变量和启动脚本。
- **交互式非登录 Shell 会话**：当你在桌面环境中打开一个新的终端窗口或标签页时，`~/.bashrc` 会被读取。适合设置别名、函数和 Shell 提示符等配置。
