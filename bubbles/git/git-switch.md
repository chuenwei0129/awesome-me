# git switch 命令

> 这条笔记创建于: 2022 年 10 月 27 日，星期四，23: 31。

`git switch` 命令专门用于切换分支，可以用来替代 `checkout` 的部分用途。

**创建并切换到指定分支（ -C 大小写皆可）**：

```perl
git switch -C <new-branch>
```

切换到已有分支：

```perl
git switch <branch>
```

和 `checkout` 一样，`switch` 对工作区是安全的，它会尝试合并工作区和暂存区中的本地更改，如果无法完成合并则会中止操作，本地更改会被保留。

`switch` 的使用方式简单且专一，它无法像 `checkout` 一样对指定提交使用：

```perl
git switch ea4c48a
```

fatal: 期望一个分支，得到提交 'ea4c48a'
