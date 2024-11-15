const fs = require('node:fs');
const path = require('node:path');
const { promisify } = require('node:util');
const multer = require('multer');
const express = require('express');

const router = express.Router();

// 文件上传
// 用 multer 处理文件上传，指定保存目录为 uploads
const storage = multer({ dest: path.resolve(__dirname, './uploads') });

// 处理 form 表单多 fields 上传
router.post('/fields', async (req, res) => {
  try {
    await promisify(
      storage.fields([
        { name: 'foo', maxCount: 3 },
        { name: 'bar', maxCount: 2 },
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

// 设置文件过滤和限制
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4'];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error('Wrong file type');
    error.code = 'LIMIT_FILE_TYPES';
    return cb(error, false);
  }
  cb(null, true);
};

// 用 multer 处理文件上传，自定义配置
const storage2 = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      try {
        fs.mkdirSync(path.resolve(__dirname, './uploads2'));
      } catch {}
      cb(null, path.resolve(__dirname, './uploads2'));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9) + '-' + file.originalname;
      cb(null, file.fieldname + '-' + uniqueSuffix);
    },
  }),
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 1000, // 1000 MB
  },
});

router.post(
  '/media',
  storage2.any(),
  function (req, res) {
    console.log('Files:', req.files);
    console.log('Non-file fields:', req.body);
    res.json({
      message: '上传成功',
    });
  },
  (err, req, res, next) => {
    if (err.code === 'LIMIT_FILE_TYPES') {
      res.status(422).json({ error: '只允许上传 JPEG, PNG, MP4 文件' });
    } else if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(422).json({ error: '文件太大' });
    }
  },
);

module.exports = router;
