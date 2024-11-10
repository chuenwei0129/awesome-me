## 使用 ClashX Pro 给 Switch 加速

> 参照：[利用 ClashX Pro，加速你的 Switch](https://sonatta.top/post/Oa-JnB-qx/)

### 准备步骤

1. 打开 ClashX Pro，并启用增强模式
2. 确认你的代理节点支持 UDP 转发

### 具体步骤

1. 在本机的网络设置中查看本机 IP：

    ![查看本机 IP](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/20230103165110.png)

2. 在 Switch 的网络设置中，连接与 Mac 相同的 WiFi，然后修改网络设置：

    - 将 **IP 地址设置** 改为 **手动**，并填写一个 IP 地址（如果你的电脑 IP 是 `192.168.1.XXX`，这里需要填写 `192.168.1.YYY`，前三段保持相同）。
    - 将 **网关** 和 **首选 DNS** 填写为 Mac 的 IP。

    ![Switch 网络设置](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/SCR-20230103-ni8.png)

3. 保存设置，然后重新连接网络，就可以享受加速效果了。
