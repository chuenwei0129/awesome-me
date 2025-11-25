import React from "react"
import { create } from "zustand"
import { useShallow } from "zustand/shallow"

interface CatStoreType {
  cats: {
    bigCats: number,
    smallCats: number,
    otherCats: number
  },
  incrementBigCats: () => void
  incrementSmallCats: () => void
  incrementOtherCats: () => void
  summaryAllCats: () => number
}

const useCatStore = create<CatStoreType>()((set, get) => ({
  cats: {
    bigCats: 0,
    smallCats: 0,
    otherCats: 0
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
  incrementOtherCats: () => set(state => ({
    cats: {
      ...state.cats,
      otherCats: state.cats.otherCats + 1
    }
  })),
  summaryAllCats: () => get().cats.bigCats + get().cats.smallCats + get().cats.otherCats
}))

const BigCats = () => {
  const [bigCats, , incrementBigCats] = useCatStore(useShallow(state => [state.cats.bigCats, state.cats.smallCats, state.incrementBigCats]))

  return <div className="border border-solid border-red-600">
    <h1>BigCats 组件：{bigCats}</h1>
    <h2>是否重渲染：{Math.random()}</h2>
    <button type="button" onClick={incrementBigCats}>incrementBigCats</button>
  </div>
}

const SmallCats = () => {
  const [, smallCats, incrementSmallCats] = useCatStore(useShallow(state => [state.cats.bigCats, state.cats.smallCats, state.incrementSmallCats]))

  return <div className="border border-solid border-gray-600">
    <h1>smallCats 组件：{smallCats}</h1>
    <h2>是否重渲染：{Math.random()}</h2>
    <button type="button" onClick={incrementSmallCats}>incrementSmallCats</button>
  </div>
}

const OtherCats = () => {
  const otherCats = useCatStore(state => state.cats.otherCats)
  const incrementOtherCats = useCatStore(state => state.incrementOtherCats)

  return <div className="border border-solid border-gray-600">
    <h1>OtherCats 组件：{otherCats}</h1>
    <h2>是否重渲染：{Math.random()}</h2>
    <button type="button" onClick={incrementOtherCats}>incrementOtherCats</button>
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
      <OtherCats />
    </div>
  )
}

export default App
