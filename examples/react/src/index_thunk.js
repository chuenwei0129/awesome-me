import { Component } from 'react'
import ReactDOM from 'react-dom'
import { createStore } from './redux'

// 介入 redux
const initAuthorInfo = {
  count: 0,
  authorInfo: null,
  isLoading: true,
  isError: false,
  id: ''
}

const SET_AUTHOR_INFO = 'SET_AUTHOR_INFO'

const reducer = (state = initAuthorInfo, action) => {
  switch (action.type) {
    case SET_AUTHOR_INFO:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

const store = createStore(reducer)

// 中间件 核心就是对 dispatch 的重写
const oldDispatch = store.dispatch

store.dispatch = action => {
  console.log(`老状态：`, store.getState())
  if (typeof action === 'function') {
    action(oldDispatch)
  } else {
    oldDispatch(action)
  }
  console.log(`新状态：`, store.getState())
}

class App extends Component {
  state = store.getState()

  componentDidMount() {
    this.getAuthorInfo()

    this.unSubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  componentWillUnmount() {
    this.unSubscribe()
  }

  // 复用
  fetchAuthorInfo = id => dispatch => {
    this.setState({ isLoading: true, isError: false })
    fetch(`http://localhost:3000/course/${id}`)
      .then(res => (res.ok ? res.json() : this.setState({ isError: true })))
      .then(data => {
        dispatch({
          type: 'SET_AUTHOR_INFO',
          payload: {
            authorInfo: Array.isArray(data) ? data : [data],
            isLoading: false,
            count: this.state.count + 1
          }
        })
      })
  }

  getAuthorInfo = () => {
    // dispatch(fetchUserById(id)) = action(oldispatch)
    // const fetchAuthorWithDispatch = this.fetchAuthorInfo(this.state.id)
    // fetchAuthorWithDispatch(store.dispatch)
    // this.fetchAuthorInfo(store.dispatch, this.state.id)
    store.dispatch(this.fetchAuthorInfo(this.state.id))
  }

  // 对象只支持表达式，所以 jsx 不支持 for loop，ul 在表达式中相当于 对象
  render() {
    return (
      <>
        <section>
          <input
            type='text'
            value={this.state.id}
            onChange={e => {
              this.setState({ id: e.target.value })
            }}
          />
          <button onClick={this.getAuthorInfo}>getAuthorInfo</button>
        </section>

        <h2>
          已搜索：{this.state.count - 1 > 0 ? this.state.count - 1 : 0} 次
        </h2>

        <h2 style={{ display: this.state.isError ? 'block' : 'none' }}>
          出错了！
        </h2>

        <h2 style={{ display: this.state.isLoading ? 'block' : 'none' }}>
          加载中...
        </h2>

        {!this.state.isLoading && !this.state.isError && (
          <ul>
            {this.state.authorInfo.map(author => {
              return (
                <li key={author.id}>
                  <span style={{ color: 'red' }}>{author.id}</span>
                  <span>：</span>
                  <b>{author.name}</b>
                </li>
              )
            })}
          </ul>
        )}
      </>
    )
  }
}

// useRef 类似于 redux return state，指向同一个引用地址
// dom 节点变化才变化

// 这里需要优化 input 触发重渲染，页面 应该由 isLoading 触发渲染

ReactDOM.render(<App />, document.getElementById('root'))

// 复盘
// 到此我们终于实现了 redux-thunk 这个库的功能了。再来复盘一下整个过程是怎样的：

// 我们需要完成获取信息，并用 dispatch 修改 store 数据的需求，按理说啥事没有
// 但是发现在组件里这么写会依赖 dispatch 函数，所以把 dispatch 放到参数上
// 又发现每次执行的时候都要传入 dispatch 函数，很麻烦，所以把 dispatch 作为第一个参数，并写出 (dispatch) => (id) => {...} 这样的函数结构，用 dispatch 初始化后可以到处使用了
// 发现每次都要初始化还是很麻烦，而且容易被误导，所以我们考虑使用 (id) => (dispatch) => {...} 的函数结构，但是会出现 fetchUserById(id)(dispatch) 这样的结构
// 我们希望将整个结构反过来变成这样：dispatch(fetchUserById(id))，所以想到了要改写 dispatch 函数
// 发现直接赋值是个很笨的行为，比较高级的是使用中间件来改写 dispatch 函数
// 最后，我们做了一个中间件出来，就叫做 redux-thunk
