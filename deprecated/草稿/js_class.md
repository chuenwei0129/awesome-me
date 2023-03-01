# JavaScript 从零单排(五)<!-- omit in toc -->

- [Class 基本语法](#class-基本语法)
- [类继承](#类继承)
  - [extends 关键字](#extends-关键字)
  - [super 关键字](#super-关键字)
  - [重写 constructor](#重写-constructor)
- [静态属性和静态方法](#静态属性和静态方法)
- [私有的和受保护的属性和方法](#私有的和受保护的属性和方法)
- [Mixin 模式](#mixin-模式)

## Class 基本语法

> JavaScript 中，类是一种函数。就像函数一样，**类可以在另外一个表达式中被定义，被传递，被返回，被赋值等**。

```js
class MyClass {
  static param = val // 静态属性

  prop = value; // 实例属性

  constructor(prop) { // 构造器
    // ...
    this.prop = prop // 实例属性
  }

  method(...) {} // 会丢失this

  method = () => {} // this 永远指向实例

  get something(...) {} // getter 方法
  set something(...) {} // setter 方法

  [Symbol.iterator]() {} // 有计算名称（computed name）的方法（此处为 symbol）
  // ...
}
```

当 `new MyClass()` 被调用：

1. 首先创建一个名为 `MyClass` 的函数，该函数成为类声明的结果。
2. `new` 会自动调用 `constructor()` 方法，因此我们可以在 `constructor()` 中初始化属性。（如果我们省略，那么它就被假定为空但存在，依旧会执行）。
3. 存储类中的方法。

**不仅仅是语法糖：**

1. 通过 `class` 创建的函数具有特殊的内部属性标记 `[[FunctionKind]]:"classConstructor"`。因此，它与手动创建并不完全相同。
2. 类方法不可枚举。 类定义将 `"prototype"` 中的所有方法的 `enumerable` 标志设置为 `false`。
3. 类总是使用 `use strict`。 在类构造中的所有代码都将自动进入严格模式。

## 类继承

### extends 关键字

在 `extends` 后允许任意表达式

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

### super 关键字

`ES6` 新增的关键字`super`，指向当前对象的原型对象。

```js
const proto = {
  foo: 'hello'
}

const obj = {
  foo: 'world',
  find() {
    return super.foo
  }
}

Object.setPrototypeOf(obj, proto)
obj.find() // "hello"
```

在 `Class` 中

- 执行 `super.method(...)` 来调用一个父类方法。
- 执行 `super(...)` 来调用一个父类 `constructor`（只能在我们的 `constructor` 中）

### 重写 constructor

根据 规范，如果一个类扩展了另一个类并且没有 `constructor`，那么将生成下面这样的“空” `constructor`：

```js
class Rabbit extends Animal {
  // 为没有自己的 constructor 的扩展类生成的
  constructor(...args) {
    super(...args)
  }
}
```

**继承类的 `constructor` 必须调用 `super(...)`，并且 (!) 一定要在使用 `this` 之前调用。**

在 JavaScript 中，继承类（所谓的“派生构造器”，英文为 “derived constructor”）的构造函数与其他函数之间是有区别的。派生构造器具有特殊的内部属性 `[[ConstructorKind]]:"derived"`。这是一个特殊的内部标签。

该标签会影响它的 `new` 行为：

- 当通过 `new` 执行一个常规函数时，它将创建一个空对象，并将这个空对象赋值给 `this`。
- **但是当继承的 `constructor` 执行时，它不会执行此操作。它期望父类的 `constructor` 来完成这项工作**。
- 因此，派生的 `constructor` 必须调用 `super` 才能执行其父类（base）的 `constructor`，否则 `this` 指向的那个对象将不会被创建。并且我们会收到一个报错。

```js
class Animal {
  name = 'animal'

  constructor() {
    alert(this.name) // (*)
  }
}

class Rabbit extends Animal {
  name = 'rabbit'
}

new Animal() // animal
new Rabbit() // animal
```

这里，`Rabbit` 继承自 `Animal`，并且用它自己的值重写了 `name` 字段。

因为 `Rabbit` 中没有自己的构造器，所以 `Animal` 的构造器被调用了。

有趣的是在这两种情况下：`new Animal()` 和 `new Rabbit()`，在 `(*)` 行的 `alert` 都打印了 `animal`。

换句话说， 父类构造器总是会使用它自己字段的值，而不是被重写的那一个。

```js
class Animal {
  showName() {
    // 而不是 this.name = 'animal'
    alert('animal')
  }

  constructor() {
    this.showName() // 而不是 alert(this.name);
  }
}

class Rabbit extends Animal {
  showName() {
    alert('rabbit')
  }
}

new Animal() // animal
new Rabbit() // rabbit
```

## 静态属性和静态方法

在一个类中，它们以 `static` 关键字开头，如下所示：

```js
class User {
  static staticMethod() {
    alert(this === User)
  }
}

User.staticMethod() // true
```

这实际上跟直接将其作为属性赋值的作用相同：

```js
class User {}

User.staticMethod = function () {
  alert(this === User)
}

User.staticMethod() // true
```

**在 `User.staticMethod()` 调用中的 `this` 的值是类构造器 `User` 自身**

**静态属性和方法是可被继承的：**

```js
class Animal {}
class Rabbit extends Animal {}

// 对于静态的
alert(Rabbit.__proto__ === Animal) // true

// 对于常规方法
alert(Rabbit.prototype.__proto__ === Animal.prototype) // true
```

## 私有的和受保护的属性和方法

```js
class CoffeeMachine {
  _waterAmount = 0

  set waterAmount(value) {
    if (value < 0) throw new Error('Negative water')
    this._waterAmount = value
  }

  get waterAmount() {
    return this._waterAmount
  }

  constructor(power) {
    this._power = power
  }
}

// 创建咖啡机
let coffeeMachine = new CoffeeMachine(100)

// 加水
coffeeMachine.waterAmount = -10 // Error: Negative water
```

## Mixin 模式

```js
// mixin
let sayHiMixin = {
  sayHi() {
    alert(`Hello ${this.name}`)
  },
  sayBye() {
    alert(`Bye ${this.name}`)
  }
}

// 用法：
class User {
  constructor(name) {
    this.name = name
  }
}

// 拷贝方法
Object.assign(User.prototype, sayHiMixin)

// 现在 User 可以打招呼了
new User('Dude').sayHi() // Hello Dude!
```
