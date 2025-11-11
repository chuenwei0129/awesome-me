---
group:
  title: javaScript
  order: 3
title: Object
toc: content
order: 9
---

## 一、基础概念

### 对象的认知起源

面向对象编程并不是一种"高深的技术"，它反而源于人类认知中最自然的一部分。

研究表明，人类在 5 岁左右就能生成"对象"的抽象概念，甚至在 2〜3 岁时就能区分："这个苹果" 和 "那个苹果" 是两个不同的东西。

在英文中 **Object** 指代一个抽象或具体的物体，而中文翻译为"对象"有一定语义上的误解。台湾地区则翻译为"物件"，更接近原意。

#### 经典案例：三条鱼的故事

想象一个孩子看到 **三条完全相同的鱼**：

- 他能马上认出它们是三个不同的个体
- 如果其中一条鱼失去了尾巴，另外两条鱼不会受到影响

这就是对象的核心思想：

**对象的唯一性特征**：

1. 对象具有独立的身份标识
2. 状态由对象自身定义，而不是对象由状态决定
3. 即使两个对象的状态完全相同，它们依然是不同的对象

例子在代码中的表达：

```javascript
const fish1 = { id: 1, hasTail: true };
const fish2 = { id: 2, hasTail: true };

console.log(fish1 === fish2); // false（不同的对象，即使状态一样）
```

这套思路是所有面向对象语言的基础。

### 对象的三要素

一个对象通常由三大核心要素组成：

1. **唯一标识（Identity）**
   用来区分不同对象的身份，如内存引用 ID。

2. **状态（State）**
   对象的属性集合，描述其当前状况。

3. **行为（Behavior）**
   改变对象状态的方法。

示意图：

```
┌─────────────────────────┐
│        对象 (Object)     │
├─────────────────────────┤
│ 唯一标识 (Identity)      │
│ 状态 (State)             │
│ 行为 (Behavior)          │
└─────────────────────────┘
  ↑ 行为改变状态，状态属于对象
```

---

## 二、对象的创建

### 对象的创建方式

JavaScript 提供了多种创建对象的方式：

```js
// 1. 对象字面量（最常用）
const obj1 = { name: 'Alice' };

// 2. new Object()
const obj2 = new Object();
obj2.name = 'Bob';

// 3. Object.create()
const proto = { type: 'person' };
const obj3 = Object.create(proto);

// 4. 构造函数
function Person(name) {
  this.name = name;
}
const obj4 = new Person('Charlie');

// 5. class（ES6）
class Animal {
  constructor(name) {
    this.name = name;
  }
}
const obj5 = new Animal('Dog');
```

### new 关键字原理

使用 `new` 命令时，它后面的函数依次执行下面的步骤：

1. 创建一个空对象，作为将要返回的对象实例。
2. 将这个空对象的原型，指向构造函数的 `prototype` 属性。
3. 将这个空对象赋值给函数内部的 `this` 关键字。
4. 开始执行构造函数内部的代码。

> **提示**
>
> 构造函数内部有 `return` 语句，并且 `return` 后面跟着一个对象，`new` 命令会返回 `return` 语句指定的对象，后面跟着原始类型，`new` 命令 `return` 会忽略，`new` 命令默认返回 `{}` 对象。

```js
function _new(Constructor, ...args) {
  const instance = Object.create(Constructor.prototype);
  const res = Constructor.call(instance, ...args);
  return typeof res === 'object' && res !== null ? res : instance;
}

// 构造函数默认返回 this
function Person(name, age) {
  this.name = name;
  this.age = age;
  // return {
  //  name: name,
  //  age: age,
  // }
}

Person.prototype.sayName = function () {
  console.log(`我的名字：${this.name}，我的年龄：${this.age}。`);
};

const student = new Person('x', 23);
student.sayName(); // 我的名字：x，我的年龄：23。
const teacher = _new(Person, 'y', 35);
teacher.sayName(); // 我的名字：y，我的年龄：35。
```

### Object.create() 方法详解

#### 什么是 Object.create()？

`Object.create()` 是 JavaScript 中的一个静态方法，它允许我们以现有对象作为原型来创建一个新对象。这是 JavaScript 原型继承的核心机制之一。

#### 基本语法

```js
Object.create(proto);
Object.create(proto, propertiesObject);
```

- **proto**：新创建对象的原型对象
- **propertiesObject**（可选）：要添加到新对象的属性描述符

#### 基本用法

##### 1. 创建空对象

```js
const emptyObj = Object.create(Object.prototype);
// 等价于 const emptyObj = {};
```

##### 2. 原型继承

```js
const person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  },
};

const me = Object.create(person);

me.name = 'Matthew'; // "name" 是 "me" 的属性，不是 "person" 的属性
me.isHuman = true; // 继承的属性可以被覆盖

me.printIntroduction();
// 输出: "My name is Matthew. Am I human? true"
```

##### 3. 创建没有原型的对象

```js
const objWithoutProto = Object.create(null);
console.log(objWithoutProto.toString); // undefined
// 这个对象不继承任何属性和方法，包括基础的 Object 方法
```

#### 实现浅拷贝

`Object.create()` 结合 `Object.getOwnPropertyDescriptors()` 可以实现高质量的浅拷贝：

```js
const obj = {
  name: 'Tom',
  get age() {
    return 18;
  },
  hobbies: ['reading', 'music'],
};

const copy = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj),
);

console.log(copy.name); // 'Tom'
console.log(copy.age); // 18 - getter 保持功能
console.log(copy.hobbies === obj.hobbies); // true - 浅拷贝，共享引用
```

**为什么是浅拷贝？**

- 创建了新对象，基本类型属性被复制
- 但引用类型属性共享同一内存地址
- 比普通浅拷贝方法更完整，保留了 getter/setter 和属性特性

#### 手写实现原理

理解 `Object.create()` 的内部原理有助于更好地掌握原型继承：

```js
function createObject(proto) {
  function F() {}
  F.prototype = proto;
  return new F();
}

// 使用示例
const o = { o: 1 };
const instance = Object.create(o);
const _instance = createObject(o);

console.log(Object.getPrototypeOf(instance)); // {o: 1}
console.log(Object.getPrototypeOf(_instance)); // {o: 1}
console.log(o.isPrototypeOf(_instance)); // true
```

#### 相关原型方法

- **Object.getPrototypeOf()**：返回参数对象的原型
- **Object.setPrototypeOf()**：为参数对象设置原型
- **isPrototypeOf()**：判断对象是否为参数对象的原型

```js
const o = {};
// const o = {} 是 const o = new Object() 的语法糖
console.log('构造器', o.constructor); // Object

function F() {}
Object.setPrototypeOf(o, F.prototype);

console.log('修改原型链后的构造器', o.constructor); // F
```

---

## 三、面向对象编程

### JavaScript 的面向对象特性

JavaScript 是一种基于原型（prototype-based）的面向对象语言，而不是基于类（class-based）的语言。虽然 ES6 引入了 `class` 语法，但这只是语法糖，本质上仍然是基于原型的。

### 对象的描述方式

JavaScript 作为一门动态语言，同时支持 **基于类（Class-based）** 和 **基于原型（Prototype-based）** 的对象构建方式。

#### 1. 分类（Class-based）

类似生物学"界–门–纲–目–科–属–种"的层级分类。

> 从"动物"到"鱼"，再到"金鱼"，是一层一层细化的过程。

**代码示例**：

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  breathe() {
    console.log(`${this.name} is breathing`);
  }
}

class Fish extends Animal {
  constructor(name) {
    super(name);
    this.canSwim = true;
  }
  swim() {
    console.log(`${this.name} is swimming`);
  }
}

class Goldfish extends Fish {
  constructor(name) {
    super(name);
    this.color = 'orange';
  }
}

const goldie = new Goldfish('Goldie');
goldie.breathe(); // Goldie is breathing
goldie.swim(); // Goldie is swimming
```

**特点**：

- 单继承结构
- 类型系统友好
- 层次清晰，适合明确的业务对象建模

#### 2. 归类（Generalization）

通过提取多个对象的共性形成一个更抽象的类，甚至具有多继承的可能。

示意图：

```
┌───────┐       ┌───────┐
│  鱼   │──────▶│ 动物  │
└───────┘       └───────┘
   ▲                ▲
   │                │
┌───────┐       ┌──────────┐
│水生生物│      │  哺乳动物 │
└───────┘       └──────────┘
```

JavaScript 虽不直接支持多继承，但可以通过 **mixin** 技巧实现多种能力组合。

**Mixin 示例**：

```javascript
const swimmable = {
  swim() {
    console.log(`${this.name} is swimming`);
  },
};

const flyable = {
  fly() {
    console.log(`${this.name} is flying`);
  },
};

class Animal {
  constructor(name) {
    this.name = name;
  }
}

Object.assign(Animal.prototype, swimmable, flyable);

const duck = new Animal('Duck');
duck.swim();
duck.fly();
```

#### 3. 原型（Prototype-based）

JavaScript 的本质就是基于原型的对象系统。新对象可以"照猫画虎"地拷贝已有对象，然后修改部分属性。

**原型链示例**：

```
┌──────────────────────┐
│  catfish (实例对象)   │
└──────────▲───────────┘
           │ __proto__
┌──────────────────────┐
│ Catfish.prototype    │
└──────────▲───────────┘
           │ __proto__
┌──────────────────────┐
│ Fish.prototype       │
└──────────▲───────────┘
           │ __proto__
┌──────────────────────┐
│ Animal.prototype     │
└──────────▲───────────┘
           │ __proto__
┌──────────────────────┐
│ Object.prototype     │
└──────────▲───────────┘
           │ __proto__
           null

```

**代码演示**：

```javascript
function Animal(name) {
  this.name = name;
}
Animal.prototype.breathe = function () {
  console.log(`${this.name} is breathing`);
};

function Fish(name) {
  Animal.call(this, name);
  this.canSwim = true;
}
Fish.prototype = Object.create(Animal.prototype);
Fish.prototype.constructor = Fish;
Fish.prototype.swim = function () {
  console.log(`${this.name} is swimming`);
};

function Catfish(name) {
  Fish.call(this, name);
}
Catfish.prototype = Object.create(Fish.prototype);
Catfish.prototype.constructor = Catfish;

const catfish = new Catfish('Catfish');
```

### 实践案例：设计"狗咬人"场景

#### 错误设计：

```javascript
class Dog {
  bite(human) {
    // ❌ 错误：这个行为改变的是 Human 的状态
  }
}
```

#### 正确设计：

```javascript
class Human {
  hurt(damage) {
    this.health -= damage;
    console.log(`${this.name} is hurt`);
  }
}

class Dog {
  bark() {
    console.log('Woof!');
  }
}
```

**原则**：

- 对象的行为必须用来改变对象自身的状态
- 不要让一个对象直接修改另一个对象的内部状态，否则会降低内聚性

**参考资料：**

- [视频教程：对象的基础认知](https://www.bilibili.com/video/BV11e4y1W7CF?p=10)
- [JavaScript 凭什么不是面向对象的语言？](https://www.zhihu.com/question/506559729/answer/2276185739)

---

## 四、原型与原型链

### 核心概念

原型链是 JavaScript 实现继承的主要机制。理解原型链是掌握 JavaScript 面向对象编程的关键。

![原型链示意图](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/v2-5dc8e9e596edaa0ce9a6cf6642496d31_1440w.jpg)

### 关键知识点

#### 1. `__proto__` 与 `prototype` 的区别

- **`__proto__`**：每个对象都有的属性，指向该对象的原型（即创建该对象的构造函数的 `prototype`）
- **`prototype`**：只有函数才有的属性，用于实现基于原型的继承

> **注意**：`__proto__` 是非标准属性，在生产环境中应使用 `Object.getPrototypeOf()` 和 `Object.setPrototypeOf()` 来操作原型。

#### 2. 原型链的形成

当我们通过构造函数创建实例时，会发生以下过程：

1. JavaScript 为构造函数自动添加 `prototype` 属性，值是一个空对象
2. 通过 `new` 关键字调用构造函数时，创建一个新实例
3. 新实例的 `__proto__` 指向构造函数的 `prototype`
4. 实例继承了构造函数 `prototype` 上的所有属性和方法

#### 3. 特殊的 `Function.prototype`

`Function.prototype` 是一个特殊的对象：

- 它是一个函数，可以被调用，但总是返回 `undefined`
- 它没有 `prototype` 属性
- 它继承自 `Object.prototype`
- 所有函数（包括构造函数）都是 `Function` 的实例

**为什么 `Function.prototype` 是函数？**

为了保持类型一致性：

- `Array.prototype` 是 **Array** 类型
- `Map.prototype` 是 **Map** 类型
- `Set.prototype` 是 **Set** 类型
- 因此，`Function.prototype` 也应该是 **Function** 类型

#### 4. 重要的原型关系

- 实例的 `__proto__` 指向构造函数的 `prototype`
- 构造函数的 `__proto__` 指向 `Function.prototype`
- 原型对象的 `__proto__` 指向 `Object.prototype`
- `Object.prototype.__proto__` 指向 `null`（原型链的终点）

### 代码示例

```js
// 定义一个构造函数
function A() {
  // ...
}

// 验证原型关系
// 1. A 是通过 Function 构造函数生成的，所以 A.__proto__ 指向 Function.prototype
console.log(A.__proto__ === Function.prototype); // true

// 2. 原型对象是 Object 构造函数的实例
console.log(A.prototype.__proto__ === Object.prototype); // true

// 3. 原型链的顶端：Object.prototype.__proto__ 为 null
console.log(Object.prototype.__proto__ === null); // true

// 4. Function.prototype 继承自 Object.prototype
console.log(Function.prototype.__proto__ === Object.prototype); // true

// 5. Object 构造函数也是 Function 构造函数的实例
console.log(Object.__proto__ === Function.prototype); // true

// 6. Function 构造函数是它自己的实例（特殊情况）
console.log(Function.__proto__ === Function.prototype); // true

// 创建实例
var a = new A();

// 7. 实例的 __proto__ 指向构造函数的 prototype
console.log(a.__proto__ === A.prototype); // true

// 8. 原型的 constructor 属性指向构造函数
console.log(A.prototype.constructor === A); // true

// 9. 实例可以通过原型链访问 constructor
// 当 a.constructor 被访问时，会沿着原型链查找
// a 本身没有 constructor 属性
// 于是在 a.__proto__（即 A.prototype）中找到
console.log(a.constructor === A); // true
```

### 原型链查找机制

当访问对象的属性时，JavaScript 会按照以下顺序查找：

1. 在对象自身查找
2. 在对象的原型（`__proto__`）中查找
3. 在原型的原型中查找
4. 一直查找到 `Object.prototype`
5. 如果还没找到，返回 `undefined`

```js
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  console.log(`Hello, I'm ${this.name}`);
};

const alice = new Person('Alice');

// 属性查找顺序：
alice.sayHello(); // Hello, I'm Alice
// 1. alice 自身没有 sayHello 方法
// 2. 在 alice.__proto__（Person.prototype）中找到
// 3. 调用该方法

console.log(alice.toString()); // [object Object]
// 1. alice 自身没有 toString 方法
// 2. alice.__proto__（Person.prototype）中没有
// 3. alice.__proto__.__proto__（Object.prototype）中找到
// 4. 调用该方法
```

**相关资源：**

> [Lodash 严重安全漏洞背后你不得不知道的 JavaScript 知识](https://zhuanlan.zhihu.com/p/73186974)

---

## 五、属性系统

### 属性描述对象

#### 什么是属性描述对象

对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。属性描述对象提供了细粒度的属性控制能力。

#### 六个元属性

属性描述对象包含以下 6 个元属性：

**数据属性**

- **`value`**：属性的值，默认为 `undefined`
- **`writable`**：布尔值，表示属性值是否可修改，默认为 `true`
- **`enumerable`**：布尔值，表示属性是否可枚举，默认为 `true`
  - 如果设为 `false`，某些操作（如 `for...in`、`Object.keys()`）会跳过该属性
  - **注意**：原型上的方法默认 `enumerable` 为 `false`，以避免 `for...in` 遍历到不必要的属性
- **`configurable`**：布尔值，表示属性是否可配置，默认为 `true`
  - 如果设为 `false`，将阻止删除该属性，也不能修改属性描述对象（`value` 除外）

**访问器属性**

- **`get`**：取值函数（getter），默认为 `undefined`
  - **注意**：通过对象字面量定义的 getter 默认可枚举，通过 `Object.defineProperty` 定义的 getter 默认不可枚举
- **`set`**：存值函数（setter），默认为 `undefined`

> **重要**：一个属性不能同时拥有数据属性（`value`/`writable`）和访问器属性（`get`/`set`）。

#### 获取属性描述对象

使用 `Object.getOwnPropertyDescriptor()` 方法可以获取属性的描述对象：

```js
const obj = { foo: 1 };
const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');

console.log(descriptor);
// { value: 1, writable: true, enumerable: true, configurable: true }

// 获取所有属性的描述对象
const obj2 = {
  foo: 123,
  get bar() {
    return 'abc';
  },
};

console.log(Object.getOwnPropertyDescriptors(obj2));
// {
//   foo: { value: 123, writable: true, enumerable: true, configurable: true },
//   bar: { get: [Function: get bar], set: undefined, enumerable: true, configurable: true }
// }
```

#### 定义或修改属性

**单个属性：`Object.defineProperty()`**

该方法允许通过属性描述对象定义或修改一个属性，接受三个参数：

- `object`：属性所在的对象
- `propertyName`：字符串，表示属性名
- `attributesObject`：属性描述对象

```js
const obj = {};

// 定义一个只读属性
Object.defineProperty(obj, 'name', {
  value: 'Alice',
  writable: false, // 不可修改
  enumerable: true,
  configurable: true,
});

console.log(obj.name); // Alice
obj.name = 'Bob'; // 严格模式下会报错，非严格模式下静默失败
console.log(obj.name); // Alice

// 定义一个不可枚举的属性
Object.defineProperty(obj, 'age', {
  value: 25,
  enumerable: false, // 不可枚举
});

console.log(Object.keys(obj)); // ['name']（age 不会出现）

// 定义访问器属性
Object.defineProperty(obj, 'greeting', {
  get() {
    return `Hello, ${this.name}`;
  },
  set(value) {
    console.log(`Setting greeting to: ${value}`);
  },
  enumerable: true,
  configurable: true,
});

console.log(obj.greeting); // Hello, Alice
obj.greeting = 'Hi'; // Setting greeting to: Hi
```

**多个属性：`Object.defineProperties()`**

如果需要一次性定义或修改多个属性，可以使用 `Object.defineProperties()` 方法：

```js
const person = {};

Object.defineProperties(person, {
  name: {
    value: 'Alice',
    writable: true,
    enumerable: true,
  },
  age: {
    value: 25,
    writable: true,
    enumerable: true,
  },
  fullName: {
    get() {
      return `${this.name} (${this.age} years old)`;
    },
    enumerable: true,
  },
});

console.log(person.fullName); // Alice (25 years old)
```

#### 属性的可枚举性

描述对象的 `enumerable` 属性称为"可枚举性"，如果该属性为 `false`，以下操作会忽略该属性：

| 操作                 | 范围                           | 说明                          |
| -------------------- | ------------------------------ | ----------------------------- |
| `for...in`           | 对象自身的和继承的可枚举属性   | 唯一会遍历继承属性的方法      |
| `Object.keys()`      | 对象自身的所有可枚举属性的键名 | 返回数组                      |
| `JSON.stringify()`   | 对象自身的可枚举属性           | 序列化时忽略不可枚举属性      |
| `Object.assign()`    | 对象自身的可枚举属性           | 只拷贝可枚举属性              |
| 对象扩展运算符 `...` | 对象自身的可枚举属性           | 与 `Object.assign()` 行为类似 |

```js
const obj = {};

Object.defineProperty(obj, 'visible', {
  value: 1,
  enumerable: true,
});

Object.defineProperty(obj, 'hidden', {
  value: 2,
  enumerable: false,
});

console.log(Object.keys(obj)); // ['visible']
console.log(JSON.stringify(obj)); // {"visible":1}

for (const key in obj) {
  console.log(key); // 只输出 'visible'
}
```

### 属性的遍历

JavaScript 提供了多种方法来遍历对象的属性，不同的方法有不同的遍历范围和特性。

#### 五种遍历方法对比

| 方法                             | 自身属性 | 继承属性 | 可枚举 | 不可枚举 | Symbol | 返回值      |
| -------------------------------- | -------- | -------- | ------ | -------- | ------ | ----------- |
| `for...in`                       | ✅       | ✅       | ✅     | ❌       | ❌     | 键名        |
| `Object.keys()`                  | ✅       | ❌       | ✅     | ❌       | ❌     | 键名数组    |
| `Object.getOwnPropertyNames()`   | ✅       | ❌       | ✅     | ✅       | ❌     | 键名数组    |
| `Object.getOwnPropertySymbols()` | ✅       | ❌       | ✅     | ✅       | ✅     | Symbol 数组 |
| `Reflect.ownKeys()`              | ✅       | ❌       | ✅     | ✅       | ✅     | 键名数组    |

#### 1. `for...in`

遍历对象自身的和继承的可枚举属性（不包含 Symbol 属性）：

```js
const proto = { inherited: 'from prototype' };
const obj = Object.create(proto);
obj.own = 'own property';

for (const key in obj) {
  console.log(key);
  // 输出: own, inherited
}

// 只遍历自身属性
for (const key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(key); // 只输出: own
  }
}

// 推荐使用 Object.hasOwn()（ES2022）
for (const key in obj) {
  if (Object.hasOwn(obj, key)) {
    console.log(key); // 只输出: own
  }
}
```

#### 2. `Object.keys()`

返回对象自身的所有可枚举属性的键名（不包含继承的和 Symbol 属性）：

```js
const obj = { a: 1, b: 2, c: 3 };

console.log(Object.keys(obj)); // ['a', 'b', 'c']

// 不包含不可枚举属性
Object.defineProperty(obj, 'd', {
  value: 4,
  enumerable: false,
});

console.log(Object.keys(obj)); // ['a', 'b', 'c']（d 不在列表中）
```

#### 3. `Object.getOwnPropertyNames()`

返回对象自身的所有属性（包括不可枚举属性，但不包含 Symbol 属性）：

```js
const obj = { a: 1 };

Object.defineProperty(obj, 'b', {
  value: 2,
  enumerable: false,
});

console.log(Object.keys(obj)); // ['a']
console.log(Object.getOwnPropertyNames(obj)); // ['a', 'b']
```

#### 4. `Object.getOwnPropertySymbols()`

返回对象自身的所有 Symbol 属性的键名：

```js
const sym1 = Symbol('foo');
const sym2 = Symbol('bar');

const obj = {
  [sym1]: 'value1',
  [sym2]: 'value2',
  normalProp: 'value3',
};

console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(foo), Symbol(bar)]
console.log(Object.keys(obj)); // ['normalProp']
```

#### 5. `Reflect.ownKeys()`

返回对象自身的所有键名，包括字符串键、Symbol 键、可枚举和不可枚举属性：

```js
const sym = Symbol('symbol');
const obj = {
  a: 1,
  [sym]: 2,
};

Object.defineProperty(obj, 'b', {
  value: 3,
  enumerable: false,
});

console.log(Reflect.ownKeys(obj)); // ['a', 'b', Symbol(symbol)]
```

#### 属性遍历的次序规则

以上所有遍历方法都遵守相同的属性遍历次序规则：

1. **首先遍历所有数值键**，按照数值升序排列
2. **其次遍历所有字符串键**，按照加入时间升序排列
3. **最后遍历所有 Symbol 键**，按照加入时间升序排列

```js
const result = Reflect.ownKeys({
  [Symbol()]: 1,
  10: 'number 10',
  3: 'number 3',
  a: 'string a',
  [Symbol()]: 2,
  z: 'string z',
});

console.log(result);
// 输出顺序：['3', '10', 'a', 'z', Symbol(), Symbol()]
// 1. 数值键：3, 10（按数值升序）
// 2. 字符串键：a, z（按加入时间）
// 3. Symbol 键：Symbol(), Symbol()（按加入时间）
```

#### 实际应用示例

```js
// 场景1：遍历对象的所有可枚举属性
const user = { name: 'Alice', age: 25, city: 'New York' };

Object.keys(user).forEach((key) => {
  console.log(`${key}: ${user[key]}`);
});
// name: Alice
// age: 25
// city: New York

// 场景2：检查对象是否为空
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

console.log(isEmpty({})); // true
console.log(isEmpty({ a: 1 })); // false

// 场景3：获取对象的所有属性（包括不可枚举的）
function getAllProperties(obj) {
  const stringProps = Object.getOwnPropertyNames(obj);
  const symbolProps = Object.getOwnPropertySymbols(obj);
  return [...stringProps, ...symbolProps];
}

// 场景4：安全地遍历对象（排除原型链属性）
function forOwnProperties(obj, callback) {
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      callback(key, obj[key]);
    }
  }
}
```

### 对象的简写语法

ES6 允许在对象字面量中使用简写语法，使代码更加简洁易读。

#### 1. 属性简写

当对象的属性名与变量名相同时，可以省略属性值的书写：

```js
const name = 'Alice';
const age = 25;

// ES5 写法
const person1 = {
  name: name,
  age: age,
};

// ES6 简写
const person2 = {
  name,
  age,
};

console.log(person1); // { name: 'Alice', age: 25 }
console.log(person2); // { name: 'Alice', age: 25 }

// 实际应用：函数返回对象
function createUser(name, age, role) {
  return {
    name,
    age,
    role,
    // 等同于 name: name, age: age, role: role
  };
}
```

#### 2. 方法简写

ES6 允许在对象中直接定义方法，省略 `function` 关键字：

```js
// ES5 写法
const obj1 = {
  sayHello: function () {
    console.log('Hello!');
  },
};

// ES6 简写
const obj2 = {
  sayHello() {
    console.log('Hello!');
  },
};

obj1.sayHello(); // Hello!
obj2.sayHello(); // Hello!

// 实际应用：定义多个方法
const calculator = {
  add(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  },
  multiply(a, b) {
    return a * b;
  },
};

console.log(calculator.add(5, 3)); // 8
```

#### 3. 属性名表达式

ES6 允许使用表达式作为对象的属性名，需要将表达式放在方括号内：

```js
const propKey = 'foo';
const methodKey = 'sayHello';

const obj = {
  // 使用变量作为属性名
  [propKey]: 'bar',

  // 使用变量作为方法名
  [methodKey]() {
    console.log('Hello!');
  },

  // 使用表达式作为属性名
  ['prop' + 'Name']: 'value',

  // 使用计算值作为属性名
  [`key_${Date.now()}`]: 'timestamp value',
};

console.log(obj.foo); // bar
console.log(obj.propName); // value
obj.sayHello(); // Hello!

// 实际应用：动态创建属性
function createObject(key, value) {
  return {
    [key]: value,
  };
}

const obj2 = createObject('dynamicKey', 'dynamicValue');
console.log(obj2.dynamicKey); // dynamicValue
```

#### 综合示例

```js
// 结合多种简写语法
const prefix = 'user';
const name = 'Alice';
const age = 25;

const user = {
  // 属性简写
  name,
  age,

  // 属性名表达式
  [prefix + 'Id']: 12345,

  // 方法简写
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  },

  // getter 方法
  get info() {
    return `${this.name} (${this.age})`;
  },
};

console.log(user.userId); // 12345
console.log(user.info); // Alice (25)
user.greet(); // Hello, I'm Alice
```

---

## 六、对象操作

### 对象的扩展运算符

对象的扩展运算符（`...`）用于取出对象的所有可枚举属性，拷贝到当前对象中。

#### 基本用法

```js
// 对象拷贝
const original = { a: 3, b: 4 };
const copy = { ...original };
console.log(copy); // { a: 3, b: 4 }

// 合并对象
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 };
console.log(merged); // { a: 1, b: 2, c: 3, d: 4 }

// 覆盖属性（后面的属性会覆盖前面的）
const defaults = { color: 'blue', size: 'medium' };
const userSettings = { size: 'large' };
const finalSettings = { ...defaults, ...userSettings };
console.log(finalSettings); // { color: 'blue', size: 'large' }
```

#### 类型转换行为

```js
// 空对象和假值
console.log({ ...{} }); // {}
console.log({ ...null }); // {}
console.log({ ...undefined }); // {}

// 数字、布尔值会被忽略
console.log({ ...1 }); // {}
console.log({ ...true }); // {}

// 字符串会转换为类数组对象
console.log({ ...'abc' }); // { '0': 'a', '1': 'b', '2': 'c' }

// 数组会转换为索引对象
console.log({ ...[1, 2, 3] }); // { '0': 1, '1': 2, '2': 3 }

// 综合示例
console.log({ ...1, ...'abc', ...true, ...null, ...undefined });
// { '0': 'a', '1': 'b', '2': 'c' }
```

#### 只拷贝可枚举的自身属性

扩展运算符只会返回对象自身的、可枚举的属性：

```js
class C {
  p = 12; // 实例属性
  m() {} // 原型方法
}

const c = new C();
const clone = { ...c };

console.log(clone); // { p: 12 }
// 注意：m 方法在原型上，不会被拷贝

// 等同于使用 Object.assign()
const clone2 = Object.assign({}, c);
console.log(clone2); // { p: 12 }

// 添加新属性
const extended = { ...clone, q: 13 };
console.log(extended); // { p: 12, q: 13 }
```

#### 实际应用场景

**1. 对象浅拷贝**

```js
const user = {
  name: 'Alice',
  age: 25,
};

const userCopy = { ...user };
userCopy.name = 'Bob';

console.log(user.name); // Alice（原对象不变）
console.log(userCopy.name); // Bob
```

**2. 合并配置对象**

```js
const defaultConfig = {
  timeout: 3000,
  retries: 3,
  cache: true,
};

const userConfig = {
  timeout: 5000,
  cache: false,
};

const finalConfig = { ...defaultConfig, ...userConfig };
console.log(finalConfig);
// { timeout: 5000, retries: 3, cache: false }
```

**3. 添加或修改属性**

```js
const user = { name: 'Alice', age: 25 };

// 添加新属性
const userWithId = { ...user, id: 1 };
console.log(userWithId); // { name: 'Alice', age: 25, id: 1 }

// 修改属性
const olderUser = { ...user, age: 26 };
console.log(olderUser); // { name: 'Alice', age: 26 }
```

**4. 条件添加属性**

```js
const includeEmail = true;
const user = {
  name: 'Alice',
  age: 25,
  ...(includeEmail && { email: 'alice@example.com' }),
};

console.log(user);
// { name: 'Alice', age: 25, email: 'alice@example.com' }
```

#### 注意事项

> **重要**：扩展运算符执行的是浅拷贝，而不是深拷贝。如果对象的属性值是引用类型，拷贝的是引用。

```js
const original = {
  name: 'Alice',
  address: {
    city: 'New York',
  },
};

const copy = { ...original };

// 修改嵌套对象会影响原对象
copy.address.city = 'Boston';
console.log(original.address.city); // Boston（原对象也被修改了）
```

### 控制对象状态

有时需要冻结对象的读写状态，防止对象被意外修改。JavaScript 提供了三种冻结方法，限制程度从弱到强依次为：`Object.preventExtensions` < `Object.seal` < `Object.freeze`。

#### 三种冻结方法对比

| 方法                       | 添加新属性 | 删除属性 | 修改属性值 | 修改属性描述符 | 应用场景                         |
| -------------------------- | ---------- | -------- | ---------- | -------------- | -------------------------------- |
| `Object.preventExtensions` | ❌         | ✅       | ✅         | ✅             | 防止对象扩展，但允许修改现有属性 |
| `Object.seal`              | ❌         | ❌       | ✅         | ❌             | 密封对象，不能添加删除属性       |
| `Object.freeze`            | ❌         | ❌       | ❌         | ❌             | 完全冻结对象，变成只读常量       |

#### 1. `Object.preventExtensions()`

使对象无法添加新属性，但可以修改和删除现有属性：

```js
const obj = { name: 'Alice' };

Object.preventExtensions(obj);

// 无法添加新属性
obj.age = 25;
console.log(obj.age); // undefined

// 可以修改现有属性
obj.name = 'Bob';
console.log(obj.name); // Bob

// 可以删除现有属性
delete obj.name;
console.log(obj.name); // undefined

// 检查对象是否可扩展
console.log(Object.isExtensible(obj)); // false
```

#### 2. `Object.seal()`

密封对象，既无法添加新属性，也无法删除现有属性，但可以修改现有属性的值：

```js
const obj = { name: 'Alice', age: 25 };

Object.seal(obj);

// 无法添加新属性
obj.city = 'New York';
console.log(obj.city); // undefined

// 无法删除现有属性
delete obj.age;
console.log(obj.age); // 25

// 可以修改现有属性的值
obj.name = 'Bob';
console.log(obj.name); // Bob

// 检查对象是否被密封
console.log(Object.isSealed(obj)); // true
```

#### 3. `Object.freeze()`

完全冻结对象，无法添加、删除或修改属性，对象变成只读的：

```js
const obj = { name: 'Alice', age: 25 };

Object.freeze(obj);

// 无法添加新属性
obj.city = 'New York';
console.log(obj.city); // undefined

// 无法删除现有属性
delete obj.age;
console.log(obj.age); // 25

// 无法修改现有属性的值
obj.name = 'Bob';
console.log(obj.name); // Alice

// 检查对象是否被冻结
console.log(Object.isFrozen(obj)); // true
```

#### 局限性

**1. 原型链漏洞**

上述三个方法只能锁定对象本身，但可以通过修改原型对象来间接影响对象：

```js
const obj = Object.freeze({ name: 'Alice' });

// 无法直接修改
obj.age = 25;
console.log(obj.age); // undefined

// 但可以通过修改原型来添加属性
Object.prototype.age = 25;
console.log(obj.age); // 25

// 清理
delete Object.prototype.age;
```

**解决方案**：同时冻结原型对象

```js
const proto = Object.freeze({ type: 'person' });
const obj = Object.freeze(Object.create(proto));
```

**2. 浅冻结问题**

这些方法都是浅层操作，只能冻结对象的第一层属性。如果属性值是对象，内层对象不会被冻结：

```js
const obj = Object.freeze({
  name: 'Alice',
  address: {
    city: 'New York',
  },
});

// 第一层属性不能修改
obj.name = 'Bob';
console.log(obj.name); // Alice

// 但嵌套对象的属性可以修改
obj.address.city = 'Boston';
console.log(obj.address.city); // Boston
```

**解决方案**：实现深度冻结

```js
function deepFreeze(obj) {
  // 冻结对象本身
  Object.freeze(obj);

  // 递归冻结所有对象类型的属性
  Object.getOwnPropertyNames(obj).forEach((prop) => {
    const value = obj[prop];
    if (value !== null && typeof value === 'object') {
      deepFreeze(value);
    }
  });

  return obj;
}

const obj = deepFreeze({
  name: 'Alice',
  address: {
    city: 'New York',
  },
});

obj.address.city = 'Boston';
console.log(obj.address.city); // New York（修改失败）
```

### super 关键字

#### 基本概念

`this` 关键字总是指向函数所在的当前对象，ES6 新增的 `super` 关键字则**指向当前对象的原型对象**。

#### 内部机制

JavaScript 引擎内部，`super` 的工作方式如下：

- **访问属性**：`super.foo` 等同于 `Object.getPrototypeOf(this).foo`
- **调用方法**：`super.foo()` 等同于 `Object.getPrototypeOf(this).foo.call(this)`

#### 使用示例

```js
const proto = {
  greet() {
    return 'Hello from prototype';
  },
  name: 'Proto',
};

const obj = {
  greet() {
    // 调用原型上的方法
    return super.greet() + ', extended in obj';
  },
  getName() {
    // 访问原型上的属性
    return super.name;
  },
};

Object.setPrototypeOf(obj, proto);

console.log(obj.greet()); // Hello from prototype, extended in obj
console.log(obj.getName()); // Proto
```

#### 注意事项

> **重要**：`super` 关键字只能用在对象的方法之中，用在其他地方会报错。

```js
// ❌ 错误：super 用在属性中
const obj1 = {
  foo: super.bar, // SyntaxError
};

// ❌ 错误：super 用在函数中
const obj2 = {
  foo: () => super.bar, // SyntaxError
};

// ❌ 错误：super 用在普通函数中
const obj3 = {
  foo: function () {
    return super.bar; // SyntaxError
  },
};

// ✅ 正确：super 用在对象方法中
const obj4 = {
  foo() {
    return super.bar; // 正确
  },
};
```

**相关资源：**

> [为什么会产生 'super' keyword unexpected here 的错误？](https://www.zhihu.com/question/519019902)

---

## 七、Object 静态方法

### Object() 工具方法

`Object` 本身是一个函数，可以当作工具方法使用，将任意值转为对象。

- 如果参数为空 (或者为 `undefined` 和 `null`)，`Object()` 返回一个空对象。
- 如果参数是原始类型的值，`Object` 方法将其转为对应的包装对象的实例。
- 如果 `Object` 方法的参数是一个对象，它总是返回该对象，即不用转换。

利用这一点，可以写一个判断变量是否为对象的函数。

```js
function isObject(value) {
  return value === Object(value);
}

isObject([]); // true
isObject(true); // false
```

### Object.is()

用于比较两个值是否严格相等，与 `===` 的区别在于对特殊值的处理：

```js
console.log(+0 === -0); // true
console.log(NaN === NaN); // false

console.log(Object.is(+0, -0)); // false
console.log(Object.is(NaN, NaN)); // true
```

### Object.assign()

用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。

```js
const target = { a: 1 };
const source1 = { a: 2, b: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
console.log(target); // { a: 2, b: 2, c: 3 }

// 隐式类型转换
console.log(typeof Object.assign(2)); // "object"

// 如果 undefined 和 null 不在首参数，就不会报错。
let obj4 = { a: 1 };
console.log(Object.assign(obj4, undefined, null) === obj4); // true

// 属性名为 Symbol 值的属性，也会被 Object.assign() 拷贝。
console.log(Object.assign({ a: 'b' }, { [Symbol('c')]: 'd' })); // { a: 'b', [Symbol(c)]: 'd' }

// Object.assign 方法总是拷贝一个属性的值，而不会拷贝它背后的赋值方法或取值方法。
const source3 = {
  get foo() {
    return 1;
  },
};
const target2 = {};
console.log(Object.assign(target2, source3)); // { foo: 1 }
```

### Object.keys() / values() / entries()

用于获取对象的键名、值或键值对数组：

```js
const obj = { foo: 123, bar: 456 };
console.log(Object.keys(obj)); // [ 'foo', 'bar' ]
console.log(Object.values(obj)); // [ 123, 456 ]
console.log(Object.entries(obj)); // [ [ 'foo', 123 ], [ 'bar', 456 ] ]
```

### Object.fromEntries()

将键值对数组转换为对象，是 `Object.entries()` 的逆操作：

```js
console.log(
  Object.fromEntries([
    ['foo', 123],
    ['bar', 456],
  ]),
); // { foo: 123, bar: 456 }

const map = new Map([
  ['a', 1],
  ['b', 2],
]);

console.log(Object.fromEntries(map)); // { a: 1, b: 2 }
```

### Object.getPrototypeOf() / setPrototypeOf()

用于获取或设置对象的原型：

```js
const obj = { a: 1 };
const proto = Object.create(obj);
console.log(Object.getPrototypeOf(proto) === obj); // true

Object.setPrototypeOf(proto, null);
console.log(Object.getPrototypeOf(proto)); // null
```

### Object.hasOwn()

`Object.hasOwn()` 是 ES2022 新增的方法，用于判断对象自身是否具有指定的属性。它是 `Object.prototype.hasOwnProperty()` 的更安全替代方案。

```js
const obj = {
  prop: 'value',
};

// 传统方法
console.log(obj.hasOwnProperty('prop')); // true
console.log(Object.prototype.hasOwnProperty.call(obj, 'prop')); // true

// 使用 Object.hasOwn()（推荐）
console.log(Object.hasOwn(obj, 'prop')); // true
console.log(Object.hasOwn(obj, 'nonExistent')); // false

// 优势：处理没有原型的对象
const objWithoutPrototype = Object.create(null);
objWithoutPrototype.prop = 'value';

// 这会报错，因为对象没有 hasOwnProperty 方法
// console.log(objWithoutPrototype.hasOwnProperty('prop')) // TypeError

// 使用 Object.hasOwn() 不会报错
console.log(Object.hasOwn(objWithoutPrototype, 'prop')); // true

// 优势：避免属性名冲突
const objWithConflict = {
  hasOwnProperty: 'I am a property, not a method',
};

// 这会报错
// console.log(objWithConflict.hasOwnProperty('hasOwnProperty')) // TypeError

// 使用 Object.hasOwn() 可以正常工作
console.log(Object.hasOwn(objWithConflict, 'hasOwnProperty')); // true
```

---

## 八、现代语法特性

### 可选链操作符

可选链操作符 (`?.`) 允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。

```js
const user = {
  name: 'Alice',
  address: {
    street: 'Main St',
    city: 'New York',
  },
};

// 传统写法
const city1 = user && user.address && user.address.city;
console.log(city1); // New York

// 使用可选链
const city2 = user?.address?.city;
console.log(city2); // New York

// 访问不存在的属性
const zipCode = user?.address?.zipCode;
console.log(zipCode); // undefined

// 可选链与函数调用
const obj = {
  method() {
    return 'Hello';
  },
};

console.log(obj.method?.()); // Hello
console.log(obj.nonExistent?.()); // undefined

// 可选链与数组索引
const arr = [1, 2, 3];
console.log(arr?.[0]); // 1
console.log(arr?.[10]); // undefined
```

### 空值合并操作符

空值合并操作符 (`??`) 是一个逻辑操作符，当左侧的操作数为 `null` 或 `undefined` 时，返回其右侧操作数，否则返回左侧操作数。

```js
// 与 || 的区别
const value1 = 0 || 'default';
console.log(value1); // 'default'（0 被视为 falsy）

const value2 = 0 ?? 'default';
console.log(value2); // 0（0 不是 null 或 undefined）

// 常用场景
const config = {
  timeout: 0,
  maxRetries: null,
};

const timeout = config.timeout ?? 3000;
const maxRetries = config.maxRetries ?? 3;

console.log(timeout); // 0
console.log(maxRetries); // 3

// 与可选链结合使用
const user = {
  profile: {
    name: 'Alice',
  },
};

const age = user?.profile?.age ?? 18;
console.log(age); // 18
```
