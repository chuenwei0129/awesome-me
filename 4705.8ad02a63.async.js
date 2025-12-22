"use strict";(self.webpackChunk_c6i_playground=self.webpackChunk_c6i_playground||[]).push([[4705],{94705:function(t,n,a){a.r(n),a.d(n,{texts:function(){return e}});const e=[{value:"ES6 \u63D0\u51FA class \u5173\u952E\u5B57\u662F\u5E0C\u671B\u89E3\u51B3\u4EC0\u4E48\u95EE\u9898\uFF1F\u5B83\u662F\u4E0D\u662F\u9E21\u808B\uFF1F",paraId:0,tocIndex:0},{value:"\u5728 JavaScript \u4E2D\uFF0C",paraId:1,tocIndex:0},{value:"class",paraId:1,tocIndex:0},{value:" \u662F\u6784\u9020\u5BF9\u8C61\u548C\u63CF\u8FF0\u539F\u578B\u5173\u7CFB\u7684\u4E00\u79CD\u8BED\u6CD5\u5F62\u5F0F\u3002\u5E95\u5C42\u4ECD\u7136\u57FA\u4E8E\u539F\u578B\u94FE\uFF0C\u4F46 ",paraId:1,tocIndex:0},{value:"class",paraId:1,tocIndex:0},{value:" \u63D0\u4F9B\u4E86\u66F4\u63A5\u8FD1\u4F20\u7EDF\u9762\u5411\u5BF9\u8C61\u8BED\u8A00\u7684\u5199\u6CD5\u3002",paraId:1,tocIndex:0},{value:"typeof MyClass === 'function'",paraId:2,tocIndex:0},{value:"\uFF0C\u7C7B\u672C\u8D28\u4E0A\u4ECD\u662F\u51FD\u6570",paraId:2,tocIndex:0},{value:"\u7C7B\u58F0\u660E\u4F1A\u88AB\u63D0\u5347\uFF0C\u4F46\u5B58\u5728 ",paraId:2,tocIndex:0},{value:"\u6682\u65F6\u6027\u6B7B\u533A\uFF08TDZ\uFF09",paraId:2,tocIndex:0},{value:"\uFF1A\u5728\u58F0\u660E\u524D\u8BBF\u95EE\u4F1A\u62A5\u9519\uFF0C\u4E0D\u80FD\u50CF\u51FD\u6570\u58F0\u660E\u90A3\u6837\u201C\u5148\u7528\u540E\u58F0\u660E\u201D",paraId:2,tocIndex:0},{value:"\u7C7B\u4F53\u53CA\u5176\u4E2D\u7684\u65B9\u6CD5\u59CB\u7EC8\u5728\u4E25\u683C\u6A21\u5F0F\uFF08",paraId:2,tocIndex:0},{value:"use strict",paraId:2,tocIndex:0},{value:"\uFF09\u4E0B\u6267\u884C",paraId:2,tocIndex:0},{value:`class MyClass {
  // \u9759\u6001\u5C5E\u6027\uFF1A\u6302\u5728\u7C7B\u672C\u8EAB\u4E0A
  static staticParam = 'static value';

  // \u5B9E\u4F8B\u5C5E\u6027\uFF1A\u6BCF\u4E2A\u5B9E\u4F8B\u4E00\u4EFD
  instanceProp = 'default';

  constructor(prop) {
    // \u6784\u9020\u5668\uFF1A\u4F7F\u7528 new \u8C03\u7528\u65F6\u81EA\u52A8\u6267\u884C
    this.instanceProp = prop;
  }

  // \u539F\u578B\u65B9\u6CD5\uFF1A\u6240\u6709\u5B9E\u4F8B\u5171\u4EAB\u540C\u4E00\u4E2A\u51FD\u6570\u5BF9\u8C61
  method() {
    console.log('method this =', this);
  }

  // \u5B9E\u4F8B\u5B57\u6BB5\u4E0A\u7684\u7BAD\u5934\u51FD\u6570\uFF1Athis \u5728\u521B\u5EFA\u65F6\u56FA\u5B9A\u4E3A\u5F53\u524D\u5B9E\u4F8B
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
`,paraId:3,tocIndex:1},{value:`\u5B9E\u6218\u5EFA\u8BAE\uFF1A
\u4E00\u822C\u60C5\u51B5\u4E0B\u63A8\u8350\u4F7F\u7528\u666E\u901A\u539F\u578B\u65B9\u6CD5\uFF1B\u53EA\u6709\u5728`,paraId:4,tocIndex:1},{value:"\u9700\u8981\u786E\u4FDD\u4F5C\u4E3A\u56DE\u8C03\u4F7F\u7528\u65F6\u4E0D\u4E22\u5931 ",paraId:4,tocIndex:1},{value:"this",paraId:4,tocIndex:1},{value:"\uFF0C\u5E76\u4E14\u53EF\u4EE5\u63A5\u53D7",paraId:4,tocIndex:1},{value:"\u6BCF\u4E2A\u5B9E\u4F8B\u521B\u5EFA\u4E00\u4EFD\u51FD\u6570\u7684\u989D\u5916\u5F00\u9500",paraId:4,tocIndex:1},{value:"\uFF0C\u518D\u8003\u8651\u4F7F\u7528\u5B9E\u4F8B\u5B57\u6BB5\u4E0A\u7684\u7BAD\u5934\u51FD\u6570\u3002",paraId:4,tocIndex:1},{value:"constructor()",paraId:5},{value:"constructor()",paraId:6,tocIndex:3},{value:" \u662F\u7C7B\u7684\u6784\u9020\u51FD\u6570\uFF0C\u5728\u901A\u8FC7 ",paraId:6,tocIndex:3},{value:"new",paraId:6,tocIndex:3},{value:" \u751F\u6210\u5B9E\u4F8B\u65F6\u81EA\u52A8\u8C03\u7528\u3002",paraId:6,tocIndex:3},{value:"\u6BCF\u4E2A\u7C7B\u201C\u90FD\u6709\u201D\u6784\u9020\u5668\uFF1A",paraId:7,tocIndex:3},{value:"\u5982\u679C\u6CA1\u6709\u663E\u5F0F\u5B9A\u4E49\uFF0C",paraId:8,tocIndex:3},{value:"\u57FA\u7C7B",paraId:8,tocIndex:3},{value:"\u7684\u9ED8\u8BA4\u6784\u9020\u5668\u7B49\u4EF7\u4E8E\uFF1A",paraId:8,tocIndex:3},{value:`constructor() {}
`,paraId:9,tocIndex:3},{value:"\u5BF9\u4E8E\u7EE7\u627F\u81EA\u5176\u4ED6\u7C7B\u7684 ",paraId:10,tocIndex:3},{value:"\u5B50\u7C7B",paraId:10,tocIndex:3},{value:"\uFF0C\u9ED8\u8BA4\u6784\u9020\u5668\u7B49\u4EF7\u4E8E\uFF1A",paraId:10,tocIndex:3},{value:`constructor(...args) {
  super(...args);
}
`,paraId:11,tocIndex:3},{value:"\u56E0\u6B64\uFF1A",paraId:12,tocIndex:3},{value:"\u5B50\u7C7B\u663E\u5F0F\u5B9A\u4E49 ",paraId:13,tocIndex:3},{value:"constructor",paraId:13,tocIndex:3},{value:" \u65F6\uFF0C",paraId:13,tocIndex:3},{value:"\u5FC5\u987B\u5728\u4F7F\u7528 ",paraId:13,tocIndex:3},{value:"this",paraId:13,tocIndex:3},{value:" \u4E4B\u524D\u8C03\u7528 ",paraId:13,tocIndex:3},{value:"super(...)",paraId:13,tocIndex:3},{value:"\uFF1B",paraId:13,tocIndex:3},{value:"\u4E0D\u663E\u5F0F\u5B9A\u4E49\u65F6\uFF0CJS \u5F15\u64CE\u4F1A\u81EA\u52A8\u63D2\u5165\u4E00\u4E2A\u8C03\u7528 ",paraId:13,tocIndex:3},{value:"super",paraId:13,tocIndex:3},{value:" \u7684\u9ED8\u8BA4\u6784\u9020\u5668\u3002",paraId:13,tocIndex:3},{value:"constructor",paraId:14,tocIndex:4},{value:" \u9ED8\u8BA4\u8FD4\u56DE\u65B0\u521B\u5EFA\u7684\u5B9E\u4F8B\uFF08",paraId:14,tocIndex:4},{value:"this",paraId:14,tocIndex:4},{value:"\uFF09\uFF0C\u4F46\u4F60\u53EF\u4EE5\u663E\u5F0F\u8FD4\u56DE\u53E6\u4E00\u4E2A\u5BF9\u8C61\uFF1A",paraId:14,tocIndex:4},{value:`class Foo {
  constructor() {
    return Object.create(null);
  }
}

console.log(new Foo() instanceof Foo); // false
`,paraId:15,tocIndex:4},{value:"\u89C4\u5219\u662F\uFF1A",paraId:16,tocIndex:4},{value:"\u5982\u679C\u6784\u9020\u5668\u8FD4\u56DE\u7684\u662F ",paraId:17,tocIndex:4},{value:"\u5BF9\u8C61\u6216\u51FD\u6570",paraId:17,tocIndex:4},{value:"\uFF0C\u8BE5\u5BF9\u8C61\u5C06\u6210\u4E3A ",paraId:17,tocIndex:4},{value:"new Foo()",paraId:17,tocIndex:4},{value:" \u7684\u8FD4\u56DE\u503C",paraId:17,tocIndex:4},{value:"\u5982\u679C\u8FD4\u56DE\u7684\u662F ",paraId:17,tocIndex:4},{value:"\u539F\u59CB\u503C",paraId:17,tocIndex:4},{value:"\uFF08\u5B57\u7B26\u4E32\u3001\u6570\u5B57\u3001\u5E03\u5C14\u7B49\uFF09\uFF0C\u4F1A\u88AB\u5FFD\u7565\uFF0C\u4ECD\u7136\u8FD4\u56DE\u5B9E\u4F8B\uFF08",paraId:17,tocIndex:4},{value:"this",paraId:17,tocIndex:4},{value:"\uFF09",paraId:17,tocIndex:4},{value:"\u5B9E\u6218\u4E2D",paraId:18,tocIndex:4},{value:"\u51E0\u4E4E\u4E0D\u5EFA\u8BAE",paraId:18,tocIndex:4},{value:"\u968F\u610F\u5728\u6784\u9020\u5668\u4E2D\u8FD4\u56DE\u5176\u5B83\u5BF9\u8C61\uFF0C\u8FD9\u4F1A\u8BA9\u7C7B\u7684\u884C\u4E3A\u96BE\u4EE5\u9884\u6D4B\uFF0C\u4E00\u822C\u53EA\u5728\u6781\u5C11\u6570\u6A21\u5F0F\uFF08\u5982\u7279\u6B8A\u5DE5\u5382\u5C01\u88C5\uFF09\u4E2D\u4F7F\u7528\u3002",paraId:18,tocIndex:4},{value:"\u5B9E\u4F8B\u5C5E\u6027\u65E2\u53EF\u4EE5\u5728 ",paraId:19,tocIndex:5},{value:"constructor",paraId:19,tocIndex:5},{value:" \u4E2D\u901A\u8FC7 ",paraId:19,tocIndex:5},{value:"this.xxx",paraId:19,tocIndex:5},{value:" \u8D4B\u503C\uFF0C\u4E5F\u53EF\u4EE5\u4F7F\u7528\u7C7B\u5B57\u6BB5\u76F4\u63A5\u58F0\u660E\u5728\u7C7B\u4F53\u9876\u90E8\uFF1A",paraId:19,tocIndex:5},{value:`class User {
  // \u5B9E\u4F8B\u5B57\u6BB5\uFF08\u63A8\u8350\u65B9\u5F0F\u4E4B\u4E00\uFF09
  name = '\u533F\u540D';

  constructor(age) {
    // \u4F20\u7EDF\u5199\u6CD5
    this.age = age;
  }
}

const u = new User(18);
console.log(u.name); // \u533F\u540D
console.log(u.age); // 18
`,paraId:20,tocIndex:5},{value:"\u7C7B\u5B57\u6BB5\u7684\u4F18\u52BF\uFF1A",paraId:21,tocIndex:5},{value:"\u5B9A\u4E49\u4F4D\u7F6E\u66F4\u96C6\u4E2D\uFF0C\u53EF\u8BFB\u6027\u597D",paraId:22,tocIndex:5},{value:"\u66F4\u63A5\u8FD1\u5176\u4ED6\u8BED\u8A00\u4E2D\u7684\u201C\u5B57\u6BB5\u58F0\u660E\u201D",paraId:22,tocIndex:5},{value:"\u5728\u7C7B\u4E2D\u5B9A\u4E49\u7684\u65B9\u6CD5\uFF08\u975E\u7C7B\u5B57\u6BB5\u4E0A\u7684\u51FD\u6570\uFF09\u9ED8\u8BA4\u662F ",paraId:23,tocIndex:6},{value:"\u4E0D\u53EF\u679A\u4E3E\uFF08non-enumerable\uFF09",paraId:23,tocIndex:6},{value:" \u7684\uFF0C\u5E76\u4E14\u6302\u5728 ",paraId:23,tocIndex:6},{value:"Class.prototype",paraId:23,tocIndex:6},{value:" \u4E0A\u3002",paraId:23,tocIndex:6},{value:`class Point {
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
console.log(Object.getOwnPropertyNames(Point.prototype));
// ['constructor', 'toString']
`,paraId:24,tocIndex:6},{value:"\u539F\u578B\u94FE\u793A\u610F\uFF1A",paraId:25,tocIndex:6},{value:`p ---> Point.prototype ---> Object.prototype ---> null
`,paraId:26,tocIndex:6},{value:`class User {}
console.log(typeof User); // 'function'

// \u4E0D\u80FD\u5728\u6CA1\u6709 new \u7684\u60C5\u51B5\u4E0B\u8C03\u7528
// User(); // TypeError: Class constructor User cannot be invoked without 'new'
`,paraId:27,tocIndex:7},{value:"\u89C4\u8303\u5C42\u9762\uFF0C",paraId:28,tocIndex:7},{value:"class",paraId:28,tocIndex:7},{value:" \u58F0\u660E\u751F\u6210\u7684\u51FD\u6570\u4F1A\u5E26\u6709\u201C\u8FD9\u662F\u4E00\u4E2A\u7C7B\u6784\u9020\u51FD\u6570\u201D\u7684\u5185\u90E8\u6807\u8BB0\uFF08\u4F8B\u5982 ",paraId:28,tocIndex:7},{value:"[[IsClassConstructor]]: true",paraId:28,tocIndex:7},{value:"\uFF09\u3002\u56E0\u6B64\u5B83\u4E0E\u666E\u901A\u51FD\u6570\u6709\u82E5\u5E72\u5DEE\u5F02\uFF1A",paraId:28,tocIndex:7},{value:"\u4E0D\u80FD\u76F4\u63A5\u5F53\u4F5C\u666E\u901A\u51FD\u6570\u8C03\u7528\uFF08\u5FC5\u987B\u4F7F\u7528 ",paraId:29,tocIndex:7},{value:"new",paraId:29,tocIndex:7},{value:"\uFF09",paraId:29,tocIndex:7},{value:"\u7C7B\u4F53\u5185\u59CB\u7EC8\u662F\u4E25\u683C\u6A21\u5F0F",paraId:29,tocIndex:7},{value:"prototype",paraId:29,tocIndex:7},{value:" \u5C5E\u6027\u7684\u9ED8\u8BA4\u4E3A\u4E0D\u53EF\u679A\u4E3E\u7B49",paraId:29,tocIndex:7},{value:"\u7C7B\u4F53\u53CA\u5176\u4E2D\u7684\u65B9\u6CD5\uFF0C\u603B\u662F\u5728\u4E25\u683C\u6A21\u5F0F (",paraId:30,tocIndex:8},{value:"use strict",paraId:30,tocIndex:8},{value:") \u4E0B\u6267\u884C",paraId:30,tocIndex:8},{value:"\u7C7B\u58F0\u660E\u4F1A\u88AB\u63D0\u5347\uFF0C\u4F46\u5728\u58F0\u660E\u524D\u8BBF\u95EE\u4F1A\u843D\u5165 ",paraId:31,tocIndex:8},{value:"\u6682\u65F6\u6027\u6B7B\u533A\uFF08TDZ\uFF09",paraId:31,tocIndex:8},{value:"\uFF1A",paraId:31,tocIndex:8},{value:`const inst = new MyClass(); // ReferenceError: Cannot access 'MyClass' before initialization
class MyClass {}
`,paraId:32,tocIndex:8},{value:"\u5728\u5B9E\u8DF5\u4E2D\uFF0C\u53EF\u4EE5\u7B80\u5355\u8BB0\u4F4F\uFF1A",paraId:33,tocIndex:8},{value:"\u7C7B\u4E0D\u80FD\u5728\u58F0\u660E\u524D\u4F7F\u7528",paraId:33,tocIndex:8},{value:"\u3002",paraId:33,tocIndex:8},{value:"\u5BF9\u4E8E\u4E0D\u7EE7\u627F\u4EFB\u4F55\u7C7B\u7684\u57FA\u7C7B\uFF1A",paraId:34,tocIndex:9},{value:"\u521B\u5EFA\u5B9E\u4F8B\u5BF9\u8C61",paraId:35,tocIndex:9},{value:"\u6267\u884C\u5B9E\u4F8B\u5B57\u6BB5\u521D\u59CB\u5316",paraId:35,tocIndex:9},{value:"\u6267\u884C\u6784\u9020\u5668\u51FD\u6570\u4F53",paraId:35,tocIndex:9},{value:"\u5BF9\u4E8E\u7EE7\u627F\u81EA\u5176\u4ED6\u7C7B\u7684\u5B50\u7C7B\uFF1A",paraId:36,tocIndex:9},{value:"\u521B\u5EFA\u201C\u672A\u521D\u59CB\u5316\u201D\u7684 ",paraId:37,tocIndex:9},{value:"this",paraId:37,tocIndex:9},{value:"\u6267\u884C ",paraId:37,tocIndex:9},{value:"super(...)",paraId:37,tocIndex:9},{value:" \u8C03\u7528\u7236\u7C7B\u6784\u9020\u5668",paraId:37,tocIndex:9},{value:"\u6267\u884C\u5B50\u7C7B\u5B9E\u4F8B\u5B57\u6BB5\u521D\u59CB\u5316",paraId:37,tocIndex:9},{value:"\u6267\u884C\u5B50\u7C7B\u6784\u9020\u5668\u5269\u4F59\u4EE3\u7801",paraId:37,tocIndex:9},{value:"\u793A\u4F8B\uFF1A",paraId:38,tocIndex:9},{value:`class Parent {
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
`,paraId:39,tocIndex:9},{value:"\u7C7B\u53EF\u4EE5\u50CF\u51FD\u6570\u4E00\u6837\u5728\u8868\u8FBE\u5F0F\u4E2D\u5B9A\u4E49\u548C\u4F7F\u7528\u3002",paraId:40,tocIndex:10},{value:`// \u547D\u540D\u7C7B\u8868\u8FBE\u5F0F
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
`,paraId:41,tocIndex:10},{value:"\u8FD9\u7C7B\u7528\u6CD5\u5728\u5DE5\u5382\u51FD\u6570\u3001\u6D4B\u8BD5\u4EE3\u7801\u3001\u52A8\u6001\u751F\u6210\u6A21\u578B\u65F6\u5F88\u6709\u7528\u3002",paraId:42,tocIndex:10},{value:"\u9759\u6001\u6210\u5458\u5C5E\u4E8E ",paraId:43,tocIndex:11},{value:"\u7C7B\u672C\u8EAB",paraId:43,tocIndex:11},{value:"\uFF0C\u800C\u4E0D\u662F\u7C7B\u7684\u5B9E\u4F8B\u3002\u901A\u8FC7 ",paraId:43,tocIndex:11},{value:"static",paraId:43,tocIndex:11},{value:" \u5173\u952E\u5B57\u5B9A\u4E49\u3002",paraId:43,tocIndex:11},{value:`class User {
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
`,paraId:44,tocIndex:11},{value:`class Animal {
  static planet = 'Earth';

  static getPlanet() {
    return this.planet; // this \u6307\u5411\u8C03\u7528\u7684\u7C7B
  }
}

class Rabbit extends Animal {
  static planet = 'Mars'; // \u8986\u76D6\u7236\u7C7B\u9759\u6001\u5C5E\u6027
}

console.log(Animal.planet); // Earth
console.log(Rabbit.planet); // Mars

console.log(Animal.getPlanet()); // Earth
console.log(Rabbit.getPlanet()); // Mars\uFF08this \u6307\u5411 Rabbit\uFF09
`,paraId:45,tocIndex:12},{value:"\u5B9E\u6218\u4E2D\uFF0C\u9759\u6001\u6210\u5458\u5E38\u7528\u4E8E\uFF1A\u5DE5\u5382\u65B9\u6CD5\u3001\u7F13\u5B58\u3001\u679A\u4E3E\u3001\u5DE5\u5177\u65B9\u6CD5\u3001\u914D\u7F6E\u7B49\u3002",paraId:46,tocIndex:12},{value:"\u793A\u4F8B\uFF1A",paraId:47,tocIndex:12},{value:`class Article {
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
`,paraId:48,tocIndex:12},{value:"ES2022 \u5F15\u5165\u4E86\u771F\u6B63\u7684\u79C1\u6709\u5B57\u6BB5\uFF0C\u4F7F\u7528 ",paraId:49,tocIndex:13},{value:"#",paraId:49,tocIndex:13},{value:" \u524D\u7F00\u3002\u79C1\u6709\u6210\u5458\u53EA\u80FD\u5728\u7C7B\u7684\u5185\u90E8\u8BBF\u95EE\u3002",paraId:49,tocIndex:13},{value:`class BankAccount {
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
// console.log(account.#pin);     // SyntaxError
`,paraId:50,tocIndex:13},{value:`class Counter {
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
`,paraId:51,tocIndex:14},{value:"\u5FC5\u987B\u5728\u7C7B\u4F53\u9876\u5C42\u58F0\u660E\uFF0C\u4E0D\u80FD\u52A8\u6001\u521B\u5EFA\uFF08\u4E0D\u80FD\u901A\u8FC7 ",paraId:52,tocIndex:15},{value:"this['#field']",paraId:52,tocIndex:15},{value:" \u7B49\u65B9\u5F0F\u65B0\u589E\uFF09",paraId:52,tocIndex:15},{value:"\u4E0D\u80FD\u5728\u7C7B\u7684\u5916\u90E8\u8BBF\u95EE\uFF0C\u5373\u4F7F\u901A\u8FC7\u53CD\u5C04\u3001",paraId:52,tocIndex:15},{value:"Object.keys",paraId:52,tocIndex:15},{value:"\u3001",paraId:52,tocIndex:15},{value:"Object.getOwnPropertyNames",paraId:52,tocIndex:15},{value:" \u4E5F\u4E0D\u884C",paraId:52,tocIndex:15},{value:"\u5B50\u7C7B\u65E0\u6CD5\u8BBF\u95EE\u7236\u7C7B\u7684\u79C1\u6709\u5B57\u6BB5",paraId:52,tocIndex:15},{value:"\u79C1\u6709\u5B57\u6BB5\u540D\u4E0D\u4F1A\u4E0E\u516C\u5171\u5B57\u6BB5\u540D\u51B2\u7A81",paraId:52,tocIndex:15},{value:"\u4E0D\u80FD\u901A\u8FC7\u5B57\u7B26\u4E32\u6216 ",paraId:52,tocIndex:15},{value:"[]",paraId:52,tocIndex:15},{value:" \u52A8\u6001\u8BBF\u95EE\uFF08",paraId:52,tocIndex:15},{value:"this['#x']",paraId:52,tocIndex:15},{value:" \u8BBF\u95EE\u7684\u662F\u666E\u901A\u5C5E\u6027\uFF09",paraId:52,tocIndex:15},{value:"\u53EA\u80FD\u5728\u7C7B\u5185\u90E8\u4F7F\u7528\u7C7B\u4F3C ",paraId:52,tocIndex:15},{value:"#x in this",paraId:52,tocIndex:15},{value:" \u7684\u8BED\u6CD5\u68C0\u6D4B\uFF0C\u7C7B\u5916\u6CA1\u6CD5\u68C0\u6D4B\u79C1\u6709\u5B57\u6BB5",paraId:52,tocIndex:15},{value:`class MyClass {
  #x = 1;
  x = 2;

  getX() {
    return [this.#x, this.x];
  }
}

console.log(new MyClass().getX()); // [1, 2]
`,paraId:53,tocIndex:15},{value:"Getter \u548C Setter \u5141\u8BB8\u4F60\u5B9A\u4E49\u8BBF\u95EE\u5668\u5C5E\u6027\uFF1A",paraId:54,tocIndex:16},{value:"\u770B\u8D77\u6765\u50CF\u5C5E\u6027\u8BBF\u95EE\uFF0C\u5185\u90E8\u5374\u662F\u65B9\u6CD5\u8C03\u7528",paraId:54,tocIndex:16},{value:"\u3002",paraId:54,tocIndex:16},{value:`class User {
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
`,paraId:55,tocIndex:16},{value:`class Temperature {
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
`,paraId:56,tocIndex:17},{value:`class Circle {
  #radius;

  constructor(radius) {
    this.#radius = radius;
  }

  get radius() {
    return this.#radius;
  }

  // \u53EA\u6709 getter\uFF0C\u6CA1\u6709 setter\uFF0C\u6240\u4EE5\u662F\u53EA\u8BFB\u7684
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

// circle.area = 100; // \u4E25\u683C\u6A21\u5F0F\u4E0B\u4F1A\u62A5\u9519
`,paraId:57,tocIndex:18},{value:"\u6570\u636E\u9A8C\u8BC1",paraId:58,tocIndex:19},{value:"\uFF1A\u5728 setter \u4E2D\u9A8C\u8BC1\u8F93\u5165\u503C\u662F\u5426\u5408\u6CD5",paraId:58,tocIndex:19},{value:"\u8BA1\u7B97\u5C5E\u6027",paraId:58,tocIndex:19},{value:"\uFF1A\u901A\u8FC7 getter \u52A8\u6001\u8BA1\u7B97\u503C\uFF08\u5982 ",paraId:58,tocIndex:19},{value:"area",paraId:58,tocIndex:19},{value:"\u3001",paraId:58,tocIndex:19},{value:"fullName",paraId:58,tocIndex:19},{value:"\uFF09",paraId:58,tocIndex:19},{value:"\u5411\u540E\u517C\u5BB9",paraId:58,tocIndex:19},{value:`\uFF1A\u5C06\u539F\u6709\u7684\u6570\u636E\u5C5E\u6027\u6539\u6210 getter/setter\uFF0C\u5B9E\u73B0\u903B\u8F91\u8FC1\u79FB\u800C\u4E0D\u6539\u53D8\u8C03\u7528\u65B9\u5F0F
\uFF08\u4F46\u9700\u8981\u6CE8\u610F\u53EF\u679A\u4E3E\u6027\u7B49\u7EC6\u8282\u53D8\u5316\uFF0C\u4FEE\u6539\u524D\u540E\u4ECD\u9700\u6D4B\u8BD5\uFF09`,paraId:58,tocIndex:19},{value:"\u61D2\u52A0\u8F7D",paraId:58,tocIndex:19},{value:"\uFF1A\u5728\u7B2C\u4E00\u6B21\u8BBF\u95EE\u65F6\u624D\u8FDB\u884C\u6602\u8D35\u8BA1\u7B97\uFF0C\u5E76\u7F13\u5B58\u7ED3\u679C",paraId:58,tocIndex:19},{value:`class LazyProperty {
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
console.log(obj.expensiveValue); // \u76F4\u63A5\u8F93\u51FA\u7F13\u5B58\u7ED3\u679C
`,paraId:59,tocIndex:19},{value:"\u4F7F\u7528 ",paraId:60,tocIndex:21},{value:"extends",paraId:60,tocIndex:21},{value:" \u53EF\u4EE5\u5B9E\u73B0\u57FA\u4E8E\u7C7B\u7684\u7EE7\u627F\uFF1A",paraId:60,tocIndex:21},{value:`class Animal {
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
`,paraId:61,tocIndex:21},{value:"\u8981\u70B9\uFF1A",paraId:62,tocIndex:21},{value:"\u5B50\u7C7B\u6784\u9020\u5668\u4E2D\u5FC5\u987B\u5728\u4F7F\u7528 ",paraId:62,tocIndex:21},{value:"this",paraId:62,tocIndex:21},{value:" \u4E4B\u524D\u8C03\u7528 ",paraId:62,tocIndex:21},{value:"super(...)",paraId:62,tocIndex:21},{value:"\uFF0C\u5426\u5219\u4F1A\u62A5\u9519\u3002",paraId:62,tocIndex:21},{value:`
\u5982\u679C\u5B50\u7C7B\u4E0D\u5199 `,paraId:62,tocIndex:21},{value:"constructor",paraId:62,tocIndex:21},{value:"\uFF0C\u5F15\u64CE\u4F1A\u81EA\u52A8\u6DFB\u52A0\u4E00\u4E2A ",paraId:62,tocIndex:21},{value:"constructor(...args) { super(...args); }",paraId:62,tocIndex:21},{value:"\u3002",paraId:62,tocIndex:21},{value:"\u5F53\u901A\u8FC7 ",paraId:63,tocIndex:22},{value:"new",paraId:63,tocIndex:22},{value:" \u6267\u884C\u4E00\u4E2A\u666E\u901A\u51FD\u6570\u65F6\uFF1A",paraId:63,tocIndex:22},{value:"\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684\u7A7A\u5BF9\u8C61",paraId:64,tocIndex:22},{value:"\u5C06\u8BE5\u5BF9\u8C61\u7684\u539F\u578B\u6307\u5411\u51FD\u6570\u7684 ",paraId:64,tocIndex:22},{value:"prototype",paraId:64,tocIndex:22},{value:"\u5C06\u51FD\u6570\u4F53\u4E2D\u7684 ",paraId:64,tocIndex:22},{value:"this",paraId:64,tocIndex:22},{value:" \u7ED1\u5B9A\u5230\u8FD9\u4E2A\u5BF9\u8C61",paraId:64,tocIndex:22},{value:"\u9ED8\u8BA4\u8FD4\u56DE\u8FD9\u4E2A\u5BF9\u8C61\uFF08\u9664\u975E\u663E\u5F0F\u8FD4\u56DE\u5BF9\u8C61\uFF09",paraId:64,tocIndex:22},{value:"\u800C\u5BF9\u4E8E ",paraId:65,tocIndex:22},{value:"\u6D3E\u751F\u7C7B\uFF08\u6709 ",paraId:65,tocIndex:22},{value:"extends",paraId:65,tocIndex:22},{value:"\uFF09\u7684\u6784\u9020\u5668",paraId:65,tocIndex:22},{value:"\uFF1A",paraId:65,tocIndex:22},{value:"\u5728\u6267\u884C\u5B50\u7C7B\u6784\u9020\u5668\u4F53\u4E4B\u524D\uFF0C",paraId:66,tocIndex:22},{value:"\u4E0D\u4F1A\u81EA\u52A8\u521B\u5EFA ",paraId:66,tocIndex:22},{value:"this",paraId:66,tocIndex:22},{value:"\uFF1B",paraId:66,tocIndex:22},{value:"\u5FC5\u987B\u5728\u6784\u9020\u5668\u4E2D\u8C03\u7528 ",paraId:66,tocIndex:22},{value:"super(...)",paraId:66,tocIndex:22},{value:"\uFF0C\u7531\u7236\u7C7B\u6784\u9020\u5668\u5B8C\u6210 ",paraId:66,tocIndex:22},{value:"this",paraId:66,tocIndex:22},{value:" \u7684\u521B\u5EFA\u4E0E\u521D\u59CB\u5316\uFF1B",paraId:66,tocIndex:22},{value:"\u5982\u679C\u4E0D\u8C03\u7528 ",paraId:66,tocIndex:22},{value:"super",paraId:66,tocIndex:22},{value:" \u5C31\u8BBF\u95EE ",paraId:66,tocIndex:22},{value:"this",paraId:66,tocIndex:22},{value:"\uFF0C\u4F1A\u629B\u51FA ",paraId:66,tocIndex:22},{value:"ReferenceError",paraId:66,tocIndex:22},{value:"\u3002",paraId:66,tocIndex:22},{value:"\u8FD9\u5C31\u662F\u201C\u5B50\u7C7B\u7684 ",paraId:67,tocIndex:22},{value:"constructor",paraId:67,tocIndex:22},{value:" \u5FC5\u987B\u8C03\u7528 ",paraId:67,tocIndex:22},{value:"super",paraId:67,tocIndex:22},{value:"\u201D\u80CC\u540E\u7684\u6839\u672C\u539F\u56E0\u3002",paraId:67,tocIndex:22},{value:"extends",paraId:5},{value:"extends",paraId:68,tocIndex:23},{value:" \u540E\u53EF\u4EE5\u8DDF\u4EFB\u610F\u8868\u8FBE\u5F0F\uFF0C\u53EA\u8981\u6700\u7EC8\u7ED3\u679C\u662F\u4E00\u4E2A\u53EF\u6784\u9020\u7684\u51FD\u6570\uFF08\u5177\u6709 ",paraId:68,tocIndex:23},{value:"[[Construct]]",paraId:68,tocIndex:23},{value:" \u548C ",paraId:68,tocIndex:23},{value:"prototype",paraId:68,tocIndex:23},{value:"\uFF09\uFF1A",paraId:68,tocIndex:23},{value:`// \u4F7F\u7528\u51FD\u6570\u8FD4\u56DE\u7684\u7C7B\u4F5C\u4E3A\u7236\u7C7B
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
`,paraId:69,tocIndex:23},{value:"\u6CE8\u610F\uFF1A\u5982\u679C\u8868\u8FBE\u5F0F\u7684\u7ED3\u679C\u4E0D\u662F\u6784\u9020\u51FD\u6570\uFF08\u6BD4\u5982\u662F\u666E\u901A\u5BF9\u8C61\uFF09\uFF0C\u7C7B\u5B9A\u4E49\u9636\u6BB5\u5C31\u4F1A\u629B\u51FA ",paraId:70,tocIndex:23},{value:"TypeError",paraId:70,tocIndex:23},{value:"\u3002",paraId:70,tocIndex:23},{value:"super",paraId:5},{value:"super",paraId:71,tocIndex:24},{value:" \u65E2\u53EF\u4EE5\u5F53\u4F5C\u51FD\u6570\u4F7F\u7528\uFF0C\u4E5F\u53EF\u4EE5\u5F53\u4F5C\u5BF9\u8C61\u4F7F\u7528\uFF0C\u4E0D\u540C\u7528\u6CD5\u8BED\u4E49\u4E0D\u540C\u3002",paraId:71,tocIndex:24},{value:"super(\u2026)",paraId:5},{value:"\u8868\u793A\u8C03\u7528\u7236\u7C7B\u7684\u6784\u9020\u51FD\u6570\u3002",paraId:72,tocIndex:25},{value:"\u53EA\u80FD\u5728\u5B50\u7C7B\u6784\u9020\u5668\u4E2D\u4F7F\u7528",paraId:72,tocIndex:25},{value:"\uFF1A",paraId:72,tocIndex:25},{value:`class Parent {
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
`,paraId:73,tocIndex:25},{value:"\u867D\u7136 ",paraId:74,tocIndex:25},{value:"super",paraId:74,tocIndex:25},{value:" \u8868\u793A\u7684\u662F\u7236\u7C7B\u6784\u9020\u51FD\u6570\uFF0C\u4F46\u8FD4\u56DE\u7684\u4ECD\u7136\u662F\u201C\u5F53\u524D\u5B50\u7C7B\u7684\u5B9E\u4F8B\u201D\uFF1A\u53EF\u4EE5\u7406\u89E3\u4E3A ",paraId:74,tocIndex:25},{value:"Parent.call(this, ...)",paraId:74,tocIndex:25},{value:" \u7684\u8BED\u6CD5\u7CD6\u3002",paraId:74,tocIndex:25},{value:"\u9650\u5236\uFF1A",paraId:75,tocIndex:25},{value:"super()",paraId:75,tocIndex:25},{value:" \u53EA\u80FD\u5728 ",paraId:75,tocIndex:25},{value:"\u6D3E\u751F\u7C7B\u7684\u6784\u9020\u5668",paraId:75,tocIndex:25},{value:" \u4E2D\u8C03\u7528\uFF0C\u7528\u5728\u5176\u4ED6\u5730\u65B9\u4F1A\u62A5\u9519\u3002",paraId:75,tocIndex:25},{value:`class Child extends Parent {
  sayHi() {
    super(); // SyntaxError: 'super' keyword unexpected here
  }
}
`,paraId:76,tocIndex:25},{value:"super",paraId:5},{value:"\u5728 ",paraId:77,tocIndex:26},{value:"\u5B9E\u4F8B\u65B9\u6CD5",paraId:77,tocIndex:26},{value:" \u4E2D\uFF1A",paraId:77,tocIndex:26},{value:"super",paraId:77,tocIndex:26},{value:" \u6307\u5411\u7236\u7C7B\u7684\u539F\u578B\u5BF9\u8C61\uFF0C\u5373 ",paraId:77,tocIndex:26},{value:"Parent.prototype",paraId:77,tocIndex:26},{value:"\u5728 ",paraId:77,tocIndex:26},{value:"\u9759\u6001\u65B9\u6CD5",paraId:77,tocIndex:26},{value:" \u4E2D\uFF1A",paraId:77,tocIndex:26},{value:"super",paraId:77,tocIndex:26},{value:" \u6307\u5411\u7236\u7C7B\u6784\u9020\u51FD\u6570\u672C\u8EAB\uFF0C\u5373 ",paraId:77,tocIndex:26},{value:"Parent",paraId:77,tocIndex:26},{value:"\u5728\u666E\u901A\u65B9\u6CD5\u4E2D\u4F7F\u7528\uFF1A",paraId:78,tocIndex:26},{value:`class Parent {
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
`,paraId:79,tocIndex:26},{value:"\u5728\u9759\u6001\u65B9\u6CD5\u4E2D\u4F7F\u7528\uFF1A",paraId:80,tocIndex:26},{value:`class Parent {
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
`,paraId:81,tocIndex:26},{value:"super",paraId:5},{value:"this",paraId:5},{value:"\u5728\u5B50\u7C7B\u7684\u666E\u901A\u65B9\u6CD5\u4E2D\uFF0C\u901A\u8FC7 ",paraId:82,tocIndex:27},{value:"super",paraId:82,tocIndex:27},{value:" \u8C03\u7528\u7236\u7C7B\u65B9\u6CD5\u65F6\uFF0C",paraId:82,tocIndex:27},{value:"\u65B9\u6CD5\u5185\u90E8\u7684 ",paraId:82,tocIndex:27},{value:"this",paraId:82,tocIndex:27},{value:" \u4ECD\u7136\u662F\u5B50\u7C7B\u5B9E\u4F8B",paraId:82,tocIndex:27},{value:"\uFF1A",paraId:82,tocIndex:27},{value:`class Parent {
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
    super.print(); // \u8C03\u7528\u7236\u7C7B print\uFF0C\u4F46 this \u6307\u5411\u5B50\u7C7B\u5B9E\u4F8B
  }
}

const child = new Child();
child.m(); // 2
`,paraId:83,tocIndex:27},{value:"\u5728\u5B50\u7C7B\u9759\u6001\u65B9\u6CD5\u4E2D\uFF0C\u901A\u8FC7 ",paraId:84,tocIndex:27},{value:"super",paraId:84,tocIndex:27},{value:" \u8C03\u7528\u7236\u7C7B\u9759\u6001\u65B9\u6CD5\u65F6\uFF0C",paraId:84,tocIndex:27},{value:"\u65B9\u6CD5\u5185\u90E8\u7684 ",paraId:84,tocIndex:27},{value:"this",paraId:84,tocIndex:27},{value:" \u6307\u5411\u5F53\u524D\u5B50\u7C7B\u6784\u9020\u51FD\u6570",paraId:84,tocIndex:27},{value:"\uFF1A",paraId:84,tocIndex:27},{value:`class Parent {
  static myMethod(msg) {
    console.log('static', msg, 'this.name =', this.name);
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

Child.myMethod('hello'); // static hello this.name = Child

const child = new Child();
child.myMethod('world'); // instance world
`,paraId:85,tocIndex:27},{value:"\u63D0\u793A\uFF1A\u5982\u679C\u5728\u7C7B\u5B57\u6BB5\u91CC\u7528\u7BAD\u5934\u51FD\u6570\u5E76\u5728\u5176\u4E2D\u4F7F\u7528 ",paraId:86,tocIndex:27},{value:"super",paraId:86,tocIndex:27},{value:"\uFF0C",paraId:86,tocIndex:27},{value:"super",paraId:86,tocIndex:27},{value:" \u4F1A\u4ECE\u5916\u5C42\u65B9\u6CD5\u7684\u8BCD\u6CD5\u73AF\u5883\u4E2D\u6355\u83B7\uFF0C\u8BED\u4E49\u4F1A\u66F4\u5FAE\u5999\uFF0C\u4E00\u822C\u907F\u514D\u5728\u8FD9\u79CD\u573A\u666F\u4E2D\u6DF7\u7528\u3002",paraId:86,tocIndex:27},{value:"new.target",paraId:5},{value:"new.target",paraId:87,tocIndex:28},{value:" \u662F ES6 \u4E3A ",paraId:87,tocIndex:28},{value:"new",paraId:87,tocIndex:28},{value:" \u547D\u4EE4\u5F15\u5165\u7684\u4E00\u4E2A\u5143\u5C5E\u6027\uFF08meta-property\uFF09\u3002",paraId:87,tocIndex:28},{value:"\u5728\u6784\u9020\u51FD\u6570\u6216\u7C7B\u6784\u9020\u5668\u4E2D\u4F7F\u7528\uFF0C\u8868\u793A ",paraId:88,tocIndex:29},{value:"\u5F53\u524D\u662F\u901A\u8FC7\u54EA\u4E2A\u6784\u9020\u5668\u6765\u8C03\u7528 ",paraId:88,tocIndex:29},{value:"new",paraId:88,tocIndex:29},{value:" \u7684",paraId:88,tocIndex:29},{value:"\u3002\u5982\u679C\u4E0D\u662F\u901A\u8FC7 ",paraId:88,tocIndex:29},{value:"new",paraId:88,tocIndex:29},{value:"\uFF08\u6216 ",paraId:88,tocIndex:29},{value:"Reflect.construct",paraId:88,tocIndex:29},{value:"\uFF09\u8C03\u7528\uFF0C",paraId:88,tocIndex:29},{value:"new.target",paraId:88,tocIndex:29},{value:" \u4E3A ",paraId:88,tocIndex:29},{value:"undefined",paraId:88,tocIndex:29},{value:"\u3002",paraId:88,tocIndex:29},{value:`function Person(name) {
  if (!new.target) {
    throw new Error('\u5FC5\u987B\u4F7F\u7528 new \u547D\u4EE4\u751F\u6210\u5B9E\u4F8B');
  }
  this.name = name;
}

const person = new Person('\u5F20\u4E09'); // \u6B63\u786E
// const person2 = Person('\u674E\u56DB'); // \u62A5\u9519
`,paraId:89,tocIndex:29},{value:"\u5728\u7C7B\u6784\u9020\u5668\u4E2D\uFF0C",paraId:90,tocIndex:30},{value:"new.target",paraId:90,tocIndex:30},{value:" \u6307\u5411\u5F53\u524D\u88AB ",paraId:90,tocIndex:30},{value:"new",paraId:90,tocIndex:30},{value:" \u7684\u6784\u9020\u51FD\u6570\u3002",paraId:90,tocIndex:30},{value:"\u65E0\u7EE7\u627F\uFF1A",paraId:91,tocIndex:30},{value:`class Parent {
  constructor() {
    console.log(new.target);
    console.log(new.target.name);
  }
}

const parent = new Parent();
// [class Parent]
// Parent
`,paraId:92,tocIndex:30},{value:"\u6709\u7EE7\u627F\u65F6\uFF0C",paraId:93,tocIndex:30},{value:"new.target",paraId:93,tocIndex:30},{value:" \u6307\u5411\u5B50\u7C7B\uFF1A",paraId:93,tocIndex:30},{value:`class Parent {
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
`,paraId:94,tocIndex:30},{value:"\u9632\u6B62\u76F4\u63A5\u5B9E\u4F8B\u5316\u62BD\u8C61\u7C7B",paraId:95,tocIndex:31},{value:`class Shape {
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
`,paraId:96,tocIndex:31},{value:"\u5B9E\u73B0\u5355\u4F8B\u6A21\u5F0F",paraId:97,tocIndex:31},{value:`class Singleton {
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
`,paraId:98,tocIndex:31},{value:"\u786E\u4FDD\u901A\u8FC7\u5B50\u7C7B\u5B9E\u4F8B\u5316",paraId:99,tocIndex:31},{value:`class BaseController {
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
`,paraId:100,tocIndex:31},{value:"\u8865\u5145\uFF1A",paraId:101,tocIndex:31},{value:"new.target",paraId:101,tocIndex:31},{value:" \u662F\u8BCD\u6CD5\u7ED1\u5B9A\u7684\uFF0C\u7BAD\u5934\u51FD\u6570\u5185\u90E8\u8BBF\u95EE\u5230\u7684 ",paraId:101,tocIndex:31},{value:"new.target",paraId:101,tocIndex:31},{value:" \u6765\u81EA\u5176\u5916\u5C42\u51FD\u6570\u6216\u6784\u9020\u5668\u3002",paraId:101,tocIndex:31},{value:"JavaScript \u4E2D\u7C7B\u53EA\u80FD\u5355\u7EE7\u627F\uFF08",paraId:102,tocIndex:32},{value:"extends",paraId:102,tocIndex:32},{value:" \u53EA\u80FD\u63A5\u4E00\u4E2A\u7236\u7C7B\uFF09\uFF0C\u4F46\u5B9E\u9645\u5F00\u53D1\u4E2D\u5E38\u5E38\u5E0C\u671B\u4ECE\u591A\u4E2A\u6765\u6E90\u201C\u6DF7\u5165\u201D\u529F\u80FD\u3002",paraId:102,tocIndex:32},{value:"Mixin",paraId:103,tocIndex:32},{value:" \u662F\u4E00\u79CD\u590D\u7528\u65B9\u5F0F\uFF1A\u5C06\u53EF\u4EE5\u88AB\u591A\u4E2A\u7C7B\u5171\u4EAB\u7684\u65B9\u6CD5\u6536\u96C6\u5230\u4E00\u4E2A\u5BF9\u8C61\u6216\u51FD\u6570\u4E2D\uFF0C\u7136\u540E\u201C\u6DF7\u5165\u201D\u5230\u76EE\u6807\u7C7B\u4E2D\uFF0C\u800C\u4E0D\u662F\u901A\u8FC7\u7EE7\u627F\u6574\u4E2A\u7236\u7C7B\u5C42\u6B21\u3002",paraId:103,tocIndex:32},{value:`// \u5B9A\u4E49 mixin
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
`,paraId:104,tocIndex:33},{value:"Mixin \u4E5F\u53EF\u4EE5\u6709\u81EA\u5DF1\u7684\u201C\u7EE7\u627F\u201D\u5173\u7CFB\uFF1A",paraId:105,tocIndex:33},{value:`let sayMixin = {
  say(phrase) {
    console.log(phrase);
  },
};

let sayHiMixin = {
  __proto__: sayMixin, // \u6216\u4F7F\u7528 Object.setPrototypeOf

  sayHi() {
    // \u8C03\u7528\u201C\u7236 mixin\u201D\u7684\u65B9\u6CD5
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
`,paraId:106,tocIndex:33},{value:`// \u8FD4\u56DE\u4E00\u4E2A\u5305\u542B mixin \u65B9\u6CD5\u7684\u5B50\u7C7B
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
`,paraId:107,tocIndex:34},{value:"\u65B9\u6CD5\u540D\u5BB9\u6613\u4EA7\u751F\u51B2\u7A81\uFF0C\u9700\u8981\u5C0F\u5FC3\u547D\u540D\u548C\u6587\u6863\u7EA6\u5B9A",paraId:108,tocIndex:35},{value:"\u8FC7\u5EA6\u4F7F\u7528 mixin \u4F1A\u589E\u52A0\u4EE3\u7801\u7684\u7406\u89E3\u6210\u672C\u548C\u8C03\u8BD5\u96BE\u5EA6",paraId:108,tocIndex:35},{value:"\u4F18\u5148\u8003\u8651 ",paraId:108,tocIndex:35},{value:"\u7EC4\u5408\uFF08composition\uFF09",paraId:108,tocIndex:35},{value:" \u548C\u666E\u901A\u5BF9\u8C61\u51FD\u6570\uFF0C\u800C\u4E0D\u662F\u590D\u6742\u7684 mixin \u94FE",paraId:108,tocIndex:35},{value:"\u201C\u7EC4\u5408\u4F18\u4E8E\u7EE7\u627F\u201D\uFF08Composition over Inheritance\uFF09\u662F\u9762\u5411\u5BF9\u8C61\u8BBE\u8BA1\u7684\u91CD\u8981\u539F\u5219\uFF1A",paraId:109,tocIndex:36},{value:"\u4F18\u5148\u4F7F\u7528\u5BF9\u8C61\u7EC4\u5408\uFF0C\u800C\u4E0D\u662F\u7C7B\u7EE7\u627F\u6765\u590D\u7528\u4EE3\u7801",paraId:109,tocIndex:36},{value:"\u3002",paraId:109,tocIndex:36},{value:"\u7D27\u8026\u5408",paraId:110,tocIndex:37},{value:"\uFF1A\u5B50\u7C7B\u5F3A\u4F9D\u8D56\u7236\u7C7B\u5B9E\u73B0\uFF0C\u7236\u7C7B\u7684\u4FEE\u6539\u53EF\u80FD\u5F71\u54CD\u6240\u6709\u5B50\u7C7B",paraId:110,tocIndex:37},{value:"\u8106\u5F31\u7684\u57FA\u7C7B",paraId:110,tocIndex:37},{value:"\uFF1A\u57FA\u7C7B\u8F7B\u5FAE\u6539\u52A8\u53EF\u80FD\u7834\u574F\u6574\u4E2A\u7EE7\u627F\u5C42\u6B21",paraId:110,tocIndex:37},{value:"\u4E0D\u7075\u6D3B",paraId:110,tocIndex:37},{value:"\uFF1A\u7EE7\u627F\u5173\u7CFB\u5728\u5B9A\u4E49\u65F6\u786E\u5B9A\uFF0C\u8FD0\u884C\u65F6\u96BE\u4EE5\u6539\u53D8",paraId:110,tocIndex:37},{value:"\u7329\u7329\u9999\u8549\u95EE\u9898",paraId:110,tocIndex:37},{value:"\uFF1A\u4F60\u60F3\u8981\u4E00\u4E2A\u9999\u8549\uFF0C\u7ED3\u679C\u62FF\u5230\u7684\u662F\u4E00\u53EA\u62FF\u7740\u9999\u8549\u7684\u7329\u7329\u548C\u6574\u4E2A\u4E1B\u6797\uFF08\u4F9D\u8D56\u8FC7\u591A\uFF09",paraId:110,tocIndex:37},{value:"\u677E\u8026\u5408",paraId:111,tocIndex:38},{value:"\uFF1A\u5BF9\u8C61\u4E4B\u95F4\u901A\u8FC7\u63A5\u53E3/\u65B9\u6CD5\u4EA4\u4E92\uFF0C\u66F4\u6613\u66FF\u6362\u5B9E\u73B0",paraId:111,tocIndex:38},{value:"\u7075\u6D3B",paraId:111,tocIndex:38},{value:"\uFF1A\u53EF\u4EE5\u5728\u8FD0\u884C\u65F6\u52A8\u6001\u7EC4\u5408\u80FD\u529B",paraId:111,tocIndex:38},{value:"\u6613\u7EF4\u62A4",paraId:111,tocIndex:38},{value:"\uFF1A\u4FEE\u6539\u67D0\u4E2A\u80FD\u529B\u6A21\u5757\u65F6\u5F71\u54CD\u8303\u56F4\u66F4\u53EF\u63A7",paraId:111,tocIndex:38},{value:"\u4F7F\u7528\u7EE7\u627F\uFF08\u95EE\u9898\u793A\u4F8B\uFF09\uFF1A",paraId:112,tocIndex:39},{value:`class Animal {
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

// \u95EE\u9898\uFF1A\u9E2D\u5B50\u65E2\u4F1A\u98DE\u53C8\u4F1A\u6E38\uFF0C\u8BE5\u7EE7\u627F\u54EA\u4E2A\uFF1F
// \u591A\u91CD\u7EE7\u627F\u4F1A\u53D8\u5F97\u590D\u6742\u4E14 JS \u7C7B\u672C\u8EAB\u4E0D\u652F\u6301
`,paraId:113,tocIndex:39},{value:"\u4F7F\u7528\u7EC4\u5408\uFF08\u63A8\u8350\uFF09\uFF1A",paraId:114,tocIndex:39},{value:`// \u5C06\u80FD\u529B\u5B9A\u4E49\u4E3A\u72EC\u7ACB\u5BF9\u8C61
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

// \u521B\u5EFA\u4E0D\u540C\u52A8\u7269
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
`,paraId:115,tocIndex:39},{value:"\u4F7F\u7528\u5DE5\u5382\u51FD\u6570\u5B9E\u73B0\u7EC4\u5408\uFF1A",paraId:116,tocIndex:39},{value:`// \u80FD\u529B\u5B9A\u4E49
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
`,paraId:117,tocIndex:39},{value:"\u5C3D\u7BA1\u7EC4\u5408\u901A\u5E38\u66F4\u7075\u6D3B\uFF0C\u4F46\u5728\u4EE5\u4E0B\u60C5\u51B5\u7EE7\u627F\u4ECD\u7136\u9002\u7528\uFF1A",paraId:118,tocIndex:40},{value:"\u5B58\u5728\u7A33\u5B9A\u7684 \u201Cis-a\u201D \u5173\u7CFB\uFF1A\u5982 ",paraId:119,tocIndex:40},{value:"Dog",paraId:119,tocIndex:40},{value:" \u662F ",paraId:119,tocIndex:40},{value:"Animal",paraId:119,tocIndex:40},{value:"\u9700\u8981\u591A\u6001\u884C\u4E3A\uFF1A\u5B50\u7C7B\u5B9E\u4F8B\u9700\u8981\u88AB\u5F53\u4F5C\u7236\u7C7B\u5728\u7CFB\u7EDF\u4E2D\u4F20\u9012",paraId:119,tocIndex:40},{value:"\u6846\u67B6\u8981\u6C42\uFF1A\u90E8\u5206\u6846\u67B6/\u5E93\u8BBE\u8BA1\u4E3A\u901A\u8FC7\u7EE7\u627F\u6269\u5C55\uFF08\u73B0\u4EE3\u524D\u7AEF\u5DF2\u8F83\u5C11\uFF09",paraId:119,tocIndex:40},{value:"\u6700\u4F73\u5B9E\u8DF5\uFF1A",paraId:120,tocIndex:40},{value:"\u9ED8\u8BA4\u4F18\u5148\u8003\u8651\u7EC4\u5408",paraId:120,tocIndex:40},{value:"\uFF0C\u5728\u786E\u5B9E\u9700\u8981\u5229\u7528\u7EE7\u627F\u7684\u8BED\u4E49\u548C\u80FD\u529B\u65F6\u518D\u5F15\u5165 ",paraId:120,tocIndex:40},{value:"extends",paraId:120,tocIndex:40},{value:"\uFF0C\u5E76\u4FDD\u6301\u7EE7\u627F\u5C42\u6B21\u5C3D\u91CF\u6241\u5E73\uFF082 \uFF5E 3 \u5C42\u4EE5\u5185\uFF09\u3002",paraId:120,tocIndex:40},{value:"ES6 \u4E4B\u540E\uFF0C\u539F\u751F\u6784\u9020\u51FD\u6570\uFF08\u5185\u5EFA\u7C7B\u578B\uFF09\u4E5F\u53EF\u4EE5\u88AB\u7EE7\u627F\uFF0C\u5E76\u4E14\u5728\u73B0\u4EE3\u5F15\u64CE\u4E2D\u652F\u6301\u5F97\u8F83\u597D\u3002\u5E38\u89C1\u5185\u5EFA\u6784\u9020\u51FD\u6570\u5305\u62EC\uFF1A",paraId:121,tocIndex:41},{value:"Boolean",paraId:122,tocIndex:41},{value:"Number",paraId:122,tocIndex:41},{value:"String",paraId:122,tocIndex:41},{value:"Array",paraId:122,tocIndex:41},{value:"Date",paraId:122,tocIndex:41},{value:"Function",paraId:122,tocIndex:41},{value:"RegExp",paraId:122,tocIndex:41},{value:"Error",paraId:122,tocIndex:41},{value:"Object",paraId:122,tocIndex:41},{value:"Map",paraId:122,tocIndex:41},{value:" / ",paraId:122,tocIndex:41},{value:"Set",paraId:122,tocIndex:41},{value:" / ",paraId:122,tocIndex:41},{value:"Promise",paraId:122,tocIndex:41},{value:" \u7B49\uFF08ES6+ \u96C6\u5408\u7C7B\u578B\uFF09",paraId:122,tocIndex:41},{value:"Array",paraId:5},{value:`class MyArray extends Array {
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

// \u4E00\u4E9B\u6570\u7EC4\u65B9\u6CD5\u4F1A\u8FD4\u56DE\u540C\u4E00\u6784\u9020\u51FD\u6570\u7684\u5B9E\u4F8B\uFF08\u53D6\u51B3\u4E8E Symbol.species\uFF09
const mapped = arr.map((x) => x * 2);
console.log(mapped instanceof MyArray); // \u901A\u5E38\u4E3A true
`,paraId:123,tocIndex:42},{value:"\u67D0\u4E9B\u65B9\u6CD5\u662F\u5426\u8FD4\u56DE\u5B50\u7C7B\u5B9E\u4F8B\uFF0C\u53D7 ",paraId:124,tocIndex:42},{value:"Symbol.species",paraId:124,tocIndex:42},{value:" \u5F71\u54CD\uFF0C\u6709\u9700\u8981\u65F6\u53EF\u4EE5\u81EA\u5B9A\u4E49\u3002",paraId:124,tocIndex:42},{value:"Error",paraId:5},{value:`class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

try {
  throw new ValidationError('\u65E0\u6548\u8F93\u5165');
} catch (e) {
  console.log(e.name); // ValidationError
  console.log(e.message); // \u65E0\u6548\u8F93\u5165
  console.log(e.stack); // \u5806\u6808\u4FE1\u606F\uFF08\u4E0D\u540C\u5F15\u64CE\u7565\u6709\u5DEE\u5F02\uFF09
}
`,paraId:125,tocIndex:43},{value:"\u5728 Node.js \u548C\u73B0\u4EE3\u6D4F\u89C8\u5668\u4E2D\uFF0C\u81EA\u5B9A\u4E49\u9519\u8BEF\u7C7B\u578B\u7684\u884C\u4E3A\u5DF2\u76F8\u5BF9\u4E00\u81F4\uFF1B\u4F46\u4F9D\u65E7\u5EFA\u8BAE\u5728\u5173\u952E\u903B\u8F91\u4E2D\u901A\u8FC7\u6D4B\u8BD5\u786E\u8BA4\u5806\u6808\u3001\u7C7B\u578B\u5224\u65AD\u7B49\u662F\u5426\u7B26\u5408\u9884\u671F\u3002",paraId:126,tocIndex:43},{value:"\u5728 ES6 ",paraId:127,tocIndex:44},{value:"class",paraId:127,tocIndex:44},{value:" \u51FA\u73B0\u4E4B\u524D\uFF0CJavaScript \u901A\u8FC7\u6784\u9020\u51FD\u6570\u548C\u539F\u578B\u94FE\u5B9E\u73B0\u7EE7\u627F\u3002\u4E86\u89E3 ES5 \u7EE7\u627F\u65B9\u5F0F\u6709\u52A9\u4E8E\uFF1A",paraId:127,tocIndex:44},{value:"\u7406\u89E3 ",paraId:128,tocIndex:44},{value:"class",paraId:128,tocIndex:44},{value:" \u7684\u5E95\u5C42\u673A\u5236",paraId:128,tocIndex:44},{value:"\u7EF4\u62A4\u65E7\u4EE3\u7801",paraId:128,tocIndex:44},{value:"\u6DF1\u5165\u638C\u63E1\u539F\u578B\u94FE",paraId:128,tocIndex:44},{value:`function Super() {
  this.super_param = [1, 2, 3];
}
Super.prototype.getSuperParam = function () {
  return this.super_param;
};

function Sub() {
  this.sub_param = true;
}

// \u6838\u5FC3\uFF1ASub.prototype \u6307\u5411 Super \u7684\u5B9E\u4F8B
Sub.prototype = new Super();

Sub.prototype.getSubParam = function () {
  return this.sub_param;
};

var instance1 = new Sub();
var instance2 = new Sub();
instance1.super_param.push(4);

console.log(instance1.super_param); // [1, 2, 3, 4]
console.log(instance2.super_param); // [1, 2, 3, 4]

// \u7F3A\u70B91\uFF1A\u5F15\u7528\u7C7B\u578B\u5C5E\u6027\uFF08\u5982\u6570\u7EC4\uFF09\u5728\u6240\u6709\u5B9E\u4F8B\u95F4\u5171\u4EAB
// \u7F3A\u70B92\uFF1ASub.prototype \u91CD\u5199\u540E\uFF0Cconstructor \u6307\u5411\u4E22\u5931\uFF08\u4E0D\u518D\u662F Sub\uFF09
`,paraId:129,tocIndex:45},{value:"\u901A\u8FC7 ",paraId:130,tocIndex:46},{value:"\u6784\u9020\u51FD\u6570\u501F\u7528 + \u539F\u578B\u94FE\u7EE7\u627F",paraId:130,tocIndex:46},{value:" \u7684\u7EC4\u5408\uFF0C\u89E3\u51B3\u5F15\u7528\u7C7B\u578B\u5171\u4EAB\u95EE\u9898\uFF1A",paraId:130,tocIndex:46},{value:`function Super() {
  this.super_param = [1, 2, 3];
}
Super.prototype.getSuperParam = function () {
  return this.super_param;
};

function Sub() {
  // \u6784\u9020\u51FD\u6570\u501F\u7528\uFF1A\u6BCF\u4E2A Sub \u5B9E\u4F8B\u90FD\u6709\u81EA\u5DF1\u7684 super_param
  Super.call(this);
  this.sub_param = true;
}

// \u539F\u578B\u94FE\u7EE7\u627F\uFF1ASub.prototype \u6307\u5411 Super \u7684\u5B9E\u4F8B
Sub.prototype = new Super();

// \u4FEE\u590D constructor \u6307\u5411
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

// \u7F3A\u70B9\uFF1ASuper \u6784\u9020\u51FD\u6570\u88AB\u8C03\u7528\u4E86\u4E24\u6B21
// - \u4E00\u6B21\u5728 Sub \u6784\u9020\u5668\u4E2D\uFF08Super.call(this)\uFF09
// - \u4E00\u6B21\u5728\u8BBE\u7F6E\u539F\u578B\u94FE\u65F6\uFF08new Super()\uFF09
`,paraId:131,tocIndex:46},{value:"\u76EE\u6807\uFF1A\u907F\u514D\u7B2C\u4E8C\u7248\u4E2D\u201C\u7236\u7C7B\u6784\u9020\u51FD\u6570\u88AB\u8C03\u7528\u4E24\u6B21\u201D\u7684\u95EE\u9898\u3002",paraId:132,tocIndex:47},{value:`function Super() {
  this.super_param = [1, 2, 3];
}
Super.prototype.getSuperParam = function () {
  return this.super_param;
};

function Sub() {
  // \u901A\u8FC7\u6784\u9020\u51FD\u6570\u501F\u7528\u7EE7\u627F\u5B9E\u4F8B\u5C5E\u6027
  Super.call(this);
  this.sub_param = true;
}

// \u6838\u5FC3\uFF1A\u901A\u8FC7 Object.create \u5EFA\u7ACB\u539F\u578B\u94FE\uFF0C\u800C\u4E0D\u662F new Super()
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
`,paraId:133,tocIndex:47},{value:"\u8FD9\u79CD\u201C\u6784\u9020\u51FD\u6570\u501F\u7528 + ",paraId:134,tocIndex:47},{value:"Object.create",paraId:134,tocIndex:47},{value:" \u5EFA\u7ACB\u539F\u578B\u94FE\u201D\u7684\u65B9\u5F0F\u5C31\u662F\u7ECF\u5178\u7684 ",paraId:134,tocIndex:47},{value:"\u5BC4\u751F\u7EC4\u5408\u5F0F\u7EE7\u627F",paraId:134,tocIndex:47},{value:"\u3002\u5B83\u662F ES5 \u73AF\u5883\u4E0B\u6700\u63A8\u8350\u7684\u624B\u5199\u7EE7\u627F\u65B9\u5F0F\uFF0C\u4E5F\u662F ES6 ",paraId:134,tocIndex:47},{value:"class extends",paraId:134,tocIndex:47},{value:" \u7684\u4E00\u4E2A\u91CD\u8981\u53C2\u8003\u6A21\u578B\u3002",paraId:134,tocIndex:47},{value:"Object.setPrototypeOf",paraId:5},{value:"\u5728 ES6+ \u73AF\u5883\uFF0C\u53EF\u4EE5\u7528 ",paraId:135,tocIndex:48},{value:"Object.setPrototypeOf",paraId:135,tocIndex:48},{value:" \u4FEE\u6539\u5DF2\u6709\u5BF9\u8C61\u7684\u539F\u578B\uFF0C\u5305\u62EC\u51FD\u6570\u7684 ",paraId:135,tocIndex:48},{value:"prototype",paraId:135,tocIndex:48},{value:" \u5BF9\u8C61\uFF1A",paraId:135,tocIndex:48},{value:`// ES6+ \u5199\u6CD5\uFF08\u4E0D\u5C5E\u4E8E ES5 \u7EE7\u627F\uFF09\uFF1A
Object.setPrototypeOf(Sub.prototype, Super.prototype);
`,paraId:136,tocIndex:48},{value:"\u5B83\u7684\u6548\u679C\u7C7B\u4F3C\u4E8E\u201C\u8BA9 ",paraId:137,tocIndex:48},{value:"Sub.prototype",paraId:137,tocIndex:48},{value:" \u7684\u539F\u578B\u6307\u5411 ",paraId:137,tocIndex:48},{value:"Super.prototype",paraId:137,tocIndex:48},{value:"\u201D\uFF0C\u4F46 ",paraId:137,tocIndex:48},{value:"\u4E0D\u4F1A\u65B0\u5EFA ",paraId:137,tocIndex:48},{value:"Sub.prototype",paraId:137,tocIndex:48},{value:" \u5BF9\u8C61",paraId:137,tocIndex:48},{value:"\uFF0C\u4E0E ",paraId:137,tocIndex:48},{value:"Sub.prototype = Object.create(...)",paraId:137,tocIndex:48},{value:" \u5E76\u4E0D\u5B8C\u5168\u7B49\u4EF7\u3002",paraId:137,tocIndex:48},{value:"\u6B64\u5916\uFF0C",paraId:138,tocIndex:48},{value:"Object.setPrototypeOf",paraId:138,tocIndex:48},{value:" \u5728\u6027\u80FD\u4E0A\u901A\u5E38\u8F83\u5DEE\uFF0C\u4E0D\u9002\u5408\u5728\u70ED\u8DEF\u5F84\u4E0A\u9891\u7E41\u8C03\u7528\uFF0C\u56E0\u6B64\u66F4\u63A8\u8350\u5728\u5B9A\u4E49\u9636\u6BB5\u4F7F\u7528 ",paraId:138,tocIndex:48},{value:"Object.create",paraId:138,tocIndex:48},{value:"\u3002",paraId:138,tocIndex:48}]}}]);
