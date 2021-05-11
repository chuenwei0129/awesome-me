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
  oldDispatch(action)
  console.log(`新状态：`, store.getState())
}

class App extends Component {
  state = store.getState()

  componentDidMount() {
    this.getAuthorInfo()

    this.unSubscribe = store.subscribe(() => {
      this.setState({ ...store.getState() })
    })
  }

  componentWillUnmount() {
    this.unSubscribe()
  }

  // 这里优化需要拆分
  // componentDidMount() {
  //   this.getAuthorInfo()
  // }

  // componentDidUpdate() {
  //   console.count('渲染次数')
  // }

  fetchAuthorInfo = (dispatch, id) => {
    this.setState({ isLoading: true, isError: false })
    fetch(`http://localhost:3000/course/${id}`)
      .then(res => (res.ok ? res.json() : this.setState({ isError: true })))
      .then(data => {
        // 不会触发 batch，两次调用会渲染两次，这里脱离了 react 优化，即只在合成事件和生命周期中优化
        // this.setState({
        //   authorInfo: Array.isArray(data) ? data : [data],
        //   isLoading: false,
        //   count: this.state.count + 1
        // })
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
    this.fetchAuthorInfo(store.dispatch, this.state.id)
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

// 这里需要优化 input 触发重渲染，页面 应该由 isLoading 触发渲染

ReactDOM.render(<App />, document.getElementById('root'))

