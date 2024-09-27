const uid = (function () {
  let id = 0;
  // eslint-disable-next-line require-yield
  return function* () {
    return id++;
  };
})();

console.log(uid().next().value);
console.log(uid().next().value);
console.log(uid().next().value);
console.log(uid().next().value);
console.log(uid().next().value);
console.log(uid().next().value);

const a = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.iterator]: function* () {
    yield* Object.keys(this);
  },
};

for (let key of a) {
  console.log(key); // 'a'、'b'、'c'
}

function* piSeries() {
  let sum = 0,
    i = 1.0,
    j = 1;
  while (true) {
    sum = sum + j / i;
    yield 4 * sum;
    i = i + 2;
    j = j * -1;
  }
}
