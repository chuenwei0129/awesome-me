---
title: WEB 安全
order: 0
toc: content
group:
  title: WEB
---

## XSS 跨站脚本攻击

XSS 攻击全称跨站**脚本**攻击 (Cross-Site Scripting)，是一种代码注入攻击。

- 攻击方法：**攻击者利用网页开发时留下的漏洞，通过巧妙的方法在目标网站 HTML 页面中注入恶意脚本，使之在用户的浏览器上运行**。利用这些恶意脚本，攻击者可获取用户的敏感信息如 Cookie、SessionID 等，进而危害数据安全。
- 本质：恶意代码未经过滤，与网站正常的代码混在一起；浏览器无法分辨哪些脚本是可信的，导致恶意脚本被执行。

### 攻击种类

根据攻击的来源，XSS 攻击可分为**反射型**、**存储型**和 **DOM-Based 型**三种。

| 类型         | 恶意代码存放的位置              | 由谁取得恶意代码，并插入到网页上 |
| :----------- | :------------------------------ | :------------------------------- |
| 反射型       | URL                             | HTML                             |
| 存储型       | 服务端数据库                    | HTML                             |
| DOM-Based 型 | 服务端数据库 / 客户端存储 / URL | 前端 JavaScript                  |

### 反射型 XSS

#### 概述

反射型 XSS 攻击，亦称**非持久性**跨站脚本攻击，是一种通过诱使用户点击恶意链接来实施的**一次性**网络安全威胁。

**核心要点：**

- **一次性攻击**：反射型 XSS 攻击是一次性的，必须要通过用户点击链接才能发起。
- **浏览器防护**：一些浏览器如 Chrome 其内置了一些 XSS 过滤器，可以防止大部分反射型 XSS 攻击。
- **漏洞成因**：反射型 XSS 其实就是**服务器没有对恶意的用户输入进行安全处理就直接反馈至浏览器**，导致恶意代码在浏览器中执行的一种 XSS 漏洞。

#### 攻击示例与分析

下述示例展示了如何通过未经处理的用户输入，将其直接反射至响应中，进而触发反射型 XSS 攻击的风险。

```javascript
const express = require('express')
const app = express()

app.get('/search', (req, res) => {
  // 直接从查询参数获取用户输入
  const query = req.query.q

  // 用户输入未经处理直接反射至响应，存在 XSS 风险
  res.send(`Search results for: ${query}`)
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
```

在此场景下，攻击者可能会创建并散布如下恶意链接：

```js
http://yourserver.com/search?q=<script>alert('XSS Attack!')</script>
```

若用户点击该链接，服务器端代码将 `q` 参数值嵌入 HTML 响应中返回至浏览器，恶意脚本 `<script>alert('XSS Attack!')</script>` 随即在用户浏览器上执行，触发警告框，标志着一次反射型 XSS 攻击的成功。

#### 防御策略

防御反射型 XSS 攻击的**关键在于后端需要对用户输入进行严格处理**，例如，通过转义特殊字符。在 Node.js 环境下，可利用 `htmlspecialchars` 或其他库实现 HTML 特殊字符的转义。

改进的后端代码如下：

```javascript
const express = require('express')
const escapeHtml = require('escape-html')
const app = express()

app.get('/search', (req, res) => {
  // 安全获取用户输入
  const query = req.query.q

  // 对用户输入进行 HTML 转义，有效防止 XSS 攻击
  const safeQuery = escapeHtml(query)

  res.send(`Search results for: ${safeQuery}`)
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
```

通过这种方式，即便攻击者尝试注入恶意脚本，该脚本也会被安全转义为普通文本，有效避免了 XSS 攻击的发生。

### 存储型 XSS

#### 说明

存储型 XSS 攻击又称为**持久性**跨站点脚本攻击，**通常攻击者将代码存储到漏洞服务器中**，用户浏览相关页面发起攻击。

攻击步骤：

1. 攻击者将恶意脚本代码上传或存储到漏洞服务器
2. 服务器把恶意脚本保存到服务器
3. 当正常客户访问服务器时，服务器会读取恶意数据并且直接使用
4. 服务器会返回含有恶意脚本的页面

这种攻击方式比反射型 XSS 更为隐蔽和危险，因为恶意脚本被直接保存在服务器上，对所有访问该页面的用户都构成威胁。

#### 示例

假设我们有一个简单的论坛应用，用户可以发帖。后端使用 Node.js 和 Express 框架，以及一个简单的内存数组来模拟数据库存储帖子。

```javascript
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors') // 引入 cors 包
const app = express()

app.use(bodyParser.json())
app.use(cors()) // 使用cors中间件，这会为所有路由启用CORS

// 模拟数据库存储帖子
let posts = []

app.post('/posts', (req, res) => {
  const { title, content } = req.body
  // 直接将用户输入存储到“数据库”，没有进行任何过滤或转义
  posts.push({ title, content })
  res.send({ success: true })
})

app.get('/posts', (req, res) => {
  // 将存储的帖子直接返回给客户端，没有进行任何过滤或转义
  res.json(posts)
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
```

前端页面简单地展示所有帖子，并允许用户提交新帖子。这里使用原生 JavaScript 来实现。

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Simple Forum</title>
  </head>
  <body>
    <h2>Post a message</h2>
    <form id="postForm">
      <input type="text" id="title" placeholder="Title" /><br />
      <textarea id="content" placeholder="Content"></textarea><br />
      <button type="submit">Post</button>
    </form>
    <h2>Posts</h2>
    <div id="posts"></div>

    <script>
      document.getElementById('postForm').onsubmit = async (e) => {
        e.preventDefault()
        const title = document.getElementById('title').value
        const content = document.getElementById('content').value

        await fetch('http://127.0.0.1:3000/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, content }),
        })

        document.getElementById('title').value = ''
        document.getElementById('content').value = ''
        loadPosts()
      }

      async function loadPosts() {
        const res = await fetch('http://127.0.0.1:3000/posts')
        const posts = await res.json()
        const postsContainer = document.getElementById('posts')
        postsContainer.innerHTML = ''
        posts.forEach((post) => {
          const postElement = document.createElement('div')
          postElement.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`
          postsContainer.appendChild(postElement)
        })
      }

      loadPosts()
    </script>
  </body>
</html>
```

假设攻击者想要执行一个简单的 JavaScript 脚本，比如弹出一个警告框 (alert) 来证明 XSS 攻击的成功。攻击者可以构造以下的 POST 请求内容：

```json
{
  "title": "看似无害的帖子标题",
  "content": "<script>alert('XSS攻击!');</script>这是一篇普通的帖子内容。"
}
```

这个请求中，content 字段包含了一个 `<script>` 标签，里面的 JavaScript 代码在加载到受害者浏览器时会被执行。

实际测试时发现被 Chrome 内置的 XSS 过滤器转义

```json
{
  "title": "看似无害的帖子标题",
  "content": "\x3Cscript>alert('XSS攻击!');\x3C/script>这是一篇普通的帖子内容。"
}
```

#### 防御措施

为了防御此类攻击，重要的是要在服务器端对所有用户提交的内容进行适当的清理和转义，以确保这些内容在被存储和展示给其他用户时不会包含任何可执行的脚本。此外，前端在渲染这些内容时也应避免直接使用 innerHTML，而是采用 textContent 或通过其他安全的方式来避免潜在的 XSS 攻击。

### DOM Based 型 XSS

DOM Based XSS 是一种客户端的安全漏洞，**它的攻击和执行完全在客户端进行，不需要服务器的直接参与**。这种攻击通常是通过修改 DOM 元素的方式来实现的，比如通过 `innerHTML`、`outerHTML` 或者 `document.write` 等 API 来插入恶意脚本代码。这种攻击通常是由于前端代码不正确地处理用户输入或者其他可控制的数据源而触发的。

> DOM 型 XSS 跟前两种 XSS 的区别：DOM 型 XSS 攻击中，取出和执行恶意代码由浏览器端完成，属于前端 JavaScript 自身的安全漏洞，而其他两种 XSS 都属于服务端的安全漏洞。

下面是一个简单的 DOM Based XSS 攻击的例子：

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="content"></div>
    <script>
      // 假设 URL 是 http://example.com?name=<img src="0" onerror="alert('XSS')" />
      // 获取URL参数中的name值
      var name = new URLSearchParams(window.location.search).get('name')

      // 不安全地将name直接插入到页面中
      // <img> 标签会注入 HTML DOM 文档中，又因为 src 属性为无效的 URL 值，所以触发了 onerror 事件
      document.getElementById('content').innerHTML = name
    </script>
  </body>
</html>
```

在这个例子中，如果用户打开一个包含恶意脚本的链接 (例如，链接中的 `?name=<img src="0" onerror="alert('XSS')" />` 部分)，该脚本将会在用户的浏览器中执行。这是因为页面直接将 URL 的 search 参数中的 name (用户可控) 插入到页面的 DOM 中，而没有进行适当的清理或转义。

> DOM 型 XSS 攻击，实际上就是网站前端 JavaScript 代码本身不够严谨，把不可信的数据当作代码执行了。

在使用 `.innerHTML`、`.outerHTML`、`document.write()` 时要特别小心，不要把不可信的数据作为 HTML 插到页面上，而应尽量使用 `.textContent`、`.setAttribute()` 等。

如果用 Vue / React 技术栈，并且不使用 `v-html` / `dangerouslySetInnerHTML` 功能，就在前端 `render` 渲染阶段避免 `innerHTML`、`outerHTML` 的 XSS 隐患。

以下方式都能把字符串作为代码运行：

- DOM 中的内联事件监听器：如 `location`、`onclick`、`onerror`、`onload`、`onmouseover` 等
- HTML DOM 标签属性：`<a>` 标签的 `href` 属性
- JavaScript 的 `eval()`、`setTimeout()`、`setInterval()` 等

## CSP 内容安全策略

CSP 的实质就是白名单制度，开发者明确告诉客户端，哪些外部资源可以加载和执行，等同于提供白名单。它的实现和执行全部由浏览器完成，开发者只需提供配置。

CSP 可以**限制页面上可以执行的脚本来源**，从而减少 XSS 攻击的风险。

CSP 大大增强了网页的安全性。攻击者即使发现了漏洞，也没法注入脚本，除非还控制了一台列入了白名单的可信主机。

### 通过 HTTP 头信息启用 CSP

最常见的启用 CSP 的方式是通过服务器发送一个 `Content-Security-Policy` 的 HTTP 头。这种方法允许服务器管理员或开发者在服务器端配置 CSP 策略，然后自动应用于访问该服务器的所有页面。

例如，以下是一个简单的 CSP 策略，只允许从同一源 (same-origin) 加载脚本，不允许内联脚本执行，也不允许加载外部资源：

```sh
Content-Security-Policy: default-src 'self';
```

这个策略通过 HTTP 头返回给客户端，客户端浏览器解析这个策略，并按照策略执行。

### 通过 `<meta>` 标签启用 CSP

另一种启用 CSP 的方式是在 HTML 文档中使用 `<meta>` 标签。这种方法允许在页面级别定义 CSP 策略，而不需要服务器支持。这对于静态网页或者无法控制服务器配置的情况特别有用。

例如，以下是一个通过 `<meta>` 标签定义的 CSP 策略，它同样只允许从同一源加载脚本：

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self';" />
```

这个 `<meta>` 标签应该放在 HTML 文档的 `<head>` 部分中。

### 注意事项

- 使用 CSP 时，需要仔细考虑和测试策略，以确保不会不小心阻止了网站的正常功能。
- 对于复杂的网站，可能需要定义更详细的策略，例如分别指定脚本、样式、图片等资源的加载策略。
- CSP 也支持报告模式，可以通过指定一个报告 URI 来接收策略违规报告，这对于监控和调整 CSP 策略非常有用。

## CSRF 跨站请求伪造

> **CSRF 通常从第三方网站发起，被攻击网站无法防止攻击发生，只能通过增强自己网站针对 CSRF 的防护能力来提升安全性。**

跨站请求伪造 (Cross-site Request Forgery，简称 CSRF) 是一种挟制用户在当前已登录的 Web 页面上执行非本意的操作的攻击方法。

CSRF 攻击的**本质是利用 cookie 会在同源请求中携带发送给服务器的特点，以此来实现用户的冒充**。

与 XSS 相比，XSS 利用的是用户对指定网站的信任，CSRF 利用的是网站对用户网页浏览器的信任。

### 攻击手段详解

假设有一个社交网络网站，它的更改用户邮箱地址的 API 是如下 URL：

```sh
http://socialnetwork.com/profile/update?email=newemail@example.com
```

如果用户已经登录到社交网络，且该网站服务器上不检查除 cookie 之外的任何身份验证信息，由于用户已登陆，那么用户接下来的请求将包含验证他们身份的 cookie。如果攻击者能够诱使已登录的用户点击一个包含上述 URL 的链接 (相当于该用户自己做了这个修改电子邮件的操作)，用户的电子邮件地址将被更改，即使他们没有意识到自己做了这个请求。

假设攻击者构建了一个看似无害的网站，该网站包含以下 HTML：

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>点击获取免费咖啡券！</h1>
    <button id="freeCoffee">免费咖啡</button>
    <script>
      document
        .getElementById('freeCoffee')
        .addEventListener('click', function () {
          var img = document.createElement('img')
          img.src =
            'http://socialnetwork.com/profile/update?email=attacker@example.com'
          img.style.display = 'none'
          document.body.appendChild(img)
        })
    </script>
  </body>
</html>
```

当用户点击按钮时，他们实际上没有得到任何咖啡券，而是通过一个隐藏的 `<img>` 标签发起了一个请求，该请求会导致他们在社交网络上的电子邮件地址被更改。

### 攻击特点

- 攻击**一般发起在第三方网站**，而不是被攻击的网站，被攻击的网站无法防止攻击发生
- 攻击**利用受害者被攻击网站的登录凭证**，冒充受害者提交操作，而不是直接窃取数据
- 整个过程攻击者并不能获取到受害者的登录凭证，仅仅是**冒用**
- 跨站请求可以用各种方式：图片 URL、超链接、CORS、Form 表单提交等等，部分请求方式可以直接嵌入在第三方论坛、文章中，难以进行追踪

对于服务器返回的结果，由于浏览器**同源策略**的限制，黑客也无法进行解析。因此，黑客无法从返回的结果中得到任何东西，他所能做的就是给服务器发送请求，以执行请求中所描述的命令，在服务器端直接改变数据的值，而非窃取服务器中的数据。所以，**我们要保护的对象是那些可以直接产生数据改变的服务，而对于读取数据的服务，则不需要进行 CSRF 的保护**。比如银行系统中转账的请求会直接改变账户的金额，会遭到 CSRF 攻击，需要保护。而查询金额是对金额的读取操作，不会改变数据，CSRF 攻击无法解析服务器返回的结果，无需保护。

### 防御思路

> **CSRF 通常从第三方网站发起，被攻击网站无法防止攻击发生，只能通过增强自己网站针对 CSRF 的防护能力来提升安全性**。所以防御思路就变成了：我们能不能区分一个请求是来自于自己的前端页面，还是第三方的网站？

#### 源检测机制

在 HTTP 协议中，每个一个请求都会携带两个 Header，用于标记来源域名，这两个 Header 在浏览器发起请求时，大多数情况会自动带上，并且不能由前端自定义内容。服务器可以通过解析这两个 Header 中的域名，确定请求的来源域。

- **Origin Header**：在 302 重定向之后 Origin 不包含在重定向的请求中，因为 Origin 可能会被认为是其他来源的敏感信息。对于 302 重定向的情况来说都是定向在新的服务器上的 URL，因此浏览器不想将 Origin 泄漏到新的服务器上。
- **Referrer Header**：对于 Ajax 请求，图片和脚本文件等资源请求，referrer 为发起请求的页面地址。对于页面跳转，referrer 为打开页面历史记录的前一页面地址。因此我们使用 Referrer 中链接的 Origin 部分可以得到请求的来源域名。referrer 的值是由浏览器提供的，虽然 HTTP 协议上有明确的要求，但是每个浏览器对于 referrer 的具体实现可能有差别，并不能保证浏览器自身没有安全漏洞。使用验证 referrer 值的方法，就是把安全性都依赖于第三方 (即浏览器) 来保障，从理论上来讲，这样并不是很安全。

#### Cookie 的 SameSite 属性

<embed src="./cookie.md#L66-L103"></embed>

#### CSRF Token

前面讲到 CSRF 的另一个特征是，攻击者无法直接窃取到用户的信息 (Cookie，Header，网站内容等)，仅仅是冒用 Cookie 中的信息。而 CSRF 攻击之所以能够成功，是因为服务器误把攻击者发送的请求当成了用户自己的请求。那么我们可以要求所有的用户请求都携带一个 CSRF 攻击者无法获取到的 Token。服务器通过校验请求是否携带正确的 Token，来把正常的请求和攻击的请求区分开，也可以防范 CSRF 的攻击。

步骤：

1. 用户使用用户名密码登陆，服务端下发一个**随机的** Token 字段，并且服务端把这个字段保存在 Session 中
2. 客户端把这个 Token 保存起来，放到隐藏字段
3. 用户在登录状态下，在之后访问的时候，都要携带这个 Token 字段
4. 服务端从 Session 中拿出 Token 值进行对比，如果一致，说明请求合法
5. 用户推出，Session 销毁，Token 失效
