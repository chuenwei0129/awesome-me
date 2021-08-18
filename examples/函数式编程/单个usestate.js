// 全局状态
let state
const useState = defaultState => {
  const setState = newState => {
    state = newState
  }

  if (state == undefined) {
    state = defaultState
  }

  return [state, setState]
}

const render = () => {
  const [state, setState] = useState(0)
  setState(state + 1)
  console.log(state)
}

render()
render()
render()
