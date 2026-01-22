# Docker 干中学

## 一、认识 Docker

### 1.1 部署服务的痛点

#### 是什么

后端系统会部署很多服务，包括我们自己开发的服务，还有 mysql、redis 等中间件的服务，部署它们需要一系列依赖的安装、环境变量的设置等等。

#### 为什么

如果你要部署多台机器的话，同样的操作要重复多次，万一哪一步漏掉了，服务就跑不起来了。整个过程费时费力，容易出错。

#### 怎么做

使用 Docker 完美解决这个问题。它把系统的所有文件封装成一个镜像，镜像跑起来作为容器，它可以在一台机器上跑多个容器，每个容器都有独立的操作系统环境，比如文件系统、网络端口等，在容器内跑各种服务。

这样整个环境都保存在这个镜像里，部署多个实例只要通过这个镜像跑多个容器就行。

Docker 提供了 Docker Hub 镜像仓库，可以把本地镜像 push 到仓库或者从仓库 pull 镜像到本地。

---

## 二、Docker 基本操作

### 2.1 安装 Docker

#### 是什么

安装 Docker 可以在本地使用 Docker 功能。

#### 为什么

Docker 是容器技术的核心工具，需要先安装才能使用。

#### 怎么做

直接从官网下载 docker desktop。Windows 选择 Windows 的安装包，M1 Mac 要注意芯片类型，选择 Apple chip 那个包。

安装完成后，Docker Desktop 内置了 docker 命令。

在命令行输入 `docker --version` 检查 docker 命令是否可用。如果不可用，需要设置 PATH 环境变量。

Docker Desktop 可以可视化管理镜像（Images）和容器（Containers），非常方便。

### 2.2 拉取和运行镜像

#### 是什么

从 Docker Hub 拉取镜像并运行容器。

#### 为什么

通过镜像可以快速部署服务，避免重复配置环境。

#### 怎么做

**拉取镜像：**

```bash
docker pull nginx:latest
```

`latest` 是标签，代表最新版本。

如果搜不到镜像，可以使用 `docker search` 命令搜索。

**运行容器：**

```bash
docker run --name nginx-test -p 80:80 -v /tmp/aaa:/usr/share/nginx/html -e KEY1=VALUE1 -d nginx:latest
```

- `--name`：指定容器名
- `-p`：端口映射，格式为 `宿主机端口:容器端口`
- `-v`：数据卷挂载，格式为 `宿主机目录:容器目录`，可加 `:ro`（只读）或 `:rw`（读写）
- `-e`：指定环境变量
- `-d`：后台运行

### 2.3 常用命令

#### 容器管理

```bash
docker ps              # 查看运行中的容器
docker ps -a           # 查看所有容器
docker start 容器名    # 启动容器
docker stop 容器名     # 停止容器
docker rm 容器名       # 删除容器
```

#### 镜像管理

```bash
docker images          # 查看本地镜像
docker pull 镜像名     # 拉取镜像
```

#### 进入容器

```bash
docker exec -it 容器id /bin/sh    # 进入容器
```

- `-i`：交互式运行
- `-t`：分配伪终端

#### 查看日志和详情

```bash
docker logs 容器名      # 查看容器日志
docker inspect 容器名   # 查看容器详情
```

#### 数据卷管理

```bash
docker volume ls       # 查看所有数据卷
```

---

## 三、编写 Dockerfile

### 3.1 第一个 Dockerfile

#### 是什么

Dockerfile 是描述如何构建 Docker 镜像的文本文件。

#### 为什么

通过 Dockerfile 可以自动化构建镜像，保证环境的一致性。

#### 怎么做

创建一个 `Dockerfile`：

```docker
FROM node:latest

WORKDIR /app

COPY . .

RUN npm config set registry https://registry.npmmirror.com/
RUN npm install -g http-server

EXPOSE 8080

CMD ["http-server", "-p", "8080"]
```

**常用指令说明：**

| 指令 | 说明 |
|------|------|
| `FROM` | 基于一个基础镜像来修改 |
| `WORKDIR` | 指定当前工作目录 |
| `COPY` | 把容器外的内容复制到容器内 |
| `RUN` | 在容器内执行命令 |
| `EXPOSE` | 声明容器要暴露的端口 |
| `CMD` | 容器启动时执行的命令 |
| `VOLUME` | 声明数据卷挂载点 |

**构建镜像：**

```bash
docker build -t aaa:ccc .
```

`aaa` 是镜像名，`ccc` 是镜像的标签。

### 3.2 使用 VOLUME 指令

#### 是什么

`VOLUME` 指令在 Dockerfile 中声明数据卷挂载点。

#### 为什么

即使不手动挂载数据卷，也能保证容器内某个目录下的数据会被持久化到临时目录中，避免容器删除后数据丢失。

#### 怎么法

在 Dockerfile 中添加：

```docker
VOLUME /app
```

这样即使 `docker run` 时不带 `-v` 参数，Docker 也会自动创建一个临时数据卷来持久化数据。

---

## 四、优化 Dockerfile

### 4.1 使用 .dockerignore

#### 是什么

`.dockerignore` 文件用于指定构建时不发送给 Docker daemon 的文件。

#### 为什么

忽略不需要的文件可以加快构建速度、减小镜像体积。

#### 怎么做

创建 `.dockerignore`：

```
*.md
!README.md
node_modules/
[a-c].txt
.git/
.DS_Store
.vscode/
```

- `*.md`：忽略所有 md 文件
- `!README.md`：不忽略 README.md
- `node_modules/`：忽略 node_modules 目录
- `[a-c].txt`：忽略 a.txt、b.txt、c.txt

### 4.2 多阶段构建

#### 是什么

多阶段构建是指在一个 Dockerfile 中定义多个构建阶段，最终只保留最后一个阶段的镜像。

#### 为什么

构建时需要的文件（如源码）在运行时不需要，通过多阶段构建可以只保留运行需要的文件和依赖，大幅减小镜像体积。

#### 怎么做

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

- `FROM node:18 as build-stage`：指定构建阶段的名字
- `COPY --from=build-stage`：从指定阶段复制文件

### 4.3 使用 Alpine 镜像

#### 是什么

Alpine Linux 是一个轻量级的 Linux 发行版，主打体积小。

#### 为什么

默认的 Linux 镜像比较大，使用 Alpine 可以大幅减小镜像体积。

#### 怎么做

```docker
FROM node:18.0-alpine3.14
```

`node:18.0-alpine3.14` 表示使用 Node 18.0 版本，底层基于 Alpine 3.14。

使用 Alpine 镜像后，镜像体积可以从 1.45G 减小到 277M 左右。

### 4.4 使用 ARG 增加构建灵活性

#### 是什么

`ARG` 用于声明构建时的参数。

#### 为什么

通过 ARG 可以在构建时传入参数，使 Dockerfile 更加灵活。

#### 怎么做

```docker
FROM node:18-alpine3.14

ARG aaa
ARG bbb

ENV aaa=${aaa} \
    bbb=${bbb}
```

构建时传入参数：

```bash
docker build --build-arg aaa=3 --build-arg bbb=4 -t arg-test .
```

- `ARG`：构建时参数
- `ENV`：运行时环境变量

### 4.5 CMD 与 ENTRYPOINT

#### 是什么

`CMD` 和 `ENTRYPOINT` 都用于指定容器启动时执行的命令。

#### 为什么

理解两者的区别可以更好地控制容器启动行为。

#### 怎么做

**CMD 的特点：**

```docker
CMD ["echo", "hello"]
```

`CMD` 可以被 `docker run` 的参数覆盖。

```bash
docker run myimage echo "world"  # 会执行 echo "world"
```

**ENTRYPOINT 的特点：**

```docker
ENTRYPOINT ["echo", "hello"]
```

`ENTRYPOINT` 不会被覆盖，`docker run` 的参数会作为额外参数。

```bash
docker run myimage echo "world"  # 会执行 echo "hello" echo "world"
```

**结合使用：**

```docker
ENTRYPOINT ["echo", "hello"]
CMD ["world"]
```

不传参数时执行 `echo "hello world"`，传参数时只覆盖 `CMD` 部分。

### 4.6 COPY vs ADD

#### 是什么

`COPY` 和 `ADD` 都可以把宿主机的文件复制到容器内。

#### 为什么

两者在处理压缩文件时有区别。

#### 怎么做

```docker
COPY ./aaa.tar.gz /bbb
ADD ./aaa.tar.gz /aaa
```

- `COPY`：直接复制文件
- `ADD`：复制 tar.gz 等压缩文件时会自动解压

一般情况下推荐使用 `COPY`，语义更明确。

---

## 五、Docker 实现原理

### 5.1 Namespace（命名空间）

#### 是什么

Linux 的 Namespace 机制可以给进程、用户、网络等分配一个命名空间，这个命名空间下的资源都是独立命名的。

#### 为什么

实现容器之间的资源隔离，每个容器就像一个独立的系统。

#### 怎么做

Docker 使用了 6 种命名空间：

| 命名空间 | 作用 |
|---------|------|
| PID namespace | 进程 ID 的命名空间 |
| IPC namespace | 进程通信的命名空间 |
| Mount namespace | 文件系统挂载的命名空间 |
| Network namespace | 网络的命名空间 |
| User namespace | 用户和用户组的命名空间 |
| UTS namespace | 主机名和域名的命名空间 |

### 5.2 Control Group（Cgroups）

#### 是什么

Control Group 是 Linux 的资源限制机制。

#### 为什么

限制容器的资源访问（CPU、内存、磁盘等），防止某个容器占用过多资源影响其他容器。

#### 怎么做

创建容器时先创建一个 Control Group，指定资源的限制，然后把容器进程加到这个组里。

### 5.3 UnionFS（联合文件系统）

#### 是什么

UnionFS 是一种分层文件系统，可以把多个目录合并成一个目录。

#### 为什么

实现镜像的分层存储，多个容器共享基础镜像层，大幅减少磁盘占用。

#### 怎么做

每一层都是不可修改的，也叫做镜像。要修改就创建一个新的层，然后通过 UnionFS 把这些层合并起来。

Dockerfile 的每一行指令都会生成一层镜像，最后生成的镜像只显示最上面的几层，但底层继承的层也是实际存在的。

容器运行时会在镜像之上添加一个可写层（容器层），容器内的文件修改都在这一层进行。

---

## 六、数据卷挂载

### 6.1 端口映射和数据卷

#### 是什么

- 端口映射：把宿主机的端口映射到容器内的端口
- 数据卷挂载：把宿主机的目录挂载到容器内的目录

#### 为什么

让容器内的服务可以被外部访问，同时实现数据的持久化。

#### 怎么做

```bash
docker run -p 3000:3000 -v /宿主机目录:/容器目录 镜像名
```

挂载后，容器内对挂载目录的读写会直接反映到宿主机上，反之亦然。

### 6.2 Docker Desktop 文件共享配置

#### 是什么

Docker Desktop 需要配置才能访问宿主机的某些目录。

#### 为什么

出于安全考虑，Docker Desktop 默认只能访问部分目录。

#### 怎么做

在 Docker Desktop 的 Settings > Resources > File Sharing 中添加需要共享的目录。

---

## 总结

### Docker 核心概念

- **镜像**：只读的模板，包含运行应用所需的所有内容
- **容器**：镜像的运行实例，可以启动、停止、删除
- **Dockerfile**：描述如何构建镜像的文本文件
- **数据卷**：实现数据持久化的机制

### Docker 常用命令

```bash
# 镜像相关
docker pull 镜像名:标签
docker images
docker build -t 镜像名:标签 .

# 容器相关
docker run [选项] 镜像名
docker ps / docker ps -a
docker start/stop/rm 容器名

# 其他
docker exec -it 容器id /bin/sh
docker logs 容器名
docker inspect 容器名
```

### Dockerfile 最佳实践

1. 使用 Alpine 基础镜像减小体积
2. 使用多阶段构建，只保留运行需要的文件
3. 合理使用 `.dockerignore` 忽略不需要的文件
4. 利用分层缓存，把变化少的指令放在前面
5. 使用 `ENTRYPOINT + CMD` 实现灵活的启动命令

### Docker 实现原理

- **Namespace**：实现资源隔离
- **Control Group**：实现资源限制
- **UnionFS**：实现分层存储
