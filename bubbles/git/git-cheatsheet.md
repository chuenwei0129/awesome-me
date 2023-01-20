# Git 常用命令备忘录

> 这条笔记创建于: 2022 年 10 月 27 日，星期四，17: 22。

| 命令                                                    | 功能                                                                                                                                                            | 备注                |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| git init                                                | 初始化本地 git 仓库（创建新仓库）                                                                                                                               |                     |
| git ls-files                                            | 列出 git 作用的文件                                                                                                                                             |                     |
| git config --global user.name "chuenwei0129"            | 配置用户名                                                                                                                                                      | [[git-config]]      |
| git config --global user.email "chuenwei0129@gmail.com" | 配置邮件                                                                                                                                                        |                     |
| git clone git+ssh://git@192.168.53.168/VT.git           | clone 远程仓库                                                                                                                                                  |                     |
| git status                                              | 查看当前版本状态（是否修改）                                                                                                                                    |                     |
| git add file1 file2                                     | 添加文件到暂存区，后面可以跟多个文件，以空格区分                                                                                                                |                     |
| git add .                                               | 增加当前子目录下所有更改过的文件至 stage                                                                                                                        |                     |
| git commit -m 'xxx'                                     | 提交                                                                                                                                                            |                     |
| git commit --amend -m 'xxx'                             | 合并上一次提交（用于反复修改）                                                                                                                                  | [[git-commit]]      |
| git commit -am 'xxx'                                    | 将 add 和 commit 合为一步                                                                                                                                       |                     |
| git rm xxx                                              | 删除 stage 中的文件                                                                                                                                             |                     |
| git rm -r *                                             | 递归删除                                                                                                                                                        |                     |
| git show dfb02e6e4f2f7b573337763e5c0013802e392818       | 显示某个提交的详细内容                                                                                                                                          |                     |
| git show dfb02                                          | 可只用 commitid 的前几位                                                                                                                                        |                     |
| git show HEAD                                           | 显示 HEAD 提交日志                                                                                                                                              |                     |
| git show HEAD^                                          | 显示 HEAD 的父（上一个版本）的提交日志 ^^ 为上两个版本 ^5 为上 5 个版本                                                                                         |                     |
| git show master@{yesterday}                             | 显示 master 分支昨天的状态                                                                                                                                      |                     |
| git diff                                                | 显示所有未添加至 index 的变更                                                                                                                                   |                     |
| git diff --cached                                       | 显示所有已添加 stage 但还未 commit 的变更，--staged 也可以                                                                                                      |                     |
| git diff HEAD^                                          | 比较与上一个版本的差异                                                                                                                                          |                     |
| git diff HEAD -- ./lib                                  | 比较与 HEAD 版本 lib 目录的差异                                                                                                                                 |                     |
| git diff origin/master..master                          | 比较远程分支 master 上有，本地分支 master 上没有的                                                                                                              |                     |
| git diff origin/master..master --stat                   | 只显示差异的文件，不显示具体内容                                                                                                                                |                     |
| git branch                                              | 显示本地分支                                                                                                                                                    |                     |
| git branch -a                                           | 显示所有分支                                                                                                                                                    |                     |
| git branch -r                                           | 显示所有原创分支                                                                                                                                                |                     |
| git branch --merged                                     | 显示所有已合并到当前分支的分支                                                                                                                                  |                     |
| git branch --no-merged                                  | 显示所有未合并到当前分支的分支                                                                                                                                  |                     |
| git branch -m master main                               | 本地分支改名                                                                                                                                                    |                     |
| git branch --contains 7aa9486                           | 显示包含 commit 7aa9486 的分支                                                                                                                                  |                     |
| git branch -d hotfixes/BJVEP933                         | 删除分支 hotfixes/BJVEP933（本分支修改已合并到其他分支）                                                                                                        |                     |
| git branch -D hotfixes/BJVEP933                         | 强制删除分支 hotfixes/BJVEP933                                                                                                                                  |                     |
| git checkout -b dev                                     | 从当前分支创建新分支 dev 并检出                                                                                                                                 | [[git-checkout]]    |
| git checkout -b master dev                              | 上面的完整版                                                                                                                                                    |                     |
| git checkout master                                     | 检出已存在的 master 分支                                                                                                                                        |                     |
| git checkout --track origin/gh-pages                    | 检出远程分支 origin/gh-pages 并创建本地跟踪分支                                                                                                                 |                     |
| git checkout -b dev origin/dev                          | 从远程分支 dev 创建新本地分支 dev 并检出                                                                                                                        |                     |
| git checkout -- readme.md                               | 检出 HEAD 版本的 readme.md 文件（相当于撤销工作区修改）                                                                                                         |                     |
| git switch -C branch                                    | 创建并切换到指定分支（ -C 大小写皆可）                                                                                                                          | [[git-switch]]      |
| git switch branch                                       | 从当前分支，切换到其他分支                                                                                                                                      |                     |
| git log                                                 | 显示所有提交过的版本信息，不包括已经被删除的 commit 记录和 reset 的操作                                                                                         |                     |
| git log -1                                              | 显示 1 行日志 -n 为 n 行                                                                                                                                        |                     |
| git log --stat                                          | 显示提交日志及相关变动文件                                                                                                                                      |                     |
| git reflog                                              | 显示所有的操作记录，包括提交，回退的操作。一般用来找出操作记录中的版本号，进行回退                                                                              |                     |
| git reset commit_id                                     | 软重置，只会删除基于当前 commit id 之后的 commit 信息，但相应的文件修改并没有重置                                                                               | [[git-reset]]       |
| git reset --hard HEAD/commit_id                         | 将当前版本回到 HEAD/commit_id 对应版本（通常用于 merge 失败回退）                                                                                               |                     |
| git reset --hard head~N                                 | 回退到上 N 次提交的版本                                                                                                                                         |                     |
| git revert commit_id                                    | 结果类似于 git reset --hard commit_id 但是它不会重置提交历史，而是对此操作重新 commit 一个消息，对 revert 对应的 commit_id 重新 revert 会回到没有 revert 的状态 |                     |
| git remote add 远程仓库名 远程仓库地址                  | 把本地仓库和远程仓库关联                                                                                                                                        |                     |
| git remote rm 远程仓库名                                | 删除远程仓库                                                                                                                                                    |                     |
| git remote -v                                           | 查看远程仓储                                                                                                                                                    |                     |
| git fetch                                               | 获取所有远程分支（不更新本地分支，另需 merge）                                                                                                                  |                     |
| git fetch --prune                                       | 获取所有原创分支并清除服务器上已删掉的分支                                                                                                                      |                     |
| git merge origin/master                                 | 当前分支与指定分支合并，合并远程 master 分支至当前分支                                                                                                          |                     |
| git push origin master                                  | 将当前分支 push 到远程 master 分支                                                                                                                              |                     |
| git push -u origin main                                 | 如果当前分支与多个主机存在追踪关系，那么这个时候 -u 选项会指定一个默认主机，这样后面就可以不加任何参数使用 git push                                             |                     |
| git push                                                | 如果当前分支只有一个追踪分支，那么主机名都可以省略                                                                                                              |                     |
| git push origin dev                                     | 将当前分支推送到 origin 主机的对应分支，如果上游没有就会新建分支                                                                                                |                     |
| git push origin -d 远程分支名                           | 删除远程分支                                                                                                                                                    |                     |
| git pull 远程主机名 远程分支名:本地分支名               | 从远程仓库拉取代码并合并到本地，可简写为 git pull 等同于 git fetch && git merge                                                                                 | [[git-pull]]        |
| git stash save "message"                                | 把本地的改动暂存起来，执行存储时，添加备注，方便查找                                                                                                            | [[git-stash]]       |
| git stash pop                                           | 应用最近一次暂存的修改，并删除暂存的记录                                                                                                                        |                     |
| git stash apply                                         | 应用某个存储，但不会把存储从存储列表中删除，默认使用第一个存储，即 stash@{0}，如果要使用其他个，git stash apply stash@{$num}                                    |                     |
| git stash list                                          | 查看 stash 有哪些存储                                                                                                                                           |                     |
| git stash clear                                         | 删除所有缓存的 stash                                                                                                                                            |                     |
| git cherry-pick commit1 commit2                         | 将 commit1 和 commit2 两个提交应用到当前分支                                                                                                                    | [[git-cherry-pick]] |
| git cherry-pick commit1^..commit2                       | 将 commit1 到 commit2 这个区间的 commit 都应用到当前分支（包含commit1、commit2），commit1 是最早的提交                                                          |                     |
| git rebase -i base-commit                               | 参数 `base-commit` 就是指明操作的基点提交对象，基于这个基点进行 `rebase` 的操作，`base-commit` 之前的提交对象不会被操作，`base-commit` 之后的提交对象会被操作   | [[git-rebase]]      |
| git rebase -i --root                                    | 从头开始 rebase，即从第一个提交开始 rebase                                                                                                                      |                     |
| git restore [文件名]                                    | 同 git checkout -- [文件名] 撤销工作区的修改                                                                                                                    | [[git-restore]]     |
| git restore [文件名] --staged                           | 撤销暂存区的修改                                                                                                                                                |                     |
| git stage                                               | `git add` 的一个同义词                                                                                                                                          | [[git-stage]]       |

[//begin]: # "Autogenerated link references for markdown compatibility"
[git-config]: git-config.md "Git 配置"
[git-commit]: git-commit.md "git commit 修改提交信息"
[git-checkout]: git-checkout.md "git checkout 撤销修改"
[git-switch]: git-switch.md "git switch 命令"
[git-reset]: git-reset.md "git reset 命令"
[git-pull]: git-pull.md "git pull 命令"
[git-stash]: git-stash.md "git stash 命令"
[git-cherry-pick]: git-cherry-pick.md "git cherry-pick 命令"
[git-rebase]: git-rebase.md "git rebase 命令"
[git-restore]: git-restore.md "git restore 命令"
[git-stage]: git-stage.md "git stage 命令"
[//end]: # "Autogenerated link references"
