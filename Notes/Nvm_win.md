## NVM

### nvm 安装

下载 [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)，下载完成，解压文件之后，双击进行安装即可。

安装完成，在命令行输入：`nvm v`，查看到对应的版本号，说明 nvm 安装成功了。

### nvm 常用命令

|         命令          |                            功能                            |
| :-------------------: | :--------------------------------------------------------: |
|  nvm list available   | 列出所有远程服务器的 nodejs 版本（官方 node version list） |
|  nvm install latest   |                   安装最新的 nodejs 版本                   |
|  nvm install 12.18.1  |                   安装对应的 nodejs 版本                   |
|    nvm use 12.18.1    |                   使用对应的 nodejs 版本                   |
| nvm uninstall 12.18.1 |                   卸载对应的 nodejs 版本                   |
|       nvm list        |                 列出已经安装的 nodejs 版本                 |

更多命令在命令行输入 `nvm` 即可查看

### nvm 使用淘宝镜像

在 nvm 安装目录下找到 `settings.txt` 文件，添加下面两行代码：

```sh
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

或者在命令行输入：

```sh
nvm node_mirror https://npm.taobao.org/mirrors/node/  # 默认地址：https://nodejs.org/dist/.
nvm npm_mirror https://npm.taobao.org/mirrors/npm/  # 默认地址：https://github.com/npm/cli/archive/.
```

### 设置 npm 全局包

解决 nvm 切换版本后，全局安装的包，需要重新安装一遍的问题，如下：

1. 设置 npm 全局包的安装路径，执行命令：`npm config set prefix "全局包安装路径"`
2. 配置环境变量：变量名为：`NPM_HOME`，变量值为：全局包安装路径
3. 在 path 中，在 `%NVM_SYMLINK%` 之前，添加 `%NPM_HOME%`

查看已经安装的全局包：`npm ls -g --depth=0`

## NRM

### nrm 的安装

全局安装 nrm：

```sh
npm install nrm -g
```

安装完成后，输入命令 `nrm ls`，可以看到默认的 6 个源（带 \* 号的为当前使用的源）

```sh
* npm ---- https://registry.npmjs.org/
  cnpm --- http://r.cnpmjs.org/
  taobao - https://registry.npm.taobao.org/
  nj ----- https://registry.nodejitsu.com/
  npmMirror  https://skimdb.npmjs.com/registry/
  edunpm - http://registry.enpmjs.org/
```

输入 `nrm use taobao`，即切换 registry 到 taobao，即可使用淘宝的源进行下载了。

### nrm 常用命令

|             命令              |                     功能                      |
| :---------------------------: | :-------------------------------------------: |
|            nrm ls             |        查看所有配置好的源以及对应名称         |
| nrm add xxx http://npm.xxx.cn | 添加源，xxx 是自定义名称，后面是源的 url 地址 |
|          nrm del xxx          |                 删除对应的源                  |
|         nrm test xxx          |   测试源的速度，不加名称，测试所有源的速度    |
|          nrm use xxx          |         切换源，即可使用对应名称的源          |

更多命令在命令行输入 `nrm` 即可查看

## Windows 系统中有两种环境变量：用户变量和系统变量

1. 环境变量不区分大小写，例如 path 跟 PATH 是一样的

2. 系统变量对所有用户有效，用户变量只对当前用户有效

3. 用户变量与系统变量，名称是变量，值是里面的内容，也就是通过变量存储了想要存储的内容，方便调用

4. 系统变量与用户变量的 PATH：告诉系统可执行文件放在什么路径（平常执行程序的路径，要放在 PATH 里面，不能建一个变量，CMD 会提示“不是内部或外部命令，或者不是可执行程序”）

5. windows 系统在执行用户命令时，若用户未给出文件的绝对路径，则首先在当前目录下寻找相应的可执行文件、批处理文件等

6. 若果当前目录找不到对应文件名的程序，在系统变量的 PATH 的路径中，依次寻找对应的可执行程序文件（查找顺序是按照路径的录入顺序从左往右寻找的，最前面一条的优先级最高，如果找到程序就停止寻找，后面的路径不再执行）

7. 如果系统变量的 PATH 的路径找不到，再到用户变量的 PATH 路径中寻找（如果系统变量和用户变量的 PATH 中同时包含了同一个命令，则优先执行系统变量 PATH 中的命令）

8. 新加了环境变量以后，要确定保存后，再重启 CMD，否则命令不生效
