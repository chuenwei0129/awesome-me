// 可变数据心智负担太重，使用不可变数据比较好，使用不可变数据，
// bailout 时只要使用 pureComponent 模型即可跳过重渲染，可变数据，pure 重渲染会失效
// 这里 我犯了个错误，一开始 value 传递了对象，value 比较是 Object.is() 所以理解没错
// 完美

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
