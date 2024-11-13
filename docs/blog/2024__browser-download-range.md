---
group:
  title: 2024 🐲
  order: -2024
title: 文件分片下载
toc: content
---

## 如何下载文件

大文件下载是一个常见的需求，但如何实现呢？

使用 `<a>` 元素和 `download` 属性进行文件下载是非常直观和常见的方法。许多现代浏览器在底层**使用流来处理数据传输**。当数据到达时，浏览器会将数据块流式地写到本地文件，这样就避免了大量数据保存在内存中。**数据从网络直接写入磁盘**，不会大量占用浏览器内存。

> 更多关于 `<a>` 元素和 `download` 属性的详细信息，可以参考本站 [如何让浏览器开始下载文件](./2021__browser-download.md)。

## 如何知道文件下载完毕？

有两种方式：

1. **Header 带上 Content-Length**：浏览器下载到这个长度就结束。
2. **设置 transfer-encoding: chunked**：服务器不断返回内容，直到返回一个空的内容代表结束。

相比大文件上传需要实现分片，大文件下载则更简单。浏览器和 HTTP 内置了支持，直接指定对应 header 即可，前端不用做很多事情。

## 如何实现断点续传？

但如果文件较大，比如 1 G，当你下载了 99% 的时候，突然断网了，下载就失败了，需要重新下载。

这时候就需要 **断点续传**。HTTP 中支持这部分协议，通过 `Range` 相关的 header 实现。

![文件分片示意图](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241112124239.png)

可以通过 `Range` header 告诉服务端下载哪一部分内容，例如：

```http
Range: bytes=200-1000
```

下载 200-1000 字节的内容（两边都是闭区间），服务端返回 206 状态码，并带上这部分内容。也可以省略部分内容：

- **到结束**：`Range: bytes=200-`
- **从头到某点**：`Range: bytes=-1000`
- **请求多段 range**：`Range: bytes=200-1000, 2000-6576, 19000-`

### 示例代码

#### 单段 Range 请求

```http
Range: bytes=200-1000
```

#### 超出 Range

```http
Range: bytes=1000000-2000000
```

返回 416 状态码，代表 range 不合法。

### 多段 Range 请求

多段内容返回是 `multipart/byteranges` 类型，需要注意预检请求问题。

浏览器会在三种情况下发送预检（preflight）请求：

1. **非 GET、POST 请求方法**：如 PUT、DELETE 等。
2. **非常规请求头**：如 Content-Type。
3. **自定义 header**。

多个 range 触发预检请求，因为返回的 `Content-Type` 是特殊的 `multipart/byteranges` 类型。预检请求是 options 请求，可以支持它以解决问题。

**注意：** express 只支持单 range（即多段 range 的请求的响应的虽然是 206 状态码，但返回的是整个内容！），多段 range 可能它觉得没必要支持吧。不就是多发几个请求就能达到一样的效果。

## 实现文件分片下载

下面我们就用 `range` 来实现下文件的分片下载，最终合并成一个文件的功能。

我们来下载一个视频吧，先分块下载，然后下载完合并起来。

就用这个视频好了：

```tsx
import React from 'react';
import mp4 from './_2024__browser-download-range/chu-live.mp4'

interface VideoPlayerProps {
  source: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ source }) => {
  return (
        <video controls style={{width: '100%', borderRadius: '8px'}}>
          <source src={source} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
  );
};

export default () => <VideoPlayer source={mp4} />;
```

但分片之前需要拿到文件的大小，所以要增加一个接口：

```js
// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
// 允许所有来源的请求
app.use(cors());

// 获取文件大小的接口
app.get('/api/file-size', (req, res) => {
  const filePath = path.join(__dirname, 'chu-live.mp4');
  fs.stat(filePath, (err, stats) => {
    if (err) {
      return res.status(500).send({ error: 'Error retrieving file size' });
    }
    res.send({ size: stats.size });
  });
});

// 分块下载接口
app.get('/api/download', (req, res) => {
  const filePath = path.join(__dirname, 'chu-live.mp4');
  const range = req.headers.range;

  if (!range) {
    return res.status(400).send('Requires Range header');
  }

  const videoSize = fs.statSync(filePath).size;
  const CHUNK_SIZE = 10 ** 6; // 1MB

  // 更稳健的Range解析
  const rangeMatch = range.match(/bytes=(\d+)-(\d*)/);

  if (!rangeMatch) {
    return res.status(416).send('Malformed "Range" header');
  }

  const start = parseInt(rangeMatch[1], 10);
  const end = rangeMatch[2] ? parseInt(rangeMatch[2], 10) : Math.min(start + CHUNK_SIZE - 1, videoSize - 1);

  // 确保start和end的合法性
  if (start >= videoSize || end >= videoSize || start > end) {
    return res.status(416).send('Requested range not satisfiable');
  }

  const contentLength = end - start + 1;
  const headers = {
    'Content-Range': `bytes ${start}-${end}/${videoSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': 'video/mp4',
  };

  res.writeHead(206, headers);

  const videoStream = fs.createReadStream(filePath, { start, end });
  videoStream.pipe(res);
});

const PORT = process.env.PORT || 4399;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

请求这个接口，返回文件大小，然后做分片：

> 测试前请先运行 express 服务。

```tsx
import React, { useState } from 'react';

const CHUNK_SIZE = 1 * 1024 * 1024; // 分块大小为1MB
const BASE_URL = 'http://localhost:4399';

const mergeArrayBuffers = (arrays: ArrayBuffer[]) => {
  let totalLen = arrays.reduce((acc, arr) => acc + arr.byteLength, 0);
  let res = new Uint8Array(totalLen);
  let offset = 0;

  arrays.forEach((arr) => {
    res.set(new Uint8Array(arr), offset);
    offset += arr.byteLength;
  });

  return res.buffer;
};

// 文件下载组件
const FileDownloader: React.FC = () => {
  // 状态管理
  const [videoUrl, setVideoUrl] = useState(''); // 视频的Blob URL
  const [downloadError, setDownloadError] = useState<string | null>(null); // 下载错误信息
  const [downloading, setDownloading] = useState(false); // 下载状态

  // 获取文件大小
  const fetchFileSize = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/file-size`);
      if (response.ok) {
        const { size } = await response.json();
        return Number(size); // 返回文件大小
      }
      throw new Error('Failed to fetch file size');
    } catch (error) {
      console.error(error);
      setDownloadError('Failed to fetch file size'); // 设置错误信息
      throw error; // 抛出错误以便下载过程能捕获
    }
  };

  // 下载文件分块
  const downloadChunks = async (size: number) => {

    try {
      const chunkNum = Math.ceil(size / CHUNK_SIZE);
      const downloadTask: Promise<ArrayBuffer>[] = [];

      for (let i = 0; i < chunkNum; i++) {
        const rangeStart = CHUNK_SIZE * i;
        const rangeEnd = Math.min(CHUNK_SIZE * (i + 1) - 1, size - 1);

        const task = fetch(`${BASE_URL}/api/download`, {
          headers: {
            Range: `bytes=${rangeStart}-${rangeEnd}`,
          },
        }).then((res) => {
          if (res.ok) {
            return res.arrayBuffer();
          }
          throw new Error(`Failed to download chunk ${i}`);
        });

        downloadTask.push(task);
      }

      const arrayBuffers = await Promise.all(downloadTask);
      return mergeArrayBuffers(arrayBuffers);
    } catch (error) {
      console.error(error);
      setDownloadError('Error occurred during download');
      throw error;
    }
  };

  // 下载视频文件
  const downloadVideo = async () => {
    setDownloading(true);
    setDownloadError(null);

    // 生成新的Blob URL之前，清理现有的Blob URL
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
      setVideoUrl('');
    }

    try {
      const size = await fetchFileSize();
      const arrayBuffer = await downloadChunks(size);
      const blob = new Blob([arrayBuffer], { type: 'video/mp4' });
      setVideoUrl(URL.createObjectURL(blob));
    } catch (error) {
      // 错误处理在各自的函数中已经完成
    }
    setDownloading(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {downloadError && <p style={{ color: '#f56565', marginBottom: '8px' }}>{downloadError}</p>}
      <button
        type="button"
        onClick={downloadVideo}
        style={{
          backgroundColor: '#4299e1',
          color: '#ffffff',
          padding: '8px 16px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          marginBottom: '16px',
          cursor: downloading ? 'not-allowed' : 'pointer',
          opacity: downloading ? 0.6 : 1,
        }}
        disabled={downloading}
      >
        {downloading ? 'Downloading...' : 'Download Video'}
      </button>
      {videoUrl && (
        <video controls style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default FileDownloader;
```

这段代码其实很直接：

首先，用 `Math.ceil` 向上取整计算总共有多少个 chunk。

接着，计算每个 chunk 的范围，并为每个 chunk 创建一个下载任务的 promise。

然后，通过 `Promise.all` 等待所有下载任务完成，并将 ArrayBuffer 合并。

ArrayBuffer 本身只是存储二进制数据，要操作这些数据需要使用 DataView 的子类。

最后，通过 `URL.createObjectURL` 将数据设置为视频的 src，或者利用 a 标签的 download 属性来下载文件。
