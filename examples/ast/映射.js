const arr = [1, 2, 3, [4, 5], [6, [7], 8], 9]

// 递归，不考虑最外层
const flat = (arr, ret = []) => {
  arr.forEach(el => {
    Array.isArray(el) ? ret.push({ children: flat(el) }) : ret.push({ value: el })
  })
  return ret
}

console.log({children: flat(arr)});

// 映射，考虑最外层，传入的可能是 数组也可能是 普通值
// [] === {children: []} item === {value: item}
const flatMap = item => {
  // 每一项在递归
  return Array.isArray(item) ? {children: item.map(x => flatMap(x))} : {value: item}
}

console.log(flatMap(arr));

// 第二种比第一种好理解