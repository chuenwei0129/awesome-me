# VSCode 因为插件丰富、功能强大被大家喜欢，真是令人烦恼啊<!-- omit in toc -->

***👀 TIPS: 二级标题可返回目录***

---

> ## 目录

- [多光标编辑](#多光标编辑)
- [行操作](#行操作)
- [自定义 Snippets](#自定义-snippets)
  - [Snippet 设置](#snippet-设置)
  - [Snippet 语法](#snippet-语法)
    - [制表位(Tabstops)](#制表位tabstops)
    - [占位符(Placeholders)](#占位符placeholders)
    - [选择项(Choice)](#选择项choice)
    - [变量(Variables)](#变量variables)
- [怎么查看 VSC 内置了哪些插件](#怎么查看-vsc-内置了哪些插件)
- [查看各个扩展的在 VSCode 启动时的加载时间](#查看各个扩展的在-vscode-启动时的加载时间)
- [快捷键相关](#快捷键相关)
- [内置插件 Emmet](#内置插件-emmet)
  - [^ 返回上层](#-返回上层)
  - [() 分组](#-分组)
  - [自定义属性(Custom attributes)](#自定义属性custom-attributes)
  - [$编号(Item numbering)](#编号item-numbering)
- [VSCode 原生高性能括号着色无缝迁移方案](#vscode-原生高性能括号着色无缝迁移方案)
- [Turbo Console Log](#turbo-console-log)
- [Auto Rename Tag](#auto-rename-tag)
  - [Extension](#extension)
  - [Setting](#setting)
- [Todo Tree](#todo-tree)
  - [自定义图标](#自定义图标)
  - [自定义高亮](#自定义高亮)
- [GitHub Repositories](#github-repositories)
- [MetaJump](#metajump)
- [Debug Visualizer](#debug-visualizer)
- [VSCode Remote SSH 配置](#vscode-remote-ssh-配置)
  - [插件安装](#插件安装)
  - [Mac 本地创建密钥对配置 SSH](#mac-本地创建密钥对配置-ssh)
    - [本地客户端](#本地客户端)
    - [远程服务端](#远程服务端)
    - [VSCode 添加远程服务器配置](#vscode-添加远程服务器配置)
  - [腾讯云云服务器创建新密钥对（本质是一样的）](#腾讯云云服务器创建新密钥对本质是一样的)
    - [操作步骤](#操作步骤)
    - [创建 SSH 密钥](#创建-ssh-密钥)
    - [密钥绑定/解绑云服务器](#密钥绑定解绑云服务器)
    - [修改 SSH 密钥名称/描述](#修改-ssh-密钥名称描述)
    - [删除 SSH 密钥](#删除-ssh-密钥)
    - [使用 SSH 登录 Linux 实例](#使用-ssh-登录-linux-实例)
      - [执行以下命令，赋予私钥文件仅本人可读权限](#执行以下命令赋予私钥文件仅本人可读权限)
      - [使用密钥直接登录](#使用密钥直接登录)
      - [通过 config 配置信息登录](#通过-config-配置信息登录)
  - [参考资料](#参考资料)
- [其他插件](#其他插件)
- [相关文章](#相关文章)

## [多光标编辑](#目录)

- 在上面添加光标：`option + command + ⬆️`
- 在下面添加光标：`option + command + ⬇️`
- 添加下一个匹配项：`command + D`
- **选择所有匹配项：`command + shift + L`**

切换为 `option + 单击` 进行多光标功能

## [行操作](#目录)

- 向上复制一行：`option + shift + ⬆️`
- 向下复制一行：`option + shift + ⬇️`
- 向上移动一行：`option + ⬆️`
- 向下移动一行：`option + ⬇️`
- 光标到页面最底部：`command + ⬇️`

## [自定义 Snippets](#目录)

### Snippet 设置

在 `Code > Preferences` 中选择 `User Snippets` 在弹出框里选择对应的代码片段语言

```json
"Print to console": {
    "prefix": "log",
    "body": [
        "console.log('$1');",
        "$2"
    ],
    "description": "Log output to console"
}
```

在打开的 `json` 中有示例代码：

- `Print to console` 代码片段名称
- `prefix` 插件前缀
- `body` 插件内容可以是字符串，也可以为数组，若为数组每个元素都做为单独的一行插入。
- `description` 插件描述

### Snippet 语法

#### 制表位(Tabstops)

使用制表位(Tabstops)可是在代码片段中移动光标位置，使用 `$1`, `$2` 来指定光标的位置,数字代表光标的移动的顺序，值得注意的是 `$0` 代表光标的最后位置。如果有多个相同的制表位(Tabstops)会在编译器里同时出现多个光标（类似编译器的块编辑模式）。

#### 占位符(Placeholders)

占位符(Placeholders) 是带默认值的制表位(Tabstops),占位符(Placeholders)的文本会被插入到制表位(Tabstops)所在位置并且全选以方便修改,占位符(Placeholders)可以嵌套使用，比如 `${1:another ${2:placeholder}}`。

#### 选择项(Choice)

占位符(Placeholders)可以有多选值，每个选项的值用 `,` 分隔，选项的开始和结束用管道符号(|)将选项包含，例如: `${1|one,two,three|}`，当插入代码片段，选择制制表位(Tabstops)的时候，会列出选项供用户选择。

#### 变量(Variables)

使用 `$name` 或者 `${name|default}` 可以插入变量的值，如果变量未被赋值则插入 `default` 的值或者空值 。当变量未被定义，则将变量名插入，变量(Variables)将被转换为占位符(Placeholders)

## [怎么查看 VSC 内置了哪些插件](#目录)

点击扩展面板右上角第一个筛选图标，选项里就有内置插件

## [查看各个扩展的在 VSCode 启动时的加载时间](#目录)

你可以通过在 `VSCode` 的命令面板调用命令

```js
>Developer: Show Running Extensions
```

## [快捷键相关](#目录)

`command + k` + `command + s` 打开键盘快捷方式，点击右上角三个点显示用户键盘绑定，对单个命令右键菜单可显示是否快捷键冲突

- `command + F`：搜索
- `command + option + F`：替换
- **`command + shift + F`：在项目内搜索**
- `command + Shift + T`：重新打开关闭的编辑页面
- `command + T`：按名称搜索文件
- **`ctrl + R`：打开最近的项目**
- `ctrl + G`：跳转到某行

## [内置插件 Emmet](#目录)

### ^ 返回上层

使用 `^` 运算符，您可以爬上树的一个层次，并更改上下文

```sh
div+div>p>span+em^bq
```

表现为：

```html
<div></div>
<div>
    <p><span></span><em></em></p>
    <blockquote></blockquote>
</div>
```

当然了，`^` 也可以多个并用，有几个 `^` 就返回几层

```sh
div+div>p>span+em^^bq
```

表现为：

```html
<div></div>
<div>
    <p><span></span><em></em></p>
</div>
<blockquote></blockquote>
```

这里要注意，最多返回到跟第一个元素同级的，以上面的例子，`^^` 已经返回到了最外层，跟 `^^^` 的效果是一样的。

### () 分组

`()` 操作符对复杂的子元素进行分组，简而言之，每个 `()` 中都是一个独立的子元素

适用于某个子元素比较复杂的情况

```sh
(div>dl>(dt+dd)*3)+footer>p
```

表现为：

```html
<div>
    <dl>
        <dt></dt>
        <dd></dd>
        <dt></dt>
        <dd></dd>
        <dt></dt>
        <dd></dd>
    </dl>
</div>
<footer>
    <p></p>
</footer>
```

使用分组后，可以用一个缩写来生成整个页面，不过不建议这么做。

### 自定义属性(Custom attributes)

可以使用类似 `CSS` 中的符号 `[attr="xxx"]` 向元素添加自定义属性

```sh
div[title="Hello world!" colspan=3]
```

表现为：

```html
<div title="Hello world!" colspan="3"></div>
```

需要说明的是：

方括号内的属性数量不限，如果你喜欢，可以一直加

如果不是默认属性值的话会生成插入占位 比如：`div[title colspan]` 会变成 `<div title="" colspan="">` 前提是编辑器支持这样的写法

属性值可以使用单引号或者双引号都可以，属性值如果不包含空格可以省去引号

### $编号(Item numbering)

操作符可以生成重复元素，而 `$` 可以去元素进行编号。需要将 `$` 放在元素名、属性名或者属性值里

```js
ul>li.item$*5
```

表现为：

```html
<ul>
  <li class="item1"></li>
  <li class="item2"></li>
  <li class="item3"></li>
  <li class="item4"></li>
  <li class="item5"></li>
</ul>
```

如果想实现 `00x` 的格式，该怎么办呢？

可以连写多个 `$` 就可以生成带有前导的编号了

```js
ul>li.item$$$*5
```

表现为：

```html
<ul>
  <li class="item001"></li>
  <li class="item002"></li>
  <li class="item003"></li>
  <li class="item004"></li>
  <li class="item005"></li>
</ul>
```

那如果我想实现降序呢？

使用 `@` 修饰符，可以改变编号的方向以及起点

```js
ul>li.item$@-*5
```

理论上，应该表现为：

```html
<ul>
  <li class="item5"></li>
  <li class="item4"></li>
  <li class="item3"></li>
  <li class="item2"></li>
  <li class="item1"></li>
</ul>
```

如果想改变起点，不从 1 开始，可以使用 `@N` 放在 `$` 后面

```js
ul>li.item$@3*5
```

表现为：

```html
<ul>
  <li class="item3"></li>
  <li class="item4"></li>
  <li class="item5"></li>
  <li class="item6"></li>
  <li class="item7"></li>
</ul>
```

> ⚠️ 注意事项
> 以上所有的语法，都不能出现空格，除非是在特定的括号中。因为 Emmet 在遇到空格时，就认为已经结束，会停止解析。

更多语法：<https://docs.emmet.io/cheat-sheet/>

## [VSCode 原生高性能括号着色无缝迁移方案](#目录)

VSCode 在最新的 v1.60 版本中原生支持了**高性能**的多层级括号对着色。

> We implemented this feature to address performance issues of the famous [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2) extension by [CoenraadS](https://github.com/CoenraadS).

多层级括号对着色说明：[High performance bracket pair colorization](https://code.visualstudio.com/updates/v1_60#_high-performance-bracket-pair-colorization)

可以通过设置 `editor.bracketPairColorization.enabled: true` 启用括号对着色。所有颜色都可主题化，最多可配置六种颜色。

```json
"editor.bracketPairColorization.enabled": true,
"workbench.colorCustomizations": {
  "editorBracketHighlight.foreground1": "#ffd700",
  "editorBracketHighlight.foreground2": "#da70d6",
  "editorBracketHighlight.foreground3": "#87cefa",
  "editorBracketHighlight.foreground4": "#ffd700",
  "editorBracketHighlight.foreground5": "#da70d6",
  "editorBracketHighlight.foreground6": "#87cefa",
  "editorBracketHighlight.unexpectedBracket.foreground": "#ff0000"
},
```

> vs code 还专门写了博文说介绍他们内置 `Bracket pair colorization` 功能所做的工作：<https://code.visualstudio.com/blogs/2021/09/29/bracket-pair-colorization>

## [Turbo Console Log](#目录)

> 自定义快捷键

- `ctrl + option + l`：选中变量之后，使用这个快捷键生成 `console.log`
- `option + shift + c`：注释所有 `console.log`
- `option + shift + u`：启用所有 `console.log`
- `option + shift + d`：删除所有 `console.log`

## [Auto Rename Tag](#目录)

### Extension

- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) (3.3M downloads): “Automatically rename paired HTML/XML tag, same as Visual Studio IDE does.”

### Setting

- `Editor: Linked Editing`: “Controls whether the editor has linked editing enabled. Depending on the language, related symbols, e.g. HTML tags, are updated while editing.” Default is `false`.

> Update 09/01/21 - `editor.renameOnType` is deprecated and is replaced by `editor.linkedEditing`.

Auto-renaming is supported in HTML files only at the moment. There is an [open issue](https://github.com/microsoft/vscode/issues/85707) to add this for JSX files.

The Vetur extension has a [long-standing issue](https://github.com/vuejs/vetur/issues/565) open to add this.

## [Todo Tree](#目录)

找出代码里所有包含：`TODO` 和 `FIXME` 的注释，并且列在左边面板中，方便你快速定位代码里的 `TODO`。 有时候代码不会一次写完，有时候某处只是先用一个临时方案，后面还需要继续完善，这时候人们习惯在注释里加一条 `TODO` 字样，这个插件就是帮你快速列出项目内所有文件还需要完成的任务，避免遗漏某些需要进一步完善的地方。

### 自定义图标

> icon - used to set a different icon in the tree view. Must be a valid octicon (see <https://octicons.github.com>) or codicon (see <https://microsoft.github.io/vscode-codicons/dist/codicon.html>). If using codicons, specify them in the format "$(icon)". The icon defaults to a tick if it's not valid. You can also use "todo-tree", or "todo-tree-filled" if you want to use the icon from the activity view.

### 自定义高亮

```json
"todo-tree.highlights.defaultHighlight": {
    "icon": "alert",
    "type": "text",
    "foreground": "red",
    "background": "white",
    "opacity": 50,
    "iconColour": "blue"
},
"todo-tree.highlights.customHighlight": {
    "TODO": {
        "icon": "check",
        "type": "line"
    },
    "FIXME": {
        "foreground": "black",
        "iconColour": "yellow",
        "gutterIcon": true
    },
    "TIPS": {
        "icon": "zap",
        "iconColour": "#00ffaa",
        "gutterIcon": true,
        "foreground": "#33ff00",
        "background": "#ffffff",
        "type": "text"
    },
}
```

## [GitHub Repositories](#目录)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220331-uuu.png)

打开远程 github 仓库，Open Remote Repository 然后帖任意一个 github 项目的 url 就能打开了：

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220331-ux1.png)

有时候网页上读某个 github 项目的代码太麻烦，全部 clone 下来太费时间，用这个插件就可以快速打开远程仓库，按需请求文件内容，读起代码来飞快。

## [MetaJump](#目录)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220331-vfk.png)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220331-vez.png)

快速光标移动，类似 vim 里的 easymotion，如果你经常使用键盘，那么按 `Option + /` 然后再随便敲一个字母，比如上图中敲了个小写字母 "g" ，然后屏幕内所有出现 "g" 的地方都被蓝色高亮起来，并且上面覆盖了一个快捷字母，再按一下相应字母，就可以直接跳到该处，比如再按一下 "o" 就能跳到 "return g" 的 "g" 字母上。

总共按三次键就可以移动到屏幕内任意地方，用熟了基本指哪打哪。

## [Debug Visualizer](#目录)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/demo.gif)

调试过程可视化是一项非常有价值且急需的功能。

## [VSCode Remote SSH 配置](#目录)

### 插件安装

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/v2-59303a4d9b36ff521a09bee473d95736_1440w.png)

### Mac 本地创建密钥对配置 SSH

#### 本地客户端

在用户主目录下，看看有没有 .ssh 目录，如果有，再看看这个目录下有没有 id_rsa 和 id_rsa.pub 这两个文件，如果已经有了，可直接跳过。如果没有，打开 Shell，创建 SSH Key：

```sh
ssh-keygen -t rsa -C "youremail@example.com"
```

然后一路回车，使用默认值即可，由于这个 Key 也不是用于军事目的，所以也无需设置密码。

如果一切顺利的话，可以在用户主目录里找到 .ssh 目录，里面有 id_rsa 和 id_rsa.pub 两个文件，这两个就是 SSH Key 的秘钥对，id_rsa 是私钥，不能泄露出去，id_rsa.pub 是公钥，可以放心地告诉任何人。

#### 远程服务端

导入公钥到 Ubuntu 服务器

- 这里测试用的服务器地址为：192.168.235.22
- 用户为：root

```sh
ssh-copy-id -i ~/.ssh/id_rsa.pub root@192.168.235.22
```

上面这条命令是写到服务器上的 ssh 目录下去了

```sh
cd ~/.ssh
vim authorized_keys
```

可以看到客户端写入到服务器的 `id_rsa.pub`（公钥）内容。

#### VSCode 添加远程服务器配置

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220401-ff.png)

使用第一步

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/ssh-host.jpg)

使用第二步：进行服务器用户名 + ip 配置即可

> 配置代码大致如下

```sh
# Read more about SSH config files: https://linux.die.net/man/5/ssh_config
Host 107 【随便起的名字】
    HostName x.x.xx.com【IP】
    User 用户名
```

### 腾讯云云服务器创建新密钥对（本质是一样的）

#### 操作步骤

1. [创建 SSH 密钥](#创建-ssh-密钥)。
2. [将 SSH 密钥绑定云服务器](#密钥绑定解绑云服务器)。
3. [使用 SSH 登录 Linux 实例](#使用-ssh-登录-linux-实例)。

#### 创建 SSH 密钥

1. 登录 [云服务器控制台](https://console.cloud.tencent.com/cvm/)。
2. 在左侧导航栏中，单击【[SSH 密钥](https://console.cloud.tencent.com/cvm/sshkey)】。
3. 在 SSH 密钥管理页面，单击【创建密钥】。
4. 在弹出的创建 SSH 密钥窗口中，根据实际需求，选择密钥的创建方式，填写相关信息，并单击【确定】。
    ![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/create_ssh.png)

    - **若创建方式选择 “创建新密钥对”，请输入密钥名称。**
    - 若创建方式选择 “使用已有公钥”，请输入密钥名称和原有的公钥信息。（此法同 Mac 本地配置 SSH 一样）
5. 在弹出的提示框中，单击【下载】，即可下载私钥。

#### 密钥绑定/解绑云服务器

1. 登录 [云服务器控制台](https://console.cloud.tencent.com/cvm/)。
2. 在左侧导航栏中，单击【[SSH 密钥](https://console.cloud.tencent.com/cvm/sshkey)】。
3. 在 SSH 密钥管理页面，勾选需要绑定/解绑云服务器的 SSH 密钥，单击【绑定/解绑实例】。
  ![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/bind_ssh.png)

4. 在弹出的绑定/解绑实例窗口中，选择地域，勾选需绑定/解绑的云服务器，单击【确定】。

#### 修改 SSH 密钥名称/描述

1. 登录 [云服务器控制台](https://console.cloud.tencent.com/cvm/)。
2. 在左侧导航栏中，单击【[SSH 密钥](https://console.cloud.tencent.com/cvm/sshkey)】。
3. 在 SSH 密钥管理页面，勾选需要修改的密钥，单击上方的【修改】。
  ![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/change_ssh.png)
4. 在弹出的修改密钥窗口中，输入新的密钥名称和密钥描述，单击【确定】。

#### 删除 SSH 密钥

> ! 若 SSH 密钥已关联云服务器或已关联自定义镜像，则该密钥不能删除。

1. 登录 [云服务器控制台](https://console.cloud.tencent.com/cvm/)。
2. 在左侧导航栏中，单击【[SSH 密钥](https://console.cloud.tencent.com/cvm/sshkey)】。
3. 在 SSH 密钥管理页面，勾选所有需要删除的 SSH 密钥，单击【删除】。
  ![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/5459959b9bedaa6d0da7d74a0379203d.png)
4. 在弹出的删除密钥窗口中，单击【确定】。

#### 使用 SSH 登录 Linux 实例

##### 执行以下命令，赋予私钥文件仅本人可读权限

```sh
chmod 400 <下载的与云服务器关联的私钥的绝对路径>
```

##### 使用密钥直接登录

执行以下命令，进行远程登录。

```sh
ssh -i <下载的与云服务器关联的私钥的绝对路径> <username>@<hostname or IP address>
```

- `username` 即为前提条件中获得的默认帐号。
- `hostname or IP address` 为您的 Linux 实例公网 IP 或自定义域名。

例如，执行 `ssh -i /Users/gakki/.ssh/mac_ssh_ubuntu.cer ubuntu@192.168.111.18` 命令，远程登录 Linux 云服务器。

##### 通过 config 配置信息登录

进入用户主目录下的 .ssh 目录，按照如下方式修改 config 文件。

```json
Host cvm    // 输入 cvm 实例的名称
HostName 192.*.*.*   // 输入 cvm 实例的公网IP地址
Port 22   // 输入端口号，默认为 22
User root   // 输入登录账号
IdentityFile /Users/gakki/.ssh/mac_ssh_ubuntu.cer // 输入 .pem 私钥文件在本机的地址
```

保存 config 文件。

运行命令连接至实例。

示例如下：

```sh
ssh cvm
```

### 参考资料

- <https://deepzz.com/post/how-to-setup-ssh-config.html>
- <https://blog.csdn.net/myNameIssls/article/details/80516577>

## [其他插件](#目录)

- [change-case](https://marketplace.visualstudio.com/items?itemName=wmaurer.change-case)：就是给单词(命名)换成不同的风格，写 Redux 时很有用。
- [Better Align](https://marketplace.visualstudio.com/items?itemName=wwm.better-align)：更好的对齐方式
- ~~[bracket-pair-colorizer-2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2)：彩虹🌈括号~~
- [Brackets Light Pro](https://marketplace.visualstudio.com/items?itemName=fehey.brackets-light-pro)：颜色主题
- [code-runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner)：快速运行代码
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)：拼写检查
- [CodeMetrics](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-codemetrics)：分析代码复杂度
- [Colorful Comments](https://marketplace.visualstudio.com/items?itemName=ParthR2031.colorful-comments)：更好的注释
- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)：更好的错误提示
- [Image preview](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-gutter-preview)：图片预览
- [indent-rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow)：彩虹缩进
- [JSON5 syntax](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-json5)：支持注释的 JSON
- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)：markdown 书写
- [Markdown Preview Github Styling](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-preview-github-styles)：markdown 风格
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme): 图标主题
- [Package Installer](https://marketplace.visualstudio.com/items?itemName=sketchbuch.vsc-packages)：package.json
- [Paste JSON as Code](https://marketplace.visualstudio.com/items?itemName=quicktype.quicktype)：JSON 转 代码
- [Quokka.js](https://marketplace.visualstudio.com/items?itemName=WallabyJs.quokka-vscode)：代码计算
- [Surround](https://marketplace.visualstudio.com/items?itemName=yatki.vscode-surround)：代码块包裹
- [Tabnine](https://marketplace.visualstudio.com/items?itemName=TabNine.tabnine-vscode)：AI 智能提示
- [Trailing Spaces](https://marketplace.visualstudio.com/items?itemName=shardulm94.trailing-spaces)：多余空格
- [Turbo Console Log](https://marketplace.visualstudio.com/items?itemName=ChakrounAnas.turbo-console-log)：代码调试
- [:emojisense:](https://marketplace.visualstudio.com/items?itemName=bierner.emojisense)：emoji 表情
- [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)：包大小计算
- [live server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)：便捷开发

## [相关文章](#目录)

- VSCode 主题：<https://vscodethemes.com/>
- You don't need that extension：<https://www.roboleary.net/vscode/2020/08/05/dont-need-extensions.html>
- 那些你应该考虑卸载的 VSCode 扩展：<https://zhuanlan.zhihu.com/p/125773296>
- VSCode 有哪些让人眼前一亮的插件：<https://www.zhihu.com/question/311803609>
