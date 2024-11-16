import cors from 'cors';
import express from 'express';

// 检查是否有Last-Event-ID头部，并据此决定从哪里开始发送消息
// const lastEventId = req.header('Last-Event-ID')
//   ? parseInt(req.header('Last-Event-ID'))
//   : 0

// let messageId = lastEventId // 如果有Last-Event-ID，从该ID继续发送

// 有 id 就有 lastEventId
// 前端根据 lastEventId 重连，需要后端检查是否有 Last-Event-ID 头部，并据此决定从哪里开始发送消息
// 前端自定义重连，需要自己控制 lastEventId

const app = express();
app.use(cors());

app.get('/events', function (req, res) {
  res.setHeader('Content-Type', 'text/event-stream');

  res.flushHeaders(); // 立即发送响应头，确保客户端尽快收到

  res.write(`retry: 1000\n\n`);

  let counter = 0;

  // 每秒推送一次数据
  const intervalId = setInterval(() => {
    counter++;

    // 发送普通消息
    const data = {
      time: new Date().toLocaleTimeString(),
      value: counter,
    };

    res.write(`id: ${counter}\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);

    // 模拟一个错误
    if (counter === 100) {
      clearInterval(intervalId);
      res.end(); // 发送一个错误并关闭连接
    }

    // 每当计数器达到偶数时，发送自定义事件
    if (counter % 2 === 0) {
      res.write(`event: custom\n`);
    }
  }, 1000);

  // 如果客户端关闭连接
  req.on('close', () => {
    clearInterval(intervalId);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`SSE server running at http://localhost:${PORT}`);
});
