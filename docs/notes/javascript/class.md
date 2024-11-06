---
title: Class
order: 14
toc: content
group:
  title: 深入浅出
---

# class

## 类

> [ES6 提出 class 关键字是希望解决什么问题？它是不是鸡肋？](https://www.zhihu.com/question/432832293)

JavaScript 中，类是一种函数。就像函数一样，**类可以在另外一个表达式中被定义，被传递，被返回，被赋值，类不存在变量提升**。

```js
class MyClass {
  static param = val // 静态属性
  prop = value // 实例属性
  constructor(prop) { // 构造器
    // ...
    this.prop = prop // 实例属性
  }

  method(...) {} // 会丢失 this
  method = () => {} // this 永远指向实例

  get something(...) {} // getter 方法
  set something(...) {} // setter 方法

  [Symbol.iterator]() {} // 有计算名称（computed name）的方法（此处为 symbol）
  // ...
}
```

**不仅仅是语法糖：**

1. `constructor()` 方法是类的默认方法，**通过 `new` 命令生成对象实例时，自动调用该方法**。一个类必须有 `constructor()` 方法，**如果没有显式定义，一个空的 `constructor()` 方法会被默认添加。**

2. `constructor()` 方法默认返回实例对象 (即 `this`)，**完全可以指定返回另外一个对象**。

3. 实例属性除了定义在 `constructor()` 方法里面的 `this` 上面，也可以定义在类的最顶层。

4. 在类的实例上面调用方法，其实就是调用原型上的方法，另外，**类的内部所有定义的方法，都是不可枚举的** (non-enumerable)。

5. 通过 `class` 创建的函数具有特殊的内部属性标记 `[[FunctionKind]]: "classConstructor"`。因此，它与 ES5 手动创建并不完全相同。

6. 类总是使用 `use strict`。在类构造中的所有代码都将自动进入严格模式。

**在 `extends` 后允许任意表达式：**

例如，一个生成父类的函数调用：

```js
function f(phrase) {
  return class {
    sayHi() {
      alert(phrase)
    }
  }
}

class User extends f('Hello') {}

new User().sayHi() // Hello
```

## 类继承

**子类的 `constructor` 必须调用 `super(...)`，并且 (！) 一定要在使用 `this` 之前调用。**

如果子类没有定义 `constructor()` 方法，这个方法会默认添加，并且里面会调用 `super()`。也就是说，不管有没有显式定义，任何一个子类都有 `constructor()` 方法。

当通过 `new` 执行一个常规函数时，它将创建一个空对象，并将 `this` 指向这个空对象 (常规 new 行为)。**但是当子类的 `constructor` 执行时，它不会执行此操作。它期望父类的 `constructor` 来完成这项工作**。因此，子类的 `constructor` 必须调用 `super` 才能执行其父类的 `constructor`，否则 `this` 指向的那个对象将不会被创建。并且我们会收到一个报错。

> **相关讨论**：[ES6 的子类有没有自己的 this？](https://www.zhihu.com/question/378032472/answer/1078570644)

## super

`super` 这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。

第一种情况，`super` 作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次 `super` 函数。
注意，`super` 虽然代表了父类 `A` 的构造函数，但是返回的是子类 `B` 的实例，即 `super` 内部的 `this` 指的是 `B` 的实例，因此 `super()` 在这里相当于 `Parent.prototype.constructor.call(this)`。

作为函数时，`super()` **只能用在子类的构造函数之中，用在其他地方就会报错**。

第二种情况，`super` 作为对象时，**在普通方法中，指向父类的原型对象；在静态方法中，指向父类**。

另外，**在子类的静态方法中通过 `super` 调用父类的方法时，方法内部的 `this` 指向当前的子类，而不是子类的实例。**

## new.target 属性

`new` 是从构造函数生成实例对象的命令。ES6 为 `new` 命令引入了一个 `new.target` 属性，**该属性一般用在构造函数之中**，返回 `new` 命令作用于的那个构造函数。如果构造函数不是通过 `new` 命令或 `Reflect.construct()` 调用的，`new.target` 会返回 `undefined`，因此这个属性可以用来确定构造函数是怎么调用的。

`Class` 内部调用 `new.target`，返回当前 `Class`。

需要注意的是，子类继承父类时，`new.target` 会返回子类。

```js
// new.target
class AParent {
  constructor() {
    console.log(new.target)
  }
}

// 无继承
const aParent = new AParent()
// [class AParent]

// 有继承
class AChild extends AParent {}
const aChild = new AChild()
// [class AChild extends AParent]
```

## 原生构造函数的继承

ES6 允许继承原生构造函数定义子类。

原生构造函数是指语言内置的构造函数，通常用来生成数据结构。ECMAScript 的原生构造函数大致有下面这些。

- `Boolean()`
- `Number()`
- `String()`
- `Array()`
- `Date()`
- `Function()`
- `RegExp()`
- `Error()`
- `Object()`

## ES5 继承

### 原型链继承

```js
// 第一版
function Super() {
  this.super_param = [1, 2, 3]
}
Super.prototype.getSuperParam = function () {
  return this.super_param
}
function Sub() {
  this.sub_param = true
}
Sub.prototype = new Super()
Sub.prototype.getSubParam = function () {
  return this.sub_param
}
var instance1 = new Sub()
var instance2 = new Sub()
instance1.super_param.push(4)

console.log(instance1.super_param) // [1, 2, 3, 4]
console.log(instance2.super_param) // [1, 2, 3, 4]

// 缺点1：引用类型属性共享
// 缺点2：Sub.prototype 重写丢失 constructor
```

### 原型链继承优化

```js
// 第二版
function Super() {
  this.super_param = [1, 2, 3]
}
Super.prototype.getSuperParam = function () {
  return this.super_param
}
function Sub() {
  Super.call(this)
  this.sub_param = true
}
Sub.prototype = new Super()
Sub.prototype.constructor = Sub
Sub.prototype.getSubParam = function () {
  return this.sub_param
}
var instance1 = new Sub()
var instance2 = new Sub()
instance1.super_param.push(4)

console.log(instance1.super_param) // [1, 2, 3, 4]
console.log(instance2.super_param) // [1, 2, 3]
console.log(Sub.prototype.constructor === Sub) // true

// 缺点：Super() 调用了两次
```

```js
// 第三版
function Super() {
  this.super_param = [1, 2, 3]
}
Super.prototype.getSuperParam = function () {
  return this.super_param
}
function Sub() {
  Super.call(this)
  this.sub_param = true
}
// Sub.prototype = Object.create(Super.prototype) // 重写了 Sub.prototype === {}
// Sub.prototype.constructor = Sub
// 下面相当于上面两行
Object.setPrototypeOf(Sub.prototype, Super.prototype) // 设置原型链会覆盖默认的原型链关系

Sub.prototype.getSubParam = function () {
  return this.sub_param
}
var instance1 = new Sub()
var instance2 = new Sub()
instance1.super_param.push(4)

console.log(instance1.super_param) // [1, 2, 3, 4]
console.log(instance2.super_param) // [1, 2, 3]
console.log(Sub.prototype.constructor === Sub) // true
```
