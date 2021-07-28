const data = [
  { 颜色: '红', 尺码: '大', 型号: 'A', skuId: '3158054' },
  { 颜色: '白', 尺码: '中', 型号: 'B', skuId: '3133859' },
  { 颜色: '蓝', 尺码: '小', 型号: 'C', skuId: '3516833' }
]

const group = data => {
  return data.reduce((acc, cur) => {
    Object.entries(cur).map(([key, val]) => {
      if (key === 'skuId') return
      !acc[key] && (acc[key] = [])
      acc[key].push(val)
    })
    return acc
  }, {})
}

const ui = group(data)

console.log(`ui`, ui)

const sku = data.map(Object.values).map(item => (item.pop(), item))

console.log(`sku`, sku)

const list = sku.map(item => {
  return item.reduce((t, cur) => t.concat(t.map(v => v.concat(cur))), [[]])
})

console.dir(list, { depth: 10 })
