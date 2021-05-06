import React from 'react'

const Father = ({ children }) => {
  // children === {'Son', {className:}, ... } 和 msg 合并，合并的是 vnode 不是 react 元素
  const newChildren = React.cloneElement(children, { msg: '我是混入的props' })
  return newChildren
}

const Son = props => {
  console.log('🚀 ~ file: Clone.jsx ~ line 7 ~ Son ~ props', props)

  return (
    <>
      <h2>Son 组件</h2>
    </>
  )
}

export { Father, Son }
