// const path = require('node:path')

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const HTTP_PORT = 3333;

// 日志记录
app.use(morgan('tiny'));

// 从 Express 版本 4.16+ 开始，默认 Express 软件包中包含了他们自己的 body-parser 实现，因此无需再额外安装 body-parser。
// 请求中间件
app.use(cors());
// 用于解析 URL 编码的请求体。这主要用于处理表单提交，其中表单数据被编码为 URL 编码格式（application/x-www-form-urlencoded）。
app.use(express.urlencoded({ extended: true }));
// 用于解析 JSON 格式的请求体。这对于处理 AJAX 请求或内容类型为 application/json 的请求非常有用。
app.use(express.json());
// 用于托管静态文件，例如图片、CSS、JavaScript 文件等。你可以指定一个或多个目录作为静态资源目录，这些资源可以直接通过 Web 访问。
// app.use(express.static(path.resolve(__dirname, 'public')))

// 文件上传
// app.use('/upload', require('./routes/bigFileUpload'))
// app.use('/upload', require('./routes/fileUpload'))

// User Management
app.use('/', require('./routes/auth'));

// Social Connection Management
app.use('/users', require('./routes/userRead'));
app.use('/users', require('./routes/usersRead'));
app.use('/users', require('./routes/userFollow'));
app.use('/', require('./routes/userSearch'));

// Post Management
app.use('/posts', require('./routes/postCreate'));
app.use('/posts', require('./routes/postDelete'));
app.use('/posts', require('./routes/postUpdate'));
app.use('/posts', require('./routes/postRead'));
app.use('/posts', require('./routes/postsRead'));
app.use('/posts', require('./routes/postLike'));

// 针对任何其他未处理的请求，返回 404 状态码
app.use((_, res) => {
  res.sendStatus(404);
});

app.listen(HTTP_PORT, () => {
  console.log(`Server running at http://localhost:${HTTP_PORT}`);
});
