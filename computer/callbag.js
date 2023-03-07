// rx
function subscribe(observer) {
  let i = 0
  setInterval(() => {
    observer.next(i++)
  }, 1000)
}

subscribe({
  next: (x) => console.log('subscribe:', x),
})

// 操作符
function filter(predicate, subscribe) {
  return function newSubscribe(newObserver) {
    subscribe({
      next: (x) => {
        if (predicate(x)) {
          newObserver.next(x)
        }
      },
    })
  }
}

filter(
  (i) => i % 2 === 0,
  subscribe
)({
  next: (x) => console.log('filter:', x),
})

// Producer
let i = 0
let handle
function numbers(type, cb) {
  if (type === 'start') {
    handle = setInterval(() => {
      cb(i++)
    }, 1000)
  }

  if (type === 'stop') {
    clearInterval(handle)
  }
}

// Consumer
numbers('start', (x) => console.log('numbers:', x))
setTimeout(numbers, 3500, 'stop')

// const START = { type: 'start', payload: cb }
// const DATA = { type: 'data', payload: data }
// const STOP = { type: 'stop' }

// callbag
function producer(type, payload) {
  if (type === 'start') {
    const consumer = payload
    let i = 0
    let handle
    consumer('start', (t, p) => {
      if (t === 'data') i = p
      if (t === 'stop') clearInterval(handle)
    })
    handle = setInterval(() => consumer('data', i++), 1000)
  }
}

function consumer(type, payload) {
  if (type === 'start') {
    const cb = payload
    setTimeout(() => cb('data', 17), 3500)
    setTimeout(() => cb('stop'), 7500)
  }
  if (type === 'data') {
    console.log(payload)
  }
}

producer('start', consumer)
