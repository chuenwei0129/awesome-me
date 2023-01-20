# VS Code 中的双链笔记：Foam 使用体验分享

## 配置笔记库

### 在 GitHub 上建立笔记库

使用 [foam-template-gatsby-kb](https://github.com/hikerpig/foam-template-gatsby-kb) 模版在自己的 GitHub 上建立仓库，可以选择是否将仓库设为私有库。仓库建立后，将其 clone 到本地并在 VSCode 中打开。这样以后就可以通过 GitHub 对你的笔记库进行版本控制，也可以[通过 Github Pages 发布 Foam 笔记](github-pages-foam.md)。

在 VSCode 中打开笔记库根目录后，软件会自动提示安装 Foam 和其他推荐的扩展，可以选择全部或按需安装。

## 初步上手

### 创建新的笔记

要在 Foam 中创建新的笔记，可以使用快捷键 `Ctrl + Shift + P` 打开命令面板，输入并执行 `Foam: Create New Note` 命令，即可在当前文件夹下创建新的笔记文件（`.md` 格式）。当然也可以在侧边栏「资源管理器」面板或者通过快捷键 `Ctrl + N` 实现相应的功能。

> ⚠️ **需要注意的是，因为 Foam 本地化程度有限，不推荐使用中文的文件名，建议使用 `title-case-name` 格式。**

### 创建双向链接

在 Foam 中创建一个双向链接与在其他软件中无异，即使用 `[[]]` 符号。如果被 `[[]]` 包括的文本有对应的笔记，就会成为一个双向链接。当将鼠标移动并悬浮在文本上时，会显示这一条目的预览，可以按下 `Ctrl + 单击` 来打开这条笔记；如果没有对应的笔记，则会创建一个占位符，按下 `Ctrl + Click` 创建可以对应的条目。

Foam 支持标题引用，使用方式为：`[[wikilink#heading]]`，这样便能引用对应条目中该标题下的内容。

### 笔记元数据

使用 Markdown 文档时，在笔记头部使用 YAML 语言格式的字段来定义这个文档的元数据是一个良好的习惯，Foam 也支持这一功能。其格式如下：

```md
---
title: Title Case Name
date: yyyy-mm-dd
type: feature
tags: tag1, tag2, tag3
---
```

title 属性定义了这条笔记的标题和在知识图谱（Graph）上的名称（标识笔记时，优先级为：title 属性 > 正文的一级标题 > 笔记的文件名）。

tags 属性定义这条笔记的标签。多个标签之间用空格或半角逗号分隔。另外也可以通过在笔记正文中使用 `#tag` 来添加标签。Foam 支持多级标签即 `#tag/sub-tag`。

type 属性可以用于在知识图谱中区分笔记的类型，可以将不同 type 属性的笔记用不同颜色表示。

也可以自定义其他的属性，如：日期（date）、作者（author）、来源（source）等。

### 知识图谱

在命令面板执行 `Foam: Show Graph` 命令来打开 Foam 的知识图谱，还可以通过页面右上角的过滤控件进行图谱中显示的节点进行控制。同样支持缩放和拖拽等操作。

![20221024193124](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/ts/20221024193124.png)

### Daily Note

Foam 支持快速记录 Daily Note。在命令面板执行 `Foam: Open Daily Note` 命令，即可创建或打开今日的 Daily Note。在此处可以记录今天的任务、灵感或其他想要记录的内容。Daily Note 格式可以通过模板功能自定义。

在 Daily Note 笔记中，键入 `/` 会显示一些日期建议，通过这种方法可以快速插入指向指定日期的双向链接。

![20221024133419](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/ts/20221024133419.png)

### 侧边栏面板

侧边栏面板包含这几项功能：文件管理、大纲、时间线、标签管理（Tag Explorer）、占位符（Placeholders）、孤立笔记（Orphans）和反向链接（Backlinks）

## 使用代码片段和模板来提高效率

### 代码片段的配置

VSCode 支持用户自定义代码片段（参阅：[[vscode-snippets]])，因此这一功能也可以在 Foam 中使用。在 Foam 笔记库根目录下 **.vscode** 路径创建 `foam-snippets.code-snippets` 文件以创建用户片段（该文件本质上是一个 json 文件）。

```json
{
  "Metadata": {
    "scope": "markdown",
    "prefix": "/meta",
    "description": "创建这条笔记的元数据",
    "body": [
      "---",
      "title: $1",
      "date: $CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE",
      "type: ${2|生活,TODO,思考,知识|}",
      "tags: $3",
      "---"
    ]
  },

  "Time Stamp": {
    "scope": "markdown",
    "prefix": "/time",
    "description": "在此处插入一条时间戳",
    "body": [
      "这条笔记${1|创建,更新|}于: $CURRENT_YEAR 年 $CURRENT_MONTH 月 $CURRENT_DATE 日，$CURRENT_DAY_NAME，$CURRENT_HOUR: $CURRENT_MINUTE。"
    ]
  },

  "Insert task list": {
    "prefix": "/todo",
    "body": ["- [${1| ,x|}] ${2:text}", "${0}"],
    "description": "在此处插入一条待办事项"
  },

  "Insert table": {
    "prefix": "/table",
    "body": [
      "| ${1:Column1}  | ${2:Column2}   | ${3:Column3}   |",
      "|-------------- | -------------- | -------------- |",
      "| ${4:Item1}    | ${5:Item1}     | ${6:Item1}     |",
      "${0}"
    ],
    "description": "Insert table with 2 rows and 3 columns. First row is heading."
  }
}
```

### 创建和使用模板

在 Foam 中也可以创建和使用模板。在命令面板执行 `Foam: Create New template` 命令即可创建模板，以 Daily Note 为例，在模板文件夹路径下创建 `daily-note.md` 文件，便可以开始自定义这一模板。我的 Daily Note 模板定义如下：

```md
---
title: DaiLyNote-${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE}
date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE}
type: 生活
tags: 生活记录
---

# 每日记录：${CURRENT_YEAR} 年 ${CURRENT_MONTH} 月 ${CURRENT_DATE} 日

## 今天的待办事项

> 这条笔记创建于: ${CURRENT_YEAR} 年 ${CURRENT_MONTH} 月 ${CURRENT_DATE} 日，${CURRENT_DAY_NAME}，${CURRENT_HOUR}: $CURRENT_MINUTE。

- [ ] 安然无虞度过这一天
- [ ] 安然无虞度过这一天

## 今天学习了什么

> 这条笔记更新于: ${CURRENT_YEAR} 年 ${CURRENT_MONTH_NAME} 月 ${CURRENT_DATE} 日，${CURRENT_DAY_NAME}，${CURRENT_HOUR}: $CURRENT_MINUTE。

写些什么...

## 有什么值得记录的吗？

写些什么...

## 推迟到之后的内容

> 有时是会有这种事情发生的

写些什么...
```

除此之外，Daily Note 的一些属性也可以在项目的配置文件中修改，如 Daily Note 的存放位置和文件名格式：

```json
"foam.openDailyNote.directory": "journal", // 默认存放在 journal 文件夹
```

## 常见问题

### 插入图片

> [[picgo]]

### 快捷键

![20221024151352](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/ts/20221024151352.png)

### 从网页捕获内容

像其他笔记软件大多提供了剪辑网页内容的功能一样，Foam 也可以保存来自网页的内容：通过 [MarkDownload](https://github.com/deathau/markdownload) 这一浏览器扩展。MarkDownload 可以获取整个网页的主体文本、或只截取想要保存的文本为 Markdown 文件，并为其添加元数据。在扩展选项中可以调整元数据的格式为与 Foam 一致，从而无缝衔接 Foam 笔记库。
