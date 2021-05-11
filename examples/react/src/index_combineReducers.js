import { Component } from 'react'
import ReactDOM from 'react-dom'

function createStore(reducer, initState) {
  let state = initState ?? initState
  let renders = []

  function getState() {
    return state
  }

  function dispatch(action) {
    state = reducer(state, action)
    renders.forEach(render => render())
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

// 只有一个 store
// 但状态可以拆分，相当于一个个小 store
// 每个小 store 都有自己的 reducer 处理数据，
// 每个小 store 初始化数据都是自己单独写的
// 最后需要数据合并，reducer 合并，渲染页面的数据是从整个store里取得

const ADD_COUNT1 = 'ADD_COUNT1'
const MINUS_COUNT1 = 'MINUS_COUNT1'
const initCounter1 = { num: 0 }

const reducer1 = (state = initCounter1, action) => {
  switch (action.type) {
    case ADD_COUNT1:
      return { num: state.num + 1 }
    case MINUS_COUNT1:
      return { num: state.num - 1 }
    default:
      return state
  }
}

const ADD_COUNT2 = 'ADD_COUNT2'
const MINUS_COUNT2 = 'MINUS_COUNT2'
const initCounter2 = { num: 0 }

const reducer2 = (state = initCounter2, action) => {
  switch (action.type) {
    case ADD_COUNT2:
      return { num: state.num + 1 }
    case MINUS_COUNT2:
      return { num: state.num - 1 }
    default:
      return state
  }
}

//* 合并 reducer，合并 state
// 流程
// const store = createStore(reducer) 执行
// reducer(state = {}, action)执行
// nextState.counter1 = reducer1(state.counter1, action) 执行 返回 nextState.counter1 = {num: 0}
// nextState.counter2 = reducer2(state.counter2, action) 执行 nextState.counter2 = {num: 0}
// return nextState

// dispatch 触发 reducer
// 由于闭包 state 为 上次 nextState 值

// 这里就是 combineReducers 的核心逻辑，这也是 combineReducers 的返回值，
// 传入createStore(combineReducers({reducer1, reducer2}))
function reducer(state = {}, action) {
  // 这么写每次都会清空 nextState
  let nextState = {}
  console.log('上次 state', state)
  nextState.counter1 = reducer1(state.counter1, action)
  nextState.counter2 = reducer2(state.counter2, action)
  console.log('当前 state', nextState)
  return nextState
}

const store = createStore(reducer)

class Counter1 extends Component {
  state = {
    num: store.getState().counter1.num
  }

  add = () => {
    store.dispatch({ type: 'ADD_COUNT1' })
  }

  minus = () => {
    store.dispatch({ type: 'MINUS_COUNT1' })
  }

  componentDidMount() {
    this.unSubscribe = store.subscribe(() => {
      this.setState({ num: store.getState().counter1.num })
    })
  }

  componentWillUnmount() {
    this.unSubscribe()
  }

  render() {
    return (
      <div>
        <h1>{this.state.num}</h1>
        <button onClick={this.add}> add + </button>
        <button onClick={this.minus}> minus - </button>
      </div>
    )
  }
}

class Counter2 extends Component {
  state = {
    num: store.getState().counter2.num
  }

  add = () => {
    store.dispatch({ type: 'ADD_COUNT2' })
  }

  minus = () => {
    store.dispatch({ type: 'MINUS_COUNT2' })
  }

  componentDidMount() {
    this.unSubscribe = store.subscribe(() => {
      this.setState({ num: store.getState().counter2.num })
    })
  }

  componentWillUnmount() {
    this.unSubscribe()
  }

  render() {
    return (
      <div>
        <h1>{this.state.num}</h1>
        <button onClick={this.add}> add + </button>
        <button onClick={this.minus}> minus - </button>
      </div>
    )
  }
}

function App(props) {
  return props.children
}

ReactDOM.render(
  <App>
    <Counter1></Counter1>
    <hr />
    <Counter2></Counter2>
  </App>,
  document.getElementById('root')
)

// react-redux
// 执行两次
// connect()() hoc 逻辑复用，颗梨花，mapStatetoprops 是为了优化，减少无意义渲染，
// hoc 把我们每次重复代码解决 connect 传参数是为了，action 是为了在子组件里合并 actions 都是为了少些，但是狗头
// context 提供 store


