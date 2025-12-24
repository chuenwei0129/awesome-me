"use strict";(self.webpackChunk_c6i_ui=self.webpackChunk_c6i_ui||[]).push([[6533],{36533:function(o,n,e){e.r(n),e.d(n,{texts:function(){return a}});const a=[{value:"JavaScript \u4E2D\u5B58\u5728\u591A\u79CD\u5B9A\u4E49\u51FD\u6570\u7684\u65B9\u5F0F\uFF1A",paraId:0,tocIndex:1},{value:`// 1. \u51FD\u6570\u58F0\u660E\uFF08Function Declaration\uFF09
function foo() {
  return '\u51FD\u6570\u58F0\u660E';
}

// 2. \u51FD\u6570\u8868\u8FBE\u5F0F\uFF08Function Expression\uFF09
const bar = function () {
  return '\u51FD\u6570\u8868\u8FBE\u5F0F';
};

// 3. \u5177\u540D\u51FD\u6570\u8868\u8FBE\u5F0F
const baz = function namedFunc() {
  return '\u5177\u540D\u51FD\u6570\u8868\u8FBE\u5F0F';
};

// 4. \u7BAD\u5934\u51FD\u6570\uFF08Arrow Function\uFF09
const arrow = () => '\u7BAD\u5934\u51FD\u6570';

// 5. \u5BF9\u8C61\u65B9\u6CD5\u7B80\u5199\uFF08Method Definition\uFF09
const obj = {
  method() {
    return '\u5BF9\u8C61\u65B9\u6CD5';
  },
};

// 6. Function \u6784\u9020\u51FD\u6570
const dynamic = new Function('x', 'y', 'return x + y');
`,paraId:1,tocIndex:1},{value:"\u533A\u522B\uFF1A",paraId:2,tocIndex:1},{value:"\u51FD\u6570\u58F0\u660E",paraId:3,tocIndex:1},{value:"\uFF1A\u4F1A\u88AB\u63D0\u5347\uFF0C\u53EF\u4EE5\u5728\u58F0\u660E\u4E4B\u524D\u8C03\u7528",paraId:3,tocIndex:1},{value:"\u51FD\u6570\u8868\u8FBE\u5F0F",paraId:3,tocIndex:1},{value:"\uFF1A\u4E0D\u4F1A\u88AB\u63D0\u5347\uFF0C\u5FC5\u987B\u5148\u5B9A\u4E49\u540E\u4F7F\u7528",paraId:3,tocIndex:1},{value:"\u7BAD\u5934\u51FD\u6570",paraId:3,tocIndex:1},{value:"\uFF1A\u6CA1\u6709\u81EA\u5DF1\u7684 ",paraId:3,tocIndex:1},{value:"this",paraId:3,tocIndex:1},{value:"\u3001",paraId:3,tocIndex:1},{value:"arguments",paraId:3,tocIndex:1},{value:"\u3001",paraId:3,tocIndex:1},{value:"super",paraId:3,tocIndex:1},{value:"\uFF0C\u4E0D\u80FD\u7528\u4F5C\u6784\u9020\u51FD\u6570",paraId:3,tocIndex:1},{value:"\u51FD\u6570\u58F0\u660E\u548C\u51FD\u6570\u8868\u8FBE\u5F0F\u5728\u63D0\u5347 (hoisting) \u884C\u4E3A\u4E0A\u6709\u6240\u4E0D\u540C\uFF1A",paraId:4,tocIndex:2},{value:`// 1. \u51FD\u6570\u58F0\u660E\u4F1A\u88AB\u5B8C\u6574\u63D0\u5347\uFF08\u5305\u62EC\u51FD\u6570\u4F53\uFF09
console.log(foo()); // '\u51FD\u6570\u58F0\u660E' - \u53EF\u4EE5\u5728\u58F0\u660E\u4E4B\u524D\u8C03\u7528

function foo() {
  return '\u51FD\u6570\u58F0\u660E';
}

// 2. \u51FD\u6570\u8868\u8FBE\u5F0F\u4E0D\u4F1A\u88AB\u63D0\u5347\uFF08\u53D8\u91CF\u58F0\u660E\u4F1A\u63D0\u5347\uFF0C\u4F46\u8D4B\u503C\u4E0D\u4F1A\uFF09
console.log(bar); // undefined
// console.log(bar()); // TypeError: bar is not a function

var bar = function () {
  return '\u51FD\u6570\u8868\u8FBE\u5F0F';
};

console.log(bar()); // '\u51FD\u6570\u8868\u8FBE\u5F0F'

// 3. \u4F7F\u7528 let/const \u7684\u51FD\u6570\u8868\u8FBE\u5F0F\u5B58\u5728\u6682\u65F6\u6027\u6B7B\u533A
// console.log(baz); // ReferenceError: Cannot access 'baz' before initialization
const baz = function () {
  return '\u4F7F\u7528 const \u7684\u51FD\u6570\u8868\u8FBE\u5F0F';
};
`,paraId:5,tocIndex:2},{value:"\u6CE8\u610F\u4E8B\u9879\uFF1A",paraId:6,tocIndex:2},{value:"\u51FD\u6570\u58F0\u660E\u4F1A\u6574\u4F53\u63D0\u5347\uFF08\u5305\u62EC\u51FD\u6570\u4F53\uFF09",paraId:7,tocIndex:2},{value:"\u51FD\u6570\u8868\u8FBE\u5F0F\u53EA\u6709\u53D8\u91CF\u58F0\u660E\u4F1A\u63D0\u5347\uFF0C\u51FD\u6570\u8D4B\u503C\u4E0D\u4F1A\u63D0\u5347",paraId:7,tocIndex:2},{value:"\u63A8\u8350\u4F7F\u7528\u51FD\u6570\u58F0\u660E\u6216 ",paraId:7,tocIndex:2},{value:"const",paraId:7,tocIndex:2},{value:" \u5B9A\u4E49\u51FD\u6570\u8868\u8FBE\u5F0F\uFF0C\u907F\u514D\u4F7F\u7528 ",paraId:7,tocIndex:2},{value:"var",paraId:7,tocIndex:2},{value:`function sum(a, b) {
  return a + b;
}

sum(1, 2); // 3
sum(1); // NaN (b \u4E3A undefined)
sum(1, 2, 3); // 3 (\u591A\u4F59\u53C2\u6570\u88AB\u5FFD\u7565)
`,paraId:8,tocIndex:4},{value:"ES6 \u5141\u8BB8\u4E3A\u51FD\u6570\u53C2\u6570\u8BBE\u7F6E\u9ED8\u8BA4\u503C\uFF1A",paraId:9,tocIndex:5},{value:`// \u57FA\u672C\u7528\u6CD5
function greet(name = 'Guest') {
  return \`Hello, \${name}!\`;
}

greet(); // 'Hello, Guest!'
greet('Alice'); // 'Hello, Alice!'

// \u9ED8\u8BA4\u503C\u53EF\u4EE5\u662F\u8868\u8FBE\u5F0F
function createArray(length = 5) {
  return new Array(length).fill(0);
}

// \u9ED8\u8BA4\u503C\u53EF\u4EE5\u5F15\u7528\u5176\u4ED6\u53C2\u6570
function add(x, y = x) {
  return x + y;
}

add(1); // 2
add(1, 2); // 3

// \u9ED8\u8BA4\u503C\u53EF\u4EE5\u662F\u51FD\u6570\u8C03\u7528
function getDefaultName() {
  return 'Guest';
}

function greet2(name = getDefaultName()) {
  return \`Hello, \${name}!\`;
}
`,paraId:10,tocIndex:5},{value:"\u6CE8\u610F\uFF1A",paraId:11,tocIndex:5},{value:"\u53EA\u6709\u5F53\u53C2\u6570\u4E3A ",paraId:12,tocIndex:5},{value:"undefined",paraId:12,tocIndex:5},{value:" \u65F6\uFF0C\u9ED8\u8BA4\u503C\u624D\u4F1A\u751F\u6548",paraId:12,tocIndex:5},{value:"null",paraId:12,tocIndex:5},{value:" \u4E0D\u4F1A\u89E6\u53D1\u9ED8\u8BA4\u503C",paraId:12,tocIndex:5},{value:`function test(x = 1) {
  console.log(x);
}

test(); // 1
test(undefined); // 1
test(null); // null
test(0); // 0
`,paraId:13,tocIndex:5},{value:"\u4F7F\u7528 ",paraId:14,tocIndex:6},{value:"...",paraId:14,tocIndex:6},{value:" \u8BED\u6CD5\u6536\u96C6\u591A\u4F59\u7684\u53C2\u6570\u4E3A\u6570\u7EC4\uFF1A",paraId:14,tocIndex:6},{value:`// \u57FA\u672C\u7528\u6CD5
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

sum(1, 2, 3); // 6
sum(1, 2, 3, 4, 5); // 15

// \u5269\u4F59\u53C2\u6570\u5FC5\u987B\u662F\u6700\u540E\u4E00\u4E2A\u53C2\u6570
function func(a, b, ...rest) {
  console.log(a); // 1
  console.log(b); // 2
  console.log(rest); // [3, 4, 5]
}

func(1, 2, 3, 4, 5);

// \u5269\u4F59\u53C2\u6570\u4E0E arguments \u7684\u533A\u522B
function withArguments() {
  console.log(arguments); // Arguments \u5BF9\u8C61\uFF08\u7C7B\u6570\u7EC4\uFF09
  console.log(Array.isArray(arguments)); // false
}

function withRest(...args) {
  console.log(args); // \u771F\u6B63\u7684\u6570\u7EC4
  console.log(Array.isArray(args)); // true
}
`,paraId:15,tocIndex:6},{value:"\u5269\u4F59\u53C2\u6570 vs arguments\uFF1A",paraId:16,tocIndex:6},{value:"\u5269\u4F59\u53C2\u6570\u662F\u771F\u6B63\u7684\u6570\u7EC4\uFF0C\u53EF\u4EE5\u4F7F\u7528\u6570\u7EC4\u65B9\u6CD5",paraId:17,tocIndex:6},{value:"arguments",paraId:17,tocIndex:6},{value:" \u662F\u7C7B\u6570\u7EC4\u5BF9\u8C61\uFF0C\u4E0D\u80FD\u76F4\u63A5\u4F7F\u7528\u6570\u7EC4\u65B9\u6CD5",paraId:17,tocIndex:6},{value:"\u7BAD\u5934\u51FD\u6570\u6CA1\u6709 ",paraId:17,tocIndex:6},{value:"arguments",paraId:17,tocIndex:6},{value:"\uFF0C\u4F46\u53EF\u4EE5\u4F7F\u7528\u5269\u4F59\u53C2\u6570",paraId:17,tocIndex:6},{value:"\u51FD\u6570\u53C2\u6570\u652F\u6301\u89E3\u6784\u8D4B\u503C\uFF1A",paraId:18,tocIndex:7},{value:`// 1. \u89E3\u6784\u5BF9\u8C61\u53C2\u6570
function createUser({ name, age, email }) {
  return { name, age, email };
}

createUser({ name: 'Alice', age: 25, email: 'alice@example.com' });

// 2. \u89E3\u6784\u53C2\u6570 + \u9ED8\u8BA4\u503C
function greet({ name = 'Guest', greeting = 'Hello' } = {}) {
  return \`\${greeting}, \${name}!\`;
}

greet(); // 'Hello, Guest!'
greet({ name: 'Alice' }); // 'Hello, Alice!'
greet({ greeting: 'Hi' }); // 'Hi, Guest!'

// 3. \u89E3\u6784\u6570\u7EC4\u53C2\u6570
function sum([a, b]) {
  return a + b;
}

sum([1, 2]); // 3

// 4. \u5D4C\u5957\u89E3\u6784
function displayUser({
  name,
  address: { city, country },
}) {
  return \`\${name} lives in \${city}, \${country}\`;
}

displayUser({
  name: 'Alice',
  address: { city: 'New York', country: 'USA' },
});
`,paraId:19,tocIndex:7},{value:"\u4E00\u65E6\u8BBE\u7F6E\u4E86\u53C2\u6570\u7684\u9ED8\u8BA4\u503C\uFF0C\u51FD\u6570\u5728\u58F0\u660E\u521D\u59CB\u5316\u65F6\uFF0C\u53C2\u6570\u4F1A\u5F62\u6210\u4E00\u4E2A\u5355\u72EC\u7684\u4F5C\u7528\u57DF\u3002",paraId:20,tocIndex:8},{value:"\u4E00\u65E6\u8BBE\u7F6E\u4E86\u53C2\u6570\u7684\u9ED8\u8BA4\u503C\uFF0C\u51FD\u6570\u8FDB\u884C\u58F0\u660E\u521D\u59CB\u5316\u65F6\uFF0C\u53C2\u6570\u4F1A\u5F62\u6210\u4E00\u4E2A\u5355\u72EC\u7684\u4F5C\u7528\u57DF (context)\u3002\u7B49\u5230\u521D\u59CB\u5316\u7ED3\u675F\uFF0C\u8FD9\u4E2A\u4F5C\u7528\u57DF\u5C31\u4F1A\u6D88\u5931\u3002",paraId:21,tocIndex:8},{value:"\u8FD9\u79CD\u8BED\u6CD5\u884C\u4E3A\uFF0C\u5728\u4E0D\u8BBE\u7F6E\u53C2\u6570\u9ED8\u8BA4\u503C\u65F6\uFF0C\u662F\u4E0D\u4F1A\u51FA\u73B0\u7684",paraId:21,tocIndex:8},{value:"\uFF08\u4E0D\u8BBE\u7F6E\u53C2\u6570\u9ED8\u8BA4\u503C\u65F6\u53C2\u6570\u4E0E\u51FD\u6570\u4F53\u540C\u4E00\u4F5C\u7528\u57DF\u3002\u5E26\u9ED8\u8BA4\u53C2\u6570\u503C\u7684\u51FD\u6570\u7684\u51FD\u6570\u4F53\u91CC\u7B2C\u4E00\u5C42\u4F5C\u7528\u57DF\u4E0D\u80FD\u518D\u58F0\u660E lexical \u7684\u540C\u540D\u53C2\u6570\uFF0C\u884C\u4E3A\u548C\u4E0D\u5E26\u9ED8\u8BA4\u53C2\u6570\u503C\u7684\u51FD\u6570\u4E00\u81F4\uFF09\u3002",paraId:21,tocIndex:8},{value:"ES6 \u53C2\u6570\u4F5C\u7528\u57DF\u548C\u51FD\u6570\u4F53\u4F5C\u7528\u57DF\u662F\u4EC0\u4E48\u5173\u7CFB\uFF1F",paraId:22,tocIndex:8},{value:"\u539F\u56E0\uFF1A",paraId:23,tocIndex:8},{value:"ES \u89C4\u8303\u7684\u89C4\u5B9A\uFF0C\u4E3A\u4E86\u7B26\u5408\u76F4\u89C9\uFF0C\u517C\u5BB9\u8001\u4EE3\u7801",paraId:24,tocIndex:8},{value:"\u4FDD\u6301 ",paraId:24,tocIndex:8},{value:"let",paraId:24,tocIndex:8},{value:" \u548C\u53C2\u6570\u91CD\u590D\u7684\u62A5\u9519\u5904\u7406\uFF0C\u4FDD\u6301 ",paraId:24,tocIndex:8},{value:"var",paraId:24,tocIndex:8},{value:" \u548C\u53C2\u6570\u91CD\u590D\u7684\u4E0D\u62A5\u9519\u5E76\u7EE7\u627F\u503C\u7684\u5904\u7406",paraId:24,tocIndex:8},{value:`// \u793A\u4F8B 1\uFF1Avar \u4E0D\u62A5\u9519
function f1(
  x = 2,
  f = function () {
    x = 3;
  },
) {
  var x; // \u51FD\u6570\u4F53\u5185\u7684 x \u662F\u65B0\u53D8\u91CF\uFF0C\u4E0E\u53C2\u6570 x \u4E0D\u540C
  f(); // \u4FEE\u6539\u7684\u662F\u53C2\u6570\u4F5C\u7528\u57DF\u7684 x
  console.log(x); // undefined\uFF08\u51FD\u6570\u4F53\u5185\u7684 x \u672A\u8D4B\u503C\uFF09
}

f1(); // undefined

// \u793A\u4F8B 2\uFF1Alet \u62A5\u9519
function f2(
  x2 = 2,
  f = function () {
    x2 = 3;
  },
) {
  let x2 = 5; // SyntaxError: Identifier 'x2' has already been declared
  f();
  console.log(x2);
}
// f2(); // \u62A5\u9519

// \u5E26\u9ED8\u8BA4\u53C2\u6570\u503C\u7684\u51FD\u6570\u7684\u51FD\u6570\u4F53\u91CC\u7B2C\u4E00\u5C42\u4F5C\u7528\u57DF\u4E0D\u80FD\u518D\u58F0\u660E lexical \u7684\u540C\u540D\u53C2\u6570\u7684\u539F\u56E0\u5F88\u7B80\u5355\uFF1A
// \u5982\u679C\u8BA9\u4F60\u58F0\u660E\u4E86\uFF0C\u90A3\u90A3\u4E2A\u53C2\u6570\u7684\u5B9E\u53C2\u8FD8\u80FD\u62FF\u7684\u5230\u5417\uFF0C\u540C\u65F6\u4E5F\u662F\u4E3A\u4E86\u548C\u4E0D\u5E26\u9ED8\u8BA4\u53C2\u6570\u503C\u7684\u51FD\u6570\u7EDF\u4E00\u3002
`,paraId:25,tocIndex:8},{value:"\u66F4\u591A\u793A\u4F8B\uFF1A",paraId:26,tocIndex:8},{value:`// \u793A\u4F8B 3\uFF1A\u53C2\u6570\u9ED8\u8BA4\u503C\u5F15\u7528\u5176\u4ED6\u53C2\u6570
let x = 1;

function f3(x, y = x) {
  console.log(y);
}

f3(2); // 2\uFF08y \u5F15\u7528\u7684\u662F\u53C2\u6570 x\uFF0C\u4E0D\u662F\u5916\u90E8 x\uFF09

// \u793A\u4F8B 4\uFF1A\u53C2\u6570\u9ED8\u8BA4\u503C\u5F15\u7528\u5916\u90E8\u53D8\u91CF
let z = 1;

function f4(x = z) {
  let z = 2;
  console.log(x);
}

f4(); // 1\uFF08\u53C2\u6570 x \u7684\u9ED8\u8BA4\u503C\u5F15\u7528\u7684\u662F\u5916\u90E8 z\uFF09
`,paraId:27,tocIndex:8},{value:"length",paraId:28,tocIndex:9},{value:" \u5C5E\u6027\u8FD4\u56DE\u51FD\u6570\u5B9A\u4E49\u65F6",paraId:28,tocIndex:9},{value:"\u671F\u671B\u63A5\u6536\u7684\u53C2\u6570\u4E2A\u6570",paraId:28,tocIndex:9},{value:"\uFF08\u5373\u6CA1\u6709\u9ED8\u8BA4\u503C\u7684\u53C2\u6570\u4E2A\u6570\uFF09\u3002",paraId:28,tocIndex:9},{value:`// \u57FA\u672C\u7528\u6CD5
function f1(a, b) {}
console.log(f1.length); // 2

// \u9ED8\u8BA4\u53C2\u6570\u4E0D\u8BA1\u5165 length
function f2(a, b = 1) {}
console.log(f2.length); // 1

// \u9ED8\u8BA4\u53C2\u6570\u540E\u7684\u53C2\u6570\u4E5F\u4E0D\u8BA1\u5165
function f3(a = 1, b, c) {}
console.log(f3.length); // 0

// \u5269\u4F59\u53C2\u6570\u4E0D\u8BA1\u5165 length
function f4(a, ...rest) {}
console.log(f4.length); // 1

function f5(...args) {}
console.log(f5.length); // 0

// \u89E3\u6784\u53C2\u6570\u8BA1\u4E3A 1 \u4E2A\u53C2\u6570
function f6({ a, b }) {}
console.log(f6.length); // 1
`,paraId:29,tocIndex:9},{value:"\u89C4\u5219\u603B\u7ED3\uFF1A",paraId:30,tocIndex:9},{value:"\u53EA\u8BA1\u7B97\u7B2C\u4E00\u4E2A\u9ED8\u8BA4\u53C2\u6570\u4E4B\u524D\u7684\u53C2\u6570",paraId:31,tocIndex:9},{value:"\u5269\u4F59\u53C2\u6570\u4E0D\u53C2\u4E0E\u8BA1\u6570",paraId:31,tocIndex:9},{value:"\u89E3\u6784\u53C2\u6570\u7B97\u4F5C\u4E00\u4E2A\u53C2\u6570",paraId:31,tocIndex:9},{value:"\u51FD\u6570\u7684 ",paraId:32,tocIndex:10},{value:"name",paraId:32,tocIndex:10},{value:" \u5C5E\u6027\u8FD4\u56DE\u51FD\u6570\u7684\u540D\u79F0\uFF1A",paraId:32,tocIndex:10},{value:`// 1. \u51FD\u6570\u58F0\u660E
function foo() {}
console.log(foo.name); // 'foo'

// 2. \u533F\u540D\u51FD\u6570\u8868\u8FBE\u5F0F
const bar = function () {};
console.log(bar.name); // 'bar'

// 3. \u5177\u540D\u51FD\u6570\u8868\u8FBE\u5F0F
const baz = function namedFunc() {};
console.log(baz.name); // 'namedFunc'

// 4. \u7BAD\u5934\u51FD\u6570
const arrow = () => {};
console.log(arrow.name); // 'arrow'

// 5. \u5BF9\u8C61\u65B9\u6CD5
const obj = {
  sayHi() {},
};
console.log(obj.sayHi.name); // 'sayHi'

// 6. \u4F7F\u7528 bind \u8FD4\u56DE\u7684\u51FD\u6570
function original() {}
const bound = original.bind(null);
console.log(bound.name); // 'bound original'

// 7. \u4F7F\u7528 Function \u6784\u9020\u51FD\u6570
const dynamic = new Function();
console.log(dynamic.name); // 'anonymous'

// 8. getter \u548C setter
const descriptor = {
  get prop() {},
  set prop(value) {},
};
const getter = Object.getOwnPropertyDescriptor(descriptor, 'prop').get;
const setter = Object.getOwnPropertyDescriptor(descriptor, 'prop').set;
console.log(getter.name); // 'get prop'
console.log(setter.name); // 'set prop'
`,paraId:33,tocIndex:10},{value:"ES2017 \u5141\u8BB8\u51FD\u6570\u7684\u6700\u540E\u4E00\u4E2A\u53C2\u6570\u6709\u5C3E\u9017\u53F7 (trailing comma)\uFF1A",paraId:34,tocIndex:11},{value:`// \u51FD\u6570\u5B9A\u4E49\u65F6\u4F7F\u7528\u5C3E\u9017\u53F7
function foo(
  param1,
  param2,
  param3, // \u5C3E\u9017\u53F7
) {
  // ...
}

// \u51FD\u6570\u8C03\u7528\u65F6\u4F7F\u7528\u5C3E\u9017\u53F7
foo(
  'arg1',
  'arg2',
  'arg3', // \u5C3E\u9017\u53F7
);
`,paraId:35,tocIndex:11},{value:"\u597D\u5904\uFF1A",paraId:36,tocIndex:11},{value:"\u4FBF\u4E8E\u7248\u672C\u63A7\u5236\uFF0C\u6DFB\u52A0/\u5220\u9664\u53C2\u6570\u65F6\uFF0C\u5DEE\u5F02\u66F4\u6E05\u6670",paraId:37,tocIndex:11},{value:"\u907F\u514D\u5728\u6DFB\u52A0\u65B0\u53C2\u6570\u65F6\u5FD8\u8BB0\u52A0\u9017\u53F7\u5BFC\u81F4\u7684\u9519\u8BEF",paraId:37,tocIndex:11},{value:"\u8FD9\u4E09\u4E2A\u65B9\u6CD5\u7528\u4E8E\u6539\u53D8\u51FD\u6570\u6267\u884C\u65F6\u7684 ",paraId:38,tocIndex:13},{value:"this",paraId:38,tocIndex:13},{value:" \u6307\u5411\uFF1A",paraId:38,tocIndex:13},{value:`const person = {
  name: 'Alice',
};

function greet(greeting, punctuation) {
  return \`\${greeting}, \${this.name}\${punctuation}\`;
}

// 1. call\uFF1A\u7ACB\u5373\u8C03\u7528\uFF0C\u53C2\u6570\u9010\u4E2A\u4F20\u9012
console.log(greet.call(person, 'Hello', '!')); // 'Hello, Alice!'

// 2. apply\uFF1A\u7ACB\u5373\u8C03\u7528\uFF0C\u53C2\u6570\u4EE5\u6570\u7EC4\u5F62\u5F0F\u4F20\u9012
console.log(greet.apply(person, ['Hi', '?'])); // 'Hi, Alice?'

// 3. bind\uFF1A\u8FD4\u56DE\u65B0\u51FD\u6570\uFF0C\u4E0D\u7ACB\u5373\u8C03\u7528
const boundGreet = greet.bind(person, 'Hey');
console.log(boundGreet('.')); // 'Hey, Alice.'
`,paraId:39,tocIndex:13},{value:"\u533A\u522B\uFF1A",paraId:40,tocIndex:13},{value:"\u65B9\u6CD5",paraId:41,tocIndex:13},{value:"\u662F\u5426\u7ACB\u5373\u6267\u884C",paraId:41,tocIndex:13},{value:"\u53C2\u6570\u4F20\u9012\u65B9\u5F0F",paraId:41,tocIndex:13},{value:"\u8FD4\u56DE\u503C",paraId:41,tocIndex:13},{value:"call",paraId:41,tocIndex:13},{value:"\u662F",paraId:41,tocIndex:13},{value:"\u9010\u4E2A\u4F20\u9012",paraId:41,tocIndex:13},{value:"\u51FD\u6570\u6267\u884C\u7ED3\u679C",paraId:41,tocIndex:13},{value:"apply",paraId:41,tocIndex:13},{value:"\u662F",paraId:41,tocIndex:13},{value:"\u6570\u7EC4\u5F62\u5F0F\u4F20\u9012",paraId:41,tocIndex:13},{value:"\u51FD\u6570\u6267\u884C\u7ED3\u679C",paraId:41,tocIndex:13},{value:"bind",paraId:41,tocIndex:13},{value:"\u5426",paraId:41,tocIndex:13},{value:"\u9010\u4E2A\u4F20\u9012\uFF08\u53EF\u9884\u8BBE\uFF09",paraId:41,tocIndex:13},{value:"\u65B0\u51FD\u6570",paraId:41,tocIndex:13},{value:"\u5E94\u7528\u573A\u666F\uFF1A",paraId:42,tocIndex:13},{value:`// 1. \u501F\u7528\u65B9\u6CD5
const arrayLike = { 0: 'a', 1: 'b', length: 2 };
const arr = Array.prototype.slice.call(arrayLike);
console.log(arr); // ['a', 'b']

// 2. \u627E\u51FA\u6570\u7EC4\u4E2D\u7684\u6700\u5927\u503C
const numbers = [5, 6, 2, 3, 7];
const max = Math.max.apply(null, numbers);
console.log(max); // 7

// 3. \u504F\u51FD\u6570\u5E94\u7528\uFF08Partial Application\uFF09
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);
console.log(double(5)); // 10
console.log(double(10)); // 20

// 4. \u4FDD\u6301 this \u4E0A\u4E0B\u6587
class Button {
  constructor() {
    this.clicked = false;
    // \u4F7F\u7528 bind \u786E\u4FDD handleClick \u4E2D\u7684 this \u6307\u5411\u5B9E\u4F8B
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.clicked = true;
  }
}
`,paraId:43,tocIndex:13},{value:"\u7BAD\u5934\u51FD\u6570\u6CA1\u6709\u81EA\u5DF1\u7684 ",paraId:44,tocIndex:14},{value:"this",paraId:44,tocIndex:14},{value:"\uFF0C\u5B83\u4F1A\u6355\u83B7\u5B9A\u4E49\u65F6\u6240\u5728\u4E0A\u4E0B\u6587\u7684 ",paraId:44,tocIndex:14},{value:"this",paraId:44,tocIndex:14},{value:"\uFF1A",paraId:44,tocIndex:14},{value:`// \u793A\u4F8B 1\uFF1A\u5BF9\u8C61\u65B9\u6CD5\u4E2D\u7684 this
const obj = {
  name: 'Alice',
  regularFunc: function () {
    console.log(this.name); // 'Alice'
  },
  arrowFunc: () => {
    console.log(this.name); // undefined\uFF08this \u6307\u5411\u5916\u5C42\u4F5C\u7528\u57DF\uFF09
  },
};

obj.regularFunc(); // 'Alice'
obj.arrowFunc(); // undefined

// \u793A\u4F8B 2\uFF1A\u5B9A\u65F6\u5668\u4E2D\u7684 this
function Timer() {
  this.seconds = 0;

  // \u666E\u901A\u51FD\u6570\uFF1A\u9700\u8981\u4FDD\u5B58 this
  setInterval(function () {
    this.seconds++; // this \u6307\u5411\u5168\u5C40\u5BF9\u8C61
    console.log(this.seconds); // NaN
  }, 1000);
}

function Timer2() {
  this.seconds = 0;

  // \u7BAD\u5934\u51FD\u6570\uFF1A\u81EA\u52A8\u6355\u83B7\u5916\u5C42 this
  setInterval(() => {
    this.seconds++; // this \u6307\u5411 Timer2 \u5B9E\u4F8B
    console.log(this.seconds); // 1, 2, 3...
  }, 1000);
}

// \u793A\u4F8B 3\uFF1A\u4E8B\u4EF6\u5904\u7406\u5668
class Button {
  constructor() {
    this.count = 0;
  }

  // \u4F7F\u7528\u7BAD\u5934\u51FD\u6570\u4F5C\u4E3A\u7C7B\u5B57\u6BB5
  handleClick = () => {
    this.count++;
    console.log(this.count);
  };
}
`,paraId:45,tocIndex:14},{value:"\u7BAD\u5934\u51FD\u6570\u7684\u9650\u5236\uFF1A",paraId:46,tocIndex:14},{value:"\u6CA1\u6709\u81EA\u5DF1\u7684 ",paraId:47,tocIndex:14},{value:"this",paraId:47,tocIndex:14},{value:" \u5BF9\u8C61",paraId:47,tocIndex:14},{value:"\u4E0D\u53EF\u4EE5\u5F53\u4F5C\u6784\u9020\u51FD\u6570\uFF08\u4E0D\u80FD\u4F7F\u7528 ",paraId:47,tocIndex:14},{value:"new",paraId:47,tocIndex:14},{value:" \u547D\u4EE4\uFF09",paraId:47,tocIndex:14},{value:"\u6CA1\u6709 ",paraId:47,tocIndex:14},{value:"arguments",paraId:47,tocIndex:14},{value:" \u5BF9\u8C61\uFF08\u53EF\u4EE5\u7528\u5269\u4F59\u53C2\u6570\u4EE3\u66FF\uFF09",paraId:47,tocIndex:14},{value:"\u4E0D\u53EF\u4EE5\u4F7F\u7528 ",paraId:47,tocIndex:14},{value:"yield",paraId:47,tocIndex:14},{value:" \u547D\u4EE4\uFF08\u4E0D\u80FD\u7528\u4F5C Generator \u51FD\u6570\uFF09",paraId:47,tocIndex:14},{value:"\u6CA1\u6709 ",paraId:47,tocIndex:14},{value:"prototype",paraId:47,tocIndex:14},{value:" \u5C5E\u6027",paraId:47,tocIndex:14},{value:`// 1. \u6CA1\u6709\u81EA\u5DF1\u7684 this
const obj2 = {
  name: 'Bob',
  arrowFunc: () => {
    console.log(this); // \u5168\u5C40\u5BF9\u8C61\u6216 undefined
  },
};

// 2. \u4E0D\u80FD\u4F7F\u7528 new
const ArrowFunc = () => {};
// new ArrowFunc(); // TypeError: ArrowFunc is not a constructor

// 3. \u6CA1\u6709 arguments
const regularFunc = function () {
  console.log(arguments); // Arguments \u5BF9\u8C61
};

const arrowFunc = (...args) => {
  // console.log(arguments); // ReferenceError
  console.log(args); // \u4F7F\u7528\u5269\u4F59\u53C2\u6570\u4EE3\u66FF
};

// 4. \u6CA1\u6709 prototype
console.log(regularFunc.prototype); // {}
console.log(arrowFunc.prototype); // undefined
`,paraId:48,tocIndex:14},{value:"\u4E3A\u4EC0\u4E48\u7BAD\u5934\u51FD\u6570\u53EF\u4EE5\u88AB bind\uFF1F",paraId:49,tocIndex:14},{value:"\u867D\u7136\u7BAD\u5934\u51FD\u6570\u7684 ",paraId:50,tocIndex:14},{value:"this",paraId:50,tocIndex:14},{value:" \u65E0\u6CD5\u88AB\u6539\u53D8\uFF0C\u4F46 ",paraId:50,tocIndex:14},{value:"bind",paraId:50,tocIndex:14},{value:" \u4ECD\u7136\u53EF\u4EE5\u7528\u4E8E\u7ED1\u5B9A\u5176\u4ED6\u53C2\u6570\uFF08\u504F\u51FD\u6570\u5E94\u7528\uFF09\u3002",paraId:50,tocIndex:14},{value:"\u95ED\u5305",paraId:51,tocIndex:16},{value:"\u7684\u82F1\u6587\u662F ",paraId:51,tocIndex:16},{value:"closure",paraId:51,tocIndex:16},{value:"\uFF0C\u82F1\u6587\u7684\u610F\u601D\u5927\u6982\u662F\uFF1A",paraId:51,tocIndex:16},{value:"A function which closes over the environment (scope) in which it was defined.",paraId:52,tocIndex:16},{value:"\u6240\u4EE5\u95ED\u5305\u5C31\u662F\uFF1A",paraId:53,tocIndex:16},{value:"\u51FD\u6570\u6355\u83B7\u4E86\u5176\u5B9A\u4E49\u65F6\u6240\u5728\u4F5C\u7528\u57DF\u4E2D\u7684\u81EA\u7531\u53D8\u91CF",paraId:53,tocIndex:16},{value:"\u3002",paraId:53,tocIndex:16},{value:"\u62D3\u5C55\uFF1A",paraId:54,tocIndex:16},{value:"\u5173\u4E8E\u95ED\u5305\u7684\u5E94\u7528\u5B9E\u4F8B\uFF0C\u8FD9\u79CD\u63CF\u8FF0\u4E0E\u547D\u540D\u662F\u5426\u66F4\u52A0\u8D34\u5207\uFF1F",paraId:54,tocIndex:16},{value:"JS \u65E9\u671F\u5C01\u88C5\u6027\u592A\u5DEE\uFF0C\u5F88\u591A\u4EBA\u7528\u95ED\u5305\u7279\u6027\u6765\u5B9E\u73B0\u5C01\u88C5\u6027\uFF0C\u800C\u5C01\u88C5\u6027\u5C31\u9700\u8981\u51FD\u6570\u4F5C\u7528\u57DF\uFF0C\u4EE5\u81F3\u4E8E\u628A\u95ED\u5305\u3001\u5916\u90E8\u51FD\u6570\u3001\u4F5C\u7528\u57DF\u4E09\u8005\u6982\u5FF5\u7ED1\u5B9A\u4E86\u3002",paraId:55,tocIndex:16},{value:"\u5B9E\u9645\u4E0A\u95ED\u5305\u5C31\u662F\u6355\u83B7\u4E86\u5916\u90E8\u53D8\u91CF\u7684\u51FD\u6570\u800C\u5DF2\uFF0C\u5916\u90E8\u53D8\u91CF\u5728\u54EA\u5E76\u4E0D\u91CD\u8981",paraId:56,tocIndex:16},{value:"\u3002",paraId:56,tocIndex:16},{value:"\u629B\u5F00\u5916\u90E8\u51FD\u6570\uFF0C\u629B\u5F00\u4F5C\u7528\u57DF\u3002\u53EA\u8BA8\u8BBA\u4E00\u4E2A\u51FD\u6570\uFF0C\u8BBF\u95EE\u4E86\u5916\u90E8\u53D8\u91CF\uFF0C",paraId:57,tocIndex:16},{value:"\u800C\u4E14\u8FD9\u79CD\u8BBF\u95EE\u4E0D\u662F\u503C\u7684\u590D\u5236\u800C\u662F\u6355\u83B7\u4E86\u53D8\u91CF\u672C\u8EAB",paraId:57,tocIndex:16},{value:"\u3002",paraId:57,tocIndex:16},{value:"\u603B\u7ED3\uFF1A",paraId:58,tocIndex:16},{value:"\u4EFB\u4F55\u51FD\u6570\u90FD\u53EF\u4EE5\u662F\u95ED\u5305",paraId:59,tocIndex:16},{value:"\u6355\u83B7\u53D8\u91CF\u7684\u51FD\u6570\u662F\u901A\u5E38\u610F\u4E49\u7684\u95ED\u5305",paraId:59,tocIndex:16},{value:"\u65B9\u6CD5\u662F\u6355\u83B7\u4E86\u5B9E\u4F8B (this) \u7684\u95ED\u5305",paraId:59,tocIndex:16},{value:"\u7EAF\u51FD\u6570\u5C31\u662F\u6355\u83B7\u53D8\u91CF\u6570\u4E3A ",paraId:59,tocIndex:16},{value:"0",paraId:59,tocIndex:16},{value:" \u7684\u95ED\u5305",paraId:59,tocIndex:16},{value:"JS \u91CC\u5BF9\u8C61\u6210\u5458\u65B9\u6CD5\u8C03\u7528\u6210\u5458\u53D8\u91CF\u7B97\u4E0D\u7B97\u95ED\u5305\uFF1F",paraId:60,tocIndex:16},{value:"\u79D1\u666E\uFF1A",paraId:61,tocIndex:16},{value:"\u5982\u4F55\u4ECE\u5F15\u64CE\u89D2\u5EA6\u6B63\u786E\u7406\u89E3 JavaScript \u95ED\u5305\uFF1F",paraId:61,tocIndex:16},{value:`function f1() {
  let a = 2;
  return function f2() {
    console.log(a++);
  };
}

const f = f1();

// \u51FD\u6570\u4E5F\u662F\u5BF9\u8C61\uFF0C\u8FD9\u91CC f \u662F\u540C\u4E00\u4E2A\u51FD\u6570\u5B9E\u4F8B\uFF0C\u6267\u884C\u4E86\u4E09\u6B21
// f \u51FD\u6570\u6355\u83B7\u4E86\u81EA\u7531\u53D8\u91CF a\uFF0C\u4EA7\u751F\u4E86\u95ED\u5305
// \u5373\u4F7F f1 \u6267\u884C\u5B8C\u51FA\u6808\u4E86\uFF0C\u7531\u4E8E\u95ED\u5305\u7684\u5B58\u5728\uFF0Ca \u4F1A\u7EE7\u7EED\u7D2F\u52A0
f(); // 2
f(); // 3
f(); // 4

// f1()() \u6BCF\u6B21\u6267\u884C\u90FD\u8FD4\u56DE\u4E00\u4E2A\u65B0\u7684\u51FD\u6570\u5B9E\u4F8B
// \u867D\u7136\u4E5F\u662F\u95ED\u5305\uFF0C\u4F46\u6BCF\u6B21\u90FD\u521B\u5EFA\u4E86\u65B0\u7684\u53D8\u91CF a\uFF0C\u6240\u4EE5\u4E0D\u4F1A\u7D2F\u52A0
f1()(); // 2
f1()(); // 2
`,paraId:62,tocIndex:17},{value:`function createCounter() {
  let count = 0; // \u79C1\u6709\u53D8\u91CF

  return {
    increment() {
      return ++count;
    },
    decrement() {
      return --count;
    },
    getCount() {
      return count;
    },
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount()); // 2
console.log(counter.count); // undefined\uFF08\u65E0\u6CD5\u76F4\u63A5\u8BBF\u95EE\u79C1\u6709\u53D8\u91CF\uFF09
`,paraId:63,tocIndex:19},{value:`const myModule = (function () {
  // \u79C1\u6709\u53D8\u91CF\u548C\u51FD\u6570
  let privateVar = '\u79C1\u6709\u53D8\u91CF';

  function privateFunc() {
    return '\u79C1\u6709\u51FD\u6570';
  }

  // \u516C\u5171 API
  return {
    publicVar: '\u516C\u5171\u53D8\u91CF',
    publicFunc() {
      return privateFunc() + ' - ' + privateVar;
    },
  };
})();

console.log(myModule.publicFunc()); // '\u79C1\u6709\u51FD\u6570 - \u79C1\u6709\u53D8\u91CF'
console.log(myModule.privateVar); // undefined
`,paraId:64,tocIndex:20},{value:`function createMultiplier(multiplier) {
  return function (num) {
    return num * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
`,paraId:65,tocIndex:21},{value:`function memoize(fn) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);
    if (key in cache) {
      console.log('\u4ECE\u7F13\u5B58\u83B7\u53D6');
      return cache[key];
    }

    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

const expensiveFunc = (n) => {
  console.log('\u8BA1\u7B97\u4E2D...');
  return n * n;
};

const memoized = memoize(expensiveFunc);
console.log(memoized(5)); // '\u8BA1\u7B97\u4E2D...' 25
console.log(memoized(5)); // '\u4ECE\u7F13\u5B58\u83B7\u53D6' 25
`,paraId:66,tocIndex:22},{value:"\u9AD8\u9636\u51FD\u6570\u662F\u6307\u81F3\u5C11\u6EE1\u8DB3\u4E0B\u5217\u6761\u4EF6\u4E4B\u4E00\u7684\u51FD\u6570\uFF1A",paraId:67,tocIndex:24},{value:"\u63A5\u53D7\u4E00\u4E2A\u6216\u591A\u4E2A\u51FD\u6570\u4F5C\u4E3A\u53C2\u6570",paraId:68,tocIndex:24},{value:"\u8FD4\u56DE\u4E00\u4E2A\u51FD\u6570",paraId:68,tocIndex:24},{value:`// 1. \u63A5\u53D7\u51FD\u6570\u4F5C\u4E3A\u53C2\u6570
function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}

repeat(3, console.log); // 0 1 2

// 2. \u8FD4\u56DE\u51FD\u6570
function greaterThan(n) {
  return (m) => m > n;
}

const greaterThan10 = greaterThan(10);
console.log(greaterThan10(11)); // true
console.log(greaterThan10(9)); // false

// 3. \u5E38\u89C1\u7684\u9AD8\u9636\u51FD\u6570\uFF1Amap\u3001filter\u3001reduce
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map((x) => x * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

const evens = numbers.filter((x) => x % 2 === 0);
console.log(evens); // [2, 4]

const sum = numbers.reduce((acc, x) => acc + x, 0);
console.log(sum); // 15
`,paraId:69,tocIndex:24},{value:"\u9AD8\u9636\u51FD\u6570\u7684\u5E94\u7528\uFF1A",paraId:70,tocIndex:24},{value:`// \u51FD\u6570\u7EC4\u5408\uFF08Composition\uFF09
function compose(...fns) {
  return function (x) {
    return fns.reduceRight((acc, fn) => fn(acc), x);
  };
}

const add1 = (x) => x + 1;
const double = (x) => x * 2;
const square = (x) => x * x;

const combined = compose(square, double, add1);
console.log(combined(3)); // ((3 + 1) * 2) ^ 2 = 64

// \u67EF\u91CC\u5316\uFF08Currying\uFF09
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

function sum3(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum3);
console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6
console.log(curriedSum(1)(2, 3)); // 6
`,paraId:71,tocIndex:24},{value:"\u9012\u5F52\u662F\u6307\u51FD\u6570\u8C03\u7528\u81EA\u8EAB\u7684\u7F16\u7A0B\u6280\u5DE7\uFF1A",paraId:72,tocIndex:25},{value:`// 1. \u57FA\u672C\u9012\u5F52\uFF1A\u8BA1\u7B97\u9636\u4E58
function factorial(n) {
  if (n <= 1) return 1; // \u57FA\u672C\u60C5\u51B5
  return n * factorial(n - 1); // \u9012\u5F52\u8C03\u7528
}

console.log(factorial(5)); // 120

// 2. \u6590\u6CE2\u90A3\u5951\u6570\u5217
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(6)); // 8

// 3. \u9012\u5F52\u904D\u5386\u6811\u7ED3\u6784
const tree = {
  value: 1,
  children: [
    {
      value: 2,
      children: [{ value: 4 }, { value: 5 }],
    },
    {
      value: 3,
      children: [{ value: 6 }],
    },
  ],
};

function traverse(node) {
  console.log(node.value);
  if (node.children) {
    node.children.forEach(traverse);
  }
}

traverse(tree); // 1 2 4 5 3 6

// 4. \u9012\u5F52\u6241\u5E73\u5316\u6570\u7EC4
function flatten(arr) {
  return arr.reduce((acc, item) => {
    return acc.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
}

console.log(flatten([1, [2, [3, 4], 5], 6])); // [1, 2, 3, 4, 5, 6]
`,paraId:73,tocIndex:25},{value:"\u6CE8\u610F\uFF1A",paraId:74,tocIndex:25},{value:" \u9012\u5F52\u53EF\u80FD\u5BFC\u81F4\u6808\u6EA2\u51FA\uFF0C\u5BF9\u4E8E\u6DF1\u5C42\u9012\u5F52\uFF0C\u8003\u8651\u4F7F\u7528\u5C3E\u9012\u5F52\u4F18\u5316\u6216\u6539\u7528\u8FED\u4EE3\u3002",paraId:74,tocIndex:25},{value:"IIFE (Immediately Invoked Function Expression) \u662F\u5B9A\u4E49\u540E\u7ACB\u5373\u6267\u884C\u7684\u51FD\u6570\uFF1A",paraId:75,tocIndex:26},{value:`// 1. \u57FA\u672C\u8BED\u6CD5
(function () {
  console.log('IIFE \u6267\u884C\u4E86');
})();

// 2. \u4F20\u9012\u53C2\u6570
(function (name) {
  console.log(\`Hello, \${name}!\`);
})('Alice');

// 3. \u8FD4\u56DE\u503C
const result = (function () {
  return 42;
})();
console.log(result); // 42

// 4. \u7BAD\u5934\u51FD\u6570 IIFE
(() => {
  console.log('\u7BAD\u5934\u51FD\u6570 IIFE');
})();

// 5. \u5176\u4ED6\u5199\u6CD5
!(function () {
  console.log('\u4F7F\u7528 ! \u8FD0\u7B97\u7B26');
})();

+(function () {
  console.log('\u4F7F\u7528 + \u8FD0\u7B97\u7B26');
})();
`,paraId:76,tocIndex:26},{value:"\u5E94\u7528\u573A\u666F\uFF1A",paraId:77,tocIndex:26},{value:`// 1. \u907F\u514D\u6C61\u67D3\u5168\u5C40\u4F5C\u7528\u57DF
(function () {
  const privateVar = '\u79C1\u6709\u53D8\u91CF';
  // \u8FD9\u91CC\u7684\u53D8\u91CF\u4E0D\u4F1A\u6C61\u67D3\u5168\u5C40\u4F5C\u7528\u57DF
})();

// 2. \u6A21\u5757\u6A21\u5F0F
const myModule = (function () {
  let privateCounter = 0;

  return {
    increment() {
      privateCounter++;
    },
    getCount() {
      return privateCounter;
    },
  };
})();

// 3. \u521B\u5EFA\u72EC\u7ACB\u7684\u4F5C\u7528\u57DF\uFF08\u89E3\u51B3\u5FAA\u73AF\u4E2D\u7684\u95ED\u5305\u95EE\u9898\uFF09
// \u9519\u8BEF\u793A\u4F8B\uFF1A
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i); // 3 3 3
  }, 100);
}

// \u4F7F\u7528 IIFE \u4FEE\u590D\uFF1A
for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(function () {
      console.log(j); // 0 1 2
    }, 100);
  })(i);
}

// \u73B0\u4EE3\u5199\u6CD5\uFF08\u4F7F\u7528 let\uFF09\uFF1A
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i); // 0 1 2
  }, 100);
}
`,paraId:78,tocIndex:26},{value:"\u5C3E\u8C03\u7528\u662F\u6307\u51FD\u6570\u7684\u6700\u540E\u4E00\u6B65\u64CD\u4F5C\u662F\u8C03\u7528\u53E6\u4E00\u4E2A\u51FD\u6570\uFF1A",paraId:79,tocIndex:27},{value:`// \u5C3E\u8C03\u7528
function f(x) {
  return g(x); // \u6700\u540E\u4E00\u6B65\u662F\u51FD\u6570\u8C03\u7528
}

// \u975E\u5C3E\u8C03\u7528
function f2(x) {
  let y = g(x);
  return y; // \u8C03\u7528\u540E\u8FD8\u6709\u5176\u4ED6\u64CD\u4F5C
}

function f3(x) {
  return g(x) + 1; // \u8C03\u7528\u540E\u8FD8\u9700\u8981\u8BA1\u7B97
}
`,paraId:80,tocIndex:27},{value:"\u5C3E\u9012\u5F52\u4F18\u5316\uFF1A",paraId:81,tocIndex:27},{value:"\u5C3E\u9012\u5F52\u662F\u6307\u9012\u5F52\u8C03\u7528\u662F\u51FD\u6570\u7684\u6700\u540E\u4E00\u6B65\u64CD\u4F5C\u3002\u5C3E\u9012\u5F52\u53EF\u4EE5\u88AB\u4F18\u5316\uFF0C\u907F\u514D\u6808\u6EA2\u51FA\uFF1A",paraId:82,tocIndex:27},{value:`// \u666E\u901A\u9012\u5F52\uFF08\u53EF\u80FD\u6808\u6EA2\u51FA\uFF09
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1); // \u4E0D\u662F\u5C3E\u8C03\u7528\uFF0C\u8C03\u7528\u540E\u8FD8\u8981\u4E58\u4EE5 n
}

// \u5C3E\u9012\u5F52\u4F18\u5316\u7248\u672C
function factorialTail(n, total = 1) {
  if (n === 1) return total;
  return factorialTail(n - 1, n * total); // \u5C3E\u8C03\u7528
}

console.log(factorialTail(5)); // 120

// \u6590\u6CE2\u90A3\u5951\u6570\u5217\u7684\u5C3E\u9012\u5F52\u4F18\u5316
function fibonacci(n, a = 0, b = 1) {
  if (n === 0) return a;
  return fibonacci(n - 1, b, a + b);
}

console.log(fibonacci(10)); // 55
`,paraId:83,tocIndex:27},{value:"\u6CE8\u610F\uFF1A",paraId:84,tocIndex:27},{value:" ES6 \u89C4\u8303\u652F\u6301\u5C3E\u8C03\u7528\u4F18\u5316\uFF0C\u4F46\u76EE\u524D\u53EA\u6709 Safari \u5B9E\u73B0\u4E86\u3002\u5176\u4ED6\u6D4F\u89C8\u5668\u53EF\u80FD\u4E0D\u4F1A\u8FDB\u884C\u4F18\u5316\u3002",paraId:84,tocIndex:27},{value:"\u66FF\u4EE3\u65B9\u6848\uFF08\u8E66\u5E8A\u51FD\u6570\uFF09\uFF1A",paraId:85,tocIndex:27},{value:`function trampoline(fn) {
  while (typeof fn === 'function') {
    fn = fn();
  }
  return fn;
}

function sum(x, y) {
  if (y > 0) {
    return () => sum(x + 1, y - 1);
  } else {
    return x;
  }
}

console.log(trampoline(sum(1, 100000))); // \u4E0D\u4F1A\u6808\u6EA2\u51FA
`,paraId:86,tocIndex:27},{value:"Function.prototype.toString()",paraId:87,tocIndex:29},{value:" \u65B9\u6CD5\u8FD4\u56DE\u51FD\u6570\u7684\u6E90\u4EE3\u7801\u5B57\u7B26\u4E32\uFF1A",paraId:87,tocIndex:29},{value:`function func(x, y = 'b') {
  // \u8FD9\u662F\u6CE8\u91CA
  return x + y;
}

console.log(func.toString());
// function func(x, y = 'b') {
//   // \u8FD9\u662F\u6CE8\u91CA
//   return x + y;
// }

// \u7BAD\u5934\u51FD\u6570
const arrow = (a, b) => a + b;
console.log(arrow.toString());
// (a, b) => a + b

// \u5185\u7F6E\u51FD\u6570\u4F1A\u663E\u793A [native code]
console.log(Math.max.toString());
// function max() { [native code] }

// \u7ED1\u5B9A\u51FD\u6570
const bound = func.bind(null, 1);
console.log(bound.toString());
// function () { [native code] }
`,paraId:88,tocIndex:29},{value:"\u6CE8\u610F\uFF1A",paraId:89,tocIndex:29},{value:" ES2019 \u89C4\u5B9A\uFF0C",paraId:89,tocIndex:29},{value:"toString()",paraId:89,tocIndex:29},{value:" \u65B9\u6CD5\u8FD4\u56DE\u7684\u5B57\u7B26\u4E32\u5E94\u8BE5\u4E0E\u6E90\u4EE3\u7801\u5B8C\u5168\u4E00\u81F4\uFF0C\u5305\u62EC\u7A7A\u683C\u548C\u6CE8\u91CA\u3002",paraId:89,tocIndex:29},{value:"\u4F7F\u7528 ",paraId:90,tocIndex:30},{value:"Function",paraId:90,tocIndex:30},{value:" \u6784\u9020\u51FD\u6570\u52A8\u6001\u521B\u5EFA\u51FD\u6570\uFF1A",paraId:90,tocIndex:30},{value:"\u8BED\u6CD5\uFF1A",paraId:91,tocIndex:30},{value:`let func = new Function([arg1, arg2, ...argN], functionBody);
`,paraId:92,tocIndex:30},{value:"\u793A\u4F8B\uFF1A",paraId:93,tocIndex:30},{value:`// 1. \u57FA\u672C\u7528\u6CD5
const sum = new Function('a', 'b', 'return a + b');
console.log(sum(1, 2)); // 3

// 2. \u53C2\u6570\u53EF\u4EE5\u7528\u9017\u53F7\u5206\u9694
const sum2 = new Function('a,b', 'return a + b');
console.log(sum2(1, 2)); // 3

// 3. \u53C2\u6570\u53EF\u4EE5\u7528\u9017\u53F7\u548C\u7A7A\u683C\u5206\u9694
const sum3 = new Function('a , b', 'return a + b');
console.log(sum3(1, 2)); // 3

// 4. \u6CA1\u6709\u53C2\u6570
const sayHi = new Function('return "Hello"');
console.log(sayHi()); // 'Hello'
`,paraId:94,tocIndex:30},{value:"\u91CD\u8981\u7279\u6027\uFF1A",paraId:95,tocIndex:30},{value:"\u4F7F\u7528 ",paraId:96,tocIndex:30},{value:"new Function",paraId:96,tocIndex:30},{value:" \u521B\u5EFA\u7684\u51FD\u6570\uFF0C\u5B83\u7684 ",paraId:96,tocIndex:30},{value:"[[Environment]]",paraId:96,tocIndex:30},{value:" \u6307\u5411",paraId:96,tocIndex:30},{value:"\u5168\u5C40\u8BCD\u6CD5\u73AF\u5883",paraId:96,tocIndex:30},{value:"\uFF0C\u800C\u4E0D\u662F\u51FD\u6570\u6240\u5728\u7684\u5916\u90E8\u8BCD\u6CD5\u73AF\u5883\uFF1A",paraId:96,tocIndex:30},{value:`let x = 10;

function createFunc() {
  let x = 20;

  // \u666E\u901A\u51FD\u6570\uFF1A\u53EF\u4EE5\u8BBF\u95EE\u5916\u90E8\u53D8\u91CF
  const normalFunc = function () {
    return x;
  };

  // new Function\uFF1A\u53EA\u80FD\u8BBF\u95EE\u5168\u5C40\u53D8\u91CF
  const dynamicFunc = new Function('return x');

  console.log(normalFunc()); // 20\uFF08\u8BBF\u95EE\u5916\u90E8 x\uFF09
  console.log(dynamicFunc()); // 10\uFF08\u8BBF\u95EE\u5168\u5C40 x\uFF09
}

createFunc();
`,paraId:97,tocIndex:30},{value:"\u5E94\u7528\u573A\u666F\uFF1A",paraId:98,tocIndex:30},{value:"\u52A8\u6001\u751F\u6210\u4EE3\u7801\uFF08\u8C28\u614E\u4F7F\u7528\uFF0C\u6CE8\u610F\u5B89\u5168\u6027\uFF09",paraId:99,tocIndex:30},{value:"\u6267\u884C\u4ECE\u670D\u52A1\u5668\u63A5\u6536\u7684\u4EE3\u7801\u5B57\u7B26\u4E32",paraId:99,tocIndex:30},{value:"\u521B\u5EFA\u5B8C\u5168\u72EC\u7ACB\u4E8E\u5916\u90E8\u4F5C\u7528\u57DF\u7684\u51FD\u6570",paraId:99,tocIndex:30},{value:"JavaScript \u91CC Function \u4E5F\u662F\u5BF9\u8C61\uFF1F",paraId:100,tocIndex:31},{value:"\u6309\u7167 ECMA-262 \u7684\u8BF4\u6CD5\uFF1A",paraId:101,tocIndex:31},{value:"An Object is logically a collection of properties.",paraId:102,tocIndex:31},{value:"\u53EA\u8981\u662F\u4E00\u5806\u5C5E\u6027\u7684\u7EC4\u5408\uFF0C\u90A3\u5C31\u662F\u5BF9\u8C61",paraId:103,tocIndex:31},{value:"\u3002\u51FD\u6570\u5C31\u662F\u5F62\u53C2\u3001\u53EF\u6267\u884C\u4EE3\u7801\uFF08\u5B57\u7B26\u4E32\uFF09\u7684\u7EC4\u5408\uFF0C\u8DDF\u5BF9\u8C61\u6CA1\u6709\u672C\u8D28\u533A\u522B\u3002",paraId:103,tocIndex:31},{value:"\u8FD9\u4E00\u70B9\u4ECE\u51FD\u6570\u7684\u6784\u9020\u51FD\u6570\u4E5F\u53EF\u4EE5\u770B\u51FA\u6765\uFF1A",paraId:104,tocIndex:31},{value:`let fn = new Function('x', 'y', 'return x + y');
`,paraId:105,tocIndex:31},{value:"\u8FD9\u8DDF\u6570\u7EC4\u5F88\u50CF\uFF1A",paraId:106,tocIndex:31},{value:`let array = new Array(1, 2, 3);
`,paraId:107,tocIndex:31},{value:"\u51FD\u6570\u4F5C\u4E3A\u5BF9\u8C61\u53EF\u4EE5\u6709\u81EA\u5B9A\u4E49\u5C5E\u6027\uFF1A",paraId:108,tocIndex:31},{value:`function sayHi() {
  console.log('Hi');
  sayHi.counter++; // \u4F7F\u7528\u51FD\u6570\u5C5E\u6027
}

sayHi.counter = 0; // \u6DFB\u52A0\u5C5E\u6027

sayHi(); // Hi
sayHi(); // Hi

console.log(sayHi.counter); // 2
`,paraId:109,tocIndex:31},{value:"\u5B9E\u9645\u5E94\u7528\uFF1A",paraId:110,tocIndex:31},{value:"\u51FD\u6570\u53EF\u4EE5\u5E26\u6709\u989D\u5916\u7684\u5C5E\u6027\u3002\u5F88\u591A\u77E5\u540D\u7684 JavaScript \u5E93\u90FD\u5145\u5206\u5229\u7528\u4E86\u8FD9\u4E2A\u529F\u80FD\u3002",paraId:111,tocIndex:31},{value:'\u5B83\u4EEC\u521B\u5EFA\u4E00\u4E2A "\u4E3B" \u51FD\u6570\uFF0C\u7136\u540E\u7ED9\u5B83\u9644\u52A0\u5F88\u591A\u5176\u5B83 "\u8F85\u52A9" \u51FD\u6570\u3002\u4F8B\u5982\uFF1A',paraId:112,tocIndex:31},{value:"jQuery",paraId:113,tocIndex:31},{value:" \u5E93\u521B\u5EFA\u4E86\u4E00\u4E2A\u540D\u4E3A ",paraId:113,tocIndex:31},{value:"$",paraId:113,tocIndex:31},{value:" \u7684\u51FD\u6570",paraId:113,tocIndex:31},{value:"lodash",paraId:113,tocIndex:31},{value:" \u5E93\u521B\u5EFA\u4E00\u4E2A ",paraId:113,tocIndex:31},{value:"_",paraId:113,tocIndex:31},{value:" \u51FD\u6570\uFF0C\u7136\u540E\u4E3A\u5176\u6DFB\u52A0\u4E86 ",paraId:113,tocIndex:31},{value:"_.add",paraId:113,tocIndex:31},{value:"\u3001",paraId:113,tocIndex:31},{value:"_.keyBy",paraId:113,tocIndex:31},{value:" \u4EE5\u53CA\u5176\u5B83\u5C5E\u6027",paraId:113,tocIndex:31},{value:"\u5B9E\u9645\u4E0A\uFF0C\u5B83\u4EEC\u8FD9\u4E48\u505A\u662F\u4E3A\u4E86",paraId:114,tocIndex:31},{value:"\u51CF\u5C11\u5BF9\u5168\u5C40\u7A7A\u95F4\u7684\u6C61\u67D3",paraId:114,tocIndex:31},{value:"\uFF0C\u8FD9\u6837\u4E00\u4E2A\u5E93\u5C31\u53EA\u4F1A\u6709\u4E00\u4E2A\u5168\u5C40\u53D8\u91CF\u3002\u8FD9\u6837\u5C31\u964D\u4F4E\u4E86\u547D\u540D\u51B2\u7A81\u7684\u53EF\u80FD\u6027\u3002",paraId:114,tocIndex:31},{value:`// jQuery \u98CE\u683C\u7684\u547D\u540D\u7A7A\u95F4
function $(selector) {
  // \u4E3B\u51FD\u6570
  return document.querySelector(selector);
}

// \u6DFB\u52A0\u8F85\u52A9\u65B9\u6CD5
$.ajax = function (url) {
  // ajax \u5B9E\u73B0
};

$.each = function (arr, callback) {
  // each \u5B9E\u73B0
};

// \u4F7F\u7528
$('#app');
$.ajax('/api/data');
`,paraId:115,tocIndex:31},{value:"JavaScript \u91CC\u542C\u8BF4\u533A\u5206\u51FD\u6570\u548C\u65B9\u6CD5\uFF0C\u800C Java \u91CC\u53EA\u542C\u8BF4\u8FC7\u65B9\u6CD5\uFF0C\u5230\u5E95\u6709\u4EC0\u4E48\u533A\u522B\uFF1F",paraId:116,tocIndex:32},{value:"\u5728 JavaScript \u91CC\u51FD\u6570\u662F\u8EAB\u517C\u591A\u804C\u7684\uFF0C\u540C\u4E00\u4E2A\u51FD\u6570\u53EF\u4EE5\u540C\u65F6\u662F\u65B9\u6CD5\u548C\u6784\u9020\u5668\u3002\u89C4\u8303\u91CC\u6709\u5BF9\u51FD\u6570\u548C\u65B9\u6CD5\u4E0B\u8FC7\u5B9A\u4E49\uFF1A",paraId:117,tocIndex:32},{value:"\u5BF9\u8C61",paraId:118,tocIndex:32},{value:`\uFF1A\u4E00\u4E2A\u5BF9\u8C61\u5C31\u662F\u82E5\u5E72\u5C5E\u6027\u7684\u96C6\u5408\u3002
`,paraId:118,tocIndex:32},{value:"\u51FD\u6570",paraId:118,tocIndex:32},{value:`\uFF1A\u4E00\u4E2A\u51FD\u6570\u5C31\u662F\u4E00\u4E2A\u53EF\u8C03\u7528\u7684\u5BF9\u8C61\u3002
`,paraId:118,tocIndex:32},{value:"\u65B9\u6CD5",paraId:118,tocIndex:32},{value:"\uFF1A\u6302\u5728\u5BF9\u8C61\u5C5E\u6027\u4E0A\u7684\u51FD\u6570\u5C31\u53EB\u65B9\u6CD5\u3002",paraId:118,tocIndex:32},{value:"\u5BF9\u8C61 > \u51FD\u6570 > \u65B9\u6CD5",paraId:119,tocIndex:32},{value:"\uFF0C\u4ED6\u4EEC\u662F\u5305\u542B\u5173\u7CFB\u3002",paraId:119,tocIndex:32},{value:"\u5B9E\u9645\u4E0A\u6CA1\u6709\u4EBA\u5728\u610F\u8FD9\u4E24\u8005\u7684\u5173\u7CFB\uFF0C\u8FD9\u4E24\u4E2A\u672F\u8BED\u7ECF\u5E38\u662F\u6DF7\u7528\u7684\u3002",paraId:120,tocIndex:32},{value:'\u4ECE ES6 \u5F00\u59CB\uFF0C\u8FD8\u6709\u4E00\u4E2A\u65B0\u7684\u3001\u4ECE\u9759\u6001\u8BED\u4E49\u4E0A\u5B9A\u4E49\u7684 "\u65B9\u6CD5"\uFF0C\u53EB ',paraId:121,tocIndex:33},{value:"MethodDefinition",paraId:121,tocIndex:33},{value:"\u3002",paraId:121,tocIndex:33},{value:"\u8FD9\u4E9B\u662F\u65B9\u6CD5\uFF1A",paraId:122,tocIndex:33},{value:`const obj = {
  foo() {}, // \u65B9\u6CD5
  *bar() {}, // Generator \u65B9\u6CD5
  async baz() {}, // \u5F02\u6B65\u65B9\u6CD5
};
`,paraId:123,tocIndex:33},{value:"\u8FD9\u4E9B\u4E0D\u662F\u65B9\u6CD5\uFF1A",paraId:124,tocIndex:33},{value:`const obj = {
  foo: function () {}, // \u51FD\u6570\u8868\u8FBE\u5F0F
  bar: function* () {}, // Generator \u51FD\u6570\u8868\u8FBE\u5F0F
  baz: async function () {}, // \u5F02\u6B65\u51FD\u6570\u8868\u8FBE\u5F0F
};
`,paraId:125,tocIndex:33},{value:"\u533A\u522B\uFF1A",paraId:126,tocIndex:33},{value:"MethodDefinition",paraId:127,tocIndex:33},{value:" \u5B9A\u4E49\u7684\u65B9\u6CD5\u6709 ",paraId:127,tocIndex:33},{value:"[[HomeObject]]",paraId:127,tocIndex:33},{value:" \u5185\u90E8\u5C5E\u6027\uFF0C\u53EF\u4EE5\u4F7F\u7528 ",paraId:127,tocIndex:33},{value:"super",paraId:127,tocIndex:33},{value:" \u5173\u952E\u5B57\uFF1A",paraId:127,tocIndex:33},{value:`const parent = {
  greet() {
    return 'Hello';
  },
};

// \u6B63\u786E\uFF1A\u4F7F\u7528 MethodDefinition
const child1 = {
  __proto__: parent,
  greet() {
    return super.greet() + ', World!'; // \u53EF\u4EE5\u4F7F\u7528 super
  },
};

console.log(child1.greet()); // 'Hello, World!'

// \u9519\u8BEF\uFF1A\u4F7F\u7528\u51FD\u6570\u8868\u8FBE\u5F0F
const child2 = {
  __proto__: parent,
  greet: function () {
    // return super.greet() + ', World!'; // SyntaxError: 'super' keyword unexpected here
  },
};
`,paraId:128,tocIndex:33},{value:"\u4E0B\u5217\u4EE3\u7801\u4E3A\u4EC0\u4E48\u4F1A\u4EA7\u751F 'super' keyword unexpected here \u7684\u9519\u8BEF\uFF1F",paraId:129,tocIndex:33},{value:"\u73B0\u4EE3\u6D4F\u89C8\u5668\u751F\u6210\u4E00\u4E2A JS \u51FD\u6570\u7684\u5F00\u9500\u591A\u5927\uFF1F",paraId:130,tocIndex:35},{value:"\u5982\u4F55\u4ECE\u5F15\u64CE\u89D2\u5EA6\u6B63\u786E\u7406\u89E3 JavaScript \u95ED\u5305\uFF1F",paraId:130,tocIndex:35},{value:"\u5173\u4E8E\u95ED\u5305\u7684\u5E94\u7528\u5B9E\u4F8B\uFF0C\u8FD9\u79CD\u63CF\u8FF0\u4E0E\u547D\u540D\u662F\u5426\u66F4\u52A0\u8D34\u5207\uFF1F",paraId:130,tocIndex:35},{value:"ES6 \u53C2\u6570\u4F5C\u7528\u57DF\u548C\u51FD\u6570\u4F53\u4F5C\u7528\u57DF\u662F\u4EC0\u4E48\u5173\u7CFB\uFF1F",paraId:130,tocIndex:35},{value:"\u4E3A\u4EC0\u4E48\u7BAD\u5934\u51FD\u6570\u53EF\u4EE5\u88AB bind\uFF1F",paraId:130,tocIndex:35},{value:"JavaScript \u91CC\u542C\u8BF4\u533A\u5206\u51FD\u6570\u548C\u65B9\u6CD5\uFF0C\u800C Java \u91CC\u53EA\u542C\u8BF4\u8FC7\u65B9\u6CD5\uFF0C\u5230\u5E95\u6709\u4EC0\u4E48\u533A\u522B\uFF1F",paraId:130,tocIndex:35},{value:"JavaScript \u91CC Function \u4E5F\u662F\u5BF9\u8C61\uFF1F",paraId:130,tocIndex:35},{value:"\u907F\u514D\u5728\u5FAA\u73AF\u4E2D\u521B\u5EFA\u51FD\u6570",paraId:131,tocIndex:36},{value:"\uFF08\u9664\u975E\u5FC5\u8981\uFF09",paraId:131,tocIndex:36},{value:"\u8003\u8651\u4F7F\u7528\u51FD\u6570\u58F0\u660E\u800C\u975E\u51FD\u6570\u8868\u8FBE\u5F0F",paraId:131,tocIndex:36},{value:"\uFF08\u63D0\u5347\u6027\u80FD\uFF09",paraId:131,tocIndex:36},{value:"\u8C28\u614E\u4F7F\u7528\u9012\u5F52",paraId:131,tocIndex:36},{value:"\uFF08\u6CE8\u610F\u6808\u6EA2\u51FA\uFF09",paraId:131,tocIndex:36},{value:"\u5229\u7528\u7F13\u5B58\u907F\u514D\u91CD\u590D\u8BA1\u7B97",paraId:131,tocIndex:36},{value:"\uFF08memoization\uFF09",paraId:131,tocIndex:36},{value:"\u73B0\u4EE3\u5F15\u64CE\u5BF9\u7BAD\u5934\u51FD\u6570\u4F18\u5316\u5F88\u597D",paraId:131,tocIndex:36},{value:"\uFF0C\u53EF\u4EE5\u653E\u5FC3\u4F7F\u7528",paraId:131,tocIndex:36},{value:"\u4F18\u5148\u4F7F\u7528 ",paraId:132,tocIndex:37},{value:"const",paraId:132,tocIndex:37},{value:" \u5B9A\u4E49\u51FD\u6570\u8868\u8FBE\u5F0F",paraId:132,tocIndex:37},{value:"\u4F7F\u7528\u7BAD\u5934\u51FD\u6570\u7B80\u5316\u4EE3\u7801",paraId:132,tocIndex:37},{value:"\uFF08\u4F46\u6CE8\u610F ",paraId:132,tocIndex:37},{value:"this",paraId:132,tocIndex:37},{value:" \u7684\u533A\u522B\uFF09",paraId:132,tocIndex:37},{value:"\u4F7F\u7528\u9ED8\u8BA4\u53C2\u6570\u4EE3\u66FF\u53C2\u6570\u68C0\u67E5",paraId:132,tocIndex:37},{value:"\u4F7F\u7528\u5269\u4F59\u53C2\u6570\u4EE3\u66FF ",paraId:132,tocIndex:37},{value:"arguments",paraId:132,tocIndex:37},{value:"\u51FD\u6570\u5E94\u8BE5\u53EA\u505A\u4E00\u4EF6\u4E8B",paraId:132,tocIndex:37},{value:"\uFF08\u5355\u4E00\u804C\u8D23\u539F\u5219\uFF09",paraId:132,tocIndex:37},{value:"\u907F\u514D\u526F\u4F5C\u7528",paraId:132,tocIndex:37},{value:"\uFF0C\u4F18\u5148\u7F16\u5199\u7EAF\u51FD\u6570",paraId:132,tocIndex:37},{value:"\u7ED9\u51FD\u6570\u8D77\u6709\u610F\u4E49\u7684\u540D\u5B57",paraId:132,tocIndex:37},{value:"\u4FDD\u6301\u51FD\u6570\u53C2\u6570\u6570\u91CF\u5408\u7406",paraId:132,tocIndex:37},{value:"\uFF08\u5EFA\u8BAE\u4E0D\u8D85\u8FC7 3-4 \u4E2A\uFF09",paraId:132,tocIndex:37}]}}]);
