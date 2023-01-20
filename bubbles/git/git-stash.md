# git stash 命令

> 这条笔记创建于: 2022 年 10 月 27 日，星期四，23: 31。

会有这么一个场景，现在你正在用你的 feature 分支上开发新功能。这时，生产环境上出现了一个 bug 需要紧急修复，但是你这部分代码还没开发完，不想提交，怎么办？这个时候可以用 `git stash` 命令先把工作区已经修改的文件暂存起来，然后切换到 hotfix 分支上进行 bug 的修复，修复完成后，切换回 feature 分支，从堆栈中恢复刚刚保存的内容。

基本命令如下

```perl
git stash # 把本地的改动暂存起来
git stash save "message" # 执行存储时，添加备注，方便查找。
git stash pop # 应用最近一次暂存的修改，并删除暂存的记录
git stash apply  # 应用某个存储，但不会把存储从存储列表中删除，默认使用第一个存储，即 stash@{0}，如果要使用其他个，git stash apply stash@{$num}
git stash list # 查看 stash 有哪些存储
git stash clear # 删除所有缓存的 stash
```

例如，我正在开发一个新功能，修改了 `1.js` 文件里的内容，

还没开发完成，这个时候，我想切换到 hotfix 分支上修复 bug，得暂停下开发切换到 hotfix 分支，但是现在工作区还有内容，此时如果切换分支 Git 会报出下面的错误

```perl
error: Your local changes to the following files would be overwritten by checkout:
        1.js
Please commit your changes or stash them before you switch branches.
Aborting
```

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220403-74s.png)

上面那句话的意思就是说工作区有文件修改，不能提交，需要先进行 commit 或者 stash 操作，执行 git stash，结果如下

```perl
Saved working directory and index state WIP on stash: 22e561c feat: add 1.js
```

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220403-76d.png)

此时，我们的工作区已经干净了，可以切换到 hotfix 分支进行 bug 修复的工作，假设我们现在 bug 修复完成了，继续切回 feature 分支进行原本功能的开发，此时只需要执行 `git stash pop`，之前我们暂存的修改就会恢复到工作区，如下图所示

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220403-776.png)

当我们想要暂存文件，切换分支做某些事的时候，可以用 `git stash` 这种机制帮助开发。

> 推荐在使用 stash 的相关命令时，每一次暂存的时候，不要直接使用 `git stash` 命令进行暂存下来，而是使用 `git stash save "message..."` 这种方式，给本次的提交做一个信息的记录。这样，想应用更改的时候，先通过 `git stash list` 查看一下所有的暂存列表。之后，推荐使用 `git stash apply stash@${num}` 的方式进行应用对应的 stash，这样不会清空已有的 stash 的列表项，并且能应用到当前的工作区，不需要这个暂存的话，再手动清除就可以了。
