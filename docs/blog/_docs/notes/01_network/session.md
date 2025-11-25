---
title: Session
order: 2
toc: content
group:
  title: WEB
---

## 什么是 Session 认证

众所周知，Cookie 是一种由服务器发送至用户浏览器，并存储在用户本地的小型数据片段。**当用户首次向服务器发送 HTTP 请求时，服务器通过响应头中的 Set-Cookie 选项，向用户浏览器发送一个或多个 Cookie。浏览器接收后，会将这些 Cookie 保存，并在随后的请求中自动将它们发送回服务器**。这一机制允许服务器识别来自同一浏览器的连续请求，从而实现如用户登录状态持续的功能。

考虑到一个具体的应用场景：用户在网上购物时，每次添加商品至购物车，服务器都会将该商品的 ID 通过 Cookie 返回给客户端。客户端保存这些信息，下一次请求时再次将它们发送给服务器，确保了用户的购物车信息不会丢失。

然而，随着购物车商品数量的增加，每次请求携带的 Cookie 体积也随之增大，这无疑增加了网络传输的负担。更何况，大部分时候，我们只是需要向服务器传达一个简单的信息：“我想添加这个商品到我的购物车”。为什么还要携带所有过去的商品记录呢？

这个问题的解决方案是 Session 认证。通过仔细分析，我们发现既然服务器已经存储了用户的购物车信息，那么在 Cookie 中仅需保存一个能够识别用户身份的标识符即可。这样，每次请求只需要在 Cookie 中携带这个标识符 (Session ID)，而请求体中带上本次操作的具体信息 (如商品 ID)，就可以大幅减少每次请求需要传输的数据量。

Session ID 是一个特殊的字符串，用于标识一个会话，即一系列请求和响应的过程，能够让服务器识别是哪个用户发起的请求。

尽管理论上 Session ID 的传输并不完全依赖于 Cookie，也可以通过其他方法可以传递 Session ID 例如通过 URL 参数、HTTP 头部直接传递等。但在实际的 Web 应用中，通过 Cookie 来管理 Session ID 是最常见的做法。

## 流程

![20240419011028](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240419011028.png)

## 示例

以下是一个简化的用户登录过程，展示了 Session 认证机制的基本工作原理。不适合生产环境使用。

**前端代码：**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Session Auth Demo</title>
  </head>
  <body>
    <h2>Login</h2>
    <input type="text" id="username" placeholder="Username" />
    <button id="loginBtn" onclick="login()">Login</button>
    <!-- 初始时隐藏 Fetch User Info 按钮 -->
    <button id="fetchBtn" onclick="fetchUserInfo()" style="display: none">
      Fetch User Info
    </button>
    <div id="userInfo"></div>

    <script>
      function login() {
        const username = document.getElementById('username').value
        fetch(`http://127.0.0.1:3000/login?username=${username}`, {
          credentials: 'include',
        })
          .then((response) => response.text())
          .then((data) => {
            alert(data)
            // 登录成功后，隐藏登录按钮和输入框，显示 Fetch User Info 按钮
            document.getElementById('loginBtn').style.display = 'none'
            document.getElementById('username').style.display = 'none'
            document.getElementById('fetchBtn').style.display = 'inline'
          })
      }

      function fetchUserInfo() {
        fetch('http://127.0.0.1:3000/userinfo', {
          credentials: 'include',
        })
          .then((response) => response.json())
          .then((data) => {
            const userInfoDiv = document.getElementById('userInfo')
            userInfoDiv.innerHTML =
              '<ul>' +
              data.map((user) => `<li>${user.name}</li>`).join('') +
              '</ul>'
          })
      }
    </script>
  </body>
</html>
```

**后端代码：**

```js
const http = require('http')
const url = require('url')
const crypto = require('crypto')

// 简单的用户信息列表
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
]

// 用于存储 session 信息
const sessions = {}

// 生成唯一的 sessionID
const createSessionId = () => {
  return crypto.randomBytes(16).toString('hex')
}

// 解析 Cookie
const parseCookies = (request) => {
  const list = {}
  const rc = request.headers.cookie

  rc &&
    rc.split(';').forEach((cookie) => {
      const parts = cookie.split('=')
      list[parts.shift().trim()] = decodeURI(parts.join('='))
    })

  return list
}

const server = http.createServer((req, res) => {
  // 允许跨域请求的 CORS 头部
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500') // 在实际部署中，应严格地设置这个值
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Credentials', 'true') // 允许携带证书

  // 预检请求的处理
  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }
  const parsedUrl = url.parse(req.url, true)
  const cookies = parseCookies(req)
  let sessionId = cookies['session_id']

  if (parsedUrl.pathname === '/login' && parsedUrl.query.username) {
    // 模拟登录操作，创建新的 session
    sessionId = createSessionId()
    sessions[sessionId] = { username: parsedUrl.query.username }
    res.setHeader('Set-Cookie', `session_id=${sessionId}; HttpOnly`)

    res.end('Login successful')
  } else if (parsedUrl.pathname === '/userinfo') {
    if (sessionId && sessions[sessionId]) {
      // 用户已登录，返回用户信息列表
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(users))
    } else {
      // 用户未登录
      res.end('Please login first')
    }
  } else {
    res.end('Welcome to our simple server')
  }
})

server.listen(3000, () => {
  console.log('Server listening on port 3000')
})
```

**测试：**

1. 请确保你的前端服务器 (如果使用的话，如通过 live-server 等) 和后端服务器能够正常通信。
2. 输入用户名并点击登录，然后点击 “Fetch User Info” 按钮，您将看到用户信息列表。

## 痛点

在 Web 开发中，使用 session 认证机制似乎有效解决了用户认证问题。然而，这种方法默认情况下假设服务器是单机运行的。在实际生产环境中，为了确保服务的高可用性，通常会部署多台服务器，并通过负载均衡技术来决定请求应该被哪台服务器处理。

考虑以下场景：用户的登录请求被服务器 A 处理，随后 A 服务器生成了一个 session，并通过 cookie 将 sessionId 返回给了浏览器。但如果下一次请求被服务器 B 或 C 处理，由于 session 是在服务器 A 上生成的，B 和 C 服务器无法找到对应的 session，导致用户需要重新登录。面对这一挑战，有三种主要的解决方案：

1. **Session 复制**：

   服务器 A 在生成 session 后，将其复制到服务器 B 和 C。这样，无论请求被哪台服务器处理，都能找到对应的 session，从而避免了重新登录的问题。

   ![Session复制示意图](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240419180046.png)

   尽管这种方法可行，但它存在明显的缺点，包括数据冗余和在大规模部署时可能导致的性能问题。

2. **Session 粘连**：

   通过配置如 Nginx 的 sticky 模块，确保来自同一客户端的所有请求都被同一台服务器处理。这种方法依赖于 IP 或 cookie 实现请求的 “粘连”。

   ![Session粘连示意图](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240419180104.png)

   尽管这解决了 session 查找问题，但它也有缺点，例如如果处理请求的服务器出现故障，客户端将无法访问服务。

3. **Session 共享**：

   将 session 存储在如 Redis 或 Memcached 这样的中间件中，无论请求被哪台服务器处理，都可以从中间件中检索 session。

   ![Session共享示意图](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240419180123.png)

   虽然这种方法引入了额外的性能开销，并要求部署高可用的中间件集群，但对于大型企业而言，这是一种广泛采用的解决方案。
