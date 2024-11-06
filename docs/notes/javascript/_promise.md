---
title: Promise
order: -1
toc: content
group:
  title: 深入浅出
---

# Promise

https://www.jsv9000.app/

[Promise 不能被取消，真的算是它的缺点吗？](https://www.zhihu.com/question/495412354/answer/2865083505)

Promise 的生产工厂 (就是传给 Promise 的函数参数) 是立即执行的，何时改变状态取决于你在未来的某个时刻调用 resolve/reject。

Promise 的生产工厂 (就是传给 Promise 的函数参数) 是立即执行的，何时改变状态取决于你在未来的某个时刻调用 resolve/reject。

![FlgOOP7acAAsA2m](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/FlgOOP7acAAsA2m.png)

Promise 能很好地解决回调地狱的问题，我们可以按照线性的思路来编写代码，这个过程是线性的，非常符合人的直觉。
但是这种方式充满了 Promise 的 then () 方法，如果处理流程比较复杂的话，那么整段代码将充斥着大量的 then，语义化不明显，代码不能很好地表示执行流程。我们想要通过线性的方式来编写异步代码，要实现这个理想，最关键的是要能实现函数暂停和恢复执行的功能。而生成器就可以实现函数暂停和恢复，我们可以在生成器中使用同步代码的逻辑来异步代码 (实现该逻辑的核心是协程)。
但是在生成器之外，我们还需要一个触发器来驱动生成器的执行。前端的最终方案就是 async/await，async 是一个可以暂停和恢复执行的函数，在 async 函数内部使用 await 来暂停 async 函数的执行，await 等待的是一个 Promise 对象，如果 Promise 的状态变成 resolve 或者 reject，那么 async 函数会恢复执行。因此，使用 async/await 可以实现以同步的方式编写异步代码这一目标。和生成器函数一样，使用了 async 声明的函数在执行时，也是一个单独的协程，我们可以使用 await 来暂停该协程，由于 await 等待的是一个 Promise 对象，我们可以 resolve 来恢复该协程。 -->
