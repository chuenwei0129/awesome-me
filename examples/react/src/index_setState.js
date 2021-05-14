// descriptive programming

import { useState } from 'react'
import ReactDOM from 'react-dom'

// const request = async (url, params) => {
//   const res = await fetch(`http://localhost:3000${url}/${params}`)
//   return res.json()
// }

// const useUserList = () => {
//   const [pending, setPending] = useState(false)
//   const [users, setUsers] = useState([])
//   const load = async (params = '') => {
//     // setPending(true)
//     // setUsers([])
//     const users = await request('/users', params)
//     setUsers(users)
//     // setPending(false)
//   }

//   // const deleteUser = useCallback(
//   //   user => setUsers(users => without(users, user)),
//   //   []
//   // )

//   // const addUser = useCallback(user => setUsers(users => users.concat(user)), [])

//   return [users, { pending, load }]
// }
// 内部是 4 个 newState 合并 baseState = action，相当于，4个定时器执行 baseState = action 4 次，
// 或者 baseState = action()
// 优先级，链表
// cm
// const [users, { pending, load }] = useUserList()
// console.log(users, pending)

// useEffect(() => {
//   console.log('useEffect')
//   load()
// }, [])

const App = () => {
  const [count, updateCount] = useState(0)
  const [count1, updateCount1] = useState(0)

  console.count('渲染次数') // 渲染 5 次

  const add = () => {
    setTimeout(() => {
      // 同步执行，因为闭包原因每次拿的值都是 0
      // flushSync(() => {
      //   updateCount(count + 1)
      //   updateCount(count + 1)
      //   updateCount(count + 1)
      //   updateCount(count + 1) // 触发 2 次 +2
      //   // updateCount(count => count + 1) // +1
      //   // updateCount(count => count + 1) // +1
      // })
      // 这里渲染 2+2
      updateCount(count + 1)
      updateCount(count + 1)
      updateCount(count + 1)

      updateCount1(count1 + 1)
      updateCount1(count1 + 1)
      updateCount1(count1 + 1) // 触发 2 次 +2
      // updateCount(count => count + 1) // +1
      // updateCount(count => count + 1) // +1
    }, 1000)

    // updateCount(count + 1)
    // updateCount(count + 1)
    // updateCount(count + 1)
  }

  return (
    <>
      <h1 onClick={add}>
        {count} {count1}
      </h1>
      {
        // pending ? (
        //   <h1>pending...</h1>
        // ) :
        // <ul>
        //   {users.map(user => {
        //     return <li key={user.id}>{user.name}</li>
        //   })}
        // </ul>
      }
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

// 认同你的说法，但没有this一样要封装，因为react和hook的关系注定了你必须把一个与hook脱离关系的函数通过setState关联进hook里面去，fiber是万恶之源233
// view = render(data) 也就变成了 view = data.pipe(render)
// 题外话，SWR 就完全基于这种思想：数据请求不再是 data = fetch(API)，而是 user.pipe(fetch).pipe(render)

// React hook的在这里的一个缺陷在于，数据变化每传播一步就需要等待1轮渲染。。。如果通过hook来定义计算关系，那么变化的传递会非常低效。

// 举一个极端的例子：

// useHook(a) {
// return

// useDistinctUntilChanged(

// useDistinctUntilChanged(

// useDistinctUntilChanged(a)));
// }

// a变化以后，它的输出要经历3次重新渲染才能传播到useHook的使用者（useHook的使用者这个时候才会感知到数据变化）。

// 上面的例

// 确实普遍存在这个问题，我认为是一种妥协（毕竟 Concurrent mode 是发展方向）。不过如果可以有类似 unstable_batchedUpdates 的替代方案也是很好的。
