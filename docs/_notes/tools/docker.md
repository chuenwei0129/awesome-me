后端系统会部署很多服务，包括我们自己开发的服务，还有 mysql、redis 等中间件的服务，部署它们需要一系列依赖的安装、环境变量的设置等等。

如果你要部署多台机器的话，同样的操作要重复多次，万一哪一步漏掉了，服务就跑不起来了。

就很麻烦。

而 Docker 就能完美解决这个问题：

它把系统的所有文件封装成一个镜像，镜像跑起来作为容器，它可以在一台机器上跑多个容器，每个容器都有独立的操作系统环境，比如文件系统、网络端口等，在容器内跑各种服务。

这样整个环境都保存在这个镜像里，部署多个实例只要通过这个镜像跑多个容器就行。

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf8ee80acf09467e9d873455f0ab545a~tplv-k3u1fbpfcp-watermark.image?)

这也是为什么它的 logo 是这样的：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7a395455ab5941d8af56a0342efda985~tplv-k3u1fbpfcp-watermark.image?)

Docker 提供了 Docker Hub 镜像仓库，可以把本地镜像 push 到仓库或者从仓库 pull 镜像到本地。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f8ed80edf034c44a5f8a5ce4a03315d~tplv-k3u1fbpfcp-watermark.image?)

我们 pull 个镜像下来试试看：

首先需要安装 Docker，直接从[官网](https://docker.com)下载 docker desktop 就行：

（windows 选择 widnows 的安装包。m1 要注意芯片类型，选择 apple chip 那个包）

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/08c1060cac544672aeacce19273771f8~tplv-k3u1fbpfcp-watermark.image?)

它内置了 docker 命令。

把它安装到系统之后，可以在命令行看下 docker 命令是否可用：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d84cf0ec2b25421286d57b35dd1a0093~tplv-k3u1fbpfcp-watermark.image?)

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/019987ca1b804ee68b2e0c442f97ac60~tplv-k3u1fbpfcp-watermark.image?)

如果不可用，那要设置下这个：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ef48c389e45347b9a9f133276605c286~tplv-k3u1fbpfcp-watermark.image?)

点击 Settings > Advanced，里面有两种安装路径，如果是 /usr/local/bin，那 docker 命令就是直接可用的，因为这个路径在 PATH 变量里。

如果是第二种，那就需要手动把它加到 PATH 环境变量里。

然后我们来看看 docker desktop 的界面：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6edd86d6264b488d918ac95a32d657da~tplv-k3u1fbpfcp-watermark.image?)

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3601b0d26df3452abbe668a2d35498ef~tplv-k3u1fbpfcp-watermark.image?)

images 是本地的所有镜像，containers 是镜像跑起来的容器。

docker desktop 可以可视化的管理它们，很方便。

我们 pull 一个镜像试试看。

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/801a7dc0994a438eb9abfb06ee6c1b9f~tplv-k3u1fbpfcp-watermark.image?)

搜索 nginx 镜像，点击 pull（搜索这步需要翻墙，不然搜不到）。

pull 下来之后，就可以在本地 images 看到了：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a03b9f9bad247cb8bdbc9d7c01e37d8~tplv-k3u1fbpfcp-watermark.image?)

如果搜不到，那直接在命令行用 docker search、docker pull 搜索和拉取镜像也可以：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ddd3536dd2b74dc2a2e5117441b55a2b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1480&h=486&s=169978&e=png&b=010101)

点击 run 会让你填一些参数：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/555e97e310c74081912888dccda95e6a~tplv-k3u1fbpfcp-watermark.image?)

首先是名字，如果不填，docker desktop 会给你生成随机的容器名字。

就是这种：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/40fbead5cd9c411ab3e65a688c69aef5~tplv-k3u1fbpfcp-watermark.image?)

然后是端口，容器内跑的 nginx 服务是在 80 端口，你要把宿主机的某个端口映射到容器的 80 端口才可以访问。

接下来是数据卷 volume，这个是把宿主机某个目录挂到容器内。

因为容器是镜像跑起来的，下次再用这个镜像跑的还是同样的容器，那你在容器内保存的数据就会消失。

所以我们都是把某个宿主机目录，挂载到容器内的某个保存数据的目录，这样数据是保存在宿主机的，下次再用镜像跑一个新容器，只要把这个目录挂载上去就行。

至于环境变量，这个就很容易理解了。

我们分别设置一下：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a2cbaaf6efbf488ab841a54cfbf3c070~tplv-k3u1fbpfcp-watermark.image?)

挂载本地的 /tmp/aaa 到容器内的 /usr/share/nginx/html 目录。

这里的 /tmp/aaa 可以换成宿主机的任何目录，如果是 windows 系统，那就是类似 D://tmp/aaa 这种。

**（注意，这里是 /usr 而不是 /user）**

点击 run：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3dab38ba7546426781ad5990f7ec4e7a~tplv-k3u1fbpfcp-watermark.image?)

可以看到容器内的 nginx 服务跑起来了。

我们在 /tmp/aaa 目录下添加一个 index.html:

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e2c2fb3ca0db45d8b8936a1bfebecad1~tplv-k3u1fbpfcp-watermark.image?)

浏览器访问 <http://localhost> 就可以访问到：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/76c805c5de3b47d0bae4c39141a5631b~tplv-k3u1fbpfcp-watermark.image?)

这就说明数据卷挂载成功了。

点击 files 标签就可以看到容器内的文件。

可以看到 /usr/share/nginx/html 被标识为 mounted，就是挂载目录的意思：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f35e723f8570443da0ecd95bdebffb3d~tplv-k3u1fbpfcp-watermark.image?)

我们再在本地添加一个文件：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5638889e8e8048c4878536f9d2d0bef0~tplv-k3u1fbpfcp-watermark.image?)

你会发现容器内这个目录内容也变了：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a5dda62645e84ed18665bcbd32cc5a66~tplv-k3u1fbpfcp-watermark.image?)

这就是 volume 挂载的作用。

如果你挂载某些目录报错，是因为 docker desktop 挂载的目录是需要配置的，在 Settings > Resources > File Sharing 里加一下就行：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4e088be41e24fbeb9678156587aa7cc~tplv-k3u1fbpfcp-watermark.image?)

至于挂载到的目录，在镜像搜索结果页有写：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2bbe1e0dc98d4d799250d74c9da153a4~tplv-k3u1fbpfcp-watermark.image?)

通过命令行 docker run 来跑镜像， -v 是指定挂载的数据卷，后面的 :ro 代表 readonly，也就是容器内这个目录只读，:rw 表示容器内可以读写这个目录。

这就是数据卷的作用。

此外，你还可以进入到容器内执行各种命令：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bcafb3239c1e4469a3a1e90ffa79dc49~tplv-k3u1fbpfcp-watermark.image?)

是不是感觉 docker 学起来还挺简单的？

docker 常用的就是这些东西。

当然，在服务器上没有 Docker Desktop 这种东西，还是要敲命令的。

比如我们点击 pull 按钮，就相当于执行了 docker pull：

    docker pull nginx:latest

latest 是标签，也就是这个：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d438a6f7ef5442abcea39f0c62e6301~tplv-k3u1fbpfcp-watermark.image?)

然后我们点击 run 按钮，填了个表单，就相当于执行了 docker run：

    docker run --name nginx-test2 -p 80:80 -v /tmp/aaa:/usr/share/nginx/html -e KEY1=VALUE1 -d nginx:latest

\-p 是端口映射

\-v 是指定数据卷挂载目录

\-e 是指定环境变量

\-d 是后台运行

对照下前面可视化界面，是不是瞬间就懂了：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a75282ad24d541c8b3a9d87a989a6f2c~tplv-k3u1fbpfcp-watermark.image?)

docker run 会返回一个容器的 hash：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97c622d43fdf401da3b324496710accc~tplv-k3u1fbpfcp-watermark.image?)

就是这里的 id：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/32e12d3e35f748f6ba5fe1104c5c318b~tplv-k3u1fbpfcp-watermark.image?)

这个界面可以用 docker ps 来获取：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/637543ff05444c1bb8fb2eec3cce63e0~tplv-k3u1fbpfcp-watermark.image?)

它是显示容器列表的，默认是运行中的。

想显示全部的，可以加个 -a

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24d3bc05e98d4af4bf5fa48a2b47a1bb~tplv-k3u1fbpfcp-watermark.image?)

除了 container 列表，image 镜像列表也可以通过 docker images 命令获取：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/407f97f8b637471aa2fc4c68cf2d38bc~tplv-k3u1fbpfcp-watermark.image?)

我们在容器的 terminal 里执行命令，对应的是 docker exec 命令：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/402924b76ba84361b4dd48aa4db8d1a4~tplv-k3u1fbpfcp-watermark.image?)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0601c124b48e414ca4b22b93d6e433d7~tplv-k3u1fbpfcp-watermark.image?)

\-i 是 terminal 交互的方式运行

\-t 是 tty 终端类型

然后指定容器 id 和 shell 类型，就可以交互的方式在容器内执行命令了。

查看日志，对应 docker logs 命令：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d86752e576824bd58a97b118377abbbd~tplv-k3u1fbpfcp-watermark.image?)

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fec0abf5d94f407f91fed3e240db77d9~tplv-k3u1fbpfcp-watermark.image?)

输入 exit 退出：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0262e0d045f74b5cb3cce2aaf44ea057~tplv-k3u1fbpfcp-watermark.image?)

docker inspect 可以查看容器的详情

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7754966f9a64d49b8110e35c7f0551f~tplv-k3u1fbpfcp-watermark.image?)

对应 desktop 里的 inspect 的 tab：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24cd735b47634d948e4fb3999624e41e~tplv-k3u1fbpfcp-watermark.image?)

docker volume 可以管理数据卷：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6bfbe4013bbf4fe1b2e272ba7e95c196~tplv-k3u1fbpfcp-watermark.image?)

对应 desktop 的这部分：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b4ec0dff7b74ae68727c786028fb22e~tplv-k3u1fbpfcp-watermark.image?)

此外，还有这些常用命令：

- docker start：启动一个已经停止的容器
- docker rm：删除一个容器
- docker stop：停止一个容器

都可以通过 docker desktop 很方便的操作

## 总结

Docker 可以把环境封装成镜像，镜像跑起来是一个独立的容器。通过这种方式可以快速部署多个相同的实例。

docker 提供了一个 desktop 工具，可以可视化的操作 docker，包括容器、镜像、volume 等

我们 pull 了一个 nginx 镜像下来，指定端口映射、挂载的数据卷，并把它跑起来了。

这就是 docker 的基本用法。

当然，这些可视化的操作都有对应的命令，当服务器上没有桌面的时候，就需要用命令行操作了。

不得不说，用 desktop 来学 docker 真是太简单了。

上节我们通过 desktop 从 docker hub 拉取了 nginx 的镜像，并把它跑了起来。

跑这个镜像的时候指定了映射的端口、挂载的数据卷、环境变量等。

跑起来的容器就已经有可用的 nginx 服务了。

那如果我们要自己制作一个这样的镜像，怎么做呢？

docker 容器内就是一个独立的系统环境，想想如果在这样一个系统上，要安装 nginx 服务，怎么做呢？

需要执行一些命令、复制一些文件进来，然后启动服务。

制作镜像自然也要进行这样的过程，不过可以自动化。

只要在 dockerfile 里声明要做哪些事情，docker build 的时候就会根据这个 dockerfile 来自动化构建出一个镜像来。

比如这样：

```docker
FROM node:latest

WORKDIR /app

COPY . .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install -g http-server

EXPOSE 8080

CMD ["http-server", "-p", "8080"]
```

这些指令的含义如下：

- FROM：基于一个基础镜像来修改
- WORKDIR：指定当前工作目录
- COPY：把容器外的内容复制到容器内
- EXPOSE：声明当前容器要访问的网络端口，比如这里起服务会用到 8080
- RUN：在容器内执行命令
- CMD：容器启动的时候执行的命令

我们先通过 FROM 继承了 node 基础镜像，里面就有 npm、node 这些命令了。

通过 WORKDIR 指定当前目录。

然后通过 COPY 把 Dockerfile 同级目录下的内容复制到容器内，这里的 . 也就是 /app 目录

之后通过 RUN 执行 npm install，全局安装 http-server

通过 EXPOSE 指定要暴露的端口

CMD 指定容器跑起来之后执行的命令，这里就是执行 http-server 把服务跑起来。

把这个文件保存为 Dockerfile，然后在同级添加一个 index.html

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3bb70bf7afb14bb7af6ca6cdf1b72b29~tplv-k3u1fbpfcp-watermark.image?)

然后通过 docker build 就可以根据这个 dockerfile 来生成镜像。

    docker build -t aaa:ccc .

aaa 是镜像名，ccc 是镜像的标签

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/78b75cad62c14aa5bde5455b81fe817c~tplv-k3u1fbpfcp-watermark.image?)

FROM 是继承一个基础镜像，看输出也可以看出来，前面都是 node 镜像的内容，会一层层下载下来。

最后才是本地的我们添加的那些。

这时你在 desktop 的 images 列表里就可以看到这个镜像了：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29f516c1f3874802b3822e2b61d071d7~tplv-k3u1fbpfcp-watermark.image?)

然后执行 docker run 把这个镜像跑起来，用 desktop 我们就直接点击 run 按钮了：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/78eaea612f654aae896f8760a0b860de~tplv-k3u1fbpfcp-watermark.image?)

会让你输入这些内容：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e791bc3f1bbb4dc8bf8698c556618cb7~tplv-k3u1fbpfcp-watermark.image?)

是不是上节用 nginx 镜像的感觉回来了？这次是我们自己 build 的镜像。

指定容器名、映射的端口、点击 run：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91c03c09b625413bbb3afde49c073572~tplv-k3u1fbpfcp-watermark.image?)

然后可以看到容器内的日志，服务启动成功了：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ab0a16d25054400a07f53ac683d1c30~tplv-k3u1fbpfcp-watermark.image?)

当然，容器内打印的是 8080 端口，但在容器外要用映射的 8888 端口访问：

访问 <http://localhost:8888> 就可以看到我们在 html 写的内容了：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90d4381f765f4980be3bc24f523fc96d~tplv-k3u1fbpfcp-watermark.image?)

在容器内页打印了一条访问日志：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a2874fd653694bf1a3ca88edf058cce5~tplv-k3u1fbpfcp-watermark.image?)

至此，我们写的第一个 dockerfile 和 build 出的第一个镜像就跑成功了！

我们在 files 里看看 /app 下是啥内容：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a3301630ab724feabdde84a9cc1fcc21~tplv-k3u1fbpfcp-watermark.image?)

双击 index.html，可以看到这就是我们 build 镜像的时候 COPY 进去的文件。

但是我们想修改静态文件怎么办呢？

进入容器内改太麻烦，不如把这个 /app 目录设置为挂载点吧。

这样改下 Dockerfile：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/694c7d53c1f64ef4972cb1beda771ba8~tplv-k3u1fbpfcp-watermark.image?)

然后重新 build 出一个镜像来：

    docker build -t aaa:ddd -f 2.Dockerfile .

因为现在不是默认的 Dockerfile 了，需要用 -f 指定下 dockefile 的文件名。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b16cdc1821fe4f1e8d0f2d3827832c52~tplv-k3u1fbpfcp-watermark.image?)

构建完之后再 run 一下这个新镜像：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd9d4f456c7c4554a7cedf33a0ee15a7~tplv-k3u1fbpfcp-watermark.image?)

这次我把我的桌面目录作为数据卷挂载到 /app 目录了：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/10602e44e26f4e019c26276ac59947ca~tplv-k3u1fbpfcp-watermark.image?)

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/432ed7adea09434a9055134b95899c5e~tplv-k3u1fbpfcp-watermark.image?)

容器跑起来后可以看到确实挂载上去了，也标识为了 mount：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bd2ca0036d214d5c991da9d67ea08cd8~tplv-k3u1fbpfcp-watermark.image?)

浏览器访问下：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/464690f71f7e46b79b300ba16416a725~tplv-k3u1fbpfcp-watermark.image?)

在 inspect 这里也可以看到挂载的目录：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f681b0ce058d48e4b9c0e374bdb03d18~tplv-k3u1fbpfcp-watermark.image?)

有同学说，就算不在 dockerfile 里指定 VOLUME，我还是可以 docker run 的时候通过 -v 挂载数据卷呀。

那我为啥还要指定 VOLUME？

在 dockerfile 里指定 VOLUME 之后，如果你 docker run 的时候没有带 -v，那会放在一个临时的目录里。

比如我直接点击 run，不设置参数：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45e670e6bf204940a427ad320fb1b404~tplv-k3u1fbpfcp-watermark.image?)

docker 会随机给他生成一个名字。

还会随机生成一个目录作为数据卷挂载上去：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2e5e60a80cab49a595ae9aa7cc083881~tplv-k3u1fbpfcp-watermark.image?)

inspect 可以看到这时候的路径是一个临时的目录：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42c87675dbf64458a343c3f349eb736a~tplv-k3u1fbpfcp-watermark.image?)

这样就算你删了容器，数据也可以在这里找回。

设想下，如果你跑了个 mysql 容器，存了很多数据，但是跑容器的时候没指定数据卷。有一天，你把容器删了，所有数据都没了，可不可怕？

为了避免这种情况，mysql 的 dockerfile 里是必须声明 volume 的，这样就算你没通过 -v 指定数据卷，将来也可以找回数据。

在镜像详情可以看到 mysql 的 dockerfile，确实声明了 volume

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f8305a1fec941b58a29d40fe46ae6c0~tplv-k3u1fbpfcp-watermark.image?)

这样就能保证数据不丢失。

dockerfile 在[小册仓库](https://github.com/QuarkGluonPlasma/nestjs-course-code/tree/main/docker-test)。

## 总结

docker 镜像是通过 dockerfile 构建出来的。

我们写了第一个 dockerfile，通过 FROM、WORKDIR、COPY、RUN、EXPOSE、CMD 等指令声明了一个 http-server 提供静态服务的镜像。

docker run 这个镜像就可以生成容器，指定映射的端口、挂载的数据卷、环境变量等。

VOLUME 指令看起来没啥用，但能保证你容器内某个目录下的数据一定会被持久化，能保证没挂载数据卷的时候，数据不丢失。

写完这个 dockerfile，相信你会对 docker 镜像、容器有更具体的理解了。

首先思考一个问题：

dockerfile 是在哪里 build 的，在命令行工具里，还是在 docker 守护进程呢？

答案是在守护进程 docker daemon。

我没启动 docker daemon 的时候是不能 build 的，启动之后才可以：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f773825af9c04a6c92c9a19cf50abc7e~tplv-k3u1fbpfcp-watermark.image?)

命令行工具会和 docker daemon 交互来实现各种功能。

比如 docker build 的时候，会把 dockerfile 和它的构建上下文（也就是所在目录）打包发送给 docker daemon 来构建镜像。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95d05e0df6a147818d3523030da497a9~tplv-k3u1fbpfcp-watermark.image?)

比如我们会执行这样的命令：

```shell
docker build -t name:tag -f filename .
```

这个 . 就是构建上下文的目录，你也可以指定别的路径。

而镜像自然是越小性能越好，所以 docker 支持你通过 .dockerignore 声明哪些不需要发送给 docker daemon。

.dockerignore 是这样写的：

```
*.md
!README.md
node_modules/
[a-c].txt
.git/
.DS_Store
.vscode/
.dockerignore
.eslintignore
.eslintrc
.prettierrc
.prettierignore
```

\*.md 就是忽略所有 md 结尾的文件，然后 !README.md 就是其中不包括 README.md

node_modules/ 就是忽略 node_modules 下 的所有文件

\[a-c].txt 是忽略 a.txt、b.txt、c.txt 这三个文件

.DS_Store 是 mac 的用于指定目录的图标、背景、字体大小的配置文件，这个一般都要忽略

eslint、prettier 的配置文件在构建镜像的时候也用不到

此外，还有注释的语法：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6785ea39c73d43318b84f89433d44223~tplv-k3u1fbpfcp-watermark.image?)

这就是 dockerfile 的全部语法，没多少东西。

**docker build 时，会先解析 .dockerignore，把该忽略的文件忽略掉，然后把剩余文件打包发送给 docker daemon 作为上下文来构建产生镜像。**

这就像你在 git add 的时候，.gitignore 下配置的文件也会被忽略一样。

忽略这些用不到的文件，是为了让构建更快、镜像体积更小。

此外，还有一种减小镜像体积的手段：多阶段构建。

我们会先把源码目录发送到 docker daemon 中执行 npm run build 来构建产物，之后再 node ./dist/main.js 把服务跑起来。

也就是这样：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/75e15787ea384e26a1ea1c19eb7cd2b7~tplv-k3u1fbpfcp-watermark.image?)

新建个项目：

```shell
nest new dockerfile-test -p npm
```

编写 .dockerignore：

```.ignore
*.md
node_modules/
.git/
.DS_Store
.vscode/
.dockerignore
```

编写 Dockerfile：

```docker
FROM node:18

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "node", "./dist/main.js" ]
```

基于 node 18 的镜像。

指定当前目录为容器内的 /app。

把 package.json 复制到容器里，设置淘宝的 npm registry，执行 npm install。

之后把其余的文件复制过去，执行 npm run build。

指定暴露的端口为 3000，容器跑起来以后执行 node ./dist/main.js 命令。

然后执行 docker build：

```
docker build -t nest:first .
```

镜像名为 nest、标签为 first，构建上下文是当前目录

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/41fdc3a13cef43299ecff52842df0c3a~tplv-k3u1fbpfcp-watermark.image?)

然后就可以在 docker desktop 里看到你构建出来的镜像了：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9eff013188ba492bbbc6c150eaa96bd6~tplv-k3u1fbpfcp-watermark.image?)

如果你 build 的时候报这个错误：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e976e14995544199ad21a300a1e833c~tplv-k3u1fbpfcp-watermark.image?)

那需要加一行：

    RUN ln -s /sbin/runc /usr/bin/runc

原因如下：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1183b1a92605424eabb781e52c0b28e1~tplv-k3u1fbpfcp-watermark.image?)

点击 run 把它跑起来：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dbcc91f51a7b4c1ea59acc180612a48e~tplv-k3u1fbpfcp-watermark.image?)

容器跑成功了：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c874381b5db464f9f8ede830622bf8b~tplv-k3u1fbpfcp-watermark.image?)

浏览器访问下也没啥问题：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de236086bf0c453d81d4310277c4730d~tplv-k3u1fbpfcp-watermark.image?)

这样我们就用 docker 把我们的 nest 应用跑起来了！

但现在 docker 镜像还是不完美的。

这样构建出来的镜像有什么问题呢？

明显，src 等目录就不再需要了，构建的时候需要这些，但运行的时候只需要 dist 目录就可以了。

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/433c253702a942ceac37a1a635720d0d~tplv-k3u1fbpfcp-watermark.image?)

把这些文件包含在内，会让镜像体积变大。

那怎么办呢？

构建两次么？第一次构建出 dist 目录，第二次再构建出跑 dist/main.js 的镜像。那不是要两个 dockerfile？

确实需要构建两次，但只需要一个 dockerfile 就可以搞定。

这需要用到 dockerfile 的多阶段构建的语法。

```docker
# build stage
FROM node:18 as build-stage

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM node:18 as production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install --production

EXPOSE 3000

CMD ["node", "/app/main.js"]
```

通过 FROM 继承镜像的时候，给当前镜像指定一个名字，比如 build-stage。

然后第一个镜像执行 build。

之后再通过 FROM 继承 node 镜像创建一个新镜像。

通过 COPY --from-build-stage 从那个镜像内复制 /app/dist 的文件到当前镜像的 /app 下。

还要把 package.json 也复制过来，然后切到 /app 目录执行 npm install --production 只安装 dependencies 依赖

这个生产阶段的镜像就指定容器跑起来执行 node /app/main.js 就好了。

执行 docker build，打上 second 标签：

```
docker build -t nest:second .
```

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/20e72d75bbbe4c25a92550af8754ea08~tplv-k3u1fbpfcp-watermark.image?)

把之前的容器停掉，把这个跑起来：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/154f9b89aba247f5bdf4fc53189e3b69~tplv-k3u1fbpfcp-watermark.image?)

这次用 3003 端口来跑：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/219ddae5f2f74fc89eead1f94dae381c~tplv-k3u1fbpfcp-watermark.image?)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2edb14b6b5a14db0a853e1d3fa1779a5~tplv-k3u1fbpfcp-watermark.image?)

浏览器访问下：
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/485940af45b1484283a04d1e4067cc21~tplv-k3u1fbpfcp-watermark.image?)

nest 服务跑成功了。

这时候 app 下就是有 dist 的文件、生产阶段的 node_modules、package.json 这些文件：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cdbedb6e21ce4f22a5f2797890f81bae~tplv-k3u1fbpfcp-watermark.image?)

对比下镜像体积，明显看出有减小，少的就是 src、test、构建阶段的 node_modules 这些文件：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a92e698c2ad547febb914e84d86640de~tplv-k3u1fbpfcp-watermark.image?)

这就是多阶段构建（multi-stage build）的魅力。

有同学说，但现在镜像依然很大呀，那是因为我们用的基础的 linux 镜像比较大，可以换成 alpine 的，这是一个 linux 发行版，主打的就是一个体积小。

```docker
FROM node:18.0-alpine3.14 as build-stage

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM node:18.0-alpine3.14 as production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install --production

EXPOSE 3000

CMD ["node", "/app/main.js"]
```

node:18-alpine3.14 就是用 alpine 的 linux 的 3.14 版本，用 node 的 18.0 版本。

然后再 docker build 一下。

```
docker build -t nest:ccc .
```

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/730cb68366fe4a72a8a87b3ee4aa5bab~tplv-k3u1fbpfcp-watermark.image?)

可以看到现在镜像体积只有 277M 了：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/31c423df1b5148f08f6c3653991280b9~tplv-k3u1fbpfcp-watermark.image?)

一般情况下，我们都会用多阶段构建 + alpine 基础镜像。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/786525d5a5fa49e492bb70a6fc22af5d~tplv-k3u1fbpfcp-watermark.image?)

alpine 是一种高山植物，就是很少的养分就能存活，很贴合体积小的含义。

案例代码在[小册仓库](https://github.com/QuarkGluonPlasma/nestjs-course-code/tree/main/nest-dockerfile)。

## 总结

docker build 的时候会把构建上下文的所有文件打包发送给 docker daemon 来构建镜像。

可以通过 .dockerignore 指定哪些文件不发送，这样能加快构建时间，减小镜像体积。

此外，多阶段构建也能减小镜像体积，也就是 build 一个镜像、production 一个镜像，最终保留下 production 的镜像。

而且我们一般使用 alpine 的基础镜像，类似 node:18.10-alpine3.14，这样构建出来镜像体积会小很多。

这就是用 Nest 项目构建 Docker 镜像的方式。

Docker 是一种容器技术，它可以在操作系统上创建多个相互隔离的容器。容器内独立安装软件、运行服务。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db580a5bbf2847d8a4fb9607e9a9775e~tplv-k3u1fbpfcp-watermark.image?)

但是，这个容器和宿主机还是有关联的，比如可以把宿主机的端口映射到容器内的端口、宿主机某个目录挂载到容器内的目录。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf13c72485e642a28a9aa6b2ecf2bc00~tplv-k3u1fbpfcp-watermark.image?)

比如映射了 3000 端口，那容器内 3000 端口的服务，就可以在宿主机的 3000 端口访问了。

比如挂载了 /aaa 到容器的 /bbb/ccc，那容器内读写 /bbb/ccc 目录的时候，改的就是宿主机的 /aaa 目录，反过来，改宿主机 /aaa 目录，容器内的 /bbb/ccc 也会改，这俩同一个。

这分别叫做端口映射、数据卷（volume）挂载。

这个容器是通过镜像起来的，通过 docker run image-name。

比如:

```
docker run -p 3000:3000 -v /aaa:/bbb/ccc --name xxx-container xxx-image
```

通过 xxx-image 镜像跑起来一个叫做 xxx-container 的容器。

-p 指定端口映射，映射宿主机的 3000 到容器的 3000 端口。

-v 指定数据卷挂载，挂载宿主机的 /aaa 到容器的 /bbb/ccc 目录。

这个镜像是通过 Dockerfile 经过 build 产生的。

也就是这样的流程：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/27011d7643014cd9b50777a504448537~tplv-k3u1fbpfcp-watermark.image?)

一般在项目里维护 Dockerfile ，然后执行 docker build 构建出镜像、push 到镜像仓库，部署的时候 pull 下来用 docker run 跑起来。

基本 CI/CD 也是这样的流程：

CI 的时候 git clone 项目，根据 dockerfile 构建出镜像，打上 tag，push 到仓库。

CD 的时候把打 tag 的镜像下下来，docker run 跑起来。

这个 Dockerfile 是在项目里维护的，虽然 CI/CD 流程不用自己搞，但是 Dockefile 还是要开发者自己写的。

比如我创建一个 nest 项目：

```
npx nest new dockerfile-test -p npm
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a1e748e934b649739ddff4183054202c~tplv-k3u1fbpfcp-watermark.image?)

然后执行 npm run build，之后把它跑起来：

```
npm run build
node ./dist/main.js
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8bd4b983d31743ebb2bdb1e62aad1807~tplv-k3u1fbpfcp-watermark.image?)

这时候访问 http://localhost:3000 可以看到 hello world，说明服务跑成功了:

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d9fe3c0161b4b6c8e5dd4432d08b314~tplv-k3u1fbpfcp-watermark.image?)

那如何通过 Docker 部署这个服务呢？

我们来写下 Dockerfile：

```docker
FROM node:18

WORKDIR /app

COPY package.json .

COPY *.lock .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "node", "./dist/main.js" ]
```

FROM node:18 是继承 node:18 基础镜像。

WORKDIR /app 是指定当前目录为 /app

COPY 复制宿主机的 package.json 和 lock 文件到容器的当前目录，也就是 /app 下

RUN 是执行命令，这里执行了 npm install。

然后再复制其余的文件到容器内。

EXPOSE 指定容器需要暴露的端口是 3000。

CMD 指定容器跑起来时执行的命令是 node ./dist/main.js。

然后通过 docker build 把它构建成镜像：

```
docker build -t dockerfile-test:first .
```

-t 是指定名字和标签，这里镜像名为 dockerfile-test 标签为 first。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac919ad51f5b485c990d71cba714de7d~tplv-k3u1fbpfcp-watermark.image?)

然后在 docker desktop 的 images 里就可以看到这个镜像了：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/64797c3c1bea4d5186f616fe32fe0d8f~tplv-k3u1fbpfcp-watermark.image?)

就是现在镜像稍微大了点，有 1.45 G。

我们先跑起来看看：

```
docker run -d -p 2333:3000 --name first-container dockerfile-test:first
```

-d 是后台运行。

-p 指定端口映射，映射宿主机的 2333 端口到容器的 3000 端口。

--name 指定容器名

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1d49b82111dc45abb0c1206a06f16a6f~tplv-k3u1fbpfcp-watermark.image?)

然后就可以看到容器部分有了这个容器了：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e3919be67ab4685847772c6515b7ebb~tplv-k3u1fbpfcp-watermark.image?)

浏览器访问 http://localhost:2333 就可以访问容器内跑的这个服务：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf1ce464be31409a928a509990431be8~tplv-k3u1fbpfcp-watermark.image?)

这就是 Dockerfile 构建成镜像，然后通过容器跑起来的流程。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c06a4afd1027473cb21e7cbd66254cb1~tplv-k3u1fbpfcp-watermark.image?)

但是刚才也发现了，现在镜像太大了，有 1.45G 呢，怎么优化一下呢？

这就涉及到了第一个技巧：

## 使用 alpine 镜像，而不是默认的 linux 镜像

docker 容器内跑的是 linux 系统，各种镜像的 dockerfile 都会继承 linux 镜像作为基础镜像。

比如我们刚刚创建的那个镜像，点开详情可以看到它的镜像继承关系：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7b4e66157f04e6db41c120223e1181c~tplv-k3u1fbpfcp-watermark.image?)

最终还是继承了 debian 的 Linux 镜像，这是一个 linux 发行版。

但其实这个 linux 镜像可以换成更小的版本，也就是 alpine。

它裁剪了很多不必要的 linux 功能，使得镜像体积大幅减小了。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/786525d5a5fa49e492bb70a6fc22af5d~tplv-k3u1fbpfcp-watermark.image?)

alpine 是高山植物，就是很少的资源就能存活的意思。

我们改下 dockerfile，使用 alpine 的镜像：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4e94bfb985f244cd8447778d28b938ec~tplv-k3u1fbpfcp-watermark.image?)

node:18-alpine3.14 是使用 18 版本的 node 镜像，它底层使用 alpine 3.14 的基础镜像。

然后 docker build

```
docker build -t dockerfile-test:second .
```

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3fceb38d17b540e8a792eaa702b7fba8~tplv-k3u1fbpfcp-watermark.image?)

这次的 tag 为 second。

然后在 docker desktop 里看下：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ad3b246c6f74294b0bcaf68811b8719~tplv-k3u1fbpfcp-watermark.image?)

好家伙，足足小了 900M。

我们点开看看：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7f64dcd18ace42b695220fd46b794f3d~tplv-k3u1fbpfcp-watermark.image?)

可以看到它的底层 linux 镜像是 alpine3.14。

体积小了这么多，功能还正常么？

我们跑跑看：

```
docker run -d -p 2334:3000 --name second-container dockerfile-test:second
```

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/296e3082a1fa427abacce2129f9aea06~tplv-k3u1fbpfcp-watermark.image?)

docker desktop 可以看到这个跑起来的容器：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a581340a62694ef7a81439ad900f1357~tplv-k3u1fbpfcp-watermark.image?)

浏览器访问下，依然是正常的：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ad33cfcc58e425b938620683d617bf2~tplv-k3u1fbpfcp-watermark.image?)

alpine 只是去掉了很多 linux 里用不到的功能，使得镜像体积更小。

这就是第一个技巧。

然后再来看第二个：

## 使用多阶段构建

看下这个 dockerfile，大家发现有啥问题没：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c5c7b72c0e74681a19d9a9627c9e7b2~tplv-k3u1fbpfcp-watermark.image?)

有的同学可能会说：为什么先复制 package.json 进去，安装依赖之后再复制其他文件，直接全部复制进去不就行了？

不是的，这两种写法的效果不同。

docker 是分层存储的，dockerfile 里的每一行指令是一层，会做缓存。

每次 docker build 的时候，只会从变化的层开始重新构建，没变的层会直接复用。

也就说现在这种写法，如果 package.json 没变，那么就不会执行 npm install，直接复用之前的。

那如果一开始就把所有文件复制进去呢？

那不管 package.json 变没变，任何一个文件变了，都会重新 npm install，这样没法充分利用缓存，性能不好。

我们试试看就知道了：

现在重新跑 docker build，不管跑多少次，速度都很快，因为文件没变，直接用了镜像缓存：

```
docker build -t dockerfile-test:second .
```

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/03cec6ad71964ff78d1c96398eae7584~tplv-k3u1fbpfcp-watermark.image?)

现在我们改下 README.md：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/adb9d4044cc04dcaae887870b0466a05~tplv-k3u1fbpfcp-watermark.image?)

然后重新跑 build：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/337d91042adb49cd8d9160967db512ea~tplv-k3u1fbpfcp-watermark.image?)

现在花了 25s，其实是没有重新 npm install 的。

然后改下 package.json：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9607cdf0b15b444b9b70c77fad0e64e3~tplv-k3u1fbpfcp-watermark.image?)

再跑 docker build

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a5a7bfbfd74640439fde65550d86033d~tplv-k3u1fbpfcp-watermark.image?)

时间明显多了很多，过程中你可以看到在 npm install 那层停留了很长时间。

这就是为什么要这样写：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a82acd8cbb784530a8aa03566a023440~tplv-k3u1fbpfcp-watermark.image?)

这里没问题，大家还能发现有没有什么别的问题么？

问题就是源码和很多构建的依赖是不需要的，但是现在都保存在了镜像里。

实际上我们只需要构建出来的 ./dist 目录下的文件还有运行时的依赖。

那怎么办呢？

这时可以用多阶段构建：

```docker
FROM node:18-alpine3.14 as build-stage

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM node:18-alpine3.14 as production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install --production

EXPOSE 3000

CMD ["node", "/app/main.js"]
```

FROM 后面添加一个 as 来指定当前构建阶段的名字。

通过 COPY --from=xxx 可以从上个阶段复制文件过来。

然后 npm install 的时候添加 --production，这样只会安装 dependencies 的依赖。

docker build 之后，只会留下最后一个阶段的镜像。

也就是说，最终构建出来的镜像里是没有源码的，有的只是 dist 的文件和运行时依赖。

这样镜像就会小很多。

我们来试试看：

```
docker build -t dockerfile-test:third -f 222.Dockerfile .
```

标签为 third。

-f 是指定 Dockerfile 的名字。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0614454fe6394bb1bdd6d7477c25f623~tplv-k3u1fbpfcp-watermark.image?)

然后 desktop 里看下构建出来的镜像：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a36847acfb7e4d9d8f23e27ebf8d5c1b~tplv-k3u1fbpfcp-watermark.image?)

镜像体积比没有用多阶段构建的时候小了 250 M。

然后跑起来试试看：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8860c194ad40429b835883f0a9464718~tplv-k3u1fbpfcp-watermark.image?)

这次映射 2335 端口到容器内的 3000 端口。

依然能正常访问：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ab205faff4e4d33b6c0962aba48df5a~tplv-k3u1fbpfcp-watermark.image?)

这就是第二个技巧，多阶段构建。

## 使用 ARG 增加构建灵活性

我们写一个 test.js

```javascript
console.log(process.env.aaa);
console.log(process.env.bbb);
```

打印了环境变量 aaa、bbb

跑一下：

```
export aaa=1 bbb=2
node ./test.js
```

可以看到打印了这俩环境变量：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd86890fe8ab4ab394a0be5d708863c9~tplv-k3u1fbpfcp-watermark.image?)

然后我们写个 dockerfile，文件名是 333.Dockerfile：

```docker
FROM node:18-alpine3.14

ARG aaa
ARG bbb

WORKDIR /app

COPY ./test.js .

ENV aaa=${aaa} \
    bbb=${bbb}

CMD ["node", "/app/test.js"]
```

使用 ARG 声明构建参数，使用 \${xxx} 来取

然后用 ENV 声明环境变量。

dockerfile 内换行使用 \

之后构建的时候传入构建参数：

```
docker build --build-arg aaa=3 --build-arg bbb=4 -t arg-test -f 333.Dockerfile .
```

通过 --build-arg xxx=yyy 传入 ARG 参数的值。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/052f8b4d301e4724984deffdf64da266~tplv-k3u1fbpfcp-watermark.image?)

点击查看镜像详情，可以看到 ARG 已经被替换为具体的值了：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e01565474f24d1ea4819a5492603aa9~tplv-k3u1fbpfcp-watermark.image?)

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2443db3cf6394a96be7c9d88834fc0f0~tplv-k3u1fbpfcp-watermark.image?)

然后跑起来：

```
docker run  --name fourth-container arg-test
```

这次就不用 -d 后台运行了，直接看下日志：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c3a15c10087044fda31bcc99b6ce7db1~tplv-k3u1fbpfcp-watermark.image?)

可以看到容器内拿到的环境变量就是 ENV 设置的。

也就是说 ARG 是构建时的参数，ENV 时运行时的变量。

灵活使用 ARG，可以增加 dockerfile 的灵活性。

这就是第三个技巧。

## CMD 结合 ENTRYPOINT

前面我们指定容器跑起来之后运行什么命令，用的是 CMD：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/79d7f94069c34283a00cfd510cb4d1bc~tplv-k3u1fbpfcp-watermark.image?)

其实还可以写成 ENTRYPOINT：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e75546b3a464c80ae27b869291cd896~tplv-k3u1fbpfcp-watermark.image?)

这两种写法有什么区别么？

我们来试试：

写个 444.Dockerfile

```docker
FROM node:18-alpine3.14

CMD ["echo", "光光", "到此一游"]
```

然后 build：

```
docker build -t cmd-test -f 444.Dockerfile .
```

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/96b3f2a2e08548f5b138d958da8ee184~tplv-k3u1fbpfcp-watermark.image?)

然后 run 一下：

```
docker run cmd-test
```

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8aa22b23766045fdb3111fffa0b3336c~tplv-k3u1fbpfcp-watermark.image?)

没有指定 --name 时，会生成一个随机容器名。

就是这种：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/938f50cebb2b409099d1bf6ea36a7943~tplv-k3u1fbpfcp-watermark.image?)

这不是重点。

重点是用 CMD 的时候，启动命令是可以重写的：

```
docker run cmd-test echo "东东"
```

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a34568fe40754411bc41212be232f7ff~tplv-k3u1fbpfcp-watermark.image?)

可以替换成任何命令。

而用 ENTRYPOINT 就不会：

```docker
FROM node:18-alpine3.14

ENTRYPOINT ["echo", "光光", "到此一游"]
```

docker build:

```
docker build -t cmd-test -f 444.Dockerfile .
```

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/53a67f44a9ef4ed0833b3ec2e561eca7~tplv-k3u1fbpfcp-watermark.image?)
docker run:

```
docker run cmd-test echo "东东"
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d3c6d5fb8ad48f2be1f82bca0115c9a~tplv-k3u1fbpfcp-watermark.image?)

可以看到，现在 dockerfile 里 ENTRYPOINT 的命令依然执行了。

docker run 传入的参数作为了 echo 的额外参数。

这就是 ENTRYPOINT 和 CMD 的区别。

一般还是 CMD 用的多点，可以灵活修改启动命令。

其实 ENTRYPOINT 和 CMD 是可以结合使用的。

比如这样：

```docker
FROM node:18-alpine3.14

ENTRYPOINT ["echo", "光光"]

CMD ["到此一游"]
```

docker build：

```
docker build -t cmd-test -f 444.Dockerfile .
```

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2605356bd1824045a8c4f05fc3c0e063~tplv-k3u1fbpfcp-watermark.image?)

docker run:

```
docker run cmd-test
docker run cmd-test 66666
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/321f2a27cfca4fe093e73890e4866809~tplv-k3u1fbpfcp-watermark.image?)

当没传参数的时候，执行的是 ENTRYPOINT + CMD 组合的命令，而传入参数的时候，只有 CMD 部分会被覆盖。

这就起到了默认值的作用。

所以，用 ENTRYPOINT + CMD 的方式更加灵活。

这是第四个技巧。

## COPY vs ADD

其实不只是 ENTRYPOINT 和 CMD 相似，dockerfile 里还有一对指令也比较相似，就是 ADD 和 COPY。

这俩都可以把宿主机的文件复制到容器内。

但有一点区别，就是对于 tar.gz 这种压缩文件的处理上：

我们创建一个 aaa 目录，下面添加两个文件：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c66829888bf54dfa801d5876fe47c0cb~tplv-k3u1fbpfcp-watermark.image?)

使用 tar 命令打包：

```
tar -zcvf aaa.tar.gz ./aaa
```

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f69017d69794f64b7412964fbbd11a2~tplv-k3u1fbpfcp-watermark.image?)

然后写个 555.Dockerfile

```docker
FROM node:18-alpine3.14

ADD ./aaa.tar.gz /aaa

COPY ./aaa.tar.gz /bbb
```

docker build 生成镜像：

```
docker build -t add-test -f 555.Dockerfile .
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a40fdaed48df45bfb3d0b868c2cef58a~tplv-k3u1fbpfcp-watermark.image?)

docker run 跑起来：

```
docker run -d --name sixth-container add-test
```

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7e0e3abaeb7423e930d5b22c66f2f86~tplv-k3u1fbpfcp-watermark.image?)

可以看到，ADD 把 tar.gz 给解压然后复制到容器内了。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dbb052f1b7ef465dbc8fa8076736ee42~tplv-k3u1fbpfcp-watermark.image?)

而 COPY 没有解压，它把文件整个复制过去了：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9fc08dffaabc45d1845efcb3dc28eb3a~tplv-k3u1fbpfcp-watermark.image?)

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b7e0f945732b4a0cb9d506f60f9d370d~tplv-k3u1fbpfcp-watermark.image?)

也就是说，ADD、COPY 都可以用于把目录下的文件复制到容器内的目录下。

但是 ADD 还可以解压 tar.gz 文件。

一般情况下，还是用 COPY 居多。

案例代码在[小册仓库](https://github.com/QuarkGluonPlasma/nestjs-course-code/tree/main/dockerfile-test)

## 总结

Docker 是流行的容器技术，它可以在操作系统上创建多个隔离的容器，在容器内跑各种服务。

它的流程是 Dockerfile 经过 docker build 生成 docker 镜像，然后 docker run 来跑容器。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/897c9f267bdc420887cd699f0e6f8e29~tplv-k3u1fbpfcp-watermark.image?)

docker run 的时候可以通过 -p 指定宿主机和容器的端口映射，通过 -v 挂载数据卷到容器内的某个目录。

CI/CD 基本也是这套流程，但是 Dockerfile 是要开发者自己维护的。

Dockerfile 有挺多技巧：

- 使用 alpine 的镜像，而不是默认的 linux 镜像，可以极大减小镜像体积，比如 node:18-alpine3.14 这种
- 使用多阶段构建，比如一个阶段来执行 build，一个阶段把文件复制过去，跑起服务来，最后只保留最后一个阶段的镜像。这样使镜像内只保留运行需要的文件以及 dependencies。
- 使用 ARG 增加构建灵活性，ARG 可以在 docker build 时通过 --build-arg xxx=yyy 传入，在 dockerfile 中生效，可以使构建过程更灵活。如果是想定义运行时可以访问的变量，可以通过 ENV 定义环境变量，值使用 ARG 传入。
- CMD 和 ENTRYPOINT 都可以指定容器跑起来之后运行的命令，CMD 可以被覆盖，而 ENTRYPOINT 不可以，两者结合使用可以实现参数默认值的功能。
- ADD 和 COPY 都可以复制文件到容器内，但是 ADD 处理 tar.gz 的时候，还会做一下解压。

灵活使用这些技巧，可以让你的 Dockerfile 更加灵活、性能更好。

前面我们学习了 Docker 镜像、容器的各种操作，dockerfile 的编写，dockerignore 和镜像的多阶段构建。

是不是感觉 Docker 也没多少东西？

确实，Docker 用起来还是很简单的，学习成本不高。

那它是怎么实现的呢？

Docker 容器跑起来就像一个独立的系统一样，它是怎么做到的？

如果网页上有两份 aaa、bbb 变量，我们怎么保证它们不冲突呢？

namespace 呀：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/69b105d627b446a6a56c19770fb862ee~tplv-k3u1fbpfcp-watermark.image?)

变成 xxx.aaa、xxx.bbb 和 yyy.aaa、yyy.bbb 就不冲突了。

Docker 在一个操作系统上实现多个独立的容器也是这种思路。

linux 操作系统提供了 namespace 机制，可以给进程、用户、网络等分配一个命名空间，这个命名空间下的资源都是独立命名的。

比如 PID namespace，也就是进程的命名空间，所有进程都是在命名空间内独立分配 id 的。

而 IPC namespace 能限制只有这个 namespace 内的进程可以相互通信，不能和 namespace 外的进程通信。

Mount namespace 会创建一个新的文件系统，namespace 内的文件访问都是在这个文件系统之上。

类似这样的 namespace 一共有 6 种：

- PID namespace： 进程 id 的命名空间
- IPC namespace： 进程通信的命名空间
- Mount namespace：文件系统挂载的命名空间
- Network namespace：网络的命名空间
- User namespace：用户和用户组的命名空间
- UTS namespace：主机名和域名的命名空间

通过这 6 种命名空间，Docker 就实现了独立的容器，在容器内运行的代码就像在一个独立的系统里跑一样。

但是只有命名空间的隔离还不够，还得对资源做限制。

比如一个容器占用了太多的资源，那就会导致别的容器受影响。

怎么能限制容器的资源访问呢？

这就需要 linux 操作系统的另一种机制：Control Group。

创建一个 Control Group 可以给它指定参数，比如 cpu 用多少、内存用多少、磁盘用多少，然后加到这个组里的进程就会受到这个限制。

这样，创建容器的时候先创建一个 Control Group，指定资源的限制，然后把容器进程加到这个 Control Group 里，就不会有容器占用过多资源的问题了。

那这样就完美了么？

其实还有一个问题：每个容器都是独立的文件系统，相互独立，而这些文件系统之间可能很大部分都是一样的，同样的内容占据了很大的磁盘空间，会导致浪费。

所以 Docker 设计了一种分层机制：

每一层都是不可修改的，也叫做镜像。

要修改就创建个新的层：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f0f7de7542054f748e3c7e5964a82191~tplv-k3u1fbpfcp-watermark.image?)

然后通过一种叫做 UnionFS 的机制把这些层合并起来，变成一个文件系统：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/174a57adf33b4b99ab7a1ade26822ebc~tplv-k3u1fbpfcp-watermark.image?)

这样如果有多个容器内做了文件修改，只要创建不同的层即可，底层的基础镜像是一样的。

我们写的这个 Dockerfile，每一行指令都会生成一层镜像：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a5d2b2a32ded4c8da31faec710b73613~tplv-k3u1fbpfcp-watermark.image?)

点开 docker 镜像的详情可以看到：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a84a9935d4d4cfb958eb87809754b9b~tplv-k3u1fbpfcp-watermark.image?)

就上面这个 dockerfile，它对应的镜像就有 20 层。

当然，很多都是一层层通过 FROM 继承下来的。

Docker 通过这种分层的镜像存储，极大的减少了文件系统的磁盘占用。

哪里看出来的呢？

比如 nest 的镜像有 1g 多：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f729f92458144387a12e1abb55912446~tplv-k3u1fbpfcp-watermark.image?)

但是很多都是它继承的 node 镜像里的，可以看到每一层用了多少存储空间：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/66f1260b48a942fa899e25eb1e181b76~tplv-k3u1fbpfcp-watermark.image?)

我本地两个 nest 镜像，它们都继承了 node 镜像，这两个合起来有 2g 的存储空间么？

没有，因为下面的镜像层是公用的：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/61a61cc0cd084fd59c50902b27146fcc~tplv-k3u1fbpfcp-watermark.image?)

如果有 10 个这种类似的镜像，之前需要 10g。现在呢？可能不到 2g 就够了。

这就是分层存储的魅力。

而且还可以把这些镜像 push 到 registry 镜像仓库，别人拉下来也可以直接用。

但镜像是不可修改的，那为啥我们可以在容器内写文件呢？

因为容器跑起来会给他多加一个可写层，或者叫容器层：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/689f619938dd4675a284ee57fb2e24eb~tplv-k3u1fbpfcp-watermark.image?)

这样容器就能在这里一层写文件了。

当然，再跑一个容器会创建一个新的可写层，另一个容器的可写层的数据就丢了。

所以 Docker 设计了挂载机制，可以挂载数据卷到这个可写层上去。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b13c4403e844665b183c00ad4a9bd6c~tplv-k3u1fbpfcp-watermark.image?)

这个数据卷是可以持久化的，再跑个新容器，依然可以把这个 volume 挂上去。

这就是数据卷的作用。

回顾一下 Docker 实现原理的三大基础技术：

- Namespace：实现各种资源的隔离
- Control Group：实现容器进程的资源访问限制
- UnionFS：实现容器文件系统的分层存储，镜像合并

都是缺一不可的。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8aecb63016ab45c0bc2603071b65a420~tplv-k3u1fbpfcp-watermark.image?)

## 总结

Docker 的实现原理依赖 linux 的 Namespace、Control Group、UnionFS 这三种机制。

Namespace 做资源隔离，Control Group 做容器的资源限制，UnionFS 做文件系统的分层镜像存储、镜像合并。

我们通过 dockerfile 描述镜像构建的过程，每一条指令都是一个镜像层。

镜像通过 docker run 就可以跑起来，对外提供服务，这时会添加一个可写层（容器层）。

挂载一个 volume 数据卷到 Docker 容器，就可以实现数据的持久化。

这就是 Docker 的实现原理。

下面我**按原文的行文逻辑**，把 **Nest 项目整体替换成一个尽量简单的 Express 项目**，**目的只用于学习 Docker / Docker Compose**。
不再使用 Nest、TypeORM 等偏框架化的内容，而是用 **Express + mysql2 + redis** 直连，降低学习门槛。
**所有配图已去掉，仅保留必要的代码和命令**。

---

## 背景说明

前面我们学习了 **Express、MySQL、Redis**，并且在 Express 里远程连接 MySQL 和 Redis 来做数据存储、增删改查。

MySQL 和 Redis 都是跑在 **Docker 容器**里的。

部署 Express 项目的时候，同样是通过 **Dockerfile + docker build** 生成镜像来运行。

这就涉及到了 **3 个 Docker 容器**：

- Express 应用
- MySQL
- Redis

后面如果再加消息队列、搜索服务等，还会有更多容器。

那么问题就来了：

- 每次启动项目都要手动 `docker run` 一堆容器，非常麻烦
- 这么多容器，**启动顺序如何保证**？

解决方案就是：**Docker Compose**。

在讲 Docker Compose 之前，我们先看 **不用 Docker Compose 时是如何部署的**。

---

## 一、不使用 Docker Compose 的部署方式

### 1. 创建 Express 项目

```bash
mkdir docker-compose-test
cd docker-compose-test
npm init -y
```

安装依赖：

```bash
npm install express mysql2 redis
```

新建 `index.js`：

```js
const express = require('express');
const mysql = require('mysql2/promise');
const { createClient } = require('redis');

const app = express();
const port = 3000;

let mysqlConn;
let redisClient;

async function init() {
  mysqlConn = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'guang',
    database: 'aaa',
  });

  await mysqlConn.execute(`
    CREATE TABLE IF NOT EXISTS aaa (
      id INT AUTO_INCREMENT PRIMARY KEY,
      aaa VARCHAR(30),
      bbb VARCHAR(30)
    )
  `);

  redisClient = createClient({
    socket: {
      host: 'localhost',
      port: 6379,
    },
  });

  await redisClient.connect();
}

app.get('/', async (req, res) => {
  const keys = await redisClient.keys('*');
  res.json({ redisKeys: keys });
});

init().then(() => {
  app.listen(port, () => {
    console.log(`express app listening on ${port}`);
  });
});
```

### 2. 创建数据库

在 MySQL 里手动创建数据库：

```sql
CREATE DATABASE aaa DEFAULT CHARACTER SET utf8mb4;
```

### 3. 本地启动验证

```bash
node index.js
```

可以看到：

- MySQL 表被成功创建
- Redis 可以正常连接
- 访问 `http://localhost:3000` 能返回 redis 的 key

说明 **Express + MySQL + Redis 本地联通是没问题的**。

---

## 二、为 Express 应用编写 Dockerfile

假设 Express 服务已经开发完成，准备部署。

在项目根目录创建 `Dockerfile`：

```dockerfile
FROM node:18-alpine AS build-stage

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

FROM node:18-alpine AS production-stage

WORKDIR /app
COPY --from=build-stage /app .

EXPOSE 3000

CMD ["node", "index.js"]
```

构建镜像：

```bash
docker build -t express-app .
```

---

## 三、使用 docker run 启动三个容器

### 1. 启动 MySQL 容器

```bash
docker run -d \
  -p 3306:3306 \
  -v /Users/guang/mysql-data:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=guang \
  -e MYSQL_DATABASE=aaa \
  --name mysql-container \
  mysql
```

### 2. 启动 Redis 容器

```bash
docker run -d \
  -p 6379:6379 \
  -v /Users/guang/redis-data:/data \
  --name redis-container \
  redis
```

### 3. 启动 Express 容器

```bash
docker run -d \
  -p 3000:3000 \
  --name express-container \
  express-app
```

---

## 四、容器内访问失败的问题

查看 Express 容器日志：

```bash
docker logs express-container
```

会发现 **Redis 或 MySQL 连接失败**，报错指向：

```
127.0.0.1:6379
127.0.0.1:3306
```

### 原因说明

- 在容器内，`127.0.0.1` 指的是 **容器自身**
- MySQL 和 Redis 实际运行在 **宿主机或其他容器**

### 临时解决方式（非最佳）

把 `index.js` 中的连接地址：

```js
host: 'localhost';
```

改成 **宿主机 IP 地址**，重新 build 镜像并运行。

这一步可以跑通，但明显存在问题：

- 强依赖宿主机 IP
- 迁移、部署都不方便
- 启动顺序依然需要手动控制

---

## 五、Docker Compose 登场

我们先把所有容器停掉：

```bash
docker stop express-container mysql-container redis-container
```

---

## 六、编写 docker-compose.yml

在项目根目录创建 `docker-compose.yml`：

```yaml
services:
  express-app:
    build:
      context: .
      dockerfile: Dockerfile
    depends_on:
      - mysql
      - redis
    ports:
      - '3000:3000'

  mysql:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: guang
      MYSQL_DATABASE: aaa
    ports:
      - '3306:3306'
    volumes:
      - /Users/guang/mysql-data:/var/lib/mysql

  redis:
    image: redis
    ports:
      - '6379:6379'
    volumes:
      - /Users/guang/redis-data:/data
```

### 关键点说明

- **每个 service 就是一个容器**
- `depends_on` 声明启动顺序
- 容器之间可以直接通过 **service 名称通信**

---

## 七、修改 Express 连接配置（关键）

把 `index.js` 改为：

```js
mysqlConn = await mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'guang',
  database: 'aaa',
});

redisClient = createClient({
  socket: {
    host: 'redis',
    port: 6379,
  },
});
```

注意：

- `mysql` 和 `redis` **正是 docker-compose 中的 service 名**
- Docker Compose 会自动做 DNS 解析

---

## 八、一条命令启动所有服务

```bash
docker-compose up
```

效果：

- MySQL → Redis → Express 按顺序启动
- 所有日志合并输出
- Express 自动连上 MySQL 和 Redis

访问：

```
http://localhost:3000
```

可以看到 Redis 正常返回数据，说明三者已成功联通。

---

## 九、Docker Compose 的价值

对比一下两种方式：

### 纯 docker run 的问题

- 每个容器都要单独启动
- 启动顺序靠人为控制
- IP、端口配置复杂
- 极不适合真实项目

### Docker Compose 的优势

- 用一个 `docker-compose.yml` 描述整个系统
- 自动处理启动顺序
- 容器间通过 service 名通信
- 一条 `docker-compose up` 即可启动全部依赖

---

## 总结

这一节我们用 **Express + MySQL + Redis** 演示了：

1. 不使用 Docker Compose 时：

   - 需要手动 build 镜像
   - 手动 run 多个容器
   - 需要关心启动顺序和 IP 问题

2. 使用 Docker Compose 后：

   - 只需定义 `docker-compose.yml`
   - 使用 service 名解决网络通信
   - 一条命令即可启动完整应用环境

在实际开发中，**只要你的应用依赖多个服务（数据库、缓存、消息队列）**，
那么 **Docker Compose 几乎是必选项**。

这也是学习 Docker 时，必须掌握 Docker Compose 的原因。

下面我**严格按你刚才认可的那套思路**来重写这篇文章，核心原则是：

- **学习目标聚焦：Docker 网络 / Docker Compose 网络**
- **示例技术降级：Nest → 简单 Express**
- **去掉所有配图**
- **行文顺序、论证逻辑与原文一致**
- **保留“从错误方式 → 正确方式”的对比教学价值**

---

# Docker 容器通信与桥接网络（以 Express 为例）

上节我们在讲 Docker Compose 的时候，涉及到 **多个 Docker 容器之间的通信**。

当时采用的方式是：

> **通过宿主机 IP + 端口映射**

也就是说：

- MySQL、Redis 容器把端口映射到宿主机
- Express 容器通过访问宿主机 IP 来连接 MySQL、Redis

这种方式虽然能跑通，但并不是 Docker 中最推荐的通信方式。

---

## 一、为什么不能直接通过端口访问其他容器？

在 Docker 的实现原理中，我们讲过 **Namespace** 机制。

Docker 通过 Namespace 实现了容器隔离，其中就包括：

- **Network Namespace**

每一个 Docker 容器，默认都有自己独立的 Network Namespace。

这意味着：

- 每个容器都有独立的网卡、IP、端口空间
- 容器内访问 `127.0.0.1`，访问的是**自己**

所以：

> 一个容器，**无法直接通过端口访问另一个容器**

之前我们之所以能通信，是因为：

- 把容器端口映射到了宿主机
- 再通过宿主机 IP 间接访问

这其实是 **绕了一圈**。

---

## 二、如果多个容器共享一个 Network Namespace 呢？

既然问题在于：

> 每个容器都有独立的 Network Namespace

那如果：

- **让多个容器加入同一个 Network Namespace**
- 它们是不是就可以像在同一台机器上一样，通过端口直接通信？

Docker 对此是支持的，这种方式叫做：

> **桥接网络（Bridge Network）**

---

## 三、手动创建桥接网络

先创建一个桥接网络：

```bash
docker network create common-network
```

这个网络本质上就是一个独立的 Network Namespace，后续多个容器都可以加入其中。

---

## 四、在桥接网络中运行多个容器

先把之前的容器停掉并删除：

```bash
docker stop mysql-container redis-container express-container
docker rm mysql-container redis-container express-container
```

### 1. 启动 MySQL 容器（加入桥接网络）

```bash
docker run -d \
  --network common-network \
  -v /Users/guang/mysql-data:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=guang \
  -e MYSQL_DATABASE=aaa \
  --name mysql-container \
  mysql
```

注意几点：

- 使用 `--network common-network`
- **不再做端口映射**
- MySQL 只需要在容器网络内部被访问

---

### 2. 启动 Redis 容器（加入桥接网络）

```bash
docker run -d \
  --network common-network \
  -v /Users/guang/redis-data:/data \
  --name redis-container \
  redis
```

同样：

- 不需要端口映射
- 只要容器间能访问即可

---

## 五、修改 Express 代码：使用容器名访问服务

在桥接网络中，Docker 会为每个容器自动分配 DNS。

**容器名本身就可以作为 hostname 使用。**

假设 Express 代码中原来是：

```js
host: 'localhost';
```

现在改为：

```js
// MySQL
host: 'mysql-container';

// Redis
host: 'redis-container';
```

示例（简化）：

```js
const mysql = require('mysql2/promise');
const { createClient } = require('redis');

const mysqlConn = await mysql.createConnection({
  host: 'mysql-container',
  user: 'root',
  password: 'guang',
  database: 'aaa',
});

const redisClient = createClient({
  socket: {
    host: 'redis-container',
    port: 6379,
  },
});
```

---

## 六、重新构建并运行 Express 容器

重新构建镜像：

```bash
docker build -t express-app .
```

运行 Express 容器：

```bash
docker run -d \
  --network common-network \
  -p 3000:3000 \
  --name express-container \
  express-app
```

注意：

- **Express 容器需要端口映射**
- 因为我们要通过浏览器从宿主机访问它

---

## 七、验证运行结果

查看日志：

```bash
docker logs express-container
```

可以看到：

- MySQL 建表 SQL 正常执行
- Redis 连接成功

浏览器访问：

```
http://localhost:3000
```

可以正确返回 Redis 中的数据，说明：

> **三个容器在同一个桥接网络中通信成功**

---

## 八、桥接网络对比：之前 vs 现在

### 之前的方式（不推荐）

- 容器 → 宿主机 IP → 另一个容器
- 依赖宿主机 IP
- 不利于迁移和自动化

### 现在的方式（推荐）

- 容器 ↔ 容器
- 通过 **容器名直接访问**
- 不依赖宿主机网络结构

本质原因是：

> 多个容器加入了同一个 Network Namespace

---

## 九、在 Docker Compose 中使用桥接网络

之前的 `docker-compose.yml` 大致是这样：

- MySQL、Redis 映射端口到宿主机
- Express 通过宿主机 IP 访问

现在我们改成 **桥接网络方式**。

### docker-compose.yml 示例

```yaml
version: '3.8'

services:
  express-app:
    build:
      context: .
      dockerfile: Dockerfile
    depends_on:
      - mysql
      - redis
    ports:
      - '3000:3000'
    networks:
      - common-network

  mysql:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: guang
      MYSQL_DATABASE: aaa
    volumes:
      - /Users/guang/mysql-data:/var/lib/mysql
    networks:
      - common-network

  redis:
    image: redis
    volumes:
      - /Users/guang/redis-data:/data
    networks:
      - common-network

networks:
  common-network:
    driver: bridge
```

关键点：

- 去掉 MySQL、Redis 的端口映射
- 三个 service 加入同一个 bridge 网络
- Express 使用 service 名访问 MySQL、Redis

---

## 十、启动与验证

先清理环境：

```bash
docker-compose down --rmi all
```

启动：

```bash
docker-compose up
```

可以看到：

- 自动 build Express 镜像
- MySQL、Redis、Express 按顺序启动
- Express 成功连接数据库和缓存

---

## 十一、其实 networks 可以不写

如果你 **不显式声明 networks**：

- Docker Compose 会自动创建一个默认的 bridge 网络
- 所有 service 默认加入该网络
- 容器名依然可以作为 hostname 使用

也就是说：

> **Docker Compose 默认就已经帮你用好了桥接网络**

手动声明 networks 的意义在于：

- 多个 Compose 项目共享网络
- 更精细的网络控制

---

## 总结

- 通过端口映射 + 宿主机 IP 的方式进行容器通信，是一种**不推荐的过渡方案**
- 更合理的方式是：**桥接网络**
- 桥接网络的本质是：多个容器共享同一个 Network Namespace
- 在桥接网络中：

  - 容器可以通过 **容器名 / service 名** 直接通信
  - 不需要端口映射

- Docker Compose 默认就使用桥接网络
- 多容器应用中，**桥接网络是最简单、最标准的通信方式**

理解这一点之后，再看 Docker Compose 的网络模型，就会非常清晰。
