---
group:
  title: javaScript
  order: 3
title: Function
toc: content
order: 8
---

## 函数基础

### 函数声明与函数表达式

JavaScript 中存在多种定义函数的方式：

```js
// 1. 函数声明（Function Declaration）
function foo() {
  return '函数声明';
}

// 2. 函数表达式（Function Expression）
const bar = function () {
  return '函数表达式';
};

// 3. 具名函数表达式
const baz = function namedFunc() {
  return '具名函数表达式';
};

// 4. 箭头函数（Arrow Function）
const arrow = () => '箭头函数';

// 5. 对象方法简写（Method Definition）
const obj = {
  method() {
    return '对象方法';
  },
};

// 6. Function 构造函数
const dynamic = new Function('x', 'y', 'return x + y');
```

**区别：**

- **函数声明**：会被提升，可以在声明之前调用
- **函数表达式**：不会被提升，必须先定义后使用
- **箭头函数**：没有自己的 `this`、`arguments`、`super`，不能用作构造函数

### 函数提升

函数声明和函数表达式在提升 (hoisting) 行为上有所不同：

```js
// 1. 函数声明会被完整提升（包括函数体）
console.log(foo()); // '函数声明' - 可以在声明之前调用

function foo() {
  return '函数声明';
}

// 2. 函数表达式不会被提升（变量声明会提升，但赋值不会）
console.log(bar); // undefined
// console.log(bar()); // TypeError: bar is not a function

var bar = function () {
  return '函数表达式';
};

console.log(bar()); // '函数表达式'

// 3. 使用 let/const 的函数表达式存在暂时性死区
// console.log(baz); // ReferenceError: Cannot access 'baz' before initialization
const baz = function () {
  return '使用 const 的函数表达式';
};
```

**注意事项：**

- 函数声明会整体提升（包括函数体）
- 函数表达式只有变量声明会提升，函数赋值不会提升
- 推荐使用函数声明或 `const` 定义函数表达式，避免使用 `var`

### 函数参数

#### 基本参数

```js
function sum(a, b) {
  return a + b;
}

sum(1, 2); // 3
sum(1); // NaN (b 为 undefined)
sum(1, 2, 3); // 3 (多余参数被忽略)
```

#### 默认参数（Default Parameters）

ES6 允许为函数参数设置默认值：

```js
// 基本用法
function greet(name = 'Guest') {
  return `Hello, ${name}!`;
}

greet(); // 'Hello, Guest!'
greet('Alice'); // 'Hello, Alice!'

// 默认值可以是表达式
function createArray(length = 5) {
  return new Array(length).fill(0);
}

// 默认值可以引用其他参数
function add(x, y = x) {
  return x + y;
}

add(1); // 2
add(1, 2); // 3

// 默认值可以是函数调用
function getDefaultName() {
  return 'Guest';
}

function greet2(name = getDefaultName()) {
  return `Hello, ${name}!`;
}
```

**注意：**

- 只有当参数为 `undefined` 时，默认值才会生效
- `null` 不会触发默认值

```js
function test(x = 1) {
  console.log(x);
}

test(); // 1
test(undefined); // 1
test(null); // null
test(0); // 0
```

#### 剩余参数（Rest Parameters）

使用 `...` 语法收集多余的参数为数组：

```js
// 基本用法
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

sum(1, 2, 3); // 6
sum(1, 2, 3, 4, 5); // 15

// 剩余参数必须是最后一个参数
function func(a, b, ...rest) {
  console.log(a); // 1
  console.log(b); // 2
  console.log(rest); // [3, 4, 5]
}

func(1, 2, 3, 4, 5);

// 剩余参数与 arguments 的区别
function withArguments() {
  console.log(arguments); // Arguments 对象（类数组）
  console.log(Array.isArray(arguments)); // false
}

function withRest(...args) {
  console.log(args); // 真正的数组
  console.log(Array.isArray(args)); // true
}
```

**剩余参数 vs arguments：**

- 剩余参数是真正的数组，可以使用数组方法
- `arguments` 是类数组对象，不能直接使用数组方法
- 箭头函数没有 `arguments`，但可以使用剩余参数

#### 解构参数

函数参数支持解构赋值：

```js
// 1. 解构对象参数
function createUser({ name, age, email }) {
  return { name, age, email };
}

createUser({ name: 'Alice', age: 25, email: 'alice@example.com' });

// 2. 解构参数 + 默认值
function greet({ name = 'Guest', greeting = 'Hello' } = {}) {
  return `${greeting}, ${name}!`;
}

greet(); // 'Hello, Guest!'
greet({ name: 'Alice' }); // 'Hello, Alice!'
greet({ greeting: 'Hi' }); // 'Hi, Guest!'

// 3. 解构数组参数
function sum([a, b]) {
  return a + b;
}

sum([1, 2]); // 3

// 4. 嵌套解构
function displayUser({
  name,
  address: { city, country },
}) {
  return `${name} lives in ${city}, ${country}`;
}

displayUser({
  name: 'Alice',
  address: { city: 'New York', country: 'USA' },
});
```

### 参数作用域

一旦设置了参数的默认值，函数在声明初始化时，参数会形成一个单独的作用域。

> 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域 (context)。等到初始化结束，这个作用域就会消失。**这种语法行为，在不设置参数默认值时，是不会出现的**（不设置参数默认值时参数与函数体同一作用域。带默认参数值的函数的函数体里第一层作用域不能再声明 lexical 的同名参数，行为和不带默认参数值的函数一致）。
>
> [ES6 参数作用域和函数体作用域是什么关系？](https://www.zhihu.com/question/325718311/answer/693162235)

**原因：**

- ES 规范的规定，为了符合直觉，兼容老代码
- 保持 `let` 和参数重复的报错处理，保持 `var` 和参数重复的不报错并继承值的处理

```js
// 示例 1：var 不报错
function f1(
  x = 2,
  f = function () {
    x = 3;
  },
) {
  var x; // 函数体内的 x 是新变量，与参数 x 不同
  f(); // 修改的是参数作用域的 x
  console.log(x); // undefined（函数体内的 x 未赋值）
}

f1(); // undefined

// 示例 2：let 报错
function f2(
  x2 = 2,
  f = function () {
    x2 = 3;
  },
) {
  let x2 = 5; // SyntaxError: Identifier 'x2' has already been declared
  f();
  console.log(x2);
}
// f2(); // 报错

// 带默认参数值的函数的函数体里第一层作用域不能再声明 lexical 的同名参数的原因很简单：
// 如果让你声明了，那那个参数的实参还能拿的到吗，同时也是为了和不带默认参数值的函数统一。
```

**更多示例：**

```js
// 示例 3：参数默认值引用其他参数
let x = 1;

function f3(x, y = x) {
  console.log(y);
}

f3(2); // 2（y 引用的是参数 x，不是外部 x）

// 示例 4：参数默认值引用外部变量
let z = 1;

function f4(x = z) {
  let z = 2;
  console.log(x);
}

f4(); // 1（参数 x 的默认值引用的是外部 z）
```

### 函数的 length 属性

`length` 属性返回函数定义时**期望接收的参数个数**（即没有默认值的参数个数）。

```js
// 基本用法
function f1(a, b) {}
console.log(f1.length); // 2

// 默认参数不计入 length
function f2(a, b = 1) {}
console.log(f2.length); // 1

// 默认参数后的参数也不计入
function f3(a = 1, b, c) {}
console.log(f3.length); // 0

// 剩余参数不计入 length
function f4(a, ...rest) {}
console.log(f4.length); // 1

function f5(...args) {}
console.log(f5.length); // 0

// 解构参数计为 1 个参数
function f6({ a, b }) {}
console.log(f6.length); // 1
```

**规则总结：**

- 只计算第一个默认参数之前的参数
- 剩余参数不参与计数
- 解构参数算作一个参数

### 函数的 name 属性

函数的 `name` 属性返回函数的名称：

```js
// 1. 函数声明
function foo() {}
console.log(foo.name); // 'foo'

// 2. 匿名函数表达式
const bar = function () {};
console.log(bar.name); // 'bar'

// 3. 具名函数表达式
const baz = function namedFunc() {};
console.log(baz.name); // 'namedFunc'

// 4. 箭头函数
const arrow = () => {};
console.log(arrow.name); // 'arrow'

// 5. 对象方法
const obj = {
  sayHi() {},
};
console.log(obj.sayHi.name); // 'sayHi'

// 6. 使用 bind 返回的函数
function original() {}
const bound = original.bind(null);
console.log(bound.name); // 'bound original'

// 7. 使用 Function 构造函数
const dynamic = new Function();
console.log(dynamic.name); // 'anonymous'

// 8. getter 和 setter
const descriptor = {
  get prop() {},
  set prop(value) {},
};
const getter = Object.getOwnPropertyDescriptor(descriptor, 'prop').get;
const setter = Object.getOwnPropertyDescriptor(descriptor, 'prop').set;
console.log(getter.name); // 'get prop'
console.log(setter.name); // 'set prop'
```

### 函数参数的尾逗号

ES2017 允许函数的最后一个参数有尾逗号 (trailing comma)：

```js
// 函数定义时使用尾逗号
function foo(
  param1,
  param2,
  param3, // 尾逗号
) {
  // ...
}

// 函数调用时使用尾逗号
foo(
  'arg1',
  'arg2',
  'arg3', // 尾逗号
);
```

**好处：**

- 便于版本控制，添加/删除参数时，差异更清晰
- 避免在添加新参数时忘记加逗号导致的错误

## this 与函数调用

### call、apply、bind

这三个方法用于改变函数执行时的 `this` 指向：

```js
const person = {
  name: 'Alice',
};

function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

// 1. call：立即调用，参数逐个传递
console.log(greet.call(person, 'Hello', '!')); // 'Hello, Alice!'

// 2. apply：立即调用，参数以数组形式传递
console.log(greet.apply(person, ['Hi', '?'])); // 'Hi, Alice?'

// 3. bind：返回新函数，不立即调用
const boundGreet = greet.bind(person, 'Hey');
console.log(boundGreet('.')); // 'Hey, Alice.'
```

**区别：**

| 方法    | 是否立即执行 | 参数传递方式     | 返回值       |
| ------- | ------------ | ---------------- | ------------ |
| `call`  | 是           | 逐个传递         | 函数执行结果 |
| `apply` | 是           | 数组形式传递     | 函数执行结果 |
| `bind`  | 否           | 逐个传递（可预设）| 新函数       |

**应用场景：**

```js
// 1. 借用方法
const arrayLike = { 0: 'a', 1: 'b', length: 2 };
const arr = Array.prototype.slice.call(arrayLike);
console.log(arr); // ['a', 'b']

// 2. 找出数组中的最大值
const numbers = [5, 6, 2, 3, 7];
const max = Math.max.apply(null, numbers);
console.log(max); // 7

// 3. 偏函数应用（Partial Application）
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);
console.log(double(5)); // 10
console.log(double(10)); // 20

// 4. 保持 this 上下文
class Button {
  constructor() {
    this.clicked = false;
    // 使用 bind 确保 handleClick 中的 this 指向实例
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.clicked = true;
  }
}
```

### 箭头函数与 this

箭头函数没有自己的 `this`，它会捕获定义时所在上下文的 `this`：

```js
// 示例 1：对象方法中的 this
const obj = {
  name: 'Alice',
  regularFunc: function () {
    console.log(this.name); // 'Alice'
  },
  arrowFunc: () => {
    console.log(this.name); // undefined（this 指向外层作用域）
  },
};

obj.regularFunc(); // 'Alice'
obj.arrowFunc(); // undefined

// 示例 2：定时器中的 this
function Timer() {
  this.seconds = 0;

  // 普通函数：需要保存 this
  setInterval(function () {
    this.seconds++; // this 指向全局对象
    console.log(this.seconds); // NaN
  }, 1000);
}

function Timer2() {
  this.seconds = 0;

  // 箭头函数：自动捕获外层 this
  setInterval(() => {
    this.seconds++; // this 指向 Timer2 实例
    console.log(this.seconds); // 1, 2, 3...
  }, 1000);
}

// 示例 3：事件处理器
class Button {
  constructor() {
    this.count = 0;
  }

  // 使用箭头函数作为类字段
  handleClick = () => {
    this.count++;
    console.log(this.count);
  };
}
```

**箭头函数的限制：**

1. 没有自己的 `this` 对象
2. 不可以当作构造函数（不能使用 `new` 命令）
3. 没有 `arguments` 对象（可以用剩余参数代替）
4. 不可以使用 `yield` 命令（不能用作 Generator 函数）
5. 没有 `prototype` 属性

```js
// 1. 没有自己的 this
const obj2 = {
  name: 'Bob',
  arrowFunc: () => {
    console.log(this); // 全局对象或 undefined
  },
};

// 2. 不能使用 new
const ArrowFunc = () => {};
// new ArrowFunc(); // TypeError: ArrowFunc is not a constructor

// 3. 没有 arguments
const regularFunc = function () {
  console.log(arguments); // Arguments 对象
};

const arrowFunc = (...args) => {
  // console.log(arguments); // ReferenceError
  console.log(args); // 使用剩余参数代替
};

// 4. 没有 prototype
console.log(regularFunc.prototype); // {}
console.log(arrowFunc.prototype); // undefined
```

> [为什么箭头函数可以被 bind？](https://www.zhihu.com/question/329538868/answer/722663600)
>
> 虽然箭头函数的 `this` 无法被改变，但 `bind` 仍然可以用于绑定其他参数（偏函数应用）。

## 作用域与闭包

### 闭包的概念

**闭包**的英文是 **closure**，英文的意思大概是：

> A function which closes over the environment (scope) in which it was defined.

所以闭包就是：**函数捕获了其定义时所在作用域中的自由变量**。

**拓展：**[关于闭包的应用实例，这种描述与命名是否更加贴切？](https://www.zhihu.com/question/470407199)

JS 早期封装性太差，很多人用闭包特性来实现封装性，而封装性就需要函数作用域，以至于把闭包、外部函数、作用域三者概念绑定了。

**实际上闭包就是捕获了外部变量的函数而已，外部变量在哪并不重要**。

抛开外部函数，抛开作用域。只讨论一个函数，访问了外部变量，**而且这种访问不是值的复制而是捕获了变量本身**。

**总结：**

- 任何函数都可以是闭包
- 捕获变量的函数是通常意义的闭包
- 方法是捕获了实例 (this) 的闭包
- 纯函数就是捕获变量数为 `0` 的闭包

> [JS 里对象成员方法调用成员变量算不算闭包？](https://www.zhihu.com/question/522638781)

**科普：**[如何从引擎角度正确理解 JavaScript 闭包？](https://www.zhihu.com/question/458327421/answer/1876062459)

### 闭包代码解析

```js
function f1() {
  let a = 2;
  return function f2() {
    console.log(a++);
  };
}

const f = f1();

// 函数也是对象，这里 f 是同一个函数实例，执行了三次
// f 函数捕获了自由变量 a，产生了闭包
// 即使 f1 执行完出栈了，由于闭包的存在，a 会继续累加
f(); // 2
f(); // 3
f(); // 4

// f1()() 每次执行都返回一个新的函数实例
// 虽然也是闭包，但每次都创建了新的变量 a，所以不会累加
f1()(); // 2
f1()(); // 2
```

### 闭包的应用

#### 1. 数据封装和私有变量

```js
function createCounter() {
  let count = 0; // 私有变量

  return {
    increment() {
      return ++count;
    },
    decrement() {
      return --count;
    },
    getCount() {
      return count;
    },
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount()); // 2
console.log(counter.count); // undefined（无法直接访问私有变量）
```

#### 2. 模块模式

```js
const myModule = (function () {
  // 私有变量和函数
  let privateVar = '私有变量';

  function privateFunc() {
    return '私有函数';
  }

  // 公共 API
  return {
    publicVar: '公共变量',
    publicFunc() {
      return privateFunc() + ' - ' + privateVar;
    },
  };
})();

console.log(myModule.publicFunc()); // '私有函数 - 私有变量'
console.log(myModule.privateVar); // undefined
```

#### 3. 函数工厂

```js
function createMultiplier(multiplier) {
  return function (num) {
    return num * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

#### 4. 延迟执行和缓存

```js
function memoize(fn) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);
    if (key in cache) {
      console.log('从缓存获取');
      return cache[key];
    }

    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

const expensiveFunc = (n) => {
  console.log('计算中...');
  return n * n;
};

const memoized = memoize(expensiveFunc);
console.log(memoized(5)); // '计算中...' 25
console.log(memoized(5)); // '从缓存获取' 25
```

## 高级特性

### 高阶函数

高阶函数是指至少满足下列条件之一的函数：

1. 接受一个或多个函数作为参数
2. 返回一个函数

```js
// 1. 接受函数作为参数
function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}

repeat(3, console.log); // 0 1 2

// 2. 返回函数
function greaterThan(n) {
  return (m) => m > n;
}

const greaterThan10 = greaterThan(10);
console.log(greaterThan10(11)); // true
console.log(greaterThan10(9)); // false

// 3. 常见的高阶函数：map、filter、reduce
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map((x) => x * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

const evens = numbers.filter((x) => x % 2 === 0);
console.log(evens); // [2, 4]

const sum = numbers.reduce((acc, x) => acc + x, 0);
console.log(sum); // 15
```

**高阶函数的应用：**

```js
// 函数组合（Composition）
function compose(...fns) {
  return function (x) {
    return fns.reduceRight((acc, fn) => fn(acc), x);
  };
}

const add1 = (x) => x + 1;
const double = (x) => x * 2;
const square = (x) => x * x;

const combined = compose(square, double, add1);
console.log(combined(3)); // ((3 + 1) * 2) ^ 2 = 64

// 柯里化（Currying）
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

function sum3(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum3);
console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6
console.log(curriedSum(1)(2, 3)); // 6
```

### 递归函数

递归是指函数调用自身的编程技巧：

```js
// 1. 基本递归：计算阶乘
function factorial(n) {
  if (n <= 1) return 1; // 基本情况
  return n * factorial(n - 1); // 递归调用
}

console.log(factorial(5)); // 120

// 2. 斐波那契数列
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(6)); // 8

// 3. 递归遍历树结构
const tree = {
  value: 1,
  children: [
    {
      value: 2,
      children: [{ value: 4 }, { value: 5 }],
    },
    {
      value: 3,
      children: [{ value: 6 }],
    },
  ],
};

function traverse(node) {
  console.log(node.value);
  if (node.children) {
    node.children.forEach(traverse);
  }
}

traverse(tree); // 1 2 4 5 3 6

// 4. 递归扁平化数组
function flatten(arr) {
  return arr.reduce((acc, item) => {
    return acc.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
}

console.log(flatten([1, [2, [3, 4], 5], 6])); // [1, 2, 3, 4, 5, 6]
```

**注意：** 递归可能导致栈溢出，对于深层递归，考虑使用尾递归优化或改用迭代。

### IIFE（立即执行函数表达式）

IIFE (Immediately Invoked Function Expression) 是定义后立即执行的函数：

```js
// 1. 基本语法
(function () {
  console.log('IIFE 执行了');
})();

// 2. 传递参数
(function (name) {
  console.log(`Hello, ${name}!`);
})('Alice');

// 3. 返回值
const result = (function () {
  return 42;
})();
console.log(result); // 42

// 4. 箭头函数 IIFE
(() => {
  console.log('箭头函数 IIFE');
})();

// 5. 其他写法
!(function () {
  console.log('使用 ! 运算符');
})();

+(function () {
  console.log('使用 + 运算符');
})();
```

**应用场景：**

```js
// 1. 避免污染全局作用域
(function () {
  const privateVar = '私有变量';
  // 这里的变量不会污染全局作用域
})();

// 2. 模块模式
const myModule = (function () {
  let privateCounter = 0;

  return {
    increment() {
      privateCounter++;
    },
    getCount() {
      return privateCounter;
    },
  };
})();

// 3. 创建独立的作用域（解决循环中的闭包问题）
// 错误示例：
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i); // 3 3 3
  }, 100);
}

// 使用 IIFE 修复：
for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(function () {
      console.log(j); // 0 1 2
    }, 100);
  })(i);
}

// 现代写法（使用 let）：
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i); // 0 1 2
  }, 100);
}
```

### 尾调用优化

尾调用是指函数的最后一步操作是调用另一个函数：

```js
// 尾调用
function f(x) {
  return g(x); // 最后一步是函数调用
}

// 非尾调用
function f2(x) {
  let y = g(x);
  return y; // 调用后还有其他操作
}

function f3(x) {
  return g(x) + 1; // 调用后还需要计算
}
```

**尾递归优化：**

尾递归是指递归调用是函数的最后一步操作。尾递归可以被优化，避免栈溢出：

```js
// 普通递归（可能栈溢出）
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1); // 不是尾调用，调用后还要乘以 n
}

// 尾递归优化版本
function factorialTail(n, total = 1) {
  if (n === 1) return total;
  return factorialTail(n - 1, n * total); // 尾调用
}

console.log(factorialTail(5)); // 120

// 斐波那契数列的尾递归优化
function fibonacci(n, a = 0, b = 1) {
  if (n === 0) return a;
  return fibonacci(n - 1, b, a + b);
}

console.log(fibonacci(10)); // 55
```

**注意：** ES6 规范支持尾调用优化，但目前只有 Safari 实现了。其他浏览器可能不会进行优化。

**替代方案（蹦床函数）：**

```js
function trampoline(fn) {
  while (typeof fn === 'function') {
    fn = fn();
  }
  return fn;
}

function sum(x, y) {
  if (y > 0) {
    return () => sum(x + 1, y - 1);
  } else {
    return x;
  }
}

console.log(trampoline(sum(1, 100000))); // 不会栈溢出
```

## 函数对象特性

### Function.prototype.toString()

`Function.prototype.toString()` 方法返回函数的源代码字符串：

```js
function func(x, y = 'b') {
  // 这是注释
  return x + y;
}

console.log(func.toString());
// function func(x, y = 'b') {
//   // 这是注释
//   return x + y;
// }

// 箭头函数
const arrow = (a, b) => a + b;
console.log(arrow.toString());
// (a, b) => a + b

// 内置函数会显示 [native code]
console.log(Math.max.toString());
// function max() { [native code] }

// 绑定函数
const bound = func.bind(null, 1);
console.log(bound.toString());
// function () { [native code] }
```

**注意：** ES2019 规定，`toString()` 方法返回的字符串应该与源代码完全一致，包括空格和注释。

### new Function 语法

使用 `Function` 构造函数动态创建函数：

**语法：**

```js
let func = new Function([arg1, arg2, ...argN], functionBody);
```

**示例：**

```js
// 1. 基本用法
const sum = new Function('a', 'b', 'return a + b');
console.log(sum(1, 2)); // 3

// 2. 参数可以用逗号分隔
const sum2 = new Function('a,b', 'return a + b');
console.log(sum2(1, 2)); // 3

// 3. 参数可以用逗号和空格分隔
const sum3 = new Function('a , b', 'return a + b');
console.log(sum3(1, 2)); // 3

// 4. 没有参数
const sayHi = new Function('return "Hello"');
console.log(sayHi()); // 'Hello'
```

**重要特性：**

使用 `new Function` 创建的函数，它的 `[[Environment]]` 指向**全局词法环境**，而不是函数所在的外部词法环境：

```js
let x = 10;

function createFunc() {
  let x = 20;

  // 普通函数：可以访问外部变量
  const normalFunc = function () {
    return x;
  };

  // new Function：只能访问全局变量
  const dynamicFunc = new Function('return x');

  console.log(normalFunc()); // 20（访问外部 x）
  console.log(dynamicFunc()); // 10（访问全局 x）
}

createFunc();
```

**应用场景：**

- 动态生成代码（谨慎使用，注意安全性）
- 执行从服务器接收的代码字符串
- 创建完全独立于外部作用域的函数

### 函数对象

> [JavaScript 里 Function 也是对象？](https://www.zhihu.com/question/24804474)

按照 ECMA-262 的说法：

> An Object is logically a collection of properties.

**只要是一堆属性的组合，那就是对象**。函数就是形参、可执行代码（字符串）的组合，跟对象没有本质区别。

这一点从函数的构造函数也可以看出来：

```js
let fn = new Function('x', 'y', 'return x + y');
```

这跟数组很像：

```js
let array = new Array(1, 2, 3);
```

**函数作为对象可以有自定义属性：**

```js
function sayHi() {
  console.log('Hi');
  sayHi.counter++; // 使用函数属性
}

sayHi.counter = 0; // 添加属性

sayHi(); // Hi
sayHi(); // Hi

console.log(sayHi.counter); // 2
```

**实际应用：**

> 函数可以带有额外的属性。很多知名的 JavaScript 库都充分利用了这个功能。

它们创建一个 "主" 函数，然后给它附加很多其它 "辅助" 函数。例如：

- `jQuery` 库创建了一个名为 `$` 的函数
- `lodash` 库创建一个 `_` 函数，然后为其添加了 `_.add`、`_.keyBy` 以及其它属性

实际上，它们这么做是为了**减少对全局空间的污染**，这样一个库就只会有一个全局变量。这样就降低了命名冲突的可能性。

```js
// jQuery 风格的命名空间
function $(selector) {
  // 主函数
  return document.querySelector(selector);
}

// 添加辅助方法
$.ajax = function (url) {
  // ajax 实现
};

$.each = function (arr, callback) {
  // each 实现
};

// 使用
$('#app');
$.ajax('/api/data');
```

## 函数与方法的区分

> [JavaScript 里听说区分函数和方法，而 Java 里只听说过方法，到底有什么区别？](https://www.zhihu.com/question/327545153)

在 JavaScript 里函数是身兼多职的，同一个函数可以同时是方法和构造器。规范里有对函数和方法下过定义：

> **对象**：一个对象就是若干属性的集合。
> **函数**：一个函数就是一个可调用的对象。
> **方法**：挂在对象属性上的函数就叫方法。

**对象 > 函数 > 方法**，他们是包含关系。

实际上没有人在意这两者的关系，这两个术语经常是混用的。

### ES6 的方法定义（MethodDefinition）

从 ES6 开始，还有一个新的、从静态语义上定义的 "方法"，叫 `MethodDefinition`。

**这些是方法：**

```js
const obj = {
  foo() {}, // 方法
  *bar() {}, // Generator 方法
  async baz() {}, // 异步方法
};
```

**这些不是方法：**

```js
const obj = {
  foo: function () {}, // 函数表达式
  bar: function* () {}, // Generator 函数表达式
  baz: async function () {}, // 异步函数表达式
};
```

**区别：**

`MethodDefinition` 定义的方法有 `[[HomeObject]]` 内部属性，可以使用 `super` 关键字：

```js
const parent = {
  greet() {
    return 'Hello';
  },
};

// 正确：使用 MethodDefinition
const child1 = {
  __proto__: parent,
  greet() {
    return super.greet() + ', World!'; // 可以使用 super
  },
};

console.log(child1.greet()); // 'Hello, World!'

// 错误：使用函数表达式
const child2 = {
  __proto__: parent,
  greet: function () {
    // return super.greet() + ', World!'; // SyntaxError: 'super' keyword unexpected here
  },
};
```

> [下列代码为什么会产生 'super' keyword unexpected here 的错误？](https://www.zhihu.com/question/519019902)

## 拓展

### 相关文章

- [现代浏览器生成一个 JS 函数的开销多大？](https://www.zhihu.com/question/345689944/answer/943385371)
- [如何从引擎角度正确理解 JavaScript 闭包？](https://www.zhihu.com/question/458327421/answer/1876062459)
- [关于闭包的应用实例，这种描述与命名是否更加贴切？](https://www.zhihu.com/question/470407199)
- [ES6 参数作用域和函数体作用域是什么关系？](https://www.zhihu.com/question/325718311/answer/693162235)
- [为什么箭头函数可以被 bind？](https://www.zhihu.com/question/329538868/answer/722663600)
- [JavaScript 里听说区分函数和方法，而 Java 里只听说过方法，到底有什么区别？](https://www.zhihu.com/question/327545153)
- [JavaScript 里 Function 也是对象？](https://www.zhihu.com/question/24804474)

### 性能考虑

1. **避免在循环中创建函数**（除非必要）
2. **考虑使用函数声明而非函数表达式**（提升性能）
3. **谨慎使用递归**（注意栈溢出）
4. **利用缓存避免重复计算**（memoization）
5. **现代引擎对箭头函数优化很好**，可以放心使用

### 最佳实践

1. **优先使用 `const` 定义函数表达式**
2. **使用箭头函数简化代码**（但注意 `this` 的区别）
3. **使用默认参数代替参数检查**
4. **使用剩余参数代替 `arguments`**
5. **函数应该只做一件事**（单一职责原则）
6. **避免副作用**，优先编写纯函数
7. **给函数起有意义的名字**
8. **保持函数参数数量合理**（建议不超过 3-4 个）
