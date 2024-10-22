const f1 = (x) => x + 1;
const f2 = (x) => x ** 2;
const f3 = (x) => x - 1;

const pipe = (...funcs) => {
  return (intial) =>
    funcs.reduce((param, func) => {
      return func(param);
    }, intial);
};

console.log(pipe(f1, f2, f3)(2));

const compose = (...funcs) => {
  return (intial) =>
    funcs.reduceRight((param, func) => {
      return func(param);
    }, intial);
};

console.log(compose(f1, f2, f3)(2));
