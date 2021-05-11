```js
import { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  state = {
    count: 0,
    value: '',
    authorInfo: null,
    isLoading: true,
    isError: false
  }

  componentDidMount() {
    this.getAuthorInfo()
  }

  getAuthorInfo = () => {
    this.setState({ isLoading: true, isError: false })
    fetch(`http://localhost:3000/course/${this.state.value}`)
      .then(res => (res.ok ? res.json() : this.setState({ isError: true })))
      .then(data => {
        this.setState({
          authorInfo: Array.isArray(data) ? data : [data],
          isLoading: false,
          count: this.state.count + 1
        })
      })
  }

  render() {
    return (
      <>
        <section>
          <input
            type='text'
            value={this.state.value}
            onChange={e => {
              this.setState({ value: e.target.value })
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

ReactDOM.render(<App />, document.getElementById('root'))
```
