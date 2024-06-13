---
title: Null 与 Undefined
order: -1
toc: content
group:
  title: 数据类型
  order: -1
---

# Null 与 Undefined

## [为什么 typeof null 的结果是 ‘object’？](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof#typeof_null)

```js
/* JavaScript 自诞生以来便如此 */

// Bug is a Feature
typeof null === 'object'
```

在 JavaScript 最初的实现中，JavaScript 中的值是由一个**表示类型的标签**和**实际数据值**表示的。

**对象的类型标签是 `0`**。由于 `null` 代表的是空指针 (大多数平台下值为 `0x00`)，**`null` 的类型标签也是 `0`**，所以 `typeof null` 也因此返回 `'object'`。([来源](https://www.2ality.com/2013/10/typeof-null.html))

<!-- 链接 502 -->
<!-- 曾有一个 ECMAScript 的修复提案（通过选择性加入的方式），但[被拒绝了](http://wiki.ecmascript.org/doku.php?id=harmony:typeof_null)。该提案会导致 `typeof null === 'null'`。 -->

## undefined 不是保留字，可以作为标识符 (变量名) 使用

什么是字面量？维基百科上是这么定义的：

> 一个字面量就是在源代码中表示某个**固定值**的符号。

编译器或者解释器看到一个字面量，就知道它表示的是哪个具体的值。

> 可见字面量和标识符 (可变化) 是冲突的，所以**标识符不能以数字开头。**

比如，如果 `11` 不是一个固定的十进制数 `11`，那什么来表示 `11` 呢？

`null` 是字面量，`true` 和 `false` 也是字面量，所以就得把它们规定成为保留字，不能作为标识符使用。

**历史包袱：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/SCR-20220509-fzv.png)

**`undefined` 不是保留字**，你可以定义一个名为 `undefined` 的局部变量。而且 JavaScript 引擎已经内置了一个 `undefined` 全局变量，它的值是 `undefined`。

更明确点讲，我们写在 JavaScript 代码中的 `undefined`，并不是 `undefined` 值本身。而是一个局部变量或者是全局对象的一个属性。但大部分时候它们的值是 `undefined`。`NaN` 和 `Infinity` 也同理。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/SCR-20220509-g29.png)

> 🍑 **影响：**
>
> **因为不存在 `undefined` 字面量 (JavaScript 引擎内置了一个 `undefined` 全局变量)，所以 `x === undefined` 并不能说明变量 x 的值就是 `undefined`，更可靠的检测方法是 `typeof x === 'undefined'` 或者使用 `x == null`。**

**🔥 讨论**：[《JavaScript 悟道》将 undefined 列入保留字，这是故意为之得吗？](https://www.zhihu.com/question/472379938)

**🌰 例子：**

```js
var undefined = 1
console.log(undefined) // 打印出什么？
```

**浏览器：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/SCR-20220509-gsd.png)

**Node：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/SCR-20220509-gtq.png)

**原因：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/SCR-20220509-fzc.png)

**类似坑：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/SCR-20220509-fz1.png)

```js
// Code Runner
var let = 1
console.log(let) // 1

var await = 2
console.log(await) // 2
```

## [在现代 JavaScript 代码中，应该推荐使用 undefined 还是 null？](https://www.zhihu.com/question/479435433/answer/2057762335)

> **听祖师爷的**
>
> ![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/SCR-20220509-gxu.png)
