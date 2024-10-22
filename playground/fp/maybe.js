// Functor 世界里，也是有“类别”一说的。**同一类 Functor，往往具有相同的 map 行为**。
// 通过往 map 行为里“加料”，我们就可以制作出不同的 Functor。

const Identity = (x) => ({
  map: (f) => Identity(f(x)),
  valueOf: () => x,
  inspect: () => `Identity {${x}}`,
});

const isEmpty = (x) => x === undefined || x === null;

const Maybe = (x) => ({
  map: (f) => (isEmpty(x) ? Maybe(null) : Maybe(f(x))),
  valueOf: () => x,
  inspect: () => `Maybe {${x}}`,
});

function add4(x) {
  return x + 4;
}

// 返回 undefined
function add8(x) {
  x + 8;
}

function toString(x) {
  return x.toString();
}

function addX(x) {
  return x + 'X';
}

function add10(x) {
  return x + '10';
}

const res = Maybe(10).map(add4).map(add8).map(toString).map(addX).inspect();

// 输出 Maybe {null}
console.log(res);

// 其中 add8 这个函数是有问题的，我在定义它的时候，手滑了，没有写 return。
// 这就会导致 add8 在任何情况下都会输出 `undefined`。
// 也就是说，当执行到 map(add8) 这一行的时候，`Maybe(null)` 已经出现了。
// 而 `Maybe(null)`相当于是一个“终结者”，只要它一出现，就掐灭了后续所有 map 调用的可能性——这些 map 都只会返回 `Maybe(null)`而已。

// 通过往盒子里“加料”，我们可以在实现组合的同时，内化掉类似空态识别这样的逻辑。
// 从“面子”上看，Functor 为我们提供了更加强大的组合能力。
// 从“里子”上来说，**Functor 在实现函数组合的基础上，确保了副作用的可控**。
