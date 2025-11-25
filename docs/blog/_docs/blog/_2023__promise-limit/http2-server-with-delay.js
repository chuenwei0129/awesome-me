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
