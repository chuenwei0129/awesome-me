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
