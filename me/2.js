let obj = {
  a: '',
  b: [],
  c: {},
  d: 0,
  e: false,
  f: null,
  g: undefined,
  h: -0,
  i: NaN,
  j: { a: 'b' },
  k: 0n,
  l: 'hello',
  m: Symbol('symbol'),
}

Object.entries(obj).forEach(([k, v]) => {
  if (
    (typeof v === 'object' && v != null && !Object.keys(v).length) ||
    v === ''
  )
    delete obj[k]
})

console.log(obj)

// 快排
function quickSort(arr) {
  if (arr.length <= 1) return arr
  let left = []
  let right = []
  let pivot = arr[0]
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
}
