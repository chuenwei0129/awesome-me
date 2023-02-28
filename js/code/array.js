// 扩展运算符后面还可以放置表达式
// 如果扩展运算符后面是一个空数组，则不产生任何效果
console.log([...(Math.random() > 0.5 ? [1, 2, 3] : [4, 5, 6]), ...[]])

// 替代函数的 apply() 方法
console.log(Math.max.apply(null, [1, 2, 3])) // 3
console.log(Math.max(...[1, 2, 3])) // 3

// 能够正确识别四个字节的 Unicode 字符
console.log('👍'.length) // 2
console.log([...'👍'].length) // 1

// 任何定义了遍历器（Iterator）接口的对象，都可以用扩展运算符转为真正的数组
console.log([...new Set('hello')]) // ['h', 'e', 'l', 'o']
console.log([...new Map(Object.entries({ a: 1, b: 2 }))]) // [['a', 1], ['b', 2]]

// 类数组
console.log([...'hello world']) // ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd']

// Array.from()
// 如果参数是一个真正的数组，Array.from()会返回一个一模一样的新数组。
console.log(Array.from([1, 2, 3])) // [1, 2, 3]

// 所谓类似数组的对象，本质特征只有一点，即必须有 length 属性。
console.log(Array.from({ length: 3 })) // [undefined, undefined, undefined]

// Array.from() 还可以接受一个函数作为第二个参数，作用类似于数组的 map()方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
console.log(Array.from([1, 2, 3], x => x ** x)) // [1, 4, 27]

// Array.of()
console.log(Array.of(1, 2, 3), Array.of(3)) // [[1, 2, 3], [3]]
console.log(Array(1, 2, 3), Array(3)) // [ 1, 2, 3 ] [ <3 empty items> ]
console.log(new Array(1, 2, 3), new Array(3)) // [ 1, 2, 3 ] [ <3 empty items> ]

// Array.prototype.keys() Array.prototype.values() Array.prototype.entries()
const arr2 = ['a', 'b', 'c']
for (let index of arr2.keys()) {
  console.log(index) // 0 1 2
}
for (let value of arr2.values()) {
  console.log(value) // a b c
}
for (let [index, value] of arr2.entries()) {
  console.log(index, value) // 0 a 1 b 2 c
}

console.log(arr2.at(-1)) // c

// 空位
console.log(0 in [undefined]) // true
console.log(0 in Array(1)) // false

