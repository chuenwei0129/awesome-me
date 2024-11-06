/* eslint-disable no-var */
var a;

// 考虑块级作用
if (1) {
  console.log(a); // fa
  a = 5;
  function a() {}
  function b() {}
  a = 0;
  console.log(a); // 0
}
// 兼容问题
console.log(a); // 5
console.log(b); // fb
