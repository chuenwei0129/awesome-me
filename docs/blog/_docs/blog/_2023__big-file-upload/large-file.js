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
