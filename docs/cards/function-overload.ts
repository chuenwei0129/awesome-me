function sum(a: number, b: number): number;
function sum(a: number[], b: number): number[];
function sum(a: number, b: number[]): number[];
function sum(a: number[], b: number[]): number[];

function sum(a: number | number[], b: number | number[]): number | number[] {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  }

  if (typeof a === 'number' && Array.isArray(b)) {
    return b.map((item) => item + a);
  }

  if (Array.isArray(a) && typeof b === 'number') {
    return a.map((item) => item + b);
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      throw new Error('Arrays must have the same length');
    }
    return a.map((item, index) => item + b[index]);
  }

  throw new Error('Invalid arguments');
}

console.log('🚀 ~ sum(1, 2):', sum(1, 2));
console.log('🚀 ~ sum(1, [2, 3]):', sum(1, [2, 3]));
console.log('🚀 ~ sum([1, 2], 3):', sum([1, 2], 3));
console.log('🚀 ~ sum([1, 2], [3, 4]):', sum([1, 2], [3, 4]));

// 使用 const 箭头函数实现重载
