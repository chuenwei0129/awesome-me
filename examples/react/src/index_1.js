/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import ReactDOM, { unstable_batchedUpdates } from 'react-dom'

const App = () => {
  const [pending, setPending] = useState(false)
  const [users, setUsers] = useState([])
  const [isErr, setErr] = useState(false)
  const [id, setId] = useState('')

  const request = async params => {
    const res = await fetch(`http://localhost:5000${params.url}/${params.id}`)
    return res.ok ? res.json() : res
  }

  const getUsers = async params => {
    // 不区分 mount/update
    // 这里还是 react 环境，所以有 batch，异步更新
    // 此处先不更新
    // 这里会 batch 所以无所谓，在异步中也会 batch action
    setPending(true)
    setErr(false)
    setUsers([])
    const data = await request(params)
    if (data.status === 404) {
      setErr(true)
    } else {
      // 理解了，这里异步后进入不了 batch 所以需要 手动 batch
      unstable_batchedUpdates(() => {
        setUsers(Array.isArray(data) ? data : [data])
        setPending(false)
      })
    }
  }

  useEffect(() => {
    console.log('useEffect callback run')
    getUsers({ url: '/users', id: '' })
  }, [])

  const handleClick = () => {
    // getUsers({ url: '/users', id })
    getUsers({ url: '/users', id })
  }

  console.count('app render')

  return (
    <>
      <section>
        <input type='text' value={id} onChange={e => setId(e.target.value)} />
        <button onClick={handleClick}>getUsers</button>
      </section>

      {/* <h2>已搜索：{this.state.count - 1 > 0 ? this.state.count - 1 : 0} 次</h2> */}

      {pending ? (
        isErr ? (
          <h1>404 not found</h1>
        ) : (
          <h1>loading...</h1>
        )
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              姓名：<span style={{ color: 'red' }}>{user.name}</span> —— ——
              年龄：<span>{user.age}</span> —— —— 角色：
              <span>{user.roles}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
