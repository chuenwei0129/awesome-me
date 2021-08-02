import { produce } from 'immer'

let prevState = {
  p: {
    x: [1]
  }
}

let nextState = produce(prevState, draft => {
  draft.p.x.push(2)
})

console.log(nextState)
