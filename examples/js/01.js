// 数据类型

// JavaScript 内部，所有数字都是以 64 位浮点数形式储存，即使整数也是如此。所以，1 与 1.0 是相同的，是同一个数。
console.log(1 === 1.0) // true

// JavaScript 的 64 位浮点数之中，有一个二进制位是符号位。这意味着，任何一个数都有一个对应的负值，就连 0 也不例外。
console.log(+0 === -0) // true

// NaN 是 JavaScript 的特殊值，表示“非数字”（Not a Number）。
console.log(NaN !== NaN) // true

// NaN 不等于任何值，包括它本身。NaN 与任何数（包括它自己）的运算，得到的都是 NaN。
console.log(1 + NaN) // NaN

// isNaN() 可以用来判断一个值是否为 NaN。
console.log(isNaN(NaN)) // true

// 但是，isNaN 只对数值有效，如果传入其他值，会被先转成数值。比如，传入字符串的时候，字符串会被先转成 NaN，所以最后返回 true，这一点要特别引起注意。也就是说，isNaN 为 true 的值，有可能不是 NaN，而是一个字符串。
console.log(isNaN('fuck')) // true
console.log(isNaN({})) // true

// 因此，使用 isNaN 之前，最好判断一下数据类型。
function is_NaN(val) {
	return typeof val === 'number' && isNaN(val)
}

console.log(is_NaN(NaN)) // true
console.log(is_NaN('fuck')) // false
console.log(is_NaN({})) // false

// 判断 NaN 更可靠的方法是，利用 NaN 为唯一不等于自身的值的这个特点，进行判断。

function _isNaN(param) {
	return param !== param
}

console.log(_isNaN(NaN)) // true
console.log(_isNaN('fuck')) // false
console.log(_isNaN({})) // false

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
console.log(parseInt('123', 2)) // 1
console.log(parseInt('123', new Object())) // 123
console.log(parseInt('123', 37)) // NaN

// 如果字符串包含对于指定进制无意义的字符，则从最高位开始，只返回可以转换的数值。如果最高位无法转换，则直接返回 NaN。
console.log(parseInt('101055', 2)) // 10
console.log(parseInt('5101055', 2)) // NaN

// JavaScript 不再允许将带有前缀 0 的数字视为八进制数，而是要求忽略这个 0。但是，为了保证兼容性，大部分浏览器并没有部署这一条规定。
