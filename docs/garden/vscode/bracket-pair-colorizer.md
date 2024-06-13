---
group:
  title: 技巧
title: 括号着色迁移方案
---

# VSCode 原生高性能括号着色无缝迁移方案

VSCode 在最新的 v1.60 版本中原生支持了**高性能**的多层级括号对着色。

> We implemented this feature to address performance issues of the famous [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2) extension by [CoenraadS](https://github.com/CoenraadS).

多层级括号对着色说明：[High performance bracket pair colorization](https://code.visualstudio.com/updates/v1_60#_high-performance-bracket-pair-colorization)。

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

> VSCode 还专门写了博文说介绍他们内置 `Bracket pair colorization` 功能所做的工作：<https://code.visualstudio.com/blogs/2021/09/29/bracket-pair-colorization>。
