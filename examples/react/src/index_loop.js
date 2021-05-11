import { useState } from 'react'
import ReactDOM from 'react-dom'

// 循环，条件和嵌套函数是常见的执行钩子(Hook)的顺序可能会受到干扰的地方。
// 如果开发人员确定循环等是合理的并且可以保证顺序，则没有问题。
// 实际上，如果将循环提取到函数中，则该循环将被视为有效的custom hook，可以在需要的地方禁用linter规则(demo):

// 循环可以使用 generator 函数，中断执行很优雅

const App1 = () => {
  const inputs = []

  for (let i = 0; i < 10; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    inputs[i] = useState('name' + i)
  }

  return inputs.map(([value, setValue], index) => (
    <div key={index}>
      <input value={value} onChange={e => setValue(e.target.value)} />
    </div>
  ))
}

// 类似于 if else 每次渲染，没报错啊，我觉得没有问题，
const App2 = () => {
  const [inputs, setInputs] = useState(Array(10).fill(''))
  const setInput = (i, v) => {
    setInputs(Object.assign([...inputs], { [i]: v }))
  }

  return inputs.map((v, i) => (
    <div key={i}>
      <input value={v} onChange={e => setInput(i, e.target.value)} />
    </div>
  ))
}

ReactDOM.render([<App1></App1>, <App2></App2>], document.getElementById('root'))
