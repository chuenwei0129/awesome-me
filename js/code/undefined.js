const undefinedToNull = (object) => {
  for (const [k, v] of Object.entries(object)) {
    if (typeof v === 'undefined') {
      object[k] = null
    } else if (typeof v === 'object' && v !== null) {
      undefinedToNull(v)
    }
  }
  return object
}

console.log(undefinedToNull({ a: undefined, b: 'BFE.dev' }))
console.log(undefinedToNull({ a: ['BFE.dev', undefined, 'bigfrontend.dev'] }))
console.log(
  undefinedToNull(['BFE.dev', undefined, null, { a: ['BFE.dev', undefined] }])
)
