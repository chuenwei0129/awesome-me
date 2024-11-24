// import { atom, useSetAtom } from "jotai"
// import React from "react"

// const priceAtom = atom<number>(10)

// const writeOnlyPriceAtom = atom<
//   null,
//   [{ type: string, data: number }],
//   void
// >(
//   null,
//   (get, set, update: { type: string, data: number }) => {
//     // set(priceAtom, price => price + update.data)
//     const primitivePrice = get(priceAtom)
//     set(priceAtom, primitivePrice + update.data)
//   }
// )

// export default function App() {
//   const setWriteOnlyPriceAtom = useSetAtom(writeOnlyPriceAtom)

//   return (
//     <div>
//       <button
//         onClick={() => setWriteOnlyPriceAtom({ type: 'add', data: 10 })}
//       >
//         Add
//       </button>
//     </div>
//   )
// }

// 比如，在上述的 writeOnlyPriceAtom 中只对一个原子的状态进行了更新，
// 看似和直接调用useSetAtom(priceAtom) 没有太大区别，但这里直接把更新逻辑封装到了一个原子中，
// 而这部分逻辑就可以直接从组件的某个事件处理函数中抽离出来。尤其当你的某次交互需要更新多个原子状态，
// 即 setter 函数中有多次 set 方法的调用，只写派生原子就显得更加方便了。

import { atom, useSetAtom, useAtomValue } from "jotai"
import React from "react"

// 基本原子状态
// 产品价格的原子状态
const priceAtom = atom<number>(10)
// 产品数量的原子状态
const quantityAtom = atom<number>(1)

// 派生原子状态，用于计算总价
// 通过乘以价格和数量来派生总价
const totalPriceAtom = atom((get) => get(priceAtom) * get(quantityAtom))

// 只写的原子状态，用于封装更新价格和数量的操作
// 提供一种方式来更新价格和数量
const updateProductInfoAtom = atom<
  null,
  [{ type: 'updatePrice' | 'updateQuantity', data: number }],
  void
>(
  null,
  (get, set, update) => {
    switch (update.type) {
      case 'updatePrice':
        set(priceAtom, get(priceAtom) + update.data)
        break
      case 'updateQuantity':
        set(quantityAtom, get(quantityAtom) + update.data)
        break
      default:
        break
    }
  }
)

// 主组件
export default function App() {
  // 使用 useSetAtom 钩子设置 updateProductInfo 原子状态
  const setUpdateProductInfo = useSetAtom(updateProductInfoAtom)
  // 使用 useAtomValue 钩子读取 totalPrice 原子状态
  const totalPrice = useAtomValue(totalPriceAtom)
  const price = useAtomValue(priceAtom)
  const quantity = useAtomValue(quantityAtom)


  // 渲染 UI
  return (
    <div>
      <h1>产品详情</h1>
      {/* // 显示总价 */}
      <h2>总价: {totalPrice}</h2>
      <p>价格: {price}</p>
      <p>数量: {quantity}</p>
      {/* // 按钮用于增加产品价格 */}
      <button onClick={() => setUpdateProductInfo({ type: 'updatePrice', data: 5 })}>
        增加价格 5
      </button>
      {/* // 按钮用于增加产品数量 */}
      <button onClick={() => setUpdateProductInfo({ type: 'updateQuantity', data: 1 })}>
        增加数量 1
      </button>

    </div>
  )
}
