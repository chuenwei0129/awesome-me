type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type First<T extends unknown[]> = T['length'] extends 0 ? never : T[0]

type head1 = First<arr1> // expected to be 'a'
type head2 = First<arr2> // expected to be 3
