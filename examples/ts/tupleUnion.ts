type Arr = ['1', '2', '3']

type TupleToUnion<T extends readonly unknown[]> = T[number]

const a: TupleToUnion<Arr> = '1' // expected to be '1' | '2' | '3'
