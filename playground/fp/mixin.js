// 定义两个 mixin
const walkMixin = {
  walk() {
    console.log('I can walk!');
  },
};

const swimMixin = {
  walk() {
    console.log('I can swim!'); // 注意这个方法名与 walkMixin 中的方法名相同
  },
};

// 定义一个动物类
class Animal {
  constructor(name) {
    this.name = name;
  }
}

// 将两个 mixin 的方法混入到 Animal 类的原型上
Object.assign(Animal.prototype, walkMixin, swimMixin);

const animal = new Animal('Duck');
animal.walk(); // 输出：I can swim! （walkMixin 中的方法被覆盖了）

// 冲突 ：如果多个 mixin 中有相同名称的属性或方法嘎，会发生覆盖嘎，很难确定最终使用的是哪个 mixin 的实现。
// 可读性差 ：因为 mixin 的属性和方法是动态混入的嘎，代码阅读者很难追踪这些属性或方法的来源嘎，增加了代码的复杂性。
// 维护困难 ：如果需要修改或调试某个混入的方法嘎，必须找到该方法的原始定义嘎，这在多个 mixin 交织的情况下可能会非常困难。
