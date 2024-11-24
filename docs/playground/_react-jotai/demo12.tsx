import { atom, useAtomValue, useSetAtom } from 'jotai'
import { withHistory } from 'jotai-history'
import React from 'react'

// 计数器原子
const counterAtom = atom(0)
// 带历史记录的计数器原子
const counterWithHistory = withHistory(counterAtom, 3)

export default function App() {
  // 当前计数、上一次计数、上上次计数
  const [currentCount, previousCount, previousPreviousCount] = useAtomValue(counterWithHistory)
  const setCounter = useSetAtom(counterAtom)

  return (
    <>
      <p>Count: {currentCount}</p>
      <p>Previous Count: {previousCount}</p>
      <p>Previous Previous Count: {previousPreviousCount}</p>
      <button onClick={() => setCounter((count) => count + 1)}>Increment</button>
    </>
  )
}
