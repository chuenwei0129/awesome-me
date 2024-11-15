const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const multer = require('multer');

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
const storage = multer({
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
  storage.any(), // 使用 multer 中间件处理上传请求，允许任何文件字段
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
