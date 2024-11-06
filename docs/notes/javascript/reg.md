---
title: 正则
order: 1
toc: content
group:
  title: 杂项
  order: -1
---

# 正则

## 元字符

### 量词字符

| 元字符  |                     描述                     |
| :-----: | :------------------------------------------: |
|   `*`   |         匹配前面的子表达式零次或多次         |
|   `+`   |         匹配前面的子表达式一次或多次         |
|   `?`   |         匹配前面的子表达式零次或一次         |
|  `{n}`  |          匹配前面的子表达式 `n` 次           |
| `{n,}`  |        匹配前面的子表达式至少 `n` 次         |
| `{n,m}` | 匹配前面的子表达式至少 `n` 次但不超过 `m` 次 |

### 特殊字符

| 元字符  |                                                            描述                                                            |
| :-----: | :------------------------------------------------------------------------------------------------------------------------: |
|   `\`   | 转义符，它可以还原元字符原来的含义，允许匹配保留字符 `[`、`]`、`(`、`)`、`{`、`}`、`.`、`*`、`+`、`?`、`^`、`$`、`\`、`\|` |
|   `^`   |                                                        匹配行的开始                                                        |
|   `$`   |                                                        匹配行的结束                                                        |
|  `\|`   |                                          分支结构，匹配符号之前的字符或后面的字符                                          |
| `(xyz)` |                                             分组，按照确切的顺序匹配字符 `xyz`                                             |
| `[xyz]` |                                            字符类， 匹配方括号中包含的任意字符                                             |
|  `[^]`  |                                          否定字符类。匹配方括号中不包含的任意字符                                          |

### 简写字符

| 简写 |               描述               |
| :--: | :------------------------------: |
| `.`  |    匹配除换行符以外的任意字符    |
| `\n` |            匹配换行符            |
| `\t` |            匹配制表符            |
| `\w` | 匹配所有字母、下划线和数字的字符 |
| `\W` |  匹配非字母、下划线和数字的字符  |
| `\d` |        匹配数字: `[0-9]`         |
| `\D` |       匹配非数字: `[^\d]`        |
| `\s` |  匹配空格符: `[\t\n\f\r\p{Z}]`   |
| `\S` |      匹配非空格符: `[^\s]`       |
| `\b` |           匹配词的边界           |

### 修饰符

| 标记 |                             描述                             |
| :--: | :----------------------------------------------------------: |
| `i`  |            不区分大小写: 将匹配设置为不区分大小写            |
| `g`  | 全局搜索: 搜索整个输入字符串中的所有匹配，**取消正则懒惰性** |
| `m`  |        多行匹配: 会匹配输入字符串每一行，忽略换行匹配        |

## 中括号

- `[]` 中出现的字符一般都代表本身的含义。

```js
const reg = /[*]/
const str = '*'

console.log(reg.test(str)) // true
```

- 一些简写字符集在中括号中还是会发生转译

```js
const reg = /[\n]/
const str = String.raw`\n`

console.log(reg.test(str)) // false
```

- `[]` 中不存在多位数，只匹配单个字符

```js
const reg = /[10-29]/ // 匹配 1 和 0-2 和 9
const str = '1'

console.log(reg.test(str)) // true
```

## 问号

- `?` 在非量词元字符之后————表示为量词元字符，匹配前面的子表达式零次或一次
- `?` 在量词元字符之后————**取消正则贪婪性**
- `?:` 只匹配不捕获
- `?=` 正向预查
- `?!` 负向预查

## 分组

分组主要是用过 `()` 进行实现，比如 `beyond{3}`，是匹配 `d` 字母 3 次。而 `(beyond){3}` 是匹配 `beyond` 三次。

在 `()` 内使用 `|` 达到或的效果，如 `(abc|xxx)` 可以匹配 `abc` 或者 `xxx`。

## 分组引用

```js
// ^：这个符号表示字符串的开始。
// [a-zA-Z]：这个部分匹配单个字母，无论大小写。它是由两个范围组合而成：a-z 匹配任何小写字母，A-Z 匹配任何大写字母。
// ([a-zA-Z])：这部分再次匹配单个字母（无论大小写），与前一个部分相同。不同之处在于，这里使用了圆括号()，这意味着匹配到的字符将被捕获并存储在一个临时的“组”中，以便后续可以引用。这是第一个（也是唯一一个）捕获组，因此它被编号为 1。
// \1：这里的 \1 是一个反向引用，它引用前面定义的第一个捕获组的内容。
// [a-zA-Z]：这部分再次匹配单个字母，无论大小写，与前面的匹配规则相同。
// $：这个符号表示字符串的结束。
const reg9 = /^[a-zA-Z]([a-zA-Z])\1[a-zA-Z]$/

console.log(reg9.test('book')) // true
console.log(reg9.exec('moon')) // [ 'moon', 'o', index: 0, input: 'moon', groups: undefined ]
```

## 懒惰性

```js
// 默认每次都从头开始匹配，lastindex 指针指向 0
// 取消懒惰性只需要加上 g 修饰符，lastindex 会随着 test/exec 执行而变化
const reg7 = /\d+/
console.log(reg7.test('chuenwei0129chuenwei0129chuenwei0129')) // true
console.log(reg7.lastIndex) // 0

// 取消懒惰性
const reg8 = /\d+/g
console.log(reg8.lastIndex) // 0
console.log(reg8.exec('chuenwei0129chuenwei0129chuenwei0129'))
// [
//   '0129',
//   index: 8,
//   input: 'chuenwei0129chuenwei0129chuenwei0129',
//   groups: undefined
// ]
console.log(reg8.lastIndex) // 12
console.log(reg8.exec('chuenwei0129chuenwei0129chuenwei0129'))
// [
//   '0129',
//   index: 20,
//   input: 'chuenwei0129chuenwei0129chuenwei0129',
//   groups: undefined
// ]
console.log(reg8.lastIndex) // 24
console.log(reg8.exec('chuenwei0129chuenwei0129chuenwei0129'))
// [
//   '0129',
//   index: 32,
//   input: 'chuenwei0129chuenwei0129chuenwei0129',
//   groups: undefined
// ]
console.log(reg8.lastIndex) // 36
console.log(reg8.exec('chuenwei0129chuenwei0129chuenwei0129')) // null
console.log(reg8.lastIndex) // 0
```

## 贪婪性

```js
// 默认尽可能多的匹配字串
// 取消贪婪性
const reg10 = /[a-zA-Z]+/
const str1 = 'chuenwei0129@chuenwei0129'
console.log(reg10.exec(str1))
// [
//   'chuenwei',
//   index: 0,
//   input: 'chuenwei0129@chuenwei0129',
//   groups: undefined
// ]

const reg11 = /[a-zA-Z]+?/
console.log(reg11.exec(str1))
// [
//   'c',
//   index: 0,
//   input: 'chuenwei0129@chuenwei0129',
//   groups: undefined
// ]
```

## 先行断言 / 先行否定断言

```js
/b(?=c)/.test('bc') // true     断定 b 在 c 前面，匹配仅当 b 后面跟着 c 的情况，且 c 不会被捕获到
// 逆运算

/b(?!c)/.test('bc') // false     断定 b 不在 c 前面，且 c 不会被捕获到
```

## 匹配方法

正则表达式常被用于某些方法，我们可以分成两类：

- 字符串 (str) 方法：`match`、`matchAll`、`search`、`replace`、`split`
- 正则对象下 (regexp) 的方法：`test`、`exec`

| 方法     | 描述                                                                                                   |
| -------- | ------------------------------------------------------------------------------------------------------ |
| exec     | 一个在字符串中执行查找匹配的 RegExp 方法，它返回一个数组（未匹配到则返回 null）。                      |
| test     | 一个在字符串中测试是否匹配的 RegExp 方法，它返回 true 或 false。                                       |
| match    | 一个在字符串中执行查找匹配的 String 方法，它返回一个数组，在未匹配到时会返回 null。                    |
| matchAll | 一个在字符串中执行查找所有匹配的 String 方法，它返回一个迭代器（iterator）。                           |
| search   | 一个在字符串中测试匹配的 String 方法，它返回匹配到的位置索引，或者在失败时返回-1。                     |
| replace  | 一个在字符串中执行查找匹配的 String 方法，并且使用替换字符串替换掉匹配到的子字符串。                   |
| split    | 一个使用正则表达式或者一个固定字符串分隔一个字符串，并将分隔后的子字符串存储到数组中的 `String` 方法。 |

### match

```js
// execAll 捕获全部符合条件的字串，必须取消懒惰性
// match 原理
RegExp.prototype.execAll = function (str) {
  if (!this.global) return this.exec(str)
  const res = []
  let item = this.exec(str)
  while (item) {
    res.push(item[0])
    item = this.exec(str)
  }
  return res
}

console.log(reg8.execAll('chuenwei0129chuenwei0129chuenwei0129')) // [ '0129', '0129', '0129' ]
console.log('chuenwei0129chuenwei0129chuenwei0129'.match(reg8)) // [ '0129', '0129', '0129' ]

// match 分组捕获
console.log(reg6.exec('320101198904196476'))
console.log('320101198904196476'.match(reg6)) // 无法捕获小分组
```

### exec

```js
// 匹配身份证号码
//  18 位，最后一位可能是 X
// 简单：/^\d{17}(\d|X)$/

// 身份证前六位 省市县
// 中间八位 年月日
// 最后四位 最后一位 X 或数字、倒数第二位 偶数女 奇数男、其余两位 公安局编码
// 分组捕获
// 出现 ｜ 需要加 （）
// ?: 匹配不捕获

console.log(
  /^(\d{6})(\d{4})(\d{2})(\d{2})\d{2}(\d)(?:\d|X)$/.exec('320101198904196476'),
)

// [
//   '320101198904196476', 字符串整体捕获
//   '320101', 括号小分组捕获
//   '1989', 小分组
//   '04', 小分组
//   '19', 小分组
//   '7', 小分组
//   index: 0, 正则懒惰性 lastIndex 相关
//   input: '320101198904196476', 字符串本体
//   groups: undefined
// ]
```

### test

```js
// test 捕获

const _str = '{0}年{1}月{2}日'
const _reg = /\{(\d+)\}/g

console.log(_reg.test(_str)) // true
console.log(RegExp.$1) // 1 $1-$9 代表分组个数

console.log(_reg.test(_str)) // true
console.log(RegExp.$1) // 2
```

### replace

```js
// replace 方法
// 默认每次都从头开始匹配
const _str1 = 'chuenwei0129@chuenwei0129'
// 把 'chuenwei' 换成 ‘孙悟空’
const _str2 = _str1
  .replace('chuenwei0129', '孙悟空')
  .replace('chuenwei0129', '孙悟空')
console.log(_str2) // '孙悟空@孙悟空'
// 把 'chuenwei' 换成 'chuenweidiyi'
const _str3 = _str1
  .replace('chuenwei', 'chuenweidiyi')
  .replace('chuenwei', 'chuenweidiyi')
console.log(_str3) // chuenweidiyidiyi0129@chuenwei0129
// 用字符串的弊端类似正则的懒惰性，正则不加 g 效果类似

const _str4 = _str1.replace(/chuenwei/, 'chuenweidiyi')
console.log(_str4) // chuenweidiyi0129@chuenwei0129

const _str5 = _str1.replace(/chuenwei/g, 'chuenweidiyi')
console.log(_str5) // chuenweidiyi0129@chuenweidiyi0129

// 时间字符串处理
// 2021年01月29日
const time = '2021-01-29@2021-01-29'
const _reg1 = /(\d{4})-(\d{2})-(\d{2})/g

const _time = time.replace(_reg1, '$1年$2月$3日')

console.log(_time)
// 与exec 返回相同，回调执行多次
time.replace(_reg1, (...args) => {
  console.log(args)
})
```

## 应用

### 常用正则

```js
// 验证是否为有效数字

// 可能出现 + - 号，也可能不出现
// 个位数 \d 多位数首位不为 0 (\d|([1-9]\d+))
// 小数点部分可能没有，一旦有小数点后面必定有数字
// 验证是否为有效数字 /^[+-]?(\d|([1-9]\d+))(\.\d+)?$/

// 验证密码 /^\w{6,16}$/

// 数字、字母、下划线
// 6-16 位
// 汉字 /^[\u4E00-\u9FA5]$/

// 验证邮箱
// 企业邮箱 cew@cew-office.com
// 政府邮箱 .com.cn
// 邮箱 /^\w+((-\w+)|(\.\w+))*@[a-zA-Z0-9]+((\.|-)[a-zA-Z0-9]+)*\.[a-zA-Z0-9]+$/
```

### 首字母大写

```js
// 首字母大写
const string = 'good good study, day day up!'

// 正则匹配首字母
const regexp = /\b([a-zA-Z])[a-zA-Z]*\b/g

const resStr = string.replace(regexp, (...[word, $1]) => {
  return $1.toUpperCase() + word.slice(1)
})

console.log(resStr)
```

### 字符串中字母出现次数最多？

```js
// 字符串中字母出现次数最多，多少次
// 排序 + 分组\1
// 字母排序 unicode 排序
// new Regexp 变量
const testStr = 'woshichuenweiwoaininiwoxihuanjavascript'

function showMaxWord(testStr) {
  return (
    [...testStr]
      .sort((a, b) => a.localeCompare(b))
      .join('')
      // 匹配单个字符或重复多次的此字符
      .match(/([a-zA-Z])\1*/g)
      .sort((a, b) => b.length - a.length)
      .filter((val, idx, arr) => val.length === arr[0].length)
      .map((item) => ({ [item[0]]: item.length }))
  )
}

const testRes = showMaxWord(testStr)

console.log(testRes)

// { maxCharArr: [ 'e', 'f' ], count: 7 }
// 对象 + 计数器
function findMaxWord(str) {
  const res = {}
  ;[...str].forEach((item) => {
    if (!res[item]) {
      res[item] = 1
    } else {
      res[item]++
    }
  })
  return res
}

console.log(findMaxWord(testStr))
```

### url 处理

```js
// url 处理
const URL = 'http://www.baidu.com/s?chuenwei=0129&%123=%123&sw=12#html'
const res = {}

URL.replace(/([^?&#=]+)=([^?&=#]+)/g, (...[, $1, $2]) => {
  res[$1] = $2
})
URL.replace(/#([^?&#=]+)/g, (...[ctx]) => {
  res.hash = ctx.slice(1)
})
console.log(res)
```

### 千位分隔符

```js
// 千位分隔符
const num = '1234567890'

function checkNum(num) {
  const arr = [...num].reverse()
  const len = Math.floor(arr.length / 3)
  const res = []

  for (let i = 0; i < len; i++) {
    res.push(...arr.splice(0, 3), ',')
  }
  return [...res, ...arr].reverse().join('')
}

console.log(checkNum(num))

// 对后面跟有三个或三的倍数个连续数字的数后面加上逗号
function _checkNum(str) {
  return str.replace(/\d(?=(\d{3})+$)/g, (ctn) => `${ctn},`)
}

console.log(_checkNum(num))

console.log(num.toLocaleString('en-US'))
```

## 什么时候使用 new RegExp？

通常我们使用的都是简短语法 `/.../`。但是它不接受任何变量插入，所以我们必须在写代码的时候就知道确切的 `regexp`。

`new RegExp` 允许从字符串中动态地构造模式。

所以我们可以找出需要搜索的字段，然后根据搜索字段创建 `new RegExp`：

```js
let search = prompt('What you want to search?', 'love')
let regexp = new RegExp(search)

// 找到用户想要的任何东西
alert('I love JavaScript'.search(regexp))
```

<!-- 懒惰性，lastIndex；贪婪性，尽可能多匹配； -->
