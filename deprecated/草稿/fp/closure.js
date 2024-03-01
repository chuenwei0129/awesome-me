const createCalculator = () => {
  let value = 0

  const add = (num) => {
    value += num
    return operations
  }

  const subtract = (num) => {
    value -= num
    return operations
  }

  const multiply = (num) => {
    value *= num
    return operations
  }

  const divide = (num) => {
    value /= num
    return operations
  }

  const getValue = () => {
    return value
  }

  const operations = {
    add,
    subtract,
    multiply,
    divide,
    getValue,
  }

  return operations
}

const result = createCalculator()
  .add(10)
  .multiply(2)
  .subtract(5)
  .divide(3)
  .getValue()

console.log(result) // 输出: 5
