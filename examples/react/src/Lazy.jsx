import { lazy, useEffect } from 'react'

const Test = () => {
  useEffect(() => {
    console.log('子组件 lazy 渲染')
  }, [])

  return (
    <div>
      <h2 style={{ color: 'red' }}>我是异步组件</h2>
    </div>
  )
}

const Lazy = lazy(() => {
  // React.lazy和Suspense配合一起用，能够有动态加载组件的效果。
  // React.lazy 接受一个函数，这个函数需要动态调用 import()。
  // 它必须返回一个 Promise ，该 Promise 需要 resolve 一个 default export 的 React 组件。
  // lazy(() => import(异步组件))
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        default: () => <Test />
      })
    }, 4000)
  })
})

export default Lazy
