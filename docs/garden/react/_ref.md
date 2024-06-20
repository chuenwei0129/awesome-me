import { useEffect, useRef, useState } from 'react'
import type { FC } from 'react'

function App() {
  return (
    <>
      <CountDown initialCount={10} />
    </>
  )
}

const CountDown: FC<{ initialCount: number }> = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount)
  const intervalRef = useRef<number>()

  useEffect(() => {
    console.log('connect...')
    // 设置定时器
    intervalRef.current = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          // 如果倒计时结束，清除定时器
          console.log(prevCount)
          clearInterval(intervalRef.current)
          return 0
        } else {
          // 否则减少计数
          return prevCount - 1
        }
      })
    }, 1000)

    // 组件卸载时清除定时器
    return () => {
      console.log('unconnect...')
      clearInterval(intervalRef.current)
      // intervalRef.current 此时等于定时器 🆔，只是数值，不清理也没关系，反正定时器已经被清理了，
      // intervalRef.current = undefined
    }
  }, []) // 这里我们传递一个空数组，因为我们不希望响应任何props或state的变化

  return <div>Countdown: {count}</div>
}

export default App
