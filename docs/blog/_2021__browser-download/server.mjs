import cors from 'cors';
import express from 'express';
import path from 'path';

const app = express();
const port = 4396;
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
