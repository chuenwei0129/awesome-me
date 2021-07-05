namespace deepOnly {
  type X = {
    x: {
      a: 1
      b: 'hi'
    }
    y: 'hey'
  }

  type Expected = {
    readonly x: {
      readonly a: 1
      readonly b: 'hi'
    }
    readonly y: 'hey'
  }

  type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
  }

  export const todo: DeepReadonly<X> = {
    x: {
      a: 1,
      b: 'hi'
    },
    y: 'hey'
  }

  todo.x = 2
  // should be same as `Expected`
}
