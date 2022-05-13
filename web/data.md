# 前端操作文件和二进制数据<!-- omit in toc -->

- [编码知识](#编码知识)
  - [ASCII 字符集](#ascii-字符集)
  - [Unicode 字符集](#unicode-字符集)
  - [JavaScript 使用哪一种编码](#javascript-使用哪一种编码)
    - [字符串处理函数](#字符串处理函数)
    - [正则表达式](#正则表达式)
  - [Base64 编码规则](#base64-编码规则)
- [MIME 类型](#mime-类型)
  - [通用结构](#通用结构)
  - [独立类型](#独立类型)
  - [Multipart 类型](#multipart-类型)
- [URL 对象](#url-对象)
  - [创建 `URL` 对象](#创建-url-对象)
  - [SearchParams](#searchparams)
  - [编码字符串](#编码字符串)
- [ArrayBuffer，二进制数组](#arraybuffer二进制数组)
  - [ArrayBuffer 实例](#arraybuffer-实例)
  - [ArrayBuffer.prototype.byteLength](#arraybufferprototypebytelength)
  - [ArrayBuffer.prototype.slice()](#arraybufferprototypeslice)
  - [DataView 视图](#dataview-视图)
  - [TypedArray 视图](#typedarray-视图)
  - [溢出](#溢出)
  - [复合视图](#复合视图)
  - [ArrayBuffer 与字符串的互相转换](#arraybuffer-与字符串的互相转换)
    - [TextDecoder](#textdecoder)
    - [TextEncoder](#textencoder)
- [Blob](#blob)
  - [Blob 用作 URL](#blob-用作-url)
  - [Blob 转换为 base64](#blob-转换为-base64)
  - [Image 转换为 blob](#image-转换为-blob)
  - [Blob 转换为 ArrayBuffer](#blob-转换为-arraybuffer)
- [File 对象](#file-对象)
  - [FileReader](#filereader)
- [实践](#实践)
- [扩展知识](#扩展知识)

## 编码知识

### ASCII 字符集

背景：**因为计算机只能处理数字，如果要处理文本，就必须先把文本转换为数字才能处理。** 最早的计算机在设计时采用 8 个比特（bit）作为一个字节（byte）。一个字节能表示的最大的整数就是 `255（2^8-1=255`，而 `ASCII` 编码，占用 `0 - 127` 用来表示大小写英文字母、数字和一些符号，这个编码表被称为 `ASCII` 编码。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/web/ascii.png)

**组成：** 26 个字母的大小写、数字、特殊符号、美式英语中的控制字符。在英语中，用 128 个符号编码便可以表示所有。`32～126`(共 95 个)是字符(32 是空格），其中 `48～57` 为 0 到 9 十个阿拉伯数字，`65～90` 为 26 个大写英文字母，`97～122` 号为 26 个小写英文字母，其余为一些标点符号、运算符号等。

大小规则：`0-9 < A-Z < a-z`。

### Unicode 字符集

因为 `ASCII` 编码无法表示多国语言的编码，为了统一所有文字的编码，`Unicode` 应运而生。`Unicode` 把所有语言都统一到一套编码里，这样就不会再有乱码问题了。

对于 `Unicode` 有一些误解，**它仅仅只是一个字符集**，规定了符合对应的二进制代码，**至于这个二进制代码如何存储则没有任何规定**。

它从 `0` 开始，为每个符号指定一个编号，这叫做"码点"（code point）。比如，码点 `0` 的符号就是 `null`（表示所有二进制位都是 0 ）。

```js
U+0000 = null
U+597D = 好
```

`Unicode` 只规定了每个字符的码点，到底用什么样的字节序表示这个码点，就涉及到编码方法。

`Unicode` 编码共有三种具体实现，分别为 `utf-8`,`utf-16`,`utf-32`

`UTF-8` 是目前互联网上使用最广泛的一种 `Unicode` 编码方式，它的最大特点就是可变长。它可以使用 `1 - 4` 个字节表示一个字符，根据字符的不同变换长度。

### JavaScript 使用哪一种编码

> ⚠️ ES6 以后 JavaScript 内部，字符以 `UTF-16` 的格式储存，每个字符固定为 2 个字节。对于那些需要 4 个字节储存的字符（Unicode 码点大于 `0xFFFF` 的字符），JavaScript 会认为它们是两个字符。ES6 可以自动识别 4 字节的码点。

JavaScript 允许直接用码点表示 `Unicode` 字符，写法是"反斜杠+u+码点"。

```js
'好' === '\u597D' // true
```

但是，这种表示法对 4 字节的码点无效。ES6 修正了这个问题，只要将码点放在大括号内，就能正确识别。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/web/unicode.png)

#### 字符串处理函数

ES6 新增了几个专门处理 4 字节码点的函数。

```js
String.fromCodePoint() // 从Unicode码点返回对应字符
String.prototype.codePointAt() // 从字符返回对应的码点
String.prototype.at() // 返回字符串给定位置的字符
```

#### 正则表达式

ES6 提供了 `u` 修饰符，对正则表达式添加 4 字节码点的支持。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/web/unicode-1.png)

### Base64 编码规则

**`Base64`** 是一组相似的二进制到文本（binary-to-text）的编码规则，使得二进制数据在解释成 `radix-64` 的表现形式后能够**用 `ASCII` 字符串的格式表示出来。**`Base64` 这个词出自一种 `MIME` 数据传输编码。

`Base64` 编码普遍**应用于需要通过被设计为处理文本数据的媒介上储存和传输二进制数据而需要编码该二进制数据的场景**。这样是为了保证数据的完整并且不用在传输过程中修改这些数据。

在 JavaScript 中，有两个函数被分别用来处理解码和编码 `base64` 字符串：

- `atob()` 函数能够解码通过 `base-64` 编码的字符串数据。
- 相反地，`btoa()` 函数能够从二进制数据“字符串”创建一个 `base-64` 编码的 `ASCII` 字符串。

**`atob()` 和 `btoa()` 均使用字符串**。

由于 `DOMString` 是 16 位编码的字符串，所以如果有字符超出了 8 位 `ASCII` 编码的字符范围时，**在大多数的浏览器中对 `Unicode` 字符串调用 `window.btoa` 将会造成一个 `Character Out Of Range` 的异常**。

> [atob 和 btoa 的方法名是不是反了？](https://www.zhihu.com/question/264459351/answer/282820566)

## MIME 类型

媒体类型（通常称为 Multipurpose Internet Mail Extensions 或 MIME 类型 ）是一种标准，用来表示文档、文件或字节流的性质和格式。

> 重要：浏览器通常使用 MIME 类型（而不是文件扩展名）来确定如何处理 URL，**因此 Web 服务器在响应头中添加正确的 MIME 类型非常重要。** 如果配置不正确，浏览器可能会曲解文件内容，网站将无法正常工作，并且下载的文件也会被错误处理。

### 通用结构

```json
type/subtype
```

MIME 的组成结构非常简单；由类型与子类型两个字符串中间用 `'/'` 分隔而组成。不允许空格存在。`type` 表示可以被分多个子类的独立类别。`subtype` 表示细分后的每个类型。

> ⚠️ MIME 类型对大小写不敏感，但是传统写法都是小写。

### 独立类型

```sh
text/plain
text/html
image/jpeg
image/png
audio/mpeg
audio/ogg
audio/*
video/mp4
application/*
application/json
application/javascript
application/ecmascript
application/octet-stream
…
```

独立类型表明了对文件的分类，可以是如下之一：

|    类型     |                                  描述                                   |                                                              典型示例                                                               |
| :---------: | :---------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
|    text     |                  表明文件是普通文本，理论上是人类可读                   |                                          text/plain, text/html, text/css, text/javascript                                           |
|    image    | 表明是某种图像。不包括视频，但是动态图（比如动态 gif）也使用 image 类型 |                   image/gif, image/png, image/jpeg, image/bmp, image/webp, image/x-icon, image/vnd.microsoft.icon                   |
|    audio    |                           表明是某种音频文件                            |                                      audio/midi, audio/mpeg, audio/webm, audio/ogg, audio/wav                                       |
|    video    |                           表明是某种视频文件                            |                                                        video/webm, video/ogg                                                        |
| application |                          表明是某种二进制数据                           | application/octet-stream, application/pkcs12, application/vnd.mspowerpoint, application/xhtml+xml, application/xml, application/pdf |

对于 `text` 文件类型若没有特定的 `subtype`，就使用 `text/plain`。类似的，二进制文件没有特定或已知的 `subtype`，即使用 `application/octet-stream`。

### Multipart 类型

```md
multipart/form-data
multipart/byteranges
```

`Multipart` 类型表示细分领域的文件类型的种类，经常对应不同的 MIME 类型。这是复合文件的一种表现方式。`multipart/form-data` 可用于联系 `HTML Forms` 和 `POST` 方法。

`multipart/form-data` 可用于 HTML 表单从浏览器发送信息给服务器。作为多部分文档格式，它由边界线（一个由'--'开始的字符串）划分出的不同部分组成。每一部分有自己的实体，以及自己的 `HTTP` 请求头，`Content-Disposition` 和 `Content-Type` 用于文件上传领域，最常用的 (Content-Length 因为边界线作为分隔符而被忽略）。

```js
Content-Type: multipart/form-data; boundary=aBoundaryString
(other headers associated with the multipart document as a whole)

--aBoundaryString
Content-Disposition: form-data; name="myFile"; filename="img.jpg"
Content-Type: image/jpeg

(data)
--aBoundaryString
Content-Disposition: form-data; name="myField"

(data)
--aBoundaryString
(more subparts)
--aBoundaryString--
```

如下所示的表单:

```html
<form action="http://localhost:8000/" method="post" enctype="multipart/form-data">
  <input type="text" name="myTextField">
  <input type="checkbox" name="myCheckBox">Check</input>
  <input type="file" name="myFile">
  <button>Send the file</button>
</form>
```

会发送这样的请求:

```js
POST / HTTP/1.1
Host: localhost:8000
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101 Firefox/50.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Connection: keep-alive
Upgrade-Insecure-Requests: 1
Content-Type: multipart/form-data; boundary=---------------------------8721656041911415653955004498
Content-Length: 465

-----------------------------8721656041911415653955004498
Content-Disposition: form-data; name="myTextField"

Test
-----------------------------8721656041911415653955004498
Content-Disposition: form-data; name="myCheckBox"

on
-----------------------------8721656041911415653955004498
Content-Disposition: form-data; name="myFile"; filename="test.txt"
Content-Type: text/plain

Simple file.
-----------------------------8721656041911415653955004498--
```

## URL 对象

> [手机端的浏览器 url 长度经常超长，最大长度具体是多上，哪里可以查？](https://www.zhihu.com/question/391726099)

### 创建 `URL` 对象

创建一个新 URL 对象的语法：

```js
new URL(url, [base])
```

- **`url`** —— 完整的 `URL`，或者仅路径（如果设置了 base），
- **`base`** —— 可选的 `base URL`：如果设置了此参数，且参数 `url` 只有路径，则会根据这个 `base` 生成 `URL`。

例如：

```js
let url = new URL('https://javascript.info/profile/admin');
```

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/web/url.png)

- `href` 是完整的 `URL`，与 `url.toString()` 相同
- `protocol` 以冒号字符 : 结尾
- `search` —— 以问号 `?` 开头的一串参数
- `hash` 以哈希字符 `#` 开头

如果存在 `HTTP` 身份验证，则这里可能还会有 `user` 和 `password` 属性：`http://login:password@site.com`（图片上没有，很少被用到）。

### SearchParams

假设，我们想要创建一个具有给定搜索参数的 `url`，例如：`https://google.com/search?query=JavaScript`。

我们可以在 `URL` 字符串中提供它们：

```js
new URL('https://google.com/search?query=JavaScript')
```

**如果参数中包含空格，非拉丁字母等（具体参见下文），参数就需要被编码。**

因此，有一个 `URL` 属性用于解决这个问题：`url.searchParams`。

它为搜索参数提供了简便的方法（自动处理编解码）：

- `append(name, value)` —— 按照 `name` 添加参数
- `delete(name)` —— 按照 `name` 移除参数
- `get(name)` —— 按照 `name` 获取参数
- `getAll(name)` —— 获取相同 `name` 的所有参数（这是可行的例如 `?user=John&user=Pete`）
- `has(name)` —— 按照 `name` 检查参数是否存在
- `set(name, value)` —— `set/replace` 参数
- `sort()` —— 按 `name` 对参数进行排序，很少使用

……并且它是**可迭代的**，类似于 `Map`。

包含空格和标点符号的参数的示例：

```js
let url = new URL('https://google.com/search');
url.searchParams.set('q', 'test me!'); // 添加带有一个空格和一个 ! 的参数

alert(url); // https://google.com/search?q=test+me%21
url.searchParams.set('tbs', 'qdr:y'); // 添加带有一个冒号 : 的参数

// 参数会被自动编码
alert(url); // https://google.com/search?q=test+me%21&tbs=qdr%3Ay

// 遍历搜索参数（被解码）
for(let [name, value] of url.searchParams) {
  alert(`${name}=${value}`); // q=test me!，然后是 tbs=qdr:y
}
```

### 编码字符串

在过去，在出现 `URL` 对象之前，人们使用字符串作为 `URL`。如果使用字符串，则需要手动编码/解码特殊字符。

下面是用于编码/解码 URL 的内建函数：

- **`encodeURI`** —— 编码整个 `URL`。
- **`decodeURI`** —— 解码为编码前的状态。
- **`encodeURIComponent`** —— 编码 `URL` 组件，例如搜索参数，或者 `hash`，或者 `pathname`。
- **`decodeURIComponent`** —— 解码为编码前的状态。

`encodeURIComponent` 和 `encodeURI` 之间的区别

如果我们看一个 `URL`，就容易理解了，它被分解为本文上面图中所示的组件形式：

```js
https://site.com:8080/path/page?p1=v1&p2=v2#hash
```

正如我们所看到的，在 `URL` 中 `:`，`?`，`=`，`&`，`#` 这类字符是被允许的。

- `encodeURI` 仅编码 `URL` 中完全禁止的字符。
- `encodeURIComponent` 也编码这类字符，此外，还编码 `#`，`$`，`&`，`+`，`,`，`/`，`:`，`;`，`=`，`?` 和 `@` 字符。

## ArrayBuffer，二进制数组

### ArrayBuffer 实例

`ArrayBuffer` 对象代表储存二进制数据的一段内存，它不能直接读写，只能通过视图（TypedArray 视图和 DataView 视图)来读写，视图的作用是以指定格式解读二进制数据。

`ArrayBuffer` 也是一个构造函数，**可以分配一段可以存放数据的连续内存区域。**

```js
const buf = new ArrayBuffer(32);
```

上面代码生成了一段 32 字节的内存区域，每个字节的值默认都是 `0`。可以看到，`ArrayBuffer` 构造函数的参数是所需要的内存大小（单位字节）。

### ArrayBuffer.prototype.byteLength

`ArrayBuffer` 实例的 `byteLength` 属性，返回所分配的内存区域的字节长度。

```js
const buffer = new ArrayBuffer(32);
buffer.byteLength
// 32
```

### ArrayBuffer.prototype.slice()

`ArrayBuffer` 实例有一个 `slice` 方法，允许将内存区域的一部分，拷贝生成一个新的 `ArrayBuffer` 对象。

```js
const buffer = new ArrayBuffer(8);
const newBuffer = buffer.slice(0, 3);
```

上面代码拷贝 `buffer` 对象的前 3 个字节（从 0 开始，到第 3 个字节前面结束），生成一个新的 `ArrayBuffer` 对象。`slice` 方法其实包含两步，第一步是先分配一段新内存，第二步是将原来那个 `ArrayBuffer` 对象拷贝过去。

> 除了 `slice` 方法，`ArrayBuffer` 对象不提供任何直接读写内存的方法，只允许在其上方建立视图，然后通过视图读写。

### DataView 视图

为了读写这段内容，需要为它指定视图。`DataView` 视图的创建，需要提供 `ArrayBuffer` 对象实例作为参数。

```js
const buf = new ArrayBuffer(32);
const dataView = new DataView(buf);
dataView.getUint8(0) // 0
```

上面代码对一段 32 字节的内存，建立 `DataView` 视图，然后以不带符号的 8 位整数格式，从头读取 8 位二进制数据，结果得到 0，因为原始内存的 `ArrayBuffer` 对象，默认所有位都是 0。

### TypedArray 视图

另一种 `TypedArray` 视图，与 `DataView` 视图的一个区别是，它不是一个构造函数，而是一组构造函数，代表不同的数据格式。

同一个 `ArrayBuffer` 对象之上，可以根据不同的数据类型，建立多个视图。

```js
// TypedArray(buffer, byteOffset=0, length?)

// 创建一个8字节的ArrayBuffer
const b = new ArrayBuffer(8);

// 创建一个指向b的Int32视图，开始于字节0，直到缓冲区的末尾
const v1 = new Int32Array(b);

// 创建一个指向b的Uint8视图，开始于字节2，直到缓冲区的末尾
const v2 = new Uint8Array(b, 2);

// 创建一个指向b的Int16视图，开始于字节2，长度为2
const v3 = new Int16Array(b, 2, 2);
```

**TypedArray 数组只是一层视图，本身不储存数据，它的数据都储存在底层的 `ArrayBuffer` 对象之中，要获取底层对象必须使用 `buffer` 属性。**

```js
const buffer = new ArrayBuffer(12);

const x1 = new Int32Array(buffer);
x1[0] = 1;
const x2 = new Uint8Array(buffer);
x2[0]  = 2;

x1[0] // 2
```

上面代码对同一段内存，分别建立两种视图：32 位带符号整数（Int32Array 构造函数）和 8 位不带符号整数（Uint8Array 构造函数）。由于两个视图对应的是同一段内存，一个视图修改底层内存，会影响到另一个视图。

`TypedArray` 视图的构造函数，除了接受 `ArrayBuffer` 实例作为参数，还可以接受普通数组作为参数，直接分配内存生成底层的 `ArrayBuffer` 实例，并同时完成对这段内存的赋值。

```js
const typedArray = new Uint8Array([0,1,2]);
typedArray.length // 3

typedArray[0] = 5;
typedArray // [5, 1, 2]
```

上面代码使用 `TypedArray` 视图的 `Uint8Array` 构造函数，新建一个不带符号的 8 位整数视图。可以看到，`Uint8Array` 直接使用普通数组作为参数，对底层内存的赋值同时完成。

目前，`TypedArray` 视图一共包括 9 种类型，每一种视图都是一种构造函数。

- `Int8Array`：8 位有符号整数，长度 1 个字节。
- `Uint8Array`：8 位无符号整数，长度 1 个字节。
- `Uint8ClampedArray`：8 位无符号整数，长度 1 个字节，溢出处理不同。
- `Int16Array`：16 位有符号整数，长度 2 个字节。
- `Uint16Array`：16 位无符号整数，长度 2 个字节。
- `Int32Array`：32 位有符号整数，长度 4 个字节。
- `Uint32Array`：32 位无符号整数，长度 4 个字节。
- `Float32Array`：32 位浮点数，长度 4 个字节。
- `Float64Array`：64 位浮点数，长度 8 个字节。

这 9 个构造函数生成的数组，统称为 `TypedArray` 视图。它们很像普通数组，都有 `length` 属性，都能用方括号运算符（[]）获取单个元素，所有数组的方法，在它们上面都能使用。普通数组与 `TypedArray` 数组的差异主要在以下方面。

- `TypedArray` 数组没有 `concat` 方法。
- `TypedArray` 数组的成员是连续的，不会有空位。
- `TypedArray` 数组成员的默认值为 `0`。比如，`new Array(10)` 返回一个普通数组，里面没有任何成员，只是 `10` 个空位；`new Uint8Array(10)` 返回一个 `TypedArray` 数组，里面 `10` 个成员都是 `0`。

### 溢出

不同的视图类型，所能容纳的数值范围是确定的。超出这个范围，就会出现溢出。比如，8 位视图只能容纳一个 8 位的二进制值，如果放入一个 9 位的值，就会溢出。

`TypedArray` 数组的溢出处理规则，简单来说，就是抛弃溢出的位，然后按照视图类型进行解释。

### 复合视图

由于视图的构造函数可以指定起始位置和长度，所以在同一段内存之中，可以依次存放不同类型的数据，这叫做“复合视图”。

```js
const buffer = new ArrayBuffer(24);

const idView = new Uint32Array(buffer, 0, 1);
const usernameView = new Uint8Array(buffer, 4, 16);
const amountDueView = new Float32Array(buffer, 20, 1);
```

### ArrayBuffer 与字符串的互相转换

`ArrayBuffer` 和字符串的相互转换，使用原生 `TextEncoder` 和 `TextDecoder` 方法。

#### TextDecoder

首先我们需要创建：

```js
let decoder = new TextDecoder([label], [options]);
```

- `label` —— 编码格式，默认为 `utf-8`，但同时也支持 `big5`，`windows-1251` 等许多其他编码格式。
- `options` —— 可选对象：`fatal` —— 布尔值，如果为 `true` 则为无效（不可解码）字符抛出异常，否则（默认）用字符 `\uFFFD` 替换无效字符。

然后解码：

```js
let str = decoder.decode([input], [options]);
```

- `input` —— 要被解码的 `BufferSource`。
- `options` —— 可选对象：`stream` —— 对于解码流，为 `true`，则将传入的数据块（chunk）作为参数重复调用 `decoder`。

例如：

```js
let uint8Array = new Uint8Array([72, 101, 108, 108, 111]);
alert( new TextDecoder().decode(uint8Array) ); // Hello

let uint8Array = new Uint8Array([228, 189, 160, 229, 165, 189]);
alert( new TextDecoder().decode(uint8Array) ); // 你好
```

#### TextEncoder

`TextEncoder` 做相反的事情 —— 将字符串转换为字节。

语法为：

```js
let encoder = new TextEncoder();
```

只支持 `utf-8` 编码。

它有两种方法：

- `encode(str)` —— 从字符串返回 `Uint8Array`。
- `encodeInto(str, destination)` —— 将 `str` 编码到 `destination` 中，该目标必须为 `Uint8Array`。

```js
let encoder = new TextEncoder();

let uint8Array = encoder.encode("Hello");
alert(uint8Array); // 72,101,108,108,111
```

## Blob

`Blob` 由一个可选的字符串 `type`（通常是 `MIME` 类型）和 `blobParts` 组成 —— 其他 `Blob` 对象，字符串和 `BufferSource`。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/web/blob.png)

```js
new Blob(blobParts, options);
```

- **`blobParts`** 是 `Blob/BufferSource/String` 类型的值的**数组**。
- **`options`** 可选对象：`type` —— `Blob` 类型，通常是 `MIME` 类型，例如 `image/png`，`endings` —— 是否转换换行符，使 `Blob` 对应于当前操作系统的换行符（\r\n 或 \n）。默认为 "transparent"（啥也不做），不过也可以是 "native"（转换）。

例如：

```js
// 从字符串创建 Blob
let blob = new Blob(["<html>…</html>"], {type: 'text/html'});
// 请注意：第一个参数必须是一个数组 [...]
// 从类型化数组（typed array）和字符串创建 Blob
let hello = new Uint8Array([72, 101, 108, 108, 111]); // 二进制格式的 "hello"

let blob = new Blob([hello, ' ', 'world'], {type: 'text/plain'});
```

> 我们可以用 `slice` 方法来提取 `Blob` 片段，类似于 `array.slice`，也允许是负数。`Blob` 对象是不可改变的

### Blob 用作 URL

Blob 可以很容易用作 `<a>`、`<img>` 或其他标签的 `URL`，来显示它们的内容。

多亏了 `type`，让我们也可以下载/上传 `Blob` 对象，而在网络请求中，`type` 自然地变成了 `Content-Type`。

`URL.createObjectURL` 取一个 `Blob`，并为其创建一个唯一的 `URL`，形式为 `blob:<origin>/<uuid>`。

```js
blob:https://javascript.info/1e67e00e-860d-40a5-89ae-6ab0cbee6273
```

浏览器内部为每个通过 `URL.createObjectURL` 生成的 `URL` 存储了一个 `URL → Blob` 映射。因此，此类 `URL` 很短，但可以访问 `Blob`。

生成的 `URL`（即其链接）仅在当前文档打开的状态下才有效。它允许引用 `<img>`、`<a>` 中的 Blob，以及基本上任何其他期望 `URL` 的对象。

不过它有个副作用。虽然这里有 `Blob` 的映射，**但 `Blob` 本身只保存在内存中的。浏览器无法释放它。**

在文档退出时（unload），该映射会被自动清除，因此 `Blob` 也相应被释放了。但是，如果应用程序寿命很长，那这个释放就不会很快发生。

因此，如果我们创建一个 `URL`，那么即使我们不再需要该 `Blob` 了，它也会被挂在内存中。

`URL.revokeObjectURL(url)` 从内部映射中移除引用，因此允许 `Blob` 被删除（如果没有其他引用的话），并释放内存。

```js
// <!-- download 特性（attribute）强制浏览器下载而不是导航 -->
let link = document.createElement('a');
link.download = 'hello.txt';

let blob = new Blob(['Hello, world!'], {type: 'text/plain'});

link.href = URL.createObjectURL(blob);

link.click();

URL.revokeObjectURL(link.href);
```

### Blob 转换为 base64

`URL.createObjectURL` 的一个替代方法是，将 `Blob` 转换为 `base64-编码` 的字符串。这种编码将二进制数据表示为一个由 `0` 到 `64` 的 `ASCII` 码组成的字符串，非常安全且“可读“。

“data-url” 的形式为 `data:[<mediatype>][;base64],<data`>。我们可以在任何地方使用这种 `url`，和使用“常规” `url` 一样。

我们使用内建的 `FileReader` 对象来将 `Blob` 转换为 `base64`。它可以将 `Blob` 中的数据读取为多种格式。

```js
let link = document.createElement('a');
link.download = 'hello.txt';

let blob = new Blob(['Hello, world!'], {type: 'text/plain'});

let reader = new FileReader();
reader.readAsDataURL(blob); // 将 Blob 转换为 base64 并调用 onload

reader.onload = function() {
  link.href = reader.result; // data url
  link.click();
};
```

这两种从 `Blob` 创建 `URL` 的方法都可以用。但通常 `URL.createObjectURL(blob)` 更简单快捷。

URL.createObjectURL(blob)

- 如果介意内存，我们需要撤销（revoke）它们
- 直接访问 Blob，无需“编码/解码”

Blob 转换为 data url

- 无需撤销（revoke）任何操作。
- 对大的 Blob 进行编码时，性能和内存会有损耗。

### Image 转换为 blob

我们可以创建一个图像（image）的、图像的一部分、或者甚至创建一个页面截图的 `Blob`。这样方便将其上传至其他地方。

图像操作是通过 `<canvas>` 元素来实现的：

- 使用 `canvas.drawImage` 在 `canvas` 上绘制图像（或图像的一部分）。
- 调用 `canvas` 方法 `.toBlob(callback, format, quality)` 创建一个 `Blob`，并在创建完成后使用其运行 `callback`。

在下面这个示例中，图像只是被复制了，不过我们可以在创建 `blob` 之前，从中裁剪图像，或者在 `canvas` 上对其进行转换：

```js
// 获取任何图像
let img = document.querySelector('img');

// 生成同尺寸的 <canvas>
let canvas = document.createElement('canvas');
canvas.width = img.clientWidth;
canvas.height = img.clientHeight;

let context = canvas.getContext('2d');

// 向其中复制图像（此方法允许剪裁图像）
context.drawImage(img, 0, 0);
// 我们 context.rotate()，并在 canvas 上做很多其他事情

// toBlob 是异步操作，结束后会调用 callback
canvas.toBlob(function(blob) {
  // blob 创建完成，下载它
  let link = document.createElement('a');
  link.download = 'example.png';

  link.href = URL.createObjectURL(blob);
  link.click();

  // 删除内部 blob 引用，这样浏览器可以从内存中将其清除
  URL.revokeObjectURL(link.href);
}, 'image/png');
```

如果我们更喜欢 `async/await` 而不是 `callback`：

```js
let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
```

对于页面截屏，我们可以使用诸如 `https://github.com/niklasvh/html2canvas` 之类的库。它所做的只是扫一遍浏览器页面，并将其绘制在 `<canvas>` 上。然后，我们就可以像上面一样获取一个它的 `Blob`。

### Blob 转换为 ArrayBuffer

Blob 构造器允许从几乎所有东西创建 `blob`，包括任何 `BufferSource`。

但是，如果我们需要执行低级别的操作的话，则可以使用 `FileReader` 从 `blob` 中获取最低级别的 `ArrayBuffer`：

```js
// 从 blob 获取 arrayBuffer
let fileReader = new FileReader();

fileReader.readAsArrayBuffer(blob);

fileReader.onload = function(event) {
  let arrayBuffer = fileReader.result;
};
```

## File 对象

`File` 对象继承自 `Blob`，并扩展了与文件系统相关的功能。

有两种方式可以获取它。

第一种，与 `Blob` 类似，有一个构造器：

```js
new File(fileParts, fileName, [options])
```

- `fileParts` —— `Blob/BufferSource/String` 类型值的数组。
- `fileName` —— 文件名字符串。
- `options` —— 可选对象：`lastModified` —— 最后一次修改的时间戳（整数日期）。

第二种，更常见的是，我们从 `<input type="file">` 或拖放或其他浏览器接口来获取文件。在这种情况下，`file` 将从操作系统（OS）获得 `this` 信息。

由于 `File` 是继承自 `Blob` 的，所以 `File` 对象具有相同的属性，附加：

- `name` —— 文件名，
- `lastModified` —— 最后一次修改的时间戳。

这就是我们从 `<input type="file">` 中获取 File 对象的方式：

```html
<input type="file" onchange="showFile(this)">

<script>
function showFile(input) {
  let file = input.files[0];

  alert(`File name: ${file.name}`); // 例如 my.png
  alert(`Last modified: ${file.lastModified}`); // 例如 1552830408824
}
</script>
```

> ⚠️ **请注意**：
>
> 输入（input）可以选择多个文件，因此 `input.files` 是一个类数组对象。这里我们只有一个文件，所以我们只取 `input.files[0]`。

### FileReader

`FileReader` 是一个对象，其唯一目的是从 `Blob`（因此也从 File）对象中读取数据。

它使用事件来传递数据，因为从磁盘读取数据可能比较费时间。

构造函数：

```js
let reader = new FileReader(); // 没有参数
```

主要方法:

- `readAsArrayBuffer(blob)` —— 将数据读取为二进制格式的 `ArrayBuffer`。
- `readAsText(blob, [encoding])` —— 将数据读取为给定编码（默认为 `utf-8 `编码）的文本字符串。（TextDecoder 的一个替代方案）
- `readAsDataURL(blob)` —— 读取二进制数据，并将其编码为 `base64` 的 `data url`。
- `abort()` —— 取消操作。

`read*` 方法的选择，取决于我们喜欢哪种格式，以及如何使用数据。

- `readAsArrayBuffer` —— 用于二进制文件，执行低级别的二进制操作。对于诸如切片（slicing）之类的高级别的操作，`File` 是继承自 `Blob` 的，所以我们可以直接调用它们，而无需读取。
- `readAsText` —— 用于文本文件，当我们想要获取字符串时。
- `readAsDataURL` —— 当我们想在 `src` 中使用此数据，并将其用于 `img` 或其他标签时。正如我们在 `Blob` 一章中所讲的，还有一种用于此的读取文件的替代方案：`URL.createObjectURL(file)`。

读取过程中，有以下事件：

- `loadstart` —— 开始加载。
- `progress` —— 在读取过程中出现。
- `load` —— 读取完成，没有 `error`。
- `abort` —— 调用了 `abort()`。
- `error` —— 出现 `error`。
- `loadend` —— 读取完成，无论成功还是失败。

读取完成后，我们可以通过以下方式访问读取结果：

- `reader.result` 是结果（如果成功）
- `reader.error` 是 `error`（如果失败）。

这是一个读取文件的示例：

```html
<input type="file" onchange="readFile(this)">

<script>
function readFile(input) {
  let file = input.files[0];

  let reader = new FileReader();

  reader.readAsText(file);

  reader.onload = function() {
    console.log(reader.result);
  };

  reader.onerror = function() {
    console.log(reader.error);
  };

}
</script>
```

## 实践

1. 如何上传本地图片并在网页上展示

    ```js
    本地上传图片 -> Blob -> Object URL
    ```

2. 如何拼接两个音频文件

    ```js
    fetch 请求音频资源 -> ArrayBuffer -> TypedArray -> 拼接成一个 TypedArray -> ArrayBuffer -> Blob -> Object URL
    ```

3. 如何把 `json` 数据转化为 `demo.json` 并下载文件

    ```js
    Text -> DataURL
    ```

## 扩展知识

多线程共享内存，最大的问题就是如何防止两个线程同时修改某个地址，或者说，当一个线程修改共享内存以后，必须有一个机制让其他线程同步。`SharedArrayBuffer API` 提供 `Atomics` 对象，保证所有共享内存的操作都是“原子性”的，并且可以在所有线程内同步。
