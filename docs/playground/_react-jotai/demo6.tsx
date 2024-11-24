import { atom, Provider, useAtom } from 'jotai';
import React from 'react';

// 可选：您可以像使用 useContext 一样使用 Provider，
// ...但如果你只需要一个，
// ...你可以省略它，Jotai 将使用默认模式（称为 Provider-less 模式）。

// 对于 Provider 组件一个比较重要的功能是进行状态作用域的隔离。
// 默认情况下，一般都会在根组件中使用 Provider 组件，来共享所有原子的状态值。
// 但也可以在组件树的不同部分使用多个 Provider 组件，每个 Provider 组件各自管理子组件树的状态，这样就实现了状态作用域的隔离。

const countAtom = atom<number>(0)

function Counter() {
  const [count, setCount] = useAtom(countAtom)

  return (
    <>
      <p>{count}</p>
      <button
        onClick={() => setCount((c) => c + 1)}
      >
        Add
      </button>
    </>
  )
}

function Component1() {
  return (
    <Provider>
      <Counter />
    </Provider>
  )
}

function Component2() {
  return (
    <Provider>
      <Counter />
    </Provider>
  )
}

export default function App() {
  return (
    <>
      <Component1 />
      <Component2 />
    </>
  )
}
