type arr1 = []
type arr2 = [3, 2, 1]

type Pop<T> = T extends [...infer X, unknown] ? X : never

type re1 = Pop<arr1> // expected to be ['a', 'b', 'c']
type re2 = Pop<arr2> // expected to be [3, 2]
