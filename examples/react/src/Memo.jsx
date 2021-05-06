import { memo } from 'react'
import { shallEqual } from './utils/shallEqual'

const Memo = props => {
  console.log('子组件 Memo 渲染')
  return (
    <div>
      <h2>{props.count}</h2>
    </div>
  )
}

// 第二个参数类似于 scu 是个函数，返回 true/false
// 与 scu 相反，scu还比较自己的 state
// 重写它会使原来的浅比较失效，相当于自己写了浅比较
const propsEqual = (prevProps, nextProps) => {
  // true 不需要渲染，false 需要渲染
  // 原理
  if (shallEqual(prevProps, nextProps)) {
    return true
    // 拦截 props equal，大于 5 就不需要渲染子组件
  } else if (nextProps.count > 5) {
    return true
  } else {
    return false
  }
}

export default memo(Memo, propsEqual)
