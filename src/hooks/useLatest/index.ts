import { useRef } from 'react'

/**
 * 自定义Hook，用于始终获取到最新的值。
 *
 * @param value - 需要获取最新值的变量。
 * @returns 返回一个包含最新值的 ref 对象。
 */
function useLatest<T>(value: T) {
  const ref = useRef<T>(value)
  ref.current = value
  return ref
}

export default useLatest
