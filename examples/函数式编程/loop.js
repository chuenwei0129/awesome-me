// 循环
const loop = n => {
  for (let i = 1; i <= n; i++) {
    console.log(i)
  }
}

loop(10)

// 递归
const recursion = n => {
  if (n > 1) {
    recursion(n - 1)
  }
  console.log(n)
}

recursion(10)

// 用参数来表示匿名函数
;(function (self, n) {
  if (n > 1) {
    self(self, n - 1)
  }
  console.log(n)
})(function (self, n) {
  if (n > 1) {
    self(self, n - 1)
  }
  console.log(n)
}, 10)

// 箭头函数表示
;((self, n) => {
  if (n > 1) {
    self(self, n - 1)
  }
  console.log(n)
})((self, n) => {
  if (n > 1) {
    self(self, n - 1)
  }
  console.log(n)
}, 10)

// 科里化
// 理解时先算里面的，再算外面的
;(self => n => {
  if (n > 1) {
    self(self)(n - 1)
  }
  console.log(n)
})(self => n => {
  if (n > 1) {
    self(self)(n - 1)
  }
  console.log(n)
})(10)

// dont repeat yourself
// DRY
// 把 self(self) 抽出来
const f = self => self(self)

;(f => self => n => {
  if (n > 1) {
    f(f)(self)(n - 1)
  }
  console.log(n)
})(f => self => n => {
  if (n > 1) {
    f(f)(self)(n - 1)
  }
  console.log(n)
})(10)

// 函数式编程的 Y Combinator 有哪些实用价值？
// https://www.zhihu.com/question/20115649/answer/14029761
;(g => f => self => n => {
  if (n > 1) {
    g(f)(f)(self)(n - 1)
  }
  console.log(n)
})(g => f => self => n => {
  if (n > 1) {
    g(f)(f)(self)(n - 1)
  }
  console.log(n)
})(10)

const R = h => (f => h(v => f(f)(v)))(f => h(v => f(f)(v)))

console.log(R(g => n => n == 1 ? 1 : n * g(n - 1))(5))
