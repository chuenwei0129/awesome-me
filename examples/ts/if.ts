type If<B extends boolean, T, F> = B extends true ? T : F

type A = If<true, 'a', 'b'> // expected to be 'a'
type B = If<false, 'a', 'b'> // expected to be 'b'
