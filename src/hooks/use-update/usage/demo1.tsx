import React from "react"
import useUpdate from '../index'

const App = () => {
  const update = useUpdate()

  return (
    <div>
      <h2>{Math.random()}</h2>
      <button onClick={update}>强制组件重新渲染</button>
    </div>
  )
}
export default App
