---
title: String
order: 1
toc: content
group:
  title: 数据类型
---

# String

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

### JavaScript 使用哪一种编码

> ES6 以后 JavaScript 内部，字符以 `UTF-16` 的格式储存，每个字符固定为 2 个字节。对于那些需要 4 个字节储存的字符 (Unicode 码点大于 `0xFFFF` 的字符)，`JavaScript` 会认为它们是两个字符。ES6 可以自动识别 4 字节的码点。

#### 码点表示法

`JavaScript` 允许直接用码点表示 `Unicode` 字符，写法是 “反斜杠+u+码点”。

```js
'好' === '\u597D' // true
```

但是，这种表示法对 4 字节的码点无效。ES6 修正了这个问题，只要将码点放在大括号内，就能正确识别。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/unicode.png)

#### 字符串处理函数

ES6 新增了几个可以处理 4 字节码点的函数。

```js
String.fromCodePoint() // 从 Unicode 码点返回对应字符
String.prototype.codePointAt() // 从字符返回对应的码点
String.prototype.at() // 返回字符串给定位置的字符
```

#### 正则表达式

ES6 提供了 `u` 修饰符，对正则表达式添加 4 字节码点的支持。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/unicode-1.png)

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
JSON.stringify('\u{D834}') // "\u{D834}"
```

为了确保返回的是合法的 UTF-8 字符，[ES2019](https://github.com/tc39/proposal-well-formed-stringify) 改变了 `JSON.stringify()` 的行为。如果遇到 `0xD800` 到 `0xDFFF` 之间的单个码点，或者不存在的配对形式，它会返回转义字符串，留给应用自己决定下一步的处理。

```js
JSON.stringify('\u{D834}') // ""\\uD834""
JSON.stringify('\uDF06\uD834') // ""\\udf06\\ud834""
```

## 模板字符串

```js
let x = 1,
  y = 2
console.log(`${x} + ${y} = ${x + y}`) // 1 + 2 = 3

const fn = () => 'hello'
console.log(`${fn()} world`) // hello world

console.log(`hello ${'world'}`) // hello world

// 可以嵌套
// 标签模板
let a = 5
let b = 10

function tag(s, v1, v2) {
  console.log(s[0]) // 'hello '
  console.log(s[1]) // ' world '
  console.log(s[2]) // ''
  console.log(v1) // 15
  console.log(v2) // 50

  return 'OK'
}

console.log(tag`Hello ${a + b} world ${a * b}`) // OK

// 先把不需要替换的参数提出来 [ 'Hello ', ' world ', ' ' ]
// 再计算 15
// 50
// tag([ 'Hello ', ' world ', ' ' ], 15, 50)
```

## 实例方法：codePointAt()

JavaScript 内部，字符以 UTF-16 的格式储存，**每个字符固定为 2 个字节**。对于那些需要 4 个字节储存的字符 (Unicode 码点大于 0xFFFF 的字符)，JavaScript 会认为它们是两个字符。

```js
console.log('👍'.length) // 2
console.log([...'👍'].length) // 1
```

对于这种 4 个字节的字符，JavaScript 不能正确处理，字符串长度会误判为 2，而且 `charAt()` 方法无法读取整个字符，`charCodeAt()` 方法只能分别返回前两个字节和后两个字节的值。

ES6 提供了 `codePointAt()` 方法，能够正确处理 4 个字节储存的字符，返回一个字符的码点。

```js
let s = '👍a'
console.log(s.codePointAt(0).toString(16)) // 1f44d
console.log(s.codePointAt(2).toString(16)) // 61 'a'
```

`codePointAt()` 方法的参数，仍然是不正确的。比如，上面代码中，字符 a 在字符串 s 的正确位置序号应该是 1，但是必须向 `codePointAt()` 方法传入 2。

```js
for (let char of s) {
  console.log(char.codePointAt(0).toString(16))
}
```

`codePointAt()` 方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。

```js
function is32Bit(c) {
  return c.codePointAt(0) > 0xffff
}
```

## String.fromCodePoint()

ES6 提供了 `String.fromCodePoint()` 方法，可以识别大于 `0xFFFF` 的字符，弥补了 `String.fromCharCode()` 方法的不足。在作用上，正好与 `codePointAt()` 方法相反。

> 注意，fromCodePoint 方法定义在 String 对象上，而 codePointAt 方法定义在字符串的实例对象上。

## String.raw()

ES6 还为原生的 String 对象，提供了一个 `raw()` 方法。该方法**返回一个斜杠都被转义 (即斜杠前面再加一个斜杠) 的字符串**，往往用于模板字符串的处理方法。

```js
console.log(`\\`) // '\'
console.log(String.raw`\\`) // '\\'
```
