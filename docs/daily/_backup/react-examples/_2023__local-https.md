本地 https 快速解决方案 —— mkcert

在本地开发中，有时候我们经常需要模拟 https 环境，比如 PWA 应用要求必须使用 https 访问。在传统的解决方案中，我们需要使用自签证书，然后在 http server 中使用自签证书。由于自签证书浏览器不信任，为了解决浏览器信任问题我们需要将自签证书使用的 CA 证书添加到系统或浏览器的可信 CA 证书中，来规避这个问题。

以前这些步骤需要一系列繁琐的openssl命令生成，尽管有脚本化的方案帮助我们简化输入这些命令(可以参考以前的 blog: Nginx SSL 快速双向认证配置)。但是仍然觉得对本地开发不那么友好，有些繁重了。本文将介绍一种更加简单友好的方式生成本地 https 证书，并且信任自签 CA 的方案——mkcert。

mkcert 简介
mkcert是一个使用 go 语言编写的生成本地自签证书的小程序，具有跨平台，使用简单，支持多域名，自动信任 CA 等一系列方便的特性可供本地开发时快速创建 https 环境使用。

安装方式也非常简单，由于 go 语言的静态编译和跨平台的特性，官方提供各平台预编译的版本，直接下载到本地，给可执行权限(Linux/Unix 需要)就可以了。下载地址: https://github.com/FiloSottile/mkcert/releases/latest

此外，mkcert 已经推送至Homebrew, MacPorts, Linuxbrew, Chocolatey, Scoop 等包管理平台中，也可以直接借助对应的包管理平台安装。如:

brew install mkcert  # Homebrew/Linuxbrew
choco install mkcert  # Chocolatey
安装成功后，应该可以使用mkcert命令了:

PS C:\Users\abcfy\projects> mkcert
Using the local CA at "C:\Users\abcfy\AppData\Local\mkcert" ✨
Usage of mkcert:

        $ mkcert -install
        Install the local CA in the system trust store.

        $ mkcert example.org
        Generate "example.org.pem" and "example.org-key.pem".

        $ mkcert example.com myapp.dev localhost 127.0.0.1 ::1
        Generate "example.com+4.pem" and "example.com+4-key.pem".

        $ mkcert "*.example.it"
        Generate "_wildcard.example.it.pem" and "_wildcard.example.it-key.pem".

        $ mkcert -uninstall
        Uninstall the local CA (but do not delete it).

For more options, run "mkcert -help".
mkcert 基本使用
从上面自带的帮助输出来看，mkcert已经给出了一个基本的工作流，规避了繁杂的openssl命令，几个简单的参数就可以生成一个本地可信的 https 证书了。更详细的用法直接看官方文档就好。

将 CA 证书加入本地可信 CA
$ mkcert -install
Using the local CA at "C:\Users\abcfy\AppData\Local\mkcert" ✨
仅仅这么一条简单的命令，就帮助我们将 mkcert 使用的根证书加入了本地可信 CA 中，以后由该 CA 签发的证书在本地都是可信的。

在 Windows 的可信 CA 列表可以找到该证书:

