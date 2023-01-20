# git pull 命令

> 这条笔记创建于: 2022 年 10 月 27 日，星期四，22: 44。

## git pull 的原理

`git fetch` 会查询所有的远程仓库所包含分支的最新提交，并将其记录到 **.git/FETCH_HEAD** 文件中。

> **.git/FETCH_HEAD** 是一个版本链接，指向着目前已经从远程仓库取下来的所有分支的最新提交。

`git pull` 命令等价于：先执行 `git fetch`，再执行 `git merge FETCH_HEAD` 将远程仓库对应分支的最新提交合并到当前本地分支中。

## git pull 命令中各选项的含义

其中 `git pull` 有这几项常见的选项搭配：

- 不带任何选项的 `git pull` 命令：先尝试快进合并，如果不行再进行正常合并生成一个新的提交。
- `git pull --ff-only` 命令：只尝试快进合并，如果不行则终止当前合并操作。
- `git pull --no-ff` 命令：禁止快进合并，即不管能不能快进合并，最后都会进行正常合并生成一个新的提交。
- `git pull --rebase` 命令：先尝试快进合并，如果不行再进行变基合并。

## 合并两个默认情况下没有共同基础的分支

> **I always see this error if when I create a new Github repository with a README.md, then pull it to a local repository at the first time.**

```perl
git pull origin <branch-name> --allow-unrelated-histories
```

> "git merge" used to allow merging two branches that have no common base by default, which led to a brand new history of an existing project created and then get pulled by an unsuspecting maintainer, which allowed an unnecessary parallel history merged into the existing project. The command has been taught not to allow this by default, with an escape hatch --allow-unrelated-histories option to be used in a rare event that merges histories of two projects that started their lives independently.

## 不建议在没有为偏离分支指定合并策略时执行 pull 操作

当使用 Git 版本为 2.27.0 以上时，使用 `git pull` 命令出现以下的警告：

```perl
warning: Pulling without specifying how to reconcile divergent branches is
discouraged. You can squelch this message by running one of the following
commands sometime before your next pull:

  git config pull.rebase false  # merge (the default strategy)
  git config pull.rebase true   # rebase
  git config pull.ff only       # fast-forward only

You can replace "git config" with "git config --global" to set a default
preference for all repositories. You can also pass --rebase, --no-rebase,
or --ff-only on the command line to override the configured default per
invocation.
```

该警告的中文版本文案描述如下：

```perl
warning: 不建议在没有为偏离分支指定合并策略时执行 pull 操作。
您可以在执行下一次 pull 操作之前执行下面一条命令来抑制本消息：

git config pull.rebase false  # 合并（默认缺省策略）
git config pull.rebase true   # 变基
git config pull.ff only       # 仅快进

您可以将 "git config" 替换为 "git config --global" 以便为所有仓库设置
缺省的配置项。您也可以在每次执行 pull 命令时添加 --rebase、--no-rebase，
或者 --ff-only 参数覆盖缺省设置。
```

**首先理解什么是偏离分支**：

当本地的分支落后于远程分支时，本地分支又自行修改项目文件生成了新的提交，这时本地分支再执行 `git pull` 命令就不能快进合并，并且还容易发生冲突。这时的本地分支便称为偏离分支，因为这时的本地分支的最新提交跟远程分支的最新提交不同，产生了偏离。

**接着理解什么是合并策略**：

合并策略便是 `git merge --ff-only`、`git merge --no-ff`、`git merge --rebase` 这三种常见的合并策略，分别代表着快进合并、非快进普通合并、变基合并。

而我们执行不带任何选项的 `git pull` 命令时，Git 就不知道我们到底想用哪种合并策略来执行 `git pull`，因此 Git 会给出上述的警告文案，建议我们通过 `git config` 命令应该按照这三种合并策略的哪种来执行。

**解决问题**：

- 保持当前的默认合并策略：`git config pull.rebase false`，
因为 `pull.ff` 默认是没有指定的，而没有指定的 `pull.ff` 的默认值与显式指定为 `false` 的效果一致。
- `git pull` 时只接受快进合并和变基合并：`git config pull.ff only`，保证每次执行不带选项的 `git pull` 时要么快进合并成功，要么快进合并失败。如果快进合并失败，再显式执行 `git pull --rebase` 进行变基合并即可。
