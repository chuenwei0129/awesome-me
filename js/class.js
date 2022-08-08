const OuterA = class InnerA {
  constructor() {
    console.log(InnerA) // [class InnerA]
    return {
      method() {
        console.log(`constructor return`, InnerA) // constructor return [class InnerA]
      }
    }
  }
  method() {
    console.log(`method return`, InnerA) // 参考 new 方法的返回值
  }
}

new OuterA().method()
console.log(OuterA.name) // InnerA

// 类的继承
class Parent {
  static {
    // class 声明后就已经执行
    console.log(`static block`, this) // static block [class Parent]
  }
  static parentStaticName = '静态爸爸'
  static parentStaticMethod() {
    return this.parentStaticName
  }

  // 简写方式
  _initParentName = '无名'
  constructor(parentParamName) {
    // 属性名和参数名区分开
    this._parentProtoName = parentParamName ?? this._initParentName
  }
  get parentProtoName() {
    console.log(`getter`, this._parentProtoName)
    return this._parentProtoName
  }
  set parentProtoName(value) {
    console.log(`setter`, value)
    this._parentProtoName = value
  }
  parentMethod() {
    return this.parentProtoName // 会丢失 this 指向
  }
  parentMethodBindThis = () => this.parentProtoName // 绑定 this 指向实例
}

// 静态方法属性
console.log(Parent.parentStaticName) // 静态爸爸
console.log(Parent.parentStaticMethod()) // 静态爸爸

// 实例方法属性
const parent = new Parent('爸爸')
console.log(parent.parentProtoName) // 爸爸
console.log(parent.parentMethod()) // 爸爸

// this 绑定
const f = parent.parentMethod
try {
  f()
} catch (e) {
  console.log(e.message) // Cannot read properties of undefined (reading 'parentProtoName')
}
const g = parent.parentMethodBindThis
console.log(g()) // 爸爸

// 继承 本质是复制父类的属性方法到子类，子类在重写或者复用父类的方法
class Child extends Parent {
  constructor(writeParentProtoName, childParamName) {
    super(writeParentProtoName) // 将父类的属性和方法，加到一个空的对象上面，然后再将该对象作为子类的实例
    // 此时 this 指向子类的实例，并且子类的实例也会拥有 Parent 的属性方法
    // 传入的 writeParentProtoName 重写了父类的属性
    // 把 super 当 parent constructor 执行就行了
    console.log(this.parentProtoName) // 无名
    // constructor 前面的参数是父类需要的参数，后面的参数是子类需要的参数
    // 子类的 constructor 只会执行一次
    this.childParamName = childParamName
  }
  static childStaticMethod() {
    console.log(super.parentStaticMethod()) // 静态爸爸
  }
}

// 子类继承父类的静态属性
console.log(Child.parentStaticName) // 静态爸爸
console.log(Child.parentStaticMethod()) // 静态爸爸

// 子类实例属性
const child = new Child(undefined, '儿子')
console.log(child.childParamName) // '儿子'

// super 静态方法
Child.childStaticMethod() // 静态爸爸

// new.target
class AParent {
  constructor() {
    console.log(new.target)
  }
}

// 无继承
const aParent = new AParent()
// [class AParent]

// 有继承
class AChild extends AParent {}
const aChild = new AChild()
// [class AChild extends AParent]
