export function createStore(reducer, initState) {
  let state = initState ?? initState
  let renders = []

  function getState() {
    return state
  }

  function dispatch(action) {
    state = reducer(state, action)
    renders.forEach(render => render())
    return action
  }

  function subscribe(render) {
    let subscribed = true
    renders.push(render)
    return () => {
      if (!subscribed) return
      renders.splice(renders.indexOf(render), 1)
      subscribed = false
    }
  }

  dispatch({ type: 'INIT' })

  return { getState, dispatch, subscribe }
}
