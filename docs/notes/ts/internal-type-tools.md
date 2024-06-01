---
title: 类型工具
order: 4
toc: content
group:
  title: 类型
---

## 类型别名

类型别名可以说是 TypeScript 类型编程中最重要的一个功能，从一个简单的函数类型别名，到让你眼花缭乱的类型体操，都离不开类型别名。虽然很重要，但它的使用却并不复杂：

```typescript
type A = string;
```

我们通过 `type` 关键字声明了一个类型别名 A，同时它的类型等价于 string 类型。类型别名的作用主要是对一组类型或一个特定类型结构进行封装，以便于在其它地方进行复用。

比如抽离一组联合类型：

```typescript
type StatusCode = 200 | 301 | 400 | 500 | 502;
type PossibleDataTypes = string | number | (() => unknown);

const status: StatusCode = 502;
```

抽离一个函数类型：

```typescript
type Handler = (e: Event) => void;

const clickHandler: Handler = (e) => { };
const moveHandler: Handler = (e) => { };
const dragHandler: Handler = (e) => { };
```

声明一个对象类型，就像接口那样：

```typescript
type ObjType = {
  name: string;
  age: number;
}
```

看起来类型别名真的非常简单，不就是声明了一个变量让类型声明更简洁和易于拆分吗？如果真的只是把它作为类型别名，用来进行特定类型的抽离封装，那的确很简单。然而，类型别名还能作为工具类型。**工具类同样基于类型别名，只是多了个泛型**。

在类型别名中，类型别名可以这么声明自己能够接受泛型 (我称之为泛型坑位)。一旦接受了泛型，我们就叫它工具类型：

```typescript
type Factory<T> = T | number | string;
```

虽然现在类型别名摇身一变成了工具类型，但它的基本功能仍然是创建类型，只不过工具类型能够接受泛型参数，实现**更灵活的类型创建功能**。从这个角度看，工具类型就像一个函数一样，泛型是入参，内部逻辑基于入参进行某些操作，再返回一个新的类型。比如在上面这个工具类型中，我们就简单接受了一个泛型，然后把它作为联合类型的一个成员，返回了这个联合类型。

```typescript
const foo: Factory<boolean> = true;
```

当然，我们一般不会直接使用工具类型来做类型标注，而是再度声明一个新的类型别名：

```typescript
type FactoryWithBool = Factory<boolean>;

const foo: FactoryWithBool = true;
```

同时，泛型参数的名称 (上面的 T) 也不是固定的。通常我们使用大写的 T / K / U / V / M / O ...这种形式。如果为了可读性考虑，我们也可以写成大驼峰形式 (即在驼峰命名的基础上，首字母也大写) 的名称，比如：

```typescript
type Factory<NewType> = NewType | number | string;
```

声明一个简单、有实际意义的工具类型：

```typescript
type MaybeNull<T> = T | null;
```

这个工具类型会接受一个类型，并返回一个包括 null 的联合类型。这样一来，在实际使用时就可以确保你处理了可能为空值的属性读取与方法调用：

```typescript
type MaybeNull<T> = T | null;

function process(input: MaybeNull<{ handler: () => {} }>) {
  input?.handler();
}
```

类似的还有 MaybePromise、MaybeArray。这也是我在日常开发中最常使用的一类工具类型：

```typescript
type MaybeArray<T> = T | T[];

function ensureArray<T>(input: MaybeArray<T>): T[] {
  return Array.isArray(input) ? input : [input];
}
```

另外，类型别名中可以接受任意个泛型，以及为泛型指定约束、默认值等。

总之，对于工具类型来说，它的主要意义是**基于传入的泛型进行各种类型操作**，得到一个新的类型。而这个类型操作的指代就非常非常广泛了，甚至说类型编程的大半难度都在这儿呢。

## 联合类型与交叉类型

在原始类型与对象类型一节，我们了解了联合类型。但实际上，联合类型还有一个和它有点像的孪生兄弟：**交叉类型**。它和联合类型的使用位置一样，只不过符号是 `&`，即按位与运算符。

实际上，正如联合类型的符号是 `|`，它代表了按位或，即只需要符合联合类型中的一个类型，既可以认为实现了这个联合类型，如 `A | B`，只需要实现 A 或 B 即可。

而代表着按位与的 `&` 则不同，你需要符合这里的所有类型，才可以说实现了这个交叉类型，即 `A & B`，**需要同时满足 A 与 B 两个类型**才行。

我们声明一个交叉类型：

```typescript
interface NameStruct {
  name: string;
}

interface AgeStruct {
  age: number;
}

type ProfileStruct = NameStruct & AgeStruct;

const profile: ProfileStruct = {
  name: "chuenwei",
  age: 18
}
```

很明显这里的 profile 对象需要同时符合这两个对象的结构。从另外一个角度来看，ProfileStruct 其实就是一个新的，同时包含 NameStruct 和 AgeStruct 两个接口所有属性的类型。这里是对于对象类型的合并，那对于原始类型呢？

```typescript
type StrAndNum = string & number; // never
```

我们可以看到，它竟然变成 never 了！看起来很奇怪，但想想我们前面给出的定义，新的类型会同时符合交叉类型的所有成员，存在既是 string 又是 number 的类型吗？当然不。实际上，这也是 never 这一 BottomType 的实际意义之一，描述**根本不存在的类型**嘛。

对于对象类型的交叉类型，其内部的同名属性类型同样会按照交叉类型进行合并：

```typescript
type Struct1 = {
  primitiveProp: string;
  objectProp: {
    name: string;
  }
}

type Struct2 = {
  primitiveProp: number;
  objectProp: {
    age: number;
  }
}

type Composed = Struct1 & Struct2;

type PrimitivePropType = Composed['primitiveProp']; // never
type ObjectPropType = Composed['objectProp']; // { name: string; age: number; }
```

如果是两个联合类型组成的交叉类型呢？其实还是类似的思路，既然只需要实现一个联合类型成员就能认为是实现了这个联合类型，那么各实现两边联合类型中的一个就行了，也就是两边联合类型的交集：

```typescript
type UnionIntersection1 = (1 | 2 | 3) & (1 | 2); // 1 | 2
type UnionIntersection2 = (string | number | symbol) & string; // string
```

总结一下交叉类型和联合类型的区别就是，联合类型只需要符合成员之一即可 (`||`)，而交叉类型需要严格符合每一位成员 (`&&`)。

## 索引类型

索引类型指的不是某一个特定的类型工具，它其实包含三个部分：**索引签名类型**、**索引类型查询**与**索引类型访问**。这三者都是独立的类型工具。唯一共同点是，**它们都通过索引的形式来进行类型操作**，但索引签名类型是**声明**，后两者则是**读取**。接下来，我们来依次介绍三个部分。

### 索引签名类型

索引签名类型主要指的是在接口或类型别名中，通过以下语法来**快速声明一个键值类型一致的类型结构**：

```typescript
interface AllStringTypes {
  [key: string]: string;
}

type AllStringTypes = {
  [key: string]: string;
}
```

这时，即使你还没声明具体的属性，对于这些类型结构的属性访问也将全部被视为 string 类型：

```typescript
interface AllStringTypes {
  [key: string]: string;
}

type PropType1 = AllStringTypes['chuenwei']; // string
type PropType2 = AllStringTypes['599']; // string
```

在这个例子中我们声明的键的类型为 string (`[key: string]`)，这也意味着在实现这个类型结构的变量中**只能声明字符串类型的键**：

```typescript
interface AllStringTypes {
  [key: string]: string;
}

const foo: AllStringTypes = {
  "chuenwei": "599"
}
```

但由于 JavaScript 中，对于 `obj[prop]` 形式的访问会将**数字索引访问转换为字符串索引访问**，也就是说，`obj[599]` 和 `obj['599']` 的效果是一致的。因此，在字符串索引签名类型中我们仍然可以声明数字类型的键。类似的，symbol 类型也是如此：

```typescript
const foo: AllStringTypes = {
  "chuenwei": "599",
  599: "chuenwei",
  [Symbol("ddd")]: 'symbol',
}
```

索引签名类型也可以和具体的键值对类型声明并存，但这时这些具体的键值类型也需要符合索引签名类型的声明：

```typescript
interface AllStringTypes {
  // 类型“number”的属性“propA”不能赋给“string”索引类型“boolean”。
  propA: number;
  [key: string]: boolean;
}
```

这里的符合即指子类型，因此自然也包括联合类型：

```typescript
interface StringOrBooleanTypes {
  propA: number;
  propB: boolean;
  [key: string]: number | boolean;
}
```

索引签名类型的一个常见场景是在重构 JavaScript 代码时，为内部属性较多的对象声明一个 any 的索引签名类型，以此来暂时支持**对类型未明确属性的访问**，并在后续一点点补全类型：

```typescript
interface AnyTypeHere {
  [key: string]: any;
}

const foo: AnyTypeHere['chuenwei'] = 'any value';
```

### 索引类型查询

刚才我们已经提到了索引类型查询，也就是 keyof 操作符。严谨地说，它可以将对象中的所有键转换为对应字面量类型，然后再组合成联合类型。注意，**这里并不会将数字类型的键名转换为字符串类型字面量，而是仍然保持为数字类型字面量**。

```typescript
interface Foo {
  chuenwei: 1,
  599: 2
}

type FooKeys = keyof Foo; // "chuenwei" | 599
```

如果觉得不太好理解，我们可以写段伪代码来模拟 **“从键名到联合类型”** 的过程。

```typescript
type FooKeys = Object.keys(Foo).join(" | ");
```

除了应用在已知的对象类型结构上以外，你还可以直接 `keyof any` 来生产一个联合类型，它会由所有可用作对象键值的类型组成：`string | number | symbol`。也就是说，它是由无数字面量类型组成的，由此我们可以知道，**keyof 的产物必定是一个联合类型**。

### 索引类型访问

在 JavaScript 中我们可以通过 `obj[expression]` 的方式来动态访问一个对象属性 (即计算属性)，expression 表达式会先被执行，然后使用返回值来访问属性。而 TypeScript 中我们也可以通过类似的方式，只不过这里的 expression 要换成类型。接下来，我们来看个例子：

```typescript
interface NumberRecord {
  [key: string]: number;
}

type PropType = NumberRecord[string]; // number
```

这里，我们使用 string 这个类型来访问 NumberRecord。由于其内部声明了数字类型的索引签名，这里访问到的结果即是 number 类型。注意，其访问方式与返回值均是类型。

更直观的例子是通过字面量类型来进行索引类型访问：

```typescript
interface Foo {
  propA: number;
  propB: boolean;
}

type PropAType = Foo['propA']; // number
type PropBType = Foo['propB']; // boolean
```

看起来这里就是普通的值访问，但实际上这里的 `'propA'` 和 `'propB'` 都是**字符串字面量类型**，**而不是一个 JavaScript 字符串值**。索引类型查询的本质其实就是，**通过键的字面量类型 (`'propA'`) 访问这个键对应的键值类型 (`number`)**。

看到这你肯定会想到，上面的 keyof 操作符能一次性获取这个对象所有的键的字面量类型，是否能用在这里？当然，这可是 TypeScript 啊。

```typescript
interface Foo {
  propA: number;
  propB: boolean;
  propC: string;
}

type PropTypeUnion = Foo[keyof Foo]; // string | number | boolean
```

使用字面量联合类型进行索引类型访问时，其结果就是将联合类型每个分支对应的类型进行访问后的结果，重新组装成联合类型。**索引类型查询、索引类型访问通常会和映射类型一起搭配使用**，前两者负责访问键，而映射类型在其基础上访问键值类型，我们在下面一个部分就会讲到。

注意，在未声明索引签名类型的情况下，我们不能使用 `NumberRecord[string]` 这种原始类型的访问方式，而只能通过键名的字面量类型来进行访问。

```typescript
interface Foo {
  propA: number;
}

// 类型“Foo”没有匹配的类型“string”的索引签名。
type PropAType = Foo[string];
```

索引类型的最佳拍档之一就是映射类型，同时映射类型也是类型编程中常用的一个手段。

## 映射类型：类型编程的第一步

不同于索引类型包含好几个部分，映射类型指的就是一个确切的类型工具。看到映射这个词你应该能联想到 JavaScript 中数组的 map 方法，实际上也是如此，映射类型的主要作用即是**基于键名映射到键值类型**。概念不好理解，我们直接来看例子：

```typescript
type Stringify<T> = {
  [K in keyof T]: string;
};
```

这个工具类型会接受一个对象类型 (假设我们只会这么用)，使用 keyof 获得这个对象类型的键名组成字面量联合类型，然后通过映射类型 (即这里的 in 关键字) 将这个联合类型的每一个成员映射出来，并将其键值类型设置为 string。

具体使用的表现是这样的：

```typescript
interface Foo {
  prop1: string;
  prop2: number;
  prop3: boolean;
  prop4: () => void;
}

type StringifiedFoo = Stringify<Foo>;

// 等价于
interface StringifiedFoo {
  prop1: string;
  prop2: string;
  prop3: string;
  prop4: string;
}
```

我们还是可以用伪代码的形式进行说明：

```typescript
const StringifiedFoo = {};
for (const k of Object.keys(Foo)){
  StringifiedFoo[k] = string;
}
```

看起来好像很奇怪，我们应该很少会需要把一个接口的所有属性类型映射到 string？这有什么意义吗？别忘了，既然拿到了键，那键值类型其实也能拿到：

```typescript
type Clone<T> = {
  [K in keyof T]: T[K];
};
```

这里的 `T[K]` 其实就是上面说到的索引类型访问，我们使用键的字面量类型访问到了键值的类型，这里就相当于克隆了一个接口。需要注意的是，这里其实只有 `K in` 属于映射类型的语法，`keyof T` 属于 keyof 操作符，`[K in keyof T]` 的 `[]` 属于索引签名类型，`T[K]` 属于索引类型访问。

## 类型查询操作符：熟悉又陌生的 typeof

TypeScript 存在两种功能不同的 typeof 操作符。我们最常见的一种 typeof 操作符就是 JavaScript 中，用于检查变量类型的 typeof，它会返回 `"string"` / `"number"` / `"object"` / `"undefined"` 等值。而除此以外， TypeScript 还新增了用于类型查询的 typeof ，即 **Type Query Operator**，这个 typeof 返回的是一个 TypeScript 类型：

```typescript
const str = "chuenwei";

const obj = { name: "chuenwei" };

const nullVar = null;
const undefinedVar = undefined;

const func = (input: string) => {
  return input.length > 10;
}

type Str = typeof str; // "chuenwei"
type Obj = typeof obj; // { name: string; }
type Null = typeof nullVar; // null
type Undefined = typeof undefined; // undefined
type Func = typeof func; // (input: string) => boolean
```

你不仅可以直接在类型标注中使用 typeof，还能在工具类型中使用 typeof。

```typescript
const func = (input: string) => {
  return input.length > 10;
}

const func2: typeof func = (name: string) => {
  return name === 'chuenwei'
}
```

这里我们暂时不用深入了解 ReturnType 这个工具类型，只需要知道它会返回一个函数类型中返回值位置的类型：

```typescript
const func = (input: string) => {
  return input.length > 10;
}

// boolean
type FuncReturnType = ReturnType<typeof func>;
```

绝大部分情况下，typeof 返回的类型就是当你把鼠标悬浮在变量名上时出现的推导后的类型，并且是**最窄的推导程度（即到字面量类型的级别）**。你也不必担心混用了这两种 typeof，在逻辑代码中使用的 typeof 一定会是 JavaScript 中的 typeof，而类型代码（如类型标注、类型别名中等）中的一定是类型查询的 typeof 。同时，为了更好地避免这种情况，也就是隔离类型层和逻辑层，类型查询操作符后是不允许使用表达式的：

```typescript
const isInputValid = (input: string) => {
  return input.length > 10;
}

// 不允许表达式
let isValid: typeof isInputValid("chuenwei");
```

## 类型守卫

TypeScript 中提供了非常强大的类型推导能力，它会随着你的代码逻辑不断尝试收窄类型，这一能力称之为**类型的控制流分析**（也可以简单理解为类型推导）。

这么说有点抽象，我们可以想象有一条河流，它从上而下流过你的程序，随着代码的分支分出一条条支流，在最后重新合并为一条完整的河流。在河流流动的过程中，如果遇到了有特定条件才能进入的河道（比如 if else 语句、switch case 语句等），那河流流过这里就会收集对应的信息，等到最后合并时，它们就会嚷着交流：**“我刚刚流过了一个只有字符串类型才能进入的代码分支！”** **“我刚刚流过了一个只有函数类型才能进入的代码分支！”**……就这样，它会把整个程序的类型信息都收集完毕。

```typescript
function foo (input: string | number) {
  if(typeof input === 'string') {}
  if(typeof input === 'number') {}
  // ...
}
```

我们在 never 类型一节中学到的也是如此。在类型控制流分析下，每流过一个 if 分支，后续联合类型的分支就少了一个，因为这个类型已经在这个分支处理过了，不会进入下一个分支：

```typescript
declare const strOrNumOrBool: string | number | boolean;

if (typeof strOrNumOrBool === "string") {
  // 一定是字符串！
  strOrNumOrBool.charAt(1);
} else if (typeof strOrNumOrBool === "number") {
  // 一定是数字！
  strOrNumOrBool.toFixed();
} else if (typeof strOrNumOrBool === "boolean") {
  // 一定是布尔值！
  strOrNumOrBool === true;
} else {
  // 要是走到这里就说明有问题！
  const _exhaustiveCheck: never = strOrNumOrBool;
  throw new Error(`Unknown input type: ${_exhaustiveCheck}`);
}
```

在这里，我们实际上通过 if 条件中的表达式进行了类型保护，即告知了流过这里的分析程序每个 if 语句代码块中变量会是何类型。这即是编程语言的类型能力中最重要的一部分：**与实际逻辑紧密关联的类型**。我们从逻辑中进行类型地推导，再反过来让类型为逻辑保驾护航。

前面我们说到，类型控制流分析就像一条河流一样流过，那 if 条件中的表达式要是现在被提取出来了怎么办？

```typescript
function isString(input: unknown): boolean {
  return typeof input === "string";
}

function foo(input: string | number) {
  if (isString(input)) {
    // 类型“string | number”上不存在属性“replace”。
    (input).replace("chuenwei", "chuenwei599")
  }
  if (typeof input === 'number') { }
  // ...
}
```

奇怪的事情发生了，我们只是把逻辑提取到了外面而已，如果 isString 返回了 true，那 input 肯定也是 string 类型啊？

想象类型控制流分析这条河流，刚流进 `if (isString(input))` 就戛然而止了。因为 isString 这个函数在另外一个地方，内部的判断逻辑并不在函数 foo 中。这里的**类型控制流分析做不到跨函数上下文来进行类型的信息收集**（但别的类型语言中可能是支持的）。

实际上，将判断逻辑封装起来提取到函数外部进行复用非常常见。为了解决这一类型控制流分析的能力不足， TypeScript 引入了 **is 关键字**来显式地提供类型信息：

```typescript
function isString(input: unknown): input is string {
  return typeof input === "string";
}

function foo(input: string | number) {
  if (isString(input)) {
    // 正确了
    (input).replace("chuenwei", "chuenwei599")
  }
  if (typeof input === 'number') { }
  // ...
}
```

isString 函数称为类型守卫，在它的返回值中，我们不再使用 boolean 作为类型标注，而是使用 `input is string` 这么个奇怪的搭配，拆开来看它是这样的：

- input 函数的某个参数；
- `is string`，即 **is 关键字 + 预期类型**，即如果这个函数成功返回为 true，那么 is 关键字前这个入参的类型，就会**被这个类型守卫调用方后续的类型控制流分析收集到**。

需要注意的是，**类型守卫函数中并不会对判断逻辑和实际类型的关联进行检查**：

```typescript
function isString(input: unknown): input is number {
  return typeof input === "string";
}

function foo(input: string | number) {
  if (isString(input)) {
    // 报错，在这里变成了 number 类型
    (input).replace("chuenwei", "chuenwei599")
  }
  if (typeof input === 'number') { }
  // ...
}
```

**从这个角度来看，其实类型守卫有些类似于类型断言，但类型守卫更宽容，也更信任你一些。你指定什么类型，它就是什么类型。** 除了使用简单的原始类型以外，我们还可以在类型守卫中使用对象类型、联合类型等，比如下面我开发时常用的两个守卫：

```typescript
export type Falsy = false | "" | 0 | null | undefined;

export const isFalsy = (val: unknown): val is Falsy => !val;

// 不包括不常用的 symbol 和 bigint
export type Primitive = string | number | boolean | undefined;

export const isPrimitive = (val: unknown): val is Primitive => ['string', 'number', 'boolean' , 'undefined'].includes(typeof val);
```

除了使用 typeof 以外，我们还可以使用许多类似的方式来进行类型保护，只要它能够在联合类型的类型成员中起到筛选作用。

### 基于 in 与 instanceof 的类型保护

`in` 操作符 并不是 TypeScript 中新增的概念，而是 JavaScript 中已有的部分，它可以通过 `key in object` 的方式来判断 key 是否存在于 object 或其原型链上（返回 true 说明存在）。

既然能起到区分作用，那么 TypeScript 中自然也可以用它来保护类型：

```typescript
interface Foo {
  foo: string;
  fooOnly: boolean;
  shared: number;
}

interface Bar {
  bar: string;
  barOnly: boolean;
  shared: number;
}

function handle(input: Foo | Bar) {
  if ('foo' in input) {
    input.fooOnly;
  } else {
    input.barOnly;
  }
}
```

这里的 foo / bar、fooOnly / barOnly、shared 属性们其实有着不同的意义。我们使用 foo 和 bar 来区分 input 联合类型，然后就可以在对应的分支代码块中正确访问到 Foo 和 Bar 独有的类型 fooOnly / barOnly。但是，如果用 shared 来区分，就会发现在分支代码块中 input 仍然是初始的联合类型：

```typescript
function handle(input: Foo | Bar) {
  if ('shared' in input) {
    // 类型“Foo | Bar”上不存在属性“fooOnly”。类型“Bar”上不存在属性“fooOnly”。
    input.fooOnly;
  } else {
    // 类型“never”上不存在属性“barOnly”。
    input.barOnly;
  }
}
```

这里需要注意的是，Foo 与 Bar 都满足 `'shared' in input` 这个条件。因此在 if 分支中， Foo 与 Bar 都会被保留，那在 else 分支中就只剩下 never 类型。

这个时候肯定有人想问，为什么 shared 不能用来区分？答案很明显，因为它同时存在两个类型中不具有辨识度。而 foo / bar 和 fooOnly / barOnly 是各个类型独有的属性，因此可以作为**可辨识属性（Discriminant Property 或 Tagged Property）**。Foo 与 Bar 又因为存在这样具有区分能力的辨识属性，可以称为**可辨识联合类型（Discriminated Unions 或 Tagged Union）**。虽然它们是一堆类型的联合体，但其中每一个类型都具有一个独一无二的，能让它鹤立鸡群的属性。

这个可辨识属性可以是结构层面的，比如结构 A 的属性 prop 是数组，而结构 B 的属性 prop 是对象，或者结构 A 中存在属性 prop 而结构 B 中不存在。

它甚至可以是共同属性的字面量类型差异：

```typescript
function ensureArray(input: number | number[]): number[] {
  if (Array.isArray(input)) {
    return input;
  } else {
    return [input];
  }
}

interface Foo {
  kind: 'foo';
  diffType: string;
  fooOnly: boolean;
  shared: number;
}

interface Bar {
  kind: 'bar';
  diffType: number;
  barOnly: boolean;
  shared: number;
}

function handle1(input: Foo | Bar) {
  if (input.kind === 'foo') {
    input.fooOnly;
  } else {
    input.barOnly;
  }
}
```

如上例所示，对于同名但不同类型的属性，我们需要使用字面量类型的区分，并不能使用简单的 typeof：

```typescript
function handle2(input: Foo | Bar) {
  // 报错，并没有起到区分的作用，在两个代码块中都是 Foo | Bar
  if (typeof input.diffType === 'string') {
    input.fooOnly;
  } else {
    input.barOnly;
  }
}
```

除此之外，JavaScript 中还存在一个功能类似于 typeof 与 in 的操作符：instanceof，它判断的是原型级别的关系，如 `foo instanceof Base` 会沿着 foo 的原型链查找 `Base.prototype` 是否存在其上。当然，在 ES6 已经无处不在的今天，我们也可以简单地认为这是判断 foo 是否是 Base 类的实例。同样的，instanceof 也可以用来进行类型保护：

```typescript
class FooBase {}

class BarBase {}

class Foo extends FooBase {
  fooOnly() {}
}
class Bar extends BarBase {
  barOnly() {}
}

function handle(input: Foo | Bar) {
  if (input instanceof FooBase) {
    input.fooOnly();
  } else {
    input.barOnly();
  }
}
```

除了使用 is 关键字的类型守卫以外，其实还存在使用 asserts 关键字的类型断言守卫。

### 类型断言守卫

如果你写过测试用例或者使用过 NodeJs 的 assert 模块，那对断言这个概念应该不陌生：

```typescript
import assert from 'assert';

let name: any = 'chuenwei';

assert(typeof name === 'number');

// number 类型
name.toFixed();
```

上面这段代码在运行时会抛出一个错误，因为 assert 接收到的表达式执行结果为 false。这其实也类似类型守卫的场景：如果断言**不成立**，比如在这里意味着值的类型不为 number，那么在断言下方的代码就执行不到（相当于 Dead Code）。如果断言通过了，不管你最开始是什么类型，断言后的代码中就**一定是符合断言的类型**，比如在这里就是 number。

**但断言守卫和类型守卫最大的不同点在于，在判断条件不通过时，断言守卫需要抛出一个错误，类型守卫只需要剔除掉预期的类型。** 这里的抛出错误可能让你想到了 never 类型，但实际情况要更复杂一些，断言守卫并不会始终都抛出错误，所以它的返回值类型并不能简单地使用 never 类型。为此，TypeScript 3.7 版本专门引入了 asserts 关键字来进行断言场景下的类型守卫，比如前面 assert 方法的签名可以是这样的：

```typescript
function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg);
  }
}
```

这里使用的是 `asserts condition` ，而 condition 来自于实际逻辑！这也意味着，我们**将 condition 这一逻辑层面的代码，作为了类型层面的判断依据**，相当于在返回值类型中使用一个逻辑表达式进行了类型标注。

举例来说，对于 `assert(typeof name === 'number');` 这么一个断言，如果函数成功返回，就说明其后续的代码中 condition 均成立，也就是 name 神奇地变成了一个 number 类型。

这里的 condition 甚至还可以结合使用 is 关键字来提供进一步的类型守卫能力：

```typescript
let name: any = 'linbudu';

function assertIsNumber(val: any): asserts val is number {
  if (typeof val !== 'number') {
    throw new Error('Not a number!');
  }
}

assertIsNumber(name);

// number 类型！
name.toFixed();
```

在这种情况下，你无需再为断言守卫传入一个表达式，而是可以将这个判断用的表达式放进断言守卫的内部，来获得更独立地代码逻辑。

## 扩展阅读

### 接口的合并

在交叉类型一节中，你可能会注意到，接口和类型别名都能直接使用交叉类型。但除此以外，接口还能够使用继承进行合并，在继承时子接口可以声明同名属性，但并不能覆盖掉父接口中的此属性。**子接口中的属性类型需要能够兼容（extends）父接口中的属性类型**：

```typescript
interface Struct1 {
  primitiveProp: string;
  objectProp: {
    name: string;
  };
  unionProp: string | number;
}

// 接口“Struct2”错误扩展接口“Struct1”。
interface Struct2 extends Struct1 {
  // “primitiveProp”的类型不兼容。不能将类型“number”分配给类型“string”。
  primitiveProp: number;
  // 属性“objectProp”的类型不兼容。
  objectProp: {
    age: number;
  };
  // 属性“unionProp”的类型不兼容。
  // 不能将类型“boolean”分配给类型“string | number”。
  unionProp: boolean;
}
```

类似的，如果你直接声明多个同名接口，虽然接口会进行合并，但这些同名属性的类型仍然需要兼容，此时的表现其实和显式扩展接口基本一致：

```typescript
interface Struct1 {
  primitiveProp: string;
}

interface Struct1 {
// 后续属性声明必须属于同一类型。
// 属性“primitiveProp”的类型必须为“string”，但此处却为类型“number”。
  primitiveProp: number;
}
```

这也是接口和类型别名的重要差异之一。

那么接口和类型别名之间的合并呢？其实规则一致，如接口**继承**类型别名，和类型别名使用交叉类型**合并**接口：

```typescript
type Base = {
  name: string;
};

interface IDerived extends Base {
  // 报错！就像继承接口一样需要类型兼容
  name: number;
  age: number;
}

interface IBase {
  name: string;
}

// 合并后的 name 同样是 never 类型
type Derived = IBase & {
  name: number;
};
```

### 更强大的可辨识联合类型分析

类型控制流分析其实是一直在不断增强的，在 4.5、4.6、4.7 版本中都有或多或少的场景增强。而这里说的增强，其实就包括了**对可辨识联合类型的分析能力**。比如下面这个例子在此前（4.6 版本以前）的 TypeScript 代码中会报错：

```typescript
type Args = ['a', number] | ['b', string];

type Func = (...args: ["a", number] | ["b", string]) => void;

const f1: Func = (kind, payload) => {
  if (kind === "a") {
    // 仍然是 string | number
    payload.toFixed();
  }
  if (kind === "b") {
    // 仍然是 string | number
    payload.toUpperCase();
  }
};
```

而在 4.6 版本中则对这一情况下的 **联合类型辨识（即元组）** 做了支持。

如果你有兴趣了解 TypeScript 中的类型控制流分析以及更多可辨识联合类型的场景，可以阅读：[TypeScript 中的类型控制流分析演进](https://zhuanlan.zhihu.com/p/461842201)
