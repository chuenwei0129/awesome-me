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

在 JavaScript 中，`class` 是构造对象和描述原型关系的一种语法形式。底层仍然基于原型链，但 `class` 提供了更接近传统面向对象语言的写法。

- `typeof MyClass === 'function'`，类本质上仍是函数
- 类声明会被提升，但存在 **暂时性死区（TDZ）**：在声明前访问会报错，不能像函数声明那样“先用后声明”
- 类体及其中的方法始终在严格模式（`use strict`）下执行

### 基本语法

```js
class MyClass {
  // 静态属性：挂在类本身上
  static staticParam = 'static value';

  // 实例属性：每个实例一份
  instanceProp = 'default';

  constructor(prop) {
    // 构造器：使用 new 调用时自动执行
    this.instanceProp = prop;
  }

  // 原型方法：所有实例共享同一个函数对象
  method() {
    console.log('method this =', this);
  }

  // 实例字段上的箭头函数：this 在创建时固定为当前实例
  methodArrow = () => {
    console.log('arrow this =', this);
  };

  // getter
  get value() {
    return this.instanceProp;
  }

  // setter
  set value(v) {
    this.instanceProp = v;
  }
}

const inst = new MyClass('hello');
inst.method(); // method this = MyClass {...}
inst.methodArrow(); // arrow this = MyClass {...}
```

> 实战建议：
> 一般情况下推荐使用普通原型方法；只有在**需要确保作为回调使用时不丢失 `this`**，并且可以接受**每个实例创建一份函数的额外开销**，再考虑使用实例字段上的箭头函数。

---

## 类的关键特性

### 1. `constructor()` 与默认构造器

`constructor()` 是类的构造函数，在通过 `new` 生成实例时自动调用。

每个类“都有”构造器：

- 如果没有显式定义，**基类**的默认构造器等价于：

  ```js
  constructor() {}
  ```

- 对于继承自其他类的 **子类**，默认构造器等价于：

  ```js
  constructor(...args) {
    super(...args);
  }
  ```

因此：

- 子类显式定义 `constructor` 时，**必须在使用 `this` 之前调用 `super(...)`**；
- 不显式定义时，JS 引擎会自动插入一个调用 `super` 的默认构造器。

### 2. 构造器返回值

`constructor` 默认返回新创建的实例（`this`），但你可以显式返回另一个对象：

```js
class Foo {
  constructor() {
    return Object.create(null);
  }
}

console.log(new Foo() instanceof Foo); // false
```

规则是：

- 如果构造器返回的是 **对象或函数**，该对象将成为 `new Foo()` 的返回值
- 如果返回的是 **原始值**（字符串、数字、布尔等），会被忽略，仍然返回实例（`this`）

> 实战中**几乎不建议**随意在构造器中返回其它对象，这会让类的行为难以预测，一般只在极少数模式（如特殊工厂封装）中使用。

### 3. 实例属性的定义位置

实例属性既可以在 `constructor` 中通过 `this.xxx` 赋值，也可以使用类字段直接声明在类体顶部：

```js
class User {
  // 实例字段（推荐方式之一）
  name = '匿名';

  constructor(age) {
    // 传统写法
    this.age = age;
  }
}

const u = new User(18);
console.log(u.name); // 匿名
console.log(u.age); // 18
```

类字段的优势：

- 定义位置更集中，可读性好
- 更接近其他语言中的“字段声明”

### 4. 方法不可枚举 & 原型链关系

在类中定义的方法（非类字段上的函数）默认是 **不可枚举（non-enumerable）** 的，并且挂在 `Class.prototype` 上。

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
console.log(Object.getOwnPropertyNames(Point.prototype));
// ['constructor', 'toString']
```

原型链示意：

```text
p ---> Point.prototype ---> Object.prototype ---> null
```

### 5. 类与普通函数的差异（内部标记）

```js
class User {}
console.log(typeof User); // 'function'

// 不能在没有 new 的情况下调用
// User(); // TypeError: Class constructor User cannot be invoked without 'new'
```

规范层面，`class` 声明生成的函数会带有“这是一个类构造函数”的内部标记（例如 `[[IsClassConstructor]]: true`）。因此它与普通函数有若干差异：

- 不能直接当作普通函数调用（必须使用 `new`）
- 类体内始终是严格模式
- `prototype` 属性的默认为不可枚举等

### 6. 类与严格模式、暂时性死区

- 类体及其中的方法，总是在严格模式 (`use strict`) 下执行
- 类声明会被提升，但在声明前访问会落入 **暂时性死区（TDZ）**：

  ```js
  const inst = new MyClass(); // ReferenceError: Cannot access 'MyClass' before initialization
  class MyClass {}
  ```

在实践中，可以简单记住：**类不能在声明前使用**。

### 7. 类字段初始化顺序（继承时尤其重要）

对于不继承任何类的基类：

1. 创建实例对象
2. 执行实例字段初始化
3. 执行构造器函数体

对于继承自其他类的子类：

1. 创建“未初始化”的 `this`
2. 执行 `super(...)` 调用父类构造器
3. 执行子类实例字段初始化
4. 执行子类构造器剩余代码

示例：

```js
class Parent {
  constructor() {
    console.log('Parent constructor');
  }
}

class Child extends Parent {
  field = console.log('field init');

  constructor() {
    super();
    console.log('Child constructor');
  }
}

new Child();
// Parent constructor
// field init
// Child constructor
```

---

## 类表达式

类可以像函数一样在表达式中定义和使用。

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

这类用法在工厂函数、测试代码、动态生成模型时很有用。

---

## 静态属性和方法

静态成员属于 **类本身**，而不是类的实例。通过 `static` 关键字定义。

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

### 静态成员的继承

```js
class Animal {
  static planet = 'Earth';

  static getPlanet() {
    return this.planet; // this 指向调用的类
  }
}

class Rabbit extends Animal {
  static planet = 'Mars'; // 覆盖父类静态属性
}

console.log(Animal.planet); // Earth
console.log(Rabbit.planet); // Mars

console.log(Animal.getPlanet()); // Earth
console.log(Rabbit.getPlanet()); // Mars（this 指向 Rabbit）
```

> 实战中，静态成员常用于：工厂方法、缓存、枚举、工具方法、配置等。

示例：

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

---

## 私有字段和方法（ES2022+）

ES2022 引入了真正的私有字段，使用 `#` 前缀。私有成员只能在类的内部访问。

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
// console.log(account.#pin);     // SyntaxError
```

### 静态私有字段

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

### 私有字段的特点

1. 必须在类体顶层声明，不能动态创建（不能通过 `this['#field']` 等方式新增）
2. 不能在类的外部访问，即使通过反射、`Object.keys`、`Object.getOwnPropertyNames` 也不行
3. 子类无法访问父类的私有字段
4. 私有字段名不会与公共字段名冲突
5. 不能通过字符串或 `[]` 动态访问（`this['#x']` 访问的是普通属性）
6. 只能在类内部使用类似 `#x in this` 的语法检测，类外没法检测私有字段

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

---

## Getter 和 Setter

Getter 和 Setter 允许你定义访问器属性：**看起来像属性访问，内部却是方法调用**。

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

### 结合私有字段使用

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

### 只读属性（只有 getter）

```js
class Circle {
  #radius;

  constructor(radius) {
    this.#radius = radius;
  }

  get radius() {
    return this.#radius;
  }

  // 只有 getter，没有 setter，所以是只读的
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

// circle.area = 100; // 严格模式下会报错
```

### 常见使用场景

1. **数据验证**：在 setter 中验证输入值是否合法
2. **计算属性**：通过 getter 动态计算值（如 `area`、`fullName`）
3. **向后兼容**：将原有的数据属性改成 getter/setter，实现逻辑迁移而不改变调用方式
   （但需要注意可枚举性等细节变化，修改前后仍需测试）
4. **懒加载**：在第一次访问时才进行昂贵计算，并缓存结果

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
console.log(obj.expensiveValue); // 直接输出缓存结果
```

---

## 类继承

### 基本概念

使用 `extends` 可以实现基于类的继承：

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

> 要点：**子类构造器中必须在使用 `this` 之前调用 `super(...)`，否则会报错。**
> 如果子类不写 `constructor`，引擎会自动添加一个 `constructor(...args) { super(...args); }`。

### 继承原理（与普通函数的差异）

当通过 `new` 执行一个普通函数时：

1. 创建一个新的空对象
2. 将该对象的原型指向函数的 `prototype`
3. 将函数体中的 `this` 绑定到这个对象
4. 默认返回这个对象（除非显式返回对象）

而对于 **派生类（有 `extends`）的构造器**：

- 在执行子类构造器体之前，**不会自动创建 `this`**；
- 必须在构造器中调用 `super(...)`，由父类构造器完成 `this` 的创建与初始化；
- 如果不调用 `super` 就访问 `this`，会抛出 `ReferenceError`。

这就是“子类的 `constructor` 必须调用 `super`”背后的根本原因。

---

## `extends` 后使用表达式

`extends` 后可以跟任意表达式，只要最终结果是一个可构造的函数（具有 `[[Construct]]` 和 `prototype`）：

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

> 注意：如果表达式的结果不是构造函数（比如是普通对象），类定义阶段就会抛出 `TypeError`。

---

## `super` 关键字

`super` 既可以当作函数使用，也可以当作对象使用，不同用法语义不同。

### 1. `super(…)` 作为函数

表示调用父类的构造函数。**只能在子类构造器中使用**：

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

虽然 `super` 表示的是父类构造函数，但返回的仍然是“当前子类的实例”：可以理解为 `Parent.call(this, ...)` 的语法糖。

> 限制：`super()` 只能在 **派生类的构造器** 中调用，用在其他地方会报错。

```js
class Child extends Parent {
  sayHi() {
    super(); // SyntaxError: 'super' keyword unexpected here
  }
}
```

### 2. `super` 作为对象

- 在 **实例方法** 中：`super` 指向父类的原型对象，即 `Parent.prototype`
- 在 **静态方法** 中：`super` 指向父类构造函数本身，即 `Parent`

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

### 3. `super` 中的 `this` 指向

- 在子类的普通方法中，通过 `super` 调用父类方法时，**方法内部的 `this` 仍然是子类实例**：

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
      super.print(); // 调用父类 print，但 this 指向子类实例
    }
  }

  const child = new Child();
  child.m(); // 2
  ```

- 在子类静态方法中，通过 `super` 调用父类静态方法时，**方法内部的 `this` 指向当前子类构造函数**：

  ```js
  class Parent {
    static myMethod(msg) {
      console.log('static', msg, 'this.name =', this.name);
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

  Child.myMethod('hello'); // static hello this.name = Child

  const child = new Child();
  child.myMethod('world'); // instance world
  ```

> 提示：如果在类字段里用箭头函数并在其中使用 `super`，`super` 会从外层方法的词法环境中捕获，语义会更微妙，一般避免在这种场景中混用。

---

## `new.target` 属性

`new.target` 是 ES6 为 `new` 命令引入的一个元属性（meta-property）。

### 基本用法

在构造函数或类构造器中使用，表示 **当前是通过哪个构造器来调用 `new` 的**。如果不是通过 `new`（或 `Reflect.construct`）调用，`new.target` 为 `undefined`。

```js
function Person(name) {
  if (!new.target) {
    throw new Error('必须使用 new 命令生成实例');
  }
  this.name = name;
}

const person = new Person('张三'); // 正确
// const person2 = Person('李四'); // 报错
```

### 在 Class 中使用

在类构造器中，`new.target` 指向当前被 `new` 的构造函数。

**无继承：**

```js
class Parent {
  constructor() {
    console.log(new.target);
    console.log(new.target.name);
  }
}

const parent = new Parent();
// [class Parent]
// Parent
```

**有继承时，`new.target` 指向子类：**

```js
class Parent {
  constructor() {
    console.log(new.target);
    console.log(new.target.name);
  }
}

class Child extends Parent {
  constructor() {
    super();
  }
}

const child = new Child();
// [class Child extends Parent]
// Child
```

### 常见应用场景

1. **防止直接实例化抽象类**

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

2. **实现单例模式**

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

3. **确保通过子类实例化**

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

> 补充：`new.target` 是词法绑定的，箭头函数内部访问到的 `new.target` 来自其外层函数或构造器。

---

## Mixin

JavaScript 中类只能单继承（`extends` 只能接一个父类），但实际开发中常常希望从多个来源“混入”功能。

**Mixin** 是一种复用方式：将可以被多个类共享的方法收集到一个对象或函数中，然后“混入”到目标类中，而不是通过继承整个父类层次。

### 对象方式的 mixin

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

Mixin 也可以有自己的“继承”关系：

```js
let sayMixin = {
  say(phrase) {
    console.log(phrase);
  },
};

let sayHiMixin = {
  __proto__: sayMixin, // 或使用 Object.setPrototypeOf

  sayHi() {
    // 调用“父 mixin”的方法
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

### 函数式 mixin（更灵活）

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

### 使用 mixin 的注意事项

- 方法名容易产生冲突，需要小心命名和文档约定
- 过度使用 mixin 会增加代码的理解成本和调试难度
- 优先考虑 **组合（composition）** 和普通对象函数，而不是复杂的 mixin 链

---

## 组合优于继承

“组合优于继承”（Composition over Inheritance）是面向对象设计的重要原则：**优先使用对象组合，而不是类继承来复用代码**。

### 继承的问题

1. **紧耦合**：子类强依赖父类实现，父类的修改可能影响所有子类
2. **脆弱的基类**：基类轻微改动可能破坏整个继承层次
3. **不灵活**：继承关系在定义时确定，运行时难以改变
4. **猩猩香蕉问题**：你想要一个香蕉，结果拿到的是一只拿着香蕉的猩猩和整个丛林（依赖过多）

### 组合的优势

1. **松耦合**：对象之间通过接口/方法交互，更易替换实现
2. **灵活**：可以在运行时动态组合能力
3. **易维护**：修改某个能力模块时影响范围更可控

### 对比示例

**使用继承（问题示例）：**

```js
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

// 问题：鸭子既会飞又会游，该继承哪个？
// 多重继承会变得复杂且 JS 类本身不支持
```

**使用组合（推荐）：**

```js
// 将能力定义为独立对象
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

// 创建不同动物
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

### 何时仍然使用继承

尽管组合通常更灵活，但在以下情况继承仍然适用：

1. 存在稳定的 “is-a” 关系：如 `Dog` 是 `Animal`
2. 需要多态行为：子类实例需要被当作父类在系统中传递
3. 框架要求：部分框架/库设计为通过继承扩展（现代前端已较少）

> 最佳实践：**默认优先考虑组合**，在确实需要利用继承的语义和能力时再引入 `extends`，并保持继承层次尽量扁平（2 ～ 3 层以内）。

---

## 原生构造函数的继承（内建类型的子类化）

ES6 之后，原生构造函数（内建类型）也可以被继承，并且在现代引擎中支持得较好。常见内建构造函数包括：

- `Boolean`
- `Number`
- `String`
- `Array`
- `Date`
- `Function`
- `RegExp`
- `Error`
- `Object`
- `Map` / `Set` / `Promise` 等（ES6+ 集合类型）

### 继承 `Array`

```js
class MyArray extends Array {
  first() {
    return this[0];
  }

  last() {
    return this[this.length - 1];
  }
}

const arr = new MyArray(1, 2, 3);

console.log(arr.first()); // 1
console.log(arr.last()); // 3
console.log(arr instanceof MyArray); // true
console.log(arr instanceof Array); // true

// 一些数组方法会返回同一构造函数的实例（取决于 Symbol.species）
const mapped = arr.map((x) => x * 2);
console.log(mapped instanceof MyArray); // 通常为 true
```

> 某些方法是否返回子类实例，受 `Symbol.species` 影响，有需要时可以自定义。

### 继承 `Error`（自定义错误类型）

```js
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

try {
  throw new ValidationError('无效输入');
} catch (e) {
  console.log(e.name); // ValidationError
  console.log(e.message); // 无效输入
  console.log(e.stack); // 堆栈信息（不同引擎略有差异）
}
```

> 在 Node.js 和现代浏览器中，自定义错误类型的行为已相对一致；但依旧建议在关键逻辑中通过测试确认堆栈、类型判断等是否符合预期。

---

## ES5 继承（理解 class 底层）

在 ES6 `class` 出现之前，JavaScript 通过构造函数和原型链实现继承。了解 ES5 继承方式有助于：

1. 理解 `class` 的底层机制
2. 维护旧代码
3. 深入掌握原型链

### 原型链继承（第一版）

```js
function Super() {
  this.super_param = [1, 2, 3];
}
Super.prototype.getSuperParam = function () {
  return this.super_param;
};

function Sub() {
  this.sub_param = true;
}

// 核心：Sub.prototype 指向 Super 的实例
Sub.prototype = new Super();

Sub.prototype.getSubParam = function () {
  return this.sub_param;
};

var instance1 = new Sub();
var instance2 = new Sub();
instance1.super_param.push(4);

console.log(instance1.super_param); // [1, 2, 3, 4]
console.log(instance2.super_param); // [1, 2, 3, 4]

// 缺点1：引用类型属性（如数组）在所有实例间共享
// 缺点2：Sub.prototype 重写后，constructor 指向丢失（不再是 Sub）
```

### 组合继承（第二版）

通过 **构造函数借用 + 原型链继承** 的组合，解决引用类型共享问题：

```js
function Super() {
  this.super_param = [1, 2, 3];
}
Super.prototype.getSuperParam = function () {
  return this.super_param;
};

function Sub() {
  // 构造函数借用：每个 Sub 实例都有自己的 super_param
  Super.call(this);
  this.sub_param = true;
}

// 原型链继承：Sub.prototype 指向 Super 的实例
Sub.prototype = new Super();

// 修复 constructor 指向
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

// 缺点：Super 构造函数被调用了两次
// - 一次在 Sub 构造器中（Super.call(this)）
// - 一次在设置原型链时（new Super()）
```

### 寄生组合式继承（第三版，推荐的 ES5 模式）

目标：避免第二版中“父类构造函数被调用两次”的问题。

```js
function Super() {
  this.super_param = [1, 2, 3];
}
Super.prototype.getSuperParam = function () {
  return this.super_param;
};

function Sub() {
  // 通过构造函数借用继承实例属性
  Super.call(this);
  this.sub_param = true;
}

// 核心：通过 Object.create 建立原型链，而不是 new Super()
Sub.prototype = Object.create(Super.prototype);
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
```

> 这种“构造函数借用 + `Object.create` 建立原型链”的方式就是经典的 **寄生组合式继承**。它是 ES5 环境下最推荐的手写继承方式，也是 ES6 `class extends` 的一个重要参考模型。

### `Object.setPrototypeOf` 的简要说明（ES6+）

在 ES6+ 环境，可以用 `Object.setPrototypeOf` 修改已有对象的原型，包括函数的 `prototype` 对象：

```js
// ES6+ 写法（不属于 ES5 继承）：
Object.setPrototypeOf(Sub.prototype, Super.prototype);
```

它的效果类似于“让 `Sub.prototype` 的原型指向 `Super.prototype`”，但 **不会新建 `Sub.prototype` 对象**，与 `Sub.prototype = Object.create(...)` 并不完全等价。

此外，`Object.setPrototypeOf` 在性能上通常较差，不适合在热路径上频繁调用，因此更推荐在定义阶段使用 `Object.create`。
