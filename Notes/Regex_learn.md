# 正则表达式<!-- omit in toc -->
- [元字符](#元字符)
	- [量词元字符](#量词元字符)
	- [特殊元字符](#特殊元字符)
	- [简写字符集](#简写字符集)
	- [修饰符](#修饰符)
- [`[]` 中括号](#-中括号)
- [`?` 问号](#-问号)
- [exec](#exec)
- [match](#match)
- [分组引用](#分组引用)
- [replace](#replace)
- [new RegExp](#new-regexp)

## 元字符

### 量词元字符

| 元字符 |                   描述                   |
| :----: | :--------------------------------------: |
|   *    |       匹配前面的子表达式零次或多次       |
|   +    |       匹配前面的子表达式一次或多次       |
|   ？   |       匹配前面的子表达式零次或一次       |
|  {n}   |         匹配前面的子表达式 n 次          |
|  {n,}  |       匹配前面的子表达式至少 n 次        |
| {n,m}  | 匹配前面的子表达式至少 n 次但不超过 m 次 |

### 特殊元字符

| 元字符 |                                        描述                                        |
| :----: | :--------------------------------------------------------------------------------: |
|   \\   | 转义符，它可以还原元字符原来的含义，允许你匹配保留字符 [ ] ( ) { } . \* + ? ^ \$ \ |
|   ^    |                                    匹配行的开始                                    |
|   \$   |                                    匹配行的结束                                    |
|   \|   |                      分支结构，匹配符号之前的字符或后面的字符                      |
| (xyz)  |                          分组，按照确切的顺序匹配字符 xyz                          |
| [xyz]  |                        字符类， 匹配方括号中包含的任意字符                         |
|  [^ ]  |                      否定字符类。匹配方括号中不包含的任意字符                      |

### 简写字符集

| 简写  |               描述               |
| :---: | :------------------------------: |
|   .   |    匹配除换行符以外的任意字符    |
|  \n   |            匹配换行符            |
|  \t   |            匹配制表符            |
|  \w   | 匹配所有字母、下划线和数字的字符 |
|  \W   |  匹配非字母、下划线和数字的字符  |
|  \d   |         匹配数字: [0-9]          |
|  \D   |        匹配非数字: [^\d]         |
|  \s   |   匹配空格符: [\t\n\f\r\p{Z}]    |
|  \S   |       匹配非空格符: [^\s]        |

### 修饰符

| 标记  |                   描述                   |
| :---: | :--------------------------------------: |
|   i   |  不区分大小写: 将匹配设置为不区分大小写  |
|   g   | 全局搜索: 搜索整个输入字符串中的所有匹配 |
|   m   |     多行匹配: 会匹配输入字符串每一行，忽略换行匹配    |

## `[]` 中括号

- `[]` 中出现的字符一般都代表本身的含义。

```js
const reg = /[*]/
const str = "*"

console.log(reg.test(str)) // true
```

- 一些简写字符集在中括号中还是会发生转译

```js
const reg = /[\n]/
const str = String.raw`\n`

console.log(reg.test(str)) // false
```

- `[]` 中不存在多位数，只匹配单个字符，类似 `||`

```js
const reg = /[10-29]/ // 1、0-2、9
const str = '1'

console.log(reg.test(str)) // true
```

## `?` 问号

- `?` 左边是非量词元字符————作为量词元字符匹配，匹配前面的子表达式零次或一次
- `?` 左边是量词元字符————取消正则贪婪性
- `?:` 只匹配不捕获
- `?=` 正向预查
- `?!` 负向预查

## exec

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

// 身份证号码

// 18 位
// 最后一位可能是X
// 身份证 /^\d{17}(\d|X)$/

// 身份证前六位 省市县
// 中间八位 年月日
// 最后四位 最后一位 X或数字 倒数第二位 偶数女 奇数男
// 其余公安局编码
// 分组捕获，随机数不捕获
// 出现 ｜ 就需要加 （）
// ?: 匹配不捕获

const reg5 = /^(\d{6})(\d{4})(\d{2})(\d{2})\d{2}(\d)(?:\d|X)$/

console.log(reg5.exec('320101198904196476'))

// [
//   '320101198904196476', 大正则
//   '320101', 小分组
//   '1989',
//   '04',
//   '19',
//   '7',
//   index: 0,
//   input: '320101198904196476',
//   groups: undefined
// ]

// 正则的懒惰性
console.log(reg5.global)
// 正则下一次匹配开始的位置
console.log(reg5.lastIndex)

// g 取消正则的懒惰性

const reg6 = /^(\d{6})(\d{4})(\d{2})(\d{2})\d{2}(\d)(?:\d|X)$/g
console.log('reg6', reg6.lastIndex) // 0
reg6.exec('320101198904196476')
console.log('reg6', reg6.lastIndex) // 18
reg6.exec('320101198904196476')
console.log('reg6', reg6.lastIndex) // 0

// test 正则匹配贪婪性 test 和 exec 一样，取消懒惰性，lastindex 会随着 test/exec 执行而变化
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
// execAll
// 不取消懒惰性情况
RegExp.prototype.execAll = function(str) {
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

// match 原理
console.log('chuenwei0129chuenwei0129chuenwei0129'.match(reg8)) // [ '0129', '0129', '0129' ]

// match 分组捕获
console.log(reg6.exec('320101198904196476'))
console.log('320101198904196476'.match(reg6)) // 无法获得小分组

// 分组引用
const reg9 = /^[a-zA-Z]([a-zA-Z])\1[a-zA-Z]$/

console.log(reg9.test('book')) // true
console.log(reg9.exec('moon')) // [ 'moon', 'o', index: 0, input: 'moon', groups: undefined ]

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

// test 捕获

const _str = '{0}年{1}月{2}日'
const _reg = /\{(\d+)\}/g

console.log(_reg.test(_str)) // true
console.log(RegExp.$1) // 1 $1-$9 代表分组个数

console.log(_reg.test(_str)) // true
console.log(RegExp.$1) // 2

// replace 方法
const _str1 = 'chuenwei0129@chuenwei0129'
// 把 'chuenwei' 换成 ‘楚恩伟’
const _str2 = _str1.replace('chuenwei0129', '楚恩伟').replace('chuenwei0129', '楚恩伟')
console.log(_str2) // '楚恩伟@楚恩伟'
// 把 'chuenwei' 换成 'chuenweidiyi'
const _str3 = _str1.replace('chuenwei', 'chuenweidiyi').replace('chuenwei', 'chuenweidiyi')
console.log(_str3) // chuenweidiyidiyi0129@chuenwei0129
// 用字符串的弊端类似正则的懒惰性，正则不加g效果类似

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
// exec 返回相同加g和不加g与exec表现相同
time.replace(_reg1, (...args) => {
	console.log(args)
})

// 首字母大写
const string = 'good good study, day day up!'

// 正则匹配首字母
const regexp = /\b([a-zA-Z])[a-zA-Z]*\b/g

const resStr = string.replace(regexp, (...[word, $1]) => {
	return $1.toUpperCase() + word.slice(1)
})

console.log(resStr)

// 字符串中字母出现次数最多，多少次

// 排序 + 分组\1
// 字母排序 unicode 排序
// new Regexp 变量
const testStr = 'woshichuenweiwoaininiwoxihuanjavascript'

function showMaxWord(testStr) {
	return [...testStr].sort((a, b) => a.localeCompare(b))
		.join('')
		.match(/([a-zA-Z])\1*/g)
		.sort((a, b) => b.length - a.length)
		.filter((val, idx, arr) => val.length === arr[0].length)
		.map(item => ({ [item[0]]: item.length }))
}

const testRes = showMaxWord(testStr)

console.log(testRes)

// { maxCharArr: [ 'e', 'f' ], count: 7 }
// 对象 + 计数器
function findMaxWord(str) {
	const res = {}
	;[...str].forEach(item => {
		if (!res[item]) {
			res[item] = 1
		} else {
			res[item]++
		}
	})
	return res
}

console.log(findMaxWord(testStr))

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

// 两个量词需要加括号，?=不需要加括号
function _checkNum(str) {
	return str.replace(/\d{1,3}(?=(\d{3})+$)/g, ctn => `${ctn},`)
}

console.log(num.toLocaleString('en-US'))

console.log(_checkNum(num))```js
// 素数只能被自己和 1 整除不含 1 , 2 是素数
// 判断素数只要判断到开方就行，false 跳出条件是 num % i === 0

function isPrime(num) {
	if (typeof num === 'number' && (num | 0) === num) {
		if (num <= 1) return false
		const N = Math.floor(Math.sqrt(num))
		let primeState = true
		for (let i = 2; i <= N; i++) {
			if (num % i === 0) {
				primeState = false
				break
			}
		}
		return primeState
	} else {
		return false
	}
}

console.log(isPrime(2)) // true
console.log(isPrime(87)) // false
console.log(isPrime(77)) // false
```

## match

```js
// execAll
// 不取消懒惰性情况
RegExp.prototype.execAll = function(str) {
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

// match 原理
console.log('chuenwei0129chuenwei0129chuenwei0129'.match(reg8)) // [ '0129', '0129', '0129' ]

// match 分组捕获
console.log(reg6.exec('320101198904196476'))
console.log('320101198904196476'.match(reg6)) // 无法获得小分组
```

## 分组引用

```js
const reg9 = /^[a-zA-Z]([a-zA-Z])\1[a-zA-Z]$/

console.log(reg9.test('book')) // true
console.log(reg9.exec('moon')) // [ 'moon', 'o', index: 0, input: 'moon', groups: undefined ]
```

## replace

传参
字符串参数
会出现 不准确
会有 lastindex 类似错误

正则
后面是函数
exec 的捕获次数的循环
() => {

}

## new RegExp

先行断言
b 在 c 前面
/b(?=c)/.
%的列子
且 c 不会被捕获到

逆运算
先行否定断言
/b(?!c)/
b 不在 c 前面
