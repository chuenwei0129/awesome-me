# TypeScript 学习笔记<!-- omit in toc -->

- [如何在 React 中完美运用 TypeScript？](#如何在-react-中完美运用-typescript)
- [ts 如何定义一个不定长函数数组类型符合要求：后一个函数的参数类型总是前一个函数的返回值的类型？](#ts-如何定义一个不定长函数数组类型符合要求后一个函数的参数类型总是前一个函数的返回值的类型)
- [TypeScript 新特性](#typescript-新特性)
- [TypeScript 深入](#typescript-深入)
  - [TypeScript 中的协变与逆变](#typescript-中的协变与逆变)
  - [TypeScript 类型体操](#typescript-类型体操)
  - [TS 已经有模块系统了，为什么还需要 NameSpace？](#ts-已经有模块系统了为什么还需要-namespace)
  - [写 TypeScript 时，什么时候用 any？什么时候用 unknown？有没有规律或准则？](#写-typescript-时什么时候用-any什么时候用-unknown有没有规律或准则)
- [TypeScript 基础](#typescript-基础)
- [循环依赖](#循环依赖)
- [Ambient Modules](#ambient-modules)

## [如何在 React 中完美运用 TypeScript？](https://juejin.cn/post/6910863689260204039)

## [ts 如何定义一个不定长函数数组类型符合要求：后一个函数的参数类型总是前一个函数的返回值的类型？](https://www.zhihu.com/question/531069859)

## [TypeScript 新特性](https://www.zhihu.com/column/c_1446787480888053760)

<div align="right">
<a href="https://www.typescriptlang.org/zh/play?ts=5.1.3#code/PTAEBUE8AcFMGUDGAnAltALqQAHKBe3QFOqB5GoFz6gboqAVxoD-agvwGDZSgFD0igCsAdAIyiC-ioA6mgK-GA9tUA8CoG8fQNHqgDHlAaMpMw+UACkAhgDdlSNJlCBaOUAw-wFcAdgBNYAM1RHYJ0IBiVUEYMAbZ6ED3yoFO5QNURgMBdAx5GAXHKAOASAhTaAkObCgLgEdsGReoBi8oD0ZoBUcoBeXtGAQAyAMAEKUHCa6Fj6gMHagDdygL8JSeGA8IaAknKAIW4SmYCBkYAWEYBcntgpwYADcoASchURUU3ieoAG8i2A-vKAFK4NgCl6gKfRSY6wqrDIoJlyoHkwCChFunqqAPaotoCjcjOAcXKA88aAD-HdEeGAEqagyLAYBshGoIC30YBT5QafAaQmEOwUKnUhW0+kAQZqAHPNunwIoA+M0A8PoND5fH5-IF6QBoRtUcd9fgDAckIqS8TgUsI9IBihP6JQagDztQCiaYBC6MA6d7CQBY8itjGZLNYTJkEnsCoc4XpAJvxKVBEkAV8rUbyAcAtAA3RgVAZwuoGygFg5IWmCxWGx6QDOyhMvIAS6MCCr4YXC4KieiN1EAL9GO3jBISAMLlusKzWKsjs5f1uoBD6MAQPoNQANzoBDGIU7C4gAknQA05jpABN+N0A6fqABiV-f5AM2KVsAB6ZvGnkoEg3h6UjgiTUQD4mhrABc2OuDootCSRhsA2-GAGQiJOr23oqIWGsJALNygDZHFZ6kyMRCnIwAZyw5i4AF5QAAKACUAC5QN3zbYdwA+UAAb1AAF9QMxU6BPIBoOX5gFKjQCYqaeAIKgOYxiIBgqBrqAADuAAWpzrrAoBmIgzjKJ8tgYPsoCoOuqyoBg0EbKAADkS5EY4pybERyhGJAZEALYGJu1Z-MourKM4BiwGw+4AEwAMwsCwh70KuG5bjxoB7kep5LpJN73g+jCMC+bAAAygIA2zbiIAQ8q8A0gAceoA84mAHfygAOmZCgAm1oAskp6HwOgNFpulUKqVAFoAX+qAAIeEjYIA5X6ABD-lqACvWgDq2oARumGRIgAbWYAX4rdIAQjo+aMgCQ-3o8KgJuaBGAA5qAgCADBlVhZQA2gAuqAcqAOwW9BIShnxASBYEQeYpynAAPOAV77gAHqe4AnhA9DNac+5EQRrinERh7PmAwFGKB4F-ENrUAERjc4pzLZ1PWgKtsDjct-W7ftg0tfuRUcAANKAPFXXxJVTcws3zU1LWtU4dEAEYbKVW2nu9X3IKV-X-d9JUncNt5GModGwKeRGINBBhEVdH2oMg+EmMokCnkVPGqfjV2XaAHAlQ+D1gGwlPKWA+QHFoWDsOpgANpoQ-qAJ-ajl6UZZl+W5GaAJLegDvcjcRmALWmgAAUSl3hmQ5Om8Pgw4SIAh-KAPYGVCAG+meiAGA6rmALw67jUIAfT6AHYeDRhRF4gJYAWP-VbAyGoQhT2NX8H2oa1olMR13W9f14D0K7yAjWtE3k-Vc3O6AAcrcHm3eztMeHTH-uoWdRM3aAd2h07C2R27nzKCYa7OJAoDnVd6d3b9OIF0XJdl9dt33ae+eF0Yxel2njfJ4HkPQ7DxEI0jKNoxjWM43jBPE4TpOh5TbDU6ASKcwZJmmXoQs3BZryIt3+69zDcOD8jkcj9BmPY6XE+qYT09PsoOEexgwk7IAyvreNzpmy7pgS8IAI34SJrJEpAtKADK-QA+uaGkAKDKgBqFWrq3YuehACYSlQaKowtaCEAEr6BZQFgMAKbmgAXv0AIDGpB3CAA3lQAbU6AEADPQgAyFUQYAWSNBSABCMwA+OYryoLbe2dVs4QVdgALw4O7NcntQCwC6hgWApgcIg0BiVKufVeqcNqo7BqOd+E8SEWJCAojxGSJMDhFutdHAGE+qDeRvtk4CNTuXRuWdVG8OUAIt6JiAY-TjjIoGf0XGg0sTxaxDcM73WmmHZ6LtHEaMMW3OundAlV0ie3euFcm5wKMYkruSlmAABY2AAE50rKDAuuSwsAcKAFmTQAOvKADJvegGE4CgAAMKnHWsgHCe4iJoTIgAH2IllT4kiunEQ+hxWAREADcNTMIACUADiAAhSSpcZFXSWcY0xyASrjJ2LTWExRACIRmUQAbnqGkAADpLRAiAHnrFIpDDKAAXjQA2fIm0AAzqo5xykGIIAck0GhUDoK2QAV4GAAqlR5gAY7UAAhGgAF80ANlyysVZfMoNsR+oBoDsS+BI3cd56CgBxCYcegkrrX1AKpEqF0MWgF6bASRp5loAGJ8bmHMPjZaxLMVDM4jjfF+KeKCTBg+TZzAJCgAALQ3gRUi5wKL+63h2JizFaEvFrNKuM5g0rSV9KMKeAq2VFVgGVSy-uHiNk7EUjsSUcpACznurQAmAp6EAIyuNx9lJEAHNywhJwFgkO6Y0swJDgIZMyfA+z7n+h-IAe+jpyaxdaMVWgB9OS1tFeMgA71MABkZehArwkNIAeB1ADD+oAZSMfz+mCjsQI-pAD+CYAWUUzWJr0PswAWAn6X5LMTEzzxBjkhPs4c1zoWPLHJrUgbIkj4EAFIqgBJ6IgPsHZoAJCAG+fQA+37yiuYZacgBR-UAN4ZQLAAWipUwAECoKjdfgQAcCqAFu-WYCprnq1INC-ka7Zj+ruY21W7qkgUEoKg6FegHUKkAEuRgAyvUANDuDY2QSAlpGpIohAA88g0QA+UrUHhcIrAorxU8VPJMu2FETCtUac09cV0NU5W6TM2ZN49ySplTYHFLA8V4qJSS5gpYc15oaIAUYNACtiiS3pnw1XERpapOl+NkYkt1Wy8j10uXEp5QvflQrQAiuRRgCRCHQBIdXMgVD6GKKYfShgTKOH5NzKvIwODMnYA8TYGSyRbBNyoQwOuAA6nhaCI0qWTVGcEgA6+O8QwRsOgFw3MqIgAoOUNIADW18CAD0dQA5AYeYwBZ6ztmoj0H07JtgaEzORfRtF-C9nHMubcxFzTXntOzL84FkL4XzOpZs-hWLOxI2AEYdJInpK1lHjPgJIgBK6OEGuzdbq5y7qvWUe5EaVY5H2ZyU5DRt6IKSHoNrnXxANCsjc98ehADLfhu2Yzqn0Db0DVuriLpMSNAMqU5gBDu0AM2xXqwENkAHSpYhxCGjrTMdTuXvPzPdEkecsxLlhcAP3RcaUENDZvMZoIkYO7bFQZviCyiPStlZfXFBKKNMulSZ9j1LaX0tUoyklzLhkCfh0Jlg3L8mFOKThBTKG0NNNU1hjThU8t4avLysA4nhUg-i7APip5JVKuhyRxZ3jkDLP54LtZBrueYuR+qmnmqpXSv43ztZwuAaK42KLsARq2d8WM6q5LUXyt2aIg5w8TnmCACwiOLe32eJZsDrsrtmMtG6ywABWQKcOA6MS5EVK5ZvXZFC4lPIlgMR2EsAQVqQhIiRUVlR-5yVIi3F+J8Ryc-Zg4aJCcl80kfZY4JANEAAraEhX77MAJmK0UifYRJ-J5DSmKcYep09-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-hlpnArAPoDATADBlpxlRNwxsAt7QsH9-RynKnNhABgGJmCskAG7lDQiIQAVH0Ht8JsJQAGgGmdg2YbgIhZh4XE3k36ncF6se0g23dQArIw31ZDQlhABso2imDT8nT1AAAfgAStqyKojEAC0FBocZ+gKwel8wZQRABCKE9qeSN5xl6AXqL1t8u2ZRKerAEwH87E1qQdpdxdld7DK8ddjdwCqdj8r8kwOTZdg91qNdjdhnN8tFPdrVUAfZVsGgwAODM0QGhvD5RAAZxIaEAGlY4QCpbhpIQ0EMtglwxCCSBoQAGV1AB1TRaEAEQdQMOKRIJIQACUUrJMxsRpbO67tfw1TPBfNCGpQ6Yjhsl2AIdPBd0GhMxqtWw5Dq2g1UiF58PDSGhABT3UAHdFflf8SCZQPCC0W4RW0AU5uibCBCBoA4hkA5QAf7Nu9AxABPIxjMAGdFbEXj-j0AA4wAB41b2vC6gdhKLnmso3LNPWP2OJFUN5P4Ij2Hb12dh5k9wZE3KLODC2OOPDOXc+PjOjPYBnE1kN2dh6kFkyamlBarz+c3KvO9w9P7PWofOKa-hukXO3OAYzOdhejABCK0AH9zYKE2nPRIpIrt0BjYXt-t823p-ty0qHTFMPU8Dm7DB8eAArkpdcKG8ZHVU4EwC+bDCdrLntvthCAB5AF3TYYr0F-YMruGirrrnrurt5mGO45QLKfuFr90waexP4aCaiEwMVQOZAU8KrxAQrnCbpEbiiV55VVAcwA8ZANgEKsivcZaAACRk2gE2+24OjmeVUxWYHaTIiW5whCqInu5q7pue+lS-KWcdPRb3FO7Jqa-q+lQNZ2DjaBCKv67qTMkAFnovyEKgAWUa6O5ZZaTZb+AAEk6JoAKIsAAa+51xxnmBjCif0YEeEJ7xdn4JaY-LzBHOdo2BgBjmYYBU6JGuXAuJbL1xPWdhhBKBABTRQKIkDF4aEAHfbGYHYKn4n94zn2AKZkCK6EKhn2AJnp8Fn2Atnjn-67n3nsVNgAXoXnYMXiWPyAn6nrAf8O485hacn+XwnxX5yoCVnuPA3mGBN7KU345owMiSZ85940r4iAXtcMiI1Zgf5ShLCV39GN4jAqIrYwAGm9AAYuRSF0iPRSAljVIRXd73GUDs9hYT4BK9+V996yn98j6ui521QxYd-Rk51p7hgj8D8fGJWYDJgXjGpz0AD4dQAJASMEZA54gA" target="_blank">
<img align="center" width="85" src="https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/runtab.png">
</a>
</div>

```ts
// 5.1 函数返回值类型优化
// 在 JavaScript 中，undefined 和 null 可以被理解为“没有值”和“有值，但是个空值”。而在 TypeScript 中，它们都是有意义的类型。要表示一个“什么都没有”的类型，你要使用的应该是 never 。
// 在 TypeScript 中，void 仅用于描述一个没有有效 return 语句的函数的返回值
// 在 JavaScript 中，如果一个函数没有显式的 return 语句，或是有 return 语句但是没有 return 一个值，那么它的实际计算值会是 undefined。但在 TypeScript 中，这个函数的类型只能被标记为 void 而不是 undefined，即，你可以认为这个函数“没有返回值”，而不能说这个函数“返回了一个undefined值”。
// 这么一个诡异的现象在 5.1 版本中终于得到了解决，即无有效 return 语句的函数，其返回值类型能够被标注为 undefined，但如果不进行类型标注，推导得到的值仍然是 void

const f1 = (): undefined => { } // 5.1 以下会报错: A function whose declared type is neither 'void' nor 'any' must return a value.(2355)
const f2 = (): void => { }



// 5.0 泛型参数的常量修饰
// 在此前，函数中的泛型参数推导只能推导到基础类型一级（即比字面量类型高出一个层级的类型），如 string 、string[] 这样
declare function foo<T>(x: T): T
foo('hello') // function foo<"hello">(x: "hello"): "hello"
foo([1, 2, 3]) // function foo<number[]>(x: number[]): number[]
foo({name: 'chu', birthday: [2000, 1, 1]}) // ...

// TypeScript 5.0 新增了对泛型参数的常量修饰（基本等价于常量断言），被修饰的泛型参数在进行类型信息推导时，将推导到尽可能精确的字面量类型层级：
declare function bar<const T>(x: T): T
bar('hello') // function bar<"hello">(x: "hello"): "hello"
bar([1, 2, 3]) // function bar<readonly [1, 2, 3]>(x: readonly [1, 2, 3]): readonly [1, 2, 3]
bar({name: 'chu', birthday: [2000, 1, 1]}) // ...

// 如果泛型参数的常量修饰，等价于此效果
bar({name: 'chu', birthday: [2000, 1, 1]} as const)

// 当被常量修饰的泛型参数为数组类型时，如果其泛型约束不包含 readonly，则推导出的类型将回归到泛型约束来维持其可变状态，否则才会是预期的常量推导
declare function baz1<const T extends number[]>(x: T): T
declare function baz2<const T extends readonly number[]>(x: T): T
baz1([1, 2, 3]) // function baz1<number[]>(x: number[]): number[]
baz2([1, 2, 3]) // function baz2<readonly [1, 2, 3]>(x: readonly [1, 2, 3]): readonly [1, 2, 3]



// 4.9 satisfies 操作符
type Colors = 'red' | 'green' | 'blue';
type RGB = [number, number, number];

// TypeScript 中我们并不需要为每个变量提供精确地类型标注，其强大的推导能力能够自动地完成某些类型信息的推导。
const palette1 = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255]
};

// 类型 -> const palette: {
//     red: number[];
//     green: string;
//     blue: number[];
// }

// 但在这种时候，由于我们是从值推导得到类型，而不是使用类型约束值，那么在我们提供了错误的值时，推导得到的类型信息也将出现问题，比如不小心打错了字
// 为了避免这种问题，我们通常会使用显式地类型标注
// 在我们进行变量类型信息地标注时，其实是在告诉 TypeScript 类型系统，这个变量的值必须完全符合这个类型，在后续使用这个变量时其类型信息会完全使用我们提供地类型信息，而不是其推导出的类型信息，从这个角度看，其实类型断言也是类似的功能。
const palette2: Record<Colors, string | RGB> = {
  red: [255, 0, 0],
  // 解决打错了字的情况
  grren: '#00ff00',
  blue: [0, 0, 255],
};

// 类型 -> const palette2: Record<Colors, string | RGB>

palette2.green.startsWith('#'); // × 类型“string | RGB”上不存在属性“startsWith”
palette2.red.startsWith('#'); // × 类型“string | RGB”上不存在属性“startsWith”

// 也就是说，我们现在是让值完全符合类型，然后使用我们提供的类型信息。而我们实际需要的效果则是，让值符合类型的前提下，结合使用值推导出的类型信息，也就是说 palette 只需要满足类型约束，其键值类型不会使用 string | RGB ，而是仍然使用每个属性访问推导出的对应类型。
const palette3 = {
    red: [255, 0, 0],
    green: "#00ff00",
    blue: [0, 0, 255]
} satisfies Record<Colors, string | RGB>;

// 类型 -> const palette3: {
//     red: [number, number, number];
//     green: string;
//     blue: [number, number, number];
// }

palette3.green.startsWith('#'); // √
palette3.red.startsWith('#'); // × Property 'startsWith' does not exist on type '[number, number, number]'.(2339)

// 推导得到的类型实际上是我们标注类型的子类型
// 当我们写出 satisfies Record<Colors, string | RGB> 时，实际上是在进行类型的向上转换（抽象），即 upcast。
// 使用类型断言的本质还是让显式提供的类型信息完全覆盖推导得到的类型信息
// 更可怕的一点是，类型断言是允许你把不正确的值断言成提供的类型信息的
// 就像 Top Type 对应到 Bottom Type 一样，upcast 其实也可以对应到 downcast ，即向下断言，但不同的是，upcast 很多时候是自动实现的，而 downcast 则必须要手动实现，以及附加类型检查。
// 如果我们想要执行 downcast，比如从 Animal 类型向下转换到其子类型，这个时候就可能出现问题，因为我们无法确定此时它是否真的是对应的子类型，所以通常需要配合类型守卫。



// 4.8 交叉类型与联合类型的类型收窄增强
// 为什么说 {} 是万物起源？基于 TypeScript 的结构化类型比较，两个类型之间的兼容性是通过它们内部的属性类型是否一致来比较的
class Cat {
  eat() { }
}
function feedCat(cat: Cat) { }

class Dog1 {
  eat() { }
}
feedCat(new Dog1())
// 在这个例子中 feedCat 函数可以接受 Dog 类型的参数，原因就是 Dog 类型与 Cat 类型在结构化类型系统（鸭子类型 🦆）比较下被认为是一致的。
// 更进一步，如果此时 Dog 新增一个方法：
class Dog2 {
  eat() { }
  bark() { }
}
feedCat(new Dog2())
// 此时这个例子仍然成立，原因就在于此时 Dog 类型相比 Cat 类型多了一个属性，在结构化类型系统的判断下可以认为 Dog 类型是 Cat 类型的子类型

// 由于 {} 就是一个空对象，因此除 null、undefined 以外的一切基础类型，都可以被视为是继承于 {} 之后派生出来的
// 在 4.8 版本，现在 unknown 和 {} | null | undefined 可以互相兼容

declare let v1: unknown;
declare let v2: {} | null | undefined;
v1 = v2;
v2 = v1;

// 交叉是同时满足两个类型，(A & B <===> A = x 且 B = x)
// 子类 & 父类 === 子类
// null & {}、undefined & {} 会直接被判断为 never ，从而消失在联合类型结果中
type T1 = {} & string // string
type T3 = {} & object // object
type T4 = {} & { x: number } // { x: number }
type T5 = {} & null // never
type T6 = {} & undefined // never

// 在 4.7 版本中 TypeScript 支持了 infer extends 语法，使得我们可以直接一步就 infer 到预期类型的值，而不需要再次进行条件语句判断
// 4.8 版本在此基础上进行了进一步地增强，当 infer 被约束为一个原始类型，那么它现在会尽可能将 infer 的类型信息推导到字面量类型的级别
// 此前为 number，现在为 '100'
type SomeNum = '100' extends `${infer U extends number}` ? U : never
// 此前为 boolean，现在为 'true'
type SomeBool = 'true' extends `${infer U extends boolean}` ? U : never
// 同时，TypeScript 会检查提取出的值能否重新映射回初始的字符串，如 SomeNum 中会检查 String(Number("100")) 是否等于 "100"，
// String(Number("1.0")) → "1"，≠ "1.0"
type JustNumber = '1.0' extends `${infer T extends number}` ? T : never



// 4.7 只读元组
// 在 TypeScript 中，通常我们认为元组是定长的数组，在这种情况下其 length 属性是固定的。但其实还存在着特殊的情况，如元组中的部分元素是可选的，或直接是一个开放式的元组，如：
type OptionalElementTuple = [number, string?]
type OpenEndTuple = [number,...string[]]

// 在这种情况下，其长度不再固定。
// 但是，一旦这个元组被标记为 readonly，那么其长度就应当也被标记为 readonly，等同于其 length 属性被标记为 readonly，而在 4.7 版本以前并没有此限制：
declare const x: readonly [number?];
x.length = 0; // 4.7 之前正常
declare const y: readonly [number, ...number[]];
y.length = 0; // 4.7 之前正常
// 因此，在 4.7 版本中对这一问题进行了改进，现在只读元组的 length 属性也将是 readonly 的。



// 4.6 支持在 super() 前执行代码（Allowing Code in Constructors Before super()）
class Foo {
  constructor(name: string) {}
}

class Bar extends Foo {
  someProperty = true;

  constructor(name: string) {
    // 4.6 之前报错: A 'super' call must be the first statement in the constructor when a class contains initialized properties, parameter properties, or private identifiers.(2376)
    const transformed = transformer(name);
    super(transformed);
  }
}

const transformer = (arg: string) => {
  return "linbudu";
};

// 这一特性允许了在 super 调用前去执行没有引用 this 的代码
// 对于没有使用 this 的代码来说，其实在 super 前调用时不应该抛出错误（实际上 ES6 就是支持这么做的）

interface D<T> {
    prop: T;
}

declare let d1: D<D<D<D<D<D<string>>>>>>;
declare let d2: D<D<D<D<D<string>>>>>;

d1 = d2;
// 我们能够很明显的确定，这里的赋值操作应当是不成立的，因为 d2 的嵌套要少了一层，但是先前版本的 TypeScript 不会报错。
// 以上这种情况在 TypeScript 4.5.3 以后的版本就能够检查出错误。



// 4.5 新的工具类型 Awaited，用于提取 Promise 的内部值，并替换了一批相关的 Promise 内部声明定义
// A = string
type A = Awaited<Promise<string>>
// B = number
type B = Awaited<Promise<Promise<number>>>
// C = boolean | number
type C = Awaited<boolean | Promise<number>>

// 基于模板字符串类型的类型守卫
interface Success {
    type: `${string}Success`;
    body: string;
}

interface Error {
    type: `${string}Error`;
    message: string;
}

function handler(r: Success | Error) {
    if (r.type === "HttpSuccess") {
        // 'r' has type 'Success'
        let token = r.body;
    }
}

// 引用语句支持 type 修饰词（type Modifiers on Import Names）
// import type { BaseType } from "./some-module.js";
// 值导入与类型导入的混用
// import { someFunc, type BaseType } from "./some-module.js";

// 导入断言（Import Assertions）
// import obj from './something.json' assert { type: 'json' }

// 动态 import() 也可以通过第二个参数使用这个断言。
// const obj = await import('./something.json', {
//   assert: { type: 'json' },
// })

// 条件类型的尾递归优化...
```

## TypeScript 深入

### [TypeScript 中的协变与逆变](https://zhuanlan.zhihu.com/p/454202284)

<div align="right">
<a href="https://www.typescriptlang.org/zh/play?ts=5.1.3&ssl=60&ssc=18&pln=1&pc=1#code/PTAEhnEx4G0f7NCNjR85UJhKgsf8ArahvH0PfKhTuUJZGhVHUDYndQELdB8pUF+AwGH-AxeUFg5CwTlNAN5WPkEhzc6jQaPVAIf4DOAVwBGAFwCeABwCmgSH-Ao-qBvDIqB8TTiBI40BrcoBu5EoC-1dPxEBDATNCTZcwEAMAKADGAGzMDQAQQB2ASwC2Jp1AAbztQUDMABRkxAAoASmCAXztk51dQABEAewBzUBkADzEZTwATNy8-AODQ0FMAJwBreKSUxxcBNwBhLPqc73yikvLM3JqwhyFilqDk5LsAMyFPBzFvLM9Qf0aZbJyAIRMmmNLcgC5RnISQsNOcgDoG5ri2uxBQQAN5QAj9QE7tQGQzQCLyoAG50ANN6AADlALOegHozHAkKiAA7VAFxygAEjTiAe-N9IBfhKhgHWnKiYwBY8oACFVoIMAMXIQqiANz06FDUSRABVKgEsnQkk5HYQCb8eACYBso0AX4pgwBUcoBMVMA99H2ba7XKHY6eGQAd1APT63niL3eRkAOASVfxOQC4BCRAEPKgAdTBiAaVjAJt+Wr2BpN9g1PFAACIdQEnaBALRygC5-QCIOoA9HUA5AbOp5O2hGZ17d0ewAA6YBAyMAp9GBiUmHZ7GXNOWK11ONV2N5gQCxioBodyFgGj5VBUQDiCoA+6KBgAp1QCIRjp2ELAA2mJEAv4rGqiAYO1AKXGgDZTIVdwA68oiTVRAG6KRkRl1AAFoAHyXPiAZ2UTUZAHBygBX4wB7aoAeBUA4uqzva2OxWCx7ABiJlWvQkoAAvKAYkccgILnsEo-l3tFstVnWTYxHqExPAEBZel8PYvFKdMTlyG873qCRP0Q28xHva5agcDYBDEUA7ifQj0OQiQYkzS5c1uXJHiOZ5XneQBZxMATodQFY9iWPzUBADm5QAoOUAI3SSHLD0qBAsCIKgmCynTUAjWNHA+0AdeVLiQzCULk3gqDuNT7zkmc5x-S5uK5QB++ShWNAEHowA4M0M38xhIXgoUAAblAAk5QB8f8AQ7tAGbYtzABHIwBo-Xc7jAH05QBGHUAF+iqGwQBoOQ5MFAElvQB4fUABCNAGmvZBuJibNQEAJMIlV6foEkAHyIXz2PLLhebjAFR9QBTRUAMATmEAeWVmG4wB4tMAAXdAAXzIVAHnEkhmEANGUqDawBpOSGsFABfAkhV0AB89ERaqhABgAobAA+3QBZ5Rm+bGpsUAlrrLkqCbWauxNRFGqoLs933BbmCoRE3OC95AGAAwBFMIKlVQFKvYqEAIM1ABzzHtAFcEwAq-UWxB2BfAAVCrlSKr7oYqr8qFXDxAEAGfZQDrQBqiLHK6DyMbBADgVQBZuUANkdQamxyjEAZ0VAG+fe0wCWwBP7UAOLkJ0ARldWcnUGLohsqxnyqGSpfOGBiFuIUfRzHccRU7jUJonJ14emAUAfFd6sAG3jGaxjwEcxwA30yoFrAHhDQBnFQ60AAHVQKkWR6gAHncZdSptkw7ZkR39kXZbGvNy23Y9r2Xet237adxd7HadIIiOEoCJuUBPBMXwZBmOZo86JUAAtvCcUpBmKMo3Fj+p4-GcIcjT64M-PaQLHcAQrwA9w+ih+uHah5dn1fPoLmFp9lwANyybxSjr2QPCbgCACVoiEepPHb2RO+7l83wuZZGk8LJ5U8b9lyhvN3i6XP89AB351AUv4+4vHjRNI3A-D0+89KZdL9D93w5vzwxG7x8z4FgBHMBPCwp8ZAOEaK3HIy8LDPkbs3FYMC4EO1fvnZchQi4jEQS3NuHdf7-1qAAfksPUIQMhagXGAU4cwoB3g0NAXfOWxprpPzDp7NBZ934Xyvs-ThhCAHPhAhQsBOdIGNDnmIBeS967EVwSsKRMjUHoJ4Vg4YFRp6KPnovVBgiSFkNEWEahICLDvBETIIAA" target="_blank">
<img align="center" width="85" src="https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/runtab.png">
</a>
</div>

```ts
// 里氏替换原则：子类可以扩展父类的功能，但不能改变父类原有的功能，子类型（subtype）必须能够替换掉他们的基类型（base type）。
class Animal {
  asPet() {}
}
class Dog extends Animal {
  bark() {}
}
class Corgi extends Dog {
  cute() {}
}

function makeDogBark(dog: Dog) {
  dog.bark()
}

// 你很容易发现第一种是可以的，因为所有的柯基都是狗，都会吠，但第二种，并不是所有的动物都会吠，所以这里会抛出一个错误。
makeDogBark(new Corgi())
// 类型“Animal”的参数不能赋给类型“Dog”的参数。
// 类型 "Animal" 中缺少属性 "bark"，但类型 "Dog" 中需要该属性。
makeDogBark(new Animal())

// 再看一个例子，假设现在我们有一个新的函数，它接收一个函数作为参数，其类型为 Dog -> Dog（即参数类型与返回值均为 Dog）。
type DogFactory = (args: Dog) => Dog
function transformDogAndBark(dogFactory: DogFactory) {
  const dog = dogFactory(new Dog())
  dog.bark()
}

// 重点 重点 重点
// 从上面的例子中，transformDogAndBark 的参数可以接受 DogFactory 的子类型，dogFactory 的类型为 Dog => Dog
// 这里便是要证明 Dog => Dog 的子类型是什么？满足什么规律？
// 也就说，以下这一等式成立：
// (Animal → Corgi) ≼ (Dog → Dog)

// 引入逆变协变
// 随着某一个量的变化，随之变化一致的即称为协变，而变化相反的即称为逆变。 而在这里，我们称函数参数为逆变，函数返回值为协变，为什么？
// 考虑 Corgi ≼ Dog，如果它遵循协变，则有 (T → Corgi) ≼ (T → Dog)，即 A、B 在被作为函数返回值类型以后仍然遵循一致的子类型关系。
// 而对于参数，由于其遵循逆变，则有 (Dog → T) ≼ (Corgi → T)，即 A、B 被作为函数参数类型以后其子类型关系发生逆转。
// 在 A ≼ B 时，协变意味着 Wrapper<A> ≼ Wrapper<B>，而逆变意味着 Wrapper<B> ≼ Wrapper<A>。

class Parent {
  name() {}
}
class Child extends Parent {
  age() {}
}

type AsFuncArgType<T> = (arg: T) => void
type AsFuncReturnType<T> = (arg: unknown) => T

// Child <- Parent
// 作为函数参数时，Wrapper<Child> <- Wrapper<Parent> === false
type CheckArgType = AsFuncArgType<Child> extends AsFuncArgType<Parent>
  ? true
  : false // false

// 作为函数返回值时，Wrapper<Child> <- Wrapper<Parent> === true
type CheckReturnType = AsFuncReturnType<Child> extends AsFuncReturnType<Parent>
  ? true
  : false // true
```

### [TypeScript 类型体操](https://www.lilnong.top/static/html/booklet.html?id=7047524421182947366&sectionIdx=0)

<div align="right">
<a href="https://www.typescriptlang.org/zh/play?ts=5.1.3#code/PTAEm2bRo9QKBVG8fSg0f0NBehaOUCFugN5UPOJhGHUHozKWMPQeYVVA300Bh-lQeL01cNAeBUCx5QCnVA3RUAX4wGQjLAskaBqiMB2HoCztalBaAIf8SBIf8D6cgXaBO00CrNkMDAMYApXQIAM8IYDztQNHygNGVAkt7xAPPIZA5ka9A4-EpDgUTTAi8qB8V0GtRYjCQhIQH95QHT9QGO5QEAPQFbrDEQxQEk5QGQzQDi5QFnE7WpANz1ABeNAcWVAMLlAVwdAbltAcgNAODlAUjlAChjSwCAGAMAsBMAOPUBEI0AbuUAwHVAAQQAnPoBDAE8AHgAVAD5QNFBx0EBN+MB2CwxAKnNAaVjmQCN9QHh9QAQjQC45UAAqY8RAIeVAB1NcU9BANCNAUADAF+iT46hEU+pAGADu-qGxgB2AFcALYAIwApn1pstAE+6gHm-EymQAx2oBV6wwgAfPI6nVwXS63R4EV5XUwfY4NAKIQAR2oBrZV0AEsAM6gekA0CAZ0VAHSpgHVtALdYEggDyfQAygAXPqgQAqAYAIFUQgEp-QDwOoBgYMAL2rUQB9PiJAAxKoEZEtZAHMAgBjAD2AP1LMZ4r6RtAAF5QAAKQZ9Q0ALlAQIBAGsAWaAO4AgCUjumYuGAAcIWaAGagN2Gx0Op0Acn1doBhrT0ACcZ9JrF9It3sZEIAkmLnQLhbavQLIZKAD56g3ZsMAbwCoBZCedTNtRproLrEpDXYCg-bycAv4qXTKAQptAJDmgHdY7VKxBqjCAHXkMldALnygDZHAiyxA93ugc2Ws0AGwhADpb2bDSOhaKJU+IdmxQALEMXgAvgEwFTsyXLcoAbKaACFe55wNeVrTlmyZOq67pej6-pBqGXpJtabbIeGoCRjG8aJu6KbppmRq5vmhbFqWQLllWb5jn0Dagk2oCttRHagN2cC9vS-ZIcOtYfn0E78RevYIXej7Pq+4m2l+P7-kBIF5nAgAvboApcbEdGsYJgogD3yoAp3KANvxgAAcoAptYwYg1CADAqKyALgGgD3sdQgAb8eZQTaCylpioMAImkZoCAKbmFm8CYsSQLSDRwAWwUMWyTGVtWykShx4JQtxBFGpOgl9i6JGhRlkqplRM5pgVYCXleFqMvJT4vqxEmqYaf4AYVwFwKBcCshyPLUKZlm2fZMCsmKUJxoMIWgBWAAyL4VgCACq5Z9AACn0ZpRsy3ZCYyS2GqyXpgma8lBQA3NAvYAoMIIQl6vGGjdoGTdNs0QvNq0AsdrLrVC227ftt3Wv9AJnRd97XWDcY7SCz0zm9eYlaAgNbTte2OvNx0rRjwPY62Fa-RDBNY4yN3QIlRYlmyhoQmKGMrXGZrOql7G48ta0bYTzLE6TL4A7zFMhkjhEHaAfSM0CfRsmm92PWm-lljlAD8qt9A+ivfRhG0PvDZogijdFJXToBRvSJq+iKRr3gAaoMt5AhCEyTM6ZpggAVl64wADSgL6ELDF6QfDGR4xi3MADaYcRwAutJhXS2Kstsp7Xux8H8c3b1WlgNoVmAFRyuCAFFGgBYmoAIJqAF+KgANzhggAa2quYXUOwiCoIAM4mSJAhC4PFYDmYAQWaUKXcygBCAAeU0AgAJsyGcQkWoCAGAugDHkUc8xCIACmmAGxKByAJ-agCGMeeNPJRbVs23bEKO87rvzJP09z6AC9FgHq3j1P35P3HCZTM6YMZ19n7MGYcvSrWgFHcY0dVqJ0linNOz9vZZ2GDnaAfUwCACJfQAqPqAD9vQAsCrzVnpPUAttDT3VTtLAIulADHyqAAAYhdUArhABQcuYQA73LJGLpyZggALRUABcJRwXoIEgNQQAsHK7z2IADRUMA0LqOYRyyRQAACVF5mj6DPUYL0A4vUmNAD6fQZpzQYWaaSvZkGMnFkaeOljswmzgMwEIgALm0APCGGACDUEAIyuiiABSIpQDmUcpQRoDhLjcnKNyQAZN6ACY5QA-dGADvUo+gA9HVKNQQAB2qABNrQOwcyLGNABgQAy36ABzzVgRIhGtkbFCBoaNjEAGlg44x-vQxhcAymgAqX0aAaM6nDEFHGHoAJhgNOyQmIKgyWkzlyu03KjJhjgjvPnUAgACM0ACA6iBQAAFlBhRhjDPOYhlGQBCProE0t5BiMmZOwPZMYRQmjtFGMUoB96ABS9GKBBsGIGkCtGexDxiGTkNQQAxQmAAk5QAQZqAFV5fe7zIA7kAHfygBOU0AEYqgB8f8ACregAJCwICsxA-csnh1-qAAggBT80AEfRUK0CAAEjZcGBsHUEANfKgAtBWwSSnFUDumJwIIANeUoWAAXzIu2CWB0sZVg+JOKBoEG0MkQAsgmADDlM8kAMDcEAOneEScWABM0-IzBzJYFMNQbBI16XauoH5M5oAlURMFakFZOLUkHChdII5JyznMnMHIcyfkXq6CmYAGJU9SzPOreUAO4jhh2oAsDuuKI6gA5dXalWDCB5WzJMziOUeJ+rvHkuV1AfVCI5YAErlACTynwwAYEp4EAFfKgBLJUANByCbkz5AaPowx30ACKpjEw2ONL2MEWUmxoNRoZDZWzfkxjdjjSW0dukq0afME1AADAAJJ2CdAAyGtgEF3LtXeu+pK6XqARndY0A0cwa9lZdnYBdVT0oPPZeS98cwZ3tAmjTZUYW1OmfUO12TbdGCTWQAWmmAJWqiZBiDC9NHLRNbtEzlQYVMEcGwPtIDohtpya+gwbAKBAIgBDc0AG9yayADCFoZ70mSk7K5EIDlwFw4gNezdOCGAUIACP1tKACHI6ggB6VSsoAAHTACBkcuKyYg157EADTmGB42nDBZQajkBADfPoAfb9WCQUAGNp2pADNsYAfE0MCAEP5QA9gZhXEGSYahAnjUGk8uSgojWCAGmvQA3ErIj2IAEiVAC1ptQQAK9YgsAKe6gB3RUAMl62RADZ8hgec1BePaEAOxG7BfKUEAATygBTRSuAIVg9nQDSbyc5uo0gH5f2ZEGqAgAyv0APrmcgAjskUVl2ejJQ2AEjbQAU8rakAPLKWByiADAErAgAPt3ZBgYtrcw2AAN5cygAA70AKrKa8DjUEAGe6gBO+JioAF7NAAFSoAW6doJecAMry1BADPytNxA83AC92oAP3NAD+euASg0hADOyhtybiA0BUvYFNwA9QFiGXIAQH--nlafnsKzFI4BFsAMB6OxUsABEmQGjBECYsAA3b6hHZ4kbpmRj9lGwD72SIk5IgAPiLxBgQAAxaEoctJjgSJKCAHxzQAV4GAAqlItbhtRyuYVU-tAA5QYQcNFTBxvfT+FXQDnUumyDWaYACaysvRpnp7mNGAB1IY2yIQs+mE6aO4xE5veZNHbnMMASJz54L0AwvRcLIAET0-17lfX-P9edP7UD6ioOpq7KdIz5nowpmtjVxCIK36wCG-N2jenZoxRW5B2DmXONJdbJ2U71DuVXfu4CCuIQh7E6AFyMwAaJqAFBlQAoxEYDlVcVu0nIoObEJQVgnQ5WU+oEWwA1Er56cxSNGv06YLRI1CMjToACMuU0wACYxf9orHGevFpG9TSGAGp0A+-pN5Hx-R+zIpkawlC7HXoAZq3nLKABKTtywLNZHGHKEEAiABpvYu0-sugEKyZOLGAoClsAL8BBx5xwTAAfwAMXJFxP5zoNuHnMBGdA+P-SYLFEwBlo544wwHRpgd8colECVi5AAXUzWzDXnAwEABX4wAPbVmBEAMBABZeUADt-ePSAyUaAwAA2VAA7YzrQCEAGV9DZYYFRChAED9UALQDIPEMeXQaAoQQAPjMdhNhpB5gjgSoyJWYzRqACDlEhB4DNhBEZxqBTskC0CMDIB-kQVCkx5ABDu1U2kwwEK2oDwDQP8l30lDRAwGUTyWYB63DWgNO3v0uBQPQNxEgApAQgeSmitFQijiEXANbXgTllADTF-AhFvGfFAEDDUVvBnlzEfX7XWRoJljlg-QmHfyfl-3-3dEANGRALAOmFGTlzHmVxdDBj-wfAANwmALvUyP0KgLBg1iUTBgbAhEhw6QtxjGIgozFGiNoLTgYLfRiLoPiIEITBcLFGmHGWQm3wBAMLyV8nchMhv1EQIGBUAF9NQAAzlAB7g2oA6DdUAFklQAe69AAAfTcDQGaEAEHIjAYuYwQABW14BXNqBABXDMACN0wAXCVABpzVMEoEAAlFDgwALk8iCsDc1AAkuWoDIFACWkGGI0TTAEAAqswANvNAB5HVbkAHfowAIRs0DAA4FUAFjFQAbuVAAmO0AGXzQAfHdDBLgSC6hRClAFgi53JqBEB5N2BAB24JCA020x02kBaDChJ2SFwwwEADe9QAffjAAK4yczkBRJ0Jv26FEJRMAH3YwAeLSYorg+TAAf7WrhbkAABzFEloVgNA8khUopL7MAM5AIE1ZxQAZxVAABd0AAG5IFJFXrQAcGMTSkBABF6MAAs1DAQADkDAApFUAEnowAYO1Q0S4cAYpCBySxFABYc0AGjDE0nFA4C0njRMZkQAEjlABCayRVERvz0ljPoXojpiRQWLiUAAyMp7G1OYEUB0x01gbQQAUqNABMVMAAOnasjAQAXqNet0yWFb9AAbeMACNjBudgQANidLj5V2QZNqBkdAA5jMABsswAbSdRE2sasMAByvSCBRFl5esMBqByUzJeteM3j0y9ggDhhAS0BABpuSsiWEAC59XgUuQAfOVEAvVAAG00QHZClGbhxWUJ40AFgvQAOv1AARyOVCskAE6HagJ5QAU+ityTU9grzIBbzMDuyHI0Tty7yYA9EARh9G1egAR6QQQyNOxgIG0vpQAAcIQco8j+l0LMKwZvkoQKwZ5u0oRe0cK5oAAJNRNfIitCjCgNSWX8JiysKilDbKDpUCe8B5cizmfCnKJ0TsUAYSyir0AABlAB6jAEyBTNsm1CwOgEEtAE4r6HLHbydGEvTMYu0ohACDeLyD2EAEdFRyDAaCkRNEsQLA7UPs9SxmTSrizvHGfSk1YitigyrikywAZ4N-KOgrJAAaIMAFNVSgQATAVjUBk3MQVeVcAWFCBeUHJAAxeQIC8TQEABQEwAEBVABZz0AFmTHcXrRcelDASoQAXDkZRABcf2oG1G5VskQCrPyF9KivMhAuZB3NGWoFgtAt638p4ximoCPBRN6zwEAAnlZcRAbIT4-IaQCgo8dYwASciQg0yTVRk8lABRg0AFbFVzQAYPjy45AGgNKtLywABmDygiyUdagZXyoygIFEluDoZcfIb0P0AMYMagEs5HB8qczrOMouTAmahQLAPYV6wAHAJETETesOrQAdzMIPq2RAByFUAFwCZyh5U6iEAAFkupyhNQRuwjuq3wCEAE8nQAKOtMCSbSgDSBkAhwVnNi5EAiQNrEBkUeNABOCxIK9IwCprCkACx-mmwZRAcoQAb7kwVMCC1ABfhOZtioUHjXbxXQ2qKRluGDp2aIrEZH6TGFZydHcryPmBXXb3nz6EXy9BXy3zRnGFaI1q1pxhtoGVGGyPXzAAX2MoCABHqJynYGkzQH2vJuoGUOkymwIDxCyEABQ5S-IkD2howFIFPSPQ6Omiy21o+nT2voEdJ0dnGfXiriDWdvL0TvSgseI4ROyUSgJo76K2-UVOholRZkTOlOtOp3NO4YsAUugINc6gHjZzNpNO4RHQlMtMrO0-Uul0TbRAW7SbEuvuygAgC00RVIHjageO1A3uhogCNGDWmuqEDOw9RXRIlXUuzXYiE23WZfTfYyzexkbevoOuu26+pu0u1uk+l2AIVVdJMyZPagDa72vDSANABQP2smgOwpPEI4bq1gFel+iEBgn1c2mB-tDAGUTIAW5O-ULW3e4eznOfUAfO0AQutBsULWu+hu9Bh2p2uAdvVsTvIAA" target="_blank">
<img align="center" width="85" src="https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/runtab.png">
</a>
</div>

```ts
// 泛型
// 类型编程中的变量就是泛型
// 就像编程时，程序中变量的值会在其运行时才被确定，泛型的值（类型）也是在方法被调用、类被实例化等类似的执行过程实际发生时才会被确定的
// 泛型使得代码段的类型定义易于重用，并提升了灵活性与严谨性。
// 通常我们将 Array<T> 中 T 这样的未赋值形式成为 **类型参数变量** 或者说 **泛型类型**，而将 Array<number> 这样已经实例化完毕的称为 **实际类型参数** 或者是 **参数化类型**。

// 类型守卫、is in 关键字
// 将 numOrStr 联合类型缩小范围，精确到 string
// const isString = (arg: unknown) => typeof arg === 'string'

// function useIt(numOrStr: number | string) {
//   if (isString(numOrStr)) {
// isString 函数并没有起到缩小类型范围的作用，参数依然是联合类型
//     console.log(numOrStr.length)
//   }
// }

// is 关键字收窄类型
// const isString = (arg: unknown): arg is string => typeof arg === 'string'

// function useIt(numOrStr: number | string) {
//   if (isString(numOrStr)) {
//     console.log(numOrStr.length)
//   }
// }

// 直接 typeof 也可以进一步收窄类型，同样的思路，还可以使用 instanceof 来进行实例的类型守卫。
// function useIt(numOrStr: number | string) {
//   if (typeof numOrStr === 'string') {
//     console.log(numOrStr.length)
//   }
// }

// in 关键字，也可以进一步收窄类型
interface ILogInUserProps {
  isLogin: boolean;
  name: string;
}

interface IUnLoginUserProps {
  isLogin: boolean;
  from: string;
}

type UserProps = ILogInUserProps | IUnLoginUserProps;

function getUserInfo(user: ILogInUserProps | IUnLoginUserProps): string {
  return 'name' in user ? user.name : user.from;
}

// function pickSingleValue<T>(obj: T, key: keyof T): T[keyof T] {
//   return obj[key];
// }

// 用一个变量把多处出现的存起来，在类型编程里，泛型就是变量。
// 可以暂时把 T extends object 理解为 T 被限制为对象类型
function pickSingleValue<T extends object, U extends keyof T>(
  obj: T,
  key: U
): T[U] {
  return obj[key];
}

// 索引签名 Index Signature
// 接口 Foo 实际上等价于一个键值全部为 string 类型，不限制成员的接口。等同于 Record<string, string>
interface Foo {
  [keys: string]: string;
}

// 值得注意的是，由于 JS 可以同时通过数字与字符串访问对象属性，因此 keyof Foo 的结果会是 string | number。
type FooKey = keyof Foo // string | number
type KeyOfAny = keyof any // string | number | symbol

// 映射类型 Mapped Types
// 对象、class 在 TypeScript 对应的类型是索引类型（Index Type），那么如何对索引类型作修改呢？答案是映射类型。
// keyof T 是查询索引类型中所有的索引，叫做索引查询。
// T[Key] 是取索引类型某个索引的值，叫做索引访问。
// in 是用于遍历联合类型的运算符。
// 除了值可以变化，索引也可以做变化，用 as 运算符，叫做重映射。
// 因为索引类型（对象、class 等）可以用 string、number 和 symbol 作为 key，这里 keyof T 取出的索引就是 string | number | symbol 的联合类型，和 string 取交叉部分就只剩下 string 了。
interface Q {
  a: string
  b: number
}

type MapType<T> = {
  [Key in keyof T as `${Key & string}${Key & string}${Key & string}`]: [
    T[Key],
    T[Key],
    T[Key]
  ]
}

type MapQ = MapType<Q>
//  类型 -> {
//   aaa: [string, string, string];
//   bbb: [number, number, number];
// }


// 条件类型 Conditional Types
// 条件类型理解起来其实也很直观，唯一需要有一定理解成本的就是 **何时条件类型系统会收集到足够的信息来确定类型**，也就是说，条件类型有时不会立刻完成判断，比如工具库提供的函数，需要用户在使用时传入参数才会完成 条件类型 的判断。（extends 作为泛型约束）
// 关于 extends，这涉及到协变与逆变相关的部分，在这里你可以简单理解为，左边的类型更加狭窄具体，右边的类型更加宽松广泛时（即，右边类型中有的在左边肯定有！），extends 成立。

// 分布式条件类型 Distributive Conditional Types
// 对于属于裸类型参数的检查类型，条件类型会在实例化时期自动分发到联合类型上。
type Naked<T> = T extends boolean ? 'Y' : 'N'
type Wrapped<T> = [T] extends [boolean] ? 'Y' : 'N'

// "N" | "Y"
type Distributed = Naked<number | boolean>
// "N"
type NotDistributed = Wrapped<number | boolean>
// 没有被 [] 额外包装的联合类型参数，在条件类型进行判定时会将联合类型分发，分别进行判断。

type UnionLiteral = 1 | '2'
type IfUnionLiteral = UnionLiteral extends number ? true : false // false

// infer 关键字
// 第一个 extends 约束可传入的泛型只能为函数类型
// 第二个 extends 作为条件判断
// (...args: any[]) => infer R 是一个整体，这里函数的返回值类型的位置被 infer R 占据了。
// 当 MyReturnType 被调用，类型参数 T 、R 被显式赋值（T 为 typeof foo，infer R被整体赋值为 string，即函数的返回值类型），如果 T 满足条件类型的约束，就返回 infer 完毕的 R 的值，在这里 R 即为函数的返回值实际类型。

const test = (): string => {
  return 'hello world'
}

type MyReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : never

type testMyReturnType = MyReturnType<typeof test> // string

// infer 的使用思路可能不是那么好习惯，我们可以用前端开发中常见的一个例子类比，页面初始化时先显示占位交互，像 Loading / 骨架屏，在请求返回后再去渲染真实数据。infer 也是这个思路，类型系统在获得足够的信息（通常来自于条件的延迟推断）后，就能将 infer 后跟随的类型参数推导出来，最后通常会返回这个推导结果。

// as
// as 意味着什么？你指着编译器的脸告诉它，这个变量的类型就是这个，不服憋着。
// 为什么要 as 两次？不能直接 as Function？好问题！因为 TS编译器会用报错狠狠的抽你 as 实际上只能转换存在父子类型的关系，对于风马牛不相及的关系它是不理你的，所以你需要先 as 成 any，像中介一样强行把原类型和新类型关联起来。
// 如果要稍微规范一点，应该先 as 成原类型和新类型的父类型，再 as 成新类型

interface Animal {}
interface Deer extends Animal {
  deerId: number
}
interface Horse extends Animal {
  horseId: number
}

let deer: Deer = { deerId: 0 }
// 并不能一步到位
let horse1 = deer as Horse
// 先提升成共同的父类型，再定位到子类型
let horse2 = deer as Animal as Horse
// 先想想我们一般啥时候用 any，比如某个变量实际上就是某个类型，但是由于中途各种操作你没做的严丝合缝，到某一步类型报错了，这个时候可以先 as 成 any，再 as 成你想要的类型，然后你就又有类型提示了（当然，我觉得直接 as any 的情况比较多）。
let horse3 = deer as any as Horse
// 后来，我们有了 unknown，编译器对于关联不相关的两个类型的提示也变成了 “求求你先 as 成 unknown 吧”
let horse4 = deer as unknown as Horse

// 特殊类型的特性
// any
// 如何判断一个类型是 any 类型呢？要根据它的特性来：
// any 类型与任何类型的交叉都是 any，也就是 1 & any 结果是 any。
type IsAny<T> = 2 extends T & 1 ? true : false
type TestIsAny = IsAny<any> // true

// never 在条件类型中比较特殊，如果条件类型左边是类型参数，并且传入的是 never，那么直接返回 never
type TestNever<T> = T extends number ? 1 : 2
// 当 T 为 never 时
type TestNeverRes = TestNever<never> // never
// 所以，要判断 never 类型，就不能直接 T extends never (右边类型在左边为 never 时是什么不重要，直接返回 never)
type IsNever<T> = [T] extends [never] ? true : false
type IsNeverRes = IsNever<never> // true
// 除此以外，any 在条件类型中也比较特殊，如果类型参数为 any，会直接返回 trueType 和 falseType 的合并：
type TestAny<T> = T extends number ? 1 : 2
type TestAnyRes = TestAny<any> // 1 | 2
```

### TS 已经有模块系统了，为什么还需要 NameSpace？

这个问题等价于：

>**Q：** 柯南已经有灰原哀了，为什么还需要毛利兰？
>
>**A：** 得先分清楚谁是青梅竹马谁是天降。

**`NameSpace` 本质是 `JS` 的原始闭包，不关注代码是同步还是异步加载的，只关注使用体验。**

### [写 TypeScript 时，什么时候用 any？什么时候用 unknown？有没有规律或准则？](https://www.zhihu.com/question/355283769)

两者最大的区别就是 `unknown` 只是个 `top type`，而 `any` 即是 `top type` 又是 `bottom type`, **这导致 `any` 基本上就是放弃了任何类型检查**。

1. 如果一个**变量的类型是动态的**，就用 `any`。
2. 如果一个**变量的类型是固定的**，但是目前还不能确定或不想确定，就用 `unknown`。要用这个变量的时候就断言一下吧，不能像 `any` 那样糊里糊涂地用。

## TypeScript 基础

<div align="right">
<a href="https://www.typescriptlang.org/zh/play?ts=5.1.3#code/PTAEgKyR4P8LH-AX4wZCMG+mgQt0Jiph76MADphAyIcxgmAqAG8oLJGgp+6DKCaoGFygMP+Ar1oEGagc3KBwKoPdegK-GB7asqACYBDAC6DQgB1NAdsaAZxMAMSoFS9QJDmgK5VA2XKB1bUCt1rUB8ZoDZHQLByge+VAvwGAKdUBo-oEXowPjmyQN4+gaPVAXl6AX1OmAKV1ABrAKYBPAHsAM1BAduCyQCAGA2xAXB1AVejACwjAFHtAUNjAL8VAfFdAMBdAQPNABTTkQGV5QFmTQAqlQB15SIAoapBQQC-1QAEPJ2qAY0CAOwBnYVBOgFcAWwAufuGAI18AJ1AAXlAABnau3tBe6bGNgEtOgHN50AByAAtfABtzwNAAd0Dp8-4j6vPfPu3ugBEu3zGJwMCr0EnUOwUE526vhWPT63X83S2-iG-3OhwAykiUQAKI5w7pHACUdTAADoybV6gBBabTQT+aFrQZDambcbImYAbQAuocOQBGAA0oAATEKAMxchmw4TTFljFl0gA8O32AD5eUc+UchUdhdrjmKjpKOjDQIIaWMsUyprMAD7rGW7PYE7kas6XQL6o53B5PIWCkXiyXE0DBAadNrCbZdEOAUf1AN4ZgEzFHiAHgVWia1t1hpbBGNrTMhRM85MZgT5ur87MFljBIWy3N1WIANSgCYh1NGQCncoAK40AtabpQCm5lLQENdgNuoca8X2dNC9ObfXG6AALSt0Ato7PEMAKTRAHkAHKgQDxeoB0JUAaMrD6a+boAB1WvkOAG9+oIhr9jm0TgN9YI9h-hQADlAABfEMz3PVhkCkJxaD7AxB1oHBAGkjMpAHALQALm1aepgXpDM+iEURDl3Q8SVvc1ISxEiDxJFU9m2YJ-Cxa87wfAkiRDQIJgAK18SNQCcQB6M2gAAVfxb18NE2mmbZbz6YUSWFUBAFR9QBTRWQQAG01gwBg7Q8QA4uUSQAuT0APXTAHzlQBpzScGp6i43j+I+M1QGEcTH2EE4RFAa9bxY3xOmECc3MfToumXbztlHKMADdXJcoVthJXwSTNTp-Cck4nTSjyHOCvpKyFOjCwBIFOnyzFASFQZLiFe5QHDfhfGCXZfH4EkQwAURpe4xjEiTjkq84jlAbLAj6QRum6bY9k6QQJleJzrmc3qjlsvjhCOEksWFMVhWFIl6nw0BbLGFb+IWfqKTAPceNWgTHGgbTBMAASNFFAK67L6exkEAPO1AGj5BxHFobTAEZXTtAGg5QASOUAKjlAFLjQBj5QHQAs7UASTloBDPkkrem64eR6hQAAA0xyMyOmEaRpcvHQFMxxAE-tQBDGMAKDlkEAPR1AHIDEMFNe67IwAYVWGUBkjGrsaR3HCY+5mWZqEMgb00AnxA0BAEYdQTAAA5SHnDp2hAAO1QATa0AEzTxkuQBABjqhqmv4UBO0ANE1kBVwBwJWaWDAF+ErtAGqIwAxyMALjlBMAc79AH8jWX5dAQBpOVYQA+W0yQdkBqA7rgWeWQ0AZX0iHiQA-tUAfujADvUwBN+MAdgs1bp5BAG+5QB4Q1ZxBaB6yTpNkvpACx5QByuUyNXrEQDBrLADqSdZAAFEmJOmZzjgAD0G-hAhvfoRtAXxh4+Pouiclzjnl9bNrFMUAE49rAQISWHw4jmEG81pDQAxeUE2giEAWbk9C7QB-eQ8MxOfe276eR5BntZwAYlUATtNAFWbWg2dVA-wAUYQAWAmAHH40A25BCRUEFJGSclQDICpoAP5TAAJaYAeH1AAM6o-aoe9hCBDRI6fYWIOL1HsCGQAzoqADpU9Q0AwrwOPqAW8AxZrbDaKwkmx9IzNTNBMDYgh+K9BEJwzyvhBDj06Ocek9RAC9RrTewxhOyu36L4G4tBFEAITF9QADc7tHOGNCclJOjhXBHLaooBQCUNZoAB41ABwZlYmxYA2EcK4dNd8WxSF7GcftPm0wBZEOmFaN8H46JlifH4sA1i3IfBJJ4x8Z0wnRNArUaxtiWaOMAAHeiZnH4UCYLEJbjzjiMSd4mS+xIlgTAiGXsgAAKJeG8dYgR3wADVwQDA-OGbwwUbgggWEfdKE4HJiDos8eogAcAkAGg6gAbo0AO-KgBcAlAIAW+jAGADg5UA3FugH0AE2KgBArxDK8aU0wAAyvk9huXnDMScyofGqm6K03wHTzhdIJCSV4+w3JNJOecr5JxrlVlAFiR57TOmPjGg6SpzoPkXO+fUPGABCCmyAKgeEEgAKgxQ0wAC+aQ0ABvKgB5xIMHXQS+N+o2Nqp0eqjVOjNTxrQQAUiqAEno6wgALNUADoKgAja0AKVGqAsWRGztIIGHhADsRoAOw9AC78g05AgBja3FZEJFFNABXyoJQAEbZ63ZXy2gJLqYIEQPAT2gACBMAAhGRdACq8oAR31ACzKh3Eck0TjCAAEK+AAKrUrNnS-giKSRiAWEpawnt7V7EdS691NLza+sOMKC6oBABZ5oAPjk0ZJV8sMUAz8RJolAIAWjl0h6OQPQQAwfGAEvTQGalca7lAIAQptFDQUkIAZb9AAh5oACH-rAmrVoAGeVACIKiOQQt5ACQ-7QVSgBW+WoPq2gmzM2gEAOnagAL0wMIAMm9IheDxnRUApTj60lROGaMnRm2AEwCboQxwTnH3aAe0gAMAgmJNM9l6jHTH-Pu-tFMuyAC0FWQgAPt0ADAqyBADRcrQQAKHLP3qhMAYBxEBGEAN-RLNAAvZoAX007UcwmDNC4oADCAHpTQAgMb4wOqmoYeNm11wqEGvDoBAAgmtkftUt6jCyobsTdYI2iPh7jMR5IIonWOvFIrosjXxeKhU6Zxf5fAAH5AXOI5N5QIt4DxhIqU6LkYxcLOO6HSAAEtsch8n9jVDAjR2G-tqj0ZmIxx8IlJFfhubPY+1KJwsemGxyxsSLMnC0wJnTemwD2H0XDQxxjQDc2-ENIYt5Xjvj8hOczwizizA43xpJn5vzPGsap-wGnJyLmOOlZLTkXMZfLMcY+0XniedAMLQAv4riCM35EzwjHxonUxcK4TngXuiuNp50HXdOxqrog2uoAsPqEAEbphLYKAH05ZW9hAA88vjPkc2+R4yNnjI4ghVuCCOItvGL5cygD5CBCm2dACznimMbb7PZWRDIwQAOeaABe3aGgAoozVuoBdgAmOUANKxKZACbfkSyuWa66SsAJquw3RuOBjnzVsggABeh9kOQ8Gv400sOxgACJYfI-PoJa7gBEIw+59wurNaDA9AMjjYyOUFOEVoAIjlACMmnQfFJrcarp8XjMHppAh8mfGaPkYxcQykGgreoy51Sx253LLnHW0n1EAOIKjAsfKxwNnSGwPABjiuK-6gAjFUAPj-w5AhKXjmaYUPONj87NBOA6gvhfg912MF8XHpG8cEIb4npO0khkABt5gAS6MAKMGgBWxVBuSgYlwKbf3xqbWl9LQBPUUE4ZAgAFbSssrQAL9FEC7PdgPQfQAh7xmH82FNccB5nBTGPRLIh6EADABtBrtEEAODGCNqB42XMuHYkYDyB-OIFvi3hugUzQoABujaB436sH0PHrw-8BVSYfPeNIqBG2OPzP2lAA3coAEBVABXgf9SIQA" target="_blank">
<img align="center" width="85" src="https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/runtab.png">
</a>
</div>

```ts
// ⚠️：运行时的错误需要运行的时候你才知道错了，比如从后端返回的 data 数据里到底有哪些字段，显然不可能在编译期的类型空间里用 keyof 获知。不要尝试表演超出生理极限的体操动作。

// 基础类型
const num: number = 0
const str: string = 'hello world'
let isDone: boolean = false
const sys: symbol = Symbol('sys')
// ...

// Array
const numArr: number[] = [1, 2, 3]
const strArr: Array<string> = ['1', '2', '3']
const arr: (number | string)[] = ['hello', 'world', 1, 2, 3]

// function
// 必须写返回值类型
const sum: (a: number, b: number) => number = (a, b) => a + b
// 返回值可以推断出来
const minus = (a: number, b: number) => a - b + ''

// JSON 序列化
const response = { name: 'chu', age: 28 }
// 序列化后的数据类型，推断不出来，需要手动标注类型
// any
const data = JSON.parse(JSON.stringify(response))

// object 类型是：TypeScript 2.2 引入的新类型，它用于表示非原始类型。
// object is a type that represents the non-primitive type, i.e. any thing that is not number, string, boolean, symbol, null, or undefined.
// Error: Type 'null' is not assignable to type 'object'.(2322)
// const obj: object = null

// Object 类型：它是所有 Object 类的实例的类型，它由以下两个接口来定义：
// 1. Object 接口定义了 `Object.prototype` 原型对象上的属性
// 2. ObjectConstructor 接口定义了 Object 类的属性。

// 由于 {} 就是一个空对象，因此除 null、undefined 以外的一切基础类型，都可以被视为是继承于 {} 之后派生出来的。
const o = {}
// 当你试图访问这样一个对象的任意属性时，TypeScript 会产生一个编译时错误。
// Error: Property 'x' does not exist on type '{}'.(2339)
// o.x = 'test'
// 但是，你仍然可以使用在 Object 类型上定义的所有属性和方法，这些属性和方法可通过 JavaScript 的原型链隐式地使用
o.toString()

// 类
// 关键字：private public protected abstract static readonly
// 抽象类不可以被 new，抽象方法必须实现
class Animal {
  // 类属性声明
  // public name: string
  // constructor(name: string) {
  //   this.name = name
  // }

  // 类属性声明简写
  constructor(public name: string) {}
}

// 断言
let someValue: unknown = 'this is a string'
// “尖括号” 语法，与 jsx 冲突
// let strLength: number = (<string>someValue).length
let strLength: number = (someValue as string).length
// `!` 的作用是**断言某个变量不会是 `null / undefined`，告诉编译器停止报错**。这里由用户确保断言的正确。`!` 只是消除编译器报错，不会对运行时行为造成任何影响。
// mightBeUndefined!.a = 2 编译为 mightBeUndefined.a = 2

// 枚举
// 1. enum 在 TS 中出现的比较早，它引入了 JS 没有的数据结构（编译成一个双向 map），入侵了运行时，与 TS 宗旨不符。用 `string literal union（’small’ | ‘big’ | ‘large’）` 可以做到相同的事，且在 debug 时可读性更好。
// 2. babel 不支持 `const enum`（会作为 enum 处理）。

// 接口定义类
interface Person {
  readonly name: string
  age?: number
  [propName: string]: any
  sayHi(): string
}
// 接口继承
interface Teacher extends Person {
  teach(): string
}
// 类实现接口
class Chu implements Teacher {
  name = 'chu'
  sayHi = () => 'hi'
  teach = () => 'teach'
}
// 接口定义函数
interface SayHello {
  (hello: string): string
}

// TypeScript 支持字面量类型，也就是类似 `1111`、`'aaaa'`、`{ a: 1}` 这种值也可以做为类型。
// 如果直接把一个字符串赋值给变量，TS 会保留字面量类型。
const baz = 'baz' // const baz: "baz"
// 但是如果我赋值给对象的属性，字面量 "str" 的类型就丢失了，变成了 `string`。
const o1 = { a1: 'str' } // -> const o1: { a1: string }
// 假如我就是需要这个字面量准确的类型呢？
const o2 = { a2: 'str' } as const // -> const o2: { readonly a2: "str" }

// 默认情况下 `null` 和 `undefined` 是所有类型的子类型。就是说你可以把 `null` 和 `undefined` 赋值给 `number` 类型的变量。然而，如果你指定了`--strictNullChecks` 标记，`null` 和 `undefined` 只能赋值给 `void` 和它们各自的类型。
```

## 循环依赖

```js
// JavaScript 中是不建议存在循环依赖的
// 这两个模块不应该互相 import 对方

// editor.js
import { Element } from './element'
// element.js
import { Editor } from './editor'
```

```ts
// 循环引用可以在 TS 中使用
//「循环引用的是类型，编译以后就没了」
// 最佳实践是使用 import type 语法
// element.ts
import type { Editor } from './editor'

// 这个 type 可以放心地用作类型标注，不造成循环引用
class Element {
  editor: Editor
}
```

## Ambient Modules

在实际应用开发时有一种场景，当前作用域下可以访问某个变量，但这个变量并不由开发者控制。例如通过 `Script` 标签直接引入的第三方库 CDN、一些宿主环境的 API 等。这个时候可以利用 TS 的环境声明功能，来告诉 TS 当前作用域可以访问这些变量，以获得类型提醒。

具体有两种方式，`declare` 和三斜线指令。

```ts
declare const IS_MOBILE = true // 编译后此行消失
const wording = IS_MOBILE ? '移动端' : 'PC 端'
```

用三斜线指令可以一次性引入整个类型声明文件。

```ts
/// <reference path="../typings/monaco.d.ts" />
const range = new monaco.Range(2, 3, 6, 7)
```
