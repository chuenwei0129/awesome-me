import React, { useEffect, useState } from 'react'

const EventSourceComponent = () => {
  const [messages, setMessages] = useState<{ message: string }[]>([])
  const [lastEventId, setLastEventId] = useState('0')

  useEffect(() => {
    const connect = () => {
      const eventSource = new EventSource(
        `http://awesome-me:3000/events?lastEventId=${lastEventId}`,
      )

      eventSource.onmessage = (event) => {
        const newMessage = JSON.parse(event.data)
        setMessages((prevMessages) => [...prevMessages, newMessage])
        setLastEventId(event.lastEventId)
      }

      eventSource.onerror = (error) => {
        console.error('EventSource failed:', error)
        eventSource.close()
        // 实现自定义的重连逻辑
        setTimeout(() => {
          console.log('Attempting to reconnect...')
          connect() // 重新连接
        }, 5000) // 5秒后尝试重连
      }

      return () => eventSource.close()
    }
    const disconnect = connect() // 建立连接
    return () => disconnect() // 清理函数，组件卸载时断开连接
  }, [])

  return (
    <div>
      <h2>Messages from server:</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.message}</li>
        ))}
      </ul>
    </div>
  )
}

export default EventSourceComponent
