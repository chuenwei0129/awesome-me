let states = {}
let currentNum = 0

const withState = func => {
  return (...args) => {
    currentNum = 0
    return func(...args)
  }
}

function useState(defaultState) {
  const num = currentNum++

  function setState(newState) {
    states[num] = newState
  }

  if (states[num] == undefined) {
    states[num] = defaultState
  }

  return [states[num], setState]
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
render()

// const render = withState(function render() {
//   const [state, setState] = useState(0)
//   const [state1, setState1] = useState(1)
//   const [state2, setState2] = useState(2)

//   console.log(state, state1, state2)
//   setState(state + 1)
//   setState1(state1 + 2)
//   setState2(state2 + 3)
// })

// render()
// console.log(states, currentNum)
// render()
// console.log(states, currentNum)
// render()
// console.log(states, currentNum)
