---
title: 字面量类型与枚举
order: 1
toc: content
group:
  title: 类型
---

## 为什么要用字面量类型和联合类型？

### 1。提高代码的自描述性

在 API 响应的接口定义中，普通的类型定义有时过于宽泛，容易导致类型错误。例如：

```typescript
interface IResponse {
  code: number;
  status: string;
  data: any;
}
```

在上述定义中，`code` 和 `status` 可以是任何数字和字符串，这样的定义**缺乏精确性**。我们可以通过字面量类型和联合类型来改进：

```typescript
interface IResponse {
  code: 10000 | 10001 | 50000;
  status: "success" | "failure";
  data: any;
}
```

这样一来，当我们在代码中使用不在指定范围内的 `code` 或 `status` 值时，TypeScript 会直接报错，提升了代码的自描述性和安全性。

### 2。提供更精确的类型检查

**字面量类型允许我们使用具体的值作为类型，从而提供更精确的类型检查。这些类型比原始类型更精确，同时也是原始类型的子类型**。例如：

```typescript
const str: "hello" = "hello";
const num: 42 = 42;
const bool: true = true;
```

与直接使用 `string`、`number` 和 `boolean` 相比，这种方式更加精确。如下代码会报错：

```typescript
// 报错！不能将类型“"world"”分配给类型“"hello"”。
const str: "hello" = "world";
```

对象类型也可以使用字面量类型：

```typescript
interface Tmp {
  obj: {
    name: "chuenwei",
    age: 18
  }
}

const tmp: Tmp = {
  obj: {
    name: "chuenwei",
    age: 18
  }
}
```

需要注意的是，**无论是原始类型还是对象类型的字面量类型，它们的本质都是类型而不是值**。它们在编译时同样会被擦除，同时也是被存储在内存中的类型空间而非值空间。

### 3。联合类型让类型更灵活

联合类型你可以理解为，它代表了**一组类型的可用集合**，只要最终赋值的类型属于联合类型的成员之一，就可以认为符合这个联合类型。联合类型对其成员并没有任何限制，联合类型允许我们将多个类型组合在一起。例如：

```typescript
interface ITmp {
  bool: true | false;
  num: 1 | 2 | 3;
  str: "a" | "b" | "c";
}
```

我们还可以组合不同类型：

```typescript
interface ITmp {
  mixed: true | string | 42 | {} | (() => {}) | (1 | 2);
}
```

注意：

- 对于联合类型中的函数类型，需要使用括号 `()` 包裹起来。
- 函数类型并不存在字面量类型，因此这里的 `(() = {})` 就是一个合法的函数类型。
- **你可以在联合类型中进一步嵌套联合类型，但这些嵌套的联合类型最终都会被展平到第一级中。**

## 枚举

在编程语言中，枚举 (Enum) 是一种特殊的数据类型，用于定义一个变量可以取的一组值。虽然 JavaScript 并不原生支持枚举，但 TypeScript 作为 JavaScript 的超集，引入了这一概念，极大地丰富了类型系统。

### 枚举的定义和使用

枚举可以看作是对对象类型的扩展，提供了更强的类型约束和更好的代码提示。例如，在 JavaScript 中，我们可能会使用一个对象来定义一组常量：

```javascript
export default {
  Home_Page_Url: "url1",
  Setting_Page_Url: "url2",
  Share_Page_Url: "url3",
}

// 或是这样：
export const PageUrl = {
  Home_Page_Url: "url1",
  Setting_Page_Url: "url2",
  Share_Page_Url: "url3",
}
```

在 TypeScript 中，我们可以使用枚举来替代上述对象定义：

```typescript
enum PageUrl {
  Home_Page_Url = "url1",
  Setting_Page_Url = "url2",
  Share_Page_Url = "url3",
}

const home = PageUrl.Home_Page_Url;
```

使用枚举有两个主要优势：

1. **更好的类型提示**：枚举提供了更严格的类型检查和更清晰的代码提示。
2. **命名空间约束**：枚举成员被真正地约束在一个命名空间下，避免了常量名冲突。

### 数字枚举

如果没有显式地为枚举成员赋值，TypeScript 会默认使用从 0 开始递增的数字值：

```typescript
enum Items {
  Foo, // 0
  Bar, // 1
  Baz  // 2
}
```

如果为某个成员赋值，后续成员会从该值开始递增：

```typescript
enum Items {
  Foo, // 0
  Bar = 599,
  Baz  // 600
}
```

数字枚举还支持延迟求值，例如通过函数返回值来初始化枚举成员：

```typescript
const returnNum = () => 100 + 499;

enum Items {
  Foo = returnNum(), // 599
  Bar = 599,
  Baz  // 600
}
```

需要注意的是，使用延迟求值时，未赋值的枚举成员必须放在延迟求值的成员之前，或者放在第一位：

```typescript
enum Items {
  Baz, // 0
  Foo = returnNum(), // 599
  Bar = 599,
}
```

### 混合枚举

TypeScript 还允许枚举中同时包含字符串和数字成员：

```typescript
enum Mixed {
  Num = 599,
  Str = "chuenwei"
}
```

### 双向映射

枚举和对象的一个重要区别在于，枚举支持双向映射，即可以通过枚举成员获取值，也可以通过值获取枚举成员：

```typescript
enum Items {
  Foo,
  Bar,
  Baz
}

const fooValue = Items.Foo; // 0
const fooKey = Items[0]; // "Foo"
```

这是通过生成的 JavaScript 代码实现的：

```javascript
"use strict";
var Items;
(function (Items) {
    Items[Items["Foo"] = 0] = "Foo";
    Items[Items["Bar"] = 1] = "Bar";
    Items[Items["Baz"] = 2] = "Baz";
})(Items || (Items = {}));
```

需要注意，只有数字枚举成员支持双向映射，字符串枚举成员只支持单向映射：

```typescript
enum Items {
  Foo,
  Bar = "BarValue",
  Baz = "BazValue"
}

// 编译结果，只会进行 键-值 的单向映射
"use strict";
var Items;
(function (Items) {
    Items[Items["Foo"] = 0] = "Foo";
    Items["Bar"] = "BarValue";
    Items["Baz"] = "BazValue";
})(Items || (Items = {}));
```

### 常量枚举

常量枚举使用 `const` 关键字声明，其成员在编译时会被内联替换为具体的值，而不会生成额外的对象：

```typescript
const enum Items {
  Foo,
  Bar,
  Baz
}

const fooValue = Items.Foo; // 0
```

编译后的 JavaScript 代码：

```javascript
const fooValue = 0 /* Foo */;
```

常量枚举的优点是减少了编译后的代码量，但缺点是无法通过值访问枚举成员。

## 扩展阅读

### 类型控制流分析中的字面量类型

除了手动声明字面量类型以外，实际上 TypeScript 也会在某些情况下将变量类型推导为字面量类型，看这个例子：

![20240524143831](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240524143831.png)

![20240524143908](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240524143908.png)

你会发现，使用 const 声明的变量，其类型会从值推导出最精确的字面量类型。而对象类型则只会推导至符合其属性结构的接口，不会使用字面量类型：

![20240524144130](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240524144130.png)

要解答这个现象，需要你回想 let 和 const 声明的意义。我们知道，使用 let 声明的变量是可以再次赋值的，在 TypeScript 中要求赋值类型始终与原类型一致 (如果声明了的话)。因此对于 let 声明，**只需要推导至这个值从属的类型即可**。而 const 声明的原始类型变量将不再可变，因此类型可以直接一步到位收窄到最精确的字面量类型，但对象类型变量仍可变 (但同样会要求其属性值类型保持一致)。

这些现象的本质都是 TypeScript 的类型控制流分析。
