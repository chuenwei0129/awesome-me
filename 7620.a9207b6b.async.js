"use strict";(self.webpackChunk_c6i_playground=self.webpackChunk_c6i_playground||[]).push([[7620],{97620:function(o,a,n){n.r(a),n.d(a,{texts:function(){return e}});const e=[{value:"ES6 \u5F15\u5165\u4E86\u4E00\u79CD\u65B0\u7684\u539F\u59CB\u6570\u636E\u7C7B\u578B ",paraId:0,tocIndex:0},{value:"Symbol",paraId:0,tocIndex:0},{value:"\uFF0C\u8868\u793A\u72EC\u4E00\u65E0\u4E8C\u7684\u503C\u3002\u5B83\u662F JavaScript \u7684\u7B2C\u4E03\u79CD\u6570\u636E\u7C7B\u578B\uFF0C\u4E0E ",paraId:0,tocIndex:0},{value:"undefined",paraId:0,tocIndex:0},{value:"\u3001",paraId:0,tocIndex:0},{value:"null",paraId:0,tocIndex:0},{value:"\u3001",paraId:0,tocIndex:0},{value:"Boolean",paraId:0,tocIndex:0},{value:"\u3001",paraId:0,tocIndex:0},{value:"String",paraId:0,tocIndex:0},{value:"\u3001",paraId:0,tocIndex:0},{value:"Number",paraId:0,tocIndex:0},{value:"\u3001",paraId:0,tocIndex:0},{value:"Object",paraId:0,tocIndex:0},{value:" \u5E76\u5217\u3002",paraId:0,tocIndex:0},{value:"\u552F\u4E00\u6027",paraId:1,tocIndex:1},{value:"\uFF1A\u6BCF\u4E2A Symbol \u503C\u90FD\u662F\u552F\u4E00\u7684\uFF0C\u5373\u4F7F\u63CF\u8FF0\u76F8\u540C",paraId:1,tocIndex:1},{value:"\u4E0D\u53EF\u53D8\u6027",paraId:1,tocIndex:1},{value:"\uFF1ASymbol \u503C\u521B\u5EFA\u540E\u4E0D\u53EF\u66F4\u6539",paraId:1,tocIndex:1},{value:"\u4E0D\u53EF\u679A\u4E3E",paraId:1,tocIndex:1},{value:"\uFF1A\u4F5C\u4E3A\u5BF9\u8C61\u5C5E\u6027\u65F6\uFF0C\u4E0D\u4F1A\u51FA\u73B0\u5728 ",paraId:1,tocIndex:1},{value:"for...in",paraId:1,tocIndex:1},{value:"\u3001",paraId:1,tocIndex:1},{value:"for...of",paraId:1,tocIndex:1},{value:" \u5FAA\u73AF\u4E2D",paraId:1,tocIndex:1},{value:"\u4E0D\u4F1A\u88AB\u81EA\u52A8\u8F6C\u6362",paraId:1,tocIndex:1},{value:"\uFF1A\u4E0D\u80FD\u9690\u5F0F\u8F6C\u6362\u4E3A\u5B57\u7B26\u4E32\u6216\u6570\u5B57",paraId:1,tocIndex:1},{value:`// \u521B\u5EFA Symbol
let s1 = Symbol();
let s2 = Symbol('foo'); // 'foo' \u662F\u63CF\u8FF0\uFF0C\u7528\u4E8E\u8C03\u8BD5
let s3 = Symbol('bar');
let s4 = Symbol();

// \u6BCF\u4E2A Symbol \u90FD\u662F\u552F\u4E00\u7684
console.log(s1 === s4); // false
console.log(Symbol('foo') === Symbol('foo')); // false

// Symbol \u503C\u53EF\u4EE5\u663E\u5F0F\u8F6C\u4E3A\u5B57\u7B26\u4E32
console.log(s1.toString()); // "Symbol()"
console.log(s2.toString()); // "Symbol(foo)"
console.log(String(s1) === String(s4)); // true\uFF0C\u8F6C\u4E3A\u5B57\u7B26\u4E32\u540E\u90FD\u662F "Symbol()"

// Symbol \u503C\u53EF\u4EE5\u8F6C\u4E3A\u5E03\u5C14\u503C\uFF0C\u4F46\u4E0D\u80FD\u8F6C\u4E3A\u6570\u503C
console.log(Boolean(s1)); // true
console.log(!s1); // false
// console.log(Number(s1)); // TypeError: Cannot convert a Symbol value to a number

// ES2019 \u63D0\u4F9B\u4E86\u5B9E\u4F8B\u5C5E\u6027 description\uFF0C\u76F4\u63A5\u8FD4\u56DE Symbol \u7684\u63CF\u8FF0
console.log(s2.description); // "foo"
console.log(s1.description); // undefined
`,paraId:2,tocIndex:2},{value:"\u6709\u65F6\u6211\u4EEC\u5E0C\u671B\u91CD\u65B0\u4F7F\u7528\u540C\u4E00\u4E2A Symbol \u503C\uFF0C",paraId:3,tocIndex:3},{value:"Symbol.for()",paraId:3,tocIndex:3},{value:" \u65B9\u6CD5\u53EF\u4EE5\u505A\u5230\u8FD9\u4E00\u70B9\u3002\u5B83\u63A5\u53D7\u4E00\u4E2A\u5B57\u7B26\u4E32\u4F5C\u4E3A\u53C2\u6570\uFF0C\u641C\u7D22\u6709\u6CA1\u6709\u4EE5\u8BE5\u53C2\u6570\u4F5C\u4E3A\u540D\u79F0\u7684 Symbol \u503C\u3002\u5982\u679C\u6709\uFF0C\u5C31\u8FD4\u56DE\u8FD9\u4E2A Symbol \u503C\uFF0C\u5426\u5219\u5C31\u65B0\u5EFA\u4E00\u4E2A\u3002",paraId:3,tocIndex:3},{value:`// Symbol.for() \u4F1A\u5728\u5168\u5C40\u6CE8\u518C\u8868\u4E2D\u767B\u8BB0 Symbol
let s5 = Symbol.for('foo');
let s6 = Symbol.for('foo');

console.log(s5 === s6); // true

// Symbol() \u521B\u5EFA\u7684\u4E0D\u4F1A\u88AB\u767B\u8BB0
let s2 = Symbol('foo');
console.log(s5 === s2); // false

// Symbol.keyFor() \u8FD4\u56DE\u4E00\u4E2A\u5DF2\u767B\u8BB0\u7684 Symbol \u7C7B\u578B\u503C\u7684 key
console.log(Symbol.keyFor(s5)); // "foo"
console.log(Symbol.keyFor(s2)); // undefined\uFF0C\u56E0\u4E3A s2 \u672A\u767B\u8BB0
`,paraId:4,tocIndex:3},{value:"\u6CE8\u610F",paraId:5,tocIndex:3},{value:"\uFF1A",paraId:5,tocIndex:3},{value:"Symbol.for()",paraId:5,tocIndex:3},{value:" \u4E3A Symbol \u503C\u767B\u8BB0\u7684\u540D\u5B57\u662F\u5168\u5C40\u7684\uFF0C\u53EF\u4EE5\u5728\u4E0D\u540C\u7684 iframe \u6216 service worker \u4E2D\u53D6\u5230\u540C\u4E00\u4E2A\u503C\u3002",paraId:5,tocIndex:3},{value:"\u5728 JavaScript \u4E2D\uFF0C\u5F53\u6211\u4EEC\u8BF4\u6709\u5BF9\u67D0\u4E2A ",paraId:6,tocIndex:4},{value:"Symbol",paraId:6,tocIndex:4},{value:" \u7684\u5F15\u7528\uFF0C\u610F\u5473\u7740\u4F60\u5728\u4EE3\u7801\u4E2D\u6301\u6709\u90A3\u4E2A ",paraId:6,tocIndex:4},{value:"Symbol",paraId:6,tocIndex:4},{value:" \u5B9E\u4F8B\u7684\u4E00\u4E2A\u53D8\u91CF\u6216\u5E38\u91CF\uFF0C\u4ECE\u800C\u80FD\u591F\u901A\u8FC7\u8FD9\u4E2A\u5F15\u7528\u6765\u8BBF\u95EE\u4F7F\u7528\u8BE5 ",paraId:6,tocIndex:4},{value:"Symbol",paraId:6,tocIndex:4},{value:" \u4F5C\u4E3A\u952E\u7684\u5BF9\u8C61\u5C5E\u6027\u3002",paraId:6,tocIndex:4},{value:"Symbol",paraId:7,tocIndex:4},{value:" \u662F\u4E00\u79CD\u539F\u59CB\u6570\u636E\u7C7B\u578B\uFF0C\u6BCF\u6B21\u901A\u8FC7 ",paraId:7,tocIndex:4},{value:"Symbol()",paraId:7,tocIndex:4},{value:" \u51FD\u6570\u8C03\u7528\u521B\u5EFA\u7684 ",paraId:7,tocIndex:4},{value:"Symbol",paraId:7,tocIndex:4},{value:" \u90FD\u662F\u552F\u4E00\u7684\u3002\u5373\u4FBF\u4E24\u4E2A ",paraId:7,tocIndex:4},{value:"Symbol",paraId:7,tocIndex:4},{value:" \u7684\u63CF\u8FF0\u76F8\u540C\uFF0C\u5B83\u4EEC\u4E5F\u662F\u4E0D\u76F8\u7B49\u7684\u3002\u56E0\u6B64\uFF0C\u8981\u8BBF\u95EE\u4E00\u4E2A\u4F7F\u7528 ",paraId:7,tocIndex:4},{value:"Symbol",paraId:7,tocIndex:4},{value:" \u4F5C\u4E3A\u952E\u7684\u5C5E\u6027\uFF0C\u4F60\u5FC5\u987B\u76F4\u63A5\u4F7F\u7528\u90A3\u4E2A ",paraId:7,tocIndex:4},{value:"Symbol",paraId:7,tocIndex:4},{value:" \u7684\u5F15\u7528\u3002",paraId:7,tocIndex:4},{value:`// \u521B\u5EFA\u4E00\u4E2A Symbol
let sym = Symbol('mySymbol');

// \u4F7F\u7528 Symbol \u4F5C\u4E3A\u5BF9\u8C61\u5C5E\u6027\u7684\u952E
let obj = {
  [sym]: 'symbol value',
  normalKey: 'normal value',
};

// \u901A\u8FC7 Symbol \u7684\u5F15\u7528\u8BBF\u95EE\u5C5E\u6027\u503C
console.log(obj[sym]); // "symbol value"
console.log(obj.normalKey); // "normal value"
`,paraId:8,tocIndex:5},{value:"\u5728\u8FD9\u4E2A\u4F8B\u5B50\u4E2D\uFF0C\u53D8\u91CF ",paraId:9,tocIndex:5},{value:"sym",paraId:9,tocIndex:5},{value:" \u6301\u6709\u4E00\u4E2A ",paraId:9,tocIndex:5},{value:"Symbol",paraId:9,tocIndex:5},{value:" \u7684\u5F15\u7528\uFF0C\u8FD9\u4E2A ",paraId:9,tocIndex:5},{value:"Symbol",paraId:9,tocIndex:5},{value:" \u88AB\u7528\u4F5C\u5BF9\u8C61 ",paraId:9,tocIndex:5},{value:"obj",paraId:9,tocIndex:5},{value:" \u7684\u4E00\u4E2A\u5C5E\u6027\u952E\u3002\u53EA\u6709\u901A\u8FC7\u53D8\u91CF ",paraId:9,tocIndex:5},{value:"sym",paraId:9,tocIndex:5},{value:" \u624D\u80FD\u8BBF\u95EE\u5230\u8FD9\u4E2A\u5C5E\u6027\u3002",paraId:9,tocIndex:5},{value:"\u5982\u679C\u6CA1\u6709\u8FD9\u4E2A ",paraId:10,tocIndex:6},{value:"Symbol",paraId:10,tocIndex:6},{value:" \u7684\u5F15\u7528\uFF0C\u5C31\u6CA1\u6709\u529E\u6CD5\u76F4\u63A5\u8BBF\u95EE\u5230\u7528\u5B83\u4F5C\u4E3A\u952E\u7684\u5C5E\u6027\uFF1A",paraId:10,tocIndex:6},{value:`// \u5373\u4F7F\u63CF\u8FF0\u76F8\u540C\uFF0C\u521B\u5EFA\u7684\u4E5F\u662F\u4E0D\u540C\u7684 Symbol
let sym2 = Symbol('mySymbol');
console.log(obj[sym2]); // undefined\uFF0C\u56E0\u4E3A sym2 \u548C sym \u662F\u4E0D\u540C\u7684 Symbol

// \u666E\u901A\u5C5E\u6027\u904D\u5386\u65E0\u6CD5\u83B7\u53D6 Symbol \u5C5E\u6027
console.log(Object.keys(obj)); // ["normalKey"]
console.log(Object.getOwnPropertyNames(obj)); // ["normalKey"]

// \u5FC5\u987B\u4F7F\u7528\u7279\u5B9A\u65B9\u6CD5\u624D\u80FD\u83B7\u53D6 Symbol \u5C5E\u6027
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(mySymbol)]
console.log(Reflect.ownKeys(obj)); // ["normalKey", Symbol(mySymbol)]
`,paraId:11,tocIndex:6},{value:'\u56E0\u6B64\uFF0C\u5F53\u6211\u4EEC\u8C08\u8BBA"\u6709\u5BF9\u8BE5 ',paraId:12,tocIndex:6},{value:"Symbol",paraId:12,tocIndex:6},{value:' \u7684\u5F15\u7528"\uFF0C\u5C31\u662F\u6307\u4F60\u80FD\u591F\u901A\u8FC7\u67D0\u4E2A\u53D8\u91CF\u6216\u5E38\u91CF\u6765\u8BBF\u95EE\u90A3\u4E2A ',paraId:12,tocIndex:6},{value:"Symbol",paraId:12,tocIndex:6},{value:"\uFF0C\u5E76\u5229\u7528\u5B83\u6765\u8BBF\u95EE\u6216\u64CD\u4F5C\u4F7F\u7528\u8BE5 ",paraId:12,tocIndex:6},{value:"Symbol",paraId:12,tocIndex:6},{value:" \u4F5C\u4E3A\u952E\u7684\u5BF9\u8C61\u5C5E\u6027\u3002\u8FD9\u662F ",paraId:12,tocIndex:6},{value:"Symbol",paraId:12,tocIndex:6},{value:' \u7528\u4E8E\u521B\u5EFA"\u79C1\u6709"\u5C5E\u6027\u7684\u5173\u952E\u673A\u5236\u3002',paraId:12,tocIndex:6},{value:"\u5728 JavaScript \u4E2D\u4E3A\u4E86\u5B9E\u73B0\u79C1\u6709\u5C5E\u6027\uFF0C\u4E4B\u524D\u5E38\u7528\u7684\u4E00\u79CD\u65B9\u5F0F\u662F",paraId:13,tocIndex:7},{value:"\u547D\u540D\u89C4\u8303\u7EA6\u5B9A\uFF0C\u65B9\u6CD5\u540D\u4EE5 ",paraId:13,tocIndex:7},{value:"_",paraId:13,tocIndex:7},{value:" \u5F00\u59CB",paraId:13,tocIndex:7},{value:"\u3002",paraId:13,tocIndex:7},{value:"Symbol \u51FA\u73B0\u4E4B\u540E\u770B\u5230\u7684\u4E00\u4E2A\u76F8\u5BF9\u8F83\u591A\u7684\u573A\u666F\u662F\u7528\u5B83\u6765\u6A21\u62DF\u79C1\u6709\u5C5E\u6027\u3001\u65B9\u6CD5",paraId:14,tocIndex:7},{value:"\u3002\u8FD9\u5BF9\u4E00\u4E9B ",paraId:14,tocIndex:7},{value:"for...in",paraId:14,tocIndex:7},{value:"\u3001",paraId:14,tocIndex:7},{value:"Object.getOwnPropertyNames()",paraId:14,tocIndex:7},{value:" \u64CD\u4F5C\u662F\u53EF\u4EE5\u9690\u85CF\u6389\u8FD9\u4E9B\u5C5E\u6027\uFF0C\u4F46\u662F ES6 \u4E2D\u7684 Symbol \u548C\u5F3A\u7C7B\u578B\u8BED\u8A00\u4E2D\u7684 ",paraId:14,tocIndex:7},{value:"private",paraId:14,tocIndex:7},{value:" \u76F8\u6BD4\u5E76\u4E0D\u5B8C\u5168\u662F\u79C1\u6709\u7684\uFF0C\u4ECD\u7136\u80FD\u901A\u8FC7 ",paraId:14,tocIndex:7},{value:"Object.getOwnPropertySymbols()",paraId:14,tocIndex:7},{value:"\u3001",paraId:14,tocIndex:7},{value:"Reflect.ownKeys()",paraId:14,tocIndex:7},{value:" \u64CD\u4F5C\u679A\u4E3E\u5230\u8FD9\u4E9B\u5C5E\u6027\u8FDB\u884C\u8BBF\u95EE\u3002",paraId:14,tocIndex:7},{value:`const privateField = Symbol('privateField');
const privateMethod = Symbol('privateMethod');

class MyClass {
  constructor() {
    this[privateField] = '\u8FD9\u662F\u79C1\u6709\u5B57\u6BB5';
  }

  [privateMethod]() {
    return '\u8FD9\u662F\u79C1\u6709\u65B9\u6CD5';
  }

  publicMethod() {
    // \u5728\u7C7B\u5185\u90E8\u53EF\u4EE5\u8BBF\u95EE Symbol \u5C5E\u6027
    console.log(this[privateField]);
    console.log(this[privateMethod]());
  }
}

const instance = new MyClass();
instance.publicMethod(); // \u53EF\u4EE5\u6B63\u5E38\u8C03\u7528

// \u5916\u90E8\u65E0\u6CD5\u901A\u8FC7\u5E38\u89C4\u65B9\u5F0F\u8BBF\u95EE
console.log(Object.keys(instance)); // []
console.log(instance.privateField); // undefined

// \u4F46\u4ECD\u53EF\u4EE5\u901A\u8FC7\u7279\u6B8A\u65B9\u6CD5\u8BBF\u95EE
const symbols = Object.getOwnPropertySymbols(instance);
console.log(instance[symbols[0]]); // "\u8FD9\u662F\u79C1\u6709\u5B57\u6BB5"
`,paraId:15,tocIndex:8},{value:"\u5982\u679C\u9700\u8981\u771F\u6B63\u7684\u79C1\u6709\u5C5E\u6027\uFF0C\u5E94\u8BE5\u4F7F\u7528 ES2022 \u5F15\u5165\u7684\u79C1\u6709\u5B57\u6BB5\u8BED\u6CD5\uFF08",paraId:16,tocIndex:9},{value:"#",paraId:16,tocIndex:9},{value:" \u524D\u7F00\uFF09\uFF1A",paraId:16,tocIndex:9},{value:`class MyClass {
  #privateField = '\u771F\u6B63\u7684\u79C1\u6709\u5B57\u6BB5';

  getPrivateField() {
    return this.#privateField;
  }
}

const instance = new MyClass();
console.log(instance.getPrivateField()); // "\u771F\u6B63\u7684\u79C1\u6709\u5B57\u6BB5"
// console.log(instance.#privateField); // SyntaxError
`,paraId:17,tocIndex:9},{value:"Well-Known Symbols \u662F\u8BED\u8A00\u89C4\u8303\u5B9A\u4E49\u7684\u7279\u6B8A\u7B26\u53F7\uFF0C\u5B83\u4EEC\u88AB\u7528\u4E8E\u8868\u793A\u8BED\u8A00\u884C\u4E3A\u7684\u5185\u90E8\u673A\u5236\u3002\u8FD9\u4E9B\u5185\u7F6E\u7684 Symbol \u503C\u7528\u4E8E\u81EA\u5B9A\u4E49\u5BF9\u8C61\u7684\u5185\u90E8\u884C\u4E3A\u3002",paraId:18,tocIndex:10},{value:"\u5BF9\u8C61\u7684 ",paraId:19,tocIndex:11},{value:"Symbol.hasInstance",paraId:19,tocIndex:11},{value:" \u5C5E\u6027\uFF0C\u6307\u5411\u4E00\u4E2A\u5185\u90E8\u65B9\u6CD5\u3002\u5F53\u5176\u4ED6\u5BF9\u8C61\u4F7F\u7528 ",paraId:19,tocIndex:11},{value:"instanceof",paraId:19,tocIndex:11},{value:" \u8FD0\u7B97\u7B26\uFF0C\u5224\u65AD\u662F\u5426\u4E3A\u8BE5\u5BF9\u8C61\u7684\u5B9E\u4F8B\u65F6\uFF0C\u4F1A\u8C03\u7528\u8FD9\u4E2A\u65B9\u6CD5\u3002",paraId:19,tocIndex:11},{value:`class MyArray {
  // \u81EA\u5B9A\u4E49 instanceof \u884C\u4E3A
  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance);
  }
}

console.log([] instanceof MyArray); // true
console.log({} instanceof MyArray); // false

// \u7B49\u4EF7\u4E8E\uFF1AMyArray[Symbol.hasInstance]([])
`,paraId:20,tocIndex:11},{value:"\u5BF9\u8C61\u7684 ",paraId:21,tocIndex:12},{value:"Symbol.iterator",paraId:21,tocIndex:12},{value:" \u5C5E\u6027\uFF0C\u6307\u5411\u8BE5\u5BF9\u8C61\u7684\u9ED8\u8BA4\u904D\u5386\u5668\u65B9\u6CD5\u3002\u5F53\u4F7F\u7528 ",paraId:21,tocIndex:12},{value:"for...of",paraId:21,tocIndex:12},{value:" \u5FAA\u73AF\u6216\u6269\u5C55\u8FD0\u7B97\u7B26\u65F6\uFF0C\u4F1A\u8C03\u7528\u8FD9\u4E2A\u65B9\u6CD5\u3002",paraId:21,tocIndex:12},{value:`// \u81EA\u5B9A\u4E49\u5BF9\u8C61\u7684\u8FED\u4EE3\u884C\u4E3A
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

// \u4F7F\u7528 for...of \u5FAA\u73AF
for (const value of myIterable) {
  console.log(value); // 1, 2, 3
}

// \u4F7F\u7528\u6269\u5C55\u8FD0\u7B97\u7B26
console.log([...myIterable]); // [1, 2, 3]

// \u4F7F\u7528\u751F\u6210\u5668\u51FD\u6570\u7B80\u5316
const myIterable2 = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  },
};

console.log([...myIterable2]); // [1, 2, 3]
`,paraId:22,tocIndex:12},{value:"\u5BF9\u8C61\u7684 ",paraId:23,tocIndex:13},{value:"Symbol.toPrimitive",paraId:23,tocIndex:13},{value:" \u5C5E\u6027\uFF0C\u6307\u5411\u4E00\u4E2A\u65B9\u6CD5\u3002\u8BE5\u5BF9\u8C61\u88AB\u8F6C\u4E3A\u539F\u59CB\u7C7B\u578B\u7684\u503C\u65F6\uFF0C\u4F1A\u8C03\u7528\u8FD9\u4E2A\u65B9\u6CD5\uFF0C\u8FD4\u56DE\u8BE5\u5BF9\u8C61\u5BF9\u5E94\u7684\u539F\u59CB\u7C7B\u578B\u503C\u3002",paraId:23,tocIndex:13},{value:"Symbol.toPrimitive",paraId:24,tocIndex:13},{value:" \u88AB\u8C03\u7528\u65F6\uFF0C\u4F1A\u63A5\u53D7\u4E00\u4E2A\u5B57\u7B26\u4E32\u53C2\u6570 ",paraId:24,tocIndex:13},{value:"hint",paraId:24,tocIndex:13},{value:"\uFF0C\u8868\u793A\u5F53\u524D\u8FD0\u7B97\u7684\u6A21\u5F0F\uFF1A",paraId:24,tocIndex:13},{value:"number",paraId:25,tocIndex:13},{value:"\uFF1A\u8BE5\u573A\u5408\u9700\u8981\u8F6C\u6210\u6570\u503C\uFF08\u5982 ",paraId:25,tocIndex:13},{value:"Number(obj)",paraId:25,tocIndex:13},{value:"\u3001",paraId:25,tocIndex:13},{value:"+obj",paraId:25,tocIndex:13},{value:"\u3001\u7B97\u672F\u8FD0\u7B97\uFF09",paraId:25,tocIndex:13},{value:"string",paraId:25,tocIndex:13},{value:"\uFF1A\u8BE5\u573A\u5408\u9700\u8981\u8F6C\u6210\u5B57\u7B26\u4E32\uFF08\u5982 ",paraId:25,tocIndex:13},{value:"String(obj)",paraId:25,tocIndex:13},{value:"\u3001\u6A21\u677F\u5B57\u7B26\u4E32\uFF09",paraId:25,tocIndex:13},{value:"default",paraId:25,tocIndex:13},{value:"\uFF1A\u8BE5\u573A\u5408\u53EF\u4EE5\u8F6C\u6210\u6570\u503C\uFF0C\u4E5F\u53EF\u4EE5\u8F6C\u6210\u5B57\u7B26\u4E32\uFF08\u5982 ",paraId:25,tocIndex:13},{value:"==",paraId:25,tocIndex:13},{value:"\u3001",paraId:25,tocIndex:13},{value:"+",paraId:25,tocIndex:13},{value:" \u8FD0\u7B97\u7B26\uFF09",paraId:25,tocIndex:13},{value:`let obj = {
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

console.log(2 * obj); // hint: number \u2192 246
console.log(3 + obj); // hint: default \u2192 "3default"
console.log(obj == 'default'); // hint: default \u2192 true
console.log(String(obj)); // hint: string \u2192 "str"
console.log(Number(obj)); // hint: number \u2192 123
`,paraId:26,tocIndex:13},{value:"\u5386\u53F2\u77E5\u8BC6",paraId:27,tocIndex:13},{value:"\uFF1A\u65E9\u671F\u7684 JavaScript \u5B9E\u73B0\u91CC\uFF0C\u901A\u8FC7\u81EA\u5B9A\u4E49\u7684 ",paraId:27,tocIndex:13},{value:"valueOf()",paraId:27,tocIndex:13},{value:" \u8F6C\u6362\u5BF9\u8C61\u4E3A\u539F\u59CB\u503C\u65F6\uFF0C\u4F1A\u6709\u4E2A ",paraId:27,tocIndex:13},{value:"hint",paraId:27,tocIndex:13},{value:" \u53C2\u6570\uFF0C\u8868\u660E\u5B83\u7684\u4E0A\u4E0B\u6587\u5E0C\u671B\u8F6C\u6362\u51FA\u7684\u539F\u59CB\u503C\u662F\u5B57\u7B26\u4E32\u8FD8\u662F\u6570\u5B57\u3002\u867D\u7136\u8FD9\u4E2A\u7279\u6027\u6700\u7EC8\u6CA1\u6709\u8FDB\u5165 ES1 \u89C4\u8303\uFF0C\u4F46\u5728 ES6 \u4E2D\u4EE5 ",paraId:27,tocIndex:13},{value:"Symbol.toPrimitive",paraId:27,tocIndex:13},{value:" \u7684\u5F62\u5F0F\u56DE\u5F52\u4E86\u3002",paraId:27,tocIndex:13},{value:"\u5BF9\u8C61\u7684 ",paraId:28,tocIndex:14},{value:"Symbol.toStringTag",paraId:28,tocIndex:14},{value:" \u5C5E\u6027\uFF0C\u6307\u5411\u4E00\u4E2A\u65B9\u6CD5\uFF0C\u7528\u4E8E\u81EA\u5B9A\u4E49\u5BF9\u8C61\u5728\u88AB ",paraId:28,tocIndex:14},{value:"Object.prototype.toString()",paraId:28,tocIndex:14},{value:" \u8C03\u7528\u65F6\u8FD4\u56DE\u7684\u5B57\u7B26\u4E32\u6807\u7B7E\u3002",paraId:28,tocIndex:14},{value:`class ValidatorClass {
  get [Symbol.toStringTag]() {
    return 'Validator';
  }
}

console.log(Object.prototype.toString.call(new ValidatorClass())); // "[object Validator]"

// \u9ED8\u8BA4\u884C\u4E3A
console.log(Object.prototype.toString.call({})); // "[object Object]"
console.log(Object.prototype.toString.call([])); // "[object Array]"
console.log(Object.prototype.toString.call(new Date())); // "[object Date]"
`,paraId:29,tocIndex:14},{value:"\u5BF9\u8C61\u7684 ",paraId:30,tocIndex:15},{value:"Symbol.species",paraId:30,tocIndex:15},{value:" \u5C5E\u6027\uFF0C\u6307\u5411\u4E00\u4E2A\u6784\u9020\u51FD\u6570\u3002\u521B\u5EFA\u884D\u751F\u5BF9\u8C61\u65F6\uFF0C\u4F1A\u4F7F\u7528\u8BE5\u5C5E\u6027\u6307\u5B9A\u7684\u6784\u9020\u51FD\u6570\u3002\u4E3B\u8981\u7528\u4E8E\u7C7B\u7684\u7EE7\u627F\u573A\u666F\u3002",paraId:30,tocIndex:15},{value:`class MyArray extends Array {
  // \u6307\u5B9A\u884D\u751F\u5BF9\u8C61\u7684\u6784\u9020\u51FD\u6570
  static get [Symbol.species]() {
    return Array;
  }
}

const a = new MyArray(1, 2, 3);
const mapped = a.map((x) => x * 2);

console.log(mapped instanceof MyArray); // false
console.log(mapped instanceof Array); // true

// \u5982\u679C\u4E0D\u5B9A\u4E49 Symbol.species\uFF0Cmapped \u4F1A\u662F MyArray \u7684\u5B9E\u4F8B
`,paraId:31,tocIndex:15},{value:`// Symbol.match - \u5B9A\u4E49\u5B57\u7B26\u4E32\u5339\u914D\u884C\u4E3A
class MyMatcher {
  [Symbol.match](string) {
    return string.indexOf('hello') !== -1;
  }
}

console.log('hello world'.match(new MyMatcher())); // true

// Symbol.replace - \u5B9A\u4E49\u5B57\u7B26\u4E32\u66FF\u6362\u884C\u4E3A
// Symbol.search - \u5B9A\u4E49\u5B57\u7B26\u4E32\u641C\u7D22\u884C\u4E3A
// Symbol.split - \u5B9A\u4E49\u5B57\u7B26\u4E32\u5206\u5272\u884C\u4E3A

// Symbol.isConcatSpreadable - \u63A7\u5236\u6570\u7EC4\u5408\u5E76\u65F6\u662F\u5426\u5C55\u5F00
const arr1 = [1, 2];
arr1[Symbol.isConcatSpreadable] = false;
console.log([0].concat(arr1)); // [0, [1, 2]]

const arr2 = [3, 4];
console.log([0].concat(arr2)); // [0, 3, 4]

// Symbol.unscopables - \u6307\u5B9A with \u8BED\u53E5\u4E2D\u88AB\u6392\u9664\u7684\u5C5E\u6027
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
`,paraId:32,tocIndex:16},{value:"\u5F53\u9700\u8981\u5411\u7B2C\u4E09\u65B9\u5BF9\u8C61\u6DFB\u52A0\u5C5E\u6027\u65F6\uFF0C\u4F7F\u7528 Symbol \u53EF\u4EE5\u4FDD\u8BC1\u4E0D\u4F1A\u4E0E\u73B0\u6709\u5C5E\u6027\u51B2\u7A81\u3002",paraId:33,tocIndex:18},{value:`// \u5047\u8BBE\u8FD9\u662F\u4E00\u4E2A\u7B2C\u4E09\u65B9\u5E93\u7684\u5BF9\u8C61
const thirdPartyObj = {
  name: 'example',
  getValue() {
    return this.value;
  },
};

// \u5B89\u5168\u5730\u6DFB\u52A0\u81EA\u5B9A\u4E49\u5C5E\u6027\uFF0C\u4E0D\u4F1A\u51B2\u7A81
const myCustomKey = Symbol('myCustom');
thirdPartyObj[myCustomKey] = 'my value';

console.log(thirdPartyObj[myCustomKey]); // "my value"
console.log(Object.keys(thirdPartyObj)); // ["name", "getValue"]
`,paraId:34,tocIndex:18},{value:"\u4F7F\u7528 Symbol \u5B9A\u4E49\u5E38\u91CF\uFF0C\u53EF\u4EE5\u4FDD\u8BC1\u8FD9\u4E9B\u503C\u662F\u552F\u4E00\u7684\u3002",paraId:35,tocIndex:19},{value:`// \u4F20\u7EDF\u65B9\u5F0F - \u53EF\u80FD\u51FA\u73B0\u503C\u91CD\u590D
const COLOR_RED = 'red';
const COLOR_GREEN = 'green';

// \u4F7F\u7528 Symbol - \u4FDD\u8BC1\u552F\u4E00\u6027
const COLOR_RED = Symbol('red');
const COLOR_GREEN = Symbol('green');

function handleColor(color) {
  switch (color) {
    case COLOR_RED:
      console.log('\u7EA2\u8272');
      break;
    case COLOR_GREEN:
      console.log('\u7EFF\u8272');
      break;
  }
}
`,paraId:36,tocIndex:19},{value:`const FOO_KEY = Symbol.for('foo');

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
`,paraId:37,tocIndex:20},{value:`// \u5B9A\u4E49\u5185\u90E8\u4F7F\u7528\u7684\u5143\u6570\u636E
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
`,paraId:38,tocIndex:21},{value:"JSON \u5E8F\u5217\u5316",paraId:39,tocIndex:22},{value:"\uFF1ASymbol \u5C5E\u6027\u4E0D\u4F1A\u51FA\u73B0\u5728 ",paraId:39,tocIndex:22},{value:"JSON.stringify()",paraId:39,tocIndex:22},{value:" \u7684\u7ED3\u679C\u4E2D",paraId:39,tocIndex:22},{value:`const obj = {
  [Symbol('foo')]: 'symbol value',
  bar: 'normal value',
};
console.log(JSON.stringify(obj)); // {"bar":"normal value"}
`,paraId:40,tocIndex:22},{value:"\u5C5E\u6027\u904D\u5386",paraId:41,tocIndex:22},{value:"\uFF1ASymbol \u5C5E\u6027\u9700\u8981\u4F7F\u7528\u7279\u5B9A\u65B9\u6CD5\u83B7\u53D6",paraId:41,tocIndex:22},{value:`const obj = {
  [Symbol('a')]: 'a',
  b: 'b',
};

// \u83B7\u53D6 Symbol \u5C5E\u6027
Object.getOwnPropertySymbols(obj); // [Symbol(a)]

// \u83B7\u53D6\u6240\u6709\u5C5E\u6027\uFF08\u5305\u62EC Symbol\uFF09
Reflect.ownKeys(obj); // ["b", Symbol(a)]
`,paraId:42,tocIndex:22},{value:"\u4E0D\u662F\u5B8C\u5168\u79C1\u6709",paraId:43,tocIndex:22},{value:"\uFF1ASymbol \u5C5E\u6027\u53EF\u4EE5\u901A\u8FC7 ",paraId:43,tocIndex:22},{value:"Object.getOwnPropertySymbols()",paraId:43,tocIndex:22},{value:" \u548C ",paraId:43,tocIndex:22},{value:"Reflect.ownKeys()",paraId:43,tocIndex:22},{value:" \u8BBF\u95EE",paraId:43,tocIndex:22},{value:"\u4E0D\u80FD\u4F7F\u7528 new",paraId:44,tocIndex:22},{value:"\uFF1ASymbol \u662F\u539F\u59CB\u7C7B\u578B\uFF0C\u4E0D\u80FD\u4F7F\u7528 ",paraId:44,tocIndex:22},{value:"new",paraId:44,tocIndex:22},{value:" \u64CD\u4F5C\u7B26",paraId:44,tocIndex:22},{value:`// const s = new Symbol(); // TypeError: Symbol is not a constructor
const s = Symbol(); // \u6B63\u786E
`,paraId:45,tocIndex:22},{value:"\u5168\u5C40\u6CE8\u518C\u8868",paraId:46,tocIndex:22},{value:"\uFF1A\u4F7F\u7528 ",paraId:46,tocIndex:22},{value:"Symbol.for()",paraId:46,tocIndex:22},{value:" \u65F6\u8981\u6CE8\u610F\u5168\u5C40\u6CE8\u518C\u8868\u7684\u5F71\u54CD\uFF0C\u907F\u514D\u610F\u5916\u7684 Symbol \u5171\u4EAB",paraId:46,tocIndex:22},{value:"Symbol \u662F ES6 \u5F15\u5165\u7684\u65B0\u7684\u539F\u59CB\u6570\u636E\u7C7B\u578B\uFF0C\u8868\u793A\u72EC\u4E00\u65E0\u4E8C\u7684\u503C",paraId:47,tocIndex:23},{value:"\u4E3B\u8981\u7528\u9014\uFF1A\u9632\u6B62\u5C5E\u6027\u540D\u51B2\u7A81\u3001\u5B9A\u4E49\u5BF9\u8C61\u7684\u79C1\u6709\u5C5E\u6027\u3001\u5B9A\u4E49\u5E38\u91CF",paraId:47,tocIndex:23},{value:"\u901A\u8FC7 ",paraId:47,tocIndex:23},{value:"Symbol.for()",paraId:47,tocIndex:23},{value:" \u53EF\u4EE5\u521B\u5EFA\u5168\u5C40\u6CE8\u518C\u7684 Symbol",paraId:47,tocIndex:23},{value:"Well-Known Symbols \u7528\u4E8E\u81EA\u5B9A\u4E49\u5BF9\u8C61\u7684\u5185\u90E8\u884C\u4E3A",paraId:47,tocIndex:23},{value:"Symbol \u5C5E\u6027\u4E0D\u4F1A\u51FA\u73B0\u5728\u5E38\u89C4\u7684\u5C5E\u6027\u904D\u5386\u4E2D\uFF0C\u4F46\u4E0D\u662F\u5B8C\u5168\u79C1\u6709\u7684",paraId:47,tocIndex:23},{value:"\u5728\u9700\u8981\u771F\u6B63\u79C1\u6709\u5C5E\u6027\u65F6\uFF0C\u5E94\u4F7F\u7528 ES2022 \u7684\u79C1\u6709\u5B57\u6BB5\u8BED\u6CD5\uFF08",paraId:47,tocIndex:23},{value:"#",paraId:47,tocIndex:23},{value:" \u524D\u7F00\uFF09",paraId:47,tocIndex:23}]}}]);
