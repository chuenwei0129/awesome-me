const Box = (x) => ({
  of: Box, // 将元素放入容器
  map: (f) => Box(f(x)), // 返回容器为了链式调用
  fold: (f) => f(x), // 将元素从容器中取出
  inspect: () => `Box(${x})`, // 看容器里有啥
})
