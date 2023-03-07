# 祛魅

## CPS

> [干货｜详解 Algebraic Effects 代数效应](https://zhuanlan.zhihu.com/p/380855727)

CPS 是一种编程风格，通过回调函数来返回结果和控制流程。在 CPS 风格中，每一个函数都会显式的接收一个回调函数，通过回调函数来传递当前函数计算结果并控制下一个函数的调用。

```js
// 用 JavaScript 代码演示 ( 1 + 2 ) × 2 = 6

{
  // 默认版本
  const add = (v1, v2) => v1 + v2
  const multi = (v1, v2) => v1 * v2

  const temp = add(1, 2)
  // 同步
  const result = multi(temp, 2)
  console.log('同步', result) // 6

  // 假设有个产品经理忽然提了一个需求 "add 这个过程需要 1s 后才返回结果"
  setTimeout(() => {
    const result = multi(temp, 2)
    console.log('异步', result)
  }, 1000)
}

{
  // CPS 版本
  const add = (v1, v2, next) => next(v1 + v2)
  const multi = (v1, v2, next) => next(v1 * v2)

  add(1, 2, (r1) => {
    multi(r1, 2, (r2) => {
      console.log('同步', r2) // 6
    })
  })

  // 假设有个产品经理忽然提了一个需求 "add 这个过程需要 1s 后才返回结果"
  const addAsync = (v1, v2, next) => setTimeout(next, 1000, v1 + v2)
  addAsync(1, 2, (r1) => {
    multi(r1, 2, (r2) => {
      console.log('异步', r2) // 6
    })
  })
}
```

每一个函数的都接受一个回调函数 next，且计算结果都通过 next 延续给下一个函数，通过 CPS 可以**提升对程序流程控制：当前函数拥有对后续流程的控制**。

> 直呼好家伙，CPS 原来就是被我们嗤之以鼻回调地狱。

## CallBag

> [Staltz - Callback Heaven](https://zhuanlan.zhihu.com/p/38039481)

## Hash

![20230306165648](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/others/20230306165648.png)

## [回调函数是什么？](https://www.zhihu.com/question/19801131)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/SCR-20220418-g6h.png)

## [时间复杂度 O(logN) 意味着什么？](https://juejin.cn/post/6844903481191432206)

![20230306034906](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/others/20230306034906.png)

## [P 问题、NP 问题、NP 完全问题和 NP 难问题](https://zhuanlan.zhihu.com/p/73953567)

复杂度被分为两种级别：一种是 `O(1)`，`O(logN)`，`O(N^2)` 等，我们把它叫做多项式级的复杂度，**因为它的规模 N 出现在底数的位置**；另一种是 `O(2^N)` 和 `O(N!)` 型复杂度，它是非多项式级的，其复杂度计算机往往不能承受。

**P 问题**：如果一个问题可以找到一个能在多项式的时间里解决它的算法，那么这个问题就属于 P 问题。

**NP 问题**： NP 问题不是非 P 类问题。NP 问题是指可以在多项式的时间里验证一个解的问题。NP 问题的另一个定义是，可以在多项式的时间里猜出一个解的问题。

**NPC 问题**：同时满足下面两个条件的问题就是 NPC 问题。首先，它得是一个 NP 问题；然后，所有的 NP 问题都可以约化到它。NPC 问题目前没有多项式的有效算法，只能用指数级甚至阶乘级复杂度的搜索。

**NP-Hard 问题**：它满足 NPC 问题定义的第二条但不一定要满足第一条。NP-Hard 问题同样难以找到多项式的算法，但它不列入我们的研究范围，因为它不一定是 NP 问题。即使 NPC 问题发现了多项式级的算法，NP-Hard 问题有可能仍然无法得到多项式级的算法 约化：(Reducibility，有的资料上叫“归约”)。简单地说，一个问题 A 可以约化为问题 B 的含义即是，可以用问题 B 的解法解决问题 A，或者说，问题 A 可以“变成”问题 B。通过对某些问题的不断约化，我们能够不断寻找复杂度更高，但应用范围更广的算法来代替复杂度虽然低，但只能用于很小的一类问题的算法。

## [有限状态机](https://www.bilibili.com/video/BV11e4y1W7CF?p=20)

![SCR-20230217-j02](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/others/SCR-20230217-j02.png)

## [面向对象](https://www.bilibili.com/video/BV11e4y1W7CF?p=10)

![20230306224432](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/others/20230306224432.png)

![20230306224306](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/others/20230306224306.png)
