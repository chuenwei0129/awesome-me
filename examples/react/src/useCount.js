import { useState } from 'react'

const useCount = initCount => {
  const [count, updateCount] = useState(initCount)

  const addCount = () => {
    updateCount(count + 1)
  }

  return [count, addCount]
}

export default useCount
