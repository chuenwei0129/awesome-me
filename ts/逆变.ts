// 凡是能用 Array<Parent> 的地方, 都能用 Array< Child>
// 凡是能用 Function<Child＞ 的地方, 都能用 Function<Parent>

class Parent {
  name: string
}
class Child extends Parent {
  age: number
}

//协变
const arr: Array<Parent> = [new Child()]

// 逆变
type F = (arg: Child) => void
const arg = new Parent()
const f: F = (arg) => {
  console.log(arg)
}

// .8
// 10.
// 都有效
// 0. toString() 语法

// utf8
// ![20230216163021](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/others/20230216163021.png)

// 语义上 Null 就表示这个已经存在的值
// Undefined 表示还没有被定义过的值
//
// 所以任何一个对象都是唯一的，这与它本身的状态无关。

// 所以，即使状态完全一致的两个对象，也并不相等。

// 我们用状态来描述对象。

// 我们状态的改变即是行为。

// 5，10

// 多继承，🐟 既是 水生动物，又是 鱼类动物

// 面向对象设计 狗咬人，

// js iframe 与 主页面的内置对象都不同
