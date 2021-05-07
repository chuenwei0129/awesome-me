import { useState } from 'react'

export function Child() {
  console.log('child render!')
  return <div>Child</div>
}

export function Parent(props) {
  const [count, setCount] = useState(0)

  return (
    <h4
      onClick={() => {
        setCount(count + 1)
      }}>
      count: {count}
      {/* 组件嵌套类似于 DOM 嵌套，所以 props.children 就是组件嵌套的子组件 */}
      {props.children}
    </h4>
  )
}
