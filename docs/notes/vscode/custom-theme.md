---
group:
  title: 技巧
  order: 0
title: 定制主题配色
toc: content
---

## 选择主题插件

> 先选择一款别人制作好的，你比较喜欢的主题插件。然后在这基础上，自己再做细节的微调。

在 `Extensions` 里面搜索关键字 `theme`，一个个试，寻找自己看的最顺眼的插件。

这里以一个名为 `Github Plus Theme` 的主题演示。

把它安装起来，下面就以它为基础，进行界面的定制。

Mac 中 VSCode 插件都是安装在 `/Users/{用户名}/.vscode/extensions/` 目录中的。

## 定制主题插件

VSCode 的界面配色分为两部分：

- 工作台配色 (Workbench colors)，也就是非代码的界面配色。
- 语法配色 (Syntax colors)，也就是代码配色。

这 2 种配色的定制，都是通过修改配置文件 `settings.json` 来实现的。

> **注意**：有两个 `settings.json` 文件，user 和 workspace。

前者是当前用户所有项目的公共配置，后者是当前项目的配置。

建议修改当前的项目配置，这样不影响其他项目。

### 工作台定制配色

打开 workspace 的 `settings.json` 文件，我们可以添加如下的一些配置项：

```json
"workbench.colorCustomizations": {
  "[GitHub Plus]": {
    // activity bar
    "activityBar.border": "#e9e1e1",
    "activityBar.background": "#104057",
    "activityBar.foreground": "#dd447e",
    "activityBar.inactiveForeground": "#6cb8db",
    "activityBarBadge.background": "#d73a49",
    // sideBar bar
    "sideBar.border": "#e7e4e4",
    "sideBar.background": "#ffffff",
    "sideBar.foreground": "#000000",
    "sideBarSectionHeader.background": "#ffffff",
    "sideBarSectionHeader.border": "#e1e1e6",
    // others
    "editorLineNumber.foreground": "#4d5f3c",
    "editorIndentGuide.background": "#e0d6d6",
    "editorIndentGuide.activeBackground": "#ddbebe",
  }
},
```

所有的配置项，见 👉 [官方文档](https://code.visualstudio.com/api/references/theme-color)。

### 代码定制配色

点击打开 workspace 的 `settings.json` 文件，我们可以添加如下的一些配置项：

```json
"editor.tokenColorCustomizations": {
  "[GitHub Plus]": {
    "comments" : {"foreground": "#8a9b99"},
    "numbers": {
      "foreground": "#296fb6",
      "fontStyle": "bold"
    },
    "textMateRules": [
      {
        "scope": [
          "entity.name.type.class",
          "entity.other.inherited-class"
        ],
        "settings": {
            "foreground": "#296fb6",
            "fontStyle": "bold"
        }
      },
      {
        "scope": [
            "meta.definition.method"
        ],
        "settings": {
            "foreground": "#2871bb",
            "fontStyle": "underline"
        }
      },
      {
          "scope": [
            "meta.object-literal.key",
            "variable.other.property"
          ],
          "settings": {
              "foreground": "#296fb6",
          }
      },
      {
          "scope": [
            "variable.parameter"
          ],
          "settings": {
              "foreground": "#b629a3",
              "fontStyle": "italic"
          }
      },
      {
          "scope": [
            // "variable.parameter",
            "variable.other.readwrite",
            "meta.arrow.js"
          ],
          "settings": {
              "foreground": "#06172b"
          }
      },
      {
          "scope": [
              "meta.function-call",
              "entity.name.function"
          ],
          "settings": {
              "foreground": "#2871bb"
          }
      }
    ]
  }
}
```

**配置方法目前支持：**

- 直接写配置 (simple mode)

  ```json
  "comments" : {"foreground": "#8a9b99"},
  "numbers": {
    "foreground": "#296fb6",
    "fontStyle": "bold"
  }
  ```

- 使用 textMateRules 指定 scope 和配色

  输入命令：`Inspect editor`，打开 `scope inspector` 查看某个代码元素是什么 `scope`，如下所示：

  ![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/ts/tut_20200611224023_15.png)

  指定的 `scope` 越小，优先级越高。

**配色的配置目前支持两项：**

- foreground 颜色
- fontStyle 字体

详细的说明，见 👉 [官方文档](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide)。
