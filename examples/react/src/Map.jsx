import React from 'react'

export const Hello = () => {
  return <h2>hello Map1</h2>
}

export const OpacityMap = props => {
  console.log('不透明结构：props.children.length', props.children.length)
  // Children.count可以返回同一级别子组件的数量。
  console.log(
    '不透明结构：React.Children.count',
    React.Children.count(props.children)
  )

  // 对于不透明数据结构我们可以使用 React.Children.map 来遍历
  // Children.toArray 返回，props.children 扁平化后结果
  const children = React.Children.map(props.children, child => (
    <div style={{ color: 'red' }}>{child}</div>
  ))

  return children
}

export const LucencyMap = props => {
  console.log('透明结构：props.children.length', props.children.length)
  console.log(
    '透明结构：React.Children.count',
    React.Children.count(props.children)
  )
  return props.children
}
