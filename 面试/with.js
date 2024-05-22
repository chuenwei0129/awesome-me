// Symbol.unscopables

Array.prototype[Symbol.unscopables].values = false

function f(foo, values) {
  with (foo) {
    console.log([...values()])
  }
}

f([1, 2, 3])
