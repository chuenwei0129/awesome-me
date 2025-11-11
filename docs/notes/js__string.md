---
group:
  title: javaScript
  order: 3
title: String
toc: content
order: 4
---

## 前置知识

### ASCII 字符集

因为计算机只能存储 `0` 和 `1` 这些二进制数字。所以，无论是我们存储的数字，字母，汉字，emoji 等各种文字都需要由某种方式转换成二进制数字进行储存，需要的时候在读出来。

最早的计算机在设计时采用 8 个 bit 作为一个 byte。一个字节一共可以用来表示 `2^8` 种不同的状态，每一个状态对应一个字符，就是 256 个字符，从 `00000000` 到 `11111111`。

1963 年 ANSI (美国国家标准协会) 推出了 ASCII (文本字符编码标准) 码表。规定了文字与数字的一一对应。ASCII 支持的字符包含 0-9 的阿拉伯数字，小写英文字母，大写英文字母，常用英文符号，控制字符 (换行、回车等特殊的控制功能)。如下图：

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/ascii.png)

**每个字符都有一个对应的数字，叫做码点 (code point)，也称为码位。**

ASCII 字符的码点是 0-127 之间的数字。比如大写字母 A 对应数字 65，大写字母 B 对应数字 66。**所有字符和对应码点的集合就叫做字符集**。也可以理解为一个字符与一个数字一一对应的一个映射表。

计算机内部使用的是二进制运算。所以**编号 (也就是码点)** 并不是最终存储在计算机中的结果。计算机需要把码点转换为二进制存储起来。计算机底层的二进制码点通过字符集转换成屏幕上有意义的字符。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/SCR-20220808-kw2.png)

**我们将码点转换为计算机里存储的二进制码点 (也称字节序列) 的规则就称为字符编码。**

### Unicode 字符集

因为 `ASCII` 编码无法表示多国语言的编码，每个国家为了使计算机能够显示当地语言和字符，也纷纷设计出了各种字符集和字符编码规则。当标准不统一的时候，乱码问题也就随之产生了。因为计算机内存里的同一个二进制数字在不同的字符集里代表的可能是完全不同的字符。如下图：

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/SCR-20220808-kxz.png)

为了统一所有文字的编码，`Unicode` 应运而生。`Unicode` 把所有语言都统一到一套编码里，这样就不会再有乱码问题了。

**对于 `Unicode` 有一些误解，它仅仅只是一个字符集，规定了符合对应的二进制代码，至于这个二进制代码如何存储则没有任何规定。**

`Unicode` 只规定了每个字符的码点，到底用什么样的字节序表示这个码点，就涉及到编码方法。

`Unicode` 编码共有三种具体实现，分别为 `utf-8`，`utf-16`，`utf-32`。

**整个 Unicode 字符集的大小现在是 `2^21`。**

### 编码

> <https://www.bilibili.com/video/BV11e4y1W7CF?p=8>

## JavaScript 使用哪一种编码

> JavaScript 内部，字符以 `UTF-16` 的格式储存。对于 BMP（基本多文种平面，U+0000 到 U+FFFF）内的字符，使用 2 个字节表示；对于 BMP 之外的字符（码点大于 `0xFFFF`），使用代理对（surrogate pair）表示，占用 4 个字节。ES6 之前，JavaScript 会把 4 字节字符当作两个字符处理。ES6 提供了新的方法来正确处理这些字符。

### 码点表示法

`JavaScript` 允许直接用码点表示 `Unicode` 字符，写法是 “反斜杠+u+码点”。

```js
'好' === '\u597D'; // true
```

但是，这种表示法对 4 字节的码点无效。ES6 修正了这个问题，只要将码点放在大括号内，就能正确识别。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/unicode.png)

### 字符串处理函数

ES6 新增了几个可以处理 4 字节码点的函数。

```js
String.fromCodePoint(); // 从 Unicode 码点返回对应字符
String.prototype.codePointAt(); // 从字符返回对应的码点
String.prototype.at(); // 返回字符串给定位置的字符
```

### 正则表达式

ES6 提供了 `u` 修饰符，对正则表达式添加 4 字节码点的支持。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/unicode-1.png)

## 字符串基础

### 字符串的不可变性

在 JavaScript 中，字符串是不可变的（immutable）。这意味着一旦字符串被创建，就无法修改它的内容。所有的字符串方法都会返回新的字符串，而不会改变原字符串。

```js
let str = 'hello';
str[0] = 'H'; // 无效操作
console.log(str); // 'hello' (原字符串未改变)

// 字符串方法返回新字符串
let newStr = str.toUpperCase();
console.log(str); // 'hello' (原字符串未改变)
console.log(newStr); // 'HELLO' (返回新字符串)
```

### 字符串的创建

```js
// 字面量方式（推荐）
const str1 = 'hello';
const str2 = "world";

// 构造函数方式（不推荐）
const str3 = new String('hello');
console.log(typeof str1); // 'string'
console.log(typeof str3); // 'object'
```

### 字符串的长度

```js
const str = 'hello';
console.log(str.length); // 5

// 注意：对于超出 BMP 的字符，length 会计算编码单元数，而不是字符数
console.log('👍'.length); // 2 (一个 emoji 占用 2 个编码单元)
console.log([...'👍'].length); // 1 (使用扩展运算符可以正确计算字符数)
```

## [拓展：Base64 编码](https://abcdxyzk.github.io/blog/2023/01/30/mail-base64/)

> [丢人了，我居然不知道 Base64 编码的原理](https://www.bilibili.com/video/BV1xy4y187MF)

## 直接输入 U+2028 和 U+2029

JavaScript 规定有 5 个字符，不能在字符串里面直接使用，只能使用转义形式。

- **U+005C**：反斜杠 (reverse solidus)
- **U+000D**：回车 (carriage return)
- **U+2028**：行分隔符 (line separator)
- **U+2029**：段分隔符 (paragraph separator)
- **U+000A**：换行符 (line feed)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/SCR-20220808-mne.png)

为了兼容 JSON，ES2019 允许 JavaScript 字符串直接输入 U+2028 (行分隔符) 和 U+2029 (段分隔符)。

> 注意，模板字符串现在就允许直接输入这两个字符。另外，正则表达式依然不允许直接输入这两个字符，这是没有问题的，因为 JSON 本来就不允许直接包含正则表达式。

## JSON.stringify 的改造

根据标准，JSON 数据必须是 UTF-8 编码。但是，现在的 `JSON.stringify()` 方法有可能返回不符合 UTF-8 标准的字符串。

具体来说，UTF-8 标准规定，`0xD800` 到 `0xDFFF` 之间的码点，不能单独使用，必须配对使用。比如，`\uD834\uDF06` 是两个码点，但是必须放在一起配对使用，代表字符 `𝌆`。这是为了表示码点大于 `0xFFFF` 的字符的一种变通方法。单独使用 `\uD834` 和 `\uDF06` 这两个码点是不合法的，或者颠倒顺序也不行，因为 `\uDF06\uD834` 并没有对应的字符。

`JSON.stringify()` 的问题在于，它可能返回 `0xD800` 到 `0xDFFF` 之间的单个码点。

```js
JSON.stringify('\u{D834}'); // "\u{D834}"
```

为了确保返回的是合法的 UTF-8 字符，[ES2019](https://github.com/tc39/proposal-well-formed-stringify) 改变了 `JSON.stringify()` 的行为。如果遇到 `0xD800` 到 `0xDFFF` 之间的单个码点，或者不存在的配对形式，它会返回转义字符串，留给应用自己决定下一步的处理。

```js
JSON.stringify('\u{D834}'); // ""\\uD834""
JSON.stringify('\uDF06\uD834'); // ""\\udf06\\ud834""
```

## 常用字符串方法

### 查找和检测

```js
const str = 'Hello World';

// 查找子字符串的位置
str.indexOf('o'); // 4 (返回第一次出现的索引)
str.lastIndexOf('o'); // 7 (返回最后一次出现的索引)
str.indexOf('x'); // -1 (未找到返回 -1)

// 检测是否包含子字符串 (ES6)
str.includes('World'); // true
str.startsWith('Hello'); // true
str.endsWith('World'); // true
```

### 截取和提取

```js
const str = 'Hello World';

// slice(start, end) - 提取字符串片段，支持负索引
str.slice(0, 5); // 'Hello'
str.slice(6); // 'World'
str.slice(-5); // 'World'

// substring(start, end) - 类似 slice，但不支持负索引
str.substring(0, 5); // 'Hello'

// substr(start, length) - 已废弃，不推荐使用
```

### 转换和修改

```js
const str = '  Hello World  ';

// 大小写转换
str.toUpperCase(); // '  HELLO WORLD  '
str.toLowerCase(); // '  hello world  '

// 去除空白字符
str.trim(); // 'Hello World'
str.trimStart(); // 'Hello World  ' (ES2019)
str.trimEnd(); // '  Hello World' (ES2019)

// 替换
str.replace('World', 'JavaScript'); // '  Hello JavaScript  '
str.replaceAll('l', 'L'); // '  HeLLo WorLd  ' (ES2021)
```

### 重复和填充

```js
// 重复字符串 (ES6)
'abc'.repeat(3); // 'abcabcabc'

// 填充字符串 (ES2017)
'5'.padStart(3, '0'); // '005'
'5'.padEnd(3, '0'); // '500'
```

### 分割

```js
// split() - 将字符串分割为数组
'a,b,c'.split(','); // ['a', 'b', 'c']
'hello'.split(''); // ['h', 'e', 'l', 'l', 'o']
```

## 模板字符串

### 基本用法

```js
let x = 1,
  y = 2;
console.log(`${x} + ${y} = ${x + y}`); // 1 + 2 = 3

const fn = () => 'hello';
console.log(`${fn()} world`); // hello world

console.log(`hello ${'world'}`); // hello world
```

### 多行字符串

模板字符串可以保留换行和空格，非常适合书写多行文本：

```js
const html = `
  <div>
    <h1>Title</h1>
    <p>Content</p>
  </div>
`;
```

### 嵌套使用

模板字符串可以嵌套：

```js
const names = ['Alice', 'Bob'];
console.log(`Users: ${names.map(name => `<${name}>`).join(', ')}`);
// Users: <Alice>, <Bob>
```

### 标签模板

标签模板是模板字符串的高级形式，允许你使用函数解析模板字符串。

```js
// 标签函数的调用过程：
// 1. 将模板字符串中的非变量部分提取为数组：['Hello ', ' world ', '']
// 2. 计算变量表达式的值：15 和 50
// 3. 调用标签函数：tag(['Hello ', ' world ', ''], 15, 50)

let a = 5;
let b = 10;

function tag(strings, v1, v2) {
  console.log(strings[0]); // 'Hello '
  console.log(strings[1]); // ' world '
  console.log(strings[2]); // ''
  console.log(v1); // 15
  console.log(v2); // 50

  return 'OK';
}

console.log(tag`Hello ${a + b} world ${a * b}`); // OK
```

## 实例方法：codePointAt()

JavaScript 内部，字符以 UTF-16 的格式储存。对于 **BMP 内的字符使用 2 个字节表示**，对于需要 4 个字节储存的字符（Unicode 码点大于 0xFFFF 的字符），JavaScript 使用代理对表示，会将其视为两个编码单元。

```js
console.log('👍'.length); // 2
console.log([...'👍'].length); // 1
```

对于这种 4 个字节的字符，JavaScript 不能正确处理，字符串长度会误判为 2，而且 `charAt()` 方法无法读取整个字符，`charCodeAt()` 方法只能分别返回前两个字节和后两个字节的值。

ES6 提供了 `codePointAt()` 方法，能够正确处理 4 个字节储存的字符，返回一个字符的码点。

```js
let s = '👍a';
console.log(s.codePointAt(0).toString(16)); // 1f44d (👍 的码点)
console.log(s.codePointAt(2).toString(16)); // 61 (字符 'a' 的码点)
```

`codePointAt()` 方法的参数是基于编码单元（2 字节）的索引，而不是基于字符的索引。比如上面代码中，字符 `a` 的逻辑位置是第 2 个字符，但由于 `👍` 占用了 2 个编码单元（索引 0 和 1），所以 `a` 的索引是 2。

使用 `for...of` 循环可以正确遍历每个字符：

```js
for (let char of s) {
  console.log(char.codePointAt(0).toString(16));
}
```

`codePointAt()` 方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。

```js
function is32Bit(c) {
  return c.codePointAt(0) > 0xffff;
}
```

## String.fromCodePoint()

ES6 提供了 `String.fromCodePoint()` 方法，可以识别大于 `0xFFFF` 的字符，弥补了 `String.fromCharCode()` 方法的不足。在作用上，正好与 `codePointAt()` 方法相反。

```js
// String.fromCharCode() 无法正确处理大于 0xFFFF 的码点
String.fromCharCode(0x20bb7); // "ஷ" (错误)

// String.fromCodePoint() 可以正确处理
String.fromCodePoint(0x20bb7); // "𠮷" (正确)
String.fromCodePoint(0x78, 0x1f680, 0x79); // "x🚀y"
```

> 注意，`fromCodePoint()` 方法定义在 String 对象上，而 `codePointAt()` 方法定义在字符串的实例对象上。

## String.raw()

ES6 还为原生的 String 对象，提供了一个 `raw()` 方法。该方法**返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串**，往往用于处理模板字符串。

```js
// 普通字符串会解析转义字符
console.log(`\n`); // 换行符

// String.raw() 返回原始字符串，不会解析转义字符
console.log(String.raw`\n`); // '\\n'

// 对比
console.log(`\\`); // '\' (一个反斜杠)
console.log(String.raw`\\`); // '\\' (两个反斜杠)

// 实际应用：处理文件路径
const path = String.raw`C:\Users\Documents\file.txt`;
console.log(path); // 'C:\\Users\\Documents\\file.txt'
```
