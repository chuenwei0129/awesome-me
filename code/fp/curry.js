// 利用 allArgs 闭包收集参数，收集齐了就调用原函数
const curry = (f) => {
  const g = (...allArgs) =>
    allArgs.length >= f.length
      ? f(...allArgs)
      : (...input) => g(...input, ...allArgs);
  return g;
};

console.log(curry((n1, n2, n3) => n1 + n2 + n3)(1)(2)(3));
// 执行 curry，allArgs = []，=> (...input) => {}
// input 为 1，allArgs = [1], => (...input) => {}
// input 为 2，allArgs = [1, 2], => (...input) => {}
// input 为 3，allArgs = [1, 2, 3], => f(1, 2, 3)

// input 为 [2, 3] => curry((n1, n2, n3) => n1 + n2 + n3)(1)(2, 3)

// 柯里化解决组合链的元数问题
function add(a, b) {
  return a + b;
}

function multiply(a, b, c) {
  return a * b * c;
}

function addMore(a, b, c, d) {
  return a + b + c + d;
}

function divide(a, b) {
  return a / b;
}

const pipe = (...funcs) => {
  return (intial) =>
    funcs.reduce((param, func) => {
      return func(param);
    }, intial);
};

const curriedAdd = curry(add);
const curriedMultiply = curry(multiply);
const curriedAddMore = curry(addMore);
const curriedDivide = curry(divide);

const partialMultipy = multiply.bind(null, 2, 3);
console.log(partialMultipy(4));

//注意要使用 pipe，需用 curry 和 偏函数固定参数为一元函数
console.log(pipe(curriedAdd(2), curriedMultiply(2, 3))(2));
