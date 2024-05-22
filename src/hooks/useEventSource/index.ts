import { useCallback, useEffect, useRef, useState } from 'react'

// 定义 EventSource 状态类型
type EventSourceStatus = 0 | 1 | 2

// 定义事件处理函数的类型
type EventHandler = (event: MessageEvent) => void

// 定义事件和处理程序的映射
interface EventMap {
  [key: string]: EventHandler
}

// 定义 Hook 配置的接口
interface UseEventSourceOptions {
  shouldReconnect?: boolean
  maxRetries?: number
  retryTimeout?: number
  onMaxRetriesReached?: () => void
}

// 定义 Hook 返回值的接口
interface UseEventSourceResult {
  eventSource: EventSource | null
  event: string | null
  data: string | null
  status: EventSourceStatus
  error: Event | null
  open: () => void
  close: () => void
}

function useEventSource(
  url: string,
  events: EventMap = {},
  options: UseEventSourceOptions = {},
): UseEventSourceResult {
  const [eventSource, setEventSource] = useState<EventSource | null>(null)
  const [data, setData] = useState<string | null>(null)
  const [event, setEvent] = useState<string | null>(null)
  const [status, setStatus] = useState<EventSourceStatus>('CLOSED')
  const [error, setError] = useState<Event | null>(null)
  const retryCount = useRef(0)

  const {
    shouldReconnect = true,
    maxRetries = 3,
    retryTimeout = 3000,
    onMaxRetriesReached = () => {},
  } = options

  // 打开连接的函数
  const open = useCallback(() => {
    const es = new EventSource(url)

    es.onopen = () => {
      setStatus('OPEN')
      setError(null)
      retryCount.current = 0 // 重置重试次数
    }

    es.onerror = (e) => {
      setStatus('CLOSED')
      setError(e)
      if (shouldReconnect && retryCount.current < maxRetries) {
        setTimeout(() => {
          retryCount.current++
          open()
        }, retryTimeout)
      } else {
        onMaxRetriesReached()
      }
    }

    // 添加自定义事件监听器
    Object.keys(events).forEach((eventName) => {
      es.addEventListener(eventName, (e: MessageEvent) => {
        setEvent(eventName)
        setData(e.data)
        events[eventName](e)
      })
    })

    setStatus(1)
    setEventSource(es)
  }, [
    url,
    events,
    shouldReconnect,
    maxRetries,
    retryTimeout,
    onMaxRetriesReached,
  ])

  // 关闭连接的函数
  const close = useCallback(() => {
    if (eventSource) {
      eventSource.close()
      setStatus(2)
      setEventSource(null)
    }
  }, [eventSource])

  // 初始化时打开连接，卸载时关闭连接
  useEffect(() => {
    open()
    return () => close()
  }, [open, close])

  return { eventSource, event, data, status, error, open, close }
}

export default useEventSource
