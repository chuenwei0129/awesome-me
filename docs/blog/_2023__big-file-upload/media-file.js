const express = require('express');
const router = express.Router();
const { mediaStorage } = require('./config');

router.post(
  '/media',
  // 前端 formData 可以自定义
  mediaStorage.any(), // 使用 mediaStorage 的 any() 方法处理上传的文件
  function (req, res) {
    // 当文件上传成功时调用此回调函数
    console.log('Files:', req.files); // 在控制台打印上传的文件信息
    console.log('Non-file fields:', req.body); // 在控制台打印非文件字段信息
    res.json({
      message: '上传成功', // 向客户端返回 JSON 响应，表示上传成功
    });
  },
  (err, req, res, next) => {
    // 错误处理中间件
    if (err.code === 'LIMIT_FILE_TYPES') {
      // 如果错误代码是 LIMIT_FILE_TYPES，表示上传的文件类型不正确
      res.status(422).json({ error: '只允许上传 JPEG, PNG 文件' }); // 向客户端返回错误信息
    } else if (err.code === 'LIMIT_FILE_SIZE') {
      // 如果错误代码是 LIMIT_FILE_SIZE，表示上传的文件太大
      res.status(422).json({ error: '文件太大' }); // 向客户端返回错误信息
    }
  },
);

module.exports = router; // 导出定义的路由
