"use strict";(self.webpackChunk_c6i_playground=self.webpackChunk_c6i_playground||[]).push([[4705],{94705:function(t,n,e){e.r(n),e.d(n,{texts:function(){return a}});const a=[{value:"ES6 \u63D0\u51FA class \u5173\u952E\u5B57\u662F\u5E0C\u671B\u89E3\u51B3\u4EC0\u4E48\u95EE\u9898\uFF1F\u5B83\u662F\u4E0D\u662F\u9E21\u808B\uFF1F",paraId:0,tocIndex:0},{value:"JavaScript \u4E2D\uFF0C\u7C7B\u662F\u4E00\u79CD\u51FD\u6570\u3002\u5C31\u50CF\u51FD\u6570\u4E00\u6837\uFF0C",paraId:1,tocIndex:0},{value:"\u7C7B\u53EF\u4EE5\u5728\u53E6\u5916\u4E00\u4E2A\u8868\u8FBE\u5F0F\u4E2D\u88AB\u5B9A\u4E49\uFF0C\u88AB\u4F20\u9012,\u88AB\u8FD4\u56DE\uFF0C\u88AB\u8D4B\u503C\uFF0C\u7C7B\u4E0D\u5B58\u5728\u53D8\u91CF\u63D0\u5347",paraId:1,tocIndex:0},{value:"\u3002",paraId:1,tocIndex:0},{value:`class MyClass {
  static staticParam = val; // \u9759\u6001\u5C5E\u6027

  prop = value; // \u5B9E\u4F8B\u5C5E\u6027

  constructor(prop) {
    // \u6784\u9020\u5668
    // ...
    this.prop = prop; // \u5B9E\u4F8B\u5C5E\u6027
  }

  method() {} // \u666E\u901A\u65B9\u6CD5\uFF0C\u4F5C\u4E3A\u56DE\u8C03\u65F6\u53EF\u80FD\u4E22\u5931 this
  method = () => {}; // \u7BAD\u5934\u51FD\u6570\u65B9\u6CD5\uFF0Cthis \u6C38\u8FDC\u6307\u5411\u5B9E\u4F8B

  get something() {} // getter \u65B9\u6CD5
  set something(value) {} // setter \u65B9\u6CD5

  [Symbol.iterator]() {} // \u6709\u8BA1\u7B97\u540D\u79F0\uFF08computed name\uFF09\u7684\u65B9\u6CD5\uFF08\u6B64\u5904\u4E3A symbol\uFF09
  // ...
}
`,paraId:2,tocIndex:1},{value:"\u4E0D\u4EC5\u4EC5\u662F\u8BED\u6CD5\u7CD6\uFF1A",paraId:3,tocIndex:2},{value:"constructor()",paraId:4,tocIndex:2},{value:" \u65B9\u6CD5",paraId:4,tocIndex:2},{value:"\uFF1A\u7C7B\u7684\u9ED8\u8BA4\u65B9\u6CD5\uFF0C",paraId:4,tocIndex:2},{value:"\u901A\u8FC7 ",paraId:4,tocIndex:2},{value:"new",paraId:4,tocIndex:2},{value:" \u547D\u4EE4\u751F\u6210\u5BF9\u8C61\u5B9E\u4F8B\u65F6\uFF0C\u81EA\u52A8\u8C03\u7528\u8BE5\u65B9\u6CD5",paraId:4,tocIndex:2},{value:"\u3002\u4E00\u4E2A\u7C7B\u5FC5\u987B\u6709 ",paraId:4,tocIndex:2},{value:"constructor()",paraId:4,tocIndex:2},{value:" \u65B9\u6CD5\uFF0C",paraId:4,tocIndex:2},{value:"\u5982\u679C\u6CA1\u6709\u663E\u5F0F\u5B9A\u4E49\uFF0C\u4E00\u4E2A\u7A7A\u7684 ",paraId:4,tocIndex:2},{value:"constructor()",paraId:4,tocIndex:2},{value:" \u65B9\u6CD5\u4F1A\u88AB\u9ED8\u8BA4\u6DFB\u52A0",paraId:4,tocIndex:2},{value:"\u3002",paraId:4,tocIndex:2},{value:"\u8FD4\u56DE\u503C",paraId:5,tocIndex:2},{value:"\uFF1A",paraId:5,tocIndex:2},{value:"constructor()",paraId:5,tocIndex:2},{value:" \u65B9\u6CD5\u9ED8\u8BA4\u8FD4\u56DE\u5B9E\u4F8B\u5BF9\u8C61\uFF08\u5373 ",paraId:5,tocIndex:2},{value:"this",paraId:5,tocIndex:2},{value:"\uFF09\uFF0C",paraId:5,tocIndex:2},{value:"\u5B8C\u5168\u53EF\u4EE5\u6307\u5B9A\u8FD4\u56DE\u53E6\u5916\u4E00\u4E2A\u5BF9\u8C61",paraId:5,tocIndex:2},{value:"\u3002",paraId:5,tocIndex:2},{value:`class Foo {
  constructor() {
    return Object.create(null);
  }
}

console.log(new Foo() instanceof Foo); // false
`,paraId:6,tocIndex:2},{value:"\u5B9E\u4F8B\u5C5E\u6027\u5B9A\u4E49\u4F4D\u7F6E",paraId:7,tocIndex:2},{value:"\uFF1A\u5B9E\u4F8B\u5C5E\u6027\u9664\u4E86\u5B9A\u4E49\u5728 ",paraId:7,tocIndex:2},{value:"constructor()",paraId:7,tocIndex:2},{value:" \u65B9\u6CD5\u91CC\u9762\u7684 ",paraId:7,tocIndex:2},{value:"this",paraId:7,tocIndex:2},{value:" \u4E0A\u9762\uFF0C\u4E5F\u53EF\u4EE5\u5B9A\u4E49\u5728\u7C7B\u7684\u6700\u9876\u5C42\u3002",paraId:7,tocIndex:2},{value:`class User {
  name = '\u533F\u540D'; // \u5B9E\u4F8B\u5C5E\u6027\uFF08\u63A8\u8350\uFF09

  constructor() {
    this.age = 0; // \u5B9E\u4F8B\u5C5E\u6027
  }
}
`,paraId:8,tocIndex:2},{value:"\u65B9\u6CD5\u4E0D\u53EF\u679A\u4E3E",paraId:9,tocIndex:2},{value:"\uFF1A\u5728\u7C7B\u7684\u5B9E\u4F8B\u4E0A\u9762\u8C03\u7528\u65B9\u6CD5\uFF0C\u5176\u5B9E\u5C31\u662F\u8C03\u7528\u539F\u578B\u4E0A\u7684\u65B9\u6CD5\uFF0C\u53E6\u5916\uFF0C",paraId:9,tocIndex:2},{value:"\u7C7B\u7684\u5185\u90E8\u6240\u6709\u5B9A\u4E49\u7684\u65B9\u6CD5\uFF0C\u90FD\u662F\u4E0D\u53EF\u679A\u4E3E\u7684",paraId:9,tocIndex:2},{value:"\uFF08non-enumerable\uFF09\u3002",paraId:9,tocIndex:2},{value:`class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return \`(\${this.x}, \${this.y})\`;
  }
}

const p = new Point(1, 2);
console.log(Object.keys(p)); // ['x', 'y']\uFF08\u4E0D\u5305\u542B toString\uFF09
console.log(Object.getOwnPropertyNames(Point.prototype)); // ['constructor', 'toString']
`,paraId:10,tocIndex:2},{value:"\u5185\u90E8\u6807\u8BB0",paraId:11,tocIndex:2},{value:"\uFF1A\u901A\u8FC7 ",paraId:11,tocIndex:2},{value:"class",paraId:11,tocIndex:2},{value:" \u521B\u5EFA\u7684\u51FD\u6570\u5177\u6709\u7279\u6B8A\u7684\u5185\u90E8\u5C5E\u6027\u6807\u8BB0 ",paraId:11,tocIndex:2},{value:'[[FunctionKind]]: "classConstructor"',paraId:11,tocIndex:2},{value:"\u3002\u56E0\u6B64\uFF0C\u5B83\u4E0E ES5 \u624B\u52A8\u521B\u5EFA\u5E76\u4E0D\u5B8C\u5168\u76F8\u540C\u3002",paraId:11,tocIndex:2},{value:`class User {}
console.log(typeof User); // function

// \u4F46\u4E0D\u80FD\u5728\u6CA1\u6709 new \u7684\u60C5\u51B5\u4E0B\u8C03\u7528 class
// User(); // TypeError: Class constructor User cannot be invoked without 'new'
`,paraId:12,tocIndex:2},{value:"\u4E25\u683C\u6A21\u5F0F",paraId:13,tocIndex:2},{value:"\uFF1A\u7C7B\u603B\u662F\u4F7F\u7528 ",paraId:13,tocIndex:2},{value:"use strict",paraId:13,tocIndex:2},{value:"\u3002\u5728\u7C7B\u6784\u9020\u4E2D\u7684\u6240\u6709\u4EE3\u7801\u90FD\u5C06\u81EA\u52A8\u8FDB\u5165\u4E25\u683C\u6A21\u5F0F\u3002",paraId:13,tocIndex:2},{value:"\u7C7B\u53EF\u4EE5\u50CF\u51FD\u6570\u4E00\u6837\u5728\u8868\u8FBE\u5F0F\u4E2D\u5B9A\u4E49\uFF1A",paraId:14,tocIndex:3},{value:`// \u547D\u540D\u7C7B\u8868\u8FBE\u5F0F
const User = class MyClass {
  sayHi() {
    console.log(MyClass); // MyClass \u540D\u5B57\u53EA\u5728\u7C7B\u5185\u90E8\u53EF\u89C1
  }
};

new User().sayHi(); // \u6B63\u5E38\u8FD0\u884C\uFF0C\u663E\u793A MyClass \u5B9A\u4E49

// console.log(MyClass); // ReferenceError: MyClass is not defined

// \u533F\u540D\u7C7B\u8868\u8FBE\u5F0F
const Anonymous = class {
  /* ... */
};

// \u52A8\u6001\u521B\u5EFA\u7C7B
function makeClass(phrase) {
  return class {
    sayHi() {
      console.log(phrase);
    }
  };
}

const User2 = makeClass('Hello');
new User2().sayHi(); // Hello
`,paraId:15,tocIndex:3},{value:"\u9759\u6001\u6210\u5458\u5C5E\u4E8E\u7C7B\u672C\u8EAB\uFF0C\u800C\u4E0D\u662F\u7C7B\u7684\u5B9E\u4F8B\u3002\u901A\u8FC7 ",paraId:16,tocIndex:4},{value:"static",paraId:16,tocIndex:4},{value:" \u5173\u952E\u5B57\u5B9A\u4E49\u3002",paraId:16,tocIndex:4},{value:`class User {
  static staticProperty = 'static value';

  static staticMethod() {
    console.log('This is a static method');
    console.log(this === User); // true
  }

  constructor(name) {
    this.name = name;
  }

  normalMethod() {
    console.log(\`Hello, \${this.name}\`);
  }
}

// \u8BBF\u95EE\u9759\u6001\u6210\u5458
console.log(User.staticProperty); // 'static value'
User.staticMethod(); // This is a static method

// \u5B9E\u4F8B\u65E0\u6CD5\u8BBF\u95EE\u9759\u6001\u6210\u5458
const user = new User('\u5F20\u4E09');
console.log(user.staticProperty); // undefined
// user.staticMethod(); // TypeError
`,paraId:17,tocIndex:4},{value:"\u9759\u6001\u6210\u5458\u7684\u7EE7\u627F\uFF1A",paraId:18,tocIndex:4},{value:`class Animal {
  static planet = 'Earth';

  static getPlanet() {
    return this.planet; // this \u6307\u5411\u8C03\u7528\u7684\u7C7B
  }
}

class Rabbit extends Animal {
  static planet = 'Mars'; // \u53EF\u4EE5\u8986\u76D6\u7236\u7C7B\u7684\u9759\u6001\u5C5E\u6027
}

console.log(Animal.planet); // Earth
console.log(Rabbit.planet); // Mars

console.log(Animal.getPlanet()); // Earth
console.log(Rabbit.getPlanet()); // Mars\uFF08this \u6307\u5411 Rabbit\uFF09
`,paraId:19,tocIndex:4},{value:"\u5E38\u89C1\u7528\u9014\uFF1A",paraId:20,tocIndex:4},{value:`class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

  // \u5DE5\u5382\u65B9\u6CD5
  static createTodays(title) {
    return new this(title, new Date());
  }

  // \u6BD4\u8F83\u65B9\u6CD5
  static compare(articleA, articleB) {
    return articleA.date - articleB.date;
  }
}

const article = Article.createTodays('\u4ECA\u65E5\u65B0\u95FB');
console.log(article.date); // \u4ECA\u5929\u7684\u65E5\u671F

const articles = [
  new Article('\u6587\u7AE01', new Date(2024, 0, 1)),
  new Article('\u6587\u7AE02', new Date(2024, 6, 1)),
];
articles.sort(Article.compare);
`,paraId:21,tocIndex:4},{value:"ES2022+ \u5F15\u5165\u4E86\u771F\u6B63\u7684\u79C1\u6709\u5B57\u6BB5\uFF0C\u4F7F\u7528 ",paraId:22,tocIndex:5},{value:"#",paraId:22,tocIndex:5},{value:" \u524D\u7F00\u3002\u79C1\u6709\u6210\u5458\u53EA\u80FD\u5728\u7C7B\u7684\u5185\u90E8\u8BBF\u95EE\u3002",paraId:22,tocIndex:5},{value:`class BankAccount {
  // \u79C1\u6709\u5B57\u6BB5\u5FC5\u987B\u5148\u58F0\u660E
  #balance = 0;
  #pin;

  constructor(initialBalance, pin) {
    this.#balance = initialBalance;
    this.#pin = pin;
  }

  // \u79C1\u6709\u65B9\u6CD5
  #validatePin(inputPin) {
    return this.#pin === inputPin;
  }

  // \u516C\u5171\u65B9\u6CD5\u53EF\u4EE5\u8BBF\u95EE\u79C1\u6709\u6210\u5458
  withdraw(amount, pin) {
    if (!this.#validatePin(pin)) {
      throw new Error('\u9519\u8BEF\u7684 PIN');
    }
    if (amount > this.#balance) {
      throw new Error('\u4F59\u989D\u4E0D\u8DB3');
    }
    this.#balance -= amount;
    return amount;
  }

  getBalance(pin) {
    if (!this.#validatePin(pin)) {
      throw new Error('\u9519\u8BEF\u7684 PIN');
    }
    return this.#balance;
  }
}

const account = new BankAccount(1000, '1234');
console.log(account.getBalance('1234')); // 1000

// \u65E0\u6CD5\u4ECE\u5916\u90E8\u8BBF\u95EE\u79C1\u6709\u5B57\u6BB5
// console.log(account.#balance); // SyntaxError
// console.log(account.#pin); // SyntaxError
`,paraId:23,tocIndex:5},{value:"\u9759\u6001\u79C1\u6709\u5B57\u6BB5\uFF1A",paraId:24,tocIndex:5},{value:`class Counter {
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
`,paraId:25,tocIndex:5},{value:"\u79C1\u6709\u5B57\u6BB5\u7684\u7279\u70B9\uFF1A",paraId:26,tocIndex:5},{value:"\u5FC5\u987B\u5728\u7C7B\u7684\u9876\u5C42\u58F0\u660E\uFF0C\u4E0D\u80FD\u52A8\u6001\u521B\u5EFA",paraId:27,tocIndex:5},{value:"\u4E0D\u80FD\u5728\u7C7B\u7684\u5916\u90E8\u8BBF\u95EE\uFF0C\u5373\u4F7F\u901A\u8FC7\u53CD\u5C04\u4E5F\u4E0D\u884C",paraId:27,tocIndex:5},{value:"\u5B50\u7C7B\u65E0\u6CD5\u8BBF\u95EE\u7236\u7C7B\u7684\u79C1\u6709\u5B57\u6BB5",paraId:27,tocIndex:5},{value:"\u79C1\u6709\u5B57\u6BB5\u540D\u4E0D\u4F1A\u4E0E\u516C\u5171\u5B57\u6BB5\u540D\u51B2\u7A81",paraId:27,tocIndex:5},{value:`class MyClass {
  #x = 1;
  x = 2;

  getX() {
    return [this.#x, this.x];
  }
}

console.log(new MyClass().getX()); // [1, 2]
`,paraId:28,tocIndex:5},{value:"Getter \u548C setter \u5141\u8BB8\u4F60\u5B9A\u4E49\u8BBF\u95EE\u5668\u5C5E\u6027\uFF0C\u5B83\u4EEC\u770B\u8D77\u6765\u50CF\u666E\u901A\u5C5E\u6027\uFF0C\u4F46\u5B9E\u9645\u4E0A\u662F\u901A\u8FC7\u65B9\u6CD5\u6765\u8BFB\u53D6\u548C\u8BBE\u7F6E\u503C\u3002",paraId:29,tocIndex:6},{value:`class User {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // getter
  get fullName() {
    return \`\${this.firstName} \${this.lastName}\`;
  }

  // setter
  set fullName(value) {
    [this.firstName, this.lastName] = value.split(' ');
  }
}

const user = new User('\u5F20', '\u4E09');

// \u4F7F\u7528 getter\uFF08\u50CF\u8BBF\u95EE\u5C5E\u6027\u4E00\u6837\uFF09
console.log(user.fullName); // \u5F20 \u4E09

// \u4F7F\u7528 setter\uFF08\u50CF\u8BBE\u7F6E\u5C5E\u6027\u4E00\u6837\uFF09
user.fullName = '\u674E \u56DB';
console.log(user.firstName); // \u674E
console.log(user.lastName); // \u56DB
`,paraId:30,tocIndex:6},{value:"\u7ED3\u5408\u79C1\u6709\u5B57\u6BB5\u4F7F\u7528\uFF1A",paraId:31,tocIndex:6},{value:`class Temperature {
  #celsius;

  constructor(celsius) {
    this.#celsius = celsius;
  }

  // \u83B7\u53D6\u6444\u6C0F\u5EA6
  get celsius() {
    return this.#celsius;
  }

  // \u8BBE\u7F6E\u6444\u6C0F\u5EA6
  set celsius(value) {
    if (value < -273.15) {
      throw new Error('\u6E29\u5EA6\u4E0D\u80FD\u4F4E\u4E8E\u7EDD\u5BF9\u96F6\u5EA6');
    }
    this.#celsius = value;
  }

  // \u83B7\u53D6\u534E\u6C0F\u5EA6
  get fahrenheit() {
    return this.#celsius * 1.8 + 32;
  }

  // \u8BBE\u7F6E\u534E\u6C0F\u5EA6
  set fahrenheit(value) {
    this.celsius = (value - 32) / 1.8;
  }
}

const temp = new Temperature(25);
console.log(temp.celsius); // 25
console.log(temp.fahrenheit); // 77

temp.fahrenheit = 86;
console.log(temp.celsius); // 30
`,paraId:32,tocIndex:6},{value:"\u53EA\u8BFB\u5C5E\u6027\uFF08\u53EA\u6709 getter\uFF09\uFF1A",paraId:33,tocIndex:6},{value:`class Circle {
  #radius;

  constructor(radius) {
    this.#radius = radius;
  }

  get radius() {
    return this.#radius;
  }

  // \u53EA\u6709 getter\uFF0C\u6CA1\u6709 setter\uFF0C\u6240\u4EE5\u8FD9\u662F\u53EA\u8BFB\u7684
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

// circle.area = 100; // \u8BBE\u7F6E\u65E0\u6548\uFF08\u4E25\u683C\u6A21\u5F0F\u4E0B\u4F1A\u62A5\u9519\uFF09
`,paraId:34,tocIndex:6},{value:"\u4F7F\u7528\u573A\u666F\uFF1A",paraId:35,tocIndex:6},{value:"\u6570\u636E\u9A8C\u8BC1",paraId:36,tocIndex:6},{value:"\uFF1A\u5728 setter \u4E2D\u9A8C\u8BC1\u8F93\u5165\u503C",paraId:36,tocIndex:6},{value:"\u8BA1\u7B97\u5C5E\u6027",paraId:36,tocIndex:6},{value:"\uFF1A\u57FA\u4E8E\u5176\u4ED6\u5C5E\u6027\u8BA1\u7B97\u503C",paraId:36,tocIndex:6},{value:"\u5411\u540E\u517C\u5BB9",paraId:36,tocIndex:6},{value:"\uFF1A\u5C06\u5B57\u6BB5\u6539\u4E3A\u8BA1\u7B97\u5C5E\u6027\u800C\u4E0D\u7834\u574F API",paraId:36,tocIndex:6},{value:"\u61D2\u52A0\u8F7D",paraId:36,tocIndex:6},{value:"\uFF1A\u53EA\u5728\u9700\u8981\u65F6\u624D\u8BA1\u7B97\u503C",paraId:36,tocIndex:6},{value:`class LazyProperty {
  #computed;

  get expensiveValue() {
    if (this.#computed === undefined) {
      console.log('\u8BA1\u7B97\u4E2D...');
      this.#computed = this.#calculate();
    }
    return this.#computed;
  }

  #calculate() {
    // \u6A21\u62DF\u8017\u65F6\u8BA1\u7B97
    return Math.random() * 1000;
  }
}

const obj = new LazyProperty();
console.log(obj.expensiveValue); // \u8BA1\u7B97\u4E2D... \u7136\u540E\u8F93\u51FA\u7ED3\u679C
console.log(obj.expensiveValue); // \u76F4\u63A5\u8F93\u51FA\u7ED3\u679C\uFF08\u4E0D\u518D\u8BA1\u7B97\uFF09
`,paraId:37,tocIndex:6},{value:"\u5B50\u7C7B\u7684 ",paraId:38,tocIndex:8},{value:"constructor",paraId:38,tocIndex:8},{value:" \u5FC5\u987B\u8C03\u7528 ",paraId:38,tocIndex:8},{value:"super(...)",paraId:38,tocIndex:8},{value:"\uFF0C\u5E76\u4E14 (\uFF01) \u4E00\u5B9A\u8981\u5728\u4F7F\u7528 ",paraId:38,tocIndex:8},{value:"this",paraId:38,tocIndex:8},{value:" \u4E4B\u524D\u8C03\u7528\u3002",paraId:38,tocIndex:8},{value:"\u5982\u679C\u5B50\u7C7B\u6CA1\u6709\u5B9A\u4E49 ",paraId:39,tocIndex:8},{value:"constructor()",paraId:39,tocIndex:8},{value:" \u65B9\u6CD5\uFF0C\u8FD9\u4E2A\u65B9\u6CD5\u4F1A\u9ED8\u8BA4\u6DFB\u52A0\uFF0C\u5E76\u4E14\u91CC\u9762\u4F1A\u8C03\u7528 ",paraId:39,tocIndex:8},{value:"super()",paraId:39,tocIndex:8},{value:"\u3002\u4E5F\u5C31\u662F\u8BF4\uFF0C\u4E0D\u7BA1\u6709\u6CA1\u6709\u663E\u5F0F\u5B9A\u4E49\uFF0C\u4EFB\u4F55\u4E00\u4E2A\u5B50\u7C7B\u90FD\u6709 ",paraId:39,tocIndex:8},{value:"constructor()",paraId:39,tocIndex:8},{value:" \u65B9\u6CD5\u3002",paraId:39,tocIndex:8},{value:`class Animal {
  constructor(name) {
    this.name = name;
    this.speed = 0;
  }

  run(speed) {
    this.speed = speed;
    console.log(\`\${this.name} runs with speed \${this.speed}\`);
  }

  stop() {
    this.speed = 0;
    console.log(\`\${this.name} stands still\`);
  }
}

class Rabbit extends Animal {
  constructor(name, earLength) {
    super(name); // \u5FC5\u987B\u5148\u8C03\u7528 super
    this.earLength = earLength; // \u7136\u540E\u624D\u80FD\u4F7F\u7528 this
  }

  hide() {
    console.log(\`\${this.name} hides!\`);
  }
}

const rabbit = new Rabbit('White Rabbit', 10);
rabbit.run(5); // White Rabbit runs with speed 5
rabbit.hide(); // White Rabbit hides!
`,paraId:40,tocIndex:8},{value:"\u5F53\u901A\u8FC7 ",paraId:41,tocIndex:9},{value:"new",paraId:41,tocIndex:9},{value:" \u6267\u884C\u4E00\u4E2A\u5E38\u89C4\u51FD\u6570\u65F6\uFF0C\u5B83\u5C06\u521B\u5EFA\u4E00\u4E2A\u7A7A\u5BF9\u8C61\uFF0C\u5E76\u5C06 ",paraId:41,tocIndex:9},{value:"this",paraId:41,tocIndex:9},{value:" \u6307\u5411\u8FD9\u4E2A\u7A7A\u5BF9\u8C61\uFF08\u5E38\u89C4 new \u884C\u4E3A\uFF09\u3002",paraId:41,tocIndex:9},{value:"\u4F46\u662F\u5F53\u5B50\u7C7B\u7684 ",paraId:41,tocIndex:9},{value:"constructor",paraId:41,tocIndex:9},{value:" \u6267\u884C\u65F6\uFF0C\u5B83\u4E0D\u4F1A\u6267\u884C\u6B64\u64CD\u4F5C\u3002\u5B83\u671F\u671B\u7236\u7C7B\u7684 ",paraId:41,tocIndex:9},{value:"constructor",paraId:41,tocIndex:9},{value:" \u6765\u5B8C\u6210\u8FD9\u9879\u5DE5\u4F5C",paraId:41,tocIndex:9},{value:"\u3002\u56E0\u6B64\uFF0C\u5B50\u7C7B\u7684 ",paraId:41,tocIndex:9},{value:"constructor",paraId:41,tocIndex:9},{value:" \u5FC5\u987B\u8C03\u7528 ",paraId:41,tocIndex:9},{value:"super",paraId:41,tocIndex:9},{value:" \u624D\u80FD\u6267\u884C\u5176\u7236\u7C7B\u7684 ",paraId:41,tocIndex:9},{value:"constructor",paraId:41,tocIndex:9},{value:"\uFF0C\u5426\u5219 ",paraId:41,tocIndex:9},{value:"this",paraId:41,tocIndex:9},{value:" \u6307\u5411\u7684\u90A3\u4E2A\u5BF9\u8C61\u5C06\u4E0D\u4F1A\u88AB\u521B\u5EFA\uFF0C\u5E76\u4E14\u6211\u4EEC\u4F1A\u6536\u5230\u4E00\u4E2A\u62A5\u9519\u3002",paraId:41,tocIndex:9},{value:"\u76F8\u5173\u8BA8\u8BBA",paraId:42,tocIndex:9},{value:"\uFF1A",paraId:42,tocIndex:9},{value:"ES6 \u7684\u5B50\u7C7B\u6709\u6CA1\u6709\u81EA\u5DF1\u7684 this\uFF1F",paraId:42,tocIndex:9},{value:"extends",paraId:43,tocIndex:10},{value:" \u540E\u9762\u53EF\u4EE5\u8DDF\u4EFB\u610F\u8868\u8FBE\u5F0F\uFF0C\u4E0D\u4EC5\u4EC5\u662F\u7C7B\u540D\uFF1A",paraId:43,tocIndex:10},{value:`// \u4F7F\u7528\u51FD\u6570\u8FD4\u56DE\u7684\u7C7B\u4F5C\u4E3A\u7236\u7C7B
function f(phrase) {
  return class {
    sayHi() {
      console.log(phrase);
    }
  };
}

class User extends f('Hello') {}

new User().sayHi(); // Hello

// \u6839\u636E\u6761\u4EF6\u9009\u62E9\u7236\u7C7B
function Animal() {}
function Plant() {}

const isMammal = true;
class Organism extends (isMammal ? Animal : Plant) {}
`,paraId:44,tocIndex:10},{value:"super",paraId:45,tocIndex:11},{value:" \u8FD9\u4E2A\u5173\u952E\u5B57\uFF0C\u65E2\u53EF\u4EE5\u5F53\u4F5C\u51FD\u6570\u4F7F\u7528\uFF0C\u4E5F\u53EF\u4EE5\u5F53\u4F5C\u5BF9\u8C61\u4F7F\u7528\u3002\u5728\u8FD9\u4E24\u79CD\u60C5\u51B5\u4E0B\uFF0C\u5B83\u7684\u7528\u6CD5\u5B8C\u5168\u4E0D\u540C\u3002",paraId:45,tocIndex:11},{value:"super",paraId:46,tocIndex:12},{value:" \u4F5C\u4E3A\u51FD\u6570\u8C03\u7528\u65F6\uFF0C\u4EE3\u8868\u7236\u7C7B\u7684\u6784\u9020\u51FD\u6570\u3002ES6 \u8981\u6C42\uFF0C\u5B50\u7C7B\u7684\u6784\u9020\u51FD\u6570\u5FC5\u987B\u6267\u884C\u4E00\u6B21 ",paraId:46,tocIndex:12},{value:"super",paraId:46,tocIndex:12},{value:" \u51FD\u6570\u3002",paraId:46,tocIndex:12},{value:`class Parent {
  constructor(name) {
    this.name = name;
    console.log('Parent constructor');
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name); // \u8C03\u7528\u7236\u7C7B\u6784\u9020\u51FD\u6570
    this.age = age;
    console.log('Child constructor');
  }
}

const child = new Child('\u5C0F\u660E', 10);
// Parent constructor
// Child constructor
`,paraId:47,tocIndex:12},{value:"\u6CE8\u610F",paraId:48,tocIndex:12},{value:"\uFF1A",paraId:48,tocIndex:12},{value:"super",paraId:48,tocIndex:12},{value:" \u867D\u7136\u4EE3\u8868\u4E86\u7236\u7C7B\u7684\u6784\u9020\u51FD\u6570\uFF0C\u4F46\u662F\u8FD4\u56DE\u7684\u662F\u5B50\u7C7B\u7684\u5B9E\u4F8B\uFF0C\u5373 ",paraId:48,tocIndex:12},{value:"super",paraId:48,tocIndex:12},{value:" \u5185\u90E8\u7684 ",paraId:48,tocIndex:12},{value:"this",paraId:48,tocIndex:12},{value:" \u6307\u7684\u662F\u5B50\u7C7B\u7684\u5B9E\u4F8B\uFF0C\u56E0\u6B64 ",paraId:48,tocIndex:12},{value:"super()",paraId:48,tocIndex:12},{value:" \u5728\u8FD9\u91CC\u76F8\u5F53\u4E8E ",paraId:48,tocIndex:12},{value:"Parent.prototype.constructor.call(this)",paraId:48,tocIndex:12},{value:"\u3002",paraId:48,tocIndex:12},{value:"\u4F5C\u4E3A\u51FD\u6570\u65F6\uFF0C",paraId:49,tocIndex:12},{value:"super()",paraId:49,tocIndex:12},{value:" ",paraId:49,tocIndex:12},{value:"\u53EA\u80FD\u7528\u5728\u5B50\u7C7B\u7684\u6784\u9020\u51FD\u6570\u4E4B\u4E2D\uFF0C\u7528\u5728\u5176\u4ED6\u5730\u65B9\u5C31\u4F1A\u62A5\u9519",paraId:49,tocIndex:12},{value:"\u3002",paraId:49,tocIndex:12},{value:`class Child extends Parent {
  sayHi() {
    super(); // SyntaxError: 'super' keyword unexpected here
  }
}
`,paraId:50,tocIndex:12},{value:"super",paraId:51,tocIndex:13},{value:" \u4F5C\u4E3A\u5BF9\u8C61\u65F6\uFF1A",paraId:51,tocIndex:13},{value:"\u5728\u666E\u901A\u65B9\u6CD5\u4E2D",paraId:52,tocIndex:13},{value:"\uFF0C\u6307\u5411\u7236\u7C7B\u7684\u539F\u578B\u5BF9\u8C61\uFF08",paraId:52,tocIndex:13},{value:"Parent.prototype",paraId:52,tocIndex:13},{value:"\uFF09",paraId:52,tocIndex:13},{value:"\u5728\u9759\u6001\u65B9\u6CD5\u4E2D",paraId:52,tocIndex:13},{value:"\uFF0C\u6307\u5411\u7236\u7C7B\u672C\u8EAB\uFF08",paraId:52,tocIndex:13},{value:"Parent",paraId:52,tocIndex:13},{value:"\uFF09",paraId:52,tocIndex:13},{value:"\u5728\u666E\u901A\u65B9\u6CD5\u4E2D\u4F7F\u7528\uFF1A",paraId:53,tocIndex:13},{value:`class Parent {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return \`Hello from \${this.name}\`;
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name);
    this.age = age;
  }

  sayHi() {
    // super \u6307\u5411 Parent.prototype
    const parentMessage = super.sayHi();
    return \`\${parentMessage}, I'm \${this.age} years old\`;
  }
}

const child = new Child('\u5C0F\u660E', 10);
console.log(child.sayHi()); // Hello from \u5C0F\u660E, I'm 10 years old
`,paraId:54,tocIndex:13},{value:"\u5728\u9759\u6001\u65B9\u6CD5\u4E2D\u4F7F\u7528\uFF1A",paraId:55,tocIndex:13},{value:`class Parent {
  static greet() {
    return 'Hello from Parent';
  }
}

class Child extends Parent {
  static greet() {
    // \u5728\u9759\u6001\u65B9\u6CD5\u4E2D\uFF0Csuper \u6307\u5411\u7236\u7C7B Parent
    return super.greet() + ', and Child';
  }
}

console.log(Child.greet()); // Hello from Parent, and Child
`,paraId:56,tocIndex:13},{value:"\u5728\u5B50\u7C7B\u7684\u666E\u901A\u65B9\u6CD5\u4E2D",paraId:57,tocIndex:14},{value:"\uFF0C\u901A\u8FC7 ",paraId:57,tocIndex:14},{value:"super",paraId:57,tocIndex:14},{value:" \u8C03\u7528\u7236\u7C7B\u7684\u65B9\u6CD5\u65F6\uFF0C\u65B9\u6CD5\u5185\u90E8\u7684 ",paraId:57,tocIndex:14},{value:"this",paraId:57,tocIndex:14},{value:" \u6307\u5411\u5F53\u524D\u7684\u5B50\u7C7B\u5B9E\u4F8B\u3002",paraId:57,tocIndex:14},{value:`class Parent {
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
    super.print(); // \u8C03\u7528\u7236\u7C7B\u7684 print \u65B9\u6CD5\uFF0C\u4F46 this \u6307\u5411\u5B50\u7C7B\u5B9E\u4F8B
  }
}

const child = new Child();
child.m(); // 2\uFF08\u4E0D\u662F 1\uFF09
`,paraId:58,tocIndex:14},{value:"\u5728\u5B50\u7C7B\u7684\u9759\u6001\u65B9\u6CD5\u4E2D",paraId:59,tocIndex:14},{value:"\uFF0C\u901A\u8FC7 ",paraId:59,tocIndex:14},{value:"super",paraId:59,tocIndex:14},{value:" \u8C03\u7528\u7236\u7C7B\u7684\u65B9\u6CD5\u65F6\uFF0C\u65B9\u6CD5\u5185\u90E8\u7684 ",paraId:59,tocIndex:14},{value:"this",paraId:59,tocIndex:14},{value:" \u6307\u5411\u5F53\u524D\u7684\u5B50\u7C7B\uFF0C\u800C\u4E0D\u662F\u5B50\u7C7B\u7684\u5B9E\u4F8B\u3002",paraId:59,tocIndex:14},{value:`class Parent {
  static myMethod(msg) {
    console.log('static', msg);
  }

  myMethod(msg) {
    console.log('instance', msg);
  }
}

class Child extends Parent {
  static myMethod(msg) {
    super.myMethod(msg); // \u8C03\u7528\u7236\u7C7B\u7684\u9759\u6001\u65B9\u6CD5
  }

  myMethod(msg) {
    super.myMethod(msg); // \u8C03\u7528\u7236\u7C7B\u7684\u5B9E\u4F8B\u65B9\u6CD5
  }
}

Child.myMethod('hello'); // static hello

const child = new Child();
child.myMethod('world'); // instance world
`,paraId:60,tocIndex:14},{value:"new.target",paraId:61,tocIndex:15},{value:" \u662F ES6 \u4E3A ",paraId:61,tocIndex:15},{value:"new",paraId:61,tocIndex:15},{value:" \u547D\u4EE4\u5F15\u5165\u7684\u4E00\u4E2A\u5143\u5C5E\u6027\uFF08meta-property\uFF09\u3002",paraId:61,tocIndex:15},{value:"\u8BE5\u5C5E\u6027\u4E00\u822C\u7528\u5728\u6784\u9020\u51FD\u6570\u4E4B\u4E2D",paraId:62,tocIndex:16},{value:"\uFF0C\u8FD4\u56DE ",paraId:62,tocIndex:16},{value:"new",paraId:62,tocIndex:16},{value:" \u547D\u4EE4\u4F5C\u7528\u4E8E\u7684\u90A3\u4E2A\u6784\u9020\u51FD\u6570\u3002\u5982\u679C\u6784\u9020\u51FD\u6570\u4E0D\u662F\u901A\u8FC7 ",paraId:62,tocIndex:16},{value:"new",paraId:62,tocIndex:16},{value:" \u547D\u4EE4\u6216 ",paraId:62,tocIndex:16},{value:"Reflect.construct()",paraId:62,tocIndex:16},{value:" \u8C03\u7528\u7684\uFF0C",paraId:62,tocIndex:16},{value:"new.target",paraId:62,tocIndex:16},{value:" \u4F1A\u8FD4\u56DE ",paraId:62,tocIndex:16},{value:"undefined",paraId:62,tocIndex:16},{value:"\u3002",paraId:62,tocIndex:16},{value:`function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('\u5FC5\u987B\u4F7F\u7528 new \u547D\u4EE4\u751F\u6210\u5B9E\u4F8B');
  }
}

// \u6216\u8005\u66F4\u7B80\u6D01\u7684\u5199\u6CD5
function Person2(name) {
  if (!new.target) {
    throw new Error('\u5FC5\u987B\u4F7F\u7528 new \u547D\u4EE4\u751F\u6210\u5B9E\u4F8B');
  }
  this.name = name;
}

const person = new Person('\u5F20\u4E09'); // \u6B63\u786E
// const person2 = Person('\u674E\u56DB'); // \u62A5\u9519
`,paraId:63,tocIndex:16},{value:"\u5728 ",paraId:64,tocIndex:17},{value:"Class",paraId:64,tocIndex:17},{value:" \u5185\u90E8\u8C03\u7528 ",paraId:64,tocIndex:17},{value:"new.target",paraId:64,tocIndex:17},{value:"\uFF0C\u8FD4\u56DE\u5F53\u524D ",paraId:64,tocIndex:17},{value:"Class",paraId:64,tocIndex:17},{value:"\u3002",paraId:64,tocIndex:17},{value:"\u9700\u8981\u6CE8\u610F\u7684\u662F\uFF0C\u5B50\u7C7B\u7EE7\u627F\u7236\u7C7B\u65F6\uFF0C",paraId:65,tocIndex:17},{value:"new.target",paraId:65,tocIndex:17},{value:" \u4F1A\u8FD4\u56DE\u5B50\u7C7B\u3002",paraId:65,tocIndex:17},{value:`class Parent {
  constructor() {
    console.log(new.target);
    console.log(new.target.name);
  }
}

// \u65E0\u7EE7\u627F
const parent = new Parent();
// [class Parent]
// Parent

// \u6709\u7EE7\u627F
class Child extends Parent {
  constructor() {
    super();
  }
}

const child = new Child();
// [class Child extends Parent]
// Child
`,paraId:66,tocIndex:17},{value:"1. \u9632\u6B62\u76F4\u63A5\u5B9E\u4F8B\u5316\u62BD\u8C61\u7C7B\uFF1A",paraId:67,tocIndex:18},{value:`class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('Shape \u662F\u62BD\u8C61\u7C7B\uFF0C\u4E0D\u80FD\u76F4\u63A5\u5B9E\u4F8B\u5316');
    }
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
}

// const shape = new Shape(); // \u62A5\u9519
const circle = new Circle(5); // \u6B63\u786E
`,paraId:68,tocIndex:18},{value:"2. \u5B9E\u73B0\u5355\u4F8B\u6A21\u5F0F\uFF1A",paraId:69,tocIndex:18},{value:`class Singleton {
  static instance = null;

  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    if (new.target !== Singleton) {
      throw new Error('\u4E0D\u80FD\u7EE7\u627F Singleton');
    }
    Singleton.instance = this;
  }
}

const s1 = new Singleton();
const s2 = new Singleton();
console.log(s1 === s2); // true
`,paraId:70,tocIndex:18},{value:"3. \u786E\u4FDD\u901A\u8FC7\u5B50\u7C7B\u5B9E\u4F8B\u5316\uFF1A",paraId:71,tocIndex:18},{value:`class BaseController {
  constructor() {
    if (new.target === BaseController) {
      throw new Error('BaseController \u5FC5\u987B\u901A\u8FC7\u5B50\u7C7B\u5B9E\u4F8B\u5316');
    }
  }
}

class UserController extends BaseController {
  constructor() {
    super();
  }
}

// const base = new BaseController(); // \u62A5\u9519
const user = new UserController(); // \u6B63\u786E
`,paraId:72,tocIndex:18},{value:"\u5728 JavaScript \u4E2D\uFF0C",paraId:73,tocIndex:19},{value:"\u4E00\u4E2A\u7C7B\u53EA\u80FD\u7EE7\u627F\u4E00\u4E2A\u7236\u7C7B",paraId:73,tocIndex:19},{value:"\uFF08\u5355\u7EE7\u627F\uFF09\u3002\u4F46\u5728\u5B9E\u9645\u5F00\u53D1\u4E2D\uFF0C\u6211\u4EEC\u53EF\u80FD\u9700\u8981\u4ECE\u591A\u4E2A\u7C7B\u4E2D\u6DF7\u5165\uFF08mixin\uFF09\u529F\u80FD\u3002",paraId:73,tocIndex:19},{value:"Mixin \u662F\u4E00\u4E2A\u5305\u542B\u53EF\u88AB\u5176\u4ED6\u7C7B\u4F7F\u7528\u800C\u65E0\u9700\u7EE7\u627F\u7684\u65B9\u6CD5\u7684\u7C7B\u3002\u6362\u53E5\u8BDD\u8BF4\uFF0Cmixin \u63D0\u4F9B\u4E86\u5B9E\u73B0\u7279\u5B9A\u884C\u4E3A\u7684\u65B9\u6CD5\uFF0C\u4F46\u6211\u4EEC\u4E0D\u5355\u72EC\u4F7F\u7528\u5B83\uFF0C\u800C\u662F\u7528\u5B83\u6765\u5C06\u8FD9\u4E9B\u884C\u4E3A\u6DFB\u52A0\u5230\u5176\u4ED6\u7C7B\u4E2D\u3002",paraId:74,tocIndex:19},{value:"\u5B9E\u73B0\u65B9\u5F0F\uFF1A",paraId:75,tocIndex:19},{value:`// \u5B9A\u4E49 mixin
let sayHiMixin = {
  sayHi() {
    console.log(\`Hello \${this.name}\`);
  },
  sayBye() {
    console.log(\`Bye \${this.name}\`);
  },
};

// \u4F7F\u7528 mixin
class User {
  constructor(name) {
    this.name = name;
  }
}

// \u62F7\u8D1D\u65B9\u6CD5
Object.assign(User.prototype, sayHiMixin);

new User('Dude').sayHi(); // Hello Dude
`,paraId:76,tocIndex:19},{value:"Mixin \u53EF\u4EE5\u7EE7\u627F\uFF1A",paraId:77,tocIndex:19},{value:`let sayMixin = {
  say(phrase) {
    console.log(phrase);
  },
};

let sayHiMixin = {
  __proto__: sayMixin, // \u6216\u4F7F\u7528 Object.setPrototypeOf \u6765\u8BBE\u7F6E\u539F\u578B

  sayHi() {
    // \u8C03\u7528\u7236\u7C7B\u65B9\u6CD5
    super.say(\`Hello \${this.name}\`);
  },
  sayBye() {
    super.say(\`Bye \${this.name}\`);
  },
};

class User {
  constructor(name) {
    this.name = name;
  }
}

Object.assign(User.prototype, sayHiMixin);

new User('Dude').sayHi(); // Hello Dude
`,paraId:78,tocIndex:19},{value:"\u4F7F\u7528\u51FD\u6570\u5B9E\u73B0 Mixin\uFF08\u66F4\u7075\u6D3B\uFF09\uFF1A",paraId:79,tocIndex:19},{value:`// \u8FD4\u56DE\u4E00\u4E2A\u5305\u542B mixin \u65B9\u6CD5\u7684\u5B50\u7C7B
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

// \u53EF\u4EE5\u7EC4\u5408\u591A\u4E2A mixin
class Employee extends NameMixin(TimestampMixin(Person)) {}

const emp = new Employee('\u5F20\u4E09');
emp.printName(); // \u5F20\u4E09
console.log(emp.getTimestamp()); // \u5F53\u524D\u65F6\u95F4
`,paraId:80,tocIndex:19},{value:"\u6CE8\u610F\u4E8B\u9879\uFF1A",paraId:81,tocIndex:19},{value:"Mixin \u53EF\u80FD\u4F1A\u610F\u5916\u8986\u76D6\u73B0\u6709\u7C7B\u7684\u65B9\u6CD5\uFF0C\u4F7F\u7528\u65F6\u9700\u8981\u5C0F\u5FC3\u547D\u540D\u51B2\u7A81",paraId:82,tocIndex:19},{value:"\u8FC7\u5EA6\u4F7F\u7528 Mixin \u4F1A\u4F7F\u4EE3\u7801\u96BE\u4EE5\u7406\u89E3\u548C\u7EF4\u62A4",paraId:82,tocIndex:19},{value:"\u4F18\u5148\u8003\u8651\u7EC4\u5408\uFF08composition\uFF09\u800C\u4E0D\u662F\u7EE7\u627F\u6216 mixin",paraId:82,tocIndex:19},{value:'"\u7EC4\u5408\u4F18\u4E8E\u7EE7\u627F"\uFF08Composition over Inheritance\uFF09\u662F\u9762\u5411\u5BF9\u8C61\u8BBE\u8BA1\u4E2D\u7684\u4E00\u4E2A\u91CD\u8981\u539F\u5219\u3002\u5B83\u5EFA\u8BAE',paraId:83,tocIndex:20},{value:"\u4F7F\u7528\u5BF9\u8C61\u7EC4\u5408\u800C\u4E0D\u662F\u7C7B\u7EE7\u627F\u6765\u5B9E\u73B0\u4EE3\u7801\u590D\u7528",paraId:83,tocIndex:20},{value:"\u3002",paraId:83,tocIndex:20},{value:"\u7D27\u8026\u5408",paraId:84,tocIndex:21},{value:"\uFF1A\u5B50\u7C7B\u4E0E\u7236\u7C7B\u7D27\u5BC6\u8026\u5408\uFF0C\u4FEE\u6539\u7236\u7C7B\u53EF\u80FD\u5F71\u54CD\u6240\u6709\u5B50\u7C7B",paraId:84,tocIndex:21},{value:"\u8106\u5F31\u7684\u57FA\u7C7B\u95EE\u9898",paraId:84,tocIndex:21},{value:"\uFF1A\u7236\u7C7B\u7684\u4FEE\u6539\u53EF\u80FD\u7834\u574F\u5B50\u7C7B\u7684\u529F\u80FD",paraId:84,tocIndex:21},{value:"\u4E0D\u7075\u6D3B",paraId:84,tocIndex:21},{value:"\uFF1A\u7EE7\u627F\u5C42\u6B21\u5728\u7F16\u8BD1\u65F6\u786E\u5B9A\uFF0C\u8FD0\u884C\u65F6\u65E0\u6CD5\u6539\u53D8",paraId:84,tocIndex:21},{value:"\u7329\u7329\u9999\u8549\u95EE\u9898",paraId:84,tocIndex:21},{value:'\uFF1A"\u4F60\u60F3\u8981\u4E00\u4E2A\u9999\u8549\uFF0C\u4F46\u4F60\u5F97\u5230\u7684\u662F\u4E00\u53EA\u62FF\u7740\u9999\u8549\u7684\u7329\u7329\u4EE5\u53CA\u6574\u4E2A\u4E1B\u6797"',paraId:84,tocIndex:21},{value:"\u677E\u8026\u5408",paraId:85,tocIndex:22},{value:"\uFF1A\u5BF9\u8C61\u4E4B\u95F4\u901A\u8FC7\u63A5\u53E3\u4EA4\u4E92\uFF0C\u4F9D\u8D56\u5173\u7CFB\u66F4\u6E05\u6670",paraId:85,tocIndex:22},{value:"\u7075\u6D3B\u6027",paraId:85,tocIndex:22},{value:"\uFF1A\u53EF\u4EE5\u5728\u8FD0\u884C\u65F6\u52A8\u6001\u7EC4\u5408\u5BF9\u8C61",paraId:85,tocIndex:22},{value:"\u66F4\u597D\u7684\u53EF\u7EF4\u62A4\u6027",paraId:85,tocIndex:22},{value:"\uFF1A\u4FEE\u6539\u4E00\u4E2A\u7EC4\u4EF6\u4E0D\u4F1A\u5F71\u54CD\u5176\u4ED6\u7EC4\u4EF6",paraId:85,tocIndex:22},{value:"\u4F7F\u7528\u7EE7\u627F\uFF08\u4E0D\u63A8\u8350\uFF09\uFF1A",paraId:86,tocIndex:23},{value:`// \u7EE7\u627F\u65B9\u5F0F
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

// \u95EE\u9898\uFF1A\u9E2D\u5B50\u65E2\u4F1A\u98DE\u53C8\u4F1A\u6E38\u6CF3\uFF0C\u8BE5\u7EE7\u627F\u54EA\u4E2A\uFF1F
// \u5982\u679C\u4F7F\u7528\u591A\u91CD\u7EE7\u627F\uFF0C\u4F1A\u53D8\u5F97\u590D\u6742
`,paraId:87,tocIndex:23},{value:"\u4F7F\u7528\u7EC4\u5408\uFF08\u63A8\u8350\uFF09\uFF1A",paraId:88,tocIndex:23},{value:`// \u5C06\u80FD\u529B\u5B9A\u4E49\u4E3A\u72EC\u7ACB\u7684\u5BF9\u8C61
const canEat = {
  eat() {
    console.log(\`\${this.name} is eating\`);
  },
};

const canFly = {
  fly() {
    console.log(\`\${this.name} is flying\`);
  },
};

const canSwim = {
  swim() {
    console.log(\`\${this.name} is swimming\`);
  },
};

// \u7EC4\u5408\u51FD\u6570
const compose = (target, ...sources) => {
  Object.assign(target, ...sources);
  return target;
};

// \u521B\u5EFA\u4E0D\u540C\u7684\u52A8\u7269
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

// \u901A\u8FC7\u7EC4\u5408\u8D4B\u4E88\u80FD\u529B
compose(Duck.prototype, canEat, canFly, canSwim);
compose(Fish.prototype, canEat, canSwim);

const duck = new Duck('\u5510\u8001\u9E2D');
duck.eat(); // \u5510\u8001\u9E2D is eating
duck.fly(); // \u5510\u8001\u9E2D is flying
duck.swim(); // \u5510\u8001\u9E2D is swimming

const fish = new Fish('\u5C3C\u83AB');
fish.eat(); // \u5C3C\u83AB is eating
fish.swim(); // \u5C3C\u83AB is swimming
// fish.fly(); // \u9519\u8BEF\uFF1Afish \u6CA1\u6709 fly \u65B9\u6CD5
`,paraId:89,tocIndex:23},{value:"\u4F7F\u7528\u5DE5\u5382\u51FD\u6570\u5B9E\u73B0\u7EC4\u5408\uFF1A",paraId:90,tocIndex:23},{value:`// \u80FD\u529B\u5B9A\u4E49
const canEat = (state) => ({
  eat() {
    console.log(\`\${state.name} is eating\`);
  },
});

const canFly = (state) => ({
  fly() {
    console.log(\`\${state.name} is flying\`);
  },
});

const canSwim = (state) => ({
  swim() {
    console.log(\`\${state.name} is swimming\`);
  },
});

// \u5DE5\u5382\u51FD\u6570
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

const duck = createDuck('\u5510\u8001\u9E2D');
const fish = createFish('\u5C3C\u83AB');

duck.fly(); // \u5510\u8001\u9E2D is flying
fish.swim(); // \u5C3C\u83AB is swimming
`,paraId:91,tocIndex:23},{value:"\u5C3D\u7BA1\u7EC4\u5408\u901A\u5E38\u66F4\u597D\uFF0C\u4F46\u5728\u4EE5\u4E0B\u60C5\u51B5\u7EE7\u627F\u4ECD\u7136\u6709\u610F\u4E49\uFF1A",paraId:92,tocIndex:24},{value:'\u771F\u6B63\u7684"is-a"\u5173\u7CFB',paraId:93,tocIndex:24},{value:'\uFF1ADog \u662F Animal\uFF08\u4E0D\u662F"has-a"\u6216"can-do"\uFF09',paraId:93,tocIndex:24},{value:"\u9700\u8981\u591A\u6001\u884C\u4E3A",paraId:93,tocIndex:24},{value:"\uFF1A\u5B50\u7C7B\u9700\u8981\u88AB\u5F53\u4F5C\u7236\u7C7B\u6765\u4F7F\u7528",paraId:93,tocIndex:24},{value:"\u6846\u67B6\u8981\u6C42",paraId:93,tocIndex:24},{value:"\uFF1A\u67D0\u4E9B\u6846\u67B6\uFF08\u5982 React \u65E9\u671F\uFF09\u8981\u6C42\u4F7F\u7528\u7EE7\u627F",paraId:93,tocIndex:24},{value:"\u4F18\u5148\u4F7F\u7528\u7EC4\u5408",paraId:94,tocIndex:25},{value:"\uFF1A\u9ED8\u8BA4\u9009\u62E9\u7EC4\u5408\uFF0C\u53EA\u5728\u5FC5\u8981\u65F6\u4F7F\u7528\u7EE7\u627F",paraId:94,tocIndex:25},{value:"\u4FDD\u6301\u7EE7\u627F\u5C42\u6B21\u6D45",paraId:94,tocIndex:25},{value:"\uFF1A\u7EE7\u627F\u5C42\u6B21\u4E0D\u8981\u8D85\u8FC7 2-3 \u5C42",paraId:94,tocIndex:25},{value:"\u4F7F\u7528\u63A5\u53E3/\u534F\u8BAE",paraId:94,tocIndex:25},{value:"\uFF1A\u5B9A\u4E49\u6E05\u6670\u7684\u63A5\u53E3\u800C\u4E0D\u662F\u5B9E\u73B0\u7EC6\u8282",paraId:94,tocIndex:25},{value:"\u8003\u8651\u4F7F\u7528\u51FD\u6570\u5F0F\u65B9\u6CD5",paraId:94,tocIndex:25},{value:"\uFF1A\u7EAF\u51FD\u6570\u548C\u4E0D\u53EF\u53D8\u6570\u636E\u7ED3\u6784\u53EF\u4EE5\u907F\u514D\u5F88\u591A OOP \u7684\u95EE\u9898",paraId:94,tocIndex:25},{value:"ES6 \u5141\u8BB8\u7EE7\u627F\u539F\u751F\u6784\u9020\u51FD\u6570\u5B9A\u4E49\u5B50\u7C7B\u3002",paraId:95,tocIndex:26},{value:"\u539F\u751F\u6784\u9020\u51FD\u6570\u662F\u6307\u8BED\u8A00\u5185\u7F6E\u7684\u6784\u9020\u51FD\u6570\uFF0C\u901A\u5E38\u7528\u6765\u751F\u6210\u6570\u636E\u7ED3\u6784\u3002ECMAScript \u7684\u539F\u751F\u6784\u9020\u51FD\u6570\u5927\u81F4\u6709\u4E0B\u9762\u8FD9\u4E9B\u3002",paraId:96,tocIndex:26},{value:"Boolean()",paraId:97,tocIndex:26},{value:"Number()",paraId:97,tocIndex:26},{value:"String()",paraId:97,tocIndex:26},{value:"Array()",paraId:97,tocIndex:26},{value:"Date()",paraId:97,tocIndex:26},{value:"Function()",paraId:97,tocIndex:26},{value:"RegExp()",paraId:97,tocIndex:26},{value:"Error()",paraId:97,tocIndex:26},{value:"Object()",paraId:97,tocIndex:26},{value:"\u5728 ES6 \u7684 ",paraId:98,tocIndex:27},{value:"class",paraId:98,tocIndex:27},{value:" \u51FA\u73B0\u4E4B\u524D\uFF0CJavaScript \u901A\u8FC7\u6784\u9020\u51FD\u6570\u548C\u539F\u578B\u94FE\u6765\u5B9E\u73B0\u7EE7\u627F\u3002\u4E86\u89E3 ES5 \u7684\u7EE7\u627F\u65B9\u5F0F\u6709\u52A9\u4E8E\uFF1A",paraId:98,tocIndex:27},{value:"\u7406\u89E3 ",paraId:99,tocIndex:27},{value:"class",paraId:99,tocIndex:27},{value:" \u8BED\u6CD5\u7684\u5E95\u5C42\u5B9E\u73B0",paraId:99,tocIndex:27},{value:"\u7EF4\u62A4\u65E7\u4EE3\u7801",paraId:99,tocIndex:27},{value:"\u6DF1\u5165\u7406\u89E3 JavaScript \u7684\u539F\u578B\u673A\u5236",paraId:99,tocIndex:27},{value:`// \u7B2C\u4E00\u7248
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

// \u7F3A\u70B91\uFF1A\u5F15\u7528\u7C7B\u578B\u5C5E\u6027\u5171\u4EAB
// \u7F3A\u70B92\uFF1ASub.prototype \u91CD\u5199\u4E22\u5931 constructor
`,paraId:100,tocIndex:28},{value:`// \u7B2C\u4E8C\u7248
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

// \u7F3A\u70B9\uFF1ASuper() \u8C03\u7528\u4E86\u4E24\u6B21
`,paraId:101,tocIndex:29},{value:`// \u7B2C\u4E09\u7248
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
// Sub.prototype = Object.create(Super.prototype) // \u91CD\u5199\u4E86 Sub.prototype === {}
// Sub.prototype.constructor = Sub
// \u4E0B\u9762\u76F8\u5F53\u4E8E\u4E0A\u9762\u4E24\u884C
Object.setPrototypeOf(Sub.prototype, Super.prototype); // \u8BBE\u7F6E\u539F\u578B\u94FE\u4F1A\u8986\u76D6\u9ED8\u8BA4\u7684\u539F\u578B\u94FE\u5173\u7CFB

Sub.prototype.getSubParam = function () {
  return this.sub_param;
};
var instance1 = new Sub();
var instance2 = new Sub();
instance1.super_param.push(4);

console.log(instance1.super_param); // [1, 2, 3, 4]
console.log(instance2.super_param); // [1, 2, 3]
console.log(Sub.prototype.constructor === Sub); // true
`,paraId:102,tocIndex:29}]}}]);
