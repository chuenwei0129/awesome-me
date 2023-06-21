interface Q {
  a: string
  b: number
}

type MapType<T> = {
  [Key in keyof T as `${Key & string}${Key & string}${Key & string}`]: [
    T[Key],
    T[Key],
    T[Key]
  ]
}

type MapQ = MapType<Q>
//  {
//   aaa: [string, string, string];
//   bbb: [number, number, number];
// }
