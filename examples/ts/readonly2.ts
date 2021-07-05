interface Todo {
  title: string
  description: string
  completed: boolean
}

type MyReadonly2<T, U extends keyof T = keyof T> = {
  readonly [P in U]: T[P]
} &
  {
    [P in Exclude<keyof T, U>]: T[P]
  }

const todo: MyReadonly2<Todo, 'title' | 'description'> = {
  title: 'Hey',
  description: 'foobar',
  completed: false
}

todo.title = 'Hello' // Error: cannot reassign a readonly property
todo.description = 'barFoo' // Error: cannot reassign a readonly property
todo.completed = true // OK
