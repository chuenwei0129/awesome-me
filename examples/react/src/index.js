import { createContext, memo, StrictMode, useContext, useState } from 'react'
import ReactDOM from 'react-dom'
// const AppContext = createContext()
const ChildContext = createContext()
const SonContext = createContext()

function App() {
  console.log('app render')
  const [childNum, updateChildNum] = useState(0)
  const [sonNum, updateSonNum] = useState(0)

  return (
    // <AppContext.Provider value={{ childNum, sonNum }}>
    //   <Father></Father>
    //   <button onClick={() => updateChildNum(childNum + 1)}> + child </button>
    //   <button onClick={() => updateSonNum(sonNum + 1)}> + son </button>
    // </AppContext.Provider>

    // 拆分 context
    <ChildContext.Provider value={childNum}>
      <SonContext.Provider value={sonNum}>
        <Father></Father>
        <button onClick={() => updateChildNum(childNum + 1)}> + child </button>
        <button onClick={() => updateSonNum(sonNum + 1)}> + son </button>
      </SonContext.Provider>
    </ChildContext.Provider>
  )
}

const Father = memo(() => {
  console.log('father render')
  return [<Child></Child>, <Son></Son>]
})

function Child() {
  console.log('child render')
  const childNum = useContext(ChildContext)
  return <h1>child: {childNum}</h1>
}

function Son() {
  console.log('son render')
  const sonNum = useContext(SonContext)
  return <h1>son: {sonNum}</h1>
}

ReactDOM.render(
  <StrictMode>
    <App></App>
  </StrictMode>,
  document.getElementById('root')
)
