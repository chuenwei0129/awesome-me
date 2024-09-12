type Product = {
  product: string;
  quantity: number;
  color: string;
};

const products: Product[] = [
  { product: 'iPhone X', quantity: 25, color: 'black' },
  { product: 'Huawei mate50', quantity: 6, color: 'white' },
  { product: 'xiaomi 13', quantity: 0, color: 'black' },
  { product: 'iPhone 13', quantity: 10, color: 'white' },
  { product: 'Huawei P50', quantity: 5, color: 'black' },
];

const groupBy = <T, K extends keyof any>(
  objectArray: T[],
  keySelector: (item: T) => K,
): Record<K, T[]> => {
  return objectArray.reduce((acc, cur) => {
    const groupKey = keySelector(cur);
    if (!acc[groupKey]) acc[groupKey] = [];
    acc[groupKey].push(cur);
    return acc;
  }, {} as Record<K, T[]>);
};

console.log(groupBy(products, (product: Product) => product.color));
