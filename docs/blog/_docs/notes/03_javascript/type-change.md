---
title: 类型转换
order: 8
toc: content
group:
  title: 数据类型
---

# 类型转换

## 强制类型转换

```js
// 转换成布尔值
console.log(Boolean(undefined)) // false
console.log(Boolean(null)) // false
console.log(Boolean(+0)) // false
console.log(Boolean(-0)) // false
console.log(Boolean(NaN)) // false
console.log(Boolean('')) // false
console.log(Boolean(0n)) // false

// 转换成数字
console.log(Number('')) // 0
console.log(Number(undefined)) // NaN
console.log(Number(null)) // 0
console.log(Number([])) // 0
console.log(Number([1, 2])) // NaN
console.log(Number({})) // NaN

// 转换成字符串
console.log(String([]) === '') // true
console.log(String({})) // "[object Object]"

// 转换成 JSON
const obj = {
  toJSON() {
    return 'hello world'
  },
}

console.log(JSON.stringify(obj)) // "hello world"
```

## 隐式类型转换

- [Javascript 中 == 和 === 区别是什么？](https://www.zhihu.com/question/31442029)
- [JavaScript 一个疑问，[] (空数组) == true，具体如下，请问这是为何？](https://www.zhihu.com/question/47555543/answers/updated)

## 对象转换成原始类型

```js
const obj = {
  value: 3,
  valueOf: () => 4,
  toString: () => '5',
  [Symbol.toPrimitive]: () => 6,
}
```

- 三者都存在，转换成原始类型会优先调用 `[Symbol.toPrimitive]` 的返回值。

  ```js
  console.log(String(obj)) // '6'
  console.log(Number(obj)) // 6
  ```

- `[Symbol.toPrimitive]` 不存在，`String` 会调用 `toString`，`Number` 会调用 `valueOf`。

  ```js
  console.log(String(obj)) // '5'
  console.log(Number(obj)) // 4
  ```

- 只有 `toString` 存在，`String` 会调用 `toString`，`Number` 也会调用 `toString`，然后会使用 `Number` 把字符串转换成数字。

  ```js
  console.log(String(obj)) // '5'
  console.log(Number(obj)) // 5
  ```

- 只有 `valueOf` 存在，`Number` 会调用 `valueOf`，`String` 会调用 `Object.prototype.toString`

  ```js
  console.log(String(obj)) // '[object Object]'
  console.log(Number(obj)) // 4
  ```

- 都不存在，`String` 会调用 `Object.prototype.toString`，`Number` 也会调用 `Object.prototype.toString`，然后会使用 `Number` 把字符串转换成数字。

  ```js
  console.log(String(obj)) // '[object Object]'
  console.log(Number(obj)) // NaN
  ```

## 类型检测

### typeof

`typeof` 运算符返回参数的类型。

它支持两种语法形式：

- 作为运算符：`typeof x`。
- 函数形式：`typeof(x)`。

```js
console.log(typeof null) // 'object'
console.log(typeof Array.isArray) // 'function'
console.log(typeof typeof Array.isArray) // 'string'
```

### instanceof

```js
function myInstanceof(left, right) {
  //基本数据类型直接返回false
  if (typeof left !== 'object' || left === null) return false
  //getPrototypeOf 是 Object 对象自带的一个方法，相当于 xxx.__proto__
  let proto = Object.getPrototypeOf(left)
  while (true) {
    //查找到尽头，还没找到
    if (proto === null) return false
    //找到相同的原型对象
    if (proto === right.prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}

console.log(myInstanceof(Number(1), Number)) // false
console.log(myInstanceof(new Date(), Date)) // true
```

### Object.prototype.toString

```js
Object.prototype.toString.call(2) // "[object Number]"
Object.prototype.toString.call('') // "[object String]"
Object.prototype.toString.call(true) // "[object Boolean]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call(Math) // "[object Math]"
Object.prototype.toString.call({}) // "[object Object]"
Object.prototype.toString.call([]) // "[object Array]"
Object.prototype.toString.call(/\d/) // "[object RegExp]"
Object.prototype.toString.call(Array.isArray) // "[object Function]"
```

> [Symbol.toStringTag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag)

### 一个全局通用的数据类型判断方法

```js
function getType(obj) {
  let type = typeof obj
  if (type !== 'object') {
    // 先进行 typeof 判断，如果是基础数据类型，直接返回
    return type
  }
  // 对于 typeof 返回结果是 object 的，再进行如下的判断，正则返回结果
  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1')
}

// 使用示例
getType([]) // "Array" typeof []是object，因此toString返回
getType('123') // "string" typeof 直接返回
getType(window) // "Window" toString返回
getType(null) // "Null"首字母大写，typeof null是object，需toString来判断
getType(undefined) // "undefined" typeof 直接返回
getType() // "undefined" typeof 直接返回
getType(function () {}) // "function" typeof能判断，因此首字母小写
getType(/123/g) //"RegExp" toString返回
```

### isObject

```js
// null 没有包装对象
Object(null) === null // false

// 判断是否是对象
// 对象包装后还是它自己
function isObject(value) {
  return value === Object(value)
}
```

### isEmptyObject

```js
function isEmptyObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false
  return Object.keys(obj).length === 0
}

console.log(isEmptyObject({})) // true
console.log(isEmptyObject([])) // true 空数组算空对象
```

### isInteger

```js
// 整数取整还是整数
function isInteger(num) {
  return typeof num === 'number' && (num | 0) === num
}

console.log(isInteger(1)) // true
console.log(isInteger(1.1)) // false
```

### Array.isArray

```js
console.log(Array.isArray([])) // true
console.log(Array.isArray({})) // false
```

## 值类型和引用类型

**值类型**：字符串 (string)、数值 (number)、布尔值 (boolean)...

```js
let foo = 1
let bar = foo

bar = 2
console.log(foo, bar) // 1, 2
```

**引用类型**：对象 (Object)、数组 (Array)、函数 (Function)...

> 引用类型保存在堆中，栈中保存的是引用类型的指针，引用类型赋值之后，两个变量具有相同的引用，指向同一个对象，相互之间有影响

```js
let foo = { a: 1, b: 2 }
var bar = foo

bar.a = 2

console.log(foo, bar) // { a: 2, b: 2 }, { a: 2, b: 2 }
```

**函数参数按值传递：**

> 在向参数传递基本类型的值时，被传递的值会被复制给一个局部变量；在向参数传递引用类型的值时，**会把这个引用类型的地址复制给一个局部变量**，因此在函数内部修改参数，将会影响到原始值。

```js
function test(person) {
  person.name = 'chu'
  person = { name: 'bar', age: 18 }
  return person
}
const p1 = { name: 'foo', age: 25 }
const p2 = test(p1)
console.log(p1) // -> { name: 'chu', age: 25 }
console.log(p2) // -> { name: 'bar', age: 18 }
```
