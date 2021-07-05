const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type TupleToObject<T extends readonly string[]> = {
  // 取元祖的值
  [P in T[number]]: P
}

// expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
const result: TupleToObject<typeof tuple> = {
  tesla: 'tesla',
  'model 3': 'model 3',
  'model X': 'model X',
  'model Y': 'model Y'
}
