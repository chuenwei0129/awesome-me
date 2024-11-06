---
group:
  title: 技巧
title: Remote SSH
toc: content
---

# VSCode Remote SSH 配置

## 插件安装

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/v2-59303a4d9b36ff521a09bee473d95736_1440w.png)

## Mac 本地创建密钥对配置 SSH

### 本地客户端

在用户主目录下，看看有没有 `.ssh` 目录，如果有，再看看这个目录下有没有 `id_rsa` 和 `id_rsa.pub` 这两个文件，如果已经有了，可直接跳过。如果没有，打开 Shell，创建 SSH Key：

```perl
ssh-keygen -t rsa -C "youremail@example.com"
```

然后一路回车，使用默认值即可，由于这个 Key 也不是用于军事目的，所以也无需设置密码。

如果一切顺利的话，可以在用户主目录里找到 `.ssh` 目录，里面有 `id_rsa` 和 i `d_rsa.pub` 两个文件，这两个就是 SSH Key 的秘钥对，`id_rsa` 是私钥，不能泄露出去，`id_rsa.pub` 是公钥，可以放心地告诉任何人。

### 远程服务端

导入公钥到 Ubuntu 服务器

- 这里测试用的服务器地址为：`192.168.235.22`
- 用户为：root

```perl
ssh-copy-id -i ~/.ssh/id_rsa.pub root@192.168.235.22
```

上面这条命令是写到服务器上的 ssh 目录下去了

```perl
cd ~/.ssh
vim authorized_keys
```

可以看到客户端写入到服务器的 `id_rsa.pub` (公钥) 内容。

### VSCode 添加远程服务器配置

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220401-ff.png)

使用第一步

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/ssh-host.jpg)

使用第二步：进行服务器用户名 + ip 配置即可

> 配置代码大致如下

```perl
# Read more about SSH config files: https://linux.die.net/man/5/ssh_config
Host 107 【随便起的名字】
    HostName x.x.xx.com【IP】
    User 用户名
```

## 腾讯云云服务器创建新密钥对 (UI 操作)

### 操作步骤

1. [创建 SSH 密钥](#创建-ssh-密钥)。
2. [将 SSH 密钥绑定云服务器](#密钥绑定解绑云服务器)。
3. [使用 SSH 登录 Linux 实例](#使用-ssh-登录-linux-实例)。

### 创建 SSH 密钥

1. 登录[云服务器控制台](https://console.cloud.tencent.com/cvm/)。
2. 在左侧导航栏中，单击【[SSH 密钥](https://console.cloud.tencent.com/cvm/sshkey)】。
3. 在 SSH 密钥管理页面，单击【创建密钥】。
4. 在弹出的创建 SSH 密钥窗口中，根据实际需求，选择密钥的创建方式，填写相关信息，并单击【确定】。
    ![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/create_ssh.png)

    - **若创建方式选择 “创建新密钥对”，请输入密钥名称。**
    - 若创建方式选择 “使用已有公钥”，请输入密钥名称和原有的公钥信息。(此法同 Mac 本地配置 SSH 一样)
5. 在弹出的提示框中，单击【下载】，即可下载私钥。

### 密钥绑定/解绑云服务器

1. 登录[云服务器控制台](https://console.cloud.tencent.com/cvm/)。
2. 在左侧导航栏中，单击【[SSH 密钥](https://console.cloud.tencent.com/cvm/sshkey)】。
3. 在 SSH 密钥管理页面，勾选需要绑定/解绑云服务器的 SSH 密钥，单击【绑定/解绑实例】。
  ![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/bind_ssh.png)

4. 在弹出的绑定/解绑实例窗口中，选择地域，勾选需绑定/解绑的云服务器，单击【确定】。

### 修改 SSH 密钥名称/描述

1. 登录[云服务器控制台](https://console.cloud.tencent.com/cvm/)。
2. 在左侧导航栏中，单击【[SSH 密钥](https://console.cloud.tencent.com/cvm/sshkey)】。
3. 在 SSH 密钥管理页面，勾选需要修改的密钥，单击上方的【修改】。
  ![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/change_ssh.png)
4. 在弹出的修改密钥窗口中，输入新的密钥名称和密钥描述，单击【确定】。

### 删除 SSH 密钥

> ！若 SSH 密钥已关联云服务器或已关联自定义镜像，则该密钥不能删除。

1. 登录[云服务器控制台](https://console.cloud.tencent.com/cvm/)。
2. 在左侧导航栏中，单击【[SSH 密钥](https://console.cloud.tencent.com/cvm/sshkey)】。
3. 在 SSH 密钥管理页面，勾选所有需要删除的 SSH 密钥，单击【删除】。
  ![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/5459959b9bedaa6d0da7d74a0379203d.png)
4. 在弹出的删除密钥窗口中，单击【确定】。

### 使用 SSH 登录 Linux 实例

#### 执行以下命令，赋予私钥文件仅本人可读权限

```perl
chmod 400 <下载的与云服务器关联的私钥的绝对路径>
```

#### 使用密钥直接登录

执行以下命令，进行远程登录。

```perl
ssh -i <下载的与云服务器关联的私钥的绝对路径> <username>@<hostname or IP address>
```

- `username` 即为前提条件中获得的默认帐号。
- `hostname or IP address` 为您的 Linux 实例公网 IP 或自定义域名。

例如，执行 `ssh -i /Users/gakki/.ssh/mac_ssh_ubuntu.cer ubuntu@192.168.111.18` 命令，远程登录 Linux 云服务器。

#### 通过 config 配置信息登录

进入用户主目录下的 `.ssh` 目录，按照如下方式修改 config 文件。

```json
Host cvm    // 输入 cvm 实例的名称
HostName 192.*.*.*   // 输入 cvm 实例的公网IP地址
Port 22   // 输入端口号，默认为 22
User root   // 输入登录账号
IdentityFile /Users/gakki/.ssh/mac_ssh_ubuntu.cer // 输入 .pem 私钥文件在本机的地址
```

保存 config 文件。

运行命令连接至实例。

示例如下：

```perl
ssh cvm
```

## 参考资料

- <https://deepzz.com/post/how-to-setup-ssh-config.html>
- <https://blog.csdn.net/myNameIssls/article/details/80516577>
