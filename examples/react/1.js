// Demo 0
function useState(initialValue) {
  let _val = initialValue // _val是useState创建的本地变量
  function state() {
    // state是一个闭包
    return _val // state() 使用了由外层函数定义的_val
  }
  function setState(newVal) {
    // 同样
    _val = newVal // 赋值_val
  }
  return [state, setState] // 将函数暴露给外部使用
}
var [foo, setFoo] = useState(0) // 数组解构
console.log(foo()) // 打印 0 - initialValue（初始值）
setFoo(1) // 在useState作用域内设置_val的值
console.log(foo()) // 打印 1 - 虽然调用同一个方法，但返回新的 initialValue

// Demo 1
function Counter() {
  const [count, setCount] = useState(0) // 和上文实现的一样
  return {
    click: () => setCount(count() + 1),
    render: () => console.log('render:', { count: count() })
  }
}

const C = Counter()

C.render() // render: { count: 0 }
C.click()
C.render() // render: { count: 1 }
