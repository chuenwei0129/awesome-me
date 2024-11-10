---
group:
  title: 2023
  order: -2023
title: 函数重载
toc: content
---

## 什么是函数重载

[函数重载](https://zh.wikipedia.org/wiki/%E5%87%BD%E6%95%B0%E9%87%8D%E8%BD%BD)（Overloading）是指在同一作用域内允许多个具有相同名称但参数列表不同的函数（或方法）。这种特性在多种面向对象编程语言中得到广泛应用，例如 C++、Java 和 TypeScript 等。

函数重载主要体现的几个方面包括：

1. **参数的数量不同**：多个同名函数可以接收不同数目的参数。

2. **参数的类型不同**：同名的多个函数可以接受不同类型的参数。

3. **参数的顺序不同**：某些语言允许通过调整参数的顺序来实现重载。

然而，**重载不应改变函数的基本功能或语义**。也就是说，**虽然函数的参数形式各异，但每个重载的函数都应实现类似的功能，只是对不同形式的输入做出适当的适配**。如果重载后的函数改变了基本功能或含义，可能会影响代码的可读性和可维护性。

在实际应用中，确保重载方法的核心语义保持一致，有助于提升代码的清晰性和可预测性，确保开发者在调用重载方法时能够获得预期的行为。

## 具体实践

设想我们有一个学生信息列表，支持分页显示，需求是根据不同的查询条件获取学生信息，比如姓名、学号（id）、年龄、分页信息等。

```typescript
// 用 TypeScript 描述学生数据结构
interface Student {
  id: number;
  name: string;
  age: number;
  gender: string;
  email: string;
}

// 示例数据
const students: Student[] = [
  { id: 1, name: "张三", age: 18, gender: "男", email: "zhangsan@example.com" },
  { id: 2, name: "李四", age: 19, gender: "女", email: "lisi@example.com" },
  // 其他学生数据
];
```

你可能会设计如下：

- `getStudents()`：不带参数，输出所有学生信息。
- `getStudents(1)`：传入 ID 参数，输出对应学号的学生信息。
- `getStudents(1, 20)`：传入 `pageNumber` 和 `pageSize` 参数，查询第一页，页大小为 20 条。
- `getStudents('张')`：传入一个参数（姓名），查询班级中相同姓的学生。

然而，这种用法并不符合真正的重载理念，实际上属于简化设计的表现…

> 真正的重载应仅涉及参数形式，而非功能与语义。

由于 JavaScript 是动态语言，自然能够适配动态参数，因此实际上不需要进行重载！

举个更合理的实现方式：

- `getStudents()` >>> `getAllStudents()`
- `getStudents(1)` >>> `getStudentById(1)`
- `getStudents(1, 20)` >>> `queryStudentsInPage(1, 20)`
- `getStudents('张')` >>> `findStudentsWithKeyword('张')`

> 功能的差异应通过语义进行区分，而不应通过参数结构区分。

进一步说，一个明确命名的 `queryStudentsInPage` 方法更适合应用重载概念：`queryStudentsInPage(pageNumber = 1, pageSize = 10)`

- `queryStudentsInPage()` --- 默认查询第一页，默认页大小为 10 条
- `queryStudentsInPage(2)` --- 查询第 2 页，默认页大小为 10 条
- `queryStudentsInPage(3, 15)` --- 查询第 3 页，页大小 15 条

如果都使用 `getStudents` 这个名称，而 `getStudents(1, 20)` 本应使用 `queryStudentsInPage` 来查询特定页面的方法，那么第二个页大小参数将无法采用默认值，否则就会和根据 ID 查询用户的 `getStudents(1)` 方法产生冲突…

## JavaScript 中的重载

> 函数重载是强类型语言的特性，虽然 js 是弱类型语言，但我们可以通过一些方法实现函数重载。

这是 jQuery 之父 John Resig 巧妙地利用了闭包，实现了 JavaScript 函数重载。

```js
// addMethod - By John Resig (MIT Licensed)
function addMethod(object, name, fn) {
  let old = object[name];
  object[name] = function () {
    // 如果函数需要的参数 和 实际传入的参数 的个数相同，就直接调用 fn
    if (fn.length === arguments.length) return fn.apply(this, arguments);
    // 如果不相同,判断 old 是不是函数，
    // 如果是就调用 old，也就是刚才保存的 object[name] 方法
    else if (typeof old === 'function') return old.apply(this, arguments);
  };
}
```

需要注意的是：

1. 这个重载适用于不同数量的参数，不区分类型、参数名或其它。
2. 会有一些函数调用的开销。
