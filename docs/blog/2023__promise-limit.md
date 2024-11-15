---
group:
  title: 2023 🐰
  order: -2023
title: 并发控制
toc: content
---

:::info{title=注意}
- https 环境：使用 [mkcert](https://zhuanlan.zhihu.com/p/269532673) 生成本地 https 证书。
- 后端配置：复制对应的后端代码，并确保其正常运行。
:::

---

## 背景

在业务中，我们经常遇到需要通过一堆 IDs 批量获取数据的场景，例如：

1. **设备状态检查**：批量获取一批设备的运行状态和健康状况。
2. **获取用户详细信息**：通过一堆用户 ID 获取详细的用户资料。
3. **批量下载文件**：批量下载多个文件（例如，文档、图片、音频等）。
4. **产品库存查询**：根据一批产品 ID 批量查询库存。

上述每一种场景都很复杂，涉及到处理大量数据、保证请求的成功率和效率，以及优化网络请求的并发性。

> 今天，我们将焦点锁定在优化网络请求的并发性上，一起解锁并发处理的魔法吧！🪄

## 基于 HTTP/2 的并发处理

:::info{title="注意"}
HTTP/2 支持并发处理，因此我们假设后端接口设计是基于这个前提的。后端并不会提供批量获取的接口，需要前端通过 ID 来逐个获取数据。
:::

### 后端代码示例

首先，让我们瞧瞧对应的后端代码：

```js
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const express = require('express');
const cors = require('cors');
const spdy = require('spdy'); // 引入 spdy 模块，支持 HTTP/2

const app = express();
const port = 8848;

app.use(
  cors({
    origin: ['http://localhost:8000', 'https://chuenwei0129.github.io'], // 允许跨域请求的来源
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type',
  }),
);

app.get('/', (req, res) => {
  res.send('Hello World!'); // 响应首页访问请求
});

// 创建模拟的电话号码数据
const phoneNumbers = Array.from({ length: 5000 }, (_, i) => ({
  id: i + 1,
  phoneNumber: `+123456789${String(i).padStart(4, '0')}`, // 生成格式化的电话号码
}));

// 从前 1500 个号码中随机选择 200 个 ID ，这些号码总是请求失败
// 为了更真实地模拟业务场景，顺便加入一些可能返回错误的请求（非必须）。
const failedIds = new Set();
while (failedIds.size < 200) {
  const randomId = Math.floor(Math.random() * 1500) + 1;
  failedIds.add(randomId); // 将随机 ID 加入 failedIds 集合
}

// 处理 /phone/:id 的 GET 请求
app.get('/phone/:id', (req, res) => {
  const id = parseInt(req.params.id, 10); // 获取请求参数中的 ID

  if (failedIds.has(id)) {
    // 如果该 ID 在 failedIds 集合中，模拟请求失败
    return res.status(404).send('Phone number not found');
  }

  const phoneNumber = phoneNumbers.find((p) => p.id === id); // 查找电话号码数据

  if (phoneNumber) {
    // 如果找到电话号码，模拟不同的延迟
    const delay = Math.floor(Math.random() * 1500); // 在 0 到 1500 毫秒随机生成延迟
    setTimeout(() => {
      res.json(phoneNumber); // 在延迟后响应请求
    }, delay);
  } else {
    res.status(404).send('Phone number not found'); // 如果未找到，返回 404
  }
});

// 服务器选项，读取 SSL 证书文件
const serverOptions = {
  key: fs.readFileSync(path.join(os.homedir(), '.cert/key.pem')), // 读取 SSL 密钥文件
  cert: fs.readFileSync(path.join(os.homedir(), '.cert/cert.pem')), // 读取 SSL 证书文件
};

// 创建 HTTP/2 服务器并监听指定端口
spdy.createServer(serverOptions, app).listen(port, () => {
  console.log(`Example app listening at https://localhost:${port}`); // 打印服务器启动信息
});
```

在后端，我们使用 `Array.from` 来生成 5000 个模拟的电话号码数据，通过 `/phone/:id` 路由获取对应的电话号码。

### 前端获取数据

在前端，我们可以这样准备需要的数据：

```js
const get = async (id) => {
  const response = await fetch(`https://localhost:8848/phone/${id}`);
  const data = await response.json();
  console.log(data);
};

// 模拟数据
const ids = Array.from({ length: 1500 }, (_, i) => ({ id: i + 1 }));
```

### 简单粗暴的并发请求

最简单的并发请求方式就是使用 `Promise.all`：

```js
// 使用 Promise.all 并发全部 1500 个请求
Promise.all(ids.map((item) => get(item.id)));
```

然而，使用 `Promise.all` 并没有并发控制能力，会瞬间发送全部请求，可能导致浏览器卡顿的问题。

> 注意：演示 demo 绿色格子代表请求成功，黑色格子代表请求失败。

来点炫酷的 demo 演示：

<code src="./_2023__promise-limit/demo1.tsx"></code>

### 分批发送请求

你可能会想到分批发送的办法。将请求按一定数量分成 N 组，每组并行发送：

```js
const gets = async (ids, limit) => {
  // 将 ids 分成多个小数组
  const chunks = [];
  for (let i = 0; i < ids.length; i += limit) {
    chunks.push(ids.slice(i, i + limit));
  }

  // 分批并发，遍历每个小数组
  for (const chunk of chunks) {
    // 每组请求完成后，可以等待 1 秒再发送下一组请求
    // await Promise.all(chunk.map((item) => get(item.id)));
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    // 然而你可以直接不等待
    await Promise.all(chunk.map((item) => get(item.id)));
  }
};
```

再来一个炫酷的 demo 演示：

<code src="./_2023__promise-limit/demo2.tsx"></code>

### 更高效的异步并发控制

一种更高效的方法是采用异步并发控制，而非单纯的批处理。通过这种方式，可以持续保持最大数量的并发请求，不必等待整个批次全部完成。

```js
// 并发控制代码
class pLimit {
  constructor(limit) {
    this.limit = limit;
    this.queue = [];
    this.active = 0;
  }

  // task 返回 promise
  async add(task) {
    if (this.active >= this.limit) {
      await new Promise((resolve) => this.queue.push(resolve)); // 上锁
    }

    this.active++;
    const result = await task();
    this.active--;

    if (this.queue.length) {
      this.queue.shift()(); // 解锁
    }

    return result;
  }
}

// 使用示例
const p = new pLimit(10);
ids.forEach((item) => {
  p.add(() => get(item.id));
});
```

最后，再来个炫酷的 demo 演示：

<code src="./_2023__promise-limit/demo3.tsx"></code>

## 浏览器默认的并发限制

:::info{title=补充一点}
如果是 `http1.1`，浏览器会有默认的并发限制，并不需要我们处理这个问题，比如 Chrome 中并发数量是 6 个。
:::

举个例子 🌰：

```js
const express = require('express');
const https = require('https');
const fs = require('fs');
const os = require('os');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 8848;

app.use(
  cors({
    origin: ['http://localhost:8000', 'https://chuenwei0129.github.io'],
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type',
  }),
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const phoneNumbers = Array.from({ length: 5000 }, (_, i) => ({
  id: i + 1,
  phoneNumber: `+123456789${String(i).padStart(4, '0')}`,
}));

const failedIds = new Set();
while (failedIds.size < 200) {
  const randomId = Math.floor(Math.random() * 1500) + 1;
  failedIds.add(randomId);
}

app.get('/phone/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (failedIds.has(id)) {
    return res.status(404).send('Phone number not found');
  }

  const phoneNumber = phoneNumbers.find((p) => p.id === id);

  if (phoneNumber) {
    const delay = Math.floor(Math.random() * 1500);
    setTimeout(() => {
      res.json(phoneNumber);
    }, delay);
  } else {
    res.status(404).send('Phone number not found');
  }
});

const serverOptions = {
  key: fs.readFileSync(path.join(os.homedir(), '.cert/key.pem')),
  cert: fs.readFileSync(path.join(os.homedir(), '.cert/cert.pem')),
};

https.createServer(serverOptions, app).listen(port, () => {
  console.log(`Example app listening at https://localhost:${port}`);
});
```

启动 `http1.1` 服务后，运行 demo1，你会发现，浏览器默认的并发限制是 6 个，也就是说，同一时刻，浏览器只会发送 6 个请求，当有请求返回后，浏览器才会发送下一个请求。
