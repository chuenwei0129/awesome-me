# 配置 Git 的默认编辑器为 VSCode

> 这条笔记创建于: 2022 年 10 月 24 日，星期一，20: 37。

Git 默认编辑器应该是 Vim，世界上最好的编辑器 🐶，不过最新版的 Git 安装时已经可以选择默认编辑器了。Vim 确实很强大，但对我来说可就要了亲命了，因为重度依赖 VSCode。

**第一步**：确保你已经安装了 VSCode 并且配置了环境变量

**第二步**：配置 core.editor 属性

```perl
git config --global core.editor "code --wait"
```

执行上面的命令后就可以了。但是每次都是以新建一个 tab 页的方式打开编辑器，如果你希望每次都打开一个新窗口，那么就需要加上 `--new-window` 参数。

```perl
git config --global core.editor "code --wait --new-window"
```

如果想恢复 Vim，使用下面命令即可

```perl
git config --global --unset core.editor
```
