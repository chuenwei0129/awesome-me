---
group:
  title: 命令行
  order: 0
title: 文件操作与文本处理
toc: content
order: 1
---

# 高效文件操作与文本处理：命令行的核心生产力

## 1. 文件系统导航与目录结构

### 1.1 基础导航命令（macOS + Linux 通用）

```bash
# 查看当前所在目录
pwd                    # Print Working Directory（打印工作目录）

# 列出文件和目录
ls                     # 简单列出当前目录内容
ls -l                  # 详细列表，显示：权限、所有者、大小、修改时间
ls -la                 # 显示所有文件，包括隐藏文件（以点 . 开头的文件）
ls -lh                 # 人类可读的大小格式（KB/MB/GB）
ls -ltr                # 按时间反向排序（最新的在最后）
```

**ls 参数详解**：

- `-l`：long format，长格式显示
- `-a`：all，显示所有文件（包括隐藏文件）
- `-h`：human-readable，人类可读的大小（如 4.0K、1.2M）
- `-t`：按修改时间排序
- `-r`：reverse，反向排序
- `-S`：按文件大小排序

```bash
# 切换目录
cd ~                   # ~ 代表用户主目录（home directory）
cd /path/to/directory  # 切换到绝对路径
cd ..                  # .. 代表上级目录
cd -                   # 切换到上一个目录（在两个目录间切换）
cd                     # 不带参数时，等同于 cd ~
```

### 1.2 理解目录结构差异

**远程 Linux 常见目录**：

| 目录                 | 说明           |
| -------------------- | -------------- |
| `/`                  | 根目录         |
| `/home/<username>`   | 用户主目录     |
| `/etc`               | 系统配置文件   |
| `/var/log`           | 系统和服务日志 |
| `/tmp`               | 临时文件       |
| `/usr/bin`           | 系统命令       |
| `/var/www` 或 `/srv` | Web 服务文件   |

**本地 macOS 常见目录**：

| 目录               | 说明                                         |
| ------------------ | -------------------------------------------- |
| `/Users/<you>`     | 用户主目录                                   |
| `/Applications`    | 应用程序                                     |
| `/opt/homebrew`    | Apple Silicon 的 Homebrew 安装目录           |
| `/usr/local`       | 用户安装的程序（Intel Mac 的 Homebrew 位置） |
| `/private/var/log` | 系统日志                                     |

### 1.3 创建目录结构

```bash
# 创建单个目录
mkdir my-project

# 创建多级目录（递归创建）
mkdir -p src/components/Button

# 创建项目常用目录结构
mkdir -p project/{src/{components,utils,styles},tests,public}
# 效果：
# project/
# ├── src/
# │   ├── components/
# │   ├── utils/
# │   └── styles/
# ├── tests/
# └── public/
```

**mkdir 参数详解**：

- `-p`：parents，递归创建目录，如果上级目录不存在则一并创建
- `-v`：verbose，显示创建过程

---

## 2. 文件基础操作

### 2.1 创建与查看文件

```bash
# 创建空文件或更新时间戳
touch index.html
touch src/{app.js,utils.js}   # 创建多个文件

# 查看文件内容
cat package.json              # 查看小文件全部内容
head -n 20 app.log            # 查看文件前 20 行
tail -n 50 app.log            # 查看文件后 50 行
```

**参数详解**：

- `touch`：如果文件不存在则创建空文件；如果存在则更新文件时间戳
- `cat`：concatenate，连接文件内容并输出到屏幕
- `head -n`：显示文件前 n 行
- `tail -n`：显示文件后 n 行

### 2.2 复制、移动与重命名

```bash
# 复制文件
cp source.js dest.js
cp config.yaml config.yaml.backup  # 创建备份
cp -r src/ dist/                   # 递归复制目录

# 移动文件（也可用于重命命）
mv old.js new.js                   # 重命名
mv app.js src/                     # 移动到目录
mv *.log logs/                     # 移动所有 .log 文件

# 安全的移动/复制（交互模式，询问确认）
cp -i source dest
mv -i old new
```

**cp/mv 参数详解**：

- `cp -r`：recursive，递归复制目录及其内容
- `cp -i`：interactive，交互模式，覆盖前询问确认
- `cp -v`：verbose，显示复制过程
- `cp -p`：preserve，保留文件属性（权限、时间戳等）
- `mv -i`：interactive，交互模式，覆盖前询问确认
- `mv -f`：force，强制覆盖，不询问

### 2.3 删除操作与安全策略

```bash
# 删除文件
rm old.log

# 删除目录（递归）
rm -r node_modules/

# 强制删除（不询问）
rm -f locked-file.js

# 交互式删除（推荐用于重要文件）
rm -i important-doc.md
```

**rm 参数详解**：

- `-r` 或 `-R`：recursive，递归删除目录及其内容
- `-f`：force，强制删除，不询问
- `-i`：interactive，交互模式，删除前询问确认
- `-v`：verbose，显示删除过程

**重要安全建议**：

1. **永远不要运行**（尤其是在误打空格时要非常小心）：

   ```bash
   rm -rf /          # 删除整个系统！
   rm -rf ~/*        # 删除主目录几乎所有文件和目录（不含隐藏文件），极其危险！
   ```

2. **创建安全别名**（添加到 `~/.zshrc` 或 `~/.bashrc`）：

   ```bash
   # 默认使用交互模式
   alias rm='rm -i'
   alias cp='cp -i'
   alias mv='mv -i'

   # 需要跳过别名时使用反斜杠
   \rm -r node_modules  # 使用原始 rm 命令
   ```

---

## 3. 文件编辑与文本处理

### 3.1 使用命令行编辑器

```bash
# 使用 nano（简单易用，适合初学者）
nano config.yaml        # 打开文件编辑

# 使用 vim（功能强大，学习曲线较陡）
vim app.js
```

**nano 快捷键**：

- `Ctrl+O`：Write Out（保存文件）
- `Ctrl+X`：Exit（退出编辑器）
- `Ctrl+K`：Cut Text（剪切当前行）
- `Ctrl+U`：Uncut Text（粘贴）
- `Ctrl+W`：Where Is（搜索）

**vim 基础模式**：

1. **正常模式**（按 `Esc` 进入）：移动光标、删除、复制等
2. **插入模式**（按 `i` 进入）：编辑文本
3. **命令模式**（按 `:` 进入）：保存、退出等

### 3.2 使用 `sed` 进行流式文本编辑

```bash
# 基本替换（输出到终端，不修改原文件）
sed 's/old/new/g' file.txt          # 将 file.txt 中的所有 old 替换为 new

# 直接修改文件（-i 选项，macOS / Linux 写法略有不同）

# Linux (GNU sed)
sed -i 's/old/new/g' file.txt       # 直接修改原文件

# macOS (BSD sed)
sed -i '' 's/old/new/g' file.txt    # 直接修改原文件，不保留备份

# 备份原文件并修改（macOS / Linux 通用）
sed -i.bak 's/foo/bar/g' file.txt   # 创建 file.txt.bak 备份，然后修改原文件

# 删除匹配的行
sed '/debug/d' app.js               # 删除包含 debug 的行
sed '/^$/d' file.txt                # 删除所有空行（^ 开头，$ 结尾）
```

**sed 参数详解**：

- `-i`：in-place，直接修改文件（macOS 需写成 `-i ''` 或 `-i.bak`）
- `s/pattern/replacement/g`：substitute 替换，g 表示全局替换
- `/pattern/d`：delete 删除匹配的行
- `^`：匹配行首
- `$`：匹配行尾

### 3.3 使用 `awk` 进行高级文本处理

```bash
# 打印特定列（默认以空格/制表符分隔）
awk '{print $1}' data.txt          # 打印第一列
awk '{print $1, $3}' data.txt      # 打印第一和第三列

# 指定分隔符
awk -F',' '{print $1, $2}' data.csv  # CSV文件，以逗号分隔

# 条件过滤
awk '$3 > 100 {print $0}' sales.txt           # 第三列大于100的行
awk '/error/ {print NR ": " $0}' log.txt      # 含 error 的行及行号
```

**awk 参数详解**：

- `-F','`：Field separator，指定字段分隔符为逗号
- `$1`、`$2`、`$3`：第 1、2、3 个字段（列）
- `$0`：整行内容
- `NR`：Number of Records，当前行号
- `NF`：Number of Fields，当前行的字段数
- `{print ...}`：打印指定内容
- `BEGIN {...}`：在处理前执行的代码块
- `END {...}`：在处理后执行的代码块

### 3.4 使用 `tr` 进行字符转换

```bash
# 字符替换
echo "Hello World" | tr 'a-z' 'A-Z'  # 转大写（小写转大写）
echo "HELLO WORLD" | tr 'A-Z' 'a-z'  # 转小写（大写转小写）

# 删除字符
echo "Hello, World!" | tr -d ',!'    # 删除逗号和感叹号
cat file.txt | tr -d '\r'            # 删除 Windows 回车符（CR）

# 压缩重复字符
echo "foo    bar" | tr -s ' '        # 压缩多个空格为一个
```

**tr 参数详解**：

- `tr 'a-z' 'A-Z'`：字符集映射，小写转大写
- `-d`：delete，删除指定的字符
- `-s`：squeeze，压缩重复的字符为一个
- `-c`：complement，使用补集（反选）

---

## 4. 权限管理：理解、设置与排错

### 4.1 理解类 Unix 权限模型（macOS / Linux 共用）

#### 查看文件权限

```bash
# 查看详细权限
ls -l
# 输出示例：
# -rwxr-xr-x 1 user group 1234 Jan 1 12:00 script.sh
# drwxr-xr-x 2 user group 4096 Jan 1 12:00 directory/

# 解释：
# 第1位：- = 普通文件，d = 目录，l = 符号链接
# 2-4位：所有者(user)权限
# 5-7位：所属组(group)权限
# 8-10位：其他用户(other)权限

# 权限字母及对应数值：
# r = 读 (4)
# w = 写 (2)
# x = 执行/进入目录 (1)
# - = 无权限
# s = setuid/setgid
# t = sticky bit
```

#### 理解特殊权限位

```bash
# setuid 位（文件执行时以所有者身份运行）
chmod u+s /usr/bin/passwd
# 显示为：-rwsr-xr-x

# setgid 位（目录中新文件继承组ID）
chmod g+s /shared/directory
# 显示为：drwxrwsr-x

# sticky 位（只有所有者能删除目录中的文件）
chmod o+t /tmp
# 显示为：drwxrwxrwt
```

> 说明：基本权限模型在 Linux 和 macOS 上是一致的，但后面提到的 SELinux/AppArmor/ACL 等是 Linux 特有的扩展机制。

### 4.2 修改权限：`chmod`

#### 符号模式（易读）

```bash
# 添加权限
chmod u+x script.sh           # 所有者添加执行权限
chmod g+w file.txt            # 组添加写权限
chmod a+r document.pdf        # 所有人添加读权限

# 移除权限
chmod o-w secret.txt          # 其他人移除写权限
chmod go-rx private/          # 组和其他移除读和执行权限

# 设置精确权限
chmod u=rwx,g=rx,o=r file     # 所有者 rwx，组 rx，其他人 r

# 递归修改目录权限（对生产环境谨慎使用）
chmod -R 755 public_html/
```

#### 数字模式（常用）

```bash
# 常用权限组合
chmod 755 script.sh           # rwxr-xr-x（所有者全部，其他人读执行）
chmod 644 config.yml          # rw-r--r--（所有者读写，其他人只读）
chmod 600 .ssh/id_rsa         # rw-------（仅所有者读写）
chmod 777 file                # rwxrwxrwx（所有人所有权限，危险！除非你知道自己在做什么）

# 目录权限最佳实践
chmod 755 directory/          # 目录通常需要 x 权限才能进入
chmod 711 private_dir/        # 其他人只能进入，不能列出内容
```

### 4.3 修改所有者和组：`chown` 与 `chgrp`

```bash
# 修改文件所有者
sudo chown username file.txt

# 修改文件组
sudo chgrp groupname file.txt
# 或使用 chown 的另一种形式：
sudo chown :groupname file.txt

# 同时修改所有者和组
sudo chown username:groupname file.txt

# 递归修改（常见于 Web 目录）
sudo chown -R www-data:www-data /var/www/html

# 只修改目录本身（不包括内容）
sudo chown username directory/

# 修改符号链接本身（而不是它指向的文件）
sudo chown -h username symlink
```

> 提示：`chown/chgrp` 通常需要 root 权限，所以示例中使用了 `sudo`。

### 4.4 默认权限与 `umask`

```bash
# 查看当前 umask
umask                         # 显示八进制值
umask -S                      # 显示符号形式（部分系统支持）

# 设置 umask
umask 022                     # 新文件：644，新目录：755
umask 027                     # 新文件：640，新目录：750

# 计算实际权限
# 文件默认权限：666 - umask
# 目录默认权限：777 - umask
# 示例：umask 022
#   文件：666 - 022 = 644 (rw-r--r--)
#   目录：777 - 022 = 755 (rwxr-xr-x)
```

> 实战场景：在服务器上运行 Node.js / Nginx 等服务时，合理设置 `umask` 可以避免日志文件过宽的权限（例如被所有用户可写）。

### 4.5 权限问题排查流程

当遇到 "Permission denied" 错误时，可以按以下顺序排查：

```bash
# 1. 查看文件/目录权限
ls -ld /path/to/problem
# 检查：所有者、组、权限（是否有 r/x）

# 2. 查看当前用户和组
id                           # 显示用户ID、组ID和所属组列表
whoami                       # 显示当前用户名

# 3. 检查进程运行用户（服务权限问题高发）
ps aux | grep nginx
# 或查看监听端口的进程：
sudo lsof -i :80

# 4. 检查父目录权限（对目录需要 x 权限才能进入，r 权限才能列出）
ls -ld /path /path/to /path/to/problem
```

以下步骤主要适用于 Linux 服务器（macOS 通常不会启用 SELinux）：

```bash
# 5. 检查特殊权限位（如 setuid）
ls -l /usr/bin/passwd        # 检查是否有 s 位

# 6. 检查 SELinux / AppArmor（Linux 安全模块）

# CentOS / RHEL 等使用 SELinux 的发行版：
getenforce                   # 查看 SELinux 状态（Enforcing / Permissive / Disabled）
ls -Z /path/to/file          # 查看 SELinux 上下文（需要 SELinux 支持）

# Ubuntu / Debian 常见的 AppArmor：
sudo aa-status               # 查看 AppArmor 状态（如未安装则没有此命令）

# 7. 检查 ACL（访问控制列表，Linux 常见）
getfacl /path/to/file        # 查看 ACL 权限（需要安装对应工具）
```

> 总结思路：先看“文件和目录权限 + 当前用户/组”，再看“进程运行用户”，最后再考虑安全模块（SELinux/AppArmor）和 ACL 之类的高级机制。

---

## 5. 查看与监控文件内容

### 5.1 查看文件的多种方式

```bash
# 基本查看
cat app.log                     # 显示整个文件（适合小文件）

# 分页查看（推荐用于大文件）
less app.log                    # 分页查看，支持搜索
more app.log                    # 简化的分页（功能较少）

# 查看部分内容
head -n 100 app.log             # 前 100 行
tail -n 200 app.log             # 后 200 行
tail -f app.log                 # 实时跟踪文件变化（监控日志）
tail -F app.log                 # 跟踪文件，即使被重命名/重新创建
```

**参数详解**：

- `head -n`：显示前 n 行
- `tail -n`：显示后 n 行
- `tail -f`：follow，实时跟踪文件新增内容
- `tail -F`：follow + retry，跟踪文件，即使文件被重命名或重新创建（日志轮转场景常用）

### 5.2 `less` 命令的高级用法

`less` 是查看大文件的最佳工具，支持丰富的快捷键：

| 快捷键        | 功能                                                     |
| ------------- | -------------------------------------------------------- |
| `空格` 或 `f` | 向前翻一页                                               |
| `b`           | 向后翻一页                                               |
| `d`           | 向前翻半页                                               |
| `u`           | 向后翻半页                                               |
| `g`           | 跳到文件开头                                             |
| `G`           | 跳到文件末尾                                             |
| `/pattern`    | 向前搜索                                                 |
| `?pattern`    | 向后搜索                                                 |
| `n`           | 下一个匹配项                                             |
| `N`           | 上一个匹配项                                             |
| `:n`          | 查看下一个文件（如果用 `less file1 file2` 打开多个文件） |
| `:p`          | 查看上一个文件                                           |
| `F`           | 进入跟踪模式（类似 `tail -f`）                           |
| `q`           | 退出                                                     |

### 5.3 实时监控日志文件

```bash
# 基础监控
tail -f /var/log/nginx/access.log

# 监控并过滤应用日志（只输出 error/warn 相关行）
tail -f app.log | grep -E 'error|warn|ERROR|WARN'

# 如果使用 GNU grep，可加上 --color 高亮匹配：
# tail -f app.log | grep --color=always -E 'error|warn|ERROR|WARN'

# 监控多个日志文件
tail -f /var/log/nginx/*.log
```

**参数详解**：

- `tail -f`：实时跟踪文件变化，常用于监控日志
- `grep -E`：使用扩展正则表达式
- `grep --color`：在 GNU grep 中高亮匹配文本（macOS 可通过 Homebrew 安装 ggrep）

---

## 6. 理解数据流：掌握重定向与管道

### 6.1 数据流的基本概念

每个命令都有三个标准数据流：

| 流           | 编号 | 描述                   | 类比前端                     |
| ------------ | ---- | ---------------------- | ---------------------------- |
| **标准输入** | 0    | 程序读取输入的地方     | 类似 `readline()` 或表单输入 |
| **标准输出** | 1    | 程序输出正常结果的地方 | 类似 `console.log()`         |
| **标准错误** | 2    | 程序输出错误信息的地方 | 类似 `console.error()`       |

### 6.2 重定向操作符：控制输出流向

```bash
# 1. 基本重定向：覆盖与追加
ls -l > files.txt              # 将 ls 的标准输出覆盖写入 files.txt
echo "# 开始构建" > log.txt    # 清空 log.txt，然后写入这行字
echo "Stage 1" >> log.txt      # >> 是"追加重定向"，在文件末尾添加
npm run build >> log.txt       # 将构建的标准输出追加到 log.txt

# 2. 分离标准输出和错误
npm run build > build-output.log 2> build-errors.log
# > 重定向标准输出(1)
# 2> 重定向标准错误(2)

# 3. 丢弃输出
npm run build > /dev/null 2>&1  # 静默运行，丢弃所有输出
```

**重定向操作符详解**：

- `>`：覆盖重定向（将输出重定向到文件，覆盖原有内容）
- `>>`：追加重定向（将输出重定向到文件，追加到末尾）
- `2>`：重定向标准错误
- `&>`：重定向标准输出和标准错误（Bash/Zsh 扩展，Bash 3.x+ 支持；在 `/bin/sh` 中不可用）
- `/dev/null`：特殊设备文件，丢弃所有写入的数据
- `2>&1`：将标准错误(2)重定向到标准输出(1)

> 实战建议：在需要兼容更多 shell 的脚本中，优先使用 `cmd > out.log 2>&1`，而不是 `&>`。

### 6.3 管道操作符：连接命令

```bash
# 基础管道：查找特定文件
ls | grep '\.js$'               # 列出所有以 .js 结尾的文件

# 多重管道：构建数据处理流水线
grep 'ERROR' app.log | sort | uniq -c | sort -nr

# 同时输出到终端和文件（结合 tee）
npm run build 2>&1 | tee build.log
```

**管道符号**：

- `|`：管道符，将前一个命令的标准输出作为后一个命令的标准输入

---

## 7. 文本搜索与模式匹配

### 7.1 使用 `grep` 进行文本搜索

```bash
# 基础搜索
grep 'function' app.js               # 搜索包含 "function" 的行
grep -i 'error' app.log              # 忽略大小写
grep -v 'DEBUG' app.log              # 反向匹配（不包含 DEBUG 的行）
grep -rn 'TODO' src                  # 递归搜索 src，显示行号

# 递归搜索
grep -r 'useState' src/              # 递归搜索目录（注意可能遍历 node_modules）

# Linux (GNU grep) 下，可以使用 --include 过滤文件类型
grep -r --include='*.js' 'import' .  # 只搜索 .js 文件

# macOS / 通用写法：使用 find 配合 grep
find . -name '*.js' -type f -print0 | xargs -0 grep 'import'

# 正则表达式
grep -E '^[0-9]+' data.txt           # 以数字开头的行
grep -E '(error|ERROR|Error)' app.log

# 查看上下文
grep -A 3 'Exception' error.log      # 匹配行及后 3 行
grep -B 2 'Exception' error.log      # 匹配行及前 2 行
grep -C 3 'Exception' error.log      # 匹配行及前后各 3 行
```

**grep 参数详解**：

- `-i`：ignore-case，忽略大小写
- `-v`：invert-match，反向匹配，显示不匹配的行
- `-n`：line-number，显示行号
- `-r` / `-R`：recursive，递归搜索目录（对符号链接的处理略有不同）
- `-E`：extended-regexp，使用扩展正则表达式
- `-A n`：after-context，显示匹配行后的 n 行
- `-B n`：before-context，显示匹配行前的 n 行
- `-C n`：context，显示匹配行前后的 n 行
- `--color=always`：在 GNU grep 中始终高亮匹配文本
- `--include='*.js'`：只搜索指定类型的文件（GNU grep 特性）

> 建议：对前端项目目录（包含大量依赖）搜索时，尽量排除 `node_modules` 等目录，例如：
> `grep -R --exclude-dir=node_modules 'useState' src/` 或使用更现代的工具（见下节）。

### 7.2 现代代码搜索工具（可选）

在现代前端项目中，你还可以使用更高效的代码搜索工具：

```bash
# ripgrep（rg）：快速代码搜索，默认忽略 .gitignore / node_modules
rg 'useState' src

# fd：比 find 更友好的文件查找
fd 'Button' src/components
```

> 说明：`rg` / `fd` 需要通过包管理器预先安装（如 macOS 的 Homebrew 或 Linux 发行版仓库），但在大规模前端项目中体验远好于单纯用 `grep -r` / `find`。

---

## 8. 文件查找与批量处理

### 8.1 使用 `find` 查找文件

```bash
# 基础查找
find . -name '*.js'                     # 查找所有 .js 文件
find src -type f -name '*.test.js'      # 只查找文件（file）
find . -type d -name 'node_modules'     # 只查找目录（directory）

# 按时间查找
find . -mtime -7                        # 7 天内修改过的文件
find . -mtime +30                       # 30 天前修改过的文件

# 按大小查找
find . -size +100M                      # 大于 100MB 的文件
find . -size -10k                       # 小于 10KB 的文件

# 组合条件
find . -name '*.log' -size +10M -mtime +7  # 大于 10MB、7 天前的日志文件
```

**find 参数详解**：

- `-name '*.js'`：按文件名查找，支持通配符
- `-type f`：只查找文件（file）
- `-type d`：只查找目录（directory）
- `-mtime -n`：n 天内修改过的文件（按 24 小时区块近似计算）
- `-mtime +n`：n 天前修改过的文件
- `-size +100M`：大于 100MB 的文件
- `-size -10k`：小于 10KB 的文件
- `-print`：打印找到的文件路径（默认行为）
- `-print0`：用 null 字符分隔输出，防止文件名包含空格的问题
- `-exec command {} \;`：对找到的每个文件执行命令
- `-delete`：删除匹配到的文件（使用前请务必先用 `-print` 检查）

### 8.2 使用 `find` + `xargs` 进行批量处理

```bash
# 删除所有临时文件（先打印查看，确认安全）
find . -name '*.tmp' -type f -print
find . -name '*.tmp' -type f -print0 | xargs -0 rm

# 或使用 -delete（确认无误后）
# find . -name '*.tmp' -type f -delete

# 批量更改权限
find . -name '*.sh' -type f -exec chmod +x {} \;

# 统计代码行数
find src -type f -name '*.js' -print0 | xargs -0 wc -l
```

**xargs 参数详解**：

- `xargs -0`：用 null 字符作为分隔符，与 `find -print0` 配合使用
- `xargs -n 1`：每次只传递一个参数给命令
- `xargs -I {}`：用指定的字符串替换参数，如 `xargs -I {} mv {} {}.backup`
- `xargs -P n`：并行执行，同时运行 n 个进程

---

## 9. 文件归档与压缩

### 9.1 归档与压缩基础

```bash
# tar 归档（不压缩）
tar -cvf archive.tar file1 file2 dir1/   # 创建归档
tar -tvf archive.tar                     # 查看归档内容
tar -xvf archive.tar                     # 解压归档

# gzip 压缩
gzip file.txt                            # 压缩为 file.txt.gz
gzip -d file.txt.gz                      # 解压
gunzip file.txt.gz                       # 同上，解压
```

**tar 参数详解**：

- `-c`：create，创建归档
- `-x`：extract，解压归档
- `-t`：list，查看归档内容
- `-v`：verbose，显示详细过程
- `-f`：file，指定归档文件名
- `-z`：使用 gzip 压缩/解压（用于 .tar.gz）
- `-j`：使用 bzip2 压缩/解压（用于 .tar.bz2）
- `-J`：使用 xz 压缩/解压（用于 .tar.xz）

**gzip 参数详解**：

- `gzip file`：压缩文件为 .gz 格式
- `gzip -d file.gz`：解压 .gz 文件
- `gzip -c file > file.gz`：压缩但不删除原文件
- `gunzip file.gz`：解压 .gz 文件

### 9.2 常用压缩归档组合

```bash
# 创建并压缩
tar -czvf project.tar.gz project/        # .tar.gz (gzip)
tar -cjvf project.tar.bz2 project/       # .tar.bz2 (bzip2)
tar -cJvf project.tar.xz project/        # .tar.xz (xz，最高压缩率)

# 解压压缩归档
tar -xzvf project.tar.gz                 # 解压 .tar.gz
tar -xjvf project.tar.bz2                # 解压 .tar.bz2
tar -xJvf project.tar.xz                 # 解压 .tar.xz
```

### 9.3 zip 格式（跨平台兼容）

```bash
# 创建 zip 归档
zip -r archive.zip dir/                  # 递归压缩目录
zip archive.zip file1 file2              # 压缩多个文件

# 解压 zip 归档
unzip archive.zip                        # 解压到当前目录
unzip archive.zip -d target_dir/         # 解压到指定目录
```

**zip 参数详解**：

- `-r`：recursive，递归压缩目录
- `-9`：最大压缩率
- `-e`：encrypt，加密压缩（需要密码）
- `-s n`：split，分卷压缩，每卷 n MB

**unzip 参数详解**：

- `-d dir`：extract to，解压到指定目录
- `-l`：list，查看压缩包内容
- `-t`：test，测试压缩包完整性

### 9.4 实际应用示例

```bash
# 1. 备份项目，排除 node_modules 和 .git
tar -czvf backup_$(date +%Y%m%d).tar.gz \
  --exclude=node_modules \
  --exclude=.git \
  project/

# 2. 压缩日志文件，保留原文件
gzip -c app.log > app.log.gz

# 3. 批量压缩多个文件
find . -name "*.log" -type f -exec gzip {} \;
# 解压所有 .gz 文件
find . -name "*.gz" -type f -exec gunzip {} \;
```

### 9.5 压缩工具对比

| 格式     | 命令      | 压缩速度 | 压缩率 | 适用场景                          |
| -------- | --------- | -------- | ------ | --------------------------------- |
| .gz      | gzip      | 快       | 中等   | 通用压缩，快速归档                |
| .bz2     | bzip2     | 慢       | 高     | 需要高压缩率的场景                |
| .xz      | xz        | 很慢     | 最高   | 长期存储，最大限度节省空间        |
| .zip     | zip       | 中等     | 中等   | 跨平台分享（Windows/macOS/Linux） |
| .tar     | tar       | 不压缩   | -      | 仅归档，保持文件结构和权限        |
| .tar.gz  | tar+gzip  | 中等     | 中等   | Linux/Unix 标准归档格式           |
| .tar.bz2 | tar+bzip2 | 慢       | 高     | 需要较高压缩率的归档              |

---

## 10. 实际应用场景示例

### 10.1 前端项目常用命令组合

```bash
# 1. 统计项目代码行数（TypeScript/React 项目）
find src -type f \
  \( -name '*.ts' -o -name '*.tsx' -o -name '*.js' -o -name '*.jsx' \) \
  -print0 | xargs -0 wc -l

# 2. 分离构建日志与错误
npm run build > build-output.log 2> build-errors.log
# 如果构建成功，build-errors.log 是空的；如果失败，查看 build-errors.log 快速定位

# 3. 实时监控并过滤应用日志（只输出 error/warn 相关行）
tail -f app.log | grep -E 'error|warn|ERROR|WARN'
```

### 10.2 日志分析与监控

```bash
# 1. 统计错误类型频率并排序
grep 'ERROR' app.log | cut -d' ' -f4- | sort | uniq -c | sort -nr

# 2. 分析 Nginx 访问日志：前 10 个最频繁访问的 URL
awk '{print $7}' /var/log/nginx/access.log | sort | uniq -c | sort -nr | head -10

# 3. 将所有日志（包括错误）归档到单个文件
node server.js > server_$(date +%Y%m%d).log 2>&1
```

### 10.3 开发环境快速排错

```bash
# 1. 检查端口占用（结合管道和 grep）
lsof -i :3000 | grep LISTEN

# 2. 查找大文件并排序显示（帮助排查异常大的前端构建产物）

# Linux (GNU sort)：按人类可读大小排序
find . -type f -size +50M -exec ls -lh {} \; | sort -k5 -h

# macOS 上可以安装 coreutils 后使用 gsort：
# brew install coreutils
# find . -type f -size +50M -exec ls -lh {} \; | gsort -k5 -h

# 3. 监控文件夹变化（结合重定向，需预先安装 fswatch）
fswatch -o src/ | xargs -n1 -I {} sh -c 'echo "文件变化于 $(date)" >> watch.log 2>&1'
```

---

## 11. 总结

### 命令参数速查表

| 命令      | 常用参数     | 含义                          |
| --------- | ------------ | ----------------------------- |
| **ls**    | `-l`         | 长格式显示                    |
|           | `-a`         | 显示所有文件（包括隐藏文件）  |
|           | `-h`         | 人类可读的大小                |
|           | `-t`         | 按时间排序                    |
| **cd**    | `~`          | 用户主目录                    |
|           | `..`         | 上级目录                      |
|           | `-`          | 上一个目录                    |
| **mkdir** | `-p`         | 递归创建目录                  |
| **rm**    | `-r`         | 递归删除                      |
|           | `-f`         | 强制删除                      |
|           | `-i`         | 交互式删除                    |
| **cp**    | `-r`         | 递归复制                      |
|           | `-i`         | 交互式复制                    |
| **mv**    | `-i`         | 交互式移动                    |
| **find**  | `-name`      | 按文件名查找                  |
|           | `-type`      | 按文件类型查找                |
|           | `-mtime`     | 按修改时间查找（24 小时区块） |
|           | `-size`      | 按文件大小查找                |
| **grep**  | `-i`         | 忽略大小写                    |
|           | `-v`         | 反向匹配                      |
|           | `-n`         | 显示行号                      |
|           | `-r`         | 递归搜索                      |
| **tar**   | `-c`         | 创建归档                      |
|           | `-x`         | 解压归档                      |
|           | `-z`         | 使用 gzip                     |
|           | `-j`         | 使用 bzip2                    |
|           | `-v`         | 显示详细过程                  |
| **gzip**  | `-d`         | 解压                          |
|           | `-c`         | 压缩到标准输出                |
| **chmod** | 数字模式     | 设置 rwx 权限（如 755/644）   |
|           | 符号模式     | 精细控制 u/g/o 权限           |
| **chown** | `user:group` | 修改所有者和组                |
| **umask** | 八进制       | 控制新建文件/目录默认权限     |

### 学习建议

1. **从常用命令开始**：先掌握 `ls`、`cd`、`pwd`、`cat`、`less` 等基础命令
2. **理解参数含义**：记住参数的单字母含义（如 `-r` 通常是 recursive）
3. **多用 `--help`**：不记得参数时，使用 `命令 --help` 查看帮助
4. **结合 man 手册**：使用 `man 命令名` 查看详细手册（按 `q` 退出）
5. **实践出真知**：在实际项目中应用这些命令，遇到问题再查资料

通过本文的学习，你应该能够：

1. **理解数据流**：类比前端的 `console.log` 与 `console.error`，掌握 stdout、stderr 的重定向与合并
2. **熟练导航与操作文件**：在 macOS 与 Linux 间自如切换，安全地管理项目文件和目录
3. **编辑和处理文本**：使用 `nano`/`vim` 编辑文件，用 `sed` 和 `awk` 批量处理文本数据
4. **理解和管理权限**：读懂 `ls -l` 输出，合理使用 `chmod`/`chown`/`umask`，快速排查 "Permission denied"
5. **有效查看和分析文件**：使用 `less`、`tail -f` 等工具处理前端与后端服务日志
6. **文件归档与压缩**：掌握 `tar`、`gzip`、`zip` 等工具，高效打包和压缩项目文件
7. **利用重定向和管道构建流程**：理解 `>`、`2>`、`2>&1` 和 `|` 的用法，组合出适合自己项目的“命令行流水线”
8. **快速搜索和批量处理**：使用 `grep`/`rg` 搜索代码与日志，用 `find` + `xargs` 或 `fd` 对大量文件做批量操作

**核心思维转变**：将命令行视为一个可以精确控制“数据 + 权限”的环境，而不仅仅是执行单条指令。通过重定向、管道与权限控制，你可以像搭建乐高一样组合简单命令，完成复杂的文本处理、排障与安全加固——无论是在本地开发、调试 Node.js 脚本，还是在远程服务器上分析生产日志，这种能力都会成为你的核心生产力之一。
