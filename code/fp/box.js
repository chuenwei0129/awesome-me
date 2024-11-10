function add4(num) {
  return num + 4;
}

function multiply3(num) {
  return num * 3;
}

function divide2(num) {
  return num / 2;
}

// 范畴论
const Functor = (x) => ({
  map: (f) => Functor(f(x)),
  valueOf: () => x,
});

console.log(Box(10).map(add4).map(multiply3).map(divide2).valueOf());

// 执行顺序：h-> g -> f === h -> g -> f
// compose(compose(f, g), h) = compose(f, compose(g, h))
const compose = (...funcs) => {
  return (intial) =>
    funcs.reduceRight((param, func) => {
      return func(param);
    }, intial);
};

// 结合律
console.log(
  compose(divide2, multiply3, add4)(10),
  compose(compose(divide2, multiply3), add4)(10),
  compose(divide2, compose(multiply3, add4))(10),
);

// 提供了一个数组结构的 data，要求实现一个 query 方法，返回一个新的数组，
// query 方法内部有 过滤、排序、分组 等操作，并且支持链式调用，
// 调用最终的 execute 方法返回结果。

const result = query(list)
  .where((item) => item.age > 18)
  .sortBy('id')
  .groupBy('name')
  .execute();

console.log(result);

const query = (list) => ({
  where: (func) => query(list.filter(func)),
  sortBy: (key) => query(list.sort((a, b) => a[key] - b[key])),
  groupBy: (key) =>
    query(
      list.reduce((obj, item) => {
        obj[item[key]] = obj[item[key]] || [];
        obj[item[key]].push(item);
        return obj;
      }, {}),
    ),
  execute: () => list,
});
