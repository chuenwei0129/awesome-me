---
group:
  title: javaScript
  order: 3
title: Class
toc: content
order: 10
---

## 类

> [ES6 提出 class 关键字是希望解决什么问题？它是不是鸡肋？](https://www.zhihu.com/question/432832293)

JavaScript 中，类是一种函数。就像函数一样，**类可以在另外一个表达式中被定义，被传递,被返回，被赋值，类不存在变量提升**。

### 基本语法

```js
class MyClass {
  static staticParam = val; // 静态属性

  prop = value; // 实例属性

  constructor(prop) {
    // 构造器
    // ...
    this.prop = prop; // 实例属性
  }

  method() {} // 普通方法，作为回调时可能丢失 this
  method = () => {}; // 箭头函数方法，this 永远指向实例

  get something() {} // getter 方法
  set something(value) {} // setter 方法

  [Symbol.iterator]() {} // 有计算名称（computed name）的方法（此处为 symbol）
  // ...
}
```

### 类的关键特性

**不仅仅是语法糖：**

1. **`constructor()` 方法**：类的默认方法，**通过 `new` 命令生成对象实例时，自动调用该方法**。一个类必须有 `constructor()` 方法，**如果没有显式定义，一个空的 `constructor()` 方法会被默认添加**。

2. **返回值**：`constructor()` 方法默认返回实例对象（即 `this`），**完全可以指定返回另外一个对象**。

   ```js
   class Foo {
     constructor() {
       return Object.create(null);
     }
   }

   console.log(new Foo() instanceof Foo); // false
   ```

3. **实例属性定义位置**：实例属性除了定义在 `constructor()` 方法里面的 `this` 上面，也可以定义在类的最顶层。

   ```js
   class User {
     name = '匿名'; // 实例属性（推荐）

     constructor() {
       this.age = 0; // 实例属性
     }
   }
   ```

4. **方法不可枚举**：在类的实例上面调用方法，其实就是调用原型上的方法，另外，**类的内部所有定义的方法，都是不可枚举的**（non-enumerable）。

   ```js
   class Point {
     constructor(x, y) {
       this.x = x;
       this.y = y;
     }

     toString() {
       return `(${this.x}, ${this.y})`;
     }
   }

   const p = new Point(1, 2);
   console.log(Object.keys(p)); // ['x', 'y']（不包含 toString）
   console.log(Object.getOwnPropertyNames(Point.prototype)); // ['constructor', 'toString']
   ```

5. **内部标记**：通过 `class` 创建的函数具有特殊的内部属性标记 `[[FunctionKind]]: "classConstructor"`。因此，它与 ES5 手动创建并不完全相同。

   ```js
   class User {}
   console.log(typeof User); // function

   // 但不能在没有 new 的情况下调用 class
   // User(); // TypeError: Class constructor User cannot be invoked without 'new'
   ```

6. **严格模式**：类总是使用 `use strict`。在类构造中的所有代码都将自动进入严格模式。

### 类表达式

类可以像函数一样在表达式中定义：

```js
// 命名类表达式
const User = class MyClass {
  sayHi() {
    console.log(MyClass); // MyClass 名字只在类内部可见
  }
};

new User().sayHi(); // 正常运行，显示 MyClass 定义

// console.log(MyClass); // ReferenceError: MyClass is not defined

// 匿名类表达式
const Anonymous = class {
  /* ... */
};

// 动态创建类
function makeClass(phrase) {
  return class {
    sayHi() {
      console.log(phrase);
    }
  };
}

const User2 = makeClass('Hello');
new User2().sayHi(); // Hello
```

## 静态属性和方法

静态成员属于类本身，而不是类的实例。通过 `static` 关键字定义。

```js
class User {
  static staticProperty = 'static value';

  static staticMethod() {
    console.log('This is a static method');
    console.log(this === User); // true
  }

  constructor(name) {
    this.name = name;
  }

  normalMethod() {
    console.log(`Hello, ${this.name}`);
  }
}

// 访问静态成员
console.log(User.staticProperty); // 'static value'
User.staticMethod(); // This is a static method

// 实例无法访问静态成员
const user = new User('张三');
console.log(user.staticProperty); // undefined
// user.staticMethod(); // TypeError
```

**静态成员的继承：**

```js
class Animal {
  static planet = 'Earth';

  static getPlanet() {
    return this.planet; // this 指向调用的类
  }
}

class Rabbit extends Animal {
  static planet = 'Mars'; // 可以覆盖父类的静态属性
}

console.log(Animal.planet); // Earth
console.log(Rabbit.planet); // Mars

console.log(Animal.getPlanet()); // Earth
console.log(Rabbit.getPlanet()); // Mars（this 指向 Rabbit）
```

**常见用途：**

```js
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

  // 工厂方法
  static createTodays(title) {
    return new this(title, new Date());
  }

  // 比较方法
  static compare(articleA, articleB) {
    return articleA.date - articleB.date;
  }
}

const article = Article.createTodays('今日新闻');
console.log(article.date); // 今天的日期

const articles = [
  new Article('文章1', new Date(2024, 0, 1)),
  new Article('文章2', new Date(2024, 6, 1)),
];
articles.sort(Article.compare);
```

## 私有字段和方法

ES2022+ 引入了真正的私有字段，使用 `#` 前缀。私有成员只能在类的内部访问。

```js
class BankAccount {
  // 私有字段必须先声明
  #balance = 0;
  #pin;

  constructor(initialBalance, pin) {
    this.#balance = initialBalance;
    this.#pin = pin;
  }

  // 私有方法
  #validatePin(inputPin) {
    return this.#pin === inputPin;
  }

  // 公共方法可以访问私有成员
  withdraw(amount, pin) {
    if (!this.#validatePin(pin)) {
      throw new Error('错误的 PIN');
    }
    if (amount > this.#balance) {
      throw new Error('余额不足');
    }
    this.#balance -= amount;
    return amount;
  }

  getBalance(pin) {
    if (!this.#validatePin(pin)) {
      throw new Error('错误的 PIN');
    }
    return this.#balance;
  }
}

const account = new BankAccount(1000, '1234');
console.log(account.getBalance('1234')); // 1000

// 无法从外部访问私有字段
// console.log(account.#balance); // SyntaxError
// console.log(account.#pin); // SyntaxError
```

**静态私有字段：**

```js
class Counter {
  static #count = 0;

  static increment() {
    this.#count++;
  }

  static getCount() {
    return this.#count;
  }
}

Counter.increment();
Counter.increment();
console.log(Counter.getCount()); // 2

// console.log(Counter.#count); // SyntaxError
```

**私有字段的特点：**

1. 必须在类的顶层声明，不能动态创建
2. 不能在类的外部访问，即使通过反射也不行
3. 子类无法访问父类的私有字段
4. 私有字段名不会与公共字段名冲突

```js
class MyClass {
  #x = 1;
  x = 2;

  getX() {
    return [this.#x, this.x];
  }
}

console.log(new MyClass().getX()); // [1, 2]
```

## Getter 和 Setter

Getter 和 setter 允许你定义访问器属性，它们看起来像普通属性，但实际上是通过方法来读取和设置值。

```js
class User {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // getter
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  // setter
  set fullName(value) {
    [this.firstName, this.lastName] = value.split(' ');
  }
}

const user = new User('张', '三');

// 使用 getter（像访问属性一样）
console.log(user.fullName); // 张 三

// 使用 setter（像设置属性一样）
user.fullName = '李 四';
console.log(user.firstName); // 李
console.log(user.lastName); // 四
```

**结合私有字段使用：**

```js
class Temperature {
  #celsius;

  constructor(celsius) {
    this.#celsius = celsius;
  }

  // 获取摄氏度
  get celsius() {
    return this.#celsius;
  }

  // 设置摄氏度
  set celsius(value) {
    if (value < -273.15) {
      throw new Error('温度不能低于绝对零度');
    }
    this.#celsius = value;
  }

  // 获取华氏度
  get fahrenheit() {
    return this.#celsius * 1.8 + 32;
  }

  // 设置华氏度
  set fahrenheit(value) {
    this.celsius = (value - 32) / 1.8;
  }
}

const temp = new Temperature(25);
console.log(temp.celsius); // 25
console.log(temp.fahrenheit); // 77

temp.fahrenheit = 86;
console.log(temp.celsius); // 30
```

**只读属性（只有 getter）：**

```js
class Circle {
  #radius;

  constructor(radius) {
    this.#radius = radius;
  }

  get radius() {
    return this.#radius;
  }

  // 只有 getter，没有 setter，所以这是只读的
  get area() {
    return Math.PI * this.#radius ** 2;
  }

  get circumference() {
    return 2 * Math.PI * this.#radius;
  }
}

const circle = new Circle(5);
console.log(circle.radius); // 5
console.log(circle.area); // 78.53981633974483
console.log(circle.circumference); // 31.41592653589793

// circle.area = 100; // 设置无效（严格模式下会报错）
```

**使用场景：**

1. **数据验证**：在 setter 中验证输入值
2. **计算属性**：基于其他属性计算值
3. **向后兼容**：将字段改为计算属性而不破坏 API
4. **懒加载**：只在需要时才计算值

```js
class LazyProperty {
  #computed;

  get expensiveValue() {
    if (this.#computed === undefined) {
      console.log('计算中...');
      this.#computed = this.#calculate();
    }
    return this.#computed;
  }

  #calculate() {
    // 模拟耗时计算
    return Math.random() * 1000;
  }
}

const obj = new LazyProperty();
console.log(obj.expensiveValue); // 计算中... 然后输出结果
console.log(obj.expensiveValue); // 直接输出结果（不再计算）
```

## 类继承

### 基本概念

**子类的 `constructor` 必须调用 `super(...)`，并且 (！) 一定要在使用 `this` 之前调用。**

如果子类没有定义 `constructor()` 方法，这个方法会默认添加，并且里面会调用 `super()`。也就是说，不管有没有显式定义，任何一个子类都有 `constructor()` 方法。

```js
class Animal {
  constructor(name) {
    this.name = name;
    this.speed = 0;
  }

  run(speed) {
    this.speed = speed;
    console.log(`${this.name} runs with speed ${this.speed}`);
  }

  stop() {
    this.speed = 0;
    console.log(`${this.name} stands still`);
  }
}

class Rabbit extends Animal {
  constructor(name, earLength) {
    super(name); // 必须先调用 super
    this.earLength = earLength; // 然后才能使用 this
  }

  hide() {
    console.log(`${this.name} hides!`);
  }
}

const rabbit = new Rabbit('White Rabbit', 10);
rabbit.run(5); // White Rabbit runs with speed 5
rabbit.hide(); // White Rabbit hides!
```

### 继承原理

当通过 `new` 执行一个常规函数时，它将创建一个空对象，并将 `this` 指向这个空对象（常规 new 行为）。**但是当子类的 `constructor` 执行时，它不会执行此操作。它期望父类的 `constructor` 来完成这项工作**。因此，子类的 `constructor` 必须调用 `super` 才能执行其父类的 `constructor`，否则 `this` 指向的那个对象将不会被创建，并且我们会收到一个报错。

> **相关讨论**：[ES6 的子类有没有自己的 this？](https://www.zhihu.com/question/378032472/answer/1078570644)

### 在 extends 后使用表达式

`extends` 后面可以跟任意表达式，不仅仅是类名：

```js
// 使用函数返回的类作为父类
function f(phrase) {
  return class {
    sayHi() {
      console.log(phrase);
    }
  };
}

class User extends f('Hello') {}

new User().sayHi(); // Hello

// 根据条件选择父类
function Animal() {}
function Plant() {}

const isMammal = true;
class Organism extends (isMammal ? Animal : Plant) {}
```

## super 关键字

`super` 这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。

### super 作为函数

`super` 作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次 `super` 函数。

```js
class Parent {
  constructor(name) {
    this.name = name;
    console.log('Parent constructor');
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name); // 调用父类构造函数
    this.age = age;
    console.log('Child constructor');
  }
}

const child = new Child('小明', 10);
// Parent constructor
// Child constructor
```

**注意**：`super` 虽然代表了父类的构造函数，但是返回的是子类的实例，即 `super` 内部的 `this` 指的是子类的实例，因此 `super()` 在这里相当于 `Parent.prototype.constructor.call(this)`。

作为函数时，`super()` **只能用在子类的构造函数之中，用在其他地方就会报错**。

```js
class Child extends Parent {
  sayHi() {
    super(); // SyntaxError: 'super' keyword unexpected here
  }
}
```

### super 作为对象

`super` 作为对象时：

- **在普通方法中**，指向父类的原型对象（`Parent.prototype`）
- **在静态方法中**，指向父类本身（`Parent`）

**在普通方法中使用：**

```js
class Parent {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return `Hello from ${this.name}`;
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name);
    this.age = age;
  }

  sayHi() {
    // super 指向 Parent.prototype
    const parentMessage = super.sayHi();
    return `${parentMessage}, I'm ${this.age} years old`;
  }
}

const child = new Child('小明', 10);
console.log(child.sayHi()); // Hello from 小明, I'm 10 years old
```

**在静态方法中使用：**

```js
class Parent {
  static greet() {
    return 'Hello from Parent';
  }
}

class Child extends Parent {
  static greet() {
    // 在静态方法中，super 指向父类 Parent
    return super.greet() + ', and Child';
  }
}

console.log(Child.greet()); // Hello from Parent, and Child
```

### super 中的 this 指向

**在子类的普通方法中**，通过 `super` 调用父类的方法时，方法内部的 `this` 指向当前的子类实例。

```js
class Parent {
  constructor() {
    this.x = 1;
  }

  print() {
    console.log(this.x);
  }
}

class Child extends Parent {
  constructor() {
    super();
    this.x = 2;
  }

  m() {
    super.print(); // 调用父类的 print 方法，但 this 指向子类实例
  }
}

const child = new Child();
child.m(); // 2（不是 1）
```

**在子类的静态方法中**，通过 `super` 调用父类的方法时，方法内部的 `this` 指向当前的子类，而不是子类的实例。

```js
class Parent {
  static myMethod(msg) {
    console.log('static', msg);
  }

  myMethod(msg) {
    console.log('instance', msg);
  }
}

class Child extends Parent {
  static myMethod(msg) {
    super.myMethod(msg); // 调用父类的静态方法
  }

  myMethod(msg) {
    super.myMethod(msg); // 调用父类的实例方法
  }
}

Child.myMethod('hello'); // static hello

const child = new Child();
child.myMethod('world'); // instance world
```

## new.target 属性

`new.target` 是 ES6 为 `new` 命令引入的一个元属性（meta-property）。

### 基本用法

**该属性一般用在构造函数之中**，返回 `new` 命令作用于的那个构造函数。如果构造函数不是通过 `new` 命令或 `Reflect.construct()` 调用的，`new.target` 会返回 `undefined`。

```js
function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

// 或者更简洁的写法
function Person2(name) {
  if (!new.target) {
    throw new Error('必须使用 new 命令生成实例');
  }
  this.name = name;
}

const person = new Person('张三'); // 正确
// const person2 = Person('李四'); // 报错
```

### 在 Class 中使用

在 `Class` 内部调用 `new.target`，返回当前 `Class`。

**需要注意的是，子类继承父类时，`new.target` 会返回子类。**

```js
class Parent {
  constructor() {
    console.log(new.target);
    console.log(new.target.name);
  }
}

// 无继承
const parent = new Parent();
// [class Parent]
// Parent

// 有继承
class Child extends Parent {
  constructor() {
    super();
  }
}

const child = new Child();
// [class Child extends Parent]
// Child
```

### 实际应用场景

**1. 防止直接实例化抽象类：**

```js
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('Shape 是抽象类，不能直接实例化');
    }
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
}

// const shape = new Shape(); // 报错
const circle = new Circle(5); // 正确
```

**2. 实现单例模式：**

```js
class Singleton {
  static instance = null;

  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    if (new.target !== Singleton) {
      throw new Error('不能继承 Singleton');
    }
    Singleton.instance = this;
  }
}

const s1 = new Singleton();
const s2 = new Singleton();
console.log(s1 === s2); // true
```

**3. 确保通过子类实例化：**

```js
class BaseController {
  constructor() {
    if (new.target === BaseController) {
      throw new Error('BaseController 必须通过子类实例化');
    }
  }
}

class UserController extends BaseController {
  constructor() {
    super();
  }
}

// const base = new BaseController(); // 报错
const user = new UserController(); // 正确
```

## mixin

在 JavaScript 中，**一个类只能继承一个父类**（单继承）。但在实际开发中，我们可能需要从多个类中混入（mixin）功能。

Mixin 是一个包含可被其他类使用而无需继承的方法的类。换句话说，mixin 提供了实现特定行为的方法，但我们不单独使用它，而是用它来将这些行为添加到其他类中。

**实现方式：**

```js
// 定义 mixin
let sayHiMixin = {
  sayHi() {
    console.log(`Hello ${this.name}`);
  },
  sayBye() {
    console.log(`Bye ${this.name}`);
  },
};

// 使用 mixin
class User {
  constructor(name) {
    this.name = name;
  }
}

// 拷贝方法
Object.assign(User.prototype, sayHiMixin);

new User('Dude').sayHi(); // Hello Dude
```

**Mixin 可以继承：**

```js
let sayMixin = {
  say(phrase) {
    console.log(phrase);
  },
};

let sayHiMixin = {
  __proto__: sayMixin, // 或使用 Object.setPrototypeOf 来设置原型

  sayHi() {
    // 调用父类方法
    super.say(`Hello ${this.name}`);
  },
  sayBye() {
    super.say(`Bye ${this.name}`);
  },
};

class User {
  constructor(name) {
    this.name = name;
  }
}

Object.assign(User.prototype, sayHiMixin);

new User('Dude').sayHi(); // Hello Dude
```

**使用函数实现 Mixin（更灵活）：**

```js
// 返回一个包含 mixin 方法的子类
const TimestampMixin = (Base) =>
  class extends Base {
    getTimestamp() {
      return new Date();
    }
  };

const NameMixin = (Base) =>
  class extends Base {
    printName() {
      console.log(this.name);
    }
  };

class Person {
  constructor(name) {
    this.name = name;
  }
}

// 可以组合多个 mixin
class Employee extends NameMixin(TimestampMixin(Person)) {}

const emp = new Employee('张三');
emp.printName(); // 张三
console.log(emp.getTimestamp()); // 当前时间
```

**注意事项：**

- Mixin 可能会意外覆盖现有类的方法，使用时需要小心命名冲突
- 过度使用 Mixin 会使代码难以理解和维护
- 优先考虑组合（composition）而不是继承或 mixin

## 组合优于继承

"组合优于继承"（Composition over Inheritance）是面向对象设计中的一个重要原则。它建议**使用对象组合而不是类继承来实现代码复用**。

### 继承的问题

1. **紧耦合**：子类与父类紧密耦合，修改父类可能影响所有子类
2. **脆弱的基类问题**：父类的修改可能破坏子类的功能
3. **不灵活**：继承层次在编译时确定，运行时无法改变
4. **猩猩香蕉问题**："你想要一个香蕉，但你得到的是一只拿着香蕉的猩猩以及整个丛林"

### 组合的优势

1. **松耦合**：对象之间通过接口交互，依赖关系更清晰
2. **灵活性**：可以在运行时动态组合对象
3. **更好的可维护性**：修改一个组件不会影响其他组件

### 对比示例

**使用继承（不推荐）：**

```js
// 继承方式
class Animal {
  eat() {
    console.log('eating...');
  }
}

class FlyingAnimal extends Animal {
  fly() {
    console.log('flying...');
  }
}

class SwimmingAnimal extends Animal {
  swim() {
    console.log('swimming...');
  }
}

// 问题：鸭子既会飞又会游泳，该继承哪个？
// 如果使用多重继承，会变得复杂
```

**使用组合（推荐）：**

```js
// 将能力定义为独立的对象
const canEat = {
  eat() {
    console.log(`${this.name} is eating`);
  },
};

const canFly = {
  fly() {
    console.log(`${this.name} is flying`);
  },
};

const canSwim = {
  swim() {
    console.log(`${this.name} is swimming`);
  },
};

// 组合函数
const compose = (target, ...sources) => {
  Object.assign(target, ...sources);
  return target;
};

// 创建不同的动物
class Duck {
  constructor(name) {
    this.name = name;
  }
}

class Fish {
  constructor(name) {
    this.name = name;
  }
}

// 通过组合赋予能力
compose(Duck.prototype, canEat, canFly, canSwim);
compose(Fish.prototype, canEat, canSwim);

const duck = new Duck('唐老鸭');
duck.eat(); // 唐老鸭 is eating
duck.fly(); // 唐老鸭 is flying
duck.swim(); // 唐老鸭 is swimming

const fish = new Fish('尼莫');
fish.eat(); // 尼莫 is eating
fish.swim(); // 尼莫 is swimming
// fish.fly(); // 错误：fish 没有 fly 方法
```

**使用工厂函数实现组合：**

```js
// 能力定义
const canEat = (state) => ({
  eat() {
    console.log(`${state.name} is eating`);
  },
});

const canFly = (state) => ({
  fly() {
    console.log(`${state.name} is flying`);
  },
});

const canSwim = (state) => ({
  swim() {
    console.log(`${state.name} is swimming`);
  },
});

// 工厂函数
const createDuck = (name) => {
  const state = { name };
  return {
    ...canEat(state),
    ...canFly(state),
    ...canSwim(state),
  };
};

const createFish = (name) => {
  const state = { name };
  return {
    ...canEat(state),
    ...canSwim(state),
  };
};

const duck = createDuck('唐老鸭');
const fish = createFish('尼莫');

duck.fly(); // 唐老鸭 is flying
fish.swim(); // 尼莫 is swimming
```

### 何时使用继承

尽管组合通常更好，但在以下情况继承仍然有意义：

1. **真正的"is-a"关系**：Dog 是 Animal（不是"has-a"或"can-do"）
2. **需要多态行为**：子类需要被当作父类来使用
3. **框架要求**：某些框架（如 React 早期）要求使用继承

### 最佳实践

1. **优先使用组合**：默认选择组合，只在必要时使用继承
2. **保持继承层次浅**：继承层次不要超过 2-3 层
3. **使用接口/协议**：定义清晰的接口而不是实现细节
4. **考虑使用函数式方法**：纯函数和不可变数据结构可以避免很多 OOP 的问题

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

在 ES6 的 `class` 出现之前，JavaScript 通过构造函数和原型链来实现继承。了解 ES5 的继承方式有助于：

1. 理解 `class` 语法的底层实现
2. 维护旧代码
3. 深入理解 JavaScript 的原型机制

### 原型链继承

```js
// 第一版
function Super() {
  this.super_param = [1, 2, 3];
}
Super.prototype.getSuperParam = function () {
  return this.super_param;
};
function Sub() {
  this.sub_param = true;
}
Sub.prototype = new Super();
Sub.prototype.getSubParam = function () {
  return this.sub_param;
};
var instance1 = new Sub();
var instance2 = new Sub();
instance1.super_param.push(4);

console.log(instance1.super_param); // [1, 2, 3, 4]
console.log(instance2.super_param); // [1, 2, 3, 4]

// 缺点1：引用类型属性共享
// 缺点2：Sub.prototype 重写丢失 constructor
```

### 原型链继承优化

```js
// 第二版
function Super() {
  this.super_param = [1, 2, 3];
}
Super.prototype.getSuperParam = function () {
  return this.super_param;
};
function Sub() {
  Super.call(this);
  this.sub_param = true;
}
Sub.prototype = new Super();
Sub.prototype.constructor = Sub;
Sub.prototype.getSubParam = function () {
  return this.sub_param;
};
var instance1 = new Sub();
var instance2 = new Sub();
instance1.super_param.push(4);

console.log(instance1.super_param); // [1, 2, 3, 4]
console.log(instance2.super_param); // [1, 2, 3]
console.log(Sub.prototype.constructor === Sub); // true

// 缺点：Super() 调用了两次
```

```js
// 第三版
function Super() {
  this.super_param = [1, 2, 3];
}
Super.prototype.getSuperParam = function () {
  return this.super_param;
};
function Sub() {
  Super.call(this);
  this.sub_param = true;
}
// Sub.prototype = Object.create(Super.prototype) // 重写了 Sub.prototype === {}
// Sub.prototype.constructor = Sub
// 下面相当于上面两行
Object.setPrototypeOf(Sub.prototype, Super.prototype); // 设置原型链会覆盖默认的原型链关系

Sub.prototype.getSubParam = function () {
  return this.sub_param;
};
var instance1 = new Sub();
var instance2 = new Sub();
instance1.super_param.push(4);

console.log(instance1.super_param); // [1, 2, 3, 4]
console.log(instance2.super_param); // [1, 2, 3]
console.log(Sub.prototype.constructor === Sub); // true
```
