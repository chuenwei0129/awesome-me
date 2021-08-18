// 全局状态
let state
const useState = defaultState => {
  const setState = newState => {
    state = newState
  }

  // 兼容 null
  if (state == undefined) {
    state = defaultState
  }

  return [state, setState]
}

const render = () => {
  const [state, setState] = useState(0)
  const [state1, setState1] = useState(1)
  setState(state + 1)
  setState1(state1 + 2)
  console.log(state, state1)
}

// 无法对应多个 state
render()
render()
render()
