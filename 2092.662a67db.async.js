"use strict";(self.webpackChunk_c6i_playground=self.webpackChunk_c6i_playground||[]).push([[2092],{42092:function(t,n,e){e.r(n),e.d(n,{texts:function(){return a}});const a=[{value:"\u672C\u6587\u6863\u6C47\u603B\u4E86 ES2016 \u81F3\u4ECA\u7684 JavaScript \u65B0\u7279\u6027\uFF0C\u5305\u62EC\u4EE3\u7801\u793A\u4F8B\u548C\u5B9E\u7528\u573A\u666F\u8BF4\u660E\u3002",paraId:0,tocIndex:0},{value:"\u68C0\u67E5\u6570\u7EC4\u662F\u5426\u5305\u542B\u67D0\u4E2A\u5143\u7D20\uFF0C\u8FD4\u56DE\u5E03\u5C14\u503C\u3002",paraId:1,tocIndex:2},{value:`const arr = [1, 2, 3, NaN];
arr.includes(2); // true
arr.includes(4); // false
arr.includes(NaN); // true (\u76F8\u6BD4 indexOf \u7684\u4F18\u52BF)

// \u53EF\u6307\u5B9A\u8D77\u59CB\u7D22\u5F15
arr.includes(2, 2); // false
`,paraId:2,tocIndex:2},{value:"\u4F18\u52BF",paraId:3,tocIndex:2},{value:": \u6BD4 ",paraId:3,tocIndex:2},{value:"indexOf",paraId:3,tocIndex:2},{value:" \u66F4\u8BED\u4E49\u5316\uFF0C\u4E14\u80FD\u6B63\u786E\u5224\u65AD ",paraId:3,tocIndex:2},{value:"NaN",paraId:3,tocIndex:2},{value:"\u3002",paraId:3,tocIndex:2},{value:"\u53F3\u7ED3\u5408\u7684\u5E42\u8FD0\u7B97\u7B26\uFF0C\u66FF\u4EE3 ",paraId:4,tocIndex:3},{value:"Math.pow()",paraId:4,tocIndex:3},{value:"\u3002",paraId:4,tocIndex:3},{value:`2 ** 3; // 8
2 ** 3 ** 2; // 512 (\u76F8\u5F53\u4E8E 2 ** (3 ** 2))

let a = 2;
a **= 3; // a = 8
`,paraId:5,tocIndex:3},{value:"\u83B7\u53D6\u5BF9\u8C61\u7684\u503C\u6570\u7EC4\u6216\u952E\u503C\u5BF9\u6570\u7EC4\u3002",paraId:6,tocIndex:5},{value:`const obj = { a: 1, b: 2, c: 3 };

Object.values(obj); // [1, 2, 3]
Object.entries(obj); // [['a', 1], ['b', 2], ['c', 3]]

// \u5E38\u7528\u4E8E\u904D\u5386\u5BF9\u8C61
Object.entries(obj).forEach(([key, value]) => {
  console.log(\`\${key}: \${value}\`);
});

// \u8F6C\u6362\u4E3A Map
const map = new Map(Object.entries(obj));
`,paraId:7,tocIndex:5},{value:"\u5B57\u7B26\u4E32\u586B\u5145\u65B9\u6CD5\uFF0C\u7528\u4E8E\u5BF9\u9F50\u6587\u672C\u3002",paraId:8,tocIndex:6},{value:`'5'.padStart(3, '0'); // "005"
'hello'.padEnd(10, '.'); // "hello....."

// \u5B9E\u7528\u573A\u666F\uFF1A\u683C\u5F0F\u5316\u65F6\u95F4
const minutes = '5';
const seconds = '3';
\`\${minutes.padStart(2, '0')}:\${seconds.padStart(2, '0')}\`; // "05:03"
`,paraId:9,tocIndex:6},{value:"\u57FA\u4E8E Promise \u7684\u5F02\u6B65\u7F16\u7A0B\u8BED\u6CD5\u7CD6\u3002",paraId:10,tocIndex:7},{value:`async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

// \u5E76\u884C\u6267\u884C
async function parallel() {
  const [result1, result2] = await Promise.all([
    fetch('/api/1'),
    fetch('/api/2'),
  ]);
}
`,paraId:11,tocIndex:7},{value:"\u83B7\u53D6\u5BF9\u8C61\u6240\u6709\u81EA\u6709\u5C5E\u6027\u7684\u63CF\u8FF0\u7B26\u3002",paraId:12,tocIndex:8},{value:`const obj = {
  name: 'Tom',
  get age() {
    return 18;
  },
};

Object.getOwnPropertyDescriptors(obj);
// {
//   name: { value: 'Tom', writable: true, enumerable: true, configurable: true },
//   age: { get: [Function: get age], set: undefined, enumerable: true, configurable: true }
// }

// \u5B9E\u7528\u573A\u666F\uFF1A\u6D45\u62F7\u8D1D\u5305\u542B getter/setter \u7684\u5BF9\u8C61
const clone = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj),
);
`,paraId:13,tocIndex:8},{value:"\u5141\u8BB8\u5728\u51FD\u6570\u53C2\u6570\u3001\u8C03\u7528\u65F6\u4F7F\u7528\u5C3E\u9017\u53F7\u3002",paraId:14,tocIndex:9},{value:`function foo(
  param1,
  param2,
  param3, // \u5C3E\u9017\u53F7
) {}

foo(1, 2, 3); // \u8C03\u7528\u65F6\u4E5F\u53EF\u4EE5
`,paraId:15,tocIndex:9},{value:"\u7528\u4E8E\u591A\u7EBF\u7A0B\u95F4\u5171\u4EAB\u5185\u5B58\uFF08Web Workers\uFF09\u3002",paraId:16,tocIndex:10},{value:"\u7528\u4E8E\u904D\u5386\u5F02\u6B65\u53EF\u8FED\u4EE3\u5BF9\u8C61\u3002",paraId:17,tocIndex:12},{value:`async function* asyncGenerator() {
  yield await Promise.resolve(1);
  yield await Promise.resolve(2);
  yield await Promise.resolve(3);
}

(async () => {
  for await (const num of asyncGenerator()) {
    console.log(num); // 1, 2, 3
  }
})();

// \u5B9E\u7528\u573A\u666F\uFF1A\u5904\u7406\u5F02\u6B65\u6570\u636E\u6D41
async function processStream(stream) {
  for await (const chunk of stream) {
    console.log(chunk);
  }
}
`,paraId:18,tocIndex:12},{value:"\u65E0\u8BBA Promise \u6210\u529F\u6216\u5931\u8D25\u90FD\u4F1A\u6267\u884C\u7684\u56DE\u8C03\u3002",paraId:19,tocIndex:13},{value:`fetch('/api/data')
  .then((response) => response.json())
  .catch((error) => console.error(error))
  .finally(() => {
    // \u603B\u662F\u6267\u884C\uFF0C\u5E38\u7528\u4E8E\u6E05\u7406\u64CD\u4F5C
    hideLoadingSpinner();
  });
`,paraId:20,tocIndex:13},{value:"\u547D\u540D\u6355\u83B7\u7EC4",paraId:21,tocIndex:14},{value:": ",paraId:21,tocIndex:14},{value:"(?<name>...)",paraId:21,tocIndex:14},{value:"\u540E\u884C\u65AD\u8A00",paraId:21,tocIndex:14},{value:": ",paraId:21,tocIndex:14},{value:"(?<=...)",paraId:21,tocIndex:14},{value:" \u548C ",paraId:21,tocIndex:14},{value:"(?<!...)",paraId:21,tocIndex:14},{value:"dotAll \u6A21\u5F0F",paraId:21,tocIndex:14},{value:": ",paraId:21,tocIndex:14},{value:"s",paraId:21,tocIndex:14},{value:" \u6807\u5FD7\u8BA9 ",paraId:21,tocIndex:14},{value:".",paraId:21,tocIndex:14},{value:" \u5339\u914D\u6362\u884C\u7B26",paraId:21,tocIndex:14},{value:"Unicode \u5C5E\u6027\u8F6C\u4E49",paraId:21,tocIndex:14},{value:": ",paraId:21,tocIndex:14},{value:"\\p{...}",paraId:21,tocIndex:14},{value:`// \u547D\u540D\u6355\u83B7\u7EC4
const re = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/;
const match = re.exec('2024-01-15');
match.groups; // { year: '2024', month: '01', day: '15' }

// \u540E\u884C\u65AD\u8A00
/(?<=\\$)\\d+/.exec('$100'); // ["100"]
/(?<!\\$)\\d+/.exec('100'); // ["100"]

// dotAll \u6A21\u5F0F
/hello.world/s.test('hello\\nworld'); // true

// Unicode \u5C5E\u6027
/^\\p{Script=Greek}+$/u.test('\u03BC\u03B5\u03C4\u03AC'); // true
`,paraId:22,tocIndex:14},{value:`// Rest
const { a, b, ...rest } = { a: 1, b: 2, c: 3, d: 4 };
rest; // { c: 3, d: 4 }

// Spread
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }

// \u6D45\u62F7\u8D1D
const clone = { ...obj1 };

// \u5408\u5E76\u5BF9\u8C61
const merged = { ...obj1, ...obj2 };
`,paraId:23,tocIndex:15},{value:"\u6570\u7EC4\u6241\u5E73\u5316\u65B9\u6CD5\u3002",paraId:24,tocIndex:17},{value:`// flat - \u6241\u5E73\u5316\u6570\u7EC4
[1, 2, [3, 4]].flat(); // [1, 2, 3, 4]
[1, [2, [3, [4]]]].flat(2); // [1, 2, 3, [4]]
[1, [2, [3, [4]]]].flat(Infinity); // [1, 2, 3, 4]

// flatMap - \u6620\u5C04\u540E\u6241\u5E73\u5316
[1, 2, 3].flatMap((x) => [x, x * 2]); // [1, 2, 2, 4, 3, 6]

// \u5B9E\u7528\u573A\u666F\uFF1A\u5904\u7406\u5D4C\u5957\u6570\u636E
const sentences = ['Hello world', 'How are you'];
sentences.flatMap((s) => s.split(' ')); // ['Hello', 'world', 'How', 'are', 'you']
`,paraId:25,tocIndex:17},{value:"\u5C06\u952E\u503C\u5BF9\u6570\u7EC4\u8F6C\u6362\u4E3A\u5BF9\u8C61\uFF0C\u662F ",paraId:26,tocIndex:18},{value:"Object.entries()",paraId:26,tocIndex:18},{value:" \u7684\u9006\u64CD\u4F5C\u3002",paraId:26,tocIndex:18},{value:`const entries = [
  ['name', 'Tom'],
  ['age', 18],
];
Object.fromEntries(entries); // { name: 'Tom', age: 18 }

// \u5B9E\u7528\u573A\u666F\uFF1A\u8FC7\u6EE4\u5BF9\u8C61\u5C5E\u6027
const obj = { a: 1, b: 2, c: 3 };
const filtered = Object.fromEntries(
  Object.entries(obj).filter(([key, value]) => value > 1),
);
// { b: 2, c: 3 }

// URL \u53C2\u6570\u8F6C\u5BF9\u8C61
const params = new URLSearchParams('name=Tom&age=18');
Object.fromEntries(params); // { name: 'Tom', age: '18' }
`,paraId:27,tocIndex:18},{value:"\u66F4\u8BED\u4E49\u5316\u7684\u5B57\u7B26\u4E32\u4FEE\u526A\u65B9\u6CD5\uFF08\u522B\u540D\uFF1A",paraId:28,tocIndex:19},{value:"trimLeft",paraId:28,tocIndex:19},{value:"/",paraId:28,tocIndex:19},{value:"trimRight",paraId:28,tocIndex:19},{value:"\uFF09\u3002",paraId:28,tocIndex:19},{value:`'  hello  '.trimStart(); // "hello  "
'  hello  '.trimEnd(); // "  hello"
`,paraId:29,tocIndex:19},{value:"\u83B7\u53D6 Symbol \u7684\u63CF\u8FF0\u5B57\u7B26\u4E32\u3002",paraId:30,tocIndex:20},{value:`const sym = Symbol('my symbol');
sym.description; // "my symbol"
`,paraId:31,tocIndex:20},{value:"catch \u5757\u53EF\u4EE5\u7701\u7565\u9519\u8BEF\u53C2\u6570\u3002",paraId:32,tocIndex:21},{value:`try {
  JSON.parse(invalidJSON);
} catch {
  // \u4E0D\u9700\u8981\u9519\u8BEF\u53C2\u6570\u65F6\u53EF\u7701\u7565
  console.log('\u89E3\u6790\u5931\u8D25');
}
`,paraId:33,tocIndex:21},{value:"\u8FD4\u56DE\u7CBE\u786E\u7684\u6E90\u4EE3\u7801\u5B57\u7B26\u4E32\uFF0C\u5305\u62EC\u7A7A\u683C\u548C\u6CE8\u91CA\u3002",paraId:34,tocIndex:22},{value:`function /* comment */ foo() {}
foo.toString(); // "function /* comment */ foo() {}"
`,paraId:35,tocIndex:22},{value:"\u5B89\u5168\u8BBF\u95EE\u5D4C\u5957\u5C5E\u6027\uFF0C\u907F\u514D ",paraId:36,tocIndex:24},{value:"undefined",paraId:36,tocIndex:24},{value:" \u9519\u8BEF\u3002",paraId:36,tocIndex:24},{value:`const user = {
  name: 'Tom',
  address: {
    city: 'Beijing',
  },
};

// \u4F20\u7EDF\u65B9\u5F0F
const zip = user && user.address && user.address.zipCode;

// \u53EF\u9009\u94FE
const zip = user?.address?.zipCode; // undefined

// \u7528\u4E8E\u65B9\u6CD5\u8C03\u7528
obj.method?.();

// \u7528\u4E8E\u6570\u7EC4
arr?.[0];

// \u5B9E\u7528\u573A\u666F\uFF1AAPI \u54CD\u5E94\u5904\u7406
const city = response?.data?.user?.address?.city;
`,paraId:37,tocIndex:24},{value:"\u5F53\u5DE6\u4FA7\u4E3A ",paraId:38,tocIndex:25},{value:"null",paraId:38,tocIndex:25},{value:" \u6216 ",paraId:38,tocIndex:25},{value:"undefined",paraId:38,tocIndex:25},{value:" \u65F6\u8FD4\u56DE\u53F3\u4FA7\u503C\u3002",paraId:38,tocIndex:25},{value:`const value = null ?? 'default'; // "default"
const value = 0 ?? 'default'; // 0 (\u4E0E || \u7684\u533A\u522B)
const value = '' ?? 'default'; // "" (\u4E0E || \u7684\u533A\u522B)

// \u5B9E\u7528\u573A\u666F\uFF1A\u8BBE\u7F6E\u9ED8\u8BA4\u503C
const port = process.env.PORT ?? 3000;
const count = data.count ?? 0;

// \u53EF\u4E0E\u53EF\u9009\u94FE\u7ED3\u5408
const name = user?.name ?? 'Anonymous';
`,paraId:39,tocIndex:25},{value:"\u4EFB\u610F\u7CBE\u5EA6\u7684\u6574\u6570\u7C7B\u578B\u3002",paraId:40,tocIndex:26},{value:`// \u521B\u5EFA BigInt
const big1 = 1234567890123456789012345678901234567890n;
const big2 = BigInt('1234567890123456789012345678901234567890');

// \u8FD0\u7B97
const sum = 1n + 2n; // 3n
const product = 2n * 3n; // 6n

// \u6CE8\u610F\uFF1A\u4E0D\u80FD\u4E0E Number \u6DF7\u7528
1n + 1; // TypeError
1n + BigInt(1); // 2n

// \u5B9E\u7528\u573A\u666F\uFF1A\u5904\u7406\u5927\u6574\u6570
const maxSafeInteger = BigInt(Number.MAX_SAFE_INTEGER);
`,paraId:41,tocIndex:26},{value:"\u7B49\u5F85\u6240\u6709 Promise \u5B8C\u6210\uFF08\u65E0\u8BBA\u6210\u529F\u6216\u5931\u8D25\uFF09\u3002",paraId:42,tocIndex:27},{value:`const promises = [
  Promise.resolve(1),
  Promise.reject('error'),
  Promise.resolve(3),
];

Promise.allSettled(promises).then((results) => {
  results.forEach((result) => {
    if (result.status === 'fulfilled') {
      console.log('\u6210\u529F:', result.value);
    } else {
      console.log('\u5931\u8D25:', result.reason);
    }
  });
});
// [
//   { status: 'fulfilled', value: 1 },
//   { status: 'rejected', reason: 'error' },
//   { status: 'fulfilled', value: 3 }
// ]
`,paraId:43,tocIndex:27},{value:"\u7EDF\u4E00\u7684\u5168\u5C40\u5BF9\u8C61\u8BBF\u95EE\u65B9\u5F0F\u3002",paraId:44,tocIndex:28},{value:`// \u6D4F\u89C8\u5668\u73AF\u5883: window
// Node.js: global
// Web Workers: self

// \u7EDF\u4E00\u4F7F\u7528
globalThis.setTimeout === setTimeout; // true
`,paraId:45,tocIndex:28},{value:"\u8FD4\u56DE\u6240\u6709\u5339\u914D\u7ED3\u679C\u7684\u8FED\u4EE3\u5668\u3002",paraId:46,tocIndex:29},{value:`const str = 'test1test2test3';
const regex = /test(\\d)/g;

for (const match of str.matchAll(regex)) {
  console.log(match[0], match[1]);
}
// "test1" "1"
// "test2" "2"
// "test3" "3"

// \u8F6C\u6362\u4E3A\u6570\u7EC4
const matches = [...str.matchAll(regex)];
`,paraId:47,tocIndex:29},{value:"\u6309\u9700\u52A0\u8F7D\u6A21\u5757\u3002",paraId:48,tocIndex:30},{value:`// \u52A8\u6001\u5BFC\u5165
const module = await import('./module.js');

// \u6761\u4EF6\u5BFC\u5165
if (condition) {
  const { feature } = await import('./feature.js');
  feature();
}

// \u5B9E\u7528\u573A\u666F\uFF1A\u4EE3\u7801\u5206\u5272
button.addEventListener('click', async () => {
  const { default: Chart } = await import('./chart.js');
  new Chart();
});
`,paraId:49,tocIndex:30},{value:"\u6A21\u5757\u7684\u5143\u4FE1\u606F\u3002",paraId:50,tocIndex:31},{value:`// \u5F53\u524D\u6A21\u5757\u7684 URL
console.log(import.meta.url);

// Vite \u4E2D\u7684\u73AF\u5883\u53D8\u91CF
console.log(import.meta.env.VITE_API_URL);
`,paraId:51,tocIndex:31},{value:"\u66FF\u6362\u6240\u6709\u5339\u914D\u9879\u3002",paraId:52,tocIndex:33},{value:`// \u4F20\u7EDF\u65B9\u5F0F
'aabbcc'.replace(/a/g, 'x'); // "xxbbcc"

// replaceAll
'aabbcc'.replaceAll('a', 'x'); // "xxbbcc"

// \u652F\u6301\u6B63\u5219
'aabbcc'.replaceAll(/a/g, 'x'); // "xxbbcc"
`,paraId:53,tocIndex:33},{value:"\u8FD4\u56DE\u7B2C\u4E00\u4E2A\u6210\u529F\u7684 Promise\u3002",paraId:54,tocIndex:34},{value:`const promises = [
  Promise.reject('error1'),
  Promise.resolve('success'),
  Promise.resolve('success2'),
];

Promise.any(promises).then(console.log); // "success"

// \u5168\u90E8\u5931\u8D25\u65F6\u629B\u51FA AggregateError
Promise.any([Promise.reject(1), Promise.reject(2)]).catch((error) => {
  console.log(error.errors); // [1, 2]
});
`,paraId:55,tocIndex:34},{value:"\u7EC4\u5408\u903B\u8F91\u8FD0\u7B97\u7B26\u548C\u8D4B\u503C\u3002",paraId:56,tocIndex:35},{value:`// \u903B\u8F91\u6216\u8D4B\u503C (||=)
x ||= y; // \u7B49\u4EF7\u4E8E x || (x = y)

// \u903B\u8F91\u4E0E\u8D4B\u503C (&&=)
x &&= y; // \u7B49\u4EF7\u4E8E x && (x = y)

// \u7A7A\u503C\u5408\u5E76\u8D4B\u503C (??=)
x ??= y; // \u7B49\u4EF7\u4E8E x ?? (x = y)

// \u5B9E\u7528\u573A\u666F
const config = {};
config.port ??= 3000; // \u4EC5\u5728 undefined/null \u65F6\u8D4B\u503C
`,paraId:57,tocIndex:35},{value:"\u63D0\u9AD8\u5927\u6570\u5B57\u7684\u53EF\u8BFB\u6027\u3002",paraId:58,tocIndex:36},{value:`const billion = 1_000_000_000;
const bytes = 0b1010_0001_1000_0101;
const hex = 0x1a_2b_3c_4d;

console.log(billion); // 1000000000
`,paraId:59,tocIndex:36},{value:"\u5F31\u5F15\u7528\u548C\u6E05\u7406\u56DE\u8C03\uFF0C\u7528\u4E8E\u9AD8\u7EA7\u5185\u5B58\u7BA1\u7406\u3002",paraId:60,tocIndex:37},{value:`// \u5F31\u5F15\u7528
const target = { name: 'object' };
const weakRef = new WeakRef(target);

// \u83B7\u53D6\u5F15\u7528\u7684\u5BF9\u8C61\uFF08\u53EF\u80FD\u5DF2\u88AB\u56DE\u6536\uFF09
const obj = weakRef.deref();
if (obj) {
  console.log(obj.name);
}

// \u6E05\u7406\u56DE\u8C03
const registry = new FinalizationRegistry((value) => {
  console.log(\`\${value} \u88AB\u56DE\u6536\u4E86\`);
});

let obj = { name: 'test' };
registry.register(obj, 'obj');
`,paraId:61,tocIndex:37},{value:"\u5728\u7C7B\u4E2D\u76F4\u63A5\u58F0\u660E\u5B57\u6BB5\uFF0C\u5305\u62EC\u79C1\u6709\u5B57\u6BB5\u3002",paraId:62,tocIndex:39},{value:`class Counter {
  // \u516C\u5171\u5B57\u6BB5
  count = 0;

  // \u79C1\u6709\u5B57\u6BB5
  #privateCount = 0;

  // \u9759\u6001\u5B57\u6BB5
  static total = 0;

  // \u9759\u6001\u79C1\u6709\u5B57\u6BB5
  static #instances = 0;

  constructor() {
    Counter.#instances++;
  }

  increment() {
    this.#privateCount++;
    this.count++;
  }

  // \u79C1\u6709\u65B9\u6CD5
  #reset() {
    this.#privateCount = 0;
  }
}

const counter = new Counter();
counter.count; // 0
counter.#privateCount; // SyntaxError: \u79C1\u6709\u5B57\u6BB5\u4E0D\u53EF\u8BBF\u95EE
`,paraId:63,tocIndex:39},{value:"\u7528\u4E8E\u9759\u6001\u521D\u59CB\u5316\u903B\u8F91\u3002",paraId:64,tocIndex:40},{value:`class Database {
  static connection;

  static {
    // \u9759\u6001\u521D\u59CB\u5316\u5757
    this.connection = createConnection();
    console.log('\u6570\u636E\u5E93\u5DF2\u8FDE\u63A5');
  }
}
`,paraId:65,tocIndex:40},{value:"\u6A21\u5757\u9876\u5C42\u53EF\u4EE5\u4F7F\u7528 await\u3002",paraId:66,tocIndex:41},{value:`// module.js
const data = await fetch('/api/data');
export default data;

// \u6761\u4EF6\u5BFC\u5165
const locale = await getLocale();
const messages = await import(\`./i18n/\${locale}.js\`);
`,paraId:67,tocIndex:41},{value:"\u901A\u8FC7 ",paraId:68,tocIndex:42},{value:"d",paraId:68,tocIndex:42},{value:" \u6807\u5FD7\u83B7\u53D6\u5339\u914D\u4F4D\u7F6E\u3002",paraId:68,tocIndex:42},{value:`const str = 'hello world';
const regex = /world/d;
const match = regex.exec(str);

match.indices; // [[6, 11]]
match.indices[0]; // [6, 11] - 'world' \u7684\u8D77\u59CB\u548C\u7ED3\u675F\u4F4D\u7F6E
`,paraId:69,tocIndex:42},{value:"\u9519\u8BEF\u94FE\uFF0C\u8BB0\u5F55\u539F\u59CB\u9519\u8BEF\u3002",paraId:70,tocIndex:43},{value:`try {
  doSomething();
} catch (error) {
  throw new Error('\u64CD\u4F5C\u5931\u8D25', { cause: error });
}

// \u8BBF\u95EE\u539F\u59CB\u9519\u8BEF
try {
  // ...
} catch (error) {
  console.log(error.message); // "\u64CD\u4F5C\u5931\u8D25"
  console.log(error.cause); // \u539F\u59CB\u9519\u8BEF\u5BF9\u8C61
}
`,paraId:71,tocIndex:43},{value:"\u652F\u6301\u8D1F\u7D22\u5F15\u7684\u8BBF\u95EE\u65B9\u6CD5\u3002",paraId:72,tocIndex:44},{value:`const arr = [1, 2, 3, 4, 5];
arr.at(0); // 1
arr.at(-1); // 5 (\u6700\u540E\u4E00\u4E2A\u5143\u7D20)
arr.at(-2); // 4

const str = 'hello';
str.at(-1); // "o"

// \u76F8\u6BD4\u4F20\u7EDF\u65B9\u5F0F\u66F4\u7B80\u6D01
arr[arr.length - 1]; // \u4F20\u7EDF\u65B9\u5F0F
arr.at(-1); // \u65B0\u65B9\u5F0F
`,paraId:73,tocIndex:44},{value:"\u66F4\u5B89\u5168\u7684\u5C5E\u6027\u68C0\u67E5\u65B9\u6CD5\u3002",paraId:74,tocIndex:45},{value:`const obj = { name: 'Tom' };

// \u4F20\u7EDF\u65B9\u5F0F\u53EF\u80FD\u6709\u95EE\u9898
obj.hasOwnProperty('name'); // true
// \u4F46\u5982\u679C obj.hasOwnProperty \u88AB\u8986\u76D6\u5219\u4F1A\u51FA\u9519

// \u65B0\u65B9\u5F0F\u66F4\u5B89\u5168
Object.hasOwn(obj, 'name'); // true

// \u5BF9\u4E8E null \u539F\u578B\u5BF9\u8C61\u4E5F\u80FD\u5DE5\u4F5C
const nullProto = Object.create(null);
nullProto.name = 'Tom';
Object.hasOwn(nullProto, 'name'); // true
`,paraId:75,tocIndex:45},{value:"\u4ECE\u6570\u7EC4\u672B\u5C3E\u67E5\u627E\u5143\u7D20\u3002",paraId:76,tocIndex:47},{value:`const arr = [1, 2, 3, 4, 5, 4, 3, 2, 1];

arr.findLast((x) => x > 3); // 5 (\u4ECE\u540E\u5411\u524D\u7B2C\u4E00\u4E2A\u5927\u4E8E3\u7684)
arr.findLastIndex((x) => x > 3); // 4 (\u7D22\u5F15)

// \u5B9E\u7528\u573A\u666F\uFF1A\u67E5\u627E\u6700\u540E\u4E00\u6761\u7B26\u5408\u6761\u4EF6\u7684\u8BB0\u5F55
const logs = [
  { level: 'info', msg: 'start' },
  { level: 'error', msg: 'failed' },
  { level: 'info', msg: 'retry' },
];
const lastError = logs.findLast((log) => log.level === 'error');
`,paraId:77,tocIndex:47},{value:"\u4E0D\u53EF\u53D8\u7684\u6570\u7EC4\u65B9\u6CD5\uFF08\u8FD4\u56DE\u65B0\u6570\u7EC4\uFF09\u3002",paraId:78,tocIndex:48},{value:`const arr = [3, 1, 2];

// toSorted - \u4E0D\u6539\u53D8\u539F\u6570\u7EC4\u7684\u6392\u5E8F
const sorted = arr.toSorted(); // [1, 2, 3]
console.log(arr); // [3, 1, 2] \u539F\u6570\u7EC4\u4E0D\u53D8

// toReversed - \u4E0D\u6539\u53D8\u539F\u6570\u7EC4\u7684\u53CD\u8F6C
const reversed = arr.toReversed(); // [2, 1, 3]

// toSpliced - \u4E0D\u6539\u53D8\u539F\u6570\u7EC4\u7684\u62FC\u63A5
const spliced = arr.toSpliced(1, 1, 99); // [3, 99, 2]

// with - \u4E0D\u6539\u53D8\u539F\u6570\u7EC4\u7684\u66FF\u6362
const replaced = arr.with(1, 99); // [3, 99, 2]
`,paraId:79,tocIndex:48},{value:"\u4E0D\u6539\u53D8\u539F\u6570\u7EC4\u7684\u7D22\u5F15\u66FF\u6362\u3002",paraId:80,tocIndex:49},{value:`const arr = [1, 2, 3, 4];
const newArr = arr.with(2, 99); // [1, 2, 99, 4]
console.log(arr); // [1, 2, 3, 4] \u539F\u6570\u7EC4\u4E0D\u53D8

// \u652F\u6301\u8D1F\u7D22\u5F15
arr.with(-1, 99); // [1, 2, 3, 99]
`,paraId:81,tocIndex:49},{value:"\u5141\u8BB8\u5728\u5168\u5C40 Symbol \u6CE8\u518C\u8868\u4E2D\u67E5\u627E Symbol\u3002",paraId:82,tocIndex:50},{value:"\u652F\u6301 Unix Shebang\uFF0C\u7528\u4E8E\u811A\u672C\u6587\u4EF6\u3002",paraId:83,tocIndex:51},{value:`#!/usr/bin/env node

console.log('Hello from Node.js script');
`,paraId:84,tocIndex:51},{value:"\u6570\u7EC4\u5206\u7EC4\u65B9\u6CD5\u3002",paraId:85,tocIndex:53},{value:`const items = [
  { type: 'fruit', name: 'apple' },
  { type: 'vegetable', name: 'carrot' },
  { type: 'fruit', name: 'banana' },
  { type: 'vegetable', name: 'lettuce' },
];

// Object.groupBy - \u5206\u7EC4\u4E3A\u5BF9\u8C61
const grouped = Object.groupBy(items, (item) => item.type);
// {
//   fruit: [{ type: 'fruit', name: 'apple' }, { type: 'fruit', name: 'banana' }],
//   vegetable: [{ type: 'vegetable', name: 'carrot' }, { type: 'vegetable', name: 'lettuce' }]
// }

// Map.groupBy - \u5206\u7EC4\u4E3A Map
const groupedMap = Map.groupBy(items, (item) => item.type);
`,paraId:86,tocIndex:53},{value:"\u66F4\u65B9\u4FBF\u5730\u521B\u5EFA\u53EF\u5916\u90E8\u63A7\u5236\u7684 Promise\u3002",paraId:87,tocIndex:54},{value:`// \u4F20\u7EDF\u65B9\u5F0F
let resolve, reject;
const promise = new Promise((res, rej) => {
  resolve = res;
  reject = rej;
});

// \u65B0\u65B9\u5F0F
const { promise, resolve, reject } = Promise.withResolvers();

// \u5B9E\u7528\u573A\u666F\uFF1A\u5EF6\u8FDF\u89E3\u6790
class Queue {
  #resolvers = [];

  async dequeue() {
    const { promise, resolve } = Promise.withResolvers();
    this.#resolvers.push(resolve);
    return promise;
  }

  enqueue(value) {
    const resolve = this.#resolvers.shift();
    resolve?.(value);
  }
}
`,paraId:88,tocIndex:54},{value:`// ArrayBuffer.prototype.transfer()
const buffer = new ArrayBuffer(8);
const newBuffer = buffer.transfer(); // \u8F6C\u79FB\u6240\u6709\u6743

// ArrayBuffer.prototype.resize()
const resizable = new ArrayBuffer(8, { maxByteLength: 16 });
resizable.resize(12);
`,paraId:89,tocIndex:55},{value:"\u589E\u5F3A\u7684 Unicode \u652F\u6301\u3002",paraId:90,tocIndex:56},{value:`// \u652F\u6301 Unicode \u5C5E\u6027\u96C6\u5408
/[\\p{Script=Greek}&&\\p{Letter}]/v.test('\u03B1'); // true

// \u5B57\u7B26\u4E32\u5B57\u9762\u91CF\u5339\u914D
/\\p{RGI_Emoji}/v.test('\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}'); // true
`,paraId:91,tocIndex:56},{value:"\u7C7B\u548C\u7C7B\u6210\u5458\u7684\u5143\u7F16\u7A0B\u3002",paraId:92,tocIndex:58},{value:`// \u7C7B\u88C5\u9970\u5668
function logged(target) {
  return class extends target {
    constructor(...args) {
      console.log(\`Creating instance of \${target.name}\`);
      super(...args);
    }
  };
}

@logged
class MyClass {}

// \u65B9\u6CD5\u88C5\u9970\u5668
function measure(target, context) {
  return function (...args) {
    const start = performance.now();
    const result = target.call(this, ...args);
    const end = performance.now();
    console.log(\`\${context.name} took \${end - start}ms\`);
    return result;
  };
}

class Service {
  @measure
  fetchData() {
    // ...
  }
}
`,paraId:93,tocIndex:58},{value:"\u4E0D\u53EF\u53D8\u7684\u6570\u636E\u7ED3\u6784\u3002",paraId:94,tocIndex:59},{value:`// Record - \u4E0D\u53EF\u53D8\u5BF9\u8C61
const record = #{a: 1, b: 2};

// Tuple - \u4E0D\u53EF\u53D8\u6570\u7EC4
const tuple = #[1, 2, 3];

// \u6DF1\u5EA6\u4E0D\u53EF\u53D8
const nested = #{
  data: #[1, 2, 3],
  metadata: #{id: 1}
};
`,paraId:95,tocIndex:59},{value:"\u73B0\u4EE3\u5316\u7684\u65E5\u671F\u65F6\u95F4 API\uFF0C\u66FF\u4EE3 Date\u3002",paraId:96,tocIndex:60},{value:`// Temporal.PlainDate
const date = Temporal.PlainDate.from('2024-01-15');
date.year; // 2024
date.month; // 1
date.day; // 15

// Temporal.PlainTime
const time = Temporal.PlainTime.from('13:30:00');

// Temporal.ZonedDateTime
const zoned = Temporal.ZonedDateTime.from('2024-01-15T13:30:00+08:00[Asia/Shanghai]');

// \u65E5\u671F\u8BA1\u7B97
const nextWeek = date.add({ days: 7 });
const diff = date.until(nextWeek).days; // 7
`,paraId:97,tocIndex:60},{value:"\u51FD\u6570\u94FE\u5F0F\u8C03\u7528\u7684\u8BED\u6CD5\u7CD6\u3002",paraId:98,tocIndex:61},{value:`// \u4F20\u7EDF\u65B9\u5F0F
const result = format(transform(parse(input)));

// Pipeline \u64CD\u4F5C\u7B26
const result = input |> parse(%) |> transform(%) |> format(%);

// \u5B9E\u7528\u573A\u666F
const total = [1, 2, 3, 4]
  |> (%.map(x => x * 2))
  |> (%.filter(x => x > 4))
  |> (%.reduce((a, b) => a + b, 0));
`,paraId:99,tocIndex:61},{value:"ES2019-ES2022 \u7279\u6027\u5927\u6C47\u603B",paraId:100,tocIndex:62},{value:"ES2023 \u65B0\u7279\u6027\u8BE6\u89E3",paraId:100,tocIndex:62},{value:"MDN JavaScript Reference",paraId:100,tocIndex:62},{value:"TC39 Proposals",paraId:100,tocIndex:62}]}}]);
