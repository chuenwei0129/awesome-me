# 基本撰写和格式语法<!-- omit in toc -->

- [标题](#标题)
- [强调](#强调)
- [列表](#列表)
  - [无序列表](#无序列表)
  - [有序列表](#有序列表)
- [图片](#图片)
- [链接](#链接)
- [引用](#引用)
- [代码](#代码)
- [任务列表](#任务列表)
- [使用表情符号](#使用表情符号)
- [表格](#表格)
- [分隔线](#分隔线)
- [VS Code 插件](#vs-code-插件)
- [常用快捷键](#常用快捷键)

## 标题

```md
# h1

## h2

### h3

#### h4

##### h5

###### h6
```

## 强调

```md
_这会是 斜体 的文字_
_这会是 斜体 的文字_

**这会是 粗体 的文字**
**这会是 粗体 的文字**

_你也 **组合** 这些符号_

~~这个文字将会被横线删除~
```

## 列表

### 无序列表

```md
- Item 1
- Item 2
  - Item 2a
  - Item 2b
```

### 有序列表

```md
1. Item 1
2. Item 2
   1. Item 3a
   2. Item 3b
```

## 图片

```md
![GitHub Logo](/images/logo.png)
Format: ![Alt Text](url)
```

## 链接

```md
http://github.com - automatic!
[GitHub](http://github.com)
章节: [链接](#链接)
```

## 引用

```md
As Kanye West said:

> We're living the future so
> the present is our past.
```

## 代码

将 `Math.max()` 与扩展运算符 (`...`) 结合使用以获取数组中的最大值。

````md
    ```js
    const arrayMax = arr => Math.max(...arr);
    // arrayMax([10, 1, 5]) -> 10
    ```
````

## 任务列表

```md
- [x] 完成更改
- [x] 推送提交到 GitHub
- [x] 打开拉取请求
```

## 使用表情符号

:+1: 通过键入 `:EMOJICODE:` 可在您的写作中添加表情符号。

```md
@octocat :+1: 这个 PR 看起来很棒 - 可以合并了！
```

## 表格

```md
|        First Header         | Second Header                |
| :-------------------------: | :--------------------------- |
|     Content from cell 1     | Content from cell 2          |
| Content in the first column | Content in the second column |
```

## 分隔线

如下，三个或者更多的

```md
---
连字符
---

星号

---

下划线
```

## VS Code 插件

- `[Markdown All in One]` [增强 VS Code 中书写 Markdown 的能力](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
- `[Markdown Preview Github Styling]` [使 Markdown 的预览效果保持 github 风格](https://marketplace.visualstudio.com/items?itemName=bierner.github-markdown-preview)

> 使用插件后，打开命令面板 `Markdown All in one 创建目录` 可以自动生成目录，可使用 `<!-- omit in toc -->` 来忽略不需要的生成目录的标题。

## 常用快捷键

|         Key          |           Command            |
| :------------------: | :--------------------------: |
|     Ctrl/Cmd + B     |         Toggle bold          |
|     Ctrl/Cmd + I     |        Toggle italic         |
| Ctrl/Cmd + Shift + ] |   Toggle heading (uplevel)   |
| Ctrl/Cmd + Shift + [ |  Toggle heading (downlevel)  |
|     Ctrl/Cmd + M     |   Toggle math environment    |
|       Alt + C        | Check/Uncheck task list item |
| Ctrl/Cmd + Shift + V |        Toggle preview        |
|    Ctrl/Cmd + K V    |    Toggle preview to side    |
|   Alt + Shift + F    |       Table formatter        |
