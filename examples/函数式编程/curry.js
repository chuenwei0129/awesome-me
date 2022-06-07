const Y = r => (f => r(v => f(f)(v)))(f => r(v => f(f)(v)))

const fib = n => (n <= 1 ? n : fib(n - 1) + fib(n - 2))

console.time('fib')
console.log(fib(10))
console.timeEnd('fib')

console.time('Y')
console.log(Y(fib => n => n <= 1 ? n : fib(n - 1) + fib(n - 2))(10))
console.timeEnd('Y')
