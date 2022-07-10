// 扁平数据
const data = [
  {
    name: '文本1',
    id: 1
  },
  {
    name: '文本2',
    id: 2,
    pid: 1
  },
  {
    name: '文本3',
    pid: 2,
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

type Item = {
  name: string
  id: number
  pid?: number
}

type ListToTree<List> = List extends Array<infer Item> ? Item[] : never

type Result = ListToTree<Item[]>

// const listToTree = () => {}

// console.log(listToTree(data))
