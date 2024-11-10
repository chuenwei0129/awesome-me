// const fs = require('fs');
// const path = require('path');

// console.log('main start');

// // process.nextTick(() => {
// //   console.log('nextTick1');
// //   process.nextTick(() => {
// //     console.log('nextTick2');
// //   });
// // });

// setTimeout(() => {
//   console.log('setTimeout');
//   setTimeout(() => {
//     console.log('setTimeout2');
//   }, 10);
// });

// setImmediate(() => {
//   console.log('setImmediate');
// });

// process.nextTick(() => {
//   console.log('nextTick');
// });

// fs.readFile(path.resolve(__dirname, './1.mjs'), () => {
//   console.log('readFile small');
//   setTimeout(() => {
//     console.log('readFile small setTimeout');
//   });
// });

// fs.readFile(path.resolve(__dirname, './video.mp4'), () => {
//   console.log('readFile big');
// });

// console.log('main end');

'use strict';

// setTimeout(() => {
//   console.log(1);
// }, 10);

// setTimeout(() => {
//   console.log(2);
// }, 15);

// let now = Date.now();
// while (Date.now() - now < 100) {
//   //
// }

// setTimeout(() => {
//   console.log(3);
// }, 10);

// now = Date.now();

// while (Date.now() - now < 100) {
//   //
// }

process.nextTick(() => {
  console.log('nextTick1');
});

setImmediate(() => {
  console.log('setImmediate1');
  process.nextTick(() => {
    console.log('nextTick2');
  });

  setImmediate(() => {
    console.log('setImmediate');
  });

  setTimeout(() => {
    console.log('setTimeout');
  }, 0);
}, 0);
