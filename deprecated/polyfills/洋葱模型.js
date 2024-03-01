function highFn(method, wrappers) {
  return () => {
    wrappers.forEach(ele => ele.init())
    method()
    wrappers.forEach(ele => ele.close())
  }
}

const newFn = highFn(() => {
  console.log('hello world')
}, [
  {
    init() {
      console.log('wrapper1 init')
    },
    close() {
      console.log('wrapper1 close')
    }
  },
  {
    init() {
      console.log('wrapper2 init')
    },
    close() {
      console.log('wrapper2 close')
    }
  }
])

newFn()
