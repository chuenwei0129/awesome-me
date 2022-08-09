// 测试用例
globalThis.val = 0
const foo = { val: 1 }

function bar(arg1, arg2) {
  console.log(this.val, arg1, arg2)
}

bar.call(null, 2, 3) // 0 2 3
bar.call(foo, 2, 3) // 1 2 3

// 模拟步骤：
// 1. call 调用时把 bar 的执行环境改成 foo，相当于给 foo 对象添加 bar 方法
// 2. 由于给 foo 对象添加了一个属性，我们并不需要它，所以最后需要 delete 它
// 3. 所以，bar.call(foo) === foo.bar = bar ==> foo.bar() ==>  delete foo.bar

// 测试用例等同于：
// const foo = {
// 	val: 1,
// 	bar: function () {
// 		console.log(this.val)
// 	},
// }
// foo.bar()

Function.prototype.$call = function (context) {
  // context 不传时，默认为 globalThis
  context = context ?? globalThis
  // bar.$call(foo) 调用时，this 指向 bar
  // 对应 foo.bar = bar
  context.bar = this
  // 处理除 foo 以外的参数
  const args = []
  for (let i = 1; i < arguments.length; i++) {
    args.push(arguments[i])
  }
  // 对应 foo.bar()
  const res = eval('context.bar(' + args + ')')
  // 删除 foo.bar
  delete context.bar
  return res
}

bar.$call(null, 2, 3) // 0 2 3
bar.$call(foo, 2, 3) // 1 2 3
