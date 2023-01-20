# git stage 命令

> 这条笔记创建于: 2022 年 10 月 27 日，星期四，22: 50。

添加文件到暂存区

> git 的 add，是一个容易引起疑问的命令。同时，`git diff --cached` 是比较 stage 的文件的差异的，也是一个不直观的命令。

github 2008 年的 blog 中，也提到，容易引起混淆：

> things like making use of the term ‘stage’ for things that happen in the index (such as using ‘git diff —staged’ instead of ‘git diff —cached’) is being worked on. I’m excited that staging files may soon be done via ‘git stage’ rather-than/in-addition-to ‘git add’. This is nice for new users who often have a hard time seeing why you have to keep ‘git add’ing to stage your changes.

事实上，在 git 的后续版本中，就做了两个修改：

`git stage` 作为 `git add` 的一个同义词

`git diff --staged` 作为 `git diff --cached` 的相同命令

为了容易理解，推荐大家使用 `git stage` 和 `git diff --staged` 这两个命令，而 `git add` 和 `git diff --cached` 这两个命令，仅仅为了保持和以前的兼容做保留。
