# 计算机网络基础<!-- omit in toc -->

- [物理层、数据链路层、网络层](#物理层数据链路层网络层)
- [私网和公网](#私网和公网)
- [TCP](#tcp)
- [DNS 协议](#dns-协议)
  - [域名的层级结构](#域名的层级结构)
  - [域名解析](#域名解析)
  - [DNS 缓存](#dns-缓存)
  - [DNS 的完整解析](#dns-的完整解析)
- [URI 和 URL](#uri-和-url)
- [HTTP 是什么](#http-是什么)
- [HTTP 报文格式](#http-报文格式)
  - [请求报文格式](#请求报文格式)
  - [响应报文格式](#响应报文格式)
  - [请求和响应头](#请求和响应头)
- [HTTP 缓存管理](#http-缓存管理)
- [HTTP 连接管理](#http-连接管理)
  - [短连接和长连接](#短连接和长连接)
  - [对头阻塞](#对头阻塞)
  - [HTTP 2.0](#http-20)
    - [头部压缩](#头部压缩)
    - [二进制分帧](#二进制分帧)
  - [最终的 TCP 传输层本质上还是一个需要顺序交付验证的管道，所以 http2 的管道化尝试意义有多大？](#最终的-tcp-传输层本质上还是一个需要顺序交付验证的管道所以-http2-的管道化尝试意义有多大)
  - [QUIC](#quic)
- [RESTful API](#restful-api)
  - [POST 是否比 GET 安全](#post-是否比-get-安全)
  - [GET 相对 POST 的优势是什么](#get-相对-post-的优势是什么)
  - [OPTIONS](#options)
  - [公司规定所有接口都用 post 请求，这是为什么？](#公司规定所有接口都用-post-请求这是为什么)
  - [为什么那么多公司做前后端分离项目后端响应的 HTTP 状态一律 200？](#为什么那么多公司做前后端分离项目后端响应的-http-状态一律-200)
- [HTTP 的明文传输](#http-的明文传输)
- [HTTP 无状态](#http-无状态)
- [HTTP 请求头必传的字段](#http-请求头必传的字段)
- [代理](#代理)
  - [正向代理](#正向代理)
  - [反向代理](#反向代理)
- [HTTPS](#https)
- [Websocket](#websocket)
- [OAuth](#oauth)
- [还分不清 Cookie、Session、Token、JWT？](#还分不清-cookiesessiontokenjwt)
- [TCP 链接之间的网络物理断开了然后又连上，这个 TCP 链接是否断开？](#tcp-链接之间的网络物理断开了然后又连上这个-tcp-链接是否断开)
- [fetch 的 keepalive 和 http 自身的 keep-alive 机制有没有关系?](#fetch-的-keepalive-和-http-自身的-keep-alive-机制有没有关系)
- [名词解释](#名词解释)
- [资料](#资料)

## 物理层、数据链路层、网络层

> [如果让你来设计网络](https://mp.weixin.qq.com/s?__biz=Mzk0MjE3NDE0Ng==&mid=2247489907&idx=1&sn=a296cb42467cab6f0a7847be32f52dae&chksm=c2c663def5b1eac84b664c8c1cadf1c8ec23ea2e57e48e04add9b833c841256fc9449b62c0ec&scene=178&cur_album_id=1700901576128643073#rd)

## 私网和公网

私网也称内网，也叫局域网，企业或者家庭用户搭建的网络为私网，比如公司里的很多台计算机就组成了一个子网，它们内部之间是可以互相通信的，而且它们组成的子网地址是**私有地址**，**不同的子网私有地址是可以相同的**。

但如果你要访问 Google 那就要出这个子网，到公网上去找，公网才是我们所说的广义上的的互联网。

在公网上每个设备的 IP 都是**全球唯一**。

也就是说私网中的主机如果想要访问公网，必须将私网中的 IP 转为公网上的 IP，我们把这个过程称为 NAT（Network Address Translation，网络地址转换）

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/v2-acf52b5dba31ed073be16388cc9c57fc_1440w.jpg)

相信细心的你一定发现了一个问题，子网中的地址通过 NAT 转成公网请求后，它的响应包该怎么找到请求的主机呢，也就是是私网 IP 与公网 IP 应该要有个映射关系，比较常用的是端口映射。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/v2-eb342d7a16748980cea70b3e6d2b66fa_1440w.jpg)

也就是说请求包中除了有 IP 地址，实际上还有端口

NAT 为了节省 IP 资源，往往采用端口映射的方式

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/v2-c5cfd29db16110f0cd9d7f148be6b5e7_1440w.jpg)

## TCP

> [你管这破玩意儿叫 TCP？](https://mp.weixin.qq.com/s?__biz=Mzk0MjE3NDE0Ng==&mid=2247491962&idx=1&sn=aa4414483edaba487c080e91ad0efb93&chksm=c2c59bd7f5b212c12231394c585f3b063b0b2d5b05d6f05fddccdb4e856875e7ee1127bb30a7&cur_album_id=1700901576128643073&scene=189#wechat_redirect)

## DNS 协议

应用层在请求传输数据时必须事先要知道对方的 `IP` 地址，然后才能开始传输。

但 `IP` 地址是由 `161.117.232.65` 这样的数字组成的，正常人根本记不住，同样的，正常人只会记住 `http://baidu.com` 这样的网址，那就需要有类似电话本这样的翻译器把网址转成 `IP` 地址，`DNS`（域名服务器）就是干这个事的

> 拓展：[我有特别的 DNS 配置和使用技巧](https://blog.skk.moe/post/i-have-my-unique-dns-setup/)

### 域名的层级结构

类似 `http://www.baidu.com` 这样的网址也叫域名，是一个有层次的结构, 最右边的被称为顶级域名，然后是二级域名，层级关系向左降低，最左边的是主机名，通常用来表示主机的用途，比如 「www」 表示提供万维网服务

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/http-5.jpg)

### 域名解析

`http://www.apple.com` 的 `DNS` 解析如下

1. 首先访问根域名服务器，获取 `com` 顶级域名服务器的地址
2. 请求 `com` 顶级域名服务器，返回 `http://apple.com` 域名服务器的地址
3. 然后返回 `http://apple.com` 域名服务器，返回 `http://www.apple.com` 的地址

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/http-6.jpg)

### DNS 缓存

全世界的设备多如牛毛，如果每发一次请求都要按上面的 DNS 解析来获取 IP，那估计 DNS 解析系统就要炸了，如何缓解这种压力呢，答案是用缓存

- 浏览器缓存
- 操作系统缓存（`/etc/hosts` 就是操作系统 DNS 缓存的一种）
- 非权威域名服务器（类似 Google 的 `8.8.8.8` DNS 解析服务器）

### DNS 的完整解析

如果请求 `http://www.example.com`，DNS 的完整解析流程如下:

1. 浏览器中输入 `http://www.example.com` 后，会先查看浏览器的 `DNS` 缓存是否过期，未过期直接取缓存的，已过期会继续请求操作系统的缓存（`/etc/hosts` 文件等）还未找到，进入步骤 2

2. 请求本地地址配置的 `DNS resolver`（非权威域名服务器），一般由用户的 `Internet` 服务提供商 (ISP) 进行管理

3. `DNS resolver` 将 `http://www.example.com` 的请求转发到 `DNS` 根名称服务器, 根服务器返回「.com」顶级域名服务器地址

    ...

一个域名解析出多个 `ip` 地址，这样的话 `client` 可以随机选择其中一个请求，这就是我们常说的 **DNS 负载均衡**，可有效缓存 `server` 压力。

## URI 和 URL

使用 `URI`（Uniform Resource Identifier）即**统一资源标识符**就可以**唯一定位互联网上的资源**。

`URL` 是 `URI` 的一种子集，区别就是 `URI` 定义资源，而 `URL` 不单定义这个资源，**还定义了如何找到这个资源**。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/http-2.jpg)

## HTTP 是什么

HTTP 全称 HyperText Transfer Protocol —— 超文本传输协议，拆成三个部分来看，即**超文本**，**传输**，**协议**。

1. **超文本**：即「超越了普通文本的文本」，即音视频，图片，文件的混合体，除了这些超文本内容外，最关键的是超文本中含有**超链接**，超链接意味着网页等文件内容的超文本上可以点击链接到其他页面上，**互联网就是通过这样的超链接构成的**。

2. **传输**: 传输意味着至少有两个参与者，比如 `A`，`B`，这意味着 **HTTP 协议是个双向协议**，一般是将「超文本」按照约定的协议以二进制数据包的形式从 `A` 传到 `B` 或 `B` 传到 A，我们把发起请求的叫请求方，接到请求后返回数据的那一方称为响应方，但需要注意的是**传输也不限于两个参与者，允许中间有中转或者接力**，只要参与者间遵循约定的协议即可传输。

    ![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/http-1.jpg)

3. **协议**：HTTP 是一个协议，啥是协议？在日常生活中协议并不少见，比如我们租房时签订的租房协议，入职后和企业签订的劳动合同协议。

所以给 HTTP 下一个比较准确的定义：

**HTTP 是一个在计算机世界里专门在两点之间传输文字、图片、音频、视频等超文本数据的约定和规范。**

## HTTP 报文格式

请求和响应报文都由**起始行**，**头部**，**空行**，**实体**四个部分组成，只不过起始行稍有不同。

### 请求报文格式

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/http-7.jpg)

请求方法比较常见的有以下几类

1. **GET**: 请求 `URL` 指定的资源，指定的资源经服务器端解析后返回响应内容，**GET 方法具有幂等性**，即无论请求多次，都只会返回资源，而不会额外创建或改变资源，GET 请求**只传请求头，不传请求体**。

2. **POST**: 主要用来创建，修改，上传资源，不具有幂等性，一般将要请求的资源附在请求体上传输

3. **OPTIONS**: 列出可对资源实行的方法，这个方法很少见，但在跨域中会用到，也比较重要。

### 响应报文格式

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/http-8.jpg)

响应报文主要有如下五类状态码：

- `1××`：提示信息，表示目前是协议处理的中间状态，还需要后续的操作；
- `2××`：成功，报文已经收到并被正确处理；
- `3××`：重定向，资源位置发生变动，需要客户端重新发送请求；
- `4××`：客户端错误，请求报文有误，服务器无法处理；
- `5××`：服务器错误，服务器在处理请求时内部发生了错误。

```js
// 「200 OK」 是最常见的成功状态码，表示一切正常。如果是非 HEAD 请求，服务器返回的响应头都会有 body 数据。
// 「204 No Content」 也是常见的成功状态码，与 200 OK 基本相同，但响应头没有 body 数据。
// 「206 Partial Content」 是应用于 HTTP 分块下载或断点续传，表示响应返回的 body 数据并不是资源的全部，而是其中的一部分，也是服务器处理成功的状态。
// 「301 Moved Permanently」 表示永久重定向，说明请求的资源已经不存在了，需改用新的 `URL` 再次访问。
// 「302 Moved Permanently」 表示临时重定向，说明请求的资源还在，但暂时需要用另一个 `URL` 来访问。
// `301` 和 `302` 都会在响应头里使用字段 `Location`，指明后续要跳转的 `URL`，浏览器会自动重定向新的 `URL`。
// 「304 Not Modified」 不具有跳转的含义，表示资源未修改，重定向已存在的缓冲文件，也称缓存重定向，用于缓存控制。
// 「400 Bad Request」 表示客户端请求的报文有错误，但只是个笼统的错误。
// 「403 Forbidden」 表示服务器禁止访问资源，并不是客户端的请求出错。
// 「404 Not Found」 表示请求的资源在服务器上不存在或未找到，所以无法提供给客户端。
// 「500 Internal Server Error」 与 `400` 类型，是个笼统通用的错误码，服务器发生了什么错误，我们并不知道。
// 「501 Not Implemented」 表示客户端请求的功能还不支持，类似“即将开业，敬请期待”的意思。
// 「502 Bad Gateway」 通常是服务器作为网关或代理时返回的错误码，表示服务器自身工作正常，访问后端服务器发生了错误。
// 「503 Service Unavailable」 表示服务器当前很忙，暂时无法响应服务器，类似“网络服务正忙，请稍后重试”的意思。
```

### 请求和响应头

请求和响应头部报文的 `header` 格式基本都是一样的，都是 `key-value` 的形式，**对 HTTP 报文的解析和处理其实本质上就是对头字段的处理**，HTTP 的连接管理，缓存控制，内容协商等都是通过头字段来处理的。

**内容协商的判定标准：**

请求方如果要上传资源（一般是 POST 请求），可以在用 `Content-Type` 指定资源所属类型，如果请求方想要获取资源（GET 请求），可以用 `Accept` 请求头指定想要获取什么资源，这样 server 找到匹配的资源后就可以在 `Content-Type` 中指定返回的资源类型，浏览器等客户端看到后就可以据此解析处理了。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/http-9.jpg)

> **注意：**
>
> 如果返回的 `Content-Type` 是 `application/octet-stream`，这个类型是应用程序文件的默认值，意思是**未知的应用程序文件**，浏览器一会不会自动执行或询问执行，**会直接下载**。

## HTTP 缓存管理

对于资源来说，由于有些挺长时间内都不会更新，所以没必要每次请求都向 server 发起网络请求，如果第一次请求后能保存在本地，下次请求直接在本地取，那无疑会快得多，对服务器的压力也会减少。

与缓存相关的 `header` 字段有两个：

- Cache-Control
- Expires

> Cache-Control 存在，则 Expires 失效。

<!-- 理解成闹钟 -->
**⏰ Expires**：这是 http 1.0 时的规范；它的值为一个绝对时间的 GMT 格式的时间字符串，如 `Mon, 10 Jun 2015 21:31:12 GMT`，如果发送请求的时间在 Expires 之前，那么本地缓存始终有效，否则就会发送请求到服务器来获取资源。

<!-- 理解成租房合同，max-age 指租房期限 -->
另一个请求头为 `Cache-Control`。**这个缓存指令是单向的**，也就是说请求中设置的指令，不一定包含在响应中，请求中如果没有传 `Cache-Control`，`server` 也可以返回 `Cache-Control`。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/http-10.jpg)

**如图示：客户端发起请求后，服务器返回 `Cache-Control：max-age=30`，代表资源在客户端可以缓存 30 秒，30 秒内客户端的请求可以直接从缓存获取，超过 30 秒后需要向服务器发起网络请求。**

`max-age` 是 HTTP 缓存控制最常用的属性，**表示资源存储的最长时间**，需要注意的是，时间的计算起点是响应报文的创建时刻（即 `Date` 字段，也就是**离开服务器的时刻**），超过后客户端需要重新发起请求。

除此之外，还有其它属性值如下:

- `no-cache`: **缓存但重新验证**服务器端会验证请求中所描述的缓存是否过期，若未过期（注：实际就是返回 304），则缓存才使用本地缓存副本。

- `no-store`: 这才是真正的不允许缓存，比如秒杀页面这样变化非常频繁的页面就不适合缓存。

- `must-revalidate`：一旦资源过期（比如已经超过 max-age ），在成功向原始服务器验证之前，不能使用缓存。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/http-11.jpg)

`Cache-Control` 只能刷新数据，但不能很好地利用缓存，又因为缓存会失效，使用前还必须要去服务器验证是否是最新版，存在一定的性能稳定，所以 HTTP 又引入了条件缓存（协商缓存）。

条件请求以 `If` 开头，有 If-Match，If-Modified-Since，If-None-Match，If-Range，If-Unmodified-Since 五个头字段，我们最常用的是 if-Modified-Since 和 If-None-Match 这两个头字段，所以重点介绍一下。

- `if-Modified-Since`：指的是文件最后修改时间，服务器只在所请求的资源**在给定的日期时间之后对内容进行过修改的情况下**才会将资源返回，如果请求的资源从那时起未经修改，那么**返回一个不带有消息主体的 `304` 响应**，需要第一次请求提供 Last-modified，只能精确到一秒，第二次请求就可以在 if-Modified-Since 首部带上此值了。

- `If-None-Match`：条件请求首部，对于 GET 和 HEAD 请求方法来说，当且仅当服务器上没有任何资源的 `ETag` 属性值与这个首部中列出的相匹配的时候，服务器端会才返回所请求的资源，响应码为 `200`，

> ETag 是实体标签（Entity Tag）的缩写，是资源的唯一标识，主要解决修改时间无法准确区分文件变化的问题，比如文件在一秒内修改了多次，由于修改时间是秒级的，用 `if-Modified-Since` 就会误认为资源没有变化，而每次文件修改了都会修改 `ETag`，也就是说 `ETag` 可以精确识别资源的变动, 所以如果对资源变化很敏感觉的话，应该用 `If-None-Match`
>
> 注：ETag 有强，弱之分，强 ETag 要求资源在字节级别必须完全相符，弱 ETag 在值前有「W/」标记，只要求资源在语义上没啥变化，比如加了几个空格等等。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/http-12.jpg)

需要注意的是不管是 `if-Modified-Since` 还是 `If-None-Match`，**这两者只会在资源过期（即存活时间超 max-age）后才会触发**。

## HTTP 连接管理

### 短连接和长连接

首先我们知道双方要建立可靠连接要经过 TCP 的三次握手，然后才能开始传输 HTTP 的报文，报文传输之后要经过四次挥手断开连接。

HTTP 0.9，1.0 时期，发送完 HTTP 报文后，连接立马关闭，这种连接被称为短链接，短链接效率非常低下，大量时间浪费在无意义的三次握手和四次挥手上。

HTTP 1.1 对此进行了改进，每次报文发送后不立即关闭，可复用，长链接由于减少了大量无意义的三次握手，四次挥手，效率大大提升了！

我们可以在请求头里明确要求使用长链接，指定 `Connection: keep-alive` 即可，**在 HTTP 1.1 就算不指定也是默认开启的**。

> 如果服务器支持长链接，不管客户端是否显式要求长链接，它都会在返回头里带上 `Connection: keep-alive`，这样接下来双方就会使用长连接来收发报文，客户端如果想显式关闭关闭，只需要指定 `Connection: Close` 头字段即可。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/http-13.jpg)

### 对头阻塞

> **TL;DR**
>
> 🌿 **在 HTTP 1.1 中，由于没法区分每个数据包所属的请求，所以它规定每个请求只能串行处理。**

长连接让传输效率大大提升，但新的问题又来了，因为 HTTP 规定报文必须一发一收，如果在要连接上发多个 HTTP 报文，**多个报文会被累积到队列里依次处理（不能并行处理）只要队首的请求被阻塞了**，后续 HTTP 的发送就受到影响，这就是有名的队头阻塞。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/http-14.jpg)

对于每一个最终发送的以太网包能传输的应用层数据是有限的，如果上层的应用层要发的数据大小超过了以太网包的大小，**就需要对其进行拆分，分成几个以太网包再传输。**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/http-15.jpg)

**接收方拿到每个包的应用层数据再组装成应用层数据，然后一个请求才算接收完成**，响应也是类似的原理。

接收方通过 `Content-Length` 就可以判断几个请求报文组合后大小是否达到这个设置值，如果是说明报文接收完毕，就可以对请求进行解析了，如果少于这个值，说明还需要接收请求包直到达到这个设定的值。

> Content-Length 指的是实体消息首部，也就是在 POST，PUT 等方法中传输实体数据时才会出现，GET 请求不会出现

🌿 在 `HTTP 1.1` 中，**由于没法区分每个数据包所属的请求，所以它规定每个请求只能串行处理，由于没法区分每个数据包所属的请求，所以它规定每个请求只能串行处理，由于没法区分每个数据包所属的请求，所以它规定每个请求只能串行处理（‼️）**，每个请求通过 `Content-Length` 判断接收完每个请求的数据包并处理后，才能再处理下一个请求，这样的话如果某个请求处理太慢就会影响后续请求的处理。

### HTTP 2.0

HTTP 2.0 只在语法上做了重要改进，完全变更了 HTTP 报文的传输格式，与 HTTP 1.1 的语义完全相同。

#### 头部压缩

HTTP 1.1 考虑了 `body` 的压缩，但没有考虑 `header` 的压缩, 经常出现传了头部上百，上千字节，但 `Body` 却只有几十字节的情况，浪费了带宽。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/http-18.jpg)

那么 `HTTP 2.0` 是如何解决的呢？它开发了专门的 HPACK 算法，在客户端和服务器两端建立字典，用索引号表示重复的字符串，还采用哈夫曼编码来压缩数字和整数，可以达到最高达 90% 的压缩率。

#### 二进制分帧

HTTP 1.1 是纯文本形式，而 2.0 是完全的二进制形式，它把 TCP 协议的部分特性挪到了应用层，把原来的 `Header + Body` 消息打散为了数个小版的二进制"帧"（Frame）,“HEADERS”帧存放头数据、“DATA”帧存放实体数据。

HTTP 2 定义了「流」（stream）的的概念，它是二进制帧的双向传输序列，同一个消息往返的数据帧（header 帧和 data 帧）会分配一个唯一的流 ID，**这样我们就能区分每一个请求**。在这个虚拟的流里，数据帧按先后次序传输，到达应答方后，将这些数据帧按它们的先后顺序组装起来，最后解析 HTTP 1.1 的请求头和实体。

**在同一时间，请求方可以在流里发请求，应答方也可以也流里发响应，对比 HTTP 1.1 一个连接一次只能处理一次请求-应答，吞吐量大大提升。**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/http-23.jpg)

所有的流都是在同一个连接中流动的，这也是 HTTP 2.0 经典的**多路复用**（ Multiplexing），另外由于每个流都是独立的，所以谁先处理好请求，谁就可以先将响应通过连接发送给对方，也就解决了队头阻塞的问题。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/http-19.jpg)

**在 HTTP 2 中，两个请求同时发送，可以同时接收，而在 HTTP 1.1 中必须等上一个请求响应后才能处理下一个请求。**

HTTP 2 引入的流，帧等语法层面的改造确实让其传输效率有了质的飞跃，但是它依然存在着队头阻塞。

其实主要是因为 HTTP 2 的分帧主要是在应用层处理的，而分帧最终还是要传给下层的 TCP 层经由它封装后再进行传输，每个连接最终还是顺序传输这些包。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/http-20.jpg)

**HTTP/2 在应用协议层通过多路复用同一个TCP连接解决了队头阻塞问题，但这是以下层协议比如TCP 协议不出现任何数据包阻塞为前提的。**

> TCP 是可靠连接，为了保证这些包能顺序传给对方，会进行丢包重传机制，如果传了三个包，后两个包传成功，但第一个包传失败了，TCP 协议栈会把已收到的包暂存到缓存区中，停下等待第一个包的重传成功，这样的话在网络不佳的情况下只要一个包阻塞了，由于重传机制，后面的包就被阻塞了，上层应用由于拿不到包也只能干瞪眼了。

由于这是 TCP 协议层面的机制，无法改造，所以 HTTP 2 的队头阻塞是不可避免的。

### [最终的 TCP 传输层本质上还是一个需要顺序交付验证的管道，所以 http2 的管道化尝试意义有多大？](https://www.zhihu.com/question/340651010)

> 这些都跟 TCP 本身是否乱序毫无关系，无论是 HTTP/1.1 还是 HTTP/2，数据都是首先提交到 TCP 流，再由 TCP 流发送到对端的，当数据提交到 TCP 流的时候，它传输的顺序就已经完全确定了，HTTP/2 的设计是为了让数据在提交到 TCP 流之前可以自由决定各自的顺序。
<!-- http 只管自己的分包合包抽象即可。 -->
> **每个层各司其职，只要管好自己的工作即可**，可扩展性很好，**比如对于 HTTP 来说，它底层可以用 TCP，也可以用 UDP 来传输**，哪天如果再出现了更牛逼的协议，也可以替换之，不影响上下层。

### QUIC

HTTP 3 对此进行了改进，将 TCP 换成了 UDP 来进行传输，由于 UDP 是无序的，不需要断建连，包之间没有依赖关系，所以从根本上解决了“队头阻塞”, 当然由于 UDP 本身的这些特性不足以支撑可靠的通信，所以 Google 在 UDP 的基础上也加了 TCP 的连接管理，拥塞窗口，流量控制等机制，这套协议我们称之为 QUIC 协议。

- [QUIC 是如何解决 TCP 性能瓶颈的？](https://mp.weixin.qq.com/s/6SIA_YZSEu1K2yJDhB56Kw)
- [既然 udp 更快，为什么这么多年主流一直用 tcp ?](https://www.zhihu.com/question/558479268/answer/2709203455)

## RESTful API

### POST 是否比 GET 安全

是的，POST 要比 GET 安全一点点，注意，是一点点。。。两者都是明文传送，但是有一个细节，就是 GET 的 `URL` 会被放在浏览器历史和 WEB 服务器日志里面。POST 发完基本就木有了。

所以如果你把关键数据放在 GET 里面，被人偷窥了浏览器，或者 WEB 服务器被入侵日志被人倒去了，基本泄露可能性 100%。而 POST 来说，日志没有记录，只要数据库服务器不被入侵，基本还是安全的。

当然如果被抓了包，这一切都没有什么卵用，所以，HTTPS 该用还是得用。

### GET 相对 POST 的优势是什么

最大的优势是，GET 的 `URL` 可以人肉手输啊。。。本质上面，GET 的所有信息都在 `URL`，所以很方便的记录下来重复使用。

> 可以重复的交互，比如取个数据，跳个页面，用 GET，不可以重复的操作，比如创建一个条目/修改一条记录，用 POST, 因为 POST 不能被缓存，所以浏览器不会多次提交。GET 请求也可以用 body 传输数据（但不建议）

### OPTIONS

**简单来说，就是可以用 `options` 请求去嗅探某个请求在对应的服务器中都支持哪种请求方法。**

在前端中我们一般不会主动发起这个请求，但是往往你可以看到浏览器中相同的请求发起了 `2` 次

跨域共享标准规范要求，对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求，从而获知服务端是否允许该跨域请求。服务器确认允许之后，才发起实际的 HTTP 请求。

### [公司规定所有接口都用 post 请求，这是为什么？](https://www.zhihu.com/question/336797348/answer/2189330351)

<!-- 缓存：幂等即可缓存 -->
- 幂等不修改服务器状态的用 GET
- 幂等修改服务器状态的用 PUT
- 不幂等修改服务器状态的用 POST

### [为什么那么多公司做前后端分离项目后端响应的 HTTP 状态一律 200？](https://www.zhihu.com/question/513865370/answer/2344277817)

## HTTP 的明文传输

HTTP 的明文传输带来的问题是无法防止中间人截获、盗取和篡改信息，从你的路由器、运营商到对方服务器，中间每一步都是明文。这里面可下手的地方太多了。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/http-1.jpg)

比如很多地方电信运营商就擅自给用户的网页插入浮动窗口广告，甚至影响正常浏览，不知情的用户还骂网站。其实这就是 HTTP 的明文特性导致的天然漏洞，对 HTTPS 网站则束手无策。因为后者只有用户和服务器能看到真实请求数据，对所有中间环节都加了密，自然也就无从篡改。

比如与运营商合作的营销公司。他们可以通过截获请求盗取并伪造你的身份信息来关注一票僵尸号或给某些营销微博点赞。方法也简单，把你本次成功访问微博的 `cookie` 存下来，直接用这个 `cookie` 发送关注别人的请求就行。这种情况根本无需窃取你密码，也就无所谓密码大量泄露了。

## HTTP 无状态

> [HTTP 是一个无状态的协议。这句话里的无状态是什么意思？](https://www.zhihu.com/question/23202402/answer/527748675)

## HTTP 请求头必传的字段

HTTP 1.1 允许一台服务器搭建多个 Web 站点，也就是说一台服务器可以托管多个域名对应的网站，这样的话必须指定 `Host`，到达服务器后才能找到对应的网址向其请求。

## 代理

### 正向代理

用 FQ 软件进行访问 facebook，FQ 的方式主要是找到一个可以访问国外网站的代理服务器，我们将请求发送给代理服务器，代理服务器去访问国外的网站，然后将访问到的数据传递给我们！

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/proxy-2.jpg)

上述这样的代理模式称为正向代理，正向代理最大的特点是**客户端非常明确要访问的服务器地址；服务器只清楚请求来自哪个代理服务器**，而不清楚来自哪个具体的客户端；**正向代理模式屏蔽或者隐藏了真实客户端信息**。

客户端必须设置正向代理服务器，当然前提是要知道正向代理服务器的 IP 地址，还有代理程序的端口。

总结来说：正向代理，**“它代理的是客户端”**，是一个位于客户端和原始服务器之间的服务器，为了从原始服务器取得内容，客户端向代理发送一个请求并指定目标（原始服务器）。

### 反向代理

明白了什么是正向代理，我们继续看关于反向代理的处理方式，举例如我国的某宝网站，每天同时连接到网站的访问人数已经爆表，单个服务器远远不能满足人民日益增长的购买欲望了。

此时就出现了一个大家耳熟能详的名词：分布式部署；也就是通过部署多台服务器来解决访问人数限制的问题。

某宝网站中大部分功能也是直接使用 Nginx 进行反向代理实现的。

那么反向代理具体是通过什么样的方式实现的分布式的集群操作呢，我们先看一个示意图：

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/proxy-3.jpg)

此时请求的来源也就是客户端是明确的，但是请求具体由哪台服务器处理的并不明确了，Nginx 扮演的就是一个反向代理角色。

客户端是无感知代理的存在的，**反向代理对外都是透明的，访问者并不知道自己访问的是一个代理**。因为客户端不需要任何配置就可以访问。

反向代理，“**它代理的是服务端**”，主要用于服务器集群分布式部署的情况下，反向代理隐藏了服务器的信息。

反向代理的作用：

- 保证内网的安全，通常将反向代理作为公网访问地址，Web 服务器是内网。
- 负载均衡，通过反向代理服务器来优化网站的负载。

通常情况下，我们在实际项目操作时，正向代理和反向代理很有可能会存在同一个应用场景中，正向代理代理客户端的请求去访问目标服务器，目标服务器是一个反向单利服务器，反向代理了多台真实的业务处理服务器。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/proxy-4.jpg)

## HTTPS

http 和 https 使用连接方式不同，默认端口也不一样，http 是 `80`，https 是 `443`。

> [破玩意 | 用 HTTPS 传纸条](https://mp.weixin.qq.com/s?__biz=Mzk0MjE3NDE0Ng==&mid=2247497199&idx=1&sn=d4cdcfe5449f62f1a32feb7336da8d3f&chksm=c2c58f42f5b20654107f77cc84aafd73963a48bac37834aeab43ecc7747b2989459e2373b25e&scene=178&cur_album_id=1703494881072955395#rd)

**公钥加密，私钥解密，这个叫加密**，是为了保证内容安全，因为私钥只有自己知道，是为了保证这个信息不被中间人解开。

**私钥加密，公钥解密，这个叫签名**，是为了防止内容被篡改，因为公钥所有人都知道，所有人都能看到这个信息做验证。

> [西方机构吊销了俄罗斯的 HTTPS 证书有什么影响吗？](https://www.zhihu.com/question/523817733/answer/2440936723)

A 和 B 通信，A 收到由证书认证机构 C 颁发的 B 的证书后认定自己确实是在和 B 通信，而不是和 D 冒充的 B 通信，这是证书的作用。

打个比方，你作为普通用户在淘宝上经过淘宝官方认证的苹果官方旗舰店买 iPhone，你相信这家店是真的苹果官方旗舰店，这是因为你相信淘宝的认证。要是哪天淘宝和华强北串通，华强北在淘宝上也开一家叫“苹果官方旗舰店”的店而且得到淘宝官方认证，你就有可能在“官方旗舰店”买到假 iPhone

**HTTPS 的缺点：**

- HTTPS 协议多次握手，导致页面的加载时间延长近 50%。
- HTTPS 连接缓存不如 HTTP 高效，会增加数据开销和功耗。
- 申请 SSL 证书需要钱，功能越强大的证书费用越高。
- SSL 涉及到的安全算法会消耗 CPU 资源，对服务器资源消耗较大。

## Websocket

> [WebSocket 是什么原理？为什么可以实现持久连接？](https://www.zhihu.com/question/20215561/answer/40316953)

## OAuth

> [你管这破玩意叫 OAuth](https://mp.weixin.qq.com/s?__biz=Mzk0MjE3NDE0Ng==&mid=2247496108&idx=1&sn=e8571ca239c974e8e93a10a12190497f&chksm=c2c58b01f5b20217de013699bd6978ae213d545605d4de49a19348b01241ebe2dd534b671767&scene=178&cur_album_id=1703494881072955395#rd)

## 还分不清 Cookie、Session、Token、JWT？

- [还分不清 Cookie、Session、Token、JWT？](https://zhuanlan.zhihu.com/p/164696755)
- [为什么 sessionID 使用 cookie 存储？](https://www.zhihu.com/question/558028488/answer/2704729652)

## [TCP 链接之间的网络物理断开了然后又连上，这个 TCP 链接是否断开？](https://www.zhihu.com/question/53672815/answer/2630869675)

> **拔掉网线这个动作不会影响传输层。**

## [fetch 的 keepalive 和 http 自身的 keep-alive 机制有没有关系?](https://www.zhihu.com/question/540397795/answer/2550485344)

## 名词解释

- **主机：** 计算机网络上任何一种能够连接网络的设备都被称为主机或者说是端系统，比如手机、平板电脑、电视、游戏机、汽车等，随着 5G 的到来，将会有越来越多的终端设备接入网络。

- **半双工模式：** 连接在**集线器**中的端系统每次只能有数据包一个发送，只有这个发送完毕其他电脑才能再发送，这称为半双工模式。

- **全双工模式：** 连接在**交换机**中的端系统可以彼此之间相互通信，相互发送消息互不影响。

- **TCP/IP 协议簇：** 不仅仅只有 TCP 协议和 IP 协议，而是以 TCP、IP 协议为主的一系列协议，比如 ICMP 协议、ARP 协议、UDP 协议、DNS 洗衣、SMTP 协议等。

- **分组：** 当一台端系统向另外一台端系统发送数据时，通常会将数据进行分片，然后为每段加上首部字节，从而形成计算机网络的专业术语：分组。这些分组通过网络发送到端系统，然后再进行数据处理。
  - **报文：** 通常指的是应用层的分组。
  - **报文段：** 通常把运输层的分组称为报文段。
  - **数据报：** 通常将网络层的分组称为数据报。
  - **帧：** 一般把链路层的分组称为帧。

- **单播：** 单播最大的特点就是 1 对 1，早期的固定电话就是单播的一个例子。

- **广播：** 我们一般小时候经常会广播体操，这就是广播的一个事例，主机和与他连接的所有端系统相连，主机将信号发送给所有的端系统。

- **多播：** 多播与广播很类似，也是将消息发送给多个接收主机，**不同之处在于多播需要限定在某一组主机作为接收端。**

- **任播：** 任播是在特定的多台主机中选出一个接收端的通信方式。虽然和多播很相似，**但是行为与多播不同，任播是从许多目标机群中选出一台最符合网络条件的主机作为目标主机发送消息。然后被选中的特定主机将返回一个单播信号，然后再与目标主机进行通信。**

- **CS 体系：** 它是一种面向网络应用的体系结构。把系统中的不同端系统区分为客户和服务器两类，客户向服务器发出服务请求，由服务器完成所请求的服务，并把处理结果回送给客户。在客户-服务器体系结构中，有一个总是打开的主机称为 服务器(Server)，它提供来自于 客户(client) 的服务。我们最常见的服务器就是 Web 服务器，Web 服务器服务于来自 浏览器 的请求。

- **P2P 体系：** 对等体系结构，相当于没有服务器了，大家都是客户机，每个客户既能发送请求，也能对请求作出响应。

- **端口号：** 在同一台主机内，端口号用于**标识不同应用程序进程**。

- **URI：** 它的全称是（Uniform Resource Identifier），中文名称是统一资源标识符，使用它就能够**唯一的标记互联网上资源**。

- **URL：** 它的全称是（Uniform Resource Locator），中文名称是统一资源定位符，它实际上是 URI 的一个子集。

- **Web 服务器：** Web 服务器的正式名称叫做 Web Server，Web 服务器可以向浏览器等 Web 客户端提供文档，也可以放置网站文件，让全世界浏览；可以放置数据文件，让全世界下载。目前最主流的三个 Web 服务器是 Apache、 Nginx 、IIS。

- **CDN：** CDN 的全称是 Content Delivery Network，即内容分发网络，它应用了 HTTP 协议里的缓存和代理技术，代替源站响应客户端的请求。CDN 是构建在现有网络基础之上的网络，它依靠部署在各地的边缘服务器，通过中心平台的负载均衡、内容分发、调度等功能模块，**使用户就近获取所需内容，降低网络拥塞，提高用户访问响应速度和命中率。**

- **WebService：** WebService 是一种 Web 应用程序，**WebService 是一种跨编程语言和跨操作系统平台的远程调用技术。**

- **HTTP：** TCP/IP 协议簇的一种，它是一个在计算机世界里专门在两点之间传输文字、图片、音频、视频等超文本数据的约定和规范。

- **Session：** Session 其实就是客户端会话的缓存，主要是为了弥补 HTTP 无状态的特性而设计的。**服务器可以利用 Session 存储客户端在同一个会话期间的一些操作记录。** 当客户端请求服务端时，服务端会为这次请求开辟一块内存空间，这个对象便是 Session 对象，存储结构为 ConcurrentHashMap。

- **Cookie：** HTTP 协议中的 Cookie 包括 Web Cookie 和浏览器 Cookie，它是服务器发送到 Web 浏览器的一小块数据。服务器发送到浏览器的 Cookie，浏览器会进行存储，并与下一个请求一起发送到服务器。**通常，它用于判断两个请求是否来自于同一个浏览器，例如用户保持登录状态。**

- **DNS 协议：** 由于 IP 地址是计算机能够识别的地址，而我们人类不方便记忆这种地址，所以为了方便人类的记忆，使用 DNS 协议，来把我们容易记忆的网络地址映射称为主机能够识别的 IP 地址。

- **根 DNS 服务器：** 最顶级的 DNS 服务器，全世界有 400 多台根域名服务器，由 13 个不同的组织管理，根域名服务器提供 TLD 服务器的 IP 地址。

- **顶级域 DNS 服务器：** 这个我们比较熟悉，像是常见的顶级域（如 com、org、net、edu 和 gov）和所有的国家顶级域（uk、fr、ca 和 jp），TLD 服务器提供了权威 DNS 服务器的 IP 地址。

- **权威 DNS 服务器：** 这个服务器就是因特网上具有公共可访问主机的 DNS 记录的服务器。

- **本地 DNS 服务器：** 一般来说，每个 ISP 都有一台本地 DNS 服务器，本地 DNS 服务器会临近主机端。

- **TELNET 协议：** 远程登陆协议，它允许用户(Telnet 客户端)通过一个协商过程来与一个远程设备进行通信，它为用户提供了在本地计算机上完成远程主机工作的能力。

- **SSH 协议：** SSH 是一种建立在应用层上的安全加密协议。因为 TELNET 有一个非常明显的缺点，那就是在主机和远程主机的发送数据包的过程中是明文传输，未经任何安全加密，这样的后果是容易被互联网上不法分子嗅探到数据包来搞一些坏事，为了数据的安全性，我们一般使用 SSH 进行远程登录。

- **FTP 协议：** 文件传输协议，是应用层协议之一。FTP 协议包括两个组成部分，分为 FTP 服务器和 FTP 客户端。其中 FTP 服务器用来存储文件，用户可以使用 FTP 客户端通过 FTP 协议访问位于 FTP 服务器上的资源。FTP 协议传输效率很高，一般用来传输大文件。

- **多路复用：** 在发送方，从不同的套接字中收集数据块，然后为数据块封装上首部信息从而生成报文段，然后将报文段传递给网络层的过程被称为多路复用。

- **非持续连接：** 每个请求/响应会经过不同的连接，每一个连接都会经过建立、保持、销毁这个过程。并且每个请求/响应后都会断开连接。

- **持续连接：** 每个请求/响应都会经过相同的连接，也就是说每个请求/响应都可以复用这个连接，并且在每个请求/响应后不会断开连接。

- **ARP 协议：** ARP 是一种解决地址问题的协议，通过 IP 位线索，可以定位下一个用来接收数据的网络设备的 MAC 地址。如果目标主机与主机不在同一个链路上时，可以通过 ARP 查找下一跳路由的地址。不过 ARP 只适用于 IPv4 ，不适用于 IPv6。

- **RARP：** RARP 就是将 ARP 协议反过来，通过 MAC 地址定位 IP 地址的一种协议。

- **ICMP 协议：** Internet 报文控制协议，如果在 IP 通信过程中由于某个 IP 包由于某种原因未能到达目标主机，那么将会发送 ICMP 消息，ICMP 实际上是 IP 的一部分。

  ![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/icmp.jpg)

- **DHCP 协议：** DHCP 是一种动态主机配置协议，又被称为即插即用协议或者零配置协议，使用 DHCP 就能实现自动设置 IP 地址、统一管理 IP 地址分配，实现即插即用。

- **NAT 协议：** 网络地址转换协议，它指的是所有本地地址的主机在接入网络时，都会要在 NAT 路由器上讲其转换成为全球 IP 地址，才能和其他主机进行通信。

- **BGP：** 边界网关协议，这个协议将因特网中数以千计的 ISP 连接起来。

- **以太网：** 以太网是一种当今最普遍的局域网技术，它规定了物理层的连线、电子信号和 MAC 协议的内容。

- **VLAN：** 虚拟局域网（VLAN）是一组逻辑上的设备和用户，这些设备和用户并不受物理位置的限制，可以根据功能、部门及应用等因素将它们组织起来，相互之间的通信就好像它们在同一个网段中一样，所以称为虚拟局域网。

- **明文：** 没有被加密过的内容都被称为明文。

## 资料

- [怎么理解 rpc，既然有 http 请求了为啥还要用 rpc？](https://www.zhihu.com/question/524580708/answer/2584782720)
- [IPv4 地址和子网掩码](https://www.bilibili.com/video/BV1xu411f7UW)
- [非对称加密](https://www.bilibili.com/video/BV1YL411p7bb)
- [数学不好也能听懂的算法 - RSA 加密和解密原理和过程](https://www.bilibili.com/video/BV1XP4y1A7Ui)
- [课堂上传纸条如何防范中间人攻击？](https://www.zhihu.com/question/22558998/answer/21803111)
- [HTTP/3 竟然基于 UDP，HTTP 协议这些年都经历了啥？](https://zhuanlan.zhihu.com/p/68012355)