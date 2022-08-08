// 指数运算符
// 右结合性
console.log(2 ** (3 ** 4))

let x = 2
console.log((x **= 2))

// 链判断运算符
// 直接在链式调用的时候判断，左侧的对象是否为null或undefined。如果是的，就不再往下运算，而是返回undefined
const o = {
  a: 1,
  b: {
    c: 2,
    d: () => 3
  }
}

console.log(o?.b?.c)
console.log(o?.b?.d())
console.log(o?.b.d?.())

// ES2020 引入了一个新的 Null 判断运算符 ??。它的行为类似||，但是只有运算符左侧的值为 null 或 undefined 时，才会返回右侧的值
console.log(null ?? 1) // 1
