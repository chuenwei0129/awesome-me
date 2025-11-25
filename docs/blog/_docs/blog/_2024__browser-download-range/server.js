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
