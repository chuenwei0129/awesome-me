import { atom, useAtom, useAtomValue } from "jotai"
import React from "react"

// 用户分数的原子状态
const userScoreAtom = atom<number>(0)

// 读写用户级别的原子状态
export const readWriteUserLevelAtom = atom<
  string,
  ['+' | '-'],
  void
>(
  (get) => {
    // 获取当前用户分数
    const score = get(userScoreAtom)
    // 根据分数返回用户级别
    if (score < 60) {
      return 'Beginner'
    } else if (score < 80) {
      return 'Intermediate'
    } else {
      return 'Expert'
    }
  },
  (get, set, update: '+' | '-') => {
    // 获取当前用户分数
    const currentScore = get(userScoreAtom)

    let newScore

    // 根据操作类型更新分数
    switch (update) {
      case "+":
        newScore = currentScore + 10
        break
      case "-":
        newScore = currentScore - 10
        break
      default:
        newScore = currentScore
    }
    // 设置新的用户分数
    set(userScoreAtom, newScore)
  }
)

// 主组件
export default function App() {
  // 使用 useAtomValue 钩子获取用户分数
  const userScore = useAtomValue(userScoreAtom)
  // 使用 useAtom 钩子获取和设置用户级别
  const [userLevel, setUserLevel] = useAtom(readWriteUserLevelAtom)

  // 渲染 UI
  return (
    <div>
      <p>用户分数: {userScore}</p>
      <p>用户级别: {userLevel}</p>

      <button
        onClick={() => setUserLevel('+')}
      >
        增加分数
      </button>

      <button
        onClick={() => setUserLevel('-')}
      >
        减少分数
      </button>
    </div>
  )
}
