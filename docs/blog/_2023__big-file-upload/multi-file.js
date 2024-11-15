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
