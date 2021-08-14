上面的案例引申出一个问题，入职一家新公司，你的 leader 给你分配了仓库的权限后，如何配置本地的 Git 环境并拉取代码？莫慌，按照下面我讲的四个步骤走，保证你可以顺利使用 Git 进行拉取代码！

下载 Git 下载地址 ，选择自己系统对应的版本下载即可。

在你的电脑上生成 ssh 秘钥，打开终端，执行 ssh-keygen -t rsa -C "你公司内部邮箱地址"，如果执行成功，切换到 ~/.ssh 目录下，此时目录应该如下所示。复制 id_rsa.pub 的内容。

这里以 Github 为例，如下图所示，进入 settings -> SSH and GPG keys 通过 cat 命令查看文件 id_rsa.pub 的内容，然后复制过来，点击 add ssh key，这一步等于说把你的公钥放到了 Github 上进行托管。

全局配置 Git 的用户名和邮箱

git config --global user.name "xxx"
git config --global user.email "xxx@xx.com"
复制代码
完成以上四步，你就可以愉快 pull 代码开发了。和 https 拉取方式不同的是，https 方式需要每次提交前都手动输入用户名和密码，ssh 的方式配置完毕后 Git 都会使用你本地的私钥和远程仓库的公钥进行验证是否是一对秘钥，从而简化了操作流程。
