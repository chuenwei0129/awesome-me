const fs = require('fs');
const path = require('path');

fs.readFile(path.resolve(__dirname, './video.mp4'), () => {
  console.log(3);
  Promise.resolve().then(() => {
    console.log(3);
  });
});

fs.readFile(path.resolve(__dirname, './1.mjs'), () => {
  console.log(4);
  Promise.resolve().then(() => {
    console.log(4);
  });
});

setTimeout(() => {
  console.log(2);
}, 0);

console.log(1);

// 输出结果有2种，取决于哪个异步IO事件先被系统处理完
// 124433
// 123344
