const { promisify } = require('node:util');
const path = require('node:path');
const express = require('express');
const router = express.Router();
const multer = require('multer');

// 设置文件上传的目标目录
const uploadDir = path.resolve(__dirname, 'single');
const storage = multer({ dest: uploadDir });

// 单文件上传接口
router.post('/single', async (req, res) => {
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
