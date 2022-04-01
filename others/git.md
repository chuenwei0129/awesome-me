# 怕遗忘 Git 的我，把相关知识点都记录下来就对了<!-- omit in toc -->

***👀 TIPS: 二级标题可返回目录***

---

> ## 目录

- [ssh](#ssh)
  - [生成一个 ssh-key](#生成一个-ssh-key)
  - [复制 `id_rsa.pub` 的内容](#复制-id_rsapub-的内容)
  - [全局配置 Git 的用户名和邮箱](#全局配置-git-的用户名和邮箱)
  - [No.1 的小秘籍](#no1-的小秘籍)
    - [查看是否有权限](#查看是否有权限)
    - [代理问题](#代理问题)
- [Git 的工作区域和流程](#git-的工作区域和流程)
- [Git 文件状态](#git-文件状态)
- [Git 基本操作](#git-基本操作)
  - [配置命令](#配置命令)
  - [分支管理](#分支管理)
  - [git pull](#git-pull)
  - [git fetch](#git-fetch)
  - [git add](#git-add)
  - [git commit](#git-commit)
- [参考资料](#参考资料)

## [ssh](#目录)

虽然 git 可以工作在 ssh 与 https 两种协议上，但为了安全性，更多时候会选择 ssh。

### 生成一个 ssh-key

执行命令

```sh
ssh-keygen -t rsa -C "example@qq.mail"
```

- `-t`: 可选择 dsa | ecdsa | ed25519 | rsa | rsa1，代表加密方式
- `-C`: 注释，一般写自己的邮箱

如果执行成功，切换到 `~/.ssh` 目录下，此时目录应该如下所示。

```sh
authorized_keys config id_rsa id_rsa.pub known_hosts
```

> id_rsa / id_rsa.pub: 配对的私钥与公钥

### 复制 `id_rsa.pub` 的内容

以 Github 为例，进入 `settings -> SSH and GPG keys` 通过 `cat` 命令查看文件 `id_rsa.pub` 的内容，然后复制过来，点击 `add ssh key`，这一步等于说把你的公钥放到了 Github 上进行托管。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/-k3u1fbpfcp.webp)

### 全局配置 Git 的用户名和邮箱

```sh
git config --global user.name "xxx"
git config --global user.email "xxx@xx.com"
```

完成以上步骤，就可以愉快 pull 代码开发了。

> 和 https 拉取方式不同的是，https 方式需要每次提交前都手动输入用户名和密码，ssh 的方式配置完毕后 Git 都会使用你本地的私钥和远程仓库的公钥进行验证是否是一对秘钥，从而简化了操作流程。

### No.1 的小秘籍

#### 查看是否有权限

```sh
ssh -T git@github.com
# Hi chuenwei0129! You've successfully authenticated, but GitHub does not provide shell access.
```

#### 代理问题

```sh

# 这个提示是主要提示是不允许你代理这个 ip 登录 ssh
kex_exchange_identification: Connection closed by remote host
Connection closed by 127.0.0.1 port 7890
```

解决方案就是用 Github 的 443 端口 <https://docs.github.com/en/authentication/troubleshooting-ssh/using-ssh-over-the-https-port> 或者把代理关了

更多讨论：[ssh远程登陆有时候正常，有时候显示：ssh_exchange_identification: Connection closed by remote host，这是什么原因？](https://www.zhihu.com/question/20023544)

## [Git 的工作区域和流程](#目录)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/613861755_1618028580119_014AA794B8DE2B0593F9F6C4BE7243D9.png)

- **Workspace**：工作区，就是平时进行开发改动的地方，是当前看到最新的内容，在开发的过程也就是对工作区的操作。

- **Index**：暂存区，当执行 `git add` 的命令后，工作区的文件就会被移入暂存区，暂存区标记了当前工作区中那些内容是被 Git 管理的，当完成某个需求或者功能后需要提交代码，第一步就是通过 `git add` 先提交到暂存区。

- **Repository**：本地仓库，位于自己的电脑上，通过 `git commit` 提交暂存区的内容，会进入本地仓库。

- **Remote**：远程仓库，用来托管代码的服务器，远程仓库的内容能够被分布在多个地点的处于协作关系的本地仓库修改，本地仓库修改完代码后通过 `git push` 命令同步代码到远程仓库。

## [Git 文件状态](#目录)

通常我们需要查看一个文件的状态

```sh
git status
```

- `Changes not staged for commit`

  表示得大概就是工作区有该内容，但是缓存区没有，需要我们 git add

- `Changes to be committed`

  一般而言，这个时候，文件放在缓存区了，我们需要 git commit

- `nothing to commit, working tree clean`

  这个时候，我们将本地的代码推送到远端即可

## [Git 基本操作](#目录)

### 配置命令

```sh
# 列出当前配置
git config --list
# 列出本地 Repository 配置
git config --local --list
# 列出全局配置
git config --global --list
# 列出系统配置
git config --system --list
```

### 分支管理

```sh
# 查看本地分支
git branch
# 查看远程分支
git branch -r
# 查看本地和远程分支
git branch -a

# 创建并切换到新建分支
git checkout -b <branch-name>
# 从当前分支，切换到其他分支
git switch <branch-name>
# 与 switch 命令相同
git checkout <branch-name>

# 删除分支
git branch -d <branch-name>
# 删除远程分支
git push origin -d <branch-name>

# 当前分支与指定分支合并
git merge <branch-name>
# 查看哪些分支已经合并到当前分支
git branch --merged

# 重命名分支
git branch -m <old-branch-name> <new-branch-name>
```

### git pull

```sh
# 从远程仓库拉取代码并合并到本地，可简写为 git pull 等同于 git fetch && git merge
git pull <远程主机名> <远程分支名>:<本地分支名>
# 使用 rebase 的模式进行合并
git pull --rebase <远程主机名> <远程分支名>:<本地分支名>
```

### git fetch

与 `git pull` 不同的是 `git fetch` 操作仅仅只会拉取远程的更改，不会自动进行 merge 操作。对你当前的代码没有影响

```sh
# 获取远程仓库特定分支的更新
git fetch <远程主机名> <分支名>
# 当你想将某个远程分支的内容取回到本地下某个分支的话
git fetch origin <branch-name>:<local-branch-name>

# 获取远程仓库所有分支的更新
git fetch --all
```

### git add

添加文件到暂存区

```sh
# 添加某个文件到暂存区，后面可以跟多个文件，以空格区分
git add xxx
# 添加当前更改的所有文件到暂存区。
git add .
```

> git 的 add，是一个容易引起疑问的命令。同时，`git diff --cached` 是比较 stage 的文件的差异的，也是一个不直观的命令。

github 2008 年的 blog 中，也提到，容易引起混淆：

> things like making use of the term ‘stage’ for things that happen in the index (such as using ‘git diff —staged’ instead of ‘git diff —cached’) is being worked on. I’m excited that staging files may soon be done via ‘git stage’ rather-than/in-addition-to ‘git add’. This is nice for new users who often have a hard time seeing why you have to keep ‘git add’ing to stage your changes.

事实上，在 git 的后续版本中，就做了两个修改：

`git stage` 作为 `git add` 的一个同义词

`git diff --staged` 作为 `git diff --cached` 的相同命令

为了容易理解，推荐大家使用 `git stage` 和 `git diff --staged` 这两个命令，而 `git add` 和 `git diff --cached` 这两个命令，仅仅为了保持和以前的兼容做保留。

### git commit

```sh
# 提交暂存的更改，会新开编辑器进行编辑
git commit
# 提交暂存的更改，并记录下备注
git commit -m "you message"
# 等同于 git add . && git commit -m
git commit -am
# 对最近一次的提交的信息进行修改,此操作会修改commit的hash值
git commit --amend
```

## 参考资料

[为什么要先 git add 才能 git commit ？](https://www.zhihu.com/question/19946553)

[「一劳永逸」一张脑图带你掌握Git命令](https://juejin.cn/post/6869519303864123399)

[我在工作中是如何使用 Git 的](https://juejin.cn/post/6974184935804534815)

[Git 常用命令（巨详细）](https://juejin.cn/post/6976816225191985189)

[高频 Git 面试题](https://zhuanlan.zhihu.com/p/101954895)

<!-- ### 增加 stage 的带来的好处是什么？

主要有两个好处，一个是分批、分阶段递交，一个是进行快照，便于回退

2.1 分批递交，降低commit的颗粒度

比如，你修改了 a.py, b.py, c.py, d.py，其中 a.py 和 c.py 是一个功能相关修改，b.py，d.py属于另外一个功能相关修改。那么你就可以采用：

git stage a.py c.py

git commit -m "function 1"

git stage b.py d.py

git commit -m "function 2"

2.2 分阶段递交

比如，你修改了文件 hello.py，修改了一些以后，做了 git stage heello.py动作，相当于对当前的hello.py 做了一个快照， 然后又做了一些修改，这时候，如果直接采用 git commit 递交，则只会对第一次的快照进行递交，当前内容还保存在 working 工作区。

当前的最新修改，则需要再做一次 git stage ，才能递交。

这中间细微的差别，请参见：

http://learn.github.com/p/normal.html

由于git这个特性，需要注意到是，每次递交之前，需要确认是否已经将相关的修改都stage 了，否则可能仅仅递交了部分不完整的修改。

比如你修改了部分内容，进行了 stage，后来你又做了一些修改，然后就递交，这时，后面的修改，并没有递交。

2.3 文件快照，便于回退

做了部分修改以后，进行 git stage，然后任何时刻，都可以回退到stage时的状态：

git checkout -- hello.py

1. git diff ， git diff --staged 和 git diff HEAD的差别

当一个文件做了stage，然后又做了一些修改，则：

git diff 显示当前工作区的文件和stage区文件的差异

git diff --staged 显示stage区和HEAD的文件的差异

git diff HEAD 显示工作区和上次递交文件的差异

具体参见 git help diff 的EXAMPLES部分。

使用 git status 可以看到，一个文件可能同时存在两种差异。具体参见：

http://learn.github.com/p/normal.html

4. reset 和 checkout的区别

当文件加入了 stage 区以后，如果要从stage删除，则使用 reset,此时工作区的文件不做任何修改，比如：

git reset hello.py

这个命令就是 git stage hello.py 的反操作。

当文件加入了 stage 区以后，后来又做了一些修改，这时发现后面的修改有问题，想回退到stage的状态，使用 checkout 命令：

git checkout hello.py

5. 可以使用 git commit -a 命令，跳过 git stage 这个命令，直接递交

6. 最佳实践：

做了阶段性修改，但是还不能做一次递交，这时先 git stage 一下

如果有问题，可以随时 checkout 回退

递交之前，使用 git status，git diff HEAD 仔细查看是否需要的递交

git commit -a ，保证递交了所有内容 -->
