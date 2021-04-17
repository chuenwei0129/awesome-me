// Base64 转码
// JavaScript 原生提供两个 Base64 相关的方法。

// btoa()：任意值转为 Base64 编码
// atob()：Base64 编码转为原来的值
// 注意，这两个方法不适合非 ASCII 码的字符，会报错。
// 要将非 ASCII 码字符转为 Base64 编码，必须中间插入一个转码环节，再使用这两个方法。

console.log(window.btoa('abc')) // "YWJj"
console.log(window.btoa('abc')) // "i·"

// 编码
function b64Encode(str) {
	return btoa(encodeURIComponent(str))
}

b64Encode('你好') // "JUU0JUJEJUEwJUU1JUE1JUJE"

// 解码
function b64Decode(str) {
	return decodeURIComponent(atob(str))
}

b64Decode('JUU0JUJEJUEwJUU1JUE1JUJE') // "你好"
