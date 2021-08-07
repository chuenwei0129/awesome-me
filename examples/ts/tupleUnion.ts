type Arr = ['1', '2', '3']

type TupleToUnion<T extends readonly any[]> = T[number]

const a: TupleToUnion<Arr> = '1' // expected to be '1' | '2' | '3'

// your answers
/**
 * UnionToIntersection<{ foo: string } | { bar: string }> =
 *  { foo: string } & { bar: string }.
 */
type UnionToIntersection<U> = (U extends unknown ? (arg: U) => 0 : never) extends (
  arg: infer I
) => 0
  ? I
  : never

/**
 * LastInUnion<1 | 2> = 2.
 */
type LastInUnion<U> = UnionToIntersection<U extends unknown ? (x: U) => 0 : never> extends (
  x: infer L
) => 0
  ? L
  : never

/**
 * UnionToTuple<1 | 2> = [1, 2].
 */
type UnionToTuple<U, Last = LastInUnion<U>> = [U] extends [never]
  ? []
  : [...UnionToTuple<Exclude<U, Last>>, Last]

type T = UnionToTuple<'any' | 'a'>
type R = UnionToTuple<'any' | 'a'>
