import { createContext, memo, StrictMode, useContext, useState } from 'react'
import ReactDOM from 'react-dom'
const childNumContextBits = 0b100
const sonNumContextBits = 0b010
const threeNumContextBits = 0b001

const AppContext = createContext(null, (prev, next) => {
  console.log('上次 context 值:', prev)
  console.log('新的 context 值:', next)

  let ret = 0b000

  // childNum 发生变化
  // a |= b === a = a|b
  if (!Object.is(prev.childNum, next.childNum)) {
    ret |= childNumContextBits
  }
  if (!Object.is(prev.sonNum, next.sonNum)) {
    ret |= sonNumContextBits
  }
  if (!Object.is(prev.threeNum, next.threeNum)) {
    ret |= threeNumContextBits
  }

  console.log('calculatedBits: ', ret)

  return ret
})

function App() {
  console.log('app render')
  const [childNum, updateChildNum] = useState(0)
  const [sonNum, updateSonNum] = useState(0)
  const [threeNum, updateThreeNum] = useState(0)

  return (
    <AppContext.Provider value={{ childNum, sonNum, threeNum }}>
      <Father></Father>
      <button onClick={() => updateChildNum(childNum + 1)}> + child </button>
      <button onClick={() => updateSonNum(sonNum + 1)}> + son </button>
      <button onClick={() => updateThreeNum(threeNum + 1)}> + three </button>
    </AppContext.Provider>
  )
}

const Father = memo(() => {
  console.log('father render')
  return [<Child></Child>, <Son></Son>, <Three />]
})

function Child() {
  console.log('child render')
  const { childNum } = useContext(AppContext, childNumContextBits)
  return <h1>child: {childNum}</h1>
}

function Son() {
  console.log('son render')
  const { sonNum } = useContext(AppContext, sonNumContextBits)
  return <h1>son: {sonNum}</h1>
}

function Three() {
  console.log('three render')
  return (
    <AppContext.Consumer unstabled_observedBits={threeNumContextBits}>
      {/* render props 提层，所以 three render 不打印*/}
      {({ threeNum }) => {
        return <h1>three: {threeNum}</h1>
      }}
    </AppContext.Consumer>
  )
}

ReactDOM.render(
  <StrictMode>
    <App></App>
  </StrictMode>,
  document.getElementById('root')
)
