# 运算符

```js
// 指数运算符
// 右结合性
console.log(2 ** (3 ** 4))

let x = 2
console.log((x **= 2))


// 链判断运算符
// 在链式调用的时候判断，左侧的对象是否为 null 或 undefined。如果是的，就不再往下运算，而是返回 undefined。
a?.b
// 等同于
a == null ? undefined : a.b

a?.[x]
// 等同于
a == null ? undefined : a[x]

a?.b()
// 等同于
a == null ? undefined : a.b()

a?.()
// 等同于
a == null ? undefined : a()

// ES2020 引入了一个新的 Null 判断运算符 ??。它的行为类似||，但是只有运算符左侧的值为 null 或 undefined 时，才会返回右侧的值
console.log(null ?? 1) // 1

// 逻辑赋值运算符
// 或赋值运算符
x ||= y
// 等同于
x || (x = y)

// 与赋值运算符
x &&= y
// 等同于
x && (x = y)

// Null 赋值运算符
x ??= y
// 等同于
x ?? (x = y)
```

> [js 中 x = x || y 和 x || (x = y) 有什么区别？](https://www.zhihu.com/question/414969457/answer/1416743993)
