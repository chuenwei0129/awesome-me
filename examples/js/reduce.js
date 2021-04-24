// 遍历 forEach
// 变形 map
// 累积 reduce

// 交集
// const a = [0, 1, 2, 3, 4, 5]
// const b = [3, 4, 5, 6, 7, 8]
// const duplicatedValues = [...new Set(a)].filter(item => b.includes(item))
// duplicatedValues // [3, 4, 5]

// 差集
// const a = [0, 1, 2, 3, 4, 5]
// const b = [3, 4, 5, 6, 7, 8]
// const diffValues = [...new Set([...a, ...b])].filter(item => !b.includes(item) || !a.includes(item)) // [0, 1, 2, 6, 7, 8]

// 数组转对象
// const arr = [1, 2, 3, 4]
// const newObj = {...arr} // {0: 1, 1: 2, 2: 3, 3: 4}
// const obj = {0: 0, 1: 1, 2: 2, length: 3}
// // 对象转数组不能用展开操作符，因为展开操作符必须用在可迭代对象上
// let newArr = [...obj] // Uncaught TypeError: object is not iterable...
// // 可以使用Array.form()将类数组对象转为数组
// let newArr = Array.from(obj) // [0, 1, 2]

// 检测数组所有元素是否都符合判断条件
// const arr = [1, 2, 3, 4, 5]
// const isAllNum = arr.every(item => typeof item === 'number')
// 复制代码检测数组是否有元素符合判断条件
// const arr = [1, 2, 3, 4, 5]
// const hasNum = arr.some(item => typeof item === 'number')

// reduce 应用读取对象