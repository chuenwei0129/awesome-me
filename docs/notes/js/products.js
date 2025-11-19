// products.js
export const products = [
  { id: 1, name: 'iPhone 14', brand: 'Apple', color: 'Black', price: 5999 },
  { id: 2, name: 'iPhone 14 Pro', brand: 'Apple', color: 'Gold', price: 8999 },
  { id: 3, name: 'Galaxy S23', brand: 'Samsung', color: 'Black', price: 5499 },
  { id: 4, name: 'Galaxy A54', brand: 'Samsung', color: 'White', price: 2599 },
  { id: 5, name: 'Mate 50', brand: 'Huawei', color: 'Gold', price: 4999 },
  { id: 6, name: 'P50', brand: 'Huawei', color: 'White', price: 3999 },
  { id: 7, name: 'iPhone 13', brand: 'Apple', color: 'White', price: 4599 },
  {
    id: 8,
    name: 'Galaxy Z Flip',
    brand: 'Samsung',
    color: 'Gold',
    price: 7599,
  },
  { id: 9, name: 'Nova 11', brand: 'Huawei', color: 'Black', price: 2899 },
  { id: 10, name: 'P60', brand: 'Huawei', color: 'Black', price: 5699 },
];

export const allBrands = ['Apple', 'Samsung', 'Huawei'];
export const allColors = ['Black', 'White', 'Gold'];

export const priceRanges = [
  { key: '0-3000', label: '0 - 3000', min: 0, max: 3000 },
  { key: '3000-5000', label: '3000 - 5000', min: 3000, max: 5000 },
  { key: '5000+', label: '5000+', min: 5000, max: Infinity },
];
