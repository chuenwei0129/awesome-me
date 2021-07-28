const arr = [
  { area: 'GZ', name: 'YZW', age: 27 },
  { area: 'GZ', name: 'TYJ', age: 25 },
  { area: 'SZ', name: 'AAA', age: 23 },
  { area: 'FS', name: 'BBB', age: 21 },
  { area: 'SZ', name: 'CCC', age: 19 }
] // 以地区area作为分组依据

function group(arr = [], key) {
  return arr.reduce((t, v) => (!t[v[key]] && (t[v[key]] = []), t[v[key]].push(v), t), {})
}

console.log(
  group(arr, 'area') // { GZ: Array(2), SZ: Array(2), FS: Array(1) }
)
