// 假设本地机器无法做加减乘除运算，需要通过远程请求让服务端来实现。
// 以加法为例，现有远程API的模拟实现

const addRemote = async (a: number, b: number): Promise<number> =>
  new Promise(resolve => {
    setTimeout(() => resolve(a + b), 1000)
  })

// const chunk = (arr: number[], size: number) => {
//   // if (size >= arr.length || size <= 0) return arr
//   return arr.reduce<number[][]>(
//     (acc, cur) => (
//       acc[acc.length - 1].length < size ? acc[acc.length - 1].push(cur) : acc.push([cur]), acc
//     ),
//     [[]]
//   )
// }

// 请实现本地的add方法，调用addRemote，能最优的实现输入数字的加法。
async function add(...inputs: number[]) {
  // 边界
  if (inputs.length === 0) return 0
  if (inputs.length === 1) return inputs[0]
  const a = inputs.pop()
  const b = inputs.pop()
  inputs.push(await addRemote(a, b))
  return add(...inputs)
}

// 请用示例验证运行结果:
add(1, 2).then(result => {
  console.log(result) // 3
})

add(3, 5, 2).then(result => {
  console.log(result) // 10
})

add(3).then(result => {
  console.log(result) // 10
})

add().then(result => {
  console.log(result) // 0
})

// 自测
