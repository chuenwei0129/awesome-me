const str: string = 'str' // -> const str: string

const o = {
  a: 'str'
} // -> const o = { a: string }

const o1 = { a1: 'str' } as const
// -> const o1: {
//   readonly a1: "str";
// }
