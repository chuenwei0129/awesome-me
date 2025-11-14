---
group:
  title: javaScript
  order: 3
title: JSON
toc: content
order: 16
---

## JSON 的由来

结构化数据是指按照特定格式和规则组织的数据，每个数据字段都有明确的定义和类型。

结构化数据的特点是易于处理、存储和分析，因为数据的结构和关系已经明确。常见的文本形式的结构化数据通常是 **XML**。

但是 XML 需要大量的 `<>` 标签来描述结构关系，因此体积浪费上比较严重，对于解析和网络传输上要明显逊色于 JSON。

JSON 全称叫做 `JavaScript Object Notation`，可见它一开始就与 JavaScript 脱不开关系。微软在 IE8 才开始内置对 JSON API 的支持，在此之前，都需要引用第三方库来实现。ECMAScript 规范引入 JSON 要到 ES5。

事实上，JSON 在 ECMA 是有独立规范的，那就是 `ECMA-404`。它只有十几页，里面定义了各种语法相关的符号，比如大括号、中括号、逗号、分号，都是有明确的 Unicode 值的。同时它也定义了 JSON 支持的 7 种取值，分别是 **object**、**array**、**number**、**string**、**true**、**false** 和 **null**。

![20251111120518](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/awesome-me/20251111120518.png)

## JSON 的解析

单单一个数字、一个双引号字符串、一个 true 或 false，以及一个 null 都是合法的 JSON 数据，并非只有大括号（{}）、中括号（[]）包起来的结构才算。于是像下列解析都能够成功：

```js
JSON.parse('8'); // 数字 8
JSON.parse(`"Hello"`); // 字符串 "Hello" (注意需要双引号)
JSON.parse('true'); // 布尔值 true
JSON.parse('false'); // 布尔值 false
JSON.parse('null'); // null
```

但是需要注意，JSON 只支持十进制的数字，像 `JSON.parse("0x01")` 甚至 `JSON.parse("01")` 这样都是不可以被成功解析的。

同时，对于 JavaScript 中的特殊数字，比如 `Infinity`、`NaN`，JSON 都是不支持的，解析会报错。此外，`undefined` 也不属于 JSON 的合法类型。

以上是 `JSON.parse` 对于一些不常见数据格式的解析策略。如果你给它传入了一个非字符串类型的参数，那么会通过 `ToString()` 函数来转换。

应该有很多人不知道，`JSON.parse` 还支持第二个参数 `reviver`，用来精确控制解析后的值。举一个例子：

```js
JSON.parse(
  `{
    "name": "Mike",
    "education": {
        "college": "MIT",
        "major": "computer"
    },
    "experiences": [{
        "from": "2017-08-20",
        "to": "2018-03-05",
        "employer": "Google"
    },
    {
        "from": "2018-03-17",
        "to": "2020-07-28",
        "employer": "Microsoft"
    }]
}`,
  function (key, value) {
    console.log(this, key, value);
    return value;
  },
);
```

`reviver` 内部有三个变量可以利用，分别是 `this`、`key` 和 `value`。

key 不用多说，自然是某一层级下某一字段的键，需要注意的是，最外层这个结构也被包含在了一个虚拟对象中：

```js
{
  '': {
    name: 'Mike',
    education: { college: 'MIT', major: 'computer' },
    experiences: [ [Object], [Object] ]
  }
}
```

并且 key 为空字符串。

大家可以专门打印一下所有的 key，它们形成下面这种顺序：

```js
'name';
'college';
'major';
'education';
'from';
'to';
'employer';
'0';
'from';
'to';
'employer';
'1';
'experiences';
'';
```

可见这是一个`深度优先遍历`的顺序，最后一个一定是空串。`this` 即指向当前这个 key 所在的对象结构，因此不要用箭头函数来声明 `reviver`，否则会篡改 this。

即便有 this 和 key，`reviver` 参数在实际使用中仍然面临着比较大的限制，因为 key 会重复，这时候你就只能用 this 来辨别当前 key-value 的位置，但是 this 作为一个数据结构，同样不方便用来定位。因此，建议在被解析的 JSON 数据有明确、简单的结构时，可以考虑使用 `reviver`。

> 你可以试试用 `reviver` 来生成 JSON 本来不支持的数据类型，比如 Symbol、BigInt。

**解析要点总结：**

- JSON 支持 7 种数据类型：object、array、number、string、true、false、null
- JSON 数字仅支持十进制格式，不支持 `Infinity`、`NaN`、八进制、十六进制
- `JSON.parse` 的 `reviver` 参数采用深度优先遍历，可用于转换解析后的值
- 非字符串参数会通过 `ToString()` 自动转换

## 序列化成 JSON

与解析相对应的就是序列化：`JSON.stringify`。

### 环形引用限制

被序列化的对象**不可以包含环形引用**，否则无法展开为树形平面的 JSON 格式，否则会抛出 `TypeError`。不信的话可以试试：

```js
JSON.stringify(document);
```

### 数据类型的序列化规则

然后我们来看看不同数据类型在序列化后的表现：

```js
JSON.stringify(null); // 'null' - 保持为 null
JSON.stringify(undefined); // undefined - 注意：返回 undefined，不是字符串
JSON.stringify(true); // 'true' - 布尔值转为字符串
JSON.stringify(false); // 'false'
JSON.stringify('abc'); // '"abc"' - 字符串会被双引号包裹
JSON.stringify(123); // '123' - 数字转为字符串
JSON.stringify(Symbol('sym')); // undefined - Symbol 不被支持
JSON.stringify([2, 3, 4]); // '[2,3,4]' - 数组正常序列化
JSON.stringify(function foo() {}); // undefined - 函数不被支持
```

我们遍历这些不同类型数据的目的是想提醒大家，在向 `JSON.stringify` 传递参数的时候，要对类型有预期，要知道传错类型的后果是什么。大家已经看到了，这个函数并不是始终都返回一个字符串，还可能是 undefined，因此像下面这种代码，你应该可以猜到可能报什么错吧：

```js
function toJSON(variable) {
  return JSON.strinify(variable).trim(); // ⚠️
}
```

总结一下 `JSON.stringify` 只能正常处理 JSON 所支持的类型：字符串、数字、布尔、对象和 null。对象中的函数不被支持，会返回 undefined，而 undefined 又会被丢弃。即便是数字也有例外：

```js
JSON.stringify(Infinity); // 'null'
JSON.stringify(NaN); // 'null'
JSON.stringify(1n); // ❌ VM1315:1 Uncaught TypeError: Do not know how to serialize a BigInt
```

`Infinity` 和 `NaN` 都会序列化成 “null”，而 `BigInt` 压根就直接抛出异常了。

从这一点上来看，我们就知道这样一种对象深克隆（clone）办法：先序列化成 JSON 字符串，再 parse 成对象，会存在明显的**失真**问题。

```js
function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

clone({ m: () => {}, s: Symbol('s') }); // {}
clone([1, Infinity, NaN]); // [1, null, null]
```

这样显然是不可取的，建议你还是老老实实地手动遍历属性去实现克隆。

### toJSON 方法

即便目的不是克隆，序列化一个对象也是常见的操作，比如 POST 接口提交，就要把对象变成 JSON 文本，塞入到 body 中去。

一般来说，对于对象而言，`JSON.stringify` 会递归遍历自身的**可枚举的、以字符串为 key 的属性**。根据我们前面学习过的遍历对象的知识，这正好是 `Object.keys/values/entries` 的逻辑。于是，`JSON.stringify` 在普通对象上的遍历过程大致是：

```js
function stringify(obj) {
  for (const [key, value] of Object.entries(obj)) {
    if (isObject(value)) {
      stringify(value); // 递归
    }
  }
}
```

但是，重点来了，如果你的对象有一个叫做 **`toJSON`** 的函数，在自身也好，在原型链上也好，那么 `JSON.stringify` 就调用这个函数而不再去遍历对象属性。

当然 toJSON 的返回值并不会直接作为 `JSON.stringify` 的输出，更像是递归传入 `JSON.stringify`。我把 `JSON.stringify` 的关键逻辑画成下面的图：

![20251111120816](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/awesome-me/20251111120816.png)

目前在 ECMAScript 内置的对象类型中，只有 **Date** 定义了 toJSON，它返回了等价于调用 **toISOString** 的字符串：

```js
JSON.stringify({ now: new Date() }); // {"now":"2023-07-10T13:11:15.960Z"}
```

本质上来说，`JSON.stringify` 就是一套映射函数，对于对象（包括数组）这种结构化数据进行递归调用。toJSON 就如同开了一个后门，能够更简单地让对象决定自己的 JSON 表述是什么样子的。

> 💡 ECMAScript 最早在 ES5 引入 JSON API 时，就支持了 `toJSON` 的功能，现在回想起来，那个时候还不支持 Symbol，否则的话，会不会更有可能预设一个 _Symbol.toJSON_ 来实现同样的能力呢？

### replacer 参数

如果你的对象中有一些属性不想被序列化，那么可以考虑定义成不可枚举的，或者以 Symbol 而不是 String 为 key。如果这样不方便，我们也有办法，那就需要使用 `JSON.stringify` 的第二个参数 `replacer` 了。

`replacer` 可以是一个函数也可以是一个数组：

当作为函数的时候，它和 `JSON.parse` 中的 `reviver` 有异曲同工之妙，只不过 `reviver` 先遍历到最底层的节点，而 `replacer` 先遍历最上层的节点。我们还是以前面的数据为例：

```js
JSON.stringify(
  {
    name: 'Mike',
    education: {
      college: 'MIT',
      major: 'computer',
    },
    experiences: [
      {
        from: '2017-08-20',
        to: '2018-03-05',
        employer: 'Google',
      },
      {
        from: '2018-03-17',
        to: '2020-07-28',
        employer: 'Microsoft',
      },
    ],
  },
  function (key, value) {
    console.log(key);
    return value;
  },
);
```

console.log 的打印结果是：

```
""
"name"
"education"
"college"
"major"
"experiences"
"0"
"from"
"to"
"employer"
"1"
"from"
"to"
"employer"
```

`replacer` 函数的作用就是“篡改”序列化之后的数据，举个简单的例子：

```js
JSON.stringify(
  {
    name: 'Tom',
  },
  function (key, val) {
    if (key === 'name') return 'Mike';
    return val;
  },
);
```

其结果就是 `{"name":"Mike"}`。当然了，和 `reviver` 一样，`replacer` 也有 key 冲突等问题，不再多说。

`replacer` 还可以是一个数组，不过这个时候它就只能发挥一个白名单的作用，并不能实现值的替换。

数组的成员只能是数字或者字符串。数字会被 `ToString` 转换成字符串，当数字作为一个对象的属性名时也会这样做。

`replacer` 也会认可 String 对象和 Number 对象，甚至它们的子类，比如：

```js
class MyString extends String {}

JSON.stringify(
  {
    name: 'Tom',
    age: 15,
  },
  [new MyString('name')],
); // {"name": "Tom"}
```

根据遍历的顺序，我们知道，如果上层的 key 没有出现在 `replacer` 数组中，那么其 value 会被直接丢弃，即便里面有 key 在 `replacer` 中：

```js
JSON.stringify(
  {
    name: 'Tom',
    education: {
      college: 'MIT',
      major: 'computer',
    },
  },
  ['name', 'major'],
); // {"name": "Tom"}
```

> 💡 如果要序列化的对象有不同层级、语义的同名 key，那么要更小心地使用 `replacer`。

另外，如果要序列化一个数组，那么数组形式的 `replacer` 是无效的：

```js
JSON.stringify(
  [1, 2, 3, 4, 5],
  [0, 3], // ❌ 参数无效
); // "[1,2,3,4,5]"
```

### space 参数（格式化输出）

到目前为止，`JSON.stringify` 输出的字符串还都是单行的，为了更好地阅读，我们习惯于使用它的第三个参数 `space`。

`space` 可以是数字也可以是字符串（包括它们的对象形式），语义上代表缩进的字符或者空白的个数。如果是数字，比如 N，那么格式化后的 JSON 字符串每层级就会缩进 N 个空格（0x20）：

```js
JSON.stringify(
  {
    name: 'Mike',
    education: {
      college: 'MIT',
      major: 'computer',
    },
  },
  null,
  8,
);
```

8 空格缩进：

```js
{
        "name": "Mike",
        "education": {
                "college": "MIT",
                "major": "computer"
        }
}
```

如果我们想缩进 Tab（0x9） 而不是空格，那么就需要把 `space` 设置成字符串：

```js
JSON.stringify(
  {
    name: 'Mike',
    education: {
      college: 'MIT',
      major: 'computer',
    },
  },
  null,
  '\u0009', // Tab
);
```

需要注意的是，缩进字符不能超过 10 个，`space` 如果是数字，超过 10 会被当作 10；如果是字符串，超过 10 的码元会被截断，比如：

```js
JSON.stringify({ name: 'Mike' }, null, new Array(12).fill('/').join('')); // 12
```

得到的是：

```
{
//////////"name": "Mike"
}
```

你可以数一数，缩进只有 10 个 "/"，而不是传入的 12。

> 💡 注意多码元字符可能会被在中间截断，造成字符破坏。

**序列化要点总结：**

- `JSON.stringify` 不支持环形引用，会抛出 `TypeError`
- 特殊值处理：`undefined`、`Symbol`、函数返回 `undefined`；`Infinity`、`NaN` 转为 `null`；`BigInt` 抛出异常
- 使用 JSON 进行深克隆会导致数据失真，不推荐
- `toJSON` 方法允许对象自定义序列化行为
- `replacer` 参数可用于过滤属性或转换值（函数形式或数组白名单）
- `space` 参数用于格式化输出，最多支持 10 个缩进字符

以上就是 JSON 的解析和序列化的细节知识，掌握它们能够增强你所写代码的健壮性和简洁性。在实际开发中，还有一些涉及到 JSON 的场景。

## JSON 的常见场景

**JSON 的文本特征**，最适合用来做网络传输。在 fetch 之前，我们使用 `XMLHttpRequest` 也可以直接解析 JSON 格式的响应内容：

```js
const xhr = new XMLHttpRequest();

xhr.responseType = 'json';
```

这样最后 **xhr.response** 就直接是 JSON 对象。如果服务端可以返回多种格式，但是期望它返回 JSON，那么就需要主动设置 HTTP 的 **Accept** 请求头：

```js
xhr.setRequestHeader('Accept', 'application/json');
```

如果发送出去的数据也是 JSON，那么：

```js
xhr.setRequestHeader('Content-Type', 'application/json');

xhr.open('POST', '/submit');

xhr.send(JSON.stringify({ name: 'Mike' }));
```

这样发送出去的 HTTP 请求大概就是：

```http
POST /submit HTTP/1.1
Accept: application/json
ContentType: application/json

{"name":"Mike"}
```

以上等价的 `fetch` 写法就是：

```js
fetch('/submit', {
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
  },
  body: JSON.stringify({ name: 'Mike' }),
  method: 'POST',
});
```

一些网络封装库，如 **jQuery**、**axios** 等等为了简化使用，都已经将以上 JSON 细节隐藏了起来，但大家都应该知道其原理，该操作什么。

## 安全性与最佳实践

### 避免使用 eval 解析 JSON

在 JSON API 出现之前，有些开发者会使用 `eval()` 来解析 JSON 字符串，这是**极其危险**的做法：

```js
// ❌ 危险：永远不要这样做
const data = eval('(' + jsonString + ')');

// ✅ 安全：始终使用 JSON.parse
const data = JSON.parse(jsonString);
```

`eval()` 会执行任意 JavaScript 代码，可能导致 XSS 攻击和代码注入。

### 处理不可信的 JSON 数据

当处理来自外部来源（如 API 响应、用户输入）的 JSON 数据时，应该：

1. **始终进行错误处理**：`JSON.parse` 可能抛出 `SyntaxError`

```js
try {
  const data = JSON.parse(jsonString);
  // 处理数据
} catch (error) {
  console.error('JSON 解析失败:', error);
  // 错误处理逻辑
}
```

2. **验证数据结构**：解析成功不代表数据结构符合预期

```js
function validateUser(data) {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Invalid user data');
  }
  if (typeof data.name !== 'string' || typeof data.age !== 'number') {
    throw new Error('Missing or invalid user properties');
  }
  return data;
}

try {
  const user = validateUser(JSON.parse(jsonString));
} catch (error) {
  console.error('数据验证失败:', error);
}
```

3. **注意大型 JSON 的性能**：解析大型 JSON 可能阻塞主线程

```js
// 对于大型 JSON，考虑使用流式解析或 Web Worker
// 或者分批处理数据
```

### 常见陷阱

1. **Date 对象的往返问题**

```js
const obj = { date: new Date() };
const str = JSON.stringify(obj); // {"date":"2023-07-10T13:11:15.960Z"}
const parsed = JSON.parse(str);
console.log(parsed.date instanceof Date); // false - 变成了字符串！
```

解决方案：使用 `reviver` 参数转换回 Date 对象

```js
const parsed = JSON.parse(str, (key, value) => {
  if (key === 'date') return new Date(value);
  return value;
});
```

2. **丢失属性的问题**

```js
const obj = {
  name: 'Tom',
  age: undefined, // 会被丢弃
  [Symbol('id')]: 123, // 会被丢弃
  getData() {}, // 会被丢弃
};

JSON.stringify(obj); // {"name":"Tom"}
```

3. **数字精度问题**

```js
// JavaScript 数字是 64 位浮点数，超过 2^53-1 的整数会失去精度
const bigNumber = 9007199254740992;
JSON.parse(JSON.stringify(bigNumber)); // 可能不准确

// 对于大整数，考虑使用字符串表示
const data = { id: '9007199254740992' };
```

## 小结

本文深入探讨了 JSON 在 JavaScript 中的应用，从基础概念到高级特性，涵盖了以下核心内容：

**JSON 基础：**

- JSON 是 JavaScript Object Notation 的缩写，定义在 ECMA-404 规范中
- 支持 7 种数据类型：object、array、number、string、true、false、null
- 相比 XML，JSON 体积更小、解析更快，更适合网络传输

**解析与序列化：**

- `JSON.parse` 用于将 JSON 字符串解析为 JavaScript 对象，支持 `reviver` 参数进行自定义转换
- `JSON.stringify` 用于将 JavaScript 对象序列化为 JSON 字符串，支持 `replacer` 和 `space` 参数
- 特殊类型（如 `undefined`、`Symbol`、函数）在序列化时会被忽略或转换
- `toJSON` 方法允许对象自定义序列化行为

**常见陷阱：**

- 使用 JSON 进行深克隆会导致数据失真（函数、Symbol、undefined 等会丢失）
- Date 对象序列化后变成字符串，需要手动转换回来
- 环形引用会导致序列化失败
- 大整数可能存在精度问题

**安全性：**

- 永远不要使用 `eval()` 解析 JSON，应该使用 `JSON.parse`
- 处理外部数据时要进行错误处理和数据验证
- 注意大型 JSON 的性能影响

JSON 常常用作网络通信的格式，但作为配置文件（如 package.json）时也存在不支持注释等不便之处。这时候可以考虑使用社区扩展方案，比如 [json5](https://json5.org/)，它支持注释、尾部逗号、单引号等更人性化的特性。

掌握这些细节知识，能够帮助你编写更健壮、更安全的代码，在实际开发中避免常见的陷阱和错误。
