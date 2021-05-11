import { Component } from 'react'
import ReactDOM from 'react-dom'

function createStore(reducer, initState) {
  let state = initState ?? initState
  let renders = []

  function getState() {
    return state
  }

  // 多次重复调用 getState 返回的是同一个 state 即 同一个对象，对应 reducer 最后一行代码
  // 重复调用 getState 相当于返回的是对象的指针，一个指针变化不会使得别的指针引用改变
  // 只有 dispatch 才会返回新的对象
  function dispatch(action) {
    let prevState = state
    state = reducer(state, action)
    let nextState = state
    // 每次返回的都是新对象
    console.log(prevState, nextState)
    renders.forEach(render => render())
    // 返回 action 便于调试
    return action
  }

  function subscribe(render) {
    let subscribed = true
    renders.push(render)
    return () => {
      if (!subscribed) return
      renders.splice(renders.indexOf(render), 1)
      subscribed = false
    }
  }

  dispatch({ type: 'INIT' })

  return { getState, dispatch, subscribe }
}

const ADD_COUNT = 'ADD_COUNT'
const MINUS_COUNT = 'MINUS_COUNT'

const initState = { num: 0 }

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_COUNT:
      return { num: state.num + 1 }
    case MINUS_COUNT:
      return { num: state.num - 1 }
    default:
      return state
  }
}

const store = createStore(reducer)

let s1 = store.getState()
const s2 = store.getState()
// 初始化时 返回的和渲染的是同样的内容，所以 s1.num = 100 会影响和他同一时间多次调用getState()返回的值
s1.num = 100

console.log(s1 === s2)
s1 = null
// 但在这里

console.log(s1, s2)

// 这种就是 actionCreators
// 可以传参占卜处理
const addAction = () => ({ type: 'ADD_COUNT' })
const minusAction = () => ({ type: 'MINUS_COUNT' })

// 参数也可能是 actions
const actions = {
  addAction,
  minusAction
}

// bind dispatch
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return dispatch(actionCreators())
  }
  let ret = {}
  for (const [k, v] of Object.entries(actionCreators)) {
    ret[k] = () => dispatch(v())
  }
  return ret
}

// 执行情况
// 执行 createStore 内部会初始化，全局共享状态即 store.getState() = {num: 0}
// 和 react 单组件关联
// 组件 mount 时，把全局状态注入单组件 state，constructor 只执行一次
// componentDidMount 时，订阅组件的渲染，以便 store 数据变化时，触发渲染
// 单组件渲染 setState 触发 render 执行，即 rerender 组件
// this.setState({ num: store.getState().num }) 这里 store.getState().num 获取新的 num，以 react 要求数据传递
// componentWillUnmount 注销后需要清空订阅
// 手动触发组件渲染 store.dispatch

class App extends Component {
  state = {
    num: store.getState().num
  }

  minus = () => bindActionCreators(actions).minusAction

  add = () => {
    store.dispatch(addAction())
    bindActionCreators(actions, store.dispatch).addAction()
  }

  componentDidMount() {
    this.unSubscribe = store.subscribe(() => {
      this.setState({ num: store.getState().num })
    })
  }

  componentWillUnmount() {
    this.unSubscribe()
  }

  render() {
    return (
      <div>
        <h1>{store.getState().num}</h1>
        <button onClick={this.add}> add + </button>
        <button
          onClick={bindActionCreators(actions, store.dispatch).minusAction}>
          {' '}
          minus -{' '}
        </button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
