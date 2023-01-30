declare function f<T>(arg: {
  produce: (n: string) => T
  consume: (x: T) => void
}): void

// Works
f({
  produce: () => 'hello',
  consume: (x) => x.toLowerCase(),
})

// Works
f({
  produce: (n: string) => n,
  consume: (x) => x.toLowerCase(),
})

//? 泛型实例化表达式 Instantiation Expressions
const ErrorMap = Map<string, Error>

// 在 4.7 版本中对这一问题进行了改进，现在只读元组的 length 属性也将是 readonly 的
// infer extends
