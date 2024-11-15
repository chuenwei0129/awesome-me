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
    origin: ['http://localhost:8000', 'https://chuenwei0129.github.io'], // 允许的来源
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
