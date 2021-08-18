let contextStack = []

function useState(defaultState) {
  const context = contextStack[contextStack.length - 1]
  const nu = context.nu++
  const { states } = context

  function setState(newState) {
    states[nu] = newState
  }

  if (!states[nu]) {
    states[nu] = defaultState
  }

  // useState(0)

  return [states[nu], setState]
}

function withState(func) {
  const states = {}
  return (...args) => {
    contextStack.push({ nu: 0, states })
    const result = func(...args)
    contextStack.pop()
    return result
  }
}

const render = withState(function render() {
  const [state, setState] = useState(0)

  render1()

  console.log('render', state)
  setState(state + 1)
})

const render1 = withState(function render1() {
  const [state, setState] = useState(0)

  console.log('render1', state)
  setState(state + 2)
})

render()
render()
