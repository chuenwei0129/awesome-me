回答第一个问题：useMemo会将第一个参数（函数）的返回值保存在组件对应fiber中，只有在依赖项（第二个参数）变化后才会重新调用第一个参数（函数）计算一个新值。回答第二个问题：函数组件的返回值是JSX对象。同一个函数组件调用多次，返回的是多个「不同」的JSX对象（即使props未变，但JSX是新的引用）。按照以上两个回答，我们可以得出结论： 以上useMemo用法实际上在函数组件对应的fiber中缓存了一个完整的JSX对象

作者：魔术师卡颂
链接：https://zhuanlan.zhihu.com/p/348796468
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。


大家好，我卡颂。

有3个容易混淆的前端框架概念：

响应式更新
单向数据流
双向数据绑定
在继续阅读本文前，读者可以思考下是否明确知道三者的含义。

这三者之所以容易混淆，是因为他们虽然同属前端框架范畴内的概念，但又不是同一抽象层级的概念，不好直接比较。

https://zhuanlan.zhihu.com/p/612211805

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
