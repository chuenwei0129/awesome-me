---
group:
  title: javaScript
  order: 3
title: null 和 undefined
toc: content
order: 1
---

## 基本概念

在 JavaScript 中，`null` 和 `undefined` 是两个特殊的原始值，都表示"空"或"无"的概念，但它们有着不同的语义和使用场景。

### undefined

`undefined` 表示变量已声明但**未初始化**，或者对象的属性**不存在**。它是一个**系统级别**的"空值"。

常见产生场景：

```js
// 1. 变量声明但未赋值
let a;
console.log(a); // undefined

// 2. 访问对象不存在的属性
const obj = {};
console.log(obj.foo); // undefined

// 3. 函数没有返回值
function fn() {}
console.log(fn()); // undefined

// 4. 函数参数未传递
function fn(x) {
  console.log(x); // undefined
}
fn();
```

### null

`null` 表示**有意的空值**，需要**程序员主动赋值**。它是一个**程序级别**的"空值"，表示"这里应该有一个对象，但现在是空的"。

```js
// 需要显式赋值
let obj = null; // 表示 obj 现在为空，但将来可能会有对象
```

### 主要区别

| 特性 | `undefined` | `null` |
| --- | --- | --- |
| **类型** | `undefined` | `object`（历史遗留问题） |
| **语义** | 未定义、缺失 | 空对象、空引用 |
| **产生方式** | 系统自动产生 | 需要主动赋值 |
| **转数字** | `NaN` | `0` |
| **转布尔** | `false` | `false` |

```js
// 类型检测
typeof undefined; // 'undefined'
typeof null; // 'object'

// 类型转换
Number(undefined); // NaN
Number(null); // 0

// 相等性比较
undefined == null; // true（抽象相等）
undefined === null; // false（严格相等）
```

## [为什么 typeof null 的结果是 'object'？](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof#typeof_null)

```js
/* JavaScript 自诞生以来便如此 */

// Bug is a Feature
typeof null === 'object';
```

在 JavaScript 最初的实现中，JavaScript 中的值是由一个**表示类型的标签**和**实际数据值**表示的。

**对象的类型标签是 `0`**。由于 `null` 代表的是空指针（大多数平台下值为 `0x00`），**`null` 的类型标签也是 `0`**，所以 `typeof null` 也因此返回 `'object'`。（[来源](https://www.2ality.com/2013/10/typeof-null.html)）

> 曾有一个 ECMAScript 的修复提案（通过选择性加入的方式），但被拒绝了。该提案会导致 `typeof null === 'null'`，但由于会破坏大量现有代码，最终没有被采纳。

## undefined 不是保留字，可以作为标识符（变量名）使用

什么是字面量？维基百科上是这么定义的：

> 一个字面量就是在源代码中表示某个**固定值**的符号。

编译器或者解释器看到一个字面量，就知道它表示的是哪个具体的值。

> 可见字面量和标识符（可变化）是冲突的，所以**标识符不能以数字开头**。

比如，如果 `11` 不是一个固定的十进制数 `11`，那什么来表示 `11` 呢？

`null` 是字面量，`true` 和 `false` 也是字面量，所以就得把它们规定成为保留字，不能作为标识符使用。

### 历史包袱

![undefined 不是保留字](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/SCR-20220509-fzv.png)

**`undefined` 不是保留字**，你可以定义一个名为 `undefined` 的局部变量。而且 JavaScript 引擎已经内置了一个 `undefined` 全局变量，它的值是 `undefined`。

更明确点讲，我们写在 JavaScript 代码中的 `undefined`，并不是 `undefined` 值本身。而是一个局部变量或者是全局对象的一个属性。但大部分时候它们的值是 `undefined`。`NaN` 和 `Infinity` 也同理。

![undefined 可以被赋值](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/SCR-20220509-g29.png)

> **影响：**
>
> 因为不存在 `undefined` 字面量（JavaScript 引擎内置了一个 `undefined` 全局变量），所以 `x === undefined` 并不能说明变量 x 的值就是 `undefined`，更可靠的检测方法是 `typeof x === 'undefined'` 或者使用 `x == null`。

**相关讨论**：[《JavaScript 悟道》将 undefined 列入保留字，这是故意为之得吗？](https://www.zhihu.com/question/472379938)

### 实际例子

```js
var undefined = 1;
console.log(undefined); // 打印出什么？
```

**浏览器环境：**

![浏览器中全局 undefined 不可修改](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/SCR-20220509-gsd.png)

**Node 环境：**

![Node 中全局 undefined 也不可修改](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/SCR-20220509-gtq.png)

**原因：**

![undefined 是全局对象的只读属性](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/SCR-20220509-fzc.png)

### 类似的坑

![let、await 在某些环境也可以作为变量名](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/SCR-20220509-fz1.png)

```js
// Code Runner
var let = 1;
console.log(let); // 1

var await = 2;
console.log(await); // 2
```

## 如何正确检测 null 和 undefined

### 检测方法对比

```js
const value = undefined;

// 方法 1: typeof（推荐检测 undefined）
typeof value === 'undefined'; // true

// 方法 2: 严格相等（需要确保 undefined 未被重新赋值）
value === undefined; // true
value === null; // false

// 方法 3: 宽松相等（同时检测 null 和 undefined）
value == null; // true（推荐）

// 方法 4: void 0（获取真正的 undefined 值）
value === void 0; // true
```

### void 运算符

`void` 运算符会对给定的表达式求值，然后返回 `undefined`。无论 `void` 后面是什么表达式，返回值永远是真正的 `undefined`。

```js
void 0; // undefined
void 1; // undefined
void {}; // undefined

// 常用于获取真正的 undefined 值
const realUndefined = void 0;

// 在 IIFE 中使用
void (function () {
  console.log('立即执行');
})();

// 在 HTML 中使用，阻止默认行为
// <a href="javascript:void(0)">点击我</a>
```

### 推荐的检测方式

```js
// 检测 undefined
function isUndefined(value) {
  return typeof value === 'undefined';
  // 或者
  return value === void 0;
}

// 同时检测 null 和 undefined（推荐用于判空）
function isNullish(value) {
  return value == null; // 等价于 value === null || value === undefined
}

// 使用示例
const obj = { foo: undefined, bar: null, baz: 0 };

isNullish(obj.foo); // true
isNullish(obj.bar); // true
isNullish(obj.baz); // false
isNullish(obj.notExist); // true
```

## 现代 JavaScript 中的最佳实践

### [在现代 JavaScript 代码中，应该推荐使用 undefined 还是 null？](https://www.zhihu.com/question/479435433/answer/2057762335)

> **听祖师爷的**
>
> ![JavaScript 之父的建议](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/SCR-20220509-gxu.png)

### 具体建议

1. **推荐使用 `undefined` 作为默认的"空值"**

   ```js
   // ✅ 推荐：使用 undefined
   function processUser(name, age) {
     if (age === undefined) {
       age = 18; // 默认值
     }
   }

   // ✅ 更好：使用默认参数
   function processUser(name, age = 18) {
     // ...
   }
   ```

2. **仅在需要显式表示"空对象"时使用 `null`**

   ```js
   // ✅ 表示有意的空引用
   let currentUser = null; // 表示当前没有用户，但将来会有

   // DOM API 返回 null 表示找不到元素
   const element = document.getElementById('notExist'); // null
   ```

3. **不要主动给变量赋值 `undefined`**

   ```js
   // ❌ 不推荐
   let foo = undefined;

   // ✅ 推荐：直接声明即可
   let foo;
   ```

4. **使用可选链和空值合并运算符**

   ```js
   // 可选链操作符 ?.（ES2020）
   const user = { profile: { name: 'Alice' } };
   console.log(user.profile?.name); // 'Alice'
   console.log(user.address?.street); // undefined（不会报错）

   // 空值合并运算符 ??（ES2020）
   const value = null ?? 'default'; // 'default'
   const value2 = undefined ?? 'default'; // 'default'
   const value3 = 0 ?? 'default'; // 0（只有 null 和 undefined 才会使用默认值）

   // 与 || 的区别
   const value4 = 0 || 'default'; // 'default'（0 是 falsy 值）
   const value5 = '' || 'default'; // 'default'（空字符串是 falsy 值）

   const value6 = 0 ?? 'default'; // 0
   const value7 = '' ?? 'default'; // ''
   ```

### TypeScript 中的处理

在 TypeScript 中，推荐使用严格的空值检查：

```ts
// 启用 strictNullChecks
// tsconfig.json: "strictNullChecks": true

// 明确区分类型
let maybeString: string | undefined;
let nullableString: string | null;
let nullishString: string | null | undefined;

// 使用类型守卫
function processValue(value: string | undefined) {
  if (value !== undefined) {
    // 这里 value 的类型被缩窄为 string
    console.log(value.toUpperCase());
  }
}

// 使用非空断言（确定不为空时使用）
function getValue(): string | undefined {
  return 'hello';
}
const result = getValue()!; // 断言结果不为 undefined
```

## 总结

1. **`undefined` 是系统级的"未定义"，`null` 是程序级的"空值"**
2. **`typeof null === 'object'` 是历史遗留问题，无法修复**
3. **`undefined` 不是保留字，但全局的 `undefined` 属性是只读的**
4. **推荐使用 `typeof x === 'undefined'` 或 `x == null` 来检测空值**
5. **在现代 JavaScript 中，优先使用 `undefined`，仅在需要表示"空对象引用"时使用 `null`**
6. **善用可选链 `?.` 和空值合并运算符 `??` 来处理空值情况**
