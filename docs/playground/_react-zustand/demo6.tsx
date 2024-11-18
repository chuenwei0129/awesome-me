import React from "react"
import { create } from "zustand"

// 状态与行为分离
interface CounterStateType {
  counter: number
}

const useCounterStore = create<CounterStateType>()(() => ({
  counter: 0
}))

const IncrementCounter = () => {
  const { counter } = useCounterStore()
  return <div className="border border-solid border-blue-600">
    <h1>Increment 组件：{counter}</h1>
    <button type="button" onClick={() => useCounterStore.setState({ counter: counter + 1 })}>increment</button>
    <button type="button" onClick={() => useCounterStore.setState({ counter: 0 })}>reset</button>
  </div>
}

const DecrementCounter = () => {
  const { counter } = useCounterStore()
  const decrement = () => {
    useCounterStore.setState({ counter: counter - 1 })
  }
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
