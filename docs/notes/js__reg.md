---
group:
  title: javaScript
  order: 3
title: 正则表达式
toc: content
order: 70
---

# 正则表达式

正则表达式（Regular Expression，简称 Regex 或 RegExp）是用于匹配字符串中字符组合的模式。在 JavaScript 中，正则表达式也是对象，可以用于文本搜索、替换、验证等场景。

本文将从基础语法到实际应用，全面介绍 JavaScript 正则表达式的使用方法。

## 元字符

### 量词字符

| 元字符  | 描述                                         |
| :-----: | :------------------------------------------- |
|   `*`   | 匹配前面的子表达式零次或多次                 |
|   `+`   | 匹配前面的子表达式一次或多次                 |
|   `?`   | 匹配前面的子表达式零次或一次                 |
|  `{n}`  | 匹配前面的子表达式 `n` 次                    |
| `{n,}`  | 匹配前面的子表达式至少 `n` 次                |
| `{n,m}` | 匹配前面的子表达式至少 `n` 次但不超过 `m` 次 |

### 特殊字符

|  元字符  | 描述                                                                                                                       |
| :------: | :------------------------------------------------------------------------------------------------------------------------- |
|   `\`    | 转义符，它可以还原元字符原来的含义，允许匹配保留字符 `[`、`]`、`(`、`)`、`{`、`}`、`.`、`*`、`+`、`?`、`^`、`$`、`\`、`\|` |
|   `^`    | 匹配输入的开始                                                                                                             |
|   `$`    | 匹配输入的结束                                                                                                             |
|   `\|`   | 分支结构，匹配符号之前的字符或后面的字符                                                                                   |
| `(xyz)`  | 捕获组，按照确切的顺序匹配字符 `xyz`                                                                                       |
| `[xyz]`  | 字符类，匹配方括号中包含的任意字符                                                                                         |
| `[^xyz]` | 否定字符类，匹配方括号中不包含的任意字符                                                                                   |

### 简写字符集

| 简写 | 描述                                                      |
| :--: | :-------------------------------------------------------- |
| `.`  | 匹配除换行符以外的任意字符                                |
| `\n` | 匹配换行符                                                |
| `\t` | 匹配制表符                                                |
| `\w` | 匹配单词字符（字母、数字、下划线），等价于 `[a-zA-Z0-9_]` |
| `\W` | 匹配非单词字符                                            |
| `\d` | 匹配数字：`[0-9]`                                         |
| `\D` | 匹配非数字：`[^\d]`                                       |
| `\s` | 匹配空白字符：`[\t\n\f\r\p{Z}]`                           |
| `\S` | 匹配非空白字符：`[^\s]`                                   |
| `\b` | 匹配单词边界                                              |
| `\B` | 匹配非单词边界                                            |

### 修饰符（Flags）

| 标记 | 描述                                                              |
| :--: | :---------------------------------------------------------------- |
| `g`  | 全局搜索：搜索整个输入字符串中的所有匹配，**取消正则懒惰性**      |
| `i`  | 不区分大小写：将匹配设置为不区分大小写                            |
| `m`  | 多行模式：`^` 和 `$` 匹配每一行的开始和结束，而不仅仅是整个字符串 |
| `s`  | dotAll 模式：使 `.` 匹配包括换行符在内的所有字符                  |
| `u`  | Unicode 模式：正确处理 Unicode 字符                               |
| `y`  | 粘性搜索：从目标字符串的当前位置开始匹配                          |
| `d`  | 生成索引：为捕获组生成开始和结束索引                              |

## 字符类（中括号）

### 基本用法

- `[]` 中出现的字符一般都代表本身的含义

```js
const reg = /[*]/;
const str = '*';

console.log(reg.test(str)); // true
```

- 一些简写字符集在中括号中还是会发生转译

```js
const reg = /[\n]/;
const str = String.raw`\n`;

console.log(reg.test(str)); // false
// 上述正则匹配的是换行符本身，而不是字符串 '\n'
```

- `[]` 中不存在多位数，只匹配单个字符

```js
const reg = /[10-29]/; // 等价于：匹配 1 或 0-2 范围内的数字 或 9
const str = '1';

console.log(reg.test(str)); // true
console.log(/[10-29]/.test('8')); // false
console.log(/[10-29]/.test('2')); // true
```

## 分组与引用

### 捕获组

分组主要是通过 `()` 实现的。例如：

- `beyond{3}` 匹配 `d` 字母 3 次
- `(beyond){3}` 匹配 `beyond` 三次

在 `()` 内使用 `|` 可以达到"或"的效果，如 `(abc|xxx)` 可以匹配 `abc` 或者 `xxx`。

### 非捕获组

| 语法         | 描述                                                                             |
| :----------- | :------------------------------------------------------------------------------- |
| `(?:x)`      | 非捕获组：匹配 `x` 但不记住匹配项                                                |
| `(?<name>x)` | 命名捕获组：匹配 `x` 并将其存储在返回的匹配项的 `groups` 属性中，属性名为 `name` |

```js
// 非捕获组示例
const reg1 = /(?:abc)+/;
console.log(reg1.exec('abcabcabc')); // ['abcabcabc', ...]，没有捕获分组

// 命名捕获组示例
const reg2 = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const result = reg2.exec('2024-01-29');
console.log(result.groups); // { year: '2024', month: '01', day: '29' }
```

### 分组引用（反向引用）

使用 `\1`、`\2` 等可以引用前面的捕获组。

```js
// 匹配连续重复的字母
// [a-zA-Z]：匹配单个字母
// ([a-zA-Z])：第一个捕获组，匹配单个字母并保存
// \1：反向引用第一个捕获组，必须匹配相同的字母
const reg = /^[a-zA-Z]([a-zA-Z])\1[a-zA-Z]$/;

console.log(reg.test('book')); // true，'o' 重复了
console.log(reg.test('moon')); // true，'o' 重复了
console.log(reg.test('good')); // true，'o' 重复了
console.log(reg.test('word')); // false，没有连续重复的字母
console.log(reg.exec('moon')); // ['moon', 'o', index: 0, input: 'moon', groups: undefined]
```

## 贪婪模式与懒惰模式

### 贪婪模式（默认）

量词默认是贪婪的，会尽可能多地匹配字符。

```js
// 默认尽可能多地匹配字符串
const reg1 = /[a-zA-Z]+/;
const str = 'chuenwei0129@chuenwei0129';

console.log(reg1.exec(str));
// ['chuenwei', index: 0, input: 'chuenwei0129@chuenwei0129', groups: undefined]
```

### 懒惰模式（非贪婪）

在量词后面加 `?` 可以取消贪婪性，进行最小匹配。

```js
// 在量词后加 ? 变为懒惰模式
const reg2 = /[a-zA-Z]+?/;
const str = 'chuenwei0129@chuenwei0129';

console.log(reg2.exec(str));
// ['c', index: 0, input: 'chuenwei0129@chuenwei0129', groups: undefined]
```

| 贪婪量词 | 懒惰量词 |
| :------: | :------: |
|   `*`    |   `*?`   |
|   `+`    |   `+?`   |
|   `?`    |   `??`   |
|  `{n,}`  | `{n,}?`  |
| `{n,m}`  | `{n,m}?` |

### 问号的多种用法

| 用法     | 描述                                  | 示例           |
| :------- | :------------------------------------ | :------------- |
| `x?`     | 量词：匹配 `x` 零次或一次             | `/colou?r/`    |
| `x*?`    | 懒惰量词：最小匹配 `x` 零次或多次     | `/a*?/`        |
| `x+?`    | 懒惰量词：最小匹配 `x` 一次或多次     | `/a+?/`        |
| `x??`    | 懒惰量词：最小匹配 `x` 零次或一次     | `/a??/`        |
| `(?:x)`  | 非捕获组：匹配但不捕获                | `/(?:abc)+/`   |
| `(?=x)`  | 正向先行断言：匹配后面是 `x` 的位置   | `/\w(?=ing)/`  |
| `(?!x)`  | 负向先行断言：匹配后面不是 `x` 的位置 | `/\d(?!px)/`   |
| `(?<=x)` | 正向后行断言：匹配前面是 `x` 的位置   | `/(?<=\$)\d+/` |
| `(?<!x)` | 负向后行断言：匹配前面不是 `x` 的位置 | `/(?<!-)\d+/`  |

## 断言（Assertions）

断言用于指定匹配位置的条件，但不消费字符（零宽度）。

### 边界断言

| 断言 | 描述                                 |
| :--: | :----------------------------------- |
| `^`  | 匹配输入的开始（多行模式下匹配行首） |
| `$`  | 匹配输入的结束（多行模式下匹配行尾） |
| `\b` | 匹配单词边界                         |
| `\B` | 匹配非单词边界                       |

### 先行断言（Lookahead）

```js
// 正向先行断言 (?=...)
// 匹配后面跟着 'c' 的 'b'，但不捕获 'c'
/b(?=c)/.test('bc'); // true
/b(?=c)/.test('bd'); // false

// 实际应用：密码强度验证
// 要求密码必须包含数字、小写字母、大写字母，长度 8-16
const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
console.log(passwordReg.test('Abc12345')); // true
console.log(passwordReg.test('abc12345')); // false，缺少大写字母

// 负向先行断言 (?!...)
// 匹配后面不跟着 'c' 的 'b'
/b(?!c)/.test('bd'); // true
/b(?!c)/.test('bc'); // false
```

### 后行断言（Lookbehind）

```js
// 正向后行断言 (?<=...)
// 匹配前面是 '$' 的数字
/(?<=\$)\d+/.exec('$100'); // ['100']
/(?<=\$)\d+/.exec('€100'); // null

// 实际应用：提取价格数字
const priceReg = /(?<=\$)\d+(?:\.\d{2})?/;
console.log(priceReg.exec('Price: $99.99')); // ['99.99']

// 负向后行断言 (?<!...)
// 匹配前面不是 '-' 的数字
/(?<!-)\d+/.exec('abc123'); // ['123']
/(?<!-)\d+/.exec('-123'); // null（从位置 0 开始）
```

### 断言组合示例

```js
// 同时使用先行和后行断言
// 提取 HTML 标签之间的内容
const htmlReg = /(?<=<div>).*?(?=<\/div>)/;
console.log(htmlReg.exec('<div>Hello World</div>')); // ['Hello World']

// 匹配不在引号内的逗号（用于 CSV 解析）
const csvReg = /,(?=(?:[^"]*"[^"]*")*[^"]*$)/;
```

## 正则的懒惰性

正则表达式默认具有懒惰性，每次匹配都从头开始。这是通过 `lastIndex` 属性实现的。

```js
// 默认每次都从头开始匹配，lastIndex 指针始终指向 0
const reg1 = /\d+/;
console.log(reg1.test('chuenwei0129chuenwei0129chuenwei0129')); // true
console.log(reg1.lastIndex); // 0

// 使用 g 修饰符取消懒惰性
const reg2 = /\d+/g;
console.log(reg2.lastIndex); // 0

console.log(reg2.exec('chuenwei0129chuenwei0129chuenwei0129'));
// ['0129', index: 8, input: 'chuenwei0129chuenwei0129chuenwei0129', groups: undefined]
console.log(reg2.lastIndex); // 12

console.log(reg2.exec('chuenwei0129chuenwei0129chuenwei0129'));
// ['0129', index: 20, input: 'chuenwei0129chuenwei0129chuenwei0129', groups: undefined]
console.log(reg2.lastIndex); // 24

console.log(reg2.exec('chuenwei0129chuenwei0129chuenwei0129'));
// ['0129', index: 32, input: 'chuenwei0129chuenwei0129chuenwei0129', groups: undefined]
console.log(reg2.lastIndex); // 36

console.log(reg2.exec('chuenwei0129chuenwei0129chuenwei0129')); // null
console.log(reg2.lastIndex); // 0，重置为 0
```

## 匹配方法

JavaScript 提供了多种使用正则表达式的方法，分为字符串方法和正则对象方法两类。

### 字符串方法

| 方法         | 描述                                                  | 返回值        |
| :----------- | :---------------------------------------------------- | :------------ |
| `match`      | 在字符串中执行查找匹配                                | 数组或 `null` |
| `matchAll`   | 返回所有匹配的迭代器（必须使用 `g` 修饰符）           | 迭代器        |
| `search`     | 测试匹配并返回匹配位置的索引                          | 索引或 `-1`   |
| `replace`    | 查找匹配并替换                                        | 新字符串      |
| `replaceAll` | 查找所有匹配并替换（必须使用 `g` 修饰符或普通字符串） | 新字符串      |
| `split`      | 使用正则表达式或字符串作为分隔符来分割字符串          | 数组          |

### 正则对象方法

| 方法   | 描述                   | 返回值            |
| :----- | :--------------------- | :---------------- |
| `exec` | 在字符串中执行查找匹配 | 数组或 `null`     |
| `test` | 测试字符串是否匹配     | `true` 或 `false` |

### match 方法

```js
// match 方法实现原理（类似 execAll）
RegExp.prototype.execAll = function (str) {
  // 如果没有 g 修饰符，只执行一次 exec
  if (!this.global) return this.exec(str);

  const res = [];
  let item = this.exec(str);
  while (item) {
    res.push(item[0]);
    item = this.exec(str);
  }
  return res;
};

const reg = /\d+/g;
console.log(reg.execAll('chuenwei0129chuenwei0129chuenwei0129'));
// ['0129', '0129', '0129']

console.log('chuenwei0129chuenwei0129chuenwei0129'.match(reg));
// ['0129', '0129', '0129']

// 注意：match 使用 g 修饰符时无法捕获分组
const reg2 = /(\d{6})(\d{4})(\d{2})(\d{2})\d{2}(\d)(?:\d|X)$/g;
console.log('320101198904196476'.match(reg2));
// ['320101198904196476']，只有整体匹配，没有分组
```

### exec 方法

```js
// 匹配身份证号码
// 18 位，最后一位可能是 X
// 简单版本：/^\d{17}(\d|X)$/

// 详细版本：
// 身份证前六位：省市县
// 中间八位：年月日
// 最后四位：
//   - 最后一位：X 或数字
//   - 倒数第二位：偶数女，奇数男
//   - 其余两位：公安局编码
// (?:\d|X)：非捕获组，匹配但不捕获

const idCardReg = /^(\d{6})(\d{4})(\d{2})(\d{2})\d{2}(\d)(?:\d|X)$/;
const result = idCardReg.exec('320101198904196476');

console.log(result);
// [
//   '320101198904196476', // 整体匹配
//   '320101',             // 第 1 组：地区码
//   '1989',               // 第 2 组：年份
//   '04',                 // 第 3 组：月份
//   '19',                 // 第 4 组：日期
//   '7',                  // 第 5 组：性别码（奇数为男）
//   index: 0,
//   input: '320101198904196476',
//   groups: undefined
// ]
```

### test 方法

```js
// test 方法也可以获取分组信息
const str = '{0}年{1}月{2}日';
const reg = /\{(\d+)\}/g;

console.log(reg.test(str)); // true
console.log(RegExp.$1); // '0'，$1-$9 代表捕获的分组

console.log(reg.test(str)); // true
console.log(RegExp.$1); // '1'
```

### replace 方法

```js
// 基本替换
const str1 = 'chuenwei0129@chuenwei0129';

// 字符串替换只替换第一个匹配项
const str2 = str1.replace('chuenwei0129', '孙悟空');
console.log(str2); // '孙悟空@chuenwei0129'

// 使用正则 + g 修饰符替换所有匹配项
const str3 = str1.replace(/chuenwei/g, 'chuenweidiyi');
console.log(str3); // 'chuenweidiyi0129@chuenweidiyi0129'

// 使用分组引用格式化日期
const time = '2021-01-29';
const reg1 = /(\d{4})-(\d{2})-(\d{2})/g;

// 方式 1：使用 $1、$2、$3 引用分组
const formattedTime1 = time.replace(reg1, '$1年$2月$3日');
console.log(formattedTime1); // '2021年01月29日'

// 方式 2：使用回调函数
const formattedTime2 = time.replace(reg1, (match, year, month, day) => {
  return `${year}年${month}月${day}日`;
});
console.log(formattedTime2); // '2021年01月29日'

// replace 回调函数参数说明
time.replace(reg1, (...args) => {
  console.log(args);
  // [
  //   '2021-01-29',  // 完整匹配
  //   '2021',        // 第 1 个捕获组
  //   '01',          // 第 2 个捕获组
  //   '29',          // 第 3 个捕获组
  //   0,             // 匹配的索引位置
  //   '2021-01-29'   // 原始字符串
  // ]
});
```

## 动态正则 - new RegExp()

除了字面量语法 `/pattern/flags`，JavaScript 还支持使用构造函数创建正则表达式。这在需要动态生成正则模式时特别有用。

### 什么时候使用 new RegExp？

通常我们使用字面量语法 `/.../`，但它不接受变量插入，必须在编写代码时就知道确切的正则表达式。

`new RegExp()` 允许从字符串中动态地构造模式。

```js
// 动态创建正则表达式
let search = 'love';
let regexp = new RegExp(search);

// 找到用户想要搜索的内容
console.log('I love JavaScript'.search(regexp)); // 2

// 动态创建带修饰符的正则
let pattern = 'test';
let flags = 'gi';
let regex = new RegExp(pattern, flags);

console.log(regex.test('TEST')); // true
console.log(regex.global); // true
console.log(regex.ignoreCase); // true
```

### new RegExp 的注意事项

```js
// 使用字面量时，斜杠 / 结束正则，无需转义反斜杠
let regexLiteral = /\d+/;

// 使用 new RegExp 时，字符串中的反斜杠需要双重转义
let regexConstructor = new RegExp('\\d+');

console.log(regexLiteral.test('123')); // true
console.log(regexConstructor.test('123')); // true

// 示例：动态创建单词边界正则
let word = 'hello';
// 错误：let regex = new RegExp('\b' + word + '\b'); // \b 会被解释为退格符
let regex = new RegExp('\\b' + word + '\\b'); // 正确，\\b 表示单词边界

console.log(regex.test('say hello world')); // true
console.log(regex.test('say helloworld')); // false
```

## 实际应用

以下是一些常见的正则表达式应用场景，涵盖表单验证、字符串处理、数据解析等实用功能。

### 常用正则表达式

```js
// 1. 验证是否为有效数字
// 规则：
//   - 可能出现 + - 号，也可能不出现：[+-]?
//   - 整数部分：个位数 \d 或 多位数首位不为 0：([1-9]\d+)
//   - 小数部分可能没有，一旦有必定有数字：(\.\d+)?
const validNumberReg = /^[+-]?(\d|([1-9]\d+))(\.\d+)?$/;

console.log(validNumberReg.test('123')); // true
console.log(validNumberReg.test('+123.45')); // true
console.log(validNumberReg.test('-0.5')); // true
console.log(validNumberReg.test('00.5')); // false

// 2. 验证密码（6-16 位，包含字母、数字、下划线）
const passwordReg = /^\w{6,16}$/;

console.log(passwordReg.test('abc123')); // true
console.log(passwordReg.test('a1')); // false，太短

// 3. 验证中文
const chineseReg = /^[\u4E00-\u9FA5]+$/;

console.log(chineseReg.test('你好')); // true
console.log(chineseReg.test('hello')); // false

// 4. 验证邮箱
// 规则：
//   - 邮箱名：字母、数字、下划线、点、连字符
//   - @ 符号
//   - 域名：字母、数字，可能包含点或连字符
//   - 顶级域名：字母
const emailReg = /^\w+([-+.]\w+)*@[a-zA-Z0-9]+([-.][a-zA-Z0-9]+)*\.[a-zA-Z]+$/;

console.log(emailReg.test('test@example.com')); // true
console.log(emailReg.test('user.name@company.co.cn')); // true
console.log(emailReg.test('invalid@')); // false

// 5. 验证手机号（中国大陆）
const phoneReg = /^1[3-9]\d{9}$/;

console.log(phoneReg.test('13812345678')); // true
console.log(phoneReg.test('12345678901')); // false

// 6. 验证 URL
const urlReg = /^https?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;

console.log(urlReg.test('https://www.example.com')); // true
console.log(urlReg.test('http://example.com/path?q=test')); // true

// 7. 验证日期格式（YYYY-MM-DD）
const dateReg = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

console.log(dateReg.test('2024-01-29')); // true
console.log(dateReg.test('2024-13-01')); // false
```

### 首字母大写

```js
const string = 'good good study, day day up!';

// \b：单词边界
// ([a-zA-Z])：捕获首字母
// [a-zA-Z]*：后续字母
// \b：单词边界
const regexp = /\b([a-zA-Z])[a-zA-Z]*\b/g;

const result = string.replace(regexp, (word, firstLetter) => {
  return firstLetter.toUpperCase() + word.slice(1);
});

console.log(result); // 'Good Good Study, Day Day Up!'

// 更简洁的写法
const result2 = string.replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
console.log(result2); // 'Good Good Study, Day Day Up!'
```

### 统计字符串中字母出现的最多次数

```js
const testStr = 'woshichuenweiwoaininiwoxihuanjavascript';

// 方法 1：使用正则 + 排序
function findMaxWord1(str) {
  return [...str]
    .sort((a, b) => a.localeCompare(b)) // 按字母排序
    .join('')
    .match(/([a-zA-Z])\1*/g) // 匹配连续相同字符
    .sort((a, b) => b.length - a.length) // 按长度降序
    .filter((val, idx, arr) => val.length === arr[0].length) // 筛选最长的
    .map((item) => ({ char: item[0], count: item.length }));
}

console.log(findMaxWord1(testStr));
// [{ char: 'i', count: 7 }, { char: 'n', count: 7 }, { char: 'w', count: 7 }]

// 方法 2：使用对象统计
function findMaxWord2(str) {
  const countMap = {};
  let maxCount = 0;

  // 统计每个字符出现次数
  for (const char of str) {
    countMap[char] = (countMap[char] || 0) + 1;
    maxCount = Math.max(maxCount, countMap[char]);
  }

  // 找出出现次数最多的字符
  const result = Object.entries(countMap)
    .filter(([, count]) => count === maxCount)
    .map(([char, count]) => ({ char, count }));

  return result;
}

console.log(findMaxWord2(testStr));
// [{ char: 'i', count: 7 }, { char: 'n', count: 7 }, { char: 'w', count: 7 }]
```

### URL 参数解析

```js
const URL = 'http://www.baidu.com/s?chuenwei=0129&name=test&age=18#html';

// 方法 1：使用正则解析
function parseURL1(url) {
  const result = {};

  // 匹配查询参数
  url.replace(/([^?&#=]+)=([^?&=#]+)/g, (match, key, value) => {
    result[key] = value;
  });

  // 匹配 hash
  url.replace(/#([^?&#=]+)/g, (match, hash) => {
    result.hash = hash;
  });

  return result;
}

console.log(parseURL1(URL));
// { chuenwei: '0129', name: 'test', age: '18', hash: 'html' }

// 方法 2：使用 URLSearchParams API（推荐）
function parseURL2(url) {
  const urlObj = new URL(url);
  const params = Object.fromEntries(urlObj.searchParams);
  const hash = urlObj.hash.slice(1);

  return { ...params, ...(hash && { hash }) };
}

console.log(parseURL2(URL));
// { chuenwei: '0129', name: 'test', age: '18', hash: 'html' }
```

### 千位分隔符

```js
const num = '1234567890';

// 方法 1：数组操作
function formatNumber1(num) {
  const arr = [...num].reverse();
  const len = Math.floor(arr.length / 3);
  const result = [];

  for (let i = 0; i < len; i++) {
    result.push(...arr.splice(0, 3), ',');
  }
  return [...result, ...arr].reverse().join('').replace(/^,/, '');
}

console.log(formatNumber1(num)); // '1,234,567,890'

// 方法 2：使用正则（推荐）
// 匹配规则：数字后面跟着 3 的倍数个数字（直到字符串末尾）
function formatNumber2(str) {
  return str.replace(/\d(?=(\d{3})+$)/g, (match) => `${match},`);
}

console.log(formatNumber2(num)); // '1,234,567,890'

// 方法 3：使用内置方法（最推荐）
function formatNumber3(num) {
  return Number(num).toLocaleString('en-US');
}

console.log(formatNumber3(num)); // '1,234,567,890'

// 处理小数
const decimal = '1234567.89';
function formatNumberWithDecimal(str) {
  const [integer, fraction] = str.split('.');
  const formattedInteger = integer.replace(/\d(?=(\d{3})+$)/g, '$&,');
  return fraction ? `${formattedInteger}.${fraction}` : formattedInteger;
}

console.log(formatNumberWithDecimal(decimal)); // '1,234,567.89'
```

### 驼峰命名转换

```js
// 短横线转驼峰
function toCamelCase(str) {
  return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
}

console.log(toCamelCase('background-color')); // 'backgroundColor'
console.log(toCamelCase('font-size')); // 'fontSize'
console.log(toCamelCase('border-top-left-radius')); // 'borderTopLeftRadius'

// 驼峰转短横线
function toKebabCase(str) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

console.log(toKebabCase('backgroundColor')); // 'background-color'
console.log(toKebabCase('fontSize')); // 'font-size'
console.log(toKebabCase('borderTopLeftRadius')); // 'border-top-left-radius'

// 下划线转驼峰
function underscoreToCamel(str) {
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
}

console.log(underscoreToCamel('user_name')); // 'userName'
console.log(underscoreToCamel('user_id')); // 'userId'
```

### 去除字符串首尾空格

```js
// 方法 1：使用正则
function trim(str) {
  return str.replace(/^\s+|\s+$/g, '');
}

console.log(trim('  hello world  ')); // 'hello world'

// 去除所有空格
function removeAllSpaces(str) {
  return str.replace(/\s+/g, '');
}

console.log(removeAllSpaces('  hello   world  ')); // 'helloworld'

// 压缩连续空格为单个空格
function compressSpaces(str) {
  return str.trim().replace(/\s+/g, ' ');
}

console.log(compressSpaces('  hello    world  ')); // 'hello world'
```

### HTML 标签过滤

```js
// 移除所有 HTML 标签
function stripHTML(html) {
  return html.replace(/<[^>]+>/g, '');
}

console.log(stripHTML('<div>Hello <span>World</span></div>'));
// 'Hello World'

// 只保留特定标签
function stripHTMLExcept(html, allowedTags) {
  const tagsRegex = new RegExp(
    `<(?!\/?(${allowedTags.join('|')})\b)[^>]*>`,
    'gi',
  );
  return html.replace(tagsRegex, '');
}

console.log(
  stripHTMLExcept(
    '<div>Hello <b>World</b> <script>alert("xss")</script></div>',
    ['b', 'i'],
  ),
);
// '<div>Hello <b>World</b> </div>' (仅移除了 script 标签)

// 转义 HTML 特殊字符
function escapeHTML(str) {
  const htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return str.replace(/[&<>"']/g, (char) => htmlEscapes[char]);
}

console.log(escapeHTML('<div>"Hello" & \'World\'</div>'));
// '&lt;div&gt;&quot;Hello&quot; &amp; &#39;World&#39;&lt;/div&gt;'
```

### 敏感词过滤

```js
// 简单星号替换
function filterSensitiveWords(text, sensitiveWords) {
  const pattern = new RegExp(sensitiveWords.join('|'), 'gi');
  return text.replace(pattern, (match) => '*'.repeat(match.length));
}

const text = '这是一段包含敏感词的文本';
const sensitiveWords = ['敏感词', '文本'];

console.log(filterSensitiveWords(text, sensitiveWords));
// '这是一段包含***的***'

// 保留首尾字符
function filterSensitiveWordsAdvanced(text, sensitiveWords) {
  const pattern = new RegExp(sensitiveWords.join('|'), 'gi');
  return text.replace(pattern, (match) => {
    if (match.length <= 2) return '*'.repeat(match.length);
    return match[0] + '*'.repeat(match.length - 2) + match[match.length - 1];
  });
}

console.log(filterSensitiveWordsAdvanced(text, sensitiveWords));
// '这是一段包含敏*词的文*'
```

## 性能优化建议

正则表达式的性能问题主要源于回溯（backtracking）机制。以下是一些优化建议，可以帮助你写出更高效的正则表达式。

### 1. 避免回溯

```js
// 不好的做法：可能导致大量回溯
const badRegex = /a*a*a*a*a*b/;
console.time('bad');
badRegex.test('aaaaaaaaaaaaaaaaaaaa'); // 大量回溯，性能差
console.timeEnd('bad');

// 好的做法：使用占有量词或原子组避免回溯
const goodRegex = /a+b/;
console.time('good');
goodRegex.test('aaaaaaaaaaaaaaaaaaaa');
console.timeEnd('good');
```

### 2. 使用非捕获组

```js
// 当不需要捕获分组时，使用非捕获组 (?:...)
const withCapture = /(ab)+/; // 捕获组，性能较低
const withoutCapture = /(?:ab)+/; // 非捕获组，性能较高
```

### 3. 合理使用修饰符

```js
// 只在需要时使用全局匹配
const globalRegex = /pattern/g; // 全局匹配，适用于 matchAll、replace
const normalRegex = /pattern/; // 普通匹配，适用于 test、单次匹配
```

### 4. 缓存正则对象

```js
// 不好的做法：每次都创建新的正则对象
function validate(str) {
  return /^\d+$/.test(str);
}

// 好的做法：复用正则对象
const digitRegex = /^\d+$/;
function validateBetter(str) {
  return digitRegex.test(str);
}
```

## 调试正则表达式

### 常见陷阱与注意事项

#### 1. 全局标志的 lastIndex 陷阱

```js
const regex = /test/g;

// 第一次测试
console.log(regex.test('test')); // true
console.log(regex.lastIndex); // 4

// 第二次测试同一个字符串，结果不同
console.log(regex.test('test')); // false，因为 lastIndex 从 4 开始
console.log(regex.lastIndex); // 0，重置了

// 解决方案：每次使用前重置 lastIndex
regex.lastIndex = 0;
console.log(regex.test('test')); // true
```

#### 2. 点号不匹配换行符

```js
// 默认情况下 . 不匹配换行符
const str = 'hello\nworld';
console.log(/hello.world/.test(str)); // false

// 解决方案 1：使用 s 修饰符（dotAll 模式）
console.log(/hello.world/s.test(str)); // true

// 解决方案 2：使用 [\s\S] 或 [\w\W] 或 [^] 匹配任意字符包括换行
console.log(/hello[\s\S]world/.test(str)); // true
console.log(/hello[^]world/.test(str)); // true
```

#### 3. 转义字符的困扰

```js
// 在字符串中使用正则需要双重转义
const str = 'a\\b'; // 实际字符串是 'a\b'

// 错误：单个反斜杠在字符串中被转义了
const wrong = new RegExp('d+'); // 相当于 /d+/，\d 被解释为 d

// 正确：需要双重转义
const correct = new RegExp('\\d+'); // 相当于 /\d+/

// 使用字面量更清晰
const literal = /\d+/;
```

#### 4. 贪婪匹配的意外结果

```js
const html = '<div>first</div><div>second</div>';

// 贪婪匹配会匹配到最后一个 </div>
console.log(html.match(/<div>.*<\/div>/));
// ['<div>first</div><div>second</div>']

// 使用懒惰匹配获取预期结果
console.log(html.match(/<div>.*?<\/div>/g));
// ['<div>first</div>', '<div>second</div>']
```

#### 5. 空字符串匹配

```js
// 某些量词可以匹配空字符串，导致意外的无限循环
const regex = /a*/g; // * 可以匹配 0 次

// 会匹配每个位置，包括空字符串
console.log('bbb'.match(regex));
// ['', '', '', '']

// 使用 + 要求至少匹配一次
console.log('bbb'.match(/a+/g)); // null
```

#### 6. Unicode 字符处理

```js
// 某些 Unicode 字符占用 2 个代码单元
const emoji = '😊';

console.log(emoji.length); // 2
console.log(/^.$/.test(emoji)); // false，. 只匹配一个代码单元

// 解决方案：使用 u 修饰符
console.log(/^.$/u.test(emoji)); // true

// 中文字符范围可能不完整
const chinese = '你好𠮷'; // 𠮷 是扩展 B 区汉字
console.log(/^[\u4E00-\u9FA5]+$/.test(chinese)); // false

// 使用 Unicode 属性转义（需要 u 修饰符）
console.log(/^\p{Script=Han}+$/u.test(chinese)); // true
```

#### 7. 边界匹配的陷阱

```js
// \b 只能识别 ASCII 单词边界
const text = '你好world';

// \b 在中文与英文之间不生效
console.log(/\b你好\b/.test(text)); // false

// 可以使用负向断言替代
console.log(/(?<!\w)你好(?!\w)/.test(text)); // true
```

### 在线工具

- [Regex101](https://regex101.com/) - 强大的正则测试和调试工具
- [RegExr](https://regexr.com/) - 可视化正则表达式工具
- [RegexPer](https://regexper.com/) - 正则表达式可视化图形

### 测试技巧

```js
// 使用 exec 查看匹配详情
const regex = /(\d{4})-(\d{2})-(\d{2})/;
const str = '2024-01-29';
const result = regex.exec(str);

console.log('完整匹配:', result[0]);
console.log('第1组:', result[1]);
console.log('第2组:', result[2]);
console.log('第3组:', result[3]);
console.log('索引:', result.index);
console.log('原字符串:', result.input);

// 测试正则性能
console.time('regex');
for (let i = 0; i < 100000; i++) {
  /\d+/.test('abc123');
}
console.timeEnd('regex');
```
