# 状态管理

## context

```js
import { createContext, memo, StrictMode, useContext, useState } from 'react'
import ReactDOM from 'react-dom'
const AppContext = createContext()

function App() {
  console.log('app render')
  const [childNum, updateChildNum] = useState(0)
  const [sonNum, updateSonNum] = useState(0)

  return (
    <AppContext.Provider value={{ childNum, sonNum }}>
      <Father></Father>
      <button onClick={() => updateChildNum(childNum + 1)}> + child </button>
      <button onClick={() => updateSonNum(sonNum + 1)}> + son </button>
    </AppContext.Provider>
  )
}

const Father = memo(() => {
  console.log('father render')
  return [<Child></Child>, <Son></Son>]
})

function Child() {
  console.log('child render')
  const { childNum } = useContext(AppContext)
  return <h1>child: {childNum}</h1>
}

function Son() {
  console.log('son render')
  const { sonNum } = useContext(AppContext)
  return <h1>son: {sonNum}</h1>
}

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
)
```

### Split contexts

```js
import { createContext, memo, StrictMode, useContext, useState } from 'react'
import ReactDOM from 'react-dom'
const ChildContext = createContext()
const SonContext = createContext()

function App() {
  console.log('app render')
  const [childNum, updateChildNum] = useState(0)
  const [sonNum, updateSonNum] = useState(0)

  return (
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
```

### observedBits

```js
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
```

现在 Content 只关心 theme 字段的辩护啊，Counter 只关心 count 字段的变化，所以，我们用一位 bit 来代表 theme 的变化，另一个 bit 位来代表 theme 的变化。

```html
<!-- 00000000000 哪一个变了就往哪个上填1 -->
```

这个工作过程是怎样的呢？

每次当 Context 的值发生变化的时候，React 会去调用 createContext 的第二个参数，返回结果不是一个 bits 嘛，用这个 bits 去和每个 Context Consumer 给的 unstabled_observedBits 做按位 AND。

比如，当只有 theme 改变的时候，得到的 bits 是 0b10，这个 bits 和 Content 给的 unstabled_observedBits(值是 0b10)做按位 AND，得到的是 0b10，结果不是 0，所以知道需要重新渲染 Content。

```js
0b10 & (0b10 === 0b10) //需要重新渲染
```

如果和 Counter 给的 unstabled_observedBits (值是 0b01)做按位 AND，得到的是 0，所以就不需要重新渲染 Content。

```js
0b10 & (0b01 === 0b00) //不需要重新渲染
```

假设，某一次更新既更新了 theme，也更新了 count，那么得到的 bits 就是 0b11，那么，和 Content 还有 Counter 的 unstabled_observedBits 按位 AND 结果都不是 0，所以 Content 和 Counter 都会重新渲染。

### memo / useMemo / props.children

```js
import {
  createContext,
  memo,
  StrictMode,
  useContext,
  useMemo,
  useState
} from 'react'
import ReactDOM from 'react-dom'

const AppContext = createContext()

// 利用 hoc 来规避掉使用 useContext 导致的 force update，再用 memo 隔离真实渲染组件。（实际上 rerender context倒没什么开销）。
// 相当于自己实现的 selector

function App() {
  console.log('app render')
  const [childNum, updateChildNum] = useState(0)
  const [sonNum, updateSonNum] = useState(0)

  return (
    <AppContext.Provider value={{ childNum, sonNum }}>
      <Father></Father>
      <button onClick={() => updateChildNum(childNum + 1)}> + child </button>
      <button onClick={() => updateSonNum(sonNum + 1)}> + son </button>
    </AppContext.Provider>
  )
}

const Father = memo(() => {
  console.log('father render')
  return [<Child></Child>, <SonSelector></SonSelector>]
})

function Child() {
  console.log('hoc child context select render')
  const { childNum } = useContext(AppContext)
  // 缓存真实渲染的 jsx，相当于 childNum 变化才渲染 jsx
  return useMemo(() => <h1>child: {childNum}</h1>, [childNum])

// 这里这么写是把渲染开销比较大的组件剥离开来
function SonSelector(props) {
  console.log('hoc son context select render')
  const { sonNum } = useContext(AppContext)
  return <Son sonNum={sonNum}></Son>
}

const Son = memo(({ sonNum }) => {
  console.log('Son render')
  return <h1>child: {sonNum}</h1>
})

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
)
```

### useSelector

<!-- 原理很简单，就是自己封装了一个内有 state、selector（listener）、version 的对象，在修改 state 时，由于整个对象引用不可变，不触发更新，通过对比每次函数执行时缓存的上一次的值与 selector(value) 进行对比，判断是否触发 forceUpdate。 -->

<!-- useContextSelector实现的就是一个provider里面搞依赖收集，然后用ref来做状态，dispatch后触发对应selector的context更新嘛。而new context本来就是一个这种实现了，只是它没有做selector的精确更新，但这不是重新在这套体系里面再实现一个用户层面的依赖更新的理由啊（纯粹就是利用现有的context再重复实现了一个context，完全没必要嘛。） -->
