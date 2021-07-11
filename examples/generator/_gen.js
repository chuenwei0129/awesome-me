const context = {
  next: 0,
  prev: 0,
  done: false,
  stop: function () {
    this.done = true
  }
}

function gen(context) {
  // while (1) {
  switch ((context.prev = context.next)) {
    case 0:
      context.next = 2
      return 'result1'

    case 2:
      context.next = 4
      return 'result2'

    case 4:
      context.next = 6
      return 'result3'

    case 6:
      context.stop()
      return undefined
  }
  // }
}

const foo = function () {
  return {
    next: function () {
      return {
        value: gen(context),
        done: context.done
      }
    }
  }
}

// 发现它是每生foo()执行一次 ，就会执行一次wrap方法，而在wrap方法里就会new 一个Context对象。这就说明了每个迭代器的context是独立的。

// 我们定义的function*生成器函数被转化为以上代码

// 转化后的代码分为三大块：

// gen$(_context)由yield分割生成器函数代码而来

// context对象用于储存函数执行上下文

// 迭代器法定义next()，用于执行gen$(_context)来跳到下一步

// 从中我们可以看出，「Generator实现的核心在于上下文的保存，函数并没有真的被挂起，每一次yield，其实都执行了一遍传入的生成器函数，只是在这个过程中间用了一个context对象储存上下文，使得每次执行生成器函数的时候，都可以从上一个执行结果开始执行，看起来就像函数被挂起了一样」
