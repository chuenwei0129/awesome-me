const { promisify } = require('node:util');
const path = require('node:path');
const express = require('express');
const router = express.Router();
const multer = require('multer');

// 设置文件上传的目标目录
const uploadDir = path.resolve(__dirname, 'fields');
const storage = multer({ dest: uploadDir });

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
