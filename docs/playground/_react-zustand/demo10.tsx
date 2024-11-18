import React from "react"
import { create } from "zustand"
import { createJSONStorage, persist, StateStorage } from "zustand/middleware"

interface CounterStoreType {
  counter: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

const URLHashStorage: StateStorage = {
  getItem: (key: string): string => {
    const searchParams = new URLSearchParams(location.hash.slice(1))
    const storedValue = searchParams.get(key) ?? ''
    return JSON.parse(storedValue)
  },
  setItem: (key: string, newValue: string): void => {
    const searchParams = new URLSearchParams(location.hash.slice(1))
    searchParams.set(key, JSON.stringify(newValue))
    location.hash = searchParams.toString()
  },
  removeItem: (key: string): void => {
    const searchParams = new URLSearchParams(location.hash.slice(1))
    searchParams.delete(key)
    location.hash = searchParams.toString()
  }
}

const useCounterStore = create<CounterStoreType>()(persist((set) => ({
  counter: 0,
  increment: () => set(state => ({ counter: state.counter + 1 })),
  decrement: () => set(state => ({ counter: state.counter - 1 })),
  reset: () => set(() => ({ counter: 0 }))
}), {
  name: 'counter-storage',
  storage: createJSONStorage(() => URLHashStorage)
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
