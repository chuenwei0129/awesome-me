---
title: MarkDown 格式语法
---

## 标题

```markdown
# h1

## h2

### h3

#### h4

##### h5

###### h6
```

## 强调

```markdown
_这会是 斜体 的文字_

**这会是 粗体 的文字**

_你也 **组合** 这些符号_

~~这个文字将会被横线删除~~
```

## 列表

### 无序列表

```markdown
- Item 1
- Item 2
  - Item 2a
  - Item 2b
```

### 有序列表

```markdown
1. Item 1
2. Item 2
3. Item 3
   1. Item 3a
   2. Item 3b
```

## 图片

```markdown
![GitHub Logo](/images/logo.png)
格式: ![Alt Text](url)
```

## 链接

```markdown
http://github.com - 自动识别链接
[GitHub](http://github.com)
```

### 链接到同一页面的章节

```markdown
章节: [链接](#链接)
```

## 引用

```markdown
As Kanye West said:

> We're living the future so
> the present is our past.
```

## 代码

```markdown
    ```js
    const arrayMax = arr => Math.max(...arr);
    ```
```

## 任务列表

```markdown
- [x] 完成更改
- [x] 推送提交到 GitHub
- [x] 打开拉取请求
```

## 表格

```sh
|        First Header         | Second Header                |
| :-------------------------: | :--------------------------- |
|     Content from cell 1     | Content from cell 2          |
| Content in the first column | Content in the second column |
```

## 分隔线

如下，三种方式的例子：

```markdown
---
连字符

***

星号

___

下划线
```

## VS Code 插件

- `[Markdown All in One]` [增强 VS Code 中书写 Markdown 的能力](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
- `[Markdown Preview Github Styling]` [使 Markdown 的预览效果保持 GitHub 风格](https://marketplace.visualstudio.com/items?itemName=bierner.github-markdown-preview)

> 使用插件后，打开命令面板 `Markdown All in One: Create Table of Contents` 可以自动生成目录，可使用 `<!-- omit in toc -->` 来忽略不需要生成目录的标题。

## 常用快捷键

|         Key          |          Command          |
| :------------------: | :-----------------------: |
|     Ctrl/Cmd + B     |         切换粗体          |
|     Ctrl/Cmd + I     |         切换斜体          |
| Ctrl/Cmd + Shift + ] |    切换标题 (提升一级)    |
| Ctrl/Cmd + Shift + [ |    切换标题 (降低一级)    |
|     Ctrl/Cmd + M     |       切换数学环境        |
|       Alt + C        | 任务列表项的选中/取消选中 |
| Ctrl/Cmd + Shift + V |       切换预览模式        |
|    Ctrl/Cmd + K V    |     将预览切换到侧边      |
|   Alt + Shift + F    |        表格格式化         |
