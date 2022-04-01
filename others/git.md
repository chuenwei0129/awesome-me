怕遗忘 Git 的我，把相关知识点都记录下来就对了

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/613861755_1618028580119_014AA794B8DE2B0593F9F6C4BE7243D9.png)

下载 Git 下载地址 ，选择自己系统对应的版本下载即可。

在你的电脑上生成 ssh 秘钥，打开终端，执行 ssh-keygen -t rsa -C "你公司内部邮箱地址"，如果执行成功，切换到 ~/.ssh 目录下，此时目录应该如下所示。复制 id_rsa.pub 的内容。

这里以 Github 为例，如下图所示，进入 settings -> SSH and GPG keys 通过 cat 命令查看文件 id_rsa.pub 的内容，然后复制过来，点击 add ssh key，这一步等于说把你的公钥放到了 Github 上进行托管。

全局配置 Git 的用户名和邮箱

git config --global user.name "xxx"
git config --global user.email "xxx@xx.com"
复制代码
完成以上四步，你就可以愉快 pull 代码开发了。和 https 拉取方式不同的是，https 方式需要每次提交前都手动输入用户名和密码，ssh 的方式配置完毕后 Git 都会使用你本地的私钥和远程仓库的公钥进行验证是否是一对秘钥，从而简化了操作流程。

## todo

1. git 的 add ，是一个容易引起疑问的命令。在 subversion 中的 svn add 动作是将某个文件加入版本控制，而 git add的意义完全不同。

同时， git diff --cached 是比较 stage 的文件的差异的，也是一个不直观的命令。

github 2008年的blog中，也提到，容易引起混淆：

https://github.com/blog/196-gittogether-2008

http://learn.github.com/p/normal.html

things like making use of the term ‘stage’ for things that happen in the index (such as using ‘git diff —staged’ instead of ‘git diff —cached’) is being worked on. I’m excited that staging files may soon be done via ‘git stage’ rather-than/in-addition-to ‘git add’. This is nice for new users who often have a hard time seeing why you have to keep ‘git add’ing to stage your changes.

事实上，在 git 的后续版本中，就做了两个修改：

git stage 作为 git add 的一个同义词

git diff --staged 作为 git diff --cached 的相同命令

为了容易理解，推荐大家使用 git stage 和 git diff --staged 这两个命令，而git add 和 git diff --cached 这两个命令，仅仅为了保持和以前的兼容做保留。

2. 增加 stage 的带来的好处是什么？

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

3. git diff ， git diff --staged 和 git diff HEAD的差别

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

git commit -a ，保证递交了所有内容

1.  下载 Git [下载地址](https://link.juejin.cn?target=https%3A%2F%2Fgit-scm.com%2Fdownloads) ，选择自己系统对应的版本下载即可。
    
2.  在你的电脑上生成 ssh 秘钥，打开终端，执行 `ssh-keygen -t rsa -C "你公司内部邮箱地址"`，如果执行成功，切换到 `~/.ssh` 目录下，此时目录应该如下所示。复制 `id_rsa.pub` 的内容。
    
    ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0deb58d91310414f80eff364c694af9c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)
    
3.  这里以 Github 为例，如下图所示，进入 `settings -> SSH and GPG keys` 通过 `cat` 命令查看文件 `id_rsa.pub` 的内容，然后复制过来，点击 `add ssh key`，这一步等于说把你的公钥放到了 Github 上进行托管。
    
    ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ff633573cc946bab9a13f014a099d7b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)
    
4.  全局配置 Git 的用户名和邮箱
    

    git config --global user.name "xxx"
    git config --global user.email "xxx@xx.com"
    复制代码

完成以上四步，你就可以愉快 pull 代码开发了。和 https 拉取方式不同的是，https 方式需要每次提交前都手动输入用户名和密码，ssh 的方式配置完毕后 Git 都会使用你本地的私钥和远程仓库的公钥进行验证是否是一对秘钥，从而简化了操作流程。

  
作者：政采云前端团队  
链接：https://juejin.cn/post/6974184935804534815  
来源：稀土掘金  
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

[为什么要先 git add 才能 git commit ？](https://www.zhihu.com/question/19946553)
