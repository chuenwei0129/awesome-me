# class 基本语法和继承<!-- omit in toc -->

- [类](#类)
- [ES6 继承](#es6-继承)
- [new.target 属性](#newtarget-属性)
- [super](#super)
- [原生构造函数的继承](#原生构造函数的继承)
- [ES5 继承](#es5-继承)
  - [原型链继承](#原型链继承)
  - [原型链继承优化](#原型链继承优化)

## 类

与 ES5 一样，**实例的属性除非显式定义在其本身**（即定义在 `this` 对象上），否则都是定义在原型上（即定义在 `class` 上）。

`constructor()` 方法是类的默认方法，通过 `new` 命令生成对象实例时，自动调用该方法。一个类必须有 `constructor()` 方法，**如果没有显式定义，一个空的 `constructor()` 方法会被默认添加。**

`constructor()` 方法默认返回实例对象（即 `this` ），完全可以指定返回另外一个对象。

实例属性除了定义在 `constructor()` 方法里面的 `this` 上面，也可以定义在类的最顶层。

在类的实例上面调用方法，其实就是调用原型上的方法，另外，类的内部所有定义的方法，都是不可枚举的（non-enumerable）。

与 ES5 一样，类的所有实例共享一个原型对象。

与 ES5 一样，在“类”的内部可以使用 `get` 和 `set` 关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

**类不存在变量提升**（hoist），这一点与 ES5 完全不同。

类的方法内部如果含有 `this`，**它默认指向类的实例**。

如果在一个方法前，加上 `static` 关键字，就表示实例无法调用该方法，而是通过类来调用，这就称为“静态方法”。如果静态方法包含 `this` 关键字，这个 `this` 指的是类，而不是实例。

静态属性指的是 `Class` 本身的属性，即 `Class.propName`，而不是定义在实例对象（ `this` ）上的属性。

```js
class Parent {
  static {
    // class 声明后就已经执行
    console.log(`static block`, this) // static block [class Parent]
  }
  static parentStaticName = '静态爸爸'
  static parentStaticMethod() {
    return this.parentStaticName
  }

  // 简写方式
  _parentProtoName = '无名'
  constructor(parentParamName) {
    // 属性名和参数名区分开
    this._parentProtoName = parentParamName
  }
  get parentProtoName() {
    console.log(`getter`, this._parentProtoName)
    return this._parentProtoName
  }
  set parentProtoName(value) {
    console.log(`setter`, value)
    this._parentProtoName = value
  }
  parentMethod() {
    return this.parentProtoName // 会丢失 this 指向
  }
  parentMethodBindThis = () => this.parentProtoName // 绑定 this 指向实例
}

// 静态方法属性
console.log(Parent.parentStaticName) // 静态爸爸
console.log(Parent.parentStaticMethod()) // 静态爸爸

// 实例方法属性
const parent = new Parent('爸爸')
console.log(parent.parentProtoName) // 爸爸
console.log(parent.parentMethod()) // 爸爸

// this 绑定
const f = parent.parentMethod
try {
  f()
} catch (e) {
  console.log(e.message) // Cannot read properties of undefined (reading 'parentProtoName')
}
const g = parent.parentMethodBindThis
console.log(g()) // 爸爸
```

与函数一样，类也可以使用表达式的形式定义。

```js
const OuterA = class InnerA {
  constructor() {
    console.log(InnerA) // [class InnerA]
    return {
      method() {
        console.log(`constructor return`, InnerA) // constructor return [class InnerA]
      }
    }
  }
  method() {
    console.log(`method return`, InnerA) // 参考 new 方法的返回值
  }
}

new OuterA().method()
console.log(OuterA.name) // InnerA
```

如果类的内部没用到的话，可以省略 `InnerA`。

## ES6 继承

ES5 的继承机制，是先创造一个独立的子类的实例对象，然后再将父类的方法添加到这个对象上面，即“实例在前，继承在后”。

ES6 的继承机制，则是**先将父类的属性和方法，加到一个空的对象上面，然后再将该对象作为子类的实例**，即“继承在前，实例在后”。这就是为什么 ES6 的继承必须先调用 `super()` 方法，因为这一步会生成一个继承父类的 `this` 对象，没有这一步就无法继承父类。

**这意味着新建子类实例时，父类的构造函数必定会先运行一次。**

如果子类没有定义 `constructor()` 方法，这个方法会默认添加，并且里面会调用 `super()`。也就是说，不管有没有显式定义，任何一个子类都有 `constructor()` 方法。

除了私有属性，父类的所有属性和方法，都会被子类继承，其中包括静态方法。

```js
// 本质是复制父类的属性方法到子类，子类在重写或者复用父类的方法属性
class Child extends Parent {
  constructor(writeParentProtoName, childParamName) {
    super(writeParentProtoName) // 将父类的属性和方法，加到一个空的对象上面，然后再将该对象作为子类的实例
    // 此时 this 指向子类的实例，并且子类的实例也会拥有 Parent 的属性方法
    // 传入的 writeParentProtoName 重写了父类的属性
    // 把 super 当 parent constructor 执行就行了
    console.log(this.parentProtoName) // 无名
    // constructor 前面的参数是父类需要的参数，后面的参数是子类需要的参数
    // 子类的 constructor 只会执行一次
    this.childParamName = childParamName
  }
}

// 子类继承父类的静态属性
console.log(Child.parentStaticName) // 静态爸爸
console.log(Child.parentStaticMethod()) // 静态爸爸

// 子类实例属性
const child = new Child(undefined, '儿子')
console.log(child.childParamName) // '儿子'
```

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

## super

`super` 这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。

第一种情况，`super` 作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次 `super` 函数。
注意，`super` 虽然代表了父类 `A` 的构造函数，但是返回的是子类 `B` 的实例，即 `super` 内部的 `this` 指的是 `B` 的实例，因此 `super()` 在这里相当于 `Parent.prototype.constructor.call(this)`。

作为函数时，`super()` **只能用在子类的构造函数之中，用在其他地方就会报错**。

第二种情况，`super` 作为对象时，**在普通方法中，指向父类的原型对象；在静态方法中，指向父类**。

另外，**在子类的静态方法中通过 `super` 调用父类的方法时，方法内部的 `this` 指向当前的子类，而不是子类的实例。**

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
