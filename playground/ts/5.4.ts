function checkLevel<T extends string>(levels: T[], defaultLevel?: T) {}

// 泛型参数推导：checkLevel<"easy" | "normal" | "hard">
checkLevel(['easy', 'normal', 'hard'], 'easy');

// 泛型参数推导：checkLevel<"easy" | "normal" | "hard" | "hell">
checkLevel(['easy', 'normal', 'hard'], 'hell');

function _checkLevel<T extends string, K extends T>(
  level: T[],
  defaultLevel?: K,
) {}

// 类型“"hell"”的参数不能赋给类型“"easy" | "normal" | "hard" | undefined”的参数。
_checkLevel(['easy', 'normal', 'hard'], 'hell');

class Animal {
  move;
}
class Dog extends Animal {
  woof;
}

function doSomething<T>(value: T, getDefault: () => T) {}

// 泛型推导为 doSomething<Animal>;
doSomething(new Dog(), () => new Animal());

type Bar<T> = T extends { a: infer U; b: NoInfer<infer U> } ? U : never;

type Bar1 = Bar<{ a: string; b: string }>; // string
type Bar2 = Bar<{ a: string; b: number }>;

type Foo<T> = T extends { a: infer U; b: infer U } ? U : never;

type Foo1 = Foo<{ a: string; b: string }>; // string
type Foo2 = Foo<{ a: string; b: number }>; // string | number

// 作者：林不渡
// 链接：https://zhuanlan.zhihu.com/p/680632227
// 来源：知乎
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
