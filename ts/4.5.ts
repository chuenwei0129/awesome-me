//? Awaited 递归解包 Promise

// A = string
type A = Awaited<Promise<string>>

// B = number
type B = Awaited<Promise<Promise<number>>>

// C = boolean | number
type C = Awaited<boolean | Promise<number>>

//? 收束拥有模板字符串类型的类型
// TypeScript 4.5 可以收束拥有模板字符串类型的类型，也可以识别模板字符串作为判别式。

interface Success {
  type: `${string}Success`
  body: string
}

interface Error {
  type: `${string}Error`
  message: string
}

function handler(r: Success | Error) {
  if (r.type === 'HttpError') {
    // 'r' has type 'Success'
    let token = r.body
    // ^? Property 'body' does not exist on type 'Error'.
  }
}

// type TrimLeft<T extends string> = T extends ` ${infer Rest}`
//   ? TrimLeft<Rest>
//   : T

// // Test = "hello" | "world"
// type Test = TrimLeft<'   hello' | ' world'>

type TrimLeft<T extends string> = T extends ` ${infer Rest}`
  ? TrimLeft<Rest>
  : T

// 递归深度
// error: Type instantiation is excessively deep and possibly infinite.
type Test = TrimLeft<'                      oops'>

// 尾递归优化
// type GetChars<S> = S extends `${infer Char}${infer Rest}`
//   ? Char | GetChars<Rest>
//   : never

// 如果你想把这个进行尾递归优化，你可以引入一个帮助类型来“积累”类型参数，就像尾递归函数一样。

type GetChars<S> = GetCharsHelper<S, never>
type GetCharsHelper<S, Acc> = S extends `${infer Char}${infer Rest}`
  ? GetCharsHelper<Rest, Char | Acc>
  : Acc

// 导入断言（Import Assertions）
import obj from './something.json' assert { type: 'json' }

// 动态 import() 也可以通过第二个参数使用这个断言。
const obj = await import('./something.json', {
  assert: { type: 'json' },
})
