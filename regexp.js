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