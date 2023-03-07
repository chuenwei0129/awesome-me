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
