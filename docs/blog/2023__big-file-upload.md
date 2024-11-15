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

## formData 多字段上传文件

<code src="./_2023__big-file-upload/fields-form.tsx"></code>

对应后端接口：

```js
const { promisify } = require('node:util');
const express = require('express');
const router = express.Router();
const { storage, multer } = require('./config');

// 处理多 fields 上传
router.post('/fields', async (req, res) => {
  try {
    // 配置上传字段限制
    await promisify(
      storage.fields([
        { name: 'images', maxCount: 3 },
        { name: 'markdowns', maxCount: 2 },
      ]),
    )(req, res);
    res.json({
      message: '文件上传成功',
    });
  } catch (err) {
    if (err instanceof multer.MulterError && err.code === 'LIMIT_UNEXPECTED_FILE') {
      // 处理超出文件数量限制的错误
      return res.status(400).json({ error: `${err.field} 超出文件数量限制的错误` });
    }
    res.status(500).json({ error: '文件上传失败', details: err.message });
  }
});

module.exports = router;
```

## 后端文件上传配置

<code src="./_2023__big-file-upload/images-form.tsx"></code>

前面我们都只是在前端进行文件校验，这里我们后端也来配置一下：

```js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { multer } = require('./config');

// 文件过滤器，用于限制上传文件的类型
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png']; // 允许上传的文件类型
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error('文件类型错误'); // 如果文件类型不允许，创建错误信息
    error.code = 'LIMIT_FILE_TYPES'; // 设置错误代码
    return cb(error, false); // 通过回调函数返回错误
  }
  cb(null, true); // 如果文件类型允许，继续处理
};

// 设置images文件存储配置
const imagesStorage = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      try {
        fs.mkdirSync(path.resolve(__dirname, 'images'), { recursive: true }); // 尝试创建存储目录，如果目标目录不存在，{recursive: true} 确保会创建所有需要的父目录
      } catch (err) {
        if (err.code !== 'EEXIST') {
          return cb(err); // 如果发生其他错误，返回错误
        }
      }
      cb(null, path.resolve(__dirname, 'images')); // 设置上传目标目录
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9) + '-' + file.originalname; // 生成唯一文件名
      cb(null, file.fieldname + '-' + uniqueSuffix); // 设置上传文件名
    },
  }),
  fileFilter, // 应用文件过滤器
  limits: {
    fileSize: 1024 * 300, // 限制文件大小为300KB
  },
});

router.post(
  '/images',
  imagesStorage.any(), // 使用 multer 中间件处理上传请求，允许任何文件字段
  function (req, res) {
    console.log('文件:', req.files); // 在控制台打印上传的文件信息
    console.log('非文件字段:', req.body); // 在控制台打印非文件字段信息
    res.json({
      message: '上传成功', // 向客户端返回 JSON 响应，表示上传成功
    });
  },
  (err, req, res, next) => {
    // 错误处理中间件
    if (err.code === 'LIMIT_FILE_TYPES') {
      // 如果错误代码是 LIMIT_FILE_TYPES，表示上传的文件类型不正确
      res.status(422).json({ error: '只允许上传 JPEG 和 PNG 文件' }); // 向客户端返回错误信息
    } else if (err.code === 'LIMIT_FILE_SIZE') {
      // 如果错误代码是 LIMIT_FILE_SIZE，表示上传的文件太大
      res.status(422).json({ error: '文件过大' }); // 向客户端返回错误信息
    } else {
      res.status(500).json({ error: '服务器错误' }); // 向客户端返回服务器错误信息
    }
  },
);

module.exports = router; // 导出定义的路由
```

## 大文件上传

对应后端接口：

```js
const path = require('node:path');
const fs = require('node:fs');
const express = require('express');
const { promisify } = require('node:util');
const multer = require('multer');

const router = express.Router();
const chunkPathMap = new Map();

const uploadDir = path.resolve(__dirname, 'large');
const storage = multer({ dest: uploadDir });

router.post('/chunk', async (req, res) => {
  const storageAnyPromise = promisify(storage.any());
  try {
    // 原生 formData 是流，需要监听 data 事件来接收数据块，之后解析。所以使用 multer 来处理
    // 这一步会往 req, res 中注入文件信息
    await storageAnyPromise(req, res);

    // 非文件数据在 req.body 中
    console.log('🚀 ~ req.body:', req.body);
    // 文件数据在 req.files 中
    console.log('🚀 ~ req.files:', req.files);

    const chunkIndex = req.body.index;
    const fileHash = req.body.fileHash;
    const newFilePath = path.join(uploadDir, `${fileHash}-${chunkIndex}`);

    // 使用 fileHash + 下标作为切片名重命名上传的文件
    fs.renameSync(req.files[0].path, newFilePath);
    // 将切片路径保存到 map 中，后续合并时使用
    chunkPathMap.set(chunkIndex, newFilePath);

    res.json({
      message: '上传成功',
    });
  } catch (error) {
    console.log('🚀 ~ err:', err);
  }
});

router.post('/merge', async (req, res) => {
  if (!chunkPathMap.size) {
    return res.status(400).json({ message: '没有文件切片' });
  }
  const { fileName, fileHash, size } = req.body;
  const extension = fileName.split('.').pop();
  const filePath = path.resolve(uploadDir, `${fileHash}.${extension}`);

  // 写入文件流
  const pipeStream = (chunkPath, writeStream) =>
    new Promise((resolve) => {
      const readStream = fs.createReadStream(chunkPath);
      readStream.on('end', () => {
        fs.unlinkSync(chunkPath);
        resolve();
      });
      readStream.pipe(writeStream);
    });

  try {
    // 并发写入文件
    await Promise.all(
      Array.from(chunkPathMap)
        .sort((a, b) => {
          return a[0] - b[0];
        })
        .map(([index, chunkPath]) => pipeStream(chunkPath, fs.createWriteStream(filePath, { start: index * size }))),
    );
    // 清空 chunkPathMap
    chunkPathMap.clear();
    res.json({ message: '文件合并成功' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: '合并文件时发生错误', error: err });
  }
});

// 在上传前，先计算出文件 hash，并把 hash 发送给服务端进行验证，由于 hash 的唯一性，所以一旦服务端能找到 hash 相同的文件，则直接返回上传成功的信息即可
router.post('/verify', async (req, res) => {
  const { fileName, fileHash } = req.body;
  const extension = fileName.split('.').pop();
  const filePath = path.resolve(uploadDir, `${fileHash}.${extension}`);
  // 服务端已存在该文件，不需要再次上传
  if (fs.existsSync(filePath)) {
    res.json({
      message: '服务端已存在该文件，不需要再次上传',
      shouldUpload: false,
    });
  } else {
    // 服务端不存在该文件或者已上传部分文件切片，通知前端进行上传，并把已上传的文件切片返回给前端
    // 其他未完全完成的上传碎片应该删除
    const files = fs.readdirSync(uploadDir);
    files.forEach((file) => {
      // 文件名格式为 hash-index，所以只要 hash 相同，则说明是同一个文件的切片
      // 碎片文件名是 multer 自定义的，碎片文件上传成功后会重命名。36 是个魔法值，以后更改。
      if (file.length < 36) {
        fs.unlinkSync(path.resolve(uploadDir, file));
      }
    });

    if (files.length > 0) {
      return res.json({
        message: '已上传部分文件切片',
        uploadedChunks: files.filter((file) => file.includes(fileHash)),
        shouldUpload: true,
      });
    }

    res.json({
      message: '服务端不存在该文件',
      shouldUpload: true,
    });
  }
});

module.exports = router;
```

<code src="./_2023__big-file-upload/large-file-process.tsx"></code>
<code src="./_2023__big-file-upload/large-file-abort.tsx"></code>
<code src="./_2023__big-file-upload/large-file-resume.tsx"></code>
