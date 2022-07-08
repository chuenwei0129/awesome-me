import { Component } from 'react'

export default class State extends Component {
  state = {
    num: 0
  }

  updateNum = () => {
    console.log('before setState', this.state.num)
    this.setState({ num: this.state.num + 1 })
    this.setState({ num: this.state.num + 1 })
    this.setState({ num: this.state.num + 1 })
    console.log('after setState', this.state.num)
  }

  render() {
    console.log('render class', this.state.num)
    return (
      <div>
        <h1 onClick={this.updateNum}>{this.state.num}</h1>
      </div>
    )
  }
}
