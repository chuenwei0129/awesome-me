// 在react应用中，我们是因为“用户的行为”发起请求，还是因为“状态的变化”发起请求？
// 不要区分mount和update，仅控制外部依赖的注册（请求）与销毁。
// useEffect可以很好地表达“当params变化时执行整个过程”这样的流程逻辑，使得整体代码的表达能力也上升了一个台阶。
// 看不到前方，不是因为前路漆黑，未来总是光芒四射的。因为过于耀眼，所以才刺眼得让人看不见。
// 无意跌池塘，醒来满辰光

import { useCallback, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

const request = async params => {
  const res = await fetch(`http://localhost:5000/users/${params.keyWord}`)
  return res.json()
}

const App = () => {
  const [keyWord, setKeyword] = useState('')
  const [params, setParams] = useState({ keyWord })

  const [pending, setPending] = useState(false)
  const [users, setUsers] = useState([])

  useEffect(() => {
    ;(async () => {
      setPending(true)
      const data = await request(params)
      setUsers(Array.isArray(data) ? data : [data])
      setPending(false)
    })()
  }, [params])

  const handleClick = useCallback(() => setParams({ keyWord }), [keyWord])

  return (
    <>
      <section>
        <input
          type='text'
          value={keyWord}
          onChange={e => setKeyword(e.target.value)}
        />
        <button onClick={handleClick}>fetchData</button>
      </section>

      {pending ? (
        <h1>loading...</h1>
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

ReactDOM.render(<App></App>, document.getElementById('root'))

// 不要区分mount和update，仅控制外部依赖的注册（请求）与销毁。
// useEffect可以很好地表达“当params变化时执行整个过程”这样的流程逻辑，使得整体代码的表达能力也上升了一个台阶。

// 分层 状态与操作封装
// 把一个状态和它强相关的行为放在一起，显而易见地是一种合理的编程模式。
// 在hook分层的最底层，我建议大家都有一个功能有，叫作“给我一个值和一堆方法，我帮你变成hook”，在我的实现里我叫它useMethods。
// 封装常用数据结构
// 通用过程封装
// 拼装成业务
// 所以状态粒度过粗的问题就在于，它会隐藏掉可以复用的状态，让人不知不觉通过“行云流水地重复编码”来实现功能，离复用和精简越来越远。

// 确实只有react调起的回调（比如onClick）会把回调中所有同步调用的setState合并。如果回调不是由react调度的，那么react会认为这些setState属于不同的事件（即使这两个setState是相邻的语句）。React只会合并同一个事件中的setState。

// React不合并事件的策略是合理的，因为这样的话useEffect就能够看到每个事件依次发生，而不是直接看到2个事件发生以后的结果。
