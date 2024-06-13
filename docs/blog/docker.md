---
title: docker
order: 0
toc: content
group:
  title: 光速入门
---

## OrbStack

作者：PFinal 南丞
链接：https://www.zhihu.com/question/589301822/answer/3272352041
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

界面简洁的一塌糊涂。Twitter 上说：OrbStack 的出现就是为了解决 macOS 上的 Docker Desktop 原本就是饱受诟病，慢，重，资源消耗巨的问题。注意：OrbStack 不支持 Windows 和 Linux，只支持 macOS 具体的特性 (摘自网上)：⚡️ 快如闪电。2 秒内启动，优化网络 (45 Gbps) 和磁盘、Rosetta x86 模拟。轻量。低 CPU 和磁盘使用率，使用较少的内存，原生的 Swift 应用程序，对电池友好。轻松简单。最小化设置，双向命令行界面集成和文件访问，支持 VPN 和远程 VS Code，SSH 代理转发。⚙️ 强大。使用强大的网络功能，无缝运行 Docker 容器和完整的 Linux 发行版 (即将支持 Kubernetes)。通过我们的菜单栏应用程序，可以从任何地方管理容器。OrbStack 安装安装还是 brew 搞定 brew install orbstack 先别急着卸载 docker-desktop 安装 orbstack 完毕以后打开 orbstack 软件，并且打开 docker-desktop Orbstack 会询问是否合并之前的容器和挂载的目录点击合并以后就剩下漫长的等待了注意：合并的时候不知道是什么原因，编排的 lnmp 中只合并移动了部分的容器。于是缺少的一些容器又重新构建了一下

macOS 从 2020 年发布 Big Sur 开始，提供了虚拟化的框架，开发者可以在 macOS 上构建基于 Intel/ARM 的 Linux 环境。macOS 上的 Parallels Desktop 和 Docker Desktop 都在使用这个框架，但这二者都比较重。

OrbStack 主要有两个作用：替代 Docker Desktop、替代 Linux 虚拟机。架构设计上，与 Linux 的集成跟 Windows 的 WSL 类似。

执行一下测试的容器：docker run -it -p 80:80 docker/getting-started
然后再访问 http://localhost/ 即可看到最基础的 Docker 教程。

OrbStack 虚拟的 Linux 是不支持 GUI 的，不过这也不妨碍，我想大部分开发应该只会使用命令行去管理 Linux 运行环境吧。大致猜想 OrbStack 应该只是用 Docker 开启了一个 Linux 的容器，所以不支持图形化界面也是可以理解的。


这段命令用于启动一个 Docker 容器，并将其配置为在本地机器的 80 端口上提供服务。具体解释如下：

1. **docker run**：这是 Docker 命令，用于运行一个新的容器。

2. **-it**：
   - `-i`：表示交互模式 (interactive)，允许你在容器内进行交互。
   - `-t`：分配一个伪终端 (tty)，通常与 `-i` 一起使用，以便你可以在容器内使用终端。

3. **-p 80:80**：
   - `-p`：表示端口映射。
   - `80:80`：将本地机器的 80 端口映射到容器的 80 端口。这意味着你可以通过访问本地机器的 80 端口来访问容器内的服务。格式是 `<本地端口>:<容器端口>`。

4. **docker/getting-started**：这是要运行的 Docker 镜像的名称。`docker/getting-started` 是 Docker 官方提供的一个入门镜像，通常包含一些示例应用和教程，以帮助新用户快速入门。

总结一下，这条命令的作用是启动一个基于 `docker/getting-started` 镜像的新容器，并将本地机器的 80 端口映射到容器的 80 端口，以便你可以通过浏览器访问本地机器的 80 端口来与容器内的应用进行交互。

OrbStack 为 Docker compose 服务和容器都默认绑定了域名，我们可以通过访问 orb.local 来查看可访问的服务！ <img src="https://picx.zhimg.com/50/v2-b1732244deaed3f4cf19b3b9d2a195f6_720w.jpg?source=1def8aca" data-caption="" data-size="normal" data-rawwidth="782" data-rawheight="482" data-original-token="v2-cf3c62a63a7d10c73656dfb6a5bc26ee" class="origin_image zh-lightbox-thumb" width="782" data-original="https://picx.zhimg.com/v2-b1732244deaed3f4cf19b3b9d2a195f6_r.jpg?source=1def8aca"/>

作者：PFinal 南丞
链接：https://www.zhihu.com/question/589301822/answer/3272352041
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

OrbStack 也提供了创建虚拟机的功能，做一些其他的尝试，比如说：搞一个 OrbStack + Ubuntu 虚拟机：可以选择使用 Ubuntu 20.04.6 LTS 虚拟机，配合 VSCode 和 Mojo 插件，来搭建 Mojo 开发环境。还是很方便的。其他的使用方式和 docker-desktop 大差不差最后的要点之前 docker-Desktop 没法使用 host 网络，搭建 redis 集群能搞到吐血，OrbStack 支持 host 网络，所以可以省掉很多麻烦。

作者：PFinal 南丞
链接：https://www.zhihu.com/question/589301822/answer/3272352041
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
