const express = require('express');
const spdy = require('spdy');
const fs = require('fs');
const os = require('os');
const path = require('path');
const cors = require('cors'); // 引入 cors 模块

const app = express();
const port = 8848;

// 使用 cors 中间件处理跨域请求
app.use(
  cors({
    origin: 'http://localhost:8000',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type',
  }),
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Create fake phone numbers
const phoneNumbers = Array.from({ length: 5000 }, (_, i) => ({
  id: i + 1,
  phoneNumber: `+123456789${String(i).padStart(4, '0')}`,
}));

// Select 200 random IDs from the first 1500 to always fail
const failedIds = new Set();
while (failedIds.size < 200) {
  const randomId = Math.floor(Math.random() * 1500) + 1;
  failedIds.add(randomId);
}

app.get('/phone/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (failedIds.has(id)) {
    // Simulate a failed request for selected IDs
    return res.status(404).send('Phone number not found');
  }

  const phoneNumber = phoneNumbers.find((p) => p.id === id);

  if (phoneNumber) {
    // 模拟不同的延迟
    const delay = Math.floor(Math.random() * 500); // 生成0到500毫秒的随机延迟
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

spdy.createServer(serverOptions, app).listen(port, () => {
  console.log(`Example app listening at https://localhost:${port}`);
});
