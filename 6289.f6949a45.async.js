"use strict";(self.webpackChunk_c6i_playground=self.webpackChunk_c6i_playground||[]).push([[6289],{96289:function(r,a,n){n.r(a),n.d(a,{texts:function(){return e}});const e=[{value:"\u53EF\u4EE5\u4ECE 3 \u4E2A\u89D2\u5EA6\u6765\u770B\u5F85\u8FD9\u4E2A\u95EE\u9898\uFF1A",paraId:0,tocIndex:1},{value:"JavaScript \u7684\u6570\u7EC4\u662F V8 \u4E2D\u7684 JSArray\uFF0CJavaScript \u7684\u5BF9\u8C61\u662F V8 \u4E2D JSObject\uFF0C",paraId:1,tocIndex:1},{value:"JSArray \u662F JSObject \u7684\u5B50\u7C7B",paraId:1,tocIndex:1},{value:"\u3002\u65E2\u7136 JavaScript \u5BF9\u8C61\u53EF\u4EE5\u52A8\u6001\u6DFB\u52A0\u5C5E\u6027\uFF0C\u4ECE\u7EE7\u627F\u7684\u89D2\u5EA6\u6765\u8BF4\uFF0C\u6570\u7EC4\u5E94\u8BE5\u4E5F\u53EF\u4EE5\u3002",paraId:1,tocIndex:1},{value:"JavaScript \u7684\u6570\u7EC4\u4E0D\u662F\u4E25\u683C\u610F\u4E49\u4E0A\u7684\u6570\u7EC4\uFF1A",paraId:2,tocIndex:1},{value:`let list = [];
list[9999999999999999999999999999999999999] = 2;
// 1024 * 1024 * 1024 * 8 === 8589934592 // true\uFF0C8G \u4E5F\u5C31\u8FD9\u4E48\u5927
`,paraId:3,tocIndex:1},{value:"\u6211\u7684\u7535\u8111\u80AF\u5B9A\u6CA1\u6709\u8DB3\u591F\u7684\u5185\u5B58\u5B58\u50A8\u957F\u5EA6\u4E3A 9999999999999999999999999999999999999 \u7684\u6570\u7EC4\uFF0Clist \u8868\u9762\u662F\u6570\u7EC4\uFF0C",paraId:4,tocIndex:1},{value:"\u5E95\u5C42\u6570\u636E\u7ED3\u6784\u660E\u663E\u662F\u4E00\u4E2A\u54C8\u5E0C\u8868",paraId:4,tocIndex:1},{value:"\u3002\u4F5C\u4E3A\u54C8\u5E0C\u8868\uFF0C\u6DFB\u52A0\u5C5E\u6027 a\u3001b \u662F\u5F88\u6B63\u5E38\u7684\u884C\u4E3A\u3002",paraId:4,tocIndex:1},{value:"JavaScript \u6570\u7EC4\u76F8\u5173\u7684\u5185\u7F6E\u65B9\u6CD5\u4E5F\u662F\u52A8\u6001\u6DFB\u52A0\u7684\uFF1A",paraId:5,tocIndex:1},{value:"V8 \u542F\u52A8\u65F6\uFF0C\u4F1A\u4E3A ",paraId:6,tocIndex:1},{value:"Array",paraId:6,tocIndex:1},{value:" \u6DFB\u52A0 ",paraId:6,tocIndex:1},{value:"isArray",paraId:6,tocIndex:1},{value:"\u3001",paraId:6,tocIndex:1},{value:"from",paraId:6,tocIndex:1},{value:"\u3001",paraId:6,tocIndex:1},{value:"of",paraId:6,tocIndex:1},{value:" \u5C5E\u6027\uFF0C\u4E3A ",paraId:6,tocIndex:1},{value:"Array.prototype",paraId:6,tocIndex:1},{value:" \u6DFB\u52A0 ",paraId:6,tocIndex:1},{value:"concat",paraId:6,tocIndex:1},{value:"\u3001",paraId:6,tocIndex:1},{value:"map",paraId:6,tocIndex:1},{value:"\u3001",paraId:6,tocIndex:1},{value:"forEach",paraId:6,tocIndex:1},{value:" \u7B49\u524D\u7AEF\u4EEC\u8033\u719F\u80FD\u8BE6\u7684\u5C5E\u6027\u3002",paraId:6,tocIndex:1},{value:`// \u6309 ECMA \u89C4\u8303\uFF0C\u6570\u7EC4\u7684 size \u4F7F\u7528 32 \u4F4D unsigned int \u5B58\u50A8
// \u6240\u4EE5\u6700\u5927\u957F\u5EA6\u662F 2^32 - 1 = 4294967295
const MAX_ARRAY_LENGTH = 4294967295;

// \u6D4B\u8BD5
const arr = [];
arr[4294967294] = 99; // \u6709\u6548\u7684\u6570\u7EC4\u7D22\u5F15\uFF0Clength = 4294967295
arr[4294967295] = 100; // \u8D85\u51FA\u6700\u5927\u7D22\u5F15\uFF0C\u88AB\u5F53\u4F5C\u5BF9\u8C61\u5C5E\u6027\u800C\u975E\u6570\u7EC4\u5143\u7D20
console.log(arr); // [ <4294967294 empty items>, 99, '4294967295': 100 ]
console.log(arr.length); // 4294967295
`,paraId:7,tocIndex:2},{value:"\u8FD9\u4E2A\u5C5E\u4E8E\u6982\u5FF5\u7C7B\u7684\u4E1C\u897F\uFF0C\u5176\u5B9E\u53EF\u4EE5\u4E0D\u90A3\u4E48\u8F83\u771F\uFF0C",paraId:8,tocIndex:3},{value:"\u4F60\u53EF\u4EE5\u7B80\u5355\u7684\u8BA4\u4E3A\u6784\u9020\u51FD\u6570\u548C\u7C7B\u662F\u7B49\u4EF7\u7684\u6982\u5FF5",paraId:8,tocIndex:3},{value:"\uFF0C\u662F\u53EF\u4EE5\u4E92\u6362\u7684\u8BCD\u3002",paraId:8,tocIndex:3},{value:"\u89C4\u8303\u91CC\u6BCF\u4E2A\u51FD\u6570\u5BF9\u8C61\u90FD\u6709\u4E2A ",paraId:9,tocIndex:3},{value:"[[Call]]",paraId:9,tocIndex:3},{value:" \u5185\u90E8\u65B9\u6CD5\uFF0C\u540C\u65F6\u5B83\u4E5F\u53EF\u80FD\u62E5\u6709\u4E2A ",paraId:9,tocIndex:3},{value:"[[Constructor]]",paraId:9,tocIndex:3},{value:" \u5185\u90E8\u65B9\u6CD5\uFF0C\u62E5\u6709 ",paraId:9,tocIndex:3},{value:"[[Constructor]]",paraId:9,tocIndex:3},{value:" \u5185\u90E8\u65B9\u6CD5\u7684\u51FD\u6570\u5C31\u662F\u6784\u9020\u51FD\u6570\uFF08function Object() {[native code]}\uFF0C\u4E5F\u53EB\u6784\u9020\u5668\uFF09\uFF0C\u800C\u6BCF\u4E2A\u6784\u9020\u51FD\u6570\u53C8\u90FD\u62E5\u6709\u4E00\u4E2A ",paraId:9,tocIndex:3},{value:"[[IsClassConstructor]]",paraId:9,tocIndex:3},{value:" \u5185\u90E8\u5C5E\u6027\uFF0C\u503C\u662F\u4E2A\u5E03\u5C14\u503C\uFF0C",paraId:9,tocIndex:3},{value:"true",paraId:9,tocIndex:3},{value:" \u7684\u8BDD\u5C31\u4EE3\u8868\u5B83\u662F\u4E2A\u7C7B\uFF08",paraId:9,tocIndex:3},{value:"class",paraId:9,tocIndex:3},{value:"\uFF09\u3002",paraId:9,tocIndex:3},{value:"\u6240\u4EE5\u4ECE\u8FD9\u4E2A\u89D2\u5EA6\u770B\uFF0C\u7C7B\u548C\u6784\u9020\u51FD\u6570\u5E76\u4E0D\u662F\u5E76\u5217\u5173\u7CFB\uFF0C\u800C\u662F\u5305\u542B\u5173\u7CFB\u3002",paraId:10,tocIndex:3},{value:"\u51FD\u6570\u5305\u542B\u4E86\u6784\u9020\u51FD\u6570\u548C\u975E\u6784\u9020\u51FD\u6570\u4E24\u79CD\uFF0C\u800C\u6784\u9020\u51FD\u6570\u53C8\u5305\u542B\u4E86\u7C7B\u6784\u9020\u51FD\u6570\u548C\u975E\u7C7B\u6784\u9020\u51FD\u6570\u4E24\u79CD\u3002",paraId:10,tocIndex:3},{value:"\u7C7B\u6784\u9020\u51FD\u6570\u548C\u975E\u7C7B\u6784\u9020\u51FD\u6570\u7684\u533A\u522B\u5C31\u662F\u5B83\u80FD\u4E0D\u80FD\u88AB\u5F53\u6210\u666E\u901A\u51FD\u6570\u8C03\u7528\uFF08\u4E0D\u5E26 ",paraId:11,tocIndex:3},{value:"new",paraId:11,tocIndex:3},{value:"\uFF09\uFF0C\u56E0\u4E3A ",paraId:11,tocIndex:3},{value:"Array()",paraId:11,tocIndex:3},{value:" \u662F\u53EF\u4EE5\u6267\u884C\u7684\uFF0C",paraId:11,tocIndex:3},{value:"\u6240\u4EE5 ",paraId:11,tocIndex:3},{value:"Array",paraId:11,tocIndex:3},{value:" \u4E0D\u662F\u7C7B\u3002",paraId:11,tocIndex:3},{value:'\u4F46\u4F60\u4E00\u5B9A\u4F1A\u89C9\u5F97 "',paraId:12,tocIndex:3},{value:"Array",paraId:12,tocIndex:3},{value:' \u4E0D\u662F\u7C7B" \u8FD9\u53E5\u8BDD\u5F88\u626F\uFF0C',paraId:12,tocIndex:3},{value:"class MyArray extends Array {}",paraId:12,tocIndex:3},{value:" \u8FD9\u4E2A\u4EE3\u7801\u91CC\u7684 ",paraId:12,tocIndex:3},{value:"Array",paraId:12,tocIndex:3},{value:" \u96BE\u9053\u6211\u4EEC\u4E0D\u662F\u628A\u5B83\u53EB\u6210\u7236\u7C7B\u3001\u8D85\u7C7B\u5417\uFF0C\u5B83\u600E\u4E48\u53EF\u80FD\u4E0D\u662F\u7C7B\uFF1F\u7684\u786E\uFF0C",paraId:12,tocIndex:3},{value:"\u5728\u4F5C\u4E3A\u7236\u7C7B\u4F7F\u7528\u7684\u65F6\u5019\uFF0C\u89C4\u8303\u53C8\u4E0D\u4F1A\u53BB\u68C0\u67E5\u5B83\u7684 ",paraId:12,tocIndex:3},{value:"[[IsClassConstructor]]",paraId:12,tocIndex:3},{value:" \u662F\u5426\u4E3A ",paraId:12,tocIndex:3},{value:"true",paraId:12,tocIndex:3},{value:"\uFF0C\u800C\u662F\u53EA\u4F1A\u68C0\u67E5\u5B83\u662F\u4E0D\u662F\u62E5\u6709 ",paraId:12,tocIndex:3},{value:"[[Constructor]]",paraId:12,tocIndex:3},{value:"\uFF0C\u4E5F\u5C31\u662F\u8BF4\uFF0C",paraId:12,tocIndex:3},{value:"\u53EA\u8981\u662F\u4E2A\u6784\u9020\u51FD\u6570\u5C31\u53EF\u4EE5\u505A\u7236\u7C7B",paraId:12,tocIndex:3},{value:"\uFF0C\u975E\u7C7B\u7684\u6784\u9020\u51FD\u6570\u4E5F\u53EF\u4EE5\u505A\u7236\u7C7B\u3002",paraId:12,tocIndex:3},{value:"\u8FD9\u4E48\u6B7B\u6263\u7C7B\u7684\u6982\u5FF5\u662F\u4E0D\u662F\u5F88\u7D2F\uFF08no pun intended\uFF09\uFF1F\u56E0\u4E3A\u89C4\u8303\u91CC\u4E4B\u6240\u4EE5\u8981\u641E\u51FA\u4E00\u4E2A ",paraId:13,tocIndex:3},{value:"[[IsClassConstructor]]",paraId:13,tocIndex:3},{value:" \u7684\u6982\u5FF5\uFF0C",paraId:13,tocIndex:3},{value:"\u76EE\u7684\u662F\u4E3A\u4E86\u8BA9\u7528\u65B0\u7684 ",paraId:13,tocIndex:3},{value:"class{}",paraId:13,tocIndex:3},{value:" \u8BED\u6CD5\u5199\u51FA\u7684\u6784\u9020\u51FD\u6570\u4E0D\u80FD\u88AB\u5F53\u6210\u666E\u901A\u51FD\u6570\u8C03\u7528",paraId:13,tocIndex:3},{value:"\uFF0C\u5E76\u4E0D\u662F\u4E3A\u4E86\u4E0B\u5B9A\u4E49\u800C\u4E0B\u5B9A\u4E49\u3002",paraId:13,tocIndex:3},{value:"\u6240\u4EE5\u8FD8\u662F\u628A\u5B83\u4EEC\u5F53\u6210\u7B49\u4EF7\u7684\u6982\u5FF5\u7B80\u5355\u4E00\u70B9\u3002",paraId:14,tocIndex:3},{value:"Array.from()",paraId:15,tocIndex:5},{value:" \u65B9\u6CD5\u7528\u4E8E\u5C06\u4E24\u7C7B\u5BF9\u8C61\u8F6C\u4E3A\u771F\u6B63\u7684\u6570\u7EC4\uFF1A\u7C7B\u4F3C\u6570\u7EC4\u7684\u5BF9\u8C61\uFF08array-like object\uFF09\u548C\u53EF\u904D\u5386\uFF08iterable\uFF09\u7684\u5BF9\u8C61\uFF08\u5305\u62EC ES6 \u65B0\u589E\u7684\u6570\u636E\u7ED3\u6784 Set \u548C Map\uFF09\u3002",paraId:15,tocIndex:5},{value:`// \u5982\u679C\u53C2\u6570\u662F\u4E00\u4E2A\u771F\u6B63\u7684\u6570\u7EC4\uFF0CArray.from() \u4F1A\u8FD4\u56DE\u4E00\u4E2A\u4E00\u6A21\u4E00\u6837\u7684\u65B0\u6570\u7EC4
console.log(Array.from([1, 2, 3])); // [1, 2, 3]

// \u6240\u8C13\u7C7B\u4F3C\u6570\u7EC4\u7684\u5BF9\u8C61\uFF0C\u672C\u8D28\u7279\u5F81\u53EA\u6709\u4E00\u70B9\uFF0C\u5373\u5FC5\u987B\u6709 length \u5C5E\u6027
console.log(Array.from({ length: 3 })); // [undefined, undefined, undefined]

// Array.from() \u8FD8\u53EF\u4EE5\u63A5\u53D7\u4E00\u4E2A\u51FD\u6570\u4F5C\u4E3A\u7B2C\u4E8C\u4E2A\u53C2\u6570\uFF0C\u4F5C\u7528\u7C7B\u4F3C\u4E8E\u6570\u7EC4\u7684 map() \u65B9\u6CD5
// \u7528\u6765\u5BF9\u6BCF\u4E2A\u5143\u7D20\u8FDB\u884C\u5904\u7406\uFF0C\u5C06\u5904\u7406\u540E\u7684\u503C\u653E\u5165\u8FD4\u56DE\u7684\u6570\u7EC4
console.log(Array.from([1, 2, 3], (x) => x ** x)); // [1, 4, 27]

// \u5982\u679C map() \u51FD\u6570\u91CC\u9762\u7528\u5230\u4E86 this \u5173\u952E\u5B57\uFF0C\u8FD8\u53EF\u4EE5\u4F20\u5165 Array.from() \u7684\u7B2C\u4E09\u4E2A\u53C2\u6570\uFF0C\u7528\u6765\u7ED1\u5B9A this
// \u5B83\u4E5F\u80FD\u6B63\u786E\u5904\u7406\u5404\u79CD Unicode \u5B57\u7B26
console.log(Array.from('\u{1F44D}')); // ['\u{1F44D}']

// \u5B9E\u7528\u6280\u5DE7\uFF1A\u521B\u5EFA\u6307\u5B9A\u957F\u5EA6\u7684\u6570\u7EC4\u5E76\u586B\u5145
console.log(Array.from({ length: 5 }, (_, i) => i)); // [0, 1, 2, 3, 4]
`,paraId:16,tocIndex:5},{value:"Array.of()",paraId:17,tocIndex:6},{value:" \u65B9\u6CD5\u7528\u4E8E\u5C06\u4E00\u7EC4\u503C\uFF0C\u8F6C\u6362\u4E3A\u6570\u7EC4\u3002",paraId:17,tocIndex:6},{value:`Array.of(3, 11, 8); // [3, 11, 8]
Array.of(3); // [3]
Array.of(3).length; // 1
`,paraId:18,tocIndex:6},{value:"\u8FD9\u4E2A\u65B9\u6CD5\u7684\u4E3B\u8981\u76EE\u7684\uFF0C\u662F\u5F25\u8865\u6570\u7EC4\u6784\u9020\u51FD\u6570 ",paraId:19,tocIndex:6},{value:"Array()",paraId:19,tocIndex:6},{value:" \u7684\u4E0D\u8DB3\u3002\u56E0\u4E3A\u53C2\u6570\u4E2A\u6570\u7684\u4E0D\u540C\uFF0C\u4F1A\u5BFC\u81F4 ",paraId:19,tocIndex:6},{value:"Array()",paraId:19,tocIndex:6},{value:" \u7684\u884C\u4E3A\u6709\u5DEE\u5F02\u3002",paraId:19,tocIndex:6},{value:`Array(); // []
Array(3); // [empty \xD7 3]
Array(3, 11, 8); // [3, 11, 8]
`,paraId:20,tocIndex:6},{value:"\u7528\u4E8E\u5224\u65AD\u4E00\u4E2A\u503C\u662F\u5426\u4E3A\u6570\u7EC4\u3002",paraId:21,tocIndex:7},{value:`Array.isArray([]); // true
Array.isArray({}); // false
Array.isArray(null); // false
Array.isArray(undefined); // false

// \u66F4\u53EF\u9760\u7684\u5224\u65AD\u65B9\u5F0F\uFF0C\u4F18\u4E8E instanceof
console.log([] instanceof Array); // true\uFF0C\u4F46\u5728\u4E0D\u540C iframe \u4E2D\u53EF\u80FD\u5931\u6548
console.log(Array.isArray([])); // true\uFF0C\u5728\u4EFB\u4F55\u73AF\u5883\u90FD\u6709\u6548
`,paraId:22,tocIndex:7},{value:"\u8FD4\u56DE\u4E00\u4E2A\u65B0\u6570\u7EC4\uFF0C\u6570\u7EC4\u4E2D\u7684\u5143\u7D20\u4E3A\u539F\u59CB\u6570\u7EC4\u5143\u7D20\u8C03\u7528\u51FD\u6570\u5904\u7406\u540E\u7684\u503C\u3002",paraId:23,tocIndex:10},{value:`const numbers = [1, 2, 3, 4];
const doubled = numbers.map((num) => num * 2);
console.log(doubled); // [2, 4, 6, 8]

// \u5E38\u7528\u4E8E\u6570\u636E\u8F6C\u6362
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const names = users.map((user) => user.name);
console.log(names); // ['Alice', 'Bob']
`,paraId:24,tocIndex:10},{value:"\u8FD4\u56DE\u4E00\u4E2A\u65B0\u6570\u7EC4\uFF0C\u6570\u7EC4\u4E2D\u7684\u5143\u7D20\u662F\u901A\u8FC7\u68C0\u67E5\u6307\u5B9A\u6570\u7EC4\u4E2D\u7B26\u5408\u6761\u4EF6\u7684\u6240\u6709\u5143\u7D20\u3002",paraId:25,tocIndex:11},{value:`const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = numbers.filter((num) => num % 2 === 0);
console.log(evenNumbers); // [2, 4, 6]

// \u5E38\u7528\u4E8E\u6570\u636E\u7B5B\u9009
const users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 17 },
  { id: 3, name: 'Charlie', age: 30 },
];
const adults = users.filter((user) => user.age >= 18);
console.log(adults); // [{ id: 1, name: 'Alice', age: 25 }, { id: 3, name: 'Charlie', age: 30 }]
`,paraId:26,tocIndex:11},{value:"\u5C06\u6570\u7EC4\u5143\u7D20\u8BA1\u7B97\u4E3A\u4E00\u4E2A\u503C\uFF08\u4ECE\u5DE6\u5230\u53F3\uFF09\u3002",paraId:27,tocIndex:12},{value:`const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 10

// \u5E38\u7528\u4E8E\u7D2F\u52A0\u3001\u7D2F\u4E58\u3001\u6570\u7EC4\u6241\u5E73\u5316\u7B49
const flattened = [
  [1, 2],
  [3, 4],
  [5, 6],
].reduce((acc, arr) => acc.concat(arr), []);
console.log(flattened); // [1, 2, 3, 4, 5, 6]

// \u5BF9\u8C61\u5206\u7EC4
const users = [
  { name: 'Alice', role: 'admin' },
  { name: 'Bob', role: 'user' },
  { name: 'Charlie', role: 'admin' },
];
const grouped = users.reduce((acc, user) => {
  acc[user.role] = acc[user.role] || [];
  acc[user.role].push(user);
  return acc;
}, {});
console.log(grouped);
// {
//   admin: [{ name: 'Alice', role: 'admin' }, { name: 'Charlie', role: 'admin' }],
//   user: [{ name: 'Bob', role: 'user' }]
// }
`,paraId:28,tocIndex:12},{value:"\u5BF9\u6570\u7EC4\u7684\u6BCF\u4E2A\u5143\u7D20\u6267\u884C\u4E00\u6B21\u7ED9\u5B9A\u7684\u51FD\u6570\u3002",paraId:29,tocIndex:13},{value:`const numbers = [1, 2, 3];
numbers.forEach((num, index) => {
  console.log(\`Index \${index}: \${num}\`);
});
// Index 0: 1
// Index 1: 2
// Index 2: 3

// \u6CE8\u610F\uFF1AforEach \u4E0D\u80FD\u4F7F\u7528 break\u3001continue\uFF0C\u4E5F\u4E0D\u80FD\u8FD4\u56DE\u503C
// \u5982\u679C\u9700\u8981\u4E2D\u65AD\u5FAA\u73AF\uFF0C\u5E94\u8BE5\u4F7F\u7528 for...of \u6216 some/every
`,paraId:30,tocIndex:13},{value:"\u6D4B\u8BD5\u6570\u7EC4\u4E2D\u662F\u4E0D\u662F\u81F3\u5C11\u6709\u4E00\u4E2A\u5143\u7D20\u901A\u8FC7\u4E86\u88AB\u63D0\u4F9B\u7684\u51FD\u6570\u6D4B\u8BD5\u3002",paraId:31,tocIndex:14},{value:`const numbers = [1, 2, 3, 4, 5];
const hasEven = numbers.some((num) => num % 2 === 0);
console.log(hasEven); // true

// \u5E38\u7528\u4E8E\u9A8C\u8BC1
const users = [
  { name: 'Alice', age: 17 },
  { name: 'Bob', age: 25 },
];
const hasAdult = users.some((user) => user.age >= 18);
console.log(hasAdult); // true
`,paraId:32,tocIndex:14},{value:"\u6D4B\u8BD5\u6570\u7EC4\u7684\u6240\u6709\u5143\u7D20\u662F\u5426\u90FD\u901A\u8FC7\u4E86\u6307\u5B9A\u51FD\u6570\u7684\u6D4B\u8BD5\u3002",paraId:33,tocIndex:15},{value:`const numbers = [2, 4, 6, 8];
const allEven = numbers.every((num) => num % 2 === 0);
console.log(allEven); // true

// \u5E38\u7528\u4E8E\u9A8C\u8BC1
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
];
const allAdults = users.every((user) => user.age >= 18);
console.log(allAdults); // true
`,paraId:34,tocIndex:15},{value:"\u8FD4\u56DE\u6570\u7EC4\u4E2D\u6EE1\u8DB3\u63D0\u4F9B\u7684\u6D4B\u8BD5\u51FD\u6570\u7684\u7B2C\u4E00\u4E2A\u5143\u7D20\u7684\u503C\u3002\u5426\u5219\u8FD4\u56DE ",paraId:35,tocIndex:17},{value:"undefined",paraId:35,tocIndex:17},{value:"\u3002",paraId:35,tocIndex:17},{value:`const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];
const user = users.find((u) => u.id === 2);
console.log(user); // { id: 2, name: 'Bob' }
`,paraId:36,tocIndex:17},{value:"\u8FD4\u56DE\u6570\u7EC4\u4E2D\u6EE1\u8DB3\u63D0\u4F9B\u7684\u6D4B\u8BD5\u51FD\u6570\u7684\u7B2C\u4E00\u4E2A\u5143\u7D20\u7684\u7D22\u5F15\u3002\u5426\u5219\u8FD4\u56DE ",paraId:37,tocIndex:18},{value:"-1",paraId:37,tocIndex:18},{value:"\u3002",paraId:37,tocIndex:18},{value:`const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const index = users.findIndex((u) => u.id === 2);
console.log(index); // 1
`,paraId:38,tocIndex:18},{value:"\u4E0E ",paraId:39,tocIndex:19},{value:"find()",paraId:39,tocIndex:19},{value:" \u548C ",paraId:39,tocIndex:19},{value:"findIndex()",paraId:39,tocIndex:19},{value:" \u7C7B\u4F3C\uFF0C\u4F46\u4ECE\u6570\u7EC4\u672B\u5C3E\u5F00\u59CB\u67E5\u627E\u3002",paraId:39,tocIndex:19},{value:`const numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
const lastFour = numbers.findLast((num) => num === 4);
const lastFourIndex = numbers.findLastIndex((num) => num === 4);
console.log(lastFour); // 4
console.log(lastFourIndex); // 5
`,paraId:40,tocIndex:19},{value:"\u5224\u65AD\u6570\u7EC4\u662F\u5426\u5305\u542B\u4E00\u4E2A\u6307\u5B9A\u7684\u503C\uFF0C\u8FD4\u56DE ",paraId:41,tocIndex:20},{value:"true",paraId:41,tocIndex:20},{value:" \u6216 ",paraId:41,tocIndex:20},{value:"false",paraId:41,tocIndex:20},{value:"\u3002",paraId:41,tocIndex:20},{value:`const fruits = ['apple', 'banana', 'orange'];
console.log(fruits.includes('banana')); // true
console.log(fruits.includes('grape')); // false

// \u53EF\u4EE5\u6307\u5B9A\u8D77\u59CB\u7D22\u5F15
console.log(fruits.includes('apple', 1)); // false
`,paraId:42,tocIndex:20},{value:"\u8FD4\u56DE\u5728\u6570\u7EC4\u4E2D\u53EF\u4EE5\u627E\u5230\u7ED9\u5B9A\u5143\u7D20\u7684\u7B2C\u4E00\u4E2A\u7D22\u5F15\uFF08\u6216\u6700\u540E\u4E00\u4E2A\u7D22\u5F15\uFF09\uFF0C\u5982\u679C\u4E0D\u5B58\u5728\uFF0C\u5219\u8FD4\u56DE ",paraId:43,tocIndex:21},{value:"-1",paraId:43,tocIndex:21},{value:"\u3002",paraId:43,tocIndex:21},{value:`const numbers = [1, 2, 3, 2, 1];
console.log(numbers.indexOf(2)); // 1
console.log(numbers.lastIndexOf(2)); // 3
console.log(numbers.indexOf(5)); // -1
`,paraId:44,tocIndex:21},{value:"push()",paraId:45,tocIndex:23},{value:" \u5728\u6570\u7EC4\u672B\u5C3E\u6DFB\u52A0\u5143\u7D20\uFF0C\u8FD4\u56DE\u65B0\u957F\u5EA6\u3002",paraId:45,tocIndex:23},{value:"pop()",paraId:45,tocIndex:23},{value:" \u5220\u9664\u5E76\u8FD4\u56DE\u6570\u7EC4\u6700\u540E\u4E00\u4E2A\u5143\u7D20\u3002",paraId:45,tocIndex:23},{value:`const arr = [1, 2, 3];
arr.push(4); // \u8FD4\u56DE 4\uFF08\u65B0\u957F\u5EA6\uFF09
console.log(arr); // [1, 2, 3, 4]

const last = arr.pop(); // \u8FD4\u56DE 4
console.log(arr); // [1, 2, 3]
`,paraId:46,tocIndex:23},{value:"shift()",paraId:47,tocIndex:24},{value:" \u5220\u9664\u5E76\u8FD4\u56DE\u6570\u7EC4\u7B2C\u4E00\u4E2A\u5143\u7D20\u3002",paraId:47,tocIndex:24},{value:"unshift()",paraId:47,tocIndex:24},{value:" \u5728\u6570\u7EC4\u5F00\u5934\u6DFB\u52A0\u5143\u7D20\uFF0C\u8FD4\u56DE\u65B0\u957F\u5EA6\u3002",paraId:47,tocIndex:24},{value:`const arr = [1, 2, 3];
arr.unshift(0); // \u8FD4\u56DE 4\uFF08\u65B0\u957F\u5EA6\uFF09
console.log(arr); // [0, 1, 2, 3]

const first = arr.shift(); // \u8FD4\u56DE 0
console.log(arr); // [1, 2, 3]
`,paraId:48,tocIndex:24},{value:"\u901A\u8FC7\u5220\u9664\u6216\u66FF\u6362\u73B0\u6709\u5143\u7D20\u6216\u8005\u539F\u5730\u6DFB\u52A0\u65B0\u7684\u5143\u7D20\u6765\u4FEE\u6539\u6570\u7EC4\u3002",paraId:49,tocIndex:25},{value:`const arr = [1, 2, 3, 4, 5];

// \u5220\u9664\u5143\u7D20\uFF1A\u4ECE\u7D22\u5F15 2 \u5F00\u59CB\u5220\u9664 1 \u4E2A\u5143\u7D20
arr.splice(2, 1); // \u8FD4\u56DE [3]
console.log(arr); // [1, 2, 4, 5]

// \u63D2\u5165\u5143\u7D20\uFF1A\u4ECE\u7D22\u5F15 2 \u5F00\u59CB\uFF0C\u5220\u9664 0 \u4E2A\u5143\u7D20\uFF0C\u63D2\u5165 3 \u548C 3.5
arr.splice(2, 0, 3, 3.5); // \u8FD4\u56DE []
console.log(arr); // [1, 2, 3, 3.5, 4, 5]

// \u66FF\u6362\u5143\u7D20\uFF1A\u4ECE\u7D22\u5F15 3 \u5F00\u59CB\uFF0C\u5220\u9664 1 \u4E2A\u5143\u7D20\uFF0C\u63D2\u5165 4
arr.splice(3, 1, 4); // \u8FD4\u56DE [3.5]
console.log(arr); // [1, 2, 3, 4, 4, 5]
`,paraId:50,tocIndex:25},{value:"\u8FD4\u56DE\u4E00\u4E2A\u65B0\u7684\u6570\u7EC4\u5BF9\u8C61\uFF0C\u8FD9\u4E00\u5BF9\u8C61\u662F\u4E00\u4E2A\u7531 ",paraId:51,tocIndex:26},{value:"begin",paraId:51,tocIndex:26},{value:" \u548C ",paraId:51,tocIndex:26},{value:"end",paraId:51,tocIndex:26},{value:" \u51B3\u5B9A\u7684\u539F\u6570\u7EC4\u7684\u6D45\u62F7\u8D1D\u3002",paraId:51,tocIndex:26},{value:`const arr = [1, 2, 3, 4, 5];
const sliced = arr.slice(1, 4); // \u4ECE\u7D22\u5F15 1 \u5230 4\uFF08\u4E0D\u5305\u62EC 4\uFF09
console.log(sliced); // [2, 3, 4]
console.log(arr); // [1, 2, 3, 4, 5] \u539F\u6570\u7EC4\u4E0D\u53D8

// \u53EF\u4EE5\u4F7F\u7528\u8D1F\u7D22\u5F15
console.log(arr.slice(-2)); // [4, 5]
console.log(arr.slice(1, -1)); // [2, 3, 4]

// \u5E38\u7528\u4E8E\u6570\u7EC4\u6D45\u62F7\u8D1D
const copy = arr.slice();
`,paraId:52,tocIndex:26},{value:"\u5BF9\u6570\u7EC4\u5143\u7D20\u8FDB\u884C\u539F\u5730\u6392\u5E8F\u5E76\u8FD4\u56DE\u8BE5\u6570\u7EC4\u3002",paraId:53,tocIndex:28},{value:`const numbers = [3, 1, 4, 1, 5, 9, 2, 6];

// \u9ED8\u8BA4\u6309\u5B57\u7B26\u4E32\u6392\u5E8F\uFF08\u4F1A\u6709\u95EE\u9898\uFF09
numbers.sort();
console.log(numbers); // [1, 1, 2, 3, 4, 5, 6, 9]

// \u6B63\u786E\u7684\u6570\u5B57\u6392\u5E8F
numbers.sort((a, b) => a - b); // \u5347\u5E8F
console.log(numbers); // [1, 1, 2, 3, 4, 5, 6, 9]

numbers.sort((a, b) => b - a); // \u964D\u5E8F
console.log(numbers); // [9, 6, 5, 4, 3, 2, 1, 1]

// \u5BF9\u8C61\u6570\u7EC4\u6392\u5E8F
const users = [
  { name: 'Charlie', age: 30 },
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 25 },
];
users.sort((a, b) => a.age - b.age);
console.log(users);
// [
//   { name: 'Alice', age: 25 },
//   { name: 'Bob', age: 25 },
//   { name: 'Charlie', age: 30 }
// ]
`,paraId:54,tocIndex:28},{value:"\u98A0\u5012\u6570\u7EC4\u4E2D\u5143\u7D20\u7684\u987A\u5E8F\u3002",paraId:55,tocIndex:29},{value:`const arr = [1, 2, 3, 4, 5];
arr.reverse();
console.log(arr); // [5, 4, 3, 2, 1]
`,paraId:56,tocIndex:29},{value:"ES2023 \u65B0\u589E\u7684\u4E0D\u53EF\u53D8\u7248\u672C\uFF0C\u8FD4\u56DE\u65B0\u6570\u7EC4\u800C\u4E0D\u4FEE\u6539\u539F\u6570\u7EC4\u3002",paraId:57,tocIndex:30},{value:`const arr = [3, 1, 4, 1, 5];
const sorted = arr.toSorted((a, b) => a - b);
console.log(sorted); // [1, 1, 3, 4, 5]
console.log(arr); // [3, 1, 4, 1, 5] \u539F\u6570\u7EC4\u4E0D\u53D8

const reversed = arr.toReversed();
console.log(reversed); // [5, 1, 4, 1, 3]
console.log(arr); // [3, 1, 4, 1, 5] \u539F\u6570\u7EC4\u4E0D\u53D8
`,paraId:58,tocIndex:30},{value:"\u7528\u4E8E\u904D\u5386\u6570\u7EC4\u7684\u952E\u503C\u5BF9\u3001\u952E\u3001\u503C\u3002",paraId:59,tocIndex:32},{value:`const arr = ['a', 'b', 'c'];

for (let index of arr.keys()) {
  console.log(index); // 0 1 2
}

for (let value of arr.values()) {
  console.log(value); // a b c
}

for (let [index, value] of arr.entries()) {
  console.log(index, value); // 0 a, 1 b, 2 c
}
`,paraId:60,tocIndex:32},{value:"\u8FD4\u56DE\u6307\u5B9A\u7D22\u5F15\u5904\u7684\u5143\u7D20\uFF0C\u652F\u6301\u8D1F\u7D22\u5F15\u3002",paraId:61,tocIndex:33},{value:`const arr = ['a', 'b', 'c', 'd'];
console.log(arr.at(0)); // 'a'
console.log(arr.at(-1)); // 'd'
console.log(arr.at(-2)); // 'c'
`,paraId:62,tocIndex:33},{value:"\u6309\u7167\u4E00\u4E2A\u53EF\u6307\u5B9A\u7684\u6DF1\u5EA6\u9012\u5F52\u904D\u5386\u6570\u7EC4\uFF0C\u5E76\u5C06\u6240\u6709\u5143\u7D20\u4E0E\u904D\u5386\u5230\u7684\u5B50\u6570\u7EC4\u4E2D\u7684\u5143\u7D20\u5408\u5E76\u4E3A\u4E00\u4E2A\u65B0\u6570\u7EC4\u8FD4\u56DE\u3002",paraId:63,tocIndex:34},{value:`const arr = [1, [2, 3], [4, [5, 6]]];
console.log(arr.flat()); // [1, 2, 3, 4, [5, 6]]
console.log(arr.flat(2)); // [1, 2, 3, 4, 5, 6]
console.log(arr.flat(Infinity)); // \u5B8C\u5168\u6241\u5E73\u5316

// \u53EF\u4EE5\u53BB\u9664\u7A7A\u4F4D
const arr2 = [1, 2, , 4, 5];
console.log(arr2.flat()); // [1, 2, 4, 5]
`,paraId:64,tocIndex:34},{value:"\u9996\u5148\u4F7F\u7528\u6620\u5C04\u51FD\u6570\u6620\u5C04\u6BCF\u4E2A\u5143\u7D20\uFF0C\u7136\u540E\u5C06\u7ED3\u679C\u538B\u7F29\u6210\u4E00\u4E2A\u65B0\u6570\u7EC4\u3002",paraId:65,tocIndex:35},{value:`const arr = [1, 2, 3];
const result = arr.flatMap((x) => [x, x * 2]);
console.log(result); // [1, 2, 2, 4, 3, 6]

// \u7B49\u4EF7\u4E8E
const result2 = arr.map((x) => [x, x * 2]).flat();
`,paraId:66,tocIndex:35},{value:"\u5C06\u6570\u7EC4\u7684\u6240\u6709\u5143\u7D20\u8FDE\u63A5\u6210\u4E00\u4E2A\u5B57\u7B26\u4E32\u3002",paraId:67,tocIndex:36},{value:`const arr = ['a', 'b', 'c'];
console.log(arr.join()); // 'a,b,c'
console.log(arr.join('')); // 'abc'
console.log(arr.join('-')); // 'a-b-c'
`,paraId:68,tocIndex:36},{value:"\u7528\u4E8E\u5408\u5E76\u4E24\u4E2A\u6216\u591A\u4E2A\u6570\u7EC4\uFF0C\u8FD4\u56DE\u4E00\u4E2A\u65B0\u6570\u7EC4\u3002",paraId:69,tocIndex:37},{value:`const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5, 6];
const merged = arr1.concat(arr2, arr3);
console.log(merged); // [1, 2, 3, 4, 5, 6]

// \u73B0\u4EE3\u5199\u6CD5\uFF1A\u4F7F\u7528\u6269\u5C55\u8FD0\u7B97\u7B26
const merged2 = [...arr1, ...arr2, ...arr3];
`,paraId:70,tocIndex:37},{value:"\u7528\u4E00\u4E2A\u56FA\u5B9A\u503C\u586B\u5145\u6570\u7EC4\u4E2D\u4ECE\u8D77\u59CB\u7D22\u5F15\u5230\u7EC8\u6B62\u7D22\u5F15\u5185\u7684\u5168\u90E8\u5143\u7D20\u3002",paraId:71,tocIndex:38},{value:`const arr = [1, 2, 3, 4, 5];
arr.fill(0, 2, 4); // \u4ECE\u7D22\u5F15 2 \u5230 4\uFF08\u4E0D\u5305\u62EC 4\uFF09\u586B\u5145 0
console.log(arr); // [1, 2, 0, 0, 5]

// \u521B\u5EFA\u5E76\u586B\u5145\u6570\u7EC4
const zeros = new Array(5).fill(0);
console.log(zeros); // [0, 0, 0, 0, 0]
`,paraId:72,tocIndex:38},{value:"\u6D45\u590D\u5236\u6570\u7EC4\u7684\u4E00\u90E8\u5206\u5230\u540C\u4E00\u6570\u7EC4\u4E2D\u7684\u53E6\u4E00\u4E2A\u4F4D\u7F6E\uFF0C\u5E76\u8FD4\u56DE\u5B83\uFF0C\u4E0D\u4F1A\u6539\u53D8\u539F\u6570\u7EC4\u7684\u957F\u5EA6\u3002",paraId:73,tocIndex:39},{value:`const arr = [1, 2, 3, 4, 5];
// \u5C06\u7D22\u5F15 3 \u5F00\u59CB\u7684\u5143\u7D20\u590D\u5236\u5230\u7D22\u5F15 0
arr.copyWithin(0, 3);
console.log(arr); // [4, 5, 3, 4, 5]
`,paraId:74,tocIndex:39},{value:"\u6269\u5C55\u8FD0\u7B97\u7B26\uFF08",paraId:75,tocIndex:41},{value:"...",paraId:75,tocIndex:41},{value:"\uFF09\u53EF\u4EE5\u5C06\u6570\u7EC4\u5C55\u5F00\u3002",paraId:75,tocIndex:41},{value:`// \u5C55\u5F00\u6570\u7EC4
console.log(...[1, 2, 3]); // 1 2 3

// \u540E\u9762\u8FD8\u53EF\u4EE5\u653E\u7F6E\u8868\u8FBE\u5F0F
console.log([...(Math.random() > 0.5 ? [1, 2, 3] : [4, 5, 6])]);

// \u5982\u679C\u6269\u5C55\u8FD0\u7B97\u7B26\u540E\u9762\u662F\u4E00\u4E2A\u7A7A\u6570\u7EC4\uFF0C\u5219\u4E0D\u4EA7\u751F\u4EFB\u4F55\u6548\u679C
console.log([1, ...[]]); // [1]

// \u66FF\u4EE3\u51FD\u6570\u7684 apply() \u65B9\u6CD5
console.log(Math.max.apply(null, [1, 2, 3])); // 3
console.log(Math.max(...[1, 2, 3])); // 3

// \u80FD\u591F\u6B63\u786E\u8BC6\u522B\u56DB\u4E2A\u5B57\u8282\u7684 Unicode \u5B57\u7B26
console.log('\u{1F44D}'.length); // 2
console.log([...'\u{1F44D}'].length); // 1

// \u4EFB\u4F55\u5B9A\u4E49\u4E86\u904D\u5386\u5668\uFF08Iterator\uFF09\u63A5\u53E3\u7684\u5BF9\u8C61\uFF0C\u90FD\u53EF\u4EE5\u7528\u6269\u5C55\u8FD0\u7B97\u7B26\u8F6C\u4E3A\u771F\u6B63\u7684\u6570\u7EC4
console.log([...new Set('hello')]); // ['h', 'e', 'l', 'o']
console.log([...new Map(Object.entries({ a: 1, b: 2 }))]); // [['a', 1], ['b', 2]]

// \u7C7B\u6570\u7EC4
console.log([...'hello world']); // ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd']

// \u5408\u5E76\u6570\u7EC4
const arr1 = [1, 2];
const arr2 = [3, 4];
const merged = [...arr1, ...arr2]; // [1, 2, 3, 4]

// \u590D\u5236\u6570\u7EC4\uFF08\u6D45\u62F7\u8D1D\uFF09
const original = [1, 2, 3];
const copy = [...original];

// \u4E0E\u89E3\u6784\u7ED3\u5408
const [first, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(rest); // [2, 3, 4, 5]
`,paraId:76,tocIndex:41},{value:"\u6570\u7EC4\u7684\u7A7A\u4F4D\u6307\u7684\u662F\uFF0C\u6570\u7EC4\u7684\u67D0\u4E00\u4E2A\u4F4D\u7F6E\u6CA1\u6709\u4EFB\u4F55\u503C\uFF0C\u6BD4\u5982 ",paraId:77,tocIndex:42},{value:"Array()",paraId:77,tocIndex:42},{value:" \u6784\u9020\u51FD\u6570\u8FD4\u56DE\u7684\u6570\u7EC4\u90FD\u662F\u7A7A\u4F4D\u3002",paraId:77,tocIndex:42},{value:"\u7A7A\u4F4D\u4E0D\u662F ",paraId:78,tocIndex:42},{value:"undefined",paraId:78,tocIndex:42},{value:"\uFF0C\u67D0\u4E00\u4E2A\u4F4D\u7F6E\u7684\u503C\u7B49\u4E8E ",paraId:78,tocIndex:42},{value:"undefined",paraId:78,tocIndex:42},{value:"\uFF0C\u4F9D\u7136\u662F\u6709\u503C\u7684\u3002\u7A7A\u4F4D\u662F\u6CA1\u6709\u4EFB\u4F55\u503C\uFF0C",paraId:78,tocIndex:42},{value:"in",paraId:78,tocIndex:42},{value:" \u8FD0\u7B97\u7B26\u53EF\u4EE5\u8BF4\u660E\u8FD9\u4E00\u70B9\u3002",paraId:78,tocIndex:42},{value:`console.log(0 in [undefined]); // true
console.log(0 in Array(1)); // false
`,paraId:79,tocIndex:42},{value:"ES6 \u5219\u662F\u660E\u786E\u5C06\u7A7A\u4F4D\u8F6C\u4E3A ",paraId:80,tocIndex:42},{value:"undefined",paraId:80,tocIndex:42},{value:"\uFF0C\u62F7\u8D1D\u548C\u904D\u5386\u90FD\u4E0D\u4F1A\u5FFD\u7565\u3002",paraId:80,tocIndex:42},{value:"Array.from()",paraId:81,tocIndex:42},{value:" \u65B9\u6CD5\u4F1A\u5C06\u6570\u7EC4\u7684\u7A7A\u4F4D\uFF0C\u8F6C\u4E3A ",paraId:81,tocIndex:42},{value:"undefined",paraId:81,tocIndex:42},{value:"\uFF0C\u4E5F\u5C31\u662F\u8BF4\uFF0C\u8FD9\u4E2A\u65B9\u6CD5\u4E0D\u4F1A\u5FFD\u7565\u7A7A\u4F4D\u3002",paraId:81,tocIndex:42},{value:"\u6269\u5C55\u8FD0\u7B97\u7B26\uFF08",paraId:81,tocIndex:42},{value:"...",paraId:81,tocIndex:42},{value:"\uFF09\u4E5F\u4F1A\u5C06\u7A7A\u4F4D\u8F6C\u4E3A ",paraId:81,tocIndex:42},{value:"undefined",paraId:81,tocIndex:42},{value:"\u3002",paraId:81,tocIndex:42},{value:"copyWithin()",paraId:81,tocIndex:42},{value:" \u4F1A\u8FDE\u7A7A\u4F4D\u4E00\u8D77\u62F7\u8D1D\u3002",paraId:81,tocIndex:42},{value:"fill()",paraId:81,tocIndex:42},{value:" \u4F1A\u5C06\u7A7A\u4F4D\u89C6\u4E3A\u6B63\u5E38\u7684\u6570\u7EC4\u4F4D\u7F6E\u3002",paraId:81,tocIndex:42},{value:"for...of",paraId:81,tocIndex:42},{value:" \u5FAA\u73AF\u4E5F\u4F1A\u904D\u5386\u7A7A\u4F4D\u3002",paraId:81,tocIndex:42},{value:"entries()",paraId:81,tocIndex:42},{value:"\u3001",paraId:81,tocIndex:42},{value:"keys()",paraId:81,tocIndex:42},{value:"\u3001",paraId:81,tocIndex:42},{value:"values()",paraId:81,tocIndex:42},{value:"\u3001",paraId:81,tocIndex:42},{value:"find()",paraId:81,tocIndex:42},{value:" \u548C ",paraId:81,tocIndex:42},{value:"findIndex()",paraId:81,tocIndex:42},{value:" \u4F1A\u5C06\u7A7A\u4F4D\u5904\u7406\u6210 ",paraId:81,tocIndex:42},{value:"undefined",paraId:81,tocIndex:42},{value:"\u3002",paraId:81,tocIndex:42},{value:"**\u5EFA\u8BAE\uFF1A**\u5E94\u8BE5\u907F\u514D\u51FA\u73B0\u7A7A\u4F4D\uFF0C\u5982\u679C\u9700\u8981\u521B\u5EFA\u56FA\u5B9A\u957F\u5EA6\u7684\u6570\u7EC4\uFF0C\u4F7F\u7528 ",paraId:82,tocIndex:42},{value:"Array.from()",paraId:82,tocIndex:42},{value:" \u6216 ",paraId:82,tocIndex:42},{value:"fill()",paraId:82,tocIndex:42},{value:"\u3002",paraId:82,tocIndex:42},{value:`// \u907F\u514D
const arr1 = new Array(5); // [empty \xD7 5]

// \u63A8\u8350
const arr2 = Array.from({ length: 5 }, () => undefined); // [undefined, undefined, undefined, undefined, undefined]
const arr3 = new Array(5).fill(0); // [0, 0, 0, 0, 0]
`,paraId:83,tocIndex:42},{value:"\u53EA\u590D\u5236\u6570\u7EC4\u7684\u7B2C\u4E00\u5C42\uFF0C\u5982\u679C\u6570\u7EC4\u5143\u7D20\u662F\u5BF9\u8C61\uFF0C\u53EA\u4F1A\u590D\u5236\u5F15\u7528\u3002",paraId:84,tocIndex:44},{value:`// \u65B9\u6CD5 1\uFF1A\u6269\u5C55\u8FD0\u7B97\u7B26
const arr1 = [1, 2, 3, { a: 4 }];
const copy1 = [...arr1];

// \u65B9\u6CD5 2\uFF1Aslice()
const copy2 = arr1.slice();

// \u65B9\u6CD5 3\uFF1AArray.from()
const copy3 = Array.from(arr1);

// \u65B9\u6CD5 4\uFF1Aconcat()
const copy4 = [].concat(arr1);

// \u9A8C\u8BC1\u6D45\u62F7\u8D1D
copy1[3].a = 5;
console.log(arr1[3].a); // 5\uFF0C\u5BF9\u8C61\u88AB\u5171\u4EAB
`,paraId:85,tocIndex:44},{value:"\u5B8C\u5168\u590D\u5236\u6570\u7EC4\u53CA\u5176\u6240\u6709\u5D4C\u5957\u7684\u5BF9\u8C61\u3002",paraId:86,tocIndex:45},{value:`// \u65B9\u6CD5 1\uFF1AJSON \u5E8F\u5217\u5316\uFF08\u7B80\u5355\u4F46\u6709\u9650\u5236\uFF09
const arr = [1, 2, { a: 3 }];
const deepCopy1 = JSON.parse(JSON.stringify(arr));
// \u9650\u5236\uFF1A\u65E0\u6CD5\u5904\u7406\u51FD\u6570\u3001undefined\u3001Symbol\u3001\u5FAA\u73AF\u5F15\u7528\u7B49

// \u65B9\u6CD5 2\uFF1A\u9012\u5F52\u590D\u5236
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map((item) => deepClone(item));
  if (obj instanceof Object) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, deepClone(value)]),
    );
  }
}

// \u65B9\u6CD5 3\uFF1A\u4F7F\u7528 structuredClone()\uFF08\u73B0\u4EE3\u6D4F\u89C8\u5668\u652F\u6301\uFF09
const deepCopy2 = structuredClone(arr);
`,paraId:87,tocIndex:45},{value:`// \u65B9\u6CD5 1\uFF1A\u4F7F\u7528 Set\uFF08\u6700\u7B80\u6D01\uFF09
const arr = [1, 2, 2, 3, 4, 4, 5];
const unique1 = [...new Set(arr)];
console.log(unique1); // [1, 2, 3, 4, 5]

// \u65B9\u6CD5 2\uFF1A\u4F7F\u7528 filter()
const unique2 = arr.filter((item, index) => arr.indexOf(item) === index);

// \u65B9\u6CD5 3\uFF1A\u4F7F\u7528 reduce()
const unique3 = arr.reduce((acc, item) => {
  if (!acc.includes(item)) acc.push(item);
  return acc;
}, []);

// \u5BF9\u8C61\u6570\u7EC4\u53BB\u91CD\uFF08\u6839\u636E\u67D0\u4E2A\u5C5E\u6027\uFF09
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice' },
];
const uniqueUsers = users.filter(
  (user, index, self) => index === self.findIndex((u) => u.id === user.id),
);
console.log(uniqueUsers); // [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]

// \u6216\u4F7F\u7528 Map
const uniqueUsers2 = [
  ...new Map(users.map((user) => [user.id, user])).values(),
];
`,paraId:88,tocIndex:46},{value:"JavaScript \u6709\u5FC5\u8981\u7F13\u5B58 for \u5FAA\u73AF\u4E2D\u7684 Array.length \u5417\uFF1F",paraId:89,tocIndex:48},{value:"\u53EA\u8981 Array \u4E0D\u662F NodeList \u5C31\u5DEE\u522B\u4E0D\u5927\uFF0C\u5982\u679C\u662F NodeList\uFF0C\u7F13\u5B58\u4E00\u4E0B length \u4F1A\u5FEB\u5F88\u591A\uFF0C\u8FD9\u4E2A\u6D89\u53CA\u5230 live NodeList \u7684\u95EE\u9898\u3002",paraId:90,tocIndex:48},{value:"\u5173\u4E8E foreach \u5FAA\u73AF\u7684\u4F7F\u7528",paraId:91,tocIndex:48},{value:"foreach \u56E0\u4E3A\u8BBE\u8BA1\u7684\u592A\u65E9\u4E86\uFF0C\u6CA1\u8003\u8651\u8FED\u4EE3\u5668\u3002",paraId:92,tocIndex:48},{value:"JS \u5386\u53F2\u4E0A\u6709\u5F88\u591A\u7F16\u7A0B\u6280\u5DE7",paraId:93,tocIndex:48},{value:"\u6BD4\u65B9\u8BF4\uFF0C\u5728\u524D ES6 \u65F6\u4EE3\u6D41\u884C\u7528 ",paraId:94,tocIndex:48},{value:"new Array(n + 1).join(str)",paraId:94,tocIndex:48},{value:" \u7684 trick \u6765\u8FBE\u6210\u73B0\u5728 ",paraId:94,tocIndex:48},{value:"str.repeat(n)",paraId:94,tocIndex:48},{value:" \u7684\u6548\u679C\uFF0C\u8FD9\u4E2A case \u91CC\u5F53\u7136\u5C31\u6CA1\u6709\u5BB9\u91CF\u4EC0\u4E48\u4E8B\u60C5\u3002\u56FA\u7136\u8FD9\u4E2A trick \u6548\u7387\u5DEE\uFF0C\u5373\u4F7F\u4E00\u5B9A\u8981\u7528\uFF0C\u4E5F\u53EF\u4EE5\u5199\u6210 ",paraId:94,tocIndex:48},{value:"[].join.call({length: n + 1}, str)",paraId:94,tocIndex:48},{value:"\uFF0C\u4F46\u5F15\u64CE\u6CA1\u6CD5\u5E2E\u7A0B\u5E8F\u5458\u6539\u4EE3\u7801\uFF0C\u4E5F\u6CA1\u6CD5\u6539\u53D8\u5927\u91CF\u5DF2\u7ECF\u5B58\u5728\u7684\u4EE3\u7801\u3002",paraId:94,tocIndex:48},{value:"\u7C7B\u4F3C\u7684 trick \u8FD8\u6709 ",paraId:95,tocIndex:48},{value:"Array.apply(null, new Array(n)).map(fn)",paraId:95,tocIndex:48},{value:" \u6765\u8FDB\u884C\u7C7B\u4F3C\u73B0\u5728 ",paraId:95,tocIndex:48},{value:"Array.from({length: n}, fn)",paraId:95,tocIndex:48},{value:" \u7684\u521D\u59CB\u5316\u3002",paraId:95,tocIndex:48},{value:"\u5728\u8FD9\u4E9B\u7C7B\u4F3C\u7684\u7528\u6CD5\u91CC\uFF0C\u5B9E\u9645\u5E76\u4E0D\u9700\u8981\u521B\u5EFA\u4E00\u4E2A\u771F\u7684\u6570\u7EC4\uFF0C\u800C\u662F\u53EA\u9700\u8981\u4E00\u4E2A\u6240\u8C13\u7684 ",paraId:96,tocIndex:48},{value:"ArrayLike",paraId:96,tocIndex:48},{value:"\uFF0C\u4E5F\u5C31\u662F\u4E00\u4E2A\u5177\u6709\u6570\u5B57 ",paraId:96,tocIndex:48},{value:"length",paraId:96,tocIndex:48},{value:" \u5C5E\u6027\u7684\u5BF9\u8C61 ",paraId:96,tocIndex:48},{value:"{length: n}",paraId:96,tocIndex:48},{value:"\uFF0C\u4E14\u7528\u540E\u5373\u629B\uFF08\u9A6C\u4E0A\u88AB\u5783\u573E\u56DE\u6536\uFF09\uFF0C\u4F46\u5F00\u53D1\u8005\u987A\u624B\u5C31\u5199\u6210\u4E86 ",paraId:96,tocIndex:48},{value:"new Array(n)",paraId:96,tocIndex:48},{value:"\u3002",paraId:96,tocIndex:48},{value:"\u73B0\u4EE3\u66FF\u4EE3\u65B9\u6848\uFF1A",paraId:97,tocIndex:48},{value:`// \u65E7\uFF1A\u91CD\u590D\u5B57\u7B26\u4E32
new Array(5 + 1).join('*'); // '*****'
// \u65B0
'*'.repeat(5); // '*****'

// \u65E7\uFF1A\u521B\u5EFA\u5E76\u521D\u59CB\u5316\u6570\u7EC4
Array.apply(null, new Array(5)).map((_, i) => i); // [0, 1, 2, 3, 4]
// \u65B0
Array.from({ length: 5 }, (_, i) => i); // [0, 1, 2, 3, 4]
`,paraId:98,tocIndex:48},{value:'\u63A2\u7A76 JS V8 \u5F15\u64CE\u4E0B\u7684 "\u6570\u7EC4" \u5E95\u5C42\u5B9E\u73B0',paraId:99,tocIndex:49},{value:"\u4ECE Chrome \u6E90\u7801\u770B JS Array \u7684\u5B9E\u73B0",paraId:99,tocIndex:49},{value:"\u4E3A\u4EC0\u4E48 JS \u6CA1\u6709 Array \u521D\u59CB\u5927\u5C0F\u548C\u6269\u5BB9\u7684\u6982\u5FF5\uFF1F",paraId:99,tocIndex:49},{value:"V8 \u5F15\u64CE\u5BF9\u6570\u7EC4\u6709\u4E24\u79CD\u5B58\u50A8\u65B9\u5F0F\uFF1A",paraId:100,tocIndex:49},{value:"Fast Elements\uFF08\u5FEB\u901F\u5143\u7D20\uFF09",paraId:101,tocIndex:49},{value:"\uFF1A\u8FDE\u7EED\u7684\u5185\u5B58\u5B58\u50A8\uFF0C\u7C7B\u4F3C\u4F20\u7EDF\u6570\u7EC4",paraId:101,tocIndex:49},{value:"Dictionary Elements\uFF08\u5B57\u5178\u5143\u7D20\uFF09",paraId:101,tocIndex:49},{value:"\uFF1A\u54C8\u5E0C\u8868\u5B58\u50A8\uFF0C\u7C7B\u4F3C\u5BF9\u8C61",paraId:101,tocIndex:49},{value:"\u5F53\u6570\u7EC4\u6BD4\u8F83\u7A00\u758F\u6216\u8005\u6709\u5927\u91CF\u975E\u6570\u5B57\u7D22\u5F15\u65F6\uFF0C\u4F1A\u5207\u6362\u5230\u5B57\u5178\u6A21\u5F0F\u4EE5\u8282\u7701\u5185\u5B58\u3002",paraId:102,tocIndex:49}]}}]);
