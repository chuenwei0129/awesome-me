const arr = [1, 2, 3, 4, 5];
const sum = (x: number, y: number) => {
  return x + y;
};

const result = arr.reduce(sum, 0);

console.log('result: ', result);

const add = (x: number) => x + 1;

const _map = (fn: (x: number) => number, arr: number[]) => {
  return arr.reduce((acc, curr) => {
    acc.push(fn(curr));
    return acc;
  }, [] as number[]);
};

const result2 = _map(add, arr);

console.log('result2: ', result2);
console.log('arr.map(add): ', arr.map(add));
