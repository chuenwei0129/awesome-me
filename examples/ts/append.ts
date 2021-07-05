type Fn = (a: number, b: string) => number

type AppendArgument<T extends Function, B> = T extends (...args: infer A) => infer R
  ? (...args: [...A, B]) => R
  : never

type Result = AppendArgument<Fn, boolean>
// 期望是 (a: number, b: string, x: boolean) => number
