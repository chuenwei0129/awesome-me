---
group:
  title: javaScript
  order: 3
title: String 字符串全解
toc: content
order: 4
---

## 1. 前置知识：字符编码

要深入理解 JavaScript 的字符串，必须先弄清楚“字符是如何变成 0 和 1 被存储的”。

### ASCII 字符集

计算机底层只能存储 `0` 和 `1`。为了存储文字，我们需要一张**码表**，把“字符 ↔ 数字”对应起来。

1963 年 ANSI 推出了 **ASCII (American Standard Code for Information Interchange)** 码表。

- **范围**：使用 7 个 bit 表示，包含 128 个字符（0–127）。
- **内容**：数字 0–9、英文字母、常用标点符号及控制字符（换行、回车等）。

> 虽然现在的字节（Byte）通常是 8 位（0–255），但标准 ASCII 仅使用了低 7 位。

### Unicode 字符集与码点

随着计算机普及，ASCII 不足以表示中文、日文等多国语言。各国纷纷推出自己的编码（如 GBK、Shift-JIS），互相之间不兼容，导致常见的**乱码**问题。

**Unicode** 的目标是：**为世界上所有字符分配一个统一的编号**。

- **码点 (Code Point)**：Unicode 为每个字符分配一个唯一的整数编号。
  - 比如：“好”的码点是十进制 `22909`，十六进制是 `0x597D`，写作 `U+597D`。
- **字符集 vs 编码方式**：
  - Unicode 是一个**字符集 / 码点空间**，规定“字符 ↔ 码点”的映射。
  - 它并不规定这些码点在机器上具体用几个字节、什么格式存储。

Unicode 规定的码点范围是 `U+0000` ~ `U+10FFFF`，被分成多个“平面（Plane）”，其中最常见的是 **BMP（Basic Multilingual Plane，基本多文种平面）**，范围为 `U+0000` ~ `U+FFFF`。

### 字符编码方式 (UTF)

真正落地到内存/网络时，还需要一种具体的“码点 → 字节”规则，这就是 **UTF (Unicode Transformation Format)**。

常见的 UTF 编码有：

- **UTF-8**
  - 变长编码：1–4 字节。
  - ASCII 字符用 1 字节，其他字符用 2–4 字节。
  - 互联网最通用的文本编码（HTML、JSON、HTTP 默认几乎都用 UTF‑8）。
- **UTF-16**
  - 变长编码：2 或 4 字节。
  - BMP 内字符用 2 字节；超出 BMP 的用 4 字节（通过代理对表示）。
  - 与 JavaScript 字符串的“外部行为”密切相关。
- **UTF-32**
  - 定长编码：4 字节，编码和遍历简单，但浪费空间。

### UCS-2 与 UTF-16 的关系（顺带为 JS 铺垫）

历史上有一个编码叫 **UCS-2**：它只用 2 字节表示字符，假定所有字符都在 BMP 内。后来 Unicode 扩展到了 `U+10FFFF`，引入了更高的平面，UCS-2 无法容纳这些字符，于是发展出了 **UTF‑16**，使用“代理对（surrogate pair）”来表示超出 BMP 的字符。

很多老资料会说“JS 使用 UCS‑2”，更准确地说：

- **规范层面**：字符串由一串 16 位编码单元组成，行为与 UTF‑16 的编码单元一致。
- **实务上**：可以把 JS 字符串理解为“UTF‑16 编码单元序列”。

> 后文出现的“编码单元（code unit）”、“代理对（surrogate pair）”、“码点（code point）”等概念，都和 UTF‑16 的设计紧密相关。

---

## 2. JavaScript 的字符串实现

### 核心模型：16 位编码单元（UTF‑16 行为）

在 ECMAScript 规范中，字符串被定义为一串 16 位的 **编码单元（code unit）**。

- 对于 **BMP（基本多文种平面）** 内的字符：
  - 码点在 `U+0000` ~ `U+FFFF` 之间。
  - 用 **1 个 16 位编码单元** 表示（通常说“2 个字节”）。
  - 绝大多数常用字符（中文、英文、常见符号）都在 BMP 中。
- 对于 **辅助平面** 的字符（超出 BMP）：
  - 码点大于 `U+FFFF`，例如某些 Emoji 👍、生僻汉字 𠮷。
  - 使用 **2 个 16 位编码单元** 组合表示，这两个编码单元就是一组**代理对（surrogate pair）**。

> 标准并不强制引擎内部一定用 UTF‑16 存储字符串，但对外暴露的行为与 UTF‑16 编码单元完全一致，你可以放心地按 UTF‑16 模型来理解 JS 字符串。

### 码点表示法（`\uXXXX` 与 `\u{XXXXX}`）

在 JS 字符串字面量中，可以直接使用 Unicode 码点语法：

```javascript
// ES5 写法（仅支持 BMP 字符）
console.log('\u597D'); // "好"

// ES6+ 写法（支持所有 Unicode 码点，使用大括号）
console.log('\u{1F44D}'); // "👍"
```

- `\uXXXX`：只支持 4 位十六进制，即 BMP 范围；超出 BMP 的字符需要手动写成代理对。
- `\u{XXXXX}`：可支持任意有效码点，推荐写法。

---

## 3. 字符串的创建方式与类型

### 字符串字面量与转义

常见的字符串字面量形式：

```javascript
const s1 = 'single quotes';
const s2 = 'double quotes';
const s3 = `template string`; // ES6+
```

常见的转义序列：

```javascript
const s = 'line1\nline2\tindent\\backslash\'quote"double';
```

- `\n`：换行
- `\t`：制表符
- `\\`：反斜杠本身
- `\'` / `\"`：在对应引号内表示字面量引号

### 原始值字符串 vs `String` 对象

JavaScript 中的字符串有两种形态：

```javascript
const primitive = 'hello';
const obj = new String('hello');

typeof primitive; // 'string'
typeof obj; // 'object'
```

- **原始值字符串**（primitive）：`'abc'`、`"abc"`、`` `abc` ``。
- **包装对象**（`String` 对象）：通过 `new String()` 创建，不推荐使用。

推荐做法：

- 平时只使用字符串字面量或 `String(value)` 转换；
- 避免 `new String()`，因为它是对象，`===`、布尔判断、`typeof` 等行为都与原始值不同，容易引入 bug。

---

## 4. 字符串的不可变性（Immutable）

字符串一旦创建，其内容就不能被原地修改。任何看似“修改”字符串的操作，其实都是生成了一个新的字符串。

```javascript
let str = 'hello';

str[0] = 'H'; // ❌ 无效；非严格模式下不会报错，但也不会生效
console.log(str); // 'hello'

const upper = str.toUpperCase(); // ✅ 返回新字符串
console.log(upper); // 'HELLO'
console.log(str); // 'hello'，原始字符串不变
```

常见影响：

- 在循环中频繁做 `str += piece` 实际上会不断创建新字符串（现代引擎已做优化，多数场景可接受）。
- 想“原地修改”的思想在 JS 字符串上是行不通的，要用“构造新字符串”的思路。

---

## 5. 字符串基础 API 全景图

这一节覆盖最常用的基础操作：查找、截取、修改、拆分、匹配等。

### 5.1 查找与检测

```javascript
const str = 'Hello World';

// ES6+ 推荐
str.includes('World'); // true
str.startsWith('He'); // true
str.endsWith('ld'); // true

// 传统索引查找
str.indexOf('o'); // 4（找第一个）
str.lastIndexOf('o'); // 7（找最后一个）

// 使用正则查找位置
'abc123'.search(/\d/); // 3，首个匹配数字的位置
```

### 5.2 截取与切片

- **推荐**：`slice(start, end)`，支持负数索引，语义清晰。
- **备选**：`substring(start, end)`，不支持负数，下标会自动交换，小心困惑。
- **不建议使用**：`substr(start, length)`，规范中已标记为弃用，但历史代码中仍然常见。

```javascript
const str = 'JavaScript';

console.log(str.slice(0, 4)); // 'Java'
console.log(str.slice(-6)); // 'Script'

// substring 的“互换参数”行为
console.log(str.substring(4, 0)); // 'Java'（会自动把较小的当作 start）
```

### 5.3 修改与替换

```javascript
const str = '  hello world  ';

// 去除两端空白
str.trim(); // 'hello world'
str.trimStart(); // 'hello world  '
str.trimEnd(); // '  hello world'

// 替换：只替换第一个匹配
'hello world'.replace('world', 'JS'); // 'hello JS'

// 全部替换（ES2021）
'aba'.replaceAll('a', 'A'); // 'AbA'

// 兼容写法：使用正则 + g
'aba'.replace(/a/g, 'A'); // 'AbA'

// 重复
'na'.repeat(3); // 'nanana'

// 补全（常用于时间格式化/编号等）
'5'.padStart(2, '0'); // '05'
'12'.padEnd(5, 'x'); // '12xxx'
```

### 5.4 拆分与匹配

```javascript
const line = '  hello,world,JS  ';

// 拆分
line.trim().split(','); // ['hello', 'world', 'JS']

// 简单匹配（非全局时，返回第一个匹配及分组）
'JS ES6 ES2021'.match(/ES\d+/);
// ['ES6', index: 3, input: 'JS ES6 ES2021', ...]

// 全部匹配（ES2020+，返回迭代器）
const text = 'JS ES6 ES2021';
const reg = /ES\d+/g;
for (const m of text.matchAll(reg)) {
  console.log(m[0]); // 'ES6', 'ES2021'
}
```

> 提示：`match` 在带 `g` 标志时返回匹配到的字符串数组；不带 `g` 标志时返回“包含分组”的详细信息。

### 5.5 大小写转换

```javascript
'Hello'.toLowerCase(); // 'hello'
'Hello'.toUpperCase(); // 'HELLO'

// 本地化大小写（某些语言有特殊规则）
'istanbul'.toLocaleUpperCase('tr'); // 土耳其语环境下会有不同结果
```

---

## 6. 字符串长度陷阱与 Unicode

### 6.1 `length` 统计的是“编码单元数量”

由于 JS 使用 16 位编码单元，`length` 属性统计的是**编码单元数量**，而不是“用户眼中的字符数量”。

```javascript
const s = 'hello';
console.log(s.length); // 5

const emoji = '👍';
console.log(emoji.length); // 2：一个代理对，占用两个编码单元

const family = '👨‍👩‍👧‍👦';
console.log(family.length); // 例如 11，一个“图标”由多段码点 + 零宽连接符组成
```

### 6.2 如何正确获取“字符长度”？

#### 简单方案（码点级）：扩展运算符 / `Array.from`

扩展运算符和 `Array.from` 在字符串上基于默认迭代器，是“码点感知”的，能正确处理大多数代理对。

```javascript
const emoji = '👍';
[...emoji].length; // 1
Array.from('👍a').length; // 2
```

> 但注意：一些复杂的组合字符（多重重音、复杂 emoji 组合）虽然由多个码点组成，视觉上是“一个字符”，这时 `Array.from` 仍然会计为多个。

#### 更精确方案（grapheme 级）：`Intl.Segmenter`（ES2022+）

`Intl.Segmenter` 按 **grapheme（书写簇 / 视觉单元）** 对字符串分段，能正确处理复杂组合，比如 👨‍👩‍👧‍👦。

```javascript
const family = '👨‍👩‍👧‍👦';

const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });

console.log(family.length); // 比如 11（编码单元数量）
console.log([...segmenter.segment(family)].length); // 1（用户看到的“一个图标”）
```

一个兼容性较好的封装：

```javascript
function graphemeLength(str) {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const seg = new Intl.Segmenter('en', { granularity: 'grapheme' });
    return [...seg.segment(str)].length;
  }
  // 回退：码点级计数，比直接 length 更好
  return Array.from(str).length;
}
```

---

## 7. 遍历字符串：下标 vs `for...of`

对于包含 Emoji 或生僻字的字符串，不要用“按下标访问”的方式（那是按编码单元），而应使用 `for...of`，它基于默认迭代器，是**码点感知**的。

```javascript
const text = '👍a';

// 按下标访问：拿到的是“半个 emoji”
console.log(text[0]); // 一个单独的代理单元，显示效果依环境而定
console.log(text[1]); // 另一个代理单元
console.log(text.length); // 3：👍(2) + a(1)

// 正确遍历方式
for (const ch of text) {
  console.log(ch); // 依次输出 '👍', 'a'
}
```

> 小结：
>
> - `str[i]` / `charAt(i)`：按“编码单元”取值，不适合处理 emoji 等 4 字节字符。
> - `for...of` / `Array.from`：按“码点”迭代，能正确遍历大多数情况。

---

## 8. 码点 API：`codePointAt` 与 `fromCodePoint`

ES6 为了解决 4 字节字符的问题引入了 `codePointAt` 和 `fromCodePoint`，对应旧的 `charCodeAt` 和 `fromCharCode`。

```javascript
// 获取码点
const s = '𠮷';
console.log(s.length); // 2（代理对）

console.log(s.codePointAt(0).toString(16)); // '20bb7'：正确的码点
console.log(s.charCodeAt(0).toString(16)); // 'd842'：高位代理
console.log(s.charCodeAt(1).toString(16)); // 'dfb7'：低位代理

// 从码点生成字符
String.fromCodePoint(0x20bb7); // '𠮷'
String.fromCharCode(0xd842, 0xdfb7); // '𠮷'（手工传入代理对）
```

- 推荐优先使用 `codePointAt` / `fromCodePoint`；
- 只有在明确知道自己处理的是 BMP 范围的字符（如纯英文、数字）时，使用 `charCodeAt` / `fromCharCode` 才相对安全。

---

## 9. 排序与大小写：`localeCompare` 与本地化

### 9.1 `localeCompare` 比较字符串顺序

`localeCompare` 用于比较两个字符串在特定语言环境（locale）下的顺序，比如中文拼音排序：

```javascript
const list = ['张三', '李四', '王五'];

// 默认排序可能不符合拼音习惯
list.sort((a, b) => a.localeCompare(b, 'zh-CN'));
console.log(list); // ['李四', '王五', '张三']
```

还可以控制敏感度（大小写、重音符号等）：

```javascript
'a'.localeCompare('A', 'en', { sensitivity: 'base' }); // 0（认为相等）
'a'.localeCompare('A', 'en', { sensitivity: 'case' }); // > 0 或 < 0，视实现而定
```

### 9.2 本地化大小写转换

搭配 `toLocaleLowerCase` / `toLocaleUpperCase` 可以在某些特定语言中避免“看起来正确但实际不合规范”的大小写转换问题（例如土耳其语的 i/I 变体）。

---

## 10. 正则与 Unicode：`u` 标志与 `\p{}`

在处理多语言文本时，正则同样需要“Unicode 感知能力”。

### 10.1 `u` 标志：让正则按码点工作

不带 `u` 标志时，正则引擎也是按 16 位编码单元工作的：

```javascript
// 一个典型例子：点号匹配“任意单个字符”
/^.$/.test('👍'); // false：emoji 被拆成两个编码单元
/^.$/u.test('👍'); // true：按 Unicode 码点匹配
```

### 10.2 Unicode 属性转义 `\p{...}`（ES2018+）

`u` 标志配合 `\p{属性=值}` 可以按“脚本/类别”等属性匹配字符：

```javascript
// 匹配一串汉字
const han = /\p{Script=Han}+/u;
han.test('你好'); // true
han.test('hello'); // false
```

常见用法包括：

- `\p{Letter}` / `\p{Number}` / `\p{Punctuation}` 等；
- `\p{Script=Latin}`、`\p{Script=Han}` 等按文字系统划分。

> 注意：
>
> - `\p{...}` 和 `u` 标志需要较新的引擎支持；
> - 旧环境中要么通过 Babel 等工具转换，要么退回传统正则方案。

---

## 11. 字符串归一化（`normalize`）

同一个“看起来一样”的字符，在 Unicode 中可能有不同的内部表示方式，比如 `é`：

- 单个码点：`\u00E9`（预组字符，NFC）
- 组合形式：`'e' + '\u0301'`（字母 e + 组合重音符）

```javascript
const a = '\u00E9'; // é（预组字符）
const b = 'e\u0301'; // e + 组合重音

console.log(a === b); // false

// 归一化后比较
a.normalize('NFC') === b.normalize('NFC'); // true
```

在以下场景中，建议对字符串先进行归一化处理：

- 去重（set/去重列表）；
- 作为键存储（对象属性/Map Key 等）；
- 做精确比较（登录名、标签名等）。

---

## 12. 模板字符串（Template Strings）

### 12.1 基础用法

模板字符串支持变量插入和多行文本，极大提高了可读性和开发效率。

```javascript
const name = 'Gemini';
const html = `
  <div>
    <h1>Hello, ${name}</h1>
  </div>
`;

console.log(html);
```

特点：

- 支持多行；
- 支持 `${expr}` 嵌入任何 JS 表达式；
- 本质上仍然是普通字符串类型。

### 12.2 标签模板（Tagged Templates）

标签模板允许自定义模板字符串的解析行为。常见场景：

- **CSS-in-JS**（如 styled-components）；
- **HTML 安全转义**（防止 XSS 注入）；
- i18n（国际化）格式化。

下面示例演示一个简单的 HTML 文本转义函数（演示用，不是完整安全方案）：

```javascript
function safeHtml(strings, ...values) {
  let result = strings[0];
  for (let i = 0; i < values.length; i++) {
    let val = String(values[i]);
    // 简单的 HTML 文本转义：
    // 注意顺序：先处理 &，再处理 < 和 >
    val = val
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    result += val + strings[i + 1];
  }
  return result;
}

const userInput = '<script>alert("xss")</script>';
const output = safeHtml`User comment: ${userInput}`;

console.log(output);
// 输出: User comment: &lt;script&gt;alert("xss")&lt;/script&gt;
```

> 注意：
>
> - 这个 `safeHtml` 只演示标签模板的用法，不是完整的 XSS 防护方案；
> - 实际安全转义需要覆盖更多字符和上下文（HTML 文本、HTML 属性、URL、JS 字符串等），建议使用成熟库。

---

## 13. 拓展：Base64 编码与 Unicode

Base64 是一种将二进制数据编码为 ASCII 字符串的方法，常用于：

- 在 URL、邮件等场景中传输二进制数据；
- 在 HTML/CSS 中通过 data URL 内嵌图片；
- 简单的“不可见”编码（注意：**不是**加密）。

### 13.1 浏览器中的 `btoa` / `atob`

在浏览器环境中有两个原生方法：

- `btoa()`：Binary to ASCII（编码）；
- `atob()`：ASCII to Binary（解码）。

它们期望的输入/输出都是“每个字符代表一个 0–255 范围的字节”的字符串。直接处理包含中文的字符串会抛错：

```javascript
const str = '你好';

// ❌ 直接编码会报错（InvalidCharacterError）
// btoa(str);

// ✅ 方案 1：URI 编码（UTF-8）再 Base64（演示用）
const base64 = btoa(encodeURIComponent(str));
console.log(base64); // JUU0JUJEJUEwJUU1JUE1JUJE

const original = decodeURIComponent(atob(base64));
console.log(original); // '你好'
```

### 13.2 更严谨方案：`TextEncoder` / `TextDecoder`

如果运行环境支持 `TextEncoder` / `TextDecoder`（现代浏览器、Node.js 12+ 等），更推荐基于真实 UTF‑8 字节来做 Base64：

```javascript
const encoder = new TextEncoder();
const decoder = new TextDecoder();

// 字符串 -> Base64
function toBase64(str) {
  const bytes = encoder.encode(str); // UTF-8 字节
  let binary = '';
  for (const b of bytes) {
    binary += String.fromCharCode(b);
  }
  return btoa(binary);
}

// Base64 -> 字符串
function fromBase64(base64) {
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
  return decoder.decode(bytes);
}

const s = '你好，世界';
const b64 = toBase64(s);
console.log(b64);
console.log(fromBase64(b64)); // '你好，世界'
```

### 13.3 Node.js 环境：直接用 `Buffer`

在 Node.js 环境中，更推荐使用 `Buffer` 原生支持：

```javascript
// 字符串 -> Base64
const b64 = Buffer.from('你好，世界', 'utf8').toString('base64');

// Base64 -> 字符串
const str = Buffer.from(b64, 'base64').toString('utf8');
```

> 提示：Node 中没有 `btoa` / `atob`（除非你自己 polyfill），不要直接照搬浏览器的用法。

---

## 14. 深入理解：JSON 的“变身”之旅

JSON 本质上是**一段文本**，但在“网络传输”和“JS 内存”中，它的形态是不一样的。
可以把它想象成一个快递包裹：**路上为了省空间要打包成紧凑的编码（常用 UTF‑8），到了家里为了好用要拆封成 JS 字符串（UTF‑16 代码单元）**。

### 1. JSON 的三个形态

当你在代码里写 `fetch('/api/data')` 时，数据大致经历了三次“变身”：

1. **形态一：紧凑的字节流（通常用 UTF‑8 编码的文本）**

   - **场景**：在网线上传输，或者躺在硬盘的文件里。
   - **特点**：非常省空间。比如英文只占 1 个字节，中文通常占 3 个字节。
   - 从机器视角看，此时它只是一堆 `0` 和 `1`，还只是“字节”，JS 代码还读不懂它代表什么。

2. **形态二：JS 字符串（UTF‑16 代码单元）**

   - **场景**：浏览器/运行时把字节数据接收进来，并根据 `Content-Type` 的编码（通常是 UTF‑8）解码成字符串。
   - **特点**：变成了 JavaScript 熟悉的“字符串”形式。
     概念上可以理解为：内部以 **16 位编码单元（code unit）** 存储，通常你可以把它当成 UTF‑16 字符串来看。
   - 这个时候内存占用变大了，但你可以用 `substring`、`length` 等操作它了（注意：对 emoji 等字符，`length` 不一定等于“人眼看到的字符数”）。

3. **形态三：JS 对象（Object）**
   - **场景**：调用 `JSON.parse()` 之后。
   - **特点**：JSON 字符串被解析成了真正的 JS 对象，你可以用点语法（`.name`）或下标语法（`[key]`）访问其中的数据。

> 小结：**字节流 → 字符串 → 对象**，这是 JSON 在前端世界最常见的三段式旅程。

### 2. 实战中的转换流程

#### 2.1 自动挡（推荐）

现代 API（如 `fetch`）非常省心，通过 `.json()` 方法可以把上面三步一气呵成：

```javascript
fetch('/data.json')
  .then((response) => response.json())
  // 内部大致完成：
  // 1）网络字节 -> 按 charset 解码成字符串
  // 2）字符串 -> JSON.parse -> JS 对象
  .then((data) => {
    console.log(data); // 直接拿到 JS 对象
  });
```

补充两种常用的“半自动挡”：

```javascript
// 拿到字符串（形态二）
fetch('/data.json')
  .then((res) => res.text())
  .then((text) => {
    console.log(text); // 纯字符串
  });

// 拿到原始字节（形态一）
fetch('/data.bin')
  .then((res) => res.arrayBuffer())
  .then((buffer) => {
    console.log(buffer); // ArrayBuffer / Uint8Array 等
  });
```

#### 2.2 手动挡（为了理解底层）

如果我们把过程拆开，看看底层究竟发生了什么：

```javascript
// 用 TextEncoder 模拟“服务器发来的 UTF-8 字节流”
// 内容是一段 JSON 文本：{"text":"测试"}
const encoder = new TextEncoder();
const serverBytes = encoder.encode('{"text":"测试"}');

// 第一步：解码（拆包裹）
// 浏览器把 UTF-8 字节 -> 解码成 JS 能理解的字符串（UTF-16 代码单元）
const decoder = new TextDecoder('utf-8');
const jsonText = decoder.decode(serverBytes);
console.log(jsonText); // 输出：{"text":"测试"}

// 第二步：解析（使用包裹里的东西）
// JSON.parse 读取 JSON 字符串，生成 JS 对象
const obj = JSON.parse(jsonText);
console.log(obj.text); // "测试"
```

在真实网络场景中，这些步骤由浏览器和 `fetch` 帮你自动完成，你只需要决定用 `.json()` / `.text()` / `.arrayBuffer()` 拿到你想要的形态即可。

### 3. 两个重要的避坑指南

#### 3.1 乱码是怎么来的？

乱码通常出在“解码”这一步：**用错了字符集解码字节流**。

- 例子：明明是 UTF‑8 字节，却强行按 GBK 去解码，就会得到一堆看不懂的文字。
- 好消息：在 Web API 里，JSON 基本默认就是 UTF‑8，浏览器会根据响应头自动选择编码，通常不需要你手动干预。

**前端发送 JSON 时的习惯用法**：

- 把编码写清楚，方便后端按正确方式解码（尤其是历史系统中还存在 GBK 等编码时）：

```javascript
fetch('/api/save', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  body: JSON.stringify({ text: '测试' }),
});
```

**后端返回 JSON 时**，也应设置类似的响应头：

```http
Content-Type: application/json; charset=utf-8
```

前后端都对齐 UTF‑8，大部分乱码问题就被扼杀在摇篮里了。

#### 3.2 JSON.stringify 的安全升级（ES2019）

前面提到过，JS 字符串内部是 UTF‑16 代码单元。
在某些极端情况下，字符串里可能存在“不完整的代理对”（只有半个代理的“坏字符”）。

- **ES2019 之前**：

  - `JSON.stringify` 遇到这种“孤立代理码点”时，会直接把它原样放进结果字符串里。
  - 结果就是：生成的 JSON 文本在某些环境下可能不是“合法的 UTF‑8/UTF‑16”，后端解析或传输过程中可能出问题。

- **ES2019 的改进**：
  - 规范要求：`JSON.stringify` 遇到这种坏字符时，**必须以 `\uXXXX` 的形式进行转义输出**。
  - 这样生成的 JSON 文本在编码层面始终是“干净”的，传输链路不会因为这些“脏字符”而崩掉。

一句话总结：

> 在现代 JS 环境里，即使字符串里混进了“脏东西”，`JSON.stringify` 也会把它安全转义成 `\uXXXX`，保证生成的 JSON 文本是可安全传输、可解析的。

### 4. 总结

- **传输时（形态一）**：

  - JSON 作为一段文本，会被编码成字节流。
  - 在 Web/HTTP 场景下，**几乎总是使用 UTF‑8**，既省空间又是事实标准。

- **到手后（形态二）**：

  - JS 把字节流按约定的编码（通常是 UTF‑8）解码成 **字符串**，
  - 概念上可认为是 UTF‑16 代码单元组成的字符串。

- **最后（形态三）**：
  - `JSON.parse` 把 JSON 字符串解析成 **JS 对象**，方便用点语法访问字段。

对开发者来说，这个流程通常是“透明”的。
但当你在做文件上传、处理二进制流，或者遇到神秘乱码/解析错误时，只要把问题放回这三步：

> **字节流 → 字符串 → 对象**

就能快速判断：**问题出在编码解码，还是出在 JSON 解析本身**。

---

## 15. 实战小贴士：类型转换与性能

### 15.1 字符串与数字转换

- `Number(str)` / `+str`：整体转换，遇到任何非数字内容则返回 `NaN`。
- `parseInt(str, radix)` / `parseFloat(str)`：从左到右解析，遇到第一个非法字符停止。

```javascript
Number('42'); // 42
Number('42px'); // NaN

parseInt('42px', 10); // 42
parseFloat('3.14π'); // 3.14
```

建议：

- 使用 `parseInt` 时总是显式传入进制：`parseInt('08', 10)`；
- 表单输入的数值 → 数字时，多用 `Number` 或一元 `+`，更直观。

### 15.2 大量拼接字符串的性能

现代 JS 引擎对字符串拼接做了很多优化，普通场景用 `+=` 拼接就足够：

```javascript
let s = '';
for (let i = 0; i < 1000; i++) {
  s += i + ','; // 在大多数引擎中性能已很可观
}
```

在极端大文本处理（如几 MB 日志）的场景中，可以考虑用数组收集片段再 `join`：

```javascript
const parts = [];
for (let i = 0; i < 1000; i++) {
  parts.push(i + ',');
}
const s2 = parts.join('');
```

### 15.3 截断字符串时避免“截断 emoji”

常见需求：将用户昵称限制在 N 个“字符”内，且不能把一个 emoji 截断成半个。

```javascript
function truncateByGrapheme(str, maxLength) {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const seg = new Intl.Segmenter('en', { granularity: 'grapheme' });
    const segments = [...seg.segment(str)];
    if (segments.length <= maxLength) return str;
    return (
      segments
        .slice(0, maxLength)
        .map((s) => s.segment)
        .join('') + '…'
    );
  }
  // 回退方案：码点级截断
  const arr = Array.from(str);
  if (arr.length <= maxLength) return str;
  return arr.slice(0, maxLength).join('') + '…';
}
```

---

## 16. 兼容性与环境要求简表

- `includes` / `startsWith` / `endsWith` / `repeat` / `codePointAt` / `fromCodePoint` / 模板字符串：ES2015（ES6）+
- `padStart` / `padEnd`：ES2017+
- `replaceAll`：ES2021+
- 正则 `u` 标志：ES2015+
- Unicode 属性转义 `\p{…}`：ES2018+
- `Intl.Segmenter`：较新环境（如 Chrome 87+、Safari 14.1+、现代 Node 等），老环境可选用第三方库（如 `grapheme-splitter`）。
- `TextEncoder` / `TextDecoder`：
  - 现代浏览器基本都支持；
  - Node.js 12+ 提供较稳定支持，旧版本可通过 `util` 模块或 polyfill 解决。

在需要兼容旧浏览器（如 IE）的项目中：

- 使用 Babel + polyfill（core-js 等）处理大部分 ES 新特性；
- 对于 `Intl.Segmenter` 等较新的 API，可以：
  - 通过 `if ('Segmenter' in Intl)` 做运行时检测；
  - 没有支持时退回到简化方案（如 `Array.from`）或使用第三方库。

---

## 17. 常见坑速查表

- `str.length` 统计的是 **16 位编码单元数**，不是“视觉字符数”；emoji/组合字符会导致“看起来 1，length 却多于 1”。
- 处理 emoji 或复杂 Unicode 时，不要用 `str[i]` 遍历；优先用 `for...of` 或 `Array.from`。
- 正则匹配 Unicode 字符时，一定要考虑 `u` 标志；否则 `.`、`{n}` 等量词会按编码单元拆分 emoji。
- `substr` 已弃用，不再推荐使用；优先 `slice`，其次 `substring`。
- 浏览器的 `btoa` / `atob` 不能直接处理中文等非 ASCII 文本；要么先拿到 UTF‑8 字节（`TextEncoder`），要么使用 Node 的 `Buffer`。
- 在需要精确比较或去重的场景（尤其是包含变音符号的语言），记得先用 `normalize` 做 Unicode 归一化。
- 从表单获取数值字符串时，优先使用 `Number` / `+`，`parseInt` 一定要传进制。

掌握这些细节，你对 JavaScript 字符串的理解就真正达到了“全解”级别。
