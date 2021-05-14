import { useEffect, useReducer, useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [isLoading, setLoading] = useState(true)
  // const [isDelayed, setDelayed] = useState(false)
  const [isError, setError] = useState(false)
  const [input, setInput] = useState('')

  const SET_USER_INFO = 'SET_USER_INFO'
  const reducer = (state, action) => {
    switch (action.type) {
      case SET_USER_INFO:
        return { userInfo: action.payload }
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(reducer, {
    userInfo: []
  })

  const fetchData = async input => {
    const res = await fetch(`http://localhost:3000/course/${input}`)
    return res.ok ? res.json() : null
  }

  useEffect(() => {
    getUserInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getUserInfo = async () => {
    setLoading(true)
    setError(false)
    const data = await fetchData(input)
    if (data === null) setError(true)
    dispatch({
      type: 'SET_USER_INFO',
      payload: Array.isArray(data) ? data : [data]
    })
    setLoading(false)
  }

  return (
    <>
      <section>
        <input
          type='text'
          value={input}
          onChange={e => {
            setInput(e.target.value)
          }}
        />
        <button onClick={getUserInfo}>getUserInfo</button>
      </section>

      {isLoading ? (
        isError ? (
          <h1>error...</h1>
        ) : (
          <h1>loading...</h1>
        )
      ) : (
        <ul onClick={getUserInfo}>
          {state.userInfo.map(user => (
            <li key={user.id}>
              <span style={{ color: 'red' }}>{user.id}</span>
              <span>：</span>
              <b>{user.name}</b>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
