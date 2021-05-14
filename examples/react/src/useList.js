import { useState } from 'react'

const request = async params => {
  const res = await fetch(`http://localhost:5000${params.url}/${params.id}`)
  const data = res.json()
  return Array.isArray(data) ? data : [data]
}

export const useUserList = (params) => {
  const [pending, setPending] = useState(false)
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    setPending(true)
    setUsers([])
    const data = await request(params)
    setUsers(data)
    setPending(false)
  }

  return [pending, users, getUsers]
}
