import React from "react"
import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"

interface CounterStoreType {
  counter: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

const useCounterStore = create<CounterStoreType>()((set) => ({
  counter: 0,
  increment: () => set(state => ({ counter: state.counter + 1 })),
  decrement: () => set(state => ({ counter: state.counter - 1 })),
  reset: () => set(() => ({ counter: 0 }))
}))

interface CatStoreType {
  cats: {
    bigCats: number,
    smallCats: number
  },
  incrementBigCats: () => void
  incrementSmallCats: () => void
  summaryAllCats: () => number
}

const useCatStore = create<CatStoreType>()(subscribeWithSelector((set, get) => ({
  cats: {
    bigCats: 0,
    smallCats: 0
  },
  incrementBigCats: () => set(state => ({
    cats: {
      ...state.cats,
      bigCats: state.cats.bigCats + 1
    }
  })),
  incrementSmallCats: () => set(state => ({
    cats: {
      ...state.cats,
      smallCats: state.cats.smallCats + 1
    }
  })),
  summaryAllCats: () => get().cats.bigCats + get().cats.smallCats
})))

const IncrementCounter = () => {
  const { counter, increment, reset } = useCounterStore()
  const [bgColor, setBgColor] = React.useState<'bg-red-500' | 'bg-blue-500'>()

  // 订阅 bigCats 值
  React.useEffect(() => {
    const unSub = useCatStore.subscribe(state => state.cats.bigCats, (bigCats, prevBigCats) => {
      // 初始化时，current 和 prev 是一样的，所以我们在上面设置 bgColor 时设为 undefined 是为了演示这个，在这里设置初始化背景
      if (bigCats === prevBigCats) setBgColor('bg-blue-500')
      if (bigCats < 5) setBgColor('bg-blue-500')
      else setBgColor('bg-red-500')

    }, {
      // 这里设置 fireImmediately 为 true 是为了在初始化时就执行一次订阅回调，不写的话默认就不为蓝色
      // 默认值为 false
      fireImmediately: true
    })
    return unSub
  }, [])


  return <div className={`border border-solid border-blue-600 ${bgColor}`}>
    <h1>Increment 组件背景色订阅 bigCats 值：{counter}</h1>
    <button type="button" onClick={increment}>increment</button>
    <button type="button" onClick={reset}>reset</button>
  </div>
}

const DecrementCounter = () => {
  const { counter, decrement } = useCounterStore()
  return <div className="border border-solid border-red-600">
    <h1>Decrement 组件：{counter}</h1>
    <button type="button" onClick={decrement}>decrement</button>
  </div>
}

const Counter = () => {
  return (
    <div>
      <IncrementCounter />
      <DecrementCounter />
    </div>
  )
}

const BigCats = () => {
  const bigCats = useCatStore(state => state.cats.bigCats)
  const incrementBigCats = useCatStore(state => state.incrementBigCats)

  const [bgColor, setBgColor] = React.useState<string>("bg-white")

  // 订阅 useCounterStore
  React.useEffect(() => {
    const unSub = useCounterStore.subscribe(state => {
      if (state.counter > 0) {
        setBgColor("bg-red-600")
      } else {
        setBgColor("bg-white")
      }
    })
    return unSub
  }, [])

  return <div className={`border border-solid border-red-600 ${bgColor}`}>
    <h1>BigCats 组件背景色订阅 counter 值：{bigCats}</h1>
    <h2>是否重渲染：{Math.random()}</h2>
    <button type="button" onClick={incrementBigCats}>incrementBigCats</button>
  </div>
}

const SmallCats = () => {
  const smallCats = useCatStore(state => state.cats.smallCats)
  const incrementSmallCats = useCatStore(state => state.incrementSmallCats)

  return <div className={`border border-solid border-blue-600`}>
    <h1>SmallCats 组件：{smallCats}</h1>
    <h2>是否重渲染：{Math.random()}</h2>
    <button type="button" onClick={incrementSmallCats}>incrementSmallCats</button>
  </div>
}

const SummaryAllCats = () => {
  const summaryAllCats = useCatStore(state => state.summaryAllCats())
  return <div className="border border-solid border-yellow-600">
    <h1>SummaryAllCats 组件：{summaryAllCats}</h1>
    <h2>是否重渲染：{Math.random()}</h2>
  </div>
}

const Cat = () => {
  return (
    <div>
      <SummaryAllCats />
      <BigCats />
      <SmallCats />
    </div>
  )
}

const App = () => {
  return <div>
    <Counter />
    <hr />
    <Cat />
  </div>
}

export default App
