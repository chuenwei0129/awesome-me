import { useState } from 'react'
import ReactDOM from 'react-dom'



const App = () => {
  const [num, updateNum] = useState(0)

  return <h1 onClick={() => updateNum(num + 1)}>{num}</h1>
}

ReactDOM.render(<App />, document.getElementById('root'))
