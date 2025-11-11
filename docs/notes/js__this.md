---
group:
  title: javaScript
  order: 3
title: This
toc: content
order: 14
---

## this 的基本概念

`this` 是 JavaScript 中的一个关键字，它的值在函数被调用时确定，指向调用该函数的对象。`this` 的指向取决于函数的调用方式，而不是函数的定义位置。

## this 绑定规则

### 默认绑定（全局环境）

全局环境使用 `this`，它指的就是顶层对象 `window`。严格模式下指向 `undefined`。

```js
function f1() {
  'use strict';
  console.log(this);
}

function f2() {
  console.log(this);
}

f1(); // undefined
f2(); // window 对象
```

### 隐式绑定（对象方法）

对象的方法里面包含 `this`，`this` 的指向就是方法运行时所在的对象。该方法赋值给另一个对象，就会改变 `this` 的指向。

```js
let obj = {
  foo: function () {
    console.log(this);
  },
};

obj.foo(); // obj
```

**隐式丢失**：当方法被赋值给变量或作为参数传递时，会丢失隐式绑定。

下面这种情况是直接调用，`this` 相当于全局上下文的情况。

```js
let obj = {
  a: function () {
    console.log(this);
  },
};
let func = obj.a;

func(); // window 对象（严格模式下为 undefined）
```

**立即执行函数**

立即执行函数（IIFE）是直接调用，`this` 相当于全局上下文。

```js
let obj = {
  f1: function () {
    console.log(this);
    let f2 = (function () {
      console.log(this); // window 对象
    })();
  },
};

obj.f1(); // obj，内层 IIFE 输出 window 对象
```

**高阶函数 / 回调函数**

回调函数作为参数传递时，也会丢失隐式绑定，`this` 指向全局上下文。

```js
let obj = {
  f1: function (cb) {
    console.log(this); // obj
    cb();
  },
};

let fn = function () {
  console.log(this); // window 对象
};

obj.f1(fn);
```

**数组方法中的 this**

某些数组方法（如 `map`、`forEach`、`filter` 等）可以接受第二个参数来指定回调函数的 `this` 值。

```js
const o = {
  arr: [1, 2, 3],
  fn: function () {
    console.log(this); // o
    this.arr.map(function (item) {
      console.log(this); // o（因为传入了第二个参数 this）
      return item * 2;
    }, this); // 第二个参数指定回调函数的 this
  },
};

o.fn();

// 如果不传第二个参数，回调函数中的 this 在非严格模式下是 window，严格模式下是 undefined
```

**setTimeout / setInterval**

`setTimeout`、`setInterval` 等属于宏任务，会加入执行队列，等待下一次循环再依次执行。

- **箭头函数**：`this` 指向外层作用域的 `this`
- **普通函数**：`this` 指向全局对象 `window`（严格模式下为 `undefined`）

```js
const obj = {
  name: 'obj',
  fn1: function () {
    setTimeout(() => {
      console.log(this); // obj（箭头函数继承外层 this）
    }, 0);

    setTimeout(function () {
      console.log(this); // window 对象（普通函数默认绑定）
    }, 0);
  },
};

obj.fn1();
```

**DOM 事件绑定**

`onclick` 和 `addEventListener` 中 `this` 默认指向绑定事件的元素。

IE 比较奇异，使用 `attachEvent`，里面的 `this` 默认指向 `window`。

```js
// 示例
const button = document.querySelector('button');

// addEventListener：this 指向 button 元素
button.addEventListener('click', function () {
  console.log(this); // <button>...</button>
});

// 箭头函数：this 指向外层作用域
button.addEventListener('click', () => {
  console.log(this); // window（如果在全局作用域）
});
```

### 箭头函数的 this

箭头函数没有自己的 `this`，它会捕获其所在上下文的 `this` 值作为自己的 `this` 值。因此箭头函数的 `this` 在定义时就已经确定，不会因调用方式而改变。

```js
let obj = {
  a: function () {
    let done = () => {
      console.log(this);
    };
    done();
  },
};

obj.a(); // 找到最近的非箭头函数 a，a 现在绑定着 obj, 因此箭头函数中的 this 是 obj
```

**箭头函数的特点**：

- 没有自己的 `this`，使用外层作用域的 `this`
- 不能作为构造函数使用（不能使用 `new` 调用）
- 不能通过 `call()`、`apply()`、`bind()` 改变 `this` 指向
- 没有 `arguments` 对象

### new 绑定（构造函数）

构造函数中的 `this`，指的是实例对象。

```js
let Obj = function (p) {
  this.p = p;
};
```

上面代码定义了一个构造函数 `Obj`。由于 `this` 指向实例对象，所以在构造函数内部定义 `this.p`，就相当于定义实例对象有一个 `p` 属性。

```js
let o = new Obj('Hello World!');
o.p; // 'Hello World!'
```

### ES6 Class 中的 this

ES6 的 `class` 本质上是构造函数的语法糖，其中的 `this` 指向实例对象。

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }

  // 箭头函数方法（实例属性）
  sayAge = () => {
    console.log(this.age);
  };
}

const person = new Person('张三');
person.sayName(); // '张三'

// 注意：普通方法赋值给变量会丢失 this
const say = person.sayName;
say(); // TypeError: Cannot read property 'name' of undefined

// 箭头函数方法不会丢失 this
const sayAge = person.sayAge;
sayAge(); // undefined（没有 age 属性，但 this 仍指向 person）
```

## this 绑定优先级

当多个绑定规则同时出现时，优先级从高到低为：

1. **new 绑定**：`new` 调用构造函数
2. **显式绑定**：`call`、`apply`、`bind`
3. **隐式绑定**：对象方法调用
4. **默认绑定**：全局环境或普通函数调用

```js
function foo() {
  console.log(this.a);
}

const obj1 = { a: 1, foo };
const obj2 = { a: 2 };

obj1.foo(); // 1（隐式绑定）
obj1.foo.call(obj2); // 2（显式绑定 > 隐式绑定）

const bar = new obj1.foo(); // undefined（new 绑定 > 隐式绑定）
```

## 常见的 this 丢失场景总结

1. **方法赋值给变量**
2. **方法作为回调函数传递**
3. **内层函数调用**
4. **定时器回调**
5. **事件处理函数（箭头函数）**

**解决方案**：

- 使用箭头函数
- 使用 `bind()` 绑定 `this`
- 使用变量保存 `this`（`const self = this`）
- 利用闭包

### [JavaScript：怎么理解 object 中的 this 也是 window？](https://www.zhihu.com/question/506745207/answer/2277542931)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/web/SCR-20220807-wbz.png)

> JavaScript 的 `this` 在它自己无法自圆其说的时候就会 fallback 到 `globalThis`，在浏览器环境下即 `window`，严格模式下修正为了 `undefined`。

## 显式绑定 this

### call / apply / bind 的区别

- **call**：`fn.call(thisArg, arg1, arg2, ...)`，立即执行函数，参数逐个传递
- **apply**：`fn.apply(thisArg, [arg1, arg2, ...])`，立即执行函数，参数以数组形式传递
- **bind**：`fn.bind(thisArg, arg1, arg2, ...)`，返回一个新函数，不立即执行

### 手写 call / apply

1. 参数可以为 `null`，`undefined`，原始类型
2. 内部工具人属性可能存在同名属性
3. 原函数执行后会有返回值

```js
Function.prototype._call = function (thisArg, ...args) {
  thisArg = thisArg ? Object(thisArg) : globalThis;
  const tmp = Symbol('tmp');
  thisArg[tmp] = this;
  const ret = thisArg[tmp](...args);
  delete thisArg[tmp];
  return ret;
};

console.log(Math.max.call(null, 1, 2, 3));
console.log(Math.max._call(null, 1, 2, 3));
```

### 手写 bind

```js
// 1. 不传值默认为 globalThis，执行时调用 call
// 2. 第一次传入的参数需要和第二次传入的参数合并
// 3. boundF 作为构造函数时，this 原来绑定会失效，指向 boundF 的实例 this
// 4. 用 `this instanceof boundF` 来判断是构造函数还是普通调用
// 5. boundF 的实例需要继承原函数原型上的方法 `this.__proto__.__proto__ === f.prototype`

// 测试用例：
function f(a, b) {
  console.log('f-this -->', this);
  return a + b;
}

f.prototype.fn = () => {
  return 'fn';
};

const o = { x: 1 };
const Bound = f.bind(o, 1);
console.log(Bound, Bound(2), new Bound().fn());

Function.prototype.$bind = function (thisArg, ...$bindArgs) {
  thisArg = thisArg ?? globalThis;
  // f.$bind(o, 1) ==> this === f
  const f = this;
  const boundF = function (...boundFArgs) {
    // 当 new boundF 时，boundF 满足 this.__proto__ === boundF.prototype
    // 要实现 boundF 的实例继承原函数原型上的方法，即 this.__proto__ === f.prototype
    // 只需修改返回函数的 prototype 为绑定函数的 prototype 即 boundF.prototype = f.prototype
    // 但直接赋值修改并不好，因为所引用的地址相等，修改 boundF.prototype 的时候，也会直接修改 f.prototype
    // 我们可以构建原型链，将 boundF.prototype 指向 f.prototype，通过原型链来查找
    // 即只需实现 boundF.prototype.__proto__ === f.prototype
    Object.setPrototypeOf(boundF.prototype, f.prototype);
    // boundF 为构造函数调用，忽略 thisArg 绑定，this 指向当前 boundF this
    return f.call(
      this instanceof f ? this : thisArg,
      ...$bindArgs,
      ...boundFArgs,
    );
  };
  return boundF;
};

const $Bound = f.$bind(o, 1);
console.log($Bound, $Bound(2), new $Bound().fn());

// f-this --> { x: 1 }
// f-this --> f {}
// [Function: bound f] 3 fn
// f-this --> { x: 1 }
// f-this --> boundF {}
// [Function: boundF] 3 fn
```

## this 的实际应用

### 链式调用

通过在对象的方法中返回 `this`，可以实现链式调用。

```js
const $ = {
  first() {
    console.log('first');
    return this;
  },
  second() {
    console.log('second');
    return this;
  },
  third() {
    console.log('third');
    return this;
  },
};

$.first().second().third(); // 依次输出：'first', 'second', 'third'
```

这种模式在 jQuery、Promise 等库中广泛使用。

## 总结

**this 的指向规则**：

1. **默认绑定**：全局环境或普通函数调用，指向 `window`（严格模式下为 `undefined`）
2. **隐式绑定**：对象方法调用，指向调用该方法的对象
3. **显式绑定**：通过 `call`、`apply`、`bind` 指定 `this`
4. **new 绑定**：构造函数调用，指向新创建的实例对象
5. **箭头函数**：没有自己的 `this`，继承外层作用域的 `this`

**优先级**：new 绑定 > 显式绑定 > 隐式绑定 > 默认绑定

**常见陷阱**：

- 方法赋值导致 `this` 丢失
- 回调函数中的 `this` 指向
- 定时器、事件处理函数中的 `this`

**解决方案**：使用箭头函数、`bind()`、闭包等方式固定 `this` 指向。
