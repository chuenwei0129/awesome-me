# JavaScript 基础知识梳理(五)<!-- omit in toc -->
- [声明](#声明)
- [](#)

## 声明

- [x] var 命令：声明变量（存在变量提升）
- [x] let 命令：声明变量
- [x] const 命令：声明常量
- [x] function：声明函数
- [x] class：声明类
- [x] import

> ⚠️ 注意

- `let 命令`和`const 命令`不允许重复声明
- 未定义就使用会报错：`const 命令`和`let 命令`不存在变量提升
- `const 命令`声明常量后必须立马赋值，`let 命令`声明变量后可立马赋值或使用时赋值
- 暂时性死区：在代码块内使用`const 命令`和`let 命令`声明变量之前，该变量都不可用
- 作用域：`const 命令`和`let 命令`只能在代码块中执行———`块级作用域`，`var 命令`在全局代码中执行——`全局作用域`，for 循环中设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。
- `const 命令`实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。

```js
// for 循环中设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域
let i = 1
for (; i < 4; i++) {
  let i = 'a'
  console.log(i) // 'a', 'a', 'a'
}

// 暂时性死区：在代码块内使用`const 命令`和`let 命令`声明变量之前，该变量都不可用
let j = 1
!function () {
  console.log(j) // Cannot access 'j' before initialization
  let j = 2
}()

const foo = {}
// 为 foo 添加一个属性，可以成功
foo.prop = 123
console.log(foo) // { prop: 123 }

// 将 foo 指向另一个对象，就会报错
foo = {} // TypeError: Assignment to constant variable
```

## 




