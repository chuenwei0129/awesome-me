import React from 'react'
import ReactDOM from 'react-dom'
import useCount from './useCount'

const App = () => {
  const [count, addCount] = useCount(0)
  return (
    <div>
      <h1>计数器：{count}</h1>
      <button onClick={addCount}> + </button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
