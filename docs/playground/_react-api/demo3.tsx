import React, { StrictMode, useCallback, useEffect, useMemo, useRef } from "react"

type noop = (...args: any[]) => any

const useMount = (callback?: noop) => {
  useEffect(() => {
    callback?.()
  }, [])
}

const useUnMount = (callback?: noop) => {
  useEffect(() => {
    return () => {
      callback?.()
    }
  }, [])
}

const useEffectOnce = (callback?: noop) => {
  const isFirstRunRef = useRef(true)
  useEffect(() => {
    if (isFirstRunRef.current) {
      callback?.()
    }
    isFirstRunRef.current = false

    return () => {
      console.log('useEffectOnce cleanup');
    }
  }, [])
}

const App = () => {
  useMount(() => {
    console.log('App mounted');
  })

  useUnMount(() => {
    console.log('App unmounted')
  })

  useMemo(() => {
    console.log('useMemo run');
    return ({
      name: 'chu'
    })
  }, [])

  useCallback(() => {
    console.log('useCallback run');
    return () => { }
  }, [])

  useEffectOnce(() => {
    console.log('useEffectOnce run')
  })

  console.log('App render')

  return (
    <div>App</div>
  )
}

export default () => <StrictMode><App /></StrictMode>

