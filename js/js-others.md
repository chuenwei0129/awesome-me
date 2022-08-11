# 重要概念<!-- omit in toc -->

- [现代浏览器生成一个 JS 函数的开销多大？](#现代浏览器生成一个-js-函数的开销多大)
- [Lodash 严重安全漏洞背后 你不得不知道的 JavaScript 知识](#lodash-严重安全漏洞背后-你不得不知道的-javascript-知识)
- [ES6 class 不是语法糖](#es6-class-不是语法糖)
- [JavaScript 里 Function 也是对象？](#javascript-里-function-也是对象)
- [JS 里的 Array 属于构造函数还是类？](#js-里的-array-属于构造函数还是类)
- [JavaScript 里听说区分函数和方法，而 Java 里只听说过方法，到底有什么区别？](#javascript-里听说区分函数和方法而-java-里只听说过方法到底有什么区别)
- [下列代码为什么会产生 'super' keyword unexpected here 的错误？](#下列代码为什么会产生-super-keyword-unexpected-here-的错误)
- [ES6 提出 class 关键字是希望解决什么问题？它是不是鸡肋？](#es6-提出-class-关键字是希望解决什么问题它是不是鸡肋)
- [为什么 Redux 判断 PlainObject 的写法这么复杂？](#为什么-redux-判断-plainobject-的写法这么复杂)
- [JavaScript 语句后应该加分号么？](#javascript-语句后应该加分号么)

## [现代浏览器生成一个 JS 函数的开销多大？](https://www.zhihu.com/question/345689944/answer/943385371)

函数式语言参照以下公式

```sh
函数 + 参数 + 环境（闭包） => 返回值 + 环境（闭包）
 ↑    ↑    ↑
静态   动态   动态
```

其中，函数是可以静态编译的，哪怕是匿名函数那也只是匿名，而不是每次执行都要「重新生成」，重新生成的只有「环境（闭包）」，但是在外部环境执行的时候，这个闭包就已经生成了，并不会有多余的开销。

举个例子：

```js
// 你以为的
function createFunction() {
  const s = Math.random()
  return () => { // <- 你以为创建了两个函数？
    console.log('hello', s)
  }
}

const a = createFunction()
const b = createFunction()

a !== b // => true

// 事实上上面的代码会被编译成下面的形式(伪代码)

// 静态编译的函数
function anonymous(closure) { // <- 只创建了一次
  console.log('hello', closure.s)
}

function anonymous2(closure) {
  const newClosure = createClosure(closure)
  newClosure.s = Math.random()
  return { closure: newClosure, func: anonymous }
  // <- closure 被创建了两次，生成了两个不同的「函数对象」，但真正被执行的函数是不变的。
}

const createFunction = { closure: global, func: anonymous2 }

const a = callFunction(createFunction)
const b = callFunction(createFunction)

a !== b // => true
a.func === b.func // => true
```

## [Lodash 严重安全漏洞背后 你不得不知道的 JavaScript 知识](https://zhuanlan.zhihu.com/p/73186974)

## ES6 class 不是语法糖

JavaScript 中，类是一种函数。就像函数一样，**类可以在另外一个表达式中被定义，被传递，被返回，被赋值等**。

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

1. 通过 `class` 创建的函数具有特殊的内部属性标记 `[[FunctionKind]]: "classConstructor"`。因此，它与 ES5 手动创建并不完全相同。
2. 类方法不可枚举。 类定义将 `prototype` 中的所有方法的 `enumerable` 标志设置为 `false`。
3. 类总是使用 `use strict`。 在类构造中的所有代码都将自动进入严格模式。

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

**继承类的 `constructor` 必须调用 `super(...)`，并且 (!) 一定要在使用 `this` 之前调用。**

在 JavaScript 中，继承类（派生构造器）的构造函数与其他函数之间是有区别的。派生构造器具有特殊的内部属性 `[[ConstructorKind]]: "derived"`。这是一个特殊的内部标签。

该标签会影响它的 `new` 行为：

当通过 `new` 执行一个常规函数时，它将创建一个空对象，并将这个空对象赋值给 `this`（常规 new 行为）。**但是当继承类的 `constructor` 执行时，它不会执行此操作。它期望父类的 `constructor` 来完成这项工作**。因此，派生的 `constructor` 必须调用 `super` 才能执行其父类的 `constructor`，否则 `this` 指向的那个对象将不会被创建。并且我们会收到一个报错。

> **相关讨论**：[ES6 的子类有没有自己的 this？](https://www.zhihu.com/question/378032472/answer/1078570644)

如果子类构造器中 this 访问出现 super 之前，就很可能会造成 this 引用的相关父类状态成员没有完成初始化，所以 super 一定要在构造器中首先调用。这是 es6 做的预防。**子类的 this 这种概念很容易混肴，因为类是个静态概念，this 是动态概念，是调用时初始化的**。

## [JavaScript 里 Function 也是对象？](https://www.zhihu.com/question/24804474)

按照 ECMA-262 的说法

> An Object is logically a collection of properties.

**只要是一堆属性的组合，那就是对象**。函数就是形参、可执行代码（字符串）的组合，跟对象没有本质区别。

这一点从函数的构造函数也可以看出来：

```js
let fn = new Function('x', 'y', 'return x+y')
```

这跟数组很像

```js
let array = new Array(1,2,3)
```

## [JS 里的 Array 属于构造函数还是类？](https://www.zhihu.com/question/458323650)

这个属于概念类的东西，其实可以不那么较真，**你可以简单的认为构造函数和类是等价的概念**，是可以互换的词。

规范里每个函数对象都有个 `[[Call]]` 内部方法，同时它也可能拥有个 `[[constructor]]` 内部方法，拥有 `[[constructor]]`内部方法的函数就是构造函数（constructor，也叫构造器），而每个构造函数又都拥有一个 `[[IsClassConstructor]` 内部属性， 值是个布尔值，`true` 的话就代表它是个类（`class`）

所以从这个角度看，类和构造函数并不是并列关系，而是包含关系。**函数包含了构造函数和非构造函数两种，而构造函数又包含了类构造函数和非类构造函数两种。**

类构造函数和非类构造函数的区别就是它能不能被当成普通函数调用（不带 `new`），因为 `Array()` 是可以执行的，**所以 `Array` 不是类。**

但你一定会觉的 “`Array` 不是类”这句话很扯，`class MyArray extends Array {}` 这个代码里的 `Array` 难道我们不是把它叫成父类、超类吗，它怎么可能不是类？的确，**在作为父类使用的时候，规范又不会去检查它的 `[[IsClassConstructor]]` 是否为`true`**，而是只会检查它是不是拥有 `[[constructor]]`，也就是说，**只要是个构造函数就可以做父类**，非类的构造函数也可以做父类。

这么死扣类的概念是不是很累（no pun intended）？因为规范里之所以要搞出一个 `[[IsClassConstructor]]` 的概念，**目的是为了让用新的 `class{}` 语法写出的构造函数不能被当成普通函数调用**，并不是为了下定义而下定义。

所以还是把它们当成等价的概念简单一点

## [JavaScript 里听说区分函数和方法，而 Java 里只听说过方法，到底有什么区别？](https://www.zhihu.com/question/327545153)

在 JavaScript 里函数是身兼多职的，同一个函数可以同时是方法和构造器。规范里有对函数和方法下过定义：

> 对象：一个对象就是若干属性的集合。
> 函数：一个函数就是一个可调用的对象。
> 方法：挂在对象属性上的函数就叫方法。

对象 \> 函数 \> 方法，他们是包含关系。

实际上没有人在意这两者的关系，这两个术语经常是混用的。

从 ES6 开始，还有一个新的、从静态语义上定义的“方法”，叫 `MethodDefinition`，比如下面这些都是方法：

```js
var obj = {
  foo() {},
  *bar() {},
  async baz() {},
}
```

这些都不算是：

```js
var obj = {
  foo: function(){},
  bar: function*() {},
  baz: async function() {},
}
```

## [下列代码为什么会产生 'super' keyword unexpected here 的错误？](https://www.zhihu.com/question/519019902)

```JS
var obj1 = {
  method1() {
    console.log('method 1')
  }
}

var obj2 = {
  method2() {
    super.method1()
  }
}

// 从 ES6 开始，不使用简写的方式声明 method2，就不是方法，只是属性。
// var obj2 = {
//   method2: function () {
//     // 报错：'super' keyword unexpected here
//     super.method1()
//   }
// }

Object.setPrototypeOf(obj2, obj1)

obj2.method2() // method 1
```

## [ES6 提出 class 关键字是希望解决什么问题？它是不是鸡肋？](https://www.zhihu.com/question/432832293)

## [为什么 Redux 判断 PlainObject 的写法这么复杂？](https://www.zhihu.com/question/299783862/answer/518704408)

## [JavaScript 语句后应该加分号么？](https://www.zhihu.com/question/20298345)
