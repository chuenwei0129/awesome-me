// 引入 path 和 multer 模块
const path = require('node:path');
const multer = require('multer');

// 设置存储目标目录
const storage = multer({ dest: path.resolve(__dirname, './uploads') });

// 文件过滤器，用於限制上传文件的类型
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png']; // 允许上传的文件类型
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error('Wrong file type'); // 如果文件类型不允许，创建错误信息
    error.code = 'LIMIT_FILE_TYPES'; // 设置错误代码
    return cb(error, false); // 通过回调函数返回错误
  }
  cb(null, true); // 如果文件类型允许，继续处理
};

// 设置多媒体文件存储配置
const mediaStorage = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      try {
        fs.mkdirSync(path.resolve(__dirname, './medias')); // 尝试创建存储目录
      } catch {}
      cb(null, path.resolve(__dirname, './medias')); // 设置上传目标目录
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

// 导出配置
module.exports = {
  multer,
  storage,
  mediaStorage,
};
