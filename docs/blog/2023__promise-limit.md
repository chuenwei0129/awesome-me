---
group:
  title: 2023 🐰
  order: -2023
title: 并发控制
toc: content
---

## 背景

业务中，经常存在通过一堆 ids，批量获取的场景，例如：

1. 设备状态检查 ：批量获取一批设备的运行状态和健康状况。
2. 获取用户详细信息 ：通过一堆用户ID获取详细的用户资料。
3. 批量下载文件 ：批量下载多个文件（例如，文档、图片、音频等）。
4. 产品库存查询 ：根据一批产品ID批量查询库存。

上述场景中的每一种都可能涉及类似的挑战，包括处理大量数据、保证请求的成功率和效率，以及优化网络请求的并发性。

> 本文聚焦于优化网络请求的并发性

## 浏览器默认的并发限制

补充一点，如果是 http1.1，浏览器会有默认的并发限制，并不需要我们处理这个问题，比如Chrome 中并发数量是6个

举个例子：

```js
// http1-server.js
const express = require('express');
const https = require('https');
const fs = require('fs');
const os = require('os');
const path = require('path');

const app = express();
const port = 8848;

// 添加跨域处理
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 模拟数据
const phoneNumbers = Array.from({ length: 5000 }, (_, i) => ({
  id: i + 1,
  phoneNumber: `+123456789${String(i).padStart(4, '0')}`,
}));

// 根据 ID 获取手机号的路由
app.get('/phone/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const phoneNumber = phoneNumbers.find((p) => p.id === id);

  if (phoneNumber) {
    res.json(phoneNumber);
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

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button type="button">click me!</button>
    <script>
      const btn = document.querySelector('button');

      const get = async (id) => {
        const response = await fetch(`https://localhost:8848/phone/${id}`);
        const data = await response.json();
        console.log(data);
      };

      // 模拟数据
      const ids = Array.from({ length: 5000 }, (_, i) => ({
        id: i + 1,
      }));

      btn.addEventListener('click', () => {
        // 1. 使用 Promise.all 并发全部 5000 个请求
        Promise.all(ids.map((item) => get(item.id)));
      });
    </script>
  </body>
</html>
```

## 基于 http2 的并发处理

由于 http2 支持并发处理，后端不会提供批量获取的接口，需要前端通过 id 来逐个获取。

一般我们最先想到Promise.all，当然最好是使用新出的Promise.allsettled。
下面简单介绍下二者的区别，假如存在某个请求失败时，all会整体失败，而allsettled只会让单个请求失败，对于大部分情况来说，allsettled的是更好的选择，因为allsettled更为灵活，一般来说面对这种情况，总共有三种处理方式，如下所示，all只能支持第一种，而allsettled三种都支持：

整体失败
最终结果，过滤失败的选项
将单个失败的保留，并渲染到UI中

直接使用Promise.all是最简单的，代码如下，然后all并没有并发控制能力，一瞬间会将全部请求发出，从而造成浏览器卡顿问题。

## 方法2 分批并发

你可能会想到一种分批发送的办法，将请求按max数量分成N个组，每组并行发送，这需要结合递归和Promise.all，示例代码如下：

这种方法的优势在于实现相对简单，容易理解。但是它的缺点是，每一批请求中的最慢的请求会决定整个批次的完成时间，这可能会导致一些批次的其他请求早早完成后需要等待，从而降低整体的并发效率。

## 方法3 限制并发

一个更高效的思路是使用异步并发控制，而不是简单的批处理。这种方法可以在任何时刻都保持最大数量的并发请求，而不需要等待整个批次完成。这需要我们维护一个请求池，在每个请求完成时，将下一个请求添加到请求池中，示例代码如下：

gets函数返回一个promise，在请求全部完成后，promise变为fulfilled状态；内部采用递归，每个请求成功和失败后，发送下一个请求；在最下面先发送max个请求到请求池中。

```js
const express = require('express');
const spdy = require('spdy');
const fs = require('fs');
const os = require('os');
const path = require('path');

const app = express();
const port = 8848;

// 添加跨域处理
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 模拟数据
const phoneNumbers = Array.from({ length: 5000 }, (_, i) => ({
  id: i + 1,
  phoneNumber: `+123456789${String(i).padStart(4, '0')}`,
}));

// 根据 ID 获取手机号的路由
app.get('/phone/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const phoneNumber = phoneNumbers.find((p) => p.id === id);

  if (phoneNumber) {
    res.json(phoneNumber);
  } else {
    res.status(404).send('Phone number not found');
  }
});

const serverOptions = {
  key: fs.readFileSync(path.join(os.homedir(), '.cert/key.pem')),
  cert: fs.readFileSync(path.join(os.homedir(), '.cert/cert.pem')),
};

spdy.createServer(serverOptions, app).listen(port, () => {
  console.log(`Example app listening at https://localhost:${port}`);
});
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button type="button">click me!</button>
    <script>
      const btn = document.querySelector('button');

      const get = async (id) => {
        const response = await fetch(`https://localhost:8848/phone/${id}`);
        const data = await response.json();
        console.log(data);
      };

      // 并发控制
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

      // 模拟数据
      const ids = Array.from({ length: 5000 }, (_, i) => ({
        id: i + 1,
      }));

      const gets = async (ids, limit) => {
        // 将 ids 分成多个小数组
        const chunks = [];
        for (let i = 0; i < ids.length; i += limit) {
          chunks.push(ids.slice(i, i + limit));
        }

        // 分批并发，遍历每个小数组
        for (const chunk of chunks) {
          // 每组请求完成后，等待 1 秒再发送下一组请求
          // await Promise.all(chunk.map((item) => get(item.id)));
          // await new Promise((resolve) => setTimeout(resolve, 1000));
          // 如果不需要等待，可以直接使用下面的代码
          await Promise.all(chunk.map((item) => get(item.id)));
        }
      };

      btn.addEventListener('click', () => {
        // 1. 使用 Promise.all 并发全部 5000 个请求
        // Promise.all(ids.map((item) => get(item.id)));
        // 2. 使用 Promise.all 并发分组请求，每组 10 个请求
        // 这种方法的优势在于实现相对简单，容易理解。但是它的缺点是，每一批请求中的最慢的请求会决定整个批次的完成时间，这可能会导致一些批次的其他请求早早完成后需要等待，从而降低整体的并发效率。
        // gets(ids, 10);
        // 3. 使用 pLimit 并发分组请求，每组 10 个请求
        // 限制并发
        // 一个更高效的思路是使用异步并发控制，而不是简单的批处理。这种方法可以在任何时刻都保持最大数量的并发请求，而不需要等待整个批次完成。这需要我们维护一个请求池，在每个请求完成时，将下一个请求添加到请求池中
        const p = new pLimit(10);
        ids.forEach((item) => {
          p.add(() => get(item.id));
        });
      });
    </script>
  </body>
</html>

```
