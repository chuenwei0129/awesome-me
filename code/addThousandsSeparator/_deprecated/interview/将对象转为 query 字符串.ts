const testObj = {
  a: 1,
  b: 2,
  c: 3,
}

const toQueryString = (obj: Record<string, unknown>) => {
  return Object.entries(obj)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
}

console.log(toQueryString(testObj))
