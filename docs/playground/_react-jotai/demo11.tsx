import { atom, useAtomValue, useSetAtom } from "jotai"
import { selectAtom } from "jotai/utils"
import React, { useCallback } from "react"

const objectAtom = atom({
  type: 'object',
  value: {
    foo: 1
  }
})

// const typeSelector = (s) => s.type

const Bar = () => {
  // 虽然 Bar 只消费了 type，但是 Foo 中的 button 点击后，Bar 也会因为 objectAtom 的 value 改变而改变。
  // const { type } = useAtomValue(objectAtom)
  const type = useAtomValue(
    selectAtom(
      objectAtom,
      // 注意这里需要用 useCallback包裹传入的 selector，或者提取这个函数到组件外部，需要保证在下次重渲染中函数不变，负责就造成重渲染地狱。
      useCallback((s) => s.type, []),  // 注意这里
      // selectType
    ),
  )
  return <div>
    <h1>{Math.random()}</h1>
    <div>type: {type}</div>
  </div>
}
const Foo = () => {
  // setter 也不会触发重渲染
  const setter = useSetAtom(objectAtom)

  return <>
    <Bar />
    <div>
      {Math.random()}
    </div>
    <button onClick={() => setter(prev => ({ ...prev, value: { foo: prev.value.foo + 1 } }))}>render</button>
  </>
}

export default function App() {
  return <Foo />
}

