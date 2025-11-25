import React from "react"
import { create } from "zustand"
import { devtools, persist, subscribeWithSelector } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

interface CatStoreType {
  cats: {
    bigCats: number,
    smallCats: number
  },
  incrementBigCats: () => void
  incrementSmallCats: () => void
  resetBigCats: () => void
}

// 中间件顺序很重要
const useCatStore = create<CatStoreType>()(immer(devtools(subscribeWithSelector((persist((set) => ({
  cats: {
    bigCats: 0,
    smallCats: 0  // 确保 smallCats 有个初始值
  },
  incrementBigCats: () => set(state => {
    state.cats.bigCats += 1
  }),
  resetBigCats: () => set(state => {
    state.cats.bigCats = 0
  }),
  incrementSmallCats: () => set(state => {
    state.cats.smallCats += 1
  }),
}), {
  name: 'cat-storage-2',
  partialize(state) {
    return {
      bigCats: state.cats.bigCats
    }
  },
}))))))

const BigCats = () => {
  const bigCats = useCatStore(state => state.cats.bigCats)
  const incrementBigCats = useCatStore(state => state.incrementBigCats)
  const resetBigCats = useCatStore(state => state.resetBigCats)

  return <div className="border border-solid border-red-600">
    <h1>BigCats 组件：{bigCats}</h1>
    <h2>是否重渲染：{Math.random()}</h2>
    <button type="button" onClick={incrementBigCats}>incrementBigCats</button>
    <button type="button" onClick={resetBigCats}>resetBigCats</button>
    <button type="button" onClick={useCatStore.persist.clearStorage}>清除持久化数据，但内存中的数据不会清除</button>
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

const App = () => {
  return (
    <div>
      <BigCats />
      <SmallCats />
    </div>
  )
}

export default App
