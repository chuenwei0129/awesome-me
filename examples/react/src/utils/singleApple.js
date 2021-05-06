// 单例模式的核心是确保只有一个实例，并提供全局访问。
// es6 export出实例即是单例

// ES6中创建单例模式
class SingleApple {
  constructor(name, creator, products) {
    if (!SingleApple.instance) {
      this.name = name
      this.creator = creator
      this.products = products
      SingleApple.instance = this
    }
    return SingleApple.instance
  }
}

// ES6的静态方法优化代码
class SingletonApple2 {
  constructor(name, creator, products) {
    this.name = name
    this.creator = creator
    this.products = products
  }
  //静态方法
  static getInstance(name, creator, products) {
    if (!this.instance) {
      this.instance = new SingletonApple2(name, creator, products)
    }
    return this.instance
  }
}

SingletonApple2.getInstance('1', '2', '3')
console.log(SingletonApple2.instance)

// 就算你对于单例模式的概念还比较模糊，但是我相信你肯定已经使用过单例模式了。我们来看一下下面的一段代码：

let timeTool = {
  name: '处理时间工具库',
  getISODate: function () {},
  getUTCDate: function () {}
}
// 以对象字面量创建对象的方式在JS开发中很常见。上面的对象是一个处理时间的工具库, 以对象字面量的方式来封装了一些方法处理时间格式。
// 全局只暴露了一个timeTool对象, 在需要使用时, 只需要采用timeTool.getISODate()调用即可。
// timeTool对象就是单例模式的体现。
// 在JavaScript创建对象的方式十分灵活, 可以直接通过对象字面量的方式实例化一个对象, 而其他面向对象的语言必须使用类进行实例化。
// 所以，这里的timeTool就已经是一个实例， 且ES6中let和const不允许重复声明的特性，确保了timeTool不能被重新覆盖。

// 单例模式的项目实战应用
// 4.1 实现登陆弹框
// 登陆弹框在项目中是一个比较经典的单例模式，因为对于大部分网站不需要用户必须登陆才能浏览，所以登陆操作的弹框可以在用户点击登陆按钮后再进行创建。而且登陆框永远只有一个，不会出现多个登陆弹框的情况，也就意味着再次点击登陆按钮后返回的永远是一个登录框的实例。

// 现在来梳理一下我登陆弹框的流程，在来进行代码的实现：

// 给顶部导航模块的登陆按钮注册点击事件
// 登陆按钮点击后JS动态创建遮罩层和登陆弹框
// 遮罩层和登陆弹框插入到页面中
// 给登陆框中的关闭按钮注册事件, 用于关闭遮罩层和弹框
// 给登陆框中的输入框添加校验(此步骤略)
// 给登陆框中的确定按钮添加事件,用于Ajax请求(此步骤略)
// 给登陆框中的清空按钮添加事件，用于清空输入框（此步骤略）
// 因为5，6是登陆框的实际项目逻辑， 和单例模式关系不大。下面的项目实战代码只实现1 - 4步
