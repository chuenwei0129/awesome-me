// 需求：筛选出数组中为奇数的子集合

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// 步骤 1：定义执行结果变量
const ret = []
// 步骤 2：控制程序循环调用
for (let i = 0; i < arr.length; i++) {
  // 步骤 3：判断筛选条件
  if (arr[i] % 2 !== 0) {
    // 步骤 4：加入执行结果
    ret.push(arr[i])
  }
}

console.log(ret) // [1, 3, 5, 7, 9]
// 步骤5：得到最终的结果 ret

// 筛选出数组中为奇数的子集合
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const result = array.filter(item => item % 2 !== 0)
console.log(result) // [1, 3, 5, 7, 9]

const sum = x => x + 1
const pow = y => y ** 2

const compose = (...arrF) => {
  return (...args) => {
    return arrF.reduceRight((acc, cur) => {
      // compose(pow, 10)() => args 传入的参数是不需要的
      return typeof acc === 'function' ? cur(acc(...args)) : cur(acc)
    })
  }
}

console.log(compose(pow, 10)())

const _map = fn => list => list.map(fn)
const add = a => b => a + b

// Points-Free   list 是显式参数
const incrementAll = numbers => _map(add(1))(numbers)

// Points-Free   list 是隐式参数
const incrementAll2 = _map(add(1))

console.log(incrementAll([1, 2, 3])) // [2, 3, 4]
console.log(incrementAll2([1, 2, 3])) // [2, 3, 4]
