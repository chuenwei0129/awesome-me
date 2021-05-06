import { Component } from 'react'
import { shallEqual } from './utils/shallEqual'

export class Pure extends Component {
  state = {
    data: { name: 'chu', age: 28 }
  }
  handleClick = () => {
    const { data } = this.state
    data.age++
    this.setState({ data })
  }
  shouldComponentUpdate(nextProps, nextStates) {
    // this.setState 内部只是把 {...old, ...new} 做了一层浅拷贝
    // 由于 state 对象是两层对象 {data: { name: 'chu', age: 28 }}
    // 第二层还是存在相同的引用所以会让浅比较返回 true，所以 pure 会不渲染
    // 所以 react 需要不可变数据每次都告诉组件数据变了
    return !shallEqual(this.state, nextStates)
  }
  render() {
    const { data } = this.state
    return (
      <div>
        <div> 你的姓名是：{data.name} </div>
        <div> 年龄：{data.age}</div>
        <button onClick={this.handleClick}> age++ </button>
      </div>
    )
  }
}

export default Pure
