const url = require('node:url');

console.log(
  url.parse('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash'),
);

const querystring = require('querystring');

const str = 'nick=randy&age=24&nick2=%E4%B8%AD%E6%96%87';
const obj = querystring.parse(str);
console.log(obj); // { nick: 'randy', age: '24', nick2: '中文' }
