namespace pick {
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  // pick 实现
  type MyPick<T, K extends keyof T> = { [P in K]: T[P] }

  type TodoPreview = MyPick<Todo, 'title' | 'completed'>

  const todo: TodoPreview = {
    title: 'Clean room',
    completed: false
  }
}
