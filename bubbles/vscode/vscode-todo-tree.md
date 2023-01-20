# Todo Tree 扩展设置

> 这条笔记创建于: 2022 年 10 月 24 日，星期一，13: 37。

找出代码里所有包含：`TODO` 和 `FIXME` 的注释，并且列在左边面板中，方便你快速定位代码里的 `TODO`。有时候代码不会一次写完，有时候某处只是先用一个临时方案，后面还需要继续完善，这时候人们习惯在注释里加一条 `TODO` 字样，这个插件就是帮你快速列出项目内所有文件还需要完成的任务，避免遗漏某些需要进一步完善的地方。

## 自定义图标

> icon - used to set a different icon in the tree view. Must be a valid octicon (see <https://octicons.github.com>) or codicon (see <https://microsoft.github.io/vscode-codicons/dist/codicon.html>). If using codicons, specify them in the format "$(icon)". The icon defaults to a tick if it's not valid. You can also use "todo-tree", or "todo-tree-filled" if you want to use the icon from the activity view.

## 自定义高亮

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
