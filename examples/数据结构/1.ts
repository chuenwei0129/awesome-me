// 扁平数据
const data = [
  {
    name: '文本1',
    parent: null,
    id: 1
  },
  {
    name: '文本2',
    id: 2,
    parent: 1
  },
  {
    name: '文本3',
    parent: 2,
    id: 3
  }
]

// 树状数据
// [
//   {
//     name: '文本1',
//     id: 1,
//     children: [
//       {
//         name: '文本2',
//         id: 2,
//         children: [
//           {
//             name: '文本3',
//             id: 3
//           }
//         ]
//       }
//     ]
//   }
// ]

interface Item {
  name: string
  id: number
  parent: number
}

type TreeItem = Item & {
  children: TreeItem[] | []
}

type UnionToIntersection<U> = (U extends unknown ? (arg: U) => 0 : never) extends (
  arg: infer I
) => 0
  ? I
  : never

/**
 * LastInUnion<1 | 2> = 2.
 */
type LastInUnion<U> = UnionToIntersection<U extends unknown ? (x: U) => 0 : never> extends (
  x: infer L
) => 0
  ? L
  : never

/**
 * UnionToTuple<1 | 2> = [1, 2].
 */
type UnionToTuple<U, Last = LastInUnion<U>> = [U] extends [never]
  ? []
  : [...UnionToTuple<Exclude<U, Last>>, Last]

type TupleToObject<T extends readonly (string | number | symbol)[]> = {
  [K in T[number]]: K
}

type A = UnionToTuple<keyof Item>

const listToTree = (items: Item[]): TreeItem => {
  const idMap = items.reduce(
    (acc, cur) => ({ ...acc, [cur.id]: cur }),
    {} as { [key: number]: Item }
  )

  return
}

console.log(listToTree(data))
