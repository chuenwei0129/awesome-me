# 我是如何使用 VsCode 的<!-- omit in toc -->

- [多光标编辑](#多光标编辑)
- [行操作](#行操作)
- [内置插件 Emmet](#内置插件-emmet)
- [vscode 原生高性能括号着色无缝迁移方案](#vscode-原生高性能括号着色无缝迁移方案)
- [自定义 Snippets](#自定义-snippets)
  - [Snippet 语法](#snippet-语法)
    - [制表位(Tabstops)](#制表位tabstops)
    - [占位符(Placeholders)](#占位符placeholders)
    - [选择项(Choice)](#选择项choice)
    - [变量(Variables)](#变量variables)
- [快捷键相关](#快捷键相关)
- [怎么查看 vs 内置了哪些插件](#怎么查看-vs-内置了哪些插件)
- [查看各个扩展的在 VSCode 启动时的加载时间](#查看各个扩展的在-vscode-启动时的加载时间)
- [其他插件](#其他插件)

## 多光标编辑

- 在上面添加光标：`option + command + ⬆️`
- 在下面添加光标：`option + command + ⬇️`
- 添加下一个匹配项：`command + D`
- **选择所有匹配项：`command + shift + L`**

切换为 `option + 单击` 进行多光标功能

## 行操作

- 向上复制一行：`option + shift + ⬆️`
- 向下复制一行：`option + shift + ⬇️`
- 向上移动一行：`option + ⬆️`
- 向下移动一行：`option + ⬇️`
- 光标到页面最底部： `command + ⬇️`

## 内置插件 Emmet

**^ 返回上层**

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


**() 分组**

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

**自定义属性(Custom attributes)**

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

**$编号(Item numbering)**

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

更多语法：https://docs.emmet.io/cheat-sheet/

## vscode 原生高性能括号着色无缝迁移方案

vscode 在最新的 v1.60 版本中原生支持了**高性能**的多层级括号对着色。

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

> vs code 还专门写了博文说介绍他们内置 `Bracket pair colorization` 功能所做的工作：https://code.visualstudio.com/blogs/2021/09/29/bracket-pair-colorization

## 自定义 Snippets

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
- `description `插件描述

### Snippet 语法

#### 制表位(Tabstops)

使用制表位(Tabstops)可是在代码片段中移动光标位置，使用 `$1`, `$2` 来指定光标的位置,数字代表光标的移动的顺序，值得注意的是 `$0` 代表光标的最后位置。如果有多个相同的制表位(Tabstops)会在编译器里同时出现多个光标（类似编译器的块编辑模式）。

#### 占位符(Placeholders)

占位符(Placeholders) 是带默认值的制表位(Tabstops),占位符(Placeholders)的文本会被插入到制表位(Tabstops)所在位置并且全选以方便修改,占位符(Placeholders)可以嵌套使用，比如 `${1:another ${2:placeholder}}`。

#### 选择项(Choice)

占位符(Placeholders)可以有多选值，每个选项的值用 `,` 分隔，选项的开始和结束用管道符号(|)将选项包含，例如: `${1|one,two,three|}`，当插入代码片段，选择制制表位(Tabstops)的时候，会列出选项供用户选择。

#### 变量(Variables)

使用 `$name` 或者 `${name|default}` 可以插入变量的值，如果变量未被赋值则插入 `default` 的值或者空值 。当变量未被定义，则将变量名插入，变量(Variables)将被转换为占位符(Placeholders)

## 快捷键相关

`command + k` + `command + s` 打开键盘快捷方式，点击右上角三个点显示用户键盘绑定，对单个命令右键菜单可显示是否快捷键冲突

- `command + F`：搜索
- `command + option + F`：替换
- `command + shift + F`：在项目内搜索
- `command + Shift + T`：重新打开关闭的编辑页面
- `command + T`：按名称搜索文件
- `ctrl + R`：打开最近的项目
- `ctrl + G`：跳转到某行
- `ctrl + option + l`：选中变量之后，使用这个快捷键生成 `console.log`
- `option + shift + c`：注释所有 `console.log`
- `option + shift + u`：启用所有 `console.log`
- `option + shift + d`：删除所有 `console.log`

## 怎么查看 vs 内置了哪些插件

点击扩展面板右上角第一个筛选图标，选项里就有内置插件

## 查看各个扩展的在 VSCode 启动时的加载时间

你可以通过在 `VSCode` 的命令面板调用命令

```js
>Developer: Show Running Extensions
```

## 其他插件

- [会了吧](https://marketplace.visualstudio.com/items?itemName=mqycn.huile8)：会自动分析源码文件所有包含的单词
- [A-super-translate](https://marketplace.visualstudio.com/items?itemName=xuedao.super-translate)：英语小白必备良药
- [change-case](https://marketplace.visualstudio.com/items?itemName=wmaurer.change-case)：就是给单词(命名)换成不同的风格，写 Redux 时很有用。
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)：vscode 自带的无法处理 jsx 和 vue
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
- [Markdown Preview Github Styling](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-preview-github-styles)：markdown 显示
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


精品文章：https://www.roboleary.net/vscode/2020/08/05/dont-need-extensions.html

主题集合：https://vscodethemes.com/

