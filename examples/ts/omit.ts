namespace Omit {
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  // 返回的是 T 里面 K 没有的， 排除 T 里面 K 没有的
  type MyExclude<T, K> = T extends K ? never : T

  type MyPick<T, K extends keyof T> = { [P in K]: T[P] }

  type MyOmit<T, K> = MyPick<T, MyExclude<keyof T, K>>

  type TodoPreview = MyOmit<Todo, 'description' | 'title'>

  const todo: TodoPreview = {
    completed: false
  }
}
