// https://zhuanlan.zhihu.com/p/460784216

// 对于没有使用 this 的代码来说，其实在 super 前调用时不应该抛出错误（实际上 ES6 就是支持这么做的）。

class Foo {
  constructor(name: string) {}
}

class Ba extends Foo {
  someProperty = true

  constructor(name: string) {
    // Error: A 'super' call must be the first statement in the constructor when a class contains initialized properties, parameter properties, or private identifiers.(2376)
    const transformed = transformer(name)
    super(transformed)
  }
}

const transformer = (arg: string) => {
  return 'linbudu'
}

interface Source<T> {
  prop: Source<Source<T>>
}

interface Target<T> {
  prop: Target<Target<T>>
}

function check(source: Source<'foo' | 'bar'>, target: Target<'foo' | 'bar'>) {
  target = source
}

interface Bar<T> {
  prop: T
}

declare let x: Bar<Bar<Bar<Bar<Bar<Bar<string>>>>>>
declare let y: Bar<Bar<Bar<Bar<Bar<string>>>>>

x = y

const stringArr = <const>['lin', 'bu', 'du']
const _stringArr = ['lin', 'bu', 'du'] as const

type TypeFromArr = typeof stringArr[number]

type UnionRecord =
  | { kind: 'n'; v: number; f: (v: number) => void }
  | { kind: 's'; v: string; f: (v: string) => void }
  | { kind: 'b'; v: boolean; f: (v: boolean) => void }

type VTypes = UnionRecord['v']

function processRecord(rec: UnionRecord) {
  rec.f(rec.v)
}
