const createContext = () => {
  let contextVal = undefined

  const Provider = (value, callback) => {
    // 缓存当前的 contextValue
    const currentValue = contextVal
    contextVal = value
    callback()
    contextVal = currentValue
  }

  const Consumr = () => contextVal

  return {
    Provider,
    Consumr,
  }
}

// 模拟 useContext
const useContext = (contextRef) => {
  return contextRef.Consumr()
}

// 使用
const ValueContext = createContext()

ValueContext.Provider(42, () => {
  // 现在 contextValue 的值是 42、currentValue 的值是 undefined
  console.log(useContext(ValueContext)) // 42

  ValueContext.Provider(13, () => {
    // 现在 contextValue 的值是 13、currentValue 的值是上一层的 42
    console.log(useContext(ValueContext)) // 13

    ValueContext.Provider(2, () => {
      // 现在 contextValue 的值是 2、currentValue 的值是上一层的 13
      console.log(useContext(ValueContext)) // 2
    })

    // 我们退出了一层 Provider，现在 contextValue 的值被重置为 13，这一层的 currentValue 是上一层的 42
    console.log(useContext(ValueContext)) // 13
  })

  // 我们又退出了一层 Provider，现在 contextValue 的值被重置为 42
  // 已经没有更外面的 Provider 了，这一层的 currentValue 是 undefined
})

// 我们退出了最外层的 Provider，现在 contextValue 的值被重置为 undefined
