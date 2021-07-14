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

### startTransition

startTransition 做的事情很简单，类似这样：

let isInTransition = false

function startTransition(fn) {
isInTransition = true
fn()
isInTransition = false
}
也就是说，当调用 startTransition，在其上下文中获取到的全局变量 isInTransition 为 true。

如果 startTransition 的回调函数 fn 中包含更新状态的方法（比如上文 Demo 中的 setTreeLean），

那么这次更新就会被标记为 isTransition，类似这样：

// 调用 setTreeLean 后会执行的方法（伪代码）
function setState(value) {
stateQueue.push({
nextState: value,
isTransition: isInTransition
})
}
代表这是一个低优先级的过渡更新。

接下来，就是 React 内部的调度、批处理与更新流程了。
