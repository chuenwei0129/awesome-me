const createCalculator = () => {
  let value = 0

  const add = (num) => {
    value += num
    return context
  }

  const subtract = (num) => {
    value -= num
    return context
  }

  const multiply = (num) => {
    value *= num
    return context
  }

  const divide = (num) => {
    value /= num
    return context
  }

  const getValue = () => {
    return value
  }

  const context = {
    add,
    subtract,
    multiply,
    divide,
    getValue,
  }

  return context
}

const result = createCalculator()
  .add(10)
  .multiply(2)
  .subtract(5)
  .divide(3)
  .getValue()

console.log(result) // 输出: 5
