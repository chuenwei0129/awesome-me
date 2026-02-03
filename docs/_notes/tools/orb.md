---
group:
  title: 命令行
  order: 0
title: OrbStack 使用指南
toc: content
order: 4
---

# OrbStack 使用指南

> OrbStack 是一款在 macOS 上**轻量、高效运行 Docker 容器和 Linux 虚拟机**的工具。
> 它是 Docker Desktop 的强力替代品，性能更好、资源占用更低。

这篇文章覆盖 20% 的核心功能，解决 80% 的日常使用场景。

---

## 一、安装与快速开始

### 安装

```bash
brew install --cask orbstack
```

或从官网下载安装包，拖到 Applications 文件夹即可。

> OrbStack 需要 macOS 13 或更新系统。

### 验证安装

启动 OrbStack 后，终端直接运行：

```bash
docker run --rm -p 80:80 nginx
```

访问 `http://localhost`，看到 Nginx 欢迎页即表示成功。

---

## 二、Docker 容器使用

### 运行容器

```bash
# 端口映射
docker run --rm -p 8080:80 nginx

# 后台运行
docker run -d -p 80:80 nginx

# 交互式进入
docker run -it alpine sh
```

### 文件挂载

```bash
docker run -v $(pwd):/app -w /app node:18 npm run dev
```

OrbStack 自动处理 macOS 与容器间的文件共享，无需额外配置。

### 数据卷

```bash
# 创建卷
docker volume create data

# 使用卷
docker run -v data:/app myapp

# 导出/导入卷
orb docker volume export data /tmp/data.tar
orb docker volume import /tmp/data.tar
```

### SSH Agent 转发

容器内使用本地 SSH key（如访问 Git 仓库）：

```bash
docker run -it --rm \
    -v /run/host-services/ssh-auth.sock:/agent.sock \
    -e SSH_AUTH_SOCK=/agent.sock \
    alpine
```

OrbStack 兼容 Docker Desktop 的 SSH agent 转发方式。

### Docker Compose

```bash
docker compose up
```

在项目根目录创建 `docker-compose.yml`，OrbStack 完全支持 Compose。

---

## 三、Linux 虚拟机

### 创建虚拟机

```bash
# 创建 Ubuntu 虚拟机
orb create ubuntu my-ubuntu

# 创建指定版本
orb create ubuntu:24.04 my-ubuntu
```

### 进入虚拟机

```bash
# 进入默认 VM
orb

# 进入指定 VM
orb -m my-ubuntu

# 执行单条命令
orb -m my-ubuntu uname -a

# 指定用户执行
orb -m my-ubuntu -u ubuntu cat /etc/os-release
```

### 机器管理

```bash
# 列出所有机器
orb list
```

输出示例：

```
NAME       STATUS   IP
my-ubuntu  running  192.168.64.5
```

### 文件传输

```bash
# 上传文件到指定机器
orb push -m my-ubuntu ~/file.txt /home/ubuntu/

# 创建后自动执行脚本
orb create ubuntu new-vm && orb -m new-vm ./setup.sh
```

### 创建时自动配置（Cloud-init）

OrbStack 支持 Cloud-init，可在首次启动时自动配置 VM：

```yaml
#cloud-config
users:
  - name: devuser
    sudo: ALL=(ALL) NOPASSWD:ALL
    shell: /bin/bash
    ssh_authorized_keys:
      - ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC...

packages:
  - curl
  - vim
  - git
  - nodejs

runcmd:
  - mkdir -p /home/devuser/projects
```

在 OrbStack GUI 创建 VM 时，将此 YAML 粘贴到 "Cloud-init user data" 字段。

---

## 四、网络与端口转发

### 端口映射

```bash
docker run --rm -p 80:80 nginx
```

- `宿主机端口:容器端口`
- 通过 `http://localhost` 访问容器服务

### 直接 IP 访问

```bash
# 查看容器 IP
docker inspect --format='{{.NetworkSettings.IPAddress}}' <container-id>

# 直接访问
curl 192.168.215.2
```

### 从 Linux VM 访问 Docker 容器

```bash
# macOS 上运行容器
docker run --rm -p 80:80 nginx

# Linux VM 内访问
curl docker.orb.internal
```

`docker.orb.internal` 是 OrbStack 提供的内置域名，用于从 VM 访问 Docker 服务。

### 网络代理

```bash
# HTTP 代理
orb config set network_proxy http://example.com

# HTTPS 代理
orb config set network_proxy https://user:password@example.com:8443

# SOCKS 代理
orb config set network_proxy socks5://user:password@example.com:1081

# 恢复系统代理
orb config set network_proxy auto
```

### 自定义 IP 段

避免与本地网络冲突，在 `~/.orbstack/config.json` 中配置：

```json
{
  "bip": "198.19.192.1/23",
  "default-address-pools": [
    { "base": "198.19.192.0/19", "size": 23 },
    { "base": "198.19.224.0/20", "size": 23 }
  ]
}
```

---

## 五、资源限制

### CPU 限制

```bash
orb config set cpu.limit 4
```

或在菜单栏 OrbStack → Preferences 中设置。

### 内存限制

```bash
orb config set memory.limit 4G
```

OrbStack v1.7.0+ 支持动态内存管理，内存不再使用时自动释放。

### 启动与停止

```bash
# 启动 OrbStack
orb start

# 停止 OrbStack
orb stop
```

---

## 六、从 Docker Desktop 迁移

```bash
# 导入 Docker Desktop 数据
orb docker migrate
```

这会迁移镜像、容器、卷等数据。

如需切换回 Docker Desktop：

```bash
docker context use desktop-linux
```

OrbStack 默认使用 `orbstack` context，无需手动切换。

---

## 七、常用 CLI 命令速查

### 机器管理

| 命令                             | 说明                 |
| -------------------------------- | -------------------- |
| `orb`                            | 进入默认 Linux shell |
| `orb -m <name>`                  | 进入指定机器         |
| `orb list`                       | 列出所有机器         |
| `orb create <distro> <name>`     | 创建新机器           |
| `orb -m <name> -u <user> <cmd>`  | 在机器执行命令       |
| `orb push -m <name> <src> <dst>` | 传输文件到机器       |

### 配置管理

| 命令                                 | 说明          |
| ------------------------------------ | ------------- |
| `orb config`                         | 查看配置      |
| `orb config set cpu.limit <n>`       | 设置 CPU 限制 |
| `orb config set memory.limit <size>` | 设置内存限制  |
| `orb config set network_proxy <url>` | 设置网络代理  |
| `orb reset`                          | 重置配置      |

### Docker 命令

| 命令                             | 说明              |
| -------------------------------- | ----------------- |
| `docker ps`                      | 列出运行中的容器  |
| `docker images`                  | 列出镜像          |
| `docker logs <container>`        | 查看容器日志      |
| `docker exec -it <container> sh` | 进入容器          |
| `docker compose up`              | 启动 Compose 服务 |

---

## 八、SSH 连接虚拟机

### 直接登录

```bash
ssh root@127.0.0.1 -p 2222
```

默认端口为 2222，用户为 root。

### 使用 SSH Key 免密登录

```bash
# 生成密钥
ssh-keygen -t ed25519 -C "orbstack"

# 复制公钥到 VM
ssh-copy-id -p 2222 root@127.0.0.1
```

### VS Code Remote SSH 配置

编辑 `~/.ssh/config`：

```ssh
Host orb-vm
    HostName 127.0.0.1
    Port 2222
    User root
    IdentityFile ~/.ssh/id_ed25519
```

在 VS Code 中安装 Remote SSH 插件，连接 `orb-vm` 即可。

---

## 九、常见问题

### Q: 与 Docker Desktop 兼容吗？

A: 兼容。OrbStack 支持迁移 Docker Desktop 数据，且兼容 SSH agent 转发等功能。

### Q: 如何完全卸载？

A: 在菜单栏选择 OrbStack → Quit，然后删除应用程序。

### Q: 容器访问宿主机文件？

A: OrbStack 自动处理文件共享，使用 `-v $(pwd):/path` 即可挂载本地目录。

### Q: 多个容器端口冲突？

A: 可以使用 `docker.orb.internal` 或直接访问容器 IP，无需端口映射。

---

## 十、为什么选择 OrbStack

| 特性     | OrbStack         | Docker Desktop |
| -------- | ---------------- | -------------- |
| 启动速度 | 秒级启动         | 较慢           |
| 内存占用 | 动态释放，占用低 | 固定占用，较高 |
| CPU 使用 | 优化后降低       | 相对较高       |
| Linux VM | 内置支持         | 无             |
| 网络配置 | 简单灵活         | 相对复杂       |

---

掌握以上 20% 的功能，足以应对 80% 的开发场景。
