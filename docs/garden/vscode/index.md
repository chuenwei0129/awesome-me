---
nav:
  second:
    title: VSCode
    order: 1
group:
  title: 概述
  order: -999
toc: content
---

# VSCode 使用指北

作为一名开发者，选择一个舒适且高效的编辑器环境至关重要。VSCode 以其强大的扩展性和灵活的定制功能，成为了许多开发者的首选。

然而，如何从众多的主题、字体、图标和扩展中挑选出最适合自己的配置，可能是一件让人头疼的事情。在这篇文章中，我将分享我在 VSCode 中使用的主题、字体、图标以及一些高效的扩展，希望能够帮助你打造一个更为高效和愉快的开发环境。

## 🎨 主题

我最常用的 VSCode 主题是 [Vitesse](https://marketplace.visualstudio.com/items?itemName=antfu.theme-vitesse)，且正在使用中。

![20221024174334](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/ts/20221024174334.png)

⭐ 我之前使用过的其他一些主题：

- [GitHub Theme](https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme)
- [Aofuji Light Theme](https://marketplace.visualstudio.com/items?itemName=dsrkafuu.vscode-theme-aofuji)

> 📖 拓展：[VSCode 自定义主题配色](./custom-theme.md)

## ✒ 字体

对代码编辑器来说，另一个重要的事情是字体，我用于代码编辑器的字体是 [FiraCode](https://github.com/tonsky/FiraCode/releases/tag/6.2)。这是带有连字支持的免费字体。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/ts/logo.svg)

## 📁 图标

文件图标增强了 VSCode 的外观，主要是它可以帮助我们通过给定的图标区分不同的文件和文件夹。对于我的 VSCode，我使用两个文件图标：

- [file-icons](https://marketplace.visualstudio.com/items?itemName=file-icons.file-icons) - VSCode 最受欢迎的图标主题之一。
- [Carbon Product Icons](https://marketplace.visualstudio.com/items?itemName=antfu.icons-carbon) - 目前正在使用。

![20221024180447](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/ts/20221024180447.png)

## 💻 扩展

| 扩展                                                                                                                                                             | 功能                             | 备注                                                                 |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | -------------------------------------------------------------------- |
| [bracket-pair-colorizer-2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2)                                               | 彩虹🌈括号                        | [VSCode 原生高性能括号着色无缝迁移方案](./bracket-pair-colorizer.md) |
| [Todo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)                                                                           | 注释标签                         | [Todo Tree 设置](./todo-tree.md)                                     |
| [code-runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner)                                                                     | 快速运行代码                     |                                                                      |
| [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)                                                  | 拼写检查                         |                                                                      |
| [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)                                                                             | 测试接口                         | [REST Client —— 接口测试插件](./rest-client.md)                      |
| [JSON5 syntax](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-json5)                                                                          | 支持注释的 JSON                  |                                                                      |
| [Image preview](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-gutter-preview)                                                         | 图片预览                         |                                                                      |
| [PicGo](https://marketplace.visualstudio.com/items?itemName=Spades.vs-picgo)                                                                                     | 图床工具                         | [VSCode Picgo 插件设置](./picgo.md)                                  |
| [Trailing Spaces](https://marketplace.visualstudio.com/items?itemName=shardulm94.trailing-spaces)                                                                | 多余空格                         |                                                                      |
| [git-commit-plugin](https://marketplace.visualstudio.com/items?itemName=redjue.git-commit-plugin)                                                                | 自动生成 git 提交                |                                                                      |
| [JSON to TS](https://marketplace.visualstudio.com/items?itemName=MariusAlchimavicius.json-to-ts)                                                                 | 将 json 对象转换为 ts 接口       |                                                                      |
| [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)                                                                           | 更好的错误提示                   |                                                                      |
| [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)                                                             | 自动重命名配对的 `HTML/XML` 标签 | [Auto Rename Tag 配置](./auto-rename-tag.md)                         |
| [Foam](https://marketplace.visualstudio.com/items?itemName=foam.foam-vscode)                                                                                     | 双链笔记                         | [VS Code 中的双链笔记：Foam 使用体验分享](./foam.md)                 |
| [CodeMetrics](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-codemetrics)                                                              | 分析代码复杂度                   |                                                                      |
| [JavaScript and TypeScript Nightly](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)                                        | ts 最新版本支持                  |                                                                      |
| [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)                                                             | 图标主题                         |                                                                      |
| [indent-rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow)                                                                     | 彩虹缩进                         |                                                                      |
| [dein Snippets Pack](https://marketplace.visualstudio.com/items?itemName=deinsoftware.dein-snippets-pack)                                                        | js 和 ts 代码片段                |                                                                      |
| [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)                                                            | markdown 书写                    |                                                                      |
| [Markdown Preview Github Styling](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-preview-github-styles)                                    | Github 风格 Markdown 预览        |                                                                      |
| [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)                                                               | markdown 格式检查                |                                                                      |
| [GitHub Copilot Nightly](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-nightly)                                                             | 明明你是 pilot，我才是 copilot   |                                                                      |
| [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)                                    | react 代码片段                   |                                                                      |
| [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)                                                                        | 包大小计算                       |                                                                      |
| [live server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)                                                                         | 本地服务器                       |                                                                      |
| [Mintlify Doc Writer for Python, JavaScript, TypeScript, C++, PHP, Java, C#, Ruby & more](https://marketplace.visualstudio.com/items?itemName=mintlify.document) | AI 注释                          |                                                                      |

## ✔ 技巧

- [VSCode 内置插件 Emmet](./built-in-plugin-emmet.md)
- [VSCode Remote SSH 配置](./remote-ssh.md)
- [VSCode Snippets 设置代码块](./snippets.md)
- [配置 Git 的默认编辑器为 VSCode](./git-default-editor.md)

## ⚙️ 配置

```json
{
  "terminal.integrated.env.osx": {
    "FIG_NEW_SESSION": "1"
  },
  "editor.inlineSuggest.enabled": true,
  "window.commandCenter": true,
  "editor.accessibilitySupport": "off",
  "editor.tabSize": 2,
  "editor.fontSize": 13,
  "editor.lineHeight": 24,
  "editor.fontFamily": "FiraCode, FiraCode Nerd Font, Menlo, Monaco, 'Courier New', monospace",
  "editor.fontLigatures": true,
  "editor.stickyTabStops": true,
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.indentation": true,
  "editor.guides.bracketPairs": false,
  "editor.linkedEditing": true,
  "editor.stickyScroll.enabled": true,
  /* ---------------- 格式化 start ---------------------- */
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    // "source.organizeImports": true,
    "source.fixAll.eslint": true
  },
  "prettier.semi": false,
  "prettier.singleQuote": true,
  "files.insertFinalNewline": true,
  "files.associations": {
    "*.wxss": "css",
    "*.json5": "json",
    "*.cjson": "jsonc",
    "*.wxs": "javascript"
  },
  "javascript.updateImportsOnFileMove.enabled": "always",
  /* ---------------- 格式化 end ---------------------- */
  "emmet.includeLanguages": {
    "vue-html": "html",
    "javascript": "javascriptreact"
  },
  // ****** 分隔符 ******
  "workbench.productIconTheme": "icons-carbon",
  "workbench.iconTheme": "file-icons-colourless",
  "workbench.colorTheme": "Vitesse Light",
  // 工作台配色，也就是非代码的界面配色。
  "workbench.colorCustomizations": {
    "[Vitesse Light]": {}
  },
  // 语法配色，也就是代码的配色。
  "editor.tokenColorCustomizations": {
    "[Vitesse Light]": {
      // 直接写配置，比如下面的配置。
      // "comments" : {"foreground": "#061f1c"},
      // "numbers": {
      //   "foreground": "#296fb6",
      //   "fontStyle": "bold"
      // },
      // 使用 textMateRules 指定 scope 和配色
      // 输入命令：Inspect editor，打开 scope inspector 查看某个代码元素是什么 scope。
      // 指定的 scope越小，优先级越高。
      "textMateRules": [
        {
          "scope": "string.quoted.double.json.comments",
          "settings": {
            "foreground": "#5c6773"
          }
        },
        {
          "scope": "string.quoted.double.tsx",
          "settings": {
            "foreground": "#5c6773"
          }
        }
      ]
    }
  },
  // ****** 分隔符 ******
  "[markdown]": {
    "editor.defaultFormatter": "yzhang.markdown-all-in-one",
    "editor.quickSuggestions": {
      "comments": "on",
      "strings": "on",
      "other": "on"
    }
  },
  "markdownlint.config": {
    "default": true,
    // 第一行必须为一级标题
    "MD025": false,
    // 允许图片无名称
    "MD045": false,
    // 包含 html
    "MD033": false,
    "MD047": false,
    "MD053": false
  },
  // ****** 分隔符 ******
  "git.autofetch": true,
  "git.postCommitCommand": "push",
  "gitlens.mode.active": "zen",
  "gitlens.hovers.currentLine.over": "line",
  "todo-tree.highlights.useColourScheme": true,
  "todo-tree.regex.regexCaseSensitive": false,
  "todo-tree.highlights.customHighlight": {
    "TIPS": {
      "icon": "zap",
      "iconColour": "#00ffaa",
      "gutterIcon": true,
      "foreground": "#33ff00",
      "background": "#ffffff",
      "type": "text"
    }
  },
  "todo-tree.general.tags": [
    "BUG",
    "HACK",
    "FIXME",
    "TODO",
    "XXX",
    "[ ]",
    "[x]",
    "TIPS"
  ],
  "picgo.configPath": "/Users/gakki/Library/Application Support/picgo/data.json",
  "git.confirmSync": false
}
```
