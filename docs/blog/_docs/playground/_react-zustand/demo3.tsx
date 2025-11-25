import React from "react"
import { create } from "zustand"

interface CatStoreType {
  cats: {
    bigCats: number,
    smallCats: number
  },
  incrementBigCats: () => void
  incrementSmallCats: () => void
  summaryAllCats: () => number
}

const useCatStore = create<CatStoreType>()((set, get) => ({
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
}))

const BigCats = () => {
  const bigCats = useCatStore(state => state.cats.bigCats)
  const incrementBigCats = useCatStore(state => state.incrementBigCats)

  return <div className="border border-solid border-red-600">
    <h1>BigCats 组件：{bigCats}</h1>
    <h2>是否重渲染：{Math.random()}</h2>
    <button type="button" onClick={incrementBigCats}>incrementBigCats</button>
  </div>
}

const SmallCats = () => {
  const smallCats = useCatStore(state => state.cats.smallCats)
  const incrementSmallCats = useCatStore(state => state.incrementSmallCats)

  return <div className="border border-solid border-gray-600">
    <h1>SmallCats 组件：{smallCats}</h1>
    <h2>是否重渲染：{Math.random()}</h2>
    <button type="button" onClick={incrementSmallCats}>incrementSmallCats</button>
  </div>
}

const SummaryAllCats = () => {
  // 注意这里的 selector summaryAllCats 是 get 函数
  const summaryAllCats = useCatStore(state => state.summaryAllCats())
  return <div className="border border-solid border-yellow-600">
    <h1>SummaryAllCats 组件：{summaryAllCats}</h1>
    <h2>是否重渲染：{Math.random()}</h2>
  </div>
}

const App = () => {
  return (
    <div>
      <SummaryAllCats />
      <BigCats />
      <SmallCats />
    </div>
  )
}

export default App
