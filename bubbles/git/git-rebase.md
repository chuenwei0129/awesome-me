# git rebase 命令

> 这条笔记创建于: 2022 年 10 月 27 日，星期四，23: 31。

## git rebase 作用于分支合并

> rebase 翻译为变基，他的作用和 merge 很相似，用于把一个分支的修改合并到当前分支上。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/b169721a6bfc42a7b4754f7c5d65672d_tplv-k3u1fbpfcp-zoom-in-crop-mark_1304_0_0_0.webp)

## git rebase 交互模式

在开发中，常会遇到在一个分支上产生了很多的无效的提交，这种情况下使用 rebase 的交互式模式可以把已经发生的多次提交压缩成一次提交，得到了一个干净的提交历史，例如某个分支的提交历史情况如下：

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220403-147.png)

进入交互式模式的方式是执行：

```perl
git rebase -i <base-commit>
```

参数 `base-commit` 就是指明操作的基点提交对象，基于这个基点进行 `rebase` 的操作，对于上述提交历史的例子，我们要把最后的一个提交对象（ 8061e866 ）之前的提交压缩成一次提交，我们需要执行的命令格式是：

```perl
git rebase -i 8061e866
```

> TIPS：有时候 `git rebase -i --root` 会很有用

此时会进入一个 vim 的交互式页面，编辑器列出的信息像下列这样。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220403-1c4.png)

想要合并这一堆更改，我们要使用 Squash 策略进行合并，即把当前的 commit 和它的上一个 commit 内容进行合并， 大概可以表示为下面这样，在交互模式的 rebase 下，至少保留一个 pick，否则命令会执行失败。

修改文件后 按下 : 然后 wq 保存退出，此时又会弹出一个编辑页面，这个页面是用来编辑提交的信息，修改为 feat: 变基，最后保存一下

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220403-1be.png)

> 特别注意，只能在自己使用的 feature 分支上进行 rebase 操作，不允许在集成分支上进行 rebase，因为这种操作会修改集成分支的历史记录。

## git merge 和 git rebase 的区别

不同于 `git rebase` 的是，`git merge` 在不是 fast-forward（快速合并）的情况下，会产生一条额外的合并记录，类似 `Merge branch 'xxx' into 'xxx'` 的一条提交信息。

另外，在解决冲突的时候，用 merge 只需要解决一次冲突即可，简单粗暴，而用 rebase 的时候 ，需要依次解决每次的冲突，才可以提交。

## 解决 git rebase 操作后推送远端分支不成功的问题

```perl
git push -f
```
