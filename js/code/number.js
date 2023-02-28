// null is an object
console.log(typeof null) // object
console.log(Object.prototype.toString.call(null)) // '[object Null]'

// undefined is not Literal
console.log(globalThis.NaN) // NaN
console.log(globalThis.Infinity) // Infinity
console.log(typeof 100) // number
var let = 1
console.log(let) // 1
var undefined = 3
console.log(undefined) // 3

console.log(1 === 1.0) // true

// Number.EPSILON
// 比较两个浮点数差值的绝对值，是否超过误差精度，是否”相等“
const equal = (a, b) => Math.abs(a - b) < Number.EPSILON
console.log(equal(0.1 + 0.2, 0.3)) // true

// Number.NaN
// Why does NaN^0 == 1?
console.log(Number.NaN ** 0) // 1
console.log(Infinity ** 0) // 1
console.log((-Infinity) ** 0) // 1

// NaN 不等于任何值，包括它本身。NaN 与任何数（包括它自己）的运算，得到的都是 NaN。
console.log(1 + NaN) // NaN
console.log(Object.is(+0, -0)) // false
console.log(Object.is(NaN, NaN)) // true
console.log(+0 === -0) // true
console.log(NaN === NaN) // false

// Number.isNaN
Number.isNaN(NaN) // true
Number.isNaN(Number.NaN) // true
// 整数零不能做除数，但是浮点数零可以做除数。
// 0n / 0n      // 抛出 RangeError
Number.isNaN(0 / 0) // true

console.log(isNaN(NaN)) // true
// isNaN 只对数值有效，如果传入其他值，会被先转成数值。比如，传入字符串的时候，字符串会被先转成 NaN，所以最后返回 true，这一点要特别引起注意。也就是说，isNaN 为 true 的值，有可能不是 NaN，而是一个字符串。
console.log(isNaN('fuck')) // true
console.log(isNaN({})) // true
console.log(Number.isNaN('fuck')) // false
console.log(Number.isNaN({})) // false

// polyfill
function myIsNaN(val) {
  return typeof val === 'number' && isNaN(val)
}
// or
// 利用 NaN 为唯一不等于自身的值
function _isNaN(param) {
  return param !== param
}

// parseInt 方法用于将字符串转为整数。
console.log(parseInt('123')) // 123
// 如果字符串头部有空格，空格会被自动去除。
console.log(parseInt('  123')) // 123
// 如果 parseInt 的参数不是字符串，则会先转为字符串再转换。
console.log(parseInt({})) // NaN
// 字符串转为整数的时候，是一个个字符依次转换，如果遇到不能转为数字的字符，就不再进行下去，返回已经转好的部分。
console.log(parseInt('123, 456')) // 123
// 如果字符串的第一个字符不能转化为数字（后面跟着数字的正负号除外），返回 NaN。
console.log(parseInt('*123'))
// 所以，parseInt 的返回值只有两种可能，要么是一个十进制整数，要么是 NaN。

// parseInt 方法还可以接受第二个参数（ 2 到 36 之间），表示被解析的值的进制，返回该值对应的十进制数。默认情况下，parseInt 的第二个参数为 10，即默认是十进制转十进制。
// 如果第二个参数不是数值，会被自动转为一个整数。这个整数只有在 2 到 36 之间，才能得到有意义的结果，超出这个范围，则返回 NaN。如果第二个参数是 0、undefined 和 null，则直接忽略。
console.log(parseInt('123', 0)) // 123
console.log(parseInt('123', undefined)) // 123
console.log(parseInt('123', null)) // 123

console.log(parseInt('123', 1)) // NaN
console.log(parseInt('123', 37)) // NaN

// 如果字符串包含对于指定进制无意义的字符，则从最高位开始，只返回可以转换的数值。如果最高位无法转换，则直接返回 NaN。
console.log(parseInt('101055', 2)) // 10
console.log(parseInt('5101055', 2)) // NaN

console.log(parseInt('123', NaN)) // 123

// Infinity
console.log(42 / -0) // -Infinity
console.log(42 / +0) // Infinity

// string
// raw
console.log(`\\`) // '\'
console.log(String.raw`\\`) // '\\'

// bigint
console.log(typeof 1n) // 'bigint'
console.log(typeof BigInt('1') === 'bigint') // true
console.log(typeof Object(1n)) // 'object'

console.log(4n / 2n) // 2n
console.log(7n / 4n) // 1n
