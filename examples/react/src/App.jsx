import { useState } from 'react'

const App = () => {
  // Error: Objects are not valid as a React child (found: object with keys {}). 
  // If you meant to render a collection of children, use an array instead.
  // return {}

  const [count, updateCount] = useState(0)

  const add = () => {
    setTimeout(() => {
      updateCount(count + 1) // -> 执行 count = newCount 5 次，由于定时器，count的值变化比较慢，所以可能为 1，2
      // updateCount(count => count + 1) // -> 执行 count = count + 1，5次，所以，。。。
    }, 1000);
  }

  return (<>
    <h1>{count}</h1>
    <button onClick={add}> + </button>
  </>)
}

export default App