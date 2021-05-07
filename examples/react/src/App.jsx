import { Profiler, Suspense, useState } from 'react'
import { Father, Son } from './Clone'
import Lazy from './Lazy'
import { Hello, LucencyMap, OpacityMap } from './Map'
import Memo from './Memo'
import Pure from './Pure'
import Ref from './Ref'
import { Child, Parent } from './Render'
import State from './State'

const App = () => {
  // Error: Objects are not valid as a React child (found: object with keys {}).
  // If you meant to render a collection of children, use an array instead.
  // return {}

  const [count, updateCount] = useState(0)

  const add = () => {
    setTimeout(() => {
      updateCount(count + 1) // -> 执行 count = newCount 5 次，由于定时器，count的值变化比较慢，所以可能为 1，2
      // updateCount(count => count + 1) // -> 执行 count = count + 1，5次，所以，。。。
    }, 1000)
  }

  const addSync = () => {
    updateCount(count + 1)
  }

  const callBack = (...args) => console.log(args)

  return (
    <>
      <State />

      <hr />
      <Ref />

      <hr />

      {/* <Child />相当于此时作为 props 传入 parent 组件，只有 app 组件更新，<Child /> 
      组件才会更新，相当于此时 app 与 child 嵌套 */}
      {/* 组件是否渲染需要考虑 render props 情况 */}
      <Parent>
        <Child />
      </Parent>

      <hr />

      <h1>{count}</h1>
      <button onClick={add}> 异步+ </button>
      <button onClick={addSync}> 同步+ </button>
      <hr />
      <Pure />
      <hr />
      <Memo count={count} />
      <hr />
      <Suspense fallback={<div>Loading...</div>}>
        <Lazy />
      </Suspense>
      <hr />
      <Profiler id='father' onRender={callBack}>
        <Father>
          <Son name='son' />
        </Father>
      </Profiler>

      <hr />
      <span>不透明结构：</span>
      <OpacityMap>
        {Array(3)
          .fill(0)
          .map(() => (
            <Hello />
          ))}
        <h2>hello Map2</h2>
      </OpacityMap>
      <span>透明结构：</span>
      <LucencyMap>
        <h2>hello Map1</h2>
        <h2>hello Map1</h2>
        <h2>hello Map1</h2>
        <h2>hello Map2</h2>
      </LucencyMap>
    </>
  )
}

export default App
