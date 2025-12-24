"use strict";(self.webpackChunk_c6i_ui=self.webpackChunk_c6i_ui||[]).push([[781],{90781:function(r,e,n){n.r(e),n.d(e,{texts:function(){return t}});const t=[{value:"\u5728 JavaScript \u4E2D\uFF0C\u6211\u4EEC\u64CD\u4F5C\u5BF9\u8C61\u65F6\u770B\u4F3C\u5728\u4F7F\u7528\u5404\u79CD\u8BED\u6CD5\u548C API\uFF1A",paraId:0,tocIndex:1},{value:`const obj = {};

// \u5404\u79CD\u5BF9\u8C61\u64CD\u4F5C
obj.name = '\u5F20\u4E09'; // \u8BBE\u7F6E\u5C5E\u6027
console.log(obj.name); // \u8BFB\u53D6\u5C5E\u6027
Object.setPrototypeOf(obj, {}); // \u8BBE\u7F6E\u539F\u578B
for (let key in obj) {
} // \u904D\u5386\u5C5E\u6027
`,paraId:1,tocIndex:1},{value:"\u4F46\u5728\u5E95\u5C42\uFF0C\u8FD9\u4E9B\u64CD\u4F5C\u90FD\u4F1A\u88AB\u8F6C\u6362\u4E3A\u5BF9",paraId:2,tocIndex:1},{value:"\u5BF9\u8C61\u5185\u90E8\u65B9\u6CD5",paraId:2,tocIndex:1},{value:"\u7684\u8C03\u7528\u3002\u8FD9\u4E9B\u5185\u90E8\u65B9\u6CD5\u662F JavaScript \u5F15\u64CE\u5B9A\u4E49\u7684\uFF0C\u5305\u62EC\uFF1A",paraId:2,tocIndex:1},{value:"[[Get]]",paraId:3,tocIndex:1},{value:" - \u8BFB\u53D6\u5C5E\u6027",paraId:3,tocIndex:1},{value:"[[Set]]",paraId:3,tocIndex:1},{value:" - \u8BBE\u7F6E\u5C5E\u6027",paraId:3,tocIndex:1},{value:"[[GetPrototypeOf]]",paraId:3,tocIndex:1},{value:" - \u83B7\u53D6\u539F\u578B",paraId:3,tocIndex:1},{value:"[[SetPrototypeOf]]",paraId:3,tocIndex:1},{value:" - \u8BBE\u7F6E\u539F\u578B",paraId:3,tocIndex:1},{value:"[[OwnPropertyKeys]]",paraId:3,tocIndex:1},{value:" - \u83B7\u53D6\u6240\u6709\u5C5E\u6027\u952E",paraId:3,tocIndex:1},{value:"[[DefineOwnProperty]]",paraId:3,tocIndex:1},{value:" - \u5B9A\u4E49\u5C5E\u6027\u7279\u6027",paraId:3,tocIndex:1},{value:"[[Delete]]",paraId:3,tocIndex:1},{value:" - \u5220\u9664\u5C5E\u6027",paraId:3,tocIndex:1},{value:"[[HasProperty]]",paraId:3,tocIndex:1},{value:" - \u68C0\u67E5\u5C5E\u6027\u662F\u5426\u5B58\u5728",paraId:3,tocIndex:1},{value:"Proxy \u62E6\u622A\u7684\u662F\u5BF9\u8C61\u7684\u6240\u6709\u5185\u90E8\u65B9\u6CD5\uFF0C\u62E6\u622A\u662F\u5168\u9762\u7684\uFF1B\u800C ",paraId:4,tocIndex:2},{value:"Object.defineProperty",paraId:4,tocIndex:2},{value:" \u53EA\u80FD\u4FEE\u6539\u5355\u4E2A\u5C5E\u6027\u7684\u7279\u6027\uFF08\u901A\u8FC7 ",paraId:4,tocIndex:2},{value:"[[DefineOwnProperty]]",paraId:4,tocIndex:2},{value:"\uFF09\uFF0C\u62E6\u622A\u662F\u5C40\u90E8\u7684\u3002",paraId:4,tocIndex:2},{value:"Proxy \u53EF\u4EE5\u91CD\u5B9A\u4E49\u5BF9\u8C61\u7684",paraId:5,tocIndex:3},{value:"\u6240\u6709",paraId:5,tocIndex:3},{value:"\u5185\u90E8\u65B9\u6CD5\uFF1A",paraId:5,tocIndex:3},{value:`const obj = { name: '\u5F20\u4E09' };
const proxy = new Proxy(obj, {
  // \u62E6\u622A\u5C5E\u6027\u8BFB\u53D6
  get(target, key) {
    console.log(\`\u8BFB\u53D6\u5C5E\u6027: \${key}\`);
    return target[key];
  },
  // \u62E6\u622A\u5C5E\u6027\u8BBE\u7F6E
  set(target, key, value) {
    console.log(\`\u8BBE\u7F6E\u5C5E\u6027: \${key} = \${value}\`);
    target[key] = value;
    return true;
  },
  // \u62E6\u622A\u5C5E\u6027\u5220\u9664
  deleteProperty(target, key) {
    console.log(\`\u5220\u9664\u5C5E\u6027: \${key}\`);
    delete target[key];
    return true;
  },
  // \u8FD8\u53EF\u4EE5\u62E6\u622A\u5176\u4ED6 12 \u79CD\u64CD\u4F5C...
});

proxy.name; // \u62E6\u622A\u5230\u8BFB\u53D6
proxy.age = 25; // \u62E6\u622A\u5230\u8BBE\u7F6E
delete proxy.name; // \u62E6\u622A\u5230\u5220\u9664
`,paraId:6,tocIndex:3},{value:"Object.defineProperty",paraId:7,tocIndex:4},{value:" \u53EA\u80FD\u4E3A",paraId:7,tocIndex:4},{value:"\u5DF2\u5B58\u5728\u7684\u5355\u4E2A\u5C5E\u6027",paraId:7,tocIndex:4},{value:"\u5B9A\u4E49\u8BBF\u95EE\u5668\uFF08getter/setter\uFF09\uFF1A",paraId:7,tocIndex:4},{value:`const obj = { _name: '\u5F20\u4E09' };

Object.defineProperty(obj, 'name', {
  get() {
    console.log('\u8BFB\u53D6 name \u5C5E\u6027');
    return this._name;
  },
  set(value) {
    console.log('\u8BBE\u7F6E name \u5C5E\u6027');
    this._name = value;
  },
});

obj.name; // \u89E6\u53D1 getter
obj.name = '\u674E\u56DB'; // \u89E6\u53D1 setter
`,paraId:8,tocIndex:4},{value:"\u5B83\u7684\u5C40\u9650\u6027\uFF1A",paraId:9,tocIndex:4},{value:"\u53EA\u80FD\u62E6\u622A\u5DF2\u5B9A\u4E49\u7684\u5C5E\u6027",paraId:10,tocIndex:4},{value:"\uFF1A\u65E0\u6CD5\u62E6\u622A\u65B0\u589E\u5C5E\u6027",paraId:10,tocIndex:4},{value:"\u9700\u8981\u904D\u5386\u6240\u6709\u5C5E\u6027",paraId:10,tocIndex:4},{value:"\uFF1A\u8981\u62E6\u622A\u5BF9\u8C61\u7684\u6240\u6709\u5C5E\u6027\u9700\u8981\u9010\u4E2A\u5B9A\u4E49",paraId:10,tocIndex:4},{value:"\u65E0\u6CD5\u62E6\u622A\u6570\u7EC4\u65B9\u6CD5",paraId:10,tocIndex:4},{value:"\uFF1A",paraId:10,tocIndex:4},{value:"push",paraId:10,tocIndex:4},{value:"\u3001",paraId:10,tocIndex:4},{value:"pop",paraId:10,tocIndex:4},{value:" \u7B49\u64CD\u4F5C\u65E0\u6CD5\u62E6\u622A",paraId:10,tocIndex:4},{value:"\u65E0\u6CD5\u62E6\u622A\u5220\u9664\u64CD\u4F5C",paraId:10,tocIndex:4},{value:"\uFF1A",paraId:10,tocIndex:4},{value:"delete",paraId:10,tocIndex:4},{value:" \u64CD\u4F5C\u65E0\u6CD5\u62E6\u622A",paraId:10,tocIndex:4},{value:"\u65E0\u6CD5\u62E6\u622A\u539F\u578B\u64CD\u4F5C",paraId:10,tocIndex:4},{value:"\uFF1A\u65E0\u6CD5\u62E6\u622A\u539F\u578B\u94FE\u76F8\u5173\u64CD\u4F5C",paraId:10,tocIndex:4},{value:"\u65E0\u6CD5\u62E6\u622A in \u64CD\u4F5C\u7B26",paraId:10,tocIndex:4},{value:"\uFF1A\u65E0\u6CD5\u62E6\u622A\u5C5E\u6027\u5B58\u5728\u6027\u68C0\u67E5",paraId:10,tocIndex:4},{value:`const arr = [1, 2, 3];

// \u5C1D\u8BD5\u62E6\u622A\u6570\u7EC4\u957F\u5EA6\u53D8\u5316
Object.defineProperty(arr, 'length', {
  set(value) {
    console.log('\u957F\u5EA6\u53D8\u5316\u4E86');
    // \u6CE8\u610F\uFF1Alength \u5C5E\u6027\u662F\u4E0D\u53EF\u914D\u7F6E\u7684(configurable: false)
    // \u56E0\u6B64\u65E0\u6CD5\u91CD\u5B9A\u4E49\uFF0C\u8FD9\u6BB5\u4EE3\u7801\u4F1A\u62A5\u9519
  },
});

arr.push(4); // TypeError: Cannot redefine property: length
`,paraId:11,tocIndex:6},{value:`const arr = [1, 2, 3];
const proxyArr = new Proxy(arr, {
  get(target, key) {
    console.log(\`\u8BFB\u53D6: \${key}\`);
    return target[key];
  },
  set(target, key, value) {
    console.log(\`\u8BBE\u7F6E: \${key} = \${value}\`);
    target[key] = value;
    return true;
  },
});

proxyArr.push(1);
// \u8F93\u51FA\uFF1A
// \u8BFB\u53D6: push           (\u83B7\u53D6 push \u65B9\u6CD5)
// \u8BFB\u53D6: length         (push \u5185\u90E8\u8BFB\u53D6 length)
// \u8BBE\u7F6E: 3 = 1          (\u8BBE\u7F6E\u65B0\u5143\u7D20)
// \u8BBE\u7F6E: length = 4     (\u66F4\u65B0 length)
`,paraId:12,tocIndex:7},{value:`const proxy = new Proxy(target, handler);
`,paraId:13,tocIndex:9},{value:"target",paraId:14,tocIndex:9},{value:"\uFF1A\u8981\u4EE3\u7406\u7684\u76EE\u6807\u5BF9\u8C61\uFF08\u53EF\u4EE5\u662F\u4EFB\u4F55\u7C7B\u578B\uFF0C\u5305\u62EC\u6570\u7EC4\u3001\u51FD\u6570\u751A\u81F3\u53E6\u4E00\u4E2A\u4EE3\u7406\uFF09",paraId:14,tocIndex:9},{value:"handler",paraId:14,tocIndex:9},{value:"\uFF1A\u5904\u7406\u5668\u5BF9\u8C61\uFF0C\u5305\u542B\u5404\u79CD\u62E6\u622A\u65B9\u6CD5\uFF08trap\uFF09",paraId:14,tocIndex:9},{value:"\u62E6\u622A\u5C5E\u6027\u8BFB\u53D6\u64CD\u4F5C\u3002",paraId:15,tocIndex:11},{value:`const obj = { name: '\u5F20\u4E09' };
const proxy = new Proxy(obj, {
  get(target, property, receiver) {
    console.log(\`\u8BFB\u53D6\u5C5E\u6027: \${property}\`);
    return property in target ? target[property] : '\u9ED8\u8BA4\u503C';
  },
});

console.log(proxy.name); // \u8F93\u51FA: \u8BFB\u53D6\u5C5E\u6027: name, \u5F20\u4E09
console.log(proxy.age); // \u8F93\u51FA: \u8BFB\u53D6\u5C5E\u6027: age, \u9ED8\u8BA4\u503C
`,paraId:16,tocIndex:11},{value:"\u62E6\u622A\u64CD\u4F5C\uFF1A",paraId:17,tocIndex:11},{value:"obj.property",paraId:18,tocIndex:11},{value:"obj[property]",paraId:18,tocIndex:11},{value:"\u62E6\u622A\u5C5E\u6027\u8BBE\u7F6E\u64CD\u4F5C\u3002",paraId:19,tocIndex:12},{value:`const obj = {};
const proxy = new Proxy(obj, {
  set(target, property, value, receiver) {
    if (typeof value !== 'number') {
      throw new TypeError('\u5C5E\u6027\u503C\u5FC5\u987B\u662F\u6570\u5B57');
    }
    target[property] = value;
    return true; // \u5FC5\u987B\u8FD4\u56DE true \u8868\u793A\u8BBE\u7F6E\u6210\u529F
  },
});

proxy.age = 25; // \u6210\u529F
proxy.name = '\u5F20\u4E09'; // TypeError: \u5C5E\u6027\u503C\u5FC5\u987B\u662F\u6570\u5B57
`,paraId:20,tocIndex:12},{value:"\u62E6\u622A\u64CD\u4F5C\uFF1A",paraId:21,tocIndex:12},{value:"obj.property = value",paraId:22,tocIndex:12},{value:"obj[property] = value",paraId:22,tocIndex:12},{value:"\u62E6\u622A ",paraId:23,tocIndex:13},{value:"in",paraId:23,tocIndex:13},{value:" \u64CD\u4F5C\u7B26\u3002",paraId:23,tocIndex:13},{value:`const obj = { name: '\u5F20\u4E09', _secret: '\u5BC6\u7801' };
const proxy = new Proxy(obj, {
  has(target, property) {
    // \u9690\u85CF\u4E0B\u5212\u7EBF\u5F00\u5934\u7684\u79C1\u6709\u5C5E\u6027
    if (property.startsWith('_')) {
      return false;
    }
    return property in target;
  },
});

console.log('name' in proxy); // true
console.log('_secret' in proxy); // false
`,paraId:24,tocIndex:13},{value:"\u62E6\u622A\u64CD\u4F5C\uFF1A",paraId:25,tocIndex:13},{value:"property in obj",paraId:26,tocIndex:13},{value:"\u62E6\u622A\u5220\u9664\u5C5E\u6027\u64CD\u4F5C\u3002",paraId:27,tocIndex:14},{value:`const obj = { name: '\u5F20\u4E09', _id: 123 };
const proxy = new Proxy(obj, {
  deleteProperty(target, property) {
    if (property.startsWith('_')) {
      throw new Error('\u4E0D\u80FD\u5220\u9664\u79C1\u6709\u5C5E\u6027');
    }
    delete target[property];
    return true;
  },
});

delete proxy.name; // \u6210\u529F
delete proxy._id; // Error: \u4E0D\u80FD\u5220\u9664\u79C1\u6709\u5C5E\u6027
`,paraId:28,tocIndex:14},{value:"\u62E6\u622A\u64CD\u4F5C\uFF1A",paraId:29,tocIndex:14},{value:"delete obj.property",paraId:30,tocIndex:14},{value:"\u62E6\u622A\u83B7\u53D6\u5BF9\u8C61\u81EA\u8EAB\u5C5E\u6027\u952E\u7684\u64CD\u4F5C\u3002",paraId:31,tocIndex:15},{value:`const obj = { name: '\u5F20\u4E09', _secret: '\u5BC6\u7801', age: 25 };
const proxy = new Proxy(obj, {
  ownKeys(target) {
    // \u8FC7\u6EE4\u6389\u4E0B\u5212\u7EBF\u5F00\u5934\u7684\u5C5E\u6027
    return Object.keys(target).filter((key) => !key.startsWith('_'));
  },
});

console.log(Object.keys(proxy)); // ['name', 'age']
console.log(Object.getOwnPropertyNames(proxy)); // ['name', 'age']
`,paraId:32,tocIndex:15},{value:"\u62E6\u622A\u64CD\u4F5C\uFF1A",paraId:33,tocIndex:15},{value:"Object.keys()",paraId:34,tocIndex:15},{value:"Object.getOwnPropertyNames()",paraId:34,tocIndex:15},{value:"Object.getOwnPropertySymbols()",paraId:34,tocIndex:15},{value:"for...in",paraId:34,tocIndex:15},{value:" \u5FAA\u73AF",paraId:34,tocIndex:15},{value:"\u62E6\u622A\u83B7\u53D6\u5C5E\u6027\u63CF\u8FF0\u7B26\u7684\u64CD\u4F5C\u3002",paraId:35,tocIndex:16},{value:`const obj = { name: '\u5F20\u4E09' };
const proxy = new Proxy(obj, {
  getOwnPropertyDescriptor(target, property) {
    console.log(\`\u83B7\u53D6\u5C5E\u6027\u63CF\u8FF0\u7B26: \${property}\`);
    return Object.getOwnPropertyDescriptor(target, property);
  },
});

Object.getOwnPropertyDescriptor(proxy, 'name');
// \u8F93\u51FA: \u83B7\u53D6\u5C5E\u6027\u63CF\u8FF0\u7B26: name
`,paraId:36,tocIndex:16},{value:"\u62E6\u622A\u64CD\u4F5C\uFF1A",paraId:37,tocIndex:16},{value:"Object.getOwnPropertyDescriptor()",paraId:38,tocIndex:16},{value:"\u62E6\u622A\u5B9A\u4E49\u5C5E\u6027\u7684\u64CD\u4F5C\u3002",paraId:39,tocIndex:17},{value:`const obj = {};
const proxy = new Proxy(obj, {
  defineProperty(target, property, descriptor) {
    console.log(\`\u5B9A\u4E49\u5C5E\u6027: \${property}\`);
    return Object.defineProperty(target, property, descriptor);
  },
});

Object.defineProperty(proxy, 'name', { value: '\u5F20\u4E09' });
// \u8F93\u51FA: \u5B9A\u4E49\u5C5E\u6027: name
`,paraId:40,tocIndex:17},{value:"\u62E6\u622A\u64CD\u4F5C\uFF1A",paraId:41,tocIndex:17},{value:"Object.defineProperty()",paraId:42,tocIndex:17},{value:"\u62E6\u622A\u83B7\u53D6\u539F\u578B\u7684\u64CD\u4F5C\u3002",paraId:43,tocIndex:18},{value:`const obj = {};
const proxy = new Proxy(obj, {
  getPrototypeOf(target) {
    console.log('\u83B7\u53D6\u539F\u578B');
    return Object.getPrototypeOf(target);
  },
});

Object.getPrototypeOf(proxy);
// \u8F93\u51FA: \u83B7\u53D6\u539F\u578B
`,paraId:44,tocIndex:18},{value:"\u62E6\u622A\u64CD\u4F5C\uFF1A",paraId:45,tocIndex:18},{value:"Object.getPrototypeOf()",paraId:46,tocIndex:18},{value:"__proto__",paraId:46,tocIndex:18},{value:"instanceof",paraId:46,tocIndex:18},{value:"\u62E6\u622A\u8BBE\u7F6E\u539F\u578B\u7684\u64CD\u4F5C\u3002",paraId:47,tocIndex:19},{value:`const obj = {};
const proxy = new Proxy(obj, {
  setPrototypeOf(target, proto) {
    console.log('\u8BBE\u7F6E\u539F\u578B');
    return Object.setPrototypeOf(target, proto);
  },
});

Object.setPrototypeOf(proxy, {});
// \u8F93\u51FA: \u8BBE\u7F6E\u539F\u578B
`,paraId:48,tocIndex:19},{value:"\u62E6\u622A\u64CD\u4F5C\uFF1A",paraId:49,tocIndex:19},{value:"Object.setPrototypeOf()",paraId:50,tocIndex:19},{value:"\u62E6\u622A\u68C0\u67E5\u5BF9\u8C61\u662F\u5426\u53EF\u6269\u5C55\u7684\u64CD\u4F5C\u3002",paraId:51,tocIndex:20},{value:`const obj = {};
const proxy = new Proxy(obj, {
  isExtensible(target) {
    console.log('\u68C0\u67E5\u662F\u5426\u53EF\u6269\u5C55');
    return Object.isExtensible(target);
  },
});

Object.isExtensible(proxy);
// \u8F93\u51FA: \u68C0\u67E5\u662F\u5426\u53EF\u6269\u5C55
`,paraId:52,tocIndex:20},{value:"\u62E6\u622A\u64CD\u4F5C\uFF1A",paraId:53,tocIndex:20},{value:"Object.isExtensible()",paraId:54,tocIndex:20},{value:"\u62E6\u622A\u963B\u6B62\u5BF9\u8C61\u6269\u5C55\u7684\u64CD\u4F5C\u3002",paraId:55,tocIndex:21},{value:`const obj = {};
const proxy = new Proxy(obj, {
  preventExtensions(target) {
    console.log('\u963B\u6B62\u6269\u5C55');
    return Object.preventExtensions(target);
  },
});

Object.preventExtensions(proxy);
// \u8F93\u51FA: \u963B\u6B62\u6269\u5C55
`,paraId:56,tocIndex:21},{value:"\u62E6\u622A\u64CD\u4F5C\uFF1A",paraId:57,tocIndex:21},{value:"Object.preventExtensions()",paraId:58,tocIndex:21},{value:"\u62E6\u622A\u51FD\u6570\u8C03\u7528\u64CD\u4F5C\uFF08\u4EC5\u5BF9\u51FD\u6570\u5BF9\u8C61\u6709\u6548\uFF09\u3002",paraId:59,tocIndex:22},{value:`function sum(a, b) {
  return a + b;
}

const proxy = new Proxy(sum, {
  apply(target, thisArg, args) {
    console.log(\`\u8C03\u7528\u51FD\u6570\uFF0C\u53C2\u6570: \${args}\`);
    return target.apply(thisArg, args);
  },
});

proxy(1, 2); // \u8F93\u51FA: \u8C03\u7528\u51FD\u6570\uFF0C\u53C2\u6570: 1,2  \u8FD4\u56DE: 3
`,paraId:60,tocIndex:22},{value:"\u62E6\u622A\u64CD\u4F5C\uFF1A",paraId:61,tocIndex:22},{value:"func(...args)",paraId:62,tocIndex:22},{value:"func.call()",paraId:62,tocIndex:22},{value:"func.apply()",paraId:62,tocIndex:22},{value:"\u62E6\u622A ",paraId:63,tocIndex:23},{value:"new",paraId:63,tocIndex:23},{value:" \u64CD\u4F5C\u7B26\uFF08\u4EC5\u5BF9\u6784\u9020\u51FD\u6570\u6709\u6548\uFF09\u3002",paraId:63,tocIndex:23},{value:`function Person(name) {
  this.name = name;
}

const ProxyPerson = new Proxy(Person, {
  construct(target, args, newTarget) {
    console.log(\`\u521B\u5EFA\u5B9E\u4F8B\uFF0C\u53C2\u6570: \${args}\`);
    return new target(...args);
  },
});

const person = new ProxyPerson('\u5F20\u4E09');
// \u8F93\u51FA: \u521B\u5EFA\u5B9E\u4F8B\uFF0C\u53C2\u6570: \u5F20\u4E09
`,paraId:64,tocIndex:23},{value:"\u62E6\u622A\u64CD\u4F5C\uFF1A",paraId:65,tocIndex:23},{value:"new func(...args)",paraId:66,tocIndex:23},{value:'Proxy \u6709\u4E00\u4E9B\u4E0D\u53EF\u8FDD\u53CD\u7684\u89C4\u5219\uFF0C\u79F0\u4E3A"\u4E0D\u53D8\u5F0F"\uFF1A',paraId:67,tocIndex:24},{value:`const obj = {};
Object.defineProperty(obj, 'name', {
  value: '\u5F20\u4E09',
  writable: false,
  configurable: false,
});

const proxy = new Proxy(obj, {
  get(target, property) {
    // \u8FDD\u53CD\u4E0D\u53D8\u5F0F\uFF1A\u4E0D\u53EF\u914D\u7F6E\u4E14\u4E0D\u53EF\u5199\u7684\u5C5E\u6027\u5FC5\u987B\u8FD4\u56DE\u76F8\u540C\u7684\u503C
    return '\u674E\u56DB';
  },
});

proxy.name; // TypeError: 'get' on proxy: property 'name' is a read-only and non-configurable data property on the proxy target but the proxy did not return its actual value
`,paraId:68,tocIndex:24},{value:"\u4E3B\u8981\u4E0D\u53D8\u5F0F\uFF1A",paraId:69,tocIndex:24},{value:"\u5982\u679C\u76EE\u6807\u5C5E\u6027\u4E0D\u53EF\u5199\u4E14\u4E0D\u53EF\u914D\u7F6E\uFF0C",paraId:70,tocIndex:24},{value:"get",paraId:70,tocIndex:24},{value:" \u5FC5\u987B\u8FD4\u56DE\u8BE5\u5C5E\u6027\u7684\u5B9E\u9645\u503C",paraId:70,tocIndex:24},{value:"\u5982\u679C\u76EE\u6807\u5C5E\u6027\u4E0D\u53EF\u914D\u7F6E\u4E14\u6CA1\u6709 setter\uFF0C",paraId:70,tocIndex:24},{value:"get",paraId:70,tocIndex:24},{value:" \u5FC5\u987B\u8FD4\u56DE\u8BE5\u5C5E\u6027\u7684\u5B9E\u9645\u503C",paraId:70,tocIndex:24},{value:"\u5982\u679C\u76EE\u6807\u5C5E\u6027\u4E0D\u53EF\u5199\u4E14\u4E0D\u53EF\u914D\u7F6E\uFF0C",paraId:70,tocIndex:24},{value:"set",paraId:70,tocIndex:24},{value:" \u5FC5\u987B\u8FD4\u56DE false",paraId:70,tocIndex:24},{value:"\u5982\u679C\u76EE\u6807\u5BF9\u8C61\u4E0D\u53EF\u6269\u5C55\uFF0C",paraId:70,tocIndex:24},{value:"preventExtensions",paraId:70,tocIndex:24},{value:" \u5FC5\u987B\u8FD4\u56DE true",paraId:70,tocIndex:24},{value:"\u5982\u679C\u76EE\u6807\u5BF9\u8C61\u4E0D\u53EF\u6269\u5C55\uFF0C",paraId:70,tocIndex:24},{value:"isExtensible",paraId:70,tocIndex:24},{value:" \u5FC5\u987B\u8FD4\u56DE false",paraId:70,tocIndex:24},{value:"\u521B\u5EFA\u53EF\u64A4\u9500\u7684\u4EE3\u7406\u3002",paraId:71,tocIndex:25},{value:`const obj = { name: '\u5F20\u4E09' };
const { proxy, revoke } = Proxy.revocable(obj, {
  get(target, property) {
    return target[property];
  },
});

console.log(proxy.name); // \u5F20\u4E09

// \u64A4\u9500\u4EE3\u7406
revoke();

console.log(proxy.name); // TypeError: Cannot perform 'get' on a proxy that has been revoked
`,paraId:72,tocIndex:25},{value:"\u4F7F\u7528\u573A\u666F\uFF1A",paraId:73,tocIndex:25},{value:"\u4E34\u65F6\u6388\u6743\u8BBF\u95EE\u5BF9\u8C61",paraId:74,tocIndex:25},{value:"\u9700\u8981\u80FD\u591F\u4E3B\u52A8\u5207\u65AD\u4EE3\u7406\u7684\u573A\u666F",paraId:74,tocIndex:25},{value:"\u5185\u5B58\u7BA1\u7406\uFF08\u64A4\u9500\u540E\u53EF\u4EE5\u88AB\u5783\u573E\u56DE\u6536\uFF09",paraId:74,tocIndex:25},{value:"Reflect \u662F ES6 \u5F15\u5165\u7684\u5185\u7F6E\u5BF9\u8C61\uFF0C\u5176\u672C\u8D28\u662F\uFF1A",paraId:75,tocIndex:27},{value:"\u63D0\u4F9B\u4E86\u76F4\u63A5\u8C03\u7528 JavaScript \u5BF9\u8C61\u5185\u90E8\u65B9\u6CD5\u7684\u80FD\u529B",paraId:75,tocIndex:27},{value:"\u3002",paraId:75,tocIndex:27},{value:"\u5728 JavaScript \u89C4\u8303\u4E2D\uFF0C\u6240\u6709\u5BF9\u5BF9\u8C61\u7684\u64CD\u4F5C\u6700\u7EC8\u90FD\u4F1A\u8F6C\u5316\u4E3A\u5BF9",paraId:76,tocIndex:28},{value:"\u5185\u90E8\u65B9\u6CD5",paraId:76,tocIndex:28},{value:"\u7684\u8C03\u7528\uFF1A",paraId:76,tocIndex:28},{value:`const obj = { a: 1 };

// \u8BED\u6CD5\u5C42\u9762
obj.a = 2;
console.log(obj.a);

// \u5B9E\u9645\u8C03\u7528\u7684\u5185\u90E8\u65B9\u6CD5
[[Set]](obj, 'a', 2)[[Get]](obj, 'a');

// Reflect \u76F4\u63A5\u8C03\u7528\u5185\u90E8\u65B9\u6CD5
Reflect.set(obj, 'a', 2);
Reflect.get(obj, 'a');
`,paraId:77,tocIndex:28},{value:"Reflect \u5141\u8BB8\u63A7\u5236\u5185\u90E8\u65B9\u6CD5\u7684\u53C2\u6570\uFF0C\u7279\u522B\u662F ",paraId:78,tocIndex:30},{value:"receiver",paraId:78,tocIndex:30},{value:" \u53C2\u6570\uFF1A",paraId:78,tocIndex:30},{value:`const obj = {
  a: 1,
  b: 2,
  get c() {
    return this.a + this.b;
  },
};

// \u5E38\u89C4\u8BED\u6CD5 - this \u81EA\u52A8\u7ED1\u5B9A\u5230 obj
console.log(obj.c); // 3

// Reflect \u65B9\u5F0F - \u53EF\u4EE5\u624B\u52A8\u6307\u5B9A receiver\uFF08this \u6307\u5411\uFF09
const other = { a: 3, b: 4 };
console.log(Reflect.get(obj, 'c', other)); // 7
`,paraId:79,tocIndex:30},{value:"Reflect \u65B9\u6CD5\u8FD4\u56DE\u5E03\u5C14\u503C\u8868\u793A\u64CD\u4F5C\u6210\u529F\u4E0E\u5426\uFF0C\u800C\u4E0D\u662F\u629B\u51FA\u5F02\u5E38\uFF1A",paraId:80,tocIndex:31},{value:`const obj = {};
Object.defineProperty(obj, 'readonly', {
  value: 1,
  writable: false,
  configurable: false,
});

// Object.defineProperty - \u5931\u8D25\u65F6\u629B\u51FA\u9519\u8BEF
try {
  Object.defineProperty(obj, 'readonly', { value: 2 });
  console.log('\u6210\u529F');
} catch (e) {
  console.log('\u5931\u8D25'); // \u6267\u884C\u8FD9\u91CC
}

// Reflect.defineProperty - \u8FD4\u56DE\u5E03\u5C14\u503C
const success = Reflect.defineProperty(obj, 'readonly', { value: 2 });
if (success) {
  console.log('\u6210\u529F');
} else {
  console.log('\u5931\u8D25'); // \u6267\u884C\u8FD9\u91CC
}
`,paraId:81,tocIndex:31},{value:"Reflect \u63D0\u4F9B\u4E86\u83B7\u53D6\u6240\u6709\u5C5E\u6027\u7684\u65B9\u6CD5\uFF1A",paraId:82,tocIndex:32},{value:`const obj = {};

// \u6DFB\u52A0\u666E\u901A\u5C5E\u6027
obj.a = 1;

// \u6DFB\u52A0\u4E0D\u53EF\u679A\u4E3E\u5C5E\u6027
Object.defineProperty(obj, 'b', {
  value: 2,
  enumerable: false,
});

// \u6DFB\u52A0 Symbol \u5C5E\u6027
const sym = Symbol('c');
obj[sym] = 3;

// Object.keys - \u53EA\u8FD4\u56DE\u53EF\u679A\u4E3E\u7684\u5B57\u7B26\u4E32\u5C5E\u6027
console.log(Object.keys(obj)); // ['a']

// Reflect.ownKeys - \u8FD4\u56DE\u6240\u6709\u81EA\u8EAB\u5C5E\u6027\uFF08\u5305\u62EC\u4E0D\u53EF\u679A\u4E3E\u548C Symbol\uFF09
console.log(Reflect.ownKeys(obj)); // ['a', 'b', Symbol(c)]
`,paraId:83,tocIndex:32},{value:"\u8FD9\u662F Reflect \u6700\u91CD\u8981\u7684\u5E94\u7528\u573A\u666F\uFF1A",paraId:84,tocIndex:34},{value:`const obj = {
  a: 1,
  b: 2,
  get sum() {
    return this.a + this.b;
  },
};

// \u274C \u9519\u8BEF\u65B9\u5F0F\uFF1Athis \u4F1A\u6307\u5411 target
const badProxy = new Proxy(obj, {
  get(target, property) {
    console.log(\`\u8BFB\u53D6\u5C5E\u6027: \${property}\`);
    return target[property]; // getter \u4E2D\u7684 this \u6307\u5411 target
  },
});

console.log(badProxy.sum);
// \u8F93\u51FA\uFF1A
// \u8BFB\u53D6\u5C5E\u6027: sum
// 3
// \u6CE8\u610F\uFF1A\u8BBF\u95EE sum \u65F6\u89E6\u53D1\u4E86 getter\uFF0C\u4F46\u8BBF\u95EE this.a \u548C this.b \u65F6\u6CA1\u6709\u89E6\u53D1\u62E6\u622A

// \u2705 \u6B63\u786E\u65B9\u5F0F\uFF1A\u4F7F\u7528 Reflect \u4F20\u9012 receiver
const goodProxy = new Proxy(obj, {
  get(target, property, receiver) {
    console.log(\`\u8BFB\u53D6\u5C5E\u6027: \${property}\`);
    return Reflect.get(target, property, receiver); // getter \u4E2D\u7684 this \u6307\u5411 receiver\uFF08\u5373 proxy\uFF09
  },
});

console.log(goodProxy.sum);
// \u8F93\u51FA\uFF1A
// \u8BFB\u53D6\u5C5E\u6027: sum
// \u8BFB\u53D6\u5C5E\u6027: a    \u2190 \u89E6\u53D1\u4E86\u62E6\u622A\uFF01
// \u8BFB\u53D6\u5C5E\u6027: b    \u2190 \u89E6\u53D1\u4E86\u62E6\u622A\uFF01
// 3
`,paraId:85,tocIndex:34},{value:`const obj = {};

const proxy = new Proxy(obj, {
  set(target, property, value, receiver) {
    console.log(\`\u8BBE\u7F6E: \${property} = \${value}\`);
    // \u4F7F\u7528 Reflect \u786E\u4FDD\u8FD4\u56DE\u503C\u6B63\u786E
    return Reflect.set(target, property, value, receiver);
  },
});

proxy.name = '\u5F20\u4E09';
`,paraId:86,tocIndex:35},{value:"\u5185\u90E8\u65B9\u6CD5",paraId:87,tocIndex:36},{value:"Reflect \u65B9\u6CD5",paraId:87,tocIndex:36},{value:"\u5BF9\u5E94\u64CD\u4F5C",paraId:87,tocIndex:36},{value:"[[Get]]",paraId:87,tocIndex:36},{value:"Reflect.get()",paraId:87,tocIndex:36},{value:"obj.property",paraId:87,tocIndex:36},{value:"[[Set]]",paraId:87,tocIndex:36},{value:"Reflect.set()",paraId:87,tocIndex:36},{value:"obj.property = value",paraId:87,tocIndex:36},{value:"[[HasProperty]]",paraId:87,tocIndex:36},{value:"Reflect.has()",paraId:87,tocIndex:36},{value:"property in obj",paraId:87,tocIndex:36},{value:"[[Delete]]",paraId:87,tocIndex:36},{value:"Reflect.deleteProperty()",paraId:87,tocIndex:36},{value:"delete obj.property",paraId:87,tocIndex:36},{value:"[[OwnPropertyKeys]]",paraId:87,tocIndex:36},{value:"Reflect.ownKeys()",paraId:87,tocIndex:36},{value:"Object.keys()",paraId:87,tocIndex:36},{value:"[[GetPrototypeOf]]",paraId:87,tocIndex:36},{value:"Reflect.getPrototypeOf()",paraId:87,tocIndex:36},{value:"Object.getPrototypeOf()",paraId:87,tocIndex:36},{value:"[[SetPrototypeOf]]",paraId:87,tocIndex:36},{value:"Reflect.setPrototypeOf()",paraId:87,tocIndex:36},{value:"Object.setPrototypeOf()",paraId:87,tocIndex:36},{value:"[[IsExtensible]]",paraId:87,tocIndex:36},{value:"Reflect.isExtensible()",paraId:87,tocIndex:36},{value:"Object.isExtensible()",paraId:87,tocIndex:36},{value:"[[PreventExtensions]]",paraId:87,tocIndex:36},{value:"Reflect.preventExtensions()",paraId:87,tocIndex:36},{value:"Object.preventExtensions()",paraId:87,tocIndex:36},{value:"[[DefineOwnProperty]]",paraId:87,tocIndex:36},{value:"Reflect.defineProperty()",paraId:87,tocIndex:36},{value:"Object.defineProperty()",paraId:87,tocIndex:36},{value:"[[GetOwnProperty]]",paraId:87,tocIndex:36},{value:"Reflect.getOwnPropertyDescriptor()",paraId:87,tocIndex:36},{value:"Object.getOwnPropertyDescriptor()",paraId:87,tocIndex:36},{value:"[[Call]]",paraId:87,tocIndex:36},{value:"Reflect.apply()",paraId:87,tocIndex:36},{value:"func.apply()",paraId:87,tocIndex:36},{value:"[[Construct]]",paraId:87,tocIndex:36},{value:"Reflect.construct()",paraId:87,tocIndex:36},{value:"new Constructor()",paraId:87,tocIndex:36},{value:"\u76F4\u63A5\u6027",paraId:88,tocIndex:37},{value:"\uFF1A\u7ED5\u8FC7\u8BED\u6CD5\u7CD6\uFF0C\u76F4\u63A5\u8C03\u7528\u5BF9\u8C61\u7684\u5185\u90E8\u65B9\u6CD5",paraId:88,tocIndex:37},{value:"\u53EF\u63A7\u6027",paraId:88,tocIndex:37},{value:"\uFF1A\u63D0\u4F9B\u66F4\u7CBE\u7EC6\u7684\u53C2\u6570\u63A7\u5236\uFF08\u5982 receiver\uFF09",paraId:88,tocIndex:37},{value:"\u4E00\u81F4\u6027",paraId:88,tocIndex:37},{value:"\uFF1A\u7EDF\u4E00\u7684\u8FD4\u56DE\u503C\u8BBE\u8BA1\uFF08\u5E03\u5C14\u503C\u8868\u793A\u6210\u529F\u4E0E\u5426\uFF09",paraId:88,tocIndex:37},{value:"\u5B8C\u6574\u6027",paraId:88,tocIndex:37},{value:"\uFF1A\u63D0\u4F9B\u5BF9\u5BF9\u8C61\u6240\u6709\u5185\u90E8\u65B9\u6CD5\u7684\u76F4\u63A5\u8BBF\u95EE",paraId:88,tocIndex:37},{value:`function createValidator(schema) {
  return new Proxy(
    {},
    {
      set(target, property, value) {
        const validator = schema[property];
        if (validator && !validator(value)) {
          throw new Error(\`\${property} \u9A8C\u8BC1\u5931\u8D25\`);
        }
        target[property] = value;
        return true;
      },
    },
  );
}

const user = createValidator({
  age: (value) => typeof value === 'number' && value >= 0 && value <= 150,
  email: (value) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value),
});

user.age = 25; // \u6210\u529F
user.email = 'test@example.com'; // \u6210\u529F
user.age = -1; // Error: age \u9A8C\u8BC1\u5931\u8D25
user.email = 'invalid'; // Error: email \u9A8C\u8BC1\u5931\u8D25
`,paraId:89,tocIndex:39},{value:`function createNegativeArray(arr) {
  return new Proxy(arr, {
    get(target, property, receiver) {
      const index = Number(property);
      if (index < 0) {
        property = String(target.length + index);
      }
      return Reflect.get(target, property, receiver);
    },
  });
}

const arr = createNegativeArray([1, 2, 3, 4, 5]);
console.log(arr[-1]); // 5
console.log(arr[-2]); // 4
`,paraId:90,tocIndex:40},{value:`function createLogger(obj, name = 'Object') {
  return new Proxy(obj, {
    get(target, property, receiver) {
      console.log(\`[\${name}] GET \${String(property)}\`);
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      console.log(\`[\${name}] SET \${String(property)} = \${value}\`);
      return Reflect.set(target, property, value, receiver);
    },
  });
}

const user = createLogger({ name: '\u5F20\u4E09' }, 'User');
user.name; // [User] GET name
user.age = 25; // [User] SET age = 25
`,paraId:91,tocIndex:41},{value:`function createCachedFunction(fn) {
  const cache = new Map();
  return new Proxy(fn, {
    apply(target, thisArg, args) {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        console.log('\u4ECE\u7F13\u5B58\u8BFB\u53D6');
        return cache.get(key);
      }
      const result = Reflect.apply(target, thisArg, args);
      cache.set(key, result);
      return result;
    },
  });
}

const fibonacci = createCachedFunction(function (n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(10)); // \u8BA1\u7B97
console.log(fibonacci(10)); // \u4ECE\u7F13\u5B58\u8BFB\u53D6
`,paraId:92,tocIndex:42},{value:`function createPrivateProxy(obj) {
  return new Proxy(obj, {
    get(target, property) {
      if (property.startsWith('_')) {
        throw new Error('\u65E0\u6CD5\u8BBF\u95EE\u79C1\u6709\u5C5E\u6027');
      }
      return target[property];
    },
    set(target, property, value) {
      if (property.startsWith('_')) {
        throw new Error('\u65E0\u6CD5\u8BBE\u7F6E\u79C1\u6709\u5C5E\u6027');
      }
      target[property] = value;
      return true;
    },
    has(target, property) {
      return !property.startsWith('_') && property in target;
    },
    ownKeys(target) {
      return Object.keys(target).filter((key) => !key.startsWith('_'));
    },
  });
}

const obj = createPrivateProxy({
  name: '\u5F20\u4E09',
  _id: 123,
});

console.log(obj.name); // \u5F20\u4E09
console.log(obj._id); // Error: \u65E0\u6CD5\u8BBF\u95EE\u79C1\u6709\u5C5E\u6027
console.log('_id' in obj); // false
console.log(Object.keys(obj)); // ['name']
`,paraId:93,tocIndex:43},{value:`function reactive(obj) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      // \u6536\u96C6\u4F9D\u8D56
      track(target, property);
      const value = Reflect.get(target, property, receiver);
      // \u5982\u679C\u503C\u662F\u5BF9\u8C61\uFF0C\u9012\u5F52\u4EE3\u7406
      if (typeof value === 'object' && value !== null) {
        return reactive(value);
      }
      return value;
    },
    set(target, property, value, receiver) {
      const result = Reflect.set(target, property, value, receiver);
      // \u89E6\u53D1\u66F4\u65B0
      trigger(target, property);
      return result;
    },
  });
}

// \u7B80\u5316\u7684\u4F9D\u8D56\u6536\u96C6\u548C\u89E6\u53D1
const targetMap = new WeakMap();
let activeEffect = null;

function track(target, property) {
  if (!activeEffect) return;
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(property);
  if (!dep) {
    depsMap.set(property, (dep = new Set()));
  }
  dep.add(activeEffect);
}

function trigger(target, property) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const dep = depsMap.get(property);
  if (dep) {
    dep.forEach((effect) => effect());
  }
}

function watchEffect(effect) {
  activeEffect = effect;
  effect();
  activeEffect = null;
}

// \u4F7F\u7528\u793A\u4F8B
const state = reactive({ count: 0 });

watchEffect(() => {
  console.log(\`count \u53D8\u5316\u4E86: \${state.count}\`);
});

state.count++; // count \u53D8\u5316\u4E86: 1
state.count++; // count \u53D8\u5316\u4E86: 2
`,paraId:94,tocIndex:44},{value:`function singleton(className) {
  let instance;
  return new Proxy(className, {
    construct(target, args) {
      if (!instance) {
        instance = Reflect.construct(target, args);
      }
      return instance;
    },
  });
}

class Database {
  constructor() {
    this.connection = Math.random();
  }
}

const DatabaseSingleton = singleton(Database);

const db1 = new DatabaseSingleton();
const db2 = new DatabaseSingleton();

console.log(db1 === db2); // true
console.log(db1.connection === db2.connection); // true
`,paraId:95,tocIndex:45},{value:"Proxy \u6709\u6027\u80FD\u5F00\u9500",paraId:96,tocIndex:47},{value:`// \u521B\u5EFA\u5927\u91CF\u4EE3\u7406\u4F1A\u5F71\u54CD\u6027\u80FD
const arr = new Array(10000).fill(0).map((_, i) => i);

// \u274C \u4E0D\u63A8\u8350\uFF1A\u4E3A\u6BCF\u4E2A\u5143\u7D20\u521B\u5EFA\u4EE3\u7406
const proxies = arr.map((item) => new Proxy({ value: item }, {}));

// \u2705 \u63A8\u8350\uFF1A\u53EA\u4E3A\u5BB9\u5668\u521B\u5EFA\u4EE3\u7406
const proxyArr = new Proxy(arr, {});
`,paraId:97,tocIndex:47},{value:"\u907F\u514D\u4E0D\u5FC5\u8981\u7684\u62E6\u622A",paraId:98,tocIndex:47},{value:`// \u274C \u4E0D\u63A8\u8350\uFF1A\u62E6\u622A\u6240\u6709\u64CD\u4F5C\u4F46\u6CA1\u6709\u81EA\u5B9A\u4E49\u903B\u8F91
const proxy = new Proxy(obj, {
  get(target, property, receiver) {
    return Reflect.get(target, property, receiver);
  },
});

// \u2705 \u63A8\u8350\uFF1A\u53EA\u62E6\u622A\u9700\u8981\u7684\u64CD\u4F5C
const proxy = new Proxy(obj, {
  set(target, property, value, receiver) {
    // \u53EA\u5728 set \u65F6\u6DFB\u52A0\u903B\u8F91
    console.log(\`\u8BBE\u7F6E \${property}\`);
    return Reflect.set(target, property, value, receiver);
  },
});
`,paraId:99,tocIndex:47},{value:"\u9012\u5F52\u4EE3\u7406\u9700\u8C28\u614E",paraId:100,tocIndex:47},{value:`// \u274C \u4E0D\u63A8\u8350\uFF1A\u6BCF\u6B21\u8BBF\u95EE\u90FD\u521B\u5EFA\u65B0\u4EE3\u7406
function reactive(obj) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      const value = Reflect.get(target, property, receiver);
      if (typeof value === 'object') {
        return reactive(value); // \u6BCF\u6B21\u90FD\u521B\u5EFA\u65B0\u4EE3\u7406
      }
      return value;
    },
  });
}

// \u2705 \u63A8\u8350\uFF1A\u7F13\u5B58\u5DF2\u521B\u5EFA\u7684\u4EE3\u7406
const proxyCache = new WeakMap();
function reactive(obj) {
  if (proxyCache.has(obj)) {
    return proxyCache.get(obj);
  }
  const proxy = new Proxy(obj, {
    get(target, property, receiver) {
      const value = Reflect.get(target, property, receiver);
      if (typeof value === 'object' && value !== null) {
        return reactive(value);
      }
      return value;
    },
  });
  proxyCache.set(obj, proxy);
  return proxy;
}
`,paraId:101,tocIndex:47},{value:"\u5728 Proxy \u7684 trap \u4E2D\uFF0C\u59CB\u7EC8\u4F7F\u7528 Reflect \u5B8C\u6210\u9ED8\u8BA4\u64CD\u4F5C\uFF1A",paraId:102,tocIndex:49},{value:`// \u2705 \u63A8\u8350
const proxy = new Proxy(obj, {
  get(target, property, receiver) {
    // \u81EA\u5B9A\u4E49\u903B\u8F91
    console.log(\`\u8BBF\u95EE \${property}\`);
    // \u4F7F\u7528 Reflect \u5B8C\u6210\u9ED8\u8BA4\u64CD\u4F5C
    return Reflect.get(target, property, receiver);
  },
});
`,paraId:103,tocIndex:49},{value:"\u786E\u4FDD trap \u7684\u884C\u4E3A\u7B26\u5408 Proxy \u7684\u4E0D\u53D8\u5F0F\uFF1A",paraId:104,tocIndex:50},{value:`const obj = {};
Object.defineProperty(obj, 'readonly', {
  value: 1,
  writable: false,
  configurable: false,
});

// \u274C \u9519\u8BEF\uFF1A\u8FDD\u53CD\u4E0D\u53D8\u5F0F
const proxy = new Proxy(obj, {
  get(target, property) {
    if (property === 'readonly') {
      return 999; // \u9519\u8BEF\uFF1A\u4E0D\u53EF\u914D\u7F6E\u7684\u5C5E\u6027\u5FC5\u987B\u8FD4\u56DE\u76F8\u540C\u7684\u503C
    }
    return target[property];
  },
});

// \u2705 \u6B63\u786E\uFF1A\u9075\u5B88\u4E0D\u53D8\u5F0F
const proxy = new Proxy(obj, {
  get(target, property, receiver) {
    console.log(\`\u8BBF\u95EE \${property}\`);
    return Reflect.get(target, property, receiver); // \u8FD4\u56DE\u5B9E\u9645\u503C
  },
});
`,paraId:105,tocIndex:50},{value:"\u67D0\u4E9B trap \u5FC5\u987B\u8FD4\u56DE\u7279\u5B9A\u7C7B\u578B\u7684\u503C\uFF1A",paraId:106,tocIndex:51},{value:`const proxy = new Proxy(obj, {
  // set \u5FC5\u987B\u8FD4\u56DE\u5E03\u5C14\u503C
  set(target, property, value, receiver) {
    target[property] = value;
    return true; // \u5FC5\u987B\u8FD4\u56DE true \u8868\u793A\u6210\u529F
  },

  // deleteProperty \u5FC5\u987B\u8FD4\u56DE\u5E03\u5C14\u503C
  deleteProperty(target, property) {
    delete target[property];
    return true; // \u5FC5\u987B\u8FD4\u56DE true \u8868\u793A\u6210\u529F
  },

  // has \u5FC5\u987B\u8FD4\u56DE\u5E03\u5C14\u503C
  has(target, property) {
    return property in target; // \u5FC5\u987B\u8FD4\u56DE\u5E03\u5C14\u503C
  },
});
`,paraId:107,tocIndex:51},{value:"\u4E0D\u8981\u5FD8\u8BB0\u5904\u7406 Symbol \u5C5E\u6027\uFF1A",paraId:108,tocIndex:52},{value:`const proxy = new Proxy(obj, {
  ownKeys(target) {
    // \u2705 \u6B63\u786E\uFF1A\u5305\u542B Symbol \u5C5E\u6027
    return Reflect.ownKeys(target);

    // \u274C \u9519\u8BEF\uFF1A\u53EA\u8FD4\u56DE\u5B57\u7B26\u4E32\u5C5E\u6027
    // return Object.keys(target);
  },
});
`,paraId:109,tocIndex:52},{value:"ES6 Proxy \u91CC\u9762\u4E3A\u4EC0\u4E48\u8981\u7528 Reflect\uFF1F",paraId:110,tocIndex:53},{value:"ES6 Proxy \u7684 trap \u7ED3\u679C\u68C0\u6D4B\u662F\u4E00\u79CD\u6027\u80FD\u6D6A\u8D39\u8FD8\u662F\u4F18\u5316\uFF1F",paraId:110,tocIndex:53},{value:"JavaScript \u7684 Proxy \u600E\u4E48\u4EE3\u7406 Map\uFF1F",paraId:110,tocIndex:53},{value:"\u5173\u4E8E Proxy \u4EE3\u7406\u6570\u7EC4\u7684\u6027\u80FD\u95EE\u9898\uFF1F",paraId:110,tocIndex:53},{value:"Proxy",paraId:111,tocIndex:55},{value:"\uFF1A\u62E6\u622A\u5BF9\u8C61\u7684 13 \u79CD\u5185\u90E8\u64CD\u4F5C\uFF0C\u529F\u80FD\u5168\u9762\uFF0C\u9002\u5408\u6784\u5EFA\u54CD\u5E94\u5F0F\u7CFB\u7EDF",paraId:111,tocIndex:55},{value:"defineProperty",paraId:111,tocIndex:55},{value:"\uFF1A\u53EA\u80FD\u4FEE\u6539\u5355\u4E2A\u5C5E\u6027\u7684\u8BBF\u95EE\u5668\uFF0C\u529F\u80FD\u6709\u9650\uFF0C\u4E3B\u8981\u7528\u4E8E\u5C5E\u6027\u7EA7\u522B\u7684\u63A7\u5236",paraId:111,tocIndex:55},{value:"\u63D0\u4F9B\u76F4\u63A5\u8C03\u7528\u5BF9\u8C61\u5185\u90E8\u65B9\u6CD5\u7684\u80FD\u529B",paraId:112,tocIndex:56},{value:"\u786E\u4FDD Proxy \u4E2D\u7684 this \u7ED1\u5B9A\u6B63\u786E",paraId:112,tocIndex:56},{value:"\u63D0\u4F9B\u66F4\u4E00\u81F4\u7684 API\uFF08\u8FD4\u56DE\u5E03\u5C14\u503C\u800C\u4E0D\u662F\u629B\u51FA\u5F02\u5E38\uFF09",paraId:112,tocIndex:56},{value:"\u6570\u636E\u9A8C\u8BC1",paraId:113,tocIndex:57},{value:"\uFF1A\u62E6\u622A\u5C5E\u6027\u8BBE\u7F6E\u8FDB\u884C\u9A8C\u8BC1",paraId:113,tocIndex:57},{value:"\u54CD\u5E94\u5F0F\u7CFB\u7EDF",paraId:113,tocIndex:57},{value:"\uFF1AVue 3 \u7684\u54CD\u5E94\u5F0F\u539F\u7406",paraId:113,tocIndex:57},{value:"\u5C5E\u6027\u8BBF\u95EE\u63A7\u5236",paraId:113,tocIndex:57},{value:"\uFF1A\u9690\u85CF\u79C1\u6709\u5C5E\u6027\u3001\u5B9E\u73B0\u53EA\u8BFB\u5BF9\u8C61",paraId:113,tocIndex:57},{value:"\u51FD\u6570\u589E\u5F3A",paraId:113,tocIndex:57},{value:"\uFF1A\u7F13\u5B58\u3001\u65E5\u5FD7\u3001\u6027\u80FD\u76D1\u63A7",paraId:113,tocIndex:57},{value:"\u8BBE\u8BA1\u6A21\u5F0F",paraId:113,tocIndex:57},{value:"\uFF1A\u5355\u4F8B\u6A21\u5F0F\u3001\u89C2\u5BDF\u8005\u6A21\u5F0F",paraId:113,tocIndex:57},{value:"Proxy \u6709\u6027\u80FD\u5F00\u9500\uFF0C\u907F\u514D\u6EE5\u7528",paraId:114,tocIndex:58},{value:"\u9075\u5B88 Proxy \u7684\u4E0D\u53D8\u5F0F",paraId:114,tocIndex:58},{value:"\u5728 trap \u4E2D\u59CB\u7EC8\u4F7F\u7528 Reflect",paraId:114,tocIndex:58},{value:"\u6B63\u786E\u5904\u7406\u8FD4\u56DE\u503C\u548C Symbol \u5C5E\u6027",paraId:114,tocIndex:58}]}}]);
