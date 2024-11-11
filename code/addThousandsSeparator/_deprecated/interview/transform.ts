const set = (result: { [key: string]: any }, path: string[], value: any) => {
  const [key, ...rest] = path
  if (rest.length === 0) {
    result[key] = value
  } else {
    if (!result[key]) {
      result[key] = {}
    }
    set(result[key], rest, value)
  }
}

function transform(obj: { [key: string]: number }) {
  const result = {}
  for (const [key, value] of Object.entries(obj)) {
    set(result, key.split('.'), value)
  }
  return result
}

console.log(
  transform({
    A: 1,
    'B.C': 2,
    'B.D.E': 3,
    'CC.DD.EE': 4,
  })
)
