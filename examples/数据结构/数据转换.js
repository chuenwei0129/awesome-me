const data = [
  {
    key: 'a',
    value: 1
  },
  {
    key: 'b',
    value: 2
  },
  {
    key: 'c',
    value: 3
  }
]

console.log(data.values().next().value)

// console.log(Object.fromEntries(data.map(Object.values)))

// // 假设本地机器无法做加减乘除运算，需要通过远程请求让服务端来实现。
// // 以加法为例，现有远程API的模拟实现

// const addRemote = async (a, b) =>
//   new Promise(resolve => {
//     setTimeout(() => resolve(a + b), 1000)
//   })

// const remove = (set, a, b) => {

// }

// // 请实现本地的add方法，调用addRemote，能最优的实现输入数字的加法。
// async function add(...inputs) {
//   // 你的实现
//   if (inputs.length === 0) return null
//   if (inputs.length === 1) return inputs[0]

//   function R() {

//   }

//   return R(new Set(...inputs))
// }

// // 请用示例验证运行结果:
// add(1, 2)
// // .then(result => {
// //   console.log(result) // 3
// // })

// add(3, 5, 2)
// // .then(result => {
// //   console.log(result) // 10
// // })

console.log()
// 这是由叶子结点构造树的迭代思路，如果按由顶向下递归的思路去想，subsets(k)的所有组合是由两部分构成的，一是subsets(k-1)的所有组合，二是往这些组合里面都加入一个k元素得到的组合，再给它们取并集。这样的话每步只要做第二部分就可以了
