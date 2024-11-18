import React from "react"
import { create } from "zustand"

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

const IncrementCounter = () => {
  const { counter, increment, reset } = useCounterStore()
  return <div className="border border-solid border-blue-600">
    <h1>Increment 组件：{counter}</h1>
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

const App = () => {
  return (
    <div>
      <IncrementCounter />
      <DecrementCounter />
    </div>
  )
}
export default App
