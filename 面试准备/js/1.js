import React, { useState, useEffect, useRef } from 'react'

const Countdown = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount)
  const intervalRef = useRef(null)

  useEffect(() => {
    // 清理函数，用于清除定时器
    const cleanup = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    // 设置定时器
    intervalRef.current = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          // 如果倒计时结束，清除定时器
          cleanup()
          return 0
        } else {
          // 否则减少计数
          return prevCount - 1
        }
      })
    }, 1000)

    // 组件卸载时清除定时器
    return cleanup
  }, []) // 这里我们传递一个空数组，因为我们不希望响应任何props或state的变化

  return <div>Countdown: {count}</div>
}

export default Countdown
