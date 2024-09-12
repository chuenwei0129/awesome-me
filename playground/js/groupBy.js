// 比如有这样一堆数据：然后我们希望将这些设备根据颜色进行分类
const products = [
  { product: 'iPhone X', quantity: 25, color: 'black' },
  { product: 'Huawei mate50', quantity: 6, color: 'white' },
  { product: 'xiaomi 13', quantity: 0, color: 'black' },
  { product: 'iPhone 13', quantity: 10, color: 'white' },
  { product: 'Huawei P50', quantity: 5, color: 'black' },
];

const groupBy = (objectArray, keySelector) => {
  return objectArray.reduce((acc, cur) => {
    const groupKey = keySelector(cur);
    if (!acc[groupKey]) acc[groupKey] = [];
    acc[groupKey].push(cur);
    return acc;
  }, {});
};

console.log(groupBy(products, (product) => product.color));
