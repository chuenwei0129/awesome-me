const MyReact = (function () {
  let hooks = [],
    currentHook = 0 // hooks数组 和 当前hook的索引

  return {
    render(Component) {
      const Comp = Component() // 执行 effects
      Comp.render()
      currentHook = 0 // 为下一次render重置hook索引
      return Comp
    },

    useEffect(callback, depArray) {
      const hasNoDeps = !depArray
      const deps = hooks[currentHook] // type: array | undefined
      const hasChangedDeps = deps
        ? !depArray.every((el, i) => el === deps[i])
        : true
      if (hasNoDeps || hasChangedDeps) {
        callback()
        hooks[currentHook] = depArray
      }
      currentHook++ // 当前hook处理完毕
    },

    useState(initialValue) {
      hooks[currentHook] = hooks[currentHook] || initialValue
      const setStateHookIndex = currentHook
      const setState = (newState) => (hooks[setStateHookIndex] = newState)
      return [hooks[currentHook++], setState]
    },
  }
})()

function Counter() {
  const [count, setCount] = MyReact.useState(0)
  const [text, setText] = MyReact.useState('foo') // 第二个 state hook!
  MyReact.useEffect(() => {
    console.log('effect1', count, text)
  }, [count, text])
  MyReact.useEffect(() => {
    console.log('effect2')
  }, [])
  return {
    click: () => setCount(count + 1),
    type: (txt) => setText(txt),
    noop: () => setCount(count),
    render: () => console.log('render', { count, text }),
  }
}

let App
App = MyReact.render(Counter)

// App.click()
// App = MyReact.render(Counter)
