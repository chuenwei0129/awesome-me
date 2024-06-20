// 构造一个 with 来包裹需要执行的代码，返回 with 代码块的一个函数实例
function withedYourCode(code) {
  // eslint-disable-next-line no-param-reassign
  code = 'with(my_context_proxy) {' + code + '}';
  return new Function('my_context_proxy', code);
}

// 可访问全局作用域的白名单列表
const access_white_list = ['Math', 'Date'];

// 待执行程序
const code = `
      Math.random()
      func(foo)
    //   location.href = 'xxx'
      console.log('hello')
  `;

// 执行上下文对象
const ctx = {
  func: (variable) => {
    console.log(variable);
  },
  foo: 'foo',
};

// 执行上下文对象的代理对象
const ctxProxy = new Proxy(ctx, {
  has: (target, prop) => {
    console.log('入口：', prop, target.hasOwnProperty(prop));
    // target.hasOwnProperty(Math)) === false 表明 Math 不在我们定义的作用域 ctx 中，由于 with 会优先访问 ctx，找不到会继续到全局变量中寻找，Math 会被访问，
    // 开始 func 不在白名单，!target.hasOwnProperty(prop) === false 表明 func in ctx === true， func 在 ctx 我们定义的作用域中，由于 with 会优先访问 ctx，所以 func 执行。执行时传入 foo 检查 foo 检查成功打印
    // 开始 location 不在白名单，!target.hasOwnProperty(prop) === true 表明 location 不在我们定义的作用域 ctx 中，直接抛出错误，隔绝访问全局作用域的机会。
    if (access_white_list.includes(prop)) {
      // 在可访问的白名单内，可继续向上查找
      return target.hasOwnProperty(prop);
    }

    if (!target.hasOwnProperty(prop)) {
      throw new Error(`Invalid expression - ${prop}! You can not do that!`);
    }

    return true;
  },
});

function littlePoorSandbox(code, ctx) {
  const f = withedYourCode(code);
  //   f === function anonymous(arg) {
  //     with (arg) {
  //       Math.random()
  //       location.href = 'xxx'
  //       func(foo)
  //     }
  //   }
  f.call(ctx, ctx); // 将 this 指向手动构造的全局代理对象
}

littlePoorSandbox(code, ctxProxy);

// Uncaught Error: Invalid expression - location! You can not do that!

// 这个沙箱做到了，隔绝一部分全局变量的访问，阉割了一部分js能力。
// 从而又衍生出另一个问题——如何让子程序使用所有全局对象的同时不影响外部的全局状态呢？
// https://zhuanlan.zhihu.com/p/428039764
