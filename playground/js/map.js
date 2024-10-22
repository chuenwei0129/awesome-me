function* ini() {
  yield { 0: 'a', 1: '1' }; // 类数组
  yield ['b', 2];
}

const m = new Map(ini());

console.log(m); // Map(2) { 'a' => '1', 'b' => 2 }

console.log(Array.from({ 0: 'a', 1: '1', length: 2 })); // [ 'a', '1' ]

console.log(JSON.stringify(m)); // {}

const n1 = NaN;
const n2 = NaN;
console.log(n1 === n2); // false
console.log(+0 === -0); // true

console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(+0, -0)); // false

console.log(new Set([NaN, NaN])); // Set(1) { NaN }
