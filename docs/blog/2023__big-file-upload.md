---
group:
  title: 2023 🐰
  order: -2023
title: 大文件上传
toc: content
---

## 上传原理

原理很简单，就是根据 HTTP 协议的规范和定义，完成请求消息体的封装和消息体的解析，然后将二进制内容保存到文件。

我们都知道如果要上传一个文件，需要把 `<form>` 标签的 `enctype` 设置为 `multipart/form-data`，同时 `method` 必须为 `POST` 方法。那么 `multipart/form-data` 表示什么呢？

**multipart** 互联网上的混合资源，就是资源由多种元素组成，**form-data** 表示可以使用 HTML Forms 和 POST 方法上传文件，具体的定义可以参考 [RFC 7578](https://tools.ietf.org/html/rfc7578)。

看下 HTTP 请求的消息体：

<!-- ![20241114143936](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241114143936.png) -->

请求头：

```js
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryDCntfiXcSkPhS4PN
```

表示本次请求要上传文件，其中 `boundary` 表示分隔符，如果要**上传多个表单项**，就要使用 `boundary` 分割，每个表单项由 `------XXXX` 开始，以 `------XXXX` 结尾。

请求体 Form Data 部分：

每一个表单项又由 `Content-Type` 和 `Content-Disposition` 组成。

- **Content-Disposition**: `form-data` 为固定值，表示一个表单元素，`name` 表示表单元素的名称，回车换行后面就是 `name` 的值，如果是上传文件就是文件的二进制内容。
- **Content-Type**: 表示当前的内容的 MIME 类型，是图片还是文本还是二进制数据。

客户端发送请求到服务器后，服务器会收到请求的消息体，然后对消息体进行解析，**解析出哪些是普通表单，哪些是附件**。

不过一般情况下不需要自行解析，目前已经有很成熟的三方库可以使用。

## 单文件上传

<code src="./_2023__big-file-upload/single-file.tsx"></code>

对应的后端接口：

```js
// single-file.js
const { promisify } = require('node:util');
const express = require('express');
const router = express.Router();
const storage = require('./storage');

// 单文件上传接口
router.post('/file', async (req, res) => {
  try {
    const uploadSingleFilePromise = promisify(storage.single('file'));
    // 这一步会往 req, res 中注入所上传文件的信息
    await uploadSingleFilePromise(req, res);
    // 文件上传成功后，req.file 对象将包含有关上传文件的信息，例如文件名、文件大小、文件类型等。
    console.log('req.file', req.file);
    // 非文件字段，需要通过 req.body 来取。
    console.log('req.body', req.body);
    res.status(200).json({ message: '文件上传成功', file: req.file });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: '文件上传失败' });
  }
});

module.exports = router;
```

## 单进度条多文件上传

<code src="./_2023__big-file-upload/multi-file-single-process.tsx"></code>

对应后端接口：

```js
const express = require('express');
const { storage, multer } = require('./config');

const router = express.Router();

// 多文件
router.post(
  '/multi',
  // files 是前后端约定的 formData 字段名
  storage.array('files', 3),
  (req, res) => {
    res.status(200).json({ message: '文件上传成功', files: req.files });
  },
  // 错误处理中间件需要四个参数才能正确工作。如果参数少于四个，Express会将其视为普通的中间件，而不是专门用来处理错误的中间件。
  // 即使你没有在函数体中使用 next 参数，你仍然需要在参数列表中包含它，以确保 Express 能正确识别并使用这个错误处理中间件。
  (err, req, res, next) => {
    if (err instanceof multer.MulterError && err.code === 'LIMIT_UNEXPECTED_FILE') {
      // 处理超出文件数量限制的错误
      return res.status(400).json({ error: '文件数量超出限制' });
    }
    res.status(500).json({ error: '文件上传失败', details: err.message });
  },
);

module.exports = router;
```

## 多进度条多文件上传

上一个栗子的多文件上传只有一个进度条，有些需求可能会不大一样，需要观察到每个文件的上传进度，并且可以终止上传。

主要逻辑就是前端file 标签开启 multiple，多选文件，然后并行发送每个文件的请求，这里我们复用单文件的上传接口

<code src="./_2023__big-file-upload/multi-file-multi-process.tsx"></code>

## 使用 form action 上传文件

这种方式上传文件，不需要 js ，而且没有兼容问题，所有浏览器都支持，就是体验很差，导致页面刷新，页面其他数据丢失。前面我们的后端上传处理的比较简单，这里我们来使用更多的 multer 功能。

<code src="./_2023__big-file-upload/form-action-file.tsx"></code>

