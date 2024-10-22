// 定义一个产品数组，包含不同颜色和型号的设备
const products = [
  { product: 'iPhone X', quantity: 25, color: 'black' },
  { product: 'Huawei mate50', quantity: 6, color: 'white' },
  { product: 'xiaomi 13', quantity: 0, color: 'black' },
  { product: 'iPhone 13', quantity: 10, color: 'white' },
  { product: 'Huawei P50', quantity: 5, color: 'black' },
];

/**
 * 根据指定的键对对象数组进行分组
 * @param {Array} objectArray - 需要被分组的对象数组
 * @param {Function} keySelector - 用于选择分组键的函数
 * @returns {Object} - 包含分组结果的对象
 */
const groupBy = (objectArray, keySelector) => {
  return objectArray.reduce((acc, cur) => {
    const groupKey = keySelector(cur);
    if (!acc[groupKey]) acc[groupKey] = [];
    acc[groupKey].push(cur);
    return acc;
  }, {});
};

// 按颜色对产品进行分组，并打印结果
console.log(groupBy(products, (product) => product.color));
console.log(
  groupBy(products, (product) =>
    product.product.includes('iPhone') ? 'iPhone' : 'Other',
  ),
);
