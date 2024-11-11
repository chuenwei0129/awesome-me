# 只用命令行就能覆盖所有操作而且能提升工作效率的终端使用技巧你喜欢吗<!-- omit in toc -->

- [Linux 笔记](#linux-笔记)
  - [什么是 Shell](#什么是-shell)
  - [命令行学习手册 TLDR](#命令行学习手册-tldr)
  - [ssh](#ssh)
    - [禁用密码登录](#禁用密码登录)
    - [保持长连接](#保持长连接)
      - [1、客户端主动保持连接](#1客户端主动保持连接)
      - [2、服务端主动保持连接](#2服务端主动保持连接)
      - [3、重启 ssh 服务以使配置生效](#3重启-ssh-服务以使配置生效)
  - [关机](#关机)
  - [系统目录结构](#系统目录结构)
  - [用户管理](#用户管理)
    - [添加用户账号](#添加用户账号)
    - [切换用户](#切换用户)
    - [删除帐号](#删除帐号)
    - [修改帐号](#修改帐号)
    - [用户口令的管理](#用户口令的管理)
    - [用户组管理（类似于角色管理）](#用户组管理类似于角色管理)
      - [添加用户组](#添加用户组)
      - [删除用户组](#删除用户组)
      - [修改用户组](#修改用户组)
      - [切换组](#切换组)
  - [权限管理](#权限管理)
    - [看懂文件属性](#看懂文件属性)
    - [修改文件属性](#修改文件属性)
      - [chgrp 更改文件属组](#chgrp-更改文件属组)
      - [chown：更改文件属主，也可以同时更改文件属组](#chown更改文件属主也可以同时更改文件属组)
      - [chmod：更改文件 9 个属性](#chmod更改文件-9-个属性)
  - [拓展：Linux 链接概念](#拓展linux-链接概念)
    - [硬连接](#硬连接)
    - [软连接](#软连接)
  - [Linux 可执行文件添加到 PATH 环境变量的方法](#linux-可执行文件添加到-path-环境变量的方法)
  - [常用命令](#常用命令)
- [yt-dlp](#yt-dlp)
  - [yt-dlp 安装和升级](#yt-dlp-安装和升级)
  - [使用方法](#使用方法)
  - [使用配置文件配置下载参数](#使用配置文件配置下载参数)
  - [常见用法示例](#常见用法示例)
- [BBDown](#bbdown)
  - [注意](#注意)
  - [下载](#下载)
  - [开始使用](#开始使用)
- [aria2](#aria2)
  - [aria2 配置](#aria2-配置)
    - [第一种模式](#第一种模式)
    - [第二种模式](#第二种模式)
  - [aria2 命令行基本使用](#aria2-命令行基本使用)
  - [Mac 中配置 Aria2 RPC Server](#mac-中配置-aria2-rpc-server)
  - [通过 brew 和 brew services 安装管理 aria2](#通过-brew-和-brew-services-安装管理-aria2)
- [vim](#vim)
  - [入门笔记](#入门笔记)
    - [vim 的四种模式](#vim-的四种模式)
    - [普通模式下光标移动](#普通模式下光标移动)
    - [操作符](#操作符)
  - [插件管理器 vim-plug](#插件管理器-vim-plug)
    - [安装 vim-plug](#安装-vim-plug)
    - [安装插件](#安装插件)
    - [更新插件](#更新插件)
    - [删除插件](#删除插件)
    - [升级 vim-plug](#升级-vim-plug)
    - [我的配置文件](#我的配置文件)
  - [vscode vim 插件](#vscode-vim-插件)


## Linux 笔记

> [The Linux Command Line 中文版](https://www.kancloud.cn/thinkphp/linux-command-line/39431)

### 什么是 Shell

Shell 通常指的是命令行界面的解析器，简单来说，**它给用户提供一个操作界面，来访问底层的操作系统内核进行工作。**

它可以让你使用文本和命令执行操作，同时还提供诸如创建脚本之类的高级功能。

**这很重要**：Shell 为用户提供了一种比 GUI （图形用户界面）更为高效的方式来做事。命令行工具可以提供更多不同的参数设置，但用起来不会变得太复杂。

### 命令行学习手册 TLDR

Linux 这个开源操作系统拥有丰富的命令，**任何用户都无法全部记住所有这些命令**。而使事情变得更复杂的是，每个命令都有自己的一组带来丰富的功能的选项。

为了解决这个问题，人们创建了（手册 —— man 是 manual 的缩写）。首先，它是用英文写成的，包含了大量关于不同命令的深入信息。有时候，当你在寻找命令的基本信息时，它就会显得有点庞杂。为了解决这个问题，人们创建了 [TLDR](https://github.com/tldr-pages/tldr) 页。

```perl
tldr --update # 更新本地命令库
tldr -l # 查看本地命令库
tldr tar # 查看 tar 命令的用法
```

> 需要注意的是，这条命令并不是 man 的替代品，而只是一个帮助你摆脱迷失在 man 页面上大量信息里的便利工具。之后你还是可以在 man 页面查阅某个命令可用的不同选项和详细参数。

### ssh

#### 禁用密码登录

为了更大保障服务器的安全性，禁止密码登录。修改云服务器的 sshd 配置文件：`/etc/ssh/sshd_config`。其中 PasswordAuthentication 设置为 no，以此来禁用密码登录。

```perl
# 编辑服务器端的 /etc/ssh/sshd_config
# 禁用密码登录
Host *
  PasswordAuthentication no
```

#### 保持长连接

ssh 登录服务器而较长时间不进行操作，连接会由服务器自动断开，导致控制台卡死。为了保持 ssh 的长连接，有以下两种方法：

##### 1、客户端主动保持连接

编辑 `/etc/ssh/ssh_config` 或者 `~/.ssh/config`，追加以下内容

```perl
TCPKeepAlive=yes
# Client 每隔 180 秒发送一次 KeepAlive 请求给 Server，然后 Server 响应从而保持连接
ServerAliveInterval 180
# Client 发出请求后，服务器端未响应次数达到 3，就自动断开连接。正常情况下，Server 基本会响应。
ServerAliveCountMax 3
```

##### 2、服务端主动保持连接

编辑 `/etc/ssh/sshd_config`，追加以下内容

```perl
# Server每隔 180 秒发送一次心跳数据包给Client，然后Client响应从而保持连接
ClientAliveInterval 180
# Server发出请求后，客户端未响应次数达到10，就自动断开连接。正常情况下，Client基本会响应
ClientAliveCountMax 10
```

##### 3、重启 ssh 服务以使配置生效

```perl
systemctl restart sshd
```

### 关机

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220404-ryo.png)

> 不管是重启系统还是关闭系统，首先要运行 `sync` 命令，把内存中的数据写到磁盘中。

### 系统目录结构

- **/bin**：bin 是 Binary 的缩写, 这个目录存放着最经常使用的命令。

- **/boot：** 这里存放的是启动 Linux 时使用的一些核心文件，包括一些连接文件以及镜像文件。

- **/dev ：** dev 是 Device(设备)的缩写, 存放的是 Linux 的外部设备，在 Linux 中访问设备的方式和访问文件的方式是相同的。

- **/etc：** 这个目录用来存放所有的系统管理所需要的配置文件和子目录。

- **/home**：用户的主目录，在 Linux 中，每个用户都有一个自己的目录，一般该目录名是以用户的账号命名的。

- **/lib**：这个目录里存放着系统最基本的动态连接共享库，其作用类似于 Windows 里的 DLL 文件。

- **/lost+found**：这个目录一般情况下是空的，当系统非法关机后，这里就存放了一些文件。

- **/media**：Linux 系统会自动识别一些设备，例如 U 盘、光驱等等，当识别后，Linux 会把识别的设备挂载到这个目录下。

- **/mnt**：系统提供该目录是为了让用户临时挂载别的文件系统的，我们可以将光驱挂载在 /mnt/ 上，然后进入该目录就可以查看光驱里的内容了。

- **/opt**：这是给主机额外安装软件所摆放的目录。比如你安装一个 ORACLE 数据库则就可以放到这个目录下。默认是空的。

- **/proc**：这个目录是一个虚拟的目录，它是系统内存的映射，我们可以通过直接访问这个目录来获取系统信息。

- **/root**：该目录为系统管理员，也称作超级权限者的用户主目录。

- **/sbin**：s 就是 Super User 的意思，这里存放的是系统管理员使用的系统管理程序。

- **/srv**：该目录存放一些服务启动之后需要提取的数据。

- **/sys**：这是 linux2.6 内核的一个很大的变化。该目录下安装了 2.6 内核中新出现的一个文件系统 sysfs 。

- **/tmp**：这个目录是用来存放一些临时文件的。

- **/usr**：这是一个非常重要的目录，用户的很多应用程序和文件都放在这个目录下，类似于 windows 下的 program files 目录。

- **/usr/bin：** 系统用户使用的应用程序。

- **/usr/sbin：** 超级用户使用的比较高级的管理程序和系统守护程序。

- **/usr/src：** 内核源代码默认的放置目录。

- **/var**：这个目录中存放着在不断扩充着的东西，我们习惯将那些经常被修改的目录放在这个目录下。包括各种日志文件。

- **/run**：是一个临时文件系统，存储系统启动以来的信息。当系统重启时，这个目录下的文件应该被删掉或清除。

> [Linux 出于何种考虑推出 usrmerge，将根目录下的一些文件夹合并到 /usr 下？](https://www.zhihu.com/question/522859484)

### 用户管理

Linux 系统是一个多用户多任务的分时操作系统，任何一个要使用系统资源的用户，都必须首先向系统管理员申请一个账号，然后以这个账号的身份进入系统。

> 用户的账号一方面可以帮助系统管理员对使用系统的用户进行跟踪，并控制他们对系统资源的访问；另一方面也可以帮助用户组织文件，并为用户提供安全性保护。

```perl
id # 显示用户身份号
chmod # 更改文件模式
umask # 设置默认的文件权限
su # 以另一个用户的身份来运行 shell
sudo # 以另一个用户的身份来执行命令
chown # 更改文件所有者
chgrp # 更改文件组所有权
passwd # 更改用户密码
```

#### 添加用户账号

添加用户账号就是在系统中创建一个新账号，然后**为新账号分配用户号、用户组、主目录和登录 Shell 等资源**。

```perl
useradd [选项] <用户名>
```

选项 :

- `-c` **comment** 指定一段注释性描述。
- `-d` **目录** 指定用户主目录，如果此目录不存在，则同时使用 `-m` 选项，可以创建主目录。不指定则会自动创建用户同名主目录
- `-g` **用户组** 指定用户所属的用户组。不指定会默认创建同用户名用户组
- `-G` **用户组**，用户组指定用户所属的附加组。
- `-m`　**使用者目录** 如不存在则自动建立。
- `-s` **Shell 文件** 指定用户的登录 Shell。
- `-u` **用户号** 指定用户的用户号，如果同时有 `-o` 选项，则可以重复使用其他用户的标识号。

增加用户账号就是在 `/etc/passwd`（用户信息） 文件中为新用户增加一条记录，同时更新其他系统文件如 `/etc/shadow`（加密）, `/etc/group`（用户组信息） 等。

```perl
useradd -s /bin/zsh -d /home/gakki –g dev gakki
```

#### 切换用户

1. 切换用户的命令为：`su username`

2. 从普通用户切换到 root 用户，还可以使用命令：`sudo su`

3. 在终端输 `exit` 或 `logout` 或使用快捷方式 `ctrl+d`，可以退回到原来用户，其实 `ctrl+d` 也是执行的 `exit` 命令

4. 在切换用户时，**如果想在切换用户之后使用新用户的工作环境**，可以在 `su` 和 `username` 之间加 `-`，例如：`su - root`

#### 删除帐号

删除用户账号就是要将 `/etc/passwd`，`/etc/shadow`， `/etc/group`，等系统文件中的该用户记录删除。

```perl
userdel [选项] <用户名>
```

常用的选项是 `-r`，它的作用是把用户的主目录一起删除。

#### 修改帐号

修改用户账号就是根据实际情况更改用户的有关属性，如用户号、主目录、用户组、登录 Shell 等。

```perl
usermod [选项] <用户名>
```

常用的选项包括 `-c`, `-d`, `-m`, `-g`, `-G`, `-s`, `-u` 以及 `-o` 等，这些选项的意义与 `useradd` 命令中的选项一样，可以为用户指定新的资源值。

```perl
# 将用户 gakki 的登录 Shell 修改为 zsh，主目录改为 /home/gakki，用户组改为 developer
usermod -s /bin/zsh -d /home/gakki –g developer gakki
```

#### 用户口令的管理

超级用户可以为自己和其他用户指定口令，普通用户只能用它修改自己的口令。

```perl
password [选项] <用户名>
```

可使用的选项：

- `-l` 锁定口令，即禁用账号。
- `-u` 口令解锁。
- `-d` 使账号无口令。
- `-f` 强迫用户下次登录时修改口令。

如果默认用户名，则修改当前用户的口令。

#### 用户组管理（类似于角色管理）

用户组的管理涉及用户组的添加、删除和修改。组的增加、删除和修改实际上就是对 `/etc/group` 文件的更新。

##### 添加用户组

```perl
groupadd [选项] <用户组>
```

可以使用的选项有：

- `-g` GID 指定新用户组的组标识号（GID）。
- `-o` 一般与 `-g` 选项同时使用，表示新用户组的 GID 可以与系统已有用户组的 GID 相同。

```perl
groupadd group1
```

此命令向系统中增加了一个新组 group1，**新组的组标识号是在当前已有的最大组标识号的基础上加 1**。

```perl
groupadd -g 101 group2
```

此命令向系统中增加了一个新组 group2，同时指定新组的组标识号是 101。

##### 删除用户组

```perl
groupdel [用户组]
```

##### 修改用户组

```perl
groupmod [选项] <用户组>
```

常用的选项有：

- `-g` GID 为用户组指定新的组标识号。
- `-o` 与 `-g` 选项同时使用，用户组的新 GID 可以与系统已有用户组的 GID 相同。
- `-n` 新用户组 将用户组的名字改为新名字

```perl
# 将组 group2 的标识号改为 10000，组名修改为 group3。
groupmod –g 10000 -n group3 group2
```

##### 切换组

如果一个用户同时属于多个用户组，那么用户可以在用户组之间切换，以便具有其他用户组的权限。

用户可以在登录后，使用命令 newgrp 切换到其他用户组，这个命令的参数就是目的用户组。例如：

```perl
newgrp root
```

这条命令将当前用户切换到 root 用户组，**前提条件是 root 用户组确实是该用户的主组或附加组**。

### 权限管理

Linux 系统是一种典型的多用户系统，不同的用户处于不同的地位，拥有不同的权限。为了保护系统的安全性，Linux 系统对不同的用户访问同一文件（包括目录文件）的权限做了不同的规定。

在 Linux 中我们可以使用 `la` 或者 `ls –al` 命令来显示一个文件的属性以及文件所属的用户和组，如：

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220404-s07.png)

#### 看懂文件属性

在 Linux 中第一个字符代表这个文件是目录、文件或链接文件等等：

- 当为 `d` 则是目录
- 当为 `-` 则是文件
- 若是 `l` 则表示为链接文档
- `b` 则表示为装置文件里面的可供储存的接口设备（可随机存取装置）
- 若是 `c` 则表示为装置文件里面的串行端口设备，例如键盘、鼠标（一次性读取装置）

接下来的字符中，以三个为一组，且均为 `rwx` 的三个参数的组合。

其中，`r` 代表可读（read）、`w` 代表可写（write）、`x`代表可执行（execute），如果没有权限，就会出现减号 `-`。

每个文件的属性由左边第一部分的 10 个字符来确定：

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/640.jpg)

从左至右用 `0-9` 这些数字来表示。

> 第 `0` 位确定文件类型，第 `1-3` 位确定属主（该文件的所有者）拥有该文件的权限。第 `4-6` 位确定属组（所有者的同组用户）拥有该文件的权限，第 `7-9` 位确定其他用户拥有该文件的权限。

**对于文件来说，它都有一个特定的所有者**，也就是对该文件具有所有权的用户。

同时，在 Linux 系统中，用户是按组分类的，**一个用户属于一个或多个组**。

文件所有者以外的用户又可以分为文件所有者的同组用户和其他用户。

因此，Linux 系统按文件所有者、文件所有者同组用户和其他用户来规定了不同的文件访问权限。

#### 修改文件属性

##### chgrp 更改文件属组

```perl
chgrp [-R] 属组名 文件名
```

`-R`：递归更改文件属组，就是在更改某个目录文件的属组时，如果加上 `-R` 的参数，那么**该目录下的所有文件的属组都会更改**。

##### chown：更改文件属主，也可以同时更改文件属组

```perl
# chown [–R] 属主名 文件名
chown user1 file1
# chown [-R] 属主名：属组名 文件名
chown user1:group1 file1
```

##### chmod：更改文件 9 个属性

```perl
chmod ugo+rwx dir1
```

Linux 文件属性有两种设置方法，一种是数字，一种是符号。

Linux 文件的基本权限就有九个，分别是 `owner/group/others` 三种身份各有自己的 `read/write/execute` 权限。

这九个权限是三个三个一组的！其中，我们可以使用数字来代表各个权限，各权限的分数对照表如下：

```perl
# r:4      w:2      x:1
chmod 770 filename
```

### 拓展：Linux 链接概念

Linux 链接分两种，一种被称为硬链接（Hard Link），另一种被称为符号链接（Symbolic Link）。

#### 硬连接

硬连接指通过索引节点来进行连接。在 Linux 的文件系统中，保存在磁盘分区中的文件不管是什么类型都给它分配一个编号，称为索引节点号(Inode Index)。在 Linux 中，多个文件名指向同一索引节点是存在的。比如：A 是 B 的硬链接（A 和 B 都是文件名），则 A 的目录项中的 inode 节点号与 B 的目录项中的 inode 节点号相同，即一个 inode 节点对应两个不同的文件名，两个文件名指向同一个文件，A 和 B 对文件系统来说是完全平等的。删除其中任何一个都不会影响另外一个的访问。

硬连接的作用是允许一个文件拥有多个有效路径名，这样用户就可以建立硬连接到重要文件，以防止“误删”的功能。其原因如上所述，因为对应该目录的索引节点有一个以上的连接。只删除一个连接并不影响索引节点本身和其它的连接，只有当最后一个连接被删除后，文件的数据块及目录的连接才会被释放。也就是说，文件真正删除的条件是与之相关的所有硬连接文件均被删除。

#### 软连接

另外一种连接称之为符号连接（Symbolic Link），也叫软连接。软链接文件有类似于 Windows 的快捷方式。它实际上是一个特殊的文件。在符号连接中，文件实际上是一个文本文件，其中包含的有另一文件的位置信息。比如：A 是 B 的软链接（A 和 B 都是文件名），A 的目录项中的 inode 节点号与 B 的目录项中的 inode 节点号不相同，A 和 B 指向的是两个不同的 inode，继而指向两块不同的数据块。但是 A 的数据块中存放的只是 B 的路径名（可以根据这个找到 B 的目录项）。A 和 B 之间是“主从”关系，如果 B 被删除了，A 仍然存在（因为两个是不同的文件），但指向的是一个无效的链接。

```perl
ln f1 f2     # 创建 f1 的一个硬连接文件 f2
ln -s f1 f3   # 创建 f1 的一个符号连接文件 f3
```

### Linux 可执行文件添加到 PATH 环境变量的方法

举例说，命令 `composr` 在 `/usr/local/bin`

但执行的时候提示：

```perl
composr: command not found
```

这个时候，通过 `echo $PATH`，发现 `composer` 并未在 PATH 环境变量中有设置，这个时候就需要把 `composer` 所在路径添加到PATH中

所以需要修改PATH环境变量，具体如下：

```perl
vim ~/.zshrc
```

在最后一行添上：

```perl
export PATH=/usr/local/bin:$PATH
```

### 常用命令

|              常用命令               |                                                    作用                                                    |
| :---------------------------------: | :--------------------------------------------------------------------------------------------------------: |
|              uname -a               |                                            查看内核/OS/CPU信息                                             |
|                arch                 |                                               查看处理器架构                                               |
|              hostname               |                                                查看计算机名                                                |
|               whoami                |                                               显示当前用户名                                               |
|               uptime                |                                       查看系统运行时间、用户数、负载                                       |
|                 env                 |                                             查看系统的环境变量                                             |
|                 top                 |                                        动态显示 cpu/内存/进程等情况                                        |
|               free -h               |                                          查看内存用量和交换区用量                                          |
|               df -hl                |                                              查看磁盘剩余空间                                              |
|             du -sh /dir             |                                              查看指定目录大小                                              |
|                  w                  |                                                查看活动用户                                                |
|              id gakki               |                                              查看指定用户信息                                              |
|                last                 |                                              查看用户登录日志                                              |
|             crontab -l              |                                           查看当前用户的计划任务                                           |
|              ifconfig               |                                              查看网络接口属性                                              |
|            netstat -lutp            |                                          查看 TCP/UDP 的状态信息                                           |
|               ps -ef                |                                                查看所有进程                                                |
|            kill -s name             |                                            kill 指定名称的进程                                             |
|             kill -s pid             |                                            kill 指定 pid 的进程                                            |
|                 top                 |                                              实时显示进程状态                                              |
|           mkdir dir1 dir2           |                                              同时创建两个目录                                              |
|       mkdir -p /tmp/dir1/dir2       |                                                 创建目录树                                                 |
|          rm -rf dir1 dir2           |                                          同时删除两个目录及其内容                                          |
|          mv dir1 tmp/dir2           |                                              重命名/移动目录                                               |
|          cp -a /tmp/dir1 .          |                                           复制一个目录至当前目录                                           |
|          ln -s file1 link1          |                                         创建指向文件/目录的软链接                                          |
|            ln file1 lnk1            |                                        创建指向文件/目录的物理链接                                         |
|        find /dir -name *.bin        |                                    在目录 /dir 中搜带有 .bin 后缀的文件                                    |
|              which git              |                                          显示会执行哪个可执行程序                                          |
|        grep [0-9] hello.txt         |                    grep 的全写是 global regular expression print （全局正则表达式打印）                    |
|   tar -cf archive.tar file1 file2   |                           将 file1 和 file2 打包成一个名为 archive.tar 的档案包                            |
|   tar -xf archive.tar -C 目录路径   |                                             提取文件到指定目录                                             |
| tar -czf archive.tar.gz file1 file2 |                          这就像是先创建了一个 tar 档案包，再运行 gzip 来压缩它。                           |
|                 tar                 | c 参数是 create（创建） 的简写。f 参数则用来将合成的档案包写入一个文件。参数 x 是 extract（提取） 的简写。 |
|           lsof -i :27017            |                                             查看指定端口的进程                                             |
|             kill -9 859             |                                              根据 PID 杀进程                                               |

## yt-dlp

### [yt-dlp](https://github.com/yt-dlp/yt-dlp) 安装和升级

```perl
brew install yt-dlp
brew upgrade yt-dlp
```

### 使用方法

```perl
yt-dlp -F [视频链接]
# -F 查看视频格式构成
```

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220407-wx8.png)

从结果中可知最佳画质视频 ID 为 mp4 格式的 137 和 webm 格式的 248（纯视频无音轨），最佳音轨 ID 为 m4a 格式的 140 和 webm 格式的 251（纯音轨无视频）。如果你认为 720p 已经满足需求，则只下载 ID 22 也可（已经包含视频和音轨）。这里我们先选择 mp4 的视频和 m4a 的音轨进行合并。

```perl
# yt-dlp -f [下载ID] [代理配置] [视频链接] [合并语句] [外部下载器选择] [下载器参数]
yt-dlp -f 137+140 --proxy socks5://127.0.0.1:7890 https://www.youtube.com/watch?v=rrQJvPaPbFM --merge-output-format mp4 --external-downloader aria2c --downloader-args aria2c:"-x 16"
# -f [id] 选择下载内容，注意和 -F 区分。例子中使用 137+140，如果你只下载 720p 则填写 22 就好，后面的合并语句可不填写。
# --proxy 代理配置 填写你的系统代理设置，如果使用全局模式可不使用此语句
# --merge-output-format [合并输出格式] 例子中选择 mp4 作为输出格式
# --external-downloader [下载器名称] 下载器选择 例子中选择 aria2c
# --downloader-args [下载器名称]:"[下载器配置]" 下载器配置语句
```

### [使用配置文件配置下载参数](https://github.com/yt-dlp/yt-dlp#configuration)

> 注意 `yt-dlp.conf` 这个配置文件中，不能输入中文，包括中文注释。

```conf
# The path and name of the download file saved
--output "~/youtube/%(uploader)s/%(title)s-%(resolution)s.%(ext)s"

# Convert the downloaded video to MP4 format
--merge-output-format mp4

# Download only English and Chinese subtitles
--sub-langs "en.*,zh-Hans"

# Embed subtitles, thumbnails, video descriptions and other information into video files
--embed-subs
--embed-thumbnail
--embed-metadata
--convert-subs srt

# shell
# --exec 'sh xxx.sh'
```

这样 `yt-dlp.conf` 配置文件就算写好，这样每次执行下载的时候，它都会选择最高清晰度下载。

### 常见用法示例

```perl
# 打印出可用的格式和信息
yt-dlp --list-formats  https://www.youtube.com/watch?v=8wXuSnFmbWU
# 查询这个视频支持的字幕
yt-dlp --list-subs https://www.youtube.com/watch?v=8wXuSnFmbWU
# 打印视频和音频流的 JSON 信息
yt-dlp --dump-json https://www.youtube.com/watch?v=8wXuSnFmbWU
# 将最佳音频转换为 mp3 文件：
yt-dlp -f 'ba' -x --audio-format mp3 https://www.youtube.com/watch?v=8wXuSnFmbWU -o '%(id)s.mp3'
# 下载分辨率等于或大于 720p 的最佳格式（视频 + 音频）。并将此文件另存为 video_id.extension (1La4QzGeaaQ.mp4)：
yt-dlp -f "best[height>=720]" https://www.youtube.com/watch?v=8wXuSnFmbWU -o '%(id)s.%(ext)s'
# 下载播放列表的所有视频
# 其实这个功能，api 直接就支持，注意播放列表形如：https://www.youtube.com/watch?v=f8yA1jGhpfk&list=PL8mPWv3h4qJeg6iH5yt92jB5jT6kfLg2r
yt-dlp https://www.youtube.com/watch?v=f8yA1jGhpfk&list=PL8mPWv3h4qJeg6iH5yt92jB5jT6kfLg2r
# 下载包含 1080p 视频和最佳音频的 YouTube 播放列表。将视频保存到 channel\_id/playlist\_id 目录中，并将视频添加到存档文本文件中：
yt-dlp -f 'bv*[height=1080]+ba' --download-archive videos.txt  https://www.youtube.com/playlist?list=PLQ_PIlf6OzqI34ZPxXk4HGnqADpiF9rcV -o '%(channel_id)s/%(playlist_id)s/%(id)s.%(ext)s'
```

## BBDown

> 一款命令行式哔哩哔哩下载器，支持 [m1 Mac](https://github.com/nilaoda/BBDown/issues/221)

### 注意

本软件混流时需要外部程序：

- 普通视频：[ffmpeg](https://www.gyan.dev/ffmpeg/builds/) ，或 [mp4box](https://gpac.wp.imt.fr/downloads/)
- 杜比视界：ffmpeg5.0 以上或新版 mp4box

### 下载

Release 版本：[https://github.com/nilaoda/BBDown/releases](https://github.com/nilaoda/BBDown/releases)

自动构建的测试版本：[https://github.com/nilaoda/BBDown/actions](https://github.com/nilaoda/BBDown/actions)

m1 Mac 需要从 Actions 里下载 [osx_arm64](https://github.com/nilaoda/BBDown/actions/runs/1997270461) 可执行文件，然后[手动为文件增加可执行权限](https://support.apple.com/zh-cn/guide/terminal/apdd100908f-06b3-4e63-8a87-32e71241bab4/mac)

```perl
cd <BBDown 可执行文件所在目录> && chmod 755 BBDown
```

### 开始使用

命令 `BBDown` 只能在 `<BBDown 可执行文件所在目录>` 中执行，可以把它加入环境变量中，也可以直接 alias 别名运行

```perl
# 查看环境变量
echo $PATH

# 添加环境变量
export PATH=/Users/gakki/bilibili:$PATH

# 或者直接 alias
alias bd="/Users/chuenwei/Documents/Bilibili"
```

目前命令行参数支持情况

```perl
BBDown
  BBDown是一个免费且便捷高效的哔哩哔哩下载/解析软件.

Usage:
  BBDown [options] <url> [command]

Arguments:
  <url>  视频地址 或 av|bv|BV|ep|ss

Options:
  -tv, --use-tv-api  使用TV端解析模式
  -app, --use-app-api使用APP端解析模式
  -intl, --use-intl-api  使用国际版解析模式
  --use-mp4box   使用MP4Box来混流
  -hevc, --only-hevc 只下载hevc编码
  -avc, --only-avc   只下载avc编码
  -av1, --only-av1   只下载av1编码
  -info, --only-show-info仅解析而不进行下载
  -hs, --hide-streams不要显示所有可用音视频流
  -ia, --interactive 交互式选择清晰度
  --show-all 展示所有分P标题
  --use-aria2c   调用aria2c进行下载(你需要自行准备好二进制可执行文件)
  --aria2c-proxy <aria2c-proxy>  调用aria2c进行下载时的代理地址配置
  -mt, --multi-thread使用多线程下载
  -p, --select-page <select-page>选择指定分p或分p范围：(-p 8 或 -p 1,2 或 -p 3-5 或 -p ALL)
  --audio-only   仅下载音频
  --video-only   仅下载视频
  --sub-only 仅下载字幕
  --no-padding-page-num  不给分P序号补零
  --debug输出调试日志
  --skip-mux 跳过混流步骤
  --skip-subtitle跳过字幕下载
  --skip-cover   跳过封面下载
  -dd, --download-danmaku下载弹幕
  --add-dfn-subfix   为文件加入清晰度后缀，如XXX[1080P 高码率]
  --no-part-prefix   多P时，不要加入分P前缀，如[P1],[P2]等
  --language <language>  设置混流的音频语言(代码)，如chi, jpn等
  -c, --cookie <cookie>  设置字符串cookie用以下载网页接口的会员内容
  -token, --access-token <access-token>  设置access_token用以下载TV/APP接口的会员内容
  --work-dir <work-dir>  设置程序的工作目录
  --ffmpeg-path <ffmpeg-path>设置ffmpeg的路径
  --mp4box-path <mp4box-path>设置mp4box的路径
  --aria2c-path <aria2c-path>设置aria2c的路径
  --delay-per-page <delay-per-page>  设置下载合集分P之间的下载间隔时间(单位: 秒, 默认无间隔)
  --version  Show version information
  -?, -h, --help Show help and usage information

Commands:
  login通过APP扫描二维码以登录您的WEB账号
  logintv  通过APP扫描二维码以登录您的TV账号
```

## aria2

### aria2 配置

#### 第一种模式

**命令行模式**：直接在命令行下载，比如 `aria2c ‘http://host/file.tar.gz’` 这种，然后当下载完成后，就自动退出了，就和 `wget` 的工作方式一样。

#### 第二种模式

Daemon 模式：另一种就是 `rpc server` 模式，特点就是，它启动之后什么都不干，然后等着从 rpc 接口添加任务，下载完也不退出，而是一直等着。对，就像迅雷干的那样，当然，它不会上传你硬盘上的数据。一般启动命令是

```perl
aria2c –enable-rpc –rpc-listen-all=true –rpc-allow-origin-all -c -D
```

但是，其实这个命令是不好的！不要使用这种启动方式。默认情况下是没有保存设定的功能的，重启服务或服务器，配置都会丢失。

首先，用命令方式导致配置不方便修改保存，`-D` 导致无法看到出错信息。推荐启动方式是使用配置文件

```perl
$HOME/.aria2/aria2.conf
```

或者

```perl
/etc/aria2/aria2.conf
```

或者你可以放到别的地方，然后

```perl
aria2c --conf-path=<PATH> -D
```

注意：**填完整路径**，因为鬼知道这个程序是从那个路径启动的。-D (用于后台执行，daemon 模式, 这样 ssh 断开连接后程序不会退出）

> [默认情况下 aria2 会主动去读取 `~/.aria2/aria2.conf` 作为启动配置](https://aria2.github.io/manual/en/html/aria2c.html#aria2-conf)

### aria2 命令行基本使用

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220407-571.png)

> 注意：当源地址存在诸如 `&`, `*` 等 shell 的特殊字符，请使用单引号或双引号把 URI 包含起来。

```perl
# 下载单个文件
aria2c -c -s 5 --max-download-limit=500k -o owncloud.zip http://example.org/mylinux.iso
#-c : 断点续传
#-s : 使用线程数
#-max-download-limit : 默认情况下，aria2 会利用全部带宽来下载文件，在文件下载完成之前，我们在服务器就什么也做不了（这将会影响其他服务访问带宽）
#-o : 在初始化下载的时候，我们可以使用 -o（小写）选项在保存文件的时候使用不同的名字

# 下载多个文件
# 下面的命令将会从指定位置下载超过一个的文件并保存到当前目录
aria2c http://a/f.iso ftp://b/f.iso

# 每个主机使用两个连接来下载
# 默认情况，每次下载连接到一台服务器的最大数目，对于一条主机只能建立一条。我们可以通过 aria2 命令行添加 -x2（2 表示两个连接）来创建到每台主机的多个连接，以加快下载速度
aria2c -x2 http://a/f.iso

# 下载 BitTorrent 磁力链接
aria2c 'magnet:?xt=urn:btih:248D0A1CD08284299DE78D5C1ED359BB46717D8C'

# 下载 BitTorrent Metalink 种子
aria2c http://example.org/mylinux.metalink

# 从文件获取输入
# 就像 wget 可以从一个文件获取输入的 URL 列表来下载一样。我们需要创建一个文件，将每一个 URL 存储在单独的行中。
aria2c -i uris.txt

# 下载 BitTorrent 种子文件
aria2c /tmp/CentOS-6.3-i386-bin-DVD1to2.torrent
aria2c http://mirrors.163.com/centos/6.6/isos/x86_64/CentOS-6.6-x86_64-minimal.torrent
```

> 断点续传

```perl
# 只需要重新运行一次同样的下载命令即可
aria2c -c http://mirrors.kernel.org/gnu/gcc/gcc-5.1.0/gcc-5.1.0.tar.gz
```

aria2 在下载过程中，我们按下 `Ctrl + C` 中断进程的执行，那么我们会在此目录下发现 `gcc-5.1.0.tar.gz` 以及 g`cc-5.1.0.tar.gz.aria2` 这两个文件。

其中 `gcc-5.1.0.tar.gz.aria2` 保存这下载的进度信息，当 aria2 使用同样的命令重新运行时，它会读取这个文件并继续原来的下载。当然，aria2 并不要求一定要是使用完全一直的参数：用户需要指定那些可以找到.aria2 文件的参数，所有 -d 选项是很重要的，而 URI 却不一定与上次相同，只要保证他们指向了同样的文件即可。

### Mac 中配置 Aria2 RPC Server

> [Mac 下配置 Aria2](https://gist.github.com/maboloshi/a4b1f27567319d4a42352aadd036a578#file-download-complete-hook-sh)

### 通过 brew 和 brew services 安装管理 aria2

一些说明
目前并不能直接将 aria2 安装成 brew services 可以直接使用的样子。不过我们可以手动修改添加一些配置文件，使其支持

> **新版 M1 aria2 的目录变成了 `/opt/homebrew/opt/aria2`**

创建一些必须文件

```perl
touch /opt/homebrew/opt/aria2/homebrew.mxcl.aria2.plist
```

修改配置文件

```perl
vim /opt/homebrew/opt/aria2/homebrew.mxcl.aria2.plist
```

```xml
<plist version="1.0">
    <dict>
        <key>Label</key>
        <string>homebrew.mxcl.aria2</string>
        <key>ProgramArguments</key>
        <array>
            <string>/opt/homebrew/opt/aria2/bin/aria2c</string>
        </array>
        <key>RunAtLoad</key>
        <true/>
        <key>KeepAlive</key>
        <true/>
    </dict>
</plist>
```

> 启动服务

- 查看所有服务及状态：`brew services list`
- 启动 aria2: `brew services start aria2`
- 停止 aria2: `brew services stop aria2`
- 重启 aria2: `brew services restart aria2`

## vim

### 入门笔记

> 更多内容：[精通 vim ，此文就够了](https://zhuanlan.zhihu.com/p/68111471)

#### vim 的四种模式

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220404-883.png)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220404-8ab.png)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220404-8be.png)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220404-8be.png)

> **补充**

- `s` 删除光标所在处的字符然后插入需要录入的文本。

- `S` 删除光标所在行，在当前行的行首开始插入需要录入的文本。

- `n <Enter>` n 为数字。光标向下移动 n 行

- `n <space>` 光标会向右移动这一行的 n 个字符，**与 nl 区别是可跨行**

- `:n` 定位到 n 行。

- 进行关键字的查找 `:/{目标字符串}`

  如：`/zempty` 会在文本中匹配 `zempty` 的地方高亮。
  查找文本中匹配的目标字符串，查到以后，输入键盘上的 `n` 会去寻找下一个匹配，`N` 会去寻找上一个匹配。

- **删除多行文本** `:n1,n2d`

  n1 和 n2 指的是起始行号和结束行号，d 是删除关键字

- **处理文本的替换** `:{作用范围}s/{目标}/{替换}/{替换的标志}`

  作用范围分为当前行、全文、选区等等。

  - `:s/zempty/handsome/g` 将会把当前光标所在行的 zempty 替换成 handsome

  - `:%s/zempty/handsome/g` 将会把全文中的 zempty 替换成 handsome

  - `:n1,n2s/zempty/handsome/g` 这里的 n1 和 n2 值得是行号，将会替换掉 n1 到 n2 的所有 zempty 为 handsome.

- **执行 Linux 命令** `:!command`

#### 普通模式下光标移动

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220404-8cl.png)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220404-8em.png)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220404-8f6.png)

> **补充**

- `nfa` 移动到本行光标处开始的第 n 个 字符为 a 的地方（n 是 1，2，3，4 ... 数字）

- `zz` 把当前行移动到当前屏幕的中间

- `ctrl+f` 查看下一页内容

- `ctrl+b` 查看上一页内容

#### 操作符

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220404-8ge.png)

```perl
dw # 删除一个单词
dnw # 删除 n 个单词，
dfa # 删除光标处到下一个 a 的字符处（ fa 定位光标到 a 处 ）
dnfa # 删除光标处到第 n 个 a 的字符处
dd # 删除一整行
ndd # 删除光标处开始的 n 行
d$ # 删除光标到本行的结尾
dH # 删除屏幕显示的第一行文本到光标所在的行
dG # 删除光标所在行到文本的结束

yy # 复制一行，还有 nyy

p # 在光标后开始黏贴
P # 大写的 P 光标前开始粘贴

u # 撤销刚才的操作
ctrl + r # 恢复撤销操作

~ # 将光标下的字母改变大小写
3~ # 将光标位置开始的3个字母改变其大小写
g~~ # 改变当前行字母的大小写
gUU # 将当前行的字母改成大写
guu # 将当前行的字母全改成小写
3gUU # 将从光标开始到下面3行字母改成大写
```

还有一个可能经常用到的就是 `cw` ，删除从光标处开始到该单词结束的所有字符，然后插入需要录入的文本（这个命令是两个字符的合体 `cw` ）

> **补充**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220404-8h8.png)

```perl
# <title>Document</title>
dit # 删除 Document
dit # 删除 整个 tag title

# 双引号变单引号
cs"
```

### 插件管理器 vim-plug

> 推荐一个插件网址：[VimAwesome](https://vimawesome.com/) 这里拥有很多好用的插件

#### 安装 [vim-plug](https://github.com/junegunn/vim-plug)

```perl
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

#### 安装插件

要安装插件，必须首先在 Vim 配置文件中声明它们。一般 Vim 的配置文件是 `~/.vimrc`，Neovim 的配置文件是 `~/.config/nvim/init.vim`。

在配置文件中声明插件时，列表应该以 `call plug#begin(PLUGIN_DIRECTORY)` 开始，并以 `plug#end()` 结束。

例如，我们安装 “nerdtree” 插件。为此，请在 `~/.vimrc` 的顶部添加以下行。

```perl
call plug#begin('~/.vim/plugged')

Plug 'scrooloose/nerdtree'

call plug#end()
```

在 vim 配置文件中添加上面的行后，

通过输入以下命令重新加载：

```perl
source ~/.vimrc
```

或者，重新加载 vim 编辑器。

然后输入下面的命令，然后按回车键安装之前在配置文件中声明的插件。

```perl
:PlugInstall
```

#### 更新插件

要更新插件，请运行：

```perl
:PlugUpdate
```

更新插件后，按下 d 查看更改。或者，你可以之后输入 `:PlugDiff`。

#### 删除插件

删除一个插件删除或注释掉你以前在你的 vim 配置文件中添加的 plug 命令。然后，运行 `source ~/.vimrc` 或重启 Vim 编辑器。最后，运行以下命令卸载插件：

```perl
:PlugClean
```

该命令将删除 vim 配置文件中所有未声明的插件。

#### 升级 vim-plug

要升级 vim-plug 本身，请输入：

```perl
:PlugUpgrade
```

#### 我的配置文件

我的配置文件配置如下:

```perl
call plug#begin('~/.vim/plugged')

Plug 'scrooloose/nerdtree'
Plug 'mhinz/vim-startify'
Plug 'rakr/vim-one'

call plug#end()

let g:airline_theme='one'
colorscheme one
set background=dark

set number

let mapleader = ","
nnoremap <silent> <leader>n :NERDTreeToggle<CR>
```

> **nerdtree 插件**

使用 nerdtree 通常需要在 .vimrc 中配置一个出发快捷键如下:

```perl
let mapleader = ","
nnoremap <silent> <leader>n :NERDTreeToggle<CR>
```

上述配置意思就是通过 `,n` 快捷键来激活插件 nerdtree.

> **vim-startify 插件**

这是一个使用起来非常简单的插件，方便我们浏览最近打开的文件，终端输入 vim ，我们就会进入该插件，输入相应文件对应的数字键就可以快速打开文件了。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220404-80e.png)

> **vim-one 主题**

[Light and dark vim colorscheme, shamelessly stolen from atom (another excellent text editor).](https://github.com/rakr/vim-one)

> **设置 vim 永久显示行号**

在打开的 .vimrc 文件中输入 `set number`，然后保存退出。再次用 vim 打开文件时，就会显示行号了。

> **使用 map 自定义快捷键**

<https://blog.csdn.net/JasonDing1354/article/details/45372007>

### vscode vim 插件

- `gd` 跳转到函数定义
- `gh` 函数 hover
- `4gt` 跳转到第 4 个 tab
