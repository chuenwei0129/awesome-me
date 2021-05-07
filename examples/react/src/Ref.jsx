import { Component } from 'react'

export default class Ref extends Component {
  renderRow = () => {
    return [
      // ref 会绑定到 DataTable 组件实例，而不是 Ref 组件实例上
      <input ref='inputStr' />,
      // 如果使用function类型ref，则不会有这个问题
      <input ref={input => (this.inputFn = input)} />
    ]
  }

  componentDidMount() {
    console.log('Ref 组件', this.inputFn, this.refs.inputStr)
  }

  render() {
    return <DataTable renderRow={this.renderRow} />
  }
}

class DataTable extends Component {
  componentDidMount() {
    console.log('DataTable 组件', this.inputFn, this.refs.inputStr)
  }
  render() {
    // render props 两个特性，1，由回调函数定义处组件父组件控制渲染2，string ref 指向回调函数运行时
    return this.props.renderRow()
  }
}
