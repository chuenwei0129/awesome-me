type Concat<A extends unknown[], B extends unknown[]> = [...A, ...B]

type Result = Concat<[], [2]> // expected to be [1, 2]
