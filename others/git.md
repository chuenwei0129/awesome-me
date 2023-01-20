# 怕遗忘 Git 的我，把相关知识点都记录下来就对了<!-- omit in toc -->

## Git 命令备忘录

|                          命令                           |                                                                              功能                                                                               |        备注         |
| :-----------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------: |
|                        git init                         |                                                                初始化本地 git 仓库（创建新仓库）                                                                |                     |
|                      git ls-files                       |                                                                       列出 git 作用的文件                                                                       |                     |
|      git config --global user.name "chuenwei0129"       |                                                                           配置用户名                                                                            |  [#](#git-config)   |
| git config --global user.email "chuenwei0129@gmail.com" |                                                                            配置邮件                                                                             |                     |
|                        git clone                        |                                                                         clone 远程仓库                                                                          |                     |
|                       git status                        |                                                                  查看当前版本状态（是否修改）                                                                   |                     |
|                   git add file1 file2                   |                                                        添加文件到暂存区，后面可以跟多个文件，以空格区分                                                         |                     |
|                        git add .                        |                                                            增加当前子目录下所有更改过的文件至 stage                                                             |                     |
|                   git commit -m 'xxx'                   |                                                                              提交                                                                               |                     |
|               git commit --amend -m 'xxx'               |                                                                 合并上一次提交（用于反复修改）                                                                  |   [[git-commit]]    |
|                  git commit -am 'xxx'                   |                                                                    将 add 和 commit 合为一步                                                                    |                     |
|                       git rm xxx                        |                                                                       删除 stage 中的文件                                                                       |                     |
|                       git rm -r *                       |                                                                            递归删除                                                                             |                     |
|    git show dfb02e6e4f2f7b573337763e5c0013802e392818    |                                                                     显示某个提交的详细内容                                                                      |                     |
|                     git show dfb02                      |                                                                    可只用 commit id 的前几位                                                                    |                     |
|                      git show HEAD                      |                                                                       显示 HEAD 提交日志                                                                        |                     |
|                     git show HEAD^                      |                                             显示 HEAD 的父（上一个版本）的提交日志 ^^ 为上两个版本 ^5 为上 5 个版本                                             |                     |
|               git show master@{yesterday}               |                                                                   显示 master 分支昨天的状态                                                                    |                     |
|                        git diff                         |                                                                  显示所有未添加至 index 的变更                                                                  |                     |
|                    git diff --cached                    |                                                   显示所有已添加 stage 但还未 commit 的变更，--staged 也可以                                                    |                     |
|                     git diff HEAD^                      |                                                                     比较与上一个版本的差异                                                                      |                     |
|                 git diff HEAD -- ./lib                  |                                                                 比较与 HEAD 版本 lib 目录的差异                                                                 |                     |
|             git diff origin/master..master              |                                                       比较远程分支 master 上有，本地分支 master 上没有的                                                        |                     |
|          git diff origin/master..master --stat          |                                                                只显示差异的文件，不显示具体内容                                                                 |                     |
|                       git branch                        |                                                                          显示本地分支                                                                           |                     |
|                      git branch -a                      |                                                                          显示所有分支                                                                           |                     |
|                      git branch -r                      |                                                                        显示所有原创分支                                                                         |                     |
|                   git branch --merged                   |                                                                 显示所有已合并到当前分支的分支                                                                  |                     |
|                 git branch --no-merged                  |                                                                 显示所有未合并到当前分支的分支                                                                  |                     |
|                git branch -m master main                |                                                                          本地分支改名                                                                           |                     |
|              git branch --contains 7aa9486              |                                                                 显示包含 commit 7aa9486 的分支                                                                  |                     |
|             git branch -d hotfixes/BJVEP933             |                                                    删除分支 hotfixes/BJVEP933（本分支修改已合并到其他分支）                                                     |                     |
|             git branch -D hotfixes/BJVEP933             |                                                                 强制删除分支 hotfixes/BJVEP933                                                                  |                     |
|                   git checkout -b dev                   |                                                                 从当前分支创建新分支 dev 并检出                                                                 |  [[git-checkout]]   |
|               git checkout -b master dev                |                                                                          上面的完整版                                                                           |                     |
|                   git checkout master                   |                                                                    检出已存在的 master 分支                                                                     |                     |
|          git checkout --track origin/gh-pages           |                                                         检出远程分支 origin/gh-pages 并创建本地跟踪分支                                                         |                     |
|             git checkout -b dev origin/dev              |                                                            从远程分支 dev 创建新本地分支 dev 并检出                                                             |                     |
|                git checkout -- readme.md                |                                                     检出 HEAD 版本的 readme.md 文件（相当于撤销工作区修改）                                                     |                     |
|                  git switch -C branch                   |                                                             创建并切换到指定分支（ -C 大小写皆可）                                                              |   [[git-switch]]    |
|                    git switch branch                    |                                                                   从当前分支，切换到其他分支                                                                    |                     |
|                         git log                         |                                             显示所有提交过的版本信息，不包括已经被删除的 commit 记录和 reset 的操作                                             |                     |
|                       git log -1                        |                                                                    显示 1 行日志 -n 为 n 行                                                                     |                     |
|                     git log --stat                      |                                                                   显示提交日志及相关变动文件                                                                    |                     |
|                       git reflog                        |                                       显示所有的操作记录，包括提交，回退的操作。一般用来找出操作记录中的版本号，进行回退                                        |                     |
|                   git reset commit_id                   |                                        软重置，只会删除基于当前 commit id 之后的 commit 信息，但相应的文件修改并没有重置                                        |    [[git-reset]]    |
|             git reset --hard HEAD/commit_id             |                                                将当前版本回到 HEAD/commit_id 对应版本（通常用于 merge 失败回退）                                                |                     |
|                 git reset --hard head~N                 |                                                                     回退到上 N 次提交的版本                                                                     |                     |
|                  git revert commit_id                   | 结果类似于 git reset --hard commit_id 但是它不会重置提交历史，而是对此操作重新 commit 一个消息，对 revert 对应的 commit_id 重新 revert 会回到没有 revert 的状态 |                     |
|         git remote add 远程仓库名 远程仓库地址          |                                                                    把本地仓库和远程仓库关联                                                                     |                     |
|                git remote rm 远程仓库名                 |                                                                          删除远程仓库                                                                           |                     |
|                      git remote -v                      |                                                                          查看远程仓储                                                                           |                     |
|                        git fetch                        |                                                         获取所有远程分支（不更新本地分支，另需 merge）                                                          |                     |
|                    git fetch --prune                    |                                                           获取所有原创分支并清除服务器上已删掉的分支                                                            |                     |
|                 git merge origin/master                 |                                                     当前分支与指定分支合并，合并远程 master 分支至当前分支                                                      |                     |
|                 git push origin master                  |                                                               将当前分支 push 到远程 master 分支                                                                |                     |
|                 git push -u origin main                 |                       如果当前分支与多个主机存在追踪关系，那么这个时候 -u 选项会指定一个默认主机，这样后面就可以不加任何参数使用 git push                       |                     |
|                        git push                         |                                                       如果当前分支只有一个追踪分支，那么主机名都可以省略                                                        |                     |
|                   git push origin dev                   |                                                将当前分支推送到 origin 主机的对应分支，如果上游没有就会新建分支                                                 |                     |
|              git push origin -d 远程分支名              |                                                                          删除远程分支                                                                           |                     |
|        git pull 远程主机名 远程分支名:本地分支名        |                                         从远程仓库拉取代码并合并到本地，可简写为 git pull 等同于 git fetch && git merge                                         |    [[git-pull]]     |
|                git stash save "message"                 |                                                      把本地的改动暂存起来，执行存储时，添加备注，方便查找                                                       |    [[git-stash]]    |
|                      git stash pop                      |                                                            应用最近一次暂存的修改，并删除暂存的记录                                                             |                     |
|                     git stash apply                     |                  应用某个存储，但不会把存储从存储列表中删除，默认使用第一个存储，即 stash@{0}，如果要使用其他个，git stash apply stash@{$num}                   |                     |
|                     git stash list                      |                                                                      查看 stash 有哪些存储                                                                      |                     |
|                     git stash clear                     |                                                                      删除所有缓存的 stash                                                                       |                     |
|             git cherry-pick commit1 commit2             |                                                          将 commit1 和 commit2 两个提交应用到当前分支                                                           | [[git-cherry-pick]] |
|            git cherry-pick commit1^..commit2            |                             将 commit1 到 commit2 这个区间的 commit 都应用到当前分支（包含commit1、commit2），commit1 是最早的提交                              |                     |
|                git rebase -i base-commit                |  参数 `base-commit` 就是指明操作的基点提交对象，基于这个基点进行 `rebase` 的操作，`base-commit` 之前的提交对象不会被操作，`base-commit` 之后的提交对象会被操作  |   [[git-rebase]]    |
|                  git rebase -i --root                   |                                                           从头开始 rebase，即从第一个提交开始 rebase                                                            |                     |
|                  git restore [文件名]                   |                                                          同 git checkout -- [文件名] 撤销工作区的修改                                                           |   [[git-restore]]   |
|              git restore [文件名] --staged              |                                                                        撤销暂存区的修改                                                                         |                     |
|                        git stage                        |                                                                     `git add` 的一个同义词                                                                      |    [[git-stage]]    |

## Git 配置 SSH 协议

虽然 Git 可以工作在 ssh 与 https 两种协议上，但为了安全性，更多时候会选择 ssh。

### 操作步骤

#### 1. 生成一个 ssh-key

**执行命令：**

```perl
ssh-keygen -t rsa -C "chuenwei0129@gmail.com"
```

- `-t`: 可选择 dsa | ecdsa | ed25519 | rsa | rsa1，代表加密方式
- `-C`: 注释，一般写自己的邮箱

如果执行成功，切换到 `~/.ssh` 目录下，此时目录应该如下所示。

```perl
.ssh
├── id_rsa
└── id_rsa.pub
```

> id_rsa / id_rsa.pub 配对的私钥与公钥

#### 2. 复制 `id_rsa.pub` 的内容

以 Github 为例，进入 `settings -> SSH and GPG keys` 通过 `cat` 命令查看文件 `id_rsa.pub` 的内容，然后复制过来，点击 `add ssh key`，这一步等于说把你的公钥放到了 Github 上进行托管。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/-k3u1fbpfcp.webp)

#### 3. 全局配置 Git 的用户名和邮箱

```perl
git config --global user.name "chuenwei0129"
git config --global user.email "chuenwei0129@gmail.com"
```

完成以上步骤，就可以愉快 pull 代码开发了。

> 和 https 拉取方式不同的是，https 方式需要每次提交前都手动输入用户名和密码，ssh 的方式配置完毕后，Git 都会使用你本地的私钥和远程仓库的公钥进行验证是否是一对秘钥，从而简化了操作流程。

### No.1 的小秘籍

#### 查看是否有权限

```perl
# -v 详细展示链接过程
ssh -T git@github.com
# Hi chuenwei0129! You've successfully authenticated, but GitHub does not provide shell access.
```

#### 代理问题

```perl
# 这个提示是主要提示是不允许你代理这个 ip 登录 ssh
kex_exchange_identification: Connection closed by remote host
Connection closed by 127.0.0.1 port 7890
```

解决方案就是用 Github 的 443 端口 <https://docs.github.com/en/authentication/troubleshooting-ssh/using-ssh-over-the-https-port> 或者把代理关了

更多讨论：[ssh远程登陆有时候正常，有时候显示：ssh_exchange_identification: Connection closed by remote host，这是什么原因？](https://www.zhihu.com/question/20023544)

### [升级 Ventura 后 git ssh 似乎出了问题](https://www.v2ex.com/t/890332#reply17)

**原因**：苹果系统升级后默认禁用了**用 SHA-1 的哈希算法的 RSA 签名**，因为苹果认为其不安全。

**解决方案：** 在 `~/.ssh/config` 文件中添加如下内容

```perl
HostKeyAlgorithms +ssh-rsa
PubkeyAcceptedKeyTypes +ssh-rsa
```

另外：建议直接换 ed25519 算法，因为它更安全。

> [使用 Ed25519 算法生成你的 SSH 密钥](https://zhuanlan.zhihu.com/p/110413836)

## git config

### 对所有本地仓库的用户信息进行配置

```perl
# 对你的 commit 操作设置关联的用户名
git config --global user.name "chuenwei0129"
# 对你的 commit 操作设置关联的邮箱地址
git config --global user.email "chuenwei0129@gmail.com"
# 启用有帮助的彩色命令行输出
git config --global color.ui auto
```

### 查看 Git 配置

```perl
# 列出当前配置
git config --list
# 列出本地 Repository 配置
git config --local --list
# 列出全局配置
git config --global --list
# 列出系统配置
git config --system --list
```

### 把 Git 的默认主分支 master 修改成 main

1. 将 Git 默认分支改为 main

    ```perl
    git config --global init.defaultBranch main
    ```

2. 修改已创建项目的主分支为 main

    ```perl
    # 把当前 master 分支改名为 main，其中 -M 的意思是移动或者重命名当前分支
    git branch -M main
    ```

### 配置 Git 的默认编辑器为 VSCode

Git 默认编辑器是 Vim，世界上最好的编辑器 🐶，不过最新版的 Git 安装时已经可以选择默认编辑器了。Vim 确实很强大，但对我来说可就要了亲命了，因为重度依赖 VSCode。

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

TODO：拓展：[[vscode-git-default-editor]]

## 配置 git alias 提升工作效率

它的基本用法是 `git config --global alias.<简化的字符> 原始命令`

```perl
git config --global alias.co checkout
git config --global alias.ci commit
# 取消别名
# git config --global --unset alias.ci
```

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220403-7do.png)

这些命令其实是更新你全局的 `.gitconfig` 文件，该文件用来保存全局的 git 配置，你可以直接 `code ~/.gitconfig` 手动添加

```perl
[alias]
st = status -sb
co = checkout
br = branch
mg = merge
cm = commit -m
ds = diff --staged
dt = difftool
mt = mergetool
last = log -1 HEAD
latest = for-each-ref --sort=-committerdate --format=\"%(committername)@%(refname:short) [%(committerdate:short)] %(contents)\"
ls = log --pretty=format:\"%C(yellow)%h %C(blue)%ad %C(red)%d %C(reset)%s %C(green)[%cn]\" --decorate --date=short
hist = log --pretty=format:\"%C(yellow)%h %C(red)%d %C(reset)%s %C(green)[%an] %C(blue)%ad\" --topo-order --graph --date=short
type = cat-file -t
dump = cat-file -p
lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
```

## Git 常用命令备忘录

[[git-cheatsheet]]

## Git 工作区域和流程

[[git-workflow]]

## git commit

[[git-commit]]

## git checkout

[[git-checkout]]

## git pull

[[git-pull]]

### git switch

[[git-switch]]

## git reset

[[git-reset]]

## git restore

[[git-restore]]

## git stage

[[git-stage]]

## git rebase

[[git-rebase]]

## git cherry-pick

[[git-cherry-pick]]

## git stash

[[git-stash]]

## Mac 中 Git 大小写问题

[[git-mac]]

## gitignore 文件

[[git-gitignore]]

## 外部资料

- [git 工作原理与撤销操作图解](https://www.waynerv.com/posts/git-undo-intro/)
- [为什么要先 git add 才能 git commit ？](https://www.zhihu.com/question/19946553)
- [我在工作中是如何使用 Git 的](https://juejin.cn/post/6974184935804534815)
- [高频 Git 面试题](https://zhuanlan.zhihu.com/p/101954895)
- [Git refusing to merge unrelated histories on rebase](https://stackoverflow.com/questions/37937984/git-refusing-to-merge-unrelated-histories-on-rebase)
- [不建议在没有为偏离分支指定合并策略时执行pull 操作](https://blog.csdn.net/wq6ylg08/article/details/114106272)
