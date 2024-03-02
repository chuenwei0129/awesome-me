# 怕遗忘 git 的我，把相关知识点都记录下来就对了<!-- omit in toc -->

- [使用 SSH 提交代码](#使用-ssh-提交代码)
  - [前提](#前提)
  - [操作](#操作)
    - [1. 生成一个 ssh-key](#1-生成一个-ssh-key)
    - [2. 复制 `id_rsa.pub` 的内容](#2-复制-id_rsapub-的内容)
    - [3. 全局配置 Git 的用户名和邮箱](#3-全局配置-git-的用户名和邮箱)
    - [4. 查看是否成功配置了 SSH](#4-查看是否成功配置了-ssh)
  - [踩坑](#踩坑)
    - [Github 仓库中的 commit 不显示自己的头像](#github-仓库中的-commit-不显示自己的头像)
    - [代理](#代理)
    - [升级 Ventura 后 git ssh 似乎出了问题](#升级-ventura-后-git-ssh-似乎出了问题)
- [Git 工作原理](#git-工作原理)
  - [Git 的三种状态](#git-的三种状态)
    - [工作区](#工作区)
    - [暂存区](#暂存区)
    - [提交历史](#提交历史)
  - [分支](#分支)
- [Git 基本操作](#git-基本操作)
  - [git config](#git-config)
    - [对所有本地仓库的用户信息进行配置](#对所有本地仓库的用户信息进行配置)
    - [查看 Git 配置](#查看-git-配置)
    - [把 Git 的默认主分支 master 修改成 main](#把-git-的默认主分支-master-修改成-main)
    - [配置 Git 的默认编辑器为 VSCode](#配置-git-的默认编辑器为-vscode)
    - [配置 git alias 提升工作效率](#配置-git-alias-提升工作效率)
  - [git stage](#git-stage)
    - [git add](#git-add)
  - [git commit](#git-commit)
- [Git Cheat Sheet](#git-cheat-sheet)
- [Git 飞行规则](#git-飞行规则)
- [Github 工作流](#github-工作流)
- [Git 命令备忘录](#git-命令备忘录)
- [git checkout](#git-checkout)
- [git pull](#git-pull)
  - [git pull 原理](#git-pull-原理)
  - [git pull 命令中各选项的含义](#git-pull-命令中各选项的含义)
  - [合并两个默认情况下没有共同基础的分支](#合并两个默认情况下没有共同基础的分支)
  - [不建议在没有为偏离分支指定合并策略时执行 pull 操作](#不建议在没有为偏离分支指定合并策略时执行-pull-操作)
- [git reset](#git-reset)
- [git restore](#git-restore)
- [git rebase](#git-rebase)
  - [git rebase 作用于分支合并](#git-rebase-作用于分支合并)
  - [git rebase 交互模式](#git-rebase-交互模式)
- [git cherry-pick](#git-cherry-pick)
- [git stash](#git-stash)
- [git switch](#git-switch)
- [Mac 中 Git 大小写问题](#mac-中-git-大小写问题)
  - [问题](#问题)
  - [案例](#案例)
    - [问题复现](#问题复现)
    - [解决问题](#解决问题)
- [gitignore](#gitignore)
- [Git 工作区域和工作流程](#git-工作区域和工作流程)
  - [工作区域](#工作区域)
  - [工作流程](#工作流程)
- [参考资料](#参考资料)

## 使用 SSH 提交代码

### 前提

**远程仓库**一般支持两种协议：SSH 和 HTTPS，**SSH 协议只认机器，HTTPS 协议只认账号**；也即为：如果使用 SSH 操作远程仓库的话，我们需要使用公钥和私钥对来做权限的认证，如果使用 HTTPS 操作远程仓库，则需要使用账号密码来做权限的认证。

无论是公钥私钥对，还是账号密码，都只做权限的认证；但是**远程仓库里需要记录这些提交记录是由谁来完成的**；所以我们需要给本地的 Git 设置用户名和邮箱，用于从本地仓库向远程仓库提交记录时，在远程仓库记录下这些操作是由谁来完成的。

### 操作

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

因为 Git 是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和 email 地址（名字和邮箱都不会进行验证），这样远程仓库才知道哪次提交是由谁完成的。

```perl
git config --global user.name "chuenwei0129"
git config --global user.email "chuenwei0129@gmail.com"
```

**配置的用户名和邮箱对 push 代码到远程仓库时的身份验证没有作用，即不用他们进行身份验证**；他们仅仅会出现在远程仓库的 commits 里。

#### 4. 查看是否成功配置了 SSH

完成以上步骤，就可以愉快使用 SSH 提交代码了。

```perl
# -v 详细展示链接过程
ssh -T git@github.com
# Hi chuenwei0129! You've successfully authenticated, but GitHub does not provide shell access.
```

### 踩坑

#### Github 仓库中的 commit 不显示自己的头像

Github 官方给出了一个[官方文件](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile)，告诉我们 commit 被记入 contribution 中必须满足用于 commit 的邮件地址必须与 Github 账户相关联，**本地配置的用户名和邮箱地址只有与创建 Github 时的邮箱和地址相同时**，每次往 Github 上 commit 时，Github 才会识别出 commit 的是你本人，此时这次 commit 才会被记入 contribution。

#### 代理

```perl
# 这个提示是主要提示是不允许你代理这个 ip 登录 ssh
kex_exchange_identification: Connection closed by remote host
Connection closed by 127.0.0.1 port 7890
```

解决方案就是用 Github 的 443 端口 <https://docs.github.com/en/authentication/troubleshooting-ssh/using-ssh-over-the-https-port> 或者把代理关了。

更多讨论：[ssh远程登陆有时候正常，有时候显示：ssh_exchange_identification: Connection closed by remote host，这是什么原因？](https://www.zhihu.com/question/20023544)

#### [升级 Ventura 后 git ssh 似乎出了问题](https://www.v2ex.com/t/890332#reply17)

**原因**：苹果系统升级后默认禁用了**用 SHA-1 的哈希算法的 RSA 签名**，因为苹果认为其不安全。

**解决方案：** 在 `~/.ssh/config` 文件中添加如下内容

```perl
HostKeyAlgorithms +ssh-rsa
PubkeyAcceptedKeyTypes +ssh-rsa
```

另外：建议直接换 ed25519 算法，因为它更安全。

> [使用 Ed25519 算法生成你的 SSH 密钥](https://zhuanlan.zhihu.com/p/110413836)

## Git 工作原理

### Git 的三种状态

这三种状态分别是：

- 工作区（Working Directory）
- 暂存区（Staging Index）
- 提交历史（Commit History）

#### 工作区

工作区，就是平时进行开发改动的地方，是当前看到最新的内容，在开发的过程也就是对工作区的操作。

> 我们可以把它当成一个沙盒，在其中随意地添加或编辑文件，然后再将修改后的文件添加到暂存区并记录到提交历史中。
>
> Git 可以把工作区中的文件处理、压缩成一个提交对象，也能将取得的提交对象解包成文件同步到工作区中。

#### 暂存区

> [为什么要先 git add 才能 git commit？](https://www.zhihu.com/question/19946553)

暂存区（Stage），当执行 `git add` 的命令后，工作区的文件就会被移入暂存区，**暂存区标记了当前工作区中那些内容是被 Git 管理的**，当完成某个需求或者功能后需要提交代码，第一步就是通过 `git add` 先提交到暂存区。

  1. Git 把它作为工作区与提交历史之间的中间区域，方便我们对提交内容进行组织：
     1. 我们可能会在工作区同时更改多个完全不相干的文件，这时可以将它们分别放入暂存区，并在不同的提交中加入提交历史。

     2. 此外暂存区还用于合并冲突时存放文件的不同版本。

  2. **除非是一个刚刚初始化的 Git 仓库，否则暂存区并不是空的**，它会填充最近一次提交所对应的文件快照，因此当我们基于最近一次提交在工作区做了一些修改之后，`git status` 会将工作区的文件与暂存区的文件快照进行对比，并提示我们有哪些做了修改的文件尚未加入暂存区。

  3. 暂存区并不像工作区有可见的文件系统目录，或者像提交历史一样通过 .git/objects 目录保存着所有提交对象，它没有实际存在的目录或文件夹，它的实体是位于 .git 目录的 index 文件。index 是一个二进制文件，包含着一个由路径名称、权限和 blob 对象的 SHA-1 值组成的有序列表。可以通过 `git ls-files` 命令查看 index 中的内容：

     ![20240302144341](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240302144341.png)

     index 中记录了暂存区文件的路径名称和 SHA-1 ID，文件内容已经作为 blob 对象保存到了 .git/objects 目录中。

#### 提交历史

提交历史是工作区文件在不同时间的文件快照（快照即文件或文件夹在特定时间点的状态，包括内容和元信息）。

我们可以通过 `git log` 命令查看当前分支的提交历史：

![20240302144553](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240302144553.png)

### 分支

Git 分支的本质：**一个指向某一系列提交之首的指针或引用**。

我们用 HEAD 来指向最近的一次提交，HEAD 文件通常是一个符号引用（symbolic reference），指向目前所在的分支。所谓符号引用，表示它是一个指向其他引用的引用：

![20240302150251](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240302150251.png)

**当我们 `git checkout` 一个分支或提交时，它会修改 HEAD 指向新的分支引用或提交，将暂存区填充为该次提交的文件快照，然后将暂存区的内容解包复制到工作区中。**

## Git 基本操作

### git config

#### 对所有本地仓库的用户信息进行配置

```perl
# 对你的 commit 操作设置关联的用户名
git config --global user.name "chuenwei0129"
# 对你的 commit 操作设置关联的邮箱地址
git config --global user.email "chuenwei0129@gmail.com"
# 启用有帮助的彩色命令行输出
git config --global color.ui auto
```

#### 查看 Git 配置

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

#### 把 Git 的默认主分支 master 修改成 main

1. 将 Git 默认分支改为 main

    ```perl
    git config --global init.defaultBranch main
    ```

2. 修改已创建项目的主分支为 main

    ```perl
    # 把当前 master 分支改名为 main，其中 -M 的意思是移动或者重命名当前分支
    git branch -M main
    ```

#### 配置 Git 的默认编辑器为 VSCode

Git 默认编辑器是 vim，不过最新版的 Git 安装时已经可以选择默认编辑器了。

**第一步**：确保你已经安装了 VSCode 并且配置了环境变量

**第二步**：配置 core.editor 属性

```perl
git config --global core.editor "code --wait"
```

执行上面的命令后就可以了。但是每次都是以新建一个 tab 页的方式打开编辑器，如果你希望每次都打开一个新窗口，那么就需要加上 `--new-window` 参数。

```perl
git config --global core.editor "code --wait --new-window"
```

如果想恢复 vim，使用下面命令即可

```perl
git config --global --unset core.editor
```

#### 配置 git alias 提升工作效率

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

### git stage

#### git add

> git 的 add，是一个容易引起疑问的命令。同时，`git diff --cached` 是比较 stage 的文件的差异的，也是一个不直观的命令。

github 2008 年的 blog 中，也提到，容易引起混淆：

> things like making use of the term ‘stage’ for things that happen in the index (such as using ‘git diff —staged’ instead of ‘git diff —cached’) is being worked on. I’m excited that staging files may soon be done via ‘git stage’ rather-than/in-addition-to ‘git add’. This is nice for new users who often have a hard time seeing why you have to keep ‘git add’ing to stage your changes.

事实上，在 git 的后续版本中，就做了两个修改：

`git stage` 作为 `git add` 的一个同义词

`git diff --staged` 作为 `git diff --cached` 的相同命令

为了容易理解，推荐大家使用 `git stage` 和 `git diff --staged` 这两个命令，而 `git add` 和 `git diff --cached` 这两个命令，仅仅为了保持和以前的兼容做保留。




### git commit

有时候我们提交完了才发现漏掉了几个文件没有添加，或者提交信息写错了。此时，可以运行带有 `--amend` 选项的提交命令来重新提交：

```perl
git commit --amend
```

例如，你提交后发现忘记了暂存某些需要的修改，可以像下面这样操作：

```perl
git commit -m 'initial commit'
git add forgotten_file
git commit --amend
# 会进入编辑器，可将第一次提交的提交信息修改为第二次提交的提交信息
```

最终你只会有一个提交 —— 第二次提交将代替第一次提交的结果。





## Git Cheat Sheet

> [Git Cheat Sheet](https://shfshanyue.github.io/cheat-sheets/git)

## Git 飞行规则

> [Git 飞行规则](https://github.com/k88hudson/git-flight-rules/blob/master/README_zh-CN.md)

## Github 工作流

> [十分钟学会正确的 Github 工作流，和开源作者们使用同一套流程](https://www.bilibili.com/video/BV19e4y1q7JJ)

1. `git clone`
2. `git switch -c xxx` 切换至新分支 xxx
3. 修改代码
4. `git diff` 查看自己对代码做出的改变
5. `git stage .` 上传更新后的代码至暂存区
6. `git commit -m 'xxxxxx'` 可以将暂存区里更新后的代码更新到本地 git
7. `git push origin xxx` 将本地的 xxx 分支上传至 github
8. 假设远端 GitHub 上 main 代码出现改变
9. `git switch main` 切换回本地 `main` 分支
10. `git pull origin main` 将远端修改过的代码再更新到本地
11. `git switch xxx` 回到 xxx 分支
12. `git rebase main` 手动 merge main 分支代码
13. `git push -f origin xxx` 把 rebase 后并且更新过的代码再 push 到远端 github 上
14. github 仓库 pull request 合并 commit 完成远端代码更新，并且删除远端的 xxx 分支
15. `git branch -d xxx` 删除本地的 git 分支
16. `git pull origin main` 再把远端的最新代码拉至本地

## Git 命令备忘录

|                       命令                        |                                                                              功能                                                                               |         备注          |
| :-----------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------: |
|                     git init                      |                                                                初始化本地 git 仓库（创建新仓库）                                                                |                       |
|                   git ls-files                    |                                                                       列出 git 作用的文件                                                                       |                       |
|            git config --global --list             |                                                                      查看 git 全局配置文件                                                                      |   [#](#git-config)    |
|                     git clone                     |                                                                         clone 远程仓库                                                                          |                       |
|                    git status                     |                                                                  查看当前版本状态（是否修改）                                                                   |                       |
|                git add file1 file2                |                                                        添加文件到暂存区，后面可以跟多个文件，以空格区分                                                         |                       |
|                     git add .                     |                                                            增加当前子目录下所有更改过的文件至 stage                                                             |                       |
|                git commit -m 'xxx'                |                                                                              提交                                                                               |                       |
|            git commit --amend -m 'xxx'            |                                                                 合并上一次提交（用于反复修改）                                                                  |   [#](#git-commit)    |
|               git commit -am 'xxx'                |                                                                    将 add 和 commit 合为一步                                                                    |                       |
|                    git rm xxx                     |                                                                       删除 stage 中的文件                                                                       |                       |
|                    git rm -r *                    |                                                                            递归删除                                                                             |                       |
| git show dfb02e6e4f2f7b573337763e5c0013802e392818 |                                                                     显示某个提交的详细内容                                                                      |                       |
|                  git show dfb02                   |                                                                    可只用 commit id 的前几位                                                                    |                       |
|                   git show HEAD                   |                                                                       显示 HEAD 提交日志                                                                        |                       |
|                  git show HEAD^                   |                                             显示 HEAD 的父（上一个版本）的提交日志 ^^ 为上两个版本 ^5 为上 5 个版本                                             |                       |
|            git show master@{yesterday}            |                                                                   显示 master 分支昨天的状态                                                                    |                       |
|                     git diff                      |                                                                  显示所有未添加至 index 的变更                                                                  |                       |
|                 git diff --cached                 |                                                   显示所有已添加 stage 但还未 commit 的变更，--staged 也可以                                                    |                       |
|                  git diff HEAD^                   |                                                                     比较与上一个版本的差异                                                                      |                       |
|              git diff HEAD -- ./lib               |                                                                 比较与 HEAD 版本 lib 目录的差异                                                                 |                       |
|          git diff origin/master..master           |                                                       比较远程分支 master 上有，本地分支 master 上没有的                                                        |                       |
|       git diff origin/master..master --stat       |                                                                只显示差异的文件，不显示具体内容                                                                 |                       |
|                    git branch                     |                                                                          显示本地分支                                                                           |                       |
|                   git branch -a                   |                                                                          显示所有分支                                                                           |                       |
|                   git branch -r                   |                                                                        显示所有原创分支                                                                         |                       |
|                git branch --merged                |                                                                 显示所有已合并到当前分支的分支                                                                  |                       |
|              git branch --no-merged               |                                                                 显示所有未合并到当前分支的分支                                                                  |                       |
|             git branch -m master main             |                                                                          本地分支改名                                                                           |                       |
|           git branch --contains 7aa9486           |                                                                 显示包含 commit 7aa9486 的分支                                                                  |                       |
|          git branch -d hotfixes/BJVEP933          |                                                    删除分支 hotfixes/BJVEP933（本分支修改已合并到其他分支）                                                     |                       |
|          git branch -D hotfixes/BJVEP933          |                                                                 强制删除分支 hotfixes/BJVEP933                                                                  |                       |
|                git checkout -b dev                |                                                                 从当前分支创建新分支 dev 并检出                                                                 |  [#](#git-checkout)   |
|            git checkout -b master dev             |                                                                          上面的完整版                                                                           |                       |
|                git checkout master                |                                                                    检出已存在的 master 分支                                                                     |                       |
|       git checkout --track origin/gh-pages        |                                                         检出远程分支 origin/gh-pages 并创建本地跟踪分支                                                         |                       |
|          git checkout -b dev origin/dev           |                                                            从远程分支 dev 创建新本地分支 dev 并检出                                                             |                       |
|             git checkout -- readme.md             |                                                     检出 HEAD 版本的 readme.md 文件（相当于撤销工作区修改）                                                     |                       |
|               git switch -C branch                |                                                             创建并切换到指定分支（ -C 大小写皆可）                                                              |   [#](#git-switch)    |
|                 git switch branch                 |                                                                   从当前分支，切换到其他分支                                                                    |                       |
|                      git log                      |                                             显示所有提交过的版本信息，不包括已经被删除的 commit 记录和 reset 的操作                                             |                       |
|                    git log -1                     |                                                                    显示 1 行日志 -n 为 n 行                                                                     |                       |
|                  git log --stat                   |                                                                   显示提交日志及相关变动文件                                                                    |                       |
|                    git reflog                     |                                       显示所有的操作记录，包括提交，回退的操作。一般用来找出操作记录中的版本号，进行回退                                        |                       |
|                git reset commit_id                |                                        软重置，只会删除基于当前 commit id 之后的 commit 信息，但相应的文件修改并没有重置                                        |    [#](#git-reset)    |
|          git reset --hard HEAD/commit_id          |                                                将当前版本回到 HEAD/commit_id 对应版本（通常用于 merge 失败回退）                                                |                       |
|              git reset --hard head~N              |                                                                     回退到上 N 次提交的版本                                                                     |                       |
|               git revert commit_id                | 结果类似于 git reset --hard commit_id 但是它不会重置提交历史，而是对此操作重新 commit 一个消息，对 revert 对应的 commit_id 重新 revert 会回到没有 revert 的状态 |                       |
|      git remote add 远程仓库名 远程仓库地址       |                                                                    把本地仓库和远程仓库关联                                                                     |                       |
|             git remote rm 远程仓库名              |                                                                          删除远程仓库                                                                           |                       |
|                   git remote -v                   |                                                                          查看远程仓储                                                                           |                       |
|                     git fetch                     |                                                         获取所有远程分支（不更新本地分支，另需 merge）                                                          |                       |
|                 git fetch --prune                 |                                                           获取所有原创分支并清除服务器上已删掉的分支                                                            |                       |
|              git merge origin/master              |                                                     当前分支与指定分支合并，合并远程 master 分支至当前分支                                                      |                       |
|              git push origin master               |                                                               将当前分支 push 到远程 master 分支                                                                |                       |
|              git push -u origin main              |                       如果当前分支与多个主机存在追踪关系，那么这个时候 -u 选项会指定一个默认主机，这样后面就可以不加任何参数使用 git push                       |                       |
|                     git push                      |                                                       如果当前分支只有一个追踪分支，那么主机名都可以省略                                                        |                       |
|                git push origin dev                |                                                将当前分支推送到 origin 主机的对应分支，如果上游没有就会新建分支                                                 |                       |
|           git push origin -d 远程分支名           |                                                                          删除远程分支                                                                           |                       |
|     git pull 远程主机名 远程分支名:本地分支名     |                                         从远程仓库拉取代码并合并到本地，可简写为 git pull 等同于 git fetch && git merge                                         |    [#](#git-pull)     |
|             git stash save "message"              |                                                      把本地的改动暂存起来，执行存储时，添加备注，方便查找                                                       |    [#](#git-stash)    |
|                   git stash pop                   |                                                            应用最近一次暂存的修改，并删除暂存的记录                                                             |                       |
|                  git stash apply                  |                  应用某个存储，但不会把存储从存储列表中删除，默认使用第一个存储，即 stash@{0}，如果要使用其他个，git stash apply stash@{$num}                   |                       |
|                  git stash list                   |                                                                      查看 stash 有哪些存储                                                                      |                       |
|                  git stash clear                  |                                                                      删除所有缓存的 stash                                                                       |                       |
|          git cherry-pick commit1 commit2          |                                                          将 commit1 和 commit2 两个提交应用到当前分支                                                           | [#](#git-cherry-pick) |
|         git cherry-pick commit1^..commit2         |                             将 commit1 到 commit2 这个区间的 commit 都应用到当前分支（包含commit1、commit2），commit1 是最早的提交                              |                       |
|             git rebase -i base-commit             |  参数 `base-commit` 就是指明操作的基点提交对象，基于这个基点进行 `rebase` 的操作，`base-commit` 之前的提交对象不会被操作，`base-commit` 之后的提交对象会被操作  |   [#](#git-rebase)    |
|               git rebase -i --root                |                                                           从头开始 rebase，即从第一个提交开始 rebase                                                            |                       |
|               git restore [文件名]                |                                                          同 git checkout -- [文件名] 撤销工作区的修改                                                           |   [#](#git-restore)   |
|           git restore [文件名] --staged           |                                                                        撤销暂存区的修改                                                                         |                       |
|                     git stage                     |                                                                     `git add` 的一个同义词                                                                      |    [#](#git-stage)    |





## git checkout

```perl
git checkout -- [文件名]
```

说明：把文件在**工作区**的修改全部撤销，这里有两种情况：

- 一种是文件自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
- 一种是文件已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。

总之，就是撤销当前**工作区**的修改

> 不带路径的 `git checkout [commit or branch]` 用于「检出」某个提交或分支，检出可以理解为「拿出来查看」。
>
> **若工作区与暂存区存在未提交的本地更改，checkout 还会尝试将文件快照与本地更改做简单的合并，若合并失败，将会中止操作并恢复到 checkout 之前的状态。** 因此 checkout 对工作区是安全的，它不会丢弃工作区所做的更改。

## git pull

### git pull 原理

`git fetch` 会查询所有的远程仓库所包含分支的最新提交，并将其记录到 **.git/FETCH_HEAD** 文件中。

> **.git/FETCH_HEAD** 是一个版本链接，指向着目前已经从远程仓库取下来的所有分支的最新提交。

`git pull` 命令等价于：先执行 `git fetch`，再执行 `git merge FETCH_HEAD` 将远程仓库对应分支的最新提交合并到当前本地分支中。

### git pull 命令中各选项的含义

其中 `git pull` 有这几项常见的选项搭配：

- 不带任何选项的 `git pull` 命令：先尝试快进合并，如果不行再进行正常合并生成一个新的提交。
- `git pull --ff-only` 命令：只尝试快进合并，如果不行则终止当前合并操作。
- `git pull --no-ff` 命令：禁止快进合并，即不管能不能快进合并，最后都会进行正常合并生成一个新的提交。
- `git pull --rebase` 命令：先尝试快进合并，如果不行再进行变基合并。

### 合并两个默认情况下没有共同基础的分支

> **I always see this error if when I create a new Github repository with a README.md, then pull it to a local repository at the first time.**

```perl
git pull origin <branch-name> --allow-unrelated-histories
```

> "git merge" used to allow merging two branches that have no common base by default, which led to a brand new history of an existing project created and then get pulled by an unsuspecting maintainer, which allowed an unnecessary parallel history merged into the existing project. The command has been taught not to allow this by default, with an escape hatch --allow-unrelated-histories option to be used in a rare event that merges histories of two projects that started their lives independently.

### 不建议在没有为偏离分支指定合并策略时执行 pull 操作

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

## git reset

`git reset` 的主要作用是将 HEAD 重置为指定的提交，有 -—soft、--mixed、--hard 三种主要的命令选项。

- `--soft` 只会对提交历史进行重置，不会再对暂存区以及工作区进行任何更改。

- `--mixed` 选项是 `git reset` 它除了重置提交历史，还会更新暂存区，例如暂存区有未提交的文件，工作区又对文件做了修改，他会直接把暂存区的修改丢掉。

- `--hard` 是 reset 最直接、最危险以及最常用的选项。它除了重置提交历史，工作区和暂存区中所有未提交的更改都会永久丢失，但被重置的提交仍有办法找回。

另一个关于 reset 的实践是，不要在公共分支上执行 reset。公共分支是指你与其他团队成员协作开发的分支。如果你需要修复一个公共提交引入的问题，请使用专门为此目的设计的 `git revert`。

## git restore

`restore` 命令用于还原工作区或暂存区中的指定文件或文件集合：

```perl
# 撤销工作区的修改
git restore [文件名] # 同 git checkout -- [文件名]
# 撤销暂存区的修改
git restore [文件名] --staged
```



## git rebase

### git rebase 作用于分支合并

> rebase 翻译为变基，他的作用和 merge 很相似，用于把一个分支的修改合并到当前分支上。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/b169721a6bfc42a7b4754f7c5d65672d_tplv-k3u1fbpfcp-zoom-in-crop-mark_1304_0_0_0.webp)

1. git merge 和 git rebase 的区别

    不同于 `git rebase` 的是，`git merge` 在不是 fast-forward（快速合并）的情况下，会产生一条额外的合并记录，类似 `Merge branch 'xxx' into 'xxx'` 的一条提交信息。

    另外，在解决冲突的时候，用 merge 只需要解决一次冲突即可，简单粗暴，而用 rebase 的时候 ，需要依次解决每次的冲突，才可以提交。

2. 解决 git rebase 操作后推送远端分支不成功的问题

    ```perl
    git push -f
    ```

### git rebase 交互模式

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

修改文件后 按下 `:` 然后 `wq` 保存退出，此时又会弹出一个编辑页面，这个页面是用来编辑提交的信息，修改为 `feat: 变基`，最后保存一下

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220403-1be.png)

> 特别注意，只能在自己使用的 feature 分支上进行 rebase 操作，不允许在集成分支上进行 rebase，因为这种操作会修改集成分支的历史记录。

## git cherry-pick

`git cherry-pick` 可以理解为”挑拣”提交，和 merge 合并一个分支的所有提交不同的是，它会获取某一个分支的单笔提交，并作为一个新的提交引入到你当前分支上。当我们需要在本地合入其他分支的提交时，如果我们不想对整个分支进行合并，而是只想将某一次提交合入到本地当前分支上，那么就要使用 `git cherry-pick` 了。

一次转移多个提交：

```perl
git cherry-pick commit1 commit2
```

上面的命令将 commit1 和 commit2 两个提交应用到当前分支。

多个连续的 commit，也可区间复制：

```perl
git cherry-pick commit1^..commit2
```

上面的命令将 commit1 到 commit2 这个区间的 commit 都应用到当前分支（包含 commit1、commit2），commit1 是最早的提交。

## git stash

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

## git switch

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

## Mac 中 Git 大小写问题

### 问题

Mac / Windows 环境下 Git 在不设置大小写敏感规则的时候默认大小写是不敏感，而 Linux 下 Git 是默认大小写敏感的。

**如果不是必须要和 linux 用户一起工作，不建议改变默认行为。**

> [为什么 Git 默认不区分文件夹大小写？](https://www.zhihu.com/question/57779034)

可以通过 `git mv` 操作来避免 Git 未识别：

```perl
git mv myfolder tmp
git mv tmp MyFolder
```

也可以修改 `git config` 来达到区分大小写：

```perl
git config core.ignorecase false
```

### 案例

#### 问题复现

在 Mac 上开发程序，并使用 Git 进行版本管理，在使用 React 编写 Component 时，组件名一般建议首字母大写。

**在 React 组件的文件进行命名时，刚开始是小写，后来为了保持团队一致，又改成了大写，然而 Git 不会发现大小写的变化，此时就出了问题。**

再梳理一遍这个逻辑：

1. 小明编写组件 `button.js`，提交代码
2. 小明觉得组件命名不妥，改为 `Button.js`
3. 小明并修改所有文件对它的引用，本地环境运行正常，提交代码
4. 构建服务器通过 Git 拉取代码，进行构建，**Git 并未认识到 `button.js` 大小写发生变化**，所有引用 `Button.js` 的组件发生报错，失败

#### 解决问题

通过 `git mv`，在 Git 暂存区中再更改一遍文件大小写解决问题

```perl
git mv test Test
```

但是修改文件夹时会出现一些问题：

```js
fatal: renaming 'dir' failed: Invalid argument
```

使用下边方法法修改：

```perl
git mv dir DirTemp
git mv DirTemp Dir
```

## gitignore

有时一些文件最好不要用 Git 跟踪。这通常在名为 `.gitignore` 的特殊文件中完成。你可以在 [github.com/github/gitignore](https://github.com/github/gitignore) 找到有用的 `.gitignore` 文件模板。

**问题：**

在使用 git 进行版本控制的过程中发现，将想被忽略的文件(文件夹)配置到 `.gitignore` 文件中后，实际修改了想被忽略的文件，调用 `git status` 查看时，仍然会提示提交这些文件。也就是说实际并没有被忽略

**原因：**

原因是 `git ignore` 只会对不在 git 仓库中的文件进行忽略，如果这些文件已经在 git 仓库中，则不会忽略。所以如果需要忽略的文件已经提交到本地仓库，则需要从本地仓库中删除掉，如果已经提交到远端仓库，则需要从远端仓库中删除。删除 `.gitignore` 文件才能实际生效。

**为什么我增加了 `.gitignore` 里的规则却没有效果？**

这是因为我们误解了 `.gitignore` 文件的用途，该文件只能作用于 `Untracked Files`，也就是那些从来没有被 Git 记录过的文件（自添加以后，从未 add 及 commit 过的文件）。

之所以你的规则不生效，是因为那些 `.log` 文件曾经被 Git 记录过，因此 `.gitignore` 对它们完全无效。这也正是开头那段简短答案所做的事情：

1. 从 Git 的数据库中删除对于该文件的追踪；
2. 把对应的规则写入 `_.gitignore_`，让忽略真正生效；
3. 提交＋推送。

只有这样做，所有的团队成员才会保持一致而不会有后遗症，也只有这样做，其他的团队成员根本不需要做额外的工作来维持对一个文件的改变忽略。

最后有一点需要注意的，`git rm --cached` 删除的是追踪状态，而不是物理文件；如果你真的是彻底不想要了，你也可以直接 rm＋忽略＋提交。

**解决：**

- `git rm -r --cached` 要忽略的文件 (如: `git rm -r --cahced build/*`, 如修改列表中的内容全部是不需要的, 那么你可以使用最最简单的命令搞定 `git rm -r --cached .`)
- `git add .`
- `git commit -m " commit ....."`
- `git push`

push 之后其他开发人员 pull 之后, ignore 规则就对其生效了.

## Git 工作区域和工作流程

### 工作区域


- **Repository**：本地仓库，位于自己的电脑上，通过 `git commit` 提交暂存区的内容，会进入本地仓库。

- **Remote**：远程仓库，用来托管代码的服务器，远程仓库的内容能够被分布在多个地点的处于协作关系的本地仓库修改，本地仓库修改完代码后通过 `git push` 命令同步代码到远程仓库。

### 工作流程

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/git-three-trees.png)

1. 假设我们进入到一个新目录，其中有一个 README 文件。此时暂存区为空，提交历史为空，HEAD 引用指向未创建的 master 分支。
1. 现在我们想提交该文件，首先需要通过 `git add` 将其添加到暂存区。此时 Git 将在 `.git/objects` 目录中以该文件的内容生成一个 blob 对象，并将 blob 对象的信息添加到 `.git/index` 文件中。
1. 接着运行 `git commit`，它会取得暂存区中的内容生成一个 tree 对象，该 tree 对象即为工作区文件的永久快照，然后创建一个指向该 tree 对象的提交对象，最后更新 master 指向本次提交。
1. 假如我们在工作区编辑了文件，Git 会将其与暂存区现有文件快照进行比较，在 `git add` 了更改的文件后，根据文件当前内容生成新的 blob 对象并更新 `.git/index` 文件中的引用 ID。`git commit` 的过程与之前类似，但是新的提交对象会以 HEAD 引用指向的提交作为父提交，然后更新其引用的 master 指向新创建的提交。
1. 当我们 `git checkout` 一个分支或提交时，它会修改 HEAD 指向新的分支引用或提交，将暂存区填充为该次提交的文件快照，然后将暂存区的内容解包复制到工作区中。

## 参考资料

- [对给 git 配置邮箱和用户名的理解](https://blog.csdn.net/ITWANGBOIT/article/details/103618427)
- [解决 Github 的 Contribution 没有增加的问题](https://blog.csdn.net/Liven_Zhu/article/details/80800162)
- [git 工作原理与撤销操作图解](https://www.waynerv.com/posts/git-undo-intro/)
- [我在工作中是如何使用 Git 的](https://juejin.cn/post/6974184935804534815)
- [高频 Git 面试题](https://zhuanlan.zhihu.com/p/101954895)
- [Git refusing to merge unrelated histories on rebase](https://stackoverflow.com/questions/37937984/git-refusing-to-merge-unrelated-histories-on-rebase)
- [不建议在没有为偏离分支指定合并策略时执行 pull 操作](https://blog.csdn.net/wq6ylg08/article/details/114106272)
