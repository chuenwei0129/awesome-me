---
group:
  title: 2021 🐮
  order: -2021
title: 浏览器下载文件
toc: content
---

# 如何让浏览器开始下载文件

在搭建网站的时候，有时候我们需要让用户能够方便地下载文件。触发这种下载行为其实有两种主要的方式：一是在服务器端设置，另一种则是在客户端进行处理。哪一种方式会更神奇呢？让我们一探究竟🕵️‍♂️。

## 服务器端设置法

### 调整响应头

服务器端设置的文件下载主要依赖于 HTTP 响应头中的内容类型和内容处理方式。通过设置合适的响应头，开发者可以指示浏览器将文件下载到用户的设备上，而不是在浏览器中直接打开。仿佛给浏览器下了指令：“嘿，别再硬抗了，赶紧下载这个文件吧！”

当服务器端设置响应头时，加上 `Content-Disposition` 指令是关键因素，这就像是给浏览器一个封闭指令。示例设置如下：

```http
Content-Disposition: attachment; filename="default-filename.ext"
```

当用户的浏览器捕捉到这样的指令时，它会立刻启动下载，用户看到的文件名就是你指定的默认名称。用户当然可以在保存的时候更改这个名字，但一开始会是你设定的那个。如果这个文件名是一首歌的名字，还兴许用户会对你另眼相看呢。

### 代码示例

#### 设置 Express 服务器

假设我们正在使用 Express 框架构建一个服务器，可以通过如下代码示例实现文件下载功能：

```js
// server.mjs
import cors from 'cors';
import express from 'express';
import path from 'path';

const app = express();
const port = 4396; // 你没看错，这是个端口号，不是二十四小时便利店
const __dirname = import.meta.dirname;

// 允许所有来源的请求
app.use(cors());

// 指定下载文件的路径
const filesDirectory = path.join(__dirname, '.');

app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(filesDirectory, filename);

  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.sendFile(filePath, (err) => {
    if (err && !res.headersSent) {
      res.status(500).send('文件下载失败');
    }
  });
});

app.listen(port, () => {
  console.log(`服务器正在 http://localhost:${port} 上运行`);
});
```

在上述示例中，我们使用 `express` 框架来定义一个路由 `/download/:filename`。这个路由处理对特定文件的下载请求，并通过 `Content-Disposition` 指令让浏览器以下载附件的方式处理文件。事实证明，写代码时真的需要耐心（和咖啡☕️）。

**注意事项**：

- **文件路径和访问控制**：确保服务器上的文件路径安全，避免未授权的文件访问。对文件下载请求进行鉴权也是必不可少的。想象一下，如果下载的文件是某些机密资料，你会发现你网站的安全同样紧迫于诺曼底登陆😱。
- **错误处理**：注意捕获和处理错误情况，比如文件不存在、防止路径穿越攻击等。毕竟错误总是在我们不希望的时候到来，像是讨厌的苍蝇。
- **文件类型**：有时候还需要根据文件类型设置 `Content-Type` 头以确保浏览器处理文件时的行为正确。

#### 创建 React 前端

在前端，你可以使用多种方法来实现文件下载。这里分别展示使用 `<a>` 标签、表单、以及通过 JavaScript 代码触发下载的三种方式。

> 测试前请先运行 express 服务。

##### 方法 1：使用 `<a>` 标签

这是最简单的方法，直接在页面中提供一个链接。当用户点击时，浏览器将直接导航到文件下载的 URL。

```tsx
import React from 'react';

const DownloadLink: React.FC = () => {
  return (
    <div>
      <a href="http://localhost:4396/download/example.txt" className="text-blue-500 hover:underline">
        通过链接下载文件
      </a>
    </div>
  );
};

export default DownloadLink;
```

##### 方法 2：使用表单

使用表单可以处理更复杂的情况，比如传递参数进行身份验证或记录下载日志。简单来说，表单可以帮你带上“大队人马”，而不仅仅是一个链接。

```tsx
import React from 'react';

const DownloadForm: React.FC = () => {
  return (
    <form action="http://localhost:4396/download/example.txt" method="GET">
      <button type="submit" className="mt-2 px-4 py-2 bg-green-500 text-white rounded">
        通过表单下载文件
      </button>
    </form>
  );
};

export default DownloadForm;
```

##### 方法 3：使用 JavaScript 触发下载

这种方法使用 `window.location.href` 或 `fetch` 来请求文件，适用于需要在下载前进行一些操作的情况。

使用 `window.location.href`：

```tsx
import React from 'react';

const App: React.FC = () => {
  const handleDownload = (filename: string) => {
    // 可以直接导航到服务器的下载链接
    window.location.href = `http://localhost:4396/download/${filename}`;
  };

  return (
    <div className="p-4">
      <button onClick={() => handleDownload('example.txt')} className="px-4 py-2 bg-blue-500 text-white rounded">
        下载文件
      </button>
    </div>
  );
};

export default App;
```

使用 `fetch` 请求：

```tsx
import React from 'react';

const DownloadButton: React.FC = () => {
  const handleDownload = () => {
    fetch('http://localhost:4396/download/example.txt')
      .then((response) => {
        if (response.ok) {
          return response.blob();
        }
        throw new Error('文件下载失败');
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'example.txt');

        // 使用JavaScript创建的链接模拟点击
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      })
      .catch((error) => {
        console.error('下载出错：', error);
      });
  };

  return (
    <button onClick={handleDownload} className="mt-2 px-4 py-2 bg-red-500 text-white rounded">
      通过按钮下载文件
    </button>
  );
};

export default DownloadButton;
```

以上演示了三种在 React 中实现文件下载的方法。每种方法都有其适用的场景，可以根据实际需要选择合适的实现方式。

## 浏览器下载内部是怎么处理下载的

在服务端设置法中，我们使用了 `fetch` 来请求文件，代码中，`fetch` API 会将整个文件加载到内存中 (通过 `response.blob()`)，然后再创建一个 Blob 对象 URL 进行下载。这可能会占用较多内存，尤其是对于大文件来说。就像是试图把一整头大象塞进冰箱（而且是一次性完成）。

要实现流式下载并避免占用过多内存，需使用流处理。以下是使用 `Response.body` 从 fetch 流中读取数据并直接写入磁盘的方式：

```tsx
import React from 'react';

const DownloadButton: React.FC = () => {
  const handleDownload = () => {
    fetch('http://localhost:4396/download/example.txt')
      .then((response) => {
        if (response.ok && response.body) {
          const reader = response.body.getReader();
          const stream = new ReadableStream({
            start(controller) {
              function push() {
                reader.read().then(({ done, value }) => {
                  if (done) {
                    controller.close();
                    return;
                  }
                  controller.enqueue(value);
                  push();
                });
              }
              push();
            },
          });

          const newResponse = new Response(stream);
          return newResponse.blob();
        }
        throw new Error('文件下载失败');
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'example.txt');

        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      })
      .catch((error) => {
        console.error('下载出错：', error);
      });
  };

  return (
    <button onClick={handleDownload} className="mt-2 px-4 py-2 bg-red-500 text-white rounded">
      通过按钮下载文件
    </button>
  );
};

export default DownloadButton;
```

通过使用 `ReadableStream` 和 `reader`，我们可以更好地控制数据流，并在每次数据到达时立即处理，从而减少内存占用。不过，浏览器的实现依然可能会将数据缓存在内存中进行某种程度的处理，因此绝对无内存使用并完全依赖磁盘流是不现实的，但已较原来的下载方式优化。现代浏览器就像特意来拯救我们这些纠结内存问题的开发者。

使用 `<a>` 元素的 `download` 属性进行文件下载，是一种较为高效和标准的方法，因为浏览器已经对这种场景做了良好的优化。你只需要坐享其成，并对浏览器开发者的努力表示由衷的感谢。

**流程概述：**

点击 `<a>` 元素后，浏览器会请求服务器并获取文件数据。文件数据通常较大，会分块传输。

这时候我们一定不能忘了**浏览器不会等所有数据接收完毕才触发下载，只要确认响应成功，浏览器便会立即触发下载行为，并开始保存文件数据**。

许多现代浏览器在底层使用流来处理数据传输。当数据到达时，浏览器会将数据块流式地写到本地文件，这样就避免了大量数据保存在内存中。这一过程中，**数据从网络直接写入磁盘**，不会大量占用浏览器内存。感觉就像是在做数据传输的魔法表演🎩✨。

## 客户端设置法

如果由于某些原因，如果服务器端的响应头设置没法搞定，客户端同样可以发挥作用。

HTML 中有个特性可以帮助我们：为 `<a>` 标签添加 `download` 属性。你可以像这样设定一个默认的文件名：

```html
<a href="file-url.ext" download="default-filename.ext">Download</a>
```

一旦用户点击这个链接，浏览器便会发起下载，并弹出保存文件的对话框，仿佛在对用户说：“来吧，这个文件属于你了，甜美的下载时刻到了🎉！”

## 下载验证的注意事项

有时候，下载请求需要经过验证，比如得提供某种 Token。这时你可以考虑采用以下方法：

### 使用 Cookie 验证

因为直接点击 `<a>` 元素的时候没法加上自定义的 Token，我们可以通过 Cookie 来传递这个信息。你可以先发一个请求到服务器，获取一个短期有效的 Cookie，用于之后的下载。接下来再触发 `<a>` 元素的点击，这样带着这个 Cookie 去跟服务器确认，文件数据就能顺利传输了。你会发现，cookie不仅能让饼干更美味，还能让下载更安全🍪。

### 自定义 Token 的方案

如果下载请求需要特别的 Token，你可以选择使用一个表单来发起 POST 请求。表单可以包含必要的 Token 进行验证，像这样设定：

```html
<form action="download-url" method="POST">
    <input type="hidden" name="token" value="your-token">
    <button type="submit">Download</button>
</form>
```

通过这样的方式，可以有效解决 Token 验证的问题，并让用户感到你是如此细腻和体贴🤗。

## 结语

总结一下，要触发浏览器的下载行为，可以通过服务器端设置 `Content-Disposition` 响应头，或者利用客户端的 `<a>` 元素 `download` 属性。运用这些方法不仅可以确保文件顺利下载，还能通过合理的策略来解决验证的难题，为用户提供轻松的下载体验。掌握这些技巧，将会让你在不同的应用场景下得心应手。想象一下，用户在愉快地下载文件时，不禁会感叹：“哇，这个下载体验真好！”😊
