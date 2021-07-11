# react

## 批处理

### 同步模式批处理

```jsx
import { Component } from 'react'

class App extends Component {
  state = {
    num: 0
  }

  handleClick = () => {
    this.setState({ num: this.state.num + 1 }) // 0
    console.log(`num 的值：`, this.state.num)
    this.setState({ num: this.state.num + 2 }) // 0
    console.log(`num 的值：`, this.state.num)
    this.setState({ num: this.state.num + 1 }) // 0
    console.log(`num 的值：`, this.state.num)

    setTimeout(() => {
      this.setState({ num: this.state.num + 1 }) // 2
      console.log(`num 的值：`, this.state.num)
      this.setState({ num: this.state.num + 2 }) // 4
      console.log(`num 的值：`, this.state.num)
      this.setState({ num: this.state.num + 1 }) // 5
      console.log(`num 的值：`, this.state.num)
    }, 1000)
  }

  render() {
    return (
      <>
        <h1>{this.state.num}</h1>
        <button onClick={this.handleClick}> + </button>
      </>
    )
  }
}
export default App
```

### 源码模拟实现

```js
let state = 0
let isBatchingUpdate = false
let updateQueue = []

const setState = newState => {
  if (!isBatchingUpdate) {
    state = newState
  } else {
    updateQueue.push(newState)
  }
}

const handleClick = () => {
  isBatchingUpdate = true
  setState(state + 2)
  console.log(`state1: `, state)
  setState(state + 1)
  console.log(`state2: `, state)
  setTimeout(() => {
    setState(state + 2)
    console.log(`state4: `, state)
    setState(state + 1)
    console.log(`state5: `, state)
  }, 1000)

  state = updateQueue.pop()
  isBatchingUpdate = false
}

handleClick()
console.log(`state3: `, state)
```

### concurrent 模式

<iframe src="https://codesandbox.io/embed/react-18-xintexing-djkgs?autoresize=1&expanddevtools=1&fontsize=13&hidenavigation=1&theme=light"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="react 18 新特性"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
