"use strict";(self.webpackChunk_c6i_playground=self.webpackChunk_c6i_playground||[]).push([[6055],{76055:function(l,n,o){o.r(n),o.d(n,{texts:function(){return e}});const e=[{value:"\u6240\u6709\u7684 ",paraId:0,tocIndex:2},{value:"falsy",paraId:0,tocIndex:2},{value:" \u503C\uFF08\u5047\u503C\uFF09\uFF1A",paraId:0,tocIndex:2},{value:`console.log(Boolean(undefined)); // false
console.log(Boolean(null)); // false
console.log(Boolean(+0)); // false
console.log(Boolean(-0)); // false
console.log(Boolean(NaN)); // false
console.log(Boolean('')); // false - \u7A7A\u5B57\u7B26\u4E32
console.log(Boolean(0n)); // false - BigInt \u96F6\u503C
`,paraId:1,tocIndex:2},{value:"\u9664\u4E86\u4EE5\u4E0A 7 \u4E2A\u5047\u503C\uFF0C\u5176\u4ED6\u6240\u6709\u503C\u90FD\u4F1A\u8F6C\u6362\u4E3A ",paraId:2,tocIndex:2},{value:"true",paraId:2,tocIndex:2},{value:"\uFF1A",paraId:2,tocIndex:2},{value:`console.log(Boolean('0')); // true - \u975E\u7A7A\u5B57\u7B26\u4E32
console.log(Boolean('false')); // true - \u975E\u7A7A\u5B57\u7B26\u4E32
console.log(Boolean([])); // true - \u7A7A\u6570\u7EC4\u4E5F\u662F\u771F\u503C
console.log(Boolean({})); // true - \u7A7A\u5BF9\u8C61\u4E5F\u662F\u771F\u503C
console.log(Boolean(function () {})); // true - \u51FD\u6570\u662F\u771F\u503C
`,paraId:3,tocIndex:2},{value:`// \u57FA\u672C\u7C7B\u578B\u8F6C\u6362
console.log(Number(undefined)); // NaN
console.log(Number(null)); // 0
console.log(Number(true)); // 1
console.log(Number(false)); // 0

// \u5B57\u7B26\u4E32\u8F6C\u6362
console.log(Number('')); // 0 - \u7A7A\u5B57\u7B26\u4E32\u8F6C\u4E3A 0
console.log(Number('123')); // 123
console.log(Number('123abc')); // NaN - \u5305\u542B\u975E\u6570\u5B57\u5B57\u7B26
console.log(Number('  123  ')); // 123 - \u4F1A\u53BB\u9664\u9996\u5C3E\u7A7A\u683C

// \u5BF9\u8C61/\u6570\u7EC4\u8F6C\u6362
console.log(Number([])); // 0 - \u7A7A\u6570\u7EC4
console.log(Number([5])); // 5 - \u5355\u5143\u7D20\u6570\u7EC4
console.log(Number([1, 2])); // NaN - \u591A\u5143\u7D20\u6570\u7EC4
console.log(Number({})); // NaN - \u5BF9\u8C61

// \u5176\u4ED6\u6570\u5B57\u8F6C\u6362\u65B9\u6CD5
console.log(parseInt('123abc')); // 123 - \u89E3\u6790\u5230\u7B2C\u4E00\u4E2A\u975E\u6570\u5B57\u5B57\u7B26
console.log(parseInt('abc123')); // NaN - \u9996\u5B57\u7B26\u5FC5\u987B\u662F\u6570\u5B57
console.log(parseFloat('3.14.15')); // 3.14 - \u89E3\u6790\u5230\u7B2C\u4E00\u4E2A\u65E0\u6548\u7684\u6D6E\u70B9\u6570\u5B57\u7B26
console.log(+'123'); // 123 - \u4E00\u5143\u52A0\u53F7\u8FD0\u7B97\u7B26
`,paraId:4,tocIndex:3},{value:`// \u57FA\u672C\u7C7B\u578B\u8F6C\u6362
console.log(String(undefined)); // "undefined"
console.log(String(null)); // "null"
console.log(String(true)); // "true"
console.log(String(123)); // "123"

// \u6570\u7EC4\u8F6C\u6362
console.log(String([])); // "" - \u7A7A\u5B57\u7B26\u4E32
console.log(String([1, 2, 3])); // "1,2,3"
console.log(String([1, [2, 3]])); // "1,2,3" - \u591A\u7EF4\u6570\u7EC4\u4F1A\u88AB\u5C55\u5E73

// \u5BF9\u8C61\u8F6C\u6362
console.log(String({})); // "[object Object]"
console.log(String({ name: 'foo' })); // "[object Object]"

// \u5176\u4ED6\u5B57\u7B26\u4E32\u8F6C\u6362\u65B9\u6CD5
console.log((123).toString()); // "123"
console.log((123).toString(2)); // "1111011" - \u8F6C\u4E3A\u4E8C\u8FDB\u5236\u5B57\u7B26\u4E32
console.log(\`\u503C\u662F \${123}\`); // "\u503C\u662F 123" - \u6A21\u677F\u5B57\u7B26\u4E32
`,paraId:5,tocIndex:4},{value:`// \u57FA\u672C\u7528\u6CD5
console.log(JSON.stringify({ name: 'foo', age: 18 })); // '{"name":"foo","age":18}'

// \u81EA\u5B9A\u4E49 toJSON \u65B9\u6CD5
const obj = {
  name: 'foo',
  age: 18,
  toJSON() {
    return 'hello world';
  },
};
console.log(JSON.stringify(obj)); // '"hello world"'

// \u8FC7\u6EE4\u548C\u683C\u5F0F\u5316
const data = { name: 'foo', age: 18, password: '123456' };
console.log(JSON.stringify(data, ['name', 'age'])); // '{"name":"foo","age":18}'
console.log(JSON.stringify(data, null, 2)); // \u683C\u5F0F\u5316\u8F93\u51FA\uFF0C\u7F29\u8FDB 2 \u4E2A\u7A7A\u683C
`,paraId:6,tocIndex:5},{value:"\u9690\u5F0F\u7C7B\u578B\u8F6C\u6362\u662F JavaScript \u5728\u8FD0\u7B97\u65F6\u81EA\u52A8\u8FDB\u884C\u7684\u7C7B\u578B\u8F6C\u6362\u3002",paraId:7,tocIndex:6},{value:`// \u52A0\u6CD5\u8FD0\u7B97\u7B26\uFF08+\uFF09
console.log(1 + '2'); // "12" - \u6570\u5B57\u8F6C\u4E3A\u5B57\u7B26\u4E32
console.log('1' + 2); // "12" - \u6570\u5B57\u8F6C\u4E3A\u5B57\u7B26\u4E32
console.log(true + 1); // 2 - \u5E03\u5C14\u503C\u8F6C\u4E3A\u6570\u5B57\uFF08true -> 1\uFF09
console.log(false + 1); // 1 - \u5E03\u5C14\u503C\u8F6C\u4E3A\u6570\u5B57\uFF08false -> 0\uFF09
console.log([] + []); // "" - \u6570\u7EC4\u8F6C\u4E3A\u7A7A\u5B57\u7B26\u4E32\uFF0C\u62FC\u63A5\u540E\u8FD8\u662F\u7A7A\u5B57\u7B26\u4E32
console.log([] + {}); // "[object Object]" - \u90FD\u8F6C\u4E3A\u5B57\u7B26\u4E32\u518D\u62FC\u63A5
console.log({} + []); // "[object Object]" - \u6CE8\u610F\uFF1A\u67D0\u4E9B\u73AF\u5883\u53EF\u80FD\u7ED3\u679C\u4E0D\u540C

// \u5176\u4ED6\u7B97\u672F\u8FD0\u7B97\u7B26\uFF08-\u3001*\u3001/\u3001%\uFF09
console.log('5' - 3); // 2 - \u5B57\u7B26\u4E32\u8F6C\u4E3A\u6570\u5B57
console.log('5' * 2); // 10 - \u5B57\u7B26\u4E32\u8F6C\u4E3A\u6570\u5B57
console.log('10' / 2); // 5 - \u5B57\u7B26\u4E32\u8F6C\u4E3A\u6570\u5B57
console.log('10' % 3); // 1 - \u5B57\u7B26\u4E32\u8F6C\u4E3A\u6570\u5B57
console.log('abc' - 1); // NaN - \u65E0\u6CD5\u8F6C\u6362\u4E3A\u6709\u6548\u6570\u5B57
`,paraId:8,tocIndex:7},{value:`// \u76F8\u7B49\u8FD0\u7B97\u7B26\uFF08==\uFF09\u4F1A\u8FDB\u884C\u7C7B\u578B\u8F6C\u6362
console.log(1 == '1'); // true - \u5B57\u7B26\u4E32\u8F6C\u4E3A\u6570\u5B57
console.log(true == 1); // true - \u5E03\u5C14\u503C\u8F6C\u4E3A\u6570\u5B57
console.log(false == 0); // true - \u5E03\u5C14\u503C\u8F6C\u4E3A\u6570\u5B57
console.log(null == undefined); // true - \u7279\u6B8A\u89C4\u5219
console.log('' == 0); // true - \u7A7A\u5B57\u7B26\u4E32\u8F6C\u4E3A\u6570\u5B57 0
console.log([] == 0); // true - \u7A7A\u6570\u7EC4\u8F6C\u4E3A\u5B57\u7B26\u4E32 "" \u518D\u8F6C\u4E3A\u6570\u5B57 0
console.log([] == ![]); // true - ![] \u4E3A false\uFF0C[] \u8F6C\u4E3A 0\uFF0Cfalse \u8F6C\u4E3A 0

// \u5168\u7B49\u8FD0\u7B97\u7B26\uFF08===\uFF09\u4E0D\u4F1A\u8FDB\u884C\u7C7B\u578B\u8F6C\u6362
console.log(1 === '1'); // false - \u7C7B\u578B\u4E0D\u540C
console.log(true === 1); // false - \u7C7B\u578B\u4E0D\u540C

// \u5173\u7CFB\u8FD0\u7B97\u7B26\uFF08>\u3001<\u3001>=\u3001<=\uFF09
console.log('2' > '10'); // true - \u5B57\u7B26\u4E32\u6BD4\u8F83\u6309\u5B57\u5178\u5E8F
console.log(2 > '10'); // false - \u5B57\u7B26\u4E32\u8F6C\u4E3A\u6570\u5B57
console.log('abc' > 5); // false - 'abc' \u8F6C\u4E3A NaN\uFF0C\u4EFB\u4F55\u4E0E NaN \u7684\u6BD4\u8F83\u90FD\u8FD4\u56DE false
`,paraId:9,tocIndex:8},{value:`// \u903B\u8F91\u975E\uFF08!\uFF09\u5C06\u503C\u8F6C\u4E3A\u5E03\u5C14\u503C\u518D\u53D6\u53CD
console.log(!0); // true
console.log(!1); // false
console.log(!!'foo'); // true - \u53CC\u91CD\u5426\u5B9A\u5E38\u7528\u4E8E\u8F6C\u5E03\u5C14\u503C

// \u903B\u8F91\u4E0E\uFF08&&\uFF09\u8FD4\u56DE\u7B2C\u4E00\u4E2A\u5047\u503C\u6216\u6700\u540E\u4E00\u4E2A\u503C
console.log(0 && 'foo'); // 0
console.log('foo' && 0); // 0
console.log('foo' && 'bar'); // "bar"

// \u903B\u8F91\u6216\uFF08||\uFF09\u8FD4\u56DE\u7B2C\u4E00\u4E2A\u771F\u503C\u6216\u6700\u540E\u4E00\u4E2A\u503C
console.log(0 || 'foo'); // "foo"
console.log('foo' || 0); // "foo"
console.log('' || null || 0); // 0
`,paraId:10,tocIndex:9},{value:`// if \u8BED\u53E5\u7684\u6761\u4EF6\u4F1A\u8F6C\u6362\u4E3A\u5E03\u5C14\u503C
if ('') {
  console.log('\u4E0D\u4F1A\u6267\u884C'); // \u7A7A\u5B57\u7B26\u4E32\u662F\u5047\u503C
}

if ('0') {
  console.log('\u4F1A\u6267\u884C'); // \u975E\u7A7A\u5B57\u7B26\u4E32\u662F\u771F\u503C
}

// \u6570\u7EC4\u6BD4\u8F83\u7684\u7279\u6B8A\u60C5\u51B5
console.log([] == false); // true - [] \u8F6C\u4E3A "" \u8F6C\u4E3A 0\uFF0Cfalse \u8F6C\u4E3A 0
console.log([] == ![]); // true - ![] \u4E3A false
console.log([] == []); // false - \u5F15\u7528\u7C7B\u578B\u6BD4\u8F83\u7684\u662F\u5F15\u7528\u5730\u5740

// null \u548C undefined \u7684\u7279\u6B8A\u89C4\u5219
console.log(null == undefined); // true
console.log(null === undefined); // false
console.log(null == 0); // false - null \u53EA\u4E0E undefined \u76F8\u7B49
console.log(undefined == 0); // false
`,paraId:11,tocIndex:10},{value:"\u53C2\u8003\u8D44\u6599\uFF1A",paraId:12,tocIndex:10},{value:"JavaScript \u4E2D == \u548C === \u533A\u522B\u662F\u4EC0\u4E48\uFF1F",paraId:13,tocIndex:10},{value:"JavaScript \u4E00\u4E2A\u7591\u95EE\uFF0C[] (\u7A7A\u6570\u7EC4) == true\uFF0C\u5177\u4F53\u5982\u4E0B\uFF0C\u8BF7\u95EE\u8FD9\u662F\u4E3A\u4F55\uFF1F",paraId:13,tocIndex:10},{value:"JavaScript \u5BF9\u8C61\u5728\u8F6C\u6362\u4E3A\u539F\u59CB\u7C7B\u578B\u65F6\uFF0C\u4F1A\u6309\u7167\u7279\u5B9A\u7684\u4F18\u5148\u7EA7\u8C03\u7528\u5BF9\u8C61\u7684\u65B9\u6CD5\u3002",paraId:14,tocIndex:11},{value:"\u5F53\u5BF9\u8C61\u9700\u8981\u8F6C\u6362\u4E3A\u539F\u59CB\u7C7B\u578B\u65F6\uFF0C\u4F1A\u6309\u4EE5\u4E0B\u4F18\u5148\u7EA7\u8C03\u7528\uFF1A",paraId:15,tocIndex:12},{value:"Symbol.toPrimitive",paraId:16,tocIndex:12},{value:" - \u4F18\u5148\u7EA7\u6700\u9AD8",paraId:16,tocIndex:12},{value:"valueOf",paraId:16,tocIndex:12},{value:" - \u671F\u671B\u8F6C\u4E3A\u6570\u5B57\u65F6\u4F18\u5148\u8C03\u7528",paraId:16,tocIndex:12},{value:"toString",paraId:16,tocIndex:12},{value:" - \u671F\u671B\u8F6C\u4E3A\u5B57\u7B26\u4E32\u65F6\u4F18\u5148\u8C03\u7528",paraId:16,tocIndex:12},{value:"\u4F18\u5148\u8C03\u7528 ",paraId:17,tocIndex:13},{value:"Symbol.toPrimitive",paraId:17,tocIndex:13},{value:" \u7684\u8FD4\u56DE\u503C\uFF1A",paraId:17,tocIndex:13},{value:`const obj1 = {
  value: 3,
  valueOf() {
    return 4;
  },
  toString() {
    return '5';
  },
  [Symbol.toPrimitive]() {
    return 6;
  },
};

console.log(String(obj1)); // '6' - Symbol.toPrimitive \u4F18\u5148
console.log(Number(obj1)); // 6 - Symbol.toPrimitive \u4F18\u5148
console.log(obj1 + 1); // 7 - Symbol.toPrimitive \u4F18\u5148
`,paraId:18,tocIndex:13},{value:"String()",paraId:19,tocIndex:14},{value:" \u4F18\u5148\u8C03\u7528 ",paraId:19,tocIndex:14},{value:"toString",paraId:19,tocIndex:14},{value:"\uFF0C",paraId:19,tocIndex:14},{value:"Number()",paraId:19,tocIndex:14},{value:" \u4F18\u5148\u8C03\u7528 ",paraId:19,tocIndex:14},{value:"valueOf",paraId:19,tocIndex:14},{value:"\uFF1A",paraId:19,tocIndex:14},{value:`const obj2 = {
  value: 3,
  valueOf() {
    console.log('\u8C03\u7528\u4E86 valueOf');
    return 4;
  },
  toString() {
    console.log('\u8C03\u7528\u4E86 toString');
    return '5';
  },
};

console.log(String(obj2)); // \u8C03\u7528\u4E86 toString -> '5'
console.log(Number(obj2)); // \u8C03\u7528\u4E86 valueOf -> 4
`,paraId:20,tocIndex:14},{value:"String()",paraId:21,tocIndex:15},{value:" \u548C ",paraId:21,tocIndex:15},{value:"Number()",paraId:21,tocIndex:15},{value:" \u90FD\u4F1A\u8C03\u7528 ",paraId:21,tocIndex:15},{value:"toString",paraId:21,tocIndex:15},{value:"\uFF1A",paraId:21,tocIndex:15},{value:`const obj3 = {
  value: 3,
  toString() {
    console.log('\u8C03\u7528\u4E86 toString');
    return '5';
  },
};

console.log(String(obj3)); // \u8C03\u7528\u4E86 toString -> '5'
console.log(Number(obj3)); // \u8C03\u7528\u4E86 toString -> 5 (\u5B57\u7B26\u4E32\u518D\u8F6C\u4E3A\u6570\u5B57)
`,paraId:22,tocIndex:15},{value:"Number()",paraId:23,tocIndex:16},{value:" \u4F1A\u8C03\u7528 ",paraId:23,tocIndex:16},{value:"valueOf",paraId:23,tocIndex:16},{value:"\uFF0C",paraId:23,tocIndex:16},{value:"String()",paraId:23,tocIndex:16},{value:" \u4F1A\u8C03\u7528 ",paraId:23,tocIndex:16},{value:"Object.prototype.toString",paraId:23,tocIndex:16},{value:"\uFF1A",paraId:23,tocIndex:16},{value:`const obj4 = {
  value: 3,
  valueOf() {
    console.log('\u8C03\u7528\u4E86 valueOf');
    return 4;
  },
};

console.log(String(obj4)); // '[object Object]' - \u8C03\u7528\u9ED8\u8BA4\u7684 toString
console.log(Number(obj4)); // \u8C03\u7528\u4E86 valueOf -> 4
`,paraId:24,tocIndex:16},{value:"\u4F7F\u7528\u9ED8\u8BA4\u7684 ",paraId:25,tocIndex:17},{value:"Object.prototype",paraId:25,tocIndex:17},{value:" \u4E0A\u7684\u65B9\u6CD5\uFF1A",paraId:25,tocIndex:17},{value:`const obj5 = {
  value: 3,
};

console.log(String(obj5)); // '[object Object]'
console.log(Number(obj5)); // NaN - \u9ED8\u8BA4 toString \u8FD4\u56DE\u7684\u5B57\u7B26\u4E32\u65E0\u6CD5\u8F6C\u4E3A\u6570\u5B57
`,paraId:26,tocIndex:17},{value:"Symbol.toPrimitive",paraId:27,tocIndex:18},{value:" \u65B9\u6CD5\u63A5\u6536\u4E00\u4E2A ",paraId:27,tocIndex:18},{value:"hint",paraId:27,tocIndex:18},{value:" \u53C2\u6570\uFF0C\u8868\u793A\u671F\u671B\u7684\u8F6C\u6362\u7C7B\u578B\uFF1A",paraId:27,tocIndex:18},{value:`const obj = {
  [Symbol.toPrimitive](hint) {
    console.log(\`hint: \${hint}\`);
    if (hint === 'number') {
      return 42;
    }
    if (hint === 'string') {
      return 'hello';
    }
    return true; // hint === 'default'
  },
};

console.log(Number(obj)); // hint: number -> 42
console.log(String(obj)); // hint: string -> 'hello'
console.log(obj + ''); // hint: default -> 'true'
console.log(obj == true); // hint: default -> true
`,paraId:28,tocIndex:18},{value:"typeof",paraId:29,tocIndex:20},{value:" \u8FD0\u7B97\u7B26\u8FD4\u56DE\u53C2\u6570\u7684\u7C7B\u578B\u5B57\u7B26\u4E32\u3002",paraId:29,tocIndex:20},{value:"\u8BED\u6CD5\u5F62\u5F0F\uFF1A",paraId:30,tocIndex:20},{value:"\u4F5C\u4E3A\u8FD0\u7B97\u7B26\uFF1A",paraId:31,tocIndex:20},{value:"typeof x",paraId:31,tocIndex:20},{value:"\u51FD\u6570\u5F62\u5F0F\uFF1A",paraId:31,tocIndex:20},{value:"typeof(x)",paraId:31,tocIndex:20},{value:"\u57FA\u672C\u7528\u6CD5\uFF1A",paraId:32,tocIndex:20},{value:`console.log(typeof undefined); // 'undefined'
console.log(typeof 123); // 'number'
console.log(typeof '123'); // 'string'
console.log(typeof true); // 'boolean'
console.log(typeof Symbol('id')); // 'symbol'
console.log(typeof 123n); // 'bigint'
console.log(typeof {}); // 'object'
console.log(typeof []); // 'object' - \u6CE8\u610F\uFF1A\u6570\u7EC4\u4E5F\u662F\u5BF9\u8C61
console.log(typeof null); // 'object' - \u5386\u53F2\u9057\u7559 bug
console.log(typeof function () {}); // 'function'
`,paraId:33,tocIndex:20},{value:"\u7279\u6B8A\u60C5\u51B5\uFF1A",paraId:34,tocIndex:20},{value:`// typeof \u8FD4\u56DE\u503C\u7684\u7C7B\u578B\u662F\u5B57\u7B26\u4E32
console.log(typeof Array.isArray); // 'function'
console.log(typeof typeof Array.isArray); // 'string'

// typeof \u5BF9\u672A\u58F0\u660E\u7684\u53D8\u91CF\u4E0D\u4F1A\u62A5\u9519
console.log(typeof undeclaredVariable); // 'undefined'
`,paraId:35,tocIndex:20},{value:"\u5C40\u9650\u6027\uFF1A",paraId:36,tocIndex:20},{value:"\u65E0\u6CD5\u533A\u5206\u6570\u7EC4\u548C\u5BF9\u8C61",paraId:37,tocIndex:20},{value:"null",paraId:37,tocIndex:20},{value:" \u88AB\u9519\u8BEF\u5730\u8BC6\u522B\u4E3A ",paraId:37,tocIndex:20},{value:"'object'",paraId:37,tocIndex:20},{value:"\uFF08\u5386\u53F2\u9057\u7559\u95EE\u9898\uFF09",paraId:37,tocIndex:20},{value:"\u65E0\u6CD5\u8BC6\u522B\u5177\u4F53\u7684\u5BF9\u8C61\u7C7B\u578B\uFF08\u5982 Date\u3001RegExp \u7B49\uFF09",paraId:37,tocIndex:20},{value:"instanceof",paraId:38,tocIndex:21},{value:" \u8FD0\u7B97\u7B26\u7528\u4E8E\u68C0\u6D4B\u6784\u9020\u51FD\u6570\u7684 ",paraId:38,tocIndex:21},{value:"prototype",paraId:38,tocIndex:21},{value:" \u5C5E\u6027\u662F\u5426\u51FA\u73B0\u5728\u67D0\u4E2A\u5B9E\u4F8B\u5BF9\u8C61\u7684\u539F\u578B\u94FE\u4E0A\u3002",paraId:38,tocIndex:21},{value:"\u57FA\u672C\u7528\u6CD5\uFF1A",paraId:39,tocIndex:21},{value:`console.log([] instanceof Array); // true
console.log({} instanceof Object); // true
console.log(new Date() instanceof Date); // true
console.log(/\\d/ instanceof RegExp); // true

// \u539F\u59CB\u7C7B\u578B\u4E0D\u662F\u5BF9\u8C61\u5B9E\u4F8B
console.log(123 instanceof Number); // false
console.log('abc' instanceof String); // false
console.log(true instanceof Boolean); // false

// \u4F46\u5305\u88C5\u5BF9\u8C61\u662F
console.log(new Number(123) instanceof Number); // true
console.log(new String('abc') instanceof String); // true
`,paraId:40,tocIndex:21},{value:"\u624B\u52A8\u5B9E\u73B0 instanceof\uFF1A",paraId:41,tocIndex:21},{value:`function myInstanceof(left, right) {
  // \u57FA\u672C\u6570\u636E\u7C7B\u578B\u76F4\u63A5\u8FD4\u56DE false
  if (typeof left !== 'object' || left === null) return false;

  // getPrototypeOf \u662F Object \u5BF9\u8C61\u81EA\u5E26\u7684\u65B9\u6CD5\uFF0C\u76F8\u5F53\u4E8E left.__proto__
  let proto = Object.getPrototypeOf(left);

  while (true) {
    // \u67E5\u627E\u5230\u539F\u578B\u94FE\u5C3D\u5934\uFF0C\u8FD8\u6CA1\u627E\u5230
    if (proto === null) return false;

    // \u627E\u5230\u76F8\u540C\u7684\u539F\u578B\u5BF9\u8C61
    if (proto === right.prototype) return true;

    // \u7EE7\u7EED\u5411\u4E0A\u67E5\u627E
    proto = Object.getPrototypeOf(proto);
  }
}

// \u6D4B\u8BD5
console.log(myInstanceof(Number(1), Number)); // false - \u539F\u59CB\u7C7B\u578B
console.log(myInstanceof(new Number(1), Number)); // true - \u5305\u88C5\u5BF9\u8C61
console.log(myInstanceof(new Date(), Date)); // true
console.log(myInstanceof([], Array)); // true
console.log(myInstanceof([], Object)); // true - \u6570\u7EC4\u4E5F\u662F\u5BF9\u8C61
`,paraId:42,tocIndex:21},{value:"\u6700\u51C6\u786E\u7684\u7C7B\u578B\u68C0\u6D4B\u65B9\u6CD5\uFF0C\u80FD\u591F\u8BC6\u522B\u6240\u6709\u5185\u7F6E\u5BF9\u8C61\u7C7B\u578B\u3002",paraId:43,tocIndex:22},{value:"\u57FA\u672C\u7528\u6CD5\uFF1A",paraId:44,tocIndex:22},{value:`// \u57FA\u672C\u7C7B\u578B
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(2); // "[object Number]"
Object.prototype.toString.call(''); // "[object String]"
Object.prototype.toString.call(true); // "[object Boolean]"
Object.prototype.toString.call(Symbol('id')); // "[object Symbol]"
Object.prototype.toString.call(123n); // "[object BigInt]"

// \u5F15\u7528\u7C7B\u578B
Object.prototype.toString.call({}); // "[object Object]"
Object.prototype.toString.call([]); // "[object Array]"
Object.prototype.toString.call(/\\d/); // "[object RegExp]"
Object.prototype.toString.call(new Date()); // "[object Date]"
Object.prototype.toString.call(Math); // "[object Math]"
Object.prototype.toString.call(function () {}); // "[object Function]"
Object.prototype.toString.call(Array.isArray); // "[object Function]"
`,paraId:45,tocIndex:22},{value:"\u81EA\u5B9A\u4E49\u5BF9\u8C61\u7C7B\u578B\u6807\u7B7E\uFF1A",paraId:46,tocIndex:22},{value:"\u53EF\u4EE5\u901A\u8FC7 ",paraId:47,tocIndex:22},{value:"Symbol.toStringTag",paraId:47,tocIndex:22},{value:" \u81EA\u5B9A\u4E49\u5BF9\u8C61\u7684\u7C7B\u578B\u6807\u7B7E\uFF1A",paraId:47,tocIndex:22},{value:`class MyClass {
  get [Symbol.toStringTag]() {
    return 'MyClass';
  }
}

const instance = new MyClass();
console.log(Object.prototype.toString.call(instance)); // "[object MyClass]"
`,paraId:48,tocIndex:22},{value:"\u53C2\u8003\uFF1A",paraId:49,tocIndex:22},{value:"Symbol.toStringTag - MDN",paraId:49,tocIndex:22},{value:"\u7ED3\u5408 ",paraId:50,tocIndex:23},{value:"typeof",paraId:50,tocIndex:23},{value:" \u548C ",paraId:50,tocIndex:23},{value:"Object.prototype.toString",paraId:50,tocIndex:23},{value:" \u7684\u4F18\u70B9\uFF0C\u5B9E\u73B0\u4E00\u4E2A\u901A\u7528\u7684\u7C7B\u578B\u5224\u65AD\u51FD\u6570\uFF1A",paraId:50,tocIndex:23},{value:`function getType(obj) {
  let type = typeof obj;

  // \u5148\u8FDB\u884C typeof \u5224\u65AD\uFF0C\u5982\u679C\u662F\u57FA\u7840\u6570\u636E\u7C7B\u578B\uFF0C\u76F4\u63A5\u8FD4\u56DE
  if (type !== 'object') {
    return type;
  }

  // \u5BF9\u4E8E typeof \u8FD4\u56DE\u7ED3\u679C\u662F object \u7684\uFF0C\u518D\u8FDB\u884C toString \u5224\u65AD\uFF0C\u6B63\u5219\u63D0\u53D6\u7C7B\u578B
  return Object.prototype.toString
    .call(obj)
    .replace(/^\\[object (\\S+)\\]$/, '$1');
}

// \u4F7F\u7528\u793A\u4F8B
console.log(getType([])); // "Array" - typeof [] \u662F object\uFF0C\u56E0\u6B64 toString \u8FD4\u56DE
console.log(getType('123')); // "string" - typeof \u76F4\u63A5\u8FD4\u56DE
console.log(getType(window)); // "Window" - toString \u8FD4\u56DE
console.log(getType(null)); // "Null" - \u9996\u5B57\u6BCD\u5927\u5199\uFF0Ctypeof null \u662F object\uFF0C\u9700 toString \u6765\u5224\u65AD
console.log(getType(undefined)); // "undefined" - typeof \u76F4\u63A5\u8FD4\u56DE
console.log(getType()); // "undefined" - typeof \u76F4\u63A5\u8FD4\u56DE
console.log(getType(function () {})); // "function" - typeof \u80FD\u5224\u65AD\uFF0C\u56E0\u6B64\u9996\u5B57\u6BCD\u5C0F\u5199
console.log(getType(/123/g)); // "RegExp" - toString \u8FD4\u56DE
console.log(getType(new Date())); // "Date" - toString \u8FD4\u56DE
`,paraId:51,tocIndex:23},{value:`// \u5229\u7528\u5BF9\u8C61\u5305\u88C5\u540E\u8FD8\u662F\u5B83\u81EA\u5DF1\u7684\u7279\u6027
function isObject(value) {
  return value === Object(value);
}

// \u6D4B\u8BD5
console.log(isObject({})); // true
console.log(isObject([])); // true
console.log(isObject(null)); // false - null \u6CA1\u6709\u5305\u88C5\u5BF9\u8C61
console.log(isObject(123)); // false
console.log(isObject('abc')); // false

// \u539F\u7406\uFF1AObject(null) !== null
console.log(Object(null) === null); // false
console.log(Object({}) === {}); // false - \u4E0D\u540C\u5F15\u7528
`,paraId:52,tocIndex:25},{value:`function isEmptyObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  return Object.keys(obj).length === 0;
}

console.log(isEmptyObject({})); // true
console.log(isEmptyObject({ a: 1 })); // false
console.log(isEmptyObject([])); // true - \u7A7A\u6570\u7EC4\u4E5F\u7B97\u7A7A\u5BF9\u8C61
console.log(isEmptyObject([1, 2])); // false
console.log(isEmptyObject(null)); // false
`,paraId:53,tocIndex:26},{value:`// \u5229\u7528\u6574\u6570\u4F4D\u8FD0\u7B97\u540E\u4E0D\u53D8\u7684\u7279\u6027
function isInteger(num) {
  return typeof num === 'number' && (num | 0) === num;
}

console.log(isInteger(1)); // true
console.log(isInteger(1.1)); // false
console.log(isInteger(-5)); // true
console.log(isInteger(0)); // true
console.log(isInteger(NaN)); // false
console.log(isInteger(Infinity)); // false

// \u4E5F\u53EF\u4EE5\u4F7F\u7528 ES6 \u63D0\u4F9B\u7684\u65B9\u6CD5
console.log(Number.isInteger(1)); // true
console.log(Number.isInteger(1.1)); // false
`,paraId:54,tocIndex:27},{value:`console.log(Array.isArray([])); // true
console.log(Array.isArray([1, 2, 3])); // true
console.log(Array.isArray({})); // false
console.log(Array.isArray('abc')); // false
console.log(Array.isArray(arguments)); // false - arguments \u4E0D\u662F\u6570\u7EC4

// \u6BD4 instanceof \u66F4\u53EF\u9760
console.log([] instanceof Array); // true
// \u4F46 instanceof \u5728\u8DE8 iframe \u65F6\u53EF\u80FD\u5931\u6548
`,paraId:55,tocIndex:28},{value:"JavaScript \u4E2D\u7684\u6570\u636E\u7C7B\u578B\u5206\u4E3A\u4E24\u5927\u7C7B\uFF1A\u503C\u7C7B\u578B\uFF08\u57FA\u672C\u7C7B\u578B\uFF09\u548C\u5F15\u7528\u7C7B\u578B\u3002",paraId:56,tocIndex:29},{value:"\u503C\u7C7B\u578B\u5305\u62EC\uFF1A",paraId:57,tocIndex:30},{value:"string",paraId:57,tocIndex:30},{value:"\u3001",paraId:57,tocIndex:30},{value:"number",paraId:57,tocIndex:30},{value:"\u3001",paraId:57,tocIndex:30},{value:"boolean",paraId:57,tocIndex:30},{value:"\u3001",paraId:57,tocIndex:30},{value:"undefined",paraId:57,tocIndex:30},{value:"\u3001",paraId:57,tocIndex:30},{value:"null",paraId:57,tocIndex:30},{value:"\u3001",paraId:57,tocIndex:30},{value:"symbol",paraId:57,tocIndex:30},{value:"\u3001",paraId:57,tocIndex:30},{value:"bigint",paraId:57,tocIndex:30},{value:"\u7279\u70B9\uFF1A",paraId:58,tocIndex:30},{value:"\u5B58\u50A8\u5728\u6808\u5185\u5B58\u4E2D",paraId:59,tocIndex:30},{value:"\u8D4B\u503C\u65F6\u662F\u503C\u7684\u62F7\u8D1D",paraId:59,tocIndex:30},{value:"\u4E92\u4E0D\u5F71\u54CD",paraId:59,tocIndex:30},{value:`let foo = 1;
let bar = foo; // \u62F7\u8D1D\u503C

bar = 2; // \u4FEE\u6539 bar \u4E0D\u5F71\u54CD foo

console.log(foo); // 1
console.log(bar); // 2
`,paraId:60,tocIndex:30},{value:"\u5F15\u7528\u7C7B\u578B\u5305\u62EC\uFF1A",paraId:61,tocIndex:31},{value:"Object",paraId:61,tocIndex:31},{value:"\u3001",paraId:61,tocIndex:31},{value:"Array",paraId:61,tocIndex:31},{value:"\u3001",paraId:61,tocIndex:31},{value:"Function",paraId:61,tocIndex:31},{value:"\u3001",paraId:61,tocIndex:31},{value:"Date",paraId:61,tocIndex:31},{value:"\u3001",paraId:61,tocIndex:31},{value:"RegExp",paraId:61,tocIndex:31},{value:" \u7B49",paraId:61,tocIndex:31},{value:"\u7279\u70B9\uFF1A",paraId:62,tocIndex:31},{value:"\u5B58\u50A8\u5728\u5806\u5185\u5B58\u4E2D",paraId:63,tocIndex:31},{value:"\u6808\u4E2D\u4FDD\u5B58\u7684\u662F\u5F15\u7528\u7C7B\u578B\u7684\u6307\u9488\uFF08\u5185\u5B58\u5730\u5740\uFF09",paraId:63,tocIndex:31},{value:"\u8D4B\u503C\u65F6\u62F7\u8D1D\u7684\u662F\u6307\u9488\uFF0C\u6307\u5411\u540C\u4E00\u4E2A\u5BF9\u8C61",paraId:63,tocIndex:31},{value:"\u76F8\u4E92\u4E4B\u95F4\u6709\u5F71\u54CD",paraId:63,tocIndex:31},{value:`let foo = { a: 1, b: 2 };
let bar = foo; // \u62F7\u8D1D\u7684\u662F\u5F15\u7528\uFF08\u6307\u9488\uFF09

bar.a = 2; // \u4FEE\u6539 bar \u4F1A\u5F71\u54CD foo

console.log(foo); // { a: 2, b: 2 }
console.log(bar); // { a: 2, b: 2 }
console.log(foo === bar); // true - \u6307\u5411\u540C\u4E00\u4E2A\u5BF9\u8C61
`,paraId:64,tocIndex:31},{value:`// \u6D45\u62F7\u8D1D - \u53EA\u62F7\u8D1D\u7B2C\u4E00\u5C42
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { ...obj1 }; // \u6216 Object.assign({}, obj1)

obj2.a = 10; // \u4E0D\u5F71\u54CD obj1
obj2.b.c = 20; // \u5F71\u54CD obj1\uFF08b \u662F\u5F15\u7528\u7C7B\u578B\uFF09

console.log(obj1); // { a: 1, b: { c: 20 } }
console.log(obj2); // { a: 10, b: { c: 20 } }

// \u6DF1\u62F7\u8D1D - \u9012\u5F52\u62F7\u8D1D\u6240\u6709\u5C42\u7EA7
const obj3 = JSON.parse(JSON.stringify(obj1));
obj3.b.c = 30; // \u4E0D\u5F71\u54CD obj1

console.log(obj1.b.c); // 20
console.log(obj3.b.c); // 30
`,paraId:65,tocIndex:32},{value:"\u5728 JavaScript \u4E2D\uFF0C\u6240\u6709\u51FD\u6570\u53C2\u6570\u90FD\u662F\u6309\u503C\u4F20\u9012\u7684\uFF1A",paraId:66,tocIndex:33},{value:"\u57FA\u672C\u7C7B\u578B",paraId:67,tocIndex:33},{value:"\uFF1A\u4F20\u9012\u7684\u662F\u503C\u7684\u62F7\u8D1D",paraId:67,tocIndex:33},{value:"\u5F15\u7528\u7C7B\u578B",paraId:67,tocIndex:33},{value:"\uFF1A\u4F20\u9012\u7684\u662F\u5F15\u7528\uFF08\u6307\u9488\uFF09\u7684\u62F7\u8D1D",paraId:67,tocIndex:33},{value:`// \u57FA\u672C\u7C7B\u578B\u793A\u4F8B
function changeValue(num) {
  num = 100; // \u4FEE\u6539\u7684\u662F\u53C2\u6570\u7684\u526F\u672C
  return num;
}

let value = 1;
const result = changeValue(value);
console.log(value); // 1 - \u539F\u59CB\u503C\u4E0D\u53D8
console.log(result); // 100

// \u5F15\u7528\u7C7B\u578B\u793A\u4F8B
function changeObject(person) {
  person.name = 'chu'; // \u4FEE\u6539\u5BF9\u8C61\u5C5E\u6027\u4F1A\u5F71\u54CD\u539F\u5BF9\u8C61
  person = { name: 'bar', age: 18 }; // \u91CD\u65B0\u8D4B\u503C\u4E0D\u5F71\u54CD\u539F\u5BF9\u8C61
  return person;
}

const p1 = { name: 'foo', age: 25 };
const p2 = changeObject(p1);

console.log(p1); // { name: 'chu', age: 25 } - \u5C5E\u6027\u88AB\u4FEE\u6539
console.log(p2); // { name: 'bar', age: 18 } - \u65B0\u5BF9\u8C61
console.log(p1 === p2); // false - \u4E0D\u662F\u540C\u4E00\u4E2A\u5BF9\u8C61
`,paraId:68,tocIndex:33},{value:"\u5173\u952E\u70B9\u7406\u89E3\uFF1A",paraId:69,tocIndex:33},{value:"person.name = 'chu'",paraId:70,tocIndex:33},{value:" - \u901A\u8FC7\u5F15\u7528\u4FEE\u6539\u5BF9\u8C61\u5C5E\u6027\uFF0C\u5F71\u54CD\u539F\u5BF9\u8C61",paraId:70,tocIndex:33},{value:"person = {...}",paraId:70,tocIndex:33},{value:" - \u91CD\u65B0\u8D4B\u503C\u53EA\u662F\u6539\u53D8\u4E86\u5C40\u90E8\u53D8\u91CF ",paraId:70,tocIndex:33},{value:"person",paraId:70,tocIndex:33},{value:" \u7684\u6307\u5411\uFF0C\u4E0D\u5F71\u54CD\u539F\u5BF9\u8C61",paraId:70,tocIndex:33},{value:"\u51FD\u6570\u53C2\u6570\u4F20\u9012\u7684\u662F\u5F15\u7528\u7684\u526F\u672C\uFF0C\u4E0D\u662F\u5F15\u7528\u7684\u5F15\u7528",paraId:70,tocIndex:33}]}}]);
