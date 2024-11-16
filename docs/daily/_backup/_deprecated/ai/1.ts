for (let i = 0, getI = () => i; i < 3; i++) {
  console.log(getI())
}

function add(a: any, b: any) {
  let carry: any

  while (b !== 0) {
    carry = (a & b) << 1
    a = a ^ b
    b = carry
  }

  return a
}

console.log(add(1, 2))
