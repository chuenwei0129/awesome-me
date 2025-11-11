---
group:
  title: javaScript
  order: 3
title: Symbol
toc: content
order: 12
---

## 概述

ES6 引入了一种新的原始数据类型 `Symbol`，表示独一无二的值。它是 JavaScript 的第七种数据类型，与 `undefined`、`null`、`Boolean`、`String`、`Number`、`Object` 并列。

### 基本特性

- **唯一性**：每个 Symbol 值都是唯一的，即使描述相同
- **不可变性**：Symbol 值创建后不可更改
- **不可枚举**：作为对象属性时，不会出现在 `for...in`、`for...of` 循环中
- **不会被自动转换**：不能隐式转换为字符串或数字

### 基本用法

```js
// 创建 Symbol
let s1 = Symbol();
let s2 = Symbol('foo'); // 'foo' 是描述，用于调试
let s3 = Symbol('bar');
let s4 = Symbol();

// 每个 Symbol 都是唯一的
console.log(s1 === s4); // false
console.log(Symbol('foo') === Symbol('foo')); // false

// Symbol 值可以显式转为字符串
console.log(s1.toString()); // "Symbol()"
console.log(s2.toString()); // "Symbol(foo)"
console.log(String(s1) === String(s4)); // true，转为字符串后都是 "Symbol()"

// Symbol 值可以转为布尔值，但不能转为数值
console.log(Boolean(s1)); // true
console.log(!s1); // false
// console.log(Number(s1)); // TypeError: Cannot convert a Symbol value to a number

// ES2019 提供了实例属性 description，直接返回 Symbol 的描述
console.log(s2.description); // "foo"
console.log(s1.description); // undefined
```

### Symbol.for() 和 Symbol.keyFor()

有时我们希望重新使用同一个 Symbol 值，`Symbol.for()` 方法可以做到这一点。它接受一个字符串作为参数，搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建一个。

```js
// Symbol.for() 会在全局注册表中登记 Symbol
let s5 = Symbol.for('foo');
let s6 = Symbol.for('foo');

console.log(s5 === s6); // true

// Symbol() 创建的不会被登记
let s2 = Symbol('foo');
console.log(s5 === s2); // false

// Symbol.keyFor() 返回一个已登记的 Symbol 类型值的 key
console.log(Symbol.keyFor(s5)); // "foo"
console.log(Symbol.keyFor(s2)); // undefined，因为 s2 未登记
```

**注意**：`Symbol.for()` 为 Symbol 值登记的名字是全局的，可以在不同的 iframe 或 service worker 中取到同一个值。

## Symbol 的引用

在 JavaScript 中，当我们说有对某个 `Symbol` 的引用，意味着你在代码中持有那个 `Symbol` 实例的一个变量或常量，从而能够通过这个引用来访问使用该 `Symbol` 作为键的对象属性。

`Symbol` 是一种原始数据类型，每次通过 `Symbol()` 函数调用创建的 `Symbol` 都是唯一的。即便两个 `Symbol` 的描述相同，它们也是不相等的。因此，要访问一个使用 `Symbol` 作为键的属性，你必须直接使用那个 `Symbol` 的引用。

### 使用 Symbol 引用访问属性

```javascript
// 创建一个 Symbol
let sym = Symbol('mySymbol');

// 使用 Symbol 作为对象属性的键
let obj = {
  [sym]: 'symbol value',
  normalKey: 'normal value',
};

// 通过 Symbol 的引用访问属性值
console.log(obj[sym]); // "symbol value"
console.log(obj.normalKey); // "normal value"
```

在这个例子中，变量 `sym` 持有一个 `Symbol` 的引用，这个 `Symbol` 被用作对象 `obj` 的一个属性键。只有通过变量 `sym` 才能访问到这个属性。

### 不同 Symbol 无法访问同一属性

如果没有这个 `Symbol` 的引用，就没有办法直接访问到用它作为键的属性：

```javascript
// 即使描述相同，创建的也是不同的 Symbol
let sym2 = Symbol('mySymbol');
console.log(obj[sym2]); // undefined，因为 sym2 和 sym 是不同的 Symbol

// 普通属性遍历无法获取 Symbol 属性
console.log(Object.keys(obj)); // ["normalKey"]
console.log(Object.getOwnPropertyNames(obj)); // ["normalKey"]

// 必须使用特定方法才能获取 Symbol 属性
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(mySymbol)]
console.log(Reflect.ownKeys(obj)); // ["normalKey", Symbol(mySymbol)]
```

因此，当我们谈论"有对该 `Symbol` 的引用"，就是指你能够通过某个变量或常量来访问那个 `Symbol`，并利用它来访问或操作使用该 `Symbol` 作为键的对象属性。这是 `Symbol` 用于创建"私有"属性的关键机制。

## 作为私有属性

在 JavaScript 中为了实现私有属性，之前常用的一种方式是**命名规范约定，方法名以 `_` 开始**。

**Symbol 出现之后看到的一个相对较多的场景是用它来模拟私有属性、方法**。这对一些 `for...in`、`Object.getOwnPropertyNames()` 操作是可以隐藏掉这些属性，但是 ES6 中的 Symbol 和强类型语言中的 `private` 相比并不完全是私有的，仍然能通过 `Object.getOwnPropertySymbols()`、`Reflect.ownKeys()` 操作枚举到这些属性进行访问。

### 示例：使用 Symbol 模拟私有属性

```javascript
const privateField = Symbol('privateField');
const privateMethod = Symbol('privateMethod');

class MyClass {
  constructor() {
    this[privateField] = '这是私有字段';
  }

  [privateMethod]() {
    return '这是私有方法';
  }

  publicMethod() {
    // 在类内部可以访问 Symbol 属性
    console.log(this[privateField]);
    console.log(this[privateMethod]());
  }
}

const instance = new MyClass();
instance.publicMethod(); // 可以正常调用

// 外部无法通过常规方式访问
console.log(Object.keys(instance)); // []
console.log(instance.privateField); // undefined

// 但仍可以通过特殊方法访问
const symbols = Object.getOwnPropertySymbols(instance);
console.log(instance[symbols[0]]); // "这是私有字段"
```

### 真正的私有属性

如果需要真正的私有属性，应该使用 ES2022 引入的私有字段语法（`#` 前缀）：

```javascript
class MyClass {
  #privateField = '真正的私有字段';

  getPrivateField() {
    return this.#privateField;
  }
}

const instance = new MyClass();
console.log(instance.getPrivateField()); // "真正的私有字段"
// console.log(instance.#privateField); // SyntaxError
```

## Well-Known Symbols

Well-Known Symbols 是语言规范定义的特殊符号，它们被用于表示语言行为的内部机制。这些内置的 Symbol 值用于自定义对象的内部行为。

### Symbol.hasInstance

对象的 `Symbol.hasInstance` 属性，指向一个内部方法。当其他对象使用 `instanceof` 运算符，判断是否为该对象的实例时，会调用这个方法。

```js
class MyArray {
  // 自定义 instanceof 行为
  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance);
  }
}

console.log([] instanceof MyArray); // true
console.log({} instanceof MyArray); // false

// 等价于：MyArray[Symbol.hasInstance]([])
```

### Symbol.iterator

对象的 `Symbol.iterator` 属性，指向该对象的默认遍历器方法。当使用 `for...of` 循环或扩展运算符时，会调用这个方法。

```js
// 自定义对象的迭代行为
const myIterable = {
  data: [1, 2, 3],
  [Symbol.iterator]() {
    let index = 0;
    const data = this.data;

    return {
      next() {
        if (index < data.length) {
          return { value: data[index++], done: false };
        }
        return { done: true };
      },
    };
  },
};

// 使用 for...of 循环
for (const value of myIterable) {
  console.log(value); // 1, 2, 3
}

// 使用扩展运算符
console.log([...myIterable]); // [1, 2, 3]

// 使用生成器函数简化
const myIterable2 = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  },
};

console.log([...myIterable2]); // [1, 2, 3]
```

### Symbol.toPrimitive

对象的 `Symbol.toPrimitive` 属性，指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。

`Symbol.toPrimitive` 被调用时，会接受一个字符串参数 `hint`，表示当前运算的模式：

- **`number`**：该场合需要转成数值（如 `Number(obj)`、`+obj`、算术运算）
- **`string`**：该场合需要转成字符串（如 `String(obj)`、模板字符串）
- **`default`**：该场合可以转成数值，也可以转成字符串（如 `==`、`+` 运算符）

```js
let obj = {
  [Symbol.toPrimitive](hint) {
    console.log('hint:', hint);
    switch (hint) {
      case 'number':
        return 123;
      case 'string':
        return 'str';
      case 'default':
        return 'default';
      default:
        throw new Error('Invalid hint: ' + hint);
    }
  },
};

console.log(2 * obj); // hint: number → 246
console.log(3 + obj); // hint: default → "3default"
console.log(obj == 'default'); // hint: default → true
console.log(String(obj)); // hint: string → "str"
console.log(Number(obj)); // hint: number → 123
```

**历史知识**：早期的 JavaScript 实现里，通过自定义的 `valueOf()` 转换对象为原始值时，会有个 `hint` 参数，表明它的上下文希望转换出的原始值是字符串还是数字。虽然这个特性最终没有进入 ES1 规范，但在 ES6 中以 `Symbol.toPrimitive` 的形式回归了。

### Symbol.toStringTag

对象的 `Symbol.toStringTag` 属性，指向一个方法，用于自定义对象在被 `Object.prototype.toString()` 调用时返回的字符串标签。

```js
class ValidatorClass {
  get [Symbol.toStringTag]() {
    return 'Validator';
  }
}

console.log(Object.prototype.toString.call(new ValidatorClass())); // "[object Validator]"

// 默认行为
console.log(Object.prototype.toString.call({})); // "[object Object]"
console.log(Object.prototype.toString.call([])); // "[object Array]"
console.log(Object.prototype.toString.call(new Date())); // "[object Date]"
```

### Symbol.species

对象的 `Symbol.species` 属性，指向一个构造函数。创建衍生对象时，会使用该属性指定的构造函数。主要用于类的继承场景。

```js
class MyArray extends Array {
  // 指定衍生对象的构造函数
  static get [Symbol.species]() {
    return Array;
  }
}

const a = new MyArray(1, 2, 3);
const mapped = a.map((x) => x * 2);

console.log(mapped instanceof MyArray); // false
console.log(mapped instanceof Array); // true

// 如果不定义 Symbol.species，mapped 会是 MyArray 的实例
```

### 其他常用 Well-Known Symbols

```js
// Symbol.match - 定义字符串匹配行为
class MyMatcher {
  [Symbol.match](string) {
    return string.indexOf('hello') !== -1;
  }
}

console.log('hello world'.match(new MyMatcher())); // true

// Symbol.replace - 定义字符串替换行为
// Symbol.search - 定义字符串搜索行为
// Symbol.split - 定义字符串分割行为

// Symbol.isConcatSpreadable - 控制数组合并时是否展开
const arr1 = [1, 2];
arr1[Symbol.isConcatSpreadable] = false;
console.log([0].concat(arr1)); // [0, [1, 2]]

const arr2 = [3, 4];
console.log([0].concat(arr2)); // [0, 3, 4]

// Symbol.unscopables - 指定 with 语句中被排除的属性
const obj = {
  a: 1,
  b: 2,
  [Symbol.unscopables]: {
    b: true,
  },
};

with (obj) {
  console.log(a); // 1
  // console.log(b); // ReferenceError: b is not defined
}
```

## 使用场景

### 1. 防止属性名冲突

当需要向第三方对象添加属性时，使用 Symbol 可以保证不会与现有属性冲突。

```javascript
// 假设这是一个第三方库的对象
const thirdPartyObj = {
  name: 'example',
  getValue() {
    return this.value;
  },
};

// 安全地添加自定义属性，不会冲突
const myCustomKey = Symbol('myCustom');
thirdPartyObj[myCustomKey] = 'my value';

console.log(thirdPartyObj[myCustomKey]); // "my value"
console.log(Object.keys(thirdPartyObj)); // ["name", "getValue"]
```

### 2. 定义常量

使用 Symbol 定义常量，可以保证这些值是唯一的。

```javascript
// 传统方式 - 可能出现值重复
const COLOR_RED = 'red';
const COLOR_GREEN = 'green';

// 使用 Symbol - 保证唯一性
const COLOR_RED = Symbol('red');
const COLOR_GREEN = Symbol('green');

function handleColor(color) {
  switch (color) {
    case COLOR_RED:
      console.log('红色');
      break;
    case COLOR_GREEN:
      console.log('绿色');
      break;
  }
}
```

### 3. 实现单例模式

```javascript
const FOO_KEY = Symbol.for('foo');

class Singleton {
  static getInstance() {
    if (!global[FOO_KEY]) {
      global[FOO_KEY] = new Singleton();
    }
    return global[FOO_KEY];
  }
}

const a = Singleton.getInstance();
const b = Singleton.getInstance();
console.log(a === b); // true
```

### 4. 元编程和 API 设计

```javascript
// 定义内部使用的元数据
const METADATA = Symbol('metadata');

class Component {
  constructor(config) {
    this[METADATA] = {
      createdAt: Date.now(),
      version: '1.0.0',
    };
    this.config = config;
  }

  getMetadata() {
    return this[METADATA];
  }
}
```

## 注意事项

1. **JSON 序列化**：Symbol 属性不会出现在 `JSON.stringify()` 的结果中

   ```javascript
   const obj = {
     [Symbol('foo')]: 'symbol value',
     bar: 'normal value',
   };
   console.log(JSON.stringify(obj)); // {"bar":"normal value"}
   ```

2. **属性遍历**：Symbol 属性需要使用特定方法获取

   ```javascript
   const obj = {
     [Symbol('a')]: 'a',
     b: 'b',
   };

   // 获取 Symbol 属性
   Object.getOwnPropertySymbols(obj); // [Symbol(a)]

   // 获取所有属性（包括 Symbol）
   Reflect.ownKeys(obj); // ["b", Symbol(a)]
   ```

3. **不是完全私有**：Symbol 属性可以通过 `Object.getOwnPropertySymbols()` 和 `Reflect.ownKeys()` 访问

4. **不能使用 new**：Symbol 是原始类型，不能使用 `new` 操作符

   ```javascript
   // const s = new Symbol(); // TypeError: Symbol is not a constructor
   const s = Symbol(); // 正确
   ```

5. **全局注册表**：使用 `Symbol.for()` 时要注意全局注册表的影响，避免意外的 Symbol 共享

## 总结

- Symbol 是 ES6 引入的新的原始数据类型，表示独一无二的值
- 主要用途：防止属性名冲突、定义对象的私有属性、定义常量
- 通过 `Symbol.for()` 可以创建全局注册的 Symbol
- Well-Known Symbols 用于自定义对象的内部行为
- Symbol 属性不会出现在常规的属性遍历中，但不是完全私有的
- 在需要真正私有属性时，应使用 ES2022 的私有字段语法（`#` 前缀）
