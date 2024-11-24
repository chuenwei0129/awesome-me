// 导入jotai库中的atom、useAtom和useAtomValue函数，以及jotai-history库中的withUndo函数
import { atom, useAtom, useAtomValue } from 'jotai'
import { withUndo } from 'jotai-history'
import React from 'react'

// 创建一个初始值为0的atom
const counterAtom = atom(0)
// 为counterAtom添加撤销功能，最多保存5次历史状态
const undoCounterAtom = withUndo(counterAtom, 5)

/**
 * App组件是应用的主要组件
 * 它展示了计数器的当前值，并提供增加计数器、撤销和重做操作的功能
 */
export default function App() {
  // 使用undoCounterAtom，获取撤销、重做、是否可以撤销和是否可以重做的状态
  const { undo, redo, canUndo, canRedo } = useAtomValue(undoCounterAtom)
  // 使用counterAtom，获取当前计数器的值和更新计数器值的函数
  const [value, setValue] = useAtom(counterAtom)

  // 渲染应用界面
  return (
    <>
      <p>Count: {value}</p>
      {/* // 点击按钮增加计数器的值 */}
      <button onClick={() => setValue((c) => c + 1)}>Increment</button>
      {/* // 点击按钮执行撤销操作，如果不能撤销则禁用按钮 */}
      <button onClick={undo} disabled={!canUndo}>
        Undo
      </button>
      {/* // 点击按钮执行重做操作，如果不能重做则禁用按钮 */}
      <button onClick={redo} disabled={!canRedo}>
        Redo
      </button>
    </>
  )
}
