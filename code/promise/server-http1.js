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
